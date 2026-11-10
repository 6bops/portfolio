import type { CSSProperties } from "react";
import type { PhoneFanMedia } from "../../types";
import { naturalSize } from "./Shot";

type PhoneFanProps = Pick<PhoneFanMedia, "screens" | "tint" | "label"> & {
  /** Hide the whole fan from assistive tech, when its container already names it (a canvas frame). */
  decorative?: boolean;
  className?: string;
  style?: CSSProperties;
};

const SLOTS = ["left", "centre", "right"] as const;

/**
 * Three phone mockups fanned out on a soft tinted backdrop: the centre phone larger and in front, the
 * two side phones smaller, tucked behind it and a little lower. It fills the box it is given (which
 * must have a definite size) and sizes everything from that box with container units, so the same
 * fan works in a 150px canvas frame and a 600px card. Placement is transforms only; images are lazy
 * and carry their intrinsic width/height. The group reads as one image (`label`); each screen's own
 * alt stays empty so it is not announced three more times.
 */
export function PhoneFan({ screens, tint, label, decorative = false, className, style }: PhoneFanProps) {
  const a11y = decorative ? { "aria-hidden": true as const } : { role: "img", "aria-label": label };
  return (
    <div
      className={["phone-fan", className].filter(Boolean).join(" ")}
      style={{ ...(tint ? { "--fan-tint": tint } : null), ...style } as CSSProperties}
      {...a11y}
    >
      {screens.map((s, i) => {
        const dims = naturalSize(s.src);
        return (
          <div key={s.src} className={`phone-fan-phone phone-fan-phone--${SLOTS[i]}`}>
            <div className="phone-fan-screen">
              <img
                src={s.src}
                alt=""
                width={dims?.width}
                height={dims?.height}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
