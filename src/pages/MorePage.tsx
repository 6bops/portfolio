import type { MouseEvent } from "react";
import { color, font } from "../styles/theme";
import { useMounted } from "../hooks/useMounted";
import { STARTUPS, TALKS_WRITING } from "../data";
import { FadeIn } from "../components/ui";

/** Uppercase mono divider heading used for both sections on this page. */
function SectionHeader({ children }: { children: string }) {
  return (
    <FadeIn delay={0.15}>
      <div
        style={{
          fontFamily: font.mono,
          fontSize: "12px",
          color: color.dim,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "32px",
          paddingBottom: "14px",
          borderBottom: "1px solid #1f1f1f",
        }}
      >
        {children}
      </div>
    </FadeIn>
  );
}

export function MorePage() {
  const loaded = useMounted();

  return (
    <>
      <header style={{ marginBottom: "80px" }}>
        <h1
          style={{
            fontFamily: font.display,
            fontWeight: 800,
            fontSize: "clamp(32px, 5.5vw, 56px)",
            lineHeight: 1.12,
            letterSpacing: "-0.03em",
            maxWidth: "750px",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          I speak about design, write about craft, and build products on the side.
        </h1>
      </header>

      {/* Talks & Writing */}
      <section style={{ marginBottom: "80px" }}>
        <SectionHeader>Talks &amp; Writing</SectionHeader>
        {TALKS_WRITING.map((item, i) => {
          const isVideo = item.type === "Video";
          return (
            <FadeIn key={item.href} delay={0.2 + i * 0.08}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "20px", padding: "24px 0", borderBottom: "1px solid #1a1a1a", textDecoration: "none", transition: "background 0.3s" }}
                onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.background = "transparent")}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: isVideo ? "rgba(255,0,0,0.08)" : "rgba(255,255,255,0.04)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    flexShrink: 0,
                    color: isVideo ? "#ff4444" : color.soft,
                    border: isVideo ? "1px solid rgba(255,0,0,0.15)" : "1px solid #222",
                  }}
                >
                  {item.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: font.display, fontSize: "15px", fontWeight: 600, color: color.ink, margin: "0 0 4px 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {item.title}
                  </p>
                  <span style={{ fontFamily: font.mono, fontSize: "11px", color: color.dim, letterSpacing: "0.04em" }}>{item.type}</span>
                </div>
                <span style={{ fontFamily: font.mono, fontSize: "14px", color: color.ghost, flexShrink: 0 }}>↗</span>
              </a>
            </FadeIn>
          );
        })}
      </section>

      {/* Startup Ideas */}
      <section style={{ marginBottom: "40px" }}>
        <SectionHeader>Ideas I am Building</SectionHeader>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
          {STARTUPS.map((startup, i) => {
            const isBeta = startup.status === "Beta";
            return (
              <FadeIn key={startup.name} delay={0.2 + i * 0.1}>
                <a
                  href={startup.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    background: "#141414",
                    border: "1px solid #1f1f1f",
                    borderRadius: "16px",
                    padding: "28px 24px",
                    textDecoration: "none",
                    transition: "border-color 0.3s, transform 0.4s cubic-bezier(0.23,1,0.32,1), background 0.3s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.borderColor = "#333";
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.background = "#181818";
                  }}
                  onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.borderColor = "#1f1f1f";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = "#141414";
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                    <h3 style={{ fontFamily: font.display, fontSize: "17px", fontWeight: 700, color: color.white, margin: 0 }}>{startup.name}</h3>
                    <span
                      style={{
                        fontFamily: font.mono,
                        fontSize: "10px",
                        color: isBeta ? "#4ade80" : "#f59e0b",
                        background: isBeta ? "rgba(74,222,128,0.08)" : "rgba(245,158,11,0.08)",
                        border: `1px solid ${isBeta ? "rgba(74,222,128,0.2)" : "rgba(245,158,11,0.2)"}`,
                        borderRadius: "100px",
                        padding: "3px 10px",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      {startup.status}
                    </span>
                  </div>
                  <p style={{ fontFamily: font.mono, fontSize: "12px", color: color.soft, margin: "0 0 12px 0", letterSpacing: "0.02em" }}>{startup.tagline}</p>
                  <p style={{ fontFamily: font.serif, fontSize: "14.5px", lineHeight: 1.6, color: color.soft, margin: "0 0 18px 0" }}>{startup.description}</p>
                  <span style={{ fontFamily: font.mono, fontSize: "12px", color: color.dim }}>Visit ↗</span>
                </a>
              </FadeIn>
            );
          })}
        </div>
      </section>
    </>
  );
}
