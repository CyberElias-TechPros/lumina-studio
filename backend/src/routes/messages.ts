import { Hono } from "hono";
import type { AppEnv } from "../types";
import { ApiError } from "../lib/errors";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination, type Paginated } from "../lib/pagination";
import { requireAuth } from "../lib/auth";

export interface ApiMessage {
  text: string;
  time: string;
  mine: boolean;
}

export interface ApiThread {
  id: string;
  name: string;
  role: string;
  unread: number;
  last: { text: string; time: string; mine: boolean };
  messages: ApiMessage[];
}

interface ThreadRow {
  id: string;
  name: string;
  role: string;
  unread: number;
  last_text: string;
  last_time: string;
  last_mine: number;
  messages: string;
}

const SELECT = `
  SELECT id, name, role, unread, last_text, last_time, last_mine, messages
    FROM message_threads
`;

function mapRow(row: ThreadRow): ApiThread {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    unread: row.unread,
    last: { text: row.last_text, time: row.last_time, mine: row.last_mine === 1 },
    messages: JSON.parse(row.messages) as ApiMessage[],
  };
}

export const messages = new Hono<{ Bindings: AppEnv }>();

messages.use("*", requireAuth);

messages.get("/threads", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const userId = c.get("authUser").id;
  const total = await c.env.DB.prepare(
    `SELECT COUNT(*) AS n FROM message_threads WHERE user_id = ?`,
  )
    .bind(userId)
    .first<{ n: number }>();
  const rows = await c.env.DB.prepare(
    `${SELECT} WHERE user_id = ? ${cursor ? "AND id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(userId, ...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<ThreadRow>();
  const items = rows.results.map(mapRow);
  const result: Paginated<ApiThread> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

messages.get("/threads/:id", async (c) => {
  const userId = c.get("authUser").id;
  const row = await c.env.DB.prepare(`${SELECT} WHERE user_id = ? AND id = ?`)
    .bind(userId, c.req.param("id"))
    .first<ThreadRow>();
  if (!row) throw ApiError.notFound("Thread not found.");
  return c.json(mapRow(row));
});
