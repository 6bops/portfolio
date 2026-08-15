import type { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { trackEvent } from "../../lib/analytics";
import { color, font } from "../../styles/theme";

const PAGE_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "More", to: "/more" },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/layor-salami" },
  { label: "Email", href: "mailto:salamilayor@gmail.com" },
  { label: "Website", href: "https://layorsalami.com" },
];

const linkStyle = { fontFamily: font.mono, fontSize: "13px", color: color.faint, textDecoration: "none", transition: "color 0.2s" };
const enter = (e: MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = color.white);
const leave = (e: MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = color.faint);

export function Footer() {
  return (
    <footer
      style={{
        borderTop: `1px solid ${color.border}`,
        paddingTop: "48px",
        paddingBottom: "64px",
        marginTop: "48px",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "24px",
      }}
    >
      <div style={{ display: "flex", gap: "24px" }}>
        {PAGE_LINKS.map((link) => (
          <Link key={link.to} to={link.to} style={linkStyle} onMouseEnter={enter} onMouseLeave={leave}>
            {link.label}
          </Link>
        ))}
      </div>
      <div style={{ display: "flex", gap: "24px" }}>
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
            onMouseEnter={enter}
            onMouseLeave={leave}
            onClick={() =>
              trackEvent(link.href.startsWith("mailto:") ? "contact_click" : "external_link_click", {
                href: link.href,
                from_path: "footer",
                label: link.label,
              })
            }
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
