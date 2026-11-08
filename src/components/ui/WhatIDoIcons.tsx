/**
 * Small duotone glyphs for the homepage "What I Do" grid — an accent-tinted fill
 * layered under a solid outline, matching the site's --color-accent everywhere
 * else a highlight is needed. Inline SVG rather than an icon library: five
 * one-off marks don't justify a dependency, and CSS vars keep them theme-aware.
 */
const ACCENT = "var(--color-accent)";
const INK = "var(--color-white)";

const wrap = { width: 40, height: 40, display: "block" as const };

export function IconDesignSystems() {
  return (
    <svg viewBox="0 0 40 40" fill="none" style={wrap} aria-hidden="true">
      <rect x="13" y="5" width="20" height="20" rx="4" fill={ACCENT} opacity="0.25" />
      <rect x="8" y="10" width="20" height="20" rx="4" fill={ACCENT} opacity="0.4" />
      <rect x="3" y="15" width="20" height="20" rx="4" fill="none" stroke={INK} strokeWidth="1.5" />
    </svg>
  );
}

export function IconZeroToOne() {
  return (
    <svg viewBox="0 0 40 40" fill="none" style={wrap} aria-hidden="true">
      <path d="M13 25L26 13" stroke={INK} strokeWidth="1.5" strokeDasharray="1 4" strokeLinecap="round" />
      <circle cx="8" cy="29" r="5" fill={ACCENT} opacity="0.35" />
      <circle cx="8" cy="29" r="5" stroke={INK} strokeWidth="1.5" />
      <rect x="23" y="5" width="13" height="13" rx="2.5" fill={ACCENT} opacity="0.35" />
      <rect x="23" y="5" width="13" height="13" rx="2.5" stroke={INK} strokeWidth="1.5" />
    </svg>
  );
}

export function IconDataInformed() {
  return (
    <svg viewBox="0 0 40 40" fill="none" style={wrap} aria-hidden="true">
      <rect x="6" y="23" width="6" height="11" rx="1" fill={ACCENT} opacity="0.4" />
      <rect x="16" y="15" width="6" height="19" rx="1" fill={ACCENT} opacity="0.4" />
      <rect x="26" y="19" width="6" height="15" rx="1" fill={ACCENT} opacity="0.4" />
      <path d="M4 34H34" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="19" cy="9" r="5" stroke={INK} strokeWidth="1.5" />
      <path d="M23 13L27.5 17.5" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconFindingProblems() {
  return (
    <svg viewBox="0 0 40 40" fill="none" style={wrap} aria-hidden="true">
      <circle cx="17" cy="21" r="12" fill={ACCENT} opacity="0.2" />
      <circle cx="17" cy="21" r="12" stroke={INK} strokeWidth="1.5" />
      <circle cx="17" cy="21" r="1.75" fill={INK} />
      <path d="M17 21L30 8" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="32.5" cy="5.5" r="3" fill={ACCENT} />
    </svg>
  );
}

export function IconDesigningWithAI() {
  return (
    <svg viewBox="0 0 40 40" fill="none" style={wrap} aria-hidden="true">
      <path
        d="M19 4L22 16L34 19L22 22L19 34L16 22L4 19L16 16Z"
        fill={ACCENT}
        opacity="0.3"
        stroke={INK}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="7" r="2.25" fill={ACCENT} />
    </svg>
  );
}
