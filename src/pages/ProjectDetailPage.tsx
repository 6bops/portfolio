import type { CSSProperties } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { color, font } from "../styles/theme";
import { useMounted } from "../hooks/useMounted";
import { useScrollDepthTracking } from "../hooks/useScrollDepthTracking";
import { getProjectBySlug } from "../data";
import type { Media, ProjectDetail } from "../types";
import { FadeIn, ImagePlaceholder, MediaCarousel, MediaItem, PillLink, StatCallout } from "../components/ui";
import { naturalAspect } from "../components/ui/Shot";
import { ImageGroup, WorkstreamAccordion } from "../components/project";
import { ShowcaseHero, SingleShowcase, StatRow, WorkstreamShowcase } from "../components/showcase";

const sectionLabel: CSSProperties = {
  fontFamily: font.mono,
  fontSize: "13px",
  color: color.dim,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  marginBottom: "24px",
};

const bodyText: CSSProperties = { fontFamily: font.serif, fontSize: "17px", lineHeight: 1.7, color: color.body };

const wsLabel: CSSProperties = {
  fontFamily: font.mono,
  fontSize: "11px",
  color: color.dim,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  marginTop: "16px",
  marginBottom: "8px",
};
const wsBody: CSSProperties = { fontFamily: font.serif, fontSize: "15px", lineHeight: 1.7, color: color.muted, margin: 0 };

/** Hero art keeps its own proportions; videos aren't in the manifest. */
const heroAspect = (m: Media) => (m.type === "image" ? naturalAspect(m.src) : undefined);

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const loaded = useMounted();
  const project = slug ? getProjectBySlug(slug) : undefined;
  useScrollDepthTracking(slug ?? "unknown");

  // previewOnly projects show on the listing but their case study isn't ready,
  // so a direct URL to one bounces back to the index.
  if (!project || project.previewOnly) return <Navigate to="/work" replace />;

  const d = project.detail;

  return (
    <>
      {/* Back button */}
      <FadeIn delay={0.1}>
        <div style={{ marginBottom: "48px" }}>
          <Link
            to="/work"
            style={{ fontFamily: font.mono, fontSize: "13px", color: color.soft, textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = color.white)}
            onMouseLeave={(e) => (e.currentTarget.style.color = color.soft)}
          >
            ← Back to work
          </Link>
        </div>
      </FadeIn>

      {/* Metadata strip */}
      <FadeIn delay={0.2}>
        <div className="project-meta">
          <div className="project-meta-grid">
            {[
              { label: "Role", value: d.role },
              { label: "Timeline", value: d.timeline },
              { label: "Platform", value: d.platform },
              { label: "Status", value: d.status },
            ].map((item) => (
              <div key={item.label}>
                <p style={{ fontFamily: font.mono, fontSize: "13px", color: color.dim, marginBottom: "8px" }}>{item.label}</p>
                <p style={{ fontFamily: font.display, fontSize: "15px", fontWeight: 700, color: color.ink, margin: 0 }}>{item.value}</p>
              </div>
            ))}
          </div>
          {(project.ctaLink || project.websiteLink) && (
            <div className="project-meta-actions">
              {project.ctaLink && <PillLink href={project.ctaLink}>{project.cta} ↗</PillLink>}
              {project.websiteLink && <PillLink href={project.websiteLink}>Visit website ↗</PillLink>}
            </div>
          )}
        </div>
      </FadeIn>

      {/* Hero shot */}
      <FadeIn delay={0.25} style={{ marginBottom: "48px" }}>
        {project.heroMedia ? (
          <div
            style={{
              position: "relative",
              borderRadius: "16px",
              overflow: "hidden",
              // Hero art is composed to its own proportions — forcing 16/9 on a
              // 2.2:1 image crops a fifth of it away. Videos have no manifest
              // entry and keep the old default.
              aspectRatio: heroAspect(project.heroMedia) ?? "16/9",
              background: color.hairline,
            }}
          >
            <MediaItem item={project.heroMedia} />
          </div>
        ) : (
          <ImagePlaceholder description="Hero shot: full product overview, best screen or key flow" aspect="16/9" span="full" />
        )}
      </FadeIn>

      {/* Title */}
      <FadeIn delay={0.3}>
        <h1
          style={{
            fontFamily: font.display,
            fontWeight: 800,
            fontSize: "clamp(32px, 5.5vw, 56px)",
            lineHeight: 1.12,
            letterSpacing: "-0.03em",
            maxWidth: "700px",
            marginBottom: "48px",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
          }}
        >
          {project.title}
        </h1>
      </FadeIn>

      {d.workstreams ? (
        <>
          {/* Platform intro: V1 -> V2 SaaS transition */}
          {d.platformIntro && (
            <FadeIn delay={0.35}>
              <div style={{ maxWidth: "640px", marginBottom: "0" }}>
                <p style={{ fontFamily: font.mono, fontSize: "11px", color: color.accent, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "12px" }}>
                  {d.platformIntro.eyebrow}
                </p>
                <h2 style={{ fontFamily: font.display, fontWeight: 800, fontSize: "clamp(24px, 3.5vw, 34px)", color: color.white, lineHeight: 1.15, marginBottom: "24px" }}>
                  {d.platformIntro.heading}
                </h2>
                <p style={bodyText}>{d.platformIntro.body}</p>
              </div>
              <StatCallout value={d.platformIntro.stat.value} label={d.platformIntro.stat.label} />
            </FadeIn>
          )}

          {/* Client spotlight */}
          {d.clientSpotlight && (
            <FadeIn delay={0.38}>
              <div style={{ border: `1px solid ${color.border}`, borderRadius: "16px", background: color.surface, padding: "48px", marginTop: "24px", marginBottom: "48px" }}>
                <h3 style={{ fontFamily: font.display, fontWeight: 700, fontSize: "20px", color: color.ink, marginBottom: "16px" }}>{d.clientSpotlight.heading}</h3>
                <p style={{ ...bodyText, maxWidth: "720px" }}>{d.clientSpotlight.body}</p>
                <StatRow stats={d.clientSpotlight.stats} />
              </div>
            </FadeIn>
          )}

          {/* Why This Mattered (business context) — unless it belongs inside a workstream */}
          {!d.businessContextWorkstreamId && d.businessContext && (
            <>
              <FadeIn delay={0.4}>
                <div style={{ maxWidth: "640px", marginBottom: "0" }}>
                  <p style={sectionLabel}>Why This Mattered</p>
                  <p style={bodyText}>{d.businessContext}</p>
                </div>
              </FadeIn>
              {d.businessContextStat && (
                <FadeIn delay={0.45} style={{ marginBottom: "32px" }}>
                  <StatCallout value={d.businessContextStat.value} label={d.businessContextStat.label} />
                </FadeIn>
              )}
            </>
          )}

          {/* Workstreams, collapsed by default: the deck is the map of the project */}
          <WorkstreamAccordion
            workstreams={d.workstreams}
            renderExpanded={(w, i) =>
              w.showcase ? (
                <>
                  <ShowcaseHero eyebrow={w.showcase.eyebrow} heading={w.showcase.heroHeading} emphasis={w.showcase.heroEmphasis} lede={w.showcase.lede} />
                  <WorkstreamShowcase
                    w={w}
                    leadIn={
                      d.businessContextWorkstreamId === w.id && d.businessContext && d.businessContextStat
                        ? { label: "Why This Mattered", text: d.businessContext, stat: d.businessContextStat }
                        : null
                    }
                  />
                </>
              ) : (
                <>
                  <h3 style={{ fontFamily: font.display, fontSize: "20px", fontWeight: 700, color: color.ink, marginTop: "32px", marginBottom: "0" }}>{w.heading}</h3>
                  <div style={{ maxWidth: "640px" }}>
                    <p style={wsLabel}>Problem</p>
                    <p style={wsBody}>{w.problem}</p>
                    <p style={wsLabel}>What I Designed</p>
                    <p style={wsBody}>{w.scope}</p>
                  </div>
                  <StatCallout value={w.stat.value} label={w.stat.label} />
                  <ImageGroup images={w.images} baseDelay={0.1 + i * 0.04} />
                  <div style={{ maxWidth: "640px" }}>
                    <p style={wsLabel}>Outcome</p>
                    <p style={{ ...wsBody, color: color.ink }}>{w.outcome}</p>
                  </div>
                </>
              )
            }
          />
        </>
      ) : (
        <SingleNarrative detail={d} />
      )}

      {/* Media */}
      <FadeIn delay={0.98}>
        <MediaCarousel media={project.media} />
      </FadeIn>
    </>
  );
}

/** Single-narrative case study (problem → constraint → decisions → outcome). */
function SingleNarrative({ detail: d }: { detail: ProjectDetail }) {
  if (d.showcase) {
    return (
      <>
        <ShowcaseHero eyebrow={d.showcase.eyebrow} heading={d.showcase.heroHeading} emphasis={d.showcase.heroEmphasis} lede={d.showcase.lede} />
        <SingleShowcase detail={d} />
      </>
    );
  }

  const decisions = d.decisions ?? [];
  const hasImages = Boolean(d.images);

  const decisionBlock = (index: number, marginBottom?: string) =>
    decisions[index] ? (
      <FadeIn delay={0.62 + index * 0.06}>
        <div style={{ borderTop: `1px solid ${color.border}`, paddingTop: "24px", paddingBottom: "24px", maxWidth: "640px", marginBottom }}>
          <h3 style={{ fontFamily: font.display, fontSize: "15px", fontWeight: 700, color: color.ink, margin: "0 0 12px 0" }}>{decisions[index].heading}</h3>
          <p style={{ fontFamily: font.serif, fontSize: "15px", lineHeight: 1.7, color: color.muted, margin: 0 }}>{decisions[index].body}</p>
        </div>
      </FadeIn>
    ) : null;

  return (
    <>
      {/* Problem */}
      <FadeIn delay={0.4}>
        <div style={{ maxWidth: "640px", marginBottom: d.stat ? "0" : "40px" }}>
          <p style={{ ...bodyText, marginBottom: "24px" }}>{d.problem}</p>
        </div>
      </FadeIn>

      {d.stat && (
        <FadeIn delay={0.42} style={{ marginBottom: "16px" }}>
          <StatCallout value={d.stat.value} label={d.stat.label} />
        </FadeIn>
      )}

      {!hasImages && (
        <FadeIn delay={0.45} style={{ marginBottom: "48px", maxWidth: "640px" }}>
          <ImagePlaceholder description="Context image: the environment or user this was designed for" aspect="3/2" />
        </FadeIn>
      )}

      {/* Constraint */}
      <FadeIn delay={0.5}>
        <div style={{ maxWidth: "640px", marginBottom: "48px" }}>
          <p style={sectionLabel}>The Constraint</p>
          <p style={bodyText}>{d.constraint}</p>
        </div>
      </FadeIn>

      {!hasImages && (
        <FadeIn delay={0.55} style={{ marginBottom: "48px" }}>
          <ImagePlaceholder description="Before state: what the product or flow looked like before your work" aspect="16/9" span="full" />
        </FadeIn>
      )}

      {/* Key Decisions */}
      <FadeIn delay={0.6}>
        <div style={{ marginBottom: "0" }}>
          <p style={sectionLabel}>Key Decisions</p>
        </div>
      </FadeIn>

      {decisionBlock(0)}

      {!hasImages && (
        <FadeIn delay={0.65} style={{ marginBottom: "16px", maxWidth: "640px" }}>
          <ImagePlaceholder description="Process artifact: sketch, whiteboard, wireframe, or early iteration" aspect="4/3" />
        </FadeIn>
      )}

      {decisionBlock(1)}

      {!hasImages && decisions.length >= 3 && (
        <FadeIn delay={0.72} style={{ marginBottom: "16px", maxWidth: "640px" }}>
          <ImagePlaceholder description="Mid-fidelity or prototype: showing direction before the final design" aspect="16/9" />
        </FadeIn>
      )}

      {decisionBlock(2, hasImages ? "0" : "56px")}

      {/* Images array — replaces the fixed placeholders above when present */}
      {hasImages && (
        <div style={{ marginTop: "32px" }}>
          <ImageGroup images={d.images} baseDelay={0.76} />
        </div>
      )}

      {!hasImages && (
        <FadeIn delay={0.78} style={{ marginBottom: "48px", maxWidth: "640px" }}>
          <ImagePlaceholder description="The pivot: what you changed and why, shown visually if possible" aspect="3/2" />
        </FadeIn>
      )}

      {/* What Did Not Work */}
      {d.honest && (
        <FadeIn delay={0.82}>
          <div style={{ maxWidth: "640px", marginBottom: "48px" }}>
            <p style={sectionLabel}>What Did Not Work</p>
            <div style={{ borderLeft: `2px solid ${color.borderStrong}`, paddingLeft: "24px" }}>
              <p style={bodyText}>{d.honest}</p>
            </div>
          </div>
        </FadeIn>
      )}

      {!hasImages && (
        <FadeIn delay={0.86} style={{ marginBottom: "48px" }}>
          <ImagePlaceholder description="Final design: the shipped screen or flow that solved the problem" aspect="16/9" span="full" />
        </FadeIn>
      )}

      {/* Outcome */}
      <FadeIn delay={0.9}>
        <div style={{ maxWidth: "640px", marginBottom: "48px" }}>
          <p style={sectionLabel}>Outcome</p>
          <p style={{ ...bodyText, color: color.ink }}>{d.outcome}</p>
        </div>
      </FadeIn>
    </>
  );
}
