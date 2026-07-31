import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, CheckCircle2, Clock3, Plane } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/hr/leave")({
  head: () => ({
    meta: [
      { title: "Leave — CEA-OS" },
      { name: "description", content: "Leave requests, balances and calendar." },
    ],
  }),
  component: HrLeave,
});

const requests = [
  {
    r: "T. Bello · annual leave",
    d: "Aug 10–21 · 10 days",
    s: "Approved",
    tone: "bg-success/10 text-success",
  },
  {
    r: "F. Ade · sick leave",
    d: "Aug 3–4 · 2 days",
    s: "Approved",
    tone: "bg-success/10 text-success",
  },
  {
    r: "K. Okafor · study leave",
    d: "Aug 17–28 · 10 days",
    s: "Pending",
    tone: "bg-warning/10 text-warning",
  },
];

function HrLeave() {
  return (
    <AppShell
      roleKey="instructor"
      title="Leave management"
      subtitle="11 open · 7 approved · 4 pending"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Balances healthy
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/hr">
              <ArrowLeft className="size-4" /> HR hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Open requests",
            value: "11",
            delta: "4 pending",
            icon: CalendarDays,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Days requested",
            value: "63",
            delta: "this month",
            icon: Plane,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Approved",
            value: "7",
            delta: "avg 2.4 days",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Avg approval",
            value: "1.1 days",
            delta: "target < 2",
            icon: Clock3,
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
            <CalendarDays className="text-primary size-4" /> Requests
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {requests.map((r) => (
            <div key={r.r} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{r.r}</p>
                <p className="text-muted-foreground text-xs">{r.d}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", r.tone)}>{r.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                {r.s === "Pending" ? "Review" : "View"}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
