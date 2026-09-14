import type { SessionLecture } from "../types";

/**
 * Social Media Management — ₦15,000 · 3 weeks · 6 sessions.
 * Sessions 4 to 6. (Sessions 1–3 in social-media-management.ts.)
 */
export const socialMediaLessonsB: Record<string, SessionLecture> = {
  "community-and-customer-service": {
    summary:
      "For a Nigerian small business, the comment section and the DM inbox are the sales floor. This session covers responding at speed and in a consistent voice, turning enquiries into orders, handling complaints and trolls without damaging the brand, and the workflow that keeps a multi-client inbox under control.",
    objectives: [
      "Respond to comments and DMs at a speed that does not lose the sale",
      "Write in a consistent brand voice across every reply",
      "Convert an enquiry into an order with a defined sequence",
      "Handle a complaint publicly and privately without damaging the brand",
      "Deal with trolls, spam and scams safely",
      "Run an inbox workflow that scales to multiple clients",
    ],
    blocks: [
      {
        heading: "Speed is the whole game",
        body: [
          "Social enquiries are perishable. A person who messages a business about a price is usually messaging two or three others at the same time, and the first clear reply very often wins the order. Studies of response behaviour and the everyday experience of Nigerian sellers both point the same way: replies within minutes convert at several times the rate of replies within hours, and an enquiry left overnight has frequently already been spent.",
          "This has a direct operational consequence. A business that checks messages twice a day is losing sales it did not know it had. The fix is not to work all evening; it is to reduce the cost of the first reply. **Quick replies** in WhatsApp Business — saved answers for the ten questions every customer asks — let you send an accurate price and delivery answer in two taps. An **away message** sets an expectation and asks for the details you need, so that when you do reply you can close rather than start. And a **greeting message** captures the enquiry the moment it arrives.",
          "Be honest about what you can sustain. Promising instant replies and delivering them erratically is worse than promising a two-hour window and keeping it, because a stated expectation that is met reads as professional, while one that is missed reads as neglect. Set the window in the bio and in the away message, then beat it when you can.",
        ],
      },
      {
        heading: "Brand voice in replies",
        body: [
          "Most Nigerian business accounts reply in one of two registers, and both cost them. The first is corporate coldness — 'Dear valued customer, kindly be informed that…' — which reads as a template and makes the customer feel like a ticket. The second is over-familiarity with every stranger, which can read as unserious when someone is about to spend real money. The register that works is **warm and competent**: friendly, plain, and specific.",
          "Concretely that means using the customer's name where you have it, writing in short plain sentences, answering the actual question before adding anything, and stating prices plainly rather than writing 'DM for price' — which is one of the most conversion-destroying habits in Nigerian commerce, because it forces a stranger to take an extra step to discover something a competitor published openly. If prices genuinely vary, publish a starting price and say what makes it vary.",
          "Define the voice in three adjectives and two example replies, and keep it visible. Consistency across a thousand replies is what makes an account feel like a business rather than a person's phone, and it matters most when someone else is answering on the business's behalf — which is the whole point of this role.",
        ],
      },
      {
        heading: "Converting an enquiry into an order",
        body: [
          "An enquiry is not a sale, and most lost sales are lost between the two. The sequence that works has five steps. **Answer the question asked**, completely and immediately — price, availability, delivery, timing. **Ask for the one detail you need** to proceed, usually the date, the quantity or the location. **Offer a specific next step** rather than an open one: 'I can send you three options for a Saturday delivery — shall I?' **Confirm in writing** once agreed, with the item, the price, the date and the payment method, so nothing is left to memory or dispute. **Follow up** if there is no answer, once, after a day or two, because a large share of orders are won by the follow-up that most sellers never send.",
          "The two failure points are worth naming. The first is answering only half the question — a customer asks 'how much for a two-tier cake delivered to Ikeja?' and the reply gives a price without addressing delivery, so the customer has to ask again and the momentum dies. The second is leaving the conversation open-ended: 'let me know' hands control to the customer and most conversations then simply stop. A specific question keeps the exchange moving.",
          "Payment and confirmation discipline protects the business. Agree the deposit in writing, confirm the order details in writing, and keep a record. Nigerian sellers lose real money to orders that were verbally agreed and then abandoned, and a written confirmation costs one message.",
        ],
      },
      {
        heading: "Complaints, trolls and the public audience",
        body: [
          "A complaint in a public comment is being read by every future customer, so the reply is not really for the complainant — it is for the audience. The method: **acknowledge quickly and without defensiveness**, **move it to private** with a specific invitation rather than a brush-off, **fix it or explain honestly**, and **follow up publicly** once resolved so the audience sees the outcome. 'I am sorry this happened — please DM me your order number and I will sort it today' followed later by a public 'thank you for letting us fix this' does more for a brand than a hundred polished posts.",
          "What never works is arguing, deleting the complaint, or going silent. Deleting a legitimate complaint is read as concealment and it usually gets reposted with more force. Arguing publicly turns a service issue into a spectacle. Silence tells the audience the business does not care. All three cost more than the original complaint would have.",
          "**Trolls and scams** are different and need different handling. A troll is not seeking resolution and no reply will satisfy them; the correct response is one factual reply at most, then no further engagement, and block or restrict if it continues. Nigerian accounts are targeted constantly by scams — fake payment screenshots, 'you have won' messages, links, and impersonation accounts using the business's name and photos. Never click links from strangers, verify any payment independently in your own bank app rather than trusting a screenshot, and report impersonation accounts immediately, because customers lose money to them and the blame lands on the real business.",
        ],
      },
      {
        heading: "An inbox workflow that scales",
        body: [
          "Managing one account is improvisation; managing three clients is a system or a disaster. The system has four parts. **Fixed response windows** — two or three defined blocks a day when every inbox is cleared, rather than constant partial attention which is slower and more error-prone. **Saved replies** for the recurring questions, which is where most of the time saving lives; write them once per client and refine them as patterns emerge. **A handover rule** for anything you cannot resolve — what goes to the owner, how fast, and in what form — so decisions are not delayed by waiting for you to ask.",
          "The fourth part is **records**. Keep a simple log of enquiries, what was quoted, what was agreed and what was delivered. It resolves disputes, it tells you which content actually produces enquiries, and it is what lets you report honestly at the end of the month. Without it you are guessing, and a client who asks 'did the posts bring anything?' deserves a real answer.",
          "One more thing that is easily overlooked: **separation**. Use distinct accounts or profiles per client rather than mixing them, and never post from the wrong account — an error that has ended professional relationships. Log out or use separate profiles deliberately, and check the account name before every single post. It takes two seconds and it is the cheapest insurance in this work.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor works a live inbox: answering an enquiry, converting a hesitant customer, handling a public complaint and a troll, spotting a scam, and setting up the saved replies and log that make it repeatable.",
      steps: [
        {
          step: "Set up the greeting and away messages",
          detail:
            "Write both in the brand voice, with the away message asking for the details needed to close. Explain that these capture enquiries that would otherwise be lost.",
        },
        {
          step: "Build the ten quick replies",
          detail:
            "Identify the ten questions every customer asks and write a saved answer for each, including price and delivery. Show the time a two-tap reply saves.",
        },
        {
          step: "Answer a real enquiry properly",
          detail:
            "Respond to 'how much for a two-tier cake delivered to Ikeja?' by answering both parts fully, then asking for the date. Show the half-answer version and why it loses momentum.",
        },
        {
          step: "Offer a specific next step",
          detail:
            "Replace 'let me know' with 'I can send three options for Saturday delivery — shall I?' Explain that an open ending hands control away and the conversation stops.",
        },
        {
          step: "Confirm the order in writing",
          detail:
            "Write the confirmation message: item, price, date, deposit, payment method. Explain that this one message prevents most disputes.",
        },
        {
          step: "Send the follow-up",
          detail:
            "Draft the one follow-up after two days of silence. Note that a large share of orders are won by the follow-up most sellers never send.",
        },
        {
          step: "Handle a public complaint",
          detail:
            "Write the acknowledgement, the private invitation, and the later public resolution. Explain that the real audience is every future customer reading it.",
        },
        {
          step: "Show the three wrong responses",
          detail:
            "Argue, delete, and go silent — and explain what each one tells the audience. Note that deletion is read as concealment and usually gets reposted.",
        },
        {
          step: "Handle a troll",
          detail:
            "Give one factual reply, then stop engaging, then restrict. Explain that a troll is not seeking resolution and further replies only extend it.",
        },
        {
          step: "Spot a scam",
          detail:
            "Examine a fake payment screenshot and a suspicious link. Show how to verify payment independently in a bank app and how to report an impersonation account.",
        },
        {
          step: "Set the response windows and handover rule",
          detail:
            "Define two or three daily clearing blocks and write down what goes to the owner and how fast. Explain that constant partial attention is slower than fixed blocks.",
        },
        {
          step: "Start the enquiry log",
          detail:
            "Create the simple log of enquiry, quote, agreement and delivery. Explain that it settles disputes, reveals what content works, and makes honest reporting possible.",
        },
      ],
    },
    practice: {
      title: "Work a full inbox to professional standard",
      brief:
        "You build the complete reply infrastructure for one business — greeting, away message, ten quick replies, a written voice guide — then handle a set of realistic scenarios: a price enquiry, a hesitant customer, a public complaint, a troll and a scam attempt, logging every enquiry.",
      steps: [
        "Write the greeting and away messages in the brand voice, with a stated response window.",
        "List the ten questions every customer asks and write a saved reply for each.",
        "Define the brand voice in three adjectives and two example replies.",
        "Answer a price-and-delivery enquiry completely, then ask for the one detail needed.",
        "Convert 'let me know' into a specific next-step question.",
        "Write the order confirmation covering item, price, date, deposit and payment method.",
        "Draft the two-day follow-up message.",
        "Handle a public complaint: acknowledge, invite privately, resolve, and follow up publicly.",
        "Write what you would never do — argue, delete, go silent — and one line on why for each.",
        "Handle a troll with one factual reply, then restrict.",
        "Identify the scam markers in a fake payment screenshot and state how you would verify.",
        "Set fixed response windows and write the handover rule for the owner.",
        "Log every enquiry with what was quoted, agreed and delivered.",
      ],
      standard:
        "A complete reply infrastructure in a consistent voice, every scenario answered with the full question addressed and a specific next step, the complaint handled publicly and privately with a visible resolution, the troll not engaged beyond one reply, the scam verified independently, and a working enquiry log.",
    },
    pitfalls: [
      {
        problem: "You answer enquiries hours later and lose the sale",
        fix: "Set up greeting, away and quick replies so the first response is instant and accurate, and clear the inbox in two or three fixed blocks a day. Enquiries are perishable and the first clear reply usually wins.",
      },
      {
        problem: "You write 'DM for price'",
        fix: "Publish the price or a starting price. Forcing a stranger to take an extra step to learn something a competitor states openly is one of the most conversion-destroying habits in Nigerian commerce.",
      },
      {
        problem: "You answered half the question",
        fix: "Answer every part fully before adding anything. A customer who has to ask again has lost momentum, and momentum is what closes an order.",
      },
      {
        problem: "You ended the conversation with 'let me know'",
        fix: "Ask a specific question instead. An open ending hands control to the customer and most conversations then simply stop.",
      },
      {
        problem: "You deleted or argued with a public complaint",
        fix: "Acknowledge, move it private, fix it, and follow up publicly. Deletion reads as concealment and gets reposted; arguing turns a service issue into a spectacle.",
      },
      {
        problem: "You trusted a payment screenshot",
        fix: "Verify independently in your own bank app. Fake payment screenshots are extremely common in Nigeria, and confirming costs one check while a lost order costs real money.",
      },
      {
        problem: "You posted from the wrong client account",
        fix: "Use separate profiles per client and check the account name before every post. It takes two seconds and it is the cheapest insurance in this work.",
      },
    ],
    expertNotes: [
      "Publish your prices. Nigerian customers routinely choose the business that states a price over the one that demands a DM, because asking costs effort and implies haggling. If prices genuinely vary, publish a starting figure and say plainly what changes it.",
      "Write the ten quick replies before you need them, and refine them as patterns emerge. Most of the time saving in inbox management comes from those ten answers, and they also guarantee that every customer gets an accurate reply rather than whatever you remember that day.",
      "Keep the enquiry log even when it feels like overhead. It is the only way to answer a client's 'did this work?' with evidence rather than opinion, and it is what turns a monthly fee into a renewable one.",
      "Report impersonation accounts the moment you see one. They use the business's photos to take deposits from real customers, the victims blame the real business, and early reporting is the only effective defence.",
    ],
    vocabulary: [
      { term: "Quick reply", meaning: "A saved answer to a recurring question, sent in two taps. Where most inbox time is saved." },
      { term: "Away message", meaning: "An automatic reply setting an expectation and asking for the details needed to close." },
      { term: "Brand voice", meaning: "Three adjectives and two example replies defining how the business sounds. Consistency across a thousand replies reads as a business." },
      { term: "Next-step question", meaning: "A specific question that keeps an enquiry moving, replacing an open 'let me know'." },
      { term: "Response window", meaning: "The stated time in which you will reply. Meeting a stated window reads as professional; missing it reads as neglect." },
      { term: "Restrict", meaning: "Limiting a troll's visibility without the confrontation of blocking. The correct escalation before a block." },
      { term: "Impersonation account", meaning: "A fake account using a business's name and photos to take deposits. Report immediately." },
      { term: "Enquiry log", meaning: "A record of enquiries, quotes, agreements and deliveries. The evidence base for honest reporting." },
    ],
    homework: [
      {
        task: "Build ten quick replies for one business",
        detail:
          "Identify the ten questions its customers actually ask and write a saved reply for each, including price and delivery. Time how much faster the next day's inbox becomes.",
      },
      {
        task: "Write the voice guide",
        detail:
          "Three adjectives, two example replies, and three phrases never to use. This is what makes anyone answering on the account sound like the business.",
      },
      {
        task: "Practise the complaint sequence",
        detail:
          "Write the acknowledgement, the private invitation, the resolution and the public follow-up for a realistic complaint. Then write the three wrong responses and why each fails.",
      },
      {
        task: "Start the enquiry log",
        detail:
          "Log every enquiry for one week with what was quoted and agreed. At the end, count how many converted and note which content produced them.",
      },
    ],
    rubric: [
      {
        criterion: "Responsiveness",
        passing: "Replies to enquiries.",
        excellent: "Greeting, away and ten quick replies configured, fixed clearing blocks set, and a stated window that is beaten rather than missed.",
      },
      {
        criterion: "Voice",
        passing: "Replies politely.",
        excellent: "A written voice guide applied consistently, warm and competent, with prices published rather than hidden behind 'DM for price'.",
      },
      {
        criterion: "Conversion",
        passing: "Answers questions.",
        excellent: "Every part of the question answered, a specific next step, a written confirmation, and a follow-up sent.",
      },
      {
        criterion: "Crisis handling",
        passing: "Does not make it worse.",
        excellent: "Complaint acknowledged and moved private with a visible public resolution; troll given one factual reply; scam verified independently and reported.",
      },
      {
        criterion: "System",
        passing: "Keeps up with the inbox.",
        excellent: "Response windows, handover rule, separate profiles checked before every post, and a working enquiry log enabling honest reporting.",
      },
    ],
    faqs: [
      {
        q: "How fast do I actually need to reply?",
        a: "As fast as you can sustain honestly. Minutes convert far better than hours, and an overnight enquiry has often already been spent elsewhere. Set up quick replies and an away message so the first response is instant, then state a window in the bio and beat it.",
      },
      {
        q: "Should I really publish prices?",
        a: "Yes. 'DM for price' costs more sales than it protects, because asking is effort and implies haggling. If prices vary, publish a starting figure and say what changes it — customers respond well to that and it filters out enquiries that were never going to convert.",
      },
      {
        q: "A customer is being abusive in the comments. Do I delete it?",
        a: "If it is a legitimate complaint, never delete — acknowledge, move it private, fix it, and follow up publicly. If it is abuse or trolling with no substance, one factual reply then restrict or block. Deletion of a real complaint reads as concealment and usually gets reposted.",
      },
      {
        q: "How do I spot a payment scam?",
        a: "Never trust a screenshot. Verify in your own bank app before releasing goods, treat urgency and overpayment as red flags, and never click links from strangers. Fake payment confirmation is one of the most common scams against Nigerian sellers.",
      },
      {
        q: "How do I manage several clients without mixing them up?",
        a: "Separate profiles per client, fixed response windows rather than constant partial attention, saved replies per client, and a hard habit of checking the account name before every post. Posting from the wrong account is the error that ends professional relationships.",
      },
    ],
  },

  "analytics-and-reporting": {
    summary:
      "Reading the numbers so you can prove what works and stop guessing. This session covers what each metric actually means, which ones matter for a small business, how to run a clean test, and how to write a monthly report a client will read and renew from.",
    objectives: [
      "Read platform analytics and explain what each metric does and does not tell you",
      "Distinguish reach, impressions, engagement, saves, shares and conversions",
      "Identify the metrics that matter for a small business versus vanity metrics",
      "Run a clean test and interpret the result honestly",
      "Build a monthly report that connects activity to enquiries",
      "Make and justify a decision from the data rather than from preference",
    ],
    blocks: [
      {
        heading: "What the metrics actually mean",
        body: [
          "**Reach** is the number of distinct accounts that saw a post; **impressions** is the total number of times it was displayed, so one person seeing it three times gives a reach of one and impressions of three. Reach tells you how far you got; the gap between the two tells you how often the same people are seeing you. **Engagement** is the sum of likes, comments, saves and shares, usually expressed as a rate against reach. **Profile visits** and **follows** tell you whether the post made someone want more. **Clicks** tell you whether it made someone act.",
          "Two of these are worth far more than the others. **Saves** indicate the content was useful enough to keep — a strong signal for teaching content and the metric most predictive of future reach on some platforms. **Shares** indicate it was worth passing on, which is how content reaches people who do not follow you. Likes are the weakest signal because they cost the viewer nothing; a post with many likes and no saves or shares has entertained people without helping them, which rarely produces enquiries.",
          "Understand also what none of them tell you. Engagement does not equal sales. A post can perform beautifully and produce no enquiries, and a post with modest numbers can produce five orders because the right person saw it. This is why the enquiry log from session four is the metric that closes the loop — platform analytics tell you what happened on the platform, and only your own log tells you what it was worth.",
        ],
      },
      {
        heading: "Vanity metrics and the ones that pay",
        body: [
          "A **vanity metric** is one that feels good and changes nothing. Follower count is the classic: it rises slowly, it is publicly visible so it is what clients fixate on, and it has a weak relationship with income. A page can gain two hundred followers in a month and produce fewer enquiries than the month before, because the new followers were acquired by content that attracted an audience who will never buy.",
          "The metrics that pay for a Nigerian small business are, in order: **enquiries** — how many people asked about buying; **conversions** — how many of those became orders; **clicks to WhatsApp or the link** — the closest platform-side proxy for buying intent; **saves and shares** — which predict future reach and indicate genuine value; and **profile visits** — which tell you whether a post made someone investigate. Reach matters as a denominator: without it nothing else can happen, but on its own it measures nothing but exposure.",
          "Say this to the client early and put it in the report structure from month one. If you report followers as the headline, you will be judged on followers forever, and you will be pressured into content that grows a number rather than a business. Reporting enquiries as the headline from the start sets the relationship on the right footing, and it is also the honest reading of the work.",
        ],
      },
      {
        heading: "Running a clean test",
        body: [
          "Almost every 'what works' question is answerable by testing, and almost every test done casually gives a false answer. The problem is changing several things at once: if you post a carousel at 8am on Monday and a reel at 7pm on Friday and compare them, you have compared format, time, day and content together and learned nothing.",
          "A clean test changes **one variable**. Same content type, same pillar, same week, different posting time. Or same time, same format, different hook style. Run it across enough posts to mean something — four or five of each, not one of each, because a single post's performance is dominated by chance. Then compare the specific metric that the change should affect: if you are testing hooks, look at reach and profile visits; if you are testing formats, look at saves and shares.",
          "Then be honest about the result, including when it is inconclusive. Most small-account tests do not produce a clear winner, and reporting 'not enough data yet, continuing' is more professional than inventing a conclusion. The value of testing at this scale is not statistical certainty; it is that you stop repeating what plainly does not work and you build a body of observation that no amount of generic advice replaces.",
        ],
      },
      {
        heading: "Building the monthly report",
        body: [
          "A report a client actually reads has five parts and fits on two pages. **The headline number** — enquiries this month against last month, in one line at the top. **What we did** — a short list of posts and activity, not a description of effort. **What worked** — the two or three best posts with the reason, tied to a metric. **What did not** — stated plainly, because a report that claims everything worked is not believed and teaches nothing. **What we will change next month** — two or three specific actions following from the findings.",
          "The order matters. Leading with the headline number respects the client's actual question, which is never 'how many impressions did we get?' but 'is this working?'. Burying that answer under a chart of reach is how reports get skimmed and then cancelled. Lead with the answer, support it with evidence, and keep the evidence short.",
          "Include a small visual — one chart of enquiries over the months, one of reach — because a trend is grasped instantly where a table is not. But do not let the visuals substitute for the judgement. The client is paying for the sentence 'carousels about pricing produced four of this month's nine enquiries, so we are doubling them' far more than for any chart. That sentence is the product.",
        ],
      },
      {
        heading: "Making the decision the data supports",
        body: [
          "Data without a decision is entertainment. Every report should end with two or three specific changes, each traceable to a finding, and the next report should show whether they worked. That loop — do, measure, decide, change, measure again — is the entire professional method, and it is what separates someone who manages social media from someone who posts.",
          "The decisions that matter at this level are few and concrete: which **pillar** to increase and which to drop; which **format** to lean into; which **time** to post; whether to start **paid** promotion and on what; and whether the **offer** itself needs changing rather than the content. That last one is important and is often avoided — sometimes content performs well and enquiries still do not come, which points at price, at the offer, or at the product rather than at the posts. Saying so to a client is uncomfortable and it is exactly what they are paying you to notice.",
          "Keep a **decision log**: what you changed, when, why, and what happened. After six months it is the most valuable document in your practice, because it holds the accumulated evidence of what works in your specific market — which no course, including this one, can tell you.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor reads a real account's analytics, identifies what actually worked and why, designs a clean test, then writes the two-page monthly report and the decision log entries that follow from it.",
      steps: [
        {
          step: "Open the platform analytics",
          detail:
            "Show where reach, impressions, engagement, profile visits, follows and link clicks live, and explain what each does and does not tell you.",
        },
        {
          step: "Compare reach with impressions",
          detail:
            "Show a post with high impressions and low reach and explain that the same people saw it repeatedly — which changes what the number means.",
        },
        {
          step: "Find the saves and shares leaders",
          detail:
            "Sort the month's posts by saves and shares rather than likes. Show that the top posts are usually different, and explain why those two predict value.",
        },
        {
          step: "Expose the vanity metric",
          detail:
            "Show follower growth against enquiries and demonstrate that they moved independently. Explain why reporting followers as the headline traps you.",
        },
        {
          step: "Pull the enquiry log",
          detail:
            "Open the log from session four and match enquiries to the posts that preceded them. Explain that this is the only way to close the loop.",
        },
        {
          step: "Diagnose the underperformer",
          detail:
            "Take a post that performed well but produced no enquiries and work out whether the problem is audience, offer or call to action.",
        },
        {
          step: "Design a clean test",
          detail:
            "Choose one variable — posting time — and specify five posts at each of two times, same pillar and format. Explain why changing several things at once teaches nothing.",
        },
        {
          step: "Choose the metric the test should move",
          detail:
            "Match the variable to the metric: hooks to reach and profile visits, formats to saves and shares. Explain that measuring the wrong metric makes a good test useless.",
        },
        {
          step: "Write the headline of the report",
          detail:
            "Draft the one-line enquiries comparison that goes at the top. Explain that leading with it respects the client's actual question.",
        },
        {
          step: "Write what worked and what did not",
          detail:
            "Name two or three of each with the reason tied to a metric. Explain that a report claiming everything worked is neither believed nor useful.",
        },
        {
          step: "Write the changes for next month",
          detail:
            "Two or three specific actions traceable to findings. Explain that a report without decisions is entertainment.",
        },
        {
          step: "Add the decision log entry",
          detail:
            "Record what changed, when, why and what to look for. Explain that after six months this is the most valuable document in the practice.",
        },
      ],
    },
    practice: {
      title: "Read the numbers, write the report, decide",
      brief:
        "You analyse one month of a real account's analytics alongside its enquiry log, design one clean test, and produce a two-page monthly report ending in specific decisions, with a decision log entry for each.",
      steps: [
        "Export or record the month's reach, impressions, engagement, profile visits, follows and link clicks.",
        "Sort posts by saves and shares separately from likes and note how the rankings differ.",
        "Compare follower growth against enquiries for the month and state whether they moved together.",
        "Match enquiries from the log to the posts that preceded them.",
        "Identify the two or three best posts and state the reason each worked, tied to a metric.",
        "Identify one post that performed well but produced no enquiries and diagnose why.",
        "Design one clean test: a single variable, five posts per condition, same pillar and format.",
        "State which metric the test is expected to move and why.",
        "Write the report headline: enquiries this month against last, in one line.",
        "Write what we did, what worked, what did not, and what changes next month.",
        "Add one small trend chart of enquiries across the months.",
        "Write a decision log entry for each change: what, when, why, what to watch.",
      ],
      standard:
        "A two-page report leading with the enquiries comparison, distinguishing saves and shares from likes, honestly naming what did not work, containing one properly controlled test with a stated expected metric, and ending in two or three specific decisions each with a decision log entry.",
    },
    pitfalls: [
      {
        problem: "You report follower count as the headline",
        fix: "Lead with enquiries. Followers have a weak relationship with income, and reporting them first means you will be judged on them forever and pressured into content that grows a number rather than a business.",
      },
      {
        problem: "You treat likes as success",
        fix: "Likes cost the viewer nothing. Look at saves and shares, which indicate content worth keeping or passing on, and at clicks and enquiries, which indicate intent.",
      },
      {
        problem: "You changed four things at once and compared the results",
        fix: "One variable per test, five posts per condition, same pillar and format. Comparing a carousel at 8am Monday with a reel at 7pm Friday teaches nothing.",
      },
      {
        problem: "You drew a conclusion from one post each",
        fix: "A single post's performance is dominated by chance. Run four or five per condition, and say 'not enough data yet' when that is the truth rather than inventing a finding.",
      },
      {
        problem: "You never connected the posts to the enquiries",
        fix: "Keep the enquiry log and match enquiries to preceding posts. Platform analytics tell you what happened on the platform; only your own log tells you what it was worth.",
      },
      {
        problem: "Your report claims everything worked",
        fix: "Name what did not work and why. A report without failures is neither believed nor useful, and it teaches the client nothing about your judgement.",
      },
      {
        problem: "You reported data without deciding anything",
        fix: "End every report with two or three specific changes traceable to findings, and check them next month. Data without a decision is entertainment.",
      },
    ],
    expertNotes: [
      "Report enquiries as the headline from month one, before the client asks. Whoever sets the metric controls the relationship, and setting it to income rather than to a vanity number is the single most protective thing you can do for a long engagement.",
      "Keep the decision log even when the decisions seem small. After six months it holds the accumulated evidence of what works in your market, which is worth more than any generic best-practice list and cannot be bought.",
      "Be willing to tell a client the problem is the offer, not the content. When posts perform and enquiries do not come, the cause is usually price, product or call to action. Naming it is uncomfortable and it is precisely what they are paying you to notice.",
      "Sort by saves and shares before you sort by likes, every time you review a month. It reframes the whole picture in seconds, because the posts that helped people are rarely the posts that got the most hearts.",
    ],
    vocabulary: [
      { term: "Reach", meaning: "Distinct accounts that saw a post. Measures how far you got." },
      { term: "Impressions", meaning: "Total displays, counting repeats. The gap against reach shows how often the same people saw you." },
      { term: "Saves", meaning: "Times a post was kept. The strongest signal that content was useful, and a predictor of future reach." },
      { term: "Shares", meaning: "Times a post was passed on. How content reaches non-followers." },
      { term: "Vanity metric", meaning: "A number that feels good and changes nothing — classically, follower count." },
      { term: "Controlled test", meaning: "Changing one variable across enough posts to mean something, with the affected metric specified in advance." },
      { term: "Decision log", meaning: "What changed, when, why and what happened. The accumulated evidence base of your practice." },
      { term: "Conversion", meaning: "An enquiry that became an order. The number a small business actually exists to produce." },
    ],
    homework: [
      {
        task: "Sort a month by saves and shares",
        detail:
          "Take any account you manage or follow, sort its posts by saves and by shares, and compare with the likes ranking. Write two sentences on what the difference reveals.",
      },
      {
        task: "Design one clean test",
        detail:
          "Pick one variable, specify five posts per condition with everything else held constant, and state which metric it should move. Run it and report honestly, even if inconclusive.",
      },
      {
        task: "Write a two-page monthly report",
        detail:
          "Headline enquiries line, what we did, what worked, what did not, what changes next month, one trend chart. Send it to someone and ask whether they understood it in two minutes.",
      },
      {
        task: "Start the decision log",
        detail:
          "Record every change you make this month with its reason and what you will look for. Add to it monthly — this becomes your most valuable professional document.",
      },
    ],
    rubric: [
      {
        criterion: "Metric literacy",
        passing: "Can name the main metrics.",
        excellent: "Explains what each metric does and does not show, distinguishes reach from impressions, and knows why saves and shares outrank likes.",
      },
      {
        criterion: "Business focus",
        passing: "Reports engagement.",
        excellent: "Leads with enquiries, treats follower count as a vanity metric, and connects platform data to the enquiry log.",
      },
      {
        criterion: "Testing",
        passing: "Compares some posts.",
        excellent: "One variable, five posts per condition, everything else held constant, with the expected metric stated in advance and an honest verdict.",
      },
      {
        criterion: "Reporting",
        passing: "Produces a summary.",
        excellent: "Two pages, headline first, what worked and what did not both named with reasons, one trend chart, and a client could grasp it in two minutes.",
      },
      {
        criterion: "Decisions",
        passing: "Suggests improvements.",
        excellent: "Two or three specific changes traceable to findings, each with a decision log entry, and reviewed the following month.",
      },
    ],
    faqs: [
      {
        q: "Which single metric matters most?",
        a: "Enquiries. For a small business, income follows enquiries, and everything else is a leading indicator of them. Reach is the denominator, saves and shares predict future reach, and clicks are the closest platform-side proxy for intent — but enquiries is the number to report first.",
      },
      {
        q: "My client only cares about followers. What do I do?",
        a: "Report followers, but put enquiries above it and show the trend of both. When a month shows followers up and enquiries flat, that conversation happens naturally and it is far more persuasive than any argument you could make in the abstract.",
      },
      {
        q: "How many posts do I need before a test means anything?",
        a: "Four or five per condition at minimum. One post each tells you nothing because a single post's performance is dominated by chance. On a small account most tests will stay inconclusive, and saying so honestly is more professional than inventing a finding.",
      },
      {
        q: "Should I use a third-party analytics tool?",
        a: "Not to start. The platforms' own insights are free and sufficient for one or two clients, and your enquiry log supplies the part they cannot. A unified dashboard becomes worth paying for when you manage several accounts and need them in one place.",
      },
      {
        q: "What if the content performs but nothing sells?",
        a: "Then the problem is probably not the content. Check the offer, the price, the call to action and whether the audience you attracted can actually buy. Telling a client this is uncomfortable and it is exactly the insight they are paying for.",
      },
    ],
  },

  "safety-and-final-project": {
    summary:
      "The final session covers the two things that end careers rather than slow them — account security and the legal and ethical lines — then puts the whole course into one deliverable: a complete social media management package for a real client, presented as a portfolio piece.",
    objectives: [
      "Secure a client's accounts against takeover and report an impersonation",
      "Understand the legal and ethical lines: copyright, disclosure, claims and data",
      "Handle a crisis with a prepared method rather than improvisation",
      "Write a simple agreement that protects both you and the client",
      "Deliver a complete social media management package for a real client",
      "Present the package as a portfolio case study and price it as a retainer",
    ],
    blocks: [
      {
        heading: "Account security: the risk that ends everything",
        body: [
          "Losing a client's account is the single worst thing that can happen in this role, and it is almost always preventable. The protections are not complicated. **Two-factor authentication on every account, always** — an attacker with the password still cannot enter without the second factor, and this one setting prevents the large majority of takeovers. **A password manager** generating a unique long password per account, because reuse is how one breach becomes every breach. **Never share a password in plain text** over WhatsApp or email; use a proper sharing method or a manager's share feature.",
          "Then the human vectors, which are where most Nigerian account losses actually happen. **Phishing** — a message claiming to be from Instagram or Facebook saying the account will be closed, with a link. No platform will message you that. **Fake verification and 'business support' offers** from strangers promising a blue tick or reach for a fee. **Impersonation** — someone registering the business's name and using its photographs to take deposits from customers, which damages the real business directly. And **third-party apps**: every 'who viewed your profile' or free-growth tool you authorise gets access, and a compromised one leaks it.",
          "Set this up as a checklist you run for every client on day one: two-factor on, password manager, recovery email and phone current, no unknown third-party apps, and the owner — not only you — holding admin access. That last point matters ethically and practically: a client must never be locked out of their own business by a manager who left, and you should never be in a position where that is even a question.",
        ],
      },
      {
        heading: "Legal and ethical lines",
        body: [
          "**Copyright** is the one people trip over most. Using a photograph, a song or a design you did not create or licence is infringement, and it does not become acceptable because it is on the internet or because you credited the owner. Use your own material, properly licensed libraries, or the client's own assets, and for music use the platform's own licensed library for business accounts, which exists precisely because commercial use of popular tracks is otherwise restricted.",
          "**Advertising claims** are the second. Nigerian advertising is regulated, and claims about health, weight loss, financial returns or guaranteed results carry real risk — for the business and for whoever wrote the post. The rule is simple: do not write a claim the business cannot substantiate, and be especially careful with anything medical or financial. 'Helps support' is not the same as 'cures', and the difference matters legally.",
          "**Disclosure** is the third. Paid partnerships and sponsored content must be disclosed; presenting an advertisement as an independent opinion is deceptive and platforms provide the label for exactly this reason. **Personal data** is the fourth: customer names, phone numbers and order details shared in a screenshot or a testimonial without consent is a breach of trust and, under Nigeria's data protection framework, potentially a legal one. Blur or obtain consent. Finally, **honesty about results** — never buy followers or engagement, and never fabricate a testimonial. Both are detectable, both destroy the account's credibility, and neither is worth a fee.",
        ],
      },
      {
        heading: "Crisis handling",
        body: [
          "A crisis is a moment when a business's reputation is publicly at risk: a product failure affecting several customers, an offensive post, an accusation, a leaked conversation, or a viral complaint. The accounts that survive handle it by a prepared method rather than by instinct, and the method has four steps. **Respond fast, but not fast enough to be wrong** — acknowledge within the hour, and buy time honestly rather than guessing. **Take responsibility where it is due**, without qualifiers; 'we are sorry you feel that way' is not an apology and everyone recognises it as one.",
          "The third step is **state the specific fix and the timeframe**, because a complaint is really a request for evidence that the business will put it right. The fourth is **follow up publicly when it is resolved**, so the audience sees an ending rather than an open wound. What you never do is delete the complaint, argue with the complainant, blame a customer, or go silent — each of these turns a contained problem into a larger one, and silence in particular is read as indifference.",
          "Prepare this before you need it. A short crisis statement template, a list of who must be informed and how fast, and an agreed line on the three or four scenarios most likely to arise for that specific business. When something happens at nine on a Saturday evening, having the template means the first response is calm and correct rather than defensive and improvised — and the first response is the one everyone remembers.",
        ],
      },
      {
        heading: "The agreement",
        body: [
          "A simple written agreement protects both sides and takes an hour. It should cover: **what you will deliver** — number of posts per week, which platforms, whether it includes replies and how fast, whether it includes shooting or only posting; **what the client must provide** — product information, prices, photographs, approval turnaround, and who has authority to approve; **the fee and payment terms** — amount, when it is due, and what happens if it is late; **the revision and approval process**; **the term and how either side ends it**; and **who owns the content** afterwards.",
          "The clauses that prevent the most trouble are the practical ones. An **approval turnaround** — 'feedback within 48 hours, otherwise the post goes out as drafted' — prevents the situation where a client's silence delays a month of content and then blames the schedule. A **deposit or first month in advance** establishes that the work is real. A clear **scope** stops the quiet expansion from three posts a week to daily posting plus video plus WhatsApp replies at the same fee. And stating **who owns the content** avoids an argument later, particularly if the client took the photographs.",
          "You do not need a lawyer for a straightforward retainer, but you do need it in writing, dated, and signed or at least explicitly agreed by message. In practice most disputes in this work arise not from bad faith but from two people who genuinely remembered the arrangement differently, and a page of writing prevents almost all of that.",
        ],
      },
      {
        heading: "The final project",
        body: [
          "The deliverable is a complete social media management package for a real business, and it has six parts. **The audit and foundation** — the profile audit with fixes applied, the audience definition, the positioning sentence, the platform choice with reasoning, and four content pillars. **The month plan** — a calendar mapping posts to pillars, with the ratio stated. **The content** — one batched week of posts, each with its format, hook, caption, keywords and tags, plus one edited reel. **The community system** — greeting and away messages, ten quick replies, the voice guide, and the complaint and troll scripts.",
          "The fifth part is **the security and legal checklist** — two-factor confirmed, password manager in use, no unknown third-party apps, owner holding admin access, and a note on copyright, disclosure and claim limits for this specific business. The sixth is **the report template** — the two-page structure with the enquiries headline, ready to be filled in at the end of the first real month.",
          "Present it as a case study rather than as loose files: what the business is, what the goal was, what you built, and what you expect it to produce. Then price it as a monthly retainer rather than per post, because the value is continuity — a page that is consistently managed compounds, and a bundle of posts does not. This package is what you attach to every future enquiry, and it is the artefact that lets you charge a monthly fee instead of a per-post one.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor runs the security checklist on a live account, walks the legal lines with real examples, drafts a crisis statement, writes the agreement, then reviews a complete student package as a case study.",
      steps: [
        {
          step: "Run the security checklist",
          detail:
            "Turn on two-factor, set a password manager, confirm the recovery email and phone, and review authorised third-party apps. Explain that two-factor alone prevents most takeovers.",
        },
        {
          step: "Show the phishing message",
          detail:
            "Examine a real 'your account will be closed' message and identify the tells. Note that no platform will message you that, and the link is the payload.",
        },
        {
          step: "Handle an impersonation report",
          detail:
            "Walk the reporting steps for an account using the business's name and photos. Explain that victims blame the real business, so speed matters.",
        },
        {
          step: "Confirm the owner holds admin access",
          detail:
            "Show the role settings and confirm the owner is an admin, not only the manager. Explain that a client must never be lockable out of their own business.",
        },
        {
          step: "Walk the copyright line",
          detail:
            "Show a post using an unlicensed photograph and a trending commercial track, and explain the correct alternatives including the platform's licensed business library.",
        },
        {
          step: "Walk the claims line",
          detail:
            "Rewrite an unsubstantiated health claim into something defensible. Explain that the business and the writer both carry the risk.",
        },
        {
          step: "Show the disclosure label",
          detail:
            "Mark a sponsored post as paid partnership and explain why presenting advertising as independent opinion is deceptive.",
        },
        {
          step: "Handle customer data",
          detail:
            "Take a testimonial screenshot containing a name and phone number and blur it. Explain consent and the data protection position.",
        },
        {
          step: "Draft the crisis statement",
          detail:
            "Write the four-step response for a realistic scenario: acknowledge, take responsibility, state the fix and timeframe, follow up publicly.",
        },
        {
          step: "Write the agreement",
          detail:
            "Draft the one-page agreement covering deliverables, client obligations, fee, approval turnaround, term and content ownership.",
        },
        {
          step: "Review a student package",
          detail:
            "Go through a complete six-part package, naming specific strengths and specific fixes, and confirm the security and legal checklist is present.",
        },
        {
          step: "Price it as a retainer",
          detail:
            "Convert the package into a monthly fee with a stated scope. Explain that continuity is the value and per-post pricing undervalues it.",
        },
      ],
    },
    practice: {
      title: "The final project: a complete management package",
      brief:
        "You deliver a complete social media management package for a real business — foundation, month plan, one batched week of content, community system, security and legal checklist, and report template — presented as a case study with a monthly retainer proposal.",
      steps: [
        "Apply the profile audit fixes and record the before and after.",
        "Write the audience definition, positioning sentence and platform choice with reasoning.",
        "Define four content pillars and state the ratio between them.",
        "Build the month calendar mapping posts to pillars.",
        "Batch one week of posts, each with format, hook, caption, keywords and tags.",
        "Produce one edited reel under thirty seconds with corrected captions.",
        "Write the greeting and away messages and ten quick replies.",
        "Write the voice guide: three adjectives, two example replies, three phrases never to use.",
        "Write the complaint sequence and the troll response.",
        "Complete the security checklist: two-factor, password manager, recovery contacts, third-party app review, owner admin access.",
        "Write the legal note for this business covering copyright, disclosure, claims and customer data.",
        "Draft the four-step crisis statement for the most likely scenario.",
        "Write the one-page agreement including approval turnaround and content ownership.",
        "Build the two-page report template with the enquiries headline.",
        "Assemble the case study and the monthly retainer proposal.",
      ],
      standard:
        "All six parts complete for one real business: a fixed profile with a documented foundation, a month calendar, a batched week with one reel, a full community system, a completed security and legal checklist, a crisis statement, an agreement, a report template, and a case study with a monthly retainer price.",
    },
    pitfalls: [
      {
        problem: "You manage a client account without two-factor authentication",
        fix: "Turn it on for every account on day one, use a password manager with unique passwords, and confirm the recovery contacts. Two-factor alone prevents the large majority of takeovers.",
      },
      {
        problem: "Only you hold admin access",
        fix: "Make the owner an admin too. A client must never be lockable out of their own business by a manager who left, and you should never be in a position where that is even a question.",
      },
      {
        problem: "You used an unlicensed photograph or commercial track",
        fix: "Use your own material, licensed libraries, the client's assets, and the platform's licensed music library for business accounts. Crediting the owner does not make unlicensed use acceptable.",
      },
      {
        problem: "You wrote a health or income claim the business cannot prove",
        fix: "Do not write claims the business cannot substantiate, and be strictest with anything medical or financial. The business and the writer both carry the risk.",
      },
      {
        problem: "You posted a customer screenshot with a name and phone number",
        fix: "Blur personal details or get consent. Sharing customer data without permission breaches trust and potentially Nigeria's data protection framework.",
      },
      {
        problem: "You improvised during a crisis",
        fix: "Prepare the four-step statement template in advance. Acknowledge, take real responsibility, state the fix and timeframe, follow up publicly — and never delete, argue or go silent.",
      },
      {
        problem: "You worked with no written agreement",
        fix: "Write one page: deliverables, client obligations, fee, approval turnaround, term and content ownership. Most disputes come from two honest people who remembered the arrangement differently.",
      },
      {
        problem: "You priced per post",
        fix: "Price a monthly retainer with a stated scope. Continuity is what produces results and what the client is actually buying; per-post pricing undervalues it and invites scope creep.",
      },
    ],
    expertNotes: [
      "Run the security checklist on day one of every client, without exception, and keep a record that you did. If an account is ever compromised, that record is the difference between an unfortunate event and a dispute about whose fault it was.",
      "Keep a crisis template per client, tailored to their two or three most likely scenarios. The first response is the one everyone remembers, and a prepared statement makes it calm and correct rather than defensive.",
      "Never buy followers or engagement for a client, however much they push. It is detectable, it corrupts every future analytics reading so you can no longer tell what works, and when it surfaces it ends the relationship and your reputation together.",
      "Price retainers on scope, not on effort. Stating 'twelve posts, replies within four hours on weekdays, one monthly report' lets a client understand what they are buying and lets you say no to expansion without an argument.",
    ],
    vocabulary: [
      { term: "Two-factor authentication", meaning: "A second verification step beyond the password. Prevents the large majority of account takeovers." },
      { term: "Phishing", meaning: "A fake message impersonating a platform to steal credentials. No platform will message you that your account will be closed." },
      { term: "Impersonation account", meaning: "A fake account using a business's identity to defraud its customers. Report immediately." },
      { term: "Licensed library", meaning: "A platform's own cleared music and media for business accounts. The safe alternative to unlicensed commercial tracks." },
      { term: "Disclosure", meaning: "Labelling sponsored content as paid. Presenting advertising as independent opinion is deceptive." },
      { term: "Crisis statement", meaning: "A prepared four-step response: acknowledge, take responsibility, state the fix and timeframe, follow up publicly." },
      { term: "Approval turnaround", meaning: "The agreed time a client has to give feedback. Prevents silence delaying a month of content." },
      { term: "Retainer", meaning: "A monthly fee for a stated scope. Reflects that continuity, not individual posts, is what produces results." },
    ],
    homework: [
      {
        task: "Run the security checklist on every account you touch",
        detail:
          "Two-factor, password manager, recovery contacts, third-party app review, owner admin access. Record the date you did it — that record protects you later.",
      },
      {
        task: "Write a crisis template for one business",
        detail:
          "Identify its two or three most likely crises and write the four-step response for each. Keep it somewhere you can reach at nine on a Saturday evening.",
      },
      {
        task: "Write your standard agreement",
        detail:
          "One page covering deliverables, client obligations, fee, approval turnaround, term and content ownership. Reuse it on every engagement with only the specifics changed.",
      },
      {
        task: "Turn your package into a retainer proposal",
        detail:
          "State the scope, the monthly fee and what is excluded. Send it to one real business with your case study attached.",
      },
    ],
    rubric: [
      {
        criterion: "Security",
        passing: "Knows the basics.",
        excellent: "A completed checklist with two-factor, password manager, recovery contacts, app review and owner admin access, dated and recorded.",
      },
      {
        criterion: "Legal and ethical awareness",
        passing: "Avoids obvious problems.",
        excellent: "A business-specific note on copyright, disclosure, substantiated claims and customer data, with the risky examples rewritten correctly.",
      },
      {
        criterion: "Crisis readiness",
        passing: "Would respond sensibly.",
        excellent: "A prepared four-step statement for the most likely scenario, with the three forbidden responses named and rejected.",
      },
      {
        criterion: "Professional terms",
        passing: "Has discussed terms.",
        excellent: "A written agreement covering deliverables, client obligations, fee, approval turnaround, term and content ownership.",
      },
      {
        criterion: "Final package",
        passing: "Delivers most parts.",
        excellent: "All six parts complete for a real business, presented as a case study, with a scoped monthly retainer price rather than per-post pricing.",
      },
    ],
    faqs: [
      {
        q: "How do I stop a client's account being hacked?",
        a: "Two-factor authentication on every account, unique passwords from a password manager, current recovery contacts, no unknown third-party apps, and the owner holding admin access. Run it as a checklist on day one and keep a dated record.",
      },
      {
        q: "Can I use trending music on a business account?",
        a: "Use the platform's own licensed music library for business accounts, which exists because commercial use of popular tracks is otherwise restricted. Crediting an artist does not licence the track, and a takedown or muted video is the mildest consequence.",
      },
      {
        q: "What claims should I never write?",
        a: "Anything about curing or treating illness, guaranteed financial returns, or results the business cannot evidence. Nigerian advertising regulation applies, and both the business and whoever wrote the post carry risk. Write what the business can substantiate.",
      },
      {
        q: "Do I really need a written agreement for a small client?",
        a: "Yes, and it can be one page. Almost every dispute in this work comes from two honest people who remembered the arrangement differently. Writing down scope, fee, approval turnaround and content ownership prevents nearly all of it.",
      },
      {
        q: "How do I price a monthly retainer?",
        a: "Price the scope, not the effort: number of posts, platforms, whether replies are included and how fast, and whether shooting is included. Continuity is what produces results, so per-post pricing both undervalues the work and invites scope creep. Business & Freelancing covers pricing in depth.",
      },
    ],
  },
};
