import { RESULTS } from "../../data/results";
import { StatCallout } from "./StatCallout";

/** Matches the FadeIn delay the home page wraps this row in, so the count starts as the row appears. */
const COUNT_DELAY = 0.65;

/** The proof figures under the hero as one row, divided by hairlines. */
export function ResultsStage() {
  return (
    <section className="results-stage" aria-label="Results">
      {RESULTS.map((card) => (
        <div key={card.id} className="results-stage-card">
          <StatCallout value={card.value} label={card.label} compact countUp countDelay={COUNT_DELAY} />
          <p className="results-stage-context">{card.context}</p>
        </div>
      ))}
    </section>
  );
}
