import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpenCheck,
  CheckCircle2,
  Clock3,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useHrOverview, useHrPrograms } from "@/lib/query/hrTraining";
import type { HrKpi, HrProgram } from "@/lib/api/hrTraining";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/hr/training")({
  head: () => ({
    meta: [
      { title: "Training — CEA-OS" },
      { name: "description", content: "Staff training records and development." },
    ],
  }),
  component: HrTraining,
});

function programTone(status: string) {
  if (/ongoing|active|in progress/i.test(status)) return "bg-success/10 text-success";
  if (/scheduled|pending|due|upcoming|enrolled/i.test(status)) return "bg-warning/10 text-warning";
  return "bg-primary/10 text-primary";
}

const kpiMeta: Record<string, { icon: LucideIcon; tone: string }> = {
  Programs: { icon: GraduationCap, tone: "bg-primary/10 text-primary" },
  Completions: { icon: CheckCircle2, tone: "bg-success/10 text-success" },
  "Hours trained": { icon: BookOpenCheck, tone: "bg-learning/10 text-learning" },
  "Due (90d)": { icon: Clock3, tone: "bg-warning/10 text-warning" },
};

const defaultKpiMeta: { icon: LucideIcon; tone: string } = {
  icon: GraduationCap,
  tone: "bg-primary/10 text-primary",
};

function HrTraining() {
  const overviewQuery = useHrOverview();
  const programsQuery = useHrPrograms();
  return (
    <AppShell
      roleKey="hr"
      title="Training records"
      subtitle="8 programs · 142 completions this year"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">81% trained</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/hr">
              <ArrowLeft className="size-4" /> HR hub
            </Link>
          </Button>
        </>
      }
    >
      <QueryState<HrKpi[]>
        query={overviewQuery}
        error={{ title: "Metrics unavailable" }}
        empty={{ title: "No metrics", description: "Training metrics will appear here." }}
        isEmpty={(rows) => rows.length === 0}
      >
        {(rows) => (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {rows.map((k) => {
              const meta = kpiMeta[k.metric] ?? defaultKpiMeta;
              return (
                <Card key={k.id} className="bg-card shadow-soft border">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                        {k.metric}
                      </p>
                      <span className={cn("grid size-8 place-items-center rounded-lg", meta.tone)}>
                        <meta.icon className="size-4" />
                      </span>
                    </div>
                    <p className="font-display mt-3 text-2xl font-extrabold">{k.valueLabel}</p>
                    <p className="text-muted-foreground mt-0.5 text-xs font-semibold">{k.delta}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </QueryState>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <GraduationCap className="text-primary size-4" /> Programs
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<HrProgram[]>
            query={programsQuery}
            error={{ title: "Failed to load programs" }}
            empty={{
              title: "No programs",
              description: "Training programs will appear here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(items) =>
              items.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">{p.name}</p>
                    <p className="text-muted-foreground text-xs">{p.detail}</p>
                  </div>
                  <Badge className={cn("border-0 font-semibold", programTone(p.status))}>
                    {p.status}
                  </Badge>
                  <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                    View
                  </Button>
                </div>
              ))
            }
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
