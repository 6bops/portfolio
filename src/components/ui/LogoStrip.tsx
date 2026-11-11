import { Marquee } from "./Marquee";

/**
 * Placeholder wordmark chips — swap for real logo images once assets exist.
 * Each item is passed to `Marquee` as a ready-made node rather than plain text.
 */
export function LogoStrip({ names, duration = 26 }: { names: string[]; duration?: number }) {
  const chips = names.map((name) => (
    <span key={name} className="logo-chip">
      {name}
    </span>
  ));

  return (
    <div className="logo-strip">
      <Marquee items={chips} duration={duration} separator="" />
    </div>
  );
}
