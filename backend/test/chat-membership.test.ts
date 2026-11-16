import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

let owner: Awaited<ReturnType<typeof createTestSession>>,
  other: Awaited<ReturnType<typeof createTestSession>>,
  admin: Awaited<ReturnType<typeof createTestSession>>;
const future = () => new Date(Date.now() + 86400000).toISOString();
const headers = (cookie: string) => ({
  "Content-Type": "application/json",
  ...cookieHeaders(cookie),
});
const create = async () => {
  const response = await api("/v1/realtime/chat/rooms", {
    method: "POST",
    headers: headers(owner.cookie),
    body: JSON.stringify({ name: "Private test" }),
  });
  expect(response.status).toBe(201);
  return ((await response.json()) as { id: string }).id;
};
const grant = (room: string, user: string, cookie = admin.cookie, expiresAt = future()) =>
  api(`/v1/realtime/admin/rooms/${room}/members`, {
    method: "PUT",
    headers: headers(cookie),
    body: JSON.stringify({ userId: user, expiresAt }),
  });

beforeAll(async () => {
  await setupDb();
  owner = await createTestSession("student@cea.ng");
  other = await createTestSession("fresh.student@cea.ng");
  admin = await createTestSession("admin@cea.ng");
});
describe("explicit chat membership", () => {
  it("creates owner membership atomically and hides rooms from other users, including admins", async () => {
    const id = await create();
    const list = async (cookie: string) =>
      (
        (await (await api("/v1/realtime/chat/rooms", { headers: headers(cookie) })).json()) as {
          items: { id: string }[];
        }
      ).items;
    expect((await list(owner.cookie)).some((r) => r.id === id)).toBe(true);
    expect((await list(other.cookie)).some((r) => r.id === id)).toBe(false);
    expect((await list(admin.cookie)).some((r) => r.id === id)).toBe(false);
    expect(
      (await api(`/v1/realtime/chat/rooms/${id}/messages`, { headers: headers(other.cookie) }))
        .status,
    ).toBe(404);
    expect(
      (
        await api(`/v1/realtime/chat/rooms/${id}/messages`, {
          method: "POST",
          headers: headers(other.cookie),
          body: JSON.stringify({ body: "Intrusion" }),
        })
      ).status,
    ).toBe(404);
    expect(
      (
        await api(`/v1/realtime/chat/rooms/${id}/ws`, {
          headers: {
            upgrade: "websocket",
            connection: "Upgrade",
            origin: "https://cea.ng",
            ...cookieHeaders(other.cookie),
          },
        })
      ).status,
    ).toBe(404);
  });
  it("allows only an admin to grant and revoke, and closes access after revocation or expiry", async () => {
    const id = await create();
    expect((await grant(id, other.session.user.id, owner.cookie)).status).toBe(403);
    expect((await grant(id, other.session.user.id)).status).toBe(200);
    expect(
      (await api(`/v1/realtime/chat/rooms/${id}/messages`, { headers: headers(other.cookie) }))
        .status,
    ).toBe(200);
    expect(
      (
        await api(`/v1/realtime/admin/rooms/${id}/members/${other.session.user.id}`, {
          method: "DELETE",
          headers: headers(admin.cookie),
        })
      ).status,
    ).toBe(200);
    expect(
      (await api(`/v1/realtime/chat/rooms/${id}/messages`, { headers: headers(other.cookie) }))
        .status,
    ).toBe(404);
    expect(
      (
        await grant(
          id,
          other.session.user.id,
          admin.cookie,
          new Date(Date.now() - 1000).toISOString(),
        )
      ).status,
    ).toBe(400);
    const events = await env.DB.prepare(
      "SELECT active FROM chat_room_member_events WHERE room_id = ? AND user_id = ? ORDER BY rowid",
    )
      .bind(id, other.session.user.id)
      .all<{ active: number }>();
    expect(events.results.map((row) => row.active)).toEqual([1, 0]);
  });
  it("does not infer access to legacy rooms from creator or name", async () => {
    const id = crypto.randomUUID();
    await env.DB.prepare(
      "INSERT INTO realtime_rooms(id,name,kind,created_at,created_by) VALUES (?,?,'chat',?,?)",
    )
      .bind(id, "Old room", new Date().toISOString(), owner.session.user.id)
      .run();
    expect(
      (await api(`/v1/realtime/chat/rooms/${id}/messages`, { headers: headers(owner.cookie) }))
        .status,
    ).toBe(404);
    expect((await grant(id, owner.session.user.id)).status).toBe(200);
    expect(
      (await api(`/v1/realtime/chat/rooms/${id}/messages`, { headers: headers(owner.cookie) }))
        .status,
    ).toBe(200);
  });
  it("expires membership and restricts the admin inventory and grant endpoints", async () => {
    const id = await create();
    expect((await api("/v1/realtime/admin/rooms", { headers: headers(other.cookie) })).status).toBe(
      403,
    );
    expect(
      (await api(`/v1/realtime/admin/rooms/${id}/members`, { headers: headers(other.cookie) }))
        .status,
    ).toBe(403);
    expect(
      (
        await grant(
          id,
          other.session.user.id,
          admin.cookie,
          new Date(Date.now() + 366 * 86400000).toISOString(),
        )
      ).status,
    ).toBe(400);
    expect((await grant(id, other.session.user.id)).status).toBe(200);
    await env.DB.prepare(
      "UPDATE chat_room_members SET expires_at = ? WHERE room_id = ? AND user_id = ?",
    )
      .bind("2000-01-01T00:00:00.000Z", id, other.session.user.id)
      .run();
    const response = await api(`/v1/realtime/chat/rooms/${id}/messages`, {
      headers: headers(other.cookie),
    });
    expect(response.status).toBe(404);
    expect(
      (
        await api(`/v1/realtime/chat/rooms/${id}/messages`, { headers: headers(owner.cookie) })
      ).headers.get("cache-control"),
    ).toBe("no-store");
  });
});
