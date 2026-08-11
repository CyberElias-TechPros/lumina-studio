import { apiFetch } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";
import type { RealtimeMessage } from "@/lib/api/realtime";

export interface LiveClassSession {
  id: string;
  title: string;
  instructor: string;
  cohort: string;
  status: "live" | "scheduled" | "ended";
  startsAt: string;
}

export interface LivePoll {
  id: string;
  classId: string;
  question: string;
  options: string[];
  status: "open" | "closed";
  createdBy?: string;
  results?: Record<string, number>;
  totalVotes?: number;
  myVote?: string;
}

export interface WhiteboardOp {
  id: string;
  classId: string;
  userId: string;
  userName: string;
  op: string;
  createdAt: string;
}

export function fetchLiveClasses(): Promise<Paginated<LiveClassSession>> {
  return apiFetch<Paginated<LiveClassSession>>("/v1/live/classes");
}

export function fetchLiveClass(id: string): Promise<LiveClassSession> {
  return apiFetch<LiveClassSession>(`/v1/live/classes/${id}`);
}

export function fetchLiveClassChat(
  classId: string,
  cursor?: string,
): Promise<Paginated<RealtimeMessage>> {
  return apiFetch<Paginated<RealtimeMessage>>(`/v1/live/classes/${classId}/chat`, {
    query: cursor ? { cursor } : undefined,
  });
}

export function sendLiveClassChat(classId: string, body: string): Promise<RealtimeMessage> {
  return apiFetch<RealtimeMessage>(`/v1/live/classes/${classId}/chat`, {
    method: "POST",
    body: { body },
  });
}

export function fetchLiveClassPolls(classId: string): Promise<Paginated<LivePoll>> {
  return apiFetch<Paginated<LivePoll>>(`/v1/live/classes/${classId}/polls`);
}

export function castLivePollVote(
  classId: string,
  pollId: string,
  option: string,
): Promise<LivePoll> {
  return apiFetch<LivePoll>(`/v1/live/classes/${classId}/polls/${pollId}/vote`, {
    method: "POST",
    body: { option },
  });
}

export function fetchWhiteboardOps(classId: string): Promise<WhiteboardOp[]> {
  return apiFetch<WhiteboardOp[]>(`/v1/live/classes/${classId}/whiteboard/ops`);
}

export function postWhiteboardOp(classId: string, op: string): Promise<WhiteboardOp> {
  return apiFetch<WhiteboardOp>(`/v1/live/classes/${classId}/whiteboard/ops`, {
    method: "POST",
    body: { op },
  });
}
