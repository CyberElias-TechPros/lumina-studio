import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it } from "vitest";
import { api, authHeaders, createTestSession, setupDb } from "./helpers";

type Session = Awaited<ReturnType<typeof createTestSession>>;
let admin: Session, teacher: Session, other: Session, student: Session, second: Session;
const slug = "roster-course-test";
beforeAll(async () => {
  await setupDb();
  admin = await createTestSession("admin@cea.ng");
  teacher = await createTestSession("instructor@cea.ng");
  other = await createTestSession("roster-other@cea.test");
  student = await createTestSession("roster-student@cea.test");
  second = await createTestSession("roster-student-two@cea.test");
  await env.DB.batch([
    env.DB.prepare("UPDATE users SET role_key='instructor' WHERE id=?").bind(other.session.user.id),
    env.DB.prepare("INSERT INTO courses (slug,title) VALUES (?,?)").bind(
      slug,
      "Explicit roster test",
    ),
    env.DB.prepare("INSERT INTO enrollments (id,user_id,course_slug) VALUES (?,?,?)").bind(
      "roster-one",
      student.session.user.id,
      slug,
    ),
    env.DB.prepare("INSERT INTO enrollments (id,user_id,course_slug) VALUES (?,?,?)").bind(
      "roster-two",
      second.session.user.id,
      slug,
    ),
  ]);
  // Refresh role claims rather than rely on the session created before the role change.
  other = await createTestSession("roster-other@cea.test");
});
function grant(
  actor: Session,
  active: boolean,
  user = student,
  instructor = teacher,
  course = slug,
) {
  return api("/v1/instructor/assignment-roster", {
    method: "PUT",
    headers: authHeaders(actor.cookie),
    body: JSON.stringify({
      instructorId: instructor.session.user.id,
      studentId: user.session.user.id,
      courseSlug: course,
      active,
      expiresAt: new Date(Date.now() + 90 * 86400000).toISOString(),
    }),
  });
}
function publish(actor: Session) {
  return api("/v1/instructor/assignments", {
    method: "POST",
    headers: authHeaders(actor.cookie),
    body: JSON.stringify({
      courseSlug: slug,
      title: "Explicit roster assignment",
      dueAt: "2099-01-01T00:00:00.000Z",
      notify: false,
    }),
  });
}

describe("explicit teaching roster", () => {
  it("requires an administrator and a valid active instructor, student and enrollment", async () => {
    expect((await grant(teacher, true)).status).toBe(403);
    expect((await grant(admin, true, student, student)).status).toBe(409);
    expect((await grant(admin, true, student, teacher, "not-enrolled")).status).toBe(409);
    expect((await publish(teacher)).status).toBe(409);
    expect((await grant(admin, true)).status).toBe(200);
    const row = await env.DB.prepare(
      "SELECT actor_id,active FROM assignment_roster_events WHERE student_id=?",
    )
      .bind(student.session.user.id)
      .first<{ actor_id: string; active: number }>();
    expect(row).toMatchObject({ actor_id: admin.session.user.id, active: 1 });
  });
  it("restricts roster inspection to administrators and enforces a bounded expiry", async () => {
    const query = new URLSearchParams({
      instructorId: teacher.session.user.id,
      studentId: student.session.user.id,
      courseSlug: slug,
    }).toString();
    expect(
      (
        await api(`/v1/instructor/assignment-roster?${query}`, {
          headers: authHeaders(teacher.cookie),
        })
      ).status,
    ).toBe(403);
    const info = await api(`/v1/instructor/assignment-roster?${query}`, {
      headers: authHeaders(admin.cookie),
    });
    expect(await info.json()).toMatchObject({ grant: { active: true } });
    const invalid = await api("/v1/instructor/assignment-roster", {
      method: "PUT",
      headers: authHeaders(admin.cookie),
      body: JSON.stringify({
        instructorId: teacher.session.user.id,
        studentId: second.session.user.id,
        courseSlug: slug,
        active: true,
        expiresAt: "2099-01-01T00:00:00Z",
      }),
    });
    expect(invalid.status).toBe(400);
  });
  it("publishes only to explicitly granted students, not the entire course or another instructor", async () => {
    const listing = await api("/v1/instructor/assignment-roster/courses", {
      headers: authHeaders(teacher.cookie),
    });
    expect(await listing.json()).toEqual({
      items: [{ slug, title: "Explicit roster test", recipients: 1 }],
      truncated: false,
    });
    expect((await publish(other)).status).toBe(409);
    const result = await publish(teacher);
    expect(result.status).toBe(201);
    const body = (await result.json()) as { groupId: string; recipients: number };
    expect(body.recipients).toBe(1);
    const rows = await env.DB.prepare("SELECT user_id FROM assignments WHERE group_id=?")
      .bind(body.groupId)
      .all<{ user_id: string }>();
    expect(rows.results).toEqual([{ user_id: student.session.user.id }]);
  });
  it("rechecks eligibility and expiry at publication time", async () => {
    await env.DB.prepare("UPDATE users SET status='suspended' WHERE id=?")
      .bind(student.session.user.id)
      .run();
    expect((await publish(teacher)).status).toBe(409);
    await env.DB.prepare("UPDATE users SET status='active' WHERE id=?")
      .bind(student.session.user.id)
      .run();
    await env.DB.prepare(
      "UPDATE assignment_roster_grants SET expires_at='2000-01-01T00:00:00.000Z' WHERE student_id=?",
    )
      .bind(student.session.user.id)
      .run();
    expect((await publish(teacher)).status).toBe(409);
    expect((await grant(admin, true)).status).toBe(200);
    await env.DB.prepare("DELETE FROM enrollments WHERE id='roster-one'").run();
    expect((await publish(teacher)).status).toBe(409);
    await env.DB.prepare(
      "INSERT INTO enrollments (id,user_id,course_slug) VALUES ('roster-one',?,?)",
    )
      .bind(student.session.user.id, slug)
      .run();
  });
  it("revocation prevents future publications without deleting previously published work", async () => {
    expect((await grant(admin, false)).status).toBe(200);
    expect((await publish(teacher)).status).toBe(409);
    expect(
      (
        await env.DB.prepare(
          "SELECT COUNT(*) AS n FROM assignments WHERE user_id=? AND title='Explicit roster assignment'",
        )
          .bind(student.session.user.id)
          .first<{ n: number }>()
      )?.n,
    ).toBe(1);
    expect(
      (
        await env.DB.prepare(
          "SELECT COUNT(*) AS n FROM assignment_roster_events WHERE student_id=?",
        )
          .bind(student.session.user.id)
          .first<{ n: number }>()
      )?.n,
    ).toBe(3);
  });
  it("rolls back a grant when the audit event cannot be recorded", async () => {
    await env.DB.prepare(
      "CREATE TRIGGER roster_event_fail BEFORE INSERT ON assignment_roster_events BEGIN SELECT RAISE(ABORT, 'audit failed'); END",
    ).run();
    try {
      expect((await grant(admin, true, second)).status).toBe(500);
      expect(
        await env.DB.prepare("SELECT active FROM assignment_roster_grants WHERE student_id=?")
          .bind(second.session.user.id)
          .first(),
      ).toBeNull();
    } finally {
      await env.DB.prepare("DROP TRIGGER roster_event_fail").run();
    }
  });
});
