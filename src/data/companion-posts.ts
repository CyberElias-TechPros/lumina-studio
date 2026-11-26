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

  /* ================================================================
   * 6. Entry-level cybersecurity — SOC/VA demand, measured careers data
   * ================================================================ */
  {
    slug: "how-to-get-into-cybersecurity-without-a-degree",
    title: "How to get into cybersecurity without a degree",
    seoTitle: "How to Get Into Cybersecurity With No Experience (2026)",
    seoDescription:
      "Cybersecurity has millions of unfilled roles and no single entry door. The three jobs that actually hire juniors, what each one asks for, and the order to learn the skills in.",
    category: "cybersecurity",
    articleType: "career-guide",
    difficulty: "Beginner",
    quickAnswer:
      "The realistic entry point is not 'cybersecurity' — it is a specific job: SOC analyst (watching and triaging alerts), vulnerability assessment analyst (finding and ranking weaknesses), or IT support with a security remit. All three hire people without degrees. What they ask for instead is evidence that you can read a log, explain a finding in writing, and use the basic tools — which you can build in months, not years.",
    excerpt:
      "There is no single cybersecurity door. Three jobs actually hire juniors, and all of them want evidence rather than a degree. What each one asks for, and the order to learn it in.",
    learningObjectives: [
      "Name the three entry-level roles and what each actually does all day.",
      "Explain why 'cybersecurity' is not a job title and why that matters when applying.",
      "Build a portfolio that answers a hiring manager's real question.",
      "Choose the learning order that matches the role you want first.",
    ],
    series: SERIES,
    order: 1006,
    author: AUTHOR,
    cover: "/images/blog/analyst-monitor-grid.jpg",
    coverAlt: "Several monitors showing security dashboards at an analyst's desk.",
    body: [
      p(
        "The most common mistake beginners make is applying for 'cybersecurity'. There is no such job. There are specific roles, each with a different day, and each hiring for different evidence. Understanding which role you are actually aiming at is worth more than any certification you can buy this month.",
      ),
      h2("The demand is real, and it is measured"),
      p(
        "This is not a hopeful article about a growing field. The numbers behind these roles are published and specific: the US Bureau of Labor Statistics projects information security analyst employment growing about 29% between 2024 and 2034, roughly seven times the average across occupations. Industry workforce studies put the global shortfall in the millions of unfilled positions. Whether those exact figures hold, the direction is not in dispute.",
      ),
      p(
        "The reason the gap persists is not a shortage of people who want the jobs. It is a shortage of people who can demonstrate the work. That distinction is the whole strategy below.",
      ),
      h2("The three jobs that actually hire juniors"),
      table(
        ["Role", "What you do all day", "What they want to see"],
        [
          [
            "SOC analyst (Tier 1)",
            "Watch an alert queue. Gather context on each alert. Decide false positive, known issue, or escalate. Write it up so the next person does not have to redo it.",
            "That you can read a log line and decide what is normal. Writing that someone else can follow. Willingness to work shifts.",
          ],
          [
            "Vulnerability assessment analyst",
            "Run scans, review the results, separate the real from the noise, prioritise, and write reports the engineering team can act on.",
            "Method. Attention to detail. A report that ranks findings instead of dumping them.",
          ],
          [
            "IT support with a security remit",
            "The ordinary work of keeping machines running, plus patching, account hygiene and access control. Most small organisations' security is this job.",
            "Troubleshooting. Patience with people. Knowing why a change is safer than the alternative.",
          ],
        ],
        "Three doors. Pick one before you start learning, or you will learn a little of all three and convince nobody.",
      ),
      fig(
        "/images/blog/analyst-notes-desk.jpg",
        "An analyst's desk with handwritten notes beside a laptop.",
        "The job is largely writing. Every one of these roles produces documents another person has to act on.",
      ),
      h2("What replaces the degree"),
      p(
        "A degree is one kind of evidence. When it is absent, hiring managers look for others, and the ones that work are all variations of 'show me something you actually did'.",
      ),
      ul([
        "**A written assessment of something real.** Not a lab you were told to do. Pick a system you are allowed to look at — your own laptop, a home router, a volunteer organisation's website — and write the same report the vulnerability analyst produces: what you found, how bad, what to fix first. The format matters more than the tool.",
        "**A triage log.** Take a public sample of security logs or an open dataset, work through a day of it, and record your decisions and reasoning. This is exactly the Tier 1 job, done unpaid, on evidence.",
        "**One clear explanation of a hard idea.** The ability to make Zero Trust or a digital signature make sense to a non-technical reader is a rare and directly useful skill in this field, because most of the job is convincing people to change something.",
        "**A certificate, but as a fifth thing, not a first.** CompTIA Security+ is the usual starting point and does get past some filters. It is not a substitute for any of the four above, and people who lead with it and nothing else are easy to screen out.",
      ]),
      h2("The learning order that matches the work"),
      p(
        "Courses often teach tools first because tools are easy to demonstrate. The roles above reward a different order:",
      ),
      ul([
        "**Networks and operating systems** — how addresses work, what a port is, where logs live, what a process is. Without this you cannot tell normal from abnormal, and every tool output is a wall.",
        "**Identity and access** — accounts, permissions, why least privilege matters. Almost every entry-level finding you will write is about access.",
        "**Reading and writing about evidence** — logs, findings, reports. This is most of the job and the part almost nobody practises.",
        "**Tools, last** — Nessus, Wireshark, a SIEM. They are easier to learn once you know what you are looking at, and knowing the tool without the instinct does not survive an interview question.",
      ]),
      p(
        "The free security assessment tool on this site is a reasonable first exercise because it forces the second and third items at once: look at a system, decide what is weak, rank it, and write it down.",
      ),
      h2("What this will not fix"),
      p(
        "Two honest warnings. First, entry-level security roles are competitive, and the shortest path for many people runs through IT support first — it is less glamorous and it hires far more easily. Second, the field rewards people who keep reading after the course ends, because the specific tools and threats change faster than any curriculum. If the ongoing reading is not appealing, the job will feel like homework forever.",
      ),
      p(
        "If this went wrong: the usual failure is spending a year collecting certificates and then discovering you still cannot write a report. If that has happened, stop buying courses. Write one report this week on something you own, however small, and use it to apply for one role. The report is the thing that changes the outcome.",
      ),
    ],
  },

  /* ================================================================
   * 7. Agile vs Scrum — measured: Scrum falls in India/US, Agile leads
   * ================================================================ */
  {
    slug: "agile-vs-scrum-which-is-worth-learning",
    title: "Agile or Scrum? They are not the same, and one is falling",
    seoTitle: "Agile vs Scrum: The Difference (and Which to Learn in 2026)",
    seoDescription:
      "Agile is four values; Scrum is one framework for implementing them. What the difference means in practice, what the search data shows, and which one to put on a CV.",
    category: "business-freelancing",
    articleType: "comparison",
    difficulty: "Beginner",
    quickAnswer:
      "Agile is the set of values and principles. Scrum is one specific framework — roles, ceremonies and artefacts — for practising them. So 'Agile or Scrum' is not really a choice between equals: Scrum is a subset of Agile. Learn the values first, because a team that knows the values can adapt any framework, and a team that only knows Scrum cannot tell when the framework is the problem.",
    excerpt:
      "Scrum is a subset of Agile, not an alternative to it. What the difference means day to day, what the search data shows about each, and which to learn first.",
    learningObjectives: [
      "State the relationship between Agile and Scrum without conflating them.",
      "Name the three Scrum roles, three artefacts and five ceremonies.",
      "Read the trend in what employers now ask for.",
      "Decide which to learn first and what to put on a CV.",
    ],
    series: SERIES,
    order: 1007,
    author: AUTHOR,
    cover: "/images/blog/interview-desk-setup.jpg",
    coverAlt: "A desk laid out for planning, with notes and a schedule.",
    body: [
      p(
        "People use 'Agile' and 'Scrum' as if the words were interchangeable. They are not, and the difference is the reason so many teams say they are Agile while shipping nothing — they adopted a framework and never learned the thing the framework was built to serve.",
      ),
      h2("The relationship, in one line"),
      table(
        ["", "Agile", "Scrum"],
        [
          ["What it is", "A set of values and principles", "A framework for implementing them"],
          [
            "Written",
            "2001, by 17 practitioners",
            "First formalised in 1995; the Scrum Guide is now maintained separately",
          ],
          [
            "How big",
            "Four values, twelve principles",
            "Three roles, three artefacts, five events, in a fixed 'sprint' cycle",
          ],
          [
            "If you follow it perfectly",
            "You cannot be audited for it",
            "You can be — Scrum has a concrete, checkable shape",
          ],
          [
            "What it optimises for",
            "Adapting to what you learn",
            "Making adaptation routine and visible",
          ],
        ],
        "Scrum is a subset of Agile in the sense that matters: you can practise Agile values without Scrum, but Scrum without the values is just the ceremonies.",
      ),
      fig(
        "/images/blog/small-class-laptop.jpg",
        "A small group of people working together around a laptop.",
        "Every framework is a plan for how people talk to each other. When the talking stops, the framework is decoration.",
      ),
      h2("Scrum's actual pieces"),
      p(
        "Because Scrum is checkable, it is worth knowing the shape, if only because a job interview will assume you do:",
      ),
      ul([
        "**Roles** — Product Owner (decides what and why), Scrum Master (keeps the process honest, not a project manager), Developers (the people who build).",
        "**Artefacts** — the Product Backlog (everything wanted), the Sprint Backlog (what is being done in this cycle), the Increment (what actually works now).",
        "**Events** — sprint planning, a daily stand-up, the sprint review, the retrospective, and the sprint itself as the containing cycle.",
      ]),
      h2("What the search data shows"),
      p(
        "If you want to know what to learn for the market rather than for the ideal, the trend data is unusually clear. Across a five-year worldwide comparison, 'Agile' leads 'Scrum' by roughly 59 to 35 on average relative search interest, with 'Kanban' far behind at about 13. Both Agile and Scrum peaked around 2022 and have settled lower since, and in the US and India — the two markets most relevant to outsourced and remote work — Scrum's decline is sharper than Agile's.",
      ),
      p(
        "Read that carefully, because it is easy to over-read. Falling search interest does not mean the framework is dead; a great many organisations still run it and will pay for people who understand it. What it does mean is that the growth has stopped and the vocabulary has broadened. Employers increasingly ask for 'Agile experience' rather than 'Scrum Master', and roles that were purely process have been merged into engineering management.",
      ),
      h2("So which should you learn?"),
      p("Both, in one order:"),
      ul([
        "**Learn the four values first.** They are four sentences and they explain why any of the rest exists. Without them you cannot tell whether a process is helping or just happening, which is the skill that actually gets valued.",
        "**Then learn Scrum's shape.** Not to run Scrum, but to recognise it — because you will join teams that use it, and knowing the expected pieces lets you tell what is missing and say so precisely.",
        "**Then learn one thing Scrum does not cover: how to say no to work.** Every framework in this family struggles with a stakeholder who wants everything now. The team that can decline well performs better than the team with the better retrospective template.",
      ]),
      p(
        "If you are choosing a first certificate, the same logic applies: a general project or product certificate usually travels further than a Scrum-specific one, because it is not tied to one framework's vocabulary. If a specific employer advertises Scrum, get the Scrum one for that application and nothing more.",
      ),
      fig(
        "/images/blog/cv-tailoring-desk.jpg",
        "A CV being edited by hand beside a laptop.",
        "Write the framework you have actually used. Claiming Scrum on a CV and then not recognising a sprint review is a short conversation.",
      ),
      p(
        "If this went wrong: people learn Scrum, join a team that has the ceremonies scheduled and none of the values, and conclude that Agile is a lie. The framework is not the problem and neither are you. Name the value that is missing — usually 'responding to change' — and ask one concrete question about it. That question is the most useful thing you can bring into the team.",
      ),
    ],
  },

  /* ============================================================
   * 8. The SOC, career-shaped — existing "what is the SOC" page owns the
   *    definition; this owns the first ninety days.
   * ================================================================ */
  {
    slug: "first-90-days-in-a-soc",
    title: "Your first 90 days in a SOC, week by week",
    seoTitle: "First 90 Days as a SOC Analyst: What to Expect",
    seoDescription:
      "A realistic week-by-week account of the first three months as a SOC analyst: what you will be taught, what you will get wrong, and how to become useful faster.",
    category: "cybersecurity",
    articleType: "career-guide",
    difficulty: "Beginner",
    quickAnswer:
      "Expect ninety days of being supervised. Weeks one to four are usually shadowing and learning the queue; five to eight you start closing simple alerts with review; nine to twelve you are trusted with a shift and a handover. Nobody expects you to find an attacker in month one. They expect you to ask good questions, document what you did, and not hide a mistake.",
    excerpt:
      "What the first three months of a SOC job actually look like — and the small habits that decide whether you become useful or become a problem.",
    learningObjectives: [
      "Know what a SOC will and will not expect of you in the first month.",
      "Recognise the three habits that separate analysts who progress from those who do not.",
      "Prepare for the shift pattern and the handover before you start.",
      "Handle your first serious mistake without making it worse.",
    ],
    series: SERIES,
    order: 1008,
    author: AUTHOR,
    cover: "/images/blog/analyst-monitor-grid.jpg",
    coverAlt: "An analyst's desk with several screens showing monitoring views.",
    body: [
      p(
        "Posts about SOC work tend to describe the room — the screens, the wall, the shift. What a new analyst actually needs is different: what is going to happen to them in the first three months, and what will be judged.",
      ),
      p(
        "This is written from how SOC onboarding works in practice, not from one employer's handbook. Teams differ, but the shape below is common enough to plan against.",
      ),
      h2("What you will not be doing"),
      p(
        "Nobody hands a new analyst the investigation in week one, whatever the job advert implied. The work in the first month is narrow on purpose:",
      ),
      ul([
        "You will not be the person who decides whether an incident is real. Someone senior signs that off.",
        "You will not be expected to remember what every alert means. You will be expected to look it up rather than guess.",
        "You will not be judged on how fast you close tickets. You will be judged on whether they stay closed.",
      ]),
      h2("Weeks 1–4: the queue and the vocabulary"),
      p(
        "The first month is mostly learning what normal looks like on the systems you are guarding. Most teams will have you shadow, then work the queue with review.",
      ),
      ul([
        "**Learn three alerts properly rather than fifty vaguely.** Ask which three generate the most volume and learn what a false positive looks like for each.",
        "**Read old tickets.** The closed ones are a free textbook: what the previous analyst saw, how they reasoned, what they escalated. Reading twenty good tickets teaches more than a certification module.",
        "**Write down the vocabulary you do not know.** Not to memorise it, but because asking a specific question in week three is normal and asking a vague one in month six is a problem.",
      ]),
      fig(
        "/images/blog/analyst-notes-desk.jpg",
        "A notepad beside a laptop, with questions written down.",
        "Keep the list. The questions you cannot yet ask are a map of what you have not learned.",
      ),
      h2("Weeks 5–8: your first closed tickets"),
      p(
        "Somewhere around week five you will be trusted to close low-severity alerts, with someone reviewing. This is where the job actually starts, and where two habits matter more than skill.",
      ),
      ul([
        "**Write the ticket for the next person, not for yourself.** If a ticket says 'checked, benign' and nothing else, the next analyst has to redo your work. Say what you checked, what you saw, and why you concluded it was benign.",
        "**Escalate early rather than late.** A junior who escalates something that turns out to be nothing is doing the job. A junior who sits on something for four hours because they did not want to look unsure is creating risk.",
        "**Never quietly close something you did not understand.** That is the one thing that gets an analyst removed from the queue.",
      ]),
      fig(
        "/images/blog/analyst-spreadsheet.jpg",
        "A screen showing a spreadsheet of records with several rows highlighted.",
        "The queue is a spreadsheet with consequences. The discipline is reading rows carefully when nothing exciting is happening.",
      ),
      h2("Weeks 9–12: a shift and a handover"),
      p(
        "By the end of three months most new analysts are trusted with a shift and the handover that goes with it. The handover is the part nobody prepares people for.",
      ),
      p(
        "A handover is a short written summary of what happened and what is still open. It is read by someone who was asleep. Bad ones say 'quiet night'. Good ones say exactly what was investigated, what is unresolved, and what the next person should look at first. The skill is the same one as the ticket: write for the person who does not have your context.",
      ),
      h2("The shift pattern, said plainly"),
      p(
        "SOC work is coverage work, which means nights, weekends and public holidays rotate. That is not a flaw in the job; it is the job. Before accepting a role, ask four specific things:",
      ),
      ul([
        "What is the rotation, exactly, including how often it changes?",
        "How much notice do you get for a change, and who covers a swap?",
        "Is there a rest day after a night block, and is it respected?",
        "What is the escalation path at 3am when you are the only one there?",
      ]),
      p(
        "Ask them before you accept, not after. Teams with good answers to those four questions are usually teams that keep their people; teams that are vague about them usually are not.",
      ),
      h2("Your first serious mistake"),
      p(
        "You will eventually miss something, close something too early, or misread an alert. It will feel worse than it is. What matters is the next hour:",
      ),
      ul([
        "**Say it immediately**, in the channel where the decision-makers are. Speed of disclosure is the thing that is measured.",
        "**Say what you know and what you do not.** 'I closed X at 14:20 believing Y; I now believe Z; I have not yet checked W.' That is a good message.",
        "**Write it up afterwards.** A short, blameless note about what the queue looked like makes the mistake a process finding rather than a person's failing — and it is how good teams get better.",
      ]),
      p(
        "If this went wrong: the usual first-month failure is silence — not asking, not escalating, closing to keep the queue clean. If you recognise that pattern in yourself, tell whoever reviews your tickets. That conversation, held early, is what turns a struggling analyst into a competent one, because almost every SOC would rather coach than lose you to avoidable silence.",
      ),
    ],
  },

  /* ================================================================
   * 9. CVSS — the highest-volume technical sub-question under the
   *    site's best-ranking term (vulnerability assessment, position 2.04)
   * ================================================================ */
  {
    slug: "understanding-cvss-scores",
    title: "Severity scores, without the maths",
    seoTitle: "CVSS Scores Explained: How to Read 7.5 (High)",
    seoDescription:
      "What a CVSS score actually measures, why a 7.5 can matter less than a 5.3, and how to use the score honestly when you write a finding.",
    category: "cybersecurity",
    articleType: "explainer",
    difficulty: "Intermediate",
    quickAnswer:
      "A CVSS score rates the technical severity of a weakness in the abstract — how easy it is to exploit and how much damage it could do. It does not know what your system holds or who can reach it. So a 9.8 on a server nobody can reach is often less urgent than a 5.3 on your public payment page. Use the score to start the conversation, never to finish it.",
    excerpt:
      "A CVSS score is a measurement of the vulnerability, not of your risk. Why the difference matters, and how to write a finding that reflects it.",
    learningObjectives: [
      "Read a CVSS score and explain what the number does and does not include.",
      "Name the metrics that most often change a score in practice.",
      "Adjust a prioritisation honestly without misreporting the score.",
      "Write the severity sentence that makes a finding usable.",
    ],
    series: SERIES,
    order: 1009,
    author: AUTHOR,
    cover: "/images/blog/scan-report-paper.jpg",
    coverAlt: "A printed report with severity labels beside listed items.",
    body: [
      p(
        "CVSS is the most abused number in security work. It is useful, and it is routinely treated as though it were a verdict rather than a description. Getting this right is a real skill — it shows up in interviews and it decides which systems you fix first.",
      ),
      h2("What the score measures"),
      p(
        "CVSS rates the characteristics of a weakness: how it can be reached, what access you need to attempt it, how much interaction a victim has to provide, and what the impact would be on confidentiality, integrity and availability. The output is a number from 0 to 10 with a label band.",
      ),
      table(
        ["Band", "Range", "What it means in practice"],
        [
          ["None", "0.0", "Not a weakness, or no meaningful impact."],
          ["Low", "0.1–3.9", "Limited impact, or needs significant conditions."],
          ["Medium", "4.0–6.9", "Real but constrained; often needs a foothold or local access."],
          ["High", "7.0–8.9", "Serious; frequently remotely reachable, or severe impact."],
          [
            "Critical",
            "9.0–10.0",
            "Remotely reachable with little or no prerequisite and severe impact.",
          ],
        ],
        "The bands are conventional, not official thresholds in every organisation. What matters is that everyone reading the report uses the same table.",
      ),
      h2("What the score cannot know"),
      p(
        "This is the part that separates a good analyst from someone who reads a scanner output aloud. The score has no idea:",
      ),
      ul([
        "**Whether the system is reachable.** A critical weakness in a lab machine behind three firewalls is not your most urgent problem.",
        "**What the system holds.** A weakness on a machine that processes payroll is a different conversation from the same weakness on a marketing site.",
        "**Whether the weakness is real.** Scanning tools over-report. Some findings are false positives; some are duplicates of the same underlying missing patch.",
        "**What compensating controls exist.** If the vulnerable service is behind a gateway that strips the attack path, the practical risk is lower than the score implies.",
      ]),
      fig(
        "/images/blog/fence-check-flashlight.jpg",
        "Someone checking a fence with a torch at dusk.",
        "The score says the gap is wide. Only you know whether it is your fence, or one in a field nobody visits.",
      ),
      h2("The sentence you should write"),
      p(
        "A finding that changes behaviour has three parts: what the problem is, why it matters here, and what to do first. Something like:",
      ),
      p(
        "\u201cThe payment server runs an outdated library with a known remote flaw (CVSS 9.8). It is internet-facing and holds card data, so this is our first fix. Patch to the current release, then we will verify.\u201d Compare that with \u201cCVSS 9.8 — critical,\u201d which is technically accurate and practically useless.",
      ),
      p(
        "Notice what the good version does: it uses the score as evidence, adds context the score could not have, and ends with a specific action. That is a finding, not a data point.",
      ),
      h2("When you adjust priority, say that you adjusted it"),
      p(
        "You will sometimes prioritise a medium above a critical. That is often correct. Do not hide it by altering the score — keep the score as assessed, and state your reasoning separately:",
      ),
      ul([
        "Keep the original CVSS value in the record, so the assessment stays auditable.",
        "Add your own priority field, with a one-line reason: reachable, sensitive, exploitable, or not.",
        "Where a risk is accepted rather than fixed, note who accepted it and when it will be reviewed.",
      ]),
      p(
        "The rule is simple: the score is a measurement, the priority is a decision. Never let one impersonate the other.",
      ),
      p(
        "If this went wrong: most teams that 'use CVSS' are really using it as a sort order, fixing the top of the list and never writing down why. If that is happening where you are, add one column — priority with reason — to the next report. It is a small change that turns a scan output into an actual decision document, and it is the difference between assessment as a ritual and assessment as work.",
      ),
    ],
  },

  /* ================================================================
   * 10. digital vs electronic signature — legal distinction, high
   *     commercial intent, nothing on the site covers it.
   * ================================================================ */
  {
    slug: "digital-vs-electronic-signature",
    title: "Digital or electronic? One is a legal category",
    seoTitle: "Digital Signature vs Electronic Signature: The Difference",
    seoDescription:
      "An electronic signature is a legal concept. A digital signature is a cryptographic technology. Why the distinction decides what evidence you have if a document is challenged.",
    category: "cybersecurity",
    articleType: "explainer",
    difficulty: "Beginner",
    quickAnswer:
      "An electronic signature is any electronic mark showing intent to agree — a typed name, a drawn scribble, a checkbox. A digital signature is a specific cryptographic technique that proves the document has not changed and that the signer held a particular key. All digital signatures are electronic signatures. Most electronic signatures are not digital signatures, and when a document is disputed that difference is what you have to show.",
    excerpt:
      "The difference is not pedantry: it decides what you can prove. Why the two terms are confused, and what evidence each one actually leaves behind.",
    learningObjectives: [
      "Define each term precisely and state the relationship between them.",
      "Explain what evidence each type leaves behind when a signature is disputed.",
      "Choose which to use for a given document.",
      "Spot the claim that a simple e-signature is 'secure' and know why it is misleading.",
    ],
    series: SERIES,
    order: 1010,
    author: AUTHOR,
    cover: "/images/blog/signing-document-seal.jpg",
    coverAlt: "A document being signed, with a seal beside it.",
    body: [
      p(
        "The two terms are used as synonyms constantly, including by companies selling the software. The confusion is expensive, because the two things leave completely different evidence behind.",
      ),
      h2("The two definitions, precisely"),
      table(
        ["", "Electronic signature", "Digital signature"],
        [
          [
            "What it is",
            "A legal category: any electronic indication of intent to agree",
            "A technical mechanism: a cryptographic value bound to the document's content",
          ],
          [
            "How it is made",
            "Typed name, drawn mark, click, verification code",
            "A hash of the document, encrypted with a private key",
          ],
          [
            "What it proves",
            "That somebody indicated agreement",
            "That this exact document has not changed since signing, and that a specific key was used",
          ],
          ["Who holds the evidence", "The platform", "The signer, and anyone with the public key"],
          [
            "Can the document change afterwards?",
            "Possibly — depends entirely on the platform",
            "No, without the signature failing to verify",
          ],
        ],
      ),
      p(
        "The relationship is a set: every digital signature is an electronic signature, because it is also an electronic indication of intent. The reverse is not true.",
      ),
      h2("Why the difference matters when something goes wrong"),
      p(
        "If a contract is disputed, the question is not 'did they click agree'. It is 'can you show that the document they agreed to is the document you hold'.",
      ),
      ul([
        "An **electronic signature** gives you a platform record: a timestamp, an email address, an IP address. That is often sufficient and frequently accepted. But it is evidence held by a third party, and it says nothing about the document's content after the fact.",
        "A **digital signature** gives you mathematics: the document's hash. If one character changes, verification fails. That is evidence anyone can check without trusting the platform.",
      ]),
      fig(
        "/images/blog/signature-block.jpg",
        "A signature block at the foot of a printed document.",
        "Both are marks of assent. Only one of them breaks when the page underneath is altered.",
      ),
      h2("The claim to be suspicious of"),
      p(
        "Any product that calls its e-signature 'cryptographically secure' without explaining what is signed is worth a second question. There is a perfectly legitimate design where the platform applies a digital signature to the finished document — in that case the assurance is real. There is also a common design where 'secure' means 'we use TLS and log the IP'. That is not wrong, but it is a different claim, and it should not be used to imply tamper evidence you do not have.",
      ),
      p(
        "Ask one question of any vendor: **what exactly is signed, and what fails if the document is altered afterwards?** A vendor who can answer clearly sells you something you can rely on. One who cannot has not understood their own architecture.",
      ),
      h2("Which should you use?"),
      p(
        "Use an electronic signature when the relationship is routine and the record of assent is enough: accepting terms, approving an internal form, acknowledging a policy. It is faster and usually cheaper.",
      ),
      p(
        "Use a digital signature when the content itself is the thing in dispute: contracts with significant value, documents that will outlive the platform that carried them, anything where you would need to prove the document is unchanged years later. The cost is real — keys, certificates, and someone who understands them — which is exactly why the decision deserves to be deliberate.",
      ),
      p(
        "There is a middle option worth knowing about, because it is where most organisations actually end up. A platform can apply a digital signature on your behalf to the finished document, which gives you tamper evidence without you managing keys yourself. The assurance is real, but it is rented rather than owned: your ability to prove anything depends on that provider still existing and still being able to verify. For a five-year contract that is usually fine. For a document with a thirty-year life, it is worth asking what happens to the proof when the subscription does not.",
      ),
      p(
        "If this went wrong: the common failure is discovering the distinction during a dispute, when nothing can be changed. Before that happens, pick one high-value document type and ask your provider what evidence you would actually be able to produce. Writing that answer down once is enough; it tells you whether the rest of your signing is adequate.",
      ),
    ],
  },

  /* ================================================================
   * 11. Micro-segmentation — the top uncovered Zero Trust branch
   * ================================================================ */
  {
    slug: "micro-segmentation-explained",
    title: "Micro-segmentation, explained with a building",
    seoTitle: "Micro-Segmentation Explained Simply (With a Building Analogy)",
    seoDescription:
      "What micro-segmentation is, why 'trust the network' stopped working, and the first three rules most organisations write. Kept in plain language, with the analogy stated as one.",
    category: "cybersecurity",
    articleType: "explainer",
    difficulty: "Intermediate",
    quickAnswer:
      "Micro-segmentation means that the network no longer decides who can talk to what. Instead, each workload has a policy of what it is allowed to reach, and everything else is denied by default. It exists because once an attacker has a foothold, an open internal network lets them move sideways to everything. Segmentation makes that sideways step fail.",
    excerpt:
      "The idea underneath Zero Trust, in plain language. Why internal networks became dangerous, what micro-segmentation changes, and the first rules to write.",
    learningObjectives: [
      "Explain lateral movement and why perimeter security does not stop it.",
      "State what micro-segmentation changes in concrete terms.",
      "Describe the first three rules a small organisation should write.",
      "Name the two ways micro-segmentation projects fail.",
    ],
    series: SERIES,
    order: 1011,
    author: AUTHOR,
    cover: "/images/blog/zero-trust-doors.jpg",
    coverAlt: "A row of doors along a lit corridor.",
    body: [
      p(
        "Micro-segmentation is the concept most people learning about Zero Trust hear first and understand last, because it is described with diagrams of boxes. The idea is much simpler than the diagrams suggest.",
      ),
      h2("The analogy, stated as an analogy"),
      p(
        "Older security was built like a fortress: a thick wall around the outside, and once you were past the gate you could walk anywhere inside the building. That worked while everything valuable was inside and nobody got past the gate.",
      ),
      p(
        "The problem is that people now get past the gate routinely — through a phishing email, a stolen password, a contractor's laptop. And the moment they do, the absence of internal doors means they walk straight to the payroll office.",
      ),
      p(
        "Micro-segmentation is the internal doors. Every room is locked by default and has a list of who is allowed in. It is an analogy, and the real thing is less tidy than a building — but the purpose is exactly that: a foothold should not become a corridor.",
      ),
      fig(
        "/images/blog/zero-trust-doors.jpg",
        "A row of closed doors off a long corridor.",
        "The point of segmentation is not the wall on the outside. It is that opening one door does not open all of them.",
      ),
      h2("What actually changes"),
      table(
        ["", "Flat internal network", "Micro-segmented"],
        [
          [
            "Default behaviour",
            "Anything inside can reach anything else, unless blocked",
            "Nothing reaches anything, unless allowed",
          ],
          [
            "Who is the boundary",
            "The firewall at the edge",
            "The policy attached to each workload",
          ],
          [
            "A compromised laptop can",
            "Reach file shares, databases, admin systems",
            "Reach only what its workload is allowed to reach",
          ],
          [
            "Where the rules live",
            "In one device's configuration",
            "In a policy that can be reviewed and versioned",
          ],
        ],
      ),
      h2("The three rules to write first"),
      p(
        "Most organisations do not need a platform to start. They need three rules, applied by whatever they already run:",
      ),
      ul([
        "**The database accepts connections only from the application, not from other people's machines.** No analyst workstation should need a direct database connection. If yours do, that is the finding.",
        "**Administrative interfaces are reachable only from a designated management path.** Jump hosts, a VPN range, or a dedicated control network. Not the general office network.",
        "**Development and production do not talk to each other.** This one rule prevents a large share of embarrassing incidents, including test code pointed at live data.",
      ]),
      p(
        "Write down the rule, who wrote it, and what it will break. That last part matters more than the rule itself, because the fastest way to kill a segmentation project is for it to break a business process on a Tuesday and have nobody expecting it.",
      ),
      h2("How the projects fail"),
      p("Two failure modes, both common."),
      ul([
        "**Rules nobody can explain.** Five hundred copied policy entries with no owner. When something breaks, nobody can safely remove one, so the policy grows and everyone starts allowing broadly to make things work again.",
        "**Deny everything on day one.** The list of what legitimately talks to what is always larger than expected. Most successful programmes run in monitor mode first — record what happens, review it, then enforce — and they accept that this takes months.",
      ]),
      p(
        "One more practical note on ordering: segment the systems that hold the most valuable data first, not the ones that are easiest to move. Teams often start with the test environment because nothing breaks — and then discover a year later that nothing valuable was protected. Money, personal data, administrative access and source code are the four that matter, and they are worth the disruption.",
      ),
      p(
        "If this went wrong: a segmentation project has stalled if the rule set is growing and the incidents are not falling. The fix is not a new tool; it is to stop adding rules and instead find the three flows that account for most of the risk, write those rules precisely, and remove whatever was written to work around them.",
      ),
    ],
  },
];
