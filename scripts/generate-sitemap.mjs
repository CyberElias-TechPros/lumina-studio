import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = "https://cea.ng";

// Current public school pages only. Historic cinematic URLs 301 elsewhere
// and should not be advertised as live destinations.
const staticRoutes = [
  ["/", "weekly", "1.0"],
  ["/about", "monthly", "0.8"],
  ["/accessibility", "yearly", "0.4"],
  ["/admissions", "weekly", "0.9"],
  ["/apply", "weekly", "0.9"],
  ["/blog", "weekly", "0.6"],
  ["/certificates/verify", "monthly", "0.6"],
  ["/contact", "monthly", "0.8"],
  ["/classes", "weekly", "0.9"],
  ["/faq", "monthly", "0.8"],
  ["/privacy", "yearly", "0.4"],
  ["/team", "monthly", "0.5"],
  ["/terms", "yearly", "0.4"],
  ["/visit", "monthly", "0.8"],
  ["/visit/info", "monthly", "0.6"],
  ["/visit/brochure", "monthly", "0.6"],
  ["/visit/feedback", "monthly", "0.4"],
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

const blogSlugs = [...new Set(extractSlugs("src/data/blog.ts"))];

let classUrls = [];
try {
  const catalog = readFileSync(join(root, "src/data/academy/catalog.ts"), "utf8");
  const courseRe = /slug:\s*"([a-z0-9-]+)",\s*\n\s*title:/g;
  const slugs = [...new Set([...catalog.matchAll(courseRe)].map((m) => m[1]))];
  const sessionRe = /s\(\s*\d+,\s*\d+,\s*"[^"]*",\s*"([a-z0-9-]+)"/g;
  const boundaries = [];
  for (const m of catalog.matchAll(/slug:\s*"([a-z0-9-]+)",\s*\n\s*title:/g)) {
    boundaries.push({ slug: m[1], index: m.index });
  }
  for (const slug of slugs) {
    classUrls.push({ type: "course", course: slug });
  }
  for (let i = 0; i < boundaries.length; i++) {
    const start = boundaries[i].index;
    const end = i + 1 < boundaries.length ? boundaries[i + 1].index : catalog.length;
    const block = catalog.slice(start, end);
    for (const sm of block.matchAll(sessionRe)) {
      classUrls.push({ type: "session", course: boundaries[i].slug, session: sm[1] });
    }
  }
} catch {
  console.warn("academy/catalog.ts not loadable; sitemap will omit class pages");
}

const today = new Date().toISOString().slice(0, 10);

const urls = [
  ...staticRoutes.map(([path, changefreq, priority]) => ({
    loc: `${SITE_URL}${path}`,
    lastmod: today,
    changefreq,
    priority,
  })),
  ...blogSlugs.map((slug) => ({
    loc: `${SITE_URL}/blog/${slug}`,
    lastmod: today,
    changefreq: "monthly",
    priority: "0.7",
  })),
  ...classUrls
    .filter((u) => u.type === "course")
    .map((u) => ({
      loc: `${SITE_URL}/classes/${u.course}`,
      lastmod: today,
      changefreq: "weekly",
      priority: "0.8",
    })),
  ...classUrls
    .filter((u) => u.type === "session")
    .map((u) => ({
      loc: `${SITE_URL}/classes/${u.course}/${u.session}`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.6",
    })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

writeFileSync(join(root, "public", "sitemap.xml"), xml);
console.log(
  `sitemap.xml written: ${urls.length} URLs (${staticRoutes.length} static, ${blogSlugs.length} posts, ${classUrls.filter((u) => u.type === "course").length} academy courses, ${classUrls.filter((u) => u.type === "session").length} class lectures)`,
);
