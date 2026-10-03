import { registerMock, registerMockPattern } from "@/lib/api/client";
import type { ApiRequestInit } from "@/lib/api/client";

interface MockProject {
  id: string;
  ref: string;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  projectType: string;
  projectTypeLabel: string;
  brief: string;
  budgetRange: string;
  budgetLabel: string;
  timeline: string;
  timelineLabel: string;
  status: string;
  note: string;
  source: string;
  createdAt: string;
  updatedAt: string;
}

interface MockPartner {
  id: string;
  ref: string;
  contactName: string;
  email: string;
  phone: string;
  organization: string;
  website: string;
  partnershipType: string;
  partnershipTypeLabel: string;
  region: string;
  capabilities: string;
  proposal: string;
  status: string;
  note: string;
  hasPortalAccount: boolean;
  createdAt: string;
  updatedAt: string;
}

const projects: MockProject[] = [];
const partners: MockPartner[] = [];
let sequence = 0;
const delay = () => new Promise((resolve) => setTimeout(resolve, 140));
const ref = (prefix: "PROJ" | "PARTNER") =>
  `${prefix}-2026-${Math.random().toString(36).slice(2, 9).toUpperCase()}`;

function projectLabels(type: string) {
  return (
    (
      {
        website: "Website",
        web_app: "Web application",
        mobile_app: "Mobile app",
        internal_tool: "Internal business tool",
        automation: "Workflow automation / integration",
        consulting: "Technical discovery / consulting",
        other: "Other digital project",
      } as Record<string, string>
    )[type] ?? "Other digital project"
  );
}

function partnerLabels(type: string) {
  return (
    (
      {
        education: "Education / training",
        employer: "Employer / talent pathway",
        technology: "Technology / product",
        ngo_community: "NGO / community",
        government: "Government / public sector",
        delivery_partner: "Delivery / implementation partner",
        other: "Other",
      } as Record<string, string>
    )[type] ?? "Other"
  );
}

function budgetLabel(value: string) {
  return (
    (
      {
        undecided: "Not decided yet",
        under_250k: "Under ₦250,000",
        "250k_750k": "₦250,000–₦750,000",
        "750k_2m": "₦750,000–₦2,000,000",
        "2m_plus": "Over ₦2,000,000",
      } as Record<string, string>
    )[value] ?? "Not decided yet"
  );
}

function timelineLabel(value: string) {
  return (
    (
      {
        asap: "As soon as practical",
        one_to_three_months: "Within 1–3 months",
        three_to_six_months: "Within 3–6 months",
        six_plus_months: "More than 6 months",
        flexible: "Flexible / exploring",
      } as Record<string, string>
    )[value] ?? "Flexible / exploring"
  );
}

export function registerBusinessIntakeMocks(): void {
  registerMock("POST", "/v1/business-intake/projects", async (init: ApiRequestInit) => {
    await delay();
    const input = (init.body ?? {}) as Partial<MockProject>;
    sequence += 1;
    const now = new Date().toISOString();
    const projectRef = ref("PROJ");
    const projectType = input.projectType ?? "other";
    projects.unshift({
      id: `mock-project-${sequence}`,
      ref: projectRef,
      fullName: input.fullName ?? "Prospective client",
      email: input.email ?? "client@example.com",
      phone: input.phone ?? "",
      organization: input.organization ?? "",
      projectType,
      projectTypeLabel: projectLabels(projectType),
      brief: input.brief ?? "New project enquiry submitted from the public site.",
      budgetRange: input.budgetRange ?? "undecided",
      budgetLabel: budgetLabel(input.budgetRange ?? "undecided"),
      timeline: input.timeline ?? "flexible",
      timelineLabel: timelineLabel(input.timeline ?? "flexible"),
      status: "new",
      note: "",
      source: "mock_preview",
      createdAt: now,
      updatedAt: now,
    });
    return { ok: true, ref: projectRef, status: "new" };
  });

  registerMock("POST", "/v1/business-intake/partners", async (init: ApiRequestInit) => {
    await delay();
    const input = (init.body ?? {}) as Partial<MockPartner>;
    sequence += 1;
    const now = new Date().toISOString();
    const partnerRef = ref("PARTNER");
    const partnershipType = input.partnershipType ?? "other";
    partners.unshift({
      id: `mock-partner-${sequence}`,
      ref: partnerRef,
      contactName: input.contactName ?? "Prospective partner",
      email: input.email ?? "partner@example.com",
      phone: input.phone ?? "",
      organization: input.organization ?? "New organisation",
      website: input.website ?? "",
      partnershipType,
      partnershipTypeLabel: partnerLabels(partnershipType),
      region: input.region ?? "",
      capabilities: input.capabilities ?? "Partnership application submitted from the public site.",
      proposal: input.proposal ?? "The applicant will discuss a possible collaboration.",
      status: "new",
      note: "",
      hasPortalAccount: false,
      createdAt: now,
      updatedAt: now,
    });
    return { ok: true, ref: partnerRef, status: "new" };
  });

  registerMock("GET", "/v1/business-intake/admin/projects", async (init: ApiRequestInit) => {
    await delay();
    const status = init.query?.status;
    const items = status ? projects.filter((item) => item.status === status) : projects;
    return { items: [...items], total: items.length };
  });
  registerMock("GET", "/v1/business-intake/admin/partners", async (init: ApiRequestInit) => {
    await delay();
    const status = init.query?.status;
    const items = status ? partners.filter((item) => item.status === status) : partners;
    return { items: [...items], total: items.length };
  });

  registerMockPattern(
    "PATCH",
    "/v1/business-intake/admin/projects/*",
    async (init: ApiRequestInit) => {
      await delay();
      const id = (init.path ?? "").split("/").at(-1);
      const input = (init.body ?? {}) as { status?: string; note?: string };
      const item = projects.find((candidate) => candidate.id === id);
      if (item) {
        item.status = input.status ?? item.status;
        item.note = input.note ?? item.note;
        item.updatedAt = new Date().toISOString();
      }
      return {
        ok: true,
        id,
        ref: item?.ref ?? "PROJ-MOCK",
        status: input.status ?? item?.status ?? "new",
        note: item?.note ?? "",
        updatedAt: new Date().toISOString(),
      };
    },
  );

  registerMockPattern(
    "PATCH",
    "/v1/business-intake/admin/partners/*",
    async (init: ApiRequestInit) => {
      await delay();
      const id = (init.path ?? "").split("/").at(-1);
      const input = (init.body ?? {}) as { status?: string; note?: string };
      const item = partners.find((candidate) => candidate.id === id);
      if (item) {
        item.status = input.status ?? item.status;
        item.note = input.note ?? item.note;
        item.updatedAt = new Date().toISOString();
      }
      return {
        ok: true,
        id,
        ref: item?.ref ?? "PARTNER-MOCK",
        status: input.status ?? item?.status ?? "new",
        note: item?.note ?? "",
        updatedAt: new Date().toISOString(),
      };
    },
  );

  registerMockPattern(
    "POST",
    "/v1/business-intake/admin/partners/*/admit",
    async (init: ApiRequestInit) => {
      await delay();
      const id = (init.path ?? "").split("/").at(-2);
      const item = partners.find((candidate) => candidate.id === id);
      if (item) {
        item.status = "admitted";
        item.hasPortalAccount = true;
        item.updatedAt = new Date().toISOString();
      }
      return {
        ok: true,
        ref: item?.ref ?? "PARTNER-MOCK",
        status: "admitted",
        portalUserId: `mock-user-${sequence}`,
        emailSent: true,
      };
    },
  );
}
