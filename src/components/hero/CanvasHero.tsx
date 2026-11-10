import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { BoardProvider } from "./BoardContext";
import { DesignCanvas } from "./DesignCanvas";

const STACKED = "(max-width: 860px)";

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
 */
export function CanvasHero({ intro, status }: { intro: ReactNode; status: ReactNode }) {
  const stacked = useMatchMedia(STACKED);

  return (
    <BoardProvider textObjects={!stacked}>
      <section className={`canvas-hero${stacked ? " canvas-hero--stacked" : ""}`}>
        {stacked && (
          <div className="canvas-hero-text">
            {intro}
            {status}
          </div>
        )}
        <div className="canvas-hero-stage">
          {stacked ? <DesignCanvas /> : <DesignCanvas intro={intro} status={status} />}
        </div>
      </section>
    </BoardProvider>
  );
}
