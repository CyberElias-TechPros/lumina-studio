import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

type TestSession = Awaited<ReturnType<typeof createTestSession>>;

let receptionist: TestSession;
let student: TestSession;

beforeAll(async () => {
  await setupDb();
  receptionist = await createTestSession("receptionist@cea.ng");
  student = await createTestSession("student@cea.ng");
});

describe("receptionist actions", () => {
  it("checks visitors in, notifies hosts, and checks visitors out", async () => {
    const checkedIn = await api("/v1/receptionist-dashboard/check-in", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(receptionist.cookie) },
      body: JSON.stringify({
        fullName: "Visitor Example",
        hostLabel: "Aisha Bakare",
        phone: "+2347000000000",
        purpose: "Partnership meeting",
      }),
    });
    expect(checkedIn.status).toBe(201);
    const { visitor } = (await checkedIn.json()) as { visitor: { id: string; name: string } };
    expect(visitor).toEqual(expect.objectContaining({ name: "Visitor Example" }));

    const checkedOut = await api(`/v1/receptionist-dashboard/inside/${visitor.id}`, {
      method: "DELETE",
      headers: cookieHeaders(receptionist.cookie),
    });
    expect(checkedOut.status).toBe(200);

    const notified = await api("/v1/receptionist-dashboard/queue/rec-qq-01/notify", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...cookieHeaders(receptionist.cookie) },
      body: "{}",
    });
    expect(notified.status).toBe(200);
    expect(await notified.json()).toEqual({ ok: true, id: "rec-qq-01", notified: 1 });

    const task = await api("/v1/receptionist-dashboard/tasks/rec-ts-02", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...cookieHeaders(receptionist.cookie) },
      body: JSON.stringify({ done: true }),
    });
    expect(task.status).toBe(200);
    expect(await task.json()).toEqual({ ok: true, id: "rec-ts-02", done: 1 });
  });

  it("does not allow students to use receptionist actions", async () => {
    const response = await api("/v1/receptionist-dashboard/check-in", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
      body: JSON.stringify({ fullName: "Not allowed", hostLabel: "Host", purpose: "Visit" }),
    });
    expect(response.status).toBe(403);
  });
});
