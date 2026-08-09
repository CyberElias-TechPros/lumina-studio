import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Eye, Mail, MousePointerClick, Send, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import type { CcpSequence } from "@/lib/query/conversionCopy";
import { useCcpSequences } from "@/lib/query/conversionCopy";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/conversion-copy/email-sequences")({
  head: () => ({
    meta: [
      { title: "Email Sequences — CEA-OS" },
      { name: "description", content: "Build nurture and conversion sequences." },
    ],
  }),
  component: CopyEmailSequences,
});

const sequenceTones = [
  "bg-success/10 text-success",
  "bg-primary/10 text-primary",
  "bg-warning/10 text-warning",
  "bg-muted-foreground/10 text-muted-foreground",
];

function CopyEmailSequences() {
  const sequencesQuery = useCcpSequences();

  return (
    <AppShell
      roleKey="conversion-copy"
      title="Email sequence builder"
      subtitle="8 sequences · 44 emails · automated triggers"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">2 live</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/conversion-copy/library">
              <ArrowLeft className="size-4" /> Library
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Sequences",
            value: "8",
            delta: "3 categories",
            icon: Mail,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Avg. open rate",
            value: "41%",
            delta: "+3 pts",
            icon: Eye,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Avg. click rate",
            value: "8.2%",
            delta: "+1.1 pts",
            icon: MousePointerClick,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Avg. send time",
            value: "2 min",
            delta: "after trigger",
            icon: Timer,
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
            <Send className="text-primary size-4" /> Sequences
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<CcpSequence[]>
            query={sequencesQuery}
            error={{ title: "Sequences unavailable" }}
            empty={{
              title: "No sequences yet",
              description: "Nurture and conversion sequences will show here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((s, i) => (
                  <div
                    key={s.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{s.title}</p>
                      <p className="text-muted-foreground text-xs">
                        {s.emails} emails · Open {s.openRate} · click {s.clickRate}
                      </p>
                    </div>
                    <Badge
                      className={cn(
                        "border-0 font-semibold",
                        sequenceTones[i % sequenceTones.length],
                      )}
                    >
                      {s.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      Builder
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
