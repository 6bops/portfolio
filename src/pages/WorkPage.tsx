import { useState } from "react";
import { font, color, sectionLabel } from "../styles/theme";
import { useMounted } from "../hooks/useMounted";
import { PROJECTS } from "../data";
import { trackEvent } from "../lib/analytics";
import { ProjectCard, WorkCard, WorkFilter } from "../components/project";
import type { ProjectTier } from "../types";

const TIER_ORDER: { tier: ProjectTier; label: string; heading: string }[] = [
  { tier: "case-study", label: "Case studies", heading: "Case studies" },
  { tier: "project", label: "Projects", heading: "Projects" },
  { tier: "exploration", label: "Explorations", heading: "Explorations" },
];

export function WorkPage() {
  const loaded = useMounted();
  const [tier, setTier] = useState<"all" | ProjectTier>("all");

  const options = [
    { id: "all" as const, label: "All", count: PROJECTS.length },
    ...TIER_ORDER.map(({ tier: id, label }) => ({
      id,
      label,
      count: PROJECTS.filter((p) => p.tier === id).length,
    })).filter((o) => o.count > 0),
  ];

  const groups = TIER_ORDER.filter((g) => tier === "all" || g.tier === tier)
    .map((g) => ({ ...g, projects: PROJECTS.filter((p) => p.tier === g.tier) }))
    .filter((g) => g.projects.length > 0);

  const onFilter = (id: "all" | ProjectTier) => {
    setTier(id);
    trackEvent("work_filter", { tier: id });
  };

  return (
    <>
      <header style={{ marginBottom: "48px" }}>
        <h1
          style={{
            fontFamily: font.display,
            fontWeight: 800,
            fontSize: "clamp(32px, 5.5vw, 56px)",
            lineHeight: 1.12,
            letterSpacing: "-0.03em",
            maxWidth: "700px",
            marginBottom: "24px",
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
          Three case studies in depth, plus the other work I've shipped.
        </p>
      </header>
      <WorkFilter options={options} value={tier} onChange={onFilter} />
      <section>
        {groups.map((group) => (
          <div key={group.tier}>
            {tier === "all" && <h2 style={{ ...sectionLabel, marginBottom: "40px" }}>{group.heading}</h2>}
            {group.tier === "case-study" ? (
              group.projects.map((project, i) => <ProjectCard key={project.slug} project={project} index={i} />)
            ) : (
              <div className="work-grid">
                {group.projects.map((project, i) => (
                  <WorkCard key={project.slug} project={project} index={i} />
                ))}
              </div>
            )}
          </div>
        ))}
      </section>
    </>
  );
}
