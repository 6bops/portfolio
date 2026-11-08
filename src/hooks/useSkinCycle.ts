import { useCallback, useEffect, useRef, type RefObject } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { SKIN_ORDER } from "../data/skins";
import { useCycleDone, useSkin } from "./useSkin";

const STEP_MS = 2000;
// Head start for the stage's own reveal (FadeIn delay 0.65s on the home page plus its
// settle), so the first skin is fully visible before the first swap.
const REVEAL_MS = 800;

/**
 * Plays SKIN_ORDER once per page load (~2s per skin, ~6s in all) so the swap reads as
 * an invitation before anyone has touched it. The clock starts when `target` (the stage
 * panel) is at least half in view, not on mount: the stage can sit below the fold, and a
 * cycle that plays to an unseen stage is spent for nothing. One timeout per step rather
 * than an interval: stop() has nothing to race against and a stale tick can never fire.
 * Never starts under reduced motion, after the visitor has picked a skin, or when the
 * stage remounts after an earlier play, stop or unmount: the provider's `done` flag
 * outlives the stage. A stage that unmounts before it was ever in view has not played,
 * so it leaves the flag alone.
 */
export function useSkinCycle(target: RefObject<Element | null>): { stop: () => void } {
  const { select } = useSkin();
  const reduceMotion = useReducedMotion();
  const done = useCycleDone();
  const inView = useInView(target, { once: true, amount: 0.5 });
  const timers = useRef<number[]>([]);
  const mounted = useRef(false);
  const started = useRef(false);

  const clear = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  }, []);

  const stop = useCallback(() => {
    clear();
    done.current = true;
  }, [clear, done]);

  useEffect(() => {
    if (!inView || reduceMotion || done.current) return;
    started.current = true;
    // The first skin is already showing, so only the remaining ones are scheduled.
    const last = SKIN_ORDER.length - 2;
    timers.current = SKIN_ORDER.slice(1).map((id, i) =>
      window.setTimeout(() => {
        // A selection made outside the stage (e.g. the palette) can't clear these timers.
        if (done.current) return;
        select(id, "autocycle");
        if (i === last) done.current = true;
      }, REVEAL_MS + STEP_MS * (i + 1)),
    );
    return clear;
  }, [inView, reduceMotion, select, clear, done]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      clear();
      // StrictMode re-runs the effect synchronously, so by this timeout `mounted` is
      // true again; a real unmount leaves it false and the cycle is not resumed later.
      window.setTimeout(() => {
        if (!mounted.current && started.current) done.current = true;
      }, 0);
    };
  }, [clear, done]);

  return { stop };
}
