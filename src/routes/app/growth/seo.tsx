import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FileText, ListChecks, Search, Target, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export const Route = createFileRoute("/app/growth/seo")({
  head: () => ({
    meta: [
      { title: "SEO Planner — CEA-OS" },
      { name: "description", content: "Keyword clusters and content items with rank and volume." },
    ],
  }),
  component: SeoPlanner,
});

const clusters = [
  {
    t: "Bootcamps in Lagos",
    vol: "4,800",
    rank: "3",
    trend: "+2",
    priority: "High",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Data analytics courses Nigeria",
    vol: "2,900",
    rank: "7",
    trend: "+1",
    priority: "High",
    tone: "bg-success/10 text-success",
  },
  {
    t: "UX design certification",
    vol: "1,600",
    rank: "11",
    trend: "−2",
    priority: "Medium",
    tone: "bg-warning/10 text-warning",
  },
  {
    t: "Scholarships for tech in Nigeria",
    vol: "3,200",
    rank: "9",
    trend: "+4",
    priority: "Medium",
    tone: "bg-learning/10 text-learning",
  },
  {
    t: "Employer talent programs",
    vol: "720",
    rank: "5",
    trend: "0",
    priority: "Low",
    tone: "bg-muted-foreground/10 text-muted-foreground",
  },
];

function SeoPlanner() {
  return (
    <AppShell
      roleKey="growth"
      title="SEO content planner"
      subtitle="12 clusters · 34 items · 41% of pages in top-10"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">41% top-10</Badge>
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
            label: "Keywords tracked",
            value: "148",
            delta: "14 clusters",
            icon: Search,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Pages top-10",
            value: "34",
            delta: "41% of tracked",
            icon: TrendingUp,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Monthly clicks",
            value: "18.4k",
            delta: "+9% MoM",
            icon: Target,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "High priority",
            value: "6",
            delta: "items due this wk",
            icon: ListChecks,
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
            <FileText className="text-primary size-4" /> Keyword clusters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cluster</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Rank</TableHead>
                <TableHead>Trend</TableHead>
                <TableHead>Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clusters.map((c) => (
                <TableRow key={c.t}>
                  <TableCell className="font-semibold">{c.t}</TableCell>
                  <TableCell className="text-muted-foreground">{c.vol}/mo</TableCell>
                  <TableCell className="font-bold">#{c.rank}</TableCell>
                  <TableCell
                    className={cn(
                      "font-semibold",
                      c.trend.startsWith("+")
                        ? "text-success"
                        : c.trend.startsWith("−")
                          ? "text-error"
                          : "text-muted-foreground",
                    )}
                  >
                    {c.trend}
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("border-0 font-semibold", c.tone)}>{c.priority}</Badge>
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
