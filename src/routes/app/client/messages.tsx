"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { useState } from "react";
import { ArrowLeft, Inbox, Lock, MessageSquare, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  const [selectedThread, setSelectedThread] = useState<CliThread | null>(null);

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
                    <Button
                      variant="outline"
                      size="sm"
                      className="shrink-0 font-semibold"
                      onClick={() => setSelectedThread(m)}
                    >
                      Open
                    </Button>
                  </div>
                ))}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
      <Dialog
        open={selectedThread !== null}
        onOpenChange={(open) => !open && setSelectedThread(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedThread?.title ?? "Message thread"}</DialogTitle>
            <DialogDescription>Secure project-team message thread.</DialogDescription>
          </DialogHeader>
          {selectedThread && (
            <dl className="grid gap-3 rounded-xl border p-4 text-sm">
              <div>
                <dt className="text-muted-foreground text-xs font-bold uppercase">From</dt>
                <dd className="mt-1 font-semibold">{selectedThread.fromLabel}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs font-bold uppercase">Last activity</dt>
                <dd className="mt-1 font-semibold">{selectedThread.timeLabel}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs font-bold uppercase">Status</dt>
                <dd className="mt-1 font-semibold">{selectedThread.status}</dd>
              </div>
            </dl>
          )}
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
