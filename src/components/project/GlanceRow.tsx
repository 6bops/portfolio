import type { Stat } from "../../types";

/** A single long word cannot wrap at a space, so on narrow screens it gets a smaller size. */
const hasLongWord = (value: string) => value.split(/\s+/).some((w) => w.length >= 8 && /^[A-Za-z]+$/.test(w));

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
          <p className={hasLongWord(s.value) ? "glance-value glance-value--word" : "glance-value"}>
            {s.value}
          </p>
          <p className="glance-label">{s.label}</p>
        </div>
      ))}
    </section>
  );
}
