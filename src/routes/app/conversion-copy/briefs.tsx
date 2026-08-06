import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarClock, ClipboardList, FilePlus, Inbox } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import type { CcpBrief } from "@/lib/query/conversionCopy";
import { useCcpBriefs } from "@/lib/query/conversionCopy";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/conversion-copy/briefs")({
  head: () => ({
    meta: [
      { title: "Brief Intake — CEA-OS" },
      { name: "description", content: "Incoming copy briefs." },
    ],
  }),
  component: CopyBriefs,
});

const briefTones = [
  "bg-primary/10 text-primary",
  "bg-warning/10 text-warning",
  "bg-success/10 text-success",
  "bg-muted-foreground/10 text-muted-foreground",
];

function CopyBriefs() {
  const briefsQuery = useCcpBriefs();

  return (
    <AppShell
      roleKey="instructor"
      title="Brief intake"
      subtitle="12 this month · median turnaround 2.1 days"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">On track</Badge>
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
            label: "Briefs (month)",
            value: "12",
            delta: "+4 vs June",
            icon: ClipboardList,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "In progress",
            value: "3",
            delta: "1 due today",
            icon: Inbox,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Turnaround",
            value: "2.1d",
            delta: "target 3d",
            icon: CalendarClock,
            tone: "bg-success/10 text-success",
          },
          {
            label: "New briefs",
            value: "0",
            delta: "awaiting intake",
            icon: FilePlus,
            tone: "bg-learning/10 text-learning",
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
            <ClipboardList className="text-primary size-4" /> Briefs
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<CcpBrief[]>
            query={briefsQuery}
            error={{ title: "Briefs unavailable" }}
            empty={{
              title: "No briefs yet",
              description: "Incoming copy briefs will show here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((b, i) => (
                  <div
                    key={b.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{b.title}</p>
                      <p className="text-muted-foreground text-xs">
                        {b.requester} · {b.dateLabel}
                      </p>
                    </div>
                    <Badge
                      className={cn("border-0 font-semibold", briefTones[i % briefTones.length])}
                    >
                      {b.status}
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
