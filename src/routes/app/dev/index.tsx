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

function DevHub() {
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
        {[
          {
            label: "Open PRs",
            value: "9",
            delta: "3 ready to merge",
            icon: GitPullRequest,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Deploys (30d)",
            value: "18",
            delta: "100% success",
            icon: Rocket,
            tone: "bg-success/10 text-success",
          },
          {
            label: "API uptime",
            value: "99.98%",
            delta: "30-day",
            icon: Terminal,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Open issues",
            value: "14",
            delta: "5 bugs",
            icon: Wrench,
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
