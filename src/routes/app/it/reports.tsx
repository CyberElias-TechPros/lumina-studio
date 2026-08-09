import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BarChart3, FileBarChart2, MonitorCheck, Ticket, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useItTickets, useItTicketItems } from "@/lib/query/it";
import type { ItTicket } from "@/lib/api/it";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/it/reports")({
  head: () => ({
    meta: [
      { title: "IT Reports — CEA-OS" },
      { name: "description", content: "Support performance reports." },
    ],
  }),
  component: ItReports,
});

const reports = [
  { r: "Monthly support report — July", d: "Published Aug 1", tone: "bg-success/10 text-success" },
  { r: "SLA compliance review", d: "Published Jul 29", tone: "bg-primary/10 text-primary" },
  { r: "Asset lifecycle audit", d: "Published Jul 22", tone: "bg-learning/10 text-learning" },
];

function ItReports() {
  const query = useItTickets();
  const tickets = useItTicketItems();

  const solved = tickets.filter((t) => t.status === "solved").length;
  const open = tickets.filter((t) => t.status !== "solved").length;
  const high = tickets.filter((t) => t.priority === "P1" && t.status !== "solved").length;

  return (
    <AppShell
      roleKey="it"
      title="Reports"
      subtitle={tickets.length > 0 ? `${solved} tickets solved · ${open} open` : "Loading reports…"}
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {solved}/{tickets.length} solved
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
            label: "Solved",
            value: solved > 0 ? String(solved) : "—",
            delta: "tracked tickets",
            icon: Ticket,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Open",
            value: open > 0 ? String(open) : "0",
            delta: "in queue",
            icon: MonitorCheck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "High priority",
            value: high > 0 ? String(high) : "0",
            delta: "still open",
            icon: BarChart3,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Total",
            value: tickets.length > 0 ? String(tickets.length) : "—",
            delta: "tickets tracked",
            icon: Users,
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
            <FileBarChart2 className="text-primary size-4" /> Published
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {reports.map((r) => (
            <div key={r.r} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{r.r}</p>
                <p className="text-muted-foreground text-xs">{r.d}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", r.tone)}>Current</Badge>
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
