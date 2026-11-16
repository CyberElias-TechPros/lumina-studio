#!/usr/bin/env node
/**
 * Build script: convert the vendored AI Engineering from Scratch lessons
 * (src/content/ai-lessons, MIT — see NOTICE.md) into per-phase TS modules
 * plus a compact lookup index consumed by the /ai-engineering routes.
 *
 * Vendored Markdown is the source of truth — never hand-edit anything this
 * script emits, and never hand-edit the Markdown itself. To refresh: re-copy
 * phases/<phase>/<lesson>/docs/en.md and quiz.json from the upstream repository, then run
 * this script again.
 *
 * Emitted (all git-ignored):
 *   src/content/ai-lessons-rendered/<phase>.json      lessons with pre-rendered HTML (git-ignored, read via fs at runtime)
 *   src/data/ai-lessons-index.generated.ts            titles/minutes/quiz flags (imported by the index route & sitemap/metadata)
 */
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import katex from "katex";

const ROOT = new URL("..", import.meta.url).pathname;
const CONTENT = join(ROOT, "src/content/ai-lessons");
const OUT_RENDERED = join(ROOT, "src/content/ai-lessons-rendered");
const OUT_INDEX = join(ROOT, "src/data/ai-lessons-index.generated.ts");
const SITE = "https://aiengineeringfromscratch.com";

rmSync(OUT_RENDERED, { recursive: true, force: true });
mkdirSync(OUT_RENDERED, { recursive: true });

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const stripPrefix = (name) => name.replace(/^\d+-/, "");
const canonical = (phase, lesson) => `${SITE}/learn/${stripPrefix(phase)}/${stripPrefix(lesson)}`;
const codeUrl = (phase, lesson) =>
  `https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/${phase}/${lesson}`;

function extractMeta(md) {
  const titleMatch = md.match(/^#\s+(.+?)\s*$/m);
  const title = titleMatch ? titleMatch[1].trim() : null;
  const timeMatch = md.match(
    /\*\*Time:\*\*\s*~?\s*(\d+(?:\.\d+)?)\s*(hours?|hrs?|h|minutes?|mins?|m)\b/i,
  );
  let minutes = null;
  if (timeMatch) {
    const value = Number(timeMatch[1]);
    minutes = /^h/i.test(timeMatch[2]) ? Math.round(value * 60) : Math.round(value);
  }
  return { title, minutes };
}

function mermaidCallout(source, href) {
  return `<figure class="ai-figure-callout"><figcaption>Interactive diagram (Mermaid)</figcaption><p>This curriculum renders diagrams live on its own site. <a href="${esc(href)}" rel="noopener noreferrer">Open the canonical lesson</a>.</p><details><summary>Diagram source</summary><pre><code>${esc(source)}</code></pre></details></figure>`;
}

function figureCallout(source, href) {
  return `<figure class="ai-figure-callout ai-figure-interactive"><figcaption>Interactive figure</figcaption><p>This figure is a small animated demo that lives on the curriculum’s site. <a href="${esc(href)}" rel="noopener noreferrer">Open the canonical lesson</a>.</p></figure>`;
}

function renderLesson(md, phase, lesson) {
  const href = canonical(phase, lesson);
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(() => (tree) => {
      visit(tree, (node) => {
        if (node.type === "code") {
          const lang = (node.lang || "").toLowerCase();
          if (lang === "math") {
            node.type = "html";
            node.value =
              '<div class="ai-math">' +
              katex.renderToString(node.value, {
                displayMode: true,
                throwOnError: false,
                strict: "ignore",
              }) +
              "</div>";
          } else if (lang === "mermaid") {
            node.type = "html";
            node.value = mermaidCallout(node.value, href);
          } else if (lang === "figure") {
            node.type = "html";
            node.value = figureCallout(node.value, href);
          } else {
            node.data = { hProperties: { "data-lang": lang || undefined } };
          }
          return;
        }
        if (node.type === "inlineMath") {
          const html = katex.renderToString(node.value, {
            displayMode: false,
            throwOnError: false,
            strict: "ignore",
          });
          node.type = "html";
          node.value = `<span class="ai-math-inline">${html}</span>`;
          return;
        }
        if (node.type === "math") {
          const html = katex.renderToString(node.value, {
            displayMode: true,
            throwOnError: false,
            strict: "ignore",
          });
          node.type = "html";
          node.value = `<div class="ai-math">${html}</div>`;
        }
      });
    })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify);
  return String(processor.processSync(md));
}

const phases = readdirSync(CONTENT, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const index = [];
let totalRendered = 0;
let totalQuizzes = 0;

for (const phase of phases) {
  const lessonFiles = readdirSync(join(CONTENT, phase))
    .filter((name) => name.endsWith(".md"))
    .sort();
  const lessons = [];
  for (const file of lessonFiles) {
    const slug = file.replace(/\.md$/, "");
    const md = readFileSync(join(CONTENT, phase, file), "utf8");
    const { title, minutes } = extractMeta(md);
    if (!title) throw new Error(`No title found in ${phase}/${file}`);
    let quizQuestions = null;
    try {
      const rawQuiz = readFileSync(join(CONTENT, phase, `${slug}.quiz.json`), "utf8");
      const parsed = JSON.parse(rawQuiz);
      const questions = Array.isArray(parsed) ? parsed : parsed.questions;
      if (Array.isArray(questions) && questions.length > 0) quizQuestions = questions;
    } catch {
      /* no quiz for this lesson */
    }
    if (quizQuestions) totalQuizzes += 1;
    const html = renderLesson(md, phase, slug);
    lessons.push({
      slug,
      title,
      minutes,
      quiz: quizQuestions,
      html,
      canonical: canonical(phase, slug),
      codeUrl: codeUrl(phase, slug),
    });
    index.push({
      key: `${phase}/${slug}`,
      phase,
      lesson: slug,
      title,
      minutes,
      quiz: Boolean(quizQuestions),
    });
  }
  writeFileSync(join(OUT_RENDERED, `${phase}.json`), JSON.stringify(lessons));
  totalRendered += Buffer.byteLength(JSON.stringify(lessons));
}

const indexModule =
  "// AUTO-GENERATED by scripts/generate-ai-lessons.mjs — do not edit.\n" +
  "export type AiLessonIndexEntry = { key: string; phase: string; lesson: string; title: string; minutes: number | null; quiz: boolean };\n" +
  `export const AI_LESSON_INDEX: readonly AiLessonIndexEntry[] = ${JSON.stringify(index)};\n` +
  `export const AI_LESSON_COUNT = ${index.length};\n`;
writeFileSync(OUT_INDEX, indexModule);

console.log(
  `ai-lessons content written: ${index.length} lessons across ${phases.length} phases, ` +
    `${(totalRendered / 1024 / 1024).toFixed(1)} MB rendered JSON (+${(Buffer.byteLength(indexModule) / 1024).toFixed(0)} KB index), ${totalQuizzes} quizzes`,
);
