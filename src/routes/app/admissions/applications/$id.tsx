import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  FileText,
  MailCheck,
  UserRound,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/admissions/applications/$id")({
  head: () => ({
    meta: [
      { title: "Application — CEA-OS" },
      { name: "description", content: "Application detail view." },
    ],
  }),
  component: AdmissionsApplicationDetail,
});

const docs = [
  { d: "National ID", s: "Verified", tone: "bg-success/10 text-success" },
  { d: "Secondary school cert", s: "Verified", tone: "bg-success/10 text-success" },
  { d: "Passport photo", s: "Pending", tone: "bg-warning/10 text-warning" },
];

function AdmissionsApplicationDetail() {
  return (
    <AppShell
      roleKey="instructor"
      title="Application · Tola Bakare"
      subtitle="Full-Stack Software Development · applied Aug 1"
      actions={
        <>
          <Badge className="bg-primary/10 text-primary border-0 font-semibold">
            Assessment sent
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/admissions/applications">
              <ArrowLeft className="size-4" /> Applications
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <UserRound className="text-primary size-4" /> Applicant
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>
                <span className="text-muted-foreground font-semibold">Name:</span> Tola Bakare
              </p>
              <p>
                <span className="text-muted-foreground font-semibold">Email:</span>{" "}
                tola.bakare@mail.com
              </p>
              <p>
                <span className="text-muted-foreground font-semibold">Program:</span> Full-Stack
                Software Development
              </p>
              <p>
                <span className="text-muted-foreground font-semibold">Source:</span> Referral ·
                TechHub partner
              </p>
              <p>
                <span className="text-muted-foreground font-semibold">Assessment:</span> Sent Aug 2
                · due Aug 9
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <FileText className="text-primary size-4" /> Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="divide-y">
              {docs.map((d) => (
                <div
                  key={d.d}
                  className="flex flex-wrap items-center gap-3 py-3.5 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">{d.d}</p>
                  </div>
                  <Badge className={cn("border-0 font-semibold", d.tone)}>{d.s}</Badge>
                  <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                    <Download className="size-3.5" /> View
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <CheckCircle2 className="text-primary size-4" /> Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                size="sm"
                className="bg-gradient-brand shadow-glow w-full border-0 font-semibold"
              >
                <MailCheck className="size-4" /> Send offer
              </Button>
              <Button variant="outline" size="sm" className="w-full font-semibold">
                Schedule interview
              </Button>
              <Button variant="outline" size="sm" className="w-full font-semibold">
                Add note
              </Button>
              <Button variant="outline" size="sm" className="w-full font-semibold">
                <XCircle className="size-3.5" /> Reject
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <CheckCircle2 className="text-primary size-4" /> Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs font-semibold">
              <p className="text-muted-foreground">Aug 2 · Assessment sent</p>
              <p className="text-muted-foreground">Aug 1 · Application submitted</p>
              <p className="text-muted-foreground">Jul 31 · Referred by TechHub</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
