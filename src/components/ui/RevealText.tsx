import { motion, type Variants } from "framer-motion";
import type { CSSProperties } from "react";

type RevealTextProps = {
  text: string;
  style?: CSSProperties;
  /** Seconds before the first word starts. */
  delay?: number;
  /** Seconds between each word. */
  stagger?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
};

const word: Variants = {
  hidden: { opacity: 0, y: "0.5em" },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

/** Reveals a line of text one word at a time as it scrolls into view — for standalone headlines/statements. */
export function RevealText({ text, style, delay = 0, stagger = 0.05, as = "span" }: RevealTextProps) {
  const words = text.split(" ");
  const Tag = motion[as];
  const groupVariants: Variants = { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } };

  return (
    <Tag initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -80px 0px" }} variants={groupVariants} style={style}>
      {words.map((w, i) => (
        <span key={i}>
          <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
            <motion.span variants={word} style={{ display: "inline-block" }}>
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
