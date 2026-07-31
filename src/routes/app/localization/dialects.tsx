import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Globe, MapPin, MessageSquareText, Percent, Users } from "lucide-react";
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

export const Route = createFileRoute("/app/localization/dialects")({
  head: () => ({
    meta: [
      { title: "Dialect Variants — CEA-OS" },
      { name: "description", content: "Dialect groups with variant rows and coverage." },
    ],
  }),
  component: DialectManager,
});

const groups = [
  {
    t: "Nigerian English",
    variants: ["Standard en-NG", "Lagos urban", "Academic"],
    coverage: "92%",
    status: "Complete",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Yoruba",
    variants: ["Èkó", "Ọ̀yọ́", "Èkìtì"],
    coverage: "78%",
    status: "In progress",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Hausa",
    variants: ["Kano", "Sokoto", "Kaduna"],
    coverage: "64%",
    status: "In progress",
    tone: "bg-warning/10 text-warning",
  },
  {
    t: "Nigerian Pidgin",
    variants: ["Lagos", "Port Harcourt", "Warri"],
    coverage: "41%",
    status: "Draft",
    tone: "bg-muted-foreground/10 text-muted-foreground",
  },
];

function DialectManager() {
  return (
    <AppShell
      roleKey="localization"
      title="Dialect manager"
      subtitle="4 groups · 12 variants · coverage 68% overall"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">2 groups done</Badge>
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
            label: "Dialect groups",
            value: "4",
            delta: "NG core + Pidgin",
            icon: MessageSquareText,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Variants",
            value: "12",
            delta: "3 new this qtr",
            icon: Globe,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Avg. coverage",
            value: "68%",
            delta: "target 85%",
            icon: Percent,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Speakers reached",
            value: "18.4k",
            delta: "est. monthly",
            icon: Users,
            tone: "bg-success/10 text-success",
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
            <MapPin className="text-primary size-4" /> Dialect groups
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Group</TableHead>
                <TableHead>Variants</TableHead>
                <TableHead>Coverage</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groups.map((g) => (
                <TableRow key={g.t}>
                  <TableCell className="font-semibold">{g.t}</TableCell>
                  <TableCell className="text-muted-foreground">{g.variants.join(" · ")}</TableCell>
                  <TableCell className="w-40">
                    <div className="flex items-center gap-2">
                      <Progress value={parseInt(g.coverage)} className="h-1.5 flex-1" />
                      <span className="text-xs font-bold">{g.coverage}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("border-0 font-semibold", g.tone)}>{g.status}</Badge>
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
