import type { SessionLecture } from "../types";

/**
 * Web Design — ₦25,000 · 4 weeks · 8 sessions.
 * Sessions 4 to 6. (Sessions 1–3 in web-design.ts, 7–8 in web-design-c.ts.)
 */
export const webDesignLessonsB: Record<string, SessionLecture> = {
  "css-layout": {
    summary:
      "Layout is where CSS either makes sense or fights you. This session covers Flexbox and Grid — what each is for, the properties that actually matter — plus the practical patterns behind every business website: a navigation bar, a card row, a two-column section, a footer, and a hero.",
    objectives: [
      "Explain when to use Flexbox and when to use Grid",
      "Control direction, alignment, spacing and wrapping with Flexbox",
      "Build two-dimensional layouts with Grid tracks and areas",
      "Choose the right tool for a given layout in one decision",
      "Build the five layout patterns every business site needs",
      "Debug layout with dev tools rather than by guessing",
    ],
    blocks: [
      {
        heading: "The one decision: Flexbox or Grid",
        body: [
          "The distinction is simple and it resolves almost every layout question. **Flexbox** arranges things in **one dimension** — a row, or a column. It is the right tool when you have a set of items that should sit next to each other, share space, and possibly wrap onto another line: a navigation bar, a row of cards, a group of buttons, a form field with its label. **Grid** arranges things in **two dimensions** — rows and columns at once. It is the right tool when you are placing items into a defined structure: a page layout, a gallery, a dashboard, anything where the position of an item matters relative to both axes.",
          "A useful way to hold it: with Flexbox the **content decides** the layout — items size themselves and share the available space. With Grid the **layout decides** — you define the tracks first and place content into them. That is why a navigation bar is Flexbox, because its items should adapt to their own widths, while a page skeleton is Grid, because the header, sidebar and footer positions are fixed by the design.",
          "They are not competitors and a real page uses both. The overall page structure is Grid; the navigation inside the header is Flexbox; a row of service cards is Grid; the contents of each card are Flexbox. Recognising the nesting is what makes layout stop feeling arbitrary.",
        ],
      },
      {
        heading: "Flexbox: the properties that matter",
        body: [
          "Set `display: flex` on the container and its direct children become flex items. From there four properties do nearly all the work. **`flex-direction`** sets the axis — `row` is the default, `column` stacks them. **`justify-content`** distributes space along the main axis: `flex-start`, `center`, `flex-end`, `space-between` (first item at the start, last at the end, gaps between) and `space-around`. **`align-items`** aligns across the other axis: `stretch` is the default, `center` vertically centres, which is what you want nine times out of ten. **`gap`** sets space between items, and it has replaced the old habit of adding margins to items — use `gap` and delete the margins.",
          "The property that confuses everyone is the one on the **item**, not the container: `flex`. Shorthand `flex: 1` means 'grow to fill the available space', which is how you make three cards share a row equally. `flex: 2` makes one item take twice the space of its siblings. Without any `flex` value, items size to their content, which is often what you want for a navigation bar and never what you want for a card row.",
          "Add **`flex-wrap: wrap`** when items should drop to a new line rather than squash, which matters for anything containing variable-width content on a narrow screen. And note that the classic trick for perfect vertical and horizontal centreing is now three lines — `display: flex; justify-content: center; align-items: center` — where it used to require a paragraph of hacks. This is the single most useful thing Flexbox gave us.",
        ],
      },
      {
        heading: "Grid: tracks, placement and the patterns",
        body: [
          "Set `display: grid` on the container, then define the structure. **`grid-template-columns`** lists the column tracks, and the `fr` unit means 'a fraction of the available space' — `grid-template-columns: 1fr 2fr` gives two columns with the second twice as wide. `repeat(3, 1fr)` gives three equal columns, which is the most common thing you will write. **`grid-template-rows`** does the same vertically. `gap` works exactly as it does in Flexbox.",
          "The most valuable modern Grid feature is **`minmax()` combined with `auto-fit`**: `grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))` creates as many columns of at least 260px as will fit, each stretching to share the space, and it reflows automatically as the screen narrows. That single line produces a responsive card grid with **no media queries at all**, and it is the pattern behind most modern card layouts. Learn it and you will use it constantly.",
          "For a whole-page skeleton, **named grid areas** are the clearest approach: define `grid-template-areas` with a little ASCII picture — `\"header header\" \"sidebar main\" \"footer footer\"` — then assign each element a `grid-area`. The layout becomes readable at a glance, which is exactly what a client-facing codebase needs. And for placing a single item, `grid-column: span 2` makes it cross two columns, which is how you build an asymmetric feature section.",
        ],
      },
      {
        heading: "The five patterns every business site needs",
        body: [
          "**The navigation bar** is Flexbox with `justify-content: space-between` — logo on the left, links on the right — and the links themselves are a Flexbox list with a `gap`. On a phone it collapses, which session six handles. **The hero** is usually a section with a background image, a constrained-width text block, and Flexbox for vertical alignment; the essential detail is `min-height` rather than a fixed height, so it adapts to content instead of clipping it.",
          "**The card row** is Grid with the `auto-fit`/`minmax` pattern, and each card is internally Flexbox in `column` direction with `flex: 1` on the description so the buttons line up along the bottom regardless of how much text each card has — a small trick that makes a set of cards look properly designed rather than accidentally aligned. **The two-column section** is Grid with `grid-template-columns: 1fr 1fr`, or `2fr 1fr` when one side should dominate; it collapses to one column on a phone.",
          "**The footer** is Grid with three or four columns of links, collapsing to one column on a phone. And **the container** — a wrapper class with `max-width` and `margin-inline: auto` plus horizontal padding — is the pattern that keeps content from running edge to edge on a wide desktop while staying readable. Every business site you build will use that container class dozens of times, so define it once, early.",
        ],
      },
      {
        heading: "Debugging layout without guessing",
        body: [
          "Layout debugging is a skill with a method, and the method is: **look before you change**. Select the misbehaving element in dev tools and the box diagram shows its content, padding, border and margin sizes; if it has a Flex or Grid parent, dev tools draws the container's structure and shows how space was distributed. Reading that for ten seconds usually identifies the problem, whereas editing values at random can take an hour and still leave you not knowing why it works.",
          "The common causes are a short list. **An overflow** is usually a child wider than its parent, or a missing `box-sizing: border-box`, or an image at its natural size rather than `max-width: 100%`. **Vertical alignment not working** is usually `align-items` on the wrong axis, or the parent has no height to align within. **Items squashed rather than wrapping** means `flex-wrap: wrap` is missing. **A Grid item in the wrong place** means the track definition and the placement disagree. And **a margin that appears to do nothing** is usually margin collapsing between adjacent block elements.",
          "The professional habit is the temporary outline: add `* { outline: 1px solid red }` while diagnosing. It shows every box's boundary instantly and makes the invisible structure visible. It looks crude and it is faster than any amount of squinting. Remove it before delivery — and this is the reason to keep it out of the committed file, because a red-outlined page in front of a client is not a good look.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor builds all five business layout patterns live on the bakery page, choosing the tool out loud for each, then breaks each one and diagnoses it with dev tools rather than by guessing.",
      steps: [
        {
          step: "Define the container class first",
          detail:
            "Write a container with max-width, auto inline margins and horizontal padding. Explain that this one class keeps content readable on a wide desktop and is used dozens of times per site.",
        },
        {
          step: "Build the nav with Flexbox",
          detail:
            "Use display flex with justify-content: space-between for logo and links, and gap on the link list. Explain why Flexbox rather than Grid — the items should size to their content.",
        },
        {
          step: "Build the hero",
          detail:
            "Use a section with a background image, min-height rather than height, and Flexbox for vertical centring. Show what a fixed height does when the text wraps on a narrow screen.",
        },
        {
          step: "Build the card row with Grid",
          detail:
            "Write repeat(auto-fit, minmax(260px, 1fr)) and resize the window to show it reflowing with no media queries. Explain that this one line is most modern card grids.",
        },
        {
          step: "Align the card contents",
          detail:
            "Make each card Flexbox column with flex: 1 on the description so buttons line up along the bottom. Show the before, where differing text lengths leave ragged buttons.",
        },
        {
          step: "Build a two-column section",
          detail:
            "Use grid-template-columns: 1fr 1fr for equal halves, then change to 2fr 1fr to show one side dominating. Explain that this collapses to one column on a phone.",
        },
        {
          step: "Build the page skeleton with named areas",
          detail:
            "Define grid-template-areas as an ASCII picture and assign each element a grid-area. Show how readable the layout becomes at a glance.",
        },
        {
          step: "Build the footer grid",
          detail:
            "Use three columns of links with gap, and note that it will collapse to one column on a phone.",
        },
        {
          step: "Break the layout and read the box diagram",
          detail:
            "Remove border-box and show the overflow. Diagnose it in the dev tools box diagram rather than by editing values.",
        },
        {
          step: "Diagnose a squashed row",
          detail:
            "Narrow the window until the nav squashes, identify the missing flex-wrap: wrap, and add it.",
        },
        {
          step: "Use the temporary outline",
          detail:
            "Add a universal red outline to reveal every box boundary, find the misplaced Grid item, and remove the outline afterwards.",
        },
        {
          step: "Review the five patterns",
          detail:
            "List the tool used for each and why. Emphasise that a real page nests both: Grid for structure, Flexbox for contents.",
        },
      ],
    },
    practice: {
      title: "Build the five patterns, then break and fix them",
      brief:
        "You build a navigation bar, a hero, a card row, a two-column section and a footer using the correct tool for each, then deliberately break each one and diagnose it with dev tools rather than by editing at random.",
      steps: [
        "Define a reusable container class with max-width, centred margins and horizontal padding.",
        "Build the nav with Flexbox, space-between, and gap on the link list.",
        "Build the hero with min-height and Flexbox vertical centring.",
        "Build the card row with Grid using repeat(auto-fit, minmax(260px, 1fr)).",
        "Make each card a Flexbox column with flex: 1 on the description so buttons align along the bottom.",
        "Build a two-column section at 1fr 1fr, then change it to 2fr 1fr and note the difference.",
        "Build a page skeleton using named grid areas.",
        "Build a three-column footer with gap.",
        "Remove box-sizing and diagnose the resulting overflow with the dev tools box diagram.",
        "Narrow the window until the nav squashes, identify the missing flex-wrap, and add it.",
        "Use a temporary universal outline to find a misplaced Grid item, then remove the outline.",
        "Write one line for each pattern stating which tool you chose and why.",
      ],
      standard:
        "All five patterns built with the correct tool and a written justification for each choice, cards with aligned bottoms, the auto-fit card grid reflowing without media queries, and every deliberately broken layout diagnosed by reading dev tools rather than by trial and error.",
    },
    pitfalls: [
      {
        problem: "You used Grid for a navigation bar",
        fix: "Use Flexbox. Nav items should size to their own content and share space, which is content-driven layout. Grid is for placing items into a defined structure.",
      },
      {
        problem: "You added margins to items instead of using gap",
        fix: "Use gap on the container. Margins on items create uneven outer spacing that you then have to correct, and gap handles the between-space correctly in both Flexbox and Grid.",
      },
      {
        problem: "Your items squash instead of wrapping on a narrow screen",
        fix: "Add flex-wrap: wrap. Without it, flex items shrink to fit rather than dropping to a new line, which produces unreadably narrow items.",
      },
      {
        problem: "Your card buttons do not line up",
        fix: "Make each card Flexbox column and put flex: 1 on the description. That pushes the button to the bottom of the tallest card's height, which is what makes a card set look designed.",
      },
      {
        problem: "You are editing values at random until it looks right",
        fix: "Read the dev tools box diagram and the Flex or Grid container visualisation first. Ten seconds of looking beats an hour of guessing, and you will actually know why the fix works.",
      },
      {
        problem: "You left the red debug outline in the delivered file",
        fix: "Remove it before delivery. The universal outline is a diagnostic aid, and a red-outlined page in front of a client is not the impression you want to leave.",
      },
      {
        problem: "Your hero clips its text on a phone",
        fix: "You used a fixed height. Use min-height so the section grows with its content instead of clipping it.",
      },
    ],
    expertNotes: [
      "Learn `repeat(auto-fit, minmax(260px, 1fr))` as a single memorised phrase. It produces a responsive card grid with no media queries, and once it is reflex you will reach for it in almost every project.",
      "Nest deliberately: Grid for the page structure, Flexbox for the contents of each region. Most layout confusion comes from trying to do both jobs with one tool, and recognising the nesting makes complex pages straightforward.",
      "Keep a snippets file of the five patterns. Copying a known-good nav or card row is faster and more reliable than rewriting it, and consistency across client sites is itself a professional signal.",
      "Diagnose with the temporary universal outline whenever a layout is genuinely puzzling. Seeing every box boundary at once resolves in seconds what squinting at a rendered page cannot, and it is the fastest habit in this session to acquire.",
    ],
    vocabulary: [
      { term: "Flexbox", meaning: "One-dimensional layout — a row or a column — where content decides how space is shared." },
      { term: "Grid", meaning: "Two-dimensional layout — rows and columns together — where the defined structure decides placement." },
      { term: "fr unit", meaning: "A fraction of available space in Grid. 1fr 2fr gives two columns with the second twice as wide." },
      { term: "auto-fit with minmax", meaning: "The pattern repeat(auto-fit, minmax(260px, 1fr)) creating as many columns as fit, reflowing with no media queries." },
      { term: "justify-content", meaning: "Distribution along the main axis in Flexbox. space-between is the workhorse for nav bars." },
      { term: "align-items", meaning: "Alignment across the other axis. center gives the vertical centring that used to require hacks." },
      { term: "gap", meaning: "Space between items, set on the container. Replaces the habit of adding margins to items." },
      { term: "Grid areas", meaning: "Named regions defined as an ASCII picture in grid-template-areas, making a page skeleton readable at a glance." },
    ],
    homework: [
      {
        task: "Build the five patterns from scratch",
        detail:
          "Nav, hero, card row, two-column section, footer — each with the correct tool and one line saying why. Save them as a snippets file you will reuse.",
      },
      {
        task: "Master one Flexbox property a day",
        detail:
          "justify-content, align-items, flex-wrap, gap, flex. Build a small example for each and note what it changes.",
      },
      {
        task: "Rebuild one layout you admire",
        detail:
          "Inspect a real site's layout in dev tools, identify whether it is Flexbox or Grid, and rebuild one section from what you find.",
      },
      {
        task: "Diagnose three broken layouts",
        detail:
          "Deliberately break three of your layouts, then fix each by reading dev tools first and writing down the cause before changing anything.",
      },
    ],
    rubric: [
      {
        criterion: "Tool choice",
        passing: "Uses Flexbox or Grid.",
        excellent: "Chooses correctly for each of the five patterns and can state in one line why, including where both are nested.",
      },
      {
        criterion: "Flexbox command",
        passing: "Can lay items in a row.",
        excellent: "Controls direction, justify-content, align-items, gap and wrap fluently, and uses flex on items to distribute space.",
      },
      {
        criterion: "Grid command",
        passing: "Can make columns.",
        excellent: "Uses fr tracks, repeat with auto-fit and minmax for a reflowing card grid, and named areas for a page skeleton.",
      },
      {
        criterion: "Patterns",
        passing: "Produces most of the five.",
        excellent: "All five built to a professional standard, including cards with aligned bottoms and a hero using min-height.",
      },
      {
        criterion: "Debugging",
        passing: "Fixes layout problems eventually.",
        excellent: "Diagnoses by reading the box diagram and container visualisation first, states the cause before changing anything, and uses the outline technique.",
      },
    ],
    faqs: [
      {
        q: "Flexbox or Grid — which should I learn first?",
        a: "Flexbox, because it is simpler and it covers the most common cases: navigation bars, card rows, centring. Grid becomes necessary once you need two-dimensional placement or a page skeleton. In practice a finished page uses both, nested.",
      },
      {
        q: "Do I still need floats?",
        a: "No. Floats were a layout workaround from before Flexbox and Grid existed, and they cause clearing problems that cost beginners hours. Use them only for their original purpose — text wrapping around an image.",
      },
      {
        q: "How do I centre something both ways?",
        a: "display: flex with justify-content: center and align-items: center on the parent. That is the whole answer now. Older methods involving margins and transforms still work but are unnecessary.",
      },
      {
        q: "What is minmax actually doing?",
        a: "It sets a minimum and a maximum track size. In minmax(260px, 1fr), a column is never narrower than 260px but will grow to share available space. Combined with auto-fit, the browser fits as many as it can and they reflow as the screen narrows.",
      },
      {
        q: "My Grid items are in the wrong cells. Why?",
        a: "The track definition and the placement disagree. Check grid-template-columns against what you are asking items to span, and use the dev tools Grid overlay to see the actual tracks drawn on the page.",
      },
    ],
  },

  "business-website-sections": {
    summary:
      "The applied session: what a Nigerian small-business website actually needs, section by section. Header, hero, services, about, prices, testimonials, gallery, contact and footer — what each is for, what goes in it, and the mistakes that make a business site fail to produce enquiries.",
    objectives: [
      "Plan a site structure from what the business actually needs to achieve",
      "Build a hero that states the offer and the next step within seconds",
      "Write and structure services, about and pricing sections that convert",
      "Use testimonials and a gallery to build trust",
      "Build a contact section that reliably produces enquiries",
      "Avoid the failures that make Nigerian business sites lose customers",
    ],
    blocks: [
      {
        heading: "Structure: what a business site is for",
        body: [
          "A small-business website has one job: turn a stranger who found you into a person who contacts you. Every section either serves that or it is decoration. That gives you a fixed order that works almost every time: **header** with navigation, **hero** stating what you do and what to do next, **services** showing what you offer, **proof** — testimonials or a portfolio — establishing that you can be trusted, **about** briefly, **prices** where possible, **contact** with the easiest possible route, and **footer**.",
          "For most Nigerian small businesses, one page is enough and is better than several. A single scrolling page loads faster, works on a phone without navigation friction, and keeps the visitor moving toward contact rather than giving them five places to get lost. Multi-page becomes worth it when there is genuinely distinct content — a long portfolio, a full menu, separate service lines — and not before. Building five thin pages is worse than one strong one.",
          "Decide the structure from the business's actual goal rather than from a template. A bakery needs a gallery and prices above all, because the customer decides on appearance and budget. A consultant needs proof and a clear explanation of the service. A repairs business needs a phone number visible everywhere and a list of what it fixes. The sections are the same vocabulary; the emphasis is what makes the site work.",
        ],
      },
      {
        heading: "The hero: three seconds to say it",
        body: [
          "The hero is the top of the page and it has three seconds. It needs three things and nothing else: **what you do**, in plain words a stranger understands; **who it is for or why it is good**, in one supporting line; and **what to do next**, as a visible button. 'Custom wedding and birthday cakes in Lagos, delivered on the day' with a button reading 'Get a quote on WhatsApp' does the whole job. What fails is a hero containing a slogan nobody can act on — 'Excellence in every bite' — which tells a visitor nothing about whether you can serve them.",
          "The button matters more than people think, and its text is the lever. 'Contact us' is weak because it promises effort. 'Get a quote' or 'See our prices' promises a specific, low-risk next step and gets clicked far more. Make it a real link — to WhatsApp with a pre-filled message where possible, because in Nigeria that removes an entire step and the customer already has the app.",
          "Technically: use `min-height` rather than a fixed height so nothing clips when text wraps on a phone, constrain the text block's width so lines stay readable, and make sure any text over a background image has enough contrast — usually by placing a dark overlay behind it. A hero whose headline is unreadable over a photograph is a common and completely avoidable failure.",
        ],
      },
      {
        heading: "Services, about and prices",
        body: [
          "**Services** should be a set of cards, each with a clear name, one line on what it includes, and ideally a starting price. The mistake is vagueness: 'We offer quality catering services' tells a customer nothing, while 'Corporate lunch packs — from ₦2,500 per head, minimum 20, delivered across Lagos' answers the three questions they actually have. If the business genuinely cannot price publicly, give a range and say what moves it — hiding prices entirely costs more enquiries than it protects.",
          "**About** should be short and should be about the customer's confidence rather than the owner's biography. Two or three sentences: how long you have done this, what you are known for, and one human detail that makes the business real — a real photograph of the owner or the team works better than a paragraph. Nobody reads a long about page on a phone; they scan it for reassurance.",
          "**Prices** are the section most Nigerian business sites omit, and it is the section that loses the most customers. A visitor who cannot find a price will often message a competitor who publishes one rather than send an enquiry and wait. Where prices genuinely vary, publish a table of starting prices by category — customers accept 'from ₦X' readily, and it filters out enquiries that were never going to convert while converting the ones that were.",
        ],
      },
      {
        heading: "Proof: testimonials and gallery",
        body: [
          "Trust is the real product of these sections. **Testimonials** work when they are specific and attributable: a real name, ideally a photograph, and a quote that mentions an outcome rather than a generality. 'The cake was beautiful and arrived two hours early when our caterer cancelled — she saved the wedding' is worth ten times 'Great service, highly recommended', because it describes a risk that was removed. Three or four specific testimonials beat a wall of vague ones.",
          "Get them properly: ask the customer, quote their actual words rather than polishing them into something they would not say, and never invent one. A fabricated testimonial is a genuine ethical and legal problem, and in a small market where customers talk, it is also a commercial one.",
          "The **gallery** is the bakery's, salon's, photographer's and event planner's most persuasive asset, because the customer is buying an appearance. Show real work, not stock photographs — a Nigerian customer responds strongly to work that looks like their own environment, and stock imagery of a European office actively undermines trust. Caption each with what it is, keep images compressed so the page loads on mobile data, and make sure every image has real alt text so the section is not invisible to a screen-reader user.",
        ],
      },
      {
        heading: "Contact: the section that earns the money",
        body: [
          "Most Nigerian business enquiries happen on WhatsApp or by phone, not through a form, so the contact section should lead with those. A **click-to-WhatsApp link** — `https://wa.me/2348034567890?text=Hello,%20I%20would%20like%20a%20quote` — with a pre-filled message is the single highest-converting element you can put on a small-business site, because it removes typing and opens the app the customer already uses. A **click-to-call link** (`tel:+2348034567890`) matters equally, because a large share of visitors are on a phone and expect to tap rather than to copy a number.",
          "Include a form as well, for people who prefer it, built to the standards from session two: every field labelled, `type=\"tel\"` so phones show the numeric keypad, `required` only on what you genuinely need, and — critically — a real submission target that you have tested. A form that appears to work and silently discards messages is worse than no form, because the business believes it is receiving enquiries it never gets, and it can take months to notice.",
          "Then add the practical details customers actually look for: **opening hours**, the **physical address** where relevant, and the **service area**. And repeat the primary contact route in the header and the footer, not only in the contact section — a visitor who decides to call should never have to hunt for the number.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor builds a complete one-page site for a real Lagos business, section by section, writing the copy as well as the code and explaining each conversion decision, then reviews three real Nigerian business sites against the same standard.",
      steps: [
        {
          step: "Plan from the goal",
          detail:
            "Ask what the business needs a visitor to do, and let that decide the section emphasis. Explain that a bakery and a consultant need the same vocabulary in different proportions.",
        },
        {
          step: "Decide one page or several",
          detail:
            "Choose one scrolling page and justify it: faster load, no navigation friction on a phone, and one path to contact. Explain when multi-page becomes worth it.",
        },
        {
          step: "Build the header",
          detail:
            "Logo, navigation links to each section using fragment links, and the phone number visible. Explain why the number belongs in the header rather than only at the bottom.",
        },
        {
          step: "Write the hero copy",
          detail:
            "Write what you do, who it is for, and the next step. Reject two vague slogans out loud and explain why a visitor cannot act on them.",
        },
        {
          step: "Build the hero button",
          detail:
            "Link it to WhatsApp with a pre-filled message. Compare 'Contact us' with 'Get a quote on WhatsApp' and explain why the second gets clicked.",
        },
        {
          step: "Build the services cards",
          detail:
            "Use the Grid auto-fit pattern, each card with a name, one line of what is included and a starting price. Rewrite a vague service description into a specific one.",
        },
        {
          step: "Align the card buttons",
          detail:
            "Apply the Flexbox column with flex: 1 trick so buttons line up along the bottom regardless of text length.",
        },
        {
          step: "Build the price table",
          detail:
            "Use a real table for genuine tabular data with 'from' prices by category. Explain what publishing prices gains and what hiding them costs.",
        },
        {
          step: "Build the testimonials",
          detail:
            "Write three specific, attributable quotes describing outcomes. Explain why a fabricated one is both an ethical and a commercial failure.",
        },
        {
          step: "Build the gallery",
          detail:
            "Use real work with compressed images and real alt text. Explain why stock imagery of a foreign environment undermines trust with a Nigerian customer.",
        },
        {
          step: "Build the contact section",
          detail:
            "WhatsApp link, click-to-call, a properly built form with a tested submission target, opening hours and service area.",
        },
        {
          step: "Review three real sites against the standard",
          detail:
            "Open three Nigerian business sites and score each on hero clarity, prices, contact route and load. Name the specific fix for each.",
        },
      ],
    },
    practice: {
      title: "Build a complete one-page business site",
      brief:
        "You build a full one-page website for a real Nigerian business — header, hero, services, prices, testimonials, gallery, about, contact and footer — with copy written for conversion, a WhatsApp-first contact route and a tested form.",
      steps: [
        "Write the business's goal in one line and let it decide your section emphasis.",
        "Decide one page versus several and write one line of justification.",
        "Build the header with fragment-link navigation and a visible phone number.",
        "Write hero copy stating what you do, who it is for, and the next step — rejecting at least two vague slogans first.",
        "Build the hero with min-height, a constrained text width and sufficient contrast over any image.",
        "Link the hero button to WhatsApp with a pre-filled message.",
        "Build service cards with the Grid auto-fit pattern, each with a name, one line of inclusions and a starting price.",
        "Align the card buttons along the bottom with the flex: 1 trick.",
        "Build a genuine price table with 'from' prices by category.",
        "Write three specific, attributable testimonials describing outcomes rather than generalities.",
        "Build a gallery of real work, compressed, with real alt text on every image.",
        "Write a short about section aimed at the customer's confidence, with a real photograph.",
        "Build the contact section: WhatsApp link, click-to-call, a labelled and typed form with a tested target, opening hours and service area.",
        "Build the footer repeating the primary contact route.",
      ],
      standard:
        "A complete one-page site where the hero states the offer and next step in plain words, the primary contact route is WhatsApp or phone and appears in header, contact and footer, prices are published as 'from' figures, testimonials are specific and attributable, every image is compressed with real alt text, and the form submission has been tested end to end.",
    },
    pitfalls: [
      {
        problem: "Your hero is a slogan nobody can act on",
        fix: "State what you do, who it is for, and what to do next. 'Excellence in every bite' tells a visitor nothing about whether you can serve them; 'Custom cakes in Lagos, delivered on the day' does the job in one line.",
      },
      {
        problem: "Your button says 'Contact us'",
        fix: "Name the specific low-risk next step — 'Get a quote' or 'See our prices' — and link it to WhatsApp with a pre-filled message. 'Contact us' promises effort and gets clicked far less.",
      },
      {
        problem: "You hid the prices",
        fix: "Publish a table of 'from' prices by category. A visitor who cannot find a price often messages a competitor who publishes one, and hiding prices loses more enquiries than it protects.",
      },
      {
        problem: "Your testimonials are vague",
        fix: "Use real names and quotes describing an outcome or a risk removed. 'Great service, highly recommended' persuades nobody; a specific story about a problem solved persuades strongly.",
      },
      {
        problem: "You used stock photographs of a foreign environment",
        fix: "Use the business's real work. Nigerian customers respond to work that looks like their own environment, and stock imagery of a European office actively undermines trust.",
      },
      {
        problem: "Your form silently discards messages",
        fix: "Point it at a real form service or replace it with a WhatsApp link, then submit it yourself and confirm the message arrives. A broken form is worse than none because the business never notices.",
      },
      {
        problem: "Your phone number is only at the bottom of the page",
        fix: "Repeat the primary contact route in the header and the footer. A visitor who decides to call should never have to hunt for the number.",
      },
    ],
    expertNotes: [
      "Lead every small-business contact section with WhatsApp, and pre-fill the message. It removes typing, opens the app the customer already uses, and consistently outperforms a form in Nigeria. It is the single highest-converting element on the page.",
      "Write the copy before the layout, every time. Sections get rebuilt when the words change, and agreeing the copy first is the largest single time saving available in website work.",
      "Publish prices, even as 'from' figures. It is the most common omission on Nigerian business sites and the one that costs the most enquiries, and clients are usually persuadable once you explain that a range filters rather than exposes.",
      "Test the whole page on a real phone over mobile data before delivery. That is the condition almost every Nigerian visitor arrives in, and a page that loads in three seconds on fibre can take thirty on a phone — which is long enough for them to leave.",
    ],
    vocabulary: [
      { term: "Hero", meaning: "The top section stating what you do, who it is for and what to do next. Three seconds to do its job." },
      { term: "Fragment link", meaning: "A link to a section on the same page using #section-name. How one-page site navigation works." },
      { term: "Click-to-call", meaning: "A tel: link that dials on tap. Essential because most visitors are on a phone." },
      { term: "WhatsApp deep link", meaning: "A wa.me link with a pre-filled message. The highest-converting contact route for a Nigerian business." },
      { term: "Social proof", meaning: "Testimonials and portfolio work establishing trust. Specific and attributable beats vague and plentiful." },
      { term: "'From' pricing", meaning: "Publishing starting prices by category. Filters enquiries and converts more than hiding prices entirely." },
      { term: "One-page site", meaning: "A single scrolling page. Usually the right answer for a small business: faster, simpler, one path to contact." },
      { term: "Service area", meaning: "Where the business operates. Customers look for it, and stating it saves unqualified enquiries." },
    ],
    homework: [
      {
        task: "Write the copy for one business first",
        detail:
          "Hero line, three service descriptions with prices, three testimonials and an about paragraph — all before touching layout. Note how much faster the build becomes.",
      },
      {
        task: "Audit three Nigerian business sites",
        detail:
          "Score each on hero clarity, prices published, contact route and load time on mobile data. Write the single highest-impact fix for each.",
      },
      {
        task: "Build a WhatsApp deep link",
        detail:
          "Create one with a pre-filled message and test it on your phone. Then put it in the hero, the header and the contact section of a page you built.",
      },
      {
        task: "Collect three real testimonials",
        detail:
          "Ask three real customers for a specific sentence about an outcome. Use their actual words and their permission — never a fabricated quote.",
      },
    ],
    rubric: [
      {
        criterion: "Structure",
        passing: "Has the main sections.",
        excellent: "Section emphasis derived from the business's stated goal, with a justified one-page or multi-page decision.",
      },
      {
        criterion: "Hero",
        passing: "Has a hero.",
        excellent: "States what, for whom and the next step in plain words, uses min-height, and links a specific-action button to WhatsApp.",
      },
      {
        criterion: "Conversion content",
        passing: "Services and about are present.",
        excellent: "Specific service descriptions with starting prices, a published price table, and a short about aimed at customer confidence.",
      },
      {
        criterion: "Trust",
        passing: "Has testimonials or a gallery.",
        excellent: "Specific attributable testimonials describing outcomes, real work rather than stock imagery, compressed images with real alt text.",
      },
      {
        criterion: "Contact",
        passing: "Has contact details.",
        excellent: "WhatsApp and click-to-call repeated in header, contact and footer, a properly built form with a tested submission target, plus hours and service area.",
      },
    ],
    faqs: [
      {
        q: "Does a small business really need a website with WhatsApp and Instagram around?",
        a: "Yes, for one reason: it is the only channel the business owns. A social account can be suspended or lose reach, and it presents your content in someone else's layout. A website is where a serious customer checks you are real before spending money, and it is what appears in a Google search.",
      },
      {
        q: "One page or several?",
        a: "One scrolling page for most small businesses — it loads faster, has no navigation friction on a phone, and keeps one path to contact. Go multi-page when there is genuinely distinct content: a long portfolio, a full menu, or separate service lines that each need their own detail.",
      },
      {
        q: "My client refuses to publish prices. What do I do?",
        a: "Explain the cost: a visitor who cannot find a price often messages a competitor who publishes one. If they still refuse, publish 'from' figures by category or a clear statement of what affects price. That is usually enough to keep the enquiry while protecting their flexibility.",
      },
      {
        q: "What should the hero button say?",
        a: "The specific low-risk next step: 'Get a quote', 'See our prices', 'Book a consultation'. Avoid 'Contact us', which promises effort. Link it to WhatsApp with a pre-filled message wherever the business handles enquiries there.",
      },
      {
        q: "How long should the page be?",
        a: "Long enough to answer the questions a customer has before spending money, and no longer. For most small businesses that is hero, services, prices, proof, brief about, contact. If a section does not move someone toward contacting you, cut it.",
      },
    ],
  },

  "responsive-design": {
    summary:
      "Most Nigerian visitors arrive on a phone over mobile data, so responsive design is not a refinement — it is the design. This session covers media queries, fluid units, responsive images, and the mobile-first method that produces sites working on every screen.",
    objectives: [
      "Explain the viewport meta tag and what breaks without it",
      "Write media queries and choose breakpoints from content, not devices",
      "Use fluid units so layouts adapt without breaking",
      "Serve appropriately sized images to different screens",
      "Apply a mobile-first workflow",
      "Test properly across real devices and fix what breaks",
    ],
    blocks: [
      {
        heading: "The viewport, and why phones lie by default",
        body: [
          "Without `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">` a phone does not use its real width. It assumes the page was built for a desktop, renders it at around 980 pixels wide, and shrinks the whole thing to fit — which is why an old website appears tiny on a phone and requires pinch-zooming to read. That tag tells the browser to use the device's actual width, and it is the precondition for every other responsive technique. Missing it means your media queries never fire, because the browser believes it is 980 pixels wide.",
          "Understand also that a phone's **CSS pixel width** is not its physical pixel count. A phone with a 1080-pixel-wide screen typically reports about 360 to 412 CSS pixels, because of its pixel density. This is why you design against widths like 360, 390 and 412 rather than 1080, and why testing in the dev tools device toolbar — which reports CSS pixels — is meaningful. The common working widths to test are roughly 360 (small Android), 390 (iPhone), 412 (large Android), 768 (tablet) and 1280 and up (desktop).",
          "The Nigerian context sharpens this: the overwhelming majority of visitors arrive on a phone, often on mobile data, often on a mid-range Android at the narrower end of that range. A site designed for a desktop first and adapted afterwards will fail precisely where the customers are. This is why mobile-first is the correct method here rather than a preference.",
        ],
      },
      {
        heading: "Media queries and where to put the breakpoints",
        body: [
          "A **media query** applies CSS only when a condition holds. `@media (min-width: 768px) { ... }` means 'when the viewport is at least 768 CSS pixels wide'. Inside it you override the base styles, and because it comes later in the file it wins ties by source order — which is exactly how the mobile-first method works.",
          "The question beginners get wrong is where to put the breakpoints. The answer is **not** at the widths of popular devices, because devices change every year. It is at the widths where **your content breaks**. Widen the browser slowly and watch: at some point a line of text becomes too long to read comfortably, or a row of cards becomes too cramped, or a column becomes too wide. Those are your breakpoints. In practice that produces three or four — around 600, 768 and 1024 — and they hold across device generations because they come from the content rather than from a product list.",
          "Keep the number small. Every breakpoint is a set of rules you must maintain and test, and a stylesheet with twelve breakpoints is a stylesheet nobody can reason about. Three or four, chosen from content, covers essentially every business site you will build.",
        ],
      },
      {
        heading: "Fluid units: designing without breakpoints where you can",
        body: [
          "The best responsive technique is the one that needs no media query. **Percentages** and the **`fr` unit** make things share available space automatically. `max-width: 100%` on an image stops it overflowing its container, which is the single most important line for preventing horizontal scroll on a phone. The Grid pattern `repeat(auto-fit, minmax(260px, 1fr))` reflows a card grid with no query at all. And `clamp()` — `font-size: clamp(1.75rem, 4vw, 3rem)` — gives a heading that scales fluidly between a minimum and a maximum, which produces genuinely smooth type scaling rather than three abrupt jumps.",
          "`vw` is a viewport width unit — 1vw is one percent of the viewport width — and it is powerful but must always be bounded. A font sized purely in `vw` becomes unreadably small on a phone and absurdly large on a wide monitor, which is why `clamp()` with a `rem` floor and ceiling is the right pattern rather than `vw` alone.",
          "Reach for fluid units before reaching for a media query, every time. A layout built from flexible tracks and clamped type often needs only one or two queries for genuinely structural changes, which makes it smaller, faster and far easier to maintain.",
        ],
      },
      {
        heading: "Responsive images",
        body: [
          "A four-megabyte hero photograph served to a phone on mobile data is a lost visitor, and it is one of the most common performance failures on Nigerian business sites. Three techniques, in order of importance. First, **always** set `img { max-width: 100%; height: auto }` so no image can overflow its container — without it, one large image creates a horizontally scrolling page, which is an immediate usability failure.",
          "Second, **compress and resize before uploading**. Resize to the largest size you will display — usually no more than about 1600 pixels wide for a full-width hero — and compress; the visual difference is nil and the file size difference is often tenfold. This one habit matters more than any markup cleverness.",
          "Third, where a genuinely large image must be served responsively, use **`srcset`**, which offers the browser several sizes and lets it choose based on the screen: `srcset=\"hero-600.jpg 600w, hero-1200.jpg 1200w\"` with a `sizes` attribute describing the displayed width. The browser picks the smallest sufficient file. This is worth doing for a hero image on a content-heavy site, but it is not a substitute for compressing in the first place.",
        ],
      },
      {
        heading: "Mobile first, and testing properly",
        body: [
          "**Mobile first** means writing the base CSS for the narrowest screen, then adding media queries with `min-width` to enhance for larger ones. The opposite — desktop first with `max-width` queries removing things — produces a stylesheet full of overrides and cancellations, and it means the phone version is an afterthought built by subtraction. Mobile first also has a performance benefit: the phone, which has the least capable connection and processor, downloads only the base CSS rather than a desktop stylesheet it then partially undoes.",
          "The practical workflow is: build and test at 360 pixels wide first, get everything working and readable there, then widen and add enhancements at the content-driven breakpoints. If a layout works at 360 it almost always works wider; the reverse is not true.",
          "Then test properly, and this means **a real phone**, not only the dev tools device toolbar. The toolbar is excellent for fast iteration but it does not tell you how the page performs on mobile data, how a touch target feels under a thumb, or whether text is legible in daylight. Test the real thing: load the page on a phone over mobile data, time it, try every link and the form, and read the body text without squinting. **Touch targets** should be at least about 44×44 CSS pixels — a link that is fine with a mouse is impossible to tap accurately — and they need space between them, because a fat-fingered tap on the wrong link is a real and common frustration.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor takes the business site from session five and makes it fully responsive mobile-first, breaking and fixing real problems at each width, then tests it on a physical phone over mobile data.",
      steps: [
        {
          step: "Confirm the viewport tag",
          detail:
            "Remove it and show the page rendering as a shrunken desktop page needing pinch-zoom. Restore it and explain that without it no media query ever fires.",
        },
        {
          step: "Set the image safety rule",
          detail:
            "Add img max-width 100% and height auto. Show a large image overflowing and creating horizontal scroll before the rule, and the fix after.",
        },
        {
          step: "Open at 360 pixels",
          detail:
            "Set the device toolbar to 360 and work through the page top to bottom, listing everything that breaks. Explain that this is the starting point, not an afterthought.",
        },
        {
          step: "Stack the layout",
          detail:
            "Make the base CSS single-column with no media query. Show that the mobile layout then needs no overrides at all.",
        },
        {
          step: "Find a breakpoint from the content",
          detail:
            "Widen the window slowly and stop where body lines become too long to read comfortably. Note that width and use it, explaining why content-driven breakpoints outlast device lists.",
        },
        {
          step: "Add the first min-width query",
          detail:
            "Add the two-column layout inside @media (min-width: 768px) and show the base styles still governing below it.",
        },
        {
          step: "Use clamp for fluid type",
          detail:
            "Replace three fixed heading sizes with clamp() between a rem floor and ceiling, and resize to show smooth scaling rather than jumps.",
        },
        {
          step: "Reflow the cards with auto-fit",
          detail:
            "Replace a media-query-driven card layout with repeat(auto-fit, minmax(260px, 1fr)) and delete the query. Explain that this is the pattern to prefer.",
        },
        {
          step: "Compress the hero image",
          detail:
            "Show the original file size, resize and compress, and compare. Note the visual difference is nil and the load difference is decisive on mobile data.",
        },
        {
          step: "Add srcset for the hero",
          detail:
            "Offer 600w and 1200w versions with a sizes attribute, and check in the Network panel which one the browser chose at a narrow width.",
        },
        {
          step: "Fix touch targets",
          detail:
            "Measure the nav links and buttons, increase them to at least 44 pixels with spacing between. Explain that a mouse-sized link is untappable.",
        },
        {
          step: "Test on a real phone over mobile data",
          detail:
            "Load the page, time it, tap every link, submit the form, and read the body text in daylight. List what the dev tools toolbar did not reveal.",
        },
      ],
    },
    practice: {
      title: "Make the business site fully responsive",
      brief:
        "You take the one-page site from session five and rebuild it mobile-first: base CSS for 360 pixels, content-driven breakpoints, fluid units and clamp() replacing avoidable queries, compressed and responsive images, adequate touch targets — then test it on a real phone over mobile data.",
      steps: [
        "Confirm the viewport meta tag is present and correct.",
        "Add img max-width 100% and height auto as a global rule.",
        "Open the page at 360 CSS pixels and list everything that breaks.",
        "Rewrite the base CSS to be single-column with no media queries.",
        "Widen slowly and record the widths where content actually breaks.",
        "Add min-width media queries only at those content-driven widths.",
        "Replace at least two fixed heading sizes with clamp() between rem bounds.",
        "Replace any media-query-driven card layout with repeat(auto-fit, minmax(260px, 1fr)).",
        "Compress and resize every image to the largest displayed size.",
        "Add srcset and sizes to the hero image and confirm in the Network panel which file loads at a narrow width.",
        "Make every tap target at least 44×44 CSS pixels with space between targets.",
        "Test at 360, 390, 412, 768 and 1280 in the device toolbar.",
        "Test on a real phone over mobile data: time the load, tap every link, submit the form, and read body text in daylight.",
      ],
      standard:
        "A site whose base CSS works at 360 pixels with no overrides, using three or four content-driven breakpoints, fluid units and clamp() in place of avoidable queries, all images compressed with the hero using srcset, all tap targets at least 44 pixels, and verified working on a real phone over mobile data with the load time recorded.",
    },
    pitfalls: [
      {
        problem: "Your media queries never fire on a phone",
        fix: "The viewport meta tag is missing or wrong, so the browser renders at about 980 pixels and believes it is a desktop. Add width=device-width, initial-scale=1 — it is the precondition for everything else.",
      },
      {
        problem: "The page scrolls horizontally on a phone",
        fix: "An image or element is wider than its container. Add img max-width 100%; height auto globally, then look for fixed widths that exceed narrow screens. Horizontal scroll is an immediate usability failure.",
      },
      {
        problem: "You put breakpoints at popular device widths",
        fix: "Put them where your content breaks. Devices change every year; the width at which a line of text becomes unreadable does not. Three or four content-driven breakpoints outlast any device list.",
      },
      {
        problem: "You built desktop first and stripped it down for phones",
        fix: "Rebuild mobile first: base CSS for 360 pixels, then min-width queries adding enhancements. Desktop-first produces a stylesheet of overrides and makes the phone version an afterthought.",
      },
      {
        problem: "Your hero image is several megabytes",
        fix: "Resize to the largest displayed size and compress before uploading. Then add srcset so the browser can pick a smaller file on a narrow screen. This is the most common cause of an abandoned page on mobile data.",
      },
      {
        problem: "Your links are untappable",
        fix: "Make every tap target at least 44×44 CSS pixels with space between them. A link sized for a mouse cursor is impossible to hit accurately with a thumb, and misfires cost real enquiries.",
      },
      {
        problem: "You tested only in the dev tools device toolbar",
        fix: "Test on a real phone over mobile data. The toolbar cannot show you load performance, touch feel, or daylight legibility — and those are the conditions your actual visitors arrive in.",
      },
    ],
    expertNotes: [
      "Build at 360 pixels wide first, always. If a layout works there it almost always works wider, and the reverse is not true. It also forces the decisions — what is essential, what can be cut — that make the desktop version better rather than just larger.",
      "Reach for a fluid unit before reaching for a media query. Percentages, fr, max-width: 100% and clamp() remove queries entirely, and every query you do not write is one you never have to maintain or debug.",
      "Compress images as a fixed step in every project, not an optimisation you consider later. On a Nigerian mobile connection the difference between a compressed and an uncompressed hero is the difference between a visitor staying and leaving, and no amount of good design recovers from that.",
      "Test on a real phone over mobile data before every delivery and record the load time. It is the single check that most reliably predicts whether a client's customers will actually see the site you built.",
    ],
    vocabulary: [
      { term: "Viewport meta tag", meaning: "The tag telling a phone to use its real width. Without it, media queries never fire." },
      { term: "CSS pixel", meaning: "The width a device reports to CSS, typically 360–412 on a phone regardless of its physical pixel count." },
      { term: "Media query", meaning: "CSS that applies only when a condition such as a minimum width holds. The mechanism behind responsiveness." },
      { term: "Content-driven breakpoint", meaning: "A width chosen because the content breaks there, rather than because a device has that width." },
      { term: "Mobile first", meaning: "Writing base CSS for the narrowest screen and enhancing upward with min-width queries." },
      { term: "clamp()", meaning: "A fluid value with a minimum and maximum, such as clamp(1.75rem, 4vw, 3rem). Smooth scaling without queries." },
      { term: "srcset", meaning: "An attribute offering the browser several image sizes so it can choose the smallest sufficient one." },
      { term: "Touch target", meaning: "A tappable element, which should be at least about 44×44 CSS pixels with space around it." },
    ],
    homework: [
      {
        task: "Rebuild one page at 360 pixels first",
        detail:
          "Take a page you built desktop-first and rebuild it mobile-first. Note how much simpler the stylesheet becomes when the phone version is the base.",
      },
      {
        task: "Find your own breakpoints",
        detail:
          "Widen a page slowly and record every width where the content breaks. Compare your list with the standard 600/768/1024 and note where they agree.",
      },
      {
        task: "Convert three sizes to clamp()",
        detail:
          "Replace three fixed font sizes with clamp() between rem bounds, then resize from 320 to 1600 and confirm the scaling is smooth.",
      },
      {
        task: "Run a real-phone test",
        detail:
          "Load a page you built on a phone over mobile data. Time it, tap every link, submit the form, and read body text in daylight. Write down what the dev tools toolbar did not show you.",
      },
    ],
    rubric: [
      {
        criterion: "Foundation",
        passing: "The page works on a phone.",
        excellent: "Correct viewport tag, global img max-width rule, and no horizontal scrolling at 360 pixels.",
      },
      {
        criterion: "Breakpoints",
        passing: "Uses media queries.",
        excellent: "Three or four content-driven breakpoints chosen by watching the content break, with min-width queries enhancing a mobile base.",
      },
      {
        criterion: "Fluid technique",
        passing: "The layout adapts.",
        excellent: "Percentages, fr, auto-fit Grid and clamp() used in place of avoidable queries, with vw always bounded by a rem floor.",
      },
      {
        criterion: "Images",
        passing: "Images display correctly.",
        excellent: "Every image compressed and resized to its displayed size, the hero using srcset, and the Network panel confirming the smaller file loads on a narrow screen.",
      },
      {
        criterion: "Real-device testing",
        passing: "Checked in the device toolbar.",
        excellent: "Tested on a real phone over mobile data with load time recorded, every link tapped, the form submitted, and all tap targets at least 44 pixels.",
      },
    ],
    faqs: [
      {
        q: "What screen sizes should I actually test?",
        a: "360 for a small Android, 390 for an iPhone, 412 for a large Android, 768 for a tablet, and 1280 and above for desktop. Those five cover essentially every visitor, and 360 is the one that matters most because it is the hardest and the most common in Nigeria.",
      },
      {
        q: "Mobile first or desktop first?",
        a: "Mobile first, without hesitation. It produces a simpler stylesheet because the phone version needs no overrides, it sends less CSS to the least capable device, and it forces you to decide what is essential. In Nigeria it is also simply where the customers are.",
      },
      {
        q: "How many breakpoints do I need?",
        a: "Three or four, chosen where your content breaks — typically around 600, 768 and 1024. Every breakpoint is a set of rules to maintain and test, and a stylesheet with twelve of them is one nobody can reason about.",
      },
      {
        q: "Do I need srcset on every image?",
        a: "No. Compressing and resizing every image matters far more and applies to all of them. srcset is worth adding for a genuinely large hero image on a content-heavy page, where serving a smaller file to a phone makes a measurable difference.",
      },
      {
        q: "My client's site is slow on their phone. What do I check first?",
        a: "Open the Network panel sorted by size and look at the largest files — it is almost always images. Compress and resize them, then check how many requests the page makes and whether fonts are loading more weights than are used. Those three account for most slow Nigerian business sites.",
      },
    ],
  },
};
