/** Shared data-model types for the portfolio content. */

export type Media = { type: "video" | "image"; src: string };

export type Stat = { value: string; label: string };

/** Registered interactive component keys (see components/project/interactive). */
export type InteractiveKey = "dataLibrary" | "partnershipBeforeFlow";

export type ProjectImage = {
  description: string;
  aspect?: string;
  /** "full" makes the image span the content width. */
  span?: "full";
  src?: string;
  embed?: string;
  interactive?: InteractiveKey;
};

export type ShowcaseColumnData = {
  label?: string;
  type?: "mock" | "shot";
  title?: string;
  badge?: string;
  rows?: string[];
  caption?: string;
  src?: string;
  alt?: string;
};

export type ShowcaseCard = {
  specialty: string;
  name: string;
  src: string;
  alt: string;
  builtBy: string;
};

export type ShowcaseSectionData = {
  heading: string;
  tag: string;
  note?: string;
  bodyText?: string;
  layout: "compare" | "flow" | "threeCol" | "proofWall" | "single";
  columns?: ShowcaseColumnData[];
  cards?: ShowcaseCard[];
  // "single" layout
  src?: string;
  alt?: string;
  maxWidth?: string;
  center?: boolean;
};

export type Showcase = {
  eyebrow: string;
  heroHeading: string;
  heroEmphasis?: string;
  lede: string;
  stats: Stat[];
  sections: ShowcaseSectionData[];
  footerStats: Stat[];
};

export type Workstream = {
  id: string;
  navLabel: string;
  heading: string;
  problem: string;
  scope: string;
  stat: Stat;
  outcome: string;
  showcase?: Showcase;
  screens?: { leftLabel: string; rightLabel: string };
  images?: ProjectImage[];
};

export type Decision = { heading: string; body: string };

export type ProjectDetail = {
  role: string;
  timeline: string;
  platform: string;
  status: string;
  platformIntro?: {
    eyebrow: string;
    heading: string;
    body: string;
    stat: Stat;
  };
  clientSpotlight?: { heading: string; body: string; stats: Stat[] };
  businessContext?: string;
  businessContextStat?: Stat;
  businessContextWorkstreamId?: string;
  caseStudyLink?: string;
  workstreams?: Workstream[];
  // Single-narrative case studies
  problem?: string;
  constraint?: string;
  decisions?: Decision[];
  honest?: string;
  outcome?: string;
  stat?: Stat;
  images?: ProjectImage[];
};

export type Project = {
  slug: string;
  featured: boolean;
  title: string;
  year: string;
  description: string;
  cta?: string;
  ctaLink?: string;
  websiteLink?: string;
  media: Media[];
  heroArt?: "indigo";
  heroMedia?: Media;
  detail: ProjectDetail;
};

export type Experience = {
  company: string;
  role: string;
  description: string;
  years: string;
};

export type TalkOrWriting = {
  title: string;
  type: "Video" | "Article";
  href: string;
  icon: string;
};

export type Startup = {
  name: string;
  tagline: string;
  description: string;
  href: string;
  status: "Beta" | "Coming Soon";
};
