import { test, expect } from "./helpers";

const key = "cea-learning-trail-v1";
const lesson = "/blog/sitting-down-at-a-computer";

test("saving a lesson is optional, survives navigation and can be cleared", async ({
  page,
  context,
}) => {
  await page.goto(lesson);
  await expect(page.getByRole("heading", { name: "A small practice check" })).toBeVisible();
  expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBeNull();
  await page.getByRole("button", { name: "Bookmark lesson" }).click();
  await page.getByRole("button", { name: "Mark lesson complete" }).click();
  const stored = await page.evaluate((k) => JSON.parse(localStorage.getItem(k)!), key);
  expect(stored.lessons["sitting-down-at-a-computer"]).toEqual({
    completed: true,
    bookmarked: true,
  });
  expect(JSON.stringify(stored)).not.toContain("answer");
  const second = await context.newPage();
  await second.goto("/learning-trail");
  await expect(
    second.getByRole("progressbar", { name: "Lessons marked complete" }),
  ).toHaveAttribute("aria-valuenow", "1");
  await expect(
    second.getByText(/your first lesson not yet marked complete: Where your work lives/i),
  ).toBeVisible();
  await expect(
    second
      .getByRole("heading", { name: "Your bookmarks" })
      .locator(".. ")
      .getByRole("link", { name: /sitting down at a computer/i }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Undo lesson completion" }).click();
  await expect(
    second.getByRole("progressbar", { name: "Lessons marked complete" }),
  ).toHaveAttribute("aria-valuenow", "0");
  await second.getByRole("button", { name: "Clear saved learning progress" }).click();
  await expect(
    second.getByText(/saved bookmarks and completion marks were cleared/i),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Bookmark lesson" })).toBeVisible();
  expect(await second.evaluate((k) => localStorage.getItem(k), key)).toBeNull();
});

test("lab progress is saved only by choice and not the practice inputs", async ({ page }) => {
  await page.goto("/practice/computer-basics");
  const mark = page.getByRole("button", { name: "Mark lab complete" });
  await expect(mark).toBeDisabled();
  await page.getByRole("button", { name: /click or tap here/i }).click();
  await page.getByLabel("Your practice sentence").fill("I can practise.");
  await page.getByRole("button", { name: "Check my sentence" }).click();
  await page.getByLabel("Practice file name").fill("Example note");
  await page.getByLabel("Choose a practice folder").selectOption("Documents");
  await page.getByRole("button", { name: "Practise saving" }).click();
  expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBeNull();
  await mark.click();
  const saved = await page.evaluate((k) => localStorage.getItem(k)!, key);
  expect(saved).not.toContain("Example note");
  expect(saved).not.toContain("I can practise");
  expect(JSON.parse(saved).labCompleted).toBe(true);
  await page.reload();
  await expect(page.getByLabel("Practice file name")).toHaveValue("");
  await expect(page.getByRole("button", { name: "Undo lab completion" })).toBeVisible();
  await page.getByRole("button", { name: "Undo lab completion" }).click();
  expect(JSON.parse(await page.evaluate((k) => localStorage.getItem(k)!, key)).labCompleted).toBe(
    false,
  );
});

test("corrupt and blocked storage are explained without breaking lessons", async ({
  page,
  context,
}) => {
  await page.goto("/learning-trail");
  await page.evaluate((k) => localStorage.setItem(k, "not valid JSON"), key);
  await page.reload();
  await expect(page.getByText(/saved progress could not be read/i)).toBeVisible();
  await page.getByRole("button", { name: "Clear saved learning progress" }).click();
  expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBeNull();
  const blocked = await context.newPage();
  await blocked.addInitScript(() => {
    const original = Storage.prototype.getItem;
    Storage.prototype.getItem = function (key) {
      if (key === "cea-learning-trail-v1") throw new Error("blocked");
      return original.call(this, key);
    };
    const setOriginal = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (key === "cea-learning-trail-v1") throw new Error("blocked");
      return setOriginal.call(this, key, value);
    };
  });
  await blocked.goto(lesson);
  await expect(blocked.getByText(/this browser is blocking storage/i)).toBeVisible();
  await blocked.getByRole("button", { name: "Bookmark lesson" }).click();
  await expect(blocked.getByText(/could not save/i)).toBeVisible();
  await blocked.getByText("I'm not sure yet", { exact: true }).click();
  await blocked.getByRole("button", { name: "Check my answer" }).click();
  await expect(blocked.getByText(/let's look at it together/i)).toBeVisible();
});
