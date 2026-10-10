"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link, notFound } from "@/lib/next-compat/router";
import {
  ArrowRight,
  Check,
  Clock3,
  Download,
  FileText,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CTASection, PageShell, SectionHeading } from "@/components/marketing/shell";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import {
  checkoutPath,
  deliveryWindowLabel,
  digitalProducts,
  formatNaira,
  getDigitalProduct,
  productPath,
} from "@/data/digital-products";
import { getPageHead } from "@/lib/seo";
import { SITE_URL } from "@/lib/site-url";

export const Route = createFileRoute("/shop/$slug/")({
  parseParams: (params) => ({ slug: params.slug }),
  stringifyParams: (params) => ({ slug: params.slug }),
  loader: ({ params }) => {
    const product = getDigitalProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) {
      return { meta: [{ title: "Product not found — Cyber Elias Academy" }] };
    }
    return getPageHead({
      title: `${p.title} — Cyber Elias Academy shop`,
      description: p.shortDescription,
      path: productPath(p.slug),
      type: "product",
      image: `${SITE_URL}${p.image}`,
      structuredData: [
        {
          "@context": "https://schema.org",
          "@type": "Product",
          name: p.title,
          description: p.longDescription,
          image: `${SITE_URL}${p.image}`,
          brand: { "@type": "Brand", name: "Cyber Elias Academy" },
          sku: p.id,
          mpn: p.mpn,
          category: p.category,
          offers: {
            "@type": "Offer",
            price: p.price,
            priceCurrency: p.priceCurrency,
            availability:
              p.availability === "in_stock"
                ? "https://schema.org/InStock"
                : p.availability === "preorder"
                  ? "https://schema.org/PreOrder"
                  : "https://schema.org/OutOfStock",
            itemCondition: "https://schema.org/NewCondition",
            url: `${SITE_URL}${checkoutPath(p.slug)}`,
            seller: { "@type": "Organization", name: "Cyber Elias Academy" },
          },
        },
      ],
    });
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const others = digitalProducts.filter((p) => p.slug !== product.slug).slice(0, 2);

  return (
    <PageShell>
      <section className="container-page py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="border-border bg-muted overflow-hidden rounded-lg border">
            <img
              src={product.image}
              alt={product.imageAlt}
              loading="eager"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{product.category}</Badge>
              {product.availability === "in_stock" && (
                <span className="text-success inline-flex items-center gap-1 text-xs font-medium">
                  <Check className="size-3.5" /> In stock
                </span>
              )}
            </div>
            <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {product.title}
            </h1>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed">
              {product.longDescription}
            </p>

            <Card className="border-card mt-8 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-muted-foreground text-[11px] uppercase tracking-wide">
                      One-time price
                    </p>
                    <p className="font-display text-3xl font-semibold tabular-nums">
                      {formatNaira(product.price)}
                    </p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      No monthly fees. No add-ons. Pay once, own the file.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <Button asChild size="lg">
                      <Link to={checkoutPath(product.slug)}>
                        Buy now <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <ul className="text-muted-foreground mt-6 grid gap-2 border-t pt-5 text-xs sm:grid-cols-2">
                  <li className="flex items-start gap-2">
                    <Clock3 className="mt-0.5 size-3.5 shrink-0" /> Email delivery{" "}
                    {deliveryWindowLabel(product.deliveryHours)} after payment confirmation
                  </li>
                  <li className="flex items-start gap-2">
                    <Download className="mt-0.5 size-3.5 shrink-0" /> The return page confirms
                    payment; it is not an instant download
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 size-3.5 shrink-0" /> 14-day refund window
                  </li>
                  <li className="flex items-start gap-2">
                    <Smartphone className="mt-0.5 size-3.5 shrink-0" /> Works on any modern device
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="container-page py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <SectionHeading eyebrow="What you get" title="Highlights" />
            <StaggerGroup className="mt-6 space-y-3">
              {product.highlights.map((h) => (
                <StaggerItem key={h}>
                  <div className="border-border bg-card flex items-start gap-3 rounded-lg border p-4 text-sm leading-relaxed">
                    <Check className="text-success mt-0.5 size-4 shrink-0" />
                    <span>{h}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
          <div>
            <SectionHeading eyebrow="What you need" title="Requirements" />
            <StaggerGroup className="mt-6 space-y-3">
              {product.requirements.map((r) => (
                <StaggerItem key={r}>
                  <div className="border-border flex items-start gap-3 rounded-lg border p-4 text-sm leading-relaxed">
                    <FileText className="text-muted-foreground mt-0.5 size-4 shrink-0" />
                    <span>{r}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </section>

      <section className="border-border bg-muted/30 border-y">
        <div className="container-page grid gap-8 py-12 md:grid-cols-3 md:py-16">
          <div>
            <h2 className="font-display flex items-center gap-2 text-base font-semibold">
              <ShieldCheck className="text-primary size-4" /> Refund policy
            </h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              14 days to change your mind, no return parcel needed. We refund to the original
              payment method within 30 days.{" "}
              <Link to="/refunds" className="text-primary underline">
                Full policy
              </Link>
              .
            </p>
          </div>
          <div>
            <h2 className="font-display flex items-center gap-2 text-base font-semibold">
              <Download className="text-primary size-4" /> Delivery
            </h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              File format: {product.fileFormat}. We email the file{" "}
              {deliveryWindowLabel(product.deliveryHours)} after payment is confirmed — no courier
              fee or delivery address needed.{" "}
              <Link to="/shipping" className="text-primary underline">
                How delivery works
              </Link>
              .
            </p>
          </div>
          <div>
            <h2 className="font-display flex items-center gap-2 text-base font-semibold">
              <FileText className="text-primary size-4" /> Licence
            </h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{product.license}</p>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="container-page py-16 md:py-20">
          <SectionHeading
            eyebrow="More from the shop"
            title="Other products you can use today"
            aside={
              <Button asChild variant="outline">
                <Link to="/shop">All products</Link>
              </Button>
            }
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {others.map((o) => (
              <Card key={o.id} className="border-card shadow-soft">
                <CardContent className="flex items-center gap-5 p-5">
                  <div className="bg-muted size-20 shrink-0 overflow-hidden rounded-md">
                    <img src={o.image} alt={o.imageAlt} className="size-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-display text-base font-semibold">{o.title}</p>
                    <p className="text-muted-foreground mt-1 line-clamp-2 text-sm leading-relaxed">
                      {o.shortDescription}
                    </p>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <span className="font-display text-sm font-semibold tabular-nums">
                        {formatNaira(o.price)}
                      </span>
                      <Button asChild size="sm" variant="outline">
                        <Link to={productPath(o.slug)}>View</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      <Reveal>
        <CTASection
          title={`Buy ${product.title.toLowerCase()}`}
          description="Pay once, receive the file by email within one business day."
          primary={{ label: `Buy — ${formatNaira(product.price)}`, to: checkoutPath(product.slug) }}
          secondary={{ label: "Back to shop", to: "/shop" }}
        />
      </Reveal>
    </PageShell>
  );
}
