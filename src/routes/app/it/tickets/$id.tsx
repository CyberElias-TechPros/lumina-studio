import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Clock3, MessageSquare, MonitorCheck, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/it/tickets/$id")({
  head: () => ({
    meta: [
      { title: "Ticket — CEA-OS" },
      { name: "description", content: "Ticket detail and resolution flow." },
    ],
  }),
  component: ItTicketDetail,
});

const activity = [
  { a: "Ticket created", d: "Today 08:30", tone: "bg-primary/10 text-primary" },
  { a: "Assigned to you", d: "Today 08:45", tone: "bg-learning/10 text-learning" },
  {
    a: "Remote check — projector confirmed faulty",
    d: "Today 09:10",
    tone: "bg-warning/10 text-warning",
  },
];

function ItTicketDetail() {
  return (
    <AppShell
      roleKey="instructor"
      title="TKT-1042 · Projector fails in Lab 2"
      subtitle="P1 · High · reported by Ms. Chidera · SLA 2h"
      actions={
        <>
          <Badge className="bg-destructive/10 text-destructive border-0 font-semibold">
            SLA: 50m left
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/it/tickets">
              <ArrowLeft className="size-4" /> Ticket hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <MessageSquare className="text-primary size-4" /> Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activity.map((a) => (
              <div key={a.a} className="flex items-center gap-3 rounded-xl border p-3">
                <Badge className={cn("shrink-0 border-0 font-semibold", a.tone)}>{a.d}</Badge>
                <p className="text-sm font-semibold">{a.a}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <MonitorCheck className="text-primary size-4" /> Resolution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground text-xs font-semibold">
                Replace projector lamp (P/N PJ-L204). Spare in store. ETA 40 min.
              </p>
              <Button
                size="sm"
                className="bg-gradient-brand shadow-glow w-full border-0 font-semibold"
              >
                <CheckCircle2 className="size-4" /> Mark resolved
              </Button>
              <Button variant="outline" size="sm" className="w-full font-semibold">
                <Clock3 className="size-3.5" /> Escalate
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <MessageSquare className="text-primary size-4" /> Reply to reporter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <textarea
                className="bg-muted placeholder:text-muted-foreground min-h-20 w-full resize-none rounded-xl border-0 p-3 text-sm font-medium outline-none"
                placeholder="Update the reporter…"
              />
              <Button
                size="sm"
                className="bg-gradient-brand shadow-glow w-full border-0 font-semibold"
              >
                <Send className="size-3.5" /> Send update
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
