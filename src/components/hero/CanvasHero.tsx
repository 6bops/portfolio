import { useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { DesignCanvas } from "./DesignCanvas";

/**
 * The home hero: a full-width design canvas with the intro text in a frosted card on top.
 * The card sets the hero's height, so nothing it holds can be clipped (the CV menu opens over it).
 * Below 860px the card sits above the canvas instead of over it.
 */
export function CanvasHero({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [inset, setInset] = useState(0);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const card = cardRef.current;
    if (!root || !card) return;
    const measure = () => {
      const stacked = window.matchMedia("(max-width: 860px)").matches;
      setInset(stacked ? 0 : Math.round(card.getBoundingClientRect().right - root.getBoundingClientRect().left));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    ro.observe(card);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="canvas-hero">
      <div className="canvas-hero-stage">
        <DesignCanvas inset={inset} />
      </div>
      <div ref={cardRef} className="canvas-hero-card">
        {children}
      </div>
    </div>
  );
}
