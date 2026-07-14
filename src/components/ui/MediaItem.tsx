import type { CSSProperties } from "react";
import type { Media } from "../../types";

const fill: CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center center",
  display: "block",
};

/** Renders a video (autoplaying, looping, muted) or an image, absolutely filling its parent. */
export function MediaItem({ item, style = {} }: { item: Media; style?: CSSProperties }) {
  return item.type === "video" ? (
    <video src={item.src} autoPlay loop muted playsInline style={{ ...fill, ...style }} />
  ) : (
    <img src={item.src} alt="" loading="lazy" style={{ ...fill, ...style }} />
  );
}
