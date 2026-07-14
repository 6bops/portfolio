import type { ReactNode } from "react";
import { color, font } from "../../styles/theme";

type ShowcaseHeroProps = {
  eyebrow: string;
  heading: string;
  emphasis?: string;
  lede: string;
};

/** Opening hero for a workstream showcase, with an optional highlighted phrase. */
export function ShowcaseHero({ eyebrow, heading, emphasis, lede }: ShowcaseHeroProps) {
  let headingNode: ReactNode = heading;
  if (emphasis && heading.includes(emphasis)) {
    const idx = heading.indexOf(emphasis);
    headingNode = (
      <>
        {heading.slice(0, idx)}
        <span style={{ color: color.accent }}>{emphasis}</span>
        {heading.slice(idx + emphasis.length)}
      </>
    );
  }
  return (
    <div style={{ marginTop: "64px" }}>
      <p style={{ fontFamily: font.mono, fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: color.accent, marginBottom: "16px" }}>
        {eyebrow}
      </p>
      <h3
        style={{
          fontFamily: font.display,
          fontWeight: 800,
          fontSize: "clamp(26px, 4vw, 40px)",
          lineHeight: 1.15,
          letterSpacing: "-0.01em",
          color: color.paper,
          maxWidth: "780px",
          margin: 0,
        }}
      >
        {headingNode}
      </h3>
      <p style={{ fontFamily: font.serif, fontSize: "17px", lineHeight: 1.7, color: "#a6a6ac", maxWidth: "620px", marginTop: "20px" }}>
        {lede}
      </p>
    </div>
  );
}
