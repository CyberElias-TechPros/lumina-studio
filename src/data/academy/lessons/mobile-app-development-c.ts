import type { SessionLecture } from "../types";

/**
 * Mobile App Development — ₦30,000 · 4 weeks · 8 sessions.
 * Sessions 7 and 8. (1–3 in mobile-app-development.ts, 4–6 in -b.ts.)
 * Same running app: the naira expense tracker, finished and shipped.
 */
export const mobileAppLessonsC: Record<string, SessionLecture> = {
  "testing-on-devices": {
    summary:
      "The emulator will tell you your app is fine. This session covers testing on real hardware, what an emulator systematically hides, debugging mobile with remote tools and reading the errors they produce, and the specific bugs that appear on phones and nowhere else — then a checklist that catches them before your users do.",
    objectives: [
      "Explain what an emulator hides and why it matters",
      "Test touch, layout, keyboard and performance on real hardware",
      "Debug with remote tools and read a mobile stack trace",
      "Recognise and fix the bugs that only appear on devices",
      "Test across a range of screen sizes and Android versions",
      "Work through a repeatable pre-release checklist",
    ],
    blocks: [
      {
        heading: "Why the emulator lies",
        body: [
          "A desktop emulator is a genuinely useful tool and a genuinely misleading one. It gives you a **fast processor**, so slow rendering looks fine. A **large screen**, so cramped layouts look spacious. A **precise mouse pointer**, so a 30-point button is easy to hit. A **wired connection**, so loading states barely appear. And **no physical context** — nobody holds a laptop in one hand on a bus.",
          "Each of those hides a specific class of failure, and they are exactly the classes that decide whether an app feels good. An app tested only in an emulator ships with touch targets that are too small, layouts that break on a small phone, performance problems nobody saw, and loading states that were never exercised because data always arrived instantly.",
          "So the rule for this course is simple: **the emulator is for iteration, the phone is for truth**. Use the simulator to work quickly through layout and logic, and use a physical device before you consider anything finished. If you can borrow a cheap older Android for testing, it is the most valuable piece of equipment you will own, because everything that will be slow is visibly slow on it.",
        ],
      },
      {
        heading: "What to test, physically",
        body: [
          "Some things can only be tested by holding the device. **Touch targets by thumb**, one-handed, which is the test the emulator cannot perform at all — a button that is easy with a mouse and impossible with a thumb is a design failure, not a preference. **Reach**, with the phone in the hand you actually use. **Text size in daylight**, outdoors, which no calibrated monitor reproduces.",
          "Then the behaviours that only exist on a device. **The keyboard covering inputs**, which you can partly simulate but should confirm in place. **The system back button** on Android, from every screen, including from a modal and from a detail screen. **Rotation**, if your app supports it — and if it does not, confirm it stays put rather than breaking. **Incoming calls and notifications** interrupting, because an app that loses the user's half-typed form when a call arrives is an app people complain about.",
          "And **performance on the device that matters**. Scroll the longest list you can generate on the cheapest phone available, open every screen repeatedly, and watch for stutter, memory growth and heat. These are the things users describe as **the app is slow** without being able to be more specific, and they are invisible on a development machine.",
        ],
      },
      {
        heading: "Debugging on mobile",
        body: [
          "Debugging is the same discipline as on the web, with different plumbing. **Console output** is available through remote debugging — the Expo dev menu opens developer tools in a browser, and from there you inspect, set breakpoints and read the console much as you would on a website. Learn to open this immediately; most mobile debugging problems are people guessing because they never connected the tools.",
          "**The red error screen** is React Native telling you something threw, with a message and a stack trace. Read it the same way as any error: **the top line names the problem and the stack names the path**. **Cannot read property of undefined** means a value was not there — usually a param that did not arrive, an item removed from a list, or data still loading when the render ran. **is not a function** is usually a typo or a missing import.",
          "Then the mobile-specific failure that produces no error at all: **the white or blank screen**. It usually means the root component threw during render, or nothing was ever rendered, and because there is no visible error you have to attach the debugger and look. The habit that saves hours is **narrowing by removal** — comment out half the screen and reload, then halve again — which is the same bisection that works everywhere.",
        ],
      },
      {
        heading: "The bugs that only appear on phones",
        body: [
          "There is a reliable set of failures that appear on devices and not in the simulator, and knowing them in advance is most of the work. **The keyboard covering the field you are typing in** — fixed with a keyboard-aware view. **Content under the status bar or gesture bar** — fixed with safe area insets. **Text overflowing its container** on a small screen, because English words are long and a 320dp screen is narrow.",
          "Then the data bugs. **List rows showing the wrong data after a delete**, which is the index-as-key problem from earlier. **Stale values on a detail screen**, which is the passed-object problem. **State not updating** because an array or object was mutated rather than replaced, so the comparison sees no change and the interface does not re-render — one of the more confusing bugs in this stack, because the data is correct and the screen is wrong.",
          "And the platform splits. **Android back** doing something unexpected, **images failing to load** because of a path or a case-sensitivity difference between platforms, and **fonts and spacing rendering slightly differently** on each. None of these is hard to fix and all of them are easy to miss, which is why the checklist exists.",
        ],
      },
      {
        heading: "A pre-release checklist",
        body: [
          "Testing on mobile is a **list, not a feeling**. The list is short enough to run every time and it catches almost everything: every screen at the smallest and largest sizes; every touch target by thumb; every form with the keyboard open; the back button from every screen; the app in airplane mode; the app killed and reopened; a slow connection; the oldest Android available; and every error state forced deliberately.",
          "Two items on it are worth emphasising because they are skipped most often. **Kill the app completely and reopen it** — this is what exercises persistence, and it is where the local-storage bugs appear, including the corrupt-data crash at launch. And **force every error state** rather than hoping they work: switch off the network, make the server return a 500, and fill a form with nonsense. An error state nobody has triggered is an error state nobody has tested.",
          "Then the last discipline: **have someone else use it**. Hand the phone to a person who has not seen the app and ask them to add an expense, while you say nothing. Where they hesitate, tap the wrong thing, or fail outright is where the design failed — and you cannot find those problems yourself, because you already know how it works.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor runs the full pre-release checklist against the expense tracker live — on a physical phone and on the oldest Android available — finding a keyboard problem, a small-screen text overflow, a stale detail screen and an index-key bug, debugging each with remote tools, and finishing by handing the phone to someone who has never seen the app.",
      steps: [
        {
          step: "Run the app in the emulator and declare it fine",
          detail:
            "Then run it on the phone. Explain that the emulator's fast processor, large screen, precise pointer and wired connection hide exactly the failures that matter.",
        },
        {
          step: "Open the dev menu and connect remote debugging",
          detail:
            "Show the console in a browser. Explain that most mobile debugging problems are people guessing because they never connected the tools.",
        },
        {
          step: "Trigger a red error screen deliberately",
          detail:
            "Read the top line, then the stack. Explain that the top names the problem and the stack names the path, exactly as on the web.",
        },
        {
          step: "Cause a blank white screen",
          detail:
            "Explain that this usually means the root component threw during render, and there is no visible error, so you must attach the debugger.",
        },
        {
          step: "Narrow it by commenting out half the screen",
          detail:
            "Reload and halve again. Explain that bisection works here exactly as it does everywhere.",
        },
        {
          step: "Test every touch target by thumb, one-handed",
          detail:
            "Mis-tap the smallest one. Explain that this is the test the emulator cannot perform at all.",
        },
        {
          step: "Test at the smallest screen size",
          detail:
            "Find text overflowing its container. Explain that a 320dp screen is narrow and long words do not fit.",
        },
        {
          step: "Test at a tablet size",
          detail:
            "Show the full-width list. Explain that testing the extremes matters because the middle sizes always work.",
        },
        {
          step: "Open every form with the keyboard up",
          detail:
            "Find the covered field. Explain that this is only fully confirmed in place, on the device.",
        },
        {
          step: "Press back from every screen",
          detail:
            "Including from the modal and the detail screen. Explain that an unexpected back is one of the fastest ways to make an app feel broken.",
        },
        {
          step: "Add an expense, then delete one from the middle",
          detail:
            "Show the wrong row affected. Explain the index-as-key bug and switch the key to the record id.",
        },
        {
          step: "Edit an expense and open its detail",
          detail:
            "Show stale values. Explain the passed-object problem and switch to passing an id and looking it up.",
        },
        {
          step: "Mutate the array in place and watch the list not update",
          detail:
            "Explain that the data is correct and the screen is wrong, because the comparison sees no change — one of the more confusing bugs in this stack.",
        },
        {
          step: "Replace the array instead of mutating it",
          detail:
            "Confirm the interface updates. Explain that immutable updates are the convention for exactly this reason.",
        },
        {
          step: "Put the device in airplane mode and use the app",
          detail:
            "Confirm it shows local data and queues a write. Explain that this is a checklist item, not an edge case.",
        },
        {
          step: "Throttle to a slow connection",
          detail:
            "Confirm the skeleton holds and the error state offers Retry. Explain that forcing error states is the only way to know they work.",
        },
        {
          step: "Kill the app completely and reopen it",
          detail:
            "Explain that this exercises persistence and is where storage bugs, including the corrupt-data crash at launch, appear.",
        },
        {
          step: "Run it on the oldest Android available",
          detail:
            "Scroll the longest list. Explain that stutter, memory growth and heat are invisible on a development machine.",
        },
        {
          step: "Receive a call mid-form and return",
          detail:
            "Check whether the half-typed form survived. Explain that losing it is a common and preventable complaint.",
        },
        {
          step: "Hand the phone to someone who has never seen the app",
          detail:
            "Ask them to add an expense and say nothing. Explain that where they hesitate is where the design failed, and you cannot find those problems yourself.",
        },
      ],
    },
    practice: {
      title: "Run the full pre-release checklist",
      brief:
        "You put the expense tracker through the complete checklist on real hardware — every size, every touch target by thumb, every form with the keyboard up, back from every screen, airplane mode, a slow connection, the oldest Android available, a kill-and-reopen, and every error state forced — fixing what you find and recording the results.",
      steps: [
        "Connect remote debugging and confirm you can read the console from the device.",
        "Deliberately trigger a red error screen and read the top line and the stack.",
        "Deliberately cause a blank screen and narrow it by commenting out half the screen.",
        "Test every touch target by thumb, one-handed, on a physical phone.",
        "Test every screen at the smallest size and fix any text overflow.",
        "Test every screen at a tablet size and fix any absurd full-width layout.",
        "Open every form with the keyboard up and confirm no field is covered.",
        "Press the Android back button from every screen, including modals and detail screens.",
        "Add several expenses and delete one from the middle of the list.",
        "Confirm the correct row was removed, and switch the key to the record id if not.",
        "Edit an expense and confirm the detail screen shows current values.",
        "Confirm list updates use replacement rather than in-place mutation.",
        "Put the device in airplane mode and confirm the app still works and queues writes.",
        "Throttle to a slow connection and confirm the loading state holds sensibly.",
        "Force every error state: no network, a server 500, and invalid form input.",
        "Confirm each error state names the failure and offers an action.",
        "Kill the app completely and reopen it, confirming data persisted.",
        "Run the whole app on the oldest, cheapest Android available.",
        "Scroll the longest list you can generate and note any stutter or memory growth.",
        "Receive a call or notification mid-form and confirm the input survived.",
        "Hand the phone to someone who has never seen the app and record where they hesitate.",
        "Write up the checklist results, with every failure found and its fix.",
      ],
      standard:
        "A completed pre-release checklist on real hardware: remote debugging connected with the console readable from the device, a red error screen triggered and read by top line and stack, a blank screen caused and narrowed by commenting out half the screen; every touch target tested by thumb one-handed, every screen tested at the smallest size with text overflow fixed and at a tablet size with absurd layouts fixed; every form opened with the keyboard up and no field covered; the Android back button pressed from every screen including modals and detail screens; several expenses added with one deleted from the middle and the correct row confirmed removed, the key switched to a record id if not; an edited expense confirmed to show current values on its detail screen; list updates confirmed to replace rather than mutate; the device put in airplane mode with the app confirmed working and writes queued; a throttled connection with the loading state confirmed to hold; every error state forced by no network, a server 500 and invalid input, each confirmed to name the failure and offer an action; the app killed completely and reopened with persistence confirmed; the whole app run on the oldest, cheapest Android available with the longest list scrolled and stutter or memory growth noted; a call or notification received mid-form with input survival confirmed; the phone handed to someone who has never seen the app with their hesitations recorded; and the results written up with every failure found and its fix.",
    },
    pitfalls: [
      {
        problem: "You test only in the emulator",
        fix: "Test on a physical phone. The emulator's fast processor, large screen, precise pointer and wired connection hide exactly the failures that decide whether an app feels good.",
      },
      {
        problem: "You debug by guessing without connecting tools",
        fix: "Open remote debugging from the dev menu. Most mobile debugging problems are people guessing because they never attached the console.",
      },
      {
        problem: "You see a blank white screen and have no idea why",
        fix: "Attach the debugger and narrow by removal. A blank screen usually means the root component threw during render, and there is no visible error to read.",
      },
      {
        problem: "You test with a mouse pointer",
        fix: "Test by thumb, one-handed. A button that is easy with a mouse and impossible with a thumb is a design failure, and it is the test an emulator cannot perform.",
      },
      {
        problem: "You only test the sizes you own",
        fix: "Test the smallest and largest. Middle sizes always work; a 320dp screen overflows and a tablet makes full-width layouts absurd.",
      },
      {
        problem: "You mutate arrays in place and the interface does not update",
        fix: "Replace rather than mutate. The data is correct and the screen is wrong because the comparison sees no change, which makes this one of the more confusing bugs in the stack.",
      },
      {
        problem: "You never kill the app and reopen it",
        fix: "Do it every time. This is what exercises persistence, and it is where storage bugs appear, including a crash at launch from corrupt data.",
      },
      {
        problem: "You never force an error state",
        fix: "Switch off the network, return a 500, submit nonsense. An error state nobody has triggered is an error state nobody has tested.",
      },
    ],
    expertNotes: [
      "Use the emulator to iterate and the phone to decide. The simulator's fast processor, large screen, precise pointer and wired connection hide precisely the failures that determine whether an app feels good to a real user.",
      "Connect remote debugging before you guess at anything. Most mobile debugging time is lost to people who never opened the console, and the tools are one dev-menu tap away.",
      "Run the checklist every time rather than trusting a feeling. Kill-and-reopen and forced error states are the two items skipped most often, and they catch the storage and failure bugs that reach users.",
      "Hand the phone to someone who has never seen the app and say nothing. Where they hesitate or tap wrongly is where the design failed, and you cannot find those problems yourself because you already know how it works.",
    ],
    vocabulary: [
      { term: "Emulator", meaning: "A simulated device on a desktop. Fast to iterate on, and it systematically hides touch, size, performance and network problems." },
      { term: "Remote debugging", meaning: "Attaching browser developer tools to the app on a phone. Open it before guessing." },
      { term: "Red screen", meaning: "React Native's error overlay. The top line names the problem, the stack names the path." },
      { term: "Blank screen", meaning: "Usually the root component throwing during render, with no visible error. Narrow it by commenting out half." },
      { term: "Immutable update", meaning: "Replacing an array or object rather than mutating it. Required for the interface to notice the change." },
      { term: "Kill and reopen", meaning: "Fully closing the app and relaunching. What exercises persistence and catches storage bugs." },
      { term: "Forced error state", meaning: "Deliberately causing a failure. The only way to know an error state actually works." },
      { term: "Pre-release checklist", meaning: "Sizes, thumb targets, keyboard, back, airplane mode, slow connection, oldest device, kill-and-reopen, forced errors, and an outside user." },
    ],
    homework: [
      {
        task: "Connect remote debugging to your phone",
        detail:
          "Open the dev menu, attach the tools, and read the console while the app runs. Then trigger an error deliberately and read the stack.",
      },
      {
        task: "Test one screen by thumb, one-handed",
        detail:
          "Every control, in the hand you actually use. Note which are hard to reach and which you mis-tap, and fix the worst one.",
      },
      {
        task: "Kill and reopen your app",
        detail:
          "Confirm the data persisted. Then corrupt the stored value on purpose and confirm the app survives launch rather than crashing.",
      },
      {
        task: "Force one error state",
        detail:
          "Turn off the network or make the server fail. Confirm your error state names the failure and offers an action rather than showing a blank screen.",
      },
    ],
    rubric: [
      {
        criterion: "Real-device testing",
        passing: "Runs the app on a phone.",
        excellent: "Emulator used for iteration and a physical phone for decisions, with the oldest, cheapest Android also tested and the longest list scrolled on it.",
      },
      {
        criterion: "Debugging",
        passing: "Fixes errors.",
        excellent: "Remote debugging connected, red screens read by top line and stack, and a blank screen narrowed by commenting out half the screen.",
      },
      {
        criterion: "Device-specific bugs",
        passing: "Handles the obvious ones.",
        excellent: "Keyboard, safe areas and text overflow fixed; index keys and passed objects corrected; list updates confirmed immutable; and back behaviour verified from every screen.",
      },
      {
        criterion: "Checklist discipline",
        passing: "Tests the main flows.",
        excellent: "The full checklist run including airplane mode, a throttled connection, a complete kill and reopen, and every error state forced rather than assumed.",
      },
      {
        criterion: "Outside perspective",
        passing: "Tests it themselves.",
        excellent: "The phone handed to someone who has never seen the app, their hesitations recorded without explanation offered, and the worst problem found actually fixed.",
      },
    ],
    faqs: [
      {
        q: "Why does my app work in the emulator but feel wrong on a phone?",
        a: "Because the emulator has a fast processor, a large screen, a precise mouse pointer and a wired connection. It hides small touch targets, slow rendering, awkward thumb reach and slow data — which are exactly the things that decide whether an app feels good.",
      },
      {
        q: "How do I see console output from my phone?",
        a: "Open the Expo dev menu on the device and launch remote debugging, which opens developer tools in a browser. You can then read the console, set breakpoints and inspect, just as on a website. Do this before guessing.",
      },
      {
        q: "My app shows a blank white screen with no error. What now?",
        a: "It usually means the root component threw during render, and because nothing rendered there is no visible error. Attach the debugger, then narrow it by commenting out half the screen and reloading, halving again until you find it.",
      },
      {
        q: "I changed my data but the screen did not update. Why?",
        a: "You probably mutated an array or object in place. The data is correct but the comparison sees no change, so nothing re-renders. Replace the array or object rather than modifying it, which is why immutable updates are the convention.",
      },
      {
        q: "What should I always test before releasing?",
        a: "Every size, every touch target by thumb, every form with the keyboard up, back from every screen, airplane mode, a slow connection, the oldest device you can find, a complete kill and reopen, and every error state forced deliberately. Then hand it to someone who has never seen it.",
      },
    ],
  },

  "publishing-mobile": {
    summary:
      "The final project and the last mile. This session covers what publishing actually involves, how Android and iOS distribution genuinely differ, the store requirements most people discover too late, the options for getting an app into real hands without a store at all, and finishing the expense tracker as a documented, working prototype.",
    objectives: [
      "Explain what building, signing and distributing an app involves",
      "Describe Android publishing and its requirements accurately",
      "State the iOS position honestly, including the macOS requirement",
      "Prepare the store listing materials in advance",
      "Choose a distribution route appropriate to the project",
      "Finish and document the final prototype",
    ],
    blocks: [
      {
        heading: "What publishing actually is",
        body: [
          "Publishing is three separate things that people conflate. **Building** produces the app package from your code. **Signing** proves the package came from you and has not been altered, using a private key you must keep — lose it and you cannot update your own app, which is a genuinely irreversible mistake. **Distributing** gets the signed package to users, through a store or directly.",
          "The signing point deserves emphasis because it is the one with no recovery. Your **keystore** is what identifies you as the publisher, and every future update must be signed with the same key. Back it up in more than one place, keep it out of your public repository, and treat losing it as losing the app.",
          "Then the part most first-time publishers underestimate: **the store review is not instant and not guaranteed**. Both stores check the listing, the behaviour and the declared data handling, and they reject apps — commonly for missing privacy policies, broken functionality, misleading descriptions or undeclared data collection. Budget time for a rejection and a resubmission rather than assuming a launch date.",
        ],
      },
      {
        heading: "Android distribution",
        body: [
          "Android is the route available to everyone in this course, and it has a real advantage: **you do not have to use the Play Store at all**. An Android app can be shared as a package file directly — by link, by messaging, by a website — and installed by the recipient. For a first project, a church media team, or a small business with a handful of users, this is often the right answer and costs nothing.",
          "Publishing to the **Google Play Console** involves a one-time registration fee, creating the listing with screenshots and a description, completing a **content rating questionnaire** and a **data safety form** declaring what data the app collects and why, and providing a **privacy policy URL** — which is mandatory even for an app that collects nothing, and catches people late.",
          "Then the practical route for testing: Play's **internal and closed testing tracks** let you distribute to a limited list of people before a public release, which is how you get an app onto real devices without a full launch. For most course projects this, or direct distribution, is more appropriate than a public listing nobody asked for.",
        ],
      },
      {
        heading: "iOS: the honest position",
        body: [
          "This is worth stating without softening, because it affects people's plans and money. **Publishing to the Apple App Store requires macOS.** Apple's build and upload tools run on macOS, and there is no supported way around it. So a student on Windows or Linux can build, test and ship an Android app from this course, and cannot publish to the App Store from their own machine.",
          "There are workarounds and they all cost something: a **cloud build service** that builds on Apple hardware for you, a **rented Mac**, or a **client or collaborator who has one**. These are legitimate and used professionally, but none of them is free, and any course promising App Store publishing from a Windows laptop without mentioning this is not telling you the whole story.",
          "The reassurance is that **the skills are identical**. Everything in this course — scoping, design, screens, navigation, state, data, testing — applies unchanged to iOS, and the framework produces iOS builds from the same code. What differs is the last mile and its cost, plus Apple's annual developer fee, which is a recurring charge rather than the one-time Android fee.",
        ],
      },
      {
        heading: "Store requirements people discover late",
        body: [
          "The listing materials are not optional and they take longer than expected. **Screenshots** at specific resolutions for each device type — not one screenshot resized, but genuine captures per size. A **short description** with a hard character limit and a **full description** that explains what the app does without marketing padding. An **app icon** at the required resolution, which needs designing rather than improvising.",
          "Then the policy items. A **privacy policy** hosted at a public URL is mandatory on both stores, even for an app that collects nothing, and it must actually say what the app does with data. The **data safety** declaration on Play and the equivalent **privacy nutrition label** on iOS require you to state precisely what you collect, whether it is linked to a user, and whether it is shared — and declaring nothing while your analytics SDK collects plenty is how accounts get suspended.",
          "The practical advice is to **prepare these while you build**, not after. Writing a privacy policy takes an afternoon; discovering you need one the day you want to launch takes a week, because it has to be hosted somewhere and be accurate about your actual data handling.",
        ],
      },
      {
        heading: "The final project, and what to show",
        body: [
          "The deliverable for this course is **a working app prototype you designed and built, running on a phone or emulator, with the screens and flow documented**. That last phrase matters as much as the first: an app nobody can understand is worth less than a smaller one that is explained.",
          "So the documentation is short and specific. **The scope** — your version one sentence, and what you deliberately left out. **The screen flow** — the diagram from week one, updated to match what you actually built, including where reality differed. **The data model** — the record shape and where it is stored. **The testing** — your checklist results, with what you found and fixed. And **the known gaps**, honestly stated.",
          "Stating the gaps is what makes the work credible rather than defensive. **Offline writes queue but conflicts resolve last-write-wins; no user accounts; tested on three Android devices and not on iOS.** A reviewer reads that as competence, because it shows you knew the boundaries of what you built. An app presented as finished when it is not is judged more harshly than the same app presented with its limits named.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor walks the finished expense tracker through the whole last mile — producing a signed Android build, sharing it directly to a phone without a store, showing what the Play Console requires including the privacy policy people forget, stating the iOS position plainly, and reviewing a student's final documentation for the honesty that makes it credible.",
      steps: [
        {
          step: "Separate building, signing and distributing",
          detail:
            "Name each. Explain that they are conflated constantly and that only signing has no recovery if you get it wrong.",
        },
        {
          step: "Generate a keystore and explain what it is",
          detail:
            "Explain that it identifies you as the publisher, every update needs the same key, and losing it means losing the app.",
        },
        {
          step: "Show how to back it up and where not to put it",
          detail:
            "Multiple locations, never in a public repository. Explain that this is the one irreversible mistake available in publishing.",
        },
        {
          step: "Produce a signed Android build",
          detail:
            "Explain that this is the package a store or a direct link distributes.",
        },
        {
          step: "Install it directly on a phone without a store",
          detail:
            "Explain that Android permits direct distribution, which for a first project or a small user group is often the right and free answer.",
        },
        {
          step: "Open the Play Console and walk the requirements",
          detail:
            "One-time fee, listing, screenshots per device type. Explain that these take longer than expected and should be prepared while building.",
        },
        {
          step: "Show the content rating questionnaire",
          detail:
            "Explain that it is mandatory and straightforward, and that skipping it blocks publication.",
        },
        {
          step: "Show the data safety form",
          detail:
            "Explain that declaring nothing while an analytics SDK collects data is how accounts get suspended.",
        },
        {
          step: "Show the privacy policy requirement",
          detail:
            "A public URL, mandatory even if the app collects nothing. Explain that this is the item most people discover the day they want to launch.",
        },
        {
          step: "Show the internal testing track",
          detail:
            "Explain that distributing to a limited list is usually the right route for a course project rather than a public listing nobody asked for.",
        },
        {
          step: "State the iOS position plainly",
          detail:
            "App Store publishing requires macOS, with no supported workaround. Explain that cloud builds, rented Macs and collaborators all cost something.",
        },
        {
          step: "Confirm the skills transfer",
          detail:
            "Explain that the same code produces iOS builds and everything taught applies unchanged; only the last mile and its cost differ.",
        },
        {
          step: "Discuss review timelines and rejections",
          detail:
            "Explain that review is neither instant nor guaranteed, and that budgeting for a rejection and resubmission is normal rather than pessimistic.",
        },
        {
          step: "Review a student's scope sentence",
          detail:
            "Explain that documentation starts with version one in one sentence and what was deliberately left out.",
        },
        {
          step: "Compare the week-one flow diagram with the built app",
          detail:
            "Explain that documenting where reality differed from the plan is more useful than a diagram pretending otherwise.",
        },
        {
          step: "Review the data model and storage documentation",
          detail:
            "Explain that the record shape and where it lives is what lets someone else continue the work.",
        },
        {
          step: "Review the checklist results",
          detail:
            "Explain that recording what testing found and fixed is evidence the app was tested rather than assumed to work.",
        },
        {
          step: "Review the known gaps section",
          detail:
            "Explain that naming limits reads as competence, while presenting unfinished work as finished is judged more harshly than the same work with its limits stated.",
        },
      ],
    },
    practice: {
      title: "Final project: ship and document the prototype",
      brief:
        "You finish the expense tracker, produce a signed Android build, get it onto a real device by a route you choose deliberately, prepare the listing materials you would need, and write the documentation — scope, flow, data model, testing results and known gaps — that makes the work credible to someone who did not build it.",
      steps: [
        "Confirm the app passes your full pre-release checklist from the last session.",
        "Write your version one as a single sentence and list what you deliberately left out.",
        "Update the week-one screen flow diagram to match what you actually built.",
        "Note anywhere the built app differs from the plan and why.",
        "Document the data model: the record shape and where it is stored.",
        "Generate a keystore and back it up in more than one place.",
        "Confirm the keystore is not in your public repository.",
        "Produce a signed Android build.",
        "Choose a distribution route and write one sentence on why you chose it.",
        "Install the build on a real device by that route and confirm it runs.",
        "Confirm persistence, offline behaviour and the error states on the installed build.",
        "Prepare app icon and screenshots at the resolutions a store would require.",
        "Write a short description within a store's character limit.",
        "Write a full description that explains what the app does without padding.",
        "Write a privacy policy accurate about your actual data handling and host it at a public URL.",
        "Draft the data safety declaration, naming every SDK that collects anything.",
        "Write what iOS publishing would require, including the macOS requirement and its cost.",
        "Record your testing results with every failure found and its fix.",
        "Write the known gaps honestly, including what was not tested.",
        "Have someone who did not build it read the documentation and tell you what is unclear.",
      ],
      standard:
        "A finished, documented prototype: the full pre-release checklist passed; version one written as a single sentence with deliberate omissions listed; the week-one flow diagram updated to match the built app with every difference from the plan noted; the data model documented with record shape and storage location; a keystore generated, backed up in more than one place and confirmed absent from the public repository; a signed Android build produced and installed on a real device by a deliberately chosen route with the reasoning written down, and persistence, offline behaviour and error states confirmed on the installed build; an app icon and screenshots prepared at store resolutions, a short description within a store's character limit, a full description without padding, a privacy policy accurate about actual data handling and hosted at a public URL, and a data safety declaration drafted naming every collecting SDK; the iOS publishing requirements written including the macOS requirement and its cost; testing results recorded with every failure and fix; known gaps written honestly including what was not tested; and the documentation read by someone who did not build it with their points of confusion addressed.",
    },
    pitfalls: [
      {
        problem: "You lose your keystore",
        fix: "Back it up in multiple places now. It identifies you as the publisher and every update needs the same key, so losing it means losing the app — the one irreversible mistake in publishing.",
      },
      {
        problem: "You commit your keystore to a public repository",
        fix: "Keep it out of version control entirely. Anyone with your signing key can publish updates as you.",
      },
      {
        problem: "You discover you need a privacy policy on launch day",
        fix: "Write and host it while you build. It is mandatory on both stores even for an app that collects nothing, and it takes an afternoon early and a week late.",
      },
      {
        problem: "You declare that you collect no data while an SDK does",
        fix: "Audit every dependency and declare accurately. A data safety declaration that does not match reality is how developer accounts get suspended.",
      },
      {
        problem: "You resize one screenshot for every device type",
        fix: "Capture genuine screenshots per required resolution. Stores specify sizes, and resized captures look wrong and can be rejected.",
      },
      {
        problem: "You assume the store review will be quick and will pass",
        fix: "Budget for a rejection and a resubmission. Review is neither instant nor guaranteed, and common rejections are missing privacy policies, broken functionality and undeclared data collection.",
      },
      {
        problem: "You plan App Store publishing from a Windows laptop",
        fix: "Plan for the reality: macOS is required for final builds. Cloud builds, rented Macs and collaborators are legitimate but none is free.",
      },
      {
        problem: "You present the prototype as finished",
        fix: "State the known gaps. Naming limits reads as competence, while claiming completeness invites scrutiny that unfinished work will not survive.",
      },
    ],
    expertNotes: [
      "Back up your keystore in more than one place before you publish anything. It identifies you as the publisher and every future update needs the same key, so losing it means losing the app — the only genuinely irreversible mistake in this whole process.",
      "Write and host the privacy policy while you build, not when you launch. It is mandatory on both stores even for an app that collects nothing, and discovering it on launch day costs a week rather than an afternoon.",
      "Declare your data handling accurately and audit every SDK. A data safety declaration that does not match what the app actually collects is how developer accounts get suspended, and it is entirely preventable.",
      "Document the known gaps as carefully as the features. Naming what was not built and not tested reads as competence and makes the work credible, while presenting an unfinished prototype as finished invites scrutiny it will not survive.",
    ],
    vocabulary: [
      { term: "Build", meaning: "Producing the app package from source code. The first of three separate steps people conflate." },
      { term: "Keystore", meaning: "The private key identifying you as the publisher. Every update needs the same one; losing it means losing the app." },
      { term: "Signing", meaning: "Proving the package came from you and is unaltered. Done with the keystore before distribution." },
      { term: "Direct distribution", meaning: "Sharing an Android package by link or message, with no store. Often the right and free answer for a small user group." },
      { term: "Internal testing track", meaning: "Play's limited distribution list. Usually more appropriate for a course project than a public listing." },
      { term: "Privacy policy", meaning: "A public URL describing what the app does with data. Mandatory on both stores, even when nothing is collected." },
      { term: "Data safety declaration", meaning: "What you collect, whether it is linked to a user, whether it is shared. Declaring inaccurately risks account suspension." },
      { term: "Known gaps", meaning: "What is not built and not tested, stated plainly. What makes a prototype credible rather than defensive." },
    ],
    homework: [
      {
        task: "Produce and install a signed Android build",
        detail:
          "Generate a keystore, back it up, build, and install on a real device. Confirm persistence and offline behaviour on the installed build, not just in development.",
      },
      {
        task: "Write a privacy policy for your app",
        detail:
          "Accurate about what it actually collects, including anything an SDK collects, and hosted at a public URL. This is the item most people discover too late.",
      },
      {
        task: "Prepare a store listing",
        detail:
          "Icon, screenshots per required resolution, a short description within the character limit, and a full description without padding. Note how long it took.",
      },
      {
        task: "Write your known gaps",
        detail:
          "What is not built, what is not tested, what would break under real use. Then have someone read it and tell you whether the work sounds credible.",
      },
    ],
    rubric: [
      {
        criterion: "The build",
        passing: "App runs in development.",
        excellent: "A signed Android build produced from a backed-up keystore confirmed absent from version control, installed on a real device by a deliberately chosen route, with persistence, offline behaviour and error states confirmed on the installed build.",
      },
      {
        criterion: "Publishing knowledge",
        passing: "Knows the stores exist.",
        excellent: "Building, signing and distributing distinguished, Play requirements described accurately including fees and testing tracks, and the macOS requirement for App Store builds stated without evasion along with its real cost.",
      },
      {
        criterion: "Listing materials",
        passing: "Has an icon.",
        excellent: "Icon and per-resolution screenshots prepared, short and full descriptions written, a privacy policy accurate about actual data handling and hosted at a public URL, and a data safety declaration naming every collecting SDK.",
      },
      {
        criterion: "Documentation",
        passing: "Explains the app.",
        excellent: "Version one in one sentence with deliberate omissions, the flow diagram updated to match reality with differences noted, the data model documented, and testing results recorded with every failure and fix.",
      },
      {
        criterion: "Honesty",
        passing: "Describes the project accurately.",
        excellent: "Known gaps stated plainly including what was not tested, the documentation reviewed by someone who did not build it, and their points of confusion addressed.",
      },
    ],
    faqs: [
      {
        q: "Can I publish an app without a store?",
        a: "On Android, yes — an app can be shared as a package file by link, message or website and installed directly. For a first project, a church media team or a small business with a handful of users, this is often the right answer and costs nothing. iOS requires the App Store.",
      },
      {
        q: "What does it cost to publish?",
        a: "Google Play charges a one-time registration fee; Apple charges an annual developer fee, so iOS is a recurring cost rather than a one-off. Neither fee includes the macOS hardware Apple's build tools require, which is a separate real cost if you do not already own one.",
      },
      {
        q: "I do not have a Mac. Can I still publish to the App Store?",
        a: "Not from your own machine — Apple's build and upload tools require macOS and there is no supported workaround. The legitimate options are a cloud build service, a rented Mac, or a client or collaborator who has one, and all of them cost something.",
      },
      {
        q: "Do I need a privacy policy if my app collects nothing?",
        a: "Yes. Both stores require a privacy policy at a public URL regardless of what the app collects, and it must accurately describe your data handling — including anything a third-party SDK collects. It is the requirement most people discover on launch day.",
      },
      {
        q: "What should I include in the final documentation?",
        a: "Version one in one sentence with what you left out, the updated screen flow including where reality differed, the data model and where it is stored, your testing results with what you found and fixed, and the known gaps stated honestly. The gaps are what make the rest credible.",
      },
    ],
  },
};
