"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowRight, CalendarDays, CheckCircle2, FileText, FolderOpen, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useAssignments } from "@/lib/query/assignments";
import type { StudentAssignment } from "@/data/learning";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/assignments/")({
  head: () => ({
    meta: [
      { title: "Assignments — CEA-OS" },
      { name: "description", content: "All your assignments, deadlines, submissions and grades." },
    ],
  }),
  component: AssignmentsCenter,
});

const statusTone: Record<string, string> = {
  pending: "bg-warning/10 text-warning",
  draft: "bg-muted-foreground/10 text-muted-foreground",
  submitted: "bg-primary/10 text-primary",
  graded: "bg-success/10 text-success",
};

const statusLabel: Record<string, string> = {
  pending: "Not started",
  draft: "Draft saved",
  submitted: "Submitted",
  graded: "Graded",
};

function AssignmentsCenter() {
  const assignmentsQuery = useAssignments();
  const items = assignmentsQuery.data?.pages.flatMap((p) => p.items) ?? [];

  const graded = items.filter((a) => a.status === "graded").length;
  const submitted = items.filter((a) => a.status === "submitted").length;
  const pending = items.filter((a) => a.status === "pending" || a.status === "draft").length;

  return (
    <AppShell
      roleKey="assignments"
      title="Assignments"
      subtitle="Published work, submission status and returned scores"
      actions={
        <>
          <Badge className="bg-warning/10 text-warning border-0 font-semibold">
            {pending} open
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            {submitted + graded} of {items.length} submitted
          </Badge>
        </>
      }
    >
      <QueryState<StudentAssignment[]>
        query={assignmentsQuery}
        error={{ title: "Assignments unavailable" }}
      >
        {(rows) => (
          <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  label: "Loaded",
                  value: String(rows.length),
                  delta: "published to your account",
                  icon: FileText,
                  tone: "bg-primary/10 text-primary",
                },
                {
                  label: "Open",
                  value: String(pending),
                  delta: "not yet submitted",
                  icon: FolderOpen,
                  tone: "bg-warning/10 text-warning",
                },
                {
                  label: "Submitted",
                  value: String(submitted),
                  delta: "awaiting instructor review",
                  icon: Send,
                  tone: "bg-learning/10 text-learning",
                },
                {
                  label: "Graded",
                  value: String(graded),
                  delta: "score returned by instructor",
                  icon: CheckCircle2,
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

            <div className="mt-5" data-testid="assignments-list">
              <Card className="bg-card shadow-soft border">
                <CardContent className="divide-y p-6">
                  {rows.map((a) => (
                    <Link
                      key={a.id}
                      to="/app/assignments/$assignmentId"
                      params={{ assignmentId: a.id }}
                      className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                    >
                      <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                        <FileText className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold">{a.title}</p>
                        <p className="text-muted-foreground text-xs">
                          {a.course}
                          {a.weight > 0 ? ` · weight ${a.weight}%` : ""}
                        </p>
                      </div>
                      {a.status === "graded" && a.score !== undefined ? (
                        <Badge className="bg-primary/10 text-primary justify-center border-0 font-bold">
                          {a.score} / {a.max}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
                          <CalendarDays className="size-3.5" /> {a.due}
                        </span>
                      )}
                      <Badge
                        className={cn(
                          "border-0 font-semibold",
                          statusTone[a.status] ?? "bg-muted text-muted-foreground",
                        )}
                      >
                        {statusLabel[a.status] ?? a.status}
                      </Badge>
                      <span className="text-primary flex items-center text-xs font-semibold">
                        Open <ArrowRight className="ml-1 size-3.5" />
                      </span>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </QueryState>
      <p className="text-muted-foreground mt-4 text-sm">Counts reflect the loaded assignments.</p>
      {assignmentsQuery.hasNextPage && (
        <Button
          className="mt-3"
          onClick={() => void assignmentsQuery.fetchNextPage()}
          disabled={assignmentsQuery.isFetchingNextPage}
        >
          {assignmentsQuery.isFetchingNextPage ? "Loading…" : "Load more assignments"}
        </Button>
      )}
    </AppShell>
  );
}
