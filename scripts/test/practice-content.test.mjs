import { test } from "node:test";
import { strict as assert } from "node:assert";
import { blogPosts } from "../../src/data/blog.ts";
import {
  beginnerChallenges,
  beginnerLessonSlugs,
} from "../../src/data/practice/beginner-challenges.ts";
import { adsAllowedOn } from "../../src/lib/ads/slots.ts";

test("each beginner lesson has a complete practice check and no ad slot", () => {
  assert.equal(new Set(beginnerLessonSlugs).size, beginnerLessonSlugs.length);
  assert.deepEqual(new Set(beginnerLessonSlugs), new Set(Object.keys(beginnerChallenges)));
  for (const slug of beginnerLessonSlugs) {
    assert.ok(
      blogPosts.some((post) => post.slug === slug),
      `missing lesson ${slug}`,
    );
    const challenge = beginnerChallenges[slug];
    assert.ok(challenge.question.trim());
    assert.ok(challenge.options.length >= 2);
    assert.equal(challenge.options.filter((option) => option.correct).length, 1);
    assert.equal(
      new Set(challenge.options.map((option) => option.id)).size,
      challenge.options.length,
    );
    assert.ok(challenge.options.every((option) => option.text.trim() && option.feedback.trim()));
    assert.equal(adsAllowedOn(`/blog/${slug}`), false);
  }
  assert.equal(adsAllowedOn("/practice/computer-basics"), false);
});
