import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  FileText,
  FolderGit2,
  MessageSquare,
  Receipt,
  Timer,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import type { CliMilestone } from "@/lib/query/clientEngagement";
import { useCliMilestones } from "@/lib/query/clientEngagement";
import { formatNaira } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/client/projects/$projectId")({
  head: () => ({
    meta: [
      { title: "Project Dashboard — CEA-OS" },
      { name: "description", content: "Timeline, milestones and deliverables." },
    ],
  }),
  component: ClientProject,
});

function statusTone(s: string) {
  const l = s.toLowerCase();
  if (l.includes("done") || l.includes("complete")) return "bg-success/10 text-success";
  if (l.includes("progress")) return "bg-primary/10 text-primary";
  return "bg-muted-foreground/10 text-muted-foreground";
}

function ClientProject() {
  const milestonesQuery = useCliMilestones();

  return (
    <AppShell
      roleKey="client"
      title="OrderPadi web app"
      subtitle="CEA Studio project #CEA-0142 · 8-week build"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">On track</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/client">
              <ArrowLeft className="size-4" /> Client portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Progress",
            value: "55%",
            delta: "milestone 3 of 5",
            icon: FolderGit2,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Team",
            value: "4",
            delta: "2 devs · designer · PM",
            icon: Users,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Next milestone",
            value: "Aug 20",
            delta: "core build due",
            icon: CalendarDays,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Spend to date",
            value: formatNaira(385000),
            delta: "of " + formatNaira(700000),
            icon: Receipt,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <CalendarDays className="text-primary size-4" /> Timeline & milestones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <QueryState<CliMilestone[]>
                query={milestonesQuery}
                error={{ title: "Milestones unavailable" }}
                empty={{
                  title: "No milestones",
                  description: "Project milestones will show here.",
                }}
                isEmpty={(rows) => rows.length === 0}
              >
                {(rows) => (
                  <>
                    {rows.map((m) => (
                      <div key={m.id} className="flex items-center gap-3 rounded-xl border p-3">
                        <span
                          className={cn(
                            "grid size-8 shrink-0 place-items-center rounded-lg",
                            m.status === "Done" || m.status === "Completed"
                              ? "bg-success/10 text-success"
                              : m.status === "In progress"
                                ? "bg-primary/10 text-primary"
                                : "bg-muted text-muted-foreground",
                          )}
                        >
                          {m.status === "Done" || m.status === "Completed" ? (
                            <CheckCircle2 className="size-4" />
                          ) : (
                            <Timer className="size-4" />
                          )}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold">{m.title}</p>
                          <p className="text-muted-foreground text-xs">{m.dateLabel}</p>
                        </div>
                        <Badge className={cn("border-0 font-semibold", statusTone(m.status))}>
                          {m.status}
                        </Badge>
                      </div>
                    ))}
                  </>
                )}
              </QueryState>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <FileText className="text-primary size-4" /> Deliverables
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { t: "Discovery notes & scope", v: "Approved", tone: "bg-success/10 text-success" },
                { t: "Figma mockups (v2)", v: "Approved", tone: "bg-success/10 text-success" },
                { t: "API endpoints (12/18)", v: "In review", tone: "bg-warning/10 text-warning" },
              ].map((x) => (
                <div key={x.t} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-sm font-semibold">{x.t}</span>
                  <Badge className={cn("border-0 font-semibold", x.tone)}>{x.v}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Users className="text-primary size-4" /> Project team
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { n: "Chidi Eze", r: "Project manager", tone: "bg-primary/10 text-primary" },
                { n: "Ada Okafor", r: "Backend engineer", tone: "bg-learning/10 text-learning" },
                { n: "Tobi Adeyemi", r: "DevOps engineer", tone: "bg-success/10 text-success" },
                { n: "Zainab Yusuf", r: "Product designer", tone: "bg-warning/10 text-warning" },
              ].map((m) => (
                <div key={m.n} className="flex items-center gap-3 rounded-xl border p-3">
                  <span
                    className={cn(
                      "grid size-8 shrink-0 place-items-center rounded-full text-[11px] font-bold",
                      m.tone,
                    )}
                  >
                    {m.n
                      .split(" ")
                      .map((x) => x[0])
                      .join("")}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{m.n}</p>
                    <p className="text-muted-foreground text-xs">{m.r}</p>
                  </div>
                </div>
              ))}
              <Button asChild variant="outline" size="sm" className="w-full font-semibold">
                <Link to="/portal/client">
                  <MessageSquare className="size-3.5" /> Message the team
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <CheckCircle2 className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Demo day</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Live demo of the core build on Aug 22, 15:00 — join to review and give feedback in
                real time.
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="bg-transparent text-ink-foreground border-ink-foreground/30 mt-4 font-semibold hover:bg-ink-foreground/10"
              >
                <Link to="/events">RSVP to demo</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
