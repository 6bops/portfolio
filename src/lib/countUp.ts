export type StatParts = { prefix: string; number: number; suffix: string };

/**
 * Splits a stat like "200K+" into the part that counts up and the text around it.
 * Returns null unless the value holds exactly one integer, so "Digitized" and
 * "281 → 50,000+" are left alone rather than animated into nonsense.
 */
export function parseStatValue(value: string): StatParts | null {
  const runs = [...value.matchAll(/\d+/g)];
  if (runs.length !== 1) return null;
  const [run] = runs;
  const start = run.index ?? 0;
  return { prefix: value.slice(0, start), number: Number(run[0]), suffix: value.slice(start + run[0].length) };
}
