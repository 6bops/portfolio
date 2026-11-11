import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { trackEvent } from "../../lib/analytics";
import { color, font } from "../../styles/theme";
import type { Project } from "../../types";
import { MediaCarousel, PinnedMediaCarousel, PillLink, ImagePlaceholder, tintStyle } from "../ui";

type ProjectCardProps = {
  project: Project;
  index: number;
  /** Home's featured cards get the full-viewport scroll-pinned carousel instead of the plain drag filmstrip. */
  pinnedMedia?: boolean;
};

/** A single project entry on the Home and Work listings. Links to its detail route. */
export function ProjectCard({ project, index, pinnedMedia = false }: ProjectCardProps) {
  const { pathname } = useLocation();
  const hasMedia = Boolean(project.media && project.media.length > 0);
  const detailPath = `/work/${project.slug}`;
  const trackOpen = (placement: "header" | "end_tile") =>
    trackEvent("project_card_click", { project: project.slug, position: index + 1, from_path: pathname, placement });

  const titleStyle = {
    fontFamily: font.display,
    fontSize: "20px",
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: color.ink,
    margin: 0,
  } as const;

  const classicHeader = (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "12px" }}>
        <h3 style={titleStyle}>{project.title}</h3>
      </div>
      <p style={{ fontFamily: font.serif, fontSize: "17px", lineHeight: 1.65, color: color.body, margin: "0 0 20px 0", maxWidth: "640px" }}>
        {project.description}
      </p>
      {!project.previewOnly && (
        <PillLink
          to={detailPath}
          style={{ marginBottom: "24px" }}
          onClick={() => trackOpen("header")}
        >
          View project
        </PillLink>
      )}
    </>
  );

  /** Inside the pinned stage the text sits beside the project link so both stay in view with the previews. */
  const pinnedHeader = (
    <div className="pinned-media-header">
      <div className="pinned-media-header-text">
        <h3 style={{ ...titleStyle, marginBottom: "10px" }}>{project.title}</h3>
        <p
          className="pinned-media-desc"
          style={{ fontFamily: font.serif, fontSize: "16px", lineHeight: 1.6, color: color.body, margin: 0 }}
        >
          {project.description}
        </p>
      </div>
      {!project.previewOnly && (
        <PillLink to={detailPath} onClick={() => trackOpen("header")}>
          View project
        </PillLink>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ marginBottom: "96px", ...tintStyle(project) }}
    >
      {!(pinnedMedia && hasMedia) && classicHeader}
      {project.media && project.media.length > 0 ? (
        pinnedMedia ? (
          <PinnedMediaCarousel
            media={project.media}
            header={(pinned) => (pinned ? pinnedHeader : classicHeader)}
            endCta={
              project.previewOnly
                ? undefined
                : { to: detailPath, title: project.title, label: "View project", onClick: () => trackOpen("end_tile") }
            }
          />
        ) : (
          <MediaCarousel media={project.media} />
        )
      ) : (
        <ImagePlaceholder description="Project preview: screens and assets coming soon" aspect="16/9" span="full" />
      )}
    </motion.div>
  );
}
