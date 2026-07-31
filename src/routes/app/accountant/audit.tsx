import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FileSearch, History, Lock, ShieldCheck, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/accountant/audit")({
  head: () => ({
    meta: [
      { title: "Audit Log — CEA-OS" },
      { name: "description", content: "Immutable trail of financial actions." },
    ],
  }),
  component: AccountantAudit,
});

const events = [
  {
    e: "INV-9021 issued",
    by: "A. Bankole",
    d: "Aug 1 · 09:12",
    tone: "bg-primary/10 text-primary",
  },
  {
    e: "Payroll run #128 processed",
    by: "System",
    d: "Aug 1 · 08:00",
    tone: "bg-learning/10 text-learning",
  },
  {
    e: "Bank statement import — GTB",
    by: "A. Bankole",
    d: "Jul 31 · 16:44",
    tone: "bg-success/10 text-success",
  },
  {
    e: "INV-9012 payment reversed",
    by: "A. Bankole",
    d: "Jul 30 · 11:20",
    tone: "bg-warning/10 text-warning",
  },
];

function AccountantAudit() {
  return (
    <AppShell
      roleKey="instructor"
      title="Audit log"
      subtitle="1,204 events this month · immutable · exportable"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Integrity OK</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/accountant">
              <ArrowLeft className="size-4" /> Finance hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Events (30d)",
            value: "1,204",
            delta: "94% system",
            icon: History,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Manual actions",
            value: "72",
            delta: "all attributed",
            icon: UserRound,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Alerts",
            value: "0",
            delta: "no anomalies",
            icon: ShieldCheck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Retention",
            value: "7 yrs",
            delta: "policy compliant",
            icon: Lock,
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
            <FileSearch className="text-primary size-4" /> Recent events
          </CardTitle>
          <Button variant="outline" size="sm" className="font-semibold">
            Export
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          {events.map((ev) => (
            <div
              key={ev.e + ev.d}
              className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{ev.e}</p>
                <p className="text-muted-foreground text-xs">
                  {ev.by} · {ev.d}
                </p>
              </div>
              <Badge className={cn("border-0 font-semibold", ev.tone)}>Logged</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
