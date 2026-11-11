import type { CSSProperties, ReactNode } from "react";
import type { Project } from "../../types";

type DeviceFrameProps = {
  variant: "laptop" | "phone" | "tablet";
  children: ReactNode;
};

/**
 * A decorative, CSS-only device mockup drawn entirely inside the box it is given
 * (it fills its parent), so a framed item occupies exactly the layout box it would
 * unframed. The backdrop colour comes from `--device-tint`; see `tintStyle`.
 */
export function DeviceFrame({ variant, children }: DeviceFrameProps) {
  return (
    <div className={`device device--${variant}`} aria-hidden="true">
      <div className="device-screen">{children}</div>
    </div>
  );
}

/** Sets the per-project backdrop colour that `DeviceFrame` reads from `--device-tint`. */
export function tintStyle(project: Project): CSSProperties {
  return { "--device-tint": project.tint ?? "var(--color-hairline)" } as CSSProperties;
}
