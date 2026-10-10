import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
// Must match src/lib/site-url.ts. The apex (cea.ng) only redirects to www.
const SITE_URL = "https://www.cea.ng";

// Current public school pages only. Historic cinematic URLs 301 elsewhere
// and should not be advertised as live destinations.
const staticRoutes = [
  "/",
  "/about",
  "/accessibility",
  "/admissions",
  "/apply",
  "/blog",
  "/certificates/verify",
  "/contact",
  "/classes",
  "/editorial",
  "/faq",
  "/opportunities/idice-skills-to-jobs",
  "/payment",
  "/privacy",
  "/pay",
  "/refunds",
  "/schools",
  "/services",
  "/partners",
  "/request-project",
  "/shipping",
  "/shop",
  "/team",
  "/terms",
  "/visit",
  "/visit/info",
  "/visit/brochure",
  "/visit/feedback",
];

// Shop product pages and feed files. Generated from digital-products.json so
// the sitemap stays in sync with the Merchant Center feed.
const shopProductPaths = (() => {
  try {
    const raw = readFileSync(join(root, "src/data/digital-products.json"), "utf8");
    const data = JSON.parse(raw);
    const products = Array.isArray(data?.products) ? data.products : [];
    return products.map((p) => `/shop/${p.slug}`);
  } catch {
    return [];
  }
})();

function extractSlugs(file) {
  const src = readFileSync(join(root, file), "utf8");
  return [...src.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]);
}

const blogSlugs = [...new Set(extractSlugs("src/data/blog.ts"))];

function extractPublishedLectureKeys() {
  const academyRoot = join(root, "src/data/academy");
  const indexSource = readFileSync(join(academyRoot, "index.ts"), "utf8");
  const lessonImports = new Map(
    [...indexSource.matchAll(/import\s+\{\s*(\w+)\s*\}\s+from\s+"\.\/lessons\/([^"]+)";/g)].map(
      (match) => [match[1], match[2]],
    ),
  );
  const keysByVariable = new Map();

  for (const [variable, filename] of lessonImports) {
    const lessonSource = readFileSync(join(academyRoot, "lessons", `${filename}.ts`), "utf8");
    keysByVariable.set(
      variable,
      [...lessonSource.matchAll(/^  (?:"([a-z0-9-]+)"|([a-z][a-z0-9-]*)):/gm)].map(
        (m) => m[1] ?? m[2],
      ),
    );
  }

  const published = new Set();
  for (const match of indexSource.matchAll(
    /withCoursePrefix\("([a-z0-9-]+)",\s*\{([\s\S]*?)\}\s*\)/g,
  )) {
    const course = match[1];
    const variables = [...match[2].matchAll(/\.\.\.(\w+)/g)].map((m) => m[1]);
    for (const variable of variables) {
      const lessonSlugs = keysByVariable.get(variable);
      if (!lessonSlugs) throw new Error(`Could not resolve lesson data variable ${variable}`);
      for (const slug of lessonSlugs) published.add(`${course}/${slug}`);
    }
  }

  if (published.size === 0)
    throw new Error("No published class lectures were found for the sitemap");
  return published;
}

const publishedLectureKeys = extractPublishedLectureKeys();
const classUrls = [];
const catalogSessionKeys = new Set();
let totalSessionCount = 0;
const catalog = readFileSync(join(root, "src/data/academy/catalog.ts"), "utf8");
const courseRe = /slug:\s*"([a-z0-9-]+)",\s*\n\s*title:/g;
const courseSlugs = [...new Set([...catalog.matchAll(courseRe)].map((m) => m[1]))];
const sessionRe = /s\(\s*\d+,\s*\d+,\s*"[^"]*",\s*"([a-z0-9-]+)"/g;
const boundaries = [...catalog.matchAll(courseRe)].map((match) => ({
  slug: match[1],
  index: match.index,
}));

for (const course of courseSlugs) classUrls.push({ type: "course", course });
for (let i = 0; i < boundaries.length; i++) {
  const start = boundaries[i].index;
  const end = i + 1 < boundaries.length ? boundaries[i + 1].index : catalog.length;
  const block = catalog.slice(start, end);
  for (const match of block.matchAll(sessionRe)) {
    totalSessionCount++;
    const key = `${boundaries[i].slug}/${match[1]}`;
    catalogSessionKeys.add(key);
    if (publishedLectureKeys.has(key)) {
      classUrls.push({ type: "session", course: boundaries[i].slug, session: match[1] });
    }
  }
}

for (const key of publishedLectureKeys) {
  if (!catalogSessionKeys.has(key)) {
    throw new Error(`Published class lecture has no matching course session: ${key}`);
  }
}

const publishedSessionUrlCount = classUrls.filter((url) => url.type === "session").length;
if (publishedSessionUrlCount !== publishedLectureKeys.size) {
  throw new Error(
    `Sitemap lecture mismatch: expected ${publishedLectureKeys.size}, found ${publishedSessionUrlCount}`,
  );
}

const urls = [
  ...staticRoutes.map((path) => ({ loc: `${SITE_URL}${path}` })),
  ...shopProductPaths.map((path) => ({ loc: `${SITE_URL}${path}` })),
  ...blogSlugs.map((slug) => ({ loc: `${SITE_URL}/blog/${slug}` })),
  ...classUrls
    .filter((url) => url.type === "course")
    .map((url) => ({ loc: `${SITE_URL}/classes/${url.course}` })),
  ...classUrls
    .filter((url) => url.type === "session")
    .map((url) => ({ loc: `${SITE_URL}/classes/${url.course}/${url.session}` })),
];

const uniqueUrls = new Set(urls.map((url) => url.loc));
if (uniqueUrls.size !== urls.length)
  throw new Error("Duplicate URLs found while generating sitemap.xml");

// Do not manufacture lastmod dates or publish outline-only sessions as complete
// learning resources. A session enters the sitemap only when its lecture data
// exists in the academy lesson library.
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>\n    <loc>${url.loc}</loc>\n  </url>`).join("\n")}
</urlset>
`;

writeFileSync(join(root, "public", "sitemap.xml"), xml);
console.log(
  `sitemap.xml written: ${urls.length} URLs (${staticRoutes.length} static, ${blogSlugs.length} notes, ${classUrls.filter((url) => url.type === "course").length} courses, ${classUrls.filter((url) => url.type === "session").length} full class lectures; ${totalSessionCount - classUrls.filter((url) => url.type === "session").length} outline-only sessions excluded)`,
);
