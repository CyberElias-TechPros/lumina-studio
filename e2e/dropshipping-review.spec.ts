import { expect, test } from "@playwright/test";
import { extractVisibleCards, renderSnapshot } from "../scripts/lib/afkit-snapshot.mjs";

const origin = new URL(process.env.E2E_BASE_URL ?? "http://127.0.0.1:3001").origin;
const cors = {
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};
test.use({ serviceWorkers: "block" });

test("scraper card extraction preserves the condition and defect text in an isolated fixture", async ({
  page,
}) => {
  await page.route("**/*", (route) => route.abort());
  await page.setContent(
    `<p>DISCOVERED 2 GADGETS</p><div><img src="https://images.afkit.ng/one.jpg"><p>1 left</p><p>UK Used</p><h2>Example laptop — casing scratch</h2><p>₦175,000</p><button>Add to cart</button></div><div><img src="https://images.afkit.ng/two.jpg"><p>Brand New</p><h2>Example accessory</h2><p>₦12,000₦9,000</p><button>Add to cart</button></div>`,
  );
  const result = await page.evaluate(extractVisibleCards);
  expect(result.total).toBe(2);
  expect(result.cards).toHaveLength(2);
  expect(result.cards[0]).toMatchObject({
    title: "Example laptop — casing scratch",
    quantity: "1",
    condition: "UK Used",
    prices: ["175,000"],
  });
  expect(result.cards[1]).toMatchObject({
    quantity: null,
    condition: "Brand New",
    prices: ["12,000", "9,000"],
  });
  const text = renderSnapshot(result.cards, "2026-01-01T00:00:00Z");
  expect(text).toContain("Example laptop — casing scratch");
  expect(text).toContain("₦12,000₦9,000");
});

test("admin reviews an observation and bounded discount locally without publishing", async ({
  page,
}) => {
  const writes: string[] = [];
  await page.addInitScript(() => localStorage.setItem("cea:onboarding:tour:v1", "test"));
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (!["localhost", "127.0.0.1"].includes(url.hostname)) return route.abort();
    if (!url.pathname.startsWith("/v1/")) return route.continue();
    if (route.request().method() === "OPTIONS")
      return route.fulfill({ status: 204, headers: cors });
    if (route.request().method() !== "GET") writes.push(url.pathname);
    const user = {
      id: "admin-test",
      name: "Admin",
      email: "admin@example.test",
      roleKey: "admin",
      permissions: ["*"],
    };
    if (url.pathname === "/v1/auth/session")
      return route.fulfill({ headers: cors, json: { user, expiresAt: "2099-01-01T00:00:00Z" } });
    if (url.pathname === "/v1/account")
      return route.fulfill({ headers: cors, json: { ...user, emailVerified: true } });
    return route.fulfill({ headers: cors, json: { items: [], total: 0, nextCursor: null } });
  });
  await page.goto("/app/admin/dropshipping");
  await expect(page.getByRole("heading", { name: "Afkit review workspace" })).toBeVisible();
  await page
    .getByLabel("Listing snapshot for review")
    .fill(
      `![Observation](https://images.afkit.ng/one.jpg)\n\n1 left\n\nUK Used\n\n## Example laptop — casing scratch\n\n₦175,000\n\nAdd to cart`,
    );
  await page.getByRole("button", { name: "Review snapshot" }).click();
  await expect(
    page.getByRole("heading", { name: "Example laptop — casing scratch" }),
  ).toBeVisible();
  await expect(page.getByText(/Observed quantity: 1/)).toBeVisible();
  await expect(page.getByText(/Suggested minimum:/)).toHaveCount(0);
  await page.getByLabel("Estimated supplier cost for this item (₦)").fill("175000");
  await page.getByLabel("Other per-item costs (₦)").fill("3000");
  await page.getByRole("checkbox", { name: /I have entered my estimated additional/ }).check();
  await expect(page.getByText(/Suggested minimum:/)).toContainText("₦203,600.00");
  await page.getByLabel("Optional proposed regular price (₦)").fill("210000");
  await expect(page.getByText(/Maximum estimated discount:/)).toContainText("₦6,400.00");
  await page.getByLabel("Optional proposed regular price (₦)").fill("200000");
  await expect(page.getByText(/below the estimated floor/)).toBeVisible();
  expect(writes).toEqual([]);
  await page.reload();
  await expect(page.getByRole("heading", { name: "Example laptop — casing scratch" })).toHaveCount(
    0,
  );
});

test("signed-in non-admin cannot access the review workspace", async ({ page }) => {
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (!["localhost", "127.0.0.1"].includes(url.hostname)) return route.abort();
    if (!url.pathname.startsWith("/v1/")) return route.continue();
    if (route.request().method() === "OPTIONS")
      return route.fulfill({ status: 204, headers: cors });
    const user = {
      id: "student-test",
      name: "Student",
      email: "student@example.test",
      roleKey: "student",
      permissions: [],
    };
    if (url.pathname === "/v1/auth/session")
      return route.fulfill({ headers: cors, json: { user, expiresAt: "2099-01-01T00:00:00Z" } });
    if (url.pathname === "/v1/account")
      return route.fulfill({ headers: cors, json: { ...user, emailVerified: true } });
    return route.fulfill({ headers: cors, json: { items: [], total: 0, nextCursor: null } });
  });
  await page.goto("/app/admin/dropshipping");
  await expect(page.getByRole("heading", { name: "This workspace is restricted" })).toBeVisible();
  await expect(page.getByLabel("Listing snapshot for review")).toHaveCount(0);
});
