import type { SessionLecture } from "../types";

/**
 * Video Editing — ₦20,000 · 3 weeks · 6 sessions.
 * Sessions 1 to 3. (4–6 in video-editing-b.ts.)
 *
 * Shape differs on purpose: this is a TIMELINE course. One project is edited
 * forward across all six sessions — each session picks up the timeline the
 * previous one left — rather than eight disconnected exercises. Taught in
 * CapCut and Premiere fundamentals, on phone and laptop.
 *
 * THE RUNNING PROJECT (defined in session 1, carried to session 6):
 *   ~40 minutes shot at a small business event in Lagos — a talk on selling
 *   online. Two cameras (wide on a tripod, close handheld), one lapel mic on
 *   the speaker, room audio recorded on the second camera, plus roughly six
 *   minutes of B-roll: audience, signage, hands, the street outside. Lighting
 *   is window light mixed with warm ceiling LEDs, which is the colour problem
 *   session 6 has to solve.
 *   Deliverables cut from it: a 45-second vertical piece for Instagram, TikTok
 *   and WhatsApp, and a 5-minute horizontal piece for YouTube.
 */
export const videoEditingLessonsA: Record<string, SessionLecture> = {
  "story-assembly": {
    summary:
      "Editing is not arranging clips nicely; it is deciding what the video is about and cutting everything that is not that. This session covers story structure, logging and selecting footage, building an assembly edit before touching anything decorative, and the opening three seconds that decide whether anyone watches the rest.",
    objectives: [
      "Structure a video so it holds attention to the end",
      "Write a hook that earns the next five seconds",
      "Log footage and select deliberately rather than by scrolling",
      "Build a complete assembly edit before adding anything decorative",
      "Judge what to cut when the story is already clear",
      "Organise a project so it survives weeks of work",
    ],
    blocks: [
      {
        heading: "The project, and why it is one project",
        body: [
          "Everything from here to the final export uses **one piece of footage**, edited forward. It is about forty minutes shot at a small business event in Lagos — a talk on selling online — captured on **two cameras**: a wide on a tripod and a close handheld. The speaker wears a **lapel mic**, and the second camera records the room as well. Around the edges there are roughly **six minutes of B-roll**: the audience, the signage, hands, the street outside. The lighting is window light mixed with warm ceiling LEDs, which is a problem we will not solve until session six.",
          "From that single shoot you will cut **two finished videos**, which is the deliverable for this course: a **45-second vertical piece** for Instagram, TikTok and WhatsApp, and a **5-minute horizontal piece** for YouTube. Working this way is deliberate, because it is how the work actually arrives — a client hands you a folder of footage and asks for two things, not one — and because editing the same material twice teaches you what changes between platforms far better than two unrelated exercises.",
          "It also forces the discipline that matters most in editing: **you cannot use everything**. Forty minutes into five into forty-five seconds is a ratio of about fifty to one and then a further seven to one. Every decision in this course is a decision about what to throw away, and starting from an abundance of usable footage makes that unavoidable rather than theoretical.",
        ],
      },
      {
        heading: "Structure: the shape that holds attention",
        body: [
          "A video holds attention when the viewer always knows **what is happening and why they should keep watching**. The shape that does this is short and old: **hook, setup, development, payoff, close**. The hook earns the next few seconds. The setup says what this is and who it is for. The development delivers the substance in a sequence that builds. The payoff is the thing they came for. The close tells them what to do or leaves them with one thing to remember.",
          "The commonest structural failure is not a weak hook — it is **a middle that has no order**. A talk is delivered in the order the speaker thought of things, which is rarely the order a viewer needs. So the editor's job is often to **rearrange**: pull the strongest point forward, group related ideas, and cut the digressions that made sense live and read as rambling on screen.",
          "Then the platform difference. A **five-minute horizontal piece** can afford a proper setup — the viewer has committed. A **45-second vertical piece** cannot: it must open with the payoff already in progress, because the viewer decides within about two seconds and has no obligation to stay. Same footage, same story, **completely different order**, and learning to restructure rather than merely shorten is the actual skill in short-form editing.",
        ],
      },
      {
        heading: "The opening three seconds",
        body: [
          "On short-form video the opening is not an introduction, it is a **claim on attention**. Viewers scrolling on a phone will give you roughly two seconds, and the instinct to open with a logo, a title card, or someone saying **hello everyone, welcome back to my channel** costs you most of them before you have said anything.",
          "What works is starting **inside the substance**. Open on the strongest sentence in the whole talk. Open on a visual that raises a question. Open mid-action, mid-sentence, with the context arriving afterwards. **Most people selling online in Nigeria are pricing wrong** is a hook; **Good morning, thank you all for coming** is not, however warm the room was.",
          "The practical method is to **find your hook after you have watched everything**, not before. The best opening line is usually buried in minute twenty-two, and you only know that once you have seen minute forty. So the hook is the last thing you choose and the first thing the viewer sees — which is exactly backwards from how the event happened, and is the whole reason an editor is needed.",
        ],
      },
      {
        heading: "Logging and selecting",
        body: [
          "The unglamorous step that determines everything after it is **watching all the footage and writing down what is in it**. Not skimming — watching, at speed if you must, and noting timecodes. **14:32 strong point on pricing. 18:05 laugh, good energy. 26:40 camera bumped, unusable. 31:15 best line in the talk.** Twenty minutes of logging saves hours of hunting later.",
          "Selection then becomes a **decision from a list rather than a feeling from scrolling**. Mark your selects — in CapCut by splitting and keeping, in Premiere by marking in and out points or using a bin — and build only from those. The discipline matters because scrolling through footage again and again is how editors end up using a clip because they have seen it eight times rather than because it is good.",
          "Then **select for the story, not for the shot**. A beautifully framed piece of B-roll that does not support a point is decoration, and decoration is the first thing to cut when a video runs long. Ask of every clip: **which sentence is this illustrating?** If the answer is none, it does not go in the assembly — however good it looks, and however much time you spent shooting it.",
        ],
      },
      {
        heading: "The assembly edit: ugly but complete",
        body: [
          "An **assembly edit** is the story in the right order with nothing else done: no music, no colour, no captions, no transitions, no effects. The clips are rough, the cuts are long, and it runs too long. It is also the most important stage, because **every problem in the finished video is a problem in the assembly** — and fixing a structure after you have added music and effects means undoing all of it.",
          "The test of an assembly is simple: **watch it with the sound off, then with the sound on, and ask whether the story is clear.** If a viewer could not follow it, no amount of grading or motion graphics will save it. If they can follow it, everything you add afterwards is enhancement rather than rescue.",
          "Then the discipline that separates people who finish from people who fiddle: **get the assembly complete before you improve any part of it.** Editing one section until it is perfect while the rest is unbuilt feels productive and guarantees you will run out of time with an unfinished video and one beautiful minute. Complete first, refine second, and cut last — because the assembly always runs long, and shortening is its own skill.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor takes the raw forty-minute event footage through the whole first stage on a projected timeline: watching and logging at speed, marking selects, finding the hook in minute twenty-two, building a complete assembly for the five-minute version, then restructuring the same footage into a 45-second vertical piece with a different opening.",
      steps: [
        {
          step: "Set up the project folder before importing",
          detail:
            "Footage, audio, music, graphics and exports in separate folders. Explain that a disorganised project costs an hour a week and becomes unusable by anyone else.",
        },
        {
          step: "Import both cameras and check the sync",
          detail:
            "Line up the lapel mic with the room audio using the waveform. Explain that syncing early prevents drift you would otherwise discover after building the whole timeline.",
        },
        {
          step: "Set the sequence to horizontal 1920 by 1080",
          detail:
            "Explain that the five-minute YouTube piece is the main sequence and the vertical version comes later from the same selects.",
        },
        {
          step: "Watch the whole talk at double speed and log timecodes",
          detail:
            "Write down every strong point, every unusable moment and every good line. Explain that twenty minutes of logging saves hours of hunting.",
        },
        {
          step: "Log the B-roll separately",
          detail:
            "Note what each B-roll clip shows. Explain that B-roll is chosen to illustrate a specific sentence, not because it looks good.",
        },
        {
          step: "Mark the selects",
          detail:
            "Mark in and out on the chosen moments only. Explain that selecting from a list is a decision while selecting by scrolling is a feeling.",
        },
        {
          step: "Drop the selects onto the timeline in story order",
          detail:
            "Not in the order they happened. Explain that a speaker's order is rarely the order a viewer needs.",
        },
        {
          step: "Rearrange to put the strongest point early",
          detail:
            "Move a point from minute thirty to the front. Explain that restructuring, not shortening, is the editor's real job.",
        },
        {
          step: "Cut the digressions",
          detail:
            "Remove the live asides that made sense in the room. Explain that a digression reads as rambling on screen even when it landed well live.",
        },
        {
          step: "Play the assembly with the sound off",
          detail:
            "Ask whether the story is still followable. Explain that this is the test of structure, and no grade or graphic fixes a story that does not work.",
        },
        {
          step: "Play it with sound and time it",
          detail:
            "Show it running nine minutes against a five-minute target. Explain that assemblies always run long and shortening is its own skill.",
        },
        {
          step: "Resist adding music or effects",
          detail:
            "Explain that every structural fix after this point means undoing the decoration, which is why the assembly stays bare.",
        },
        {
          step: "Find the hook by reviewing the log",
          detail:
            "Locate the strongest line at minute twenty-two. Explain that the best opening is usually buried and only findable once you have seen everything.",
        },
        {
          step: "Create the vertical sequence at 1080 by 1920",
          detail:
            "Explain the reframe needed for a horizontal source, and that the speaker must stay in frame as the crop moves.",
        },
        {
          step: "Open the vertical piece mid-sentence on the hook",
          detail:
            "No logo, no greeting. Explain that viewers give about two seconds and a title card spends them.",
        },
        {
          step: "Cut the vertical to 45 seconds",
          detail:
            "One idea, not a summary. Explain that a 45-second piece is not a short version of the long one; it is a different video with a different job.",
        },
        {
          step: "Compare the two openings side by side",
          detail:
            "Explain that the same footage needs a different order per platform, and that this restructuring is the skill being taught.",
        },
      ],
    },
    practice: {
      title: "Log the footage and build both assemblies",
      brief:
        "You watch and log the full forty minutes, mark your selects, and build two complete assembly edits — the five-minute horizontal piece and the 45-second vertical piece — with no music, colour, captions or effects, each verified to tell a clear story with the sound off.",
      steps: [
        "Set up a project folder with separate subfolders for footage, audio, music, graphics and exports.",
        "Import both camera angles and the lapel mic audio.",
        "Sync the lapel audio to the room audio using the waveform and confirm no drift.",
        "Create the horizontal sequence at 1920 by 1080 for the five-minute piece.",
        "Watch the full talk at double speed and log every timecode worth keeping.",
        "Note every unusable moment: camera bumps, interruptions, long pauses.",
        "Log the B-roll separately, writing what each clip shows.",
        "Mark in and out points on your selects only.",
        "Build the horizontal assembly from the selects in story order, not chronological order.",
        "Move at least one strong point earlier than it occurred.",
        "Cut every digression that only worked live.",
        "Play the assembly with the sound off and confirm the story is followable.",
        "Record the assembly runtime and how far over target it is.",
        "Create the vertical sequence at 1080 by 1920.",
        "Choose your hook only after reviewing the whole log, and note its original timecode.",
        "Open the vertical piece mid-sentence on that hook with no logo or greeting.",
        "Cut the vertical assembly to 45 seconds around one single idea.",
        "Play the vertical assembly with the sound off and confirm it works.",
        "Write one sentence stating what each video is about, and check the assemblies deliver it.",
        "Add no music, colour, captions, transitions or effects to either assembly.",
      ],
      standard:
        "A project folder with separated subfolders, both camera angles imported and the lapel audio synced to the room audio with no drift; the full forty minutes watched at speed with a timecode log covering every keeper, every unusable moment and every B-roll clip; selects marked by in and out points and built into a horizontal assembly at 1920 by 1080 in story rather than chronological order, with at least one strong point moved earlier, every live-only digression cut, the runtime recorded against target, and the story confirmed followable with the sound off; a vertical assembly at 1080 by 1920 opening mid-sentence on a hook chosen only after reviewing the whole log with its original timecode noted, no logo or greeting, cut to 45 seconds around one idea and also confirmed to work with the sound off; one sentence stating what each video is about; and no music, colour, captions, transitions or effects added to either.",
    },
    pitfalls: [
      {
        problem: "You open with a logo or a greeting",
        fix: "Open inside the substance. Viewers on a phone give about two seconds, and a title card or hello everyone spends them before you have said anything worth hearing.",
      },
      {
        problem: "You choose the hook before watching everything",
        fix: "Find it after the full log. The strongest line is usually buried in minute twenty-two, and you cannot know that until you have seen minute forty.",
      },
      {
        problem: "You edit in the order things happened",
        fix: "Reorder for the viewer. A speaker's order is the order they thought of things, which is rarely the order an audience needs to hear them.",
      },
      {
        problem: "You scroll the footage instead of logging it",
        fix: "Watch it all once at speed and write timecodes. Scrolling means you choose clips you have seen eight times rather than clips that are good.",
      },
      {
        problem: "You keep beautiful B-roll that illustrates nothing",
        fix: "Ask which sentence it supports. If the answer is none, cut it — decoration is the first thing to remove when a video runs long.",
      },
      {
        problem: "You add music and effects to a bare assembly",
        fix: "Complete the structure first. Every structural fix after decoration means undoing the decoration, which is how edits stall.",
      },
      {
        problem: "You perfect one section while the rest is unbuilt",
        fix: "Get the whole assembly complete, then refine. Editing one minute beautifully and running out of time leaves you with a finished fragment instead of a finished video.",
      },
      {
        problem: "You make the short version a cut-down of the long one",
        fix: "Restructure it. A 45-second piece opens with the payoff already in progress and carries one idea; it is a different video with a different job, not a summary.",
      },
    ],
    expertNotes: [
      "Watch everything and write timecodes before you cut anything. Twenty minutes of logging saves hours of hunting, and selecting from a written list is a decision while selecting by scrolling is a feeling.",
      "Choose the hook last and put it first. The strongest line is usually buried deep in the footage, and the editor's value is largely in finding it and moving it to the front.",
      "Complete the assembly before you improve any part of it. A video that is ugly but whole can be finished; a video with one beautiful minute and no ending cannot, and the difference is entirely about order of work.",
      "Test every assembly with the sound off. If the story does not hold without audio, no grade, caption or motion graphic will save it — and finding that out before you decorate saves the whole rebuild.",
    ],
    vocabulary: [
      {
        term: "Assembly edit",
        meaning:
          "The story in the right order with nothing decorative added. Every problem in the finished video is a problem here.",
      },
      {
        term: "Hook",
        meaning:
          "The opening claim on attention. Chosen last, placed first, and usually found deep in the footage.",
      },
      {
        term: "Logging",
        meaning:
          "Watching all footage and recording timecodes for keeps, unusable moments and B-roll. The step that determines everything after.",
      },
      {
        term: "Selects",
        meaning:
          "The marked moments you will build from. Choosing from a list rather than by scrolling.",
      },
      {
        term: "B-roll",
        meaning:
          "Supplementary footage illustrating what is being said. Cut it if it supports no sentence.",
      },
      {
        term: "Reframe",
        meaning:
          "Repositioning a horizontal shot to fill a vertical frame while keeping the subject in shot.",
      },
      {
        term: "Sync",
        meaning:
          "Aligning separate audio and video sources by waveform. Done early or it drifts and costs a rebuild.",
      },
      {
        term: "Restructure",
        meaning:
          "Reordering material for the viewer rather than shortening it. The real difference between a long and a short cut.",
      },
    ],
    homework: [
      {
        task: "Log twenty minutes of your own footage",
        detail:
          "Watch at double speed and write a timecode for every keeper, every unusable moment and every piece of B-roll. Note how much faster the next step becomes.",
      },
      {
        task: "Find three hooks in one piece of footage",
        detail:
          "Write three different opening lines from the same material and say what each promises the viewer. Choose one and say why.",
      },
      {
        task: "Build an assembly and test it silent",
        detail:
          "Story in order, no decoration. Play it with the sound off and ask someone whether they could follow it. Fix what they could not.",
      },
      {
        task: "Restructure one video for a different platform",
        detail:
          "Take a horizontal piece you have made and cut a 45-second vertical version with a different opening. Note what had to change beyond the crop.",
      },
    ],
    rubric: [
      {
        criterion: "Preparation",
        passing: "Imports footage and starts cutting.",
        excellent:
          "Project folder organised, both angles imported, audio synced by waveform with no drift, and the full footage watched at speed with a complete timecode log.",
      },
      {
        criterion: "Selection",
        passing: "Chooses usable clips.",
        excellent:
          "Selects marked deliberately from the log, each B-roll clip tied to a sentence it illustrates, and decoration rejected where it supports nothing.",
      },
      {
        criterion: "Structure",
        passing: "Assembles clips in order.",
        excellent:
          "Story reordered for the viewer rather than chronologically, at least one strong point moved earlier, live-only digressions cut, and the hook found in the log and placed first.",
      },
      {
        criterion: "Assembly discipline",
        passing: "Builds a rough cut.",
        excellent:
          "Both assemblies complete with no music, colour, captions or effects, each verified to work with the sound off, and nothing refined before the whole was built.",
      },
      {
        criterion: "Platform thinking",
        passing: "Produces two versions.",
        excellent:
          "A 45-second vertical piece carrying one idea and opening mid-sentence, structurally different from the five-minute horizontal version rather than a shortened copy of it.",
      },
    ],
    faqs: [
      {
        q: "Do I really have to watch all the footage?",
        a: "Yes, though you can watch at double speed. Logging is what lets you choose from a list instead of by scrolling, and it is how you find the strongest line, which is usually buried twenty minutes in and impossible to place first if you never saw it.",
      },
      {
        q: "What is an assembly edit and why not just make it look good as I go?",
        a: "It is the story in the right order with no music, colour, captions or effects. Building it first matters because every structural problem is cheaper to fix now; once you have decorated a section, changing the structure means undoing all of that work.",
      },
      {
        q: "How do I make a 45-second version of a five-minute video?",
        a: "You do not shorten it, you restructure it. Pick one idea rather than summarising several, open mid-sentence on your strongest line with no logo or greeting, and accept that it is a different video with a different job.",
      },
      {
        q: "Should I use CapCut or Premiere?",
        a: "Both are taught here and the craft is identical. CapCut is free, works on a phone and is fast for short-form; Premiere is faster for longer multi-camera work on a laptop. Start in whichever you have and the skills transfer completely.",
      },
      {
        q: "My vertical version crops the speaker out of frame. What do I do?",
        a: "Reframe — reposition the horizontal shot so the subject sits inside the vertical frame, and keyframe the position if they move. If the framing was too wide to reframe well, that is a shooting lesson for next time, and B-roll can cover the worst moments.",
      },
    ],
  },

  "cutting-craft": {
    summary:
      "The cut is the only thing unique to video, and where the craft actually lives. This session covers cutting on action so the eye follows, multi-camera cutting, J and L cuts that make dialogue sound natural, trimming dead air without making anyone sound anxious, and rhythm — the thing viewers feel and never name.",
    objectives: [
      "Cut on action so a transition is invisible",
      "Cut between two camera angles on a gesture",
      "Use J and L cuts to make dialogue sound natural",
      "Remove dead air without making speech sound rushed",
      "Control rhythm through shot length and pacing",
      "Know when a cut is the problem rather than the solution",
    ],
    blocks: [
      {
        heading: "Why the cut is the whole craft",
        body: [
          "Everything else in video — filming, lighting, sound, colour — exists in other media. **The cut is the only tool unique to video**, and it is where an editor's judgement actually shows. Two editors given the same footage produce different videos almost entirely because of where they cut and how long each shot lasts.",
          "The core principle is that **a cut should happen at a moment of change the viewer is already expecting**. Cut when something moves, when a sentence completes, when a question has been answered. Cut at a moment of stasis and the viewer notices the cut; cut at a moment of change and they notice only the change.",
          "This is why good editing is described as invisible. It does not mean nothing happens — it means the viewer is never pulled out of the story to notice the machinery. When someone says a video **flows**, they are describing cuts placed at points of expected change, and they have no idea that is what they are describing.",
        ],
      },
      {
        heading: "Cutting on action",
        body: [
          "**Cutting on action** means making the cut while something is moving, so the eye follows the movement across the cut instead of seeing it. If the speaker raises a hand, cut from the wide to the close **during** the raise, not before or after. The motion carries the viewer over the join and the cut disappears.",
          "The reason it works is attention. A moving object pulls the eye, and while the eye is following motion it does not register a change of frame. Cut between two static frames and the change is stark; cut during motion and the two shots are read as continuous. This single technique removes most of the jarring quality from beginner edits.",
          "With **two cameras** this becomes powerful rather than merely smooth. Wide for context, close for emphasis — cut to the close on the most important word of a sentence, cut back to the wide when a new point begins. The camera change then punctuates the meaning, which is what makes multi-camera footage feel directed rather than merely covered.",
        ],
      },
      {
        heading: "J and L cuts: the professional sound of a cut",
        body: [
          "These two cuts do more to make an edit sound professional than anything else in this session, and they are simple. In a normal cut, picture and sound change together. In an **L cut**, the picture changes but the **sound from the previous shot continues** underneath the new image. In a **J cut**, the **sound from the next shot arrives before its picture does**.",
          "The effect is that audio and picture overlap, which is how conversation and attention actually work — you keep hearing someone while you look at what they are describing, and you hear the next thing before you turn to it. **Cuts where audio and video change on the same frame feel mechanical**, because nothing in real perception works that way.",
          "In practice on our timeline: as the speaker finishes a point, cut to B-roll of the audience **while their voice continues** — that is an L cut, and it lets you show a reaction without losing the sentence. Before a new section begins, bring in the next speaker's audio **a beat before** you see them — a J cut, which pulls the viewer forward. In CapCut you do this by unlinking or detaching the audio and shifting it; in Premiere by dragging the audio and video edit points separately.",
        ],
      },
      {
        heading: "Trimming dead air without strangling the speech",
        body: [
          "Live speech is full of material that must go: **um**, **you know**, repeated words, and pauses that felt thoughtful in the room and read as hesitation on screen. Removing it is the biggest single improvement available on talk footage, and it is why a forty-minute talk becomes a five-minute video without losing any content.",
          "The trap is **cutting too tight**. Remove every breath and pause and the speaker sounds anxious, rushed and slightly panicked, and the viewer feels it without knowing why. Speech needs air. The rule that works is to **keep a beat before an important line and a beat after it** — the pause before gives weight to what follows, and the pause after lets it land.",
          "So trim the filler and the long middle pauses, and protect the pauses that carry meaning. Then listen back at speed: if the speaker sounds breathless, you have cut air that was doing a job. **The test is not whether it is short but whether it sounds like a confident person talking.**",
        ],
      },
      {
        heading: "Rhythm, pacing and when not to cut",
        body: [
          "**Rhythm** is the pattern of shot lengths, and viewers feel it without naming it. A run of short shots creates urgency and energy; longer shots create calm and weight. Most beginner edits have one uniform shot length throughout, which is why they feel monotonous even when every individual cut is correct. **Vary the length deliberately** — and vary it to match the content, not at random.",
          "Cutting to a **music beat** is a real technique and a common mistake. It works for montage and energy, but slavishly cutting every shot to the beat makes the video feel mechanical and, worse, means the **music is deciding what the viewer sees** rather than the story. Cut to the beat where it supports the moment; ignore it everywhere else.",
          "Then the discipline beginners most need: **know when not to cut**. A cut is an interruption, and a long held shot of a face during a difficult sentence carries more than three angle changes could. If a moment is working, leave it alone. The instinct to keep cutting because cutting is the job is exactly backwards — **the best edit is often the one with fewer cuts than you expected**, and restraint reads as confidence.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor refines the assembly from session one into a proper rough cut on the live timeline — cutting on action between the two cameras, converting hard cuts into J and L cuts, trimming the filler out of the talk while protecting meaningful pauses, and demonstrating what a uniform shot length does to rhythm before deliberately varying it.",
      steps: [
        {
          step: "Open the assembly and confirm nothing was decorated",
          detail:
            "Check no music or effects were added. Explain that cutting craft is done on bare footage because decoration hides bad cuts.",
        },
        {
          step: "Find a gesture in the wide shot",
          detail:
            "Locate the speaker raising a hand. Explain that this is where the cut belongs, not before or after it.",
        },
        {
          step: "Cut from wide to close during the gesture",
          detail:
            "Play it back. Explain that the eye follows the motion across the join, which is why the cut disappears.",
        },
        {
          step: "Cut back to the wide at the start of a new point",
          detail:
            "Explain that the angle change now punctuates the meaning, which is what makes two cameras feel directed rather than merely covered.",
        },
        {
          step: "Make a hard cut where audio and video change together",
          detail:
            "Play it. Explain that it sounds mechanical because nothing in real perception changes picture and sound on the same instant.",
        },
        {
          step: "Convert it to an L cut",
          detail:
            "Detach the audio in CapCut, or drag the audio edit point separately in Premiere, and let the voice continue over B-roll. Explain that this lets you show a reaction without losing the sentence.",
        },
        {
          step: "Convert one to a J cut",
          detail:
            "Bring the next section's audio in a beat early. Explain that it pulls the viewer forward and creates anticipation.",
        },
        {
          step: "Apply J and L cuts across the dialogue",
          detail:
            "Compare before and after. Explain that this overlap is the single biggest reason an edit sounds professional.",
        },
        {
          step: "Find and remove the filler words",
          detail:
            "Cut the ums, the you-knows and the repeated words. Explain that this is how forty minutes becomes five without losing content.",
        },
        {
          step: "Remove a long mid-sentence pause",
          detail:
            "Explain that a pause which felt thoughtful in the room reads as hesitation on screen.",
        },
        {
          step: "Cut so tight that the speaker sounds panicked",
          detail:
            "Remove every breath. Play it. Explain that viewers feel the anxiety without being able to say why.",
        },
        {
          step: "Put a beat back before an important line",
          detail:
            "Explain that the pause before gives the line weight, and the pause after lets it land.",
        },
        {
          step: "Listen back for confidence rather than length",
          detail:
            "Explain that the test is whether it sounds like a confident person talking, not whether it is short.",
        },
        {
          step: "Make every shot the same length",
          detail:
            "Set uniform two-second shots. Play it. Explain that uniformity reads as monotonous even when every individual cut is correct.",
        },
        {
          step: "Vary the shot lengths to match the content",
          detail:
            "Short shots for energy, longer for weight. Explain that rhythm is felt and never named, and it must match the meaning.",
        },
        {
          step: "Cut a montage to the music beat",
          detail:
            "Explain that this works for energy, then show it applied to dialogue where it becomes mechanical.",
        },
        {
          step: "Show a long held shot left alone",
          detail:
            "Leave one face on screen through a difficult sentence. Explain that restraint reads as confidence and a cut is always an interruption.",
        },
      ],
    },
    practice: {
      title: "Turn the assembly into a rough cut",
      brief:
        "You refine both assemblies using cutting craft only — cutting on action between the two cameras, J and L cuts across the dialogue, filler removed while meaningful pauses are protected, and shot length varied to match the content — with no music, colour, captions or effects added yet.",
      steps: [
        "Open the horizontal assembly and confirm it is still undecorated.",
        "Find five gestures in the wide shot and cut to the close during each one.",
        "Cut back to the wide at the start of each new point.",
        "Identify every cut where audio and video change on the same frame.",
        "Convert at least six of them to L cuts with the voice continuing over B-roll.",
        "Convert at least three to J cuts with the next audio arriving early.",
        "Remove every filler word: um, you know, and repeated words.",
        "Remove long mid-sentence pauses that read as hesitation.",
        "Keep a beat before each important line and a beat after it.",
        "Listen back and put air back anywhere the speaker sounds rushed.",
        "Set every shot to the same length and note how it feels.",
        "Vary the shot lengths so short shots carry energy and long shots carry weight.",
        "Cut one short sequence to the beat of a temporary track.",
        "Remove the temporary track and confirm the cutting still works without it.",
        "Leave at least one long held shot untouched through an important moment.",
        "Count your cuts before and after, and note whether the number went down.",
        "Play the whole rough cut and mark any cut you notice as a cut.",
        "Fix every cut you noticed by moving it to a moment of change.",
        "Repeat the pass on the vertical assembly, keeping it to one idea.",
        "Confirm neither version has music, colour, captions or effects yet.",
      ],
      standard:
        "Both assemblies refined using cutting craft alone: at least five cuts made on action from wide to close during a gesture with the return to wide timed to each new point; every same-frame audio and video cut identified and at least six converted to L cuts carrying the voice over B-roll and at least three to J cuts with audio arriving early; all filler words and hesitation pauses removed while a beat is kept before and after each important line, with air restored wherever the speaker sounds rushed; uniform shot length demonstrated and then varied so short shots carry energy and long shots carry weight; one sequence cut to a temporary beat and confirmed to still work with the track removed; at least one long held shot left untouched through an important moment; the cut count recorded before and after; every cut noticed as a cut moved to a moment of change; the vertical pass keeping to one idea; and no music, colour, captions or effects added to either version.",
    },
    pitfalls: [
      {
        problem: "Your cuts are noticeable",
        fix: "Move them to a moment of change — a movement, a completed sentence, an answered question. A cut at a moment of stasis is seen; a cut during change is not.",
      },
      {
        problem: "You cut between static frames",
        fix: "Cut on action. A moving object carries the viewer's eye across the join, which is what makes the transition invisible rather than abrupt.",
      },
      {
        problem: "Every cut changes audio and video together",
        fix: "Use J and L cuts. Audio and picture changing on the same frame sounds mechanical, because nothing in real perception works that way.",
      },
      {
        problem: "You cut too tight and the speaker sounds anxious",
        fix: "Keep a beat before and after important lines. Speech needs air, and removing every breath produces a rushed, panicked quality viewers feel but cannot name.",
      },
      {
        problem: "You left all the filler in",
        fix: "Remove the ums, you-knows and repeated words. This is the single largest time saving on talk footage and it costs no content.",
      },
      {
        problem: "Every shot is the same length",
        fix: "Vary length to match content. Uniform shot length reads as monotonous even when every individual cut is technically correct.",
      },
      {
        problem: "You cut every shot to the music beat",
        fix: "Cut to the beat only where it supports the moment. Doing it throughout means the music is deciding what the viewer sees rather than the story.",
      },
      {
        problem: "You keep cutting because cutting is the job",
        fix: "Leave working moments alone. A held shot through a difficult sentence carries more than three angle changes, and restraint reads as confidence.",
      },
    ],
    expertNotes: [
      "Cut at moments of change the viewer is already expecting. That one principle explains most of why an edit feels smooth, and it is why a cut during a gesture disappears while a cut between two static frames is seen.",
      "Use J and L cuts on all dialogue. Letting audio and picture overlap is the cheapest way to make an edit sound professional, because simultaneous audio and video changes are how nothing in real life actually works.",
      "Protect meaningful pauses while cutting filler. Removing every breath makes a speaker sound panicked, and viewers feel that without being able to identify it — so keep a beat before and after the lines that matter.",
      "Cut less than you think you should. A cut is an interruption, a held shot through a difficult moment carries more than three angle changes, and the best edit usually has fewer cuts than the first version did.",
    ],
    vocabulary: [
      {
        term: "Cutting on action",
        meaning:
          "Cutting during movement so the eye follows across the join. Makes the transition invisible.",
      },
      {
        term: "L cut",
        meaning:
          "Picture changes while the previous shot's audio continues. Lets you show a reaction without losing the sentence.",
      },
      {
        term: "J cut",
        meaning:
          "The next shot's audio arrives before its picture. Pulls the viewer forward and creates anticipation.",
      },
      {
        term: "Dead air",
        meaning:
          "Filler words, repeated words and hesitation pauses. Removed without content loss, but not so tightly that speech sounds rushed.",
      },
      {
        term: "Rhythm",
        meaning:
          "The pattern of shot lengths. Felt rather than named, and it must match the content rather than being uniform.",
      },
      {
        term: "Pacing",
        meaning:
          "How fast the video moves overall. Controlled by shot length and by how much is left in.",
      },
      {
        term: "Detaching audio",
        meaning:
          "Unlinking audio from video so their edit points can move separately. What makes J and L cuts possible.",
      },
      {
        term: "Held shot",
        meaning:
          "A long uncut shot left alone. Often carries more than a cut would, and reads as confidence.",
      },
    ],
    homework: [
      {
        task: "Practise five cuts on action",
        detail:
          "Find five gestures in your footage and cut from wide to close during each. Then cut the same five between gestures and compare how visible each cut is.",
      },
      {
        task: "Convert ten hard cuts to J and L cuts",
        detail:
          "Detach the audio and shift it. Listen to the sequence before and after and describe the difference in one sentence.",
      },
      {
        task: "Trim one minute of talk footage two ways",
        detail:
          "Once tightly and once leaving air around important lines. Play both and say which speaker sounds more confident, and why.",
      },
      {
        task: "Cut one sequence to the beat, then remove the music",
        detail:
          "Note whether the cutting still works. If it does not, the music was carrying the edit rather than the structure.",
      },
    ],
    rubric: [
      {
        criterion: "Cutting on action",
        passing: "Cuts between angles.",
        excellent:
          "Cuts placed during gestures so the eye follows across, with returns to wide timed to each new point and no cut noticeable as a cut.",
      },
      {
        criterion: "J and L cuts",
        passing: "Uses some audio overlap.",
        excellent:
          "Every same-frame cut identified and at least six L cuts and three J cuts applied, with the dialogue sounding like continuous conversation rather than joined clips.",
      },
      {
        criterion: "Trimming",
        passing: "Removes obvious filler.",
        excellent:
          "All filler and hesitation pauses removed, a beat kept before and after important lines, air restored where speech sounded rushed, and the result judged on confidence rather than length.",
      },
      {
        criterion: "Rhythm",
        passing: "Shot lengths vary somewhat.",
        excellent:
          "Uniform length demonstrated as monotonous then deliberately varied to match content, with beat cutting used only where it supports the moment and one held shot left untouched.",
      },
      {
        criterion: "Restraint",
        passing: "Completes the rough cut.",
        excellent:
          "Cut count recorded before and after and reduced, every noticed cut moved to a moment of change, and working moments left alone rather than cut because cutting is the job.",
      },
    ],
    faqs: [
      {
        q: "Why do my cuts look jumpy?",
        a: "You are cutting between two static frames. Cut during movement instead — a gesture, a head turn, a step — and the viewer's eye follows the motion across the join, which makes the cut disappear rather than interrupt.",
      },
      {
        q: "What is the difference between a J cut and an L cut?",
        a: "In an L cut the picture changes and the previous audio continues underneath, so you see a reaction while still hearing the line. In a J cut the next shot's audio arrives before its picture. Both overlap sound and image, which is why they sound natural.",
      },
      {
        q: "How much should I cut out of someone talking?",
        a: "All the filler — um, you know, repeated words, long hesitation pauses — but keep a beat before and after the important lines. If you remove every breath the speaker sounds anxious and rushed, and viewers feel that without being able to say why.",
      },
      {
        q: "Should I cut to the beat of the music?",
        a: "Where it supports the moment, yes — it works well for montages and energy. Throughout, no: it makes the video mechanical and means the music is deciding what the viewer sees. Cut to the story first and use the beat as punctuation.",
      },
      {
        q: "How do I know if I have cut too much?",
        a: "Count your cuts and ask whether the number went down, then watch for cuts you notice as cuts. If a moment is working, leave it alone — a held shot through a difficult sentence usually carries more than three angle changes would.",
      },
    ],
  },

  "audio-editing": {
    summary:
      "Viewers forgive mediocre pictures and never forgive bad sound. This session covers dialogue levels that are actually usable, removing generator hum and room noise without making voices robotic, choosing music you are allowed to use, ducking it under speech, sound effects used sparingly, and recording a voiceover that sounds like a studio.",
    objectives: [
      "Set dialogue, music and effects to usable levels",
      "Remove hum, hiss and room noise without wrecking the voice",
      "Choose music by tempo and mood and clear it legally",
      "Duck music under speech so words stay intelligible",
      "Use sound effects as punctuation rather than decoration",
      "Record a clean voiceover with the equipment you have",
    ],
    blocks: [
      {
        heading: "Sound is the half nobody forgives",
        body: [
          "There is an asymmetry in video that surprises every beginner: **audiences tolerate poor pictures and do not tolerate poor sound**. A slightly soft, imperfectly lit video with clear audio is watchable. A beautifully graded video where the voice is distant, hissy or clipping gets closed within seconds, and the viewer cannot explain why.",
          "The reason is that picture is something you look at while sound is something that happens to you. You cannot look away from audio, and distorted or muddy speech forces real effort to decode. **When someone says a video feels amateur, they are usually describing the sound**, even when they say the camera work.",
          "So audio is not the last thing you polish; it is the thing that decides whether the video is usable at all. The good news is that it is also cheap to fix — the difference between unusable and professional audio is a few decisions about levels, a noise pass and one correct export setting, none of which requires equipment you do not have.",
        ],
      },
      {
        heading: "Levels: the numbers that matter",
        body: [
          "Levels are measured in **decibels (dB)** on a scale where **0 dB is the maximum and everything else is negative**. Going above 0 dB is **clipping** — hard digital distortion that cannot be repaired afterwards, so the first rule is that nothing ever touches zero.",
          "The targets that work for this kind of video: **dialogue peaking around -12 to -6 dB**, which is loud and clear with headroom; **music sitting 15 to 20 dB below the dialogue**, so it is felt rather than fought; and **sound effects between the two**. If you only remember one figure, remember that **speech should peak around -12 dB** and never clip.",
          "The related discipline is **consistency**. A video where one speaker is loud and the next is quiet is exhausting, because the viewer keeps adjusting volume. Normalise your dialogue so every speaker sits at the same level, and check the whole timeline rather than the part you were working on — the quiet section is always the one you did not listen to.",
        ],
      },
      {
        heading: "Noise: hum, hiss and the limits of fixing it",
        body: [
          "Our footage has the noise problems that Nigerian indoor recordings almost always have: **a low hum** from the generator or air conditioning, **a hiss** from the room and the camera preamp, and **reverberation** from a hard-walled hall with no soft furnishing. Each needs a different response.",
          "**Hum** is a steady tone at a known frequency and is the easiest to remove — a notch or hum filter at 50 Hz, which is the mains frequency here, takes it out cleanly. **Hiss** is broadband and needs noise reduction, which works by sampling the noise alone and subtracting it: capture a second of **room tone** with nobody speaking and use that as the profile. **Reverberation** cannot be removed after the fact, only reduced slightly, and the real fix is at the recording — a carpeted room, curtains, or a mic closer to the mouth.",
          "Then the limit everyone overruns: **noise reduction destroys a voice when pushed too far**. Over-processed speech sounds thin, watery and robotic, and it is worse to listen to than the hiss was. Reduce until the noise is not distracting and then **stop**, and remember the priority — **a little hiss with a natural voice beats silence with a robot**. Where noise is bad in one section, covering it with B-roll and slightly raised music is often better than processing the voice to death.",
        ],
      },
      {
        heading: "Music: choosing it and being allowed to use it",
        body: [
          "Music is chosen by **tempo and mood**, not by taste. A cut with quick shots wants a track with energy; a reflective moment wants space. The practical test is to play the sequence against two or three tracks and notice which one makes the cutting feel correct — the wrong track makes good cutting feel wrong, which is why music is chosen after the picture is locked rather than before.",
          "The part that costs people money is **licensing**. Music you like on the radio or on a streaming service is almost never cleared for a client's video, and the consequences are real: **Content ID claims** that divert a client's ad revenue to the rights holder, **muted videos** on Instagram and TikTok, and **takedowns** after the client has already paid you. For a church, a business or any paying client this is your responsibility, not theirs.",
          "So use **properly licensed sources**: royalty-free libraries with a clear licence, platform libraries where the platform's terms cover the use, or music the client has licensed and given you in writing. **Read the licence** — some royalty-free tracks forbid commercial use or require attribution. Keep a copy of the licence with the project, because a client asked about their video in two years will come to you, and **I found it online** is not a defence.",
        ],
      },
      {
        heading: "Ducking, effects and recording a voiceover",
        body: [
          "**Ducking** is music dropping in level while someone speaks and rising again afterwards, and it is the single most effective way to make speech clear over a track. Do it with **keyframes** — lower the music by about 10 to 15 dB a beat before the speech starts and bring it back a beat after — or with automatic ducking where your editor has it. The common failure is ducking too late, so the first word of a sentence is buried; **start the drop before the speech, not with it**.",
          "**Sound effects** work as punctuation and fail as decoration. A subtle whoosh on a transition or a soft click on a graphic can make an edit feel finished; a whoosh on every cut makes it feel like a template. The test is to remove them all and ask whether anything is missing — if nothing is, they were decoration. **Silence is also a sound effect**, and a beat of total silence before an important line is more powerful than anything you can add.",
          "For **voiceover**, the equipment matters less than the room. Record in the **quietest space you can find** — a bedroom with curtains and a bed absorbs far more than a tiled living room — with the **mic close**, about a hand's width away, and **off-axis** slightly to avoid breath pops. Hang blankets or record inside a wardrobe if the room is bad. Record **more takes than you need**, leave a few seconds of silence at the start of each for a noise profile, and never record voiceover in the same room as an air conditioner you cannot switch off.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor mixes the audio on the rough cut live — setting dialogue to level, removing the generator hum and room hiss from a captured room-tone profile, showing what over-processing does to a voice, laying and ducking a licensed track, adding two sound effects and then removing them, and recording a voiceover in a treated corner of the room.",
      steps: [
        {
          step: "Play the rough cut with no attention to audio",
          detail:
            "Let the class react. Explain that when a video feels amateur the cause is usually the sound, even when people say the camera work.",
        },
        {
          step: "Look at the waveform and find the clipping",
          detail:
            "Show the peaks hitting zero. Explain that clipping is digital distortion and cannot be repaired afterwards, so nothing may ever touch zero.",
        },
        {
          step: "Set the dialogue to peak around -12 dB",
          detail:
            "Adjust the clip gain. Explain that this is loud and clear while leaving headroom, and it is the one number worth memorising.",
        },
        {
          step: "Compare two speakers at different levels",
          detail:
            "Play them back to back. Explain that inconsistent levels are exhausting because the viewer keeps adjusting the volume.",
        },
        {
          step: "Normalise both to the same level",
          detail:
            "Check the whole timeline rather than the section being worked on. Explain that the quiet part is always the one nobody listened to.",
        },
        {
          step: "Identify the generator hum",
          detail:
            "Isolate it by listening. Explain that hum is a steady tone at mains frequency, which here is 50 Hz, and it filters out cleanly.",
        },
        {
          step: "Apply a hum filter at 50 Hz",
          detail:
            "A and B it. Explain that this is the cheapest single improvement available on indoor Nigerian recordings.",
        },
        {
          step: "Capture a room-tone profile",
          detail:
            "Find a second where nobody speaks. Explain that noise reduction works by sampling the noise alone and subtracting it.",
        },
        {
          step: "Apply noise reduction lightly",
          detail:
            "Reduce until the hiss stops being distracting, then stop. Explain that the goal is not silence but an undistracted voice.",
        },
        {
          step: "Push the noise reduction far too hard",
          detail:
            "Play the result. Explain that over-processed speech sounds thin and robotic and is worse to listen to than the hiss was.",
        },
        {
          step: "Reduce it back and A against the original",
          detail:
            "Explain that a little hiss with a natural voice beats silence with a robot, every time.",
        },
        {
          step: "Lay a licensed music track",
          detail:
            "Show the licence and keep it with the project. Explain that an uncleared track can divert a client's revenue or get their video muted after they have paid you.",
        },
        {
          step: "Set the music 15 to 20 dB below dialogue",
          detail:
            "Explain that music should be felt rather than fought, and that this gap is what keeps speech intelligible.",
        },
        {
          step: "Duck the music a beat before the speech",
          detail:
            "Keyframe a 10 to 15 dB drop. Explain that ducking too late buries the first word, which is the most important one.",
        },
        {
          step: "Add whooshes to every transition",
          detail:
            "Play it. Explain that a sound on every cut makes an edit feel like a template rather than a decision.",
        },
        {
          step: "Remove all but two",
          detail:
            "Explain the test: remove them all and ask whether anything is missing. If nothing is, they were decoration.",
        },
        {
          step: "Insert a beat of total silence before a key line",
          detail:
            "Explain that silence is a sound effect and is more powerful than anything you can add.",
        },
        {
          step: "Record a voiceover in a treated corner",
          detail:
            "Mic close, slightly off-axis, blankets up. Explain that the room matters more than the microphone.",
        },
        {
          step: "Leave silence at the head of each take",
          detail:
            "Explain that this gives you a noise profile and makes the take usable in the same workflow.",
        },
        {
          step: "Listen to the full mix on phone speakers",
          detail:
            "Explain that most viewers hear it on a phone, and a mix that only works on headphones is not finished.",
        },
      ],
    },
    practice: {
      title: "Mix both cuts to a usable level",
      brief:
        "You mix the audio on both versions of the project — dialogue set and consistent, hum and hiss reduced without damaging the voice, licensed music laid and ducked under speech, effects used only where they earn their place — and verify the result on phone speakers as well as headphones.",
      steps: [
        "Play the rough cut and note every audio problem before fixing any of them.",
        "Find every point where the audio clips at 0 dB and reduce it.",
        "Set all dialogue to peak around -12 dB.",
        "Compare every speaker and normalise them to the same level.",
        "Check the entire timeline for quiet sections, not just the part you worked on.",
        "Locate a stretch of room tone where nobody is speaking.",
        "Use it as the noise profile for reduction.",
        "Apply hum reduction at 50 Hz and A it against the original.",
        "Apply noise reduction lightly, then deliberately over-apply it and listen.",
        "Reduce it back to the point where the voice still sounds natural.",
        "Choose a music track by tempo and mood after the picture is locked.",
        "Confirm the licence covers commercial use and save it with the project.",
        "Set the music 15 to 20 dB below the dialogue.",
        "Keyframe the duck to start a beat before each speech, not with it.",
        "Add sound effects, then remove all of them and note whether anything is missing.",
        "Keep only the effects that were missed.",
        "Insert one beat of total silence before your most important line.",
        "Record a voiceover in the quietest room available, mic close and slightly off-axis.",
        "Leave a few seconds of silence at the head of each take for a noise profile.",
        "Listen to the finished mix on phone speakers, then on headphones.",
        "Fix anything that only sounded right on one of them.",
      ],
      standard:
        "Both cuts mixed to a usable standard: every audio problem listed before any was fixed, all clipping at 0 dB found and reduced, dialogue set to peak around -12 dB with every speaker normalised to the same level and the whole timeline checked for quiet sections; room tone captured and used as a noise profile, hum reduced at 50 Hz and A-tested, noise reduction applied lightly then deliberately over-applied and pulled back to the point where the voice still sounds natural; music chosen by tempo and mood after picture lock with a licence confirmed for commercial use and saved with the project, set 15 to 20 dB below dialogue and ducked by keyframes starting a beat before each speech rather than with it; sound effects added then all removed with only the missed ones kept, and one beat of total silence inserted before the most important line; a voiceover recorded in the quietest available room with the mic close and slightly off-axis and silence left at the head of each take; and the finished mix verified on phone speakers as well as headphones with anything that only worked on one of them fixed.",
    },
    pitfalls: [
      {
        problem: "You polish picture and leave audio to last",
        fix: "Treat audio as the usability test. Viewers forgive soft or imperfectly lit pictures and close a video with bad sound within seconds, usually blaming the camera work.",
      },
      {
        problem: "Your audio clips at 0 dB",
        fix: "Keep dialogue peaking around -12 dB with headroom. Clipping is hard digital distortion that cannot be repaired after export, so nothing may ever touch zero.",
      },
      {
        problem: "One speaker is loud and the next is quiet",
        fix: "Normalise every speaker to the same level and check the whole timeline. Inconsistent levels are exhausting because the viewer keeps adjusting the volume.",
      },
      {
        problem: "You push noise reduction until the voice is robotic",
        fix: "Reduce until the noise stops distracting, then stop. A little hiss with a natural voice beats silence with a robot, and over-processing is worse than the problem.",
      },
      {
        problem: "You try to remove reverberation in the mix",
        fix: "Accept that it cannot be removed, only slightly reduced. The fix is at the recording: a softer room, and the microphone closer to the mouth.",
      },
      {
        problem: "You used a track you liked without checking the licence",
        fix: "Use properly licensed music and keep the licence with the project. An uncleared track can trigger a Content ID claim, mute a client's video, or take it down after they have paid you.",
      },
      {
        problem: "Your duck starts with the speech",
        fix: "Start it a beat earlier. Ducking too late buries the first word of the sentence, which is the word that carries the meaning.",
      },
      {
        problem: "You only ever listen on headphones",
        fix: "Check the mix on phone speakers. Most viewers hear your video on a phone, and a mix that only works on headphones is not finished.",
      },
    ],
    expertNotes: [
      "Fix audio before you polish picture. Audiences tolerate imperfect images and abandon videos with bad sound, and when they say a video feels amateur they are usually describing the audio even while naming the camera work.",
      "Keep dialogue around -12 dB and never let anything touch zero. Clipping is unrecoverable distortion, and the one number worth memorising in this whole session is where speech should peak.",
      "Reduce noise until it stops distracting, then stop. Over-processed speech sounds thin and robotic and is worse to listen to than the hiss you were trying to remove — a natural voice with some noise always wins.",
      "Check every music licence and keep it with the project. Uncleared music can divert a client's ad revenue, mute their video or get it taken down after they have paid you, and I found it online is not a defence two years later.",
    ],
    vocabulary: [
      {
        term: "Clipping",
        meaning:
          "Audio exceeding 0 dB. Hard digital distortion that cannot be repaired after export.",
      },
      {
        term: "Headroom",
        meaning:
          "The gap between your peak and 0 dB. Why dialogue sits around -12 rather than near zero.",
      },
      {
        term: "Room tone",
        meaning:
          "A stretch of the noise alone with nobody speaking. Used as the profile for noise reduction.",
      },
      {
        term: "Hum",
        meaning:
          "A steady tone at mains frequency, 50 Hz here. From generators and air conditioning; filters out cleanly.",
      },
      {
        term: "Noise reduction",
        meaning:
          "Sampling the noise and subtracting it. Effective lightly, and it turns a voice robotic when pushed.",
      },
      {
        term: "Ducking",
        meaning:
          "Music dropping under speech and rising after. Keyframed to start a beat before the speech, not with it.",
      },
      {
        term: "Content ID",
        meaning:
          "Automatic copyright detection. An uncleared track can claim a client's revenue or mute their video.",
      },
      {
        term: "Off-axis",
        meaning:
          "Angling the mic slightly away from the mouth. Reduces breath pops without losing presence.",
      },
    ],
    homework: [
      {
        task: "Set one clip to correct levels",
        detail:
          "Find the peaks, reduce any clipping, and set dialogue to about -12 dB. Then normalise a second speaker to match and listen to the pair back to back.",
      },
      {
        task: "Remove hum and hiss from one recording",
        detail:
          "Capture a room-tone profile, apply hum reduction at 50 Hz, then noise reduction lightly. Over-apply it deliberately, listen, and pull it back.",
      },
      {
        task: "Duck a music track under one minute of speech",
        detail:
          "Keyframe the drop to begin a beat before the speech starts. Compare with the duck starting exactly on the first word and note what gets buried.",
      },
      {
        task: "Record a voiceover in a treated room",
        detail:
          "Blankets or a wardrobe, mic a hand's width away and slightly off-axis, silence left at the head of the take. Compare it with a take recorded in an open room.",
      },
    ],
    rubric: [
      {
        criterion: "Levels",
        passing: "Audio is audible.",
        excellent:
          "No clipping anywhere, dialogue peaking around -12 dB, every speaker normalised to the same level, and the whole timeline checked rather than only the section worked on.",
      },
      {
        criterion: "Noise",
        passing: "Reduces background noise.",
        excellent:
          "Room tone captured for the profile, hum reduced at 50 Hz and A-tested, noise reduction applied lightly and deliberately over-applied once to hear the damage, then pulled back to a natural voice.",
      },
      {
        criterion: "Music",
        passing: "Adds a track.",
        excellent:
          "Chosen by tempo and mood after picture lock, licence confirmed for commercial use and filed with the project, and set 15 to 20 dB below dialogue.",
      },
      {
        criterion: "Ducking and effects",
        passing: "Music sits under speech.",
        excellent:
          "Duck keyframed to start a beat before each speech, effects removed entirely and only the missed ones restored, and a beat of silence used before the key line.",
      },
      {
        criterion: "Verification",
        passing: "Listens back before export.",
        excellent:
          "Voiceover recorded close and off-axis in a treated room with silence at the head of each take, and the full mix checked on phone speakers as well as headphones with discrepancies fixed.",
      },
    ],
    faqs: [
      {
        q: "What level should my dialogue be at?",
        a: "Peaking around -12 dB, with nothing ever touching 0 dB. Zero is the digital maximum and going past it is clipping — hard distortion you cannot repair after export. Music should sit 15 to 20 dB below the dialogue.",
      },
      {
        q: "How do I remove the hum from my recordings?",
        a: "It is almost certainly mains hum at 50 Hz from a generator or air conditioning, and a hum or notch filter at that frequency removes it cleanly. It is the cheapest single improvement available on indoor recordings made here.",
      },
      {
        q: "My noise reduction made the voice sound strange. What happened?",
        a: "You pushed it too far. Noise reduction subtracts a sampled noise profile, and when applied heavily it takes parts of the voice with it, producing a thin, watery, robotic sound. Reduce until the noise is not distracting, then stop — a little hiss with a natural voice is always better.",
      },
      {
        q: "Can I use a song I like for a client's video?",
        a: "Almost certainly not without a licence. Music from radio or streaming services is not cleared for commercial video, and the result can be a Content ID claim diverting your client's revenue, a muted video, or a takedown after they have paid you. Use properly licensed libraries and keep the licence with the project.",
      },
      {
        q: "How do I record a good voiceover without a studio?",
        a: "The room matters more than the microphone. Use the quietest space available — a bedroom with curtains, or inside a wardrobe with blankets — keep the mic about a hand's width away and slightly off-axis to avoid breath pops, and leave a few seconds of silence at the head of each take for a noise profile.",
      },
    ],
  },
};
