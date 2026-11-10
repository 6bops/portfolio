import { useEffect, useState } from "react";
import type { RefObject } from "react";

/**
 * True while the visitor is working with the Status object: a disclosure inside the canvas (the CV menu)
 * is open, or keyboard focus is inside Status. Layor's cursor steps aside meanwhile, so it neither wanders
 * over the open menu nor sets hovers while a CV is being chosen. Reads `aria-expanded` and `:focus-visible`
 * (a mouse click that merely focuses the button does not count), so it needs nothing from the menu itself.
 */
export function useStatusEngaged(viewportRef: RefObject<HTMLElement>): boolean {
  const [engaged, setEngaged] = useState(false);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    let menuOpen = false;
    let focusIn = false;
    const sync = () => setEngaged(menuOpen || focusIn);

    const readMenu = () => {
      menuOpen = el.querySelector('[aria-expanded="true"]') !== null;
      sync();
    };
    const inStatus = (t: EventTarget | null) => t instanceof Element && t.closest('[data-obj-id="status"]') !== null;
    const onFocusIn = (e: FocusEvent) => {
      focusIn = inStatus(e.target) && (e.target as Element).matches(":focus-visible");
      sync();
    };
    const onFocusOut = () => {
      focusIn = false;
      sync();
    };

    readMenu();
    const mo = new MutationObserver(readMenu);
    mo.observe(el, { subtree: true, childList: true, attributes: true, attributeFilter: ["aria-expanded"] });
    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);
    return () => {
      mo.disconnect();
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut);
    };
  }, [viewportRef]);

  return engaged;
}
