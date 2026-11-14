import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it } from "vitest";
import { api, authHeaders, createTestSession, setupDb } from "./helpers";

const course = "atomic-publish-course";
let adminCookie: string;

beforeAll(async () => {
  await setupDb();
  adminCookie = (await createTestSession("admin@cea.ng")).cookie;
  await env.DB.prepare("INSERT INTO courses (slug,title) VALUES (?,?)")
    .bind(course, "Atomic test course")
    .run();
  // More than the old 25-recipient batch: the induced failure used to leave
  // earlier batches committed. All users and endpoints are isolated fixtures.
  for (let i = 0; i < 30; i++) {
    const id = `atomic-student-${String(i).padStart(2, "0")}`;
    await env.DB.batch([
      env.DB.prepare(
        "INSERT INTO users (id,name,email,role_key,status) VALUES (?,?,?,'student','active')",
      ).bind(id, "Test learner", `${id}@example.test`),
      env.DB.prepare("INSERT INTO enrollments (id,user_id,course_slug) VALUES (?,?,?)").bind(
        `enrollment-${id}`,
        id,
        course,
      ),
    ]);
  }
});

function publish(slug = course, notify = true) {
  return api("/v1/instructor/assignments", {
    method: "POST",
    headers: authHeaders(adminCookie),
    body: JSON.stringify({
      courseSlug: slug,
      title: "Atomic publication test",
      dueAt: new Date(Date.now() + 86400000).toISOString(),
      notify,
    }),
  });
}

describe("assignment publication transaction", () => {
  it("rolls back every recipient and notification if any notification insert fails", async () => {
    await env.DB.prepare(
      "CREATE TRIGGER atomic_publish_failure BEFORE INSERT ON notifications WHEN NEW.user_id = 'atomic-student-29' BEGIN SELECT RAISE(ABORT, 'isolated rollback'); END",
    ).run();
    try {
      const result = await publish();
      expect(result.status).toBe(500);
      const assignments = await env.DB.prepare(
        "SELECT COUNT(*) AS n FROM assignments WHERE title = 'Atomic publication test'",
      ).first<{ n: number }>();
      const notifications = await env.DB.prepare(
        "SELECT COUNT(*) AS n FROM notifications WHERE title = 'New assignment: Atomic publication test'",
      ).first<{ n: number }>();
      expect(assignments?.n).toBe(0);
      expect(notifications?.n).toBe(0);
    } finally {
      await env.DB.prepare("DROP TRIGGER atomic_publish_failure").run();
    }
  });

  it("includes only active students and reports the actual committed recipients", async () => {
    await env.DB.prepare(
      "UPDATE users SET status = 'suspended' WHERE id = 'atomic-student-28'",
    ).run();
    await env.DB.prepare(
      "UPDATE users SET role_key = 'mentor' WHERE id = 'atomic-student-29'",
    ).run();
    const result = await publish();
    expect(result.status).toBe(201);
    const { groupId, recipients } = (await result.json()) as {
      groupId: string;
      recipients: number;
    };
    expect(recipients).toBe(28);
    expect(
      (
        await env.DB.prepare("SELECT COUNT(*) AS n FROM assignments WHERE group_id = ?")
          .bind(groupId)
          .first<{ n: number }>()
      )?.n,
    ).toBe(28);
    expect(
      (
        await env.DB.prepare(
          "SELECT COUNT(*) AS n FROM notifications WHERE title = 'New assignment: Atomic publication test'",
        ).first<{ n: number }>()
      )?.n,
    ).toBe(28);
    expect(
      await env.DB.prepare(
        "SELECT id FROM assignments WHERE group_id=? AND user_id IN ('atomic-student-28','atomic-student-29')",
      )
        .bind(groupId)
        .first(),
    ).toBeNull();
  });

  it("does not report success for a course with no eligible recipients", async () => {
    const empty = "atomic-empty-course";
    await env.DB.prepare("INSERT INTO courses (slug,title) VALUES (?,?)")
      .bind(empty, "Empty test course")
      .run();
    const result = await publish(empty, false);
    expect(result.status).toBe(409);
  });

  it("rejects publication above the recipient cap without writing any assignments", async () => {
    const slug = "atomic-large-course";
    await env.DB.prepare("INSERT INTO courses (slug,title) VALUES (?,?)")
      .bind(slug, "Large test course")
      .run();
    await env.DB.batch([
      env.DB.prepare(`WITH RECURSIVE n(i) AS (VALUES(1) UNION ALL SELECT i+1 FROM n WHERE i<501)
        INSERT INTO users (id,name,email,role_key,status)
        SELECT 'large-'||i, 'Test learner', 'large-'||i||'@example.test', 'student', 'active' FROM n`),
      env.DB.prepare(
        `WITH RECURSIVE n(i) AS (VALUES(1) UNION ALL SELECT i+1 FROM n WHERE i<501)
        INSERT INTO enrollments (id,user_id,course_slug) SELECT 'large-enrollment-'||i, 'large-'||i, ? FROM n`,
      ).bind(slug),
    ]);
    const result = await publish(slug, true);
    expect(result.status).toBe(409);
    expect(
      (
        await env.DB.prepare(
          "SELECT COUNT(*) AS n FROM assignments WHERE course = 'Large test course'",
        ).first<{ n: number }>()
      )?.n,
    ).toBe(0);
  });

  it("does not let an instructor change a mixed-ownership group or clear its reminders", async () => {
    const instructor = await createTestSession("instructor@cea.ng");
    const group = "mixed-owner-group";
    await env.DB.batch([
      env.DB.prepare(
        `INSERT INTO assignments (id,user_id,title,course,due,group_id,created_by) VALUES (?,?,?,?,?,?,?)`,
      ).bind(
        "mixed-one",
        "atomic-student-00",
        "Mixed test",
        "Test",
        "original",
        group,
        instructor.session.user.id,
      ),
      env.DB.prepare(
        `INSERT INTO assignments (id,user_id,title,course,due,group_id,created_by) VALUES (?,?,?,?,?,?,NULL)`,
      ).bind("mixed-two", "atomic-student-01", "Mixed test", "Test", "original", group),
      env.DB.prepare(
        "INSERT INTO assignment_reminders (assignment_id,kind,sent_at) VALUES ('mixed-one','24h','2026-01-01T00:00:00Z')",
      ),
    ]);
    const result = await api(`/v1/instructor/assignments/groups/${group}`, {
      method: "PATCH",
      headers: authHeaders(instructor.cookie),
      body: JSON.stringify({ dueAt: new Date(Date.now() + 86400000).toISOString() }),
    });
    expect(result.status).toBe(403);
    expect(
      (
        await env.DB.prepare(
          "SELECT COUNT(*) AS n FROM assignments WHERE group_id=? AND due='original'",
        )
          .bind(group)
          .first<{ n: number }>()
      )?.n,
    ).toBe(2);
    expect(
      (
        await env.DB.prepare(
          "SELECT COUNT(*) AS n FROM assignment_reminders WHERE assignment_id='mixed-one'",
        ).first<{ n: number }>()
      )?.n,
    ).toBe(1);
  });

  it("allows an instructor to move a wholly owned group and reset reminders", async () => {
    const instructor = await createTestSession("instructor@cea.ng");
    const group = "owned-deadline-group";
    await env.DB.batch([
      env.DB.prepare(
        `INSERT INTO assignments (id,user_id,title,course,due,group_id,created_by) VALUES (?,?,?,?,?,?,?)`,
      ).bind(
        "owned-one",
        "atomic-student-00",
        "Owned test",
        "Test",
        "original",
        group,
        instructor.session.user.id,
      ),
      env.DB.prepare(
        `INSERT INTO assignment_reminders (assignment_id,kind,sent_at) VALUES ('owned-one','24h','2026-01-01T00:00:00Z')`,
      ),
    ]);
    const dueAt = new Date(Date.now() + 86400000).toISOString();
    const result = await api(`/v1/instructor/assignments/groups/${group}`, {
      method: "PATCH",
      headers: authHeaders(instructor.cookie),
      body: JSON.stringify({ dueAt }),
    });
    expect(result.status).toBe(200);
    expect(
      (
        await env.DB.prepare("SELECT due_at FROM assignments WHERE id='owned-one'").first<{
          due_at: string;
        }>()
      )?.due_at,
    ).toBe(dueAt);
    expect(
      (
        await env.DB.prepare(
          "SELECT COUNT(*) AS n FROM assignment_reminders WHERE assignment_id='owned-one'",
        ).first<{ n: number }>()
      )?.n,
    ).toBe(0);
  });
});
