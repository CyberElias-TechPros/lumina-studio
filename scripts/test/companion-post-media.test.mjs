import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const { companionPosts } = await import("../../src/data/companion-posts.ts");

test("every companion post image exists on disk", () => {
  // A published image path that 404s is worse than no image: it burns the
  // reader's trust at the exact point they were deciding whether to keep reading.
  const missing = [];
  for (const post of companionPosts) {
    if (post.cover && !existsSync(join(ROOT, "public", post.cover))) {
      missing.push(`${post.slug} cover → ${post.cover}`);
    }
    for (const block of post.body ?? []) {
      if (block.type === "figure" && block.src && !existsSync(join(ROOT, "public", block.src))) {
        missing.push(`${post.slug} figure → ${block.src}`);
      }
    }
  }
  assert.deepEqual(missing, [], `missing image files:\n${missing.join("\n")}`);
});

test("every companion post states a quick answer and a recovery step", () => {
  // Both are published standards in this repo, and both are the first things
  // to rot when an article is written quickly.
  for (const post of companionPosts) {
    assert.ok(post.quickAnswer && post.quickAnswer.length > 80, `${post.slug}: needs a real quickAnswer`);
    const text = JSON.stringify(post.body ?? []);
    assert.match(text, /if this went wrong/i, `${post.slug}: needs a recovery paragraph`);
  }
});

test("no companion post quotes an unsourced salary figure", () => {
  // The cybersecurity jobs article deliberately gives no number. If a future
  // edit adds one, it must arrive with a stated sample, not alone.
  const naira = /₦\s?[\d,]{3,}/;
  for (const post of companionPosts) {
    const text = JSON.stringify(post.body ?? []);
    if (!naira.test(text)) continue;
    assert.match(
      text,
      /sample|survey|advertised|listed|respondents/i,
      `${post.slug}: quotes a naira figure without stating where it came from`,
    );
  }
});
