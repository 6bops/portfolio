import { useEffect, useState } from "react";

/** No roaming cursor or entrance in the stacked layout (860px and below) or where there is no hover (touch). */
const NO_HOVER = "(max-width: 860px), (pointer: coarse), (hover: none)";
/** A mouse or trackpad: the only place the visitor's own cursor is replaced. */
export const FINE_POINTER = "(hover: hover) and (pointer: fine)";

function useMedia(query: string): boolean {
  // Initialised synchronously from matchMedia, so there is no flash or layout change at load.
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

export const useNoHover = () => useMedia(NO_HOVER);
export const useFinePointer = () => useMedia(FINE_POINTER);
