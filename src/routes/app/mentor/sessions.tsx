import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  FileText,
  MessageSquare,
  Video,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/mentor/sessions")({
  head: () => ({
    meta: [
      { title: "Session Hub — CEA-OS" },
      { name: "description", content: "Schedule sessions and keep notes." },
    ],
  }),
  component: MentorSessions,
});

const sessions = [
  {
    t: "Ada Okafor — goal review",
    d: "Fri, Aug 21 · 16:00",
    mode: "Video",
    status: "Upcoming",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Tobi Adeyemi — exam prep",
    d: "Sat, Aug 22 · 11:00",
    mode: "On campus",
    status: "Upcoming",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Zainab Yusuf — portfolio feedback",
    d: "Tue, Aug 25 · 14:30",
    mode: "Video",
    status: "Upcoming",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Ada Okafor — mock interview",
    d: "Thu, Jul 28 · 15:00",
    mode: "Video",
    status: "Completed",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Tobi Adeyemi — career check-in",
    d: "Mon, Jul 14 · 12:00",
    mode: "On campus",
    status: "Completed",
    tone: "bg-success/10 text-success",
  },
];

function MentorSessions() {
  return (
    <AppShell
      roleKey="instructor"
      title="Session hub"
      subtitle="Schedule, run and review mentor sessions"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            12 sessions this term
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/mentor">
              <ArrowLeft className="size-4" /> Dashboard
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <CalendarDays className="text-primary size-4" /> Sessions
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            {sessions.map((s) => (
              <div
                key={s.t}
                className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
              >
                <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                  {s.mode === "Video" ? <Video className="size-4" /> : <Clock className="size-4" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{s.t}</p>
                  <p className="text-muted-foreground text-xs">
                    {s.d} · {s.mode}
                  </p>
                </div>
                <Badge className={cn("border-0 font-semibold", s.tone)}>{s.status}</Badge>
                <Button asChild variant="outline" size="sm" className="shrink-0 font-semibold">
                  <Link
                    to="/app/mentor/sessions/$sessionId"
                    params={{ sessionId: s.t.toLowerCase().replace(/[^a-z]+/g, "-") }}
                  >
                    {s.status === "Upcoming" ? "Open" : "Notes"}
                  </Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <FileText className="text-primary size-4" /> This week's focus
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { t: "Ada", v: "Goal review + demo prep", tone: "bg-learning/10 text-learning" },
                { t: "Tobi", v: "Exam pattern walkthrough", tone: "bg-primary/10 text-primary" },
                { t: "Zainab", v: "Portfolio critique", tone: "bg-warning/10 text-warning" },
              ].map((x) => (
                <div key={x.t} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-sm font-semibold">{x.t}</span>
                  <Badge className={cn("border-0 font-semibold", x.tone)}>{x.v}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <CheckCircle2 className="text-primary size-4" /> Session templates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                "Goal review · 45 min",
                "Mock interview · 60 min",
                "Portfolio critique · 30 min",
              ].map((t) => (
                <Button
                  key={t}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start font-semibold"
                >
                  {t}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <MessageSquare className="text-warning size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Notes stay private</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Session notes sync to the mentee's file and inform the term-end progress report —
                visible only to you and the academic team.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
