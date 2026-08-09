import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Timer,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useGovCourses, useGovOverview } from "@/lib/query/government";
import type { GovCourse, GovKpi } from "@/lib/api/government";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/government/training")({
  head: () => ({
    meta: [
      { title: "Compliance Training — CEA-OS" },
      { name: "description", content: "Training and certifications." },
    ],
  }),
  component: GovernmentTraining,
});

const kpiMeta: Record<string, { icon: LucideIcon; tone: string }> = {
  Courses: { icon: BookOpen, tone: "bg-primary/10 text-primary" },
  Coverage: { icon: GraduationCap, tone: "bg-success/10 text-success" },
  Certifications: { icon: Award, tone: "bg-learning/10 text-learning" },
  "Expiring < 90d": { icon: Timer, tone: "bg-warning/10 text-warning" },
};

const defaultKpiMeta: { icon: LucideIcon; tone: string } = {
  icon: BookOpen,
  tone: "bg-primary/10 text-primary",
};

const courseTones: Record<string, string> = {
  Current: "bg-success/10 text-success",
  Renewing: "bg-warning/10 text-warning",
};

function GovernmentTraining() {
  const overviewQuery = useGovOverview();
  const coursesQuery = useGovCourses();

  return (
    <AppShell
      roleKey="government"
      title="Compliance training"
      subtitle="6 mandatory courses · 92% coverage · auto-reminders"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">92% coverage</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/government">
              <ArrowLeft className="size-4" /> Compliance portal
            </Link>
          </Button>
        </>
      }
    >
      <QueryState<GovKpi[]>
        query={overviewQuery}
        error={{ title: "Metrics unavailable" }}
        empty={{ title: "No metrics", description: "Compliance metrics will appear here." }}
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
            <CheckCircle2 className="text-primary size-4" /> Courses
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<GovCourse[]>
            query={coursesQuery}
            error={{ title: "Courses unavailable" }}
            empty={{ title: "No courses", description: "Compliance training will show here." }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{c.title}</p>
                      <p className="text-muted-foreground text-xs">{c.detail}</p>
                    </div>
                    <Badge
                      className={cn(
                        "border-0 font-semibold",
                        courseTones[c.status] ?? "bg-success/10 text-success",
                      )}
                    >
                      {c.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      Report
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
