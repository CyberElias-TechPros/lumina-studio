import type { BlogBlock } from "@/data/blog";

function blockText(block: BlogBlock | string): string {
  if (typeof block === "string") return block;
  if (block.type === "p" || block.type === "h2") return block.text;
  if (block.type === "ul") return block.items.join(" ");
  return `${block.alt} ${block.caption}`;
}

/** Honest reading time from actual body length (~200 wpm). */
export function readingTimeLabel(body: Array<BlogBlock | string>): string {
  const words = body
    .map(blockText)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min`;
}
