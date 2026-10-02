import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Clock3, Download, MapPin } from "lucide-react";
import { CTASection, PageHero, PageShell, SectionHeading } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";
import { digitalProducts } from "@/data/digital-products";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/shipping")({
  head: () =>
    getPageHead({
      title: "Delivery — Cyber Elias Academy shop",
      description:
        "Every digital product in the CEA shop is delivered electronically within one business day, anywhere in Nigeria. No courier fee, no address needed.",
      path: "/shipping",
    }),
  component: ShippingPage,
});

const timeline = [
  {
    icon: CheckCircle2,
    title: "1. Pay on Paystack",
    body: "You pay the published price using a card, transfer or USSD. The price is in naira; we do not add any delivery fee.",
  },
  {
    icon: Clock3,
    title: "2. We confirm the order",
    body: "Paystack posts back to our system. You land on the order return page and we email a receipt within a few minutes.",
  },
  {
    icon: Download,
    title: "3. The download appears",
    body: "The download link appears on the order return page and is emailed to the address you entered at checkout. It is valid for any time afterwards.",
  },
];

function ShippingPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Delivery"
        title="Electronic delivery, Nigeria only"
        description="Every product in the CEA shop is a single downloadable file. We do not ship physical goods — there is no courier fee and no delivery address to fill in."
      />

      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="The flow"
          title="Three steps from pay to file"
          description="Most orders complete inside two minutes. If anything stalls, the contact details below are answered by a real person."
        />
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {timeline.map((s, i) => (
            <li key={s.title} className="border-border rounded-lg border p-6">
              <p className="text-muted-foreground text-xs tabular-nums">Step {i + 1}</p>
              <s.icon className="text-primary mt-3 size-5" />
              <h3 className="font-display mt-3 text-base font-semibold">{s.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-border bg-muted/30 border-y">
        <div className="container-page grid gap-10 py-16 md:grid-cols-2 md:py-20">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">Where we deliver</h2>
            <p className="text-muted-foreground mt-3 text-base leading-relaxed">
              Nigeria only, for now. Because the product is a file, you can use it from any country
              once you have it — but we only take payment and run customer support for buyers inside
              Nigeria. If you are outside Nigeria and need the same product, email{" "}
              <a href="mailto:help@cea.ng" className="text-primary underline">
                help@cea.ng
              </a>{" "}
              and we will tell you when international delivery opens.
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              Paystack's payment methods cover cards, bank transfers and USSD on Nigerian banks.
              There is no extra fee added at the bank page — what you see on the product page is
              what you pay.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              When you get the file
            </h2>
            <p className="text-muted-foreground mt-3 text-base leading-relaxed">
              The download link appears on the order return page immediately after Paystack confirms
              payment. The same link is emailed to the address you entered at checkout, so you
              always have a backup. We aim to deliver within{" "}
              {Math.min(...digitalProducts.map((p) => p.deliveryHours))} hours; if it takes longer,
              message us and we will investigate.
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              The file format for each product is listed on its page.{" "}
              <Link to="/shop" className="text-primary underline">
                See the shop
              </Link>{" "}
              for the current list.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <div className="border-border bg-card rounded-lg border p-6 sm:p-8">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <MapPin className="text-primary size-8 shrink-0" />
            <div>
              <h2 className="font-display text-lg font-semibold">Our studio</h2>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                24/26 Ebony Road, Off Rumuola Road, Port Harcourt, Rivers State, Nigeria. Open
                Mon–Sat, 8:00–20:00 WAT. You do not need to visit to buy a digital product — but you
                are welcome to.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Reveal>
        <CTASection
          title="Questions about delivery?"
          description="Email help@cea.ng or message us on WhatsApp. We reply within one working day."
          primary={{ label: "Email us", to: "/contact" }}
          secondary={{ label: "Refunds policy", to: "/refunds" }}
        />
      </Reveal>
    </PageShell>
  );
}
