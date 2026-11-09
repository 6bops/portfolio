export type ResultCard = {
  id: "volume" | "revenue" | "funding" | "reach" | "systems";
  value: string;
  label: string;
  context: string;
};

/** Plain strings on purpose so they are trivial to edit. Each claim is worded as what was designed or shipped, never as sole credit. */
export const RESULTS: ResultCard[] = [
  {
    id: "volume",
    value: "£200m+",
    label: "Transaction volume in a single year",
    context: "on products I've designed",
  },
  {
    id: "revenue",
    value: "£20m+",
    label: "Revenue generated",
    context: "by products I've designed",
  },
  {
    id: "funding",
    value: "3+",
    label: "Products that went on to raise VC funding",
    context: "that I shipped",
  },
  {
    id: "reach",
    value: "2M+",
    label: "People who've used what I built",
    context: "across products I've shipped",
  },
  {
    id: "systems",
    value: "10+",
    label: "Design systems",
    context: "one for every project",
  },
];
