import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

describe("notification preferences", () => {
  let cookie: string;
  let studentId = "";

  beforeAll(async () => {
    await setupDb();
    const student = await createTestSession("student@cea.ng");
    cookie = student.cookie;
    studentId = student.session.user.id;
  });

  it("counts unread notifications and keeps shared read state private per user", async () => {
    const studentList = await api("/v1/notifications?limit=50", {
      headers: cookieHeaders(cookie),
    });
    expect(studentList.status).toBe(200);
    const { items, total, nextCursor } = (await studentList.json()) as {
      items: { id: string; read?: boolean }[];
      total: number;
      nextCursor?: string;
    };
    if (total <= 50) expect(nextCursor).toBeUndefined();

    const sharedUnread = await env.DB.prepare(
      `SELECT n.id FROM notifications n
       LEFT JOIN notification_reads nr ON nr.notification_id = n.id AND nr.user_id = ?
       WHERE n.user_id IS NULL AND nr.read_at IS NULL
       ORDER BY n.id ASC LIMIT 1`,
    )
      .bind(studentId)
      .first<{ id: string }>();
    expect(sharedUnread).toBeDefined();
    expect(items.some((item) => item.id === sharedUnread?.id && !item.read)).toBe(true);

    const studentCountResponse = await api("/v1/notifications/unread-count", {
      headers: cookieHeaders(cookie),
    });
    expect(studentCountResponse.status).toBe(200);
    const { count: unreadBefore } = (await studentCountResponse.json()) as { count: number };
    expect(unreadBefore).toBeGreaterThan(0);

    const otherUser = (await createTestSession("admin@cea.ng")).cookie;
    const otherCountBeforeResponse = await api("/v1/notifications/unread-count", {
      headers: cookieHeaders(otherUser),
    });
    const { count: otherCountBefore } = (await otherCountBeforeResponse.json()) as {
      count: number;
    };

    const marked = await api(`/v1/notifications/${sharedUnread!.id}/read`, {
      method: "POST",
      headers: cookieHeaders(cookie),
    });
    expect(marked.status).toBe(200);

    const afterOne = await api("/v1/notifications/unread-count", {
      headers: cookieHeaders(cookie),
    });
    expect(await afterOne.json()).toEqual({ count: unreadBefore - 1 });

    const otherCountAfterResponse = await api("/v1/notifications/unread-count", {
      headers: cookieHeaders(otherUser),
    });
    expect(await otherCountAfterResponse.json()).toEqual({ count: otherCountBefore });

    const markAll = await api("/v1/notifications/read-all", {
      method: "POST",
      headers: cookieHeaders(cookie),
    });
    expect(markAll.status).toBe(200);
    const afterAll = await api("/v1/notifications/unread-count", {
      headers: cookieHeaders(cookie),
    });
    expect(await afterAll.json()).toEqual({ count: 0 });
  });

  it("returns safe defaults and persists partial updates", async () => {
    const initial = await api("/v1/notifications/preferences", {
      headers: cookieHeaders(cookie),
    });
    expect(initial.status).toBe(200);
    expect(await initial.json()).toEqual({
      appEnabled: true,
      emailEnabled: true,
      smsEnabled: false,
      quietStart: "21:00",
      quietEnd: "08:00",
    });

    const updated = await api("/v1/notifications/preferences", {
      method: "PATCH",
      headers: { ...cookieHeaders(cookie), "Content-Type": "application/json" },
      body: JSON.stringify({ smsEnabled: true, quietStart: "20:30" }),
    });
    expect(updated.status).toBe(200);
    expect(await updated.json()).toMatchObject({
      appEnabled: true,
      emailEnabled: true,
      smsEnabled: true,
      quietStart: "20:30",
      quietEnd: "08:00",
    });
  });
});
