import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { trackEvent } from "../../lib/analytics";
import { firstSentence } from "../../lib/text";
import { projectSite } from "../../lib/projectSite";
import type { Project } from "../../types";
import { ImagePlaceholder, MediaFrame, tintStyle } from "../ui";

type WorkCardProps = {
  project: Project;
  index: number;
};

/** Compact grid card for the project and exploration tiers. Links to its page unless `previewOnly`; a preview-only project with a website links there, in a new tab. */
export function WorkCard({ project, index }: WorkCardProps) {
  const preview = project.heroMedia ?? project.media[0];
  const linked = !project.previewOnly;
  // A preview-only project has no page, but its own website (when it has one) opens in a new tab.
  const site = project.previewOnly ? projectSite(project) : undefined;
  const meta = [project.domain, project.company].filter(Boolean).join(" · ");
  const facts = [project.detail.platform, project.detail.status, project.year].filter(Boolean).join(" · ");

  const body = (
    <>
      <div className="work-card-preview">
        {preview ? (
          <MediaFrame item={preview} style={{ position: "absolute", inset: 0, aspectRatio: "auto" }} />
        ) : (
          <ImagePlaceholder description="Preview coming soon" aspect="4/3" span="full" />
        )}
      </div>
      <div className="work-card-body">
        <div className="work-card-title-row">
          <h3 className="work-card-title">{project.title}</h3>
          {site && (
            <span className="work-card-ext" aria-hidden="true">
              ↗
            </span>
          )}
          {project.tier === "exploration" && <span className="work-card-badge">Exploration</span>}
        </div>
        {meta && <p className="work-card-meta">{meta}</p>}
        <p className="work-card-meta">{facts}</p>
        {project.description && <p className="work-card-desc">{firstSentence(project.description)}</p>}
      </div>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={tintStyle(project)}
    >
      {linked ? (
        <Link
          to={`/work/${project.slug}`}
          className="work-card work-card--link"
          onClick={() => trackEvent("work_entry_click", { id: project.slug, destination: "case_study" })}
        >
          {body}
        </Link>
      ) : site ? (
        <a
          href={site}
          target="_blank"
          rel="noopener noreferrer"
          className="work-card work-card--link"
          onClick={() => trackEvent("work_entry_click", { id: project.slug, destination: "external_site" })}
        >
          {body}
          <span className="visually-hidden">Visit site (opens in a new tab)</span>
        </a>
      ) : (
        <div className="work-card">{body}</div>
      )}
    </motion.div>
  );
}
