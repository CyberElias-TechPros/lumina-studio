import type { SessionLecture } from "../types";

/**
 * Web Development — ₦30,000 · 6 weeks · 12 sessions.
 * Sessions 10 to 12. (1–3 in web-development.ts, 4–6 in -b.ts, 7–9 in -c.ts.)
 */
export const webDevelopmentLessonsD: Record<string, SessionLecture> = {
  "debugging-and-quality": {
    summary:
      "Debugging is a method, not a talent, and quality is a set of checks you run rather than a feeling you have. This session covers developer tools, systematic debugging, responsive testing, performance basics, accessibility and basic SEO.",
    objectives: [
      "Use the browser developer tools deliberately",
      "Debug systematically rather than by changing things at random",
      "Read an error message and act on what it says",
      "Test responsively across real widths",
      "Find and fix the performance problems that matter most",
      "Run accessibility and SEO checks before publishing",
    ],
    blocks: [
      {
        heading: "Developer tools",
        body: [
          "The developer tools are the single most useful thing in a browser, and most people use a fraction of them. The **Elements panel** shows the live DOM and the styles applied to whatever you select — including which rule won and which were overridden, struck through. That last part answers 'why is my CSS not applying' faster than anything else.",
          "The **Console** runs JavaScript and shows errors. An error there is a gift: it names the problem and, usually, the exact line. The **Network panel** shows every request the page made, how long each took, and what failed — which is how you find a missing image or a request that never returns. The **Lighthouse** tab runs an automated audit of performance, accessibility and SEO and tells you specifically what to fix.",
          "The habit to build is **looking before changing**. Most time lost in debugging is spent editing code based on a guess about what is wrong. Ten seconds in the Elements panel usually tells you what is actually happening, and then the fix is obvious.",
        ],
      },
      {
        heading: "Debugging systematically",
        body: [
          "The method is short and it works. **Reproduce it reliably** — a bug you cannot trigger on demand you cannot fix. **Read the error**, all of it; the first line usually names the cause and the rest is the trail. **Form one hypothesis** about the cause. **Test that hypothesis with the smallest possible change.** Then either it is fixed, or the hypothesis was wrong and you form the next one.",
          "The failure mode is the opposite: changing several things at once and seeing whether it improves. When it does improve you do not know which change worked, so the bug remains partly there; when it does not, you have made the code worse and lost the state you were reasoning about. **One change at a time** is slower per attempt and dramatically faster overall.",
          "Then the two techniques that find almost anything. **`console.log` the values** at each step, because a bug is nearly always a value that is not what you assumed — and logging beats staring at code, which shows you what you meant to write. And **bisect**: comment out half the code and see whether the bug persists, then halve the remaining half. A few rounds locate the cause in code you would otherwise search for an hour.",
        ],
      },
      {
        heading: "Reading error messages",
        body: [
          "Error messages read like accusations and are actually instructions. **'Cannot read properties of null'** means you tried to use something that was not there — a selector that matched nothing, or a value that had not loaded yet. **'is not a function'** means you called something that is not callable, usually a typo in the name or a missing import. **'Unexpected token'** is almost always a missing bracket, quote or comma a few lines above the reported line.",
          "The discipline is to **read the whole message and the line number**, then look at that line before theorising. Most people read the first three words and start guessing. The line number is nearly always right, and the code there nearly always tells you what happened.",
          "Then a distinction worth internalising: a **syntax error** stops the script entirely and nothing runs, while a **runtime error** stops execution at that point and everything before it already happened. If your whole page is dead, look for a syntax error; if one thing does not work, look for a runtime error at the moment that thing runs. Knowing which you have halves the search.",
        ],
      },
      {
        heading: "Responsive and performance testing",
        body: [
          "Responsive testing means **actually looking at the page at real widths**, not resizing once and assuming. Test at roughly **320px** (a small phone, where things break first), **375px**, **768px** (a tablet), **1024px** and **1440px**. The device toolbar in developer tools does this, and it also simulates touch — which catches buttons too small to tap, a problem you cannot see with a mouse.",
          "Then check the things that only appear at small sizes: text overflowing its container, images wider than the screen causing horizontal scroll, tap targets smaller than about 44 pixels, and navigation that does not fit. **Horizontal scrolling on a phone is the clearest sign something is broken**, and it is almost always one element wider than the viewport.",
          "For **performance**, three things dominate and they are all fixable. **Image size** — by far the most common problem, because a 4MB photo from a phone makes a page take seconds to load on a mobile connection; resize and compress before uploading. **Render-blocking resources** — large stylesheets and scripts in the head that delay first paint; use `defer` on scripts. And **too many requests** — dozens of small files each cost a round trip. The Network panel shows all three, and Lighthouse names them for you.",
        ],
      },
      {
        heading: "Accessibility and SEO checks",
        body: [
          "Before publishing, run the accessibility checks from earlier in the course as a **list rather than a hope**: keyboard-only navigation reaching everything, visible focus everywhere, contrast at 4.5:1 or better, alt text on images, labels on inputs, one h1 with a logical outline, and no information conveyed by colour alone. Lighthouse audits most of this automatically and names what fails.",
          "Then **basic SEO**, which is mostly about being describable rather than tricks. A **`<title>`** on every page that says what the page is — not 'Home' on all of them. A **`meta description`** summarising the page, which is what appears in search results. **One h1** stating the subject, with headings nested logically so the outline describes the content. **Alt text** on images, which is also how images appear in image search. And a **`lang`** attribute on the html element so the language is known.",
          "The honest summary is that **good semantics is most of SEO**. A page built with the right elements, real headings, descriptive links and alt text is already well optimised, because those are exactly the signals search engines read. There is no separate technique to learn — the accessible page and the searchable page are the same page.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor takes a deliberately broken page and fixes it live using only the tools: reading the console error and the line number, inspecting which CSS rule won, bisecting the JavaScript, finding the element causing horizontal scroll on a phone, identifying an oversized image in the Network panel, and running Lighthouse to name the accessibility and SEO failures.",
      steps: [
        {
          step: "Reproduce the bug reliably",
          detail:
            "Trigger it on demand and note the exact steps. Explain that a bug you cannot reproduce on demand cannot be fixed, only stumbled into fixing.",
        },
        {
          step: "Read the console error fully",
          detail:
            "Read the whole message and the line number before touching code. Explain that most people read three words and start guessing.",
        },
        {
          step: "Classify the error",
          detail:
            "Decide whether it is syntax or runtime. Explain that a dead page means syntax while one broken feature means runtime, which halves the search.",
        },
        {
          step: "Inspect which CSS rule won",
          detail:
            "Open the Styles pane and show the overridden rules struck through. Explain that this answers 'why is my CSS not applying' faster than anything else.",
        },
        {
          step: "Log the values",
          detail:
            "Add console.log at each step and find the value that is not what was assumed. Explain that logging beats staring, because code shows what you meant to write.",
        },
        {
          step: "Bisect the code",
          detail:
            "Comment out half and retest, then halve again. Explain that a few rounds locate the cause in code you would otherwise search for an hour.",
        },
        {
          step: "Change one thing at a time",
          detail:
            "Contrast with changing three things at once. Explain that when several changes are made you cannot tell which worked and the bug remains partly there.",
        },
        {
          step: "Test at 320px",
          detail:
            "Open the device toolbar at a small phone width. Explain that this is where things break first and where problems are invisible at desktop size.",
        },
        {
          step: "Find the horizontal scroll",
          detail:
            "Locate the element wider than the viewport. Explain that horizontal scrolling on a phone is the clearest sign something is broken.",
        },
        {
          step: "Check tap target sizes",
          detail:
            "Simulate touch and measure the buttons. Explain that anything under about 44 pixels is difficult to hit with a thumb.",
        },
        {
          step: "Find the oversized image",
          detail:
            "Open the Network panel and sort by size. Show a multi-megabyte photo and explain that image size is the most common performance problem by far.",
        },
        {
          step: "Find the render-blocking script",
          detail:
            "Show a script in the head delaying first paint and add defer. Explain that the Network panel shows exactly what blocks and for how long.",
        },
        {
          step: "Run Lighthouse",
          detail:
            "Audit the page and read the accessibility and SEO failures it names. Explain that the accessible page and the searchable page are the same page.",
        },
      ],
    },
    practice: {
      title: "Debug and audit a real project",
      brief:
        "You take a real project, debug its problems using the method rather than by changing things at random, then audit it: five real widths tested, performance issues found in the Network panel and fixed, and Lighthouse run for accessibility and SEO with every named failure addressed.",
      steps: [
        "Reproduce each bug reliably and write the exact steps.",
        "Read each console error fully, including the line number, before editing anything.",
        "Classify each error as syntax or runtime.",
        "Use the Styles pane to find which CSS rule won for every styling problem.",
        "Log values at each step rather than guessing what they are.",
        "Bisect any bug you cannot locate by inspection.",
        "Change one thing at a time and confirm each fix before making the next.",
        "Test the page at 320px, 375px, 768px, 1024px and 1440px.",
        "Find and fix any element causing horizontal scroll on a phone.",
        "Measure tap targets and enlarge anything under about 44 pixels.",
        "Open the Network panel and sort by size to find the largest resources.",
        "Resize and compress any oversized image before uploading it.",
        "Add defer to any render-blocking script in the head.",
        "Run the accessibility checklist: keyboard, focus, contrast, alt, labels, headings, colour.",
        "Check every page has a descriptive title, a meta description, one h1 and a lang attribute.",
        "Run Lighthouse and fix every failure it names.",
        "Re-run Lighthouse and record the before and after scores.",
      ],
      standard:
        "A project where every bug was reproduced reliably with the console error read in full and classified as syntax or runtime, the Styles pane used to identify the winning rule, values logged rather than assumed, bisection used where inspection failed, and one change made at a time; tested at 320, 375, 768, 1024 and 1440 pixels with horizontal scroll eliminated and tap targets at 44 pixels or more; the Network panel used to find and compress oversized images and defer render-blocking scripts; the full accessibility checklist run and every failure fixed; every page given a descriptive title, meta description, single h1 and lang attribute; and Lighthouse run before and after with every named failure addressed and both scores recorded.",
    },
    pitfalls: [
      {
        problem: "You change code based on a guess",
        fix: "Look first. Ten seconds in the Elements panel usually shows what is actually happening, and most time lost in debugging is spent editing based on an assumption about the cause.",
      },
      {
        problem: "You change several things at once",
        fix: "One change at a time. With several changes you cannot tell which worked, so the bug stays partly there, and if it gets worse you have lost the state you were reasoning about.",
      },
      {
        problem: "You read three words of the error and start guessing",
        fix: "Read the whole message and the line number, then look at that line. The line number is nearly always right and the code there nearly always tells you what happened.",
      },
      {
        problem: "You stare at the code instead of logging",
        fix: "Log the values at each step. A bug is almost always a value that is not what you assumed, and code shows you what you meant to write rather than what it does.",
      },
      {
        problem: "You test at one width and assume the rest",
        fix: "Test at 320, 375, 768, 1024 and 1440 pixels. Small phones are where things break first, and a problem invisible at desktop size is obvious at 320.",
      },
      {
        problem: "Your page scrolls sideways on a phone",
        fix: "Find the element wider than the viewport and constrain it. Horizontal scrolling is the clearest sign something is broken and it is almost always one element.",
      },
      {
        problem: "You upload photos straight from a phone",
        fix: "Resize and compress before uploading. A multi-megabyte image is the most common performance problem by far, and it makes the page take seconds to load on a mobile connection.",
      },
      {
        problem: "You treat SEO as a separate technique",
        fix: "Good semantics is most of SEO. Descriptive titles, real headings, meaningful link text and alt text are exactly the signals search engines read, so the accessible page and the searchable page are the same page.",
      },
    ],
    expertNotes: [
      "Look in the developer tools before changing any code. Most debugging time is lost editing based on a guess, and ten seconds in the Elements panel usually shows what is actually happening, after which the fix is obvious.",
      "Change one thing at a time and confirm each fix. Changing several things at once is slower overall, because you cannot tell which change worked and the bug stays partly there.",
      "Test at 320px as well as desktop. Small phones are where layouts break first, tap targets become too small, and horizontal scroll appears — all invisible at desktop width.",
      "Resize and compress every image before uploading. Image size dominates page weight far more than any other factor, and a multi-megabyte photo makes a page unusable on the mobile connections most people here have.",
    ],
    vocabulary: [
      { term: "Elements panel", meaning: "The live DOM and applied styles, with overridden rules struck through. Answers 'why is my CSS not applying'." },
      { term: "Console", meaning: "Where errors appear and JavaScript runs. An error there names the problem and usually the line." },
      { term: "Network panel", meaning: "Every request, its size and its duration. How you find missing files and oversized images." },
      { term: "Lighthouse", meaning: "An automated audit of performance, accessibility and SEO that names specific failures to fix." },
      { term: "Bisection", meaning: "Halving the code repeatedly to locate a bug. Finds the cause in rounds rather than by searching." },
      { term: "Syntax error", meaning: "Stops the whole script; nothing runs. Distinguished from a runtime error, which stops only from that point." },
      { term: "Tap target", meaning: "A control's clickable size. Under about 44 pixels it is difficult to hit with a thumb." },
      { term: "Render-blocking resource", meaning: "A stylesheet or script in the head delaying first paint. Scripts should carry defer." },
    ],
    homework: [
      {
        task: "Debug one bug by the method",
        detail:
          "Reproduce it, read the whole error and line number, classify it as syntax or runtime, form one hypothesis, and test it with the smallest possible change. Note how much faster it was than guessing.",
      },
      {
        task: "Test one page at five widths",
        detail:
          "320, 375, 768, 1024 and 1440 pixels. Fix any horizontal scroll, any overflowing text, and any tap target under 44 pixels.",
      },
      {
        task: "Find your heaviest resource",
        detail:
          "Open the Network panel, sort by size, and compress or resize the largest item. Note the difference in load time, particularly on a throttled connection.",
      },
      {
        task: "Run Lighthouse and fix the failures",
        detail:
          "Record the before scores, fix every accessibility and SEO failure it names, then re-run and record the after scores. Keep both — the improvement is portfolio evidence.",
      },
    ],
    rubric: [
      {
        criterion: "Tool use",
        passing: "Opens developer tools.",
        excellent: "Elements, Console, Network and Lighthouse each used for the problem they answer, with the tools consulted before code is edited.",
      },
      {
        criterion: "Debugging method",
        passing: "Fixes bugs eventually.",
        excellent: "Bugs reproduced reliably, errors read in full and classified, one hypothesis tested with the smallest change, bisection used where inspection failed, and one change at a time.",
      },
      {
        criterion: "Responsive testing",
        passing: "Works on a phone.",
        excellent: "Tested at five real widths with horizontal scroll eliminated, overflow fixed, and tap targets at 44 pixels or more with touch simulated.",
      },
      {
        criterion: "Performance",
        passing: "Loads reasonably.",
        excellent: "The Network panel used to find the largest resources, images resized and compressed, render-blocking scripts deferred, and the improvement measured.",
      },
      {
        criterion: "Accessibility and SEO",
        passing: "Looks fine.",
        excellent: "The full checklist run with every failure fixed, every page carrying a descriptive title, meta description, single h1 and lang attribute, and Lighthouse run before and after with both scores recorded.",
      },
    ],
    faqs: [
      {
        q: "Where do I start when something is broken?",
        a: "Open the Console and read the error in full, including the line number, before editing anything. Then reproduce the bug reliably so you can tell whether a change fixed it. Most debugging time is lost by guessing before looking.",
      },
      {
        q: "Why is my CSS not applying?",
        a: "Open the Elements panel, select the element, and look at the Styles pane. Overridden rules are struck through, so you can see immediately which rule won and why — it is nearly always specificity or a later rule with equal specificity.",
      },
      {
        q: "My page is slow. What is causing it?",
        a: "Open the Network panel and sort by size. It is almost always images — a multi-megabyte photo from a phone makes a page take seconds to load on a mobile connection. Resize and compress before uploading, and add defer to any script in the head.",
      },
      {
        q: "How do I test responsively without five devices?",
        a: "Use the device toolbar in developer tools at 320, 375, 768, 1024 and 1440 pixels, and enable touch simulation. That catches the problems a mouse cannot: tap targets too small, hover-dependent interactions, and layouts that only break at small widths.",
      },
      {
        q: "Do I need to learn SEO techniques?",
        a: "Not really. A descriptive title on every page, a meta description, one h1 with a logical heading outline, meaningful link text and alt text on images is most of it — because those are exactly the signals search engines read. The accessible page and the searchable page are the same page.",
      },
    ],
  },

  "deployment-and-git": {
    summary:
      "A project on your machine is unfinished work. This session covers testing and cleaning up before release, a real Git workflow with branches, deployment concepts, hosting options, and getting a domain — then putting a project live.",
    objectives: [
      "Test and fix a project before anyone else sees it",
      "Clean up code so it is readable by someone else",
      "Use branches and pull requests rather than committing to main",
      "Explain what deployment actually does",
      "Choose a host and publish a site",
      "Understand what a domain is and how it connects",
    ],
    blocks: [
      {
        heading: "Testing before release",
        body: [
          "Test the things that only break in someone else's hands. **Every link** — a link that goes nowhere is the most common defect on a small site and takes two minutes to find. **Every form**, submitted with real data and with nonsense. **Every page at every width** you tested before. **Images** all loading, with no missing files showing broken icons.",
          "Then the checks people forget. **Console errors** — open the developer tools on every page and confirm it is clean, because an error you have learned to ignore is still breaking something for a visitor. **Loading on a slow connection** — throttle the network in developer tools, because a page that loads instantly on your machine may take ten seconds on mobile data. **Another browser and another device** if you can, since a layout that works in one engine does not always work in another.",
          "And the honest one: **have someone else use it**. Watch them, without explaining anything. Where they hesitate or click the wrong thing is where the design failed, and you cannot find those problems yourself because you already know how it works.",
        ],
      },
      {
        heading: "Cleaning up the code",
        body: [
          "Code cleanup is not vanity — it is whether anyone, including you in three months, can work on the project again. Remove **dead code**: commented-out blocks you kept 'just in case', functions nothing calls, styles applied to elements that no longer exist. A reader cannot tell which commented code is a note and which is abandoned, so both become noise.",
          "Then **consistency**: the same naming style throughout, the same indentation, the same way of doing the same thing. Inconsistent code forces a reader to re-learn your conventions in every file. A formatter removes this work entirely — configure one once and it enforces the style on save, so consistency costs nothing.",
          "And **remove anything secret before you publish**. API keys, passwords, test credentials and personal data must not be in a public repository, and this is urgent rather than tidy: once pushed, a secret is in the history forever and must be treated as compromised and rotated. Keep secrets out of the repository from the start rather than removing them later.",
        ],
      },
      {
        heading: "Git workflow",
        body: [
          "The core loop is **`add`, `commit`, `push`**, and the discipline is small commits with messages explaining **why**. 'Add contact form validation' tells you something in six months; 'fixed stuff' does not. Commit after each working change rather than at the end of a session, because small commits are easy to understand, easy to review and easy to undo.",
          "Then **branches**, which let you work on something without disturbing the working version. `git branch feature-name` creates one, `git checkout feature-name` moves you onto it, and commits there do not touch `main` until you merge. This matters even on a solo project: it means you can experiment without fear, and `main` always holds a version that works.",
          "A **pull request** is a request to merge a branch, and it is where changes get reviewed before they land. On a team it is the normal way code moves forward; on a solo project it is still useful, because the diff view shows you exactly what you changed and the description forces you to say why. Then `git pull` brings others' changes down, and when two people edited the same lines you get a **merge conflict** — Git shows you both versions and you choose. Conflicts are normal, not a failure, and the fix is to read both sides and decide deliberately.",
        ],
      },
      {
        heading: "What deployment is",
        body: [
          "**Deployment** means putting your files somewhere a browser can reach them over the internet. For a static site — HTML, CSS and JavaScript, with no server code — that is genuinely all it is: your files, on a machine that is always on, served at an address. There is no compilation step and no server configuration to learn.",
          "The modern way is a **hosting platform connected to your GitHub repository**. You authorise it, choose the repository, and it publishes the site and gives you a URL. Then every `git push` **redeploys automatically**, which means publishing is not a separate nervous step — you push, and a minute later the live site is updated. This removes the entire class of 'I forgot to upload the new file' problems.",
          "The alternative is uploading files by FTP to a traditional host, which still exists and still works, but it is manual, error-prone and easy to get out of sync with what is in your repository. For a new project there is no reason to prefer it, and the automatic route means your live site always matches your repository.",
        ],
      },
      {
        heading: "Hosting and domains",
        body: [
          "For a static site, **free tiers are genuinely adequate** — platforms like GitHub Pages, Netlify and Vercel host static sites at no cost with HTTPS included, which was not true a few years ago and is worth knowing. Their free URLs are subdomains of theirs, which is fine for a portfolio project and worth replacing when the site represents a business.",
          "A **domain** is the human-readable address — `yourname.com` — and it is bought from a registrar, usually for a modest annual fee in naira or dollars. Owning it means you can move hosts without changing your address, which matters: a site on a platform's subdomain is tied to that platform, and a business built on someone else's address is fragile.",
          "Connecting them is a matter of **DNS records** — you tell the registrar where the site actually lives, usually by pointing the domain at the host or adding the records the host gives you. It takes minutes to configure and up to a day to propagate, which is why a newly connected domain sometimes appears not to work immediately. It is working; it has not spread yet.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor takes a finished project through release: testing every link and form, cleaning the code and removing a committed secret, creating a branch and opening a pull request, merging it, connecting the repository to a host so a push redeploys automatically, then pointing a real domain at it.",
      steps: [
        {
          step: "Click every link",
          detail:
            "Go through the whole site and confirm each destination. Explain that a dead link is the most common defect on a small site and takes minutes to find.",
        },
        {
          step: "Submit every form twice",
          detail:
            "Once with real data and once with nonsense. Explain that the nonsense submission is the one that reveals missing validation.",
        },
        {
          step: "Check the console on every page",
          detail:
            "Confirm it is clean. Explain that an error you have learned to ignore is still breaking something for a visitor.",
        },
        {
          step: "Throttle the network",
          detail:
            "Reload on a simulated slow connection. Explain that a page instant on your machine may take ten seconds on mobile data.",
        },
        {
          step: "Watch someone else use it",
          detail:
            "Observe without explaining anything. Explain that where they hesitate is where the design failed, and you cannot find those problems yourself.",
        },
        {
          step: "Remove dead code",
          detail:
            "Delete commented-out blocks, unused functions and styles for elements that no longer exist. Explain that a reader cannot distinguish a note from abandoned code.",
        },
        {
          step: "Set up a formatter",
          detail:
            "Configure one and format the project. Explain that consistency then costs nothing because it is enforced on save.",
        },
        {
          step: "Find and remove a secret",
          detail:
            "Locate a key in the history and explain that it must be rotated. Explain that once pushed, a secret is in the history forever.",
        },
        {
          step: "Create a branch",
          detail:
            "Branch, commit there, and show that main is untouched. Explain that this means you can experiment without fear.",
        },
        {
          step: "Open a pull request",
          detail:
            "Push the branch and open the request with a description. Explain that the diff shows exactly what changed and the description forces you to say why.",
        },
        {
          step: "Merge and resolve a conflict",
          detail:
            "Merge the branch, then create and resolve a conflict deliberately. Explain that conflicts are normal and the fix is to read both sides and decide.",
        },
        {
          step: "Connect the host",
          detail:
            "Authorise the platform against the repository and publish. Explain that every push then redeploys automatically, so the live site always matches the repository.",
        },
        {
          step: "Push and watch it deploy",
          detail:
            "Make a change, push, and reload the live URL. Explain that this removes the whole class of 'I forgot to upload the file' problems.",
        },
        {
          step: "Point a domain at it",
          detail:
            "Add the DNS records the host provides. Explain that propagation can take up to a day, so a domain that does not work immediately is usually working.",
        },
      ],
    },
    practice: {
      title: "Take a project live",
      brief:
        "You take a finished project through the whole release: every link and form tested, the console clean on every page, the code cleaned and secrets removed, a branch created and merged through a pull request, the repository connected to a host that redeploys on push, and a domain pointed at it — with a written record of what each step involved.",
      steps: [
        "Click every link on every page and fix any dead destination.",
        "Submit every form with valid data and confirm it works.",
        "Submit every form with nonsense and confirm validation catches it.",
        "Open the console on every page and fix any error.",
        "Throttle the network and confirm the page is usable on a slow connection.",
        "Have one person use the site while you watch without explaining.",
        "Note where they hesitated and fix the most serious problem found.",
        "Delete commented-out code, unused functions and orphaned styles.",
        "Run a formatter so the style is consistent throughout.",
        "Search the repository and its history for any secret and rotate anything found.",
        "Create a branch for your remaining changes.",
        "Commit with messages explaining why, then push the branch.",
        "Open a pull request with a description of what changed and why.",
        "Merge the branch into main.",
        "Connect the repository to a static host and publish.",
        "Make a small change, push, and confirm the live site updates automatically.",
        "Register a domain and add the DNS records your host provides.",
        "Confirm the site loads over HTTPS on your own domain.",
        "Write down what each step involved and what surprised you.",
      ],
      standard:
        "A live project where every link was clicked and every form submitted with both valid and invalid data, the console confirmed clean on every page, usability checked on a throttled connection and by watching an uninstructed person with the most serious problem found actually fixed; dead code removed, a formatter applied, the repository and history searched for secrets with anything found rotated; a branch created and merged through a pull request with a descriptive message and explanation; the repository connected to a static host that redeploys on push and verified by pushing a change; and a registered domain with DNS records added, loading over HTTPS — with a written record of each step.",
    },
    pitfalls: [
      {
        problem: "You publish without clicking every link",
        fix: "Test every link on every page. A dead link is the most common defect on a small site, it is immediately visible to a visitor, and it takes two minutes to find.",
      },
      {
        problem: "You ignore console errors you have got used to",
        fix: "Fix them before publishing. An error you have learned to tolerate is still breaking something for a visitor, and a clean console is a basic mark of finished work.",
      },
      {
        problem: "You only test on your own fast connection",
        fix: "Throttle the network in developer tools. A page that loads instantly on your machine may take ten seconds on mobile data, which is how most people will reach it.",
      },
      {
        problem: "You keep commented-out code 'just in case'",
        fix: "Delete it — Git has the history if you need it back. A reader cannot tell which commented code is a note and which is abandoned, so both become noise.",
      },
      {
        problem: "You pushed a secret to a public repository",
        fix: "Treat it as compromised and rotate it immediately. Removing it from the current file does not remove it from the history, so it must be considered exposed.",
      },
      {
        problem: "You commit everything to main",
        fix: "Use a branch and merge through a pull request. Even solo, it means main always holds a working version and the diff shows you exactly what changed.",
      },
      {
        problem: "You deploy by uploading files manually",
        fix: "Connect the repository to a host that redeploys on push. Manual uploading drifts out of sync with the repository, and automatic deployment removes the whole class of forgotten-file problems.",
      },
      {
        problem: "You panic when a new domain does not work immediately",
        fix: "DNS propagation can take up to a day. The records are usually correct and simply have not spread yet, so wait before changing anything.",
      },
    ],
    expertNotes: [
      "Have someone else use your site while you watch and say nothing. Where they hesitate or click wrongly is where the design failed, and you cannot find those problems yourself because you already know how it works.",
      "Connect your repository to a host that redeploys on push. It makes the live site always match the repository and removes the entire class of forgotten-upload problems, which is the most common way a small site goes stale.",
      "Never commit a secret, and rotate immediately if you do. Removing a key from the current file does not remove it from Git history, so once pushed it must be treated as compromised.",
      "Own your domain rather than building on a platform subdomain. It costs little annually and it means you can change hosts without changing your address — a business built on someone else's address is fragile.",
    ],
    vocabulary: [
      { term: "Deployment", meaning: "Putting your files where a browser can reach them. For a static site, that is genuinely all it is." },
      { term: "Branch", meaning: "A line of work that does not disturb main. Lets you experiment without risk." },
      { term: "Pull request", meaning: "A request to merge a branch, with a diff and a description. Where changes are reviewed before landing." },
      { term: "Merge conflict", meaning: "Two edits to the same lines. Normal, not a failure; resolved by reading both sides and deciding." },
      { term: "Static hosting", meaning: "Serving HTML, CSS and JavaScript with no server code. Free tiers with HTTPS are adequate for most portfolios." },
      { term: "Continuous deployment", meaning: "Redeploying automatically on every push. Makes the live site always match the repository." },
      { term: "Domain", meaning: "A human-readable address you own. Lets you change hosts without changing your address." },
      { term: "DNS propagation", meaning: "The spread of new DNS records. Can take up to a day, so a new domain may appear not to work immediately." },
    ],
    homework: [
      {
        task: "Run a pre-release test pass",
        detail:
          "Every link, every form twice, the console on every page, and the page on a throttled connection. Write down what you found — it is usually more than you expected.",
      },
      {
        task: "Clean up one project",
        detail:
          "Delete commented-out code, unused functions and orphaned styles, then run a formatter. Search the history for any secret and rotate anything you find.",
      },
      {
        task: "Use a branch and a pull request",
        detail:
          "Branch, commit with messages explaining why, push, open a pull request with a description, and merge. Do it once on a solo project and it becomes the default.",
      },
      {
        task: "Publish one site",
        detail:
          "Connect the repository to a free static host, confirm a push redeploys automatically, then register a domain and add the DNS records.",
      },
    ],
    rubric: [
      {
        criterion: "Testing",
        passing: "Checks it works.",
        excellent: "Every link clicked, every form submitted with valid and invalid data, the console clean on every page, and usability checked on a throttled connection and by an uninstructed person.",
      },
      {
        criterion: "Code quality",
        passing: "Code runs.",
        excellent: "Dead code removed, a formatter enforcing consistent style, and the repository and its history searched for secrets with anything found rotated.",
      },
      {
        criterion: "Git workflow",
        passing: "Commits and pushes.",
        excellent: "Small commits with messages explaining why, work done on branches, changes merged through a pull request with a description, and conflicts resolved by reading both sides.",
      },
      {
        criterion: "Deployment",
        passing: "Has a live site.",
        excellent: "Connected to a host that redeploys on push, verified by pushing a change and watching it appear, so the live site always matches the repository.",
      },
      {
        criterion: "Domain and HTTPS",
        passing: "Uses a platform URL.",
        excellent: "A registered domain with DNS records added and propagation understood, loading over HTTPS, with the reasoning about owning an address explained.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between Git and GitHub?",
        a: "Git is version control running on your own machine — history, snapshots and recovery, with no internet required. GitHub is a place to store those snapshots online, which adds a backup, collaboration through pull requests, and a portfolio link. Git works fully without GitHub.",
      },
      {
        q: "Do I need branches if I work alone?",
        a: "It is still worth it. A branch means main always holds a version that works, so you can experiment without fear, and a pull request gives you a diff showing exactly what changed plus a description forcing you to say why. It costs seconds and pays off the first time something goes wrong.",
      },
      {
        q: "How much does it cost to put a site online?",
        a: "For a static site, nothing for hosting — GitHub Pages, Netlify and Vercel all have free tiers with HTTPS included. A domain costs a modest annual fee and is worth having so you can change hosts without changing your address.",
      },
      {
        q: "My domain is not working after I set it up. What is wrong?",
        a: "Probably nothing yet. DNS propagation can take up to a day, so the records are usually correct and simply have not spread. Check them once, then wait before changing anything — fiddling during propagation makes it harder to tell what worked.",
      },
      {
        q: "I committed a password to GitHub. Is it a problem?",
        a: "Yes, and you should treat it as exposed now. Removing it from the current file does not remove it from the history, so anyone can still find it. Rotate the credential immediately, and keep secrets out of repositories from the start rather than removing them later.",
      },
    ],
  },

  "portfolio-and-presentation": {
    summary:
      "The final project: build and publish a complete website, document the decisions you made, and present it. This is where the course becomes something you can show — and where most people discover that explaining your work is a separate skill from doing it.",
    objectives: [
      "Assemble a portfolio that demonstrates capability rather than listing it",
      "Write project documentation that shows your thinking",
      "Present technical work to people who are not technical",
      "Answer questions about decisions you made",
      "Take critique and turn it into a specific plan",
      "Plan the next stage of your development work",
    ],
    blocks: [
      {
        heading: "What a portfolio is for",
        body: [
          "A portfolio answers one question: **can this person do the work?** Not whether they have studied it, not which tools they can name. The strongest evidence is **a live, working thing** — a URL someone can visit on their phone right now — because it cannot be argued with and it demonstrates the whole chain: planning, building, testing, deploying.",
          "So **quality over quantity, and live over described**. Three finished, published projects with real content beat ten screenshots of unfinished work, and one genuinely good project beats three mediocre ones. A visitor forms an impression in about a minute, and a portfolio of half-finished things tells them you do not finish things, however skilled the fragments are.",
          "Then **the projects should be real**. A site for an actual business, organisation or person — even one you did at low cost — carries far more weight than an invented demo, because it involved a real brief, real constraints and a real person to answer to. If you have no client work, build something for a real local business in exchange for permission to show it, which is also how the first paid work usually arrives.",
        ],
      },
      {
        heading: "Documenting your decisions",
        body: [
          "The write-up is what separates a portfolio from a gallery, and it is the part almost everyone omits. Anyone can copy a layout; **explaining why you made the choices you made is what demonstrates understanding**. For each project, write what the problem was, what you decided, and why — including the alternatives you rejected.",
          "The structure that works: **the brief** in one or two sentences. **The decisions** — why Flexbox here and Grid there, why you validated on blur rather than on keystroke, why you used a system font stack rather than a web font. **The trade-offs**, honestly stated, including what you would do differently. **The result**, with anything measurable: a Lighthouse score, a load time, a real user's reaction.",
          "Stating trade-offs is the part that reads as professional. 'I used a system font stack because a web font would add a blocking request on the slow connections most visitors here have, at the cost of a less distinctive look' shows judgement. Claiming everything was optimal shows inexperience, because every technical decision trades something away and pretending otherwise is not credible.",
        ],
      },
      {
        heading: "Presenting to a mixed audience",
        body: [
          "Present in the order the listener thinks, not the order you built it. **Start with the problem and who has it.** Then **show the thing working** — live, on a phone, immediately, because a demonstration persuades where a description does not. Then **one or two decisions** and why you made them. Then **what you would do next**. Leave the technical detail for the questions.",
          "The mistake is presenting the technology to people who care about the outcome. A client does not need to hear about Flexbox; they need to see that the site works on their phone and loads quickly. **Lead with the outcome and keep the technique in reserve**, ready for whoever asks — because someone technical usually does, and that is your chance to show depth.",
          "Then **prepare for the questions that always come**: why did you choose that approach, what would you change, how long did it take, and what would it cost to add a feature. The last two are the ones people are least prepared for and the ones that decide whether you get paid work, so have honest answers ready rather than improvising.",
        ],
      },
      {
        heading: "Taking critique",
        body: [
          "Critique on technical work is unusually useful, because unlike subjective design feedback it is often **checkable**: the site does or does not work at 320px, the contrast does or does not meet 4.5:1, the console is or is not clean. Verify rather than argue — open the tools and look, which takes ten seconds and settles it.",
          "The discipline is the same as anywhere: **record it, do not defend it in the moment**. The instinct to explain what you meant costs you exactly the information you came for. Afterwards, sort the notes into three: **factually wrong** and must be fixed, **preference** worth considering, and **the critic's own context** — they build large applications and you built a small static site, which makes some of their advice inapplicable.",
          "When you **give** critique, be specific and be about the work. 'The navigation is not reachable by keyboard — tab stops at the logo' is useful and actionable. 'It needs work' helps nobody. And **name what works**, because knowing what to keep matters as much as knowing what to change, and feedback that is only negative produces someone who rebuilds rather than improves.",
        ],
      },
      {
        heading: "What comes next",
        body: [
          "After this course you can plan, build, test and publish a working website, and explain the decisions you made. That is genuinely employable and genuinely useful, and it is more than most people who say they 'know some HTML' can demonstrate — the difference being a live URL and an articulated reasoning behind it.",
          "The natural next steps branch by interest. **A framework** such as React is the usual next move and is what most job listings ask for, but it is far more valuable on top of solid fundamentals than instead of them — a framework is a way of organising the same HTML, CSS and JavaScript you now know. **Backend work** — a server, a database, an API — is what turns a static site into an application, and it is a substantial and separate discipline. **Specialism** in accessibility or performance is a smaller field with real demand and less competition.",
          "Whichever route, two habits determine how far you get. **Keep building and publishing**, because the portfolio is what opens doors and it only grows by shipping. And **read other people's code**, which is the fastest way to learn how experienced developers solve problems you have not met yet — every open-source project is a free textbook, and most people never open one.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor presents a completed project as a model: the problem, a live demonstration on a phone, two decisions explained with their trade-offs, the documentation walked through, then a critique session where a claimed fault is verified in the tools rather than argued about, and a next-steps plan written.",
      steps: [
        {
          step: "Choose the strongest project",
          detail:
            "Pick the finished, live one rather than the most ambitious unfinished one. Explain that a portfolio of half-finished work says you do not finish.",
        },
        {
          step: "Confirm it is genuinely live",
          detail:
            "Load it on a phone over a mobile connection. Explain that a URL someone can visit right now cannot be argued with, and a screenshot can.",
        },
        {
          step: "Write the brief in two sentences",
          detail:
            "State the problem and who has it. Explain that starting with the problem is what makes the technical choices meaningful.",
        },
        {
          step: "Document two decisions with trade-offs",
          detail:
            "Explain a layout choice and a validation choice, including the alternative rejected. Explain that stating trade-offs reads as judgement while claiming optimality reads as inexperience.",
        },
        {
          step: "Record something measurable",
          detail:
            "Capture a Lighthouse score or a load time. Explain that a number is evidence in a way an adjective is not.",
        },
        {
          step: "Present the problem first",
          detail:
            "Open with who has the problem rather than what was built. Explain that the listener thinks in outcomes before technology.",
        },
        {
          step: "Demonstrate live on a phone",
          detail:
            "Show it working immediately. Explain that a demonstration persuades where a description does not.",
        },
        {
          step: "Keep technique in reserve",
          detail:
            "Hold the Flexbox and validation detail for questions. Explain that a client needs the outcome and a technical listener will ask.",
        },
        {
          step: "Answer the cost and time questions",
          detail:
            "Give honest figures for how long it took and what a feature would cost. Explain that these decide whether you get paid work and are the least prepared for.",
        },
        {
          step: "Take critique without defending",
          detail:
            "Record every comment. Explain that explaining what you meant costs the information you came for.",
        },
        {
          step: "Verify a claimed fault",
          detail:
            "Open the tools and check rather than argue. Explain that technical critique is usually checkable, and ten seconds settles it.",
        },
        {
          step: "Sort the critique",
          detail:
            "Divide into factually wrong, preference and the critic's context. Explain that only the first must change.",
        },
        {
          step: "Write the next-steps plan",
          detail:
            "Choose a route and the first concrete step. Explain that the portfolio only grows by shipping, so the plan must end in something published.",
        },
      ],
    },
    practice: {
      title: "Final project: build, publish and present a complete website",
      brief:
        "You build and publish a complete website for a real brief, document the decisions and trade-offs with something measurable, assemble it into a portfolio, present it in five minutes leading with the problem and a live demonstration, take critique by verifying claims in the tools, and write a next-steps plan ending in something you will ship.",
      steps: [
        "Choose a real brief — a business, organisation or person — rather than an invented demo.",
        "Write the problem and who has it in two sentences.",
        "Plan the project: scope, must-haves, tasks ordered by risk.",
        "Build it with semantic HTML, accessible forms and a responsive layout.",
        "Test every link and form, and confirm the console is clean on every page.",
        "Test at 320, 375, 768, 1024 and 1440 pixels.",
        "Run Lighthouse and fix every accessibility and SEO failure it names.",
        "Put it under version control with meaningful commit messages.",
        "Deploy it and confirm it loads over HTTPS at a public URL.",
        "Document two decisions, each with the alternative you rejected.",
        "State the trade-offs honestly, including what you would do differently.",
        "Record one measurable result: a Lighthouse score or a load time.",
        "Write the portfolio entry: brief, decisions, trade-offs, result.",
        "Present in five minutes: problem, live demonstration, two decisions, next steps.",
        "Answer the time and cost questions with honest figures.",
        "Take critique in silence, then verify each factual claim in the tools.",
        "Sort the critique into wrong, preference and the critic's context.",
        "Write a next-steps plan ending in something you will actually publish.",
      ],
      standard:
        "A live website built for a real brief and reachable over HTTPS at a public URL, planned with scoped must-haves and risk-ordered tasks, built with semantic HTML, accessible forms and responsive layout, with every link and form tested, the console clean on every page, five widths tested, and every Lighthouse accessibility and SEO failure fixed; under version control with meaningful commits; documented with two decisions each stating the rejected alternative, honest trade-offs including what would be done differently, and one measurable result; presented in five minutes leading with the problem and a live demonstration with technique held in reserve and honest time and cost answers; all critique recorded in silence with factual claims verified in the tools and sorted into wrong, preference and context; and a next-steps plan ending in something that will actually be published.",
    },
    pitfalls: [
      {
        problem: "Your portfolio is ten unfinished projects",
        fix: "Show three finished, live ones. A visitor forms an impression in about a minute, and half-finished work tells them you do not finish things however skilled the fragments are.",
      },
      {
        problem: "Your projects are invented demos",
        fix: "Build for a real business or person, even at low cost. Real work involved a brief, constraints and a person to answer to, and it carries far more weight than a demo nobody asked for.",
      },
      {
        problem: "You show screenshots instead of a live URL",
        fix: "Publish it. A URL someone can visit on their phone right now cannot be argued with, while a screenshot can be anything — and a static site is free to host.",
      },
      {
        problem: "You document nothing",
        fix: "Write the brief, the decisions and the trade-offs. Anyone can copy a layout; explaining why you made your choices is what demonstrates understanding.",
      },
      {
        problem: "You claim every decision was optimal",
        fix: "State the trade-offs. Every technical decision gives something up, and pretending otherwise is not credible to anyone who has built something.",
      },
      {
        problem: "You present the technology to non-technical listeners",
        fix: "Lead with the problem and a live demonstration, and keep the technique in reserve for questions. A client needs to see it work, not hear about Flexbox.",
      },
      {
        problem: "You have no answer for 'how much would that cost?'",
        fix: "Prepare honest figures for time and for adding a feature. These questions decide whether you get paid work, and improvising an answer usually loses it.",
      },
      {
        problem: "You argue with critique instead of checking it",
        fix: "Open the tools and verify. Technical critique is usually checkable — the site does or does not work at 320px — and ten seconds settles what an argument would not.",
      },
    ],
    expertNotes: [
      "Publish everything and show your strongest three. A live URL cannot be argued with and demonstrates the whole chain from planning to deployment, while a portfolio of half-finished work tells a visitor you do not finish things.",
      "Document your decisions with the alternatives you rejected and the trade-offs you accepted. Anyone can copy a layout; articulated judgement is what separates someone who can build from someone who can build well.",
      "Lead every presentation with the problem and a live demonstration, keeping the technical detail in reserve. A client needs to see it work on their phone; a technical listener will ask, and that is your chance to show depth.",
      "Verify critique in the tools rather than arguing about it. Technical feedback is usually checkable — contrast, keyboard reach, console errors — and ten seconds of checking settles what an argument never would.",
    ],
    vocabulary: [
      { term: "Portfolio", meaning: "Evidence answering 'can this person do the work?'. Live, finished projects beat described or unfinished ones." },
      { term: "Case study", meaning: "A project write-up: brief, decisions, trade-offs, result. What turns a gallery into a demonstration of judgement." },
      { term: "Trade-off", meaning: "What a decision cost you. Stating it reads as judgement; omitting it reads as inexperience." },
      { term: "Measurable result", meaning: "A Lighthouse score, a load time, a real user's reaction. Evidence, where an adjective is not." },
      { term: "Live demonstration", meaning: "Showing the thing working, on a phone, immediately. Persuades where a description does not." },
      { term: "Verifiable critique", meaning: "Technical feedback that can be checked in the tools. Verified rather than argued about." },
      { term: "Framework", meaning: "A way of organising HTML, CSS and JavaScript. More valuable on top of solid fundamentals than instead of them." },
      { term: "Reading others' code", meaning: "The fastest way to learn how experienced developers solve unfamiliar problems. Every open-source project is a free textbook." },
    ],
    homework: [
      {
        task: "Publish your best project today",
        detail:
          "Deploy it, confirm it loads over HTTPS on a phone, and put the URL somewhere you can send it. An unpublished project is not portfolio material however good it is.",
      },
      {
        task: "Write one case study",
        detail:
          "Brief in two sentences, two decisions with the alternatives rejected, the trade-offs stated honestly, and one measurable result. This is the document that gets you hired.",
      },
      {
        task: "Practise the five-minute presentation",
        detail:
          "Problem, live demonstration, two decisions, next steps — timed, with the technical detail held in reserve. Then prepare honest answers on time and cost.",
      },
      {
        task: "Write your next-steps plan",
        detail:
          "Choose a route — a framework, backend work, or a specialism — and end the plan with something you will actually publish, because the portfolio only grows by shipping.",
      },
    ],
    rubric: [
      {
        criterion: "The project",
        passing: "Built a website.",
        excellent: "A live site for a real brief, reachable over HTTPS, with every link and form tested, the console clean, five widths passing, and every Lighthouse accessibility and SEO failure fixed.",
      },
      {
        criterion: "Documentation",
        passing: "Describes the project.",
        excellent: "A case study with the brief, two decisions each naming the rejected alternative, honest trade-offs including what would be done differently, and one measurable result.",
      },
      {
        criterion: "Presentation",
        passing: "Explains the work.",
        excellent: "Five minutes leading with the problem and a live demonstration, technique held in reserve for questions, and honest prepared answers on time and cost.",
      },
      {
        criterion: "Response to critique",
        passing: "Accepts feedback.",
        excellent: "All critique recorded in silence, factual claims verified in the tools rather than argued, and notes sorted into wrong, preference and the critic's context.",
      },
      {
        criterion: "Forward planning",
        passing: "Knows what to learn next.",
        excellent: "A chosen route with reasoning, and a plan that ends in something that will actually be published rather than something that will be studied.",
      },
    ],
    faqs: [
      {
        q: "How many projects do I need in a portfolio?",
        a: "Three finished, live ones. A visitor forms an impression in about a minute, and three published projects demonstrate that you finish things while ten half-built ones demonstrate the opposite. Quality and completion beat quantity every time.",
      },
      {
        q: "I have no clients. What do I build?",
        a: "Build for a real local business in exchange for permission to show the work. Real work involved a brief, constraints and a person to answer to, which carries far more weight than an invented demo — and it is very often how the first paid project arrives.",
      },
      {
        q: "How technical should my presentation be?",
        a: "Lead with the problem and a live demonstration, then two decisions explained plainly, and keep the deeper technique in reserve for questions. A client needs to see it work on their phone; a technical listener will ask, and that is your chance to show depth.",
      },
      {
        q: "What do I say when asked what something would cost?",
        a: "Have an honest figure ready before you present. Base it on how long the work actually took you plus the time for the new feature, and say it plainly. These questions decide whether you get paid work, and improvising usually loses it. Business & Freelancing covers pricing properly.",
      },
      {
        q: "Should I learn a framework next?",
        a: "Usually yes — React is what most job listings ask for. But it is far more valuable on top of the fundamentals you now have than instead of them, because a framework is a way of organising the same HTML, CSS and JavaScript. Keep publishing while you learn it.",
      },
    ],
  },
};
