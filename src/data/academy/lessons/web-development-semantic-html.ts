import type { SessionLecture } from "../types";

/**
 * Web Development — session 1.
 * Standalone tutorial: a semantic HTML page a beginner can open in a browser.
 * Diagrams in public/images/classes/web-development/ are illustrations, not screenshots.
 * Markup in `code` blocks is the copyable source. Do not treat the pictures as code.
 *
 * Checked 2026-09-26 against MDN's html element page and the HTML living standard.
 */
export const semanticHtml: SessionLecture = {
  reviewed: "2026-09-26",
  summary:
    "You are going to make a real HTML file, open it in a browser, and see a page whose structure means something — a heading that is a heading, a list that is a list, a table that is data. The page will look plain. That is the point. Colour comes later. Meaning starts here.",
  objectives: [
    "Explain what HTML describes, and what the browser does with it",
    "Create a project folder and an index.html file the browser will actually treat as a page",
    "Write a document skeleton and say what the title, character set and viewport are for",
    "Use headings, paragraphs, links, images, lists and a data table for the jobs they have",
    "Mark the page up with header, nav, main, section, aside and footer rather than a pile of divs",
    "Recognise the usual failures: tags showing as text, a missing save, a broken image path, a link that jumps nowhere",
  ],
  learningPath: {
    fits: "This is session 1 of Web Development, the course that ends in a small site you can put on the internet. It assumes you can already sit at a computer, create a folder and use a browser. It does not assume you have written a tag. If you have done Web Design, you will move faster — stay for the semantic page and the checks, and do not skip the file-extension trap.",
    prerequisites: [
      "You can create a folder, name a file, and open a browser. If that is not true yet, do [Understanding the Computer](/classes/computer-basics-typing/understanding-the-computer) first.",
      "A laptop you are allowed to install software on, or an academy machine with VS Code. A phone cannot be the editor for this lesson.",
      "About two quiet hours. The first page is short. The mistakes around saving and file names are what take the time.",
    ],
    unlocks:
      "Session 2, Forms and Accessibility, puts a way to contact the business on this same page, and checks that a keyboard and a screen reader can move through the landmarks you are about to name. CSS, in session 3, is what will make the plain page look designed. Do not reach for colour to hide a weak structure.",
    nextLesson: {
      label: "Session 2: Forms and Accessibility",
      href: "/classes/web-development/forms-and-accessibility",
    },
    practiceTime:
      "90–120 minutes the first time, including one deliberate mistake and the repair. Then 20 minutes later the same day with the page closed, rebuilding the skeleton from memory.",
    definitionOfDone: [
      "index.html opens in a browser and you see words, not angle brackets.",
      "The browser tab says the business name, not Document or Untitled.",
      "The page has one h1, section headings, a navigation list, a data table with header cells, and at least one link whose text says where it goes.",
      "You can point at header, nav, main and footer in the file and say what each region is for.",
      "You can say why a missing image, an unsaved file, and a .txt extension produce three different wrong screens.",
    ],
    assumptions: [
      "Windows 10 or Windows 11, with Chrome or Edge. A Mac works. The HTML is the same. Save is Command+S instead of Ctrl+S, and file extensions are managed in Finder. This lesson names the Windows path and does not pretend the menus are identical.",
      "Visual Studio Code, from code.visualstudio.com. Another editor is acceptable if it can save a file whose name ends in .html and show you when the file is unsaved.",
      "No CSS and no JavaScript in this session. A plain page is a finished session-1 page.",
      "The shop in the example is fictional. Do not publish it as a real business.",
    ],
  },
  blocks: [
    {
      heading: "The page a client actually asked for",
      body: [
        "Kemi runs a laundry in Yaba. She does not want a lecture about the internet. She wants a page she can send on WhatsApp: the name of the shop, what it does, when it is open, and how to reach it. If the light goes out at the shop, the page should still say the hours honestly. If a customer is on a phone, the words should at least be readable before any design work begins.",
        "That page is the job of this session. You will build it as Harbour Light Laundry, a practice shop that does not exist. The number on it is a placeholder. The address is a placeholder. The skill is not. A junior developer who can hand over a file that opens, reads clearly, and uses the right elements is already more useful than someone who can recite a definition of HTML.",
        "You may have met a shorter version of this idea in [How the Web Works](/classes/web-design/how-the-web-works). That session is about domains, hosting and the three languages. This one stays on the file in front of you. If a sentence here uses a word you have not met — tag, element, browser, folder — it is defined at the moment you need it.",
      ],
      remember:
        "Success today is a page a stranger can read. It is not a designed website. Design is a later session, and it cannot rescue a file the browser never understood.",
    },
    {
      heading: "What the browser is doing with the file",
      body: [
        "A web page is a file of instructions. HTML is the instruction language for structure: this part is a heading, this part is a paragraph, this part is a link, this picture lives in that folder. HTML does not paint colours and it does not decide that a button does something. Those are CSS and JavaScript, and they are later sessions. If you ask HTML to 'make it look modern', you are asking the wrong language.",
        "The browser is the program that reads the file and draws the page. Chrome, Edge and Firefox are browsers. WhatsApp is not. If you open the file in WhatsApp's preview, or in the editor, you are not looking at what a customer will see.",
        "On a published site, the browser asks another computer — a server — for the file. On your laptop today, the file can come straight from a folder. The browser's job does not change. It still reads tags and draws a page. The address bar will start with `file:///` instead of `https://`. That is correct for this lesson. It is not a published site, and you should not tell a client that it is.",
        "When the same file later sits on a host, the host looks for a file named `index.html` when someone visits the folder. Name it that now. A file called `final final 2.html` will open on your machine and fail the habit you need in week 6.",
      ],
      remember:
        "HTML describes. The browser draws. The editor is where you write. Three different programs. Opening the file in the wrong one is the first false failure.",
    },
    {
      heading: "The mental model: you describe, the browser draws",
      body: [
        "Think of the page as an outline a careful person could read aloud. The outline has a title, one main heading, sections, a list of services, a table of hours, and a way to jump to the contact line. HTML is that outline, written in tags so a machine can follow it as well as a person.",
        "A screen reader, used by someone who cannot see the screen, walks the outline. It can jump to the main content, list the headings, and read a table by its headers. A search engine uses the same outline to decide what the page is about. If every part of the page is a nameless box, both of them are guessing. The page can still look finished to you. It is not finished.",
        "The test you will use for the rest of this course is simple enough to say now. Take the colour away. Read the file. If a stranger can tell what is a heading, what is navigation, and what is the actual content, the HTML is doing its job. If the meaning only exists because something is big or blue, the meaning is in the wrong language.",
        "Before the first file: if Kemi's page lost every colour and every font, what would still have to be true for a customer to use it? The name, the services, the hours, and a way to call. That is the outline you are about to write. Not a banner. Not a gradient.",
      ],
      remember:
        "If the meaning disappears when the design disappears, the meaning was never in the HTML.",
    },
    {
      heading: "Where the files live",
      body: [
        "Create a folder called `harbour-laundry` somewhere you can find again — Documents, or the desktop if you must. Not inside Downloads, where it will be buried by Friday. The name is lowercase, with a hyphen, and no spaces. Windows will let you use spaces. A Linux server, which is what most hosts are, treats `Shop.jpg` and `shop.jpg` as different files, and a space in a name becomes a problem the first time a link is copied into WhatsApp.",
        "Inside that folder, you will have `index.html` and, when you add a picture, a folder named `images`. Create the images folder now, even if it is empty. The path you write later has to match a folder that exists.",
        "Turn on file name extensions before you save anything. Windows hides them by default, which is how a file you thought was `index.html` becomes `index.html.txt`. The browser then shows you the tags as ordinary text, or refuses to draw the page, and the file looks innocent in the folder.",
        "On Windows 11, open File Explorer, choose View, then Show, then File name extensions. On Windows 10, the View tab has a checkbox with the same words. If the menu has moved, search the File Explorer menus for 'file name extensions' and tick it. You want to see `.html` and `.txt` at the end of names. Leave this on. It is a professional setting, not a beginner crutch.",
        "Install Visual Studio Code from [code.visualstudio.com](https://code.visualstudio.com/) if it is not already there. Open VS Code. Use File, then Open Folder, and choose `harbour-laundry`. Opening a folder matters. Several tools in this course, including the optional live-reload extension, do nothing useful when you open a single file and nothing else.",
        "In the Explorer sidebar, create a new file and name it exactly `index.html`. Look at the bottom-right of the VS Code window. It should say HTML. If it says Plain Text, click that word and choose HTML. That label is how the editor knows to colour tags and to expand shortcuts. A dot on the file's tab means you have not saved. Ctrl+S saves. The dot disappears.",
      ],
      remember:
        "Folder first. File named index.html. Extensions visible. The editor language says HTML. Save before you judge the result.",
    },
    {
      heading: "First success: words on a page, not tags",
      body: [
        "Type this file yourself. Do not paste it yet. The typing is how your eyes learn the shape. The complete shop page comes later, after each part has a reason.",
        "Save. Then open the file in a browser, not in the editor. In File Explorer, double-click `index.html`. It should open in Chrome or Edge. You can also drag the file onto an open browser window. The address bar should start with `file:///`.",
        "What you should see: a browser tab titled Harbour Light Laundry — Yaba. On the page, a large heading with the shop name, and a paragraph under it. Black text, white background, a font you did not choose. No colours of yours. If that is what you see, the browser understood the file. Stop and look at it for a moment. That plain page is the first success.",
        "If you can read the angle brackets on the page, the browser did not treat the file as HTML. The usual cause is a hidden `.txt` on the end of the name, or you are still looking at VS Code. Check the address bar. If you are not in a browser, you are not looking at the page.",
        "Change one word in the paragraph. Save. Go back to the browser and refresh — F5, or the reload button. The new word should appear. If it does not, you refreshed the editor, saved a different file, or the browser has an older copy. Ctrl+F5 asks the browser to reload without leaning on a cached copy. For a `file:///` page this is rarely the problem. An unsaved tab is the usual one.",
        "There is a faster way to write the skeleton once you understand it. In an HTML file, type `!` and press Tab. VS Code's Emmet shortcut expands a standard document. If Tab only inserts a space, the file is not in HTML mode, or Emmet is off. Do not fight the shortcut today if your hand-typed file already opens. The shortcut is a convenience, not the lesson. If the expanded skeleton uses `<!doctype html>` in lowercase, that is valid. The doctype is not case-sensitive.",
        "Optional, after the first success, not before: install a live-reload extension so the browser refreshes when you save. In VS Code press Ctrl+Shift+X, search Live Server, and install one extension whose description says it reloads the browser when you save. The long-standing one is published by Ritwick Dey. If several results appear, read the description and install one. Do not install all of them. Open the folder, not a lone file, then use Go Live on the status bar, or right-click `index.html` and choose Open with Live Server. The address will look like `http://127.0.0.1:5500/`. The port number can differ if 5500 is busy. If Go Live is missing, right-click the status bar and enable the Live Server item. You can finish this entire lesson without that extension. Double-click and refresh is enough.",
      ],
      code: [
        {
          filename: "index.html",
          language: "html",
          caption:
            "The smallest page that proves the setup. Type it. Save it. Open it in a browser. The tab title comes from title, not from h1.",
          source: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Harbour Light Laundry — Yaba</title>
</head>
<body>
  <h1>Harbour Light Laundry</h1>
  <p>Wash, fold, and ready by evening.</p>
</body>
</html>
`,
        },
      ],
      remember:
        "Words on the page, title in the tab, tags only in the editor. If the tags are on the page, fix the file name or the program you opened before you change any markup.",
    },
    {
      heading: "A tag is a labelled box",
      body: [
        "An element is a piece of the page with a job. Most elements are written as an opening tag, the content, and a closing tag. `<p>Wash and fold.</p>` is a paragraph. The opening tag names the job. The closing tag ends it, with a slash before the name. If you forget the closing tag, the browser does not stop and scold you. It guesses where the paragraph ended. The guess is often wrong, and the damage shows up later, far from the line you missed.",
        "Some elements have no content. They do not get a closing tag. In this lesson those are `meta` and, when you add a picture, `img`. Writing `<br></br>` or a closing `meta` tag is a habit from an older style. In HTML, `<img>` is complete. A trailing slash — `<img />` — is allowed and not required. This course uses the form without the slash.",
        "An attribute is a fact about the element, written inside the opening tag. `lang=\"en\"` says the page is in English. `href` on a link says where it goes. `src` on an image says which file to load. `alt` says what the image is if it cannot be seen. Put quotes around attribute values. A value with a space will break without them, and quoting all of them is the habit that does not have to be remembered case by case.",
        "Elements nest. A paragraph can sit inside a section. A section can sit inside main. The closing tags come out in reverse order, the way brackets do in arithmetic. This is valid nesting: main opens, heading opens, heading closes, paragraph opens, paragraph closes, main closes. This is not: a paragraph closed after the main that was supposed to contain it. When a page 'breaks further down', look upward for the tag you did not close.",
        "The browser collapses whitespace. A new line in the file is not a new line on the page. Ten spaces become one. If you want a new paragraph, use another `<p>`. If you want a line break inside one paragraph — the two lines of an address — use `<br>`. Do not build the whole page out of `<br>`. That is a typewriter habit, and it throws away the outline.",
        "If you need a less-than sign in the text itself, write `&lt;`. A raw `<` starts a tag. An ampersand in text is `&amp;`. The naira sign can be typed as ₦ if the character set is UTF-8, which is why that meta tag is in the skeleton. Leave it out, save the file in a confused encoding, and ₦ can turn into rubbish. You will not always see the failure on your own laptop. You will see it on someone else's.",
      ],
      remember:
        "Opening tag, content, closing tag. Attributes in the opening tag, quoted. Close in reverse order. A new line in the file is not a new line on the page.",
    },
    {
      heading: "The skeleton, and the job of each line",
      body: [
        "`<!DOCTYPE html>` tells the browser to use current HTML rules. Omit it and some browsers fall back to older, quirkier layout rules. The page may still appear. It will misbehave later, in ways that look like CSS bugs. Put the doctype first. Capitalisation does not matter. `<!DOCTYPE html>` and `<!doctype html>` are the same instruction.",
        "`<html lang=\"en\">` is the root. Everything else sits inside it. There is one html element. `lang` is not decoration. A screen reader uses it to choose a pronunciation. `en` is right for a page in English, including Nigerian English. A page whose content is mostly Yoruba, Igbo or Hausa should say so — `yo`, `ig`, `ha` — instead of leaving the reader to guess. MDN's page on the html element is the reference if you need the rule in the spec's words: the language tag should describe the language of most of the content.",
        "`<head>` is about the page. Almost nothing in the head is drawn in the page body. The title is the exception people feel, because it appears in the tab, in a bookmark, and as the label when the link is shared. 'Document' and 'Untitled' are how you can tell a page was generated and never edited. Change it before you show the file to anyone. For this shop: Harbour Light Laundry — Yaba. The shop name, then the place. A title that is only 'Home' is useless in a row of tabs.",
        "`<meta charset=\"UTF-8\">` sets the character set. Leave it in. It is the line that makes ₦, and names with marks, safe.",
        "`<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">` tells a phone not to pretend the page is a tiny desktop and force the customer to pinch. You are not doing responsive layout today. You are refusing the worst default. A page without this line looks acceptable on your laptop and cramped when Kemi opens it on her phone. Check the spelling of `width=device-width`. A typo here fails silently.",
        "`<body>` is what the visitor sees. The heading and the paragraph you already wrote belong here, and so will the regions in the full page. Do not put a visible heading in the head. Do not put the title in the body and hope the tab will notice. They are different jobs.",
      ],
      remember:
        "Doctype, language, character set, viewport, a real title, then the body. Five lines of setup. Skip them and the page can still 'work' on your laptop while failing for the person you made it for.",
    },
    {
      heading: "Headings and paragraphs are an outline",
      body: [
        "Headings are ranks, not font sizes. `<h1>` is the subject of the page. Use one. The shop name is the h1. `<h2>` is a major section: Services, Hours, Contact. `<h3>` is a subsection inside one of those, if you need it. Do not pick h1 because you want big text, and do not skip from h2 to h4 because h3 'looks too large'. The size is CSS's job, in session 3. The rank is yours, today.",
        "A screen reader user can ask for the list of headings and move through the page that way. A skipped level is a missing step in that list. A page with three h1 elements has three subjects, which usually means the author was choosing sizes.",
        "`<p>` is a paragraph. One idea, then close it. Empty paragraphs are not a way to make space. Space is CSS. `<strong>` means this matters, not 'this should be bold'. `<em>` means emphasis, the way you would stress a word in speech. `<b>` and `<i>` are visual only. Prefer strong and em when the stress is real. For a laundry page, you may not need either. Do not decorate.",
        "Read the page as an outline before you add anything else. Harbour Light Laundry. Services. Hours. Contact. If you cannot say that outline aloud from the headings alone, the headings are wrong, however neat the file looks.",
      ],
      remember:
        "One h1. Sections are h2. Size is not your decision yet. A paragraph is a paragraph, not a pile of line breaks.",
    },
    {
      heading: "Links that say where they go",
      body: [
        "A link is an `<a>` element with an `href`. The text between the tags is what the person clicks, and what a screen reader reads in a list of links. 'Click here' says nothing in that list. 'See opening hours' says where they are going. Write the second kind.",
        "A link to another part of the same page uses a hash and an id. `href=\"#hours\"` jumps to the element with `id=\"hours\"`. The id must match exactly, including capital letters. `Hours` and `hours` are not the same. If the id is missing, the click does nothing useful — often it jumps to the top, which feels like a bug you cannot see.",
        "A link to another file in the project is a relative path: `services.html` if that file is in the same folder. Do not write `https://` and a domain you do not own yet. Relative paths keep working when the folder moves to a host.",
        "A link to someone else's site is an absolute URL, including `https://`. For practice, [example.com](https://example.com) is a reserved address made for examples. It is not your client's website. Do not send a customer there and call it a launch.",
        "A telephone link uses `tel:` and the number in international form. `tel:+2348000000000` is the shape. On a phone, it can open the dialler. On a desktop, it may do nothing, or it may ask to open an app. Both are normal. The visible text should still be the human number, so a person can read it even if the link does nothing on that device.",
        "Do not add `target=\"_blank\"` today. Opening a new tab without being asked throws away the Back button, which is how many people recover from a wrong click. If a later project truly needs a new tab, add `rel=\"noopener\"` as well. A new tab without that attribute is an old security footgun. You do not need it for a laundry page.",
      ],
      code: [
        {
          filename: "a fragment, not a whole file",
          language: "html",
          caption:
            "The hash and the id are a pair. Change one and not the other, and the link dies quietly.",
          source: `<a href="#hours">See opening hours</a>

<section id="hours">
  <h2>Hours</h2>
</section>
`,
        },
      ],
      remember:
        "The link text is the promise. The href is the destination. They are allowed to disagree, and when they do the page is lying.",
    },
    {
      heading: "Images, and the path that finds them",
      body: [
        "An image is not inside the HTML file. The HTML points at a file. `<img src=\"images/shop.jpg\" alt=\"Front of the shop, with the name above the door\">` means: look in the images folder, next to this HTML file, for shop.jpg, and if you cannot show it, use this description.",
        "`alt` is required in the sense that omitting it is a defect, not a style choice. Write what the picture shows, or what it is for. 'Front of the shop, with the name above the door' is useful. 'image' is not. 'shop.jpg' is not. If the picture is pure decoration and adds no information, `alt=\"\"` tells assistive technology to skip it. An empty alt is a decision. A missing alt is a mistake.",
        "Set `width` and `height` to the real pixel size of the image when you know it. The browser can then reserve space before the file arrives, so the page does not jump as pictures load. If you do not know the size yet, leave the attributes off rather than inventing numbers that stretch the photo. Do not copy 800 and 500 from an example unless the file really is that size.",
        "The path is relative to the HTML file, not to your Documents folder, and not to the editor. `images/shop.jpg` works when `index.html` and the `images` folder are neighbours. If you move the HTML file into another folder and do not move the images, every picture breaks. If the file on disk is `Shop.JPG` and the tag says `shop.jpg`, your laptop may still show it and a real host may not. Match the name exactly, lowercase.",
        "You do not have to have a photograph to finish this lesson. Add the tag when you have a file you are allowed to use. A missing file should show a broken-image indicator and the alt text, not a silent gap. That broken indicator is information. Read it. Then check the folder, the name, and the spelling of `src`.",
        "Do not use an image as the only copy of important text. A heading that exists only inside a picture is invisible to a screen reader and to a search engine, and it goes blurry on a phone. The shop name belongs in an h1. The picture can repeat it. The picture must not be the only place it exists.",
      ],
      code: [
        {
          filename: "inside body, once images/shop.jpg exists",
          language: "html",
          caption:
            "Replace the width and height with the file's real pixel size when you know it. The alt text stays even if you change the numbers.",
          source: `<img
  src="images/shop.jpg"
  alt="Front of the laundry shop, with the name above the door"
  width="800"
  height="500"
>
`,
        },
      ],
      remember:
        "The tag points. The file has to be where the path says, with the same spelling. Alt is the words that remain when the file does not.",
    },
    {
      heading: "Lists and tables",
      body: [
        "A list of services is a list, even before it has bullets you designed. `<ul>` is an unordered list — the order is not the point. `<ol>` is ordered — steps, or a rank, where sequence matters. Each item is an `<li>` inside the list, not a paragraph with a dash typed by hand. Navigation is a `ul` of links. You will style it sideways later. Today it may run down the page. That is correct.",
        "A table is for data that genuinely has rows and columns: hours, a price list, a size chart. It is not a way to place a sidebar. A layout table falls apart on a small screen and is miserable to read aloud.",
        "Use a `<caption>` so the table has a name. Use `<th>` for header cells, not `<td>` made bold. `scope=\"col\"` means this header names the column. `scope=\"row\"` means it names the row. A screen reader uses those to announce 'Saturday, open, 9:00 to 16:00' instead of a stream of unrelated words. `<thead>` holds the header row. `<tbody>` holds the data. You do not need every optional table element. You do need headers.",
        "Do not merge cells to make the table 'look designed'. Merged cells are where reading order goes to die. If the hours are simple, keep the table simple.",
      ],
      code: [
        {
          filename: "services list",
          language: "html",
          caption: "A ul is the right list because the customer can read the services in any order.",
          source: `<ul>
  <li>Wash and fold, priced per kilogram</li>
  <li>Shirts pressed, ready for the office</li>
  <li>Duvets and heavy loads, booked a day ahead</li>
</ul>
`,
        },
        {
          filename: "hours table",
          language: "html",
          caption:
            "Header cells name the columns and the rows. Without them the numbers are just numbers.",
          source: `<table>
  <caption>Shop hours</caption>
  <thead>
    <tr>
      <th scope="col">Day</th>
      <th scope="col">Open</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Monday to Friday</th>
      <td>8:00 to 19:00</td>
    </tr>
    <tr>
      <th scope="row">Saturday</th>
      <td>9:00 to 16:00</td>
    </tr>
    <tr>
      <th scope="row">Sunday</th>
      <td>Closed</td>
    </tr>
  </tbody>
</table>
`,
        },
      ],
      remember:
        "If the order does not matter, ul. If it does, ol. If it is rows and columns of facts, table with th. If you are only trying to push things sideways, stop. That is CSS.",
    },
    {
      heading: "Semantic regions: name the job, not the colour",
      body: [
        "Semantic elements say what a region is. `<header>` is the introductory matter, usually the shop name. `<nav>` is the block of navigation links. `<main>` is the primary content — one per page. `<section>` is a thematic group, and it should usually have a heading. `<aside>` is related but not the main thread: a note about today's power, a warning, a side fact. `<footer>` is the closing matter: the practice-page notice, a copyright line, a repeated address.",
        "`<article>` is easy to overuse. It means a self-contained piece that would still make sense if it were copied out of the page — a news story, a product that stands alone. A 'Services' block on a shop homepage is a section, not an article. If you wrap every section in article, the word stops meaning anything.",
        "`<div>` is a box with no meaning. `<span>` is the same idea, inside a line. They are legal and sometimes necessary. They are the wrong first reach. A div with `class=\"header\"` can be styled to look like a header. A screen reader does not treat that class as a landmark. The element name is the landmark. The class is a label you invented.",
        "The diagram stacks the regions so you can read them. It is not a layout instruction. Aside does not have to sit on the right. Footer does not have to be grey. Position and colour are the CSS sessions. If you add a style attribute today to 'make it look real', you are hiding from the outline. Take it out.",
        "One `<main>`. Navigation inside `<nav>`, and the nav is not inside main if it is site navigation rather than a table of contents for one article. The footer is not inside main. These are conventions with a purpose: assistive technology can skip the repeated navigation and go to main. A page that is one long div gives them nothing to skip to.",
      ],
      remember:
        "header, nav, main, section, aside, footer. One main. Div only when no named element fits. A class is not a substitute for the element.",
    },
    {
      heading: "The whole page, in one file",
      body: [
        "Replace the contents of `index.html` with the full document below. This is the worked example. It includes the skeleton, the outline, the list, the table, the in-page links, and a telephone link. It does not include a picture, so you are not blocked on a file you do not have. Add the img tag from the earlier section when you do.",
        "Read it in pieces, not as a spell. Start at the title. Then the header. Then the nav, and check that each href has a matching id further down. Then main, and confirm there is one h1 on the page — it is in the header, so the sections use h2. Then aside. Then footer. Then save and open it in the browser.",
        "What you should see: the shop name as the largest text, a list of three links, three sections you can reach by clicking those links, a table of hours, a phone number, and a footer that admits this is practice. The links may look blue and underlined. You did not set that. The browser's default style did. Leave it. Defaults are readable, which is more than many designed links manage.",
        "Click 'Hours'. The page should jump to the hours heading. Click 'Contact'. It should jump again. If it does not, compare the href with the id, character by character.",
        "Then look at the file with the browser's developer tools, once. Press F12, or Ctrl+Shift+I. Open the Elements panel. You should see the same tree: html, head, body, header, nav, main. Click the heading on the page, if the inspector arrow is on, and the panel should highlight the h1. This panel is the browser's opinion of your file, after it has repaired what it could. If a tag you typed is missing here, the browser dropped it or moved it. Believe the panel, then fix the file. Do not argue with the panel by retyping the same broken nesting.",
        "Optional check, and a good one: copy the markup into the [W3C markup validator](https://validator.w3.org/). Paste the document. Do not upload anything that contains a real customer's phone number or address. For this practice page, there is nothing private in it. Fix errors before warnings. An unclosed tag is an error. A missing alt, once you add an image, should be treated as an error even if a tool shrugs.",
      ],
      code: [
        {
          filename: "index.html",
          language: "html",
          caption:
            "The whole practice page. The phone number and the address are fictional. Replace them only when a real client has agreed to be on the page. example.com is a reserved example address, not a shop website.",
          source: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Harbour Light Laundry — Yaba</title>
</head>
<body>
  <header>
    <p>Yaba · wash and fold</p>
    <h1>Harbour Light Laundry</h1>
  </header>

  <nav>
    <ul>
      <li><a href="#services">Services</a></li>
      <li><a href="#hours">Hours</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>

  <main>
    <section id="services">
      <h2>Services</h2>
      <p>
        Wash, dry and fold for homes and small offices around Yaba.
        You do not need an account. You need a bag, and a phone number we can reach.
      </p>
      <ul>
        <li>Wash and fold, priced per kilogram</li>
        <li>Shirts pressed, ready for the office</li>
        <li>Duvets and heavy loads, booked a day ahead</li>
      </ul>
    </section>

    <section id="hours">
      <h2>Hours</h2>
      <table>
        <caption>Shop hours</caption>
        <thead>
          <tr>
            <th scope="col">Day</th>
            <th scope="col">Open</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Monday to Friday</th>
            <td>8:00 to 19:00</td>
          </tr>
          <tr>
            <th scope="row">Saturday</th>
            <td>9:00 to 16:00</td>
          </tr>
          <tr>
            <th scope="row">Sunday</th>
            <td>Closed</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section id="contact">
      <h2>Contact</h2>
      <p>Shop 4, Sample Plaza, Yaba, Lagos.</p>
      <p>
        Call or WhatsApp
        <a href="tel:+2348000000000">0800 000 0000</a>.
        That number is a placeholder. Replace it before a real customer sees this page.
      </p>
    </section>
  </main>

  <aside>
    <h2>Today</h2>
    <p>
      If the power fails, pressing finishes when it returns.
      We will say so, rather than promise a time we cannot keep.
    </p>
  </aside>

  <footer>
    <p>Harbour Light Laundry is a practice page for this lesson. It is not a real shop.</p>
  </footer>
</body>
</html>
`,
        },
      ],
      remember:
        "One file, one h1, links that match ids, a table with headers, a footer that does not pretend the shop is real. Plain is allowed. Wrong structure is not.",
    },
    {
      heading: "How to tell that it worked",
      body: [
        "Use the page, do not only admire the file. The tab title is the shop name. The heading is the shop name. The three nav links jump to the three sections. The hours are a table, and the day names are header cells, not ordinary cells made bold. The footer is visibly not part of the sales pitch. View the source, or look at Elements, and you can find `<main>` once.",
        "Resize the browser window until it is narrow. The text should still be readable, even if the list is long and the table scrolls. You have not built a phone layout. You have included the viewport line so the phone does not shrink the page into a postage stamp. If the text is tiny on a real phone, the viewport tag is missing or mistyped. If the table is wider than the screen, that is expected today. Session 4 is where layout learns to adapt. Do not 'fix' it now by removing columns of real information.",
        "Ask someone who has not seen the file to read the page aloud from the headings only. If they can tell what the shop is and what the sections are, the outline works. If they need the paragraphs before the page makes any sense, the headings are vague. 'Section 1' is a vague heading. 'Hours' is not.",
      ],
      remember:
        "A working page survives a refresh, a second pair of eyes, and the Elements panel. A file that only looks right in the editor is not done.",
    },
    {
      heading: "When your screen does not match this lesson",
      body: [
        "Chrome, Edge and Firefox will all show this page. Default fonts and the exact blue of a link can differ. The words, the jumps, and the outline should not. If one browser shows the tags as text and another draws the page, you opened different files, not different browsers.",
        "On a Mac, the HTML does not change. Save is Command+S. Open Folder is still the right way to start. Finder may hide extensions. The file still needs to end in `.html`. If you are on a Mac and a Windows path in this lesson does not exist, match the job — show extensions, save, open in a browser — and do not hunt for a Start menu.",
        "VS Code is the assumed editor. Notepad can save HTML, and it is also the usual way to create `index.html.txt` without noticing. If you are in Notepad, turn on extensions, choose 'All files' in the save dialog, and type the name `index.html` yourself. Then move to VS Code. You will want the Elements-level feedback, and Notepad will not give it to you.",
        "A live-reload extension is optional. If Go Live fails, or the port is blocked, you have not failed the lesson. Double-click the file and refresh after each save. Write down the port only if you are asking someone for help. Do not follow a video that tells you to disable a firewall you do not understand.",
        "This page is not on the internet. Sending the HTML file to Kemi in WhatsApp may not show her a page. It may show her a document, or a download. Publishing is a later session. Until then, 'it works' means it works in a browser on the machine where the file lives.",
      ],
      remember:
        "Same HTML, different furniture. If a button is missing, do the job another way — save, then open the file in a browser — before you install a second tool.",
    },
  ],
  figures: [
    {
      id: "browser-asks",
      src: "/images/classes/web-development/browser-asks.jpg",
      alt: "Four-step diagram: browser asks, request for index.html, server or disk holds the file, browser reads the tags and draws the page.",
      caption:
        "Illustration, not a screenshot. On your laptop the file can come from a folder. On a host it comes from a server. The browser still reads tags and draws. HTML is the description, not the painting.",
      afterHeading: "What the browser is doing with the file",
    },
    {
      id: "project-folder",
      src: "/images/classes/web-development/project-folder.jpg",
      alt: "Folder tree named harbour-laundry containing index.html and an images folder with shop.jpg, plus notes about lowercase names and the .html extension.",
      caption:
        "The project folder. index.html sits next to the images folder, not inside it. Names are lowercase, with hyphens, and the page file ends in .html rather than .html.txt. A host looks for index.html by that exact name.",
      afterHeading: "Where the files live",
    },
    {
      id: "first-result",
      src: "/images/classes/web-development/first-result.jpg",
      alt: "Side-by-side illustration of HTML source on the left and a plain browser page on the right showing the laundry heading and paragraph, without visible tags.",
      caption:
        "Illustration, not a screenshot of Chrome or Edge. In the file you see tags. In the browser you should see words. If the angle brackets are visible on the page, the file was not opened as HTML.",
      afterHeading: "First success: words on a page, not tags",
    },
    {
      id: "element-anatomy",
      src: "/images/classes/web-development/element-anatomy.jpg",
      alt: "Diagram of one paragraph element split into opening name, attribute, value, content and closing name, plus a nesting diagram of body, main, h1 and p.",
      caption:
        "The parts of one element, drawn without angle brackets so the labels stay readable. In the file, the closing name is written with a slash before it. The lower diagram is nesting: h1 and p are inside main, and main is inside body. A missing closing tag makes the browser guess.",
      afterHeading: "A tag is a labelled box",
    },
    {
      id: "document-skeleton",
      src: "/images/classes/web-development/document-skeleton.jpg",
      alt: "Nested diagram of an HTML document: DOCTYPE, root with English language, head containing title, character set and viewport, and body for visible content.",
      caption:
        "The skeleton as jobs, not as a picture of your editor. Head is information and is not drawn as page content. Body is what the visitor sees. The real tags are in the code sample, which is the version to type.",
      afterHeading: "The skeleton, and the job of each line",
    },
    {
      id: "semantic-regions",
      src: "/images/classes/web-development/semantic-regions.jpg",
      alt: "Stacked wireframe labeled header, navigation, main with services and hours, aside, and footer.",
      caption:
        "The regions stacked so they can be read. This is not a layout. Aside does not have to sit on the right, and nothing here sets a colour. A div with a class called header is not the same landmark as a header element.",
      afterHeading: "Semantic regions: name the job, not the colour",
    },
  ],
  demonstration: {
    intro:
      "If you are alone, do these steps on your machine. If you are in class, watch the file be created once, then close the notes and rebuild it. The second pass is the one that counts.",
    steps: [
      {
        step: "Make the folder and show extensions",
        detail:
          "Create harbour-laundry. Turn on file name extensions in File Explorer. Create an images folder inside the project. Open the project with File → Open Folder in VS Code, not by double-clicking a future file.",
      },
      {
        step: "Create index.html in HTML mode",
        detail:
          "New file, named index.html. Confirm the status bar says HTML, not Plain Text. Save. The tab should have no unsaved dot.",
      },
      {
        step: "Type the small skeleton and open it",
        detail:
          "Type the short document from the first-success section, not the full shop page. Save. Double-click the file and confirm the tab title and the heading. If you see tags, stop and fix the file name before continuing.",
      },
      {
        step: "Change one word and refresh",
        detail:
          "Edit the paragraph, save, and refresh the browser. This proves you are looking at the file you think you are looking at.",
      },
      {
        step: "Replace the file with the full page",
        detail:
          "Use the complete index.html from the worked example. Save. Refresh. Click each navigation link and watch the page jump to the matching section.",
      },
      {
        step: "Inspect the tree",
        detail:
          "Press F12, open Elements, and find one main, one h1, and the hours table. If the panel's tree does not match the file, the browser has repaired a nesting error. Fix the file, save, and look again.",
      },
      {
        step: "Break a closing tag on purpose",
        detail:
          "Delete the closing </h2> after Hours. Save, refresh, and see what the browser does with the table. Then put the tag back. You want to have seen a repair before a repair happens to you by accident.",
      },
    ],
  },
  practice: {
    title: "The shop page, without the sample open",
    brief:
      "Close the code sample. Rebuild index.html for the same fictional shop from the outline alone: name, three sections, a list, a hours table, in-page links, a footer that says it is practice. You may reopen the sample only for a line you cannot remember, then close it again.",
    steps: [
      "Create a new folder, practice-laundry, so you are not editing the worked example in place.",
      "Write the skeleton, including charset, viewport, lang, and a real title.",
      "Add header, nav, main, one aside, and footer.",
      "Put one h1 in the header and an h2 in each section.",
      "Add a ul of three services and a table of hours with th cells.",
      "Make the nav links jump to section ids.",
      "Open the file in a browser and run the checks in 'How to tell that it worked'.",
    ],
    standard:
      "The page opens as a page, the tab title is not Document, the three links jump, and Elements shows one main. Looking plain is required, not penalised. A .txt file, a missing save, or a table with no headers does not pass.",
  },
  exercises: [
    {
      title: "Name the job",
      kind: "Recognition",
      prompt:
        "For each item, name the element you would use, and one element you would refuse. 1) The shop name. 2) A list of three services where order does not matter. 3) Opening hours by day. 4) A jump to the contact section. 5) A note about today's power cut, related to the shop but not the main pitch. 6) The box you would use if you only wanted a colour later and had no better name.",
      expected:
        "Six choices, each with a refusal. You do not answer 'div' for the first five.",
      solution:
        "1) h1, not a p made to look big, and not a second h1 later. 2) ul and li, not paragraphs that start with a dash, and not ol unless the order is a sequence. 3) table with th, not a list pretending to be columns, and not a layout table. 4) a with href=\"#contact\" and a matching id, not a button, and not 'click here'. 5) aside, not a div classed as note, and not a second main. 6) div or span, and only then. If you reached for div earlier, the outline is still in your head as decoration.",
    },
    {
      title: "Build the practice page",
      kind: "Guided",
      prompt:
        "Complete the guided practice above. When the browser is open, write down the address-bar prefix, the tab title, and whether each nav link jumped.",
      expected:
        "Address starts with file:/// or with http://127.0.0.1 and a port. Tab title is the shop name. Three jumps work. You have those three observations written down.",
      solution:
        "file:/// means you opened the file directly. http://127.0.0.1 means a local server, usually Live Server, and the port is allowed to be something other than 5500. Either prefix is a pass. https:// on this lesson means you are not looking at your file, unless you have already deployed, which this session does not ask for. A tab that says Document means the title element was left untouched or the browser is showing a different file.",
    },
    {
      title: "Same skeleton, different trade",
      kind: "Variation",
      prompt:
        "Change the practice page into a tailor, a food stall, or a phone-repair bench. Keep the same regions. Replace the services, the hours, and the h1. Do not add CSS. Keep the footer honest: this is still practice unless a real owner has agreed.",
      expected:
        "The outline is unchanged: one h1, nav, three sections or a clear equivalent, a list, a table, working jumps. The words are no longer the laundry's words.",
      solution:
        "A tailor might list adjustments, native wear, and ready-to-wear. A food stall might list what is cooked today, and the table might be market days rather than shop hours. The elements do not change because the trade changed. If you needed a new kind of tag for a new business, you probably reached for decoration. Contact can stay a paragraph. A form is the next lesson, not a requirement for this variation.",
    },
    {
      title: "Break it, then name the symptom",
      kind: "Mini-task",
      prompt:
        "On a copy of the file, do these one at a time. After each change, save, refresh, and write what you see. Then undo before the next change. 1) Rename the file so it ends in .txt. 2) Remove the closing main tag. 3) Change a nav href to #Hours while the id is hours. 4) Point an img at images/shop.jpg without putting a file there.",
      hint: "Do this on a copy. Do not debug four breaks at once.",
      expected:
        "Four notes, each describing the screen, not the theory. You restored the working file at the end.",
      solution:
        "1) The browser shows the tags as text, or downloads the file, or opens it in an editor. The extension is the cause. Rename it back to .html. 2) Elements will show the browser repairing the tree. The visible page may swallow the footer into the main content. Put the closing tag back and look at Elements again. 3) The Hours link jumps to the top or does nothing useful, because ids are case-sensitive. Match the characters. 4) A broken-image mark and, if alt is present, the description. The tag can be right while the file is absent. That is a path problem, not a tag-name problem.",
    },
    {
      title: "A div page that looks the same",
      kind: "Challenge",
      prompt:
        "Someone sends you a page built only from div and span, plus a stylesheet that makes it look like a shop. You are not allowed to keep the stylesheet. Rewrite the structure as semantic HTML so the outline still works with the stylesheet deleted. You do not have to reproduce their colours.",
      expected:
        "A file with no stylesheet, one h1, landmarks, a real list, and link text that still makes sense. You can explain one thing the div page could not tell a screen reader.",
      solution:
        "Replace the nameless boxes with header, nav, main, section, footer. Replace dash-paragraphs with a ul. Replace a bold first row with th. The thing a div page cannot say is which region is navigation and which is the subject of the page, unless the class names happen to be read — and class names are not the landmark contract. If your rewrite needs the stylesheet before the hours make sense, the hours were trapped in the design. Put them back in the HTML.",
    },
  ],
  pitfalls: [
    {
      problem: "The page shows the tags, including the angle brackets",
      fix: "The browser is not reading it as HTML. Turn on file name extensions. If the file is index.html.txt, rename it to index.html. Then open it in Chrome or Edge, not in VS Code, and not in WhatsApp's preview.",
    },
    {
      problem: "You changed the heading and the browser still shows the old words",
      fix: "Look at the VS Code tab. A dot means unsaved. Ctrl+S, then refresh the browser. Confirm the address bar is the same folder you edited. It is common to edit practice-laundry and refresh harbour-laundry.",
    },
    {
      problem: "The tab still says Document",
      fix: "You changed the h1 and not the title, or Emmet inserted title Document and you left it. The tab reads the title element in the head. They are allowed to match. They are not the same tag.",
    },
    {
      problem: "You used h1 for every heading because you wanted them large",
      fix: "Put the shop name in the only h1. Put Services, Hours and Contact in h2. Leave the size alone. Session 3 changes size without lying about rank.",
    },
    {
      problem: "The Hours link does not jump to Hours",
      fix: "Compare href and id, including capitals. #hours does not find id=\"Hours\". The id goes on the section or the heading, and it must be unique on the page.",
    },
    {
      problem: "You built spacing with empty paragraphs and br tags",
      fix: "Delete them. A paragraph contains words. A line break is for a line inside one block, such as an address. Gap between sections is CSS. Empty elements are not a design.",
    },
    {
      problem: "The picture works on your laptop and you are sure it will work on the host",
      fix: "Check the exact characters of the file name against src. Windows often hides case differences. A host often will not. Keep the image next to the path you wrote, inside the project, not on the desktop.",
    },
  ],
  troubleshooting: [
    {
      symptom: "You double-clicked the file and an editor opened, or you see the raw tags.",
      likelyCause:
        "The file is not named as HTML, or the system is set to open .html in an editor, or you are looking at the editor and calling it the page.",
      check:
        "Turn on extensions. Read the full file name. Look at the address bar of whatever window is in front of you. A page has a browser address. An editor has a tab and a save dot.",
      fix: "Rename to index.html if needed. Right-click the file, choose Open with, and pick Chrome or Edge. You can set the browser as the default later. Do not rename the file to .docx or .pdf to make it 'easier to send'.",
      prevention:
        "Extensions stay visible. Every page in this course is named .html in lowercase before you add content, not after you have debugged the wrong file.",
      whenToStop:
        "The name is exactly index.html, Open with still shows tags inside a browser address bar, and a brand-new two-line file does the same. That is unusual. Show the file name and the address bar to someone else before you reinstall the editor.",
    },
    {
      symptom: "The browser window is blank.",
      likelyCause:
        "The body is empty, you saved before typing, the file you opened is a different empty file, or a broken tag caused the browser to hide more than you expected.",
      check:
        "View page source, or the Elements panel. Is there a body with content? Does the tab title match your title element? Is the path in the address bar the folder you edited?",
      fix: "Point the browser at the file you saved. If source shows content and the page is white, a CSS file you linked may be painting everything white — this lesson should not link a stylesheet. Remove any link or style you added early. If source is empty, the save did not go where you think.",
      prevention: "Keep one project folder. Do not keep final.html, final2.html and index.html all open and guess which one the browser has.",
      whenToStop:
        "Source shows the full page and the visible window is still blank in two browsers. Copy the source into the W3C validator and read the first error before you rewrite the page from scratch.",
    },
    {
      symptom: "A navigation click jumps to the top, or does nothing.",
      likelyCause:
        "The href and the id do not match, the id is missing, or two elements share an id and the browser stopped at the first.",
      check:
        "In Elements, search for the id. Count how many times it appears. Compare it with the href, including the hash and the capital letters.",
      fix: "Make one matching pair. ids on a page must be unique. Use lowercase.",
      prevention:
        "Write the id first, then copy it into the href. Do not retype it.",
      whenToStop:
        "The id is unique, the characters match, and the click still does not move. Say which browser, and whether the address bar gains the #hours fragment. That detail is the useful bug report.",
    },
    {
      symptom: "The image shows a broken icon.",
      likelyCause:
        "The file is not at that path, the name differs by case or extension, or the HTML file and the images folder are not neighbours.",
      check:
        "In File Explorer, stand in the same folder as index.html. Can you open images, then shop.jpg, from there? Does the src string, character for character, match that location?",
      fix: "Move the file or fix the src until a person could follow the path with no extra knowledge. Keep alt text so the failure still says what the picture was.",
      prevention:
        "Save images into the project at the moment you download them. Do not link to a path under Downloads or to a picture that only exists on your phone.",
      whenToStop:
        "The file opens when you double-click it, the relative path matches, and the page still shows a broken icon. Try the page through Live Server rather than file:///. Some browsers are stricter about local files. If both fail, the src is still wrong in a way the eye skipped. Have someone else read the path aloud.",
    },
    {
      symptom: "₦ or a name with an accent looks corrupted.",
      likelyCause:
        "The charset meta tag is missing, or the file was saved in an encoding other than UTF-8.",
      check:
        "Is `<meta charset=\"UTF-8\">` in the head, near the top? In VS Code, the status bar often shows the encoding. UTF-8 is what you want.",
      fix: "Add the meta tag. In VS Code, click the encoding in the status bar and save as UTF-8 if it says something else. Reload the browser.",
      prevention: "The skeleton includes charset before you type any non-English character. Do not delete it when you clean the file up.",
      whenToStop:
        "The file is UTF-8, the meta tag is present, and another browser still corrupts the character. Copy the smallest file that fails into a new folder and test again before you blame the font.",
    },
    {
      symptom: "On a phone, the page is a tiny shrunken desktop.",
      likelyCause: "The viewport meta tag is missing or mistyped.",
      check: "Search the head for the word viewport. Compare it with the skeleton. A missing comma or a misspelled device-width is enough.",
      fix: "Paste the viewport tag from the worked example. Save, and reload on the phone. Sending yourself the file is a poor test if the phone does not open it as a page. Use the laptop browser's device toolbar only as a hint — F12, then the device icon. It is not a real phone.",
      prevention: "Treat viewport as part of the skeleton, like the title. It is not an optional mobile extra.",
      whenToStop:
        "The tag matches the example and a real phone still shrinks the page. Confirm the phone is opening this file and not a cached copy of an older one. Publishing and cache are later problems. Do not add three viewport tags to 'force' it.",
    },
    {
      symptom: "Go Live is not on the status bar.",
      likelyCause:
        "You opened a single file instead of the folder, the extension is not installed, or the status-bar item is hidden.",
      check:
        "Does the Explorer show the folder harbour-laundry, or only one file? Is Live Server listed under installed extensions? Right-click the status bar. Is Live Server unticked?",
      fix: "File → Open Folder. Install one live-reload extension if none is installed. Enable it on the status bar. Then Go Live, or right-click the HTML file and choose Open with Live Server.",
      prevention:
        "Open the folder at the start of every session. The extension is optional. If it costs you more than ten minutes, drop it and use the browser's refresh.",
      whenToStop:
        "The folder is open, the extension is installed, and there is still no command. Use double-click and F5. Do not spend the lesson on the tool. Note it and ask in class with a screenshot of the Extensions panel.",
    },
  ],
  safetyNotes: [
    "Harbour Light Laundry is not a real business. The phone number 0800 000 0000 and Shop 4, Sample Plaza are placeholders. Do not print them on a flyer, and do not replace them with a real person's number unless they have agreed to be contacted that way.",
    "example.com is reserved for examples. Linking a customer there is not a soft launch. It is a wrong address.",
    "Do not put passwords, API keys, or a client's private documents in an HTML file. HTML is sent to the browser. Anything in it should be something a visitor is allowed to see.",
    "An HTML file from a stranger can contain script. Do not open attachments from people you do not know as a way to 'see how they did the tags'. For study, use your own file, MDN, and the validator.",
    "This lesson does not publish the page. A file that works on your laptop is not a URL. Do not take payment from a client for a launched site until a later session has put it on a host you can name.",
  ],
  expertNotes: [
    "The Elements panel is the page the browser believes it has, after repairs. Read it when the drawing and the file disagree. Arguing with the drawing is how an hour disappears.",
    "Lowercase tags, quoted attributes, and lowercase file names are habits, not laws of HTML. HTML tags are case-insensitive. Hosts' file names often are not. The habit is cheaper than the exception.",
    "One h1 and a honest title will do more for a small business page than a logo image with no text. The logo can arrive with CSS and a real photograph. The name has to be text from the first commit.",
    "When you are tempted to add style attributes so the page looks presentable in class, don't. A tutor can see structure in a plain page. A styled div page hides the thing this session exists to teach.",
    "The W3C validator is a second pair of eyes, not a score. Fix the first error, then validate again. Later errors are often the first error in disguise.",
  ],
  vocabulary: [
    { term: "HTML", meaning: "The language that describes the structure and meaning of a page. Not the styling, and not the behaviour." },
    { term: "Browser", meaning: "The program that reads HTML and draws the page. Chrome, Edge and Firefox are browsers. The editor is not." },
    { term: "Element", meaning: "One piece of the page: an opening tag, its content, and usually a closing tag. p, h1, a, img are elements." },
    { term: "Attribute", meaning: "A fact written in the opening tag, such as href, src, alt, id or lang." },
    { term: "Head / body", meaning: "Head is about the page and is not drawn as content. Body is what the visitor sees. The title lives in the head and shows in the tab." },
    { term: "Semantic element", meaning: "An element whose name says what the region is: header, nav, main, section, aside, footer. A div does not say." },
    { term: "Relative path", meaning: "A path from this file to another file in the project, such as images/shop.jpg. It is not a full web address." },
    { term: "id", meaning: "A name unique on the page, used as the target of a # link. Case-sensitive. Do not use the same id twice." },
  ],
  homework: [
    {
      task: "Rebuild the skeleton from memory",
      detail:
        "Later today, with the sample closed, create a new folder and write a valid skeleton: doctype, html with lang, charset, viewport, a title that is not Document, and a body with one h1. Open it in a browser. If you have to look one line up, look, then type the line yourself.",
    },
    {
      task: "Outline a real noticeboard",
      detail:
        "Pick a real shop, church group, or stall you are allowed to describe. Write the outline only — h1 and h2s — for a one-page site. Do not publish it. Bring the outline to the next session. We will turn one of them into a form.",
    },
    {
      task: "One validator pass",
      detail:
        "Paste your practice page into the W3C validator. Fix the first error. Validate again. Write down the error text you fixed, in the validator's words, so you can recognise it next time.",
    },
  ],
  mastery: [
    "I can say what HTML describes, and what it does not describe.",
    "I can create index.html in a folder, with the extension visible, and open it in a browser.",
    "I know the difference between the editor and the page.",
    "The tab title is a title I wrote, not Document.",
    "I use one h1, and section headings are h2.",
    "My navigation links jump to matching ids.",
    "A list is a ul or ol, and a hours table has header cells.",
    "I can point to header, nav, main and footer and say why they are not divs.",
    "I can explain a broken image as a path problem, and tags-on-the-page as a file-name problem.",
    "I have not published a fictional shop as if it were real.",
  ],
  rubric: [
    {
      criterion: "File and browser",
      passing: "index.html opens in a browser as a page, not as raw tags.",
      excellent: "Also explains file:/// versus a local server address, and can recover from an unsaved tab without help.",
    },
    {
      criterion: "Skeleton",
      passing: "Doctype, lang, charset, viewport and a real title are present.",
      excellent: "Can say what fails for a screen reader or a phone if lang or viewport is removed.",
    },
    {
      criterion: "Outline",
      passing: "One h1, logical h2 sections, a list, and a data table with headers.",
      excellent: "Navigation jumps work, link text stands alone, and the footer does not pretend the practice shop is real.",
    },
    {
      criterion: "Semantics",
      passing: "Uses header, nav, main and footer for those jobs.",
      excellent: "Can say why a div with a class is not a landmark, and does not wrap every section in article.",
    },
    {
      criterion: "Diagnosis",
      passing: "Fixes a wrong extension or a mismatched id with a prompt.",
      excellent: "Uses Elements or the validator, and separates a path error from a tag error without replacing the whole file.",
    },
  ],
  faqs: [
    {
      q: "Why does the page look like a document from 1998?",
      a: "Because you have not written CSS, and the browser's defaults are plain on purpose. That is a finished session-1 page. If it looked designed, we would not be able to see whether the structure was honest. Session 3 starts the visual work. Adding style attributes today trains the wrong reflex.",
    },
    {
      q: "Can I use Notepad instead of VS Code?",
      a: "You can save an HTML file from Notepad if you show extensions and choose All files in the save dialog. You will fight the tool for the rest of the course. Install VS Code. The HTML you type does not change.",
    },
    {
      q: "Do I need the internet to see my page?",
      a: "Not after the editor is installed, if you open the file directly. The browser reads the folder. You need the network to install VS Code, to install a live-reload extension, and to open MDN or the validator. The page itself is not online.",
    },
    {
      q: "Is this enough HTML to get a junior role?",
      a: "No. It is enough to stop producing files that only work by accident. The course still has forms, CSS, JavaScript, a project, and deployment. Employers and clients ask to click the page, not to hear the definition. This session is the first file you can click.",
    },
    {
      q: "What if my client already has a logo and brand colours?",
      a: "Put the name in text anyway. Note the colours on paper for session 3. Do not set them in HTML, and do not build the heading out of the logo image. A logo that is the only copy of the name fails the moment the image does not load.",
    },
    {
      q: "The validator warned me and I do not understand the sentence.",
      a: "Copy the first error, not the tenth. Search that sentence on MDN or bring it to class with the line number. Do not 'fix' it by deleting the doctype or the lang attribute to make the count drop. Those are not the problem.",
    },
  ],
  sources: [
    {
      title: "MDN: the html element",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/html",
      note: "Checked 26 September 2026. Confirms one html element as the root, and that lang should name the language of most of the page so screen readers pronounce it properly. The sample doctype there is lowercase. Both cases are valid.",
    },
    {
      title: "HTML living standard: the html element",
      url: "https://html.spec.whatwg.org/multipage/semantics.html#the-html-element",
      note: "The specification MDN points at. Use it when a tutorial and the browser disagree. You do not need to read the whole standard to finish this lesson.",
    },
    {
      title: "MDN: HTML",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
      note: "The index for elements used here — headings, anchors, images, lists, tables, and sectioning elements. Prefer this over a video when a tag's rules surprise you.",
    },
    {
      title: "W3C markup validator",
      url: "https://validator.w3.org/",
      note: "Paste the practice document. Do not upload a file that contains a real customer's private details. Fix the first error, then run it again.",
    },
    {
      title: "Visual Studio Code",
      url: "https://code.visualstudio.com/",
      note: "The editor this lesson assumes. Live Server is a separate extension, not part of the VS Code download. If the marketplace listing changes, choose a single extension that reloads the browser on save, and skip it if it costs the lesson.",
    },
  ],
};
