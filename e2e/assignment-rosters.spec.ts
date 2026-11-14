import { expect, test, type Page } from "@playwright/test";
const origin = new URL(process.env.E2E_BASE_URL ?? "http://127.0.0.1:3001").origin;
const cors = {
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
};
test.use({ serviceWorkers: "block" });
async function fixture(page: Page, role: "admin" | "instructor") {
  const writes: { path: string; body: Record<string, unknown> }[] = [];
  let active = false;
  await page.addInitScript(() => localStorage.setItem("cea:onboarding:tour:v1", "test"));
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (!["localhost", "127.0.0.1"].includes(url.hostname)) return route.abort();
    if (!url.pathname.startsWith("/v1/")) return route.continue();
    const method = route.request().method();
    if (method === "OPTIONS") return route.fulfill({ status: 204, headers: cors });
    const reply = (json: unknown) => route.fulfill({ json, headers: cors });
    if (url.pathname === "/v1/auth/session")
      return reply({
        user: {
          id: "fixture",
          name: "Test User",
          email: "test@example.test",
          roleKey: role,
          permissions: ["*"],
        },
        expiresAt: "2099-01-01T00:00:00Z",
      });
    if (url.pathname === "/v1/account")
      return reply({
        id: "fixture",
        name: "Test User",
        email: "test@example.test",
        roleKey: role,
        emailVerified: true,
      });
    if (url.pathname === "/v1/admin/accounts")
      return reply({
        items: [
          {
            id: "teacher",
            name: "Teacher Test",
            email: "teacher@example.test",
            roleKey: "instructor",
            status: "active",
          },
          {
            id: "learner",
            name: "Learner Test",
            email: "learner@example.test",
            roleKey: "student",
            status: "active",
          },
        ],
        total: 2,
        nextCursor: null,
      });
    if (url.pathname === "/v1/courses")
      return reply({
        items: [{ slug: "course-one", title: "Course One" }],
        total: 1,
        nextCursor: null,
      });
    if (url.pathname === "/v1/instructor/assignment-roster/courses")
      return reply({
        items: [{ slug: "course-one", title: "Course One", recipients: 1 }],
        truncated: false,
      });
    if (url.pathname === "/v1/instructor/assignment-roster") {
      if (method === "PUT") {
        const body = route.request().postDataJSON();
        writes.push({ path: url.pathname, body });
        active = body.active;
        return reply({ ok: true });
      }
      return reply({
        grant: active
          ? { active: true, expiresAt: "2099-01-01T00:00:00Z", changedAt: "2026-01-01T00:00:00Z" }
          : null,
      });
    }
    if (url.pathname === "/v1/instructor/assignments" && method === "POST") {
      writes.push({ path: url.pathname, body: route.request().postDataJSON() });
      return reply({
        groupId: "test-group",
        recipients: 1,
        due: "Test deadline",
        dueAt: "2099-01-01T00:00:00Z",
        course: "Course One",
      });
    }
    return reply({ items: [], total: 0, nextCursor: null });
  });
  return writes;
}
test("administrator can confirm and revoke a selected roster grant", async ({ page }) => {
  const writes = await fixture(page, "admin");
  await page.goto("/app/admin/users");
  await page.getByLabel("Roster instructor account").selectOption("teacher");
  await page.getByLabel("Roster learner account").selectOption("learner");
  await page.getByLabel("Course", { exact: true }).selectOption("course-one");
  await expect(page.getByText("No active grant for this selection.")).toBeVisible();
  await page.getByLabel("Grant expiry (your local time; within one year)").fill("2027-01-01T10:00");
  await page.getByRole("checkbox", { name: /independently confirmed/ }).check();
  await page.getByRole("button", { name: "Confirm grant" }).click();
  await expect(page.getByText("Roster change recorded.")).toBeVisible();
  expect(writes[0]?.body).toMatchObject({
    instructorId: "teacher",
    studentId: "learner",
    courseSlug: "course-one",
    active: true,
  });
  await page.getByRole("button", { name: "Revoke grant" }).click();
  await expect.poll(() => writes.length).toBe(2);
  expect(writes[1]?.body).toMatchObject({ active: false });
});
test("instructor publishes to the confirmed roster with a real deadline", async ({ page }) => {
  const writes = await fixture(page, "instructor");
  await page.goto("/app/instructor/assignments");
  await page.getByLabel("Course", { exact: true }).selectOption("course-one");
  await page.getByLabel("Title", { exact: true }).fill("A test assignment");
  await page.getByLabel("Instructions").fill("Explain your approach.");
  await page.getByLabel("Deadline (your local time)").fill("2099-01-01T10:00");
  await page.getByRole("button", { name: "Publish assignment" }).click();
  await expect(page.getByText("Published to 1 learner.", { exact: false })).toBeVisible();
  expect(writes[0]?.body).toMatchObject({
    courseSlug: "course-one",
    title: "A test assignment",
    description: "Explain your approach.",
  });
  expect(writes[0]?.body.dueAt).toContain("2099-01-01");
});

test("recovers an interrupted publication in the same tab without creating a second assignment", async ({
  page,
}) => {
  await fixture(page, "instructor");
  let sentKey = "";
  let count = 0;
  await page.route("**/v1/instructor/assignments", async (route) => {
    if (route.request().method() === "OPTIONS")
      return route.fulfill({ status: 204, headers: cors });
    if (route.request().method() !== "POST") return route.fallback();
    count++;
    sentKey = String(route.request().postDataJSON().idempotencyKey);
    return route.abort("connectionreset");
  });
  await page.route("**/v1/instructor/assignment-publications/*", async (route) => {
    if (route.request().method() === "OPTIONS")
      return route.fulfill({ status: 204, headers: cors });
    expect(new URL(route.request().url()).pathname.endsWith(sentKey)).toBe(true);
    return route.fulfill({
      headers: cors,
      json: {
        publication: {
          groupId: "recovered-group",
          recipients: 1,
          due: "deadline",
          dueAt: "2099-01-01T10:00:00.000Z",
          course: "Course One",
        },
      },
    });
  });
  await page.goto("/app/instructor/assignments");
  await page.getByLabel("Course", { exact: true }).selectOption("course-one");
  await page.getByLabel("Title", { exact: true }).fill("Recovery test");
  await page.getByLabel("Instructions").fill("Original instructions");
  await page.getByLabel("Deadline (your local time)").fill("2099-01-01T10:00");
  await page.getByRole("button", { name: "Publish assignment" }).click();
  await expect(page.getByText("A publication needs confirmation.", { exact: false })).toBeVisible();
  expect(sentKey).toMatch(/^[0-9a-f-]{36}$/);
  await page.getByLabel("Title", { exact: true }).fill("Different assignment");
  await page.getByRole("button", { name: "Publish assignment" }).click();
  await expect(
    page.getByText("The saved attempt used different details.", { exact: false }),
  ).toBeVisible();
  expect(count).toBe(1);
  await page.reload();
  await expect(page.getByText("A publication needs confirmation.", { exact: false })).toBeVisible();
  await page.getByRole("button", { name: "Check publication status" }).click();
  await expect(
    page.getByText("Publication confirmed for 1 learner.", { exact: false }),
  ).toBeVisible();
  await expect(page.getByText("recovered-group")).toBeVisible();
  expect(count).toBe(1);
  expect(
    await page.evaluate(() => sessionStorage.getItem("cea:assignment-publication:fixture")),
  ).toBeNull();
});

test("retries identical assignment details with the same reference", async ({ page }) => {
  await fixture(page, "instructor");
  const keys: string[] = [];
  await page.route("**/v1/instructor/assignments", async (route) => {
    if (route.request().method() === "OPTIONS")
      return route.fulfill({ status: 204, headers: cors });
    if (route.request().method() !== "POST") return route.fallback();
    keys.push(String(route.request().postDataJSON().idempotencyKey));
    if (keys.length === 1) return route.abort("connectionreset");
    return route.fulfill({
      headers: cors,
      json: {
        groupId: "same-group",
        recipients: 1,
        due: "deadline",
        dueAt: "2099-01-01T10:00:00.000Z",
        course: "Course One",
      },
    });
  });
  await page.goto("/app/instructor/assignments");
  await page.getByLabel("Course", { exact: true }).selectOption("course-one");
  await page.getByLabel("Title", { exact: true }).fill("Safe retry test");
  await page.getByLabel("Deadline (your local time)").fill("2099-01-01T10:00");
  await page.getByRole("button", { name: "Publish assignment" }).click();
  await expect(
    page.getByRole("alert").filter({ hasText: "Keep the saved reference" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Publish assignment" }).click();
  await expect(page.getByText("Published to 1 learner.", { exact: false })).toBeVisible();
  expect(keys).toHaveLength(2);
  expect(keys[1]).toBe(keys[0]);
  expect(
    await page.evaluate(() => sessionStorage.getItem("cea:assignment-publication:fixture")),
  ).toBeNull();
});
