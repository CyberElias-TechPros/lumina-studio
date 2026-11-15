import { expect, test } from "@playwright/test";

test("gadget catalogue searches and directs inquiries to CEA without taking payment", async ({
  page,
}) => {
  await page.route("**/*", (route) => {
    const url = new URL(route.request().url());
    if (!["localhost", "127.0.0.1", "mock-api.example.test"].includes(url.hostname))
      return route.abort();
    return route.continue();
  });
  await page.goto("/shop");
  await page.getByRole("link", { name: "Browse gadgets" }).click();
  await expect(page).toHaveURL(/\/shop\/gadgets$/);
  await expect(page.getByRole("heading", { name: "Find your next gadget" })).toBeVisible();
  await expect(page.getByText(/Delivery is quoted separately/)).toBeVisible();
  await expect(page.getByRole("status")).toContainText("87 items shown");
  await page.getByLabel("Search gadgets").fill("iPhone 15 Pro 256GB");
  await expect(page.getByRole("status")).toContainText("1 item shown");
  const card = page
    .locator("article, div")
    .filter({ has: page.getByRole("heading", { name: "iPhone 15 Pro 256GB", exact: true }) })
    .filter({ has: page.getByRole("link", { name: "Order on WhatsApp" }) })
    .last();
  const link = card.getByRole("link", { name: "Order on WhatsApp" });
  const url = new URL((await link.getAttribute("href"))!);
  expect(url.origin).toBe("https://wa.me");
  expect(url.pathname).toBe("/2349058628386");
  expect(url.searchParams.get("text")).toContain("iPhone 15 Pro 256GB");
  expect(url.searchParams.get("text")).toContain(
    "https://images.afkit.ng/mdumjiahzul7iulonowi.jpg",
  );
  expect(url.searchParams.get("text")).toContain("I'd like to order this gadget");
  expect(url.searchParams.get("text")).not.toMatch(/confirm|condition|availability/i);
  await expect(page.getByText("Price on request")).toBeVisible();
  await expect(page.getByText(/Price and availability to be confirmed/)).toHaveCount(0);
  await page.getByLabel("Search gadgets").fill("no such gadget 123456");
  await expect(page.getByText("No matches. Try a different search.")).toBeVisible();
});

test("fresh supplier observations show estimated price; stale ones do not", async ({ page }) => {
  await page.route("**/*", (route) => {
    const url = new URL(route.request().url());
    if (!["localhost", "127.0.0.1", "mock-api.example.test"].includes(url.hostname))
      return route.abort();
    if (url.pathname.endsWith("/v1/gadgets/catalog"))
      return route.fulfill({
        json: {
          observedAt: new Date().toISOString(),
          reportedTotal: 1,
          fresh: true,
          items: [
            {
              image: "https://images.afkit.ng/example.jpg",
              title: "Fresh test laptop",
              condition: "used",
              observedQuantity: 2,
              priceKobo: 20590000,
            },
            {
              image: "https://images.afkit.ng/ambiguous.jpg",
              title: "Laptop with screen scratch",
              condition: "unknown",
              observedQuantity: null,
              priceKobo: null,
            },
          ],
        },
        headers: {
          "Access-Control-Allow-Origin": new URL(
            process.env.E2E_BASE_URL ?? "http://127.0.0.1:3000",
          ).origin,
        },
      });
    return route.continue();
  });
  await page.goto("/shop/gadgets");
  await expect(page.getByRole("heading", { name: "Fresh test laptop" })).toBeVisible();
  await expect(page.getByText("Estimated price: ₦205,900.00")).toBeVisible();
  await expect(page.getByText("UK used", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Laptop with screen scratch" })).toBeVisible();
  await expect(page.getByText("Price on request")).toBeVisible();
  await expect(page.getByText(/Supplier last reported|Condition to confirm/)).toHaveCount(0);
  await expect(page.getByText(/Price and availability to be confirmed/)).toHaveCount(0);
  await page.unroute("**/*");
  await page.route("**/*", (route) => {
    const url = new URL(route.request().url());
    if (!["localhost", "127.0.0.1", "mock-api.example.test"].includes(url.hostname))
      return route.abort();
    if (url.pathname.endsWith("/v1/gadgets/catalog"))
      return route.fulfill({
        json: {
          observedAt: "2020-01-01T00:00:00.000Z",
          reportedTotal: 1,
          fresh: false,
          items: [
            {
              image: "https://images.afkit.ng/example.jpg",
              title: "Stale test laptop",
              condition: "used",
              observedQuantity: null,
              priceKobo: null,
            },
          ],
        },
        headers: {
          "Access-Control-Allow-Origin": new URL(
            process.env.E2E_BASE_URL ?? "http://127.0.0.1:3000",
          ).origin,
        },
      });
    return route.continue();
  });
  await page.reload();
  await expect(page.getByRole("heading", { name: "Stale test laptop" })).toBeVisible();
  await expect(page.getByText("Price on request")).toBeVisible();
  await expect(page.getByText(/Estimated price:/)).toHaveCount(0);
  await expect(page.getByText(/Supplier last reported/)).toHaveCount(0);
});

test("a price disappears when a previously fresh observation expires in an open tab", async ({
  page,
}) => {
  await page.route("**/*", (route) => {
    const url = new URL(route.request().url());
    if (!["localhost", "127.0.0.1", "mock-api.example.test"].includes(url.hostname))
      return route.abort();
    if (url.pathname.endsWith("/v1/gadgets/catalog"))
      return route.fulfill({
        json: {
          observedAt: new Date(Date.now() - 18 * 60 * 60_000 + 5000).toISOString(),
          reportedTotal: 1,
          fresh: true,
          items: [
            {
              image: "https://images.afkit.ng/example.jpg",
              title: "Expiring laptop",
              condition: "used",
              observedQuantity: 1,
              priceKobo: 20590000,
            },
          ],
        },
        headers: {
          "Access-Control-Allow-Origin": new URL(
            process.env.E2E_BASE_URL ?? "http://127.0.0.1:3000",
          ).origin,
        },
      });
    return route.continue();
  });
  await page.goto("/shop/gadgets");
  await expect(page.getByText("Estimated price: ₦205,900.00")).toBeVisible();
  await expect(page.getByText("Price on request")).toBeVisible({ timeout: 10000 });
  await expect(page.getByText(/Estimated price:/)).toHaveCount(0);
  await expect(page.getByText(/Supplier last reported/)).toHaveCount(0);
});
