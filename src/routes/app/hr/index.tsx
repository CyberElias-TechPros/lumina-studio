"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, ArrowRight, CalendarDays, HeartPulse, UserRound, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { useEmployees, useLeaveRequests, usePayrollChanges } from "@/lib/query/hr";
import { usePostings } from "@/lib/query/recruitment";
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
  const employees = useEmployees();
  const leave = useLeaveRequests();
  const payroll = usePayrollChanges();
  const postings = usePostings();

  const staff = employees.data?.pages.flatMap((p) => p.items) ?? [];
  const requests = leave.data?.pages.flatMap((p) => p.items) ?? [];
  const changes = payroll.data?.pages.flatMap((p) => p.items) ?? [];
  const roles = postings.data?.pages.flatMap((p) => p.items) ?? [];

  const active = staff.filter((s) => s.status === "Active");
  const pendingLeave = requests.filter((r) => r.status === "Pending");
  const approvedLeave = requests.filter((r) => r.status === "Approved");
  const pendingPayroll = changes.filter((c) => c.status !== "sent" && c.status !== "approved");
  const applicants = roles.reduce((s, r) => s + r.applicants, 0);
  const openLeave = pendingLeave.length;

  return (
    <AppShell
      roleKey="hr"
      title="HR hub"
      subtitle={`${staff.length} staff · ${roles.length} open roles · ${pendingPayroll.length} payroll changes pending`}
      actions={
        <>
          <Badge
            className={cn(
              "border-0 font-semibold",
              openLeave > 0 ? "bg-warning/10 text-warning" : "bg-success/10 text-success",
            )}
          >
            {openLeave > 0 ? `${openLeave} leave open` : "All clear"}
          </Badge>
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
            value: String(staff.length),
            delta: `${active.length} active`,
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Leave open",
            value: String(openLeave),
            delta: `${approvedLeave.length} approved`,
            icon: CalendarDays,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Payroll pending",
            value: String(pendingPayroll.length),
            delta: `${changes.length} changes total`,
            icon: HeartPulse,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Open roles",
            value: String(roles.length),
            delta: `${applicants} applications`,
            icon: UserRound,
            tone: "bg-community/10 text-community",
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
