import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode, type Ref } from "react";
import { useLocation } from "react-router-dom";
import type { ShowcaseSectionData, Workstream } from "../../types";
import { NAV_HEIGHT } from "../../lib/layout";
import { scrollToStable } from "../../lib/scrollToStable";
import { sentences } from "../../lib/text";
import { leadScreen, screenKey, viewerScreens, type Screen } from "../../lib/workstreamScreens";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Shot } from "../ui/Shot";

/**
 * A project's workstreams as a master-detail view.
 *
 * At 1100px and wider: a sticky list on the left (the Foundation first, then the
 * products), each row a thumbnail, a name and its headline figure; the selected
 * workstream's screens, then its short outcome, fill the pane on the right, and
 * "Read the full case study" opens the long version under it. Narrower, the list
 * is an accordion and each row opens to the same pane.
 *
 * Deep links (#diaspora-banking) select that workstream and scroll to it.
 */

type Indexed = { w: Workstream; i: number };

const FOUNDATION_DESC = "The system the products are built on";

/** Whether `w` has a long case study behind "Read the full case study"; others show all their text in the pane. */
const hasFullStudy = (w: Workstream) => Boolean(w.showcase);

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Section headings a reader can jump to inside an open case study. */
function jumpTargets(sections: ShowcaseSectionData[] | undefined) {
  return (sections ?? []).map((s, i) => ({ id: `sec-${i}`, heading: s.heading, isProcess: Boolean(s.sourcing) }));
}

/* ── list ─────────────────────────────────────────────────────── */

function RowThumb({ w }: { w: Workstream }) {
  const lead = leadScreen(w);
  return (
    <span className={`wsmd-row-thumb${lead ? "" : " wsmd-row-thumb--text"}`} aria-hidden="true">
      {lead ? (
        <Shot src={lead.src} alt="" />
      ) : (
        <>
          <span />
          <span />
          <span />
        </>
      )}
    </span>
  );
}

function RowText({ w }: { w: Workstream }) {
  return (
    <span className="wsmd-row-text">
      <span className="wsmd-row-name">{w.navLabel}</span>
      <span className="wsmd-row-stat">
        <strong>{w.stat.value}</strong> {w.stat.label}
      </span>
    </span>
  );
}

/* ── viewer ───────────────────────────────────────────────────── */

/** The before and after screens side by side inside the stage, each labelled. */
function PairStage({ pair }: { pair: NonNullable<Screen["pair"]> }) {
  return (
    <div className="wsmd-pair">
      {[pair.before, pair.after].map((side, k) => (
        <figure key={side.src} className={`wsmd-pair-side${k === 0 ? " wsmd-pair-side--before" : ""}`}>
          <figcaption className="wsmd-pair-label">{side.label}</figcaption>
          <Shot src={side.src} alt={side.alt} className="wsmd-pair-img" />
        </figure>
      ))}
    </div>
  );
}

/**
 * A large screen with a caption, previous/next and a thumbnail row. The stage
 * keeps a fixed aspect ratio and the caption reserves two lines, so changing
 * screens (or workstreams) never moves anything below it. `ghost` renders the
 * same boxes with no images, to hold the height of an inactive pane.
 */
function Viewer({ screens, label, ghost = false }: { screens: Screen[]; label: string; ghost?: boolean }) {
  const [idx, setIdx] = useState(0);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const moved = useRef(false);
  const s = screens[idx];

  useEffect(() => {
    // Keep the active thumbnail in view by scrolling the strip only, never the page.
    if (!moved.current) return;
    const c = thumbsRef.current;
    const el = c?.children[idx] as HTMLElement | undefined;
    if (c && el) c.scrollTo({ left: el.offsetLeft - c.clientWidth / 2 + el.clientWidth / 2, behavior: reducedMotion() ? "auto" : "smooth" });
  }, [idx]);

  const go = (next: number) => {
    moved.current = true;
    setIdx((next + screens.length) % screens.length);
  };

  const onThumbKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = { ArrowRight: idx + 1, ArrowLeft: idx - 1, Home: 0, End: screens.length - 1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const next = (keys[e.key] + screens.length) % screens.length;
    go(next);
    (thumbsRef.current?.children[next] as HTMLElement | undefined)?.focus();
  };

  return (
    <div className="wsmd-viewer" role="group" aria-label={`Screens from ${label}`}>
      <div className="wsmd-stage">
        {!ghost && s && (s.pair ? <PairStage key={screenKey(s)} pair={s.pair} /> : <Shot key={s.src} src={s.src} alt={s.alt} className="wsmd-stage-img" />)}
      </div>
      <div className="wsmd-viewer-bar">
        <p className="wsmd-caption" aria-live={ghost ? undefined : "polite"}>
          <span className="wsmd-caption-count">
            {idx + 1} / {screens.length}
          </span>
          <span className="wsmd-caption-text">{s?.caption}</span>
        </p>
        {screens.length > 1 && (
          <div className="wsmd-viewer-nav">
            <button type="button" className="wsmd-step" onClick={() => go(idx - 1)} aria-label="Previous screen" tabIndex={ghost ? -1 : undefined}>
              ←
            </button>
            <button type="button" className="wsmd-step" onClick={() => go(idx + 1)} aria-label="Next screen" tabIndex={ghost ? -1 : undefined}>
              →
            </button>
          </div>
        )}
      </div>
      <div ref={thumbsRef} className="wsmd-thumbs" onKeyDown={onThumbKey}>
        {!ghost &&
          screens.map((t, k) => (
            <button
              key={screenKey(t)}
              type="button"
              className={`wsmd-thumb${k === idx ? " is-active" : ""}${t.pair ? " wsmd-thumb--pair" : ""}`}
              aria-label={`Screen ${k + 1} of ${screens.length}: ${t.caption}`}
              aria-pressed={k === idx}
              tabIndex={k === idx ? 0 : -1}
              onClick={() => go(k)}
            >
              {t.pair ? (
                <>
                  <Shot src={t.pair.before.src} alt="" />
                  <Shot src={t.pair.after.src} alt="" />
                </>
              ) : (
                <Shot src={t.src} alt="" />
              )}
            </button>
          ))}
      </div>
    </div>
  );
}

/* ── pane ─────────────────────────────────────────────────────── */

const Label = ({ w }: { w: Workstream }) => (
  <p className="wsmd-label">
    {w.navLabel}
    {w.kind === "foundation" && <span className="ws-chip">Foundation</span>}
  </p>
);

/** The workstream in three labelled lines: what was broken, my part, what changed. */
function Story({ story }: { story: NonNullable<Workstream["story"]> }) {
  const rows = [
    { label: "The problem", text: story.problem },
    { label: "What I did", text: story.did },
    { label: "What changed", text: story.changed },
  ];
  return (
    <dl className="wsmd-story">
      {rows.map((r) => (
        <div key={r.label} className="wsmd-story-row">
          <dt>{r.label}</dt>
          <dd>{r.text}</dd>
        </div>
      ))}
    </dl>
  );
}

/** The workstream's text when it has no long case study: problem, what I designed, outcome, figure. */
function TextBody({ w }: { w: Workstream }) {
  return (
    <div className="wsmd-textbody">
      <div className="wsmd-textbody-stat">
        <p className="wsmd-textbody-value">{w.stat.value}</p>
        <p className="wsmd-textbody-statlabel">{w.stat.label}</p>
      </div>
      {w.story ? (
        <Story story={w.story} />
      ) : (
        <dl className="wsmd-textbody-list">
          <div>
            <dt>Problem</dt>
            <dd>{w.problem}</dd>
          </div>
          <div>
            <dt>What I designed</dt>
            <dd>{w.scope}</dd>
          </div>
          <div>
            <dt>Outcome</dt>
            <dd className="wsmd-textbody-outcome">{w.outcome}</dd>
          </div>
        </dl>
      )}
    </div>
  );
}

type PaneProps = {
  w: Workstream;
  headingId: string;
  ghost?: boolean;
  fullOpen?: boolean;
  fullId?: string;
  onToggleFull?: () => void;
  toggleRef?: Ref<HTMLButtonElement>;
};

/** Screens first, then the hook, the story in three lines, the short outcome and the way into the full case study. */
function Pane({ w, headingId, ghost = false, fullOpen = false, fullId, onToggleFull, toggleRef }: PaneProps) {
  const screens = viewerScreens(w);
  const full = hasFullStudy(w);
  return (
    <div className={`wsmd-pane-body${screens.length ? "" : " wsmd-pane-body--text"}${w.kind === "foundation" ? " wsmd-pane-body--foundation" : ""}`}>
      {screens.length > 0 && <Viewer key={w.id} screens={screens} label={w.navLabel} ghost={ghost} />}
      <div className="wsmd-summary">
        <Label w={w} />
        <h3 id={headingId} className="wsmd-hook">
          {w.showcase?.heroHeading ?? w.heading}
        </h3>
        {/* With a story, its three lines carry the problem and my part, so the
            one-line problem and role are not repeated under them. */}
        {full ? (
          <>
            {w.story ? <Story story={w.story} /> : w.cardProblem && <p className="wsmd-problem">{w.cardProblem}</p>}
            <p className="wsmd-outcome">{sentences(w.outcome)[0] ?? w.outcome}</p>
            <p className="wsmd-meta">
              <span>
                <strong>{w.stat.value}</strong> {w.stat.label}
              </span>
              {w.role && !w.story && <span>{w.role}</span>}
            </p>
            <button
              ref={toggleRef}
              type="button"
              className="pill-link wsmd-open"
              aria-expanded={fullOpen}
              aria-controls={fullOpen ? fullId : undefined}
              tabIndex={ghost ? -1 : undefined}
              onClick={onToggleFull}
            >
              {fullOpen ? "Hide the full case study ↑" : "Read the full case study ↓"}
            </button>
          </>
        ) : (
          <>
            {w.role && !w.story && <p className="wsmd-role">{w.role}</p>}
            <TextBody w={w} />
          </>
        )}
      </div>
    </div>
  );
}

/** The long case study, with a pinned bar to keep the reader oriented and give them a way out. */
function FullStudy({ w, id, onClose, children }: { w: Workstream; id: string; onClose: () => void; children: ReactNode }) {
  const sections = jumpTargets(w.showcase?.sections);
  const stopJump = useRef<(() => void) | null>(null);
  useEffect(() => () => stopJump.current?.(), []);
  return (
    <div id={id} className={`wsmd-full${w.kind === "foundation" ? " wsmd-full--foundation" : ""}`}>
      <div className="ws-sticky">
        <div className="ws-sticky-inner">
          <div className="ws-sticky-id">
            <span className="ws-sticky-label">{w.navLabel}</span>
            {w.kind === "foundation" && <span className="ws-chip">Foundation</span>}
            <span className="ws-sticky-stat">{w.stat.value}</span>
          </div>
          <div className="ws-sticky-actions">
            {sections.length > 0 && (
              <select
                className="ws-sticky-jump"
                aria-label={`Jump to a section within ${w.navLabel}`}
                value=""
                onChange={(e) => {
                  const el = e.target.value ? document.getElementById(e.target.value) : null;
                  if (!el) return;
                  stopJump.current?.();
                  stopJump.current = scrollToStable(el, NAV_HEIGHT + 96);
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
              Hide ↑
            </button>
          </div>
        </div>
      </div>
      {children}
      <div className="ws-item-foot">
        <button type="button" onClick={onClose} className="ws-sticky-close">
          Hide the full case study ↑
        </button>
      </div>
    </div>
  );
}

/* ── shell ────────────────────────────────────────────────────── */

export function WorkstreamMasterDetail({
  workstreams,
  renderFull,
}: {
  workstreams: Workstream[];
  /** The long case study body, kept in the page so this component owns only the shell. */
  renderFull: (w: Workstream, index: number) => ReactNode;
}) {
  const uid = useId();
  const wide = useMediaQuery("(min-width: 1100px)");
  const { hash, key } = useLocation();

  // Keep the original index: the full body uses it to stagger its reveal.
  const indexed: Indexed[] = workstreams.map((w, i) => ({ w, i }));
  const foundation = indexed.filter(({ w }) => w.kind === "foundation");
  const products = indexed.filter(({ w }) => w.kind !== "foundation");
  const ordered = [...foundation, ...products];

  // One active workstream for both layouts, so crossing 1100px (a tablet
  // rotating) keeps the same one selected, or open, and its case study open.
  const [active, setActive] = useState(ordered[0]?.w.id ?? "");
  /** Below 1100px: whether the active workstream's accordion item is open. */
  const [accOpen, setAccOpen] = useState(false);
  const [fullOpen, setFullOpen] = useState<string | null>(null);
  /** Set once the reader picks a workstream (or arrives on a deep link). */
  const interacted = useRef(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const stopScroll = useRef<(() => void) | null>(null);
  const optionRefs = useRef<Record<string, HTMLElement | null>>({});
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});
  const toggleRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const paneId = (id: string) => `${uid}-pane-${id}`;
  const headingId = (id: string) => `${uid}-h-${id}`;
  const fullId = (id: string) => `${uid}-full-${id}`;

  /** Bring `el` back into view if it has scrolled up under the menu. One correction at a time. */
  const reveal = useCallback((el: HTMLElement | null | undefined, always = false) => {
    if (!el) return;
    if (!always && el.getBoundingClientRect().top >= NAV_HEIGHT) return;
    stopScroll.current?.();
    stopScroll.current = scrollToStable(el, NAV_HEIGHT + 16);
  }, []);

  /** Keep a row visible inside the sticky list, which scrolls on short screens. */
  const keepInRail = useCallback((id: string) => {
    const rail = railRef.current;
    const row = optionRefs.current[id];
    if (!rail || !row) return;
    const r = rail.getBoundingClientRect();
    const b = row.getBoundingClientRect();
    if (b.top < r.top) rail.scrollTop -= r.top - b.top + 8;
    else if (b.bottom > r.bottom) rail.scrollTop += b.bottom - r.bottom + 8;
  }, []);

  useEffect(() => () => stopScroll.current?.(), []);

  // Deep links: select (and, narrow, open) the workstream, then scroll to it.
  // `key` changes on every navigation, so following the same #link again works too.
  // Scrolling only: focus stays where it is.
  useEffect(() => {
    let id = "";
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      return; // a malformed hash such as #50% is not a workstream
    }
    if (!id || !workstreams.some((w) => w.id === id)) return;
    interacted.current = true;
    setActive(id);
    setAccOpen(true);
    setFullOpen(null);
    const raf = requestAnimationFrame(() => {
      reveal(document.getElementById(id), true);
      keepInRail(id);
    });
    return () => cancelAnimationFrame(raf);
  }, [hash, key, workstreams, reveal, keepInRail]);

  // Crossing 1100px: the active workstream stays selected (wide) or opens (narrow), and stays in view.
  const firstLayout = useRef(true);
  useEffect(() => {
    if (firstLayout.current) {
      firstLayout.current = false;
      return;
    }
    if (!interacted.current) return;
    if (!wide) setAccOpen(true);
    const raf = requestAnimationFrame(() => {
      reveal(document.getElementById(active), true);
      keepInRail(active);
    });
    return () => cancelAnimationFrame(raf);
    // Only the layout switch triggers this, not a change of workstream.
  }, [wide]);

  const select = (id: string) => {
    interacted.current = true;
    if (id === active) return;
    setActive(id);
    setAccOpen(true);
    setFullOpen(null);
    requestAnimationFrame(() => {
      reveal(rootRef.current);
      keepInRail(id);
    });
  };

  const onListKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const at = ordered.findIndex(({ w }) => w.id === active);
    const keys: Record<string, number> = { ArrowDown: at + 1, ArrowUp: at - 1, Home: 0, End: ordered.length - 1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const next = ordered[Math.min(Math.max(keys[e.key], 0), ordered.length - 1)].w.id;
    select(next);
    optionRefs.current[next]?.focus();
  };

  const closeFull = (id: string) => {
    setFullOpen(null);
    requestAnimationFrame(() => {
      const t = toggleRefs.current[id];
      if (t) {
        t.focus({ preventScroll: true });
        reveal(t.closest(".wsmd-summary") as HTMLElement | null);
      }
    });
  };

  const full = (w: Workstream, i: number) =>
    fullOpen === w.id && hasFullStudy(w) ? (
      <FullStudy w={w} id={fullId(w.id)} onClose={() => closeFull(w.id)}>
        {renderFull(w, i)}
      </FullStudy>
    ) : null;

  const groups = [
    ...(foundation.length ? [{ key: "foundation", label: "Foundation", desc: FOUNDATION_DESC, items: foundation }] : []),
    ...(products.length ? [{ key: "products", label: foundation.length ? "Products" : "", desc: "", items: products }] : []),
  ];

  const current = ordered.find(({ w }) => w.id === active) ?? ordered[0];
  if (!current) return null;

  if (wide) {
    return (
      <section ref={rootRef} className="project-wide wsmd" aria-labelledby={`${uid}-title`}>
        <h2 id={`${uid}-title`} className="visually-hidden">
          Workstreams
        </h2>
        <div ref={railRef} className="wsmd-rail">
          <div role="listbox" aria-label="Choose a workstream" aria-orientation="vertical" className="wsmd-list" onKeyDown={onListKey}>
            {groups.map((g) => (
              <div key={g.key} role="group" aria-labelledby={g.label ? `${uid}-g-${g.key}` : undefined} className={`wsmd-group wsmd-group--${g.key}`}>
                {g.label && (
                  <div role="presentation" id={`${uid}-g-${g.key}`} className="wsmd-group-head">
                    <span className="wsmd-group-label">{g.label}</span>
                    {g.desc && <span className="wsmd-group-desc">{g.desc}</span>}
                  </div>
                )}
                {g.items.map(({ w }) => {
                  const on = w.id === current.w.id;
                  return (
                    <div
                      key={w.id}
                      ref={(el) => {
                        optionRefs.current[w.id] = el;
                      }}
                      role="option"
                      aria-selected={on}
                      aria-controls={w.id}
                      tabIndex={on ? 0 : -1}
                      className={`wsmd-row${on ? " is-active" : ""}${w.kind === "foundation" ? " wsmd-row--foundation" : ""}`}
                      data-cursor="hover"
                      onClick={() => select(w.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          select(w.id);
                        }
                      }}
                    >
                      <RowThumb w={w} />
                      <RowText w={w} />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="wsmd-main">
          {/* Every pane sits in one grid cell, inactive ones hidden but laid out,
              so the cell is always as tall as the tallest pane and switching
              workstreams never moves the page below. */}
          <div className="wsmd-stack">
            {ordered.map(({ w }) => {
              const on = w.id === current.w.id;
              return (
                <div
                  key={w.id}
                  id={w.id}
                  role="region"
                  aria-labelledby={on ? headingId(w.id) : undefined}
                  aria-hidden={on ? undefined : true}
                  // inert is not in React 18's DOM types; an empty string sets it, undefined removes it.
                  {...({ inert: on ? undefined : "" } as object)}
                  className={`wsmd-pane${on ? " is-active" : ""}`}
                >
                  <Pane
                    w={w}
                    headingId={headingId(w.id)}
                    ghost={!on}
                    fullOpen={fullOpen === w.id}
                    fullId={fullId(w.id)}
                    onToggleFull={() => (fullOpen === w.id ? closeFull(w.id) : setFullOpen(w.id))}
                    toggleRef={(el) => {
                      if (on) toggleRefs.current[w.id] = el;
                    }}
                  />
                </div>
              );
            })}
          </div>
          {full(current.w, current.i)}
        </div>
      </section>
    );
  }

  return (
    <section ref={rootRef} className="wsmd-acc" aria-labelledby={`${uid}-title`}>
      <h2 id={`${uid}-title`} className="visually-hidden">
        Workstreams
      </h2>
      {groups.map((g) => (
        <div key={g.key} className={`wsmd-group wsmd-group--${g.key}`}>
          {g.label && (
            <p className="wsmd-group-head">
              <span className="wsmd-group-label">{g.label}</span>
              {g.desc && <span className="wsmd-group-desc">{g.desc}</span>}
            </p>
          )}
          {g.items.map(({ w, i }) => {
            const open = accOpen && current.w.id === w.id;
            return (
              <div
                key={w.id}
                id={w.id}
                ref={(el) => {
                  itemRefs.current[w.id] = el;
                }}
                className={`wsmd-acc-item${open ? " open" : ""}`}
              >
                <button
                  type="button"
                  className={`wsmd-row${open ? " is-active" : ""}${w.kind === "foundation" ? " wsmd-row--foundation" : ""}`}
                  aria-expanded={open}
                  aria-controls={paneId(w.id)}
                  data-cursor="hover"
                  onClick={() => {
                    interacted.current = true;
                    setFullOpen(null);
                    if (open) {
                      setAccOpen(false);
                      return;
                    }
                    setActive(w.id);
                    setAccOpen(true);
                    requestAnimationFrame(() => reveal(itemRefs.current[w.id]));
                  }}
                >
                  <RowThumb w={w} />
                  <RowText w={w} />
                  <span className="wsmd-row-chev" aria-hidden="true">
                    {open ? "−" : "+"}
                  </span>
                </button>
                <div id={paneId(w.id)} role="region" aria-labelledby={headingId(w.id)} hidden={!open} className="wsmd-acc-body">
                  {open && (
                    <>
                      <Pane
                        w={w}
                        headingId={headingId(w.id)}
                        fullOpen={fullOpen === w.id}
                        fullId={fullId(w.id)}
                        onToggleFull={() => (fullOpen === w.id ? closeFull(w.id) : setFullOpen(w.id))}
                        toggleRef={(el) => {
                          toggleRefs.current[w.id] = el;
                        }}
                      />
                      {full(w, i)}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </section>
  );
}
