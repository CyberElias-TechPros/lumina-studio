import { test, expect } from "@playwright/test";

// Pages are relative — playwright.config.ts supplies the baseURL
// (E2E_BASE_URL, defaulting to https://cea.ng).
const BASE_URL = "";

const publicPages = [
  { path: "/", title: "Cyber Elias Academy" },
  { path: "/about", title: "About" },
  { path: "/classes", title: "Practical Digital Skills" },
  { path: "/programs", title: "Practical Digital Skills" },
  { path: "/pricing", title: "Practical Digital Skills" },
  { path: "/engines", title: "Practical Digital Skills" },
  { path: "/services", title: "Contact" },
  { path: "/work", title: "About" },
  { path: "/community", title: "About" },
  { path: "/blog", title: "Notes" },
  { path: "/editorial", title: "How we make and maintain" },
  { path: "/faq", title: "FAQ" },
  { path: "/events", title: "Visit" },
  { path: "/scholarships", title: "Admissions" },
  { path: "/contact", title: "Contact" },
  { path: "/privacy", title: "Privacy" },
  { path: "/terms", title: "Terms" },
  { path: "/accessibility", title: "Accessibility" },
  { path: "/admissions", title: "Admissions" },
  { path: "/alumni", title: "About" },
  { path: "/careers", title: "Contact" },
  { path: "/stories", title: "About" },
  { path: "/virtual-tour", title: "Visit" },
  { path: "/library", title: "Practical Digital Skills" },
  { path: "/marketplace", title: "Practical Digital Skills" },
  { path: "/partners", title: "Contact" },
  { path: "/team", title: "Team" },
  { path: "/sitemap.xml", title: "" },
];

test.describe("Public page smoke tests", () => {
  for (const page of publicPages) {
    test(`loads ${page.path} (${page.title || "sitemap"})`, async ({ page: pw }) => {
      const response = await pw.goto(`${BASE_URL}${page.path}`);
      expect(response?.status()).toBe(200);

      if (page.title) {
        await expect(pw).toHaveTitle(new RegExp(page.title, "i"));
      }

      const content = await pw.content();
      expect(content.length).toBeGreaterThan(500);
    });
  }
});

test("navbar has all main links", async ({ page }) => {
  await page.goto(BASE_URL);

  const navLinks = ["Courses", "Admissions", "About", "Contact"];
  for (const link of navLinks) {
    await expect(page.locator(`nav a:has-text("${link}")`).first()).toBeVisible();
  }
});

test("footer has legal links in Company column", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator('footer a[href="/privacy"]')).toBeVisible();
  await expect(page.locator('footer a[href="/terms"]')).toBeVisible();
  await expect(page.locator('footer a[href="/accessibility"]')).toBeVisible();
  await expect(page.locator('footer a[href="/about"]')).toBeVisible();
});

test("mobile menu shows More dropdown links", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(BASE_URL);

  await page.click('aria-label="Menu"');

  const subLinks = ["Courses", "Admissions", "About", "Contact", "FAQ", "Apply"];
  for (const link of subLinks) {
    await expect(page.locator(`a:has-text("${link}")`).first()).toBeVisible();
  }
});

test("sitemap.xml is valid XML", async ({ page }) => {
  const response = await page.goto(`${BASE_URL}/sitemap.xml`);
  expect(response?.status()).toBe(200);

  const contentType = response?.headers()["content-type"];
  expect(contentType).toContain("xml");

  const content = await page.content();
  expect(content).toContain("<urlset");
  expect(content).toContain("<url>");
  expect(content).toContain("<loc>");
});

test("every sitemap destination resolves successfully", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  const paths = [...xml.matchAll(/<loc>https:\/\/cea\.ng([^<]*)<\/loc>/g)].map((match) => match[1]);
  expect(paths.length).toBeGreaterThan(0);

  const failures: string[] = [];
  for (const path of paths) {
    const response = await request.get(path);
    if (response.status() !== 200) failures.push(`${response.status()} ${path}`);
  }
  expect(failures, `Broken sitemap destinations:\n${failures.join("\n")}`).toEqual([]);
});

test("Apply now button links to admissions", async ({ page }) => {
  await page.goto(BASE_URL);

  const applyButton = page.locator('a[href="/apply"]').first();
  await expect(applyButton).toBeVisible();
});

test("no 404 errors on key navigation", async ({ page }) => {
  const paths = [
    "/classes",
    "/about",
    "/blog",
    "/admissions",
    "/privacy",
    "/terms",
    "/accessibility",
  ];

  for (const path of paths) {
    const response = await page.goto(`${BASE_URL}${path}`);
    expect(response?.status()).toBeLessThan(400);
  }
});
