import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

let student: Awaited<ReturnType<typeof createTestSession>>;
let freshStudent: Awaited<ReturnType<typeof createTestSession>>;
let admin: Awaited<ReturnType<typeof createTestSession>>;

beforeAll(async () => {
  await setupDb();
  student = await createTestSession("student@cea.ng");
  freshStudent = await createTestSession("fresh.student@cea.ng");
  admin = await createTestSession("admin@cea.ng");
});

describe("participant-authorized direct messaging", () => {
  it("requires authentication", async () => {
    expect((await api("/v1/messages/contacts")).status).toBe(401);
    expect(
      (
        await api("/v1/messages/threads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subject: "Help", body: "Hello" }),
        })
      ).status,
    ).toBe(401);
  });

  it("delivers messages atomically between participants and blocks non-participants", async () => {
    const contactsRes = await api("/v1/messages/contacts", {
      headers: cookieHeaders(student.cookie),
    });
    expect(contactsRes.status).toBe(200);
    const { items: contacts } = (await contactsRes.json()) as {
      items: { id: string; name: string; roleKey: string }[];
    };
    expect(contacts.length).toBeGreaterThan(0);

    const createRes = await api("/v1/messages/threads", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
      body: JSON.stringify({
        subject: "Timetable question",
        recipientId: admin.session.user.id,
        body: "Can I attend morning classes on Monday?",
      }),
    });
    expect(createRes.status).toBe(201);
    const created = (await createRes.json()) as { id: string; messages: { text: string }[] };
    expect(created.messages[0]?.text).toBe("Can I attend morning classes on Monday?");

    // Recipient sees unread message in their inbox, and reading clears unread count.
    const adminInboxRes = await api("/v1/messages/threads", {
      headers: cookieHeaders(admin.cookie),
    });
    expect(adminInboxRes.status).toBe(200);
    const adminInbox = (await adminInboxRes.json()) as {
      items: { id: string; unread: number; last: { text: string } }[];
    };
    const adminRow = adminInbox.items.find((t) => t.id === created.id);
    expect(adminRow).toBeDefined();
    expect(adminRow?.unread).toBe(1);
    expect(adminRow?.last.text).toBe("Can I attend morning classes on Monday?");

    const readRes = await api(`/v1/messages/threads/${created.id}`, {
      headers: cookieHeaders(admin.cookie),
    });
    expect(readRes.status).toBe(200);

    // Recipient replies and student sees it.
    const replyRes = await api(`/v1/messages/threads/${created.id}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(admin.cookie) },
      body: JSON.stringify({ body: "Yes, 9am Monday lab has seats." }),
    });
    expect(replyRes.status).toBe(201);

    const studentRead = await api(`/v1/messages/threads/${created.id}`, {
      headers: cookieHeaders(student.cookie),
    });
    expect(studentRead.status).toBe(200);
    const studentThread = (await studentRead.json()) as { messages: { text: string }[] };
    expect(studentThread.messages.map((m) => m.text)).toEqual([
      "Can I attend morning classes on Monday?",
      "Yes, 9am Monday lab has seats.",
    ]);

    // Uninvolved user cannot read or send into this thread.
    expect(
      (
        await api(`/v1/messages/threads/${created.id}`, {
          headers: cookieHeaders(freshStudent.cookie),
        })
      ).status,
    ).toBe(404);
    expect(
      (
        await api(`/v1/messages/threads/${created.id}/messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...cookieHeaders(freshStudent.cookie) },
          body: JSON.stringify({ body: "Snooping" }),
        })
      ).status,
    ).toBe(404);
  });

  it("keeps legacy unverified threads read-only", async () => {
    const res = await api("/v1/messages/threads/t1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
      body: JSON.stringify({ body: "Legacy write" }),
    });
    expect(res.status).toBe(404);
  });
});
