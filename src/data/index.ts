import { PROJECTS } from "./projects";
import type { Project } from "../types";

export { PROJECTS } from "./projects";
export { EXPERIENCE } from "./experience";
export { TALKS_WRITING } from "./talksWriting";
export { STARTUPS } from "./startups";
export { WORK_LIST } from "./workList";
export { FEATURED_ORDER, featuredRank, getNextProject } from "./featured";

export const getProjectBySlug = (slug: string): Project | undefined =>
  PROJECTS.find((p) => p.slug === slug);
