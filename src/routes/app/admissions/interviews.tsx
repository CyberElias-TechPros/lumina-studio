import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck2,
  CalendarClock,
  UserRoundCheck,
  Users,
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

export const Route = createFileRoute("/app/admissions/interviews")({
  head: () => ({
    meta: [
      { title: "Interviews — CEA-OS" },
      { name: "description", content: "Schedule and track admissions interviews." },
    ],
  }),
  component: AdmissionsInterviews,
});

function formatApplied(date: string): string {
  return `Applied ${new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  })}`;
}

function AdmissionsInterviews() {
  const applications = useAdminApplications("interview");
  const items = applications.data?.pages.flatMap((p) => p.items) ?? [];
  const stats = useAdmissionsStats();
  const s = stats.data;
  const stageValue = (key: string) => s?.stages.find((x) => x.key === key)?.value ?? 0;

  return (
    <AppShell
      roleKey="instructor"
      title="Interview scheduler"
      subtitle={s ? `${items.length} applicants in interview` : "Loading…"}
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Pipeline healthy
          </Badge>
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
            label: "In interview",
            value: s ? String(stageValue("interview")) : "—",
            delta: "awaiting a panel slot",
            icon: CalendarCheck2,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Offers sent",
            value: s ? String(stageValue("offer")) : "—",
            delta: "after interview",
            icon: Users,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Enrolled",
            value: s ? String(stageValue("enrolled")) : "—",
            delta: "interviews → enrollment",
            icon: UserRoundCheck,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Applicants",
            value: s ? String(s.total) : "—",
            delta: "all time this cycle",
            icon: CalendarClock,
            tone: "bg-warning/10 text-warning",
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
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <CalendarCheck2 className="text-primary size-4" /> Interview pipeline
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<AdminApplication[]>
            query={applications}
            error={{ title: "Interview schedule unavailable" }}
            empty={{
              title: "No interviews booked",
              description: "Applicants reach this stage after their assessment is shortlisted.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((i) => (
                  <div
                    key={i.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">
                        {i.fullName}
                        {i.programTitle ? ` · ${i.programTitle}` : ""}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {i.ref} · {formatApplied(i.createdAt)}
                      </p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", "bg-warning/10 text-warning")}>
                      {PIPELINE_STAGE_LABELS["interview" as PipelineStage]}
                    </Badge>
                    <Button asChild variant="outline" size="sm" className="shrink-0 font-semibold">
                      <Link to="/app/admissions/applications/$id" params={{ id: i.ref }}>
                        Details <ArrowRight className="ml-1 size-3.5" />
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
