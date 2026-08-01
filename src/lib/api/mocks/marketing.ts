/**
 * Marketing mock handlers. Registers the /v1/marketing/* endpoints against
 * the canonical collections in src/data/marketing.
 */
import { registerMock } from "@/lib/api/client";
import {
  marketingKpis,
  campaigns,
  emailCampaigns,
  socialPosts,
  landingPages,
  seoKeywords,
  contentCalendar,
  leads,
  marketingReports,
  funnelStages,
} from "@/data/marketing";

function delay(milliseconds = 120): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function registerMarketingMocks(): void {
  registerMock("GET", "/v1/marketing/kpis", async () => {
    await delay();
    return {
      items: marketingKpis.map((k, i) => ({ id: `kpi-${i + 1}`, ...k })),
      total: marketingKpis.length,
    };
  });
  registerMock("GET", "/v1/marketing/campaigns", async () => {
    await delay();
    return {
      items: campaigns.map((c, i) => ({ id: `camp-${i + 1}`, ...c })),
      total: campaigns.length,
    };
  });
  registerMock("GET", "/v1/marketing/email", async () => {
    await delay();
    return {
      items: emailCampaigns.map((e, i) => ({ id: `emc-${i + 1}`, ...e })),
      total: emailCampaigns.length,
    };
  });
  registerMock("GET", "/v1/marketing/social", async () => {
    await delay();
    return {
      items: socialPosts.map((p, i) => ({ id: `soc-${i + 1}`, ...p })),
      total: socialPosts.length,
    };
  });
  registerMock("GET", "/v1/marketing/landing-pages", async () => {
    await delay();
    return {
      items: landingPages.map((p, i) => ({ id: `lp-${i + 1}`, ...p })),
      total: landingPages.length,
    };
  });
  registerMock("GET", "/v1/marketing/seo", async () => {
    await delay();
    return {
      items: seoKeywords.map((k, i) => ({ id: `seo-${i + 1}`, ...k })),
      total: seoKeywords.length,
    };
  });
  registerMock("GET", "/v1/marketing/content-calendar", async () => {
    await delay();
    return {
      items: contentCalendar.map((c, i) => ({ id: `cc-${i + 1}`, ...c })),
      total: contentCalendar.length,
    };
  });
  registerMock("GET", "/v1/marketing/leads", async () => {
    await delay();
    return {
      items: leads.map((l, i) => ({ id: `lead-${i + 1}`, ...l })),
      total: leads.length,
    };
  });
  registerMock("GET", "/v1/marketing/reports", async () => {
    await delay();
    return {
      items: marketingReports.map((r, i) => ({ id: `rpt-${i + 1}`, ...r })),
      total: marketingReports.length,
    };
  });
  registerMock("GET", "/v1/marketing/funnel", async () => {
    await delay();
    return {
      items: funnelStages.map((f, i) => ({ id: `fun-${i + 1}`, ...f })),
      total: funnelStages.length,
    };
  });
}
