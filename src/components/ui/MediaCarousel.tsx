import type { Media } from "../../types";
import { MediaFrame } from "./MediaFrame";
import { useDragScroll } from "../../hooks/useDragScroll";

/**
 * A click-and-drag filmstrip: every media item sits at a fixed height with its own
 * real aspect ratio driving its width, so a 16:9 video reads as a wide "hero" card
 * and a portrait screenshot reads narrow, in one horizontally scrollable row —
 * no artificial hero/grid split needed.
 */
export function MediaCarousel({ media }: { media: Media[] }) {
  const drag = useDragScroll<HTMLDivElement>();
  if (!media || media.length === 0) return null;

  return (
    <div
      ref={drag.ref}
      className="media-scroll"
      onPointerDown={drag.onPointerDown}
      onPointerMove={drag.onPointerMove}
      onPointerUp={drag.onPointerUp}
      onPointerLeave={drag.onPointerLeave}
    >
      <div className="media-scroll-track">
        {media.map((item) => (
          <MediaFrame key={item.src} item={item} className="media-scroll-item" />
        ))}
      </div>
    </div>
  );
}
