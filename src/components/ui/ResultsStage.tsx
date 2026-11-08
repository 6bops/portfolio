import { Link } from "react-router-dom";
import { RESULTS, resolveResultLink } from "../../data/results";
import type { ResultCard } from "../../data/results";
import { trackEvent } from "../../lib/analytics";
import { CONTACT_EMAIL } from "../../lib/contact";
import { StatCallout } from "./StatCallout";

function ResultLinkLine({ card }: { card: ResultCard }) {
  const resolved = resolveResultLink(card.link);

  if (resolved.kind === "case-study") {
    return (
      <Link
        to={resolved.to}
        className="results-stage-link"
        onClick={() => trackEvent("results_card_click", { card: card.id, destination: "case_study" })}
      >
        Read the case study →
      </Link>
    );
  }

  const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Ask about: ${card.value} ${card.label}`)}`;
  return (
    // Plain anchor rather than <PillLink>: it cannot set from_path, and its href
    // branch forces target="_blank", leaving a stray tab on a mailto.
    <a
      href={href}
      className="results-stage-link"
      onClick={() => {
        trackEvent("results_card_click", { card: card.id, destination: "ask" });
        trackEvent("contact_click", { href, from_path: "results_stage", card: card.id });
      }}
    >
      Not on the site: ask me
    </a>
  );
}

/** Four proof figures under the hero, divided by hairlines like the stats bar. */
export function ResultsStage() {
  return (
    <section className="results-stage" aria-label="Results">
      {RESULTS.map((card) => (
        <div key={card.id} className="results-stage-card">
          <StatCallout value={card.value} label={card.label} compact countUp />
          <p className="results-stage-context">{card.context}</p>
          <ResultLinkLine card={card} />
        </div>
      ))}
    </section>
  );
}
