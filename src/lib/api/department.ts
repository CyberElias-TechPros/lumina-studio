import { apiFetch } from "./client";
import type { Paginated } from "./types";

export interface DepKpi {
  id: string;
  metric: string;
  valueLabel: string;
  delta: string;
}

export interface DepReport {
  id: string;
  title: string;
  detail: string;
  status: string;
}

export interface DepObservation {
  id: string;
  title: string;
  detail: string;
  status: string;
}

export interface DepFacultyMember {
  id: string;
  name: string;
  courses: number;
  students: number;
  workload: string;
  rating: string;
}

export interface DepCohort {
  id: string;
  name: string;
  enrolled: number;
  capacity: number;
  pct: number;
  status: string;
}

export interface DepProgram {
  id: string;
  name: string;
  version: string;
  year: string;
  status: string;
}

export interface DepEvent {
  id: string;
  title: string;
  dateLabel: string;
  status: string;
}

export interface DepApproval {
  id: string;
  title: string;
  requester: string;
  dateLabel: string;
  status: string;
}

function depPage<T>(path: string) {
  return (cursor?: string): Promise<Paginated<T>> =>
    apiFetch<Paginated<T>>(path, { query: { cursor } });
}

export const fetchDepOverview = depPage<DepKpi>("/v1/department-dashboard/overview");
export const fetchDepReports = depPage<DepReport>("/v1/department-dashboard/reports");
export const fetchDepObservations = depPage<DepObservation>(
  "/v1/department-dashboard/observations",
);
export const fetchDepFaculty = depPage<DepFacultyMember>("/v1/department-dashboard/faculty");
export const fetchDepCohorts = depPage<DepCohort>("/v1/department-dashboard/cohorts");
export const fetchDepPrograms = depPage<DepProgram>("/v1/department-dashboard/programs");
export const fetchDepEvents = depPage<DepEvent>("/v1/department-dashboard/events");
export const fetchDepApprovals = depPage<DepApproval>("/v1/department-dashboard/approvals");
