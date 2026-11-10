import { RESULTS } from "../../data/results";
import { StatCallout } from "./StatCallout";

/** Matches the FadeIn delay the home page wraps this row in, so the count starts as the row appears. */
const COUNT_DELAY = 0.65;
/**
 * The reveal margin of that FadeIn: the row appears as it nears the screen's bottom edge (it peeks in under the
 * hero), and the counts use the same margin so a figure that is showing never resets to 0.
 */
export const RESULTS_REVEAL_MARGIN = "0px 0px 120px 0px";

const RESULTS_SOURCE_URL = "https://first-holdco.com/wp-content/uploads/2026/05/FirstHoldCo-FY-2025-Q1-2026-Results-Presentation-.pdf";

/** The proof figures under the hero as one row, with a single caption saying what they are outcomes of. */
export function ResultsStage() {
  return (
    <>
      <p id="results-caption" className="results-stage-caption">
        Across the 30+ products I've designed and shipped
      </p>
      <section className="results-stage" aria-labelledby="results-caption">
        {RESULTS.map((card) => (
          <div key={card.id} className="results-stage-card">
            <StatCallout value={card.value} label={card.label} compact countUp countDelay={COUNT_DELAY} viewMargin={RESULTS_REVEAL_MARGIN} />
          </div>
        ))}
      </section>
      <p className="results-stage-footnote">
        FirstDirect 2.0 transaction value (₦18.8 trillion, about £9.4B at ₦2,008 to £1): First HoldCo FY 2025 &amp; Q1 2026{" "}
        <a href={RESULTS_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="results-stage-footnote-link">
          results presentation
        </a>
        , May 2026.
      </p>
    </>
  );
}
