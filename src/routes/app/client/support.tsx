import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Headset, Inbox, MessageSquare, Plus, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/client/support")({
  head: () => ({
    meta: [
      { title: "Support Tickets — CEA-OS" },
      { name: "description", content: "Create and track support tickets with SLA." },
    ],
  }),
  component: ClientSupport,
});

const tickets = [
  {
    t: "Can't access project repo",
    id: "TK-2214",
    d: "Aug 3 · 09:12",
    sla: "SLA: 4h",
    status: "Open",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Invoice PDF not loading",
    id: "TK-2198",
    d: "Jul 29 · 14:40",
    sla: "SLA: 24h",
    status: "In progress",
    tone: "bg-warning/10 text-warning",
  },
  {
    t: "Add team member to portal",
    id: "TK-2175",
    d: "Jul 22 · 11:05",
    sla: "SLA: 24h",
    status: "Resolved",
    tone: "bg-success/10 text-success",
  },
];

function ClientSupport() {
  return (
    <AppShell
      roleKey="instructor"
      title="Support tickets"
      subtitle="SLA 4h–24h · response time avg 2.1h"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">CSAT 4.9</Badge>
          <Button size="sm">
            <Plus className="size-4" /> New ticket
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Open",
            value: "1",
            delta: "TK-2214",
            icon: Inbox,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "In progress",
            value: "1",
            delta: "being worked",
            icon: Timer,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Resolved this month",
            value: "5",
            delta: "100% within SLA",
            icon: Headset,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Messages with team",
            value: "12",
            delta: "this week",
            icon: MessageSquare,
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
            <Headset className="text-primary size-4" /> Your tickets
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {tickets.map((t) => (
            <div key={t.id} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                <Headset className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{t.t}</p>
                <p className="text-muted-foreground text-xs">
                  {t.id} · {t.d} · {t.sla}
                </p>
              </div>
              <Badge className={cn("border-0 font-semibold", t.tone)}>{t.status}</Badge>
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
