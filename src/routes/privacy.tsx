import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { getPageHead } from "@/lib/seo";
import { PageShell, PageHero } from "@/components/marketing/shell";
import { UtilitySectionHeading } from "@/components/marketing/utility";
import { Reveal } from "@/components/motion";
import { PROCESSORS } from "@/lib/tracking";
import { CookieSettingsButton } from "@/components/marketing/cookie-settings-button";

export const Route = createFileRoute("/privacy")({
  head: () =>
    getPageHead({
      title: "Privacy Policy",
      description:
        "How Cyber Elias Academy collects and uses information: applications, cookies, and Google ads.",
      path: "/privacy",
      type: "article",
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const lastUpdated = "12 November 2026";

  return (
    <PageShell>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description={`Last updated: ${lastUpdated}. This page describes the information this website and the academy actually collect.`}
      />
      <section className="container-page py-16 md:py-24">
        <div className="max-w-3xl space-y-14">
          <Reveal>
            <UtilitySectionHeading index="01">Who we are</UtilitySectionHeading>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Cyber Elias Academy Ltd (“CEA”, “we”) is a digital-skills training centre at 24 Ebony
              Road, Off Rumuola Road, Port Harcourt, Rivers State, Nigeria (RC 8413776). Contact:{" "}
              <a href="mailto:help@cea.ng" className="text-primary underline">
                help@cea.ng
              </a>{" "}
              or +234 905 862 8386.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <UtilitySectionHeading index="02">Information we collect</UtilitySectionHeading>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              We collect what you type into our forms, and a small amount of technical data so the
              site can run.
            </p>
            <h3 className="mt-6 font-semibold">You give us</h3>
            <ul className="text-muted-foreground mt-3 list-inside list-disc space-y-2">
              <li>Name, email, phone, and the message or application you send</li>
              <li>The course you asked about, and any notes you include</li>
              <li>
                If you submit a project request: organisation, project brief, project type, budget
                range, timeline and the contact details needed to respond
              </li>
              <li>
                If you apply to partner: organisation, website, location, capabilities and your
                proposed collaboration
              </li>
              <li>
                If you create a learner login: email and a hashed password. We do not store card
                numbers
              </li>
            </ul>
            <h3 className="mt-6 font-semibold">Optional learning trail</h3>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              When you choose to bookmark or mark a lesson complete, the learning trail stores that
              selection in this browser on this device. It does not sync to your account. Practice
              answers and typed lab text are not saved by the trail. You can clear the trail from{" "}
              <Link to="/learning-trail" className="text-primary underline">
                your learning trail
              </Link>{" "}
              or your browser settings.
            </p>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              If optional analytics is enabled and you consent, we may count lab starts, lab
              completions and lesson-check uses to understand whether the activities are useful.
              These events do not include your answers or typed practice text. Analytics providers
              may collect technical information under their own policies.
            </p>
            <h3 className="mt-6 font-semibold">Optional Android phone notifications</h3>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              If you enable phone notifications, Google Firebase provides a device registration
              token. CEA stores that token, an installation identifier, a hash of the installation
              proof and timestamps, linked to your signed-in account and session. They are used to
              route notifications, not as a password. Our native notification sender sends a generic
              hint to open your inbox, not private message or payment details.
            </p>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              You can disable this in CEA menu → Phone notifications or block notifications in
              Android settings. Disabling stops local alerts immediately; removing the remote
              registration needs a connection. The app includes public offline lessons. Files you
              explicitly export to your device remain under your control and are not automatically
              deleted when you sign out.
            </p>
            <h3 className="mt-6 font-semibold">The site collects</h3>
            <ul className="text-muted-foreground mt-3 list-inside list-disc space-y-2">
              <li>Essential cookies: session, security, your light/dark preference</li>
              <li>Server logs: IP address, browser, pages requested, timestamps</li>
              <li>
                When enabled, Cloudflare Turnstile checks technical request data to help prevent
                automated form abuse
              </li>
              <li>Optional analytics cookies, only if you press Accept on the cookie banner</li>
              <li>Advertising cookies from Google, described in §6</li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <UtilitySectionHeading index="03">How we use it</UtilitySectionHeading>
            <ul className="text-muted-foreground mt-4 list-inside list-disc space-y-2">
              <li>
                Reply to you, confirm course dates and fees, and run the class you enrolled in
              </li>
              <li>
                Review project requests and partnership proposals, assess fit, and follow up about
                the work you described
              </li>
              <li>Issue and later check a certificate for work produced here</li>
              <li>Keep the site working and secure</li>
              <li>Show advertisements (Google AdSense), as described below</li>
            </ul>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              We do not sell your information. We do not run a public talent pool or share your
              details with employers unless you ask us to introduce you to a specific person.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <UtilitySectionHeading index="04">Who else sees it</UtilitySectionHeading>
            <ul className="text-muted-foreground mt-4 list-inside list-disc space-y-2">
              <li>
                Hosting and security services for this website (currently Vercel / Cloudflare)
              </li>
              <li>
                A transactional email provider to send enquiry receipts, replies and review notices
              </li>
              <li>Google, if ads or (with your consent) Analytics run on a page</li>
              <li>A parent or sponsor, if you named them on an application</li>
              <li>Authorities, if the law requires it</li>
            </ul>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Some of those companies store data outside Nigeria. If you want more detail, email
              help@cea.ng.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <UtilitySectionHeading index="05">Cookies and optional tools</UtilitySectionHeading>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Essential cookies make the site work: keeping you signed in, remembering your
              light or dark choice, and protecting forms. These cannot be switched off, because
              the site cannot function without them.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Everything else is optional and is grouped into two separate choices in the banner:{" "}
              <strong>analytics</strong> and <strong>advertising</strong>. You can allow one and
              refuse the other. If you refuse both, or simply never answer,{" "}
              <strong>none of the scripts below are downloaded at all</strong> — we do not load them
              and then suppress them, we do not fetch them and discard the result. The site behaves
              identically either way.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              You can change your mind at any time using the{" "}
              <CookieSettingsButton className="text-primary cursor-pointer underline" />{" "}
              link in the footer. Withdrawing consent is deliberately as easy as giving it.
            </p>
            <div className="border-border mt-8 overflow-hidden rounded-xl border">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">
                  Third-party services, what they do, and which consent category controls them
                </caption>
                <thead className="bg-muted/40">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Service</th>
                    <th scope="col" className="px-4 py-3 font-semibold">What it does</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Controlled by</th>
                  </tr>
                </thead>
                <tbody className="divide-border divide-y">
                  {PROCESSORS.map((processor) => (
                    <tr key={processor.name} className="align-top">
                      <td className="px-4 py-3">
                        <a
                          href={processor.policyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary font-medium underline"
                        >
                          {processor.name}
                        </a>
                        <p className="text-muted-foreground mt-1 text-xs">{processor.data}</p>
                      </td>
                      <td className="text-muted-foreground px-4 py-3 text-xs leading-relaxed">
                        {processor.purpose}
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-muted text-foreground rounded-full px-2 py-0.5 text-[11px] font-medium">
                          {processor.category} consent
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mt-4 text-xs leading-relaxed">
              This table is generated from the same register the site loads these scripts from, so
              it cannot list something we do not run or omit something we do. Where a tool could
              record what you type — Microsoft Clarity is the only one that can — recordings are
              configured to{" "}
              <strong className="text-foreground">mask all page text by default</strong>, so
              heatmaps show where people click and scroll, never what they read or enter.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <UtilitySectionHeading index="06">Advertising</UtilitySectionHeading>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              This site can show advertising from two networks: <strong>Google AdSense</strong>{" "}
              (publisher <code>ca-pub-9124992249317290</code>) and <strong>ngadverts</strong> (zone
              13225), a Nigerian ad network. Google uses cookies, including the DoubleClick cookie,
              to serve ads based on your visit here and on other sites. Neither network is
              contacted at all unless you give <strong>advertising</strong> consent in the banner;
              allowing analytics consent does not enable advertising.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Adverts appear only on pages whose job is reading: lessons, the lesson index, and the
              bottom of a course page after the enrolment panel. They do not appear on application,
              payment, checkout, contact, visit, legal, verification or signed-in pages, and they
              are never placed inside a form or above the content you came for. If you decline
              optional cookies, the site works exactly as it does otherwise, without those scripts.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Opt out of personalised ads at{" "}
              <a
                href="https://www.google.com/settings/ads"
                className="text-primary underline"
                rel="noopener noreferrer"
              >
                Google Ads Settings
              </a>{" "}
              or the{" "}
              <a
                href="https://optout.aboutads.info/"
                className="text-primary underline"
                rel="noopener noreferrer"
              >
                Digital Advertising Alliance
              </a>
              . How Google uses data on partner sites:{" "}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                className="text-primary underline"
                rel="noopener noreferrer"
              >
                policies.google.com/technologies/partner-sites
              </a>
              .
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              We do not click our own ads or ask visitors to click ads. Ads, when they appear, are
              labelled as advertising.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <UtilitySectionHeading index="07">Your rights</UtilitySectionHeading>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Under the Nigeria Data Protection Act 2023 you can ask to see, correct, or delete
              personal data we hold, or complain to the Nigeria Data Protection Commission. Email{" "}
              <a href="mailto:help@cea.ng" className="text-primary underline">
                help@cea.ng
              </a>
              . We aim to reply within 30 days.
            </p>
          </Reveal>

          <Reveal delay={0.35}>
            <UtilitySectionHeading index="08">How long we keep it</UtilitySectionHeading>
            <ul className="text-muted-foreground mt-4 list-inside list-disc space-y-2">
              <li>Contact messages: until we have dealt with them, then up to two years</li>
              <li>
                Project requests and partner applications: while they are being assessed and for up
                to two years after the last activity. Records needed for an active partnership or a
                legal obligation may be retained longer.
              </li>
              <li>
                Applications and class records: while you are a student, then up to seven years so
                we can verify a certificate
              </li>
              <li>
                Learner accounts: while the account is used, then deleted or anonymised after two
                years of silence
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.4}>
            <UtilitySectionHeading index="09">Children</UtilitySectionHeading>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Some classes include younger learners brought by a parent or guardian. Website forms
              are meant for an adult applying, or a parent applying for a child. We do not knowingly
              collect a child’s data through this site without that adult. If you think we have,
              email help@cea.ng and we will delete it.
            </p>
          </Reveal>

          <Reveal delay={0.45}>
            <UtilitySectionHeading index="10">Changes</UtilitySectionHeading>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              If this policy changes in a material way we will update the date on this page.
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <UtilitySectionHeading index="11">Contact</UtilitySectionHeading>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Cyber Elias Academy Ltd
              <br />
              24 Ebony Road, Off Rumuola Road
              <br />
              Port Harcourt, Rivers State, Nigeria
              <br />
              +234 905 862 8386
              <br />
              <a href="mailto:help@cea.ng" className="text-primary underline">
                help@cea.ng
              </a>
              <br />
              See also our{" "}
              <Link to="/terms" className="text-primary underline">
                terms
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
