import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  HeartHandshake,
  MessageSquare,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/mentor")({
  head: () => ({
    meta: [
      { title: "Mentor Portal — CEA-OS" },
      {
        name: "description",
        content:
          "Your mentorship workspace: mentees, session scheduling, check-ins and development plans.",
      },
    ],
  }),
  component: MentorPortal,
});

const mentees = [
  {
    name: "Adaeze Okafor",
    track: "Full-Stack · C15",
    pct: 78,
    status: "On track",
    tone: "bg-success/10 text-success",
    note: "Strong capstone direction",
  },
  {
    name: "Chukwuemeka Obi",
    track: "Cybersecurity · C15",
    pct: 54,
    status: "At risk",
    tone: "bg-warning/10 text-warning",
    note: "2 missed sessions — reach out",
  },
  {
    name: "Halima Sani",
    track: "Data & AI · C15",
    pct: 71,
    status: "On track",
    tone: "bg-success/10 text-success",
    note: "Kicking goals on labs",
  },
];

function MentorPortal() {
  return (
    <AppShell
      roleKey="instructor"
      title="Mentor portal"
      subtitle="3 mentees · 2 sessions this week · 100% check-in rate"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Mentor of the month · July
          </Badge>
          <Button asChild variant="outline" size="sm" className="ml-auto">
            <Link to="/app/mentor">Mentor workspace</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="font-semibold">
            <Link to="/portal/student">Mentee view</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Mentees",
            value: "3",
            delta: "+1 this term",
            icon: Users,
            tone: "bg-community/10 text-community",
          },
          {
            label: "Sessions this week",
            value: "2",
            delta: "1 to book",
            icon: CalendarDays,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Check-in rate",
            value: "100%",
            delta: "12 straight",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "At-risk mentees",
            value: "1",
            delta: "Action: today",
            icon: Target,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <HeartHandshake className="text-primary size-4" /> My mentees
            </CardTitle>
            <Badge variant="secondary" className="font-semibold">
              Term 2
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {mentees.map((m) => (
              <div key={m.name} className="rounded-xl border p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="bg-gradient-community text-white font-display grid size-10 place-items-center rounded-full text-xs font-bold">
                      {m.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <div>
                      <p className="text-sm font-bold">{m.name}</p>
                      <p className="text-muted-foreground text-xs">{m.track}</p>
                    </div>
                  </div>
                  <Badge className={cn("border-0 font-semibold", m.tone)}>{m.status}</Badge>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <Progress value={m.pct} className="h-1.5 flex-1" />
                  <span className="text-muted-foreground text-xs font-bold">{m.pct}%</span>
                </div>
                <p className="text-muted-foreground mt-2.5 text-xs">{m.note}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <CalendarDays className="text-primary size-4" /> Upcoming sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  d: "Thu 14:00",
                  t: "Adaeze — capstone review",
                  tag: "In person",
                  tone: "bg-primary/10 text-primary",
                },
                {
                  d: "Sat 11:00",
                  t: "Chukwuemeka — catch-up",
                  tag: "Video",
                  tone: "bg-warning/10 text-warning",
                },
              ].map((e) => (
                <div key={e.t} className="flex items-center gap-3 rounded-xl border p-3">
                  <span className="font-display text-muted-foreground w-20 text-xs font-bold">
                    {e.d}
                  </span>
                  <p className="min-w-0 flex-1 truncate text-sm font-semibold">{e.t}</p>
                  <Badge className={cn("border-0 font-semibold", e.tone)}>{e.tag}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <MessageSquare className="text-primary size-4" /> Notes & check-ins
              </CardTitle>
              <TrendingUp className="text-success size-4" />
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-xl border p-3.5">
                <p className="text-xs font-bold">Check-in · Jul 28</p>
                <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                  Adaeze's API project is the strongest in cohort 15. Pushed her toward the
                  design-system audit as the differentiator.
                </p>
              </div>
              <div className="rounded-xl border p-3.5">
                <p className="text-xs font-bold">Flag · Jul 26</p>
                <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                  Chukwuemeka missed 2 sessions. Escalated to Student Success; plan a catch-up on
                  Saturday.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <p className="text-ink-foreground/60 text-xs font-bold tracking-[0.16em] uppercase">
                Mentor programme
              </p>
              <p className="font-display mt-2 text-lg font-extrabold">2026 cohort mentoring</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                You've logged 34 mentoring hours this term. On track for the alumni mentor
                recognition.
              </p>
              <Button asChild size="sm" className="bg-gradient-brand shadow-glow mt-4 border-0">
                <Link to="/alumni">
                  Alumni programme <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
