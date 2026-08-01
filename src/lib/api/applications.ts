import { apiFetch } from "@/lib/api/client";

export interface SubmitApplicationInput {
  fullName: string;
  email: string;
  programSlug: string;
}

export interface ApplicationResult {
  application: {
    id: string;
    ref: string;
    status: string;
  };
}

/** Public endpoint — creates an admissions application. */
export function submitApplication(input: SubmitApplicationInput): Promise<ApplicationResult> {
  return apiFetch<ApplicationResult>("/v1/applications", { method: "POST", body: input });
}
