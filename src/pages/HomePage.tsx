import { color, font } from "../styles/theme";
import { useMounted } from "../hooks/useMounted";
import { PROJECTS } from "../data";
import { FadeIn, PillLink } from "../components/ui";
import { ProjectCard } from "../components/project";

const HERO_WORDS = [
  { text: "Mubarak", delay: 0 },
  { text: "(Layor)", delay: 0.06 },
  { text: "Salami", delay: 0.12 },
  { text: "—", delay: 0.18 },
  { text: "Senior", delay: 0.24 },
  { text: "Product", delay: 0.3 },
  { text: "Designer.", delay: 0.36 },
];

export function HomePage() {
  const loaded = useMounted();
  const featured = PROJECTS.filter((p) => p.featured);

  return (
    <>
      <header style={{ marginBottom: "96px" }}>
        <h1
          style={{
            fontFamily: font.display,
            fontWeight: 800,
            fontSize: "clamp(40px, 7vw, 72px)",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            marginBottom: "24px",
          }}
        >
          {HERO_WORDS.map((w, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                marginRight: "0.28em",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.5s ease ${w.delay}s, transform 0.5s ease ${w.delay}s`,
                color: w.text === "(Layor)" ? color.faint : "inherit",
                fontSize: w.text === "(Layor)" ? "0.65em" : "inherit",
                fontWeight: w.text === "(Layor)" ? 600 : "inherit",
              }}
            >
              {w.text}
            </span>
          ))}
        </h1>
        <p
          style={{
            fontFamily: font.serif,
            fontSize: "clamp(17px, 2.2vw, 21px)",
            lineHeight: 1.65,
            color: color.muted,
            maxWidth: "600px",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s",
          }}
        >
          Senior Product Designer based in the United Kingdom. I design healthcare and financial products for emerging markets,
          currently at IndigoEMR, previously a Senior Product Designer at First Bank Nigeria. My work tends to start where research
          and engineering meet: building design systems that hold up under real constraints, and closing the gap between what
          users need and what actually ships.
        </p>
      </header>

      <section>
        {featured.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
        <FadeIn delay={0.1}>
          <div style={{ display: "flex", alignItems: "center", gap: "24px", paddingTop: "8px", marginBottom: "48px" }}>
            <span style={{ fontFamily: font.mono, fontSize: "13px", color: color.soft }}>More work</span>
            <PillLink to="/work">View all projects</PillLink>
          </div>
        </FadeIn>
      </section>

      {/* Get in touch */}
      <FadeIn delay={0.1}>
        <div
          style={{
            borderTop: `1px solid ${color.border}`,
            marginTop: "48px",
            paddingTop: "96px",
            paddingBottom: "96px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "32px",
          }}
        >
          <div>
            <p style={{ fontFamily: font.mono, fontSize: "13px", color: color.dim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "24px" }}>
              Say hello
            </p>
            <h2
              style={{
                fontFamily: font.display,
                fontWeight: 800,
                fontSize: "clamp(28px, 5vw, 52px)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: color.white,
                maxWidth: "560px",
                margin: 0,
              }}
            >
              Got a project, a role, or just want to talk design?
            </h2>
          </div>
          <p style={{ fontFamily: font.serif, fontSize: "17px", lineHeight: 1.65, color: color.soft, maxWidth: "480px", margin: 0 }}>
            I'm always open to interesting conversations, whether it's a full-time role, a contract engagement, or a design
            problem worth thinking through together.
          </p>
          {/* Plain anchor rather than <PillLink href>: that branch forces
              target="_blank", which leaves a stray blank tab on a mailto. */}
          <a href="mailto:salamilayor@gmail.com" className="pill-link pill-link--solid">
            Get in touch ↗
          </a>
        </div>
      </FadeIn>
    </>
  );
}
