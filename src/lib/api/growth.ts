import { apiFetch } from "./client";
import type { Paginated } from "./types";

export interface GrwKpi {
  id: string;
  metric: string;
  valueLabel: string;
  delta: string;
}

export interface GrwSimulation {
  id: string;
  name: string;
  spend: string;
  conversionPct: number;
  learners: number;
  cac: string;
  revenue: string;
}

export interface GrwFunnelStage {
  id: string;
  name: string;
  visitors: number;
  percentage: number;
  delta: string;
}

export interface GrwExperiment {
  id: string;
  title: string;
  hypothesis: string;
  variant: string;
  result: string;
  status: string;
}

export interface GrwCohort {
  id: string;
  name: string;
  w1: number;
  w2: number | null;
  w3: number | null;
  w4: number | null;
  w5: number | null;
  w6: number | null;
}

export interface GrwChannel {
  id: string;
  name: string;
  cac: string;
  ltv: string;
  roas: string;
  spend: string;
}

export interface GrwReferralCampaign {
  id: string;
  name: string;
  reward: string;
  invites: number;
  conversions: number;
  paidOut: string;
  status: string;
}

export interface GrwSeoCluster {
  id: string;
  keyword: string;
  volume: number;
  rank: string;
  trend: string;
  priority: string;
}

function grwPage<T>(path: string) {
  return (cursor?: string): Promise<Paginated<T>> =>
    apiFetch<Paginated<T>>(path, { query: { cursor } });
}

export const fetchGrwOverview = grwPage<GrwKpi>("/v1/growth-dashboard/overview");
export const fetchGrwSimulations = grwPage<GrwSimulation>("/v1/growth-dashboard/simulations");
export const fetchGrwFunnel = grwPage<GrwFunnelStage>("/v1/growth-dashboard/funnel");
export const fetchGrwExperiments = grwPage<GrwExperiment>("/v1/growth-dashboard/experiments");
export const fetchGrwCohorts = grwPage<GrwCohort>("/v1/growth-dashboard/cohorts");
export const fetchGrwChannels = grwPage<GrwChannel>("/v1/growth-dashboard/channels");
export const fetchGrwReferrals = grwPage<GrwReferralCampaign>("/v1/growth-dashboard/referrals");
export const fetchGrwSeo = grwPage<GrwSeoCluster>("/v1/growth-dashboard/seo");
