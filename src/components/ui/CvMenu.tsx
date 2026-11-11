import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { CV_VARIANTS } from "../../data/cvs";
import { trackEvent } from "../../lib/analytics";
import { NAV_HEIGHT } from "../../lib/layout";
import { color, font } from "../../styles/theme";

/**
 * "Download CV" with a short menu of versions, so a visitor picks the one that fits the role.
 * A disclosure button rather than a native menu: links inside, Escape and an outside click close it,
 * and focus returns to the button.
 */
export function CvMenu() {
  const [open, setOpen] = useState(false);
  // The list is about 340px tall; near the bottom of a short screen it would open below the fold.
  const [flipUp, setFlipUp] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  useLayoutEffect(() => {
    if (!open || !listRef.current || !buttonRef.current) return;
    // Screen height (the menu may sit inside the zoomed hero canvas), measured against the window
    // and, inside the canvas, against the canvas's clipped edges.
    const listHeight = listRef.current.getBoundingClientRect().height + 16;
    const button = buttonRef.current.getBoundingClientRect();
    const clip = rootRef.current?.closest(".dc-viewport")?.getBoundingClientRect();
    const roomBelow = Math.min(window.innerHeight, clip?.bottom ?? Infinity) - button.bottom;
    const roomAbove = button.top - Math.max(NAV_HEIGHT, clip?.top ?? -Infinity);
    setFlipUp(roomBelow < listHeight && roomAbove > roomBelow);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} style={{ position: "relative", display: "inline-block" }}>
      <button
        ref={buttonRef}
        type="button"
        className="pill-link"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => {
          if (!open) trackEvent("cv_menu_open", { from_path: "homepage_hero" });
          setOpen((v) => !v);
        }}
      >
        Download CV {open ? "↑" : "↓"}
      </button>
      {open && (
        <ul
          ref={listRef}
          id={listId}
          style={{
            position: "absolute",
            ...(flipUp ? { bottom: "calc(100% + 8px)" } : { top: "calc(100% + 8px)" }),
            left: 0,
            zIndex: 920,
            margin: 0,
            padding: "8px",
            listStyle: "none",
            minWidth: "320px",
            maxWidth: "calc(100vw - 48px)",
            background: color.surface,
            border: `1px solid ${color.borderStrong}`,
            borderRadius: "16px",
          }}
        >
          {CV_VARIANTS.map((cv) => (
            <li key={cv.id}>
              <a
                href={cv.file}
                download
                onClick={() => {
                  trackEvent("cv_download", { variant: cv.id, from_path: "homepage_hero" });
                  setOpen(false);
                }}
                style={{ display: "block", padding: "12px 14px", borderRadius: "10px", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--hover-tint)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <span style={{ display: "block", fontFamily: font.display, fontWeight: 700, fontSize: "14px", color: color.ink }}>
                  {cv.label}
                </span>
                <span style={{ display: "block", marginTop: "2px", fontFamily: font.mono, fontSize: "12px", color: color.soft }}>
                  {cv.note}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
