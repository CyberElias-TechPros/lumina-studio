import { apiFetch } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";

export interface IntTask {
  id: string;
  title: string;
  status: string;
  dueLabel: string;
  category: string;
}

export interface IntTimesheet {
  id: string;
  weekLabel: string;
  hours: number;
  status: string;
}

export interface IntMentorSession {
  id: string;
  title: string;
  dateText: string;
  durationText: string;
  status: string;
}

export interface IntMilestone {
  id: string;
  title: string;
  progressPct: number;
  status: string;
}

export interface IntSkill {
  id: string;
  name: string;
  mastery: string;
}

export interface IntResource {
  id: string;
  title: string;
  kind: string;
}

export interface IntEvaluation {
  id: string;
  kind: string;
  score: number;
  status: string;
}

export interface IntProject {
  id: string;
  title: string;
  category: string;
  artifacts: number;
  views: number;
  status: string;
}

export interface IntConversation {
  id: string;
  name: string;
  preview: string;
  timeLabel: string;
  unread: number;
}

export interface IntThreadMessage {
  id: string;
  fromLabel: string;
  body: string;
  timeLabel: string;
}

export interface ConversationDetail extends IntConversation {
  thread: IntThreadMessage[];
}

function fetchPage<T>(path: string) {
  return (cursor?: string): Promise<Paginated<T>> =>
    apiFetch<Paginated<T>>(path, { query: { cursor } });
}

export const fetchIntTasks = fetchPage<IntTask>("/v1/intern-dashboard/tasks");
export const fetchIntTimesheets = fetchPage<IntTimesheet>("/v1/intern-dashboard/timesheets");
export const fetchIntMentorSessions = fetchPage<IntMentorSession>(
  "/v1/intern-dashboard/mentor-sessions",
);
export const fetchIntMilestones = fetchPage<IntMilestone>("/v1/intern-dashboard/milestones");
export const fetchIntSkills = fetchPage<IntSkill>("/v1/intern-dashboard/skills");
export const fetchIntResources = fetchPage<IntResource>("/v1/intern-dashboard/resources");
export const fetchIntEvaluations = fetchPage<IntEvaluation>("/v1/intern-dashboard/evaluations");
export const fetchIntProjects = fetchPage<IntProject>("/v1/intern-dashboard/projects");
export const fetchIntConversations = fetchPage<IntConversation>(
  "/v1/intern-dashboard/conversations",
);

export const fetchConversationDetail = (id: string): Promise<ConversationDetail> =>
  apiFetch<ConversationDetail>(`/v1/intern-dashboard/conversations/${id}`);
