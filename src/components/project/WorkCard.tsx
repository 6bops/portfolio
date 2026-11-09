import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { trackEvent } from "../../lib/analytics";
import { firstSentence } from "../../lib/text";
import type { Project } from "../../types";
import { ImagePlaceholder, MediaFrame, tintStyle } from "../ui";

type WorkCardProps = {
  project: Project;
  index: number;
};

/** Compact grid card for the project and exploration tiers. Links to its page unless `previewOnly`. */
export function WorkCard({ project, index }: WorkCardProps) {
  const preview = project.heroMedia ?? project.media[0];
  const linked = !project.previewOnly;
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
      ) : (
        <div className="work-card">{body}</div>
      )}
    </motion.div>
  );
}
