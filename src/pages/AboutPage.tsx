import type { CSSProperties } from "react";
import { color, font } from "../styles/theme";
import { useMounted } from "../hooks/useMounted";
import { EXPERIENCE } from "../data";
import { FadeIn } from "../components/ui";

const para: CSSProperties = { fontFamily: font.serif, fontSize: "17px", lineHeight: 1.7, color: color.body };
const strong = { color: color.ink };

const EDUCATION = [
  { school: "University of Portsmouth", year: "2025", programme: "MSc User Experience Design" },
  { school: "University of Lagos", year: "2021", programme: "BSc Finance" },
];

export function AboutPage() {
  const loaded = useMounted();

  return (
    <>
      <header style={{ marginBottom: "64px" }}>
        <h1
          style={{
            fontFamily: font.display,
            fontWeight: 800,
            fontSize: "clamp(32px, 5.5vw, 56px)",
            lineHeight: 1.12,
            letterSpacing: "-0.03em",
            maxWidth: "700px",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          Product Designer and design strategist, living and working in the United Kingdom.
        </h1>
      </header>

      <FadeIn delay={0.2}>
        <div style={{ maxWidth: "640px", marginBottom: "48px" }}>
          <p style={{ ...para, marginBottom: "24px" }}>
            My name is Mubarak — most people know me as Layor. I am a Senior Product Designer currently leading design at{" "}
            <strong style={strong}>IndigoEMR</strong>, a healthcare platform serving over 200,000 patients across Nigeria and
            Kenya. The work involves designing for clinicians, administrators, and patients in environments where digital tools
            are still new and trust has to be earned through the interface.
          </p>
          <p style={{ ...para, marginBottom: "24px" }}>
            Before IndigoEMR, I was principal designer at <strong style={strong}>First Bank Nigeria</strong>, where I led the
            redesign of core banking experiences used by millions. I spent two years before that at{" "}
            <strong style={strong}>Sharply Africa</strong>, moving from senior user researcher to lead UI designer — most of that
            time spent understanding what designing for low-connectivity African environments actually requires in practice. I
            started my career at <strong style={strong}>Summitech Computing</strong>, where I grew from UX researcher to product
            strategy lead over four years.
          </p>
          <p style={para}>
            I believe the designer's job is to close the gap between what research reveals and what actually ships. That means
            staying close to engineering, understanding what is technically feasible under real constraints, and treating design
            systems as product decisions rather than style guides. I am currently completing an MSc in User Experience Design at
            the University of Portsmouth alongside my full-time work.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.3} style={{ marginBottom: "64px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {["/images/IMG_4189.png", "/images/IMG_4281.png"].map((src) => (
            <div key={src} style={{ borderRadius: "16px", overflow: "hidden", aspectRatio: "3/4", background: "#1a1a1a" }}>
              <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(0.2)" }} />
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.15} style={{ marginBottom: "80px" }}>
        <div style={{ maxWidth: "640px" }}>
          <p style={{ ...para, marginBottom: "24px" }}>
            Most of my career has been spent designing products for African markets — healthtech, fintech, logistics. The
            constraints are different: lower average device specs, inconsistent connectivity, users who may be new to smartphones,
            and trust patterns that do not map onto Western UX assumptions. I find those constraints more interesting than the
            absence of them.
          </p>
          <p style={para}>
            Outside of client work I am building three products: CloudScout, a mobile-first hiring tool for SMEs; Propty, a
            facility and property management platform; and BeamHC, focused on healthcare access. I also give talks on design and
            write occasionally. You can find those on the More page.
          </p>
        </div>
      </FadeIn>

      <section style={{ marginBottom: "40px" }}>
        {EXPERIENCE.map((exp, i) => (
          <FadeIn key={exp.company} delay={i * 0.08}>
            <div style={{ borderTop: "1px solid #1f1f1f", paddingTop: "28px", paddingBottom: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px", flexWrap: "wrap", gap: "8px" }}>
                <h3 style={{ fontFamily: font.display, fontSize: "15px", fontWeight: 700, color: color.ink, margin: 0 }}>{exp.company}</h3>
                <span style={{ fontFamily: font.mono, fontSize: "12px", color: color.dim }}>{exp.years}</span>
              </div>
              <p style={{ fontFamily: font.mono, fontSize: "12px", color: color.soft, margin: "0 0 10px 0", letterSpacing: "0.02em" }}>{exp.role}</p>
              <p style={{ fontFamily: font.serif, fontSize: "15.5px", lineHeight: 1.65, color: color.muted, margin: 0, maxWidth: "580px" }}>{exp.description}</p>
            </div>
          </FadeIn>
        ))}
      </section>

      <FadeIn delay={0.1} style={{ marginBottom: "40px" }}>
        <div style={{ borderTop: "1px solid #1f1f1f", paddingTop: "28px" }}>
          <h3 style={{ fontFamily: font.display, fontSize: "14px", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: color.dim, margin: "0 0 24px 0" }}>
            Education
          </h3>
          {EDUCATION.map((ed, i) => (
            <div key={ed.school} style={{ marginBottom: i < EDUCATION.length - 1 ? "20px" : 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
                <span style={{ fontFamily: font.display, fontSize: "15px", fontWeight: 700, color: color.ink }}>{ed.school}</span>
                <span style={{ fontFamily: font.mono, fontSize: "12px", color: color.dim }}>{ed.year}</span>
              </div>
              <p style={{ fontFamily: font.mono, fontSize: "12px", color: color.soft, margin: 0 }}>{ed.programme}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </>
  );
}
