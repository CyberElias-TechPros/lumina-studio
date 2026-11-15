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
        "Browse laptops, phones, monitors and accessories with Cyber Elias Academy. Add your preferred gadgets to your basket.",
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
        description="Explore laptops, phones, monitors and accessories. Find gadgets you love and add them to your basket."
        meta={["New and UK-used items", "Multi-item basket"]}
      />
      <section className="container-page py-12 md:py-16">
        <div className="bg-muted/40 rounded-xl border p-5 text-sm leading-relaxed">
          <p className="font-semibold">Find your next gadget with CEA</p>
          <p className="text-muted-foreground mt-1">
            Add one or more gadgets to your basket, then send your order on WhatsApp.
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
