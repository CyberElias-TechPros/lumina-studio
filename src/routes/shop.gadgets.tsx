import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { PageHero, PageShell } from "@/components/marketing/shell";
import { GadgetsCatalog } from "@/components/shop/gadgets-catalog";
import { getPageHead } from "@/lib/seo";
import supplierSnapshot from "@/data/supplier/afkit-observations.json";

export const Route = createFileRoute("/shop/gadgets")({
  head: () =>
    getPageHead({
      title: "Gadgets — laptops, phones and accessories",
      description:
        "Browse Afkit gadgets with Cyber Elias Academy. Ask us to confirm the current price, condition, stock and delivery before ordering.",
      path: "/shop/gadgets",
    }),
  component: GadgetsPage,
});

function GadgetsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Shop · Gadgets"
        title="Find your next gadget"
        description="Browse laptops, phones, monitors and accessories from Afkit. Send us the item you like and we'll check its current price and availability."
        meta={["New and UK-used items", "Price and stock confirmed before ordering"]}
      />
      <section className="container-page py-12 md:py-16">
        <div className="bg-muted/40 rounded-xl border p-5 text-sm leading-relaxed">
          <p className="font-semibold">Please check with us before ordering</p>
          <p className="text-muted-foreground mt-1">
            These product observations and photos come from an Afkit catalogue snapshot, not a live
            stock feed. The snapshot was observed on {supplierSnapshot.observedOn} and is not
            automatically updated. Items, specifications and condition may have changed or sold out.
            We will confirm the current price, condition, delivery and availability with you. No
            payment is collected on this page.
          </p>
          <p className="text-muted-foreground mt-2">
            Browse our{" "}
            <Link to="/shop" className="text-primary underline">
              digital products
            </Link>{" "}
            too.
          </p>
        </div>
        <GadgetsCatalog />
      </section>
    </PageShell>
  );
}
