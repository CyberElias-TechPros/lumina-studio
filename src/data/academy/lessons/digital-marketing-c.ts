import type { SessionLecture } from "../types";

/**
 * Digital Marketing — ₦20,000 · 4 weeks · 8 sessions.
 * Sessions 7 and 8. (Sessions 1–3 in digital-marketing.ts, 4–6 in digital-marketing-b.ts.)
 */
export const digitalMarketingLessonsC: Record<string, SessionLecture> = {
  "reading-the-numbers": {
    summary:
      "Likes do not pay rent. This session teaches the metrics that actually matter — reach, impressions, engagement, clicks, leads, conversions and cost per result — how they relate to each other, and how to read a campaign honestly enough to know what to change.",
    objectives: [
      "Distinguish reach, impressions and engagement and know what each tells you",
      "Calculate click-through rate and understand what a low one means",
      "Define a lead and a conversion and measure both",
      "Calculate cost per result and compare it against margin",
      "Read a full campaign funnel and find where it leaks",
      "Tell the difference between a real signal and noise",
    ],
    blocks: [
      {
        heading: "Reach, impressions and engagement",
        body: [
          "**Reach** is how many different people saw your content. **Impressions** is how many times it was displayed — the same person seeing it three times counts three impressions. Impressions above reach means repetition, which is useful for remembering but eventually becomes annoying; a ratio far above three usually means the audience is too small or the campaign has run too long.",
          "**Engagement** is what people did: likes, comments, saves, shares, clicks. The raw number is meaningless without context — what matters is engagement **relative to reach**, because 50 engagements from 500 people reached is a completely different result from 50 engagements from 20,000. Divide engagements by reach and you have a rate you can compare between posts, which is the only comparison worth making.",
          "Then rank the engagement types by value. **Saves and shares** mean the content was worth keeping or passing on, and they are strong distribution signals. **Comments** mean it started a conversation and are also strong. **Clicks** mean someone wanted more, which is the closest thing to buying intent. **Likes** are the cheapest action a person can take and the weakest signal of all — which is why an account can have many likes and no customers.",
        ],
      },
      {
        heading: "Clicks and click-through rate",
        body: [
          "**Click-through rate (CTR)** is clicks divided by impressions, expressed as a percentage. It answers one question: of everyone who saw this, how many wanted to know more? A low CTR is not a problem with your product — it means the **creative or the first line did not earn the click**. People saw it and moved on, so change what they saw, not what you sell.",
          "Benchmarks vary by platform and industry, so comparing yourself to a global average is not useful. Compare **your own posts to each other**: if your average CTR is 1% and one post reached 3%, that post's opening and creative are worth repeating. Your own history is the only honest benchmark you have, and it takes about twenty posts before it becomes reliable.",
          "One warning: a high CTR is not automatically good. Clickbait produces clicks from people who will not buy, and they arrive at your WhatsApp and leave, costing you the click and the conversation. The number to trust is not CTR alone but **clicks that turn into enquiries**, which is the next stage in the funnel.",
        ],
      },
      {
        heading: "Leads, conversions and cost per result",
        body: [
          "A **lead** is someone who showed interest and gave you a way to reach them — a message, a form, a phone number. A **conversion** is the action you actually wanted: a sale, a booking, a registration. They are different numbers, and the ratio between them tells you how well you sell, not how well you market.",
          "**Cost per result** is what you spent divided by the results you got — cost per click, cost per lead, cost per sale. This is the number that decides everything, and it only means something compared to your **margin**. If a product earns you ₦4,000 profit and a sale costs ₦1,200 to acquire, the campaign works. If acquisition costs ₦5,000, no amount of optimisation makes it profitable — the price, the offer or the product has to change.",
          "That last point is the one most beginners resist, because it feels like giving up. It is not: it is the difference between marketing and gambling. A campaign that cannot reach a sustainable cost per result is telling you something true about the offer, and continuing to spend against it is how a small budget disappears entirely. **Set the affordable cost per result before you spend**, from the margin, and judge against that number.",
        ],
      },
      {
        heading: "Reading the funnel",
        body: [
          "Every campaign is a funnel: **impressions → clicks → enquiries → sales**. Read it in order and the problem names itself. Many impressions and few clicks means the **creative or hook** failed. Many clicks and few enquiries means the **destination or ask** failed — the advert and the profile said different things, or nobody answered. Many enquiries and few sales means **price, delivery, trust or follow-up** failed, and that is a selling problem rather than a marketing one.",
          "Working backwards is the discipline. Start from the result you wanted and walk back to the first stage where the number collapsed. Beginners do the opposite: they see low sales and change the advert, when the advert was fine and the WhatsApp replies were taking a day. **Fixing the wrong stage is the most expensive mistake in paid promotion**, and it is entirely avoidable by reading the numbers in order.",
          "Then change **one thing at a time** and give it enough time. If you change the creative, the audience and the offer in the same week, you will not know what worked, and you will have spent money to learn nothing. One variable, a full week, then read again.",
        ],
      },
      {
        heading: "Signal versus noise",
        body: [
          "Small numbers lie. A post with 40 impressions that produced 3 clicks has a 7.5% CTR, which means nothing — with numbers that small, one person behaving differently changes everything. As a rough rule, do not draw conclusions from fewer than a few hundred impressions or a couple of dozen clicks; below that, you are reading weather rather than a pattern.",
          "Nor does one good result prove anything. Posts perform differently by day, time, mood and luck, so a single outstanding post may be a fluke. The reliable evidence is **a pattern across several similar posts** — if your how-to posts consistently outsave your product posts across a month, that is a finding. If one how-to post did well once, it is an anecdote.",
          "Finally, watch for **vanity metrics**: follower count, likes, reach. They are pleasant to watch and they do not pay for anything. The metrics that matter are enquiries, sales and cost per result, and a report built on the first group will always look better than one built on the second — which is exactly why people build them that way. Build the honest one.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor opens a real campaign's analytics, calculates every metric by hand from the raw numbers, reads the funnel stage by stage to find where it collapsed, compares the cost per result against the product margin, and separates a genuine finding from noise.",
      steps: [
        {
          step: "Open the real numbers",
          detail:
            "Pull impressions, reach, engagements, clicks, enquiries and spend from an actual campaign. Explain that every calculation that follows uses these and nothing invented.",
        },
        {
          step: "Compare reach with impressions",
          detail:
            "Divide impressions by reach and interpret the ratio. Explain that a high ratio means repetition, which eventually becomes annoying rather than memorable.",
        },
        {
          step: "Calculate engagement rate",
          detail:
            "Divide engagements by reach rather than quoting the raw number. Explain that 50 engagements means nothing without knowing how many people saw it.",
        },
        {
          step: "Rank the engagement types",
          detail:
            "Order saves, shares, comments, clicks and likes by value. Explain that likes are the cheapest action and the weakest signal.",
        },
        {
          step: "Calculate click-through rate",
          detail:
            "Divide clicks by impressions and compare against the account's own history. Explain why your own average is the only honest benchmark.",
        },
        {
          step: "Diagnose a low CTR",
          detail:
            "Show that the problem is the creative or first line, not the product. Explain that changing what you sell because nobody clicked is the wrong conclusion.",
        },
        {
          step: "Count the leads",
          detail:
            "Define what counted as a lead and separate genuine enquiries from curiosity. Explain that the lead-to-sale ratio measures selling, not marketing.",
        },
        {
          step: "Calculate cost per result",
          detail:
            "Divide spend by leads and by sales separately. Explain that cost per click, per lead and per sale are three different numbers answering three different questions.",
        },
        {
          step: "Compare against margin",
          detail:
            "Set the acquisition cost against the profit per sale and state plainly whether the campaign works. Show a case where no optimisation can save it.",
        },
        {
          step: "Read the funnel in order",
          detail:
            "Walk impressions, clicks, enquiries, sales and name the stage where the number collapsed. Explain that the stage determines the fix.",
        },
        {
          step: "Identify the wrong-stage fix",
          detail:
            "Show a campaign whose advert was changed when the real failure was reply time. Explain that fixing the wrong stage is the most expensive mistake available.",
        },
        {
          step: "Test for noise",
          detail:
            "Compare a result based on 40 impressions with one based on 4,000. Explain the rough minimums before a number means anything.",
        },
        {
          step: "Find a real pattern",
          detail:
            "Group a month of posts by type and compare their averages. Explain that a pattern across several posts is a finding while one good post is an anecdote.",
        },
      ],
    },
    practice: {
      title: "Read a campaign honestly",
      brief:
        "You take a real campaign — yours or a classmate's — calculate every metric by hand from the raw numbers, read the funnel stage by stage, compare cost per result against margin, decide what to change and what to leave, and state which of your conclusions are findings and which are noise.",
      steps: [
        "Collect the raw numbers: impressions, reach, engagements by type, clicks, enquiries, sales and spend.",
        "Divide impressions by reach and interpret the repetition ratio.",
        "Calculate engagement rate as engagements divided by reach, not the raw count.",
        "Rank the engagement types you received by value and note which dominated.",
        "Calculate click-through rate and compare it against the account's own average.",
        "Define what counted as a lead and separate genuine enquiries from curiosity.",
        "Calculate cost per click, cost per lead and cost per sale as three separate numbers.",
        "Calculate the profit per sale and compare it with the acquisition cost.",
        "State plainly whether the campaign was profitable, and what it would take to be.",
        "Read the funnel in order and name the stage with the biggest proportional drop.",
        "Name the single change that addresses that stage and nothing else.",
        "Mark each conclusion as a finding or as noise, with the number it rests on.",
        "Identify one pattern across a month of posts rather than one outstanding post.",
        "List the vanity metrics you will stop reporting and the three you will track instead.",
      ],
      standard:
        "Every metric calculated by hand from real raw numbers with the arithmetic shown, engagement measured as a rate rather than a count, cost per click, per lead and per sale given separately and compared against profit per sale with a plain verdict on profitability, the funnel read in order with the biggest proportional drop named, one targeted change for that stage only, each conclusion labelled finding or noise with its supporting number, and three metrics chosen to replace the vanity ones.",
    },
    pitfalls: [
      {
        problem: "You report raw engagement counts",
        fix: "Divide by reach. Fifty engagements from 500 people reached is a strong result and from 20,000 it is a weak one, and the raw number cannot tell you which you have.",
      },
      {
        problem: "You judge campaigns by likes and followers",
        fix: "Likes are the cheapest action and followers do not buy on schedule. Track enquiries, sales and cost per result — a report built on vanity metrics always looks better, which is exactly why it is misleading.",
      },
      {
        problem: "You compare your CTR to a global benchmark",
        fix: "Compare against your own history across twenty or more posts. Platform and industry averages are not your audience, and your own average is the only honest benchmark available.",
      },
      {
        problem: "You calculate only cost per click",
        fix: "Calculate cost per lead and cost per sale as well. Cheap clicks that produce no enquiries are expensive in the only sense that matters, and the three numbers answer three different questions.",
      },
      {
        problem: "You never compare cost per result against margin",
        fix: "Set the affordable acquisition cost from your profit per sale before spending. Without that comparison you cannot tell a working campaign from an expensive hobby.",
      },
      {
        problem: "You change everything at once",
        fix: "One variable, one full week, then read again. Changing creative, audience and offer together spends money to learn nothing, because you cannot attribute the result.",
      },
      {
        problem: "You fix the stage you assumed failed",
        fix: "Read the funnel in order and find where the number actually collapsed. Changing the advert because the WhatsApp reply took a day is the most expensive mistake in paid promotion.",
      },
      {
        problem: "You draw conclusions from tiny numbers",
        fix: "Do not read a pattern into fewer than a few hundred impressions or a couple of dozen clicks. With numbers that small, one person behaving differently changes everything.",
      },
    ],
    expertNotes: [
      "Always measure engagement as a rate against reach. The raw count is the single most misleading number available in social analytics, because it hides the audience size that gives it meaning.",
      "Calculate cost per lead and cost per sale, and set the affordable figure from your margin before spending. The comparison against profit per sale is the whole judgement; everything else is detail.",
      "Read the funnel in order, working backwards from the result you wanted. The stage where the number collapsed tells you what to fix, and fixing any other stage spends money without changing the outcome.",
      "Distrust small numbers and single outstanding posts. A finding is a pattern across several similar posts over a month; below that you are reading weather and should keep collecting data.",
    ],
    vocabulary: [
      {
        term: "Reach",
        meaning: "How many different people saw your content. The size of the audience.",
      },
      {
        term: "Impressions",
        meaning: "How many times content was displayed. Divided by reach, it shows repetition.",
      },
      {
        term: "Engagement rate",
        meaning: "Engagements divided by reach. The only meaningful way to compare posts.",
      },
      {
        term: "Click-through rate",
        meaning: "Clicks divided by impressions. Measures whether the creative earned the click.",
      },
      {
        term: "Lead",
        meaning:
          "Someone who showed interest and gave you a way to reach them. Not every message is a lead.",
      },
      {
        term: "Conversion",
        meaning: "The action you wanted — a sale, booking or registration. Distinct from a lead.",
      },
      {
        term: "Cost per result",
        meaning:
          "Spend divided by results. Meaningless without comparison to your profit per sale.",
      },
      {
        term: "Vanity metric",
        meaning: "A number that looks good and pays for nothing: followers, likes, raw reach.",
      },
    ],
    homework: [
      {
        task: "Calculate every metric by hand",
        detail:
          "Take one real campaign and compute engagement rate, CTR, cost per click, cost per lead and cost per sale from the raw numbers. Show the arithmetic — the practice is the point.",
      },
      {
        task: "Compare cost per sale to margin",
        detail:
          "Work out your profit per sale and set the affordable acquisition cost from it. Write the number down; it is the pass mark for every future campaign.",
      },
      {
        task: "Read one funnel end to end",
        detail:
          "Impressions, clicks, enquiries, sales — name the stage with the biggest proportional drop and the one change that addresses it. Change nothing else.",
      },
      {
        task: "Replace three vanity metrics",
        detail:
          "List the numbers you currently watch and strike out the ones that pay for nothing. Choose three that would actually tell you whether the business is growing.",
      },
    ],
    rubric: [
      {
        criterion: "Metric definitions",
        passing: "Knows the terms.",
        excellent:
          "Distinguishes reach from impressions, engagement from engagement rate, leads from conversions, and can explain what each number tells and does not tell you.",
      },
      {
        criterion: "Calculation",
        passing: "Reads the platform's numbers.",
        excellent:
          "Computes engagement rate, CTR and cost per click, per lead and per sale by hand from raw figures with the arithmetic shown.",
      },
      {
        criterion: "Commercial judgement",
        passing: "Knows what was spent.",
        excellent:
          "Compares cost per result against profit per sale, sets the affordable acquisition cost before spending, and gives a plain verdict on whether the campaign worked.",
      },
      {
        criterion: "Funnel reading",
        passing: "Sees the whole picture.",
        excellent:
          "Reads stages in order, names the biggest proportional drop, and proposes one change for that stage while leaving everything else fixed.",
      },
      {
        criterion: "Statistical honesty",
        passing: "Reports what happened.",
        excellent:
          "Labels each conclusion as finding or noise with its supporting number, requires a pattern across several posts, and drops vanity metrics from the report.",
      },
    ],
    faqs: [
      {
        q: "What is a good click-through rate?",
        a: "Your own average is the only useful benchmark. Platform averages vary widely by industry and audience, so compare your posts to each other over twenty or more, and repeat whatever consistently beats your own average.",
      },
      {
        q: "How do I calculate cost per result?",
        a: "Spend divided by the number of results at the stage you care about — cost per click, cost per lead or cost per sale. Calculate all three; they answer different questions, and cheap clicks that produce no leads are expensive in the only sense that matters.",
      },
      {
        q: "My engagement is high but I get no sales. Why?",
        a: "Because engagement measures interest, not intent. Check whether your content is attracting buyers or admirers — useful, problem-focused content aimed at a narrow audience produces enquiries, while broad entertaining content produces likes. Narrower is better.",
      },
      {
        q: "How many impressions do I need before the numbers mean anything?",
        a: "A few hundred as a rough minimum, and a couple of dozen clicks before a click-through rate is worth acting on. Below that, one person behaving differently changes the result and you are reading noise.",
      },
      {
        q: "Should I report follower growth to a client?",
        a: "Mention it, but do not build the report on it. Clients pay for customers, so lead with enquiries, sales and cost per result, and put reach and followers underneath as context. A report of vanity metrics looks better and proves nothing.",
      },
    ],
  },

  "reporting-and-final-campaign": {
    summary:
      "The final session turns four weeks of work into the two things that get you paid: a report a business owner can act on, and a complete campaign you can show. This is where the difference between someone who posts and someone who markets becomes visible.",
    objectives: [
      "Read campaign performance and explain it in plain language",
      "Build a simple reporting template and populate it with real numbers",
      "Turn numbers into specific recommendations rather than observations",
      "Assemble a complete campaign as a portfolio piece",
      "Present a campaign to a non-marketing audience",
      "Plan how you will price and sell this work",
    ],
    blocks: [
      {
        heading: "Understanding campaign performance",
        body: [
          "Reading performance means answering three questions in order. **Did it produce what we wanted?** Not did it get likes — did it produce enquiries, sales or bookings at a cost the business can sustain. **Where did it succeed or fail?** Which post, which audience, which stage of the funnel. **Why, as far as the evidence allows?** Careful here: the numbers show what happened, and the reason is an inference — so state it as one, not as a fact.",
          "The habit that separates professionals is **comparing against a baseline**. A campaign that produced thirty enquiries is meaningless alone; thirty against twelve last month, or against a target of twenty, is a result. Every number needs something to stand next to — last period, the target, or another variant — or it is just a figure.",
          "And separate **what you controlled from what you did not**. A campaign can perform well and lose money because a supplier could not deliver, or perform poorly because a competitor ran a promotion at the same time. Naming those honestly is not excuse-making; it is what makes the next plan realistic, and it is what makes a client trust the report.",
        ],
      },
      {
        heading: "Building the report",
        body: [
          "A useful report has five parts and fits on one or two pages. **The summary**: two or three sentences in plain language stating whether the goal was met and the single most important thing to do next — because the owner may read this and nothing else. **The numbers**: the metrics that matter, with the comparison against last period or target. **What worked and what did not**, with the specific post or audience for each.",
          "Then **the recommendations**: two or three specific actions, each tied to a number in the report, with what it is expected to change. And **the next period's plan**: what will be tested, with what budget, judged against what number. That last part is what turns a report from a backward-looking document into a working tool, and it is the part most reports omit.",
          "Two rules make the difference. **Every recommendation must trace to a number** — 'increase budget' is not a recommendation, 'the retargeting audience produced leads at ₦600 against ₦1,900 cold, so shift 60% of budget there' is. And **write it for someone who does not do marketing**: no jargon, no metric without a plain explanation, because a report the owner cannot understand will not change anything, however accurate it is.",
        ],
      },
      {
        heading: "Assembling the complete campaign",
        body: [
          "The final deliverable brings every session together into one artefact. **The foundation**: audience, customer problem, value proposition. **The channel decision** with its justification. **The content system**: pillars, a one-week calendar with written posts, brand voice and visual system. **The promotion plan**: organic approach, paid campaign with objective, targeting, creative, copy and test design. **The measurement**: the metrics tracked, the target cost per result, and the reporting template.",
          "Assembled, that is a marketing plan a business could run tomorrow, and it is also the strongest portfolio piece available to someone seeking work — because it demonstrates the whole system rather than one skill. Keep it as a document you can send, and be ready to walk someone through it in five minutes.",
          "The thing that makes it credible is **specificity**. 'I do digital marketing' competes with everyone. 'Here is a plan for a Lagos hair products brand: this audience, these three pillars, this week of posts, this ₦15,000 test budget with a ₦800 target cost per enquiry' is not competing with anyone, because nobody else has done that work. Specificity is the entire difference.",
        ],
      },
      {
        heading: "Presenting it",
        body: [
          "Present in the order the business thinks, not the order you learned it. Start with **the customer and their problem** — that is where the owner's attention is. Then **what you will do**, concretely. Then **what it will cost** and **what result you expect**, with the number you will be judged on. Leave the theory out entirely; nobody buys a framework, they buy an outcome.",
          "Expect the three real objections. **'It is expensive'** — answer with what the spend is expected to produce and what it produces per result, not with a discount. **'We tried social media and it did not work'** — answer by naming what was probably missing: no defined audience, no consistent posting, no measurement, no follow-up. **'How long until we see results?'** — answer honestly: organic builds over months, paid produces information within a week and customers within a month if the offer is right.",
          "Do not over-promise. 'I guarantee you sales' is both false and the mark of someone who does not understand what determines a sale — the product, the price, the offer and the follow-up are not yours to control. The professional promise is specific work, honest measurement, and a plan adjusted from what the numbers show.",
        ],
      },
      {
        heading: "Where this goes next",
        body: [
          "Three routes follow from this course. **Marketing your own business**, where the return is direct and the practice is unlimited. **Freelance or in-house marketing work**, where the campaign document and a report you have produced are the portfolio. **Content or social roles**, where this course plus Social Media Management covers the operating side.",
          "Whichever route, the next skill to build is **measurement depth**: connecting your marketing numbers to actual sales, which usually means a spreadsheet discipline or a simple tool, and for websites, understanding what analytics is telling you. Marketing that cannot be tied to revenue stays a cost centre, and people who can tie it to revenue get paid differently.",
          "The other next skill is **writing**. Almost every part of this work — captions, advert copy, reports, proposals — is writing, and clear writing is rarer than marketing knowledge. Practise it in public, because a body of work you can point to persuades faster than any claim about your abilities.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor takes a completed campaign, builds the one-page report from its real numbers, walks through the assembled portfolio document, then delivers the five-minute presentation and answers the three objections that always come up.",
      steps: [
        {
          step: "State the campaign goal",
          detail:
            "Restate what the campaign was supposed to produce and the target it was judged against. Explain that a number without a comparison is just a figure.",
        },
        {
          step: "Pull the real numbers",
          detail:
            "Open the analytics and collect the metrics that matter. Explain which metrics belong in the report and which are vanity.",
        },
        {
          step: "Write the summary",
          detail:
            "Draft two or three plain sentences: was the goal met, and what is the single most important next action. Explain that this may be all the owner reads.",
        },
        {
          step: "Build the numbers section",
          detail:
            "Lay out each metric against last period or target. Explain that every number needs something to stand next to or it means nothing.",
        },
        {
          step: "Separate worked from did not",
          detail:
            "Name the specific post, audience or stage behind each result. Explain that general observations cannot be acted on.",
        },
        {
          step: "Write a recommendation that traces to a number",
          detail:
            "Contrast 'increase budget' with a recommendation citing the specific cost per result behind it. Explain that untraced advice is opinion.",
        },
        {
          step: "Add the next period's plan",
          detail:
            "State what will be tested, with what budget, against what number. Explain that this is what turns a report into a working tool.",
        },
        {
          step: "Separate controlled from uncontrolled",
          detail:
            "Note what affected results that the campaign did not control. Explain that naming it honestly makes the next plan realistic.",
        },
        {
          step: "Assemble the campaign document",
          detail:
            "Lay out foundation, channel decision, content system, promotion plan and measurement in one document. Explain that this is the portfolio piece.",
        },
        {
          step: "Deliver the five-minute presentation",
          detail:
            "Present customer, plan, cost and expected result in the order the business thinks. Leave the theory out entirely.",
        },
        {
          step: "Answer the objections",
          detail:
            "Take 'it is expensive', 'we tried social and it failed' and 'how long until results', answering each without discounting or over-promising.",
        },
        {
          step: "Make the honest promise",
          detail:
            "Commit to specific work, honest measurement and a plan adjusted from the numbers. Explain why guaranteeing sales marks someone who does not understand what determines a sale.",
        },
      ],
    },
    practice: {
      title: "Final project: build and present a complete campaign",
      brief:
        "You assemble every element from the course into one campaign for a real business — foundation, channel decision, content system, organic and paid promotion, measurement plan — write the one-page report from real numbers, and present it in five minutes to a non-marketing audience, handling the three standard objections.",
      steps: [
        "Write the foundation: audience, customer problem and a tested value proposition.",
        "State your channel decision with one primary and one supporting channel, justified.",
        "Define three content pillars and write a one-week calendar with finished posts.",
        "Record your brand voice as three adjectives and three rules, plus the visual system.",
        "Write the organic plan naming the signal you are optimising for.",
        "Build the paid campaign: objective, three-layer targeting including retargeting, creative and copy.",
        "Set the test budget, the target cost per result calculated from margin, and the decision rule.",
        "Collect real numbers from any campaign you have run, or from a classmate's.",
        "Write the one-page report: summary, numbers against comparison, worked and did not, recommendations, next plan.",
        "Ensure every recommendation traces to a specific number in the report.",
        "Note what affected results that the campaign did not control.",
        "Assemble everything into one document you could send to a client.",
        "Deliver a five-minute presentation: customer, plan, cost, expected result.",
        "Answer the three objections without discounting or over-promising.",
      ],
      standard:
        "A single campaign document containing the tested foundation, justified channel decision, three pillars with a one-week calendar of finished posts, recorded voice and visual system, organic plan naming its target signal, a complete paid campaign with objective, three-layer targeting, creative, copy, test budget, margin-derived target cost and decision rule — plus a one-page report whose summary states the verdict and next action, whose numbers are each compared against a baseline, whose recommendations all trace to a number, and which includes the next period's plan and the uncontrolled factors — delivered as a five-minute presentation with all three objections answered.",
    },
    pitfalls: [
      {
        problem: "Your report is a list of metrics",
        fix: "Lead with a plain-language verdict and the single most important next action. The owner may read only that, and a document of numbers without a conclusion changes nothing.",
      },
      {
        problem: "You report numbers with nothing to compare them to",
        fix: "Every figure needs a baseline — last period, a target, or another variant. Thirty enquiries alone is a figure; thirty against twelve last month is a result.",
      },
      {
        problem: "Your recommendations are not tied to numbers",
        fix: "Each recommendation must cite the specific figure behind it. 'Increase budget' is opinion; 'shift 60% to retargeting, which produced leads at ₦600 against ₦1,900 cold' is a recommendation.",
      },
      {
        problem: "You left out the next period's plan",
        fix: "State what will be tested, with what budget, against what number. Without it the report is a rear-view mirror rather than a working tool.",
      },
      {
        problem: "You wrote the report in marketing language",
        fix: "Write for someone who does not do marketing. A report the owner cannot understand will not change anything, however accurate it is.",
      },
      {
        problem: "Your campaign document is generic",
        fix: "Make it specific to one real business: named audience, named pillars, actual posts, actual budget and target cost. Specificity is the entire difference between this and everyone else's claim.",
      },
      {
        problem: "You presented the theory",
        fix: "Present customer, plan, cost and expected result. Nobody buys a framework — they buy an outcome, and the theory belongs in your head rather than in the pitch.",
      },
      {
        problem: "You promised guaranteed sales",
        fix: "Promise specific work, honest measurement and a plan adjusted from the numbers. Sales depend on product, price, offer and follow-up, which you do not control, and guaranteeing them marks you as inexperienced.",
      },
    ],
    expertNotes: [
      "Open every report with a plain verdict and one next action. It is the part most likely to be read and the part that determines whether anything changes, so write it first rather than last.",
      "Tie every recommendation to a specific number in the report. This single habit is what separates a professional report from a set of opinions, and it is immediately visible to anyone who reads marketing documents.",
      "Make your campaign document specific to one real business. 'I do digital marketing' competes with everyone; a named business with a named audience, actual posts and an actual target cost per enquiry competes with nobody.",
      "Never guarantee sales. Promise specific work, honest measurement and adjustment from the numbers — because product, price, offer and follow-up are not yours to control, and over-promising is how you lose the second contract.",
    ],
    vocabulary: [
      {
        term: "Campaign report",
        meaning:
          "A one or two page document: summary, numbers with comparisons, what worked, recommendations, next plan.",
      },
      {
        term: "Baseline",
        meaning:
          "What a number is compared against — last period, a target, or a variant. Without it a figure means nothing.",
      },
      {
        term: "Recommendation",
        meaning: "A specific action tied to a number in the report. Untied advice is opinion.",
      },
      {
        term: "Attribution",
        meaning:
          "Establishing which activity produced which result. Honest attribution states inference as inference.",
      },
      {
        term: "Marketing plan",
        meaning:
          "The assembled document: foundation, channels, content, promotion and measurement. A business could run from it.",
      },
      {
        term: "Portfolio piece",
        meaning:
          "Work you can show rather than describe. A complete campaign document is the strongest one available here.",
      },
      {
        term: "Cost per acquisition",
        meaning: "What one customer cost to win. The number a business owner actually cares about.",
      },
      {
        term: "Scope",
        meaning:
          "What you are responsible for and what you are not. Stating it protects the relationship.",
      },
    ],
    homework: [
      {
        task: "Write your one-page report",
        detail:
          "Summary with a verdict and one next action, numbers each against a baseline, what worked and did not with specifics, recommendations traced to numbers, and the next period's plan.",
      },
      {
        task: "Assemble your campaign document",
        detail:
          "Foundation, channel decision, pillars, one-week calendar, voice and visuals, organic plan, paid campaign, measurement — in one file you could send to a client today.",
      },
      {
        task: "Practise the five-minute presentation",
        detail:
          "Customer, plan, cost, expected result — timed, with the theory left out. Deliver it to one person and note where their attention dropped.",
      },
      {
        task: "Write your three objection answers",
        detail:
          "'It is expensive', 'we tried social and it failed', 'how long until results?' — answered without discounting and without promising guaranteed sales.",
      },
    ],
    rubric: [
      {
        criterion: "Report quality",
        passing: "Summarises the numbers.",
        excellent:
          "A one-page report opening with a verdict and next action, every number against a baseline, recommendations each traced to a figure, plus the next period's plan and uncontrolled factors.",
      },
      {
        criterion: "Campaign completeness",
        passing: "Has some of the parts.",
        excellent:
          "Foundation, channel decision, pillars, finished one-week calendar, voice and visuals, organic and paid plans, and measurement — assembled into one sendable document.",
      },
      {
        criterion: "Specificity",
        passing: "Describes an approach.",
        excellent:
          "Built around one named business with a real audience, actual posts, an actual budget and a margin-derived target cost per result.",
      },
      {
        criterion: "Presentation",
        passing: "Explains the plan.",
        excellent:
          "Five minutes in the order the business thinks — customer, plan, cost, expected result — with all three objections answered without discounting or over-promising.",
      },
      {
        criterion: "Professional judgement",
        passing: "Delivers the work.",
        excellent:
          "Separates what was controlled from what was not, states inference as inference, and promises specific work and honest measurement rather than guaranteed sales.",
      },
    ],
    faqs: [
      {
        q: "How often should I report to a client?",
        a: "Monthly for most small businesses, with a short note whenever something significant changes. Weekly reporting invites reacting to numbers that are still noise; monthly gives a pattern worth acting on and keeps your time on the work rather than the report.",
      },
      {
        q: "What if the campaign did not work?",
        a: "Report it plainly, say what the numbers show, name what was not controlled, and propose the specific change. A client who receives an honest bad report with a plan trusts you more than one who receives a good report built on vanity metrics.",
      },
      {
        q: "How do I get my first marketing client?",
        a: "Start with the campaign document you built in this course. Offer to run one month for a business you know at a low fee in exchange for real numbers and a testimonial, then use those numbers as the evidence for the next client. Real results are the only marketing that reliably sells marketing.",
      },
      {
        q: "How should I price this work?",
        a: "Charge for the outcome and the responsibility, not the hours: a monthly retainer covering planning, content, promotion and reporting, plus ad spend handled separately and transparently. Business & Freelancing covers pricing, contracts and getting paid in depth.",
      },
      {
        q: "What should I learn next?",
        a: "Measurement depth — connecting marketing numbers to actual sales — and writing, because captions, copy, reports and proposals are all writing and clear writing is rarer than marketing knowledge. Both raise what you can charge more than another platform skill.",
      },
    ],
  },
};
