import { apiFetch } from "./client";
import type { Paginated } from "./types";

export interface DirKpi {
  id: string;
  metric: string;
  valueLabel: string;
  delta: string;
}

export interface DirOkr {
  id: string;
  objectiveLabel: string;
  krLabel: string;
  pct: number;
}

export interface DirBranch {
  id: string;
  name: string;
  utilization: string;
  cost: string;
  status: string;
}

export interface DirModule {
  id: string;
  name: string;
  detail: string;
}

export interface DirSavedReport {
  id: string;
  name: string;
  detail: string;
}

function dirPage<T>(path: string) {
  return (cursor?: string): Promise<Paginated<T>> =>
    apiFetch<Paginated<T>>(path, { query: { cursor } });
}

export const fetchDirOverview = dirPage<DirKpi>("/v1/director-dashboard/overview");
export const fetchDirOkrs = dirPage<DirOkr>("/v1/director-dashboard/okrs");
export const fetchDirBranches = dirPage<DirBranch>("/v1/director-dashboard/branches");
export const fetchDirModules = dirPage<DirModule>("/v1/director-dashboard/modules");
export const fetchDirSaved = dirPage<DirSavedReport>("/v1/director-dashboard/saved");
