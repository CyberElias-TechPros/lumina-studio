"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CheckCircle2,
  FolderGit2,
  Goal,
  Target,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import {
  useMenteeDetail,
  useMenteePortfolioItems,
  useMenteePortfolio,
} from "@/lib/query/mentorDashboard";
import type { MntGoal, MntMenteeDetail, PortfolioItem } from "@/lib/api/mentorDashboard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/mentor/mentees/$menteeId/")({
  head: () => ({
    meta: [
      { title: "Mentee Overview — CEA-OS" },
      { name: "description", content: "Mentee profile, goals, portfolio and career." },
    ],
  }),
  component: MenteeOverview,
});

const statusTone: Record<string, string> = {
  "on track": "bg-success/10 text-success",
  "needs focus": "bg-warning/10 text-warning",
  new: "bg-primary/10 text-primary",
  completed: "bg-learning/10 text-learning",
};

const portfolioTone: Record<string, string> = {
  Featured: "bg-warning/10 text-warning",
  Live: "bg-success/10 text-success",
  "In review": "bg-primary/10 text-primary",
};

function MenteeOverview() {
  const { menteeId } = Route.useParams();
  const detailQuery = useMenteeDetail(menteeId);
  const detail = detailQuery.data;
  const portfolioQuery = useMenteePortfolio(menteeId);
  const portfolio = useMenteePortfolioItems(menteeId);

  const onTrack = detail ? detail.goals.filter((g) => g.status === "on track").length : 0;

  return (
    <AppShell
      roleKey="mentor"
      title={detail ? detail.name : "Mentee overview"}
      subtitle={
        detail
          ? `${detail.track} · ${detail.cohort} · mentee since ${detail.sinceDate}`
          : "Loading mentee…"
      }
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {detail ? `${onTrack} of ${detail.goals.length} goals on track` : "—"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/mentor">
              <ArrowLeft className="size-4" /> All mentees
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "GPA",
            value: "4.2",
            delta: "top 5% of cohort",
            icon: Target,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Sessions",
            value: "8",
            delta: "2 this term",
            icon: Users,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Goals",
            value: detail ? String(detail.goals.length) : "—",
            delta: detail ? `${onTrack} on track` : "loading…",
            icon: Goal,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Applications",
            value: "4",
            delta: "1 interview",
            icon: BriefcaseBusiness,
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
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Goal className="text-primary size-4" /> Goals & milestones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <QueryState<MntMenteeDetail>
              query={detailQuery}
              error={{ title: "Mentee unavailable" }}
              empty={{
                title: "Mentee not found",
                description: "This mentee may have been removed.",
              }}
              isEmpty={(row) => row.goals.length === 0}
            >
              {(row) => (
                <>
                  {row.goals.map((g) => (
                    <GoalRow key={g.id} g={g} />
                  ))}
                </>
              )}
            </QueryState>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <FolderGit2 className="text-primary size-4" /> Portfolio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <QueryState<PortfolioItem[]>
                query={portfolioQuery}
                error={{ title: "Portfolio unavailable" }}
                empty={{
                  title: "No projects yet",
                  description: "Projects will show once the mentee shares their portfolio.",
                }}
                isEmpty={(rows) => rows.length === 0}
              >
                {(rows) => (
                  <>
                    {rows.map((x) => (
                      <div
                        key={x.id}
                        className="flex items-center justify-between rounded-xl border p-3"
                      >
                        <span className="text-sm font-semibold">{x.projectName}</span>
                        <Badge
                          className={cn(
                            "border-0 font-semibold",
                            portfolioTone[x.status] ?? "bg-primary/10 text-primary",
                          )}
                        >
                          {x.status}
                        </Badge>
                      </div>
                    ))}
                  </>
                )}
              </QueryState>
              <Button asChild variant="outline" size="sm" className="w-full font-semibold">
                <Link to="/app/mentor/mentees/$menteeId/portfolio" params={{ menteeId }}>
                  Review portfolio
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <CheckCircle2 className="text-primary size-4" /> Recent notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="rounded-xl border p-3 text-xs leading-relaxed">
                <strong className="text-foreground">Aug 10:</strong> Reviewed DB schema for
                NaijaEats — solid 3NF work. Encouraged EXPLAIN practice for the exam.
              </p>
              <p className="rounded-xl border p-3 text-xs leading-relaxed">
                <strong className="text-foreground">Jul 28:</strong> Mock interview #3 — strong on
                systems, needs STAR formatting for behavioural questions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

function GoalRow({ g }: { g: MntGoal }) {
  return (
    <div className="rounded-xl border p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-bold">{g.title}</p>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-xs font-semibold">{g.dueDate}</span>
          <Badge
            className={cn(
              "border-0 font-semibold capitalize",
              statusTone[g.status] ?? "bg-muted/20 text-muted-foreground",
            )}
          >
            {g.status}
          </Badge>
        </div>
      </div>
      <Progress value={g.progressPct} className="mt-2.5 h-1.5" />
      <p className="text-muted-foreground mt-2 text-xs">{g.progressPct}% complete</p>
    </div>
  );
}
