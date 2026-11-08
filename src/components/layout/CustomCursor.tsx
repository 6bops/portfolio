import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

// Components opt in with `data-cursor="hover"` / `data-cursor="drag"` instead of
// this file knowing their class names.
const INTERACTIVE_SELECTOR = "a, button, input, [role='button'], [data-cursor='hover']";
const DRAG_SELECTOR = "[data-cursor='drag']";

type Mode = "default" | "hover" | "drag";

/**
 * A small ring that follows the pointer: grows over interactive elements, and
 * turns into a labelled "DRAG" pill over horizontally scrollable filmstrips
 * (see MediaCarousel.tsx) — since the custom cursor replaces the native one
 * everywhere (global `cursor: none`), the native `grab` affordance there would
 * otherwise be invisible. Only mounts on fine-pointer, hover-capable devices
 * with no reduced-motion preference — everywhere else this renders nothing and
 * the native cursor is untouched. The native cursor is only hidden once the
 * first mouse movement gives the ring a position to show at.
 */
export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let started = false;
    let frame = 0;
    let lastTarget: HTMLElement | null = null;

    // Hit-testing with `closest` doesn't need to run per mouse event, only per frame.
    const updateMode = () => {
      frame = 0;
      const target = lastTarget;
      setMode(target?.closest(DRAG_SELECTOR) ? "drag" : target?.closest(INTERACTIVE_SELECTOR) ? "hover" : "default");
    };

    const move = (e: globalThis.MouseEvent) => {
      if (!started) {
        started = true;
        // Snap to the first real position so the ring doesn't sweep in from the corner.
        x.jump(e.clientX);
        y.jump(e.clientY);
        springX.jump(e.clientX);
        springY.jump(e.clientY);
        setEnabled(true);
        document.documentElement.classList.add("custom-cursor-active");
      }
      x.set(e.clientX);
      y.set(e.clientY);
      lastTarget = e.target as HTMLElement | null;
      if (!frame) frame = requestAnimationFrame(updateMode);
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("custom-cursor-active");
      setEnabled(false);
    };
  }, [reduceMotion, x, y, springX, springY]);

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
