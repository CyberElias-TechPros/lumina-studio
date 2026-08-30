/**
 * Generates seeds/external-links-data.sql + seeds/external-links.ts +
 * seeds/external-links.json + seeds/external-resources-index.md and
 * src/data/external-links.ts from a public Google Sheet.
 *
 * Parses every tab (gid) of the spreadsheet via the public gviz endpoint,
 * extracts external resource URLs with their section labels, dedupes, and
 * emits them as library_items rows with kind = 'link'.
 *
 * To add another sheet, append to SHEETS and re-run: npm run gen:links
 */
import { mkdirSync, readFileSync, existsSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(HERE, "..", "seeds");
const DATA_DIR = resolve(HERE, "..", "..", "src", "data");

const SHEET_ID = "14jCogkuMGVq_v4ChLKRGoarrxjPBP-62f47Qg-cGZPY";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit`;

let seq = 0;

interface Tab {
  gid: number;
  /** Folder name used inside "External Resources / <name>". */
  name: string;
}

const TABS: Tab[] = [
  { gid: 0, name: "Coding Roadmaps" },
  { gid: 1505346513, name: "Internships & Jobs" },
  { gid: 832667467, name: "Mentorship & Life Advice" },
  { gid: 921496985, name: "Basics & Interesting Reads" },
  { gid: 415629895, name: "Resumes" },
  { gid: 385508315, name: "Humanities Opportunities" },
  { gid: 600574570, name: "Biotech & Research Opportunities" },
  { gid: 1845832477, name: "Research & Profiles" },
  { gid: 1336049189, name: "Career & Random Links" },
];

interface LinkItem {
  id: string;
  sourceKey: string;
  folderPath: string;
  name: string;
  kind: "link";
  driveFileId: string;
  url: string;
  isProtected: boolean;
  section: string;
}

/** Parses gviz CSV output: quoted cells, "" escapes, commas and newlines inside cells. */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;
  const src = text.replace(/^\uFEFF/, "");
  for (let i = 0; i < src.length; i += 1) {
    const ch = src[i];
    if (inQuotes) {
      if (ch === '"') {
        if (src[i + 1] === '"') {
          cell += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        cell += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n") {
      row.push(cell);
      cell = "";
      rows.push(row);
      row = [];
    } else if (ch !== "\r") {
      cell += ch;
    }
  }
  if (cell !== "" || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

const URL_RE = /https?:\/\/[^\s"'<>]+/g;

function extractUrls(text: string): string[] {
  const urls = text.match(URL_RE) ?? [];
  return urls.map((u) => u.replace(/[.,;:!?]+\)?$/, ""));
}

/** Strips tracking params so duplicates like coursera affiliate links collapse. */
function normalizeUrl(url: string): string {
  try {
    const u = new URL(url);
    const drop = new Set([
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "gclid",
      "fbclid",
      "irclickid",
      "irgwc",
      "ranMID",
      "ranEAID",
      "ranSiteID",
      "siteID",
      "adid",
      "aff",
      "source",
    ]);
    for (const key of [...u.searchParams.keys()]) {
      if (drop.has(key)) u.searchParams.delete(key);
    }
    return `${u.origin}${u.pathname.replace(/\/+$/, "")}${u.search}`.toLowerCase();
  } catch {
    return url.toLowerCase();
  }
}

function cleanLabel(raw: string): string {
  return raw
    .replace(/\/{2,}/g, "")
    .replace(/^[\s.,:;!?(-]+/, "")
    .replace(/[\s.,:;!?)-]+$/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.slice(0, 60);
  }
}

function fallbackTitle(url: string): string {
  try {
    const u = new URL(url);
    const segs = u.pathname.split("/").filter(Boolean).slice(-2);
    return segs.length > 0 ? `${u.hostname.replace(/^www\./, "")}/${segs.join("/")}` : hostOf(url);
  } catch {
    return url.slice(0, 120);
  }
}

async function fetchTab(tab: Tab): Promise<string[][]> {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?gid=${tab.gid}&tqx=out:csv`;
  let lastErr: unknown;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return parseCsv(await res.text());
    } catch (err) {
      lastErr = err;
      await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
    }
  }
  throw lastErr;
}

/** Parses a bundled markdown resource list (## sections, "- url [label]"
 * bullets) and folds it into the seed under "External Resources / CS & Tech Jobs". */
function parseMarkdownResourceList(
  mdPath: string,
  folder: string,
  items: LinkItem[],
  seen: Map<string, number>,
): number {
  const md = readFileSync(mdPath, "utf8");
  let section = "";
  let count = 0;
  for (const line of md.split(/\r?\n/)) {
    const heading = line.match(/^##\s+(.+)$/);
    if (heading) {
      section = heading[1]!.trim();
      continue;
    }
    const bullet = line.match(/^\s*[-•o*]\s+(.+)$/);
    if (!bullet) continue;
    const text = bullet[1]!;
    const urls = extractUrls(text);
    if (urls.length === 0) continue;
    const label = cleanLabel(text.replace(URL_RE, " "));
    for (const rawUrl of urls) {
      const key = normalizeUrl(rawUrl);
      if (seen.has(key)) continue;
      seq += 1;
      seen.set(key, seq);
      const labelName =
        label && label !== section && label.length <= 40 ? `${section} — ${label}` : label;
      items.push({
        id: `lib-ext-${seq}`,
        sourceKey: "external",
        folderPath: folder,
        name: (labelName || section || fallbackTitle(rawUrl)).slice(0, 160),
        kind: "link",
        driveFileId: "",
        url: rawUrl,
        isProtected: false,
        section,
      });
      count += 1;
    }
  }
  return count;
}

function sqlString(value: string): string {
  return `'${value.replace(/'/g, "''").replace(/\\/g, "\\\\")}'`;
}

async function main(): Promise<void> {
  const items: LinkItem[] = [];
  const seen = new Map<string, number>();

  items.push({
    id: `lib-ext-sheet`,
    sourceKey: "external",
    folderPath: "External Resources",
    name: "Full resources spreadsheet — College & Now What?",
    kind: "link",
    driveFileId: "",
    url: SHEET_URL,
    isProtected: false,
    section: "",
  });

  for (const tab of TABS) {
    console.log(`Fetching ${tab.name} (gid=${tab.gid})…`);
    const rows = await fetchTab(tab);
    const colSections: string[] = [];
    const row1 = rows[1] ?? [];
    for (const cell of row1) {
      const label = cleanLabel(cell.replace(URL_RE, " "));
      colSections.push(label || "");
    }
    const rowLabels: string[] = [];
    for (const row of rows.slice(2)) {
      const first = cleanLabel(row[0] ?? "".replace(URL_RE, " "));
      rowLabels.push(first || "");
    }

    let count = 0;
    for (let r = 2; r < rows.length; r += 1) {
      const row = rows[r] ?? [];
      const rowLabel = rowLabels[r - 2] ?? "";
      for (let c = 0; c < row.length; c += 1) {
        const cell = row[c] ?? "";
        const urls = extractUrls(cell);
        if (urls.length === 0) continue;
        const label = cleanLabel(cell.replace(URL_RE, " "));
        const section = colSections[c] ?? "";
        for (const rawUrl of urls) {
          const key = normalizeUrl(rawUrl);
          if (seen.has(key)) continue;
          const title = label || rowLabel || section || fallbackTitle(rawUrl);
          seq += 1;
          seen.set(key, seq);
          items.push({
            id: `lib-ext-${seq}`,
            sourceKey: "external",
            folderPath: `External Resources / ${tab.name}`,
            name: title.slice(0, 160),
            kind: "link",
            driveFileId: "",
            url: rawUrl,
            isProtected: false,
            section,
          });
          count += 1;
        }
      }
    }
    console.log(`  ${count} unique links`);
  }

  const csCount = parseMarkdownResourceList(
    resolve(HERE, "..", "seeds", "cs-job-resources.md"),
    "External Resources / CS & Tech Jobs",
    items,
    seen,
  );
  console.log(`CS & Tech Jobs (markdown doc): ${csCount} unique links`);

  const sql = items
    .map((it) => {
      const isProtected = it.isProtected ? 1 : 0;
      return (
        `INSERT OR IGNORE INTO library_items ` +
        `(id, source_key, folder_path, name, kind, mime_type, drive_file_id, url, size_bytes, is_protected, sort_order) ` +
        `VALUES ('${it.id}', 'external', ${sqlString(it.folderPath)}, ${sqlString(it.name)}, ` +
        `'link', '', '', ${sqlString(it.url)}, 0, ${isProtected}, 0);`
      );
    })
    .join("\n");

  const json = items.map(({ section: _section, ...rest }) => rest);
  const md = [
    "# External Resources — College & Now What?",
    "",
    `Source spreadsheet: ${SHEET_URL}`,
    `Generated: ${new Date().toISOString()}`,
    "",
    ...items.map((it) => {
      const path = `${it.folderPath}${it.name === "Full resources spreadsheet — College & Now What?" ? "" : ` / ${it.name}`}`;
      return `- ${path}\n  ${it.url}`;
    }),
    "",
  ].join("\n");

  mkdirSync(OUT_DIR, { recursive: true });
  mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(resolve(OUT_DIR, "external-links-data.sql"), sql);
  writeFileSync(
    resolve(OUT_DIR, "external-links.ts"),
    `/* GENERATED by scripts/gen-external-links.ts — re-run: npm run gen:links */\nexport const seedExternalLinksSql = String.raw\`${sql}\`;\n`,
  );
  writeFileSync(resolve(OUT_DIR, "external-links.json"), `${JSON.stringify(json, null, 2)}\n`);
  writeFileSync(resolve(OUT_DIR, "external-resources-index.md"), md);
  writeFileSync(
    resolve(DATA_DIR, "external-links.ts"),
    `import type { LibraryItem } from "@/lib/api/library";

export const externalLinkItems: LibraryItem[] = ${JSON.stringify(json, null, 2)};
`,
  );
  console.log(
    `Wrote seeds/external-links-data.sql, seeds/external-links.ts, seeds/external-links.json, seeds/external-resources-index.md and src/data/external-links.ts (${items.length} link items).`,
  );
}

void main();
