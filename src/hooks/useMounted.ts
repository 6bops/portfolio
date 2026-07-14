import { useEffect, useState } from "react";

/**
 * Returns `false` on first paint, then `true` on the next frame — used to drive
 * the page-entry fade/slide transitions. Each routed page calls this on mount,
 * replacing the old app-level `loaded` prop drilling.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return mounted;
}
