import { useCallback, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { SKIN_ORDER } from "../data/skins";
import { useCycleDone, useSkin } from "./useSkin";

const STEP_MS = 2000;

/**
 * Plays SKIN_ORDER once per page load (~2s per skin, ~6s in all) so the swap reads as
 * an invitation before anyone has touched it. One timeout per step rather than an
 * interval: stop() has nothing to race against and a stale tick can never fire.
 * Never starts under reduced motion, after the visitor has picked a skin, or when the
 * stage remounts after an earlier play, stop or unmount: the provider's `done` flag
 * outlives the stage.
 */
export function useSkinCycle(): { stop: () => void } {
  const { select } = useSkin();
  const reduceMotion = useReducedMotion();
  const done = useCycleDone();
  const timers = useRef<number[]>([]);
  const mounted = useRef(false);

  const clear = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  }, []);

  const stop = useCallback(() => {
    clear();
    done.current = true;
  }, [clear, done]);

  useEffect(() => {
    mounted.current = true;
    if (!reduceMotion && !done.current) {
      // The first skin is already showing, so only the remaining ones are scheduled.
      const last = SKIN_ORDER.length - 2;
      timers.current = SKIN_ORDER.slice(1).map((id, i) =>
        window.setTimeout(() => {
          select(id, "autocycle");
          if (i === last) done.current = true;
        }, STEP_MS * (i + 1)),
      );
    }
    return () => {
      mounted.current = false;
      clear();
      // StrictMode re-runs the effect synchronously, so by this timeout `mounted` is
      // true again; a real unmount leaves it false and the cycle is not resumed later.
      window.setTimeout(() => {
        if (!mounted.current) done.current = true;
      }, 0);
    };
  }, [reduceMotion, select, clear, done]);

  return { stop };
}
