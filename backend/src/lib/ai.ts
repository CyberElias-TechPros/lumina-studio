/**
 * Real AI provider integration — OpenAI-compatible chat completions.
 * Configured via AI_API_KEY (secret), AI_BASE_URL (default
 * https://api.openai.com/v1) and AI_MODEL (default gpt-4o-mini).
 * Falls back to deterministic mock output when AI_API_KEY is unset,
 * exactly like the payments mock-mode philosophy.
 */

import type { AppEnv } from "../types";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AiCompletionsResult {
  ok: boolean;
  text: string;
  error?: string;
}

interface ChatCompletionsResponse {
  choices?: { message?: { content?: string } }[];
  error?: { message?: string };
}

export async function chatCompletion(
  c: { env: AppEnv },
  messages: ChatMessage[],
  opts: { maxTokens?: number; json?: boolean } = {},
): Promise<AiCompletionsResult> {
  const apiKey = c.env.AI_API_KEY;
  if (!apiKey) return { ok: false, text: "", error: "AI_API_KEY is not configured." };

  const base = (c.env.AI_BASE_URL || "https://api.openai.com/v1").replace(/\/+$/, "");
  const model = c.env.AI_MODEL || "gpt-4o-mini";

  try {
    const res = await fetch(`${base}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: opts.maxTokens ?? 1024,
        ...(opts.json ? { response_format: { type: "json_object" } } : {}),
      }),
    });
    if (!res.ok) return { ok: false, text: "", error: `HTTP ${res.status}` };
    const payload = (await res.json()) as ChatCompletionsResponse;
    const choice = payload.choices?.[0];
    const content = choice?.message?.content;
    if (!content) {
      return { ok: false, text: "", error: payload.error?.message ?? "Empty completion." };
    }
    return { ok: true, text: content.trim() };
  } catch (err) {
    return { ok: false, text: "", error: err instanceof Error ? err.message : "Unknown error." };
  }
}
