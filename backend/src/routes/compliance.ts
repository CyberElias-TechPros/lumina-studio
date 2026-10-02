/**
 * Compliance deadlines — the real regulatory clock.
 *
 *   GET    /v1/compliance/deadlines        list (with days remaining + buckets)
 *   POST   /v1/compliance/deadlines        create
 *   PATCH  /v1/compliance/deadlines/:id    edit / complete / waive
 *   DELETE /v1/compliance/deadlines/:id    remove a mistake
 *
 * There is no seeded data here on purpose: every row is a date a human read off
 * the CAC/FIRS/NRS portal. The daily `compliance-reminders` job emails the
 * 30/14/7/3/1/0-day warnings from `due_on`.
 */
import { Hono } from "hono";
import type { AppEnv } from "../types";
import { ApiError } from "../lib/errors";
import { parseBody } from "../lib/validate";
import { isoNow } from "../lib/crypto";
import { requireAuth, requireFinance } from "../lib/auth";
import { z } from "zod";

export const compliance = new Hono<{ Bindings: AppEnv }>();

export const REMINDER_BUCKETS = [30, 14, 7, 3, 1, 0] as const;

export interface DeadlineRow {
  id: string;
  title: string;
  authority: string;
  category: string;
  due_on: string;
  recurrence: string;
  notes: string | null;
  status: string;
  completed_on: string | null;
  completed_by: string | null;
  created_at: string;
  updated_at: string;
}

/** Whole days from today (UTC) until `dueOn`; negative when overdue. */
export function daysUntil(dueOn: string, today = new Date()): number {
  const due = Date.parse(`${dueOn}T00:00:00.000Z`);
  const base = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  return Math.round((due - base) / 86_400_000);
}

function decorate(row: DeadlineRow, today = new Date()) {
  const daysRemaining = daysUntil(row.due_on, today);
  const open = row.status === "open";
  return {
    id: row.id,
    title: row.title,
    authority: row.authority,
    category: row.category,
    dueOn: row.due_on,
    recurrence: row.recurrence,
    notes: row.notes,
    status: row.status,
    completedOn: row.completed_on,
    completedBy: row.completed_by,
    daysRemaining,
    /** The bucket the reminder job will fire next, for the UI's progress dots. */
    overdue: open && daysRemaining < 0,
    urgency: !open
      ? ("closed" as const)
      : daysRemaining < 0
        ? ("overdue" as const)
        : daysRemaining <= 7
          ? ("critical" as const)
          : daysRemaining <= 30
            ? ("soon" as const)
            : ("scheduled" as const),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/** GET /deadlines?status=open|done|all */
compliance.get("/deadlines", requireAuth, requireFinance, async (c) => {
  const status = (c.req.query("status") ?? "open").trim();
  if (!["open", "done", "waived", "all"].includes(status)) {
    throw ApiError.validation({ status: ["Unknown status."] });
  }
  const rows = await c.env.DB.prepare(
    `SELECT * FROM compliance_deadlines ${status === "all" ? "" : "WHERE status = ?"}
     ORDER BY (status = 'open') DESC, due_on ASC LIMIT 200`,
  )
    .bind(...(status === "all" ? [] : [status]))
    .all<DeadlineRow>();
  return c.json({ items: rows.results.map((row) => decorate(row)) });
});

const createSchema = z.object({
  title: z.string().trim().min(4, "Describe the filing.").max(200),
  authority: z.string().trim().min(2).max(60).default("other"),
  category: z.string().trim().min(2).max(40).default("other"),
  dueOn: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD."),
  recurrence: z.enum(["none", "annual", "quarterly", "monthly"]).default("none"),
  notes: z.string().trim().max(1000).optional(),
});

compliance.post("/deadlines", requireAuth, requireFinance, async (c) => {
  const input = await parseBody(c, createSchema);
  const now = isoNow();
  const id = crypto.randomUUID();
  await c.env.DB.prepare(
    `INSERT INTO compliance_deadlines
       (id, title, authority, category, due_on, recurrence, notes, status, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'open', ?, ?)`,
  )
    .bind(
      id,
      input.title,
      input.authority,
      input.category,
      input.dueOn,
      input.recurrence,
      input.notes ?? null,
      now,
      now,
    )
    .run();
  const row = await c.env.DB.prepare(`SELECT * FROM compliance_deadlines WHERE id = ?`)
    .bind(id)
    .first<DeadlineRow>();
  return c.json({ deadline: decorate(row!) }, 201);
});

const patchSchema = z.object({
  title: z.string().trim().min(4).max(200).optional(),
  dueOn: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD.")
    .optional(),
  notes: z.string().trim().max(1000).optional(),
  recurrence: z.enum(["none", "annual", "quarterly", "monthly"]).optional(),
  /** Mark it filed, waive it, or reopen. */
  status: z.enum(["open", "done", "waived"]).optional(),
  completedBy: z.string().trim().max(120).optional(),
});

compliance.patch("/deadlines/:id", requireAuth, requireFinance, async (c) => {
  const actor = c.get("authUser");
  const id = c.req.param("id");
  const existing = await c.env.DB.prepare(`SELECT * FROM compliance_deadlines WHERE id = ?`)
    .bind(id)
    .first<DeadlineRow>();
  if (!existing) throw ApiError.notFound("No deadline with that id.");
  const input = await parseBody(c, patchSchema);
  const now = isoNow();

  const sets: string[] = [];
  const binds: unknown[] = [];
  if (input.title !== undefined) {
    sets.push("title = ?");
    binds.push(input.title);
  }
  if (input.dueOn !== undefined) {
    sets.push("due_on = ?");
    binds.push(input.dueOn);
  }
  if (input.notes !== undefined) {
    sets.push("notes = ?");
    binds.push(input.notes);
  }
  if (input.recurrence !== undefined) {
    sets.push("recurrence = ?");
    binds.push(input.recurrence);
  }
  if (input.status !== undefined) {
    sets.push("status = ?");
    binds.push(input.status);
    if (input.status === "done") {
      sets.push("completed_on = ?", "completed_by = ?");
      binds.push(now, input.completedBy ?? actor?.email ?? "admin");
      // Recurring items roll forward instead of being re-typed next year.
      if (existing.recurrence === "annual") {
        const next = new Date(`${existing.due_on}T00:00:00.000Z`);
        next.setUTCFullYear(next.getUTCFullYear() + 1);
        const nextId = crypto.randomUUID();
        await c.env.DB.prepare(
          `INSERT INTO compliance_deadlines
             (id, title, authority, category, due_on, recurrence, notes, status, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, 'open', ?, ?)`,
        )
          .bind(
            nextId,
            existing.title,
            existing.authority,
            existing.category,
            next.toISOString().slice(0, 10),
            existing.recurrence,
            existing.notes,
            now,
            now,
          )
          .run();
      }
    } else {
      sets.push("completed_on = NULL", "completed_by = NULL");
    }
  }
  if (sets.length === 0) throw ApiError.validation({ _: ["Nothing to update."] });
  sets.push("updated_at = ?");
  binds.push(now);

  await c.env.DB.prepare(`UPDATE compliance_deadlines SET ${sets.join(", ")} WHERE id = ?`)
    .bind(...binds, id)
    .run();
  const row = await c.env.DB.prepare(`SELECT * FROM compliance_deadlines WHERE id = ?`)
    .bind(id)
    .first<DeadlineRow>();
  return c.json({ deadline: decorate(row!) });
});

compliance.delete("/deadlines/:id", requireAuth, requireFinance, async (c) => {
  const id = c.req.param("id");
  const result = await c.env.DB.prepare(`DELETE FROM compliance_deadlines WHERE id = ?`)
    .bind(id)
    .run();
  if (!result.meta.changes) throw ApiError.notFound("No deadline with that id.");
  await c.env.DB.prepare(`DELETE FROM compliance_reminder_log WHERE deadline_id = ?`)
    .bind(id)
    .run();
  return c.json({ ok: true });
});
