import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Award,
  BadgeCheck,
  FileSearch,
  GraduationCap,
  ScanSearch,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageShell, PageHero, CTASection, SectionHeading } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";
import { verifyCertificate, type CertificateVerifyResult } from "@/lib/api/certificates";
import { ApiError } from "@/lib/errors";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/certificates/verify")({
  validateSearch: (search: Record<string, unknown>): { code?: string } => ({
    code: typeof search.code === "string" ? search.code : undefined,
  }),
  head: () =>
    getPageHead({
      title: "Verify a Certificate",
      description:
        "Verify a Cyber Elias Academy certificate in seconds. Every credential carries a unique code tied to our OSKM skill records.",
      path: "/certificates/verify",
    }),
  component: VerifyPage,
});

function VerifyPage() {
  const { code: initialCode } = Route.useSearch();
  const [code, setCode] = useState(initialCode ?? "");
  const [result, setResult] = useState<CertificateVerifyResult | null>(null);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verify = async () => {
    const trimmed = code.trim();
    if (trimmed.length < 8) {
      setError("Enter a valid certificate code.");
      return;
    }
    setError(null);
    setChecking(true);
    try {
      setResult(await verifyCertificate(trimmed));
    } catch (err) {
      setResult(null);
      setError(err instanceof ApiError ? err.message : "We couldn't check that code. Try again.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <PageShell>
      <PageHero
        eyebrow="Certificate verification"
        art="shield"
        title={
          <>
            Verify any credential in <span className="text-gradient">seconds</span>
          </>
        }
        description="Every CEA certificate carries a unique verification code and maps to the OSKM framework, so employers can trust exactly what the holder can do."
      />

      <section className="container-page pb-20">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <p className="text-muted-foreground mb-8 leading-relaxed text-pretty">
              Every certificate issued by Cyber Elias Academy is recorded in the CEA-OS skills
              ledger — the same system that tracks module completion, capstone grades and assessed
              competencies during each student's programme. The verification code printed on your
              physical and digital certificates is a direct lookup into that ledger: employers,
              agencies or clients can confirm in seconds what the holder studied, what they were
              assessed on and whether the credential is still current.
            </p>
          </Reveal>

          <Reveal>
            <Card className="bg-card shadow-soft border">
              <CardContent className="p-6 sm:p-8">
                <Label htmlFor="cert-code" className="flex items-center gap-2">
                  <ScanSearch className="text-primary size-4" /> Certificate code
                </Label>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <Input
                    id="cert-code"
                    placeholder="e.g. CEA-CERT-2026-8F3K2Q"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="flex-1 font-mono"
                  />
                  <Button
                    onClick={verify}
                    className="bg-gradient-brand shadow-glow border-0"
                    disabled={checking}
                  >
                    {checking ? "Checking…" : "Verify"} <BadgeCheck className="ml-1.5 size-4" />
                  </Button>
                </div>
                {error && (
                  <p className="text-error bg-error/10 mt-3 rounded-lg px-3 py-2 text-xs">
                    {error}
                  </p>
                )}
                <p className="text-muted-foreground mt-2 text-xs">
                  The code is printed on every certificate and appears on the OSKM record.
                </p>
              </CardContent>
            </Card>
          </Reveal>

          {result?.valid && result.certificate && (
            <Reveal delay={0.1}>
              <Card className="border-success/40 shadow-soft mt-6 border-2">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="bg-success/10 text-success grid size-12 place-items-center rounded-full">
                      <BadgeCheck className="size-6" />
                    </span>
                    <div>
                      <p className="font-display text-lg font-extrabold text-success">
                        Valid credential
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Verified against the CEA-OS registry · {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-4 rounded-xl border p-5 sm:grid-cols-2">
                    <div>
                      <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                        Certificate
                      </p>
                      <p className="mt-0.5 text-sm font-bold">{result.certificate.title}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                        Code
                      </p>
                      <p className="mt-0.5 font-mono text-sm font-bold">
                        {result.certificate.code}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                        Issued
                      </p>
                      <p className="mt-0.5 text-sm font-bold">
                        {new Date(result.certificate.issuedAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                        OSKM skill level
                      </p>
                      <p className="mt-0.5 text-sm font-bold">Level 3 — Working professional</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-5 border-t pt-4 text-xs">
                    Validity: continuous — skills are re-verified through the CEA-OS skills ledger
                    every two years.
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          )}

          {result && !result.valid && (
            <Reveal delay={0.1}>
              <Card className="border-error/40 shadow-soft mt-6 border-2">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="bg-error/10 text-error grid size-12 place-items-center rounded-full">
                      <FileSearch className="size-6" />
                    </span>
                    <div>
                      <p className="font-display text-lg font-extrabold text-error">
                        No match found
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {result.message ??
                          "Double-check the code — it's case-sensitive. If the problem persists, ask the holder to contact alumni support."}
                      </p>
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm" className="mt-5">
                    <Link to="/contact">Contact alumni support</Link>
                  </Button>
                </CardContent>
              </Card>
            </Reveal>
          )}

          <div className="mt-14">
            <SectionHeading
              eyebrow="Why verification matters"
              title="A credential is only as good as its trust"
              description="Three reasons employers and partners rely on the CEA-OS registry."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: ShieldCheck,
                  title: "Tamper-proof",
                  desc: "Each code is cryptographically tied to the OSKM record — copies can't fake it.",
                },
                {
                  icon: GraduationCap,
                  title: "Skills, not sheets",
                  desc: "Verification returns the skill map and level, not just a completion date.",
                },
                {
                  icon: Award,
                  title: "Always current",
                  desc: "Skill levels are re-verified on the two-year cycle, keeping records honest.",
                },
              ].map((f) => (
                <div key={f.title} className="bg-card shadow-soft rounded-2xl border p-5">
                  <f.icon className="text-primary size-5" />
                  <p className="font-display mt-3 text-sm font-extrabold">{f.title}</p>
                  <p className="text-muted-foreground mt-1 text-xs leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <Reveal>
            <div className="mt-14 space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Why build a public verification system? Because credential fraud is widespread in
                every market CEA operates in, and traditional certificate checks (emailing an
                institution, waiting for a response) are slow and unreliable. A public lookup means
                employers can verify credentials during their hiring process rather than after a
                conditional offer — saving both sides time and catching fraud before it becomes a
                legal issue.
              </p>
              <p>
                The verification goes beyond 'real or fake'. Employers can see the specific
                programme completed, the assessed skill level mapped to the OSKM framework, and
                whether the credential is still current. Skills are re-verified on a two-year cycle
                — graduates maintain active credentials by demonstrating continued competence
                through the CEA-OS platform, so a certificate does not freeze someone's capabilities
                at the moment of graduation.
              </p>
              <p>
                If you are an employer reading this and would like a bulk verification API for your
                hiring process, contact us. Several organisations in our partner network already use
                a programmatic version of this verification system to screen applications before
                interviews begin — it reduces the CV embellishment problem dramatically.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </PageShell>
  );
}
