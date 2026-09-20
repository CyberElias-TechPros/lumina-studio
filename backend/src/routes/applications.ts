import { Hono } from "hono";
import type { AppEnv } from "../types";
import { z } from "zod";
import { ApiError } from "../lib/errors";
import { parseBody } from "../lib/validate";
import { requireAuth, requireAdmin } from "../lib/auth";
import { base64UrlDecode, base64UrlEncode, isoNow, randomToken } from "../lib/crypto";
import { normalizeEmail } from "../db/client";
import { paginate, parsePagination } from "../lib/pagination";
import { hashIdentifier, rateLimit } from "../lib/rate-limit";

export const PIPELINE_STAGES = [
  { key: "submitted", label: "Application received" },
  { key: "screening", label: "Screening" },
  { key: "assessment", label: "Assessment" },
  { key: "interview", label: "Interview" },
  { key: "offer", label: "Offer" },
  { key: "enrolled", label: "Enrolled" },
] as const;

const STATUS_ORDER = PIPELINE_STAGES.map((s) => s.key);

/** Flyer short-course slugs (src/data/academy/catalog.ts). Not all are rows in `programs`. */
const SHORT_COURSE_SLUGS = new Set([
  "microsoft-office",
  "computer-basics-typing",
  "graphic-design",
  "web-design",
  "digital-marketing",
  "social-media-management",
  "data-entry",
  "computer-repairs",
  "web-development",
  "cybersecurity",
  "business-freelancing",
  "content-creation",
  "online-teaching",
]);

const createApplicationSchema = z.object({
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters.").max(120),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().min(6, "Enter a valid phone number.").max(30).optional(),
  city: z.string().trim().min(1).max(80).optional(),
  programSlug: z.string().trim().min(1, "Choose a program."),
  experience: z.string().trim().max(2000).optional(),
});

function newRef(): string {
  const year = new Date().getFullYear();
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  const suffix = Array.from(bytes, (byte) => chars[byte % chars.length]).join("");
  return `CEA-${year}-${suffix}`;
}

export const applications = new Hono<{ Bindings: AppEnv }>();

applications.post("/", async (c) => {
  const input = await parseBody(c, createApplicationSchema);
  const ip = c.req.header("CF-Connecting-IP") ?? c.req.header("x-forwarded-for") ?? "unknown";
  await rateLimit(c.env.RATE_LIMIT, "applications", await hashIdentifier(ip), {
    limit: 10,
    windowSeconds: 3600,
  });
  const email = normalizeEmail(input.email);

  const program = await c.env.DB.prepare(`SELECT title FROM programs WHERE slug = ?`)
    .bind(input.programSlug)
    .first<{ title: string }>();
  if (!program && !SHORT_COURSE_SLUGS.has(input.programSlug)) {
    throw new ApiError(400, "PROGRAM_NOT_FOUND", "That program does not exist.", {
      programSlug: ["Choose a program from the list."],
    });
  }

  const id = crypto.randomUUID();
  const now = isoNow();
  const ref = newRef();
  await c.env.DB.prepare(
    `INSERT INTO applications
       (id, ref, full_name, email, phone, city, program_slug, experience, status, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'submitted', ?, ?)`,
  )
    .bind(
      id,
      ref,
      input.fullName.trim(),
      email,
      input.phone?.trim() ?? null,
      input.city?.trim() ?? null,
      input.programSlug,
      input.experience?.trim() ?? null,
      now,
      now,
    )
    .run();

  return c.json({ application: { id, ref, status: "submitted" } }, 201);
});

/** Admin: all applications in the full pipeline — optional `?stage=` filter. */
applications.get("/admin", requireAuth, requireAdmin, async (c) => {
  const { cursor, limit } = parsePagination(c);
  const stage = c.req.query("stage");
  const stageValid = stage && STATUS_ORDER.includes(stage as (typeof STATUS_ORDER)[number]);
  const predicates: string[] = [];
  const args: string[] = [];
  if (stageValid) {
    predicates.push("a.status = ?");
    args.push(stage);
  }
  if (cursor) {
    predicates.push("a.id > ?");
    args.push(base64UrlDecode(cursor) ?? "");
  }
  const where = predicates.length > 0 ? `WHERE ${predicates.join(" AND ")}` : "";
  const base = `FROM applications a LEFT JOIN programs p ON p.slug = a.program_slug ${where}`;

  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n ${base}`)
    .bind(...args)
    .first<{ n: number }>();
  const rows = await c.env.DB.prepare(
    `SELECT a.id, a.ref, a.full_name, a.email, a.phone, a.city, a.program_slug, a.experience,
            a.status, a.note, a.created_at, a.updated_at, p.title AS program_title
       ${base}
      ORDER BY a.id ASC LIMIT ?`,
  )
    .bind(...args, limit)
    .all<{
      id: string;
      ref: string;
      full_name: string;
      email: string;
      phone: string | null;
      city: string | null;
      program_slug: string | null;
      experience: string | null;
      status: string;
      note: string;
      created_at: string;
      updated_at: string;
      program_title: string | null;
    }>();
  const items = rows.results.map((r) => ({
    id: r.id,
    ref: r.ref,
    fullName: r.full_name,
    email: r.email,
    programSlug: r.program_slug,
    programTitle: r.program_title,
    phone: r.phone,
    city: r.city,
    experience: r.experience,
    status: r.status,
    note: r.note,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  }));
  return c.json(paginate(items, total?.n ?? 0, (last) => last.id));
});

/** Admin: pipeline funnel counts by stage for the admissions hub. */
applications.get("/admin/stats", requireAuth, requireAdmin, async (c) => {
  const rowsSequence = await c.env.DB.prepare(
    `SELECT status, COUNT(*) AS n FROM applications GROUP BY status`,
  ).all<{ status: string; n: number }>();
  const counts = new Map(rowsSequence.results.map((r) => [r.status, r.n]));
  const stages = PIPELINE_STAGES.map((s, i) => ({
    key: s.key,
    label: s.label,
    value: counts.get(s.key) ?? 0,
  }));
  const total = stages.reduce((sum, s) => sum + s.value, 0);
  const activeStages = ["screening", "assessment", "interview"].reduce(
    (sum, s) => sum + (counts.get(s) ?? 0),
    0,
  );
  return c.json({ total, activeStages, stages });
});

applications.get("/:ref", async (c) => {
  const ref = c.req.param("ref").toUpperCase();
  const row = await c.env.DB.prepare(
    `SELECT a.ref, a.status, a.created_at, a.updated_at, p.title AS program_title
       FROM applications a
       LEFT JOIN programs p ON p.slug = a.program_slug
      WHERE a.ref = ?`,
  )
    .bind(ref)
    .first<{
      ref: string;
      status: string;
      created_at: string;
      updated_at: string;
      program_title: string | null;
    }>();

  if (!row) throw ApiError.notFound("No application found with that reference.");

  const stageIndex = STATUS_ORDER.indexOf(row.status as (typeof STATUS_ORDER)[number]);
  const stages = PIPELINE_STAGES.map((stage, i) => ({
    key: stage.key,
    label: stage.label,
    done: i < stageIndex,
    active: i === stageIndex,
  }));

  return c.json({
    ref: row.ref,
    status: row.status,
    programTitle: row.program_title,
    stages,
    updatedAt: row.updated_at,
  });
});

applications.get("/", requireAuth, async (c) => {
  const user = c.get("authUser");
  const { cursor, limit } = parsePagination(c);

  const base = `FROM applications WHERE (user_id = ? OR (user_id IS NULL AND email = ?))${
    cursor ? " AND id > ?" : ""
  }`;
  const cursorId = cursor ? (base64UrlDecode(cursor) ?? "") : undefined;
  const total = await c.env.DB.prepare(
    `SELECT COUNT(*) AS n FROM applications WHERE user_id = ? OR (user_id IS NULL AND email = ?)`,
  )
    .bind(user.id, user.email)
    .first<{ n: number }>();

  const rows = await c.env.DB.prepare(
    `SELECT id, ref, program_slug, status, created_at, updated_at
       ${base}
      ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursorId ? [user.id, user.email, cursorId, limit] : [user.id, user.email, limit]))
    .all<{
      id: string;
      ref: string;
      program_slug: string | null;
      status: string;
      created_at: string;
      updated_at: string;
    }>();

  return c.json(
    paginate(
      rows.results.map((r) => ({
        id: r.id,
        ref: r.ref,
        programSlug: r.program_slug,
        status: r.status,
        createdAt: r.created_at,
        updatedAt: r.updated_at,
      })),
      total?.n ?? 0,
      (last) => last.id,
    ),
  );
});

const advanceSchema = z.object({
  status: z.enum(STATUS_ORDER, { message: "Invalid pipeline stage." }),
  note: z.string().trim().max(500).optional(),
});

/** Admin: advance an application along the pipeline and log it. */
applications.patch("/:ref", requireAuth, requireAdmin, async (c) => {
  const admin = c.get("authUser");
  const ref = c.req.param("ref").toUpperCase();
  const { status, note } = await parseBody(c, advanceSchema);
  const now = isoNow();

  const row = await c.env.DB.prepare(`SELECT id, status FROM applications WHERE ref = ?`)
    .bind(ref)
    .first<{ id: string; status: string }>();
  if (!row) throw ApiError.notFound("Application not found.");
  const currentIdx = STATUS_ORDER.indexOf(row.status as (typeof STATUS_ORDER)[number]);
  const nextIdx = STATUS_ORDER.indexOf(status);
  if (nextIdx < currentIdx) {
    throw ApiError.validation({ status: ["Cannot move an application backwards."] });
  }

  await c.env.DB.prepare(
    `UPDATE applications SET status = ?, note = ?, updated_at = ? WHERE id = ?`,
  )
    .bind(status, note ?? "", now, row.id)
    .run();
  await c.env.DB.prepare(
    `INSERT INTO audit_log (id, actor, action, time, severity, sort_order) VALUES (?, ?, ?, ?, 'info', 0)`,
  )
    .bind(crypto.randomUUID(), admin.email, `Application ${ref} advanced to ${status}`, now)
    .run();
  return c.json({ ok: true, ref, status, note: note ?? "", updatedAt: now });
});
