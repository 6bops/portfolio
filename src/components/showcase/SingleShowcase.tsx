import { color, font } from "../../styles/theme";
import type { ProjectDetail } from "../../types";
import { FooterStatBar, showcaseBody, showcaseLabel, StatRow } from "./primitives";
import { ShowcaseSectionRenderer } from "./ShowcaseSection";

/** Full problem → constraint → sections → decisions → outcome narrative for a single-narrative project's showcase. */
export function SingleShowcase({ detail: d }: { detail: ProjectDetail }) {
  const sc = d.showcase!;
  const decisions = d.decisions ?? [];

  return (
    <>
      <div style={{ maxWidth: "640px" }}>
        <p style={showcaseLabel}>Problem</p>
        <p style={showcaseBody}>{d.problem}</p>

        <p style={showcaseLabel}>The Constraint</p>
        <p style={showcaseBody}>{d.constraint}</p>
      </div>

      <StatRow stats={sc.stats} />

      {sc.sections.map((section, i) => (
        <ShowcaseSectionRenderer key={i} section={section} />
      ))}

      {decisions.length > 0 && (
        <div style={{ maxWidth: "640px", marginTop: "48px" }}>
          <p style={showcaseLabel}>Key Decisions</p>
          {decisions.map((dec, i) => (
            <div key={i} style={{ borderTop: `1px solid ${color.border}`, paddingTop: "24px", paddingBottom: "24px" }}>
              <h4 style={{ fontFamily: font.display, fontSize: "15px", fontWeight: 700, color: color.ink, margin: "0 0 10px 0" }}>{dec.heading}</h4>
              <p style={{ ...showcaseBody, margin: 0 }}>{dec.body}</p>
            </div>
          ))}
        </div>
      )}

      {d.honest && (
        <div style={{ maxWidth: "640px", marginTop: "32px" }}>
          <p style={showcaseLabel}>What Did Not Work</p>
          <div style={{ borderLeft: `2px solid ${color.borderStrong}`, paddingLeft: "24px" }}>
            <p style={showcaseBody}>{d.honest}</p>
          </div>
        </div>
      )}

      <div style={{ maxWidth: "640px", marginTop: "32px" }}>
        <p style={showcaseLabel}>Outcome</p>
        <p style={{ ...showcaseBody, color: color.ink }}>{d.outcome}</p>
      </div>

      <FooterStatBar stats={sc.footerStats} />
    </>
  );
}
