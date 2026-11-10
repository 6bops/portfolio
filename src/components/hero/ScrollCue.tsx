import { useEffect, useRef } from "react";

/** The page has moved on from the hero once it has scrolled this far, in px. */
const HIDE_AFTER = 40;

/**
 * A small "Scroll" cue at the bottom edge of the hero, telling visitors there is more below. It fades out
 * once the page has scrolled past HIDE_AFTER and returns at the top. The class is toggled straight on
 * the element from a passive scroll listener (no React state). Decorative: hidden from assistive tech,
 * ignores the pointer, and its chevron is static under reduced motion (see global.css).
 */
export function ScrollCue() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => el.classList.toggle("is-hidden", window.scrollY > HIDE_AFTER);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div ref={ref} className="hero-scroll-cue" aria-hidden="true">
      <span>Scroll</span>
      <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
        <path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
