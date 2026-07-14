/**
 * Design tokens. Every font family, colour, and reused style fragment lives here
 * so the same literal never has to be typed twice across components.
 */

export const font = {
  display: "'Syne', sans-serif",
  serif: "'Source Serif 4', Georgia, serif",
  mono: "'DM Mono', monospace",
} as const;

export const color = {
  // Surfaces
  bg: "#0e0e0e",
  surface: "#141414",
  surfaceRaised: "#181818",
  border: "#1f1f1f",
  borderStrong: "#333",
  hairline: "#1a1a1a",

  // Ink
  white: "#f0f0f0",
  ink: "#e0e0e0",
  body: "#b0b0b0",
  muted: "#999",
  soft: "#888",
  faint: "#666",
  dim: "#555",
  ghost: "#444",

  // Accents
  accent: "#8f8bff",
  accentDeep: "#5b4cf5",

  // Light showcase surfaces (case-study "shots")
  paper: "#f4f3ef",
  paperInk: "#14151a",
  paperBorder: "#e7e5e0",
} as const;

/** Uppercase mono eyebrow used for section labels throughout the site. */
export const sectionLabel = {
  fontFamily: font.mono,
  fontSize: "12px",
  color: color.dim,
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  marginBottom: "20px",
};

/** Long-form serif body copy. */
export const bodyText = {
  fontFamily: font.serif,
  fontSize: "17px",
  lineHeight: 1.7,
  color: color.body,
};
