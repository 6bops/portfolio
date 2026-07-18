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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: bottom.length === 1 ? "1fr" : "1fr 1fr",
            gap: "12px",
          }}
        >
          {bottom.map((item, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                borderRadius: "16px",
                overflow: "hidden",
                height: "500px",
                background: color.hairline,
              }}
            >
              <MediaItem item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
