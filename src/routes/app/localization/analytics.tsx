import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Globe, LineChart, Percent, TrendingUp, Users } from "lucide-react";
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

export const Route = createFileRoute("/app/localization/analytics")({
  head: () => ({
    meta: [
      { title: "Market Analytics — CEA-OS" },
      { name: "description", content: "Per-locale conversion and engagement analytics." },
    ],
  }),
  component: MarketAnalytics,
});

const markets = [
  {
    t: "NG · English",
    conv: "9.2%",
    eng: "4.8min",
    pct: 92,
    trend: "+1.1",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Yoruba",
    conv: "7.4%",
    eng: "3.9min",
    pct: 74,
    trend: "+0.6",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Hausa",
    conv: "6.1%",
    eng: "3.2min",
    pct: 61,
    trend: "+0.4",
    tone: "bg-learning/10 text-learning",
  },
  {
    t: "Nigerian Pidgin",
    conv: "8.8%",
    eng: "4.2min",
    pct: 88,
    trend: "+1.8",
    tone: "bg-warning/10 text-warning",
  },
  { t: "UK", conv: "5.2%", eng: "2.8min", pct: 52, trend: "−0.3", tone: "bg-error/10 text-error" },
];

function MarketAnalytics() {
  return (
    <AppShell
      roleKey="localization"
      title="Market analytics"
      subtitle="Jul 2026 · localized pages only · refreshed daily"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Pidgin +1.8 pts
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/localization">
              <ArrowLeft className="size-4" /> L10n hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Markets measured",
            value: "5",
            delta: "localized pages",
            icon: Globe,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Avg. conversion",
            value: "7.3%",
            delta: "+0.9 pts MoM",
            icon: Percent,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Avg. engagement",
            value: "3.8min",
            delta: "+0.4 min MoM",
            icon: LineChart,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Localized visitors",
            value: "11.2k",
            delta: "+14% MoM",
            icon: Users,
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
            <TrendingUp className="text-primary size-4" /> Per-locale comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Locale</TableHead>
                <TableHead>Conversion</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>vs baseline</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {markets.map((m) => (
                <TableRow key={m.t}>
                  <TableCell className="font-semibold">{m.t}</TableCell>
                  <TableCell className="font-bold">{m.conv}</TableCell>
                  <TableCell className="text-muted-foreground">{m.eng}</TableCell>
                  <TableCell className="w-40">
                    <Progress value={m.pct} className="h-1.5" />
                  </TableCell>
                  <TableCell
                    className={cn(
                      "font-bold",
                      m.trend.startsWith("+") ? "text-success" : "text-error",
                    )}
                  >
                    {m.trend}
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
