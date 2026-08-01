import { apiFetch } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";

export interface MarketingKpi {
  id: string;
  page: string;
  label: string;
  value: string;
  delta: string;
}

export interface Campaign {
  id: string;
  name: string;
  channel: string;
  spend: number;
  leads: number;
  roas: number;
  status: string;
}

export interface EmailCampaign {
  id: string;
  title: string;
  recipients: number;
  openRate: number;
  status: string;
}

export interface SocialPost {
  id: string;
  title: string;
  channel: string;
  date: string;
  status: string;
}

export interface LandingPage {
  id: string;
  title: string;
  conversion: number;
  status: string;
}

export interface SeoKeyword {
  id: string;
  keyword: string;
  position: number;
  delta: string;
}

export interface ContentItem {
  id: string;
  title: string;
  channel: string;
  date: string;
  status: string;
}

export interface Lead {
  id: string;
  name: string;
  score: number;
  detail: string;
}

export interface Report {
  id: string;
  title: string;
  published: string;
}

export interface FunnelStage {
  id: string;
  stage: string;
  value: number;
  pct: number;
}

export function fetchMarketingKpis(): Promise<MarketingKpi[]> {
  return apiFetch<Paginated<MarketingKpi>>("/v1/marketing/kpis").then((r) => r.items);
}

export function fetchCampaigns(): Promise<Paginated<Campaign>> {
  return apiFetch<Paginated<Campaign>>("/v1/marketing/campaigns");
}

export function fetchEmailCampaigns(): Promise<Paginated<EmailCampaign>> {
  return apiFetch<Paginated<EmailCampaign>>("/v1/marketing/email");
}

export function fetchSocialPosts(): Promise<Paginated<SocialPost>> {
  return apiFetch<Paginated<SocialPost>>("/v1/marketing/social");
}

export function fetchLandingPages(): Promise<Paginated<LandingPage>> {
  return apiFetch<Paginated<LandingPage>>("/v1/marketing/landing-pages");
}

export function fetchSeoKeywords(): Promise<Paginated<SeoKeyword>> {
  return apiFetch<Paginated<SeoKeyword>>("/v1/marketing/seo");
}

export function fetchContentCalendar(): Promise<Paginated<ContentItem>> {
  return apiFetch<Paginated<ContentItem>>("/v1/marketing/content-calendar");
}

export function fetchLeads(): Promise<Paginated<Lead>> {
  return apiFetch<Paginated<Lead>>("/v1/marketing/leads");
}

export function fetchMarketingReports(): Promise<Paginated<Report>> {
  return apiFetch<Paginated<Report>>("/v1/marketing/reports");
}

export function fetchFunnelStages(): Promise<Paginated<FunnelStage>> {
  return apiFetch<Paginated<FunnelStage>>("/v1/marketing/funnel");
}

export interface SubmitContactInput {
  name: string;
  email: string;
  message: string;
  kind?: "contact" | "newsletter";
}

/** Public endpoint — writes a lead for the marketing suite. */
export function submitContact(input: SubmitContactInput): Promise<{ ok: true }> {
  return apiFetch("/v1/contact", { method: "POST", body: input });
}
