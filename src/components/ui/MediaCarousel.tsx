import type React from "react";
import { color } from "../../styles/theme";
import type { Media } from "../../types";
import { MediaItem } from "./MediaItem";
import { naturalAspect } from "./Shot";

/** One large hero media item with up to two smaller items beneath it. */
export function MediaCarousel({ media }: { media: Media[] }) {
  if (!media || media.length === 0) return null;
  const top = media[0];
  const bottom = media.slice(1, 3);

  // A still preview keeps its own proportions so nothing is cropped away. Videos
  // aren't in the size manifest and stay on the 16/9 default.
  const topAspect = (top.type === "image" && naturalAspect(top.src)) || "16/9";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div
        style={{
          position: "relative",
          borderRadius: "16px",
          overflow: "hidden",
          aspectRatio: topAspect,
          background: color.hairline,
        }}
      >
        <MediaItem item={top} />
      </div>
      {bottom.length > 0 && (
        <div className={`media-carousel-row${bottom.length === 1 ? " media-carousel-row--single" : ""}`}>
          {bottom.map((item, i) => (
            <div
              key={i}
              className="media-carousel-cell"
              // Mobile stacks these full-width; the natural ratio keeps landscape
              // shots from being cropped into a portrait box.
              style={
                {
                  "--cell-aspect": (item.type === "image" && naturalAspect(item.src)) || "4 / 5",
                } as React.CSSProperties
              }
            >
              <MediaItem item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
