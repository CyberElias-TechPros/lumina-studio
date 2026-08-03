import { useMutation } from "@tanstack/react-query";
import { useApiQuery } from "@/lib/query/hooks";
import {
  askAssistant,
  fetchAiModels,
  fetchAiRecommendations,
  generateContent,
  gradeSubmission,
  type AiAskInput,
  type AiModelsResponse,
  type AiRecommendation,
  type GenerateInput,
  type GradeInput,
} from "@/lib/api/ai";

export const aiKeys = {
  recommendations: ["ai", "recommendations"] as const,
  models: ["ai", "models"] as const,
};

export function useAiRecommendations() {
  return useApiQuery<AiRecommendation[]>(aiKeys.recommendations, fetchAiRecommendations);
}

export function useAiModels() {
  return useApiQuery<AiModelsResponse>(aiKeys.models, fetchAiModels, { staleTime: 60_000 });
}

export function useGradeSubmission() {
  return useMutation({
    mutationFn: (input: GradeInput) => gradeSubmission(input),
  });
}

export function useAskAssistant() {
  return useMutation({
    mutationFn: (input: AiAskInput) => askAssistant(input),
  });
}

export function useGenerateContent() {
  return useMutation({
    mutationFn: (input: GenerateInput) => generateContent(input),
  });
}
