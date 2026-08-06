import { useQuery } from "@tanstack/react-query";
import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  fetchIntTasks,
  fetchIntTimesheets,
  fetchIntMentorSessions,
  fetchIntMilestones,
  fetchIntSkills,
  fetchIntResources,
  fetchIntEvaluations,
  fetchIntProjects,
  fetchIntConversations,
  fetchConversationDetail,
  type IntTask,
  type IntTimesheet,
  type IntMentorSession,
  type IntMilestone,
  type IntSkill,
  type IntResource,
  type IntEvaluation,
  type IntProject,
  type IntConversation,
  type ConversationDetail,
} from "@/lib/api/internDashboard";

export const intKeys = {
  all: ["intern-dashboard"] as const,
  tasks: ["intern-dashboard", "tasks"] as const,
  timesheets: ["intern-dashboard", "timesheets"] as const,
  mentorSessions: ["intern-dashboard", "mentor-sessions"] as const,
  milestones: ["intern-dashboard", "milestones"] as const,
  skills: ["intern-dashboard", "skills"] as const,
  resources: ["intern-dashboard", "resources"] as const,
  evaluations: ["intern-dashboard", "evaluations"] as const,
  projects: ["intern-dashboard", "projects"] as const,
  conversations: ["intern-dashboard", "conversations"] as const,
  conversation: (id: string) => ["intern-dashboard", "conversations", id] as const,
};

function useInt<T>(key: readonly unknown[], fetchFn: (cursor?: string) => Promise<{ items: T[] }>) {
  return usePaginatedQuery<T>(key, fetchFn);
}

export function useIntTasks() {
  return useInt<IntTask>(intKeys.tasks, fetchIntTasks);
}
export function useIntTaskItems(): IntTask[] {
  return flattenPages(useIntTasks().data?.pages);
}

export function useIntTimesheets() {
  return useInt<IntTimesheet>(intKeys.timesheets, fetchIntTimesheets);
}
export function useIntTimesheetItems(): IntTimesheet[] {
  return flattenPages(useIntTimesheets().data?.pages);
}

export function useIntMentorSessions() {
  return useInt<IntMentorSession>(intKeys.mentorSessions, fetchIntMentorSessions);
}
export function useIntMentorSessionItems(): IntMentorSession[] {
  return flattenPages(useIntMentorSessions().data?.pages);
}

export function useIntMilestones() {
  return useInt<IntMilestone>(intKeys.milestones, fetchIntMilestones);
}
export function useIntMilestoneItems(): IntMilestone[] {
  return flattenPages(useIntMilestones().data?.pages);
}

export function useIntSkills() {
  return useInt<IntSkill>(intKeys.skills, fetchIntSkills);
}
export function useIntSkillItems(): IntSkill[] {
  return flattenPages(useIntSkills().data?.pages);
}

export function useIntResources() {
  return useInt<IntResource>(intKeys.resources, fetchIntResources);
}
export function useIntResourceItems(): IntResource[] {
  return flattenPages(useIntResources().data?.pages);
}

export function useIntEvaluations() {
  return useInt<IntEvaluation>(intKeys.evaluations, fetchIntEvaluations);
}
export function useIntEvaluationItems(): IntEvaluation[] {
  return flattenPages(useIntEvaluations().data?.pages);
}

export function useIntProjects() {
  return useInt<IntProject>(intKeys.projects, fetchIntProjects);
}
export function useIntProjectItems(): IntProject[] {
  return flattenPages(useIntProjects().data?.pages);
}

export function useIntConversations() {
  return useInt<IntConversation>(intKeys.conversations, fetchIntConversations);
}
export function useIntConversationItems(): IntConversation[] {
  return flattenPages(useIntConversations().data?.pages);
}

export function useConversationDetail(id: string) {
  return useQuery({
    queryKey: intKeys.conversation(id),
    queryFn: () => fetchConversationDetail(id),
  });
}
