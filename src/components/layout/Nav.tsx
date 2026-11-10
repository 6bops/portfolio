import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { trackEvent } from "../../lib/analytics";
import { color, font } from "../../styles/theme";
import { ThemeToggle } from "./ThemeToggle";
import { Magnetic } from "../ui/Magnetic";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "More", to: "/more" },
];

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  fontFamily: font.mono,
  fontSize: "13px",
  color: isActive ? color.white : color.soft,
  textDecoration: "none",
  transition: "color 0.2s",
});

const hoverProps = {
  onMouseEnter: (e: MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = color.white),
  onMouseLeave: (e: MouseEvent<HTMLAnchorElement>) => {
    if (!e.currentTarget.classList.contains("active")) e.currentTarget.style.color = color.soft;
  },
};

const IS_MAC = typeof navigator !== "undefined" && navigator.platform.includes("Mac");

const trackNavClick = (label: string, fromPath: string, surface: "desktop" | "mobile") =>
  trackEvent("nav_click", { label, from_path: fromPath, surface });

/** Top navigation. `end` on Home so it isn't marked active for nested routes. */
export function Nav({ onOpenPalette }: { onOpenPalette?: () => void }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Navigating away should leave the panel closed behind you.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <nav className="site-nav">
      <div className="site-nav-row">
        <Magnetic strength={6}>
          <Link
            to="/"
            style={{ fontFamily: font.display, fontWeight: 700, fontSize: "15px", letterSpacing: "-0.02em", textDecoration: "none", color: color.white, whiteSpace: "nowrap" }}
          >
            Layor Salami
          </Link>
        </Magnetic>
        <div className="nav-links">
          {LINKS.map((link) => (
            <Magnetic key={link.to} strength={6}>
              <NavLink to={link.to} end={link.to === "/"} style={linkStyle} onClick={() => trackNavClick(link.label, pathname, "desktop")} {...hoverProps}>
                {link.label}
              </NavLink>
            </Magnetic>
          ))}
          {onOpenPalette && (
            <button
              type="button"
              className="nav-palette-hint"
              aria-label="Open command palette"
              aria-keyshortcuts={IS_MAC ? "Meta+K" : "Control+K"}
              onClick={onOpenPalette}
            >
              {IS_MAC ? "⌘K" : "Ctrl K"}
            </button>
          )}
          <ThemeToggle />
        </div>
        <div className="nav-mobile-controls">
          <ThemeToggle />
          <button
            type="button"
            className="nav-burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="nav-mobile-panel"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`nav-burger-bar${open ? " nav-burger-bar--top-open" : ""}`} />
            <span className={`nav-burger-bar${open ? " nav-burger-bar--mid-open" : ""}`} />
            <span className={`nav-burger-bar${open ? " nav-burger-bar--bot-open" : ""}`} />
          </button>
        </div>
      </div>
      {open && (
        <div className="nav-mobile-panel" id="nav-mobile-panel">
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} style={linkStyle} onClick={() => trackNavClick(link.label, pathname, "mobile")} {...hoverProps}>
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
