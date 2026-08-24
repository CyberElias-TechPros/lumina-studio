/** Honest reading time computed from actual body length (~200 wpm). */
export function readingTimeLabel(body: string[]): string {
  const words = body.join(" ").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min`;
}
