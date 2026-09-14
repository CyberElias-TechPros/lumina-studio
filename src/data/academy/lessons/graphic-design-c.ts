import type { SessionLecture } from "../types";

/**
 * Graphic Design — ₦20,000 · 4 weeks · 8 sessions.
 * Sessions 7 and 8. (Sessions 1–3 in graphic-design.ts, 4–6 in graphic-design-b.ts.)
 */
export const graphicDesignLessonsC: Record<string, SessionLecture> = {
  "professional-workflow": {
    summary:
      "The difference between someone who can design and someone who runs a design service is workflow. This session covers the whole professional loop: taking a brief, quoting, presenting work, handling revisions without losing profit, delivering files properly, and the pricing judgement that decides whether the work is worth doing.",
    objectives: [
      "Take a brief that prevents most revision rounds before they happen",
      "Quote a job accurately and explain the quote to a client",
      "Present work so the conversation is about direction rather than taste",
      "Handle revisions with a stated limit and a professional method",
      "Deliver a complete, correctly organised file package",
      "Price design work in the Nigerian market without underselling or overreaching",
    ],
    blocks: [
      {
        heading: "The brief: where profit is won or lost",
        body: [
          "Most design jobs go wrong before the first element is placed, because nobody established what the work was for. A brief is not a formality — it is the document that decides whether a job takes two hours or twenty. The questions that matter: **who is this for** — which specific person, not 'everyone'; **what should they do** after seeing it — call, register, buy, visit; **what is the one message**, if they only take one thing away; **what already exists** — logo, colours, previous materials; **what does the client like and dislike**, with examples; and **what are the practical constraints** — deadline, print quantity, budget range, who approves the final.",
          "Ask these in writing and get written answers. This protects both sides: it forces the client to think, which usually reveals they have not decided, and it gives you a reference when someone later says 'that is not what I wanted'. A five-minute WhatsApp exchange covering these six questions will eliminate more revision rounds than any amount of design skill. Professionals do this without embarrassment, and clients respect it — it reads as competence rather than bureaucracy.",
          "One more question that is worth more than the rest: **what does success look like?** If the answer is 'more customers call', you know the phone number must dominate. If it is 'people know we exist', the logo and name dominate. The design follows from the answer, and without it you are guessing.",
        ],
      },
      {
        heading: "Quoting and pricing in the Nigerian market",
        body: [
          "Price the outcome, not the hours — but calculate from the hours so you know your floor. Work out how long the job will realistically take including revisions, decide the minimum you will accept for that time, and quote above it. Then adjust for value: a design that will be printed five hundred times and seen by thousands is worth more than one seen by twenty people, even if it takes the same time. This is the difference between charging ₦5,000 forever and charging properly.",
          "Rough Nigerian market ranges to orient you, understanding that Lagos and Abuja sit higher and that reputation moves these substantially: a single social media design from a beginner might be a few thousand naira; the same from someone with a portfolio and a brand system commands several times that. A flyer is similar. A business card design is usually a small fee on its own but is far more valuable sold inside a brand package. A full brand kit — logo in three variants, palette, typefaces, tone, usage rules, delivered as a document — is a genuinely different product and should be priced as one, commonly an order of magnitude above a single flyer.",
          "Three pricing habits that protect you. **Quote per deliverable with a stated revision limit** — 'one flyer, two revision rounds included' — rather than an open-ended fee. **Take a deposit before starting**, commonly half, especially for new clients; a client who will not pay a deposit is telling you something. And **never quote a rush job at the normal rate**; same-day work is worth a premium and saying so is professional, not greedy.",
        ],
      },
      {
        heading: "Presenting work so revisions stay productive",
        body: [
          "How you present determines what kind of feedback you get. Send a bare image with no words and you invite 'make it nicer', which is unactionable and can go on forever. Present with a short rationale — two or three sentences explaining the decision behind the main choices, tied back to the brief — and the conversation becomes about whether the reasoning holds, which is answerable.",
          "The structure that works: state the goal from the brief in one line; show the design; give the rationale in two or three sentences referencing that goal; then ask a **specific** question. 'The headline is largest because the brief said registrations are the goal — does that match what you had in mind?' beats 'what do you think?'. Where you have a genuine choice, present **two options with a one-line rationale each** and a recommendation. This gives the client agency without opening an unlimited field, and it prevents the common disaster of a client requesting a direction, seeing it, and preferring the original.",
          "Show work in context where you can. A flyer mock-up on a table, a logo on a shop sign, a social post in a phone frame — context helps a client judge, and it also makes the work look more finished and considered. It takes two minutes in Canva and it consistently produces faster approvals.",
        ],
      },
      {
        heading: "Revisions: the limit that keeps you profitable",
        body: [
          "Unlimited revisions are how design jobs become unprofitable, and the fix is agreed before work starts, not negotiated afterwards. State in the quote that a set number of rounds is included — two is standard — and what an additional round costs. This is not stinginess; it is what makes a fixed price possible at all. Clients accept it readily when it is stated up front, and it changes their behaviour: knowing rounds are limited makes them collect their feedback properly instead of sending five messages over a week.",
          "Within a round, **collect all feedback at once** rather than accepting it piecemeal. Ask the client to gather their comments and send them together, and treat that batch as one round. When feedback is vague — 'it does not feel right' — ask a diagnostic question rather than guessing: is it the colour, the layout, or the tone? Vague feedback answered by guessing produces three more rounds; vague feedback answered by a question usually resolves in one message.",
          "And hold the line professionally. When a client asks for something outside the agreed scope — a fourth format, an extra post, a new logo — the correct response is not refusal and not silence; it is 'that is outside what we agreed, and I can do it for X'. This one sentence converts scope creep into income and clients respect it far more than quiet resentment.",
        ],
      },
      {
        heading: "Delivery and the professional file package",
        body: [
          "Deliver completely or the job is not finished. A standard package contains: the **print-ready PDFs** with bleed and crop marks for anything that will be printed; **PNG exports at full resolution** for every screen piece; the **editable source** where you have agreed to provide it — a Canva template link is the practical answer for most small clients, and whether you hand it over is a commercial decision to make deliberately, not by accident; **brand assets** where relevant — the logo in full colour, single colour and reversed, at high resolution; and a short **note** stating what each file is for.",
          "That note is what separates professional delivery from dropping files in a WhatsApp chat. Three or four lines: what is attached, what each file is for, the specs used, and anything the client needs to know — 'send the PDF to your printer, use the PNGs for Instagram, the logo files are for your sign writer'. It takes five minutes, it prevents a dozen follow-up questions, and it is the last thing the client reads, so it shapes how the whole job is remembered.",
          "Name files so a stranger could understand them: `2026-09-27_AdeBakery_Flyer-A5_PRINT.pdf`, not `final final v3.pdf`. Organise into folders by client and project and keep every project's source, because clients return months later asking for a change and being able to open the original in a minute is the difference between a repeat customer and a lost one.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor runs the whole professional loop on one real job — brief, quote, two presented directions, a revision round, and final delivery — showing the actual messages a client would receive.",
      steps: [
        {
          step: "Write the brief questions",
          detail:
            "Draft the six-question brief for a real client and send it as a message. Explain that the written exchange is what prevents revision rounds later.",
        },
        {
          step: "Read the answers and find the real goal",
          detail:
            "Show that the client's stated request and their actual goal differ, and that the design must serve the goal. Ask the success question out loud.",
        },
        {
          step: "Calculate the quote",
          detail:
            "Estimate hours including revisions, set a floor, adjust for how widely the piece will be seen, and write the quote with a stated deliverable and revision limit.",
        },
        {
          step: "State the terms",
          detail:
            "Show the deposit request and the wording for additional rounds. Explain why stating terms up front reads as competence rather than suspicion.",
        },
        {
          step: "Design two directions",
          detail:
            "Produce two genuinely different directions from the same brief — one conservative, one bolder — rather than two variations of the same idea.",
        },
        {
          step: "Present with rationale",
          detail:
            "Write the actual presentation message: goal in one line, the two options, a one-line rationale each, a recommendation, and one specific question.",
        },
        {
          step: "Show in context",
          detail:
            "Mock the flyer up on a table and the logo on a sign. Explain that context helps the client judge and speeds approval.",
        },
        {
          step: "Receive vague feedback",
          detail:
            "Handle 'it does not feel right' with a diagnostic question rather than a guess, and show how quickly that resolves.",
        },
        {
          step: "Collect a full revision round",
          detail:
            "Ask for all comments at once, apply them as one batch, and mark the round as used. Explain how this changes client behaviour.",
        },
        {
          step: "Handle scope creep",
          detail:
            "Respond to a request for an extra format with 'that is outside what we agreed, I can do it for X'. Show that this converts creep into income.",
        },
        {
          step: "Assemble the delivery package",
          detail:
            "Gather print PDFs, screen PNGs, logo variants and source link into a named folder structure. Show the file naming convention.",
        },
        {
          step: "Write the delivery note",
          detail:
            "Write the four-line note explaining each file. Explain that this is the last thing the client reads and it shapes how the job is remembered.",
        },
      ],
    },
    practice: {
      title: "Run one job end to end, professionally",
      brief:
        "You take a real or simulated client through the complete loop: written brief, costed quote with terms, two presented directions with rationale, one collected revision round, and a full delivery package with a note. Every client-facing message is written out.",
      steps: [
        "Send the six-question brief in writing and record the answers.",
        "Write one line stating the client's real goal and what success looks like.",
        "Estimate the hours including revisions and set your minimum acceptable fee.",
        "Write the quote: deliverables, revision limit, deposit, timeline, additional-round rate.",
        "Produce two genuinely different design directions from the same brief.",
        "Write the presentation message with rationale, a recommendation and one specific question.",
        "Mock up at least one direction in context.",
        "Handle one piece of vague feedback with a diagnostic question rather than a guess.",
        "Collect all remaining feedback at once and apply it as a single round.",
        "Respond to one out-of-scope request with a priced offer rather than silence.",
        "Assemble print PDFs, screen PNGs, logo variants and source into a named folder.",
        "Write the four-line delivery note explaining each file and its use.",
      ],
      standard:
        "A written brief with recorded answers, a costed quote with stated terms and revision limit, two distinct directions each with a rationale, one collected revision round, a complete named file package, and a delivery note — every client-facing message written out and professional in tone.",
    },
    pitfalls: [
      {
        problem: "You started designing without a written brief",
        fix: "Send the six questions first. Most revision rounds come from an undecided client, and a five-minute written exchange surfaces that before you invest hours rather than after.",
      },
      {
        problem: "You quoted an open-ended fee and revisions never stopped",
        fix: "Quote per deliverable with a stated revision limit and a rate for additional rounds, agreed before work starts. Clients accept this readily when it is stated up front.",
      },
      {
        problem: "You sent a bare image and asked what they thought",
        fix: "Present with a two- or three-sentence rationale tied to the brief and one specific question. 'Make it nicer' is what you get when you give the client nothing to respond to.",
      },
      {
        problem: "You accepted feedback one message at a time",
        fix: "Ask for all comments at once and treat the batch as one round. Piecemeal feedback turns two rounds into ten and destroys the profitability of a fixed price.",
      },
      {
        problem: "You did extra work for free because it felt awkward to charge",
        fix: "Say 'that is outside what we agreed, I can do it for X'. Clients respect the boundary more than the favour, and silent resentment is worse for the relationship than an honest price.",
      },
      {
        problem: "You delivered loose files with no note",
        fix: "Assemble a named package with print PDFs, screen PNGs, logo variants and a four-line note. Delivery is the last thing a client experiences and it decides whether they return.",
      },
      {
        problem: "You started work with no deposit from a new client",
        fix: "Ask for half up front. A client unwilling to pay a deposit is giving you real information, and chasing payment after delivery is the least profitable work in this business.",
      },
    ],
    expertNotes: [
      "Keep a brief template and reuse it verbatim. Having the six questions already written means you send them every time rather than only when you remember, and consistency is what turns a one-off client into a repeat one.",
      "Write down your rate card and keep it updated. Designers who quote from a written list charge more and negotiate less than those who invent a number each time, because the number arrives with confidence attached.",
      "Never delete a project source. Clients return after six months asking for one word changed, and being able to do it in two minutes — for a fee — is both profitable and the strongest form of client retention there is.",
      "Track every job's quoted hours against actual hours. After ten jobs you will know exactly where your estimates are wrong, which is usually revisions, and accurate estimating is the single largest improvement available to your income.",
    ],
    vocabulary: [
      { term: "Brief", meaning: "The written record of who the work is for, what the viewer should do, the one message, existing assets, preferences and constraints." },
      { term: "Revision round", meaning: "One collected batch of client feedback and the changes made from it. Stated limits on these are what make fixed pricing possible." },
      { term: "Scope creep", meaning: "Work requested beyond the agreed deliverables. Handle it with a priced offer, not silence." },
      { term: "Deposit", meaning: "Payment taken before work starts, commonly half. Standard practice with new clients." },
      { term: "Presentation rationale", meaning: "The two or three sentences explaining your design decisions by reference to the brief. It converts feedback from taste into direction." },
      { term: "Mock-up", meaning: "The design shown in context — on a table, a sign, a phone. Helps clients judge and speeds approval." },
      { term: "Delivery package", meaning: "Print PDFs, screen PNGs, brand assets and source, named clearly and accompanied by a note." },
      { term: "Rate card", meaning: "Your written list of prices per deliverable. Quoting from it raises fees and reduces negotiation." },
    ],
    homework: [
      {
        task: "Write your brief template",
        detail:
          "Draft the six questions in a message you can copy and send. Add the success question. Use it on the next real enquiry, however small.",
      },
      {
        task: "Write your rate card",
        detail:
          "Price a social design, a flyer, a business card, a five-piece campaign and a full brand kit. Estimate the hours for each first, then set the price from value rather than from hours.",
      },
      {
        task: "Practise the presentation message",
        detail:
          "Take one of your existing designs and write the full presentation: goal, rationale, recommendation, one specific question. Send it to a friend and see what feedback comes back.",
      },
      {
        task: "Assemble a delivery package properly",
        detail:
          "Take your best piece and build the complete package with named files and a four-line note. This becomes the standard you deliver on every future job.",
      },
    ],
    rubric: [
      {
        criterion: "Briefing",
        passing: "Asks the client what they want.",
        excellent: "Sends a written brief covering audience, action, message, assets, preferences and constraints, and records the answers.",
      },
      {
        criterion: "Commercial judgement",
        passing: "Names a price.",
        excellent: "Quotes from estimated hours adjusted for value, with stated deliverables, revision limit, deposit and additional-round rate.",
      },
      {
        criterion: "Presentation",
        passing: "Shows the work.",
        excellent: "Presents two distinct directions with rationale, a recommendation and a specific question, at least one shown in context.",
      },
      {
        criterion: "Revision handling",
        passing: "Makes the requested changes.",
        excellent: "Collects feedback in batches, diagnoses vague feedback with a question, and prices out-of-scope requests rather than absorbing them.",
      },
      {
        criterion: "Delivery",
        passing: "Sends the finished files.",
        excellent: "A complete named package with print and screen versions, brand assets and a note explaining each file's use.",
      },
    ],
    faqs: [
      {
        q: "How much should I charge as a beginner in Nigeria?",
        a: "Charge enough that the job is worth your time after revisions, and be honest that you are building a portfolio. The common mistake is charging so little that clients assume the work is weak — a very low price signals low quality as reliably as a high one signals confidence. Session four of Business & Freelancing covers pricing strategy in depth.",
      },
      {
        q: "Should I give the client the Canva source file?",
        a: "It is a commercial decision, not a technical one. Giving a template link lets them make small changes themselves, which some clients value and which reduces trivial requests; keeping it means future changes come back to you for a fee. State your policy in the quote rather than deciding under pressure at delivery.",
      },
      {
        q: "How do I handle a client who will not pay?",
        a: "This is why deposits exist. Take half up front on every new client, deliver final files only after the balance is settled, and keep watermarked previews for approval stages. Chasing payment after full delivery is the least profitable activity in this business.",
      },
      {
        q: "What if the client rejects everything?",
        a: "Return to the brief. If the design does not match the stated goal, that is a design problem; if it matches and they still dislike it, the brief was wrong and you revisit it together. Having the brief in writing makes this conversation constructive rather than personal.",
      },
      {
        q: "How do I get clients as a beginner with no portfolio?",
        a: "Do real work for one organisation you already have a relationship with — a church, a school, a shop — at a nominal rate, in exchange for permission to show it. One real before-and-after beats any claim. Then use that piece to approach the next. Business & Freelancing covers this properly.",
      },
    ],
  },

  "mini-brand-package": {
    summary:
      "The final Graphic Design project: a complete brand package for a real business, delivered to a professional standard and presented as a portfolio piece. It brings together every session — principles, colour and type, Canva craft, brand kit, campaign production, print specs and professional workflow — into one deliverable you can show a client.",
    objectives: [
      "Plan and scope a complete brand package from a real brief",
      "Produce a logo, brand kit, print pieces and a social campaign from one system",
      "Prepare every piece print-ready with correct bleed, margins and resolution",
      "Present the package as a coherent case study with rationale",
      "Assemble a portfolio piece that demonstrates competence without explanation",
      "Identify your next step in design and in earning from it",
    ],
    blocks: [
      {
        heading: "Scoping the package",
        body: [
          "A mini brand package has a fixed shape, and fixing it is what makes it deliverable in the time available. It contains: a **logo** in three variants — full colour, single colour, reversed; a **brand kit document** covering palette with hex codes, typefaces with weights, tone of voice and usage rules; **two print pieces** — a business card and an A5 flyer, both with 3mm bleed; and **three social pieces** — two feed posts and one story, all from the same system. Nine deliverables, one system, one client.",
          "Scope it against a real brief, not an imagined one. Choose a business you can actually ask questions of — a shop, a salon, a church, a school, a food seller — because a real brief produces real constraints and real constraints produce better work than invented ones. Send the six-question brief from session seven and use the written answers. If no real client is available, invent one with the same rigour: a name, a product, a location, a customer, a price point and a goal. The discipline matters more than the client.",
          "Then plan the order. Brief first, then the goal in one line, then palette and typeface together, then the logo, then the kit document, then the print pieces, then the social set. Working in that order prevents the common disaster of designing a flyer before the palette exists and having to rebuild it later.",
        ],
      },
      {
        heading: "Building the system before the pieces",
        body: [
          "The system is the palette with named roles, the two typefaces with specific weights, the type scale, the logo and its clear space, and the image treatment — the brightness, contrast and saturation adjustment you will apply to every photograph. Write it down before making a single piece. Every subsequent decision then becomes an application rather than an invention, which is both faster and more consistent.",
          "Build the **reusable components** at this stage too: a call-to-action button, a social handle bar, a section header with a divider, a photo frame with a caption. Group each in Canva and keep them in one file. Across nine deliverables these components will be used dozens of times, and building them once is the difference between finishing on time and finishing late.",
          "Set up your **print templates** simultaneously: A5 at 154×216mm and a business card at 91×61mm, each with 3mm bleed, trim guides and 5mm safe-area guides marked. Having these ready means no piece is ever built at the wrong dimensions, which is the mistake that costs an entire print run.",
        ],
      },
      {
        heading: "Producing the nine deliverables",
        body: [
          "Work through them in dependency order. The **logo** comes first because everything else uses it; test it at 32 pixels before moving on, and produce the single-colour and reversed variants while you are in the file. The **brand kit document** comes second — a two- or three-page PDF holding the logo variants, the palette with hex codes, the typefaces with sample text, the tone, and a page of correct and incorrect usage examples. Building it here rather than at the end means it documents decisions while they are fresh.",
          "Then the **print pieces**. The business card holds name, role, one contact route and logo — nothing more — on 300gsm stock. The A5 flyer follows the five-element structure from session five: headline, primary detail, image, call to action, identity, with the background extended into the bleed and all text 5mm inside trim. Export both as PDF Print with crop marks and bleed, and check the pixel dimensions before moving on.",
          "Finally the **social set**. Design the first feed post completely at 1080×1350, establishing the layout, colour proportions and image treatment; then duplicate the page for the second and change only the content. Adapt to 1080×1920 for the story, keeping text in the middle third so the platform interface does not cover it. Export as PNG at full resolution, send one to yourself through WhatsApp to check compression, and adjust if the type does not survive.",
        ],
      },
      {
        heading: "Presenting it as a case study",
        body: [
          "The package is worth more as a presented case study than as nine loose files, and the presentation is quick to assemble. Structure it in five parts: **the brief** — who the business is and what the work was for, in three lines; **the goal** — the one thing the viewer should do, in one line; **the system** — palette, typefaces, logo, with a sentence on why each was chosen; **the work** — all nine pieces shown clearly, with the print pieces shown in context; and **the result** — what the client said or, if the work is unsolicited, what you would expect it to achieve.",
          "Presenting the reasoning is what makes it persuasive. Anyone can produce nine images; showing that the palette temperature was chosen because the business sells food, that the wordmark was chosen because it survives at profile-picture size, and that the flyer carries five elements because it has three seconds — that demonstrates judgement, which is what a client actually hires. Keep each rationale to one sentence. Long explanations read as insecurity; short ones read as command.",
          "This case study becomes your portfolio. Publish it as a PDF you can attach to any enquiry, and post selected pieces to your own social accounts with the reasoning in the caption. In this market, a designer who can show one complete, reasoned brand package is immediately distinguishable from the large number who can show only isolated pretty images.",
        ],
      },
      {
        heading: "What comes next",
        body: [
          "The honest position after four weeks: you can produce professional design work for the market that makes up most paid design in Nigeria — brand basics, flyers, social content and print. What you cannot yet do is complex vector illustration, motion graphics, packaging dielines or interface design, and pretending otherwise to a client is how reputations are lost. Say what you do well and refer what you do not; that is professional, and it protects the work you did do.",
          "The natural next steps branch. **Business & Freelancing** is the most valuable immediate follow-on, because the constraint for most new designers is not skill but clients and pricing. **Web Design** extends your visual thinking into an interface medium where the same hierarchy and type skills transfer directly and the fees are higher. **Content Creation** pairs naturally with design, because a designer who can also shoot and edit becomes a one-person content service — which is what most small businesses actually want to hire.",
          "Whichever you choose, the compounding asset is the portfolio. Every real job adds a case study, and case studies are what allow you to raise prices. Designers in this market rarely fail from lack of ability; they fail from invisible work. Publish consistently, keep the sources, and let the accumulation do what advertising cannot.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor walks through a completed brand package as a case study — showing the brief, the system decisions, all nine deliverables in context, and the assembled portfolio PDF — then runs the class's work through the same review.",
      steps: [
        {
          step: "Show the brief and the goal",
          detail:
            "Display the written brief answers and the one-line goal. Explain that every decision downstream traces back to these two things.",
        },
        {
          step: "Show the system decisions",
          detail:
            "Present palette, typefaces and logo with a one-sentence rationale each. Emphasise that short rationales read as command while long ones read as insecurity.",
        },
        {
          step: "Review the logo at 32 pixels",
          detail:
            "Show all three variants and the profile-picture test. Explain why the single-colour version is a required deliverable rather than a bonus.",
        },
        {
          step: "Walk the brand kit document",
          detail:
            "Show the palette with hex codes, the typefaces with sample text, the tone, and the correct and incorrect usage page.",
        },
        {
          step: "Check the print pieces",
          detail:
            "Inspect the card and flyer for bleed, safe margins and resolution. Show the PDF Print settings and the pixel dimensions of the exports.",
        },
        {
          step: "Show the print pieces in context",
          detail:
            "Mock the card in a hand and the flyer on a table. Explain that context helps a client judge and makes the work read as finished.",
        },
        {
          step: "Review the social set for consistency",
          detail:
            "Display all three side by side and confirm logo position, colour proportions and type sizes match. Explain that this review is the last quality gate.",
        },
        {
          step: "Check the story safe area",
          detail:
            "Show the 1080×1920 piece with the platform interface zones marked, confirming text sits in the middle third.",
        },
        {
          step: "Show the WhatsApp check",
          detail:
            "Send one piece through WhatsApp and open it, comparing with the original export. Explain that this is the real delivery condition for most Nigerian clients.",
        },
        {
          step: "Assemble the case study",
          detail:
            "Build the five-part portfolio PDF: brief, goal, system, work, result. Explain that this document is what gets attached to every future enquiry.",
        },
        {
          step: "Review the class's packages",
          detail:
            "Run several student packages through the same checklist, naming specific strengths and specific fixes in the critique vocabulary.",
        },
        {
          step: "Point to the next step",
          detail:
            "Map the three follow-on routes — freelancing, web design, content creation — against what each student's work suggests they should do next.",
        },
      ],
    },
    practice: {
      title: "The final project: a complete brand package",
      brief:
        "You deliver a complete brand package for a real or rigorously invented Nigerian business: a logo in three variants, a brand kit document, a business card, an A5 flyer, two feed posts and one story — all from one system, all print-ready where relevant, and assembled into a presented case study.",
      steps: [
        "Send the six-question brief and record the answers, or invent a client with the same rigour.",
        "Write the client's real goal and what success looks like in one line each.",
        "Choose palette and typefaces together from the goal, documenting both with roles, hex codes and weights.",
        "Design the logo, test it at 32 pixels, and produce full-colour, single-colour and reversed variants.",
        "Build the reusable components: call to action, social bar, section header, photo frame.",
        "Set up print templates with 3mm bleed, trim guides and 5mm safe areas.",
        "Assemble the brand kit document with palette, typefaces, tone, usage rules and correct and incorrect examples.",
        "Design the business card with name, role, one contact route and logo only, on 300gsm.",
        "Design the A5 flyer to the five-element structure with the background in the bleed and text inside the safe area.",
        "Export both print pieces as PDF Print with crop marks and bleed, checking pixel dimensions.",
        "Design the first feed post completely, then duplicate it for the second, changing only content.",
        "Adapt to 1080×1920 for the story, keeping text in the middle third.",
        "Export the social pieces as PNG and verify one after WhatsApp compression.",
        "Assemble the five-part case study PDF: brief, goal, system, work, result.",
      ],
      standard:
        "Nine deliverables from one documented system: a logo surviving 32 pixels in three variants, a complete brand kit document, two print pieces with correct bleed and verified resolution, three social pieces that read as one campaign, and a presented case study with a one-sentence rationale for each major decision.",
    },
    pitfalls: [
      {
        problem: "You designed the flyer before the system existed",
        fix: "Work in dependency order: brief, goal, palette and type, logo, kit, print, social. Designing a piece before the system means rebuilding it later, which is the most common reason this project runs out of time.",
      },
      {
        problem: "Your nine pieces look like nine separate designs",
        fix: "Build the first social piece completely, then duplicate the page and change only the content. Keep logo position, margins and colour proportions identical, and review the set side by side before delivering.",
      },
      {
        problem: "You delivered the print pieces without bleed",
        fix: "3mm on every side, background extended into it, all text 5mm inside trim, exported as PDF Print with crop marks and bleed ticked. Check the export's pixel dimensions before sending.",
      },
      {
        problem: "You delivered nine loose files",
        fix: "Assemble the case study PDF with brief, goal, system, work and result. The package presented with reasoning is worth several times the same files dropped into a chat.",
      },
      {
        problem: "Your rationale runs to a paragraph per decision",
        fix: "One sentence each. Long explanations read as insecurity; short ones read as command. If you cannot justify a decision in one sentence, the decision is probably wrong.",
      },
      {
        problem: "You claimed skills you do not have to impress the client",
        fix: "State what you do well and refer what you do not. Overclaiming loses the client permanently; an honest referral keeps them and often brings the work back.",
      },
    ],
    expertNotes: [
      "Keep every project source and every version, organised by client and date. The portfolio compounds only if you can retrieve work instantly, and clients return for changes months later — being able to open the original in a minute is both profitable and the strongest retention there is.",
      "Publish one case study per month even when no client asked for one. Unsolicited work for a business you admire is legitimate portfolio material, it keeps your standard visible between paid jobs, and it occasionally becomes a paid job directly.",
      "Write the one-sentence rationale for every decision as you make it, not afterwards. You will forget the reasoning within a day, and those sentences are the substance of your case study and of every future client conversation.",
      "Price the package as a package, never as nine items added together. A brand package is a different product from a flyer, it governs every future material the client makes, and pricing it as a sum of parts undervalues exactly the thing that makes it valuable.",
    ],
    vocabulary: [
      { term: "Brand package", meaning: "Logo variants, brand kit, print pieces and social set delivered as one coherent system rather than as separate items." },
      { term: "Dependency order", meaning: "Building brief, then system, then pieces — so nothing has to be rebuilt because an earlier decision changed." },
      { term: "System", meaning: "The palette, typefaces, scale, logo and image treatment that every piece applies rather than reinvents." },
      { term: "Case study", meaning: "A presented project showing brief, goal, system, work and result with rationale. The core unit of a design portfolio." },
      { term: "Rationale", meaning: "The one-sentence justification for a design decision, tied to the brief. Short rationales read as command." },
      { term: "Print-ready", meaning: "Correct bleed, safe margins, resolution and PDF Print export with crop marks — verified before delivery." },
      { term: "Portfolio compounding", meaning: "How each completed case study raises the price the next client will accept." },
      { term: "Scope honesty", meaning: "Stating what you do well and referring what you do not. Protects the work you did do." },
    ],
    homework: [
      {
        task: "Publish your case study",
        detail:
          "Post your best piece with the one-sentence rationale in the caption, and keep the full PDF ready to attach to enquiries. Visible work is what separates designers who earn from those who only practise.",
      },
      {
        task: "Approach three real businesses",
        detail:
          "Send your brief questions and your case study to three businesses you know. Do not pitch — offer a specific observation about one of their materials and what you would change. That opening works far better than a price list.",
      },
      {
        task: "Do a second package in a different sector",
        detail:
          "If your first was a food business, do a school or a salon. Range in the portfolio signals capability; two packages in one sector signal a niche, which is also valid but should be chosen deliberately.",
      },
      {
        task: "Choose your next course",
        detail:
          "Business & Freelancing if clients and pricing are your constraint, Web Design if you want to move into interfaces, Content Creation if you want to offer a complete content service. Pick from your actual constraint, not from what sounds impressive.",
      },
    ],
    rubric: [
      {
        criterion: "Brief and goal",
        passing: "Has a client and a stated task.",
        excellent: "A written brief with recorded answers and a one-line goal that every decision visibly traces back to.",
      },
      {
        criterion: "System",
        passing: "Uses a consistent palette and typefaces.",
        excellent: "A documented system with named palette roles, hex codes, typefaces and weights, a scale, and one image treatment applied to every piece.",
      },
      {
        criterion: "Deliverables",
        passing: "Produces most of the nine pieces.",
        excellent: "All nine complete, the logo surviving 32 pixels in three variants, the kit document containing usage rules and correct and incorrect examples.",
      },
      {
        criterion: "Technical quality",
        passing: "Files are usable.",
        excellent: "Print pieces with 3mm bleed, safe margins and verified resolution; social pieces inside the safe area and checked after WhatsApp compression.",
      },
      {
        criterion: "Presentation",
        passing: "Shows the work.",
        excellent: "A five-part case study with a one-sentence rationale for each major decision, print pieces shown in context, and the package priced as a package.",
      },
    ],
    faqs: [
      {
        q: "What should I charge for a full brand package?",
        a: "Price it as a package, not as a sum of parts, because it governs every future material the client makes. In the Nigerian market a documented package from a new designer sits well above a single flyer fee, and rises quickly with portfolio strength. Business & Freelancing covers pricing strategy properly.",
      },
      {
        q: "Can I use an invented client in my portfolio?",
        a: "Yes, and label it as a concept project. What matters is the reasoning and the consistency, and an honest concept project demonstrates both. Never present invented work as if a real business commissioned it — that is a claim a client can check.",
      },
      {
        q: "How long should a package like this take?",
        a: "Once your templates and components exist, roughly a full working day for the nine pieces plus the case study. Your first one will take considerably longer, which is normal — the templates you build during it are what make the second one fast.",
      },
      {
        q: "What if the client only wants the logo?",
        a: "Deliver the logo properly — three variants, tested at 32 pixels — and show them the kit as an option rather than arguing. Some clients return for it later once they see their materials drifting apart, and the conversation is far easier with the document in front of them.",
      },
      {
        q: "Am I ready to charge after four weeks?",
        a: "You are ready to charge for what you can demonstrably do: brand basics, flyers, social content and print. You are not ready for complex vector work, motion or interface design, and saying so is professional. Start at a rate that makes the job worth your time after revisions, and raise it as the portfolio compounds.",
      },
    ],
  },
};
