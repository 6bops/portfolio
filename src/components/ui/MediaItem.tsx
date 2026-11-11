import type { CSSProperties, SyntheticEvent } from "react";
import type { MediaFile } from "../../types";

const fill: CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center center",
  display: "block",
  userSelect: "none",
};

type MediaItemProps = {
  item: MediaFile;
  style?: CSSProperties;
  /** Fires once a video's real dimensions are known — lets a parent size the frame to the video's own aspect ratio. */
  onLoadedMetadata?: (e: SyntheticEvent<HTMLVideoElement>) => void;
};

/** Renders a video (autoplaying, looping, muted) or an image, absolutely filling its parent. */
export function MediaItem({ item, style = {}, onLoadedMetadata }: MediaItemProps) {
  return item.type === "video" ? (
    <video
      src={item.src}
      autoPlay
      loop
      muted
      playsInline
      draggable={false}
      onLoadedMetadata={onLoadedMetadata}
      style={{ ...fill, ...style }}
    />
  ) : (
    <img src={item.src} alt="" loading="lazy" draggable={false} style={{ ...fill, ...style }} />
  );
}
