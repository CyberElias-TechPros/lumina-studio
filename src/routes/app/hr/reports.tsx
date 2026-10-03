"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, BarChart3, FileBarChart2, HeartPulse, TrendingDown, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { useEmployees, useLeaveRequests, usePayrollChanges } from "@/lib/query/hr";
import { usePostings } from "@/lib/query/recruitment";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/hr/reports")({
  head: () => ({
    meta: [
      { title: "HR Reports — CEA-OS" },
      { name: "description", content: "Turnover, satisfaction and compliance reports." },
    ],
  }),
  component: HrReports,
});

function HrReports() {
  const employees = useEmployees();
  const leave = useLeaveRequests();
  const payroll = usePayrollChanges();
  const postings = usePostings();

  const staff = employees.data?.pages.flatMap((p) => p.items) ?? [];
  const requests = leave.data?.pages.flatMap((p) => p.items) ?? [];
  const changes = payroll.data?.pages.flatMap((p) => p.items) ?? [];
  const roles = postings.data?.pages.flatMap((p) => p.items) ?? [];

  const active = staff.filter((s) => s.status === "Active").length;
  const onLeave = staff.filter((s) => s.status === "On leave").length;
  const approved = requests.filter((r) => r.status === "Approved").length;
  const pending = requests.filter((r) => r.status === "Pending").length;
  const pendingChanges = changes.filter((c) => c.status !== "sent" && c.status !== "approved");
  const applicants = roles.reduce((s, r) => s + r.applicants, 0);

  const reports = [
    {
      r: "Headcount snapshot",
      d: `${staff.length} staff · ${active} active · ${onLeave} on leave`,
      tone: "bg-primary/10 text-primary",
    },
    {
      r: "Leave status",
      d: `${approved} approved · ${pending} pending requests`,
      tone: "bg-success/10 text-success",
    },
    {
      r: "Payroll changes",
      d: `${pendingChanges.length} pending of ${changes.length} total`,
      tone: "bg-warning/10 text-warning",
    },
    {
      r: "Open roles & applications",
      d: `${roles.length} roles · ${applicants} applications`,
      tone: "bg-learning/10 text-learning",
    },
  ];

  return (
    <AppShell
      roleKey="hr"
      title="HR reports"
      subtitle={`${staff.length} headcount · ${requests.length} leave requests · ${changes.length} payroll changes`}
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">All current</Badge>
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
            label: "Headcount",
            value: String(staff.length),
            delta: `${active} active`,
            icon: Users,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Active rate",
            value: staff.length ? `${Math.round((active / staff.length) * 100)}%` : "—",
            delta: "of headcount",
            icon: TrendingDown,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Leave requests",
            value: String(requests.length),
            delta: `${pending} pending`,
            icon: HeartPulse,
            tone: "bg-community/10 text-community",
          },
          {
            label: "Payroll pending",
            value: String(pendingChanges.length),
            delta: "awaiting sign-off",
            icon: BarChart3,
            tone: "bg-primary/10 text-primary",
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
            <FileBarChart2 className="text-primary size-4" /> Current reports
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {reports.map((r) => (
            <div key={r.r} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{r.r}</p>
                <p className="text-muted-foreground text-xs">{r.d}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", r.tone)}>Live</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Open
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
