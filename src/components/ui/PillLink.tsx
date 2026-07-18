import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";

type PillLinkProps = {
  children: ReactNode;
  /** Internal route (react-router). */
  to?: string;
  /** External URL (opens in a new tab). */
  href?: string;
  /** Renders as a <button> when neither `to` nor `href` is given. */
  onClick?: () => void;
  /** Layout overrides only; appearance lives in the `.pill-link` class. */
  style?: CSSProperties;
};

/**
 * The outlined, pill-shaped call-to-action used across the site.
 *
 * Styling lives in `.pill-link` (global.css) rather than an inline object so
 * hover and focus are real CSS states. The previous version drove hover from
 * JS mouse handlers, which meant keyboard users got no focus affordance.
 */
export function PillLink({ children, to, href, onClick, style }: PillLinkProps) {
  const shared = { className: "pill-link pill-link--solid", style };

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
