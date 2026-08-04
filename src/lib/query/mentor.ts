import { useApiQuery, usePaginatedQuery } from "@/lib/query/hooks";
import {
  fetchMentorProfiles,
  matchMentor,
  type MentorMatchResult,
  type MentorProfile,
} from "@/lib/api/mentor";

export const mentorKeys = {
  profiles: ["mentor", "profiles"] as const,
};

export function useMentorProfiles() {
  return usePaginatedQuery<MentorProfile>(mentorKeys.profiles, fetchMentorProfiles);
}

export function useMentorMatch(input: { program?: string; goal?: string }, enabled = false) {
  return useApiQuery<MentorMatchResult>(
    [...mentorKeys.profiles, "match", input.program ?? "", input.goal ?? ""],
    () => matchMentor(input),
    { enabled },
  );
}
