/** First sentence of a long project description, for one-line teasers. */
export const firstSentence = (text: string) => text.match(/^.*?[.!?](?=\s|$)/s)?.[0] ?? text;
