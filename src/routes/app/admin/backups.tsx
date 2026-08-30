import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
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
import { QueryState } from "@/components/ui/query-state";
import { useAdmBackups, useRestoreAdmBackup } from "@/lib/query/adminSystems";
import type { AdmBackup } from "@/lib/api/adminSystems";
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

function statusTone(status: string) {
  if (/active|verified|connected|on track|published/i.test(status))
    return "bg-success/10 text-success";
  if (/expiring|pending|paused/i.test(status)) return "bg-warning/10 text-warning";
  if (/failed|rejected|revoked/i.test(status)) return "bg-destructive/10 text-destructive";
  return "bg-primary/10 text-primary";
}

function AdminBackups() {
  const backupsQuery = useAdmBackups();
  const restore = useRestoreAdmBackup();

  const requestRestore = (backup: AdmBackup) => {
    if (restore.isPending) return;
    if (
      !window.confirm(
        `Queue a restore from ${backup.name}? The infrastructure team will perform it asynchronously.`,
      )
    ) {
      return;
    }
    restore.mutate(backup.id, {
      onSuccess: (result) => {
        toast.success(
          result.alreadyQueued
            ? `A restore for ${result.backup} is already queued`
            : `Restore queued for ${result.backup}`,
        );
      },
    });
  };

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
          <QueryState<AdmBackup[]>
            query={backupsQuery}
            error={{ title: "Failed to load backups" }}
            empty={{ title: "No backups yet" }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) =>
              rows.map((b) => (
                <div
                  key={b.id}
                  className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">{b.name}</p>
                    <p className="text-muted-foreground text-xs">{b.detail}</p>
                  </div>
                  <Badge className={cn("border-0 font-semibold", statusTone(b.status))}>
                    {b.status}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    className="shrink-0 font-semibold"
                    onClick={() => requestRestore(b)}
                    disabled={restore.isPending}
                  >
                    {restore.isPending ? "Queueing…" : "Restore"}
                  </Button>
                </div>
              ))
            }
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
