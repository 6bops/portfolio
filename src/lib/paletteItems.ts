import { PROJECTS } from "../data/projects";
import { featuredRank } from "../data/featured";
import { CONTACT_EMAIL } from "./contact";
import { trackEvent } from "./analytics";

export type PaletteItem = { id: string; label: string; group: "Pages" | "Projects" | "Actions"; run: () => void };

const PAGES = [
  { label: "Home", to: "/" },
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "More", to: "/more" },
];

/** Pure item list (no React/DOM imports) so the filter can be exercised from the console. */
export function buildPaletteItems(deps: {
  navigate: (to: string) => void;
  toggleTheme: () => void;
}): PaletteItem[] {
  const pages: PaletteItem[] = PAGES.map((p) => ({
    id: `page:${p.to}`,
    label: p.label,
    group: "Pages",
    run: () => deps.navigate(p.to),
  }));

  // previewOnly projects have no case study page to land on.
  const projects: PaletteItem[] = PROJECTS.filter((p) => !p.previewOnly)
    .sort((a, b) => featuredRank(a.slug) - featuredRank(b.slug))
    .map((p) => ({
      id: `project:${p.slug}`,
      label: p.title,
      group: "Projects",
      run: () => deps.navigate(`/work/${p.slug}`),
    }));

  const actions: PaletteItem[] = [
    {
      id: "action:email",
      label: "Email Layor",
      group: "Actions",
      run: () => {
        const href = `mailto:${CONTACT_EMAIL}`;
        trackEvent("contact_click", { href, from_path: "command_palette" });
        window.location.href = href;
      },
    },
    { id: "action:theme", label: "Toggle theme", group: "Actions", run: deps.toggleTheme },
  ];

  return [...pages, ...projects, ...actions];
}

export function filterPaletteItems(items: PaletteItem[], query: string): PaletteItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((item) => item.label.toLowerCase().includes(q));
}
