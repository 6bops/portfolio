import { Link } from "react-router-dom";
import { color, font } from "../../styles/theme";
import { trackEvent } from "../../lib/analytics";
import { caseStudyMailto } from "../../lib/contact";
import { firstSentence } from "../../lib/text";
import { getNextProject, getProjectBySlug } from "../../data";
import { FadeIn } from "../ui";

export function NextProjectBlock({ slug }: { slug: string }) {
  const project = getProjectBySlug(slug);
  const next = getNextProject(slug);
  if (!project || !next) return null;

  const previewImage = (next.heroMedia?.type === "image" ? next.heroMedia : undefined) ?? next.media?.find((m) => m.type === "image");
  const href = caseStudyMailto(project.title);

  return (
    <FadeIn>
      <section className="next-project" aria-label="Next project">
        <Link
          to={`/work/${next.slug}`}
          className="next-project-card"
          onClick={() => trackEvent("next_project_click", { from: slug, to: next.slug })}
        >
          {previewImage && <img className="next-project-img" src={previewImage.src} alt="" loading="lazy" />}
          <div className="next-project-text">
            <p style={{ fontFamily: font.mono, fontSize: "11px", color: color.accent, letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 12px 0" }}>
              Next project →
            </p>
            <h2 style={{ fontFamily: font.display, fontWeight: 800, fontSize: "clamp(24px, 3.5vw, 34px)", lineHeight: 1.15, color: color.white, margin: "0 0 12px 0" }}>
              {next.title}
            </h2>
            <p style={{ fontFamily: font.serif, fontSize: "15px", lineHeight: 1.65, color: color.muted, margin: 0 }}>{firstSentence(next.description)}</p>
          </div>
        </Link>
        {/* Plain anchor rather than <PillLink>: it cannot set from_path, and its
            href branch forces target="_blank", leaving a stray tab on a mailto. */}
        <a
          href={href}
          className="pill-link pill-link--solid"
          onClick={() => trackEvent("contact_click", { href, from_path: "case_study_end" })}
        >
          Email me about this project
        </a>
      </section>
    </FadeIn>
  );
}
