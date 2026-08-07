import { apiFetch } from "./client";
import type { Paginated } from "./types";

export interface AdmDocKpi {
  id: string;
  metric: string;
  valueLabel: string;
  delta: string;
}

export interface AdmDocCheck {
  id: string;
  name: string;
  detail: string;
  status: string;
}

export interface AdmCommKpi {
  id: string;
  metric: string;
  valueLabel: string;
  delta: string;
}

export interface AdmCommTemplate {
  id: string;
  title: string;
  usage: string;
  status: string;
}

function admExtrasPage<T>(path: string) {
  return (cursor?: string): Promise<Paginated<T>> =>
    apiFetch<Paginated<T>>(path, { query: { cursor } });
}

export const fetchAdmDocOverview = admExtrasPage<AdmDocKpi>(
  "/v1/admissions-extras-dashboard/docOverview",
);
export const fetchAdmChecks = admExtrasPage<AdmDocCheck>("/v1/admissions-extras-dashboard/checks");
export const fetchAdmCommOverview = admExtrasPage<AdmCommKpi>(
  "/v1/admissions-extras-dashboard/commOverview",
);
export const fetchAdmTemplates = admExtrasPage<AdmCommTemplate>(
  "/v1/admissions-extras-dashboard/templates",
);
