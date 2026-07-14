import { useEffect, useState } from "react";
import type { Workstream } from "../../types";

/** Fixed right-rail navigation that tracks and scrolls between workstream sections. */
export function WorkstreamNav({ workstreams }: { workstreams: Workstream[] }) {
  const [active, setActive] = useState(workstreams[0]?.id);

  useEffect(() => {
    const elements = workstreams.map((w) => document.getElementById(w.id)).filter((el): el is HTMLElement => Boolean(el));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0, rootMargin: "-20% 0px -70% 0px" },
    );
    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [workstreams]);

  const scrollToWorkstream = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 32;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav
      className="workstream-nav"
      style={{
        position: "fixed",
        right: "32px",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        zIndex: 1001,
      }}
    >
      {workstreams.map((w) => (
        <button
          key={w.id}
          onClick={() => scrollToWorkstream(w.id)}
          className={`workstream-nav-item${active === w.id ? " active" : ""}`}
          style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "10px", background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
        >
          <span className="workstream-nav-label">{w.navLabel}</span>
          <span className="workstream-nav-dot" />
        </button>
      ))}
    </nav>
  );
}
