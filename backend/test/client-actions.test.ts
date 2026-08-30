import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

type TestSession = Awaited<ReturnType<typeof createTestSession>>;

let admin: TestSession;
let student: TestSession;

beforeAll(async () => {
  await setupDb();
  admin = await createTestSession("admin@cea.ng");
  student = await createTestSession("student@cea.ng");
});

describe("client support actions", () => {
  it("creates an owned support ticket", async () => {
    const response = await api("/v1/client-dashboard/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(admin.cookie) },
      body: JSON.stringify({
        title: "Repository access issue",
        description: "The deployment key needs to be refreshed.",
      }),
    });

    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({
      ticket: expect.objectContaining({
        id: expect.stringMatching(/^cli-ticket-/),
        title: "Repository access issue",
        description: "The deployment key needs to be refreshed.",
        reference: expect.stringMatching(/^TK-/),
        status: "Open",
      }),
    });
  });

  it("rejects ticket creation for non-client roles", async () => {
    const response = await api("/v1/client-dashboard/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
      body: JSON.stringify({ title: "Not allowed" }),
    });
    expect(response.status).toBe(403);
  });
});
