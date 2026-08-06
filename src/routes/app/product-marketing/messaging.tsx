import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, MessageSquareText, Table2, Target, Users } from "lucide-react";
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
import { QueryState } from "@/components/ui/query-state";
import { usePmMatrix } from "@/lib/query/productMarketing";
import type { PmMatrixRow } from "@/lib/api/productMarketing";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/product-marketing/messaging")({
  head: () => ({
    meta: [
      { title: "Messaging Matrix — CEA-OS" },
      {
        name: "description",
        content: "Product by audience matrix with core messages and proof points.",
      },
    ],
  }),
  component: MessagingMatrix,
});

const statusTones: Record<string, string> = {
  approved: "bg-success/10 text-success",
  "in review": "bg-warning/10 text-warning",
};

function toneFor(status: string): string {
  return statusTones[status.toLowerCase()] ?? "bg-muted-foreground/10 text-muted-foreground";
}

function MessagingMatrix() {
  const matrixQuery = usePmMatrix();

  return (
    <AppShell
      roleKey="product-marketing"
      title="Messaging matrix"
      subtitle="7 products x 9 audiences · 24 approved cells · refresh cycle 6w"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">24 approved</Badge>
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
            label: "Products",
            value: "7",
            delta: "in matrix",
            icon: Table2,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Audiences",
            value: "9",
            delta: "personas mapped",
            icon: Users,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Core messages",
            value: "31",
            delta: "24 approved",
            icon: MessageSquareText,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Proof points",
            value: "26",
            delta: "4 under review",
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
            <Target className="text-primary size-4" /> Matrix cells
          </CardTitle>
        </CardHeader>
        <CardContent>
          <QueryState<PmMatrixRow[]>
            query={matrixQuery}
            error={{ title: "Matrix unavailable" }}
            empty={{
              title: "No matrix cells",
              description: "Product x audience cells will appear here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Audience</TableHead>
                      <TableHead>Core message</TableHead>
                      <TableHead>Proof point</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((m) => (
                      <TableRow key={m.id}>
                        <TableCell className="font-semibold">{m.product}</TableCell>
                        <TableCell>{m.audience}</TableCell>
                        <TableCell className="max-w-[260px]">{m.message}</TableCell>
                        <TableCell className="text-muted-foreground">{m.proof}</TableCell>
                        <TableCell>
                          <Badge className={cn("border-0 font-semibold", toneFor(m.status))}>
                            {m.status}
                          </Badge>
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
    </AppShell>
  );
}
