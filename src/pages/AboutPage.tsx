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
          Senior Product Designer, living and working in the United Kingdom.
        </h1>
      </header>

      <FadeIn delay={0.2}>
        <div style={{ maxWidth: "640px", marginBottom: "48px" }}>
          <p style={{ ...para, marginBottom: "24px" }}>
            My name is Mubarak, though most people call me Layor. I lead design at <strong style={strong}>IndigoEMR</strong>, a
            healthcare platform used by more than 200,000 patients in Nigeria and Kenya. My users are clinicians, hospital admins,
            and patients, and a lot of them are putting their information into software like this for the first time. Much of the
            job is getting someone to trust a screen enough to rely on it.
          </p>
          <p style={{ ...para, marginBottom: "24px" }}>
            Before this I was principal designer at <strong style={strong}>First Bank Nigeria</strong>, where I led the redesign
            of the banking apps millions of customers use. Earlier I founded and led product at{" "}
            <strong style={strong}>Sharply Africa</strong>, spending two years learning what low-connectivity African markets
            actually demand from a product. I started out at <strong style={strong}>Summitech Computing</strong> and spent four
            years there, moving from UX research into product strategy.
          </p>
          <p style={para}>
            Most of the value I add sits between research and what actually ships. I stay close to engineering, I want to know
            what is buildable under a team's real constraints, and I treat the design system as part of the product, not a
            document beside it. I am also finishing an MSc in User Experience Design at the University of Portsmouth while I work.
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
            Most of my work has been for African markets, across healthtech, fintech, and logistics. The conditions are different
            from what most UX writing assumes. Devices are cheaper and slower, connections drop, and plenty of users are new to
            smartphones. Trust works differently too. That is the part I like most.
          </p>
          <p style={para}>
            Outside of client work I am building three of my own products. CloudScout is a mobile-first hiring tool for small
            businesses, Propty is a property and facility management platform, and BeamHC is about healthcare access. I speak and
            write about design now and then, which you can find on the More page.
          </p>
        </div>
      </FadeIn>

      <section style={{ marginBottom: "48px" }}>
        {EXPERIENCE.map((exp, i) => (
          <FadeIn key={exp.company} delay={i * 0.08}>
            <div style={{ borderTop: `1px solid ${color.border}`, paddingTop: "24px", paddingBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px", flexWrap: "wrap", gap: "8px" }}>
                <h3 style={{ fontFamily: font.display, fontSize: "15px", fontWeight: 700, color: color.ink, margin: 0 }}>{exp.company}</h3>
                <span style={{ fontFamily: font.mono, fontSize: "13px", color: color.dim }}>{exp.years}</span>
              </div>
              <p style={{ fontFamily: font.mono, fontSize: "13px", color: color.soft, margin: "0 0 10px 0", letterSpacing: "0.02em" }}>{exp.role}</p>
              <p style={{ fontFamily: font.serif, fontSize: "15px", lineHeight: 1.65, color: color.muted, margin: 0, maxWidth: "580px" }}>{exp.description}</p>
            </div>
          </FadeIn>
        ))}
      </section>

      <FadeIn delay={0.1} style={{ marginBottom: "48px" }}>
        <div style={{ borderTop: `1px solid ${color.border}`, paddingTop: "24px" }}>
          <h3 style={{ fontFamily: font.display, fontSize: "15px", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: color.dim, margin: "0 0 24px 0" }}>
            Education
          </h3>
          {EDUCATION.map((ed, i) => (
            <div key={ed.school} style={{ marginBottom: i < EDUCATION.length - 1 ? "20px" : 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
                <span style={{ fontFamily: font.display, fontSize: "15px", fontWeight: 700, color: color.ink }}>{ed.school}</span>
                <span style={{ fontFamily: font.mono, fontSize: "13px", color: color.dim }}>{ed.year}</span>
              </div>
              <p style={{ fontFamily: font.mono, fontSize: "13px", color: color.soft, margin: 0 }}>{ed.programme}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </>
  );
}
