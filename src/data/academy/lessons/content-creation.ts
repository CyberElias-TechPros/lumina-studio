import type { SessionLecture } from "../types";

/**
 * Content Creation — ₦15,000 · 3 weeks · 6 sessions.
 * Sessions 1 to 3. (Sessions 4–6 in content-creation-b.ts.)
 */
export const contentCreationLessonsA: Record<string, SessionLecture> = {
  "ideas-audience-scripts": {
    summary:
      "Everything that follows — the shooting, the editing, the publishing — only works if the idea is right and the script holds attention. This session covers what content creation actually is, how to find an audience worth making content for, and how to write scripts people finish.",
    objectives: [
      "Explain what content creation is and how it makes money or builds a business",
      "Define an audience specific enough to change what you make",
      "Build content pillars that keep a channel coherent",
      "Write hooks that survive the first second",
      "Structure a short-form script that holds attention to the end",
      "Produce five complete ideas with scripts",
    ],
    blocks: [
      {
        heading: "What content creation actually is",
        body: [
          "Content creation is **making things people choose to watch, and doing it consistently enough that they come back**. Two parts, and the second is where almost everyone fails. Making one good video is achievable in a weekend; making one every week for a year is a discipline that very few people sustain, and it is the only version that produces an audience.",
          "It is worth being clear about what it is not. It is not being famous, and it is not the same as being skilled at a subject. Plenty of experts have no audience because they cannot explain themselves to a stranger, and plenty of people with modest expertise have large audiences because they are clear, consistent and specific. **Clarity and consistency beat depth**, at least at the start.",
          "Then the honest economics. Content pays in four ways: **advertising revenue** (small per view, needs volume), **sponsorship** (needs an audience a brand wants), **selling your own product or service** (the most reliable and the reason most Nigerian creators actually earn), and **opportunities** (jobs, speaking, clients who found you). The fourth is underrated — a body of work is the strongest portfolio there is, and it works even with a modest audience.",
        ],
      },
      {
        heading: "Finding an audience",
        body: [
          "An audience is not a number; it is **a group of people with a shared interest who would recognise themselves in your content**. 'People who like videos' is nobody. 'Nigerian students learning to code on a budget with a laptop they share with three people' is an audience, and you can write for them.",
          "The useful question is not 'what do I want to make?' but **'who is this for, and what do they get out of it?'** Every piece of content should answer that in one line. If it cannot, the idea is not finished. This is uncomfortable because it removes a lot of what feels interesting to make — but content made for yourself reaches only yourself, and that is a diary rather than a channel.",
          "Then narrow deliberately. A narrow channel grows faster because a stranger who watches one video immediately understands what the rest will be, and subscribes. A broad channel makes every video compete with the others for the same viewer's attention. **'One specific thing, done well, repeatedly'** is the formula that works, and it is also the formula that makes the work sustainable, because you are not inventing from nothing each week.",
        ],
      },
      {
        heading: "Content pillars and finding topics",
        body: [
          "**Content pillars** are three or four recurring themes your channel returns to. For a coding channel they might be **learn this concept**, **build this thing**, **career and money**, and **tools that save time**. Every video belongs to one, which means you are never starting from a blank page — you are choosing which pillar today's video serves.",
          "Pillars solve three problems at once. They make the channel **coherent**, so a new viewer understands it in three videos. They make planning **fast**, because a pillar is a reusable prompt rather than a fresh idea. And they make the content **cumulative** — twenty videos about one topic become a resource, while twenty unrelated videos add up to nothing and are forgotten as fast as they are watched.",
          "For generating topics, the reliable method is **problem mining**. Write down every question someone in your audience asks, every mistake they make, every thing they find confusing, every decision they face. Twenty such questions is twenty videos, and each one is already validated because someone actually asked it. Your own past confusion is the richest source, because you remember what was hard before you knew it.",
        ],
      },
      {
        heading: "Hooks and storytelling",
        body: [
          "The hook is the **first second or two**, and it determines whether the video is watched at all. On a phone feed the viewer's thumb is already moving; the hook has to interrupt that. Three kinds work reliably: a **claim** ('You do not need a laptop to start coding'), a **question** ('Why does your phone battery die by 2pm?'), and a **result shown first** (the finished thing, then how it was made).",
          "What does not work is any form of introduction. 'Hello everyone, welcome back to my channel, today we will be looking at…' loses most viewers before the topic arrives. Nobody is waiting for your introduction, and the assumption that they are is the single most common reason videos underperform. **Start in the middle of the interesting part.**",
          "Storytelling is what makes people stay past the hook. The structure is the same one that works in writing: **an open loop** (something unfinished), **tension** (what stands in the way), **the turn** (what changed), and **the point** (what the viewer should take away). Even a sixty-second tutorial benefits from this — 'this bug took me four hours; here is the one line that caused it' holds attention where 'let us debug this function' does not.",
        ],
      },
      {
        heading: "Scripting and short-form versus long-form",
        body: [
          "A short-form script has four beats and should be **written, not improvised**. **Hook** — the first line, written and rewritten more than anything else. **Setup** — one sentence on why this matters to the viewer. **Body** — the actual content, in three or four short points. **Close** — the takeaway and, optionally, one clear next step. That structure fits sixty to ninety seconds comfortably.",
          "Writing it out is not a constraint; it is what makes the video tight. Improvising produces the pauses, repetitions and 'so basically what I mean is' that make viewers leave. A written script of about 150 words is roughly one minute of speech, which gives you a way to time the video before shooting it — and short-form punishes length far more than long-form does.",
          "**Short-form** (Reels, TikTok, Shorts) reaches strangers: the platform pushes it to people who do not follow you, so it is how channels grow. **Long-form** (YouTube videos, detailed posts) serves people who already care: it builds depth, watch time and trust, and it earns more per view. The productive relationship is that **short-form brings people in and long-form keeps them** — and starting with short-form is usually right, because the feedback loop is days rather than months.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor takes one narrow channel idea and builds it completely: the audience in one line, four pillars, twenty mined topics, then five scripts written live — hook, setup, body, close — with each hook rewritten twice in front of the class.",
      steps: [
        {
          step: "State what content creation pays for",
          detail:
            "Lay out ad revenue, sponsorship, selling your own work and opportunities. Explain that the last two are how most Nigerian creators actually earn, and that a body of work is a portfolio.",
        },
        {
          step: "Write the audience in one line",
          detail:
            "Draft a specific audience with a shared interest. Test it by asking whether a stranger in it would recognise themselves.",
        },
        {
          step: "Narrow the channel",
          detail:
            "Cut the idea down to one specific thing. Explain that a new viewer should understand the whole channel from three videos.",
        },
        {
          step: "Define four pillars",
          detail:
            "Write recurring themes and test each by asking whether twenty videos could be made without repeating. Explain that pillars make planning a choice rather than an invention.",
        },
        {
          step: "Mine twenty topics",
          detail:
            "List real questions, mistakes, confusions and decisions from the audience. Explain that each is already validated because someone asked it.",
        },
        {
          step: "Use your own past confusion",
          detail:
            "Recall what was hard before you knew it. Explain that this is the richest source of topics because you remember the confusion precisely.",
        },
        {
          step: "Write three candidate hooks",
          detail:
            "Draft a claim, a question and a result-first version for one topic. Read them aloud and choose the strongest.",
        },
        {
          step: "Kill the introduction",
          detail:
            "Show a 'hello everyone, welcome back' opening and count what is lost. Explain that starting in the middle of the interesting part is the whole difference.",
        },
        {
          step: "Structure the story",
          detail:
            "Add open loop, tension, turn and point to a tutorial. Show the flat version beside it and explain why the tension is what holds attention.",
        },
        {
          step: "Write the full script",
          detail:
            "Complete hook, setup, body in three or four points, and close. Explain that writing it out removes the pauses that make viewers leave.",
        },
        {
          step: "Time it from the word count",
          detail:
            "Count roughly 150 words per minute and check the script fits. Explain that short-form punishes length far more than long-form.",
        },
        {
          step: "Contrast short-form with long-form",
          detail:
            "Explain that short-form brings people in and long-form keeps them. Justify starting with short-form on the length of the feedback loop.",
        },
      ],
    },
    practice: {
      title: "Project: develop five content ideas and scripts",
      brief:
        "You define one narrow channel with a one-line audience, build four content pillars, mine twenty validated topics, then write five complete short-form scripts — hook, setup, body, close — each timed from its word count and each with three candidate hooks tested against each other.",
      steps: [
        "Write your channel idea in one sentence, then cut it until it is one specific thing.",
        "Write your audience in one line, specific enough that they would recognise themselves.",
        "Test the audience: would a stranger in it know the channel is for them?",
        "Define four content pillars and check each could support twenty videos.",
        "Mine twenty topics: real questions, mistakes, confusions and decisions.",
        "Mark the five topics that would most help someone new to the subject.",
        "Write three candidate hooks for each of the five — a claim, a question, a result.",
        "Read every hook aloud and choose the strongest for each script.",
        "Cut every introduction: no greetings, no 'welcome back', no topic preview.",
        "Write the setup: one sentence on why this matters to the viewer.",
        "Write the body as three or four short points, each with one example.",
        "Write the close: the takeaway and one clear next step.",
        "Count the words and check the script fits sixty to ninety seconds at about 150 words per minute.",
        "Add open loop, tension, turn and point to at least two of the five.",
        "Read all five aloud and cut any sentence that does not earn the next one.",
      ],
      standard:
        "One channel narrowed to a single specific thing, a one-line audience that would recognise itself, four pillars each able to support twenty videos, twenty mined topics drawn from real questions and mistakes, and five complete scripts each with three candidate hooks tested aloud, no introduction, a setup, a body of three or four points with examples, a close with one next step, a word count that fits the time, and at least two built on open loop, tension, turn and point.",
    },
    pitfalls: [
      {
        problem: "Your channel is about everything you find interesting",
        fix: "Narrow to one specific thing. A new viewer should understand the whole channel from three videos; a broad channel makes every video compete with the others for the same viewer.",
      },
      {
        problem: "You are making content for yourself",
        fix: "Answer 'who is this for and what do they get?' for every piece. Content made for yourself reaches only yourself, which makes it a diary rather than a channel.",
      },
      {
        problem: "You invent topics from nothing each week",
        fix: "Mine real questions, mistakes and confusions from your audience. Twenty validated questions is twenty videos, and your own past confusion is the richest source.",
      },
      {
        problem: "You open with an introduction",
        fix: "Start in the middle of the interesting part. 'Hello everyone, welcome back' loses most viewers before the topic arrives, because nobody is waiting for your introduction.",
      },
      {
        problem: "You improvise instead of writing the script",
        fix: "Write it out. Improvising produces the pauses, repetitions and restatements that make viewers leave, and a written script lets you time the video before you shoot it.",
      },
      {
        problem: "Your script has no tension",
        fix: "Add an open loop and an obstacle. 'This bug took me four hours; here is the one line that caused it' holds attention where 'let us debug this function' does not.",
      },
      {
        problem: "Your videos are too long for short-form",
        fix: "Count roughly 150 words per minute and cut to sixty or ninety seconds. Short-form punishes length far more severely than long-form, and completion rate drives distribution.",
      },
      {
        problem: "You are chasing being famous rather than building work",
        fix: "A body of consistent, specific work is the real asset. It earns through your own products and opportunities even with a modest audience, and it outlasts any single video that performs well.",
      },
    ],
    expertNotes: [
      "Narrow your channel harder than feels comfortable. A specific channel grows faster because a new viewer immediately understands what the rest will be, and it makes the work sustainable because you are not inventing from nothing each week.",
      "Mine topics from real questions rather than inventing them. Every question someone actually asked is a validated video, and your own past confusion is the richest source because you still remember what was hard.",
      "Write three candidate hooks and read them aloud before choosing. The first second decides whether the video is watched at all, so it deserves more attention than the body — and your favourite is usually not the strongest.",
      "Script every video, even short ones. Writing removes the pauses and repetitions that lose viewers, and it lets you time the piece from its word count before you spend an hour shooting something too long.",
    ],
    vocabulary: [
      { term: "Content pillar", meaning: "A recurring theme your channel returns to. Keeps it coherent and makes planning a choice rather than an invention." },
      { term: "Audience", meaning: "A group with a shared interest who would recognise themselves in your content. Not a number." },
      { term: "Hook", meaning: "The first second or two. A claim, a question, or the result shown first. Determines whether the video is watched." },
      { term: "Open loop", meaning: "Something unfinished that makes the viewer want to stay. The engine of retention." },
      { term: "Script", meaning: "The written beats: hook, setup, body, close. Written rather than improvised, and timed by word count." },
      { term: "Short-form", meaning: "Reels, TikTok, Shorts. Pushed to non-followers, so it is how channels grow." },
      { term: "Long-form", meaning: "YouTube videos and detailed posts. Serves people who already care and builds depth and trust." },
      { term: "Completion rate", meaning: "The proportion of viewers who finish. The strongest driver of short-form distribution." },
    ],
    homework: [
      {
        task: "Narrow your channel to one line",
        detail:
          "Write what the channel is about, then cut it until it is one specific thing. Add the audience in one line, specific enough that they would recognise themselves.",
      },
      {
        task: "Mine twenty topics",
        detail:
          "Real questions, mistakes, confusions and decisions from your audience, including what you personally found hard before you knew it. This is twenty videos already validated.",
      },
      {
        task: "Write five scripts",
        detail:
          "Hook, setup, body in three or four points, close with one next step. Time each from its word count at roughly 150 words per minute and cut to fit.",
      },
      {
        task: "Test three hooks per script",
        detail:
          "A claim, a question and a result-first version for each. Read them aloud to someone and record which one makes them want to continue.",
      },
    ],
    rubric: [
      {
        criterion: "Audience definition",
        passing: "Knows roughly who might watch.",
        excellent: "One line, specific enough that a stranger in it would recognise themselves, with the channel narrowed to a single specific thing.",
      },
      {
        criterion: "Pillars and topics",
        passing: "Has some ideas.",
        excellent: "Four pillars each able to support twenty videos, and twenty mined topics drawn from real questions and mistakes rather than invention.",
      },
      {
        criterion: "Hooks",
        passing: "Opens the video.",
        excellent: "Three candidates per script tested aloud, opening with a claim, question or result, with every introduction removed.",
      },
      {
        criterion: "Script structure",
        passing: "Has an outline.",
        excellent: "Hook, setup, body of three or four points with examples, and a close with one next step — at least two built on open loop, tension, turn and point.",
      },
      {
        criterion: "Format discipline",
        passing: "Roughly the right length.",
        excellent: "Word count checked against roughly 150 words per minute, cut to fit sixty to ninety seconds, with an understanding of how short-form and long-form work together.",
      },
    ],
    faqs: [
      {
        q: "Do I need to be an expert to make content?",
        a: "No. Clarity and consistency beat depth, especially at the start. Being two steps ahead of your viewer and able to explain the step clearly is enough, and your recent memory of finding it difficult is an advantage an expert has usually lost.",
      },
      {
        q: "How do content creators actually make money?",
        a: "Ad revenue needs volume and pays little per view. Sponsorship needs an audience a brand wants. The reliable route for most Nigerian creators is selling their own product or service, plus the opportunities a visible body of work produces — clients, jobs, speaking. Do not build a plan that depends on ad revenue alone.",
      },
      {
        q: "Should I start with short-form or long-form?",
        a: "Short-form, usually. The platform pushes it to people who do not follow you, so it grows a channel, and the feedback loop is days rather than months. Long-form builds depth and earns more per view once you have people to serve.",
      },
      {
        q: "How often must I post?",
        a: "Whatever you can genuinely sustain. Three videos a week for six months beats daily videos for three weeks. Consistency is what compounds, and an abandoned channel is worse than a slow one because the audience learns you have stopped.",
      },
      {
        q: "What if my first videos are bad?",
        a: "They will be, and that is normal. Judge your first twenty on output rather than results, because the numbers are small early simply because the body of work is small. Almost everyone who quits does so before the work is large enough to produce anything.",
      },
    ],
  },

  "shooting-on-a-phone": {
    summary:
      "A phone is enough — the limitations that make phone footage look amateur are lighting, framing and audio, and all three are fixable for free. This session covers smartphone shooting properly: light, framing, sound, angles, presenting to camera and screen recording.",
    objectives: [
      "Control light with nothing but a window and a wall",
      "Frame a shot deliberately using composition rules",
      "Get usable audio without buying a microphone",
      "Choose camera angles for purpose rather than habit",
      "Present to camera without sounding like you are reading",
      "Record a screen clearly for tutorials",
    ],
    blocks: [
      {
        heading: "Light is 80 per cent of the result",
        body: [
          "Bad lighting is what makes phone footage look amateur, not the phone. A current mid-range phone in good light produces footage that is genuinely indistinguishable from an expensive camera to most viewers; the same phone in a dark room produces something nobody wants to watch. **Light first, always** — fix it before touching any other setting.",
          "The free solution is a **window**. Face it, so the light falls on your face rather than behind you. Shooting with a window behind you silhouettes you, and no camera can recover a face that is a black shape against a bright background. If the light is harsh, hang a white sheet or move slightly away from the direct sun — diffusion is what makes light flattering.",
          "Then **bounce**. A white wall, a sheet of paper or a piece of cardboard held opposite the window throws light back into the shadows on your face and removes the hard contrast that makes people look tired. This costs nothing and it is the single largest quality improvement available to someone with no equipment. And shoot during the day: artificial room lighting in a Nigerian home is usually a single bulb overhead, which puts shadows in your eyes and a colour cast on everything.",
        ],
      },
      {
        heading: "Framing and composition",
        body: [
          "Framing is deciding what is in the picture and where. Turn on your phone's **grid lines** and use the **rule of thirds**: put your eyes on the upper horizontal line and your body slightly off centre, rather than dead centre and floating in the middle. It looks deliberate rather than accidental, and viewers register the difference even when they cannot name it.",
          "Then **headroom and lead room**. Leave a little space above your head — not so much that you appear to be sinking — and if you are looking to one side, leave more space in that direction. For **short-form vertical video** (9:16), fill the frame: a person filmed from far away in a vertical frame is a small shape in a lot of empty space, and it reads as careless.",
          "Finally, **check the background before you press record**. A cluttered background, a doorframe appearing to grow out of your head, or a pile of laundry behind you all pull attention away from what you are saying. A plain wall is not boring — it is the reason people can concentrate. Ten seconds of tidying is worth more than any editing you will do later.",
        ],
      },
      {
        heading: "Audio matters more than video",
        body: [
          "Viewers forgive soft or slightly grainy footage. They do not forgive audio they cannot understand, and they leave immediately. If you fix only one thing from this session, fix the sound. **Get the phone close** — an arm's length is the practical maximum for the built-in microphone, and every doubling of distance roughly quarters the useful signal.",
          "Then **control the room**. Hard surfaces — tiled floors, bare walls, glass — create echo, which makes speech sound distant and thin. A room with a curtain, a rug, a mattress or a wardrobe full of clothes sounds dramatically better, because fabric absorbs the reflections. If you have to choose between a nicer-looking room and a better-sounding one, choose the sound.",
          "**Reduce noise before you record**, not after. Turn off the fan, wait for the generator, close the window onto the street, and record at a time when the compound is quiet. Noise reduction in editing is a rescue, not a solution — it removes noise by smearing the speech, and the result sounds processed. Thirty seconds of waiting costs nothing and produces clean audio.",
        ],
      },
      {
        heading: "Angles and movement",
        body: [
          "**Eye level** is the default and the right choice for talking to camera: it reads as a peer speaking to you. **Slightly above** is more flattering on the face and is what most people actually want. **Below eye level** looks up at the subject, which reads as imposing or unnatural, and is rarely what a tutorial needs.",
          "The angle that ruins most phone video is the **low angle from a table**: the phone lies flat, the camera looks up the presenter's nose, and the ceiling fills the frame. Prop the phone up on books or a stack of tins so the lens is at eye height. This is free and it is the difference between looking considered and looking careless.",
          "For **movement**, keep it simple and steady. Lean the phone against something solid rather than holding it, because handheld shake is distracting and tiring to watch. If you need motion, move yourself rather than the camera — walking into frame, turning to show something, changing position between points. Movement with purpose holds attention; movement for its own sake makes people feel seasick.",
        ],
      },
      {
        heading: "Talking to camera and screen recording",
        body: [
          "Presenting to camera is a skill, and the main obstacle is that **the lens does not feel like a person**. Look at the lens, not at your own face on the screen — looking at yourself reads as looking away from the viewer, and it is the most common giveaway of inexperience. If that is difficult, stick a small piece of tape beside the lens and look at that.",
          "Then **speak as if to one person**, at slightly more energy than feels natural, because the camera flattens delivery. Read your script in short chunks rather than memorising it all, and accept that you will need several takes — recording three attempts and using the best is normal and much faster than trying to be perfect in one.",
          "For **screen recording**, use your phone's built-in recorder or a laptop's, and prepare the screen first: close irrelevant tabs, hide notifications, increase the text size so it is readable on a phone, and remove anything private — your inbox, your bank app, a client's name. Narrate as you go rather than describing afterwards, because a live voice explaining the action is far easier to follow than a cursor moving in silence.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor shoots the same thirty-second piece four ways in the same room — window light versus overhead bulb, eye level versus a phone lying on a table, close audio versus distant, and a cluttered background versus a plain wall — so the class sees exactly what each fix is worth.",
      steps: [
        {
          step: "Show the baseline",
          detail:
            "Record thirty seconds with an overhead bulb, the phone flat on a table, four metres away, with a cluttered background. Play it back without comment.",
        },
        {
          step: "Fix the light",
          detail:
            "Move to face a window and re-record. Play both side by side and explain that the phone is identical and only the light changed.",
        },
        {
          step: "Diffuse harsh light",
          detail:
            "Hang a white sheet in direct sun and show the difference. Explain that diffusion is what makes light flattering rather than harsh.",
        },
        {
          step: "Add a bounce",
          detail:
            "Hold white cardboard opposite the window and show the shadows lifting. Explain that this is the largest free quality improvement available.",
        },
        {
          step: "Fix the angle",
          detail:
            "Prop the phone on books to eye level and compare with the table shot. Explain that the low angle is what makes phone video look careless.",
        },
        {
          step: "Apply the rule of thirds",
          detail:
            "Turn on grid lines and place the eyes on the upper line, slightly off centre. Explain that viewers register deliberate framing even when they cannot name it.",
        },
        {
          step: "Fill the vertical frame",
          detail:
            "Move closer in 9:16 and show the small-distant-shape version beside it. Explain that empty vertical space reads as carelessness.",
        },
        {
          step: "Clear the background",
          detail:
            "Remove the clutter and re-record. Explain that ten seconds of tidying is worth more than any later editing.",
        },
        {
          step: "Fix the audio distance",
          detail:
            "Record at four metres, then at an arm's length. Play both and explain that distance is the main enemy of the built-in microphone.",
        },
        {
          step: "Fix the room",
          detail:
            "Move to a room with a curtain and a rug and compare the echo. Explain that viewers forgive soft video and never forgive unintelligible audio.",
        },
        {
          step: "Kill the noise at source",
          detail:
            "Turn off the fan and wait for the generator, then record. Explain that noise reduction smears speech and that waiting is free.",
        },
        {
          step: "Present to the lens",
          detail:
            "Look at the lens rather than the preview, add tape beside it if needed, and record three takes. Explain that using the best of three is normal and faster than chasing perfection.",
        },
        {
          step: "Record a screen properly",
          detail:
            "Close tabs, hide notifications, increase text size, remove anything private, then narrate live. Explain why a live voice beats a silent cursor.",
        },
      ],
    },
    practice: {
      title: "Shoot a clean talking piece and a screen recording",
      brief:
        "You shoot a sixty-second talking piece using window light with a bounce, eye-level framing on the rule of thirds, an arm's length from a treated room, and a cleared background — then record a narrated screen tutorial with a prepared screen. You compare both against a deliberately bad baseline so the improvement is measurable.",
      steps: [
        "Record a thirty-second baseline: overhead light, phone flat on a table, four metres away, cluttered background.",
        "Find the best window in your space and set up facing it.",
        "Diffuse harsh sun with a sheet or by stepping back from direct light.",
        "Add a white bounce opposite the window to lift the shadows.",
        "Prop the phone on books so the lens is at eye height.",
        "Turn on grid lines and place your eyes on the upper third line, slightly off centre.",
        "Fill the vertical frame: no small distant figure in a lot of empty space.",
        "Clear the background of clutter and anything distracting.",
        "Move to the quietest, softest room available: curtains, rugs, fabric.",
        "Turn off the fan, wait out the generator, close the window onto the street.",
        "Record at an arm's length from the phone, not further.",
        "Look at the lens, not at your own preview. Put tape beside the lens if it helps.",
        "Record three takes from your script and keep the best.",
        "Prepare a screen for recording: tabs closed, notifications off, text larger, private items hidden.",
        "Record a narrated screen tutorial, explaining the action as you do it.",
        "Watch both against the baseline and write down what each fix changed.",
      ],
      standard:
        "A sixty-second talking piece shot facing a window with diffusion and a bounce, at eye level on the rule of thirds, filling the vertical frame, from a cleared background, at an arm's length in a fabric-treated quiet room with the noise sources off, looking at the lens, best of three takes — plus a narrated screen recording with tabs closed, notifications off, larger text and nothing private visible, and a written comparison against a deliberately bad baseline naming what each fix changed.",
    },
    pitfalls: [
      {
        problem: "The window is behind you",
        fix: "Face the window. Backlight silhouettes you, and no camera can recover a face that is a black shape against a bright background — this is the most common phone-video mistake there is.",
      },
      {
        problem: "You are shooting under one overhead bulb",
        fix: "Use daylight from a window. A single overhead bulb puts shadows in your eyes and a colour cast on everything, and no filter fixes it as well as moving does.",
      },
      {
        problem: "The phone is lying flat on a table",
        fix: "Prop it to eye level on books or tins. The low angle looks up your nose and fills the frame with ceiling, and it is the difference between considered and careless.",
      },
      {
        problem: "You are too far from the phone",
        fix: "An arm's length is the practical maximum for the built-in microphone. Every doubling of distance roughly quarters the useful signal, and viewers leave audio they cannot understand.",
      },
      {
        problem: "You are recording in a hard, echoey room",
        fix: "Choose a room with curtains, rugs or a wardrobe. Fabric absorbs reflections; tiled floors and bare walls make speech sound distant and thin.",
      },
      {
        problem: "You plan to fix the noise in editing",
        fix: "Remove it at source: fan off, generator waited out, window closed. Noise reduction removes noise by smearing the speech, and the result sounds processed however good the software is.",
      },
      {
        problem: "You look at your own face on screen",
        fix: "Look at the lens. Looking at yourself reads as looking away from the viewer and it is the most obvious giveaway of inexperience. Tape beside the lens if it helps.",
      },
      {
        problem: "Your screen recording shows your private life",
        fix: "Close tabs, hide notifications, remove your inbox, banking app and client names, and increase the text size. This is a privacy problem before it is a quality problem, and it is unrecoverable once published.",
      },
    ],
    expertNotes: [
      "Fix the light before anything else. Bad lighting is what makes phone footage look amateur, not the phone, and a window with a white bounce produces results that cost nothing and look deliberate.",
      "Treat audio as more important than video, because viewers forgive soft footage and never forgive speech they cannot understand. Get close, choose a soft room, and remove the noise before you record rather than after.",
      "Prop the phone to eye level, always. The flat-on-the-table angle is the single most common reason phone video looks careless, and a stack of books fixes it completely.",
      "Look at the lens and record three takes. Looking at your own preview reads as looking away from the viewer, and using the best of three takes is normal practice and much faster than trying to be perfect in one.",
    ],
    vocabulary: [
      { term: "Key light", meaning: "The main light on your subject. For free shooting, a window you face." },
      { term: "Backlight", meaning: "Light behind the subject. Silhouettes the face and cannot be recovered." },
      { term: "Bounce", meaning: "A white surface throwing light back into the shadows. The largest free quality improvement." },
      { term: "Diffusion", meaning: "Softening harsh light with a sheet or distance. What makes light flattering." },
      { term: "Rule of thirds", meaning: "Placing the subject on the grid lines rather than dead centre. Reads as deliberate." },
      { term: "Headroom", meaning: "Space above the head. Too little is cramped, too much makes you appear to be sinking." },
      { term: "Eye level", meaning: "The lens at the presenter's eye height. Reads as a peer speaking to you." },
      { term: "Room tone", meaning: "The ambient sound of a space. Hard surfaces echo; fabric absorbs." },
    ],
    homework: [
      {
        task: "Find your shooting spot",
        detail:
          "Identify the best window, the quietest softest room and a plain background in your space. Set it up once and leave it, so shooting takes minutes rather than an hour.",
      },
      {
        task: "Shoot the baseline and the fixed version",
        detail:
          "Record the same thirty seconds badly on purpose, then with window light, a bounce, eye level and close audio. Compare them and write what each fix changed.",
      },
      {
        task: "Record a narrated screen tutorial",
        detail:
          "Prepare the screen first: tabs closed, notifications off, larger text, nothing private. Narrate live as you work rather than describing afterwards.",
      },
      {
        task: "Practise presenting to the lens",
        detail:
          "Record three takes of one script, looking at the lens each time. Watch them back and note where your delivery flattens, then record again with more energy.",
      },
    ],
    rubric: [
      {
        criterion: "Lighting",
        passing: "Is visible.",
        excellent: "Facing a window with diffusion, a bounce lifting the shadows, no backlight, and no overhead-bulb colour cast.",
      },
      {
        criterion: "Framing",
        passing: "Is in shot.",
        excellent: "Eye level, on the rule of thirds with correct headroom, filling the vertical frame, from a cleared background.",
      },
      {
        criterion: "Audio",
        passing: "Is audible.",
        excellent: "At an arm's length in a fabric-treated room with noise sources removed at source, not rescued in editing.",
      },
      {
        criterion: "Presentation",
        passing: "Speaks to camera.",
        excellent: "Looking at the lens rather than the preview, at slightly raised energy, best of three takes rather than one attempted perfect take.",
      },
      {
        criterion: "Screen recording",
        passing: "Captures the screen.",
        excellent: "Tabs closed, notifications off, text enlarged, nothing private visible, with live narration explaining the action as it happens.",
      },
    ],
    faqs: [
      {
        q: "Do I need to buy a camera or a ring light?",
        a: "No. A window, a white sheet and a piece of cardboard produce better results than a cheap ring light in most homes, and a current mid-range phone in good light is indistinguishable from an expensive camera to most viewers. Buy equipment only after the free fixes stop improving your results.",
      },
      {
        q: "My room echoes. What can I do?",
        a: "Add fabric: a curtain, a rug, a mattress against a wall, or record facing an open wardrobe. Hard surfaces reflect sound and make speech thin and distant, while soft surfaces absorb it. This matters more than any microphone you could buy at this stage.",
      },
      {
        q: "Should I buy a microphone?",
        a: "Eventually, and a cheap lapel mic is a genuine step up. But get close to the phone and treat the room first — distance and echo cause more bad audio than the microphone does, and fixing them costs nothing.",
      },
      {
        q: "How do I stop looking nervous on camera?",
        a: "Look at the lens, not your own preview, and record three takes rather than chasing one perfect one. Slightly more energy than feels natural is right, because the camera flattens delivery. Nervousness reduces with repetition far faster than with preparation.",
      },
      {
        q: "Is screen recording enough for a tutorial channel?",
        a: "For software, coding and phone tutorials, largely yes — and it removes the lighting and presenting problems entirely. Prepare the screen first (tabs, notifications, text size, privacy) and narrate live, because a voice explaining the action is far easier to follow than a cursor moving in silence.",
      },
    ],
  },

  "editing": {
    summary:
      "Editing is where a video becomes watchable — not through effects, but through cutting what does not earn its place. This session covers trimming, transitions, text, music and captions on a phone, and the judgement that decides what stays.",
    objectives: [
      "Set up a simple editing workflow on a phone or laptop",
      "Trim ruthlessly so the video holds attention",
      "Use transitions with restraint and know when not to",
      "Add text that supports the message rather than decorating it",
      "Choose and use music legally and appropriately",
      "Add captions that are accurate and readable",
    ],
    blocks: [
      {
        heading: "The workflow",
        body: [
          "Edit in a fixed order, because doing steps out of sequence means redoing them. **Import and organise** — put all the takes in one place and watch them once without cutting, noting the good moments. **Rough cut** — assemble the structure and cut the obvious waste. **Fine cut** — tighten the pacing. **Then** text, music and captions. **Export last.** The mistake is adding captions and music to a cut you then change, which means doing them twice.",
          "A phone editor is genuinely sufficient: CapCut, InShot and VN all handle trimming, text, captions and music, and they are free. A laptop editor gives you a bigger timeline and faster scrubbing, which matters as videos get longer, but it is not necessary for short-form. **Use what you will actually use** — the best editor is the one open on the device you already have.",
          "Then a habit that saves more time than any technique: **keep your project organised**. Name the video, keep the source files together, and export a copy of the finished file somewhere safe before publishing. Editors crash, phones fill up, and losing a finished edit to a full storage warning is a particular kind of avoidable pain.",
        ],
      },
      {
        heading: "Trimming: the actual skill",
        body: [
          "Ninety per cent of editing is deletion. Cut the pauses, the breaths, the restarts, the 'so basically what I mean is', and any sentence that says what the last one said. Viewers do not notice that these are gone; they notice only that the video feels tight. **If a moment does not earn its place, it goes** — however much effort it took to shoot.",
          "The practical technique is to watch your rough cut and **mark every point where your attention dips**. Those are the cuts, and they are almost always accurate, because you are the least interested viewer your video will ever have — you already know what happens. Where you get bored, a stranger leaves.",
          "Then the discipline of length. Short-form rewards **completion**, and completion falls sharply as length rises. A sixty-second video that everyone finishes reaches further than a three-minute video that most abandon halfway, even though the second contains more. Cut until it hurts slightly, then cut one more thing — that is roughly the right length.",
        ],
      },
      {
        heading: "Transitions and pacing",
        body: [
          "The best transition is a **cut**. Straight from one shot to the next, on a word or a movement, with no effect at all. It is invisible, it is fast, and it is what professional video mostly consists of. Everything else is a choice that should be justified by meaning, not by availability.",
          "Effects transitions — spins, wipes, glitches, zooms — date a video quickly and draw attention to the edit rather than the content. Use them rarely and consistently: if you use one style, use that one style, because five different effects in sixty seconds reads as indecision. **A jump cut** (cutting within the same shot to remove time) is the most useful technique in short-form and needs no effect at all.",
          "**Pacing** is the rhythm of the cuts. Vary the length of shots: a run of quick cuts creates energy, a longer shot lets a point land. Uniform shot length, whether fast or slow, becomes monotonous and the viewer drifts without knowing why. And **cut on movement or on a word**, not in the middle of neither — cuts that land on a natural beat feel intentional even when nobody can explain why.",
        ],
      },
      {
        heading: "Text, music and captions",
        body: [
          "**Text** should support the message, not decorate it. Use it for the hook in the first second, for key points a viewer might miss, and for anything numerical or named. Keep it short — a few words, not a paragraph — place it where it does not cover your face, and use one font at one or two sizes throughout. Text that moves, spins or fades in and out is harder to read and looks less confident than text that simply appears.",
          "**Music** sets tone and covers small audio imperfections, but it must be **licensed**. Use your platform's built-in library, which is cleared for that platform, or genuinely royalty-free sources. Taking a popular track from a streaming service is copyright infringement and can get the video muted, blocked or your account penalised. Keep music **low** — around a fifth of your voice level — because it should sit underneath, not compete.",
          "**Captions are not optional.** A large share of video is watched without sound, so an uncaptioned video is silent to most of its viewers, and captions also help in noisy places and for viewers who are deaf or hard of hearing. Auto-captioning is a starting point, never the finished product: it mishears Nigerian names, places and technical terms constantly. **Read every caption and correct it**, keep them to one or two lines, place them where they do not cover your face, and use a size readable on a small screen.",
        ],
      },
      {
        heading: "Exporting and the honest review",
        body: [
          "Export at the resolution and frame rate you shot in — usually 1080p, and 30fps unless you deliberately shot slow motion. Higher is not better if the source is lower; it only inflates the file. Export **vertically for short-form** and check the finished file on a phone before publishing, because the editor's preview is not what a viewer sees, and text that looked fine on a laptop can be unreadable or badly placed on a small screen.",
          "Then review it honestly against three questions. **Would I watch this if someone else made it?** If not, cut more. **Can I follow it with the sound off?** If not, the captions are not doing their job. **Does it end before I want it to?** If it ends exactly when you get bored, it is probably slightly too long.",
          "The habit that improves editing fastest is **watching your own work after a day away**. Immediately after editing you know what was meant, so you fill in the gaps; a day later you see what is actually there. It costs a day and it is worth more than any tutorial, because the errors it reveals are yours specifically rather than generic.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor edits one raw shoot live from start to finish: importing and watching through, a rough cut, a fine cut that removes a third of the length, restrained transitions, text that supports the hook, legally sourced music at the right level, and auto-captions corrected line by line — then exports and reviews it on a phone.",
      steps: [
        {
          step: "Import and watch through",
          detail:
            "Load every take and watch once without cutting, noting the good moments. Explain that cutting before watching wastes the best material.",
        },
        {
          step: "Build the rough cut",
          detail:
            "Assemble the structure in order and remove the obvious waste. Explain that structure comes before polish, always.",
        },
        {
          step: "Mark the attention dips",
          detail:
            "Watch and mark every point where attention drops. Explain that you are the least interested viewer your video will ever have, so your boredom predicts theirs.",
        },
        {
          step: "Do the fine cut",
          detail:
            "Cut the marked points, the pauses, breaths and restatements. Show the running time falling by a third and explain that viewers notice only that it feels tight.",
        },
        {
          step: "Use jump cuts",
          detail:
            "Cut within the same shot to remove time. Explain that this is the most useful short-form technique and needs no effect at all.",
        },
        {
          step: "Vary the pacing",
          detail:
            "Alternate quick cuts with longer shots. Explain that uniform shot length becomes monotonous and the viewer drifts without knowing why.",
        },
        {
          step: "Resist the effects",
          detail:
            "Show a spin transition beside a straight cut. Explain that effects date a video and draw attention to the edit rather than the content.",
        },
        {
          step: "Add supporting text",
          detail:
            "Place the hook in the first second and key points where they do not cover the face. Explain that text should support the message rather than decorate it.",
        },
        {
          step: "Source the music legally",
          detail:
            "Use the platform's built-in library. Explain that a popular track from a streaming service risks muting, blocking or an account penalty.",
        },
        {
          step: "Set the music level",
          detail:
            "Drop it to roughly a fifth of the voice level and play both back. Explain that music should sit underneath rather than compete.",
        },
        {
          step: "Correct the auto-captions",
          detail:
            "Read every line and fix the misheard names, places and technical terms. Explain that auto-captioning is a starting point and never the finished product.",
        },
        {
          step: "Export and review on a phone",
          detail:
            "Export at source resolution, vertically, then watch on a phone. Explain that the editor's preview is not what a viewer sees and small text fails there.",
        },
      ],
    },
    practice: {
      title: "Edit one video properly from start to finish",
      brief:
        "You take raw footage from the previous session and edit it in the correct order — import, rough cut, fine cut, then text, music and captions — removing at least a third of the running time, using restrained transitions, legally sourced music at the right level, and captions you have read and corrected line by line. You export and review it on a phone against three questions.",
      steps: [
        "Import every take into one project and name it clearly.",
        "Watch the footage once without cutting, noting the good moments.",
        "Build a rough cut in the right order, removing the obvious waste.",
        "Watch the rough cut and mark every point where your attention dips.",
        "Do the fine cut at those marks, removing pauses, breaths and restatements.",
        "Confirm you have removed at least a third of the original running time.",
        "Use jump cuts to remove time within shots rather than adding effects.",
        "Vary shot length so the pacing is not uniform.",
        "Use straight cuts only, with at most one repeated effect style if any.",
        "Add the hook as text in the first second and key points where they do not cover your face.",
        "Use one font at one or two sizes throughout, with no animated text.",
        "Source music from the platform library or a genuinely royalty-free source.",
        "Set the music to roughly a fifth of your voice level.",
        "Auto-caption, then read and correct every line, especially names and technical terms.",
        "Keep captions to one or two lines, readable on a small screen and clear of your face.",
        "Export at source resolution, vertically, and keep a copy of the file.",
        "Watch the export on a phone and answer the three review questions in writing.",
      ],
      standard:
        "A video edited in the correct order with at least a third of the running time removed, jump cuts used instead of effects, pacing varied across shot lengths, text supporting the hook and key points in one font, music from a licensed source at roughly a fifth of the voice level, captions auto-generated then read and corrected line by line and kept to one or two readable lines, exported vertically at source resolution with a copy retained, and a written answer to all three review questions after watching it on a phone.",
    },
    pitfalls: [
      {
        problem: "You add captions and music before the cut is final",
        fix: "Edit in order: structure, fine cut, then text, music and captions, then export. Adding polish to a cut you later change means doing it twice.",
      },
      {
        problem: "You are afraid to cut",
        fix: "Remove a third of the running time as a starting point. Viewers do not notice what is gone; they notice only that it feels tight, and effort spent shooting something is no reason to keep it.",
      },
      {
        problem: "You use a different effect for every transition",
        fix: "Use straight cuts. If you use an effect at all, use one style consistently — five different effects in sixty seconds reads as indecision and dates the video.",
      },
      {
        problem: "Your shot lengths are all the same",
        fix: "Vary them. A run of quick cuts creates energy and a longer shot lets a point land; uniform length becomes monotonous and viewers drift without knowing why.",
      },
      {
        problem: "Your text is a paragraph that covers your face",
        fix: "A few words, placed clear of your face, in one font at one or two sizes. Text exists to support the message, and a paragraph nobody reads is decoration.",
      },
      {
        problem: "You used a popular track from a streaming service",
        fix: "Use the platform's built-in library or genuinely royalty-free sources. Unlicensed music risks muting, blocking or an account penalty, and the video is lost after you have done the work.",
      },
      {
        problem: "You published the auto-captions without reading them",
        fix: "Correct every line. Auto-captioning mishears Nigerian names, places and technical terms constantly, and wrong captions look careless and confuse the viewer.",
      },
      {
        problem: "You only reviewed it in the editor",
        fix: "Watch the export on a phone. The editor's preview is not what a viewer sees, and text that looked fine on a laptop can be unreadable or badly placed on a small screen.",
      },
    ],
    expertNotes: [
      "Editing is mostly deletion. Cut the pauses, breaths, restarts and restatements — viewers never notice what is absent, only that the result feels tight, and the effort something took to shoot is not a reason to keep it.",
      "Mark every point where your own attention dips and cut there. You are the least interested viewer your video will ever have because you already know what happens, which makes your boredom an unusually accurate predictor.",
      "Use straight cuts and at most one repeated effect style. Effects date a video and draw attention to the edit rather than the content, while a jump cut removes time with no effect at all.",
      "Read every auto-caption before publishing. It mishears Nigerian names, places and technical terms constantly, and uncorrected captions read as carelessness even when the video itself is good.",
    ],
    vocabulary: [
      { term: "Rough cut", meaning: "The assembled structure with obvious waste removed. Comes before any polish." },
      { term: "Fine cut", meaning: "The tightened version: pauses, breaths and restatements removed. Where the real skill is." },
      { term: "Jump cut", meaning: "A cut within the same shot that removes time. The most useful short-form technique and it needs no effect." },
      { term: "Pacing", meaning: "The rhythm of the cuts. Uniform shot length becomes monotonous however fast it is." },
      { term: "B-roll", meaning: "Supplementary footage cut over the main shot. Useful, but not a substitute for a tight main cut." },
      { term: "Royalty-free", meaning: "Music licensed for use without per-play payment. Distinct from a popular track taken from a streaming service." },
      { term: "Caption", meaning: "On-screen text of the speech. Not optional, because much video is watched without sound." },
      { term: "Export", meaning: "Rendering the finished file at source resolution and orientation. Always review on a phone afterwards." },
    ],
    homework: [
      {
        task: "Edit one video end to end",
        detail:
          "Import, rough cut, fine cut, then text, music and captions, then export. Remove at least a third of the running time and note what you cut and why.",
      },
      {
        task: "Correct every caption",
        detail:
          "Auto-caption, then read line by line and fix names, places and technical terms. Keep them to one or two readable lines placed clear of your face.",
      },
      {
        task: "Review it on a phone after a day",
        detail:
          "Watch the export on a phone the next day, when you no longer fill in the gaps from memory. Write down what you would change, then make those changes.",
      },
      {
        task: "Build a legal music source list",
        detail:
          "Note your platform's built-in library and two genuinely royalty-free sources. This prevents the situation where a finished video is muted after you have done all the work.",
      },
    ],
    rubric: [
      {
        criterion: "Workflow",
        passing: "Edits the video.",
        excellent: "Works in the correct order — import, rough cut, fine cut, then text, music and captions, then export — with the project named and the finished file backed up.",
      },
      {
        criterion: "Trimming",
        passing: "Removes some footage.",
        excellent: "At least a third of the running time removed at marked attention dips, including pauses, breaths and restatements, with jump cuts used rather than effects.",
      },
      {
        criterion: "Transitions and pacing",
        passing: "Cuts between shots.",
        excellent: "Straight cuts with at most one repeated effect style, and shot lengths varied so the pacing is not uniform.",
      },
      {
        criterion: "Text and music",
        passing: "Adds both.",
        excellent: "Short supporting text in one font clear of the face, music from a licensed source at roughly a fifth of the voice level.",
      },
      {
        criterion: "Captions and review",
        passing: "Has captions.",
        excellent: "Auto-captions read and corrected line by line, one or two readable lines, and the export reviewed on a phone after a day with the three questions answered in writing.",
      },
    ],
    faqs: [
      {
        q: "Which editing app should I use?",
        a: "Any free phone editor — CapCut, InShot or VN — handles trimming, text, captions and music well enough for short-form. A laptop editor gives a bigger timeline and faster scrubbing as videos get longer. The best editor is the one you will actually open on the device you already have.",
      },
      {
        q: "How long should my video be?",
        a: "As long as it needs and not one second longer. Short-form rewards completion, and completion falls sharply as length rises, so a sixty-second video everyone finishes reaches further than a three-minute video most abandon. Cut until it hurts slightly, then cut one more thing.",
      },
      {
        q: "Where do I get music legally?",
        a: "Your platform's built-in library is cleared for that platform, and there are genuine royalty-free sources. Do not take a popular track from a streaming service — that is infringement and can get the video muted or blocked, or your account penalised, after you have done all the work.",
      },
      {
        q: "Are auto-captions good enough?",
        a: "As a starting point, yes; as a finished product, no. They mishear Nigerian names, places and technical terms constantly. Read every line and correct it — uncorrected captions look careless and actively confuse the viewer.",
      },
      {
        q: "Do I need transitions and effects?",
        a: "Rarely. A straight cut is invisible and is what professional video mostly consists of. Effects date a video and draw attention to the edit rather than the content, and a jump cut removes time with no effect at all.",
      },
    ],
  },
};
