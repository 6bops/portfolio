import { useState } from "react";
import type { CSSProperties } from "react";
import { color } from "../../styles/theme";
import type { Media, MediaFile } from "../../types";
import { DeviceFrame } from "./DeviceFrame";
import { MediaItem } from "./MediaItem";
import { PhoneFan } from "./PhoneFan";
import { naturalAspect } from "./Shot";

type MediaFrameProps = {
  item: Media;
  className?: string;
  style?: CSSProperties;
};

/** A stable React key for a media item: its file, or for a phone fan its centre screen. */
export function mediaKey(item: Media): string {
  return item.type === "phoneFan" ? `fan:${item.screens[1].src}` : item.src;
}

/** A phone fan has no single file; it gets a 4:3 stage, like the work cards' preview box. */
const FAN_ASPECT = "4 / 3";

/**
 * A media box sized to the item's real aspect ratio — known immediately for images
 * (from the size manifest), detected on load for videos. Without this, every video
 * defaulted to 16:9 regardless of its actual footage, so a portrait phone-screen
 * recording got force-cropped into a landscape box by `object-fit: cover`.
 */
export function MediaFrame({ item, className, style }: MediaFrameProps) {
  if (item.type === "phoneFan") {
    return (
      <div className={className} style={{ position: "relative", aspectRatio: FAN_ASPECT, background: color.hairline, ...style }}>
        <PhoneFan screens={item.screens} tint={item.tint} label={item.label} />
      </div>
    );
  }
  return <FileFrame item={item} className={className} style={style} />;
}

function FileFrame({ item, className, style }: MediaFrameProps & { item: MediaFile }) {
  const [videoAspect, setVideoAspect] = useState<string | null>(null);
  const aspect = item.type === "image" ? naturalAspect(item.src) ?? "16 / 9" : videoAspect ?? "16 / 9";

  const media = (
    <MediaItem
      item={item}
      style={item.frame ? { objectFit: "contain" } : undefined}
      onLoadedMetadata={(e) => {
        const v = e.currentTarget;
        if (v.videoWidth && v.videoHeight) setVideoAspect(`${v.videoWidth} / ${v.videoHeight}`);
      }}
    />
  );

  return (
    <div className={className} style={{ position: "relative", aspectRatio: aspect, background: color.hairline, ...style }}>
      {item.frame ? <DeviceFrame variant={item.frame}>{media}</DeviceFrame> : media}
    </div>
  );
}
