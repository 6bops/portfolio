import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { ShowcaseSectionData, Workstream } from "../../types";
import { Shot } from "../ui/Shot";

/**
 * Workstreams as a collapsed card deck rather than one continuous scroll.
 *
 * A project like First Bank runs to ~41,000px across four workstreams; a reader
 * deciding whether to interview cannot skim that. Collapsed, the whole project
 * is a map that fits a screen or two: each card sells its workstream with a
 * hook, a stat, real screens, and what it demonstrates. Depth is one click away
 * and, once open, a sticky header keeps the reader oriented and gives them a
 * way out that isn't a 16,000px scroll back to the top.
 */

/**
 * Scroll to an element and hold it there while the page settles.
 *
 * Screenshots below the fold are lazy and reserve no height until they decode,
 * so anything above the target grows after the scroll lands and pushes the
 * target back down — a plain scrollTo overshoots by thousands of pixels. Keep
 * re-aiming until the position stops moving.
 */
function scrollToStable(el: HTMLElement, offset: number) {
  let stable = 0;
  let tries = 0;
  let cancelled = false;

  // The reader always wins: any manual scroll ends the correction immediately,
  // otherwise re-aiming would fight them for the scrollbar.
  const cancel = () => {
    cancelled = true;
  };
  window.addEventListener("wheel", cancel, { passive: true, once: true });
  window.addEventListener("touchstart", cancel, { passive: true, once: true });
  window.addEventListener("keydown", cancel, { once: true });

  const done = () => {
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
    window.removeEventListener("keydown", cancel);
  };

  const step = () => {
    if (cancelled) return done();
    const delta = el.getBoundingClientRect().top - offset;
    // Converging once isn't enough: images further down are still decoding, and
    // each one that lands grows the document and drags the target with it. Only
    // stop after the position holds across several consecutive checks.
    stable = Math.abs(delta) < 2 ? stable + 1 : 0;
    if (stable >= 8 || tries++ > 140) return done();
    if (Math.abs(delta) >= 2) window.scrollBy({ top: delta, behavior: "auto" });
    setTimeout(step, 50);
  };
  step();
}

/** Section headings a reader can jump to, ignoring layouts with nothing to anchor. */
function jumpTargets(sections: ShowcaseSectionData[] | undefined) {
  return (sections ?? []).map((s, i) => ({
    id: `sec-${i}`,
    heading: s.heading,
    tag: s.tag,
    isProcess: Boolean(s.sourcing),
  }));
}

function Thumbs({ srcs, alt }: { srcs: string[]; alt: string }) {
  if (!srcs.length) return null;
  return (
    <div className="ws-card-thumbs">
      {srcs.map((src) => (
        <div key={src} className="ws-card-thumb">
          <Shot src={src} alt="" />
        </div>
      ))}
      <span className="visually-hidden">{alt}</span>
    </div>
  );
}

function CollapsedCard({ w, onOpen }: { w: Workstream; onOpen: () => void }) {
  const hook = w.showcase?.heroHeading ?? w.heading;
  const sections = w.showcase?.sections ?? [];
  const processCount = sections.filter((s) => s.sourcing).length;

  const meta = [
    sections.length ? `${sections.length} sections` : null,
    processCount ? `${processCount} process artifacts` : null,
  ].filter(Boolean);

  return (
    <button type="button" onClick={onOpen} className="ws-card" aria-expanded="false">
      <div className="ws-card-body">
        <div className="ws-card-copy">
          <p className="ws-card-label">{w.navLabel}</p>
          <h3 className="ws-card-hook">{hook}</h3>
          {w.tags && (
            <ul className="ws-card-tags">
              {w.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="ws-card-stat">
          <p className="ws-card-stat-value">{w.stat.value}</p>
          <p className="ws-card-stat-label">{w.stat.label}</p>
        </div>
      </div>

      <Thumbs srcs={w.highlights ?? []} alt={`Selected screens from ${w.navLabel}`} />

      <div className="ws-card-foot">
        <span className="ws-card-meta">{meta.join(" · ")}</span>
        <span className="ws-card-cta">Read this workstream →</span>
      </div>
    </button>
  );
}

/** Pinned while a workstream is open: where am I, what's inside, how do I leave. */
function StickyHeader({
  w,
  onClose,
  sections,
}: {
  w: Workstream;
  onClose: () => void;
  sections: ReturnType<typeof jumpTargets>;
}) {
  const jump = (id: string) => {
    const el = document.getElementById(id);
    if (el) scrollToStable(el, 96);
  };

  return (
    <div className="ws-sticky">
      <div className="ws-sticky-inner">
        <div className="ws-sticky-id">
          <span className="ws-sticky-label">{w.navLabel}</span>
          <span className="ws-sticky-stat">{w.stat.value}</span>
        </div>
        <div className="ws-sticky-actions">
          {sections.length > 0 && (
            <select
              className="ws-sticky-jump"
              aria-label={`Jump to a section within ${w.navLabel}`}
              value=""
              onChange={(e) => {
                if (e.target.value) jump(e.target.value);
              }}
            >
              <option value="">Jump to section…</option>
              {sections.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.isProcess ? "◆ " : ""}
                  {s.heading}
                </option>
              ))}
            </select>
          )}
          <button type="button" onClick={onClose} className="ws-sticky-close">
            Collapse ↑
          </button>
        </div>
      </div>
    </div>
  );
}

export function WorkstreamAccordion({
  workstreams,
  renderExpanded,
}: {
  workstreams: Workstream[];
  /** The full workstream body — kept in the page so this component owns only the shell. */
  renderExpanded: (w: Workstream, index: number) => ReactNode;
}) {
  const [open, setOpen] = useState<Set<string>>(new Set());
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  const expand = useCallback((id: string) => {
    setOpen((prev) => new Set(prev).add(id));
  }, []);

  const collapse = useCallback((id: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    // Return the reader to the card they just closed rather than stranding them
    // wherever the removed content used to be.
    requestAnimationFrame(() => {
      const el = refs.current[id];
      if (el) scrollToStable(el, 24);
    });
  }, []);

  // Deep links (#diaspora-banking) open the workstream and scroll to it, so a
  // link to one part of a project lands somewhere useful.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash || !workstreams.some((w) => w.id === hash)) return;
    expand(hash);
    requestAnimationFrame(() => {
      const el = document.getElementById(hash);
      if (el) scrollToStable(el, 24);
    });
  }, [workstreams, expand]);

  const onOpen = (id: string) => {
    expand(id);
    // Without this the body opens below the fold and the reader sees nothing change.
    requestAnimationFrame(() => {
      const el = refs.current[id];
      if (el) scrollToStable(el, 24);
    });
  };

  return (
    <div className="ws-deck">
      {workstreams.map((w, i) => {
        const isOpen = open.has(w.id);
        return (
          <div
            key={w.id}
            id={w.id}
            ref={(el) => {
              refs.current[w.id] = el;
            }}
            className={`ws-item${isOpen ? " open" : ""}`}
          >
            {isOpen ? (
              <>
                <StickyHeader w={w} onClose={() => collapse(w.id)} sections={jumpTargets(w.showcase?.sections)} />
                {renderExpanded(w, i)}
                <div className="ws-item-foot">
                  <button type="button" onClick={() => collapse(w.id)} className="ws-sticky-close">
                    Collapse {w.navLabel} ↑
                  </button>
                </div>
              </>
            ) : (
              <CollapsedCard w={w} onOpen={() => onOpen(w.id)} />
            )}
          </div>
        );
      })}
    </div>
  );
}
