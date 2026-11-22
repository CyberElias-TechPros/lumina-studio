"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, ArrowRight, CalendarDays, FileText, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { flattenPages } from "@/lib/query/hooks";
import { useInstructorAssignments } from "@/lib/query/instructor";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/instructor/grading-queue")({
  head: () => ({
    meta: [
      { title: "Grading Queue — CEA-OS" },
      { name: "description", content: "Submissions awaiting review and grading." },
    ],
  }),
  component: InstructorGradingQueue,
});

function InstructorGradingQueue() {
  const assignmentsQuery = useInstructorAssignments();
  const allItems = flattenPages(assignmentsQuery.data?.pages);
  const items = allItems.filter((s) => s.status !== "graded");

  return (
    <AppShell
      roleKey="instructor"
      title="Grading queue"
      subtitle={`${items.length} submission${items.length === 1 ? "" : "s"} awaiting your review`}
      actions={
        <>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/instructor">
              <ArrowLeft className="size-4" /> Instructor hub
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/app/instructor/assignments">All assignments</Link>
          </Button>
        </>
      }
    >
      <QueryState
        query={assignmentsQuery}
        error={{ title: "Failed to load grading queue" }}
        empty={{
          title: "Queue is clear",
          description: "Every submitted assignment has already been graded.",
        }}
        isEmpty={() => items.length === 0}
      >
        {() => (
          <Card className="bg-card shadow-soft border overflow-hidden">
            <div className="divide-y">
              {items.map((q) => (
                <div key={q.id} className="p-4 flex flex-wrap items-center gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-bold text-sm">{q.title}</p>
                      <Badge
                        className={cn(
                          "border-0 font-semibold capitalize",
                          q.late
                            ? "bg-destructive/10 text-destructive"
                            : "bg-warning/10 text-warning",
                        )}
                      >
                        {q.late ? "Late" : q.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <GraduationCap className="size-3.5" /> {q.student}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="size-3.5" /> {q.file || "Text submission"}
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarDays className="size-3.5" /> {q.submitted}
                      </span>
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm" className="font-semibold">
                    <Link
                      to="/app/instructor/assignments/$assignmentId"
                      params={{ assignmentId: q.id }}
                    >
                      Grade now <ArrowRight className="ml-1 size-3.5" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        )}
      </QueryState>
    </AppShell>
  );
}
