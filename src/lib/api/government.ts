import { apiFetch } from "./client";
import type { Paginated } from "./types";

export interface GovKpi {
  id: string;
  metric: string;
  valueLabel: string;
  delta: string;
}

export interface GovEvent {
  id: string;
  title: string;
  dateLabel: string;
  status: string;
}

export interface GovChange {
  id: string;
  title: string;
  detail: string;
  status: string;
}

export interface GovDocument {
  id: string;
  title: string;
  versionLabel: string;
  status: string;
}

export interface GovFact {
  id: string;
  label: string;
  value: string;
}

export interface GovReport {
  id: string;
  title: string;
  detail: string;
  status: string;
}

export interface GovThread {
  id: string;
  title: string;
  fromLabel: string;
  timeLabel: string;
  status: string;
}

export interface GovCheck {
  id: string;
  title: string;
  detail: string;
  status: string;
}

export interface GovAudit {
  id: string;
  title: string;
  detail: string;
  status: string;
}

export interface GovFiling {
  id: string;
  title: string;
  detail: string;
  status: string;
}

export interface GovCourse {
  id: string;
  title: string;
  detail: string;
  status: string;
}

function govPage<T>(path: string) {
  return (cursor?: string): Promise<Paginated<T>> =>
    apiFetch<Paginated<T>>(path, { query: { cursor } });
}

export const fetchGovOverview = govPage<GovKpi>("/v1/government-dashboard/overview");
export const fetchGovCalendar = govPage<GovEvent>("/v1/government-dashboard/calendar");
export const fetchGovChanges = govPage<GovChange>("/v1/government-dashboard/changes");
export const fetchGovDocuments = govPage<GovDocument>("/v1/government-dashboard/documents");
export const fetchGovFacts = govPage<GovFact>("/v1/government-dashboard/facts");
export const fetchGovReports = govPage<GovReport>("/v1/government-dashboard/reports");
export const fetchGovThreads = govPage<GovThread>("/v1/government-dashboard/threads");
export const fetchGovChecks = govPage<GovCheck>("/v1/government-dashboard/checks");
export const fetchGovAudits = govPage<GovAudit>("/v1/government-dashboard/audits");
export const fetchGovFilings = govPage<GovFiling>("/v1/government-dashboard/filings");
export const fetchGovCourses = govPage<GovCourse>("/v1/government-dashboard/courses");
