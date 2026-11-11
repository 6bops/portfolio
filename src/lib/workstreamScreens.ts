import type { DeviceKind, ShowcaseSectionData, Workstream } from "../types";

/** A screenshot a workstream's case study already shows, with its own alt text. */
export type Screen = {
  src: string;
  alt: string;
  caption: string;
  device?: DeviceKind;
  /** Set on the before/after slide: both screens side by side instead of one. */
  pair?: { before: PairSide; after: PairSide };
};
export type PairSide = { src: string; alt: string; label: string };

/** A stable key for a screen in the viewer (the pair shares its `src` with the after screen). */
export const screenKey = (s: Screen) => (s.pair ? `pair:${s.src}` : s.src);

function sectionScreens(s: ShowcaseSectionData): Screen[] {
  const out: Screen[] = [];
  if ((s.layout === "single" || s.layout === "wideShot") && s.src) {
    out.push({ src: s.src, alt: s.alt ?? s.heading, caption: s.heading, device: s.device });
  }
  for (const c of s.columns ?? []) {
    if (c.src) {
      out.push({
        src: c.src,
        alt: c.alt ?? c.label ?? s.heading,
        caption: c.label ? `${c.label} · ${s.heading}` : s.heading,
        device: c.device,
      });
    }
  }
  return out;
}

/** Every screenshot in the workstream, in reading order, each once. */
export function screensOf(w: Workstream): Screen[] {
  const all = [
    ...(w.showcase?.sections ?? []).flatMap(sectionScreens),
    ...(w.images ?? []).flatMap((im) => (im.src ? [{ src: im.src, alt: im.description, caption: im.description }] : [])),
  ];
  const seen = new Set<string>();
  return all.filter((s) => (seen.has(s.src) ? false : (seen.add(s.src), true)));
}

/** The screen that represents a workstream: its chosen lead, else its first highlight, else its first screen. */
export function leadScreen(w: Workstream): Screen | undefined {
  const all = screensOf(w);
  const src = w.leadScreen ?? w.highlights?.[0];
  return all.find((s) => s.src === src) ?? all[0];
}

/**
 * The workstream's before/after as one slide, when both screens are ones its
 * case study already shows (so each keeps its own alt text). Undefined otherwise.
 */
export function beforeAfterScreen(w: Workstream): Screen | undefined {
  const ba = w.beforeAfter;
  if (!ba) return undefined;
  const all = screensOf(w);
  const before = all.find((s) => s.src === ba.before.src);
  const after = all.find((s) => s.src === ba.after.src);
  if (!before || !after) return undefined;
  return {
    src: after.src,
    alt: `${ba.before.label}. ${ba.after.label}.`,
    caption: ba.caption ?? "Before and after",
    device: after.device,
    pair: {
      before: { src: before.src, alt: before.alt, label: ba.before.label },
      after: { src: after.src, alt: after.alt, label: ba.after.label },
    },
  };
}

/** The before/after pair first (where set), then the lead screen, then the rest in reading order. */
export function viewerScreens(w: Workstream): Screen[] {
  const lead = leadScreen(w);
  const pair = beforeAfterScreen(w);
  const rest = lead ? [lead, ...screensOf(w).filter((s) => s.src !== lead.src)] : [];
  return pair ? [pair, ...rest] : rest;
}
