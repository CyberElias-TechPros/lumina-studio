import { useQuery } from "@tanstack/react-query";
import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  fetchMntMentees,
  fetchMntSessions,
  fetchMntGoals,
  fetchMntRequests,
  fetchMntAvailability,
  fetchMntResources,
  fetchMntConversations,
  fetchSessionDetail,
  fetchMenteeDetail,
  fetchMenteePortfolio,
  fetchMenteeSkills,
  fetchMenteeCareer,
  fetchConversationDetail,
  type MntMentee,
  type MntSession,
  type MntGoal,
  type MntRequest,
  type MntAvailability,
  type MntResource,
  type MntConversation,
  type SessionDetail,
  type MntMenteeDetail,
  type PortfolioItem,
  type MntSkill,
  type CareerApplication,
  type ConversationDetail,
} from "@/lib/api/mentorDashboard";

export const mntKeys = {
  all: ["mentor-dashboard"] as const,
  mentees: ["mentor-dashboard", "mentees"] as const,
  mentee: (id: string) => ["mentor-dashboard", "mentees", id] as const,
  portfolio: (id: string) => ["mentor-dashboard", "mentees", id, "portfolio"] as const,
  skills: (id: string) => ["mentor-dashboard", "mentees", id, "skills"] as const,
  career: (id: string) => ["mentor-dashboard", "mentees", id, "career"] as const,
  sessions: ["mentor-dashboard", "sessions"] as const,
  session: (id: string) => ["mentor-dashboard", "sessions", id] as const,
  goals: ["mentor-dashboard", "goals"] as const,
  requests: ["mentor-dashboard", "requests"] as const,
  availability: ["mentor-dashboard", "availability"] as const,
  resources: ["mentor-dashboard", "resources"] as const,
  conversations: ["mentor-dashboard", "conversations"] as const,
  conversation: (id: string) => ["mentor-dashboard", "conversations", id] as const,
};

function useMnt<T>(key: readonly unknown[], fetchFn: (cursor?: string) => Promise<{ items: T[] }>) {
  return usePaginatedQuery<T>(key, fetchFn);
}

export function useMntMentees() {
  return useMnt<MntMentee>(mntKeys.mentees, fetchMntMentees);
}
export function useMntMenteeItems(): MntMentee[] {
  return flattenPages(useMntMentees().data?.pages);
}

export function useMntSessions() {
  return useMnt<MntSession>(mntKeys.sessions, fetchMntSessions);
}
export function useMntSessionItems(): MntSession[] {
  return flattenPages(useMntSessions().data?.pages);
}

export function useMntGoals() {
  return useMnt<MntGoal>(mntKeys.goals, fetchMntGoals);
}
export function useMntGoalItems(): MntGoal[] {
  return flattenPages(useMntGoals().data?.pages);
}

export function useMntRequests() {
  return useMnt<MntRequest>(mntKeys.requests, fetchMntRequests);
}
export function useMntRequestItems(): MntRequest[] {
  return flattenPages(useMntRequests().data?.pages);
}

export function useMntAvailability() {
  return useMnt<MntAvailability>(mntKeys.availability, fetchMntAvailability);
}
export function useMntAvailabilityItems(): MntAvailability[] {
  return flattenPages(useMntAvailability().data?.pages);
}

export function useMntResources() {
  return useMnt<MntResource>(mntKeys.resources, fetchMntResources);
}
export function useMntResourceItems(): MntResource[] {
  return flattenPages(useMntResources().data?.pages);
}

export function useMntConversations() {
  return useMnt<MntConversation>(mntKeys.conversations, fetchMntConversations);
}
export function useMntConversationItems(): MntConversation[] {
  return flattenPages(useMntConversations().data?.pages);
}

export function useSessionDetail(id: string) {
  return useQuery({ queryKey: mntKeys.session(id), queryFn: () => fetchSessionDetail(id) });
}

export function useMenteeDetail(id: string) {
  return useQuery({ queryKey: mntKeys.mentee(id), queryFn: () => fetchMenteeDetail(id) });
}

export function useMenteePortfolio(id: string) {
  return usePaginatedQuery<PortfolioItem>(mntKeys.portfolio(id), (cursor) =>
    fetchMenteePortfolio(id, cursor),
  );
}
export function useMenteePortfolioItems(id: string): PortfolioItem[] {
  return flattenPages(useMenteePortfolio(id).data?.pages);
}

export function useMenteeSkills(id: string) {
  return usePaginatedQuery<MntSkill>(mntKeys.skills(id), (cursor) => fetchMenteeSkills(id, cursor));
}
export function useMenteeSkillItems(id: string): MntSkill[] {
  return flattenPages(useMenteeSkills(id).data?.pages);
}

export function useMenteeCareer(id: string) {
  return usePaginatedQuery<CareerApplication>(mntKeys.career(id), (cursor) =>
    fetchMenteeCareer(id, cursor),
  );
}
export function useMenteeCareerItems(id: string): CareerApplication[] {
  return flattenPages(useMenteeCareer(id).data?.pages);
}

export function useConversationDetail(id: string) {
  return useQuery({
    queryKey: mntKeys.conversation(id),
    queryFn: () => fetchConversationDetail(id),
  });
}
