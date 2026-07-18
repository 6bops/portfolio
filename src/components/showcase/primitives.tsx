import type { CSSProperties, ReactNode } from "react";
import { color, font } from "../../styles/theme";
import type { ShowcaseColumnData, Stat } from "../../types";
import { naturalWidth, Shot } from "../ui/Shot";

/**
 * Never render a screenshot above its intrinsic width. A 265px dropdown blown
 * up to the 870px content column is a soft, 3x-scaled mess — capping the card
 * to the source width keeps every screen at or below life size.
 */
function capToNatural(src: string | undefined, chrome: number, maxWidth?: string) {
  const w = naturalWidth(src);
  if (!w) return maxWidth;
  const cap = `${w + chrome}px`;
  return maxWidth ? `min(${maxWidth}, ${cap})` : cap;
}

/** Mono label above the section body copy in workstream showcases. */
export const showcaseLabel: CSSProperties = {
  fontFamily: font.mono,
  fontSize: "11px",
  color: color.dim,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  marginTop: "16px",
  marginBottom: "8px",
};

/** Serif body copy inside a workstream showcase. */
export const showcaseBody: CSSProperties = {
  fontFamily: font.serif,
  fontSize: "15px",
  lineHeight: 1.7,
  color: color.muted,
  margin: 0,
};

const shot: CSSProperties = {
  background: color.paper,
  borderRadius: "20px",
  padding: "24px",
  boxShadow: "0 30px 60px -30px rgba(0,0,0,0.6)",
};

/**
 * Hardware presets for framed screenshots. The aspect ratio is the device
 * viewport, not the capture: screens taller than the viewport (a scrolled
 * page) are cropped to fill the frame rather than stretching it.
 */
const devices = {
  phone: { ratio: "390 / 844", width: "300px", bezel: "10px", outer: "40px", inner: "30px" },
  tablet: { ratio: "1194 / 1313", width: "620px", bezel: "14px", outer: "28px", inner: "16px" },
} as const;

export type DeviceKind = keyof typeof devices | "browser" | "modal";

/** The window chrome shared by the browser and modal frames. */
function ChromeBar() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 12px",
        background: "#eceae5",
        borderBottom: `1px solid ${color.paperBorder}`,
      }}
    >
      {["#f45f57", "#fabc2e", "#28c840"].map((c) => (
        <span key={c} style={{ width: "9px", height: "9px", borderRadius: "50%", background: c }} />
      ))}
    </div>
  );
}

/**
 * A modal shown the way the product actually opens it: as a panel against the
 * right edge of the window, over a dimmed app. The captures are the panel only,
 * so on their own they read as free-floating screens with no sense of where they
 * came from — this puts them back in their window.
 */
function ModalFrame({ src, alt, panelWidth = "52%" }: { src?: string; alt?: string; panelWidth?: string }) {
  return (
    <div
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        border: `1px solid ${color.paperBorder}`,
        background: "#fff",
        boxShadow: "0 20px 40px -24px rgba(0,0,0,0.45)",
      }}
    >
      <ChromeBar />
      <div style={{ display: "flex", background: "#e9e8f0" }}>
        {/* the dimmed app behind the panel */}
        <div style={{ flex: 1 }} />
        <div style={{ width: panelWidth, boxShadow: "-28px 0 60px -30px rgba(0,0,0,0.45)" }}>
          <Shot src={src} alt={alt} style={{ display: "block", width: "100%", height: "auto" }} />
        </div>
      </div>
    </div>
  );
}

/**
 * Traffic-light chrome for web captures, which have no hardware to sit in.
 *
 * `cropTo` trims a full-page capture back to a viewport-shaped window — a
 * scrolled screenshot is much taller than the app ever is on screen, and
 * showing all of it makes the frame tower over the page.
 */
function BrowserFrame({ src, alt, cropTo }: { src?: string; alt?: string; cropTo?: string }) {
  return (
    <div
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        border: `1px solid ${color.paperBorder}`,
        background: "#fff",
        boxShadow: "0 20px 40px -24px rgba(0,0,0,0.45)",
      }}
    >
      <ChromeBar />
      {cropTo ? (
        <div style={{ aspectRatio: cropTo, overflow: "hidden" }}>
          <Shot
            src={src}
            alt={alt}
            style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
          />
        </div>
      ) : (
        <Shot src={src} alt={alt} style={{ display: "block", width: "100%", height: "auto" }} />
      )}
    </div>
  );
}

/** A screenshot seated in a device bezel, sized to read at roughly life scale. */
export function DeviceFrame({ src, alt, device, cropTo }: { src?: string; alt?: string; device: DeviceKind; cropTo?: string }) {
  if (device === "browser") return <BrowserFrame src={src} alt={alt} cropTo={cropTo} />;
  if (device === "modal") return <ModalFrame src={src} alt={alt} />;
  const d = devices[device];
  return (
    <div
      style={{
        width: "100%",
        maxWidth: d.width,
        margin: "0 auto",
        background: "#14151a",
        borderRadius: d.outer,
        padding: d.bezel,
        boxShadow: "0 24px 50px -20px rgba(0,0,0,0.55)",
      }}
    >
      <div
        style={{
          aspectRatio: d.ratio,
          borderRadius: d.inner,
          overflow: "hidden",
          background: "#fff",
        }}
      >
        <Shot src={src} alt={alt} style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
      </div>
    </div>
  );
}

/** A light-surface product screenshot in a soft card, optionally in a device bezel. */
export function ShotCard({
  src,
  alt,
  maxWidth,
  center,
  device,
  cropTo,
}: {
  src?: string;
  alt?: string;
  maxWidth?: string;
  center?: boolean;
  device?: DeviceKind;
  cropTo?: string;
}) {
  if (device) {
    // The browser chrome is its own frame, so it sits on the card directly;
    // hardware bezels get extra breathing room around them.
    const chromeLed = device === "browser" || device === "modal";
    const pad = chromeLed ? "20px" : "28px 20px";
    // Hardware presets already cap their own width; only the browser frame
    // tracks the source image.
    // A modal panel occupies ~half the window, so the frame can exceed the
    // panel's own width without upscaling it.
    const cap = device === "browser" ? capToNatural(src, 42, maxWidth) : maxWidth;
    return (
      <div style={{ ...shot, padding: pad, maxWidth: cap || "none", margin: "0 auto" }}>
        <DeviceFrame src={src} alt={alt} device={device} cropTo={cropTo} />
      </div>
    );
  }
  return (
    <div style={{ ...shot, maxWidth: capToNatural(src, 40, maxWidth) || "none", margin: center ? "0 auto" : undefined }}>
      <div style={{ borderRadius: "12px", overflow: "hidden", border: `1px solid ${color.paperBorder}`, background: "#fff" }}>
        <Shot src={src} alt={alt} style={{ display: "block", width: "100%", height: "auto" }} />
      </div>
    </div>
  );
}

/** A faux "before" window listing locked rows. */
export function MockWindow({ title, badge, rows }: { title?: string; badge?: string; rows?: string[] }) {
  return (
    <div style={{ ...shot, padding: "24px" }}>
      <div style={{ background: "#fff", borderRadius: "14px", border: `1px solid ${color.paperBorder}`, overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 18px",
            borderBottom: `1px solid ${color.paperBorder}`,
          }}
        >
          <span style={{ fontFamily: font.display, fontWeight: 700, fontSize: "15px", color: color.paperInk }}>{title}</span>
          <span style={{ fontFamily: font.mono, fontSize: "11px", padding: "4px 10px", borderRadius: "100px", background: "#f2f2f2", color: "#888" }}>
            {badge}
          </span>
        </div>
        {(rows ?? []).map((r, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 18px",
              borderBottom: i < (rows ?? []).length - 1 ? `1px solid ${color.paperBorder}` : "none",
              fontSize: "13px",
              color: "#444",
            }}
          >
            <span>{r}</span>
            <span style={{ fontFamily: font.mono, fontSize: "11px", color: "#b8b3a8" }}>locked</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Row of large display stats (dark surface). */
export function StatRow({ stats }: { stats: Stat[] }) {
  return (
    <div style={{ display: "flex", gap: "48px", flexWrap: "wrap", margin: "40px 0" }}>
      {stats.map((s, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <p style={{ fontFamily: font.display, fontWeight: 800, fontSize: "clamp(28px, 4vw, 40px)", color: color.white, margin: 0 }}>
            {s.value}
          </p>
          <p
            style={{
              fontFamily: font.mono,
              fontSize: "11px",
              color: color.faint,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              maxWidth: "180px",
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}

/** Closing three-up stat bar for a workstream showcase. */
export function FooterStatBar({ stats }: { stats: Stat[] }) {
  return (
    <div className="showcase-footer-stats" style={{ marginTop: "64px", paddingTop: "48px", borderTop: `1px solid ${color.border}` }}>
      {stats.map((s, i) => (
        <div key={i}>
          <p style={{ fontFamily: font.display, fontWeight: 800, fontSize: "clamp(28px, 4vw, 40px)", color: color.white, margin: 0 }}>
            {s.value}
          </p>
          <p style={{ fontFamily: font.serif, fontSize: "15px", color: color.muted, marginTop: "8px", lineHeight: 1.5, maxWidth: "260px" }}>
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export function ColumnLabel({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontFamily: font.mono,
        fontSize: "11px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: color.faint,
        textAlign: "center",
        marginBottom: "16px",
      }}
    >
      {children}
    </p>
  );
}

export function ColumnCaption({ children }: { children: ReactNode }) {
  return (
    <p style={{ fontFamily: font.mono, fontSize: "11px", color: color.faint, textAlign: "center", marginTop: "16px", letterSpacing: "0.02em" }}>
      {children}
    </p>
  );
}

/** Renders a showcase column as either a mock window or a screenshot. */
export function ShowcaseColumn({ col }: { col: ShowcaseColumnData }) {
  return col.type === "mock" ? (
    <MockWindow title={col.title} badge={col.badge} rows={col.rows} />
  ) : (
    <ShotCard src={col.src} alt={col.alt} device={col.device} cropTo={col.cropTo} />
  );
}
