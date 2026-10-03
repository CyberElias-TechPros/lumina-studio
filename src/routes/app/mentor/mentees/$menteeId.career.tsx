"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  Search,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useMenteeCareer, useMenteeCareerItems } from "@/lib/query/mentorDashboard";
import type { CareerApplication } from "@/lib/api/mentorDashboard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/mentor/mentees/$menteeId/career")({
  head: () => ({
    meta: [
      { title: "Career Tracking — CEA-OS" },
      { name: "description", content: "Applications, interviews and job search progress." },
    ],
  }),
  component: MentorCareerTracking,
});

const stageTone: Record<string, string> = {
  Interview: "bg-primary/10 text-primary",
  "Take-home": "bg-warning/10 text-warning",
  Applied: "bg-learning/10 text-learning",
  Rejected: "bg-destructive/10 text-destructive",
  Offer: "bg-success/10 text-success",
};

function MentorCareerTracking() {
  const { menteeId } = Route.useParams();
  const applicationsQuery = useMenteeCareer(menteeId);
  const applications = useMenteeCareerItems(menteeId);

  const interviews = applications.filter((a) => a.stage === "Interview").length;

  return (
    <AppShell
      roleKey="mentor"
      title="Career tracking"
      subtitle={
        applications.length > 0
          ? `job search · ${applications.length} applications`
          : "Loading applications…"
      }
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {interviews > 0 ? "Interview stage reached" : "—"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/mentor/mentees/$menteeId" params={{ menteeId }}>
              <ArrowLeft className="size-4" /> Mentee overview
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Applications",
            value: applications.length > 0 ? String(applications.length) : "—",
            delta: "2 this month",
            icon: BriefcaseBusiness,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Interviews",
            value: applications.length > 0 ? String(interviews) : "—",
            delta: "reached so far",
            icon: Search,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Prep sessions",
            value: "3",
            delta: "mock interviews",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "CV strength",
            value: "Strong",
            delta: "per rubric v3",
            icon: TrendingUp,
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
            <FileText className="text-primary size-4" /> Application pipeline
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<CareerApplication[]>
            query={applicationsQuery}
            error={{ title: "Applications unavailable" }}
            empty={{
              title: "No applications yet",
              description: "Applications from the mentee's job search will show here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((a) => (
                  <div
                    key={a.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{a.role}</p>
                      <p className="text-muted-foreground text-xs">
                        {a.company} · applied {a.appliedDate}
                      </p>
                    </div>
                    <Badge
                      className={cn(
                        "border-0 font-semibold",
                        stageTone[a.stage] ?? "bg-muted/20 text-muted-foreground",
                      )}
                    >
                      {a.stage}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      Prep notes
                    </Button>
                  </div>
                ))}
              </>
            )}
          </QueryState>
          <p className="text-muted-foreground pt-3 text-xs">
            Next: interview prep — STAR drills on backend projects scheduled this week.
          </p>
        </CardContent>
      </Card>
    </AppShell>
  );
}
