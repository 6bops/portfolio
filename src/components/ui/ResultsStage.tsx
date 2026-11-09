import { RESULTS } from "../../data/results";
import { StatCallout } from "./StatCallout";

/** The proof figures under the hero as one row, divided by hairlines. */
export function ResultsStage() {
  return (
    <section className="results-stage" aria-label="Results">
      {RESULTS.map((card) => (
        <div key={card.id} className="results-stage-card">
          <StatCallout value={card.value} label={card.label} compact countUp />
          <p className="results-stage-context">{card.context}</p>
        </div>
      ))}
    </section>
  );
}
