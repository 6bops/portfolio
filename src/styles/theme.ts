/**
 * Design tokens. Every font family, colour, and reused style fragment lives here
 * so the same literal never has to be typed twice across components.
 */

export const font = {
  display: "'Syne', sans-serif",
  serif: "'Source Serif 4', Georgia, serif",
  mono: "'DM Mono', monospace",
} as const;

/**
 * Theme-aware tokens. Values are CSS custom properties defined per-theme in
 * global.css ([data-theme="dark"] / [data-theme="light"]) — the ThemeProvider
 * flips the `data-theme` attribute on <html> and these resolve automatically,
 * with no re-render required and no call-site changes.
 *
 * `paper`/`paperInk`/`paperBorder` are the exception: they're the light
 * surface used to frame product-screenshot mockups inside case studies, and
 * stay fixed regardless of site theme (like a screenshot of light-mode UI
 * embedded in a dark blog post).
 */
export const color = {
  // Surfaces
  bg: "var(--color-bg)",
  surface: "var(--color-surface)",
  surfaceRaised: "var(--color-surface-raised)",
  border: "var(--color-border)",
  borderStrong: "var(--color-border-strong)",
  hairline: "var(--color-hairline)",

  // Ink
  white: "var(--color-white)",
  ink: "var(--color-ink)",
  body: "var(--color-body)",
  muted: "var(--color-muted)",
  soft: "var(--color-soft)",
  faint: "var(--color-faint)",
  dim: "var(--color-dim)",
  ghost: "var(--color-ghost)",

  // Accents
  accent: "var(--color-accent)",
  accentDeep: "var(--color-accent-deep)",

  // Light showcase surfaces (case-study "shots") — fixed, not theme-reactive
  paper: "#f4f3ef",
  paperInk: "#14151a",
  paperBorder: "#e7e5e0",
} as const;

/**
 * Canonical type scale. The page had drifted to 23 distinct sizes (including
 * 9.5 / 12.5 / 14.5 / 15.5px); everything now snaps to these five steps plus
 * the responsive `clamp()` display sizes on headings. Fewer steps read as a
 * cleaner, more deliberate hierarchy.
 *
 *   micro 11 — mono eyebrows, tags, badges, meta
 *   small 13 — captions, secondary labels, small UI
 *   base  15 — UI text, nav, secondary body
 *   body  17 — primary reading copy
 *   sub   20 — non-display sub-headings
 */
export const size = {
  micro: "11px",
  small: "13px",
  base: "15px",
  body: "17px",
  sub: "20px",
} as const;

/**
 * Spacing scale, 8px-based with 4px half-steps. Off-grid values (6, 10, 14,
 * 60, 100px) snap to the nearest step so vertical rhythm stays consistent.
 */
export const space = {
  xxs: "4px",
  xs: "8px",
  sm: "12px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  xxl: "48px",
  xxxl: "64px",
  huge: "96px",
} as const;

/** Uppercase mono eyebrow used for section labels throughout the site. */
export const sectionLabel = {
  fontFamily: font.mono,
  fontSize: "13px",
  color: color.dim,
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  marginBottom: "24px",
};

/** Long-form serif body copy. */
export const bodyText = {
  fontFamily: font.serif,
  fontSize: "17px",
  lineHeight: 1.7,
  color: color.body,
};
