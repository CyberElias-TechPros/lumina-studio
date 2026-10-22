import { test, expect, type Page } from "@playwright/test";
const cors = {
  "Access-Control-Allow-Origin": new URL(process.env.E2E_BASE_URL ?? "http://127.0.0.1:3000")
    .origin,
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
};
test.use({ serviceWorkers: "block" });
async function fixture(page: Page, role: "student" | "instructor", latest = true) {
  let answer = "The student's actual written answer.";
  let submitted = false;
  let graded = false;
  let feedback = "";
  let score: number | undefined;
  let writes = 0;
  const user = {
    id: "00000000-0000-4000-8000-000000000001",
    name: "Local user",
    email: "local@example.test",
    roleKey: role,
    permissions: [],
  };
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (!["localhost", "127.0.0.1"].includes(url.hostname)) return route.abort();
    if (!url.pathname.startsWith("/v1/")) return route.continue();
    if (route.request().method() === "OPTIONS")
      return route.fulfill({ status: 204, headers: cors });
    const reply = (json: unknown, status = 200) => route.fulfill({ json, status, headers: cors });
    if (url.pathname === "/v1/auth/session")
      return reply({ user, expiresAt: "2099-01-01T00:00:00.000Z" });
    if (url.pathname === "/v1/account")
      return reply({ ...user, emailVerified: true, hasPassword: true });
    if (url.pathname === "/v1/assignments")
      return reply({
        items: [
          {
            id: url.searchParams.has("cursor") ? "next" : "task",
            title: url.searchParams.has("cursor")
              ? "Another writing task"
              : "Explain your approach",
            course: "Course",
            description: "Write your own reasoning.",
            due: "2026-11-01",
            max: 20,
            weight: 10,
            status: "pending",
            rubric: [],
          },
        ],
        nextCursor: url.searchParams.has("cursor") ? null : "next",
        total: 2,
      });
    if (url.pathname === "/v1/assignments/task")
      return reply({
        id: "task",
        title: "Explain your approach",
        course: "Course",
        description: "Write your own reasoning.",
        due: "2026-11-01",
        max: 20,
        status: submitted ? "submitted" : "pending",
        rubric: [],
      });
    if (url.pathname === "/v1/assignments/task/submit") {
      writes++;
      answer = route.request().postDataJSON().body;
      submitted = true;
      return reply(
        {
          id: "attempt",
          assignmentId: "task",
          status: "submitted",
          submittedAt: "2026-10-22T12:00:00.000Z",
          late: false,
          file: "",
          size: "",
        },
        201,
      );
    }
    if (url.pathname === "/v1/assignments/task/submission")
      return submitted
        ? reply({
            id: "attempt",
            status: "submitted",
            submittedAt: "2026-10-22T12:00:00.000Z",
            body: answer,
            late: false,
            file: "",
            size: "",
          })
        : reply({ error: { code: "NOT_FOUND", message: "No submission yet" } }, 404);
    if (url.pathname === "/v1/instructor/assignments/attempt")
      return reply({
        id: "attempt",
        student: "Learner",
        title: "Explain your approach",
        submitted: "2026-10-22",
        status: graded ? "graded" : "submitted",
        body: answer,
        feedback,
        score,
        max: 20,
        isLatest: latest,
        file: "",
        size: "",
        late: false,
      });
    if (url.pathname === "/v1/instructor/submissions/attempt") {
      writes++;
      ({ score, feedback } = route.request().postDataJSON());
      graded = true;
      return reply({
        id: "attempt",
        status: "graded",
        score,
        feedback,
        gradedAt: "2026-10-22T13:00:00.000Z",
        gradedBy: user.id,
      });
    }
    return reply({ items: [], total: 0, count: 0 });
  });
  await page.goto(
    role === "student" ? "/app/assignments/task" : "/app/instructor/assignments/attempt/grade",
  );
  await page.getByRole("button", { name: "Skip tour", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Welcome to CEA" })).toHaveCount(0);
  return { writes: () => writes, answer: () => answer };
}
test("student submits a written answer as text and sees the recorded attempt", async ({ page }) => {
  const result = await fixture(page, "student");
  await expect(page.getByRole("button", { name: "Submit written answer" })).toBeDisabled();
  await page.getByLabel("Written answer or repository link").fill("My original reasoning.");
  await page.getByRole("button", { name: "Submit written answer" }).click();
  await expect(page.getByText("Your answer was recorded by the server.")).toBeVisible();
  await page.getByText("Your submitted answer", { exact: true }).click();
  await expect(page.getByText("My original reasoning.", { exact: true })).toBeVisible();
  expect(result.answer()).toBe("My original reasoning.");
  expect(result.writes()).toBe(1);
  await expect(page.getByText(/Dispute window|A- · rubric/)).toHaveCount(0);
});
test("instructor reviews actual text and explicitly publishes a bounded score and feedback", async ({
  page,
}) => {
  const result = await fixture(page, "instructor");
  await expect(page.getByText("The student's actual written answer.")).toBeVisible();
  await expect(page.getByLabel("Score", { exact: true })).toHaveValue("");
  await expect(page.getByLabel("Feedback", { exact: true })).toHaveValue("");
  await expect(page.getByText(/3% similarity|Auto-checks passed|Autosaved draft/)).toHaveCount(0);
  await page.getByLabel("Score", { exact: true }).fill("21");
  await expect(page.getByRole("button", { name: "Return grade to student" })).toBeDisabled();
  await page.getByLabel("Score", { exact: true }).fill("17");
  await page.getByLabel("Feedback", { exact: true }).fill("Good explanation. Add an example.");
  await page.getByRole("button", { name: "Return grade to student" }).click();
  await expect(page.getByText("Grade and feedback saved by the server.")).toBeVisible();
  expect(result.writes()).toBe(1);
});
test("a superseded attempt cannot be graded from the UI", async ({ page }) => {
  const result = await fixture(page, "instructor", false);
  await page.getByLabel("Score", { exact: true }).fill("20");
  await expect(page.getByRole("button", { name: "Return grade to student" })).toBeDisabled();
  await expect(page.getByTestId("grading-content").getByRole("alert")).toContainText(
    "newer attempt",
  );
  expect(result.writes()).toBe(0);
});

test("students can reach assignments beyond the first page", async ({ page }) => {
  await fixture(page, "student");
  await page.goto("/app/assignments");
  await expect(page.getByText(/avg 90\.5%|REST API · tonight/)).toHaveCount(0);
  await expect(page.getByText("Another writing task", { exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "Load more assignments" }).click();
  await expect(page.getByText("Another writing task", { exact: true })).toBeVisible();
  await expect(page.getByText("Explain your approach", { exact: true })).toHaveCount(1);
  await expect(page.getByRole("button", { name: "Load more assignments" })).toHaveCount(0);
});
