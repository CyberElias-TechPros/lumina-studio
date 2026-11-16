import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

let student: Awaited<ReturnType<typeof createTestSession>>;
let instructor: Awaited<ReturnType<typeof createTestSession>>;
beforeAll(async () => {
  await setupDb();
  student = await createTestSession("student@cea.ng");
  instructor = await createTestSession("instructor@cea.ng");
});
describe("live classes safety stop", () => {
  it("blocks list, detail, history and all interactive endpoints without exposing data or making writes", async () => {
    const before = await env.DB.prepare(
      "SELECT COUNT(*) AS n FROM realtime_messages WHERE channel='live'",
    ).first<{ n: number }>();
    const cases = [
      ["GET", "/v1/live/classes"],
      ["GET", "/v1/live/classes/live-1"],
      ["GET", "/v1/live/classes/live-1/chat"],
      ["POST", "/v1/live/classes/live-1/chat"],
      ["GET", "/v1/live/classes/live-1/polls"],
      ["POST", "/v1/live/classes/live-1/polls"],
      ["POST", "/v1/live/classes/live-1/polls/poll-1/vote"],
      ["GET", "/v1/live/classes/live-1/whiteboard/ops"],
      ["POST", "/v1/live/classes/live-1/whiteboard/ops"],
      ["GET", "/v1/live/classes/live-1/ws"],
    ];
    for (const who of [student, instructor])
      for (const [method, path] of cases) {
        const response = await api(path!, {
          method,
          headers: { ...cookieHeaders(who.cookie), "Content-Type": "application/json" },
          ...(method === "POST" ? { body: JSON.stringify({ body: "test" }) } : {}),
        });
        expect(response.status, `${method} ${path}`).toBe(503);
        expect(await response.json()).toMatchObject({ error: { code: "LIVE_UNAVAILABLE" } });
      }
    expect(
      await env.DB.prepare(
        "SELECT COUNT(*) AS n FROM realtime_messages WHERE channel='live'",
      ).first(),
    ).toEqual(before);
  });
  it("still requires authentication", async () => {
    expect((await api("/v1/live/classes")).status).toBe(401);
  });
});
