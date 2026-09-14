import type { SessionLecture } from "../types";

/**
 * Web Design — ₦25,000 · 4 weeks · 8 sessions.
 * Sessions 7 and 8. (Sessions 1–3 in web-design.ts, 4–6 in web-design-b.ts.)
 */
export const webDesignLessonsC: Record<string, SessionLecture> = {
  "quality-ux-accessibility-seo": {
    summary:
      "The difference between a site that exists and a site that works. This session covers usability and accessibility — what makes a page usable by everyone, including people who cannot see it — then on-page SEO, performance, and the pre-launch checklist that catches what a designer stops noticing.",
    objectives: [
      "Apply usability principles that reduce friction for real visitors",
      "Make a page usable with a keyboard and with a screen reader",
      "Meet contrast, focus and semantic requirements as requirements, not extras",
      "Write titles, descriptions and headings that work for search",
      "Diagnose and fix the performance problems that lose visitors",
      "Run a full pre-launch checklist before handing over",
    ],
    blocks: [
      {
        heading: "Usability: removing friction",
        body: [
          "Usability is not aesthetic taste; it is whether a person can accomplish what they came for without thinking about the interface. The failures on Nigerian business sites are consistent. A phone number that must be copied rather than tapped. A form with no labels so the visitor guesses what each box wants. Text too small to read on a phone in daylight. A hero whose headline is unreadable over a photograph. Navigation that does not say where it leads. A page that takes fifteen seconds to load on mobile data, by which time the visitor has left.",
          "The principles that fix most of it are few. **Make the primary action obvious and reachable** — the WhatsApp or call button should be visible without hunting, ideally in the header as well as the contact section, because a visitor who decides to call should never have to scroll to find the number. **Say what things are**: 'Get a quote' beats 'Submit', 'See our prices' beats 'Learn more', because a vague label forces the visitor to guess the consequence of clicking. **Keep forms short** — every field you add loses some completions, so ask only for what you genuinely need to respond.",
          "Then there is the principle that ties them together: **test it as a stranger would**. Open the page on a phone, in daylight, over mobile data, having never seen it before, and try to make contact. Every hesitation you feel is a real cost, and the designer who built the page is the least qualified person to find them because they already know where everything is. This is why the pre-launch checklist at the end of this session exists.",
        ],
      },
      {
        heading: "Accessibility: what it is and why it is not optional",
        body: [
          "Roughly one in six people worldwide has a significant disability, and that includes people who are blind, have low vision, cannot use a mouse, are deaf, or are colour blind. **Accessibility** is whether they can use your page. It is a legal requirement in many jurisdictions, it is a moral one everywhere, and in practical terms it also improves the page for everyone — captions help in a noisy room, good contrast helps in sunlight, semantic structure helps a search engine.",
          "The three things that matter most, and they are all things you have already learned. **Semantic HTML** — a screen reader navigates by landmarks and headings, so a page of divs with styled text is effectively unnavigable, while `main`, `nav`, `h1` to `h3` give a blind user a way to jump to what they need. **Alt text** — a screen reader reads it aloud, so an image without one is a hole in the content. **Contrast** — body text needs at least 4.5:1 against its background, and low-contrast grey-on-white excludes a large share of low-vision users while looking fine to the person who designed it in a dim room.",
          "Two more that cost nothing. **Visible focus** — when you tab through a page, the focused element must be visibly marked; `outline: none` with no replacement is a common and genuinely harmful thing to find in a stylesheet, because it makes keyboard navigation impossible to follow. And **labels on form fields** — an unlabelled input is announced as 'edit text' with no indication of what to enter. Fix those five things and a page moves from unusable to usable for most assistive-technology users, and every one of them is something a beginner can do from the first project.",
        ],
      },
      {
        heading: "On-page SEO: what actually moves the needle",
        body: [
          "Search engine optimisation at this level is not mysterious and it is mostly good HTML. The elements that matter, in rough order of impact. **The title tag** — the single most important piece of text, because it is what appears in the search result and what the engine reads first. It should name the business, what it does and where: 'Adaeze Cakes — Custom Wedding & Birthday Cakes in Lagos'. A title left as 'Document' or 'Home' is a free visibility loss on every page.",
          "**The meta description** does not directly rank you, but it is the sentence shown under your title in results, so writing one that answers the searcher's question measurably improves click-through. **Headings** — one `h1` per page stating the topic, then `h2` and `h3` for sections — because they form the outline the engine uses to understand structure. **Real content** that answers the questions a customer would ask, in the words they would use; a services page with three sentences cannot rank for anything.",
          "Then the technical basics: **alt text** on images, which is both accessibility and image search; **fast loading**, which is a ranking signal and which on a Nigerian mobile connection is mostly about image size; **mobile friendliness**, without which a page is penalised; and **clean URLs** — `/wedding-cakes` rather than `/page?id=47`. What does not help: keyword stuffing, which reads badly to humans and is penalised; buying links; and any scheme promising a shortcut. The honest summary is that SEO at this level is the by-product of building a clear, fast, well-structured page with real content, and there is no separate trick.",
        ],
      },
      {
        heading: "Performance: the ranking signal visitors feel",
        body: [
          "A slow page loses visitors before they see anything, and on mobile data — the normal condition in Nigeria — the losses are severe. Studies of abandonment and everyday experience agree: past about three seconds a large share of mobile visitors leave. Diagnose in the dev tools **Network** panel, sorted by size, and you will almost always find the same three causes.",
          "**Images** are the first and largest. A phone photograph is routinely several megabytes; five of them on a page is twenty megabytes, which on a mobile connection is not a website but a download. Resize to the largest displayed size and compress — the visual difference is nil and the size difference is often tenfold. **Fonts** are second: each weight is a separate file, and loading a family in six weights when you use two wastes four downloads. Load only what you use, and prefer `font-display: swap` so text renders immediately in a fallback rather than waiting invisibly. **Too many requests** is third — every script, icon library and tracking snippet is another round trip, and a page making ninety requests will be slow regardless of file sizes.",
          "The target for a small business site is a total page weight under about two megabytes and a load under three seconds on mobile data. That is achievable on almost any business site with compressed images, two font weights and no unnecessary scripts — and it is worth stating to a client explicitly, because they will judge the site by how it feels on their phone before they judge anything else.",
        ],
      },
      {
        heading: "The pre-launch checklist",
        body: [
          "A designer stops seeing their own page after a few days, which is why a checklist matters more than attention. Run it before every handover. **Content**: no placeholder text, no 'Lorem ipsum', no broken sentences, every price and phone number correct — read the whole page aloud once, which catches what skimming never does. **Links**: click every single one, including the footer and the fragment links in the navigation, and confirm the WhatsApp deep link opens with the right number and message.",
          "**Forms**: submit one and confirm the message actually arrives somewhere, because a form that silently discards enquiries is worse than no form and it can take a client months to notice. **Images**: confirm every one has alt text and none is several megabytes. **Contact**: tap the phone number on a real phone and confirm it dials. **Responsiveness**: check at 360, 768 and 1280, and load it on a real phone over mobile data. **Titles**: confirm no page says 'Document' or 'Untitled'. **Console**: open dev tools and confirm there are no red errors, because a JavaScript error can silently break something you are not looking at.",
          "Then the handover itself: give the client the files or the hosting login, explain in plain language how to change a price or a photograph, and tell them what they should not touch. A client who breaks the site in week one and blames you is a common and entirely preventable outcome, and ten minutes of explanation prevents it.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor runs the business site through a full quality pass — accessibility audit, SEO review, performance measurement — fixing each finding live, then executes the pre-launch checklist and the client handover.",
      steps: [
        {
          step: "Tab through the page",
          detail:
            "Press Tab repeatedly and watch the focus. Find an element with outline removed and no replacement, and restore a visible focus style. Explain why this breaks keyboard navigation entirely.",
        },
        {
          step: "Check the heading outline",
          detail:
            "List the headings in order in dev tools and show where levels were skipped for size. Fix them by rank, explaining that the outline is how a screen reader user navigates.",
        },
        {
          step: "Audit alt text",
          detail:
            "List every image and its alt attribute. Write real descriptions for the meaningful ones and empty alt for the decorative, and explain the difference between the two.",
        },
        {
          step: "Measure contrast",
          detail:
            "Run every text-and-background pair through a checker, list the failures against 4.5:1, and darken until each passes. Explain why judging by eye in a dim room fails.",
        },
        {
          step: "Check the form labels",
          detail:
            "Confirm every input has a label with matching for and id, and the right input type. Show what a screen reader announces for an unlabelled field.",
        },
        {
          step: "Review the titles",
          detail:
            "List every page title and rewrite any that says 'Document', 'Home' or 'Untitled' into business, service and location. Explain that this is the highest-impact SEO change available.",
        },
        {
          step: "Write meta descriptions",
          detail:
            "Write one per page answering the searcher's question rather than describing the business. Explain that it does not rank you but it does change click-through.",
        },
        {
          step: "Measure the page weight",
          detail:
            "Open the Network panel, sort by size, and read the total. Identify the largest files. Explain that this single panel answers 'why is it slow'.",
        },
        {
          step: "Compress the images",
          detail:
            "Resize and compress the offenders, then re-measure. Show the total weight before and after, and note that the visual difference is nil.",
        },
        {
          step: "Reduce font weights and scripts",
          detail:
            "Cut the Google Fonts request to the weights actually used, add font-display: swap, and remove an unused script. Re-measure the request count.",
        },
        {
          step: "Run the pre-launch checklist",
          detail:
            "Read the page aloud, click every link, submit the form, tap the phone number on a real phone, check three widths, and confirm the console has no errors.",
        },
        {
          step: "Do the client handover",
          detail:
            "Explain in plain language how to change a price and a photograph, what not to touch, and where the files live. Explain that this ten minutes prevents most post-launch blame.",
        },
      ],
    },
    practice: {
      title: "Full quality pass and handover",
      brief:
        "You run a complete quality pass on the business site — accessibility, SEO, performance — documenting every finding and fix, then execute the pre-launch checklist and write a plain-language handover note for the client.",
      steps: [
        "Tab through the whole page and restore a visible focus style wherever it is missing.",
        "List the heading order and fix any levels skipped for size.",
        "Audit every image's alt text; write real descriptions or empty alt as appropriate.",
        "Measure every text-and-background pair and darken until all pass 4.5:1.",
        "Confirm every form field has a matching label and the correct input type.",
        "Rewrite every page title to include business, service and location.",
        "Write a meta description per page answering the searcher's question.",
        "Measure total page weight and request count in the Network panel.",
        "Compress and resize the largest images and re-measure.",
        "Reduce font weights to those used, add font-display: swap, and remove unused scripts.",
        "Read the whole page aloud and fix any placeholder or broken text.",
        "Click every link, submit the form and confirm delivery, and tap the phone number on a real phone.",
        "Check at 360, 768 and 1280, then load on a real phone over mobile data and record the time.",
        "Confirm the console shows no errors, then write the plain-language handover note.",
      ],
      standard:
        "A documented pass where focus is visible, headings form a correct outline, every image has appropriate alt text, all text passes 4.5:1, every title names business, service and location, page weight is under about two megabytes, every link and the form have been tested end to end, and a handover note explains how to edit content.",
    },
    pitfalls: [
      {
        problem: "You removed the focus outline with no replacement",
        fix: "Restore a visible focus style. outline: none without a replacement makes keyboard navigation impossible to follow, which excludes keyboard-only users entirely — and it is one of the most common accessibility failures found in a stylesheet.",
      },
      {
        problem: "Your headings skip levels because of how they look",
        fix: "Choose by rank, not size. A screen reader user navigates by the heading outline, and skipped levels make that navigation incoherent. Size belongs in CSS.",
      },
      {
        problem: "Your page titles say 'Document' or 'Home'",
        fix: "Write business, service and location in every title. It is the primary text a search engine reads and what appears in a shared link, and fixing it is the highest-impact SEO change available.",
      },
      {
        problem: "Your page is several megabytes and slow on mobile data",
        fix: "Sort the Network panel by size — it is almost always images. Compress and resize, cut font weights to those used, and remove unused scripts. Target under two megabytes.",
      },
      {
        problem: "You loaded six font weights and use two",
        fix: "Request only the weights you use and add font-display: swap. Each weight is a separate download and invisible text while it loads is a real usability cost.",
      },
      {
        problem: "You tested the form by looking at it",
        fix: "Submit it and confirm the message arrives. A form that silently discards enquiries is worse than none, and clients typically take months to notice.",
      },
      {
        problem: "You handed over with no explanation",
        fix: "Spend ten minutes showing the client how to change a price and a photograph, and what not to touch. A client who breaks the site and blames you is a common and entirely preventable outcome.",
      },
    ],
    expertNotes: [
      "Tab through every page you build before delivery. It takes thirty seconds and it finds focus problems, broken tab order and unreachable controls — and it is the single fastest accessibility check there is.",
      "Measure contrast rather than judging it. Your eye adapts within seconds and a dim room makes low contrast look acceptable, which is exactly why so many Nigerian business sites fail this and their owners cannot see it.",
      "Read the whole page aloud once before launch. It catches placeholder text, broken sentences and wrong prices that skimming never will, and it is the cheapest quality check available.",
      "Sort the Network panel by size on every project, even when the client has not complained. It tells you in one look where the page is heavy, and keeping a site under two megabytes is what makes it feel fast on the connection most Nigerian visitors actually have.",
    ],
    vocabulary: [
      { term: "Accessibility", meaning: "Whether people with disabilities can use the page. A requirement, not an enhancement." },
      { term: "Screen reader", meaning: "Software reading a page aloud and navigating by landmarks and headings. Depends entirely on semantic HTML." },
      { term: "Focus style", meaning: "The visible mark on the keyboard-focused element. Removing it without a replacement breaks keyboard navigation." },
      { term: "Contrast ratio", meaning: "A numeric measure of text legibility against its background. Body text needs at least 4.5:1." },
      { term: "Title tag", meaning: "The most important text on a page for search: business, service and location." },
      { term: "Meta description", meaning: "The sentence shown under a title in results. Does not rank, but changes click-through." },
      { term: "Page weight", meaning: "Total bytes downloaded. Target under about two megabytes for a business site on mobile data." },
      { term: "font-display: swap", meaning: "Renders text immediately in a fallback font rather than hiding it while the web font loads." },
    ],
    homework: [
      {
        task: "Tab through three sites",
        detail:
          "Press Tab repeatedly on three real sites and note where focus is invisible or the order is illogical. This trains the check you will run on every page you build.",
      },
      {
        task: "Audit your own site's contrast",
        detail:
          "Measure every text-and-background pair against a checker and list the failures. Fix each by darkening the text, and re-measure.",
      },
      {
        task: "Rewrite five page titles",
        detail:
          "Take five pages from sites you find and rewrite their titles to include business, service and location. Note how much more useful each becomes in a search result.",
      },
      {
        task: "Measure and halve a page weight",
        detail:
          "Find a heavy page, sort the Network panel by size, and work out what you would compress or remove to halve it. Then do it to one of your own pages.",
      },
    ],
    rubric: [
      {
        criterion: "Accessibility",
        passing: "The page is mostly usable.",
        excellent: "Visible focus throughout, a correct heading outline, appropriate alt text on every image, all text passing 4.5:1, and every form field labelled.",
      },
      {
        criterion: "SEO",
        passing: "Pages have titles.",
        excellent: "Every title naming business, service and location, a meta description per page, a logical heading structure and clean URLs.",
      },
      {
        criterion: "Performance",
        passing: "The page loads.",
        excellent: "Under about two megabytes, images compressed, only used font weights loaded with font-display: swap, and unused scripts removed.",
      },
      {
        criterion: "Pre-launch discipline",
        passing: "Checks the obvious.",
        excellent: "The full checklist run — page read aloud, every link clicked, form tested end to end, phone number tapped on a real phone, console clean.",
      },
      {
        criterion: "Handover",
        passing: "Delivers the files.",
        excellent: "A plain-language note explaining how to change content, what not to touch and where the files live.",
      },
    ],
    faqs: [
      {
        q: "Is accessibility really required for a small business site?",
        a: "It is a legal requirement in many jurisdictions and a moral one everywhere. Practically, the core of it — semantic HTML, alt text, contrast, labels, visible focus — costs nothing because it is simply good HTML, and it improves the page for every visitor including search engines.",
      },
      {
        q: "How much SEO do I need to know?",
        a: "Enough to write a good title, a meta description, a logical heading structure and real content, and to keep the page fast. That covers almost all of what matters for a local business. Technical SEO beyond that is a specialism, and most local ranking comes down to a clear page and a Google Business Profile.",
      },
      {
        q: "What page weight should I aim for?",
        a: "Under about two megabytes total and a load under three seconds on mobile data. That is achievable on any business site with compressed images, two font weights and no unnecessary scripts, and it is what most Nigerian visitors will judge the site by.",
      },
      {
        q: "How do I test with a screen reader?",
        a: "NVDA on Windows and VoiceOver on macOS and iOS are free. But before that, tab through the page and check the heading order and alt text — those three checks catch the large majority of problems, and they take under a minute.",
      },
      {
        q: "My client says the site is slow. Where do I start?",
        a: "Open the Network panel, sort by size, and look at the largest files. It is nearly always images. Compress and resize them, then check font weights and script count. Those three account for most slow business sites.",
      },
    ],
  },

  "publishing": {
    summary:
      "The final session takes a site from your laptop to the internet: domains and how DNS really works, hosting options for a Nigerian business, deploying, connecting a custom domain with HTTPS, and the final project — a live, published website you can show a client.",
    objectives: [
      "Explain domains, DNS records and what you are actually buying",
      "Choose a hosting option appropriate to a static business site",
      "Deploy a site and confirm it is live",
      "Connect a custom domain with HTTPS correctly",
      "Set up the practical extras: email, analytics, backups",
      "Deliver a published site and hand it over properly",
    ],
    blocks: [
      {
        heading: "Domains and what you are actually buying",
        body: [
          "A **domain** is a rented name, not a purchase. You pay a registrar annually — a `.com.ng` or `.ng` domain through a Nigerian registrar such as Whogohost or QServers, a `.com` through any international registrar — and if you stop paying, you lose it and anyone can register it. This is the single most important thing a client needs to understand, because a business that lets its domain lapse loses its email, its search ranking and its links all at once. Set the renewal to auto-renew and make sure the client, not you, holds the account.",
          "Behind the name are **DNS records**, and there are three you need. An **A record** points the domain at a server's IP address. A **CNAME** points a subdomain, such as `www`, at another name — which is what you use when a host gives you a URL like `yoursite.netlify.app`. An **MX record** says where email for that domain should be delivered, which is why changing hosts can break a client's email if the MX records are not carried over. That last one is the mistake that costs real money: a domain moved without the MX records takes the business's email down, and they discover it when a customer's enquiry bounces.",
          "The practical advice is unglamorous and important: keep the domain and the hosting in accounts the client controls, with you added as a collaborator rather than as the owner. A client who cannot access their own domain is a client who cannot leave you, and that is not a foundation anyone should build a business on — professionally or reputationally.",
        ],
      },
      {
        heading: "Hosting: choosing for a static site",
        body: [
          "A static business site — HTML, CSS, JavaScript, images — needs no server of your own, which makes hosting cheap or free. **Netlify**, **Vercel** and **GitHub Pages** all host static sites on a free tier, deploy in a minute, include HTTPS automatically, and are fast globally because they serve from many locations. For most Nigerian small-business sites this is the right answer, and the cost saving is real: it turns a recurring hosting bill into zero.",
          "**Shared hosting** — the cPanel-style hosting sold widely in Nigeria — is what most local clients already have or expect, and it works fine: you upload the files over FTP or through a file manager. It is slower to deploy and less reliable than a modern static host, but it is familiar, it is cheap, and it lets the client keep email on the same account, which simplifies things. **WordPress hosting** is a different thing again and belongs to the WordPress course.",
          "Choose based on the client, not on your preference. If they have no infrastructure, put them on a free static host and register the domain separately. If they already have hosting and email with a Nigerian provider, deploy there rather than adding a second bill and a second thing to manage. Explain the trade-off in one sentence and let them decide; a client who understands why their site is on a free host is a client who does not panic when they see the invoice is zero.",
        ],
      },
      {
        heading: "Deploying and connecting the domain",
        body: [
          "On a static host the deploy is genuinely simple: drag the project folder onto the host's dashboard, or connect a Git repository so every push redeploys automatically. The site is live within a minute at a temporary URL such as `yoursite.netlify.app`. Test it there before connecting a domain, because it is much easier to debug on a URL you control than on a domain whose DNS is mid-change.",
          "Connecting the custom domain is a DNS change made at the **registrar**, not at the host. You add an A record or a CNAME pointing at the host's stated address, and then you wait — DNS changes propagate over minutes to hours, occasionally longer, and during that window some visitors see the old site and some the new. Nothing is broken; it is genuinely gradual. Check progress with `nslookup yourdomain.com` and you will see the answer change when it takes effect.",
          "Then confirm **HTTPS**. Every modern static host issues a certificate automatically once the domain resolves, and you should also set the redirect so `http://` and `www` both land on one canonical address — otherwise the same page exists at four URLs, which splits search ranking and confuses analytics. Test the padlock in the browser and confirm it does not warn. A site showing 'Not secure' loses Nigerian customers immediately, because they have been taught correctly to distrust it.",
        ],
      },
      {
        heading: "The practical extras that get forgotten",
        body: [
          "**Email** is the one that causes trouble. If the domain moves, the MX records must move with it or the business's email stops. Where the client uses Google Workspace or Microsoft 365, those providers publish the exact MX records to set; copy them precisely. Then send a test message to the address and confirm it arrives, because a bounced customer enquiry is a silent loss that can continue for weeks.",
          "**Analytics** should be added before launch, not after, because you cannot recover data you did not collect. A free tool such as Google Analytics or a lightweight privacy-respecting alternative gives the client real numbers, and session five of Social Media Management covered how to read them. Add it once, in the head, and confirm it records your own visit.",
          "**Backups** are the discipline that saves a business. Keep the source files in a Git repository — which is a complete history and costs nothing — and keep a copy of anything the client edits themselves. If the site is on shared hosting, download a copy quarterly. A client who edits their own prices on a live server with no backup is one accidental deletion away from a rebuild.",
          "Finally, **a Google Business Profile**. For a local Nigerian business this is often worth more than the website, because it is what appears in a map search with the phone number, hours and photographs. Set it up, verify it, and make sure the name, address and phone number match the website exactly — inconsistency between the two confuses search engines and costs local ranking.",
        ],
      },
      {
        heading: "The final project and the handover",
        body: [
          "The deliverable is a live, published website for a real business: planned from a stated goal, built with semantic HTML and clean CSS, responsive from 360 pixels up, accessible and fast, with a WhatsApp-first contact route, published on a custom domain with HTTPS, analytics recording, and the client able to edit their own content.",
          "Present it as a case study rather than a URL. Show the goal, the structure decision, the mobile and desktop views, the measured page weight and load time on mobile data, and the accessibility and SEO checks you ran. Those specifics are what distinguish you from the large number of people who can put a template online, and they are what justifies a professional fee rather than a template price.",
          "The handover is the last and most undervalued part: the domain and hosting accounts in the client's name with you added as a collaborator, a plain-language note explaining how to change a price or a photograph and what not to touch, the analytics login, and a short maintenance agreement if you are offering one. A website is not a product you deliver once; it is something a business lives with for years, and the quality of the handover is what determines whether that relationship continues.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor deploys the business site live on a static host, connects a custom domain, configures DNS and HTTPS, sets up email and analytics, then runs the final handover and reviews student sites live on the internet.",
      steps: [
        {
          step: "Explain what a domain is",
          detail:
            "Show a registrar's renewal page and explain that a domain is rented annually, and that lapsing it takes email, ranking and links down together. Set auto-renew.",
        },
        {
          step: "Read the DNS records",
          detail:
            "Run nslookup on a real domain and identify the A record. Show a CNAME and an MX record and explain what each governs, particularly why MX matters when moving hosts.",
        },
        {
          step: "Choose a host for this client",
          detail:
            "Compare a free static host with shared cPanel hosting for this business, and justify the choice from what the client already has. Explain the trade-off in one sentence.",
        },
        {
          step: "Deploy to the temporary URL",
          detail:
            "Drag the folder onto the host and open the generated URL. Test the whole site there before touching DNS, explaining why that order matters.",
        },
        {
          step: "Connect the custom domain",
          detail:
            "Add the A record or CNAME at the registrar using the host's stated value. Show exactly which field to change and warn that propagation takes time.",
        },
        {
          step: "Watch propagation",
          detail:
            "Run nslookup repeatedly and show the answer changing. Explain that mixed results during this window are normal rather than broken.",
        },
        {
          step: "Confirm HTTPS",
          detail:
            "Check the certificate issued automatically and confirm no browser warning. Explain that a 'Not secure' label loses Nigerian customers immediately.",
        },
        {
          step: "Set the canonical redirect",
          detail:
            "Configure http and www to redirect to one address. Explain that four URLs for one page splits search ranking and confuses analytics.",
        },
        {
          step: "Carry over the email MX records",
          detail:
            "Copy the provider's MX records precisely, send a test message, and confirm arrival. Explain that a bounced enquiry is a silent loss lasting weeks.",
        },
        {
          step: "Add analytics",
          detail:
            "Insert the tracking snippet in the head, confirm it records a visit, and hand the login to the client. Explain that data not collected cannot be recovered.",
        },
        {
          step: "Set up backups and a Business Profile",
          detail:
            "Confirm the source is in a Git repository, set a quarterly download habit, and create the Google Business Profile with details matching the site exactly.",
        },
        {
          step: "Run the final handover",
          detail:
            "Confirm the accounts are in the client's name with you as collaborator, hand over the plain-language editing note, and review two student sites live on the internet.",
        },
      ],
    },
    practice: {
      title: "The final project: publish a real website",
      brief:
        "You take a real business site from planning to live on the internet: built to standard, deployed, connected to a custom domain with HTTPS, with email working, analytics recording, backups in place, and a complete client handover.",
      steps: [
        "Write the business's goal in one line and let it determine the structure.",
        "Build the site semantically with an external stylesheet and no inline styles.",
        "Make it responsive mobile-first, working at 360 pixels with content-driven breakpoints.",
        "Run the accessibility pass: visible focus, heading outline, alt text, contrast at 4.5:1, labelled fields.",
        "Write titles and meta descriptions naming business, service and location.",
        "Compress images and confirm page weight is under about two megabytes.",
        "Confirm every tap target is at least 44 pixels and the WhatsApp link has a pre-filled message.",
        "Deploy to a static host and test the full site at the temporary URL.",
        "Register or use a custom domain, confirming it is in the client's name with auto-renew on.",
        "Add the DNS records at the registrar and monitor propagation with nslookup.",
        "Confirm HTTPS with no browser warning, and set the canonical redirect.",
        "Carry over or set the MX records and send a test email to confirm delivery.",
        "Add analytics and confirm it records a visit.",
        "Put the source in a Git repository and set a backup habit.",
        "Create the Google Business Profile with details matching the site exactly.",
        "Write the handover note and confirm the client controls both accounts.",
      ],
      standard:
        "A live site on a custom domain with valid HTTPS, built semantically and responsive from 360 pixels, passing the accessibility and performance checks, with a WhatsApp-first contact route, working email, analytics recording, the source under version control, a Business Profile matching the site, and both accounts held by the client with a plain-language handover note.",
    },
    pitfalls: [
      {
        problem: "The client's domain is registered in your name",
        fix: "Register it in the client's name with you added as a collaborator. A client who cannot access their own domain cannot leave you, and that is not a foundation for a professional relationship or a reputation.",
      },
      {
        problem: "You moved the domain and the client's email stopped",
        fix: "MX records govern email delivery and they do not move automatically. Copy the provider's records precisely, send a test message, and confirm it arrives before considering the migration done.",
      },
      {
        problem: "You connected the domain before testing the site",
        fix: "Deploy and test at the temporary URL first. Debugging on a URL you control is far easier than on a domain whose DNS is mid-change and showing different things to different visitors.",
      },
      {
        problem: "You panicked during DNS propagation",
        fix: "It takes minutes to hours and mixed results are normal. Check with nslookup and wait. Nothing is broken, and changing records repeatedly makes it worse rather than faster.",
      },
      {
        problem: "Your site shows 'Not secure' in the browser",
        fix: "HTTPS is not configured or the certificate has not issued. Every modern static host issues one automatically once the domain resolves, and a 'Not secure' label loses Nigerian customers immediately.",
      },
      {
        problem: "The same page exists at four URLs",
        fix: "Set http and www to redirect to one canonical address. Otherwise search ranking is split across four versions and analytics under-reports, and both are invisible until you look.",
      },
      {
        problem: "You launched with no analytics",
        fix: "Add it before launch. You cannot recover data you did not collect, and a client asking 'is it working?' in month two deserves a real answer rather than an opinion.",
      },
      {
        problem: "The client edits the live site with no backup",
        fix: "Keep the source in Git and download a copy quarterly. A client editing prices on a live server with no backup is one accidental deletion away from a full rebuild.",
      },
    ],
    expertNotes: [
      "Keep every domain and hosting account in the client's name with you as a collaborator, without exception. It is the professional standard, it protects the client, and it protects you from being the person who 'locked them out' when a relationship ends.",
      "Test at the temporary URL before touching DNS, every time. Debugging a live domain mid-propagation is genuinely difficult because different visitors see different things, and there is no reason to make your own life harder.",
      "Set auto-renew on every domain you touch and tell the client you have done it. A lapsed domain takes a business's email, links and search ranking down at once, and it is entirely preventable with one setting.",
      "Offer a maintenance agreement rather than disappearing at handover. Websites need updates, and a small monthly fee for backups, small edits and an annual check is both real income and the reason a client comes back for the next site.",
    ],
    vocabulary: [
      { term: "Registrar", meaning: "Where a domain is rented annually. Lapsing it loses email, links and ranking together." },
      { term: "A record", meaning: "The DNS record pointing a domain at a server's IP address." },
      { term: "CNAME", meaning: "A DNS record pointing one name at another — used for www, or to point at a host's URL." },
      { term: "MX record", meaning: "The DNS record saying where a domain's email is delivered. Must be carried over when hosts change." },
      { term: "Propagation", meaning: "The period, minutes to hours, during which a DNS change spreads. Mixed results are normal." },
      { term: "HTTPS", meaning: "An encrypted connection with a browser-verified certificate. Issued automatically by modern static hosts." },
      { term: "Canonical redirect", meaning: "Sending http and www to one address so a page does not exist at four URLs, splitting ranking." },
      { term: "Google Business Profile", meaning: "The map listing with phone, hours and photos. For a local business it often outperforms the website itself." },
    ],
    homework: [
      {
        task: "Publish one site live",
        detail:
          "Deploy anything you have built to a free static host and open it on your phone. The first time your own work is on the internet changes how you think about it.",
      },
      {
        task: "Read the DNS for three domains",
        detail:
          "Run nslookup on three real Nigerian business domains and identify the A record, any CNAME and the MX records. This makes the invisible machinery concrete.",
      },
      {
        task: "Compare two hosting options for one client",
        detail:
          "Write a one-paragraph recommendation comparing a free static host with shared cPanel hosting for a real business, and justify it from what they already have.",
      },
      {
        task: "Write your handover template",
        detail:
          "A plain-language note covering how to change a price and a photograph, what not to touch, where the accounts are and who to call. Reuse it on every project.",
      },
    ],
    rubric: [
      {
        criterion: "Site quality",
        passing: "The site is built and works.",
        excellent: "Semantic, responsive from 360 pixels, accessible and under about two megabytes, with a WhatsApp-first contact route and correct titles.",
      },
      {
        criterion: "Deployment",
        passing: "The site is online.",
        excellent: "Tested at the temporary URL first, then deployed with the canonical redirect set and HTTPS confirmed with no warning.",
      },
      {
        criterion: "Domain and DNS",
        passing: "A domain is connected.",
        excellent: "Records set correctly at the registrar, propagation understood and monitored, MX records carried over and email verified with a test message.",
      },
      {
        criterion: "Operations",
        passing: "The site runs.",
        excellent: "Analytics recording, source under version control, a backup habit set, and a Google Business Profile matching the site exactly.",
      },
      {
        criterion: "Handover",
        passing: "The client has the site.",
        excellent: "Both accounts in the client's name with auto-renew, you as collaborator, a plain-language editing note, and a maintenance option offered.",
      },
    ],
    faqs: [
      {
        q: "How much does it cost to put a Nigerian business online?",
        a: "A `.com.ng` domain is a few thousand naira a year, hosting a static site on Netlify, Vercel or GitHub Pages is free, and a Google Business Profile is free. So the running cost is essentially the domain. Shared cPanel hosting, if the client prefers it, adds a modest annual fee and often bundles email.",
      },
      {
        q: "Should the domain be in my name or the client's?",
        a: "The client's, always, with you added as a collaborator. A client who cannot access their own domain cannot leave you, and being the person who 'locked them out' is a reputation you cannot afford in a market where everyone knows everyone.",
      },
      {
        q: "How long does DNS take?",
        a: "Minutes to hours, occasionally longer. Mixed results during that window are normal — some visitors see the old site, some the new. Check with nslookup and wait; changing records repeatedly makes it slower rather than faster.",
      },
      {
        q: "Do I need to buy SSL?",
        a: "No. Every modern static host issues a certificate automatically once the domain resolves, and most shared hosts now offer free Let's Encrypt certificates. A site showing 'Not secure' loses Nigerian customers immediately, so confirm the padlock before handover.",
      },
      {
        q: "What do I charge for a business website?",
        a: "Price the outcome and the ongoing value, not the hours: a custom site that produces enquiries is worth far more than the time it took. Charge a build fee plus an optional monthly maintenance fee, and be clear about what maintenance covers. Business & Freelancing covers pricing strategy in depth.",
      },
    ],
  },
};
