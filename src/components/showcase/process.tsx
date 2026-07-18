import type { CSSProperties } from "react";
import { useTheme } from "../../hooks/useTheme";
import { color, font } from "../../styles/theme";
import type { ProcessStep, Sourcing } from "../../types";
import { Shot } from "../ui/Shot";

/**
 * An infographic that ships its own light and dark artwork, plus dedicated
 * mobile layouts (stacked, not just scaled). Because the artwork carries its
 * own background it sits directly on the page rather than on the fixed-light
 * paper card used for product screenshots.
 *
 * `mobile` variants are optional: where one is missing the desktop art for the
 * same theme is used, which stays theme-correct at the cost of some legibility.
 */
export function ThemedShotCard({
  light,
  dark,
  lightMobile,
  darkMobile,
  alt,
}: {
  light: string;
  dark: string;
  lightMobile?: string;
  darkMobile?: string;
  alt?: string;
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const desktop = isDark ? dark : light;
  const mobile = (isDark ? darkMobile : lightMobile) ?? desktop;

  return (
    <div
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        border: `1px solid ${color.border}`,
      }}
    >
      <picture>
        <source media="(max-width: 640px)" srcSet={mobile} />
        <Shot src={desktop} alt={alt} style={{ display: "block", width: "100%", height: "auto" }} />
      </picture>
    </div>
  );
}

/**
 * Process artifacts. Where a FigJam board artifact exists it's shown as an
 * export — the point is to evidence that the work happened, and the board's
 * spatial layout carries branching better than a rebuilt list. StepTrail is
 * kept for the two trails with no board artifact behind them.
 */

/**
 * A very wide diagram (the user flow is ~7:1). Scaled to fit it becomes an
 * unreadable sliver, so it renders at a usable height and pans horizontally
 * inside its own container — the page itself never scrolls sideways.
 */
export function WideShotCard({ src, alt }: { src?: string; alt?: string }) {
  return (
    <div
      style={{
        background: color.paper,
        borderRadius: "20px",
        padding: "16px",
        boxShadow: "0 30px 60px -30px rgba(0,0,0,0.6)",
      }}
    >
      <div
        style={{
          overflowX: "auto",
          borderRadius: "12px",
          border: `1px solid ${color.paperBorder}`,
          background: "#fff",
        }}
      >
        <Shot src={src} alt={alt} style={{ display: "block", height: "420px", width: "auto", maxWidth: "none" }} />
      </div>
      <p
        style={{
          fontFamily: font.mono,
          fontSize: "11px",
          color: "#a9a49a",
          margin: "10px 2px 0",
          letterSpacing: "0.06em",
        }}
      >
        ← scroll to pan →
      </p>
    </div>
  );
}

const cardBase: CSSProperties = {
  background: color.surface,
  border: `1px solid ${color.border}`,
  borderRadius: "14px",
  padding: "16px 18px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

/** Visible provenance marker — sourced vs. reconstructed is never left implicit. */
export function SourcingBadge({ sourcing }: { sourcing: Sourcing }) {
  const isSourced = sourcing === "sourced";
  return (
    <span
      style={{
        fontFamily: font.mono,
        fontSize: "11px",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        padding: "4px 10px",
        borderRadius: "100px",
        whiteSpace: "nowrap",
        color: isSourced ? color.accent : color.faint,
        border: `1px solid ${isSourced ? color.accent : color.border}`,
      }}
      title={
        isSourced
          ? "Grounded in a source document, screenshot, or direct account of what happened."
          : "Inferred from general recollection or extrapolated from a single confirmed fact — illustrative, not evidence."
      }
    >
      {isSourced ? "Sourced" : "Reconstructed"}
    </span>
  );
}

/**
 * A linear decision trail. Steps wrap into a responsive grid and carry their
 * order as a number, so reading order survives without a horizontal ribbon.
 */
export function StepTrail({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
        gap: "12px",
        listStyle: "none",
        padding: 0,
        margin: 0,
      }}
    >
      {steps.map((s, i) => {
        const isDecision = s.kind === "decision";
        const isOutcome = s.kind === "outcome";
        const accented = isDecision || isOutcome;
        return (
          <li
            key={i}
            style={{
              ...cardBase,
              borderColor: accented ? color.accent : color.border,
              borderStyle: isDecision ? "dashed" : "solid",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  fontFamily: font.mono,
                  fontSize: "11px",
                  color: accented ? color.accent : color.faint,
                  letterSpacing: "0.08em",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {isDecision && (
                <span style={{ fontFamily: font.mono, fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: color.accent }}>
                  Decision
                </span>
              )}
              {isOutcome && (
                <span style={{ fontFamily: font.mono, fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: color.accent }}>
                  Shipped
                </span>
              )}
            </div>
            <p style={{ fontFamily: font.display, fontWeight: 700, fontSize: "15px", color: color.white, margin: 0, lineHeight: 1.35 }}>
              {s.title}
            </p>
            {s.detail && (
              <p style={{ fontFamily: font.serif, fontSize: "13px", color: color.muted, margin: 0, lineHeight: 1.55 }}>{s.detail}</p>
            )}
            {s.checkpoint && (
              <p
                style={{
                  fontFamily: font.mono,
                  fontSize: "11px",
                  color: color.accent,
                  margin: "4px 0 0 0",
                  padding: "6px 10px",
                  borderRadius: "8px",
                  border: `1px dashed ${color.accent}`,
                  lineHeight: 1.5,
                }}
              >
                ⌸ {s.checkpoint}
              </p>
            )}
          </li>
        );
      })}
    </ol>
  );
}
