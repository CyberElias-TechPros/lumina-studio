import { Hono } from "hono";
import { z } from "zod";
import type { AppEnv } from "../types";
import { ApiError } from "../lib/errors";
import { parseBody } from "../lib/validate";
import { requireAuth, requireAdmin } from "../lib/auth";
import { base64UrlDecode, base64UrlEncode, isoNow } from "../lib/crypto";
import { normalizeEmail } from "../db/client";
import { hashIdentifier, rateLimit } from "../lib/rate-limit";
import { clientIpOf, verifyTurnstile } from "../lib/turnstile";
import { emailLayout, escapeHtml } from "../lib/email-templates";
import { appUrl, sendEmail } from "../lib/email";
import { parsePagination, type Paginated } from "../lib/pagination";

export const PROJECT_TYPES = [
  "website",
  "web_app",
  "mobile_app",
  "internal_tool",
  "automation",
  "consulting",
  "other",
] as const;

export const PROJECT_STATUSES = [
  "new",
  "reviewing",
  "scoping",
  "proposal_sent",
  "won",
  "declined",
] as const;

export const PARTNERSHIP_TYPES = [
  "education",
  "employer",
  "technology",
  "ngo_community",
  "government",
  "delivery_partner",
  "other",
] as const;

export const PARTNER_REVIEW_STATUSES = [
  "new",
  "reviewing",
  "interview",
  "approved",
  "declined",
] as const;

const BUDGET_RANGES = ["undecided", "under_250k", "250k_750k", "750k_2m", "2m_plus"] as const;
const TIMELINES = [
  "asap",
  "one_to_three_months",
  "three_to_six_months",
  "six_plus_months",
  "flexible",
] as const;

const projectSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name.").max(120),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  phone: z.string().trim().max(30).optional().default(""),
  organization: z.string().trim().max(160).optional().default(""),
  projectType: z.enum(PROJECT_TYPES, { message: "Choose a project type." }),
  brief: z
    .string()
    .trim()
    .min(30, "Tell us a little more about the project (at least 30 characters).")
    .max(5000),
  budgetRange: z.enum(BUDGET_RANGES, { message: "Choose a budget range or select undecided." }),
  timeline: z.enum(TIMELINES, { message: "Choose a target timeline." }),
  privacyConsent: z
    .boolean()
    .refine((value) => value, "Please agree to be contacted about this request."),
  turnstileToken: z.string().max(4000).optional(),
  contactWebsite: z.string().max(300).optional().default(""),
});

const partnerSchema = z.object({
  contactName: z.string().trim().min(2, "Enter your full name.").max(120),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  phone: z.string().trim().max(30).optional().default(""),
  organization: z.string().trim().min(2, "Enter your organisation name.").max(160),
  website: z
    .string()
    .trim()
    .max(300)
    .optional()
    .default("")
    .refine((value) => {
      if (!value) return true;
      try {
        const url = new URL(value);
        return url.protocol === "https:" || url.protocol === "http:";
      } catch {
        return false;
      }
    }, "Enter a full website address beginning with https://."),
  partnershipType: z.enum(PARTNERSHIP_TYPES, { message: "Choose a partnership focus." }),
  region: z.string().trim().min(2, "Enter your city or region.").max(120),
  capabilities: z
    .string()
    .trim()
    .min(30, "Describe your organisation's relevant experience (at least 30 characters).")
    .max(4000),
  proposal: z
    .string()
    .trim()
    .min(30, "Tell us what you would like to do together (at least 30 characters).")
    .max(4000),
  privacyConsent: z
    .boolean()
    .refine((value) => value, "Please agree to be contacted about this application."),
  turnstileToken: z.string().max(4000).optional(),
  contactWebsite: z.string().max(300).optional().default(""),
});

const projectUpdateSchema = z.object({
  status: z.enum(PROJECT_STATUSES, { message: "Choose a valid project status." }),
  note: z.string().trim().max(3000).optional(),
});

const partnerUpdateSchema = z.object({
  status: z.enum(PARTNER_REVIEW_STATUSES, { message: "Choose a valid review status." }),
  note: z.string().trim().max(3000).optional(),
});

type Cursor = { createdAt: string; id: string };

function newReference(prefix: "PROJ" | "PARTNER"): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(7);
  crypto.getRandomValues(bytes);
  const suffix = Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("");
  return `${prefix}-${new Date().getUTCFullYear()}-${suffix}`;
}

function decodeCursor(value: string | undefined): Cursor | null {
  if (!value) return null;
  const decoded = base64UrlDecode(value);
  if (!decoded) throw ApiError.validation({ cursor: ["Invalid page cursor."] });
  try {
    const parsed = JSON.parse(decoded) as Partial<Cursor>;
    if (typeof parsed.createdAt === "string" && typeof parsed.id === "string") {
      return { createdAt: parsed.createdAt, id: parsed.id };
    }
  } catch {
    // A malformed cursor is a client error rather than silently restarting the list.
  }
  throw ApiError.validation({ cursor: ["Invalid page cursor."] });
}

function encodeCursor(value: Cursor): string {
  return base64UrlEncode(JSON.stringify(value));
}

function queueNotifications(
  c: { executionCtx: { waitUntil: (promise: Promise<unknown>) => void } },
  task: Promise<unknown>,
  label: string,
): void {
  const safeTask = task.catch((error) => console.error(`${label} notification failed`, error));
  try {
    c.executionCtx.waitUntil(safeTask);
  } catch {
    // Hono's test adapter may not provide an execution context.
    void safeTask;
  }
}

function inboxOf(env: AppEnv): string {
  return env.CONTACT_INBOX || env.EMAIL_REPLY_TO || "help@cea.ng";
}

function subjectText(value: string): string {
  return value
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, 120);
}

async function sendAdmissionInstructions(
  c: { env: AppEnv },
  application: { contact_name: string; email: string; ref: string },
): Promise<boolean> {
  const result = await sendEmail(c, {
    to: application.email,
    subject: "Your Cyber Elias Academy partnership is approved",
    html: emailLayout({
      heading: "Welcome as a CEA partner",
      bodyHtml: `<p>Hi ${escapeHtml(application.contact_name)}, your partner application (<strong>${escapeHtml(application.ref)}</strong>) has been approved and a partner account has been prepared.</p>
<p>Sign in using the email address on your application. You can use the one-time sign-in link on the sign-in page; your partner workspace is available after sign-in.</p>
<p>Keep your application reference for any follow-up: <strong>${escapeHtml(application.ref)}</strong>.</p>`,
      cta: { label: "Sign in to your partner workspace", url: appUrl(c, "/auth/sign-in") },
    }),
  });
  // The console transport is useful in tests and local development but must not
  // be reported to staff as a real applicant notification.
  return result.sent && result.provider !== "console";
}

function projectTypeLabel(type: (typeof PROJECT_TYPES)[number]): string {
  return {
    website: "Website",
    web_app: "Web application",
    mobile_app: "Mobile app",
    internal_tool: "Internal business tool",
    automation: "Workflow automation / integration",
    consulting: "Technical discovery / consulting",
    other: "Other digital project",
  }[type];
}

function budgetLabel(budget: (typeof BUDGET_RANGES)[number]): string {
  return {
    undecided: "Not decided yet",
    under_250k: "Under ₦250,000",
    "250k_750k": "₦250,000–₦750,000",
    "750k_2m": "₦750,000–₦2,000,000",
    "2m_plus": "Over ₦2,000,000",
  }[budget];
}

function timelineLabel(timeline: (typeof TIMELINES)[number]): string {
  return {
    asap: "As soon as practical",
    one_to_three_months: "Within 1–3 months",
    three_to_six_months: "Within 3–6 months",
    six_plus_months: "More than 6 months",
    flexible: "Flexible / exploring",
  }[timeline];
}

function partnershipTypeLabel(type: (typeof PARTNERSHIP_TYPES)[number]): string {
  return {
    education: "Education / training",
    employer: "Employer / talent pathway",
    technology: "Technology / product",
    ngo_community: "NGO / community",
    government: "Government / public sector",
    delivery_partner: "Delivery / implementation partner",
    other: "Other",
  }[type];
}

interface ProjectRow {
  id: string;
  ref: string;
  full_name: string;
  email: string;
  phone: string | null;
  organization: string | null;
  project_type: (typeof PROJECT_TYPES)[number];
  brief: string;
  budget_range: (typeof BUDGET_RANGES)[number];
  timeline: (typeof TIMELINES)[number];
  status: (typeof PROJECT_STATUSES)[number];
  staff_note: string;
  source: string;
  created_at: string;
  updated_at: string;
}

interface PartnerRow {
  id: string;
  ref: string;
  contact_name: string;
  email: string;
  phone: string | null;
  organization: string;
  website: string | null;
  partnership_type: (typeof PARTNERSHIP_TYPES)[number];
  region: string;
  capabilities: string;
  proposal: string;
  status: string;
  staff_note: string;
  portal_user_id: string | null;
  created_at: string;
  updated_at: string;
}

function projectDto(row: ProjectRow) {
  return {
    id: row.id,
    ref: row.ref,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    organization: row.organization,
    projectType: row.project_type,
    projectTypeLabel: projectTypeLabel(row.project_type),
    brief: row.brief,
    budgetRange: row.budget_range,
    budgetLabel: budgetLabel(row.budget_range),
    timeline: row.timeline,
    timelineLabel: timelineLabel(row.timeline),
    status: row.status,
    note: row.staff_note,
    source: row.source,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function partnerDto(row: PartnerRow) {
  return {
    id: row.id,
    ref: row.ref,
    contactName: row.contact_name,
    email: row.email,
    phone: row.phone,
    organization: row.organization,
    website: row.website,
    partnershipType: row.partnership_type,
    partnershipTypeLabel: partnershipTypeLabel(row.partnership_type),
    region: row.region,
    capabilities: row.capabilities,
    proposal: row.proposal,
    status: row.status,
    note: row.staff_note,
    hasPortalAccount: Boolean(row.portal_user_id),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export const businessIntake = new Hono<{ Bindings: AppEnv }>();

/** Public project brief intake: persist first; notification delivery is best-effort. */
businessIntake.post("/projects", async (c) => {
  const input = await parseBody(c, projectSchema);
  const ip = clientIpOf(c);
  await rateLimit(c.env.RATE_LIMIT, "project-intake", await hashIdentifier(ip), {
    limit: 5,
    windowSeconds: 3600,
  });

  // Honeypot submissions receive a generic success without persisting personal data.
  if (input.contactWebsite.trim())
    return c.json({ ok: true, ref: newReference("PROJ"), status: "new" }, 201);
  await verifyTurnstile(c, input.turnstileToken, ip);

  const id = crypto.randomUUID();
  const ref = newReference("PROJ");
  const email = normalizeEmail(input.email);
  const now = isoNow();
  await c.env.DB.batch([
    c.env.DB.prepare(
      `INSERT INTO project_inquiries
        (id, ref, full_name, email, phone, organization, project_type, brief, budget_range, timeline,
         status, staff_note, source, consented_at, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', '', 'public_site', ?, ?, ?)`,
    ).bind(
      id,
      ref,
      input.fullName,
      email,
      input.phone.trim() || null,
      input.organization.trim() || null,
      input.projectType,
      input.brief,
      input.budgetRange,
      input.timeline,
      now,
      now,
      now,
    ),
    c.env.DB.prepare(
      `INSERT INTO project_inquiry_events
        (id, inquiry_id, actor_email, action, from_status, to_status, note, created_at)
       VALUES (?, ?, 'system', 'submitted', NULL, 'new', '', ?)`,
    ).bind(crypto.randomUUID(), id, now),
  ]);

  const notifyTo = inboxOf(c.env);
  const task = Promise.allSettled([
    sendEmail(c, {
      to: notifyTo,
      replyTo: email,
      subject: `Project enquiry ${ref}: ${projectTypeLabel(input.projectType)}`,
      html: emailLayout({
        heading: `New project enquiry ${escapeHtml(ref)}`,
        bodyHtml: `<p><strong>Contact:</strong> ${escapeHtml(input.fullName)}<br/><strong>Email:</strong> ${escapeHtml(email)}<br/><strong>Phone:</strong> ${escapeHtml(input.phone || "Not provided")}<br/><strong>Organisation:</strong> ${escapeHtml(input.organization || "Not provided")}</p>
<p><strong>Project:</strong> ${escapeHtml(projectTypeLabel(input.projectType))}<br/><strong>Budget:</strong> ${escapeHtml(budgetLabel(input.budgetRange))}<br/><strong>Timeline:</strong> ${escapeHtml(timelineLabel(input.timeline))}</p>
<p style="white-space:pre-wrap">${escapeHtml(input.brief)}</p>`,
      }),
    }),
    sendEmail(c, {
      to: email,
      subject: `We received your project enquiry (${ref})`,
      html: emailLayout({
        heading: "Your project brief is with our team",
        bodyHtml: `<p>Hi ${escapeHtml(input.fullName)}, we have received your ${escapeHtml(projectTypeLabel(input.projectType).toLowerCase())} enquiry.</p>
<p>Your reference is <strong>${escapeHtml(ref)}</strong>. Our team will review the details and follow up using the contact information you provided.</p>
<p>If you need to add context, reply to this email.</p>`,
      }),
    }),
  ]).then((results) => {
    for (const result of results) {
      if (result.status === "rejected") {
        console.error("Project enquiry email failed", result.reason);
      } else if (!result.value.sent || result.value.provider === "console") {
        console.warn(
          "Project enquiry email was not delivered",
          result.value.error ?? "No real transactional email provider is configured.",
        );
      }
    }
  });
  queueNotifications(c, task, "Project enquiry");

  return c.json({ ok: true, ref, status: "new" }, 201);
});

/** Public prospective-partner application. */
businessIntake.post("/partners", async (c) => {
  const input = await parseBody(c, partnerSchema);
  const ip = clientIpOf(c);
  await rateLimit(c.env.RATE_LIMIT, "partner-intake", await hashIdentifier(ip), {
    limit: 5,
    windowSeconds: 3600,
  });
  if (input.contactWebsite.trim())
    return c.json({ ok: true, ref: newReference("PARTNER"), status: "new" }, 201);
  await verifyTurnstile(c, input.turnstileToken, ip);

  const id = crypto.randomUUID();
  const ref = newReference("PARTNER");
  const email = normalizeEmail(input.email);
  const now = isoNow();
  await c.env.DB.batch([
    c.env.DB.prepare(
      `INSERT INTO partner_applications
        (id, ref, contact_name, email, phone, organization, website, partnership_type, region,
         capabilities, proposal, status, staff_note, portal_user_id, consented_at, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', '', NULL, ?, ?, ?)`,
    ).bind(
      id,
      ref,
      input.contactName,
      email,
      input.phone.trim() || null,
      input.organization,
      input.website || null,
      input.partnershipType,
      input.region,
      input.capabilities,
      input.proposal,
      now,
      now,
      now,
    ),
    c.env.DB.prepare(
      `INSERT INTO partner_application_events
        (id, application_id, actor_email, action, from_status, to_status, note, created_at)
       VALUES (?, ?, 'system', 'submitted', NULL, 'new', '', ?)`,
    ).bind(crypto.randomUUID(), id, now),
  ]);

  const notifyTo = inboxOf(c.env);
  const task = Promise.allSettled([
    sendEmail(c, {
      to: notifyTo,
      replyTo: email,
      subject: `Partner application ${ref}: ${subjectText(input.organization)}`,
      html: emailLayout({
        heading: `New partner application ${escapeHtml(ref)}`,
        bodyHtml: `<p><strong>Organisation:</strong> ${escapeHtml(input.organization)}<br/><strong>Contact:</strong> ${escapeHtml(input.contactName)}<br/><strong>Email:</strong> ${escapeHtml(email)}<br/><strong>Phone:</strong> ${escapeHtml(input.phone || "Not provided")}<br/><strong>Website:</strong> ${escapeHtml(input.website || "Not provided")}<br/><strong>Focus:</strong> ${escapeHtml(partnershipTypeLabel(input.partnershipType))}<br/><strong>Region:</strong> ${escapeHtml(input.region)}</p>
<p><strong>Relevant experience:</strong></p><p style="white-space:pre-wrap">${escapeHtml(input.capabilities)}</p>
<p><strong>Proposed collaboration:</strong></p><p style="white-space:pre-wrap">${escapeHtml(input.proposal)}</p>`,
      }),
    }),
    sendEmail(c, {
      to: email,
      subject: `We received your partnership application (${ref})`,
      html: emailLayout({
        heading: "Your partnership application is in review",
        bodyHtml: `<p>Hi ${escapeHtml(input.contactName)}, thank you for applying to partner with Cyber Elias Academy.</p>
<p>We have your application for <strong>${escapeHtml(input.organization)}</strong>. Your reference is <strong>${escapeHtml(ref)}</strong>. Our team will review the fit and contact you using the details you provided.</p>
<p>This receipt confirms submission; it is not an offer or approval.</p>`,
      }),
    }),
  ]).then((results) => {
    for (const result of results) {
      if (result.status === "rejected") {
        console.error("Partner application email failed", result.reason);
      } else if (!result.value.sent || result.value.provider === "console") {
        console.warn(
          "Partner application email was not delivered",
          result.value.error ?? "No real transactional email provider is configured.",
        );
      }
    }
  });
  queueNotifications(c, task, "Partner application");

  return c.json({ ok: true, ref, status: "new" }, 201);
});

/** Admin-only, most-recent-first project enquiry queue. */
businessIntake.get("/admin/projects", requireAuth, requireAdmin, async (c) => {
  const { limit } = parsePagination(c);
  const status = c.req.query("status");
  if (status && !PROJECT_STATUSES.includes(status as (typeof PROJECT_STATUSES)[number])) {
    throw ApiError.validation({ status: ["Choose a valid project status."] });
  }
  const cursor = decodeCursor(c.req.query("cursor"));
  const whereParts: string[] = [];
  const filterArgs: string[] = [];
  if (status) {
    whereParts.push("status = ?");
    filterArgs.push(status);
  }
  const countWhere = whereParts.length ? `WHERE ${whereParts.join(" AND ")}` : "";
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM project_inquiries ${countWhere}`)
    .bind(...filterArgs)
    .first<{ n: number }>();
  if (cursor) {
    whereParts.push("(created_at < ? OR (created_at = ? AND id < ?))");
    filterArgs.push(cursor.createdAt, cursor.createdAt, cursor.id);
  }
  const where = whereParts.length ? `WHERE ${whereParts.join(" AND ")}` : "";
  const rows = await c.env.DB.prepare(
    `SELECT id, ref, full_name, email, phone, organization, project_type, brief, budget_range,
            timeline, status, staff_note, source, created_at, updated_at
       FROM project_inquiries ${where}
      ORDER BY created_at DESC, id DESC LIMIT ?`,
  )
    .bind(...filterArgs, limit + 1)
    .all<ProjectRow>();
  const hasMore = rows.results.length > limit;
  const page = rows.results.slice(0, limit).map(projectDto);
  const last = rows.results[limit - 1];
  const result: Paginated<ReturnType<typeof projectDto>> = {
    items: page,
    total: total?.n ?? 0,
    ...(hasMore && last
      ? { nextCursor: encodeCursor({ createdAt: last.created_at, id: last.id }) }
      : {}),
  };
  return c.json(result);
});

/** Admin-only, most-recent-first partner review queue. */
businessIntake.get("/admin/partners", requireAuth, requireAdmin, async (c) => {
  const { limit } = parsePagination(c);
  const status = c.req.query("status");
  if (
    status &&
    ![...PARTNER_REVIEW_STATUSES, "admitted"].includes(
      status as (typeof PARTNER_REVIEW_STATUSES)[number] | "admitted",
    )
  ) {
    throw ApiError.validation({ status: ["Choose a valid partner status."] });
  }
  const cursor = decodeCursor(c.req.query("cursor"));
  const whereParts: string[] = [];
  const filterArgs: string[] = [];
  if (status) {
    whereParts.push("status = ?");
    filterArgs.push(status);
  }
  const countWhere = whereParts.length ? `WHERE ${whereParts.join(" AND ")}` : "";
  const total = await c.env.DB.prepare(
    `SELECT COUNT(*) AS n FROM partner_applications ${countWhere}`,
  )
    .bind(...filterArgs)
    .first<{ n: number }>();
  if (cursor) {
    whereParts.push("(created_at < ? OR (created_at = ? AND id < ?))");
    filterArgs.push(cursor.createdAt, cursor.createdAt, cursor.id);
  }
  const where = whereParts.length ? `WHERE ${whereParts.join(" AND ")}` : "";
  const rows = await c.env.DB.prepare(
    `SELECT id, ref, contact_name, email, phone, organization, website, partnership_type, region,
            capabilities, proposal, status, staff_note, portal_user_id, created_at, updated_at
       FROM partner_applications ${where}
      ORDER BY created_at DESC, id DESC LIMIT ?`,
  )
    .bind(...filterArgs, limit + 1)
    .all<PartnerRow>();
  const hasMore = rows.results.length > limit;
  const page = rows.results.slice(0, limit).map(partnerDto);
  const last = rows.results[limit - 1];
  const result: Paginated<ReturnType<typeof partnerDto>> = {
    items: page,
    total: total?.n ?? 0,
    ...(hasMore && last
      ? { nextCursor: encodeCursor({ createdAt: last.created_at, id: last.id }) }
      : {}),
  };
  return c.json(result);
});

/** Update a project lead's stage and private note; log every change for handovers. */
businessIntake.patch("/admin/projects/:id", requireAuth, requireAdmin, async (c) => {
  const actor = c.get("authUser");
  const { status, note } = await parseBody(c, projectUpdateSchema);
  const row = await c.env.DB.prepare(
    `SELECT id, ref, status, staff_note FROM project_inquiries WHERE id = ?`,
  )
    .bind(c.req.param("id"))
    .first<{ id: string; ref: string; status: string; staff_note: string }>();
  if (!row) throw ApiError.notFound("Project enquiry not found.");
  const nextNote = note ?? row.staff_note;
  const now = isoNow();
  await c.env.DB.batch([
    c.env.DB.prepare(
      `UPDATE project_inquiries SET status = ?, staff_note = ?, updated_at = ? WHERE id = ?`,
    ).bind(status, nextNote, now, row.id),
    c.env.DB.prepare(
      `INSERT INTO project_inquiry_events
        (id, inquiry_id, actor_email, action, from_status, to_status, note, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    ).bind(
      crypto.randomUUID(),
      row.id,
      actor.email,
      row.status === status ? "note_updated" : "status_changed",
      row.status,
      status,
      nextNote,
      now,
    ),
    c.env.DB.prepare(
      `INSERT INTO audit_log (id, actor, action, time, severity, sort_order)
       VALUES (?, ?, ?, ?, 'info', 0)`,
    ).bind(
      crypto.randomUUID(),
      actor.email,
      `Project enquiry ${row.ref}: ${row.status} → ${status}`,
      now,
    ),
  ]);
  return c.json({ ok: true, id: row.id, ref: row.ref, status, note: nextNote, updatedAt: now });
});

/** Update a prospective partner's review stage and private note. */
businessIntake.patch("/admin/partners/:id", requireAuth, requireAdmin, async (c) => {
  const actor = c.get("authUser");
  const { status, note } = await parseBody(c, partnerUpdateSchema);
  const row = await c.env.DB.prepare(
    `SELECT id, ref, status, staff_note FROM partner_applications WHERE id = ?`,
  )
    .bind(c.req.param("id"))
    .first<{ id: string; ref: string; status: string; staff_note: string }>();
  if (!row) throw ApiError.notFound("Partner application not found.");
  if (row.status === "admitted")
    throw ApiError.conflict("An admitted partner's stage cannot be changed here.");
  const nextNote = note ?? row.staff_note;
  const now = isoNow();
  await c.env.DB.batch([
    c.env.DB.prepare(
      `UPDATE partner_applications SET status = ?, staff_note = ?, updated_at = ? WHERE id = ?`,
    ).bind(status, nextNote, now, row.id),
    c.env.DB.prepare(
      `INSERT INTO partner_application_events
        (id, application_id, actor_email, action, from_status, to_status, note, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    ).bind(
      crypto.randomUUID(),
      row.id,
      actor.email,
      row.status === status ? "note_updated" : "status_changed",
      row.status,
      status,
      nextNote,
      now,
    ),
    c.env.DB.prepare(
      `INSERT INTO audit_log (id, actor, action, time, severity, sort_order)
       VALUES (?, ?, ?, ?, 'info', 0)`,
    ).bind(
      crypto.randomUUID(),
      actor.email,
      `Partner application ${row.ref}: ${row.status} → ${status}`,
      now,
    ),
  ]);
  return c.json({ ok: true, id: row.id, ref: row.ref, status, note: nextNote, updatedAt: now });
});

/**
 * Admit an approved partner. This is deliberately separate from screening:
 * the explicit action provisions only a missing partner-role account and
 * never silently changes an existing account with another role or status.
 */
businessIntake.post("/admin/partners/:id/admit", requireAuth, requireAdmin, async (c) => {
  const actor = c.get("authUser");
  const row = await c.env.DB.prepare(
    `SELECT id, ref, contact_name, email, status, portal_user_id
       FROM partner_applications WHERE id = ?`,
  )
    .bind(c.req.param("id"))
    .first<{
      id: string;
      ref: string;
      contact_name: string;
      email: string;
      status: string;
      portal_user_id: string | null;
    }>();
  if (!row) throw ApiError.notFound("Partner application not found.");
  const email = normalizeEmail(row.email);
  const existing = await c.env.DB.prepare(`SELECT id, role_key, status FROM users WHERE email = ?`)
    .bind(email)
    .first<{ id: string; role_key: string; status: string }>();

  if (row.status === "admitted") {
    if (!existing || existing.role_key !== "partner" || existing.status !== "active") {
      throw ApiError.conflict(
        "The partner account is no longer active; review the account before re-admitting.",
      );
    }
    let emailSent = false;
    try {
      emailSent = await sendAdmissionInstructions(c, row);
    } catch (error) {
      console.error("Partner admission email retry failed", error);
    }
    const now = isoNow();
    const note = emailSent
      ? "Admission sign-in instructions were resent."
      : "Admission sign-in instructions could not be delivered; contact the applicant directly.";
    await c.env.DB.batch([
      c.env.DB.prepare(
        `INSERT INTO partner_application_events
          (id, application_id, actor_email, action, from_status, to_status, note, created_at)
         VALUES (?, ?, ?, 'admission_email_resent', 'admitted', 'admitted', ?, ?)`,
      ).bind(crypto.randomUUID(), row.id, actor.email, note, now),
      c.env.DB.prepare(
        `INSERT INTO audit_log (id, actor, action, time, severity, sort_order)
         VALUES (?, ?, ?, ?, 'info', 0)`,
      ).bind(crypto.randomUUID(), actor.email, `Partner ${row.ref}: ${note}`, now),
    ]);
    return c.json({
      ok: true,
      ref: row.ref,
      status: "admitted",
      portalUserId: existing.id,
      emailSent,
    });
  }
  if (row.status !== "approved") {
    throw ApiError.conflict("Move this application to approved before admitting the partner.");
  }
  if (existing && (existing.role_key !== "partner" || existing.status !== "active")) {
    throw ApiError.conflict(
      "An account already exists for this email with a different role or status. Resolve that account manually before admission.",
    );
  }

  const now = isoNow();
  const userId = existing?.id ?? crypto.randomUUID();
  const statements = [];
  if (!existing) {
    statements.push(
      c.env.DB.prepare(
        `INSERT INTO users (id, name, email, role_key, status, created_at, updated_at)
         VALUES (?, ?, ?, 'partner', 'active', ?, ?)`,
      ).bind(userId, row.contact_name, email, now, now),
    );
  }
  statements.push(
    c.env.DB.prepare(
      `UPDATE partner_applications SET status = 'admitted', portal_user_id = ?, updated_at = ? WHERE id = ?`,
    ).bind(userId, now, row.id),
    c.env.DB.prepare(
      `INSERT INTO partner_application_events
        (id, application_id, actor_email, action, from_status, to_status, note, created_at)
       VALUES (?, ?, ?, 'admitted', 'approved', 'admitted', ?, ?)`,
    ).bind(crypto.randomUUID(), row.id, actor.email, `Partner account ${email} provisioned.`, now),
    c.env.DB.prepare(
      `INSERT INTO audit_log (id, actor, action, time, severity, sort_order)
       VALUES (?, ?, ?, ?, 'info', 0)`,
    ).bind(
      crypto.randomUUID(),
      actor.email,
      `Partner ${row.ref} admitted; partner account ${email} provisioned`,
      now,
    ),
  );
  try {
    await c.env.DB.batch(statements);
  } catch (error) {
    // Protect against two administrators provisioning the same email at once.
    if (!existing) {
      const raced = await c.env.DB.prepare(`SELECT id, role_key, status FROM users WHERE email = ?`)
        .bind(email)
        .first<{ id: string; role_key: string; status: string }>();
      if (raced) {
        throw ApiError.conflict(
          "An account was created while this application was being admitted. Refresh the queue and review that account.",
        );
      }
    }
    throw error;
  }

  let emailSent = false;
  try {
    emailSent = await sendAdmissionInstructions(c, row);
  } catch (error) {
    console.error("Partner admission email failed", error);
  }
  const emailNote = emailSent
    ? "Admission sign-in instructions were sent."
    : "Admission sign-in instructions were not delivered; contact the applicant directly.";
  await c.env.DB.prepare(
    `INSERT INTO partner_application_events
      (id, application_id, actor_email, action, from_status, to_status, note, created_at)
     VALUES (?, ?, ?, ?, 'admitted', 'admitted', ?, ?)`,
  )
    .bind(
      crypto.randomUUID(),
      row.id,
      actor.email,
      emailSent ? "admission_email_sent" : "admission_email_failed",
      emailNote,
      isoNow(),
    )
    .run();
  return c.json({ ok: true, ref: row.ref, status: "admitted", portalUserId: userId, emailSent });
});
