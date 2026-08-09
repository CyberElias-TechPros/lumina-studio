import { expect } from "@playwright/test";
import { test, signInViaUi, DEMO_USERS, DEMO_PASSWORD } from "./helpers";

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
  test("parent sees child overview + finance + attendance", async ({ page, signIn }) => {
    await signIn("parent");

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
