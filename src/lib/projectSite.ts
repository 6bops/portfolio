import type { Project } from "../types";

/** A project's own website: its website link, else an https call-to-action link (Rabii, Mumbuddie, Propty). */
export function projectSite(project: Project | undefined): string | undefined {
  return project?.websiteLink ?? (project?.ctaLink?.startsWith("https://") ? project.ctaLink : undefined);
}
