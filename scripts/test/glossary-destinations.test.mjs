import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const {
  GLOSSARY_DESTINATIONS,
  GLOSSARY_DESTINATIONS_TODO,
  GLOSSARY_FALLBACK,
  glossaryDestination,
  isGlossaryRouteRendered,
} = await import("../../src/data/glossary-destinations.ts");

const ROOT = process.cwd();

/**
 * Map a URL path to the route file that serves it.
 *
 * Handles the two shapes this repo uses: flat routes (`/tools/x` →
 * `tools.x.tsx`) and dynamic segments (`/blog/some-post` → `blog.$slug.tsx`,
 * which is only a destination if `some-post` is a real post in the data).
 */
function routeFileFor(path) {
  const trimmed = path.replace(/^\//, "");
  const flat = [
    `src/routes/${trimmed}.tsx`,
    `src/routes/${trimmed}.index.tsx`,
    `src/routes/${trimmed.replace(/\//g, ".")}.tsx`,
  ].find((c) => existsSync(join(ROOT, c)));
  if (flat) return flat;

  // dynamic: /blog/<slug> served by blog.$slug.tsx, if the slug is real
  const m = trimmed.match(/^([a-z-]+)\/([a-z0-9-]+)$/);
  if (m) {
    const parent = `src/routes/${m[1]}.$slug.tsx`;
    if (existsSync(join(ROOT, parent))) {
      // blogPosts = NOTES_SERIES (blog.ts) + companionPosts (companion-posts.ts).
      const sources = m[1] === "blog" ? ["src/data/blog.ts", "src/data/companion-posts.ts"] : [];
      for (const dataFile of sources) {
        if (!existsSync(join(ROOT, dataFile))) continue;
        if (readFileSync(join(ROOT, dataFile), "utf8").includes(`slug: "${m[2]}"`)) return parent;
      }
    }
  }
  return undefined;
}

test("the two rankings that were being thrown away now go somewhere real", () => {
  // 172 impressions at position 2.04, and 189 at 4.13. Both used to 301 to a
  // course list. If either regresses to the fallback, the bug is back.
  assert.equal(glossaryDestination("vulnerability-assessment"), "/blog/what-a-vulnerability-assessment-is");
  assert.equal(glossaryDestination("zero-trust"), "/blog/zero-trust-in-plain-words");
  assert.equal(glossaryDestination("digital-signature"), "/blog/signed-or-just-a-picture");
});

test("no destination is the neutral fallback", () => {
  // A mapping that points at the fallback is not a mapping, it is the old bug
  // with extra steps.
  for (const [slug, entry] of Object.entries(GLOSSARY_DESTINATIONS)) {
    assert.notEqual(entry.to, GLOSSARY_FALLBACK, `${slug} maps to the fallback`);
  }
});

test("every destination route file exists", () => {
  for (const [slug, entry] of Object.entries(GLOSSARY_DESTINATIONS)) {
    assert.ok(routeFileFor(entry.to), `${slug} → ${entry.to} has no route file`);
  }
});

test("every mapping states why, in a sentence", () => {
  for (const [slug, entry] of Object.entries(GLOSSARY_DESTINATIONS)) {
    assert.ok(entry.why.length > 30, `${slug} needs a real reason, not a label`);
  }
});

test("no destination is itself a redirect", () => {
  // Sending a ranked URL into another redirect loses the ranking entirely and
  // is invisible in a normal test run. Static routes redirect wholesale;
  // /blog/$slug only redirects slugs listed in the legacy map, so that map is
  // the authority for dynamic destinations.
  const legacy = readFileSync(join(ROOT, "src/lib/legacy-redirects.ts"), "utf8");
  for (const [slug, entry] of Object.entries(GLOSSARY_DESTINATIONS)) {
    const file = routeFileFor(entry.to);
    if (!file) continue;
    if (file.includes("$slug")) {
      const blogSlug = entry.to.split("/").pop();
      assert.ok(
        !legacy.includes(`"${blogSlug}":`),
        `${slug} → ${entry.to} is in the legacy redirect map, so it would 301 again`,
      );
      continue;
    }
    const src = readFileSync(join(ROOT, file), "utf8");
    assert.ok(
      !/redirectPublic\(|throw redirect\(/.test(src),
      `${slug} → ${entry.to} is itself a redirect (${file})`,
    );
  }
});

test("unmapped terms keep the neutral fallback rather than a guess", () => {
  for (const slug of ["agile-methodology", "rag", "captcha", "kubernetes", "not-a-term"]) {
    assert.equal(glossaryDestination(slug), GLOSSARY_FALLBACK, `${slug} should not be guessed`);
  }
});

test("terms recorded as gaps are genuinely not mapped", () => {
  // These rank and have no honest destination. Recording them is what stops
  // someone "fixing" the gap by pointing them at something adjacent.
  for (const todo of GLOSSARY_DESTINATIONS_TODO) {
    assert.equal(
      GLOSSARY_DESTINATIONS[todo.slug],
      undefined,
      `${todo.slug} is listed as a gap but also has a destination`,
    );
    assert.ok(todo.note.length > 15, `${todo.slug} must say what is missing`);
    assert.ok(todo.impressions > 0, `${todo.slug} is only a gap if it has evidence`);
  }
});

test("only terms with a destination would be rendered", () => {
  // Nothing renders today; a rendered term would need a real page component,
  // which this route does not have.
  for (const slug of Object.keys(GLOSSARY_DESTINATIONS)) {
    assert.equal(isGlossaryRouteRendered(slug), false, `${slug} cannot render: route has no component`);
  }
});
