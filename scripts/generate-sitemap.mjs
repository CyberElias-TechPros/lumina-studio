import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = "https://cea.ng";

// Static public routes with change frequency + priority.
//
// AdSense recovery: noindexed surfaces (/stories, /work, /alumni,
// /marketplace, /community, /partners, /virtual-tour, /vizier, /engines,
// /careers, /scholarships, /library) are deliberately NOT submitted here.
// A sitemap must never contradict robots directives. Re-add each URL only
// when its page is de-noindexed per plans/adsense-recovery-plan.md.
const staticRoutes = [
  ["/", "weekly", "1.0"],
  ["/about", "monthly", "0.8"],
  ["/accessibility", "yearly", "0.4"],
  ["/admissions", "weekly", "0.9"],
  ["/apply", "weekly", "0.9"],
  ["/blog", "weekly", "0.8"],
  ["/career-guides", "monthly", "0.7"],
  ["/certificates/verify", "monthly", "0.6"],
  ["/contact", "monthly", "0.8"],
  ["/events", "weekly", "0.7"],
  ["/faq", "monthly", "0.8"],
  ["/glossary", "weekly", "0.7"],
  ["/pricing", "monthly", "0.8"],
  ["/privacy", "yearly", "0.4"],
  ["/programs", "weekly", "0.9"],
  ["/programs/compare", "monthly", "0.8"],
  ["/resources", "weekly", "0.7"],
  ["/services", "weekly", "0.8"],
  ["/team", "monthly", "0.6"],
  ["/terms", "yearly", "0.4"],
  ["/visit", "monthly", "0.8"],
  ["/visit/info", "monthly", "0.7"],
  ["/visit/brochure", "monthly", "0.6"],
  ["/visit/feedback", "monthly", "0.5"],
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
  // AdSense recovery: keep in sync with NOINDEX_SLUGS in src/routes/blog.$slug.tsx
].filter((slug) => !["why-we-are-building-cea-os"].includes(slug));

// Glossary term slugs from the build-time glossary data.
let glossarySlugs = [];
try {
  const gl = readFileSync(join(root, "src/data/glossary.ts"), "utf8");
  const matches = [...gl.matchAll(/slug:\s*"([a-z0-9-]+)"/g)];
  glossarySlugs = matches.map((m) => m[1]);
} catch {
  console.warn("glossary.ts not loadable; sitemap will omit glossary terms");
}

// Library collection slugs from the build-time catalog snapshot.
let librarySlugs = [];
try {
  const lib = JSON.parse(readFileSync(join(root, "src/data/library-catalog.json"), "utf8"));
  librarySlugs = (lib.categories ?? []).map((c) => c.slug);
} catch {
  console.warn("library-catalog.json missing; sitemap will omit library categories");
}

// Career guide slugs from the build-time career guides data.
let careerGuideSlugs = [];
try {
  const cg = readFileSync(join(root, "src/data/career-guides.ts"), "utf8");
  const matches = [...cg.matchAll(/slug:\s*"([a-z0-9-]+)"/g)];
  careerGuideSlugs = [...new Set(matches.map((m) => m[1]))];
} catch {
  console.warn("career-guides.ts not loadable; sitemap will omit career guides");
}

// Resource slugs from the build-time resources data.
let resourceSlugs = [];
try {
  const rs = readFileSync(join(root, "src/data/resources.ts"), "utf8");
  const matches = [...rs.matchAll(/slug:\s*"([a-z0-9-]+)"/g)];
  resourceSlugs = [...new Set(matches.map((m) => m[1]))];
} catch {
  console.warn("resources.ts not loadable; sitemap will omit resources");
}

// Extract module titles from programs in site.ts and compute slugified slugs.
const moduleUrls = [];
try {
  const siteSrc = readFileSync(join(root, "src/data/site.ts"), "utf8");
  // Match each program block: slug: "...", ... modules: [ ... ]
  const programRe = /slug:\s*"([a-z0-9-]+)"[\s\S]*?modules:\s*\[([^\]]*)\]/g;
  let pm;
  while ((pm = programRe.exec(siteSrc))) {
    const pSlug = pm[1];
    const moduleBlock = pm[2];
    const titleMatches = [...moduleBlock.matchAll(/title:\s*"([^"]+)"/g)];
    for (const tm of titleMatches) {
      const title = tm[1];
      const modSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      moduleUrls.push({ pSlug, modSlug });
    }
  }
} catch {
  console.warn("Could not parse modules from site.ts");
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
  // AdSense recovery: library categories + glossary terms are noindexed,
  // so they stay out of the sitemap until rebuilt (see recovery plan §6).
  // ...librarySlugs / ...glossarySlugs intentionally omitted.
  ...moduleUrls.map(({ pSlug, modSlug }) => ({
    loc: `${SITE_URL}/programs/${pSlug}/${modSlug}`,
    lastmod: today,
    changefreq: "monthly",
    priority: "0.8",
  })),
  ...careerGuideSlugs.map((slug) => ({
    loc: `${SITE_URL}/career-guides/${slug}`,
    lastmod: today,
    changefreq: "monthly",
    priority: "0.7",
  })),
  ...resourceSlugs.map((slug) => ({
    loc: `${SITE_URL}/resources/${slug}`,
    lastmod: today,
    changefreq: "monthly",
    priority: "0.7",
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
  `sitemap.xml written: ${urls.length} URLs (${staticRoutes.length} static, ${programSlugs.length} programs, ${blogSlugs.length} posts, ${moduleUrls.length} module detail pages, ${careerGuideSlugs.length} career guides, ${resourceSlugs.length} resources; library + glossary terms excluded while noindexed)`,
);
