import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  DatabaseBackup,
  Download,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/admin/backups")({
  head: () => ({
    meta: [
      { title: "Backups — CEA-OS" },
      { name: "description", content: "Schedule, restore and retention." },
    ],
  }),
  component: AdminBackups,
});

const backups = [
  {
    b: "Production · nightly",
    t: "Jul 31 · 02:00 · 8.4 GB",
    s: "Verified",
    tone: "bg-success/10 text-success",
  },
  {
    b: "Production · nightly",
    t: "Jul 30 · 02:00 · 8.3 GB",
    s: "Verified",
    tone: "bg-success/10 text-success",
  },
  {
    b: "Pre-migration snapshot",
    t: "Jul 24 · 14:00 · 8.1 GB",
    s: "Archived",
    tone: "bg-muted text-muted-foreground",
  },
];

function AdminBackups() {
  return (
    <AppShell
      roleKey="admin"
      title="Backups"
      subtitle="Nightly 02:00 WAT · 35-day retention · restore < 15 min"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            12 / 12 verified
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
            label: "Last backup",
            value: "02:00",
            delta: "today · 8.4 GB",
            icon: DatabaseBackup,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Restore drills",
            value: "6",
            delta: "quarterly",
            icon: RotateCcw,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Retention",
            value: "35d",
            delta: "daily · 12mo monthly",
            icon: ShieldCheck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Failed (30d)",
            value: "0",
            delta: "100% success",
            icon: CheckCircle2,
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
            <Download className="text-primary size-4" /> Backup history
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {backups.map((b) => (
            <div
              key={b.b + b.t}
              className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{b.b}</p>
                <p className="text-muted-foreground text-xs">{b.t}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", b.tone)}>{b.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Restore
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
