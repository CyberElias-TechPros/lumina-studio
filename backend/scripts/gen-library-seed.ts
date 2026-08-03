/**
 * Generates seeds/library-data.sql + seeds/library.ts + src/data/library.ts
 * from public Google Drive folders.
 *
 * - Walks each source folder recursively via the public embedded-folder-view
 *   page (no API key needed) and preserves the folder structure.
 * - Items inside folders listed in `publicFolders` are marked public; every
 *   other item is course material and marked protected (students/staff only).
 * - To add another Drive, append a source with its folder id and the
 *   public-folder allowlist, then run: npm run gen:library
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const OUT_DIR = resolve(dirname(fileURLToPath(import.meta.url)), "..", "seeds");
const DATA_DIR = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..", "src", "data");

interface Source {
  key: string;
  name: string;
  folderId: string;
  /** Folder names (uppercase-insensitive) whose contents are public. */
  publicFolders: string[];
}

const SOURCES: Source[] = [
  {
    key: "ba-library",
    name: "Business Analysis Library",
    folderId: "1if09a9QyNfBRlAKey7If5preZ3BswudZ",
    publicFolders: ["GLOSSARY", "DATA DICTIONARY"],
  },
  {
    key: "ds-toolbox",
    name: "Data Scientist's Toolbox",
    folderId: "1CgN7DE3pNRNh_4BA_zrrMLqWz6KquwuD",
    publicFolders: [],
  },
];

interface Entry {
  name: string;
  kind: "file" | "folder";
  id: string;
  url: string;
}

interface Row extends Entry {
  sourceKey: string;
  folderPath: string;
  isProtected: boolean;
}

const MAX_DEPTH = 5;
const CONCURRENCY = 4;

function decodeHtml(value: string): string {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec: string) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

function decodeDriveHtml(bytes: ArrayBuffer): string {
  const utf8 = new TextDecoder("utf-8").decode(bytes);
  if (!utf8.includes("\uFFFD")) return utf8;
  return new TextDecoder("iso-8859-1").decode(bytes);
}

async function fetchEntries(folderId: string): Promise<Entry[]> {
  const url = `https://drive.google.com/embeddedfolderview?id=${folderId}#list`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = decodeDriveHtml(await res.arrayBuffer());
  const entries: Entry[] = [];
  const parts = html.split('<div class="flip-entry" id="entry-');
  for (const part of parts.slice(1)) {
    const id = part.slice(0, part.indexOf('"'));
    const hrefMatch = part.match(/<a href="(https:\/\/drive\.google\.com\/(?:drive\/folders|file\/d)\/[^"]+)"/);
    const titleMatch = part.match(/<div class="flip-entry-title">([^<]+)<\/div>/);
    if (!hrefMatch?.[1] || !titleMatch?.[1]) continue;
    const href = hrefMatch[1].replace(/&amp;/g, "&");
    const name = decodeHtml(titleMatch[1].trim());
    const kind = href.includes("/drive/folders/") ? "folder" : "file";
    entries.push({ name, kind, id, url: href });
  }
  return entries;
}

async function walk(
  source: Source,
  folderId: string,
  path: string[],
  depth: number,
  rows: Row[],
  publicNames: Set<string>,
): Promise<void> {
  if (depth > MAX_DEPTH) return;
  const isTopLevel = depth === 1;
  let entries: Entry[];
  try {
    entries = await fetchEntries(folderId);
  } catch (err) {
    console.warn(`  ! skipped ${folderId} (${(err as Error).message})`);
    return;
  }
  for (const entry of entries) {
    const inPublicFolder = isTopLevel
      ? publicNames.has(entry.name.toUpperCase())
      : publicNames.has(path[0]?.toUpperCase() ?? "");
    const isProtected = !inPublicFolder;
    const name = entry.name.replace(/\s+/g, " ").trim();
    rows.push({
      sourceKey: source.key,
      folderPath: path.join(" / "),
      name,
      kind: entry.kind,
      id: entry.id,
      url: entry.url,
      isProtected,
    });
    if (entry.kind === "folder") {
      await walk(source, entry.id, [...path, name], depth + 1, rows, publicNames);
    }
  }
}

function sqlString(value: string): string {
  return `'${value.replace(/'/g, "''").replace(/\\/g, "\\\\")}'`;
}

async function main(): Promise<void> {
  const rows: Row[] = [];
  const seen = new Set<string>();
  for (const source of SOURCES) {
    console.log(`Scanning ${source.name} (${source.folderId})…`);
    const publicNames = new Set(source.publicFolders.map((f) => f.toUpperCase()));
    await walk(source, source.folderId, [source.name], 1, rows, publicNames);
    console.log(`  ${rows.filter((r) => r.sourceKey === source.key).length} entries`);
  }

  const unique = rows.filter((r) => {
    const key = `${r.sourceKey}|${r.kind}|${r.id}|${r.name}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const numbered = unique.map((r, i) => ({ ...r, itemId: `lib-${r.sourceKey}-${i + 1}` }));

  const statements = numbered.map((r) => {
    const isProtected = r.isProtected ? 1 : 0;
    return (
      `INSERT OR IGNORE INTO library_items ` +
      `(id, source_key, folder_path, name, kind, mime_type, drive_file_id, url, size_bytes, is_protected, sort_order) ` +
      `VALUES ('${r.itemId}', ${sqlString(r.sourceKey)}, ${sqlString(r.folderPath)}, ` +
      `${sqlString(r.name)}, ${sqlString(r.kind)}, '', ${sqlString(r.id)}, ${sqlString(r.url)}, 0, ${isProtected}, 0);`
    );
  });

  const sql = statements.join("\n");
  const tsData = `import type { LibraryItem } from "@/lib/api/library";

export const libraryItems: LibraryItem[] = ${JSON.stringify(
    numbered.map((r) => ({
      id: r.itemId,
      sourceKey: r.sourceKey,
      folderPath: r.folderPath,
      name: r.name,
      kind: r.kind,
      driveFileId: r.id,
      url: r.url,
      isProtected: r.isProtected,
    })),
    null,
    2,
  )};
`;

  mkdirSync(OUT_DIR, { recursive: true });
  mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(resolve(OUT_DIR, "library-data.sql"), sql);
  writeFileSync(
    resolve(OUT_DIR, "library.ts"),
    `/* GENERATED by scripts/gen-library-seed.ts — re-run: npm run gen:library */\nexport const seedLibrarySql = String.raw\`${sql}\`;\n`,
  );
  writeFileSync(
    resolve(OUT_DIR, "library-items.json"),
    `${JSON.stringify(
      numbered.map((r) => ({
        id: r.itemId,
        sourceKey: r.sourceKey,
        folderPath: r.folderPath,
        name: r.name,
        kind: r.kind,
        driveFileId: r.id,
        url: r.url,
        isProtected: r.isProtected,
      })),
      null,
      2,
    )}\n`,
  );
  writeFileSync(resolve(DATA_DIR, "library.ts"), tsData);
  console.log(`Wrote seeds/library-data.sql, seeds/library.ts, seeds/library-items.json and src/data/library.ts (${unique.length} entries).`);
}

void main();
