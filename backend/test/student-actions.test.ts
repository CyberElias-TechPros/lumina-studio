import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

describe("student attendance and portfolio actions", () => {
  let instructorCookie: string;
  let studentCookie: string;

  beforeAll(async () => {
    await setupDb();
    instructorCookie = (await createTestSession("instructor@cea.ng")).cookie;
    studentCookie = (await createTestSession("student@cea.ng")).cookie;
  });

  it("creates a short-lived attendance session and checks a student in once", async () => {
    const created = await api("/v1/attendance/sessions", {
      method: "POST",
      headers: { ...cookieHeaders(instructorCookie), "Content-Type": "application/json" },
      body: JSON.stringify({ course: "Backend & APIs", durationMinutes: 15 }),
    });
    expect(created.status).toBe(201);
    const session = (await created.json()) as { code: string; course: string };
    expect(session.code).toMatch(/^[A-Z0-9]{8}$/);
    expect(session.course).toBe("Backend & APIs");

    const checkIn = await api("/v1/attendance/check-in", {
      method: "POST",
      headers: { ...cookieHeaders(studentCookie), "Content-Type": "application/json" },
      body: JSON.stringify({ sessionCode: session.code.toLowerCase() }),
    });
    expect(checkIn.status).toBe(201);
    expect(((await checkIn.json()) as { attendance: { status: string } }).attendance.status).toBe(
      "present",
    );

    const duplicate = await api("/v1/attendance/check-in", {
      method: "POST",
      headers: { ...cookieHeaders(studentCookie), "Content-Type": "application/json" },
      body: JSON.stringify({ sessionCode: session.code }),
    });
    expect(duplicate.status).toBe(200);
    expect(((await duplicate.json()) as { alreadyCheckedIn: boolean }).alreadyCheckedIn).toBe(true);

    const records = await api("/v1/student-self-dashboard/records", {
      headers: cookieHeaders(studentCookie),
    });
    const recordBody = (await records.json()) as {
      items: Array<{ course: string; status: string }>;
    };
    expect(recordBody.items[0]).toMatchObject({ course: "Backend & APIs", status: "Present" });
  });

  it("persists a student project and keeps it visible only to its owner", async () => {
    const created = await api("/v1/student-self-dashboard/projects", {
      method: "POST",
      headers: { ...cookieHeaders(studentCookie), "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Campus shuttle tracker",
        detail: "A small accessibility-first transit planner.",
        tags: ["React", "Maps"],
        url: "https://example.com/shuttle",
      }),
    });
    expect(created.status).toBe(201);
    const project = (await created.json()) as { id: string; tags: string[]; url: string };
    expect(project.id).toContain("student-project-");
    expect(project.tags).toEqual(["React", "Maps"]);
    expect(project.url).toBe("https://example.com/shuttle");

    const list = await api("/v1/student-self-dashboard/projects", {
      headers: cookieHeaders(studentCookie),
    });
    expect(list.status).toBe(200);
    const body = (await list.json()) as { items: Array<{ id: string; tags: string[] }> };
    expect(body.items.some((item) => item.id === project.id)).toBe(true);
    expect(body.items.find((item) => item.id === project.id)?.tags).toEqual(["React", "Maps"]);
  });
});
