import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download, FileCheck, ScrollText, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
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

const events = [
  {
    e: "settings.update · system.maintenance",
    a: "Adaeze Okafor",
    t: "Jul 31 · 08:22",
    s: "Success",
    tone: "bg-success/10 text-success",
  },
  {
    e: "rbac.override · permission grant",
    a: "System",
    t: "Jul 30 · 16:41",
    s: "Success",
    tone: "bg-success/10 text-success",
  },
  {
    e: "auth.login_denied · bad IP",
    a: "—",
    t: "Jul 30 · 03:47",
    s: "Denied",
    tone: "bg-warning/10 text-warning",
  },
];

function AdminAudit() {
  return (
    <AppShell
      roleKey="admin"
      title="Audit log"
      subtitle="Immutable · 7-year retention · 2.1m events"
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
            value: "48k",
            delta: "0.8% denied",
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
          {events.map((ev) => (
            <div
              key={ev.e + ev.t}
              className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
            >
              <div className="min-w-0 flex-1">
                <p className="font-mono text-xs font-bold">{ev.e}</p>
                <p className="text-muted-foreground text-xs">
                  {ev.a} · {ev.t}
                </p>
              </div>
              <Badge className={cn("border-0 font-semibold", ev.tone)}>{ev.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Details
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
