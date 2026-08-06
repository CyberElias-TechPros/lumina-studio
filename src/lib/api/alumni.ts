import { apiFetch } from "./client";
import type { Paginated } from "./types";

export interface AluKpi {
  id: string;
  metric: string;
  valueLabel: string;
  delta: string;
}

export interface AluEvent {
  id: string;
  title: string;
  dateLabel: string;
  location: string;
  going: number;
  status: string;
}

export interface AluMember {
  id: string;
  name: string;
  cohort: string;
  roleLabel: string;
  city: string;
  conn: number;
}

export interface AluStory {
  id: string;
  name: string;
  cohort: string;
  company: string;
  role: string;
  excerpt: string;
  initials: string;
  tone: string;
}

export interface AluMilestone {
  id: string;
  label: string;
  value: string;
}

export interface AluJob {
  id: string;
  role: string;
  company: string;
  period: string;
  place: string;
  current: number;
  description: string;
}

export interface AluAchievement {
  id: string;
  title: string;
  org: string;
  year: string;
}

export interface AluSkill {
  id: string;
  name: string;
}

export interface AluCommitment {
  id: string;
  mentee: string;
  track: string;
  cadence: string;
  nextLabel: string;
  status: string;
}

export interface AluWay {
  id: string;
  title: string;
  detail: string;
}

export interface AluImpactRow {
  id: string;
  value: string;
  label: string;
}

function aluPage<T>(path: string) {
  return (cursor?: string): Promise<Paginated<T>> =>
    apiFetch<Paginated<T>>(path, { query: { cursor } });
}

export const fetchAluOverview = aluPage<AluKpi>("/v1/alumni-dashboard/overview");
export const fetchAluEvents = aluPage<AluEvent>("/v1/alumni-dashboard/events");
export const fetchAluMembers = aluPage<AluMember>("/v1/alumni-dashboard/members");
export const fetchAluStories = aluPage<AluStory>("/v1/alumni-dashboard/stories");
export const fetchAluMilestones = aluPage<AluMilestone>("/v1/alumni-dashboard/milestones");
export const fetchAluJobs = aluPage<AluJob>("/v1/alumni-dashboard/jobs");
export const fetchAluAchievements = aluPage<AluAchievement>("/v1/alumni-dashboard/achievements");
export const fetchAluSkills = aluPage<AluSkill>("/v1/alumni-dashboard/skills");
export const fetchAluCommitments = aluPage<AluCommitment>("/v1/alumni-dashboard/commitments");
export const fetchAluWays = aluPage<AluWay>("/v1/alumni-dashboard/ways");
export const fetchAluImpact = aluPage<AluImpactRow>("/v1/alumni-dashboard/impact");
