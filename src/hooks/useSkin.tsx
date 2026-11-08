import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { SkinId } from "../data/skins";
import { trackEvent } from "../lib/analytics";

export type SkinSource = "click" | "autocycle" | "palette";

type SkinContextValue = {
  active: SkinId;
  select: (id: SkinId, source: SkinSource) => void;
};

const SkinContext = createContext<SkinContextValue | null>(null);

/**
 * Holds which design-system skin the hero stage is showing. Lives above the router
 * outlet in Layout so other surfaces (e.g. the command palette) can switch it too.
 */
export function SkinProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<SkinId>("indigoemr");

  const select = useCallback((id: SkinId, source: SkinSource) => {
    setActive(id);
    trackEvent("skin_select", { skin: id, source });
  }, []);

  const value = useMemo(() => ({ active, select }), [active, select]);
  return <SkinContext.Provider value={value}>{children}</SkinContext.Provider>;
}

export function useSkin(): SkinContextValue {
  const ctx = useContext(SkinContext);
  if (!ctx) throw new Error("useSkin must be used inside <SkinProvider>");
  return ctx;
}
