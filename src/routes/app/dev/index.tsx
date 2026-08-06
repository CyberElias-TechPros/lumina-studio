import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  GitPullRequest,
  Rocket,
  Terminal,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useDevOverview } from "@/lib/query/dev";
import type { DevKpi } from "@/lib/api/dev";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/dev/")({
  head: () => ({
    meta: [
      { title: "Dev Hub — CEA-OS" },
      {
        name: "description",
        content: "Engineering workspace: deploys, PRs, monitoring and tasks.",
      },
    ],
  }),
  component: DevHub,
});

const screens = [
  {
    icon: Terminal,
    label: "API playground",
    desc: "Swagger, test endpoints",
    path: "/app/dev/api-playground",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: Rocket,
    label: "Deployments",
    desc: "History, rollback",
    path: "/app/dev/deployments",
    tone: "bg-success/10 text-success",
  },
  {
    icon: GitPullRequest,
    label: "Git & PRs",
    desc: "PR status, CI checks",
    path: "/app/dev/git",
    tone: "bg-learning/10 text-learning",
  },
  {
    icon: Code2,
    label: "Monitoring",
    desc: "Errors, traces",
    path: "/app/dev/monitoring",
    tone: "bg-warning/10 text-warning",
  },
  {
    icon: Wrench,
    label: "Tasks",
    desc: "Sprint board",
    path: "/app/dev/tasks",
    tone: "bg-career/10 text-career",
  },
];

const kpiMeta = [
  { icon: GitPullRequest, tone: "bg-primary/10 text-primary" },
  { icon: Rocket, tone: "bg-success/10 text-success" },
  { icon: Terminal, tone: "bg-learning/10 text-learning" },
  { icon: Wrench, tone: "bg-warning/10 text-warning" },
];

function DevHub() {
  const overviewQuery = useDevOverview();

  return (
    <AppShell
      roleKey="instructor"
      title="Dev hub"
      subtitle="cea-os monorepo · main branch green · sprint 14"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">CI green</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/developer">
              <ArrowLeft className="size-4" /> Developer portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <QueryState<DevKpi[]>
          query={overviewQuery}
          error={{ title: "Overview unavailable" }}
          empty={{ title: "No metrics", description: "Overview metrics will show here." }}
          isEmpty={(rows) => rows.length === 0}
        >
          {(rows) => (
            <>
              {rows.map((k, i) => {
                const meta = kpiMeta[i % kpiMeta.length];
                return (
                  <Card key={k.id} className="bg-card shadow-soft border">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between">
                        <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                          {k.metric}
                        </p>
                        <span
                          className={cn("grid size-8 place-items-center rounded-lg", meta.tone)}
                        >
                          <meta.icon className="size-4" />
                        </span>
                      </div>
                      <p className="font-display mt-3 text-2xl font-extrabold">{k.valueLabel}</p>
                      <p className="text-muted-foreground mt-0.5 text-xs font-semibold">
                        {k.delta}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </>
          )}
        </QueryState>
      </div>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Code2 className="text-primary size-4" /> Workspace
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {screens.map((s) => (
            <Link
              key={s.path}
              to={s.path}
              className="group bg-card shadow-soft hover:shadow-elevated flex flex-col rounded-xl border p-4 transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <span className={cn("grid size-9 place-items-center rounded-lg", s.tone)}>
                  <s.icon className="size-4" />
                </span>
                <ArrowRight className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
              </div>
              <p className="font-display mt-3 text-sm font-extrabold">{s.label}</p>
              <p className="text-muted-foreground mt-1 text-xs">{s.desc}</p>
            </Link>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
