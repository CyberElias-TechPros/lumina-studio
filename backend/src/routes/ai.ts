import { Hono } from "hono";
import type { AppEnv } from "../types";
import { requireAuth, requireAnyRole } from "../lib/auth";
import { ApiError } from "../lib/errors";
import { rateLimit, hashIdentifier } from "../lib/rate-limit";
import {
  chatCompletion,
  resolveAiModel,
  NVIDIA_FREE_MODELS,
  DEFAULT_NVIDIA_MODEL,
} from "../lib/ai";

/**
 * AI helpers. Uses NVIDIA NIM's free tier (OpenAI-compatible) when AI_API_KEY
 * is set; falls back to deterministic mock output otherwise (development).
 * Every response carries a `mock` flag so clients can show a "preview" badge.
 */

/** Per-user budget for LLM-backed endpoints (each call hits an external API). */
const AI_RATE_LIMIT = { limit: 20, windowSeconds: 600 };
const MAX_PROMPT_CHARS = 2_000;

/** Consume one unit of the per-user AI budget. Throws 429 (RateLimitExceeded) when over. */
async function limitAiUsage(env: AppEnv, userId: string): Promise<void> {
  const identifier = await hashIdentifier(`user:${userId}`);
  await rateLimit(env.RATE_LIMIT, "ai", identifier, AI_RATE_LIMIT);
}

export interface ApiGrade {
  overall: number;
  max: number;
  breakdown: { criterion: string; score: number; max: number; comment: string }[];
  summary: string;
  mock: boolean;
}

export interface ApiRecommendation {
  id: string;
  kind: string;
  title: string;
  reason: string;
  cta: string;
}

export interface ApiAssistantReply {
  answer: string;
  mock: boolean;
}

export interface ApiGeneratedContent {
  kind: string;
  topic: string;
  content: Record<string, unknown>;
  mock: boolean;
}

export const ai = new Hono<{ Bindings: AppEnv }>();

ai.use("*", requireAuth);
const requireInstructorOrAdmin = requireAnyRole(["instructor", "admin"]);

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function fallbackRubric(): { criterion: string; max: number }[] {
  return [
    { criterion: "Understanding", max: 10 },
    { criterion: "Completeness", max: 10 },
    { criterion: "Clarity", max: 5 },
  ];
}

function mockGrade(rubric: { criterion: string; max: number }[]): Omit<ApiGrade, "mock"> {
  const max = rubric.reduce((sum, r) => sum + r.max, 0) || 25;
  const overall = clamp(Math.round(max * (0.72 + Math.random() * 0.2)), 1, max);
  const breakdown = rubric.map((r, i) => {
    const score =
      i === 0
        ? Math.round((overall / max) * r.max)
        : clamp(Math.round(r.max * (0.65 + Math.random() * 0.3)), 0, r.max);
    return {
      criterion: r.criterion,
      score,
      max: r.max,
      comment:
        score / r.max >= 0.7
          ? "Meets expectations — keep the structure and evidence."
          : "Partially meets expectations — expand and cite examples.",
    };
  });
  return {
    overall,
    max,
    breakdown,
    summary:
      "Automated draft — review before publishing. Assigns partial credit consistently and flags unsupported claims.",
  };
}

function mockRecommendations(): ApiRecommendation[] {
  return [
    {
      id: "rec-1",
      kind: "course",
      title: "JavaScript Crash Course",
      reason: "Next in your learning path after 'Web Fundamentals'.",
      cta: "Continue learning",
    },
    {
      id: "rec-2",
      kind: "assignment",
      title: "Portfolio landing page brief",
      reason: "Similar to your strongest submission last week.",
      cta: "View brief",
    },
    {
      id: "rec-3",
      kind: "career",
      title: "LinkedIn profile clinic",
      reason: "Cohort 15 hiring partners are recruiting frontend interns.",
      cta: "Book a slot",
    },
  ];
}

ai.post("/grade", requireInstructorOrAdmin, async (c) => {
  await limitAiUsage(c.env, c.get("authUser").id);
  const input = (await c.req.json().catch(() => ({}))) as {
    rubric?: { criterion?: string; max?: number }[];
    model?: string;
  };
  const rubric =
    Array.isArray(input.rubric) && input.rubric.length > 0
      ? input.rubric.slice(0, 20).map((r) => ({
          criterion: String(r.criterion ?? "Criterion").slice(0, 200),
          max: r.max ?? 5,
        }))
      : fallbackRubric();
  const model = resolveAiModel(c, input.model);

  let mock = true;
  let body: Omit<ApiGrade, "mock"> = mockGrade(rubric);
  const res = await chatCompletion(
    c,
    [
      {
        role: "system",
        content:
          'You are a strict but fair instructor. Grade the work against the rubric. Reply with ONLY valid JSON matching {"overall":number,"max":number,"breakdown":[{"criterion":string,"score":number,"max":number,"comment":string}],"summary":string}. Scores must not exceed each criterion\'s max.',
      },
      {
        role: "user",
        content: `Rubric: ${JSON.stringify(rubric)}. Grade the submitted work accordingly.`,
      },
    ],
    { json: true, model },
  );
  if (res.ok) {
    try {
      const parsed = JSON.parse(res.text) as Omit<ApiGrade, "mock">;
      if (typeof parsed.overall === "number" && Array.isArray(parsed.breakdown)) {
        body = parsed;
        mock = false;
      }
    } catch {
      // fall through to mock
    }
  }
  return c.json({ ...body, mock, model } satisfies ApiGrade & { model: string });
});

ai.get("/recommendations", async (c) => {
  const user = c.get("authUser");
  await limitAiUsage(c.env, user.id);
  const url = new URL(c.req.url);
  const model = resolveAiModel(c, url.searchParams.get("model") ?? undefined);
  let items: ApiRecommendation[] = mockRecommendations();
  let mock = true;
  const res = await chatCompletion(
    c,
    [
      {
        role: "system",
        content:
          'You recommend courses, assignments and career actions for a student. Reply with ONLY valid JSON: an array of [{"id":string,"kind":"course"|"assignment"|"career","title":string,"reason":string,"cta":string}]. Max 4 items.',
      },
      { role: "user", content: `Student interests: frontend web development.` },
    ],
    { json: true, model },
  );
  if (res.ok) {
    try {
      const parsed = JSON.parse(res.text) as ApiRecommendation[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        items = parsed.slice(0, 4).map((r) => ({
          id: r.id ?? `rec-${Math.random().toString(36).slice(2, 6)}`,
          kind: r.kind ?? "course",
          title: r.title ?? "Suggested item",
          reason: r.reason ?? "",
          cta: r.cta ?? "View",
        }));
        mock = false;
      }
    } catch {
      // fall through to mock
    }
  }
  return c.json({ items, total: items.length, mock, model, userId: user.id });
});

ai.post("/ask", async (c) => {
  await limitAiUsage(c.env, c.get("authUser").id);
  const input = (await c.req.json().catch(() => ({}))) as {
    question?: string;
    model?: string;
  };
  const question = (input.question ?? "").trim();
  if (question.length === 0) throw ApiError.validation({ question: ["Question is required."] });
  if (question.length > MAX_PROMPT_CHARS) {
    throw ApiError.validation({
      question: [`Keep questions under ${MAX_PROMPT_CHARS} characters.`],
    });
  }
  const model = resolveAiModel(c, input.model);

  let answer = `Good question about "${question.slice(0, 80)}". In mock mode I can't research live content, but here's the pattern: start from the lesson notes in your current module, then check the forum thread for this week's topic.`;
  let mock = true;
  const res = await chatCompletion(
    c,
    [
      {
        role: "system",
        content:
          "You are a knowledgeable tutor assistant for a digital skills academy. Answer concisely (under 250 words) and practically, referencing lessons and careers where relevant.",
      },
      { role: "user", content: question },
    ],
    { model },
  );
  if (res.ok) {
    answer = res.text;
    mock = false;
  }
  return c.json({ answer, model, mock } satisfies ApiAssistantReply & { model: string });
});

function mockGenerated(kind: string, topic: string): Record<string, unknown> {
  if (kind === "quiz") {
    return {
      questions: [
        { prompt: `What is the first step in ${topic}?`, options: ["A", "B", "C", "D"], answer: 0 },
        {
          prompt: `Which tool is most associated with ${topic}?`,
          options: ["X", "Y", "Z"],
          answer: 1,
        },
      ],
    };
  }
  if (kind === "outline") {
    return {
      modules: [
        { title: `Foundations of ${topic}`, lessons: 4 },
        { title: `${topic} in practice`, lessons: 5 },
        { title: `Capstone: ${topic} project`, lessons: 3 },
      ],
    };
  }
  return {
    title: `Introduction to ${topic}`,
    objectives: [
      `Explain the core ideas behind ${topic}`,
      "Apply the key techniques in a guided exercise",
    ],
    durationMinutes: 45,
  };
}

ai.post("/generate", async (c) => {
  await limitAiUsage(c.env, c.get("authUser").id);
  const input = (await c.req.json().catch(() => ({}))) as {
    kind?: string;
    topic?: string;
    model?: string;
  };
  const kind = input.kind === "quiz" || input.kind === "outline" ? input.kind : "lesson";
  const topic = (input.topic ?? "Digital skills").trim();
  if (topic.length === 0) throw ApiError.validation({ topic: ["Topic is required."] });
  if (topic.length > MAX_PROMPT_CHARS) {
    throw ApiError.validation({
      topic: [`Keep topics under ${MAX_PROMPT_CHARS} characters.`],
    });
  }
  const model = resolveAiModel(c, input.model);

  let content: Record<string, unknown> = mockGenerated(kind, topic);
  let mock = true;
  const res = await chatCompletion(
    c,
    [
      {
        role: "system",
        content:
          'You are a curriculum designer. Generate course content. Reply with ONLY valid JSON. For kind=quiz: {"questions":[{"prompt":string,"options":string[],"answer":number}]}. For kind=outline: {"modules":[{"title":string,"lessons":number}]}. Otherwise: {"title":string,"objectives":string[],"durationMinutes":number}.',
      },
      { role: "user", content: `Generate ${kind} content about: ${topic}` },
    ],
    { json: true, model },
  );
  if (res.ok) {
    try {
      const parsed = JSON.parse(res.text) as Record<string, unknown>;
      if (parsed && typeof parsed === "object") {
        content = parsed;
        mock = false;
      }
    } catch {
      // fall through to mock
    }
  }
  return c.json(
    { kind, topic, content, model, mock } satisfies ApiGeneratedContent & { model: string },
    201,
  );
});

/** Free model choices, served to the app so students can pick a completely
 * free NVIDIA NIM model themselves. Never exposes the API key. */
ai.get("/models", async (c) => {
  const defaultModel = resolveAiModel(c);
  return c.json({
    provider: "NVIDIA NIM",
    tier: "free",
    models: NVIDIA_FREE_MODELS,
    default: DEFAULT_NVIDIA_MODEL,
    configured: defaultModel,
  });
});
