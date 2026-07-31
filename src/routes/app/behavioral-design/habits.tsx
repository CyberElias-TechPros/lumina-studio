import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarCheck, Flame, Repeat, Target, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/behavioral-design/habits")({
  head: () => ({
    meta: [
      { title: "Habit Tracker — CEA-OS" },
      { name: "description", content: "Habit programs, streak data and daily check-ins." },
    ],
  }),
  component: HabitTracker,
});

const programs = [
  {
    t: "Daily 15-minute lesson",
    goal: "30-day streak",
    active: "2,180",
    streak: "12d avg",
    status: "Live",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Weekly portfolio commit",
    goal: "8-week project cadence",
    active: "1,040",
    streak: "5w avg",
    status: "Live",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Peer accountability pair",
    goal: "Bi-weekly check-ins",
    active: "640",
    streak: "3w avg",
    status: "Pilot",
    tone: "bg-warning/10 text-warning",
  },
];

const checkins = [
  {
    l: "Ada Obi",
    program: "Daily lesson",
    streak: "21d",
    status: "Checked in",
    tone: "bg-success/10 text-success",
  },
  {
    l: "Tunde Bakare",
    program: "Portfolio commit",
    streak: "6w",
    status: "Checked in",
    tone: "bg-success/10 text-success",
  },
  {
    l: "Chiamaka Eze",
    program: "Daily lesson",
    streak: "9d",
    status: "2 days left",
    tone: "bg-warning/10 text-warning",
  },
  {
    l: "Ngozi Adeyemi",
    program: "Peer pair",
    streak: "1w",
    status: "Due today",
    tone: "bg-primary/10 text-primary",
  },
];

function HabitTracker() {
  return (
    <AppShell
      roleKey="behavioral-design"
      title="Habit tracker"
      subtitle="6 programs · 3,860 active learners · avg streak 12 days"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">+4% streaks</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/behavioral-design">
              <ArrowLeft className="size-4" /> Behavior hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Programs",
            value: "6",
            delta: "3 live · 1 pilot",
            icon: Repeat,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Active learners",
            value: "3,860",
            delta: "52% of enrolled",
            icon: Users,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Avg. streak",
            value: "12d",
            delta: "+2d vs last qtr",
            icon: Flame,
            tone: "bg-success/10 text-success",
          },
          {
            label: "30-day completion",
            value: "34%",
            delta: "target 40%",
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_1.5fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <CalendarCheck className="text-primary size-4" /> Programs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {programs.map((p) => (
              <div key={p.t} className="rounded-xl border p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold">{p.t}</p>
                  <Badge className={cn("border-0 font-semibold", p.tone)}>{p.status}</Badge>
                </div>
                <p className="text-muted-foreground mt-1 text-xs">
                  {p.goal} · {p.active} active · streak {p.streak}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Flame className="text-primary size-4" /> Daily check-ins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Learner</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Streak</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {checkins.map((c) => (
                  <TableRow key={c.l}>
                    <TableCell className="font-semibold">{c.l}</TableCell>
                    <TableCell>{c.program}</TableCell>
                    <TableCell className="text-muted-foreground">{c.streak}</TableCell>
                    <TableCell>
                      <Badge className={cn("border-0 font-semibold", c.tone)}>{c.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
