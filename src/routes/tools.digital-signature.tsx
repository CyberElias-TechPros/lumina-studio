"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, ArrowRight, FileSignature } from "lucide-react";
import { PageShell, PageHero, CTASection, Eyebrow } from "@/components/marketing/shell";
import { DigitalSignatureExplainer } from "@/components/tools/digital-signature-explainer";
import { getPageHead } from "@/lib/seo";

/**
 * /tools/digital-signature — answers "what is a digital signature".
 *
 * 35 impressions at position 3.91 in the Search Console export, landing on a
 * glossary entry that 301s. The query is a low-volume but high-intent one, and
 * the confusion behind it is genuinely costly: people believe a pasted signature
 * image protects a document.
 */
export const Route = createFileRoute("/tools/digital-signature")({
  head: () =>
    getPageHead({
      title: "What Is a Digital Signature? Check a Fingerprint (Free)",
      description:
        "A digital signature proves who signed a document and that it has not changed since. Compare the three things called 'digital signature', and paste a certificate fingerprint to read what you are holding.",
      path: "/tools/digital-signature",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "CEA Digital Signature Explainer and Fingerprint Inspector",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
        description:
          "Explains the difference between a signature image, a scanned signature and a cryptographic digital signature, and reads certificate fingerprints locally.",
      },
    }),
  component: DigitalSignaturePage,
});

const FAQS = [
  {
    q: "What is a digital signature?",
    a: "A digital signature is a cryptographic proof that a specific private key signed an exact set of bytes, and that not one of those bytes has changed since. It answers two questions at once: who signed it, and is this still the document they signed. A pasted signature image answers neither.",
  },
  {
    q: "Is a picture of my signature a digital signature?",
    a: "No. It is an image. Anyone who has the file can copy that image into another document, change a figure and paste it back, and nothing will show it happened. It is the most common mistake because both are called 'signing a document'.",
  },
  {
    q: "What is a certificate fingerprint?",
    a: "A fingerprint is a short hash of a certificate, printed as hex groups like 3A:7F:2C. It lets two people confirm they are looking at the same certificate without comparing a whole file. SHA-256 fingerprints are 32 groups; older tools show 20-group SHA-1 fingerprints, which is a deprecated algorithm.",
  },
  {
    q: "Does a valid signature prove the person is trustworthy?",
    a: "No. It proves a specific identity signed specific content and nothing has changed since. Whether that identity is trustworthy, and whether they understood what they signed, are separate questions the signature cannot answer.",
  },
  {
    q: "Why does a PDF say the signature is invalid when it used to be valid?",
    a: "Usually the file was re-saved, annotated or edited after signing — even adding a comment can break it. That is the signature working as intended. Get a fresh copy from the sender rather than assuming fraud.",
  },
  {
    q: "Is SHA-1 still safe for signatures?",
    a: "No. Collisions have been demonstrated against SHA-1, so it should not be used for new signatures. Older systems still display SHA-1 fingerprints; treat them as a legacy identifier rather than proof, and prefer SHA-256 where you can choose.",
  },
];

function DigitalSignaturePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Free tool · Documents and security"
        title={
          <>
            Three things called a{" "}
            <span className="font-serif text-primary font-normal italic">digital signature</span>
          </>
        }
        description="Only one of them actually protects a document. Compare all three side by side, then paste a certificate fingerprint to see what you are holding. Nothing is uploaded and nothing is verified against a live authority."
        meta={["Signature vs scan vs crypto", "Fingerprint reader", "Do-this task"]}
      >
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link
            to="/tools"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium"
          >
            <ArrowLeft className="size-4" /> All tools
          </Link>
          <Link
            to="/blog/signed-or-just-a-picture"
            className="text-primary inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
          >
            Read the full lesson <ArrowRight className="size-4" />
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-12 md:py-16" aria-label="Digital signature explainer">
        <DigitalSignatureExplainer />

        <div className="mx-auto mt-16 max-w-3xl">
          <Eyebrow>
            <FileSignature className="size-3.5" aria-hidden="true" /> The short answer first
          </Eyebrow>
          <div className="border-foreground/10 bg-muted/25 mt-4 rounded-xl border p-5">
            <p className="text-foreground text-lg leading-relaxed">
              A <strong>digital signature</strong> uses cryptography to prove two things: which key
              signed the document, and that the document has not changed by a single byte since.
              Change one character and verification fails. A <strong>signature image</strong> pasted
              into a file proves nothing at all — anyone with the file can copy it, edit the
              document, and paste it back with no trace.
            </p>
          </div>

          <h2 className="font-display mt-12 text-2xl font-semibold tracking-tight">
            Why this distinction costs people money
          </h2>
          <p className="text-muted-foreground mt-3 text-base leading-relaxed">
            In Nigeria, a contract is often printed, signed in ink, photographed, and sent over
            WhatsApp. Everyone in that chain believes the document is &ldquo;signed&rdquo;. It is a
            photograph of a signature — it proves a page once had ink on it, and nothing about the
            file now in your hand. When the figure on that page is disputed, the photograph cannot
            settle it.
          </p>
          <p className="text-muted-foreground mt-3 text-base leading-relaxed">
            A cryptographic signature is different in kind, not in degree: it fails loudly if the
            content changes. That is why banks, e-government portals and software update systems use
            it, and why &ldquo;we sent it as a PDF&rdquo; is not the same as &ldquo;it is
            signed&rdquo;.
          </p>

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
        title="Learn to check documents, not just send them"
        description="The Cybersecurity programme covers identity, certificates, and how to verify what you have been given before you act on it."
        primary={{ label: "See the cybersecurity course", to: "/classes/cybersecurity" }}
        secondary={{ label: "Try the security assessment", to: "/tools/security-assessment" }}
      />
    </PageShell>
  );
}
