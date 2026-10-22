import { test, expect, type Page } from "@playwright/test";

const cors = {
  "Access-Control-Allow-Origin": new URL(process.env.E2E_BASE_URL ?? "http://127.0.0.1:3000")
    .origin,
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};
test.use({ serviceWorkers: "block" });

async function fixture(
  page: Page,
  input: { status?: string; type?: string; body?: string; reject?: boolean } = {},
) {
  let completed = false;
  let writes = 0;
  const user = {
    id: "00000000-0000-4000-8000-000000000001",
    name: "Local learner",
    email: "local@example.test",
    roleKey: "student",
    permissions: ["lms:read"],
  };
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (!["localhost", "127.0.0.1"].includes(url.hostname)) return route.abort();
    if (!url.pathname.startsWith("/v1/")) return route.continue();
    if (route.request().method() === "OPTIONS")
      return route.fulfill({ status: 204, headers: cors });
    const reply = (json: unknown, status = 200) => route.fulfill({ status, headers: cors, json });
    if (url.pathname === "/v1/auth/session")
      return reply({ user, expiresAt: "2099-01-01T00:00:00.000Z" });
    if (url.pathname === "/v1/account")
      return reply({ ...user, emailVerified: true, hasPassword: true });
    if (url.pathname === "/v1/courses/course")
      return reply({
        slug: "course",
        title: "Enrolled reading course",
        subtitle: "",
        cohort: "",
        instructor: "Instructor",
        pct: completed ? 100 : 0,
        tone: "",
        modules: [
          {
            id: "module",
            title: "Module one",
            lessons: [
              {
                id: "lesson",
                title: "Published lesson",
                type: input.type ?? "article",
                duration: "5m",
                status: completed ? "done" : (input.status ?? "preview"),
                body: input.body ?? "Actual instructor-supplied lesson text.",
              },
            ],
          },
        ],
      });
    if (url.pathname === "/v1/courses/course/lessons/lesson/complete") {
      expect(route.request().method()).toBe("POST");
      writes++;
      if (input.reject)
        return reply(
          { error: { code: "FORBIDDEN", message: "You are not enrolled in this course." } },
          403,
        );
      completed = true;
      return reply({
        ok: true,
        pct: 100,
        doneLessons: 1,
        totalLessons: 1,
        lessonsThisWeek: 1,
        streakDays: 1,
      });
    }
    return reply({ items: [], total: 0, count: 0 });
  });
  await page.goto("/app/learn/course/lessons/lesson");
  await expect(page.getByTestId("lesson-content")).toBeVisible();
  return () => writes;
}

test("published text and confirmed completion replace fake lesson controls", async ({ page }) => {
  const writes = await fixture(page);
  await expect(page.getByText("Actual instructor-supplied lesson text.")).toBeVisible();
  await expect(page.getByText("Your last attempt:")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Download", exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "Mark lesson complete", exact: true }).click();
  expect(writes()).toBe(0);
  await page.getByRole("button", { name: "Confirm completion", exact: true }).click();
  await expect(page.getByTestId("lesson-content").getByRole("status")).toHaveText(
    "Completion recorded by the Academy.",
  );
  expect(writes()).toBe(1);
  await expect(page.getByRole("button", { name: "Mark lesson complete", exact: true })).toHaveCount(
    0,
  );
});

test("server-denied completion never displays success", async ({ page }) => {
  const writes = await fixture(page, { reject: true });
  await page.getByRole("button", { name: "Mark lesson complete", exact: true }).click();
  await page.getByRole("button", { name: "Confirm completion", exact: true }).click();
  await expect(page.getByTestId("lesson-content").getByRole("alert")).toContainText(
    "You are not enrolled",
  );
  await expect(page.getByText("Completion recorded by the Academy.")).toHaveCount(0);
  expect(writes()).toBe(1);
});

test("locked content stays hidden even if supplied in a response", async ({ page }) => {
  const writes = await fixture(page, { status: "locked", body: "Private text must not render" });
  await expect(page.getByText("Private text must not render")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Mark lesson complete", exact: true })).toHaveCount(
    0,
  );
  expect(writes()).toBe(0);
});

test("video metadata does not pretend to be a player or assessment", async ({ page }) => {
  await fixture(page, { type: "video", body: "" });
  await expect(page.getByText(/No lesson text has been published/)).toBeVisible();
  await expect(page.getByRole("button", { name: "Play lesson video" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Mark lesson complete", exact: true })).toHaveCount(
    0,
  );
});
