import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  fetchAluOverview,
  fetchAluEvents,
  fetchAluMembers,
  fetchAluStories,
  fetchAluMilestones,
  fetchAluJobs,
  fetchAluAchievements,
  fetchAluSkills,
  fetchAluCommitments,
  fetchAluWays,
  fetchAluImpact,
  type AluKpi,
  type AluEvent,
  type AluMember,
  type AluStory,
  type AluMilestone,
  type AluJob,
  type AluAchievement,
  type AluSkill,
  type AluCommitment,
  type AluWay,
  type AluImpactRow,
} from "@/lib/api/alumni";

export const aluKeys = {
  all: ["alumni-dashboard"] as const,
  overview: ["alumni-dashboard", "overview"] as const,
  events: ["alumni-dashboard", "events"] as const,
  members: ["alumni-dashboard", "members"] as const,
  stories: ["alumni-dashboard", "stories"] as const,
  milestones: ["alumni-dashboard", "milestones"] as const,
  jobs: ["alumni-dashboard", "jobs"] as const,
  achievements: ["alumni-dashboard", "achievements"] as const,
  skills: ["alumni-dashboard", "skills"] as const,
  commitments: ["alumni-dashboard", "commitments"] as const,
  ways: ["alumni-dashboard", "ways"] as const,
  impact: ["alumni-dashboard", "impact"] as const,
};

export function useAluOverview() {
  return usePaginatedQuery<AluKpi>(aluKeys.overview, fetchAluOverview);
}
export function useAluOverviewItems(): AluKpi[] {
  return flattenPages(useAluOverview().data?.pages);
}

export function useAluEvents() {
  return usePaginatedQuery<AluEvent>(aluKeys.events, fetchAluEvents);
}
export function useAluEventItems(): AluEvent[] {
  return flattenPages(useAluEvents().data?.pages);
}

export function useAluMembers() {
  return usePaginatedQuery<AluMember>(aluKeys.members, fetchAluMembers);
}
export function useAluMemberItems(): AluMember[] {
  return flattenPages(useAluMembers().data?.pages);
}

export function useAluStories() {
  return usePaginatedQuery<AluStory>(aluKeys.stories, fetchAluStories);
}
export function useAluStoryItems(): AluStory[] {
  return flattenPages(useAluStories().data?.pages);
}

export function useAluMilestones() {
  return usePaginatedQuery<AluMilestone>(aluKeys.milestones, fetchAluMilestones);
}
export function useAluMilestoneItems(): AluMilestone[] {
  return flattenPages(useAluMilestones().data?.pages);
}

export function useAluJobs() {
  return usePaginatedQuery<AluJob>(aluKeys.jobs, fetchAluJobs);
}
export function useAluJobItems(): AluJob[] {
  return flattenPages(useAluJobs().data?.pages);
}

export function useAluAchievements() {
  return usePaginatedQuery<AluAchievement>(aluKeys.achievements, fetchAluAchievements);
}
export function useAluAchievementItems(): AluAchievement[] {
  return flattenPages(useAluAchievements().data?.pages);
}

export function useAluSkills() {
  return usePaginatedQuery<AluSkill>(aluKeys.skills, fetchAluSkills);
}
export function useAluSkillItems(): AluSkill[] {
  return flattenPages(useAluSkills().data?.pages);
}

export function useAluCommitments() {
  return usePaginatedQuery<AluCommitment>(aluKeys.commitments, fetchAluCommitments);
}
export function useAluCommitmentItems(): AluCommitment[] {
  return flattenPages(useAluCommitments().data?.pages);
}

export function useAluWays() {
  return usePaginatedQuery<AluWay>(aluKeys.ways, fetchAluWays);
}
export function useAluWayItems(): AluWay[] {
  return flattenPages(useAluWays().data?.pages);
}

export function useAluImpact() {
  return usePaginatedQuery<AluImpactRow>(aluKeys.impact, fetchAluImpact);
}
export function useAluImpactItems(): AluImpactRow[] {
  return flattenPages(useAluImpact().data?.pages);
}

export type {
  AluKpi,
  AluEvent,
  AluMember,
  AluStory,
  AluMilestone,
  AluJob,
  AluAchievement,
  AluSkill,
  AluCommitment,
  AluWay,
  AluImpactRow,
} from "@/lib/api/alumni";
