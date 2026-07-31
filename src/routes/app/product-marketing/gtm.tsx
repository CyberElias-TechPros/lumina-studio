import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Flag,
  ListTodo,
  Rocket,
  Target,
  UserRound,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/product-marketing/gtm")({
  head: () => ({
    meta: [
      { title: "GTM Planner — CEA-OS" },
      { name: "description", content: "Launch phases, timelines and task checklists." },
    ],
  }),
  component: GtmPlanner,
});

const phases = [
  {
    name: "Parent app · Beta",
    phase: "Phase 1 · Discovery",
    pct: 100,
    tone: "bg-success/10 text-success",
    status: "Complete",
  },
  {
    name: "Parent app · Beta",
    phase: "Phase 2 · Build & validate",
    pct: 64,
    tone: "bg-primary/10 text-primary",
    status: "In progress",
  },
  {
    name: "Employer talent pass",
    phase: "Phase 3 · Launch",
    pct: 12,
    tone: "bg-warning/10 text-warning",
    status: "Upcoming",
  },
];

const tasks = [
  {
    t: "Beta waitlist page live",
    o: "Chiamaka Eze",
    s: "Done",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Pricing FAQ for beta cohort",
    o: "Tunde Bakare",
    s: "In review",
    tone: "bg-warning/10 text-warning",
  },
  {
    t: "Store listing screenshots",
    o: "Ada Obi",
    s: "Doing",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Launch blog + social kit",
    o: "Ngozi Adeyemi",
    s: "Todo",
    tone: "bg-muted-foreground/10 text-muted-foreground",
  },
];

function GtmPlanner() {
  return (
    <AppShell
      roleKey="product-marketing"
      title="GTM planner"
      subtitle="3 launches · 2 phases in flight · next launch Aug 14"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">On track</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/product-marketing">
              <ArrowLeft className="size-4" /> PM hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Active launches",
            value: "3",
            delta: "1 in beta",
            icon: Rocket,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Tasks done",
            value: "38/52",
            delta: "73% complete",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Days to launch",
            value: "14",
            delta: "parent app beta",
            icon: CalendarDays,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Gate owners",
            value: "6",
            delta: "all confirmed",
            icon: UserRound,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Flag className="text-primary size-4" /> Launch phases & timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {phases.map((p) => (
              <div key={p.name + p.phase}>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-sm font-bold">{p.phase}</span>
                  <Badge className={cn("border-0 font-semibold", p.tone)}>{p.status}</Badge>
                </div>
                <div className="text-muted-foreground mt-0.5 text-xs">{p.name}</div>
                <Progress value={p.pct} className="mt-1.5 h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <ListTodo className="text-primary size-4" /> Task checklist · beta build
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.map((t) => (
              <div key={t.t} className="flex items-center justify-between rounded-xl border p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{t.t}</p>
                  <p className="text-muted-foreground text-xs">{t.o}</p>
                </div>
                <Badge className={cn("border-0 font-semibold", t.tone)}>{t.s}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Target className="text-primary size-4" /> Gate checklist by phase
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Phase</TableHead>
                <TableHead>Gate</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Due</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  p: "Discovery",
                  g: "Market sizing sign-off",
                  o: "Emeka Okafor",
                  d: "Jun 12",
                  s: "Done",
                  tone: "bg-success/10 text-success",
                },
                {
                  p: "Build",
                  g: "Beta waitlist ≥ 500",
                  o: "Ada Obi",
                  d: "Jul 25",
                  s: "On track",
                  tone: "bg-primary/10 text-primary",
                },
                {
                  p: "Build",
                  g: "Onboarding walkthrough QA",
                  o: "Tunde Bakare",
                  d: "Aug 02",
                  s: "At risk",
                  tone: "bg-warning/10 text-warning",
                },
                {
                  p: "Launch",
                  g: "Release approval",
                  o: "Chiamaka Eze",
                  d: "Aug 14",
                  s: "Planned",
                  tone: "bg-muted-foreground/10 text-muted-foreground",
                },
              ].map((r) => (
                <TableRow key={r.g}>
                  <TableCell className="font-semibold">{r.p}</TableCell>
                  <TableCell>{r.g}</TableCell>
                  <TableCell className="text-muted-foreground">{r.o}</TableCell>
                  <TableCell className="text-muted-foreground">{r.d}</TableCell>
                  <TableCell>
                    <Badge className={cn("border-0 font-semibold", r.tone)}>{r.s}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppShell>
  );
}
