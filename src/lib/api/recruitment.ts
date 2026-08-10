import { apiFetch } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";

export interface JobPosting {
  id: string;
  title: string;
  applicants: number;
  views: number;
  posted: string;
  status: string;
  detail: string;
  tone: string;
}

export interface PipelineCandidate {
  id: string;
  name: string;
  stage: string;
  detail: string;
  score: number;
}

export interface Interview {
  id: string;
  candidate: string;
  role: string;
  date: string;
  mode: string;
  status: string;
}

export interface TalentCandidate {
  id: string;
  name: string;
  program: string;
  score: number;
  stage: string;
  match: number;
  skills: string[];
  available: string;
}

export function fetchPostings(): Promise<Paginated<JobPosting>> {
  return apiFetch<Paginated<JobPosting>>("/v1/recruitment/postings");
}

export function fetchPipelineCandidates(jobId: string): Promise<Paginated<PipelineCandidate>> {
  return apiFetch<Paginated<PipelineCandidate>>(`/v1/recruitment/postings/${jobId}/candidates`);
}

export function fetchInterviews(): Promise<Paginated<Interview>> {
  return apiFetch<Paginated<Interview>>("/v1/recruitment/interviews");
}

export function fetchTalentCandidates(): Promise<Paginated<TalentCandidate>> {
  return apiFetch<Paginated<TalentCandidate>>("/v1/recruitment/talent");
}

export interface CreatePostingInput {
  title: string;
  detail?: string;
  tone?: string;
}

export interface CreatePostingResult {
  ok: boolean;
  id: string;
  title: string;
  status: string;
  posted: string;
}

export function createPosting(input: CreatePostingInput): Promise<CreatePostingResult> {
  return apiFetch<CreatePostingResult>("/v1/recruitment/postings", {
    method: "POST",
    body: input,
  });
}
