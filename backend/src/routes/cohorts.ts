/**
 * Cohorts — one source of truth for "when does the next intake start".
 *
 *   GET    /v1/cohorts              public, upcoming (optionally ?program=slug)
 *   GET    /v1/cohorts/next         public, the next intake (+ .ics link)
 *   GET    /v1/cohorts/:id/ics      public, calendar file for one cohort
 *   POST   /v1/cohorts              admin/admissions
 *   PATCH  /v1/cohorts/:id          admin/admissions
 *   DELETE /v1/cohorts/:id          admin
 *
 * The enrolment success screen used to hardcode "2 Nov 2026" into the invite it
 * offered students. It now reads the cohort row, so changing a date on the
 * admissions page changes what every new applicant is told.
 */
import { Hono } from "hono";
import type { AppEnv } from "../types";
import { ApiError } from "../lib/errors";
import { parseBody } from "../lib/validate";
import { isoNow } from "../lib/crypto";
import { requireAuth, requireAdmin, requireAnyRole } from "../lib/auth";
import { z } from "zod";

export const cohorts = new Hono<{ Bindings: AppEnv }>();

export interface CohortRow {
  id: string;
  program_slug: string;
  label: string;
  kind: string;
  start_date: string;
  end_date: string | null;
  days: string;
  time_slot: string;
  mode: string;
  capacity: number | null;
  notes: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  enrollment_open?: number;
  start_time?: string | null;
  session_minutes?: number | null;
}

function present(row: CohortRow) {
  return {
    id: row.id,
    programSlug: row.program_slug,
    label: row.label,
    kind: row.kind,
    startDate: row.start_date,
    endDate: row.end_date,
    days: row.days,
    timeSlot: row.time_slot,
    mode: row.mode,
    capacity: row.capacity,
    notes: row.notes,
    status: row.status,
    updatedAt: row.updated_at,
    enrollmentOpen: Boolean(row.enrollment_open),
    startTime: row.start_time ?? null,
    sessionMinutes: row.session_minutes ?? null,
  };
}

const TIME_SLOTS: Record<string, { start: string; hours: number }> = {
  morning: { start: "09:00", hours: 2 },
  afternoon: { start: "13:00", hours: 2 },
  evening: { start: "17:00", hours: 2 },
  any: { start: "10:00", hours: 2 },
};

/** WAT is UTC+1 year round, so a Lagos wall-clock time maps to UTC by minus 1h. */
export function icsForCohort(row: CohortRow, origin: string): string {
  const fallback = TIME_SLOTS[row.time_slot] ?? TIME_SLOTS.any!;
  const slot = {
    start: row.start_time ?? fallback.start,
    hours: row.session_minutes ? row.session_minutes / 60 : fallback.hours,
  };
  const [h, m] = slot.start.split(":").map(Number);
  const startUtc = new Date(`${row.start_date}T00:00:00.000Z`);
  startUtc.setUTCHours(h! - 1, m!, 0, 0);
  const endUtc = new Date(startUtc.getTime() + slot.hours * 3_600_000);
  const stamp = (d: Date) =>
    d
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Cyber Elias Academy//Cohorts//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:cea-cohort-${row.id}@cea.ng`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(startUtc)}`,
    `DTEND:${stamp(endUtc)}`,
    `SUMMARY:${row.label} — first class day (Cyber Elias Academy)`,
    `LOCATION:${
      row.mode === "online" ? "Online" : "24 Ebony Road\\, Off Rumuola Road\\, Port Harcourt"
    }`,
    `DESCRIPTION:${row.days} · ${slot.start} WAT · ${row.mode}. Arrive 10 minutes early with your laptop and notebook. Details: ${origin}/apply`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

/** GET /v1/cohorts?program=slug&includePast=1 — public. */
cohorts.get("/", async (c) => {
  const program = (c.req.query("program") ?? "").trim();
  const includePast = c.req.query("includePast") === "1";
  const predicates: string[] = [];
  const args: unknown[] = [];
  if (!includePast) {
    predicates.push("start_date >= ?");
    args.push(new Date().toISOString().slice(0, 10));
    predicates.push("status = 'scheduled'");
  }
  if (program) {
    predicates.push("program_slug = ?");
    args.push(program);
  }
  const where = predicates.length ? `WHERE ${predicates.join(" AND ")}` : "";
  const rows = await c.env.DB.prepare(
    `SELECT * FROM cohorts ${where} ORDER BY start_date ASC LIMIT 50`,
  )
    .bind(...args)
    .all<CohortRow>();
  return c.json({ items: rows.results.map(present) });
});

/** GET /v1/cohorts/next?program=slug — the next intake for the ICS invite. */
cohorts.get("/next", async (c) => {
  const program = (c.req.query("program") ?? "").trim();
  const today = new Date().toISOString().slice(0, 10);
  const row = await c.env.DB.prepare(
    `SELECT * FROM cohorts
      WHERE start_date >= ? AND status = 'scheduled' ${program ? "AND program_slug = ?" : ""}
      ORDER BY start_date ASC LIMIT 1`,
  )
    .bind(...(program ? [today, program] : [today]))
    .first<CohortRow>();
  if (!row) return c.json({ cohort: null });
  return c.json({ cohort: present(row), ics: `/v1/cohorts/${row.id}/ics` });
});

/** GET /v1/cohorts/:id/ics — public calendar file. */
cohorts.get("/:id/ics", async (c) => {
  const row = await c.env.DB.prepare(`SELECT * FROM cohorts WHERE id = ?`)
    .bind(c.req.param("id"))
    .first<CohortRow>();
  if (!row) throw ApiError.notFound("No cohort with that id.");
  const origin = c.env.APP_URL || "https://www.cea.ng";
  return new Response(icsForCohort(row, origin), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="cea-${row.id}.ics"`,
      "Cache-Control": "public, max-age=300",
    },
  });
});

const writeSchema = z.object({
  programSlug: z.string().trim().max(80).default(""),
  label: z.string().trim().min(3).max(120),
  kind: z.enum(["short", "long"]).default("long"),
  startDate: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD."),
  endDate: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD.")
    .optional(),
  days: z.string().trim().max(40).default("standard"),
  timeSlot: z.enum(["morning", "afternoon", "evening", "any"]).default("any"),
  mode: z.enum(["onsite", "online", "hybrid"]).default("onsite"),
  capacity: z.number().int().min(1).max(500).optional(),
  notes: z.string().trim().max(500).optional(),
  status: z.enum(["scheduled", "running", "completed", "cancelled"]).default("scheduled"),
  enrollmentOpen: z.boolean().default(false),
  startTime: z
    .string()
    .regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, "Use HH:mm WAT.")
    .optional(),
  sessionMinutes: z.number().int().min(30).max(480).optional(),
});

async function validateOpenCohort(db: AppEnv["DB"], input: Partial<z.infer<typeof writeSchema>>) {
  for (const date of [input.startDate, input.endDate]) {
    if (
      date &&
      (Number.isNaN(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date)
    )
      throw ApiError.validation({ startDate: ["Use a real calendar date."] });
  }
  if (input.startDate && input.endDate && input.endDate < input.startDate)
    throw ApiError.validation({ endDate: ["End date must follow the first class."] });
  if (!input.enrollmentOpen) return;
  if (
    input.kind !== "short" ||
    !input.programSlug ||
    !input.capacity ||
    !input.startTime ||
    !input.sessionMinutes ||
    !input.endDate ||
    !input.days ||
    ["standard", "rolling"].includes(input.days.toLowerCase()) ||
    input.status !== "scheduled" ||
    !input.startDate ||
    input.startDate <= isoNow().slice(0, 10)
  ) {
    throw ApiError.validation({
      enrollmentOpen: [
        "Before opening: confirm a future short-course timetable, actual start time, session length, end date, capacity and teaching readiness.",
      ],
    });
  }
  const course = await db
    .prepare("SELECT slug FROM courses WHERE slug = ?")
    .bind(input.programSlug)
    .first();
  if (!course)
    throw ApiError.validation({
      programSlug: ["Install the matching academy curriculum before opening this intake."],
    });
}

cohorts.post("/", requireAuth, requireAnyRole(["admin", "admissions"]), async (c) => {
  const input = await parseBody(c, writeSchema);
  await validateOpenCohort(c.env.DB, input);
  const now = isoNow();
  const id = crypto.randomUUID();
  await c.env.DB.prepare(
    `INSERT INTO cohorts (id, program_slug, label, kind, start_date, end_date, days, time_slot, mode, capacity, notes, status, created_at, updated_at, enrollment_open, start_time, session_minutes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      id,
      input.programSlug,
      input.label,
      input.kind,
      input.startDate,
      input.endDate ?? null,
      input.days,
      input.timeSlot,
      input.mode,
      input.capacity ?? null,
      input.notes ?? null,
      input.status,
      now,
      now,
      Number(input.enrollmentOpen),
      input.startTime ?? null,
      input.sessionMinutes ?? null,
    )
    .run();
  const row = await c.env.DB.prepare(`SELECT * FROM cohorts WHERE id = ?`)
    .bind(id)
    .first<CohortRow>();
  return c.json({ cohort: present(row!) }, 201);
});

cohorts.patch("/:id", requireAuth, requireAnyRole(["admin", "admissions"]), async (c) => {
  const id = c.req.param("id");
  const input = await parseBody(c, writeSchema.partial());
  const existing = await c.env.DB.prepare("SELECT * FROM cohorts WHERE id = ?")
    .bind(id)
    .first<CohortRow>();
  if (!existing) throw ApiError.notFound("No cohort with that id.");
  const occupied = await c.env.DB.prepare(
    `SELECT COUNT(*) AS n FROM registrations WHERE cohort_id = ? AND
    (paid_amount > 0 OR offer_status IN ('held','confirmed'))`,
  )
    .bind(id)
    .first<{ n: number }>();
  if (occupied?.n && Object.keys(input).some((k) => !["enrollmentOpen", "notes"].includes(k))) {
    throw new ApiError(
      409,
      "ACCEPTED_PLACEMENTS_EXIST",
      "This cohort has offers or payments. Close new enrolment, then agree and record any schedule/capacity change with affected learners before editing it.",
    );
  }
  const merged = { ...present(existing), ...input };
  if (input.enrollmentOpen === true)
    await validateOpenCohort(c.env.DB, merged as z.infer<typeof writeSchema>);

  const map: Record<string, string> = {
    programSlug: "program_slug",
    label: "label",
    kind: "kind",
    startDate: "start_date",
    endDate: "end_date",
    days: "days",
    timeSlot: "time_slot",
    mode: "mode",
    capacity: "capacity",
    notes: "notes",
    status: "status",
    enrollmentOpen: "enrollment_open",
    startTime: "start_time",
    sessionMinutes: "session_minutes",
  };
  const sets: string[] = [];
  const args: unknown[] = [];
  for (const [key, column] of Object.entries(map)) {
    const value = (input as Record<string, unknown>)[key];
    if (value === undefined) continue;
    sets.push(`${column} = ?`);
    args.push(typeof value === "boolean" ? Number(value) : value);
  }
  if (sets.length === 0) throw ApiError.validation({ _: ["Nothing to update."] });
  sets.push("updated_at = ?");
  args.push(isoNow(), id);
  const changesAgreement = Object.keys(input).some(
    (key) => !["enrollmentOpen", "notes"].includes(key),
  );
  const result = await c.env.DB.prepare(
    `UPDATE cohorts SET ${sets.join(", ")} WHERE id = ?${changesAgreement ? " AND NOT EXISTS (SELECT 1 FROM registrations r WHERE r.cohort_id = cohorts.id AND (r.paid_amount > 0 OR r.offer_status IN ('held','confirmed')))" : ""}`,
  )
    .bind(...args)
    .run();
  if (!result.meta.changes)
    throw new ApiError(
      409,
      "COHORT_CHANGED",
      "The cohort changed or has placements. Reload and review it before editing.",
    );
  const row = await c.env.DB.prepare(`SELECT * FROM cohorts WHERE id = ?`)
    .bind(id)
    .first<CohortRow>();
  return c.json({ cohort: present(row!) });
});

cohorts.delete("/:id", requireAuth, requireAdmin, async (c) => {
  const linked = await c.env.DB.prepare("SELECT 1 AS x FROM registrations WHERE cohort_id = ?")
    .bind(c.req.param("id"))
    .first();
  if (linked)
    throw new ApiError(
      409,
      "COHORT_IN_USE",
      "Keep the cohort's history. Close new enrolment instead of deleting a placed cohort.",
    );
  const result = await c.env.DB.prepare(
    `DELETE FROM cohorts WHERE id = ? AND NOT EXISTS (SELECT 1 FROM registrations WHERE cohort_id = cohorts.id)`,
  )
    .bind(c.req.param("id"))
    .run();
  if (!result.meta.changes) throw ApiError.notFound("No cohort with that id.");
  return c.json({ ok: true });
});
