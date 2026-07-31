import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Clock3, Inbox, Send, Server } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/dev/queues")({
  head: () => ({
    meta: [
      { title: "Job Queues — CEA-OS" },
      { name: "description", content: "Background job queues and workers." },
    ],
  }),
  component: DevQueues,
});

const queues = [
  {
    q: "email",
    d: "7 pending · 1.2k processed today",
    s: "Healthy",
    tone: "bg-success/10 text-success",
  },
  {
    q: "notifications",
    d: "0 pending · backlog clear",
    s: "Healthy",
    tone: "bg-success/10 text-success",
  },
  {
    q: "exports",
    d: "1 pending · running 2m 14s",
    s: "Processing",
    tone: "bg-warning/10 text-warning",
  },
];

function DevQueues() {
  return (
    <AppShell
      roleKey="instructor"
      title="Job queues"
      subtitle="4 queues · 3 workers · concurrency 10"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">All healthy</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/dev">
              <ArrowLeft className="size-4" /> Dev hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Pending",
            value: "8",
            delta: "across 4 queues",
            icon: Inbox,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Processed (24h)",
            value: "14.2k",
            delta: "0.3% failed",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Latency (p95)",
            value: "1.8s",
            delta: "within SLA",
            icon: Clock3,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Workers",
            value: "3",
            delta: "all online",
            icon: Server,
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
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Send className="text-primary size-4" /> Queues
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {queues.map((q) => (
            <div key={q.q} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="font-mono text-sm font-bold">{q.q}</p>
                <p className="text-muted-foreground text-xs">{q.d}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", q.tone)}>{q.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Inspect
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
