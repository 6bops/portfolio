import type { CSSProperties, ReactNode } from "react";
import { color, font } from "../../styles/theme";
import type { ShowcaseColumnData, Stat } from "../../types";

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
  fontSize: "16px",
  lineHeight: 1.7,
  color: color.muted,
  margin: 0,
};

const shot: CSSProperties = {
  background: color.paper,
  borderRadius: "20px",
  padding: "20px",
  boxShadow: "0 30px 60px -30px rgba(0,0,0,0.6)",
};

/** A light-surface product screenshot in a soft card. */
export function ShotCard({
  src,
  alt,
  maxWidth,
  center,
}: {
  src?: string;
  alt?: string;
  maxWidth?: string;
  center?: boolean;
}) {
  return (
    <div style={{ ...shot, maxWidth: maxWidth || "none", margin: center ? "0 auto" : undefined }}>
      <div style={{ borderRadius: "12px", overflow: "hidden", border: `1px solid ${color.paperBorder}`, background: "#fff" }}>
        <img src={src} alt={alt} loading="lazy" style={{ display: "block", width: "100%", height: "auto" }} />
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
          <span style={{ fontFamily: font.display, fontWeight: 700, fontSize: "14px", color: color.paperInk }}>{title}</span>
          <span style={{ fontFamily: font.mono, fontSize: "10px", padding: "4px 10px", borderRadius: "100px", background: "#f2f2f2", color: "#888" }}>
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
            <span style={{ fontFamily: font.mono, fontSize: "10px", color: "#b8b3a8" }}>locked</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Row of large display stats (dark surface). */
export function StatRow({ stats }: { stats: Stat[] }) {
  return (
    <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", margin: "40px 0" }}>
      {stats.map((s, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <p style={{ fontFamily: font.display, fontWeight: 800, fontSize: "clamp(28px, 4vw, 40px)", color: color.paper, margin: 0 }}>
            {s.value}
          </p>
          <p
            style={{
              fontFamily: font.mono,
              fontSize: "11px",
              color: "#6b6b72",
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
    <div className="showcase-footer-stats" style={{ marginTop: "72px", paddingTop: "48px", borderTop: "1px solid #23232a" }}>
      {stats.map((s, i) => (
        <div key={i}>
          <p style={{ fontFamily: font.display, fontWeight: 800, fontSize: "clamp(28px, 4vw, 40px)", color: color.paper, margin: 0 }}>
            {s.value}
          </p>
          <p style={{ fontFamily: font.serif, fontSize: "14px", color: "#a6a6ac", marginTop: "8px", lineHeight: 1.5, maxWidth: "260px" }}>
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
        color: "#6b6b72",
        textAlign: "center",
        marginBottom: "14px",
      }}
    >
      {children}
    </p>
  );
}

export function ColumnCaption({ children }: { children: ReactNode }) {
  return (
    <p style={{ fontFamily: font.mono, fontSize: "11px", color: "#6b6b72", textAlign: "center", marginTop: "14px", letterSpacing: "0.02em" }}>
      {children}
    </p>
  );
}

/** Renders a showcase column as either a mock window or a screenshot. */
export function ShowcaseColumn({ col }: { col: ShowcaseColumnData }) {
  return col.type === "mock" ? (
    <MockWindow title={col.title} badge={col.badge} rows={col.rows} />
  ) : (
    <ShotCard src={col.src} alt={col.alt} />
  );
}
