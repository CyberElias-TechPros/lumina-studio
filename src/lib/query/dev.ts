import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  fetchDevOverview,
  fetchDevEndpoints,
  fetchDevDeploys,
  fetchDevPrs,
  fetchDevErrors,
  fetchDevTasks,
  fetchDevDeps,
  fetchDevReviews,
  fetchDevVars,
  fetchDevQueues,
  fetchDevDocs,
  type DevKpi,
  type DevEndpoint,
  type DevDeploy,
  type DevPr,
  type DevError,
  type DevTask,
  type DevDep,
  type DevReview,
  type DevVar,
  type DevQueue,
  type DevDoc,
} from "@/lib/api/dev";

export const devKeys = {
  all: ["dev-dashboard"] as const,
  overview: ["dev-dashboard", "overview"] as const,
  endpoints: ["dev-dashboard", "endpoints"] as const,
  deploys: ["dev-dashboard", "deploys"] as const,
  prs: ["dev-dashboard", "prs"] as const,
  errors: ["dev-dashboard", "errors"] as const,
  tasks: ["dev-dashboard", "tasks"] as const,
  deps: ["dev-dashboard", "deps"] as const,
  reviews: ["dev-dashboard", "reviews"] as const,
  vars: ["dev-dashboard", "vars"] as const,
  queues: ["dev-dashboard", "queues"] as const,
  docs: ["dev-dashboard", "docs"] as const,
};

export function useDevOverview() {
  return usePaginatedQuery<DevKpi>(devKeys.overview, fetchDevOverview);
}
export function useDevOverviewItems(): DevKpi[] {
  return flattenPages(useDevOverview().data?.pages);
}

export function useDevEndpoints() {
  return usePaginatedQuery<DevEndpoint>(devKeys.endpoints, fetchDevEndpoints);
}
export function useDevEndpointItems(): DevEndpoint[] {
  return flattenPages(useDevEndpoints().data?.pages);
}

export function useDevDeploys() {
  return usePaginatedQuery<DevDeploy>(devKeys.deploys, fetchDevDeploys);
}
export function useDevDeployItems(): DevDeploy[] {
  return flattenPages(useDevDeploys().data?.pages);
}

export function useDevPrs() {
  return usePaginatedQuery<DevPr>(devKeys.prs, fetchDevPrs);
}
export function useDevPrItems(): DevPr[] {
  return flattenPages(useDevPrs().data?.pages);
}

export function useDevErrors() {
  return usePaginatedQuery<DevError>(devKeys.errors, fetchDevErrors);
}
export function useDevErrorItems(): DevError[] {
  return flattenPages(useDevErrors().data?.pages);
}

export function useDevTasks() {
  return usePaginatedQuery<DevTask>(devKeys.tasks, fetchDevTasks);
}
export function useDevTaskItems(): DevTask[] {
  return flattenPages(useDevTasks().data?.pages);
}

export function useDevDeps() {
  return usePaginatedQuery<DevDep>(devKeys.deps, fetchDevDeps);
}
export function useDevDepItems(): DevDep[] {
  return flattenPages(useDevDeps().data?.pages);
}

export function useDevReviews() {
  return usePaginatedQuery<DevReview>(devKeys.reviews, fetchDevReviews);
}
export function useDevReviewItems(): DevReview[] {
  return flattenPages(useDevReviews().data?.pages);
}

export function useDevVars() {
  return usePaginatedQuery<DevVar>(devKeys.vars, fetchDevVars);
}
export function useDevVarItems(): DevVar[] {
  return flattenPages(useDevVars().data?.pages);
}

export function useDevQueues() {
  return usePaginatedQuery<DevQueue>(devKeys.queues, fetchDevQueues);
}
export function useDevQueueItems(): DevQueue[] {
  return flattenPages(useDevQueues().data?.pages);
}

export function useDevDocs() {
  return usePaginatedQuery<DevDoc>(devKeys.docs, fetchDevDocs);
}
export function useDevDocItems(): DevDoc[] {
  return flattenPages(useDevDocs().data?.pages);
}

export type {
  DevKpi,
  DevEndpoint,
  DevDeploy,
  DevPr,
  DevError,
  DevTask,
  DevDep,
  DevReview,
  DevVar,
  DevQueue,
  DevDoc,
} from "@/lib/api/dev";
