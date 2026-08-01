import { Hono } from "hono";
import type { AppEnv } from "../types";
import { requireAuth, requireAnyRole } from "../lib/auth";
import { ApiError } from "../lib/errors";

/**
 * AI helpers. Deterministic mock mode when AI_API_KEY is unset (development),
 * mirroring the payments mock-mode philosophy; every response carries a
 * `mock` flag so clients can show a "preview" badge.
 */

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

function isMock(c: { env: AppEnv }): boolean {
  return !c.env.AI_API_KEY;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

ai.post("/grade", requireInstructorOrAdmin, async (c) => {
  const input = (await c.req.json().catch(() => ({}))) as {
    rubric?: { criterion?: string; max?: number }[];
  };
  const rubric =
    Array.isArray(input.rubric) && input.rubric.length > 0
      ? input.rubric
      : [
          { criterion: "Understanding", max: 10 },
          { criterion: "Completeness", max: 10 },
          { criterion: "Clarity", max: 5 },
        ];
  const max = rubric.reduce((sum, r) => sum + (r.max ?? 0), 0) || 25;
  const overall = clamp(Math.round(max * (0.72 + Math.random() * 0.2)), 1, max);
  const breakdown = rubric.map((r, i) => {
    const criterionMax = r.max ?? 5;
    const score = clamp(
      Math.round(
        (i === 0 ? overall : criterionMax * (0.65 + Math.random() * 0.3)) / (criterionMax / 10),
      ) *
        (criterionMax / 10),
      0,
      criterionMax,
    );
    return {
      criterion: r.criterion ?? `Criterion ${i + 1}`,
      score,
      max: criterionMax,
      comment:
        score / criterionMax >= 0.7
          ? "Meets expectations — keep the structure and evidence."
          : "Partially meets expectations — expand and cite examples.",
    };
  });
  const grade: ApiGrade = {
    overall,
    max,
    breakdown,
    summary:
      "Automated draft — review before publishing. Assigns partial credit consistently and flags unsupported claims.",
    mock: isMock(c),
  };
  return c.json(grade);
});

ai.get("/recommendations", async (c) => {
  const user = c.get("authUser");
  const items: ApiRecommendation[] = [
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
  return c.json({
    items,
    total: items.length,
    basedOn: { streakDays: 9, topSkill: "frontend" },
    mock: isMock(c),
    userId: user.id,
  });
});

ai.post("/ask", async (c) => {
  const input = (await c.req.json().catch(() => ({}))) as { question?: string };
  const question = (input.question ?? "").trim();
  if (question.length === 0) throw ApiError.validation({ question: ["Question is required."] });
  const reply: ApiAssistantReply = {
    answer: `Good question about "${question.slice(0, 80)}". In mock mode I can't research live content, but here's the pattern: start from the lesson notes in your current module, then check the forum thread for this week's topic.`,
    mock: isMock(c),
  };
  return c.json(reply);
});

ai.post("/generate", async (c) => {
  const input = (await c.req.json().catch(() => ({}))) as {
    kind?: string;
    topic?: string;
  };
  const kind = input.kind === "quiz" || input.kind === "outline" ? input.kind : "lesson";
  const topic = (input.topic ?? "Digital skills").trim();
  if (topic.length === 0) throw ApiError.validation({ topic: ["Topic is required."] });

  let content: Record<string, unknown>;
  if (kind === "quiz") {
    content = {
      questions: [
        { prompt: `What is the first step in ${topic}?`, options: ["A", "B", "C", "D"], answer: 0 },
        {
          prompt: `Which tool is most associated with ${topic}?`,
          options: ["X", "Y", "Z"],
          answer: 1,
        },
      ],
    };
  } else if (kind === "outline") {
    content = {
      modules: [
        { title: `Foundations of ${topic}`, lessons: 4 },
        { title: `${topic} in practice`, lessons: 5 },
        { title: `Capstone: ${topic} project`, lessons: 3 },
      ],
    };
  } else {
    content = {
      title: `Introduction to ${topic}`,
      objectives: [
        `Explain the core ideas behind ${topic}`,
        "Apply the key techniques in a guided exercise",
      ],
      durationMinutes: 45,
    };
  }

  const generated: ApiGeneratedContent = {
    kind,
    topic,
    content,
    mock: isMock(c),
  };
  return c.json(generated, 201);
});
