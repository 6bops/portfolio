import { useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useBoard } from "./BoardContext";
import { useNoHover } from "./heroMedia";
import type { HeroEntrance } from "./useHeroEntrance";

/** The closed path the cursor travels, through the centers of these objects (those on the board). */
const WAYPOINTS = ["intro", "first-bank", "status", "sharply", "mumbuddie-home", "indigoemr"];
/** Board units per second. */
const SPEED = 110;
/** A frame this long (after a tab was hidden, say) counts as 50ms, so the cursor never jumps. */
const MAX_DT = 0.05;

/** After the entrance the cursor eases from where the drag left it onto its path over this long. */
const HANDOFF_SECONDS = 0.6;

const ease = (t: number) => 0.5 - Math.cos(Math.PI * t) / 2;

/**
 * A second cursor, labelled "Layor", that wanders the board hovering objects the way a collaborator's
 * would. It lives inside the scaled world, so it moves and zooms with the board, and it reads the live
 * positions and sizes, so it follows objects the visitor has moved. It hovers by calling `setHover`
 * (the same hover the Layers panel drives), only when the object under it changes, and it never
 * overrides a hover it did not set. It keeps roaming while the visitor's own pointer rests over the canvas;
 * only while `paused` (the visitor is panning or dragging, the CV menu is open, or keyboard focus is in the
 * Status object) does it fade out, clear its own hover and hold its place, carrying on from there. With reduced motion, in the stacked layout and on touch it renders
 * nothing and never hovers. It starts only once every waypoint object has reported its size, so it begins
 * at the Intro.
 *
 * During the home page's entrance (`entrance.running`) it rides the Intro's top-left corner as the Intro
 * is dragged into place, carrying the "Drag, zoom, click anything" chip; it then eases from there onto
 * its path instead of jumping.
 */
export function LayorCursor({ paused, entrance }: { paused: boolean; entrance: HeroEntrance }) {
  const board = useBoard();
  const boardRef = useRef(board);
  boardRef.current = board;

  const reduceMotion = useReducedMotion();
  const ids = useMemo(() => WAYPOINTS.filter((id) => board.objects.some((o) => o.id === id)), [board.objects]);
  const noHover = useNoHover();
  const roam = !reduceMotion && !noHover && ids.length >= 2;
  // Text objects report their sizes after the first render; wait for all of them rather than skip a segment.
  const ready = ids.every((id) => board.sizes[id]);
  const active = roam && ready && !paused && !entrance.running;

  const elRef = useRef<HTMLDivElement>(null);
  /** Where the cursor is on its path: the segment it is on and how far along it (0 to 1). Survives pauses. */
  const pathRef = useRef({ seg: 0, t: 0 });
  /** The object the cursor last hovered through `setHover` (null: it set none, or cleared it). */
  const hoverSet = useRef<string | null>(null);

  // The entrance: the cursor sits on the Intro's top-left corner, which is offset by the same motion values
  // that move the Intro, so the two travel together.
  const { running, offX, offY, takeHandoff } = entrance;
  useEffect(() => {
    const el = elRef.current;
    if (!running || !roam || !el) return;
    const intro = boardRef.current.positions.intro;
    const put = () => {
      el.style.transform = `translate3d(${(intro.x + offX.get()).toFixed(1)}px, ${(intro.y + offY.get()).toFixed(1)}px, 0)`;
    };
    put();
    el.style.opacity = "1";
    const stops = [offX.on("change", put), offY.on("change", put)];
    return () => stops.forEach((stop) => stop());
  }, [running, roam, offX, offY]);

  useEffect(() => {
    const el = elRef.current;
    if (!active || !el) return;
    const path = pathRef.current;
    // Coming out of the entrance: start where the drag left the cursor and ease onto the path.
    const handoff = takeHandoff();
    const introAt = boardRef.current.positions.intro;
    const from = handoff ? { x: introAt.x + handoff.dx, y: introAt.y + handoff.dy } : null;
    let blend = 0;
    const { setHover } = boardRef.current;

    const center = (id: string) => {
      const b = boardRef.current;
      const p = b.positions[id];
      const s = b.sizes[id];
      return p && s ? { x: p.x + s.w / 2, y: p.y + s.h / 2 } : null;
    };

    /** The topmost object under the point: text objects sit above frames. */
    const hitTest = (px: number, py: number) => {
      const b = boardRef.current;
      let hit: string | null = null;
      for (const o of b.objects) {
        const p = b.positions[o.id];
        const s = b.sizes[o.id];
        if (!p || !s) continue;
        if (px >= p.x && px <= p.x + s.w && py >= p.y && py <= p.y + s.h && (hit === null || o.kind === "text")) hit = o.id;
      }
      return hit;
    };

    /** Move along the path by `dist` board units; returns the cursor point, or null with no usable waypoints. */
    const step = (dist: number) => {
      let guard = ids.length;
      for (;;) {
        const a = center(ids[path.seg % ids.length]);
        const b = center(ids[(path.seg + 1) % ids.length]);
        if (!a || !b) {
          // An object with no size yet: skip its segment.
          path.seg = (path.seg + 1) % ids.length;
          path.t = 0;
          if (--guard < 0) return null;
          continue;
        }
        const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
        path.t += dist / len;
        if (path.t >= 1) {
          dist = (path.t - 1) * len;
          path.seg = (path.seg + 1) % ids.length;
          path.t = 0;
          if (--guard < 0) return { x: b.x, y: b.y };
          continue;
        }
        const k = ease(path.t);
        return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k };
      }
    };

    const place = (target: { x: number; y: number }) => {
      let pt = target;
      if (from && blend < 1) {
        const k = ease(blend);
        pt = { x: from.x + (target.x - from.x) * k, y: from.y + (target.y - from.y) * k };
      }
      el.style.transform = `translate3d(${pt.x.toFixed(1)}px, ${pt.y.toFixed(1)}px, 0)`;
      const hit = hitTest(pt.x, pt.y);
      if (hit === hoverSet.current) return;
      // The Layers panel (or anything else) is hovering something of its own: leave it be.
      const current = boardRef.current.hoverId;
      if (current !== null && current !== hoverSet.current) return;
      hoverSet.current = hit;
      setHover(hit);
    };

    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, MAX_DT) : 0;
      last = now;
      blend = Math.min(1, blend + dt / HANDOFF_SECONDS);
      const pt = step(SPEED * dt);
      if (pt) place(pt);
      raf = requestAnimationFrame(tick);
    };

    // Show it where it stopped (or at the first waypoint) before it fades in.
    const start = step(0);
    if (start) {
      place(start);
      el.style.opacity = "1";
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      el.style.opacity = "0";
      // Clear only the hover this cursor set, and only if it is still the one showing.
      if (hoverSet.current !== null) {
        if (boardRef.current.hoverId === hoverSet.current) setHover(null);
        hoverSet.current = null;
      }
    };
  }, [active, ids, takeHandoff]);

  if (!roam) return null;
  return (
    <div ref={elRef} className="dc-cursor" aria-hidden="true">
      <svg width="16" height="20" viewBox="0 0 14 18" fill="none">
        <path d="M1 1l11 8.5-5 1 3 6.5-2.5 1-3-6.5L1 15V1z" fill="currentColor" stroke="var(--color-bg)" />
      </svg>
      <span>Layor</span>
      <em className={`dc-cursor-chip${entrance.chip ? " dc-cursor-chip--on" : ""}`}>Drag, zoom, click anything</em>
    </div>
  );
}
