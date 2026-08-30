import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROUTES = "src/routes";

function walk(dir) {
  let out = [];
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    const s = statSync(p);
    if (s.isDirectory()) out = out.concat(walk(p));
    else if (
      e.endsWith(".tsx") &&
      !e.startsWith("app.") &&
      !e.startsWith("auth.") &&
      e !== "__root.tsx" &&
      e !== "sitemap.xml.tsx" &&
      !p.includes("portal")
    )
      out.push(p);
  }
  return out;
}

// Extract literal JSX text nodes: >text< where text has no braces/tags
function jsxTextNodes(src) {
  const nodes = [];
  const re = />(\s*)([^<>{}]*[A-Za-z][^<>{}]*)\s*</g;
  let m;
  while ((m = re.exec(src))) {
    const t = m[2].replace(/\s+/g, " ").trim();
    if (t.length >= 3) nodes.push(t);
  }
  return nodes;
}

function analyze(file) {
  const src = readFileSync(file, "utf8");
  // remove imports so we only measure rendered markup
  const body = src.replace(/^import[\s\S]*?from\s+["'][^"']+["'];?\s*$/gm, "");
  const nodes = jsxTextNodes(body);
  const words = nodes.join(" ").split(/\s+/).filter(Boolean);
  const uniq = new Set(words.map((w) => w.toLowerCase().replace(/[^a-z0-9]/g, "")));
  // headings give structure hints
  const h2 = [...src.matchAll(/<CardTitle[^>]*>([\s\S]*?)<\/CardTitle>/g)].length;
  return {
    file: file.replace(/\\/g, "/"),
    textNodes: nodes.length,
    words: words.length,
    uniqueWords: uniq.size,
  };
}

const files = walk(ROUTES)
  .map(analyze)
  .sort((a, b) => a.words - b.words);
console.log("file\ttextNodes\twords\tuniqueWords");
for (const r of files) console.log(`${r.file}\t${r.textNodes}\t${r.words}\t${r.uniqueWords}`);
