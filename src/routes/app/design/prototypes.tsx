"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowLeft,
  Eye,
  History,
  MessageCircle,
  MousePointerClick,
  PlayCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useDesignKpis, useDesignPrototypes } from "@/lib/query/design";
import type { DesignPrototype } from "@/lib/api/design";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/design/prototypes")({
  head: () => ({
    meta: [
      { title: "Prototype Viewer — CEA-OS" },
      { name: "description", content: "Prototype list with versions, status and feedback counts." },
    ],
  }),
  component: PrototypeViewer,
});

function prototypeTone(status: string): string {
  if (status === "Testing") return "bg-primary/10 text-primary";
  if (status === "In review") return "bg-warning/10 text-warning";
  if (status === "Shipped") return "bg-success/10 text-success";
  return "bg-muted-foreground/10 text-muted-foreground";
}

function PrototypeViewer() {
  const query = useDesignPrototypes();
  const prototypes = query.data?.pages.flatMap((p) => p.items) ?? [];
  const kpis = useDesignKpis();
  const kpi = (id: string) => kpis.data?.find((k) => k.id === id)?.value ?? 0;
  const feedback = prototypes.reduce((s, p) => s + p.feedback, 0);
  return (
    <AppShell
      roleKey="design"
      title="Prototype viewer"
      subtitle="5 prototypes · 2 in testing · feedback 4.2/5 avg"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">4.2/5 avg</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/design">
              <ArrowLeft className="size-4" /> Design hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Prototypes",
            value: String(prototypes.length),
            delta: "2 in testing",
            icon: MousePointerClick,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Versions",
            value: String(kpi("prototypes-versions")),
            delta: "this quarter",
            icon: History,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Feedback items",
            value: String(feedback),
            delta: "38 resolved",
            icon: MessageCircle,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Usability tests",
            value: String(kpi("prototypes-usability")),
            delta: "32 participants",
            icon: PlayCircle,
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
            <Eye className="text-primary size-4" /> Prototypes
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<DesignPrototype[]> query={query} error={{ title: "Prototypes unavailable" }}>
            {(rows) => (
              <>
                {rows.map((p) => (
                  <div
                    key={p.t}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                      <PlayCircle className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{p.t}</p>
                      <p className="text-muted-foreground text-xs">
                        {p.version} · {p.owner} · {p.feedback} feedback
                      </p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", prototypeTone(p.status))}>
                      {p.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0">
                      Open
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
