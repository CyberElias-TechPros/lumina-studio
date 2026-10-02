/**
 * Email delivery abstraction for Cloudflare Workers. Providers are HTTP-only
 * (no SMTP): "resend" (default), "mailgun", or "console" (dev logging).
 * Configure via EMAIL_PROVIDER / EMAIL_API_KEY / EMAIL_FROM / EMAIL_DOMAIN.
 */

import type { AppEnv } from "../types";

export type EmailProvider = "resend" | "mailgun" | "console";

export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
  /**
   * Where a reply should land. Defaults to EMAIL_REPLY_TO (help@cea.ng) so a
   * student who replies to a receipt or reminder reaches a mailbox the academy
   * actually reads, instead of an unmonitored no-reply address.
   */
  replyTo?: string;
}

export interface EmailResult {
  sent: boolean;
  provider: EmailProvider;
  error?: string;
}

function configuredProvider(c: { env: AppEnv }): EmailProvider {
  const raw = (c.env.EMAIL_PROVIDER ?? "console").toLowerCase();
  return raw === "mailgun" || raw === "resend" || raw === "console" ? raw : "console";
}

async function sendResend(
  apiKey: string,
  from: string,
  msg: EmailMessage,
  replyTo?: string,
): Promise<EmailResult> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [msg.to],
      subject: msg.subject,
      html: msg.html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });
  if (!res.ok) return { sent: false, provider: "resend", error: `HTTP ${res.status}` };
  return { sent: true, provider: "resend" };
}

async function sendMailgun(
  apiKey: string,
  domain: string,
  from: string,
  msg: EmailMessage,
  replyTo?: string,
): Promise<EmailResult> {
  const body = new URLSearchParams({ from, to: msg.to, subject: msg.subject, html: msg.html });
  if (replyTo) body.set("h:Reply-To", replyTo);
  const res = await fetch(`https://api.mailgun.net/v3/${domain}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`api:${apiKey}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  if (!res.ok) return { sent: false, provider: "mailgun", error: `HTTP ${res.status}` };
  return { sent: true, provider: "mailgun" };
}

/** Send an email. Returns whether delivery was attempted successfully. */
export async function sendEmail(c: { env: AppEnv }, msg: EmailMessage): Promise<EmailResult> {
  const provider = configuredProvider(c);
  const from = c.env.EMAIL_FROM || "Cyber Elias Academy <help@cea.ng>";
  if (provider === "console") {
    console.log(
      `[email:console] to=${msg.to} replyTo=${msg.replyTo ?? c.env.EMAIL_REPLY_TO ?? "-"} subject=${msg.subject} html=${msg.html.slice(0, 500)}`,
    );
    return { sent: true, provider: "console" };
  }
  const apiKey = c.env.EMAIL_API_KEY;
  if (!apiKey) {
    return { sent: false, provider, error: "EMAIL_API_KEY is not configured." };
  }
  // A reply address the academy reads. Explicit per-message value wins.
  const replyTo = msg.replyTo ?? c.env.EMAIL_REPLY_TO ?? undefined;
  if (provider === "mailgun") {
    const domain = c.env.EMAIL_DOMAIN || "mail.cea.ng";
    return sendMailgun(apiKey, domain, from, msg, replyTo);
  }
  return sendResend(apiKey, from, msg, replyTo);
}

/** True when a real (non-console) provider is configured. */
export function hasRealEmail(c: { env: AppEnv }): boolean {
  const provider = configuredProvider(c);
  if (provider === "console") return false;
  return Boolean(c.env.EMAIL_API_KEY);
}

/** Build the absolute magic-link / reset URL for the user. */
export function appUrl(c: { env: AppEnv }, path: string): string {
  const base = (c.env.APP_URL || "https://cea.ng").replace(/\/+$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
