import type { SessionLecture } from "../types";

/**
 * Digital Marketing — ₦20,000 · 4 weeks · 8 sessions.
 * Sessions 1 to 3. (Sessions 4–6 in digital-marketing-b.ts, 7–8 in digital-marketing-c.ts.)
 */
export const digitalMarketingLessonsA: Record<string, SessionLecture> = {
  "marketing-fundamentals": {
    summary:
      "Before a single post, this session builds the foundation every campaign rests on: what digital marketing actually is, how it differs from traditional marketing, who your customer really is, what problem you solve, and why most Nigerian businesses get very little return on a great deal of spending.",
    objectives: [
      "Explain what digital marketing is and how it differs from traditional marketing",
      "Define a target audience specifically enough to change what you post",
      "Identify the customer problem your product actually solves",
      "Write a value proposition a stranger understands in one sentence",
      "Establish a basic brand identity and digital presence",
      "Map the marketing channels and understand what each is for",
    ],
    blocks: [
      {
        heading: "What digital marketing actually is",
        body: [
          "Digital marketing is **the work of getting the attention of specific people online, giving them a reason to act, and measuring whether they did**. Three parts, and almost every failure in this market comes from doing only the middle one. Businesses post. They rarely decide who they are posting to, and they almost never measure whether it worked. So the activity looks like marketing while producing nothing measurable, and after months the owner concludes that 'social media does not work for my kind of business'.",
          "That conclusion is nearly always wrong. What failed was not the channel — it was the absence of an audience definition and the absence of measurement. Digital marketing is not a collection of platforms and tricks; it is a **system**: audience, message, channel, content, promotion, measurement. Break the system anywhere and the rest leaks. This course follows that order deliberately, because the later sessions only work once the first ones are solid.",
          "The other thing worth naming: digital marketing is **cheap to test and brutal to ignore**. A flyer campaign costs money before you learn anything. A digital campaign costs almost nothing and tells you within a week whether the message landed. That asymmetry is the whole reason it has displaced traditional marketing for small businesses — but only for those who actually look at the numbers.",
        ],
      },
      {
        heading: "Traditional versus digital",
        body: [
          "Traditional marketing — radio jingles, billboards, newspaper adverts, printed flyers, market shouting — reaches **many people at once, cannot be targeted, and cannot be measured**. You pay for the audience you get. A billboard on the Third Mainland Bridge is seen by thousands, of whom perhaps a dozen are looking for what you sell, and you will never know who they were or what they did next. It builds broad awareness and it is expensive per useful impression.",
          "Digital marketing reaches **fewer people at a time, chosen deliberately, and every one of them can be counted**. You can show an advert to women aged 25–40 in Lagos who follow interior decor, and know exactly how many saw it, how many clicked, and what it cost per click. You can stop it tomorrow and spend the money elsewhere. The trade-off is that digital requires **skill and consistency** where traditional mainly requires money.",
          "They are not really competitors. Traditional is good at **awareness at scale**; digital is good at **precision and proof**. Most Nigerian small businesses should spend almost nothing on traditional and everything on digital, simply because a ₦20,000 monthly budget spread across radio and flyers reaches nobody meaningfully, while ₦20,000 of disciplined digital work can produce actual customers. The point of the comparison is not ideology — it is that your budget is finite and you should understand what each channel does before choosing.",
        ],
      },
      {
        heading: "Customer and target audience",
        body: [
          "Your **customer** is anyone who buys. Your **target audience** is the specific group you are trying to reach, described precisely enough that it changes what you say. The distinction matters because 'anyone who needs shoes' is a customer description, not an audience — you cannot write a message for everyone, and a message written for everyone lands with no one.",
          "A useful audience definition has **demographics** (age, gender, location, income), **behaviour** (where they spend time online, what they buy, how they buy), and **psychographics** (what they care about, what they fear, what they are trying to become). 'Women, 25–38, in Lagos and Abuja, working professionals, buy online at least monthly, follow fashion and home accounts, worried about looking professional without overspending' is an audience. You can write for that person. You cannot write for 'women'.",
          "Then the discipline that separates working campaigns from decoration: **narrow deliberately**. A narrower audience gets a sharper message, a higher response rate and a lower cost per result. A broad audience gets a bland message, a poor response and a high cost. It feels counter-intuitive — surely more people means more sales? — but it is wrong, and it is the single most expensive mistake beginners make with paid promotion.",
        ],
      },
      {
        heading: "The customer problem and your value proposition",
        body: [
          "Nobody buys products. People buy the **end of a problem** or the **arrival of a feeling**. A generator is not bought; uninterrupted power is. A course is not bought; a skill that changes what someone can earn is. If you cannot name the problem you end, your marketing will describe features, and features do not move anyone.",
          "So write the problem in the customer's own words, not yours. Not 'we provide affordable fashion' but 'I cannot find work clothes that look expensive without costing what a month's rent costs'. The second sentence is the one that makes someone stop scrolling, because it sounds like their own thought. Listen for how customers describe their problem — in comments, in WhatsApp messages, in what they say before buying — and use their language rather than inventing better language.",
          "Your **value proposition** is one sentence that says what you offer, to whom, and why it is different. Not a slogan, and not a list of features: 'Handmade leather work bags for Nigerian professionals, built to last five years and delivered in Lagos within 48 hours.' Someone who does not know you should read that and understand exactly what you sell and why they should care. Most businesses cannot produce that sentence, which is why their marketing wanders.",
        ],
      },
      {
        heading: "Branding and digital presence",
        body: [
          "**Branding** is not a logo. It is the set of associations people hold about you — what you are known for, how reliable you seem, how you sound. A logo is a symbol that points at those associations. A business with a beautiful logo and no consistency in how it speaks or behaves has no brand, only a picture.",
          "Three things actually build a brand at small scale: **a consistent visual identity** (same colours, same fonts, recognisable photo style across every post), **a consistent voice** (you sound like the same person every time), and **repeated proof** (delivering on promises publicly, showing real customers, showing the work). Those are all free and all under your control, which is why branding is not a budget item.",
          "Your **digital presence** is everywhere a customer could look for you and what they find there: your Instagram, your Facebook page, your WhatsApp business profile, your Google Business Profile, your website if you have one, and what people say about you. Check what a stranger would find by searching your business name today. Incomplete profiles, no prices, no way to order and no reviews are a silent tax on every campaign you will ever run, because the advert sends people somewhere that does not convince them.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor takes one real Nigerian small business and builds its entire foundation in front of the class: the audience, the customer problem in the customer's own words, the value proposition, the brand basics, and an audit of what a stranger would find by searching for it today.",
      steps: [
        {
          step: "Pick a real business",
          detail:
            "Choose a business with real products and real customers, not a hypothetical one, so every decision has an actual answer rather than a plausible guess.",
        },
        {
          step: "List everyone who has bought",
          detail:
            "Write down actual customers from the last few months. Explain that the audience is derived from real buyers rather than invented from what the owner wishes.",
        },
        {
          step: "Find the pattern",
          detail:
            "Group the buyers by age, location, job and reason for buying. Show how a pattern emerges that is narrower than the owner assumed.",
        },
        {
          step: "Write the audience statement",
          detail:
            "Draft demographics, behaviour and psychographics in one paragraph, then test whether it is specific enough to change what you would post.",
        },
        {
          step: "Collect problem language",
          detail:
            "Pull real phrases from comments and WhatsApp messages. Explain that using the customer's words outperforms better-written invented language.",
        },
        {
          step: "Name the problem being solved",
          detail:
            "State the end of the problem rather than the product. Show how a generator becomes uninterrupted power and a course becomes an income change.",
        },
        {
          step: "Draft the value proposition",
          detail:
            "Write one sentence: what, for whom, and why different. Then read it to someone who does not know the business and ask what they understood.",
        },
        {
          step: "Compare with the slogan",
          detail:
            "Show the difference between a slogan and a value proposition, and explain why a slogan cannot carry a campaign while a value proposition can.",
        },
        {
          step: "Audit the digital presence",
          detail:
            "Search the business name as a stranger would. Note incomplete profiles, missing prices, no ordering route and absent reviews.",
        },
        {
          step: "Score the presence",
          detail:
            "Rate each channel present, incomplete or missing, and list the five fixes in order of impact before any money is spent on promotion.",
        },
        {
          step: "Map the channels",
          detail:
            "List every channel the business could use and mark which the audience actually occupies. Explain that a channel your audience is not on is a channel you cannot use.",
        },
        {
          step: "Choose one primary channel",
          detail:
            "Select the single channel where the audience is most present and explain why doing one channel properly beats doing four badly.",
        },
      ],
    },
    practice: {
      title: "Build the marketing foundation for one real business",
      brief:
        "You take a real Nigerian business — yours or one you know — and produce its complete foundation: a specific audience statement, the customer problem written in the customer's own words, a tested value proposition, a basic brand identity and a digital-presence audit with five prioritised fixes.",
      steps: [
        "List ten real people who have bought from the business, with age, location and occupation.",
        "Group them and write the pattern you actually see, not the one you hoped for.",
        "Write an audience statement covering demographics, behaviour and psychographics.",
        "Test the statement: is it specific enough to change what you would post? If not, narrow it.",
        "Collect five real phrases customers used to describe their problem before buying.",
        "Write the problem the business ends, in those words rather than in your own.",
        "Draft a value proposition: what, for whom, and why different — one sentence.",
        "Read it to someone who does not know the business and record what they understood.",
        "Revise until a stranger can repeat back what is sold and why it matters.",
        "Define three brand basics: colours, voice and photo style, with an example of each.",
        "Search the business name as a stranger would and record everything you find.",
        "Rate each channel present, incomplete or missing.",
        "List five fixes to the digital presence, ordered by impact rather than by ease.",
        "Choose one primary channel and write one sentence justifying the choice.",
      ],
      standard:
        "A one-page foundation document: an audience statement specific enough to change what you post, the customer problem written in real customer language with sources, a value proposition a stranger repeated back correctly, three defined brand basics with examples, a digital-presence audit rating every channel, five prioritised fixes, and one primary channel with a written justification.",
    },
    pitfalls: [
      {
        problem: "Your audience is 'everyone'",
        fix: "Narrow deliberately. A message written for everyone lands with no one, and a broad audience raises your cost per result while lowering your response rate. Narrow feels like losing customers and actually gains them.",
      },
      {
        problem: "You invented the audience instead of looking at real buyers",
        fix: "List ten actual customers and find the pattern. An audience derived from who already buys is sharper and more accurate than one derived from who you wish would buy.",
      },
      {
        problem: "You described features instead of ending a problem",
        fix: "State the problem the product ends in the customer's own words. Features inform; the end of a problem persuades. Nobody buys a generator — they buy uninterrupted power.",
      },
      {
        problem: "You have a slogan instead of a value proposition",
        fix: "Write one sentence saying what you offer, to whom and why it is different. A slogan is memorable but carries no information, and a campaign cannot be built on it.",
      },
      {
        problem: "You think branding is a logo",
        fix: "Branding is the associations people hold, built by consistent visuals, consistent voice and repeated public proof. A logo without consistency is only a picture.",
      },
      {
        problem: "You started promoting before fixing your presence",
        fix: "Audit what a stranger finds when they search your business name. Sending paid traffic to an incomplete profile with no prices and no ordering route wastes the budget before the advert ever fails.",
      },
      {
        problem: "You are trying to be on every platform",
        fix: "Pick the one channel where your audience is most present and do it properly. Four abandoned profiles damage you more than one maintained profile builds you.",
      },
    ],
    expertNotes: [
      "Narrow your audience on purpose. It is the most counter-intuitive lesson in marketing and the most profitable: a sharper message to fewer people costs less per result and converts better than a bland message to everyone.",
      "Use the customer's own words for the problem, gathered from comments and WhatsApp messages. Their phrasing is already validated as resonating; anything you invent has to be tested from scratch.",
      "Test your value proposition on someone who does not know your business. If they cannot repeat back what you sell and why it matters, it is a slogan rather than a value proposition, however good it sounds to you.",
      "Audit your digital presence before spending a naira on promotion. Incomplete profiles and missing prices quietly defeat every campaign, and the fix is free.",
    ],
    vocabulary: [
      { term: "Target audience", meaning: "The specific group you are trying to reach, described precisely enough to change what you say." },
      { term: "Demographics", meaning: "Age, gender, location and income — the countable parts of an audience." },
      { term: "Psychographics", meaning: "What people care about, fear and aspire to — the part that shapes the message." },
      { term: "Pain point", meaning: "The problem the customer is trying to end. Marketing that names it persuades; marketing that ignores it describes." },
      { term: "Value proposition", meaning: "One sentence: what you offer, to whom, and why it is different. Not a slogan." },
      { term: "Brand identity", meaning: "Consistent visuals, voice and behaviour that build associations. The logo is only its symbol." },
      { term: "Digital presence", meaning: "Everything a stranger finds when searching your business. The silent tax on every campaign." },
      { term: "Marketing channel", meaning: "The medium through which you reach an audience. A channel your audience does not occupy is not available to you." },
    ],
    homework: [
      {
        task: "Write your audience statement",
        detail:
          "One paragraph covering demographics, behaviour and psychographics for a real business, derived from ten actual buyers. Test whether it is narrow enough to change what you post.",
      },
      {
        task: "Collect five real problem phrases",
        detail:
          "Screenshot or transcribe how actual customers described their problem before buying. This language will feed every caption and advert you write in this course.",
      },
      {
        task: "Test your value proposition on a stranger",
        detail:
          "Read your one sentence to someone who does not know the business and write down exactly what they understood. Revise until they repeat it back correctly.",
      },
      {
        task: "Audit your digital presence",
        detail:
          "Search your business name as a stranger would, rate every channel present, incomplete or missing, and list five fixes ordered by impact.",
      },
    ],
    rubric: [
      {
        criterion: "Audience definition",
        passing: "Describes customers broadly.",
        excellent: "A statement covering demographics, behaviour and psychographics, derived from real buyers, narrow enough to change what you would post.",
      },
      {
        criterion: "Problem identification",
        passing: "Says what the product does.",
        excellent: "Names the problem being ended, written in real customer language collected from actual conversations.",
      },
      {
        criterion: "Value proposition",
        passing: "Has a tagline.",
        excellent: "One sentence stating what, for whom and why different, verified by a stranger repeating it back correctly.",
      },
      {
        criterion: "Branding",
        passing: "Has a logo.",
        excellent: "Three defined brand basics — colours, voice, photo style — with examples, and an understanding that consistency builds the brand rather than the symbol.",
      },
      {
        criterion: "Channel selection",
        passing: "Lists platforms.",
        excellent: "Every channel rated present, incomplete or missing, five prioritised fixes, and one primary channel chosen with a written justification.",
      },
    ],
    faqs: [
      {
        q: "Do I need money to start digital marketing?",
        a: "No. Everything in this session is free: defining an audience, writing a value proposition, fixing incomplete profiles and posting consistently. Money enters later with paid promotion, and by then the foundation determines whether the money produces customers or disappears.",
      },
      {
        q: "My business sells to everybody. How do I narrow?",
        a: "You sell to everybody in the sense that many kinds of person could buy. But your marketing must speak to one kind at a time. Look at who actually buys most often and start there — you can build a second audience later once the first is working.",
      },
      {
        q: "What is the difference between a value proposition and a slogan?",
        a: "A slogan is memorable and says almost nothing; a value proposition says what you offer, to whom and why it is different. 'Quality you can trust' is a slogan. 'Handmade leather work bags for Nigerian professionals, delivered in Lagos within 48 hours' is a value proposition. Only the second can carry a campaign.",
      },
      {
        q: "Is branding really necessary for a small business?",
        a: "You already have a brand — it is whatever people think when your name comes up. The question is whether it is deliberate. Consistent colours, a consistent voice and public proof cost nothing and are what make an advert recognisable rather than anonymous.",
      },
      {
        q: "How do I know which channel to pick?",
        a: "Look at where your actual customers spend time, not where marketing advice says people are. Ask ten recent buyers how they found you and where they spend time online. Their answers beat any general recommendation, because your audience is not the average audience.",
      },
    ],
  },

  "choosing-your-platforms": {
    summary:
      "Facebook, Instagram, TikTok, WhatsApp, websites, email and search all work — for different audiences, with different content and at different costs. This session teaches you to choose deliberately based on who your customers are rather than which platform is fashionable.",
    objectives: [
      "Describe each major platform's audience, content format and strengths",
      "Match platforms to a specific audience rather than to fashion",
      "Understand what each platform costs in time and in money",
      "Recognise the role a website and email play alongside social",
      "Understand how search differs from social as a channel",
      "Choose a primary and secondary channel with written justification",
    ],
    blocks: [
      {
        heading: "Facebook and Instagram",
        body: [
          "**Facebook** has the widest and oldest reach in Nigeria — it is where families, businesses, community groups and older professionals are. Its strengths are **groups**, which are powerful for niche communities and local trading, **marketplace**, **events**, and a comment-and-share culture that spreads things widely. Content that works is text with an image, direct offers, community conversation, and long-form posts that tell a story. Its advertising is mature and cheap per result, and its targeting is detailed.",
          "**Instagram** skews younger and is **visual-first**: what you post has to look good. Its formats are feed posts, Stories, Reels and broadcasts, and Reels currently reach far beyond your followers, which makes it the strongest free discovery tool for a visual business. Its audience shops — clothing, food, beauty, interiors, events — and its direct messages and link-in-bio drive real sales. If your product is photographed well, Instagram is probably your primary channel.",
          "The two share an advertising platform, so you can plan them together and let the delivery system place your advert where it performs. In practice most Nigerian small businesses should run **Instagram for visual discovery and Facebook for community and older buyers**, and the choice between them should come from where their actual customers are, not from which is currently talked about more.",
        ],
      },
      {
        heading: "TikTok and WhatsApp",
        body: [
          "**TikTok** is short-form video, skews young, and has the most aggressive **organic reach** of any platform — a new account with no followers can reach hundreds of thousands if the content holds attention. Its currency is entertainment and authenticity: rough, fast, face-forward video outperforms polished advertising. It is excellent for awareness and for building a personal brand quickly, and weaker for direct selling, because the audience is browsing rather than shopping. It also demands volume — a few posts will not tell you anything.",
          "**WhatsApp** is the **closing channel** in Nigeria. Nobody discovers you there, but a huge proportion of sales close there, because it is personal, immediate and trusted. WhatsApp Business adds a catalogue, quick replies, labels and automated greetings, which turn it into a simple sales system. Broadcast lists reach many people at once — and unlike a group, recipients do not see each other, which protects their privacy and avoids the group spam that makes people leave.",
          "The pattern that works: **social platforms create attention, WhatsApp converts it**. Every post, bio and advert should end somewhere a person can message you, and your WhatsApp should be set up to answer quickly and consistently. A business that drives traffic to a WhatsApp that replies two days later has spent money to lose customers.",
        ],
      },
      {
        heading: "Websites, email and search",
        body: [
          "A **website** is the only channel you own. Social accounts can be suspended, algorithms change, reach falls — a website does not depend on anyone's goodwill. It is also where you can be **found rather than pushed**: someone searching for a solution lands on you without you paying for their attention. For a small business, a simple site with your products, prices, proof and a way to contact you is worth more than most paid campaigns, and Web Design covers building one.",
          "**Email** is underused here and quietly powerful. It reaches people who already chose to hear from you, costs nothing, and is not throttled by an algorithm. Its limits are that building a list takes time and that in Nigeria email is weaker for consumer retail than for professional services, education and B2B — so it suits courses, agencies, consultants and anything sold to businesses far better than fashion or food.",
          "**Search** is different in kind from social. On social you interrupt someone's browsing; in search you **answer a question they already asked**. Someone searching 'leather work bag Lagos' is closer to buying than anyone scrolling Instagram, which is why search traffic converts better. It is slower to build and it compounds — a page that ranks keeps producing customers for years without further payment.",
        ],
      },
      {
        heading: "Choosing deliberately",
        body: [
          "The decision has three questions, in this order. **Where is your audience?** Ask ten recent buyers where they spend time and how they found you. Their answers beat any general advice, because your audience is not the average Nigerian internet user.",
          "**What content can you actually produce consistently?** A platform that rewards daily video is a bad choice if you cannot make video weekly, and a channel you abandon after three weeks does more damage than one you never started. Consistency beats platform choice more often than people expect — a mediocre channel maintained weekly outperforms an excellent channel maintained monthly.",
          "**What does it cost?** Cost is time as well as money. TikTok costs hours of filming and editing; email costs almost nothing once a list exists; search costs patience; paid social costs naira and attention to the numbers. Match the cost to what you can genuinely sustain for six months, because that is the timescale on which any of this starts working.",
        ],
      },
      {
        heading: "One primary, one secondary — and the rest wait",
        body: [
          "The structure that works for a small business is **one primary channel and one supporting channel**, with everything else deliberately left alone. For most visual product businesses that is Instagram plus WhatsApp. For a service business it might be Facebook plus a website. For a professional service, a website plus email.",
          "The reason is attention. Each platform has its own format, its own audience expectation and its own posting rhythm, and learning one properly takes weeks. Four platforms means four mediocre presences, four audiences you barely understand and no data from any of them. One platform done properly produces a body of work, real numbers, and a following — which you can then extend to a second channel with something to extend from.",
          "And be honest about **presence versus absence**. A platform you are not on is not necessarily a mistake, but a platform you are on with a last post from eight months ago is worse than not being there at all, because it tells a customer the business has stopped. If you cannot maintain a channel, remove it from your profiles rather than leaving evidence of neglect.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor compares all seven channels side by side for two contrasting Nigerian businesses — a fashion retailer and a professional service — showing how audience, content capability and cost produce completely different platform decisions.",
      steps: [
        {
          step: "Lay out the seven channels",
          detail:
            "Build a comparison table: audience age, content format, organic reach, selling strength and cost in time and money.",
        },
        {
          step: "Show Facebook's strengths",
          detail:
            "Demonstrate groups, marketplace and events. Explain that its wide, older reach suits community and local trading rather than visual discovery.",
        },
        {
          step: "Show Instagram's discovery engine",
          detail:
            "Compare a feed post's reach with a Reel's and explain why Reels reach beyond followers, making them the strongest free discovery tool for a visual business.",
        },
        {
          step: "Show TikTok's reach and its limits",
          detail:
            "Demonstrate rough, fast, face-forward video outperforming polished advertising, and explain that it builds awareness quickly while selling poorly.",
        },
        {
          step: "Set up WhatsApp Business",
          detail:
            "Configure a catalogue, quick replies, labels and an automated greeting. Explain that this is the closing channel where Nigerian sales actually happen.",
        },
        {
          step: "Show broadcast versus group",
          detail:
            "Demonstrate a broadcast list and explain that recipients cannot see each other, which protects privacy and avoids the spam that empties groups.",
        },
        {
          step: "Audit a website as a customer",
          detail:
            "Visit a simple business site and check products, prices, proof and a contact route. Explain that it is the only channel you own and cannot be taken away.",
        },
        {
          step: "Compare email for two business types",
          detail:
            "Show why email suits a course or agency and not a fashion label. Explain that channel strength depends on where the buying conversation happens.",
        },
        {
          step: "Contrast search with social",
          detail:
            "Show that search answers a question already asked while social interrupts browsing, and explain why that makes search traffic convert better.",
        },
        {
          step: "Decide for the fashion retailer",
          detail:
            "Choose Instagram plus WhatsApp and justify it from the audience's visual shopping behaviour and the owner's ability to photograph products.",
        },
        {
          step: "Decide for the professional service",
          detail:
            "Choose website plus email and justify it from the audience's research behaviour. Show that the same method produces a different answer.",
        },
        {
          step: "Name what is deliberately excluded",
          detail:
            "List the channels not chosen and why. Explain that an abandoned profile is worse than an absent one, because it signals a business that has stopped.",
        },
      ],
    },
    practice: {
      title: "Choose and justify your channels",
      brief:
        "You compare all seven channels against a real business, interview actual customers about where they spend time, and produce a written channel decision — one primary, one supporting, the rest excluded with reasons — matched to what you can genuinely sustain for six months.",
      steps: [
        "Build a comparison table of the seven channels: audience, format, reach, selling strength, cost.",
        "Ask ten recent customers where they spend time online and how they found the business.",
        "Record the answers without steering them, and note where they cluster.",
        "Score each channel on audience fit from one to five using those answers.",
        "Score each channel on whether you can produce its content weekly for six months.",
        "Score each channel on cost — both naira and hours — against your real budget.",
        "Choose one primary channel and write two sentences justifying it.",
        "Choose one supporting channel and state the specific job it does that the primary cannot.",
        "List every channel you are excluding and the reason for each.",
        "Check every excluded channel for an existing profile and remove or complete it.",
        "Set up your primary channel properly: profile, bio, contact route, ordering method.",
        "Set up WhatsApp Business with a catalogue, quick replies and an automated greeting.",
        "Write the route from discovery to purchase in one sentence.",
        "State the posting rhythm you will maintain on each channel for six months.",
      ],
      standard:
        "A written channel decision built on ten real customer answers rather than general advice, with every channel scored on audience fit, content capability and cost, one primary and one supporting channel each justified in writing, every excluded channel named with a reason and its orphan profile removed, both chosen channels fully set up with a working contact route, and a six-month posting rhythm stated.",
    },
    pitfalls: [
      {
        problem: "You chose platforms because they are fashionable",
        fix: "Ask ten recent customers where they spend time and how they found you. Their answers beat any general recommendation, because your audience is not the average Nigerian internet user.",
      },
      {
        problem: "You are on five platforms and maintaining none",
        fix: "One primary, one supporting, the rest excluded deliberately. Four mediocre presences produce no data and no following; one done properly produces both, and you can extend from there.",
      },
      {
        problem: "You picked a channel whose content you cannot produce",
        fix: "Match the platform to what you can genuinely make weekly for six months. A mediocre channel maintained consistently outperforms an excellent channel maintained monthly.",
      },
      {
        problem: "You drive traffic to a WhatsApp that replies late",
        fix: "WhatsApp is the closing channel. Set up quick replies, a catalogue and an automated greeting, and answer fast. Social creates attention; a slow reply wastes everything that produced it.",
      },
      {
        problem: "You use broadcast lists like a group",
        fix: "Broadcast recipients cannot see each other, which protects their privacy. Blasting a group exposes everyone's number and is what makes people leave, mute or block you.",
      },
      {
        problem: "You have no owned channel",
        fix: "Social accounts can be suspended and algorithms change. A website and an email list are yours, and a site that answers questions keeps producing customers without further payment.",
      },
      {
        problem: "You left abandoned profiles live",
        fix: "A profile whose last post is eight months old tells customers the business has stopped. Complete it or remove it — the evidence of neglect costs you more than absence.",
      },
    ],
    expertNotes: [
      "Ask ten real customers where they spend time and how they found you. Five minutes of asking produces a better channel decision than any amount of reading about platform statistics, because your audience is not the average.",
      "Treat WhatsApp as the closing channel and every social platform as the attention channel. In Nigeria a large share of sales close in messages, so your reply speed and setup matter more than your follower count.",
      "Build one owned channel as early as you can — a website or an email list. Everything else is rented: reach can fall, algorithms change, and an account can be suspended without warning or appeal.",
      "Match the channel to what you can sustain for six months rather than to what is currently effective. Consistency compounds and abandonment is expensive, so an honest assessment of your own capacity is a marketing decision, not a personal failing.",
    ],
    vocabulary: [
      { term: "Organic reach", meaning: "How many people see your content without payment. TikTok and Reels currently offer the most; feed posts offer the least." },
      { term: "Owned channel", meaning: "A channel you control — a website, an email list. Cannot be suspended or re-ranked by anyone else." },
      { term: "Rented channel", meaning: "A platform where your reach depends on someone else's algorithm. Useful but never safe to depend on alone." },
      { term: "Broadcast list", meaning: "A WhatsApp message to many people who cannot see each other. Unlike a group, it protects privacy and avoids spam." },
      { term: "Discovery channel", meaning: "Where strangers find you. TikTok and Reels are discovery; WhatsApp is not." },
      { term: "Conversion channel", meaning: "Where interest becomes a sale. In Nigeria, overwhelmingly WhatsApp messages." },
      { term: "Search intent", meaning: "The buying readiness of someone who searched for a solution. Higher than someone scrolling social, which is why search converts better." },
      { term: "Channel fit", meaning: "How closely a platform matches your audience, your content capability and your budget. All three, not just the first." },
    ],
    homework: [
      {
        task: "Interview ten customers",
        detail:
          "Ask where they spend time online and how they found the business. Record verbatim answers without steering. This is the evidence your channel decision rests on.",
      },
      {
        task: "Score all seven channels",
        detail:
          "Rate each on audience fit, whether you can produce its content weekly for six months, and its cost in naira and hours. The scores make the decision obvious.",
      },
      {
        task: "Set up WhatsApp Business properly",
        detail:
          "Catalogue, quick replies, labels and an automated greeting. Test it by messaging yourself as a customer would and note how fast and completely you are answered.",
      },
      {
        task: "Write your channel decision",
        detail:
          "One primary, one supporting, the rest excluded with reasons, and a six-month posting rhythm for each. Check every excluded channel for an orphan profile.",
      },
    ],
    rubric: [
      {
        criterion: "Platform knowledge",
        passing: "Knows the major platforms exist.",
        excellent: "Can describe each platform's audience, format, organic reach, selling strength and cost, and name what each is good and bad at.",
      },
      {
        criterion: "Evidence",
        passing: "Chooses from general advice.",
        excellent: "Ten verbatim customer answers about where they spend time and how they found the business, used directly in the decision.",
      },
      {
        criterion: "Channel decision",
        passing: "Names a platform.",
        excellent: "One primary and one supporting channel, each justified in writing, with every excluded channel named and its orphan profile removed.",
      },
      {
        criterion: "Setup",
        passing: "Has accounts.",
        excellent: "Primary channel complete with a working contact and ordering route, and WhatsApp Business configured with catalogue, quick replies and greeting.",
      },
      {
        criterion: "Sustainability",
        passing: "Plans to post often.",
        excellent: "A stated six-month rhythm per channel matched honestly to what can actually be produced, with cost in naira and hours accounted for.",
      },
    ],
    faqs: [
      {
        q: "Which platform is best for business in Nigeria right now?",
        a: "The one your customers are on. For visual products it is usually Instagram with WhatsApp closing; for community and older buyers, Facebook; for fast awareness, TikTok; for research-driven services, a website and search. Ask ten of your own customers rather than trusting a general answer.",
      },
      {
        q: "Do I really need a website if I sell on Instagram?",
        a: "It is not urgent, but it is the only channel you own. Instagram can suspend an account, change its algorithm or reduce your reach, and you have no appeal. A simple site with products, prices, proof and a contact route also brings you customers who searched rather than scrolled.",
      },
      {
        q: "Is email marketing worth it in Nigeria?",
        a: "For consumer retail, weakly. For courses, agencies, consultants, software and anything sold to businesses, genuinely well — it reaches people who chose to hear from you, costs nothing and is not throttled by an algorithm. Match it to the business type.",
      },
      {
        q: "How many platforms should I be on?",
        a: "One primary and one supporting. Each platform has its own format, audience expectation and rhythm, and learning one properly takes weeks. Four mediocre presences give you no data and no following; one done properly gives you both.",
      },
      {
        q: "My last post was months ago. Should I just start again?",
        a: "Start again, but fix the evidence of neglect first: update the profile, refresh the bio and pinned post, and set a rhythm you can genuinely keep. An account whose last post is eight months old tells a customer the business has stopped, and that costs you more than being absent.",
      },
    ],
  },

  "content-types-and-storytelling": {
    summary:
      "Content is the material that turns attention into customers, and almost all of it fails for the same reason: it talks about the business instead of the customer. This session covers the content types that work, how to tell a story that holds attention, and how to write captions and calls-to-action that produce a reply.",
    objectives: [
      "Distinguish educational, promotional and entertaining content and use each deliberately",
      "Balance the three so your account is neither a shop window nor a hobby",
      "Structure a story that holds attention through to the point",
      "Write captions that open with a hook and end with an action",
      "Write calls-to-action that get replies rather than being ignored",
      "Produce a batch of usable content ideas from one customer problem",
    ],
    blocks: [
      {
        heading: "The three content types",
        body: [
          "**Educational content** teaches something useful and asks for nothing: how to choose, how to avoid a mistake, what a term means, what to check before buying. It builds trust, because someone who helps you before selling to you is presumed honest. It also gets saved and shared, which is how accounts grow without payment. For most small businesses this should be the largest share of what they post.",
          "**Promotional content** sells: the product, the price, the offer, the deadline, the proof. It is necessary and it must be clear — hiding prices and forcing people to ask 'how much?' in the comments is a habit that costs sales, because most people will not ask. But an account that is only promotion is a shop window nobody returns to.",
          "**Entertaining content** makes people feel something: humour, recognition, surprise, nostalgia. It builds familiarity and reach, because people share what entertains them. Its risk is that it can attract an audience that enjoys you and never buys, so it should support the other two rather than replace them.",
        ],
      },
      {
        heading: "Balancing the three",
        body: [
          "A reasonable starting balance is roughly **half educational, a quarter promotional, a quarter entertaining**, adjusted as your numbers tell you what works. The reason for weighting education is that it is the type that earns the right to sell: by the time someone sees your offer, they have already had something useful from you and are not being asked to trust a stranger.",
          "Adjust from evidence rather than theory. If educational posts get saves and shares but your promotional posts get nothing, your offers may be unclear rather than unwanted — check whether the price, the delivery and the way to buy are stated. If entertaining posts reach far more people but produce no enquiries, your entertainment may be attracting the wrong audience, and narrower content is better than wider content.",
          "The mistake to avoid is the **all-promotion account**. It looks efficient — every post is a sale attempt — and it produces almost nothing, because nobody follows a shop window. The second mistake is the reverse: an account of tips and jokes with no clear route to buying, which builds an audience that enjoys you and never becomes customers.",
        ],
      },
      {
        heading: "Storytelling that holds attention",
        body: [
          "A story works because it creates an **open loop**: something unfinished that the reader wants closed. The structure is simple and reliable. **Start in the middle of the problem**, not with an introduction. 'I lost ₦180,000 to a supplier who never delivered' holds attention; 'Good morning everyone, today I want to talk about suppliers' does not. Nobody is waiting for your introduction.",
          "Then **the tension** — what went wrong, what was at stake, what you tried that failed. Tension is what keeps someone reading, and skipping it makes the story flat however good the ending. Then **the turn** — what changed, what you learned, what you did differently. Then **the point** — the one thing the reader should take away, stated plainly.",
          "Keep it **specific**. 'A client' is forgettable; 'a woman in Surulere ordering forty Ankara styles for her sister's wedding' is not. Specific detail is what makes a story credible and memorable, and it is also what makes it recognisable — the reader thinks 'that is nearly me', which is the moment a stranger becomes a prospect. And keep it short: online attention is measured in seconds, so every sentence that does not earn the next one should go.",
        ],
      },
      {
        heading: "Captions that convert",
        body: [
          "A caption has three jobs and only the first is visible. The **hook** is the first line, and on most feeds it is all anyone sees before deciding to keep reading — so it must be a claim, a question or a problem, never a greeting. 'Your generator is costing you more than a solar setup' is a hook. 'Hello dear customers' is not.",
          "The **body** delivers one idea, in short lines. Long unbroken paragraphs do not get read on a phone; two-sentence paragraphs separated by space do. Write the way you would say it to a friend, not the way you would write a notice, because formal language signals advertising and advertising is scrolled past.",
          "The **call-to-action** tells the reader exactly what to do next, and it must be one thing. 'Send the word BAG to our WhatsApp' works. 'Like, share, comment, follow and tag a friend' does not, because five requests produce none. State it plainly and make it small enough that doing it feels effortless — that is what converts a reader into a conversation.",
        ],
      },
      {
        heading: "Calls-to-action and generating ideas at volume",
        body: [
          "A call-to-action fails for three reasons: it is **absent** (the reader enjoyed the post and did not know what to do), **vague** ('contact us' says nothing about how), or **too large** (asking a stranger to buy before asking them to ask). Match the ask to the relationship: a first-time reader should be invited to reply, save or ask a question; a warm follower can be invited to order.",
          "The reliable CTAs for Nigerian small business are direct-message prompts ('Send the word PRICE and I will send our list'), a specific question that invites replies ('Which of these two would you wear to work?'), a save prompt for genuinely useful content, and a link to a page or catalogue. Note that **a question that invites replies also increases distribution**, because comments are a strong signal — so a good CTA does two jobs at once.",
          "For producing ideas at volume, work from **one customer problem to many pieces**. A single problem — 'I cannot find work clothes that look expensive without overspending' — generates a buying guide, a mistake-avoidance post, a fabric comparison, a customer story, a behind-the-scenes post, a price-justification post and a seasonal offer. Ten problems give you seventy posts, which is several months of content, and every one of them is relevant to someone who might buy.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor takes one customer problem for a real business and turns it into a full set of content: an educational post, a promotional post, an entertaining post, a story, three captions and three calls-to-action — rewriting each one live as the class suggests improvements.",
      steps: [
        {
          step: "Start from a customer problem",
          detail:
            "Write the problem in the customer's own words and explain that every piece of content in the session derives from this one sentence.",
        },
        {
          step: "Generate ideas from it",
          detail:
            "Produce ten distinct post ideas from the single problem. Explain that one problem yields several months of relevant content.",
        },
        {
          step: "Draft an educational post",
          detail:
            "Write a buying guide that teaches something useful and asks for nothing. Explain why this type earns the right to sell later.",
        },
        {
          step: "Draft a promotional post",
          detail:
            "State the product, the price, the delivery and how to buy. Show the version that hides the price and explain what it costs in lost sales.",
        },
        {
          step: "Draft an entertaining post",
          detail:
            "Write something that produces recognition rather than information. Explain that it builds familiarity and reach but should support the other two.",
        },
        {
          step: "Structure a story",
          detail:
            "Build the open loop: start in the middle of the problem, add tension, the turn, then the point. Show the version that begins with an introduction and explain why it fails.",
        },
        {
          step: "Add specific detail",
          detail:
            "Replace 'a client' with a named situation. Explain that specificity is what makes a story credible and what makes the reader think it is nearly them.",
        },
        {
          step: "Write a hook",
          detail:
            "Draft three alternative first lines and choose the strongest. Explain that on most feeds the first line is all anyone sees.",
        },
        {
          step: "Format for a phone",
          detail:
            "Break a paragraph into short lines and compare readability. Explain that unbroken text is not read on a small screen.",
        },
        {
          step: "Write the call-to-action",
          detail:
            "Write one specific ask, then show a five-request version and explain why asking for five things produces none.",
        },
        {
          step: "Match the ask to the relationship",
          detail:
            "Show a first-time-reader ask versus a warm-follower ask. Explain that asking a stranger to buy before asking them to ask is where conversion dies.",
        },
        {
          step: "Rewrite live",
          detail:
            "Take the class's suggested improvements and rewrite the weakest post in front of them. Explain that rewriting is the actual skill, not the first draft.",
        },
      ],
    },
    practice: {
      title: "Turn one problem into a week of content",
      brief:
        "You take a single real customer problem and produce a complete, usable set of content from it: ten ideas, one educational post, one promotional post, one entertaining post, one structured story, three captions with hooks and three calls-to-action matched to the relationship.",
      steps: [
        "Write one customer problem in the customer's own words.",
        "Generate ten distinct post ideas from that single problem.",
        "Mark each idea as educational, promotional or entertaining.",
        "Write one educational post that teaches something useful and asks for nothing.",
        "Write one promotional post stating product, price, delivery and how to buy.",
        "Write one entertaining post that produces recognition rather than information.",
        "Write one story using the open loop: problem, tension, turn, point.",
        "Replace every generic detail in the story with a specific one.",
        "Write three alternative hooks for your strongest post and choose one.",
        "Format every post for a phone: short lines, space between paragraphs.",
        "Write one call-to-action per post, each asking for exactly one thing.",
        "Match each CTA to the relationship: reply or save for strangers, order for warm followers.",
        "Read every post aloud and cut any sentence that does not earn the next one.",
        "Check the balance across your ten ideas against half educational, quarter promotional, quarter entertaining.",
      ],
      standard:
        "Ten ideas derived from one real customer problem and marked by type, four finished pieces covering all three content types plus one story built on the open loop with specific detail, three hooks tested against each other, every post formatted for a phone in short lines, and one CTA per post asking for exactly one thing and matched to the relationship.",
    },
    pitfalls: [
      {
        problem: "Your account is only promotion",
        fix: "Weight education at roughly half your output. Nobody follows a shop window, and education is what earns the right to sell — by the time someone sees an offer they have already had something useful from you.",
      },
      {
        problem: "You hide prices and force people to ask",
        fix: "State the price. Most people will not ask 'how much?' in a public comment, so hiding it does not create conversation — it loses the sale quietly and repeatedly.",
      },
      {
        problem: "You open with a greeting",
        fix: "The first line is the only thing most people see. Open with a claim, a question or a problem. 'Hello dear customers' tells the reader nothing worth stopping for.",
      },
      {
        problem: "You start stories with an introduction",
        fix: "Begin in the middle of the problem. Nobody is waiting for your setup, and an open loop is what holds attention — 'I lost ₦180,000 to a supplier' beats 'today I want to talk about suppliers'.",
      },
      {
        problem: "Your story has no tension",
        fix: "Say what went wrong, what was at stake and what you tried that failed. Skipping the tension makes a story flat however good the ending, and readers leave before the point.",
      },
      {
        problem: "You ask for five things in one call-to-action",
        fix: "Ask for one. 'Like, share, comment, follow and tag a friend' produces none, because each request dilutes the others and the reader does none of them.",
      },
      {
        problem: "You ask a stranger to buy",
        fix: "Match the ask to the relationship. A first-time reader should be invited to reply, save or ask; a warm follower can be invited to order. Asking for the sale too early is where conversion dies.",
      },
      {
        problem: "You write in paragraphs that will not be read",
        fix: "Break text into two-sentence paragraphs with space between them. Long unbroken blocks are not read on a phone, however good the writing is.",
      },
    ],
    expertNotes: [
      "Generate ideas from problems, not from products. One customer problem yields a buying guide, a mistake post, a comparison, a story, a behind-the-scenes piece and an offer — ten problems are several months of content, all of it relevant to someone who might buy.",
      "Put the price in the post. Hiding it is a habit that feels like it creates engagement and in practice loses sales quietly, because most people will not ask 'how much?' in a public comment.",
      "Write the hook last and rewrite it first. The first line determines whether the rest is ever read, so it deserves more attention than the body — and if you have three candidate hooks, test them against each other rather than picking your favourite.",
      "Cut every sentence that does not earn the next one. Online attention is measured in seconds, and reading your own post aloud is the fastest way to find the sentences that lose people.",
    ],
    vocabulary: [
      { term: "Educational content", meaning: "Teaches something useful and asks for nothing. Builds trust and gets saved and shared." },
      { term: "Promotional content", meaning: "Sells — product, price, offer, deadline, proof. Necessary, but an account of only this is a shop window." },
      { term: "Entertaining content", meaning: "Makes people feel something. Builds familiarity and reach, and can attract an audience that never buys." },
      { term: "Hook", meaning: "The first line. Usually the only part anyone reads before deciding whether to continue." },
      { term: "Open loop", meaning: "An unfinished element that creates the urge to keep reading. The engine of a story that holds attention." },
      { term: "Call-to-action", meaning: "The one specific thing you ask the reader to do next. One ask, not five." },
      { term: "Content pillar", meaning: "A recurring theme your content returns to. Keeps an account coherent instead of random." },
      { term: "Social proof", meaning: "Evidence that others bought and were satisfied — reviews, photos, named customers. Persuades more strongly than any claim you make about yourself." },
    ],
    homework: [
      {
        task: "Write ten ideas from one problem",
        detail:
          "Take a single real customer problem and produce ten distinct post ideas, each marked educational, promotional or entertaining. This one exercise supplies weeks of content.",
      },
      {
        task: "Write four finished posts",
        detail:
          "One educational, one promotional, one entertaining and one story built on the open loop. Format each for a phone in short lines with space between paragraphs.",
      },
      {
        task: "Test three hooks",
        detail:
          "Write three alternative first lines for your strongest post, read them to two people and record which one makes them want to continue. Use the winner.",
      },
      {
        task: "Rewrite your worst existing post",
        detail:
          "Take a real post that performed badly and rewrite it: new hook, shorter lines, one clear CTA. Post both versions a week apart and compare the numbers.",
      },
    ],
    rubric: [
      {
        criterion: "Content type understanding",
        passing: "Knows the three types.",
        excellent: "Uses each deliberately with a reasoned balance, weighting education to earn the right to sell, and adjusts the mix from evidence rather than theory.",
      },
      {
        criterion: "Storytelling",
        passing: "Tells an anecdote.",
        excellent: "A structured open loop — problem, tension, turn, point — with specific detail that makes the reader think it is nearly them.",
      },
      {
        criterion: "Hooks",
        passing: "Writes an opening line.",
        excellent: "Three candidate hooks tested against each other, opening with a claim, question or problem rather than a greeting.",
      },
      {
        criterion: "Calls-to-action",
        passing: "Asks people to engage.",
        excellent: "One specific ask per post, matched to the relationship, small enough that doing it feels effortless.",
      },
      {
        criterion: "Idea generation",
        passing: "Posts when inspired.",
        excellent: "Ten distinct ideas derived from one customer problem and marked by type, enough for weeks of relevant content.",
      },
    ],
    faqs: [
      {
        q: "How often should I post?",
        a: "Whatever you can genuinely sustain. Three well-made posts a week for six months beats daily posts for three weeks followed by silence. Consistency compounds, and an abandoned account costs you more than a quiet one.",
      },
      {
        q: "Should I put prices in my posts?",
        a: "Yes. Most people will not ask 'how much?' in a public comment, so hiding the price does not create engagement — it loses the sale quietly. State the price, the delivery and how to buy, and let the people who are interested reply.",
      },
      {
        q: "What if my product is boring?",
        a: "Then your customer's problem is interesting, and that is your content. Nobody cares about generator servicing, but everyone cares about a generator that fails during a crucial week. Teach around the problem rather than describing the product.",
      },
      {
        q: "Do I need to show my face?",
        a: "No, but faces perform better because people trust people. If you are unwilling, use hands, products, process shots and named customer stories. The requirement is specificity and consistency, not your face.",
      },
      {
        q: "How do I know if my content is working?",
        a: "Look past likes. Saves and shares mean the content was useful; replies mean it started a conversation; enquiries and orders mean it worked. If a post gets many likes and no enquiries, it reached people who were never going to buy — narrower content is better than wider content.",
      },
    ],
  },
};
