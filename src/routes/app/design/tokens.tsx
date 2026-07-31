import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Palette, Pipette, Ruler, SlidersHorizontal, Type } from "lucide-react";
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

export const Route = createFileRoute("/app/design/tokens")({
  head: () => ({
    meta: [
      { title: "Design Tokens — CEA-OS" },
      { name: "description", content: "Color, spacing and type token tables with values." },
    ],
  }),
  component: TokenEditor,
});

const colorTokens = [
  { t: "primary", v: "hsl(24 94% 53%)", hex: "#F97316", deprecated: false, tone: "bg-primary" },
  {
    t: "brand",
    v: "hsl(24 94% 53%)",
    hex: "#F97316",
    deprecated: false,
    tone: "bg-gradient-brand",
  },
  { t: "success", v: "hsl(142 71% 45%)", hex: "#22C55E", deprecated: false, tone: "bg-success" },
  { t: "warning", v: "hsl(48 96% 53%)", hex: "#EAB308", deprecated: false, tone: "bg-warning" },
  { t: "ink", v: "hsl(222 47% 11%)", hex: "#0F172A", deprecated: false, tone: "bg-ink" },
  {
    t: "royal-blue",
    v: "hsl(221 83% 53%)",
    hex: "#2563EB",
    deprecated: true,
    tone: "bg-primary/40",
  },
];

const typeTokens = [
  {
    t: "display-2xl",
    v: "48px / 52px · extrabold",
    family: "Fraunces",
    status: "Active",
    tone: "bg-success/10 text-success",
  },
  {
    t: "heading-xl",
    v: "30px / 36px · bold",
    family: "Inter",
    status: "Active",
    tone: "bg-success/10 text-success",
  },
  {
    t: "body-base",
    v: "16px / 24px · regular",
    family: "Inter",
    status: "Active",
    tone: "bg-success/10 text-success",
  },
  {
    t: "caption-sm",
    v: "12px / 16px · semibold",
    family: "Inter",
    status: "Active",
    tone: "bg-success/10 text-success",
  },
  {
    t: "label-xs",
    v: "10px / 14px · bold",
    family: "Inter",
    status: "Deprecated",
    tone: "bg-error/10 text-error",
  },
];

function TokenEditor() {
  return (
    <AppShell
      roleKey="design"
      title="Design token editor"
      subtitle="212 tokens · 6 deprecated · last edit 2h ago by Ada Obi"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">98% adopted</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/design">
              <ArrowLeft className="size-4" /> Design hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Color tokens",
            value: "142",
            delta: "9 groups",
            icon: Pipette,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Spacing steps",
            value: "12",
            delta: "4px base scale",
            icon: Ruler,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Type styles",
            value: "24",
            delta: "3 families",
            icon: Type,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Deprecated",
            value: "6",
            delta: "2 removed this wk",
            icon: SlidersHorizontal,
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
              <Palette className="text-primary size-4" /> Color tokens
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Token</TableHead>
                  <TableHead>Swatch</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Hex</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {colorTokens.map((c) => (
                  <TableRow key={c.t}>
                    <TableCell className="font-mono text-xs font-bold">{c.t}</TableCell>
                    <TableCell>
                      <span className={cn("inline-block size-6 rounded-md border", c.tone)} />
                    </TableCell>
                    <TableCell className="font-mono text-xs">{c.v}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {c.hex}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          "border-0 font-semibold",
                          c.deprecated ? "bg-error/10 text-error" : "bg-success/10 text-success",
                        )}
                      >
                        {c.deprecated ? "Deprecated" : "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Type className="text-primary size-4" /> Type scale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Token</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {typeTokens.map((t) => (
                  <TableRow key={t.t}>
                    <TableCell className="font-mono text-xs font-bold">{t.t}</TableCell>
                    <TableCell className="text-muted-foreground">{t.v}</TableCell>
                    <TableCell>
                      <Badge className={cn("border-0 font-semibold", t.tone)}>{t.status}</Badge>
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
