import { Hono } from "hono";
import type { AppEnv } from "../types";
import { z } from "zod";
import { ApiError } from "../lib/errors";
import { parseBody } from "../lib/validate";
import { requireAuth } from "../lib/auth";
import { isoNow, randomToken } from "../lib/crypto";
import { normalizeEmail } from "../db/client";
import { paginate, parsePagination } from "../lib/pagination";

export const PIPELINE_STAGES = [
  { key: "submitted", label: "Application received" },
  { key: "screening", label: "Screening" },
  { key: "assessment", label: "Assessment" },
  { key: "interview", label: "Interview" },
  { key: "offer", label: "Offer" },
  { key: "enrolled", label: "Enrolled" },
] as const;

const STATUS_ORDER = PIPELINE_STAGES.map((s) => s.key);

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
  let suffix = "";
  for (let i = 0; i < 6; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `CEA-${year}-${suffix}`;
}

export const applications = new Hono<{ Bindings: AppEnv }>();

applications.post("/", async (c) => {
  const input = await parseBody(c, createApplicationSchema);
  const email = normalizeEmail(input.email);

  const program = await c.env.DB.prepare(`SELECT title FROM programs WHERE slug = ?`)
    .bind(input.programSlug)
    .first<{ title: string }>();
  if (!program) {
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

  const base = `FROM applications WHERE user_id = ? OR (user_id IS NULL AND email = ?)`;
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n ${base}`)
    .bind(user.id, user.email)
    .first<{ n: number }>();

  const rows = await c.env.DB.prepare(
    `SELECT id, ref, program_slug, status, created_at, updated_at
       ${base}
      ORDER BY created_at DESC, id DESC LIMIT ?`,
  )
    .bind(user.id, user.email, limit)
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
