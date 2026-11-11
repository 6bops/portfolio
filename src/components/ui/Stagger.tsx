import { motion, type Variants } from "framer-motion";
import { createContext, useCallback, useContext, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

type StaggerTag = "div" | "section" | "ul" | "li";

// Items beyond this position don't wait any longer, so a long list scrolled into
// view later doesn't sit invisible for seconds.
const MAX_STAGGER_STEPS = 5;

const StaggerContext = createContext({ stagger: 0.08, delay: 0 });

type StaggerGroupProps = {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  /** Seconds between each child's entrance. */
  stagger?: number;
  delay?: number;
  as?: StaggerTag;
};

/**
 * Wraps a set of `StaggerItem`s that cascade in one after another. Each item
 * reveals when it scrolls into view itself, so a tall list doesn't finish
 * animating before its lower rows are on screen.
 */
export function StaggerGroup({ children, style, className, stagger = 0.08, delay = 0, as: Tag = "div" }: StaggerGroupProps) {
  return (
    <StaggerContext.Provider value={{ stagger, delay }}>
      <Tag style={style} className={className}>
        {children}
      </Tag>
    </StaggerContext.Provider>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] } }),
};

const MOTION_TAGS = { div: motion.div, section: motion.section, ul: motion.ul, li: motion.li } as const;

type StaggerItemProps = { children: ReactNode; style?: CSSProperties; className?: string; as?: StaggerTag };

/** A single cascading child of `StaggerGroup`; its delay follows its position among its siblings. */
export function StaggerItem({ children, style, className, as = "div" }: StaggerItemProps) {
  const { stagger, delay } = useContext(StaggerContext);
  const [position, setPosition] = useState(0);
  const Tag = MOTION_TAGS[as];

  const ref = useCallback((el: HTMLElement | null) => {
    if (el?.parentElement) setPosition(Array.prototype.indexOf.call(el.parentElement.children, el));
  }, []);

  return (
    <Tag
      ref={ref as never}
      variants={itemVariants}
      custom={delay + Math.min(position, MAX_STAGGER_STEPS) * stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      style={style}
      className={className}
    >
      {children}
    </Tag>
  );
}
