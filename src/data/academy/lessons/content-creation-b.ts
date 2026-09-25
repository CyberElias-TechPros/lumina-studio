import type { SessionLecture } from "../types";

/**
 * Content Creation — ₦15,000 · 3 weeks · 6 sessions.
 * Sessions 4 to 6. (Sessions 1–3 in content-creation.ts.)
 */
export const contentCreationLessonsB: Record<string, SessionLecture> = {
  "packaging-and-publishing": {
    summary:
      "A finished video that nobody clicks is unfinished. This session covers the packaging that earns the click — thumbnail, title, caption — then publishing properly and running a calendar that survives a busy week.",
    objectives: [
      "Design a thumbnail that survives being seen at a small size",
      "Write titles that earn the click without misleading",
      "Write captions and hashtags that help rather than decorate",
      "Publish correctly on each platform, including settings most people miss",
      "Build a content calendar you can actually keep",
      "Batch production so publishing is not a weekly crisis",
    ],
    blocks: [
      {
        heading: "Thumbnails",
        body: [
          "A thumbnail has one job: to be clicked while small, fast and surrounded by competitors. It is seen at roughly the size of a postage stamp for a fraction of a second, so **legibility at small size is the whole test**. Design it, then shrink it to a quarter of the screen and look again — if you cannot read it, nobody can.",
          "Three elements are enough. **A clear subject** — a face with a readable expression, or the object the video is about, filling much of the frame. **Three or four words at most**, large enough to read when small, in a font with weight. **Contrast** — the subject separated from the background, because a busy image reads as noise at thumbnail size.",
          "The failure modes are consistent. Too many words, so it becomes a paragraph nobody reads. A subject too small, so it is a speck. Low contrast, so it disappears against the feed background. And an image that does not match the video, which earns the click and loses the viewer within seconds — a bad trade, because a video people abandon tells the platform not to show it to anyone else.",
        ],
      },
      {
        heading: "Titles",
        body: [
          "A title tells someone **what they get and why it matters to them**. 'How I fixed my phone battery in one setting' does that. 'My thoughts on batteries' does not, because it describes the creator rather than the viewer's benefit. The question a title must answer is: what will I know or be able to do after watching?",
          "The reliable structures are **the specific result** ('Three settings that doubled my phone storage'), **the question the viewer already has** ('Why does your data finish so fast?'), and **the numbered list** ('Five free tools I use every day'). All three promise something concrete, and concreteness is what earns a click from a stranger who has no reason to trust you yet.",
          "Then the line you do not cross. **Clickbait that misleads** — a title promising something the video does not deliver — gets the click and destroys the channel, because viewers leave immediately, completion collapses, and the platform learns your videos disappoint. There is a difference between a compelling title and a false one, and the test is simple: does the video deliver exactly what the title promised?",
        ],
      },
      {
        heading: "Captions, hashtags and descriptions",
        body: [
          "The caption supports the title rather than repeating it. **Open with the hook** — the first line is often all that shows before the 'more' button, so it must be worth reading on its own. Then one or two lines of context, then the call-to-action: one specific thing, not five requests that produce none.",
          "**Hashtags** are a discovery aid, not magic. Three to five relevant ones beat thirty unrelated ones, because irrelevant tags put your video in front of people who will not watch it, and that poor response tells the platform the video is weak. Mix one broad tag, one or two specific ones and, if it exists, one local tag — and put them at the end rather than breaking up the caption.",
          "The **description** matters most on YouTube, where it is searchable text. Put the key phrase near the top, add timestamps for longer videos (which genuinely help viewers and increase watch time), and include any link you want clicked. On short-form platforms the description is largely ignored, so effort is better spent on the caption and the thumbnail.",
        ],
      },
      {
        heading: "Publishing properly",
        body: [
          "Each platform has settings that most people miss and that cost real reach. **Upload natively** rather than posting a link to a video hosted elsewhere — platforms suppress external links because they send viewers away, and a re-uploaded file nearly always outperforms a linked one. **Upload the highest quality you have**, because platforms recompress, and starting from a low-quality file produces something visibly worse.",
          "Then the details. **Write the caption in the app rather than pasting from elsewhere** where formatting breaks. **Choose the cover frame deliberately** on platforms that let you, rather than accepting a random blurry moment. **Check the aspect ratio** — a vertical video posted to a horizontal player, or the reverse, wastes most of the screen and reads as careless.",
          "**Timing** matters less than people believe, but posting when your audience is awake and scrolling is free to get right: evenings and weekends for most Nigerian audiences. What matters more is **consistency**, because an audience learns your rhythm and a channel that posts unpredictably is easy to forget. And reply to early comments within the first hour — engagement there is a strong signal, and it is also simply good practice.",
        ],
      },
      {
        heading: "Calendars and batching",
        body: [
          "A content calendar fails when it is built on ambition rather than available hours. Count what you can genuinely produce in a week — including shooting, editing and packaging, which is usually three times longer than people expect — and plan that number. **Three videos a week kept for six months beats daily videos kept for eleven days**, and the difference is entirely honesty about capacity.",
          "Then **batch**. Shoot two or three videos in one session while the light and the setup are right, edit them in another block, and package them in a third. Producing one video at a time costs the full switch into each mode every time; batching groups those costs and usually doubles output for the same hours.",
          "Finally, **leave slack**. Plan a week but write only a week ahead, and keep one slot deliberately empty for something timely — a response to a question that came up in the comments, a trend worth joining, a piece of news in your topic. Calendars with no room for reality are abandoned; calendars with slack are kept, and the unplanned slot is often where the best work comes from.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor packages one finished video completely: three thumbnail candidates tested at a quarter size, three titles checked against what the video actually delivers, a caption with a working hook, the platform settings most people miss, and a batched week planned from real available hours.",
      steps: [
        {
          step: "Design three thumbnails",
          detail:
            "Produce three candidates: a face with expression, the object alone, and a before-and-after. Explain that the test is legibility at small size, not beauty.",
        },
        {
          step: "Shrink to a quarter",
          detail:
            "View each at a quarter of the screen. Discard the ones that fail and explain that this is the only test that matters.",
        },
        {
          step: "Check the failure modes",
          detail:
            "Look for too many words, a subject too small, and low contrast. Explain that a busy image reads as noise at thumbnail size.",
        },
        {
          step: "Verify the thumbnail matches the video",
          detail:
            "Confirm the image shows what the video delivers. Explain that a mismatched thumbnail earns the click and loses the viewer, which tells the platform not to show it again.",
        },
        {
          step: "Write three titles",
          detail:
            "Draft a specific result, a question and a numbered list. Explain that each must answer what the viewer will know or be able to do afterwards.",
        },
        {
          step: "Test against clickbait",
          detail:
            "Ask whether the video delivers exactly what each title promises. Strike out any that overstate and explain why misleading titles destroy a channel.",
        },
        {
          step: "Write the caption",
          detail:
            "Open with a hook that works as the visible first line, add context, then one call-to-action. Show a five-request version and explain why it produces none.",
        },
        {
          step: "Choose hashtags",
          detail:
            "Pick three to five relevant tags — one broad, two specific, one local. Explain that thirty irrelevant tags put the video in front of people who will not watch it.",
        },
        {
          step: "Write the description",
          detail:
            "Put the key phrase near the top, add timestamps, include the link. Explain that descriptions matter on YouTube and are largely ignored on short-form.",
        },
        {
          step: "Check the platform settings",
          detail:
            "Upload natively rather than linking, at the highest quality, with the right aspect ratio and a chosen cover frame. Explain that platforms suppress external links.",
        },
        {
          step: "Plan the batched week",
          detail:
            "Count real available hours including shooting, editing and packaging, then block shooting, editing and packaging separately. Explain that batching groups the switching costs.",
        },
        {
          step: "Leave one slot empty",
          detail:
            "Mark one day unplanned for something timely. Explain that calendars without slack are abandoned and the empty slot often holds the best work.",
        },
      ],
    },
    practice: {
      title: "Package and publish one video, then plan a week",
      brief:
        "You package a finished video completely — three thumbnails tested at a quarter size, three titles checked against what the video delivers, a caption with a working hook, three to five hashtags, and a correct description — publish it with the platform settings right, then build a batched one-week calendar from your real available hours with one deliberately empty slot.",
      steps: [
        "Design three thumbnail candidates: face with expression, object alone, before-and-after.",
        "Shrink each to a quarter size and keep only those still legible.",
        "Check each for too many words, a subject too small, and low contrast.",
        "Confirm the chosen thumbnail shows what the video actually delivers.",
        "Write three titles: a specific result, a question, a numbered list.",
        "Ask of each whether the video delivers exactly that, and strike out any that overstate.",
        "Write a caption whose first line works alone, plus context and one call-to-action.",
        "Choose three to five relevant hashtags: one broad, two specific, one local.",
        "Write the description with the key phrase early, timestamps, and any link.",
        "Upload the file natively at the highest quality, in the correct aspect ratio.",
        "Choose the cover frame deliberately rather than accepting a random moment.",
        "Write the caption in the app so the formatting does not break.",
        "Publish when your audience is awake and reply to early comments within the hour.",
        "Count your real weekly hours including shooting, editing and packaging.",
        "Set your weekly video count from that number rather than from ambition.",
        "Block shooting, editing and packaging as separate batched sessions.",
        "Leave one calendar slot deliberately empty for something timely.",
      ],
      standard:
        "Three thumbnails tested at a quarter size with only the legible kept, the chosen one matching what the video delivers, three titles with any overstatement struck out, a caption whose first line stands alone with one call-to-action, three to five relevant hashtags, a description with the key phrase early and timestamps, a native upload at full quality in the correct aspect ratio with a chosen cover frame, early comments answered within the hour, and a batched weekly calendar set from real available hours with shooting, editing and packaging blocked separately and one slot deliberately empty.",
    },
    pitfalls: [
      {
        problem: "Your thumbnail has too many words",
        fix: "Three or four at most, large enough to read at a quarter size. A thumbnail is seen at postage-stamp scale for a fraction of a second, and a paragraph nobody reads is decoration.",
      },
      {
        problem: "You only checked the thumbnail at full size",
        fix: "Shrink it to a quarter and look again. The full-size view in your editor is not what a viewer sees, and this single check removes most bad thumbnails.",
      },
      {
        problem: "Your thumbnail does not match the video",
        fix: "Show what the video actually delivers. A mismatch earns the click and loses the viewer in seconds, which teaches the platform your videos disappoint and suppresses everything after.",
      },
      {
        problem: "Your title describes you rather than the benefit",
        fix: "State what the viewer will know or be able to do. 'My thoughts on batteries' describes the creator; 'Three settings that doubled my phone storage' describes a benefit.",
      },
      {
        problem: "You used clickbait that overstates",
        fix: "Ask whether the video delivers exactly what the title promises. Misleading titles get the click and destroy the channel, because collapsing completion tells the platform to stop showing your work.",
      },
      {
        problem: "You used thirty irrelevant hashtags",
        fix: "Three to five relevant ones. Irrelevant tags put your video in front of people who will not watch it, and that poor response marks the video as weak.",
      },
      {
        problem: "You posted a link instead of the file",
        fix: "Upload natively. Platforms suppress external links because they send viewers away, and a re-uploaded file nearly always outperforms a linked one.",
      },
      {
        problem: "Your calendar is built on ambition",
        fix: "Count real hours including shooting, editing and packaging — usually three times what you expect — and plan that number. Three videos a week kept for six months beats daily videos kept for eleven days.",
      },
    ],
    expertNotes: [
      "Test every thumbnail at a quarter size before publishing. It is seen at postage-stamp scale for a fraction of a second, and this one check eliminates most of the thumbnails that quietly cost a video its reach.",
      "Ask whether the video delivers exactly what the title and thumbnail promise. A misleading package gets the click and then teaches the platform that your videos disappoint, which suppresses everything you publish afterwards.",
      "Upload the file natively rather than linking to it. Platforms suppress external links because they send viewers elsewhere, and the difference in reach between a linked video and an uploaded one is large and entirely avoidable.",
      "Plan your calendar from hours you actually have, including editing and packaging time. Almost everyone underestimates production time by a factor of three, and a calendar built on the underestimate is abandoned by week three.",
    ],
    vocabulary: [
      { term: "Thumbnail", meaning: "The image a viewer sees before clicking. Tested by legibility at small size, not by how it looks full screen." },
      { term: "Click-through rate", meaning: "The proportion who click after seeing the thumbnail and title. The measure of whether the package works." },
      { term: "Clickbait", meaning: "A package that overstates what the video delivers. Earns the click and destroys retention and trust." },
      { term: "Caption", meaning: "The text under a short-form video. The first line is often all that shows before 'more'." },
      { term: "Hashtag", meaning: "A discovery tag. Three to five relevant ones outperform thirty irrelevant ones." },
      { term: "Native upload", meaning: "Uploading the file to the platform rather than linking elsewhere. Linked videos are suppressed." },
      { term: "Aspect ratio", meaning: "The shape of the frame. Vertical for short-form; wrong orientation wastes most of the screen." },
      { term: "Content calendar", meaning: "A plan built from real available hours with one deliberately empty slot for timely work." },
    ],
    homework: [
      {
        task: "Package one video three ways",
        detail:
          "Three thumbnails and three titles for the same video, all tested at a quarter size and all checked against what the video actually delivers. Note which you would choose and why.",
      },
      {
        task: "Fix your last published video's package",
        detail:
          "Look at your most recent upload and rewrite its title and caption to state the viewer's benefit in the first line. Compare the response over the following week.",
      },
      {
        task: "Audit your upload settings",
        detail:
          "Check your last three uploads: native file or link, quality, aspect ratio, cover frame. Fix the process for the next one — these are free reach most people leave behind.",
      },
      {
        task: "Build one batched week",
        detail:
          "Count real hours including editing and packaging, set the video count from that, block the three sessions separately, and leave one slot empty.",
      },
    ],
    rubric: [
      {
        criterion: "Thumbnail",
        passing: "Has an image.",
        excellent: "Three candidates tested at a quarter size, the chosen one legible with a clear subject and few words, and matching what the video delivers.",
      },
      {
        criterion: "Title",
        passing: "Names the topic.",
        excellent: "States what the viewer will know or be able to do, in one of the reliable structures, and delivers exactly what it promises.",
      },
      {
        criterion: "Caption and tags",
        passing: "Has a caption.",
        excellent: "A first line that works alone, one call-to-action rather than five, and three to five relevant hashtags placed at the end.",
      },
      {
        criterion: "Publishing",
        passing: "Posts the video.",
        excellent: "Native upload at full quality, correct aspect ratio, chosen cover frame, caption written in the app, and early comments answered within the hour.",
      },
      {
        criterion: "Calendar",
        passing: "Plans to post regularly.",
        excellent: "A weekly count derived from real hours including editing and packaging, with shooting, editing and packaging batched separately and one slot deliberately empty.",
      },
    ],
    faqs: [
      {
        q: "Does the thumbnail matter on TikTok and Reels?",
        a: "Less than on YouTube, because viewers scroll rather than choose from a grid — but the first frame still does the same job, and on Instagram a chosen cover keeps your profile grid coherent. On YouTube the thumbnail and title are most of what determines whether anyone clicks.",
      },
      {
        q: "How many hashtags should I use?",
        a: "Three to five relevant ones. Thirty irrelevant tags put your video in front of people who will not watch it, and that poor response tells the platform the video is weak. Mix one broad, two specific and one local tag if it exists.",
      },
      {
        q: "What is the best time to post?",
        a: "When your audience is awake and scrolling — evenings and weekends for most Nigerian audiences. But timing matters far less than consistency, because an audience learns your rhythm and a channel that posts unpredictably is simply forgotten.",
      },
      {
        q: "Should I post the same video everywhere?",
        a: "Yes, but upload the file natively to each platform rather than linking, and remove any other platform's watermark before re-posting — several platforms suppress videos carrying a competitor's logo. Adjust the caption and hashtags slightly for each audience.",
      },
      {
        q: "How many videos a week is realistic?",
        a: "Count your real hours including shooting, editing and packaging — most people underestimate by a factor of three — and plan that number. For most beginners, two or three a week is sustainable; daily is not, and an abandoned channel is worse than a slow one.",
      },
    ],
  },

  "growth-rights-responsibility": {
    summary:
      "Growth is a system, not luck — and the same reach that builds an audience creates real obligations. This session covers engagement and analytics, copyright and privacy, and the responsibility that comes with having people listen.",
    objectives: [
      "Engage with an audience in a way that builds rather than drains",
      "Read analytics and act on what they actually tell you",
      "Understand copyright well enough to avoid losing your work",
      "Handle other people's privacy and consent correctly",
      "Recognise the responsibility that comes with reach",
      "Build a growth plan based on evidence rather than hope",
    ],
    blocks: [
      {
        heading: "Engagement",
        body: [
          "Engagement is a two-way relationship, and the part most creators neglect is the returning. **Reply to comments**, especially in the first hour — early engagement is a strong distribution signal, and it is also simply how you treat people who took time to write to you. A reply is remembered far longer than the video that prompted it.",
          "Then **use the comments as research**. They are your audience telling you, unprompted, what they want next, what confused them and what they disagree with. A question asked by three people is a video; a confusion mentioned twice is a correction to make. Almost every creator has this information sitting unread in their own comment section.",
          "The trap is that engagement can consume the time meant for making work. Set a **bounded window** — thirty minutes after publishing, fifteen minutes a day otherwise — and stick to it. An audience is built by the videos, not by the replies, and a creator who spends all day in the comments is not making the thing people came for. Ignore abuse entirely; you owe nothing to someone being cruel, and arguing with them is the only way to lose.",
        ],
      },
      {
        heading: "Reading analytics",
        body: [
          "Four numbers matter and they answer four different questions. **Reach or impressions** — how many saw it. **Click-through** — of those, how many chose to watch, which tests your thumbnail and title. **Average watch time or retention** — how long they stayed, which tests your hook and your content. **Follows or shares** — whether it was worth continuing with, which tests the whole thing.",
          "Read them in order, because the order tells you what to fix. Many impressions and few clicks means **the package failed** — change the thumbnail or title, not the video. Good clicks and low retention means **the opening failed** — the video did not deliver what the package promised, or the first seconds lost people. Good retention and few follows means **the content is fine but gives no reason to return** — the channel needs more coherence.",
          "Then two disciplines. **Compare like with like**: a short video against your other short videos, not against someone else's long-form. And **wait for enough data** — one video's numbers are weather, not climate; a pattern across ten tells you something real. Most creators change everything after one bad video, which is how a working approach gets abandoned by accident.",
        ],
      },
      {
        heading: "Copyright",
        body: [
          "**Copyright** means someone owns the creative work, and using it without permission can get your video muted, blocked or removed, and in repeated cases your account restricted. The common failures are music taken from a streaming service, film or match clips, and other people's footage or photographs — all of which are owned by someone.",
          "The safe routes are simple. Use your **platform's built-in music library**, which is cleared for use there. Use genuinely **royalty-free** sources and keep the licence. Shoot your own footage and take your own photographs, which also happen to look better because they are specific to your content. And for anything you are unsure about, **leave it out** — the cost of a removed video after hours of work is much higher than the cost of finding an alternative.",
          "Two nuances worth knowing. **Attribution is not permission** — crediting the owner does not make the use legal, which surprises most people. And **your own work is protected too**: if someone re-uploads your video, you can report it. Keeping your original project files and dated exports is what proves the work is yours, and it is a good habit to build before you need it rather than after.",
        ],
      },
      {
        heading: "Privacy and consent",
        body: [
          "Filming other people raises obligations that have nothing to do with copyright. **Ask before filming someone identifiable**, and be clear about where it will be published. Verbal agreement on camera is enough for most content, and it costs one sentence — 'I am making a video about the market, is it alright if I film you?' People almost always say yes when asked, and the asking is itself what makes it acceptable.",
          "Be especially careful with **children, medical situations, people in distress, and anything filmed inside a private space**. Nigeria's data protection framework, the **NDPA 2023**, gives people rights over their personal data, and identifiable footage of a person is personal data. Publishing someone's face, name, location or documents without consent is not a content decision — it is a legal and ethical one, and the person affected cannot undo it however much you later regret it.",
          "Then the practical habits. **Do not film screens** showing messages, bank details, order lists or client names. **Blur or avoid** number plates, ID documents and addresses. **Never share** someone's private message without permission, even to complain about them — it looks defensible in the moment and it is the fastest way to lose an audience's trust, because everyone watching knows you would do the same to theirs.",
        ],
      },
      {
        heading: "Responsibility with reach",
        body: [
          "Once people listen to you, what you say has consequences you did not have before. The specific risks for a creator are **health and money claims** — advice that could cause real harm if wrong — **presenting speculation as fact**, and **promoting products you have not used**. None of these require malice; they happen through carelessness, and the audience pays for it.",
          "The standard that protects both you and them is simple: **say what you know and mark what you are guessing**. 'This worked for me' is honest; 'this will work for you' is a claim you cannot support. If you are repeating something you read, say where it came from. If you are paid to promote something, say so — undisclosed promotion erodes trust permanently once discovered, and disclosure costs nothing.",
          "Then the sustainability question, because burnout ends more channels than any algorithm change. **Protect the work from the metrics**: check numbers weekly rather than hourly, because watching them constantly makes every small dip feel like failure. Keep a **life outside the channel**, since a creator whose whole identity is online is one bad week away from quitting. And accept that **growth is uneven** — long flat periods punctuated by sudden jumps is the normal shape, and quitting during a flat period is the most common unnecessary loss there is.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor reads a real channel's analytics stage by stage to find what is actually failing, checks a planned video for copyright and privacy problems before filming, obtains consent on camera, and builds a growth plan from the evidence rather than from hope.",
      steps: [
        {
          step: "Open the real analytics",
          detail:
            "Pull reach, click-through, retention and follows for the last ten videos. Explain that each number answers a different question and they must be read in order.",
        },
        {
          step: "Diagnose a package failure",
          detail:
            "Find a video with many impressions and few clicks. Explain that the thumbnail or title failed and the video itself is not the problem.",
        },
        {
          step: "Diagnose a retention failure",
          detail:
            "Find good clicks with low watch time. Explain that the opening lost people or the video did not deliver what the package promised.",
        },
        {
          step: "Diagnose a follow failure",
          detail:
            "Find good retention with few follows. Explain that the content is fine but gives no reason to return, which points at channel coherence.",
        },
        {
          step: "Set the comparison rules",
          detail:
            "Compare short with short and wait for ten videos. Explain that one video's numbers are weather and changing everything after one bad video abandons working approaches by accident.",
        },
        {
          step: "Check a plan for copyright",
          detail:
            "Review a planned video using a popular track and a film clip. Explain that both are owned and that a removed video after hours of work is the expensive outcome.",
        },
        {
          step: "Substitute legal sources",
          detail:
            "Replace with platform-library music and self-shot footage. Explain that attribution is not permission, which surprises most people.",
        },
        {
          step: "Identify privacy risks",
          detail:
            "Walk a planned market shoot and list who would be identifiable. Explain that identifiable footage is personal data under the NDPA 2023.",
        },
        {
          step: "Obtain consent on camera",
          detail:
            "Ask a real person for permission and record the agreement. Explain that people almost always say yes when asked, and the asking is what makes it acceptable.",
        },
        {
          step: "Check what is on screen",
          detail:
            "Look for messages, bank details, number plates and client names. Explain that a filmed screen is the most common accidental privacy breach there is.",
        },
        {
          step: "Set the claim standard",
          detail:
            "Rewrite 'this will work for you' as 'this worked for me'. Explain that marking what you are guessing protects the audience and you.",
        },
        {
          step: "Plan sustainable engagement",
          detail:
            "Set a bounded reply window and explain that an audience is built by the videos rather than by the replies.",
        },
        {
          step: "Build the growth plan",
          detail:
            "State the one change the analytics support and the number it will be judged on. Explain that this is a plan from evidence rather than hope.",
        },
      ],
    },
    practice: {
      title: "Audit your growth, your rights and your responsibilities",
      brief:
        "You read ten videos' analytics in order to find what is actually failing, audit a planned video for copyright and privacy risk with legal substitutions and consent obtained on camera, set a sustainable engagement window, and write a growth plan naming one evidence-based change and the number it will be judged on.",
      steps: [
        "Collect reach, click-through, retention and follows for your last ten videos.",
        "Read them in order and note which stage fails most often.",
        "Classify each weak video as a package, opening or coherence problem.",
        "Set your comparison rules: like with like, and ten videos before concluding.",
        "Name the one change the evidence supports, rather than three you feel like making.",
        "State the number that change will be judged on, and when you will check it.",
        "List everything in your next planned video that someone else might own.",
        "Replace each with a legal source: platform library, royalty-free, or self-shot.",
        "Note that crediting an owner does not make the use legal.",
        "List every identifiable person who would appear in the video.",
        "Ask for consent and record the agreement on camera before filming.",
        "Check every screen you will film for messages, bank details and client names.",
        "Decide what will be blurred, cropped or left out entirely.",
        "Set a bounded engagement window and write it down.",
        "Rewrite any claim in your scripts from 'this will work' to 'this worked for me'.",
        "Note where you will disclose any paid promotion.",
      ],
      standard:
        "Ten videos' analytics read in order with each weak one classified as a package, opening or coherence problem and comparison rules stated, one evidence-based change named with the number and date it will be judged on, every third-party element in the next video identified and replaced with a legal source, every identifiable person listed with consent recorded on camera, every filmed screen checked for private information with blur or exclusion decided, a written engagement window, and every absolute claim rewritten as a personal result with paid promotion disclosed.",
    },
    pitfalls: [
      {
        problem: "You change everything after one bad video",
        fix: "Wait for ten. One video's numbers are weather rather than climate, and abandoning a working approach after a single dip is how channels regress by accident.",
      },
      {
        problem: "You fix the video when the package failed",
        fix: "Read the stages in order. Many impressions with few clicks means the thumbnail or title failed; re-editing a video nobody clicked cannot help.",
      },
      {
        problem: "You spend all day in the comments",
        fix: "Set a bounded window — thirty minutes after publishing, fifteen a day otherwise. An audience is built by the videos, and time in the comments is time not making them.",
      },
      {
        problem: "You used a popular track or film clip",
        fix: "Use the platform library, royalty-free sources or your own footage. A video removed after hours of work is far more expensive than finding an alternative.",
      },
      {
        problem: "You think crediting the owner makes it legal",
        fix: "Attribution is not permission. Crediting someone whose work you used without consent does not change the infringement, which is the most common misunderstanding there is.",
      },
      {
        problem: "You filmed identifiable people without asking",
        fix: "Ask and record the agreement on camera. Identifiable footage is personal data under the NDPA 2023, and the person cannot undo publication however much you later regret it.",
      },
      {
        problem: "Your screen recording shows private information",
        fix: "Check every screen before filming for messages, bank details, number plates and client names. It is the most common accidental privacy breach and it is unrecoverable once published.",
      },
      {
        problem: "You state guesses as facts",
        fix: "Say what you know and mark what you are guessing. 'This worked for me' is honest; 'this will work for you' is a claim you cannot support, and the audience pays when it is wrong.",
      },
    ],
    expertNotes: [
      "Read analytics in order — reach, click-through, retention, follows — because the order names the fix. Changing the video when the thumbnail failed is the most common waste of effort in content creation.",
      "Wait for ten videos before drawing conclusions. One result is weather and a pattern across ten is information, and most creators abandon working approaches by reacting to a single dip.",
      "Ask for consent on camera before filming anyone identifiable. It costs one sentence, people almost always say yes when asked, and the asking is precisely what makes the footage acceptable to publish.",
      "Say what you know and mark what you are guessing. It protects your audience from bad advice, it protects you from claims you cannot support, and it is what makes people trust the rest of what you say.",
    ],
    vocabulary: [
      { term: "Retention", meaning: "How long viewers stay. Tests the hook and the content, and drives distribution more than likes." },
      { term: "Click-through", meaning: "The proportion who click after seeing the package. Tests the thumbnail and title, not the video." },
      { term: "Copyright", meaning: "Ownership of creative work. Using it without permission risks muting, blocking, removal and account restriction." },
      { term: "Royalty-free", meaning: "Licensed for use without per-play payment. Distinct from free, and distinct from attribution." },
      { term: "Attribution", meaning: "Crediting the owner. Necessary in some licences but never a substitute for permission." },
      { term: "Consent", meaning: "Permission to film an identifiable person. Recorded on camera; required before publication." },
      { term: "NDPA 2023", meaning: "Nigeria's data protection law. Identifiable footage of a person is personal data under it." },
      { term: "Disclosure", meaning: "Stating when you are paid to promote something. Costs nothing and protects trust permanently." },
    ],
    homework: [
      {
        task: "Read ten videos in order",
        detail:
          "Reach, click-through, retention, follows. Classify each weak one as a package, opening or coherence problem, and name the single change the evidence supports.",
      },
      {
        task: "Audit your next video before filming",
        detail:
          "List everything someone else might own and everything identifiable that would appear. Substitute legal sources and plan the consent requests.",
      },
      {
        task: "Check every screen you film",
        detail:
          "Messages, bank details, number plates, client names, ID documents. Decide what gets blurred, cropped or left out before you press record.",
      },
      {
        task: "Set your engagement window",
        detail:
          "Thirty minutes after publishing, fifteen a day otherwise, written down. Then use the comments as research: every repeated question is a future video.",
      },
    ],
    rubric: [
      {
        criterion: "Analytics",
        passing: "Looks at views.",
        excellent: "Reads reach, click-through, retention and follows in order, classifies each failure by stage, and compares like with like across ten videos.",
      },
      {
        criterion: "Growth plan",
        passing: "Hopes to grow.",
        excellent: "One evidence-based change named with the number it will be judged on and the date it will be checked, rather than several changes made on feeling.",
      },
      {
        criterion: "Copyright",
        passing: "Avoids obvious theft.",
        excellent: "Every third-party element identified and replaced with a legal source, with the distinction between attribution and permission understood.",
      },
      {
        criterion: "Privacy",
        passing: "Is careful.",
        excellent: "Every identifiable person listed with consent recorded on camera, and every filmed screen checked for messages, financial details and client names.",
      },
      {
        criterion: "Responsibility",
        passing: "Means well.",
        excellent: "Claims marked as personal results rather than promises, paid promotion disclosed, and a sustainable engagement window that protects the time needed to make the work.",
      },
    ],
    faqs: [
      {
        q: "Why did my video stop getting views?",
        a: "Read the stages rather than guessing. Many impressions with few clicks means the package failed; good clicks with low retention means the opening lost people. Also check whether one video's numbers are being treated as a pattern — a single result is weather, and growth is genuinely uneven with long flat periods between jumps.",
      },
      {
        q: "Can I use a popular song if I credit the artist?",
        a: "No. Attribution is not permission, which is the most common misunderstanding in content creation. Use your platform's built-in music library, which is cleared for use there, or a genuinely royalty-free source with the licence kept.",
      },
      {
        q: "Do I need permission to film people in public?",
        a: "Ask, and record the agreement on camera. It costs one sentence and people almost always say yes. Under the NDPA 2023, identifiable footage of a person is personal data, and publishing it without consent is something the person cannot undo however much you later regret it.",
      },
      {
        q: "What if someone re-uploads my video?",
        a: "Report it through the platform's copyright process. Your original project files and dated exports are what prove the work is yours, which is why keeping them is a habit worth building before you need it rather than after.",
      },
      {
        q: "Do I have to disclose paid promotion?",
        a: "Yes. Disclosing costs nothing and being discovered without it costs trust permanently, because your audience realises everything you recommend might be paid for. Say it plainly at the start rather than burying it in the description.",
      },
    ],
  },

  "final-short-form-video": {
    summary:
      "The final project: one complete short-form educational or promotional video — scripted, shot, edited with captions and a thumbnail, published, and reviewed against its first week of analytics — then screened and critiqued by the class.",
    objectives: [
      "Take one idea from script to published video without losing the thread",
      "Apply every standard from the course in a single piece of work",
      "Review your own video honestly against its real analytics",
      "Present work to peers and take critique productively",
      "Give critique that is specific and useful rather than kind or cruel",
      "Set the plan for the next ninety days of content",
    ],
    blocks: [
      {
        heading: "The brief",
        body: [
          "One short-form video, **educational or promotional**, sixty to ninety seconds, on a topic drawn from your content pillars. It must be scripted before shooting, shot to the standards from session two, edited to the standards from session three, packaged from session four, and published — then reviewed a week later against its real numbers.",
          "The point of the constraints is that they are the actual job. A video that exists only as a plan is not a video, and an unpublished video has no analytics to learn from. **Publishing is part of the deliverable** precisely because it is the step most people avoid, and avoiding it is why so many people have a folder of unfinished work and no audience.",
          "Choose the topic by asking **what would most help someone new to your subject**, not what is most impressive to make. A clear explanation of a basic thing outperforms an ambitious piece nobody can follow, and it is also far more achievable in the time available — which matters, because finishing is the skill this project actually tests.",
        ],
      },
      {
        heading: "Running the production properly",
        body: [
          "Work in the order the course taught, because each step depends on the last. **Script first** — hook, setup, body in three or four points, close — and time it from the word count before shooting anything. Shooting before the script is finished is how you end up with ninety minutes of footage and no structure.",
          "**Then shoot**, with the light set before you press record: window faced, bounce in place, phone at eye level, background cleared, room quiet, and at an arm's length for audio. Record three takes and keep the best. This is the stage people rush and the one that costs most to fix later, because bad light and bad audio cannot be repaired in editing.",
          "**Then edit** in the right order: rough cut for structure, fine cut to remove a third of the running time, then text, music and captions, then export. **Then package**: a thumbnail tested at a quarter size, a title that states the viewer's benefit and delivers exactly what it promises, a caption whose first line works alone, and a native upload at full quality. Skipping any of these produces a video that underperforms for reasons that have nothing to do with the content.",
        ],
      },
      {
        heading: "Reviewing against real analytics",
        body: [
          "A week after publishing, read the four numbers in order. **Impressions** — did the platform show it? **Click-through** — did the package earn the watch? **Retention** — did the content hold? **Follows or shares** — was it worth continuing with? Each answers a different question and together they tell you what to change next.",
          "Then be honest in a way that is genuinely difficult. The instinct is to explain the numbers rather than read them — 'the algorithm was bad', 'people do not appreciate this kind of content' — and those explanations feel better while teaching nothing. The useful reading is specific: **'the first three seconds lost half the viewers, so my hook is the problem'** is information you can act on next week.",
          "Compare against **your own previous work**, not against someone else's. Your tenth video should be better than your first, and that is the only comparison that is both fair and useful. Write the review down: what worked, what did not, and the one specific change for the next video. That document is worth more than the video, because it is how the eleventh video gets better.",
        ],
      },
      {
        heading: "The screening and giving critique",
        body: [
          "Screening your work to a class is uncomfortable and it is the most valuable part of the project, because you cannot unsee your own video the way a first-time viewer can. **Watch it with them rather than explaining it beforehand** — an explanation is a defence, and it robs you of the most useful information available: what people understood without help.",
          "Then **take critique without defending**. Write down every comment in silence, even the ones that are wrong. The instinct to explain what you meant costs you exactly the information you came for, and afterwards you can sort the notes into what is genuinely wrong, what is preference, and what reflects the critic's own taste rather than your audience's needs.",
          "**Giving** critique well is a skill in itself and it is what makes the session work. Be **specific** — 'I lost attention at the twenty-second mark when the explanation became abstract' is useful; 'it was good' and 'I did not like it' are not. Be **about the work, not the person**. And **name what worked**, because knowing what to keep matters as much as knowing what to cut, and a critique that is only negative produces someone who changes everything rather than improving what exists.",
        ],
      },
      {
        heading: "The next ninety days",
        body: [
          "One video is not a channel; a body of work is. So the project ends with a plan. **Ninety days, one pillar-focused video a week minimum**, each following the same production order, each reviewed the week after publishing against its own numbers. That is roughly twelve videos, which is enough to produce a pattern rather than an anecdote.",
          "Build in the two habits that determine whether it continues. **Batch** — shoot two or three in one session so a busy week does not mean a missed one. And **review monthly**, looking at the twelve as a set rather than reacting to each individually, because the discipline of not changing everything after one bad video is what allows an approach to work long enough to be measured.",
          "Then the honest expectation. Twelve videos will not make you famous, and the numbers will be small. What they will produce is a **body of work you can show**, a repeatable process, real evidence of what your specific audience responds to, and the first material for the portfolio that gets you clients or a job. That is what the course was for — not the video, but the system that produces the next eleven.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor runs one video through the entire process end to end — script timed from word count, shot to standard, edited with a third removed, packaged with a quarter-size thumbnail test, published, then reviewed a week later against real analytics — before screening it and taking critique in silence.",
      steps: [
        {
          step: "Choose the topic by usefulness",
          detail:
            "Pick what would most help someone new to the subject rather than what is most impressive. Explain that a clear basic explanation beats an ambitious piece nobody can follow.",
        },
        {
          step: "Script and time it",
          detail:
            "Write hook, setup, body, close, and check the word count against roughly 150 words per minute. Explain that shooting before the script is finished produces footage with no structure.",
        },
        {
          step: "Set the light before recording",
          detail:
            "Face the window, place the bounce, prop the phone to eye level, clear the background, quiet the room. Explain that light and audio cannot be repaired later.",
        },
        {
          step: "Record three takes",
          detail:
            "Shoot the script three times and keep the best. Explain that this is normal practice and much faster than chasing one perfect take.",
        },
        {
          step: "Rough cut then fine cut",
          detail:
            "Assemble the structure, then remove a third of the running time at the points where attention dips. Explain that deletion is the actual editing skill.",
        },
        {
          step: "Add text, music and captions",
          detail:
            "Supporting text in one font, licensed music at a fifth of voice level, captions read and corrected line by line. Explain that this order exists because the cut may still change.",
        },
        {
          step: "Test the thumbnail at a quarter",
          detail:
            "Design three, shrink them, keep the legible one. Explain that this single check eliminates most thumbnails that quietly cost a video its reach.",
        },
        {
          step: "Write the title and check it",
          detail:
            "State the viewer's benefit and confirm the video delivers exactly that. Explain that a misleading package collapses retention and suppresses everything after.",
        },
        {
          step: "Publish natively",
          detail:
            "Upload the file at full quality in the correct aspect ratio with a chosen cover frame. Explain that linked videos are suppressed and this is free reach.",
        },
        {
          step: "Read the analytics a week later",
          detail:
            "Go through impressions, click-through, retention and follows in order. Explain that each answers a different question and the order names the fix.",
        },
        {
          step: "Write the honest review",
          detail:
            "Name the specific failure — 'the first three seconds lost half the viewers' — rather than blaming the algorithm. Explain that the review is worth more than the video.",
        },
        {
          step: "Screen and take critique in silence",
          detail:
            "Watch with the class without explaining beforehand, then record every comment. Explain that an explanation is a defence and costs the most useful information available.",
        },
      ],
    },
    practice: {
      title: "Final project: produce, publish and review a short-form video",
      brief:
        "You produce one complete sixty to ninety second educational or promotional video from a content pillar — scripted and timed, shot to standard, edited with a third of the running time removed, packaged with a quarter-size-tested thumbnail and an honest title, published natively — then review it a week later against its real analytics, screen it to the class, take critique in silence, and write the ninety-day plan.",
      steps: [
        "Choose a topic from a content pillar that would most help someone new to the subject.",
        "Write the script: hook, setup, body in three or four points, close with one next step.",
        "Time it from the word count and cut to sixty to ninety seconds.",
        "Set the light, angle, background, room and audio distance before recording.",
        "Record three takes from the script and keep the best.",
        "Rough cut for structure, then fine cut to remove a third of the running time.",
        "Add supporting text, licensed music at a fifth of voice level, and corrected captions.",
        "Design three thumbnails, test them at a quarter size, and keep the legible one.",
        "Write a title stating the viewer's benefit, and confirm the video delivers exactly that.",
        "Write a caption whose first line works alone, with one call-to-action and three to five hashtags.",
        "Check the video for copyright and privacy before publishing, obtaining any consent needed.",
        "Publish natively at full quality, correct aspect ratio, with a chosen cover frame.",
        "Reply to comments within the first hour, inside a bounded engagement window.",
        "A week later, read impressions, click-through, retention and follows in order.",
        "Write the review: what worked, what failed specifically, and one change for the next video.",
        "Screen it to the class without explaining beforehand, and record all critique in silence.",
        "Sort the critique into genuinely wrong, preference, and the critic's own taste.",
        "Write the ninety-day plan: one pillar-focused video a week, batched, reviewed monthly.",
      ],
      standard:
        "A published sixty to ninety second video from a content pillar, scripted and timed before shooting, shot with window light, a bounce, eye level, cleared background and close audio, edited with a third of the running time removed and corrected captions, packaged with a thumbnail that survives a quarter-size test and a title that delivers exactly what it promises, checked for copyright and privacy, uploaded natively at full quality — plus a written review a week later reading all four metrics in order with one specific failure named, a screening with all critique recorded in silence and sorted into wrong, preference and taste, and a ninety-day plan of one batched video a week reviewed monthly.",
    },
    pitfalls: [
      {
        problem: "You shot before the script was finished",
        fix: "Script and time it first. Shooting without a finished script produces a large amount of footage with no structure, and the edit becomes an attempt to find a video that was never planned.",
      },
      {
        problem: "You chose the most impressive topic rather than the most useful",
        fix: "Pick what would most help someone new to the subject. A clear basic explanation outperforms an ambitious piece nobody can follow, and it is far more achievable in the time available.",
      },
      {
        problem: "You rushed the shoot and planned to fix it in editing",
        fix: "Set the light and audio properly before recording. Bad light and bad audio cannot be repaired afterwards, and this is the stage that costs most to get wrong.",
      },
      {
        problem: "You did not remove enough in the edit",
        fix: "Remove a third of the running time as a starting point. Viewers notice only that it feels tight, and short-form completion falls sharply as length rises.",
      },
      {
        problem: "You left the video unpublished",
        fix: "Publishing is part of the deliverable. An unpublished video has no analytics to learn from, and avoiding publication is why so many people have a folder of unfinished work and no audience.",
      },
      {
        problem: "You explained the numbers instead of reading them",
        fix: "Name the specific failure — which stage lost people and why. 'The algorithm was bad' feels better and teaches nothing; 'the first three seconds lost half the viewers' is actionable next week.",
      },
      {
        problem: "You explained the video before screening it",
        fix: "Watch it with the class in silence. An explanation is a defence and it robs you of the most useful information available: what people understood without any help from you.",
      },
      {
        problem: "You defended yourself during critique",
        fix: "Record every comment without responding, then sort them afterwards. Explaining what you meant in the moment costs you exactly the information you came for.",
      },
    ],
    expertNotes: [
      "Publish the video, however imperfect it feels. An unpublished video teaches nothing because it produces no data, and avoiding publication is the single most common reason people complete a course and have nothing to show for it.",
      "Script and time the video before you shoot anything. Finishing is the skill this project tests, and a finished script is what makes finishing possible rather than a matter of willpower.",
      "Name the specific failure in your review rather than explaining it away. 'The first three seconds lost half the viewers' is a fix you can make next week; 'the algorithm was bad' is a comfortable story that changes nothing.",
      "Screen your work without explaining it first. A first-time viewer's unassisted understanding is the most accurate measure of whether the video works, and defending it in advance destroys that measurement.",
    ],
    vocabulary: [
      { term: "Deliverable", meaning: "A published video plus a written review. Unpublished work cannot be measured and so cannot be improved." },
      { term: "Production order", meaning: "Script, shoot, edit, package, publish, review. Each step depends on the last and skipping one costs double." },
      { term: "Retention curve", meaning: "Where viewers leave, second by second. The most actionable single piece of analytics there is." },
      { term: "Screening", meaning: "Showing the work to peers without explanation. Reveals what people understood unassisted." },
      { term: "Critique", meaning: "Specific, work-focused feedback naming both what worked and what to change. Vague praise and vague dislike are both useless." },
      { term: "Critique sorting", meaning: "Dividing feedback into genuinely wrong, preference, and the critic's own taste. Only the first must change." },
      { term: "Body of work", meaning: "Twelve or more videos on one pillar. Worth more than one excellent piece because it proves consistency." },
      { term: "Batching", meaning: "Producing several videos in one session. What stops a busy week becoming a missed week." },
    ],
    homework: [
      {
        task: "Publish your video",
        detail:
          "Today, not when it feels ready. Then reply to comments within the first hour and note which ones contain your next three video ideas.",
      },
      {
        task: "Write the one-week review",
        detail:
          "Impressions, click-through, retention and follows in order. Name one specific failure and one specific success, then write the single change for the next video.",
      },
      {
        task: "Give three specific critiques",
        detail:
          "To classmates, naming the timestamp where attention dropped and what worked. Vague praise helps nobody and vague dislike helps nobody either.",
      },
      {
        task: "Write the ninety-day plan",
        detail:
          "One pillar-focused video a week, batched two or three at a time, each reviewed the week after publishing, with the twelve assessed as a set at the end.",
      },
    ],
    rubric: [
      {
        criterion: "Pre-production",
        passing: "Has an idea.",
        excellent: "A pillar topic chosen for usefulness, scripted in full and timed from word count before anything was shot.",
      },
      {
        criterion: "Production",
        passing: "Is watchable.",
        excellent: "Window light with a bounce, eye level, cleared background, quiet room, close audio, best of three takes, looking at the lens.",
      },
      {
        criterion: "Post-production",
        passing: "Is edited.",
        excellent: "A third of the running time removed at marked attention dips, corrected captions, licensed music at the right level, and supporting text in one font.",
      },
      {
        criterion: "Packaging and publishing",
        passing: "Is posted.",
        excellent: "A thumbnail surviving the quarter-size test, a title that delivers exactly what it promises, a caption whose first line works alone, native upload at full quality with a chosen cover frame.",
      },
      {
        criterion: "Review and critique",
        passing: "Reports the views.",
        excellent: "All four metrics read in order with one specific failure named, all critique recorded in silence and sorted into wrong, preference and taste, plus a ninety-day batched plan reviewed monthly.",
      },
    ],
    faqs: [
      {
        q: "My video is not good enough to publish. Should I wait?",
        a: "Publish it. An unpublished video produces no data and so cannot be improved, and 'not ready yet' is the reason most people finish a course with a folder of unfinished work. Your tenth video will be better than your first, and the only way to reach the tenth is to publish the first.",
      },
      {
        q: "What if it gets almost no views?",
        a: "Read the stages rather than the total. Few impressions means the platform did not push it, which is normal for a new account; impressions with few clicks means the package failed; clicks with low retention means the opening lost people. Each is a specific fix, and a new channel's early numbers are small for everyone.",
      },
      {
        q: "Should it be educational or promotional?",
        a: "Whichever serves your pillar. Educational usually performs better for a new channel because it gives a stranger a reason to stay and follow, while promotional works once there is an audience that already trusts you. If you are unsure, make the educational one.",
      },
      {
        q: "How do I handle harsh critique?",
        a: "Record it in silence and sort it afterwards into genuinely wrong, preference, and the critic's own taste. Only the first must change. Responding in the moment costs you the information you came for, and defensive energy is better spent on the next video.",
      },
      {
        q: "What happens after the course?",
        a: "One pillar-focused video a week for ninety days, batched two or three at a time, each reviewed the week after publishing, with the twelve assessed as a set at the end. That produces a body of work, a repeatable process and real evidence of what your audience responds to — which is what the course was actually for.",
      },
    ],
  },
};
