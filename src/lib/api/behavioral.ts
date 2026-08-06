import { apiFetch } from "./client";
import type { Paginated } from "./types";

export interface BdKpi {
  id: string;
  metric: string;
  valueLabel: string;
  delta: string;
}

export interface BdIntervention {
  id: string;
  title: string;
  goal: string;
  mechanism: string;
  effort: string;
  evidence: string;
  testsRun: number;
  status: string;
}

export interface BdFlow {
  id: string;
  name: string;
  stage: number;
  status: string;
}

export interface BdFlowStep {
  id: string;
  flowId: string;
  stepNo: number;
  title: string;
  subtitle: string;
}

export interface BdCampaign {
  id: string;
  title: string;
  trigger: string;
  channel: string;
  sends: string;
  optOut: string;
  status: string;
}

export interface BdTest {
  id: string;
  name: string;
  variants: number;
  sampleLabel: string;
  liftLabel: string;
  sigLabel: string;
  status: string;
}

export interface BdResult {
  id: string;
  metric: string;
  baseline: string;
  changeLabel: string;
  status: string;
}

export interface BdStage {
  id: string;
  name: string;
  users: number;
  percent: number;
  status: string;
}

export interface BdSegment {
  id: string;
  name: string;
  size: number;
  traits: string;
  status: string;
}

export interface BdProgram {
  id: string;
  name: string;
  goal: string;
  streak: string;
  status: string;
}

export interface BdCheckin {
  id: string;
  learner: string;
  cycle: string;
  streak: string;
  status: string;
}

function bdPage<T>(path: string) {
  return (cursor?: string): Promise<Paginated<T>> =>
    apiFetch<Paginated<T>>(path, { query: { cursor } });
}

export const fetchBdOverview = bdPage<BdKpi>("/v1/behavioral-dashboard/overview");
export const fetchBdInterventions = bdPage<BdIntervention>(
  "/v1/behavioral-dashboard/interventions",
);
export const fetchBdFlows = bdPage<BdFlow>("/v1/behavioral-dashboard/flows");
export const fetchBdFlowSteps = bdPage<BdFlowStep>("/v1/behavioral-dashboard/flow-steps");
export const fetchBdCampaigns = bdPage<BdCampaign>("/v1/behavioral-dashboard/campaigns");
export const fetchBdTests = bdPage<BdTest>("/v1/behavioral-dashboard/tests");
export const fetchBdResults = bdPage<BdResult>("/v1/behavioral-dashboard/results");
export const fetchBdStages = bdPage<BdStage>("/v1/behavioral-dashboard/stages");
export const fetchBdSegments = bdPage<BdSegment>("/v1/behavioral-dashboard/segments");
export const fetchBdPrograms = bdPage<BdProgram>("/v1/behavioral-dashboard/programs");
export const fetchBdCheckins = bdPage<BdCheckin>("/v1/behavioral-dashboard/checkins");
