import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  fetchGrwOverview,
  fetchGrwSimulations,
  fetchGrwFunnel,
  fetchGrwExperiments,
  fetchGrwCohorts,
  fetchGrwChannels,
  fetchGrwReferrals,
  fetchGrwSeo,
  type GrwKpi,
  type GrwSimulation,
  type GrwFunnelStage,
  type GrwExperiment,
  type GrwCohort,
  type GrwChannel,
  type GrwReferralCampaign,
  type GrwSeoCluster,
} from "@/lib/api/growth";

export const grwKeys = {
  all: ["growth-dashboard"] as const,
  overview: ["growth-dashboard", "overview"] as const,
  simulations: ["growth-dashboard", "simulations"] as const,
  funnel: ["growth-dashboard", "funnel"] as const,
  experiments: ["growth-dashboard", "experiments"] as const,
  cohorts: ["growth-dashboard", "cohorts"] as const,
  channels: ["growth-dashboard", "channels"] as const,
  referrals: ["growth-dashboard", "referrals"] as const,
  seo: ["growth-dashboard", "seo"] as const,
};

export function useGrwOverview() {
  return usePaginatedQuery<GrwKpi>(grwKeys.overview, fetchGrwOverview);
}
export function useGrwOverviewItems(): GrwKpi[] {
  return flattenPages(useGrwOverview().data?.pages);
}
export function useGrwSimulations() {
  return usePaginatedQuery<GrwSimulation>(grwKeys.simulations, fetchGrwSimulations);
}
export function useGrwSimulationItems(): GrwSimulation[] {
  return flattenPages(useGrwSimulations().data?.pages);
}
export function useGrwFunnel() {
  return usePaginatedQuery<GrwFunnelStage>(grwKeys.funnel, fetchGrwFunnel);
}
export function useGrwFunnelItems(): GrwFunnelStage[] {
  return flattenPages(useGrwFunnel().data?.pages);
}
export function useGrwExperiments() {
  return usePaginatedQuery<GrwExperiment>(grwKeys.experiments, fetchGrwExperiments);
}
export function useGrwExperimentItems(): GrwExperiment[] {
  return flattenPages(useGrwExperiments().data?.pages);
}
export function useGrwCohorts() {
  return usePaginatedQuery<GrwCohort>(grwKeys.cohorts, fetchGrwCohorts);
}
export function useGrwCohortItems(): GrwCohort[] {
  return flattenPages(useGrwCohorts().data?.pages);
}
export function useGrwChannels() {
  return usePaginatedQuery<GrwChannel>(grwKeys.channels, fetchGrwChannels);
}
export function useGrwChannelItems(): GrwChannel[] {
  return flattenPages(useGrwChannels().data?.pages);
}
export function useGrwReferrals() {
  return usePaginatedQuery<GrwReferralCampaign>(grwKeys.referrals, fetchGrwReferrals);
}
export function useGrwReferralItems(): GrwReferralCampaign[] {
  return flattenPages(useGrwReferrals().data?.pages);
}
export function useGrwSeo() {
  return usePaginatedQuery<GrwSeoCluster>(grwKeys.seo, fetchGrwSeo);
}
export function useGrwSeoItems(): GrwSeoCluster[] {
  return flattenPages(useGrwSeo().data?.pages);
}

export type {
  GrwKpi,
  GrwSimulation,
  GrwFunnelStage,
  GrwExperiment,
  GrwCohort,
  GrwChannel,
  GrwReferralCampaign,
  GrwSeoCluster,
} from "@/lib/api/growth";
