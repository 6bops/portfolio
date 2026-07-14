import { Fragment } from "react";
import { color, font } from "../../styles/theme";
import type { ShowcaseCard, ShowcaseColumnData } from "../../types";
import { ColumnCaption, ColumnLabel, ShowcaseColumn } from "./primitives";

/** Two-up before/after comparison. */
export function CompareGrid({ columns }: { columns: ShowcaseColumnData[] }) {
  return (
    <div className="showcase-grid-2col">
      {columns.map((col, i) => (
        <div key={i}>
          {col.label && <ColumnLabel>{col.label}</ColumnLabel>}
          <ShowcaseColumn col={col} />
          {col.caption && <ColumnCaption>{col.caption}</ColumnCaption>}
        </div>
      ))}
    </div>
  );
}

/** Sequential flow with arrows between columns. */
export function FlowGrid({ columns }: { columns: ShowcaseColumnData[] }) {
  return (
    <div className="showcase-flow-grid">
      {columns.map((col, i) => (
        <Fragment key={i}>
          <div>
            {col.label && <ColumnLabel>{col.label}</ColumnLabel>}
            <ShowcaseColumn col={col} />
          </div>
          {i < columns.length - 1 && <span className="showcase-flow-arrow">→</span>}
        </Fragment>
      ))}
    </div>
  );
}

/** Three captioned screenshots side by side. */
export function ThreeColGrid({ columns }: { columns: ShowcaseColumnData[] }) {
  return (
    <div className="showcase-grid-3col">
      {columns.map((col, i) => (
        <div
          key={i}
          style={{
            background: color.paper,
            borderRadius: "20px",
            padding: "24px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "14px",
            boxShadow: "0 30px 60px -30px rgba(0,0,0,0.6)",
          }}
        >
          <div style={{ width: "100%", borderRadius: "12px", overflow: "hidden", border: `1px solid ${color.paperBorder}`, background: "#fff" }}>
            <img src={col.src} alt={col.alt} loading="lazy" style={{ display: "block", width: "100%", height: "auto" }} />
          </div>
          {col.label && (
            <p style={{ fontFamily: font.mono, fontSize: "11px", color: "#6b6b72", textAlign: "center", lineHeight: 1.5, margin: 0 }}>
              {col.label}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

/** Grid of "shipped in production" proof cards. */
export function ProofWall({ cards }: { cards: ShowcaseCard[] }) {
  return (
    <div className="showcase-proofwall-grid">
      {cards.map((c, i) => (
        <div
          key={i}
          style={{
            background: color.paper,
            borderRadius: "18px",
            padding: "16px",
            boxShadow: "0 24px 48px -28px rgba(0,0,0,0.6)",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <span
            style={{
              fontFamily: font.mono,
              fontSize: "9.5px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: color.accentDeep,
              background: "#edeaff",
              display: "inline-block",
              padding: "4px 8px",
              borderRadius: "100px",
              width: "fit-content",
            }}
          >
            {c.specialty}
          </span>
          <span style={{ fontFamily: font.display, fontWeight: 700, fontSize: "16px", color: color.paperInk, lineHeight: 1.25 }}>
            {c.name}
          </span>
          <div style={{ background: "#fff", border: `1px solid ${color.paperBorder}`, borderRadius: "10px", overflow: "hidden" }}>
            <img src={c.src} alt={c.alt} loading="lazy" style={{ display: "block", width: "100%", height: "auto" }} />
          </div>
          <span style={{ fontFamily: font.mono, fontSize: "10px", color: "#8a8a90" }}>{c.builtBy}</span>
        </div>
      ))}
    </div>
  );
}
