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

/** Hardware bezel to seat a screenshot in, so it reads at life scale. */
export type DeviceKind = "phone" | "tablet" | "browser" | "modal";

export type ShowcaseColumnData = {
  label?: string;
  type?: "mock" | "shot";
  title?: string;
  badge?: string;
  rows?: string[];
  caption?: string;
  src?: string;
  alt?: string;
  device?: DeviceKind;
  /** Aspect ratio to crop a full-page browser capture back to, e.g. "1512 / 985". */
  cropTo?: string;
};

export type ShowcaseCard = {
  specialty: string;
  name: string;
  src: string;
  alt: string;
  builtBy: string;
};

/**
 * Whether an artifact is grounded in a real document/screenshot/direct account
 * ("sourced"), or inferred from general recollection ("reconstructed"). Rendered
 * as a visible badge — the distinction is deliberately never blurred in copy.
 */
export type Sourcing = "sourced" | "reconstructed";

/** A node in a linear decision trail or process flow. */
export type ProcessStep = {
  title: string;
  detail?: string;
  /** "decision" marks a branch/vote; "outcome" marks what shipped. */
  kind?: "step" | "decision" | "outcome";
  /** An off-path checkpoint hanging off this step. */
  checkpoint?: string;
};

export type ShowcaseSectionData = {
  heading: string;
  tag: string;
  note?: string;
  bodyText?: string;
  layout:
    | "compare"
    | "flow"
    | "threeCol"
    | "proofWall"
    | "single"
    | "wideShot"
    | "themedShot"
    | "steps";
  /** Provenance badge for process artifacts. */
  sourcing?: Sourcing;
  columns?: ShowcaseColumnData[];
  cards?: ShowcaseCard[];
  // "steps" layout
  steps?: ProcessStep[];
  /** "themedShot" layout: per-theme artwork, with optional stacked mobile art. */
  themed?: {
    light: string;
    dark: string;
    lightMobile?: string;
    darkMobile?: string;
  };
  // "single" layout
  src?: string;
  alt?: string;
  maxWidth?: string;
  center?: boolean;
  device?: DeviceKind;
  /** Aspect ratio to crop a full-page browser capture back to, e.g. "1512 / 985". */
  cropTo?: string;
  /** Optional group divider rendered above this section (e.g. "App 01"). */
  groupHeading?: { kicker: string; heading: string; body: string };
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
  /** What this workstream demonstrates — shown on the collapsed card so a reader
   *  can tell at a glance whether it's relevant to the role they're hiring for. */
  tags?: string[];
  /** Curated image srcs for the collapsed card. The strongest screens, which are
   *  rarely the first ones in `showcase.sections`. */
  highlights?: string[];
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
  showcase?: Showcase;
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
  heroMedia?: Media;
  /** When true, the listing card shows a preview but no link, and the detail
   *  route redirects — the case study isn't ready to be read yet. */
  previewOnly?: boolean;
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
