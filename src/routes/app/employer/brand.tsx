import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Building2, CheckCircle2, Globe2, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import {
  useInterviewItems,
  usePostingItems,
  useTalentCandidateItems,
} from "@/lib/query/recruitment";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/employer/brand")({
  head: () => ({
    meta: [
      { title: "Brand Page — CEA-OS" },
      { name: "description", content: "Your company profile on the academy talent network." },
    ],
  }),
  component: EmployerBrand,
});

function EmployerBrand() {
  const postings = usePostingItems();
  const talent = useTalentCandidateItems();
  const interviews = useInterviewItems();

  const facts = [
    { t: "Open roles", v: String(postings.length), tone: "bg-primary/10 text-primary" },
    { t: "Verified candidates", v: String(talent.length), tone: "bg-learning/10 text-learning" },
    {
      t: "Interviews completed",
      v: String(interviews.filter((i) => i.status === "Completed").length),
      tone: "bg-success/10 text-success",
    },
    { t: "Avg. time to hire", v: "34 days", tone: "bg-warning/10 text-warning" },
  ];

  return (
    <AppShell
      roleKey="employer"
      title="Brand page"
      subtitle="How candidates see your company"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Profile complete 90%
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/employer/hub">
              <ArrowLeft className="size-4" /> Employer hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center gap-4">
              <span className="bg-primary/10 text-primary grid size-14 place-items-center rounded-2xl">
                <Building2 className="size-7" />
              </span>
              <div>
                <p className="font-display text-lg font-extrabold">Paystack Technologies</p>
                <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                  <Globe2 className="size-3.5" /> Lagos · Fintech · 320 employees
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
              We're building payments infrastructure for Africa. Our engineering team ships products
              used by 400,000+ businesses — and we hire straight from CEA cohorts. Junior engineers
              get a 12-week onboarding with a dedicated senior mentor.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Payments", "Fintech", "Node.js", "Go", "Lagos", "Hybrid"].map((t) => (
                <Badge key={t} variant="secondary" className="font-semibold">
                  {t}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Users className="text-primary size-4" /> Quick facts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {facts.map((f) => (
                <div key={f.t} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-sm font-semibold">{f.t}</span>
                  <Badge className={cn("border-0 font-semibold", f.tone)}>{f.v}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <CheckCircle2 className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Featured employer</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Featured employers appear at the top of the talent marketplace and career day
                sessions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
