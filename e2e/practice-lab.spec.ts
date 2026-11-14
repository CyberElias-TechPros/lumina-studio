import { expect } from "@playwright/test";
import { test } from "./helpers";

test("computer lab supports practice, feedback, reset and private local state", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/practice/computer-basics");
  await expect(page.getByRole("heading", { name: "Computer Basics Lab", level: 1 })).toBeVisible();
  const progress = page.getByRole("progressbar", { name: "Activities practised" });
  await expect(progress).toHaveAttribute("aria-valuenow", "0");
  await page.getByRole("button", { name: /click or tap here/i }).focus();
  await page.keyboard.press("Enter");
  await expect(progress).toHaveAttribute("aria-valuenow", "1");
  await page.getByLabel("Your practice sentence").fill("I can practice");
  await page.getByRole("button", { name: "Check my sentence" }).click();
  await expect(page.getByText(/not quite the same yet/i)).toBeVisible();
  await expect(progress).toHaveAttribute("aria-valuenow", "1");
  await page.getByLabel("Your practice sentence").fill("I can practise.");
  await page.getByRole("button", { name: "Check my sentence" }).click();
  await expect(progress).toHaveAttribute("aria-valuenow", "2");
  await page.getByLabel("Practice file name").fill("My practice");
  await page.getByLabel("Choose a practice folder").selectOption("Documents");
  await page.getByRole("button", { name: "Practise saving" }).click();
  await expect(page.getByText(/No real file was saved/)).toBeVisible();
  await expect(progress).toHaveAttribute("aria-valuenow", "3");
  await expect(page.getByText(/you've tried all three activities/i)).toBeVisible();
  await page.getByLabel("Practice file name").fill("Another practice");
  await expect(progress).toHaveAttribute("aria-valuenow", "2");
  await page.getByRole("button", { name: "Clear and start again" }).click();
  await expect(progress).toHaveAttribute("aria-valuenow", "0");
  await expect(page.getByLabel("Practice file name")).toHaveValue("");
  await page.getByLabel("Your practice sentence").fill("I can practise.");
  await page.reload();
  await expect(page.getByLabel("Your practice sentence")).toHaveValue("");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    ),
  ).toBe(true);
});

for (const slug of [
  "sitting-down-at-a-computer",
  "files-and-folders",
  "your-hands-on-the-keyboard",
  "the-internet-without-getting-lost",
  "your-first-email",
]) {
  test(`beginner lesson ${slug} has a retryable practice check`, async ({ page }) => {
    await page.goto(`/blog/${slug}`);
    const check = page.getByRole("region", { name: "A small practice check" });
    await expect(check).toBeVisible();
    await expect(check.getByRole("button", { name: "Check my answer" })).toBeDisabled();
    await check.getByText("I'm not sure yet", { exact: true }).click();
    await check.getByRole("button", { name: "Check my answer" }).click();
    await expect(check.getByText(/let's look at it together/i)).toBeVisible();
    await check.getByRole("radio").first().check();
    await check.getByRole("button", { name: "Check my answer" }).click();
    await expect(check.getByText("That's a useful choice.")).toBeVisible();
    await expect(check.getByRole("link", { name: /computer basics lab/i })).toHaveAttribute(
      "href",
      "/practice/computer-basics",
    );
    await expect(page.locator("[data-ad-slot]")).toHaveCount(0);
  });
}

test("lab is discoverable from home and Notes and provides a no-JS reading alternative", async ({
  page,
  browser,
  baseURL,
}) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Try the Computer Basics Lab" })).toHaveAttribute(
    "href",
    "/practice/computer-basics",
  );
  await page.goto("/blog");
  await expect(page.getByRole("link", { name: "Try the Computer Basics Lab" })).toHaveAttribute(
    "href",
    "/practice/computer-basics",
  );
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  try {
    const noJS = await context.newPage();
    await noJS.goto("/practice/computer-basics");
    await expect(noJS.getByText(/activities need JavaScript/i)).toBeVisible();
    await expect(noJS.getByRole("link", { name: "read the free lessons" })).toHaveAttribute(
      "href",
      "/blog",
    );
    await expect(
      noJS.getByRole("link", { name: /sitting down at a computer for the first time/i }),
    ).toBeVisible();
  } finally {
    await context.close();
  }
});
