import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Inbox, Lock, MessageSquare, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
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

const messages = [
  {
    m: "Landing page build — review needed",
    f: "Project manager · Simi",
    t: "Aug 2 · 16:20",
    s: "New",
    tone: "bg-primary/10 text-primary",
  },
  {
    m: "API docs draft for sign-off",
    f: "Tech lead · Dayo",
    t: "Jul 31 · 11:08",
    s: "Open",
    tone: "bg-warning/10 text-warning",
  },
  {
    m: "Weekly sync moved to Thursday",
    f: "Project manager · Simi",
    t: "Jul 28 · 09:45",
    s: "Closed",
    tone: "bg-success/10 text-success",
  },
];

function ClientMessages() {
  return (
    <AppShell
      roleKey="instructor"
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
          {messages.map((m) => (
            <div
              key={m.m + m.t}
              className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{m.m}</p>
                <p className="text-muted-foreground text-xs">
                  {m.f} · {m.t}
                </p>
              </div>
              <Badge className={cn("border-0 font-semibold", m.tone)}>{m.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Open
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
