"use client";

import { useState } from "react";
import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link, useNavigate } from "@/lib/next-compat/router";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  CheckCircle2,
  ClipboardCopy,
  Landmark,
  MessageCircle,
  Search,
  ShieldCheck,
} from "lucide-react";
import { PageShell, PageHero } from "@/components/marketing/shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ACADEMY_ACCOUNT } from "@/components/enrollment/bank-transfer-form";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pay")({
  head: () => ({
    meta: [
      { title: "How to pay — Cyber Elias Academy" },
      {
        name: "description",
        content:
          "Pay for a Cyber Elias Academy course by card, bank transfer or USSD, or by direct transfer to the academy's UBA account. No application fee.",
      },
    ],
  }),
  component: PayPage,
});

function PayPage() {
  const navigate = useNavigate();
  const [reference, setReference] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function copy(value: string, field: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(field);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  function openStatus(event: React.FormEvent) {
    event.preventDefault();
    const ref = reference.trim().toUpperCase();
    if (ref.length < 6) {
      setError("Enter the reference we sent you, e.g. CEA-2026-XXXXXX.");
      return;
    }
    setError("");
    void navigate({ to: "/apply/status/$id", params: { id: ref } });
  }

  const rows: { label: string; value: string; field: string }[] = [
    { label: "Account name", value: ACADEMY_ACCOUNT.name, field: "name" },
    { label: "Bank", value: ACADEMY_ACCOUNT.bank, field: "bank" },
    { label: "Account number", value: ACADEMY_ACCOUNT.number, field: "number" },
  ];

  return (
    <PageShell>
      <PageHero
        eyebrow="Payments"
        title="How to pay"
        description="Applying is free. After submitting an application, you can pay online or by bank transfer. Admissions confirms course availability, your place and start date separately."
      />

      <section className="container-page pb-16">
        <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Card className="border-primary/30">
            <CardContent className="p-6">
              <p className="font-display flex items-center gap-2 text-lg font-bold">
                <Landmark className="text-primary size-5" /> Direct bank transfer
              </p>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                Transfer the fee (or deposit) to this account. Use your application reference as the
                narration, then report the transfer from your application status page. Finance
                checks reported transfers against the bank statement before confirming payment.
              </p>
              <dl className="mt-4 divide-y rounded-lg border">
                {rows.map((row) => (
                  <div
                    key={row.field}
                    className="flex items-center justify-between gap-3 px-4 py-3"
                  >
                    <dt className="text-muted-foreground text-xs font-medium">{row.label}</dt>
                    <dd className="flex items-center gap-2">
                      <span
                        className={cn(
                          "text-sm font-semibold",
                          row.field === "number" && "font-mono tracking-wide",
                        )}
                      >
                        {row.value}
                      </span>
                      <button
                        type="button"
                        onClick={() => void copy(row.value, row.field)}
                        aria-label={`Copy ${row.label}`}
                        className="text-primary hover:bg-primary/10 grid size-6 place-items-center rounded"
                      >
                        {copied === row.field ? (
                          <CheckCircle2 className="size-3.5" />
                        ) : (
                          <ClipboardCopy className="size-3.5" />
                        )}
                      </button>
                    </dd>
                  </div>
                ))}
              </dl>

              <form onSubmit={openStatus} className="mt-5">
                <label className="text-xs font-medium">
                  Already applied? Enter your reference to report the transfer
                  <div className="mt-1 flex gap-2">
                    <input
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      placeholder="CEA-2026-XXXXXX"
                      className="border-input bg-background focus-visible:ring-ring min-w-0 flex-1 rounded-lg border px-3 py-2.5 font-mono text-sm uppercase focus-visible:ring-1 focus-visible:outline-none"
                    />
                    <Button type="submit" className="font-semibold">
                      <Search className="size-4" /> Go
                    </Button>
                  </div>
                </label>
                {error && <p className="text-error mt-2 text-xs">{error}</p>}
                <p className="text-muted-foreground mt-2 text-[11px]">
                  This opens your application page, where you can report the transfer you sent and
                  see its status.
                </p>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <p className="font-display flex items-center gap-2 text-lg font-bold">
                  <Banknote className="text-primary size-5" /> Card, bank or USSD
                </p>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  The application page offers Paystack checkout for card, bank and USSD payments. A
                  receipt is issued for each confirmed payment and can be printed from your receipt
                  page.
                </p>
                <Button asChild className="mt-4 h-11 w-full font-semibold">
                  <Link to="/apply">
                    Start an application <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <p className="text-muted-foreground mt-2 text-[11px]">
                  No application fee. Payment is recorded against your application; it does not
                  confirm a place or start date.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="font-display flex items-center gap-2 text-base font-bold">
                  <ShieldCheck className="text-success size-5" /> Paying safely
                </p>
                <ul className="text-muted-foreground mt-3 space-y-2 text-xs leading-relaxed">
                  <li className="flex gap-2">
                    <BadgeCheck className="text-success mt-0.5 size-3.5 shrink-0" />
                    The account above is the only academy account. We never change bank details by
                    WhatsApp or email — if someone sends you different details, call 0905 862 8386
                    to confirm before paying.
                  </li>
                  <li className="flex gap-2">
                    <BadgeCheck className="text-success mt-0.5 size-3.5 shrink-0" />
                    Never share your card PIN, OTP or bank password. We will never ask for them.
                  </li>
                  <li className="flex gap-2">
                    <BadgeCheck className="text-success mt-0.5 size-3.5 shrink-0" />
                    Every confirmed payment gets a sequential receipt number you can print.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="font-display flex items-center gap-2 text-base font-bold">
                  <MessageCircle className="text-primary size-5" /> Questions about payment?
                </p>
                <p className="text-muted-foreground mt-2 text-sm">
                  Message us on WhatsApp — we usually reply within the hour during working hours
                  (Mon–Sat, 8:00–20:00).
                </p>
                <Button asChild variant="outline" className="mt-4 w-full font-semibold">
                  <a
                    href={`https://wa.me/2349058628386?text=${encodeURIComponent(
                      "Hello Cyber Elias Academy! I have a question about payment.",
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="size-4" /> WhatsApp 0905 862 8386
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
