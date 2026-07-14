import { color, font } from "../../styles/theme";
import type { Stat } from "../../types";

/** Large centred stat with a mono caption — the single-figure emphasis block. */
export function StatCallout({ value, label }: Stat) {
  return (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <p
        style={{
          fontFamily: font.display,
          fontWeight: 800,
          fontSize: "clamp(40px, 6vw, 56px)",
          lineHeight: 1.1,
          color: color.ink,
          margin: 0,
        }}
      >
        {value}
      </p>
      <p
        style={{
          fontFamily: font.mono,
          fontSize: "12px",
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
