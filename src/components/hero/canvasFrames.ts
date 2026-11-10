import { naturalAspect } from "../ui/Shot";

/** One artboard on the hero canvas. Coordinates are in canvas units (the "world"), not screen pixels. */
export type CanvasFrame = {
  id: string;
  title: string;
  /** Route to open on click; omitted for work that has no case-study page. */
  to?: string;
  src?: string;
  x: number;
  y: number;
  w: number;
  /** Used for the height when there is no image (w / h). */
  aspect?: number;
  phone?: boolean;
};

export const WORLD_W = 1800;
export const WORLD_H = 920;
/** Left edge of the first frame; the opening view lines it up just right of the text card. */
export const FRAMES_MIN_X = 100;

export const CANVAS_FRAMES: CanvasFrame[] = [
  { id: "first-bank", title: "First Bank", to: "/work/first-bank-nigeria", src: "/images/canvas/first-bank.webp", x: 100, y: 120, w: 620 },
  { id: "indigoemr", title: "IndigoEMR", to: "/work/indigoemr", src: "/images/canvas/indigoemr.webp", x: 780, y: 80, w: 600 },
  { id: "propty", title: "Propty", src: "/images/canvas/propty.webp", x: 1460, y: 140, w: 380 },
  { id: "sharply", title: "Sharply", to: "/work/sharply-africa", src: "/images/canvas/sharply.webp", x: 140, y: 560, w: 520 },
  { id: "kunda-kids", title: "Kunda Kids", src: "/images/canvas/kunda-kids.webp", x: 720, y: 430, w: 330 },
  { id: "mumbuddie-home", title: "Mumbuddie / Home", src: "/images/mumbuddie/home.webp", x: 1110, y: 430, w: 170, phone: true },
  { id: "mumbuddie-vault", title: "Mumbuddie / Vault", src: "/images/mumbuddie/vault.webp", x: 1300, y: 500, w: 170, phone: true },
  { id: "mumbuddie-circle", title: "Mumbuddie / Circle", src: "/images/mumbuddie/circle.webp", x: 1490, y: 430, w: 170, phone: true },
  { id: "rabii", title: "Rabii", x: 760, y: 700, w: 300, aspect: 1.6 },
];

/** Frame height in canvas units, from the image's real proportions. */
export function frameHeight(f: CanvasFrame): number {
  const ratio = f.src ? naturalAspect(f.src) : undefined;
  if (ratio) {
    const [w, h] = ratio.split("/").map((n) => parseFloat(n));
    return f.w * (h / w);
  }
  return f.w / (f.aspect ?? 1.6);
}
