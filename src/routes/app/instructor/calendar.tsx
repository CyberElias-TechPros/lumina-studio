import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarCheck,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  GraduationCap,
  MapPin,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/instructor/calendar")({
  head: () => ({
    meta: [
      { title: "Calendar — CEA-OS" },
      {
        name: "description",
        content: "Live classes, office hours and assessment deadlines.",
      },
    ],
  }),
  component: InstructorCalendar,
});

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const lead = 5;

const events: Record<number, { label: string; tone: string }[]> = {
  3: [{ label: "Lab B3 · 09:00", tone: "bg-primary/10 text-primary" }],
  5: [{ label: "SQL quiz due", tone: "bg-error/10 text-error" }],
  6: [{ label: "Office hours · 16:00", tone: "bg-warning/10 text-warning" }],
  10: [{ label: "Zoom · 12:00", tone: "bg-primary/10 text-primary" }],
  12: [{ label: "Grade lock", tone: "bg-error/10 text-error" }],
  13: [{ label: "Office hours · 16:00", tone: "bg-warning/10 text-warning" }],
  17: [{ label: "Mid-term review · Hall A", tone: "bg-learning/10 text-learning" }],
  20: [{ label: "Office hours · 16:00", tone: "bg-warning/10 text-warning" }],
  24: [{ label: "System design · Zoom", tone: "bg-primary/10 text-primary" }],
  27: [{ label: "Final project brief", tone: "bg-success/10 text-success" }],
  31: [{ label: "Office hours · 16:00", tone: "bg-warning/10 text-warning" }],
};

const week = [
  {
    d: "Mon Aug 3",
    items: [
      { t: "Backend & APIs · live lab", time: "09:00 – 10:30", tone: "bg-primary/10 text-primary" },
    ],
  },
  {
    d: "Tue Aug 4",
    items: [{ t: "Grading block", time: "14:00 – 16:00", tone: "bg-learning/10 text-learning" }],
  },
  {
    d: "Wed Aug 5",
    items: [
      { t: "SQL Fundamentals Quiz closes", time: "23:59", tone: "bg-error/10 text-error" },
      { t: "Cohort retro · Room 6", time: "15:00 – 16:00", tone: "bg-success/10 text-success" },
    ],
  },
  {
    d: "Thu Aug 6",
    items: [{ t: "Office hours", time: "16:00 – 17:30", tone: "bg-warning/10 text-warning" }],
  },
  {
    d: "Fri Aug 7",
    items: [
      { t: "REST API Quiz 2 grading", time: "09:00 – 12:00", tone: "bg-learning/10 text-learning" },
    ],
  },
];

function InstructorCalendar() {
  return (
    <AppShell
      roleKey="instructor"
      title="Calendar"
      subtitle="August 2026 · Yaba campus + remote"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            3 classes this week
          </Badge>
          <Badge className="bg-warning/10 text-warning border-0 font-semibold">
            Office hours Thu
          </Badge>
        </>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[2fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <CalendarDays className="text-primary size-4" /> August 2026
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="size-8">
                <ChevronLeft className="size-4" />
              </Button>
              <Button variant="outline" size="icon" className="size-8">
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1.5">
              {weekdays.map((d) => (
                <p
                  key={d}
                  className="text-muted-foreground pb-2 text-center text-[11px] font-bold tracking-wide uppercase"
                >
                  {d}
                </p>
              ))}
              {Array.from({ length: 42 }, (_, i) => {
                const day = i - lead + 1;
                const valid = day >= 1 && day <= 31;
                return (
                  <div
                    key={i}
                    className={cn(
                      "flex min-h-20 flex-col gap-1 rounded-xl border p-1.5",
                      valid ? "bg-card" : "bg-muted/40",
                      day === 12 && "border-primary/60 bg-primary/5",
                    )}
                  >
                    {valid && (
                      <>
                        <span
                          className={cn(
                            "mx-auto grid size-6 place-items-center rounded-full text-[11px] font-bold",
                            day === 12 ? "bg-gradient-brand text-white" : "text-muted-foreground",
                          )}
                        >
                          {day}
                        </span>
                        <div className="space-y-1">
                          {(events[day] ?? []).slice(0, 2).map((e) => (
                            <span
                              key={e.label}
                              className={cn(
                                "block truncate rounded-md px-1.5 py-0.5 text-[10px] font-bold",
                                e.tone,
                              )}
                            >
                              {e.label}
                            </span>
                          ))}
                          {(events[day] ?? []).length > 2 && (
                            <span className="text-muted-foreground block text-center text-[10px] font-bold">
                              +{events[day].length - 2} more
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <CalendarCheck className="text-primary size-4" /> This week
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {week.map((w) => (
                <div key={w.d}>
                  <p className="text-muted-foreground text-[11px] font-bold tracking-wide uppercase">
                    {w.d}
                  </p>
                  <div className="mt-1.5 space-y-1.5">
                    {w.items.map((i) => (
                      <div
                        key={i.t}
                        className="flex items-center justify-between gap-2 rounded-lg border p-2"
                      >
                        <span className="text-xs font-semibold">{i.t}</span>
                        <Badge className={cn("border-0 font-semibold", i.tone)}>{i.time}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <MapPin className="text-primary size-4" /> Legend
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {[
                { t: "Live class", tone: "bg-primary/10 text-primary", icon: GraduationCap },
                { t: "Office hours", tone: "bg-warning/10 text-warning", icon: Clock3 },
                {
                  t: "Assessment or deadline",
                  tone: "bg-error/10 text-error",
                  icon: CalendarCheck,
                },
                { t: "Coaching & reviews", tone: "bg-learning/10 text-learning", icon: Users },
              ].map((l) => (
                <div key={l.t} className="flex items-center gap-2.5">
                  <span className={cn("grid size-7 place-items-center rounded-lg", l.tone)}>
                    <l.icon className="size-3.5" />
                  </span>
                  <span className="text-xs font-semibold">{l.t}</span>
                </div>
              ))}
              <p className="text-muted-foreground border-t pt-3 text-xs">
                Office hours are drop-in, first come first served. Book a slot via the learner app
                to skip the queue.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
