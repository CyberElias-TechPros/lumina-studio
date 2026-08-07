import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FileSearch, FileWarning, Globe, ScrollText, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useDevErrors } from "@/lib/query/dev";
import type { DevError } from "@/lib/api/dev";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/admin/logs")({
  head: () => ({
    meta: [
      { title: "Logs — CEA-OS" },
      { name: "description", content: "Application, error and access logs." },
    ],
  }),
  component: AdminLogs,
});

function errorTone(status: string) {
  if (/fixed|resolved|success|info/i.test(status)) return "bg-success/10 text-success";
  if (/new|critical|urgent|error|warn/i.test(status)) return "bg-destructive/10 text-destructive";
  return "bg-warning/10 text-warning";
}

function AdminLogs() {
  const errorsQuery = useDevErrors();
  return (
    <AppShell
      roleKey="admin"
      title="Logs"
      subtitle="App · error · access · 30-day retention"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Streaming</Badge>
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
            label: "Log volume (24h)",
            value: "1.4 GB",
            delta: "2.2m lines",
            icon: ScrollText,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Errors (24h)",
            value: "312",
            delta: "0.2% of lines",
            icon: FileWarning,
            tone: "bg-destructive/10 text-destructive",
          },
          {
            label: "Access logs",
            value: "890k",
            delta: "requests / day",
            icon: Globe,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Search latency",
            value: "240 ms",
            delta: "full-text",
            icon: FileSearch,
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
            <Terminal className="text-primary size-4" /> Recent lines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <QueryState<DevError[]>
            query={errorsQuery}
            error={{ title: "Failed to load log lines" }}
            empty={{ title: "No log lines" }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(items) =>
              items.map((l) => (
                <div key={l.id} className="flex flex-wrap items-center gap-3 rounded-xl border p-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-xs font-bold">{l.title}</p>
                    <p className="text-muted-foreground text-xs">{l.countLabel}</p>
                  </div>
                  <Badge className={cn("border-0 font-semibold", errorTone(l.status))}>
                    {l.status}
                  </Badge>
                </div>
              ))
            }
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
