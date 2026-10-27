/**
 * AdSense content-quality audit for the public lesson corpus.
 *
 * Individual page length is not the whole quality signal. Google's "low value
 * content" rejection now cites four separate things: substantial unique value,
 * a consistent presence on the web, ongoing curation and structural
 * maintenance, and genuine user interest. Only the first and third are
 * measurable from source, and both are measurable *as templating*:
 * 210 lessons that share one shape, one rhythm and one opening formula read as
 * scaled content even when every page is 700 words long.
 *
 * This script measures what a reviewer would notice:
 *   1. per-page depth (words, figures, headings)
 *   2. structural sameness (block-signature groups)
 *   3. near-duplicate pairs (5-word shingle Jaccard)
 *   4. boilerplate phrases repeated across many lessons
 *   5. repeated opening formulas
 *   6. repeated headings
 *
 * Usage:
 *   node scripts/adsense-content-quality.mjs            # summary to stdout
 *   node scripts/adsense-content-quality.mjs --csv out.csv
 *
 * Exit code is 0 always: this is a reporting tool, not a gate. The gate lives
 * in CI once the authoring pipeline lands (see plans/CEA_MASTERPIECE_BLUEPRINT).
 */

import { writeFileSync } from "node:fs";

// Native TypeScript type-stripping is only unflagged from Node 22.18 / 23.6.
// On Node 20 the import below throws ERR_UNKNOWN_FILE_EXTENSION, which reads like a
// bug in this script rather than a runtime that is too old. Say which it is.
const [nodeMajor, nodeMinor] = process.versions.node.split(".").map(Number);
if (nodeMajor < 22 || (nodeMajor === 22 && nodeMinor < 18)) {
  console.error(
    `This script imports src/data/blog.ts directly and needs Node >= 22.18 for native ` +
      `TypeScript type-stripping. Running ${process.versions.node}.`,
  );
  process.exit(1);
}

const { blogPosts } = await import("../src/data/blog.ts");

const csvFlag = process.argv.indexOf("--csv");
const csvPath = csvFlag > -1 ? process.argv[csvFlag + 1] : null;

const STOP = new Set(
  "the a an and or but of to in on at for with from by as is are was were be been being it its this that these those you your i my we our he she they them his her their not no so if then than into over under about after before when while because can could will would should may might must do does did have has had there here what which who whom how why all any each more most some such only own same very just also even still yet both either neither".split(
    /\s+/,
  ),
);

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function words(text) {
  return normalize(text).split(" ").filter(Boolean);
}

function postText(post) {
  const parts = [];
  for (const block of post.body) {
    if (block.type === "p" || block.type === "h2") parts.push(block.text);
    else if (block.type === "ul") parts.push(block.items.join(" "));
    else if (block.type === "figure") parts.push(block.caption);
  }
  return parts.join("\n");
}

function shingles(text, size = 5) {
  const w = words(text);
  const out = new Set();
  for (let i = 0; i + size <= w.length; i += 1) out.add(w.slice(i, i + size).join(" "));
  return out;
}

function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  const [small, large] = a.size < b.size ? [a, b] : [b, a];
  for (const item of small) if (large.has(item)) inter += 1;
  return inter / (a.size + b.size - inter);
}

const rows = blogPosts.map((post) => {
  const text = postText(post);
  const paragraphWords = post.body
    .filter((b) => b.type === "p")
    .reduce((n, b) => n + b.text.split(/\s+/).filter(Boolean).length, 0);
  const firstParagraph = post.body.find((b) => b.type === "p")?.text ?? "";
  return {
    slug: post.slug,
    series: post.series,
    order: post.order,
    words: words(text).length,
    paragraphWords,
    figures: post.body.filter((b) => b.type === "figure").length,
    headings: post.body.filter((b) => b.type === "h2").length,
    lists: post.body.filter((b) => b.type === "ul").length,
    blocks: post.body.length,
    signature: post.body.map((b) => b.type[0]).join(""),
    firstSentence: (firstParagraph.match(/^[^.!?]+[.!?]/)?.[0] ?? firstParagraph).trim(),
    shingles: shingles(text),
    h2s: post.body.filter((b) => b.type === "h2").map((b) => b.text.trim()),
  };
});

/* ---------- 1. depth ---------- */
const sortedWords = [...rows].map((r) => r.words).sort((a, b) => a - b);
const pct = (p) =>
  sortedWords[Math.min(sortedWords.length - 1, Math.floor(sortedWords.length * p))];
const depth = {
  min: sortedWords[0],
  p10: pct(0.1),
  median: pct(0.5),
  p90: pct(0.9),
  max: sortedWords[sortedWords.length - 1],
  under300: rows.filter((r) => r.words < 300).length,
  under600: rows.filter((r) => r.words < 600).length,
  noFigures: rows.filter((r) => r.figures === 0).length,
  oneFigure: rows.filter((r) => r.figures === 1).length,
  richFigures: rows.filter((r) => r.figures >= 3).length,
};

/* ---------- 2. structural sameness ---------- */
const bySignature = new Map();
for (const r of rows) bySignature.set(r.signature, (bySignature.get(r.signature) ?? 0) + 1);
const signatures = [...bySignature.entries()].sort((a, b) => b[1] - a[1]);
const modalShare = signatures[0][1] / rows.length;

// per-position block-type distribution: how predictable is each page?
const maxBlocks = Math.max(...rows.map((r) => r.blocks));
const positionProfile = [];
for (let i = 0; i < maxBlocks; i += 1) {
  const counts = {};
  let seen = 0;
  for (const r of rows) {
    const block = r.signature[i];
    if (!block) continue;
    seen += 1;
    counts[block] = (counts[block] ?? 0) + 1;
  }
  if (!seen) continue;
  const [type, count] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  positionProfile.push({ position: i + 1, dominant: type, share: count / seen, seen });
}

/* ---------- 3. near-duplicate pairs ---------- */
const pairs = [];
for (let i = 0; i < rows.length; i += 1) {
  for (let j = i + 1; j < rows.length; j += 1) {
    const score = jaccard(rows[i].shingles, rows[j].shingles);
    if (score >= 0.1) pairs.push({ a: rows[i].slug, b: rows[j].slug, score });
  }
}
pairs.sort((x, y) => y.score - x.score);

/* ---------- 4. boilerplate n-grams ---------- */
const N = 8;
const gramDocs = new Map();
for (const r of rows) {
  const w = words(postText({ body: blogPosts.find((p) => p.slug === r.slug).body }));
  const seen = new Set();
  for (let i = 0; i + N <= w.length; i += 1) {
    const g = w.slice(i, i + N).join(" ");
    if (seen.has(g)) continue;
    seen.add(g);
    const entry = gramDocs.get(g);
    if (entry) entry.count += 1;
    else gramDocs.set(g, { count: 1, slug: r.slug });
  }
}
const boilerplate = [...gramDocs.entries()]
  .filter(([, v]) => v.count >= Math.max(5, Math.ceil(rows.length * 0.05)))
  .sort((a, b) => b[1].count - a[1].count)
  .slice(0, 25)
  .map(([phrase, v]) => ({ phrase, lessons: v.count }));

/* ---------- 5. opening formulas ---------- */
const openers = new Map();
for (const r of rows) {
  const first = r.firstSentence.split(/\s+/).slice(0, 4).join(" ");
  openers.set(first, (openers.get(first) ?? 0) + 1);
}
const repeatedOpeners = [...openers.entries()]
  .filter(([, n]) => n > 1)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 15);

const anecdoteOpeners = rows.filter((r) =>
  /^(Madam|Mr|Mrs|Mama|Baba|Aunty|Uncle|A |An |One |My |When )/.test(r.firstSentence),
).length;

/* ---------- 6. repeated headings ---------- */
const h2Count = new Map();
for (const r of rows) for (const h of r.h2s) h2Count.set(h, (h2Count.get(h) ?? 0) + 1);
const repeatedHeadings = [...h2Count.entries()]
  .filter(([, n]) => n > 1)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20);

/* ---------- report ---------- */
const line = (s) => console.log(s);
line(`\nAdSense content-quality audit — ${rows.length} published lessons\n${"=".repeat(58)}`);
line(`\n1. DEPTH (words per lesson, all body text incl. captions)`);
line(
  `   min ${depth.min} · p10 ${depth.p10} · median ${depth.median} · p90 ${depth.p90} · max ${depth.max}`,
);
line(`   under 300 words: ${depth.under300} · under 600: ${depth.under600}`);
line(
  `   lessons with 0 figures: ${depth.noFigures} · exactly 1: ${depth.oneFigure} · 3+: ${depth.richFigures}`,
);

line(`\n2. STRUCTURAL SAMENESS`);
line(`   distinct block signatures: ${signatures.length} for ${rows.length} lessons`);
line(
  `   largest group: ${signatures[0][1]} lessons (${Math.round(modalShare * 100)}%) share one shape`,
);
line(
  `   second/third: ${
    signatures
      .slice(1, 3)
      .map(([, n]) => n)
      .join(" / ") || "none"
  } lessons`,
);
line(`   most predictable block positions:`);
for (const p of positionProfile.filter((x) => x.share >= 0.85).slice(0, 8)) {
  line(
    `     block ${p.position}: ${p.dominant} in ${Math.round(p.share * 100)}% of lessons (n=${p.seen})`,
  );
}

line(`\n3. NEAR-DUPLICATE PAIRS (5-word shingle Jaccard ≥ 0.10)`);
line(`   pairs found: ${pairs.length}`);
for (const p of pairs.slice(0, 10)) {
  line(`   ${p.score.toFixed(3)}  ${p.a}  ↔  ${p.b}`);
}
const over20 = pairs.filter((p) => p.score >= 0.2).length;
line(`   pairs at ≥ 0.20 (material overlap): ${over20}`);

line(`\n4. BOILERPLATE (8-word phrases appearing in ≥5% of lessons)`);
line(`   phrases found: ${boilerplate.length}`);
for (const b of boilerplate.slice(0, 10))
  line(`   ${String(b.lessons).padStart(3)}×  "${b.phrase}"`);

line(`\n5. OPENING FORMULAS`);
line(
  `   lessons opening with an anecdote construction: ${anecdoteOpeners} (${Math.round((anecdoteOpeners / rows.length) * 100)}%)`,
);
for (const [text, n] of repeatedOpeners.slice(0, 8))
  line(`   ${String(n).padStart(3)}×  "${text}…"`);

line(`\n6. REPEATED HEADINGS`);
for (const [text, n] of repeatedHeadings.slice(0, 10))
  line(`   ${String(n).padStart(3)}×  "${text}"`);

if (csvPath) {
  const header =
    "slug,order,words,paragraphWords,figures,headings,lists,blocks,signature,firstSentence";
  const rowsCsv = rows
    .slice()
    .sort((a, b) => a.words - b.words)
    .map((r) =>
      [
        r.slug,
        r.order,
        r.words,
        r.paragraphWords,
        r.figures,
        r.headings,
        r.lists,
        r.blocks,
        r.signature,
        `"${r.firstSentence.replace(/"/g, '""')}"`,
      ].join(","),
    );
  writeFileSync(csvPath, [header, ...rowsCsv].join("\n"));
  line(`\nCSV written to ${csvPath}`);
}

line(`\nInterpretation aid: depth is healthy by page. The risk sits in rows 2,`);
line(
  `4 and 5 — one shape, one rhythm and one opening formula across the corpus,\nwhich is what "scaled content" and "structural maintenance" refer to.\n`,
);
