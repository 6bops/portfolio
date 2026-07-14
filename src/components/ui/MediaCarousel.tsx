import type { Media } from "../../types";
import { MediaItem } from "./MediaItem";

/** One large hero media item with up to two smaller items beneath it. */
export function MediaCarousel({ media }: { media: Media[] }) {
  if (!media || media.length === 0) return null;
  const top = media[0];
  const bottom = media.slice(1, 3);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div
        style={{
          position: "relative",
          borderRadius: "16px",
          overflow: "hidden",
          aspectRatio: "16/9",
          background: "#1a1a1a",
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
                background: "#1a1a1a",
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
