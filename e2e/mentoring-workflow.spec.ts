import { expect, test, type Page } from "@playwright/test";
const origin = new URL(process.env.E2E_BASE_URL ?? "http://127.0.0.1:3001").origin;
const cors = {
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};
test.use({ serviceWorkers: "block" });
test("reviewed mentoring lifecycle uses opt-in, scoped requests and withdrawal", async ({
  browser,
}) => {
  const state: {
    profile: null | {
      id: string;
      displayName: string;
      focus: string;
      bio: string;
      visible: boolean;
      approved: boolean;
      revision: string;
    };
    eligibility: Record<string, boolean>;
    request: null | { id: string; goal: string; status: string; eligible: boolean };
    writes: { path: string; method: string; body: Record<string, unknown> }[];
  } = { profile: null, eligibility: {}, request: null, writes: [] };
  async function createPage(role: "admin" | "mentor" | "student") {
    const context = await browser.newContext({ serviceWorkers: "block" }),
      page = await context.newPage();
    await page.addInitScript(() => localStorage.setItem("cea:onboarding:tour:v1", "test"));
    await page.route("**/*", async (route) => {
      const url = new URL(route.request().url()),
        method = route.request().method();
      if (!["localhost", "127.0.0.1"].includes(url.hostname)) return route.abort();
      if (!url.pathname.startsWith("/v1/")) return route.continue();
      if (method === "OPTIONS") return route.fulfill({ status: 204, headers: cors });
      const reply = (json: unknown) => route.fulfill({ headers: cors, json });
      const body = method !== "GET" ? (route.request().postDataJSON() ?? {}) : {};
      if (method !== "GET") state.writes.push({ path: url.pathname, method, body });
      if (url.pathname === "/v1/auth/session")
        return reply({
          user: {
            id: role,
            name: `${role} Test`,
            email: `${role}@example.test`,
            roleKey: role,
            permissions: ["*"],
          },
          expiresAt: "2099-01-01T00:00:00Z",
        });
      if (url.pathname === "/v1/account")
        return reply({
          id: role,
          name: `${role} Test`,
          email: `${role}@example.test`,
          roleKey: role,
          emailVerified: true,
        });
      if (url.pathname === "/v1/admin/accounts")
        return reply({
          items: [
            {
              id: "mentor",
              name: "Mentor Test",
              email: "mentor@example.test",
              roleKey: "mentor",
              status: "active",
            },
            {
              id: "student",
              name: "Student Test",
              email: "student@example.test",
              roleKey: "student",
              status: "active",
            },
          ],
          total: 2,
          nextCursor: null,
        });
      if (url.pathname === "/v1/mentor/admin/eligibility") {
        if (method === "PUT") {
          state.eligibility[String(body.userId)] = Boolean(body.active);
          return reply({ ok: true });
        }
        const active = state.eligibility[url.searchParams.get("userId") ?? ""] ?? false;
        return reply({
          eligibility: active
            ? {
                active: true,
                expiresAt: "2099-01-01T00:00:00Z",
                reviewRef: "review",
                changedAt: "2026-01-01T00:00:00Z",
                changedBy: "admin",
              }
            : null,
        });
      }
      if (url.pathname === "/v1/mentor/admin/profile")
        return reply({
          profile:
            state.profile && url.searchParams.get("userId") === "mentor"
              ? {
                  ...state.profile,
                  approvedAt: state.profile.approved ? "2026-01-01T00:00:00Z" : null,
                  approvedBy: state.profile.approved ? "admin" : null,
                  reviewRef: null,
                  consentVersion: "mentoring-directory-v1",
                  consentAt: "2026-01-01T00:00:00Z",
                }
              : null,
        });
      if (url.pathname === "/v1/mentor/admin/profile/approve") {
        if (state.profile) state.profile.approved = true;
        return reply({ ok: true });
      }
      if (url.pathname === "/v1/mentor/profile") {
        if (method === "PUT") {
          state.profile = {
            id: "profile-1",
            displayName: String(body.displayName),
            focus: String(body.focus),
            bio: String(body.bio),
            visible: true,
            approved: false,
            revision: "rev-1",
          };
          return reply({ ok: true, requiresReview: true });
        }
        if (method === "DELETE") {
          if (state.profile) {
            state.profile.visible = false;
            state.profile.approved = false;
          }
          return reply({ ok: true });
        }
        return reply({
          profile: state.profile ? { ...state.profile, updatedAt: "2026-01-01T00:00:00Z" } : null,
        });
      }
      if (url.pathname === "/v1/mentor/profiles")
        return reply({
          items:
            state.profile?.visible && state.profile.approved && state.eligibility.mentor
              ? [
                  {
                    id: state.profile.id,
                    name: state.profile.displayName,
                    focus: state.profile.focus,
                    bio: state.profile.bio,
                  },
                ]
              : [],
          truncated: false,
        });
      if (url.pathname === "/v1/mentor/requests") {
        if (method === "POST") {
          state.request = {
            id: "request-1",
            goal: String(body.goal),
            status: "pending",
            eligible: true,
          };
          return reply({ ok: true, id: "request-1" });
        }
        return reply({
          items: state.request
            ? [
                {
                  ...state.request,
                  mentorName: "Mentor Test",
                  learnerName: "Student Test",
                  createdAt: "2026-01-01T00:00:00Z",
                  updatedAt: "2026-01-01T00:00:00Z",
                },
              ]
            : [],
          truncated: false,
        });
      }
      if (url.pathname === "/v1/mentor/requests/request-1/respond") {
        if (state.request)
          state.request.status = body.decision === "accept" ? "accepted" : "declined";
        return reply({ ok: true });
      }
      if (url.pathname === "/v1/mentor/requests/request-1/cancel") {
        if (state.request) state.request.status = "cancelled";
        return reply({ ok: true });
      }
      return reply({ items: [], total: 0, nextCursor: null });
    });
    return { page, close: () => context.close() };
  }
  const mentor = await createPage("mentor");
  await mentor.page.goto("/app/mentor/requests");
  await mentor.page.getByLabel("Display name").fill("Mentor Test");
  await mentor.page.getByLabel("Mentoring focus").fill("Web projects");
  await mentor.page.getByLabel("Short bio").fill("Helping people learn by building projects.");
  await mentor.page.getByRole("checkbox", { name: /agree to share these profile details/ }).check();
  await mentor.page.getByRole("button", { name: "Submit for review" }).click();
  await expect(mentor.page.getByText("Profile submitted for review.")).toBeVisible();
  expect(state.writes.find((w) => w.path === "/v1/mentor/profile")?.body).toMatchObject({
    consent: true,
  });
  await mentor.close();

  const admin = await createPage("admin");
  await admin.page.goto("/app/admin/users");
  const expiration = new Date(Date.now() + 90 * 86400000).toISOString().slice(0, 16);
  for (const person of ["student", "mentor"]) {
    await admin.page.getByLabel("Mentoring participant account").selectOption(person);
    await expect(admin.page.getByText("No current adult eligibility.")).toBeVisible();
    await admin.page.getByLabel("Adult verification reference").fill(`adult-${person}`);
    await admin.page
      .getByLabel("Eligibility expiry (your local time; within one year)")
      .fill(expiration);
    await admin.page
      .getByRole("checkbox", {
        name: /independently verified that this account holder is an adult/,
      })
      .check();
    await admin.page.getByRole("button", { name: "Grant adult eligibility" }).click();
    await expect(admin.page.getByText("Review change recorded.")).toBeVisible();
  }
  await admin.page.getByLabel("Mentor screening reference").fill("mentor-screening-1");
  await admin.page.getByRole("checkbox", { name: /reviewed this mentor’s identity/ }).check();
  await admin.page.getByRole("button", { name: "Approve mentor profile" }).click();
  await expect(admin.page.getByText("Mentor profile: approved")).toBeVisible();
  expect(
    state.writes.find((w) => w.path === "/v1/mentor/admin/profile/approve")?.body,
  ).toMatchObject({ userId: "mentor", revision: "rev-1", confirmed: true });
  await admin.close();

  const student = await createPage("student");
  await student.page.goto("/app/mentorship");
  await expect(student.page.getByText("Mentor Test", { exact: true })).toBeVisible();
  await student.page.getByRole("button", { name: "Request mentorship" }).click();
  await student.page.getByLabel("What would you like help with?").fill("Help with a web project");
  await student.page.getByRole("button", { name: "Send request" }).click();
  await expect(student.page.getByText("Request sent for the mentor to review.")).toBeVisible();
  expect(
    state.writes.find((w) => w.path === "/v1/mentor/requests" && w.method === "POST")?.body,
  ).toEqual({ mentorId: "profile-1", goal: "Help with a web project" });
  await student.close();

  const mentorAgain = await createPage("mentor");
  await mentorAgain.page.goto("/app/mentor/requests");
  await expect(mentorAgain.page.getByText("Student Test · pending")).toBeVisible();
  await mentorAgain.page.getByRole("button", { name: "Accept", exact: true }).click();
  await expect(mentorAgain.page.getByText("Student Test · accepted")).toBeVisible();
  await mentorAgain.page.getByRole("button", { name: "Withdraw listing" }).click();
  await expect(mentorAgain.page.getByText("Profile withdrawn from the directory.")).toBeVisible();
  await mentorAgain.close();
  const studentAgain = await createPage("student");
  await studentAgain.page.goto("/app/mentorship");
  await expect(
    studentAgain.page.getByText("No reviewed profiles match this search."),
  ).toBeVisible();
  await studentAgain.page.getByRole("button", { name: "Cancel request" }).click();
  await expect(studentAgain.page.getByText("Mentor Test · cancelled")).toBeVisible();
  await studentAgain.close();
});

test("directory and request errors are visible without reporting a successful request", async ({
  page,
}) => {
  let directoryFails = true;
  await page.addInitScript(() => localStorage.setItem("cea:onboarding:tour:v1", "test"));
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (!["localhost", "127.0.0.1"].includes(url.hostname)) return route.abort();
    if (!url.pathname.startsWith("/v1/")) return route.continue();
    if (route.request().method() === "OPTIONS")
      return route.fulfill({ status: 204, headers: cors });
    const reply = (json: unknown, status = 200) => route.fulfill({ status, headers: cors, json });
    if (url.pathname === "/v1/auth/session")
      return reply({
        user: {
          id: "student",
          name: "Student Test",
          email: "student@example.test",
          roleKey: "student",
          permissions: ["*"],
        },
        expiresAt: "2099-01-01T00:00:00Z",
      });
    if (url.pathname === "/v1/account")
      return reply({
        id: "student",
        name: "Student Test",
        email: "student@example.test",
        roleKey: "student",
        emailVerified: true,
      });
    if (url.pathname === "/v1/mentor/profiles")
      return directoryFails
        ? reply({ error: { code: "UNAVAILABLE", message: "Temporarily unavailable" } }, 503)
        : reply({
            items: [
              {
                id: "p1",
                name: "Reviewed mentor",
                focus: "Web projects",
                bio: "Building projects together.",
              },
            ],
            truncated: false,
          });
    if (url.pathname === "/v1/mentor/requests" && route.request().method() === "POST")
      return reply({ error: { code: "CONFLICT", message: "Eligibility unavailable" } }, 409);
    return reply({ items: [], total: 0, nextCursor: null });
  });
  await page.goto("/app/mentorship");
  await expect(page.getByText("Could not load the directory.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Request mentorship" })).toHaveCount(0);
  directoryFails = false;
  await page.reload();
  await page.getByRole("button", { name: "Request mentorship" }).click();
  await page.getByLabel("What would you like help with?").fill("Planning a web project");
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(
    page.getByRole("alert").filter({ hasText: "confirm your eligibility" }),
  ).toBeVisible();
  await expect(page.getByText("Request sent for the mentor to review.")).toHaveCount(0);
});
