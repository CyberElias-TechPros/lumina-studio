import { Hono } from "hono";
import type { AppEnv } from "../types";
import { z } from "zod";
import { ApiError } from "../lib/errors";
import { parseBody } from "../lib/validate";
import { requireAuth, requireAnyRole } from "../lib/auth";
import { isoNow, randomToken } from "../lib/crypto";

/**
 * Certificates. Public verify-by-code (like a paper credential check),
 * `GET /mine` for the owner, and instructor/admin issuance.
 */

const issueSchema = z.object({
  userId: z.string().min(1, "User is required."),
  courseSlug: z.string().trim().min(1, "Course is required."),
  title: z.string().trim().min(1, "Title is required.").max(200),
});

export const certificates = new Hono<{ Bindings: AppEnv }>();

certificates.get("/verify", async (c) => {
  const code = (c.req.query("code") ?? "").trim().toUpperCase();
  if (code.length < 8) throw ApiError.validation({ code: ["Enter a valid certificate code."] });
  const row = await c.env.DB.prepare(
    `SELECT code, title, issued_at FROM certificates WHERE code = ?`,
  )
    .bind(code)
    .first<{ code: string; title: string; issued_at: string }>();
  if (!row) {
    return c.json({ valid: false, message: "No certificate matches this code." });
  }
  return c.json({
    valid: true,
    certificate: { code: row.code, title: row.title, issuedAt: row.issued_at },
  });
});

certificates.get("/mine", requireAuth, async (c) => {
  const user = c.get("authUser");
  const rows = await c.env.DB.prepare(
    `SELECT id, course_slug, title, code, issued_at
       FROM certificates WHERE user_id = ? ORDER BY issued_at DESC LIMIT 100`,
  )
    .bind(user.id)
    .all<{ id: string; course_slug: string; title: string; code: string; issued_at: string }>();
  return c.json({
    items: rows.results.map((r) => ({
      id: r.id,
      courseSlug: r.course_slug,
      title: r.title,
      code: r.code,
      issuedAt: r.issued_at,
    })),
    total: rows.results.length,
  });
});

const requireIssuer = requireAnyRole(["instructor", "admin"]);

certificates.post("/", requireAuth, requireIssuer, async (c) => {
  const body = await parseBody(c, issueSchema);
  const user = await c.env.DB.prepare(`SELECT id, name FROM users WHERE id = ? AND status = 'active'`)
    .bind(body.userId)
    .first<{ id: string; name: string }>();
  if (!user) throw ApiError.notFound("User not found.");

  const existing = await c.env.DB.prepare(
    `SELECT id FROM certificates WHERE user_id = ? AND course_slug = ?`,
  )
    .bind(body.userId, body.courseSlug)
    .first<{ id: string }>();
  if (existing) throw ApiError.conflict("This user already has a certificate for that course.");

  const id = crypto.randomUUID();
  const code = `CEA-${randomToken(4).toUpperCase()}-${randomToken(4).toUpperCase()}`;
  await c.env.DB.prepare(
    `INSERT INTO certificates (id, user_id, course_slug, title, code, issued_at, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, 0)`,
  )
    .bind(id, body.userId, body.courseSlug, body.title, code, isoNow())
    .run();
  return c.json({ id, code, courseSlug: body.courseSlug, title: body.title, issuedAt: isoNow() }, 201);
});
