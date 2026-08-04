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
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useParentStudents } from "@/lib/query/parent";
import { formatNaira } from "@/data/site";
import type { Paginated } from "@/lib/api/types";
import type { ParentStudent } from "@/lib/api/parent";
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
  const students = useParentStudents();
  const kids = students.data?.items ?? [];
  const loaded = students.data !== undefined;
  const avgGpa = kids.length
    ? (kids.reduce((s, c) => s + Number(c.gpa), 0) / kids.length).toFixed(1)
    : "0.0";
  const totalDue = kids.reduce((s, c) => s + c.due, 0);
  const dueCount = kids.reduce((s, c) => s + c.dueCount, 0);
  const avgPct = kids.length ? Math.round(kids.reduce((s, c) => s + c.pct, 0) / kids.length) : 0;
  const goodStanding = kids.every((c) => c.dueCount === 0);

  return (
    <AppShell
      roleKey="parent"
      title="Parent dashboard"
      subtitle={
        loaded
          ? `${kids.length} linked learner${kids.length === 1 ? "" : "s"}`
          : "Loading learners…"
      }
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {loaded
              ? goodStanding
                ? "Accounts in good standing"
                : "Payments pending"
              : "Checking…"}
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
            value: loaded ? String(kids.length) : "…",
            delta: kids.length === 1 ? "linked learner" : "linked learners",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Avg. GPA",
            value: loaded ? avgGpa : "…",
            delta: "across children",
            icon: BookOpen,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Outstanding bills",
            value: loaded ? formatNaira(totalDue) : "…",
            delta: dueCount === 1 ? "1 instalment due" : `${dueCount} instalments due`,
            icon: Wallet,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Avg. progress",
            value: loaded ? `${avgPct}%` : "…",
            delta: "across courses",
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
              <QueryState<Paginated<ParentStudent>>
                query={students}
                error={{ title: "Children unavailable" }}
                empty={{
                  title: "No linked learners",
                  description: "Contact the school to link a learner to your account.",
                }}
                isEmpty={(d) => d.items.length === 0}
              >
                {(d) => (
                  <>
                    {d.items.map((c, i) => (
                      <div
                        key={c.studentId}
                        className={cn(
                          "rounded-2xl p-5 text-white",
                          i % 2 ? "bg-gradient-services" : "bg-gradient-learning",
                        )}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="font-display text-base font-extrabold">{c.name}</p>
                            <p className="text-white/70 text-xs">{c.courseDetail || c.course}</p>
                          </div>
                          <div className="flex gap-2">
                            <Badge className="bg-white/15 text-white border-0 font-semibold">
                              GPA {c.gpa}
                            </Badge>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center gap-3">
                          <Progress
                            value={c.pct}
                            className="bg-white/20 h-1.5 flex-1 [&>div]:bg-white"
                          />
                          <span className="text-xs font-bold">{c.pct}%</span>
                        </div>
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                          <p className="text-white/80 text-xs font-semibold">
                            {c.dueCount > 0
                              ? `${formatNaira(c.due)} outstanding · ${c.dueCount} ${
                                  c.dueCount === 1 ? "instalment" : "instalments"
                                }`
                              : "No outstanding balance"}
                          </p>
                          <Button
                            asChild
                            size="sm"
                            className="bg-white/15 text-white font-semibold hover:bg-white/25"
                          >
                            <Link
                              to="/app/parent/students/$studentId"
                              params={{ studentId: c.studentId }}
                            >
                              Full view <ArrowRight className="ml-1 size-3.5" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </QueryState>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Receipt className="text-primary size-4" /> Billing summary
              </CardTitle>
            </CardHeader>
            <CardContent className="divide-y">
              {kids.length === 0 && !loaded ? (
                <p className="text-muted-foreground py-3 text-xs">Loading bills…</p>
              ) : kids.length === 0 ? (
                <p className="text-muted-foreground py-3 text-xs">No outstanding bills.</p>
              ) : (
                kids.map((c) => (
                  <div
                    key={c.studentId}
                    className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <span className="text-sm flex-1 font-semibold">{c.name}</span>
                    <span className="text-xs font-semibold">
                      {c.dueCount > 0
                        ? `${c.dueCount} ${c.dueCount === 1 ? "instalment" : "instalments"} due`
                        : "All settled"}
                    </span>
                    <Badge
                      className={cn(
                        "border-0 font-semibold",
                        c.due > 0 ? "bg-warning/10 text-warning" : "bg-success/10 text-success",
                      )}
                    >
                      {formatNaira(c.due)}
                    </Badge>
                  </div>
                ))
              )}
              {kids.length > 0 && (
                <div className="flex justify-end pt-3">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="text-primary font-semibold"
                  >
                    <Link
                      to="/app/parent/students/$studentId"
                      params={{ studentId: kids[0]?.studentId ?? "" }}
                    >
                      Pay online
                    </Link>
                  </Button>
                </div>
              )}
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
