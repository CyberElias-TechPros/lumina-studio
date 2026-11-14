import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../.agents/", import.meta.url));
const skillsRoot = join(root, "skills");
const skills = readdirSync(skillsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

// Ignore examples in fenced blocks: those paths are not instructions to follow.
function withoutFences(text) {
  let fence = null;
  return text
    .split("\n")
    .map((line) => {
      const marker = line.match(/^\s*(`{3,}|~{3,})/);
      if (marker) {
        if (!fence) fence = marker[1][0];
        else if (marker[1][0] === fence) fence = null;
        return "";
      }
      return fence ? "" : line;
    })
    .join("\n");
}

function headingAnchors(text) {
  const counts = new Map();
  const anchors = new Set();
  for (const line of withoutFences(text).split("\n")) {
    const match = line.match(/^ {0,3}#{1,6}[ \t]+(.*?)(?:[ \t]+#+)?[ \t]*$/);
    if (!match) continue;
    const slug = match[1]
      .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/<[^>]+>/g, "")
      .toLowerCase()
      .replace(/[^\p{L}\p{M}\p{N}_\- ]/gu, "")
      .replace(/ /g, "-");
    let count = counts.get(slug) ?? 0;
    let anchor = count ? `${slug}-${count}` : slug;
    while (anchors.has(anchor)) anchor = `${slug}-${++count}`;
    counts.set(slug, count + 1);
    anchors.add(anchor);
  }
  return anchors;
}

test("the pinned collection contains all 25 discoverable skills and the upstream license", () => {
  assert.equal(skills.length, 25);
  assert.ok(skills.includes("using-agent-skills"));
  assert.ok(skills.includes("incremental-implementation"));
  assert.match(
    readFileSync(join(root, "LICENSE.agent-skills"), "utf8"),
    /Copyright \(c\) 2025 Addy Osmani/,
  );
  for (const skill of skills) {
    const file = join(skillsRoot, skill, "SKILL.md");
    const text = readFileSync(file, "utf8");
    const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    assert.ok(frontmatter, `${skill}: missing frontmatter`);
    assert.match(frontmatter[1], new RegExp(`^name: ${skill}$`, "m"));
    assert.match(frontmatter[1], /^description: \S.+$/m);
  }
});

test("skill links to shared and local reference checklists resolve, including heading anchors", () => {
  const referencePattern =
    /(?<![A-Za-z0-9._/-])((?:\.\.\/)*references\/[A-Za-z0-9._-]+\.md)(?:#([\p{L}\p{N}_-]+))?/gu;
  let links = 0;
  for (const skill of skills) {
    const dir = join(skillsRoot, skill);
    const refDir = join(dir, "references");
    const files = [join(dir, "SKILL.md")];
    if (existsSync(refDir)) {
      files.push(
        ...readdirSync(refDir)
          .filter((name) => name.endsWith(".md"))
          .map((name) => join(refDir, name)),
      );
    }
    for (const file of files) {
      for (const [, link, anchor] of withoutFences(readFileSync(file, "utf8")).matchAll(
        referencePattern,
      )) {
        links++;
        const target = resolve(dirname(file), link);
        assert.ok(existsSync(target), `${file}: missing ${link}`);
        if (anchor)
          assert.ok(
            headingAnchors(readFileSync(target, "utf8")).has(anchor),
            `${file}: missing ${link}#${anchor}`,
          );
      }
    }
  }
  assert.ok(links > 0, "expected reference links to be checked");
});
