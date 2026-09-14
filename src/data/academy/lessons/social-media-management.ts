import type { SessionLecture } from "../types";

/**
 * Social Media Management — ₦15,000 · 3 weeks · 6 sessions.
 * Sessions 1 to 3. (Sessions 4–6 in social-media-management-b.ts.)
 */
export const socialMediaLessonsA: Record<string, SessionLecture> = {
  "profiles-and-content-strategy": {
    summary:
      "Most business social media fails before the first post, because nobody decided who it is for or what it should achieve. This session builds the foundation: auditing a real profile, defining the audience, choosing platforms on evidence rather than habit, and writing a content strategy that survives contact with a real business.",
    objectives: [
      "Audit a business social profile and fix what stops it converting a visitor",
      "Define a specific audience rather than 'everyone'",
      "Choose platforms from where the audience actually is, not from habit",
      "Write a positioning statement that determines every post",
      "Build content pillars that make deciding what to post fast",
      "Set goals you can actually measure",
    ],
    blocks: [
      {
        heading: "The profile is a landing page, not a business card",
        body: [
          "A visitor who lands on a business profile decides within a few seconds whether to follow, call or leave. Treat the profile as a landing page with one job: convince a stranger that this business can serve them and tell them exactly how to make contact. Everything on it should serve that. The **name field** should carry what the business does alongside its name, because that field is searchable — 'Adaeze Cakes | Wedding & Birthday Cakes, Lagos' will be found by someone searching for cakes while 'Adaeze Enterprises' will not. The **bio** has one or two lines to state what you do, who it is for and what to do next.",
          "The failures are consistent and fixable. A profile picture that is a cluttered logo illegible at 32 pixels. A bio that says 'Quality service at affordable prices' — which describes nobody and is on thousands of Nigerian profiles. No contact route, or a contact route buried in a caption rather than in the bio or the button. No link, or a link to a homepage rather than to a WhatsApp chat or a menu. A highlight row that is empty or holds one item. And a grid of posts that are all product photographs with no reason for anyone to follow.",
          "The fix order matters: name field, then profile picture, then bio, then contact route and link, then highlights, then the pinned posts. Those five changes take under an hour and they change what a profile does. Do them before writing a single caption, because no amount of good posting rescues a profile that fails to convert the visitors it already gets.",
        ],
      },
      {
        heading: "Defining an audience that is specific enough to be useful",
        body: [
          "'Everyone' is not an audience. A post written for everyone is written for nobody, and the result is content that says nothing in particular and converts nothing. A useful audience definition is narrow enough that you can picture one person and know what they worry about. Not 'women in Lagos' but 'a woman aged 28–40 in Lagos planning her first wedding with a budget of ₦3–6 million who is choosing a caterer and is afraid of being disappointed on the day'.",
          "Build it from four things. **Who they are** — age range, location, income band, occupation. **What they are trying to do** — the job your product is hired for. **What stops them** — the objection, fear or obstacle that keeps them from buying. And **where they already are** — which platforms they use and what they look at there. That last one is what determines your platform choice, and it is answerable by asking the business who its actual customers are rather than guessing.",
          "The practical test of a good audience definition is that it changes what you would post. If your definition would produce exactly the same content as a different definition, it is too vague. A definition that says 'afraid of being disappointed on the day' tells you to post real photos of real events, testimonials and behind-the-scenes preparation — because reassurance is the product, not cake.",
        ],
      },
      {
        heading: "Choosing platforms on evidence",
        body: [
          "The reflex is to be everywhere, and it is wrong. A small business with three hours a week for social gets better results from one platform done properly than from four done badly, because consistency is what builds an audience and four platforms guarantee inconsistency. Choose one primary and at most one secondary.",
          "In Nigeria the practical map is fairly stable. **WhatsApp** is where business actually closes — most enquiries and payments happen there, so a WhatsApp Business profile with a catalogue and quick replies is arguably the highest-return thing any Nigerian small business can set up. **Instagram** suits visual businesses: fashion, beauty, food, events, interiors. **Facebook** skews older and works well for services, local community groups, and classifieds; its groups are a genuinely underused channel. **TikTok** rewards entertainment and personality over polish and can grow fast, but it demands video and consistency. **LinkedIn** is where B2B and professional services belong, and it is nearly empty of Nigerian small businesses doing it well, which is an advantage. **X** matters for news, tech and conversation but converts poorly for most small local businesses.",
          "Ask the business where its customers already are, then look at its competitors to see what is working. If the three strongest competitors in a category are all on Instagram and none are on TikTok, that is evidence. Choose from evidence, commit for at least three months, and judge it on results rather than on how busy it feels.",
        ],
      },
      {
        heading: "Positioning: the sentence that decides every post",
        body: [
          "Positioning is a single sentence stating what the business does, for whom, and what makes it different. 'We make custom celebration cakes for Lagos families who want a design nobody else will have, delivered on the day.' Every post you write should be traceable to that sentence, and every post that is not traceable to it is probably a post that should not exist.",
          "This matters because the alternative is content drift — a feed that posts cake on Monday, a motivational quote on Tuesday, a meme on Wednesday and a Bible verse on Thursday, so a visitor cannot tell what the account is for. Drift feels like variety but reads as confusion, and it is the most common reason a business account fails to grow despite regular posting.",
          "The difference to claim must be real and specific. 'Quality products' is not a difference because every business claims it. 'Delivered on the day, or it is free' is a difference. 'Every cake photographed before it leaves so you approve the design' is a difference. Dig for the specific operational thing the business does that competitors do not, and build the positioning on it. If the business genuinely has no difference, that is a business problem worth naming to the client rather than papering over with adjectives.",
        ],
      },
      {
        heading: "Content pillars and measurable goals",
        body: [
          "**Content pillars** are three to five recurring categories that your posts fall into, and they solve the two problems that kill consistency: not knowing what to post, and drifting off-message. For a cake business they might be: the finished work, how it is made, customer moments and testimonials, practical advice for people planning an event, and the person behind the business. With pillars defined, deciding what to post becomes choosing a pillar rather than inventing a concept, which is a decision you can make in seconds.",
          "The mix matters. A feed that is only product photographs reads as a catalogue and nobody follows a catalogue. A useful starting ratio is roughly half your main offer, a quarter that builds trust — proof, process, testimonials — and a quarter that gives value or shows personality. Adjust from results, but never let any single category reach everything.",
          "Then set goals you can measure, because 'grow the page' is not a goal. Useful ones: enquiries per week from social, followers gained per month, profile visits, saves and shares per post, and reply rate. For a small business the number that matters almost always is **enquiries**, not followers — a page with 800 followers producing ten enquiries a week is worth far more than a page with 20,000 followers producing none. Say this to the client early, because it changes what they will judge you on later.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor takes a real Nigerian business profile, audits it live against the checklist, fixes it in front of the class, then builds the audience definition, positioning sentence and content pillars from the owner's own answers.",
      steps: [
        {
          step: "Open the profile as a stranger would",
          detail:
            "View it logged out, on a phone. Note what you can tell about the business in five seconds, and what the next action would be. Usually neither is clear.",
        },
        {
          step: "Run the audit checklist",
          detail:
            "Name field, profile picture at 32 pixels, bio, contact route, link, highlights, pinned posts. Score each and name the specific fault in each.",
        },
        {
          step: "Rewrite the name field",
          detail:
            "Add what the business does so the field becomes searchable. Show a search for the category before and after.",
        },
        {
          step: "Rewrite the bio",
          detail:
            "Replace 'quality service at affordable prices' with what the business does, who it is for and what to do next. Read both aloud and compare.",
        },
        {
          step: "Fix the contact route",
          detail:
            "Put a WhatsApp link in the bio and set up the action button. Explain that most Nigerian business closes on WhatsApp, so that is where the route should lead.",
        },
        {
          step: "Set up highlights",
          detail:
            "Create highlights for price, menu or catalogue, reviews, and how to order. Explain that highlights are the second thing a deciding visitor looks at.",
        },
        {
          step: "Interview the owner for the audience",
          detail:
            "Ask who actually buys, what they are trying to do, what stops them, and where they spend time online. Write the answers down verbatim.",
        },
        {
          step: "Write the audience definition",
          detail:
            "Turn the answers into one specific person with an age range, location, budget and fear. Test it by asking what content it implies.",
        },
        {
          step: "Write the positioning sentence",
          detail:
            "Dig for the real operational difference rather than an adjective. Show three rejected attempts before the one that holds.",
        },
        {
          step: "Define the content pillars",
          detail:
            "Derive four pillars from the audience's fear and the business's difference. Explain how pillars turn 'what should I post?' into a fast decision.",
        },
        {
          step: "Set the ratio and the goals",
          detail:
            "Set roughly half offer, a quarter trust, a quarter value. Then set enquiries per week as the primary metric and explain why followers are the wrong one.",
        },
        {
          step: "Review the whole foundation",
          detail:
            "Read the audience definition, positioning and pillars together and confirm every one of the last ten posts either fits or should not have been posted.",
        },
      ],
    },
    practice: {
      title: "Audit and rebuild a real profile's foundation",
      brief:
        "You take a real business profile, audit it against the full checklist, fix everything fixable, then produce the written foundation: audience definition, positioning sentence, platform choice with reasoning, four content pillars, and measurable goals.",
      steps: [
        "Choose a real business profile and view it logged out on a phone.",
        "Score it against the seven-point audit checklist and name each specific fault.",
        "Rewrite the name field so it carries what the business does.",
        "Rewrite the bio to state what, for whom and what to do next.",
        "Fix the contact route so it leads to WhatsApp or the fastest real contact.",
        "Set up highlights covering price, catalogue, reviews and how to order.",
        "Interview the owner and record verbatim answers on who buys, what they want, what stops them and where they are online.",
        "Write one specific audience definition including age, location, budget and fear.",
        "Write the positioning sentence, rejecting at least three generic attempts first.",
        "Choose one primary platform and justify it from where the audience actually is.",
        "Define four content pillars derived from the audience's fear and the business's difference.",
        "Set the content ratio and name enquiries per week as the primary metric.",
        "Review the account's last ten posts against the pillars and mark which should not have been posted.",
      ],
      standard:
        "A profile that passes all seven audit points, plus a written foundation where the audience is specific enough to picture, the positioning claims a real operational difference, the platform choice is justified by evidence, and the goals are measurable — with at least one past post correctly identified as off-strategy.",
    },
    pitfalls: [
      {
        problem: "You started posting before fixing the profile",
        fix: "The profile converts the visitors your posts already generate. Fix the name field, picture, bio, contact route and highlights first — it takes under an hour and it changes what every subsequent post is worth.",
      },
      {
        problem: "Your audience is 'everyone' or 'women in Lagos'",
        fix: "Narrow it until you can picture one person with an age, a budget and a fear. If the definition would produce the same content as a different one, it is still too vague.",
      },
      {
        problem: "You are on four platforms and consistent on none",
        fix: "Pick one primary and at most one secondary, commit for three months, and judge on results. Consistency builds audiences and four platforms guarantee inconsistency.",
      },
      {
        problem: "Your positioning says 'quality service at affordable prices'",
        fix: "Every business claims that, so it differentiates nobody. Find the specific operational thing the business does that competitors do not, and build the sentence on it.",
      },
      {
        problem: "Your feed drifts into quotes, memes and Bible verses",
        fix: "That is content drift and it reads as confusion. Define three to five pillars and make every post traceable to one of them.",
      },
      {
        problem: "You are reporting follower growth as the result",
        fix: "For a small business the number that matters is enquiries per week. A page with 800 followers producing ten enquiries beats one with 20,000 producing none. Set that expectation with the client early.",
      },
    ],
    expertNotes: [
      "Always view a profile logged out, on a phone, before you judge it. You see something different when you are logged in and you know the business — the logged-out phone view is what a real visitor gets, and it is usually far less clear than you assumed.",
      "Interview the owner rather than inventing the audience. Business owners know who actually buys, what those people ask before ordering, and what makes them hesitate. Those verbatim answers become your captions, your pillars and your replies, and they are more accurate than any research.",
      "Set up WhatsApp Business properly before anything else. A catalogue, quick replies for the ten questions every customer asks, and a greeting message will convert more enquiries than a month of posting. It is the least glamorous and highest-return task in this course.",
      "Write the positioning sentence and keep it visible while you work. Every caption you write should be traceable to it. When you cannot trace one, that is the signal the post should be cut rather than published.",
    ],
    vocabulary: [
      { term: "Name field", meaning: "The searchable name line on a profile. Carrying what the business does here is free search visibility." },
      { term: "Audience definition", meaning: "One specific pictured person with age, location, budget and fear — narrow enough to change what you post." },
      { term: "Positioning", meaning: "One sentence stating what the business does, for whom, and the real difference. Every post traces back to it." },
      { term: "Content pillar", meaning: "A recurring post category. Pillars turn 'what should I post?' into a fast decision and prevent drift." },
      { term: "Content drift", meaning: "A feed mixing unrelated post types so visitors cannot tell what the account is for. Feels like variety, reads as confusion." },
      { term: "Highlights", meaning: "Saved stories acting as a permanent menu — price, catalogue, reviews, how to order." },
      { term: "Enquiries per week", meaning: "The metric that matters for a small business, rather than follower count." },
      { term: "WhatsApp Business catalogue", meaning: "A product list inside WhatsApp where most Nigerian business enquiries actually convert." },
    ],
    homework: [
      {
        task: "Audit five local business profiles",
        detail:
          "Score each against the seven-point checklist and write the single highest-impact fix for each. This trains the eye you will be paid for.",
      },
      {
        task: "Interview one real business owner",
        detail:
          "Ask the four audience questions and record the answers verbatim. Bring the transcript to the next session — those exact words become captions.",
      },
      {
        task: "Write three positioning sentences and pick one",
        detail:
          "Draft three for the same business, reject two for claiming a difference nobody can verify, and justify the one you keep in a single line.",
      },
      {
        task: "Set up WhatsApp Business for one business",
        detail:
          "Add a catalogue, a greeting message and quick replies for the ten most common questions. Note how much faster enquiries get answered afterwards.",
      },
    ],
    rubric: [
      {
        criterion: "Profile audit",
        passing: "Identifies some profile problems.",
        excellent: "Scores all seven points, names the specific fault in each, and fixes them in the correct priority order.",
      },
      {
        criterion: "Audience",
        passing: "Describes a general audience.",
        excellent: "One pictured person with age, location, budget and fear, derived from the owner's verbatim answers, and specific enough to change what gets posted.",
      },
      {
        criterion: "Platform choice",
        passing: "Names a platform.",
        excellent: "One primary justified by where the audience actually is, supported by observation of competitors, with a stated commitment period.",
      },
      {
        criterion: "Strategy",
        passing: "Has some content ideas.",
        excellent: "A positioning sentence claiming a verifiable difference, four derived pillars, a stated ratio, and at least one past post correctly judged off-strategy.",
      },
      {
        criterion: "Goals",
        passing: "States a goal.",
        excellent: "Enquiries per week as the primary metric, with supporting measures, and the client's expectations set on that basis rather than on followers.",
      },
    ],
    faqs: [
      {
        q: "Which platform should a Nigerian small business start with?",
        a: "WhatsApp Business first, because that is where enquiries convert and a catalogue with quick replies pays back faster than any posting schedule. Then one public platform chosen by the business type: Instagram for visual businesses, Facebook for services and local groups, TikTok if the owner is comfortable on video, LinkedIn for professional and B2B services.",
      },
      {
        q: "How often should a business post?",
        a: "Three to four times a week, consistently, beats daily posting that collapses after a fortnight. Consistency is what builds an audience and what the algorithm rewards. Decide a frequency the business can hold for three months and hold it.",
      },
      {
        q: "Do I need to pay for ads?",
        a: "Not to start. Organic reach is slow but it builds a real audience and it is free. Paid becomes worth it once you know which content works and there is a specific offer to push — session five covers when and how to spend.",
      },
      {
        q: "My client wants more followers. How do I handle that?",
        a: "Show them the enquiries figure alongside it. A page producing ten enquiries a week from 800 followers is a business asset; one with 20,000 followers and no enquiries is not. Set that expectation in the first conversation, because it decides what you are judged on later.",
      },
      {
        q: "Can I manage several clients at once?",
        a: "Yes, and it is how this becomes a real income. But only after you have a repeatable process — pillars, templates, a scheduling tool and a reporting format. Managing three clients without a system means three sets of improvisation and missed posts. Session four covers the workflow.",
      },
    ],
  },

  "formats-captions-scheduling": {
    summary:
      "The craft of the individual post: which format suits which message, how to write a caption that gets read to the end, the hooks that stop a scroll, hashtags that work rather than decorate, and a scheduling system that makes consistency possible alongside everything else.",
    objectives: [
      "Choose the right format for a message — image, carousel, reel, story, text",
      "Write hooks that stop a scroll in the first line",
      "Structure a caption so it is read to the end and prompts action",
      "Use hashtags and keywords deliberately rather than decoratively",
      "Build and run a content calendar and scheduling workflow",
      "Produce a repeatable posting process that survives a busy week",
    ],
    blocks: [
      {
        heading: "Formats and what each is actually for",
        body: [
          "Each format does a different job and using the wrong one wastes the message. A **single image** is the fastest to produce and works for one clear idea — a product, an announcement, a quote. A **carousel** — a swipeable set of images — is the strongest format for teaching and for storytelling, because each slide is a beat and swiping creates dwell time, which platforms reward; it is also the best format for a step-by-step or a before-and-after. A **reel or short video** reaches the most new people because platforms push video to non-followers, but it costs the most to make and it demands a hook in the first two seconds.",
          "A **story** is for immediacy and for relationship — polls, questions, behind-the-scenes, today's availability — and it disappears, which makes it low-pressure and high-frequency; it is also where a Nigerian audience expects to find current stock and prices. A **text post** works on platforms like X and LinkedIn where the writing is the content. And a **live** session builds trust faster than anything else but requires confidence and preparation.",
          "The practical rule: match the format to the message's job. Teaching goes in a carousel. Reaching new people goes in a reel. Selling today's availability goes in a story. Announcing goes in a single image with a clear caption. A business that posts only single product images is using one tool for five jobs and getting one job's worth of results.",
        ],
      },
      {
        heading: "The hook: the first line decides everything",
        body: [
          "On a feed, the viewer sees roughly the first line or two before deciding to scroll or read more. That line is the entire battle. A hook is not a clever phrase; it is a reason to keep reading, and the reliable forms are few. **A specific result**: 'She ordered the cake on Tuesday for a Saturday wedding.' **A contradiction of expectation**: 'The most expensive cake we ever made was the simplest.' **A direct question the reader answers yes to**: 'Planning a wedding and terrified the caterer will disappoint?' **A named mistake**: 'Three things that ruin a birthday cake order.' **A number with a promise**: 'Five questions to ask any caterer before you pay a deposit.'",
          "What fails is everything vague and self-referential. 'We are pleased to announce…' costs you the reader before you have said anything. 'Happy new week from all of us at…' says nothing. Starting with the business name or a greeting wastes the only line that matters. The discipline is to write the hook last, once you know what the post is really about, and then to cut everything before it.",
          "For video the window is even shorter — about two seconds. Open on the result or the movement, not on a logo or a slow fade. If the first frame is a logo, most viewers are gone before the content starts. This is the single highest-leverage change most Nigerian business reels could make, and it costs nothing.",
        ],
      },
      {
        heading: "Caption structure that gets read",
        body: [
          "A caption that works has four parts in order. **Hook** — the first line, as above. **Body** — the substance, in short lines of one or two sentences, because a wall of text is skipped regardless of how good it is; break it up and it gets read. **Proof or specificity** — a real number, a real customer, a real detail, because specificity is what makes a claim believable. **Call to action** — one action, stated plainly: 'Send us a DM with your date and we will send options.' Not three options and not 'link in bio and also call us and also visit the shop'.",
          "Length is a genuine question with a real answer: long captions work when every line earns the next, and they work particularly well for teaching and storytelling, where dwell time signals quality to the platform. Short captions work for a strong image that already carries the message. What never works is a medium-length caption that pads. Decide whether the post is teaching, proving or announcing, and let that decide the length.",
          "One more consideration specific to this market: many Nigerian readers scan rather than read, and a large share view on small screens with limited data. Put the essential information — what it is, what it costs, how to order — early enough that a scanner gets it, and treat everything after as a bonus for the reader who stays.",
        ],
      },
      {
        heading: "Hashtags and keywords: what actually works",
        body: [
          "Hashtags have changed. They were once the main discovery mechanism; now platform search and recommendation carry most discovery, and hashtags function more as a topical signal than as a traffic source. That means three to eight relevant, specific tags outperform thirty generic ones. '#love #instagood #happy' tells a platform nothing and reaches nobody. '#LagosCakes #WeddingCakeLagos #LekkiBaker' describes the content to a system that can act on it.",
          "More important than tags now is **keywords in the caption and the name field**. Platforms index the words you write, which is why a searchable name field matters and why describing the product plainly in the caption — 'custom three-tier wedding cake, delivered in Lekki' — helps you appear in searches that hashtags never would. Write for a search engine as well as for a reader.",
          "Build a small set of tag groups rather than inventing tags each time: one group for your location, one for your category, one for the specific product. Rotate between them, keep each group under ten, and check occasionally whether the tags still show relevant content — a tag that has been captured by spam is worse than no tag.",
        ],
      },
      {
        heading: "The calendar and the scheduling workflow",
        body: [
          "Consistency fails without a system, and the system has three parts. **A calendar** — a simple sheet with dates down one side and your pillars across the top, so you can see at a glance that you have not posted the same pillar four weeks running. **A batching day** — one block of two or three hours in which you write and prepare the whole week's posts at once, which is dramatically faster than deciding daily and is the only realistic approach alongside other work. **A scheduling tool** — the platforms' own built-in schedulers are free and sufficient; third-party tools add convenience and a unified inbox but are not necessary to start.",
          "Batching works because the expensive part of content is not typing, it is the decision and the context switch. Deciding five posts in one sitting with the brand in mind produces better and more coherent work than five separate sittings, and it takes a third of the time. Photograph everything you need in one session too, and keep an organised library so you are never searching for an image.",
          "Then build the habit that prevents collapse: prepare next week's content before the current week ends, and keep a small **evergreen bank** — five or six posts that work any week — so a bad week never means silence. Silence is what costs followers and enquiries, and a bank is the cheapest insurance there is. Review the calendar monthly and drop the pillars that are not performing rather than repeating them out of habit.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor takes one product and turns it into four formats with four hooks, writes a full caption, then builds a month's calendar and batches a week's posts live.",
      steps: [
        {
          step: "Choose one product",
          detail:
            "Use a real item — a specific cake, a specific service. Explain that starting from something concrete produces better posts than starting from an abstract theme.",
        },
        {
          step: "Match four formats to four jobs",
          detail:
            "Announce it as a single image, teach about it as a carousel, reach new people with a reel, and sell today's availability as a story. Name the job each is doing.",
        },
        {
          step: "Write four hooks for the same product",
          detail:
            "One result, one contradiction, one question, one named mistake. Read them aloud and identify which stops a scroll and which does not.",
        },
        {
          step: "Show the failed hooks",
          detail:
            "Write 'We are pleased to announce' and 'Happy new week from all of us' and explain precisely why each loses the reader in the first line.",
        },
        {
          step: "Write the full caption",
          detail:
            "Hook, body in short lines, one specific proof point, one call to action. Then cut everything before the hook and show the difference.",
        },
        {
          step: "Add keywords and tags",
          detail:
            "Write the product description in plain searchable words, then add three tag groups of under ten each. Explain why tags are now a signal rather than a traffic source.",
        },
        {
          step: "Plan the reel opening",
          detail:
            "Storyboard the first two seconds. Show a logo-first opening and a result-first opening and explain which one keeps a viewer.",
        },
        {
          step: "Build the month calendar",
          detail:
            "Lay dates against pillars in a sheet and confirm no pillar runs more than two weeks without another. Show how drift becomes visible.",
        },
        {
          step: "Batch a week in one sitting",
          detail:
            "Write five posts consecutively with the brand in mind. Note the time taken against writing one post a day.",
        },
        {
          step: "Schedule the batch",
          detail:
            "Load the week into the platform's own scheduler and set the times. Explain what times to test and why the answer differs per audience.",
        },
        {
          step: "Build the evergreen bank",
          detail:
            "Draft five posts that work any week. Explain that silence is what costs followers and a bank is the cheapest insurance.",
        },
        {
          step: "Review the whole system",
          detail:
            "Show calendar, batch, scheduler and bank together and explain how they make consistency survive a busy week.",
        },
      ],
    },
    practice: {
      title: "One product, four formats, one month planned",
      brief:
        "You take one real product or service and produce it in four formats with distinct hooks, write two complete captions, then build a month's content calendar and batch a full week's posts ready to schedule.",
      steps: [
        "Choose one specific product or service from a real business.",
        "Decide which format suits each of four jobs: announce, teach, reach, sell today.",
        "Write four hooks for the same product — result, contradiction, question, named mistake.",
        "Identify which hook stops a scroll and write one line on why.",
        "Write one complete caption: hook, short-line body, specific proof, one call to action.",
        "Write a second caption for a different format and length, suited to teaching.",
        "Add plain searchable keywords and three tag groups of under ten tags each.",
        "Storyboard the first two seconds of a reel and justify the opening frame.",
        "Build a month's calendar mapping dates to pillars with no pillar dominating.",
        "Batch five posts in one sitting and record how long it took.",
        "Load the batch into a scheduler with chosen posting times.",
        "Draft five evergreen posts for the bank.",
      ],
      standard:
        "Four formats each matched to a stated job, four distinct hooks with one justified as strongest, two complete captions with a single clear call to action each, deliberate keywords and tag groups, a month calendar with visible pillar balance, and a batched week plus an evergreen bank.",
    },
    pitfalls: [
      {
        problem: "Every post is a single product image",
        fix: "Match format to job: carousel to teach, reel to reach new people, story for today's availability, single image to announce. One format for five jobs gives you one job's worth of results.",
      },
      {
        problem: "Your first line is a greeting or an announcement",
        fix: "Cut everything before the hook. 'We are pleased to announce' and 'Happy new week' lose the reader in the only line that matters. Write the hook last and delete what precedes it.",
      },
      {
        problem: "Your captions are walls of text",
        fix: "Break into lines of one or two sentences. A wall is skipped regardless of quality; broken lines get read, and dwell time is what platforms reward.",
      },
      {
        problem: "You give three calls to action",
        fix: "Choose one and state it plainly. 'DM your date and we will send options' converts; 'link in bio, or call, or visit' converts nothing because the reader chooses nothing.",
      },
      {
        problem: "You use thirty generic hashtags",
        fix: "Use three to eight specific ones and put real keywords in the caption. Platforms index your words now, so '#LagosCakes' and a plain product description outperform '#love #happy'.",
      },
      {
        problem: "You decide what to post each morning",
        fix: "Batch a week in one two-hour sitting and schedule it. The expensive part of content is the decision and the context switch, not the typing.",
      },
      {
        problem: "You went silent for two weeks",
        fix: "Keep an evergreen bank of five or six posts that work any week. Silence is what costs followers and enquiries, and the bank is the cheapest insurance available.",
      },
    ],
    expertNotes: [
      "Write the hook after the post, not before. You cannot hook a reader into something you have not yet clarified, and writing it last means you know exactly what the real point is — then cut everything above it.",
      "Keep a swipe file of hooks that stopped you. Every time you scroll past something and then stop, save the first line and note why it worked. After a month you have a personal library of proven openings for your market.",
      "Batch photography separately from batching writing. One session with good light produces a month of images; mixing the two means you stop writing to chase light and lose both. Keep the library organised by product and by pillar.",
      "Test posting times rather than copying advice. The widely quoted best times are averages of audiences that are not yours. Post the same content type at three different times over a month and read your own data — session five covers how.",
    ],
    vocabulary: [
      { term: "Hook", meaning: "The first line or two that gives a reason to keep reading. The entire battle on a feed." },
      { term: "Carousel", meaning: "A swipeable multi-slide post. The strongest format for teaching and for dwell time." },
      { term: "Dwell time", meaning: "How long a viewer stays on a post. Platforms reward it, which is why carousels and long captions perform." },
      { term: "Call to action", meaning: "One stated next step. Multiple options produce no action because the reader chooses none." },
      { term: "Keyword", meaning: "A plain descriptive word in the caption or name field that platform search indexes. Now worth more than hashtags." },
      { term: "Batching", meaning: "Producing a whole period's content in one sitting. Removes the decision cost that makes daily posting fail." },
      { term: "Evergreen bank", meaning: "Posts that work in any week, held in reserve so a bad week never means silence." },
      { term: "Content calendar", meaning: "Dates mapped to pillars so balance and gaps are visible at a glance." },
    ],
    homework: [
      {
        task: "Write twenty hooks",
        detail:
          "For one product, write five of each reliable form — result, contradiction, question, named mistake, number with promise. Rank them and note what separates the top five.",
      },
      {
        task: "Build a swipe file of hooks",
        detail:
          "For one week, save the first line of every post that stops you scrolling, with one line on why. This becomes your most-used reference.",
      },
      {
        task: "Batch a full week",
        detail:
          "Write and prepare five posts in one sitting and time it. Compare with how long five separate sittings took you previously.",
      },
      {
        task: "Build the evergreen bank",
        detail:
          "Draft six posts that work in any week — an introduction, a process, a testimonial, a tip, a behind-the-scenes, a frequently asked question.",
      },
    ],
    rubric: [
      {
        criterion: "Format choice",
        passing: "Uses more than one format.",
        excellent: "Four formats each matched to a stated job, with the reel opening storyboarded for the first two seconds.",
      },
      {
        criterion: "Hooks",
        passing: "First lines are reasonable.",
        excellent: "Four distinct forms, no greetings or announcements opening a post, and a justified judgement on which stops a scroll.",
      },
      {
        criterion: "Caption craft",
        passing: "Captions are readable.",
        excellent: "Short-line structure, a specific proof point, one call to action each, and length matched to whether the post teaches, proves or announces.",
      },
      {
        criterion: "Discovery",
        passing: "Uses some hashtags.",
        excellent: "Three tag groups under ten each, plain searchable keywords in the caption, and an explanation of why tags are now a signal.",
      },
      {
        criterion: "System",
        passing: "Has some plan.",
        excellent: "A month calendar with visible pillar balance, a batched and scheduled week, and an evergreen bank — a system that survives a busy week.",
      },
    ],
    faqs: [
      {
        q: "Do hashtags still work?",
        a: "Less than they did. Platform search and recommendation now carry most discovery, so hashtags act more as a topical signal than a traffic source. Three to eight specific tags plus real keywords in your caption outperform thirty generic ones.",
      },
      {
        q: "How long should a caption be?",
        a: "As long as every line earns the next. Long captions perform well for teaching and storytelling because dwell time signals quality; short captions suit a strong image that already carries the message. What never works is padding — and always put the essentials early for scanners.",
      },
      {
        q: "Reels take too long. Do I need them?",
        a: "They reach the most new people because platforms push video to non-followers, so they matter for growth. But a simple phone reel with a strong first two seconds is enough — the opening matters far more than production polish, and that costs nothing.",
      },
      {
        q: "What is the best time to post?",
        a: "There is no universal answer, and the widely quoted times are averages of audiences that are not yours. Post the same content type at three different times over a month and read your own analytics. Session five covers how to do that properly.",
      },
      {
        q: "Do I need a paid scheduling tool?",
        a: "No. The platforms' own built-in schedulers are free and sufficient. Third-party tools add a unified inbox and cross-posting, which becomes genuinely useful when you manage several clients — but they are a convenience, not a requirement.",
      },
    ],
  },

  "creating-the-content": {
    summary:
      "Making the actual material — planning a shoot with a phone, shooting it well, writing from real customer language, editing quickly in Canva and CapCut, and building a reusable asset library so the next month is faster than this one.",
    objectives: [
      "Plan a content shoot that produces a month of material in one session",
      "Shoot usable photos and video on a phone in ordinary Nigerian light",
      "Write captions from real customer language rather than invented copy",
      "Edit images and short video quickly with free tools",
      "Build and organise a reusable asset library",
      "Repurpose one piece of work into several posts",
    ],
    blocks: [
      {
        heading: "Planning the shoot before you pick up a phone",
        body: [
          "Content production fails most often at planning, not at shooting. A session with no shot list produces forty near-identical photographs and nothing you can actually use across a month; a session with a list produces exactly what the calendar needs. Write the list from the calendar backwards: look at the next four weeks of posts, note what each one needs visually, and shoot that.",
          "A good list groups shots by setup rather than by post, because changing a background or moving to a window costs the most time. All the shots needing a plain background go together, all the ones needing the product in use go together, all the ones needing a person go together. Then note for each shot the format it will become — square, portrait, or vertical for a reel — because that determines how you frame it. Shooting a square and later needing vertical means cropping away the subject.",
          "Practical preparation that takes ten minutes and saves an hour: wipe the phone lens, which is the single most common cause of soft photographs; check storage and battery; gather the props and the products; and choose the time of day by the light available rather than by convenience. In Nigeria the reliable light is early morning and late afternoon; harsh midday sun creates hard shadows and squinting, and it is why so many product photographs look flat and unappealing.",
        ],
      },
      {
        heading: "Shooting well on a phone",
        body: [
          "A modern phone is entirely sufficient for commercial content, and the gap between good and bad phone photographs is almost never the camera. **Light first**: put the subject near a window with indirect light, and never between the light and the camera, which puts the subject in shadow. A large window is a softbox; direct sun through it is not. If the light is on one side only, hold a white sheet or a piece of card on the shadow side to bounce light back — this costs nothing and it is the single biggest quality improvement available.",
          "**Composition second**: keep the subject off-centre using the phone's grid overlay, leave space above and beside it, and shoot more frames than you think you need from three distances — close, medium, wide. The close shot is what performs on a feed. Keep the phone steady with both hands and your elbows in, or lean it against something; a slightly soft photograph is unusable in a way a slightly imperfect composition is not.",
          "**For video**, the rules that matter are few and they are all free. Shoot vertical for reels and stories. Lock exposure and focus by holding your finger on the subject, because a phone that keeps re-adjusting produces visibly pumping brightness. Move the phone slowly or not at all — fast pans look amateurish and make viewers dizzy. Capture **more footage than you need** in short takes of ten to twenty seconds, because editing needs options. And record any speaking close to the phone in a quiet room, because bad audio loses viewers faster than bad video does.",
        ],
      },
      {
        heading: "Writing from real customer language",
        body: [
          "The best captions are not written, they are collected. Business owners hear the same questions and the same phrases every day — 'how much for a small one?', 'can you deliver to Mainland?', 'I need it by Saturday' — and those exact words are more persuasive than any copy you could invent, because they are how the audience actually talks and they prove you understand them.",
          "So keep a **customer language file**. Every time the business receives a message, note the phrasing. Every objection becomes a post that answers it. Every compliment becomes a testimonial post with the customer's own words quoted. Every repeated question becomes a carousel. Within a month you have more content ideas than you can use, all of them grounded in what real people actually ask, and none of them requiring invention.",
          "This method also solves the common paralysis of not knowing what to write. The question 'what should I post?' is hard; the question 'what did three customers ask this week?' is easy and it produces better posts. Testimonial posts deserve particular attention, because in the Nigerian market social proof carries more weight than almost any other content type — a real customer's words and a real photograph of a real delivered product will outsell any amount of polished claims.",
        ],
      },
      {
        heading: "Editing quickly with free tools",
        body: [
          "Image editing in **Canva** covers nearly everything a social manager needs: brightness, contrast, saturation and warmth adjustments, cropping, background removal on paid tiers, and text and shape overlays. The important discipline is to apply the **same adjustment to every image in a set**, because a feed where one photograph is warm and saturated and the next is cool and flat reads as accidental. Decide one look and hold it.",
          "Video editing in **CapCut** — free, and the standard tool for short-form work — handles cutting, captions, music and simple effects. The workflow that saves time is fixed: import all takes, cut to the best moments first and worry about effects second, keep the total under thirty seconds unless the content genuinely needs more, and add **captions to everything**, because a very large share of video is watched without sound and an uncaptioned video loses those viewers entirely. CapCut generates captions automatically; always read them and correct the errors, because an obviously wrong auto-caption looks worse than none.",
          "Resist the temptation to over-edit. Heavy filters, animated stickers on every frame and loud music over speech all reduce the sense that a real business stands behind the post. The standard to aim for is a clear photograph, honest colour, readable text and a message that lands in a few seconds. Restraint reads as confidence.",
        ],
      },
      {
        heading: "The asset library and repurposing",
        body: [
          "Organise everything you shoot into a library from the first day, or you will lose more time searching for images than you saved shooting them. A simple structure works: folders by month, then by product or shoot, with the finished edited versions in a separate folder from the raw ones. Name files so a stranger could find them. Back the library up — a phone that is lost or damaged takes the whole content history with it, and cloud storage is cheap relative to that loss.",
          "**Repurposing** is what makes one shoot last a month. A single product shoot yields: a single-image announcement, a carousel of details, a reel from the video takes, several story frames, and a close-up that becomes a background for a text post. One customer delivery yields a testimonial post, a story, a highlight and a carousel case study. Plan the repurposing at shoot time rather than afterwards, because knowing you need a vertical and a square changes how you frame.",
          "This is also where the work becomes commercially efficient. A client paying for monthly management is paying for a system, not for daily inspiration. One planned shoot, one batching day, a library and a repurposing plan together mean a month of content from roughly two working days — which is what makes managing several clients viable at all.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor plans a real shoot from a calendar, shoots it on a phone in ordinary light, edits the results, and turns one product into six pieces of content — showing the library structure and the customer language file as they go.",
      steps: [
        {
          step: "Work backwards from the calendar",
          detail:
            "Open the month's calendar, list what each post needs visually, and turn that into a shot list. Explain that shooting from a list is what makes one session last a month.",
        },
        {
          step: "Group the shots by setup",
          detail:
            "Reorder the list so all plain-background shots are together, all in-use shots together, all shots needing a person together. Show the time this saves.",
        },
        {
          step: "Prepare in ten minutes",
          detail:
            "Wipe the lens, check storage and battery, gather props, and choose the time by the light. Emphasise that a dirty lens is the most common cause of soft photographs.",
        },
        {
          step: "Set up window light",
          detail:
            "Place the subject near indirect window light and hold a white card on the shadow side. Compare with the same shot in direct sun and in midday shade.",
        },
        {
          step: "Compose with the grid",
          detail:
            "Turn on the grid overlay, place the subject off-centre, and shoot close, medium and wide. Explain that the close shot is what performs on a feed.",
        },
        {
          step: "Frame for the formats you need",
          detail:
            "Shoot vertical for the reel and square for the feed post from the same setup. Explain that shooting square and cropping to vertical loses the subject.",
        },
        {
          step: "Shoot the video takes",
          detail:
            "Lock exposure and focus, move slowly, and capture ten to twenty second takes with more footage than needed. Note that editing requires options.",
        },
        {
          step: "Edit the images consistently",
          detail:
            "Apply one brightness, contrast and warmth setting to every image in the set. Show the feed before and after consistency is applied.",
        },
        {
          step: "Edit the reel in CapCut",
          detail:
            "Import takes, cut to the best moments first, keep it under thirty seconds, and add captions. Read the auto-captions and correct the errors.",
        },
        {
          step: "Build the customer language file",
          detail:
            "Collect the week's real customer messages and objections. Turn three of them directly into post ideas, using the customers' own words.",
        },
        {
          step: "Repurpose into six pieces",
          detail:
            "From one shoot produce an announcement, a carousel, a reel, two story frames and a text background. Show how the shot list made this possible.",
        },
        {
          step: "File the library and back it up",
          detail:
            "Save into the month and product folder structure with the edited versions separate, then back up to cloud storage. Explain the cost of losing a phone.",
        },
      ],
    },
    practice: {
      title: "One shoot, a month of content",
      brief:
        "You plan a shoot from a real calendar, execute it on a phone in ordinary light, edit the results consistently, and repurpose the material into at least six pieces of content, all filed into an organised and backed-up library.",
      steps: [
        "Open the month's calendar and list what each post needs visually.",
        "Turn that into a shot list grouped by setup rather than by post.",
        "Note the required format for each shot — square, portrait or vertical.",
        "Prepare: wipe the lens, check storage and battery, gather props, choose the time by the light.",
        "Set up indirect window light with a white card on the shadow side.",
        "Shoot each subject at close, medium and wide with the grid on.",
        "Capture vertical video takes of ten to twenty seconds with locked exposure.",
        "Edit every image in the set with one consistent brightness, contrast and warmth.",
        "Edit one reel in CapCut under thirty seconds, with corrected captions.",
        "Collect ten real customer messages into a language file and turn three into post ideas.",
        "Repurpose the shoot into at least six distinct pieces of content.",
        "File everything into month and product folders, edited separate from raw, and back it up.",
      ],
      standard:
        "A shot list derived from the calendar and grouped by setup, consistently lit and edited photographs with the close shot present for every subject, one captioned reel under thirty seconds, six distinct pieces repurposed from one shoot, and an organised backed-up library.",
    },
    pitfalls: [
      {
        problem: "You shot forty near-identical photographs and have nothing usable",
        fix: "Write a shot list from the calendar first, grouped by setup. Note the format each shot will become so you frame correctly. An unplanned session produces volume, not material.",
      },
      {
        problem: "Your photographs are soft",
        fix: "Wipe the lens — it is the most common cause — hold the phone with both hands and elbows in, and lean it against something if needed. A slightly imperfect composition is usable; a soft photograph is not.",
      },
      {
        problem: "Your product photos look flat and unappealing",
        fix: "That is harsh midday light. Shoot near indirect window light in the morning or late afternoon, and bounce light back with a white card on the shadow side. This costs nothing and is the largest quality gain available.",
      },
      {
        problem: "Your feed looks like several photographers made it",
        fix: "Apply one adjustment setting to every image in a set. Consistency of colour and contrast is what makes a feed read as one business rather than as a collection.",
      },
      {
        problem: "You published the reel without captions",
        fix: "A large share of video is watched without sound. Add captions in CapCut and correct the auto-generated errors — an obviously wrong caption looks worse than none at all.",
      },
      {
        problem: "You invent captions from scratch every time",
        fix: "Keep a customer language file. Real questions, objections and compliments are more persuasive than invented copy and they generate more ideas than you can use.",
      },
      {
        problem: "You lost a phone and the whole content history with it",
        fix: "Back the library up to cloud storage from day one. The cost of storage is trivial against the cost of re-shooting a year of material that may not be reproducible.",
      },
    ],
    expertNotes: [
      "Wipe the lens before every single shoot. It sounds trivial and it is the difference between a crisp commercial photograph and a hazy one, and it is the most commonly overlooked step by people using phones that have spent the day in a pocket or a bag.",
      "Keep the customer language file open while you write. Using a customer's exact words — 'I need it by Saturday' — converts better than polished copy, because it proves the business understands its own customers. It also removes the blank-page problem permanently.",
      "Decide one edit look and never deviate within a feed. Consistent brightness, contrast and warmth is what makes a grid look like a brand. Changing the look is a deliberate rebrand decision, not something that happens photograph by photograph.",
      "Plan repurposing at shoot time, not afterwards. Knowing you need a vertical for a reel and a square for a feed post changes how you frame, and it is the difference between one shoot yielding two posts and yielding six.",
    ],
    vocabulary: [
      { term: "Shot list", meaning: "The planned list of photographs and takes needed, derived backwards from the content calendar and grouped by setup." },
      { term: "Indirect light", meaning: "Light from a window that is not in direct sun. Soft and flattering; the reliable default for product photography." },
      { term: "Bounce card", meaning: "A white sheet or card held on the shadow side to reflect light back. Free, and the largest single quality improvement." },
      { term: "Customer language file", meaning: "A running collection of real customer phrasing, questions and objections, used as caption material." },
      { term: "Repurposing", meaning: "Turning one shoot or one delivery into several posts across formats. What makes one session last a month." },
      { term: "Asset library", meaning: "Organised folders of raw and edited material, backed up. The infrastructure that makes content production efficient." },
      { term: "Caption (video)", meaning: "On-screen text transcribing speech. Essential because much video is watched without sound." },
      { term: "Edit look", meaning: "The consistent brightness, contrast and warmth applied to every image in a feed. Consistency is what reads as a brand." },
    ],
    homework: [
      {
        task: "Run one planned shoot",
        detail:
          "Write a shot list from a calendar, group it by setup, and execute it. Count how many usable pieces you get — with a list it should be several times what an unplanned session gives.",
      },
      {
        task: "Start the customer language file",
        detail:
          "Collect twenty real customer messages or questions from a business you work with. Turn five into post concepts using the customers' own words.",
      },
      {
        task: "Define your edit look",
        detail:
          "Choose one brightness, contrast, warmth and saturation setting and apply it to ten photographs. Screenshot the settings so you can reproduce them exactly next month.",
      },
      {
        task: "Repurpose one delivery into five posts",
        detail:
          "Take a single completed job or delivered product and produce an announcement, a carousel, a story, a testimonial and a text background from it.",
      },
    ],
    rubric: [
      {
        criterion: "Planning",
        passing: "Has some idea what to shoot.",
        excellent: "A shot list derived backwards from the calendar, grouped by setup, with the target format noted for each shot.",
      },
      {
        criterion: "Shooting",
        passing: "Produces usable photographs.",
        excellent: "Indirect window light with a bounce card, grid composition, close, medium and wide for every subject, and vertical framing captured for reels.",
      },
      {
        criterion: "Editing",
        passing: "Images are edited.",
        excellent: "One consistent look across the whole set, and a reel under thirty seconds with corrected captions.",
      },
      {
        criterion: "Content source",
        passing: "Writes captions.",
        excellent: "Works from a customer language file, using real phrasing, objections and compliments rather than invented copy.",
      },
      {
        criterion: "Efficiency",
        passing: "Produces the required pieces.",
        excellent: "At least six pieces repurposed from one shoot, all filed in an organised backed-up library with edited separate from raw.",
      },
    ],
    faqs: [
      {
        q: "Do I need a real camera?",
        a: "No. A modern phone with clean lens, indirect window light and a white bounce card produces commercial-quality content. The gap between good and bad phone photographs is light and steadiness, not sensor size.",
      },
      {
        q: "What free tools should I use?",
        a: "Canva for images — adjustments, text, layout — and CapCut for video, which is the standard for short-form work and generates captions automatically. Both are free and together they cover essentially everything a social manager needs.",
      },
      {
        q: "How often should I shoot?",
        a: "One planned session a month, batched, is enough for a small business posting three to four times a week — provided you repurpose properly. Shooting daily produces inconsistency and exhaustion; one good session with a shot list produces a month of material.",
      },
      {
        q: "My client's products do not photograph well. What do I do?",
        a: "It is nearly always light and background, not the product. Indirect window light, a plain uncluttered background, a bounce card on the shadow side and a close crop solve most of it. Where a product genuinely is unphotogenic, shift to showing the process and the customer's result instead.",
      },
      {
        q: "Should I use trending audio on reels?",
        a: "It can help reach, but never over speech, and never where it fights the brand. A trending sound on a product reel is fine; the same sound on a testimonial undermines it. Read the auto-caption, keep speech clear, and let the message lead.",
      },
    ],
  },
};
