"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, Headphones, MonitorCheck, Video, Wifi } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useItSessions, useItSessionItems } from "@/lib/query/it";
import type { ItSession } from "@/lib/api/it";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/it/remote-support")({
  head: () => ({
    meta: [
      { title: "Remote Support — CEA-OS" },
      { name: "description", content: "Start secure remote sessions." },
    ],
  }),
  component: ItRemoteSupport,
});

const statusTone: Record<string, string> = {
  live: "bg-success/10 text-success",
  upcoming: "bg-primary/10 text-primary",
  done: "bg-learning/10 text-learning",
};

function ItRemoteSupport() {
  const query = useItSessions();
  const sessions = useItSessionItems();

  const live = sessions.filter((s) => s.status === "live").length;
  const upcoming = sessions.filter((s) => s.status === "upcoming").length;
  const done = sessions.filter((s) => s.status === "done").length;

  return (
    <AppShell
      roleKey="it"
      title="Remote support"
      subtitle={
        sessions.length > 0
          ? `${sessions.length} sessions today · ${live} live`
          : "Loading sessions…"
      }
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {live} live session{live === 1 ? "" : "s"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/it-support">
              <ArrowLeft className="size-4" /> IT Support portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Today",
            value: sessions.length > 0 ? String(sessions.length) : "—",
            delta: `${live} live`,
            icon: Headphones,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Live now",
            value: live > 0 ? String(live) : "0",
            delta: "in progress",
            icon: MonitorCheck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Upcoming",
            value: upcoming > 0 ? String(upcoming) : "—",
            delta: "scheduled",
            icon: Video,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Completed",
            value: done > 0 ? String(done) : "—",
            delta: "resolved",
            icon: Wifi,
            tone: "bg-warning/10 text-warning",
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

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <MonitorCheck className="text-primary size-4" /> Sessions
          </CardTitle>
          <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
            Start session
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<ItSession[]>
            query={query}
            error={{ title: "Sessions unavailable" }}
            empty={{
              title: "No sessions yet",
              description: "Remote support sessions will show here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) =>
              rows.map((s) => (
                <div
                  key={s.id}
                  className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">{s.name}</p>
                    <p className="text-muted-foreground text-xs">{s.detail}</p>
                  </div>
                  <Badge
                    className={cn(
                      "border-0 font-semibold capitalize",
                      statusTone[s.status] ?? "bg-muted/20 text-muted-foreground",
                    )}
                  >
                    {s.status}
                  </Badge>
                  <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                    Join
                  </Button>
                </div>
              ))
            }
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
