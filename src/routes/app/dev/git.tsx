import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  GitBranch,
  GitPullRequest,
  GitMerge,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useDevPrs } from "@/lib/query/dev";
import type { DevPr } from "@/lib/api/dev";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/dev/git")({
  head: () => ({
    meta: [
      { title: "Git & PRs — CEA-OS" },
      { name: "description", content: "Pull request status and CI checks." },
    ],
  }),
  component: DevGit,
});

function prTone(status: string) {
  if (/pass|check|ready|approved|success/i.test(status)) return "bg-success/10 text-success";
  if (/reject|conflict|blocked|fail/i.test(status)) return "bg-destructive/10 text-destructive";
  if (/review|request/i.test(status)) return "bg-warning/10 text-warning";
  return "bg-primary/10 text-primary";
}

function DevGit() {
  const prsQuery = useDevPrs();

  return (
    <AppShell
      roleKey="dev"
      title="Git & PR status"
      subtitle="main green · 9 open PRs · merge queue on"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">3 ready</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/dev">
              <ArrowLeft className="size-4" /> Dev hub
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
            delta: "3 ready",
            icon: GitPullRequest,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "CI passing",
            value: "89%",
            delta: "of PRs",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Branches",
            value: "12",
            delta: "4 stale",
            icon: GitBranch,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Protected",
            value: "main",
            delta: "2 approvals",
            icon: ShieldCheck,
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
            <GitMerge className="text-primary size-4" /> Recent PRs
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<DevPr[]>
            query={prsQuery}
            error={{ title: "PRs unavailable" }}
            empty={{ title: "No pull requests", description: "Open pull requests will show here." }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((p) => (
                  <div
                    key={p.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-sm font-bold">{p.title}</p>
                      <p className="text-muted-foreground text-xs">{p.branch}</p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", prTone(p.status))}>
                      {p.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      View
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
