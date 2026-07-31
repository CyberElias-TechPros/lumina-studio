import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock3, Play, Square, Timer, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/volunteer/hours")({
  head: () => ({
    meta: [
      { title: "Hours Tracker — CEA-OS" },
      { name: "description", content: "Clock in and out, track and get hours approved." },
    ],
  }),
  component: VolunteerHours,
});

const entries = [
  {
    e: "Career fair booth",
    d: "Jul 18 · 10:00–16:00",
    h: "6h",
    s: "Approved",
    tone: "bg-success/10 text-success",
  },
  {
    e: "Community outreach",
    d: "Jun 28 · 09:00–14:00",
    h: "5h",
    s: "Approved",
    tone: "bg-success/10 text-success",
  },
  {
    e: "Alumni event support",
    d: "Jun 10 · 12:00–16:00",
    h: "4h",
    s: "Pending",
    tone: "bg-warning/10 text-warning",
  },
];

function VolunteerHours() {
  return (
    <AppShell
      roleKey="student"
      title="Hours tracker"
      subtitle="47h logged · 42h approved · target 60h"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">78% of target</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/volunteer">
              <ArrowLeft className="size-4" /> Volunteer portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "This month",
            value: "11h",
            delta: "2 activities",
            icon: Clock3,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Year to date",
            value: "47h",
            delta: "target 60h",
            icon: Timer,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Approved",
            value: "42h",
            delta: "89% rate",
            icon: Square,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Cert. hours",
            value: "40h",
            delta: "for appreciation",
            icon: Wallet,
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
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Timer className="text-primary size-4" /> Clock in / out
          </CardTitle>
          <Badge variant="secondary" className="font-semibold">
            Not clocked in
          </Badge>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
            <Play className="size-3.5" /> Clock in
          </Button>
          <p className="text-muted-foreground text-xs font-semibold">
            Approved by community manager within 48h. Manual entries need a note.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Clock3 className="text-primary size-4" /> Recent entries
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {entries.map((e) => (
            <div key={e.e} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{e.e}</p>
                <p className="text-muted-foreground text-xs">{e.d}</p>
              </div>
              <p className="text-sm font-semibold">{e.h}</p>
              <Badge className={cn("border-0 font-semibold", e.tone)}>{e.s}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
