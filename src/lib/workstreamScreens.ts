import type { DeviceKind, ShowcaseSectionData, Workstream } from "../types";

/** A screenshot a workstream's case study already shows, with its own alt text. */
export type Screen = { src: string; alt: string; caption: string; device?: DeviceKind };

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

/** Lead screen first, then the rest in reading order. */
export function viewerScreens(w: Workstream): Screen[] {
  const lead = leadScreen(w);
  return lead ? [lead, ...screensOf(w).filter((s) => s.src !== lead.src)] : [];
}
