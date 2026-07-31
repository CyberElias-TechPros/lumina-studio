import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  FileText,
  MessageSquare,
  Receipt,
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

export const Route = createFileRoute("/app/parent/")({
  head: () => ({
    meta: [
      { title: "Parent Dashboard — CEA-OS" },
      { name: "description", content: "Your children's progress, bills and communication." },
    ],
  }),
  component: ParentDashboard,
});

const children = [
  {
    id: "ada-okafor",
    name: "Ada Okafor",
    course: "Full-Stack Software Development · Cohort 15",
    pct: 78,
    gpa: "4.2",
    attendance: 94,
    due: formatNaira(140000),
    dueDate: "Sep 1, 2026",
    tone: "bg-gradient-learning",
  },
  {
    id: "emeka-okafor",
    name: "Emeka Okafor",
    course: "Product & UI/UX Design · Cohort 16",
    pct: 42,
    gpa: "3.8",
    attendance: 97,
    due: formatNaira(160000),
    dueDate: "Sep 15, 2026",
    tone: "bg-gradient-services",
  },
];

const notices = [
  {
    t: "Term 2 exams begin Aug 18",
    d: "Academic board",
    icon: BookOpen,
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Parent–teacher meetings: Sep 5–9",
    d: "Register your slot",
    icon: Users,
    tone: "bg-learning/10 text-learning",
  },
  {
    t: "Inter-term break: Oct 23–31",
    d: "Residential students",
    icon: CalendarDays,
    tone: "bg-warning/10 text-warning",
  },
];

function ParentDashboard() {
  return (
    <AppShell
      roleKey="student"
      title="Parent dashboard"
      subtitle="Okafor family · 2 learners enrolled"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Accounts in good standing
          </Badge>
          <Button size="sm">
            <MessageSquare className="size-4" /> Contact school
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Children",
            value: "2",
            delta: "both active",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Avg. GPA",
            value: "4.0",
            delta: "+0.1 this term",
            icon: BookOpen,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Outstanding bills",
            value: formatNaira(300000),
            delta: "2 instalments due",
            icon: Wallet,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Messages unread",
            value: "3",
            delta: "incl. 1 urgent",
            icon: MessageSquare,
            tone: "bg-success/10 text-success",
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
        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Users className="text-primary size-4" /> My children
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {children.map((c) => (
                <div key={c.id} className={cn("rounded-2xl p-5 text-white", c.tone)}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-display text-base font-extrabold">{c.name}</p>
                      <p className="text-white/70 text-xs">{c.course}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className="bg-white/15 text-white border-0 font-semibold">
                        GPA {c.gpa}
                      </Badge>
                      <Badge className="bg-white/15 text-white border-0 font-semibold">
                        {c.attendance}%
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <Progress value={c.pct} className="bg-white/20 h-1.5 flex-1 [&>div]:bg-white" />
                    <span className="text-xs font-bold">{c.pct}%</span>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-white/80 text-xs font-semibold">
                      Next: {c.due} · {c.dueDate}
                    </p>
                    <Button
                      asChild
                      size="sm"
                      className="bg-white/15 text-white font-semibold hover:bg-white/25"
                    >
                      <Link to="/app/parent/students/$studentId" params={{ studentId: c.id }}>
                        Full view <ArrowRight className="ml-1 size-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Receipt className="text-primary size-4" /> Billing summary
              </CardTitle>
            </CardHeader>
            <CardContent className="divide-y">
              {[
                {
                  t: "Ada — Term 3 instalment",
                  v: formatNaira(140000),
                  d: "Due Sep 1",
                  tone: "bg-warning/10 text-warning",
                },
                {
                  t: "Emeka — Term 2 instalment",
                  v: formatNaira(160000),
                  d: "Due Sep 15",
                  tone: "bg-warning/10 text-warning",
                },
                {
                  t: "Ada — laptop deposit refund",
                  v: formatNaira(50000),
                  d: "Credited Aug 30",
                  tone: "bg-success/10 text-success",
                },
              ].map((b) => (
                <div key={b.t} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <span className="text-sm flex-1 font-semibold">{b.t}</span>
                  <span className="text-xs font-semibold">{b.d}</span>
                  <Badge className={cn("border-0 font-semibold", b.tone)}>{b.v}</Badge>
                </div>
              ))}
              <div className="flex justify-end pt-3">
                <Button asChild variant="outline" size="sm" className="text-primary font-semibold">
                  <Link to="/app/parent/students/$studentId" params={{ studentId: "ada-okafor" }}>
                    Pay online
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <FileText className="text-primary size-4" /> Notices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notices.map((n) => (
                <div key={n.t} className="flex items-start gap-3 rounded-xl border p-3">
                  <span
                    className={cn(
                      "mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg",
                      n.tone,
                    )}
                  >
                    <n.icon className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{n.t}</p>
                    <p className="text-muted-foreground text-xs">{n.d}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <CalendarDays className="text-warning size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Up next</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Parent–teacher meetings run Sep 5–9. Ada's mentor requested a check-in — slots close
                Aug 25.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
