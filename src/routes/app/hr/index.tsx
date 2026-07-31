import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CalendarDays, HeartPulse, UserRound, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/hr/")({
  head: () => ({
    meta: [
      { title: "HR Hub — CEA-OS" },
      { name: "description", content: "Headcount, open positions, leave and reviews." },
    ],
  }),
  component: HrHub,
});

const screens = [
  {
    icon: UserRound,
    label: "Recruitment",
    desc: "Postings, interviews, offers",
    path: "/app/hr/recruitment",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: Users,
    label: "Employees",
    desc: "Contracts, documents",
    path: "/app/hr/employees",
    tone: "bg-learning/10 text-learning",
  },
  {
    icon: CalendarDays,
    label: "Leave",
    desc: "Requests, balances",
    path: "/app/hr/leave",
    tone: "bg-success/10 text-success",
  },
  {
    icon: HeartPulse,
    label: "Performance",
    desc: "Cycles, appraisals",
    path: "/app/hr/performance",
    tone: "bg-warning/10 text-warning",
  },
];

function HrHub() {
  return (
    <AppShell
      roleKey="instructor"
      title="HR hub"
      subtitle="94 staff · 6 open roles · eNPS 61"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">eNPS rising</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/hr">
              <ArrowLeft className="size-4" /> HR portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Headcount",
            value: "94",
            delta: "6 open roles",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Leave open",
            value: "11",
            delta: "7 approved",
            icon: CalendarDays,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "eNPS",
            value: "61",
            delta: "+4 vs Q2",
            icon: HeartPulse,
            tone: "bg-community/10 text-community",
          },
          {
            label: "Reviews due",
            value: "14",
            delta: "Q3 cycle",
            icon: UserRound,
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
            <Users className="text-primary size-4" /> Workspace
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {screens.map((s) => (
            <Link
              key={s.path}
              to={s.path}
              className="group bg-card shadow-soft hover:shadow-elevated flex flex-col rounded-xl border p-4 transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <span className={cn("grid size-9 place-items-center rounded-lg", s.tone)}>
                  <s.icon className="size-4" />
                </span>
                <ArrowRight className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
              </div>
              <p className="font-display mt-3 text-sm font-extrabold">{s.label}</p>
              <p className="text-muted-foreground mt-1 text-xs">{s.desc}</p>
            </Link>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
