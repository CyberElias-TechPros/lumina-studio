import type { BlogBlock } from "@/data/blog";

function blockText(block: BlogBlock | string): string {
  if (typeof block === "string") return block;
  if (block.type === "p" || block.type === "h2") return block.text;
  if (block.type === "ul") return block.items.join(" ");
  return `${block.alt} ${block.caption}`;
}

/** Plain text of a note body, used for search and reading time. */
export function bodyText(body: Array<BlogBlock | string>): string {
  return body.map(blockText).join(" ");
}

export function wordCount(body: Array<BlogBlock | string>): number {
  return bodyText(body).split(/\s+/).filter(Boolean).length;
}

/** Honest reading time from actual body length (~200 wpm). */
export function readingMinutes(body: Array<BlogBlock | string>): number {
  return Math.max(1, Math.round(wordCount(body) / 200));
}

export function readingTimeLabel(body: Array<BlogBlock | string>): string {
  return `${readingMinutes(body)} min`;
}
