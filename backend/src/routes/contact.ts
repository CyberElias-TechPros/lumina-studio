import { Hono } from "hono";
import type { AppEnv } from "../types";
import { z } from "zod";
import { parseBody } from "../lib/validate";
import { rateLimit, hashIdentifier } from "../lib/rate-limit";
import { normalizeEmail } from "../db/client";
import { verifyTurnstile } from "../lib/turnstile";
import { sendEmail } from "../lib/email";
import { emailLayout, escapeHtml } from "../lib/email-templates";

/**
 * Public contact + newsletter capture. Writes into the marketing `leads`
 * table (rate limited per IP) so the marketing suite sees real submissions.
 */

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(120, "Name is too long."),
  email: z.string().trim().email("Enter a valid email address.").max(254, "Email is too long."),
  message: z.string().trim().min(1, "Message is required.").max(5000, "Message is too long."),
  kind: z.enum(["contact", "newsletter"]).optional().default("contact"),
  turnstileToken: z.string().max(4000).optional(),
});

export const contact = new Hono<{ Bindings: AppEnv }>();

contact.post("/", async (c) => {
  const body = await parseBody(c, contactSchema);
  const email = normalizeEmail(body.email);
  const ip = c.req.header("CF-Connecting-IP") ?? c.req.header("x-forwarded-for") ?? "unknown";
  const ipHash = await hashIdentifier(ip);
  await rateLimit(c.env.RATE_LIMIT, "contact", ipHash, { limit: 5, windowSeconds: 600 });
  await verifyTurnstile(c, body.turnstileToken, ip);

  const detail =
    body.kind === "newsletter"
      ? `Newsletter subscription: ${email}`
      : `Message from ${body.name} (${email}): ${body.message}`;

  await c.env.DB.prepare(
    `INSERT INTO leads (id, name, score, detail, sort_order)
     VALUES (?, ?, 0, ?, 0)`,
  )
    .bind(crypto.randomUUID(), body.name, detail)
    .run();

  // Notifications are best-effort: the lead is already persisted.
  const notify = async () => {
    if (c.env.CONTACT_INBOX) {
      await sendEmail(c, {
        to: c.env.CONTACT_INBOX,
        subject:
          body.kind === "newsletter"
            ? `New newsletter subscriber: ${email}`
            : `New enquiry from ${body.name.slice(0, 80)}`,
        html: emailLayout({
          heading: body.kind === "newsletter" ? "New newsletter subscriber" : "New website enquiry",
          bodyHtml: `<p><strong>Name:</strong> ${escapeHtml(body.name)}<br/><strong>Email:</strong> ${escapeHtml(email)}</p>
<p style="white-space:pre-wrap">${escapeHtml(body.message)}</p>`,
        }),
      });
    }
    await sendEmail(c, {
      to: email,
      subject:
        body.kind === "newsletter"
          ? "You're subscribed to Cyber Elias Academy updates"
          : "We received your message — Cyber Elias Academy",
      html: emailLayout({
        heading: body.kind === "newsletter" ? "Thanks for subscribing" : "Thanks for reaching out",
        bodyHtml:
          body.kind === "newsletter"
            ? `<p>Hi ${escapeHtml(body.name)}, you'll now get program intakes, events and career resources from CEA.</p>`
            : `<p>Hi ${escapeHtml(body.name)}, we've received your message and a member of our team will reply within one working day.</p>`,
      }),
    });
  };
  const task = notify().catch((err) => console.error("contact notify failed", err));
  try {
    c.executionCtx.waitUntil(task);
  } catch {
    await task;
  }

  return c.json({ ok: true, kind: body.kind }, 201);
});
