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
 *  7. the loader still refuses to run without the explicit env flag.
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
  "src/components/marketing/ad-slots.tsx",
]);

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

/* ---------- 8: placeholders stay absent ---------- */
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
  console.log(`  · ${slot.id.padEnd(20)} ${slot.allow.join(", ").padEnd(28)} ≥${slot.minHeight}px`);

if (failures.length) {
  console.error(`\n${failures.length} problem(s):`);
  for (const failure of failures) console.error(`  ✗ ${failure}`);
  process.exit(1);
}
console.log("\nPlacement policy holds.");
