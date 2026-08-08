import { registerMock } from "@/lib/api/client";
import type { ApiRequestInit } from "@/lib/api/client";
import { ApiError } from "@/lib/errors";
import type {
  AiAskResponse,
  AiModelsResponse,
  AiRecommendation,
  GenerateResponse,
} from "@/lib/api/ai";

interface GradeResult {
  submissionId: string;
  score: number;
  maxScore: number;
  feedback: string;
  rubricBreakdown: { criteria: string; score: number; maxScore: number; note: string }[];
  model: string;
  mock: boolean;
}

function delay(milliseconds = 180): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

const MOCK_MODEL = "NVIDIA NIM (mock)";

const MOCK_FREE_MODELS: AiModelsResponse["models"] = [
  {
    id: "nvidia/llama-3.3-nemotron-super-49b-v1",
    label: "Llama 3.3 Nemotron Super",
    vendor: "NVIDIA",
    cost: "free",
  },
  { id: "meta/llama-3.3-70b-instruct", label: "Llama 3.3 70B", vendor: "Meta", cost: "free" },
  { id: "meta/llama-3.1-8b-instruct", label: "Llama 3.1 8B", vendor: "Meta", cost: "free" },
  { id: "qwen/qwen2.5-72b-instruct", label: "Qwen 2.5 72B", vendor: "Alibaba", cost: "free" },
  { id: "deepseek-ai/deepseek-r1", label: "DeepSeek R1", vendor: "DeepSeek", cost: "free" },
  { id: "microsoft/phi-4", label: "Phi-4 14B", vendor: "Microsoft", cost: "free" },
  {
    id: "mistralai/mistral-7b-instruct-v0.3",
    label: "Mistral 7B",
    vendor: "Mistral",
    cost: "free",
  },
];

export function registerAiMocks(): void {
  registerMock("GET", "/v1/ai/models", async () => {
    await delay(60);
    return {
      provider: "NVIDIA NIM",
      tier: "free",
      models: MOCK_FREE_MODELS,
      default: MOCK_FREE_MODELS[0].id,
      configured: MOCK_FREE_MODELS[0].id,
    } satisfies AiModelsResponse;
  });

  registerMock("POST", "/v1/ai/grade", async (init: ApiRequestInit) => {
    await delay(350);
    const input = (init.body ?? {}) as { submissionId?: string; rubric?: unknown };
    const submissionId = (input.submissionId ?? "").trim();
    if (submissionId.length === 0) {
      throw new ApiError(400, "FIELD_VALIDATION", "A submission is required.", {
        submissionId: ["A submission is required."],
      });
    }
    const rubric = Array.isArray(input.rubric) && input.rubric.length > 0 ? input.rubric : null;
    const maxScore = rubric
      ? (input.rubric as { maxScore: number }[]).reduce((sum, r) => sum + r.maxScore, 0)
      : 20;
    const score = Math.round(maxScore * 0.84);
    const result: GradeResult = {
      submissionId,
      score,
      maxScore,
      feedback:
        "Solid work — the structure is clear and the examples are relevant. Tighten the " +
        "conclusion and cite your sources inline to push this into distinction territory.",
      rubricBreakdown: rubric
        ? (rubric as { criteria: string; maxScore: number }[]).map((r) => ({
            criteria: r.criteria,
            score: Math.round(r.maxScore * 0.84),
            maxScore: r.maxScore,
            note: "Good coverage; a little more depth needed on this criterion.",
          }))
        : [],
      model: MOCK_MODEL,
      mock: true,
    };
    return result;
  });

  registerMock("GET", "/v1/ai/recommendations", async () => {
    await delay();
    const recommendations: AiRecommendation[] = [
      {
        id: "rec-1",
        title: "Backend, APIs & Databases",
        reason: "You're 2 lessons behind this week's goal — a 40-minute session closes the gap.",
        type: "course",
        href: "/app/learn",
      },
      {
        id: "rec-2",
        title: "Query Plan Sprint",
        reason: "Task 3 of this week's assignment is a query plan exercise. Practice with EXPLAIN.",
        type: "practice",
        href: "/app/assignments",
      },
      {
        id: "rec-3",
        title: "Portfolio Review Clinic",
        reason: "Your next live session — bring your deployed project for review.",
        type: "course",
        href: "/app/live/live-1",
      },
    ];
    return recommendations;
  });

  registerMock("POST", "/v1/ai/ask", async (init: ApiRequestInit) => {
    await delay(400);
    const input = (init.body ?? {}) as { question?: string };
    const question = (input.question ?? "").trim();
    if (question.length === 0) {
      throw new ApiError(400, "FIELD_VALIDATION", "Ask a question first.", {
        question: ["Ask a question first."],
      });
    }
    const answer: AiAskResponse = {
      answer:
        "A B-tree index is the default for most lookups — it keeps data sorted so range and " +
        "equality queries both stay fast. For a lookup-heavy table, put the indexed column " +
        "first in your WHERE clause and keep the index selective. Try running EXPLAIN on your " +
        "query to confirm the planner uses it.",
      sources: [
        { title: "Backend, APIs & Databases — Lesson 11", href: "/app/learn" },
        { title: "SQLite indexes (D1 docs)" },
      ],
      model: MOCK_MODEL,
      mock: true,
    };
    return answer;
  });

  registerMock("POST", "/v1/ai/generate", async (init: ApiRequestInit) => {
    await delay(450);
    const input = (init.body ?? {}) as {
      kind?: string;
      topic?: string;
      audience?: string;
    };
    const kind = (input.kind ?? "").trim();
    const topic = (input.topic ?? "").trim();
    if (kind.length === 0 || topic.length === 0) {
      throw new ApiError(400, "FIELD_VALIDATION", "A kind and a topic are required.");
    }
    const content: GenerateResponse = {
      kind,
      topic,
      content:
        kind === "quiz"
          ? {
              questions: [
                {
                  prompt: `What is the core idea behind ${topic}?`,
                  options: [
                    "Concept A — accurate summary",
                    "Concept B — plausible but wrong",
                    "Concept C — plausible but wrong",
                    "Concept D — plausible but wrong",
                  ],
                  answerIndex: 0,
                  explanation: "Option A summarises the core idea correctly.",
                },
              ],
            }
          : {
              intro: `A focused ${kind} on ${topic}, written for ${input.audience ?? "Cohort 15"}.`,
              sections: [
                { heading: "Why it matters", body: "Practical framing with one real example." },
                { heading: "Core concept", body: "Clear definition, diagram, and analogy." },
                { heading: "Practice", body: "Two exercises with worked answers." },
              ],
            },
      model: MOCK_MODEL,
      mock: true,
    };
    return content;
  });
}
