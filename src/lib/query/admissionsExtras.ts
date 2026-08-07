import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  fetchAdmDocOverview,
  fetchAdmChecks,
  fetchAdmCommOverview,
  fetchAdmTemplates,
  type AdmDocKpi,
  type AdmDocCheck,
  type AdmCommKpi,
  type AdmCommTemplate,
} from "@/lib/api/admissionsExtras";

export const admExtrasKeys = {
  all: ["admissions-extras-dashboard"] as const,
  docOverview: ["admissions-extras-dashboard", "docs", "overview"] as const,
  checks: ["admissions-extras-dashboard", "docs", "checks"] as const,
  commOverview: ["admissions-extras-dashboard", "comms", "overview"] as const,
  templates: ["admissions-extras-dashboard", "comms", "templates"] as const,
};

export function useAdmDocOverview() {
  return usePaginatedQuery<AdmDocKpi>(admExtrasKeys.docOverview, fetchAdmDocOverview);
}
export function useAdmDocOverviewItems(): AdmDocKpi[] {
  return flattenPages(useAdmDocOverview().data?.pages);
}
export function useAdmChecks() {
  return usePaginatedQuery<AdmDocCheck>(admExtrasKeys.checks, fetchAdmChecks);
}
export function useAdmCheckItems(): AdmDocCheck[] {
  return flattenPages(useAdmChecks().data?.pages);
}
export function useAdmCommOverview() {
  return usePaginatedQuery<AdmCommKpi>(admExtrasKeys.commOverview, fetchAdmCommOverview);
}
export function useAdmCommOverviewItems(): AdmCommKpi[] {
  return flattenPages(useAdmCommOverview().data?.pages);
}
export function useAdmTemplates() {
  return usePaginatedQuery<AdmCommTemplate>(admExtrasKeys.templates, fetchAdmTemplates);
}
export function useAdmTemplateItems(): AdmCommTemplate[] {
  return flattenPages(useAdmTemplates().data?.pages);
}

export type {
  AdmDocKpi,
  AdmDocCheck,
  AdmCommKpi,
  AdmCommTemplate,
} from "@/lib/api/admissionsExtras";
