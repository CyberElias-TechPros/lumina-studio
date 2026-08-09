import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  HeartPulse,
  Users,
  UserRoundCheck,
  UserRoundX,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { useEmployeeItems, useLeaveRequestItems, usePayrollChangeItems } from "@/lib/query/hr";
import { usePostingItems } from "@/lib/query/recruitment";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/director/hr")({
  head: () => ({
    meta: [
      { title: "HR Overview — CEA-OS" },
      { name: "description", content: "Headcount, turnover and people satisfaction." },
    ],
  }),
  component: DirectorHr,
});

function DirectorHr() {
  const employees = useEmployeeItems();
  const leave = useLeaveRequestItems();
  const changes = usePayrollChangeItems();
  const postings = usePostingItems();

  const active = employees.filter((s) => s.status === "Active").length;
  const onLeave = employees.filter((s) => s.status === "On leave").length;
  const openRoles = postings.filter((p) => p.status === "Open").length;
  const leavers = changes.filter((c) => /leaver|exit|offboard/i.test(c.title)).length;
  const turnover = employees.length ? Math.round((leavers / employees.length) * 100) : 0;
  const completed = changes.filter((c) => c.status === "sent" || c.status === "approved").length;
  const onboarding = changes.length ? Math.round((completed / changes.length) * 100) : 0;
  const pendingLeave = leave.filter((l) => l.status === "Pending").length;

  const byDept = new Map<string, number>();
  for (const e of employees) byDept.set(e.dept, (byDept.get(e.dept) ?? 0) + 1);
  const totalStaff = employees.length || 1;
  const depts = Array.from(byDept.entries())
    .map(([d, h], i) => ({
      d,
      h: String(h),
      t: `${Math.round((h / totalStaff) * 100)}% of staff`,
      tone:
        i % 4 === 0
          ? "bg-primary/10 text-primary"
          : i % 4 === 1
            ? "bg-learning/10 text-learning"
            : i % 4 === 2
              ? "bg-success/10 text-success"
              : "bg-warning/10 text-warning",
    }))
    .sort((a, b) => Number(b.h) - Number(a.h));

  return (
    <AppShell
      roleKey="director"
      title="HR overview"
      subtitle={`${employees.length} staff · ${active} active · ${onLeave} on leave · ${openRoles} open roles`}
      actions={
        <>
          <Badge
            className={cn(
              "border-0 font-semibold",
              turnover <= 12 ? "bg-success/10 text-success" : "bg-warning/10 text-warning",
            )}
          >
            {turnover}% turnover
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/director">
              <ArrowLeft className="size-4" /> Director portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Headcount",
            value: String(employees.length),
            delta: `${openRoles} open roles`,
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Turnover proxy",
            value: `${turnover}%`,
            delta: "benchmark 12%",
            icon: UserRoundX,
            tone: turnover <= 12 ? "bg-success/10 text-success" : "bg-warning/10 text-warning",
          },
          {
            label: "Leave pending",
            value: String(pendingLeave),
            delta: `${onLeave} on leave now`,
            icon: HeartPulse,
            tone: "bg-community/10 text-community",
          },
          {
            label: "Payroll changes done",
            value: `${onboarding}%`,
            delta: `${changes.length} on record`,
            icon: UserRoundCheck,
            tone: "bg-learning/10 text-learning",
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
            <CalendarClock className="text-primary size-4" /> Headcount by department
          </CardTitle>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/hr">
              HR portal <ArrowRight className="ml-1 size-3.5" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          {depts.map((d) => (
            <div key={d.d} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{d.d}</p>
                <p className="text-muted-foreground text-xs">{d.t}</p>
              </div>
              <Badge variant="secondary" className="font-semibold">
                {d.h} staff
              </Badge>
              <Badge className={cn("border-0 font-semibold", d.tone)}>Stable</Badge>
            </div>
          ))}
          {depts.length === 0 && (
            <p className="text-muted-foreground py-4 text-center text-sm">
              No employee records yet.
            </p>
          )}
        </CardContent>
      </Card>
    </AppShell>
  );
}
