"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
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
import { QueryState } from "@/components/ui/query-state";
import { useSessionRole } from "@/lib/auth/session";
import { useMyCertificates } from "@/lib/query/certificates";
import type { CertificateItem } from "@/lib/api/certificates";
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

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function StudentCertificates() {
  const role = useSessionRole();
  const mine = useMyCertificates();
  const items = mine.data?.items ?? [];
  const canIssue = role === "admin";

  return (
    <AppShell
      roleKey="student"
      title="Certificates"
      subtitle="Your certificate records and code lookup"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {mine.data ? `${items.length} records` : "Checking…"}
          </Badge>
          <Button variant="outline" size="sm" className="font-semibold" asChild>
            <Link to="/certificates/verify">
              <LockKeyhole className="size-4" /> Verify a certificate
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Records",
            value: mine.data ? String(items.length) : "—",
            delta: "viewable now",
            icon: Award,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Verifiable",
            value: items.filter((c) => c.code && c.status !== "revoked").length.toString(),
            delta: "via public code check",
            icon: QrCode,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Registry",
            value: "Code lookup",
            delta: "record match only",
            icon: BadgeCheck,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Sharing",
            value: "PDF · Link",
            delta: "print or share a code",
            icon: Share2,
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
              <Award className="text-primary size-4" /> Your certificates
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            {mine.data?.truncated && (
              <p className="text-muted-foreground py-3 text-sm">
                Showing the latest 100 records. Contact the academy for older records.
              </p>
            )}
            <QueryState<CertificateItem[]>
              query={{ ...mine, data: items }}
              error={{ title: "Certificates unavailable" }}
            >
              {(certs) =>
                certs.length === 0 ? (
                  <p className="text-muted-foreground py-6 text-center text-sm">
                    No certificates yet — they appear here once issued.
                  </p>
                ) : (
                  certs.map((c) => (
                    <div
                      key={c.id}
                      className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                    >
                      <span className="bg-success/10 text-success grid size-9 shrink-0 place-items-center rounded-lg">
                        <Award className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold">{c.title}</p>
                        <p className="text-muted-foreground text-xs">
                          Cyber Elias Academy · Issued {formatDate(c.issuedAt)}
                        </p>
                        <p className="text-muted-foreground mt-0.5 font-mono text-[11px]">
                          {c.code}
                        </p>
                      </div>
                      <Badge
                        className={cn(
                          "border-0 font-semibold",
                          c.status === "revoked"
                            ? "bg-destructive/10 text-destructive"
                            : c.status === "legacy"
                              ? "bg-muted text-muted-foreground"
                              : "bg-success/10 text-success",
                        )}
                      >
                        {c.status === "revoked"
                          ? "Revoked"
                          : c.status === "legacy"
                            ? "Legacy record"
                            : "Issued"}
                      </Badge>
                      <div className="flex shrink-0 gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="font-semibold"
                          disabled={c.status === "revoked"}
                          onClick={() => window.print()}
                          title="Open the browser print dialog, then choose Save as PDF"
                        >
                          <Download className="size-3.5" /> Print / save PDF
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary font-semibold"
                          asChild
                        >
                          <Link to="/certificates/verify" search={{ code: c.code }}>
                            <ExternalLink className="size-3.5" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))
                )
              }
            </QueryState>
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
                <Link to="/certificates/verify" className="text-primary font-semibold underline">
                  /certificates/verify
                </Link>{" "}
                using its code — no account needed. A match shows a registry entry, not proof of
                eligibility.
              </p>
              {[
                {
                  t: "Code lookup",
                  v: "CEA-XXXXXXXX-XXXXXXXX",
                  tone: "bg-primary/10 text-primary",
                },
                { t: "Registry", v: "backend-verified", tone: "bg-success/10 text-success" },
              ].map((x) => (
                <div key={x.t} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-sm font-semibold">{x.t}</span>
                  <Badge className={cn("border-0 font-semibold", x.tone)}>{x.v}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {canIssue && (
            <Card className="bg-card shadow-soft border">
              <CardContent className="p-6">
                <p className="font-semibold">Review and issue certificates</p>
                <p className="text-muted-foreground mt-1 text-sm">
                  Review eligibility independently before issuing or revoking a record.
                </p>
                <Button asChild variant="outline" className="mt-3">
                  <Link to="/app/admin/users">Open user management</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AppShell>
  );
}
