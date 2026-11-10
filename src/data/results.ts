export type ResultCard = {
  id: "volume" | "revenue" | "funding" | "reach" | "systems";
  value: string;
  label: string;
};

/** Plain strings on purpose so they are trivial to edit. The row's caption and footnote (ResultsStage) frame these figures; the footnote says where most of volume and revenue comes from. */
export const RESULTS: ResultCard[] = [
  { id: "volume", value: "£25B+", label: "Transaction volume, solutions I built" },
  { id: "revenue", value: "£73M", label: "Yearly revenue from solutions I built" },
  { id: "funding", value: "3", label: "Products that went on to raise VC funding" },
  { id: "reach", value: "55M+", label: "Users across web and mobile" },
  { id: "systems", value: "10+", label: "Design systems, one for every project" },
];
