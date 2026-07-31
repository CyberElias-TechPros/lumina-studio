import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  FileText,
  GraduationCap,
  HeartHandshake,
  Receipt,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppShell } from "@/components/app/app-shell";
import { formatNaira } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/parent")({
  head: () => ({
    meta: [
      { title: "Parent Portal — CEA-OS" },
      {
        name: "description",
        content:
          "Track your learner's progress, attendance, bills and consent records — all in one place.",
      },
    ],
  }),
  component: ParentPortal,
});

const learner = {
  name: "Adaeze Okafor",
  program: "Full-Stack Software Development",
  cohort: "Cohort 15 · Week 12 of 38",
  gpa: "4.2 / 5.0",
  attendance: 94,
};

const bills = [
  {
    item: "Term 2 instalment",
    amount: 140000,
    status: "Paid",
    date: "Jul 2, 2026",
    tone: "bg-success/10 text-success",
  },
  {
    item: "Term 3 instalment",
    amount: 140000,
    status: "Due Sep 1",
    date: "Upcoming",
    tone: "bg-warning/10 text-warning",
  },
];

function ParentPortal() {
  return (
    <AppShell
      roleKey="student"
      title="Parent portal"
      subtitle={`Ward: ${learner.name} — ${learner.cohort}`}
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Good standing</Badge>
          <Button asChild variant="outline" size="sm" className="ml-auto">
            <Link to="/portal/student">Learner's view</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-5">
          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-4">
                <span className="bg-gradient-brand shadow-glow font-display grid size-14 place-items-center rounded-2xl text-lg font-extrabold text-white">
                  AO
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-xl font-extrabold">{learner.name}</p>
                  <p className="text-ink-foreground/70 text-sm">{learner.program}</p>
                  <p className="text-ink-foreground/60 mt-1 text-xs">{learner.cohort}</p>
                </div>
                <Badge className="bg-ink-foreground/15 text-ink-foreground border-0">Active</Badge>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-ink-foreground/10 p-4">
                  <p className="text-ink-foreground/60 text-[10px] font-bold tracking-wide uppercase">
                    GPA
                  </p>
                  <p className="font-display mt-1 text-xl font-extrabold">{learner.gpa}</p>
                </div>
                <div className="rounded-xl bg-ink-foreground/10 p-4">
                  <p className="text-ink-foreground/60 text-[10px] font-bold tracking-wide uppercase">
                    Attendance
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Progress
                      value={learner.attendance}
                      className="h-1.5 flex-1 bg-ink-foreground/15"
                    />
                    <span className="text-sm font-extrabold">{learner.attendance}%</span>
                  </div>
                </div>
                <div className="rounded-xl bg-ink-foreground/10 p-4">
                  <p className="text-ink-foreground/60 text-[10px] font-bold tracking-wide uppercase">
                    Placement track
                  </p>
                  <p className="font-display mt-1 text-xl font-extrabold">On track</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <GraduationCap className="text-primary size-4" /> Academic snapshot
              </CardTitle>
              <Badge variant="secondary" className="font-semibold">
                Term 2 · Mid-term
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { c: "Backend & APIs", g: "A", pct: 92 },
                { c: "DevOps Fundamentals", g: "B+", pct: 86 },
                { c: "Design Systems", g: "A-", pct: 89 },
                { c: "Career Readiness", g: "A", pct: 94 },
              ].map((x) => (
                <div key={x.c} className="flex items-center gap-4">
                  <span className="flex-1 text-sm font-semibold">{x.c}</span>
                  <Progress value={x.pct} className="h-1.5 w-32" />
                  <Badge className="bg-primary/10 text-primary w-10 justify-center border-0 font-bold">
                    {x.g}
                  </Badge>
                </div>
              ))}
              <p className="text-muted-foreground border-t pt-3 text-xs">
                Top 5% of cohort. Instructor notes available in the full report card each term.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Receipt className="text-primary size-4" /> Billing
              </CardTitle>
              <Badge className="bg-success/10 text-success border-0 font-semibold">
                Balance: {formatNaira(140000)}
              </Badge>
            </CardHeader>
            <CardContent className="divide-y">
              {bills.map((b) => (
                <div key={b.item} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                    <CreditCard className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">{b.item}</p>
                    <p className="text-muted-foreground text-xs">{b.date}</p>
                  </div>
                  <span className="font-display text-sm font-extrabold">
                    {formatNaira(b.amount)}
                  </span>
                  <Badge className={cn("border-0 font-semibold", b.tone)}>{b.status}</Badge>
                </div>
              ))}
              <p className="text-muted-foreground pt-3 text-xs">
                Scholarship applied automatically:{" "}
                <strong className="text-foreground">Merit 50%</strong>. Receipts emailed each
                payment.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Bell className="text-primary size-4" /> Notifications
              </CardTitle>
              <Badge className="bg-error/10 text-error h-5 border-0 text-[10px] font-bold">
                3 new
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  icon: FileText,
                  t: "Term 2 report card published",
                  m: "Aug 1 · Download PDF",
                  tone: "bg-primary/10 text-primary",
                },
                {
                  icon: CalendarDays,
                  t: "Career fair — Sep 12",
                  m: "Volunteer as a parent chaperone?",
                  tone: "bg-career/10 text-career",
                },
                {
                  icon: CheckCircle2,
                  t: "Consent record updated",
                  m: "Lab safety waiver signed",
                  tone: "bg-success/10 text-success",
                },
              ].map((n) => (
                <div key={n.t} className="flex items-start gap-3 rounded-xl border p-3.5">
                  <span
                    className={cn("grid size-8 shrink-0 place-items-center rounded-lg", n.tone)}
                  >
                    <n.icon className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{n.t}</p>
                    <p className="text-muted-foreground mt-0.5 text-xs">{n.m}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <HeartHandshake className="text-primary size-4" /> Welfare
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-xl border p-3.5">
                <span className="text-sm font-semibold">Mentor</span>
                <span className="text-muted-foreground text-xs">Emeka Nwosu · in touch weekly</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border p-3.5">
                <span className="text-sm font-semibold">Health record</span>
                <Badge variant="secondary" className="font-semibold">
                  Up to date
                </Badge>
              </div>
              <div className="flex items-center justify-between rounded-xl border p-3.5">
                <span className="text-sm font-semibold">Counselling access</span>
                <Badge variant="secondary" className="font-semibold">
                  Available
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardContent className="flex items-start gap-3 p-5">
              <Users className="text-primary mt-0.5 size-5 shrink-0" />
              <p className="text-sm leading-relaxed font-medium">
                <strong className="font-display">Parents' council:</strong> the next quarterly
                meeting is September 6, 10:00 at the Ikeja campus. Meet the board, ask anything.
              </p>
            </CardContent>
          </Card>

          <Button asChild variant="outline" className="w-full">
            <Link to="/contact">
              Talk to Student Success <ArrowRight className="ml-1.5 size-4" />
            </Link>
          </Button>
          <Button asChild className="w-full">
            <Link to="/app/parent">
              Full parent dashboard <ArrowRight className="ml-1.5 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
