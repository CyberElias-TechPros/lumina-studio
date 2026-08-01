import { Hono } from "hono";
import type { AppEnv } from "../types";
import { z } from "zod";
import { parseBody } from "../lib/validate";
import { rateLimit, hashIdentifier } from "../lib/rate-limit";
import { normalizeEmail } from "../db/client";

/**
 * Public contact + newsletter capture. Writes into the marketing `leads`
 * table (rate limited per IP) so the marketing suite sees real submissions.
 */

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  email: z.string().trim().email("Enter a valid email address."),
  message: z.string().trim().min(1, "Message is required."),
  kind: z.enum(["contact", "newsletter"]).optional().default("contact"),
});

export const contact = new Hono<{ Bindings: AppEnv }>();

contact.post("/", async (c) => {
  const body = await parseBody(c, contactSchema);
  const email = normalizeEmail(body.email);
  const ip = c.req.header("CF-Connecting-IP") ?? c.req.header("x-forwarded-for") ?? "unknown";
  const ipHash = await hashIdentifier(ip);
  await rateLimit(c.env.RATE_LIMIT, "contact", ipHash, { limit: 5, windowSeconds: 600 });

  const detail = body.kind === "newsletter"
    ? `Newsletter subscription: ${email}`
    : `Message from ${body.name} (${email}): ${body.message}`;

  await c.env.DB.prepare(
    `INSERT INTO leads (id, name, score, detail, sort_order)
     VALUES (?, ?, 0, ?, 0)`,
  )
    .bind(crypto.randomUUID(), body.name, detail)
    .run();

  return c.json({ ok: true, kind: body.kind }, 201);
});
