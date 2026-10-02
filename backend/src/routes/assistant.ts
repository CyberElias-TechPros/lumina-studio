/**
 * Public site assistant (chatbot).
 *
 *   GET  /v1/assistant/faq    suggested questions + greeting
 *   POST /v1/assistant/chat   { messages: [{role, content}] } → { answer }
 *
 * Public on purpose: prospects do not have accounts. Protection is layered:
 *   1. per-IP rate limit (KV)             — what one visitor can spend;
 *   2. global daily budget (KV)           — what the free AI tier can be made
 *      to spend in a day, so a script against this endpoint cannot exhaust it;
 *   3. bounded history + output tokens    — see lib/assistant.ts;
 *   4. no tools, no DB access: the model can only talk, and only from the
 *      generated facts block.
 *
 * When the model is unavailable (no key, provider error, budget spent) the
 * caller gets a deterministic, correct fallback answer — the widget never shows
 * a dead end.
 */
import { Hono } from "hono";
import type { Context } from "hono";
import { isoNow } from "../lib/crypto";
import { requireAdmin, requireAuth } from "../lib/auth";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import type { AppEnv } from "../types";
import { parseBody } from "../lib/validate";
import { RateLimitExceeded, hashIdentifier, rateLimit } from "../lib/rate-limit";
import { verifyTurnstile } from "../lib/turnstile";
import {
  FALLBACK_ANSWER,
  SUGGESTED_QUESTIONS,
  assistantReply,
  parseAssistantHistory,
} from "../lib/assistant";
import { z } from "zod";

export const assistant = new Hono<{ Bindings: AppEnv }>();

const chatSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string(),
    }),
  ),
  /** Optional context so the bot can name the course the visitor is reading. */
  page: z.string().trim().max(120).optional(),
  /**
   * Turnstile token for the *first* message of a conversation. Only enforced
   * when TURNSTILE_SECRET_KEY is configured (see lib/turnstile.ts), so the
   * widget keeps working with no keys bound.
   */
  turnstileToken: z.string().max(4000).optional(),
});

/** One visitor: 30 messages per 10 minutes is generous for a chat. */
const PER_IP = { limit: 30, windowSeconds: 600 };
/** Everyone together: protects the free tier. ~800 model calls/day. */
const DAILY_BUDGET = 800;

function clientIp(c: { req: { header: (name: string) => string | undefined } }): string {
  return (
    c.req.header("CF-Connecting-IP") ??
    c.req.header("x-real-ip") ??
    c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

function reply(
  c: Context<{ Bindings: AppEnv }>,
  body: Record<string, unknown>,
  status: ContentfulStatusCode = 200,
) {
  return c.json({ suggestions: SUGGESTED_QUESTIONS, ...body }, status);
}

/** Widget asks once for the greeting + starter questions. */
assistant.get("/intro", async (c) => {
  return c.json({
    enabled: await chatbotEnabled(c),
    greeting:
      "Hello 👋 I'm the Cyber Elias Academy assistant. Ask me about any course, fee, schedule or how to enrol — if I don't know, I'll point you to a human.",
    suggestions: SUGGESTED_QUESTIONS,
    whatsapp: "2349058628386",
    helpEmail: "help@cea.ng",
  });
});

/** FLAGS overrides win over the default; an unreadable KV leaves the default. */
async function chatbotEnabled(c: Context<{ Bindings: AppEnv }>): Promise<boolean> {
  try {
    const overrides = (await c.env.FLAGS.get("overrides", "json")) as Record<
      string,
      unknown
    > | null;
    const value = overrides?.["assistant.public"];
    return typeof value === "boolean" ? value : true;
  } catch {
    return true;
  }
}

assistant.post("/chat", async (c) => {
  if (!(await chatbotEnabled(c))) {
    return reply(c, { answer: FALLBACK_ANSWER, mock: true, disabled: true });
  }
  const ipHash = await hashIdentifier(clientIp(c));
  try {
    await rateLimit(c.env.RATE_LIMIT, "assistant", ipHash, PER_IP);
  } catch (err) {
    if (err instanceof RateLimitExceeded) {
      return reply(
        c,
        {
          answer:
            "I've answered quite a few messages from this device — to keep the assistant free for everyone, " +
            "please continue on WhatsApp: 0905 862 8386 (Mon–Sat, 8:00–20:00).",
          mock: true,
        },
        429,
      );
    }
    throw err;
  }

  const body = await parseBody(c, chatSchema);
  const parsed = parseAssistantHistory(body.messages);
  if (!parsed.ok) return reply(c, { answer: parsed.error, mock: true }, 400);

  // Human check on the first turn only: one solved challenge per conversation,
  // not one per message. No secret bound → this is a no-op.
  if (parsed.turns.length <= 1) {
    await verifyTurnstile(c, body.turnstileToken, clientIp(c));
  }

  // Global daily spend guard — one counter, reset at UTC midnight.
  const dayKey = `assistant:daily:${new Date().toISOString().slice(0, 10)}`;
  const used = Number((await c.env.RATE_LIMIT.get(dayKey)) ?? "0");
  if (used >= DAILY_BUDGET) {
    return reply(c, { answer: FALLBACK_ANSWER, mock: true });
  }
  await c.env.RATE_LIMIT.put(dayKey, String(used + 1), { expirationTtl: 60 * 60 * 26 });

  // Give the model the page the widget is on, without changing the turn shape.
  const history = parsed.turns.map((turn, i) =>
    body.page && i === parsed.turns.length - 1
      ? {
          ...turn,
          content: `${turn.content}\n\n(Context: this visitor is on the page ${body.page}.)`,
        }
      : turn,
  );

  const result = await assistantReply(c, history);
  const question = parsed.turns.at(-1)?.content ?? "";
  // Feedback loop: record what was asked and whether we could really answer.
  // Fire-and-forget — logging must never break the reply.
  c.executionCtx.waitUntil?.(
    c.env.DB.prepare(
      `INSERT INTO assistant_questions (id, question, answer_preview, fallback, page, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
    )
      .bind(
        crypto.randomUUID(),
        question.slice(0, 500),
        result.answer.slice(0, 200),
        result.mock ? 1 : 0,
        body.page ?? null,
        isoNow(),
      )
      .run()
      .catch(() => undefined),
  );
  return c.json({ suggestions: SUGGESTED_QUESTIONS, ...result });
});

/* ------------------------------------------------------------------ *
 * Feedback loop — what visitors ask, and what the bot could not answer.
 * ------------------------------------------------------------------ */

/** Admin: the questions log, plus the ones the bot had to hand to a human. */
assistant.get("/questions", requireAuth, requireAdmin, async (c) => {
  const days = Math.min(Math.max(Number(c.req.query("days") ?? 7) || 7, 1), 90);
  const since = new Date(Date.now() - days * 86_400_000).toISOString();
  const totals = await c.env.DB.prepare(
    `SELECT COUNT(*) AS asked, SUM(fallback) AS fallbacks FROM assistant_questions WHERE created_at >= ?`,
  )
    .bind(since)
    .first<{ asked: number; fallbacks: number | null }>();
  const top = await c.env.DB.prepare(
    `SELECT LOWER(TRIM(question)) AS q, COUNT(*) AS n
       FROM assistant_questions WHERE created_at >= ?
      GROUP BY LOWER(TRIM(question)) HAVING COUNT(*) > 1
      ORDER BY n DESC LIMIT 15`,
  )
    .bind(since)
    .all<{ q: string; n: number }>();
  const unanswered = await c.env.DB.prepare(
    `SELECT question, answer_preview, page, created_at FROM assistant_questions
      WHERE fallback = 1 AND created_at >= ? ORDER BY created_at DESC LIMIT 40`,
  )
    .bind(since)
    .all<{ question: string; answer_preview: string; page: string | null; created_at: string }>();
  const recent = await c.env.DB.prepare(
    `SELECT question, fallback, page, created_at FROM assistant_questions
      WHERE created_at >= ? ORDER BY created_at DESC LIMIT 40`,
  )
    .bind(since)
    .all<{ question: string; fallback: number; page: string | null; created_at: string }>();
  return c.json({
    days,
    asked: totals?.asked ?? 0,
    fallbacks: totals?.fallbacks ?? 0,
    topRepeated: top.results.map((r) => ({ question: r.q, count: r.n })),
    unanswered: unanswered.results.map((r) => ({
      question: r.question,
      answerPreview: r.answer_preview,
      page: r.page,
      createdAt: r.created_at,
    })),
    recent: recent.results.map((r) => ({
      question: r.question,
      fallback: Boolean(r.fallback),
      page: r.page,
      createdAt: r.created_at,
    })),
  });
});
