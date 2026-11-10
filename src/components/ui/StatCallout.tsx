import { animate, useInView, useReducedMotion } from "framer-motion";
import type { UseInViewOptions } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { parseStatValue } from "../../lib/countUp";
import { color, font } from "../../styles/theme";
import type { Stat } from "../../types";

type StatCalloutProps = Stat & {
  /** Smaller ceiling for tight multi-column grids (e.g. the homepage results row) where the default size overflows a narrow column. */
  compact?: boolean;
  /** Count the figure up from 0 once it scrolls into view. Values without a single number are shown as-is. */
  countUp?: boolean;
  /** Seconds to wait before counting, for figures inside a delayed FadeIn so the count is not spent while still invisible. */
  countDelay?: number;
  /** IntersectionObserver root margin that starts the count. Default (-80px) matches StaggerItem and the default FadeIn reveal; a figure inside a FadeIn with another margin passes the same one. */
  viewMargin?: UseInViewOptions["margin"];
};

const COUNT_UP_SECONDS = 1.2;
const DEFAULT_VIEW_MARGIN: UseInViewOptions["margin"] = "0px 0px -80px 0px";

/**
 * Holds the final number until the figure scrolls into view, so a page that never
 * reports visibility (print, very short pages) still shows the real value. The
 * reset to 0 runs in a layout effect, before the first painted frame of the count.
 * The margin must match the reveal the figure sits in (StaggerItem and the default FadeIn use -80px),
 * so the count starts as the figure fades in and never resets a figure that is already showing.
 */
function useCountedNumber(target: number, enabled: boolean, delay: number, margin: UseInViewOptions["margin"]) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin });
  const reduceMotion = useReducedMotion();
  const [current, setCurrent] = useState(target);

  useLayoutEffect(() => {
    if (!enabled || reduceMotion || !inView) return;
    setCurrent(0);
    const controls = animate(0, target, {
      delay,
      duration: COUNT_UP_SECONDS,
      ease: "easeOut",
      onUpdate: (latest) => setCurrent(Math.round(latest)),
    });
    return () => controls.stop();
  }, [enabled, reduceMotion, inView, target, delay]);

  return { ref, current };
}

/** Large centred stat with a mono caption — the single-figure emphasis block. */
export function StatCallout({ value, label, compact = false, countUp = false, countDelay = 0, viewMargin = DEFAULT_VIEW_MARGIN }: StatCalloutProps) {
  const parts = countUp ? parseStatValue(value) : null;
  const { ref, current } = useCountedNumber(parts?.number ?? 0, parts !== null, countDelay, viewMargin);
  const shown = parts ? `${parts.prefix}${current}${parts.suffix}` : value;

  return (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <p
        ref={ref}
        style={{
          fontFamily: font.display,
          fontWeight: 800,
          fontSize: compact ? "clamp(22px, 5vw, 38px)" : "clamp(40px, 6vw, 56px)",
          lineHeight: 1.1,
          color: color.ink,
          margin: 0,
          overflowWrap: "anywhere",
          // Only when counting: other stats keep their existing digit shapes.
          ...(countUp ? { fontVariantNumeric: "tabular-nums" } : {}),
        }}
      >
        {shown}
      </p>
      <p
        style={{
          fontFamily: font.mono,
          fontSize: "13px",
          color: color.soft,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginTop: "8px",
          maxWidth: "320px",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
        }}
      >
        {label}
      </p>
    </div>
  );
}
