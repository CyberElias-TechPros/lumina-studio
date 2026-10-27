/**
 * Ad placement guardrail.
 *
 * Enforces docs/adsense-approval-playbook.md §4 and §7 without needing a browser:
 *
 *  1. every slot's allowlist sits under an eligible prefix;
 *  2. no slot's allowlist can match an ineligible prefix;
 *  3. no slot outlives a page type it would be wrong on;
 *  4. reserved height exists on every slot (CLS);
 *  5. AdSense/`adsbygoogle` code appears only in the sanctioned loader files;
 *  6. auto ads / anchor / vignette formats are not configured anywhere;
 *  7. the loader still refuses to run without the explicit env flag;
 *  8. exactly one primary slot per path family (one network zone = one unit per page);
 *  9. every declared prefix resolves to a live route and is not a redirect;
 * 10. no route under a transactional, legal or signed-in surface imports an ad
 *     component, whatever the registry says. The registry is policy; this is
 *     enforcement, and the two must agree.
 * 11. third-party ad code appears only in the two sanctioned files.
 *
 * Exit 1 on any failure. Run in CI.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

const slotsSource = readFileSync(join(root, "src/lib/ads/slots.ts"), "utf8");

/* ---------- 1–4: parse the registry statically ---------- */
const slotBlocks = [...slotsSource.matchAll(/\{\s*id:\s*"([^"]+)"([\s\S]*?)\n  \},/g)].map(
  ([, id, rest]) => ({
    id,
    allow: [...rest.matchAll(/"(\/[^"]*)"/g)].map((m) => m[1]),
    match: /match:\s*"(exact|descendants|prefix)"/.exec(rest)?.[1],
    primary: /primary:\s*true/.test(rest),
    minHeight: /minHeightPx:\s*(\d+)/.exec(rest)?.[1],
  }),
);

const eligible = [
  .../AD_ELIGIBLE_PREFIXES = \[([^\]]*)\]/.exec(slotsSource)[1].matchAll(/"([^"]+)"/g),
].map((m) => m[1]);
const ineligible = [
  .../AD_INELIGIBLE_PREFIXES = \[([\s\S]*?)\] as const/.exec(slotsSource)[1].matchAll(/"([^"]+)"/g),
].map((m) => m[1]);

if (slotBlocks.length < 3) failures.push("Slot registry did not parse — check the file shape.");

for (const slot of slotBlocks) {
  if (!slot.allow.length) failures.push(`slot "${slot.id}": empty allowlist`);
  if (!slot.minHeight || Number(slot.minHeight) < 100)
    failures.push(`slot "${slot.id}": missing or too-small reserved height (CLS risk)`);

  for (const prefix of slot.allow) {
    const underEligible = eligible.some((ok) => prefix.startsWith(ok));
    if (!underEligible)
      failures.push(`slot "${slot.id}": "${prefix}" is not under an eligible prefix`);

    for (const bad of ineligible) {
      if (prefix === bad || prefix.startsWith(`${bad}/`) || bad.startsWith(prefix))
        failures.push(`slot "${slot.id}": "${prefix}" can match the ineligible path "${bad}"`);
    }
  }
}

/* ---------- 5: ad code confinement ---------- */
const sanctioned = new Set([
  "src/lib/adsense.ts",
  "src/lib/ads/slots.ts",
  "src/lib/ads/ngadverts.ts",
  "src/components/marketing/ad-slots.tsx",
  "src/components/marketing/ngadverts.tsx",
]);

const AD_COMPONENT = /components\/marketing\/ad-slots|components\/marketing\/ngadverts/;

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const absolute = join(dir, entry);
    if (statSync(absolute).isDirectory()) walk(absolute, out);
    else if (/\.(ts|tsx)$/.test(entry)) out.push(absolute);
  }
  return out;
}

const offenders = [];
for (const file of walk(join(root, "src"))) {
  const rel = relative(root, file).split("\\").join("/");
  if (sanctioned.has(rel)) continue;
  const source = readFileSync(file, "utf8");
  if (/adsbygoogle|googleads\.g\.doubleclick|pagead2\.googlesyndication/.test(source))
    offenders.push(rel);
}
for (const file of offenders)
  failures.push(`ad code outside the sanctioned loader locations: ${file}`);

/* ---------- 6: forbidden formats ---------- */
for (const file of walk(join(root, "src")).concat([join(root, "public/sw.js")])) {
  let source;
  try {
    source = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  if (
    /data-ad-frequency-hint|enable_page_level_ads|auto[_ -]?ads|adFormat:\s*["'](?:anchor|vignette)|"anchor"\s*format|anchor ad unit/i.test(
      source,
    )
  )
    failures.push(`auto-ads / anchor / vignette configuration found in ${relative(root, file)}`);
}

/* ---------- 7: the loader stays gated ---------- */
const loader = readFileSync(join(root, "src/lib/adsense.ts"), "utf8");
if (!/NEXT_PUBLIC_ENABLE_PUBLIC_TRACKING/.test(loader))
  failures.push("adsense loader no longer checks NEXT_PUBLIC_ENABLE_PUBLIC_TRACKING");
if (!/NO_ADS/.test(loader)) failures.push("adsense loader lost its path exclusion list");

/* ---------- 8: one primary slot per path family ---------- */
// A path family is a prefix plus its match mode: `/blog` exact is the index,
// `/blog` descendants is a lesson. Each family may have one primary, because the
// zone can only fill one container per page without duplicating an element id.
const primariesByFamily = new Map();
for (const slot of slotBlocks) {
  if (!slot.match)
    failures.push(`slot "${slot.id}": missing \`match\` (exact | descendants | prefix)`);
  if (!slot.primary) continue;
  for (const prefix of slot.allow) {
    const family = `${prefix}#${slot.match}`;
    const existing = primariesByFamily.get(family);
    if (existing)
      failures.push(`slots "${existing}" and "${slot.id}" are both primary for ${family}`);
    else primariesByFamily.set(family, slot.id);
  }
}

/* ---------- 9: declared prefixes resolve to live, non-redirect routes ---------- */
const manifest = readFileSync(join(root, "src/lib/next-compat/routes.gen.ts"), "utf8");
const routePaths = [...manifest.matchAll(/\{\s*path:\s*"([^"]+)",\s*file:\s*"([^"]+)"/g)].map(
  ([, path, file]) => ({ path: path.replace(/(.)\/$/, "$1"), file }),
);
const redirectFiles = new Set(
  routePaths
    .filter(({ file }) => {
      try {
        return /(redirectPublic|throw redirect\()/.test(
          readFileSync(join(root, "src/routes", file), "utf8"),
        );
      } catch {
        return false;
      }
    })
    .map(({ file }) => file),
);

for (const slot of slotBlocks) {
  for (const prefix of slot.allow) {
    const live = routePaths.filter(
      (route) =>
        route.path === prefix || (route.path.startsWith(`${prefix}/`) && route.path !== prefix),
    );
    if (!live.length) {
      failures.push(`slot "${slot.id}": allow prefix "${prefix}" matches no route`);
      continue;
    }
    if (live.every((route) => redirectFiles.has(route.file)))
      failures.push(`slot "${slot.id}": every route under "${prefix}" is a redirect`);
  }
}

/* ---------- 10: no ad import on a surface that must stay clean ---------- */
const CLEAN_PREFIXES = [
  "/apply",
  "/pay",
  "/payment",
  "/auth",
  "/app",
  "/portal",
  "/shop",
  "/merchant",
  "/contact",
  "/visit",
  "/privacy",
  "/terms",
  "/refunds",
  "/shipping",
  "/accessibility",
  "/certificates",
  "/partners",
  "/request-project",
  "/editorial",
];

for (const route of routePaths) {
  let source;
  try {
    source = readFileSync(join(root, "src/routes", route.file), "utf8");
  } catch {
    continue;
  }
  if (!AD_COMPONENT.test(source)) continue;
  const path = route.path;
  if (path === "/") failures.push(`${route.file}: ad component mounted on the homepage`);
  for (const clean of CLEAN_PREFIXES) {
    if (path === clean || path.startsWith(`${clean}/`))
      failures.push(`${route.file}: ad component imported on ${path}, which must stay clean`);
  }
}

/* ---------- 11: third-party ad code confinement ---------- */
for (const file of walk(join(root, "src"))) {
  const rel = relative(root, file).split("\\").join("/");
  if (sanctioned.has(rel)) continue;
  if (/ngadverts\.com|adm-container-|items\.php\?/.test(readFileSync(file, "utf8")))
    failures.push(`third-party ad code outside the sanctioned files: ${rel}`);
}

/* ---------- 12: placeholders stay absent ---------- */
const adSlots = readFileSync(join(root, "src/components/marketing/ad-slots.tsx"), "utf8");
if (/Advertisement\s*<\/|border-dashed/.test(adSlots))
  failures.push(
    "ad-slots.tsx renders a visible placeholder — empty ad boxes violate placement policy",
  );

/* ---------- report ---------- */
console.log(
  `Ad placement guardrail — ${slotBlocks.length} slot(s) across ${eligible.length} eligible prefixes`,
);
for (const slot of slotBlocks)
  console.log(
    `  · ${slot.id.padEnd(18)} ${slot.allow.join(", ").padEnd(10)} ${(slot.match ?? "?").padEnd(12)} ` +
      `${slot.primary ? "primary  " : "alternate"} ≥${slot.minHeight}px`,
  );
const primaryCount = slotBlocks.filter((slot) => slot.primary).length;
console.log(
  `  ${primaryCount} primary unit(s) — one live zone, so at most one unit renders per page.`,
);

if (failures.length) {
  console.error(`\n${failures.length} problem(s):`);
  for (const failure of failures) console.error(`  ✗ ${failure}`);
  process.exit(1);
}
console.log("\nPlacement policy holds.");
