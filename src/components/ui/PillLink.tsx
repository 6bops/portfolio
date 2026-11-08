import type { CSSProperties, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { trackEvent } from "../../lib/analytics";
import { Magnetic } from "./Magnetic";

type PillLinkProps = {
  children: ReactNode;
  /** Internal route (react-router). */
  to?: string;
  /** External URL (opens in a new tab). */
  href?: string;
  /** Click handler. For `to` it runs alongside navigation; with neither `to` nor `href` the pill renders as a <button>. */
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
  const className = "pill-link pill-link--solid";
  const location = useLocation();

  if (to) {
    return (
      <Magnetic strength={8} style={style}>
        <Link to={to} className={className} onClick={onClick}>
          {children}
        </Link>
      </Magnetic>
    );
  }
  if (href) {
    const isMailto = href.startsWith("mailto:");
    return (
      <Magnetic strength={8} style={style}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          onClick={() => trackEvent(isMailto ? "contact_click" : "external_link_click", { href, from_path: location.pathname })}
        >
          {children}
        </a>
      </Magnetic>
    );
  }
  return (
    <Magnetic strength={8} style={style}>
      <button type="button" onClick={onClick} className={className}>
        {children}
      </button>
    </Magnetic>
  );
}
