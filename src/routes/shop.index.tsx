import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Clock3, Download, FileText, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CTASection, PageHero, PageShell, SectionHeading } from "@/components/marketing/shell";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { digitalProducts, formatNaira, productPath } from "@/data/digital-products";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/shop/")({
  head: () =>
    getPageHead({
      title: "Shop — templates and planners for small businesses",
      description:
        "One-time digital products from Cyber Elias Academy: website starter, invoice and stock sheet, weekly social content planner. Pay once, download the file.",
      path: "/shop",
      structuredData: [
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Cyber Elias Academy digital shop",
          itemListElement: digitalProducts.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `https://www.cea.ng${productPath(p.slug)}`,
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
        title="One-time digital products for small businesses"
        description="Editable templates and planners built around how Nigerian shops, traders and freelancers actually work. Pay once, download the file, no subscription."
        meta={["Nigeria only", "Paystack checkout", "Electronic delivery within one business day"]}
      />

      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="In stock now"
          title="Three products, all in stock"
          description="Each one is a single downloadable file. No platform fees, no monthly plans. The price you see is what you pay."
        />
        <StaggerGroup className="mt-10 grid gap-6 md:grid-cols-3">
          {digitalProducts.map((p) => (
            <StaggerItem key={p.id}>
              <Card className="border-card flex h-full flex-col overflow-hidden shadow-soft">
                <div className="bg-muted aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    <Badge variant="outline" className="text-[11px] font-medium">
                      {p.category}
                    </Badge>
                    <span className="text-success inline-flex items-center gap-1 text-xs font-medium">
                      <Check className="size-3.5" /> In stock
                    </span>
                  </div>
                  <h3 className="font-display mt-4 text-lg font-semibold leading-snug">
                    <Link to={productPath(p.slug)} className="hover:underline">
                      {p.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground mt-2 line-clamp-3 text-sm leading-relaxed">
                    {p.shortDescription}
                  </p>
                  <ul className="text-muted-foreground mt-4 space-y-1.5 text-xs">
                    <li className="flex items-start gap-2">
                      <FileText className="mt-0.5 size-3.5 shrink-0" />
                      {p.fileFormat}
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock3 className="mt-0.5 size-3.5 shrink-0" />
                      Delivered electronically within {p.deliveryHours} hours
                    </li>
                    <li className="flex items-start gap-2">
                      <Download className="mt-0.5 size-3.5 shrink-0" />
                      Download appears after payment confirms
                    </li>
                  </ul>
                  <div className="mt-6 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-muted-foreground text-[11px] uppercase tracking-wide">
                        One-time price
                      </p>
                      <p className="font-display text-2xl font-semibold tabular-nums">
                        {formatNaira(p.price)}
                      </p>
                    </div>
                    <Button asChild>
                      <Link to={productPath(p.slug)}>View &amp; buy</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="border-border bg-muted/30 border-y">
        <div className="container-page grid gap-10 py-16 md:grid-cols-3 md:py-20">
          <div>
            <h2 className="font-display flex items-center gap-2 text-base font-semibold">
              <Sparkles className="text-primary size-4" /> What you get
            </h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Every product is a single editable file plus a short written guide. No locked
              platform, no monthly fee, no per-seat pricing. You own the file once you buy it.
            </p>
          </div>
          <div>
            <h2 className="font-display flex items-center gap-2 text-base font-semibold">
              <Download className="text-primary size-4" /> Delivery
            </h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Paystack handles the payment, then the download link appears on the return page
              and is emailed to you. We do not ship physical goods — there is nothing to
              courier and nothing to collect.
            </p>
          </div>
          <div>
            <h2 className="font-display flex items-center gap-2 text-base font-semibold">
              <FileText className="text-primary size-4" /> Refunds
            </h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              14 days, including a change of mind. No return parcel needed. Refund to the
              original payment method within 30 days. See the{" "}
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
          description="Reply to the order email or message us on WhatsApp and we will point you at the right product."
          primary={{ label: "WhatsApp us", to: "/contact" }}
          secondary={{ label: "Read the policies", to: "/refunds" }}
        />
      </Reveal>
    </PageShell>
  );
}
