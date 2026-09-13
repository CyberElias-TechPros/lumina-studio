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
  ["/career-guides", "monthly", "0.7"],
  ["/careers", "monthly", "0.7"],
  ["/certificates/verify", "monthly", "0.6"],
  ["/community", "monthly", "0.7"],
  ["/contact", "monthly", "0.8"],
  ["/classes", "weekly", "0.9"],
  ["/events", "weekly", "0.7"],
  ["/faq", "monthly", "0.8"],
  ["/glossary", "weekly", "0.7"],
  ["/library", "weekly", "0.7"],
  ["/marketplace", "daily", "0.7"],
  ["/pricing", "monthly", "0.8"],
  ["/privacy", "yearly", "0.4"],
  ["/programs", "weekly", "0.9"],
  ["/programs/compare", "monthly", "0.8"],
  ["/resources", "weekly", "0.7"],
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

// Academy curriculum: course slugs from the catalog, session slugs per course.
let classUrls = [];
try {
  const catalog = readFileSync(join(root, "src/data/academy/catalog.ts"), "utf8");
  const courseRe = /slug:\s*"([a-z0-9-]+)",\s*\n\s*title:/g;
  const slugs = [...new Set([...catalog.matchAll(courseRe)].map((m) => m[1]))];
  // Session slugs appear as s(n, w, "Title", "session-slug", [...])
  for (const slug of slugs) {
    classUrls.push({ type: "course", course: slug });
  }
  const sessionRe = /s\(\s*\d+,\s*\d+,\s*"[^"]*",\s*"([a-z0-9-]+)"/g;
  // Sessions are listed inside each course object; walk course boundaries.
  const boundaries = [];
  for (const m of catalog.matchAll(/slug:\s*"([a-z0-9-]+)",\s*\n\s*title:/g)) {
    boundaries.push({ slug: m[1], index: m.index });
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
  ...librarySlugs.map((slug) => ({
    loc: `${SITE_URL}/library/${slug}`,
    lastmod: today,
    changefreq: "weekly",
    priority: "0.6",
  })),
  ...glossarySlugs.map((slug) => ({
    loc: `${SITE_URL}/glossary/${slug}`,
    lastmod: today,
    changefreq: "monthly",
    priority: "0.7",
  })),
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
      priority: "0.8",
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
  `sitemap.xml written: ${urls.length} URLs (${staticRoutes.length} static, ${programSlugs.length} programs, ${blogSlugs.length} posts, ${librarySlugs.length} library collections, ${glossarySlugs.length} glossary terms, ${moduleUrls.length} module detail pages, ${careerGuideSlugs.length} career guides, ${resourceSlugs.length} resources, ${classUrls.filter((u) => u.type === "course").length} academy courses, ${classUrls.filter((u) => u.type === "session").length} class session pages)`,
);
