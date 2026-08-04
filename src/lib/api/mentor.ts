import { apiFetch } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";

export interface MentorProfile {
  id: string;
  name: string;
  focus: string;
  bio: string;
  skills: string[];
  areas: string[];
  availability: string;
  rating: number;
  sessionsCount: number;
}

export interface MentorMatch extends MentorProfile {
  match: number;
}

export interface MentorMatchResult {
  program: string;
  goal: string;
  matches: MentorMatch[];
}

/** Mentor endpoint — browse available mentor profiles. */
export function fetchMentorProfiles(cursor?: string): Promise<Paginated<MentorProfile>> {
  return apiFetch<Paginated<MentorProfile>>("/v1/mentor/profiles", {
    query: { cursor },
  });
}

/** Mentor endpoint — keyword-scored matchmaking over profiles. */
export function matchMentor(input: {
  program?: string;
  goal?: string;
}): Promise<MentorMatchResult> {
  return apiFetch<MentorMatchResult>("/v1/mentor/match", { method: "POST", body: input });
}
