import type { ProjectImage } from "../../../types";

type SpanProp = Pick<ProjectImage, "span">;

const box = { fill: "#181818", stroke: "#262626", strokeWidth: 1.5, rx: 12 };
const labelStyle = { fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 1.2, fill: "#666" };
const flowLabel = {
  fontFamily: "'Syne', sans-serif",
  fontWeight: 600,
  fontSize: "14px",
  color: "#dadada",
  lineHeight: 1.3,
  textAlign: "center" as const,
};
const flowNote = {
  fontFamily: "'Source Serif 4', Georgia, serif",
  fontSize: "12.5px",
  color: "#888",
  lineHeight: 1.5,
  textAlign: "center" as const,
};

/** SVG "before" diagram: the untracked inter-hospital referral process. */
export function PartnershipBeforeFlow({ span }: SpanProp) {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "16/10",
        background: "#141414",
        border: "1px solid #1f1f1f",
        borderRadius: "16px",
        maxWidth: span === "full" ? "none" : undefined,
      }}
    >
      <svg viewBox="0 0 960 560" width="100%" height="100%" style={{ display: "block" }}>
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#444" />
          </marker>
        </defs>

        {/* Trigger box */}
        <rect x="330" y="24" width="300" height="64" {...box} />
        <foreignObject x="350" y="36" width="260" height="44">
          <div style={flowLabel}>Patient needs a specialist at another hospital</div>
        </foreignObject>

        {/* Branch connector */}
        <line x1="480" y1="88" x2="480" y2="130" stroke="#333" strokeWidth="1.5" />
        <line x1="480" y1="130" x2="230" y2="130" stroke="#333" strokeWidth="1.5" />
        <line x1="480" y1="130" x2="730" y2="130" stroke="#333" strokeWidth="1.5" />
        <line x1="230" y1="130" x2="230" y2="166" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        <line x1="730" y1="130" x2="730" y2="166" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrowhead)" />

        {/* Option A label + path */}
        <text x="230" y="118" textAnchor="middle" style={labelStyle}>OPTION A</text>
        <rect x="110" y="170" width="240" height="64" {...box} />
        <foreignObject x="130" y="182" width="200" height="44">
          <div style={flowLabel}>Add the hospital as a branch in the system</div>
        </foreignObject>
        <line x1="230" y1="234" x2="230" y2="270" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        <rect x="100" y="274" width="260" height="84" fill="#161616" stroke="#262626" strokeWidth="1.5" rx="12" />
        <foreignObject x="120" y="288" width="220" height="60">
          <div style={flowNote}>One shared instance — billing and access boundaries blur between facilities</div>
        </foreignObject>

        {/* Option B label + path */}
        <text x="730" y="118" textAnchor="middle" style={labelStyle}>OPTION B</text>
        <rect x="610" y="170" width="240" height="64" {...box} />
        <foreignObject x="630" y="182" width="200" height="44">
          <div style={flowLabel}>Print the patient's records</div>
        </foreignObject>
        <line x1="730" y1="234" x2="730" y2="270" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        <rect x="610" y="274" width="240" height="64" {...box} />
        <foreignObject x="630" y="286" width="200" height="44">
          <div style={flowLabel}>Send by courier or hand delivery</div>
        </foreignObject>
        <line x1="730" y1="338" x2="730" y2="374" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        <rect x="600" y="378" width="260" height="84" fill="#161616" stroke="#262626" strokeWidth="1.5" rx="12" />
        <foreignObject x="620" y="392" width="220" height="60">
          <div style={flowNote}>
            Re-entered by hand at the receiving hospital, with no record of what happened in between
          </div>
        </foreignObject>

        <text
          x="480"
          y="530"
          textAnchor="middle"
          style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 0.6, fill: "#555" }}
        >
          Neither path was tracked inside the system
        </text>
      </svg>
    </div>
  );
}
