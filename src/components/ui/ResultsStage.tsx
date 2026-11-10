import { RESULTS } from "../../data/results";
import { StatCallout } from "./StatCallout";

/** Matches the FadeIn delay the home page wraps this row in, so the count starts as the row appears. */
const COUNT_DELAY = 0.65;
/**
 * The reveal margin of that FadeIn: the row appears as it nears the screen's bottom edge (it peeks in under the
 * hero), and the counts use the same margin so a figure that is showing never resets to 0.
 */
export const RESULTS_REVEAL_MARGIN = "0px 0px 120px 0px";

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
    </>
  );
}
