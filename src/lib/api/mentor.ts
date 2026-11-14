import { apiFetch } from "@/lib/api/client";
import type { DirectoryMentor } from "@/lib/api/mentoring";
export type MentorProfile = DirectoryMentor;
export interface MentorMatchResult {
  program: string;
  goal: string;
  matches: MentorProfile[];
  truncated: boolean;
}
export function requestMentor(input: {
  mentorId: string;
  goal: string;
}): Promise<{ ok: boolean; id: string }> {
  return apiFetch("/v1/mentor/requests", { method: "POST", body: input });
}
export function fetchMentorProfiles(): Promise<{ items: MentorProfile[]; truncated: boolean }> {
  return apiFetch("/v1/mentor/profiles");
}
export function matchMentor(input: {
  program?: string;
  goal?: string;
}): Promise<MentorMatchResult> {
  return apiFetch("/v1/mentor/match", { method: "POST", body: input });
}
