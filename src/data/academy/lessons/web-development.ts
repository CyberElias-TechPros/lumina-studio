import type { SessionLecture } from "../types";

/**
 * Web Development — ₦30,000 · 6 weeks · 12 sessions.
 * Sessions 1 to 3. (4–6 in web-development-b.ts, 7–9 in -c.ts, 10–12 in -d.ts.)
 */
export const webDevelopmentLessonsA: Record<string, SessionLecture> = {
  "semantic-html": {
    summary:
      "HTML is the structure of every page on the web, and semantic HTML — using elements for what they mean rather than how they look — is what separates a page that works from one that works for everyone, including search engines and assistive technology.",
    objectives: [
      "Explain what HTML is and how a browser turns it into a page",
      "Structure a document with the right elements in the right order",
      "Use semantic elements so meaning is carried by the markup",
      "Write headings, links, images, lists and tables correctly",
      "Understand why semantics matter for accessibility and search",
      "Build a complete, valid multi-section page",
    ],
    blocks: [
      {
        heading: "What HTML actually is",
        body: [
          "HTML is not a programming language and it does not do anything. It is a **description of structure** — a set of labelled boxes saying 'this is a heading', 'this is a paragraph', 'this is a link to somewhere else'. The browser reads that description and decides how to present it. That division matters: you describe the meaning, the browser and the stylesheet decide the appearance.",
          "Every element is written the same way: an **opening tag**, the **content**, and a **closing tag** — `<p>Hello</p>`. Some elements have no content and close themselves, like `<img>` and `<br>`. Elements **nest** inside each other, and correct nesting is what gives a document its shape: a list item inside a list, a paragraph inside a section. Mismatched tags are the most common beginner error and the browser will try to guess what you meant, usually wrongly.",
          "Then the anatomy of a page. `<!DOCTYPE html>` tells the browser which rules to use. `<html>` wraps everything. `<head>` holds information **about** the page — its title, character set, and links to stylesheets — none of which is displayed. `<body>` holds everything the visitor sees. Getting this skeleton right is the first thing, because everything else lives inside it.",
        ],
      },
      {
        heading: "Semantic versus presentational markup",
        body: [
          "**Semantic HTML** means using an element because of what it **means**, not because of how it happens to look. `<h1>` means 'this is the main heading', not 'this is big bold text'. `<nav>` means 'this is navigation'. `<button>` means 'this does something when activated'. The visual result is a consequence, not the purpose.",
          "The alternative — using `<div>` and `<span>` for everything and styling it to look right — produces a page that appears identical and works far worse. A screen reader navigating by headings finds nothing. A search engine cannot tell your navigation from your content. A keyboard user cannot tab to the thing that looks like a button because it is not one. **The page looks finished and is broken for anyone not using a mouse and eyes.**",
          "The practical test is simple: **strip the CSS and read the markup**. If the document still makes sense as an outline — headings in order, lists as lists, navigation identifiable — it is semantic. If it collapses into an undifferentiated wall of divs, the meaning was only ever in the styling, and styling can fail, be turned off, or be replaced by an assistive technology that ignores it entirely.",
        ],
      },
      {
        heading: "Headings, paragraphs and text",
        body: [
          "Headings are an **outline, not a size picker**. There is one `<h1>` per page — the subject of the page — and every heading below it is nested logically: `<h2>` for main sections, `<h3>` for subsections within those. Skipping levels because a size looks better breaks the outline, and the outline is what a screen reader user navigates by and what a search engine uses to understand the page.",
          "If a heading is the wrong size, **change the CSS, not the element**. That single habit solves most heading misuse. `<h3>` styled to look like an `<h1>` is correct when it is third in the outline; `<h1>` used because it is biggest is wrong however good it looks.",
          "Then the text elements, each with a job. `<p>` for a paragraph — and note that a line break is not a paragraph, so `<br>` between lines of prose is a common mistake. `<strong>` for genuine importance and `<em>` for emphasis, which are semantic, rather than `<b>` and `<i>`, which are only visual. `<a>` for a link, `<ul>` or `<ol>` for a list — and a list of things is a list even when it does not have bullets, because the structure is the point.",
        ],
      },
      {
        heading: "Links, images and media",
        body: [
          "A link is an anchor element with an href pointing somewhere and text between the tags, and the **link text should describe the destination**. 'Read our pricing' tells someone where they are going; 'click here' tells them nothing, and it is useless to a screen reader user scanning a list of links out of context, which is exactly how many people navigate. If a link's destination cannot be guessed from its text alone, the text is wrong.",
          'Images require an **`alt` attribute**, and it is not optional decoration — it is the text that replaces the image when it cannot be seen. Write what the image conveys: `alt="Two students reviewing a spreadsheet in class"` rather than `alt="image"` or `alt="photo1.jpg"`. If an image is purely decorative and adds no information, use an empty `alt=""` so assistive technology skips it rather than announcing something meaningless.',
          "Then the practical details. Set **`width` and `height`** so the browser reserves the space before the image loads, which prevents the layout jumping around — a real usability problem on a slow connection, which is most connections here. Use **relative paths** for your own files (`images/logo.png`) rather than absolute ones, or the page breaks the moment it moves to a different folder or server.",
        ],
      },
      {
        heading: "Lists, tables and document sections",
        body: [
          "**Lists** come in three kinds and choosing correctly is a semantic decision. `<ul>` for items with no meaningful order — a menu, a set of features. `<ol>` for items where the order matters — steps in a process, a ranking. `<dl>` for terms and definitions. Using a `<ul>` for a numbered procedure loses the information that the order matters.",
          "**Tables** are for tabular data — rows and columns that genuinely relate — and never for layout. A table used for layout produces a page that cannot be read in a sensible order by assistive technology and collapses badly on a phone. Within a real table, `<th>` marks a header cell and `<caption>` names the table; both are what makes the data comprehensible rather than a grid of unexplained numbers.",
          "Then the **sectioning elements** that give a document its shape: `<header>` for the introductory area, `<nav>` for navigation, `<main>` for the primary content — exactly one per page — `<section>` for a themed grouping, `<article>` for something self-contained that would make sense on its own, `<aside>` for related but tangential content, and `<footer>` for the closing area. These are not decoration; they let assistive technology jump between regions, and they let a search engine understand what the page is actually about.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor builds a real page from an empty file: the document skeleton, then the same content marked up twice — once with divs and styling, once semantically — so the class can strip the CSS from both and see which one still makes sense.",
      steps: [
        {
          step: "Write the document skeleton",
          detail:
            "Type doctype, html, head and body from scratch. Explain what each part is for and why the head holds information that is never displayed.",
        },
        {
          step: "Add the metadata",
          detail:
            "Set the charset, the title and the viewport. Explain that the title is what appears in a browser tab and in search results, so it is content rather than configuration.",
        },
        {
          step: "Mark up a heading hierarchy",
          detail:
            "Write one h1 and nested h2 and h3 elements. Explain that headings are an outline and that levels are never skipped for size.",
        },
        {
          step: "Fix a skipped level",
          detail:
            "Deliberately use an h1 for a subsection because it looks bigger, then correct it by styling an h3 instead. Explain that size is a CSS decision.",
        },
        {
          step: "Write paragraphs and emphasis",
          detail:
            "Use p, strong and em. Show br between prose lines and explain why that is a mistake — a line break is not a paragraph.",
        },
        {
          step: "Write links that describe themselves",
          detail:
            "Compare 'read our pricing' with 'click here'. Explain how a screen reader user scanning links out of context experiences the difference.",
        },
        {
          step: "Add images with real alt text",
          detail:
            "Write descriptive alt text, then set alt empty on a decorative image. Explain that both are correct and 'image' is neither.",
        },
        {
          step: "Set image dimensions",
          detail:
            "Add width and height and reload on a throttled connection. Show the layout jumping without them and explain why this matters on slow connections.",
        },
        {
          step: "Choose the right list type",
          detail:
            "Mark a menu as ul and a procedure as ol. Explain that using ul for ordered steps loses the information that order matters.",
        },
        {
          step: "Build a real table",
          detail:
            "Use th for headers and add a caption. Explain that tables are for tabular data and never for layout.",
        },
        {
          step: "Add the sectioning elements",
          detail:
            "Wrap the page in header, nav, main, section, article, aside and footer. Explain that these let assistive technology jump between regions.",
        },
        {
          step: "Mark the same content with divs",
          detail:
            "Rebuild an identical-looking page using only div and span with CSS. Explain that it appears the same and is broken for anyone not using a mouse and eyes.",
        },
        {
          step: "Strip the CSS from both",
          detail:
            "Disable the stylesheet on each version and read them. Show that the semantic page still reads as an outline while the div version collapses into a wall of text.",
        },
      ],
    },
    practice: {
      title: "Build a semantic multi-section page",
      brief:
        "You build a complete, valid page for a real business or organisation using only semantic elements: a correct document skeleton, a logical heading outline with no skipped levels, self-describing links, images with meaningful alt text, correctly typed lists, a real data table, and full sectioning structure — verified by stripping the CSS and reading the result.",
      steps: [
        "Write the document skeleton from scratch: doctype, html, head, body.",
        "Set the charset, a descriptive title, and the viewport meta tag.",
        "Write one h1 stating the subject of the page.",
        "Add h2 headings for each main section, nested logically.",
        "Add h3 headings for subsections, never skipping a level for size.",
        "Write the content in p elements, using strong and em for meaning.",
        "Write every link so its text describes the destination.",
        "Add images with alt text describing what each conveys.",
        "Use empty alt on any purely decorative image.",
        "Set width and height on every image.",
        "Use relative paths for all your own files.",
        "Mark unordered content as ul and any ordered procedure as ol.",
        "Build one genuine data table with th headers and a caption.",
        "Wrap the page in header, nav, main, sections, and footer.",
        "Use exactly one main element.",
        "Strip the CSS and read the markup as an outline to confirm it still makes sense.",
      ],
      standard:
        "A valid page with a correct document skeleton and descriptive title, one h1 and a heading outline with no skipped levels, prose in p with strong and em used for meaning, every link's text describing its destination, images with meaningful alt text and empty alt where decorative plus explicit dimensions and relative paths, ul and ol chosen by whether order matters, one real data table with th headers and a caption, and full sectioning structure with exactly one main — verified by disabling the stylesheet and confirming the markup still reads as a sensible outline.",
    },
    pitfalls: [
      {
        problem: "You use div and span for everything",
        fix: "Use elements for their meaning. A page built from divs looks identical and is broken for anyone using assistive technology, a keyboard, or a search engine, because the meaning was only ever in the styling.",
      },
      {
        problem: "You pick headings by size",
        fix: "Pick by outline position and change the CSS for size. There is one h1 per page, and skipping levels because a size looks better destroys the outline that screen readers and search engines navigate by.",
      },
      {
        problem: "You use br between lines of prose",
        fix: "Use p for a paragraph. A line break is not a paragraph, and a wall of br-separated lines has no structure that anything can navigate.",
      },
      {
        problem: "Your links say 'click here'",
        fix: "Describe the destination in the link text. A screen reader user scanning links out of context gets nothing from 'click here', which is how many people navigate.",
      },
      {
        problem: "Your alt text says 'image' or repeats the filename",
        fix: "Describe what the image conveys, or use empty alt if it is purely decorative. Alt text replaces the image when it cannot be seen, so 'photo1.jpg' is useless.",
      },
      {
        problem: "You omitted width and height on images",
        fix: "Set both so the browser reserves the space. Without them the layout jumps as images load, which is a real usability problem on the slow connections most people here have.",
      },
      {
        problem: "You used a table for layout",
        fix: "Use CSS for layout. A layout table cannot be read in a sensible order by assistive technology and collapses badly on a phone.",
      },
      {
        problem: "You used ul for a numbered procedure",
        fix: "Use ol when order matters. The element carries the information that the sequence is significant, and a ul silently discards it.",
      },
    ],
    expertNotes: [
      "Test your markup by disabling the stylesheet and reading it. If the page still reads as a sensible outline, the meaning is in the markup; if it collapses into a wall of text, the meaning was only ever in the styling and will fail for assistive technology.",
      "Choose heading levels by outline position and use CSS for size. This one habit eliminates most heading misuse, and the outline is what screen reader users navigate by and what search engines use to understand the page.",
      "Write link text that describes the destination and alt text that describes the image. Both are read out of context by assistive technology, and 'click here' and 'image' convey nothing in either case.",
      "Set width and height on every image. It reserves space before the image loads and prevents the layout jumping, which is a genuine usability problem on the slow connections most Nigerian users have.",
    ],
    vocabulary: [
      {
        term: "Element",
        meaning: "An opening tag, content and closing tag. The unit HTML is built from.",
      },
      {
        term: "Semantic HTML",
        meaning:
          "Using elements for what they mean rather than how they look. The difference between a page that works and one that works for everyone.",
      },
      {
        term: "Nesting",
        meaning: "Elements inside elements, correctly closed. Gives a document its shape.",
      },
      {
        term: "Heading outline",
        meaning:
          "The hierarchy of h1 to h6. Navigated by screen readers and used by search engines.",
      },
      {
        term: "alt attribute",
        meaning:
          "Text replacing an image when it cannot be seen. Empty for decorative images, descriptive for meaningful ones.",
      },
      {
        term: "Sectioning element",
        meaning:
          "header, nav, main, section, article, aside, footer. Lets assistive technology jump between regions.",
      },
      {
        term: "Relative path",
        meaning:
          "A file location relative to the current page. Survives moving to another folder or server.",
      },
      {
        term: "Layout shift",
        meaning: "Content moving as images load. Prevented by setting width and height.",
      },
    ],
    homework: [
      {
        task: "Write a document skeleton from memory",
        detail:
          "Doctype, html, head with charset, title and viewport, and body. Do it without looking anything up, then check. This is the frame everything else goes in.",
      },
      {
        task: "Convert a div page to semantic HTML",
        detail:
          "Take any page you have built with divs and replace each one with the element that matches its meaning. Note how many divs you actually needed.",
      },
      {
        task: "Audit your headings and alt text",
        detail:
          "Check for one h1, no skipped levels, and alt text that describes rather than names. Then strip the CSS and read the page as an outline.",
      },
      {
        task: "Build one real data table",
        detail:
          "With th headers and a caption, containing data that genuinely relates in rows and columns. Do not use a table for layout anywhere in the page.",
      },
    ],
    rubric: [
      {
        criterion: "Document structure",
        passing: "Renders a page.",
        excellent:
          "A correct skeleton written from scratch with charset, descriptive title and viewport, and elements nested and closed correctly throughout.",
      },
      {
        criterion: "Semantics",
        passing: "Uses some semantic tags.",
        excellent:
          "Elements chosen for meaning throughout, verified by disabling the stylesheet and confirming the markup still reads as a sensible outline.",
      },
      {
        criterion: "Headings and text",
        passing: "Has headings.",
        excellent:
          "One h1, a logical outline with no skipped levels, size controlled by CSS, and prose in p with strong and em used for meaning rather than appearance.",
      },
      {
        criterion: "Links and images",
        passing: "Has both.",
        excellent:
          "Every link text describing its destination, alt text meaningful or deliberately empty, explicit width and height, and relative paths throughout.",
      },
      {
        criterion: "Lists, tables and sections",
        passing: "Uses them.",
        excellent:
          "ul and ol chosen by whether order matters, a real data table with th headers and a caption, and full sectioning structure with exactly one main.",
      },
    ],
    faqs: [
      {
        q: "Does semantic HTML really matter if the page looks the same?",
        a: "It looks the same only to a sighted person using a mouse with CSS enabled. A screen reader navigating by headings finds nothing in a page of divs, a keyboard user cannot reach a div styled as a button, and a search engine cannot tell your navigation from your content. The page appears finished and is broken for everyone else.",
      },
      {
        q: "How many h1 elements should a page have?",
        a: "One, stating the subject of the page. Everything below it nests logically — h2 for main sections, h3 for subsections. If a heading is the wrong size, change the CSS rather than the element.",
      },
      {
        q: "What do I put in alt text?",
        a: "What the image conveys: 'two students reviewing a spreadsheet in class', not 'image' or the filename. For a purely decorative image that adds no information, use an empty alt so assistive technology skips it rather than announcing something meaningless.",
      },
      {
        q: "When should I use a table?",
        a: "Only for data that genuinely belongs in rows and columns. Never for layout — a layout table cannot be read in a sensible order by assistive technology and collapses badly on a phone. Use CSS for layout instead.",
      },
      {
        q: "My page looks right but the validator reports errors. Does it matter?",
        a: "Usually yes. The browser guesses at malformed markup and usually guesses wrong, which produces inconsistent behaviour between browsers and breaks assistive technology. Fix the errors — it is nearly always a mismatched or unclosed tag and takes seconds.",
      },
    ],
  },

  "forms-and-accessibility": {
    summary:
      "Forms are how a website does anything, and accessibility is whether anyone can use what you built. This session covers building forms that work and validate, the accessibility basics that make a page usable by everyone, and a project bringing it together.",
    objectives: [
      "Build forms with the right input types and correct labelling",
      "Understand how a form submission actually works",
      "Make a page usable with a keyboard alone",
      "Apply the accessibility basics that matter most",
      "Test your page the way an assistive technology user would",
      "Build a complete multi-section website",
    ],
    blocks: [
      {
        heading: "How forms work",
        body: [
          "A form is a collection of inputs inside a `<form>` element, with an **action** saying where the data goes and a **method** saying how. `POST` sends the data in the request body and is right for anything sensitive or that changes something; `GET` puts it in the URL, which is visible, bookmarkable and limited in length — fine for a search, wrong for a password.",
          "Each input needs a **`name`**, because that is the key the data arrives under. An input without a name is invisible to the server however it looks on the page, which is a common and confusing bug: the form appears to work, the user types something, and nothing arrives.",
          'Then the **input types**, which are not cosmetic. `type="email"` gives a phone an email keyboard and basic format checking. `type="tel"` gives a numeric pad. `type="date"` gives a date picker instead of a free-text box the user has to guess the format of. `type="password"` hides the characters. Using `type="text"` for everything works and is worse in every way, particularly on a phone, where the wrong keyboard is a real obstacle.',
        ],
      },
      {
        heading: "Labels are not optional",
        body: [
          "Every input needs a **`<label>`**, connected to it by matching `for` and `id` attributes. This is not a formality: the label is what a screen reader announces, it is what makes the field findable, and it makes the **whole label clickable** to focus the input — which matters enormously on a phone, where tapping a small checkbox is fiddly and tapping its label is easy.",
          "The common wrong way is **placeholder-as-label**: an input with no label whose purpose is written in grey text inside it. It fails in three ways at once. The text disappears the moment someone starts typing, so they cannot remember what the field was for. It is usually too low-contrast to read comfortably. And some assistive technology does not announce it at all. Placeholder text is for **examples** — 'for example, 0803 000 0000' — never for labels.",
          "Then the related requirements. Group related controls with **`<fieldset>` and `<legend>`** — a set of radio buttons needs a legend saying what the choice is about, because the individual options ('Yes', 'No') mean nothing alone. Mark required fields with **`required`**, which gives free browser validation. And for anything else, use **`aria-describedby`** to point at helper text so it is announced with the field rather than sitting nearby unseen.",
        ],
      },
      {
        heading: "Buttons and submission",
        body: [
          'Use a **`<button>`** for anything that does something. The two elements that look interchangeable are not: `<button type="submit">` inside a form submits it, `<button type="button">` does not submit and is for JavaScript actions, and `<a>` navigates somewhere. Styling a link to look like a button produces something a keyboard user activates differently and a screen reader announces wrongly.',
          "Then **do not disable the submit button while submitting without a way back**. It is a well-meant pattern — prevent double submission — that traps people when the request fails, because the button stays disabled and there is no way to try again. Better: keep it enabled, show a loading state, and handle failure by telling the user what happened.",
          "And **tell the user what happened**. A form that submits silently gives no confirmation, so people submit twice or assume it failed. Show a clear success message, and on error say **which field** is wrong and **what to do about it** — 'Email address is missing the @ symbol' rather than 'Invalid input'. Error messages that only mark a field red are useless to anyone who cannot see the colour.",
        ],
      },
      {
        heading: "Keyboard access",
        body: [
          "A great many people cannot use a mouse — people with motor impairments, people using a screen reader, people whose mouse is broken. Everything must be reachable and operable with a **keyboard alone**, and the test takes thirty seconds: **put your mouse down and tab through the page**. If you cannot reach something, or reach it and cannot tell where you are, it is broken.",
          "Three things make this work. **Focus must be visible** — the outline showing which element has focus must never be removed. `outline: none` is one of the most damaging lines of CSS there is, and it is usually added because someone thought the default outline was ugly. Restyle it; do not remove it. **Tab order must be logical**, following the visual order of the page; a tab order that jumps around is worse than none.",
          "Then **do not build interactive elements out of divs**. A `<div onclick>` is invisible to a keyboard: it cannot be focused, cannot be activated with Enter or Space, and is not announced as a button. Use `<button>` and you get all of that for free. And **provide a skip link** at the top of the page so a keyboard user is not forced to tab through the entire navigation on every single page load — which for a site with twenty nav items is genuinely unusable.",
        ],
      },
      {
        heading: "The accessibility basics that matter most",
        body: [
          "**Colour contrast** is the most common failure and the easiest to check. Text needs a contrast ratio of at least **4.5:1** against its background for normal text and 3:1 for large text. Light grey on white — the aesthetic choice behind a great many modern sites — frequently fails badly and makes text unreadable for people with low vision, and for anyone in bright sunlight, which is most of Nigeria.",
          "**Never convey information by colour alone.** 'Required fields are in red' tells a colour-blind user nothing, and 'errors are highlighted red' is invisible to them. Add a text indicator — an asterisk with an explanation, an icon, the word 'error' — so the meaning survives without the colour.",
          "Then **text that can be resized**, **meaningful link text**, **alt text on images**, **a page title that says what the page is**, and **a language declared** on the `<html>` element so assistive technology pronounces it correctly. None of these is difficult. Together they are the difference between a site that most people can use and one that a significant minority cannot, and they cost minutes rather than hours if you do them as you build rather than retrofitting.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor builds a working contact form with correct types and labels, then runs the accessibility tests that matter: keyboard-only navigation with the mouse put down, a contrast check on the actual colours, a screen reader pass, and a form error message rewritten from 'invalid input' into something usable.",
      steps: [
        {
          step: "Build the form skeleton",
          detail:
            "Write the form element with method and action, then a named input. Explain that an input without a name never reaches the server however it looks.",
        },
        {
          step: "Choose input types deliberately",
          detail:
            "Use email, tel, date and password. Open the page on a phone and show the different keyboards. Explain that type text for everything is worse in every way.",
        },
        {
          step: "Add proper labels",
          detail:
            "Connect each label with for and id, then click the label to focus the field. Explain that this matters most on a phone where tapping a checkbox is fiddly.",
        },
        {
          step: "Show the placeholder-as-label mistake",
          detail:
            "Type into a placeholder-labelled field and watch the hint vanish. Explain the three ways it fails at once.",
        },
        {
          step: "Group radio buttons",
          detail:
            "Wrap them in a fieldset with a legend. Explain that 'Yes' and 'No' alone mean nothing without the question.",
        },
        {
          step: "Add helper text correctly",
          detail:
            "Use aria-describedby to attach it to the field. Explain that text sitting nearby is not announced with the input.",
        },
        {
          step: "Use the right button",
          detail:
            "Compare button type submit, button type button and a styled link. Explain that a styled link is activated differently and announced wrongly.",
        },
        {
          step: "Show the disabled-button trap",
          detail:
            "Simulate a failed request with the submit button disabled. Explain that the user is now stuck with no way to retry.",
        },
        {
          step: "Rewrite the error message",
          detail:
            "Change 'Invalid input' to name the field and the fix. Explain that a red border alone is invisible to anyone who cannot see the colour.",
        },
        {
          step: "Tab through with the mouse put down",
          detail:
            "Navigate the whole page by keyboard. Show an element that cannot be reached and a focus indicator that cannot be seen.",
        },
        {
          step: "Restore the focus outline",
          detail:
            "Find the outline none rule and replace it with a visible restyled outline. Explain that this is one of the most damaging lines of CSS there is.",
        },
        {
          step: "Check contrast on the real colours",
          detail:
            "Measure the actual ratio and find a failing pair. Explain that light grey on white frequently fails and is unreadable in bright sunlight.",
        },
        {
          step: "Add a skip link",
          detail:
            "Insert one at the top of the page. Explain that without it a keyboard user tabs through the entire navigation on every page load.",
        },
      ],
    },
    practice: {
      title: "Project: multi-section website",
      brief:
        "You build a complete multi-section website with a working form — correct input types, real labels, fieldset-grouped radios, and error messages naming the field and the fix — then make it accessible and prove it: keyboard-only navigation with the mouse put down, visible focus everywhere, contrast at 4.5:1 or better, no information by colour alone, and a skip link.",
      steps: [
        "Plan the sections the site needs and sketch the page order.",
        "Build the semantic structure: header, nav, main, sections, footer.",
        "Write one h1 and a heading outline with no skipped levels.",
        "Add the form with a method and an action.",
        "Give every input a name.",
        "Choose input types deliberately: email, tel, date, password where they apply.",
        "Connect a real label to every input with for and id.",
        "Use placeholder text only for examples, never as a label.",
        "Group radio buttons in a fieldset with a legend.",
        "Attach helper text with aria-describedby.",
        "Use button type submit for submitting and button type button for JavaScript actions.",
        "Write error messages naming the field and what to do about it.",
        "Confirm the submit button cannot trap the user if a request fails.",
        "Put the mouse down and tab through every page, fixing anything unreachable.",
        "Restore or restyle every focus outline so focus is always visible.",
        "Measure the contrast of every text and background pair and fix failures.",
        "Add a text indicator anywhere information is currently conveyed by colour alone.",
        "Add a skip link to bypass the navigation.",
        "Declare the language on the html element and set a descriptive page title.",
      ],
      standard:
        "A multi-section site built on semantic structure with a working form whose inputs all have names and deliberately chosen types, real labels connected by for and id, placeholder used only for examples, radios grouped in a fieldset with a legend, helper text attached via aria-describedby, correct button types, error messages naming the field and the fix, and no submit-button trap — proven accessible by keyboard-only navigation with the mouse put down reaching everything, visible focus on every element, measured contrast of at least 4.5:1 everywhere, no information conveyed by colour alone, a working skip link, and a declared language and descriptive title.",
    },
    pitfalls: [
      {
        problem: "Your inputs have no name attribute",
        fix: "Add a name to every input. Without it the data never reaches the server however the form looks, which produces the confusing bug where the form appears to work and nothing arrives.",
      },
      {
        problem: "You used type text for everything",
        fix: "Use email, tel, date and password where they apply. The type changes the keyboard on a phone and enables built-in validation, so text for everything is worse in every way.",
      },
      {
        problem: "Your placeholder is doing the job of a label",
        fix: "Add a real label. Placeholder text vanishes when someone types, is usually too low-contrast to read, and is not reliably announced — it is for examples, never for labels.",
      },
      {
        problem: "Your radio buttons have no legend",
        fix: "Wrap them in a fieldset with a legend. The individual options mean nothing alone, and a screen reader user hears 'Yes' with no idea what the question was.",
      },
      {
        problem: "You styled a link to look like a button",
        fix: "Use a button element. A styled link is activated with a different key, announced as a link, and behaves inconsistently for keyboard and assistive technology users.",
      },
      {
        problem: "You removed the focus outline",
        fix: "Restyle it, never remove it. outline none makes the page unusable for keyboard users, who cannot tell where they are — and it is usually added for purely aesthetic reasons.",
      },
      {
        problem: "You convey information by colour alone",
        fix: "Add a text indicator. 'Required fields are in red' and 'errors are red' are invisible to colour-blind users, so the meaning must survive without the colour.",
      },
      {
        problem: "Your error messages say 'invalid input'",
        fix: "Name the field and the fix. An error that only marks a border red is useless to anyone who cannot see the colour, and unhelpful to everyone else.",
      },
    ],
    expertNotes: [
      "Label every input with a real label element, connected by for and id. It is announced by assistive technology, makes the field findable, and makes the whole label clickable — which on a phone is the difference between a usable checkbox and an unusable one.",
      "Put the mouse down and tab through every page you build. Thirty seconds of keyboard-only testing finds problems no amount of looking will reveal, and an unreachable element is a feature that does not exist for a large group of users.",
      "Never write outline: none. A visible focus indicator is what tells a keyboard user where they are, and removing it for aesthetics makes the page unusable — restyle the outline instead.",
      "Check contrast on your actual colours rather than assuming. Light grey on white is an extremely common aesthetic choice that fails badly, and it is unreadable for people with low vision and for anyone using a phone in bright sunlight.",
    ],
    vocabulary: [
      {
        term: "Form method",
        meaning:
          "How data is sent. POST for sensitive or state-changing data, GET for visible bookmarkable queries.",
      },
      {
        term: "name attribute",
        meaning:
          "The key the input's value arrives under. Without it the data never reaches the server.",
      },
      {
        term: "Label association",
        meaning:
          "Connecting a label to an input with for and id. Announced by assistive technology and makes the label clickable.",
      },
      {
        term: "Placeholder",
        meaning:
          "Example text inside an input that disappears on typing. Never a substitute for a label.",
      },
      {
        term: "Fieldset and legend",
        meaning:
          "A grouping with a caption. Required so grouped radio options have a question attached.",
      },
      {
        term: "Focus indicator",
        meaning:
          "The visible outline showing which element has keyboard focus. Removing it makes a page unusable by keyboard.",
      },
      {
        term: "Contrast ratio",
        meaning: "How much text stands out from its background. At least 4.5:1 for normal text.",
      },
      {
        term: "Skip link",
        meaning:
          "A link at the top letting keyboard users bypass navigation. Without it they tab through the whole menu on every page.",
      },
    ],
    homework: [
      {
        task: "Build one accessible form",
        detail:
          "Correct types, real labels on every input, fieldset and legend for any grouped options, helper text via aria-describedby, and error messages naming the field and the fix.",
      },
      {
        task: "Tab through a page with the mouse put down",
        detail:
          "Reach everything, confirm focus is visible at every step, and fix anything you cannot reach or cannot locate. Note how long the navigation takes without a skip link.",
      },
      {
        task: "Measure your contrast",
        detail:
          "Check every text and background pair against 4.5:1 and fix the failures. Light grey on white is the usual culprit.",
      },
      {
        task: "Remove colour-only information",
        detail:
          "Find every place meaning is carried by colour alone — required markers, errors, status — and add a text indicator so the meaning survives without it.",
      },
    ],
    rubric: [
      {
        criterion: "Form structure",
        passing: "Has a form.",
        excellent:
          "Method and action set, every input named, input types chosen deliberately, and correct button types rather than styled links.",
      },
      {
        criterion: "Labelling",
        passing: "Fields are identifiable.",
        excellent:
          "Real labels connected by for and id on every input, placeholder used only for examples, radios grouped in a fieldset with a legend, helper text attached via aria-describedby.",
      },
      {
        criterion: "Error handling",
        passing: "Shows errors.",
        excellent:
          "Messages naming the field and the fix rather than only colour, and a submit flow that cannot trap the user when a request fails.",
      },
      {
        criterion: "Keyboard access",
        passing: "Mostly usable.",
        excellent:
          "Proven by mouse-down tab traversal reaching everything, visible focus on every element with no outline removed, and a working skip link.",
      },
      {
        criterion: "Accessibility fundamentals",
        passing: "Looks reasonable.",
        excellent:
          "Measured contrast of at least 4.5:1 throughout, no information conveyed by colour alone, meaningful link text, alt text, a descriptive title and a declared language.",
      },
    ],
    faqs: [
      {
        q: "Do I really need a label if I have a placeholder?",
        a: "Yes. Placeholder text disappears the moment someone starts typing, so they cannot remember what the field was for; it is usually too low-contrast to read comfortably; and some assistive technology does not announce it at all. Use placeholder for an example like '0803 000 0000' and a real label for the field.",
      },
      {
        q: "Why does my form submit but nothing arrives?",
        a: "Almost always a missing name attribute on the input. The name is the key the data arrives under, so an input without one is invisible to the server however correct it looks on the page.",
      },
      {
        q: "Is accessibility really necessary for a small project?",
        a: "The basics cost minutes if you do them while building: labels, alt text, visible focus, adequate contrast, semantic elements. Retrofitting them costs hours. And they help far more people than you would guess — including anyone using a phone in bright sunlight or with a broken mouse.",
      },
      {
        q: "What contrast ratio do I need?",
        a: "At least 4.5:1 for normal text and 3:1 for large text. Measure your actual colours rather than assuming — light grey on white is an extremely common design choice that fails badly, and it is unreadable for people with low vision.",
      },
      {
        q: "Should I disable the submit button while the form is sending?",
        a: "Not without a way back. It prevents double submission but traps the user if the request fails, leaving them unable to retry. Better to keep it enabled, show a loading state, and handle failure with a clear message telling them what went wrong.",
      },
    ],
  },

  "css-box-model-typography": {
    summary:
      "CSS is how a page looks, and almost every layout confusion comes from not understanding the box model. This session covers selectors, classes and IDs, how boxes actually size, typography that is readable, and colour used with intent.",
    objectives: [
      "Select elements precisely with selectors, classes and IDs",
      "Explain the box model and control it deliberately",
      "Understand why box-sizing matters and set it once",
      "Choose and pair type that is readable on a phone",
      "Use colour with contrast and purpose",
      "Build a styled page that holds together at any width",
    ],
    blocks: [
      {
        heading: "Selectors, classes and IDs",
        body: [
          'A CSS rule has two parts: a **selector** saying what to style, and **declarations** saying how. `h2 { color: navy; }` selects every `<h2>` and sets its colour. The element selector is the bluntest tool available — it styles every instance — which is why **classes** exist: `<p class="intro">` and `.intro { … }` style only the paragraphs you marked.',
          "The rule for choosing is straightforward. **Use a class for anything you style more than once or might want to style differently later**, which is most things. **Use an ID for something genuinely unique** — and be aware that an ID carries more weight than a class, so it is harder to override later, which is why IDs are better used for JavaScript hooks and page anchors than for styling. **Use an element selector for defaults** that should apply everywhere, like body font or heading colour.",
          "Then **specificity**, which decides what wins when two rules conflict. Roughly, an ID beats a class, a class beats an element, and among equals the later rule wins. Most 'why is my CSS not working' problems are specificity problems, and the wrong fix is adding `!important` — which wins today and creates a rule you cannot override tomorrow. The right fix is a simpler, more specific selector.",
        ],
      },
      {
        heading: "The box model",
        body: [
          "Every element on a page is a **rectangular box**, and the box has four layers: the **content**, then **padding** (space inside the box, between the content and its edge), then the **border**, then **margin** (space outside the box, between it and its neighbours). Understanding those four is most of CSS layout, because everything else is arranging boxes.",
          "The part that confuses everyone is **what `width` means**. By default, `width: 200px` sets the width of the **content only** — add padding and a border and the element becomes visibly wider than 200px. So a 200px box with 20px of padding and a 1px border is 242px across, which breaks layouts in ways that seem arbitrary until you know this.",
          "The fix is one line, and it should be at the top of every stylesheet: `*, *::before, *::after { box-sizing: border-box; }`. This makes `width` mean the **whole box**, padding and border included, which is what everyone expects and what makes layouts predictable. Setting it once removes an entire category of confusion, and virtually every modern project does it.",
        ],
      },
      {
        heading: "Display, flow and spacing",
        body: [
          "Elements are either **block** — they take a full line and stack vertically, like `<p>` and `<div>` — or **inline** — they sit within a line and only take the width of their content, like `<a>` and `<strong>`. This is why margin-top does nothing useful on an inline element, and why setting a width on one appears to be ignored. Knowing which is which explains a great deal of otherwise mysterious behaviour.",
          "Then **margin collapsing**, the behaviour that surprises everyone first. When two vertical margins meet — the bottom of one block and the top of the next — they do not add up; the **larger one wins**. So a paragraph with 20px below followed by one with 30px above has 30px between them, not 50px. It is not a bug, and knowing it prevents a great deal of confused spacing adjustment.",
          "Spacing itself is a design decision more than a technical one. **Consistency reads as deliberate**: pick a small scale — 4, 8, 16, 24, 32, 48 pixels — and use only those values. Random spacing looks untidy even when nobody can say why. And **space things by relationship**: elements that belong together sit closer than elements that do not, which is how a reader understands grouping without being told.",
        ],
      },
      {
        heading: "Typography",
        body: [
          "Typography is most of what makes a page feel professional, and it comes down to four decisions. **Size**: body text at 16px or larger — anything smaller is hard to read on a phone, which is where most people will read it. **Line height**: about 1.5 times the font size for body text, because cramped lines are tiring and loose lines lose the thread. **Line length**: roughly 45 to 75 characters, which is why a full-width paragraph on a wide screen is unpleasant to read.",
          "Then **font choice**. Use a system font stack or one well-made web font, and load no more than two families, because each one is a file someone has to download on a slow connection — a real cost here. A stack like `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` renders instantly with no download and looks good everywhere, which is usually the right answer for a small project.",
          "And **hierarchy through contrast, not variety**. A page needs a clear order of importance — heading sizes, weights and spacing doing the work — rather than five different fonts at similar sizes. Set headings in relative units (`em` or `rem`) so they scale with the base size, and never set text below about 14px for anything anyone needs to read.",
        ],
      },
      {
        heading: "Colour",
        body: [
          "Colour needs three things: a **limited palette**, **sufficient contrast**, and **a job**. A palette of two or three colours plus neutrals looks deliberate; a page with eight accent colours looks accidental. Define them once as **CSS custom properties** — `--brand: #0b6b3a;` — so changing the palette later is one edit rather than a search through the whole stylesheet.",
          "**Contrast is a requirement, not a preference.** Body text needs at least 4.5:1 against its background. Light grey on white fails badly and is the single most common reason a site that looks elegant is genuinely hard to read — for people with low vision, and for anyone on a phone in daylight, which describes most of Nigeria.",
          "Then **never rely on colour alone to carry meaning**, and use colour consistently: one colour for primary actions, one for errors, one for success, applied the same way everywhere. A user learns your colour language in a few seconds, and inconsistent use breaks it. Also remember that roughly one in twelve men has some colour vision deficiency, so red-versus-green distinctions — the classic error-and-success pairing — need a text or icon indicator alongside them.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor styles a plain semantic page from unstyled to finished, demonstrating specificity conflicts and their correct fix, proving the box model with and without border-box, showing margin collapsing live, and building a type scale and palette that hold up at phone width.",
      steps: [
        {
          step: "Start from unstyled markup",
          detail:
            "Open the semantic page with no CSS. Explain that structure comes first and styling is applied to meaning that already exists.",
        },
        {
          step: "Set base styles with an element selector",
          detail:
            "Style body and headings. Explain that element selectors are for defaults that should apply everywhere.",
        },
        {
          step: "Add a class for one paragraph",
          detail:
            "Style only the marked paragraphs. Explain that classes exist because element selectors are too blunt for anything selective.",
        },
        {
          step: "Create a specificity conflict",
          detail:
            "Write two conflicting rules and show which wins. Explain the rough order — ID, class, element, then source order.",
        },
        {
          step: "Fix it properly",
          detail:
            "Replace the tempting !important with a simpler, more specific selector. Explain that !important wins today and creates a rule you cannot override tomorrow.",
        },
        {
          step: "Prove the box model",
          detail:
            "Set width 200px with 20px padding and a border, then measure the rendered box. Show it is 242px and explain why layouts break.",
        },
        {
          step: "Apply border-box globally",
          detail:
            "Add the universal box-sizing rule and re-measure. Explain that this makes width mean the whole box, which is what everyone expects.",
        },
        {
          step: "Show block versus inline",
          detail:
            "Try margin-top and width on an inline element. Explain that both appear to be ignored, and why knowing the display type explains it.",
        },
        {
          step: "Demonstrate margin collapsing",
          detail:
            "Set 20px below one paragraph and 30px above the next, then measure the gap. Show it is 30px, not 50px, and explain that the larger margin wins.",
        },
        {
          step: "Build a spacing scale",
          detail:
            "Define 4, 8, 16, 24, 32, 48 and use only those. Explain that consistent spacing reads as deliberate while random spacing looks untidy.",
        },
        {
          step: "Set the type scale",
          detail:
            "Set body at 16px with 1.5 line height and constrain the line length. Explain that full-width paragraphs on a wide screen are genuinely unpleasant to read.",
        },
        {
          step: "Choose the font stack",
          detail:
            "Use a system stack with no download. Explain that each web font is a file someone loads on a slow connection, which matters here.",
        },
        {
          step: "Define the palette as variables",
          detail:
            "Set custom properties and apply them. Explain that changing the palette later becomes one edit rather than a search through the stylesheet.",
        },
        {
          step: "Check contrast and colour-only meaning",
          detail:
            "Measure the actual ratios and add a text indicator where colour alone carries meaning. Explain that roughly one in twelve men has colour vision deficiency.",
        },
      ],
    },
    practice: {
      title: "Style a page with a deliberate system",
      brief:
        "You take a semantic page and style it with a system rather than ad-hoc rules: border-box set globally, a spacing scale used consistently, a type scale readable at phone width, a palette defined as custom properties with measured contrast, and no specificity conflicts resolved with !important.",
      steps: [
        "Start from semantic markup with no styling applied.",
        "Add the universal box-sizing: border-box rule at the top.",
        "Set base element styles for body and headings as defaults.",
        "Use classes for anything styled more than once.",
        "Reserve IDs for JavaScript hooks and anchors rather than styling.",
        "Resolve any conflicting rule with a better selector, never !important.",
        "Define a spacing scale of 4, 8, 16, 24, 32, 48 and use only those values.",
        "Space elements by relationship: related things closer together.",
        "Set body text at 16px or larger.",
        "Set line height to about 1.5 for body text.",
        "Constrain the line length to roughly 45 to 75 characters.",
        "Use a system font stack or at most two web font families.",
        "Set headings in em or rem so they scale with the base size.",
        "Define two or three palette colours as CSS custom properties.",
        "Measure the contrast of every text and background pair against 4.5:1.",
        "Add a text or icon indicator anywhere colour alone carries meaning.",
        "Check the page at phone width and confirm the type is still readable.",
      ],
      standard:
        "A styled semantic page with box-sizing: border-box set globally, element selectors used for defaults and classes for anything repeated, IDs reserved for hooks rather than styling, every specificity conflict resolved with a better selector and no !important anywhere, a spacing scale of 4/8/16/24/32/48 used exclusively with related elements closer together, body text at 16px or larger with 1.5 line height and a constrained line length, a system stack or at most two font families with headings in relative units, a two or three colour palette defined as custom properties, every text pair measured at 4.5:1 or better, text or icon indicators wherever colour alone carries meaning, and readability confirmed at phone width.",
    },
    pitfalls: [
      {
        problem: "Your layouts break when you add padding",
        fix: "Set *, *::before, *::after { box-sizing: border-box; } at the top of the stylesheet. Without it, width means content only, so padding and borders make elements wider than you asked for.",
      },
      {
        problem: "You reach for !important when a rule will not apply",
        fix: "Find the specificity conflict and write a better selector. !important wins today and creates a rule you cannot override tomorrow, which is how stylesheets become unmaintainable.",
      },
      {
        problem: "You use IDs for styling",
        fix: "Use classes. An ID outweighs a class and is harder to override later, so IDs are better reserved for JavaScript hooks and page anchors.",
      },
      {
        problem: "You cannot work out why two margins do not add up",
        fix: "Vertical margins collapse — the larger one wins. A 20px bottom margin against a 30px top margin gives a 30px gap, not 50px, and this is intended behaviour rather than a bug.",
      },
      {
        problem: "Your width and margin do nothing on an element",
        fix: "Check its display type. Inline elements ignore width and vertical margin, so set display to block or inline-block if you need box behaviour.",
      },
      {
        problem: "Your body text is smaller than 16px",
        fix: "Set it to 16px or larger with about 1.5 line height. Smaller text is hard to read on a phone, which is where most people will read your page.",
      },
      {
        problem: "You load several web fonts",
        fix: "Use a system font stack or at most two families. Each font is a file someone downloads on a slow connection, which is a real cost for most users here.",
      },
      {
        problem: "Your colour choices fail contrast",
        fix: "Measure every text and background pair against 4.5:1. Light grey on white looks elegant and is genuinely hard to read, particularly on a phone in daylight.",
      },
    ],
    expertNotes: [
      "Put box-sizing: border-box at the top of every stylesheet. It makes width mean the whole box including padding and border, which is what everyone expects, and it removes an entire category of layout confusion for one line of CSS.",
      "Resolve specificity conflicts with a better selector, never with !important. !important wins today and creates a rule you cannot override tomorrow, which is the most common way a stylesheet becomes unmaintainable.",
      "Pick a spacing scale and use only those values. Consistent spacing reads as deliberate design while random values look untidy, and nobody can articulate why — but everybody can see it.",
      "Measure contrast on your actual colours rather than assuming. Light grey on white is an extremely common aesthetic choice that fails the 4.5:1 requirement badly, and it is unreadable for people with low vision and for anyone on a phone in bright sunlight.",
    ],
    vocabulary: [
      {
        term: "Selector",
        meaning:
          "The part of a rule choosing what to style. Element, class or ID, in increasing specificity.",
      },
      {
        term: "Specificity",
        meaning:
          "What decides which rule wins a conflict. ID beats class, class beats element, then source order.",
      },
      {
        term: "Box model",
        meaning:
          "Content, padding, border and margin. Every element is a box made of those four layers.",
      },
      {
        term: "box-sizing: border-box",
        meaning: "Makes width include padding and border. One line that makes layouts predictable.",
      },
      {
        term: "Margin collapsing",
        meaning:
          "Adjacent vertical margins where the larger wins rather than adding up. Intended behaviour.",
      },
      {
        term: "Display type",
        meaning:
          "Block stacks and takes a full line; inline flows within a line and ignores width and vertical margin.",
      },
      {
        term: "Custom property",
        meaning:
          "A CSS variable such as --brand. Changing the palette becomes one edit instead of a search.",
      },
      {
        term: "Type scale",
        meaning:
          "The set of font sizes used, in relative units. Hierarchy comes from contrast, not variety.",
      },
    ],
    homework: [
      {
        task: "Set up your base stylesheet",
        detail:
          "box-sizing: border-box universally, base element defaults, a spacing scale of 4/8/16/24/32/48, and a palette of two or three colours as custom properties.",
      },
      {
        task: "Prove the box model to yourself",
        detail:
          "Set width 200px with 20px padding and a 1px border, measure the rendered element with and without border-box, and note the difference. Do it once and you will not forget it.",
      },
      {
        task: "Set a readable type scale",
        detail:
          "Body at 16px or larger, line height about 1.5, line length constrained to 45–75 characters, headings in em or rem, and a system font stack with no download.",
      },
      {
        task: "Audit one stylesheet for !important",
        detail:
          "Find every instance, work out the specificity conflict behind it, and replace it with a better selector. Note how many were avoiding a problem rather than solving one.",
      },
    ],
    rubric: [
      {
        criterion: "Selectors",
        passing: "Styles elements.",
        excellent:
          "Element selectors for defaults, classes for anything repeated, IDs reserved for hooks, and every conflict resolved with a better selector with no !important anywhere.",
      },
      {
        criterion: "Box model",
        passing: "Sets widths and padding.",
        excellent:
          "border-box set globally, the four layers understood, display types accounted for, and margin collapsing explained rather than fought.",
      },
      {
        criterion: "Spacing",
        passing: "Spaces things out.",
        excellent:
          "A fixed scale of 4/8/16/24/32/48 used exclusively, with related elements placed closer together so grouping reads without being stated.",
      },
      {
        criterion: "Typography",
        passing: "Chooses a font.",
        excellent:
          "Body at 16px or larger with 1.5 line height, line length constrained, a system stack or at most two families, and headings in relative units.",
      },
      {
        criterion: "Colour",
        passing: "Picks colours that look good.",
        excellent:
          "A two or three colour palette as custom properties, every pair measured at 4.5:1 or better, consistent meaning per colour, and text or icon indicators where colour alone is not enough.",
      },
    ],
    faqs: [
      {
        q: "Why is my element wider than the width I set?",
        a: "Because width defaults to the content only, so padding and border are added on top. Set *, *::before, *::after { box-sizing: border-box; } at the top of your stylesheet and width will mean the whole box, which is what you expected.",
      },
      {
        q: "My CSS rule is being ignored. Why?",
        a: "Almost always specificity. An ID beats a class, a class beats an element, and among equals the later rule wins. Find the conflicting rule in the browser's developer tools and write a better selector — do not reach for !important, which creates a rule you cannot override later.",
      },
      {
        q: "Why do two margins not add up?",
        a: "Adjacent vertical margins collapse and the larger one wins. A 20px bottom margin against a 30px top margin gives a 30px gap, not 50px. It is intended behaviour, and knowing it saves a lot of confused spacing adjustment.",
      },
      {
        q: "What font size should body text be?",
        a: "16px or larger, with a line height of about 1.5 and a line length of roughly 45 to 75 characters. Smaller than that is hard to read on a phone, which is where most people will read your page.",
      },
      {
        q: "Should I use web fonts or system fonts?",
        a: "For a small project, a system font stack is usually right — it renders instantly with nothing to download, which matters on the slow connections most users here have. If you want a distinctive font, load at most two families and only the weights you actually use.",
      },
    ],
  },
};
