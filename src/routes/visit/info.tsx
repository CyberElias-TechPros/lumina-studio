import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell, PageHero, CTASection } from "@/components/marketing/shell";
import { CampusImg } from "@/components/marketing/photos";
import { campusGallery } from "@/data/academy";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/visit/info")({
  head: () =>
    getPageHead({
      title: "How to find us — Cyber Elias Academy",
      description:
        "Cyber Elias Academy is at 24/26 Ebony Road, off Rumuola Road, Port Harcourt. Opening hours Monday to Saturday, 8:00–20:00.",
      path: "/visit/info",
    }),
  component: VisitInfoPage,
});

function VisitInfoPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Directions"
        title="How to find us"
        description="24/26 Ebony Road, off Rumuola Road, Port Harcourt. One classroom. Call if you want to sit in on a session."
      />

      <section className="container-page grid gap-4 py-10 sm:grid-cols-2 lg:grid-cols-4 md:py-12">
        {campusGallery.map((shot) => (
          <figure key={shot.id} className="border-border overflow-hidden rounded-lg border">
            <CampusImg id={shot.id} className="aspect-[4/3]" />
            <figcaption className="text-muted-foreground px-3 py-2 text-xs">
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </section>

      <section className="container-page grid gap-10 pb-16 md:grid-cols-2">
        <div>
          <h2 className="font-display flex items-center gap-2 text-xl font-semibold">
            <MapPin className="size-5" /> Address
          </h2>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
            24/26 Ebony Road, Off Rumuola Road, Port Harcourt, Rivers State. Keke, taxi or bus to
            Rumuola, then a short walk.
          </p>
          <ul className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
            <li>Monday–Saturday, 8:00–20:00 WAT</li>
            <li>+234 905 862 8386</li>
            <li>help@cea.ng</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/visit">Tell us you are coming</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact">Contact</Link>
            </Button>
          </div>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold">What you will see</h2>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
            A computer classroom with practice machines, a whiteboard and a wall screen. We do not
            have a four-floor campus, a café, or an employer lounge. If a class is running when you
            arrive, you can sit at the back if you called ahead.
          </p>
        </div>
      </section>

      <CTASection />
    </PageShell>
  );
}
