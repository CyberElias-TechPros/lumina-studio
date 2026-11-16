import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { Download, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";
import { GadgetsCatalog } from "@/components/shop/gadgets-catalog";
import { Reveal } from "@/components/motion";
import { deliveryWindowLabel, digitalProducts, productPath } from "@/data/digital-products";
import { getPageHead } from "@/lib/seo";
import { SITE_URL } from "@/lib/site-url";

export const Route = createFileRoute("/shop/")({
  head: () =>
    getPageHead({
      title: "Shop — gadgets and digital products",
      description:
        "Shop laptops, phones, accessories and digital products from Cyber Elias Academy.",
      path: "/shop",
      structuredData: [
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Cyber Elias Academy digital shop",
          itemListElement: digitalProducts.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}${productPath(p.slug)}`,
            name: p.title,
          })),
        },
      ],
    }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Shop"
        title="Shop gadgets and digital products"
        description="Discover laptops, phones and accessories alongside practical digital products for your business."
        meta={["Gadgets and accessories", "Digital products", "Shop in Nigeria"]}
      />

      <section className="container-page pt-10">
        <div className="bg-muted/40 flex flex-wrap items-center justify-between gap-4 rounded-xl border p-6">
          <div>
            <h2 className="font-display text-xl font-semibold">Looking for gadgets?</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Browse laptops, phones and accessories and add your favourites to a basket.
            </p>
          </div>
          <Button asChild>
            <Link to="/shop/gadgets">Browse gadgets</Link>
          </Button>
        </div>
      </section>

      <section className="container-page py-12 md:py-16" aria-label="Shop products">
        <GadgetsCatalog includeDigital />
      </section>

      <section className="border-border bg-muted/30 border-y">
        <div className="container-page grid gap-10 py-16 md:grid-cols-3 md:py-20">
          <div>
            <h2 className="font-display flex items-center gap-2 text-base font-semibold">
              <Sparkles className="text-primary size-4" /> What you get
            </h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Each digital product is a single editable file plus a short written guide. No locked
              platform, no monthly fee, no per-seat pricing. You own the file once you buy it.
            </p>
          </div>
          <div>
            <h2 className="font-display flex items-center gap-2 text-base font-semibold">
              <Download className="text-primary size-4" /> Delivery
            </h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              For digital products, after Paystack confirms payment, our team prepares the file and
              emails it to you{" "}
              {deliveryWindowLabel(Math.min(...digitalProducts.map((p) => p.deliveryHours)))}. The
              return page confirms payment status; it does not provide an instant download. Digital
              files are not shipped.
            </p>
          </div>
          <div>
            <h2 className="font-display flex items-center gap-2 text-base font-semibold">
              <FileText className="text-primary size-4" /> Refunds
            </h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              For digital products: 14 days, including a change of mind. No return parcel needed.
              Refund to the original payment method within 30 days. See the{" "}
              <Link to="/refunds" className="text-primary underline">
                refunds policy
              </Link>{" "}
              for the full terms.
            </p>
          </div>
        </div>
      </section>

      <Reveal>
        <CTASection
          title="Not sure which one you need?"
          description="Have a question about a product? Message us directly on WhatsApp."
          primary={{
            label: "WhatsApp us",
            to: "https://wa.me/2349058628386?text=Hello%20Cyber%20Elias%20Academy%21%20I%20have%20a%20question%20about%20a%20shop%20product.",
          }}
          secondary={{ label: "Read the policies", to: "/refunds" }}
        />
      </Reveal>
    </PageShell>
  );
}
