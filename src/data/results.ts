import { getProjectBySlug } from "./index";

export type ResultLink = { kind: "case-study"; slug: string } | { kind: "ask" };

export type ResultCard = {
  id: "volume" | "revenue" | "funding" | "systems";
  value: string;
  label: string;
  context: string;
  link: ResultLink;
};

/**
 * Proposed copy, not yet signed off by the site owner. Plain strings on purpose so
 * they are trivial to edit. A card moves from "ask" to "case-study" only once the
 * number is confirmed to come from that project.
 */
export const RESULTS: ResultCard[] = [
  {
    id: "volume",
    value: "£200m+",
    label: "Transaction volume in a single year",
    context: "on products I've designed",
    link: { kind: "ask" },
  },
  {
    id: "revenue",
    value: "£20m+",
    label: "Revenue generated",
    context: "by products I've designed",
    link: { kind: "ask" },
  },
  {
    id: "funding",
    value: "3+",
    label: "Products that went on to raise VC funding",
    context: "that I shipped",
    link: { kind: "ask" },
  },
  {
    id: "systems",
    value: "10+",
    label: "Design systems",
    context: "one for every project",
    link: { kind: "ask" },
  },
];

/** A case-study link only counts if the project exists and is publicly visible; anything else falls back to "ask". */
export function resolveResultLink(
  link: ResultLink,
): { kind: "ask" } | { kind: "case-study"; slug: string; to: string } {
  if (link.kind === "case-study") {
    const project = getProjectBySlug(link.slug);
    if (project && !project.previewOnly) {
      return { kind: "case-study", slug: link.slug, to: `/work/${link.slug}` };
    }
  }
  return { kind: "ask" };
}
