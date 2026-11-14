#!/usr/bin/env node
// Runs only on an authorized runner with an isolated, read-only browser.
import { chromium } from "playwright";
import { extractVisibleCards } from "./lib/afkit-snapshot.mjs";
import { collectSnapshot } from "./lib/afkit-sync-logic.mjs";

if (process.env.AFKIT_AUTOMATION_AUTHORIZED !== "true")
  throw new Error("Supplier automation authorization is not confirmed; no collection performed.");
const token = process.env.AFKIT_SYNC_TOKEN;
if (!token || !/^[A-Za-z0-9_-]{32,256}$/.test(token))
  throw new Error("AFKIT_SYNC_TOKEN must be configured as a strong server-only token.");
const endpoint = "https://cea-api.cyber-e54.workers.dev/v1/gadgets/snapshot";
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
    if (
      u.protocol !== "https:" ||
      (route.request().method() !== "GET" && route.request().method() !== "HEAD") ||
      (u.port && u.port !== "443") ||
      !(u.hostname === "afkit.ng" || u.hostname.endsWith(".afkit.ng")) ||
      u.username ||
      u.password
    )
      return route.abort();
    return route.continue();
  });
  await context.routeWebSocket("**/*", (socket) => socket.close());
  const page = await context.newPage();
  async function read(n) {
    const response = await page.goto(`https://afkit.ng/shop/listing?page=${n}`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    const u = new URL(page.url());
    if (
      !response?.ok() ||
      u.protocol !== "https:" ||
      u.hostname !== "afkit.ng" ||
      u.pathname !== "/shop/listing"
    )
      throw new Error(`Supplier page ${n} failed or redirected.`);
    await page.waitForFunction(
      () => {
        const m = document.body?.innerText?.match(/DISCOVERED\s+([\d,]+)\s+GADGETS/i);
        return Boolean(m && Number(m[1].replace(/,/g, "")) > 0);
      },
      null,
      { timeout: 30000 },
    );
    await page.waitForTimeout(1500);
    return page.evaluate(extractVisibleCards);
  }
  const { cards: clean, total } = await collectSnapshot(read, () => page.waitForTimeout(2000));
  const response = await fetch(endpoint, {
    method: "POST",
    redirect: "error",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      observedAt: new Date().toISOString(),
      reportedTotal: total,
      cards: clean,
    }),
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok)
    throw new Error(`Snapshot upload failed (HTTP ${response.status}); no customer data sent.`);
  console.log(
    `Uploaded ${clean.length} observed products; supplier reported ${total}. Availability still requires confirmation.`,
  );
} finally {
  await browser.close();
}
