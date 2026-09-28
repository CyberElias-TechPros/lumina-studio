import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, CreditCard, Landmark, Lock, ShieldCheck } from "lucide-react";
import { CTASection, PageHero, PageShell, SectionHeading } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/payment")({
  head: () =>
    getPageHead({
      title: "Payment — Cyber Elias Academy shop",
      description:
        "Paystack handles every payment for the CEA shop. Cards, bank transfer and USSD are supported. No extra fee is added at the bank page.",
      path: "/payment",
    }),
  component: PaymentPage,
});

const methods = [
  {
    icon: CreditCard,
    title: "Cards",
    body: "Visa, Mastercard and Verve. Most Nigerian cards work, including naira-denominated ones. 3-D Secure is enforced for safety.",
  },
  {
    icon: Landmark,
    title: "Bank transfer",
    body: "Paystack generates a unique account number for your order. Pay from any Nigerian bank app — the order confirms within minutes.",
  },
  {
    icon: Lock,
    title: "USSD",
    body: "Dial a short code from your bank app on a phone line registered with the account. Good when there is no data or card handy.",
  },
];

function PaymentPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Payment"
        title="How you pay at the CEA shop"
        description="Paystack is the payment processor for every order. The price you see on the product page is what you pay — we do not add a surcharge at the bank page."
      />

      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="Methods"
          title="Three ways to pay"
          description="All methods are processed by Paystack. Choose what is easiest for you on the day."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {methods.map((m) => (
            <div key={m.title} className="border-border rounded-lg border p-6">
              <m.icon className="text-primary size-5" />
              <h3 className="font-display mt-3 text-base font-semibold">{m.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{m.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-border bg-muted/30 border-y">
        <div className="container-page grid gap-10 py-16 md:grid-cols-2 md:py-20">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">What we never do</h2>
            <p className="text-muted-foreground mt-3 text-base leading-relaxed">
              We do not see or store your card number, CVV or bank PIN — that all happens on
              Paystack's hosted page. We do not charge a convenience fee on top of the product
              price, and we do not enrol you in any subscription. Every order is a single one-off
              payment.
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              If a price on the shop looks wrong, stop and email{" "}
              <a href="mailto:hello@cea.ng" className="text-primary underline">
                hello@cea.ng
              </a>{" "}
              before paying. We never undercut the published price through WhatsApp or DM.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Receipts and records
            </h2>
            <p className="text-muted-foreground mt-3 text-base leading-relaxed">
              Paystack emails a receipt to the address you entered at checkout. We also email a
              separate CEA order receipt that lists the product, the price paid and the order
              reference. The order reference starts with{" "}
              <code className="font-mono">cea_shop_</code> — quote it if you need help.
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              Need a refund? See the{" "}
              <Link to="/refunds" className="text-primary underline">
                refunds policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <div className="border-border bg-card rounded-lg border p-6 sm:p-8">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <ShieldCheck className="text-primary size-8 shrink-0" />
            <div>
              <h2 className="font-display text-lg font-semibold">Why Paystack</h2>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                Paystack is licensed by the Central Bank of Nigeria, powers more than half of
                Nigerian online businesses, and is PCI-DSS certified. Their dispute and chargeback
                process is the one we use for the academy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Reveal>
        <CTASection
          title="Ready to buy?"
          description="Pick a product, pay on Paystack, get the file by email within one business day."
          primary={{ label: "Browse the shop", to: "/shop" }}
          secondary={{ label: "Read the delivery terms", to: "/shipping" }}
        />
      </Reveal>
    </PageShell>
  );
}
