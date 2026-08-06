import { apiFetch } from "./client";
import type { Paginated } from "./types";

export interface PmKpi {
  id: string;
  metric: string;
  valueLabel: string;
  delta: string;
}

export interface PmPhase {
  id: string;
  launch: string;
  phase: string;
  pct: number;
  status: string;
}

export interface PmTask {
  id: string;
  title: string;
  owner: string;
  status: string;
}

export interface PmGate {
  id: string;
  phase: string;
  gate: string;
  owner: string;
  dueLabel: string;
  status: string;
}

export interface PmStatement {
  id: string;
  product: string;
  statement: string;
  audience: string;
  pain: string;
  benefit: string;
}

export interface PmMessagehouseItem {
  id: string;
  label: string;
  value: string;
}

export interface PmCompetitor {
  id: string;
  name: string;
  focus: string;
  strength: string;
  weakness: string;
  notes: string;
}

export interface PmFeatureFlag {
  id: string;
  capability: string;
  cea: number;
  skilledge: number;
  aptbridge: number;
}

export interface PmLaunch {
  id: string;
  name: string;
  dateLabel: string;
  phase: string;
  owner: string;
  status: string;
}

export interface PmReadinessItem {
  id: string;
  label: string;
  pct: number;
  status: string;
}

export interface PmStudy {
  id: string;
  title: string;
  detail: string;
  sample: string;
  method: string;
  status: string;
}

export interface PmFinding {
  id: string;
  title: string;
  tag: string;
}

export interface PmMatrixRow {
  id: string;
  product: string;
  audience: string;
  message: string;
  proof: string;
  status: string;
}

export interface PmBrief {
  id: string;
  title: string;
  objective: string;
  audience: string;
  channels: string;
  metric: string;
  status: string;
}

export interface PmMonth {
  id: string;
  month: string;
  roi: string;
  winRate: string;
  pipeline: string;
  pct: number;
}

function pmPage<T>(path: string) {
  return (cursor?: string): Promise<Paginated<T>> =>
    apiFetch<Paginated<T>>(path, { query: { cursor } });
}

export const fetchPmOverview = pmPage<PmKpi>("/v1/product-marketing-dashboard/overview");
export const fetchPmPhases = pmPage<PmPhase>("/v1/product-marketing-dashboard/phases");
export const fetchPmTasks = pmPage<PmTask>("/v1/product-marketing-dashboard/tasks");
export const fetchPmGates = pmPage<PmGate>("/v1/product-marketing-dashboard/gates");
export const fetchPmStatements = pmPage<PmStatement>("/v1/product-marketing-dashboard/statements");
export const fetchPmMessagehouse = pmPage<PmMessagehouseItem>(
  "/v1/product-marketing-dashboard/messagehouse",
);
export const fetchPmCompetitors = pmPage<PmCompetitor>(
  "/v1/product-marketing-dashboard/competitors",
);
export const fetchPmFeatures = pmPage<PmFeatureFlag>("/v1/product-marketing-dashboard/features");
export const fetchPmLaunches = pmPage<PmLaunch>("/v1/product-marketing-dashboard/launches");
export const fetchPmReadiness = pmPage<PmReadinessItem>(
  "/v1/product-marketing-dashboard/readiness",
);
export const fetchPmStudies = pmPage<PmStudy>("/v1/product-marketing-dashboard/studies");
export const fetchPmFindings = pmPage<PmFinding>("/v1/product-marketing-dashboard/findings");
export const fetchPmMatrix = pmPage<PmMatrixRow>("/v1/product-marketing-dashboard/matrix");
export const fetchPmBriefs = pmPage<PmBrief>("/v1/product-marketing-dashboard/briefs");
export const fetchPmMonths = pmPage<PmMonth>("/v1/product-marketing-dashboard/months");
