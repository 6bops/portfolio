import { motion } from "framer-motion";
import { color, font } from "../styles/theme";
import { useMounted } from "../hooks/useMounted";
import { useScrollDepthTracking } from "../hooks/useScrollDepthTracking";
import { useSectionViewTracking } from "../hooks/useSectionViewTracking";
import { trackEvent } from "../lib/analytics";
import { PROJECTS, featuredRank } from "../data";
import {
  FadeIn,
  RevealText,
  StaggerGroup,
  StaggerItem,
  Marquee,
  ResultsStage,
  SkillsBreakdown,
  ProcessTimeline,
  LogoStrip,
  Magnetic,
  PillLink,
  IconDesignSystems,
  IconZeroToOne,
  IconDataInformed,
  IconFindingProblems,
  IconDesigningWithAI,
} from "../components/ui";
import type { SkillGroup } from "../components/ui";
import { ProjectCard } from "../components/project";

const HERO_WORDS = [
  { text: "Mubarak", delay: 0 },
  { text: "(Layor)", delay: 0.06 },
  { text: "Salami.", delay: 0.12 },
];

/** Placeholder wordmarks — swap for real logo assets once available. */
const COMPANY_NAMES = ["IndigoEMR", "FirstBank", "Sharply", "Summitech"];

const WHAT_I_DO = [
  {
    heading: "Design Systems",
    body: "Built 10+, one for every project: typography, colour, spacing, and component libraries that other teams still run on years later.",
    Icon: IconDesignSystems,
  },
  {
    heading: "0 to 1 Product Design",
    body: "Independently designed and shipped native mobile apps, business tools, and internal platforms from research through production.",
    Icon: IconZeroToOne,
  },
  {
    heading: "Data-Informed Design",
    body: "Used behavioural data, PostHog, Hotjar, and direct research to find where products actually broke down, then redesigned around what I found rather than what was assumed.",
    Icon: IconDataInformed,
  },
  {
    heading: "Finding Problems Before the Brief",
    body: "Identified the case for a new sales function, a platform rebuild, and a navigation restructure, all before being asked to, by tracing where the real friction was and building the argument for fixing it.",
    Icon: IconFindingProblems,
  },
  {
    heading: "Designing with AI",
    body: "Use AI tools, Claude Code and GitHub Copilot among them, to iterate and demo concepts fast, often ahead of a formal Figma handoff. At IndigoEMR I took this further, running workshops teaching product managers to test hypotheses with AI before roadmap commitment, and worked with engineering to build a dedicated experiments environment where AI-generated concepts get tested with real users before anyone commits to building them.",
    Icon: IconDesigningWithAI,
  },
];

const SKILLS: SkillGroup[] = [
  {
    heading: "Tools",
    rows: [
      { title: "Figma", body: "Interface design, prototyping, and the component libraries behind 10+ design systems." },
      { title: "PostHog & Hotjar", body: "Behavioural analytics and session data, used to find where products actually break down." },
      { title: "Claude Code & GitHub Copilot", body: "AI-assisted iteration, used to demo concepts fast, often ahead of a formal Figma handoff." },
      { title: "Notion", body: "Process documentation and case-study writeups, shared across design, product, and engineering." },
    ],
  },
  {
    heading: "Methods",
    rows: [
      { title: "User research", body: "Interviews, usability testing, and direct observation, grounding decisions in what people actually do." },
      { title: "Design systems", body: "Typography, colour, spacing, and component libraries, built to outlast a single project." },
      { title: "Workshops & alignment", body: "Structured sessions, BRD alignment, co-design, physical flow mapping, that get a room aligned before a pixel is drawn." },
      { title: "Native + web delivery", body: "iOS, Android, React Native, and responsive web, designed and shipped end to end." },
    ],
  },
];

const PROCESS_STEPS = [
  { title: "Discover", body: "Talk to users, read the data, and find where the system and the need actually diverge." },
  { title: "Define", body: "Turn what was found into a specific problem worth solving, not a vague direction." },
  { title: "Design", body: "Explore structure and flow first, then commit to detail once the shape is right." },
  { title: "Validate", body: "Put it in front of real users before it's built, and change course on what breaks." },
  { title: "Deliver", body: "Ship it, then follow the data and feedback to see what actually happened." },
];

export function HomePage() {
  const loaded = useMounted();
  useScrollDepthTracking("home_scroll_depth");
  useSectionViewTracking("home_section_view");
  const featured = PROJECTS.filter((p) => p.featured).sort((a, b) => featuredRank(a.slug) - featuredRank(b.slug));

  return (
    <>
      <header data-track-section="hero" style={{ marginBottom: "56px" }}>
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
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
              animate={loaded ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.65, delay: w.delay, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "inline-block",
                marginRight: "0.28em",
                color: w.text === "(Layor)" ? color.faint : "inherit",
                fontSize: w.text === "(Layor)" ? "0.65em" : "inherit",
                fontWeight: w.text === "(Layor)" ? 600 : "inherit",
              }}
            >
              {w.text}
            </motion.span>
          ))}
        </h1>
        <RevealText
          as="p"
          text="Senior Product Designer building systems from the ground up."
          delay={0.35}
          stagger={0.045}
          style={{
            fontFamily: font.display,
            fontWeight: 700,
            fontSize: "clamp(20px, 3vw, 28px)",
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
            color: color.white,
            maxWidth: "620px",
            marginBottom: "20px",
          }}
        />
        <FadeIn delay={0.55}>
          <p
            style={{
              fontFamily: font.serif,
              fontSize: "clamp(17px, 2.2vw, 21px)",
              lineHeight: 1.65,
              color: color.muted,
              maxWidth: "600px",
            }}
          >
            Based in the UK, I've spent 9+ years designing and shipping digital products across healthcare, banking, and
            logistics. I've built 10+ design systems, one for every project; three of them, IndigoEMR, FirstBank, and
            Sharply, now run across dozens of product surfaces.
          </p>
          <p
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "24px",
              fontFamily: font.mono,
              fontSize: "13px",
              color: color.soft,
            }}
          >
            <span
              aria-hidden="true"
              style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80", flexShrink: 0 }}
            />
            Open to work: full-time roles in the UK, and 0-to-1 contracts
          </p>
        </FadeIn>
      </header>

      <div data-track-section="results_stage">
        <FadeIn delay={0.65}>
          <ResultsStage />
        </FadeIn>
      </div>

      <FadeIn delay={0.8}>
        <div style={{ marginBottom: "96px" }}>
          <Marquee items={WHAT_I_DO.map((item) => item.heading)} />
        </div>
      </FadeIn>

      <section data-track-section="featured_work">
        {featured.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} pinnedMedia />
        ))}
        <FadeIn delay={0.1}>
          <div style={{ display: "flex", alignItems: "center", gap: "24px", paddingTop: "8px", marginBottom: "48px" }}>
            <span style={{ fontFamily: font.mono, fontSize: "13px", color: color.soft }}>More work</span>
            <PillLink to="/work">View all projects</PillLink>
          </div>
        </FadeIn>
      </section>

      {/* What I Do */}
      <section data-track-section="what_i_do" style={{ marginBottom: "96px" }}>
        <FadeIn>
          <p
            style={{
              fontFamily: font.mono,
              fontSize: "13px",
              color: color.dim,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            What I do
          </p>
        </FadeIn>
        <StaggerGroup className="whatido-grid" stagger={0.08}>
          {WHAT_I_DO.map((item, i) => (
            <StaggerItem key={item.heading} className={`whatido-card${i === WHAT_I_DO.length - 1 ? " whatido-card--wide" : ""}`}>
              <div className="whatido-top">
                <item.Icon />
                <span className="whatido-index">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="whatido-heading">{item.heading}</h3>
              <p className="whatido-body">{item.body}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Skills / expertise */}
      <section data-track-section="skills" style={{ marginBottom: "96px" }}>
        <FadeIn>
          <p
            style={{
              fontFamily: font.mono,
              fontSize: "13px",
              color: color.dim,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            Tools & methods
          </p>
        </FadeIn>
        <SkillsBreakdown groups={SKILLS} />
      </section>

      {/* Process */}
      <section data-track-section="process" style={{ marginBottom: "96px" }}>
        <FadeIn>
          <p
            style={{
              fontFamily: font.mono,
              fontSize: "13px",
              color: color.dim,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "40px",
            }}
          >
            How I work
          </p>
        </FadeIn>
        <ProcessTimeline steps={PROCESS_STEPS} />
      </section>

      <FadeIn>
        <div style={{ marginBottom: "96px" }}>
          <p
            style={{
              fontFamily: font.mono,
              fontSize: "13px",
              color: color.dim,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            Companies and brands I've built for
          </p>
          <LogoStrip names={COMPANY_NAMES} />
        </div>
      </FadeIn>

      {/* Get in touch */}
      <FadeIn delay={0.1}>
        <div
          data-track-section="contact"
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
            <RevealText
              as="h2"
              text="Got a project, a role, or just want to talk design?"
              stagger={0.035}
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
            />
          </div>
          <p style={{ fontFamily: font.serif, fontSize: "17px", lineHeight: 1.65, color: color.soft, maxWidth: "480px", margin: 0 }}>
            I'm always open to interesting conversations, whether it's a full-time role, a contract engagement, or a design
            problem worth thinking through together.
          </p>
          {/* Plain anchor rather than <PillLink href>: that branch forces
              target="_blank", which leaves a stray blank tab on a mailto. */}
          <Magnetic strength={8}>
            <a
              href="mailto:salamilayor@gmail.com"
              className="pill-link pill-link--solid"
              onClick={() => trackEvent("contact_click", { href: "mailto:salamilayor@gmail.com", from_path: "homepage_hero_cta" })}
            >
              Get in touch ↗
            </a>
          </Magnetic>
        </div>
      </FadeIn>
    </>
  );
}
