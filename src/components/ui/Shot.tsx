import type { CSSProperties } from "react";
import sizes from "../../data/imageSizes.json";

// JSON imports widen [w, h] to number[], so read it back as a plain lookup.
const manifest: Record<string, number[] | undefined> = sizes;

/** Intrinsic width in px, or undefined for anything not in the manifest. */
export function naturalWidth(src?: string): number | undefined {
  return src ? manifest[src]?.[0] : undefined;
}

/** Intrinsic `width / height` as a CSS aspect-ratio, or undefined if unknown. */
export function naturalAspect(src?: string): string | undefined {
  const d = src ? manifest[src] : undefined;
  return d ? `${d[0]} / ${d[1]}` : undefined;
}

/**
 * An <img> that carries its intrinsic width/height.
 *
 * Every screenshot here is lazy, and a lazy image with no dimensions reserves
 * no height until it decodes — so the page grows underneath the reader as they
 * scroll, and any scroll-to-section lands in the wrong place. Passing the real
 * dimensions lets the browser reserve the box up front. Sizes come from
 * scripts/image-manifest.mjs; re-run it after adding images.
 */
export function Shot({
  src,
  alt,
  style,
  className,
}: {
  src?: string;
  alt?: string;
  style?: CSSProperties;
  className?: string;
}) {
  const dims = src ? manifest[src] : undefined;
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      width={dims?.[0]}
      height={dims?.[1]}
      className={className}
      style={style}
    />
  );
}
