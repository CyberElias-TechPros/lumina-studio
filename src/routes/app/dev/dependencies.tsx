import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Boxes,
  CheckCircle2,
  PackageSearch,
  RefreshCcw,
  ShieldAlert,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useDevDeps } from "@/lib/query/dev";
import type { DevDep } from "@/lib/api/dev";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/dev/dependencies")({
  head: () => ({
    meta: [
      { title: "Dependencies — CEA-OS" },
      { name: "description", content: "Package health and vulnerabilities." },
    ],
  }),
  component: DevDependencies,
});

function depTone(status: string) {
  if (/vuln|critical|secur|patch/i.test(status)) return "bg-destructive/10 text-destructive";
  if (/current|up to date|healthy|latest/i.test(status)) return "bg-success/10 text-success";
  return "bg-warning/10 text-warning";
}

function DevDependencies() {
  const depsQuery = useDevDeps();

  return (
    <AppShell
      roleKey="dev"
      title="Dependencies"
      subtitle="126 direct · 412 transitive · Dependabot on"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">No critical</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/dev">
              <ArrowLeft className="size-4" /> Dev hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Direct deps",
            value: "126",
            delta: "vs 132 last sprint",
            icon: Boxes,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Outdated",
            value: "8",
            delta: "3 majors",
            icon: RefreshCcw,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Vulnerabilities",
            value: "1",
            delta: "0 critical",
            icon: ShieldAlert,
            tone: "bg-destructive/10 text-destructive",
          },
          {
            label: "Up to date",
            value: "93%",
            delta: "all scopes",
            icon: CheckCircle2,
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
            <PackageSearch className="text-primary size-4" /> Attention needed
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<DevDep[]>
            query={depsQuery}
            error={{ title: "Dependencies unavailable" }}
            empty={{ title: "No dependencies", description: "Package health will show here." }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((d) => (
                  <div
                    key={d.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-sm font-bold">{d.name}</p>
                      <p className="text-muted-foreground text-xs">v{d.version}</p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", depTone(d.status))}>
                      {d.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      Update
                    </Button>
                  </div>
                ))}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
