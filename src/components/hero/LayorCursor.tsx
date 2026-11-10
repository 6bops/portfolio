import { useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useBoard } from "./BoardContext";

/** The closed path the cursor travels, through the centers of these objects (those on the board). */
const WAYPOINTS = ["intro", "first-bank", "status", "sharply", "mumbuddie-home", "indigoemr"];
/** Board units per second. */
const SPEED = 110;
/** A frame this long (after a tab was hidden, say) counts as 50ms, so the cursor never jumps. */
const MAX_DT = 0.05;

const ease = (t: number) => 0.5 - Math.cos(Math.PI * t) / 2;

/**
 * A second cursor, labelled "Layor", that wanders the board hovering objects the way a collaborator's
 * would. It lives inside the scaled world, so it moves and zooms with the board, and it reads the live
 * positions and sizes, so it follows objects the visitor has moved. It hovers by calling `setHover`
 * (the same hover the Layers panel drives), only when the object under it changes, and it never
 * overrides a hover it did not set. While `paused` (the real pointer is over the canvas, or the board
 * is being dragged) it fades out, clears its own hover and holds its place; it carries on from there.
 * With reduced motion it renders nothing and never hovers.
 */
export function LayorCursor({ paused }: { paused: boolean }) {
  const board = useBoard();
  const boardRef = useRef(board);
  boardRef.current = board;

  const reduceMotion = useReducedMotion();
  const ids = useMemo(() => WAYPOINTS.filter((id) => board.objects.some((o) => o.id === id)), [board.objects]);
  const roam = !reduceMotion && ids.length >= 2;
  const active = roam && !paused;

  const elRef = useRef<HTMLDivElement>(null);
  /** Where the cursor is on its path: the segment it is on and how far along it (0 to 1). Survives pauses. */
  const pathRef = useRef({ seg: 0, t: 0 });
  /** The object the cursor last hovered through `setHover` (null: it set none, or cleared it). */
  const hoverSet = useRef<string | null>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!active || !el) return;
    const path = pathRef.current;
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

    const place = (pt: { x: number; y: number }) => {
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
  }, [active, ids]);

  if (!roam) return null;
  return (
    <div ref={elRef} className="dc-cursor" aria-hidden="true">
      <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
        <path d="M1 1l11 8.5-5 1 3 6.5-2.5 1-3-6.5L1 15V1z" fill="currentColor" stroke="var(--color-bg)" />
      </svg>
      <span>Layor</span>
    </div>
  );
}
