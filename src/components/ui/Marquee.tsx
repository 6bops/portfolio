import type { ReactNode } from "react";

type MarqueeProps = {
  items: ReactNode[];
  /** Seconds for one full loop. */
  duration?: number;
  separator?: ReactNode;
};

/**
 * Infinite horizontal scroll of repeated items — pure CSS `translateX` animation
 * (see `.marquee-track` in global.css), which also pauses under prefers-reduced-motion.
 * Renders the item list twice back-to-back so the loop point is seamless; the second
 * copy is hidden from assistive tech since it's purely visual.
 */
export function Marquee({ items, duration = 28, separator = "·" }: MarqueeProps) {
  const group = (hidden: boolean) => (
    <div className="marquee-group" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <span className="marquee-item">{item}</span>
          <span className="marquee-sep" aria-hidden="true">
            {separator}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee">
      <div className="marquee-track" style={{ animationDuration: `${duration}s` }}>
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
