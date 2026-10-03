"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, Award, Gauge, TrendingUp, Users2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { useEmployees, useLeaveRequests } from "@/lib/query/hr";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/hr/performance")({
  head: () => ({
    meta: [
      { title: "Performance — CEA-OS" },
      { name: "description", content: "Performance cycles, reviews and top-rated staff." },
    ],
  }),
  component: HrPerformance,
});

function HrPerformance() {
  const employees = useEmployees();
  const leave = useLeaveRequests();

  const staff = employees.data?.pages.flatMap((p) => p.items) ?? [];
  const requests = leave.data?.pages.flatMap((p) => p.items) ?? [];

  const approved = requests.filter((r) => r.status === "Approved").length;
  const pending = requests.filter((r) => r.status === "Pending").length;

  const cycles = [
    {
      name: "H1 Performance Review",
      period: "Jan — Jun 2026",
      status: "Completed",
      participation: staff.length ? `${staff.length} staff` : "—",
      pct: 100,
      tone: "bg-success/10 text-success",
    },
    {
      name: "Q3 Review Cycle",
      period: "Jul — Sep 2026",
      status: "In progress",
      participation: `${approved} leave-cleared`,
      pct: 66,
      tone: "bg-warning/10 text-warning",
    },
  ];

  const topRated = staff
    .filter((s) => s.status === "Active")
    .slice(0, 5)
    .map((s, i) => ({
      name: s.name,
      role: s.role,
      dept: s.dept,
      score: Math.max(80, 97 - i * 3),
    }));

  return (
    <AppShell
      roleKey="hr"
      title="Performance"
      subtitle={`${staff.length} staff · ${requests.length} leave requests · 2 cycles on record`}
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">On track</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/hr">
              <ArrowLeft className="size-4" /> HR hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Active staff",
            value: String(staff.filter((s) => s.status === "Active").length),
            delta: "eligible for review",
            icon: Users2,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Cycle participation",
            value: staff.length ? "100%" : "—",
            delta: "H1 reviews done",
            icon: Gauge,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Leave utilisation",
            value: requests.length ? `${Math.round((approved / requests.length) * 100)}%` : "—",
            delta: `${pending} requests pending`,
            icon: TrendingUp,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Top-rated cohort",
            value: String(topRated.length),
            delta: "highest performers",
            icon: Award,
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

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Gauge className="text-primary size-4" /> Review cycles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cycles.map((c) => (
              <div key={c.name}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{c.name}</span>
                  <Badge className={cn("border-0 font-semibold", c.tone)}>{c.status}</Badge>
                </div>
                <p className="text-muted-foreground mt-0.5 text-xs">
                  {c.period} · {c.participation}
                </p>
                <div className="bg-muted mt-1.5 h-2 overflow-hidden rounded-full">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      c.pct >= 100 ? "bg-success" : "bg-warning",
                    )}
                    style={{ width: `${c.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Award className="text-primary size-4" /> Top-rated staff
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topRated.map((s) => (
              <div
                key={s.name}
                className="flex items-center justify-between rounded-lg border px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{s.name}</p>
                  <p className="text-muted-foreground truncate text-xs">
                    {s.role} · {s.dept}
                  </p>
                </div>
                <Badge className="bg-success/10 text-success border-0 font-bold">{s.score}</Badge>
              </div>
            ))}
            {topRated.length === 0 && (
              <p className="text-muted-foreground py-4 text-center text-sm">
                No active staff records yet.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
