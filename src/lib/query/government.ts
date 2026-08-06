import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  fetchGovOverview,
  fetchGovCalendar,
  fetchGovChanges,
  fetchGovDocuments,
  fetchGovFacts,
  fetchGovReports,
  fetchGovThreads,
  fetchGovChecks,
  fetchGovAudits,
  fetchGovFilings,
  fetchGovCourses,
  type GovKpi,
  type GovEvent,
  type GovChange,
  type GovDocument,
  type GovFact,
  type GovReport,
  type GovThread,
  type GovCheck,
  type GovAudit,
  type GovFiling,
  type GovCourse,
} from "@/lib/api/government";

export const govKeys = {
  all: ["government-dashboard"] as const,
  overview: ["government-dashboard", "overview"] as const,
  calendar: ["government-dashboard", "calendar"] as const,
  changes: ["government-dashboard", "changes"] as const,
  documents: ["government-dashboard", "documents"] as const,
  facts: ["government-dashboard", "facts"] as const,
  reports: ["government-dashboard", "reports"] as const,
  threads: ["government-dashboard", "threads"] as const,
  checks: ["government-dashboard", "checks"] as const,
  audits: ["government-dashboard", "audits"] as const,
  filings: ["government-dashboard", "filings"] as const,
  courses: ["government-dashboard", "courses"] as const,
};

export function useGovOverview() {
  return usePaginatedQuery<GovKpi>(govKeys.overview, fetchGovOverview);
}
export function useGovOverviewItems(): GovKpi[] {
  return flattenPages(useGovOverview().data?.pages);
}

export function useGovCalendar() {
  return usePaginatedQuery<GovEvent>(govKeys.calendar, fetchGovCalendar);
}
export function useGovCalendarItems(): GovEvent[] {
  return flattenPages(useGovCalendar().data?.pages);
}

export function useGovChanges() {
  return usePaginatedQuery<GovChange>(govKeys.changes, fetchGovChanges);
}
export function useGovChangeItems(): GovChange[] {
  return flattenPages(useGovChanges().data?.pages);
}

export function useGovDocuments() {
  return usePaginatedQuery<GovDocument>(govKeys.documents, fetchGovDocuments);
}
export function useGovDocumentItems(): GovDocument[] {
  return flattenPages(useGovDocuments().data?.pages);
}

export function useGovFacts() {
  return usePaginatedQuery<GovFact>(govKeys.facts, fetchGovFacts);
}
export function useGovFactItems(): GovFact[] {
  return flattenPages(useGovFacts().data?.pages);
}

export function useGovReports() {
  return usePaginatedQuery<GovReport>(govKeys.reports, fetchGovReports);
}
export function useGovReportItems(): GovReport[] {
  return flattenPages(useGovReports().data?.pages);
}

export function useGovThreads() {
  return usePaginatedQuery<GovThread>(govKeys.threads, fetchGovThreads);
}
export function useGovThreadItems(): GovThread[] {
  return flattenPages(useGovThreads().data?.pages);
}

export function useGovChecks() {
  return usePaginatedQuery<GovCheck>(govKeys.checks, fetchGovChecks);
}
export function useGovCheckItems(): GovCheck[] {
  return flattenPages(useGovChecks().data?.pages);
}

export function useGovAudits() {
  return usePaginatedQuery<GovAudit>(govKeys.audits, fetchGovAudits);
}
export function useGovAuditItems(): GovAudit[] {
  return flattenPages(useGovAudits().data?.pages);
}

export function useGovFilings() {
  return usePaginatedQuery<GovFiling>(govKeys.filings, fetchGovFilings);
}
export function useGovFilingItems(): GovFiling[] {
  return flattenPages(useGovFilings().data?.pages);
}

export function useGovCourses() {
  return usePaginatedQuery<GovCourse>(govKeys.courses, fetchGovCourses);
}
export function useGovCourseItems(): GovCourse[] {
  return flattenPages(useGovCourses().data?.pages);
}

export type {
  GovKpi,
  GovEvent,
  GovChange,
  GovDocument,
  GovFact,
  GovReport,
  GovThread,
  GovCheck,
  GovAudit,
  GovFiling,
  GovCourse,
} from "@/lib/api/government";
