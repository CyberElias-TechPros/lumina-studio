import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import { fetchHrOverview, fetchHrPrograms, type HrKpi, type HrProgram } from "@/lib/api/hrTraining";

export const hrTrainingKeys = {
  all: ["hr-training-dashboard"] as const,
  overview: ["hr-training-dashboard", "overview"] as const,
  programs: ["hr-training-dashboard", "programs"] as const,
};

export function useHrOverview() {
  return usePaginatedQuery<HrKpi>(hrTrainingKeys.overview, fetchHrOverview);
}
export function useHrOverviewItems(): HrKpi[] {
  return flattenPages(useHrOverview().data?.pages);
}
export function useHrPrograms() {
  return usePaginatedQuery<HrProgram>(hrTrainingKeys.programs, fetchHrPrograms);
}
export function useHrProgramItems(): HrProgram[] {
  return flattenPages(useHrPrograms().data?.pages);
}

export type { HrKpi, HrProgram } from "@/lib/api/hrTraining";
