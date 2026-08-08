import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useInsClasses } from "@/lib/query/instructorExtras";
import type { InsClass } from "@/lib/api/instructorExtras";

export const Route = createFileRoute("/app/instructor/classes")({
  head: () => ({
    meta: [
      { title: "Class Schedule — CEA-OS" },
      { name: "description", content: "Upcoming classes, times and locations." },
    ],
  }),
  component: InstructorClasses,
});

function InstructorClasses() {
  const classes = useInsClasses();

  return (
    <AppShell
      roleKey="instructor"
      title="Class schedule"
      subtitle="Your upcoming sessions, rooms and student counts"
      actions={
        <Button asChild variant="outline" size="sm" className="font-semibold">
          <Link to="/app/instructor">
            <ArrowLeft className="size-4" /> Instructor hub
          </Link>
        </Button>
      }
    >
      <QueryState<InsClass[]> query={classes} empty={{ title: "No classes scheduled" }}>
        {(items) => (
          <Card className="bg-card shadow-soft border overflow-hidden">
            <div className="divide-y">
              {items.map((c) => (
                <div key={c.id} className="p-4 flex flex-wrap items-center gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-sm">{c.title}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="size-3.5" /> {c.timeLabel}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3.5" /> {c.place}
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
