import type { BlogPost, BlogBlock } from "./blog";

/**
 * Companion articles answering the question clusters in the 2026-11 Search
 * Console export that the 210-lesson series cannot answer.
 *
 * ## Why these are separate from `blog.ts`
 *
 * The series in `blog.ts` is one continuous course in reading order (orders
 * 1–210, grouped into 21 chapters of ten). Adding articles to it would break
 * `note-chapters.ts`, which maps chapters to order ranges. These are companions:
 * same voice, same author, but outside the learning path.
 *
 * ## What qualified a topic
 *
 * Only three things got an article, in this order of preference:
 *
 *   1. **A measured cluster with no answerable page.** "what is zero trust
 *      security" drew 189 impressions at position 4.13 into a glossary entry
 *      that permanently redirects. That is the site being ranked and refusing
 *      the reader.
 *   2. **A measured cluster where the existing page loses on shape, not pitch.**
 *      "soc room" drew 140 impressions across ambiguous queries — the site has
 *      never decided what such a person actually wants.
 *   3. **A task the corpus names but never teaches.** The notes mention agile,
 *      certification and career paths without a page a reader can act on.
 *
 * Everything else in the export was deliberately not written. The megabyte
 * cluster is the largest in the data and got nothing, because
 * `/blog/kilobytes-and-megabytes` already opens with the right answer and still
 * loses to Google's own instant answer. Writing a competing page would be work
 * that cannot succeed. See `docs/gsc-search-console-audit-2026-11.md` §4.
 *
 * ## Editorial constraints these follow
 *
 * `docs/editorial-content-operations.md` binds every page here:
 *   · each names a specific learner task, not a search phrase
 *   · no invented publication or review dates
 *   · no fictional story presented as a measured outcome
 *   · time-sensitive claims link to a primary source
 *   · every page has a recovery paragraph ("if this went wrong")
 */

const p = (text: string): BlogBlock => ({ type: "p", text });
const h2 = (text: string): BlogBlock => ({ type: "h2", text });
const ul = (items: string[]): BlogBlock => ({ type: "ul", items });
const table = (headers: string[], rows: string[][], caption?: string): BlogBlock => ({
  type: "table",
  headers,
  rows,
  ...(caption ? { caption } : {}),
});
const fig = (src: string, alt: string, caption: string): BlogBlock => ({
  type: "figure",
  src,
  alt,
  caption,
});

const AUTHOR = "Ellis Dennis Graham";
const SERIES = "Companion articles";

export const companionPosts: BlogPost[] = [
  /* ================================================================
   * 1. Zero Trust — 189 impressions, position 4.13, redirected
   * ================================================================ */
  {
    slug: "zero-trust-in-plain-words",
    title: "Zero Trust, explained without the vendor slides",
    seoTitle: "What Is Zero Trust Security? Plain-English Explanation",
    seoDescription:
      "Zero Trust means nothing is trusted because it is inside the office network. What the three principles actually require, what they cost, and where Nigerian organisations start.",
    category: "cybersecurity",
    articleType: "explainer",
    difficulty: "Beginner",
    quickAnswer:
      "Zero Trust is a security model that stops trusting anything because of where it sits. Being inside the office network, or on a staff laptop, no longer grants access on its own — every request is checked for who is asking, from which device, and whether that device still looks healthy. It is not a product you buy; it is a decision about what evidence you require before you say yes.",
    excerpt:
      "Zero Trust is a security model, not a product. What the three principles actually require of a small organisation, what it costs to start, and the two places it goes wrong.",
    learningObjectives: [
      "Explain Zero Trust in one sentence without using the word 'perimeter'.",
      "Name the three principles and give one concrete change for each.",
      "Identify which of your current controls are trust-by-location.",
      "Run a first assessment with the free checklist tool.",
    ],
    series: SERIES,
    order: 1001,
    author: AUTHOR,
    cover: "/images/blog/zero-trust-doors.jpg",
    coverAlt: "A row of office doors, each with its own card reader.",
    body: [
      p(
        "If you ask ten vendors what Zero Trust means you will get ten answers and eleven prices. Strip the marketing away and it is a single idea with three consequences: nothing is trusted because of where it is. That is the whole model. Everything else is how you implement it.",
      ),
      fig(
        "/images/blog/zero-trust-gate-check.jpg",
        "A security guard checking identification at a gate rather than waving cars through.",
        "The gates matter less than the check. Zero Trust moves the decision from the gate to the door — and repeats it every time.",
      ),
      h2("The thing Zero Trust replaces"),
      p(
        "Most small organisations run what is called perimeter security: a firewall around the office, and once you are inside it, you can reach the file server, the printer, the accounting package and the admin console. Trust is granted at the door and never asked about again. That model made sense when everyone sat in one building and the servers were down the corridor.",
      ),
      p(
        "It stopped making sense when work left the building. Staff check email on a phone at home. A supplier logs in from another country. A laptop that was safe last week is taken to a café and comes back with something on it. In a perimeter model, that laptop walks back inside the wall and is trusted again, because the only question the network knows how to ask is 'are you inside?'.",
      ),
      h2("What the three principles actually require"),
      table(
        ["Principle", "What it means in practice", "A first change that costs nothing"],
        [
          [
            "Verify explicitly",
            "Every access request is checked on its own merits: who, what device, where, is the device healthy. Access is not inherited from a previous check.",
            "Turn on two-step verification for email and for every admin account. This is the single highest-value change available to a small organisation.",
          ],
          [
            "Use least-privilege access",
            "People get the access their job needs, for as long as they need it, and no longer.",
            "Find the shared admin account. Give each person their own, and remove the shared one.",
          ],
          [
            "Assume breach",
            "Design as though someone is already inside. Limit how far they can move and make sure you would notice.",
            "Ask when a backup was last restored, not when it was last taken. If nobody knows, test one this month.",
          ],
        ],
        "The three principles, as published by NIST SP 800-207 — and a free first step for each.",
      ),
      h2("Why 'we have a firewall' is not an answer"),
      p(
        "A firewall is still useful. It is just no longer the thing that decides whether someone gets in. The distinction that matters is between a control that says yes once and a control that says yes every time. Zero Trust is the second kind, and the reason organisations move to it is that the first kind fails silently: nobody notices the day the trust was wrongly granted.",
      ),
      p(
        "This is not a theoretical concern in Nigeria. The Central Bank's risk-based cybersecurity framework already expects financial institutions to maintain continuous monitoring rather than a single gate, and data-protection rules require you to know where personal data lives so you can protect and delete it. Both of those are Zero Trust assumptions wearing different clothes.",
      ),
      h2("Where it goes wrong"),
      p("Two failure modes are common enough to warn about before you start."),
      ul([
        "**Buying a product and calling it done.** Zero Trust is a set of decisions. A vendor can sell you tools that help you make them, but if nobody has decided what evidence you require before granting access, the tool has nothing to enforce.",
        "**Applying it everywhere at once.** An organisation that tries to re-architect every system in one quarter stalls halfway and ends up with two half-models and no clear rule. Start with the accounts that can do the most damage: email administration, finance, and anything holding customer data.",
      ]),
      fig(
        "/images/blog/analyst-monitor-grid.jpg",
        "Multiple monitors showing dashboards in a security operations centre.",
        "Monitoring is the part people skip. A model built on 'assume breach' needs someone to notice a breach.",
      ),
      h2("What to do this week"),
      p(
        "Do not start with a strategy document. Start by finding out how much of your current access is granted by location rather than by identity. The free assessment tool below asks the ten questions that reveal it, scores what you find in the same bands a real security ticket would use, and produces a report you can keep.",
      ),
      p(
        "If this went wrong: the most common problem is discovering that a critical system cannot support individual accounts — a piece of software from 2013 that only has one login. Do not force it. Put it behind a network rule that only allows the office, write down that it is an accepted risk with a date and a name, and revisit it when the software is replaced. An accepted and recorded risk is a managed risk; an ignored one is not.",
      ),
      h2("Where to read the primary sources"),
      p(
        "NIST publishes the reference architecture as SP 800-207, which is free and readable in an afternoon. The UK's National Cyber Security Centre publishes a shorter set of design principles for people who want the same ideas without the federal formatting. Both are linked below. The CEA Cybersecurity course teaches assessment and response with a practical assessment report as its final piece of work.",
      ),
    ],
  },
  /* ================================================================
   * 2. What a vulnerability assessment is — 172 impressions, position 2.04
   * ================================================================ */
  {
    slug: "what-a-vulnerability-assessment-is",
    title: "What a vulnerability assessment is, and what it is not",
    seoTitle: "Vulnerability Assessment: What It Is (and Is Not)",
    seoDescription:
      "A vulnerability assessment finds and ranks weaknesses; a penetration test proves they can be exploited. What each produces, how severity is scored, and how to write the report.",
    category: "cybersecurity",
    articleType: "explainer",
    difficulty: "Beginner",
    quickAnswer:
      "A vulnerability assessment is a structured check of your systems against known weaknesses, written up as a ranked list: what is weak, how bad it would be, and how easily someone could use it. It asks 'what is exposed?'. A penetration test asks a different question — 'can I actually get in?' — and is done after, not instead.",
    excerpt:
      "A vulnerability assessment ranks what is weak. A penetration test proves it can be exploited. What each one produces, how severity is scored, and how to write a report nobody ignores.",
    learningObjectives: [
      "Distinguish a vulnerability assessment from a penetration test and from a scan.",
      "Score a finding using the CVSS v3.1 severity bands.",
      "Write findings a non-technical manager can act on.",
      "Run a first assessment with the free checklist.",
    ],
    series: SERIES,
    order: 1002,
    author: AUTHOR,
    cover: "/images/blog/scan-report-paper.jpg",
    coverAlt: "A printed assessment report on a desk beside a pen and a laptop.",
    body: [
      p(
        "Three words get used as though they mean the same thing: scan, vulnerability assessment, penetration test. They produce very different things, cost very different amounts, and one of them can be done this week by one person with a notebook.",
      ),
      table(
        ["", "What it asks", "What you get", "Who does it", "Rough effort"],
        [
          [
            "Vulnerability scan",
            "What versions and settings are exposed?",
            "A machine-generated list, usually with many false positives and no context.",
            "A tool, run on a schedule.",
            "Minutes to hours, recurring",
          ],
          [
            "Vulnerability assessment",
            "What is weak, how bad, and how easily exploited?",
            "A contextual, ranked list with an owner for each item.",
            "A person who understands the business, often with a tool's help.",
            "One to five days, per cycle",
          ],
          [
            "Penetration test",
            "Can I actually get in, and how far could I go?",
            "Evidence: a path to a specific asset and proof it is reachable.",
            "A specialist, under a written scope.",
            "A week or more, occasionally",
          ],
        ],
        "The three are complements. Most organisations need the middle row first, and it is the cheapest.",
      ),
      h2("Why the middle row is the one to start with"),
      p(
        "A scan tells you a hundred things and ranks none of them, so it usually produces a spreadsheet nobody opens. A penetration test tells you whether a determined attacker could get in, which is valuable, expensive, and answers a question you may not need answered yet. An assessment sits between: it looks at what you run, judges each weakness against what the business actually needs to protect, and hands back an order of work.",
      ),
      p(
        "If you have never done any of the three, the assessment is the one that will change how you spend the next six months.",
      ),
      h2("Scoring: the numbers are not arbitrary"),
      p(
        "Severity discussions get emotional without a scale, because 'critical' comes to mean 'the thing I care about'. The industry answer is CVSS, and the vocabulary is worth learning even if you never calculate a score by hand:",
      ),
      table(
        ["Band", "CVSS v3.1 range", "How to read it"],
        [
          ["None", "0.0", "No measurable impact. Worth recording, not worth a meeting."],
          ["Low", "0.1 – 3.9", "Minor. Fix in the normal course of work."],
          [
            "Medium",
            "4.0 – 6.9",
            "Real but constrained, or requires conditions that are not always present.",
          ],
          ["High", "7.0 – 8.9", "Serious. Should be scheduled, not queued behind features."],
          ["Critical", "9.0 – 10.0", "Act now, and tell someone."],
        ],
        "CVSS v3.1 qualitative severity, as published by FIRST.",
      ),
      p(
        "Two cautions come with the scale. First, a CVSS score describes the weakness, not your risk — a critical vulnerability on a machine that holds nothing and is reachable by nobody is not your emergency. Second, the score is not a priority order on its own. Combine it with exposure: is it on the internet, who can reach it, what does it hold.",
      ),
      fig(
        "/images/blog/checklist-notebook-pen.jpg",
        "A checklist in a notebook with a pen resting on it.",
        "The output of an assessment is a list someone can own, not a PDF someone files.",
      ),
      h2("What the report actually has to say"),
      p(
        "An assessment report that says 'eight vulnerabilities found, three critical' has failed. A reader cannot act on it. Each finding needs four things:",
      ),
      ul([
        "**What it is** — in a sentence a manager who does not do security can repeat correctly.",
        "**How it would be used** — the plausible path from the weakness to a consequence. Not a scenario invented to frighten; the realistic one.",
        "**How bad and how easy** — the band, plus a plain-language reason. 'High, because anyone with the address can reach it without logging in' beats 'CVSS 8.1'.",
        "**What to do, and who owns it** — one owner with a name, and a decision to fix, mitigate or accept. An accepted risk with a date and a name is a legitimate outcome; an ignored one is not.",
      ]),
      h2("The mistake nobody warns you about"),
      p(
        "Assessments are often run by the person who built the systems. That person is the most efficient assessor and the least reliable one, because the things they are confident about are exactly the things an outsider would question. The fix is not to hire an outsider for everything; it is to have the assessor write down the assumption behind each 'this is fine', so a second person can disagree with the assumption rather than the person.",
      ),
      p(
        "If this went wrong: the usual failure is a report that is technically correct and practically dead — no owners, no dates, filed. If that has happened to you, the salvage is one page. Take the three worst findings, write an owner and a date beside each, and put it somewhere the owner already looks. The full report can follow later; the one page is what changes anything.",
      ),
      h2("Try it"),
      p(
        "The free assessment tool asks the ten questions that surface most of what a first assessment finds, scores what you tick in CVSS bands, and produces a report you can copy. It cannot see your systems and does not pretend to — it tells you what to look at and where to start.",
      ),
    ],
  },

  /* ================================================================
   * 4. Digital signatures — 35 impressions, position 3.91
   * ================================================================ */
  {
    slug: "signed-or-just-a-picture",
    title: "Signed, or just a picture? How to tell",
    seoTitle: "Digital Signature vs Scanned Signature: How to Tell",
    seoDescription:
      "A pasted signature image protects nothing. A digital signature fails if one byte changes. How to check a signed PDF in a minute, and what a certificate fingerprint proves.",
    category: "cybersecurity",
    articleType: "troubleshooting",
    difficulty: "Beginner",
    quickAnswer:
      "Open the document's signature panel. If it lists a named signer, an issuer, and says the document is unmodified since signing, it is a real digital signature. If the panel is empty and the signature is just an image, nothing about that document is protected — anyone can edit it and paste the picture back.",
    excerpt:
      "Most documents people call 'signed' are a photograph of ink. Here is the one-minute check that tells them apart, and why the difference decides whether a disputed contract holds.",
    learningObjectives: [
      "Check whether a PDF carries a real digital signature.",
      "Explain what a digital signature proves and what it does not.",
      "Read a certificate fingerprint and tell SHA-256 from SHA-1.",
      "Decide what evidence to require before accepting a signed document.",
    ],
    series: SERIES,
    order: 1004,
    author: AUTHOR,
    cover: "/images/blog/signature-block.jpg",
    coverAlt: "A signature block at the end of a printed contract.",
    body: [
      p(
        "A contract arrives on WhatsApp. It has a signature at the bottom, in blue ink. It looks exactly like the signed copy you would get by post. It is not signed in any sense that would help you if the other party later says the figure was different.",
      ),
      fig(
        "/images/blog/email-signature.jpg",
        "A signature as it appears at the bottom of an email.",
        "Three things get called a signature: an image, a scan, and cryptographic proof. Only one of them can fail when someone tampers.",
      ),
      h2("The one-minute check"),
      p(
        "For any PDF, the check is a signature panel. In most readers it is under View, then Signatures or Signature Panel. What you are looking for is a list of signers with three facts: who signed, which authority vouches for them, and whether the document is unmodified since signing.",
      ),
      table(
        ["What you see", "What it means", "What it proves"],
        [
          [
            "No signature panel, or an empty one, with an inked name on the page",
            "A picture was placed in the document.",
            "That someone put a picture there. Not who, not when, and not that anything else is unchanged.",
          ],
          [
            "A scanned image of a whole page with ink on it",
            "A photograph of paper.",
            "That a version of this page had ink on it at some point. Not that this is that page.",
          ],
          [
            "A signature panel naming a signer, an issuer, and 'unmodified since signing'",
            "A cryptographic digital signature.",
            "That a specific key signed these exact bytes, and that not one byte has changed.",
          ],
        ],
        "The middle column is what a signature panel is for. If it is empty, nothing has been protected.",
      ),
      h2("Why the image case is worse than it looks"),
      p(
        "A pasted signature is not merely weak; it is actively misleading. It creates the impression of a controlled document while removing none of the ways a document can be changed. Someone can change an amount, a date or a delivery term, paste the signature image back, and hand you a file that looks identical to the original. There is no trace to find because no trace was ever made.",
      ),
      p(
        "This matters most where money and obligations meet: supply agreements, tenancy, employment offers, invoices that trigger payment. If the only evidence is a photograph, the evidence does not settle a dispute. It only delays it.",
      ),
      h2("What a digital signature does prove, and does not"),
      p(
        "It proves two things and refuses to prove a third. It proves which identity signed, and it proves the content is unchanged. It does **not** prove the signer understood what they signed, or that they were who they claimed to be when the key was issued. A signature is evidence about content and key, not about intent.",
      ),
      p(
        "That distinction is why a valid signature on a document you have never read is not protection. The cryptography is doing exactly its job; the problem is upstream.",
      ),
      h2("Reading a fingerprint"),
      p(
        "When someone gives you a certificate to check, they may read out a fingerprint — a short hash printed as hex groups like 3A:7F:2C. It exists so two people can confirm they are looking at the same certificate without comparing an entire file. The length tells you the algorithm: 32 groups is SHA-256, 20 is SHA-1, 16 is MD5.",
      ),
      p(
        "SHA-1 and MD5 are deprecated for signature purposes — collisions have been demonstrated, which means two different documents can be made to produce the same fingerprint. Seeing a 20-group fingerprint is not a scandal, but it is a reason to prefer a system that offers 32.",
      ),
      h2("What to require"),
      p(
        "If you are the one receiving signed documents, ask for the format that lets you check. A signed PDF with an intact signature panel is verifiable by anyone. A photograph is not. If a counterparty cannot produce one, that is information about their process, and it is worth saying out loud before a dispute rather than during one.",
      ),
      p(
        "If this went wrong: a PDF whose signature was valid and now reports as invalid has almost always been re-saved, annotated or exported rather than forged. Even adding a comment after signing can break the signature. Get a fresh copy from the sender and compare the signature panel; only treat it as a problem if a second copy from the source also fails.",
      ),
      p(
        "The explainer tool on this site walks the three cases side by side and reads a fingerprint you paste in, telling you which algorithm you are holding and what it does not establish.",
      ),
    ],
  },

  /* ================================================================
   * 5. Agile — 30 impressions, corpus mentions it but never teaches it
   * ================================================================ */
  {
    slug: "agile-without-the-ceremony",
    title: "Agile without the ceremony: what the four lines actually say",
    seoTitle: "What Is Agile Methodology? The 4 Values in Plain English",
    seoDescription:
      "Agile is four values and twelve principles, not stand-up meetings and story points. What the original document says, how teams drift from it, and a way back.",
    category: "business-freelancing",
    articleType: "explainer",
    difficulty: "Beginner",
    quickAnswer:
      "Agile methodology is a set of four values and twelve principles published in 2001 for software teams: deliver working software often, welcome changing requirements, put people and collaboration above process and tools, and prefer working software over documentation. Stand-ups and story points are practices teams invented later. They are not Agile itself, and following them without the values produces the meetings without the benefit.",
    excerpt:
      "Agile is four values and twelve principles, written in 2001. If your team has the stand-up but not the value, this explains the gap and the shortest route back.",
    learningObjectives: [
      "State the four Agile values without looking them up.",
      "Distinguish an Agile value from a ceremony a team adopted.",
      "Spot the three most common ways teams drift into process theatre.",
      "Choose one change that restores the value your team lost.",
    ],
    series: SERIES,
    order: 1005,
    author: AUTHOR,
    cover: "/images/blog/interview-desk-setup.jpg",
    coverAlt: "A desk with a schedule and notes laid out for planning.",
    body: [
      p(
        "Most people who say they do Agile have never read the document. They have seen the meetings. Those are not the same thing, and the difference explains why teams that follow every ceremony religiously can still ship nothing.",
      ),
      h2("The four values"),
      p(
        "The Agile Manifesto was written by seventeen people in 2001, and it is four lines long. Each line sets two things against each other and says the first matters more — not that the second is worthless:",
      ),
      table(
        ["", "More valuable", "Still has value"],
        [
          ["1", "Individuals and interactions", "Processes and tools"],
          ["2", "Working software", "Comprehensive documentation"],
          ["3", "Customer collaboration", "Contract negotiation"],
          ["4", "Responding to change", "Following a plan"],
        ],
        "The Agile Manifesto, 2001. The word is 'over' — not 'instead of'.",
      ),
      fig(
        "/images/blog/plain-cv-screen.jpg",
        "A team's shared screen showing a simple task list.",
        "The board is not the method. A board with no conversation is a list of work nobody has discussed.",
      ),
      h2("Where teams drift"),
      p(
        "The four lines are easy to agree with and hard to keep. Three drifts are common enough to be predictable.",
      ),
      p(
        "**Drift one: the ceremony replaces the conversation.** A daily stand-up becomes a status report to a manager, each person reciting what they did. The value says individuals and interactions matter more than process. If the meeting is a report, the interaction is gone and the ceremony is a tax.",
      ),
      p(
        "**Drift two: the plan becomes the product.** Sprints get committed to months in advance and scope is locked at the start, so responding to change is impossible. The value says responding to change is worth more than following the plan. A plan that cannot be changed is no longer a plan; it is a promise being broken slowly.",
      ),
      p(
        "**Drift three: documentation becomes the deliverable.** Teams produce acceptance documents, review minutes and burn-down charts, and the actual working thing stays in progress. The value says working software over comprehensive documentation. Nobody is asking you to write nothing — they are asking what you would show a customer today.",
      ),
      h2("The test that settles arguments"),
      p(
        "When a process debate breaks out, one question cuts through it: what would change if we dropped this entirely for two weeks? If the honest answer is 'nothing except the meeting', the practice is not serving a value. If the answer is 'we would not know what to build', then the practice is load-bearing and should be defended properly.",
      ),
      h2("The twelve principles, in the order they matter to a small team"),
      p(
        "The four values get quoted; the twelve principles get skipped. They are where the practical instruction lives, and a handful of them do most of the work for a small organisation:",
      ),
      ul([
        "**Deliver something usable every few weeks, and prefer the shorter interval.** The whole model rests on this. If your work cannot be split into something a real user can touch in a few weeks, the rest of Agile has nothing to attach to.",
        "**Welcome changing requirements, even late.** This one is read as chaos and is actually a statement about cost: a change late is expensive, but refusing a necessary change is more expensive.",
        "**Working software is the primary measure of progress.** Not tickets closed, not hours logged, not documents signed off. If you cannot show the thing, you cannot show progress.",
        "**Business people and developers work together daily.** Not a fortnightly status meeting. The value is the frequency of correction.",
        "**Simplicity — the art of maximising the work not done.** The most underrated line in the document. Every feature you decline is one you do not have to maintain, secure and explain.",
        "**At regular intervals, the team reflects and adjusts.** Without this, drift is invisible. The reflection is what catches the ceremony replacing the conversation.",
      ]),
      p(
        "Notice how many of these are about **frequency of feedback** rather than about process. Agile is a bet that a short loop with real users beats a long loop with a perfect plan. Everything else in the document follows from that bet.",
      ),
      fig(
        "/images/blog/cv-tailoring-desk.jpg",
        "A desk with a document being revised and annotated by hand.",
        "The loop is the point. A plan reviewed once at the start is a guess with a deadline attached.",
      ),
      h2("Agile outside software"),
      p(
        "The document was written for software teams because software can be shipped in small increments. That condition is what makes it work, and it is worth checking before importing the language elsewhere. A bakery cannot ship half a wedding cake. A school cannot deliver six weeks of a term and see if it worked. Where the increment is genuinely small — lesson delivery, marketing campaigns, service changes — the values transfer well. Where the increment is large, the ceremonies transfer and the benefit does not.",
      ),
      h2("A one-week way back"),
      p(
        "You do not need a transformation programme. Pick the next piece of work and ask three questions before starting it: what will a real person be able to do that they cannot do now, how will we show it to someone before it is finished, and what would we drop if we got the answer wrong. If the team can answer those three, most of the values are already being practised, whatever the rituals are called.",
      ),
      p(
        "Then run one short loop and look at what happened. The first loop is usually uncomfortable, because it surfaces how much work was invisible. That discomfort is the value being restored, not the method failing.",
      ),
      p(
        "If this went wrong: the usual failure is adopting the vocabulary without the value, then concluding Agile does not work. If that has happened, do not restart with a new framework. Pick the value you have lost and make one change that restores it. One is enough to tell you whether the diagnosis was right.",
      ),
    ],
  },
];
