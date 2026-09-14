import type { SessionLecture } from "../types";

/**
 * Business & Freelancing — ₦15,000 · 3 weeks · 6 sessions.
 * Sessions 4 to 6. (Sessions 1–3 in business-freelancing.ts.)
 */
export const businessFreelancingLessonsB: Record<string, SessionLecture> = {
  "pricing-and-packaging": {
    summary:
      "Price is the lever most freelancers never touch, and it determines whether the work is a business or a poorly paid job. This session covers packaging, the pricing models, deposits and payment terms, controlling scope, and knowing when to walk away.",
    objectives: [
      "Build service packages that are easy to buy and easy to deliver",
      "Choose between hourly, project, retainer and value pricing deliberately",
      "Set deposits and payment terms that protect your cash flow",
      "Control scope so a job stays profitable",
      "Raise prices without losing clients",
      "Recognise the jobs and clients to decline",
    ],
    blocks: [
      {
        heading: "Why packaging beats quoting",
        body: [
          "An open-ended quote — 'how much for a website?' — puts the client in the position of imagining what they are buying, and people imagine the maximum for the minimum price. A **package** removes that: a defined set of deliverables at a defined price, which the client can compare, understand and say yes to without negotiating what is inside.",
          "Three packages is the structure that works. A **small entry product** at a price that requires little deliberation, which is how most relationships start. A **core offer** — the service most clients actually need. And a **full option** that includes everything, which most people will not buy but which makes the core look reasonable. Prices are read comparatively, never in isolation, so the expensive option is doing work even when it is not chosen.",
          "Packaging also protects you, because a defined package has edges. 'The starter pack is a logo, two colour options and a business card design' cannot quietly grow into a full brand identity, whereas 'design work' can grow into anything. The definition is the defence.",
        ],
      },
      {
        heading: "The four pricing models",
        body: [
          "**Hourly** is simple and honest for unpredictable work, and terrible for everything else, because it punishes you for being fast and caps your income at your hours. Use it for small, open-ended tasks; do not build a business on it.",
          "**Per project** is the workhorse: a fixed price for a defined deliverable. It rewards speed and skill, it is easy for a client to approve, and it makes your income legible. Its risk is scope — which is why the deliverables must be specific, and why the expectations note from session three matters so much.",
          "**Retainer** is a fixed monthly fee for ongoing work, and it is what turns freelancing into a stable income. Four businesses at ₦40,000 a month is ₦160,000 of predictable income, which is worth more than twice that arriving irregularly. Retainers also produce the referrals and the case studies that everything else runs on.",
          "**Value-based** prices against what the outcome is worth to the client rather than what it costs you. A sales page that will generate ₦2,000,000 a year for a business can justifiably cost ₦250,000, however quickly you built it. It requires confidence and evidence, so it is a destination rather than a starting point — but it is the model that separates freelancers who earn well from freelancers who are merely busy.",
        ],
      },
      {
        heading: "Deposits and payment terms",
        body: [
          "**Never start substantial work without a deposit.** Fifty per cent up front is standard for project work, and for a new client with no relationship, seventy per cent is not unreasonable. The deposit is not about the money; it is a **commitment test**. A client unwilling to pay half in advance is telling you something about how the rest of the job will go, and it is far better to learn that now than after three weeks of work.",
          "Then the terms. State **when payment is due** — on delivery, or seven days after invoice, whichever you choose — and **what happens if it is late**: work pauses, or a stated percentage applies. Write it in the expectations note, because terms nobody has read cannot be enforced. And **invoice properly**: a numbered document with your details, the client's, the work described, the amount, the date and your bank details. It costs nothing and it makes payment a routine rather than a favour.",
          "The practical rule for a new client: **deposit before work, balance before final files**. Holding the final deliverable until the balance clears is not aggressive; it is how every professional service works, and clients who have been through it before expect it. The moment you send final files on trust, you have given away your only leverage.",
        ],
      },
      {
        heading: "Controlling scope",
        body: [
          "Scope is controlled by three things, all of them written before the work starts. **Named deliverables** — 'four social media graphics a month', not 'social media support'. **A defined number of revision rounds**, each a consolidated list. **Explicit exclusions** — what the price does not cover.",
          "Then the habits during the job. **Reply to a scope request in writing**, even informally, so there is a record. **Answer every 'can you just…?' with a yes and a price** — 'Yes, I can add that. It is ₦8,000 and it moves delivery to Friday.' Never a flat no, which creates friction, and never a free yes, which creates a precedent. The phrase 'I can add that' is the most useful sentence in freelancing.",
          "The reason this matters is arithmetic, not principle. A ₦60,000 job that absorbs four unquoted extras is a ₦30,000 job, and it also taught the client that your prices are negotiable by persistence. Scope control is not about being difficult; it is what allows you to do the work well and to keep the client, because a freelancer quietly resenting unpaid work delivers worse and leaves sooner.",
        ],
      },
      {
        heading: "Raising prices and saying no",
        body: [
          "Raise prices **on new clients first**. Existing clients keep their rate until the next renewal or a defined review date, at which point a short, plain note explains the change: 'From next month my retainer is ₦50,000. I have kept your rate at ₦40,000 until December so you have time to decide.' Most clients accept; a few leave; the arithmetic works out in your favour almost every time, because the increase on those who stay outweighs the loss of those who go.",
          "Raise them on a **schedule rather than on mood**: after every three or four completed projects, or every six months, whichever comes first. Freelancers who wait until they feel confident never raise prices, because confidence follows the raise rather than preceding it. And never apologise for the increase — a price is not an imposition, it is what the work costs.",
          "Then the discipline of saying no. Decline a client who wants everything for nothing, who argues about every deliverable, who pays the first small invoice late, or whose business you cannot respect. **A bad client costs more than their fee**: the time, the stress, the reputation risk and the work you could not take on because you were busy with them. Turning down bad work is not lost income; it is protected capacity, and capacity is the only thing a freelancer cannot buy back.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor rebuilds one freelancer's offer as three packages, prices each against the four models, writes the deposit and payment terms into an expectations note, then rehearses a scope request, a price increase and a polite refusal.",
      steps: [
        {
          step: "Take the open-ended quote",
          detail:
            "Show 'how much for a website?' and explain that it makes the client imagine the maximum for the minimum price.",
        },
        {
          step: "Build the three packages",
          detail:
            "Define a small entry product, a core offer and a full option with named deliverables. Explain that a defined package has edges and open-ended work does not.",
        },
        {
          step: "Test the comparative pricing",
          detail:
            "Read the three prices together and show how the middle becomes reasonable. Explain that the expensive option does work even when nobody buys it.",
        },
        {
          step: "Price hourly and reject it",
          detail:
            "Calculate the same work hourly and by project. Explain that hourly punishes speed and caps income at your hours.",
        },
        {
          step: "Build a retainer",
          detail:
            "Convert the one-off work into a monthly package and calculate the predictable income. Explain why stability is worth more than irregular larger sums.",
        },
        {
          step: "Apply value pricing",
          detail:
            "Ask what the outcome is worth to the client and price against it. Explain that this is a destination requiring evidence, not a starting point.",
        },
        {
          step: "Set the deposit",
          detail:
            "Require fifty per cent up front and explain that it is a commitment test rather than merely cash flow.",
        },
        {
          step: "Write the payment terms",
          detail:
            "State due dates, late consequences and invoice contents. Explain that terms nobody has read cannot be enforced.",
        },
        {
          step: "Hold the final files",
          detail:
            "Explain balance before final deliverables. Show that sending final files on trust gives away the only leverage available.",
        },
        {
          step: "Answer a scope request",
          detail:
            "Take 'can you just add a page?' and reply with yes and a price. Explain why a flat no creates friction and a free yes creates a precedent.",
        },
        {
          step: "Announce a price increase",
          detail:
            "Draft the note to an existing client with a review date. Explain that most accept, a few leave, and the arithmetic favours the increase.",
        },
        {
          step: "Decline a bad client",
          detail:
            "Write a polite refusal and count the real cost of taking the work. Explain that declining bad work protects capacity rather than losing income.",
        },
      ],
    },
    practice: {
      title: "Rebuild your offer and your terms",
      brief:
        "You rebuild your service as three packages with named deliverables, price each against the four models and choose one deliberately, write deposit and payment terms into a reusable expectations note, and rehearse a scope request, a price increase and a polite refusal.",
      steps: [
        "Write what you currently quote as an open-ended answer.",
        "Define three packages: entry product, core offer, full option.",
        "Name the deliverables in each so precisely that the edges are obvious.",
        "Check that the three prices work together, with the middle looking reasonable.",
        "Price the same work hourly and per project, and compare.",
        "Convert one service into a monthly retainer and calculate the predictable income.",
        "Estimate what the core outcome is worth to a client and note the value-based figure.",
        "Choose the model for each package and write one sentence justifying each choice.",
        "Set your deposit percentage and state it plainly.",
        "Write payment terms: due date, late consequence, invoice contents.",
        "Add the terms to your reusable expectations note.",
        "Write the reply to 'can you just add…?' as a yes with a price.",
        "Draft a price-increase note for an existing client with a review date.",
        "Write a polite refusal to a client you would decline, and list what taking them would cost.",
      ],
      standard:
        "Three packages with precisely named deliverables whose prices work together, each priced against a deliberately chosen model with a written justification, a retainer calculated as predictable monthly income, a deposit percentage and full payment terms written into a reusable expectations note, a scope request answered with a yes and a price, a price-increase note with a review date, and a polite refusal listing the real cost of the declined work.",
    },
    pitfalls: [
      {
        problem: "You quote open-endedly",
        fix: "Build packages with named deliverables. An open quote makes the client imagine the maximum for the minimum price, while a package gives them something to compare and say yes to.",
      },
      {
        problem: "You price hourly",
        fix: "Move to per project or retainer. Hourly punishes you for being fast and caps your income at your hours, so the better you become the less you earn per hour of value delivered.",
      },
      {
        problem: "You have no retainer clients",
        fix: "Convert at least one one-off client to a monthly package. Four retainers at ₦40,000 is ₦160,000 of predictable income, which is worth more than twice that arriving irregularly.",
      },
      {
        problem: "You start work without a deposit",
        fix: "Fifty per cent up front, seventy for a brand-new client. The deposit is a commitment test — a client unwilling to pay half in advance is telling you how the rest of the job will go.",
      },
      {
        problem: "You send final files before the balance clears",
        fix: "Balance before final deliverables, every time. It is how professional services work, and sending on trust gives away the only leverage you have.",
      },
      {
        problem: "You answer scope requests with a free yes",
        fix: "Reply 'I can add that — it is ₦8,000 and it moves delivery to Friday.' A free yes creates a precedent, and a ₦60,000 job absorbing four extras becomes a ₦30,000 job.",
      },
      {
        problem: "You have never raised your prices",
        fix: "Raise on new clients immediately and on existing ones at a stated review date. Confidence follows the raise rather than preceding it, so waiting to feel ready means never.",
      },
      {
        problem: "You take every client who offers money",
        fix: "Decline the ones who argue about every deliverable or pay late on a small job. A bad client costs the time, stress and capacity of the good work you could have taken instead.",
      },
    ],
    expertNotes: [
      "Sell packages, not hours. A defined package is easier to buy, easier to deliver and much harder to expand without payment, and the three-price structure does persuasive work even when the top option is never chosen.",
      "Take a deposit before starting any substantial work. It is cash flow, but more importantly it is a commitment test, and the clients who resist it are the ones who would have caused the trouble later.",
      "Answer every 'can you just…?' with a yes and a price. It keeps the relationship warm, protects the margin, and teaches the client that your prices are firm without you ever having to say so.",
      "Raise prices on a schedule rather than when you feel confident. After every three or four completed projects, new clients first and existing clients at a stated review date — the arithmetic favours the increase almost every time.",
    ],
    vocabulary: [
      { term: "Service package", meaning: "Named deliverables at a set price. Easier to buy and much harder to expand than an open-ended quote." },
      { term: "Hourly pricing", meaning: "Payment per hour worked. Simple for unpredictable tasks and a ceiling on income for everything else." },
      { term: "Project pricing", meaning: "A fixed price for a defined deliverable. Rewards speed and skill; requires controlled scope." },
      { term: "Retainer", meaning: "A fixed monthly fee for ongoing work. The structure that makes freelance income predictable." },
      { term: "Value-based pricing", meaning: "Pricing against what the outcome is worth to the client. Requires evidence and confidence; the highest ceiling." },
      { term: "Deposit", meaning: "Payment before work starts, usually fifty per cent. A commitment test as much as cash flow." },
      { term: "Payment terms", meaning: "When payment is due and what happens if it is late. Unenforceable unless written and read." },
      { term: "Scope control", meaning: "Keeping a job inside its agreed edges through named deliverables, defined revisions and priced extras." },
    ],
    homework: [
      {
        task: "Build three packages",
        detail:
          "Entry product, core offer, full option — each with deliverables named precisely enough that the edges are obvious. Check the three prices read well together.",
      },
      {
        task: "Convert one client to a retainer",
        detail:
          "Take a client you have done one-off work for and propose a monthly package. Calculate what four retainers would mean for your monthly income.",
      },
      {
        task: "Write your payment terms",
        detail:
          "Deposit percentage, due date, late consequence, invoice contents. Add them to your reusable expectations note and use them on the next job.",
      },
      {
        task: "Raise one price",
        detail:
          "Increase your rate for new clients today and draft the review-date note for one existing client. Do not apologise in either.",
      },
    ],
    rubric: [
      {
        criterion: "Packaging",
        passing: "Quotes per job.",
        excellent: "Three packages with precisely named deliverables whose prices work together, giving clients a small way in and making the core look reasonable.",
      },
      {
        criterion: "Pricing model",
        passing: "Charges something.",
        excellent: "A model chosen deliberately per package with written justification, a retainer calculated as predictable income, and a value-based figure estimated.",
      },
      {
        criterion: "Payment protection",
        passing: "Gets paid eventually.",
        excellent: "A deposit before work, written terms with a stated late consequence, proper invoices, and final deliverables held until the balance clears.",
      },
      {
        criterion: "Scope control",
        passing: "Manages changes.",
        excellent: "Named deliverables, defined revision rounds, explicit exclusions, and every extra answered with a yes and a price.",
      },
      {
        criterion: "Commercial judgement",
        passing: "Takes the work offered.",
        excellent: "Prices raised on a schedule rather than on mood, and bad clients declined with the real cost of taking them understood.",
      },
    ],
    faqs: [
      {
        q: "How much deposit should I ask for?",
        a: "Fifty per cent is standard for project work, and seventy per cent is reasonable for a brand-new client with no relationship. The deposit is a commitment test as much as cash flow — a client unwilling to pay half in advance is telling you how the rest of the job will go.",
      },
      {
        q: "Is hourly pricing ever right?",
        a: "For small, genuinely unpredictable tasks, yes. For defined deliverables, no — it punishes you for being fast and caps your income at your hours. Move defined work to project or retainer pricing as soon as you can describe the deliverables precisely.",
      },
      {
        q: "How do I raise prices without losing clients?",
        a: "Raise on new clients immediately and on existing ones at a stated review date, with a short plain note and no apology. Most accept, some leave, and the increase on those who stay outweighs the loss. Do not frame it as a request for permission.",
      },
      {
        q: "A client will not pay the balance. What do I do?",
        a: "If you held the final files, you still have leverage — send them when the balance clears. If you already delivered, send a dated invoice, follow up twice in writing, and treat the lesson as the reason deposits exist. For a substantial sum, a written demand and small claims process may be worth it.",
      },
      {
        q: "When should I say no to a client?",
        a: "When they want everything for nothing, argue about every deliverable, pay the first small invoice late, or run a business you cannot respect. A bad client costs more than their fee in time, stress and the good work you could not take on because you were busy with them.",
      },
    ],
  },

  "records-money-and-reputation": {
    summary:
      "Freelancers fail financially for boring reasons: no records, money mixed together, no idea what was actually earned, and no habit of asking for the next job. This session covers the simple systems that keep the money straight and the reputation growing.",
    objectives: [
      "Keep records simple enough that you will actually maintain them",
      "Understand the basic finances of freelance work",
      "Separate business money from personal money",
      "Turn one-time clients into repeat clients",
      "Build a referral habit that fills the pipeline",
      "Protect and grow a professional reputation",
    ],
    blocks: [
      {
        heading: "Records you will actually keep",
        body: [
          "The reason freelancers have no records is not laziness — it is that they design systems too elaborate to maintain. A spreadsheet with six columns, updated weekly, is kept. An accounting setup with categories and reconciliation, updated monthly, is abandoned by week four. **The best system is the one you will still be using in six months**, and that is almost always the simplest one.",
          "Six columns are enough: **date**, **client**, **what the work was**, **amount agreed**, **amount received**, **status**. Add a second simple list of **expenses** — data, transport, power, tools, materials — because without it you cannot know what you actually earned. Ten minutes a week, and at the end of a year you know your income, your costs and which clients were worth having.",
          "Then keep the **documents**: every proposal, every invoice, every confirmation of scope, and receipts for anything over a trivial amount. Store them in one folder per client per year. This is not bureaucracy — it is what lets you answer a question in thirty seconds instead of guessing, and what protects you in the one dispute a year when someone claims they never agreed to something.",
        ],
      },
      {
        heading: "Basic freelance finances",
        body: [
          "Three numbers matter and most freelancers know none of them. **Revenue** — everything invoiced. **Costs** — data, transport, power, tools, software, materials, and the tax you will owe. **Profit** — what is actually left, which is the only number that describes how the business is doing. A freelancer earning ₦200,000 a month with ₦140,000 of costs is running a different business from one with ₦40,000 of costs, and without records the two feel identical.",
          "Then the habit that protects you: **separate the money**. A separate bank account for business, into which every payment goes and from which every business cost is paid. It costs nothing and it does three things — you can see what the business actually earns, you can see what it costs, and you stop accidentally spending money that belongs to tax or to next month's data.",
          "Two provisions a freelancer must make. **Tax**: set aside a percentage of every payment as it arrives, because tax on income you have already spent is a crisis, while tax on money already sitting in an account is an administrative task. And **an irregularity buffer**: freelance income varies month to month, so a reserve of one or two months of costs is what stops a slow month becoming an emergency that forces you to accept bad work.",
        ],
      },
      {
        heading: "Repeat customers",
        body: [
          "A new client costs you several hours of prospecting, discovery and proposal writing. A repeat client costs one message. The arithmetic is so lopsided that **keeping clients is the highest-return activity available to a freelancer**, and yet most spend almost all their effort finding new ones because that is the visible work.",
          "Repeat business comes from three habits. **Finish well** — deliver on time, hand over properly, and ask whether the work achieved what they wanted. **Follow up after** — a message a month later asking how it is going is remembered precisely because nobody does it. **Propose the next thing** — 'the menu is working well; the natural next step is the social media graphics to match' turns a completed job into an ongoing relationship rather than a closed one.",
          "Then make the ongoing explicit through a **retainer**, which is simply a repeat customer formalised. Offering it at delivery, while satisfaction is highest, is far more effective than offering it six months later to someone who has forgotten you. And when a client does go quiet, one polite check-in is worth sending — clients drift rather than leave, and a single message often restarts the relationship.",
        ],
      },
      {
        heading: "Referrals",
        body: [
          "Referrals are the highest-converting source of clients there is, because trust transfers with the introduction. They do not happen by accident, and they do not happen because the work was good — they happen because **you asked**. Most freelancers never ask, which is the single largest reason their pipeline is unreliable.",
          "Ask at the right moment: **immediately after delivery**, when satisfaction is highest and the result is visible. 'I am glad the menu is working. Do you know one other restaurant owner who would benefit from the same?' Note the phrasing — **one**, not 'anyone you know'. One is a specific, answerable request; 'anyone' produces a vague promise that leads nowhere.",
          "Then make referring easy. **Tell clients exactly what you do** in one sentence they can repeat, because they cannot recommend something they cannot describe. 'I design menus and price lists for restaurants' is repeatable; 'I do graphic design' is not. And when someone does refer, **thank them properly and tell them the outcome** — people refer again when they see the introduction mattered.",
        ],
      },
      {
        heading: "Reputation and scaling",
        body: [
          "In this market, reputation travels fast and it is built by things that have nothing to do with skill. **Replying quickly. Delivering when you said. Telling the truth about a delay. Not disparaging a competitor. Being easy to work with.** None of these require talent, and together they are most of what makes a client recommend you — because a client recommending you is putting their own judgement on the line.",
          "The flip side is that damage travels faster. **Over-promising to win a job** is the most common self-inflicted wound: the deadline you could not meet, the deliverable you could not produce, the price you quoted too low and then resented. Each one costs more than the job was worth, and the freelancer who is honest about capacity earns steadily while the one who over-promises earns in bursts and disappears.",
          "**Scaling** follows reputation, and there are three routes. **Raise prices** — the simplest and most reliable, because it increases income without increasing work. **Retainers** — which convert effort into predictable income. **Delegation** — passing defined pieces to someone junior at a lower rate while you keep the client relationship, which works only when your processes are written down well enough to hand over. All three require the records and the reputation from this session; none of them work without both.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor sets up the six-column records sheet live, calculates revenue, costs and profit for a real month, separates the money and sets aside tax, then scripts the repeat-business proposal, the one-name referral ask and the follow-up that restarts a quiet client.",
      steps: [
        {
          step: "Show a system that failed",
          detail:
            "Display an elaborate accounting setup and explain why it was abandoned by week four. Explain that the best system is the one still in use in six months.",
        },
        {
          step: "Build the six-column sheet",
          detail:
            "Create date, client, work, agreed, received and status. Explain that ten minutes a week produces a year of real information.",
        },
        {
          step: "Add the expense list",
          detail:
            "Record data, transport, power, tools and materials. Explain that without costs you cannot know what you actually earned.",
        },
        {
          step: "Calculate a real month",
          detail:
            "Compute revenue, costs and profit from actual figures. Show two months with the same revenue and very different profit.",
        },
        {
          step: "Separate the money",
          detail:
            "Open a business account and route every payment through it. Explain the three things separation gives you for nothing.",
        },
        {
          step: "Set aside tax",
          detail:
            "Apply a percentage to every payment as it arrives. Explain that tax on spent money is a crisis while tax on saved money is an administrative task.",
        },
        {
          step: "Build the buffer",
          detail:
            "Target one or two months of costs. Explain that the reserve is what stops a slow month forcing you to accept bad work.",
        },
        {
          step: "Organise the documents",
          detail:
            "Set up one folder per client per year with proposals, invoices and confirmations. Show answering a question in thirty seconds from it.",
        },
        {
          step: "Script the follow-up",
          detail:
            "Draft the message sent a month after delivery. Explain that it is remembered precisely because nobody else sends it.",
        },
        {
          step: "Propose the next thing",
          detail:
            "Turn a completed job into an ongoing one by naming the natural next step. Explain that this converts a closed job into a relationship.",
        },
        {
          step: "Offer the retainer at delivery",
          detail:
            "Make the ask while satisfaction is highest. Show the six-months-later version and explain why it is far less effective.",
        },
        {
          step: "Ask for one referral",
          detail:
            "Ask for one specific name rather than 'anyone you know'. Explain that one is answerable while 'anyone' produces a vague promise.",
        },
        {
          step: "Make yourself describable",
          detail:
            "Write the one sentence a client can repeat. Explain that people cannot recommend something they cannot describe.",
        },
      ],
    },
    practice: {
      title: "Set up the money system and the growth habits",
      brief:
        "You set up records you will actually maintain, calculate revenue, costs and profit for a real month, separate your money and provide for tax and a buffer, then script the four growth habits: the follow-up, the next-thing proposal, the retainer offer and the one-name referral ask.",
      steps: [
        "Create a six-column records sheet: date, client, work, agreed, received, status.",
        "Create a separate expense list covering data, transport, power, tools and materials.",
        "Enter every job and expense from the last three months.",
        "Calculate revenue, costs and profit for one real month.",
        "Identify which client was most profitable and which was least.",
        "Open or designate a separate business account and route payments through it.",
        "Choose a percentage to set aside for tax and apply it to every payment.",
        "Set a buffer target of one to two months of costs and state how you will reach it.",
        "Set up one folder per client per year with proposals, invoices and confirmations.",
        "Schedule ten minutes a week for updating the records, and put it in your calendar.",
        "Write the follow-up message you will send a month after delivery.",
        "Write the 'natural next step' proposal for your most recent completed client.",
        "Write the retainer offer to make at delivery.",
        "Write the one-name referral ask and the one sentence clients can repeat about you.",
        "Send all four to real people this week.",
      ],
      standard:
        "A six-column sheet plus expense list populated with three months of real data, revenue, costs and profit calculated for one month with the best and worst client identified, a separate business account designated, a tax percentage applied to every payment, a stated buffer target and route to it, client folders set up, a scheduled ten-minute weekly update, and all four growth scripts — follow-up, next step, retainer, one-name referral — written and actually sent to real people this week.",
    },
    pitfalls: [
      {
        problem: "You built a records system too complex to keep",
        fix: "Six columns, ten minutes a week. The best system is the one still in use in six months, and an elaborate setup abandoned in week four produces no information at all.",
      },
      {
        problem: "You track income but not costs",
        fix: "Record data, transport, power, tools and materials. Without costs you cannot tell a ₦200,000 month with ₦140,000 of costs from one with ₦40,000, and they are completely different businesses.",
      },
      {
        problem: "Business and personal money are mixed",
        fix: "Route every payment through one business account and pay every business cost from it. It costs nothing and it is the only way to see what the business actually earns.",
      },
      {
        problem: "You have not set anything aside for tax",
        fix: "Apply a percentage to every payment as it arrives. Tax on income you have already spent is a crisis; tax on money already in an account is a routine task.",
      },
      {
        problem: "You spend all your effort finding new clients",
        fix: "Follow up after delivery and propose the natural next step. A repeat client costs one message while a new one costs hours, and keeping clients is the highest-return work available.",
      },
      {
        problem: "You never ask for referrals",
        fix: "Ask immediately after delivery for one specific name. Referrals do not happen because the work was good; they happen because you asked, and most freelancers never do.",
      },
      {
        problem: "Clients cannot describe what you do",
        fix: "Give them one repeatable sentence. 'I design menus and price lists for restaurants' can be recommended; 'I do graphic design' cannot, however well the work was done.",
      },
      {
        problem: "You over-promise to win jobs",
        fix: "Be honest about capacity and price. The deadline you could not meet and the price you resented cost more than the job was worth, and reputation damage travels faster than praise.",
      },
    ],
    expertNotes: [
      "Keep six columns and update them for ten minutes a week. The value of records is not the sophistication of the system but the fact that it is still running in six months, when it can tell you which clients were worth having.",
      "Set aside tax from every payment the moment it arrives. Tax on money already spent is a crisis that forces bad decisions; tax on money already reserved is an administrative task you complete without drama.",
      "Ask for one referral at delivery, by name, every single time. It is the highest-converting client source available, it costs one sentence, and the only reason most freelancers have an unreliable pipeline is that they never ask.",
      "Give clients one repeatable sentence describing what you do. A recommendation depends on the referrer being able to describe you, and 'I do graphic design' cannot be recommended to anyone specific.",
    ],
    vocabulary: [
      { term: "Revenue", meaning: "Everything invoiced. Not the same as what you earned." },
      { term: "Costs", meaning: "Data, transport, power, tools, software, materials and tax. Without them, revenue tells you nothing." },
      { term: "Profit", meaning: "Revenue minus costs. The only number that describes how the business is doing." },
      { term: "Commingling", meaning: "Mixing business and personal money. Makes it impossible to see what the business earns or costs." },
      { term: "Tax provision", meaning: "A percentage set aside from every payment. Turns tax from a crisis into a routine." },
      { term: "Buffer", meaning: "One or two months of costs held in reserve. What stops a slow month forcing you to accept bad work." },
      { term: "Client retention", meaning: "Keeping existing clients through follow-up and proposed next steps. Far cheaper than finding new ones." },
      { term: "Referral ask", meaning: "A specific request for one name, made at delivery. The highest-converting client source, and it must be asked for." },
    ],
    homework: [
      {
        task: "Set up your records sheet",
        detail:
          "Six columns plus an expense list, populated with the last three months. Then schedule ten minutes a week in your calendar to keep it updated.",
      },
      {
        task: "Calculate one real month",
        detail:
          "Revenue, costs and profit. Identify your most and least profitable client, and write down what you will change as a result.",
      },
      {
        task: "Separate your money",
        detail:
          "Designate a business account, route every payment through it, choose a tax percentage and set a buffer target with a route to reaching it.",
      },
      {
        task: "Send four growth messages",
        detail:
          "A follow-up to a past client, a next-step proposal to a recent one, a retainer offer, and a one-name referral ask. Send them today rather than when convenient.",
      },
    ],
    rubric: [
      {
        criterion: "Record keeping",
        passing: "Keeps some notes.",
        excellent: "A six-column sheet plus expense list, populated with three months of real data, with a scheduled weekly update and client folders for documents.",
      },
      {
        criterion: "Financial understanding",
        passing: "Knows what was received.",
        excellent: "Revenue, costs and profit calculated for a real month, best and worst client identified, and the difference between income and profit understood.",
      },
      {
        criterion: "Money discipline",
        passing: "Gets paid.",
        excellent: "A separate business account, a tax percentage applied to every payment, and a stated buffer target with a route to reaching it.",
      },
      {
        criterion: "Repeat and referral",
        passing: "Hopes clients return.",
        excellent: "All four scripts written and sent — follow-up, next step, retainer offer and one-name referral ask — with a repeatable one-sentence description of the work.",
      },
      {
        criterion: "Reputation",
        passing: "Is polite.",
        excellent: "Honest about capacity and price, quick to reply, prompt to disclose a delay, and understood that over-promising costs more than the job is worth.",
      },
    ],
    faqs: [
      {
        q: "Do I need accounting software?",
        a: "Not to start. A six-column spreadsheet and an expense list, updated ten minutes a week, will tell you more than software you abandon in a month. Move to software when the volume genuinely demands it, not before — the best system is the one still running in six months.",
      },
      {
        q: "How much should I set aside for tax?",
        a: "A sensible starting provision for a small freelancer in Nigeria is around ten to twenty per cent of what you receive, depending on your structure and turnover. Confirm your position with a tax adviser or the FIRS guidance for small businesses, and set the percentage aside from every payment as it arrives.",
      },
      {
        q: "How do I get repeat clients?",
        a: "Finish well, follow up a month later, and propose the natural next step at delivery. A repeat client costs one message while a new one costs hours of prospecting and proposal writing, so retention is the highest-return work available to a freelancer.",
      },
      {
        q: "How do I ask for a referral without it feeling awkward?",
        a: "Ask for one specific name right after delivery: 'Do you know one other restaurant owner who would benefit from the same?' One is a specific, answerable request, while 'anyone you know' produces a vague promise. Then tell them how it turned out, so they refer again.",
      },
      {
        q: "How do I scale beyond my own hours?",
        a: "Raise prices first, because it increases income without increasing work. Then convert clients to retainers for predictable income. Delegation comes last and only works when your process is written down well enough to hand over — which most freelancers discover is not yet true.",
      },
    ],
  },

  "business-plan-and-portfolio": {
    summary:
      "The final project: a one-page freelance business plan and a portfolio of three case studies, presented to the class and stress-tested in a pricing challenge. This is the artefact that turns what you learned into something you can show, sell and be hired for.",
    objectives: [
      "Write a one-page business plan that is actually usable",
      "Present three pieces of work as case studies rather than screenshots",
      "Defend your pricing under challenge",
      "Present a plan clearly to a non-expert audience",
      "Take critique and turn it into specific changes",
      "Set the next ninety days of concrete action",
    ],
    blocks: [
      {
        heading: "What the business plan is for",
        body: [
          "A freelance business plan is not a document you write to impress anyone — it is the answer to five questions, written down so that next month's you does not have to work them out again. **What do I sell?** Three packages with named deliverables. **To whom?** One client type, narrowed enough that they recognise themselves. **At what price?** With a floor set by real cost and a target set by value. **How do I find them?** Two or three channels, with a weekly action for each. **How do I measure it?** The numbers that tell you whether it is working.",
          "One page is a constraint that helps. It forces you to be specific, because vagueness does not fit, and it means you will actually read it again. A twenty-page plan written once and never opened is decoration; a one-page plan reviewed monthly is a working tool.",
          "The thing that makes it credible is that **every line is actionable**. 'Grow my client base' is not a plan. 'Send five referral messages and make five direct approaches every week, and review the pipeline every Friday' is. If a line in your plan cannot be done on a specific day, it is an intention rather than a plan.",
        ],
      },
      {
        heading: "The portfolio as case studies",
        body: [
          "Three pieces, each written as **problem, action, result**. The problem: what the business was struggling with, in their terms. The action: what you did and why, briefly — enough to show judgement rather than to show off. The result: what changed, in the client's words where you can get them.",
          "'A restaurant in Yaba had a menu customers could not read from the counter, and staff spent the evening answering questions instead of taking orders. We rebuilt it around three clear sections with photography and printed pricing. The owner reports fewer questions at the counter and noticeably more orders of the higher-margin dishes.' That is a case study. A screenshot of the menu is not, because it proves you can design a menu and nothing about whether it worked.",
          "If you have no client work, do three pieces for real local businesses at little or no cost in exchange for permission to show them and a short quote. **Real work with a named business and a stated result beats invented work every time**, because it demonstrates that you can operate with a real person, a real deadline and a real constraint — which is what a client is actually hiring.",
        ],
      },
      {
        heading: "Defending your pricing",
        body: [
          "The pricing challenge exists because price is where freelancers lose money, and the loss almost always happens in a conversation rather than in a decision. The three attacks you will face: **'That is expensive.'** **'Someone else will do it for less.'** **'Can you do it for free, it is good exposure.'** Each has an answer, and having the answer in advance is what stops you discounting in the moment.",
          "The core of every answer is the same: **do not defend the number, explain the scope**. 'At ₦60,000 that is the full launch pack delivered in five days with two revision rounds. If the budget is ₦35,000, I can do the flyer and two social posts.' You have not conceded the price; you have adjusted the work. The client learns that your prices are firm and that scope is what moves.",
          "For the free-work request, be honest and brief: 'I do paid work, but I would be glad to look at what you have and give you two suggestions.' That is generous without being exploited, and it often leads to paid work. What you must never do is work free for a business that can pay, because it teaches them and everyone they tell that your work has no price.",
        ],
      },
      {
        heading: "Presenting the plan",
        body: [
          "Present in five minutes, in the order that makes sense to a listener rather than the order you wrote it. **Who you serve and what problem they have.** **What you sell them**, the three packages and prices. **How you will find them**, the channels and the weekly actions. **What the first three pieces of work are.** **What success looks like in ninety days**, as a number.",
          "The habit that separates a good presentation from a nervous one is **specificity over completeness**. You do not need to cover everything; you need to make the listener believe this is a real plan for a real business. Named client type, named packages, actual prices, actual weekly actions. Vague coverage of every topic persuades nobody.",
          "Then take the critique properly. **Write down every objection without defending anything in the moment.** Most critique is useful even when it is delivered bluntly, and the instinct to explain yourself in the room costs you the information. Afterwards, sort the objections into three: things that are genuinely wrong and must change, things that are a matter of preference, and things that reflect the critic's own situation rather than yours. Change the first, consider the second, note the third.",
        ],
      },
      {
        heading: "The next ninety days",
        body: [
          "The plan ends with a ninety-day sequence, because ninety days is long enough to produce results and short enough to stay honest. **Weeks one to two**: build the three portfolio pieces and set up the records and the business account. **Weeks three to six**: contact the twenty names, make five direct approaches a week, and win the first paid job. **Weeks seven to ten**: deliver it properly, ask for the testimonial and one referral, and offer a retainer.",
          "**Weeks eleven to thirteen**: review the numbers, raise prices on new clients, and decide which channel produced the work worth keeping. That last step matters, because most freelancers keep doing everything they started instead of dropping what did not work — and the discipline of stopping is what frees time for what did.",
          "The honest expectation: you will not be busy by week thirteen, and that is normal. What you will have is three case studies, a working records system, a defined offer at real prices, a pipeline with actual names in it, and the first evidence of what works for you specifically. That is a business beginning rather than a business established, and it is further than almost everyone who says they want to freelance actually gets.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor presents a complete model plan — three packages, named client, prices, channels, weekly actions and a ninety-day sequence — then takes the class through the pricing challenge, answering the three attacks without discounting, and sorts live critique into change, preference and irrelevant.",
      steps: [
        {
          step: "Show the five questions",
          detail:
            "Lay out what, to whom, at what price, how found, how measured. Explain that a plan is the written answer to these so next month's you does not redo the work.",
        },
        {
          step: "Fill in one page",
          detail:
            "Complete the model plan live. Explain that the one-page limit is a constraint that forces specificity because vagueness does not fit.",
        },
        {
          step: "Test each line for action",
          detail:
            "Ask whether each line can be done on a specific day. Strike out anything that is an intention rather than an action.",
        },
        {
          step: "Present three case studies",
          detail:
            "Write problem, action and result for each piece. Show a screenshot beside one and explain what the missing context costs.",
        },
        {
          step: "Plan work for a real business",
          detail:
            "Identify three local businesses to do work for in exchange for permission and a quote. Explain why real work beats invented work.",
        },
        {
          step: "Face 'that is expensive'",
          detail:
            "Answer by explaining scope rather than defending the number. Show the discounted response beside it and explain what conceding teaches the client.",
        },
        {
          step: "Face 'someone is cheaper'",
          detail:
            "Answer with what the price includes and what has gone wrong with cheap work before. Explain that competing on price is a race you cannot win.",
        },
        {
          step: "Face the free-work request",
          detail:
            "Offer two free suggestions rather than free work. Explain why working free for a business that can pay teaches everyone that your work has no price.",
        },
        {
          step: "Deliver the five-minute presentation",
          detail:
            "Present client, packages, channels, first three pieces and the ninety-day number. Explain that specificity persuades where completeness does not.",
        },
        {
          step: "Take critique without defending",
          detail:
            "Write down every objection in silence. Explain that defending in the room costs you the information the critique contains.",
        },
        {
          step: "Sort the critique",
          detail:
            "Divide into genuinely wrong, matter of preference, and the critic's own situation. Change the first, consider the second, note the third.",
        },
        {
          step: "Commit to ninety days",
          detail:
            "Write the week-by-week sequence and the number that defines success. Explain that dropping what did not work is the discipline that frees time for what did.",
        },
      ],
    },
    practice: {
      title: "Final project: freelance business plan and portfolio",
      brief:
        "You produce a one-page business plan — three packages, one client type, real prices with a floor, channels with weekly actions, and a ninety-day sequence with a success number — plus a portfolio of three case studies written as problem, action and result. You present it in five minutes, survive a pricing challenge without discounting, and turn the critique into specific written changes.",
      steps: [
        "Write the three packages with named deliverables and prices.",
        "Calculate your price floor from real cost and set it as your minimum.",
        "Name one client type specific enough that they would recognise themselves.",
        "Choose two or three channels where that client actually is.",
        "Write a weekly action for each channel, doable on a specific day.",
        "Choose the numbers you will review monthly and state them.",
        "Write case study one: problem, action, result.",
        "Write case study two: problem, action, result.",
        "Write case study three: problem, action, result.",
        "Line up the real businesses for any portfolio piece you still need.",
        "Write the ninety-day week-by-week sequence with a success number.",
        "Write your answers to the three pricing attacks in advance.",
        "Present the plan in five minutes: client, packages, channels, first three pieces, ninety-day number.",
        "Take every critique without defending, and record it all.",
        "Sort the critique into change, preference and irrelevant, and write the specific changes you will make.",
      ],
      standard:
        "A one-page plan with three packages of named deliverables, a floor price calculated from real cost, one recognisable client type, two or three channels each with a dated weekly action, monthly review numbers and a ninety-day sequence with a success number; three case studies each written as problem, action and result with real businesses lined up for any missing piece; a five-minute presentation covering client, packages, channels, first three pieces and the ninety-day number; all three pricing attacks answered by explaining scope rather than discounting; and every critique recorded, sorted into change, preference and irrelevant, with the specific changes written down.",
    },
    pitfalls: [
      {
        problem: "Your plan is twenty pages you will never read again",
        fix: "One page. The limit forces specificity because vagueness does not fit, and a short plan reviewed monthly is a working tool where a long one written once is decoration.",
      },
      {
        problem: "Your plan contains intentions rather than actions",
        fix: "Test every line: can it be done on a specific day? 'Grow my client base' cannot; 'five referral messages and five direct approaches every week, reviewed every Friday' can.",
      },
      {
        problem: "Your portfolio is screenshots",
        fix: "Write problem, action and result. A screenshot proves you can produce an image; a case study proves you can solve a business problem, which is what a client is hiring.",
      },
      {
        problem: "You are waiting for clients before building a portfolio",
        fix: "Do three pieces for real local businesses at low cost in exchange for permission and a quote. Real work with a named business beats invented work every time.",
      },
      {
        problem: "You discount when challenged on price",
        fix: "Explain scope instead of defending the number: fewer deliverables at the lower budget. Conceding once teaches the client that every price you quote is negotiable.",
      },
      {
        problem: "You work free for a business that can pay",
        fix: "Offer two free suggestions instead. Working free teaches them, and everyone they tell, that your work has no price, and that lesson is very hard to reverse.",
      },
      {
        problem: "You defend yourself during critique",
        fix: "Write down every objection in silence and sort them afterwards into change, preference and irrelevant. Explaining yourself in the room costs you the information.",
      },
      {
        problem: "You keep doing everything you started",
        fix: "At week thirteen, review which channel produced work worth keeping and drop the rest. The discipline of stopping is what frees time for what actually works.",
      },
    ],
    expertNotes: [
      "Keep the plan to one page and review it monthly. The constraint forces specificity, and a short plan that is actually reopened is worth more than a thorough one that is never read again.",
      "Write every portfolio piece as problem, action and result. The result is what persuades, and it is the part most freelancers leave out — which is why their portfolios look impressive and convert poorly.",
      "Answer every price challenge by explaining scope rather than defending the number. Adjusting deliverables keeps the client, protects the rate, and teaches them that your prices are firm without you ever having to argue.",
      "Take critique in silence and sort it afterwards. Most of it is useful even when bluntly delivered, and the instinct to defend yourself in the moment is what costs you the information you came for.",
    ],
    vocabulary: [
      { term: "Business plan", meaning: "The written answer to five questions: what, to whom, at what price, how found, how measured. One page, reviewed monthly." },
      { term: "Case study", meaning: "A portfolio piece written as problem, action and result. Evidence of value rather than of ability." },
      { term: "Price floor", meaning: "The cost of your time, data, transport and tools. The minimum you will quote, calculated rather than felt." },
      { term: "Pipeline action", meaning: "A weekly activity that produces prospects. A plan without dated actions is a set of intentions." },
      { term: "Pricing challenge", meaning: "The moment a client or critic attacks your price. Answered by explaining scope, never by defending the number." },
      { term: "Scope adjustment", meaning: "Changing deliverables instead of discounting. Protects the rate and teaches the client that price follows scope." },
      { term: "Critique sorting", meaning: "Dividing feedback into genuinely wrong, preference, and the critic's own situation. Only the first must change." },
      { term: "Ninety-day plan", meaning: "A week-by-week sequence with a success number. Long enough to produce results, short enough to stay honest." },
    ],
    homework: [
      {
        task: "Write your one-page plan",
        detail:
          "Three packages, one client type, prices with a floor, channels with weekly actions, monthly review numbers and a ninety-day sequence. Test every line: can it be done on a specific day?",
      },
      {
        task: "Write three case studies",
        detail:
          "Problem, action, result for each. Line up real local businesses for any piece you still need, in exchange for permission to show the work and a short quote.",
      },
      {
        task: "Write your three price answers",
        detail:
          "'That is expensive', 'someone is cheaper', 'can you do it free for exposure' — each answered by explaining scope rather than defending the number. Practise them aloud.",
      },
      {
        task: "Commit to ninety days",
        detail:
          "Write the week-by-week sequence with the number that defines success, and put the first week's actions in your calendar today.",
      },
    ],
    rubric: [
      {
        criterion: "Plan quality",
        passing: "Has a rough idea.",
        excellent: "One page answering all five questions, every line actionable on a specific day, with monthly review numbers and a ninety-day sequence ending in a success number.",
      },
      {
        criterion: "Portfolio",
        passing: "Has samples.",
        excellent: "Three case studies each written as problem, action and result, with real businesses lined up for any missing piece and client quotes where available.",
      },
      {
        criterion: "Pricing defence",
        passing: "Quotes a figure.",
        excellent: "All three attacks answered by explaining scope rather than defending the number, with a floor calculated from real cost and no free work for businesses that can pay.",
      },
      {
        criterion: "Presentation",
        passing: "Explains the plan.",
        excellent: "Five minutes in listener order — client, packages, channels, first three pieces, ninety-day number — with specificity chosen over completeness.",
      },
      {
        criterion: "Response to critique",
        passing: "Listens politely.",
        excellent: "Every objection recorded without defending, sorted into change, preference and irrelevant, with the specific changes written down and the first week's actions scheduled.",
      },
    ],
    faqs: [
      {
        q: "Do I really need a written business plan to freelance?",
        a: "You need the five answers written down: what you sell, to whom, at what price, how you find them, how you measure it. Without them, every month starts from scratch and the same decisions get remade badly. One page, reviewed monthly, is enough — the plan is a working tool, not a document to impress anyone.",
      },
      {
        q: "How many portfolio pieces do I need?",
        a: "Three, done properly. Three case studies with a named business, a stated problem and a real result persuade far more than fifteen screenshots. Depth of evidence beats volume, because a client is asking whether you can solve their problem, not how much you have made.",
      },
      {
        q: "What if I have no clients yet?",
        a: "Do three pieces for real local businesses at little or no cost in exchange for permission to show the work and a short quote. Real work with a deadline and a real person demonstrates what a client is hiring; invented work demonstrates only that you can use the tools.",
      },
      {
        q: "How do I answer 'can you do it for free for exposure'?",
        a: "Offer two free suggestions instead: 'I do paid work, but I would be glad to look at what you have and give you two ideas.' It is generous without being exploited, and it frequently leads to paid work. Never work free for a business that can pay — it teaches everyone that your work has no price.",
      },
      {
        q: "What should I expect in the first ninety days?",
        a: "You will not be busy, and that is normal. You should finish with three case studies, working records, a defined offer at real prices, a pipeline with actual names in it, and your first evidence of which channel produces work worth keeping. That is a business beginning, and it is further than most people who say they want to freelance ever get.",
      },
    ],
  },
};
