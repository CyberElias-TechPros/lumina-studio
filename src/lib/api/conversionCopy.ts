import { apiFetch } from "./client";
import type { Paginated } from "./types";

export interface CcpKpi {
  id: string;
  metric: string;
  valueLabel: string;
  delta: string;
}

export interface CcpAsset {
  id: string;
  title: string;
  category: string;
  variants: number;
  lastUsed: string;
  status: string;
}

export interface CcpRule {
  id: string;
  name: string;
  category: string;
  detail: string;
  status: string;
}

export interface CcpSequence {
  id: string;
  title: string;
  emails: number;
  openRate: string;
  clickRate: string;
  status: string;
}

export interface CcpBrief {
  id: string;
  title: string;
  requester: string;
  dateLabel: string;
  status: string;
}

export interface CcpAnalyticsRow {
  id: string;
  stage: string;
  visits: string;
  conversion: string;
  delta: string;
}

export interface CcpAd {
  id: string;
  name: string;
  channel: string;
  ctr: string;
  variants: number;
  status: string;
}

export interface CcpTest {
  id: string;
  title: string;
  result: string;
  status: string;
}

export interface CcpSection {
  id: string;
  title: string;
  copy: string;
  conversion: string;
  status: string;
}

function ccpPage<T>(path: string) {
  return (cursor?: string): Promise<Paginated<T>> =>
    apiFetch<Paginated<T>>(path, { query: { cursor } });
}

export const fetchCcpOverview = ccpPage<CcpKpi>("/v1/conversion-copy-dashboard/overview");
export const fetchCcpAssets = ccpPage<CcpAsset>("/v1/conversion-copy-dashboard/assets");
export const fetchCcpRules = ccpPage<CcpRule>("/v1/conversion-copy-dashboard/rules");
export const fetchCcpSequences = ccpPage<CcpSequence>("/v1/conversion-copy-dashboard/sequences");
export const fetchCcpBriefs = ccpPage<CcpBrief>("/v1/conversion-copy-dashboard/briefs");
export const fetchCcpAnalytics = ccpPage<CcpAnalyticsRow>(
  "/v1/conversion-copy-dashboard/analytics",
);
export const fetchCcpAds = ccpPage<CcpAd>("/v1/conversion-copy-dashboard/ads");
export const fetchCcpTests = ccpPage<CcpTest>("/v1/conversion-copy-dashboard/tests");
export const fetchCcpSections = ccpPage<CcpSection>("/v1/conversion-copy-dashboard/sections");
