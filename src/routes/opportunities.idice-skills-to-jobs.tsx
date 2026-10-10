"use client";

import { useState } from "react";
import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { Check, Copy, ExternalLink, ShieldAlert } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CTASection, PageHero, PageShell, SectionHeading } from "@/components/marketing/shell";
import { getPageHead } from "@/lib/seo";

/** The only place applicants should submit. Never replace with a CEA form. */
const OFFICIAL_LINK = "https://www.wootlab.ng/idicebpo";
const BOI_PRIVACY = "https://www.boi.ng/privacy-policy/";
const PATH = "/opportunities/idice-skills-to-jobs";

const STATES = ["Akwa Ibom", "Bayelsa", "Cross River", "Delta", "Edo", "Rivers"];

const faqs = [
  {
    q: "Who can apply for the iDICE Skills-to-Jobs Programme (South-South)?",
    a: "Nigerian citizens aged 15 to 35 who live in Akwa Ibom, Bayelsa, Cross River, Delta, Edo or Rivers State. Applications from women and persons with disabilities are welcomed.",
  },
  {
    q: "Does it cost anything to apply?",
    a: "No. Applying is free. Never pay anyone to apply, to fill the form for you, or to be selected. If someone asks for money, do not pay and report it.",
  },
  {
    q: "Where do I apply?",
    a: `Only on the official iDICE application form: ${OFFICIAL_LINK}. Cyber Elias Academy and other organisations sharing this opportunity do not collect or submit applications on anyone's behalf.`,
  },
  {
    q: "Do I need a degree or work experience?",
    a: "No. The form accepts every level from no formal qualification and primary education up to postgraduate degrees and vocational certificates, and it asks whether you want to be matched to a job now, trained first, or assessed.",
  },
  {
    q: "What if I do not have a laptop or reliable internet?",
    a: "You can still apply. The form asks which devices you can access (including 'none of these yet') and how reliable your internet is. Answer honestly. A smartphone is enough to complete the form.",
  },
  {
    q: "Do I need a CV?",
    a: "No. A CV or portfolio is optional. Upload one if you have it; it can help show your skills.",
  },
  {
    q: "Is Cyber Elias Academy running this programme?",
    a: "No. We are sharing the opportunity so more young people in the South-South hear about it. The application form and selection are handled through the official iDICE channel. Data on the form is collected by the Bank of Industry and Synergy Prime/Wootlab.",
  },
];

const tracks = [
  {
    name: "Creative",
    skills: [
      "Fashion design",
      "Culinary arts and food production",
      "Graphic design",
      "Motion graphics",
      "Animation",
      "Customer service",
    ],
  },
  {
    name: "Technology and Digital",
    skills: [
      "Data entry",
      "Technical support",
      "Advanced CS",
      "Data analysis",
      "Content / SEO",
      "Graphic design",
      "UI/UX",
      "Coding basics",
      "Product management",
      "Motion graphics",
      "AI tools",
      "Digital marketing",
      "Cybersecurity",
      "Customer service",
    ],
  },
];

const checklist = [
  {
    item: "Your National Identification Number (NIN)",
    note: "Required. Have the 11 digits written down before you start.",
  },
  {
    item: "A passport photograph",
    note: "Required. A clear photo file on your phone, or take one with the camera from inside the form.",
  },
  {
    item: "A valid means of identification",
    note: "Required. A photo or scan of your NIN slip, driver's licence, international passport or voter's card.",
  },
  {
    item: "Phone number, WhatsApp number and email address",
    note: "All three are required. Use ones you check often — this is how you will be contacted.",
  },
  {
    item: "Your residential address",
    note: "State and LGA of residence (South-South only), city or town, and house number/street/area.",
  },
  {
    item: "Your education details",
    note: "Highest qualification, plus course, institution and year of completion if they apply to you.",
  },
  {
    item: "A short answer to “Why do you want to join this programme?”",
    note: "Required. Draft two or three honest sentences in advance so you are not rushed.",
  },
  {
    item: "CV or portfolio (optional)",
    note: "Upload a file or share links to your work if you have them.",
  },
];

const sections = [
  {
    title: "Personal details",
    body: "Full name, date of birth, gender, marital status, nationality, state of origin, NIN, phone, WhatsApp, email and your preferred contact channel (call, SMS, WhatsApp or email). You also upload your passport photograph and ID here.",
  },
  {
    title: "Location",
    body: "State and LGA of residence, city or town, residential address and how long you have lived there. You can tap “Use current location” to confirm your position.",
  },
  {
    title: "Inclusion and support",
    body: "Whether you have a disability. This helps the programme plan support; persons with disabilities are encouraged to apply.",
  },
  {
    title: "Education",
    body: "Highest qualification — from no formal qualification to postgraduate, including vocational/technical certificates — and, optionally, your course, institution and year of completion.",
  },
  {
    title: "Employment profile",
    body: "Whether you are currently employed, have ever been formally employed, and whether you are in school or training now (full-time, part-time or not).",
  },
  {
    title: "Skills, interest and track",
    body: "Your programme area (Creative or Technology and Digital), your pathway, your preferred training level, and any relevant skills or experience.",
  },
  {
    title: "Digital access and CV",
    body: "The devices you can use (smartphone, computer, both or none yet), how reliable your internet is, and an optional CV or portfolio.",
  },
  {
    title: "Availability and motivation",
    body: "Why you want to join, whether you can attend full-time, part-time or weekends only, anything that could stop you attending (transport, money, childcare, health, work, other), and how you heard about the programme.",
  },
  {
    title: "Consent and declaration",
    body: "You confirm your information is true, agree that your details and CV may be shared with employers and the iDICE PCU, consent to data use under the Nigeria Data Protection Act 2023, agree to the learner code of conduct, and choose Yes or No on use of your photograph in programme publicity.",
  },
];

const shareMessage = `📢 FREE: iDICE Skills-to-Jobs Programme (South-South) — applications open

For Nigerians aged 15–35 living in Akwa Ibom, Bayelsa, Cross River, Delta, Edo or Rivers State.

Choose a track:
• Creative — fashion, culinary arts, graphic design, motion graphics, animation, customer service
• Technology & Digital — data entry, tech support, data analysis, UI/UX, coding basics, digital marketing, cybersecurity, AI tools and more

Pick a pathway: get matched to a job now, train then get matched, or get assessed.

Have ready: NIN, passport photo, a valid ID, phone/WhatsApp/email, address and education details.

Apply ONLY on the official form 👉 ${OFFICIAL_LINK}

Applying is FREE. Never pay anyone to apply or be selected. Women and persons with disabilities are encouraged to apply.`;

export const Route = createFileRoute("/opportunities/idice-skills-to-jobs")({
  head: () =>
    getPageHead({
      title: "iDICE Skills-to-Jobs Programme South-South: how to apply",
      description:
        "Free iDICE skills-to-jobs applications for Nigerians aged 15–35 in Akwa Ibom, Bayelsa, Cross River, Delta, Edo and Rivers: tracks, documents and the official link.",
      path: "/opportunities/idice-skills-to-jobs",
      type: "article",
      structuredData: [
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "iDICE Skills-to-Jobs Programme (South-South): who can apply and how",
          description:
            "A plain-language guide to the free iDICE Skills-to-Jobs beneficiary application for young people in the South-South region of Nigeria.",
          author: { "@type": "Organization", name: "Cyber Elias Academy" },
          publisher: {
            "@type": "Organization",
            name: "Cyber Elias Academy",
            logo: { "@type": "ImageObject", url: "https://cea.ng/icon.svg" },
          },
          mainEntityOfPage: "https://cea.ng/opportunities/idice-skills-to-jobs",
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      ],
    }),
  component: IdiceOpportunity,
});

function ApplyButton({ label = "Apply on the official form" }: { label?: string }) {
  return (
    <Button asChild size="lg">
      <a href={OFFICIAL_LINK} target="_blank" rel="noopener noreferrer">
        {label} <ExternalLink className="ml-1 size-4" />
      </a>
    </Button>
  );
}

function CopyShareMessage() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;

  return (
    <div className="border-border bg-card rounded-lg border">
      <pre className="text-foreground/80 max-h-80 overflow-auto p-5 font-sans text-sm leading-relaxed whitespace-pre-wrap">
        {shareMessage}
      </pre>
      <div className="border-border flex flex-wrap gap-3 border-t p-4">
        <Button type="button" variant="outline" onClick={copy}>
          {copied ? <Check className="mr-1 size-4" /> : <Copy className="mr-1 size-4" />}
          {copied ? "Copied" : "Copy message"}
        </Button>
        <Button asChild variant="outline">
          <a href={whatsapp} target="_blank" rel="noopener noreferrer">
            Share on WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
}

function IdiceOpportunity() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Opportunity · South-South"
        title="Free skills-to-jobs training for young people in the South-South: iDICE applications are open"
        description="The iDICE Skills-to-Jobs Programme is recruiting Nigerians aged 15–35 across six South-South states for training in creative and digital skills and links to jobs. Applying is free and takes one online form. This page explains who qualifies, what you will be asked, and what to have ready before you start."
        meta={[
          "Ages 15–35",
          STATES.join(" · "),
          "Free to apply",
          "Women and persons with disabilities encouraged",
        ]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <ApplyButton />
          <Button asChild size="lg" variant="outline">
            <a href="#checklist">What you need to apply</a>
          </Button>
        </div>
        <p className="text-muted-foreground mt-4 text-sm">
          Official application link:{" "}
          <a
            href={OFFICIAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-medium break-all hover:underline"
          >
            {OFFICIAL_LINK}
          </a>
        </p>
      </PageHero>

      {/* At a glance */}
      <section className="container-page py-14 md:py-16">
        <SectionHeading eyebrow="At a glance" title="The opportunity in one minute" />
        <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            [
              "What it is",
              "iDICE Skills-to-Jobs Programme — training and job-matching for young people.",
            ],
            ["Who it is for", "Nigerian citizens aged 15–35 living in the South-South region."],
            ["Where", `${STATES.slice(0, -1).join(", ")} and ${STATES.at(-1)} States.`],
            ["Tracks", "Creative, or Technology and Digital."],
            ["Pathways", "Match to a job now, train then match, or get assessed first."],
            ["Cost", "Free to apply. Never pay anyone to apply or be selected."],
          ].map(([term, detail]) => (
            <div key={term} className="border-border rounded-lg border p-5">
              <dt className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                {term}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed">{detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Eligibility */}
      <section className="border-border bg-muted/40 border-y">
        <div className="container-page grid gap-10 py-14 md:grid-cols-2 md:py-16">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">Who can apply?</h2>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              You can apply if <strong className="text-foreground">all three</strong> are true:
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed">
              {[
                "You are a Nigerian citizen.",
                "You are between 15 and 35 years old.",
                `You live in one of the six South-South states: ${STATES.join(", ")}.`,
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <Check className="text-primary mt-0.5 size-4 shrink-0" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              Applications from <strong className="text-foreground">women</strong> and{" "}
              <strong className="text-foreground">persons with disabilities</strong> are welcomed.
              You do not need a degree, a job history or a laptop to apply — the form covers every
              education level and asks honestly about your device and internet access.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              How the programme fits you
            </h2>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              On the form you choose a <strong className="text-foreground">pathway</strong>:
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed">
              <li>
                <strong>Match to a job now</strong> — you already have job-ready skills.
              </li>
              <li>
                <strong>Train then match</strong> — you want training first, then a job link.
              </li>
              <li>
                <strong>Not sure — assess me</strong> — let the programme assess where you fit.
              </li>
            </ul>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              And a <strong className="text-foreground">training level</strong>: Foundational
              (entry), Developmental (intermediate), Specialised (advanced), or Not sure. You can
              also say whether you are available full-time, part-time or on weekends only.
            </p>
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section className="container-page py-14 md:py-16">
        <SectionHeading
          eyebrow="Programme areas"
          title="Two tracks to choose from"
          description="You pick one programme area of interest on the form. These are the skills listed under each."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {tracks.map((t) => (
            <div key={t.name} className="border-border rounded-lg border p-6">
              <h3 className="font-display text-lg font-semibold">{t.name}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {t.skills.map((s) => (
                  <li
                    key={s}
                    className="border-border bg-muted/50 rounded-full border px-3 py-1 text-xs"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Checklist */}
      <section id="checklist" className="border-border bg-muted/40 scroll-mt-24 border-y">
        <div className="container-page py-14 md:py-16">
          <SectionHeading
            eyebrow="Before you open the form"
            title="What to have ready"
            description="Gather these first. The form has file uploads and required fields, and it is easier to finish in one sitting when everything is on your phone already."
          />
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {checklist.map((c) => (
              <li key={c.item} className="border-border bg-card flex gap-3 rounded-lg border p-4">
                <Check className="text-primary mt-0.5 size-4 shrink-0" />
                <div>
                  <p className="text-sm font-medium">{c.item}</p>
                  <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{c.note}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-border bg-card mt-6 rounded-lg border p-5 text-sm leading-relaxed">
            <p className="font-medium">Tips that save you from errors</p>
            <ul className="text-muted-foreground mt-2 list-disc space-y-1.5 pl-5">
              <li>
                Type dates directly as <strong className="text-foreground">YYYY-MM-DD</strong> — for
                example, 15 May 2003 is <code>2003-05-15</code>. This applies to date of birth and
                year of completion.
              </li>
              <li>Fields marked * are required. Use the drop-down arrows where they appear.</li>
              <li>
                If you are on a phone, “Take photo” lets you capture your passport photograph and ID
                directly, and “Use current location” fills in your coordinates.
              </li>
              <li>
                Answer honestly about devices, internet and barriers — it helps the programme
                support you; it is not a trick question.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Form walkthrough */}
      <section className="container-page py-14 md:py-16">
        <SectionHeading
          eyebrow="Inside the form"
          title="The nine sections, explained"
          description="So nothing on the form surprises you. Section names match the official form."
        />
        <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((s, i) => (
            <li key={s.title} className="border-border rounded-lg border p-5">
              <p className="text-muted-foreground text-xs tabular-nums">Section {i + 1}</p>
              <h3 className="font-display mt-1 text-base font-semibold">{s.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <ApplyButton label="I'm ready — open the official form" />
        </div>
      </section>

      {/* Safety + data */}
      <section className="border-border bg-muted/40 border-y">
        <div className="container-page grid gap-10 py-14 md:grid-cols-2 md:py-16">
          <div>
            <h2 className="font-display flex items-center gap-2 text-2xl font-semibold tracking-tight">
              <ShieldAlert className="text-primary size-6" /> Stay safe: it is free
            </h2>
            <ul className="text-muted-foreground mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed">
              <li>
                <strong className="text-foreground">Applying is free.</strong> Never pay anyone to
                apply, to “fast-track” you, or to guarantee selection.
              </li>
              <li>
                Apply only on the official link:{" "}
                <a
                  href={OFFICIAL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary break-all hover:underline"
                >
                  {OFFICIAL_LINK}
                </a>
                . Do not send your NIN or ID to anyone over WhatsApp or by email “to apply for you”.
              </li>
              <li>
                Organisations helping to spread the word — including Cyber Elias Academy — do not
                collect, submit or screen applications.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              What happens to your data
            </h2>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              According to the form, your data is collected by the Bank of Industry and Synergy
              Prime/Wootlab to assess eligibility, select beneficiaries, deliver training and link
              you to jobs, in line with the Nigeria Data Protection Act 2023. It is shared only with
              the iDICE PCU (programme coordination unit), partner employers and certification
              bodies for those purposes.
            </p>
            <p className="mt-3 text-sm">
              <a
                href={BOI_PRIVACY}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline"
              >
                Read the Bank of Industry privacy policy
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* For organisations */}
      <section className="container-page py-14 md:py-16">
        <SectionHeading
          eyebrow="Help spread the word"
          title="Know someone who qualifies? Share this"
          description="The aim is simple: make sure as many eligible young people across the South-South as possible hear about this and can apply. Forward the message below to your class groups, alumni and youth networks, church or mosque groups, community associations, and WhatsApp, email or social-media communities."
        />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <CopyShareMessage />
          <div className="text-muted-foreground space-y-4 text-sm leading-relaxed">
            <p>
              <strong className="text-foreground">For organisations and community leaders:</strong>{" "}
              always point people to the official application link. Do not collect forms, NIN
              numbers or documents on applicants’ behalf.
            </p>
            <p>
              <strong className="text-foreground">Clarification for training partners:</strong>{" "}
              helping with beneficiary awareness is voluntary and separate from the iDICE Training
              and Infrastructure Partner selection processes. It does not constitute, influence or
              guarantee selection as a programme partner; partner applications are assessed strictly
              against the published requirements, criteria and evaluation process.
            </p>
            <p>
              Cyber Elias Academy shares this as a Port Harcourt skills academy in the South-South
              ecosystem. We are not the programme operator. For questions about the programme
              itself, rely on the official channel.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-border bg-muted/40 border-t">
        <div className="container-page py-14 md:py-16">
          <SectionHeading eyebrow="FAQ" title="Common questions" />
          <Accordion type="single" collapsible className="mt-6 max-w-3xl">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-base font-medium">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="text-muted-foreground mt-8 max-w-3xl text-xs leading-relaxed">
            This page summarises the official beneficiary application form as shared with partner
            organisations in October 2026. No closing date was stated in that information, so apply
            early. If anything here differs from the official form, the official form is correct.{" "}
            <Link to="/editorial" className="text-primary hover:underline">
              How we handle corrections
            </Link>
            .
          </p>
        </div>
      </section>

      <CTASection
        title="Ready? It takes one form."
        description="Have your NIN, passport photo, ID and contact details on your phone, then apply on the official iDICE form. It is free."
        primary={{ label: "Apply on the official form", to: OFFICIAL_LINK }}
        secondary={{ label: "Back to what you need", to: `${PATH}#checklist` }}
      />
    </PageShell>
  );
}
