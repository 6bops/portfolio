import type { Stat } from "../../types";

/**
 * The figures that carry a case study, in a hairline-ruled row under the result
 * line. Static on purpose: no count-up, so the numbers are readable in the first
 * view. Renders nothing when a project has no figures.
 */
export function GlanceRow({ stats }: { stats?: Stat[] }) {
  if (!stats || stats.length === 0) return null;

  return (
    <section className="glance-row" aria-label="Key figures">
      {stats.map((s) => (
        <div className="glance-item" key={s.label}>
          <p className="glance-value">{s.value}</p>
          <p className="glance-label">{s.label}</p>
        </div>
      ))}
    </section>
  );
}
