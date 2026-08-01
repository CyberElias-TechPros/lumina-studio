import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination, type Paginated } from "../lib/pagination";
import { requireAuth } from "../lib/auth";

export interface ApiCalendarEvent {
  id: string;
  date: string;
  day: string;
  title: string;
  kind: string;
  time: string;
  location: string;
}

interface CalendarRow {
  id: string;
  date: string;
  day: string;
  title: string;
  kind: string;
  time: string;
  location: string;
}

export const calendar = new Hono<{ Bindings: AppEnv }>();

calendar.get("/events", requireAuth, async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM calendar_events`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, date, day, title, kind, time, location
       FROM calendar_events
      ${cursor ? "WHERE id > ?" : ""}
      ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<CalendarRow>();
  const items = rows.results.map((r) => ({
    id: r.id,
    date: r.date,
    day: r.day,
    title: r.title,
    kind: r.kind,
    time: r.time,
    location: r.location,
  }));
  const result: Paginated<ApiCalendarEvent> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});
