"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, FileSearch, History, Lock, ShieldCheck, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { useAuditItems } from "@/lib/query/admin";
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

function AccountantAudit() {
  const audit = useAuditItems();

  const flagged = audit.filter((e) => e.severity === "high").length;

  const events = audit.slice(0, 8).map((e) => ({
    e: e.action,
    by: e.actor,
    d: e.time,
    tone: e.severity === "high" ? "bg-warning/10 text-warning" : "bg-primary/10 text-primary",
  }));

  return (
    <AppShell
      roleKey="finance"
      title="Audit log"
      subtitle={`${audit.length} events on record · immutable · exportable`}
      actions={
        <>
          <Badge
            className={cn(
              "border-0 font-semibold",
              flagged > 0 ? "bg-warning/10 text-warning" : "bg-success/10 text-success",
            )}
          >
            {flagged > 0 ? `${flagged} flagged` : "Integrity OK"}
          </Badge>
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
            label: "Events",
            value: String(audit.length),
            delta: "system + manual",
            icon: History,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Actors",
            value: String(new Set(audit.map((a) => a.actor)).size),
            delta: "distinct users",
            icon: UserRound,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Flagged",
            value: String(flagged),
            delta: flagged > 0 ? "needs review" : "no anomalies",
            icon: ShieldCheck,
            tone: flagged > 0 ? "bg-warning/10 text-warning" : "bg-success/10 text-success",
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
          {events.length === 0 && (
            <p className="text-muted-foreground py-4 text-center text-sm">No audit events yet.</p>
          )}
        </CardContent>
      </Card>
    </AppShell>
  );
}
