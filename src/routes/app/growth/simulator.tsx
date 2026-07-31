import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calculator,
  LineChart,
  SlidersHorizontal,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export const Route = createFileRoute("/app/growth/simulator")({
  head: () => ({
    meta: [
      { title: "Growth Simulator — CEA-OS" },
      { name: "description", content: "Model spend and conversion scenarios for growth." },
    ],
  }),
  component: GrowthSimulator,
});

const scenarios = [
  {
    t: "Base case",
    spend: "₦12m/qtr",
    conv: "16%",
    users: "612",
    cac: "₦64k",
    rev: "₦48.9m",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Referral push",
    spend: "₦14.5m/qtr",
    conv: "19%",
    users: "748",
    cac: "₦58k",
    rev: "₦59.8m",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Meta-heavy",
    spend: "₦16m/qtr",
    conv: "14%",
    users: "712",
    cac: "₦71k",
    rev: "₦56.9m",
    tone: "bg-warning/10 text-warning",
  },
  {
    t: "Radio + OOH push",
    spend: "₦13.5m/qtr",
    conv: "13%",
    users: "580",
    cac: "₦82k",
    rev: "₦46.4m",
    tone: "bg-muted-foreground/10 text-muted-foreground",
  },
];

function GrowthSimulator() {
  return (
    <AppShell
      roleKey="growth"
      title="Growth simulator"
      subtitle="Q4 2026 plan · model run Aug 1 · sensitivity ±15%"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Referral push wins
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/growth">
              <ArrowLeft className="size-4" /> Growth hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Budget under test",
            value: "₦56m",
            delta: "4 scenarios",
            icon: Wallet,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Best projected CAC",
            value: "₦58k",
            delta: "referral scenario",
            icon: SlidersHorizontal,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Best projected users",
            value: "748",
            delta: "per quarter",
            icon: TrendingUp,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Model runs",
            value: "23",
            delta: "this month",
            icon: Calculator,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_1.5fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <SlidersHorizontal className="text-primary size-4" /> Inputs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {[
              { l: "Monthly spend", v: "₦4.0m", pct: 57 },
              { l: "Visitor→lead conversion", v: "16%", pct: 64 },
              { l: "Lead→activation", v: "64%", pct: 64 },
              { l: "Average fee per learner", v: "₦680k", pct: 72 },
            ].map((x) => (
              <div key={x.l}>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <Label className="text-muted-foreground text-xs font-semibold">{x.l}</Label>
                  <span className="font-display font-extrabold">{x.v}</span>
                </div>
                <Input
                  type="range"
                  min={0}
                  max={100}
                  defaultValue={x.pct}
                  className="mt-2 h-2 accent-primary"
                />
                <Progress value={x.pct} className="mt-1.5 h-1" />
              </div>
            ))}
            <Button
              size="sm"
              className="bg-gradient-brand shadow-glow w-full border-0 font-semibold"
            >
              Run scenario
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <LineChart className="text-primary size-4" /> Projected output
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Scenario</TableHead>
                  <TableHead>Spend</TableHead>
                  <TableHead>Conv.</TableHead>
                  <TableHead>Learners</TableHead>
                  <TableHead>CAC</TableHead>
                  <TableHead>Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scenarios.map((s) => (
                  <TableRow key={s.t}>
                    <TableCell className="font-semibold">{s.t}</TableCell>
                    <TableCell className="text-muted-foreground">{s.spend}</TableCell>
                    <TableCell>{s.conv}</TableCell>
                    <TableCell className="font-bold">{s.users}</TableCell>
                    <TableCell className="text-muted-foreground">{s.cac}</TableCell>
                    <TableCell>
                      <Badge className={cn("border-0 font-semibold", s.tone)}>{s.rev}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
