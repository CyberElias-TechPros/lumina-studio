import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "basic-ftp";

const HERE = dirname(fileURLToPath(import.meta.url));

async function loadDotEnv(): Promise<void> {
  try {
    const raw = await readFile(resolve(HERE, "..", ".env"), "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m && m[1] && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  } catch {
    // no .env
  }
}

async function walk(
  client: Client,
  dir: string,
  depth: number,
): Promise<{ dirs: number; files: number }> {
  let dirs = 0;
  let files = 0;
  let entries;
  try {
    entries = await client.list(dir);
  } catch {
    return { dirs: 0, files: 0 };
  }
  for (const e of entries) {
    if (e.isDirectory) {
      dirs += 1;
      if (depth !== 0) {
        const sub = await walk(client, `${dir}/${e.name}`, depth - 1);
        dirs += sub.dirs;
        files += sub.files;
      }
    } else {
      files += 1;
    }
  }
  return { dirs, files };
}

async function main(): Promise<void> {
  await loadDotEnv();
  const host = process.env.LIBRARY_FTP_HOST ?? "";
  const user = process.env.LIBRARY_FTP_USER ?? "";
  const pass = process.env.LIBRARY_FTP_PASS ?? "";
  const base = (process.env.LIBRARY_FTP_BASE ?? "").replace(/\/+$/, "");
  const client = new Client(60 * 1000);
  await client.access({ host, port: 21, user, password: pass, secure: true });
  try {
    await client.remove(`${base}/probe.txt`);
    console.log("removed leftover probe.txt");
  } catch {
    // nothing to remove
  }
  try {
    await client.removeDir(`${base}/__test__`);
    console.log("removed leftover __test__/");
  } catch {
    // nothing to remove
  }
  const { dirs, files } = await walk(client, base, -1);
  console.log(`remote ${base}: ${files} files, ${dirs} dirs (full depth)`);
  const top = await client.list(base);
  console.log(`top level (${top.length} entries):`);
  for (const e of top) {
    console.log(`  [${e.isDirectory ? "DIR" : "FILE"}] ${e.name}`);
  }
  client.close();
}

main().catch((err) => {
  console.error("VERIFY FAILED:", err);
  process.exit(1);
});
