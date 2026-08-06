import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  fetchCcpOverview,
  fetchCcpAssets,
  fetchCcpRules,
  fetchCcpSequences,
  fetchCcpBriefs,
  fetchCcpAnalytics,
  fetchCcpAds,
  fetchCcpTests,
  fetchCcpSections,
  type CcpKpi,
  type CcpAsset,
  type CcpRule,
  type CcpSequence,
  type CcpBrief,
  type CcpAnalyticsRow,
  type CcpAd,
  type CcpTest,
  type CcpSection,
} from "@/lib/api/conversionCopy";

export const ccpKeys = {
  all: ["conversion-copy-dashboard"] as const,
  overview: ["conversion-copy-dashboard", "overview"] as const,
  assets: ["conversion-copy-dashboard", "assets"] as const,
  rules: ["conversion-copy-dashboard", "rules"] as const,
  sequences: ["conversion-copy-dashboard", "sequences"] as const,
  briefs: ["conversion-copy-dashboard", "briefs"] as const,
  analytics: ["conversion-copy-dashboard", "analytics"] as const,
  ads: ["conversion-copy-dashboard", "ads"] as const,
  tests: ["conversion-copy-dashboard", "tests"] as const,
  sections: ["conversion-copy-dashboard", "sections"] as const,
};

export function useCcpOverview() {
  return usePaginatedQuery<CcpKpi>(ccpKeys.overview, fetchCcpOverview);
}
export function useCcpOverviewItems(): CcpKpi[] {
  return flattenPages(useCcpOverview().data?.pages);
}
export function useCcpAssets() {
  return usePaginatedQuery<CcpAsset>(ccpKeys.assets, fetchCcpAssets);
}
export function useCcpAssetItems(): CcpAsset[] {
  return flattenPages(useCcpAssets().data?.pages);
}
export function useCcpRules() {
  return usePaginatedQuery<CcpRule>(ccpKeys.rules, fetchCcpRules);
}
export function useCcpRuleItems(): CcpRule[] {
  return flattenPages(useCcpRules().data?.pages);
}
export function useCcpSequences() {
  return usePaginatedQuery<CcpSequence>(ccpKeys.sequences, fetchCcpSequences);
}
export function useCcpSequenceItems(): CcpSequence[] {
  return flattenPages(useCcpSequences().data?.pages);
}
export function useCcpBriefs() {
  return usePaginatedQuery<CcpBrief>(ccpKeys.briefs, fetchCcpBriefs);
}
export function useCcpBriefItems(): CcpBrief[] {
  return flattenPages(useCcpBriefs().data?.pages);
}
export function useCcpAnalytics() {
  return usePaginatedQuery<CcpAnalyticsRow>(ccpKeys.analytics, fetchCcpAnalytics);
}
export function useCcpAnalyticsItems(): CcpAnalyticsRow[] {
  return flattenPages(useCcpAnalytics().data?.pages);
}
export function useCcpAds() {
  return usePaginatedQuery<CcpAd>(ccpKeys.ads, fetchCcpAds);
}
export function useCcpAdItems(): CcpAd[] {
  return flattenPages(useCcpAds().data?.pages);
}
export function useCcpTests() {
  return usePaginatedQuery<CcpTest>(ccpKeys.tests, fetchCcpTests);
}
export function useCcpTestItems(): CcpTest[] {
  return flattenPages(useCcpTests().data?.pages);
}
export function useCcpSections() {
  return usePaginatedQuery<CcpSection>(ccpKeys.sections, fetchCcpSections);
}
export function useCcpSectionItems(): CcpSection[] {
  return flattenPages(useCcpSections().data?.pages);
}

export type {
  CcpKpi,
  CcpAsset,
  CcpRule,
  CcpSequence,
  CcpBrief,
  CcpAnalyticsRow,
  CcpAd,
  CcpTest,
  CcpSection,
} from "@/lib/api/conversionCopy";
