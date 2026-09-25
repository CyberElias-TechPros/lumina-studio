import type { SessionLecture } from "../types";

/**
 * Digital Marketing — ₦20,000 · 4 weeks · 8 sessions.
 * Sessions 4 to 6. (Sessions 1–3 in digital-marketing.ts, 7–8 in digital-marketing-c.ts.)
 */
export const digitalMarketingLessonsB: Record<string, SessionLecture> = {
  "planning-and-brand-voice": {
    summary:
      "Posting when inspiration arrives is why most business accounts stall by week three. This session builds the two systems that make content sustainable: a content calendar you can actually keep, and a brand voice that makes every post sound like the same business without you thinking about it.",
    objectives: [
      "Build a content calendar that survives contact with a busy week",
      "Choose content pillars that keep an account coherent",
      "Batch-produce content instead of making it one post at a time",
      "Define a brand voice specific enough to copy",
      "Establish visual consistency across every post",
      "Deliver a complete one-week content calendar",
    ],
    blocks: [
      {
        heading: "Why calendars fail and what to do instead",
        body: [
          "Almost every content calendar fails the same way: it is built enthusiastically on a Sunday, followed for eleven days, and abandoned when a busy week arrives. Then the account goes quiet, the owner feels guilty, and posting becomes associated with failure rather than with business. The calendar was not the problem — the **assumption of unlimited time** was.",
          "So build it from your real capacity. If you can genuinely produce three posts a week, plan three. A calendar of three posts a week kept for six months produces roughly seventy-five pieces of content, a body of work, real numbers to learn from and a following. A calendar of daily posts kept for eleven days produces eleven posts and a sense of defeat.",
          "Then build in **slack**. Plan for four weeks but write only two ahead, and leave one slot per week deliberately empty for something timely — a customer story, a response to a question that came up, an offer that appeared. Calendars that leave no room for reality get abandoned; calendars with slack get kept, and the empty slot is often where the best content comes from.",
        ],
      },
      {
        heading: "Content pillars",
        body: [
          "A **content pillar** is a theme your content returns to repeatedly. Three or four pillars are enough: for a fashion business they might be **how to choose**, **behind the making**, **customer stories** and **what is available now**. Every post belongs to one of them, which means you are never staring at a blank page wondering what to post — you are choosing which pillar today's post serves.",
          "Pillars do three jobs. They make the account **coherent**, so a new visitor understands within a few posts what you are about rather than seeing random topics. They make planning **fast**, because a pillar is a reusable prompt rather than a new idea each time. And they make your content **cumulative** — ten posts about how to choose build into a resource, while ten unrelated posts add up to nothing.",
          "Derive pillars from your audience's problems rather than from your products. 'How to choose work clothes that last' is a pillar; 'our Ankara collection' is not, because it can only ever talk about you. The test of a good pillar is that you could write thirty posts about it without repeating yourself and without the audience getting bored.",
        ],
      },
      {
        heading: "Batching: the practice that makes it sustainable",
        body: [
          "Making one post at a time is the expensive way: each one costs you the full switch into thinking about marketing, photographing, writing and posting. **Batching** groups those costs. Set aside two or three hours once a week and produce the whole week's content in one sitting — write all the captions, shoot all the photos, prepare all the graphics. Then the rest of the week is only posting, which takes minutes.",
          "Batching also makes the content **better**, because you see the week as a whole. You notice that three posts are making the same point, that nothing is promotional, or that a natural sequence exists — a problem on Monday, the explanation on Wednesday, the offer on Friday — that would never appear if each post were written in isolation.",
          "Prepare a small **asset library** while you are at it: a folder of product photos, customer photos, a couple of graphics with your colours, your logo at usable sizes, and a saved set of quick replies. Most posting delays are not writing delays — they are the ten minutes spent hunting for a photo or a logo. Removing that friction is what turns 'I will post later' into a post that actually goes out.",
        ],
      },
      {
        heading: "Brand voice",
        body: [
          "**Brand voice** is how your business sounds, and it is not an abstract idea — it is a set of choices you can write down. Are you formal or conversational? Do you use Nigerian English and local expressions, or careful standard English? Do you joke, or stay factual? Do you write long explanations or short statements? Answer those and you have a voice; write them down and anyone can produce it.",
          "The practical way to define it is with **three adjectives and three rules**. Adjectives: warm, direct, practical. Rules: 'always state the price', 'never open with a greeting', 'use short paragraphs and everyday words, including Nigerian expressions where they fit naturally'. Those six items are enough for consistent output, and they can be handed to someone else — which is the real test of a defined voice.",
          "Consistency matters more than quality here, and the reason is recognition. Someone scrolling sees dozens of posts an hour; a distinctive, consistent voice makes yours identifiable before they read your name. A business that sounds formal on Monday, jokey on Wednesday and corporate on Friday reads as unreliable in a way nobody can articulate but everybody feels.",
        ],
      },
      {
        heading: "Visual consistency",
        body: [
          "Visual consistency is what makes a grid look like a business rather than a scrapbook, and it needs only three decisions. **Two or three colours**, used consistently — for backgrounds, text overlays and any graphic element. **One or two fonts**, always the same, at legible sizes. **A recognisable photo style** — the same kind of light, the same kind of background, the same treatment — so your images are identifiable at thumbnail size.",
          "You do not need a designer for this. Choose two colours you like, pick one free font pair, and decide how you will shoot: natural light, plain background, phone camera, no filters. Then apply it every time. A free design tool gives you templates, and once you have made two or three, reusing them is faster than starting fresh — which is also why templated graphics survive a busy week and bespoke ones do not.",
          "And be honest about the trade-off: **consistency beats polish**. A slightly rough post in your recognisable style, published on schedule, outperforms a beautiful post published three weeks late. Polish that delays publishing is not an asset, and the accounts that grow are the ones that kept going while they were still improving.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor builds a full week of content for a real business in one sitting: three pillars, a calendar, batch-written captions, a voice definition with rules, a colour and font system, and two reusable templates — showing how the whole week comes out of one focused session.",
      steps: [
        {
          step: "Audit the real capacity",
          detail:
            "Ask how many hours a week are genuinely available and set the post count from that. Explain that a calendar built on imagined time is abandoned by week three.",
        },
        {
          step: "Define three content pillars",
          detail:
            "Derive them from audience problems rather than products, and test each by asking whether thirty posts could be written without repetition.",
        },
        {
          step: "Assign pillars to days",
          detail:
            "Map the week: a problem, an explanation, an offer, a customer story. Show how a sequence emerges that isolated posts would never produce.",
        },
        {
          step: "Leave one slot empty",
          detail:
            "Mark one day deliberately unplanned for something timely. Explain that calendars without slack get abandoned, and the empty slot often holds the best content.",
        },
        {
          step: "Batch-write the captions",
          detail:
            "Write all the week's captions in one sitting. Explain that batching groups the cost of switching into marketing mode and makes the week better because you see it whole.",
        },
        {
          step: "Write the voice definition",
          detail:
            "Record three adjectives and three rules. Explain that a voice is only defined if someone else could produce it from what you wrote.",
        },
        {
          step: "Apply the voice to a rewrite",
          detail:
            "Take a generic caption and rewrite it against the rules. Show the before and after side by side.",
        },
        {
          step: "Choose the colours and fonts",
          detail:
            "Pick two or three colours and one font pair from free options. Explain that two decisions applied consistently beat a considered palette applied rarely.",
        },
        {
          step: "Define the photo style",
          detail:
            "Set natural light, plain background, phone camera, no filters. Explain that a stated style is what makes images identifiable at thumbnail size.",
        },
        {
          step: "Build two reusable templates",
          detail:
            "Create a quote template and an offer template in the chosen colours and fonts. Explain that reusing templates is what survives a busy week.",
        },
        {
          step: "Set up the asset library",
          detail:
            "Create folders for product photos, customer photos, graphics and logo sizes. Explain that most posting delays are hunting for files rather than writing.",
        },
        {
          step: "Review the finished week",
          detail:
            "Read the whole week in order and check the balance across pillars and types. Explain that seeing the week as a whole is the benefit batching buys you.",
        },
      ],
    },
    practice: {
      title: "Project: one-week content calendar",
      brief:
        "You produce a complete, ready-to-post week for a real business: three content pillars, a day-by-day calendar with one deliberate empty slot, seven written posts balanced across types, a written brand voice with three rules, and a defined colour, font and photo system with two reusable templates.",
      steps: [
        "Record how many hours a week you can genuinely spend on content.",
        "Set your weekly post count from that number rather than from ambition.",
        "Define three content pillars from audience problems, not products.",
        "Test each pillar: could you write thirty posts without repeating yourself?",
        "Map the week day by day, assigning a pillar and a content type to each slot.",
        "Leave one slot deliberately empty for something timely.",
        "Batch-write every caption for the week in a single sitting.",
        "Write your brand voice as three adjectives and three rules.",
        "Rewrite one generic caption against your rules and keep the better version.",
        "Choose two or three colours and one font pair, and record them.",
        "Define your photo style in one sentence: light, background, camera, treatment.",
        "Build two reusable templates in those colours and fonts.",
        "Set up an asset library folder with product photos, customer photos and logo sizes.",
        "Read the whole week in order and adjust the balance across pillars and types.",
      ],
      standard:
        "A one-week calendar set from real available hours, three pillars each passing the thirty-post test, every slot assigned a pillar and a type with one deliberately empty, seven finished captions written in one batch, a brand voice written as three adjectives and three rules that someone else could follow, a recorded colour, font and photo system, two reusable templates and an asset library folder.",
    },
    pitfalls: [
      {
        problem: "You planned daily posts and kept it for eleven days",
        fix: "Build the calendar from hours you actually have. Three posts a week kept for six months produces seventy-five posts and real data; daily posts abandoned after eleven days produce guilt.",
      },
      {
        problem: "Your calendar has no slack",
        fix: "Leave one slot per week empty for something timely. Calendars with no room for reality get abandoned, and the unplanned slot is frequently where the best content comes from.",
      },
      {
        problem: "Your pillars describe your products",
        fix: "Derive pillars from audience problems. 'Our Ankara collection' can only ever talk about you; 'how to choose work clothes that last' can sustain thirty posts and serves the customer.",
      },
      {
        problem: "You make each post from scratch",
        fix: "Batch the whole week in one sitting. Each post made separately costs the full switch into marketing mode, and you never see the sequence a whole week would reveal.",
      },
      {
        problem: "Your voice changes from post to post",
        fix: "Write three adjectives and three rules and apply them every time. A business that sounds formal on Monday and jokey on Wednesday reads as unreliable in a way people feel but cannot name.",
      },
      {
        problem: "Your visuals look different every week",
        fix: "Fix two or three colours, one font pair and one photo style, then apply them always. Two decisions applied consistently beat a considered palette applied rarely.",
      },
      {
        problem: "You are waiting for polish before publishing",
        fix: "Consistency beats polish. A slightly rough post in your recognisable style published on schedule outperforms a beautiful post published three weeks late, every time.",
      },
      {
        problem: "You hunt for files every time you post",
        fix: "Build an asset library and two reusable templates. Most posting delays are not writing delays — they are ten minutes looking for a photo or a logo.",
      },
    ],
    expertNotes: [
      "Set your post count from the hours you genuinely have, not from what a growth guide recommends. An achievable rhythm kept for six months is worth more than an ambitious one kept for a fortnight, and the difference is entirely about honesty with yourself.",
      "Derive content pillars from customer problems rather than from your product list. A problem-based pillar can sustain thirty posts and keeps serving the audience; a product-based one runs out and turns your account into a catalogue.",
      "Write your brand voice as three adjectives and three rules. The test of a defined voice is that someone else could produce it from what you wrote — and if it cannot be written down, it is a mood rather than a system.",
      "Batch the whole week in one sitting and keep an asset library. Batching groups the cost of switching into marketing mode, and the asset library removes the small frictions that are the real reason posts do not go out.",
    ],
    vocabulary: [
      { term: "Content calendar", meaning: "A plan of what will be posted and when, built from real available time rather than ambition." },
      { term: "Content pillar", meaning: "A recurring theme your content returns to. Keeps an account coherent and makes planning fast." },
      { term: "Batching", meaning: "Producing a period's content in one sitting. Groups the cost of switching into marketing mode and reveals the week's sequence." },
      { term: "Brand voice", meaning: "How your business sounds, written as adjectives and rules so anyone can reproduce it." },
      { term: "Visual identity", meaning: "Colours, fonts and photo style applied consistently. What makes a grid look like a business." },
      { term: "Asset library", meaning: "An organised folder of photos, graphics and logo sizes. Removes the friction that stops posts going out." },
      { term: "Template", meaning: "A reusable graphic in your colours and fonts. Faster than starting fresh and survives a busy week." },
      { term: "Posting cadence", meaning: "How often and when you publish. Consistency matters more than frequency." },
    ],
    homework: [
      {
        task: "Set your real post count",
        detail:
          "Count the hours you can genuinely spend weekly, divide by the time one post takes, and round down. That number is your cadence — write it on the calendar.",
      },
      {
        task: "Define three pillars and test them",
        detail:
          "Write three audience-problem pillars and list five post ideas under each. If you cannot reach five, the pillar is too narrow or too product-focused.",
      },
      {
        task: "Write your voice in six items",
        detail:
          "Three adjectives and three rules. Then hand it to someone else and have them write one caption — if it sounds like you, the voice is defined.",
      },
      {
        task: "Batch a full week",
        detail:
          "Set aside two or three hours and write the whole week's captions and shoot the photos in one sitting. Note how much faster it was than one post at a time.",
      },
    ],
    rubric: [
      {
        criterion: "Calendar realism",
        passing: "Has a posting plan.",
        excellent: "A post count derived from genuinely available hours, one deliberately empty slot, and a rhythm that survives a busy week.",
      },
      {
        criterion: "Content pillars",
        passing: "Posts on varied topics.",
        excellent: "Three problem-derived pillars, each passing the thirty-post test, assigned to specific days so the week forms a sequence.",
      },
      {
        criterion: "Batching",
        passing: "Posts when able.",
        excellent: "A whole week produced in one sitting with an asset library and two reusable templates, and the finished week reviewed as a whole.",
      },
      {
        criterion: "Brand voice",
        passing: "Sounds roughly consistent.",
        excellent: "Three adjectives and three rules, written down, reproducible by someone else, and applied in a visible rewrite of a generic caption.",
      },
      {
        criterion: "Visual consistency",
        passing: "Posts look reasonable.",
        excellent: "A recorded colour, font and photo system applied to every post, with templates built in it, chosen for consistency over polish.",
      },
    ],
    faqs: [
      {
        q: "How many posts a week should I aim for?",
        a: "Whatever you can sustain for six months. For most small businesses that is three to five. Count your real available hours, divide by the time one post takes, and round down — an achievable rhythm kept consistently beats an ambitious one abandoned in a fortnight.",
      },
      {
        q: "Do I need a design tool or can I just use my phone?",
        a: "Your phone is enough for photos, and a free design tool is enough for graphics. What matters is two or three colours, one font pair and one photo style applied every time. Consistency reads as professional; expensive tools do not.",
      },
      {
        q: "What if I run out of things to post?",
        a: "You have not run out — you are thinking about your product instead of your customer's problems. One problem yields a buying guide, a mistake post, a comparison, a story and an offer. Ten problems are several months of content.",
      },
      {
        q: "Should my personal account and business account be separate?",
        a: "Usually yes. A business account lets you use analytics, run adverts and hand it to someone else later without sharing your personal profile. But if you are the business — a photographer, a trainer, a consultant — your personal presence can carry the brand, provided the voice stays consistent.",
      },
      {
        q: "How do I keep going when the numbers are low?",
        a: "Judge the first eight to twelve weeks on output, not on results. The numbers are small early because the body of work is small, and almost everyone who quits does so before the work is large enough to produce anything. Keep the cadence and look at the numbers monthly, not daily.",
      },
    ],
  },

  "organic-and-paid-promotion": {
    summary:
      "Organic reach and paid advertising are different tools with different jobs, and using the wrong one for the wrong purpose is how budgets disappear. This session covers how organic distribution works, what paid advertising actually buys you, and how targeting and objectives determine whether money produces customers.",
    objectives: [
      "Explain how organic reach is distributed and what increases it",
      "Distinguish what organic and paid promotion are each good for",
      "Understand the auction model that determines what an advert costs",
      "Choose an ad objective matched to what you actually want",
      "Build audience targeting specific enough to be useful",
      "Plan a small paid test that produces information rather than losses",
    ],
    blocks: [
      {
        heading: "How organic reach actually works",
        body: [
          "Organic reach is not a lottery — it is a **response to signals**. A platform shows your content to a small sample first, watches how they behave, and expands distribution if the signals are good. The signals that matter are **watch time and completion** (did they finish it?), **saves and shares** (was it worth keeping or passing on?), **comments** (did it start a conversation?) and **profile visits and follows** (did it make someone want more?). Likes are the weakest signal of all, which is why a post can get many likes and reach nobody.",
          "This explains several things that otherwise look arbitrary. **The first line matters** because it decides whether the sample keeps reading. **Short, well-paced video** performs because completion rate is easy to achieve. **Useful content** gets saved, which is a strong signal. And **posting when your audience is online** matters because early engagement determines whether distribution expands at all.",
          "Organic is **slow, free and compounding**. It builds an audience that chose you, and that audience is genuinely valuable — but it takes months, and reach is never guaranteed because the platform can change how it distributes tomorrow. That is the honest position: organic is an asset you are building on someone else's land.",
        ],
      },
      {
        heading: "What paid advertising actually buys",
        body: [
          "Paid promotion buys **speed and precision**. Where organic waits for an algorithm to decide, paid puts your content in front of chosen people immediately — a specific age range, location, interest or behaviour — and tells you exactly what it cost. It also lets you **retest**: the same message to two audiences, two messages to the same audience, and know within days which combination works.",
          "The auction is the mechanism. You are not buying a fixed slot; you are bidding against other advertisers for attention from the same people, and what you pay depends on **how many advertisers want that audience and how well your advert performs**. This produces the counter-intuitive result that a better advert can cost less per result than a worse one, because the platform rewards content people engage with. Poor creative is not just ineffective — it is expensive.",
          "The honest limits: paid advertising **amplifies whatever you give it**. A clear message to the right audience produces customers at a predictable cost. A confused message to a broad audience burns money quickly and teaches you almost nothing. And paid cannot fix a business problem — if your prices are wrong, your product is poor or your WhatsApp replies in two days, advertising will simply make more people discover that.",
        ],
      },
      {
        heading: "Choosing an objective",
        body: [
          "Every campaign starts with an objective, and the objective **determines who the platform shows your advert to** — not merely how it is measured. Choose awareness and it seeks people who watch and remember; choose traffic and it seeks clickers; choose messages and it seeks people who start conversations; choose conversions and it seeks people with a history of buying.",
          "This is why an objective chosen carelessly produces a strange result: an awareness campaign measured in reach looks successful while producing no sales, because it was never aimed at buyers. Match the objective to what you actually need next. **New and unknown?** Awareness or reach, cheaply, to build recognition. **Have attention but no enquiries?** Messages or lead generation. **Have enquiries but need volume?** Sales, aimed at people who have already engaged.",
          "The common beginner error is running a **sales objective with no history and no tracking**. The platform has nothing to learn from and no way to know who bought, so it optimises blindly and the cost per result is high. Early campaigns usually perform better with a messages or traffic objective while you gather data, then move to sales once there is a pattern to learn from.",
        ],
      },
      {
        heading: "Audience targeting",
        body: [
          "Targeting has three layers. **Demographics** — age, gender, location — which for a Nigerian business usually means being specific about location: Lagos is not one market, and Ikoyi and Ikorodu are not the same customer. **Interests** — what people follow and engage with — which is useful but broad, since an interest in fashion covers millions. **Behaviours and connections** — people who engaged with your account, visited your site, or look like your existing customers.",
          "The last layer is the most powerful and the least used. **Retargeting** shows your advert to people who already engaged with you — watched a video, visited a page, messaged you — and they convert far more cheaply than strangers, because they already know who you are. A small business spending its whole budget on cold strangers is paying the highest possible price for attention.",
          "Size matters and it is a trade-off. A very narrow audience gets a precise message but can become expensive and exhausted; a very broad one is cheap to reach but the message has to be generic, so it converts poorly. For most small Nigerian businesses the productive range is a **city or two, a defined age band, and two or three genuine interests**, then letting the platform's own optimisation do the fine work rather than stacking twenty narrow conditions.",
        ],
      },
      {
        heading: "Planning a small paid test",
        body: [
          "The way to spend money well is to spend a little first, on purpose. A test needs **one question** — will this message to this audience produce enquiries at a cost I can afford? — and enough budget to answer it. A campaign with ₦2,000 total tells you nothing; the platform never exits its learning phase. Set a **daily budget** you can sustain for at least a week and judge the result at the end of the week, not on day one.",
          "Test **one variable at a time**. Two messages to one audience, or one message to two audiences — not both, or you will not know what caused the difference. Give each variant enough impressions to be meaningful; a difference based on fifty impressions is noise, not information.",
          "Then decide against a number you set **before** you start. If your product's margin can support ₦800 per enquiry, and the test produces enquiries at ₦2,400, the answer is not to spend more — it is that the message, the audience or the offer needs changing. Writing down the target cost per result beforehand is what stops a disappointing campaign from being talked into a second chance.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor compares organic and paid for one business, then builds a complete paid campaign on paper: objective chosen from the business's actual need, three-layer targeting, a small test budget with a target cost per result, and the decision rule that will be applied at the end of the week.",
      steps: [
        {
          step: "Show organic distribution",
          detail:
            "Take a real post and explain how early signals determined its reach. Show that likes are the weakest signal while saves, shares and completion are strong.",
        },
        {
          step: "Diagnose a post that failed",
          detail:
            "Examine a post with likes and no reach and identify the weak first line. Explain that the sample decided early and distribution never expanded.",
        },
        {
          step: "Contrast organic and paid",
          detail:
            "Lay out speed, precision, cost and control side by side. Explain that organic builds an asset slowly while paid buys immediate, measurable attention.",
        },
        {
          step: "Explain the auction",
          detail:
            "Show how competition for an audience and advert quality both set the price. Explain why a better advert can cost less per result than a worse one.",
        },
        {
          step: "Name the honest limits",
          detail:
            "State that paid amplifies whatever you give it. Show that slow WhatsApp replies or wrong prices defeat any budget.",
        },
        {
          step: "Choose the objective",
          detail:
            "Ask what the business needs next and select the objective from that. Explain that the objective determines who sees the advert, not just how it is measured.",
        },
        {
          step: "Show a mismatched objective",
          detail:
            "Display an awareness campaign praised for reach while producing no sales. Explain it was never aimed at buyers.",
        },
        {
          step: "Build demographic targeting",
          detail:
            "Set a city and an age band, and explain that Lagos is not one market — Ikoyi and Ikorodu are different customers.",
        },
        {
          step: "Add interests and behaviours",
          detail:
            "Choose two or three genuine interests, then show the engaged-audience option and explain why it is the most powerful and least used.",
        },
        {
          step: "Set up retargeting",
          detail:
            "Build an audience of people who engaged with the account. Explain that they convert far more cheaply than strangers because they already know you.",
        },
        {
          step: "Set the test budget and question",
          detail:
            "Write the single question the test answers, set a daily budget sustainable for a week, and explain why ₦2,000 total tells you nothing.",
        },
        {
          step: "Write the decision rule",
          detail:
            "Calculate the affordable cost per enquiry from the product margin and record it before launch. Explain that this is what stops a weak campaign getting a second chance.",
        },
      ],
    },
    practice: {
      title: "Plan an organic push and a paid test",
      brief:
        "You design both sides of promotion for one real business: an organic plan built on the signals that actually drive distribution, and a complete paid campaign on paper — objective, three-layer targeting including retargeting, a test budget, and a written decision rule with a target cost per result.",
      steps: [
        "List the signals that drive organic distribution and rank them by strength.",
        "Review your last ten posts and identify which signal each one optimised for.",
        "Rewrite the weakest post's first line to hold attention in the first moment.",
        "Choose the one organic signal you will deliberately optimise for over the next month.",
        "State what the business needs next: recognition, enquiries or volume.",
        "Choose the campaign objective from that need and write one sentence justifying it.",
        "Set demographic targeting: specific cities, an age band, and any other relevant filter.",
        "Choose two or three genuine interests rather than a long narrow stack.",
        "Build a retargeting audience of people who already engaged with the account.",
        "Write the single question the paid test is designed to answer.",
        "Set a daily budget you can sustain for at least seven days.",
        "Calculate the affordable cost per result from the product's margin and write it down.",
        "Decide the one variable the test will change, leaving everything else fixed.",
        "Write the decision rule: what result means scale, change or stop.",
      ],
      standard:
        "An organic plan naming the signals that drive distribution with the weakest post's hook rewritten, plus a written paid campaign: objective chosen from a stated business need and justified, three-layer targeting with specific cities and a retargeting audience, one test question, a daily budget sustainable for seven days, a target cost per result calculated from margin before launch, one variable changed, and a decision rule stating what result means scale, change or stop.",
    },
    pitfalls: [
      {
        problem: "You judge posts by likes",
        fix: "Likes are the weakest distribution signal. Watch completion, saves, shares and comments — a post with many likes and no reach means the sample decided early and distribution never expanded.",
      },
      {
        problem: "You expect paid advertising to fix a business problem",
        fix: "Paid amplifies whatever you give it. If prices are wrong, the product is poor or messages go unanswered for two days, advertising makes more people discover that rather than making more people buy.",
      },
      {
        problem: "You chose the objective by habit rather than need",
        fix: "The objective determines who the platform shows your advert to. An awareness campaign optimised for reach will not produce sales, however good the numbers look.",
      },
      {
        problem: "You ran a sales objective with no history",
        fix: "Without engagement history and conversion data the platform optimises blindly. Start with messages or traffic while you gather data, then move to sales once there is a pattern to learn from.",
      },
      {
        problem: "You spent the whole budget on cold strangers",
        fix: "Build a retargeting audience of people who already engaged with you. They convert far more cheaply, and ignoring them means paying the highest possible price for attention.",
      },
      {
        problem: "You stacked twenty narrow targeting conditions",
        fix: "Use a city or two, an age band and two or three genuine interests, then let the platform optimise. Over-narrowing makes the audience small, expensive and quickly exhausted.",
      },
      {
        problem: "You tested with too little budget",
        fix: "A campaign with ₦2,000 total never exits the learning phase and tells you nothing. Set a daily budget you can sustain for a week and judge the result at the end of it.",
      },
      {
        problem: "You set no target cost per result",
        fix: "Calculate the affordable cost per enquiry from your margin and write it down before launch. Without it, a disappointing campaign always finds a reason to continue.",
      },
    ],
    expertNotes: [
      "Optimise for saves, shares and completion rather than likes. Those signals are what expand distribution, and content built to earn them reaches further than content built to be admired.",
      "Retarget people who already engaged before spending on strangers. It is the most under-used option available to a small business and it converts at a fraction of the cold-audience cost.",
      "Match the objective to what you need next, not to what sounds ambitious. Awareness when unknown, messages when you have attention but no enquiries, sales when you have a pattern worth scaling.",
      "Write your target cost per result before you launch, calculated from your margin. Deciding the pass mark in advance is the only reliable protection against talking a weak campaign into a second week.",
    ],
    vocabulary: [
      { term: "Organic reach", meaning: "Distribution without payment, driven by early signals — completion, saves, shares, comments." },
      { term: "Auction model", meaning: "How ad prices are set: competition for an audience plus advert quality. Better creative can cost less." },
      { term: "Ad objective", meaning: "What the campaign optimises for. Determines who sees the advert, not merely how it is measured." },
      { term: "Audience targeting", meaning: "Choosing who sees an advert by demographics, interests and behaviours." },
      { term: "Retargeting", meaning: "Advertising to people who already engaged with you. Cheaper than cold audiences because they know you." },
      { term: "Cold audience", meaning: "People with no prior contact. The most expensive attention you can buy." },
      { term: "Learning phase", meaning: "The period in which a campaign gathers data before optimising properly. Too small a budget never exits it." },
      { term: "Cost per result", meaning: "What one outcome — enquiry, click, sale — cost you. The number the whole campaign is judged on." },
    ],
    homework: [
      {
        task: "Rank your last ten posts by signal",
        detail:
          "For each, note completion, saves, shares and comments rather than likes. Find the pattern in what expanded and what did not, and rewrite the weakest hook.",
      },
      {
        task: "Choose and justify an objective",
        detail:
          "State what the business needs next — recognition, enquiries or volume — and select the objective that serves it, with one written sentence of justification.",
      },
      {
        task: "Build a retargeting audience",
        detail:
          "Create an audience of people who engaged with the account or visited the site. This is the cheapest attention available to you and most small businesses never set it up.",
      },
      {
        task: "Write the decision rule",
        detail:
          "Calculate the cost per enquiry your margin can support, set a seven-day daily budget, and write what result means scale, change or stop. Do it before launching.",
      },
    ],
    rubric: [
      {
        criterion: "Organic understanding",
        passing: "Knows posts get reach.",
        excellent: "Can name the signals that drive distribution in order of strength, diagnose why a specific post failed, and optimise deliberately for one signal.",
      },
      {
        criterion: "Paid understanding",
        passing: "Knows adverts cost money.",
        excellent: "Can explain the auction, why better creative costs less, what paid cannot fix, and the honest limits of amplifying a weak message.",
      },
      {
        criterion: "Objective selection",
        passing: "Picks an objective.",
        excellent: "Chooses from a stated business need, justifies it in writing, and understands that the objective determines who sees the advert.",
      },
      {
        criterion: "Targeting",
        passing: "Sets an age and location.",
        excellent: "Three layers with specific cities, two or three genuine interests, and a retargeting audience of people who already engaged.",
      },
      {
        criterion: "Test design",
        passing: "Plans to try an advert.",
        excellent: "One question, a daily budget sustainable for seven days, one variable changed, a target cost per result calculated from margin before launch, and a written decision rule.",
      },
    ],
    faqs: [
      {
        q: "How much do I need to start with paid advertising?",
        a: "Enough to run for at least a week at a daily budget the platform can work with. A tiny total never exits the learning phase and tells you nothing. Start with the smallest amount that gives seven days of data, judge it against a target you set beforehand, and scale only what proved itself.",
      },
      {
        q: "Should I boost posts or use the ads manager?",
        a: "Boosting is simpler and reaches people who already follow you and their connections; the ads manager gives real targeting, retargeting and objectives. Use boosting to amplify a post that already performed well organically, and the ads manager for anything you are actually measuring.",
      },
      {
        q: "Why did my advert cost more than my friend's?",
        a: "Cost is set by competition for the same audience and by how well your advert performs. A narrower or more contested audience costs more, and weak creative costs more too, because the platform rewards content people engage with. Compare audiences and creative, not budgets.",
      },
      {
        q: "Is organic dead? Do I have to pay now?",
        a: "Organic reach has fallen, but it is not dead — short video and genuinely useful content still reach far beyond followers. The honest position is that organic is slow and paid is fast, and most businesses need both: organic to build an audience, paid to accelerate what already works.",
      },
      {
        q: "How do I know when to stop a campaign?",
        a: "Against the number you wrote before launching. If your margin supports ₦800 per enquiry and the campaign produces them at ₦2,400 after a full week, stop and change the message, audience or offer. Deciding in advance is what prevents a weak campaign from being argued into another week.",
      },
    ],
  },

  "ads-landing-pages-conversion": {
    summary:
      "Attention is not a sale. This session covers the part most small businesses skip: ad creative and copy that earn the click, a landing page or WhatsApp flow that earns the enquiry, and the follow-up that turns an enquiry into a customer.",
    objectives: [
      "Design ad creative that stops the scroll without misleading",
      "Write ad copy structured around one problem and one offer",
      "Build a landing page or WhatsApp flow that converts visitors",
      "Understand where conversion leaks and how to close each one",
      "Generate and qualify leads rather than collecting contacts",
      "Run a follow-up sequence that closes instead of pestering",
    ],
    blocks: [
      {
        heading: "Ad creative",
        body: [
          "Creative is what the person sees, and it decides whether they stop. On a phone feed the decision takes under a second, so the first frame has to carry it: **a clear subject, high contrast, and something recognisable**. For a product business that usually means the product itself, well lit, filling the frame — not a busy scene, not a logo on a plain background, not a design that looks like a design.",
          "Video outperforms stills in most cases because it holds attention and can show the product in use, but only if the **first two seconds** work. Open with the product, the result or the problem — never with a logo or an introduction. Captions are essential, because a large share of video is watched without sound, and an un-captioned video is silent to most of its viewers.",
          "The temptation to make it beautiful is worth resisting. **Real beats polished** in this market: a phone-shot video of the actual product in an actual Lagos setting, with a real person speaking, usually outperforms a studio shot, because it looks like content rather than advertising, and advertising is scrolled past. Test both if you can — the result is frequently counter-intuitive.",
        ],
      },
      {
        heading: "Ad copy",
        body: [
          "Ad copy has a reliable structure. **Open with the problem**, in the customer's language — the first line does the same job as a caption hook, because it is often all that shows before the 'see more'. **Agitate briefly**: name what the problem costs them, in time, money or frustration. Then **present the offer** clearly: what it is, what it costs, what happens when they act.",
          "Then **prove it** and **ask**. Proof is one specific piece of evidence — a named customer, a number, a guarantee, a delivery time. The ask is one action, stated plainly: 'Send BAG to our WhatsApp on 0803 000 0000' or 'Tap to see prices'. Two asks produce none, and a vague ask ('contact us for more information') produces very few, because it asks the reader to work out what to do.",
          "Two habits make copy convert. **Write like you speak**, in short sentences, using Nigerian expressions where they fit — formal copy reads as advertising and advertising is skipped. And **state the price or the price range**. Hiding it in an advert does not create curiosity; it filters out everyone who would have bought at that price and attracts people who will not, which wastes the budget twice.",
        ],
      },
      {
        heading: "The landing page and the WhatsApp route",
        body: [
          "A **landing page** has one job: take a person who clicked and get them to do one thing. That means one headline stating the offer, one paragraph on who it is for and what it solves, three or four points of proof, a clear price, and one button — repeated near the top and again at the bottom. Every additional link is a way to leave, so remove navigation and anything not serving the action.",
          "Most Nigerian small businesses do not need a landing page; they need a **working WhatsApp route**, and it converts better here because messaging is how buying happens. The route is: the advert says exactly what to send, the WhatsApp Business greeting answers immediately, the catalogue shows products and prices, quick replies answer the common questions, and a human takes over within minutes. Set that up and you have a conversion system.",
          "The leak that destroys most campaigns is **response time**. Someone who messages after seeing an advert is at peak interest for perhaps an hour; a reply the next morning loses most of them to whoever answered first. Automated greeting plus quick replies plus a person who checks messages three times a day is the minimum viable system, and it costs nothing.",
        ],
      },
      {
        heading: "Where conversion leaks",
        body: [
          "Conversion fails at identifiable points, and each has a fix. **Nobody clicks** — the creative or the first line is not stopping the scroll; change the opening, not the offer. **People click but do not message** — the destination does not match the advert, or the ask is unclear; make the advert and the destination say the same thing. **People message but do not buy** — the price, delivery or trust is the obstacle; answer those three questions before they ask.",
          "**People ask the price and disappear** — usually the price was higher than expected and they had no reason to justify it; state what the price includes and offer a smaller option. **People buy once and never return** — there is no follow-up, which is the cheapest revenue most businesses never collect.",
          "Diagnose by working backwards through the numbers. If a campaign gets a thousand impressions, forty clicks and one enquiry, the problem is between click and enquiry, not in the advert. Fixing the wrong stage is the most common waste in paid promotion, and it is avoidable simply by looking at where the drop actually happens rather than guessing.",
        ],
      },
      {
        heading: "Lead generation and follow-up",
        body: [
          "A **lead** is a person who has shown interest and given you a way to reach them. Not every message is a lead — some are curiosity, some are price-shopping, some are mistakes. Qualify quickly with two questions: what do they need, and when do they need it? That takes one message and it tells you where to spend your attention.",
          "Record leads somewhere. A notebook works; a spreadsheet with name, contact, what they want, when they need it and status works better; WhatsApp labels work best because they live where the conversation is. Label them **new**, **quoted**, **follow-up**, **won**, **lost**. Without a record, follow-up depends on memory, and memory fails at exactly the wrong moment.",
          "Then follow up **without pestering**. Most sales happen after the first message, and most businesses stop after one reply. The sequence that works: answer fully the first time, then if there is no reply, follow up in a day or two with new information rather than 'any update?' — a photo of the item, a delivery date, a small deadline. Two or three useful follow-ups is persistence; after that, stop, because continuing damages the brand you are trying to build.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor takes one offer and builds the whole conversion path live: ad creative shot on a phone, ad copy written against the structure, a WhatsApp Business flow with greeting, catalogue and quick replies, a leak diagnosis from real numbers, and a three-step follow-up sequence.",
      steps: [
        {
          step: "State the offer precisely",
          detail:
            "Write what is being sold, to whom, at what price, with what delivery. Explain that every later decision follows from this one sentence.",
        },
        {
          step: "Shoot the creative on a phone",
          detail:
            "Film the product in use, in real light, with the first two seconds carrying the offer. Explain why real beats polished in this market.",
        },
        {
          step: "Add captions",
          detail:
            "Caption the video and explain that most viewers watch without sound, so an un-captioned video is silent to the majority of its audience.",
        },
        {
          step: "Write the ad copy",
          detail:
            "Follow problem, agitation, offer, proof, ask. Read it aloud and cut anything formal.",
        },
        {
          step: "State the price",
          detail:
            "Put the price or range in the advert and explain that hiding it filters out buyers and attracts people who will not buy.",
        },
        {
          step: "Write one clear ask",
          detail:
            "Specify exactly what to send and where. Show a vague version and explain why 'contact us for more information' produces almost nothing.",
        },
        {
          step: "Set up the WhatsApp greeting",
          detail:
            "Write an automated greeting that answers immediately and says what happens next. Explain that it covers the gap before a human replies.",
        },
        {
          step: "Build the catalogue",
          detail:
            "Add products with prices and photos. Explain that a catalogue answers the price question before the customer has to ask.",
        },
        {
          step: "Write quick replies",
          detail:
            "Answer delivery time, payment, sizing and location in one tap each. Show how this removes the delay that loses most enquiries.",
        },
        {
          step: "Diagnose the leak",
          detail:
            "Take real numbers — impressions, clicks, enquiries, sales — and identify the stage where the drop happens. Explain why fixing the wrong stage is the most common waste.",
        },
        {
          step: "Qualify a lead in one message",
          detail:
            "Ask what they need and when. Show how one message separates buyers from price-shoppers.",
        },
        {
          step: "Label and record",
          detail:
            "Apply WhatsApp labels for new, quoted, follow-up, won and lost. Explain that follow-up based on memory fails at the worst moment.",
        },
        {
          step: "Write the follow-up sequence",
          detail:
            "Draft two or three follow-ups that each add new information rather than asking for an update, and state when to stop.",
        },
      ],
    },
    practice: {
      title: "Build the conversion path for one offer",
      brief:
        "You take a single real offer and build every step from advert to sale: phone-shot creative, structured ad copy, a WhatsApp Business flow with greeting, catalogue and quick replies, a leak diagnosis from real numbers, and a labelled lead list with a written follow-up sequence.",
      steps: [
        "Write the offer in one sentence: what, for whom, at what price, delivered how.",
        "Shoot creative on your phone, making the first two seconds carry the product or the problem.",
        "Add captions to any video and check it makes sense with the sound off.",
        "Write ad copy following problem, agitation, offer, proof, ask.",
        "State the price or price range in the advert.",
        "Write exactly one clear ask, specifying what to send and where.",
        "Read the copy aloud and cut anything that sounds like a notice rather than a person.",
        "Write an automated WhatsApp greeting that answers immediately and states what happens next.",
        "Build a WhatsApp catalogue with products, prices and photos.",
        "Write quick replies for the five questions you answer most often.",
        "Pull real numbers — impressions, clicks, enquiries, sales — and find the stage with the biggest drop.",
        "Write the one change that addresses that specific stage.",
        "Qualify an incoming lead in one message: what they need and when.",
        "Set up WhatsApp labels for new, quoted, follow-up, won and lost.",
        "Write two or three follow-up messages, each adding new information, and decide when to stop.",
      ],
      standard:
        "One stated offer, phone-shot creative whose first two seconds carry it with captions verified sound-off, ad copy following the five-part structure with the price stated and exactly one ask, a WhatsApp flow with immediate greeting, priced catalogue and quick replies for the top five questions, a leak diagnosis identifying the biggest drop stage with one targeted change, and a labelled lead list with a written follow-up sequence that adds information and knows when to stop.",
    },
    pitfalls: [
      {
        problem: "Your creative opens with a logo or an introduction",
        fix: "The first two seconds decide whether anyone stays. Open with the product, the result or the problem. Nobody waits through a logo to find out what you sell.",
      },
      {
        problem: "Your video has no captions",
        fix: "Most video is watched without sound. An un-captioned video is silent to the majority of its viewers, and the message never arrives.",
      },
      {
        problem: "You hid the price in the advert",
        fix: "State it. Hiding the price filters out the people who would have bought and attracts those who will not, wasting the budget twice — once on the click and again on the conversation.",
      },
      {
        problem: "Your ask is vague",
        fix: "Say exactly what to send and where. 'Contact us for more information' asks the reader to work out what to do, and most will not.",
      },
      {
        problem: "Your advert and destination say different things",
        fix: "Make them match. A click followed by a page or profile that does not continue the advert's promise loses the person at the most expensive moment in the funnel.",
      },
      {
        problem: "You reply to enquiries the next morning",
        fix: "Interest peaks within about an hour of the advert. Set an automated greeting, prepare quick replies and check messages several times a day — whoever answers first usually wins.",
      },
      {
        problem: "You fix the stage you assumed rather than the one that failed",
        fix: "Work backwards through impressions, clicks, enquiries and sales to find the actual drop. Fixing the wrong stage is the most common waste in paid promotion.",
      },
      {
        problem: "You stop after one follow-up",
        fix: "Most sales happen after the first message. Send two or three follow-ups that each add new information rather than asking for an update, then stop — persistence sells, pestering damages.",
      },
    ],
    expertNotes: [
      "Shoot real rather than polished. A phone-shot video of the actual product in an actual setting usually outperforms studio work in this market, because it reads as content rather than advertising, and advertising is what people scroll past.",
      "Put the price in the advert. It feels like giving away leverage and in practice it saves money: it filters out people who would never buy at that price and brings you conversations that can actually close.",
      "Fix response time before anything else. An automated greeting, quick replies and someone checking messages three times a day cost nothing and recover more sales than any change to the advert, because peak interest lasts about an hour.",
      "Diagnose from the numbers, working backwards. Impressions, clicks, enquiries, sales — find the biggest drop and change only that stage. Guessing which stage failed is the most expensive habit in paid promotion.",
    ],
    vocabulary: [
      { term: "Ad creative", meaning: "The image or video the viewer sees. Decides whether they stop, in under a second." },
      { term: "Ad copy", meaning: "The written part: problem, agitation, offer, proof, ask. Structure, not inspiration." },
      { term: "Landing page", meaning: "A page with one job and one action. Every extra link is a way to leave." },
      { term: "Call-to-action", meaning: "The single specific thing you ask for. One ask, stated plainly, with the route included." },
      { term: "Conversion rate", meaning: "The proportion of visitors who take the action. The measure of whether the path works." },
      { term: "Conversion leak", meaning: "A specific point where people drop out. Each stage has a different cause and a different fix." },
      { term: "Lead qualification", meaning: "Establishing what someone needs and when, so attention goes to buyers rather than price-shoppers." },
      { term: "Follow-up sequence", meaning: "Planned further contact that adds new information each time. Most sales happen after the first message." },
    ],
    homework: [
      {
        task: "Rewrite one advert end to end",
        detail:
          "Take an existing advert and rebuild it: new first two seconds, captions, five-part copy with the price stated and one clear ask. Run it alongside the original and compare.",
      },
      {
        task: "Build the WhatsApp flow",
        detail:
          "Automated greeting, catalogue with prices, and quick replies for your five most common questions. Then message yourself as a customer and time how long the key answers take.",
      },
      {
        task: "Find your biggest leak",
        detail:
          "Write down impressions, clicks, enquiries and sales for a recent campaign, calculate the drop at each stage, and name the one change that addresses the biggest fall.",
      },
      {
        task: "Write your follow-up sequence",
        detail:
          "Two or three messages, each adding new information — a photo, a delivery date, a deadline — and a stated point at which you stop. Apply it to every lead from the last month.",
      },
    ],
    rubric: [
      {
        criterion: "Creative",
        passing: "Posts product photos.",
        excellent: "First two seconds carry the product or problem, captions verified sound-off, real rather than polished, and the subject clear at thumbnail size.",
      },
      {
        criterion: "Copy",
        passing: "Describes the product.",
        excellent: "Follows problem, agitation, offer, proof, ask; states the price; ends with exactly one clear ask including the route; reads like a person, not a notice.",
      },
      {
        criterion: "Conversion path",
        passing: "Has a contact number.",
        excellent: "WhatsApp greeting answering immediately, priced catalogue, quick replies for the top five questions, and advert and destination saying the same thing.",
      },
      {
        criterion: "Diagnosis",
        passing: "Knows sales were low.",
        excellent: "Working backwards through impressions, clicks, enquiries and sales to name the biggest drop and one targeted change for that stage only.",
      },
      {
        criterion: "Leads and follow-up",
        passing: "Replies to messages.",
        excellent: "Leads qualified in one message, labelled and recorded, with a written sequence adding new information each time and a stated point to stop.",
      },
    ],
    faqs: [
      {
        q: "Do I need a website to run adverts?",
        a: "No. In Nigeria a WhatsApp Business flow converts better than a landing page for most small businesses, because buying happens in messages. Set up a greeting, a priced catalogue and quick replies, and your advert can send people straight there.",
      },
      {
        q: "Should I put the price in the advert?",
        a: "Yes. It feels like losing leverage and actually saves money: it filters out people who would never buy at that price and brings conversations that can close. Hiding it attracts the wrong enquiries and costs you twice.",
      },
      {
        q: "My adverts get clicks but no sales. What is wrong?",
        a: "Look at where the drop happens. Clicks with no messages means the destination does not match the advert or the ask is unclear. Messages with no sales means price, delivery or trust is the obstacle. Fix the stage that failed rather than the advert that worked.",
      },
      {
        q: "How fast do I need to reply?",
        a: "Within minutes if you can. Interest peaks within about an hour of seeing the advert, and whoever answers first usually wins. An automated greeting buys you the first few minutes; quick replies and checking messages several times a day is the minimum viable system.",
      },
      {
        q: "How many times should I follow up?",
        a: "Two or three, each adding new information — a photo, a delivery date, a small deadline — rather than asking 'any update?'. Most sales happen after the first message, but continuing past three damages the brand you are building, so stop and move on.",
      },
    ],
  },
};
