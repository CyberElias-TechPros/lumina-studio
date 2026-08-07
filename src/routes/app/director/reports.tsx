import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Download,
  Filter,
  FileBarChart2,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useDirModules, useDirSaved } from "@/lib/query/director";
import type { DirModule, DirSavedReport } from "@/lib/api/director";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/director/reports")({
  head: () => ({
    meta: [
      { title: "Reports Drill-Down — CEA-OS" },
      { name: "description", content: "Drill into any module and any department." },
    ],
  }),
  component: DirectorReports,
});

function moduleTone(name: string) {
  const tones: Record<string, string> = {
    Finance: "bg-success/10 text-success",
    Academic: "bg-primary/10 text-primary",
    Operations: "bg-learning/10 text-learning",
    People: "bg-community/10 text-community",
    Marketing: "bg-warning/10 text-warning",
    Quality: "bg-erp/10 text-erp",
  };
  return tones[name] ?? "bg-primary/10 text-primary";
}

function DirectorReports() {
  const modulesQuery = useDirModules();
  const savedQuery = useDirSaved();
  return (
    <AppShell
      roleKey="admin"
      title="Reports drill-down"
      subtitle="Any module · any department · any period"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Data fresh</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/director">
              <ArrowLeft className="size-4" /> Director portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="bg-card shadow-soft flex flex-wrap items-center gap-2 rounded-2xl border p-3">
        <div className="bg-muted flex min-w-0 flex-1 items-center gap-2 rounded-xl px-3 py-2">
          <Search className="text-muted-foreground size-4 shrink-0" />
          <input
            className="placeholder:text-muted-foreground w-full bg-transparent text-sm font-medium outline-none"
            placeholder="Finance, Cohort 15, ROAS, Abeokuta…"
          />
        </div>
        <Button variant="outline" size="sm" className="font-semibold">
          <Filter className="size-3.5" /> Filters
        </Button>
        <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
          <BarChart3 className="size-3.5" /> Build report
        </Button>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <FileBarChart2 className="text-primary size-4" /> Explore modules
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <QueryState<DirModule[]>
              query={modulesQuery}
              empty={{ title: "No modules yet" }}
              error={{ title: "Failed to load modules" }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(rows) =>
                rows.map((m) => (
                  <div
                    key={m.id}
                    className="group flex flex-col justify-between rounded-xl border p-3.5"
                  >
                    <div className="flex items-center gap-2">
                      <Badge className={cn("border-0 font-semibold", moduleTone(m.name))}>
                        {m.name}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mt-2 text-xs">{m.detail}</p>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="mt-3 justify-start px-0 font-semibold"
                    >
                      <Link to="/app/director/command-center">
                        Drill down <ArrowRight className="ml-1 size-3.5" />
                      </Link>
                    </Button>
                  </div>
                ))
              }
            </QueryState>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Download className="text-primary size-4" /> Saved reports
            </CardTitle>
            <Badge variant="secondary" className="font-semibold">
              12 saved
            </Badge>
          </CardHeader>
          <CardContent className="divide-y">
            <QueryState<DirSavedReport[]>
              query={savedQuery}
              empty={{ title: "No saved reports yet" }}
              error={{ title: "Failed to load saved reports" }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(rows) =>
                rows.map((r) => (
                  <div
                    key={r.id}
                    className="flex flex-wrap items-center gap-3 py-3.5 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{r.name}</p>
                      <p className="text-muted-foreground text-xs">{r.detail}</p>
                    </div>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      <Download className="size-3.5" /> Export
                    </Button>
                  </div>
                ))
              }
            </QueryState>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
