import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  ClipboardList,
  FileCheck2,
  GraduationCap,
  Network,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/department-head")({
  head: () => ({
    meta: [
      { title: "Department Head — CEA-OS" },
      {
        name: "description",
        content: "Programme oversight, curriculum approvals and faculty reviews.",
      },
    ],
  }),
  component: DepartmentHeadPortal,
});

const approvals = [
  {
    t: "Cohort 16 curriculum changes",
    by: "Prof. Adaeze O.",
    when: "Due Aug 14",
    status: "In review",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "New elective — Edge AI",
    by: "Engr. Tunde B.",
    when: "Submitted Jul 29",
    status: "Pending",
    tone: "bg-warning/10 text-warning",
  },
  {
    t: "Exam question bank review",
    by: "Academic board",
    when: "Approved",
    status: "Approved",
    tone: "bg-success/10 text-success",
  },
];

function DepartmentHeadPortal() {
  return (
    <AppShell
      roleKey="instructor"
      title="Department head"
      subtitle="Software Engineering · 4 programmes · 23 staff"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Programmes on track
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            Next board: Aug 21
          </Badge>
          <Button asChild variant="outline" size="sm" className="ml-auto font-semibold">
            <Link to="/app/department/curriculum">Deep dive</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Programmes",
            value: "4",
            delta: "2 flagship",
            icon: GraduationCap,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Active learners",
            value: "412",
            delta: "+18% YoY",
            icon: Users,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Curriculum reviews",
            value: "6",
            delta: "3 pending",
            icon: BookOpenCheck,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Accreditation",
            value: "3 / 4",
            delta: "1 in process",
            icon: FileCheck2,
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
        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <ClipboardList className="text-primary size-4" /> Approval queue
            </CardTitle>
            <Button asChild variant="ghost" size="sm" className="text-primary font-semibold">
              <Link to="/app/instructor/courses/$courseId" params={{ courseId: "backend-apis" }}>
                Course builder <ArrowRight className="ml-1 size-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="divide-y">
            {approvals.map((a) => (
              <div
                key={a.t}
                className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
              >
                <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                  <FileCheck2 className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{a.t}</p>
                  <p className="text-muted-foreground text-xs">
                    {a.by} · {a.when}
                  </p>
                </div>
                <Badge className={cn("border-0 font-semibold", a.tone)}>{a.status}</Badge>
                <Button variant="outline" size="sm" className="shrink-0">
                  Review
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Network className="text-primary size-4" /> Programme health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { t: "Full-Stack Dev", v: "82% · healthy", tone: "bg-success/10 text-success" },
                { t: "Cloud & DevOps", v: "74% · healthy", tone: "bg-success/10 text-success" },
                { t: "Product & UI/UX", v: "68% · watch", tone: "bg-warning/10 text-warning" },
                { t: "Data & AI", v: "Launching Q4", tone: "bg-primary/10 text-primary" },
              ].map((x) => (
                <div key={x.t} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-sm font-semibold">{x.t}</span>
                  <Badge className={cn("border-0 font-semibold", x.tone)}>{x.v}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <CalendarDays className="text-primary size-4" /> This week
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { t: "Faculty meeting", v: "Tue 11:00", tone: "bg-primary/10 text-primary" },
                { t: "Accreditation visit", v: "Thu 09:00", tone: "bg-warning/10 text-warning" },
                { t: "Board sitting", v: "Fri 14:00", tone: "bg-learning/10 text-learning" },
              ].map((x) => (
                <div key={x.t} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-sm font-semibold">{x.t}</span>
                  <Badge className={cn("border-0 font-semibold", x.tone)}>{x.v}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <BookOpenCheck className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Board brief</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Two programmes exceed placement targets; the elective portfolio is the board's main
                agenda item.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
