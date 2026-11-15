import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { PageHero, PageShell } from "@/components/marketing/shell";
import { GadgetsCatalog } from "@/components/shop/gadgets-catalog";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/shop/gadgets")({
  head: () =>
    getPageHead({
      title: "Gadgets — laptops, phones and accessories",
      description:
        "Browse laptops, phones, monitors and accessories with Cyber Elias Academy. Order your preferred gadget on WhatsApp.",
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
        description="Explore laptops, phones, monitors and accessories. Find a gadget you love and order with us on WhatsApp."
        meta={["New and UK-used items", "Order on WhatsApp"]}
      />
      <section className="container-page py-12 md:py-16">
        <div className="bg-muted/40 rounded-xl border p-5 text-sm leading-relaxed">
          <p className="font-semibold">Find your next gadget with CEA</p>
          <p className="text-muted-foreground mt-1">
            Choose an item and message us on WhatsApp to place your order.
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
