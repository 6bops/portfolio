import { StatCallout } from "../ui";
import { color } from "../../styles/theme";
import type { Stat, Workstream } from "../../types";
import { FooterStatBar, showcaseBody, showcaseLabel, StatRow } from "./primitives";
import { ShowcaseSectionRenderer } from "./ShowcaseSection";

type LeadIn = { label: string; text: string; stat: Stat };

/** Full problem → design → sections → outcome narrative for a workstream showcase. */
export function WorkstreamShowcase({ w, leadIn }: { w: Workstream; leadIn?: LeadIn | null }) {
  const sc = w.showcase!;
  return (
    <>
      {leadIn && (
        <div style={{ maxWidth: "640px", marginBottom: "16px" }}>
          <p style={showcaseLabel}>{leadIn.label}</p>
          <p style={showcaseBody}>{leadIn.text}</p>
          <StatCallout value={leadIn.stat.value} label={leadIn.stat.label} />
        </div>
      )}

      <div style={{ maxWidth: "640px" }}>
        <p style={showcaseLabel}>Problem</p>
        <p style={showcaseBody}>{w.problem}</p>

        <p style={showcaseLabel}>What I Designed</p>
        <p style={showcaseBody}>{w.scope}</p>
      </div>

      <StatRow stats={sc.stats} />

      {sc.sections.map((section, i) => (
        <ShowcaseSectionRenderer key={i} section={section} anchorId={`sec-${i}`} />
      ))}

      <div style={{ maxWidth: "640px", marginTop: "48px" }}>
        <p style={showcaseLabel}>Outcome</p>
        <p style={{ ...showcaseBody, color: color.ink }}>{w.outcome}</p>
      </div>

      <FooterStatBar stats={sc.footerStats} />
    </>
  );
}
