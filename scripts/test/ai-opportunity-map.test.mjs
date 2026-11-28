/**
 * Guard tests for the AI content opportunity map.
 *
 * The map is 160 topic briefs. Its failure mode is not "missing a topic" — it is
 * drifting into the thing it explicitly refuses: "best AI tool" listicles,
 * undated pricing claims, and lanes that lead nowhere on the site. These tests
 * exist to make those failures loud.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");

const src = readFileSync(resolve(root, "src/data/editorial/ai-opportunity-map.ts"), "utf8");
const routes = readFileSync(resolve(root, "src/lib/next-compat/routes.gen.ts"), "utf8");

/** Strip the TS type annotations well enough to read the literal data. */
function parseLanes() {
  const lanes = [];
  const laneRe =
    /\{\s*id: "([^"]+)",\s*label: "([^"]+)",\s*kind: "(requested|adjacent)",\s*feedsFrom: "([^"]+)",\s*wave: (\d),\s*topics: \[([\s\S]*?)\n    \],\s*\}/g;
  let m;
  while ((m = laneRe.exec(src))) {
    const [, id, label, kind, feedsFrom, wave, body] = m;
    const topics = [];
    const topicRe =
      /\{\s*id: "([^"]+)",\s*title: "([^"]+)",\s*brief:\s*"([^"]+)",\s*checksTools: (true|false),\s*\}/g;
    let t;
    while ((t = topicRe.exec(body))) {
      topics.push({
        id: t[1],
        title: t[2],
        brief: t[3],
        checksTools: t[4] === "true",
      });
    }
    lanes.push({ id, label, kind, feedsFrom, wave: Number(wave), topics });
  }
  return lanes;
}

const lanes = parseLanes();
const all = lanes.flatMap((l) => l.topics.map((t) => ({ ...t, lane: l.id })));

test("the map carries all 16 lanes and 160 topics", () => {
  assert.equal(lanes.length, 16, "expected 16 lanes");
  assert.equal(all.length, 160, "expected 160 topics");
  for (const lane of lanes) {
    assert.equal(lane.topics.length, 10, `${lane.id} should have 10 topics`);
  }
});

test("11 lanes are the requested set, 5 are the author's adjacent additions", () => {
  assert.equal(lanes.filter((l) => l.kind === "requested").length, 11);
  assert.equal(lanes.filter((l) => l.kind === "adjacent").length, 5);
});

test("every lane is fed by a surface the site actually serves", () => {
  const paths = new Set(
    [...routes.matchAll(/path: "([^"]+)"/g)].map((m) => m[1].replace(/\/$/, "")),
  );
  for (const lane of lanes) {
    const base = lane.feedsFrom.split("#")[0].replace(/\/$/, "") || "/";
    assert.ok(
      paths.has(base),
      `lane "${lane.label}" points at ${lane.feedsFrom}, but ${base} is not a route`,
    );
  }
});

test("every topic id is unique and slug-shaped", () => {
  const seen = new Set();
  for (const topic of all) {
    assert.match(topic.id, /^[a-z0-9-]+$/, `bad slug: ${topic.id}`);
    assert.ok(!seen.has(topic.id), `duplicate topic id: ${topic.id}`);
    seen.add(topic.id);
  }
});

test("no topic promises a universal winner", () => {
  // The map's own editorial rule: lead with reproducible tests, not vendor claims.
  // Note "Stop Asking for the Best AI" is the inverse of the claim and is allowed;
  // what is banned is a title that *asserts* a winner.
  const banned = /^(the\s+)?(best|top)\b.*\bai\b|\bultimate guide\b|\bgame[- ]changer\b/i;
  for (const topic of all) {
    assert.doesNotMatch(topic.title, banned, `"${topic.title}" claims a universal winner`);
  }
});

test("no topic states a price, quota or search volume as fact", () => {
  // Prices and free-tier limits are perishable, and this repo never publishes
  // an unsourced number. A brief may ask the writer to *test* a quota; it may
  // not assert one.
  for (const topic of all) {
    const text = `${topic.title} ${topic.brief}`;
    assert.doesNotMatch(
      text,
      /\b\d+\s*(tasks|ops|requests|messages)\s*(per|\/)\s*(month|mo)\b/i,
      `"${topic.title}" asserts a free-tier quota`,
    );
    // A brief may scope a price band to test ("$0-to-$30") but must not assert a
    // specific price as fact ("costs $9.99/month").
    assert.doesNotMatch(
      text,
      /\$\s?\d+(?:\.\d{2}|,\d{3})|\bcosts?\s+[$₦]\s?\d/i,
      `"${topic.title}" asserts a specific price`,
    );
  }
});

test("topics that name a product are flagged for re-verification", () => {
  const products =
    /\b(ChatGPT|Claude|Gemini|Perplexity|NotebookLM|Copilot|Canva|n8n|Zapier|Make|Activepieces|Remotion|Veo|Kling|Runway|Luma|Pika|Sora|Seedance|ComfyUI|Lyria|SynthID|C2PA|Firefly|OpenRouter|LiteLLM|Ollama)\b/;
  const unflagged = all.filter((t) => products.test(`${t.title} ${t.brief}`) && !t.checksTools);
  assert.deepEqual(
    unflagged.map((t) => t.title),
    [],
    "these topics name a product but are not flagged checksTools",
  );
});

test("publishing waves are balanced, so no wave is a dumping ground", () => {
  for (const wave of [1, 2, 3, 4]) {
    const count = lanes.filter((l) => l.wave === wave).length;
    assert.ok(count >= 3 && count <= 5, `wave ${wave} has ${count} lanes`);
  }
});

test("the map's top-10 priority list is preserved verbatim", () => {
  assert.match(src, /export const MAP_PRIORITY: readonly string\[\] = \[/);
  const block = src.slice(src.indexOf("MAP_PRIORITY"));
  const items = [...block.matchAll(/^\s{2}"(.+)",?$/gm)];
  assert.equal(items.length, 10, "expected 10 priority topics");
});
