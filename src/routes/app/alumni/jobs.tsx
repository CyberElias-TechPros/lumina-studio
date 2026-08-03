import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BriefcaseBusiness, ExternalLink, Send, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { usePostingItems } from "@/lib/query/recruitment";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/alumni/jobs")({
  head: () => ({
    meta: [
      { title: "Alumni Job Board — CEA-OS" },
      { name: "description", content: "Browse jobs and refer fellow alumni." },
    ],
  }),
  component: AlumniJobs,
});

function AlumniJobs() {
  const postings = usePostingItems();

  const open = postings.filter((p) => p.status === "Open");
  const applications = postings.reduce((s, p) => s + p.applicants, 0);
  const referrals = postings.reduce((s, p) => s + p.views, 0);

  const jobs = postings.slice(0, 8).map((p) => ({
    t: p.title,
    c: "via CEA-OS",
    s: p.detail,
    y: `${p.applicants} applicants`,
    via: p.status === "Open" ? "Alumni referral" : "Employer post",
    tone: p.status === "Open" ? "bg-warning/10 text-warning" : "bg-primary/10 text-primary",
  }));

  return (
    <AppShell
      roleKey="instructor"
      title="Alumni job board"
      subtitle={`${postings.length} roles · ${open.length} open · ${applications} applications`}
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {open.length} open
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/alumni/hub">
              <ArrowLeft className="size-4" /> Alumni hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Open roles",
            value: String(open.length),
            delta: `of ${postings.length} total`,
            icon: BriefcaseBusiness,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Referral bonus",
            value: "₦100k",
            delta: "per successful hire",
            icon: Send,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Applications",
            value: String(applications),
            delta: "across all roles",
            icon: Users,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Listing views",
            value: String(referrals),
            delta: "referral exposure",
            icon: ExternalLink,
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
            <BriefcaseBusiness className="text-primary size-4" /> Featured roles
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {jobs.map((j) => (
            <div key={j.t} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                <BriefcaseBusiness className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{j.t}</p>
                <p className="text-muted-foreground text-xs">
                  {j.c} · {j.s} · {j.y}
                </p>
              </div>
              <Badge className={cn("border-0 font-semibold", j.tone)}>{j.via}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Refer
              </Button>
            </div>
          ))}
          {jobs.length === 0 && (
            <p className="text-muted-foreground py-4 text-center text-sm">
              No postings yet — check back soon.
            </p>
          )}
        </CardContent>
      </Card>
    </AppShell>
  );
}
