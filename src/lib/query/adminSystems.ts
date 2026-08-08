import { usePaginatedQuery, useApiQuery, flattenPages } from "@/lib/query/hooks";
import {
  fetchAdmOverview,
  fetchAdmKeys,
  fetchAdmBackups,
  fetchAdmIntegrations,
  fetchAdmRules,
  fetchAdmServices,
  fetchAdmMetrics,
  type AdmKpi,
  type AdmKey,
  type AdmBackup,
  type AdmIntegration,
  type AdmRule,
  type AdmService,
  type AdmMetrics,
} from "@/lib/api/adminSystems";

export const admKeys = {
  all: ["admin-systems-dashboard"] as const,
  overview: ["admin-systems-dashboard", "overview"] as const,
  keys: ["admin-systems-dashboard", "keys"] as const,
  backups: ["admin-systems-dashboard", "backups"] as const,
  integrations: ["admin-systems-dashboard", "integrations"] as const,
  rules: ["admin-systems-dashboard", "rules"] as const,
  services: ["admin-systems-dashboard", "services"] as const,
};

export function useAdmOverview() {
  return usePaginatedQuery<AdmKpi>(admKeys.overview, fetchAdmOverview);
}
export function useAdmOverviewItems(): AdmKpi[] {
  return flattenPages(useAdmOverview().data?.pages);
}
export function useAdmKeys() {
  return usePaginatedQuery<AdmKey>(admKeys.keys, fetchAdmKeys);
}
export function useAdmKeyItems(): AdmKey[] {
  return flattenPages(useAdmKeys().data?.pages);
}
export function useAdmBackups() {
  return usePaginatedQuery<AdmBackup>(admKeys.backups, fetchAdmBackups);
}
export function useAdmBackupItems(): AdmBackup[] {
  return flattenPages(useAdmBackups().data?.pages);
}
export function useAdmIntegrations() {
  return usePaginatedQuery<AdmIntegration>(admKeys.integrations, fetchAdmIntegrations);
}
export function useAdmIntegrationItems(): AdmIntegration[] {
  return flattenPages(useAdmIntegrations().data?.pages);
}
export function useAdmRules() {
  return usePaginatedQuery<AdmRule>(admKeys.rules, fetchAdmRules);
}
export function useAdmRuleItems(): AdmRule[] {
  return flattenPages(useAdmRules().data?.pages);
}
export function useAdmServices() {
  return usePaginatedQuery<AdmService>(admKeys.services, fetchAdmServices);
}
export function useAdmServiceItems(): AdmService[] {
  return flattenPages(useAdmServices().data?.pages);
}
export function useAdmMetrics() {
  return useApiQuery<AdmMetrics>(["admin-systems-dashboard", "metrics"], fetchAdmMetrics);
}

export type {
  AdmKpi,
  AdmKey,
  AdmBackup,
  AdmIntegration,
  AdmRule,
  AdmService,
  AdmMetrics,
} from "@/lib/api/adminSystems";
