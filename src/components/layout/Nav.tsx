import type { MouseEvent } from "react";
import { Link, NavLink } from "react-router-dom";
import { color, font } from "../../styles/theme";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "More", to: "/more" },
];

/** Top navigation. `end` on Home so it isn't marked active for nested routes. */
export function Nav() {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "100px" }}>
      <Link to="/" style={{ fontFamily: font.display, fontWeight: 700, fontSize: "15px", letterSpacing: "-0.02em", textDecoration: "none", color: color.white }}>
        Layor Salami
      </Link>
      <div style={{ display: "flex", gap: "28px" }}>
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            style={({ isActive }) => ({
              fontFamily: font.mono,
              fontSize: "13px",
              color: isActive ? "#fff" : color.soft,
              textDecoration: "none",
              transition: "color 0.2s",
            })}
            onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) => {
              if (!e.currentTarget.classList.contains("active")) e.currentTarget.style.color = color.soft;
            }}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
