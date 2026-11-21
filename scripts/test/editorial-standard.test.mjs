import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const { blogPosts } = await import("../../src/data/blog.ts");
const { CEA_ARTICLE_TYPES, CEA_CATEGORIES, resolveLessonStandard, scoreLessonQuality } =
  await import("../../src/data/editorial/publication-standard.ts");

const generated = JSON.parse(
  readFileSync(join(root, "src/data/editorial/lesson-dates.generated.json"), "utf8"),
);

test("CEA-LPS defines all 12 categories and 12 article types", () => {
  assert.equal(CEA_CATEGORIES.length, 12);
  assert.equal(CEA_ARTICLE_TYPES.length, 12);
});

test("every published blog post resolves a valid category, type, difficulty, and safe public status", () => {
  assert.equal(blogPosts.length, 210);
  for (const post of blogPosts) {
    const rec = generated.lessons[post.slug];
    const isReviewed = Boolean(rec?.reviewedAt);
    const isOverdue = Boolean(rec?.reviewDueAt && !rec?.reviewedAt);
    const std = resolveLessonStandard(post, { isReviewed, isOverdue });
    assert.ok(std.category.label.length > 0, `${post.slug} missing category`);
    assert.ok(std.articleType.label.length > 0, `${post.slug} missing articleType`);
    assert.ok(
      !std.publicStatusLabel.toLowerCase().includes("due"),
      `${post.slug} leaked overdue status`,
    );

    const score = scoreLessonQuality(post, rec);
    assert.equal(score.criticalErrors.length, 0, `${post.slug} had critical errors`);
    assert.ok(score.total >= 60 && score.total <= 100, `${post.slug} out-of-range score`);
  }
});

test("top GSC query targets carry explicit search-intent seoTitle overrides and objectives", () => {
  const expectedSlugs = [
    "zero-trust-gate",
    "vulnerability-assessment-fence",
    "kilobytes-and-megabytes",
    "naira-and-accents",
    "digital-signature-meaning",
    "the-cybersecurity-analyst-at-work",
  ];
  for (const slug of expectedSlugs) {
    const post = blogPosts.find((p) => p.slug === slug);
    assert.ok(post, `Missing post ${slug}`);
    assert.ok(post.seoTitle && post.seoTitle.length >= 25, `${slug} missing seoTitle`);
    assert.ok(
      post.seoDescription && post.seoDescription.length >= 70,
      `${slug} missing seoDescription`,
    );
    assert.ok(
      post.learningObjectives && post.learningObjectives.length >= 2,
      `${slug} missing objectives`,
    );
  }
});
