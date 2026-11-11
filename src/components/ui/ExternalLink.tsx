import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent } from "../../lib/analytics";

/** An inline text link to another site: opens in a new tab, and says so to screen readers. Styled by `.inline-link`. */
export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-link"
      draggable={false}
      onClick={() => trackEvent("external_link_click", { href, from_path: pathname })}
    >
      {children}
      <span className="inline-link-ext" aria-hidden="true">
        {" ↗"}
      </span>
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}
