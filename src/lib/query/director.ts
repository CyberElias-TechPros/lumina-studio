import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  fetchDirOverview,
  fetchDirOkrs,
  fetchDirBranches,
  fetchDirModules,
  fetchDirSaved,
  type DirKpi,
  type DirOkr,
  type DirBranch,
  type DirModule,
  type DirSavedReport,
} from "@/lib/api/director";

export const dirKeys = {
  all: ["director-dashboard"] as const,
  overview: ["director-dashboard", "overview"] as const,
  okrs: ["director-dashboard", "okrs"] as const,
  branches: ["director-dashboard", "branches"] as const,
  modules: ["director-dashboard", "modules"] as const,
  saved: ["director-dashboard", "saved"] as const,
};

export function useDirOverview() {
  return usePaginatedQuery<DirKpi>(dirKeys.overview, fetchDirOverview);
}
export function useDirOverviewItems(): DirKpi[] {
  return flattenPages(useDirOverview().data?.pages);
}
export function useDirOkrs() {
  return usePaginatedQuery<DirOkr>(dirKeys.okrs, fetchDirOkrs);
}
export function useDirOkrItems(): DirOkr[] {
  return flattenPages(useDirOkrs().data?.pages);
}
export function useDirBranches() {
  return usePaginatedQuery<DirBranch>(dirKeys.branches, fetchDirBranches);
}
export function useDirBranchItems(): DirBranch[] {
  return flattenPages(useDirBranches().data?.pages);
}
export function useDirModules() {
  return usePaginatedQuery<DirModule>(dirKeys.modules, fetchDirModules);
}
export function useDirModuleItems(): DirModule[] {
  return flattenPages(useDirModules().data?.pages);
}
export function useDirSaved() {
  return usePaginatedQuery<DirSavedReport>(dirKeys.saved, fetchDirSaved);
}
export function useDirSavedItems(): DirSavedReport[] {
  return flattenPages(useDirSaved().data?.pages);
}

export type { DirKpi, DirOkr, DirBranch, DirModule, DirSavedReport } from "@/lib/api/director";
