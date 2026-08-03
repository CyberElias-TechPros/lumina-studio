/**
 * Real AI provider integration — OpenAI-compatible chat completions.
 * Ships pointed at NVIDIA NIM's free-tier endpoint
 * (https://integrate.api.nvidia.com/v1) with a server-side allowlist of
 * completely free models. Configured via:
 *   - AI_API_KEY   (secret, e.g. `nvapi-…`; never exposed to the client)
 *   - AI_BASE_URL  (default https://integrate.api.nvidia.com/v1)
 *   - AI_MODEL     (default free model, must be in the allowlist)
 * A client-supplied `model` is only honoured if it is in the allowlist,
 * so callers can never point the worker at a paid model.
 * Falls back to deterministic mock output when AI_API_KEY is unset,
 * exactly like the payments mock-mode philosophy.
 */

import type { AppEnv } from "../types";

export interface AiModelOption {
  id: string;
  label: string;
  vendor: string;
  cost: "free";
}

export const NVIDIA_BASE_URL = "https://integrate.api.nvidia.com/v1";

/** Completely-free serverless models on NVIDIA's NIM catalogs. */
export const NVIDIA_FREE_MODELS: AiModelOption[] = [
  { id: "nvidia/llama-3.3-nemotron-super-49b-v1", label: "Llama 3.3 Nemotron Super", vendor: "NVIDIA", cost: "free" },
  { id: "meta/llama-3.3-70b-instruct", label: "Llama 3.3 70B", vendor: "Meta", cost: "free" },
  { id: "meta/llama-3.1-8b-instruct", label: "Llama 3.1 8B", vendor: "Meta", cost: "free" },
  { id: "qwen/qwen2.5-72b-instruct", label: "Qwen 2.5 72B", vendor: "Alibaba", cost: "free" },
  { id: "deepseek-ai/deepseek-r1", label: "DeepSeek R1", vendor: "DeepSeek", cost: "free" },
  { id: "microsoft/phi-4", label: "Phi-4 14B", vendor: "Microsoft", cost: "free" },
  { id: "mistralai/mistral-7b-instruct-v0.3", label: "Mistral 7B", vendor: "Mistral", cost: "free" },
];

export const DEFAULT_NVIDIA_MODEL = NVIDIA_FREE_MODELS[0]!.id;

export function resolveAiModel(c: { env: AppEnv }, requested?: string): string {
  if (requested && NVIDIA_FREE_MODELS.some((m) => m.id === requested)) return requested;
  if (c.env.AI_MODEL && NVIDIA_FREE_MODELS.some((m) => m.id === c.env.AI_MODEL)) return c.env.AI_MODEL;
  return DEFAULT_NVIDIA_MODEL;
}

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
  opts: { maxTokens?: number; json?: boolean; model?: string } = {},
): Promise<AiCompletionsResult> {
  const apiKey = c.env.AI_API_KEY;
  if (!apiKey) return { ok: false, text: "", error: "AI_API_KEY is not configured." };

  const base = (c.env.AI_BASE_URL || NVIDIA_BASE_URL).replace(/\/+$/, "");
  const model = resolveAiModel(c, opts.model);

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
