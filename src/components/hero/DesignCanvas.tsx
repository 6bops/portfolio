import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { trackEvent } from "../../lib/analytics";
import { CANVAS_FRAMES, FRAMES_MIN_X, WORLD_H, WORLD_W, frameHeight } from "./canvasFrames";
import type { CanvasFrame } from "./canvasFrames";

const MIN_SCALE = 0.15;
const MAX_SCALE = 2.5;
/** Opening zoom when the canvas sits beside a text card. */
const OPENING_SCALE = 0.46;
const KEY_PAN = 48;
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

function Frame({ f }: { f: CanvasFrame }) {
  const h = frameHeight(f);
  return (
    <>
      <span className="dc-tag">{f.title}</span>
      <span className="dc-sel" aria-hidden="true" />
      {f.to && <span className="dc-open">Open project →</span>}
      <div className={`dc-art${f.phone ? " dc-art--phone" : ""}`} style={{ width: f.w, height: h }}>
        {f.src ? (
          <img src={f.src} alt="" draggable={false} decoding="async" />
        ) : (
          <div className="dc-soon">Preview coming soon</div>
        )}
      </div>
    </>
  );
}

type DesignCanvasProps = {
  /** Screen px at the left edge of the canvas that the text card covers; the opening view starts to its right. 0 fits the whole board. */
  inset: number;
};

/**
 * A pan and zoom canvas of project frames, like a design tool's board. Drag to pan; pinch or
 * Ctrl/Cmd + scroll to zoom (plain scroll still scrolls the page); with focus, arrows pan,
 * + and - zoom, and 0 fits the board. On touch screens one finger scrolls the page vertically.
 */
export function DesignCanvas({ inset }: DesignCanvasProps) {
  const reduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const zoomText = useTransform(scale, (s) => `${Math.round(s * 100)}%`);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const lastPinch = useRef<number | null>(null);
  const travelled = useRef(0);
  const interacted = useRef(false);
  const reported = useRef(false);
  const [panning, setPanning] = useState(false);

  const markInteracted = useCallback((kind: "pan" | "zoom") => {
    interacted.current = true;
    if (!reported.current) {
      reported.current = true;
      trackEvent("canvas_interact", { kind });
    }
  }, []);

  const fitAll = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const s = clamp(Math.min(el.clientWidth / WORLD_W, el.clientHeight / WORLD_H) * 0.96, MIN_SCALE, MAX_SCALE);
    scale.set(s);
    x.set((el.clientWidth - WORLD_W * s) / 2);
    y.set((el.clientHeight - WORLD_H * s) / 2);
  }, [scale, x, y]);

  const openingView = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    if (inset <= 0) return fitAll();
    scale.set(OPENING_SCALE);
    x.set(inset + 24 - FRAMES_MIN_X * OPENING_SCALE);
    y.set((el.clientHeight - WORLD_H * OPENING_SCALE) / 2);
  }, [inset, fitAll, scale, x, y]);

  // Keep the opening view tidy as the layout settles, until the visitor takes over.
  useLayoutEffect(() => {
    if (!interacted.current) openingView();
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      if (!interacted.current) openingView();
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [openingView]);

  const zoomAt = useCallback(
    (factor: number, cx: number, cy: number) => {
      const s0 = scale.get();
      const s1 = clamp(s0 * factor, MIN_SCALE, MAX_SCALE);
      const k = s1 / s0;
      x.set(cx - (cx - x.get()) * k);
      y.set(cy - (cy - y.get()) * k);
      scale.set(s1);
    },
    [scale, x, y],
  );

  // A non-passive listener, so Ctrl/Cmd + scroll (and trackpad pinch) zooms the canvas instead of the page.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const r = el.getBoundingClientRect();
      markInteracted("zoom");
      zoomAt(Math.exp(-e.deltaY * 0.01), e.clientX - r.left, e.clientY - r.top);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoomAt, markInteracted]);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    travelled.current = 0;
    setPanning(true);
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const p = pointers.current.get(e.pointerId);
    if (!p) return;
    const dx = e.clientX - p.x;
    const dy = e.clientY - p.y;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    travelled.current += Math.abs(dx) + Math.abs(dy);
    if (travelled.current > 4) markInteracted(pointers.current.size === 2 ? "zoom" : "pan");
    if (pointers.current.size === 1) {
      x.set(x.get() + dx);
      y.set(y.get() + dy);
    } else if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const r = e.currentTarget.getBoundingClientRect();
      if (lastPinch.current) zoomAt(dist / lastPinch.current, (a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top);
      lastPinch.current = dist;
    }
  };
  const onPointerEnd = (e: ReactPointerEvent<HTMLDivElement>) => {
    pointers.current.delete(e.pointerId);
    lastPinch.current = null;
    if (pointers.current.size === 0) setPanning(false);
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
      markInteracted("zoom");
      fitAll();
    }
  };

  const onFrameClick = (e: ReactMouseEvent, f: CanvasFrame) => {
    if (travelled.current > 4) e.preventDefault(); // a drag is not a click
    else trackEvent("canvas_frame_click", { frame: f.id });
  };

  return (
    <div
      ref={viewportRef}
      className={`dc-viewport${panning ? " dc-viewport--panning" : ""}${reduceMotion ? " dc-viewport--still" : ""}`}
      role="group"
      tabIndex={0}
      aria-label="Project canvas. Drag to pan, pinch or hold Ctrl or Command and scroll to zoom. With focus here, arrow keys pan, plus and minus zoom, and 0 fits the board."
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      onKeyDown={onKeyDown}
    >
      <motion.div className="dc-world" style={{ x, y, scale, width: WORLD_W, height: WORLD_H }}>
        <div className="dc-dots" aria-hidden="true" />
        {CANVAS_FRAMES.map((f, i) => {
          const style = { left: f.x, top: f.y, animationDelay: `${0.1 * i}s` };
          return f.to ? (
            <Link key={f.id} to={f.to} className="dc-frame" style={style} draggable={false} onClickCapture={(e) => onFrameClick(e, f)}>
              <Frame f={f} />
            </Link>
          ) : (
            <div key={f.id} className="dc-frame" style={style}>
              <Frame f={f} />
            </div>
          );
        })}
      </motion.div>

      <div className="dc-cursor" aria-hidden="true">
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
          <path d="M1 1l11 8.5-5 1 3 6.5-2.5 1-3-6.5L1 15V1z" fill="currentColor" stroke="#0e0e0e" />
        </svg>
        <span>Layor</span>
      </div>

      <p className="dc-hint">Drag to pan · pinch or ⌘ scroll to zoom</p>
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
          onClick={() => {
            markInteracted("zoom");
            fitAll();
          }}
        >
          Fit
        </button>
      </div>
    </div>
  );
}
