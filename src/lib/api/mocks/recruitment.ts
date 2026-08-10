import { registerMock, registerMockPattern } from "@/lib/api/client";
import { postings, pipelineCandidates, interviews, talentCandidates } from "@/data/recruitment";

function delay(milliseconds = 120): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function registerRecruitmentMocks(): void {
  registerMock("GET", "/v1/recruitment/postings", async () => {
    await delay(120);
    return {
      items: postings.map((p, i) => ({ id: `post-${i + 1}`, ...p })),
      total: postings.length,
    };
  });

  const postingIds = postings.map((_, i) => `post-${i + 1}`);
  for (const postingId of [...postingIds, "junior-backend-engineer"]) {
    registerMock("GET", `/v1/recruitment/postings/${postingId}/candidates`, async () => {
      await delay(120);
      return {
        items: pipelineCandidates.map((c, i) => ({ id: `cand-${i + 1}`, ...c })),
        total: pipelineCandidates.length,
      };
    });
  }

  registerMock("GET", "/v1/recruitment/interviews", async () => {
    await delay(120);
    return {
      items: interviews.map((i, idx) => ({ id: `ivw-${idx + 1}`, ...i })),
      total: interviews.length,
    };
  });

  registerMock("GET", "/v1/recruitment/talent", async () => {
    await delay(120);
    return {
      items: talentCandidates.map((t, i) => ({ id: `talent-${i + 1}`, ...t })),
      total: talentCandidates.length,
    };
  });

  registerMock("POST", "/v1/recruitment/postings", async (init) => {
    await delay(200);
    const body = (init.body ?? {}) as { title?: string; detail?: string; tone?: string };
    return {
      ok: true,
      id: `post-${Date.now()}`,
      title: body.title ?? "Untitled role",
      status: "open",
      posted: "Just now",
    };
  });

  registerMockPattern("PATCH", "/v1/recruitment/postings/*/candidates/*", async (init) => {
    await delay(200);
    const { stage } = (init.body ?? {}) as { stage?: string };
    const segs = (init.path ?? "").split("/");
    const candidateId = segs[segs.length - 1] ?? "";
    return { ok: true, id: candidateId, stage: stage ?? "interview" };
  });
}
