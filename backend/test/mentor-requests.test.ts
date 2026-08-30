import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

beforeAll(async () => {
  await setupDb();
});

describe("POST /v1/mentor/requests", () => {
  it("stores a request for the authenticated learner", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const res = await api("/v1/mentor/requests", {
      method: "POST",
      headers: { ...cookieHeaders(cookie), "Content-Type": "application/json" },
      body: JSON.stringify({
        mentorId: "mentor-2",
        goal: "Prepare for system design interviews",
        program: "backend",
      }),
    });
    expect(res.status).toBe(201);
    expect(await res.json()).toMatchObject({
      ok: true,
      alreadyRequested: false,
      mentor: "Tomi Bakare",
    });
  });

  it("is idempotent and validates authorization", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const repeat = await api("/v1/mentor/requests", {
      method: "POST",
      headers: { ...cookieHeaders(cookie), "Content-Type": "application/json" },
      body: JSON.stringify({ mentorId: "mentor-2", goal: "Prepare for system design interviews" }),
    });
    expect(repeat.status).toBe(200);
    expect((await repeat.json()) as { alreadyRequested: boolean }).toMatchObject({
      alreadyRequested: true,
    });

    const invalid = await api("/v1/mentor/requests", {
      method: "POST",
      headers: { ...cookieHeaders(cookie), "Content-Type": "application/json" },
      body: JSON.stringify({ mentorId: "missing", goal: "Need help" }),
    });
    expect(invalid.status).toBe(404);

    const instructor = await createTestSession("instructor@cea.ng");
    const forbidden = await api("/v1/mentor/requests", {
      method: "POST",
      headers: { ...cookieHeaders(instructor.cookie), "Content-Type": "application/json" },
      body: JSON.stringify({ mentorId: "mentor-2", goal: "Need help" }),
    });
    expect(forbidden.status).toBe(403);
  });
});
