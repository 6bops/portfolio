import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Media } from "../../types";
import { MediaFrame } from "./MediaFrame";

/** Pinning a 100vh section works against mobile scroll (viewport-height chrome jitter, touch conflicts) more than it adds. */
function useIsNarrowViewport() {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 700px)");
    setNarrow(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setNarrow(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return narrow;
}

/**
 * The featured-project media area as its own pinned scroll section: the wrapper is
 * tall enough (100vh + however far the track overhangs the viewport) that scrolling
 * through it pins the media in place and translates page-scroll 1:1 into horizontal
 * motion across the filmstrip, releasing to normal vertical scroll once the last item
 * clears the viewport. Falls back to a plain horizontal-scroll row under reduced
 * motion, on narrow viewports, or when there isn't enough overhang to make pinning
 * worthwhile — both modes share one DOM structure (toggled by the `pinned` class)
 * so the track can always measure itself; a mode that only rendered once it already
 * knew the measurement could never take the first measurement.
 */
export function PinnedMediaCarousel({ media }: { media: Media[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [measured, setMeasured] = useState(false);
  const reduceMotion = useReducedMotion();
  const narrow = useIsNarrowViewport();

  useLayoutEffect(() => {
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    if (!track || !wrapper) return;

    const measure = () => {
      setScrollDistance(Math.max(track.scrollWidth - wrapper.clientWidth, 0));
      setMeasured(true);
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(track);
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, [media]);

  const pinned = measured && !reduceMotion && !narrow && scrollDistance >= 40;

  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  if (!media || media.length === 0) return null;

  return (
    <div
      ref={wrapperRef}
      className={`pinned-media${pinned ? "" : " pinned-media--plain"}`}
      style={pinned ? { height: `calc(100vh + ${scrollDistance}px)` } : undefined}
    >
      <div className="pinned-media-viewport">
        <motion.div ref={trackRef} className="pinned-media-track" style={pinned ? { x } : undefined}>
          {media.map((item) => (
            <MediaFrame key={item.src} item={item} className="pinned-media-item" />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
