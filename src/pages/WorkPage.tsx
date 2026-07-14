import { font, color } from "../styles/theme";
import { useMounted } from "../hooks/useMounted";
import { PROJECTS } from "../data";
import { ProjectCard } from "../components/project";

export function WorkPage() {
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
            maxWidth: "700px",
            marginBottom: "20px",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          Selected work
        </h1>
        <p
          style={{
            fontFamily: font.serif,
            fontSize: "17px",
            lineHeight: 1.65,
            color: color.muted,
            maxWidth: "520px",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
          }}
        >
          A complete list of projects, including work in early stages and projects under NDA.
        </p>
      </header>
      <section>
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </section>
    </>
  );
}
