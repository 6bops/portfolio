/** Bespoke SVG hero illustration for the IndigoEMR case study. */
export function IndigoHeroArt() {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        aspectRatio: "16/9",
        background: "#141414",
        border: "1px solid #1f1f1f",
      }}
    >
      <svg viewBox="0 0 960 540" width="100%" height="100%" style={{ display: "block" }}>
        <defs>
          <linearGradient id="indigoGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#191919" />
            <stop offset="100%" stopColor="#101010" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="960" height="540" fill="url(#indigoGlow)" />

        {/* Patients-served stat card */}
        <rect x="48" y="56" width="260" height="160" rx="14" fill="#181818" stroke="#262626" strokeWidth="1.5" />
        <text x="72" y="96" fontFamily="'DM Mono', monospace" fontSize="11" letterSpacing="1.5" fill="#666">PATIENTS SERVED</text>
        <text x="72" y="148" fontFamily="'Syne', sans-serif" fontWeight="800" fontSize="32" fill="#e8e8e8">200,000+</text>
        <text x="72" y="178" fontFamily="'DM Mono', monospace" fontSize="11" fill="#555">across Nigeria &amp; Kenya</text>

        {/* Clinical workflow / vitals card */}
        <rect x="332" y="56" width="580" height="160" rx="14" fill="#161616" stroke="#262626" strokeWidth="1.5" />
        <text x="356" y="92" fontFamily="'DM Mono', monospace" fontSize="11" letterSpacing="1.5" fill="#666">CLINICAL WORKFLOW</text>
        <polyline
          points="356,172 410,172 432,124 458,198 486,140 514,172 562,172 584,152 612,182 638,172 880,172"
          fill="none"
          stroke="#cfcfcf"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />

        {/* Patient records list card */}
        <rect x="48" y="248" width="864" height="236" rx="14" fill="#151515" stroke="#262626" strokeWidth="1.5" />
        <text x="72" y="284" fontFamily="'DM Mono', monospace" fontSize="11" letterSpacing="1.5" fill="#666">PATIENT RECORDS</text>

        {[0, 1, 2, 3].map((row) => {
          const y = 312 + row * 50;
          return (
            <g key={row}>
              <circle cx="92" cy={y + 12} r="14" fill="#262626" />
              <rect x="124" y={y} width="220" height="10" rx="5" fill="#2a2a2a" />
              <rect x="124" y={y + 16} width="140" height="8" rx="4" fill="#222222" />
              <rect x="700" y={y + 2} width="160" height="20" rx="10" fill="#1d1d1d" stroke="#2a2a2a" strokeWidth="1" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
