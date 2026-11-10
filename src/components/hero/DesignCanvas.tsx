import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type {
  CSSProperties,
  FocusEvent as ReactFocusEvent,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";
import { Link } from "react-router-dom";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { trackEvent } from "../../lib/analytics";
import { NAV_HEIGHT } from "../../lib/layout";
import { PhoneFan } from "../ui/PhoneFan";
import { useBoard } from "./BoardContext";
import type { Board } from "./BoardContext";
import { CANVAS_OBJECTS, WORLD_H, WORLD_W, objectSize } from "./canvasObjects";
import type { CanvasObject } from "./canvasObjects";
import { useNoHover } from "./heroMedia";
import { LayorCursor } from "./LayorCursor";
import { useHeroEntrance } from "./useHeroEntrance";
import { useStatusEngaged } from "./useStatusEngaged";

const MIN_SCALE = 0.15;
const MAX_SCALE = 2.5;
/** The opening zoom at full width: the Intro fills most of the first view. */
const OPENING_SCALE = 1.05;
/** Screen px between the canvas's left edge and the Intro in the opening view. */
const OPENING_INSET = 24;
/** And from the canvas's top: 24px below the nav pill's slot, which floats over the top of the hero. */
const OPENING_TOP = NAV_HEIGHT + OPENING_INSET;
const KEY_PAN = 48;
/** A press becomes a drag (or pan) only after the pointer has travelled this far, in screen px. */
const DRAG_THRESHOLD = 6;
const FIT_PAD = 40;
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

const INTRO = CANVAS_OBJECTS.find((o) => o.id === "intro")!;
/** The first frame to the right of the Intro: in a narrow canvas the opening view keeps it peeking in. */
const FIRST_FRAME = CANVAS_OBJECTS.find((o) => o.id === "first-bank")!;
/** Screen px of that frame that show at the canvas's right edge when the canvas is too narrow for 85%. */
const OPENING_PEEK = 40;
const MIN_OPENING_SCALE = 0.5;
/** Board y of the bottom of the Status object (its CV button), and the screen px kept clear under it. */
const OPENING_BOTTOM = 580;
const OPENING_BOTTOM_GAP = 24;

/** Controls inside an object that keep their own behaviour: pressing them never starts a drag. */
const INTERACTIVE = "a[href], button, input, textarea, select, summary, label, [contenteditable='true'], [data-no-drag], [aria-expanded] ~ *";

type Gesture = {
  mode: "drag" | "pan";
  pointerId: number;
  /** The object being dragged, or for a pan the object the press started on (none: empty board). */
  id: string | null;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
  active: boolean;
};

function Handles({ title }: { title: string }) {
  return (
    <>
      <span className="dc-tag" aria-hidden="true">
        {title}
      </span>
      <span className="dc-sel" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
    </>
  );
}

function TextObject({
  o,
  style,
  className,
  reportSize,
  offset,
  children,
}: {
  o: CanvasObject;
  style: CSSProperties;
  className: string;
  reportSize: Board["reportSize"];
  /** A purely visual offset in board units (the entrance); never touches the board's positions. */
  offset?: { x: MotionValue<number>; y: MotionValue<number> };
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // offsetWidth/Height are layout sizes, so they are board units whatever the zoom.
    const report = () => reportSize(o.id, el.offsetWidth, el.offsetHeight);
    report();
    const ro = new ResizeObserver(report);
    ro.observe(el);
    return () => ro.disconnect();
  }, [o.id, reportSize]);

  return (
    <motion.div ref={ref} data-obj-id={o.id} className={className} style={{ ...style, width: o.w, ...offset }}>
      <Handles title={o.title} />
      {children}
    </motion.div>
  );
}

function FrameArt({ o }: { o: CanvasObject }) {
  const { w, h } = objectSize(o);
  return (
    <>
      <Handles title={o.title} />
      {o.to && (
        <span className="dc-open" data-no-drag="">
          Open project →
        </span>
      )}
      <div className={`dc-art${o.phone ? " dc-art--phone" : ""}${o.fan ? " dc-art--fan" : ""}`} style={{ width: w, height: h }}>
        {o.fan ? (
          <PhoneFan screens={o.fan.screens} tint={o.fan.tint} label={o.fan.label} decorative />
        ) : (
          o.src && (
            <img src={o.src} alt="" width={Math.round(w)} height={Math.round(h)} loading="lazy" decoding="async" draggable={false} />
          )
        )}
      </div>
    </>
  );
}

type DesignCanvasProps = {
  /** Content of the Intro object; omitted when the intro is page content (the stacked layout). */
  intro?: ReactNode;
  /** Content of the Status object; omitted with `intro`. */
  status?: ReactNode;
};

/**
 * The hero board, like a design tool's canvas. Objects (the intro, the status line, project frames)
 * sit at board positions inside a world that pans and zooms. Drag an object to move it; drag empty
 * board to pan; a click without movement selects. Pinch or Ctrl/Cmd + scroll zooms (plain scroll
 * still scrolls the page); with focus, arrows pan, + and - zoom, and 0 (or Fit) returns to the opening view.
 */
export function DesignCanvas({ intro, status }: DesignCanvasProps) {
  const board = useBoard();
  const { objects, positions, selectedId, hoverId, select, moveTo, reportSize, canvasApi } = board;
  const boardRef = useRef(board);
  boardRef.current = board;

  const reduceMotion = useReducedMotion();
  const reduceRef = useRef(reduceMotion);
  reduceRef.current = reduceMotion;

  const viewportRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(OPENING_SCALE);
  const zoomText = useTransform(scale, (s) => `${Math.round(s * 100)}%`);

  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<Gesture | null>(null);
  const pinchDist = useRef<number | null>(null);
  const viewMoved = useRef(false);
  const reported = useRef(false);
  const anims = useRef<{ stop(): void }[]>([]);
  const [panning, setPanning] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);
  const hintId = useId();

  const hasIntro = objects.some((o) => o.id === "intro");
  // The Intro drops in on first load (desktop only); the first pan, zoom or drag ends the coach marks.
  const noHover = useNoHover();
  const entrance = useHeroEntrance(hasIntro && !reduceMotion && !noHover);
  const { noteInteraction } = entrance;
  // Layor's cursor stays clear of the CV menu and of keyboard focus in the Status object.
  const statusEngaged = useStatusEngaged(viewportRef);

  const markInteracted = useCallback(
    (kind: "pan" | "zoom" | "drag") => {
      if (kind !== "drag") viewMoved.current = true;
      if (!reported.current) {
        reported.current = true;
        trackEvent("canvas_interact", { kind });
        noteInteraction();
      }
    },
    [noteInteraction],
  );

  const stopAnims = useCallback(() => {
    anims.current.forEach((a) => a.stop());
    anims.current = [];
  }, []);

  /** Move the view to (tx, ty) at scale ts: animated over about 300ms, instant under reduced motion. */
  const goTo = useCallback(
    (tx: number, ty: number, ts: number, instant = false) => {
      stopAnims();
      if (instant || reduceRef.current) {
        x.set(tx);
        y.set(ty);
        scale.set(ts);
        return;
      }
      const t = { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const };
      anims.current = [animate(x, tx, t), animate(y, ty, t), animate(scale, ts, t)];
    },
    [stopAnims, scale, x, y],
  );

  const sizeOf = useCallback((id: string) => {
    const b = boardRef.current;
    const o = b.objects.find((ob) => ob.id === id);
    return b.sizes[id] ?? (o ? objectSize(o) : undefined);
  }, []);

  /** Frame every object, where it is now, in the canvas. */
  const fitAll = useCallback(
    (instant = false) => {
      const el = viewportRef.current;
      if (!el) return;
      if (!instant) viewMoved.current = true;
      const b = boardRef.current;
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      for (const o of b.objects) {
        const p = b.positions[o.id];
        const s = sizeOf(o.id);
        if (!p || !s) continue;
        minX = Math.min(minX, p.x);
        minY = Math.min(minY, p.y);
        maxX = Math.max(maxX, p.x + s.w);
        maxY = Math.max(maxY, p.y + s.h);
      }
      if (!isFinite(minX)) [minX, minY, maxX, maxY] = [0, 0, WORLD_W, WORLD_H];
      minX -= FIT_PAD;
      minY -= FIT_PAD;
      maxX += FIT_PAD;
      maxY += FIT_PAD;
      const bw = maxX - minX;
      const bh = maxY - minY;
      const s = clamp(Math.min(el.clientWidth / bw, el.clientHeight / bh), MIN_SCALE, MAX_SCALE);
      goTo((el.clientWidth - bw * s) / 2 - minX * s, (el.clientHeight - bh * s) / 2 - minY * s, s, instant);
    },
    [goTo, sizeOf],
  );

  /** Pan (at the current zoom) so the object's center is the canvas's center. */
  const centerOn = useCallback(
    (id: string) => {
      const el = viewportRef.current;
      const p = boardRef.current.positions[id];
      const sz = sizeOf(id);
      if (!el || !p || !sz) return;
      viewMoved.current = true;
      const s = scale.get();
      goTo(el.clientWidth / 2 - (p.x + sz.w / 2) * s, el.clientHeight / 2 - (p.y + sz.h / 2) * s, s);
    },
    [goTo, scale, sizeOf],
  );

  useEffect(() => {
    canvasApi.current = { centerOn, fitAll: () => fitAll() };
    return () => {
      canvasApi.current = null;
    };
  }, [canvasApi, centerOn, fitAll]);

  useEffect(() => stopAnims, [stopAnims]);

  // Frames know their size up front; report it once so the board has every rectangle.
  useEffect(() => {
    for (const o of objects) {
      if (o.kind === "frame") {
        const { w, h } = objectSize(o);
        reportSize(o.id, w, h);
      }
    }
  }, [objects, reportSize]);

  // The opening view: the Intro 24px inside the canvas's left edge and 24px under the nav pill, at
  // 105%, with the frames to its right. With no Intro on the board (the stacked layout) it fits the
  // board. It follows the canvas's size until the visitor pans or zooms.
  const openingView = useCallback(
    (instant = true) => {
      const el = viewportRef.current;
      if (!el) return;
      if (!hasIntro) return fitAll(instant);
      // 105% when the canvas is big enough; otherwise smaller, so the Intro stays whole, the next frame
      // peeks in at the right edge and the Status object (with the CV button) ends inside the canvas.
      const fitW = (el.clientWidth - OPENING_INSET - OPENING_PEEK) / (FIRST_FRAME.x - INTRO.x);
      const fitH = (el.clientHeight - OPENING_TOP - OPENING_BOTTOM_GAP) / (OPENING_BOTTOM - INTRO.y);
      const s = clamp(Math.min(fitW, fitH), MIN_OPENING_SCALE, OPENING_SCALE);
      goTo(OPENING_INSET - INTRO.x * s, OPENING_TOP - INTRO.y * s, s, instant);
    },
    [hasIntro, fitAll, goTo],
  );

  /** Fit (the button and the 0 key): back to the opening view, animated. Moved objects stay where they are. */
  const returnToOpening = useCallback(() => {
    markInteracted("zoom");
    openingView(false);
    // Like the first view, it follows the canvas's size again until the visitor pans or zooms.
    if (hasIntro) viewMoved.current = false;
  }, [hasIntro, markInteracted, openingView]);

  useLayoutEffect(() => {
    if (!viewMoved.current) openingView(true);
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      if (!viewMoved.current) openingView(true);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [openingView]);

  const zoomAt = useCallback(
    (factor: number, cx: number, cy: number) => {
      stopAnims();
      const s0 = scale.get();
      const s1 = clamp(s0 * factor, MIN_SCALE, MAX_SCALE);
      const k = s1 / s0;
      x.set(cx - (cx - x.get()) * k);
      y.set(cy - (cy - y.get()) * k);
      scale.set(s1);
    },
    [stopAnims, scale, x, y],
  );

  // A non-passive listener, so Ctrl/Cmd + scroll (and trackpad pinch) zooms the canvas instead of the page.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      // Lines and pages to pixels, so a mouse wheel and a trackpad zoom at a similar rate.
      const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * el.clientHeight : e.deltaY;
      const r = el.getBoundingClientRect();
      markInteracted("zoom");
      zoomAt(Math.exp(-dy * 0.0025), e.clientX - r.left, e.clientY - r.top);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoomAt, markInteracted]);

  const endGesture = useCallback(() => {
    gesture.current = null;
    pinchDist.current = null;
    setPanning(false);
    setDragId(null);
  }, []);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    // Only the primary button (touch and pen contacts report 0 too).
    if (e.button !== 0) return;
    const root = e.currentTarget;
    // A pointer cannot go down twice: anything still recorded for it (or, for the single mouse, any
    // gesture at all) is left over from a release we never saw.
    if (e.pointerType === "mouse" || pointers.current.has(e.pointerId) || gesture.current?.pointerId === e.pointerId) {
      if (e.pointerType === "mouse") pointers.current.clear();
      else pointers.current.delete(e.pointerId);
      if (gesture.current && (e.pointerType === "mouse" || gesture.current.pointerId === e.pointerId)) endGesture();
    }
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2) {
      // A second finger: pinch. Whatever the first finger had armed is dropped (and selects nothing).
      stopAnims();
      gesture.current = null;
      setDragId(null);
      setPanning(true);
      for (const id of pointers.current.keys()) {
        if (!root.hasPointerCapture(id)) root.setPointerCapture(id);
      }
      const [a, b] = [...pointers.current.values()];
      pinchDist.current = Math.hypot(a.x - b.x, a.y - b.y);
      return;
    }
    if (pointers.current.size > 2) return;

    const target = e.target as Element;
    const obj = target.closest<HTMLElement>("[data-obj-id]");
    const hit = target.closest(INTERACTIVE);
    // A press on a button, link or the CV list inside an object is left alone: no drag, no pan, no select.
    if (hit && obj && hit !== obj && obj.contains(hit)) {
      pointers.current.delete(e.pointerId);
      return;
    }
    stopAnims();
    const id = obj?.dataset.objId ?? null;
    // On touch an unselected object pans the board (a finger is mostly scrolling around); a selected one moves.
    const drag = id !== null && (e.pointerType !== "touch" || id === boardRef.current.selectedId);
    const p = id ? boardRef.current.positions[id] : undefined;
    gesture.current = {
      mode: drag && p ? "drag" : "pan",
      pointerId: e.pointerId,
      id,
      startX: e.clientX,
      startY: e.clientY,
      originX: drag && p ? p.x : x.get(),
      originY: drag && p ? p.y : y.get(),
      active: false,
    };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(e.pointerId)) return;
    // The button was released where we could not hear it (outside the window, say): end quietly.
    if (e.pointerType === "mouse" && e.buttons === 0) {
      pointers.current.delete(e.pointerId);
      endGesture();
      return;
    }
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2 && pinchDist.current) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const r = e.currentTarget.getBoundingClientRect();
      markInteracted("zoom");
      zoomAt(dist / pinchDist.current, (a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top);
      pinchDist.current = dist;
      return;
    }

    const g = gesture.current;
    if (!g || g.pointerId !== e.pointerId) return;
    const dx = e.clientX - g.startX;
    const dy = e.clientY - g.startY;
    if (!g.active) {
      if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
      g.active = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      markInteracted(g.mode === "drag" ? "drag" : "pan");
      if (g.mode === "drag") {
        // The object being moved becomes the selection, as in a design tool, so the inspector follows it.
        setDragId(g.id);
        select(g.id, "canvas");
      } else setPanning(true);
    }
    if (g.mode === "drag" && g.id) {
      const s = scale.get();
      moveTo(g.id, Math.round(g.originX + dx / s), Math.round(g.originY + dy / s));
    } else {
      x.set(g.originX + dx);
      y.set(g.originY + dy);
    }
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const wasPinch = pointers.current.size >= 2;
    pointers.current.delete(e.pointerId);
    if (wasPinch) {
      // Lifting one finger of a pinch ends the gesture; the other finger does not start a pan.
      endGesture();
      return;
    }
    const g = gesture.current;
    if (g && g.pointerId === e.pointerId && !g.active) select(g.id, "canvas");
    endGesture();
  };

  // Lost capture or a cancelled pointer (the browser took over to scroll, say): forget everything.
  // A lostpointercapture from a child is ignored: touch and pen pointers are implicitly captured by
  // the element under the finger, and moving capture to the viewport at the drag threshold fires
  // lostpointercapture at that child, which bubbles here while the gesture carries on.
  const onPointerAbort = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.type === "lostpointercapture" && e.target !== e.currentTarget) return;
    if (!pointers.current.has(e.pointerId) && gesture.current?.pointerId !== e.pointerId) return;
    pointers.current.clear();
    endGesture();
  };

  const zoomBy = (factor: number) => {
    const el = viewportRef.current;
    if (!el) return;
    markInteracted("zoom");
    zoomAt(factor, el.clientWidth / 2, el.clientHeight / 2);
  };

  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.ctrlKey || e.metaKey || e.altKey) return;
    const pan: Record<string, [number, number]> = {
      ArrowLeft: [KEY_PAN, 0],
      ArrowRight: [-KEY_PAN, 0],
      ArrowUp: [0, KEY_PAN],
      ArrowDown: [0, -KEY_PAN],
    };
    if (pan[e.key]) {
      e.preventDefault();
      stopAnims();
      markInteracted("pan");
      x.set(x.get() + pan[e.key][0]);
      y.set(y.get() + pan[e.key][1]);
    } else if (e.key === "+" || e.key === "=") {
      e.preventDefault();
      zoomBy(1.25);
    } else if (e.key === "-") {
      e.preventDefault();
      zoomBy(0.8);
    } else if (e.key === "0") {
      e.preventDefault();
      returnToOpening();
    }
  };

  /** Is the object wholly inside the canvas at the current view? */
  const inView = (id: string) => {
    const el = viewportRef.current;
    const p = boardRef.current.positions[id];
    const sz = sizeOf(id);
    if (!el || !p || !sz) return true;
    const s = scale.get();
    const left = x.get() + p.x * s;
    const top = y.get() + p.y * s;
    return left >= 0 && top >= 0 && left + sz.w * s <= el.clientWidth && top + sz.h * s <= el.clientHeight;
  };

  // Keyboard focus on a frame that is partly off the canvas pans it into view. (The viewport is
  // `overflow: clip`, so the browser itself can never scroll the board.)
  const onFrameFocus = (e: ReactFocusEvent<HTMLElement>, o: CanvasObject) => {
    if (e.target !== e.currentTarget || !e.currentTarget.matches(":focus-visible")) return;
    if (!inView(o.id)) centerOn(o.id);
  };

  // A click on a frame only selects it (the pointer handlers do that). Its page opens from the
  // "Open project" chip, from Enter (a click with detail 0), or a modified click (new tab).
  const onFrameClick = (e: ReactMouseEvent<HTMLAnchorElement>, o: CanvasObject) => {
    const modified = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
    if (e.detail === 0 || modified || (e.target as Element).closest(".dc-open")) {
      trackEvent("canvas_frame_open", { frame: o.id });
      return;
    }
    e.preventDefault();
  };

  const onDivFrameKey = (e: ReactKeyboardEvent<HTMLDivElement>, o: CanvasObject) => {
    if (e.key === "Enter" && e.target === e.currentTarget) {
      e.preventDefault();
      select(o.id, "canvas");
    }
  };

  const classFor = (o: CanvasObject) =>
    [
      "dc-obj",
      `dc-obj--${o.kind}`,
      o.id === selectedId && "dc-obj--selected",
      o.id === hoverId && "dc-obj--hover",
      o.id === dragId && "dc-obj--dragging",
    ]
      .filter(Boolean)
      .join(" ");

  const content: Record<string, ReactNode> = { intro, status };

  return (
    <div
      ref={viewportRef}
      className={`dc-viewport${panning ? " dc-viewport--panning" : ""}${reduceMotion ? " dc-viewport--still" : ""}`}
      role="region"
      aria-label="Design canvas"
      aria-describedby={hintId}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerAbort}
      onLostPointerCapture={onPointerAbort}
      onKeyDown={onKeyDown}
    >
      <p id={hintId} className="visually-hidden">
        Drag the board to pan, or drag an object to move it. Hold Ctrl or Command and scroll, or pinch, to zoom. With the
        canvas focused, arrow keys move the board, plus and minus zoom, and 0 returns to the first view. Press Enter on a project to open it.
      </p>
      <motion.div className="dc-world" style={{ x, y, scale, width: WORLD_W, height: WORLD_H }}>
        <div className="dc-dots" aria-hidden="true" />
        {objects.map((o, i) => {
          const p = positions[o.id];
          const style: CSSProperties = { left: p.x, top: p.y };
          if (o.kind === "text") {
            if (!content[o.id]) return null;
            return (
              <TextObject
                key={o.id}
                o={o}
                style={style}
                className={classFor(o)}
                reportSize={reportSize}
                offset={o.id === "intro" ? { x: entrance.offX, y: entrance.offY } : undefined}
              >
                {content[o.id]}
              </TextObject>
            );
          }
          const frameStyle = { ...style, animationDelay: `${0.08 * i}s` };
          return o.to ? (
            <Link
              key={o.id}
              to={o.to}
              data-obj-id={o.id}
              className={classFor(o)}
              style={frameStyle}
              draggable={false}
              aria-label={`${o.title}: open project`}
              onClick={(e) => onFrameClick(e, o)}
              onFocus={(e) => onFrameFocus(e, o)}
            >
              <FrameArt o={o} />
            </Link>
          ) : (
            <div
              key={o.id}
              data-obj-id={o.id}
              className={classFor(o)}
              style={frameStyle}
              tabIndex={0}
              role="group"
              aria-label={o.title}
              onFocus={(e) => onFrameFocus(e, o)}
              onKeyDown={(e) => onDivFrameKey(e, o)}
            >
              <FrameArt o={o} />
            </div>
          );
        })}
        <LayorCursor paused={panning || dragId !== null || statusEngaged} entrance={entrance} />
      </motion.div>

      <p className={`dc-hint${entrance.hintGone ? " dc-hint--gone" : ""}`} aria-hidden="true">
        Drag to pan · pinch or Ctrl/⌘ + scroll to zoom
      </p>
      <div className="dc-controls" onPointerDown={(e) => e.stopPropagation()}>
        <button type="button" aria-label="Zoom out" onClick={() => zoomBy(0.8)}>
          −
        </button>
        <motion.span aria-live="off">{zoomText}</motion.span>
        <button type="button" aria-label="Zoom in" onClick={() => zoomBy(1.25)}>
          +
        </button>
        <button
          type="button"
          className="dc-fit"
          onClick={returnToOpening}
        >
          Fit
        </button>
      </div>
    </div>
  );
}
