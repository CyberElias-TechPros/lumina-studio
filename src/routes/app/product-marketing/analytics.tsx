import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ChartBar, LineChart, Percent, TrendingUp, Wallet } from "lucide-react";
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
import { QueryState } from "@/components/ui/query-state";
import { usePmMonths } from "@/lib/query/productMarketing";
import type { PmMonth } from "@/lib/api/productMarketing";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/product-marketing/analytics")({
  head: () => ({
    meta: [
      { title: "Performance Analytics — CEA-OS" },
      { name: "description", content: "Launch ROI, win rate and pipeline analytics." },
    ],
  }),
  component: PerformanceAnalytics,
});

function PerformanceAnalytics() {
  const monthsQuery = usePmMonths();

  return (
    <AppShell
      roleKey="product-marketing"
      title="Performance analytics"
      subtitle="FY26 · launch ROI tracked per campaign · refreshed daily"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">ROI 4.2x</Badge>
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
            label: "Launch ROI (YTD)",
            value: "4.2x",
            delta: "+0.4 vs FY25",
            icon: LineChart,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Win rate",
            value: "68%",
            delta: "+5 pts QoQ",
            icon: TrendingUp,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Pipeline value",
            value: "₦71m",
            delta: "+8% MoM",
            icon: Wallet,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Attributed signups",
            value: "1,240",
            delta: "via PM campaigns",
            icon: Percent,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <ChartBar className="text-primary size-4" /> Monthly trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <QueryState<PmMonth[]>
              query={monthsQuery}
              error={{ title: "Trends unavailable" }}
              empty={{
                title: "No monthly data",
                description: "Monthly performance trends will appear here.",
              }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(rows) => (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead>Launch ROI</TableHead>
                        <TableHead>Win rate</TableHead>
                        <TableHead>Pipeline</TableHead>
                        <TableHead>Momentum</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rows.map((m) => (
                        <TableRow key={m.id}>
                          <TableCell className="font-semibold">{m.month}</TableCell>
                          <TableCell>{m.roi}</TableCell>
                          <TableCell>{m.winRate}</TableCell>
                          <TableCell className="text-muted-foreground">{m.pipeline}</TableCell>
                          <TableCell className="w-32">
                            <Progress value={m.pct} className="h-1.5" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </>
              )}
            </QueryState>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <LineChart className="text-primary size-4" /> Launch ROI chart
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid h-48 grid-cols-7 items-end gap-2">
              {[38, 52, 45, 61, 58, 72, 66].map((h, i) => (
                <div key={i} className="flex h-full flex-col justify-end gap-1.5">
                  <div
                    className={cn(
                      "rounded-t-md",
                      i === 5 ? "bg-gradient-brand shadow-glow" : "bg-primary/30",
                    )}
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-muted-foreground text-center text-[10px] font-semibold">
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"][i]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
