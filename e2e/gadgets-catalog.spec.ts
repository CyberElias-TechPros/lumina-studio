import { expect, test } from "@playwright/test";

test("gadget catalogue searches and directs inquiries to CEA without taking payment", async ({
  page,
}) => {
  await page.route("**/*", (route) => {
    const url = new URL(route.request().url());
    if (!["localhost", "127.0.0.1"].includes(url.hostname)) return route.abort();
    return route.continue();
  });
  await page.goto("/shop");
  await page.getByRole("link", { name: "Browse gadgets" }).click();
  await expect(page).toHaveURL(/\/shop\/gadgets$/);
  await expect(page.getByRole("heading", { name: "Find your next gadget" })).toBeVisible();
  await expect(page.getByText(/No payment is collected on this page/)).toBeVisible();
  await expect(page.getByRole("status")).toContainText("87 items shown");
  await page.getByLabel("Search gadgets").fill("iPhone 15 Pro 256GB");
  await expect(page.getByRole("status")).toContainText("1 item shown");
  const card = page
    .locator("article, div")
    .filter({ has: page.getByRole("heading", { name: "iPhone 15 Pro 256GB", exact: true }) })
    .filter({ has: page.getByRole("link", { name: "Ask about this item" }) })
    .last();
  const link = card.getByRole("link", { name: "Ask about this item" });
  const url = new URL((await link.getAttribute("href"))!);
  expect(url.origin).toBe("https://wa.me");
  expect(url.pathname).toBe("/2349058628386");
  expect(url.searchParams.get("text")).toContain("iPhone 15 Pro 256GB");
  expect(url.searchParams.get("text")).toContain(
    "https://images.afkit.ng/mdumjiahzul7iulonowi.jpg",
  );
  await expect(page.getByText(/Price and availability to be confirmed/)).toBeVisible();
  await page.getByLabel("Search gadgets").fill("no such gadget 123456");
  await expect(page.getByText("No matches. Try a different search.")).toBeVisible();
});
