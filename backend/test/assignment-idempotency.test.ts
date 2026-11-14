import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it } from "vitest";
import { api, authHeaders, createTestSession, setupDb } from "./helpers";

let admin: Awaited<ReturnType<typeof createTestSession>>;
let teacher: Awaited<ReturnType<typeof createTestSession>>;
const slug = "idempotency-course";
const deadline = "2099-01-01T12:00:00.000Z";

beforeAll(async () => {
  await setupDb();
  admin = await createTestSession("admin@cea.ng");
  teacher = await createTestSession("instructor@cea.ng");
  await env.DB.batch([
    env.DB.prepare("INSERT INTO courses (slug,title) VALUES (?,?)").bind(slug, "Retry test course"),
    env.DB.prepare(
      "INSERT INTO users (id,name,email,role_key,status) VALUES ('retry-student','Student','retry@example.test','student','active')",
    ),
    env.DB.prepare(
      "INSERT INTO enrollments (id,user_id,course_slug) VALUES ('retry-enrollment','retry-student',?)",
    ).bind(slug),
  ]);
});
function send(key: string, title = "Retry-safe assignment", cookie = admin.cookie) {
  return api("/v1/instructor/assignments", {
    method: "POST",
    headers: authHeaders(cookie),
    body: JSON.stringify({
      idempotencyKey: key,
      courseSlug: slug,
      title,
      dueAt: deadline,
      notify: true,
    }),
  });
}
function lookup(key: string, cookie = admin.cookie) {
  return api(`/v1/instructor/assignment-publications/${key}`, { headers: authHeaders(cookie) });
}
describe("assignment publication recovery", () => {
  it("replays a committed publication without repeating assignments or notifications", async () => {
    const key = crypto.randomUUID();
    const a = await send(key);
    expect(a.status).toBe(201);
    const original = (await a.json()) as { groupId: string; recipients: number };
    expect(original.recipients).toBe(1);
    const b = await send(key);
    expect(b.status).toBe(201);
    expect(await b.json()).toEqual(original);
    expect(((await (await lookup(key)).json()) as { publication: unknown }).publication).toEqual(
      original,
    );
    expect(
      (
        await env.DB.prepare("SELECT COUNT(*) AS n FROM assignments WHERE group_id=?")
          .bind(original.groupId)
          .first<{ n: number }>()
      )?.n,
    ).toBe(1);
    expect(
      (
        await env.DB.prepare(
          "SELECT COUNT(*) AS n FROM notifications WHERE title='New assignment: Retry-safe assignment'",
        ).first<{ n: number }>()
      )?.n,
    ).toBe(1);
    expect(
      ((await (await lookup(key, teacher.cookie)).json()) as { publication: unknown }).publication,
    ).toBeNull();
    expect((await send(key, "Changed details")).status).toBe(409);
  });
  it("allows a committed result to be recovered after enrollment changes", async () => {
    const key = crypto.randomUUID();
    const initial = await send(key, "Roster change retry");
    expect(initial.status).toBe(201);
    const result = await initial.json();
    await env.DB.prepare("UPDATE users SET status='suspended' WHERE id='retry-student'").run();
    try {
      const retry = await send(key, "Roster change retry");
      expect(retry.status).toBe(201);
      expect(await retry.json()).toEqual(result);
    } finally {
      await env.DB.prepare("UPDATE users SET status='active' WHERE id='retry-student'").run();
    }
  });
  it("serializes concurrent requests using the same reference", async () => {
    const key = crypto.randomUUID();
    const [a, b] = await Promise.all([
      send(key, "Concurrent retry test"),
      send(key, "Concurrent retry test"),
    ]);
    expect([a.status, b.status]).toEqual([201, 201]);
    const [first, second] = (await Promise.all([a.json(), b.json()])) as [
      { groupId: string },
      { groupId: string },
    ];
    expect(first).toEqual(second);
    expect(
      (
        await env.DB.prepare("SELECT COUNT(*) AS n FROM assignments WHERE group_id=?")
          .bind(first.groupId)
          .first<{ n: number }>()
      )?.n,
    ).toBe(1);
    expect(
      (
        await env.DB.prepare(
          "SELECT COUNT(*) AS n FROM notifications WHERE title='New assignment: Concurrent retry test'",
        ).first<{ n: number }>()
      )?.n,
    ).toBe(1);
  });
  it("conflicts when concurrent requests reuse a reference with different parameters", async () => {
    const key = crypto.randomUUID();
    const [a, b] = await Promise.all([
      send(key, "First competing request"),
      send(key, "Second competing request"),
    ]);
    expect([a.status, b.status].sort()).toEqual([201, 409]);
    expect(
      (
        await env.DB.prepare(
          "SELECT COUNT(*) AS n FROM assignment_publications WHERE author_id=? AND request_key=?",
        )
          .bind(admin.session.user.id, key)
          .first<{ n: number }>()
      )?.n,
    ).toBe(1);
    expect(
      (
        await env.DB.prepare(
          "SELECT COUNT(*) AS n FROM assignments WHERE title IN ('First competing request','Second competing request')",
        ).first<{ n: number }>()
      )?.n,
    ).toBe(1);
  });
  it("rolls back the reference and all work when notification recording fails, allowing a safe retry", async () => {
    const key = crypto.randomUUID();
    await env.DB.prepare(
      "CREATE TRIGGER retry_notification_fail BEFORE INSERT ON notifications WHEN NEW.title='New assignment: Recovery retry test' BEGIN SELECT RAISE(ABORT,'retry test failure'); END",
    ).run();
    try {
      expect((await send(key, "Recovery retry test")).status).toBe(500);
      expect(
        ((await (await lookup(key)).json()) as { publication: unknown }).publication,
      ).toBeNull();
      expect(
        (
          await env.DB.prepare(
            "SELECT COUNT(*) AS n FROM assignments WHERE title='Recovery retry test'",
          ).first<{ n: number }>()
        )?.n,
      ).toBe(0);
    } finally {
      await env.DB.prepare("DROP TRIGGER retry_notification_fail").run();
    }
    expect((await send(key, "Recovery retry test")).status).toBe(201);
  });
  it("validates reference format and does not retain empty-roster failures", async () => {
    expect((await send("invalid-key")).status).toBe(400);
    const key = crypto.randomUUID();
    await env.DB.prepare("UPDATE users SET status='suspended' WHERE id='retry-student'").run();
    try {
      expect((await send(key, "Empty retry test")).status).toBe(409);
      expect(
        ((await (await lookup(key)).json()) as { publication: unknown }).publication,
      ).toBeNull();
    } finally {
      await env.DB.prepare("UPDATE users SET status='active' WHERE id='retry-student'").run();
    }
    expect((await send(key, "Empty retry test")).status).toBe(201);
  });
});
