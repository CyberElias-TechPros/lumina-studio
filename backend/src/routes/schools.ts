/**
 * Schools programme (B2B) — enquiries, school records, and trackable proposals.
 *
 *   POST   /v1/schools/inquiries              public — the /schools form
 *   GET    /v1/schools/inquiries              admissions/admin/marketing
 *   PATCH  /v1/schools/inquiries/:id          mark contacted / converted / spam
 *   GET    /v1/schools                        list with proposal counts
 *   POST   /v1/schools                        create
 *   PATCH  /v1/schools/:id                    edit
 *   POST   /v1/schools/:id/proposals          generate (fee tiers + term plan)
 *   GET    /v1/schools/proposals/:ref         public, shareable, print-ready
 *   PATCH  /v1/schools/proposals/:ref         status changes (send/accept/decline)
 *
 * Pricing follows docs/schools-partnership-programme-plan.md §4.4: ₦20,000 per
 * student per term at 20–39 students, ₦17,500 at 40–79, ₦15,000 at 80+. Minimum
 * 20 paying students, 50% deposit before the first session.
 */
import { Hono } from "hono";
import type { AppEnv } from "../types";
import { ApiError } from "../lib/errors";
import { parseBody } from "../lib/validate";
import { isoNow, randomToken } from "../lib/crypto";
import { requireAuth, requireAnyRole, requireAdmin } from "../lib/auth";
import { hashIdentifier, rateLimit } from "../lib/rate-limit";
import { sendEmail } from "../lib/email";
import { z } from "zod";

export const schools = new Hono<{ Bindings: AppEnv }>();

export const MIN_STUDENTS = 20;
export const SCHOOL_TERMS = [
  "First term",
  "Second term",
  "Third term",
  "Holiday programme",
] as const;

/** Fee tier per student per term, from the programme plan. */
export function feeForStudents(students: number): number {
  if (students >= 80) return 15_000;
  if (students >= 40) return 17_500;
  return 20_000;
}

/** The three-term rotation, adapted to the school level. */
export function defaultPlan(level: string): { term: string; course: string }[] {
  const primary = [
    { term: "First term", course: "Computer & Digital Literacy" },
    { term: "Second term", course: "Microsoft Office for Kids" },
    { term: "Third term", course: "Scratch & Coding" },
  ];
  const secondary = [
    { term: "First term", course: "Digital Productivity (MS Office + Google Workspace)" },
    { term: "Second term", course: "Graphic Design" },
    { term: "Third term", course: "Web Design & Coding Foundations" },
  ];
  return level === "primary" ? primary : secondary;
}

export const PROPOSAL_INCLUDES = [
  "Curriculum, lesson plans and class materials",
  "Our instructors, teaching on your campus or online",
  "Hands-on projects — every student builds something they can show",
  "Assessment against Know → Do → Create levels",
  "Termly reports for the school and parents",
  "Certificates with verifiable codes, plus a Digital Skills Passport for each student",
];

export const PROPOSAL_SCHOOL_OBLIGATIONS = [
  "A timetable window of 1–2 sessions a week (45–90 minutes each)",
  "A classroom or computer room we can use for the sessions",
  "Names and class lists of participating students",
  "A staff contact to coordinate attendance and reporting",
  "Payment: 50% deposit before the first session, balance by mid-term",
];

/** Everything the public proposal page renders — stored on the row at generation. */
export interface ProposalPayload {
  ref: string;
  schoolName: string;
  schoolLevel: string;
  term: string;
  students: number;
  ratePerStudent: number;
  total: number;
  plan: { term: string; course: string }[];
  extras: { label: string; price: string }[];
  includes: string[];
  schoolProvides: string[];
  minimumStudents: number;
  validUntil: string;
  generatedAt: string;
  /** Terms: 30% deposit for diplomas does not apply here — 50% for schools. */
  paymentTerms: string;
}

export function buildPayload(input: {
  ref: string;
  schoolName: string;
  schoolLevel: string;
  term: string;
  students: number;
  ratePerStudent: number;
  plan: { term: string; course: string }[];
  extras: { label: string; price: string }[];
  validUntil: string;
  generatedAt: string;
}): ProposalPayload {
  return {
    ...input,
    total: input.students * input.ratePerStudent,
    includes: PROPOSAL_INCLUDES,
    schoolProvides: PROPOSAL_SCHOOL_OBLIGATIONS,
    minimumStudents: MIN_STUDENTS,
    paymentTerms:
      "50% deposit before the first session, balance by mid-term. The fee covers the full term per student.",
  };
}

/* ---------------------------- public enquiry ---------------------------- */

const inquirySchema = z.object({
  schoolName: z.string().trim().min(3, "Enter the school's name.").max(160),
  level: z.enum(["primary", "secondary", "mixed"]).default("secondary"),
  contactName: z.string().trim().min(2, "Enter your name.").max(100),
  contactRole: z.string().trim().max(80).optional(),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s\-()]{7,20}$/, "Enter a valid phone number.")
    .max(30),
  email: z.string().trim().email("Enter a valid email address.").max(160).optional(),
  studentCount: z.number().int().min(1).max(5000).optional(),
  message: z.string().trim().max(1000).optional(),
});

schools.post("/inquiries", async (c) => {
  const ip = c.req.header("CF-Connecting-IP") ?? c.req.header("x-forwarded-for") ?? "unknown";
  await rateLimit(c.env.RATE_LIMIT, "school-inquiry", await hashIdentifier(ip), {
    limit: 5,
    windowSeconds: 3_600,
  });
  const input = await parseBody(c, inquirySchema);
  const now = isoNow();
  const id = crypto.randomUUID();
  await c.env.DB.prepare(
    `INSERT INTO school_inquiries (id, school_name, level, contact_name, contact_role, phone, email, student_count, message, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', ?)`,
  )
    .bind(
      id,
      input.schoolName,
      input.level,
      input.contactName,
      input.contactRole ?? null,
      input.phone,
      input.email ?? null,
      input.studentCount ?? null,
      input.message ?? null,
      now,
    )
    .run();

  const suggested = input.studentCount ? feeForStudents(input.studentCount) : null;
  try {
    await sendEmail(c, {
      to: c.env.CONTACT_INBOX || c.env.EMAIL_REPLY_TO || "help@cea.ng",
      replyTo: c.env.EMAIL_REPLY_TO,
      subject: `School enquiry — ${input.schoolName}`,
      html: `<p><strong>${input.contactName}</strong>${input.contactRole ? ` (${input.contactRole})` : ""} from <strong>${input.schoolName}</strong> (${input.level}) asked about the Digital Skills Programme.</p>
        <ul>
          <li>Phone: ${input.phone}</li>
          ${input.email ? `<li>Email: ${input.email}</li>` : ""}
          ${input.studentCount ? `<li>Students: ${input.studentCount} → tier ₦${(suggested ?? 0).toLocaleString("en-NG")}/student/term</li>` : ""}
          ${input.message ? `<li>Message: ${input.message}</li>` : ""}
        </ul>
        <p>Reply within one working day, then build the proposal in CEA-OS → Schools.</p>`,
    });
    if (input.email) {
      await sendEmail(c, {
        to: input.email,
        replyTo: c.env.EMAIL_REPLY_TO,
        subject: "Thanks — we'll send your school proposal",
        html: `<p>Dear ${input.contactName},</p>
          <p>Thank you for asking about the Practical Digital Skills Programme for ${input.schoolName}. We'll prepare a proposal for your school and send it within one working day.</p>
          <p>In the meantime, here is what it covers: one practical skill per term, taught at your school by our instructors, with projects, termly reports, certificates and a Digital Skills Passport for every student.</p>
          <p>If anything is urgent, call or WhatsApp 0905 862 8386 (Mon–Sat, 8:00–20:00).</p>
          <p>— Cyber Elias Academy</p>`,
      });
    }
  } catch {
    /* the enquiry is stored regardless; email is best-effort */
  }
  return c.json(
    {
      ok: true,
      message:
        "Thank you — we've received your request and will send a proposal within one working day.",
    },
    201,
  );
});

schools.get(
  "/inquiries",
  requireAuth,
  requireAnyRole(["admin", "admissions", "marketing"]),
  async (c) => {
    const status = (c.req.query("status") ?? "new").trim();
    const rows = await c.env.DB.prepare(
      `SELECT * FROM school_inquiries ${status === "all" ? "" : "WHERE status = ?"}
     ORDER BY created_at DESC LIMIT 100`,
    )
      .bind(...(status === "all" ? [] : [status]))
      .all<{
        id: string;
        school_name: string;
        level: string;
        contact_name: string;
        contact_role: string | null;
        phone: string;
        email: string | null;
        student_count: number | null;
        message: string | null;
        status: string;
        school_id: string | null;
        created_at: string;
      }>();
    return c.json({
      items: rows.results.map((r) => ({
        id: r.id,
        schoolName: r.school_name,
        level: r.level,
        contactName: r.contact_name,
        contactRole: r.contact_role,
        phone: r.phone,
        email: r.email,
        studentCount: r.student_count,
        message: r.message,
        status: r.status,
        schoolId: r.school_id,
        /** What the tier would be if they have told us the size. */
        suggestedRate: r.student_count ? feeForStudents(r.student_count) : null,
        createdAt: r.created_at,
      })),
    });
  },
);

const inquiryPatchSchema = z.object({
  status: z.enum(["new", "contacted", "converted", "spam"]),
  schoolId: z.string().trim().max(60).optional(),
});

schools.patch("/inquiries/:id", requireAuth, requireAnyRole(["admin", "admissions"]), async (c) => {
  const input = await parseBody(c, inquiryPatchSchema);
  const result = await c.env.DB.prepare(
    `UPDATE school_inquiries SET status = ?, school_id = COALESCE(?, school_id) WHERE id = ?`,
  )
    .bind(input.status, input.schoolId ?? null, c.req.param("id"))
    .run();
  if (!result.meta.changes) throw ApiError.notFound("No enquiry with that id.");
  return c.json({ ok: true, status: input.status });
});

/* ------------------------------- schools ------------------------------- */

schools.get("/", requireAuth, requireAnyRole(["admin", "admissions", "marketing"]), async (c) => {
  const rows = await c.env.DB.prepare(
    `SELECT s.*,
            (SELECT COUNT(*) FROM school_proposals p WHERE p.school_id = s.id) AS proposal_count,
            (SELECT MAX(p.created_at) FROM school_proposals p WHERE p.school_id = s.id) AS last_proposal_at
       FROM schools s ORDER BY s.updated_at DESC LIMIT 200`,
  ).all<{
    id: string;
    name: string;
    level: string;
    address: string | null;
    city: string | null;
    contact_name: string | null;
    contact_role: string | null;
    contact_phone: string | null;
    contact_email: string | null;
    student_count: number | null;
    status: string;
    notes: string | null;
    proposal_count: number;
    last_proposal_at: string | null;
    created_at: string;
    updated_at: string;
  }>();
  return c.json({
    items: rows.results.map((r) => ({
      id: r.id,
      name: r.name,
      level: r.level,
      address: r.address,
      city: r.city,
      contactName: r.contact_name,
      contactRole: r.contact_role,
      contactPhone: r.contact_phone,
      contactEmail: r.contact_email,
      studentCount: r.student_count,
      status: r.status,
      notes: r.notes,
      proposalCount: r.proposal_count,
      lastProposalAt: r.last_proposal_at,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    })),
  });
});

const schoolSchema = z.object({
  name: z.string().trim().min(3).max(160),
  level: z.enum(["primary", "secondary", "mixed"]).default("secondary"),
  address: z.string().trim().max(200).optional(),
  city: z.string().trim().max(80).default("Port Harcourt"),
  contactName: z.string().trim().max(100).optional(),
  contactRole: z.string().trim().max(80).optional(),
  contactPhone: z.string().trim().max(30).optional(),
  contactEmail: z.string().trim().email().max(160).optional(),
  studentCount: z.number().int().min(1).max(5000).optional(),
  status: z
    .enum(["prospect", "contacted", "proposal_sent", "negotiating", "won", "lost"])
    .default("prospect"),
  notes: z.string().trim().max(1000).optional(),
});

schools.post("/", requireAuth, requireAnyRole(["admin", "admissions"]), async (c) => {
  const input = await parseBody(c, schoolSchema);
  const now = isoNow();
  const id = crypto.randomUUID();
  await c.env.DB.prepare(
    `INSERT INTO schools (id, name, level, address, city, contact_name, contact_role, contact_phone, contact_email, student_count, status, notes, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      id,
      input.name,
      input.level,
      input.address ?? null,
      input.city,
      input.contactName ?? null,
      input.contactRole ?? null,
      input.contactPhone ?? null,
      input.contactEmail ?? null,
      input.studentCount ?? null,
      input.status,
      input.notes ?? null,
      now,
      now,
    )
    .run();
  return c.json({ ok: true, id }, 201);
});

schools.patch("/:id", requireAuth, requireAnyRole(["admin", "admissions"]), async (c) => {
  const input = await parseBody(c, schoolSchema.partial());
  const map: Record<string, string> = {
    name: "name",
    level: "level",
    address: "address",
    city: "city",
    contactName: "contact_name",
    contactRole: "contact_role",
    contactPhone: "contact_phone",
    contactEmail: "contact_email",
    studentCount: "student_count",
    status: "status",
    notes: "notes",
  };
  const sets: string[] = [];
  const args: unknown[] = [];
  for (const [key, column] of Object.entries(map)) {
    const value = (input as Record<string, unknown>)[key];
    if (value === undefined) continue;
    sets.push(`${column} = ?`);
    args.push(value);
  }
  if (sets.length === 0) throw ApiError.validation({ _: ["Nothing to update."] });
  sets.push("updated_at = ?");
  args.push(isoNow(), c.req.param("id"));
  const result = await c.env.DB.prepare(`UPDATE schools SET ${sets.join(", ")} WHERE id = ?`)
    .bind(...args)
    .run();
  if (!result.meta.changes) throw ApiError.notFound("No school with that id.");
  return c.json({ ok: true });
});

/* ------------------------------ proposals ------------------------------ */

const proposalSchema = z.object({
  term: z.string().trim().min(3).max(60),
  students: z.number().int().min(MIN_STUDENTS).max(5000),
  /** Optional override — defaults to the tier for that cohort size. */
  ratePerStudent: z.number().int().min(5_000).max(100_000).optional(),
  validDays: z.number().int().min(7).max(120).default(30),
  /** Extra services, quoted separately. */
  extras: z
    .array(z.object({ label: z.string().trim().min(2).max(120), price: z.string().trim().max(60) }))
    .max(6)
    .default([]),
  plan: z
    .array(
      z.object({
        term: z.string().trim().min(2).max(40),
        course: z.string().trim().min(2).max(120),
      }),
    )
    .max(8)
    .optional(),
});

schools.post("/:id/proposals", requireAuth, requireAnyRole(["admin", "admissions"]), async (c) => {
  const school = await c.env.DB.prepare(`SELECT * FROM schools WHERE id = ?`)
    .bind(c.req.param("id"))
    .first<{
      id: string;
      name: string;
      level: string;
      student_count: number | null;
    }>();
  if (!school) throw ApiError.notFound("No school with that id.");
  const input = await parseBody(c, proposalSchema);
  const rate = input.ratePerStudent ?? feeForStudents(input.students);
  const now = isoNow();
  const ref = `CEA-SCH-${randomToken(6).toUpperCase()}`;
  const validUntil = new Date(Date.now() + input.validDays * 86_400_000).toISOString().slice(0, 10);
  const payload = buildPayload({
    ref,
    schoolName: school.name,
    schoolLevel: school.level,
    term: input.term,
    students: input.students,
    ratePerStudent: rate,
    plan: input.plan ?? defaultPlan(school.level),
    extras: input.extras,
    validUntil,
    generatedAt: now,
  });
  const id = crypto.randomUUID();
  await c.env.DB.prepare(
    `INSERT INTO school_proposals
       (id, ref, school_id, school_name, school_level, term, students, rate_per_student, total, plan, extras, valid_until, status, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'draft', ?, ?)`,
  )
    .bind(
      id,
      ref,
      school.id,
      school.name,
      school.level,
      input.term,
      input.students,
      rate,
      payload.total,
      JSON.stringify(payload.plan),
      JSON.stringify(payload.extras),
      validUntil,
      now,
      now,
    )
    .run();
  await c.env.DB.prepare(
    `UPDATE schools SET status = 'proposal_sent', updated_at = ? WHERE id = ? AND status IN ('prospect','contacted')`,
  )
    .bind(now, school.id)
    .run();
  return c.json({ ok: true, ref, total: payload.total, ratePerStudent: rate }, 201);
});

/** Public: the shareable, print-ready proposal. */
schools.get("/proposals/:ref", async (c) => {
  const row = await c.env.DB.prepare(`SELECT * FROM school_proposals WHERE ref = ?`)
    .bind(c.req.param("ref").toUpperCase())
    .first<{
      id: string;
      ref: string;
      school_id: string;
      school_name: string;
      school_level: string;
      term: string;
      students: number;
      rate_per_student: number;
      total: number;
      plan: string;
      extras: string;
      valid_until: string;
      status: string;
      created_at: string;
      viewed_at: string | null;
      accepted_by: string | null;
    }>();
  if (!row) throw ApiError.notFound("No proposal with that reference.");
  // First open is recorded — you can see whether the school actually read it.
  if (!row.viewed_at) {
    await c.env.DB.prepare(
      `UPDATE school_proposals SET viewed_at = ?, status = CASE WHEN status = 'sent' THEN 'viewed' ELSE status END WHERE id = ?`,
    )
      .bind(isoNow(), row.id)
      .run();
  }
  const payload = buildPayload({
    ref: row.ref,
    schoolName: row.school_name,
    schoolLevel: row.school_level,
    term: row.term,
    students: row.students,
    ratePerStudent: row.rate_per_student,
    plan: JSON.parse(row.plan) as { term: string; course: string }[],
    extras: JSON.parse(row.extras) as { label: string; price: string }[],
    validUntil: row.valid_until,
    generatedAt: row.created_at,
  });
  return c.json({ proposal: payload, status: row.status, viewedAt: row.viewed_at });
});

/** Accept in place: name + role typed by the school, timestamped. */
const decisionSchema = z.object({
  decision: z.enum(["accepted", "declined", "sent"]),
  acceptedBy: z.string().trim().min(2).max(120).optional(),
  acceptedRole: z.string().trim().max(80).optional(),
  notes: z.string().trim().max(500).optional(),
});

schools.patch("/proposals/:ref", async (c) => {
  const ref = c.req.param("ref").toUpperCase();
  const input = await parseBody(c, decisionSchema);
  const row = await c.env.DB.prepare(`SELECT * FROM school_proposals WHERE ref = ?`)
    .bind(ref)
    .first<{ id: string; status: string; school_id: string; total: number }>();
  if (!row) throw ApiError.notFound("No proposal with that reference.");
  const now = isoNow();
  if (input.decision === "sent") {
    // Signed-in staff use this to mark "sent" after emailing or WhatsApp-ing it.
    const auth = c.get("authUser");
    if (!auth) throw ApiError.unauthorized();
    await c.env.DB.prepare(
      `UPDATE school_proposals SET status = 'sent', sent_at = ?, updated_at = ? WHERE id = ?`,
    )
      .bind(now, now, row.id)
      .run();
    return c.json({ ok: true, status: "sent" });
  }
  if (input.decision === "accepted" && (!input.acceptedBy || input.acceptedBy.length < 2)) {
    throw ApiError.validation({ acceptedBy: ["Type the name of the person accepting."] });
  }
  const hash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`${ref}:${row.total}:${now.slice(0, 10)}`),
  );
  const acceptedHash = [...new Uint8Array(hash)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  await c.env.DB.prepare(
    `UPDATE school_proposals SET status = ?, decided_at = ?, accepted_by = ?, accepted_role = ?, accepted_hash = ?, notes = COALESCE(?, notes), updated_at = ? WHERE id = ?`,
  )
    .bind(
      input.decision,
      now,
      input.acceptedBy ?? null,
      input.acceptedRole ?? null,
      input.decision === "accepted" ? acceptedHash : null,
      input.notes ?? null,
      now,
      row.id,
    )
    .run();
  await c.env.DB.prepare(`UPDATE schools SET status = ?, updated_at = ? WHERE id = ?`)
    .bind(input.decision === "accepted" ? "won" : "lost", now, row.school_id)
    .run();
  try {
    await sendEmail(c, {
      to: c.env.CONTACT_INBOX || c.env.EMAIL_REPLY_TO || "help@cea.ng",
      replyTo: c.env.EMAIL_REPLY_TO,
      subject: `Proposal ${ref} ${input.decision}`,
      html: `<p>The proposal <strong>${ref}</strong> was marked <strong>${input.decision}</strong>${input.acceptedBy ? ` by ${input.acceptedBy}${input.acceptedRole ? ` (${input.acceptedRole})` : ""}` : ""}.</p>
        <p>Open CEA-OS → Schools to schedule the first term.</p>`,
    });
  } catch {
    /* best-effort */
  }
  return c.json({ ok: true, status: input.decision });
});

/** Staff: list proposals for the workspace (all, or one school). */
schools.get(
  "/proposals",
  requireAuth,
  requireAnyRole(["admin", "admissions", "marketing"]),
  async (c) => {
    const schoolId = (c.req.query("school") ?? "").trim();
    const rows = await c.env.DB.prepare(
      `SELECT ref, school_id, school_name, term, students, rate_per_student, total, status,
            valid_until, sent_at, viewed_at, decided_at, accepted_by, created_at
       FROM school_proposals ${schoolId ? "WHERE school_id = ?" : ""}
      ORDER BY created_at DESC LIMIT 200`,
    )
      .bind(...(schoolId ? [schoolId] : []))
      .all<Record<string, unknown>>();
    return c.json({
      items: rows.results.map((r) => ({
        ref: r.ref,
        schoolId: r.school_id,
        schoolName: r.school_name,
        term: r.term,
        students: r.students,
        ratePerStudent: r.rate_per_student,
        total: r.total,
        status: r.status,
        validUntil: r.valid_until,
        sentAt: r.sent_at,
        viewedAt: r.viewed_at,
        decidedAt: r.decided_at,
        acceptedBy: r.accepted_by,
        createdAt: r.created_at,
      })),
    });
  },
);

schools.delete("/proposals/:ref", requireAuth, requireAdmin, async (c) => {
  const result = await c.env.DB.prepare(`DELETE FROM school_proposals WHERE ref = ?`)
    .bind(c.req.param("ref").toUpperCase())
    .run();
  if (!result.meta.changes) throw ApiError.notFound("No proposal with that reference.");
  return c.json({ ok: true });
});
