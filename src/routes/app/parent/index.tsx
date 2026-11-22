"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
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
import { useCalendarItems } from "@/lib/query/calendar";
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

function ParentDashboard() {
  const students = useParentStudents();
  const calendarItems = useCalendarItems().slice(0, 4);
  const kids = students.data?.items ?? [];
  const loaded = students.data !== undefined;
  const totalDue = kids.reduce((s, c) => s + c.due, 0);
  const dueCount = kids.reduce((s, c) => s + c.dueCount, 0);
  const enrolledKids = kids.filter((c) => c.course);
  const avgPct = enrolledKids.length
    ? Math.round(enrolledKids.reduce((s, c) => s + c.pct, 0) / enrolledKids.length)
    : null;
  const gpas = kids
    .map((c) => (typeof c.gpa === "number" ? c.gpa : Number(c.gpa)))
    .filter((n) => Number.isFinite(n) && n > 0);
  const avgGpa = gpas.length ? (gpas.reduce((a, b) => a + b, 0) / gpas.length).toFixed(2) : null;
  const hasBills = kids.some((c) => c.dueCount > 0);

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
              ? kids.length === 0
                ? "No verified learners linked"
                : hasBills
                  ? `${dueCount} ${dueCount === 1 ? "instalment" : "instalments"} due`
                  : "All accounts current"
              : students.isError
                ? "Learners unavailable"
                : "Checking…"}
          </Badge>
          <Button asChild size="sm">
            <Link to="/app/messages">
              <MessageSquare className="size-4" /> Contact school
            </Link>
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
            value: loaded ? (avgGpa ?? "—") : "…",
            delta: avgGpa ? `across ${gpas.length} learner(s)` : "posted after term exams",
            icon: BookOpen,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Outstanding bills",
            value: loaded ? (kids.length ? formatNaira(totalDue) : "—") : "…",
            delta: dueCount === 1 ? "1 instalment due" : `${dueCount} instalments due`,
            icon: Wallet,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Avg. progress",
            value: loaded ? (avgPct === null ? "—" : `${avgPct}%`) : "…",
            delta: "across linked learners with enrollment records",
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
                  description:
                    "Contact the academy via Messages to link your learner's enrollment to your parent account.",
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
                              GPA {c.gpa ?? "pending"}
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
                              : "All tuition invoices settled"}
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
                <p className="text-muted-foreground py-3 text-xs">
                  Link a learner account to review tuition invoices and payment receipts.
                </p>
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
                        : "Settled"}
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
                      to="/app/parent/students/$studentId/finance"
                      params={{ studentId: kids[0]?.studentId ?? "" }}
                    >
                      View billing
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card shadow-soft border self-start">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <CalendarDays className="text-primary size-4" /> Academy schedule
            </CardTitle>
            <Button asChild variant="ghost" size="sm" className="text-primary font-semibold">
              <Link to="/app/calendar">Calendar</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {calendarItems.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No upcoming events posted yet. Message the academy team directly if you need a
                conference slot.
              </p>
            ) : (
              calendarItems.map((ev) => (
                <div key={ev.id} className="rounded-xl border p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold">{ev.title}</p>
                    <Badge variant="secondary" className="text-xs font-semibold capitalize">
                      {ev.kind}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {ev.day} {ev.date} · {ev.time} · {ev.location}
                  </p>
                </div>
              ))
            )}
            <Button asChild variant="outline" size="sm" className="w-full font-semibold">
              <Link to="/app/messages">
                <MessageSquare className="size-3.5" /> Message instructors &amp; admissions
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
