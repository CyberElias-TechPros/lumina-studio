import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";
import { formatDueWat, parseDueText } from "../src/lib/due-dates";
import { inQuietHours, normalizePhone, sendSms, sendUserSms } from "../src/lib/sms";
import { assignmentReminders } from "../src/jobs/scheduled";
import type { AppEnv } from "../src/types";

const json = { "Content-Type": "application/json" };
const appEnv = env as unknown as AppEnv;

beforeAll(async () => {
  await setupDb();
});

describe("due-date parsing", () => {
  // Thu 1 Oct 2026, 10:00 WAT
  const ref = new Date("2026-10-01T09:00:00.000Z");

  it("parses ISO and date-only strings (WAT)", () => {
    expect(parseDueText("2026-10-03T16:00:00.000Z", ref)).toBe("2026-10-03T16:00:00.000Z");
    expect(parseDueText("2026-10-03", ref)).toBe("2026-10-03T22:59:00.000Z");
    expect(parseDueText("2026-10-03 17:00", ref)).toBe("2026-10-03T16:00:00.000Z");
  });

  it("parses month-name dates", () => {
    expect(parseDueText("Oct 12", ref)).toBe("2026-10-12T22:59:00.000Z");
    expect(parseDueText("12 Oct 2026 17:30", ref)).toBe("2026-10-12T16:30:00.000Z");
    // Long past without a year → next year.
    expect(parseDueText("Jan 5", ref)).toBe("2027-01-05T22:59:00.000Z");
  });

  it("parses relative text only when allowed", () => {
    expect(parseDueText("Today 23:59", ref)).toBe("2026-10-01T22:59:00.000Z");
    expect(parseDueText("Tomorrow 5pm", ref)).toBe("2026-10-02T16:00:00.000Z");
    expect(parseDueText("Sun · 23:59", ref)).toBe("2026-10-04T22:59:00.000Z");
    expect(parseDueText("Thu 09:00", ref)).toBe("2026-10-08T08:00:00.000Z"); // already passed today
    expect(parseDueText("Today 23:59", ref, { allowRelative: false })).toBeNull();
  });

  it("rejects garbage", () => {
    expect(parseDueText("whenever", ref)).toBeNull();
    expect(parseDueText("", ref)).toBeNull();
  });

  it("formats in WAT", () => {
    expect(formatDueWat("2026-10-03T22:59:00.000Z")).toBe("Sat 3 Oct, 23:59");
  });
});

describe("sms", () => {
  it("normalises Nigerian and international numbers", () => {
    expect(normalizePhone("0803 123 4567")).toBe("2348031234567");
    expect(normalizePhone("+234 803 123 4567")).toBe("2348031234567");
    expect(normalizePhone("+44 7700 900123")).toBe("447700900123");
    expect(normalizePhone("123")).toBeNull();
  });

  it("respects WAT quiet hours across midnight", () => {
    expect(inQuietHours(new Date("2026-10-01T21:30:00Z"), "21:00", "08:00")).toBe(true); // 22:30 WAT
    expect(inQuietHours(new Date("2026-10-01T11:00:00Z"), "21:00", "08:00")).toBe(false); // 12:00 WAT
  });

  it("skips (and logs) when no key is configured", async () => {
    const r = await sendSms(
      { ...appEnv, SMS_API_KEY: "", SMS_PROVIDER: "termii" },
      {
        to: "08031234567",
        body: "hi",
      },
    );
    expect(r.status).toBe("skipped");
    const row = await env.DB.prepare(
      `SELECT status FROM sms_messages WHERE to_number = '2348031234567' ORDER BY created_at DESC LIMIT 1`,
    ).first<{ status: string }>();
    expect(row?.status).toBe("skipped");
  });

  it("only texts users who opted in and have a phone", async () => {
    const { session } = await createTestSession("sms-user@cea.test");
    const smsEnv = { ...appEnv, SMS_PROVIDER: "console" };
    const noon = new Date("2026-10-01T11:00:00Z");
    expect(await sendUserSms(smsEnv, session.user.id, "x", { now: noon })).toBeNull();
    await env.DB.prepare(`UPDATE users SET phone = '08030000000' WHERE id = ?`)
      .bind(session.user.id)
      .run();
    await env.DB.prepare(
      `INSERT INTO notification_preferences (user_id, sms_enabled) VALUES (?, 1)
       ON CONFLICT(user_id) DO UPDATE SET sms_enabled = 1`,
    )
      .bind(session.user.id)
      .run();
    const r = await sendUserSms(smsEnv, session.user.id, "x", { now: noon });
    expect(r?.status).toBe("sent");
  });

  it("admin can send a test SMS; others cannot", async () => {
    const student = await createTestSession("sms-student@cea.test");
    const denied = await api("/v1/system/sms/test", {
      method: "POST",
      headers: { ...cookieHeaders(student.cookie), ...json },
      body: JSON.stringify({ to: "08031234567" }),
    });
    expect(denied.status).toBe(403);
    const admin = await createTestSession("admin@cea.ng");
    const ok = await api("/v1/system/sms/test", {
      method: "POST",
      headers: { ...cookieHeaders(admin.cookie), ...json },
      body: JSON.stringify({ to: "08031234567" }),
    });
    expect(ok.status).toBe(200);
  });
});

describe("assignment publishing + reminders", () => {
  it("publishes to every enrolled student with a real deadline, then reminds once", async () => {
    const admin = await createTestSession("admin@cea.ng");
    const learner = await createTestSession("asg-learner@cea.test");
    const course = await env.DB.prepare(`SELECT slug, title FROM courses LIMIT 1`).first<{
      slug: string;
      title: string;
    }>();
    expect(course).toBeTruthy();
    await env.DB.prepare(
      `INSERT OR IGNORE INTO enrollments (id, user_id, course_slug) VALUES (?, ?, ?)`,
    )
      .bind(crypto.randomUUID(), learner.session.user.id, course!.slug)
      .run();

    const past = await api("/v1/instructor/assignments", {
      method: "POST",
      headers: { ...cookieHeaders(admin.cookie), ...json },
      body: JSON.stringify({
        courseSlug: course!.slug,
        title: "Old",
        dueAt: "2020-01-01T00:00:00Z",
      }),
    });
    expect(past.status).toBe(400);

    const dueAt = new Date(Date.now() + 5 * 3600_000).toISOString(); // inside 24h window
    const res = await api("/v1/instructor/assignments", {
      method: "POST",
      headers: { ...cookieHeaders(admin.cookie), ...json },
      body: JSON.stringify({ courseSlug: course!.slug, title: "Ship the API", dueAt }),
    });
    expect(res.status).toBe(201);
    const pub = (await res.json()) as { groupId: string; recipients: number };
    expect(pub.recipients).toBeGreaterThanOrEqual(1);

    const list = await api("/v1/assignments", { headers: cookieHeaders(learner.cookie) });
    const items = ((await list.json()) as { items: { id: string; title: string; dueAt: string }[] })
      .items;
    const mine = items.find((a) => a.title === "Ship the API");
    expect(mine?.dueAt).toBe(dueAt);

    await assignmentReminders(appEnv);
    await assignmentReminders(appEnv);
    const reminders = await env.DB.prepare(
      `SELECT COUNT(*) AS n FROM assignment_reminders WHERE assignment_id = ? AND kind = '24h'`,
    )
      .bind(mine!.id)
      .first<{ n: number }>();
    expect(reminders?.n).toBe(1);

    // Moving the deadline resets reminders.
    const moved = await api(`/v1/instructor/assignments/groups/${pub.groupId}`, {
      method: "PATCH",
      headers: { ...cookieHeaders(admin.cookie), ...json },
      body: JSON.stringify({ dueAt: new Date(Date.now() + 3 * 86_400_000).toISOString() }),
    });
    expect(moved.status).toBe(200);
    const after = await env.DB.prepare(
      `SELECT COUNT(*) AS n FROM assignment_reminders WHERE assignment_id = ?`,
    )
      .bind(mine!.id)
      .first<{ n: number }>();
    expect(after?.n).toBe(0);
  });

  it("students cannot publish", async () => {
    const s = await createTestSession("asg-student2@cea.test");
    const res = await api("/v1/instructor/assignments", {
      method: "POST",
      headers: { ...cookieHeaders(s.cookie), ...json },
      body: JSON.stringify({ courseSlug: "x", title: "Nope", dueAt: "2030-01-01T00:00:00Z" }),
    });
    expect(res.status).toBe(403);
  });

  it("backfills unambiguous legacy dues but never guesses relative text", async () => {
    const { session } = await createTestSession("legacy-due@cea.test");
    await env.DB.batch([
      env.DB.prepare(
        `INSERT INTO assignments (id, user_id, title, due) VALUES ('leg-abs', ?, 'Abs', '2030-03-05 17:00')`,
      ).bind(session.user.id),
      env.DB.prepare(
        `INSERT INTO assignments (id, user_id, title, due) VALUES ('leg-rel', ?, 'Rel', 'Today 23:59')`,
      ).bind(session.user.id),
    ]);
    await assignmentReminders(appEnv);
    const rows = await env.DB.prepare(
      `SELECT id, due_at FROM assignments WHERE id IN ('leg-abs','leg-rel') ORDER BY id`,
    ).all<{ id: string; due_at: string }>();
    expect(rows.results[0]).toEqual({ id: "leg-abs", due_at: "2030-03-05T16:00:00.000Z" });
    expect(rows.results[1]).toEqual({ id: "leg-rel", due_at: "" });
  });
});

describe("portal summary", () => {
  it("requires a session", async () => {
    expect((await api("/v1/portal/summary?portal=student")).status).toBe(401);
  });

  it("gives students their personal metrics", async () => {
    const s = await createTestSession("portal-student@cea.test");
    const res = await api("/v1/portal/summary?portal=student", {
      headers: cookieHeaders(s.cookie),
    });
    const body = (await res.json()) as {
      group: string;
      restricted: boolean;
      metrics: { key: string }[];
    };
    expect(body.group).toBe("learner");
    expect(body.restricted).toBe(false);
    expect(body.metrics.map((m) => m.key)).toContain("pending");
  });

  it("never leaks finance data to a student", async () => {
    const s = await createTestSession("portal-snoop@cea.test");
    const res = await api("/v1/portal/summary?portal=accountant", {
      headers: cookieHeaders(s.cookie),
    });
    const body = (await res.json()) as {
      group: string;
      restricted: boolean;
      metrics: { key: string }[];
    };
    expect(body.restricted).toBe(true);
    expect(body.group).toBe("learner");
    expect(body.metrics.map((m) => m.key)).not.toContain("collected30");
  });

  it("shows admins org-wide finance and platform metrics", async () => {
    const admin = await createTestSession("admin@cea.ng");
    const fin = (await (
      await api("/v1/portal/summary?portal=finance", { headers: cookieHeaders(admin.cookie) })
    ).json()) as { group: string; metrics: { key: string }[] };
    expect(fin.group).toBe("finance");
    expect(fin.metrics.map((m) => m.key)).toContain("collected30");
    const plat = (await (
      await api("/v1/portal/summary?portal=devops", { headers: cookieHeaders(admin.cookie) })
    ).json()) as { group: string; metrics: { key: string }[] };
    expect(plat.metrics.map((m) => m.key)).toContain("integrations");
  });
});
