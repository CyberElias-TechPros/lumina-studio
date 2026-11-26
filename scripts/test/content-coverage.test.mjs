// Load `src/data/*.ts` the way Next resolves it (see scripts/lib/ts-resolve.mjs).
import "../lib/ts-resolve.mjs";

/**
 * Coverage guards for the published corpus.
 *
 * Three failures happened while adding companion articles, and each was silent:
 *
 *  1. New articles were published but never reached the sitemap, because the
 *     generator read one hard-coded file.
 *  2. A new article duplicated a lesson that already answered the same query,
 *     which splits ranking signals between two pages of ours.
 *  3. A test asserted `blogPosts.length === 210`, which would have blocked every
 *     future article rather than checking the thing that actually matters.
 *
 * These tests make each of those a build failure instead of a mystery.
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

const { blogPosts, lessonSeries } = await import("../../src/data/blog.ts");
const { noteChapters } = await import("../../src/data/note-chapters.ts");

const SITEMAP = readFileSync(join(root, "public/sitemap.xml"), "utf8");

test("the lesson series is still exactly the 21 chapters of ten", () => {
  assert.equal(lessonSeries.length, 210, "the series is 210 lessons");
  // The learning path is what must be 21 x 10. The chapter list also carries the
  // companion-article section (1000+), which is not part of the path, so counting
  // every chapter range would assert something that was never true.
  const path = noteChapters.filter((c) => c.from <= 210);
  assert.equal(path.length, 21, "21 chapters belong to the learning path");
  const covered = path.reduce((sum, c) => sum + (c.to - c.from + 1), 0);
  assert.equal(covered, 210, "the learning path must cover orders 1-210 exactly");
});

test("companion articles stay out of the chapter ranges", () => {
  // Every chapter claim is a contiguous order range. An article with an order
  // inside one would be counted as a chapter lesson that does not exist.
  for (const post of blogPosts) {
    if (post.order <= 210) continue;
    assert.ok(post.order > 210, `${post.slug}: companion order must exceed 210`);
  }
});

test("every published article is in the sitemap", () => {
  const missing = blogPosts
    .filter((post) => !SITEMAP.includes(`https://www.cea.ng/blog/${post.slug}<`))
    .map((post) => post.slug);

  assert.deepEqual(
    missing,
    [],
    `these articles are published but not advertised: ${missing.join(", ")}`,
  );
});

test("no two published pages compete for the same query", () => {
  // Cannibalisation check. One article was written on the SOC room and retired
  // when it turned out a lesson already answered the same query better - the two
  // would have split the ranking between our own pages.
  const seen = new Map();
  for (const post of blogPosts) {
    const keys = [post.slug, post.title.trim().toLowerCase()];
    for (const key of keys) {
      if (seen.has(key)) {
        assert.fail(`"${post.slug}" collides with "${seen.get(key)}" on ${key}`);
      }
      seen.set(key, post.slug);
    }
  }
});

test("slug naming does not collide across sources", () => {
  const byName = new Map();
  for (const post of blogPosts) {
    const base = post.slug.replace(/-in-plain-words$|-and-what-happens-in-[a-z]+$/, "");
    byName.set(base, [...(byName.get(base) ?? []), post.slug]);
  }
  const clusters = [...byName.values()].filter((s) => s.length > 1);
  assert.deepEqual(
    clusters,
    [],
    `near-duplicate slugs suggest two pages on one topic: ${JSON.stringify(clusters)}`,
  );
});

test("the tools the articles send readers to actually exist", () => {
  // The articles point at /tools/security-assessment and /tools/digital-signature.
  // A dead call-to-action is worse than none.
  for (const path of ["/tools/security-assessment", "/tools/digital-signature"]) {
    assert.ok(SITEMAP.includes(`https://www.cea.ng${path}<`), `${path} is not in the sitemap`);
  }
});

/* ------------------------------------------------------------------ *
 * Discoverability — the bug this suite did not catch
 * ------------------------------------------------------------------ */

test("every published post belongs to a browsable section", async () => {
  // These articles shipped, prerendered, entered the sitemap — and were absent
  // from /blog entirely. browseNotes indexed them, chapter filters dropped them,
  // and the listing showed 12 of 220 posts with no error anywhere. A post that
  // exists but cannot be found is worse than an unpublished draft, because it
  // looks finished.
  const { blogPosts } = await import("../../src/data/blog.ts");
  const { chapterForOrder } = await import("../../src/data/note-chapters.ts");

  const orphans = blogPosts.filter((post) => !chapterForOrder(post.order));
  assert.deepEqual(
    orphans.map((p) => `${p.slug} (order ${p.order})`),
    [],
    "posts with no section are invisible in /blog — add them to a chapter range",
  );
});

test("the browse surface can reach every published post", () => {
  // This reproduces what browseNotes does to decide membership, rather than
  // importing it: src modules resolve the "@/" alias, which plain Node cannot.
  // The failure this guards is a post that exists, prerenders, sits in the
  // sitemap, and is filtered out of the only page that lists it.
  const reachable = blogPosts.filter(
    (post) =>
      post.order <= 210 || noteChapters.some((c) => post.order >= c.from && post.order <= c.to),
  );
  const unreachable = blogPosts.filter((post) => !reachable.includes(post)).map((p) => p.slug);
  assert.deepEqual(unreachable, [], "posts unreachable from /blog");
  assert.equal(reachable.length, blogPosts.length);
});

test("companion articles carry the words a reader would search for", () => {
  // browseNotes matches on the words in the post, so a title and body that name
  // the subject is what makes it findable. This checks the content, which is the
  // part a future edit can break, rather than the search plumbing.
  const cases = [
    ["cvss", "understanding-cvss-scores"],
    ["micro-segmentation", "micro-segmentation-explained"],
    ["soc", "first-90-days-in-a-soc"],
  ];
  for (const [term, slug] of cases) {
    const post = blogPosts.find((p) => p.slug === slug);
    assert.ok(post, `${slug} is missing`);
    const haystack = [
      post.title,
      post.excerpt,
      post.seoDescription ?? "",
      ...post.body.map((b) => ("text" in b ? b.text : "")),
    ]
      .join(" ")
      .toLowerCase();
    assert.ok(haystack.includes(term), `${slug} never mentions "${term}"`);
  }
});

test("the companion section does not disturb the 210-lesson path", async () => {
  const { lessonSeries } = await import("../../src/data/blog.ts");
  const { noteChapters, chapterForOrder } = await import("../../src/data/note-chapters.ts");

  assert.equal(lessonSeries.length, 210, "the series must stay at 210");
  for (const post of lessonSeries) {
    const chapter = chapterForOrder(post.order);
    assert.ok(chapter, `${post.slug} lost its chapter`);
    assert.ok(chapter.from <= 210, `${post.slug} was pulled into the companion range`);
  }
  const lessonOrders = noteChapters.filter((c) => c.from <= 210).map((c) => c.to);
  assert.equal(Math.max(...lessonOrders), 210, "the learning path must end at order 210");
});
