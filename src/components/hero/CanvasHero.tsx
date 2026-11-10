import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { BoardProvider } from "./BoardContext";
import { DesignCanvas } from "./DesignCanvas";
import { Inspector } from "./Inspector";
import { LayersPanel } from "./LayersPanel";
import { ScrollCue } from "./ScrollCue";
import { VisitorCursor } from "./VisitorCursor";

const STACKED = "(max-width: 860px)";
const PANELS = "(min-width: 1100px)";

function useMatchMedia(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/**
 * The home hero: a full-width design canvas whose Intro and Status objects hold the intro text and
 * the "Open to work" line with the CV menu. At 860px and below the intro and status are ordinary
 * page content above a short canvas of frames, so they render once either way (one h1 on the page).
 * At 1100px and wider the Layers list and the Inspector dock to the screen edges either side of the canvas
 * (after it in the DOM, so the Intro and CV come first in the tab order; the grid places them).
 * Over the hero a mouse pointer is drawn as an "Anonymous <animal>" collaborator cursor (VisitorCursor),
 * and a "Scroll" cue sits at the bottom edge.
 */
export function CanvasHero({ intro, status }: { intro: ReactNode; status: ReactNode }) {
  const stacked = useMatchMedia(STACKED);
  const panels = useMatchMedia(PANELS);
  const heroRef = useRef<HTMLElement>(null);

  return (
    <BoardProvider textObjects={!stacked}>
      <section ref={heroRef} className={`canvas-hero${stacked ? " canvas-hero--stacked" : ""}${panels ? " canvas-hero--panels" : ""}`}>
        {stacked && (
          <div className="canvas-hero-text">
            {intro}
            {status}
          </div>
        )}
        <div className="canvas-hero-stage">
          {stacked ? <DesignCanvas /> : <DesignCanvas intro={intro} status={status} />}
          <ScrollCue />
        </div>
        {panels && (
          <>
            <LayersPanel />
            <Inspector />
          </>
        )}
        <VisitorCursor hostRef={heroRef} />
      </section>
    </BoardProvider>
  );
}
