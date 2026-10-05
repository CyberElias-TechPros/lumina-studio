import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { CheckCircle2, Clock3, Download, MapPin } from "lucide-react";
import { CTASection, PageHero, PageShell, SectionHeading } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";
import { deliveryWindowLabel, digitalProducts } from "@/data/digital-products";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/shipping")({
  head: () =>
    getPageHead({
      title: "Delivery — Cyber Elias Academy shop",
      description:
        "After Paystack confirms payment, the CEA shop team emails your digital product within one business day. No courier fee or delivery address is needed.",
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
    title: "2. Payment is confirmed",
    body: "The order return page shows the payment status. It does not provide an instant download.",
  },
  {
    icon: Download,
    title: "3. We email your file",
    body: "After payment is confirmed, our team prepares the product file and emails it to your checkout address within one business day.",
  },
];

function ShippingPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Delivery"
        title="Electronic delivery, Nigeria only"
        description="Shop products are delivered by email after payment is confirmed. We do not ship physical goods, so there is no courier fee or delivery address to fill in."
      />

      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="The flow"
          title="Three steps from payment to email"
          description="Payment confirmation and product delivery are separate steps. Our team emails the product file within one business day after payment is confirmed."
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
              Our team emails the file to the address you entered at checkout{" "}
              {deliveryWindowLabel(Math.min(...digitalProducts.map((p) => p.deliveryHours)))} after
              payment is confirmed. The return page shows payment status only; it does not serve the
              product file. If you have not received the email by then, contact us with your order
              reference.
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
          description="Include your order reference so we can check the payment and delivery status."
          primary={{
            label: "WhatsApp support",
            to: "https://wa.me/2349058628386?text=Hello%20Cyber%20Elias%20Academy%21%20I%20have%20a%20question%20about%20shop%20delivery.",
          }}
          secondary={{ label: "Refunds policy", to: "/refunds" }}
        />
      </Reveal>
    </PageShell>
  );
}
