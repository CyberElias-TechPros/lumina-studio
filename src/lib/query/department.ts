import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  fetchDepOverview,
  fetchDepReports,
  fetchDepObservations,
  fetchDepFaculty,
  fetchDepCohorts,
  fetchDepPrograms,
  fetchDepEvents,
  fetchDepApprovals,
  type DepKpi,
  type DepReport,
  type DepObservation,
  type DepFacultyMember,
  type DepCohort,
  type DepProgram,
  type DepEvent,
  type DepApproval,
} from "@/lib/api/department";

export const depKeys = {
  all: ["department-dashboard"] as const,
  overview: ["department-dashboard", "overview"] as const,
  reports: ["department-dashboard", "reports"] as const,
  observations: ["department-dashboard", "observations"] as const,
  faculty: ["department-dashboard", "faculty"] as const,
  cohorts: ["department-dashboard", "cohorts"] as const,
  programs: ["department-dashboard", "programs"] as const,
  events: ["department-dashboard", "events"] as const,
  approvals: ["department-dashboard", "approvals"] as const,
};

export function useDepOverview() {
  return usePaginatedQuery<DepKpi>(depKeys.overview, fetchDepOverview);
}
export function useDepOverviewItems(): DepKpi[] {
  return flattenPages(useDepOverview().data?.pages);
}
export function useDepReports() {
  return usePaginatedQuery<DepReport>(depKeys.reports, fetchDepReports);
}
export function useDepReportItems(): DepReport[] {
  return flattenPages(useDepReports().data?.pages);
}
export function useDepObservations() {
  return usePaginatedQuery<DepObservation>(depKeys.observations, fetchDepObservations);
}
export function useDepObservationItems(): DepObservation[] {
  return flattenPages(useDepObservations().data?.pages);
}
export function useDepFaculty() {
  return usePaginatedQuery<DepFacultyMember>(depKeys.faculty, fetchDepFaculty);
}
export function useDepFacultyItems(): DepFacultyMember[] {
  return flattenPages(useDepFaculty().data?.pages);
}
export function useDepCohorts() {
  return usePaginatedQuery<DepCohort>(depKeys.cohorts, fetchDepCohorts);
}
export function useDepCohortItems(): DepCohort[] {
  return flattenPages(useDepCohorts().data?.pages);
}
export function useDepPrograms() {
  return usePaginatedQuery<DepProgram>(depKeys.programs, fetchDepPrograms);
}
export function useDepProgramItems(): DepProgram[] {
  return flattenPages(useDepPrograms().data?.pages);
}
export function useDepEvents() {
  return usePaginatedQuery<DepEvent>(depKeys.events, fetchDepEvents);
}
export function useDepEventItems(): DepEvent[] {
  return flattenPages(useDepEvents().data?.pages);
}
export function useDepApprovals() {
  return usePaginatedQuery<DepApproval>(depKeys.approvals, fetchDepApprovals);
}
export function useDepApprovalItems(): DepApproval[] {
  return flattenPages(useDepApprovals().data?.pages);
}

export type {
  DepKpi,
  DepReport,
  DepObservation,
  DepFacultyMember,
  DepCohort,
  DepProgram,
  DepEvent,
  DepApproval,
} from "@/lib/api/department";
