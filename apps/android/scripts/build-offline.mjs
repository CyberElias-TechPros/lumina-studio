import ts from 'typescript';
import { readFile, writeFile, mkdir, cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../../../', import.meta.url));
const source = await readFile(path.join(root, 'src/data/blog.ts'), 'utf8');
// This is trusted repository source, not downloaded/user-supplied code.
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const exports = {};
new Function('exports', js)(exports);
const posts = exports.blogPosts;
if (!Array.isArray(posts) || !posts.length) throw new Error('No public lessons');
const seen = new Set();
for (const post of posts) {
  if (!/^[a-z0-9-]+$/.test(post.slug) || seen.has(post.slug)) throw new Error('Invalid/duplicate slug');
  seen.add(post.slug);
  if (!Array.isArray(post.body)) throw new Error('Missing lesson body');
}
const output = path.join(root, 'apps/android/android/app/src/main/assets/reader');
await mkdir(output, { recursive: true });
await cp(path.join(root, 'apps/android/reader'), output, { recursive: true });
await writeFile(path.join(output, 'lessons.json'), JSON.stringify({ version: 1, updated: new Date().toISOString().slice(0,10), posts }));
console.log(`Bundled ${posts.length} PUBLIC lessons. No accounts, payment records or private course data included.`);
