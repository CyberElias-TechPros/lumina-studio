import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FileBarChart2, Landmark, ReceiptText, TrendingUp, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/accountant/reports")({
  head: () => ({
    meta: [
      { title: "Reports — CEA-OS" },
      { name: "description", content: "P&L, balance sheet, cash flow and tax reports." },
    ],
  }),
  component: AccountantReports,
});

const reports = [
  { r: "Profit & loss — July", d: "Generated Aug 1", tone: "bg-success/10 text-success" },
  { r: "Balance sheet — Q2", d: "Generated Jul 31", tone: "bg-primary/10 text-primary" },
  { r: "Cash flow — July", d: "Generated Aug 1", tone: "bg-learning/10 text-learning" },
  { r: "VAT & PAYE filing pack", d: "Due Aug 15", tone: "bg-warning/10 text-warning" },
];

function AccountantReports() {
  return (
    <AppShell
      roleKey="instructor"
      title="Reports"
      subtitle="Monthly close done · all reports current"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Close verified
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/accountant">
              <ArrowLeft className="size-4" /> Finance hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Revenue (July)",
            value: "₦18.6m",
            delta: "+18% MoM",
            icon: TrendingUp,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Expenses (July)",
            value: "₦13.5m",
            delta: "−2% MoM",
            icon: ReceiptText,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Cash flow",
            value: "+₦3.1m",
            delta: "net operating",
            icon: Wallet,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Tax position",
            value: "Current",
            delta: "VAT + PAYE",
            icon: Landmark,
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

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <FileBarChart2 className="text-primary size-4" /> Financial statements
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {reports.map((r) => (
            <div key={r.r} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{r.r}</p>
                <p className="text-muted-foreground text-xs">{r.d}</p>
              </div>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Open
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
