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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageShell, PageHero, CTASection, SectionHeading } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/certificates/verify")({
  head: () => ({
    meta: [
      { title: "Verify a Certificate — Cyber Elias Academy" },
      {
        name: "description",
        content:
          "Verify a Cyber Elias Academy certificate in seconds. Every credential carries a unique code tied to our OSKM skill records.",
      },
    ],
  }),
  component: VerifyPage,
});

function VerifyPage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<null | "found" | "invalid">(null);

  const verify = () => {
    setResult(code.trim().length >= 8 ? "found" : "invalid");
  };

  return (
    <PageShell>
      <PageHero
        eyebrow="Certificate verification"
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
                  <Button onClick={verify} className="bg-gradient-brand shadow-glow border-0">
                    Verify <BadgeCheck className="ml-1.5 size-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground mt-2 text-xs">
                  The code is printed on every certificate and appears on the OSKM record.
                </p>
              </CardContent>
            </Card>
          </Reveal>

          {result === "found" && (
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
                        Verified against the CEA-OS registry · July 31, 2026
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-4 rounded-xl border p-5 sm:grid-cols-2">
                    <div>
                      <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                        Holder
                      </p>
                      <p className="mt-0.5 text-sm font-bold">Adaeze Okafor</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                        Program
                      </p>
                      <p className="mt-0.5 text-sm font-bold">Full-Stack Software Development</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                        Engine
                      </p>
                      <p className="mt-0.5 text-sm font-bold">Learning Engine · Cohort 01</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                        OSKM skill level
                      </p>
                      <p className="mt-0.5 text-sm font-bold">Level 3 — Working professional</p>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {[
                      "JavaScript & TypeScript",
                      "React",
                      "Node.js",
                      "REST & GraphQL",
                      "Testing",
                      "Deployment",
                    ].map((s) => (
                      <Badge key={s} variant="secondary" className="font-semibold">
                        {s}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-muted-foreground mt-5 border-t pt-4 text-xs">
                    Issued July 2026 · Validity: continuous — skills are re-verified through the
                    CEA-OS skills ledger every two years.
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          )}

          {result === "invalid" && (
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
                        Double-check the code — it's case-sensitive. If the problem persists, ask
                        the holder to contact alumni support.
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
        </div>
      </section>

      <CTASection />
    </PageShell>
  );
}
