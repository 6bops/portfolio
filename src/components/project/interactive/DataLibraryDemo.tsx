import { useState, type MouseEvent } from "react";
import { color, font } from "../../../styles/theme";
import type { ProjectImage } from "../../../types";

type SpanProp = Pick<ProjectImage, "span">;

/** Interactive System-vs-Custom forms toggle used as an inline showcase. */
export function DataLibraryDemo({ span }: SpanProp) {
  const [tab, setTab] = useState<"system" | "custom">("system");

  const systemForms = [
    { name: "General Practice Intake", values: "12 fields · locked" },
    { name: "Ophthalmology Exam", values: "18 fields · locked" },
    { name: "Antenatal Visit", values: "15 fields · locked" },
  ];
  const customForms = [
    { name: "Diabetes Follow-up", values: "9 fields · editable" },
    { name: "Post-Surgery Review", values: "11 fields · editable" },
    { name: "Pediatric Vitals", values: "7 fields · editable" },
  ];
  const rows = tab === "system" ? systemForms : customForms;

  const hover = (over: boolean) => (e: MouseEvent<HTMLButtonElement>, key: string) => {
    if (tab !== key) e.currentTarget.style.color = over ? "#aaa" : "#777";
  };

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "16/9",
        background: "#141414",
        border: "1px solid #1f1f1f",
        borderRadius: "16px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        maxWidth: span === "full" ? "none" : undefined,
      }}
    >
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
        {(
          [
            { key: "system", label: "System Forms" },
            { key: "custom", label: "Custom Forms" },
          ] as const
        ).map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              fontFamily: font.mono,
              fontSize: "12px",
              padding: "8px 18px",
              borderRadius: "100px",
              cursor: "pointer",
              border: tab === t.key ? "1px solid #555" : "1px solid #262626",
              background: tab === t.key ? "#1f1f1f" : "transparent",
              color: tab === t.key ? "#e8e8e8" : "#777",
              transition: "border-color 0.2s ease, background 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => hover(true)(e, t.key)}
            onMouseLeave={(e) => hover(false)(e, t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
        {rows.map((row) => (
          <div
            key={row.name}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 18px",
              borderRadius: "10px",
              background: "#181818",
              border: "1px solid #232323",
            }}
          >
            <span style={{ fontFamily: font.display, fontSize: "14px", fontWeight: 600, color: "#dadada" }}>
              {row.name}
            </span>
            <span style={{ fontFamily: font.mono, fontSize: "11px", color: color.faint }}>{row.values}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
