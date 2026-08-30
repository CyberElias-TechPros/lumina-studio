import { apiFetch } from "./client";
import type { Paginated } from "./types";

export interface StuKpi {
  id: string;
  metric: string;
  valueLabel: string;
  delta: string;
}

export interface StuRecord {
  id: string;
  dateLabel: string;
  course: string;
  status: string;
}

export interface StuPolicy {
  id: string;
  rule: string;
  valueLabel: string;
}

export interface StuProject {
  id: string;
  name: string;
  detail: string;
  tags: string[];
  featured: number;
  url?: string;
}

export interface StuSkill {
  id: string;
  name: string;
  pct: number;
}

export interface StuCvFile {
  id: string;
  filename: string;
}

export interface StuReportTemplate {
  id: string;
  name: string;
  category: string;
  usage: string;
}

function stuPage<T>(path: string) {
  return (cursor?: string): Promise<Paginated<T>> =>
    apiFetch<Paginated<T>>(path, { query: { cursor } });
}

export const fetchStuAttendance = stuPage<StuKpi>("/v1/student-self-dashboard/attendance");
export const fetchStuRecords = stuPage<StuRecord>("/v1/student-self-dashboard/records");
export const fetchStuPolicy = stuPage<StuPolicy>("/v1/student-self-dashboard/policy");
export const fetchStuPortfolio = stuPage<StuKpi>("/v1/student-self-dashboard/portfolio");
export const fetchStuProjects = stuPage<StuProject>("/v1/student-self-dashboard/projects");
export const fetchStuSkills = stuPage<StuSkill>("/v1/student-self-dashboard/skills");
export const fetchStuCv = stuPage<StuCvFile>("/v1/student-self-dashboard/cv");
export const fetchStuReportKpis = stuPage<StuKpi>("/v1/student-self-dashboard/reportKpis");
export const fetchStuTemplates = stuPage<StuReportTemplate>("/v1/student-self-dashboard/templates");

export interface CreateStuProjectInput {
  name: string;
  detail: string;
  tags: string[];
  url?: string;
}

export function createStuProject(input: CreateStuProjectInput): Promise<StuProject> {
  return apiFetch<StuProject>("/v1/student-self-dashboard/projects", {
    method: "POST",
    body: input,
  });
}
