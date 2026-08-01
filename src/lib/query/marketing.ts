import { usePaginatedQuery, flattenPages, useApiQuery } from "@/lib/query/hooks";
import {
  fetchMarketingKpis,
  fetchCampaigns,
  fetchEmailCampaigns,
  fetchSocialPosts,
  fetchLandingPages,
  fetchSeoKeywords,
  fetchContentCalendar,
  fetchLeads,
  fetchMarketingReports,
  fetchFunnelStages,
  type MarketingKpi,
  type Campaign,
  type EmailCampaign,
  type SocialPost,
  type LandingPage,
  type SeoKeyword,
  type ContentItem,
  type Lead,
  type Report,
  type FunnelStage,
} from "@/lib/api/marketing";

export const marketingKeys = {
  kpis: ["marketing", "kpis"] as const,
  campaigns: ["marketing", "campaigns"] as const,
  email: ["marketing", "email"] as const,
  social: ["marketing", "social"] as const,
  landingPages: ["marketing", "landing-pages"] as const,
  seo: ["marketing", "seo"] as const,
  contentCalendar: ["marketing", "content-calendar"] as const,
  leads: ["marketing", "leads"] as const,
  reports: ["marketing", "reports"] as const,
  funnel: ["marketing", "funnel"] as const,
};

export function useMarketingKpis() {
  return useApiQuery<MarketingKpi[]>(marketingKeys.kpis, fetchMarketingKpis);
}

export function useCampaigns() {
  return usePaginatedQuery<Campaign>(marketingKeys.campaigns, fetchCampaigns);
}

export function useCampaignItems(): Campaign[] {
  return flattenPages(useCampaigns().data?.pages);
}

export function useEmailCampaigns() {
  return usePaginatedQuery<EmailCampaign>(marketingKeys.email, fetchEmailCampaigns);
}

export function useEmailCampaignItems(): EmailCampaign[] {
  return flattenPages(useEmailCampaigns().data?.pages);
}

export function useSocialPosts() {
  return usePaginatedQuery<SocialPost>(marketingKeys.social, fetchSocialPosts);
}

export function useSocialPostItems(): SocialPost[] {
  return flattenPages(useSocialPosts().data?.pages);
}

export function useLandingPages() {
  return usePaginatedQuery<LandingPage>(marketingKeys.landingPages, fetchLandingPages);
}

export function useLandingPageItems(): LandingPage[] {
  return flattenPages(useLandingPages().data?.pages);
}

export function useSeoKeywords() {
  return usePaginatedQuery<SeoKeyword>(marketingKeys.seo, fetchSeoKeywords);
}

export function useSeoKeywordItems(): SeoKeyword[] {
  return flattenPages(useSeoKeywords().data?.pages);
}

export function useContentCalendar() {
  return usePaginatedQuery<ContentItem>(marketingKeys.contentCalendar, fetchContentCalendar);
}

export function useContentCalendarItems(): ContentItem[] {
  return flattenPages(useContentCalendar().data?.pages);
}

export function useLeads() {
  return usePaginatedQuery<Lead>(marketingKeys.leads, fetchLeads);
}

export function useLeadItems(): Lead[] {
  return flattenPages(useLeads().data?.pages);
}

export function useMarketingReports() {
  return usePaginatedQuery<Report>(marketingKeys.reports, fetchMarketingReports);
}

export function useMarketingReportItems(): Report[] {
  return flattenPages(useMarketingReports().data?.pages);
}

export function useFunnelStages() {
  return usePaginatedQuery<FunnelStage>(marketingKeys.funnel, fetchFunnelStages);
}

export function useFunnelStageItems(): FunnelStage[] {
  return flattenPages(useFunnelStages().data?.pages);
}
