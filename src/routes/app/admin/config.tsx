"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, Flag, RotateCcw, ToggleRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { flagLabels, useFlags, useResetFlag, useSetFlag } from "@/lib/flags";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/admin/config")({
  head: () => ({
    meta: [
      { title: "System Configuration — CEA-OS" },
      { name: "description", content: "Settings and feature flags." },
    ],
  }),
  component: AdminConfig,
});

function AdminConfig() {
  const { data } = useFlags();
  const setFlag = useSetFlag();
  const resetFlag = useResetFlag();

  const flags = data ?? {};
  const flagCount = Object.keys(flags).length;
  const enabled = Object.values(flags).filter(Boolean).length;

  const busy = setFlag.isPending || resetFlag.isPending;

  return (
    <AppShell
      roleKey="admin"
      title="System configuration"
      subtitle={`${flagCount} feature flags · ${enabled} live`}
      actions={
        <Button asChild variant="outline" size="sm" className="font-semibold">
          <Link to="/app/admin">
            <ArrowLeft className="size-4" /> Admin hub
          </Link>
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Card className="bg-card shadow-soft border">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                Feature flags
              </p>
              <span className="bg-primary/10 text-primary grid size-8 place-items-center rounded-lg">
                <ToggleRight className="size-4" />
              </span>
            </div>
            <p className="font-display mt-3 text-2xl font-extrabold">{String(flagCount)}</p>
            <p className="text-muted-foreground mt-0.5 text-xs font-semibold">
              {enabled} live · defaults apply when no override exists
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card shadow-soft border">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                Enabled
              </p>
              <span className="bg-success/10 text-success grid size-8 place-items-center rounded-lg">
                <Flag className="size-4" />
              </span>
            </div>
            <p className="font-display mt-3 text-2xl font-extrabold">{String(enabled)}</p>
            <p className="text-muted-foreground mt-0.5 text-xs font-semibold">Actively gated on</p>
          </CardContent>
        </Card>
        <Card className="bg-card shadow-soft border">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                Disabled
              </p>
              <span className="bg-muted-foreground/10 text-muted-foreground grid size-8 place-items-center rounded-lg">
                <ToggleRight className="size-4" />
              </span>
            </div>
            <p className="font-display mt-3 text-2xl font-extrabold">
              {String(Math.max(flagCount - enabled, 0))}
            </p>
            <p className="text-muted-foreground mt-0.5 text-xs font-semibold">Gated off</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Flag className="text-primary size-4" /> Feature flags
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {Object.entries(flags).map(([key, on]) => (
            <div key={key} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{flagLabels[key] ?? key}</p>
                <p className="text-muted-foreground font-mono text-xs">{key}</p>
              </div>
              <Badge
                className={cn(
                  "border-0 font-semibold",
                  on
                    ? "bg-success/10 text-success"
                    : "bg-muted-foreground/10 text-muted-foreground",
                )}
              >
                {on ? "Enabled" : "Disabled"}
              </Badge>
              {on ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0 font-semibold"
                  disabled={busy}
                  onClick={() => setFlag.mutate({ key, enabled: false })}
                >
                  Disable
                </Button>
              ) : (
                <Button
                  size="sm"
                  className="bg-gradient-brand shadow-glow shrink-0 border-0 font-semibold"
                  disabled={busy}
                  onClick={() => setFlag.mutate({ key, enabled: true })}
                >
                  Enable
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="shrink-0 font-semibold"
                disabled={busy}
                onClick={() => resetFlag.mutate(key)}
              >
                <RotateCcw className="size-3.5" /> Reset
              </Button>
            </div>
          ))}
          {flagCount === 0 && (
            <p className="text-muted-foreground py-4 text-center text-sm">No flags loaded yet.</p>
          )}
        </CardContent>
      </Card>
    </AppShell>
  );
}
