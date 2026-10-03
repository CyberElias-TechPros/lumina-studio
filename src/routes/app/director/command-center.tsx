"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  HeartPulse,
  LayoutDashboard,
  Megaphone,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { useExpenseItems, useInvoiceItems } from "@/lib/query/finance";
import { useEmployeeItems, useLeaveRequestItems, usePayrollChangeItems } from "@/lib/query/hr";
import { useCampaignItems, useLeadItems } from "@/lib/query/marketing";
import { usePostingItems, useInterviewItems } from "@/lib/query/recruitment";
import { usePaymentHistoryItems } from "@/lib/query/payments";
import { useCourses } from "@/lib/query/courses";
import { useInstructorGradebookRows } from "@/lib/query/instructor";
import { cn, formatNairaCompact } from "@/lib/utils";

export const Route = createFileRoute("/app/director/command-center")({
  head: () => ({
    meta: [
      { title: "Command Center — CEA-OS" },
      {
        name: "description",
        content: "Real-time organisational KPIs and health for the director.",
      },
    ],
  }),
  component: DirectorCommandCenter,
});

function DirectorCommandCenter() {
  const invoices = useInvoiceItems();
  const expenses = useExpenseItems();
  const payments = usePaymentHistoryItems();
  const employees = useEmployeeItems();
  const leave = useLeaveRequestItems();
  const changes = usePayrollChangeItems();
  const postings = usePostingItems();
  const interviews = useInterviewItems();
  const campaigns = useCampaignItems();
  const leads = useLeadItems();
  const courses = useCourses();
  const gradebook = useInstructorGradebookRows();

  const courseRows = courses.data?.pages.flatMap((p) => p.items) ?? [];

  const revenue = payments.reduce((s, p) => (p.status === "success" ? s + p.amount : s), 0);
  const spend = expenses.reduce((s, e) => s + e.amount, 0);
  const margin = revenue > 0 ? Math.round(((revenue - spend) / revenue) * 100) : 0;
  const paidSeats = payments.filter((p) => p.status === "success").length;
  const completed = interviews.filter((i) => i.status === "Completed").length;
  const placement = interviews.length ? Math.round((completed / interviews.length) * 100) : 0;
  const avgCompletion = courseRows.length
    ? Math.round(courseRows.reduce((s, c) => s + c.pct, 0) / courseRows.length)
    : 0;
  const openRoles = postings.filter((p) => p.status === "Open").length;
  const pendingLeave = leave.filter((l) => l.status === "Pending").length;
  const pendingPayroll = changes.filter((c) => c.status !== "sent" && c.status !== "approved");
  const overdue = invoices.filter((i) => i.status === "Overdue").length;
  const atRisk = gradebook.filter((r) => r.atRisk).length;
  const belowRoas = campaigns.filter((c) => c.roas < 5).length;

  const health = [
    {
      k: "Financial health",
      v: margin >= 25 ? "Green" : "Amber",
      d: `${formatNairaCompact(revenue)} collected · ${margin}% margin`,
      tone: margin >= 25 ? "bg-success/10 text-success" : "bg-warning/10 text-warning",
    },
    {
      k: "Academic health",
      v: avgCompletion >= 88 ? "Green" : "Amber",
      d: `Completion ${avgCompletion}% vs 88% target`,
      tone: avgCompletion >= 88 ? "bg-success/10 text-success" : "bg-warning/10 text-warning",
    },
    {
      k: "People health",
      v: pendingLeave + pendingPayroll.length === 0 ? "Green" : "Amber",
      d: `${employees.length} staff · ${pendingLeave} leave · ${pendingPayroll.length} payroll pending`,
      tone:
        pendingLeave + pendingPayroll.length === 0
          ? "bg-success/10 text-success"
          : "bg-warning/10 text-warning",
    },
    {
      k: "Marketing",
      v: belowRoas > 0 ? "Amber" : "Green",
      d: `${leads.length} leads · ${belowRoas} campaign${belowRoas === 1 ? "" : "s"} below 5x ROAS`,
      tone: belowRoas > 0 ? "bg-warning/10 text-warning" : "bg-success/10 text-success",
    },
  ];

  const alerts = [
    ...(belowRoas > 0
      ? [
          {
            a: `${belowRoas} campaign${belowRoas === 1 ? "" : "s"} below 5x ROAS target`,
            d: `${campaigns.length} campaigns tracked · flag for review`,
            tone: "bg-warning/10 text-warning",
          },
        ]
      : []),
    ...(overdue > 0
      ? [
          {
            a: `${overdue} overdue invoice${overdue === 1 ? "" : "s"}`,
            d: "Receivables aging · finance follow-up due",
            tone: "bg-primary/10 text-primary",
          },
        ]
      : []),
    ...(atRisk > 0
      ? [
          {
            a: `${atRisk} at-risk learners flagged`,
            d: "Instructor gradebook · mentor pairing recommended",
            tone: "bg-learning/10 text-learning",
          },
        ]
      : []),
    ...(pendingLeave + pendingPayroll.length > 0
      ? [
          {
            a: `${pendingLeave + pendingPayroll.length} approvals waiting`,
            d: "Leave + payroll changes",
            tone: "bg-community/10 text-community",
          },
        ]
      : []),
  ];

  const green = health.filter((h) => h.v === "Green").length;
  const amber = health.length - green;

  return (
    <AppShell
      roleKey="director"
      title="Executive command center"
      subtitle={`Real-time KPIs · ${formatNairaCompact(revenue)} collected · ${openRoles} open roles · Q3 2026`}
      actions={
        <>
          <Badge
            className={cn(
              "border-0 font-semibold",
              amber > 0 ? "bg-warning/10 text-warning" : "bg-success/10 text-success",
            )}
          >
            {green} green · {amber} amber
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
            label: "Paid seats",
            value: String(paidSeats),
            delta: "successful payments",
            icon: GraduationCap,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Interview completion",
            value: `${placement}%`,
            delta: "of interview rounds",
            icon: TrendingUp,
            tone: "bg-career/10 text-career",
          },
          {
            label: "Collected (MTD)",
            value: formatNairaCompact(revenue),
            delta: `${margin}% margin`,
            icon: Wallet,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Open roles",
            value: String(openRoles),
            delta: "recruitment pipeline",
            icon: Megaphone,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <HeartPulse className="text-primary size-4" /> Organisation health
            </CardTitle>
            <Badge variant="secondary" className="font-semibold">
              {green} green · {amber} amber
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {health.map((h) => (
              <div
                key={h.k}
                className="flex items-center justify-between gap-3 rounded-xl border p-3"
              >
                <div>
                  <p className="text-sm font-bold">{h.k}</p>
                  <p className="text-muted-foreground mt-0.5 text-xs">{h.d}</p>
                </div>
                <Badge className={cn("shrink-0 border-0 font-semibold", h.tone)}>{h.v}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Users className="text-primary size-4" /> Needs attention
            </CardTitle>
            <Button asChild variant="outline" size="sm" className="font-semibold">
              <Link to="/app/director/approvals">
                Approvals <ArrowRight className="ml-1 size-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="divide-y">
            {alerts.map((a) => (
              <div
                key={a.a}
                className="flex flex-wrap items-center gap-3 py-3.5 first:pt-0 last:pb-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{a.a}</p>
                  <p className="text-muted-foreground text-xs">{a.d}</p>
                </div>
                <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                  Review
                </Button>
              </div>
            ))}
            {alerts.length === 0 && (
              <p className="text-muted-foreground py-4 text-center text-sm">
                No alerts — everything on track.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-ink text-ink-foreground shadow-elevated mt-5 border-0">
        <CardContent className="flex flex-wrap items-center gap-4 p-6">
          <span className="bg-ink-foreground/10 grid size-10 place-items-center rounded-xl">
            <LayoutDashboard className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-extrabold">Quick actions</p>
            <p className="text-ink-foreground/70 text-xs">
              Approvals queue · OKR check-ins · drill into any department report.
            </p>
          </div>
          <Button
            asChild
            size="sm"
            className="bg-gradient-brand shadow-glow border-0 font-semibold"
          >
            <Link to="/app/director/okrs">
              Open OKRs <ArrowRight className="ml-1 size-3.5" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </AppShell>
  );
}
