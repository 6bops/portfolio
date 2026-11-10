export type ResultCard = {
  id: "volume" | "revenue" | "funding" | "reach" | "systems";
  value: string;
  label: string;
};

/** Plain strings on purpose so they are trivial to edit. The row's caption and footnote (ResultsStage) frame these figures; the footnote cites the source of the volume figure. */
export const RESULTS: ResultCard[] = [
  { id: "volume", value: "£9.4B", label: "Corporate volume on FirstDirect 2.0" },
  { id: "revenue", value: "£73M", label: "Yearly revenue from solutions I built" },
  { id: "funding", value: "3", label: "Products that went on to raise VC funding" },
  { id: "reach", value: "55M+", label: "Users across web and mobile" },
  { id: "systems", value: "10+", label: "Design systems, one for every project" },
];
