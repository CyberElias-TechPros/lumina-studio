import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, CheckCircle2, Video, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
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

const interviews = [
  {
    c: "Ada Okafor",
    role: "Junior Backend Engineer",
    d: "Aug 12 · 10:00",
    mode: "Video",
    status: "Confirmed",
    tone: "bg-primary/10 text-primary",
  },
  {
    c: "Tobi Adeyemi",
    role: "Junior Backend Engineer",
    d: "Aug 14 · 11:30",
    mode: "On campus",
    status: "Confirmed",
    tone: "bg-primary/10 text-primary",
  },
  {
    c: "Zainab Yusuf",
    role: "Junior Backend Engineer",
    d: "Aug 18 · 14:00",
    mode: "Video",
    status: "Pending",
    tone: "bg-warning/10 text-warning",
  },
  {
    c: "Chinedu A.",
    role: "DevOps Intern",
    d: "Jul 22 · 09:00",
    mode: "Video",
    status: "Completed",
    tone: "bg-success/10 text-success",
  },
];

function EmployerInterviews() {
  return (
    <AppShell
      roleKey="instructor"
      title="Interviews"
      subtitle="4 upcoming · feedback within 48h"
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
            value: "4",
            delta: "this week",
            icon: CalendarDays,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Confirmed",
            value: "3",
            delta: "1 awaiting reply",
            icon: CheckCircle2,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Completed",
            value: "6",
            delta: "this month",
            icon: Video,
            tone: "bg-success/10 text-success",
          },
          {
            label: "No-shows",
            value: "0",
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
          {interviews.map((i) => (
            <div key={i.c} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                {i.mode === "Video" ? (
                  <Video className="size-4" />
                ) : (
                  <CalendarDays className="size-4" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{i.c}</p>
                <p className="text-muted-foreground text-xs">
                  {i.role} · {i.d} · {i.mode}
                </p>
              </div>
              <Badge className={cn("border-0 font-semibold", i.tone)}>{i.status}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                {i.status === "Completed" ? "Add feedback" : "Reschedule"}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
