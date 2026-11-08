import { useEffect, useRef } from "react";
import { trackEvent } from "../lib/analytics";

const THRESHOLDS = [25, 50, 75, 100];

/** Fires `eventName` once per threshold per page view, so drop-off within a page is visible. */
export function useScrollDepthTracking(eventName: string, properties: Record<string, unknown> = {}) {
  const fired = useRef<Set<number>>(new Set());
  const propertiesKey = JSON.stringify(properties);

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
          trackEvent(eventName, { ...properties, depth: threshold });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `properties` is tracked via its serialized key
  }, [eventName, propertiesKey]);
}
