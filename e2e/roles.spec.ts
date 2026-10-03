import { expect } from "@playwright/test";
import { test, signInViaUi, DEMO_USERS, DEMO_PASSWORD } from "./helpers";

test.describe("Workspace navigation", () => {
  test("opens the signed-in role's home instead of the student dashboard", async ({
    page,
    signIn,
  }) => {
    await signIn("instructor");
    await page.goto("/app");
    await expect(page).toHaveURL(/\/app\/instructor/);
    await expect(page).toHaveTitle(/Instructor Dashboard/);
  });

  test("search offers current-workspace tools and opens the selected page", async ({
    page,
    signIn,
  }) => {
    await signIn("instructor");
    await page.goto("/app/instructor");
    await page.keyboard.press("Control+k");

    const palette = page.getByRole("dialog", { name: /search your workspace/i });
    await expect(palette).toBeVisible();
    await expect(palette.getByText("Course Builder")).toBeVisible();
    await expect(palette.getByText("Student dashboard")).toHaveCount(0);
    await palette
      .getByRole("combobox", { name: "Search pages and actions" })
      .fill("Course Builder");
    await palette.getByRole("option", { name: /Course Builder/ }).click();
    await expect(page).toHaveURL(/\/app\/instructor\/courses/);
  });

  test("mobile workspace navigation is modal and closes after a destination is chosen", async ({
    page,
    signIn,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await signIn("student");
    await page.goto("/app");
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await expect(page.getByRole("dialog", { name: /student navigation/i })).toBeVisible();
    await page.getByRole("link", { name: "Learning Hub" }).click();
    await expect(page).toHaveURL(/\/app\/learn/);
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });
});

test.describe("Student journey", () => {
  test("signs in through the real form and lands on the dashboard", async ({ page }) => {
    await signInViaUi(page, DEMO_USERS.student, DEMO_PASSWORD);
    await page.waitForURL("**/app**");
    await expect(page.getByText(/dashboard/i).first()).toBeVisible({ timeout: 20_000 });
  });

  test("walks the core learning journey end-to-end", async ({ page, signIn }) => {
    await signIn("student");

    await page.goto("/app/learn");
    await expect(page).toHaveTitle(/Learning Hub/);

    await page.goto("/app/assignments");
    await expect(page).toHaveTitle(/Assignments/);

    await page.goto("/app/grades");
    await expect(page).toHaveTitle(/Gradebook/);

    await page.goto("/app/calendar");
    await expect(page).toHaveTitle(/Calendar/);

    await page.goto("/app/finance");
    await expect(page).toHaveTitle(/Finance/);

    await page.goto("/app/attendance");
    await expect(page).toHaveTitle(/Attendance/);
  });

  test("student financial + career surfaces load", async ({ page, signIn }) => {
    await signIn("student");

    await page.goto("/app/portfolio");
    await expect(page).toHaveTitle(/Portfolio/);

    await page.goto("/app/certificates");
    await expect(page).toHaveTitle(/Certificates/);

    await page.goto("/app/library");
    await expect(page).toHaveTitle(/Library/);
  });
});

test.describe("Instructor journey", () => {
  test("instructor reaches dashboard and teaching tools", async ({ page, signIn }) => {
    await signIn("instructor");

    await page.goto("/app/instructor");
    await expect(page).toHaveTitle(/Instructor Dashboard/);

    await page.goto("/app/instructor/courses");
    await expect(page).toHaveTitle(/Course Builder/);

    await page.goto("/app/instructor/classes");
    await expect(page).toHaveTitle(/Class Schedule/);

    await page.goto("/app/instructor/grading-queue");
    await expect(page).toHaveTitle(/Grading Queue/);

    await page.goto("/app/grades");
    await expect(page).toHaveTitle(/Gradebook/);
  });
});

test.describe("Parent journey", () => {
  test("parent lands in the parent workspace and sees child overview + finance + attendance", async ({
    page,
    signIn,
  }) => {
    await signIn("parent");

    await page.goto("/app");
    await expect(page).toHaveURL(/\/app\/parent/);
    await expect(page.getByText(/workspace is restricted/i)).toHaveCount(0);

    await page.goto("/app/parent");
    await expect(page).toHaveTitle(/Parent Dashboard/);

    await page.goto("/app/parent/students/00000000-0000-4000-8000-000000000001");
    await expect(page).toHaveTitle(/Student Overview/);

    await page.goto("/app/parent/students/00000000-0000-4000-8000-000000000001/finance");
    await expect(page).toHaveTitle(/Finance/);

    await page.goto("/app/parent/students/00000000-0000-4000-8000-000000000001/attendance");
    await expect(page).toHaveTitle(/Attendance/);
  });
});
