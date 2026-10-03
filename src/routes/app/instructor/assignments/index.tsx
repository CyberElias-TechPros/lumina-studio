"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  FileCheck2,
  FileText,
  Filter,
  Hourglass,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { PublishAssignmentDialog } from "@/components/app/publish-assignment-dialog";
import { useInstructorAssignments } from "@/lib/query/instructor";
import type { InstructorSubmission } from "@/data/learning";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/instructor/assignments/")({
  head: () => ({
    meta: [
      { title: "Assignment Center — CEA-OS" },
      { name: "description", content: "Review, grade and return submissions across your courses." },
    ],
  }),
  component: AssignmentCenter,
});

function AssignmentCenter() {
  const submissionsQuery = useInstructorAssignments();
  const submissions = submissionsQuery.data?.pages.flatMap((p) => p.items) ?? [];
  const pending = submissions.filter((s) => s.status === "pending");
  const graded = submissions.filter((s) => s.status === "graded");
  const late = submissions.filter((s) => s.late);

  return (
    <AppShell
      roleKey="instructor"
      title="Assignment center"
      subtitle="Publish work, track submissions and grade across your courses"
      actions={
        <>
          <PublishAssignmentDialog />
          <Badge className="bg-warning/10 text-warning border-0 font-semibold">
            {pending.length} to grade
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            {submissions.length} in
          </Badge>
        </>
      }
    >
      <QueryState<InstructorSubmission[]>
        query={submissionsQuery}
        error={{ title: "Submissions unavailable" }}
      >
        {(rows) => (
          <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  label: "Submitted",
                  value: String(rows.length),
                  delta: "across your courses",
                  icon: FileCheck2,
                  tone: "bg-primary/10 text-primary",
                },
                {
                  label: "Pending grade",
                  value: String(pending.length),
                  delta: "awaiting your grade",
                  icon: Hourglass,
                  tone: "bg-warning/10 text-warning",
                },
                {
                  label: "Graded",
                  value: String(graded.length),
                  delta: "returned to students",
                  icon: CheckCircle2,
                  tone: "bg-success/10 text-success",
                },
                {
                  label: "Late",
                  value: String(late.length),
                  delta: "after the deadline",
                  icon: Clock,
                  tone: "bg-error/10 text-error",
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
                    <Users className="text-primary size-4" /> Submissions
                  </p>
                  <Button variant="outline" size="sm" className="font-semibold">
                    <Filter className="mr-1.5 size-3.5" /> Filter
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] text-sm">
                    <thead>
                      <tr className="text-muted-foreground border-b text-left text-[11px] font-bold tracking-wide uppercase">
                        <th className="px-4 py-3">Student</th>
                        <th className="py-3 pr-4">Submitted</th>
                        <th className="py-3 pr-4">File</th>
                        <th className="py-3 pr-4">Status</th>
                        <th className="py-3 pr-4">Score</th>
                        <th className="py-3 pr-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {rows.map((s) => (
                        <tr key={s.id} className="hover:bg-muted/40 transition-colors">
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-2.5">
                              <span className="bg-gradient-brand text-primary-foreground font-display grid size-8 shrink-0 place-items-center rounded-full text-[10px] font-bold">
                                {s.student
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                              <div>
                                <p className="text-xs font-bold">{s.student}</p>
                                {s.late && <p className="text-error text-[10px] font-bold">LATE</p>}
                              </div>
                            </div>
                          </td>
                          <td className="text-muted-foreground py-3.5 pr-4 text-xs font-semibold">
                            {s.submitted}
                          </td>
                          <td className="py-3.5 pr-4">
                            <p className="flex items-center gap-1.5 text-xs font-semibold">
                              <FileText className="text-muted-foreground size-3.5" /> {s.file} ·{" "}
                              {s.size}
                            </p>
                          </td>
                          <td className="py-3.5 pr-4">
                            <Badge
                              className={cn(
                                "border-0 font-semibold",
                                s.status === "graded"
                                  ? "bg-success/10 text-success"
                                  : "bg-warning/10 text-warning",
                              )}
                            >
                              {s.status}
                            </Badge>
                          </td>
                          <td className="py-3.5 pr-4">
                            {s.score !== undefined ? (
                              <span className="font-display font-extrabold">{s.score}%</span>
                            ) : (
                              <span className="text-muted-foreground text-xs font-semibold">—</span>
                            )}
                          </td>
                          <td className="py-3.5 pr-4 text-right">
                            <Button
                              asChild
                              size="sm"
                              variant={s.status === "graded" ? "outline" : "default"}
                              className={cn(s.status === "pending" && "bg-gradient-brand border-0")}
                            >
                              <Link
                                to="/app/instructor/assignments/$submissionId/grade"
                                params={{ submissionId: s.id }}
                              >
                                {s.status === "graded" ? "Review" : "Grade"}{" "}
                                <ArrowRight className="ml-1 size-3.5" />
                              </Link>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </QueryState>
    </AppShell>
  );
}
