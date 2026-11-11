import { useId, useState } from "react";
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

function Group({ group, withNote = true }: { group: GlanceGroup; withNote?: boolean }) {
  return (
    <section className="glance-group" aria-label={group.label}>
      {/* The section carries the accessible name; the visible label would be read twice. */}
      <p className="glance-group-label" aria-hidden="true">
        {group.label}
      </p>
      <Tiles items={group.items} />
      {withNote && group.note && <Note segments={group.note} />}
    </section>
  );
}

/** The groups' notes, collapsed under one labelled toggle below the rows. */
function SourcesToggle({ groups }: { groups: GlanceGroup[] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="glance-sources">
      <button type="button" className="glance-sources-toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)}>
        <span>Sources and context</span>
        <span className="glance-sources-hint">{groups.map((g) => g.label).join(", ")}</span>
        <span className="glance-sources-chev" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>
      <div id={id} hidden={!open}>
        {groups.map((g) => (
          <Note key={g.label} segments={g.note ?? []} />
        ))}
      </div>
    </div>
  );
}

/**
 * The figures that carry a case study, in hairline-ruled rows under the result
 * line. A project gives either one flat list or labelled groups (so figures the
 * reader owns can be told apart from figures someone else reported). Static on
 * purpose: no count-up, so the numbers are readable in the first view. Renders
 * nothing when a project has no figures.
 */
export function GlanceRow({
  glance,
  hideIntro = false,
  sourcesToggle = false,
}: {
  glance?: Glance;
  /** Leave out the role line (the caller shows it elsewhere). */
  hideIntro?: boolean;
  /** Fold every group's note behind one "Sources" toggle under the rows. */
  sourcesToggle?: boolean;
}) {
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
  const noted = sourcesToggle ? glance.groups.filter((g) => g.note) : [];
  return (
    <div className="glance-groups">
      {!hideIntro && glance.intro && <p className="glance-intro">{glance.intro}</p>}
      {glance.groups.map((g) => (
        <Group key={g.label} group={g} withNote={!sourcesToggle} />
      ))}
      {noted.length > 0 && <SourcesToggle groups={noted} />}
    </div>
  );
}
