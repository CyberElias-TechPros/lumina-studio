import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, CheckCircle2, Clock, QrCode, Timer, UserCheck, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useStuAttendance, useStuPolicy, useStuRecords } from "@/lib/query/studentSelf";
import type { StuKpi, StuPolicy, StuRecord } from "@/lib/api/studentSelf";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/attendance")({
  head: () => ({
    meta: [
      { title: "Attendance — CEA-OS" },
      { name: "description", content: "Your attendance history, QR check-ins and records." },
    ],
  }),
  component: StudentAttendance,
});

const kpiMeta = [
  { icon: CheckCircle2, tone: "bg-success/10 text-success" },
  { icon: Clock, tone: "bg-warning/10 text-warning" },
  { icon: UserCheck, tone: "bg-primary/10 text-primary" },
  { icon: XCircle, tone: "bg-destructive/10 text-destructive" },
];

const policyTones = [
  "bg-success/10 text-success",
  "bg-primary/10 text-primary",
  "bg-warning/10 text-warning",
  "bg-learning/10 text-learning",
];

function recordMeta(status: string) {
  if (/late/i.test(status)) return { icon: Clock, tone: "bg-warning/10 text-warning" };
  if (/excused/i.test(status)) return { icon: UserCheck, tone: "bg-primary/10 text-primary" };
  if (/unexcused/i.test(status))
    return { icon: XCircle, tone: "bg-destructive/10 text-destructive" };
  return { icon: CheckCircle2, tone: "bg-success/10 text-success" };
}

function StudentAttendance() {
  const kpisQuery = useStuAttendance();
  const recordsQuery = useStuRecords();
  const policyQuery = useStuPolicy();
  return (
    <AppShell
      roleKey="student"
      title="Attendance"
      subtitle="Cohort 15 · Term 2 · 94% overall"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            94% — Good standing
          </Badge>
          <Button size="sm">
            <QrCode className="size-4" /> Check in
          </Button>
        </>
      }
    >
      <QueryState<StuKpi[]>
        query={kpisQuery}
        error={{ title: "Failed to load attendance metrics" }}
        empty={{ title: "No attendance metrics yet" }}
        isEmpty={(rows) => rows.length === 0}
      >
        {(kpis) => (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {kpis.map((k, i) => {
              const meta = kpiMeta[i % kpiMeta.length];
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <CalendarDays className="text-primary size-4" /> Recent sessions
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            <QueryState<StuRecord[]>
              query={recordsQuery}
              error={{ title: "Failed to load sessions" }}
              empty={{ title: "No sessions recorded" }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(items) =>
                items.map((r) => {
                  const meta = recordMeta(r.status);
                  return (
                    <div
                      key={r.id}
                      className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                    >
                      <span
                        className={cn(
                          "grid size-9 shrink-0 place-items-center rounded-lg",
                          meta.tone,
                        )}
                      >
                        <meta.icon className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold">{r.course}</p>
                        <p className="text-muted-foreground text-xs">{r.dateLabel}</p>
                      </div>
                      <Badge className={cn("border-0 font-semibold", meta.tone)}>{r.status}</Badge>
                    </div>
                  );
                })
              }
            </QueryState>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Timer className="text-primary size-4" /> Attendance policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <QueryState<StuPolicy[]>
                query={policyQuery}
                error={{ title: "Failed to load policy" }}
                empty={{ title: "No policy rules" }}
                isEmpty={(rows) => rows.length === 0}
              >
                {(items) =>
                  items.map((x, i) => (
                    <div
                      key={x.id}
                      className="flex items-center justify-between rounded-xl border p-3"
                    >
                      <span className="text-sm font-semibold">{x.rule}</span>
                      <Badge
                        className={cn(
                          "border-0 font-semibold",
                          policyTones[i % policyTones.length],
                        )}
                      >
                        {x.valueLabel}
                      </Badge>
                    </div>
                  ))
                }
              </QueryState>
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <QrCode className="text-warning size-5" />
              <p className="font-display mt-3 text-base font-extrabold">QR check-in</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Scan the class code within 10 minutes of start. One tap — your record updates
                instantly, and your parent's report does too.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
