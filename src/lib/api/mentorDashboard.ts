import { apiFetch } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";

export interface MntMentee {
  id: string;
  name: string;
  track: string;
  cohort: string;
  sinceDate: string;
  status: string;
}

export interface MntSession {
  id: string;
  title: string;
  datetimeText: string;
  mode: string;
  status: string;
}

export interface SessionAction {
  id: string;
  title: string;
  done: number;
}

export interface SessionDetail extends MntSession {
  notes: string;
  actions: SessionAction[];
}

export interface MntGoal {
  id: string;
  menteeId: string;
  title: string;
  progressPct: number;
  dueDate: string;
  status: string;
}

export interface MntRequest {
  id: string;
  requesterName: string;
  track: string;
  why: string;
  status: string;
}

export interface MntAvailability {
  id: string;
  day: string;
  hours: string;
  isOpen: number;
}

export interface MntResource {
  id: string;
  groupTitle: string;
  items: string[];
}

export interface MntConversation {
  id: string;
  name: string;
  track: string;
  preview: string;
  timeLabel: string;
  unread: number;
}

export interface MntThreadMessage {
  id: string;
  fromLabel: string;
  body: string;
  timeLabel: string;
}

export interface ConversationDetail extends MntConversation {
  thread: MntThreadMessage[];
}

export interface MntMenteeDetail extends MntMentee {
  goals: MntGoal[];
}

export interface PortfolioItem {
  id: string;
  projectName: string;
  status: string;
  stars: number;
  feedback: string;
}

export interface MntSkill {
  id: string;
  skillName: string;
  endorsed: number;
}

export interface CareerApplication {
  id: string;
  role: string;
  company: string;
  stage: string;
  appliedDate: string;
}

function fetchPage<T>(path: string) {
  return (cursor?: string): Promise<Paginated<T>> =>
    apiFetch<Paginated<T>>(path, { query: { cursor } });
}

export const fetchMntMentees = fetchPage<MntMentee>("/v1/mentor-dashboard/mentees");
export const fetchMntSessions = fetchPage<MntSession>("/v1/mentor-dashboard/sessions");
export const fetchMntGoals = fetchPage<MntGoal>("/v1/mentor-dashboard/goals");
export const fetchMntRequests = fetchPage<MntRequest>("/v1/mentor-dashboard/requests");
export const fetchMntAvailability = fetchPage<MntAvailability>("/v1/mentor-dashboard/availability");
export const fetchMntResources = fetchPage<MntResource>("/v1/mentor-dashboard/resources");
export const fetchMntConversations = fetchPage<MntConversation>(
  "/v1/mentor-dashboard/conversations",
);

export const fetchSessionDetail = (id: string): Promise<SessionDetail> =>
  apiFetch<SessionDetail>(`/v1/mentor-dashboard/sessions/${id}`);

export const fetchMenteeDetail = (id: string): Promise<MntMenteeDetail> =>
  apiFetch<MntMenteeDetail>(`/v1/mentor-dashboard/mentees/${id}`);

export const fetchMenteePortfolio = (
  id: string,
  cursor?: string,
): Promise<Paginated<PortfolioItem>> =>
  apiFetch<Paginated<PortfolioItem>>(`/v1/mentor-dashboard/mentees/${id}/portfolio`, {
    query: { cursor },
  });

export const fetchMenteeSkills = (id: string, cursor?: string): Promise<Paginated<MntSkill>> =>
  apiFetch<Paginated<MntSkill>>(`/v1/mentor-dashboard/mentees/${id}/skills`, {
    query: { cursor },
  });

export const fetchMenteeCareer = (
  id: string,
  cursor?: string,
): Promise<Paginated<CareerApplication>> =>
  apiFetch<Paginated<CareerApplication>>(`/v1/mentor-dashboard/mentees/${id}/career`, {
    query: { cursor },
  });

export const fetchConversationDetail = (id: string): Promise<ConversationDetail> =>
  apiFetch<ConversationDetail>(`/v1/mentor-dashboard/conversations/${id}`);
