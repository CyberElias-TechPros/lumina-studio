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
  await expect(page.getByText(/Delivery is quoted/)).toBeVisible();
  await expect(page.getByText("87 items shown")).toBeVisible();
  await page.getByLabel("Search gadgets").fill("iPhone 15 Pro 256GB");
  await expect(page.getByText("1 item shown")).toBeVisible();
  const card = page
    .locator("article, div")
    .filter({ has: page.getByRole("heading", { name: "iPhone 15 Pro 256GB", exact: true }) })
    .filter({ has: page.getByRole("link", { name: "Order on WhatsApp" }) })
    .last();
  const link = card.getByRole("link", { name: "Order on WhatsApp" });
  const url = new URL((await link.getAttribute("href"))!);
  expect(await link.getAttribute("rel")).toContain("nofollow");
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

test("fresh supplier observations show price; stale ones do not", async ({ page }) => {
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
  await expect(page.getByText("Price: ₦205,900.00")).toBeVisible();
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
  await expect(page.getByText(/Price: ₦/)).toHaveCount(0);
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
  await expect(page.getByText("Price: ₦205,900.00")).toBeVisible();
  await page.getByRole("button", { name: "Add to basket" }).click();
  await expect(page.getByText("Subtotal: ₦205,900.00")).toBeVisible();
  await expect(page.getByText("Subtotal available when all item prices are known.")).toBeVisible({
    timeout: 10000,
  });
  await expect(page.getByText(/Price: ₦/)).toHaveCount(0);
  await expect(page.getByText(/Supplier last reported/)).toHaveCount(0);
});

test("multi-item basket persists selections but uses current prices and does not promise stock", async ({
  page,
}) => {
  let price = 10000000;
  let available = 1;
  await page.route("**/*", (route) => {
    const url = new URL(route.request().url());
    if (!["localhost", "127.0.0.1", "mock-api.example.test"].includes(url.hostname))
      return route.abort();
    if (url.pathname.endsWith("/v1/gadgets/catalog"))
      return route.fulfill({
        headers: {
          "Access-Control-Allow-Origin": new URL(
            process.env.E2E_BASE_URL ?? "http://127.0.0.1:3000",
          ).origin,
        },
        json: {
          observedAt: new Date().toISOString(),
          fresh: true,
          items: [
            {
              image: "https://images.afkit.ng/one.jpg",
              title: "Laptop A",
              condition: "used",
              observedQuantity: available,
              priceKobo: available ? price : null,
            },
            {
              image: "https://images.afkit.ng/two.jpg",
              title: "Laptop B",
              condition: "new",
              observedQuantity: null,
              priceKobo: 2500000,
            },
            {
              image: "https://images.afkit.ng/unknown.jpg",
              title: "Laptop C",
              condition: "unknown",
              observedQuantity: null,
              priceKobo: null,
            },
            {
              image: "https://images.afkit.ng/zero.jpg",
              title: "Laptop D",
              condition: "new",
              observedQuantity: 0,
              priceKobo: null,
            },
          ],
        },
      });
    return route.continue();
  });
  await page.goto("/shop/gadgets");
  const card = (title: string) =>
    page
      .locator("div")
      .filter({ has: page.getByRole("heading", { name: title, exact: true }) })
      .filter({ has: page.getByRole("button", { name: /Add to basket|Currently unavailable/ }) })
      .last();
  await expect(page.getByRole("heading", { name: "Laptop A" })).toBeVisible();
  await expect(
    card("Laptop D").getByRole("button", { name: "Currently unavailable" }),
  ).toBeDisabled();
  await expect(card("Laptop D").getByRole("link", { name: "Order on WhatsApp" })).toHaveCount(0);
  await card("Laptop A").getByRole("button", { name: "Add to basket" }).click();
  await card("Laptop B").getByRole("button", { name: "Add to basket" }).click();
  await page.getByLabel("Quantity for Laptop A").selectOption("2");
  await expect(page.getByText("Subtotal: ₦225,000.00")).toBeVisible();
  const link = page.getByRole("link", { name: "Send basket on WhatsApp" });
  expect(await link.getAttribute("rel")).toContain("nofollow");
  const text = new URL((await link.getAttribute("href"))!).searchParams.get("text")!;
  expect(text).toContain("2 × Laptop A");
  expect(text).toContain("1 × Laptop B");
  expect(text).toContain("https://images.afkit.ng/one.jpg");
  expect(
    await card("Laptop A")
      .locator("a[href^='https://afkit.ng'], a[href^='https://images.afkit.ng']")
      .count(),
  ).toBe(0);
  await page.reload();
  await expect(page.getByLabel("Quantity for Laptop A")).toHaveValue("2");
  await expect(page.getByText("Subtotal: ₦225,000.00")).toBeVisible();
  price = 12000000;
  await page.reload();
  await expect(page.getByText("Subtotal: ₦265,000.00")).toBeVisible();
  await card("Laptop C").getByRole("button", { name: "Add to basket" }).click();
  await expect(page.getByText("Subtotal available when all item prices are known.")).toBeVisible();
  await page.getByRole("button", { name: "Remove Laptop C" }).click();
  await expect(page.getByText("Subtotal: ₦265,000.00")).toBeVisible();
  available = 0;
  await page.reload();
  await expect(page.getByText("Remove unavailable items to continue.")).toBeVisible();
  await expect(page.getByRole("link", { name: "Send basket on WhatsApp" })).toHaveCount(0);
  await page.getByRole("button", { name: "Remove Laptop A" }).click();
  await expect(page.getByText("Subtotal: ₦25,000.00")).toBeVisible();
});
