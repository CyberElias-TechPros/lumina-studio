import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  BadgeCheck,
  Download,
  ExternalLink,
  LockKeyhole,
  Plus,
  QrCode,
  ScrollText,
  Share2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useSessionRole } from "@/lib/auth/session";
import { useCourses } from "@/lib/query/courses";
import {
  useCertificateCandidates,
  useIssueCertificate,
  useMyCertificates,
} from "@/lib/query/certificates";
import type { CertificateItem } from "@/lib/api/certificates";
import { cn } from "@/lib/utils";
import { ApiError } from "@/lib/errors";

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

function errorMessage(err: unknown): string | null {
  if (err instanceof ApiError) return err.message;
  return err instanceof Error ? err.message : null;
}

function StudentCertificates() {
  const role = useSessionRole();
  const mine = useMyCertificates();
  const items = mine.data?.items ?? [];
  const canIssue = role === "instructor" || role === "admin";

  return (
    <AppShell
      roleKey="student"
      title="Certificates"
      subtitle="Verified credentials — shareable, checkable, unforgeable"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {mine.data ? `${items.length} issued` : "Checking…"}
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
            label: "Issued",
            value: mine.data ? String(items.length) : "—",
            delta: "viewable now",
            icon: Award,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Verifiable",
            value: items.filter((c) => c.code).length.toString(),
            delta: "via public code check",
            icon: QrCode,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Registry",
            value: "Live",
            delta: "backend-issued codes",
            icon: BadgeCheck,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Sharing",
            value: "PDF · Link",
            delta: "LinkedIn ready",
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
            <QueryState<CertificateItem[]>
              query={mine}
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
                      <Badge className="bg-success/10 text-success border-0 font-semibold">
                        Issued
                      </Badge>
                      <div className="flex shrink-0 gap-1">
                        <Button variant="outline" size="sm" className="font-semibold">
                          <Download className="size-3.5" /> PDF
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
                using its QR code or unique code — no account needed.
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

          {canIssue && <IssueCertificateCard />}
        </div>
      </div>
    </AppShell>
  );
}

function IssueCertificateCard() {
  const candidates = useCertificateCandidates();
  const courses = useCourses();
  const issue = useIssueCertificate();
  const [userId, setUserId] = useState("");
  const [courseSlug, setCourseSlug] = useState("");
  const [title, setTitle] = useState("");

  const courseItems = courses.data?.pages.flatMap((p) => p.items) ?? [];

  const pickCourse = (slug: string) => {
    setCourseSlug(slug);
    const course = courseItems.find((c) => c.slug === slug);
    setTitle(course?.title ?? title);
  };

  const submit = () => {
    if (!userId || !courseSlug || !title.trim()) return;
    issue.mutate(
      { userId, courseSlug, title: title.trim() },
      {
        onSuccess: () => {
          setUserId("");
          setCourseSlug("");
          setTitle("");
        },
      },
    );
  };

  return (
    <Card className="bg-card shadow-soft border">
      <CardHeader>
        <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
          <ScrollText className="text-primary size-4" /> Issue a certificate
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-xs leading-relaxed">
          Issue to any active user. The registry creates a unique code that passes the public
          verification check.
        </p>

        <div className="space-y-1.5">
          <Label htmlFor="cert-user" className="text-xs font-semibold">
            Recipient
          </Label>
          <Select value={userId} onValueChange={setUserId}>
            <SelectTrigger id="cert-user">
              <SelectValue placeholder="Select a user…" />
            </SelectTrigger>
            <SelectContent>
              {candidates.data?.items.map((u) => (
                <SelectItem key={u.id} value={u.id}>
                  {u.name} · {u.email}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="cert-course" className="text-xs font-semibold">
            Course
          </Label>
          <Select value={courseSlug} onValueChange={pickCourse}>
            <SelectTrigger id="cert-course">
              <SelectValue placeholder="Select a course…" />
            </SelectTrigger>
            <SelectContent>
              {courseItems.map((c) => (
                <SelectItem key={c.slug} value={c.slug}>
                  {c.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="cert-title" className="text-xs font-semibold">
            Title
          </Label>
          <Input
            id="cert-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Certificate title"
          />
        </div>

        {issue.isError && (
          <p className="text-destructive text-xs font-semibold">
            {errorMessage(issue.error) ?? "Could not issue certificate."}
          </p>
        )}
        {issue.isSuccess && (
          <p className="bg-success/10 text-success rounded-lg px-3 py-2 text-xs font-semibold">
            Issued — code {issue.data.code}. It passes verification immediately.
          </p>
        )}

        <Button
          className="w-full font-semibold"
          onClick={submit}
          disabled={issue.isPending || !userId || !courseSlug || !title.trim()}
        >
          <Plus className="size-4" /> {issue.isPending ? "Issuing…" : "Issue certificate"}
        </Button>
      </CardContent>
    </Card>
  );
}
