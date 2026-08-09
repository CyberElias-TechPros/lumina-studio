import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Briefcase, CalendarCheck2, CheckCircle2, FileText, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { usePostings, useInterviews } from "@/lib/query/recruitment";
import type { JobPosting } from "@/lib/api/recruitment";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/hr/recruitment")({
  head: () => ({
    meta: [
      { title: "Recruitment — CEA-OS" },
      { name: "description", content: "Postings, applications, interviews and offers." },
    ],
  }),
  component: HrRecruitment,
});

function HrRecruitment() {
  const postingsQuery = usePostings();
  const interviewsQuery = useInterviews();
  const postings = postingsQuery.data?.pages.flatMap((p) => p.items) ?? [];
  const interviews = interviewsQuery.data?.pages.flatMap((p) => p.items) ?? [];
  const openRoles = postings.filter((p) => p.status !== "Closed").length;
  const applications = postings.reduce((s, p) => s + p.applicants, 0);
  const offersOut = postings.filter((p) => p.status === "Offer out").length;

  return (
    <AppShell
      roleKey="hr"
      title="Recruitment"
      subtitle={`${openRoles} open roles · ${applications} applications · ${offersOut} offers out`}
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">SLA met</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/hr">
              <ArrowLeft className="size-4" /> HR hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Open roles",
            value: String(openRoles),
            delta: "3 critical",
            icon: Briefcase,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Applications",
            value: String(applications),
            delta: "20/role avg",
            icon: FileText,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Interviews",
            value: String(interviews.length),
            delta: "this week",
            icon: CalendarCheck2,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Offers out",
            value: String(offersOut),
            delta: "1 accepted",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
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
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Users className="text-primary size-4" /> Active postings
          </CardTitle>
          <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
            Post role
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<JobPosting[]> query={postingsQuery} error={{ title: "Postings unavailable" }}>
            {(rows) => (
              <>
                {rows.map((r) => (
                  <div
                    key={r.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{r.title}</p>
                      <p className="text-muted-foreground text-xs">
                        {r.applicants} applicants · {r.detail}
                      </p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", r.tone)}>{r.status}</Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      Manage
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
