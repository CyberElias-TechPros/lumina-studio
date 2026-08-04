import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  ClipboardCheck,
  Funnel,
  GraduationCap,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useAdminApplications, useAdmissionsStats } from "@/lib/query/admissions";
import { PIPELINE_STAGE_LABELS, type PipelineStage } from "@/lib/api/applications";
import type { AdminApplication, AdmissionsStats } from "@/lib/api/applications";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/admissions/reports")({
  head: () => ({
    meta: [
      { title: "Reports — CEA-OS" },
      { name: "description", content: "Pipeline funnel and stage breakdown." },
    ],
  }),
  component: AdmissionsReports,
});

const colorFor = (key: string) =>
  key === "enrolled"
    ? "bg-success"
    : key === "offer"
      ? "bg-warning"
      : key === "interview"
        ? "bg-learning"
        : "bg-gradient-brand";

function AdmissionsReports() {
  const stats = useAdmissionsStats();
  const s = stats.data;
  const submitted = useAdminApplications("submitted");
  const items = submitted.data?.pages.flatMap((p) => p.items) ?? [];

  const value = (key: string) => s?.stages.find((x) => x.key === key)?.value ?? 0;

  return (
    <AppShell
      roleKey="instructor"
      title="Reports"
      subtitle={
        s ? `${value("offer")} offers · ${value("enrolled")} enrolled of ${s?.total}` : "Loading…"
      }
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Live funnel</Badge>
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
            label: "Total apps",
            value: s ? String(s.total) : "—",
            delta: `${s?.activeStages ?? "—"} active stages`,
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "In queue",
            value: s ? String(value("submitted") + value("screening")) : "—",
            delta: "awaiting a decision",
            icon: ClipboardCheck,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Offers",
            value: s ? String(value("offer")) : "—",
            delta: "sent this cycle",
            icon: BarChart3,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Enrolled",
            value: s ? String(value("enrolled")) : "—",
            delta: "converted to enrollment",
            icon: GraduationCap,
            tone: "bg-success/10 text-success",
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

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Funnel className="text-primary size-4" /> Pipeline funnel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <QueryState<AdmissionsStats>
              query={stats}
              error={{ title: "Funnel unavailable" }}
              empty={{ title: "No pipeline data" }}
              isEmpty={(d) => d.stages.length === 0}
            >
              {(d) =>
                d.stages.map((st) => {
                  const pct = d.total > 0 ? Math.round((st.value / d.total) * 100) : 0;
                  return (
                    <div key={st.key}>
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span>{PIPELINE_STAGE_LABELS[st.key as PipelineStage] ?? st.label}</span>
                        <span>
                          {st.value} · {pct}%
                        </span>
                      </div>
                      <div className="bg-muted mt-1.5 h-2 overflow-hidden rounded-full">
                        <div
                          className={cn("h-full rounded-full", colorFor(st.key))}
                          style={{ width: `${Math.max(pct, 4)}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              }
            </QueryState>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <ClipboardCheck className="text-primary size-4" /> Latest submissions
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            <QueryState<AdminApplication[]>
              query={submitted}
              error={{ title: "Submissions unavailable" }}
              empty={{
                title: "No new submissions",
                description: "Newly received applications will appear here.",
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
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="shrink-0 font-semibold"
                      >
                        <Link to="/app/admissions/applications/$id" params={{ id: q.ref }}>
                          Open <ArrowRight className="ml-1 size-3.5" />
                        </Link>
                      </Button>
                    </div>
                  ))}
                </>
              )}
            </QueryState>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
