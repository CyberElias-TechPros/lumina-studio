import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  CheckCircle2,
  Clock4,
  FileSignature,
  UserRoundPlus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/director/approvals")({
  head: () => ({
    meta: [
      { title: "Approvals — CEA-OS" },
      {
        name: "description",
        content: "Budgets, hires, partnerships and purchase orders awaiting approval.",
      },
    ],
  }),
  component: DirectorApprovals,
});

const items = [
  {
    t: "Marketing budget + ₦1.4m",
    by: "Marketing lead · 2d ago",
    kind: "Budget",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Hire — DevOps instructor (Lagos)",
    by: "Dept head · 3d ago",
    kind: "Hire",
    tone: "bg-learning/10 text-learning",
  },
  {
    t: "Partnership — TechHub skills",
    by: "Ops manager · 1d ago",
    kind: "Partnership",
    tone: "bg-success/10 text-success",
  },
  {
    t: "PO-2413 toner + paper",
    by: "Store · today",
    kind: "Purchase order",
    tone: "bg-warning/10 text-warning",
  },
];

function DirectorApprovals() {
  return (
    <AppShell
      roleKey="admin"
      title="Approvals"
      subtitle="6 pending · 3 waiting > 48h · SLA 24h"
      actions={
        <>
          <Badge className="bg-warning/10 text-warning border-0 font-semibold">3 overdue</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/director">
              <ArrowLeft className="size-4" /> Director portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Pending",
            value: "6",
            delta: "1 critical",
            icon: Clock4,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Approved (30d)",
            value: "23",
            delta: "avg 1.2 days",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Value in queue",
            value: "₦2.8m",
            delta: "3 requests",
            icon: Banknote,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Delegated",
            value: "2",
            delta: "to deputy",
            icon: UserRoundPlus,
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
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <FileSignature className="text-primary size-4" /> Waiting on you
          </CardTitle>
          <Badge variant="secondary" className="font-semibold">
            Sort: oldest first
          </Badge>
        </CardHeader>
        <CardContent className="divide-y">
          {items.map((i) => (
            <div key={i.t} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{i.t}</p>
                <p className="text-muted-foreground text-xs">{i.by}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", i.tone)}>{i.kind}</Badge>
              <Button
                size="sm"
                className="bg-gradient-brand shadow-glow shrink-0 border-0 font-semibold"
              >
                Approve
              </Button>
              <Button asChild variant="outline" size="sm" className="shrink-0 font-semibold">
                <Link to="/app/director/command-center">
                  Review <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
