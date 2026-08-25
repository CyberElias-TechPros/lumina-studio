import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = "https://cea.ng";

// Static public routes with change frequency + priority.
const staticRoutes = [
  ["/", "weekly", "1.0"],
  ["/about", "monthly", "0.8"],
  ["/accessibility", "yearly", "0.4"],
  ["/admissions", "weekly", "0.9"],
  ["/alumni", "monthly", "0.7"],
  ["/apply", "weekly", "0.9"],
  ["/blog", "weekly", "0.8"],
  ["/careers", "monthly", "0.7"],
  ["/certificates/verify", "monthly", "0.6"],
  ["/community", "monthly", "0.7"],
  ["/contact", "monthly", "0.8"],
  ["/engines", "weekly", "0.8"],
  ["/events", "weekly", "0.7"],
  ["/faq", "monthly", "0.8"],
  ["/library", "weekly", "0.7"],
  ["/marketplace", "daily", "0.7"],
  ["/pricing", "monthly", "0.8"],
  ["/privacy", "yearly", "0.4"],
  ["/programs", "weekly", "0.9"],
  ["/programs/compare", "monthly", "0.8"],
  ["/scholarships", "monthly", "0.8"],
  ["/services", "weekly", "0.8"],
  ["/stories", "monthly", "0.7"],
  ["/team", "monthly", "0.6"],
  ["/terms", "yearly", "0.4"],
  ["/virtual-tour", "monthly", "0.7"],
  ["/vizier", "weekly", "0.8"],
  ["/visit", "monthly", "0.8"],
  ["/visit/info", "monthly", "0.7"],
  ["/visit/brochure", "monthly", "0.6"],
  ["/visit/feedback", "monthly", "0.5"],
  ["/work", "monthly", "0.7"],
];

function extractSlugs(file) {
  const src = readFileSync(join(root, file), "utf8");
  return [...src.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]);
}

function extractSlugsBetween(file, startRe, endRe) {
  const src = readFileSync(join(root, file), "utf8");
  const startMatch = src.match(startRe);
  if (!startMatch) return [];
  const rest = src.slice(startMatch.index + startMatch[0].length);
  const endIdx = rest.search(endRe);
  const section = endIdx === -1 ? rest : rest.slice(0, endIdx);
  return [...section.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]);
}

// Scoped extraction: programs array in site.ts; all slugs in blog-posts-new.ts.
const programSlugs = [
  ...new Set(
    extractSlugsBetween("src/data/site.ts", /export const programs/, /export const services/),
  ),
];
const blogSlugs = [
  ...new Set([
    ...extractSlugs("src/data/blog-posts-new.ts"),
    ...extractSlugsBetween("src/data/site.ts", /export const blogPosts/, /export const jobs/),
  ]),
];

// Library collection slugs from the build-time catalog snapshot.
let librarySlugs = [];
try {
  const lib = JSON.parse(readFileSync(join(root, "src/data/library-catalog.json"), "utf8"));
  librarySlugs = (lib.categories ?? []).map((c) => c.slug);
} catch {
  console.warn("library-catalog.json missing; sitemap will omit library categories");
}

const today = new Date().toISOString().slice(0, 10);

const urls = [
  ...staticRoutes.map(([path, changefreq, priority]) => ({
    loc: `${SITE_URL}${path}`,
    lastmod: today,
    changefreq,
    priority,
  })),
  ...programSlugs.map((slug) => ({
    loc: `${SITE_URL}/programs/${slug}`,
    lastmod: today,
    changefreq: "monthly",
    priority: "0.8",
  })),
  ...blogSlugs.map((slug) => ({
    loc: `${SITE_URL}/blog/${slug}`,
    lastmod: today,
    changefreq: "monthly",
    priority: "0.7",
  })),
  ...librarySlugs.map((slug) => ({
    loc: `${SITE_URL}/library/${slug}`,
    lastmod: today,
    changefreq: "weekly",
    priority: "0.6",
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("\n")}
</urlset>
`;

writeFileSync(join(root, "public", "sitemap.xml"), xml);
console.log(`sitemap.xml written: ${urls.length} URLs (${staticRoutes.length} static, ${programSlugs.length} programs, ${blogSlugs.length} posts, ${librarySlugs.length} library collections)`);
