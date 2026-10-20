import { readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
const root = fileURLToPath(new URL("../../../", import.meta.url));
async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (/\.tsx?$/.test(entry.name)) files.push(full);
  }
  return files;
}
const routes = [];
for (const full of await walk(path.join(root, "src/routes"))) {
  const text = await readFile(full, "utf8");
  const match = text.match(/createFileRoute\(\s*["']([^"']+)["']/);
  if (match) routes.push({ route: match[1], source: path.relative(root, full) });
}
routes.sort((a, b) => a.route.localeCompare(b.route));
const data =
  JSON.stringify(
    {
      note: "Source-route reachability inventory, NOT proof of Android workflow coverage. Includes redirects and dynamic route patterns. Shared hosted site implements these routes; require device acceptance for each feature family.",
      routes,
    },
    null,
    2,
  ) + "\n";
const target = path.join(root, "apps/android/route-inventory.json");
if (process.argv.includes("--check")) {
  if ((await readFile(target, "utf8")) !== data)
    throw new Error(
      "Website route inventory changed. Regenerate, review Android feature parity, and commit the new inventory.",
    );
} else await writeFile(target, data);
console.log(`${routes.length} source route patterns tracked for Android parity review.`);
