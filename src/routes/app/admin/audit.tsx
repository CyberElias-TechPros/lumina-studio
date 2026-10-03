"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { useState } from "react";
import { ArrowLeft, Download, FileCheck, ScrollText, Search } from "lucide-react";
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
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useAuditLog } from "@/lib/query/admin";
import type { AuditEntry } from "@/lib/api/admin";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/admin/audit")({
  head: () => ({
    meta: [
      { title: "Audit Log — CEA-OS" },
      { name: "description", content: "Immutable searchable audit trail." },
    ],
  }),
  component: AdminAudit,
});

function severityTone(severity: string): string {
  if (severity === "critical") return "bg-destructive/10 text-destructive";
  if (severity === "warning") return "bg-warning/10 text-warning";
  return "bg-success/10 text-success";
}

function AdminAudit() {
  const query = useAuditLog();
  const rows = query.data?.pages.flatMap((p) => p.items) ?? [];
  const critical = rows.filter((e) => e.severity === "critical").length;
  const [selectedEvent, setSelectedEvent] = useState<AuditEntry | null>(null);

  return (
    <AppShell
      roleKey="admin"
      title="Audit log"
      subtitle={`Immutable · ${rows.length} recent events`}
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Verified</Badge>
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
            label: "Events (30d)",
            value: String(rows.length),
            delta: `${critical} critical`,
            icon: ScrollText,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Immutable",
            value: "7yr",
            delta: "retention",
            icon: FileCheck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Exports (30d)",
            value: "3",
            delta: "gov-requested",
            icon: Download,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Search latency",
            value: "180 ms",
            delta: "full-text",
            icon: Search,
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
            <ScrollText className="text-primary size-4" /> Recent events
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<AuditEntry[]> query={query} error={{ title: "Audit trail unavailable" }}>
            {(events) => (
              <>
                {events.map((ev) => (
                  <div
                    key={ev.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{ev.action}</p>
                      <p className="text-muted-foreground text-xs">
                        {ev.actor} · {ev.time}
                      </p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", severityTone(ev.severity))}>
                      {ev.severity}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      className="shrink-0 font-semibold"
                      onClick={() => setSelectedEvent(ev)}
                    >
                      Details
                    </Button>
                  </div>
                ))}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
      <Dialog
        open={selectedEvent !== null}
        onOpenChange={(open) => !open && setSelectedEvent(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Audit event details</DialogTitle>
            <DialogDescription>
              This event is read-only and retained as part of the immutable audit trail.
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
