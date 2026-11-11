import type { Project } from "../types";

/** A project's own website: its website link, else its call-to-action link (Rabii, Mumbuddie, Propty). Only https URLs count. */
export function projectSite(project: Project | undefined): string | undefined {
  const isHttps = (url?: string): url is string => Boolean(url?.startsWith("https://"));
  return [project?.websiteLink, project?.ctaLink].find(isHttps);
}
