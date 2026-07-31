import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  HandHeart,
  HeartHandshake,
  Megaphone,
  Users,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/volunteer")({
  head: () => ({
    meta: [
      { title: "Volunteer — CEA-OS" },
      {
        name: "description",
        content: "Volunteer portal: shifts, events, hours logged and community impact.",
      },
    ],
  }),
  component: VolunteerPortal,
});

const shifts = [
  {
    t: "Open day — registration desk",
    when: "Sat · 09:00–13:00",
    status: "Confirmed",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Study hall supervision",
    when: "Mon · 17:00–20:00",
    status: "Requested",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Campus cleanup — garden",
    when: "Sat 16 · 08:00–11:00",
    status: "Open",
    tone: "bg-warning/10 text-warning",
  },
];

const upcoming = [
  { t: "Portfolio review clinic", d: "Sat · 10:00", role: "Reviewer" },
  { t: "Intro to Figma (beginner)", d: "Wed · 15:00", role: "TA" },
];

function VolunteerPortal() {
  return (
    <AppShell
      roleKey="student"
      title="Volunteer hub"
      subtitle="Community contributions · Amara Nwosu"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            128 hrs logged
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            Bronze contributor
          </Badge>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Hours this month",
            value: "22",
            delta: "goal 30",
            icon: Zap,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Upcoming shifts",
            value: "3",
            delta: "1 open slot",
            icon: CalendarDays,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Events helped",
            value: "6",
            delta: "since joining",
            icon: HeartHandshake,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Recognition",
            value: "2",
            delta: "shoutouts",
            icon: Megaphone,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Users className="text-primary size-4" /> My shifts
            </CardTitle>
            <Button variant="outline" size="sm" className="font-semibold">
              Browse all
            </Button>
          </CardHeader>
          <CardContent className="divide-y">
            {shifts.map((s) => (
              <div
                key={s.t}
                className="flex flex-wrap items-center gap-3 py-3.5 first:pt-0 last:pb-0"
              >
                <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                  <HandHeart className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{s.t}</p>
                  <p className="text-muted-foreground text-xs">{s.when}</p>
                </div>
                <Badge className={cn("border-0 font-semibold", s.tone)}>{s.status}</Badge>
                <Button variant="outline" size="sm" className="shrink-0">
                  Details
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <CalendarDays className="text-primary size-4" /> Need support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcoming.map((u) => (
                <div key={u.t} className="rounded-xl border p-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold">{u.t}</p>
                    <Badge variant="secondary" className="font-semibold">
                      {u.role}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mt-1 text-xs">{u.d}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <HeartHandshake className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Impact so far</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                128 hours across 6 events — 60+ learners supported. Next level: Silver at 200 hrs.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
