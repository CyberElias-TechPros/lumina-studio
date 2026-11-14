import { useMutation } from "@tanstack/react-query";
import { useApiQuery } from "@/lib/query/hooks";
import {
  fetchMentorProfiles,
  matchMentor,
  requestMentor,
  type MentorMatchResult,
  type MentorProfile,
} from "@/lib/api/mentor";
export const mentorKeys = { profiles: ["mentor", "profiles"] as const };
export function useMentorProfiles() {
  return useApiQuery<{ items: MentorProfile[]; truncated: boolean }>(
    mentorKeys.profiles,
    fetchMentorProfiles,
  );
}
export function useMentorMatch(input: { program?: string; goal?: string }, enabled = false) {
  return useApiQuery<MentorMatchResult>(
    [...mentorKeys.profiles, "match", input.program ?? "", input.goal ?? ""],
    () => matchMentor(input),
    { enabled },
  );
}
export function useRequestMentor() {
  return useMutation({ mutationFn: requestMentor, retry: false });
}
