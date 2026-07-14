import { FadeIn, ImagePlaceholder } from "../ui";
import type { ProjectImage } from "../../types";

/**
 * Lays out a list of images: "full" images span the width, while consecutive
 * non-full images pair up two-per-row. Everything fades in on scroll.
 */
export function ImageGroup({ images, baseDelay = 0 }: { images?: ProjectImage[]; baseDelay?: number }) {
  if (!images || images.length === 0) return null;

  const blocks: React.ReactNode[] = [];
  let i = 0;
  let delay = baseDelay;

  while (i < images.length) {
    const img = images[i];
    const next = images[i + 1];

    if (img.span === "full") {
      blocks.push(
        <FadeIn key={i} delay={delay} style={{ marginBottom: "32px" }}>
          <ImagePlaceholder {...img} span="full" />
        </FadeIn>,
      );
      i += 1;
    } else if (next && next.span !== "full") {
      blocks.push(
        <FadeIn key={i} delay={delay} style={{ marginBottom: "32px" }}>
          <div className="workstream-screens">
            <ImagePlaceholder {...img} />
            <ImagePlaceholder {...next} />
          </div>
        </FadeIn>,
      );
      i += 2;
    } else {
      blocks.push(
        <FadeIn key={i} delay={delay} style={{ marginBottom: "32px", maxWidth: "640px" }}>
          <ImagePlaceholder {...img} />
        </FadeIn>,
      );
      i += 1;
    }
    delay += 0.04;
  }

  return <>{blocks}</>;
}
