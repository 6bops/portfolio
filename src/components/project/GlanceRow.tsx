import type { Glance, GlanceGroup, GlanceNoteSegment, Stat } from "../../types";

/** A single long word cannot wrap at a space, so on narrow screens it gets a smaller size. */
const hasLongWord = (value: string) => value.split(/\s+/).some((w) => w.length >= 8 && /^[A-Za-z]+$/.test(w));

/** When a "from → to" figure wraps, break before the arrow so "→ 7%" is not orphaned from the arrow. */
const keepArrowWithTarget = (value: string) => value.replace(/ → /g, " → ");

function Tiles({ items }: { items: Stat[] }) {
  return (
    <div className={items.length === 3 ? "glance-row glance-row--3" : "glance-row"}>
      {items.map((s) => (
        <div className="glance-item" key={s.label}>
          <p className={hasLongWord(s.value) ? "glance-value glance-value--word" : "glance-value"}>
            {keepArrowWithTarget(s.value)}
          </p>
          <p className="glance-label">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

function Note({ segments }: { segments: GlanceNoteSegment[] }) {
  return (
    <p className="glance-note">
      {segments.map((seg, i) =>
        typeof seg === "string" ? (
          <span key={i}>{seg}</span>
        ) : (
          <a key={i} href={seg.href} target="_blank" rel="noopener noreferrer" className="glance-note-link">
            {seg.text}
          </a>
        ),
      )}
    </p>
  );
}

function Group({ group }: { group: GlanceGroup }) {
  return (
    <section className="glance-group" aria-label={group.label}>
      {/* The section carries the accessible name; the visible label would be read twice. */}
      <p className="glance-group-label" aria-hidden="true">
        {group.label}
      </p>
      <Tiles items={group.items} />
      {group.note && <Note segments={group.note} />}
    </section>
  );
}

/**
 * The figures that carry a case study, in hairline-ruled rows under the result
 * line. A project gives either one flat list or labelled groups (so figures the
 * reader owns can be told apart from figures someone else reported). Static on
 * purpose: no count-up, so the numbers are readable in the first view. Renders
 * nothing when a project has no figures.
 */
export function GlanceRow({ glance }: { glance?: Glance }) {
  if (!glance) return null;

  if (Array.isArray(glance)) {
    if (glance.length === 0) return null;
    return (
      <section className="glance-flat" aria-label="Key figures">
        <Tiles items={glance} />
      </section>
    );
  }

  if (glance.groups.length === 0) return null;
  return (
    <div className="glance-groups">
      {glance.intro && <p className="glance-intro">{glance.intro}</p>}
      {glance.groups.map((g) => (
        <Group key={g.label} group={g} />
      ))}
    </div>
  );
}
