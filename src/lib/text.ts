/** First sentence of a long project description, for one-line teasers. */
export const firstSentence = (text: string) => text.match(/^.*?[.!?](?=\s|$)/s)?.[0] ?? text;

/** Split prose into sentences without breaking "2.0", "10+" or "£9.4B". */
export function sentences(text: string): string[] {
  return text.split(/(?<=[.!?])\s+(?=[A-Z"“£₦0-9])/).filter(Boolean);
}
