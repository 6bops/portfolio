import { useCallback, useEffect, useRef, useState } from "react";
import { animate, useMotionValue } from "framer-motion";
import type { MotionValue } from "framer-motion";

/** Where the Intro starts, in board units from its place: right of it and above it. */
const ENTRANCE_DX = 120;
const ENTRANCE_DY = -48;
/** A beat to "grab" it, then the drag: about 0.8s in all. */
const ENTRANCE_DELAY = 0.1;
const ENTRANCE_SECONDS = 0.7;
const ENTRANCE_EASE = [0.22, 1, 0.36, 1] as const;
/** The coach chip stays on Layor's cursor this long after the entrance (unless the visitor interacts first). */
const CHIP_SECONDS = 3.5;

// Once per page view, not per mount: a visitor who leaves the home page and comes back does not see
// the entrance, the chip or the bottom hint again. A reload starts a new page view.
let entrancePlayed = false;
let hintDismissed = false;

export type HeroEntrance = {
  /** The Intro is being dropped in; Layor's cursor rides its top-left corner. */
  running: boolean;
  /** The Intro wrapper's visual offset in board units (purely a transform; board positions never change). */
  offX: MotionValue<number>;
  offY: MotionValue<number>;
  /** Layor's cursor carries the "Drag, zoom, click anything" chip. */
  chip: boolean;
  /** The bottom hint has done its job (the visitor has panned, zoomed or dragged). */
  hintGone: boolean;
  /** The first pan, zoom or drag: ends the entrance, the chip and the bottom hint. */
  noteInteraction(): void;
  /** Where the cursor was when the entrance ended, as an offset from the Intro's corner; read once. */
  takeHandoff(): { dx: number; dy: number } | null;
};

/**
 * The home page's opening choreography. Layor's cursor appears at the corner of the Intro, which starts
 * offset, and "drags" it into place in about 0.8s; the cursor then roams on from where it is. It is a
 * transform on the Intro's wrapper only: no opacity, no board `positions`, no layout.
 *
 * `eligible` is true on desktop (not stacked, not touch) without reduced motion. It is read for the first
 * render only to decide whether to play, so a resize or breakpoint toggle never starts a replay; losing
 * eligibility mid-way ends the entrance at once. A press or a key during it ends it at once, too.
 */
export function useHeroEntrance(eligible: boolean): HeroEntrance {
  const [running, setRunning] = useState(() => eligible && !entrancePlayed);
  const [chip, setChip] = useState(running);
  const [hintGone, setHintGone] = useState(hintDismissed);
  const offX = useMotionValue(running ? ENTRANCE_DX : 0);
  const offY = useMotionValue(running ? ENTRANCE_DY : 0);
  const handoff = useRef<{ dx: number; dy: number } | null>(null);
  const runningRef = useRef(running);
  runningRef.current = running;

  const finish = useCallback(() => {
    if (!runningRef.current) return;
    runningRef.current = false;
    handoff.current = { dx: offX.get(), dy: offY.get() };
    offX.stop();
    offY.stop();
    offX.set(0);
    offY.set(0);
    entrancePlayed = true;
    setRunning(false);
  }, [offX, offY]);

  useEffect(() => {
    if (!running) return;
    if (!eligible) {
      finish();
      return;
    }
    const t = { delay: ENTRANCE_DELAY, duration: ENTRANCE_SECONDS, ease: ENTRANCE_EASE };
    const ax = animate(offX, 0, { ...t, onComplete: finish });
    const ay = animate(offY, 0, t);
    window.addEventListener("pointerdown", finish, true);
    window.addEventListener("keydown", finish, true);
    return () => {
      ax.stop();
      ay.stop();
      window.removeEventListener("pointerdown", finish, true);
      window.removeEventListener("keydown", finish, true);
    };
  }, [running, eligible, finish, offX, offY]);

  // The chip lingers a few seconds after the drop, then goes.
  useEffect(() => {
    if (running || !chip) return;
    const id = window.setTimeout(() => setChip(false), CHIP_SECONDS * 1000);
    return () => window.clearTimeout(id);
  }, [running, chip]);

  const noteInteraction = useCallback(() => {
    hintDismissed = true;
    setHintGone(true);
    setChip(false);
    finish();
  }, [finish]);

  const takeHandoff = useCallback(() => {
    const h = handoff.current;
    handoff.current = null;
    return h;
  }, []);

  return { running, offX, offY, chip, hintGone, noteInteraction, takeHandoff };
}
