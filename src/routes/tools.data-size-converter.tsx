import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, ArrowRight, HardDrive } from "lucide-react";
import { PageShell, PageHero, CTASection, Eyebrow } from "@/components/marketing/shell";
import { DataSizeConverter } from "@/components/tools/data-size-converter";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/tools/data-size-converter")({
  head: () =>
    getPageHead({
      title: "KB vs MB vs GB Converter — Which Is Bigger? Data Size Chart",
      description:
        "Free data size converter: type any size (500 MB, 1.5 GB) and see it in KB, MB, GB and TB — plus how many photos, songs or videos it holds, and why a 16 GB phone shows 14 GB.",
      path: "/tools/data-size-converter",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "CEA Data Size Converter — KB, MB, GB, TB",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
        description:
          "Convert between bytes, kilobytes, megabytes, gigabytes and terabytes, and see what each size holds in photos, songs and video.",
      },
    }),
  component: DataSizeConverterPage,
});

const FAQS = [
  {
    q: "Which is bigger, KB or MB?",
    a: "MB is bigger. A megabyte is about 1,000 kilobytes, so 1 MB holds roughly a thousand times more than 1 KB. In order from smallest to largest: KB, MB, GB, TB.",
  },
  {
    q: "Is 1 GB bigger than 1 MB?",
    a: "Yes. 1 GB = 1,000 MB (1,024 MB in Windows). A gigabyte is a thousand times larger than a megabyte, which is why a phone advertised with 128 GB cannot be described in megabytes on one screen.",
  },
  {
    q: "KB ka matlab kya hota hai?",
    a: "KB का मतलब किलोबाइट (kilobyte) है — डेटा मापने की सबसे छोटी आम इकाई। 1 KB = 1024 बाइट, और 1 MB = 1000 KB. यानी MB, KB से बड़ा होता है।",
  },
  {
    q: "Why does my 16 GB memory card only show 14.9 GB?",
    a: "The maker sells in decimal units (1 GB = 1,000,000,000 bytes). Windows reports the same bytes in binary units but still labels them \"GB\". The difference is about 7%, so 16 GB decimal shows as roughly 14.9 GiB in Windows. Nothing was removed.",
  },
  {
    q: "How much data is a megabyte?",
    a: "One megabyte is roughly: one phone photo, one four-minute song, a two-page scanned document, or about 200 WhatsApp text messages. A 1 GB bundle is 1,000 of those megabytes.",
  },
  {
    q: "Does a WhatsApp message use data?",
    a: "A text message is a few kilobytes — thousands fit in one megabyte. A photo is around 100 KB after WhatsApp compresses it. A one-minute video call is roughly 8 MB, which is where a bundle actually disappears.",
  },
];

function DataSizeConverterPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Free tool · Everyday computing"
        title={
          <>
            KB, MB, GB —{" "}
            <span className="font-serif text-primary font-normal italic">which is bigger?</span>
          </>
        }
        description="Type any size and see it in every unit at once, what it actually holds in photos and songs, and why a 16 GB phone reports 14 GB. No sign-up, nothing uploaded."
        meta={["KB · MB · GB · TB", "What fits inside", "Decimal vs binary"]}
      >
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link
            to="/tools"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium"
          >
            <ArrowLeft className="size-4" /> All tools
          </Link>
          <Link
            to="/blog/kilobytes-and-megabytes"
            className="text-primary inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
          >
            Read the full lesson <ArrowRight className="size-4" />
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-12 md:py-16" aria-label="Data size converter">
        <DataSizeConverter />

        <div className="mx-auto mt-14 max-w-3xl">
          <Eyebrow>
            <HardDrive className="size-3.5" aria-hidden="true" /> The short answer first
          </Eyebrow>
          <div className="border-foreground/10 bg-muted/25 mt-4 rounded-xl border p-5">
            <p className="text-foreground text-lg leading-relaxed">
              <strong>TB &gt; GB &gt; MB &gt; KB.</strong> Each step is about a thousand of the one
              below it: 1 TB = 1,000 GB, 1 GB = 1,000 MB, 1 MB = 1,000 KB. So when someone asks
              &ldquo;which is bigger, MB or KB?&rdquo;, the answer is always{" "}
              <strong>MB</strong> — and 2 GB is a thousand times bigger than 2 MB even though the
              digits look almost the same.
            </p>
          </div>

          <h2 className="font-display mt-12 text-2xl font-semibold tracking-tight">
            Common questions
          </h2>
          <div className="divide-foreground/10 mt-4 divide-y border-y border-foreground/10">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group">
                <summary className="hover:text-primary flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-sm font-semibold">
                  {faq.q}
                  <ArrowRight className="text-muted-foreground mt-0.5 size-4 shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <p className="text-muted-foreground pb-4 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>

          <div className="border-foreground/10 mt-10 rounded-xl border p-5">
            <h3 className="font-display text-lg font-semibold">Where this comes up in real life</h3>
            <ul className="text-muted-foreground mt-3 space-y-2 text-sm leading-relaxed">
              <li>
                <strong className="text-foreground">Choosing a bundle:</strong> 1 GB is 1,000 MB. If
                MTN or Airtel sell a &ldquo;1.5 GB&rdquo; weekly bundle, that is 1,500 MB — roughly
                400 photos, or about 90 minutes of 480p video.
              </li>
              <li>
                <strong className="text-foreground">Buying a memory card:</strong> a 64 GB card holds
                about 18,000 phone photos. A 128 GB card doubles that. Cards are far cheaper per
                gigabyte than mobile data, so copy photos off the phone rather than re-uploading
                them.
              </li>
              <li>
                <strong className="text-foreground">Sending files by email:</strong> Gmail stops at
                25 MB per message. One full-resolution photo can be 3.5 MB, so six photos is usually
                the practical limit before you must use Google Drive instead.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <CTASection
        title="Want the whole computer explained like this?"
        description="Our Computer Basics course covers files, storage, data and the internet in plain English — in person in Port Harcourt, from ₦20,000."
        primary={{ label: "See courses & fees", to: "/classes" }}
        secondary={{ label: "Try the free assessment", to: "/tools/assess" }}
      />
    </PageShell>
  );
}
