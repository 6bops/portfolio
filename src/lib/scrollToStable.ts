/**
 * Scroll to an element and hold it there while the page settles.
 *
 * Screenshots below the fold are lazy, so anything above the target can still
 * grow after the scroll lands and push the target back down; a plain scrollTo
 * would overshoot. Keep re-aiming until the position stops moving.
 */
export function scrollToStable(el: HTMLElement, offset: number) {
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
