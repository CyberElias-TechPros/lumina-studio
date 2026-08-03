/**
 * Streams the library backup to an FTP/FTPS/SFTP host, mirroring the Drive
 * folder tree, e.g. <base>/Business Analysis Library/AGILE/AGILE/02-....pdf
 *
 * - Streams Drive → server with no local disk usage.
 * - Resumable: files already on the server are skipped.
 * - Concurrent transfers; failures are logged and reported.
 *
 * Credentials (never commit these):
 *   LIBRARY_FTP_PROTO  = "ftp" | "ftps" | "sftp"   (default: ftps)
 *   LIBRARY_FTP_HOST   = e.g. ftp.example.com
 *   LIBRARY_FTP_PORT   = e.g. 21 (defaults: ftp/ftps 21, sftp 22)
 *   LIBRARY_FTP_USER   = username
 *   LIBRARY_FTP_PASS   = password
 *   LIBRARY_FTP_BASE   = remote base path, e.g. /public_html/library
 *
 * Usage: npx tsx scripts/upload-library.ts
 */
import { PassThrough } from "node:stream";
import { Readable } from "node:stream";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { readFile, writeFile } from "node:fs/promises";
import { Client as FtpClient } from "basic-ftp";
import SftpClient from "ssh2-sftp-client";

const HERE = dirname(fileURLToPath(import.meta.url));
const SEED = resolve(HERE, "..", "seeds", "library-items.json");

/** Minimal .env loader — lets you keep credentials in backend/.env (gitignored). */
async function loadDotEnv(): Promise<void> {
  const { readFileSync, existsSync } = await import("node:fs");
  const envFile = resolve(HERE, "..", ".env");
  if (!existsSync(envFile)) return;
  for (const line of readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!(key in process.env)) process.env[key] = value;
  }
}

const CONCURRENCY = Number(process.env.LIBRARY_FTP_CONCURRENCY ?? 4);

/** Persisted set of remote paths that are already fully uploaded. Lets fast
 *  restarts skip everything completed on previous runs — no FTP round trips. */
const PROGRESS_FILE = resolve(HERE, "..", "seeds", "library-upload-progress.json");

interface SeedItem {
  id: string;
  sourceKey: string;
  folderPath: string;
  name: string;
  kind: string;
  driveFileId: string;
  url: string;
  isProtected: boolean;
}

let PROTO: "ftp" | "ftps" | "sftp" = "ftps";

interface FtpEnv {
  host: string;
  user: string;
  pass: string;
  base: string;
}

let FTP_ENV: FtpEnv = { host: "", user: "", pass: "", base: "" };

let PROGRESS_SET = new Set<string>();
let progressDirty = false;

async function loadProgress(): Promise<void> {
  try {
    const raw = await readFile(PROGRESS_FILE, "utf8");
    const list = JSON.parse(raw) as string[];
    if (Array.isArray(list)) PROGRESS_SET = new Set(list);
  } catch {
    PROGRESS_SET = new Set();
  }
}

function markDone(remotePath: string): void {
  if (PROGRESS_SET.has(remotePath)) return;
  PROGRESS_SET.add(remotePath);
  progressDirty = true;
}

async function saveProgress(): Promise<void> {
  if (!progressDirty) return;
  progressDirty = false;
  await writeFile(PROGRESS_FILE, JSON.stringify([...PROGRESS_SET]));
}

function sanitize(name: string): string {
  const cleaned = name
    .replace(/[<>:"/\\|?*\u0000-\u001f]/g, "_")
    .replace(/[. ]+$/g, "")
    .trim();
  return (cleaned || "unnamed").slice(0, 160);
}

function remotePathFor(file: SeedItem, usedNames: Map<string, Set<string>>): string {
  const folder = file.folderPath
    .split(" / ")
    .map(sanitize)
    .filter(Boolean)
    .map((seg) => `/${seg}`)
    .join("");
  let name = sanitize(file.name);
  const dirKey = `${FTP_ENV.base}${folder}`;
  const taken = usedNames.get(dirKey) ?? new Set<string>();
  usedNames.set(dirKey, taken);
  if (taken.has(name.toLowerCase())) {
    let i = 2;
    const ext = name.includes(".") ? name.slice(name.lastIndexOf(".")) : "";
    const base = ext ? name.slice(0, name.lastIndexOf(".")) : name;
    while (taken.has(`${base} (${i})${ext}`.toLowerCase())) i += 1;
    name = `${base} (${i})${ext}`;
  }
  taken.add(name.toLowerCase());
  return `${dirKey}/${name}`;
}

/** Follows Drive redirects and returns the final response, handling the
 * large-file virus-scan confirmation page. */
async function resolveDriveStream(
  driveFileId: string,
): Promise<{ stream: NodeJS.ReadableStream; size: number }> {
  const baseUrl = `https://drive.usercontent.google.com/download?id=${driveFileId}&export=download&confirm=t`;
  let res = await fetch(baseUrl, { redirect: "follow" });
  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.includes("text/html")) {
    const text = await res.text();
    const action = text.match(/action="([^"]+)"/);
    const confirm = text.match(/name="confirm" value="([^"]+)"/);
    if (!action?.[1] || !confirm?.[1]) {
      throw new Error(`unexpected HTML response (${text.slice(0, 80)})`);
    }
    const actionUrl = action[1].includes("://")
      ? action[1]
      : `https://drive.usercontent.google.com${action[1]}`;
    const nextUrl = actionUrl.replace("{id}", driveFileId).replace("{confirm}", confirm[1]);
    res = await fetch(nextUrl, { redirect: "follow" });
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  if (!res.body) throw new Error("no response body");
  const size = Number(res.headers.get("content-length") ?? "0");
  return {
    stream: Readable.fromWeb(
      res.body as unknown as import("node:stream/web").ReadableStream<Uint8Array>,
    ),
    size,
  };
}

class FtpBackend {
  constructor(private client: FtpClient) {}

  async exists(remotePath: string): Promise<boolean> {
    try {
      await this.client.size(remotePath);
      return true;
    } catch {
      return false;
    }
  }

  async upload(stream: NodeJS.ReadableStream, remotePath: string): Promise<void> {
    await this.client.ensureDir(dirname(remotePath));
    await this.client.uploadFrom(stream as import("node:stream").Readable, remotePath);
  }

  async close(): Promise<void> {
    this.client.close();
  }
}

class SftpBackend {
  constructor(private client: SftpClient) {}

  async exists(remotePath: string): Promise<boolean> {
    try {
      await this.client.stat(remotePath);
      return true;
    } catch {
      return false;
    }
  }

  async upload(stream: NodeJS.ReadableStream, remotePath: string): Promise<void> {
    await this.client.mkdir(dirname(remotePath), true);
    await this.client.put(stream as import("node:stream").Readable, remotePath);
  }

  async close(): Promise<void> {
    await this.client.end();
  }
}

async function connect(): Promise<FtpBackend | SftpBackend> {
  if (PROTO === "sftp") {
    const client = new SftpClient();
    await client.connect({
      host: FTP_ENV.host,
      port: Number(process.env.LIBRARY_FTP_PORT ?? 22),
      username: FTP_ENV.user,
      password: FTP_ENV.pass,
    });
    return new SftpBackend(client);
  }
  const client = new FtpClient(10 * 60 * 1000);
  client.ftp.verbose = false;
  await client.access({
    host: FTP_ENV.host,
    port: Number(process.env.LIBRARY_FTP_PORT ?? 21),
    user: FTP_ENV.user,
    password: FTP_ENV.pass,
    secure: PROTO === "ftps",
  });
  return new FtpBackend(client);
}

async function run(): Promise<void> {
  await loadDotEnv();
  PROTO = (process.env.LIBRARY_FTP_PROTO ?? "ftps").toLowerCase() as
    | "ftp"
    | "ftps"
    | "sftp";
  FTP_ENV = {
    host: process.env.LIBRARY_FTP_HOST ?? "",
    user: process.env.LIBRARY_FTP_USER ?? "",
    pass: process.env.LIBRARY_FTP_PASS ?? "",
    base: (process.env.LIBRARY_FTP_BASE ?? "").replace(/\/+$/, ""),
  };
  if (!FTP_ENV.host || !FTP_ENV.user || !FTP_ENV.pass) {
    console.error(
      "Missing FTP credentials. Set LIBRARY_FTP_PROTO/HOST/PORT/USER/PASS/BASE (e.g. in backend/.env — gitignored).",
    );
    process.exit(1);
  }
  if (!FTP_ENV.base) {
    console.error("LIBRARY_FTP_BASE is required (remote base path).");
    process.exit(1);
  }

  const seed = JSON.parse(await readFile(SEED, "utf8")) as SeedItem[];
  const files = seed.filter((i) => i.kind === "file");
  console.log(`Seed: ${files.length} files → ${PROTO}://${FTP_ENV.host}${FTP_ENV.base}`);

  await loadProgress();
  const usedNames = new Map<string, Set<string>>();
  const jobs = files
    .map((file) => ({ file, remote: remotePathFor(file, usedNames) }))
    .filter(({ remote }) => !PROGRESS_SET.has(remote));
  const preSkipped = files.length - jobs.length;
  if (preSkipped > 0) console.log(`  ${preSkipped} already recorded — skipping without touching FTP`);
  console.log(`  ${jobs.length} remaining`);

  const backends = await Promise.all(
    Array.from({ length: CONCURRENCY }, () => connect()),
  );

  const failures: { name: string; remote: string; error: string }[] = [];
  let skipped = 0;
  let uploaded = 0;
  let next = 0;

  const flusher = setInterval(async () => {
    try {
      await saveProgress();
    } catch {
      // non-fatal
    }
  }, 5000);

  async function worker(backendIn: FtpBackend | SftpBackend): Promise<void> {
    let backend = backendIn;
    while (true) {
      const index = next;
      next += 1;
      if (index >= jobs.length) return;
      const { file, remote } = jobs[index]!;
      try {
        if (await backend.exists(remote)) {
          markDone(remote);
          skipped += 1;
          continue;
        }
        let lastErr: unknown;
        for (let attempt = 0; attempt < 3; attempt += 1) {
          try {
            const { stream } = await resolveDriveStream(file.driveFileId);
            const pass = new PassThrough();
            pass.on("error", () => {});
            stream.on("error", (err) => pass.destroy(err));
            stream.pipe(pass);
            await backend.upload(pass, remote);
            lastErr = null;
            break;
          } catch (err) {
            lastErr = err;
            if ((err as Error).message.includes("Client is closed")) {
              try {
                await backend.close();
              } catch {
                // already closed
              }
              backend = await connect();
            }
            if (attempt < 2) await new Promise((r) => setTimeout(r, 3000 * (attempt + 1)));
          }
        }
        if (lastErr) throw lastErr;
        markDone(remote);
        uploaded += 1;
      } catch (err) {
        failures.push({
          name: file.name,
          remote,
          error: err instanceof Error ? err.message : String(err),
        });
      }
      if ((skipped + uploaded + failures.length + preSkipped) % 25 === 0) {
        console.log(
          `  ${preSkipped + skipped + uploaded + failures.length}/${files.length} (${uploaded} uploaded, ${preSkipped + skipped} skipped, ${failures.length} failed)`,
        );
      }
    }
  }

  const workers = backends.map((backend) => worker(backend));
  await Promise.all(workers);
  clearInterval(flusher);
  await saveProgress();
  await Promise.all(backends.map((backend) => backend.close()));

  const INDEX_MD = resolve(HERE, "..", "seeds", "external-resources-index.md");
  try {
    const indexContent = await readFile(INDEX_MD, "utf8");
    const indexBackend = await connect();
    const indexRemote = `${FTP_ENV.base}/External Resources/INDEX.md`;
    const indexStream = Readable.from([Buffer.from(indexContent)]);
    await indexBackend.upload(indexStream, indexRemote);
    await indexBackend.close();
    console.log(`Uploaded ${indexRemote} (${indexContent.length} bytes).`);
  } catch (err) {
    console.warn(`Index upload failed: ${(err as Error).message}`);
  }

  console.log(
    `Done: ${uploaded} uploaded, ${preSkipped + skipped} already present, ${failures.length} failed.`,
  );
  if (failures.length > 0) {
    await writeFile(
      join(HERE, "..", "seeds", "library-upload-errors.log"),
      failures.map((f) => `${f.name}\t${f.remote}\t${f.error}`).join("\n"),
    );
    console.log(`Failures logged to seeds/library-upload-errors.log:`);
    for (const f of failures.slice(0, 25)) {
      console.log(`  - ${f.name}: ${f.error}`);
    }
  }
}

void run();
