import { expect } from "@playwright/test";
import { test } from "./helpers";

test.describe("Admin journey", () => {
  test("admin reaches hub, monitoring, users, security and config", async ({ page, signIn }) => {
    await signIn("admin");

    await page.goto("/app/admin");
    await expect(page).toHaveTitle(/Admin Hub/);

    await page.goto("/app/admin/monitoring");
    await expect(page).toHaveTitle(/System Monitoring/);

    await page.goto("/app/admin/users");
    await expect(page).toHaveTitle(/User Management/);

    await page.goto("/app/admin/security");
    await expect(page).toHaveTitle(/Security Dashboard/);

    await page.goto("/app/admin/config");
    await expect(page).toHaveTitle(/System Configuration/);
  });
});

test.describe("Mentor journey", () => {
  test("mentor reaches dashboard, mentee session tools and resources", async ({ page, signIn }) => {
    await signIn("mentor");

    await page.goto("/app/mentor");
    await expect(page).toHaveTitle(/Mentor Dashboard/);

    await page.goto("/app/mentor/requests");
    await expect(page).toHaveTitle(/Mentorship Requests/);

    await page.goto("/app/mentor/resources");
    await expect(page).toHaveTitle(/Resources Library/);
  });
});

test.describe("HR journey", () => {
  test("HR reaches hub, employees, recruitment and leave", async ({ page, signIn }) => {
    await signIn("hr");

    await page.goto("/app/hr");
    await expect(page).toHaveTitle(/HR Hub/);

    await page.goto("/app/hr/employees");
    await expect(page).toHaveTitle(/Employees/);

    await page.goto("/app/hr/recruitment");
    await expect(page).toHaveTitle(/Recruitment/);

    await page.goto("/app/hr/leave");
    await expect(page).toHaveTitle(/Leave/);
  });
});

test.describe("Finance journey", () => {
  test("finance reaches hub, invoicing, payments and reports", async ({ page, signIn }) => {
    await signIn("finance");

    await page.goto("/app/accountant");
    await expect(page).toHaveTitle(/Finance Hub/);

    await page.goto("/app/accountant/invoicing");
    await expect(page).toHaveTitle(/Invoicing/);

    await page.goto("/app/accountant/payments");
    await expect(page).toHaveTitle(/Payments/);

    await page.goto("/app/accountant/reports");
    await expect(page).toHaveTitle(/Reports/);
  });
});
