import { createContext, useCallback, useContext, useMemo, useRef, useState, type MutableRefObject, type ReactNode } from "react";
import type { SkinId } from "../data/skins";
import { trackEvent } from "../lib/analytics";

export type SkinSource = "click" | "autocycle" | "palette";

type SkinContextValue = {
  active: SkinId;
  select: (id: SkinId, source: SkinSource) => void;
};

const SkinContext = createContext<SkinContextValue | null>(null);
// Kept apart from SkinContext so the public useSkin() shape stays { active, select }.
const CycleDoneContext = createContext<MutableRefObject<boolean> | null>(null);

/**
 * Holds which design-system skin the hero stage is showing. Lives above the router
 * outlet in Layout so other surfaces (e.g. the command palette) can switch it too.
 */
export function SkinProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<SkinId>("indigoemr");
  // True once the intro cycle has played, been interrupted, or the visitor has chosen a
  // skin. Held here (not at module level) so it lives and dies with the page's provider,
  // and survives the stage unmounting when the visitor navigates away and back.
  const cycleDone = useRef(false);

  const select = useCallback((id: SkinId, source: SkinSource) => {
    if (source !== "autocycle") cycleDone.current = true;
    setActive(id);
    trackEvent("skin_select", { skin: id, source });
  }, []);

  const value = useMemo(() => ({ active, select }), [active, select]);
  return (
    <SkinContext.Provider value={value}>
      <CycleDoneContext.Provider value={cycleDone}>{children}</CycleDoneContext.Provider>
    </SkinContext.Provider>
  );
}

export function useSkin(): SkinContextValue {
  const ctx = useContext(SkinContext);
  if (!ctx) throw new Error("useSkin must be used inside <SkinProvider>");
  return ctx;
}

/** Internal: lets useSkinCycle share the provider's "intro cycle is finished" flag. */
export function useCycleDone(): MutableRefObject<boolean> {
  const ref = useContext(CycleDoneContext);
  if (!ref) throw new Error("useCycleDone must be used inside <SkinProvider>");
  return ref;
}
