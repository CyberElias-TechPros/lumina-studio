import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BadgeCheck, FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageShell, PageHero, CTASection } from "@/components/marketing/shell";
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
        "Check a Cyber Elias Academy certificate by its code. We confirm whether we issued it.",
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
        eyebrow="Certificates"
        title="Verify a certificate"
        description="Enter the code printed on a Cyber Elias Academy certificate. We will say whether we issued it."
      />

      <section className="container-page pb-16">
        <div className="mx-auto max-w-xl">
          <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
            Certificates are awarded for the work produced on a course, not for attendance. This
            page checks the code against our records. It is not a professional licence and it is not
            a national qualification.
          </p>

          <div className="border-border rounded-lg border p-6">
            <Label htmlFor="cert-code">Certificate code</Label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Input
                id="cert-code"
                placeholder="e.g. CEA-CERT-2026-8F3K2Q"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 font-mono"
                onKeyDown={(e) => {
                  if (e.key === "Enter") void verify();
                }}
              />
              <Button onClick={verify} disabled={checking}>
                {checking ? "Checking…" : "Verify"}
              </Button>
            </div>
            {error && <p className="text-error mt-3 text-sm">{error}</p>}
            <p className="text-muted-foreground mt-2 text-xs">
              The code is printed on the certificate.
            </p>
          </div>

          {result?.valid && result.certificate && (
            <div className="border-border mt-6 rounded-lg border p-6">
              <div className="flex items-center gap-3">
                <span className="bg-success/10 text-success grid size-10 place-items-center rounded-full">
                  <BadgeCheck className="size-5" />
                </span>
                <div>
                  <p className="font-display font-semibold text-success">Valid</p>
                  <p className="text-muted-foreground text-xs">
                    Checked {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
              <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-muted-foreground text-xs">Certificate</dt>
                  <dd className="mt-0.5 text-sm font-medium">{result.certificate.title}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground text-xs">Code</dt>
                  <dd className="mt-0.5 font-mono text-sm">{result.certificate.code}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground text-xs">Issued</dt>
                  <dd className="mt-0.5 text-sm">
                    {new Date(result.certificate.issuedAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                    })}
                  </dd>
                </div>
              </dl>
            </div>
          )}

          {result && !result.valid && (
            <div className="border-border mt-6 rounded-lg border p-6">
              <div className="flex items-center gap-3">
                <span className="bg-muted text-muted-foreground grid size-10 place-items-center rounded-full">
                  <FileSearch className="size-5" />
                </span>
                <div>
                  <p className="font-display font-semibold">No match</p>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {result.message ??
                      "We have no record of that code. Check the spelling, or contact us."}
                  </p>
                </div>
              </div>
              <Button asChild variant="outline" size="sm" className="mt-5">
                <Link to="/contact">Contact us</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </PageShell>
  );
}
