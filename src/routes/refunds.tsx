"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { CheckCircle2, Mail, MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTASection, PageHero, PageShell, SectionHeading } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/refunds")({
  head: () =>
    getPageHead({
      title: "Refunds — Cyber Elias Academy shop",
      description:
        "14-day refund window on every digital product in the CEA shop, including a change of mind. No return parcel needed — refund to the original payment method within 30 days.",
      path: "/refunds",
    }),
  component: RefundsPage,
});

const summary = [
  {
    icon: ShieldCheck,
    title: "14 days, change of mind included",
    body: "If you change your mind for any reason within 14 days of purchase, ask for a refund and we will process it. No questions, no return parcel.",
  },
  {
    icon: CheckCircle2,
    title: "Refund to the original method",
    body: "Money goes back the way it came in: the same Paystack card, transfer or USSD channel. Refunds land within 30 days of approval.",
  },
  {
    icon: Mail,
    title: "One email is enough",
    body: "Reply to your order email or write to help@cea.ng with your order reference. We confirm within one working day.",
  },
];

function RefundsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Refunds"
        title="14 days to change your mind"
        description="Every digital product in the CEA shop comes with a 14-day refund window. No return parcel, no restocking fee, no penalty for changing your mind."
      />

      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="The policy"
          title="What we refund, when and how"
          description="Plain English. If anything below is unclear, message us and we will explain on the call."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {summary.map((s) => (
            <div key={s.title} className="border-border rounded-lg border p-6">
              <s.icon className="text-primary size-5" />
              <h3 className="font-display mt-3 text-base font-semibold">{s.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-border bg-muted/30 border-y">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto max-w-3xl space-y-8 text-sm leading-relaxed">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight">Eligibility</h2>
              <p className="text-muted-foreground mt-3">
                You can request a refund within 14 days of the purchase date for any digital product
                in the shop. You do not need to give a reason. If the file is defective or does not
                match the description on the product page, the 14-day window still applies — but we
                will fix or replace the file first if that is what you would prefer.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight">How to ask</h2>
              <p className="text-muted-foreground mt-3">
                Reply to the order confirmation email or write to{" "}
                <a href="mailto:help@cea.ng" className="text-primary underline">
                  help@cea.ng
                </a>{" "}
                with your order reference (it starts with{" "}
                <code className="font-mono">cea_shop_</code>). We confirm receipt within one working
                day and process approved refunds within 30 days.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                What is refunded
              </h2>
              <p className="text-muted-foreground mt-3">
                The full purchase price in naira. Paystack charges are not refunded to us, so you
                receive the full amount you paid. There is no restocking fee because nothing
                physical is shipped.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                Delivery method
              </h2>
              <p className="text-muted-foreground mt-3">
                Refunds are issued to the original payment method — the same card, bank account or
                USSD channel used at checkout. We do not refund to a different account for
                fraud-prevention reasons.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                After the 14-day window
              </h2>
              <p className="text-muted-foreground mt-3">
                If more than 14 days have passed, we still want to hear from you. We will review
                defective files and obvious errors case-by-case. The 14-day rule is a floor, not a
                ceiling — we treat each request on its merits.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Reveal>
        <CTASection
          title="Need a refund?"
          description="Reply to your order email or message us on WhatsApp with your order reference. We confirm within one working day."
          primary={{ label: "Email help@cea.ng", to: "/contact" }}
          secondary={{ label: "Read the delivery terms", to: "/shipping" }}
        />
      </Reveal>

      <section className="container-page py-8 text-center">
        <Button asChild variant="ghost" size="sm">
          <a href="https://wa.me/2349058628386">
            <MessageCircle className="size-4" /> WhatsApp us
          </a>
        </Button>
      </section>
    </PageShell>
  );
}
