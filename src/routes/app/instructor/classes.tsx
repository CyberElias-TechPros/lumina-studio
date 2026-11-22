"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, ArrowRight, CalendarDays, Radio, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { flattenPages } from "@/lib/query/hooks";
import { useLiveClasses } from "@/lib/query/live";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/instructor/classes")({
  head: () => ({
    meta: [
      { title: "Class Schedule — CEA-OS" },
      { name: "description", content: "Upcoming classes, times and live sessions." },
    ],
  }),
  component: InstructorClasses,
});

function statusTone(status: string) {
  if (status === "live") return "bg-destructive/10 text-destructive";
  if (status === "scheduled") return "bg-primary/10 text-primary";
  return "bg-muted text-muted-foreground";
}

function InstructorClasses() {
  const classesQuery = useLiveClasses();
  const items = flattenPages(classesQuery.data?.pages);

  return (
    <AppShell
      roleKey="instructor"
      title="Class schedule"
      subtitle="Your live and scheduled cohort sessions"
      actions={
        <>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/instructor">
              <ArrowLeft className="size-4" /> Instructor hub
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/app/live">
              <Radio className="size-4" /> Manage live classes
            </Link>
          </Button>
        </>
      }
    >
      <QueryState
        query={classesQuery}
        error={{ title: "Failed to load classes" }}
        empty={{
          title: "No classes scheduled",
          description: "Schedule a live class session from the Live Classes workspace.",
        }}
        isEmpty={() => items.length === 0}
      >
        {() => (
          <Card className="bg-card shadow-soft border overflow-hidden">
            <div className="divide-y">
              {items.map((c) => (
                <div key={c.id} className="p-4 flex flex-wrap items-center gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-bold text-sm">{c.title}</p>
                      <Badge
                        className={cn("border-0 font-semibold capitalize", statusTone(c.status))}
                      >
                        {c.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="size-3.5" /> {c.startsAt}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="size-3.5" /> {c.cohort} · {c.instructor}
                      </span>
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm" className="font-semibold">
                    <Link to="/app/live/$classId" params={{ classId: c.id }}>
                      Open room <ArrowRight className="ml-1 size-3.5" />
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
