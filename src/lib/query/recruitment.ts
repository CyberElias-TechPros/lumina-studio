import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  fetchPostings,
  fetchPipelineCandidates,
  fetchInterviews,
  fetchTalentCandidates,
  type JobPosting,
  type PipelineCandidate,
  type Interview,
  type TalentCandidate,
} from "@/lib/api/recruitment";

export const recruitmentKeys = {
  postings: ["recruitment", "postings"] as const,
  pipeline: (jobId: string) => ["recruitment", "postings", jobId, "candidates"] as const,
  interviews: ["recruitment", "interviews"] as const,
  talent: ["recruitment", "talent"] as const,
};

export function usePostings() {
  return usePaginatedQuery<JobPosting>(recruitmentKeys.postings, fetchPostings);
}

export function usePostingItems(): JobPosting[] {
  return flattenPages(usePostings().data?.pages);
}

export function usePipelineCandidates(jobId: string) {
  return usePaginatedQuery<PipelineCandidate>(recruitmentKeys.pipeline(jobId), () =>
    fetchPipelineCandidates(jobId),
  );
}

export function usePipelineCandidateItems(jobId: string): PipelineCandidate[] {
  return flattenPages(usePipelineCandidates(jobId).data?.pages);
}

export function useInterviews() {
  return usePaginatedQuery<Interview>(recruitmentKeys.interviews, fetchInterviews);
}

export function useInterviewItems(): Interview[] {
  return flattenPages(useInterviews().data?.pages);
}

export function useTalentCandidates() {
  return usePaginatedQuery<TalentCandidate>(recruitmentKeys.talent, fetchTalentCandidates);
}

export function useTalentCandidateItems(): TalentCandidate[] {
  return flattenPages(useTalentCandidates().data?.pages);
}
