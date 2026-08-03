import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Funnel, Megaphone, Target, TrendingUp, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { useCampaignItems, useFunnelStageItems, useLeadItems } from "@/lib/query/marketing";
import { cn, formatNairaCompact } from "@/lib/utils";

export const Route = createFileRoute("/app/director/marketing")({
  head: () => ({
    meta: [
      { title: "Marketing Overview — CEA-OS" },
      { name: "description", content: "CAC, funnel and campaign ROI for leadership." },
    ],
  }),
  component: DirectorMarketing,
});

function DirectorMarketing() {
  const campaigns = useCampaignItems();
  const funnel = useFunnelStageItems();
  const leads = useLeadItems();

  const spend = campaigns.reduce((s, c) => s + c.spend, 0);
  const cac = leads.length && spend ? Math.round(spend / leads.length) : 0;
  const belowTarget = campaigns.filter((c) => c.roas < 5).length;
  const enrolledStage = funnel.find((f) => /enrol/i.test(f.stage));
  const topStage = funnel[0]?.value ?? 1;
  const conversion =
    enrolledStage && topStage ? Math.round((enrolledStage.value / topStage) * 1000) / 10 : 0;

  const campaignRows = campaigns.slice(0, 6).map((c) => ({
    c: c.name,
    r: `${c.roas}x`,
    t: `target 5x · ${c.leads} leads`,
    tone: c.roas >= 5 ? "bg-success/10 text-success" : "bg-warning/10 text-warning",
  }));

  return (
    <AppShell
      roleKey="admin"
      title="Marketing overview"
      subtitle={`${leads.length} leads · ${formatNairaCompact(spend)} spend · funnel ${conversion}% lead→enrol`}
      actions={
        <>
          <Badge
            className={cn(
              "border-0 font-semibold",
              belowTarget > 0 ? "bg-warning/10 text-warning" : "bg-success/10 text-success",
            )}
          >
            {belowTarget > 0 ? `${belowTarget} below 5x ROAS` : "ROAS on target"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/director">
              <ArrowLeft className="size-4" /> Director portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "CAC",
            value: cac ? formatNairaCompact(cac) : "—",
            delta: `${spend ? formatNairaCompact(spend) : "0"} total spend`,
            icon: Wallet,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Leads",
            value: String(leads.length),
            delta: "in pipeline",
            icon: Funnel,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Lead→enrol",
            value: `${conversion}%`,
            delta: `${funnel.length} funnel stages`,
            icon: Target,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Campaigns",
            value: String(campaigns.length),
            delta: `${belowTarget} below 5x ROAS`,
            icon: Megaphone,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <TrendingUp className="text-primary size-4" /> Campaign ROI
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {campaignRows.map((c) => (
              <div key={c.c} className="flex items-center justify-between rounded-xl border p-3">
                <div>
                  <p className="text-sm font-bold">{c.c}</p>
                  <p className="text-muted-foreground mt-0.5 text-xs">{c.t}</p>
                </div>
                <Badge className={cn("border-0 font-semibold", c.tone)}>ROAS {c.r}</Badge>
              </div>
            ))}
            {campaignRows.length === 0 && (
              <p className="text-muted-foreground py-4 text-center text-sm">No campaigns yet.</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Funnel className="text-primary size-4" /> Funnel
            </CardTitle>
            <Button asChild variant="outline" size="sm" className="font-semibold">
              <Link to="/portal/marketing">
                Marketing portal <ArrowRight className="ml-1 size-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {funnel.map((f) => (
              <div key={f.id}>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>{f.stage}</span>
                  <span>
                    {f.value} · {f.pct}%
                  </span>
                </div>
                <div className="bg-muted mt-1.5 h-2 overflow-hidden rounded-full">
                  <div
                    className="bg-gradient-brand h-full rounded-full"
                    style={{ width: `${Math.max(2, f.pct)}%` }}
                  />
                </div>
              </div>
            ))}
            {funnel.length === 0 && (
              <p className="text-muted-foreground py-4 text-center text-sm">
                No funnel stages yet.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
