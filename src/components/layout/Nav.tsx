import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { color, font } from "../../styles/theme";
import { ThemeToggle } from "./ThemeToggle";

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

/** Top navigation. `end` on Home so it isn't marked active for nested routes. */
export function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Navigating away should leave the panel closed behind you.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <nav style={{ marginBottom: "96px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", rowGap: "12px" }}>
        <Link
          to="/"
          style={{ fontFamily: font.display, fontWeight: 700, fontSize: "15px", letterSpacing: "-0.02em", textDecoration: "none", color: color.white, whiteSpace: "nowrap" }}
        >
          Layor Salami
        </Link>
        <div className="nav-links">
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} style={linkStyle} {...hoverProps}>
              {link.label}
            </NavLink>
          ))}
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
            <NavLink key={link.to} to={link.to} end={link.to === "/"} style={linkStyle} {...hoverProps}>
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
