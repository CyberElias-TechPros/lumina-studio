import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const RENDERED_DIR = join(process.cwd(), "src/content/ai-lessons-rendered");

describe("AI Engineering rendered lessons", () => {
  it("renders callouts and KaTeX math as real HTML without escaped tags", () => {
    const files = readdirSync(RENDERED_DIR).filter((name) => name.endsWith(".json"));
    assert.ok(files.length > 0, "expected rendered AI lesson phase JSON files");

    let lessonCount = 0;
    let calloutCount = 0;
    let mathCount = 0;

    for (const file of files) {
      const lessons = JSON.parse(readFileSync(join(RENDERED_DIR, file), "utf8"));
      for (const lesson of lessons) {
        lessonCount += 1;
        assert.doesNotMatch(
          lesson.html,
          /&#x3C;(figure|div class="ai-math|span class="ai-math-inline)|&lt;(figure|div class="ai-math|span class="ai-math-inline)/i,
          `${file}/${lesson.slug} contains escaped callout or math HTML`,
        );
        if (lesson.html.includes('<figure class="ai-figure-callout')) calloutCount += 1;
        if (lesson.html.includes('class="katex"')) mathCount += 1;
      }
    }

    assert.equal(lessonCount, 542);
    assert.ok(calloutCount >= 500, `expected rendered callout figures, got ${calloutCount}`);
    assert.ok(mathCount >= 100, `expected rendered KaTeX formulas, got ${mathCount}`);
  });
});
