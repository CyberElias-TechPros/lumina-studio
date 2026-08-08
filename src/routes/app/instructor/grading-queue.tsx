import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, FileText, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useInsQueue } from "@/lib/query/instructorExtras";
import type { InsQueueItem } from "@/lib/api/instructorExtras";

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
  const queue = useInsQueue();

  return (
    <AppShell
      roleKey="instructor"
      title="Grading queue"
      subtitle="Submissions awaiting your review"
      actions={
        <Button asChild variant="outline" size="sm" className="font-semibold">
          <Link to="/app/instructor">
            <ArrowLeft className="size-4" /> Instructor hub
          </Link>
        </Button>
      }
    >
      <QueryState<InsQueueItem[]> query={queue} empty={{ title: "Queue is clear" }}>
        {(items) => (
          <Card className="bg-card shadow-soft border overflow-hidden">
            <div className="divide-y">
              {items.map((q) => (
                <div key={q.id} className="p-4 flex flex-wrap items-center gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-sm">{q.item}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <GraduationCap className="size-3.5" /> {q.student}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="size-3.5" /> {q.course}
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarDays className="size-3.5" /> {q.submitted} · due {q.due}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </QueryState>
    </AppShell>
  );
}
