import type { SessionLecture } from "../types";

/**
 * Web Design — ₦25,000 · 4 weeks · 8 sessions.
 * Sessions 1 to 3. (Sessions 4–6 in web-design-b.ts, 7–8 in web-design-c.ts.)
 */
export const webDesignLessonsA: Record<string, SessionLecture> = {
  "how-the-web-works": {
    summary:
      "Before writing a line of code you need to know what a browser is actually doing. This session covers how the web works — clients, servers, DNS, HTTP and what happens between typing a URL and seeing a page — then the three languages and the tools, and ends with your first page running in a browser.",
    objectives: [
      "Explain what happens between typing a URL and seeing a page",
      "Distinguish client from server, and front end from back end",
      "Explain what HTML, CSS and JavaScript are each responsible for",
      "Set up a working development environment",
      "Use browser developer tools to inspect and change a live page",
      "Write, run and correct your first HTML page",
    ],
    blocks: [
      {
        heading: "What actually happens when you open a website",
        body: [
          "You type `ceaproducts.ng` and press enter, and about a second later a page appears. In that second several distinct things happened, and understanding them is what separates someone who can build a site from someone who can only edit one. Your computer is the **client**; it asks. Somewhere else, a **server** — an ordinary computer, kept on permanently, connected to the internet — holds the files and answers.",
          "First your computer had to find the server. It cannot route to a name, only to a number, so it asked a **DNS** server — the internet's phone book — which translated `ceaproducts.ng` into an **IP address** such as `104.21.44.9`. Then it opened a connection to that address and sent an **HTTP request**: essentially 'please send me the page at this path'. The server responded with an **HTTP status code** — 200 meaning 'here it is', 404 meaning 'there is nothing at that path', 500 meaning 'the server itself broke' — followed by the file, which is usually HTML.",
          "Your **browser** then read that HTML, and every time it found a reference to something else — a stylesheet, an image, a script — it sent another request for that too. A single page commonly involves thirty or more requests. This is why a slow website is usually slow for a boring reason: too many requests, or files that are too large. It is also why the status codes matter to you personally — a 404 means your file is in the wrong place or named wrongly, and knowing that saves hours of confusion later.",
        ],
      },
      {
        heading: "Client, server, front end, back end",
        body: [
          "The **client** is whatever requests: your laptop's browser, your phone. The **server** is whatever responds. That split is the whole architecture of the web, and almost every confusing problem resolves once you ask which side it is on. A layout that looks wrong is a client problem. A page that will not load at all is usually a server or DNS problem. Mixing them up is the most common beginner error in debugging.",
          "**Front end** is everything the browser runs — HTML, CSS and JavaScript sent to the client. **Back end** is everything running on the server: the database, the accounts, the payment processing, the logic that decides what to show whom. A static site like a business brochure has almost no back end; the server just hands over files. An application like a bank has a great deal.",
          "This course is front end only, and that is a deliberate and honest scope. Everything you need to build a professional business website is front end plus a hosting service. When a client needs accounts, payments or a database, that is a different discipline — Web Development covers it, and knowing where your competence ends is a professional strength, not a weakness.",
        ],
      },
      {
        heading: "The three languages and what each does",
        body: [
          "**HTML** is structure and meaning. It says: this is a heading, this is a paragraph, this is a picture of the product, this is a link to the contact page. It is not styling and it is not behaviour. Written well, an HTML page makes sense with all the styling removed — which matters for search engines, for screen readers used by blind visitors, and for anyone on a slow connection where the styling arrives late.",
          "**CSS** is presentation: colour, size, spacing, position, and how all of those change on a phone versus a desktop. Separating it from HTML is not pedantry — it means one stylesheet can restyle a whole site, and changing a brand colour becomes a one-line edit rather than a hundred.",
          "**JavaScript** is behaviour: what happens in response to something. A menu that opens, a form that validates before sending, a gallery that advances. In a business website you will use very little of it, mostly through things other people wrote, and that is fine. The important thing is knowing which language is responsible when something is wrong, because looking for a layout problem in JavaScript is how an afternoon disappears.",
          "A useful analogy that holds up: HTML is the skeleton and the organs, CSS is the appearance, JavaScript is the movement. Remove the CSS and the body still functions, looking plain. Remove the HTML and there is nothing at all.",
        ],
      },
      {
        heading: "Setting up an environment that does not fight you",
        body: [
          "You need two things and no more. A **text editor** — VS Code is free, is the professional standard, and is what this course assumes. And a **browser** with developer tools, which every modern browser has built in. That is the whole setup. You do not need a server running on your laptop to build a static site; you can open an HTML file directly in a browser.",
          "Configure VS Code once and it pays for itself. Install the **Live Server** extension, which serves your folder locally and reloads the page automatically every time you save — this removes the tedious save-and-refresh cycle that makes beginners think their edits did nothing. Enable **word wrap** and **format on save** in settings so long lines do not run off the screen and your indentation stays consistent without effort. Turn on **Emmet**, which is built in: typing `div.card>p` and pressing Tab expands into properly nested HTML, which is the fastest way to write structure there is.",
          "Then learn three keyboard habits immediately. **Ctrl+S** to save — Live Server only reloads on save, so forgetting it is the most common cause of 'my changes are not working'. **Ctrl+Shift+P** to open the command palette. And **F12** to open developer tools. That last one is the most valuable tool in this entire course and the next section explains why.",
        ],
      },
      {
        heading: "Developer tools: the professional's advantage",
        body: [
          "Developer tools let you inspect and change any live webpage, including ones you did not build, and see the result instantly. Press **F12** on any site. The **Elements** panel shows the HTML as the browser sees it; clicking any element highlights it on the page and shows the CSS currently applied to it, with a box diagram showing its size, padding, border and margin. You can edit any of it right there and watch the page change. Nothing you do in dev tools is permanent — refreshing restores the original — which makes it a completely safe place to experiment.",
          "The **Console** panel shows errors, and reading them is a real skill. A red message naming a file and a line number is the browser telling you exactly what is wrong; beginners ignore it and stare at the code instead. The **Network** panel shows every request the page made, how long each took, and which failed — this is where you diagnose a slow site or a missing image. The **device toolbar** — the phone icon — lets you view the page at any screen size, which is essential once you build for phones.",
          "Practise on sites you did not build. Open a Nigerian business website, inspect its heading, change its colour, look at what fonts and colours it uses, check how many requests it makes. Twenty minutes of this teaches more about how real sites are built than any tutorial, and it is exactly how working designers reverse-engineer a look they admire.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor traces a real URL through DNS and HTTP in the terminal, inspects a live Nigerian business site in developer tools, then sets up a project folder and gets a first page running with Live Server.",
      steps: [
        {
          step: "Resolve a domain",
          detail:
            "Run `nslookup` on a real domain and show the IP address it resolves to. Explain that a name is only a convenience and the network routes to the number.",
        },
        {
          step: "Make a raw HTTP request",
          detail:
            "Use `curl -I` on a real site and read the response: the 200 status, the content type, the server header. Explain that this is the entire conversation, visible.",
        },
        {
          step: "Trigger a 404 deliberately",
          detail:
            "Request a path that does not exist and show the 404. Explain that this is what a misnamed or misplaced file produces, and that it is a normal, informative answer.",
        },
        {
          step: "Inspect a live business site",
          detail:
            "Open a Nigerian business site, press F12, click its heading and show the HTML and the CSS applied to it. Change the colour in the panel and watch the page respond.",
        },
        {
          step: "Read the box model live",
          detail:
            "Show the computed box diagram for an element — content, padding, border, margin — and explain that this diagram governs every layout decision you will make.",
        },
        {
          step: "Read the Network panel",
          detail:
            "Reload with the Network panel open and count the requests. Sort by size and identify the largest file. Explain that this is how a slow site is diagnosed.",
        },
        {
          step: "Use the device toolbar",
          detail:
            "Switch to a phone viewport and show how the same page responds or fails to. Explain that most Nigerian visitors arrive on a phone.",
        },
        {
          step: "Create the project folder",
          detail:
            "Make a folder, open it in VS Code, and explain that one folder per project is the discipline that keeps work findable months later.",
        },
        {
          step: "Install Live Server",
          detail:
            "Install the extension, enable format on save and word wrap. Explain that automatic reload on save removes the confusion of edits appearing not to work.",
        },
        {
          step: "Write the first page",
          detail:
            "Type the minimal document: doctype, html, head with a title, body with an h1 and a paragraph. Explain what each part is for rather than treating it as a spell.",
        },
        {
          step: "Break it and read the console",
          detail:
            "Deliberately write a broken tag, save, and show that the browser recovers rather than crashing — and how dev tools reveals what happened.",
        },
        {
          step: "Inspect your own page",
          detail:
            "Open dev tools on the new page, edit the heading in the panel, and confirm the file on disk is unchanged. Explain that dev tools edits are temporary and safe.",
        },
      ],
    },
    practice: {
      title: "Trace the web, then build a page",
      brief:
        "You trace a real website from DNS through HTTP using terminal commands, reverse-engineer one live site in developer tools, then set up a project folder and get your first HTML page running with Live Server.",
      steps: [
        "Resolve the domain of a real Nigerian business with nslookup and record the IP address.",
        "Make a raw HTTP request to it with curl -I and record the status code and content type.",
        "Deliberately request a path that does not exist and record the 404.",
        "Open a live business site and press F12.",
        "Inspect its main heading and write down the font family, size and colour you find.",
        "Change two styles live in the Elements panel and confirm the page responds.",
        "Open the Network panel, reload, and record the total request count and the largest file.",
        "Switch to a phone viewport and note one thing that breaks or survives.",
        "Create a project folder and open it in VS Code.",
        "Install Live Server and enable format on save and word wrap.",
        "Write a page with a doctype, head, title, an h1 and two paragraphs about a real business.",
        "Open it with Live Server, inspect it with F12, and change one thing in the panel.",
      ],
      standard:
        "A recorded trace showing DNS resolution, a real HTTP status code and a 404; a written reverse-engineering of one live site naming font, size, colour, request count and largest file; and a working project folder whose page loads via Live Server and can be inspected in developer tools.",
    },
    pitfalls: [
      {
        problem: "You edit the file but the browser does not change",
        fix: "Save it — Live Server reloads on save, and an unsaved file is the most common cause of 'my changes are not working'. Then hard-refresh with Ctrl+Shift+R to bypass the browser cache, which is the second most common cause.",
      },
      {
        problem: "You are looking for a layout problem in JavaScript",
        fix: "Layout is CSS. Ask which language owns the problem: structure is HTML, appearance is CSS, behaviour is JavaScript. Looking in the wrong one is how an afternoon disappears.",
      },
      {
        problem: "You ignore the console error",
        fix: "Read it. A red message naming a file and line is the browser telling you exactly what is wrong. Beginners stare at the code while the answer is printed one panel away.",
      },
      {
        problem: "You got a 404 and assumed the site was broken",
        fix: "A 404 means nothing exists at that path — usually a misnamed or misplaced file. It is an informative answer, not a catastrophe. Check the filename, its case, and its folder.",
      },
      {
        problem: "You thought your dev tools edits would save",
        fix: "They never do. Dev tools changes are temporary and refreshing restores the original, which is what makes it a safe place to experiment. Copy anything you like into your actual file.",
      },
      {
        problem: "You installed a stack of tools before writing anything",
        fix: "You need a text editor and a browser. Nothing else. Excess setup is procrastination, and a static business site needs no server running on your machine.",
      },
    ],
    expertNotes: [
      "Learn F12 as a reflex rather than a technique. Every debugging problem in front-end work is answered faster by inspecting the live page than by reading the source, and professionals reach for it before they reach for the code.",
      "Read the Network panel on every site you admire. Request count and largest file tell you how the page was built and where its compromises are, and it trains you to build pages that load fast on a Nigerian mobile connection rather than on a fibre line.",
      "Keep one folder per project and name it with the client and the date. It sounds trivial and it is the difference between finding a site you built eight months ago in ten seconds and spending an hour searching, which is exactly what happens when a client returns for a change.",
      "Practise by reverse-engineering rather than by copying tutorials. Inspecting a real site and rebuilding one section from what you find teaches decision-making; following a tutorial teaches typing.",
    ],
    vocabulary: [
      { term: "Client", meaning: "Whatever requests — your browser. The side that runs HTML, CSS and JavaScript." },
      { term: "Server", meaning: "A permanently connected computer holding files and answering requests." },
      { term: "DNS", meaning: "The system translating a domain name into an IP address, because networks route to numbers, not names." },
      { term: "IP address", meaning: "The numeric address of a machine on the network, such as 104.21.44.9." },
      { term: "HTTP request", meaning: "The client's message asking for a resource at a path. Every image and stylesheet is another one." },
      { term: "Status code", meaning: "The server's answer in a number: 200 found, 404 not found, 500 server error." },
      { term: "Browser cache", meaning: "Stored copies of files so a page loads faster. Hard-refresh with Ctrl+Shift+R to bypass it." },
      { term: "Developer tools", meaning: "The built-in F12 panel for inspecting and temporarily editing any live page." },
    ],
    homework: [
      {
        task: "Trace three websites",
        detail:
          "For each, record the resolved IP, the status code, the content type, the request count and the largest file. This makes the invisible machinery concrete.",
      },
      {
        task: "Reverse-engineer one site you admire",
        detail:
          "Inspect it and write down its heading font and size, its two main colours, its body font, and how many requests it makes. Bring the notes to the next session.",
      },
      {
        task: "Learn five dev tools habits",
        detail:
          "F12, click-to-inspect, edit a style live, open the Console, open the Network panel. Use only these for twenty minutes on any site.",
      },
      {
        task: "Build the smallest useful page",
        detail:
          "One folder, one HTML file, a title, an h1 and two paragraphs about a real business. Get it running with Live Server. Everything after this builds on it.",
      },
    ],
    rubric: [
      {
        criterion: "Architecture understanding",
        passing: "Can describe client and server.",
        excellent: "Explains the full sequence from DNS to rendered page, and can say which side a given problem lives on.",
      },
      {
        criterion: "Language roles",
        passing: "Knows the three languages exist.",
        excellent: "States what each owns and can identify which one to look in for a given symptom.",
      },
      {
        criterion: "Environment",
        passing: "Has an editor and a browser.",
        excellent: "VS Code with Live Server, format on save and word wrap configured, and a page loading automatically on save.",
      },
      {
        criterion: "Developer tools",
        passing: "Can open dev tools.",
        excellent: "Inspects elements, edits styles live, reads console errors and the Network panel, and uses the device toolbar.",
      },
      {
        criterion: "First page",
        passing: "Produces a page that loads.",
        excellent: "Correct document structure with a meaningful title, loads via Live Server, and can be inspected and temporarily edited in dev tools.",
      },
    ],
    faqs: [
      {
        q: "Do I need to install anything on my computer to run a website?",
        a: "Not to build a static one. A text editor and a browser are enough, and you can open the HTML file directly. A local server becomes necessary when you add a back end, which is what Web Development covers.",
      },
      {
        q: "Is HTML still worth learning with website builders around?",
        a: "Yes, and it is what makes you useful. Builders produce pages you cannot fix when they misbehave, and clients who outgrow a builder come to someone who understands the underlying structure. Knowing HTML also makes every builder easier to use.",
      },
      {
        q: "How much JavaScript do I need for this course?",
        a: "Very little. Business websites mostly use JavaScript other people wrote — a slider, a form handler, an analytics snippet. Sessions seven and eight show how to add those safely. Deep JavaScript is Web Development territory.",
      },
      {
        q: "What is the difference between this course and Web Development?",
        a: "Web Design is the front end: structure, presentation, layout, responsiveness, accessibility and publishing a site. Web Development adds the back end — databases, accounts, server logic and application behaviour. Most Nigerian small-business websites need only the front end.",
      },
      {
        q: "My page works on my laptop but not on my phone. Why?",
        a: "Almost always because it was never made responsive, or because you are testing by shrinking a desktop window rather than using the device toolbar. Session six covers responsive design properly; until then, test on a real phone, not on a narrowed browser.",
      },
    ],
  },

  "html-structure": {
    summary:
      "HTML is the part that decides whether a page means anything. This session covers document structure, the elements that make up every business page, semantic markup and why it matters, forms that actually collect what you need, images done properly, and the mistakes that quietly break pages.",
    objectives: [
      "Write correct HTML document structure and explain what each part does",
      "Use headings, paragraphs, lists, links and tables appropriately",
      "Apply semantic elements so structure carries meaning",
      "Build forms with labels, the right input types and validation",
      "Add images with alt text and sensible sizing",
      "Diagnose and fix the common structural mistakes",
    ],
    blocks: [
      {
        heading: "Document structure, and why each part exists",
        body: [
          "Every HTML page has the same skeleton, and each piece has a job. `<!DOCTYPE html>` tells the browser to render in modern standards mode — omit it and the browser guesses, using an old compatibility mode that produces subtly wrong layouts. `<html lang=\"en\">` is the root, and the `lang` attribute tells screen readers which language to pronounce and tells search engines which language the page is in; for Nigerian content that is usually `en`, and getting it right is a one-word accessibility win.",
          "`<head>` holds what is not displayed: the `<title>`, which is the single most important piece of text on the page because it is what appears in a browser tab, in a search result and in a shared link; `<meta charset=\"utf-8\">`, without which special characters such as the naira sign ₦ may render as garbage; the `<meta name=\"viewport\">` tag, without which a phone renders the page as a shrunken desktop page and users must pinch-zoom; and links to stylesheets.",
          "`<body>` holds everything visible. That division — head for metadata, body for content — is the whole structure. The mistakes to avoid are cosmetic ones people copy from templates: a missing doctype, a missing lang, a missing viewport meta, and a title left as 'Document' or 'Untitled'. That last one is surprisingly common on Nigerian business sites and it costs them search visibility on every page, because the title is the primary thing a search engine reads.",
        ],
      },
      {
        heading: "The elements a business page actually uses",
        body: [
          "You need fewer elements than you might expect. **Headings** run from `<h1>` to `<h6>` and they are not sizes — they are ranks in an outline. A page has exactly one `<h1>`, which states what the page is about; `<h2>` marks its major sections; `<h3>` subdivides those. Choosing a heading level because of how big it looks is the most common structural error, and it produces a page whose outline is meaningless. Size is CSS's job; rank is HTML's.",
          "**Paragraphs** are `<p>`. Do not create spacing with empty paragraphs or with line breaks — that is CSS's job too, and misusing it makes the page unreadable to assistive technology. **Lists** are `<ul>` for unordered items, `<ol>` where the order matters, and `<li>` for each item. Navigation menus are lists, semantically, even when styled to look horizontal.",
          "**Links** are `<a href=\"...\">` and they have rules worth knowing. A link to another page on your site uses a relative path — `about.html`, not `https://yoursite.com/about.html` — because relative paths keep working when you change domains. A link to an external site should usually open normally, not in a new tab, because hijacking the back button frustrates visitors. And every link needs descriptive text: 'See our prices' tells a screen-reader user what they are activating, while 'click here' tells them nothing until they have already clicked.",
          "**Tables** are for tabular data — a price list, a schedule — and never for layout. A table used for layout produces a page that cannot be reordered on a phone and is unreadable to a screen reader. If you are reaching for a table to position things, you want CSS layout, which session four covers.",
        ],
      },
      {
        heading: "Semantic HTML: structure that means something",
        body: [
          "Semantic elements describe what content *is* rather than how it looks: `<header>` for the top matter, `<nav>` for navigation, `<main>` for the primary content, `<section>` for a thematic grouping, `<article>` for something self-contained, `<aside>` for tangential material, and `<footer>` for the bottom matter. A page built from `<div>` tags for everything looks identical in a browser and is worthless to anything that cannot see it.",
          "Three groups benefit directly. **Screen readers** used by blind and low-vision visitors navigate by these landmarks — 'jump to main content', 'list the navigation' — and a page of divs gives them nothing to jump to. **Search engines** use them to understand which part of the page is the actual content, which affects how a page is indexed. And **you**, six months later, because `<footer>` is self-documenting while `<div class=\"thing3\">` is not.",
          "The practical rule is simple and it costs nothing: reach for the semantic element first and use `<div>` only when nothing fits. The single highest-value habit is putting one `<main>` around the page's primary content, because it gives assistive technology a way to skip the repeated navigation — which on a long page is the difference between usable and exhausting.",
        ],
      },
      {
        heading: "Forms that collect what you need",
        body: [
          "The contact form is where a business website earns its money, and most of them are built badly. A form is `<form>` containing inputs, each wrapped or paired with a `<label>`. The label is not decoration — the `for` attribute must match the input's `id`, which makes the label clickable to focus the field, and makes a screen reader announce what the field is for. An input without a label is effectively invisible to a blind visitor, and a form full of them fails regardless of how it looks.",
          "Use the **right input type**, because on a phone it changes the keyboard. `type=\"email\"` gives an @ key, `type=\"tel\"` gives a numeric keypad — which matters enormously for a Nigerian audience entering a phone number — `type=\"number\"` for quantities, `type=\"date\"` for a date picker, and `<textarea>` for anything longer than a sentence. Using `type=\"text\"` for everything forces users onto the wrong keyboard, which is a real usability failure, not a pedantic one.",
          "Add `required` to the fields you genuinely need, and use `placeholder` for a formatting example rather than as a label, because placeholder text disappears when typing begins and low-contrast placeholder text is hard to read. And be honest about what happens on submit: a form needs somewhere to send data, and on a static site that is a service such as Formspree or a WhatsApp link. A form that appears to work and silently discards the message is worse than no form at all, because the business believes it is receiving enquiries it never gets.",
        ],
      },
      {
        heading: "Images, and the mistakes that break pages",
        body: [
          "An image is `<img src=\"photo.jpg\" alt=\"description\">`. The `alt` attribute is required and is not optional politeness: a screen reader reads it aloud, a search engine indexes it, and it is what displays when the image fails to load. Write what the image actually shows — `alt=\"Two-tier wedding cake with white icing and fresh roses\"` — not `alt=\"image1\"`, which tells nobody anything. For a purely decorative image, use `alt=\"\"`, which correctly tells assistive technology to skip it.",
          "Always set `width` and `height` attributes, or set the size in CSS. Without them the browser does not know how much space the image needs until it arrives, so the page shifts as images load — which is genuinely disorienting and is one of the measurable quality signals search engines use. And compress images before uploading: a phone photograph is often several megabytes, and a page carrying five of them will not load on a Nigerian mobile connection. Resize to the largest size you will display and compress; the visual difference is nil and the load time difference is enormous.",
          "The structural mistakes that break pages are few and they are all catchable. **Unclosed tags** — a `<div>` with no `</div>` — cause everything after to nest wrongly, and the visible symptom is usually layout chaos far from the actual error, which is why beginners cannot find it. **Nesting errors** — a block element inside an inline one, or a `<p>` inside a `<p>` — are silently corrected by the browser into something you did not intend. And **misused headings for size** destroy the outline. Turn on your editor's error highlighting and read it; the browser will not tell you, because it is designed to recover rather than complain.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor builds the full HTML for a real Nigerian business — a bakery — from an empty file, narrating each element and its purpose, then deliberately introduces the classic mistakes and shows how each is diagnosed.",
      steps: [
        {
          step: "Write the skeleton and explain each part",
          detail:
            "Doctype, html with lang, head with charset, viewport, title, and an empty body. Explain what breaks if each is omitted, particularly the naira sign without utf-8.",
        },
        {
          step: "Write a title that works",
          detail:
            "Replace 'Document' with 'Adaeze Cakes — Custom Wedding & Birthday Cakes in Lagos'. Explain that the title is the primary thing a search engine reads and what appears in a shared link.",
        },
        {
          step: "Build the header and nav",
          detail:
            "Use header and nav with a list of links, using relative paths. Explain why relative paths survive a domain change and why nav is a list semantically.",
        },
        {
          step: "Add main and one h1",
          detail:
            "Wrap the primary content in main and write one h1 stating what the page is. Explain that assistive technology uses main to skip the repeated navigation.",
        },
        {
          step: "Build the heading outline",
          detail:
            "Add h2 for each section and h3 within them, choosing by rank not by size. Show the outline the page now has and contrast it with a size-driven version.",
        },
        {
          step: "Add content with lists and paragraphs",
          detail:
            "Use ul for services and p for copy. Show an empty-paragraph spacing hack and remove it, explaining that spacing belongs in CSS.",
        },
        {
          step: "Build the price table correctly",
          detail:
            "Use table with th and td for a genuine price list. Explain that this is legitimate tabular data and that a table used for layout is not.",
        },
        {
          step: "Add images with real alt text",
          detail:
            "Add product images with descriptive alt text, width and height. Show the page with images blocked so the alt text and the absence of layout shift are visible.",
        },
        {
          step: "Build the contact form",
          detail:
            "Add labelled inputs with type tel and email, a textarea, required fields, and a WhatsApp fallback link. Explain the keyboard difference on a phone.",
        },
        {
          step: "Add the footer",
          detail:
            "Use footer with address, phone and opening hours. Explain that consistent footer content across pages is what search engines and visitors both expect.",
        },
        {
          step: "Introduce an unclosed div",
          detail:
            "Delete one closing tag and show how the layout collapses far from the error. Then find it using the editor's highlighting and dev tools' nesting view.",
        },
        {
          step: "Validate and inspect the result",
          detail:
            "Run the page through a validator, fix what it reports, and inspect the finished structure in dev tools to confirm the landmarks are present.",
        },
      ],
    },
    practice: {
      title: "Build a complete business page in HTML",
      brief:
        "You build the full semantic HTML for a real Nigerian business — header, nav, main with a correct heading outline, content, a price table, images with real alt text, a labelled contact form and a footer — with no styling, so the structure has to stand on its own.",
      steps: [
        "Write the skeleton: doctype, html with lang, head with charset, viewport and a descriptive title.",
        "Build header and nav using a list of relative-path links.",
        "Wrap the primary content in a single main element.",
        "Write exactly one h1 stating what the page is about.",
        "Add h2 for each major section and h3 within them, choosing by rank not size.",
        "Write the copy in paragraphs and the services as a list — no empty paragraphs for spacing.",
        "Build a genuine price table using th and td.",
        "Add at least three images with descriptive alt text, width and height attributes.",
        "Add one decorative image with an empty alt attribute.",
        "Build the contact form with labels matched to input ids.",
        "Use type tel and type email so phones get the right keyboard, and mark genuinely needed fields required.",
        "Add a footer with address, phone and opening hours.",
        "Validate the page and fix everything reported.",
        "Inspect it in dev tools and confirm the landmarks are present.",
      ],
      standard:
        "A page with correct document structure, one h1 and a logical heading outline, semantic landmarks throughout, every form field labelled and typed appropriately, every meaningful image with descriptive alt text, and a validator report showing no errors — with no CSS anywhere in the file.",
    },
    pitfalls: [
      {
        problem: "Your headings are chosen by size, so the outline is nonsense",
        fix: "Choose by rank: one h1 per page, h2 for major sections, h3 within them. Size is CSS's job. A size-driven outline is meaningless to search engines and to screen readers.",
      },
      {
        problem: "Your form fields have no labels",
        fix: "Every input needs a label whose for matches the input's id. Placeholder text is not a label — it vanishes when typing starts, and an unlabelled field is effectively invisible to a screen reader.",
      },
      {
        problem: "You used type=\"text\" for the phone number",
        fix: "Use type=\"tel\" so phones show a numeric keypad. Forcing a Nigerian user onto a full keyboard to type a phone number is a real usability failure, not a pedantic point.",
      },
      {
        problem: "Your page shifts as images load",
        fix: "Set width and height on every image so the browser can reserve the space. Uncontrolled shifting is disorienting and is one of the quality signals search engines measure.",
      },
      {
        problem: "You used a table to lay the page out",
        fix: "Tables are for tabular data only. A layout table cannot be reordered on a phone and is unreadable to a screen reader. Use CSS layout instead.",
      },
      {
        problem: "An unclosed div wrecked the layout somewhere else",
        fix: "The symptom appears far from the cause. Use your editor's error highlighting and the dev tools nesting view rather than scanning by eye — the browser recovers silently, so it will not tell you.",
      },
      {
        problem: "Your images are several megabytes each",
        fix: "Resize to the largest displayed size and compress before uploading. A phone photograph can be several megabytes and five of them will not load on a Nigerian mobile connection.",
      },
    ],
    expertNotes: [
      "Write the HTML with no CSS at all, at least once per project. If the page reads sensibly as plain text, the structure is right; if it is confusing, no amount of styling will fix it. This is the fastest structural check there is.",
      "Give every page a real title before anything else. It is the primary text a search engine reads, it is what shows in a shared WhatsApp link, and 'Document' or 'Untitled' on a Nigerian business site is a free visibility loss that takes ten seconds to fix.",
      "Always specify where a form's data goes, and test it by actually submitting. A form that silently discards messages is worse than none, because the business believes it is receiving enquiries it never gets — and it usually takes months to notice.",
      "Compress images as a fixed step, not an afterthought. The visual difference after resizing and compressing is nil, and the load-time difference on a mobile connection is the difference between a visitor staying and leaving.",
    ],
    vocabulary: [
      { term: "DOCTYPE", meaning: "The declaration telling the browser to use modern standards mode. Omit it and the browser guesses." },
      { term: "Viewport meta", meaning: "The tag telling a phone to use its real width. Without it, pages render as shrunken desktop pages needing pinch-zoom." },
      { term: "Semantic element", meaning: "An element describing what content is — header, nav, main, section, footer — rather than a generic div." },
      { term: "Heading outline", meaning: "The ranked structure formed by h1 to h6. Chosen by importance, never by rendered size." },
      { term: "Alt text", meaning: "The description of an image, read aloud by screen readers and indexed by search engines. Required on every img." },
      { term: "Label", meaning: "The visible text describing a form field, linked by for to the input's id. Not the same as a placeholder." },
      { term: "Relative path", meaning: "A link written relative to the current file, such as about.html. Survives a domain change; absolute paths do not." },
      { term: "Layout shift", meaning: "Content moving as images load because their size was not declared. Disorienting, and a measured quality signal." },
    ],
    homework: [
      {
        task: "Build one business page with no CSS",
        detail:
          "Pick a real business and build its full HTML. Read it as plain text — if it makes sense unstyled, the structure is right.",
      },
      {
        task: "Write ten alt texts",
        detail:
          "For ten real photographs, write alt text describing what is actually shown. Then write one empty alt for a decorative image and note why the difference matters.",
      },
      {
        task: "Build a form properly",
        detail:
          "Name, phone, email, service needed, message — all labelled, correctly typed, with required on the essentials. Submit it and confirm where the data actually goes.",
      },
      {
        task: "Validate three pages you find online",
        detail:
          "Run three Nigerian business sites through a validator and count the errors. Note which are structural and which are cosmetic — this calibrates what actually matters.",
      },
    ],
    rubric: [
      {
        criterion: "Document structure",
        passing: "Page loads and displays content.",
        excellent: "Doctype, lang, charset, viewport and a descriptive title all present, with head and body correctly divided.",
      },
      {
        criterion: "Headings",
        passing: "Has headings.",
        excellent: "Exactly one h1, then h2 and h3 chosen by rank, forming a meaningful outline with no levels skipped for size.",
      },
      {
        criterion: "Semantics",
        passing: "Uses some semantic tags.",
        excellent: "header, nav, main, section and footer used appropriately, with div reserved for cases where nothing fits.",
      },
      {
        criterion: "Forms",
        passing: "Has a form.",
        excellent: "Every field labelled with matching for and id, correct input types for phone and email, required used judiciously, and a real submission target tested.",
      },
      {
        criterion: "Images and validity",
        passing: "Images appear.",
        excellent: "Descriptive alt text on every meaningful image, empty alt on decorative ones, dimensions declared, files compressed, and a clean validator report.",
      },
    ],
    faqs: [
      {
        q: "Does semantic HTML really matter, or does it look the same anyway?",
        a: "It looks identical in a browser and it matters anyway. Screen readers navigate by landmarks, so a page of divs is exhausting for a blind visitor; search engines use the same elements to identify real content; and it makes your own code readable months later. It costs nothing to do correctly.",
      },
      {
        q: "Can I have more than one h1 on a page?",
        a: "You should not. One h1 per page stating what the page is about, then h2 for major sections. Multiple h1s produce an ambiguous outline, which weakens both search indexing and assistive navigation.",
      },
      {
        q: "My form does not send anywhere. What do I do?",
        a: "A static site has no server to receive it. Use a form-handling service such as Formspree, or replace the form with a WhatsApp link, which is often better in Nigeria because the customer already has the app. Either way, submit it yourself and confirm the message arrives.",
      },
      {
        q: "Do I need alt text on every single image?",
        a: "Every img needs the attribute. Meaningful images need a real description; purely decorative ones get alt=\"\" which correctly tells assistive technology to skip them. Omitting the attribute entirely is the error, because the browser may then read the filename aloud.",
      },
      {
        q: "How big should my images be?",
        a: "Resize to the largest size you will actually display — usually no more than about 1600 pixels wide for a full-width hero — and compress. For most Nigerian business sites, keeping the whole page under a couple of megabytes is the target that makes it usable on mobile data.",
      },
    ],
  },

  "css-fundamentals": {
    summary:
      "CSS is what makes a page look deliberate. This session covers how CSS is attached and how conflicts resolve, the box model that governs every layout, colour and typography, and the spacing system that separates designed pages from accidental ones.",
    objectives: [
      "Attach CSS three ways and explain when each is appropriate",
      "Write selectors and predict which rule wins in a conflict",
      "Apply the box model correctly, including box-sizing",
      "Use colour deliberately with a palette and accessible contrast",
      "Set type with a scale, line height and readable line length",
      "Build a consistent spacing system rather than guessing margins",
    ],
    blocks: [
      {
        heading: "Three ways to attach CSS, and the one to use",
        body: [
          "CSS reaches HTML three ways. **Inline**, in a `style` attribute on an element — useful for nothing except a quick experiment, because it cannot be reused and it is nearly impossible to override later. **Internal**, in a `<style>` block in the head — fine for a single-page experiment. **External**, in a separate `.css` file linked with `<link rel=\"stylesheet\" href=\"styles.css\">` — which is what you will use for everything real.",
          "The external file is not a preference, it is the architecture. One stylesheet can restyle an entire site, so changing the brand colour becomes a one-line edit instead of a hundred; the browser caches it, so every page after the first loads faster; and the separation keeps HTML readable, which matters when you return to a client's site eight months later to change one thing. The convention is one folder with `index.html`, `styles.css` and an `images` folder — simple, obvious, and what every other developer expects.",
        ],
      },
      {
        heading: "Selectors and the cascade",
        body: [
          "A **selector** picks which elements a rule applies to. The ones you need constantly: an **element** selector (`p`, `h2`) targets all of that type; a **class** selector (`.card`) targets anything carrying `class=\"card\"` and is reusable, which makes it the workhorse; an **id** selector (`#hero`) targets one unique element and should be rare, because it cannot be reused and it is difficult to override; a **descendant** selector (`.card p`) targets paragraphs inside cards; and a **pseudo-class** like `a:hover` targets a state.",
          "When two rules conflict, the **cascade** decides, in this order. **Specificity** first: an id beats a class, a class beats an element, so `#hero { color: red }` defeats `.title { color: blue }` even if the class rule comes later. Where specificity ties, **source order** wins — the later rule beats the earlier one, which is why the order of your stylesheet matters and why a reset or base stylesheet always goes first. Inline styles beat all of those, and `!important` beats everything, which is exactly why you should almost never use it: it does not solve a specificity problem, it buries it, and the next person to edit the file inherits a puzzle.",
          "The practical discipline is to write most rules against classes and keep specificity flat. When you find yourself chaining selectors to win a fight — `.page .section .card p` — that is a signal the stylesheet is disorganised, not that you need a longer selector.",
        ],
      },
      {
        heading: "The box model: the thing everything rests on",
        body: [
          "Every element on a page is a rectangle, and that rectangle has four layers working outward: the **content**, then **padding** (space inside the element, between content and its edge), then the **border**, then the **margin** (space outside, pushing other elements away). Every layout problem you will ever meet is one of these four being a value you did not expect, which is why the box diagram in dev tools is the first place to look when something is misplaced.",
          "The trap is how width is calculated. By default, `width: 300px` means the content is 300 pixels and padding and border are added on top, so the element actually occupies more than 300 — which is why a 300px box with 20px padding and a 1px border is 342 pixels wide and does not fit where you expected. The fix is one line at the top of every stylesheet: `*, *::before, *::after { box-sizing: border-box; }`. With border-box, the width you declare is the width the element occupies, padding and border included, which makes layout arithmetic behave the way your head expects it to. Write it once and forget it; omit it and lose hours.",
          "Then learn the difference between **block** and **inline** elements, because it governs what you can do to them. A block element — `div`, `p`, `h1` — takes the full available width and starts on a new line, and accepts width, height, margin and padding fully. An inline element — `span`, `a`, `strong` — sits within a line, and width and height are ignored on it. When a width or a margin mysteriously does nothing, the usual reason is that the element is inline.",
        ],
      },
      {
        heading: "Colour, deliberately",
        body: [
          "Declare colour as **custom properties** at the top of your stylesheet — `:root { --brand: #C2410C; --ink: #1A1A1A; --surface: #FAF7F2; }` — and then use `var(--brand)` everywhere. This is not ceremony. It means the entire site's palette lives in one place, so a rebrand is four lines rather than a search-and-replace across a file, and it makes the palette visible to anyone reading the code. It is also the mechanism behind dark mode and theme switching, should a client ever ask.",
          "Use the palette discipline from Graphic Design: a dominant, a secondary neutral, a text colour and one accent, in roughly 60-30-10 proportions. And check **contrast**, because it is a requirement rather than a preference: body text needs at least 4.5:1 against its background. Low-contrast grey text on white is the most common accessibility failure on Nigerian business sites, and it is invisible to the person who designed it on a calibrated screen in a dim room — which is why you measure it rather than judge it.",
          "Prefer a near-black like `#1A1A1A` over pure `#000000` for text, and an off-white over pure white for large backgrounds. Pure black on pure white creates harsh edges and reads as unrefined; the softened pair looks more considered for exactly the same effort.",
        ],
      },
      {
        heading: "Typography and the spacing system",
        body: [
          "Type carries more of a page's quality than anything else. Declare a **font stack** rather than a single family — `font-family: 'Inter', system-ui, sans-serif` — so that if the web font fails to load, the system font takes over rather than the browser's default serif. Load web fonts from Google Fonts with a `<link>`, but load **only the weights you use**, because each weight is another file to download and font loading is one of the most common causes of a slow page.",
          "Set a **base size** on `body` — 16px to 18px is right for reading — then size headings from a **scale** using `rem` units, which are relative to that base. A 1.25 ratio from an 18px base gives roughly 22.5, 28 and 35px. Using `rem` rather than `px` means the whole page respects a user who has increased their browser's default text size, which is a real accessibility behaviour and one that `px` silently defeats. Set **line height** around 1.5 for body text and 1.15 for headings, and constrain body copy to roughly 60–75 characters per line with `max-width`, because a line running the full width of a desktop is genuinely hard to read.",
          "Finally, spacing. Do not invent margins element by element — define a scale as custom properties (`--space-1: 0.5rem; --space-2: 1rem; --space-3: 2rem; --space-4: 4rem`) and use only those values. A page whose spacing comes from a scale looks ordered even when nobody can say why; a page whose margins were chosen individually looks arbitrary even when every individual choice was reasonable. This one habit is the largest single visual improvement available to a beginner's work, and it costs nothing.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor styles the bakery page built in session two from unstyled HTML to a finished design, narrating every decision, then deliberately creates the classic failures and diagnoses each in dev tools.",
      steps: [
        {
          step: "Link an external stylesheet",
          detail:
            "Create styles.css and link it in the head. Show inline and internal alternatives and explain why the external file is the architecture rather than a preference.",
        },
        {
          step: "Set box-sizing first",
          detail:
            "Write the universal border-box rule and demonstrate the difference by measuring a 300px box with 20px padding before and after. Explain the hours this one line saves.",
        },
        {
          step: "Define the palette as custom properties",
          detail:
            "Declare brand, ink, surface and accent in :root and apply them with var(). Then change one value and watch the whole page change.",
        },
        {
          step: "Check contrast",
          detail:
            "Run the text-on-background pair through a contrast checker, compare with 4.5:1, and adjust until it passes. Explain why measuring beats judging on a dim screen.",
        },
        {
          step: "Load fonts properly",
          detail:
            "Add a Google Fonts link requesting only two weights, declare a font stack with a system fallback, and show what happens when the web font is blocked.",
        },
        {
          step: "Set the type scale in rem",
          detail:
            "Set an 18px body base and derive heading sizes from a 1.25 ratio. Then increase the browser's default text size and show the page responding.",
        },
        {
          step: "Constrain line length",
          detail:
            "Add max-width to body copy and show the before and after in readability. Explain that a full-width desktop line is genuinely hard to read.",
        },
        {
          step: "Define the spacing scale",
          detail:
            "Declare four spacing custom properties and replace every ad-hoc margin with one of them. Show the page becoming visibly ordered with no other change.",
        },
        {
          step: "Style the header and nav",
          detail:
            "Apply padding, a background and a hover state to links. Explain that a hover state is feedback and its absence makes a page feel broken.",
        },
        {
          step: "Create a specificity conflict",
          detail:
            "Write two conflicting rules, one by class and one by id, and show which wins and why. Then resolve it by flattening specificity rather than by adding !important.",
        },
        {
          step: "Diagnose a box model surprise",
          detail:
            "Remove border-box and watch a layout overflow. Use the dev tools box diagram to identify that padding was added outside the declared width.",
        },
        {
          step: "Review the finished page",
          detail:
            "Compare with the unstyled version, confirm contrast passes, and list what changed. Note that every improvement came from a system rather than a tweak.",
        },
      ],
    },
    practice: {
      title: "Style the business page properly",
      brief:
        "You take the semantic HTML from session two and style it into a finished page using an external stylesheet, custom properties for palette and spacing, a rem-based type scale, verified contrast, and no !important anywhere.",
      steps: [
        "Create styles.css and link it externally; remove any inline styles from the HTML.",
        "Write the universal border-box rule at the top of the file.",
        "Declare the palette in :root as custom properties and apply them with var().",
        "Check every text-and-background pair against a contrast checker; all must pass 4.5:1.",
        "Load two font weights from Google Fonts and declare a stack with a system fallback.",
        "Set an 18px body base and derive all heading sizes in rem from one ratio.",
        "Set line height to about 1.5 for body and 1.15 for headings.",
        "Constrain body copy with max-width so lines run 60–75 characters.",
        "Declare a four-value spacing scale and use only those values for every margin and padding.",
        "Style the header, nav and footer with padding, background and hover states on links.",
        "Resolve any conflicting rule by flattening specificity rather than using !important.",
        "Increase your browser's default text size and confirm the page still works.",
      ],
      standard:
        "An external stylesheet with box-sizing set, palette and spacing held in custom properties, a rem-based type scale with readable line length and line height, all text passing 4.5:1 contrast, no !important anywhere, and the page still legible when the browser's default text size is increased.",
    },
    pitfalls: [
      {
        problem: "Your declared width does not match the space the element takes",
        fix: "Padding and border are added outside the declared width by default. Put `*, *::before, *::after { box-sizing: border-box }` at the top of every stylesheet and the arithmetic behaves as expected.",
      },
      {
        problem: "Your rule is being ignored and you do not know why",
        fix: "Something more specific is winning — an id beats a class, a class beats an element. Check the Styles panel in dev tools, which shows every matching rule and which one won. Do not reach for !important; flatten the specificity instead.",
      },
      {
        problem: "Your width or margin has no effect",
        fix: "The element is probably inline. Width and height are ignored on inline elements such as span and a. Change the display or use a block-level element.",
      },
      {
        problem: "You used !important to win a fight",
        fix: "It buries the problem rather than solving it, and the next person inherits a puzzle. Find the conflicting rule and restructure so specificity is flat.",
      },
      {
        problem: "Your grey text on white is hard to read",
        fix: "Measure it — body text needs 4.5:1. Darken the text to a near-black and check on a phone in bright light, because a dim room makes low contrast look acceptable.",
      },
      {
        problem: "Your sizes are in px so the page ignores the user's text setting",
        fix: "Use rem for font sizes, based on a body base size. A user who has increased their browser's default text size is silently defeated by px, which is a real accessibility failure.",
      },
      {
        problem: "Your margins were chosen one at a time and the page looks arbitrary",
        fix: "Define a spacing scale of four values and use only those. A page whose spacing comes from a scale reads as ordered even when nobody can say why.",
      },
    ],
    expertNotes: [
      "Write the border-box rule and the palette custom properties before anything else, in every project. Those two habits remove the most common layout confusion and make every later decision faster, and they cost about six lines.",
      "Diagnose in the dev tools Styles panel rather than by reading your stylesheet. It lists every rule matching the selected element, in the order the cascade resolved them, with overridden declarations struck through — which answers 'why is this not applying' instantly.",
      "Load only the font weights you actually use. Each weight is a separate download and font loading is a leading cause of slow pages, particularly on mobile data where a Nigerian visitor will abandon before the fourth file arrives.",
      "Test the page with your browser's text size increased. It takes five seconds and it verifies that your rem-based scale, line heights and max-widths all still work — which is both an accessibility check and a robustness check on your own layout.",
    ],
    vocabulary: [
      { term: "External stylesheet", meaning: "A separate .css file linked from the head. The architecture that lets one file restyle a whole site." },
      { term: "Selector", meaning: "The part of a rule choosing which elements it applies to. Classes are the workhorse because they are reusable." },
      { term: "Specificity", meaning: "The ranking that decides which conflicting rule wins: id beats class, class beats element." },
      { term: "Cascade", meaning: "The resolution order for conflicts — specificity first, then source order. Why stylesheet order matters." },
      { term: "Box model", meaning: "Content, padding, border and margin, outward. Every layout problem is one of these four." },
      { term: "box-sizing: border-box", meaning: "Makes the declared width include padding and border, so layout arithmetic matches expectation." },
      { term: "Custom property", meaning: "A CSS variable declared in :root and used with var(). Holds the palette and spacing scale in one place." },
      { term: "rem", meaning: "A unit relative to the browser's base font size. Respects the user's text-size setting, unlike px." },
    ],
    homework: [
      {
        task: "Style one real page",
        detail:
          "Take the HTML from session two and finish the styling. Check contrast, use only scale values for spacing, and confirm there is no !important in the file.",
      },
      {
        task: "Read the Styles panel on five elements",
        detail:
          "On any live site, select five elements and read which rules matched and which won. This is the fastest way to internalise the cascade.",
      },
      {
        task: "Build a palette and spacing scale",
        detail:
          "Declare four colours and four spacing values as custom properties for a real brand, and rebuild one page using only those. Note how much faster the decisions become.",
      },
      {
        task: "Test with increased text size",
        detail:
          "Increase your browser's default text size two steps and check a page you built. Note anything that overflows or overlaps, and fix it with rem rather than px.",
      },
    ],
    rubric: [
      {
        criterion: "Architecture",
        passing: "Styles appear on the page.",
        excellent: "An external stylesheet, box-sizing set universally, and no inline styles left in the HTML.",
      },
      {
        criterion: "Cascade command",
        passing: "Rules apply as expected.",
        excellent: "Can explain which rule wins and why, resolves conflicts by flattening specificity, and uses no !important.",
      },
      {
        criterion: "Box model",
        passing: "Layout mostly works.",
        excellent: "Border-box set, spacing chosen from padding versus margin deliberately, and any overflow diagnosed with the dev tools box diagram.",
      },
      {
        criterion: "Colour and type",
        passing: "The page is readable.",
        excellent: "Palette in custom properties, all text passing 4.5:1, a rem-based scale, line height and max-width set for readability.",
      },
      {
        criterion: "System",
        passing: "Spacing looks reasonable.",
        excellent: "A four-value spacing scale used everywhere, font weights limited to those used, and the page still works with increased browser text size.",
      },
    ],
    faqs: [
      {
        q: "Why is my CSS not applying at all?",
        a: "In order of likelihood: the file is not saved, the link path is wrong, the filename case does not match, or a more specific rule is overriding it. Check the Network panel to confirm the stylesheet actually loaded with a 200 status, then check the Styles panel for what is overriding it.",
      },
      {
        q: "Should I use a framework like Tailwind or Bootstrap?",
        a: "Not before you understand plain CSS. A framework hides the box model and the cascade, so when it misbehaves you have nothing to fall back on. Learn the fundamentals here, then pick up a framework quickly — most developers who know the basics learn one in a weekend.",
      },
      {
        q: "What is the difference between padding and margin?",
        a: "Padding is space inside an element, between its content and its border — it grows the clickable or coloured area. Margin is space outside, pushing other elements away. If you want a button to feel larger, use padding; if you want space between two sections, use margin.",
      },
      {
        q: "Why does nothing happen when I set a width on a link?",
        a: "Links are inline by default and inline elements ignore width and height. Add display: inline-block or display: block, or the width will have no effect. This surprises everyone once.",
      },
      {
        q: "What units should I use?",
        a: "rem for font sizes so the page respects the user's text setting, rem or percentages for spacing and widths so layout is flexible, and px only for fine details such as borders and shadows. Avoid px for font sizes — it silently defeats accessibility settings.",
      },
    ],
  },
};
