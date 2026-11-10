import { useId, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { Project } from "../../types";
import { caseStudyMailto } from "../../lib/contact";
import { trackEvent } from "../../lib/analytics";
import { sentences } from "../../lib/text";
import { leadScreen, screensOf } from "../../lib/workstreamScreens";
import { FadeIn, PillLink } from "../ui";
import { naturalSize, Shot } from "../ui/Shot";
import { GlanceRow } from "./GlanceRow";

/** The first sentence of the role line, the rest behind "More about my role". */
function RoleLine({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const [head, ...rest] = sentences(text);
  return (
    <p className="project-hero-role">
      {head}
      {rest.length > 0 && (
        <>
          {" "}
          <span id={id} hidden={!open}>
            {rest.join(" ")}{" "}
          </span>
          <button type="button" className="project-hero-more" aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)}>
            {open ? "Show less" : "More about my role"}
          </button>
        </>
      )}
    </p>
  );
}

/** One screen per product, linking to that product in the list below. */
function HeroStrip({ project }: { project: Project }) {
  const { search } = useLocation();
  const d = project.detail;
  const items = (d.heroStrip ?? []).flatMap((item) => {
    const w = d.workstreams?.find((x) => x.id === item.workstreamId);
    if (!w) return [];
    const screen = screensOf(w).find((s) => s.src === item.src) ?? leadScreen(w);
    return [{ ...item, w, alt: screen?.alt ?? "" }];
  });
  if (!items.length) return null;
  return (
    <ul className="project-hero-strip" aria-label="One screen from each product">
      {items.map(({ w, src, alt, kicker, caption }) => (
        <li key={src} className="project-hero-strip-item">
          <Link to={{ search, hash: w.id }} className="project-hero-strip-link">
            <span className="project-hero-strip-shot">
              <Shot src={src} alt={alt} />
            </span>
            <span className="project-hero-strip-caption">
              <span className="project-hero-strip-kicker">{kicker ?? w.navLabel}</span>
              {caption}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * Two-column project hero for projects that provide `heroMockup`: title, meta,
 * a two-sentence summary, the role line's first sentence and the contact
 * button beside a large product mockup (stacked below 1100px). Then the
 * figures, with their notes behind a "Sources" toggle, and a strip of screens.
 */
export function ProjectHero({ project }: { project: Project }) {
  const d = project.detail;
  const mockup = d.heroMockup!;
  const mailHref = caseStudyMailto(project.title);
  const intro = d.glance && !Array.isArray(d.glance) ? d.glance.intro : undefined;
  const dims = naturalSize(mockup.src);

  return (
    <>
      <section className="project-wide project-hero" aria-labelledby="project-title">
        <FadeIn delay={0.2} style={{ minWidth: 0 }}>
          <div className="project-hero-copy">
            <h1 id="project-title" className="project-hero-title">
              {project.title}
            </h1>
            <p className="project-meta-line">{[d.role, d.timeline, d.platform, d.status].join(" · ")}</p>
            {(d.heroSummary ?? d.outcomeLine) && <p className="project-hero-summary">{d.heroSummary ?? d.outcomeLine}</p>}
            {intro && <RoleLine text={intro} />}
            <div className="project-actions project-hero-actions">
              {project.ctaLink && <PillLink href={project.ctaLink}>{project.cta} ↗</PillLink>}
              {project.websiteLink && <PillLink href={project.websiteLink}>Visit website ↗</PillLink>}
              {/* Plain anchor rather than <PillLink>: its href branch forces
                  target="_blank", leaving a stray tab on a mailto. */}
              <a
                href={mailHref}
                className="pill-link pill-link--solid"
                onClick={() => trackEvent("contact_click", { href: mailHref, from_path: "case_study_top" })}
              >
                Email me about this project
              </a>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.3} style={{ minWidth: 0 }}>
          <figure className="project-hero-mockup" style={{ background: project.tint }}>
            <img src={mockup.src} alt={mockup.alt} width={dims?.width} height={dims?.height} decoding="async" />
          </figure>
        </FadeIn>
      </section>

      <FadeIn delay={0.35}>
        <div className="project-hero-figures">
          <GlanceRow glance={d.glance} hideIntro sourcesToggle />
        </div>
      </FadeIn>

      <HeroStrip project={project} />
    </>
  );
}
