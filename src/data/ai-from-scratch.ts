/**
 * ─────────────────────────────────────────────────────────────────────────
 * AI Engineering from Scratch — CEA's curated gateway to the open,
 * MIT-licensed curriculum by Rohit Ghumare.
 *
 * Source:  https://github.com/rohitg00/ai-engineering-from-scratch
 * Site:    https://aiengineeringfromscratch.com
 * Licence: MIT — Copyright (c) 2026 Rohit Ghumare (see LICENSE in the source).
 *
 * Everything below was adapted for a beginner audience at Cyber Elias Academy.
 * Lesson counts per phase were read from the source tree on 2026-11-16.
 * Estimated times are the source's own lesson-time estimates.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const AI_SOURCE = {
  name: "AI Engineering from Scratch",
  author: "Rohit Ghumare",
  repo: "https://github.com/rohitg00/ai-engineering-from-scratch",
  site: "https://aiengineeringfromscratch.com",
  license: "MIT",
  totalLessons: 542,
  totalPhases: 20,
  languages: ["Python", "TypeScript", "Rust", "Julia", "Go"],
} as const;

export type AiPhase = {
  id: string;
  title: string;
  lessons: number;
  blurb: string;
  github: string;
};

const gh = (dir: string) => `${AI_SOURCE.repo}/tree/main/phases/${dir}`;

/** The 20 phases, in the source's own order. Lesson counts are real. */
export const aiPhases: AiPhase[] = [
  {
    id: "00-setup-and-tooling",
    title: "Setup & Tooling",
    lessons: 13,
    blurb: "A dev environment, Git, terminals and Linux — the unglamorous start.",
    github: gh("00-setup-and-tooling"),
  },
  {
    id: "01-math-foundations",
    title: "Math Foundations",
    lessons: 22,
    blurb: "Linear algebra, calculus and optimisation, taught for ML — with visuals.",
    github: gh("01-math-foundations"),
  },
  {
    id: "02-ml-fundamentals",
    title: "ML Fundamentals",
    lessons: 21,
    blurb: "Regression, classification, trees and evaluation from first principles.",
    github: gh("02-ml-fundamentals"),
  },
  {
    id: "03-deep-learning-core",
    title: "Deep Learning Core",
    lessons: 13,
    blurb: "Backprop, activations, normalisation and training dynamics.",
    github: gh("03-deep-learning-core"),
  },
  {
    id: "04-computer-vision",
    title: "Computer Vision",
    lessons: 28,
    blurb: "CNNs, detection, segmentation and image models.",
    github: gh("04-computer-vision"),
  },
  {
    id: "05-nlp-foundations-to-advanced",
    title: "NLP Foundations → Advanced",
    lessons: 29,
    blurb: "Tokens to transformers: the language-modelling stack, step by step.",
    github: gh("05-nlp-foundations-to-advanced"),
  },
  {
    id: "06-speech-and-audio",
    title: "Speech & Audio",
    lessons: 17,
    blurb: "Feature extraction, ASR, TTS and audio generation.",
    github: gh("06-speech-and-audio"),
  },
  {
    id: "07-transformers-deep-dive",
    title: "Transformers Deep Dive",
    lessons: 16,
    blurb: "Attention, RoPE, KV-cache and the architecture itself.",
    github: gh("07-transformers-deep-dive"),
  },
  {
    id: "08-generative-ai",
    title: "Generative AI",
    lessons: 15,
    blurb: "Diffusion, VAEs, GANs and modern generative pipelines.",
    github: gh("08-generative-ai"),
  },
  {
    id: "09-reinforcement-learning",
    title: "Reinforcement Learning",
    lessons: 12,
    blurb: "Value methods, policy gradients and RLHF — the machinery behind modern models.",
    github: gh("09-reinforcement-learning"),
  },
  {
    id: "10-llms-from-scratch",
    title: "LLMs from Scratch",
    lessons: 24,
    blurb: "Tokenizers, pretraining, SFT, RLHF and quantisation — build a mini GPT.",
    github: gh("10-llms-from-scratch"),
  },
  {
    id: "11-llm-engineering",
    title: "LLM Engineering",
    lessons: 17,
    blurb: "Prompts, structured output, RAG, evaluation, cost and guardrails.",
    github: gh("11-llm-engineering"),
  },
  {
    id: "12-multimodal-ai",
    title: "Multimodal AI",
    lessons: 25,
    blurb: "Vision-language models, audio and cross-modal systems.",
    github: gh("12-multimodal-ai"),
  },
  {
    id: "13-tools-and-protocols",
    title: "Tools & Protocols",
    lessons: 45,
    blurb: "Function calling, MCP, A2A, browser and computer-use protocols.",
    github: gh("13-tools-and-protocols"),
  },
  {
    id: "14-agent-engineering",
    title: "Agent Engineering",
    lessons: 54,
    blurb: "The agent loop, memory, planning, orchestration and failure modes.",
    github: gh("14-agent-engineering"),
  },
  {
    id: "15-autonomous-systems",
    title: "Autonomous Systems",
    lessons: 22,
    blurb: "Long-running autonomy, safety envelopes and oversight.",
    github: gh("15-autonomous-systems"),
  },
  {
    id: "16-multi-agent-and-swarms",
    title: "Multi-agent & Swarms",
    lessons: 25,
    blurb: "Coordination, debate, markets and swarm orchestration.",
    github: gh("16-multi-agent-and-swarms"),
  },
  {
    id: "17-infrastructure-and-production",
    title: "Infrastructure & Production",
    lessons: 29,
    blurb: "Serving, gateways, observability, rollout and cost control.",
    github: gh("17-infrastructure-and-production"),
  },
  {
    id: "18-ethics-safety-alignment",
    title: "Ethics, Safety & Alignment",
    lessons: 30,
    blurb: "Governance, evaluation, red-teaming and responsible deployment.",
    github: gh("18-ethics-safety-alignment"),
  },
  {
    id: "19-capstone-projects",
    title: "Capstone Projects",
    lessons: 85,
    blurb: "End-to-end builds that prove you can ship, not just follow along.",
    github: gh("19-capstone-projects"),
  },
];

export type AiRoute = {
  id: string;
  label: string;
  startingPoint: string;
  startingHref: string;
  summary: string;
};

/** The source's own three entry routes (mirrors its "Learning paths"). */
export const aiEntryRoutes: AiRoute[] = [
  {
    id: "model-foundations",
    label: "Model foundations",
    startingPoint: "Setup and tooling",
    startingHref: "/ai-engineering/00-setup-and-tooling/01-dev-environment",
    summary:
      "Start from zero: environment, math, ML fundamentals, deep learning, then build a mini language model from scratch.",
  },
  {
    id: "llm-systems",
    label: "LLM systems",
    startingPoint: "Prompt engineering",
    startingHref: "/ai-engineering/11-llm-engineering/01-prompt-engineering",
    summary:
      "Start from prompting: structured outputs, embeddings, retrieval (RAG), function calling, evaluation and guardrails.",
  },
  {
    id: "agents-delivery",
    label: "Agents & delivery",
    startingPoint: "The agent loop",
    startingHref: "/ai-engineering/14-agent-engineering/01-the-agent-loop",
    summary:
      "Start from the loop: tool use, memory, planning, orchestration, evaluation-driven development and multi-agent systems.",
  },
];

export type AiLesson = {
  phase: string;
  title: string;
  minutes: number;
  summary: string;
  href: string;
  tag: string;
};

/** Six lessons a CEA learner can start with — chosen for accessibility. */
export const aiFeaturedLessons: AiLesson[] = [
  {
    phase: "Phase 00 · Setup & Tooling",
    title: "Dev environment that actually works",
    minutes: 45,
    summary:
      "Editors, terminals, Git and Python environments. The unglamorous lesson every professional setup starts with — and most tutorials skip.",
    href: "/ai-engineering/00-setup-and-tooling/01-dev-environment",
    tag: "Start here",
  },
  {
    phase: "Phase 01 · Math Foundations",
    title: "Optimisation & gradient descent",
    minutes: 75,
    summary:
      "How learning really happens: descend a loss landscape in code and see why learning rates decide between crawling and blowing up. There is an interactive lab below.",
    href: "/ai-engineering/01-math-foundations/08-optimization",
    tag: "Interactive lab below",
  },
  {
    phase: "Phase 11 · LLM Engineering",
    title: "Prompt engineering that isn't guesswork",
    minutes: 90,
    summary:
      "Vague prompt vs engineered prompt, the anatomy of system messages, and why “you are a senior…” works. The single highest-leverage AI skill for office and creative work.",
    href: "/ai-engineering/11-llm-engineering/01-prompt-engineering",
    tag: "Highest leverage",
  },
  {
    phase: "Phase 11 · LLM Engineering",
    title: "RAG — answers grounded in your documents",
    minutes: 90,
    summary:
      "Retrieval-augmented generation: fetch the right passage first, then let the model answer from it. The architecture behind every serious company knowledge assistant.",
    href: "/ai-engineering/11-llm-engineering/06-rag",
    tag: "For projects",
  },
  {
    phase: "Phase 14 · Agent Engineering",
    title: "The agent loop",
    minutes: 60,
    summary:
      "An LLM returns text — it cannot act. The reason → act → observe loop is the engine inside every coding agent and automation you will touch this decade.",
    href: "/ai-engineering/14-agent-engineering/01-the-agent-loop",
    tag: "For the curious",
  },
  {
    phase: "Phase 14 · Agent Engineering",
    title: "Prompt injection defence",
    minutes: 75,
    summary:
      "The number-one way AI applications get broken in production. Required reading before any AI feature near your customers.",
    href: "/ai-engineering/14-agent-engineering/27-prompt-injection-defense",
    tag: "Before you ship",
  },
];

export type AiCareerRoute = {
  id: string;
  title: string;
  minutes: number;
  portfolioProof?: string;
  summary: string;
  learnHref: string;
};

/** Four of the source's career routes that fit CEA's tracks. */
export const aiCareerRoutes: AiCareerRoute[] = [
  {
    id: "applied-ai-engineer",
    title: "LLM Product Engineering",
    minutes: 885,
    portfolioProof: "Production LLM Feature",
    summary:
      "Turn language-model capability into evaluated, safe, cost-aware product behaviour that survives production traffic.",
    learnHref: `${AI_SOURCE.repo}/tree/main/learning-paths/applied-ai-engineer.json`,
  },
  {
    id: "agentic-ai-engineer",
    title: "Agent Systems Engineering",
    minutes: 865,
    portfolioProof: "Observable Agent System",
    summary:
      "Engineer tool-using agent loops with explicit context, memory, orchestration, safety, evaluation and production control.",
    learnHref: `${AI_SOURCE.repo}/tree/main/learning-paths/agentic-ai-engineer.json`,
  },
  {
    id: "using-coding-agents",
    title: "Agent-Assisted Engineering",
    minutes: 900,
    summary:
      "Frame, plan, execute, delegate, verify, review and improve coding-agent work inside real repositories.",
    learnHref: `${AI_SOURCE.repo}/tree/main/learning-paths/using-coding-agents.json`,
  },
  {
    id: "software-engineering-fundamentals",
    title: "Software Engineering Fundamentals",
    minutes: 730,
    summary:
      "The repository, debugging, testing, interface, security and release foundations every AI system depends on.",
    learnHref: `${AI_SOURCE.repo}/tree/main/learning-paths/software-engineering-fundamentals.json`,
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   Full lesson catalogue — every lesson hosted in-app under /ai-engineering.
   Titles/minutes are GENERATED by scripts/generate-ai-lessons.mjs into a
   git-ignored module; this file re-exports it so imports stay stable.
   ───────────────────────────────────────────────────────────────────────── */
import { AI_LESSON_INDEX } from "./ai-lessons-index.generated";

export type { AiLessonIndexEntry } from "./ai-lessons-index.generated";
export { AI_LESSON_INDEX, AI_LESSON_COUNT } from "./ai-lessons-index.generated";

export function findPhase(phaseId: string): AiPhase | undefined {
  return aiPhases.find((phase) => phase.id === phaseId);
}

/** Lessons in catalogue order (phase order, then lesson order) for one phase. */
export function phaseLessons(phaseId: string) {
  return AI_LESSON_INDEX.filter((entry) => entry.phase === phaseId);
}

/** Flattened previous/next navigation across the whole catalogue. */
export function findLessonNeighbors(phaseId: string, lessonSlug: string) {
  const index = AI_LESSON_INDEX.findIndex(
    (entry) => entry.phase === phaseId && entry.lesson === lessonSlug,
  );
  if (index === -1) return { previous: undefined, next: undefined };
  return {
    previous: index > 0 ? AI_LESSON_INDEX[index - 1] : undefined,
    next: index < AI_LESSON_INDEX.length - 1 ? AI_LESSON_INDEX[index + 1] : undefined,
  };
}

export type AiLessonModule = {
  slug: string;
  title: string;
  minutes: number | null;
  quiz: ReadonlyArray<{
    stage: string;
    question: string;
    options: string[];
    correct: number;
    explanation?: string;
  }> | null;
  html: string;
  canonical: string;
  codeUrl: string;
};
