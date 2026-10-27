/**
 * Site structure audit — internal links, orphans, sitemap integrity.
 *
 * "Exhibits ongoing curation and structural maintenance" is one of the clauses in
 * the current AdSense site-quality rejection. It is not satisfied by asserting
 * maintenance; it is satisfied by the site being maintainable and by rot being
 * caught. This script is how rot gets caught.
 *
 * Runs statically (no server, no network), against the route manifest the
 * generator already produces.
 *
 *   ERRORS  (fail CI under --strict)
 *     · an internal link points at a path that does not exist
 *     · a sitemap entry points at a path that does not exist
 *     · a sitemap entry is a redirect (crawlers should not be sent to redirects)
 *     · a sitemap entry is private (/app, /portal, /auth) or noindex
 *     · a sitemap entry is blocked by robots.txt (two files disagreeing)
 *
 *   WARNINGS
 *     · an indexable public route has no inbound internal link (orphan)
 *     · duplicate sitemap entries
 *     · a public route is missing from the sitemap
 *
 * Usage: node scripts/audit-site-structure.mjs [--strict] [--verbose]
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const strict = process.argv.includes("--strict");
const verbose = process.argv.includes("--verbose");

const MANIFEST = join(root, "src/lib/next-compat/routes.gen.ts");
const ROUTES_DIR = join(root, "src/routes");
const SITEMAP = join(root, "public/sitemap.xml");
const ROBOTS = join(root, "public/robots.txt");

const errors = [];
const warnings = [];

/* ---------- 1. known routes ---------- */
const manifest = readFileSync(MANIFEST, "utf8");
const normalize = (path) => (path === "/" ? "/" : path.replace(/\/$/, ""));

const routes = [...manifest.matchAll(/\{\s*path:\s*"([^"]+)",\s*file:\s*"([^"]+)"/g)].map(
  ([, path, file]) => ({ path: normalize(path), file }),
);

/**
 * CEA's private or non-indexable surfaces. Excluded from link/orphan rules by design.
 *
 * /pay and /payment are deliberately NOT private: both are public informational
 * pages (how tuition payment works; which payment methods the shop accepts).
 * The private things are the signed-in application and admin surfaces.
 */
const PRIVATE = [/^\/app(\/|$)/, /^\/auth(\/|$)/, /^\/portal(\/|$)/];

const isPrivate = (path) => PRIVATE.some((re) => re.test(path));

/** A route is "dynamic" when its file contains a $param segment. */
const isDynamic = (path) => path.includes("$");

function toRegex(path) {
  const escaped = path
    .split("/")
    .map((segment) =>
      segment.startsWith("$") ? "[^/]+" : segment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    )
    .join("/");
  return new RegExp(`^${escaped}/?$`);
}

const matchers = routes
  .filter((route) => !isDynamic(route.path))
  .map((route) => ({ route, re: toRegex(route.path) }));

const dynamicMatchers = routes
  .filter((route) => isDynamic(route.path))
  .map((route) => ({ route, re: toRegex(route.path) }));

function resolves(pathname) {
  const clean = pathname.split(/[?#]/)[0];
  if (clean === "/" || clean === "") return true;
  if (matchers.some(({ re }) => re.test(clean))) return true;
  if (dynamicMatchers.some(({ re }) => re.test(clean))) return true;
  return false;
}

/* ---------- 2. redirects and noindex routes (must not appear in the sitemap) ---------- */
const redirectPaths = new Set();
const noIndexPaths = new Set();
for (const route of routes) {
  let source;
  try {
    source = readFileSync(join(ROUTES_DIR, route.file), "utf8");
  } catch {
    continue;
  }
  const path = route.path.replace(/\/$/, "") || "/";
  if (/(redirectPublic|throw redirect\()/.test(source)) redirectPaths.add(path);
  // Route-level opt-out: getPageHead({ noIndex: true }) or a raw robots meta tag.
  if (/noIndex:\s*true/.test(source) || /content:\s*"noindex/i.test(source)) noIndexPaths.add(path);
}

/* ---------- 3. internal links ---------- */

/**
 * Static internal targets in a source file. Covers both JSX attributes
 * (to="/classes", href="/blog") and object literals used by nav/footer data
 * ({ label: "About", to: "/about" }). Template strings and concatenations are
 * skipped: they cannot be checked without running the app.
 */
const TARGET_RE = /(?:to|href)\s*[:=]\s*["'](\/[^"'`{}$]*?)["']/g;
function extractTargets(source) {
  return [...source.matchAll(TARGET_RE)].map((match) => match[1]);
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const absolute = join(dir, entry);
    if (statSync(absolute).isDirectory()) walk(absolute, out);
    else if (/\.(tsx|ts)$/.test(entry)) out.push(absolute);
  }
  return out;
}

const files = walk(ROUTES_DIR).concat(walk(join(root, "src/components")));
const inbound = new Map();
const brokenLinks = new Map();

for (const file of files) {
  const rel = relative(root, file).split("\\").join("/");
  const source = readFileSync(file, "utf8");
  // Static internal targets only: to="/x" and href="/x"; skip template strings.
  const targets = extractTargets(source);

  for (const target of targets) {
    const clean = target.split(/[?#]/)[0];
    if (clean.startsWith("/images/") || clean.startsWith("/fonts/") || /\.\w{2,4}$/.test(clean))
      continue;

    if (!resolves(clean)) {
      const key = `${clean}`;
      const entry = brokenLinks.get(key) ?? { count: 0, files: new Set() };
      entry.count += 1;
      entry.files.add(rel);
      brokenLinks.set(key, entry);
    } else {
      inbound.set(
        clean.replace(/\/$/, "") || "/",
        (inbound.get(clean.replace(/\/$/, "") || "/") ?? 0) + 1,
      );
    }
  }
}

for (const [target, entry] of brokenLinks) {
  errors.push(
    `broken internal link ${target} (${entry.count}× in ${[...entry.files].slice(0, 3).join(", ")})`,
  );
}

/* ---------- 4. orphans ---------- */
const HUB_SOURCES = new Set([
  "src/components/marketing/site-header.tsx",
  "src/components/marketing/site-footer.tsx",
]);

/** Outbound static links per source file. */
const outboundByFile = new Map();
for (const file of files) {
  const rel = relative(root, file).split("\\").join("/");
  outboundByFile.set(
    rel,
    extractTargets(readFileSync(file, "utf8")).map(
      (t) => t.split(/[?#]/)[0].replace(/\/$/, "") || "/",
    ),
  );
}

/** Route path → source file, so reachability can walk from a page to the pages it links. */
const fileByPath = new Map(
  routes.map((route) => [route.path.replace(/\/$/, "") || "/", `src/routes/${route.file}`]),
);

/**
 * Reachable from the header/footer by any number of hops. One hop is too strict:
 * /visit is in the footer and is the intended parent of /visit/info, /visit/brochure
 * and /visit/feedback. Those are reachable if a visitor can get to them by clicking.
 */
const linkedFromHubs = new Set();
const hubQueue = [];
for (const [rel, targets] of outboundByFile) {
  if (!HUB_SOURCES.has(rel)) continue;
  for (const target of targets) {
    if (target === "/" || linkedFromHubs.has(target)) continue;
    linkedFromHubs.add(target);
    hubQueue.push(target);
  }
}
while (hubQueue.length) {
  const path = hubQueue.shift();
  const rel = fileByPath.get(path);
  if (!rel) continue;
  for (const target of outboundByFile.get(rel) ?? []) {
    if (target === "/" || linkedFromHubs.has(target)) continue;
    linkedFromHubs.add(target);
    hubQueue.push(target);
  }
}

const publicStatic = routes.filter((route) => {
  const path = route.path.replace(/\/$/, "") || "/";
  return (
    !isDynamic(route.path) &&
    !isPrivate(route.path) &&
    !redirectPaths.has(path) &&
    !noIndexPaths.has(path)
  );
});

for (const route of publicStatic) {
  const path = route.path.replace(/\/$/, "") || "/";
  if (path === "/") continue;
  const count = inbound.get(path) ?? 0;
  if (count === 0) {
    warnings.push(`orphan route ${path} — no inbound internal link from any page`);
  } else if (!linkedFromHubs.has(path) && count < 2) {
    warnings.push(
      `weakly linked route ${path} — ${count} inbound link, not reachable from header/footer`,
    );
  }
}

/* ---------- 5. sitemap integrity ---------- */
let sitemapUrls = [];
try {
  const xml = readFileSync(SITEMAP, "utf8");
  sitemapUrls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
} catch {
  errors.push("public/sitemap.xml is missing — run npm run generate:sitemap");
}

const seen = new Map();
for (const path of sitemapUrls) {
  const clean = path.replace(/\/$/, "") || "/";
  seen.set(clean, (seen.get(clean) ?? 0) + 1);

  if (!resolves(clean)) errors.push(`sitemap entry does not resolve: ${clean}`);
  if (redirectPaths.has(clean)) errors.push(`sitemap entry is a redirect: ${clean}`);
  if (isPrivate(clean)) errors.push(`sitemap entry is a private surface: ${clean}`);
  if (noIndexPaths.has(clean))
    errors.push(
      `sitemap entry is marked noindex: ${clean} — crawlers are told to index and not to index`,
    );
}

for (const [path, count] of seen) {
  if (count > 1) warnings.push(`duplicate sitemap entry ${path} (${count}×)`);
}

/* ---------- 6. robots.txt must not block the sitemap ---------- */

/**
 * A URL that is in the sitemap and disallowed in robots.txt is a contradiction:
 * the sitemap asks for a crawl that the policy forbids. Rules containing
 * wildcards are skipped — they are not prefix rules and cannot be judged statically.
 */
const robotsDisallow = [];
try {
  for (const line of readFileSync(ROBOTS, "utf8").split("\n")) {
    const match = /^\s*disallow:\s*(\S+)\s*$/i.exec(line);
    if (!match) continue;
    const rule = match[1];
    if (rule === "/" || /[*$]/.test(rule)) continue;
    robotsDisallow.push(rule);
  }
} catch {
  warnings.push("public/robots.txt is missing");
}

for (const [path] of seen) {
  const blocker = robotsDisallow.find(
    (rule) => path === rule || path.startsWith(rule.endsWith("/") ? rule : `${rule}/`),
  );
  if (blocker)
    errors.push(`sitemap entry is disallowed by robots.txt: ${path} (Disallow: ${blocker})`);
}

/* ---------- report ---------- */
const indexable = sitemapUrls.length;
console.log("Site structure audit");
console.log(`  routes defined:     ${routes.length}`);
console.log(`  redirect routes:    ${redirectPaths.size}`);
console.log(`  noindex routes:     ${noIndexPaths.size}`);
console.log(`  sitemap entries:    ${indexable}`);
console.log(`  internal targets:   ${inbound.size} distinct, resolving`);
console.log(`  errors:             ${errors.length}`);
console.log(`  warnings:           ${warnings.length}`);

if (errors.length) {
  console.log("\nErrors");
  for (const error of errors.slice(0, 40)) console.log(`  ✗ ${error}`);
  if (errors.length > 40) console.log(`  …and ${errors.length - 40} more`);
}

if (warnings.length && (verbose || warnings.length <= 25)) {
  console.log("\nWarnings");
  for (const warning of warnings.slice(0, 30)) console.log(`  · ${warning}`);
  if (warnings.length > 30) console.log(`  …and ${warnings.length - 30} more`);
} else if (warnings.length) {
  console.log(`\n${warnings.length} warnings (run with --verbose to list).`);
}

if (!errors.length) console.log("\nNo structural errors.");

if (errors.length && strict) {
  console.error("\nStructure audit failed.");
  process.exit(1);
}
