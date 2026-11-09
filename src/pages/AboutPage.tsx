import type { CSSProperties } from "react";
import { color, font } from "../styles/theme";
import { EXPERIENCE } from "../data";
import { FadeIn, RevealText, StaggerGroup, StaggerItem } from "../components/ui";

const para: CSSProperties = { fontFamily: font.serif, fontSize: "17px", lineHeight: 1.7, color: color.body };
const strong = { color: color.ink };

const EDUCATION = [
  { school: "University of Portsmouth", year: "2025", programme: "MSc User Experience Design" },
  { school: "UNILAG", year: "2021", programme: "BSc Finance" },
];

export function AboutPage() {
  return (
    <>
      <header style={{ marginBottom: "64px" }}>
        <RevealText
          as="h1"
          text="Senior Product Designer, living and working in the United Kingdom."
          delay={0.1}
          stagger={0.04}
          style={{
            fontFamily: font.display,
            fontWeight: 800,
            fontSize: "clamp(32px, 5.5vw, 56px)",
            lineHeight: 1.12,
            letterSpacing: "-0.03em",
            maxWidth: "700px",
            display: "block",
          }}
        />
      </header>

      <FadeIn delay={0.2}>
        <div style={{ maxWidth: "640px", marginBottom: "48px" }}>
          <p style={{ ...para, marginBottom: "24px" }}>
            I'm Layor Salami (legal name: Mubarak Salami). I have over 9 years of experience designing and shipping
            digital products across healthtech, fintech, SaaS, logistics, and marketplaces. I've worked across web and native
            mobile, iOS, Android, and React Native.
          </p>
          <p style={{ ...para, marginBottom: "24px" }}>
            I've built 10+ design systems, one for every project. On three of them I personally led visual direction,
            typography, colour, and spacing, from the ground up: <strong style={strong}>IndigoEMR</strong>,{" "}
            <strong style={strong}>FirstBank</strong>, and <strong style={strong}>Sharply</strong>. Each now runs across
            dozens of product surfaces at three different companies.
          </p>
          <p style={{ ...para, marginBottom: "24px" }}>
            Most of what I do sits upstream of a brief. I look for the gap between what a system can actually do and what the
            people using it need, then design my way through it. At IndigoEMR that meant restructuring how staff navigate a
            system that was forcing full-page reloads dozens of times a shift, and independently shipping a native patient app
            now used by 20,000+ active patients across 200,000+ registered patient records. At FirstBank it meant building a shared design foundation across three
            vendor-built products with no mandate to do so. At Sharply it meant deciding, from research rather than
            assumption, that the rider app should be Android-only.
          </p>
          <p style={para}>
            I currently lead product design at <strong style={strong}>IndigoEMR</strong>, where I manage a team of three
            designers, own the design system, and design clinical, operational, business intelligence, and native
            patient-facing workflows used across 20+ healthcare branches in multiple markets.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.3} style={{ marginBottom: "64px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {["/images/img-4189.webp", "/images/img-4281.webp"].map((src) => (
            <div key={src} style={{ borderRadius: "16px", overflow: "hidden", aspectRatio: "3/4", background: color.hairline }}>
              <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(0.2)" }} />
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.15} style={{ marginBottom: "96px" }}>
        <div style={{ maxWidth: "640px" }}>
          <p style={{ ...para, marginBottom: "24px" }}>
            Most of my work has been across healthtech, fintech, SaaS, logistics, and marketplaces. The conditions are different
            from what most UX writing assumes. Devices are cheaper and slower, connections drop, and plenty of users are new to
            smartphones. Trust works differently too. That is the part I like most.
          </p>
          <p style={para}>
            Outside of client work I build my own products. Rabii compares coach tickets across the UK, Mumbuddie supports
            mothers through pregnancy and postpartum, Propty is a property and facility management platform, CloudScout is a
            mobile-first hiring tool, and BeamHC is about healthcare access. I speak and write about design now and then,
            which you can find on the More page.
          </p>
        </div>
      </FadeIn>

      <StaggerGroup as="section" stagger={0.08} style={{ marginBottom: "48px" }}>
        {EXPERIENCE.map((exp) => (
          <StaggerItem key={exp.company} style={{ borderTop: `1px solid ${color.border}`, paddingTop: "24px", paddingBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px", flexWrap: "wrap", gap: "8px" }}>
              <h3 style={{ fontFamily: font.display, fontSize: "15px", fontWeight: 700, color: color.ink, margin: 0 }}>{exp.company}</h3>
              <span style={{ fontFamily: font.mono, fontSize: "13px", color: color.dim }}>{exp.years}</span>
            </div>
            <p style={{ fontFamily: font.mono, fontSize: "13px", color: color.soft, margin: "0 0 10px 0", letterSpacing: "0.02em" }}>{exp.role}</p>
            <p style={{ fontFamily: font.serif, fontSize: "15px", lineHeight: 1.65, color: color.muted, margin: 0, maxWidth: "580px" }}>{exp.description}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <div style={{ marginBottom: "48px" }}>
        <FadeIn delay={0.1}>
          <div style={{ borderTop: `1px solid ${color.border}`, paddingTop: "24px" }}>
            <h3 style={{ fontFamily: font.display, fontSize: "15px", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: color.dim, margin: "0 0 24px 0" }}>
              Education
            </h3>
          </div>
        </FadeIn>
        <StaggerGroup stagger={0.08}>
          {EDUCATION.map((ed, i) => (
            <StaggerItem key={ed.school} style={{ marginBottom: i < EDUCATION.length - 1 ? "20px" : 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
                <span style={{ fontFamily: font.display, fontSize: "15px", fontWeight: 700, color: color.ink }}>{ed.school}</span>
                <span style={{ fontFamily: font.mono, fontSize: "13px", color: color.dim }}>{ed.year}</span>
              </div>
              <p style={{ fontFamily: font.mono, fontSize: "13px", color: color.soft, margin: 0 }}>{ed.programme}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </>
  );
}
