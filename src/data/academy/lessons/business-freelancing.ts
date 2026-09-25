import type { SessionLecture } from "../types";

/**
 * Business & Freelancing — ₦15,000 · 3 weeks · 6 sessions.
 * Sessions 1 to 3. (Sessions 4–6 in business-freelancing-b.ts.)
 */
export const businessFreelancingLessonsA: Record<string, SessionLecture> = {
  "from-skill-to-service": {
    summary:
      "A skill is something you can do; a service is something someone will pay you to have done. This session covers the difference, how to find problems worth solving, who will pay you to solve them, and how to turn one skill into a service you can describe, price and sell.",
    objectives: [
      "Distinguish a skill from a service and explain why the difference determines income",
      "Find useful problems worth solving rather than waiting for work",
      "Identify who actually pays for your kind of work",
      "Turn one skill into three distinct service offers",
      "Understand the basic pricing concepts behind every model",
      "Build a portfolio that works as evidence rather than decoration",
    ],
    blocks: [
      {
        heading: "Skill versus service",
        body: [
          "A **skill** is something you can do: you can design a flyer, build a website, edit a video, repair a laptop. A **service** is a defined outcome someone buys: 'I will design four social media graphics a month for your business for ₦40,000'. The skill is the raw material; the service is the product. Almost everyone who struggles to earn from a skill they genuinely have is missing the second step, not the first.",
          "The reason this matters commercially is that **people buy outcomes, not abilities**. Nobody wakes up wanting to hire someone who knows Photoshop. They wake up wanting their business to look professional, or their launch to have materials ready, or their broken laptop to work again. A skill described as a skill is hard to buy, because the buyer has to work out what to ask for and what it should cost. A service described as an outcome is easy to buy.",
          "So the translation is the work. 'I do graphic design' is a skill statement and it produces nothing. 'I design a full set of launch materials — flyer, social posts, price list and banner — delivered in five days for ₦60,000' is a service, and it can be sold today. Every session in this course builds on that translation, because without it the rest of the material has nothing to attach to.",
        ],
      },
      {
        heading: "Finding useful problems",
        body: [
          "Work is not found by looking for work; it is found by looking for **problems**. A problem is an opportunity with money attached, because someone experiencing it is already motivated to pay. The skill is learning to see problems, and once you start looking they are everywhere: a church whose announcements are still handwritten, a shop with a price list nobody can read, a trader whose WhatsApp has no catalogue, a professional whose CV has not been updated in six years.",
          "Three places to look. **Your immediate surroundings** — the businesses, organisations and people you already pass every day, whose problems you can see without asking. **What people complain about** — complaints are unsolicited problem statements, and the specific ones ('I spent three weeks on that flyer and it still looks bad') are the ones with money behind them. **What people already pay for badly** — if someone is paying and unhappy, they have budget and a reason to switch, which is far easier than creating demand from nothing.",
          "Then the discipline: **write problems down**. A list of thirty observed problems is worth more than any amount of thinking about what service to offer, because it is drawn from real demand rather than from what you would like to do. Review the list and look for the ones that appear more than once — repetition is the strongest signal that a problem is common enough to build a service around.",
        ],
      },
      {
        heading: "Identifying customers",
        body: [
          "Your customer is whoever **has the problem and the money to pay for it**. Both parts matter. A student with a broken laptop has the problem and no money; a company with a working IT department has the money and no problem. The overlap is your market, and it is usually narrower than you assumed and much easier to sell to.",
          "Narrow deliberately, for the same reason it works in marketing: a specific service for a specific type of client gets a sharper message, a better price and more referrals. 'I design menus for restaurants in Lagos' beats 'I do graphic design', because a restaurant owner reading it thinks 'that is for me' rather than 'that is a service'. And referrals follow specificity — a restaurant owner knows other restaurant owners.",
          "Then find where they are. Business owners are in **trade associations, market clusters, WhatsApp groups, Instagram and church or mosque networks**. Professionals are on **LinkedIn and in alumni groups**. Small organisations are reachable **directly, in person**, which is still the highest-converting route in this market. Choose one place your customer actually is and become visible there, rather than being vaguely present everywhere.",
        ],
      },
      {
        heading: "Turning one skill into three services",
        body: [
          "One skill supports several services, and having three is what makes you sellable. A designer might offer a **one-off project** (a launch pack for ₦60,000), a **monthly retainer** (four graphics a month for ₦40,000) and a **fixed product** (a ₦25,000 brand starter pack with a logo, colours and a template). Each serves a different buyer: someone with an event, someone with ongoing needs, someone with a small budget who wants something defined.",
          "The three-part structure does more than widen your market. It **anchors the price** — the middle option becomes reasonable next to the expensive one — and it gives you a **smaller first sale**, which matters because a first client is much easier to win at ₦25,000 than at ₦60,000, and a satisfied small client becomes a bigger one and a source of referrals.",
          "Write each service in the same three parts: **what is delivered**, **by when**, and **for how much**. 'Four social media graphics, delivered every Friday, ₦40,000 a month' is complete. 'Social media design' is not, and it invites the buyer to invent their own expectation of what they are getting — which is how scope problems begin before the work has even started.",
        ],
      },
      {
        heading: "Pricing concepts and the portfolio",
        body: [
          "Pricing has three reference points and you should understand all three before choosing. **Cost** — what it costs you in time, data, transport and tools, below which you lose money. **Market** — what others charge for comparable work, which sets the range a client expects. **Value** — what the outcome is worth to the client, which is what actually justifies a higher price. A ₦60,000 launch pack is expensive against cost and reasonable against value if it sells out an event.",
          "Beginners price on cost and time, which caps them permanently. Professionals price on **value with a floor set by cost**: never below what the work costs you, and as high as the value supports. The practical route in is to start slightly below market to build evidence, raise prices with every few completed projects, and stop competing on being the cheapest as soon as you have work to show — because competing on price is a race you cannot win against someone with lower costs than you.",
          "Your **portfolio** is the evidence, and it must be built as **case studies rather than screenshots**. Three pieces, each showing the problem, what you did and the result: 'A restaurant in Yaba needed a menu customers could read. We redesigned it around three clear sections with photography; the owner reports fewer questions at the counter and more orders of the higher-margin dishes.' That is persuasive. A folder of images with no context proves you can make images and nothing more. If you have no clients yet, do three pieces for real local businesses at little or no cost in exchange for permission to show the work — real work beats invented work every time.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor takes one skill — graphic design — and builds three complete services from it in front of the class: a one-off project, a monthly retainer and a fixed starter product, each with deliverables, timeline and price, then assembles a portfolio case study from a real local business.",
      steps: [
        {
          step: "State the skill plainly",
          detail:
            "Write 'I can design' and explain why that sentence cannot be sold. Show that no buyer can tell what to ask for or what it should cost.",
        },
        {
          step: "List observed problems",
          detail:
            "Write down twenty real problems noticed in the past week. Explain that problems are opportunities with money already attached.",
        },
        {
          step: "Find the repeats",
          detail:
            "Mark the problems that appear more than once and explain that repetition is the strongest evidence that a service can be built around it.",
        },
        {
          step: "Identify who pays",
          detail:
            "For each repeated problem, name who has it and whether they have money. Show the overlap as the actual market.",
        },
        {
          step: "Narrow the customer",
          detail:
            "Choose one specific type of client and rewrite the service for them. Explain that specificity produces sharper messages and better referrals.",
        },
        {
          step: "Build the one-off service",
          detail:
            "Define a launch pack with deliverables, a five-day timeline and a price. Explain that a defined project is the easiest first sale.",
        },
        {
          step: "Build the retainer",
          detail:
            "Define four graphics a month with a delivery day and a monthly fee. Explain that retainers create predictable income, which is what makes freelancing stable.",
        },
        {
          step: "Build the fixed product",
          detail:
            "Define a starter pack with a set price. Explain that it gives a smaller first sale and anchors the other two options.",
        },
        {
          step: "Test the three prices together",
          detail:
            "Show how the middle option becomes reasonable beside the expensive one. Explain that pricing is read comparatively, never in isolation.",
        },
        {
          step: "Price against value, not time",
          detail:
            "Ask what the launch pack is worth to a business running an event. Explain that cost sets the floor and value sets the ceiling.",
        },
        {
          step: "Write a case study",
          detail:
            "Take one real piece of work and write problem, action and result. Contrast it with a screenshot and explain what the missing context costs.",
        },
        {
          step: "Plan three portfolio pieces",
          detail:
            "Identify three real local businesses to do work for in exchange for permission to show it. Explain that real work beats invented work every time.",
        },
      ],
    },
    practice: {
      title: "Exercise: turn one learned skill into three possible services",
      brief:
        "You take one skill you already have and produce three distinct, sellable services — each with deliverables, timeline and price — grounded in a written list of real observed problems, a named customer type, and one portfolio case study written as problem, action and result.",
      steps: [
        "Write down the skill in one sentence, honestly, at your current level.",
        "List twenty real problems you have observed in the past week.",
        "Mark the problems that appeared more than once.",
        "For each repeated problem, name who has it and whether they can pay.",
        "Choose the overlap with the most money attached and narrow it to one client type.",
        "Write the client type specifically enough that they would recognise themselves.",
        "Define service one: a one-off project with deliverables, timeline and price.",
        "Define service two: a monthly retainer with a delivery rhythm and monthly fee.",
        "Define service three: a fixed product with a set price and clear contents.",
        "Check that the three prices work together, with the middle looking reasonable.",
        "Calculate what each service costs you in time, data, transport and tools.",
        "Set your floor price from that cost and never quote below it.",
        "Write one portfolio case study: the problem, what you did, and the result.",
        "Name three real local businesses you will do work for to complete the portfolio.",
      ],
      standard:
        "Twenty observed problems with the repeats marked, one narrowed client type who would recognise themselves, three distinct services each stating deliverables, timeline and price, the three prices working together with a clear floor calculated from real cost, one portfolio case study written as problem, action and result, and three named local businesses lined up for portfolio work.",
    },
    pitfalls: [
      {
        problem: "You describe a skill instead of a service",
        fix: "Say what is delivered, by when and for how much. 'I do graphic design' cannot be bought; 'a launch pack delivered in five days for ₦60,000' can be, because the buyer knows exactly what they are getting.",
      },
      {
        problem: "You wait for work instead of looking for problems",
        fix: "Write down twenty observed problems a week. Work is found by noticing problems, and problems are everywhere once you start looking deliberately rather than waiting to be asked.",
      },
      {
        problem: "Your customer is 'anyone who needs design'",
        fix: "Narrow to one client type with money attached. Specificity sharpens the message and improves referrals, because a restaurant owner knows other restaurant owners.",
      },
      {
        problem: "You have only one offer",
        fix: "Build three: a one-off project, a retainer and a fixed product. Three options widen your market, anchor the price and give you a smaller first sale that is easier to win.",
      },
      {
        problem: "You price on your time",
        fix: "Set a floor from your real cost and price against value. Time-based pricing caps you permanently, because your hours are limited and your value is not.",
      },
      {
        problem: "You compete on being the cheapest",
        fix: "It is a race you cannot win against someone with lower costs. Raise prices with every few completed projects and compete on reliability and evidence instead.",
      },
      {
        problem: "Your portfolio is a folder of screenshots",
        fix: "Write case studies: problem, action, result. Screenshots prove you can make images; a case study proves you can solve a business problem, which is what clients actually buy.",
      },
      {
        problem: "You are waiting for real clients before building a portfolio",
        fix: "Do three pieces for real local businesses at little or no cost in exchange for permission to show the work. Real work with a named business beats invented work every time.",
      },
    ],
    expertNotes: [
      "Translate every skill into an outcome before you mention it to anyone. 'I design launch packs delivered in five days' is buyable; 'I know Canva and Photoshop' is not, however true it is.",
      "Keep a written list of observed problems and review it weekly. It is drawn from real demand rather than from what you would like to do, and the problems that repeat are the ones worth building a service around.",
      "Always have three offers at three prices. It widens your market, anchors the middle option and gives nervous first clients a small way in — which is how most long-term relationships start.",
      "Build your portfolio from real local work, even at low cost, in exchange for permission to show it. A named business with a stated result persuades far more strongly than an impressive invented piece.",
    ],
    vocabulary: [
      { term: "Service", meaning: "A defined outcome someone buys: what is delivered, by when, for how much. The sellable form of a skill." },
      { term: "Service package", meaning: "A fixed bundle of deliverables at a set price. Easier to buy than an open-ended hourly arrangement." },
      { term: "Retainer", meaning: "Ongoing work for a fixed monthly fee. The structure that makes freelance income predictable." },
      { term: "Target client", meaning: "The specific type of person or business you serve, narrowed enough that they recognise themselves." },
      { term: "Value-based pricing", meaning: "Pricing against what the outcome is worth to the client, with a floor set by your cost." },
      { term: "Price floor", meaning: "The cost of your time, data, transport and tools. Never quote below it." },
      { term: "Case study", meaning: "A portfolio piece written as problem, action and result. Evidence of value rather than of ability." },
      { term: "Personal brand", meaning: "What people associate with your name. Built by consistent, visible, reliable work rather than by a logo." },
    ],
    homework: [
      {
        task: "List twenty observed problems",
        detail:
          "From the past week, real problems you noticed in businesses, organisations or people around you. Mark the repeats. This list is the raw material for every service you will ever build.",
      },
      {
        task: "Write three services from one skill",
        detail:
          "One-off project, monthly retainer, fixed product — each with deliverables, timeline and price. Check that the three prices work together and that your floor covers real cost.",
      },
      {
        task: "Calculate your price floor",
        detail:
          "Add up what an hour of your work actually costs: time, data, transport, power, tools. Write the number down and set your minimum quote above it.",
      },
      {
        task: "Write one portfolio case study",
        detail:
          "Problem, action, result — for a real piece of work, even a small one. If you have none, do one this week for a local business in exchange for permission to show it.",
      },
    ],
    rubric: [
      {
        criterion: "Skill to service",
        passing: "Can name their skill.",
        excellent: "Describes a defined outcome with deliverables, timeline and price that a buyer could purchase without further explanation.",
      },
      {
        criterion: "Problem finding",
        passing: "Has some ideas.",
        excellent: "Twenty observed problems written down with repeats marked, and a client type chosen from the overlap of problem and ability to pay.",
      },
      {
        criterion: "Service design",
        passing: "Has one offer.",
        excellent: "Three distinct services at three prices that work together, including a small fixed product that gives first clients an easy way in.",
      },
      {
        criterion: "Pricing",
        passing: "Quotes a figure.",
        excellent: "A floor calculated from real cost — time, data, transport, tools — with the price set against value rather than hours.",
      },
      {
        criterion: "Portfolio",
        passing: "Has samples.",
        excellent: "A case study written as problem, action and result for a named real business, with three more pieces planned.",
      },
    ],
    faqs: [
      {
        q: "I have a skill but no clients. Where do I start?",
        a: "Start with problems you can see. Write down twenty from the past week, find the ones that repeat, and offer to solve one for a real local business at low cost in exchange for permission to show the work. Three real pieces with named results is a portfolio that sells.",
      },
      {
        q: "How much should I charge when I am just starting?",
        a: "Calculate what an hour genuinely costs you including data, transport and power, then quote above that. Start slightly below market to build evidence, and raise your prices with every few completed projects. Never compete on being the cheapest — it is a race you cannot win.",
      },
      {
        q: "Do I need to register a business name?",
        a: "Not to start. You can invoice as an individual while you build, and registering with the Corporate Affairs Commission becomes worth doing once you have regular clients who want a formal invoice or a business bank account. Do not let registration delay your first client.",
      },
      {
        q: "Should I specialise or offer everything?",
        a: "Specialise in your offer, not necessarily in your skills. 'Menu design for restaurants' is easier to sell than 'graphic design' because the buyer recognises themselves, and referrals follow specificity. You can widen later once one offer is working.",
      },
      {
        q: "What if nobody in my area can afford my prices?",
        a: "Then your market is wider than your area. Most Nigerian freelancers sell to clients in Lagos, Abuja and Port Harcourt, and increasingly abroad, regardless of where they live. Build the portfolio locally if you must, but sell where the money is.",
      },
    ],
  },

  "finding-clients-and-proposals": {
    summary:
      "The work exists; the problem is being found by it. This session covers where clients actually are, how to approach them ethically, how to understand what they really need, and how to write a proposal that wins work rather than joining a pile.",
    objectives: [
      "Find potential clients ethically through channels that actually convert",
      "Communicate professionally in first contact",
      "Ask questions that reveal the real requirement",
      "Write a proposal structured to win rather than to describe",
      "Quote confidently and handle the price conversation",
      "Follow up in a way that closes rather than annoys",
    ],
    blocks: [
      {
        heading: "Where clients actually are",
        body: [
          "Clients come from four routes, and they convert in a very different order. **People who already know you** — former classmates, colleagues, church members, family friends, past employers. This is where almost every freelancer's first three clients come from, because trust already exists and trust is most of the sale. Most people skip it out of embarrassment, which is a mistake: telling people what you now do is not begging, it is information they need.",
          "**Referrals** — clients sent by other clients. The highest-converting route there is, because the trust is transferred. It does not happen by accident; it happens when you finish work well and ask. **Direct approach** — contacting a business or organisation whose problem you can see. Lower conversion, but unlimited supply, and in Nigeria an in-person visit to a shop, office or church office still works better than any message.",
          "**Inbound** — people finding you through your content, your portfolio or a platform. Slowest to build and best long-term, because it produces clients who already want you rather than clients you had to persuade. The practical sequence for a beginner: work the people you know this week, start asking for referrals from the first completed job, make five direct approaches a week, and build inbound steadily in the background.",
        ],
      },
      {
        heading: "Approaching ethically and communicating well",
        body: [
          "Ethical client-finding means **offering value rather than extracting attention**. A cold message that says 'I noticed your price list is hard to read from the counter — I design menus for restaurants and I have an idea that would help. May I send you a quick example?' is an offer. 'Hello sir/ma, I am a graphic designer, please check my page and give me work' is a request, and it is ignored because it asks the reader to do all the work.",
          "The pattern that works: **notice something specific, offer something concrete, ask for a small next step**. Specificity proves you actually looked. A concrete offer gives them something to say yes to. A small next step — 'may I send a quick example?' — is easy to agree to, and once they say yes the conversation exists.",
          "Then the discipline of **professional communication**. Reply promptly, even if only to say you will come back with a proper answer. Write in complete sentences with correct spelling. Never over-promise a deadline to win a job. Never disparage another freelancer. Confirm agreements in writing, however informal the relationship. These are small things and they are most of what makes someone look professional, because clients judge reliability from the first three messages.",
        ],
      },
      {
        heading: "Understanding the real requirement",
        body: [
          "What a client asks for is rarely what they need. 'I need a new logo' usually means 'the business does not look established'. 'I need a website' often means 'people cannot find our prices'. 'I need someone to manage my Instagram' frequently means 'nobody is buying'. If you build exactly what was asked, you may deliver the wrong thing perfectly.",
          "So ask about the **outcome** before the deliverable. Five questions uncover almost everything: **What is the business trying to achieve in the next few months?** **What is happening now that is not working?** **Who is the customer?** **What has been tried already?** **What would make this project a success for you?** Their answers reveal whether the logo is the right solution at all, and they give you language for the proposal that is theirs rather than yours.",
          "Two things happen when you ask. You **learn the real problem**, which means your proposal can address it rather than the surface request. And you **demonstrate competence**, because almost nobody asks — most freelancers quote immediately from the brief, which signals they are order-takers. The one who asks five good questions is presumed to know more, and is usually right to be.",
        ],
      },
      {
        heading: "Writing the proposal",
        body: [
          "A proposal that wins has five parts and fits on one page. **The problem, in their words** — repeat back what they told you, because being understood is persuasive in a way no claim about yourself is. **What you will do**, as a specific list of deliverables, not as a description of your process. **The timeline**, with dates rather than durations. **The price**, stated clearly with what it includes and what it does not. **The next step** — what they do to start, usually a deposit.",
          "Two habits decide whether it is read. **Lead with them, not with you** — the biography and the list of tools belong at the bottom or nowhere, because the client is thinking about their problem, not your qualifications. And **be specific about exclusions**: 'This covers the menu design and two print-ready files. It does not include photography or printing costs.' Stating what is not included is what prevents the argument later, and clients respect it rather than resenting it.",
          "Then send it properly: a clean document, not a message; a clear subject line; a date; a validity period of two weeks, which creates a genuine reason to decide. Follow up once after three days with something useful rather than 'any update?' — an example of similar work, or a note on something you noticed. One useful follow-up closes jobs; five anxious ones lose them.",
        ],
      },
      {
        heading: "The price conversation and saying no",
        body: [
          "Quote the number and then **stop talking**. The most common way a freelancer loses money is explaining the price before the client has reacted — filling the silence with justification that invites negotiation. State the price, state what it includes, and wait.",
          "When it is challenged, do not discount first. Ask what they had in mind, then **change the scope rather than the price**: 'At ₦40,000 that is four graphics a month. If the budget is ₦25,000, I can do two a month.' This protects your rate, keeps the client, and teaches them that price follows scope — which is the most useful thing a client can learn about working with you.",
          "And **say no when you should**. A client who wants everything for nothing, argues about every deliverable, or pays late on the first small job will be worse on a big one. Turning down bad work is not lost income; it is protected time, and time is the only asset a freelancer cannot buy back. The rule that works: if a job feels wrong before it starts, it will be wrong while it runs.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor works a live pipeline: writing an ethical cold approach to a real business, running the discovery questions that reveal the real requirement, drafting a one-page proposal from the answers, then handling the price objection by changing scope rather than discounting.",
      steps: [
        {
          step: "Map the four client routes",
          detail:
            "Lay out people who know you, referrals, direct approach and inbound with their conversion order. Explain that almost every first client comes from the first route.",
        },
        {
          step: "List the people you know",
          detail:
            "Write twenty names of people who could refer work. Explain that telling people what you do is information they need rather than a request for charity.",
        },
        {
          step: "Choose a direct target",
          detail:
            "Pick a real business with a visible problem. Explain that a specific observation is what makes an approach credible.",
        },
        {
          step: "Write the cold approach",
          detail:
            "Draft notice, offer, small next step. Show the generic 'please give me work' version beside it and explain why it is ignored.",
        },
        {
          step: "Run the discovery questions",
          detail:
            "Ask what the business is trying to achieve, what is not working, who the customer is, what was tried and what success looks like.",
        },
        {
          step: "Identify the real requirement",
          detail:
            "Show how 'I need a logo' becomes 'the business does not look established'. Explain that building exactly what was asked can deliver the wrong thing perfectly.",
        },
        {
          step: "Use their language",
          detail:
            "Quote the client's own words back in the proposal draft. Explain that being understood persuades more than any claim about yourself.",
        },
        {
          step: "Draft the one-page proposal",
          detail:
            "Write problem, deliverables, timeline with dates, price with inclusions and exclusions, and the next step.",
        },
        {
          step: "State the exclusions",
          detail:
            "Write what the price does not cover. Explain that this prevents the later argument and that clients respect it rather than resenting it.",
        },
        {
          step: "Quote and stop",
          detail:
            "State the number, state what it includes, then stay silent. Explain that filling the silence with justification invites the negotiation you were trying to avoid.",
        },
        {
          step: "Handle the objection",
          detail:
            "Take 'it is too expensive' and change the scope rather than the price. Show how this protects the rate and teaches the client that price follows scope.",
        },
        {
          step: "Send and follow up once",
          detail:
            "Send a clean dated document with a two-week validity, then follow up in three days with something useful. Explain why one useful follow-up closes and five anxious ones lose.",
        },
      ],
    },
    practice: {
      title: "Build a pipeline and write a winning proposal",
      brief:
        "You list twenty people who could refer work, write three ethical cold approaches to real businesses with visible problems, run the five discovery questions on one, and write a one-page proposal from their answers with dates, a clear price, stated exclusions and a next step — then rehearse the price objection by changing scope.",
      steps: [
        "Write twenty names of people who already know you and could refer work.",
        "Send five of them a short, specific note about what you now do.",
        "Identify three real businesses with a problem you can see.",
        "For each, write the specific observation that opens the approach.",
        "Draft the approach as notice, concrete offer, small next step.",
        "Check that each approach offers value rather than asking for work.",
        "Run the five discovery questions on one of them.",
        "Write down what they actually need, which may differ from what they asked for.",
        "Draft a one-page proposal leading with their problem in their own words.",
        "List deliverables specifically, with dates rather than durations.",
        "State the price with what it includes and what it excludes.",
        "Add a validity period of two weeks and a clear next step.",
        "Send it as a clean document with a clear subject line, not as a message.",
        "Rehearse the price objection by changing scope rather than discounting.",
        "Write the one useful follow-up you will send after three days.",
      ],
      standard:
        "Twenty referral names with five contacted, three cold approaches each opening with a specific observation and ending in a small next step, five discovery questions actually asked with the real requirement written down separately from the request, and a one-page proposal leading with the client's problem in their words, listing dated deliverables, stating price with inclusions and exclusions, carrying a two-week validity and a clear next step — plus a rehearsed scope change instead of a discount and one useful follow-up drafted.",
    },
    pitfalls: [
      {
        problem: "You skip the people who already know you",
        fix: "List twenty names and tell five of them what you now do. Trust already exists with them and trust is most of the sale; almost every freelancer's first clients come from here.",
      },
      {
        problem: "Your approach asks for work instead of offering value",
        fix: "Notice something specific, offer something concrete, ask for a small next step. 'Please check my page and give me work' asks the reader to do all the work, so it is ignored.",
      },
      {
        problem: "You quote from the brief without asking questions",
        fix: "Ask five discovery questions first. Clients who ask for a logo often need to look established, and quoting immediately marks you as an order-taker rather than a professional.",
      },
      {
        problem: "Your proposal leads with your biography",
        fix: "Lead with their problem in their words. The client is thinking about their business, not your tools, and being understood persuades more than any list of qualifications.",
      },
      {
        problem: "You did not state exclusions",
        fix: "Write what the price does not cover. It prevents the later argument about photography or printing, and clients respect the clarity rather than resenting it.",
      },
      {
        problem: "You justify the price before they react",
        fix: "State the number, state what it includes, and wait. Filling the silence invites exactly the negotiation you were trying to avoid, and it signals you are unsure of the figure.",
      },
      {
        problem: "You discount when challenged",
        fix: "Change the scope instead: fewer deliverables at the lower budget. This protects your rate, keeps the client and teaches them that price follows scope.",
      },
      {
        problem: "You follow up five times with 'any update?'",
        fix: "Send one useful follow-up after three days — an example, an observation, a deadline. Repeated anxious follow-ups signal desperation and cost you the job.",
      },
    ],
    expertNotes: [
      "Work the people who already know you before any cold outreach. Trust is most of the sale and it already exists there; telling people what you now do is information they need, not a favour you are asking for.",
      "Ask five discovery questions before you quote, every time. They reveal whether the requested deliverable solves the real problem, and asking at all separates you from the freelancers who quote straight from the brief.",
      "Change scope rather than price when a client pushes back. It protects your rate, keeps the relationship and teaches the client the rule that will make every future conversation easier.",
      "Say no to work that feels wrong before it starts. A client who argues about every deliverable or pays late on a small job will be worse on a large one, and protected time is the only asset you cannot buy back.",
    ],
    vocabulary: [
      { term: "Pipeline", meaning: "The set of prospects at each stage: contacted, talking, proposed, won. Freelancing fails without one." },
      { term: "Referral", meaning: "A client sent by another client. The highest-converting source, and it must be asked for." },
      { term: "Cold approach", meaning: "Contacting a prospect who does not know you. Works when it offers something specific rather than asking for work." },
      { term: "Discovery questions", meaning: "The questions that reveal the real requirement before you quote. Asking them is itself a signal of competence." },
      { term: "Proposal", meaning: "A one-page document: their problem, your deliverables, dated timeline, price with exclusions, next step." },
      { term: "Exclusions", meaning: "What the price does not cover. Stating them prevents later disputes and reads as professional." },
      { term: "Scope change", meaning: "Adjusting deliverables instead of discounting when a budget is lower. Protects your rate." },
      { term: "Validity period", meaning: "How long a quote stands. Two weeks creates a genuine reason to decide." },
    ],
    homework: [
      {
        task: "List twenty referral names",
        detail:
          "People who already know you. Send five of them a short, specific note about what you now do and what kind of work you are taking on.",
      },
      {
        task: "Write three cold approaches",
        detail:
          "Each opening with a specific observation about a real business, offering something concrete, and asking for a small next step. No 'please give me work'.",
      },
      {
        task: "Ask five discovery questions",
        detail:
          "To a real prospect: what they are trying to achieve, what is not working, who the customer is, what has been tried, what success looks like. Write the answers verbatim.",
      },
      {
        task: "Write one one-page proposal",
        detail:
          "Their problem in their words, dated deliverables, price with inclusions and exclusions, two-week validity, clear next step. Send it as a clean document.",
      },
    ],
    rubric: [
      {
        criterion: "Prospecting",
        passing: "Knows where clients are.",
        excellent: "Twenty referral names with five contacted, three specific cold approaches drafted, and all four routes understood in order of conversion.",
      },
      {
        criterion: "Ethical approach",
        passing: "Sends messages.",
        excellent: "Every approach opens with a specific observation, offers something concrete and asks for a small next step rather than requesting work.",
      },
      {
        criterion: "Discovery",
        passing: "Takes the brief.",
        excellent: "Five questions asked, answers recorded verbatim, and the real requirement written down separately from what was requested.",
      },
      {
        criterion: "Proposal",
        passing: "Sends a price.",
        excellent: "A one-page document leading with the client's problem, dated deliverables, price with stated exclusions, a validity period and a clear next step.",
      },
      {
        criterion: "Negotiation",
        passing: "Quotes a figure.",
        excellent: "States the price and waits, changes scope rather than discounting when challenged, and declines work that feels wrong before it starts.",
      },
    ],
    faqs: [
      {
        q: "How do I get clients with no experience?",
        a: "Start with people who already know you — trust is most of the sale and it already exists. Then do three pieces for real local businesses at low cost in exchange for permission to show them, and ask every completed client for one referral. Three named case studies plus a referral habit is enough to start.",
      },
      {
        q: "Are freelancing platforms worth it?",
        a: "They are a starting point, not a destination. Competition is heavy and prices are pushed down, but they teach you to write proposals and they produce your first evidence. The aim is to move clients you meet there onto direct terms where the margin is real, and to build inbound so you are not dependent on a platform.",
      },
      {
        q: "What should I write in a cold message?",
        a: "Notice something specific, offer something concrete, ask for a small next step. One short paragraph, no attachments, no long biography. 'I noticed your price list is hard to read from the counter — may I send you a quick example?' outperforms any polished introduction.",
      },
      {
        q: "How do I handle 'it is too expensive'?",
        a: "Ask what they had in mind, then change the scope rather than the price: fewer deliverables at their budget. Discounting teaches clients that your first price was inflated; a scope change teaches them that price follows scope, which makes every future conversation easier.",
      },
      {
        q: "How often should I follow up on a proposal?",
        a: "Once, after three days, with something useful — an example of similar work or a note on something you noticed. If there is no reply after that, send one final note a week later and move on. Repeated 'any update?' messages signal desperation and cost you the job.",
      },
    ],
  },

  "delivering-professional-work": {
    summary:
      "Getting the job is half the work; delivering it well is what produces the next one. This session covers setting expectations, managing deadlines and revisions, communicating through problems, and handling complaints in a way that keeps the client.",
    objectives: [
      "Set expectations that protect both you and the client",
      "Manage deadlines honestly, including when you will miss one",
      "Control revisions so a job does not run forever",
      "Deliver work properly rather than just sending files",
      "Communicate professionally when things go wrong",
      "Handle a complaint so the relationship survives",
    ],
    blocks: [
      {
        heading: "Setting expectations",
        body: [
          "Most client problems are created before the work starts, by expectations that were never stated. The client assumed three revisions; you assumed one. They assumed the website included writing; you assumed it did not. They assumed delivery Friday; you meant Friday next week. None of this is anyone's fault — it is simply what happens when nobody writes it down.",
          "So state it before starting, in a short written note even for informal work. **What is included**: the exact deliverables, in what format, at what size or length. **What is not included**: photography, printing, copywriting, hosting, anything the client might reasonably assume. **How many revisions**, and what counts as one. **When each stage is delivered**, with dates. **How you communicate** and how fast you reply.",
          "That note is not bureaucracy; it is the cheapest insurance available. It takes ten minutes and it prevents the argument that costs you a day of unpaid work and a client. And it makes you look professional, because almost nobody does it — which means the client immediately understands that working with you is different from working with the last person.",
        ],
      },
      {
        heading: "Deadlines and honest timing",
        body: [
          "Estimate generously and then add more. Work takes longer than expected for reasons you cannot predict — a client who takes four days to reply, a font that will not licence, a machine that fails — and a deadline you cannot meet costs you far more than a longer one costs the client. The rule that works: **quote the deadline you are confident in, not the one that wins the job**.",
          "Then **build in checkpoints** rather than delivering everything at the end. Send an early draft or a first version at roughly a third of the way through. It catches a misunderstanding while it is cheap to fix, it reassures a client who has not heard from you, and it protects you: if the direction is wrong, you find out in two days rather than in two weeks.",
          "And when you are going to miss a deadline — which will happen — **tell them before it passes, not after**. 'I will not make Friday; I can deliver Tuesday' said on Thursday is a small inconvenience handled well. The same words said on Saturday are a broken promise. Clients forgive a delay far more readily than they forgive discovering a delay, and the difference is entirely about when you told them.",
        ],
      },
      {
        heading: "Revisions and scope",
        body: [
          "**Revisions** are changes to work you delivered; **scope creep** is new work presented as a small change. The line is not always obvious, which is exactly why it must be defined in advance. 'Change the blue to green' is a revision. 'Add a section about our new product line' is new work, however small it seems.",
          "Set a number — two rounds is standard — and define what a round is: **one consolidated list of changes**, not a stream of messages. That single definition solves most of the problem, because clients who send fifteen separate messages over three weeks are not being difficult; nobody told them how revisions work. Tell them, and most will happily collect their notes.",
          "Then handle the excess without conflict. 'That is outside the two rounds we agreed. I can do it for ₦8,000, or I can fold it into next month's work.' Stated plainly and early, this is normal business. Left unaddressed until the tenth unpaid change, it becomes resentment, and resentment is what ends freelance relationships — not the money.",
        ],
      },
      {
        heading: "Delivering properly",
        body: [
          "Delivery is not sending files. It is **making the work usable and the client confident**. Send the right formats — print-ready PDF as well as the editable file if agreed, images at the sizes they will actually be used, documents in a format they can open. Name the files sensibly: 'Menu-Final-A4-Print.pdf' rather than 'final_v3_REAL_final.pdf', because the client will look for it in three months.",
          "Then **explain what you delivered and how to use it**. A short note: what is in each file, what size each is for, how to send the print file to a printer, and what to do if something looks wrong. Clients who do not understand the deliverable cannot use it, and unused work produces no referral — however good it is.",
          "Finally, **ask for the two things that build the business**: a testimonial, in their words, about the problem you solved; and one referral — a name of someone else with a similar problem. Ask while satisfaction is highest, which is at delivery, not three weeks later. Most freelancers never ask, which is why most freelancers restart their pipeline from zero every month.",
        ],
      },
      {
        heading: "Complaints and difficult conversations",
        body: [
          "A complaint is not a disaster; it is information delivered badly. The response that works has three parts and must happen in order. **Acknowledge** — say you understand and you take it seriously, without arguing about whether they are right. **Establish the facts** — what was agreed, what was delivered, what is missing or wrong. **Propose a fix** — a specific action with a date.",
          "The instinct to defend yourself is strong and almost always counter-productive. Even when the client is factually wrong, arguing first makes the conversation about winning rather than about solving, and a client who feels unheard escalates. Acknowledge first, establish facts second, and very often the disagreement resolves itself once they feel taken seriously.",
          "Where you are genuinely at fault, **say so plainly and fix it**. 'I delivered late and that caused you a problem. I have reduced the fee by ₦10,000 and the final files are attached.' An owned mistake with a concrete remedy usually strengthens the relationship, because the client learns what happens when you get it wrong — and the answer being 'they fix it and make it right' is worth more than never having erred. What destroys a reputation is not a mistake; it is a mistake handled dishonestly.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor takes one real job through delivery: the expectations note written before work starts, an early checkpoint that catches a misunderstanding, a revision request separated from scope creep, a proper handover with named files and usage notes, and a complaint handled in the correct order.",
      steps: [
        {
          step: "Write the expectations note",
          detail:
            "Draft what is included, what is not, revision count, delivery dates and reply times. Explain that most client problems are created before the work starts.",
        },
        {
          step: "Send it for confirmation",
          detail:
            "Ask the client to confirm in one line. Explain that a written 'yes' is what prevents the argument that costs a day of unpaid work.",
        },
        {
          step: "Quote the deadline generously",
          detail:
            "Add contingency to the honest estimate. Explain that a missed deadline costs far more than a longer one, and that the deadline should not be chosen to win the job.",
        },
        {
          step: "Set the checkpoint",
          detail:
            "Agree to send a first version at a third of the way through. Explain that it catches a misunderstanding while it is still cheap to fix.",
        },
        {
          step: "Deliver the checkpoint",
          detail:
            "Send the early draft and ask for direction. Show a misunderstanding surfacing now rather than at the end.",
        },
        {
          step: "Define a revision round",
          detail:
            "Explain that a round is one consolidated list, not a stream of messages. Show how telling the client this solves most revision problems.",
        },
        {
          step: "Separate revision from scope",
          detail:
            "Take a request to add a new section and identify it as new work. Explain that the line must be defined in advance because it is not always obvious.",
        },
        {
          step: "Quote the extra work",
          detail:
            "Offer it at a price or folded into next month. Explain that stated early this is normal business, and left unaddressed it becomes resentment.",
        },
        {
          step: "Name the files properly",
          detail:
            "Rename deliverables descriptively and explain that the client will search for them in three months, when 'final_v3_REAL' means nothing.",
        },
        {
          step: "Write the handover note",
          detail:
            "Explain what each file is, what size it is for and how to use it. Explain that unused work produces no referral however good it is.",
        },
        {
          step: "Ask for the testimonial and referral",
          detail:
            "Ask at delivery while satisfaction is highest. Explain that most freelancers never ask, which is why their pipeline restarts from zero monthly.",
        },
        {
          step: "Handle a complaint",
          detail:
            "Take a real complaint through acknowledge, establish facts, propose a fix. Show the defensive response beside it and explain why it escalates.",
        },
      ],
    },
    practice: {
      title: "Run one job professionally end to end",
      brief:
        "You take a real job — paid, low-cost or for a local business — and run it with full professional discipline: a written expectations note confirmed before work starts, a checkpoint at a third, revision rounds defined and enforced, a proper handover with named files and usage notes, and a testimonial and referral requested at delivery.",
      steps: [
        "Write the expectations note: included, excluded, revision count, dates, reply times.",
        "Send it and get a one-line written confirmation before starting.",
        "Quote a deadline with contingency rather than the one that wins the job.",
        "Agree a checkpoint at roughly a third of the way through.",
        "Deliver the checkpoint and ask for direction on it.",
        "Record what the checkpoint revealed that would otherwise have surfaced late.",
        "Define a revision round as one consolidated list and tell the client.",
        "Collect the client's changes into a single list before acting.",
        "Identify any request that is new work rather than a revision.",
        "Quote the new work at a price or fold it into a future period.",
        "Name every deliverable file descriptively.",
        "Write the handover note: what each file is, what it is for, how to use it.",
        "Ask for a testimonial in the client's own words about the problem you solved.",
        "Ask for one referral — a name of someone with a similar problem.",
        "Write down what you will do differently on the next job.",
      ],
      standard:
        "A written expectations note confirmed before work began, a checkpoint delivered at a third that surfaced something early, revision rounds defined as consolidated lists and enforced, new work identified and quoted rather than absorbed, every file named descriptively, a handover note explaining each deliverable and its use, and both a testimonial and one referral requested at delivery, plus one written improvement for the next job.",
    },
    pitfalls: [
      {
        problem: "You started work without stating expectations",
        fix: "Write what is included, what is not, revision count and dates, and get a one-line confirmation. Most client problems are created before the work starts by assumptions nobody checked.",
      },
      {
        problem: "You quoted the deadline that wins the job",
        fix: "Quote the one you are confident in, with contingency. A missed deadline costs you the relationship and often the fee; a longer one costs the client almost nothing.",
      },
      {
        problem: "You told the client about the delay after the deadline",
        fix: "Tell them before it passes. A delay announced early is an inconvenience handled well; the same delay discovered late is a broken promise, and the difference is only timing.",
      },
      {
        problem: "You accepted unlimited revisions",
        fix: "Set two rounds and define a round as one consolidated list. Clients who send fifteen messages are not being difficult — nobody told them how revisions work.",
      },
      {
        problem: "You absorbed scope creep until you resented the client",
        fix: "Quote new work early and plainly. Stated at the second extra request it is normal business; left until the tenth it becomes resentment, which is what ends relationships.",
      },
      {
        problem: "You sent files with no explanation",
        fix: "Deliver with a handover note explaining what each file is and how to use it. Clients who cannot use the work cannot benefit from it, and unused work produces no referral.",
      },
      {
        problem: "You never asked for a testimonial or referral",
        fix: "Ask at delivery, while satisfaction is highest. Most freelancers never ask, which is why they restart their pipeline from zero every month.",
      },
      {
        problem: "You defended yourself before acknowledging the complaint",
        fix: "Acknowledge first, establish facts second, propose a fix third. Arguing about who is right makes it about winning, and a client who feels unheard escalates.",
      },
    ],
    expertNotes: [
      "Write the expectations note for every job, even informal ones. Ten minutes of writing prevents the argument that costs a day of unpaid work, and it makes you look professional because almost nobody else does it.",
      "Deliver a checkpoint at a third of the way through, every time. It catches misunderstanding while correction is cheap, reassures a client who has not heard from you, and protects you from discovering the wrong direction at the end.",
      "Tell a client about a delay before the deadline passes. Clients forgive delays far more readily than they forgive discovering them, and the entire difference is when you said so.",
      "Ask for a testimonial and one referral at delivery, not weeks later. It is the single highest-return habit in freelancing, and the reason most freelancers have an unreliable pipeline is simply that they never ask.",
    ],
    vocabulary: [
      { term: "Expectations note", meaning: "A short written statement of inclusions, exclusions, revisions and dates, confirmed before work starts." },
      { term: "Checkpoint", meaning: "An early draft delivered at roughly a third of the way through. Catches misunderstanding while correction is cheap." },
      { term: "Revision round", meaning: "One consolidated list of changes. Distinct from a stream of messages, which is what makes jobs run forever." },
      { term: "Scope creep", meaning: "New work presented as a small change. Defined in advance or it consumes the profit." },
      { term: "Deliverable", meaning: "The specific thing handed over, in a named format at a stated size. Vague deliverables cause disputes." },
      { term: "Handover note", meaning: "An explanation of what was delivered and how to use it. Unused work produces no referral." },
      { term: "Testimonial", meaning: "A client's own words about the problem you solved. Requested at delivery while satisfaction is highest." },
      { term: "Escalation", meaning: "A disagreement growing because someone felt unheard. Prevented by acknowledging before defending." },
    ],
    homework: [
      {
        task: "Write your standard expectations note",
        detail:
          "One reusable template covering inclusions, exclusions, revision count and definition, delivery dates, reply times and payment terms. Use it on every job from now on.",
      },
      {
        task: "Run one job with a checkpoint",
        detail:
          "Deliver a first version at a third of the way through and record what it surfaced. Note how much cheaper the correction was than it would have been at the end.",
      },
      {
        task: "Write your revision policy",
        detail:
          "Two rounds, each a consolidated list, with a stated price for additional rounds or new work. Send it to your current client if you have one.",
      },
      {
        task: "Ask for a testimonial and a referral",
        detail:
          "From your most recent completed client, in their own words, plus one name of someone with a similar problem. Do it today, not when it feels more convenient.",
      },
    ],
    rubric: [
      {
        criterion: "Expectations",
        passing: "Agrees verbally.",
        excellent: "A written note covering inclusions, exclusions, revision count, dates and reply times, confirmed in writing before work starts.",
      },
      {
        criterion: "Deadline management",
        passing: "Delivers on time.",
        excellent: "Deadlines quoted with contingency rather than to win the job, checkpoints at a third, and any delay communicated before the deadline passes.",
      },
      {
        criterion: "Revision control",
        passing: "Makes changes.",
        excellent: "A defined number of rounds, each a consolidated list, with new work identified and quoted rather than absorbed into resentment.",
      },
      {
        criterion: "Delivery",
        passing: "Sends files.",
        excellent: "Correct formats, descriptively named files, and a handover note explaining what each is for and how to use it.",
      },
      {
        criterion: "Difficult conversations",
        passing: "Responds politely.",
        excellent: "Acknowledge, establish facts, propose a fix — in that order — with faults owned plainly and a concrete remedy offered.",
      },
    ],
    faqs: [
      {
        q: "How many revisions should I allow?",
        a: "Two rounds is standard, with each round defined as one consolidated list of changes rather than a stream of messages. Additional rounds or genuinely new work are quoted separately. Telling the client how revisions work solves most of the problem before it starts.",
      },
      {
        q: "What if the client keeps asking for small changes?",
        a: "Separate revisions from new work and say so early: 'Change the colour is within our two rounds; adding a new product section is new work — I can do it for ₦8,000.' Stated at the second request it reads as normal business; left until the tenth it becomes resentment.",
      },
      {
        q: "I am going to miss a deadline. What do I do?",
        a: "Tell them before it passes, with a specific new date. A delay announced on Thursday is an inconvenience handled well; the same delay discovered on Saturday is a broken promise. Clients forgive delays far more readily than they forgive discovering them.",
      },
      {
        q: "How do I handle an angry client?",
        a: "Acknowledge first, establish facts second, propose a fix third. Do not defend yourself before they feel heard, because that turns it into an argument about winning. If you are at fault, say so plainly and offer a concrete remedy — that usually strengthens the relationship.",
      },
      {
        q: "Should I give clients the editable source files?",
        a: "Only if it was agreed and paid for, and say so in the expectations note. Handing over source files means the client no longer needs you for changes, which is fine if that is the deal you priced. If ongoing work is the plan, deliver final formats and keep the source.",
      },
    ],
  },
};
