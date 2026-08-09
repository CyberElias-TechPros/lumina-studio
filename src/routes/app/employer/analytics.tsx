import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Building2, Clock, Eye, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { useInterviewItems, usePostingItems } from "@/lib/query/recruitment";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/employer/analytics")({
  head: () => ({
    meta: [
      { title: "Hiring Analytics — CEA-OS" },
      { name: "description", content: "Time-to-hire, retention and pipeline analytics." },
    ],
  }),
  component: EmployerAnalytics,
});

const cohorts = [
  { y: "2025", hired: 14, kept: 12, pct: 86 },
  { y: "2024", hired: 9, kept: 8, pct: 89 },
  { y: "2023", hired: 6, kept: 6, pct: 100 },
];

function EmployerAnalytics() {
  const postings = usePostingItems();
  const interviews = useInterviewItems();

  const applications = postings.reduce((s, p) => s + p.applicants, 0);
  const views = postings.reduce((s, p) => s + p.views, 0);
  const completed = interviews.filter((i) => i.status === "Completed").length;
  const scheduled = interviews.filter((i) => i.status === "Scheduled").length;
  const offerRate = interviews.length ? Math.round((completed / interviews.length) * 100) : 0;
  const conversion = views ? Math.round((applications / views) * 1000) / 10 : 0;

  return (
    <AppShell
      roleKey="employer"
      title="Hiring analytics"
      subtitle={`${postings.length} roles · ${applications} applications · ${views} views`}
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {conversion}% conversion
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/employer/hub">
              <ArrowLeft className="size-4" /> Employer hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Applications",
            value: String(applications),
            delta: `across ${postings.length} roles`,
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Job views",
            value: String(views),
            delta: "listing impressions",
            icon: Eye,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Interview conversion",
            value: `${offerRate}%`,
            delta: `${completed} completed rounds`,
            icon: TrendingUp,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Scheduled",
            value: String(scheduled),
            delta: "interviews upcoming",
            icon: Clock,
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

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <TrendingUp className="text-primary size-4" /> Retention by cohort
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cohorts.map((c) => (
              <div key={c.y}>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>{c.y} cohort</span>
                  <span className="text-muted-foreground">
                    {c.kept} of {c.hired} still with us
                  </span>
                </div>
                <div className="bg-muted mt-1.5 h-2 overflow-hidden rounded-full">
                  <div className="bg-success h-full rounded-full" style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
            <p className="text-muted-foreground pt-1 text-xs">
              OSKM-verified hires keep longer — their skills match the job from day one.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Building2 className="text-primary size-4" /> Per-role performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {postings.map((p) => {
              const cv = p.views ? Math.round((p.applicants / p.views) * 1000) / 10 : 0;
              return (
                <div key={p.id}>
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>{p.title}</span>
                    <span className="text-muted-foreground">
                      {p.applicants} apps · {cv}%
                    </span>
                  </div>
                  <div className="bg-muted mt-1.5 h-2 overflow-hidden rounded-full">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        p.status === "Open" ? "bg-gradient-brand" : "bg-muted-foreground/40",
                      )}
                      style={{ width: `${Math.min(100, cv * 4)}%` }}
                    />
                  </div>
                </div>
              );
            })}
            {postings.length === 0 && (
              <p className="text-muted-foreground py-4 text-center text-sm">No postings yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
