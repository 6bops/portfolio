import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useReducedMotion } from "framer-motion";

export type SectionNavItem = { id: string; label: string };

/** Below this many sections a jump menu is noise, so the bar does not render. */
const MIN_ITEMS = 4;

/**
 * Sticky "On this page" bar for single-narrative case studies. Chips scroll to the
 * matching section in place (no URL hash change) and the active chip follows scroll.
 *
 * Must not sit inside a FadeIn or any other transformed/overflow wrapper: `position:
 * sticky` is bounded by its parent, so the bar has to be a direct child of the page.
 */
export function SectionNav({ items }: { items: SectionNavItem[] }) {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const listRef = useRef<HTMLUListElement>(null);
  // Set while a chip-triggered scroll is in flight: the band sweeps past every section on
  // the way, and short neighbours would otherwise steal the highlight from the clicked chip.
  const lockRef = useRef(false);
  const idsKey = items.map((item) => item.id).join("|");

  useEffect(() => {
    if (idsKey.split("|").length < MIN_ITEMS) return;
    // A thin band 30% down the viewport: the section crossing it is the one being read.
    const observer = new IntersectionObserver(
      (entries) => {
        if (lockRef.current) return;
        const first = idsKey.split("|")[0];
        // Leaving entries first, so a section entering in the same batch wins.
        const ordered = [...entries].sort((x, y) => Number(x.isIntersecting) - Number(y.isIntersecting));
        for (const entry of ordered) {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            setActiveId(id);
            continue;
          }
          // The band is now between sections (or in the unlabelled stretch of a page with
          // sections that have no chip), so no chip should claim it. Above the first
          // section the first chip stays lit.
          const leftBelow = entry.boundingClientRect.top > (entry.rootBounds?.top ?? 0);
          if (leftBelow && id === first) {
            setActiveId(first);
            continue;
          }
          setActiveId((current) => (current === id ? "" : current));
        }
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    for (const id of idsKey.split("|")) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [idsKey]);

  // On narrow screens the bar scrolls sideways: keep the active chip in view. Moves
  // the list only (never the page), which scrollIntoView would also do.
  useEffect(() => {
    const list = listRef.current;
    const chip = list?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!list || !chip) return;
    const left = chip.offsetLeft - (list.clientWidth - chip.offsetWidth) / 2;
    list.scrollTo({ left: Math.max(0, left), behavior: reduceMotion ? "auto" : "smooth" });
  }, [activeId, reduceMotion]);

  if (items.length < MIN_ITEMS) return null;

  const jumpTo = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // keeps the URL hash (and the router) untouched
    const target = document.getElementById(id);
    if (!target) return;
    setActiveId(id);
    lockRef.current = true;
    const unlock = () => {
      window.clearTimeout(timer);
      window.removeEventListener("scrollend", unlock);
      lockRef.current = false;
    };
    const timer = window.setTimeout(unlock, 1500); // fallback where scrollend is unsupported
    window.addEventListener("scrollend", unlock);
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <nav className="section-nav" aria-label="On this page">
      <ul ref={listRef} className="section-nav-list">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="section-nav-chip"
              aria-current={item.id === activeId ? "true" : undefined}
              onClick={jumpTo(item.id)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
