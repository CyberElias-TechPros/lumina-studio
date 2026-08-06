import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  fetchBdOverview,
  fetchBdInterventions,
  fetchBdFlows,
  fetchBdFlowSteps,
  fetchBdCampaigns,
  fetchBdTests,
  fetchBdResults,
  fetchBdStages,
  fetchBdSegments,
  fetchBdPrograms,
  fetchBdCheckins,
  type BdKpi,
  type BdIntervention,
  type BdFlow,
  type BdFlowStep,
  type BdCampaign,
  type BdTest,
  type BdResult,
  type BdStage,
  type BdSegment,
  type BdProgram,
  type BdCheckin,
} from "@/lib/api/behavioral";

export const bdKeys = {
  all: ["behavioral-dashboard"] as const,
  overview: ["behavioral-dashboard", "overview"] as const,
  interventions: ["behavioral-dashboard", "interventions"] as const,
  flows: ["behavioral-dashboard", "flows"] as const,
  flowSteps: ["behavioral-dashboard", "flow-steps"] as const,
  campaigns: ["behavioral-dashboard", "campaigns"] as const,
  tests: ["behavioral-dashboard", "tests"] as const,
  results: ["behavioral-dashboard", "results"] as const,
  stages: ["behavioral-dashboard", "stages"] as const,
  segments: ["behavioral-dashboard", "segments"] as const,
  programs: ["behavioral-dashboard", "programs"] as const,
  checkins: ["behavioral-dashboard", "checkins"] as const,
};

export function useBdOverview() {
  return usePaginatedQuery<BdKpi>(bdKeys.overview, fetchBdOverview);
}
export function useBdOverviewItems(): BdKpi[] {
  return flattenPages(useBdOverview().data?.pages);
}

export function useBdInterventions() {
  return usePaginatedQuery<BdIntervention>(bdKeys.interventions, fetchBdInterventions);
}
export function useBdInterventionItems(): BdIntervention[] {
  return flattenPages(useBdInterventions().data?.pages);
}

export function useBdFlows() {
  return usePaginatedQuery<BdFlow>(bdKeys.flows, fetchBdFlows);
}
export function useBdFlowItems(): BdFlow[] {
  return flattenPages(useBdFlows().data?.pages);
}

export function useBdFlowSteps() {
  return usePaginatedQuery<BdFlowStep>(bdKeys.flowSteps, fetchBdFlowSteps);
}
export function useBdFlowStepItems(): BdFlowStep[] {
  return flattenPages(useBdFlowSteps().data?.pages);
}

export function useBdCampaigns() {
  return usePaginatedQuery<BdCampaign>(bdKeys.campaigns, fetchBdCampaigns);
}
export function useBdCampaignItems(): BdCampaign[] {
  return flattenPages(useBdCampaigns().data?.pages);
}

export function useBdTests() {
  return usePaginatedQuery<BdTest>(bdKeys.tests, fetchBdTests);
}
export function useBdTestItems(): BdTest[] {
  return flattenPages(useBdTests().data?.pages);
}

export function useBdResults() {
  return usePaginatedQuery<BdResult>(bdKeys.results, fetchBdResults);
}
export function useBdResultItems(): BdResult[] {
  return flattenPages(useBdResults().data?.pages);
}

export function useBdStages() {
  return usePaginatedQuery<BdStage>(bdKeys.stages, fetchBdStages);
}
export function useBdStageItems(): BdStage[] {
  return flattenPages(useBdStages().data?.pages);
}

export function useBdSegments() {
  return usePaginatedQuery<BdSegment>(bdKeys.segments, fetchBdSegments);
}
export function useBdSegmentItems(): BdSegment[] {
  return flattenPages(useBdSegments().data?.pages);
}

export function useBdPrograms() {
  return usePaginatedQuery<BdProgram>(bdKeys.programs, fetchBdPrograms);
}
export function useBdProgramItems(): BdProgram[] {
  return flattenPages(useBdPrograms().data?.pages);
}

export function useBdCheckins() {
  return usePaginatedQuery<BdCheckin>(bdKeys.checkins, fetchBdCheckins);
}
export function useBdCheckinItems(): BdCheckin[] {
  return flattenPages(useBdCheckins().data?.pages);
}

export type {
  BdKpi,
  BdIntervention,
  BdFlow,
  BdFlowStep,
  BdCampaign,
  BdTest,
  BdResult,
  BdStage,
  BdSegment,
  BdProgram,
  BdCheckin,
} from "@/lib/api/behavioral";
