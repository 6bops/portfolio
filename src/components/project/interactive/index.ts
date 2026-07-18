import type { ComponentType } from "react";
import type { InteractiveKey, ProjectImage } from "../../../types";
import { DataLibraryDemo } from "./DataLibraryDemo";
import { PartnershipBeforeFlow } from "./PartnershipBeforeFlow";


/** Registry of inline interactive showcases addressable by `interactive` key in project data. */
export const INTERACTIVE_COMPONENTS: Record<
  InteractiveKey,
  ComponentType<Pick<ProjectImage, "span">>
> = {
  dataLibrary: DataLibraryDemo,
  partnershipBeforeFlow: PartnershipBeforeFlow,
};
