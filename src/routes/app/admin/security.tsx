import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Fingerprint, Globe, KeyRound, Lock, ShieldAlert } from "lucide-react";
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
import { useAdminUserItems, useAuditItems } from "@/lib/query/admin";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/admin/security")({
  head: () => ({
    meta: [
      { title: "Security Dashboard — CEA-OS" },
      { name: "description", content: "Logins, 2FA, API keys and IP whitelist." },
    ],
  }),
  component: AdminSecurity,
});

function AdminSecurity() {
  const audit = useAuditItems();
  const users = useAdminUserItems();

  const blocked = audit.filter((e) => e.severity === "high");
  const staff = users.filter((u) => u.status === "Active").length;

  const events = audit.slice(0, 6).map((e) => ({
    e,
    label: `${e.action} · ${e.actor}`,
    t: e.time,
    s: e.severity === "high" ? "Blocked" : "Normal",
    tone: e.severity === "high" ? "bg-warning/10 text-warning" : "bg-success/10 text-success",
  }));
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[number]["e"] | null>(null);

  return (
    <AppShell
      roleKey="admin"
      title="Security dashboard"
      subtitle={`${audit.length} audit events · ${blocked.length} flagged · zero breaches`}
      actions={
        <>
          <Badge
            className={cn(
              "border-0 font-semibold",
              blocked.length > 0 ? "bg-warning/10 text-warning" : "bg-success/10 text-success",
            )}
          >
            {blocked.length} alerts
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/admin">
              <ArrowLeft className="size-4" /> Admin hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Active staff",
            value: String(staff),
            delta: "of total accounts",
            icon: Fingerprint,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Flagged events",
            value: String(blocked.length),
            delta: "high severity",
            icon: ShieldAlert,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Audit trail",
            value: String(audit.length),
            delta: "events logged",
            icon: Globe,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Active API keys",
            value: "14",
            delta: "2 rotated / mo",
            icon: KeyRound,
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
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Lock className="text-primary size-4" /> Recent events
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {events.map((e) => (
            <div
              key={e.e.id}
              className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{e.label}</p>
                <p className="text-muted-foreground text-xs">{e.t}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", e.tone)}>{e.s}</Badge>
              <Button
                variant="outline"
                size="sm"
                className="shrink-0 font-semibold"
                onClick={() => setSelectedEvent(e.e)}
              >
                Inspect
              </Button>
            </div>
          ))}
          {events.length === 0 && (
            <p className="text-muted-foreground py-4 text-center text-sm">No audit events yet.</p>
          )}
        </CardContent>
      </Card>
      <Dialog
        open={selectedEvent !== null}
        onOpenChange={(open) => !open && setSelectedEvent(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Security event inspection</DialogTitle>
            <DialogDescription>
              Review the recorded event before taking action in the relevant admin workflow.
            </DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <dl className="grid gap-3 rounded-xl border p-4 text-sm">
              <div>
                <dt className="text-muted-foreground text-xs font-bold uppercase">Action</dt>
                <dd className="mt-1 font-semibold">{selectedEvent.action}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs font-bold uppercase">Actor</dt>
                <dd className="mt-1 font-semibold">{selectedEvent.actor}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs font-bold uppercase">Time</dt>
                <dd className="mt-1 font-semibold">{selectedEvent.time}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs font-bold uppercase">Severity</dt>
                <dd className="mt-1 font-semibold capitalize">{selectedEvent.severity}</dd>
              </div>
            </dl>
          )}
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
