import { color, font } from "../../styles/theme";
import type { ProjectDetail } from "../../types";
import { FooterStatBar, showcaseBody, showcaseLabel, StatRow } from "./primitives";
import { ShowcaseSectionRenderer } from "./ShowcaseSection";
import { SectionNav } from "../project/SectionNav";

/** Full problem → constraint → sections → decisions → outcome narrative for a single-narrative project's showcase. */
export function SingleShowcase({ detail: d }: { detail: ProjectDetail }) {
  const sc = d.showcase!;
  const decisions = d.decisions ?? [];

  // Only sections that render get a chip (the ShowcaseSection blocks in between do not).
  const navItems = [
    { id: "problem", label: "The problem" },
    { id: "constraint", label: "Constraint" },
    ...(decisions.length > 0 ? [{ id: "decisions", label: "Key decisions" }] : []),
    ...(d.honest ? [{ id: "honest", label: "What didn't work" }] : []),
    { id: "outcome", label: "Outcome" },
  ];

  return (
    <>
      {/* Direct child of the page: a wrapper with a transform or overflow would cap how far it can stick. */}
      <SectionNav items={navItems} />

      <div id="problem" className="narrative-section" style={{ maxWidth: "640px" }}>
        <p style={showcaseLabel}>Problem</p>
        <p style={showcaseBody}>{d.problem}</p>
      </div>

      <div id="constraint" className="narrative-section" style={{ maxWidth: "640px" }}>
        <p style={showcaseLabel}>The Constraint</p>
        <p style={showcaseBody}>{d.constraint}</p>
      </div>

      <StatRow stats={sc.stats} />

      {sc.sections.map((section, i) => (
        <ShowcaseSectionRenderer key={i} section={section} />
      ))}

      {decisions.length > 0 && (
        <div id="decisions" className="narrative-section" style={{ maxWidth: "640px", marginTop: "48px" }}>
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
        <div id="honest" className="narrative-section" style={{ maxWidth: "640px", marginTop: "32px" }}>
          <p style={showcaseLabel}>What Did Not Work</p>
          <div style={{ borderLeft: `2px solid ${color.borderStrong}`, paddingLeft: "24px" }}>
            <p style={showcaseBody}>{d.honest}</p>
          </div>
        </div>
      )}

      <div id="outcome" className="narrative-section" style={{ maxWidth: "640px", marginTop: "32px" }}>
        <p style={showcaseLabel}>Outcome</p>
        <p style={{ ...showcaseBody, color: color.ink }}>{d.outcome}</p>
      </div>

      <FooterStatBar stats={sc.footerStats} />
    </>
  );
}
