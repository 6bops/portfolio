import { useRef } from "react";
import type { PointerEvent } from "react";

/**
 * Click-and-drag horizontal scrolling for mouse users (grab/grabbing cursor via the
 * `.dragging` class callers should style). Touch devices already get native momentum
 * scroll from `overflow-x: auto`, so pointer handling here is gated to `pointerType
 * === "mouse"` to avoid fighting that.
 */
export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const state = useRef({ dragging: false, startX: 0, startScroll: 0 });

  const onPointerDown = (e: PointerEvent<T>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    state.current = { dragging: true, startX: e.clientX, startScroll: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
    el.classList.add("dragging");
  };

  const onPointerMove = (e: PointerEvent<T>) => {
    const el = ref.current;
    if (!el || !state.current.dragging) return;
    el.scrollLeft = state.current.startScroll - (e.clientX - state.current.startX);
  };

  const endDrag = () => {
    ref.current?.classList.remove("dragging");
    state.current.dragging = false;
  };

  return { ref, onPointerDown, onPointerMove, onPointerUp: endDrag, onPointerLeave: endDrag };
}
