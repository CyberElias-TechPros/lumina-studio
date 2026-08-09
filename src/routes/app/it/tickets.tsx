import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock3, LifeBuoy, MonitorCheck, Ticket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useItTickets, useItTicketItems } from "@/lib/query/it";
import type { ItTicket } from "@/lib/api/it";
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

const priorityLabel: Record<string, string> = {
  P1: "P1 · High",
  P2: "P2 · Normal",
  P3: "P3 · Low",
};

const statusTone: Record<string, string> = {
  assigned: "bg-destructive/10 text-destructive",
  "in progress": "bg-warning/10 text-warning",
  investigating: "bg-primary/10 text-primary",
  queued: "bg-learning/10 text-learning",
  solved: "bg-success/10 text-success",
};

function ItTickets() {
  const query = useItTickets();
  const tickets = useItTicketItems();

  const open = tickets.filter((t) => t.status !== "solved").length;
  const inProgress = tickets.filter((t) => t.status === "in progress").length;
  const high = tickets.filter((t) => t.priority === "P1" && t.status !== "solved").length;
  const solved = tickets.filter((t) => t.status === "solved").length;

  return (
    <AppShell
      roleKey="it"
      title="Ticket hub"
      subtitle={tickets.length > 0 ? `${open} open · ${high} high priority` : "Loading tickets…"}
      actions={
        <>
          <Badge
            className={cn(
              "border-0 font-semibold",
              high > 0 ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success",
            )}
          >
            {high > 0 ? `${high} high priority` : "No high priority"}
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
            label: "Open",
            value: tickets.length > 0 ? String(open) : "—",
            delta: `${tickets.length} total`,
            icon: Ticket,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "In progress",
            value: inProgress > 0 ? String(inProgress) : "—",
            delta: "actively worked",
            icon: Clock3,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "High priority",
            value: high > 0 ? String(high) : "0",
            delta: "resolve today",
            icon: LifeBuoy,
            tone: "bg-destructive/10 text-destructive",
          },
          {
            label: "Solved",
            value: solved > 0 ? String(solved) : "—",
            delta: "of tracked tickets",
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
          <QueryState<ItTicket[]>
            query={query}
            error={{ title: "Tickets unavailable" }}
            empty={{
              title: "No tickets yet",
              description: "Support tickets will show here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((t) => (
                  <div
                    key={t.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">
                        {t.id} · {t.subject}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {priorityLabel[t.priority] ?? t.priority} · {t.sla} · {t.elapsed} ·{" "}
                        {t.reporter}
                      </p>
                    </div>
                    <Badge
                      className={cn(
                        "border-0 font-semibold capitalize",
                        statusTone[t.status] ?? "bg-muted/20 text-muted-foreground",
                      )}
                    >
                      {t.status}
                    </Badge>
                    <Button asChild variant="outline" size="sm" className="shrink-0 font-semibold">
                      <Link to="/app/it/tickets/$id" params={{ id: t.id }}>
                        Open <ArrowRight className="ml-1 size-3.5" />
                      </Link>
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
