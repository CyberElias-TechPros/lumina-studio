import { apiFetch } from "@/lib/api/client";

export interface AiRecommendation {
  id: string;
  title: string;
  reason: string;
  type: "course" | "lesson" | "career" | "book" | "practice";
  href?: string;
}

export interface AiModelOption {
  id: string;
  label: string;
  vendor: string;
  cost: "free";
}

export interface AiModelsResponse {
  provider: string;
  tier: "free";
  models: AiModelOption[];
  default: string;
  configured: string;
}

export interface AiAskInput {
  question: string;
  context?: { courseSlug?: string; lessonId?: string };
  model?: string;
}

export interface AiAskResponse {
  answer: string;
  sources?: { title: string; href?: string }[];
  model: string;
  mock: boolean;
}

export interface GenerateInput {
  kind: "lesson" | "outline" | "quiz";
  topic: string;
  audience?: string;
  model?: string;
}

export interface GenerateResponse {
  kind: string;
  topic: string;
  content: unknown;
  model: string;
  mock: boolean;
}

export function fetchAiModels(): Promise<AiModelsResponse> {
  return apiFetch<AiModelsResponse>("/v1/ai/models");
}

export function fetchAiRecommendations(): Promise<AiRecommendation[]> {
  return apiFetch<AiRecommendation[]>("/v1/ai/recommendations");
}

export function askAssistant(input: AiAskInput): Promise<AiAskResponse> {
  return apiFetch<AiAskResponse>("/v1/ai/ask", { method: "POST", body: input });
}

export function generateContent(input: GenerateInput): Promise<GenerateResponse> {
  return apiFetch<GenerateResponse>("/v1/ai/generate", { method: "POST", body: input });
}
