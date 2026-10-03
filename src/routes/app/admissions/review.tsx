"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  UserRound,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useAdminApplications, useAdmissionsStats } from "@/lib/query/admissions";
import { PIPELINE_STAGE_LABELS, type PipelineStage } from "@/lib/api/applications";
import type { AdminApplication } from "@/lib/api/applications";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/admissions/review")({
  head: () => ({
    meta: [
      { title: "Review Pipeline — CEA-OS" },
      { name: "description", content: "Shortlist, reject and take notes on applications." },
    ],
  }),
  component: AdmissionsReview,
});

const stageTone: Record<string, string> = {
  submitted: "bg-learning/10 text-learning",
  screening: "bg-primary/10 text-primary",
  assessment: "bg-primary/10 text-primary",
  interview: "bg-warning/10 text-warning",
  offer: "bg-success/10 text-success",
  enrolled: "bg-success/10 text-success",
};

function AdmissionsReview() {
  const applications = useAdminApplications("assessment");
  const items = applications.data?.pages.flatMap((p) => p.items) ?? [];
  const stats = useAdmissionsStats();
  const s = stats.data;

  const queueCount = s
    ? s.stages.reduce((sum, st) => {
        if (st.key === "submitted" || st.key === "screening" || st.key === "assessment") {
          return sum + st.value;
        }
        return sum;
      }, 0)
    : 0;
  const active = s?.activeStages ?? 0;

  return (
    <AppShell
      roleKey="admissions"
      title="Review pipeline"
      subtitle={s ? `${queueCount} awaiting review · ${active} in active stages` : "Loading…"}
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">On SLA</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/admissions">
              <ArrowLeft className="size-4" /> Admissions hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "In queue",
            value: s ? String(queueCount) : "—",
            delta: "awaiting a decision",
            icon: ClipboardCheck,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Active review",
            value: s ? String(active) : "—",
            delta: "screening · assessment · interview",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Offers",
            value: s ? String(s.stages.find((x) => x.key === "offer")?.value ?? 0) : "—",
            delta: "sent this cycle",
            icon: UserRound,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Enrolled",
            value: s ? String(s.stages.find((x) => x.key === "enrolled")?.value ?? 0) : "—",
            delta: `of ${s?.total ?? "—"} total applicants`,
            icon: XCircle,
            tone: "bg-learning/10 text-learning",
          },
        ].map((k) => (
          <Card key={k.label} className="bg-card shadow-soft border">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                  {k.label}
                </p>
                <span className={cn("grid size-8 place-items-center rounded-lg", k.tone)}>
                  <k.icon className="size-4" />
                </span>
              </div>
              <p className="font-display mt-3 text-2xl font-extrabold">{k.value}</p>
              <p className="text-muted-foreground mt-0.5 text-xs font-semibold">{k.delta}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <UserRound className="text-primary size-4" /> Review queue
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<AdminApplication[]>
            query={applications}
            error={{ title: "Queue unavailable" }}
            empty={{
              title: "Nothing to review",
              description: "No applications are sitting in assessment right now.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((q) => (
                  <div
                    key={q.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">
                        {q.fullName}
                        {q.programTitle ? ` · ${q.programTitle}` : ""}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {q.ref}
                        {q.city ? ` · ${q.city}` : ""}
                        {q.experience ? ` · ${q.experience}` : ""}
                      </p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", stageTone[q.status])}>
                      {PIPELINE_STAGE_LABELS[q.status as PipelineStage] ?? q.status}
                    </Badge>
                    <Button asChild variant="outline" size="sm" className="shrink-0 font-semibold">
                      <Link to="/app/admissions/applications/$id" params={{ id: q.ref }}>
                        Review <ArrowRight className="ml-1 size-3.5" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
