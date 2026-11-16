import { expect, test, type Page } from "@playwright/test";

const origin = new URL(process.env.E2E_BASE_URL ?? "http://127.0.0.1:3000").origin;
const cors = {
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};
async function mockApi(page: Page, role: "student" | "mentor", empty = false) {
  const writes: string[] = [];
  const requests: string[] = [];
  await page.addInitScript(() => localStorage.setItem("cea:onboarding:tour:v1", "test"));
  await page.route("**/*", (route) => {
    const request = route.request();
    const url = new URL(request.url());
    if (!["localhost", "127.0.0.1", "mock-api.example.test"].includes(url.hostname))
      return route.abort();
    if (!url.pathname.startsWith("/v1/")) return route.continue();
    if (request.method() === "OPTIONS") return route.fulfill({ status: 204, headers: cors });
    requests.push(url.pathname + url.search);
    if (request.method() !== "GET") writes.push(url.pathname);
    const user = {
      id: `${role}-test`,
      name: "Test user",
      email: `${role}@example.test`,
      roleKey: role,
      permissions: [],
    };
    if (url.pathname === "/v1/auth/session")
      return route.fulfill({ headers: cors, json: { user, expiresAt: "2099-01-01T00:00:00Z" } });
    if (url.pathname === "/v1/account")
      return route.fulfill({ headers: cors, json: { ...user, emailVerified: true } });
    if (url.pathname === "/v1/messages/threads") {
      const second = url.searchParams.get("cursor") === "next";
      return route.fulfill({
        headers: cors,
        json: {
          items: empty
            ? []
            : [
                {
                  id: second ? "b" : "a",
                  name: second ? "Second person" : "First person",
                  role: "",
                  unread: 0,
                  last: {
                    text: second ? "Second preview" : "First preview",
                    time: "",
                    mine: false,
                  },
                  messages: [
                    { text: second ? "Second entry" : "First entry", time: "", mine: false },
                  ],
                },
              ],
          total: empty ? 0 : 2,
          nextCursor: !empty && !second ? "next" : null,
        },
      });
    }
    if (url.pathname === "/v1/mentor-dashboard/conversations")
      return route.fulfill({
        headers: cors,
        json: {
          items: empty
            ? []
            : ["a", "b"].map((id) => ({
                id,
                name: id === "a" ? "First person" : "Second person",
                track: "",
                preview: `${id} preview`,
                timeLabel: "",
                unread: 0,
              })),
          total: empty ? 0 : 2,
          nextCursor: null,
        },
      });
    if (url.pathname.startsWith("/v1/mentor-dashboard/conversations/")) {
      const id = url.pathname.split("/").pop();
      return route.fulfill({
        headers: cors,
        json: {
          id,
          name: id === "a" ? "First person" : "Second person",
          track: "",
          preview: "",
          timeLabel: "",
          unread: 0,
          thread: [
            {
              id: `message-${id}`,
              fromLabel: "Other",
              body: id === "a" ? "First entry" : "Second entry",
              timeLabel: "",
            },
          ],
        },
      });
    }
    return route.fulfill({ headers: cors, json: { items: [], total: 0, nextCursor: null } });
  });
  return { writes, requests };
}

test("student records are read-only and load subsequent conversations", async ({ page }) => {
  const { writes, requests } = await mockApi(page, "student");
  await page.goto("/app/messages");
  await expect(page.getByText(/Sending messages here is currently unavailable/)).toBeVisible();
  await expect(page.getByText("First entry")).toBeVisible();
  await page.getByRole("button", { name: "Load more conversations" }).click();
  await page.getByRole("button", { name: /Second person/ }).click();
  await expect(page.getByText("Second entry")).toBeVisible();
  expect(requests.some((url) => url.includes("cursor=next"))).toBeTruthy();
  await expect(page.getByRole("button", { name: "Send message" })).toHaveCount(0);
  expect(writes).toEqual([]);
});

test("mentor can select a stored conversation but cannot send from the legacy screen", async ({
  page,
}) => {
  const { writes } = await mockApi(page, "mentor");
  await page.goto("/app/mentor/messages");
  await expect(page.getByText("First entry")).toBeVisible();
  await page.getByRole("button", { name: /Second person/ }).click();
  await expect(page.getByText("Second entry")).toBeVisible();
  await expect(page.getByText(/Sending messages here is currently unavailable/)).toBeVisible();
  await expect(page.getByRole("button", { name: "Send message" })).toHaveCount(0);
  expect(writes).toEqual([]);
});

test("empty mentor list does not request a fabricated conversation", async ({ page }) => {
  const { requests } = await mockApi(page, "mentor", true);
  await page.goto("/app/mentor/messages");
  await expect(page.getByText("There are no stored conversations to display.")).toBeVisible();
  expect(requests.filter((url) => url.startsWith("/v1/mentor-dashboard/conversations/"))).toEqual(
    [],
  );
});
