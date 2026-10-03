// Generates src/data/library-catalog.json from the public library API at build time.
// This lets the marketing site server-render the full public library for crawlers.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://cea-api.cyber-e54.workers.dev";
const OUT = resolve(process.cwd(), "src/data/library-catalog.json");

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

async function main() {
  const url = `${API_URL}/v1/library/catalog?limit=10000`;
  const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`catalog fetch failed: ${res.status}`);
  const data = await res.json();
  const items = Array.isArray(data.items) ? data.items : [];

  // Keep only genuinely public, link-bearing items.
  const publicItems = items.filter((i) => !i.isProtected && i.url);

  // Group by folderPath; compute slugs per unique path.
  const byPath = new Map();
  for (const item of publicItems) {
    const path = item.folderPath?.trim() || "General";
    if (!byPath.has(path)) byPath.set(path, []);
    byPath.get(path).push({
      name: item.name,
      kind: item.kind,
      url: item.url,
    });
  }

  const usedSlugs = new Set();
  const categories = [...byPath.entries()]
    .map(([path, entries]) => {
      entries.sort((a, b) => a.name.localeCompare(b.name));
      let slug = slugify(path);
      while (usedSlugs.has(slug)) slug = `${slug}-x`;
      usedSlugs.add(slug);
      return {
        slug,
        path,
        count: entries.length,
        items: entries,
      };
    })
    .sort((a, b) => b.count - a.count);

  const payload = {
    generatedAt: new Date().toISOString(),
    source: url,
    totalItems: publicItems.length,
    categories,
  };

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(payload, null, 2));
  console.log(
    `library-catalog.json: ${payload.totalItems} items across ${categories.length} categories -> ${OUT}`,
  );
}

main().catch((err) => {
  console.error("generate-library-data failed:", err.message);
  // Do not fail the build on API hiccups: keep any existing snapshot.
  console.warn("keeping existing library-catalog.json (if present)");
});
