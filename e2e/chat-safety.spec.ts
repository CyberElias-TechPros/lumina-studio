import { expect, test } from "@playwright/test";

const origin = new URL(process.env.E2E_BASE_URL ?? "http://127.0.0.1:3000").origin;
const cors = {
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

test("room changes hide old socket messages and failed saves are not broadcast", async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem("cea:onboarding:tour:v1", "test");
    class FakeSocket extends EventTarget {
      static OPEN = 1;
      readyState = 1;
      onopen: (() => void) | null = null;
      onmessage: ((event: { data: string }) => void) | null = null;
      onerror: (() => void) | null = null;
      onclose: (() => void) | null = null;
      sent: string[] = [];
      constructor(public url: string) {
        super();
        (window as unknown as { sockets: FakeSocket[] }).sockets.push(this);
        setTimeout(() => this.onopen?.(), 0);
      }
      send(data: string) {
        this.sent.push(data);
      }
      close() {
        this.readyState = 3;
        this.onclose?.();
      }
    }
    (window as unknown as { sockets: FakeSocket[] }).sockets = [];
    (window as unknown as { WebSocket: typeof FakeSocket }).WebSocket = FakeSocket;
  });
  await page.route("**/*", (route) => {
    const request = route.request(),
      url = new URL(request.url());
    if (!["localhost", "127.0.0.1", "mock-api.example.test"].includes(url.hostname))
      return route.abort();
    if (!url.pathname.startsWith("/v1/")) return route.continue();
    if (request.method() === "OPTIONS") return route.fulfill({ status: 204, headers: cors });
    const user = {
      id: "student-test",
      name: "Student",
      email: "student@example.test",
      roleKey: "student",
      permissions: [],
    };
    if (url.pathname === "/v1/auth/session")
      return route.fulfill({ headers: cors, json: { user, expiresAt: "2099-01-01T00:00:00Z" } });
    if (url.pathname === "/v1/account")
      return route.fulfill({ headers: cors, json: { ...user, emailVerified: true } });
    if (url.pathname === "/v1/realtime/chat/rooms")
      return route.fulfill({
        headers: cors,
        json: {
          items:
            url.searchParams.get("cursor") === "room-page-2"
              ? [{ id: "b", name: "Room B", kind: "chat", createdAt: "" }]
              : [{ id: "a", name: "Room A", kind: "chat", createdAt: "" }],
          ...(!url.searchParams.has("cursor") ? { nextCursor: "room-page-2" } : {}),
          total: 2,
        },
      });
    if (url.pathname.match(/\/v1\/realtime\/chat\/rooms\/[ab]\/messages/)) {
      if (request.method() === "POST") {
        if (request.postDataJSON().body === "Saved text")
          return route.fulfill({
            status: 201,
            headers: cors,
            json: {
              id: "saved-1",
              roomId: "b",
              channel: "chat",
              userId: "student-test",
              userName: "Student",
              body: "Saved text",
              createdAt: "now",
            },
          });
        return route.fulfill({
          status: 503,
          headers: cors,
          json: { error: { code: "FAILED", message: "Could not save" } },
        });
      }
      return route.fulfill({
        headers: cors,
        json: {
          items: url.pathname.includes("/b/")
            ? []
            : [
                {
                  id: `history-${url.pathname}`,
                  roomId: "",
                  channel: "chat",
                  userId: "other",
                  userName: "Person",
                  body: "History",
                  createdAt: "",
                },
              ],
          total: 1,
        },
      });
    }
    return route.fulfill({ headers: cors, json: { items: [], total: 0 } });
  });
  await page.goto("/app/chat");
  await expect(page.getByText(/Rooms are available to their assigned members/)).toBeVisible();
  await page.waitForFunction(() =>
    (window as unknown as { sockets: { url: string }[] }).sockets.some((s) =>
      s.url.includes("/v1/realtime/chat/rooms/a/ws"),
    ),
  );
  await page.evaluate(() => {
    const sockets = (
      window as unknown as {
        sockets: { url: string; onmessage: (event: { data: string }) => void }[];
      }
    ).sockets;
    sockets
      .find((s) => s.url.includes("/v1/realtime/chat/rooms/a/ws"))!
      .onmessage({
        data: JSON.stringify({
          type: "message",
          id: "live-a",
          body: "Room A private context",
          user: { name: "Person" },
          at: "now",
        }),
      });
  });
  await expect(page.getByText("Room A private context")).toBeVisible();
  await page.getByRole("button", { name: "Load more rooms" }).click();
  await page.getByRole("button", { name: /Room B/ }).click();
  await expect(page.getByText("Room A private context")).toHaveCount(0);
  await page.getByLabel("Message the room").fill("Unsent text");
  await page.getByRole("button", { name: "Send room message" }).click();
  await expect(page.getByText("Message could not be saved. Please try again.")).toBeVisible();
  const sent = await page.evaluate(() =>
    (window as unknown as { sockets: { url: string; sent: string[] }[] }).sockets
      .filter((s) => s.url.includes("/v1/realtime/"))
      .flatMap((s) => s.sent),
  );
  expect(sent).toEqual([]);
  await page.evaluate(() => {
    const socket = (
      window as unknown as {
        sockets: { url: string; onmessage: (event: { data: string }) => void }[];
      }
    ).sockets.find((s) => s.url.includes("/rooms/b/ws"))!;
    const frame = JSON.stringify({
      type: "message",
      id: "b-live",
      body: "Live in empty history",
      user: { name: "Person" },
      at: "now",
    });
    socket.onmessage({ data: frame });
    socket.onmessage({ data: frame });
  });
  await expect(page.getByText("Live in empty history")).toHaveCount(1);
  await page.getByLabel("Message the room").fill("Saved text");
  await page.getByRole("button", { name: "Send room message" }).click();
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          (window as unknown as { sockets: { url: string; sent: string[] }[] }).sockets.find((s) =>
            s.url.includes("/rooms/b/ws"),
          )?.sent.length,
      ),
    )
    .toBe(1);
  const savedFrame = await page.evaluate(
    () =>
      (window as unknown as { sockets: { url: string; sent: string[] }[] }).sockets.find((s) =>
        s.url.includes("/rooms/b/ws"),
      )!.sent[0]!,
  );
  expect(JSON.parse(savedFrame)).toMatchObject({ type: "message", messageId: "saved-1" });
});
