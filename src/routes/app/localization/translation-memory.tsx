import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Database, Files, Percent, Search } from "lucide-react";
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

export const Route = createFileRoute("/app/localization/translation-memory")({
  head: () => ({
    meta: [
      { title: "Translation Memory — CEA-OS" },
      { name: "description", content: "Source and target pairs with match percentages." },
    ],
  }),
  component: TranslationMemory,
});

const pairs = [
  {
    src: "Build skills Lagos employers pay for",
    target: "Kọ́ àwọn kọ́ǹkà tí àwọn agbanisiṣẹ́ Lagos sanwó fún",
    locale: "yo-NG",
    match: "98%",
    status: "Approved",
    tone: "bg-success/10 text-success",
  },
  {
    src: "From Lagos classroom to global job",
    target: "Daga ajin Lagos zuwa aikin duniya",
    locale: "ha-NG",
    match: "96%",
    status: "Approved",
    tone: "bg-success/10 text-success",
  },
  {
    src: "Your streak is on the line, Ada",
    target: "Ada, nudge dey hold your streak",
    locale: "pcm-NG",
    match: "89%",
    status: "In review",
    tone: "bg-warning/10 text-warning",
  },
  {
    src: "Pay in instalments from ₦120k",
    target: "Futa kwa awufu kuanzia ₦120k",
    locale: "sw-KE",
    match: "72%",
    status: "Draft",
    tone: "bg-primary/10 text-primary",
  },
];

function TranslationMemory() {
  return (
    <AppShell
      roleKey="localization"
      title="Translation memory"
      subtitle="1,900 segments · 1,240 translated · 96% avg match"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">96% match</Badge>
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
            label: "Segments",
            value: "1,900",
            delta: "across 4 markets",
            icon: Database,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Translated",
            value: "1,240",
            delta: "65% complete",
            icon: Files,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Avg. match",
            value: "96%",
            delta: "fuzzy ≥ 85%",
            icon: Percent,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Approved",
            value: "1,180",
            delta: "60 pending",
            icon: CheckCircle2,
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
            <Search className="text-primary size-4" /> Recent segments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Locale</TableHead>
                <TableHead>Match</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pairs.map((p) => (
                <TableRow key={p.src}>
                  <TableCell className="max-w-[240px] font-semibold">{p.src}</TableCell>
                  <TableCell className="max-w-[260px] text-muted-foreground">{p.target}</TableCell>
                  <TableCell className="font-mono text-xs font-bold">{p.locale}</TableCell>
                  <TableCell className="font-bold">{p.match}</TableCell>
                  <TableCell>
                    <Badge className={cn("border-0 font-semibold", p.tone)}>{p.status}</Badge>
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
