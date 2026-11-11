import { useEffect } from "react";
import { trackEvent } from "../lib/analytics";

/**
 * Fires `eventName` once per section per page view when an element marked
 * `data-track-section="<name>"` reaches the middle of the viewport, so it's
 * clear how far down a long page people actually read.
 */
export function useSectionViewTracking(eventName: string) {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-track-section]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          trackEvent(eventName, { section: (entry.target as HTMLElement).dataset.trackSection });
        }
      },
      // A band across the middle of the viewport, not a visibility ratio: the
      // pinned featured-work section is taller than two screens, so it could
      // never be "half visible".
      { rootMargin: "-40% 0px -40% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [eventName]);
}
