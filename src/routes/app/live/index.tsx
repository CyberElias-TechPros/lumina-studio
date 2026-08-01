import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Radio, Users } from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { useLiveClasses, useLiveClassesItems } from "@/lib/query/live";
import type { LiveClassSession } from "@/lib/api/live";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/live/")({
  head: () => ({
    meta: [
      { title: "Live Classes — CEA-OS" },
      { name: "description", content: "Join live classes: video, chat, polls and whiteboard." },
    ],
  }),
  component: LiveClasses,
});

const STATUS_STYLES: Record<LiveClassSession["status"], string> = {
  live: "bg-success/10 text-success border-0 font-semibold",
  scheduled: "bg-primary/10 text-primary border-0 font-semibold",
  ended: "bg-muted text-muted-foreground border-0 font-semibold",
};

function LiveClasses() {
  const query = useLiveClasses();
  const items = useLiveClassesItems();

  return (
    <AppShell
      roleKey="student"
      title="Live classes"
      subtitle="Weekly sessions with instructors — video, chat, polls and whiteboard"
      actions={
        <Badge className="bg-success/10 text-success border-0 font-semibold">
          <Radio className="size-3.5" /> {items.filter((s) => s.status === "live").length} live now
        </Badge>
      }
    >
      <QueryState
        query={query}
        isEmpty={(data) => (Array.isArray(data) ? data.length === 0 : false)}
        loading={
          <div className="text-muted-foreground py-16 text-center text-sm">Loading classes…</div>
        }
        empty={{
          title: "No live classes yet",
          description:
            "Sessions will show up here once the schedule is published. Check back soon.",
          icon: <CalendarDays className="size-8" />,
        }}
      >
        {() => (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {items.map((session) => (
              <Card key={session.id} className="bg-card shadow-soft border">
                <CardHeader className="gap-1">
                  <div className="flex items-center justify-between gap-2">
                    <Badge className={STATUS_STYLES[session.status]}>
                      {session.status === "live"
                        ? "Live now"
                        : session.status === "scheduled"
                          ? "Scheduled"
                          : "Ended"}
                    </Badge>
                    <span className="text-muted-foreground flex items-center gap-1.5 text-[11px] font-semibold">
                      <CalendarDays className="size-3.5" /> {session.startsAt}
                    </span>
                  </div>
                  <CardTitle className="font-display text-base font-extrabold">
                    {session.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-muted-foreground">{session.instructor}</span>
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Users className="size-3.5" /> {session.cohort}
                    </span>
                  </div>
                  <Link to="/app/live/$classId" params={{ classId: session.id }} className="block">
                    <Button
                      className={cn(
                        "w-full",
                        session.status !== "live" && "bg-ink text-ink-foreground hover:bg-ink/90",
                      )}
                      size="sm"
                    >
                      {session.status === "live" ? "Join now" : "Open class"}
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </QueryState>
    </AppShell>
  );
}
