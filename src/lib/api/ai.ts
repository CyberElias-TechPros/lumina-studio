import { apiFetch } from "@/lib/api/client";

export interface GradeInput {
  submissionId: string;
  rubric?: { criteria: string; maxScore: number }[];
}

export interface GradeResult {
  submissionId: string;
  score: number;
  maxScore: number;
  feedback: string;
  rubricBreakdown: { criteria: string; score: number; maxScore: number; note: string }[];
  model: string;
  mock: boolean;
}

export interface AiRecommendation {
  id: string;
  title: string;
  reason: string;
  type: "course" | "lesson" | "career" | "book" | "practice";
  href?: string;
}

export interface AiAskInput {
  question: string;
  context?: { courseSlug?: string; lessonId?: string };
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
}

export interface GenerateResponse {
  kind: string;
  topic: string;
  content: unknown;
  model: string;
  mock: boolean;
}

export function gradeSubmission(input: GradeInput): Promise<GradeResult> {
  return apiFetch<GradeResult>("/v1/ai/grade", { method: "POST", body: input });
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
