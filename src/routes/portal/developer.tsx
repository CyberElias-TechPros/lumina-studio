import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Boxes,
  Braces,
  Bug,
  CheckCircle2,
  Code2,
  Eye,
  GitPullRequest,
  Inbox,
  KeyRound,
  LayoutTemplate,
  ListTodo,
  Rocket,
  Server,
  ToggleRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/developer")({
  head: () => ({
    meta: [
      { title: "Developer Portal — CEA-OS" },
      {
        name: "description",
        content: "Deployments, issues, feature flags and API health for the engineering team.",
      },
    ],
  }),
  component: DeveloperPortal,
});

const releases = [
  {
    name: "v2.14.0 · Assessment proctoring",
    status: "Live",
    pct: 100,
    tone: "bg-success/10 text-success",
  },
  {
    name: "v2.15.0 · Marketplaces revamp",
    status: "Preview",
    pct: 78,
    tone: "bg-primary/10 text-primary",
  },
  {
    name: "v2.16.0 · Mobile-first learner app",
    status: "In dev",
    pct: 34,
    tone: "bg-warning/10 text-warning",
  },
];

const screens = [
  {
    icon: LayoutTemplate,
    label: "Hub",
    desc: "Dev hub and pipeline",
    path: "/app/dev",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: Braces,
    label: "API playground",
    desc: "Test endpoints live",
    path: "/app/dev/api-playground",
    tone: "bg-success/10 text-success",
  },
  {
    icon: Rocket,
    label: "Deployments",
    desc: "Releases and rollbacks",
    path: "/app/dev/deployments",
    tone: "bg-learning/10 text-learning",
  },
  {
    icon: Activity,
    label: "Monitoring",
    desc: "Metrics and alerts",
    path: "/app/dev/monitoring",
    tone: "bg-warning/10 text-warning",
  },
  {
    icon: ListTodo,
    label: "Tasks",
    desc: "Engineering backlog",
    path: "/app/dev/tasks",
    tone: "bg-career/10 text-career",
  },
  {
    icon: GitPullRequest,
    label: "Git & PRs",
    desc: "Pull requests and merges",
    path: "/app/dev/git",
    tone: "bg-community/10 text-community",
  },
  {
    icon: BookOpen,
    label: "Docs",
    desc: "API and dev docs",
    path: "/app/dev/docs",
    tone: "bg-erp/10 text-erp",
  },
  {
    icon: Eye,
    label: "Reviews",
    desc: "Code review queue",
    path: "/app/dev/reviews",
    tone: "bg-services/10 text-services",
  },
  {
    icon: KeyRound,
    label: "Env vars",
    desc: "Environment secrets",
    path: "/app/dev/env",
    tone: "bg-ink/10 text-ink",
  },
  {
    icon: Inbox,
    label: "Queues",
    desc: "Jobs and workers",
    path: "/app/dev/queues",
    tone: "bg-error/10 text-error",
  },
  {
    icon: Boxes,
    label: "Dependencies",
    desc: "Package updates and CVEs",
    path: "/app/dev/dependencies",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: ToggleRight,
    label: "Feature flags",
    desc: "Toggle releases safely",
    path: "/app/dev/feature-flags",
    tone: "bg-success/10 text-success",
  },
];

function DeveloperPortal() {
  return (
    <AppShell
      roleKey="admin"
      title="Developer workspace"
      subtitle="CEA-OS platform · monorepo · trunk-based"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">CI: green</Badge>
          <Badge variant="secondary" className="font-semibold">
            prod: v2.14.0
          </Badge>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Open PRs",
            value: "7",
            delta: "2 need review",
            icon: GitPullRequest,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Open issues",
            value: "23",
            delta: "3 critical",
            icon: Bug,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Deployments (30d)",
            value: "46",
            delta: "0 rollbacks",
            icon: Rocket,
            tone: "bg-success/10 text-success",
          },
          {
            label: "API uptime",
            value: "99.99%",
            delta: "p99 latency 240ms",
            icon: Server,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Rocket className="text-primary size-4" /> Releases
            </CardTitle>
            <Button asChild variant="ghost" size="sm" className="text-primary font-semibold">
              <Link to="/app">
                Pipeline <ArrowRight className="ml-1 size-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-5">
            {releases.map((r) => (
              <div key={r.name}>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="font-mono font-bold">{r.name}</span>
                  <Badge className={cn("border-0 font-semibold", r.tone)}>{r.status}</Badge>
                </div>
                <Progress value={r.pct} className="mt-1.5 h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Code2 className="text-primary size-4" /> Critical issues
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  t: "Scheduler: cohort sync edge case",
                  s: "Hotfix · 2h ago",
                  tone: "bg-warning/10 text-warning",
                },
                {
                  t: "Marketplace filters in Safari",
                  s: "Open · assigned",
                  tone: "bg-error/10 text-error",
                },
                {
                  t: "Certificate QR on dark mode",
                  s: "Fixed · verifying",
                  tone: "bg-primary/10 text-primary",
                },
              ].map((x) => (
                <div key={x.t} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-sm font-semibold">{x.t}</span>
                  <Badge className={cn("border-0 font-semibold", x.tone)}>{x.s}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <CheckCircle2 className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Release today 16:00 UTC</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Proctoring v2 flag to 50% of cohorts. On-call: Emeka · #eng-oncall.
              </p>
              <Button asChild size="sm" className="bg-gradient-brand shadow-glow mt-4 border-0">
                <Link to="/portal/admin">
                  Admin console <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <LayoutTemplate className="text-primary size-4" /> Workspace
          </CardTitle>
          <Badge variant="secondary" className="font-semibold">
            {screens.length} modules
          </Badge>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
