import ts from "typescript";
import { readFile, writeFile, mkdir, cp, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
const root = fileURLToPath(new URL("../../../", import.meta.url));
const source = await readFile(path.join(root, "src/data/blog.ts"), "utf8");
// Compile trusted repository data only. Never evaluate downloaded lesson code.
const js = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const exports = {};
new Function("exports", js)(exports);
const posts = exports.blogPosts;
if (!Array.isArray(posts) || !posts.length) throw new Error("No public lessons");
const slugs = new Set();
const images = new Set();
for (const post of posts) {
  if (!/^[a-z0-9-]+$/.test(post.slug) || slugs.has(post.slug))
    throw new Error("Invalid lesson identity");
  slugs.add(post.slug);
  if (!post.title || !post.body?.length) throw new Error("Incomplete lesson");
  for (const block of post.body) {
    if (!["p", "h2", "ul", "figure"].includes(block.type))
      throw new Error("Unsupported block: " + block.type);
    if (block.type === "figure") {
      if (!/^\/images\/blog\/[a-z0-9-]+\.(jpg|png|webp)$/.test(block.src) || !block.alt)
        throw new Error("Invalid public figure");
      images.add(block.src);
    } else if (block.type === "ul") {
      if (!block.items?.length || block.items.some((item) => typeof item !== "string"))
        throw new Error("Invalid list");
    } else if (typeof block.text !== "string" || !block.text) throw new Error("Missing text");
  }
}
const output = path.join(root, "apps/android-native/app/src/main/assets/public-lessons");
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const src of images) {
  const target = path.join(output, src);
  await mkdir(path.dirname(target), { recursive: true });
  await cp(path.join(root, "public", src), target);
}
// Deterministic: content, not build time, controls changes.
await writeFile(path.join(output, "lessons.json"), JSON.stringify({ version: 1, posts }));
console.log(
  `Bundled ${posts.length} public lessons and ${images.size} figures from the website source.`,
);
