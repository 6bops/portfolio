import { useCallback, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { SKIN_ORDER } from "../data/skins";
import { useSkin } from "./useSkin";

const STEP_MS = 2000;

/**
 * Plays SKIN_ORDER once on mount (~2s per skin, ~6s in all) so the swap reads as an
 * invitation before anyone has touched it. One timeout per step rather than an
 * interval: stop() has nothing to race against and a stale tick can never fire.
 * Skipped entirely under reduced motion.
 */
export function useSkinCycle(): { stop: () => void } {
  const { select } = useSkin();
  const reduceMotion = useReducedMotion();
  const timers = useRef<number[]>([]);

  const stop = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    // The first skin is already showing, so only the remaining ones are scheduled.
    timers.current = SKIN_ORDER.slice(1).map((id, i) =>
      window.setTimeout(() => select(id, "autocycle"), STEP_MS * (i + 1)),
    );
    return stop;
  }, [reduceMotion, select, stop]);

  return { stop };
}
