import { color } from "../../styles/theme";
import type { ProjectImage } from "../../types";

type EmbeddedShowcaseProps = Pick<ProjectImage, "description" | "span"> & { src: string };

/** Full-height iframe embed (e.g. a live case-study page). */
export function EmbeddedShowcase({ src, description, span }: EmbeddedShowcaseProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "1100px",
        background: color.surface,
        border: `1px solid ${color.border}`,
        borderRadius: "16px",
        overflow: "hidden",
        maxWidth: span === "full" ? "none" : undefined,
      }}
    >
      <iframe
        src={src}
        title={description}
        loading="lazy"
        style={{ width: "100%", height: "100%", border: "none", display: "block" }}
      />
    </div>
  );
}
