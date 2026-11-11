import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef, type CSSProperties, type MouseEvent, type ReactNode } from "react";

type MagneticProps = {
  children: ReactNode;
  /** Maximum pixels the content shifts toward the cursor. */
  strength?: number;
  style?: CSSProperties;
  className?: string;
};

/**
 * Wraps interactive content so it subtly pulls toward the cursor on hover and
 * springs back on leave. No-op on touch (no mousemove events fire there), so
 * no separate touch-device check is needed, and a no-op with reduced motion:
 * these position updates are imperative, so MotionConfig doesn't cover them.
 */
export function Magnetic({ children, strength = 10, style, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Measured once per hover rather than on every mousemove.
  const rect = useRef<DOMRect | null>(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  const handleEnter = () => {
    rect.current = ref.current?.getBoundingClientRect() ?? null;
  };

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = rect.current;
    if (!r || reduceMotion) return;
    x.set(((e.clientX - (r.left + r.width / 2)) / r.width) * strength);
    y.set(((e.clientY - (r.top + r.height / 2)) / r.height) * strength);
  };

  const handleLeave = () => {
    rect.current = null;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ display: "inline-block", x: springX, y: springY, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
