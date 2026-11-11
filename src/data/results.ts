export type ResultCard = {
  id: "volume" | "revenue" | "funding" | "visits";
  value: string;
  label: string;
};

/** Plain strings on purpose so they are trivial to edit. Both the volume and revenue figures are First HoldCo's published numbers (FY 2025 & Q1 2026 results presentation), not personal claims; the footnote in ResultsStage cites the source and the naira-to-pound rate. */
export const RESULTS: ResultCard[] = [
  { id: "volume", value: "£9.4B", label: "Corporate volume on FirstDirect 2.0" },
  { id: "revenue", value: "£41M", label: "First Bank e-banking revenue, 2025" },
  { id: "funding", value: "3", label: "Products that went on to raise VC funding" },
  { id: "visits", value: "5M+", label: "Appointment visits logged on IndigoEMR" },
];
