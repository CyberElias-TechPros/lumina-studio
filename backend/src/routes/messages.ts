import { Hono } from "hono";
import { z } from "zod";
import type { AppEnv } from "../types";
import { ApiError } from "../lib/errors";
import { base64UrlDecode, base64UrlEncode, isoNow } from "../lib/crypto";
import { paginate, parsePagination, type Paginated } from "../lib/pagination";
import { requireAuth } from "../lib/auth";
import { parseBody } from "../lib/validate";

export interface ApiMessage {
  id?: string;
  text: string;
  time: string;
  mine: boolean;
  senderName?: string;
  createdAt?: string;
}

export interface ApiThread {
  id: string;
  name: string;
  role: string;
  unread: number;
  legacy?: boolean;
  last: { text: string; time: string; mine: boolean };
  messages: ApiMessage[];
}

export interface ApiMessageContact {
  id: string;
  name: string;
  roleKey: string;
}

interface LegacyThreadRow {
  id: string;
  name: string;
  role: string;
  unread: number;
  last_text: string;
  last_time: string;
  last_mine: number;
  messages: string;
}

interface DirectThreadSummaryRow {
  id: string;
  subject: string;
  kind: string;
  updated_at: string;
  unread_count: number;
  other_name: string | null;
  other_role: string | null;
  last_body: string | null;
  last_created_at: string | null;
  last_sender_id: string | null;
}

interface DirectMessageRow {
  id: string;
  sender_id: string;
  sender_name: string;
  body: string;
  created_at: string;
}

const LEGACY_SELECT = `
  SELECT id, name, role, unread, last_text, last_time, last_mine, messages
    FROM message_threads
`;

function mapLegacyRow(row: LegacyThreadRow): ApiThread {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    unread: row.unread,
    legacy: true,
    last: { text: row.last_text, time: row.last_time, mine: row.last_mine === 1 },
    messages: JSON.parse(row.messages) as ApiMessage[],
  };
}

function shortTimeLabel(iso: string): string {
  if (!iso) return "";
  const ts = Date.parse(iso);
  if (!Number.isFinite(ts)) return iso;
  return new Date(ts).toISOString().slice(0, 16).replace("T", " ") + " UTC";
}

export const messages = new Hono<{ Bindings: AppEnv }>();

messages.use("*", requireAuth);
messages.use("*", async (c, next) => {
  c.header("Cache-Control", "no-store");
  await next();
});

messages.get("/contacts", async (c) => {
  const user = c.get("authUser");
  const isStaff = ["admin", "admissions", "instructor", "mentor", "director", "ops"].includes(
    user.roleKey,
  );
  const rows = isStaff
    ? await c.env.DB.prepare(
        `SELECT id, name, role_key FROM users
          WHERE status = 'active' AND id != ?
          ORDER BY CASE WHEN role_key IN ('admin', 'admissions', 'instructor') THEN 0 ELSE 1 END, name ASC
          LIMIT 50`,
      )
        .bind(user.id)
        .all<{ id: string; name: string; role_key: string }>()
    : await c.env.DB.prepare(
        `SELECT id, name, role_key FROM users
          WHERE status = 'active' AND id != ? AND role_key IN ('admin', 'admissions', 'instructor', 'mentor')
          ORDER BY CASE role_key WHEN 'admissions' THEN 0 WHEN 'admin' THEN 1 WHEN 'instructor' THEN 2 ELSE 3 END, name ASC
          LIMIT 30`,
      )
        .bind(user.id)
        .all<{ id: string; name: string; role_key: string }>();

  const items: ApiMessageContact[] = rows.results.map((r) => ({
    id: r.id,
    name: r.name,
    roleKey: r.role_key,
  }));
  return c.json({ items });
});

const createThreadSchema = z
  .object({
    subject: z.string().trim().min(2).max(160),
    recipientId: z.string().trim().min(1).max(80).optional(),
    body: z.string().trim().min(1).max(4000),
  })
  .strict();

messages.post("/threads", async (c) => {
  const user = c.get("authUser");
  const input = await parseBody(c, createThreadSchema);

  let recipient: { id: string; name: string; role_key: string } | null = null;
  if (!input.recipientId || input.recipientId === "support") {
    recipient = await c.env.DB.prepare(
      `SELECT id, name, role_key FROM users
        WHERE status = 'active' AND id != ? AND role_key IN ('admissions', 'admin')
        ORDER BY CASE role_key WHEN 'admissions' THEN 0 ELSE 1 END, id ASC
        LIMIT 1`,
    )
      .bind(user.id)
      .first<{ id: string; name: string; role_key: string }>();
  } else {
    recipient = await c.env.DB.prepare(
      `SELECT id, name, role_key FROM users WHERE id = ? AND status = 'active' AND id != ?`,
    )
      .bind(input.recipientId, user.id)
      .first<{ id: string; name: string; role_key: string }>();
  }

  if (!recipient) {
    throw ApiError.notFound("No active recipient account found for this message.");
  }

  const now = isoNow();
  const convId = `conv-${crypto.randomUUID()}`;
  const msgId = `msg-${crypto.randomUUID()}`;

  await c.env.DB.batch([
    c.env.DB.prepare(
      `INSERT INTO direct_conversations (id, subject, kind, created_by, created_at, updated_at)
       VALUES (?, ?, 'direct', ?, ?, ?)`,
    ).bind(convId, input.subject, user.id, now, now),
    c.env.DB.prepare(
      `INSERT INTO direct_participants (conversation_id, user_id, unread_count, last_read_at)
       VALUES (?, ?, 0, ?)`,
    ).bind(convId, user.id, now),
    c.env.DB.prepare(
      `INSERT INTO direct_participants (conversation_id, user_id, unread_count, last_read_at)
       VALUES (?, ?, 1, '')`,
    ).bind(convId, recipient.id),
    c.env.DB.prepare(
      `INSERT INTO direct_messages (id, conversation_id, sender_id, sender_name, body, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
    ).bind(msgId, convId, user.id, user.name, input.body, now),
  ]);

  const thread: ApiThread = {
    id: convId,
    name: `${input.subject} · ${recipient.name}`,
    role: recipient.role_key,
    unread: 0,
    legacy: false,
    last: { text: input.body, time: shortTimeLabel(now), mine: true },
    messages: [
      {
        id: msgId,
        text: input.body,
        time: shortTimeLabel(now),
        mine: true,
        senderName: user.name,
        createdAt: now,
      },
    ],
  };
  return c.json(thread, 201);
});

messages.get("/threads", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const userId = c.get("authUser").id;

  const directCount = await c.env.DB.prepare(
    `SELECT COUNT(*) AS n FROM direct_participants WHERE user_id = ?`,
  )
    .bind(userId)
    .first<{ n: number }>();

  const directRows = await c.env.DB.prepare(
    `SELECT dc.id, dc.subject, dc.kind, dc.updated_at, dp.unread_count,
            (SELECT u.name FROM direct_participants p2 JOIN users u ON u.id = p2.user_id
              WHERE p2.conversation_id = dc.id AND p2.user_id != ? LIMIT 1) AS other_name,
            (SELECT u.role_key FROM direct_participants p2 JOIN users u ON u.id = p2.user_id
              WHERE p2.conversation_id = dc.id AND p2.user_id != ? LIMIT 1) AS other_role,
            (SELECT m.body FROM direct_messages m WHERE m.conversation_id = dc.id
              ORDER BY m.created_at DESC, m.rowid DESC LIMIT 1) AS last_body,
            (SELECT m.created_at FROM direct_messages m WHERE m.conversation_id = dc.id
              ORDER BY m.created_at DESC, m.rowid DESC LIMIT 1) AS last_created_at,
            (SELECT m.sender_id FROM direct_messages m WHERE m.conversation_id = dc.id
              ORDER BY m.created_at DESC, m.rowid DESC LIMIT 1) AS last_sender_id
       FROM direct_conversations dc
       JOIN direct_participants dp ON dp.conversation_id = dc.id AND dp.user_id = ?
       ${cursor ? "WHERE dc.id > ?" : ""}
      ORDER BY dc.updated_at DESC, dc.id ASC
      LIMIT ?`,
  )
    .bind(userId, userId, userId, ...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<DirectThreadSummaryRow>();

  const directItems: ApiThread[] = directRows.results.map((r) => ({
    id: r.id,
    name: r.other_name ? `${r.subject} · ${r.other_name}` : r.subject,
    role: r.other_role ?? r.kind,
    unread: r.unread_count,
    legacy: false,
    last: {
      text: r.last_body ?? "",
      time: shortTimeLabel(r.last_created_at ?? r.updated_at),
      mine: r.last_sender_id === userId,
    },
    messages: [],
  }));

  let legacyItems: ApiThread[] = [];
  let legacyTotal = 0;
  if (!cursor && directItems.length < limit) {
    const legacyCountRow = await c.env.DB.prepare(
      `SELECT COUNT(*) AS n FROM message_threads WHERE user_id = ?`,
    )
      .bind(userId)
      .first<{ n: number }>();
    legacyTotal = legacyCountRow?.n ?? 0;
    const legacyRows = await c.env.DB.prepare(
      `${LEGACY_SELECT} WHERE user_id = ? ORDER BY id ASC LIMIT ?`,
    )
      .bind(userId, limit - directItems.length)
      .all<LegacyThreadRow>();
    legacyItems = legacyRows.results.map(mapLegacyRow);
  }

  const items = [...directItems, ...legacyItems];
  const result: Paginated<ApiThread> = paginate(
    items,
    (directCount?.n ?? 0) + legacyTotal,
    (last) => base64UrlEncode(last.id),
  );
  if (directRows.results.length < limit) delete result.nextCursor;
  return c.json(result);
});

messages.get("/threads/:id", async (c) => {
  const userId = c.get("authUser").id;
  const threadId = c.req.param("id");

  const conv = await c.env.DB.prepare(
    `SELECT dc.id, dc.subject, dc.kind, dc.updated_at,
            (SELECT u.name FROM direct_participants p2 JOIN users u ON u.id = p2.user_id
              WHERE p2.conversation_id = dc.id AND p2.user_id != ? LIMIT 1) AS other_name,
            (SELECT u.role_key FROM direct_participants p2 JOIN users u ON u.id = p2.user_id
              WHERE p2.conversation_id = dc.id AND p2.user_id != ? LIMIT 1) AS other_role
       FROM direct_conversations dc
       JOIN direct_participants dp ON dp.conversation_id = dc.id AND dp.user_id = ?
      WHERE dc.id = ?`,
  )
    .bind(userId, userId, userId, threadId)
    .first<{
      id: string;
      subject: string;
      kind: string;
      updated_at: string;
      other_name: string | null;
      other_role: string | null;
    }>();

  if (conv) {
    const now = isoNow();
    await c.env.DB.prepare(
      `UPDATE direct_participants SET unread_count = 0, last_read_at = ?
        WHERE conversation_id = ? AND user_id = ?`,
    )
      .bind(now, threadId, userId)
      .run();

    const msgRows = await c.env.DB.prepare(
      `SELECT id, sender_id, sender_name, body, created_at
         FROM direct_messages
        WHERE conversation_id = ?
        ORDER BY created_at ASC, rowid ASC
        LIMIT 200`,
    )
      .bind(threadId)
      .all<DirectMessageRow>();

    const mapped: ApiMessage[] = msgRows.results.map((m) => ({
      id: m.id,
      text: m.body,
      time: shortTimeLabel(m.created_at),
      mine: m.sender_id === userId,
      senderName: m.sender_name,
      createdAt: m.created_at,
    }));
    const lastMsg = mapped[mapped.length - 1];
    return c.json({
      id: conv.id,
      name: conv.other_name ? `${conv.subject} · ${conv.other_name}` : conv.subject,
      role: conv.other_role ?? conv.kind,
      unread: 0,
      legacy: false,
      last: lastMsg
        ? { text: lastMsg.text, time: lastMsg.time, mine: lastMsg.mine }
        : { text: "", time: shortTimeLabel(conv.updated_at), mine: false },
      messages: mapped,
    } satisfies ApiThread);
  }

  const row = await c.env.DB.prepare(`${LEGACY_SELECT} WHERE user_id = ? AND id = ?`)
    .bind(userId, threadId)
    .first<LegacyThreadRow>();
  if (!row) throw ApiError.notFound("Thread not found.");
  return c.json(mapLegacyRow(row));
});

const sendMessageSchema = z
  .object({
    body: z.string().trim().min(1, "Message cannot be empty.").max(4000),
  })
  .strict();

messages.post("/threads/:id/messages", async (c) => {
  const user = c.get("authUser");
  const threadId = c.req.param("id");

  const membership = await c.env.DB.prepare(
    `SELECT conversation_id FROM direct_participants WHERE conversation_id = ? AND user_id = ?`,
  )
    .bind(threadId, user.id)
    .first<{ conversation_id: string }>();
  if (!membership) {
    throw ApiError.notFound("Conversation not found.");
  }

  const { body } = await parseBody(c, sendMessageSchema);
  const now = isoNow();
  const msgId = `msg-${crypto.randomUUID()}`;

  await c.env.DB.batch([
    c.env.DB.prepare(
      `INSERT INTO direct_messages (id, conversation_id, sender_id, sender_name, body, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
    ).bind(msgId, threadId, user.id, user.name, body, now),
    c.env.DB.prepare(`UPDATE direct_conversations SET updated_at = ? WHERE id = ?`).bind(
      now,
      threadId,
    ),
    c.env.DB.prepare(
      `UPDATE direct_participants SET unread_count = unread_count + 1
        WHERE conversation_id = ? AND user_id != ?`,
    ).bind(threadId, user.id),
    c.env.DB.prepare(
      `UPDATE direct_participants SET unread_count = 0, last_read_at = ?
        WHERE conversation_id = ? AND user_id = ?`,
    ).bind(now, threadId, user.id),
  ]);

  return c.json(
    {
      id: msgId,
      text: body,
      time: shortTimeLabel(now),
      mine: true,
      senderName: user.name,
      createdAt: now,
    } satisfies ApiMessage,
    201,
  );
});
