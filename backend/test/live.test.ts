import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

let student: Awaited<ReturnType<typeof createTestSession>>;
let unenrolledStudent: Awaited<ReturnType<typeof createTestSession>>;
let instructor: Awaited<ReturnType<typeof createTestSession>>;
let admin: Awaited<ReturnType<typeof createTestSession>>;

beforeAll(async () => {
  await setupDb();
  student = await createTestSession("student@cea.ng");
  unenrolledStudent = await createTestSession("fresh.student@cea.ng");
  instructor = await createTestSession("instructor@cea.ng");
  admin = await createTestSession("admin@cea.ng");

  // Ensure student is enrolled in full-stack and unenrolledStudent is not.
  await env.DB.prepare(
    `INSERT OR IGNORE INTO enrollments (id, user_id, course_slug, pct, enrolled_at)
     VALUES (?, ?, 'full-stack', 20, ?)`,
  )
    .bind(crypto.randomUUID(), student.session.user.id, new Date().toISOString())
    .run();
  await env.DB.prepare(`DELETE FROM enrollments WHERE user_id = ? AND course_slug = 'full-stack'`)
    .bind(unenrolledStudent.session.user.id)
    .run();
  await env.DB.prepare(
    `INSERT OR IGNORE INTO assignment_roster_grants
       (instructor_id, student_id, course_slug, active, expires_at, changed_by, changed_at, operation_id)
     VALUES (?, ?, 'full-stack', 1, '2099-01-01T00:00:00Z', ?, ?, ?)`,
  )
    .bind(
      instructor.session.user.id,
      student.session.user.id,
      admin.session.user.id,
      new Date().toISOString(),
      crypto.randomUUID(),
    )
    .run();
});

describe("live classes course ownership and enrollment checks", () => {
  it("requires authentication", async () => {
    expect((await api("/v1/live/classes")).status).toBe(401);
  });

  it("scopes live classes to enrolled students and owning instructor/admin", async () => {
    // Instructor creates a live session for full-stack
    const createRes = await api("/v1/live/classes", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(instructor.cookie) },
      body: JSON.stringify({
        title: "HTML Semantic Structure Walkthrough",
        courseSlug: "full-stack",
        startsAt: "2026-12-01T10:00:00Z",
        meetingUrl: "https://meet.jit.si/cea-full-stack-live",
        status: "live",
      }),
    });
    expect(createRes.status).toBe(201);
    const created = (await createRes.json()) as { id: string; courseSlug: string; status: string };
    expect(created.courseSlug).toBe("full-stack");
    expect(created.status).toBe("live");

    // Enrolled student sees it in list and can view, chat, and vote
    const studentList = (await (
      await api("/v1/live/classes", { headers: cookieHeaders(student.cookie) })
    ).json()) as { items: { id: string }[] };
    expect(studentList.items.some((s) => s.id === created.id)).toBe(true);

    expect(
      (await api(`/v1/live/classes/${created.id}`, { headers: cookieHeaders(student.cookie) }))
        .status,
    ).toBe(200);

    const chatRes = await api(`/v1/live/classes/${created.id}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
      body: JSON.stringify({ body: "Ready for CSS grids!" }),
    });
    expect(chatRes.status).toBe(201);

    // Unenrolled student does NOT see it and gets 403 on direct access
    const unenrolledList = (await (
      await api("/v1/live/classes", { headers: cookieHeaders(unenrolledStudent.cookie) })
    ).json()) as { items: { id: string }[] };
    expect(unenrolledList.items.some((s) => s.id === created.id)).toBe(false);
    expect(
      (
        await api(`/v1/live/classes/${created.id}`, {
          headers: cookieHeaders(unenrolledStudent.cookie),
        })
      ).status,
    ).toBe(403);
    expect(
      (
        await api(`/v1/live/classes/${created.id}/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...cookieHeaders(unenrolledStudent.cookie),
          },
          body: JSON.stringify({ body: "Unauthorized" }),
        })
      ).status,
    ).toBe(403);

    // Instructor creates a poll and enrolled student votes; unenrolled student gets 403
    const pollRes = await api(`/v1/live/classes/${created.id}/polls`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(instructor.cookie) },
      body: JSON.stringify({
        question: "Which layout next?",
        options: ["Flexbox", "CSS Grid"],
      }),
    });
    expect(pollRes.status).toBe(201);
    const poll = (await pollRes.json()) as { id: string };

    expect(
      (
        await api(`/v1/live/classes/${created.id}/polls/${poll.id}/vote`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
          body: JSON.stringify({ option: "CSS Grid" }),
        })
      ).status,
    ).toBe(200);
    expect(
      (
        await api(`/v1/live/classes/${created.id}/polls/${poll.id}/vote`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...cookieHeaders(unenrolledStudent.cookie),
          },
          body: JSON.stringify({ option: "Flexbox" }),
        })
      ).status,
    ).toBe(403);

    // Admin can manage status transitions
    const patchRes = await api(`/v1/live/classes/${created.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...cookieHeaders(admin.cookie) },
      body: JSON.stringify({ status: "ended" }),
    });
    expect(patchRes.status).toBe(200);
  });
});
