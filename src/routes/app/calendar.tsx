import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  HeartHandshake,
  Megaphone,
  ScrollText,
  Trophy,
  Video,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { calendarEvents } from "@/data/learning";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/calendar")({
  head: () => ({
    meta: [
      { title: "Calendar — CEA-OS" },
      { name: "description", content: "Classes, deadlines, mentor sessions and campus events." },
    ],
  }),
  component: CalendarPage,
});

const kindTone: Record<string, string> = {
  class: "bg-primary/10 text-primary",
  deadline: "bg-warning/10 text-warning",
  mentor: "bg-community/10 text-community",
  event: "bg-learning/10 text-learning",
  exam: "bg-error/10 text-error",
};

const kindIcon = {
  class: GraduationCap,
  deadline: ScrollText,
  mentor: HeartHandshake,
  event: Megaphone,
  exam: Trophy,
};

const legend: { kind: string; label: string }[] = [
  { kind: "class", label: "Live class" },
  { kind: "deadline", label: "Deadline" },
  { kind: "mentor", label: "Mentor" },
  { kind: "event", label: "Event" },
  { kind: "exam", label: "Exam" },
];

function CalendarPage() {
  return (
    <AppShell
      roleKey="student"
      title="Calendar"
      subtitle="August 2026 · Lagos · WAT"
      actions={
        <>
          <Badge className="bg-warning/10 text-warning border-0 font-semibold">3 deadlines</Badge>
          <Badge variant="secondary" className="font-semibold">
            Synced
          </Badge>
          <Button variant="outline" size="sm" className="font-semibold">
            <CalendarDays className="size-4" /> Google
          </Button>
          <Button variant="outline" size="sm" className="font-semibold">
            <CalendarDays className="size-4" /> Outlook
          </Button>
        </>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    aria-label="Previous month"
                  >
                    <ChevronLeft className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="size-8" aria-label="Next month">
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
                <p className="font-display text-sm font-extrabold">August 2026</p>
                <Button variant="outline" size="sm" className="font-semibold">
                  Today
                </Button>
              </div>
              <div className="mt-4 grid grid-cols-7 gap-1 text-center">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <p
                    key={d}
                    className="text-muted-foreground py-1 text-[11px] font-bold tracking-wide uppercase"
                  >
                    {d}
                  </p>
                ))}
                {[
                  27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                  19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                ].map((day, i) => {
                  const evt = calendarEvents.find((e) => Number(e.date) === day && i < 31);
                  return (
                    <div
                      key={`${day}-${i}`}
                      className={cn(
                        "relative aspect-square rounded-lg text-xs font-semibold",
                        day === 31 && i < 5
                          ? "bg-primary/10 text-primary"
                          : i < 5
                            ? "bg-muted/60 text-muted-foreground"
                            : "hover:bg-muted/60",
                      )}
                    >
                      <span className="absolute inset-0 grid place-items-center">{day}</span>
                      {evt && (
                        <span className="bg-gradient-brand absolute bottom-1 left-1/2 size-1.5 -translate-x-1/2 rounded-full" />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex flex-wrap gap-3 border-t pt-3">
                {legend.map((l) => (
                  <span
                    key={l.kind}
                    className="flex items-center gap-1.5 text-[11px] font-semibold"
                  >
                    <span className={cn("size-2.5 rounded-sm", kindTone[l.kind])} /> {l.label}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardContent className="divide-y">
              {calendarEvents.slice(0, 6).map((e) => {
                const Icon = kindIcon[e.kind];
                return (
                  <div
                    key={e.id}
                    className="flex flex-wrap items-center gap-4 py-3.5 first:pt-2 last:pb-0"
                  >
                    <div className="bg-muted grid h-11 w-10 shrink-0 place-items-center rounded-lg text-center">
                      <p className="font-display text-sm font-extrabold">{e.date}</p>
                      <p className="text-muted-foreground text-[10px] font-bold uppercase">
                        {e.day}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-lg",
                        kindTone[e.kind],
                      )}
                    >
                      <Icon className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold">{e.title}</p>
                      <p className="text-muted-foreground text-xs">
                        {e.time} · {e.location}
                      </p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", kindTone[e.kind])}>
                      {e.kind}
                    </Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardContent className="space-y-4 p-5">
              <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                Up next
              </p>
              {[
                {
                  icon: Video,
                  t: "Backend live class — auth patterns",
                  m: "Today 10:00 · Hall A",
                  tone: "bg-primary/10 text-primary",
                },
                {
                  icon: ScrollText,
                  t: "REST API assignment due",
                  m: "Today 23:59 · submit on portal",
                  tone: "bg-warning/10 text-warning",
                },
                {
                  icon: HeartHandshake,
                  t: "Mentor circle — Adaeze",
                  m: "Sat 14:00 · Room 2",
                  tone: "bg-community/10 text-community",
                },
              ].map((x) => (
                <div key={x.t} className="flex items-start gap-3">
                  <span
                    className={cn("grid size-8 shrink-0 place-items-center rounded-lg", x.tone)}
                  >
                    <x.icon className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{x.t}</p>
                    <p className="text-muted-foreground text-xs">{x.m}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <CalendarDays className="text-warning size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Free this week</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                You have 2 open study blocks before Friday — enough to close the weekly learning
                goal.
              </p>
              <Button asChild size="sm" className="bg-gradient-brand shadow-glow mt-4 border-0">
                <Link to="/app/learn">
                  Plan study time <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
