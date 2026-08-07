import { apiFetch } from "./client";
import type { Paginated } from "./types";

export interface HrKpi {
  id: string;
  metric: string;
  valueLabel: string;
  delta: string;
}

export interface HrProgram {
  id: string;
  name: string;
  detail: string;
  status: string;
}

function hrPage<T>(path: string) {
  return (cursor?: string): Promise<Paginated<T>> =>
    apiFetch<Paginated<T>>(path, { query: { cursor } });
}

export const fetchHrOverview = hrPage<HrKpi>("/v1/hr-training-dashboard/overview");
export const fetchHrPrograms = hrPage<HrProgram>("/v1/hr-training-dashboard/programs");
