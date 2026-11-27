import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, ArrowRight, Cloud } from "lucide-react";
import { PageShell, PageHero, CTASection, Eyebrow } from "@/components/marketing/shell";
import { CloudExplainer } from "@/components/tools/cloud-explainer";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/tools/cloud-explainer")({
  head: () =>
    getPageHead({
      title: "What Is the Cloud? Plain-English Guide + Data Calculator",
      description:
        "The cloud is someone else's computer in a building — here is exactly where your photos, WhatsApp chats and email actually live, what happens when data runs out, and what each action costs in MB.",
      path: "/tools/cloud-explainer",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        name: "What Is the Cloud, Really?",
        description:
          "A plain-English explanation of cloud storage with a Nigerian data-bundle calculator showing what each online action costs.",
        inLanguage: "en-NG",
        learningResourceType: "Explainer",
        educationalLevel: "Beginner",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
      },
    }),
  component: CloudExplainerPage,
});

const FAQS = [
  {
    q: "What is the cloud in simple words?",
    a: "The cloud is a computer owned by Google, Microsoft or Apple, kept in a building with reliable power and internet, running all the time. Your file is copied onto that computer over your data, and pulled back down when you open it on another device. You rent space on it; you do not own it.",
  },
  {
    q: "How do I use the cloud?",
    a: "You are almost certainly already using it. If you have a Gmail address, your email, contacts and calendar are in the cloud. To use it deliberately: open Google Drive (or OneDrive), tap the + button, and choose Upload. Anything you upload appears on every device signed in to the same account.",
  },
  {
    q: "Is the cloud free?",
    a: "A Google account includes 15 GB free, shared between Gmail, Photos and Drive. Microsoft gives 5 GB with OneDrive. Beyond that, 100 GB costs roughly ₦2,000–₦3,000 a month depending on the exchange rate. Phone storage is a one-off purchase; cloud storage is a subscription.",
  },
  {
    q: "Does the cloud work without internet?",
    a: "No, not by default. A cloud-only file will not open without a connection. Google Drive and Docs both have an offline mode you must switch on in advance — while you still have data — and files you have explicitly marked for offline use keep working.",
  },
  {
    q: "Is the cloud safe for my documents?",
    a: "For most purposes, yes — it is safer than a single phone that can be stolen. Your protection is the account password plus two-step verification. Turn on two-step verification today; without it, one leaked password exposes every photo and document in the account.",
  },
  {
    q: "What is the difference between the cloud and a backup?",
    a: "A backup is a copy made for recovery. The cloud is a location. If you sync a file to Drive and then delete it on your phone, it is deleted from Drive too — that is sync, not backup. A real backup keeps a separate copy you can restore from after a mistake.",
  },
  {
    q: "Does WhatsApp backup use my data?",
    a: "WhatsApp is set to back up only on Wi-Fi by default. If you turn Wi-Fi off permanently and never connect to it, backups stop happening silently — which is why a new phone often shows no old chats. Check Settings → Chats → Chat backup to see the last backup date.",
  },
];

function CloudExplainerPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Free tool · Everyday computing"
        title={
          <>
            What is{" "}
            <span className="font-serif text-primary font-normal italic">
              &ldquo;the cloud&rdquo;
            </span>{" "}
            — really?
          </>
        }
        description="Not a place in the sky. A building with a computer in it, and a copy of your file. See exactly where your photos, chats and email live, and what each online action costs from your bundle."
        meta={["Plain-English explainer", "Where your files live", "Data cost calculator"]}
      >
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link
            to="/tools"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium"
          >
            <ArrowLeft className="size-4" /> All tools
          </Link>
          <Link
            to="/blog/the-cloud-in-ordinary-words"
            className="text-primary inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
          >
            Read the full lesson <ArrowRight className="size-4" />
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-12 md:py-16" aria-label="What the cloud is">
        <div className="mx-auto max-w-5xl">
          <CloudExplainer />
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <Eyebrow>
            <Cloud className="size-3.5" aria-hidden="true" /> A short history, because it explains
            the confusion
          </Eyebrow>
          <div className="text-muted-foreground mt-4 space-y-3 text-sm leading-relaxed">
            <p>
              Before about 2008, most people saved files to the computer in front of them. Moving a
              file meant a flash drive. Designers drew a fluffy cloud in diagrams to mean &ldquo;the
              internet, details not important&rdquo; — a filler symbol, the same way a map draws sea
              monsters.
            </p>
            <p>
              Then Google, Amazon and Microsoft started renting out their spare server space, and
              the marketing inherited that fluffy symbol. &ldquo;Save to the cloud&rdquo; sounded
              weightless and modern. &ldquo;Save to a server in Ireland&rdquo; would have been more
              accurate and far less appealing.
            </p>
            <p className="text-foreground font-medium">
              The practical consequence is small but real: nothing is automatic. If a file is in the
              cloud, somebody chose to put it there — usually an app doing it for you, occasionally
              without asking.
            </p>
          </div>

          <div className="border-foreground/10 bg-card mt-8 rounded-xl border p-5">
            <h2 className="font-display text-lg font-semibold">Three things worth doing today</h2>
            <ol className="text-muted-foreground mt-3 space-y-2.5 text-sm leading-relaxed">
              <li className="flex gap-2.5">
                <span className="text-primary font-mono text-xs font-semibold">01</span>
                <span>
                  <strong className="text-foreground">Turn on two-step verification</strong> for
                  your Google account. Everything in this page rests on that password holding.
                </span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-primary font-mono text-xs font-semibold">02</span>
                <span>
                  <strong className="text-foreground">Check your last WhatsApp backup date.</strong>{" "}
                  Settings → Chats → Chat backup. If it says &ldquo;never&rdquo;, set it to daily
                  and allow Wi-Fi.
                </span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-primary font-mono text-xs font-semibold">03</span>
                <span>
                  <strong className="text-foreground">Confirm one file is really backed up.</strong>{" "}
                  Open Google Photos on a computer, find a recent picture, and check it opens there.
                  A backup you have never tested is a hope, not a backup.
                </span>
              </li>
            </ol>
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
        </div>
      </section>

      <CTASection
        title="Learn the internet properly, in one month."
        description="Computer Basics covers the cloud, data bundles, email and file storage in plain English — in person in Port Harcourt. No prior experience needed."
        primary={{ label: "See courses & fees", to: "/classes" }}
        secondary={{ label: "Read the free notes", to: "/blog/the-cloud-in-ordinary-words" }}
      />
    </PageShell>
  );
}
