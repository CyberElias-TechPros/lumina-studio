import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageShell, PageHero, CTASection } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";

export const Route = createFileRoute("/apply/status")({
  head: () => ({
    meta: [
      { title: "Application Status — Cyber Elias Academy" },
      {
        name: "description",
        content:
          "Track your CEA application. See exactly where it is and what happens next at every stage.",
      },
    ],
  }),
  component: ApplyStatusPage,
});

function ApplyStatusPage() {
  const navigate = useNavigate();
  const [ref, setRef] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = ref.trim().toUpperCase();
    if (!value) return;
    void navigate({ to: "/apply/status/$id", params: { id: value } });
  };

  return (
    <PageShell>
      <PageHero
        eyebrow="Application tracking"
        title={
          <>
            Where your application <span className="text-gradient">stands</span>
          </>
        }
        description="Enter your application ID (e.g. CEA-2026-0142) to see exactly where things are."
      />

      <section className="container-page pb-20">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <Card className="bg-card shadow-soft border">
              <CardContent className="p-6">
                <form onSubmit={submit}>
                  <Label htmlFor="appId">Application ID</Label>
                  <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                    <Input
                      id="appId"
                      value={ref}
                      onChange={(e) => setRef(e.target.value)}
                      placeholder="CEA-2026-0142"
                      className="flex-1 font-mono"
                      required
                    />
                    <Button type="submit" className="bg-gradient-brand shadow-glow border-0">
                      Track application
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="bg-gradient-ink text-ink-foreground shadow-elevated mt-10 border-0">
              <CardContent className="p-6">
                <p className="font-display flex items-center gap-2 text-base font-extrabold">
                  <Mail className="size-4" /> Need help?
                </p>
                <p className="text-ink-foreground/70 mt-1.5 text-sm">
                  Admissions replies within one working day. Quote your application ID for a faster
                  response.
                </p>
                <Button asChild size="sm" className="bg-gradient-brand shadow-glow mt-4 border-0">
                  <Link to="/contact">Email admissions</Link>
                </Button>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </PageShell>
  );
}
