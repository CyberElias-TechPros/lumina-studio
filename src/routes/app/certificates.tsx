import { createFileRoute } from "@tanstack/react-router";
import {
  Award,
  BadgeCheck,
  Download,
  ExternalLink,
  LockKeyhole,
  QrCode,
  Share2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/certificates")({
  head: () => ({
    meta: [
      { title: "Certificates — CEA-OS" },
      { name: "description", content: "Your certificates — view, verify and share." },
    ],
  }),
  component: StudentCertificates,
});

const certs = [
  {
    name: "Full-Stack Software Development — Fundamentals",
    issuer: "Cyber Elias Academy · NUC-accredited",
    date: "Issued May 18, 2026",
    code: "CEA-CERT-2026-8F3K",
    status: "Issued",
    tone: "bg-success/10 text-success",
  },
  {
    name: "Cloud Engineering & DevOps",
    issuer: "Cyber Elias Academy",
    date: "Est. completion Nov 2026",
    code: "In progress",
    status: "In progress",
    tone: "bg-warning/10 text-warning",
  },
  {
    name: "Career Readiness Passport",
    issuer: "Career Services Office",
    date: "Issued Mar 2026",
    code: "CEA-CERT-2026-2T9Q",
    status: "Issued",
    tone: "bg-success/10 text-success",
  },
];

function StudentCertificates() {
  return (
    <AppShell
      roleKey="student"
      title="Certificates"
      subtitle="Verified credentials — shareable, checkable, unforgeable"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            2 issued · 1 in progress
          </Badge>
          <Button variant="outline" size="sm" className="font-semibold">
            <LockKeyhole className="size-4" /> How verification works
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Issued",
            value: "2",
            delta: "viewable now",
            icon: Award,
            tone: "bg-success/10 text-success",
          },
          {
            label: "In progress",
            value: "1",
            delta: "est. Nov 2026",
            icon: BadgeCheck,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Verifications",
            value: "6",
            delta: "by employers",
            icon: QrCode,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Shares",
            value: "4",
            delta: "LinkedIn · 3",
            icon: Share2,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Award className="text-primary size-4" /> Your certificates
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            {certs.map((c) => (
              <div
                key={c.name}
                className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
              >
                <span className={cn("grid size-9 shrink-0 place-items-center rounded-lg", c.tone)}>
                  <Award className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{c.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {c.issuer} · {c.date}
                  </p>
                  <p className="text-muted-foreground mt-0.5 font-mono text-[11px]">{c.code}</p>
                </div>
                <Badge className={cn("border-0 font-semibold", c.tone)}>{c.status}</Badge>
                {c.status === "Issued" && (
                  <div className="flex shrink-0 gap-1">
                    <Button variant="outline" size="sm" className="font-semibold">
                      <Download className="size-3.5" /> PDF
                    </Button>
                    <Button variant="ghost" size="sm" className="text-primary font-semibold">
                      <ExternalLink className="size-3.5" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <QrCode className="text-primary size-4" /> Verify a certificate
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground text-xs leading-relaxed">
                Anyone can check a certificate at{" "}
                <strong className="text-foreground">/certificates/verify</strong> using its QR code
                or unique code — no account needed.
              </p>
              {[
                { t: "QR scan", v: "Instant", tone: "bg-success/10 text-success" },
                { t: "Code lookup", v: "CEA-CERT-2026-…", tone: "bg-primary/10 text-primary" },
                { t: "Tamper check", v: "Hash-verified", tone: "bg-learning/10 text-learning" },
              ].map((x) => (
                <div key={x.t} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-sm font-semibold">{x.t}</span>
                  <Badge className={cn("border-0 font-semibold", x.tone)}>{x.v}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <BadgeCheck className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Degree + skills</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Certificates carry your OSKM skills record, so employers see what you can do — not
                just what you studied.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
