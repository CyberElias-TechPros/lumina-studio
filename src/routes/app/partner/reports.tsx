import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BarChart3, FileBarChart2, Handshake, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/partner/reports")({
  head: () => ({
    meta: [
      { title: "Reports — CEA-OS" },
      { name: "description", content: "Impact and revenue share reports." },
    ],
  }),
  component: PartnerReports,
});

const reports = [
  { r: "Q3 revenue share statement", d: "Aug 2 · PDF", tone: "bg-success/10 text-success" },
  { r: "Referral impact report", d: "Jul 31 · PDF", tone: "bg-primary/10 text-primary" },
  { r: "Co-branded event recap", d: "Jul 20 · Slides", tone: "bg-learning/10 text-learning" },
];

function PartnerReports() {
  return (
    <AppShell
      roleKey="student"
      title="Reports & impact"
      subtitle="Revenue share ₦1.9m Q3 · 1,400 people reached"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Monthly on time
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/partner/hub">
              <ArrowLeft className="size-4" /> Partner hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Revenue share",
            value: "₦1.9m",
            delta: "Q3 to date",
            icon: Handshake,
            tone: "bg-success/10 text-success",
          },
          {
            label: "People reached",
            value: "1,400",
            delta: "events + campaigns",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Referral value",
            value: "₦720k",
            delta: "attributed",
            icon: TrendingUp,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Reports (30d)",
            value: "3",
            delta: "all delivered",
            icon: BarChart3,
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
            <FileBarChart2 className="text-primary size-4" /> Latest reports
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
