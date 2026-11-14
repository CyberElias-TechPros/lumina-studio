import { Hono } from "hono";
import { z } from "zod";
import { isoNow, randomToken } from "../lib/crypto";
import { parseBody } from "../lib/validate";
import type { AppEnv } from "../types";
import { ApiError } from "../lib/errors";
import { requireAuth, requireAnyRole } from "../lib/auth";

/**
 * Certificates. Public verify-by-code (like a paper credential check),
 * `GET /mine` for the owner. Admins attest eligibility and can revoke records.
 */

export const certificates = new Hono<{ Bindings: AppEnv }>();

certificates.get("/verify", async (c) => {
  const code = (c.req.query("code") ?? "").trim().toUpperCase();
  if (code.length < 8 || code.length > 128)
    throw ApiError.validation({ code: ["Enter a valid certificate code."] });
  const row = await c.env.DB.prepare(
    `SELECT c.code, c.title, c.issued_at, r.revoked_at, i.certificate_id AS reviewed_id
       FROM certificates c LEFT JOIN certificate_revocations r ON r.certificate_id = c.id
       LEFT JOIN certificate_issuances i ON i.certificate_id = c.id
       WHERE c.code = ?`,
  )
    .bind(code)
    .first<{
      code: string;
      title: string;
      issued_at: string;
      revoked_at: string | null;
      reviewed_id: string | null;
    }>();
  if (!row) {
    return c.json({ valid: false, message: "No certificate matches this code." });
  }
  if (row.revoked_at)
    return c.json({
      valid: false,
      status: "revoked",
      message: "This certificate record has been revoked.",
    });
  return c.json({
    valid: true,
    status: row.reviewed_id ? "issued" : "legacy",
    certificate: { code: row.code, title: row.title, issuedAt: row.issued_at },
  });
});

certificates.get("/mine", requireAuth, async (c) => {
  const user = c.get("authUser");
  const rows = await c.env.DB.prepare(
    `SELECT c.id, c.course_slug, c.title, c.code, c.issued_at,
       CASE WHEN r.certificate_id IS NOT NULL THEN 'revoked'
            WHEN i.certificate_id IS NULL THEN 'legacy' ELSE 'issued' END AS status
       FROM certificates c LEFT JOIN certificate_revocations r ON r.certificate_id = c.id
       LEFT JOIN certificate_issuances i ON i.certificate_id = c.id
       WHERE c.user_id = ? ORDER BY c.issued_at DESC, c.id DESC LIMIT 101`,
  )
    .bind(user.id)
    .all<{
      id: string;
      course_slug: string;
      title: string;
      code: string;
      issued_at: string;
      status: string;
    }>();
  return c.json({
    items: rows.results.slice(0, 100).map((r) => ({
      id: r.id,
      courseSlug: r.course_slug,
      title: r.title,
      code: r.code,
      issuedAt: r.issued_at,
      status: r.status,
    })),
    total: Math.min(rows.results.length, 100),
    truncated: rows.results.length > 100,
  });
});

const requireIssuer = requireAnyRole(["instructor", "admin"]);

/** Admin-only directory; instructor ownership is not established. */
certificates.get("/candidates", requireAuth, requireIssuer, async (c) => {
  if (c.get("authUser").roleKey !== "admin") {
    throw new ApiError(
      503,
      "CANDIDATES_UNAVAILABLE",
      "Recipient lists are unavailable until instructor access is scoped.",
    );
  }
  const rows = await c.env.DB.prepare(
    `SELECT id, name, email, role_key FROM users WHERE status = 'active'
       ORDER BY name ASC LIMIT 200`,
  ).all<{ id: string; name: string; email: string; role_key: string }>();
  return c.json({
    items: rows.results.map((r) => ({
      id: r.id,
      name: r.name,
      email: r.email,
      roleKey: r.role_key,
    })),
    total: rows.results.length,
  });
});

// Admin-only, explicit attestation. Enrollment is a prerequisite, not proof of
// completion. Never accept a caller-provided certificate title.
const issueSchema = z.object({
  userId: z.string().trim().min(1).max(200),
  courseSlug: z.string().trim().min(1).max(200),
  evidenceRef: z.string().trim().min(3).max(240),
  confirmed: z.literal(true),
});
const requireCertificateAdmin = requireAnyRole(["admin"]);
certificates.post("/", requireAuth, requireCertificateAdmin, async (c) => {
  const input = await parseBody(c, issueSchema);
  const actor = c.get("authUser").id;
  const id = `cert-${crypto.randomUUID()}`;
  const now = isoNow();
  const code = `CEA-${randomToken(16).toUpperCase()}`;
  const eventId = crypto.randomUUID();
  const results = await c.env.DB.batch([
    c.env.DB.prepare(
      `INSERT INTO certificates (id,user_id,course_slug,title,code,issued_at)
      SELECT ?,u.id,co.slug,co.title,?,? FROM users u
      JOIN enrollments e ON e.user_id = u.id JOIN courses co ON co.slug = e.course_slug
      WHERE u.id = ? AND u.status = 'active' AND u.role_key = 'student' AND co.slug = ?
        AND NOT EXISTS (SELECT 1 FROM certificates existing
          LEFT JOIN certificate_revocations revoked ON revoked.certificate_id = existing.id
          WHERE existing.user_id = u.id AND existing.course_slug = co.slug AND revoked.certificate_id IS NULL)`,
    ).bind(id, code, now, input.userId, input.courseSlug),
    c.env.DB.prepare(
      `INSERT INTO certificate_issuances (certificate_id,issued_by,evidence_ref,issued_at)
      SELECT id,?,?,? FROM certificates WHERE id = ?`,
    ).bind(actor, input.evidenceRef, now, id),
    c.env.DB.prepare(
      `INSERT INTO certificate_events (id,certificate_id,user_id,course_slug,action,actor_id,occurred_at)
      SELECT ?,id,user_id,course_slug,'issued',?,? FROM certificates WHERE id = ?`,
    ).bind(eventId, actor, now, id),
  ]);
  if (!results[0]?.meta.changes)
    throw ApiError.conflict(
      "The learner is not eligible for this course or an unrevoked record already exists. Review the records before retrying.",
    );
  const record = await c.env.DB.prepare("SELECT title FROM certificates WHERE id = ?")
    .bind(id)
    .first<{ title: string }>();
  return c.json(
    {
      id,
      courseSlug: input.courseSlug,
      title: record!.title,
      code,
      issuedAt: now,
      status: "issued",
    },
    201,
  );
});

certificates.get("/admin/records", requireAuth, requireCertificateAdmin, async (c) => {
  const query = z
    .object({ userId: z.string().min(1).max(200), courseSlug: z.string().min(1).max(200) })
    .safeParse(c.req.query());
  if (!query.success) throw ApiError.validation({});
  const rows = await c.env.DB.prepare(
    `SELECT c.id,c.title,c.code,c.issued_at, i.issued_by, i.evidence_ref,
      r.revoked_by, r.revoked_at, r.reason,
      CASE WHEN r.certificate_id IS NOT NULL THEN 'revoked'
           WHEN i.certificate_id IS NULL THEN 'legacy' ELSE 'issued' END AS status
      FROM certificates c LEFT JOIN certificate_revocations r ON r.certificate_id = c.id
      LEFT JOIN certificate_issuances i ON i.certificate_id = c.id
      WHERE c.user_id = ? AND c.course_slug = ? ORDER BY c.issued_at DESC,c.id DESC LIMIT 101`,
  )
    .bind(query.data.userId, query.data.courseSlug)
    .all<{
      id: string;
      title: string;
      code: string;
      issued_at: string;
      status: string;
      issued_by: string | null;
      evidence_ref: string | null;
      revoked_by: string | null;
      revoked_at: string | null;
      reason: string | null;
    }>();
  return c.json({
    items: rows.results.slice(0, 100).map((row) => ({
      id: row.id,
      title: row.title,
      code: row.code,
      issuedAt: row.issued_at,
      status: row.status,
      issuedBy: row.issued_by,
      evidenceRef: row.evidence_ref,
      revokedBy: row.revoked_by,
      revokedAt: row.revoked_at,
      reason: row.reason,
    })),
    truncated: rows.results.length > 100,
  });
});

certificates.post("/:id/revoke", requireAuth, requireCertificateAdmin, async (c) => {
  const input = await parseBody(
    c,
    z.object({ reason: z.string().trim().min(3).max(240), confirmed: z.literal(true) }),
  );
  const id = c.req.param("id");
  const actor = c.get("authUser").id;
  const now = isoNow();
  const operationId = crypto.randomUUID();
  const result = await c.env.DB.batch([
    c.env.DB.prepare(
      `INSERT INTO certificate_revocations (certificate_id,revoked_by,reason,revoked_at,operation_id)
      SELECT id,?,?,?,? FROM certificates WHERE id = ? AND NOT EXISTS
        (SELECT 1 FROM certificate_revocations WHERE certificate_id = ?)`,
    ).bind(actor, input.reason, now, operationId, id, id),
    c.env.DB.prepare(
      `INSERT INTO certificate_events (id,certificate_id,user_id,course_slug,action,actor_id,occurred_at)
      SELECT ?,c.id,c.user_id,c.course_slug,'revoked',?,? FROM certificates c
      JOIN certificate_revocations r ON r.certificate_id=c.id WHERE r.operation_id = ?`,
    ).bind(operationId, actor, now, operationId),
  ]);
  if (!result[0]?.meta.changes)
    throw ApiError.conflict("Certificate not found or already revoked.");
  return c.json({ ok: true });
});
