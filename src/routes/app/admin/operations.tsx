"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { CheckCircle2, Clock, Loader2, Play, XCircle } from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { useJobRuns, useRunJob, useSystemReadiness } from "@/lib/query/account";
import type { JobRun, SystemReadiness } from "@/lib/api/account";

export const Route = createFileRoute("/app/admin/operations")({
  head: () => ({
    meta: [
      { title: "Operations — CEA-OS" },
      { name: "description", content: "Integration readiness and scheduled jobs." },
    ],
  }),
  component: OperationsPage,
});

const CHECK_LABELS: Record<string, { label: string; hint: string }> = {
  email: { label: "Transactional email", hint: "EMAIL_PROVIDER + EMAIL_API_KEY secret" },
  payments: {
    label: "Paystack payments",
    hint: "PAYSTACK_SECRET_KEY secret + NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY",
  },
  turnstile: {
    label: "Bot protection (Turnstile)",
    hint: "TURNSTILE_SECRET_KEY + NEXT_PUBLIC_TURNSTILE_SITE_KEY",
  },
  push: {
    label: "Web push",
    hint: "VAPID_PUBLIC_KEY / VAPID_PRIVATE_KEY + NEXT_PUBLIC_VAPID_PUBLIC_KEY",
  },
  ai: { label: "AI assistant", hint: "AI_API_KEY secret" },
  errorReporting: { label: "Error reporting", hint: "SENTRY_DSN secret" },
  sms: { label: "SMS", hint: "SMS_PROVIDER + SMS_API_KEY secret" },
  contactInbox: {
    label: "Contact and business-intake inbox",
    hint: "CONTACT_INBOX or EMAIL_REPLY_TO var",
  },
  leadsSheet: { label: "Leads Google Sheet", hint: "GOOGLE_SHEET_WEBHOOK_URL var" },
  uploads: { label: "File uploads (R2)", hint: "UPLOADS binding" },
  realtime: { label: "Realtime rooms", hint: "REALTIME_ROOMS binding" },
};

const JOBS = [
  { key: "reconcile-payments", label: "Reconcile payments", when: "Every 15 minutes" },
  { key: "enrollment-reminders", label: "Enrollment reminders", when: "Hourly" },
  { key: "assignment-reminders", label: "Assignment reminders", when: "Every 15 min" },
  { key: "cleanup", label: "Cleanup expired data", when: "Daily 02:00 UTC" },
];

function OperationsPage() {
  const readiness = useSystemReadiness();
  const jobs = useJobRuns();
  const run = useRunJob();

  return (
    <AppShell roleKey="admin" title="Operations" subtitle="Integrations · scheduled jobs">
      <div className="grid gap-6">
        <QueryState<SystemReadiness> query={readiness}>
          {(r) => (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Integration readiness</CardTitle>
                <Badge
                  className={
                    r.ready
                      ? "bg-success/10 text-success border-0"
                      : "bg-warning/10 text-warning border-0"
                  }
                >
                  {r.ready ? "Production ready" : `Missing: ${r.missingRequired.join(", ")}`}
                </Badge>
              </CardHeader>
              <CardContent className="grid gap-2 sm:grid-cols-2">
                {Object.entries(r.checks).map(([key, ok]) => (
                  <div key={key} className="flex items-start gap-2.5 rounded-lg border p-3 text-sm">
                    {ok ? (
                      <CheckCircle2 className="text-success mt-0.5 size-4 shrink-0" />
                    ) : (
                      <XCircle className="text-muted-foreground mt-0.5 size-4 shrink-0" />
                    )}
                    <div>
                      <p className="font-semibold">{CHECK_LABELS[key]?.label ?? key}</p>
                      {!ok && (
                        <p className="text-muted-foreground text-xs">
                          Configure {CHECK_LABELS[key]?.hint ?? key}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                <p className="text-muted-foreground text-xs sm:col-span-2">
                  Environment: {r.appEnv} · email provider: {r.emailProvider}. Secret values are
                  never shown here.
                </p>
              </CardContent>
            </Card>
          )}
        </QueryState>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Scheduled jobs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {JOBS.map((job) => (
              <div
                key={job.key}
                className="flex flex-wrap items-center gap-3 rounded-lg border p-3"
              >
                <Clock className="text-muted-foreground size-4" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{job.label}</p>
                  <p className="text-muted-foreground text-xs">{job.when}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={run.isPending}
                  onClick={() => run.mutate(job.key)}
                >
                  {run.isPending && run.variables === job.key ? (
                    <Loader2 className="mr-1.5 size-4 animate-spin" />
                  ) : (
                    <Play className="mr-1.5 size-4" />
                  )}
                  Run now
                </Button>
              </div>
            ))}
            {run.data && (
              <p className="text-muted-foreground text-xs">
                {run.data.job}: {run.data.status} — {run.data.detail}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent runs</CardTitle>
          </CardHeader>
          <CardContent>
            <QueryState<{ items: JobRun[] }>
              query={jobs}
              isEmpty={(d) => d.items.length === 0}
              empty={{
                title: "No job runs yet",
                description: "Runs appear after the first cron tick.",
              }}
            >
              {(d) => (
                <div className="divide-y text-sm">
                  {d.items.map((r) => (
                    <div key={r.id} className="flex flex-wrap items-center gap-3 py-2">
                      <Badge
                        className={
                          r.status === "ok"
                            ? "bg-success/10 text-success border-0"
                            : "bg-error/10 text-error border-0"
                        }
                      >
                        {r.status}
                      </Badge>
                      <span className="font-semibold">{r.job}</span>
                      <span className="text-muted-foreground flex-1 truncate">{r.detail}</span>
                      <span className="text-muted-foreground text-xs">
                        {new Date(r.startedAt).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </QueryState>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
