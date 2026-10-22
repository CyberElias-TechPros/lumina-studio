import type { SessionLecture } from "../types";

/**
 * Mobile App Development — ₦30,000 · 4 weeks · 8 sessions.
 * Sessions 1 to 3. (4–6 in mobile-app-development-b.ts, 7–8 in -c.ts.)
 *
 * Prerequisite is Web Development, so this is a JavaScript-based framework
 * course: Expo / React Native, developing and testing on Android and in
 * browser-based simulators. Per the course FAQ, Apple requires macOS for final
 * App Store builds and we say so rather than pretending otherwise.
 *
 * THE RUNNING APP (scoped in session 1, built through session 8):
 *   A personal expense tracker in naira — add an expense, see the list, see a
 *   monthly total by category. Four screens. Real data the student keeps using
 *   after the course. It exercises forms, lists, state, local storage, API
 *   sync, offline queueing and long-list performance on low-end devices.
 */
export const mobileAppLessonsA: Record<string, SessionLecture> = {
  "app-concepts-scoping": {
    summary:
      "Most app projects fail before any code is written, because the idea was too big and nobody cut it down. This session covers what actually makes an app different from a website, how to choose a first project you will finish, scoping a version one that is genuinely small, and the platform conventions that decide whether an app feels right.",
    objectives: [
      "Explain what an app offers that a website does not",
      "Choose a first project that is small enough to finish",
      "Cut an idea down to a realistic version one",
      "Distinguish must-have features from nice-to-have ones",
      "Describe the main conventions that differ between iOS and Android",
      "State honestly what is and is not possible without a Mac",
    ],
    blocks: [
      {
        heading: "Why an app, and why not",
        body: [
          "You already build for the web, so the first useful question is not **how do I build an app** but **does this need to be one**. An app differs from a website in four specific ways: it is **installed**, so it opens instantly and sits on a home screen; it can **work offline**, holding its own data; it has **direct access to the device** — camera, location, notifications, contacts; and it can run in the **background**, doing things while the user is elsewhere.",
          "If your idea needs none of those, a website is the better answer. It is cheaper to build, needs no app store approval, updates instantly for everyone, and works on any device with a browser. **A great many app ideas are website ideas wearing a costume**, and recognising that early saves months.",
          "Where an app genuinely wins is **frequency and presence**. Something used several times a day — an expense tracker, a habit log, a delivery app — benefits from being installed, opening fast and working on a bad connection. That is the category our course project sits in, and it is the category worth learning to build for.",
        ],
      },
      {
        heading: "Choosing a first project you will finish",
        body: [
          "The commonest reason a first app is never finished is that it was the wrong project. Three tests decide it. **Would you use it yourself?** A project you would actually open is a project you will keep fixing, and you become your own tester with real opinions. **Is the data real?** An app with invented sample data teaches you nothing about edge cases; an app tracking your own spending immediately shows you what happens with a zero, a huge number, a missing category.",
          "The third test is the important one: **can it be finished in four weeks by one person?** Almost every first idea fails this, and the fix is not more time but a smaller app. Our course project is deliberately modest — record an expense, list the expenses, show a monthly total by category. Four screens. It is small enough to complete and complete properly, and it still touches every concept in the course.",
          "The trap to avoid is the **idea that impresses**. A marketplace, a ride app, a social network — these are enormous systems with two-sided problems, payments, moderation and trust, and they are the wrong first project however exciting. Build something small, finish it, ship it, and you will have learned more than a year of planning something large.",
        ],
      },
      {
        heading: "Scoping version one",
        body: [
          "**Scoping** means deciding what version one is, and the discipline is that version one is **the smallest thing that still works as a product**. Not the smallest thing you can build — the smallest thing a user could open and get value from. For the expense tracker that means adding and listing expenses; it does not mean charts, budgets, receipts or multiple currencies, however obvious those feel.",
          "The method is to write **every feature you can think of**, then split each into **must-have** — without it the app does not work — and **nice-to-have** — with it the app is better. Version one is the must-haves only. The nice-to-haves go in a list for later, which matters psychologically: you are not abandoning them, you are ordering them.",
          "Then the test that catches most over-scoping: **can you describe version one in one sentence?** **Record expenses and see a monthly total by category.** If your version one needs three sentences, it is three versions. And the corollary worth internalising — **a finished small app is worth more than an unfinished ambitious one**, in your portfolio, in your learning, and in your confidence.",
        ],
      },
      {
        heading: "Platform conventions",
        body: [
          "An app that works but feels wrong is usually ignoring **platform conventions** — the expectations users have absorbed from every other app on their phone. The largest differences sit between iOS and Android. **Android has a system back button** (hardware or gesture) that must behave sensibly; iOS does not, so back is always an on-screen control. **Navigation placement differs**: Android apps often put navigation in a drawer or at the top, iOS apps in a bottom tab bar.",
          "Smaller conventions add up: **swipe to go back** is standard on iOS, **long-press menus** behave differently, **date and number formats** vary by region, and **status bar** colour and content are handled differently. None of these break an app, and all of them make one feel slightly foreign.",
          "The practical approach for a first app is to **follow the framework's defaults**, which are already platform-aware, rather than inventing your own navigation. A standard tab bar with three or four items feels correct on both platforms; a custom gesture-based navigation you designed feels like yours, and not in a good way. Custom interaction is earned after the basics work.",
        ],
      },
      {
        heading: "What is possible without a Mac",
        body: [
          "This is worth being precise about, because vague promises here waste people's money. **You do not need a Mac to learn mobile development or to build a working app.** The toolchain we use runs on Windows and Linux, you can develop and test on an **Android device** or in a **browser-based simulator**, and you can even distribute an Android app without ever touching macOS.",
          "**Apple's App Store is the exception, and it is a hard one: final iOS builds require macOS.** There is no legitimate way around it, and any course or tool claiming otherwise is describing a workaround that will fail at the point you need it. So if your goal is publishing to the App Store, you will eventually need a Mac — or a client who has one, or a cloud build service, which is a real option but not a free one.",
          "The honest framing is that **the skills are the same and the last mile differs**. Everything in this course — screens, navigation, state, data, testing — applies to both platforms, and an app built here can be shipped to iOS later by someone with the right machine. We say this plainly rather than letting you discover it in week six.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor takes three real app ideas from the class — including one that is far too big — and scopes each one live on the board: separating must-have from nice-to-have, cutting to version one, testing whether it needs to be an app at all, and stating what each would require to ship.",
      steps: [
        {
          step: "Write three app ideas from the class on the board",
          detail:
            "Include one ambitious marketplace idea. Explain that the ambitious one is the most common first project and the least likely to be finished.",
        },
        {
          step: "Ask of each whether it needs to be an app",
          detail:
            "Test for installation, offline use, device access and background work. Explain that a great many app ideas are website ideas wearing a costume.",
        },
        {
          step: "Reject one idea as a website",
          detail:
            "Explain that a website is cheaper, needs no store approval, updates instantly and works on any device, so it is the better answer when an app's advantages are not needed.",
        },
        {
          step: "List every feature of the marketplace idea",
          detail:
            "Write them all down. Explain that scoping starts from a complete list, because you cannot cut what you have not written.",
        },
        {
          step: "Split into must-have and nice-to-have",
          detail:
            "Ask whether the app works without each one. Explain that must-have means the product does not function without it.",
        },
        {
          step: "Show the marketplace's must-have list is still enormous",
          detail:
            "Two-sided matching, payments, moderation, trust. Explain that this is why it is the wrong first project however exciting it is.",
        },
        {
          step: "Introduce the expense tracker as the course project",
          detail:
            "Record an expense, list them, show a monthly total by category. Explain that four screens is small enough to finish properly and still touches every concept.",
        },
        {
          step: "Test it against the three project tests",
          detail:
            "Would you use it, is the data real, can one person finish it in four weeks. Explain that passing all three is what makes a first project survivable.",
        },
        {
          step: "Write version one in one sentence",
          detail: "Explain the test: if version one needs three sentences, it is three versions.",
        },
        {
          step: "List the deferred features explicitly",
          detail:
            "Charts, budgets, receipts, multiple currencies. Explain that writing them down matters psychologically, because you are ordering them rather than abandoning them.",
        },
        {
          step: "Draw the screen flow on the board",
          detail:
            "Four screens and the arrows between them. Explain that a flow you can draw in thirty seconds is a scope you can build in four weeks.",
        },
        {
          step: "Walk through Android navigation conventions",
          detail:
            "Show the system back button and where navigation typically sits. Explain that a first app should follow framework defaults rather than invent interaction.",
        },
        {
          step: "Walk through the iOS differences",
          detail:
            "No system back, bottom tab bar, swipe to go back. Explain that none of these break an app and all of them make one feel foreign if ignored.",
        },
        {
          step: "State the Mac position plainly",
          detail:
            "Android and browser simulators need no Mac; final App Store builds require macOS. Explain that the skills are identical and only the last mile differs.",
        },
        {
          step: "Write each student's version one sentence",
          detail:
            "One sentence each. Explain that leaving with a scoped sentence is the actual deliverable of this session.",
        },
      ],
    },
    practice: {
      title: "Scope an app you will actually finish",
      brief:
        "You choose a first project against three tests, write down every feature you want, cut it to a version one you can describe in one sentence, draw the screen flow, and state honestly what it would take to ship on each platform.",
      steps: [
        "Write down three app ideas you have.",
        "Test each against installation, offline use, device access and background work.",
        "Decide which genuinely needs to be an app rather than a website, and say why.",
        "Test your chosen idea against the three project tests: would you use it, is the data real, can one person finish it in four weeks.",
        "Write down every feature you can imagine for it.",
        "Mark each feature must-have or nice-to-have by asking whether the app works without it.",
        "Check that your must-have list is small enough to build in four weeks.",
        "Write version one as a single sentence.",
        "If it needs more than one sentence, cut it again and rewrite.",
        "List every deferred feature explicitly so nothing feels abandoned.",
        "Draw the screen flow on paper: every screen and every arrow between them.",
        "Count your screens and confirm it is four or fewer for version one.",
        "Name the platform conventions your app must respect, including back behaviour.",
        "State what you would need to ship it on Android.",
        "State what you would need to ship it on iOS, including the macOS requirement.",
        "Write one paragraph on what you would build in version two.",
      ],
      standard:
        "A scoped first project with three ideas written down and each tested against installation, offline use, device access and background work; a chosen idea justified as needing to be an app rather than a website; the chosen idea confirmed against all three project tests; every imagined feature listed and marked must-have or nice-to-have by whether the app works without it; a must-have list small enough for four weeks; version one written as a single sentence and re-cut if it needed more; every deferred feature listed explicitly; the screen flow drawn on paper with every screen and arrow and confirmed at four screens or fewer; the platform conventions the app must respect named including back behaviour; the requirements to ship on Android and on iOS stated separately with the macOS requirement for App Store builds made explicit; and one paragraph describing version two.",
    },
    pitfalls: [
      {
        problem: "You build an app that should be a website",
        fix: "Test for installation, offline use, device access and background work. If it needs none of them, a website is cheaper, needs no store approval, updates instantly and works on any device.",
      },
      {
        problem: "Your first project is a marketplace or social network",
        fix: "Pick something one person can finish. Two-sided systems with payments, moderation and trust are the wrong first project however exciting, and they are why most first apps are never finished.",
      },
      {
        problem: "Your version one needs three sentences to describe",
        fix: "Cut it until one sentence suffices. Version one is the smallest thing that still works as a product, not the smallest thing you can build.",
      },
      {
        problem: "You treat nice-to-have features as essential",
        fix: "Ask whether the app works without each one. If it does, the feature belongs in version two, and writing that down stops it feeling like an abandonment.",
      },
      {
        problem: "You use invented sample data",
        fix: "Use real data. Invented data teaches you nothing about edge cases, while your own spending immediately produces zeros, huge numbers and missing categories.",
      },
      {
        problem: "You design your own navigation from scratch",
        fix: "Follow the framework defaults, which are already platform-aware. A standard tab bar feels correct on both platforms; custom interaction is earned after the basics work.",
      },
      {
        problem: "You ignore the Android back button",
        fix: "Respect it. Android users expect it to behave sensibly, and an app that traps them or exits unexpectedly feels broken however well it is built.",
      },
      {
        problem: "You assume you can ship to iOS without a Mac",
        fix: "Plan for the reality. Final App Store builds require macOS, so if iOS publishing is the goal you will need a Mac, a client who has one, or a paid cloud build service.",
      },
    ],
    expertNotes: [
      "Test whether your idea needs to be an app before you build one. Installation, offline use, device access and background work are the four real advantages, and a great many app ideas need none of them and would be better, cheaper websites.",
      "Choose a first project you would use yourself, with real data. You become your own tester with real opinions, and real data immediately produces the edge cases invented samples never will.",
      "Cut version one until it fits in one sentence. If it needs three sentences it is three versions, and a finished small app is worth more in your portfolio and your learning than an unfinished ambitious one.",
      "Be honest about the macOS requirement early. Android and browser-based simulators need no Mac and teach every skill in this course, but final App Store builds require macOS and no workaround changes that.",
    ],
    vocabulary: [
      {
        term: "Native advantage",
        meaning:
          "What an app offers a website: installation, offline use, device access, background work. If you need none, build a website.",
      },
      {
        term: "Scoping",
        meaning:
          "Deciding what version one is — the smallest thing that still works as a product, not the smallest thing you can build.",
      },
      {
        term: "Version one",
        meaning:
          "Must-haves only. Describable in one sentence; if it needs three, it is three versions.",
      },
      {
        term: "Must-have",
        meaning:
          "A feature without which the app does not function. Everything else is version two.",
      },
      {
        term: "Screen flow",
        meaning:
          "Every screen and every arrow between them. A flow drawable in thirty seconds is a scope buildable in four weeks.",
      },
      {
        term: "Platform convention",
        meaning:
          "User expectations absorbed from every other app: back behaviour, navigation placement, gestures.",
      },
      {
        term: "System back button",
        meaning: "Android's hardware or gesture back. Must behave sensibly; iOS has no equivalent.",
      },
      {
        term: "macOS requirement",
        meaning:
          "Apple requires macOS for final App Store builds. No legitimate workaround exists.",
      },
    ],
    homework: [
      {
        task: "Write your version one in one sentence",
        detail:
          "Then cut it again and see whether the sentence gets shorter without the app ceasing to work. Keep the shorter one.",
      },
      {
        task: "Split one feature list into must and nice",
        detail:
          "Take any app idea and mark every feature. Count how many are genuinely must-have — it is usually fewer than a third of the list.",
      },
      {
        task: "Draw the screen flow of an app you use daily",
        detail:
          "Every screen and arrow. Count them. This calibrates what a realistic app scope actually looks like.",
      },
      {
        task: "Check one idea against the app tests",
        detail:
          "Installation, offline, device access, background. If it needs none, write down what you would build as a website instead and why that is better.",
      },
    ],
    rubric: [
      {
        criterion: "Choosing the platform",
        passing: "Has an app idea.",
        excellent:
          "The idea tested against installation, offline use, device access and background work, with a clear justification for building an app rather than a website.",
      },
      {
        criterion: "Project choice",
        passing: "Picks a project.",
        excellent:
          "Confirmed against all three tests — personally useful, real data, finishable by one person in four weeks — and explicitly not a two-sided marketplace or social system.",
      },
      {
        criterion: "Scoping",
        passing: "Lists features.",
        excellent:
          "Every feature listed and marked must-have or nice-to-have, version one written in one sentence and re-cut until it fit, and deferred features recorded rather than dropped.",
      },
      {
        criterion: "Flow and size",
        passing: "Knows the screens.",
        excellent:
          "A drawn screen flow with every arrow, four screens or fewer for version one, and the flow drawable from memory in about thirty seconds.",
      },
      {
        criterion: "Platform realism",
        passing: "Knows iOS and Android differ.",
        excellent:
          "Conventions named including back behaviour, Android and iOS shipping requirements stated separately, and the macOS requirement for App Store builds stated without evasion.",
      },
    ],
    faqs: [
      {
        q: "Do I need coding experience for this course?",
        a: "Yes — it assumes you can already write HTML, CSS and JavaScript, which means Web Development or equivalent. Mobile frameworks are much easier to learn as a second step than as a first one, and everything you know about components, state and layout carries across.",
      },
      {
        q: "Do I need a Mac to build iOS apps?",
        a: "For publishing to the Apple App Store, yes — Apple requires macOS for final builds. During the course you develop and test on Android and in browser-based simulators without a Mac, and every skill transfers. We are explicit about this rather than pretending it away.",
      },
      {
        q: "Should my first app be my business idea?",
        a: "Usually not. Marketplaces, ride apps and social networks involve two-sided matching, payments, moderation and trust, and they are why most first apps are never finished. Build something small with real data, finish it, then apply what you learned to the business idea.",
      },
      {
        q: "How small should version one be?",
        a: "Small enough to describe in one sentence and finish in four weeks alone. Ours records expenses and shows a monthly total by category — four screens. If your version one needs three sentences, it is three versions and you should cut it again.",
      },
      {
        q: "Is an app always better than a website?",
        a: "No. An app wins on installation, offline use, device access and background work. If your idea needs none of those, a website is cheaper to build, needs no store approval, updates instantly for everyone and works on any device with a browser.",
      },
    ],
  },

  "mobile-ui-design": {
    summary:
      "A phone is not a small desktop: it is used one-handed, outdoors, in fragments of time, by a thumb. This session covers designing for the thumb, touch targets that are actually hittable, screens with one job each, the three navigation patterns and when to use each, and prototyping cheaply before writing any code.",
    objectives: [
      "Design for one-handed thumb use rather than a mouse",
      "Size and place touch targets so they can be hit reliably",
      "Give every screen exactly one job",
      "Choose between tab, stack and modal navigation correctly",
      "Handle the states a mobile screen must have",
      "Prototype on paper and in a design tool before building",
    ],
    blocks: [
      {
        heading: "Designing for a thumb, not a mouse",
        body: [
          "Everything about mobile interface design follows from how a phone is physically held. Most use is **one-handed**, with a **thumb** doing the work, while the other hand holds a bag or a rail. That thumb has a limited reach, and it reaches the **bottom of the screen easily and the top corners badly** — the opposite of a desktop, where the top is where everything important lives.",
          "The consequence is the **thumb zone**: primary actions belong in the lower half, within easy reach, and the top of the screen is for content and titles rather than controls. This is why almost every well-designed app puts its main button at the bottom and its navigation in a bottom bar, and why copying a desktop layout onto a phone produces something technically correct and physically awkward.",
          "Then the context of use. A phone is used **outdoors in bright sun**, in **fragments of thirty seconds**, often **while moving**, and frequently on a **poor connection**. So text must be larger than feels right in a design tool, contrast must survive daylight, every screen must make sense in a few seconds, and the interface must cope with slow data rather than assuming it arrives instantly.",
        ],
      },
      {
        heading: "Touch targets, and why hover does not exist",
        body: [
          "A finger is far less precise than a mouse pointer, so **touch targets must be at least about 44 by 44 points on iOS and 48 by 48 density-independent pixels on Android**. Smaller than that and users mis-tap, hit the wrong control, and blame the app. This is the single most common measurable usability failure in amateur mobile design, and it is invisible on a desktop monitor.",
          "Spacing matters as much as size. **Adjacent targets need clear gaps** between them, because a finger that lands between two buttons produces whichever the system guesses. Destructive actions — delete, cancel — need more space still, and ideally a confirmation, because there is no undo on a phone and no cursor to see where it is about to land.",
          "Then the thing web designers must unlearn: **there is no hover**. Nothing can reveal on mouseover, so anything a user needs must be visible or reachable by a tap. Underline-on-hover affordances, tooltips and reveal-on-hover menus all have to be redesigned as always-visible labels, visible icons, or a tap that opens something. Anything that depends on hover is simply unavailable.",
        ],
      },
      {
        heading: "One screen, one job",
        body: [
          "A phone screen holds very little, which forces a discipline desktop design does not: **each screen does exactly one thing**. Our expense tracker has four screens and each has a single job — add an expense, see the list, see the monthly summary, adjust settings. Trying to do two of those on one screen produces a cramped interface where neither task is easy.",
          "The test is whether you can **name the screen's job in a few words**. **Add expense. Expense list. Monthly summary.** If naming it requires the word **and**, it is two screens. This is not a stylistic preference; it is what makes a small screen usable, and it is why mobile apps have more screens than the equivalent website.",
          "Then **prioritisation within a screen**. With limited room, decide what the user most needs first and put it highest, and accept that some things will not appear at all. The instinct to include everything because there is data for it is exactly wrong on mobile — **what you leave out is a design decision**, and the most useful mobile interfaces are the ones that removed the most.",
        ],
      },
      {
        heading: "The three navigation patterns",
        body: [
          "Mobile navigation reduces to three patterns, and choosing correctly is most of the structure. A **tab bar** switches between three to five top-level areas of equal importance, is always visible, and is the right choice for our tracker — expenses, summary, settings. More than five tabs is too many and the labels stop fitting.",
          "A **stack** drills down and comes back: list, then detail, then back. It is how you go from a month to a single expense, and on iOS the swipe-back gesture and on Android the system back button both expect it to behave predictably. A **modal** covers everything for one temporary task — adding an expense — and is dismissed on completion rather than navigated away from.",
          "The commonest structural error is using the wrong one: a stack where tabs belong forces the user back through screens to change area, while tabs where a stack belongs produces a bar of screens that are all really the same thing. **Ask whether the destinations are siblings or a hierarchy.** Siblings get tabs; a hierarchy gets a stack; a short interrupting task gets a modal.",
        ],
      },
      {
        heading: "States, and prototyping before building",
        body: [
          "Every screen that shows data has **four states**, and designing only the happy one is why so many apps feel broken. **Loading** — what appears while data arrives, which on a poor connection is most of the time. **Empty** — what a brand-new user sees, which should explain what to do rather than showing a blank area. **Error** — what happens when the request fails, which on mobile networks is often. And **populated**, the one everyone designs.",
          "The empty state deserves particular attention because it is **the first thing every new user sees**, and a blank list with no explanation is where people abandon an app. A good empty state says what the screen will contain and offers the action that fills it — **No expenses yet. Add your first.** That single sentence converts a dead end into an invitation.",
          "Then **prototype before you build**, because changes are cheap on paper and expensive in code. Start with **paper sketches** — four boxes, thirty seconds each, and you will find flow problems immediately. Move to a **design tool** for anything a client will see. Then build. The rule is that **every hour spent on paper saves several in code**, and the most common regret in mobile projects is building a flow nobody had drawn.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor designs the four screens of the expense tracker live — sketching on paper first, then in a design tool — testing thumb reach on a real phone, measuring touch targets, choosing a tab bar over a stack and justifying it, designing all four data states, and finding a flow problem on paper that would have cost hours in code.",
      steps: [
        {
          step: "Ask what the user does most often",
          detail:
            "Add an expense, several times a day. Explain that frequency decides what belongs closest to the thumb.",
        },
        {
          step: "Sketch the thumb zone on a phone outline",
          detail:
            "Mark easy, strained and hard-to-reach areas. Explain that the bottom is easy and the top corners are hard, which is the reverse of a desktop.",
        },
        {
          step: "Place the primary action in the thumb zone",
          detail:
            "Add-expense button at the bottom. Explain that this follows from one-handed use and cannot be derived from a desktop layout.",
        },
        {
          step: "Sketch four screens on paper",
          detail:
            "One box each, thirty seconds. Explain that paper is where flow problems are cheap to find.",
        },
        {
          step: "Draw the arrows between them",
          detail:
            "Find a screen that requires going back twice to reach. Explain that this is the kind of problem that costs hours once built.",
        },
        {
          step: "Fix the flow on paper",
          detail:
            "Rearrange. Explain that an hour on paper saves several in code, and the commonest regret is building a flow nobody drew.",
        },
        {
          step: "Name each screen's job in a few words",
          detail:
            "Add expense, expense list, monthly summary, settings. Explain that needing the word and means it is two screens.",
        },
        {
          step: "Choose the navigation pattern",
          detail:
            "Tab bar for three siblings. Explain the test: siblings get tabs, a hierarchy gets a stack, a short interrupting task gets a modal.",
        },
        {
          step: "Show the wrong choice",
          detail:
            "Use a stack instead and navigate it. Explain that it forces the user back through screens just to change area.",
        },
        {
          step: "Make the add-expense screen a modal",
          detail:
            "Explain that a short interrupting task should cover the screen and be dismissed on completion rather than navigated away from.",
        },
        {
          step: "Measure a touch target",
          detail:
            "Show one at 32 points and one at 48. Explain the minimum of about 44 on iOS and 48 on Android, and that this failure is invisible on a desktop monitor.",
        },
        {
          step: "Test both by thumb on a real phone",
          detail:
            "Mis-tap the small one. Explain that users blame the app, and that spacing between adjacent targets matters as much as size.",
        },
        {
          step: "Add spacing around a destructive action",
          detail:
            "Move delete away from other controls and add a confirmation. Explain there is no undo on a phone and no cursor to show where a tap will land.",
        },
        {
          step: "Remove a hover-revealed control",
          detail:
            "Explain that hover does not exist on a phone, so anything needed must be visible or reachable by a tap.",
        },
        {
          step: "Design the loading state",
          detail:
            "Skeleton rather than a spinner. Explain that on a poor connection this state is visible most of the time.",
        },
        {
          step: "Design the empty state",
          detail:
            "No expenses yet, add your first. Explain that this is the first thing every new user sees and a blank list is where people abandon.",
        },
        {
          step: "Design the error state",
          detail:
            "Say what failed and offer a retry. Explain that on mobile networks failure is a normal condition rather than an exception.",
        },
        {
          step: "Check text size and contrast in daylight",
          detail:
            "Take the phone outside. Explain that text must be larger than feels right in a design tool and contrast must survive bright sun.",
        },
      ],
    },
    practice: {
      title: "Design the four screens before writing any code",
      brief:
        "You design your app's version one screens on paper and then in a design tool — thumb-zone placement, correctly sized touch targets verified on a real phone, a justified navigation pattern, every screen with one job, and all four data states designed — before any code is written.",
      steps: [
        "Write down what the user does most often and how frequently.",
        "Sketch a phone outline and mark the thumb zone: easy, strained, hard to reach.",
        "Place the primary action inside the easy-reach zone.",
        "Sketch every version one screen on paper, one box each.",
        "Draw every arrow between the screens.",
        "Find at least one flow problem and fix it on paper.",
        "Name each screen's job in a few words and split any that need the word and.",
        "Decide for each navigation whether the destinations are siblings or a hierarchy.",
        "Choose tab, stack or modal for each and write why.",
        "Design every touch target at 44 points or larger.",
        "Verify the sizes by thumb on a real phone and note any mis-taps.",
        "Add clear spacing between adjacent targets and extra around destructive actions.",
        "Add a confirmation to every destructive action.",
        "Remove anything that depended on hover and make it visible or tappable.",
        "Design the loading state for every screen that fetches data.",
        "Design the empty state with a sentence explaining what the screen will contain.",
        "Design the error state saying what failed and offering a retry.",
        "Check text size and contrast outdoors in daylight.",
        "Assemble the screens in a design tool with consistent spacing and typography.",
        "Have someone else tap through the prototype and note where they hesitate.",
      ],
      standard:
        "A designed version one completed before any code: the most frequent user action identified, a phone outline with the thumb zone marked and the primary action placed in easy reach; every screen sketched on paper with every arrow drawn, at least one flow problem found and fixed on paper, each screen named in a few words with any needing the word and split in two; tab, stack or modal chosen for each navigation with the sibling-versus-hierarchy reasoning written down; every touch target at 44 points or larger and verified by thumb on a real phone with mis-taps noted; clear spacing between adjacent targets, extra around destructive actions and a confirmation on each; anything hover-dependent made visible or tappable; loading, empty and error states designed for every data screen, with the empty state explaining what the screen will contain and the error state naming the failure and offering a retry; text size and contrast checked outdoors in daylight; the screens assembled in a design tool with consistent spacing and typography; and another person tapping through the prototype with their hesitations noted.",
    },
    pitfalls: [
      {
        problem: "You copy a desktop layout onto a phone",
        fix: "Design from the thumb zone. The bottom is easy to reach and the top corners are hard, which is the reverse of a desktop, so primary actions belong low.",
      },
      {
        problem: "Your buttons are too small to hit",
        fix: "Size touch targets to at least 44 points on iOS and 48 on Android, with clear gaps between adjacent ones. This is the commonest measurable usability failure in amateur mobile design.",
      },
      {
        problem: "You rely on hover to reveal something",
        fix: "Make it visible or tappable. Hover does not exist on a phone, so anything a user needs must be on screen or one tap away.",
      },
      {
        problem: "One screen does two jobs",
        fix: "Split it. If naming the screen requires the word and, it is two screens — small screens only work when each does one thing.",
      },
      {
        problem: "You use a stack where tabs belong",
        fix: "Ask whether destinations are siblings or a hierarchy. Siblings get a tab bar; a stack forces users back through screens just to change area.",
      },
      {
        problem: "You have more than five tabs",
        fix: "Cut to three to five. Beyond that the labels stop fitting and users cannot remember what is where.",
      },
      {
        problem: "You only designed the populated state",
        fix: "Design loading, empty and error too. On a poor connection loading is most of the experience, and failure is a normal condition rather than an exception.",
      },
      {
        problem: "Your empty state is a blank area",
        fix: "Say what the screen will contain and offer the action that fills it. The empty state is the first thing every new user sees and a blank list is where people abandon.",
      },
    ],
    expertNotes: [
      "Design from the thumb outward. Most phone use is one-handed, the bottom of the screen is easy and the top corners are hard, so primary actions belong low — which is the reverse of every desktop instinct you have.",
      "Size every touch target to at least 44 points and leave gaps between them. A finger is far less precise than a mouse pointer, and mis-taps are the most common measurable usability failure in amateur mobile design.",
      "Design all four states, not just the populated one. On a poor connection the loading state is most of the experience, and a blank empty state is precisely where new users abandon an app.",
      "Prototype on paper before writing code. Thirty seconds per screen finds flow problems that cost hours to discover once built, and the commonest regret in mobile projects is building a flow nobody had drawn.",
    ],
    vocabulary: [
      {
        term: "Thumb zone",
        meaning:
          "The part of the screen reachable one-handed. The bottom is easy, the top corners hard — the reverse of desktop.",
      },
      {
        term: "Touch target",
        meaning:
          "The tappable area of a control. At least about 44 points on iOS and 48 on Android, with gaps between neighbours.",
      },
      {
        term: "Tab bar",
        meaning:
          "Always-visible navigation between three to five equal top-level areas. For siblings, not hierarchies.",
      },
      {
        term: "Stack",
        meaning:
          "Drill down and come back. For hierarchies; both platforms' back controls expect it to behave predictably.",
      },
      {
        term: "Modal",
        meaning:
          "A screen covering everything for one temporary task, dismissed on completion rather than navigated away from.",
      },
      {
        term: "Empty state",
        meaning:
          "What a new user sees with no data. Should explain the screen and offer the action that fills it.",
      },
      {
        term: "Skeleton screen",
        meaning:
          "Placeholder shapes shown while data loads. Usually better than a spinner because it shows the shape of what is coming.",
      },
      {
        term: "Prototype",
        meaning:
          "A clickable version built before code. Changes here are cheap; the same changes in code are expensive.",
      },
    ],
    homework: [
      {
        task: "Sketch your thumb zone",
        detail:
          "Draw a phone outline and mark easy, strained and hard-to-reach areas for your own hand. Then check where your app's primary action sits.",
      },
      {
        task: "Measure the touch targets in an app you use",
        detail:
          "Find the smallest control you can and estimate its size. Note whether it is above or below 44 points, and whether you ever mis-tap it.",
      },
      {
        task: "Design three empty states",
        detail:
          "For three screens in your app, write the sentence that explains what the screen will contain and the action that fills it. Compare with a blank list.",
      },
      {
        task: "Paper-prototype one flow and test it",
        detail:
          "Sketch the screens, hand them to someone, and ask them to complete a task. Note every hesitation — those are your design problems, found for nothing.",
      },
    ],
    rubric: [
      {
        criterion: "Physical design",
        passing: "Layout fits a phone.",
        excellent:
          "Thumb zone mapped for the intended hand, primary action placed in easy reach, and the layout justified by one-handed use rather than copied from a desktop.",
      },
      {
        criterion: "Touch targets",
        passing: "Buttons are tappable.",
        excellent:
          "Every target at 44 points or larger with clear gaps between neighbours, verified by thumb on a real phone, extra space around destructive actions and a confirmation on each.",
      },
      {
        criterion: "Screen structure",
        passing: "Screens are organised.",
        excellent:
          "Every screen named in a few words with one job each, anything requiring the word and split, and content prioritised with deliberate omissions.",
      },
      {
        criterion: "Navigation",
        passing: "Navigation works.",
        excellent:
          "Tab, stack or modal chosen per destination with sibling-versus-hierarchy reasoning written down, tabs kept to five or fewer, and the wrong pattern demonstrated and rejected.",
      },
      {
        criterion: "States and prototyping",
        passing: "Designs the main screen.",
        excellent:
          "Loading, empty and error states designed for every data screen, hover dependencies removed, contrast checked outdoors, and a paper prototype tested with another person's hesitations recorded.",
      },
    ],
    faqs: [
      {
        q: "How big should my buttons be?",
        a: "At least about 44 by 44 points on iOS and 48 by 48 density-independent pixels on Android, with clear gaps between adjacent controls. A finger is far less precise than a mouse pointer, and mis-taps are the most common usability failure in amateur mobile design.",
      },
      {
        q: "Should my navigation be tabs or a stack?",
        a: "Ask whether the destinations are siblings or a hierarchy. Three to five equal areas get a tab bar; drilling into a detail and coming back gets a stack; a short interrupting task like adding a record gets a modal. Using the wrong one is the commonest structural error.",
      },
      {
        q: "Why does my app feel cramped?",
        a: "Probably because a screen is doing two jobs. Each screen should do exactly one thing — if naming it requires the word and, split it. Mobile apps have more screens than the equivalent website for exactly this reason.",
      },
      {
        q: "Do I need to design empty and error states?",
        a: "Yes, and they matter more than the populated state. On a poor connection the loading state is most of the experience, failure on mobile networks is normal rather than exceptional, and a blank empty state is precisely where new users abandon an app.",
      },
      {
        q: "Is prototyping worth the time?",
        a: "It is the cheapest time you will spend. Four boxes on paper take thirty seconds each and find flow problems immediately, while the same problem discovered after building costs hours. The commonest regret in mobile projects is building a flow nobody had drawn.",
      },
    ],
  },

  "building-screens": {
    summary:
      "The toolchain, and the first screens that actually run on a phone. This session covers setting up Expo, why it removes the native build problem, running on a real device through Expo Go, the core components and how they differ from HTML, and laying out for small screens including safe areas and the keyboard.",
    objectives: [
      "Install and run the toolchain end to end",
      "Explain why Expo avoids native build configuration",
      "Run and reload an app on a real phone",
      "Use the core mobile components correctly",
      "Lay out screens with Flexbox in a mobile context",
      "Handle safe areas, notches and the on-screen keyboard",
    ],
    blocks: [
      {
        heading: "The toolchain, and why Expo",
        body: [
          "Building a mobile app the traditional way means installing Android Studio or Xcode, configuring SDKs, signing keys and build graders, and spending your first week on configuration rather than code. **Expo** is a framework on top of React Native that removes almost all of this: you write JavaScript, and Expo handles the native side, so a working app on a phone takes minutes rather than days.",
          "For this course that is decisive for three reasons. It runs on **Windows and Linux as well as macOS**, so no Mac is needed to learn. It needs **no Android Studio installation** to get started, which matters on a laptop with 8GB of RAM where a full Android emulator is slow to the point of unusable. And it can run in a **browser-based simulator** as well as on a physical phone.",
          "The setup is what you already have from Web Development: **Node.js**, then create an Expo project, then start it. There is one dependency and one command, and the project structure is ordinary JavaScript — which is the point. Everything you learned about components, state and imports applies directly.",
        ],
      },
      {
        heading: "Running on a real phone",
        body: [
          "The fastest and most honest development loop on mobile is a **physical phone**, and with Expo it is easy. Install **Expo Go** from the Play Store, start the project on your laptop, and scan the QR code — the app runs on your phone, connected to your laptop over the same network. Save a file and the phone updates.",
          "This matters more than it sounds, because **the emulator lies**. A desktop emulator has a fast processor, a large screen, a precise mouse pointer and a wired connection, so it hides exactly the problems that matter: small touch targets, slow rendering, awkward thumb reach and slow data. Testing only on an emulator is how apps ship feeling wrong.",
          "Two practical notes. The phone and laptop must be on the **same network**, which on some campus or church Wi-Fi is blocked — a phone hotspot works reliably. And keep the phone **in your hand while developing**, not on the desk, because holding it tells you about reach and size in a way looking at it does not.",
        ],
      },
      {
        heading: "Components, and how they differ from HTML",
        body: [
          "Mobile has no HTML elements; it has **components**, and the core set is small. **`View`** is the container — the equivalent of a div — and everything is built from them. **`Text`** displays text, and here is the rule that catches every web developer: **text must be inside a `Text` component**. Writing text directly inside a `View` does not work, which feels arbitrary until you accept that mobile text has no inherited browser styling and must be explicit.",
          "**`TextInput`** is the input field, **`ScrollView`** makes content scrollable, **`Image`** displays images, and **`Pressable`** or **`TouchableOpacity`** makes something tappable with visual feedback. Notice what is missing: there is no anchor tag, no paragraph, no heading. Mobile gives you primitives and you compose them, which is more work initially and far more predictable later.",
          "The other difference is that **nothing is styled by default**. There is no browser stylesheet, so nothing has margins, sizes or fonts until you set them. Text has no default size, a `View` has no default padding, and a `Pressable` looks like nothing until you style it. This is initially frustrating and eventually freeing, because every pixel on screen is there because you put it there.",
        ],
      },
      {
        heading: "Layout with Flexbox, but different defaults",
        body: [
          "You know Flexbox, and mobile uses it — but the defaults are reversed in the way that confuses everyone. In a mobile `View`, **`flexDirection` defaults to column**, not row. So children stack vertically unless you say otherwise, which is the opposite of the web and takes about a day to stop fighting.",
          "The rest is familiar: **`justifyContent`** distributes along the main axis, **`alignItems`** along the cross axis, **`flex: 1`** makes a child fill available space, and **`gap`** spaces children evenly. Percentages work against the parent. If you can centre a box on the web you can centre one on mobile; you only need to remember which way is down.",
          "The mobile-specific part is that **the screen is small and the content often overflows**, so scrolling is not automatic. Content taller than the screen is simply cut off unless it is inside a `ScrollView` — and a `ScrollView` needs a defined height to scroll within, which in practice means **`flex: 1`** on it inside a full-height container. Forgetting this produces a screen where the bottom half is unreachable, which is a very common first bug.",
        ],
      },
      {
        heading: "Safe areas, notches and the keyboard",
        body: [
          "Modern phones have **notches, punch-holes and rounded corners**, and content placed at the very top of the screen can sit underneath them or under the status bar. **Safe area insets** are the measurements that tell you how much space to leave, and Expo provides them so your content starts below the status bar rather than behind it. Ignoring this produces an app whose title is half-hidden by the clock.",
          "The bottom has the equivalent problem: **gesture bars and navigation bars** overlay the bottom of the screen, so a button placed flush to the bottom edge can be untappable or partly hidden. The fix is the same — respect the bottom inset — and it is why well-designed apps have visibly more space at the bottom than you would put there by eye.",
          "Then the problem that surprises everyone: **the on-screen keyboard covers the bottom half of the screen**. A form field near the bottom disappears behind the keyboard when tapped, so the user cannot see what they are typing. The standard fix is a **keyboard-aware view** that shifts or scrolls the content when the keyboard appears. This is not a polish item — an app where you cannot see the field you are typing into is unusable, and it is one of the first things a real user will find.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor sets up the toolchain from nothing on a laptop and has the expense tracker's first two screens running on a real phone within the session — installing, creating the project, connecting via Expo Go, building the screens from core components, and fixing the three bugs every beginner hits: text outside a Text component, content cut off without a ScrollView, and the keyboard covering the input.",
      steps: [
        {
          step: "Check Node is installed",
          detail:
            "Run the version command. Explain that this is the only prerequisite beyond what Web Development already required.",
        },
        {
          step: "Create the Expo project",
          detail:
            "One command. Explain that Expo removes Android Studio, SDK configuration and signing, which is the part that consumes a traditional first week.",
        },
        {
          step: "Start the project and show the QR code",
          detail: "Explain that this is what the phone connects to, over the same network.",
        },
        {
          step: "Install Expo Go on a real phone",
          detail:
            "From the Play Store. Explain that a physical device is the honest test because an emulator hides small targets, slow rendering and awkward reach.",
        },
        {
          step: "Scan the QR code and run the app",
          detail:
            "Explain that if campus or church Wi-Fi blocks device discovery, a phone hotspot works reliably.",
        },
        {
          step: "Edit a file and watch the phone reload",
          detail:
            "Explain that this save-and-see loop is what makes mobile development feel like web development again.",
        },
        {
          step: "Write text directly inside a View",
          detail:
            "Show that nothing renders. Explain the rule: text must be inside a Text component, because mobile has no inherited browser text styling.",
        },
        {
          step: "Wrap it in Text and style it",
          detail:
            "Explain that nothing has a default size or font, so every pixel is there because you set it.",
        },
        {
          step: "Build the expense list screen from Views",
          detail:
            "Compose containers. Explain that mobile gives primitives rather than semantic elements, which is more work initially and more predictable later.",
        },
        {
          step: "Add children and watch them stack vertically",
          detail:
            "Explain that flexDirection defaults to column on mobile, which is the reverse of the web and takes a day to stop fighting.",
        },
        {
          step: "Centre a box with justifyContent and alignItems",
          detail:
            "Explain that Flexbox knowledge transfers directly once you remember which way is down.",
        },
        {
          step: "Add enough content to overflow the screen",
          detail:
            "Show the bottom cut off and unreachable. Explain that scrolling is not automatic on mobile and this is a very common first bug.",
        },
        {
          step: "Wrap it in a ScrollView with flex 1",
          detail:
            "Explain that a ScrollView needs a defined height to scroll within, which in practice means flex 1 inside a full-height container.",
        },
        {
          step: "Build the add-expense form with TextInput",
          detail:
            "Explain that a Pressable or TouchableOpacity provides the tap feedback a plain View does not.",
        },
        {
          step: "Tap a field near the bottom",
          detail:
            "Show the keyboard covering it. Explain that the user cannot see what they are typing, which makes the app unusable rather than merely awkward.",
        },
        {
          step: "Add a keyboard-aware view",
          detail:
            "Show the content shift. Explain that this is not polish and is one of the first things a real user finds.",
        },
        {
          step: "Show content under the status bar",
          detail:
            "Explain that notches and the status bar overlay the top, so a title can be half-hidden by the clock.",
        },
        {
          step: "Apply safe area insets",
          detail:
            "Explain that the bottom needs it too, because gesture and navigation bars overlay it and a flush-to-edge button can be untappable.",
        },
        {
          step: "Put the phone in hand and use the app",
          detail:
            "Explain that holding it reveals reach and size problems that looking at it on a desk does not.",
        },
      ],
    },
    practice: {
      title: "Get two screens running on a real phone",
      brief:
        "You set up the toolchain from nothing, connect a physical phone through Expo Go, and build the expense list and add-expense screens from core components — correctly scrolled, keyboard-aware and clear of the safe areas — then use the app in your hand and note what the emulator hid.",
      steps: [
        "Confirm Node.js is installed and record the version.",
        "Create an Expo project and confirm it starts.",
        "Install Expo Go on a physical Android phone.",
        "Connect the phone to the same network as the laptop, or use a hotspot if discovery fails.",
        "Scan the QR code and confirm the app runs on the phone.",
        "Edit a file and confirm the phone reloads.",
        "Build the expense list screen from View and Text components.",
        "Confirm every piece of text is inside a Text component.",
        "Style the screen explicitly, setting sizes and spacing yourself.",
        "Add enough list content to overflow the screen and observe what is cut off.",
        "Wrap the content in a ScrollView with flex 1 and confirm it reaches the bottom.",
        "Build the add-expense form with TextInput fields.",
        "Use a Pressable or TouchableOpacity for the submit control so it gives feedback.",
        "Tap a field near the bottom and observe the keyboard covering it.",
        "Add a keyboard-aware view and confirm the field stays visible.",
        "Check whether any content sits under the status bar.",
        "Apply safe area insets at the top and the bottom.",
        "Use the app holding the phone in one hand and note anything hard to reach.",
        "Compare the same app in the browser simulator and list what the emulator hid.",
        "Commit the working project to your GitHub repository.",
      ],
      standard:
        "Two screens running on a physical Android phone: Node confirmed and an Expo project created and started, Expo Go installed and connected over the same network or a hotspot, the QR code scanned and a file edit confirmed to reload on the device; the expense list built from View and Text with every piece of text inside a Text component and all sizes and spacing set explicitly; enough content added to overflow the screen with the cut-off observed and then fixed by a ScrollView using flex 1 and confirmed to reach the bottom; the add-expense form built with TextInput fields and a Pressable or TouchableOpacity submit control giving tap feedback; the keyboard observed covering a low field and a keyboard-aware view added so the field stays visible; content checked against the status bar and safe area insets applied top and bottom; the app used one-handed with reach problems noted; the same app compared in the browser simulator with what the emulator hid listed; and the working project committed to GitHub.",
    },
    pitfalls: [
      {
        problem: "You write text directly inside a View",
        fix: "Wrap it in a Text component. Mobile text has no inherited browser styling, so it must be explicit — and this is the first rule that catches every web developer.",
      },
      {
        problem: "Your children lay out sideways when you expected down",
        fix: "Remember flexDirection defaults to column on mobile, which is the reverse of the web. Set it to row when you actually want a row.",
      },
      {
        problem: "The bottom of your screen is unreachable",
        fix: "Wrap the content in a ScrollView. Scrolling is not automatic on mobile, and a ScrollView needs a defined height — in practice flex 1 inside a full-height container.",
      },
      {
        problem: "The keyboard covers the field you are typing in",
        fix: "Use a keyboard-aware view that shifts or scrolls the content. This is not polish; an app where you cannot see the field is unusable.",
      },
      {
        problem: "Your title sits under the status bar",
        fix: "Apply safe area insets. Notches, punch-holes and the status bar overlay the top of the screen, and the bottom needs it too because of gesture bars.",
      },
      {
        problem: "You test only in the emulator",
        fix: "Use a physical phone. An emulator has a fast processor, a big screen, a precise pointer and a wired connection, so it hides exactly the problems that matter.",
      },
      {
        problem: "Your phone cannot see the laptop",
        fix: "Confirm both are on the same network, or use a phone hotspot. Campus and church Wi-Fi frequently blocks the device discovery Expo relies on.",
      },
      {
        problem: "You try to install Android Studio first",
        fix: "Start with Expo. It needs no native SDK setup, which matters on an 8GB laptop where a full Android emulator is slow to the point of unusable.",
      },
    ],
    expertNotes: [
      "Develop on a physical phone, not only in the emulator. An emulator's fast processor, large screen, precise pointer and wired connection hide the small targets, slow rendering and awkward reach that decide whether an app feels right.",
      "Remember that flexDirection defaults to column on mobile. It is the reverse of the web, and unlearning the web default is the single most common source of confusion in the first week.",
      "Wrap overflowing content in a ScrollView with flex 1. Scrolling is not automatic on mobile, so content taller than the screen is simply cut off and unreachable until you do.",
      "Handle the keyboard and the safe areas early, not as polish. A keyboard covering the field you are typing into makes an app unusable, and content under the status bar or gesture bar looks broken to every user.",
    ],
    vocabulary: [
      {
        term: "Expo",
        meaning:
          "A framework on React Native that removes native build configuration. Runs on Windows, Linux and macOS, with no Android Studio needed.",
      },
      {
        term: "Expo Go",
        meaning:
          "The app that runs your project on a physical phone over the local network. The fastest and most honest development loop.",
      },
      {
        term: "View",
        meaning: "The container component, equivalent to a div. Everything is composed from them.",
      },
      {
        term: "Text",
        meaning:
          "The only component that can contain text. Text placed directly in a View does not render.",
      },
      {
        term: "ScrollView",
        meaning:
          "Makes content scrollable. Needs a defined height, in practice flex 1, or it will not scroll.",
      },
      {
        term: "Pressable / TouchableOpacity",
        meaning:
          "Makes a component tappable with visual feedback, which a plain View does not provide.",
      },
      {
        term: "Safe area insets",
        meaning:
          "Measurements for the status bar, notch and gesture bar. What keeps content from sitting underneath them.",
      },
      {
        term: "Keyboard-aware view",
        meaning:
          "A container that shifts or scrolls content when the on-screen keyboard appears. Without it, low fields are hidden.",
      },
    ],
    homework: [
      {
        task: "Get Expo running on your own phone",
        detail:
          "Create a project, install Expo Go, scan the code, and edit a file to confirm it reloads. If discovery fails, use a phone hotspot.",
      },
      {
        task: "Build one screen from View and Text",
        detail:
          "Set every size and spacing yourself, since nothing has a default. Then add enough content to need a ScrollView and make it scroll.",
      },
      {
        task: "Break the keyboard on purpose and fix it",
        detail:
          "Put a TextInput near the bottom, tap it, and watch it disappear. Add a keyboard-aware view and confirm the field stays visible.",
      },
      {
        task: "Compare emulator and real phone",
        detail:
          "Use your app in the browser simulator and then in your hand. Write down three things the simulator hid — they are usually reach, size and speed.",
      },
    ],
    rubric: [
      {
        criterion: "Toolchain",
        passing: "Gets the project running.",
        excellent:
          "Expo project created and started with no Android Studio, connected to a physical phone through Expo Go over the local network or a hotspot, with save-and-reload confirmed.",
      },
      {
        criterion: "Components",
        passing: "Renders something on screen.",
        excellent:
          "Screens composed from View and Text with every piece of text inside a Text component, TextInput for entry, and Pressable or TouchableOpacity giving tap feedback.",
      },
      {
        criterion: "Layout",
        passing: "Positions elements.",
        excellent:
          "Flexbox used with the column default understood, and overflowing content wrapped in a ScrollView with flex 1 and confirmed to reach the bottom.",
      },
      {
        criterion: "Device realities",
        passing: "App displays correctly.",
        excellent:
          "Safe area insets applied top and bottom, a keyboard-aware view keeping fields visible, and the app used one-handed with reach problems noted.",
      },
      {
        criterion: "Testing honesty",
        passing: "Checks in the simulator.",
        excellent:
          "The same app compared on a physical phone with what the emulator hid listed, and the working project committed to GitHub.",
      },
    ],
    faqs: [
      {
        q: "Why Expo rather than plain React Native?",
        a: "It removes the native build configuration — Android Studio, SDKs, signing keys — which otherwise consumes a traditional first week. It runs on Windows, Linux and macOS, needs no emulator to start, and works fine on an 8GB laptop, which matters for this course.",
      },
      {
        q: "Do I need an Android phone?",
        a: "A physical phone is strongly recommended, because the browser simulator hides exactly the problems that matter: small touch targets, slow rendering, awkward thumb reach and slow data. You can start in the simulator, but you should not finish there.",
      },
      {
        q: "My phone cannot connect to the project. What is wrong?",
        a: "Usually the network. The phone and laptop must be on the same network, and campus or church Wi-Fi often blocks the device discovery Expo relies on. A phone hotspot works reliably, because then both are definitely on the same network.",
      },
      {
        q: "Why does my text not appear?",
        a: "It is probably directly inside a View. Text must be inside a Text component on mobile, because there is no browser stylesheet and no inherited text styling — everything about text has to be explicit.",
      },
      {
        q: "The bottom of my screen is cut off and I cannot scroll. Why?",
        a: "Scrolling is not automatic on mobile. Wrap the content in a ScrollView, and give it a defined height — in practice flex 1 inside a full-height container — or it will not scroll. This is one of the most common first bugs.",
      },
    ],
  },
};
