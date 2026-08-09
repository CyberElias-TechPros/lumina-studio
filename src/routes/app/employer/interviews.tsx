import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, CheckCircle2, Video, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useInterviews } from "@/lib/query/recruitment";
import type { Interview } from "@/lib/api/recruitment";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/employer/interviews")({
  head: () => ({
    meta: [
      { title: "Interview Scheduler — CEA-OS" },
      { name: "description", content: "Schedule and run candidate interviews." },
    ],
  }),
  component: EmployerInterviews,
});

function interviewTone(status: string): string {
  if (status === "Confirmed") return "bg-primary/10 text-primary";
  if (status === "Completed") return "bg-success/10 text-success";
  return "bg-warning/10 text-warning";
}

function EmployerInterviews() {
  const query = useInterviews();
  const interviews = query.data?.pages.flatMap((p) => p.items) ?? [];
  const upcoming = interviews.filter((i) => i.status !== "Completed").length;
  const confirmed = interviews.filter((i) => i.status === "Confirmed").length;
  const completed = interviews.filter((i) => i.status === "Completed").length;
  const noShows = interviews.filter((i) => i.status === "No-show").length;

  return (
    <AppShell
      roleKey="employer"
      title="Interviews"
      subtitle={`${upcoming} upcoming · feedback within 48h`}
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            On-time rate 100%
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
            label: "Upcoming",
            value: String(upcoming),
            delta: "this week",
            icon: CalendarDays,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Confirmed",
            value: String(confirmed),
            delta: "1 awaiting reply",
            icon: CheckCircle2,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Completed",
            value: String(completed),
            delta: "this month",
            icon: Video,
            tone: "bg-success/10 text-success",
          },
          {
            label: "No-shows",
            value: String(noShows),
            delta: "great cohort",
            icon: XCircle,
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
            <Video className="text-primary size-4" /> Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<Interview[]> query={query} error={{ title: "Interviews unavailable" }}>
            {(rows) => (
              <>
                {rows.map((i) => (
                  <div
                    key={i.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                      {i.mode === "Video" ? (
                        <Video className="size-4" />
                      ) : (
                        <CalendarDays className="size-4" />
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{i.candidate}</p>
                      <p className="text-muted-foreground text-xs">
                        {i.role} · {i.date} · {i.mode}
                      </p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", interviewTone(i.status))}>
                      {i.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      {i.status === "Completed" ? "Add feedback" : "Reschedule"}
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
