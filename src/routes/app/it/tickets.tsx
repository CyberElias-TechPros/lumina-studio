import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock3, LifeBuoy, MonitorCheck, Ticket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/it/tickets")({
  head: () => ({
    meta: [
      { title: "Ticket Hub — CEA-OS" },
      { name: "description", content: "Support ticket queue with SLA timers." },
    ],
  }),
  component: ItTickets,
});

const tickets = [
  {
    t: "Projector fails in Lab 2",
    p: "P1 · High",
    d: "SLA 2h · 1h elapsed",
    s: "Assigned",
    tone: "bg-destructive/10 text-destructive",
  },
  {
    t: "New starter laptop setup",
    p: "P2 · Normal",
    d: "SLA 24h · 3h elapsed",
    s: "In progress",
    tone: "bg-warning/10 text-warning",
  },
  {
    t: "WiFi dropouts — Block C",
    p: "P1 · High",
    d: "SLA 2h · 30m elapsed",
    s: "Investigating",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Printer toner request",
    p: "P3 · Low",
    d: "SLA 72h · 10h elapsed",
    s: "Queued",
    tone: "bg-learning/10 text-learning",
  },
];

function ItTickets() {
  return (
    <AppShell
      roleKey="instructor"
      title="Ticket hub"
      subtitle="18 open · 3 high priority · SLA 91%"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">SLA 91%</Badge>
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
            label: "Open",
            value: "18",
            delta: "3 high priority",
            icon: Ticket,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "In progress",
            value: "7",
            delta: "2 assigned to you",
            icon: Clock3,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "SLA at risk",
            value: "2",
            delta: "resolve today",
            icon: LifeBuoy,
            tone: "bg-destructive/10 text-destructive",
          },
          {
            label: "Solved (30d)",
            value: "164",
            delta: "96% within SLA",
            icon: MonitorCheck,
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

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Ticket className="text-primary size-4" /> Queue
          </CardTitle>
          <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
            New ticket
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          {tickets.map((t) => (
            <div key={t.t} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{t.t}</p>
                <p className="text-muted-foreground text-xs">
                  {t.p} · {t.d}
                </p>
              </div>
              <Badge className={cn("border-0 font-semibold", t.tone)}>{t.s}</Badge>
              <Button asChild variant="outline" size="sm" className="shrink-0 font-semibold">
                <Link to="/app/it/tickets/$id" params={{ id: "TKT-1042" }}>
                  Open <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
