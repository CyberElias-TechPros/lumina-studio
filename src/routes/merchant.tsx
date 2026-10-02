import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  Copy,
  ExternalLink,
  FileText,
  KeyRound,
  Rss,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";
import { CTASection, PageHero, PageShell, SectionHeading } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";
import { digitalProducts, productPath } from "@/data/digital-products";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/merchant")({
  head: () =>
    getPageHead({
      title: "Merchant Center — Cyber Elias Academy",
      description:
        "The settings to enter in Google Merchant Center for the CEA shop, plus the product feed URLs. The account has been repurposed for Cyber Elias Academy (Merchant ID 656455813).",
      path: "/merchant",
      noIndex: true,
    }),
  component: MerchantPage,
});

const settings: { label: string; value: string; copyable?: boolean; href?: string }[] = [
  { label: "Merchant Center account name", value: "Cyber Elias Academy" },
  { label: "Merchant Center ID", value: "656455813" },
  { label: "Website (verified, claimed)", value: "https://www.cea.ng/" },
  { label: "Business name", value: "Cyber Elias Academy" },
  {
    label: "Business address",
    value: "24/26 Ebony Road, Off Rumuola Road, Port Harcourt, Rivers, Nigeria",
  },
  { label: "Target country", value: "Nigeria (NG)" },
  { label: "Target currency", value: "Nigerian Naira (NGN)" },
  { label: "Customer-service email", value: "help@cea.ng" },
  { label: "Customer-service phone", value: "+234 905 862 8386" },
];

const feeds = [
  {
    icon: Rss,
    label: "Product feed — XML",
    href: "/feeds/google-merchant.xml",
    description: "RSS 2.0 with the g: namespace. Schedule a daily fetch in Merchant Center.",
  },
  {
    icon: FileText,
    label: "Product feed — CSV",
    href: "/feeds/google-merchant.csv",
    description: "Same product list, comma-separated. Use this if your feed tool prefers CSV.",
  },
];

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
          navigator.clipboard.writeText(value).then(
            () => {
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            },
            () => undefined,
          );
        }
      }}
      className="border-border text-muted-foreground hover:text-foreground hover:bg-muted grid size-8 place-items-center rounded-md border transition-colors"
      aria-label={`Copy ${value}`}
    >
      {copied ? <CheckCircle2 className="text-success size-4" /> : <Copy className="size-4" />}
    </button>
  );
}

function MerchantPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Merchant Center"
        title="The values to enter in Google Merchant Center"
        description="The account has been repurposed for Cyber Elias Academy. Use the settings below and the two feed URLs to start syncing products."
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://merchants.google.com/mc/overview?a=656455813"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium"
          >
            Open Merchant Center <ExternalLink className="size-4" />
          </a>
          <Link
            to="/shop"
            className="border-border hover:bg-muted inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium"
          >
            <ShoppingBag className="size-4" /> See the shop
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="Account settings"
          title="Enter these once in Business information"
          description="Match each value exactly. The knowledge graph will not disambiguate your listing if the spelling here drifts from the visible site."
        />
        <div className="mt-8 overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-muted-foreground text-xs uppercase tracking-wide">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Field</th>
                <th className="px-4 py-3 text-left font-medium">Value</th>
                <th className="px-4 py-3 text-right font-medium" aria-label="actions" />
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {settings.map((row) => (
                <tr key={row.label} className="bg-card">
                  <td className="text-muted-foreground px-4 py-3 align-top text-xs sm:text-sm">
                    {row.label}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs sm:text-sm">{row.value}</td>
                  <td className="px-4 py-3 text-right">
                    <CopyButton value={row.value} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-border bg-muted/30 border-y">
        <div className="container-page py-16 md:py-20">
          <SectionHeading
            eyebrow="Product feeds"
            title="Schedule these URLs in Merchant Center"
            description="Add both URLs as scheduled fetches (daily is fine). The files are regenerated on every deploy from the same product list as the shop pages."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {feeds.map((f) => (
              <div key={f.href} className="border-border bg-card rounded-lg border p-5">
                <div className="flex items-start gap-3">
                  <f.icon className="text-primary mt-0.5 size-5" />
                  <div className="flex-1">
                    <p className="font-display text-base font-semibold">{f.label}</p>
                    <a
                      href={f.href}
                      className="text-primary mt-1 inline-flex items-center gap-1 font-mono text-xs break-all hover:underline"
                    >
                      {`https://www.cea.ng${f.href}`}
                      <ExternalLink className="size-3" />
                    </a>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground mt-6 text-xs leading-relaxed">
            Note: Google will only fetch the feed once the live site is serving these URLs from{" "}
            <code className="font-mono">https://www.cea.ng</code>. Preview deployments are not
            reachable from Google's crawlers.
          </p>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="What is and isn't in the feed"
          title="Three products, no courses"
          description="Google does not list instructor-led classes, repairs or any service where the buyer is paying for time. Those are still on the site with real published prices — they just don't go in the Shopping feed."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {digitalProducts.map((p) => (
            <div key={p.id} className="border-border bg-card flex flex-col rounded-lg border p-5">
              <p className="font-display text-base font-semibold">{p.title}</p>
              <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                {p.shortDescription}
              </p>
              <dl className="text-muted-foreground mt-4 grid grid-cols-2 gap-2 text-xs">
                <dt>Price</dt>
                <dd className="text-foreground text-right font-mono">
                  ₦{p.price.toLocaleString("en-NG")}
                </dd>
                <dt>Currency</dt>
                <dd className="text-foreground text-right font-mono">{p.priceCurrency}</dd>
                <dt>Availability</dt>
                <dd className="text-foreground text-right font-mono">{p.availability}</dd>
                <dt>Condition</dt>
                <dd className="text-foreground text-right font-mono">{p.condition}</dd>
                <dt>MPN</dt>
                <dd className="text-foreground text-right font-mono">{p.mpn}</dd>
                <dt>GTIN</dt>
                <dd className="text-foreground text-right font-mono">{p.gtin ? p.gtin : "—"}</dd>
              </dl>
              <Link
                to={productPath(p.slug)}
                className="text-primary mt-5 inline-flex items-center gap-1 text-sm font-medium hover:underline"
              >
                View product page <ExternalLink className="size-3" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="border-border bg-muted/30 border-y">
        <div className="container-page py-16 md:py-20">
          <SectionHeading
            eyebrow="Policies"
            title="Point Merchant Center at these live pages"
            description="The shipping, return and payment policies referenced in the feed settings must match these pages. If the copy changes here, the values here stay canonical."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                to: "/shipping",
                title: "Shipping policy",
                body: "Electronic, Nigeria only, no courier fee.",
              },
              {
                to: "/refunds",
                title: "Return & refund policy",
                body: "14-day window, change of mind included, refund to original method within 30 days.",
              },
              {
                to: "/payment",
                title: "Payment policy",
                body: "Paystack handles cards, bank transfer and USSD. No extra fee at the bank page.",
              },
            ].map((p) => (
              <Link
                key={p.to}
                to={p.to}
                className="border-border bg-card hover:border-primary/40 block rounded-lg border p-5 transition-colors"
              >
                <p className="font-display text-base font-semibold">{p.title}</p>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{p.body}</p>
                <p className="text-primary mt-3 inline-flex items-center gap-1 text-xs font-medium">
                  {`https://www.cea.ng${p.to}`} <ExternalLink className="size-3" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Reveal>
        <CTASection
          title="Need to change a price or product?"
          description="Edit src/data/digital-products.json — the shop pages and both feed files rebuild from it on the next deploy."
          primary={{ label: "Open the shop", to: "/shop" }}
          secondary={{ label: "Email the team", to: "/contact" }}
        />
      </Reveal>

      <section className="container-page py-8 text-center">
        <p className="text-muted-foreground inline-flex items-center justify-center gap-2 text-xs">
          <KeyRound className="size-3.5" /> Keep the Merchant Center ID private — it controls the
          account.
        </p>
      </section>
    </PageShell>
  );
}
