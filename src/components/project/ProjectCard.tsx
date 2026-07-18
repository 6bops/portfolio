import { useEffect, useRef, useState } from "react";
import { color, font } from "../../styles/theme";
import type { Project } from "../../types";
import { MediaCarousel, PillLink, ImagePlaceholder } from "../ui";

/** A single project entry on the Home and Work listings. Links to its detail route. */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${index * 0.08}s, transform 0.7s ease ${index * 0.08}s`,
        marginBottom: "96px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "12px" }}>
        <h3
          style={{
            fontFamily: font.display,
            fontSize: "20px",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: color.ink,
            margin: 0,
          }}
        >
          {project.title}
        </h3>
      </div>
      <p style={{ fontFamily: font.serif, fontSize: "17px", lineHeight: 1.65, color: color.body, margin: "0 0 20px 0", maxWidth: "640px" }}>
        {project.description}
      </p>
      {!project.previewOnly && (
        <PillLink to={`/work/${project.slug}`} style={{ marginBottom: "24px" }}>
          View project
        </PillLink>
      )}
      {project.media && project.media.length > 0 ? (
        <MediaCarousel media={project.media} />
      ) : (
        <ImagePlaceholder description="Project preview: screens and assets coming soon" aspect="16/9" span="full" />
      )}
    </div>
  );
}
