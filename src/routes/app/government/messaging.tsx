"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowLeft,
  Inbox,
  Lock,
  MessageSquare,
  Send,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useGovOverview, useGovThreads } from "@/lib/query/government";
import type { GovKpi, GovThread } from "@/lib/api/government";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/government/messaging")({
  head: () => ({
    meta: [
      { title: "Messaging — CEA-OS" },
      { name: "description", content: "Secure communication with the institution." },
    ],
  }),
  component: GovernmentMessaging,
});

const kpiMeta: Record<string, { icon: LucideIcon; tone: string }> = {
  Threads: { icon: MessageSquare, tone: "bg-primary/10 text-primary" },
  Unread: { icon: Inbox, tone: "bg-warning/10 text-warning" },
  Encrypted: { icon: Lock, tone: "bg-success/10 text-success" },
  "Avg. response": { icon: Send, tone: "bg-learning/10 text-learning" },
};

const defaultKpiMeta: { icon: LucideIcon; tone: string } = {
  icon: MessageSquare,
  tone: "bg-primary/10 text-primary",
};

const threadTones: Record<string, string> = {
  Open: "bg-primary/10 text-primary",
  Closed: "bg-success/10 text-success",
};

function GovernmentMessaging() {
  const overviewQuery = useGovOverview();
  const threadsQuery = useGovThreads();

  return (
    <AppShell
      roleKey="government"
      title="Messaging"
      subtitle="Correspondence with regulators and partners"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Secure</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/government">
              <ArrowLeft className="size-4" /> Compliance portal
            </Link>
          </Button>
        </>
      }
    >
      <QueryState<GovKpi[]>
        query={overviewQuery}
        error={{ title: "Metrics unavailable" }}
        empty={{ title: "No metrics", description: "Compliance metrics will appear here." }}
        isEmpty={(rows) => rows.length === 0}
      >
        {(rows) => (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {rows.map((k) => {
              const meta = kpiMeta[k.metric] ?? defaultKpiMeta;
              return (
                <Card key={k.id} className="bg-card shadow-soft border">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                        {k.metric}
                      </p>
                      <span className={cn("grid size-8 place-items-center rounded-lg", meta.tone)}>
                        <meta.icon className="size-4" />
                      </span>
                    </div>
                    <p className="font-display mt-3 text-2xl font-extrabold">{k.valueLabel}</p>
                    <p className="text-muted-foreground mt-0.5 text-xs font-semibold">{k.delta}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </QueryState>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <ShieldCheck className="text-primary size-4" /> Threads
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<GovThread[]>
            query={threadsQuery}
            error={{ title: "Threads unavailable" }}
            empty={{ title: "No threads", description: "Secure conversations will show here." }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((m) => (
                  <div
                    key={m.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{m.title}</p>
                      <p className="text-muted-foreground text-xs">
                        {m.fromLabel} · {m.timeLabel}
                      </p>
                    </div>
                    <Badge
                      className={cn(
                        "border-0 font-semibold",
                        threadTones[m.status] ?? "bg-primary/10 text-primary",
                      )}
                    >
                      {m.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
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
