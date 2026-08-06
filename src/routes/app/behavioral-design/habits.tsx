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
import { QueryState } from "@/components/ui/query-state";
import { useBdCheckins, useBdPrograms } from "@/lib/query/behavioral";
import type { BdCheckin, BdProgram } from "@/lib/api/behavioral";
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

const programTones = [
  "bg-success/10 text-success",
  "bg-primary/10 text-primary",
  "bg-warning/10 text-warning",
];

const checkinTones = [
  "bg-success/10 text-success",
  "bg-success/10 text-success",
  "bg-warning/10 text-warning",
  "bg-primary/10 text-primary",
];

function HabitTracker() {
  const programsQuery = useBdPrograms();
  const checkinsQuery = useBdCheckins();

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
            <QueryState<BdProgram[]>
              query={programsQuery}
              error={{ title: "Programs unavailable" }}
              empty={{ title: "No programs", description: "Habit programs will show here." }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(rows) => (
                <>
                  {rows.map((p, i) => (
                    <div key={p.id} className="rounded-xl border p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold">{p.name}</p>
                        <Badge
                          className={cn(
                            "border-0 font-semibold",
                            programTones[i % programTones.length],
                          )}
                        >
                          {p.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mt-1 text-xs">
                        {p.goal} · streak {p.streak}
                      </p>
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
              <Flame className="text-primary size-4" /> Daily check-ins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <QueryState<BdCheckin[]>
              query={checkinsQuery}
              error={{ title: "Check-ins unavailable" }}
              empty={{ title: "No check-ins", description: "Daily check-ins will show here." }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(rows) => (
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
                    {rows.map((c, i) => (
                      <TableRow key={c.id}>
                        <TableCell className="font-semibold">{c.learner}</TableCell>
                        <TableCell>{c.cycle}</TableCell>
                        <TableCell className="text-muted-foreground">{c.streak}</TableCell>
                        <TableCell>
                          <Badge
                            className={cn(
                              "border-0 font-semibold",
                              checkinTones[i % checkinTones.length],
                            )}
                          >
                            {c.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </QueryState>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
