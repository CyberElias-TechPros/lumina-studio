import { apiFetch } from "./client";
import type { Paginated } from "./types";

export interface AdmKpi {
  id: string;
  metric: string;
  valueLabel: string;
  delta: string;
}

export interface AdmKey {
  id: string;
  name: string;
  scope: string;
  lastUsed: string;
  status: string;
}

export interface AdmBackup {
  id: string;
  name: string;
  detail: string;
  status: string;
}

export interface AdmIntegration {
  id: string;
  name: string;
  detail: string;
  status: string;
}

export interface AdmRule {
  id: string;
  name: string;
  valueLabel: string;
  status: string;
}

function admPage<T>(path: string) {
  return (cursor?: string): Promise<Paginated<T>> =>
    apiFetch<Paginated<T>>(path, { query: { cursor } });
}

export const fetchAdmOverview = admPage<AdmKpi>("/v1/admin-systems-dashboard/overview");
export const fetchAdmKeys = admPage<AdmKey>("/v1/admin-systems-dashboard/keys");
export const fetchAdmBackups = admPage<AdmBackup>("/v1/admin-systems-dashboard/backups");
export const fetchAdmIntegrations = admPage<AdmIntegration>(
  "/v1/admin-systems-dashboard/integrations",
);
export const fetchAdmRules = admPage<AdmRule>("/v1/admin-systems-dashboard/rules");
export const fetchAdmServices = admPage<AdmService>("/v1/admin-systems-dashboard/services");

export interface AdmMetricCard {
  label: string;
  value: string;
  delta: string;
}

export interface AdmService {
  id: number;
  name: string;
  detail: string;
  status: string;
}

export interface AdmMetrics {
  cards: AdmMetricCard[];
  services: Array<{ name: string; status: string }>;
  generatedAt: string;
}

export function fetchAdmMetrics(): Promise<AdmMetrics> {
  return apiFetch<AdmMetrics>("/v1/admin-systems-dashboard/metrics");
}
