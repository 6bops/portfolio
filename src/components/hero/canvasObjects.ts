import { naturalAspect } from "../ui/Shot";
import { getProjectBySlug } from "../../data";
import { MUMBUDDIE_FAN, RABII_FAN } from "../../data/phoneFans";
import type { PhoneFanMedia } from "../../types";

/**
 * One item on the hero board: a text object (the intro, the status line) or a frame (a project
 * thumbnail). Coordinates and widths are board units (the "world"), not screen pixels.
 */
export type CanvasObject = {
  id: string;
  kind: "text" | "frame";
  group: "Text" | "Frames";
  title: string;
  x: number;
  y: number;
  w: number;
  /** Project slug, for the inspector's details. */
  slug?: string;
  /** Route to open; omitted for work that has no case-study page. */
  to?: string;
  src?: string;
  phone?: boolean;
  /** Three app screens fanned out as phones, in place of a single image (give `aspect` with it). */
  fan?: PhoneFanMedia;
  /** Width / height, used when there is no image. */
  aspect?: number;
};

/** The board's extent in board units (the dotted area the opening view and Fit are framed against). */
export const WORLD_W = 2100;
export const WORLD_H = 960;

export const CANVAS_OBJECTS: CanvasObject[] = [
  { id: "intro", kind: "text", group: "Text", title: "Intro", x: 60, y: 90, w: 500 },
  { id: "status", kind: "text", group: "Text", title: "Status", x: 60, y: 490, w: 500 },
  { id: "first-bank", kind: "frame", group: "Frames", title: "First Bank", x: 660, y: 100, w: 460, to: "/work/first-bank-nigeria", src: "/images/canvas/first-bank.webp", slug: "first-bank-nigeria" },
  { id: "indigoemr", kind: "frame", group: "Frames", title: "IndigoEMR", x: 1180, y: 60, w: 460, to: "/work/indigoemr", src: "/images/canvas/indigoemr.webp", slug: "indigoemr" },
  { id: "propty", kind: "frame", group: "Frames", title: "Propty", x: 1700, y: 120, w: 340, src: "/images/canvas/propty.webp", slug: "propty" },
  { id: "sharply", kind: "frame", group: "Frames", title: "Sharply", x: 700, y: 480, w: 400, to: "/work/sharply-africa", src: "/images/canvas/sharply.webp", slug: "sharply-africa" },
  { id: "kunda-kids", kind: "frame", group: "Frames", title: "Kunda Kids", x: 1160, y: 440, w: 300, src: "/images/canvas/kunda-kids.webp", slug: "kunda-kids" },
  { id: "mumbuddie", kind: "frame", group: "Frames", title: "Mumbuddie", x: 1530, y: 420, w: 450, aspect: 1.2, fan: MUMBUDDIE_FAN, slug: "mumbuddie" },
  { id: "rabii", kind: "frame", group: "Frames", title: "Rabii", x: 1160, y: 690, w: 320, aspect: 1.2, fan: RABII_FAN, slug: "rabii" },
];

/** A frame's size in board units: the image's real proportions, else `w / aspect`. */
export function objectSize(o: CanvasObject): { w: number; h: number } {
  const ratio = o.src ? naturalAspect(o.src) : undefined;
  if (ratio) {
    const [rw, rh] = ratio.split("/").map((n) => parseFloat(n));
    return { w: o.w, h: o.w * (rh / rw) };
  }
  return { w: o.w, h: o.w / (o.aspect ?? 1.6) };
}

/** The project facts the inspector shows for a frame, and where "open" goes (its case study, else its site). */
export function projectDetails(o: CanvasObject): {
  rows: { label: string; value: string }[];
  open?: { to: string } | { href: string };
} {
  const project = o.slug ? getProjectBySlug(o.slug) : undefined;
  const rows = project
    ? [
        { label: "Role", value: project.detail.role },
        { label: "Year", value: project.year },
        { label: "Status", value: project.detail.status },
        { label: "Platform", value: project.detail.platform },
      ]
    : [];
  if (o.to) return { rows, open: { to: o.to } };
  // The project's site: its website link, else an external call-to-action link (Mumbuddie, Rabii).
  const site = project?.websiteLink ?? (project?.ctaLink?.startsWith("https://") ? project.ctaLink : undefined);
  if (site) return { rows, open: { href: site } };
  return { rows };
}
