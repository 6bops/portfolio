import { motion, useMotionValue, useSpring } from "framer-motion";
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
 * no separate touch-device check is needed.
 */
export function Magnetic({ children, strength = 10, style, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(((e.clientX - (rect.left + rect.width / 2)) / rect.width) * strength);
    y.set(((e.clientY - (rect.top + rect.height / 2)) / rect.height) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ display: "inline-block", x: springX, y: springY, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
