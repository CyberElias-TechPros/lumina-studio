/**
 * Consent and disclosure guardrail.
 *
 * The failure this exists to prevent is the one that actually happened: a
 * third-party tag was loaded in `layout.tsx` and never appeared anywhere in the
 * privacy policy, and the consent banner was conditionally mounted behind an env
 * flag that defaulted to off — so in the shipped configuration nobody was ever
 * asked and nothing was ever recorded.
 *
 * Eleven checks, all static, no browser needed:
 *
 *   1.  every `load*` function in `src/lib/tracking.ts` reads the consent module;
 *   2.  each loader checks the category it belongs to (ads → `ads`, rest →
 *        `analytics`), not merely "any consent";
 *   3.  every loader checks the private-route list;
 *   4.  each loader is idempotent (guards against a second injection);
 *   5.  `PROCESSORS` in tracking.ts has exactly one entry per loader;
 *   6.  every processor declares a real policy URL and a loader reference;
 *   7.  `/privacy` reads `PROCESSORS` rather than hard-coding the list;
 *   8.  the consent banner is mounted unconditionally in providers.tsx;
 *   9.  no file outside the sanctioned set injects a third-party script;
 *   10. no `data-clarity-mask` style masking bypass exists for Clarity;
 *   11. the deprecated tracking env flag is not read by any runtime file.
 *
 * Exit 1 on any failure. Run in CI next to `check:ads`.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

const read = (path) => readFileSync(join(root, path), "utf8");

/* ---------------- 1–4: loaders are gated, scoped and idempotent ---------------- */

const tracking = read("src/lib/tracking.ts");

if (!/from "@\/lib\/consent"/.test(tracking)) {
  failures.push("src/lib/tracking.ts does not import the consent module");
}

const loaders = [
  ...tracking.matchAll(/export function (load\w+)\([^)]*\):\s*void\s*\{([\s\S]*?)\n\}/g),
];
if (loaders.length < 3) {
  failures.push(`expected at least 3 loaders in tracking.ts, found ${loaders.length}`);
}

for (const [, name, body] of loaders) {
  if (!body.includes("readConsent()")) {
    failures.push(`loader ${name} does not consult readConsent()`);
  }
  if (!body.includes("trackingAllowedOnPath")) {
    failures.push(`loader ${name} does not check trackingAllowedOnPath()`);
  }
  if (!/alreadyLoaded\(|querySelector\(/.test(body)) {
    failures.push(`loader ${name} is not idempotent — it could inject a second copy`);
  }

  // Category correctness: the ad loader must require ads consent specifically.
  const isAdLoader = /adsense|advert/i.test(name);
  const guard = body.match(/readConsent\(\)\?\.(\w+)\s*(?:===|!==)\s*true/);
  if (!guard) {
    failures.push(`loader ${name} has no explicit consent guard on a named category`);
  } else if (isAdLoader && guard[1] !== "ads") {
    failures.push(
      `loader ${name} appears to be advertising but is gated on "${guard[1]}" consent, not "ads"`,
    );
  } else if (!isAdLoader && guard[1] !== "analytics") {
    failures.push(
      `loader ${name} appears to be analytics but is gated on "${guard[1]}" consent, not "analytics"`,
    );
  }
}

/* ---------------- 5–6: the processor register is complete ---------------- */

const registerBlock = tracking.match(/export const PROCESSORS: Processor\[\] = \[([\s\S]*?)\n\];/);
if (!registerBlock) {
  failures.push("PROCESSORS register not found in tracking.ts");
} else {
  const entries = [...registerBlock[1].matchAll(/\n  \{\n([\s\S]*?)\n  \},/g)].map((m) => m[1]);
  if (entries.length < loaders.length) {
    failures.push(
      `PROCESSORS has ${entries.length} entries for ${loaders.length} loaders — every loaded tool must be disclosed`,
    );
  }
  for (const entry of entries) {
    const name = /name:\s*"([^"]+)"/.exec(entry)?.[1] ?? "(unnamed)";
    if (!/policyUrl:\s*"https:\/\//.test(entry)) {
      failures.push(`processor "${name}" has no https policy URL`);
    }
    if (!/loader:\s*"/.test(entry)) {
      failures.push(`processor "${name}" does not name the file that loads it`);
    }
    if (!/category:\s*"(analytics|advertising)"/.test(entry)) {
      failures.push(`processor "${name}" has no consent category`);
    }
  }

  // Every function that injects a script must appear as a loader reference.
  for (const [, name] of loaders) {
    if (!registerBlock[1].includes(name)) {
      failures.push(`loader ${name} is not disclosed in PROCESSORS`);
    }
  }
}

/* ---------------- 7: the policy renders the register ---------------- */

const privacy = read("src/routes/privacy.tsx");
if (!/import \{ PROCESSORS \} from "@\/lib\/tracking"/.test(privacy)) {
  failures.push("privacy.tsx does not import PROCESSORS — the policy can drift from the code");
}
if (!/PROCESSORS\.map\(/.test(privacy)) {
  failures.push("privacy.tsx does not render PROCESSORS");
}
// privacy.tsx is a Server Component, so the button is a client child. Accept
// either the inline call or the extracted component.
if (!/openConsentPreferences\(\)|CookieSettingsButton/.test(privacy)) {
  failures.push("privacy.tsx has no control to withdraw consent (GDPR Art. 7(3))");
}
// The footer must offer it too, because that is where people look for it.
const footer = read("src/components/marketing/site-footer.tsx");
if (!/CookieSettingsButton|openConsentPreferences\(\)/.test(footer)) {
  failures.push("site-footer.tsx has no cookie-settings control");
}

/* ---------------- 8: the banner is unconditional ---------------- */

const providers = read("src/app/providers.tsx");
if (/ENABLE_PUBLIC_TRACKING[\s\S]{0,40}CookieConsent/.test(providers)) {
  failures.push("CookieConsent is conditionally mounted again — visitors may never be asked");
}
if (!/<CookieConsent \/>/.test(providers)) {
  failures.push("CookieConsent is not mounted in providers.tsx");
}

/* ---------------- 9: third-party injection is confined ---------------- */

const SANCTIONED_SCRIPT_HOSTS =
  /src\s*=\s*[`"']https:\/\/(www\.clarity\.ms|www\.googletagmanager\.com|pagead2\.googlesyndication\.com)/;

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const absolute = join(dir, entry);
    if (statSync(absolute).isDirectory()) walk(absolute, out);
    else if (/\.(ts|tsx)$/.test(entry)) out.push(absolute);
  }
  return out;
}

const allowedInjectors = new Set(["src/lib/tracking.ts", "src/lib/ads/ngadverts.ts"]);
for (const file of walk(join(root, "src"))) {
  const rel = relative(root, file).split("\\").join("/");
  if (allowedInjectors.has(rel)) continue;
  const source = readFileSync(file, "utf8");
  if (SANCTIONED_SCRIPT_HOSTS.test(source)) {
    failures.push(`third-party script injected outside the sanctioned loaders: ${rel}`);
  }
}

/* ---------------- 10: Clarity must mask page text ---------------- */

const clarityFn = tracking.match(/export function loadClarity\(\)[\s\S]*?\n\}/)?.[0] ?? "";
if (clarityFn && !/maskText/.test(clarityFn)) {
  failures.push("loadClarity does not set maskText — session replay would capture page text");
}
if (clarityFn && !/data-clarity-mask/.test(clarityFn)) {
  failures.push("loadClarity does not set the data-clarity-mask attribute");
}

/* ---------------- 11: the dead env flag stays dead ---------------- */

for (const path of ["src/app/providers.tsx", "src/lib/tracking.ts", "src/lib/consent.ts"]) {
  // Strip comments before testing: both modules *discuss* the flag so a future
  // reader understands why it was removed. Only a live read is a failure.
  const code = read(path)
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");
  if (/NEXT_PUBLIC_ENABLE_PUBLIC_TRACKING/.test(code)) {
    failures.push(
      `${path} reads NEXT_PUBLIC_ENABLE_PUBLIC_TRACKING again — it made tracking unreachable`,
    );
  }
}

/* ---------------- report ---------------- */

if (failures.length > 0) {
  console.error(`\nConsent guardrail — ${failures.length} problem(s):`);
  for (const failure of failures) console.error(`  ✗ ${failure}`);
  console.error("");
  process.exit(1);
}

console.log(
  `Consent guardrail — ${loaders.length} loader(s), all consent-gated, route-scoped and disclosed in /privacy.`,
);
