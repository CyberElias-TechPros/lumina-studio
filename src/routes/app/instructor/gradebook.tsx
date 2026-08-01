import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  Download,
  Filter,
  GraduationCap,
  MessageSquareWarning,
  Scale,
  Settings2,
  ShieldAlert,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useInstructorGradebook } from "@/lib/query/instructor";
import type { InstructorGradebookRow } from "@/data/learning";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/instructor/gradebook")({
  head: () => ({
    meta: [
      { title: "Gradebook Management — CEA-OS" },
      { name: "description", content: "Inline grades, weight overrides and dispute resolution." },
    ],
  }),
  component: GradebookManagement,
});

function GradebookManagement() {
  const rowsQuery = useInstructorGradebook();
  const rows = rowsQuery.data?.pages.flatMap((p) => p.items) ?? [];

  const avg = rows.length
    ? (rows.reduce((s, r) => s + r.total, 0) / rows.length).toFixed(1)
    : "0.0";
  const atRisk = rows.filter((r) => r.atRisk).length;

  return (
    <AppShell
      roleKey="instructor"
      title="Gradebook management"
      subtitle="Backend & APIs · Cohort 15 · mid-term weights locked"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Class avg {avg}%
          </Badge>
          <Badge className="bg-error/10 text-error border-0 font-semibold">{atRisk} at risk</Badge>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Class average",
            value: `${avg}%`,
            delta: "+3.2% vs last term",
            icon: GraduationCap,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "At-risk learners",
            value: String(atRisk),
            delta: "flag for mentor outreach",
            icon: ShieldAlert,
            tone: "bg-error/10 text-error",
          },
          {
            label: "Open disputes",
            value: "2",
            delta: "1 awaiting evidence",
            icon: Scale,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Overrides",
            value: "3",
            delta: "all audited",
            icon: Settings2,
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

      <Card className="bg-card shadow-soft mt-5 border">
        <CardContent className="p-0">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b p-4">
            <p className="font-display flex items-center gap-2 text-sm font-extrabold">
              <Scale className="text-primary size-4" /> Weighted scores · click to edit inline
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="font-semibold">
                <Filter className="mr-1.5 size-3.5" /> Weights
              </Button>
              <Button variant="outline" size="sm" className="font-semibold">
                <Download className="mr-1.5 size-3.5" /> Export
              </Button>
            </div>
          </div>
          <QueryState<InstructorGradebookRow[]>
            query={rowsQuery}
            error={{ title: "Gradebook unavailable" }}
          >
            {(rows) => (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-sm">
                  <thead>
                    <tr className="text-muted-foreground border-b text-left text-[11px] font-bold tracking-wide uppercase">
                      <th className="px-4 py-3">Student</th>
                      <th className="py-3 pr-4">Quiz 10%</th>
                      <th className="py-3 pr-4">Lab 15%</th>
                      <th className="py-3 pr-4">Assignment 25%</th>
                      <th className="py-3 pr-4">Mid-term 20%</th>
                      <th className="py-3 pr-4">Final 30%</th>
                      <th className="py-3 pr-4">Total</th>
                      <th className="py-3 pr-4">Grade</th>
                      <th className="py-3 pr-4 text-right">Flag</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {rows.map((r) => (
                      <tr
                        key={r.student}
                        className={cn(
                          "transition-colors hover:bg-muted/40",
                          r.atRisk && "bg-error/5",
                        )}
                      >
                        <td className="px-4 py-3">
                          <p className="text-xs font-bold">{r.student}</p>
                        </td>
                        <td className="py-3 pr-4">
                          <input
                            defaultValue={r.quiz}
                            aria-label={`${r.student} quiz score`}
                            className="bg-muted w-14 rounded-lg border-0 px-2 py-1.5 text-xs font-bold text-center outline-none"
                          />
                        </td>
                        <td className="py-3 pr-4">
                          <input
                            defaultValue={r.lab}
                            aria-label={`${r.student} lab score`}
                            className="bg-muted w-14 rounded-lg border-0 px-2 py-1.5 text-xs font-bold text-center outline-none"
                          />
                        </td>
                        <td className="py-3 pr-4">
                          <input
                            defaultValue={r.assignment}
                            aria-label={`${r.student} assignment score`}
                            className="bg-muted w-14 rounded-lg border-0 px-2 py-1.5 text-xs font-bold text-center outline-none"
                          />
                        </td>
                        <td className="py-3 pr-4">
                          <input
                            defaultValue={r.midterm}
                            aria-label={`${r.student} midterm score`}
                            className="bg-muted w-14 rounded-lg border-0 px-2 py-1.5 text-xs font-bold text-center outline-none"
                          />
                        </td>
                        <td className="text-muted-foreground py-3 pr-4 text-xs font-semibold">—</td>
                        <td className="py-3 pr-4">
                          <span className="font-display font-extrabold">{r.total}%</span>
                        </td>
                        <td className="py-3 pr-4">
                          <Badge
                            className={cn(
                              "w-10 justify-center border-0 font-bold",
                              r.letter.startsWith("A")
                                ? "bg-success/10 text-success"
                                : r.letter.startsWith("B")
                                  ? "bg-primary/10 text-primary"
                                  : "bg-warning/10 text-warning",
                            )}
                          >
                            {r.letter}
                          </Badge>
                        </td>
                        <td className="py-3 pr-4 text-right">
                          {r.atRisk && (
                            <Badge className="bg-error/10 text-error border-0 font-semibold">
                              <AlertTriangle className="mr-1 size-3" /> Risk
                            </Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </QueryState>
          <div className="flex flex-wrap items-center gap-3 border-t p-4 text-xs">
            <MessageSquareWarning className="text-warning size-4 shrink-0" />
            <p className="text-muted-foreground flex-1 font-semibold">
              Inline edits are versioned and audited. Disputes: Amara (Q2 marking) and Chidi (late
              penalty waiver) — resolve before Friday's grade lock.
            </p>
            <Button size="sm" className="bg-gradient-brand border-0">
              Lock grades
            </Button>
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}
