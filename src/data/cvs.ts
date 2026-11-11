export type CvVariant = {
  id: string;
  /** What the visitor sees in the menu. */
  label: string;
  /** One short line on who this version is for. */
  note: string;
  /** Path under /public. */
  file: string;
};

/** The CV versions a visitor can pick from. Layor decides which files are public, so the list is plain data. */
export const CV_VARIANTS: CvVariant[] = [
  {
    id: "senior-product-designer",
    label: "Senior Product Designer",
    note: "The general version",
    file: "/cv/Mubarak-Salami-CV-Senior-Product-Designer.pdf",
  },
  {
    id: "senior-product-designer-b2b",
    label: "Senior Product Designer, B2B",
    note: "Business software and platforms",
    file: "/cv/Mubarak-Salami-CV-Senior-Product-Designer-B2B.pdf",
  },
  {
    id: "senior-product-designer-operational",
    label: "Senior Product Designer, operational products",
    note: "Workflow-heavy and regulated products",
    file: "/cv/Mubarak-Salami-CV-Senior-Product-Designer-Operational.pdf",
  },
  {
    id: "product-designer-consumer-mobile",
    label: "Product Designer, consumer mobile",
    note: "Consumer and native mobile apps",
    file: "/cv/Mubarak-Salami-CV-Product-Designer-Consumer-Mobile.pdf",
  },
  {
    id: "product-designer-ai-services",
    label: "Product Designer, AI services",
    note: "AI-powered products and building with AI",
    file: "/cv/Mubarak-Salami-CV-Product-Designer-AI-Services.pdf",
  },
];
