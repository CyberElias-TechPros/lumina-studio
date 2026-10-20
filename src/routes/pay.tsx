"use client";

import { useState } from "react";
import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link, useNavigate } from "@/lib/next-compat/router";
import { ArrowRight, ShieldCheck, Search } from "lucide-react";
import { PageShell, PageHero } from "@/components/marketing/shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TUITION_POLICY } from "@/data/academy/tuition-policy";

export const Route = createFileRoute("/pay")({
  head: () => ({
    meta: [
      { title: "How to pay tuition — Cyber Elias Academy" },
      {
        name: "description",
        content:
          "Applying to CEA is free. Review and accept a confirmed course offer before paying. Use your private application page for tuition payments, balances and receipts.",
      },
    ],
  }),
  component: PayPage,
});

function PayPage() {
  const navigate = useNavigate();
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");
  return (
    <PageShell>
      <PageHero
        eyebrow="Tuition payments"
        title="Check your offer before paying"
        description={TUITION_POLICY.application}
      />
      <section className="container-page pb-16">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          <Card className="border-primary/30">
            <CardContent className="space-y-5 p-6">
              <h2 className="font-display text-xl font-bold">Open your private application</h2>
              <p className="text-muted-foreground text-sm">
                Use the reference from your application. Sign in with the same verified email to see
                your offer, current balance, receipt and learning-access status. A reference alone
                does not reveal private records.
              </p>
              <form
                className="space-y-3"
                onSubmit={(event) => {
                  event.preventDefault();
                  const ref = reference.trim().toUpperCase();
                  if (!/^CEA-\d{4}-[A-Z0-9]{6}$/.test(ref)) {
                    setError("Enter your reference, for example CEA-2026-ABC123.");
                    return;
                  }
                  setError("");
                  void navigate({ to: "/apply/status/$id", params: { id: ref } });
                }}
              >
                <label className="block text-sm font-medium" htmlFor="payment-reference">
                  Application reference
                </label>
                <input
                  id="payment-reference"
                  className="w-full rounded-md border bg-background px-3 py-2 font-mono text-sm"
                  value={reference}
                  onChange={(event) => setReference(event.target.value)}
                  placeholder="CEA-2026-ABC123"
                  autoCapitalize="characters"
                  autoComplete="off"
                />
                {error && (
                  <p className="text-error text-sm" role="alert">
                    {error}
                  </p>
                )}
                <Button type="submit">
                  <Search className="size-4" /> Review offer & payment status
                </Button>
              </form>
              <p className="text-sm">
                Not applied yet?{" "}
                <Link to="/apply" className="text-primary underline">
                  Apply for free
                </Link>
                .
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-4 p-6 text-sm">
              <h2 className="font-display flex items-center gap-2 text-xl font-bold">
                <ShieldCheck className="text-primary size-5" /> A place first, payment second
              </h2>
              <ol className="list-decimal space-y-3 pl-5">
                <li>
                  CEA confirms the actual timetable, equipment/practice arrangement, suitability and
                  available place.
                </li>
                <li>
                  You review the exact fee, balance date and tuition terms, then accept that offer.
                </li>
                <li>
                  The private page enables the agreed payment options and, where applicable,
                  bank-transfer instructions.
                </li>
                <li>
                  A verified payment produces a receipt and the appropriate access outcome. A
                  screenshot or redirect is not proof of settlement.
                </li>
              </ol>
              <p className="font-medium">
                Do not transfer money from a general course listing or while an earlier payment is
                still being checked.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="mx-auto mt-6 max-w-4xl space-y-3 rounded-xl border p-6 text-sm">
          <p>{TUITION_POLICY.payment}</p>
          <p>{TUITION_POLICY.refundSummary}</p>
          <Link
            to="/terms#tuition"
            className="text-primary inline-flex items-center gap-1 font-medium underline"
          >
            Read the tuition policy <ArrowRight className="size-4" />
          </Link>
          <p className="text-muted-foreground">
            Already paid under an earlier agreement, lost your reference, or received an unexpected
            payment result? Contact{" "}
            <a href="mailto:help@cea.ng" className="text-primary underline">
              help@cea.ng
            </a>{" "}
            or{" "}
            <a href="https://wa.me/2349058628386" className="text-primary underline">
              WhatsApp CEA
            </a>{" "}
            for a record review. Do not pay again to fix access. Existing agreed terms remain
            protected.
          </p>
          <p className="text-muted-foreground">{TUITION_POLICY.support}</p>
        </div>
      </section>
    </PageShell>
  );
}
