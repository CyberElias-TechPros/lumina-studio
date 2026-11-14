import { Hono } from "hono";
import { z } from "zod";
import type { AppEnv } from "../types";
import { ApiError } from "../lib/errors";
import { requireAuth, requireAnyRole } from "../lib/auth";
import { isoNow } from "../lib/crypto";
import { parseBody } from "../lib/validate";

export const mentor = new Hono<{ Bindings: AppEnv }>();
mentor.use("*", requireAuth, requireAnyRole(["student", "alumni", "mentor", "admin"]));
const admin = requireAnyRole(["admin"]);
const potentialMentor = requireAnyRole(["mentor", "alumni"]);
const learner = requireAnyRole(["student", "alumni"]);
const consentVersion = "mentoring-directory-v1";

// Each admin grant is an explicit assertion of adult age verification, not a
// DOB or identity document. It expires and may be revoked independently.
mentor.get("/admin/eligibility", admin, async (c) => {
  const userId = (c.req.query("userId") ?? "").trim();
  if (!userId || userId.length > 200) throw ApiError.validation({ userId: ["Choose an account."] });
  const row = await c.env.DB.prepare(
    `SELECT active,expires_at,review_ref,changed_at,changed_by FROM mentoring_eligibility WHERE user_id=?`,
  )
    .bind(userId)
    .first<{
      active: number;
      expires_at: string;
      review_ref: string;
      changed_at: string;
      changed_by: string;
    }>();
  return c.json({
    eligibility: row
      ? {
          active: row.active === 1 && row.expires_at > isoNow(),
          expiresAt: row.expires_at,
          reviewRef: row.review_ref,
          changedAt: row.changed_at,
          changedBy: row.changed_by,
        }
      : null,
  });
});
mentor.put("/admin/eligibility", admin, async (c) => {
  const input = await parseBody(
    c,
    z.object({
      userId: z.string().trim().min(1).max(200),
      active: z.boolean(),
      expiresAt: z.string().optional(),
      reviewRef: z.string().trim().max(240).optional(),
      adultVerified: z.boolean().optional(),
    }),
  );
  const now = isoNow(),
    actor = c.get("authUser").id,
    op = crypto.randomUUID();
  const date = input.expiresAt ? new Date(input.expiresAt) : null;
  if (
    input.active &&
    (!input.adultVerified ||
      !input.reviewRef ||
      input.reviewRef.length < 3 ||
      !date ||
      Number.isNaN(date.getTime()) ||
      date.getTime() <= Date.now() ||
      date.getTime() > Date.now() + 366 * 86400000)
  ) {
    throw ApiError.validation({
      eligibility: ["Confirm adult verification, review reference and an expiry within one year."],
    });
  }
  const expiry = input.active ? date!.toISOString() : "",
    reference = input.active ? input.reviewRef! : "";
  const results = await c.env.DB.batch([
    c.env.DB.prepare(
      `INSERT INTO mentoring_eligibility (user_id,active,expires_at,review_ref,changed_by,changed_at,operation_id)
      SELECT ?,?,?,?,?,?,? WHERE (?=0 AND EXISTS(SELECT 1 FROM mentoring_eligibility WHERE user_id=?))
        OR (?=1 AND EXISTS(SELECT 1 FROM users WHERE id=? AND status='active' AND role_key IN ('student','alumni','mentor')))
      ON CONFLICT(user_id) DO UPDATE SET active=excluded.active,expires_at=excluded.expires_at,review_ref=excluded.review_ref,changed_by=excluded.changed_by,changed_at=excluded.changed_at,operation_id=excluded.operation_id`,
    ).bind(
      input.userId,
      input.active ? 1 : 0,
      expiry,
      reference,
      actor,
      now,
      op,
      input.active ? 1 : 0,
      input.userId,
      input.active ? 1 : 0,
      input.userId,
    ),
    c.env.DB.prepare(
      `INSERT INTO mentoring_eligibility_events (id,user_id,active,expires_at,review_ref,actor_id,occurred_at)
      SELECT operation_id,user_id,active,expires_at,review_ref,changed_by,changed_at FROM mentoring_eligibility WHERE operation_id=?`,
    ).bind(op),
    // A renewed or revoked eligibility requires a fresh mentor profile review.
    c.env.DB.prepare(
      `UPDATE mentoring_profiles SET approved_by=NULL,approved_at=NULL,review_ref=NULL,approval_operation_id=?
      WHERE user_id=? AND approved_at IS NOT NULL AND EXISTS(SELECT 1 FROM mentoring_eligibility WHERE operation_id=?)`,
    ).bind(op, input.userId, op),
    c.env.DB.prepare(
      `INSERT INTO mentoring_profile_events (id,profile_id,actor_id,action,revision,consent_version,occurred_at)
      SELECT ?,id,?,'approval_reset',revision,consent_version,? FROM mentoring_profiles WHERE user_id=? AND approval_operation_id=? AND approved_at IS NULL`,
    ).bind(crypto.randomUUID(), actor, now, input.userId, op),
  ]);
  if (!results[0]?.meta.changes)
    throw ApiError.conflict("Account or eligibility record is not eligible for this change.");
  return c.json({ ok: true });
});

mentor.get("/profile", potentialMentor, async (c) => {
  const row = await c.env.DB.prepare(
    `SELECT id,display_name,focus,bio,visible,revision,approved_at,updated_at FROM mentoring_profiles WHERE user_id=?`,
  )
    .bind(c.get("authUser").id)
    .first<{
      id: string;
      display_name: string;
      focus: string;
      bio: string;
      visible: number;
      revision: string;
      approved_at: string | null;
      updated_at: string;
    }>();
  return c.json({
    profile: row
      ? {
          id: row.id,
          displayName: row.display_name,
          focus: row.focus,
          bio: row.bio,
          visible: row.visible === 1,
          approved: !!row.approved_at,
          updatedAt: row.updated_at,
        }
      : null,
  });
});
mentor.put("/profile", potentialMentor, async (c) => {
  const input = await parseBody(
    c,
    z.object({
      displayName: z.string().trim().min(2).max(100),
      focus: z.string().trim().min(2).max(120),
      bio: z.string().trim().min(10).max(1000),
      consent: z.literal(true),
    }),
  );
  const userId = c.get("authUser").id,
    now = isoNow(),
    revision = crypto.randomUUID(),
    event = crypto.randomUUID();
  const results = await c.env.DB.batch([
    c.env.DB.prepare(
      `INSERT INTO mentoring_profiles (id,user_id,display_name,focus,bio,visible,consent_version,consent_at,revision,approved_by,approved_at,approval_operation_id,review_ref,updated_at)
      VALUES (?,?,?,?,?,1,?,?,?,NULL,NULL,NULL,NULL,?) ON CONFLICT(user_id) DO UPDATE SET display_name=excluded.display_name,focus=excluded.focus,bio=excluded.bio,visible=1,consent_version=excluded.consent_version,consent_at=excluded.consent_at,revision=excluded.revision,approved_by=NULL,approved_at=NULL,approval_operation_id=NULL,review_ref=NULL,updated_at=excluded.updated_at`,
    ).bind(
      `mp-${crypto.randomUUID()}`,
      userId,
      input.displayName,
      input.focus,
      input.bio,
      consentVersion,
      now,
      revision,
      now,
    ),
    c.env.DB.prepare(
      `INSERT INTO mentoring_profile_events (id,profile_id,actor_id,action,revision,consent_version,occurred_at)
      SELECT ?,id,user_id,'submitted',revision,consent_version,? FROM mentoring_profiles WHERE user_id=? AND revision=?`,
    ).bind(event, now, userId, revision),
  ]);
  if (!results[0]?.meta.changes) throw ApiError.conflict("Profile could not be saved.");
  return c.json({ ok: true, requiresReview: true });
});
mentor.delete("/profile", potentialMentor, async (c) => {
  const userId = c.get("authUser").id,
    now = isoNow(),
    revision = crypto.randomUUID(),
    event = crypto.randomUUID();
  const results = await c.env.DB.batch([
    c.env.DB.prepare(
      `UPDATE mentoring_profiles SET visible=0,approved_by=NULL,approved_at=NULL,approval_operation_id=NULL,review_ref=NULL,revision=?,updated_at=? WHERE user_id=? AND visible=1`,
    ).bind(revision, now, userId),
    c.env.DB.prepare(
      `INSERT INTO mentoring_profile_events (id,profile_id,actor_id,action,revision,consent_version,occurred_at)
      SELECT ?,id,user_id,'withdrawn',revision,consent_version,? FROM mentoring_profiles WHERE user_id=? AND revision=?`,
    ).bind(event, now, userId, revision),
  ]);
  if (!results[0]?.meta.changes) throw ApiError.conflict("No visible profile to withdraw.");
  return c.json({ ok: true });
});
mentor.get("/admin/profile", admin, async (c) => {
  const userId = (c.req.query("userId") ?? "").trim();
  if (!userId || userId.length > 200) throw ApiError.validation({ userId: ["Choose an account."] });
  const row = await c.env.DB.prepare(
    `SELECT id,display_name,focus,bio,visible,revision,approved_at,approved_by,review_ref,consent_version,consent_at FROM mentoring_profiles WHERE user_id=?`,
  )
    .bind(userId)
    .first<{
      id: string;
      display_name: string;
      focus: string;
      bio: string;
      visible: number;
      revision: string;
      approved_at: string | null;
      approved_by: string | null;
      review_ref: string | null;
      consent_version: string;
      consent_at: string;
    }>();
  return c.json({
    profile: row
      ? {
          id: row.id,
          displayName: row.display_name,
          focus: row.focus,
          bio: row.bio,
          visible: row.visible === 1,
          revision: row.revision,
          approvedAt: row.approved_at,
          approvedBy: row.approved_by,
          reviewRef: row.review_ref,
          consentVersion: row.consent_version,
          consentAt: row.consent_at,
        }
      : null,
  });
});
mentor.post("/admin/profile/approve", admin, async (c) => {
  const input = await parseBody(
    c,
    z.object({
      userId: z.string().trim().min(1).max(200),
      revision: z.string().min(1).max(200),
      reviewRef: z.string().trim().min(3).max(240),
      confirmed: z.literal(true),
    }),
  );
  const actor = c.get("authUser").id,
    now = isoNow(),
    event = crypto.randomUUID();
  const results = await c.env.DB.batch([
    c.env.DB.prepare(
      `UPDATE mentoring_profiles SET approved_by=?,approved_at=?,review_ref=?,approval_operation_id=? WHERE user_id=? AND revision=? AND visible=1 AND approved_at IS NULL
      AND EXISTS(SELECT 1 FROM users u JOIN mentoring_eligibility e ON e.user_id=u.id WHERE u.id=mentoring_profiles.user_id AND u.status='active' AND u.role_key IN ('mentor','alumni') AND e.active=1 AND e.expires_at>?)`,
    ).bind(actor, now, input.reviewRef, event, input.userId, input.revision, now),
    c.env.DB.prepare(
      `INSERT INTO mentoring_profile_events (id,profile_id,actor_id,action,revision,consent_version,review_ref,occurred_at)
      SELECT ?,id,?,'approved',revision,consent_version,?,? FROM mentoring_profiles WHERE user_id=? AND revision=? AND approval_operation_id=?`,
    ).bind(event, actor, input.reviewRef, now, input.userId, input.revision, event),
  ]);
  if (!results[0]?.meta.changes)
    throw ApiError.conflict(
      "Profile changed, was withdrawn, is already approved, or eligibility is not current.",
    );
  return c.json({ ok: true });
});

async function profiles(db: D1Database, userId: string, now: string, term: string) {
  // Substring search only; no inferred compatibility scores, ratings or metrics.
  const like = `%${term.replace(/[\\%_]/g, "\\$&")}%`;
  return db
    .prepare(
      `SELECT p.id,p.display_name,p.focus,p.bio FROM mentoring_profiles p
    JOIN users u ON u.id=p.user_id JOIN mentoring_eligibility e ON e.user_id=p.user_id
    WHERE p.visible=1 AND p.approved_at IS NOT NULL AND u.status='active' AND u.role_key IN ('mentor','alumni')
      AND e.active=1 AND e.expires_at>? AND p.user_id<>? AND (p.focus LIKE ? ESCAPE '\\' OR p.bio LIKE ? ESCAPE '\\' OR p.display_name LIKE ? ESCAPE '\\')
    ORDER BY p.display_name,p.id LIMIT 101`,
    )
    .bind(now, userId, like, like, like)
    .all<{ id: string; display_name: string; focus: string; bio: string }>();
}
mentor.get("/profiles", async (c) => {
  const q = (c.req.query("q") ?? "").trim().slice(0, 100),
    rows = await profiles(c.env.DB, c.get("authUser").id, isoNow(), q);
  return c.json({
    items: rows.results
      .slice(0, 100)
      .map((r) => ({ id: r.id, name: r.display_name, focus: r.focus, bio: r.bio })),
    truncated: rows.results.length > 100,
  });
});
mentor.post("/match", async (c) => {
  const input = await parseBody(
    c,
    z.object({
      goal: z.string().trim().max(100).optional().default(""),
      program: z.string().trim().max(100).optional().default(""),
    }),
  );
  const rows = await profiles(
    c.env.DB,
    c.get("authUser").id,
    isoNow(),
    input.goal || input.program,
  );
  return c.json({
    goal: input.goal,
    program: input.program,
    matches: rows.results
      .slice(0, 100)
      .map((r) => ({ id: r.id, name: r.display_name, focus: r.focus, bio: r.bio })),
    truncated: rows.results.length > 100,
  });
});

mentor.post("/requests", learner, async (c) => {
  const input = await parseBody(
    c,
    z.object({
      mentorId: z.string().trim().min(1).max(200),
      goal: z.string().trim().min(3).max(600),
    }),
  );
  const userId = c.get("authUser").id,
    now = isoNow(),
    since = new Date(Date.now() - 3600000).toISOString(),
    id = `mr-${crypto.randomUUID()}`,
    notify = `ntf-${crypto.randomUUID()}`;
  const results = await c.env.DB.batch([
    c.env.DB.prepare(
      `INSERT INTO mentoring_requests (id,learner_id,mentor_id,profile_id,goal,status,created_at,updated_at,operation_id)
      SELECT ?,?,p.user_id,p.id,?,'pending',?,?,? FROM mentoring_profiles p JOIN users u ON u.id=p.user_id
      JOIN mentoring_eligibility me ON me.user_id=p.user_id JOIN mentoring_eligibility le ON le.user_id=?
      JOIN users lu ON lu.id=le.user_id AND lu.status='active' AND lu.role_key IN ('student','alumni')
      WHERE p.id=? AND p.user_id<>? AND p.visible=1 AND p.approved_at IS NOT NULL
        AND u.status='active' AND u.role_key IN ('mentor','alumni') AND me.active=1 AND me.expires_at>?
        AND le.active=1 AND le.expires_at>? AND (SELECT COUNT(*) FROM mentoring_requests WHERE learner_id=? AND created_at>?)<10
        AND (SELECT COUNT(*) FROM mentoring_requests WHERE mentor_id=p.user_id AND status='pending')<50
      ON CONFLICT DO NOTHING`,
    ).bind(
      id,
      userId,
      input.goal,
      now,
      now,
      id,
      userId,
      input.mentorId,
      userId,
      now,
      now,
      userId,
      since,
    ),
    c.env.DB.prepare(
      `INSERT INTO notifications (id,user_id,title,body,time,engine)
      SELECT ?,mentor_id,'Mentorship request','Open your mentorship requests to review a new request.',?,'community' FROM mentoring_requests WHERE id=?`,
    ).bind(notify, now, id),
    c.env.DB.prepare(
      `INSERT INTO mentoring_request_events (id,request_id,actor_id,action,occurred_at)
      SELECT ?,id,?,'created',? FROM mentoring_requests WHERE id=? AND operation_id=?`,
    ).bind(crypto.randomUUID(), userId, now, id, id),
  ]);
  if (!results[0]?.meta.changes)
    throw ApiError.conflict(
      "Request could not be created. Check eligibility, existing requests, and mentor availability.",
    );
  return c.json({ ok: true, id }, 201);
});
mentor.get("/requests", async (c) => {
  const direction = c.req.query("direction"),
    user = c.get("authUser"),
    now = isoNow();
  if (direction !== "incoming" && direction !== "outgoing")
    throw ApiError.validation({ direction: ["Choose incoming or outgoing."] });
  if (direction === "incoming" && !["mentor", "alumni"].includes(user.roleKey))
    throw ApiError.forbidden();
  if (direction === "outgoing" && !["student", "alumni"].includes(user.roleKey))
    throw ApiError.forbidden();
  const where = direction === "incoming" ? "r.mentor_id=?" : "r.learner_id=?";
  const rows = await c.env.DB.prepare(
    `SELECT r.id,r.goal,r.status,r.created_at,r.updated_at,p.display_name AS mentor_name,u.name AS learner_name,
    CASE WHEN p.visible=1 AND p.approved_at IS NOT NULL AND me.active=1 AND me.expires_at>? AND le.active=1 AND le.expires_at>?
      AND mu.status='active' AND mu.role_key IN ('mentor','alumni') AND lu.status='active' AND lu.role_key IN ('student','alumni') THEN 1 ELSE 0 END AS eligible
    FROM mentoring_requests r JOIN mentoring_profiles p ON p.id=r.profile_id JOIN users u ON u.id=r.learner_id
    JOIN users mu ON mu.id=r.mentor_id JOIN users lu ON lu.id=r.learner_id
    LEFT JOIN mentoring_eligibility me ON me.user_id=r.mentor_id LEFT JOIN mentoring_eligibility le ON le.user_id=r.learner_id
    WHERE ${where} ORDER BY r.created_at DESC,r.id DESC LIMIT 101`,
  )
    .bind(now, now, user.id)
    .all<{
      id: string;
      goal: string;
      status: string;
      created_at: string;
      updated_at: string;
      mentor_name: string;
      learner_name: string;
      eligible: number;
    }>();
  return c.json({
    items: rows.results.slice(0, 100).map((r) => ({
      id: r.id,
      goal: r.goal,
      status: r.status,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
      mentorName: r.mentor_name,
      learnerName: r.learner_name,
      eligible: r.eligible === 1,
    })),
    truncated: rows.results.length > 100,
  });
});
mentor.post("/requests/:id/respond", potentialMentor, async (c) => {
  const input = await parseBody(c, z.object({ decision: z.enum(["accept", "decline"]) }));
  const userId = c.get("authUser").id,
    id = c.req.param("id"),
    now = isoNow(),
    op = crypto.randomUUID(),
    status = input.decision === "accept" ? "accepted" : "declined";
  const result = await c.env.DB.batch([
    c.env.DB.prepare(
      `UPDATE mentoring_requests SET status=?,updated_at=?,operation_id=? WHERE id=? AND mentor_id=? AND status='pending'
      AND (?='declined' OR EXISTS(SELECT 1 FROM mentoring_profiles p JOIN users mu ON mu.id=p.user_id
       JOIN mentoring_eligibility me ON me.user_id=p.user_id JOIN mentoring_eligibility le ON le.user_id=mentoring_requests.learner_id
       JOIN users lu ON lu.id=mentoring_requests.learner_id WHERE p.id=mentoring_requests.profile_id AND p.visible=1 AND p.approved_at IS NOT NULL
       AND mu.status='active' AND mu.role_key IN ('mentor','alumni') AND lu.status='active' AND lu.role_key IN ('student','alumni')
       AND me.active=1 AND me.expires_at>? AND le.active=1 AND le.expires_at>?))`,
    ).bind(status, now, op, id, userId, status, now, now),
    c.env.DB.prepare(
      `INSERT INTO notifications (id,user_id,title,body,time,engine)
      SELECT ?,learner_id,'Mentorship request update','Open your mentorship requests for an update.',?,'community' FROM mentoring_requests WHERE id=? AND operation_id=?`,
    ).bind(`ntf-${crypto.randomUUID()}`, now, id, op),
    c.env.DB.prepare(
      `INSERT INTO mentoring_request_events (id,request_id,actor_id,action,occurred_at)
      SELECT ?,id,?,status,? FROM mentoring_requests WHERE id=? AND operation_id=?`,
    ).bind(crypto.randomUUID(), userId, now, id, op),
  ]);
  if (!result[0]?.meta.changes)
    throw ApiError.conflict(
      "Request not pending, not yours, or current eligibility is unavailable.",
    );
  return c.json({ ok: true, status });
});
mentor.post("/requests/:id/cancel", async (c) => {
  const id = c.req.param("id"),
    userId = c.get("authUser").id,
    now = isoNow();
  const op = crypto.randomUUID();
  const result = await c.env.DB.batch([
    c.env.DB.prepare(
      `UPDATE mentoring_requests SET status='cancelled',updated_at=?,operation_id=?
      WHERE id=? AND (learner_id=? OR mentor_id=?) AND status IN ('pending','accepted')`,
    ).bind(now, op, id, userId, userId),
    c.env.DB.prepare(
      `INSERT INTO mentoring_request_events (id,request_id,actor_id,action,occurred_at)
      SELECT ?,id,?,'cancelled',? FROM mentoring_requests WHERE id=? AND operation_id=?`,
    ).bind(crypto.randomUUID(), userId, now, id, op),
    c.env.DB.prepare(
      `INSERT INTO notifications (id,user_id,title,body,time,engine)
      SELECT ?,CASE WHEN learner_id=? THEN mentor_id ELSE learner_id END,'Mentorship request update',
        'Open your mentorship requests for an update.',?,'community' FROM mentoring_requests WHERE id=? AND operation_id=?`,
    ).bind(`ntf-${crypto.randomUUID()}`, userId, now, id, op),
  ]);
  if (!result[0]?.meta.changes)
    throw ApiError.conflict("Request cannot be cancelled or is not yours.");
  return c.json({ ok: true, status: "cancelled" });
});
