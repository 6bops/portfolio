import { font } from "../../styles/theme";
import type { ProjectImage } from "../../types";
import { INTERACTIVE_COMPONENTS } from "../project/interactive";
import { EmbeddedShowcase } from "./EmbeddedShowcase";

type ImagePlaceholderProps = ProjectImage;

/**
 * Renders, in priority order: a registered interactive component, an iframe embed,
 * a real image, or a labelled placeholder box for shots not yet supplied.
 */
export function ImagePlaceholder({
  description,
  aspect = "16/9",
  span,
  src,
  embed,
  interactive,
}: ImagePlaceholderProps) {
  if (interactive && INTERACTIVE_COMPONENTS[interactive]) {
    const Interactive = INTERACTIVE_COMPONENTS[interactive];
    return <Interactive span={span} />;
  }

  if (embed) {
    return <EmbeddedShowcase src={embed} description={description} span={span} />;
  }

  const boxBase = {
    width: "100%",
    aspectRatio: aspect,
    background: "#141414",
    border: "1px solid #1f1f1f",
    borderRadius: "16px",
    overflow: "hidden",
    maxWidth: span === "full" ? ("none" as const) : undefined,
  };

  if (src) {
    return (
      <div style={boxBase}>
        <img
          src={src}
          alt={description}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        ...boxBase,
        overflow: "visible",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
      }}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="30" height="30" stroke="#2a2a2a" strokeWidth="1.5" />
        <line x1="1" y1="1" x2="31" y2="31" stroke="#2a2a2a" strokeWidth="1.5" />
        <line x1="31" y1="1" x2="1" y2="31" stroke="#2a2a2a" strokeWidth="1.5" />
      </svg>
      <p
        style={{
          fontFamily: font.mono,
          fontSize: "12px",
          color: "#444",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          textAlign: "center",
          maxWidth: "280px",
          margin: 0,
        }}
      >
        {description}
      </p>
    </div>
  );
}
