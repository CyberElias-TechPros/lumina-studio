/**
 * SMS delivery for Cloudflare Workers (HTTP-only providers).
 *
 *   SMS_PROVIDER = "termii" (default — Nigerian carrier routes, DND-safe
 *                  "generic" channel) | "twilio" | "console" (logs only)
 *   SMS_API_KEY  = Termii API key, or Twilio "ACCOUNT_SID:AUTH_TOKEN"
 *   SMS_SENDER   = Termii sender ID / Twilio from-number
 *
 * With no key configured, messages are recorded as "skipped" and nothing is
 * sent — every caller treats SMS as best-effort. Every attempt is logged in
 * `sms_messages` for audit/debugging.
 */
import type { AppEnv } from "../types";
import { isoNow } from "./crypto";

export type SmsProvider = "termii" | "twilio" | "console";

export interface SmsResult {
  sent: boolean;
  provider: SmsProvider;
  status: "sent" | "failed" | "skipped";
  error?: string;
}

export function smsProvider(env: Pick<AppEnv, "SMS_PROVIDER">): SmsProvider {
  const raw = (env.SMS_PROVIDER ?? "termii").toLowerCase();
  return raw === "twilio" || raw === "console" ? raw : "termii";
}

export function hasSms(env: Pick<AppEnv, "SMS_PROVIDER" | "SMS_API_KEY">): boolean {
  return smsProvider(env) === "console" || Boolean(env.SMS_API_KEY);
}

/**
 * Normalise a Nigerian/international number to E.164 digits (no "+").
 * "0803 123 4567" → "2348031234567"; "+44 7700 900123" → "447700900123".
 * Returns null for anything that can't plausibly be a phone number.
 */
export function normalizePhone(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let digits = raw.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) digits = digits.slice(1);
  else if (digits.startsWith("00")) digits = digits.slice(2);
  else if (digits.startsWith("0") && digits.length === 11) digits = `234${digits.slice(1)}`;
  digits = digits.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) return null;
  return digits;
}

async function sendTermii(env: AppEnv, to: string, body: string): Promise<SmsResult> {
  const res = await fetch("https://api.ng.termii.com/api/sms/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: env.SMS_API_KEY,
      to,
      from: env.SMS_SENDER || "CEA",
      sms: body,
      type: "plain",
      channel: "generic",
    }),
  }).catch(() => null);
  if (!res?.ok) {
    return {
      sent: false,
      provider: "termii",
      status: "failed",
      error: `HTTP ${res?.status ?? "network"}`,
    };
  }
  return { sent: true, provider: "termii", status: "sent" };
}

async function sendTwilio(env: AppEnv, to: string, body: string): Promise<SmsResult> {
  const [sid, token] = (env.SMS_API_KEY ?? "").split(":");
  if (!sid || !token) {
    return {
      sent: false,
      provider: "twilio",
      status: "failed",
      error: "SMS_API_KEY must be SID:TOKEN",
    };
  }
  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${sid}:${token}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ To: `+${to}`, From: env.SMS_SENDER ?? "", Body: body }),
  }).catch(() => null);
  if (!res?.ok) {
    return {
      sent: false,
      provider: "twilio",
      status: "failed",
      error: `HTTP ${res?.status ?? "network"}`,
    };
  }
  return { sent: true, provider: "twilio", status: "sent" };
}

export async function sendSms(
  env: AppEnv,
  msg: { to: string | null | undefined; body: string; userId?: string },
): Promise<SmsResult> {
  const provider = smsProvider(env);
  const to = normalizePhone(msg.to);
  const body = msg.body.slice(0, 480); // ≤3 GSM segments
  let result: SmsResult;
  if (!to) {
    result = { sent: false, provider, status: "skipped", error: "No valid phone number" };
  } else if (provider === "console") {
    console.log(`[sms:console] to=${to} body=${body}`);
    result = { sent: true, provider, status: "sent" };
  } else if (!env.SMS_API_KEY) {
    result = { sent: false, provider, status: "skipped", error: "SMS_API_KEY not configured" };
  } else {
    try {
      result =
        provider === "twilio" ? await sendTwilio(env, to, body) : await sendTermii(env, to, body);
    } catch (err) {
      result = { sent: false, provider, status: "failed", error: String(err) };
    }
  }
  await env.DB.prepare(
    `INSERT INTO sms_messages (id, user_id, to_number, body, provider, status, error, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      crypto.randomUUID(),
      msg.userId ?? null,
      to ?? String(msg.to ?? ""),
      body,
      provider,
      result.status,
      result.error ?? "",
      isoNow(),
    )
    .run()
    .catch(() => undefined);
  return result;
}

/**
 * Send an SMS to a user only if they opted in (notification_preferences.sms_enabled)
 * and have a phone number. Quiet hours (WAT) are respected unless `urgent`.
 */
export async function sendUserSms(
  env: AppEnv,
  userId: string,
  body: string,
  opts: { urgent?: boolean; now?: Date } = {},
): Promise<SmsResult | null> {
  const row = await env.DB.prepare(
    `SELECT u.phone, COALESCE(p.sms_enabled, 0) AS sms_enabled,
            COALESCE(p.quiet_start, '21:00') AS quiet_start, COALESCE(p.quiet_end, '08:00') AS quiet_end
       FROM users u LEFT JOIN notification_preferences p ON p.user_id = u.id
      WHERE u.id = ? AND u.status = 'active'`,
  )
    .bind(userId)
    .first<{ phone: string | null; sms_enabled: number; quiet_start: string; quiet_end: string }>();
  if (!row || row.sms_enabled !== 1 || !row.phone) return null;
  if (!opts.urgent && inQuietHours(opts.now ?? new Date(), row.quiet_start, row.quiet_end))
    return null;
  return sendSms(env, { to: row.phone, body, userId });
}

/** Quiet-hours check in West Africa Time (UTC+1, no DST). */
export function inQuietHours(now: Date, start: string, end: string): boolean {
  const toMin = (hhmm: string) => {
    const [h = "0", m = "0"] = hhmm.split(":");
    return Number(h) * 60 + Number(m);
  };
  const wat = (now.getUTCHours() + 1) % 24;
  const minutes = wat * 60 + now.getUTCMinutes();
  const s = toMin(start);
  const e = toMin(end);
  if (s === e) return false;
  return s < e ? minutes >= s && minutes < e : minutes >= s || minutes < e;
}
