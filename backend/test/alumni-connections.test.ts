import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

beforeAll(async () => {
  await setupDb();
});

describe("POST /v1/alumni-dashboard/members/:id/connect", () => {
  it("persists an idempotent connection request", async () => {
    const { cookie } = await createTestSession("alumni@cea.ng");
    const path = "/v1/alumni-dashboard/members/alu-mb-02/connect";
    const first = await api(path, {
      method: "POST",
      headers: { ...cookieHeaders(cookie), "Content-Type": "application/json" },
      body: "{}",
    });
    expect(first.status).toBe(201);
    expect(await first.json()).toMatchObject({
      ok: true,
      alreadyConnected: false,
      member: "David Osei",
    });

    const repeat = await api(path, {
      method: "POST",
      headers: { ...cookieHeaders(cookie), "Content-Type": "application/json" },
      body: "{}",
    });
    expect(repeat.status).toBe(200);
    expect(await repeat.json()).toMatchObject({ ok: true, alreadyConnected: true });
  });

  it("rejects non-alumni users and unknown members", async () => {
    const student = await createTestSession("student@cea.ng");
    const denied = await api("/v1/alumni-dashboard/members/alu-mb-02/connect", {
      method: "POST",
      headers: { ...cookieHeaders(student.cookie), "Content-Type": "application/json" },
      body: "{}",
    });
    expect(denied.status).toBe(403);

    const { cookie } = await createTestSession("alumni@cea.ng");
    const missing = await api("/v1/alumni-dashboard/members/missing/connect", {
      method: "POST",
      headers: { ...cookieHeaders(cookie), "Content-Type": "application/json" },
      body: "{}",
    });
    expect(missing.status).toBe(404);
  });
});
