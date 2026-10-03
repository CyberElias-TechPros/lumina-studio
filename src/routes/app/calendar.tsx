"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { useState } from "react";
import { toast } from "sonner";
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
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useCalendarEvents } from "@/lib/query/calendar";
import type { CalendarEvent } from "@/data/learning";
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

function calendarCells(month: Date): { day: number; inMonth: boolean; key: string }[] {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstWeekday = (new Date(year, monthIndex, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const previousDays = new Date(year, monthIndex, 0).getDate();
  const cells: { day: number; inMonth: boolean; key: string }[] = [];

  for (let i = firstWeekday - 1; i >= 0; i -= 1) {
    const day = previousDays - i;
    cells.push({ day, inMonth: false, key: `previous-${day}` });
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ day, inMonth: true, key: `current-${day}` });
  }
  let nextDay = 1;
  while (cells.length < 42) {
    cells.push({ day: nextDay, inMonth: false, key: `next-${nextDay}` });
    nextDay += 1;
  }
  return cells;
}

function calendarText(value: string): string {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll(";", "\\;")
    .replaceAll(",", "\\,")
    .replaceAll("\n", "\\n");
}

function downloadCalendar(events: CalendarEvent[], provider: string): void {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Cyber Elias Academy//CEA-OS//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];
  for (const event of events) {
    const start = new Date(2026, 7, Number(event.date));
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    const icsDate = (date: Date) =>
      `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
    lines.push(
      "BEGIN:VEVENT",
      `UID:${event.id}@cea.ng`,
      `DTSTAMP:${icsDate(new Date())}T000000Z`,
      `DTSTART;VALUE=DATE:${icsDate(start)}`,
      `DTEND;VALUE=DATE:${icsDate(end)}`,
      `SUMMARY:${calendarText(event.title)}`,
      `LOCATION:${calendarText(event.location)}`,
      `DESCRIPTION:${calendarText(`${event.kind} · ${event.time}`)}`,
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  const blob = new Blob([`${lines.join("\\r\\n")}\\r\\n`], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "cea-calendar.ics";
  anchor.click();
  URL.revokeObjectURL(url);
  toast.success(`${provider} calendar file downloaded`, {
    description: "Import the .ics file into your calendar app to add your CEA events.",
  });
}

function CalendarPage() {
  const eventsQuery = useCalendarEvents();
  const [month, setMonth] = useState(() => new Date(2026, 7, 1));
  const eventItems = eventsQuery.data?.pages.flatMap((page) => page.items) ?? [];
  const monthLabel = month.toLocaleDateString("en-NG", { month: "long", year: "numeric" });
  const cells = calendarCells(month);

  return (
    <AppShell
      roleKey="student"
      title="Calendar"
      subtitle={`${monthLabel} · Lagos · WAT`}
      actions={
        <>
          <Badge className="bg-warning/10 text-warning border-0 font-semibold">3 deadlines</Badge>
          <Badge variant="secondary" className="font-semibold">
            Synced
          </Badge>
          <Button
            variant="outline"
            size="sm"
            className="font-semibold"
            onClick={() => downloadCalendar(eventItems, "Google")}
          >
            <CalendarDays className="size-4" /> Google
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="font-semibold"
            onClick={() => downloadCalendar(eventItems, "Outlook")}
          >
            <CalendarDays className="size-4" /> Outlook
          </Button>
        </>
      }
    >
      <QueryState<CalendarEvent[]> query={eventsQuery} error={{ title: "Calendar unavailable" }}>
        {(events) => (
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
                        onClick={() =>
                          setMonth(
                            (current) => new Date(current.getFullYear(), current.getMonth() - 1, 1),
                          )
                        }
                      >
                        <ChevronLeft className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        aria-label="Next month"
                        onClick={() =>
                          setMonth(
                            (current) => new Date(current.getFullYear(), current.getMonth() + 1, 1),
                          )
                        }
                      >
                        <ChevronRight className="size-4" />
                      </Button>
                    </div>
                    <p className="font-display text-sm font-extrabold">{monthLabel}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="font-semibold"
                      onClick={() => {
                        const now = new Date();
                        setMonth(new Date(now.getFullYear(), now.getMonth(), 1));
                      }}
                    >
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
                    {cells.map(({ day, inMonth, key }) => {
                      const evt =
                        inMonth && month.getFullYear() === 2026 && month.getMonth() === 7
                          ? events.find((event) => Number(event.date) === day)
                          : undefined;
                      return (
                        <div
                          key={key}
                          className={cn(
                            "relative aspect-square rounded-lg text-xs font-semibold",
                            !inMonth && "text-muted-foreground/40",
                            inMonth && "hover:bg-muted/60",
                            inMonth &&
                              day === new Date().getDate() &&
                              month.getMonth() === new Date().getMonth()
                              ? "bg-primary/10 text-primary"
                              : "",
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
                  {events.slice(0, 6).map((e) => {
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
        )}
      </QueryState>
    </AppShell>
  );
}
