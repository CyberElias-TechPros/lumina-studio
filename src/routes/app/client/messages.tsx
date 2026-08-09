import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Inbox, Lock, MessageSquare, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import type { CliThread } from "@/lib/query/clientEngagement";
import { useCliThreads } from "@/lib/query/clientEngagement";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/client/messages")({
  head: () => ({
    meta: [
      { title: "Messaging — CEA-OS" },
      { name: "description", content: "Messages with the project team." },
    ],
  }),
  component: ClientMessages,
});

function statusTone(s: string) {
  const l = s.toLowerCase();
  if (l.includes("closed")) return "bg-success/10 text-success";
  if (l.includes("open")) return "bg-warning/10 text-warning";
  if (l.includes("new")) return "bg-primary/10 text-primary";
  return "bg-muted-foreground/10 text-muted-foreground";
}

function ClientMessages() {
  const threadsQuery = useCliThreads();

  return (
    <AppShell
      roleKey="client"
      title="Messaging"
      subtitle="3 active projects · team responds < 4h"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Secure</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/client">
              <ArrowLeft className="size-4" /> Client portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Threads",
            value: "9",
            delta: "3 projects",
            icon: MessageSquare,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Unread",
            value: "1",
            delta: "needs reply",
            icon: Inbox,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Encrypted",
            value: "100%",
            delta: "E2EE",
            icon: Lock,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Avg. response",
            value: "3.2h",
            delta: "by team",
            icon: Send,
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

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <MessageSquare className="text-primary size-4" /> Threads
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<CliThread[]>
            query={threadsQuery}
            error={{ title: "Threads unavailable" }}
            empty={{
              title: "No messages",
              description: "Your messages will appear here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((m) => (
                  <div
                    key={m.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{m.title}</p>
                      <p className="text-muted-foreground text-xs">
                        {m.fromLabel} · {m.timeLabel}
                      </p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", statusTone(m.status))}>
                      {m.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      Open
                    </Button>
                  </div>
                ))}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
