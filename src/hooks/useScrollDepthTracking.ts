import { useEffect, useRef } from "react";
import { trackEvent } from "../lib/analytics";

const THRESHOLDS = [25, 50, 75, 100];

/** Fires `case_study_scroll_depth` once per threshold per page view, so drop-off within a case study is visible. */
export function useScrollDepthTracking(projectSlug: string) {
  const fired = useRef<Set<number>>(new Set());

  useEffect(() => {
    fired.current = new Set();
    let scheduled = false;

    function checkDepth() {
      scheduled = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      if (scrollable <= 0) return;
      const pct = (window.scrollY / scrollable) * 100;

      for (const threshold of THRESHOLDS) {
        if (pct >= threshold && !fired.current.has(threshold)) {
          fired.current.add(threshold);
          trackEvent("case_study_scroll_depth", { project: projectSlug, depth: threshold });
        }
      }
    }

    function onScroll() {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(checkDepth);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    checkDepth();
    return () => window.removeEventListener("scroll", onScroll);
  }, [projectSlug]);
}
