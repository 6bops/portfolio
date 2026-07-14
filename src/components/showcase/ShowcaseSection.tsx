import type { ReactNode } from "react";
import { color, font } from "../../styles/theme";
import type { ShowcaseSectionData } from "../../types";
import { CompareGrid, FlowGrid, ProofWall, ThreeColGrid } from "./grids";
import { ShotCard } from "./primitives";

type ShowcaseSectionProps = {
  heading: string;
  tag: string;
  note?: string;
  bodyText?: string;
  children: ReactNode;
};

/** Section header (heading + mono tag) with optional note/body, wrapping showcase content. */
export function ShowcaseSection({ heading, tag, note, bodyText, children }: ShowcaseSectionProps) {
  return (
    <section style={{ marginTop: "72px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        <h4 style={{ fontFamily: font.display, fontWeight: 700, fontSize: "20px", color: color.paper, margin: 0 }}>{heading}</h4>
        <span style={{ fontFamily: font.mono, fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b6b72" }}>
          {tag}
        </span>
      </div>
      {note && (
        <p style={{ fontFamily: font.mono, fontSize: "11px", color: "#6b6b72", marginBottom: "24px", lineHeight: 1.6, maxWidth: "640px" }}>
          {note}
        </p>
      )}
      {bodyText && (
        <p style={{ fontFamily: font.serif, fontSize: "15px", lineHeight: 1.7, color: color.muted, maxWidth: "640px", marginBottom: "24px" }}>
          {bodyText}
        </p>
      )}
      {children}
    </section>
  );
}

/** Dispatches a showcase section to the right layout renderer. */
export function ShowcaseSectionRenderer({ section }: { section: ShowcaseSectionData }) {
  return (
    <ShowcaseSection heading={section.heading} tag={section.tag} note={section.note} bodyText={section.bodyText}>
      {section.layout === "compare" && <CompareGrid columns={section.columns ?? []} />}
      {section.layout === "flow" && <FlowGrid columns={section.columns ?? []} />}
      {section.layout === "threeCol" && <ThreeColGrid columns={section.columns ?? []} />}
      {section.layout === "proofWall" && <ProofWall cards={section.cards ?? []} />}
      {section.layout === "single" && (
        <ShotCard src={section.src} alt={section.alt} maxWidth={section.maxWidth} center={section.center} />
      )}
    </ShowcaseSection>
  );
}
