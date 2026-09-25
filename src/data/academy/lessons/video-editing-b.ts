import type { SessionLecture } from "../types";

/**
 * Video Editing — ₦20,000 · 3 weeks · 6 sessions.
 * Sessions 4 to 6. (1–3 in video-editing.ts.)
 * Same running project: the Lagos business-event footage, edited forward.
 */
export const videoEditingLessonsB: Record<string, SessionLecture> = {
  "captions-text": {
    summary:
      "Most social video is watched with the sound off, which makes captions a requirement rather than an extra. This session covers why captions are non-negotiable, generating and then correcting automatic captions, styling them to be readable inside a platform's interface, and lower thirds, titles and end cards that look designed rather than typed.",
    objectives: [
      "Explain why captions are a requirement for social video",
      "Generate automatic captions and correct them properly",
      "Style captions to stay readable on a phone in a bright place",
      "Keep captions clear of platform interface elements",
      "Build lower thirds, titles and end cards that match the brand",
      "Choose burned-in captions or a subtitle file for the platform",
    ],
    blocks: [
      {
        heading: "Most people will watch without sound",
        body: [
          "The fact that governs this whole session is that **most social video is watched muted**. Feeds autoplay silently, people scroll on a bus or in a market or at work, and a large share of viewers never turn the sound on at all. A video that only works with audio is a video that does not reach most of its audience.",
          "So captions are not an accessibility extra you add if there is time — they are **how the majority of your audience receives the content**. This is worth stating plainly because it reverses the usual priority: an edit with perfect sound and no captions reaches fewer people than an edit with adequate sound and accurate captions.",
          "Then the secondary reasons, which matter for the work Nigerian editors actually get. Captions help in **noisy environments** — traffic, a generator, a hall — and they help across **language**, which in a market where English, Pidgin, Yoruba, Igbo and Hausa all appear in the same audience is a real reach advantage. And for church and event media teams, captions are how a service clip gets watched by people who were not there.",
        ],
      },
      {
        heading: "Automatic captions, and why you must fix them",
        body: [
          "Both CapCut and Premiere can **generate captions automatically**, and you should always start there — transcribing by hand is slow and the automatic pass gets you ninety per cent of the words for free. What it will not do is get the parts that matter.",
          "The failures are predictable and they are the parts your client will notice. **Names get mangled** — a person called Adebayo becomes Ade Bayo or Adebuya, a business name comes out wrong. **Nigerian English and Pidgin confuse it**, so **how far** or **no wahala** emerges as something else entirely. **Punctuation and capitalisation are unreliable**, and technical or product terms come out as near-misses that read as carelessness.",
          "So the workflow is: generate, then **read every caption against the audio and correct every error**. This is not optional and it is not slow once you are used to it — it is the difference between a video that looks professional and one where the client's own name is misspelled on screen for forty-five seconds. **A misspelt name is the single fastest way to lose a client**, and it costs two minutes to prevent.",
        ],
      },
      {
        heading: "Styling captions to be read on a phone",
        body: [
          "Captions are read on a small screen, often outdoors, in a fraction of a second. That sets the rules. **Large enough to read at arm's length on a phone** — which is bigger than feels comfortable in the editor. **High contrast**: white text with a black outline or a semi-transparent dark box behind it, because white text over a bright window is invisible no matter how large it is.",
          "Then **length and position**. Keep to **about two lines and roughly forty characters per line**; more than that and the viewer is reading instead of watching. Place captions in the **lower third but above the platform's interface** — Instagram, TikTok and YouTube all overlay buttons, captions and account names over the bottom and right edges of the frame, and text placed under them is unreadable exactly where it was meant to be read. **Preview on an actual phone before delivery**, because the editor on a laptop will not show you the overlap.",
          "Finally **timing**. Captions must appear with the speech, not after it, and must change at natural phrase boundaries rather than mid-word. A caption that lags half a second behind the audio makes the whole video feel broken, and it is one of the most common signs of an uncorrected automatic export.",
        ],
      },
      {
        heading: "Lower thirds, titles and end cards",
        body: [
          "A **lower third** is the graphic identifying who is speaking — name and role — and the rules are consistency and restraint. It appears **early in their first appearance**, stays for **three to five seconds**, sits in the **lower left or lower right** consistently throughout, and **never covers the face**. In a multi-speaker video every lower third uses the same font, size, colour and position, because inconsistency reads as three different people having made three different videos.",
          "**Titles** open a section and **end cards** close the video, and the end card is where most videos waste their best moment. A viewer who watched to the end is the most valuable viewer you have, and **Thanks for watching** throws that away. Use it for **one clear action**: follow, subscribe, the WhatsApp number, the date of the next event. One action, not four.",
          "The design discipline is short: **two fonts at most, two or three brand colours, and the same placement every time.** Text on video should look designed rather than typed, which mostly means restraint — a clean font, consistent margins, and a subtle background where contrast needs help. Animated text is fine when it is quick and identical every time; animated text that differs per video makes a channel look amateur.",
        ],
      },
      {
        heading: "Burned-in captions or a subtitle file",
        body: [
          "There are two ways to deliver captions and the choice depends on the platform. **Burned-in** captions are rendered into the picture — they cannot be turned off, they always look exactly as you designed them, and they are essential for social video where most viewing is muted and no subtitle controls exist.",
          "A **subtitle file** — usually SRT — is separate from the picture and the platform displays it. **YouTube is the case for this**: uploaded subtitles are indexed by search, viewers can turn them on and off, they can be translated automatically, and YouTube's own caption button becomes available. Burning captions into a YouTube video gives up all of that.",
          "So the practical rule for our two deliverables: **burn the captions into the 45-second vertical piece** for Instagram, TikTok and WhatsApp, where muted viewing is the norm and there are no subtitle controls; **upload an SRT alongside the five-minute horizontal piece** for YouTube, and consider burning only the key lines if the piece will also be cut down for social later. For a client delivering both, produce both formats — it costs minutes and covers every destination.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor captions the vertical cut live — generating automatic captions, finding and fixing the mangled names and Pidgin, styling for phone readability, showing what platform interface elements cover, then building a consistent lower third and an end card with one action, and exporting an SRT alongside the burned version.",
      steps: [
        {
          step: "Play the cut with no captions and the sound off",
          detail:
            "Show that it communicates nothing. Explain that this is how most of the audience will meet it.",
        },
        {
          step: "Generate automatic captions in CapCut",
          detail:
            "Run the auto-caption tool. Explain that it gets about ninety per cent of the words free and you always start here rather than transcribing by hand.",
        },
        {
          step: "Find the mangled names",
          detail:
            "Show a speaker's name rendered incorrectly. Explain that a misspelt name on screen is the fastest way to lose a client and costs two minutes to prevent.",
        },
        {
          step: "Fix the Nigerian English and Pidgin",
          detail:
            "Correct the phrases the tool could not parse. Explain that these errors read as carelessness even to viewers who would not notice anything else.",
        },
        {
          step: "Read every caption against the audio",
          detail:
            "Go through the whole timeline. Explain that reading it all is not optional, and it is fast once you are used to it.",
        },
        {
          step: "Set the caption size for phone reading",
          detail:
            "Make it larger than feels right on the laptop. Explain that captions are read on a small screen outdoors in a fraction of a second.",
        },
        {
          step: "Show white text over a bright window",
          detail:
            "Demonstrate the invisibility. Explain that contrast beats size, which is why an outline or a dark box is necessary.",
        },
        {
          step: "Add an outline and a semi-transparent box",
          detail:
            "Confirm it reads over both dark and bright backgrounds. Explain that the caption must survive every background in the video.",
        },
        {
          step: "Break lines at phrase boundaries",
          detail:
            "Keep to two lines and about forty characters. Explain that longer captions make the viewer read instead of watch.",
        },
        {
          step: "Fix caption timing against the audio",
          detail:
            "Show a lagging caption and correct it. Explain that captions arriving half a second late make the whole video feel broken.",
        },
        {
          step: "Show what the platform interface covers",
          detail:
            "Overlay the button and account positions. Explain that text under them is unreadable exactly where it was meant to be read.",
        },
        {
          step: "Move the captions above the safe area",
          detail:
            "Reposition into the lower third but clear of the interface. Explain that this must be checked on an actual phone before delivery.",
        },
        {
          step: "Build one lower third",
          detail:
            "Name and role, lower left, three to five seconds. Explain that it must appear early in the speaker's first appearance and never cover the face.",
        },
        {
          step: "Duplicate it for the second speaker",
          detail:
            "Same font, size, colour and position. Explain that inconsistent lower thirds read as three different people making three different videos.",
        },
        {
          step: "Build an end card with one action",
          detail:
            "One clear next step rather than four. Explain that a viewer who watched to the end is the most valuable viewer and thanks-for-watching wastes them.",
        },
        {
          step: "Export the vertical with burned-in captions",
          detail:
            "Explain that social platforms autoplay muted with no subtitle controls, so the captions must be in the picture.",
        },
        {
          step: "Export an SRT for the horizontal piece",
          detail:
            "Explain that YouTube indexes uploaded subtitles for search, allows toggling and can translate them, all of which burning gives up.",
        },
        {
          step: "Preview both on a phone",
          detail:
            "Check readability and interface overlap. Explain that a laptop editor will not show you the overlap and this is the check that catches it.",
        },
      ],
    },
    practice: {
      title: "Caption both cuts and build the text package",
      brief:
        "You caption both versions of the project — generated then fully corrected, styled for phone readability, positioned clear of platform interfaces — and build a consistent text package of lower thirds, a title and an end card with one action, delivering burned-in captions on the vertical and an SRT alongside the horizontal.",
      steps: [
        "Watch the vertical cut with the sound off and no captions, and note what is lost.",
        "Generate automatic captions rather than transcribing by hand.",
        "Read every caption against the audio and correct every error.",
        "Check every personal and business name against how it is actually spelled.",
        "Correct any Nigerian English or Pidgin the tool misheard.",
        "Set the caption size large enough to read on a phone at arm's length.",
        "Add an outline or a semi-transparent box so captions read over bright and dark backgrounds.",
        "Break every caption at a phrase boundary, keeping to two lines and about forty characters.",
        "Check every caption's timing against the audio and fix any that lag.",
        "Identify where each target platform overlays buttons, captions and account names.",
        "Position captions above that area and preview on an actual phone.",
        "Build one lower third with name and role, placed consistently and clear of the face.",
        "Duplicate it for every speaker using the same font, size, colour and position.",
        "Build a title for the opening and one for any section change.",
        "Build an end card carrying exactly one clear action.",
        "Confirm the whole package uses two fonts at most and two or three colours.",
        "Burn captions into the vertical export.",
        "Export an SRT for the horizontal piece and confirm it syncs.",
        "Preview both deliverables on a phone before considering them finished.",
      ],
      standard:
        "Both cuts captioned and text-packaged: automatic captions generated then every caption read against the audio and corrected, with all personal and business names verified and Nigerian English or Pidgin fixed; captions sized for phone reading at arm's length with an outline or semi-transparent box so they read over bright and dark backgrounds, broken at phrase boundaries within two lines and about forty characters, timed to the audio with any lag removed, and positioned above each platform's interface overlay and verified on an actual phone; one lower third carrying name and role, clear of the face and appearing early in the speaker's first appearance, duplicated for every speaker with identical font, size, colour and position; an opening title and an end card carrying exactly one action; the whole package using two fonts at most and two or three colours; captions burned into the vertical export and an SRT exported for the horizontal piece and confirmed in sync; and both deliverables previewed on a phone.",
    },
    pitfalls: [
      {
        problem: "You deliver a social video with no captions",
        fix: "Caption it. Most social video is watched muted, so a video that only works with sound does not reach most of its audience, whatever else is right about it.",
      },
      {
        problem: "You export automatic captions without reading them",
        fix: "Read every caption against the audio. Names, Nigerian English and Pidgin are exactly what the tool gets wrong, and a misspelt client name is the fastest way to lose the client.",
      },
      {
        problem: "Your captions are too small to read on a phone",
        fix: "Go larger than feels right on a laptop. Captions are read on a small screen, often outdoors, in a fraction of a second.",
      },
      {
        problem: "White text disappears over a bright background",
        fix: "Add an outline or a semi-transparent dark box. Contrast beats size, and a caption must survive every background it passes over.",
      },
      {
        problem: "Your captions sit under the platform's buttons",
        fix: "Move them above the interface area and preview on a real phone. Text placed where the UI sits is unreadable exactly where it was meant to be read.",
      },
      {
        problem: "Your captions lag the speech",
        fix: "Fix the timing to phrase boundaries. Captions arriving half a second late make the whole video feel broken, and it is the commonest sign of an uncorrected automatic export.",
      },
      {
        problem: "Every lower third looks slightly different",
        fix: "Duplicate one and reuse it. Inconsistent lower thirds read as several people making several videos, and consistency is what makes a channel look deliberate.",
      },
      {
        problem: "Your end card says thanks for watching",
        fix: "Give one clear action. A viewer who watched to the end is your most valuable viewer, and a thank-you wastes the best moment in the video.",
      },
    ],
    expertNotes: [
      "Caption every social video, because most social video is watched muted. It reverses the usual priority: an edit with adequate sound and accurate captions reaches more people than one with perfect sound and none.",
      "Always read automatic captions against the audio before delivery. The tool gets ninety per cent of the words and misses the names, the Pidgin and the product terms — which are exactly the parts your client will notice.",
      "Position captions above the platform interface and check on a real phone. Instagram, TikTok and YouTube all overlay buttons and account details over the bottom and right edges, and a laptop editor will not show you the overlap.",
      "Burn captions for social and upload an SRT for YouTube. Burned captions always look as designed and work where viewing is muted; YouTube subtitles are indexed for search, can be toggled and can be translated — and burning gives all of that up.",
    ],
    vocabulary: [
      {
        term: "Burned-in captions",
        meaning:
          "Captions rendered into the picture. Cannot be turned off; essential for muted social viewing.",
      },
      {
        term: "SRT",
        meaning:
          "A separate subtitle file. Indexed for search on YouTube, toggleable, and translatable.",
      },
      {
        term: "Safe area",
        meaning:
          "The part of the frame not covered by platform buttons, captions or account names. Captions must sit inside it.",
      },
      {
        term: "Lower third",
        meaning:
          "The graphic naming a speaker. Consistent placement, three to five seconds, never covering the face.",
      },
      {
        term: "End card",
        meaning:
          "The closing frame. Carries one clear action, because a viewer who finished is the most valuable one.",
      },
      {
        term: "Phrase boundary",
        meaning:
          "Where a caption should break. Breaking mid-word or running long makes the viewer read instead of watch.",
      },
      {
        term: "Caption contrast",
        meaning:
          "Outline or dark box behind text. Matters more than size, because white over a bright window is invisible.",
      },
      {
        term: "Auto-caption",
        meaning:
          "Automatic transcription. The starting point, never the finished result — names and Pidgin need correcting.",
      },
    ],
    homework: [
      {
        task: "Watch one of your videos muted",
        detail:
          "Turn the sound off and see what survives. If the message does not arrive, that is how most of your audience has been receiving it.",
      },
      {
        task: "Generate and fully correct one minute of captions",
        detail:
          "Run the auto-caption tool, then read every line against the audio. Count how many errors you fixed, and how many were names.",
      },
      {
        task: "Test caption readability outdoors",
        detail:
          "Take your phone outside in daylight and try to read your captions. Adjust size and contrast until they work, then note what changed.",
      },
      {
        task: "Build one reusable lower third",
        detail:
          "Name and role, consistent placement, three to five seconds, clear of the face. Save it as a preset or template you can reuse on every video.",
      },
    ],
    rubric: [
      {
        criterion: "Caption completeness",
        passing: "Adds captions.",
        excellent:
          "Every caption read against the audio and corrected, all names verified, Nigerian English and Pidgin fixed, and the video confirmed to communicate with the sound off.",
      },
      {
        criterion: "Readability",
        passing: "Captions are legible.",
        excellent:
          "Sized for phone reading outdoors, outlined or boxed for contrast over both bright and dark backgrounds, and verified on an actual phone in daylight.",
      },
      {
        criterion: "Placement and timing",
        passing: "Captions appear in the right place.",
        excellent:
          "Positioned above every target platform's interface overlay, broken at phrase boundaries within two lines and forty characters, and timed to the audio with no lag.",
      },
      {
        criterion: "Text package",
        passing: "Adds titles.",
        excellent:
          "Lower thirds identical across every speaker and clear of the face, a title for the opening and any section change, and an end card carrying exactly one action.",
      },
      {
        criterion: "Delivery format",
        passing: "Exports the video.",
        excellent:
          "Captions burned into the vertical for muted social viewing, an SRT exported and confirmed in sync for the YouTube piece, and both formats produced where a client needs both.",
      },
    ],
    faqs: [
      {
        q: "Are captions really necessary?",
        a: "For social video, yes. Most social video is watched muted because feeds autoplay silently, so a video that only works with sound never reaches most of its audience. Captions also help in noisy places and across languages, which matters in a multilingual audience.",
      },
      {
        q: "Can I just use the automatic captions?",
        a: "Generate them, but never export them unchecked. The tool gets most of the words and misses names, Nigerian English and Pidgin — exactly the parts your client will notice. A misspelt name on screen for forty-five seconds is the fastest way to lose that client.",
      },
      {
        q: "Where should captions sit on the screen?",
        a: "In the lower third but above the platform's interface. Instagram, TikTok and YouTube overlay buttons, captions and account names over the bottom and right edges, so text placed there is unreadable exactly where it was meant to be read. Check on an actual phone.",
      },
      {
        q: "Should I burn captions in or upload a subtitle file?",
        a: "Burn for Instagram, TikTok and WhatsApp, where viewing is muted and there are no subtitle controls. Upload an SRT for YouTube, because uploaded subtitles are indexed for search, can be toggled and can be translated — burning gives all of that up. Produce both if the client needs both.",
      },
      {
        q: "What should my end card say?",
        a: "One clear action — follow, subscribe, a WhatsApp number, or the date of the next event. A viewer who watched to the end is the most valuable viewer you have, and thanks for watching wastes the best moment in the video.",
      },
    ],
  },

  "transitions-graphics": {
    summary:
      "The default transition is a hard cut, and knowing that is most of this session. This session covers the few places a transition genuinely earns its place, the ones that only hide a bad cut, the motion graphics basics of keyframes and easing, and building a brand-consistent template so every video you make looks like it came from the same place.",
    objectives: [
      "Default to a hard cut and justify every exception",
      "Choose the right transition for a change of time or place",
      "Recognise a transition being used to hide a structural problem",
      "Animate with keyframes and easing rather than presets",
      "Keep motion subtle, short and consistent",
      "Build a reusable template that keeps every video on brand",
    ],
    blocks: [
      {
        heading: "The default is a hard cut",
        body: [
          "The most important thing in this session is a negative: **most cuts should have no transition at all**. A straight cut is invisible, fast and confident, and it is what almost all professional editing consists of. Everything else in this session is a list of exceptions.",
          "The reason beginners reach for transitions is that a hard cut between two unrelated shots can feel abrupt — so they soften it. But the abruptness is not caused by the missing transition, it is caused by **the two shots not belonging together**. Adding a dissolve makes the join smoother and the problem less obvious, which is why it feels like a fix while making the edit worse.",
          "So the order of operations is: **get the cut right first, and only then ask whether a transition adds meaning**. If a cut feels wrong, the answer is usually a different shot, a different point to cut at, or B-roll over the join — not an effect. Once the structure works, most of the transitions you thought you needed simply stop being necessary.",
        ],
      },
      {
        heading: "When a transition earns its place",
        body: [
          "A transition should **tell the viewer something**, and there are only a few things it can say. A **dissolve** says time has passed or a connection exists between two ideas. A **fade to black** says a section has ended — it is a full stop, and it is the strongest signal available. A **whip pan or a fast blur** says energy and speed, and belongs in a montage. A **punch-in zoom** says **pay attention to this**, and works on a key line.",
          "The common thread is that each one communicates a **change of state** — time, place, section, emphasis. That is the test. If the transition is not marking a change of state, it is decoration, and decoration on every cut makes a video feel like a template rather than a decision.",
          "On our project the honest answer is that the five-minute piece needs **two or three at most**: a fade where the introduction ends and a dissolve where the talk jumps forward in time. The 45-second vertical needs **none**, because it is one continuous idea and every transition would interrupt it. Discovering that you need fewer transitions than you expected is a normal outcome of this session, not a failure.",
        ],
      },
      {
        heading: "Transitions that hide problems",
        body: [
          "There is a specific set of situations where a transition is a warning sign rather than a choice. A dissolve **between two unrelated shots** is covering a structural gap. A flashy transition **at the start of every section** is substituting style for an organiser the viewer can follow. A **spin or a page curl** on business or church footage reads as dated and slightly comic, whatever the rest of the video is doing.",
          "The loudest case is the **transition used to rescue a jump cut**. If you cut from the middle of one sentence to the middle of another and it jars, the fix is to change the cut point, insert B-roll, or use an L cut so the audio carries across — all of which solve the problem. A zoom transition over the join hides it for one frame and the viewer still feels the discontinuity.",
          "The discipline is to **remove every transition and watch the edit**. Where the video still works, leave them out. Where something genuinely needs marking, add the smallest thing that marks it. Editors with more experience typically use fewer effects, and the reduction is deliberate rather than a limitation.",
        ],
      },
      {
        heading: "Motion graphics: keyframes and easing",
        body: [
          "Motion graphics is animation, and all animation is **keyframes**: you set a value at one point, a different value at another, and the software interpolates between them. Position, scale, opacity and rotation are the four that matter, and between them they produce almost everything you will need — a lower third sliding in, a title fading up, a graphic growing into place.",
          "The single detail that separates amateur motion from professional motion is **easing**. Default interpolation is **linear**, meaning the object moves at a constant speed and stops dead, which nothing in the physical world does. Applying **ease-in and ease-out** — slow at the start, fast in the middle, slow at the end — makes motion look natural immediately. In CapCut this is the easing or graph option on a keyframe; in Premiere it is the spatial or temporal interpolation on the keyframe itself.",
          "Then the two rules that keep it looking designed. **Keep it short** — about a third of a second for most text and graphics, because longer animation makes the viewer wait. And **keep it consistent** — the same direction, the same duration and the same easing on every instance, so a lower third slides in the same way in every video you make. Motion that differs per video is the clearest sign of an editor working without a template.",
        ],
      },
      {
        heading: "Brand consistency and the reusable template",
        body: [
          "A business, a church or a creator with several videos needs them to **look like they came from the same place**, and this is worth more to a client than any individual effect. It means the **same two fonts, the same two or three colours, the same placement for lower thirds, the same style of caption, and the same motion** across everything.",
          "The way to achieve it is a **template**: one project file containing your lower thirds, titles, end card and caption style, already animated and coloured, which you duplicate and edit for each new video. This is not laziness — it is how agencies work, because it makes every video consistent, makes production fast, and means a client's fifth video matches their first.",
          "The caution is that a template must be **yours or properly licensed**. Buying a pack and using it unmodified produces video that looks identical to hundreds of other people's, and a client who recognises it will wonder what they paid for. The professional approach is to build your own from the brand's colours and fonts, or to modify a purchased template substantially enough that it is yours.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor strips every transition out of the rough cut, watches it work, then adds back only the two that mark a genuine change of state — animating a lower third with keyframes and easing, showing what linear motion looks like against eased motion, and building the reusable brand template both deliverables will use.",
      steps: [
        {
          step: "Count the transitions currently in the cut",
          detail:
            "Show how many were added by instinct. Explain that the first task is to justify each one rather than to add more.",
        },
        {
          step: "Remove every transition",
          detail:
            "Watch the whole edit as hard cuts. Explain that most edits work better this way and that this is the baseline.",
        },
        {
          step: "Identify the join that still feels wrong",
          detail:
            "Play the abrupt one. Explain that the abruptness comes from the shots not belonging together, not from a missing effect.",
        },
        {
          step: "Fix that join by moving the cut point",
          detail:
            "Explain that changing where you cut solves the problem, while a transition only hides it for one frame.",
        },
        {
          step: "Fix a second jump with an L cut",
          detail:
            "Let the audio carry across. Explain that audio continuity is the cheapest and most natural join available.",
        },
        {
          step: "Cover a third join with B-roll",
          detail:
            "Explain that B-roll over a join is standard practice and reads as intentional rather than smoothed over.",
        },
        {
          step: "Add a fade to black where the introduction ends",
          detail:
            "Explain that it is a full stop, the strongest section signal available, and it tells the viewer the setup is over.",
        },
        {
          step: "Add one dissolve where the talk jumps in time",
          detail:
            "Explain that a dissolve says time has passed, which is information the viewer needs.",
        },
        {
          step: "Try a spin transition on a business clip",
          detail:
            "Play it. Explain that it reads as dated and slightly comic regardless of the rest of the video.",
        },
        {
          step: "Add transitions to every section and watch it",
          detail:
            "Explain that a transition on every cut makes the video feel like a template rather than a series of decisions.",
        },
        {
          step: "Strip them back to the two that carry meaning",
          detail:
            "Explain that needing fewer transitions than expected is the normal outcome of this session.",
        },
        {
          step: "Keyframe a lower third sliding in",
          detail:
            "Set position at two points. Explain that all motion graphics is keyframes on position, scale, opacity and rotation.",
        },
        {
          step: "Play it with linear interpolation",
          detail:
            "Show the dead stop. Explain that nothing physical moves at constant speed and halts instantly.",
        },
        {
          step: "Apply ease-in and ease-out",
          detail:
            "Compare. Explain that this one change is what separates amateur motion from professional motion.",
        },
        {
          step: "Shorten the animation to about a third of a second",
          detail: "Explain that longer animation makes the viewer wait for the content to arrive.",
        },
        {
          step: "Build the brand template",
          detail:
            "Two fonts, two or three colours, fixed placement, standard motion. Explain that consistency across videos is worth more to a client than any single effect.",
        },
        {
          step: "Duplicate the template for the second video",
          detail:
            "Show both deliverables sharing it. Explain that this is how a client's fifth video ends up matching their first.",
        },
        {
          step: "Discuss where the template came from",
          detail:
            "Explain that an unmodified purchased pack makes a client's video look like hundreds of others, and that building from brand colours is the professional route.",
        },
      ],
    },
    practice: {
      title: "Add back only what earns its place, and build the template",
      brief:
        "You strip every transition from both cuts, repair the joins that were relying on them, add back only the transitions that mark a real change of state, animate your text with keyframes and easing, and build one reusable brand template that both deliverables use.",
      steps: [
        "Count the transitions currently in both cuts and write down why each was added.",
        "Remove every transition and watch both edits as hard cuts.",
        "Note every join that now feels wrong.",
        "Repair each one by moving the cut point rather than adding an effect.",
        "Repair at least one with an L cut so the audio carries across.",
        "Cover at least one with B-roll.",
        "Add back only transitions that mark a change of time, place, section or emphasis.",
        "Record how many you added back and what each one tells the viewer.",
        "Confirm the vertical piece has no transitions interrupting its single idea.",
        "Keyframe a lower third on position and opacity.",
        "Play it with linear interpolation and note the dead stop.",
        "Apply ease-in and ease-out and compare.",
        "Shorten every animation to about a third of a second.",
        "Make every instance move in the same direction, at the same speed, with the same easing.",
        "Choose two fonts and two or three brand colours for the template.",
        "Build the template file with lower thirds, titles, end card and caption style already animated.",
        "Duplicate the template and finish both deliverables from it.",
        "Confirm both videos look like they came from the same place.",
        "State where your template came from and why it is yours rather than an unmodified pack.",
      ],
      standard:
        "Both cuts stripped of every transition and watched as hard cuts, with each join that then felt wrong repaired by moving the cut point rather than adding an effect, at least one repaired with an L cut and at least one covered with B-roll; only transitions marking a change of time, place, section or emphasis added back, with the count recorded and what each tells the viewer stated, and the vertical piece confirmed to carry its single idea uninterrupted; a lower third keyframed on position and opacity, demonstrated with linear interpolation and then with ease-in and ease-out, every animation about a third of a second and every instance moving in the same direction at the same speed with the same easing; a template file built with two fonts, two or three brand colours, and lower thirds, titles, end card and caption style already animated, duplicated to finish both deliverables so that both look like they came from the same place, with the template's origin stated and justified as original or substantially modified rather than an unmodified pack.",
    },
    pitfalls: [
      {
        problem: "You soften a cut because it feels abrupt",
        fix: "Fix the cut. The abruptness comes from the shots not belonging together, and a dissolve hides that for one frame while the viewer still feels the discontinuity.",
      },
      {
        problem: "You add a transition to every section",
        fix: "Use two or three in a five-minute piece and none in a 45-second one. A transition on every cut makes the video feel like a template rather than a series of decisions.",
      },
      {
        problem: "You use a transition to rescue a jump cut",
        fix: "Move the cut point, add B-roll, or use an L cut. All three solve the problem; a zoom over the join only hides it.",
      },
      {
        problem: "You use spins, page curls or star wipes",
        fix: "Remove them. On business or church footage they read as dated and slightly comic regardless of the quality of everything else.",
      },
      {
        problem: "Your motion stops dead",
        fix: "Apply ease-in and ease-out. Default linear interpolation moves at constant speed and halts instantly, which nothing physical does, and easing is the one change that makes motion look professional.",
      },
      {
        problem: "Your animations are too slow",
        fix: "Cut them to about a third of a second. Longer animation makes the viewer wait for the content, and waiting is when they scroll away.",
      },
      {
        problem: "Each video animates differently",
        fix: "Build one template and duplicate it. Motion that varies per video is the clearest sign of an editor working without a system, and consistency is worth more to a client than any effect.",
      },
      {
        problem: "You used a purchased template unmodified",
        fix: "Build from the brand's colours and fonts or modify substantially. An unmodified pack makes your client's video look like hundreds of others, and they will notice.",
      },
    ],
    expertNotes: [
      "Default to a hard cut and justify every exception. Most cuts need no transition at all, and needing fewer than you expected is the normal outcome of learning this properly.",
      "Fix the cut before reaching for an effect. Abruptness comes from shots that do not belong together, and moving the cut point, adding B-roll or using an L cut all solve it — while a transition only hides it for one frame.",
      "Apply easing to every animation. Linear interpolation stops dead, which nothing physical does, and ease-in and ease-out is the single change that separates amateur motion from professional motion.",
      "Build one template and reuse it. Two fonts, two or three colours, fixed placement and identical motion across every video makes a client's fifth video match their first, which is worth more to them than any individual effect.",
    ],
    vocabulary: [
      {
        term: "Hard cut",
        meaning:
          "A straight cut with no effect. Invisible, fast and confident — the default for almost everything.",
      },
      {
        term: "Dissolve",
        meaning:
          "One image blending into the next. Says time has passed or two ideas are connected.",
      },
      {
        term: "Fade to black",
        meaning: "The strongest section signal available. A full stop, not a comma.",
      },
      {
        term: "Keyframe",
        meaning:
          "A set value at a point in time, with the software interpolating between them. Position, scale, opacity, rotation.",
      },
      {
        term: "Easing",
        meaning:
          "Slow at the start and end, faster in the middle. What makes motion look natural instead of mechanical.",
      },
      {
        term: "Linear interpolation",
        meaning:
          "Constant speed with a dead stop. The default, and the reason beginner motion looks amateur.",
      },
      {
        term: "Template",
        meaning:
          "A project file with text, motion and colours already built. Duplicated per video so everything stays on brand.",
      },
      {
        term: "Brand consistency",
        meaning:
          "The same fonts, colours, placement and motion across every video. Worth more to a client than any single effect.",
      },
    ],
    homework: [
      {
        task: "Strip every transition from one of your videos",
        detail:
          "Watch it as hard cuts and note which joins now feel wrong. Repair each by moving the cut point, adding B-roll or using an L cut rather than replacing the effect.",
      },
      {
        task: "Add back one transition and justify it",
        detail:
          "State what change of state it marks. If you cannot, remove it — decoration on every cut makes a video feel like a template.",
      },
      {
        task: "Animate one graphic with and without easing",
        detail:
          "Keyframe the same move twice, once linear and once eased. Put them side by side and note the difference.",
      },
      {
        task: "Build a template from a real brand",
        detail:
          "Two fonts, two or three colours, one lower third, one title, one end card, all animated consistently. Save it so you can duplicate it for every future video.",
      },
    ],
    rubric: [
      {
        criterion: "Restraint",
        passing: "Uses transitions sparingly.",
        excellent:
          "Every transition removed and the edit watched as hard cuts, with only those marking a change of time, place, section or emphasis added back and each one justified in words.",
      },
      {
        criterion: "Problem solving",
        passing: "Smooths awkward joins.",
        excellent:
          "Awkward joins repaired by moving the cut point, covering with B-roll or using an L cut rather than hidden behind an effect.",
      },
      {
        criterion: "Motion",
        passing: "Animates text and graphics.",
        excellent:
          "Keyframed on position and opacity, demonstrated linear then eased, about a third of a second, and identical in direction, speed and easing on every instance.",
      },
      {
        criterion: "Consistency",
        passing: "Videos look similar.",
        excellent:
          "One template with two fonts, two or three colours and fixed placement, duplicated across both deliverables so they visibly came from the same place.",
      },
      {
        criterion: "Originality",
        passing: "Uses available templates.",
        excellent:
          "The template built from the brand's own colours and fonts, or a purchased pack modified substantially, with its origin stated and justified.",
      },
    ],
    faqs: [
      {
        q: "How many transitions should a video have?",
        a: "Fewer than you think. A five-minute piece usually needs two or three, each marking a change of time, place or section; a 45-second vertical carrying one idea usually needs none. The default for every other cut is a hard cut.",
      },
      {
        q: "My cuts feel abrupt. Should I add a dissolve?",
        a: "Usually not. The abruptness comes from the two shots not belonging together, so move the cut point, cover the join with B-roll, or use an L cut so the audio carries across. A dissolve hides the problem for one frame and the viewer still feels it.",
      },
      {
        q: "Why does my animated text look amateur?",
        a: "Almost certainly linear interpolation — the default moves at constant speed and stops dead, which nothing physical does. Apply ease-in and ease-out and shorten the animation to about a third of a second. Those two changes fix most of it.",
      },
      {
        q: "Should I buy a template pack?",
        a: "You can, but do not use it unmodified — a client who recognises it will wonder what they paid for, and their video will look like hundreds of others. Better to build your own from the brand's colours and fonts, or modify a pack substantially enough that it is yours.",
      },
      {
        q: "Is a fade to black ever wrong?",
        a: "It is a full stop, so use it only where a section genuinely ends. Fading between closely related shots tells the viewer the piece is over, and using it frequently makes a video feel slower and more fragmented than it is.",
      },
    ],
  },

  "colour-export": {
    summary:
      "The finish: making both cameras match and the picture look correct, then exporting each deliverable to the specifications its platform actually wants. This session covers the difference between correction and grading, solving the mixed window-and-LED light in our footage, export settings that matter, and why WhatsApp destroys a video you spent a week on.",
    objectives: [
      "Tell colour correction from colour grading and do them in order",
      "Match two cameras so they look like one",
      "Handle mixed daylight and tungsten light",
      "Choose resolution, frame rate, codec and bitrate deliberately",
      "Export to each platform's requirements",
      "Deliver video that survives WhatsApp compression",
    ],
    blocks: [
      {
        heading: "Correction and grading are different jobs",
        body: [
          "These two words are used interchangeably and they are not the same. **Colour correction** makes the picture look **correct**: the right exposure, white that is actually white, skin that looks like skin, and every shot matching the next. **Colour grading** applies a **creative look** on top of a corrected image — warmer, cooler, more contrast, a particular mood.",
          "The order is not negotiable: **correct first, then grade**. Grading an uncorrected image means fixing a look on top of a wrong baseline, so the shots that were already off become off in a stylised way and nothing matches. Beginners grade first because grading is the visible, satisfying part, and then spend longer trying to make shots match than the correction would have taken.",
          "On our footage the correction work is substantial. We have **two cameras** that were never matched — different sensors, different automatic white balance guesses — and **two light sources** in the room: cool daylight from the windows and warm ceiling LEDs. The result is a wide shot and a close shot of the same person looking like two different rooms, which is the single most common thing that makes multi-camera video look amateur.",
        ],
      },
      {
        heading: "Matching two cameras and mixed light",
        body: [
          "Matching is a comparison task, so **put the two shots side by side** — in Premiere a reference monitor or a split frame, in CapCut by cutting between them repeatedly — and adjust one until it matches the other. **Choose the better-exposed, better-lit shot as the reference** and bring everything else to it, rather than trying to meet in the middle.",
          "The order of adjustment matters: **exposure first, then white balance, then saturation**. Fixing brightness changes how colour reads, so setting white balance first means setting it twice. For white balance, find **something neutral in the frame** — a white shirt, a white wall, a sheet of paper — and adjust temperature until it is genuinely neutral. This is the same discipline as in still photography, and for the same reason: your eye adapts to a colour cast within about thirty seconds and will convince you an orange image is correct.",
          "Then accept what cannot be fixed. **Mixed light in one frame** — daylight on one side of a face and tungsten on the other — cannot be balanced to a single colour, because the two sides genuinely are different colours. Choose which source the face will match and accept a cast on the other side, or plan to shoot the next one with the ceiling lights off. Knowing the limit is part of the skill; pretending otherwise produces hours of work for a result nobody will call correct.",
        ],
      },
      {
        heading: "A grade that does not damage the picture",
        body: [
          "Once the images match and look correct, a grade is a choice — and the useful discipline is that **a grade should be a decision, not a habit**. The question is what the video should feel like: a business talk wants clean and neutral, an event recap wants warmth and energy, a church clip often wants soft and warm. Then apply that consistently across every shot.",
          "The commonest grading errors are **crushed blacks and blown highlights** — pushing contrast until dark areas become featureless black and bright areas become featureless white, losing detail at both ends. The related one is **oversaturation**, where skin goes orange and the image looks processed rather than photographed. Both are invisible while you are working, because your eye adapts, and both are obvious to anyone seeing the video for the first time.",
          "So grade lightly, **check skin tones against reality**, and look away for a few minutes before judging the result. If your editor has a histogram or waveform, use it — it tells you objectively whether you have clipped, which your eye will not. And keep the grade **subtle enough that a viewer never thinks about the colour**, which is the mark of grading done well.",
        ],
      },
      {
        heading: "Export settings that actually matter",
        body: [
          "Four settings decide your export, and everything else is secondary. **Resolution**: 1080 by 1920 for the vertical piece, 1920 by 1080 for the horizontal — 4K is rarely needed for social and quadruples the file size. **Frame rate**: match what you shot, so 25 or 30 fps for most phone and event footage; changing frame rate on export causes judder or stutter and is a common self-inflicted problem.",
          "**Codec**: H.264 is the safe universal choice, compatible everywhere; H.265 is smaller and better quality at the same size but is not supported on some older devices and platforms. **Bitrate** is the one people get wrong most: too low and the image breaks up in motion, too high and the file is enormous for no benefit. For 1080p, roughly **8 to 16 Mbps** is a sensible range, and audio should be **AAC at 320 kbps**.",
          "Then the habit that catches most errors: **watch the exported file, not the timeline**. The timeline shows your project; the export shows what the viewer gets. Compression artefacts, audio that is out of sync, captions in the wrong place and colours that shifted all appear only in the exported file, and checking it takes two minutes while discovering it after the client has posted costs you the job.",
        ],
      },
      {
        heading: "Platform specs, and the WhatsApp problem",
        body: [
          "Each platform has requirements, and they change, so the professional habit is to **check the current specifications before delivering** rather than trusting memory. As a working baseline: **Instagram Reels and TikTok** want vertical 1080 by 1920, **YouTube** wants horizontal 1920 by 1080 and also accepts vertical for Shorts, and all of them re-compress whatever you upload. **Keep your own master export at full quality** and let the platform compress it, because uploading an already-compressed file means it is compressed twice and looks worse than either pass alone.",
          "**WhatsApp is the hard case, and it matters more here than anywhere else** because so much video in Nigeria is delivered and shared through it. WhatsApp re-encodes aggressively to keep files small, and it visibly destroys fine detail, introduces blocky artefacts in motion, and can shift colour. There is no setting that prevents this, because the damage happens on their side after you send it.",
          "So the practical responses are: **avoid fine detail and thin text** that compression will smear — which is one more reason captions should be large and bold; **export at a reasonable rather than maximum bitrate**, since WhatsApp will discard the excess anyway; **send the file as a document** rather than as a video where the recipient needs the original quality, which bypasses the video re-encode; and for anything a client will use commercially, **deliver the master file by a cloud link** and let WhatsApp be the preview. Telling a client this is part of the service, because they will otherwise judge your work by the compressed version their cousin forwarded.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor finishes both deliverables on the live timeline — matching the two cameras against a reference frame, neutralising the mixed window-and-LED light, applying one consistent grade, exporting each piece to its platform's specification, and demonstrating exactly what WhatsApp compression does to the finished vertical cut.",
      steps: [
        {
          step: "Play the corrected and uncorrected cut back to back",
          detail:
            "Show the two cameras disagreeing. Explain that mismatched cameras are the most common reason multi-camera video looks amateur.",
        },
        {
          step: "Put the wide and close side by side",
          detail:
            "Set up a comparison view. Explain that matching is a comparison task and cannot be done by adjusting one shot in isolation.",
        },
        {
          step: "Choose the better shot as the reference",
          detail:
            "Explain that you bring everything to the best-lit shot rather than trying to meet in the middle, which makes both worse.",
        },
        {
          step: "Match exposure first",
          detail:
            "Explain that brightness changes how colour reads, so exposure comes before white balance or the balance is set twice.",
        },
        {
          step: "Find something neutral in the frame",
          detail:
            "Use a white shirt or wall. Explain that without a reference your eye adapts to a cast in about thirty seconds and calls it correct.",
        },
        {
          step: "Neutralise the white balance against it",
          detail:
            "Adjust temperature until the neutral is genuinely neutral. Explain that this is the same discipline as in still photography and for the same reason.",
        },
        {
          step: "Match the second camera to it",
          detail:
            "Cut between them until they agree. Explain that the test is a straight cut between angles with no visible colour jump.",
        },
        {
          step: "Show the mixed-light face",
          detail:
            "Daylight on one side, tungsten on the other. Explain that this cannot be balanced to one colour because the two sides genuinely are different colours.",
        },
        {
          step: "Choose which source the face matches",
          detail:
            "Accept a cast on the other side. Explain that knowing the limit is part of the skill and hours of work will not make it neutral.",
        },
        {
          step: "Apply one consistent grade across every shot",
          detail:
            "Explain that a grade should be a decision about how the video feels, not a habit applied because grading is the satisfying part.",
        },
        {
          step: "Push the contrast too far",
          detail:
            "Show the crushed blacks and blown highlights. Explain that detail lost at both ends cannot be recovered and looks worse than no grade.",
        },
        {
          step: "Check the skin tones",
          detail:
            "Compare against how the person actually looks. Explain that oversaturated skin goes orange and reads as processed rather than photographed.",
        },
        {
          step: "Look away for a few minutes and re-judge",
          detail:
            "Explain that your eye adapts, so the only reliable check is a fresh look or an objective scope.",
        },
        {
          step: "Set the export for the vertical piece",
          detail:
            "1080 by 1920, matching frame rate, H.264, 8 to 16 Mbps, AAC at 320 kbps. Explain that changing frame rate on export causes judder.",
        },
        {
          step: "Set the export for the horizontal piece",
          detail:
            "1920 by 1080 with the same care. Explain that 4K is rarely needed for social and quadruples the file size for no gain.",
        },
        {
          step: "Watch the exported files, not the timeline",
          detail:
            "Check compression, sync, caption position and colour. Explain that the timeline shows your project while the export shows what the viewer gets.",
        },
        {
          step: "Send the vertical through WhatsApp and compare",
          detail:
            "Show the artefacts and lost detail. Explain that the damage happens on their side after you send, and no export setting prevents it.",
        },
        {
          step: "Send the same file as a document",
          detail:
            "Show the difference. Explain that this bypasses the video re-encode and is how a client receives the actual quality.",
        },
        {
          step: "Deliver the master by cloud link",
          detail:
            "Explain that telling the client to use the master rather than the WhatsApp forward is part of the service.",
        },
      ],
    },
    practice: {
      title: "Final project: finish and deliver both videos",
      brief:
        "You complete the course deliverable — a 45-second vertical piece and a five-minute horizontal piece, both colour-matched, corrected, graded consistently, captioned, mixed and exported to platform specifications — then verify each exported file and deliver the master in a way that survives.",
      steps: [
        "Put the wide and close shots side by side and choose the better-lit one as your reference.",
        "Match exposure first, then white balance, then saturation.",
        "Neutralise white balance against something genuinely neutral in the frame.",
        "Match the second camera until a straight cut between angles shows no colour jump.",
        "Identify any mixed-light frames and decide which source the faces match.",
        "Apply one consistent grade across every shot in both videos.",
        "Check that no blacks are crushed and no highlights are blown.",
        "Check skin tones against how the person actually looks.",
        "Step away for a few minutes, then re-judge the grade with fresh eyes.",
        "Confirm both videos are captioned, mixed and text-packaged from the earlier sessions.",
        "Export the vertical at 1080 by 1920, matching frame rate, H.264, 8 to 16 Mbps, AAC at 320 kbps.",
        "Export the horizontal at 1920 by 1080 with the same care.",
        "Watch both exported files end to end rather than the timeline.",
        "Check audio sync, caption position and colour on the exported files.",
        "Preview both on a phone, including captions against the platform interface.",
        "Send the vertical through WhatsApp and compare it with the master.",
        "Note specifically what the compression damaged.",
        "Send the same file as a document and compare again.",
        "Deliver the master files by a cloud link and explain to the client which version to use.",
        "Write one short note per video on what you corrected, graded and chose for export.",
      ],
      standard:
        "Both course deliverables finished: the wide and close shots compared side by side with the better-lit chosen as reference, exposure matched before white balance and saturation, white balance neutralised against something genuinely neutral in frame, the second camera matched until a straight cut between angles shows no colour jump, mixed-light frames identified with a stated decision on which source the faces match; one consistent grade applied across every shot of both videos with no crushed blacks or blown highlights, skin tones checked against reality and the grade re-judged after stepping away; both videos confirmed captioned, mixed and text-packaged from earlier sessions; the vertical exported at 1080 by 1920 and the horizontal at 1920 by 1080, both at matching frame rate in H.264 at 8 to 16 Mbps with AAC audio at 320 kbps; both exported files watched end to end rather than the timeline, with audio sync, caption position and colour checked and both previewed on a phone against the platform interface; the vertical sent through WhatsApp and compared with the master with the specific damage noted, the same file sent as a document and compared again, masters delivered by cloud link with the client told which version to use; and one short note per video covering what was corrected, graded and chosen for export.",
    },
    pitfalls: [
      {
        problem: "You grade before you correct",
        fix: "Correct first. Grading an uncorrected image fixes a look on top of a wrong baseline, so mismatched shots become mismatched in a stylised way and take longer to fix than correcting would have.",
      },
      {
        problem: "Your two cameras look like two different rooms",
        fix: "Compare them side by side and match the weaker to the better-lit reference. Mismatched cameras are the most common reason multi-camera video looks amateur.",
      },
      {
        problem: "You set white balance before exposure",
        fix: "Exposure first. Brightness changes how colour reads, so balancing first means balancing twice.",
      },
      {
        problem: "You try to neutralise mixed light in one frame",
        fix: "Choose which source the face matches and accept a cast elsewhere. Daylight and tungsten on one face genuinely are two colours, and no amount of work makes that neutral.",
      },
      {
        problem: "You crush the blacks to add contrast",
        fix: "Grade lightly and check a scope if you have one. Detail lost at either end cannot be recovered, and an ungraded image looks better than a clipped one.",
      },
      {
        problem: "You change the frame rate on export",
        fix: "Match what you shot. Converting frame rate causes judder and stutter, and it is entirely self-inflicted.",
      },
      {
        problem: "You check the timeline instead of the export",
        fix: "Watch the exported file. Compression artefacts, sync drift, misplaced captions and shifted colour only appear in the export, and checking takes two minutes.",
      },
      {
        problem: "You deliver through WhatsApp and leave it there",
        fix: "Deliver the master by a cloud link and say which to use. WhatsApp re-encodes aggressively on their side, so the client will otherwise judge your week of work by a compressed forward.",
      },
    ],
    expertNotes: [
      "Correct before you grade, every time. Grading an uncorrected image means mismatched shots become mismatched in a stylised way, and fixing that takes longer than doing the correction first would have.",
      "Match exposure before white balance, and use a neutral reference in the frame. Brightness changes how colour reads, and your eye adapts to a cast in about thirty seconds, so without a reference you will call an orange image correct.",
      "Watch the exported file, never just the timeline. Compression artefacts, sync drift, misplaced captions and shifted colour only appear after export, and two minutes of checking prevents a client discovering it first.",
      "Deliver masters by cloud link and treat WhatsApp as a preview. It re-encodes aggressively on their side and no export setting prevents it, so tell the client which version to use — otherwise they judge your work by a compressed forward.",
    ],
    vocabulary: [
      {
        term: "Colour correction",
        meaning:
          "Making the picture correct: exposure, white balance, and every shot matching. Done first, always.",
      },
      {
        term: "Colour grading",
        meaning:
          "A creative look applied on top of a corrected image. A decision about how the video should feel.",
      },
      {
        term: "Matching",
        meaning:
          "Adjusting one camera to a reference shot until a straight cut shows no colour jump. A comparison task.",
      },
      {
        term: "Mixed light",
        meaning:
          "Two sources of different colour on one subject. Cannot be neutralised; choose which the face matches.",
      },
      {
        term: "Crushed blacks",
        meaning:
          "Dark areas pushed to featureless black. Detail lost permanently, and it reads as worse than no grade.",
      },
      {
        term: "Frame rate",
        meaning: "Frames per second. Match what you shot on export, or the result judders.",
      },
      {
        term: "Bitrate",
        meaning:
          "Data per second. Too low breaks up in motion; too high wastes size. About 8 to 16 Mbps for 1080p.",
      },
      {
        term: "Re-encode",
        meaning:
          "A platform compressing your file again. Why you upload a full-quality master and let the platform do it once.",
      },
    ],
    homework: [
      {
        task: "Match two mismatched shots",
        detail:
          "Put them side by side, choose the better-lit as reference, and match exposure then white balance. Test with a straight cut between them.",
      },
      {
        task: "Correct one shot, then grade it",
        detail:
          "Do it in that order and note how much easier the grade was on a corrected baseline than on a raw one.",
      },
      {
        task: "Export one video twice at different bitrates",
        detail:
          "Compare them on a phone in a scene with movement. Find the point where lower bitrate visibly breaks up.",
      },
      {
        task: "Send one video through WhatsApp and compare",
        detail:
          "Note exactly what the compression damaged — fine detail, text, colour. Then send it as a document and compare again.",
      },
    ],
    rubric: [
      {
        criterion: "Correction",
        passing: "Picture looks reasonable.",
        excellent:
          "Exposure matched before white balance, white balance neutralised against a reference in frame, and a straight cut between the two cameras showing no colour jump.",
      },
      {
        criterion: "Grading",
        passing: "Applies a consistent look.",
        excellent:
          "One deliberate grade across every shot of both videos, no crushed blacks or blown highlights, skin tones checked against reality, and the grade re-judged with fresh eyes.",
      },
      {
        criterion: "Export settings",
        passing: "Exports the videos.",
        excellent:
          "Vertical at 1080 by 1920 and horizontal at 1920 by 1080, frame rate matched to the source, H.264 at 8 to 16 Mbps with AAC at 320 kbps, chosen deliberately rather than by preset.",
      },
      {
        criterion: "Verification",
        passing: "Checks the video plays.",
        excellent:
          "Both exported files watched end to end with sync, caption position and colour checked, and both previewed on a phone against the platform interface overlay.",
      },
      {
        criterion: "Delivery",
        passing: "Sends the files.",
        excellent:
          "WhatsApp compression tested and its specific damage noted, the file also sent as a document, masters delivered by cloud link, and the client told which version to use.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between colour correction and grading?",
        a: "Correction makes the picture correct — exposure, white balance, and every shot matching the next. Grading applies a creative look on top of a corrected image. Always correct first: grading an uncorrected image makes mismatched shots mismatched in a stylised way, which takes longer to fix.",
      },
      {
        q: "My two cameras look completely different. How do I match them?",
        a: "Put them side by side, choose the better-lit as your reference, and match exposure first, then white balance, then saturation. Test with a straight cut between the angles — if you can see a colour jump, keep adjusting.",
      },
      {
        q: "What export settings should I use?",
        a: "1080 by 1920 vertical or 1920 by 1080 horizontal, the same frame rate you shot, H.264, roughly 8 to 16 Mbps for 1080p, and AAC audio at 320 kbps. Do not change the frame rate on export — that causes judder.",
      },
      {
        q: "Why does my video look bad after I send it on WhatsApp?",
        a: "WhatsApp re-encodes aggressively to keep files small, and the damage happens on their side after you send it, so no export setting prevents it. Send the file as a document to bypass the video re-encode, and deliver masters by cloud link so the client uses the real quality.",
      },
      {
        q: "Should I export in 4K?",
        a: "Usually not for social. It quadruples the file size, the platforms re-compress it anyway, and most viewing happens on a phone. Export a full-quality 1080p master and let the platform compress once, rather than uploading something already compressed.",
      },
    ],
  },
};
