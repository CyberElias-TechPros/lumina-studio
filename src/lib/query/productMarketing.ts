import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  fetchPmOverview,
  fetchPmPhases,
  fetchPmTasks,
  fetchPmGates,
  fetchPmStatements,
  fetchPmMessagehouse,
  fetchPmCompetitors,
  fetchPmFeatures,
  fetchPmLaunches,
  fetchPmReadiness,
  fetchPmStudies,
  fetchPmFindings,
  fetchPmMatrix,
  fetchPmBriefs,
  fetchPmMonths,
  type PmKpi,
  type PmPhase,
  type PmTask,
  type PmGate,
  type PmStatement,
  type PmMessagehouseItem,
  type PmCompetitor,
  type PmFeatureFlag,
  type PmLaunch,
  type PmReadinessItem,
  type PmStudy,
  type PmFinding,
  type PmMatrixRow,
  type PmBrief,
  type PmMonth,
} from "@/lib/api/productMarketing";

export const pmKeys = {
  all: ["product-marketing-dashboard"] as const,
  overview: ["product-marketing-dashboard", "overview"] as const,
  phases: ["product-marketing-dashboard", "phases"] as const,
  tasks: ["product-marketing-dashboard", "tasks"] as const,
  gates: ["product-marketing-dashboard", "gates"] as const,
  statements: ["product-marketing-dashboard", "statements"] as const,
  messagehouse: ["product-marketing-dashboard", "messagehouse"] as const,
  competitors: ["product-marketing-dashboard", "competitors"] as const,
  features: ["product-marketing-dashboard", "features"] as const,
  launches: ["product-marketing-dashboard", "launches"] as const,
  readiness: ["product-marketing-dashboard", "readiness"] as const,
  studies: ["product-marketing-dashboard", "studies"] as const,
  findings: ["product-marketing-dashboard", "findings"] as const,
  matrix: ["product-marketing-dashboard", "matrix"] as const,
  briefs: ["product-marketing-dashboard", "briefs"] as const,
  months: ["product-marketing-dashboard", "months"] as const,
};

export function usePmOverview() {
  return usePaginatedQuery<PmKpi>(pmKeys.overview, fetchPmOverview);
}
export function usePmOverviewItems(): PmKpi[] {
  return flattenPages(usePmOverview().data?.pages);
}

export function usePmPhases() {
  return usePaginatedQuery<PmPhase>(pmKeys.phases, fetchPmPhases);
}
export function usePmPhaseItems(): PmPhase[] {
  return flattenPages(usePmPhases().data?.pages);
}

export function usePmTasks() {
  return usePaginatedQuery<PmTask>(pmKeys.tasks, fetchPmTasks);
}
export function usePmTaskItems(): PmTask[] {
  return flattenPages(usePmTasks().data?.pages);
}

export function usePmGates() {
  return usePaginatedQuery<PmGate>(pmKeys.gates, fetchPmGates);
}
export function usePmGateItems(): PmGate[] {
  return flattenPages(usePmGates().data?.pages);
}

export function usePmStatements() {
  return usePaginatedQuery<PmStatement>(pmKeys.statements, fetchPmStatements);
}
export function usePmStatementItems(): PmStatement[] {
  return flattenPages(usePmStatements().data?.pages);
}

export function usePmMessagehouse() {
  return usePaginatedQuery<PmMessagehouseItem>(pmKeys.messagehouse, fetchPmMessagehouse);
}
export function usePmMessagehouseItems(): PmMessagehouseItem[] {
  return flattenPages(usePmMessagehouse().data?.pages);
}

export function usePmCompetitors() {
  return usePaginatedQuery<PmCompetitor>(pmKeys.competitors, fetchPmCompetitors);
}
export function usePmCompetitorItems(): PmCompetitor[] {
  return flattenPages(usePmCompetitors().data?.pages);
}

export function usePmFeatures() {
  return usePaginatedQuery<PmFeatureFlag>(pmKeys.features, fetchPmFeatures);
}
export function usePmFeatureItems(): PmFeatureFlag[] {
  return flattenPages(usePmFeatures().data?.pages);
}

export function usePmLaunches() {
  return usePaginatedQuery<PmLaunch>(pmKeys.launches, fetchPmLaunches);
}
export function usePmLaunchItems(): PmLaunch[] {
  return flattenPages(usePmLaunches().data?.pages);
}

export function usePmReadiness() {
  return usePaginatedQuery<PmReadinessItem>(pmKeys.readiness, fetchPmReadiness);
}
export function usePmReadinessItems(): PmReadinessItem[] {
  return flattenPages(usePmReadiness().data?.pages);
}

export function usePmStudies() {
  return usePaginatedQuery<PmStudy>(pmKeys.studies, fetchPmStudies);
}
export function usePmStudyItems(): PmStudy[] {
  return flattenPages(usePmStudies().data?.pages);
}

export function usePmFindings() {
  return usePaginatedQuery<PmFinding>(pmKeys.findings, fetchPmFindings);
}
export function usePmFindingItems(): PmFinding[] {
  return flattenPages(usePmFindings().data?.pages);
}

export function usePmMatrix() {
  return usePaginatedQuery<PmMatrixRow>(pmKeys.matrix, fetchPmMatrix);
}
export function usePmMatrixItems(): PmMatrixRow[] {
  return flattenPages(usePmMatrix().data?.pages);
}

export function usePmBriefs() {
  return usePaginatedQuery<PmBrief>(pmKeys.briefs, fetchPmBriefs);
}
export function usePmBriefItems(): PmBrief[] {
  return flattenPages(usePmBriefs().data?.pages);
}

export function usePmMonths() {
  return usePaginatedQuery<PmMonth>(pmKeys.months, fetchPmMonths);
}
export function usePmMonthItems(): PmMonth[] {
  return flattenPages(usePmMonths().data?.pages);
}

export type {
  PmKpi,
  PmPhase,
  PmTask,
  PmGate,
  PmStatement,
  PmMessagehouseItem,
  PmCompetitor,
  PmFeatureFlag,
  PmLaunch,
  PmReadinessItem,
  PmStudy,
  PmFinding,
  PmMatrixRow,
  PmBrief,
  PmMonth,
} from "@/lib/api/productMarketing";
