import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  /** Direction the content travels in from as it enters. Defaults to "up". */
  direction?: Direction;
  distance?: number;
  style?: CSSProperties;
};

const AXIS: Record<Direction, { axis: "x" | "y"; sign: 1 | -1 }> = {
  up: { axis: "y", sign: 1 },
  down: { axis: "y", sign: -1 },
  left: { axis: "x", sign: 1 },
  right: { axis: "x", sign: -1 },
};

/**
 * Fades and slides its children in when they scroll into view. `direction`/`distance`
 * are opt-in — every existing call site keeps its original up-and-in motion.
 * `viewport.once` matches the old IntersectionObserver's fire-once behaviour; reduced
 * motion is handled globally by the `MotionConfig` wrapping the app in Layout.
 */
export function FadeIn({ children, delay = 0, direction = "up", distance = 30, style }: FadeInProps) {
  const { axis, sign } = AXIS[direction];
  const offset = { [axis]: sign * distance };

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}
