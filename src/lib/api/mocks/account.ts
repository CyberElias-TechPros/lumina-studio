import { registerMock, registerMockPattern } from "@/lib/api/client";
import type { ApiRequestInit } from "@/lib/api/client";
import { ApiError } from "@/lib/errors";
import type { Account, JobRun } from "@/lib/api/account";

const delay = (ms = 120) => new Promise((r) => setTimeout(r, ms));

export function registerAccountMocks(): void {
  const account: Account = {
    id: "00000000-0000-4000-8000-000000000001",
    name: "Adaeze Okafor",
    email: "student@cea.ng",
    phone: null,
    roleKey: "student",
    avatarUrl: null,
    emailVerified: false,
    emailVerifiedAt: null,
    mfaEnabled: false,
    hasPassword: true,
    createdAt: "2026-01-15T09:00:00.000Z",
  };
  const MOCK_CODE = "123456";
  const runs: JobRun[] = [];

  registerMock("GET", "/v1/account", async () => {
    await delay();
    return { ...account };
  });
  registerMock("PATCH", "/v1/account", async (init: ApiRequestInit) => {
    await delay();
    const body = (init.body ?? {}) as { name?: string; phone?: string | null };
    if (body.name !== undefined) account.name = body.name;
    if (body.phone !== undefined) account.phone = body.phone || null;
    return { ...account };
  });
  registerMock("POST", "/v1/account/password", async (init: ApiRequestInit) => {
    await delay();
    const body = (init.body ?? {}) as { newPassword?: string };
    if (!body.newPassword || body.newPassword.length < 8) {
      throw new ApiError(400, "FIELD_VALIDATION", "Password must be at least 8 characters.");
    }
    account.hasPassword = true;
    return { ok: true };
  });
  registerMock("POST", "/v1/account/verify-email/send", async () => {
    await delay();
    return { ok: true, alreadyVerified: account.emailVerified, sent: true, devCode: MOCK_CODE };
  });
  registerMock("POST", "/v1/account/verify-email", async (init: ApiRequestInit) => {
    await delay();
    const { code } = (init.body ?? {}) as { code?: string };
    if (code !== MOCK_CODE) {
      throw new ApiError(
        400,
        "INVALID_CODE",
        "That code is invalid or has expired. (Mock code: 123456)",
      );
    }
    account.emailVerified = true;
    account.emailVerifiedAt = new Date().toISOString();
    return { ...account };
  });
  registerMock("GET", "/v1/account/export", async () => {
    await delay();
    return { exportedAt: new Date().toISOString(), account, data: { note: ["Mock-mode export"] } };
  });
  registerMock("POST", "/v1/account/delete", async (init: ApiRequestInit) => {
    await delay();
    const { confirm } = (init.body ?? {}) as { confirm?: string };
    if (confirm !== "DELETE")
      throw new ApiError(400, "FIELD_VALIDATION", 'Type "DELETE" to confirm.');
    return { ok: true };
  });

  registerMock("GET", "/v1/system/readiness", async () => {
    await delay();
    return {
      appEnv: "mock",
      emailProvider: "console",
      checks: {
        email: false,
        payments: false,
        turnstile: false,
        push: false,
        ai: false,
        errorReporting: false,
        sms: false,
        contactInbox: false,
        leadsSheet: false,
        uploads: true,
        realtime: true,
      },
      missingRequired: ["email", "payments"],
      ready: false,
    };
  });
  registerMock("GET", "/v1/system/jobs", async () => {
    await delay();
    return {
      schedule: {
        "*/15 * * * *": ["reconcile-payments"],
        "0 * * * *": ["enrollment-reminders"],
        "0 2 * * *": ["cleanup"],
      },
      items: runs,
    };
  });
  registerMockPattern("POST", "/v1/system/jobs/*/run", async (init) => {
    await delay();
    const job = (init.path ?? "").split("/").at(-2) ?? "";
    const now = new Date().toISOString();
    const run: JobRun = {
      id: crypto.randomUUID(),
      job,
      status: "ok",
      detail: "mock run",
      startedAt: now,
      finishedAt: now,
    };
    runs.unshift(run);
    return { job, status: "ok", detail: "mock run" };
  });
}
