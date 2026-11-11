import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { useFinePointer } from "./heroMedia";

const ANIMALS = ["Capybara", "Otter", "Heron", "Lynx", "Pangolin", "Manatee", "Ibex", "Quokka"];

/**
 * The visitor's own pointer, drawn like a collaborator's cursor in a design tool: an arrow and a name tag
 * ("Anonymous Otter", a different animal each page view, never stored or sent anywhere). While a mouse or
 * trackpad pointer is over the hero (canvas and panels) the system pointer is hidden by CSS
 * (`.canvas-hero[data-visitor]`) and this follows it, at screen scale, outside the zoomed board.
 *
 * It only ever sets a transform and an opacity on its own element straight from `pointermove` (no React
 * state, no easing, so it never lags) and has `pointer-events: none`, so clicks, drags, links and buttons
 * behave exactly as before. Not rendered on touch or coarse pointers. It keeps working under reduced
 * motion: it is the visitor's own pointer, not an animation.
 */
export function VisitorCursor({ hostRef }: { hostRef: RefObject<HTMLElement> }) {
  const fine = useFinePointer();
  const [animal] = useState(() => ANIMALS[Math.floor(Math.random() * ANIMALS.length)]);
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const el = elRef.current;
    if (!fine || !host || !el) return;
    const root = document.documentElement;
    let inside = false;
    let lastY = 0;
    let raf = 0;

    const show = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      lastY = e.clientY;
      el.style.transform = `translate3d(${e.clientX - 1}px, ${e.clientY - 1}px, 0)`;
      if (inside) return;
      inside = true;
      el.style.opacity = "1";
      host.setAttribute("data-visitor", "");
      // The site-wide ring would sit on top of this: step it aside while the pointer is over the hero.
      root.classList.add("hero-visitor-on");
    };
    const hide = () => {
      if (!inside) return;
      inside = false;
      el.style.opacity = "0";
      host.removeAttribute("data-visitor");
      root.classList.remove("hero-visitor-on");
    };
    // The page scrolling under a resting pointer can take the hero away from it without a pointer event.
    const onScroll = () => {
      if (!inside || raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = host.getBoundingClientRect();
        if (lastY < r.top || lastY > r.bottom) hide();
      });
    };

    host.addEventListener("pointerenter", show);
    host.addEventListener("pointermove", show);
    host.addEventListener("pointerleave", hide);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      host.removeEventListener("pointerenter", show);
      host.removeEventListener("pointermove", show);
      host.removeEventListener("pointerleave", hide);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      hide();
    };
  }, [fine, hostRef]);

  if (!fine) return null;
  return (
    <div ref={elRef} className="hero-visitor" aria-hidden="true">
      <svg width="16" height="20" viewBox="0 0 14 18" fill="none">
        <path d="M1 1l11 8.5-5 1 3 6.5-2.5 1-3-6.5L1 15V1z" fill="currentColor" stroke="var(--color-bg)" />
      </svg>
      <span>Anonymous {animal}</span>
    </div>
  );
}
