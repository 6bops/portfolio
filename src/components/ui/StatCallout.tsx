import { color, font } from "../../styles/theme";
import type { Stat } from "../../types";

type StatCalloutProps = Stat & {
  /** Smaller ceiling for tight multi-column grids (e.g. the homepage stats bar) where the default size overflows a narrow column. */
  compact?: boolean;
};

/** Large centred stat with a mono caption — the single-figure emphasis block. */
export function StatCallout({ value, label, compact = false }: StatCalloutProps) {
  return (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <p
        style={{
          fontFamily: font.display,
          fontWeight: 800,
          fontSize: compact ? "clamp(22px, 5vw, 38px)" : "clamp(40px, 6vw, 56px)",
          lineHeight: 1.1,
          color: color.ink,
          margin: 0,
          overflowWrap: "anywhere",
        }}
      >
        {value}
      </p>
      <p
        style={{
          fontFamily: font.mono,
          fontSize: "13px",
          color: color.soft,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginTop: "8px",
          maxWidth: "320px",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
        }}
      >
        {label}
      </p>
    </div>
  );
}
