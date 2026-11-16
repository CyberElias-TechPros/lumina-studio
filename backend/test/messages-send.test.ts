import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

beforeAll(async () => {
  await setupDb();
});

describe("legacy message send fails closed until real recipient delivery exists", () => {
  it("requires a session", async () => {
    expect(
      (
        await api("/v1/messages/threads/t1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ body: "Hello" }),
        })
      ).status,
    ).toBe(401);
  });
  it("does not write to the sender's thread or claim delivery", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const headers = { "Content-Type": "application/json", ...cookieHeaders(cookie) };
    const before = await (await api("/v1/messages/threads/t1", { headers })).json();
    const result = await api("/v1/messages/threads/t1/messages", {
      method: "POST",
      headers,
      body: JSON.stringify({ body: "Important message" }),
    });
    expect(result.status).toBe(503);
    expect(await result.json()).toMatchObject({ error: { code: "MESSAGING_UNAVAILABLE" } });
    expect(await (await api("/v1/messages/threads/t1", { headers })).json()).toEqual(before);
  });
  it("does not leak whether another thread exists", async () => {
    const { cookie } = await createTestSession("fresh.student@cea.ng");
    const headers = { "Content-Type": "application/json", ...cookieHeaders(cookie) };
    expect(
      (await api("/v1/messages/threads/t1/messages", { method: "POST", headers, body: "{}" }))
        .status,
    ).toBe(503);
    expect(
      (
        await api("/v1/messages/threads/not-a-thread/messages", {
          method: "POST",
          headers,
          body: "{}",
        })
      ).status,
    ).toBe(503);
    expect((await api("/v1/messages/threads/t1", { headers })).status).toBe(404);
  });
});
