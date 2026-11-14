#!/usr/bin/env node
// Explicitly invoked, read-only review snapshot. Never publishes or sends orders.
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { extractVisibleCards, renderSnapshot } from "./lib/afkit-snapshot.mjs";

if (!process.argv.includes("--permission-confirmed")) {
  console.error(
    "Confirm Afkit has authorized this automated collection and reuse for review before running: node scripts/afkit-review-snapshot.mjs --permission-confirmed",
  );
  process.exit(1);
}
const outputDirectory = resolve("supplier-reviews.local");
const browser = await chromium.launch({ headless: true });
try {
  const context = await browser.newContext({ serviceWorkers: "block" });
  await context.route("**/*", async (route) => {
    let u;
    try {
      u = new URL(route.request().url());
    } catch {
      return route.abort();
    }
    const host = u.hostname.toLowerCase();
    if (
      u.protocol !== "https:" ||
      (route.request().method() !== "GET" && route.request().method() !== "HEAD") ||
      (u.port && u.port !== "443") ||
      !(host === "afkit.ng" || host.endsWith(".afkit.ng")) ||
      u.username ||
      u.password
    )
      return route.abort();
    return route.continue();
  });
  // The page is untrusted: prevent background socket traffic as well as writes.
  await context.routeWebSocket("**/*", (socket) => socket.close());
  const page = await context.newPage();
  let expected = null;
  const all = [];
  let firstFingerprint = "";
  const readPage = async (n) => {
    const url = `https://afkit.ng/shop/listing?page=${n}`;
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    const final = new URL(page.url());
    if (
      final.protocol !== "https:" ||
      final.hostname !== "afkit.ng" ||
      final.pathname !== "/shop/listing"
    )
      throw new Error("Unexpected redirect; no snapshot saved.");
    await page.waitForFunction(
      () => /DISCOVERED\s+[\d,]+\s+GADGETS/i.test(document.body?.innerText || ""),
      { timeout: 30000 },
    );
    await page.waitForTimeout(1500);
    return page.evaluate(extractVisibleCards);
  };
  for (let n = 1; n <= 10; n++) {
    const result = await readPage(n);
    if (
      !Number.isSafeInteger(result.total) ||
      result.total < 1 ||
      result.total > 200 ||
      !result.cards.length
    )
      throw new Error(`Could not reliably read page ${n}; no snapshot saved.`);
    if (expected === null) {
      expected = result.total;
      firstFingerprint = JSON.stringify(result.cards);
    }
    if (result.total !== expected)
      throw new Error("The supplier total changed during collection; no snapshot saved.");
    all.push(...result.cards);
    if (all.length >= expected) break;
    await page.waitForTimeout(2000);
  }
  const unique = new Set(all.map((card) => card.imageUrl));
  if (all.length !== expected || unique.size !== all.length)
    throw new Error(
      `Incomplete or duplicate observations (${all.length} cards for ${expected} reported); no snapshot saved.`,
    );
  await page.waitForTimeout(2000);
  const recheck = await readPage(1);
  if (recheck.total !== expected || JSON.stringify(recheck.cards) !== firstFingerprint)
    throw new Error("The first page changed during collection; no snapshot saved.");
  const observedAt = new Date().toISOString();
  await mkdir(outputDirectory, { recursive: true, mode: 0o700 });
  const output = resolve(
    outputDirectory,
    `afkit-observation-${observedAt.replace(/[:.]/g, "-")}.md`,
  );
  await writeFile(output, renderSnapshot(all, observedAt), {
    encoding: "utf8",
    flag: "wx",
    mode: 0o600,
  });
  console.log(
    `Saved ${all.length} observations for manual review to ${output}. Matching counts do not guarantee a complete or current catalogue.`,
  );
} catch (err) {
  console.error(err instanceof Error ? err.message : "Snapshot failed; no snapshot saved.");
  process.exitCode = 1;
} finally {
  await browser.close();
}
