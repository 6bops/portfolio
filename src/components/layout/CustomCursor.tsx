import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const INTERACTIVE_SELECTOR = "a, button, input, [role='button'], .ws-card";
const DRAG_SELECTOR = ".media-scroll";

type Mode = "default" | "hover" | "drag";

/**
 * A small ring that follows the pointer: grows over interactive elements, and
 * turns into a labelled "DRAG" pill over horizontally scrollable filmstrips
 * (see MediaCarousel.tsx) — since the custom cursor replaces the native one
 * everywhere (global `cursor: none`), the native `grab` affordance there would
 * otherwise be invisible. Only mounts on fine-pointer, hover-capable devices
 * with no reduced-motion preference — everywhere else this renders nothing and
 * the native cursor is untouched.
 */
export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    const move = (e: globalThis.MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement;
      setMode(target.closest?.(DRAG_SELECTOR) ? "drag" : target.closest?.(INTERACTIVE_SELECTOR) ? "hover" : "default");
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [reduceMotion, x, y]);

  if (!enabled) return null;

  const size = mode === "drag" ? { width: 64, height: 32 } : mode === "hover" ? { width: 44, height: 44 } : { width: 10, height: 10 };

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        ...size,
        borderRadius: "100px",
        border: "1px solid var(--color-white)",
        background: mode === "default" ? "var(--color-white)" : "var(--hover-tint)",
        pointerEvents: "none",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'DM Mono', monospace",
        fontSize: "10px",
        letterSpacing: "0.08em",
        color: "var(--color-white)",
        translate: "-50% -50%",
        x: springX,
        y: springY,
        transition: "width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), background 0.25s ease",
      }}
    >
      {mode === "drag" ? "DRAG" : null}
    </motion.div>
  );
}
