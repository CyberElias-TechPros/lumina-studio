import { apiFetch } from "./client";
import type { Paginated } from "./types";

export interface DevKpi {
  id: string;
  metric: string;
  valueLabel: string;
  delta: string;
}

export interface DevEndpoint {
  id: string;
  endpoint: string;
  description: string;
}

export interface DevDeploy {
  id: string;
  versionLabel: string;
  status: string;
  timeLabel: string;
}

export interface DevPr {
  id: string;
  title: string;
  branch: string;
  status: string;
}

export interface DevError {
  id: string;
  title: string;
  countLabel: string;
  status: string;
}

export interface DevTask {
  id: string;
  title: string;
  detail: string;
  status: string;
}

export interface DevDep {
  id: string;
  name: string;
  version: string;
  status: string;
}

export interface DevReview {
  id: string;
  title: string;
  detail: string;
  status: string;
}

export interface DevVar {
  id: string;
  key: string;
  value: string;
  env: string;
}

export interface DevQueue {
  id: string;
  name: string;
  detail: string;
  status: string;
}

export interface DevDoc {
  id: string;
  title: string;
  updatedLabel: string;
}

function devPage<T>(path: string) {
  return (cursor?: string): Promise<Paginated<T>> =>
    apiFetch<Paginated<T>>(path, { query: { cursor } });
}

export const fetchDevOverview = devPage<DevKpi>("/v1/dev-dashboard/overview");
export const fetchDevEndpoints = devPage<DevEndpoint>("/v1/dev-dashboard/endpoints");
export const fetchDevDeploys = devPage<DevDeploy>("/v1/dev-dashboard/deploys");
export const fetchDevPrs = devPage<DevPr>("/v1/dev-dashboard/prs");
export const fetchDevErrors = devPage<DevError>("/v1/dev-dashboard/errors");
export const fetchDevTasks = devPage<DevTask>("/v1/dev-dashboard/tasks");
export const fetchDevDeps = devPage<DevDep>("/v1/dev-dashboard/deps");
export const fetchDevReviews = devPage<DevReview>("/v1/dev-dashboard/reviews");
export const fetchDevVars = devPage<DevVar>("/v1/dev-dashboard/vars");
export const fetchDevQueues = devPage<DevQueue>("/v1/dev-dashboard/queues");
export const fetchDevDocs = devPage<DevDoc>("/v1/dev-dashboard/docs");
