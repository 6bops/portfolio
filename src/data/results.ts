export type ResultCard = {
  id: "volume" | "revenue" | "funding" | "reach" | "systems";
  value: string;
  label: string;
};

/** Plain strings on purpose so they are trivial to edit. The row's caption (ResultsStage) says these are outcomes of products Layor designed and shipped, so no card repeats it. */
export const RESULTS: ResultCard[] = [
  { id: "volume", value: "£200m+", label: "Transaction volume in a single year" },
  { id: "revenue", value: "£20m+", label: "Revenue generated" },
  { id: "funding", value: "3", label: "Products that went on to raise VC funding" },
  { id: "reach", value: "55M+", label: "Users across web and mobile" },
  { id: "systems", value: "10+", label: "Design systems, one for every project" },
];
