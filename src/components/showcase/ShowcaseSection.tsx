import type { ReactNode } from "react";
import { color, font } from "../../styles/theme";
import type { ShowcaseSectionData, Sourcing } from "../../types";
import { CompareGrid, FlowGrid, ProofWall, ThreeColGrid } from "./grids";
import { ShotCard } from "./primitives";
import { SourcingBadge, StepTrail, ThemedShotCard, WideShotCard } from "./process";

type ShowcaseSectionProps = {
  heading: string;
  tag: string;
  note?: string;
  bodyText?: string;
  sourcing?: Sourcing;
  groupHeading?: { kicker: string; heading: string; body: string };
  /** Anchor target for the workstream's jump menu. */
  anchorId?: string;
  children: ReactNode;
};

/** Optional divider grouping several sections under a shared sub-heading (e.g. "App 01"). */
function ShowcaseGroupHeading({ kicker, heading, body }: { kicker: string; heading: string; body: string }) {
  return (
    <div style={{ marginTop: "96px", marginBottom: "8px", maxWidth: "720px" }}>
      <p style={{ fontFamily: font.mono, fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: color.accent, marginBottom: "12px" }}>
        {kicker}
      </p>
      <h3 style={{ fontFamily: font.display, fontWeight: 800, fontSize: "clamp(22px, 3vw, 28px)", color: color.white, lineHeight: 1.2, margin: "0 0 12px 0" }}>
        {heading}
      </h3>
      <p style={{ fontFamily: font.serif, fontSize: "15px", lineHeight: 1.7, color: color.muted, margin: 0 }}>{body}</p>
    </div>
  );
}

/** Section header (heading + mono tag) with optional note/body, wrapping showcase content. */
export function ShowcaseSection({ heading, tag, note, bodyText, sourcing, groupHeading, anchorId, children }: ShowcaseSectionProps) {
  return (
    <>
      {groupHeading && <ShowcaseGroupHeading {...groupHeading} />}
      <section id={anchorId} style={{ marginTop: groupHeading ? "32px" : "72px", scrollMarginTop: "96px" }}>
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
        <h4 style={{ fontFamily: font.display, fontWeight: 700, fontSize: "20px", color: color.white, margin: 0 }}>{heading}</h4>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          {sourcing && <SourcingBadge sourcing={sourcing} />}
          <span style={{ fontFamily: font.mono, fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: color.faint }}>
            {tag}
          </span>
        </span>
      </div>
      {note && (
        <p style={{ fontFamily: font.mono, fontSize: "11px", color: color.faint, marginBottom: "24px", lineHeight: 1.6, maxWidth: "640px" }}>
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
    </>
  );
}

/** Dispatches a showcase section to the right layout renderer. */
export function ShowcaseSectionRenderer({ section, anchorId }: { section: ShowcaseSectionData; anchorId?: string }) {
  return (
    <ShowcaseSection
      heading={section.heading}
      tag={section.tag}
      note={section.note}
      bodyText={section.bodyText}
      sourcing={section.sourcing}
      groupHeading={section.groupHeading}
      anchorId={anchorId}
    >
      {section.layout === "compare" && <CompareGrid columns={section.columns ?? []} />}
      {section.layout === "flow" && <FlowGrid columns={section.columns ?? []} />}
      {section.layout === "threeCol" && <ThreeColGrid columns={section.columns ?? []} />}
      {section.layout === "proofWall" && <ProofWall cards={section.cards ?? []} />}
      {section.layout === "steps" && <StepTrail steps={section.steps ?? []} />}
      {section.layout === "wideShot" && <WideShotCard src={section.src} alt={section.alt} />}
      {section.layout === "themedShot" && section.themed && (
        <ThemedShotCard {...section.themed} alt={section.alt} />
      )}
      {section.layout === "single" && (
        <ShotCard
          src={section.src}
          alt={section.alt}
          maxWidth={section.maxWidth}
          center={section.center}
          device={section.device}
          cropTo={section.cropTo}
        />
      )}
    </ShowcaseSection>
  );
}
