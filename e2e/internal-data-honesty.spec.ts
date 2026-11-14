import { expect, test, type Page } from "@playwright/test";

const origin = new URL(process.env.E2E_BASE_URL ?? "http://127.0.0.1:3000").origin;
const cors = {
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};
test.use({ serviceWorkers: "block" });

async function signInFixture(page: Page, roleKey: "instructor" | "mentor" | "client" | "alumni") {
  const requests: string[] = [];
  const user = {
    id: "local-test-user",
    name: "Local tester",
    email: "local@example.test",
    roleKey,
    permissions: ["*"],
  };
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (!["localhost", "127.0.0.1"].includes(url.hostname)) return route.abort();
    if (!url.pathname.startsWith("/v1/")) return route.continue();
    requests.push(url.pathname);
    if (route.request().method() === "OPTIONS")
      return route.fulfill({ status: 204, headers: cors });
    const reply = (json: unknown) => route.fulfill({ json, headers: cors });
    if (url.pathname === "/v1/auth/session")
      return reply({ user, expiresAt: "2099-01-01T00:00:00.000Z" });
    if (url.pathname === "/v1/account")
      return reply({ ...user, emailVerified: true, hasPassword: true });
    return reply({ items: [], total: 0, count: 0 });
  });
  return requests;
}

test("instructor dashboard does not present sample schedules or grading as real", async ({
  page,
}) => {
  const requests = await signInFixture(page, "instructor");
  await page.goto("/app/instructor");
  await expect(page.getByRole("heading", { name: "Instructor dashboard" })).toBeVisible();
  await expect(page.getByText("Dashboard totals and sample", { exact: false })).toBeVisible();
  for (const example of ["Chiamaka Eze", "Cohort 15", "23 items awaiting grading", "Yaba campus"]) {
    await expect(page.getByText(example, { exact: false })).toHaveCount(0);
  }
  expect(requests.some((p) => p.startsWith("/v1/instructor-extras-dashboard/"))).toBe(false);
});

test("client project does not show unscoped example project records", async ({ page }) => {
  const requests = await signInFixture(page, "client");
  await page.goto("/app/client/projects/any-project");
  await expect(
    page.getByText("Project details are unavailable here", { exact: false }),
  ).toBeVisible();
  await expect(page.getByText("OrderPadi", { exact: false })).toHaveCount(0);
  await expect(page.getByText("385,000", { exact: false })).toHaveCount(0);
  expect(requests.some((p) => p.includes("client-dashboard/milestones"))).toBe(false);
});

test("client invoices cannot initiate a hard-coded payment", async ({ page }) => {
  const requests = await signInFixture(page, "client");
  await page.goto("/app/client/invoices");
  await expect(
    page.getByText("Online invoices and payment are unavailable", { exact: false }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Pay online" })).toHaveCount(0);
  await expect(page.getByText("OrderPadi", { exact: false })).toHaveCount(0);
  expect(
    requests.some(
      (p) => p.includes("client-dashboard/invoices") || p.includes("payments/checkout"),
    ),
  ).toBe(false);
});

test("mentor pages do not present fabricated personal awards, career counts or notes", async ({
  page,
}) => {
  await signInFixture(page, "mentor");
  await page.goto("/app/mentor");
  await expect(page.getByRole("heading", { name: "Mentor dashboard" })).toBeVisible();
  await expect(page.getByText("Mentor of the month", { exact: false })).toHaveCount(0);
  await expect(page.getByText("Applications reviewed", { exact: false })).toHaveCount(0);
  await page.goto("/app/mentor/sessions");
  await expect(page.getByRole("heading", { name: "Session hub" })).toBeVisible();
  await expect(page.getByText("Goal review + demo prep", { exact: false })).toHaveCount(0);
  await expect(page.getByText("visible only to you", { exact: false })).toHaveCount(0);
});

test("alumni cannot mistake seeded mentors for a verified bookable directory", async ({ page }) => {
  const requests = await signInFixture(page, "alumni");
  await page.goto("/app/alumni/find");
  await expect(page.getByText("No reviewed profiles match this search.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Request mentorship" })).toHaveCount(0);
  await expect(page.getByText("verified profiles", { exact: false })).toHaveCount(0);
  expect(requests.some((p) => p === "/v1/mentor/profiles")).toBe(true);
});

test("mentor request records are read-only and not presented as a live verified queue", async ({
  page,
}) => {
  await signInFixture(page, "mentor");
  await page.route("**/v1/mentor-dashboard/requests*", async (route) => {
    await route.fulfill({
      headers: cors,
      json: {
        items: [
          {
            id: "legacy-1",
            requesterName: "Example learner",
            track: "Example track",
            why: "Review a project",
            status: "pending",
          },
        ],
        total: 1,
        nextCursor: null,
      },
    });
  });
  await page.goto("/app/mentor/requests");
  await expect(page.getByText("Legacy dashboard records (read-only)")).toBeVisible();
  await expect(
    page.getByText("separate from the new request queue", { exact: false }),
  ).toBeVisible();
  await expect(page.getByText("Example learner")).toBeVisible();
  await expect(page.getByText("Recorded status: pending")).toBeVisible();
  await expect(page.getByRole("button", { name: /^(Accept|Decline)$/ })).toHaveCount(0);
  await expect(page.getByText("3 of 3 matches kept")).toHaveCount(0);
});
