import { motion, type Variants } from "framer-motion";
import type { CSSProperties, ElementType, ReactNode } from "react";

type StaggerGroupProps = {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  /** Seconds between each child's entrance. */
  stagger?: number;
  delay?: number;
  as?: ElementType;
};

/** Wraps a set of `StaggerItem`s and reveals them one after another as the group scrolls into view. */
export function StaggerGroup({ children, style, className, stagger = 0.08, delay = 0, as = "div" }: StaggerGroupProps) {
  const Tag = motion[as as "div"];
  const groupVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  return (
    <Tag
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      variants={groupVariants}
      style={style}
      className={className}
    >
      {children}
    </Tag>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

type StaggerItemProps = { children: ReactNode; style?: CSSProperties; className?: string; as?: ElementType };

/** A single cascading child of `StaggerGroup` — must be rendered inside one to receive its variants. */
export function StaggerItem({ children, style, className, as = "div" }: StaggerItemProps) {
  const Tag = motion[as as "div"];
  return (
    <Tag variants={itemVariants} style={style} className={className}>
      {children}
    </Tag>
  );
}
