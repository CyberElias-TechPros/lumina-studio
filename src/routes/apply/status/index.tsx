"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link, useNavigate } from "@/lib/next-compat/router";
import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageShell, PageHero, CTASection } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";

export const Route = createFileRoute("/apply/status/")({
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
        title="Look up your application"
        description="Enter the reference we sent you (for example CEA-2026-0142)."
      />

      <section className="container-page pb-20">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <Card className="bg-card border">
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
                    <Button type="submit">Track application</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="bg-card mt-10 border">
              <CardContent className="p-6">
                <p className="font-display flex items-center gap-2 text-base font-semibold">
                  <Mail className="size-4" /> Need help?
                </p>
                <p className="text-muted-foreground mt-1.5 text-sm">
                  Quote your application ID when you write. We reply during opening hours.
                </p>
                <Button asChild size="sm" variant="outline" className="mt-4">
                  <Link to="/contact">Contact us</Link>
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
