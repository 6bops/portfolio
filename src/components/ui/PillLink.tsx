import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { Link } from "react-router-dom";
import { color, font } from "../../styles/theme";

const base: CSSProperties = {
  display: "inline-block",
  fontFamily: font.mono,
  fontSize: "13px",
  color: color.white,
  background: "transparent",
  border: `1px solid ${color.borderStrong}`,
  borderRadius: "100px",
  padding: "8px 20px",
  textDecoration: "none",
  whiteSpace: "nowrap",
  cursor: "pointer",
  transition: "border-color 0.3s, background 0.3s",
};

const onEnter = (e: MouseEvent<HTMLElement>) => {
  e.currentTarget.style.borderColor = color.faint;
  e.currentTarget.style.background = "var(--hover-tint)";
};
const onLeave = (e: MouseEvent<HTMLElement>) => {
  e.currentTarget.style.borderColor = color.borderStrong;
  e.currentTarget.style.background = "transparent";
};

type PillLinkProps = {
  children: ReactNode;
  /** Internal route (react-router). */
  to?: string;
  /** External URL (opens in a new tab). */
  href?: string;
  /** Renders as a <button> when neither `to` nor `href` is given. */
  onClick?: () => void;
  style?: CSSProperties;
};

/** The outlined, pill-shaped call-to-action used across the site. */
export function PillLink({ children, to, href, onClick, style = {} }: PillLinkProps) {
  const shared = { style: { ...base, ...style }, onMouseEnter: onEnter, onMouseLeave: onLeave };

  if (to) {
    return (
      <Link to={to} {...shared}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...shared}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} {...shared}>
      {children}
    </button>
  );
}
