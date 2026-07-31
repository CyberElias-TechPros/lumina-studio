import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock,
  FileText,
  GraduationCap,
  MessageSquare,
  Receipt,
  ShieldCheck,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppShell } from "@/components/app/app-shell";
import { formatNaira } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/student")({
  head: () => ({
    meta: [
      { title: "Student Portal — CEA-OS" },
      {
        name: "description",
        content:
          "Your student workspace: learning hub, assignments, grades, finance, portfolio, marketplace and more.",
      },
    ],
  }),
  component: StudentPortal,
});

const kpis = [
  {
    label: "GPA",
    value: "4.2",
    delta: "+0.1",
    icon: GraduationCap,
    tone: "text-primary bg-primary/10",
  },
  {
    label: "Attendance",
    value: "94%",
    delta: "+2%",
    icon: Users,
    tone: "text-learning bg-learning/10",
  },
  {
    label: "Assignments",
    value: "18/22",
    delta: "4 due",
    icon: FileText,
    tone: "text-warning bg-warning/10",
  },
  {
    label: "Portfolio",
    value: "3/4",
    delta: "1 artifact",
    icon: BriefcaseBusiness,
    tone: "text-career bg-career/10",
  },
];

const courses = [
  {
    title: "Full-Stack Software Development",
    pct: 78,
    next: "Backend, APIs & Databases",
    due: "Fri",
    tone: "bg-gradient-learning",
  },
  {
    title: "Cloud Engineering & DevOps",
    pct: 54,
    next: "Containers & Kubernetes",
    due: "Mon",
    tone: "bg-gradient-erp",
  },
  {
    title: "Product & UI/UX Design",
    pct: 31,
    next: "Interface & Design Systems",
    due: "Wed",
    tone: "bg-gradient-services",
  },
];

const grades = [
  { course: "Backend & APIs", score: "A", pct: 92 },
  { course: "DevOps Fundamentals", score: "B+", pct: 86 },
  { course: "Design Systems", score: "A-", pct: 89 },
  { course: "Career Readiness", score: "A", pct: 94 },
];

const invoices = [
  {
    ref: "INV-2026-0814",
    item: "Term 2 instalment",
    amount: 140000,
    status: "Paid",
    tone: "text-success bg-success/10",
  },
  {
    ref: "INV-2026-0911",
    item: "Term 3 instalment",
    amount: 140000,
    status: "Due Sep 1",
    tone: "text-warning bg-warning/10",
  },
  {
    ref: "INV-2026-0912",
    item: "Laptop deposit (refundable)",
    amount: 50000,
    status: "Paid",
    tone: "text-success bg-success/10",
  },
];

const certs = [
  {
    name: "Full-Stack Fundamentals",
    status: "Issued",
    date: "May 2026",
    code: "CEA-CERT-2026-8F3K",
  },
  { name: "Cloud & DevOps", status: "In progress", date: "Est. Nov 2026", code: "—" },
];

function StudentPortal() {
  return (
    <AppShell
      roleKey="student"
      title="Student portal"
      subtitle="Cohort 15 · Full-Stack Software Development · Week 12 of 38"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Good standing</Badge>
          <Badge variant="secondary" className="font-semibold">
            Scholarship: Merit 50%
          </Badge>
          <Button asChild variant="outline" size="sm" className="ml-auto">
            <Link to="/marketplace">Marketplace</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <BookOpen className="text-primary size-4" /> Learning hub
              </CardTitle>
              <Button asChild variant="ghost" size="sm" className="text-primary font-semibold">
                <Link to="/app/learn">
                  Open hub <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {courses.map((c) => (
                <div key={c.title} className="rounded-xl border p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-display text-sm font-bold">{c.title}</p>
                    <span className="text-muted-foreground text-xs font-semibold">{c.pct}%</span>
                  </div>
                  <Progress value={c.pct} className="mt-2.5 h-1.5" />
                  <p className="text-muted-foreground mt-2.5 flex items-center gap-1.5 text-xs">
                    <CalendarDays className="size-3.5" /> {c.next} · next {c.due}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <GraduationCap className="text-primary size-4" /> Grades
              </CardTitle>
              <Badge variant="secondary" className="font-semibold">
                Term 2 · Mid-term
              </Badge>
              <Button asChild variant="ghost" size="sm" className="text-primary font-semibold">
                <Link to="/app/grades">
                  Full gradebook <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {grades.map((g) => (
                  <div key={g.course} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                    <span className="font-display flex-1 text-sm font-bold">{g.course}</span>
                    <Progress value={g.pct} className="h-1.5 w-28" />
                    <span className="text-muted-foreground w-9 text-right text-xs font-semibold">
                      {g.pct}%
                    </span>
                    <Badge className="bg-primary/10 text-primary w-10 justify-center border-0 font-bold">
                      {g.score}
                    </Badge>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground mt-4 border-t pt-3 text-xs">
                Cumulative GPA <strong className="text-foreground">4.2 / 5.0</strong> — top 5% of
                cohort. OSKM skills verified: 11 of 16.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Receipt className="text-primary size-4" /> Finance
              </CardTitle>
              <Badge className="bg-success/10 text-success border-0 font-semibold">
                Balance: {formatNaira(140000)}
              </Badge>
            </CardHeader>
            <CardContent className="divide-y">
              {invoices.map((inv) => (
                <div key={inv.ref} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                    <Wallet className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{inv.item}</p>
                    <p className="text-muted-foreground text-xs">{inv.ref}</p>
                  </div>
                  <span className="font-display text-sm font-extrabold">
                    {formatNaira(inv.amount)}
                  </span>
                  <Badge className={cn("border-0 font-semibold", inv.tone)}>{inv.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <ShieldCheck className="text-primary size-4" /> Certificates
              </CardTitle>
              <Button asChild variant="ghost" size="sm" className="text-primary font-semibold">
                <Link to="/certificates/verify">
                  Verify <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {certs.map((c) => (
                <div key={c.name} className="rounded-xl border p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold">{c.name}</p>
                    {c.status === "Issued" ? (
                      <Badge className="bg-success/10 text-success border-0 font-semibold">
                        Issued
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="font-semibold">
                        In progress
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground mt-1 font-mono text-[11px]">
                    {c.code} · {c.date}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Award className="text-primary size-4" /> Next milestones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  icon: BriefcaseBusiness,
                  t: "Publish capstone artifact #3",
                  m: "Due in 9 days",
                  tone: "bg-career/10 text-career",
                },
                {
                  icon: FileText,
                  t: "Submit REST API assignment",
                  m: "Today 23:59",
                  tone: "bg-warning/10 text-warning",
                },
                {
                  icon: CalendarDays,
                  t: "Mentor circle with Emeka",
                  m: "Today 14:00",
                  tone: "bg-primary/10 text-primary",
                },
              ].map((m) => (
                <div key={m.t} className="flex items-start gap-3">
                  <span
                    className={cn("grid size-8 shrink-0 place-items-center rounded-lg", m.tone)}
                  >
                    <m.icon className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{m.t}</p>
                    <p className="text-muted-foreground text-xs">{m.m}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <MessageSquare className="text-primary size-4" /> Messages
              </CardTitle>
              <Badge className="bg-error/10 text-error h-5 border-0 text-[10px] font-bold">
                2 unread
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  from: "Emeka Nwosu",
                  msg: "Your API submission was the strongest in the cohort.",
                  time: "2h",
                },
                {
                  from: "Career Services",
                  msg: "Employer spotlight: Paystack frontend role closes Friday.",
                  time: "1d",
                },
              ].map((m) => (
                <div key={m.from} className="flex items-start gap-3 rounded-xl border p-3">
                  <span className="bg-gradient-brand text-primary-foreground font-display grid size-9 shrink-0 place-items-center rounded-full text-[10px] font-bold">
                    {m.from
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center justify-between text-xs font-bold">
                      {m.from} <span className="text-muted-foreground font-medium">{m.time}</span>
                    </p>
                    <p className="text-muted-foreground mt-0.5 text-xs leading-relaxed">{m.msg}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <p className="text-ink-foreground/60 text-xs font-bold tracking-[0.16em] uppercase">
                Job match
              </p>
              <p className="font-display mt-2 text-lg font-extrabold">Frontend Engineer</p>
              <p className="text-ink-foreground/70 text-sm">
                Paystack · Lagos · Hybrid · {formatNaira(9000000)}–{formatNaira(14000000)}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Progress value={96} className="h-1.5 flex-1 bg-ink-foreground/15" />
                <span className="text-career text-xs font-extrabold">96% match</span>
              </div>
              <Button asChild size="sm" className="bg-gradient-brand shadow-glow mt-4 border-0">
                <Link to="/marketplace">
                  View role <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Clock className="text-primary size-4" /> Attendance · this week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1.5">
                {[
                  { d: "M", v: 100, t: "text-success bg-success/10" },
                  { d: "T", v: 100, t: "text-success bg-success/10" },
                  { d: "W", v: 67, t: "text-warning bg-warning/10" },
                  { d: "T", v: 100, t: "text-success bg-success/10" },
                  { d: "F", v: 100, t: "text-success bg-success/10" },
                  { d: "S", v: 100, t: "text-success bg-success/10" },
                  { d: "S", v: null, t: "bg-muted text-muted-foreground" },
                ].map((x) => (
                  <div key={x.d} className={cn("rounded-lg py-2.5 text-center", x.t)}>
                    <p className="text-[10px] font-bold">{x.d}</p>
                    <p className="text-xs font-extrabold">{x.v === null ? "–" : `${x.v}%`}</p>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground mt-3 border-t pt-3 text-xs">
                One late arrival (Wed). Threshold for warning: 3 per month — you're clear.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-5">
        <Card className="bg-card shadow-soft border">
          <CardContent className="flex flex-wrap items-center gap-3 p-5">
            <CheckCircle2 className="text-success size-5" />
            <p className="flex-1 text-sm font-semibold">
              Academic standing: <span className="text-success">Good</span> — scholarship terms met,
              no flags.
            </p>
            <Button asChild variant="outline" size="sm">
              <Link to="/portal/parent">Parent view</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
