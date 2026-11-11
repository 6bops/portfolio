import { PROJECTS } from "./projects";
import type { Project } from "../types";

/** Homepage-only ordering for the featured cards — independent of the Work page's array order. */
export const FEATURED_ORDER = ["indigoemr", "first-bank-nigeria", "sharply-africa"];

/** A featured project missing from FEATURED_ORDER goes last, not first (`indexOf` would give -1). */
export const featuredRank = (slug: string) => {
  const i = FEATURED_ORDER.indexOf(slug);
  return i === -1 ? FEATURED_ORDER.length : i;
};

/**
 * The case study to read after `slug`: the next one in FEATURED_ORDER, wrapping
 * around. previewOnly projects have no case study page, so they are skipped.
 */
export const getNextProject = (slug: string): Project | undefined => {
  const from = FEATURED_ORDER.indexOf(slug);
  if (from === -1) return undefined;
  for (let step = 1; step < FEATURED_ORDER.length; step++) {
    const nextSlug = FEATURED_ORDER[(from + step) % FEATURED_ORDER.length];
    const next = PROJECTS.find((p) => p.slug === nextSlug);
    if (next && !next.previewOnly) return next;
  }
  return undefined;
};
