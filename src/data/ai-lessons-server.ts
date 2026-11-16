/**
 * Runtime loader for the pre-rendered AI-from-scratch lesson data.
 * The rendered bundles (scripts/generate-ai-lessons.mjs →
 * src/content/ai-lessons-rendered/, git-ignored) are read from disk on the
 * server with a per-process cache; they are deliberately NOT part of the
 * compiled bundle so builds stay small. Server components only.
 */
import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { AiLessonModule } from "@/data/ai-from-scratch";

const phaseCache = new Map<string, Promise<readonly AiLessonModule[]>>();

export function loadPhaseLessons(phase: string): Promise<readonly AiLessonModule[]> {
  let cached = phaseCache.get(phase);
  if (!cached) {
    cached = readFile(
      join(process.cwd(), "src/content/ai-lessons-rendered", `${phase}.json`),
      "utf8",
    ).then((raw) => JSON.parse(raw) as AiLessonModule[]);
    phaseCache.set(phase, cached);
  }
  return cached;
}
