import type { SessionLecture } from "../types";

/**
 * Web Development — ₦30,000 · 6 weeks · 12 sessions.
 * Sessions 4 to 6. (1–3 in web-development.ts, 7–9 in -c.ts, 10–12 in -d.ts.)
 */
export const webDevelopmentLessonsB: Record<string, SessionLecture> = {
  "flexbox-grid-responsive": {
    summary:
      "Layout is arranging boxes, and Flexbox and Grid are the two tools that finally made it reliable. This session covers both, positioning, media queries, and transitions — then a project that holds together from a phone to a desktop.",
    objectives: [
      "Choose between Flexbox and Grid for a given layout",
      "Control alignment and distribution on both axes",
      "Use positioning deliberately and understand stacking",
      "Build layouts that adapt with media queries",
      "Add transitions that help rather than distract",
      "Build a responsive website that works at every width",
    ],
    blocks: [
      {
        heading: "Flexbox: one dimension",
        body: [
          "Flexbox arranges items along **one axis** — a row or a column — and it is the right tool when you are lining things up: a navigation bar, a row of cards, a centred element. Set `display: flex` on the parent and the children become flex items that can be aligned and distributed.",
          "The two properties that do most of the work are `justify-content` and `align-items`. **`justify-content` distributes along the main axis** — `space-between` pushes items to the edges with gaps between, `center` groups them in the middle. **`align-items` aligns across the other axis** — `center` is what actually centres something vertically, which was genuinely difficult before Flexbox existed.",
          "Then **`flex-wrap`**, which beginners omit and then wonder why their row overflows on a phone. By default flex items refuse to wrap and squeeze instead, producing unreadably narrow columns. Setting `flex-wrap: wrap` lets items drop to the next line when there is not room, and combined with a sensible `flex-basis` it produces a layout that reflows naturally without a single media query.",
        ],
      },
      {
        heading: "Grid: two dimensions",
        body: [
          "CSS Grid arranges items along **both axes at once** — rows and columns together — and it is the right tool for page-level layout and anything resembling a table of content. Set `display: grid` on the parent, define the columns, and place items into cells.",
          "The most useful modern feature is **`repeat(auto-fit, minmax(250px, 1fr))`**, which creates as many columns as will fit at a minimum of 250px each and lets them share the remaining space. That single line produces a card grid that goes from four columns on a desktop to one on a phone **with no media query at all**, which is one of the best value-for-effort lines in CSS.",
          "Then **`gap`**, which sets the space between grid items and replaces the old hack of margins that always broke at the edges. And **named areas** — `grid-template-areas` — which let you describe a page layout in something close to a picture, making the code readable and the layout easy to rearrange at different widths.",
        ],
      },
      {
        heading: "Choosing between them",
        body: [
          "The rule is short: **Flexbox for one dimension, Grid for two**. A row of navigation links is one dimension — Flexbox. A page with a header, sidebar, main area and footer is two — Grid. A card that has an image on top and text below with the button pushed to the bottom is one dimension — Flexbox, with `margin-top: auto` on the button.",
          "They are not competitors and the best layouts use both: **Grid for the page structure and Flexbox for the components inside it**. A grid cell containing a flex row is completely normal and usually the cleanest way to build something.",
          "Then the thing to avoid: **forcing the wrong tool**. Using Grid for a single row of buttons works but is more machinery than needed; using nested Flexbox to build a two-dimensional page layout produces markup that is hard to read and hard to change. When a layout feels like it is fighting you, the usual cause is using a one-dimensional tool for a two-dimensional problem.",
        ],
      },
      {
        heading: "Positioning",
        body: [
          "**`static`** is the default — the element sits where the document flow puts it. **`relative`** keeps it in the flow but lets you nudge it, and, importantly, makes it a reference point for absolutely positioned children. **`absolute`** takes it out of the flow entirely and positions it against the nearest positioned ancestor, which is why a parent often needs `position: relative` for no other reason.",
          "**`fixed`** pins an element to the viewport — a sticky header, a floating button — and **`sticky`** behaves as relative until it reaches a threshold and then sticks, which is what modern sticky headers use and is far simpler than the JavaScript that used to be required.",
          "Then **stacking**. Elements later in the document paint on top of earlier ones, and `z-index` changes that — but **only on positioned elements**, which is the source of endless confusion when a z-index appears to be ignored. Set a position first. And keep z-index values low and deliberate; a stylesheet with values in the thousands means someone was fighting rather than designing.",
        ],
      },
      {
        heading: "Responsive layout, media queries and transitions",
        body: [
          "Responsive design means **one page that works at every width**, and it starts before any media query. The **viewport meta tag** — `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">` — is required, because without it a phone renders the page at desktop width and scales it down to illegibility. Then **fluid sizing**: percentages and `fr` units rather than fixed pixels, and `max-width` on containers so text does not stretch across a wide screen.",
          "**Media queries** apply styles at particular widths, and the discipline is to **design mobile-first**: write the base styles for a narrow screen, then add rules inside `min-width` queries as space allows. This produces less CSS than starting at desktop and undoing it, and it means the simplest experience is the default rather than something you patch in later. Breakpoints should come from **where your content breaks**, not from the widths of particular devices.",
          "Then **transitions**, which make changes feel intentional rather than abrupt. `transition: background-color 0.2s ease` on a button makes a hover feel responsive. Three rules keep them useful: keep them **short** — 150 to 300 milliseconds, because anything longer feels sluggish; animate only **cheap properties** like colour, opacity and transform, since animating width or height forces the browser to recalculate layout on every frame; and **respect `prefers-reduced-motion`**, because some people are made genuinely unwell by animation and a media query can switch it off for them.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor builds one page from a phone width upward: a Flexbox navigation, a Grid card layout using auto-fit minmax so it reflows with no media query, a positioned sticky header with correct z-index, then mobile-first media queries added only where the content breaks, and a transition that respects reduced motion.",
      steps: [
        {
          step: "Set the viewport meta tag",
          detail:
            "Add it and reload on a phone emulator with and without. Show the page rendered at desktop width and scaled to illegibility without it.",
        },
        {
          step: "Start at phone width",
          detail:
            "Open the browser at 375px and design from there. Explain that mobile-first produces less CSS and makes the simple experience the default.",
        },
        {
          step: "Build the nav with Flexbox",
          detail:
            "Use display flex with justify-content space-between and align-items center. Explain that align-items center is what vertically centres, which was hard before Flexbox.",
        },
        {
          step: "Add flex-wrap",
          detail:
            "Narrow the window and show the items squeezing instead of wrapping. Add flex-wrap: wrap and show them drop to a new line.",
        },
        {
          step: "Build the card grid",
          detail:
            "Use repeat(auto-fit, minmax(250px, 1fr)) and resize the window. Show the columns going from four to one with no media query at all.",
        },
        {
          step: "Add gap",
          detail:
            "Set gap on the grid and contrast it with the old margin approach that broke at the edges.",
        },
        {
          step: "Push a button to the bottom of a card",
          detail:
            "Use Flexbox column with margin-top auto. Explain that this is the standard solution and needs no absolute positioning.",
        },
        {
          step: "Explain why z-index was ignored",
          detail:
            "Show a z-index doing nothing on a static element, then set position and show it work. Explain that z-index only applies to positioned elements.",
        },
        {
          step: "Build a sticky header",
          detail:
            "Use position sticky with a threshold. Explain that this replaces the JavaScript that used to be required for the same effect.",
        },
        {
          step: "Add a media query only where needed",
          detail:
            "Resize until something actually breaks, then add a min-width query for that. Explain that breakpoints come from the content, not from device widths.",
        },
        {
          step: "Add a transition",
          detail:
            "Transition background-color over 0.2s on a button. Explain that 150 to 300 milliseconds is the range that feels responsive without feeling slow.",
        },
        {
          step: "Animate the cheap properties only",
          detail:
            "Contrast transitioning transform with transitioning width. Explain that animating width forces layout recalculation on every frame.",
        },
        {
          step: "Respect reduced motion",
          detail:
            "Add a prefers-reduced-motion query switching transitions off. Explain that some people are genuinely made unwell by animation.",
        },
      ],
    },
    practice: {
      title: "Project: responsive website",
      brief:
        "You build a complete website that works from 320px to desktop: a viewport meta tag, a Flexbox navigation with flex-wrap, a Grid card layout using auto-fit minmax so it reflows without media queries, positioning used deliberately with correct z-index, mobile-first media queries added only where the content breaks, and transitions that are short, cheap and respect reduced motion.",
      steps: [
        "Add the viewport meta tag to every page.",
        "Open the browser at 320px and design from that width upward.",
        "Use fluid units and max-width on containers rather than fixed pixel widths.",
        "Build the navigation with Flexbox, justify-content and align-items.",
        "Add flex-wrap so the navigation reflows instead of squeezing.",
        "Build the card layout with Grid using repeat(auto-fit, minmax(250px, 1fr)).",
        "Use gap for spacing between grid items rather than margins.",
        "Use Flexbox inside a card, with margin-top auto to push the last element down.",
        "Use Grid for the page structure and Flexbox for the components within it.",
        "Set position on any element before relying on z-index.",
        "Keep z-index values low and deliberate.",
        "Use position sticky for any header that should stick.",
        "Resize slowly and note exactly where the content breaks.",
        "Add a min-width media query only at each genuine break point.",
        "Add transitions of 150 to 300 milliseconds on interactive elements.",
        "Animate only colour, opacity and transform.",
        "Add a prefers-reduced-motion query that switches animation off.",
        "Test at 320px, 375px, 768px, 1024px and 1440px and fix each failure.",
      ],
      standard:
        "A site with the viewport meta tag on every page, designed from 320px upward using fluid units and container max-widths, a Flexbox navigation with flex-wrap, a Grid card layout using auto-fit minmax that reflows with no media query, gap used for grid spacing, Flexbox used inside cards with margin-top auto, Grid for page structure and Flexbox for components, position set before any z-index with low deliberate values, sticky positioning for any sticky header, min-width media queries added only at genuine content breaks, transitions of 150 to 300 milliseconds animating only colour, opacity and transform, a prefers-reduced-motion query, and all five test widths passing.",
    },
    pitfalls: [
      {
        problem: "Your flex row squeezes instead of wrapping on a phone",
        fix: "Add flex-wrap: wrap. Flex items refuse to wrap by default and squeeze instead, producing unreadably narrow columns — this is the most commonly omitted Flexbox property.",
      },
      {
        problem: "You wrote a media query for a layout Grid already handles",
        fix: "Use repeat(auto-fit, minmax(250px, 1fr)). It produces a card grid that reflows from four columns to one with no media query at all.",
      },
      {
        problem: "You used nested Flexbox for a page layout",
        fix: "Use Grid for two dimensions. Forcing a one-dimensional tool into a two-dimensional problem produces markup that is hard to read and hard to change.",
      },
      {
        problem: "Your z-index is being ignored",
        fix: "Set position on the element first. z-index only applies to positioned elements, which is the source of endless confusion when it appears to do nothing.",
      },
      {
        problem: "Your page renders tiny on a phone",
        fix: "Add the viewport meta tag. Without it the phone renders at desktop width and scales down to illegibility, and no amount of CSS fixes it.",
      },
      {
        problem: "You designed at desktop width and patched it down",
        fix: "Design mobile-first and add min-width queries as space allows. It produces less CSS and makes the simple experience the default rather than an afterthought.",
      },
      {
        problem: "You picked breakpoints from device widths",
        fix: "Add a query where your content actually breaks. Device-specific breakpoints age badly and miss the widths in between.",
      },
      {
        problem: "Your transitions are long or animate layout properties",
        fix: "Keep them to 150 to 300 milliseconds and animate only colour, opacity and transform. Animating width or height forces layout recalculation on every frame, and respect prefers-reduced-motion.",
      },
    ],
    expertNotes: [
      "Use repeat(auto-fit, minmax(250px, 1fr)) for card grids. It reflows from four columns to one with no media query at all, which is the best value-for-effort line in responsive CSS.",
      "Add flex-wrap: wrap whenever you use Flexbox for a row that might get crowded. Flex items squeeze rather than wrap by default, and this single omission is behind most broken mobile navigation bars.",
      "Design mobile-first and add min-width queries where the content actually breaks. It produces less CSS than starting at desktop and undoing it, and your breakpoints stay meaningful as devices change.",
      "Keep transitions between 150 and 300 milliseconds, animate only colour, opacity and transform, and respect prefers-reduced-motion. Longer feels sluggish, animating layout properties is expensive, and some people are genuinely made unwell by motion.",
    ],
    vocabulary: [
      { term: "Flexbox", meaning: "One-dimensional layout along a row or column. The right tool for lining things up." },
      { term: "Grid", meaning: "Two-dimensional layout in rows and columns. The right tool for page structure and card grids." },
      { term: "auto-fit minmax", meaning: "A Grid column definition creating as many columns as fit at a minimum width. Reflows with no media query." },
      { term: "gap", meaning: "Space between flex or grid items. Replaces the margin hack that broke at the edges." },
      { term: "Positioned element", meaning: "One with position other than static. Required before z-index has any effect." },
      { term: "Mobile-first", meaning: "Writing base styles for narrow screens and adding min-width queries. Produces less CSS and a simpler default." },
      { term: "Breakpoint", meaning: "The width where your content breaks. Derived from the content, not from device specifications." },
      { term: "prefers-reduced-motion", meaning: "A media query for users who need less animation. Some people are genuinely made unwell by motion." },
    ],
    homework: [
      {
        task: "Build one auto-fit card grid",
        detail:
          "With repeat(auto-fit, minmax(250px, 1fr)) and gap. Resize the window from 320px to 1440px and confirm it reflows with no media query.",
      },
      {
        task: "Fix a Flexbox row that squeezes",
        detail:
          "Add flex-wrap: wrap and a sensible flex-basis, then narrow the window until items drop to a new line rather than becoming unreadably narrow.",
      },
      {
        task: "Rebuild one layout mobile-first",
        detail:
          "Take something you built at desktop width and rewrite it starting at 320px, adding min-width queries only where the content breaks. Compare the amount of CSS.",
      },
      {
        task: "Audit your transitions",
        detail:
          "Check every transition is 150 to 300 milliseconds and animates only colour, opacity or transform. Then add a prefers-reduced-motion query that switches them off.",
      },
    ],
    rubric: [
      {
        criterion: "Layout tool choice",
        passing: "Uses Flexbox or Grid.",
        excellent: "Grid for page structure and two-dimensional layouts, Flexbox for components and single dimensions, with both used together where that is cleanest.",
      },
      {
        criterion: "Alignment and flow",
        passing: "Things line up.",
        excellent: "justify-content and align-items used deliberately, flex-wrap set so rows reflow rather than squeeze, and gap used for spacing instead of margins.",
      },
      {
        criterion: "Positioning",
        passing: "Moves elements.",
        excellent: "The four position values understood, position set before relying on z-index, low deliberate z-index values, and sticky used instead of JavaScript.",
      },
      {
        criterion: "Responsive behaviour",
        passing: "Works on a phone.",
        excellent: "Viewport meta tag present, designed mobile-first from 320px, auto-fit minmax used so grids reflow without queries, and media queries added only at genuine content breaks.",
      },
      {
        criterion: "Motion",
        passing: "Has some animation.",
        excellent: "Transitions of 150 to 300 milliseconds animating only colour, opacity and transform, with a prefers-reduced-motion query switching motion off.",
      },
    ],
    faqs: [
      {
        q: "When should I use Flexbox and when Grid?",
        a: "Flexbox for one dimension — a row of links, a row of cards, centring something. Grid for two — page structure, anything like a table of content. The best layouts use both: Grid for the page and Flexbox for the components inside it.",
      },
      {
        q: "Why are my flex items squashed on mobile?",
        a: "Because flex items do not wrap by default — they squeeze instead. Add flex-wrap: wrap and a sensible flex-basis, and they will drop to a new line when there is not room rather than becoming unreadably narrow.",
      },
      {
        q: "Do I need media queries for a card grid?",
        a: "Usually not. repeat(auto-fit, minmax(250px, 1fr)) creates as many columns as fit at a minimum of 250px and lets them share the remaining space, so the grid goes from four columns to one with no media query at all.",
      },
      {
        q: "Why is my z-index not working?",
        a: "Because z-index only applies to positioned elements. Set position: relative, absolute, fixed or sticky on the element first, and keep the values low and deliberate — a stylesheet with values in the thousands means someone was fighting rather than designing.",
      },
      {
        q: "What breakpoints should I use?",
        a: "The widths where your content actually breaks, not the widths of particular devices. Resize slowly and add a min-width query at each genuine break. Device-specific breakpoints age badly and miss everything in between.",
      },
    ],
  },

  "javascript-basics": {
    summary:
      "JavaScript is what makes a page do things. This session covers what it is and where it runs, variables and data types, operators, and conditions — the foundation everything after it depends on.",
    objectives: [
      "Explain what JavaScript does and where it runs",
      "Declare variables correctly and understand scope",
      "Use the data types and know how they behave",
      "Apply operators without the common type traps",
      "Write conditions that do what you meant",
      "Read and write an error message",
    ],
    blocks: [
      {
        heading: "What JavaScript does",
        body: [
          "HTML describes structure, CSS describes appearance, and **JavaScript describes behaviour** — what happens when someone clicks, types, or when data arrives. Without it a page is a document; with it a page is an application. It runs **in the browser**, on the visitor's own machine, which is why it can respond instantly without contacting a server for every interaction.",
          "It runs in a specific order, and this causes the first real confusion. A script placed in the `<head>` executes **before the page content exists**, so any attempt to find an element finds nothing. The fix is to put the script at the end of the `<body>`, or better, add the **`defer`** attribute to the script tag, which tells the browser to run it after the document has been parsed. This one attribute prevents a large category of 'my code does not work' problems.",
          "Then the tool you will use constantly: the **browser console**. Open developer tools, and `console.log()` prints anything you want to inspect. It is not a debugging technique of last resort — it is how you find out what your program actually believes, as opposed to what you intended it to do. Most JavaScript learning is writing a line, logging it, and discovering your assumption was wrong.",
        ],
      },
      {
        heading: "Variables and scope",
        body: [
          "A variable is a **named value you can refer to later**. Declare it with `const` when the value will not be reassigned — which is most of the time — and `let` when it will. `const` does not mean the value cannot change if it is an object or array; it means the name cannot be pointed at something else. Defaulting to `const` and switching to `let` only when the compiler complains is a good habit.",
          "**Avoid `var`.** It is the original keyword and it has two behaviours that cause real bugs: it is **function-scoped rather than block-scoped**, so a `var` inside an `if` block leaks out to the whole function, and it is **hoisted**, meaning it exists before the line that declares it, holding `undefined`. Both produce confusing errors that are hard to trace. Modern code uses `const` and `let`, and there is no reason to write `var` in new code.",
          "Then **scope** — where a name is visible. A variable declared inside a block or function exists only there, which is what you want, because a variable that everything can change is a variable you cannot reason about. Name things for what they hold: `totalPrice` rather than `x`, `isLoggedIn` rather than `flag`. You will read your own code far more times than you write it, usually months later and without any memory of what you meant.",
        ],
      },
      {
        heading: "Data types",
        body: [
          "The primitives are **string** (text, in quotes), **number** (integers and decimals alike — there is no separate integer type), **boolean** (`true` or `false`), plus `null` (deliberately empty), `undefined` (never given a value), and `symbol` and `bigint`, which you will rarely need. Then **objects** — collections of key-value pairs — and **arrays**, which are ordered lists.",
          "The behaviour that catches everyone is that **JavaScript converts types rather than refusing**. `'5' + 3` is `'53'`, a string, because the plus operator saw a string and concatenated. `'5' - 3` is `2`, a number, because minus has no string meaning. This is not a quirk to memorise so much as a reason to be deliberate: when data comes from a form or a URL it arrives as a **string**, and arithmetic on strings produces nonsense rather than an error.",
          "So **convert explicitly**. `Number('5')` gives the number 5, `String(5)` gives the string '5', and `parseInt` and `parseFloat` extract numbers from messier text. Then **check what you have** with `typeof`, and beware that `typeof null` returns `'object'`, a historical bug you simply have to know about. When a calculation produces `NaN` — not a number — it almost always means a string got into the arithmetic.",
        ],
      },
      {
        heading: "Operators and equality",
        body: [
          "Arithmetic and comparison operators work as expected, with one enormous exception: **`==` versus `===`**. The double equals performs **type coercion** before comparing, so `0 == ''` is true, `0 == '0'` is true, and `null == undefined` is true — results that are almost never what you meant. The triple equals compares **value and type** without coercion, and gives the answer you expect.",
          "The rule is absolute: **always use `===` and `!==`**. There is no situation in ordinary code where the coercing version is the right choice, and using it is how bugs appear that only happen with particular data. Linters flag `==` for exactly this reason.",
          "Then **logical operators** and a useful feature of them. `&&` returns the first falsy value or the last value, and `||` returns the first truthy one, which makes `const name = input || 'Anonymous'` a concise way to supply a default. Falsy values are `false`, `0`, `''`, `null`, `undefined` and `NaN` — everything else is truthy, **including the empty array and the empty object**, which surprises people. And the **nullish coalescing operator** `??` only falls back on `null` or `undefined`, which is what you want when `0` and `''` are legitimate values.",
        ],
      },
      {
        heading: "Conditions",
        body: [
          "A condition runs one block or another based on whether something is true. `if`, `else if`, `else` is the basic form, and the important discipline is **checking the cases in the right order** — a broad condition placed first swallows the specific ones below it, which is a common and confusing bug.",
          "**Ternary expressions** — `condition ? a : b` — are a compact form for choosing between two values, and they are good for assignment: `const label = isLoggedIn ? 'Sign out' : 'Sign in'`. They become unreadable when nested, so use them for one decision and not for branching logic.",
          "Then **truthiness**, which is how conditions actually evaluate. Anything in the condition position is converted to a boolean, so `if (name)` is true for any non-empty string and false for an empty one — usually what you want. But it is false for `0` too, which matters when zero is a legitimate value, and that is when you write `if (count !== undefined)` instead. **Be explicit when the falsy values are meaningful**, and the trap disappears.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor writes JavaScript in the browser from nothing: a script that fails because it runs before the page exists, fixed with defer, then variables, a type-coercion trap demonstrated live, the == versus === difference, and a condition whose case order is deliberately wrong and then corrected.",
      steps: [
        {
          step: "Write a script that fails",
          detail:
            "Put a script in the head that tries to find an element. Show the null error and explain that the script ran before the content existed.",
        },
        {
          step: "Fix it with defer",
          detail:
            "Add the defer attribute and reload. Explain that this one attribute prevents a large category of failures.",
        },
        {
          step: "Open the console",
          detail:
            "Log a value and inspect it. Explain that this is how you find out what the program actually believes rather than what you intended.",
        },
        {
          step: "Declare with const and let",
          detail:
            "Use const by default and let where reassignment is needed. Explain that const means the name cannot be repointed, not that the contents are frozen.",
        },
        {
          step: "Show the var problems",
          detail:
            "Demonstrate function scope leaking out of a block and hoisting. Explain why modern code does not use var.",
        },
        {
          step: "Demonstrate type coercion",
          detail:
            "Log '5' + 3 and '5' - 3 and show the different results. Explain that JavaScript converts rather than refusing.",
        },
        {
          step: "Show the form-data trap",
          detail:
            "Read a value from an input and add two of them, producing concatenation. Explain that form data always arrives as a string.",
        },
        {
          step: "Convert explicitly",
          detail:
            "Wrap the values in Number() and show the arithmetic work. Explain that NaN almost always means a string reached the arithmetic.",
        },
        {
          step: "Check types",
          detail:
            "Use typeof on several values including null. Explain the historical bug where typeof null returns object.",
        },
        {
          step: "Show == versus ===",
          detail:
            "Log 0 == '' and 0 === ''. Explain that the coercing version gives results you almost never meant.",
        },
        {
          step: "Use logical defaults",
          detail:
            "Write const name = input || 'Anonymous', then show the ?? version. Explain that ?? only falls back on null and undefined, which matters when zero is legitimate.",
        },
        {
          step: "Write a condition in the wrong order",
          detail:
            "Put a broad check first so it swallows the specific ones. Show the wrong result.",
        },
        {
          step: "Correct the order and explain truthiness",
          detail:
            "Reorder the checks, then show that if (count) is false for zero. Explain that being explicit removes the trap.",
        },
      ],
    },
    practice: {
      title: "Build an interactive page with conditions",
      brief:
        "You write JavaScript that runs correctly after the document loads, declares variables properly, handles form data as the strings it actually is, uses strict equality throughout, and branches on conditions written in the right order — with every assumption checked in the console rather than assumed.",
      steps: [
        "Add a script tag with the defer attribute so it runs after the document parses.",
        "Open the developer tools console before writing any code.",
        "Declare every variable with const, switching to let only where reassignment is genuinely needed.",
        "Name each variable for what it holds, not for its type or position.",
        "Read a value from a form input and log it with typeof to confirm it is a string.",
        "Convert it explicitly with Number() before doing any arithmetic.",
        "Log the result and confirm it is a number rather than a concatenated string.",
        "Check for NaN and handle it rather than letting it reach the page.",
        "Use === and !== everywhere, with no instance of == in the file.",
        "Use || or ?? for defaults, choosing ?? where zero or an empty string is legitimate.",
        "Write an if / else if / else chain for a real decision in the page.",
        "Order the checks from most specific to least specific.",
        "Test the chain with every case, including the edge cases of zero, empty string and null.",
        "Use a ternary for a single two-way choice such as a label.",
        "Log intermediate values at each step rather than assuming they are what you expect.",
        "Write down one assumption you held that the console proved wrong.",
      ],
      standard:
        "A page whose script carries the defer attribute, with every variable declared as const unless reassignment is genuinely needed and named for what it holds, form input confirmed as a string with typeof and converted explicitly before arithmetic, NaN checked and handled, no instance of == anywhere, || or ?? used for defaults with ?? chosen where zero or empty string is legitimate, an if chain ordered from most specific to least specific and tested against zero, empty string and null, a ternary used only for a single two-way choice, intermediate values logged at each step, and one disproved assumption written down.",
    },
    pitfalls: [
      {
        problem: "Your script runs before the page content exists",
        fix: "Add the defer attribute to the script tag. A script in the head executes before the document is parsed, so any element lookup returns null — this is the first JavaScript bug almost everyone meets.",
      },
      {
        problem: "You use var",
        fix: "Use const by default and let where reassignment is needed. var is function-scoped and hoisted, both of which produce confusing bugs that are hard to trace, and there is no reason to write it in new code.",
      },
      {
        problem: "You do arithmetic on form values directly",
        fix: "Convert with Number() first. Form data always arrives as a string, so adding two of them concatenates rather than sums, and JavaScript does not warn you.",
      },
      {
        problem: "You get NaN and do not know why",
        fix: "A string reached the arithmetic. Log the values with typeof, convert explicitly, and check for NaN before the value reaches the page.",
      },
      {
        problem: "You use == instead of ===",
        fix: "Always use strict equality. The coercing version makes 0 == '' and null == undefined true, producing bugs that only appear with particular data.",
      },
      {
        problem: "Your if chain gives the wrong branch",
        fix: "Order checks from most specific to least specific. A broad condition placed first swallows every specific one below it, which is a common and confusing bug.",
      },
      {
        problem: "You rely on truthiness where zero is meaningful",
        fix: "Write an explicit comparison. if (count) is false for zero, so when zero is a legitimate value use if (count !== undefined) instead.",
      },
      {
        problem: "You guess at values instead of logging them",
        fix: "Log intermediate values at every step. Most JavaScript learning is discovering that an assumption was wrong, and the console is the only way to find out what the program actually believes.",
      },
    ],
    expertNotes: [
      "Put defer on your script tag, always. A script in the head runs before the document exists, so every element lookup returns null — one attribute removes an entire category of confusing first bugs.",
      "Convert form values with Number() before doing arithmetic. Form data always arrives as a string, and JavaScript concatenates rather than adding, silently producing nonsense instead of an error.",
      "Use === and !== everywhere, without exception. The coercing == makes 0 == '' and null == undefined true, and the resulting bugs only appear with particular data, which makes them far harder to find.",
      "Log values rather than assuming them. Most time spent stuck on JavaScript is a wrong assumption about what a value actually is, and console.log answers it in a second.",
    ],
    vocabulary: [
      { term: "defer", meaning: "A script attribute making it run after the document is parsed. Prevents the script-runs-too-early bug." },
      { term: "const", meaning: "Declares a name that cannot be reassigned. The default choice; object contents can still change." },
      { term: "Hoisting", meaning: "var existing before its declaring line, holding undefined. One reason modern code avoids var." },
      { term: "Type coercion", meaning: "JavaScript converting types rather than refusing. Why '5' + 3 is '53' and '5' - 3 is 2." },
      { term: "Strict equality", meaning: "=== compares value and type without coercion. The only equality operator to use." },
      { term: "Falsy", meaning: "false, 0, '', null, undefined and NaN. Everything else is truthy, including empty arrays and objects." },
      { term: "Nullish coalescing", meaning: "?? falls back only on null or undefined, unlike || which also falls back on 0 and ''." },
      { term: "NaN", meaning: "Not a number. Almost always means a string reached an arithmetic operation." },
    ],
    homework: [
      {
        task: "Set up a working script",
        detail:
          "A script tag with defer, the console open, and a console.log of something on the page. Confirm it runs after the document by logging an element you know exists.",
      },
      {
        task: "Prove the coercion traps to yourself",
        detail:
          "Log '5' + 3, '5' - 3, 0 == '', 0 === '', typeof null, and Boolean([]). Do it once in the console and you will not have to memorise them.",
      },
      {
        task: "Build one form calculation",
        detail:
          "Read two inputs, confirm with typeof that they are strings, convert with Number(), add them, and handle NaN. Display the result on the page.",
      },
      {
        task: "Write an if chain and break it",
        detail:
          "Write a three-branch condition, then deliberately put the broadest check first and observe the wrong result. Reorder it and test every case including zero and empty string.",
      },
    ],
    rubric: [
      {
        criterion: "Script setup",
        passing: "Has JavaScript on the page.",
        excellent: "The defer attribute used so the script runs after parsing, and the console used from the start to inspect rather than assume.",
      },
      {
        criterion: "Variables",
        passing: "Declares variables.",
        excellent: "const by default with let only where reassignment is needed, no var anywhere, and names describing what each holds.",
      },
      {
        criterion: "Type handling",
        passing: "Does arithmetic.",
        excellent: "Form input confirmed as a string with typeof, converted explicitly with Number(), and NaN checked and handled before reaching the page.",
      },
      {
        criterion: "Equality and defaults",
        passing: "Compares values.",
        excellent: "Strict equality used throughout with no == anywhere, and || or ?? used for defaults with ?? chosen where zero or an empty string is legitimate.",
      },
      {
        criterion: "Conditions",
        passing: "Uses if statements.",
        excellent: "Checks ordered from most specific to least specific, tested against zero, empty string and null, with ternaries used only for single two-way choices.",
      },
    ],
    faqs: [
      {
        q: "Why does my JavaScript not find my element?",
        a: "Almost certainly the script ran before the document was parsed. Add the defer attribute to the script tag, or move it to the end of the body. A script in the head executes before the content exists, so every lookup returns null.",
      },
      {
        q: "What is the difference between let and const?",
        a: "const means the name cannot be reassigned; let means it can. Use const by default and switch to let only when you genuinely need to reassign. Note that const does not freeze the contents of an object or array — only the name's target.",
      },
      {
        q: "Why does adding two form values give me 12 instead of 7?",
        a: "Because form values arrive as strings, and + concatenates strings. Convert with Number() before doing arithmetic. JavaScript will not warn you — it will happily produce '53' from '5' + 3.",
      },
      {
        q: "Should I ever use == instead of ===?",
        a: "No. The coercing version makes 0 == '', 0 == '0' and null == undefined all true, which is almost never what you meant, and the resulting bugs only surface with particular data. Always use === and !==.",
      },
      {
        q: "What does NaN mean and why do I keep getting it?",
        a: "Not a number — and it almost always means a string reached an arithmetic operation. Log the values with typeof, convert explicitly with Number(), and check for NaN before the result goes on the page.",
      },
    ],
  },

  "functions-data-loops": {
    summary:
      "Functions make code reusable, arrays and objects make it handle real data, and loops and events connect it to the user. This session covers all four — then a project that makes a page genuinely interactive.",
    objectives: [
      "Write functions that do one thing and can be reused",
      "Understand parameters, return values and scope",
      "Store and access data in arrays and objects",
      "Loop over data without the classic off-by-one error",
      "Respond to user events correctly",
      "Build an interactive webpage",
    ],
    blocks: [
      {
        heading: "Functions",
        body: [
          "A function is **a named block of code you can run whenever you want**, with inputs and an output. They exist for two reasons: **reuse** — write the calculation once and call it from five places — and **clarity** — a function called `formatPrice` says what it does far better than three lines of arithmetic inline.",
          "The structure is **parameters** in, **`return`** out. A function that does not return anything returns `undefined`, which is the source of the classic bug where a function correctly computes a value and the caller receives nothing because the `return` was forgotten. **Computing is not the same as returning**, and the distinction takes everyone by surprise once.",
          "Then the discipline: **one function, one job**. A function called `processOrder` that validates, calculates, formats and displays is four functions wearing a coat, and it cannot be tested or reused in parts. Name it for what it does — `validateOrder`, `calculateTotal` — and let another function call them in sequence. Small named functions are also self-documenting: reading `calculateTotal(items)` tells you more than reading the arithmetic.",
        ],
      },
      {
        heading: "Scope and arrow functions",
        body: [
          "A variable declared inside a function exists **only inside it**, which is what you want: a function that does not touch anything outside itself is predictable and testable. A function can read variables from outside — but if it depends on them, it becomes hard to reason about, because its behaviour now depends on state elsewhere. **Prefer passing values in as parameters and getting results back via `return`.**",
          "Then **arrow functions**, the shorter syntax: `const double = (n) => n * 2;`. They are exactly equivalent for most purposes and are the modern idiom, particularly for short callbacks. The difference that occasionally matters is that arrow functions do not have their own `this`, which affects them inside object methods — worth knowing about, rarely worth worrying about at this stage.",
          "The practical rule: **use whichever is clear**. Arrow syntax for short one-expression callbacks, function declarations for anything with a body and a name you will call from several places. Consistency within a file matters more than the choice itself.",
        ],
      },
      {
        heading: "Arrays and objects",
        body: [
          "An **array** is an ordered list, written `[1, 2, 3]`, and its positions start at **zero** — the first item is at index 0, which is the single most important thing to internalise about arrays. Access with `items[0]`, get the length with `items.length`, add with `push`, and check whether something is in there with `includes`.",
          "An **object** is a collection of named values: `{ name: 'Ada', price: 4500 }`. Access with `obj.name` or `obj['name']`. Objects are how you represent a *thing* — a product, a user, an order — and arrays of objects are how you represent a list of things, which is the shape of almost all real data: `[{ name: 'Ada', price: 4500 }, { name: 'Bisi', price: 3200 }]`.",
          "Then the two things that bite. **Index out of range returns `undefined` rather than an error**, so `items[10]` on a five-item array silently gives you nothing and the error appears later somewhere else. And **accessing a property of `undefined` throws** — `user.address.city` fails entirely if `address` is missing, which is why the **optional chaining** operator `user?.address?.city` exists, returning `undefined` instead of crashing.",
        ],
      },
      {
        heading: "Looping over data",
        body: [
          "The modern way to go through an array is a **`for...of` loop** — `for (const item of items) { … }` — which gives you each value in turn and cannot go out of range. It is the right default for anything where you simply need each item.",
          "The **classic indexed loop** — `for (let i = 0; i < items.length; i++)` — is what you need when you require the position as well as the value, and it is where the **off-by-one error** lives. The condition must be `i < items.length`, not `i <= items.length`; the latter runs one extra time with `i` equal to the length, which is one past the last index, producing `undefined`. This is the most common loop bug there is and it is worth memorising the correct form.",
          "Then the **array methods**, which replace most hand-written loops and read far better. **`map`** produces a new array by transforming each item — `items.map(i => i.price)`. **`filter`** produces a new array of the items passing a test — `items.filter(i => i.inStock)`. **`find`** returns the first match. **`reduce`** combines everything into one value, such as a total. Chaining `items.filter(inStock).map(getPrice).reduce(add)` expresses an entire data operation in one readable line, and it is the idiom you will see in every real codebase.",
        ],
      },
      {
        heading: "Events",
        body: [
          "An **event** is something the user did — a click, a keystroke, a form submission — and JavaScript can respond to it. The pattern is `element.addEventListener('click', handler)`, where the handler is a function that runs when the event happens. Note that you pass the function **without calling it**: `handleClick`, not `handleClick()`, because the parentheses run it immediately rather than handing it over to be run later.",
          "Then the two behaviours that need managing. **`event.preventDefault()`** stops the browser's default action, which is essential on a form: without it, submitting reloads the page and your JavaScript result vanishes. And **event delegation** — attaching one listener to a parent rather than one to each child — which is how you handle a list of items, including ones added later, without re-attaching listeners every time.",
          "The handler receives an **event object** describing what happened, including `event.target`, the element that was actually clicked. That is what makes delegation work: one listener on the list, and `event.target` tells you which item was involved. This pattern is the foundation of nearly all interactive interfaces.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor builds an interactive product list live: functions extracted from inline code, an array of objects as the data, map and filter and reduce replacing hand-written loops, a deliberate off-by-one error shown and fixed, and event delegation handling clicks on items added after the page loaded.",
      steps: [
        {
          step: "Write inline code, then extract it",
          detail:
            "Start with arithmetic written directly in the page, then move it into a named function. Explain that the name says what it does better than the code does.",
        },
        {
          step: "Forget the return statement",
          detail:
            "Show the caller receiving undefined from a function that computed correctly. Explain that computing is not the same as returning.",
        },
        {
          step: "Split a function doing four jobs",
          detail:
            "Break processOrder into validate, calculate, format and display. Explain that one function one job is what makes code testable and reusable.",
        },
        {
          step: "Show scope",
          detail:
            "Try to read an inner variable from outside. Explain that passing values in and returning results out is what makes a function predictable.",
        },
        {
          step: "Rewrite as an arrow function",
          detail:
            "Convert a short callback and explain when each syntax is clearer. Note that consistency within a file matters more than the choice.",
        },
        {
          step: "Build the data as an array of objects",
          detail:
            "Write a product list and access items[0].name. Explain that this is the shape of almost all real data.",
        },
        {
          step: "Go out of range",
          detail:
            "Access an index past the end and show undefined rather than an error. Explain that the real error appears later somewhere else.",
        },
        {
          step: "Use optional chaining",
          detail:
            "Access a missing nested property both ways. Show the crash and then the safe version with ?.",
        },
        {
          step: "Loop with for...of",
          detail:
            "Print each item. Explain that it cannot go out of range and is the right default when you only need the values.",
        },
        {
          step: "Write the off-by-one error",
          detail:
            "Use i <= items.length in an indexed loop and show the undefined on the last pass. Correct it to i < items.length.",
        },
        {
          step: "Replace the loop with map and filter",
          detail:
            "Rewrite it as items.filter(inStock).map(getPrice). Explain that the chain expresses the whole operation in one readable line.",
        },
        {
          step: "Total with reduce",
          detail:
            "Sum the prices. Explain that reduce combines everything into one value and is the standard way to compute a total.",
        },
        {
          step: "Attach an event listener",
          detail:
            "Add a click handler, passing the function without parentheses. Explain that the parentheses would run it immediately instead.",
        },
        {
          step: "Prevent the form reload",
          detail:
            "Submit a form without preventDefault and watch the page reload. Add it and show the result surviving.",
        },
        {
          step: "Use event delegation",
          detail:
            "Attach one listener to the list, add a new item at runtime, and click it. Explain that the delegated listener handles items that did not exist when the page loaded.",
        },
      ],
    },
    practice: {
      title: "Project: interactive webpage",
      brief:
        "You build an interactive page driven by an array of objects: functions that each do one job and return their result, data accessed safely with optional chaining, loops replaced with map, filter and reduce where appropriate, an indexed loop written without the off-by-one error, and events handled with preventDefault and delegation so items added later still work.",
      steps: [
        "Define the data as an array of objects with at least four items.",
        "Write one function per job, each named for what it does.",
        "Confirm every function that produces a value actually returns it.",
        "Pass values in as parameters rather than reading outer variables.",
        "Access an item and a nested property, using optional chaining where a value may be missing.",
        "Access an index past the end and handle the undefined rather than letting it reach the page.",
        "Loop with for...of where you only need the values.",
        "Write one indexed loop with the condition i < items.length.",
        "Replace a hand-written loop with map where you are transforming each item.",
        "Use filter where you are selecting a subset.",
        "Use find where you need the first match.",
        "Use reduce to compute a total.",
        "Chain filter, map and reduce into one readable expression where it is clearer.",
        "Attach event listeners passing the function without parentheses.",
        "Call preventDefault on any form submission.",
        "Use event delegation so items added at runtime still respond.",
        "Log intermediate values at each stage and confirm they are what you expect.",
      ],
      standard:
        "An interactive page whose data is an array of at least four objects, with one function per job each named for what it does and confirmed to return its value, values passed as parameters rather than read from outer scope, nested properties accessed with optional chaining and out-of-range access handled, for...of used where only values are needed, any indexed loop written as i < items.length, map, filter, find and reduce each used where appropriate with at least one readable chain, listeners attached without parentheses, preventDefault called on form submission, event delegation making runtime-added items respond, and intermediate values logged and confirmed at each stage.",
    },
    pitfalls: [
      {
        problem: "Your function computes correctly but returns undefined",
        fix: "Add the return statement. Computing is not the same as returning, and a function with no return gives the caller undefined however correct its internal logic is.",
      },
      {
        problem: "One function does four jobs",
        fix: "Split it. A function that validates, calculates, formats and displays cannot be tested or reused in parts; four small named functions can, and the names document themselves.",
      },
      {
        problem: "You assume array positions start at one",
        fix: "They start at zero. The first item is items[0], and internalising this prevents a whole family of off-by-one mistakes.",
      },
      {
        problem: "You access an index past the end",
        fix: "Check the length or handle undefined. Out-of-range access returns undefined rather than throwing, so the error surfaces later somewhere unrelated and is much harder to trace.",
      },
      {
        problem: "Accessing a nested property crashes the page",
        fix: "Use optional chaining: user?.address?.city. Without it, a missing address throws and stops the whole script, which is why the operator exists.",
      },
      {
        problem: "Your loop runs one time too many",
        fix: "Use i < items.length, not i <=. The <= form runs with i equal to the length, which is one past the last index, giving undefined on the final pass.",
      },
      {
        problem: "You pass the handler with parentheses",
        fix: "Pass the function itself: addEventListener('click', handleClick). Writing handleClick() runs it immediately and passes its return value, so the listener never fires.",
      },
      {
        problem: "Your form reloads and the result disappears",
        fix: "Call event.preventDefault() in the submit handler. Without it the browser performs its default submission, reloading the page and discarding everything your JavaScript did.",
      },
    ],
    expertNotes: [
      "Make every function do one job and return its result explicitly. Small named functions are testable, reusable and self-documenting, while a function doing four things can only ever be run as a whole.",
      "Use for...of unless you need the index. It cannot go out of range, which removes the most common loop bug entirely, and reach for map, filter and reduce when you are transforming or selecting rather than just iterating.",
      "Use optional chaining for any nested property that might be missing. Without it a single absent value throws and stops the entire script, and the crash rarely happens near the cause.",
      "Call preventDefault on form submissions and use event delegation for lists. The first stops the page reloading and discarding your work; the second handles items added after the page loaded without re-attaching listeners.",
    ],
    vocabulary: [
      { term: "Function", meaning: "A named block of code with inputs and an output. Exists for reuse and for clarity." },
      { term: "Return value", meaning: "What a function hands back. Without a return statement the caller receives undefined." },
      { term: "Arrow function", meaning: "A shorter function syntax. Equivalent for most purposes and the modern idiom for short callbacks." },
      { term: "Array", meaning: "An ordered list, indexed from zero. Out-of-range access returns undefined rather than throwing." },
      { term: "Object", meaning: "A collection of named values. How you represent a thing; arrays of objects are the shape of most real data." },
      { term: "Optional chaining", meaning: "The ?. operator. Returns undefined instead of crashing when an intermediate value is missing." },
      { term: "map / filter / reduce", meaning: "Transform each item, select a subset, combine into one value. Replace most hand-written loops and read better." },
      { term: "Event delegation", meaning: "One listener on a parent handling events from children, including ones added later." },
    ],
    homework: [
      {
        task: "Refactor one long function",
        detail:
          "Take a function doing several jobs and split it into one function per job, each named for what it does and returning its result. Note how much clearer the calling code becomes.",
      },
      {
        task: "Build an array of objects and query it",
        detail:
          "Four or more items, then use filter to select a subset, map to transform it, and reduce to total it. Chain them into one expression where that reads better.",
      },
      {
        task: "Write both loop forms",
        detail:
          "The same task with for...of and with an indexed loop using i < items.length. Then deliberately write i <= and observe the undefined on the last pass.",
      },
      {
        task: "Build a delegated list",
        detail:
          "One listener on a parent handling clicks on children, then add a new item at runtime and confirm it still responds. Include preventDefault on any form.",
      },
    ],
    rubric: [
      {
        criterion: "Functions",
        passing: "Uses functions.",
        excellent: "One job per function, each named for what it does, every value-producing function confirmed to return it, and values passed as parameters rather than read from outer scope.",
      },
      {
        criterion: "Data structures",
        passing: "Stores data.",
        excellent: "An array of objects accessed with zero-based indexing, nested properties guarded with optional chaining, and out-of-range access handled rather than left to surface later.",
      },
      {
        criterion: "Iteration",
        passing: "Loops over data.",
        excellent: "for...of where only values are needed, any indexed loop written as i < items.length, and map, filter, find and reduce used where each is the clearer tool.",
      },
      {
        criterion: "Events",
        passing: "Responds to clicks.",
        excellent: "Listeners attached without parentheses, preventDefault on form submission, and delegation used so runtime-added items respond.",
      },
      {
        criterion: "Verification",
        passing: "It appears to work.",
        excellent: "Intermediate values logged and confirmed at each stage, with edge cases — missing values, empty arrays, out-of-range indexes — actually tested.",
      },
    ],
    faqs: [
      {
        q: "Why does my function return undefined when it calculates the right value?",
        a: "Because there is no return statement. Computing a value inside a function and handing it back to the caller are two different things, and a function without return gives the caller undefined however correct its logic is.",
      },
      {
        q: "When should I use map instead of a loop?",
        a: "Whenever you are producing a new array by transforming each item — map, filter and reduce express the intent far more clearly than a hand-written loop, and they cannot go out of range. Use for...of when you only need to act on each value without building a new array.",
      },
      {
        q: "Why does my loop run one extra time?",
        a: "Because the condition is i <= items.length. Array indexes run from 0 to length minus one, so the correct condition is i < items.length. The <= form runs once with i equal to the length, which is one past the last index.",
      },
      {
        q: "My form submits and the page reloads. Why?",
        a: "Because you did not call event.preventDefault() in the submit handler. Without it the browser performs its default action, reloading the page and discarding everything your JavaScript did.",
      },
      {
        q: "Why do clicks not work on items I add later?",
        a: "Because the listeners were attached only to the items that existed at the time. Use event delegation: attach one listener to the parent and use event.target to identify which child was clicked, which handles items added at runtime with no extra work.",
      },
    ],
  },
};
