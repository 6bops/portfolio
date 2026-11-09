export type ResultCard = {
  id: "volume" | "revenue" | "funding" | "shipped" | "systems";
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
    id: "shipped",
    value: "30+",
    label: "Products shipped",
    context: "across healthcare, banking, and logistics",
  },
  {
    id: "systems",
    value: "10+",
    label: "Design systems",
    context: "one for every project",
  },
];
