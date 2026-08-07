import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  fetchStuAttendance,
  fetchStuRecords,
  fetchStuPolicy,
  fetchStuPortfolio,
  fetchStuProjects,
  fetchStuSkills,
  fetchStuCv,
  fetchStuReportKpis,
  fetchStuTemplates,
  type StuKpi,
  type StuRecord,
  type StuPolicy,
  type StuProject,
  type StuSkill,
  type StuCvFile,
  type StuReportTemplate,
} from "@/lib/api/studentSelf";

export const stuKeys = {
  all: ["student-self-dashboard"] as const,
  attendance: ["student-self-dashboard", "attendance"] as const,
  records: ["student-self-dashboard", "records"] as const,
  policy: ["student-self-dashboard", "policy"] as const,
  portfolio: ["student-self-dashboard", "portfolio"] as const,
  projects: ["student-self-dashboard", "projects"] as const,
  skills: ["student-self-dashboard", "skills"] as const,
  cv: ["student-self-dashboard", "cv"] as const,
  reportKpis: ["student-self-dashboard", "report-kpis"] as const,
  templates: ["student-self-dashboard", "templates"] as const,
};

export function useStuAttendance() {
  return usePaginatedQuery<StuKpi>(stuKeys.attendance, fetchStuAttendance);
}
export function useStuAttendanceItems(): StuKpi[] {
  return flattenPages(useStuAttendance().data?.pages);
}
export function useStuRecords() {
  return usePaginatedQuery<StuRecord>(stuKeys.records, fetchStuRecords);
}
export function useStuRecordItems(): StuRecord[] {
  return flattenPages(useStuRecords().data?.pages);
}
export function useStuPolicy() {
  return usePaginatedQuery<StuPolicy>(stuKeys.policy, fetchStuPolicy);
}
export function useStuPolicyItems(): StuPolicy[] {
  return flattenPages(useStuPolicy().data?.pages);
}
export function useStuPortfolio() {
  return usePaginatedQuery<StuKpi>(stuKeys.portfolio, fetchStuPortfolio);
}
export function useStuPortfolioItems(): StuKpi[] {
  return flattenPages(useStuPortfolio().data?.pages);
}
export function useStuProjects() {
  return usePaginatedQuery<StuProject>(stuKeys.projects, fetchStuProjects);
}
export function useStuProjectItems(): StuProject[] {
  return flattenPages(useStuProjects().data?.pages);
}
export function useStuSkills() {
  return usePaginatedQuery<StuSkill>(stuKeys.skills, fetchStuSkills);
}
export function useStuSkillItems(): StuSkill[] {
  return flattenPages(useStuSkills().data?.pages);
}
export function useStuCv() {
  return usePaginatedQuery<StuCvFile>(stuKeys.cv, fetchStuCv);
}
export function useStuCvItems(): StuCvFile[] {
  return flattenPages(useStuCv().data?.pages);
}
export function useStuReportKpis() {
  return usePaginatedQuery<StuKpi>(stuKeys.reportKpis, fetchStuReportKpis);
}
export function useStuReportKpisItems(): StuKpi[] {
  return flattenPages(useStuReportKpis().data?.pages);
}
export function useStuTemplates() {
  return usePaginatedQuery<StuReportTemplate>(stuKeys.templates, fetchStuTemplates);
}
export function useStuTemplateItems(): StuReportTemplate[] {
  return flattenPages(useStuTemplates().data?.pages);
}

export type {
  StuKpi,
  StuRecord,
  StuPolicy,
  StuProject,
  StuSkill,
  StuCvFile,
  StuReportTemplate,
} from "@/lib/api/studentSelf";
