/** Shared data-model types for the portfolio content. */

/** A single video or image. */
export type MediaFile = {
  type: "video" | "image";
  src: string;
  /** Opt-in device mockup drawn around the media (decorative; CSS only). */
  frame?: "laptop" | "phone" | "tablet";
};

/** One screen of a phone fan: its full image and an optional small copy for small surfaces (the canvas). */
export type PhoneFanScreen = { src: string; smSrc?: string };

/** Three app screens fanned out as phone mockups: the centre one larger and in front. */
export type PhoneFanMedia = {
  type: "phoneFan";
  /** Left, centre, right. */
  screens: [PhoneFanScreen, PhoneFanScreen, PhoneFanScreen];
  /** One description of the group, read as a single image. */
  label: string;
  /** The app's brand hue for the backdrop, mixed with the theme's surface. */
  tint?: string;
};

export type Media = MediaFile | PhoneFanMedia;

export type Stat = { value: string; label: string };

/** One piece of a note: plain text, or a link that opens in a new tab. */
export type GlanceNoteSegment = string | { text: string; href: string };

/** A labelled row of figures in the project hero, with an optional note under it. */
export type GlanceGroup = {
  label: string;
  items: Stat[];
  note?: GlanceNoteSegment[];
};

/** Hero figures: one flat row, or several labelled rows with an optional role line above them. */
export type Glance = Stat[] | { intro?: string; groups: GlanceGroup[] };

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
  /** "foundation" is the layer the products are built on (a design system). It is
   *  shown in its own band above the products and is not counted as one. Defaults
   *  to "product". */
  kind?: "foundation" | "product";
  navLabel: string;
  heading: string;
  problem: string;
  scope: string;
  stat: Stat;
  outcome: string;
  /** One line on what the reader did here, shown on the collapsed card. */
  role?: string;
  /** The problem in one short line, shown on the collapsed card. */
  cardProblem?: string;
  /** What this workstream demonstrates — shown on the collapsed card so a reader
   *  can tell at a glance whether it's relevant to the role they're hiring for. */
  tags?: string[];
  /** Curated image srcs: the strongest screens, which are rarely the first ones
   *  in `showcase.sections`. */
  highlights?: string[];
  /** The screen that leads this workstream in the product list and detail viewer.
   *  Defaults to the first of `highlights`; set it when that one is a "before" screen. */
  leadScreen?: string;
  showcase?: Showcase;
  screens?: { leftLabel: string; rightLabel: string };
  images?: ProjectImage[];
};

export type Decision = { heading: string; body: string };

/** One screen in the hero strip, credited to the workstream it comes from. */
export type HeroStripItem = {
  workstreamId: string;
  src: string;
  /** Short label above the caption, e.g. the product name. Defaults to the workstream's navLabel. */
  kicker?: string;
  caption: string;
};

export type ProjectDetail = {
  /** One-sentence result shown directly under the title on the project page. */
  outcomeLine?: string;
  /** Key figures shown as static rows between the result line and the buttons. */
  glance?: Glance;
  /** Two-column hero: a large product mockup beside the title (see ProjectHero).
   *  When set, the hero uses `heroSummary` in place of `outcomeLine`, puts the
   *  role line behind "More about my role" and the figure notes behind "Sources". */
  heroMockup?: { src: string; alt: string };
  /** Two-sentence summary beside the mockup. Falls back to `outcomeLine`. */
  heroSummary?: string;
  /** Representative screens shown as a strip under the figures. */
  heroStrip?: HeroStripItem[];
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

/** How deeply a piece of work is presented: full case study, lighter project page, or exploration. */
export type ProjectTier = "case-study" | "project" | "exploration";

export type Project = {
  slug: string;
  tier: ProjectTier;
  /** Short domain label, e.g. "Healthtech". */
  domain?: string;
  company?: string;
  featured: boolean;
  title: string;
  year: string;
  description: string;
  cta?: string;
  ctaLink?: string;
  websiteLink?: string;
  media: Media[];
  heroMedia?: MediaFile;
  /** Backdrop colour behind framed (device mockup) media, e.g. "#2a2350". */
  tint?: string;
  /** The product's brand hue for its details page, one shade per site theme: lighter on dark,
   *  darker on light, so it clears contrast against the page. Unset keeps the site accent. */
  brand?: { accent: { dark: string; light: string } };
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

/** A compact entry in the "Everything else" list on the Work page. */
export type WorkEntry = {
  id: string;
  title: string;
  company: string;
  role: string;
  years: string;
  summary: string;
  tags: string[];
  /** Live site; when set the title links out, otherwise it is plain text. */
  href?: string;
};
