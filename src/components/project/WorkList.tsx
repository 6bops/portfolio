import { trackEvent } from "../../lib/analytics";
import { sectionLabel } from "../../styles/theme";
import type { WorkEntry } from "../../types";

type WorkListProps = {
  entries: WorkEntry[];
};

/** Compact list of other work, shown under the cards. Renders nothing when there are no entries. */
export function WorkList({ entries }: WorkListProps) {
  if (entries.length === 0) return null;

  return (
    <section aria-labelledby="work-list-heading" className="work-list">
      <h2 id="work-list-heading" style={{ ...sectionLabel, marginBottom: "24px" }}>
        Everything else
      </h2>
      <ul className="work-list-items">
        {entries.map((entry) => (
          <li key={entry.id} className="work-list-item">
            <h3 className="work-list-title">
              {entry.href ? (
                <a
                  href={entry.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-list-link"
                  onClick={() => trackEvent("work_entry_click", { id: entry.id, destination: "live_site" })}
                >
                  {entry.title}
                </a>
              ) : (
                entry.title
              )}
            </h3>
            <p className="work-list-meta">{[entry.company, entry.role, entry.years].join(" · ")}</p>
            <p className="work-list-summary">{entry.summary}</p>
            {entry.tags.length > 0 && (
              <ul className="work-list-tags">
                {entry.tags.map((tag) => (
                  <li key={tag} className="work-list-tag">
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
