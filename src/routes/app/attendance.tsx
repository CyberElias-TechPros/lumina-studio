"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CalendarDays, CheckCircle2, Clock, QrCode, Timer, UserCheck, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { flattenPages } from "@/lib/query/hooks";
import { useStuAttendance, useStuPolicy, useStuRecords } from "@/lib/query/studentSelf";
import type { StuKpi, StuPolicy, StuRecord } from "@/lib/api/studentSelf";
import { cn } from "@/lib/utils";
import { useCheckInAttendance } from "@/lib/query/attendance";

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

function deriveAttendanceKpis(records: StuRecord[]): StuKpi[] {
  const total = records.length;
  const present = records.filter((r) => /present/i.test(r.status)).length;
  const late = records.filter((r) => /late/i.test(r.status)).length;
  const excused = records.filter((r) => /excused/i.test(r.status)).length;
  const pct = total > 0 ? Math.round(((present + late) / total) * 100) : 100;
  return [
    {
      id: "att-present",
      metric: "Present",
      valueLabel: String(present),
      delta: `${total} recorded check-ins`,
    },
    {
      id: "att-late",
      metric: "Late arrivals",
      valueLabel: String(late),
      delta: "within grace window",
    },
    {
      id: "att-excused",
      metric: "Excused",
      valueLabel: String(excused),
      delta: "approved absences",
    },
    {
      id: "att-rate",
      metric: "Attendance rate",
      valueLabel: total > 0 ? `${pct}%` : "—",
      delta: total > 0 ? "based on your check-ins" : "check in to start tracking",
    },
  ];
}

const DEFAULT_POLICY: StuPolicy[] = [
  { id: "pol-1", rule: "Minimum term attendance", valueLabel: "85% required" },
  { id: "pol-2", rule: "QR check-in window", valueLabel: "10 min at start" },
  { id: "pol-3", rule: "Excused absences", valueLabel: "Notify instructor" },
];

function StudentAttendance() {
  const kpisQuery = useStuAttendance();
  const recordsQuery = useStuRecords();
  const policyQuery = useStuPolicy();
  const checkIn = useCheckInAttendance();
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [sessionCode, setSessionCode] = useState("");

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      setSessionCode(code);
      setCheckInOpen(true);
    }
  }, []);

  const submitCheckIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const code = sessionCode.trim();
    if (!code || checkIn.isPending) return;
    checkIn.mutate(code, {
      onSuccess: (result) => {
        toast.success(
          result.alreadyCheckedIn ? "You are already checked in" : "Attendance recorded",
          { description: `${result.course} · Present` },
        );
        setCheckInOpen(false);
        setSessionCode("");
      },
    });
  };

  const kpisData = flattenPages(kpisQuery.data?.pages);
  const records = flattenPages(recordsQuery.data?.pages);
  const policyData = flattenPages(policyQuery.data?.pages);
  const kpis: StuKpi[] = kpisData.length > 0 ? kpisData : deriveAttendanceKpis(records);
  const policyItems: StuPolicy[] = policyData.length > 0 ? policyData : DEFAULT_POLICY;

  return (
    <AppShell
      roleKey="student"
      title="Attendance"
      subtitle="Attendance records and QR check-in"
      actions={
        <Button size="sm" onClick={() => setCheckInOpen(true)}>
          <QrCode className="size-4" /> Check in
        </Button>
      }
    >
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <CalendarDays className="text-primary size-4" /> Recent sessions
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            <QueryState
              query={recordsQuery}
              error={{ title: "Failed to load sessions" }}
              empty={{
                title: "No check-ins yet",
                description: "Use the Check in button when your instructor shares a class code.",
              }}
              isEmpty={() => records.length === 0}
            >
              {() =>
                records.map((r) => {
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
              {policyItems.map((x, i) => (
                <div key={x.id} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-sm font-semibold">{x.rule}</span>
                  <Badge
                    className={cn("border-0 font-semibold", policyTones[i % policyTones.length])}
                  >
                    {x.valueLabel}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <QrCode className="text-warning size-5" />
              <p className="font-display mt-3 text-base font-extrabold">QR check-in</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Scan the class code within 10 minutes of start. Your attendance record updates
                instantly.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Dialog open={checkInOpen} onOpenChange={setCheckInOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Check in to class</DialogTitle>
            <DialogDescription>
              Enter the eight-character code shown by your instructor. Codes close automatically
              when the check-in window ends.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitCheckIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="session-code">Class code</Label>
              <Input
                id="session-code"
                value={sessionCode}
                onChange={(event) => setSessionCode(event.target.value.toUpperCase())}
                placeholder="e.g. C15BE081"
                autoComplete="one-time-code"
                autoFocus
                maxLength={80}
                required
              />
              {checkIn.error && (
                <p role="alert" className="text-destructive text-sm font-medium">
                  {checkIn.error.message}
                </p>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setCheckInOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={checkIn.isPending || !sessionCode.trim()}>
                {checkIn.isPending ? "Checking in…" : "Check in"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
