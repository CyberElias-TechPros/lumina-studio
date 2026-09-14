import type { AcademyCourse, ClassSession } from "./types";

/** Builds a session record; lectures are attached separately in ./lessons. */
function s(
  number: number,
  week: number,
  title: string,
  slug: string,
  topics: string[],
  minutes = 105,
): ClassSession {
  return { number, week, title, slug, topics, minutes };
}

export const microsoftOffice: AcademyCourse = {
  slug: "microsoft-office",
  title: "Microsoft Office",
  fee: 15000,
  weeks: 3,
  sessionsPerWeek: 2,
  level: "Absolute beginner",
  category: "Office & Data",
  hook: "Documents, spreadsheets and presentations you can actually produce.",
  goal: [
    "Take a beginner from knowing little or nothing about productivity software to being able to create useful documents, spreadsheets and presentations without help.",
    "Office skills are the quiet gatekeeper of Nigerian employment. Almost every clerical, administrative, sales, logistics, church-office and small-business role in the country asks for 'knowledge of Microsoft Word and Excel', and most applicants cannot produce a clean document or a working total when asked. This course fixes that in three weeks of hands-on practice.",
  ],
  audience: [
    "Students and graduates preparing for NYSC, internship or office work",
    "Church, school and NGO administrators who already produce documents",
    "Entrepreneurs who need to invoice, quote and present without hiring anyone",
    "Complete beginners who have never opened Word or Excel",
  ],
  requirements: [
    "A laptop, or a seat at one of the academy's practice machines",
    "Microsoft Office (Word, Excel, PowerPoint) — free trial or academy licence",
    "No prior computer experience required",
  ],
  outcomes: [
    "Produce a professionally formatted business document from a blank page",
    "Build a working spreadsheet with formulas, sorting and charts",
    "Design and deliver a 5–7 slide presentation from scratch",
    "Export, print and share work in the formats employers expect",
  ],
  deliverable: {
    title: "A formatted document, a working spreadsheet and a presentation",
    detail:
      "You leave with a CV or business letter exported to PDF, an expense or sales sheet with live formulas and a chart, and a 5–7 slide presentation you have presented aloud to the class.",
  },
  weekOutline: [
    {
      week: 1,
      theme: "Microsoft Word",
      summary:
        "The interface, creating and saving documents, then the full formatting toolkit that separates a school assignment from a business document.",
    },
    {
      week: 2,
      theme: "Professional Word + Excel fundamentals",
      summary:
        "Layout, tables, headers, printing and PDF export — then the spreadsheet mental model: cells, references, formats and the five formulas that do most real work.",
    },
    {
      week: 3,
      theme: "Practical Excel + PowerPoint",
      summary:
        "Sorting, filtering, percentages and charts, then building and delivering a presentation that holds a room.",
    },
  ],
  sessions: [
    s(1, 1, "Word Fundamentals", "word-fundamentals", [
      "What Microsoft Word is used for",
      "Opening Word",
      "Understanding the interface",
      "Ribbon and tabs",
      "Document area",
      "Status bar",
      "Zoom",
      "Creating a document",
      "Saving a document",
      "Save As",
      "File formats",
      "Opening existing documents",
      "Closing documents",
      "Creating folders",
      "Basic keyboard shortcuts",
      "Selecting text",
      "Copy, cut and paste",
      "Undo and redo",
    ]),
    s(2, 1, "Document Formatting", "document-formatting", [
      "Fonts",
      "Font size",
      "Bold, italic and underline",
      "Text colour",
      "Highlighting",
      "Alignment",
      "Line spacing",
      "Paragraph spacing",
      "Indentation",
      "Bullets",
      "Numbering",
      "Borders",
      "Page colour",
      "Format Painter",
      "Find and Replace",
    ]),
    s(3, 2, "Professional Documents", "professional-documents", [
      "Page size",
      "Margins",
      "Orientation",
      "Headers",
      "Footers",
      "Page numbers",
      "Tables",
      "Images",
      "Shapes",
      "Text boxes",
      "Hyperlinks",
      "Simple certificates",
      "Letters",
      "CV structure",
      "Printing",
      "PDF export",
    ]),
    s(4, 2, "Excel Fundamentals", "excel-fundamentals", [
      "Workbook vs worksheet",
      "Rows",
      "Columns",
      "Cells",
      "Cell references",
      "Data entry",
      "Editing data",
      "Formatting cells",
      "Number formats",
      "Dates",
      "Currency",
      "Borders",
      "Column widths",
      "Row heights",
      "Basic formulas",
      "SUM",
      "AVERAGE",
      "MIN",
      "MAX",
      "COUNT",
    ]),
    s(5, 3, "Practical Excel", "practical-excel", [
      "Sorting",
      "Filtering",
      "Tables",
      "Basic percentages",
      "Simple calculations",
      "Relative references",
      "Basic charts",
      "Bar charts",
      "Pie charts",
      "Line charts",
      "Printing spreadsheets",
    ]),
    s(6, 3, "PowerPoint", "powerpoint", [
      "Creating presentations",
      "Slides",
      "Layouts",
      "Themes",
      "Text",
      "Images",
      "Shapes",
      "Icons",
      "Transitions",
      "Animations",
      "Speaker notes",
      "Presentation mode",
      "Basic presentation design",
    ]),
  ],
  faqs: [
    {
      q: "I have never used a computer before. Is this course too advanced for me?",
      a: "No. Session one starts at opening the application and naming the parts of the screen. The only prerequisite is willingness to practise. Learners with no prior computer experience normally finish this course comfortably; if you have never used a mouse and keyboard at all, take Typing & Computer Basics first and move into this course in the next rotation.",
    },
    {
      q: "Do I need to buy Microsoft Office?",
      a: "You need access to Word, Excel and PowerPoint for the sessions and for homework. You can use a free trial, a school or workplace licence, or the academy's practice machines during class hours. Web versions at office.com work for most exercises, though a few formatting features behave slightly differently from the desktop app and we point those out in class.",
    },
    {
      q: "Is this the same as learning Google Docs and Sheets?",
      a: "The ideas transfer almost completely — documents, spreadsheets, formatting, formulas — but Nigerian employers, schools and government offices overwhelmingly send and expect .docx and .xlsx files, which is why the course is taught in Microsoft Office. We show you where the equivalent lives in Google Workspace so you are not stranded when a client works there.",
    },
    {
      q: "What exactly do I take home at the end?",
      a: "Three files that belong to you: a formatted CV or business letter exported to PDF, a spreadsheet with working formulas and at least one chart, and a presentation you have delivered. That is the certificate requirement, and it is also the evidence you attach to job applications.",
    },
    {
      q: "How are the two sessions per week scheduled?",
      a: "Two practical sessions per week, each 1.5–2 hours depending on the timetable you join. Sessions are consecutive in skill — session two builds directly on session one — so if you miss one, tell the instructor before the next class and you will be given the demonstration recording and the practice brief to catch up.",
    },
    {
      q: "Will this help me get a job?",
      a: "On its own, Office skills are entry-level, but they are the specific entry-level requirement in most Nigerian administrative, sales-support and clerical job adverts. What actually gets you the interview is being able to demonstrate the skill immediately: a CV you typeset yourself, a reconciliation sheet you built, a proposal deck you designed. That is why the course ends in artefacts rather than a written test.",
    },
  ],
};

export const computerBasicsTyping: AcademyCourse = {
  slug: "computer-basics-typing",
  title: "Typing & Computer Basics",
  fee: 10000,
  weeks: 2,
  sessionsPerWeek: 2,
  level: "Absolute beginner",
  category: "Office & Data",
  hook: "Go from nervous around a computer to independently confident with one.",
  goal: [
    "Give a complete beginner confidence using a computer — turning on and off correctly, managing files, using the internet safely, creating and using email, and typing at a speed that makes every other course possible.",
    "This is the on-ramp course. Every other practical skill on this page assumes you can sit down at a machine, find a file, download something without breaking it and send an email with an attachment. Four sessions remove that fear permanently.",
  ],
  audience: [
    "Complete beginners of any age who have never used a computer",
    "Parents and older learners returning to work or study",
    "Students who use a phone daily but have never used a desktop workflow",
    "Anyone who is 'scared of breaking it' and needs supervised practice",
  ],
  requirements: [
    "A practice machine at the academy (no laptop needed to enrol)",
    "Comfortable clothing for long typing sessions",
    "No prior knowledge of any kind",
  ],
  outcomes: [
    "Use a computer independently: power, login, windows and applications",
    "Create, name, organise, move and back up files and folders",
    "Search the internet effectively and download safely",
    "Create and use an email account with attachments and online forms",
    "Type with the correct finger placement and measurable speed",
  ],
  deliverable: {
    title: "Demonstrated independence",
    detail:
      "You finish by performing a set of computer tasks on your own — create a folder, save a document into it, find a file online, download it, attach it to an email and send it — while the instructor observes and signs off. No prompts, no help.",
  },
  weekOutline: [
    {
      week: 1,
      theme: "The machine and the hands",
      summary:
        "What the hardware is and what it does, correct power and login procedure, the desktop environment, then keyboard and mouse control with typing drills.",
    },
    {
      week: 2,
      theme: "Files, internet and digital independence",
      summary:
        "File and folder management, safe downloading and searching, then email, forms, online meetings, cloud storage and scam awareness — ending in an unaided practical.",
    },
  ],
  sessions: [
    s(1, 1, "Understanding the Computer", "understanding-the-computer", [
      "What a computer is",
      "Desktop vs laptop",
      "Monitor",
      "Keyboard",
      "Mouse",
      "CPU/system unit",
      "USB ports",
      "Printer",
      "Speakers",
      "Webcam",
      "Power supply",
      "Turning computer on/off correctly",
      "Login",
      "Desktop",
      "Taskbar",
      "Start menu",
      "Windows",
      "Applications",
    ]),
    s(2, 1, "Keyboard & Mouse", "keyboard-and-mouse", [
      "Left/right click",
      "Double click",
      "Drag and drop",
      "Scroll",
      "Keyboard layout",
      "Letters",
      "Numbers",
      "Function keys",
      "Shift",
      "Caps Lock",
      "Ctrl",
      "Alt",
      "Enter",
      "Backspace",
      "Delete",
      "Spacebar",
      "Arrow keys",
      "Home/End",
      "Basic shortcuts",
      "Typing drills",
    ]),
    s(3, 2, "Files & Internet", "files-and-internet", [
      "Files",
      "Folders",
      "Creating folders",
      "Renaming",
      "Moving",
      "Copying",
      "Deleting",
      "Recycle Bin",
      "USB drives",
      "Downloads",
      "Uploads",
      "Browser basics",
      "Search engines",
      "Searching effectively",
      "Downloading safely",
      "Uploading files",
      "Email basics",
    ]),
    s(4, 2, "Digital Independence", "digital-independence", [
      "Creating an email",
      "Sending email",
      "Attachments",
      "Downloading attachments",
      "Basic online forms",
      "Online meetings",
      "Basic cloud storage",
      "Digital safety",
      "Password awareness",
      "Scam awareness",
    ]),
  ],
  faqs: [
    {
      q: "Am I too old for this course?",
      a: "No. Our oldest students are in their sixties and seventies, and they usually finish this course faster than they expected because the material is practical rather than theoretical. The only thing that matters is that you get supervised time on a machine, which is exactly what the sessions provide.",
    },
    {
      q: "Do I need my own laptop?",
      a: "Not for this course. Practice happens on academy machines during the sessions, and the typing drills can be done on any keyboard. If you plan to continue into Microsoft Office, Graphic Design or Web Design, you will want your own machine or reliable access to one from week one of that course.",
    },
    {
      q: "How fast will I be able to type by the end?",
      a: "Two weeks establishes correct finger placement and home-row habit, which is the part that cannot be self-taught reliably. Most learners leave typing accurately at 15–25 words per minute and continue improving on their own afterwards. Reaching 40+ wpm typically takes another month of daily 15-minute drills, and we give you the drill plan to do it.",
    },
    {
      q: "Will you teach me how to use a smartphone too?",
      a: "The course is built around a computer because file management, typing and desktop workflow are the transferable skills. However the email, cloud storage, scam-awareness and online-form sessions apply directly to phones, and we cover the phone equivalents as we go so you are not left translating on your own.",
    },
  ],
};

export const dataEntry: AcademyCourse = {
  slug: "data-entry",
  title: "Data Entry",
  fee: 10000,
  weeks: 2,
  sessionsPerWeek: 2,
  level: "Beginner",
  category: "Office & Data",
  hook: "Accuracy first: handle real business data without introducing errors.",
  goal: [
    "Teach accurate digital data handling, not merely typing. Data entry is a paid, in-demand remote and office skill in Nigeria — but clients pay for clean data, and a single misplaced digit in an invoice, payroll or inventory sheet costs real money.",
    "This course trains the discipline: field types, validation, transcription from paper and images, naming conventions, duplicate removal and error checking — finishing with a timed accuracy test on a realistic dataset.",
  ],
  audience: [
    "People targeting remote data-entry and virtual-assistant work",
    "Office staff who currently retype information by hand",
    "Shop, clinic, school and warehouse record keepers",
    "Anyone who wants a low-barrier first paid digital skill",
  ],
  requirements: [
    "Access to a computer and Microsoft Excel or Google Sheets",
    "Basic keyboard familiarity (Typing & Computer Basics helps but is not mandatory)",
    "Attention and patience — accuracy is the whole point",
  ],
  outcomes: [
    "Enter and validate data at professional accuracy rates",
    "Structure a spreadsheet so it stays usable as it grows",
    "Sort, filter, de-duplicate and clean a messy dataset",
    "Name and organise files so a client can find anything instantly",
    "Produce a short, honest accuracy and progress report",
  ],
  deliverable: {
    title: "A cleaned and organised dataset",
    detail:
      "You receive a realistic raw dataset — inconsistent names, mixed date formats, duplicates, missing values — and hand back a cleaned, validated, properly formatted spreadsheet with a summary sheet, plus your measured accuracy and speed figures.",
  },
  weekOutline: [
    {
      week: 1,
      theme: "Data, fields and spreadsheets",
      summary:
        "What data entry actually means professionally, data types and field discipline, then spreadsheet structure, formatting and the sorting/filtering/de-duplication tools.",
    },
    {
      week: 2,
      theme: "Transcription, validation and speed",
      summary:
        "Accurate copying and transcription, form entry, file naming and organisation, validation and error checking, then the graded accuracy and speed practical.",
    },
  ],
  sessions: [
    s(1, 1, "Data Discipline", "data-discipline", [
      "What data entry means",
      "Data types",
      "Accuracy",
      "Speed",
      "Attention to detail",
      "Data fields",
      "Forms",
      "Tables",
      "Spreadsheets",
    ]),
    s(2, 1, "Spreadsheets for Data Work", "spreadsheets-for-data-work", [
      "Excel/Google Sheets",
      "Rows",
      "Columns",
      "Data formatting",
      "Dates",
      "Names",
      "Phone numbers",
      "Addresses",
      "Sorting",
      "Filtering",
      "Removing duplicates",
    ]),
    s(3, 2, "Transcription & Validation", "transcription-and-validation", [
      "Copying data accurately",
      "Transcription basics",
      "Form entry",
      "Online forms",
      "File naming",
      "Folder organization",
      "Data validation",
      "Error checking",
    ]),
    s(4, 2, "Accuracy & Speed Practical", "accuracy-and-speed-practical", [
      "Practical data-entry exercise",
      "Accuracy test",
      "Speed test",
      "Spreadsheet cleanup",
      "Basic reporting",
    ]),
  ],
  faqs: [
    {
      q: "Is data entry still a real job with AI around?",
      a: "Yes, but the shape has changed. Pure retyping of clean documents is being automated. What still pays is the messy middle: reconciling two systems that disagree, cleaning historical records, verifying entries against source documents, and owning a register that a business depends on. This course teaches the verification and cleaning half, which is the half that survives automation.",
    },
    {
      q: "What accuracy rate counts as professional?",
      a: "For general business data, 98% field accuracy is the working minimum and 99.5%+ is what makes a client keep you. Financial fields — amounts, account numbers, invoice references — should be at 100% because a single error can move money. We test at those thresholds and show you how to structure work so errors get caught before delivery.",
    },
    {
      q: "Can I take this course if my typing is slow?",
      a: "Yes. Slow but accurate beats fast and wrong every time in this work, and speed improves with the drills. If your typing is very slow, taking Typing & Computer Basics first will make the timed practical in session four far more comfortable.",
    },
    {
      q: "Will I learn Excel properly?",
      a: "You learn the parts of Excel that data work depends on: structure, formatting, sorting, filtering, duplicates, validation and basic summary formulas. That is a working foundation, not the full Microsoft Office course, which goes further into charts, presentation and document production.",
    },
  ],
};

export const graphicDesign: AcademyCourse = {
  slug: "graphic-design",
  title: "Graphic Design",
  fee: 20000,
  weeks: 4,
  sessionsPerWeek: 2,
  level: "Beginner",
  category: "Creative & Media",
  hook: "Learn design decisions, not just Canva buttons.",
  goal: [
    "Teach learners to create useful visual designs rather than simply teaching them how to use Canva or another tool. The tool changes every year; the decisions about hierarchy, contrast, spacing and typography do not.",
    "You start with design foundations because that is what separates a flyer people act on from a flyer people scroll past. Then the tool, then real Nigerian commercial work — church graphics, event flyers, Instagram posts, business cards — and finally the client workflow: briefs, corrections, revisions, exports.",
  ],
  audience: [
    "Beginners with an eye for visuals and no formal training",
    "Church, school and event organisers who design their own materials",
    "Small business owners handling their own branding",
    "Social media managers who need to produce their own graphics",
  ],
  requirements: [
    "A laptop or tablet, or an academy machine",
    "A free Canva account (the academy uses the free tier throughout)",
    "A phone camera for sourcing your own photographs",
  ],
  outcomes: [
    "Judge and fix layout, hierarchy, contrast and spacing on sight",
    "Choose typefaces, pair them and set text that reads well",
    "Produce flyers, posters, social posts, cards and certificates to print and digital spec",
    "Run a client job from brief to export, including revisions",
  ],
  deliverable: {
    title: "A mini brand package",
    detail:
      "A logo, a flyer, a social media post and a business card for one fictional or real business, presented together with the design brief you were given and the corrections you handled.",
  },
  weekOutline: [
    {
      week: 1,
      theme: "Design foundations",
      summary:
        "Visual communication, purpose, audience, layout, alignment, balance, contrast, hierarchy and white space — then colour theory, typography and image selection.",
    },
    {
      week: 2,
      theme: "The design tool",
      summary:
        "Canva from templates and custom dimensions through to layers, alignment, effects, background removal and setting up brand colours and fonts.",
    },
    {
      week: 3,
      theme: "Real-world design",
      summary:
        "Business and promotional flyers, social formats, church and event graphics, then posters, business cards, invitations, certificates, simple logos and product ads.",
    },
    {
      week: 4,
      theme: "Professional workflow",
      summary:
        "Briefs, corrections, revisions, file organisation, export formats and print versus digital — then the final brand package project.",
    },
  ],
  sessions: [
    s(1, 1, "Design Foundations I — Seeing", "design-foundations-seeing", [
      "What graphic design is",
      "Types of graphic design",
      "Visual communication",
      "Design purpose",
      "Target audience",
      "Layout",
      "Alignment",
      "Balance",
      "Contrast",
      "Hierarchy",
      "White space",
    ]),
    s(2, 1, "Design Foundations II — Colour & Type", "design-foundations-colour-type", [
      "Colour theory",
      "Colour combinations",
      "Typography",
      "Font categories",
      "Font pairing",
      "Visual hierarchy",
      "Image selection",
      "Resolution",
      "Aspect ratios",
    ]),
    s(3, 2, "The Tool — Canva Interface", "canva-interface", [
      "Canva/interface",
      "Templates",
      "Custom dimensions",
      "Elements",
      "Text",
      "Images",
      "Uploads",
      "Backgrounds",
      "Shapes",
      "Icons",
    ]),
    s(4, 2, "The Tool — Layers & Brand", "layers-and-brand", [
      "Layers",
      "Positioning",
      "Alignment",
      "Transparency",
      "Grouping",
      "Cropping",
      "Effects",
      "Background removal",
      "Brand colours",
      "Brand fonts",
    ]),
    s(5, 3, "Real-World Design I — Flyers & Social", "flyers-and-social", [
      "Business flyers",
      "Promotional flyers",
      "Social media posts",
      "Instagram formats",
      "Facebook formats",
      "WhatsApp graphics",
      "Church/event graphics",
    ]),
    s(6, 3, "Real-World Design II — Print & Identity", "print-and-identity", [
      "Posters",
      "Business cards",
      "Invitations",
      "Certificates",
      "Simple logos",
      "Product advertisements",
    ]),
    s(7, 4, "Professional Workflow", "professional-workflow", [
      "Client requirements",
      "Design brief",
      "Receiving corrections",
      "Revision workflow",
      "File organization",
      "Export formats",
      "PNG",
      "JPG",
      "PDF",
      "Print vs digital design",
    ]),
    s(8, 4, "Final Project — Mini Brand Package", "mini-brand-package", [
      "Logo",
      "Flyer",
      "Social media post",
      "Business card",
      "Presentation of the package",
      "Handling live critique",
    ]),
  ],
  faqs: [
    {
      q: "Is this a Canva course?",
      a: "Canva is the tool we use because it is free, fast and used commercially across Nigeria, but the course is taught as design. Two of the eight sessions are pure foundations with no software open, and every project is critiqued on hierarchy, contrast, spacing and typographic decisions — not on which template you picked.",
    },
    {
      q: "Do I need to be able to draw?",
      a: "No. Almost none of the work in this course involves illustration. It involves arranging type, images and colour so a message lands, which is a learnable skill with rules you can check.",
    },
    {
      q: "Will I learn Photoshop or CorelDRAW?",
      a: "This course uses Canva, which covers the majority of the graphic work Nigerian small businesses commission. Photoshop and CorelDRAW are the natural next step for logo construction, photo retouching and large-format print, and we tell you honestly when a job needs them rather than pretending Canva covers everything.",
    },
    {
      q: "Can I start charging for design work after four weeks?",
      a: "You can take small jobs — event flyers, social posts, church graphics — once your portfolio has three to five solid pieces. Price them modestly at first, deliver exactly what you promised, and take Business & Freelancing to learn how to brief, price and invoice properly. Most of our design students get their first paid job within a month or two of finishing.",
    },
    {
      q: "What do I need to bring to class?",
      a: "A laptop or tablet with a free Canva account, and a phone you can use to photograph your own material. For the print sessions we work with real print specs, so bring any flyer or business card you like or dislike and we will take it apart together.",
    },
  ],
};

export const webDesign: AcademyCourse = {
  slug: "web-design",
  title: "Web Design",
  fee: 25000,
  weeks: 4,
  sessionsPerWeek: 2,
  level: "Beginner",
  category: "Web & Code",
  hook: "Design, build and publish a real website — not a mockup.",
  goal: [
    "Enable a beginner to design and publish a functional basic website. By the final session you have a live 3–5 page site on a real domain that works on a phone.",
    "This is the no-code-plus-code entry point to the web: you learn what domains and hosting actually are, how HTML structures a page, how CSS makes it look intentional, how to lay out real business sections, and how to get it online. Web Development is the deeper six-week follow-on for people who want to write interactive applications.",
  ],
  audience: [
    "Beginners who want to build websites for businesses, churches and events",
    "Small business owners who want to own their online presence",
    "Learners testing whether web development is the right path for them",
    "Designers who want their work to actually reach a browser",
  ],
  requirements: [
    "A laptop (any operating system) with a modern browser",
    "A free code editor — we set up VS Code in session one",
    "A free GitHub account for publishing",
  ],
  outcomes: [
    "Explain domains, hosting and browsers in plain language to a client",
    "Write clean semantic HTML for headings, text, links, images, lists, tables and forms",
    "Style a page with CSS including colours, type, spacing, flexbox and responsive layout",
    "Build the standard business sections: navigation, hero, about, services, gallery, contact",
    "Test on mobile, optimise images and publish to a live URL",
  ],
  deliverable: {
    title: "A published 3–5 page website",
    detail:
      "A complete small business website — home, about, services, gallery and contact — styled responsively, tested on mobile, and published live on a URL you can send to a client.",
  },
  weekOutline: [
    {
      week: 1,
      theme: "Web foundations & HTML",
      summary:
        "How the web actually works — domains, hosting, browsers, sites versus apps, frontend versus backend — then your first HTML documents: structure, headings, links, images, lists, tables and forms.",
    },
    {
      week: 2,
      theme: "CSS",
      summary:
        "Selectors, classes and IDs, colour, fonts, backgrounds, borders, spacing, sizing, display, flexbox and basic positioning — turning a plain page into a designed one.",
    },
    {
      week: 3,
      theme: "Building a real website",
      summary:
        "Navigation, hero, about, services, gallery and contact sections, buttons and cards, then responsive design for mobile and desktop layouts.",
    },
    {
      week: 4,
      theme: "Finishing and publishing",
      summary:
        "Structure, UX and accessibility basics, SEO fundamentals, image optimisation, cross-browser and mobile testing, then hosting and connecting a domain.",
    },
  ],
  sessions: [
    s(1, 1, "How the Web Works", "how-the-web-works", [
      "What websites are",
      "Domains",
      "Hosting",
      "Browsers",
      "Websites vs web applications",
      "Frontend vs backend",
      "Setting up an editor",
    ]),
    s(2, 1, "HTML Structure", "html-structure", [
      "HTML",
      "CSS",
      "Basic HTML document",
      "Headings",
      "Paragraphs",
      "Links",
      "Images",
      "Lists",
      "Tables",
      "Forms",
    ]),
    s(3, 2, "CSS Fundamentals", "css-fundamentals", [
      "CSS introduction",
      "Selectors",
      "Classes",
      "IDs",
      "Colours",
      "Fonts",
      "Backgrounds",
      "Borders",
      "Margins",
      "Padding",
      "Width",
      "Height",
    ]),
    s(4, 2, "CSS Layout", "css-layout", [
      "Display",
      "Flexbox",
      "Basic positioning",
      "Building a page layout",
      "Reusable classes",
      "Consistent spacing",
    ]),
    s(5, 3, "Business Website Sections", "business-website-sections", [
      "Navigation",
      "Hero sections",
      "About section",
      "Services",
      "Gallery",
      "Contact section",
      "Buttons",
      "Cards",
    ]),
    s(6, 3, "Responsive Design", "responsive-design", [
      "Responsive design",
      "Mobile layouts",
      "Desktop layouts",
      "Media queries",
      "Flexible images",
      "Touch targets",
      "Testing on a phone",
    ]),
    s(7, 4, "Quality: UX, Accessibility & SEO", "quality-ux-accessibility-seo", [
      "Website structure",
      "UX basics",
      "Accessibility basics",
      "SEO fundamentals",
      "Image optimization",
      "Testing",
      "Mobile testing",
      "Browser testing",
    ]),
    s(8, 4, "Publishing & Final Project", "publishing", [
      "Publishing",
      "Basic hosting",
      "Domain connection",
      "Final project: publish a complete 3–5 page website",
    ]),
  ],
  faqs: [
    {
      q: "What is the difference between Web Design and Web Development?",
      a: "Web Design (4 weeks) takes you to a designed, responsive, published website — HTML, CSS, layout, quality and hosting. Web Development (6 weeks) goes further: JavaScript, DOM manipulation, interactivity, forms with validation, debugging tools, Git and a full deployed application. Take Web Design first if you have never touched code; go straight to Web Development if you already understand HTML and CSS basics.",
    },
    {
      q: "Do I need to buy a domain?",
      a: "For class you publish free on a provided subdomain, so you spend nothing. To run a real client or business site you buy a domain (roughly ₦10,000–₦18,000 a year for a .com) and either use free static hosting or a small hosting plan. We show you both options and what each actually costs before you commit.",
    },
    {
      q: "Is this a WordPress or website-builder course?",
      a: "No — you build with HTML and CSS so you understand what is actually happening. That knowledge is what lets you diagnose problems in WordPress, Wix or any builder later, and it is what clients pay more for than template editing.",
    },
    {
      q: "How much coding is involved?",
      a: "You write HTML and CSS by hand from session two. There is no programming logic in this course — no loops, no functions, no JavaScript. If writing markup feels comfortable and you want interactivity, Web Development is the next course.",
    },
  ],
};

export const webDevelopment: AcademyCourse = {
  slug: "web-development",
  title: "Web Development",
  fee: 30000,
  weeks: 6,
  sessionsPerWeek: 2,
  level: "Beginner",
  category: "Web & Code",
  hook: "Build your first functional websites and applications, and publish them.",
  goal: [
    "A noticeably deeper course than Web Design. Six weeks of HTML, CSS, JavaScript, DOM work and real project development, ending with a complete application deployed to a live URL and presented to the class.",
    "Read the promise honestly: this course builds your first functional websites and gives you a genuine foundation for further learning. It does not make you a professional developer in six weeks — it makes you someone who can build, debug and ship, which is the correct starting point.",
  ],
  audience: [
    "Learners who have completed Web Design or already know HTML and CSS",
    "People targeting junior developer or freelance web work",
    "Entrepreneurs who want to build their own product prototype",
    "Career switchers who need a portfolio of working code",
  ],
  requirements: [
    "A laptop with at least 8GB RAM and a modern browser",
    "Comfort with HTML and CSS basics (Web Design course or equivalent)",
    "A free GitHub account",
    "Roughly 4–6 hours of practice a week outside class",
  ],
  outcomes: [
    "Write semantic, accessible HTML and maintainable CSS with flexbox and grid",
    "Program in JavaScript: variables, types, functions, arrays, objects, loops and events",
    "Manipulate the DOM to build interactive interfaces and validate forms",
    "Debug with browser developer tools and organise a project properly",
    "Version code with Git and deploy it to a live URL",
  ],
  deliverable: {
    title: "A working, published web project",
    detail:
      "A complete small website or application — planned, built, tested, responsive, version-controlled on GitHub and deployed live — presented to the class with a short write-up of the decisions you made.",
  },
  weekOutline: [
    {
      week: 1,
      theme: "HTML done properly",
      summary:
        "Semantic structure, headings, links, images, lists, tables, forms, inputs, buttons, sections, navigation and accessibility — building a multi-section website.",
    },
    {
      week: 2,
      theme: "CSS for real layouts",
      summary:
        "Selectors, box model, typography, colour, flexbox, grid, positioning, responsive layouts, media queries and transitions.",
    },
    {
      week: 3,
      theme: "JavaScript fundamentals",
      summary:
        "What JavaScript does, variables, data types, operators, conditions, functions, arrays, objects, loops and events.",
    },
    {
      week: 4,
      theme: "DOM and interactivity",
      summary:
        "Selecting and changing elements, styles, event listeners, form validation, buttons, modals and dynamic content.",
    },
    {
      week: 5,
      theme: "Real project development",
      summary:
        "Project planning, folder structure, reusable patterns, debugging with developer tools, responsive testing, performance, accessibility, basic SEO and Git/GitHub.",
    },
    {
      week: 6,
      theme: "Deployment and portfolio",
      summary:
        "Testing, bug fixing, code cleanup, Git workflow, hosting, domains, documentation and portfolio presentation.",
    },
  ],
  sessions: [
    s(1, 1, "Semantic HTML", "semantic-html", [
      "HTML structure",
      "Semantic HTML",
      "Headings",
      "Paragraphs",
      "Links",
      "Images",
      "Lists",
      "Tables",
    ]),
    s(2, 1, "Forms & Accessibility", "forms-and-accessibility", [
      "Forms",
      "Inputs",
      "Buttons",
      "Sections",
      "Navigation",
      "Accessibility basics",
      "Project: multi-section website",
    ]),
    s(3, 2, "CSS Box Model & Typography", "css-box-model-typography", [
      "Selectors",
      "Classes",
      "IDs",
      "Box model",
      "Typography",
      "Colours",
    ]),
    s(4, 2, "Flexbox, Grid & Responsive Layout", "flexbox-grid-responsive", [
      "Flexbox",
      "Grid",
      "Positioning",
      "Responsive layouts",
      "Media queries",
      "Transitions",
      "Project: responsive website",
    ]),
    s(5, 3, "JavaScript Basics", "javascript-basics", [
      "What JavaScript does",
      "Variables",
      "Data types",
      "Operators",
      "Conditions",
    ]),
    s(6, 3, "Functions, Data & Loops", "functions-data-loops", [
      "Functions",
      "Arrays",
      "Objects",
      "Loops",
      "Events",
      "Project: interactive webpage",
    ]),
    s(7, 4, "The DOM", "the-dom", [
      "DOM",
      "Selecting elements",
      "Changing content",
      "Changing styles",
      "Event listeners",
    ]),
    s(8, 4, "Forms, Validation & Dynamic UI", "forms-validation-dynamic-ui", [
      "Forms",
      "Validation",
      "Buttons",
      "Modals",
      "Dynamic content",
      "Project: interactive form/calculator",
    ]),
    s(9, 5, "Planning & Structuring a Project", "planning-and-structure", [
      "Project planning",
      "Folder structure",
      "Reusable components/concepts",
      "Git/GitHub introduction",
    ]),
    s(10, 5, "Debugging & Quality", "debugging-and-quality", [
      "Debugging",
      "Browser developer tools",
      "Responsive testing",
      "Performance basics",
      "Accessibility",
      "Basic SEO",
    ]),
    s(11, 6, "Deployment & Git Workflow", "deployment-and-git", [
      "Testing",
      "Bug fixing",
      "Code cleanup",
      "Git workflow",
      "Deployment concepts",
      "Hosting",
      "Domain",
    ]),
    s(12, 6, "Portfolio & Final Presentation", "portfolio-and-presentation", [
      "Portfolio presentation",
      "Project documentation",
      "Final project: build and publish a complete website and present it",
    ]),
  ],
  faqs: [
    {
      q: "Will I be a professional developer after six weeks?",
      a: "No, and any course that promises that in six weeks is misleading you. You will be able to build, debug and publish a real website or small application, read other people's code and keep learning on your own. That is a genuine foundation and a real portfolio — the honest starting point from which months of further practice turn into employable skill.",
    },
    {
      q: "Should I take Web Design first?",
      a: "If you have never written HTML or CSS, yes — Web Design gives you four weeks of layout and publishing that this course assumes you already have. If you can already build and style a static page, come straight here.",
    },
    {
      q: "How much homework is there?",
      a: "Plan on 4–6 hours a week outside the two sessions. Programming is a repetition skill: the sessions teach and demonstrate, but the ability comes from the practice. Students who do the homework finish a project in week six; students who do not, do not.",
    },
    {
      q: "Do I need a powerful computer?",
      a: "A laptop with 8GB RAM running Windows, macOS or Linux is fine. All the tools — VS Code, a browser, Git and free static hosting — are free. You do not need to buy anything.",
    },
    {
      q: "What comes after this course?",
      a: "Pick a direction and go deep: frontend frameworks such as React, backend with Node.js and a database, or product work with the design track. Whichever you choose, keep shipping — one small deployed project a month beats a year of tutorials, and that habit is what the final two sessions of this course are built to install.",
    },
  ],
};

export const digitalMarketing: AcademyCourse = {
  slug: "digital-marketing",
  title: "Digital Marketing",
  fee: 20000,
  weeks: 4,
  sessionsPerWeek: 2,
  level: "Beginner",
  category: "Business & Teaching",
  hook: "Plan, run and measure campaigns that produce customers, not likes.",
  goal: [
    "Teach marketing as a system: audience, message, channel, content, promotion and measurement. Every session ends with something you would actually send or run.",
    "Nigerian businesses spend heavily on social media and see little return because the work is unplanned and unmeasured. This course gives you the planning, content, promotion and analytics discipline that turns spend into customers — and the reporting language that gets you paid for it.",
  ],
  audience: [
    "Small business owners marketing their own products",
    "Aspiring marketers and social media managers",
    "Sales teams who need to generate their own leads",
    "Anyone building a personal brand or content business",
  ],
  requirements: [
    "A smartphone with active social accounts",
    "A laptop for planning documents and spreadsheets",
    "A real or fictional business to build the course campaign around",
  ],
  outcomes: [
    "Write a digital marketing plan with a defined audience and value proposition",
    "Build content calendars and write captions and calls-to-action that convert",
    "Set up organic and paid promotion with clear targeting and objectives",
    "Read platform analytics and report on reach, engagement, leads and cost per result",
  ],
  deliverable: {
    title: "A complete digital marketing campaign",
    detail:
      "A marketing plan for a real or fictional business: audience, value proposition, channel strategy, one-week content calendar, ad concepts with copy and targeting, and a reporting template showing how you would measure results.",
  },
  weekOutline: [
    {
      week: 1,
      theme: "Fundamentals",
      summary:
        "What digital marketing is, traditional versus digital, customers, target audience, problems, value proposition, branding and channels — then choosing the right platforms.",
    },
    {
      week: 2,
      theme: "Content & branding",
      summary:
        "Content types, storytelling, captions, calls-to-action, content calendars, brand voice and visual consistency.",
    },
    {
      week: 3,
      theme: "Promotion",
      summary:
        "Organic and paid advertising concepts, audience targeting, ad objectives, creative and copy, landing pages, WhatsApp conversion, lead generation and follow-up.",
    },
    {
      week: 4,
      theme: "Analytics",
      summary:
        "Reach, impressions, engagement, clicks, leads, conversions and cost per result, reading campaign performance and building a basic report.",
    },
  ],
  sessions: [
    s(1, 1, "Marketing Fundamentals", "marketing-fundamentals", [
      "What digital marketing is",
      "Traditional vs digital marketing",
      "Customer",
      "Target audience",
      "Customer problems",
      "Value proposition",
      "Branding",
      "Digital presence",
      "Marketing channels",
    ]),
    s(2, 1, "Choosing Your Platforms", "choosing-your-platforms", [
      "Facebook",
      "Instagram",
      "TikTok",
      "WhatsApp",
      "Websites",
      "Email",
      "Search engines",
      "Choosing the right platform",
      "Understanding audiences",
    ]),
    s(3, 2, "Content Types & Storytelling", "content-types-and-storytelling", [
      "Content types",
      "Educational content",
      "Promotional content",
      "Entertaining content",
      "Storytelling",
      "Captions",
      "Calls-to-action",
    ]),
    s(4, 2, "Planning & Brand Voice", "planning-and-brand-voice", [
      "Content calendars",
      "Brand voice",
      "Visual consistency",
      "Project: one-week content calendar",
    ]),
    s(5, 3, "Organic & Paid Promotion", "organic-and-paid-promotion", [
      "Organic marketing",
      "Paid advertising concepts",
      "Audience targeting",
      "Ad objectives",
    ]),
    s(6, 3, "Ads, Landing Pages & Conversion", "ads-landing-pages-conversion", [
      "Ad creative",
      "Ad copy",
      "Landing pages",
      "WhatsApp conversion",
      "Lead generation",
      "Customer follow-up",
    ]),
    s(7, 4, "Reading the Numbers", "reading-the-numbers", [
      "Reach",
      "Impressions",
      "Engagement",
      "Clicks",
      "Leads",
      "Conversions",
      "Cost per result",
    ]),
    s(8, 4, "Reporting & Final Campaign", "reporting-and-final-campaign", [
      "Understanding campaign performance",
      "Basic reporting",
      "Final project: build and present a complete digital marketing campaign",
    ]),
  ],
  faqs: [
    {
      q: "Do I need money to run ads during the course?",
      a: "No. The promotion sessions teach targeting, objectives, creative and copy, and you plan complete campaigns on paper and in the platform's planning tools. Running live paid campaigns is optional and we show you how to start with a very small test budget safely if you want the experience.",
    },
    {
      q: "Is this course for my own business or for a marketing career?",
      a: "Both, and the material is the same. Business owners build the course campaign around their own products; people aiming at employment build it around a client brief and use the reporting template as portfolio evidence in interviews.",
    },
    {
      q: "What is the difference between this and Social Media Management?",
      a: "Digital Marketing covers strategy, channels, paid promotion and measurement across the whole funnel. Social Media Management is narrower and more operational: running accounts day to day — profiles, content calendars, community, messaging and account analytics. Many students take Digital Marketing first, then Social Media Management.",
    },
    {
      q: "Will I learn SEO?",
      a: "You learn where search fits as a channel and what makes a page findable, which is enough to brief or start SEO work. Full technical and content SEO is a larger discipline and is covered in Web Design's quality sessions and in our longer programmes.",
    },
  ],
};

export const socialMediaManagement: AcademyCourse = {
  slug: "social-media-management",
  title: "Social Media Management",
  fee: 15000,
  weeks: 3,
  sessionsPerWeek: 2,
  level: "Beginner",
  category: "Business & Teaching",
  hook: "Run a business account properly: plan, publish, engage and report.",
  goal: [
    "Turn 'I post on Instagram' into a professional service. You learn to optimise a business profile, plan content around pillars, produce graphics and short video, batch and schedule work, handle comments and messages professionally, and report results a client understands.",
    "This is one of the most immediately monetisable skills on the page: every Nigerian small business with an Instagram page needs someone consistent, and consistency is exactly what this course trains.",
  ],
  audience: [
    "People who want paid social media management work",
    "Business owners running their own accounts",
    "Content creators who want to grow systematically",
    "Administrators of church, school and community accounts",
  ],
  requirements: [
    "A smartphone with camera and active social accounts",
    "A free Canva account for graphics",
    "A business account — real or mock — to manage for the final project",
  ],
  outcomes: [
    "Optimise a business profile and write a bio that converts",
    "Plan content pillars and a 7-day calendar",
    "Produce graphics, photos and short videos to a consistent standard",
    "Batch and schedule content instead of posting reactively",
    "Handle comments, DMs and difficult customers professionally",
    "Report reach, engagement and growth in a client-ready format",
  ],
  deliverable: {
    title: "A content calendar plus a week of managed posts",
    detail:
      "An optimised profile, a 7-day content calendar, the graphics and captions for it, and a mock week of managing a business account — posts, comments, messages and a short performance report.",
  },
  weekOutline: [
    {
      week: 1,
      theme: "Foundations & planning",
      summary:
        "Platforms, business profiles, profile optimisation, bio writing, images, content pillars, audience research and planning — then post formats, captions, hashtags and scheduling.",
    },
    {
      week: 2,
      theme: "Content management",
      summary:
        "Creating graphics, basic photography and video, writing captions, batching, scheduling, responding to comments and messages, customer service and community management.",
    },
    {
      week: 3,
      theme: "Analytics & practice",
      summary:
        "Reach, engagement, followers, views, clicks, identifying what worked, reporting, handling difficult comments and account security — then the mock management project.",
    },
  ],
  sessions: [
    s(1, 1, "Profiles & Content Strategy", "profiles-and-content-strategy", [
      "Social media platforms",
      "Business profiles",
      "Profile optimization",
      "Bio writing",
      "Profile images",
      "Content pillars",
      "Audience research",
      "Content planning",
    ]),
    s(2, 1, "Formats, Captions & Scheduling", "formats-captions-scheduling", [
      "Posts",
      "Stories",
      "Reels/short videos",
      "Captions",
      "Hashtags",
      "Calls-to-action",
      "Content scheduling",
      "Project: 7-day content calendar",
    ]),
    s(3, 2, "Creating the Content", "creating-the-content", [
      "Creating social graphics",
      "Basic photography",
      "Basic video",
      "Writing captions",
      "Content batching",
      "Scheduling",
    ]),
    s(4, 2, "Community & Customer Service", "community-and-customer-service", [
      "Responding to comments",
      "Responding to messages",
      "Customer service",
      "Community management",
      "Response templates",
      "Escalation",
    ]),
    s(5, 3, "Analytics & Reporting", "analytics-and-reporting", [
      "Reach",
      "Engagement",
      "Followers",
      "Views",
      "Clicks",
      "Content performance",
      "Identifying successful content",
      "Reporting",
    ]),
    s(6, 3, "Safety & Final Project", "safety-and-final-project", [
      "Handling difficult comments",
      "Account security",
      "Final project: manage a mock social-media account for one week",
    ]),
  ],
  faqs: [
    {
      q: "Do I need a large following to take this course?",
      a: "No, and a large personal following is not the skill anyway. Clients pay for consistency, planning and professional handling of their account — which is what you learn. The final project runs on a mock account precisely so your own numbers do not matter.",
    },
    {
      q: "Do I need paid scheduling tools?",
      a: "No. We use the native scheduling and insights features on Instagram, Facebook and TikTok, which are free, plus free planning templates. We mention third-party schedulers and when they are worth paying for, but nothing in the course requires a subscription.",
    },
    {
      q: "How is this different from Content Creation?",
      a: "Content Creation is about producing the material — filming, lighting, audio, editing, thumbnails. Social Media Management is about running the account — strategy, calendars, community, reporting. They pair well and many students take both.",
    },
    {
      q: "How do I get my first client?",
      a: "Start with a business you already know — your church, a family shop, a former employer — and offer to run one month properly. Use the reporting template from session five so they can see what changed. Business & Freelancing covers pricing, proposals and invoicing in detail.",
    },
  ],
};

export const computerRepairs: AcademyCourse = {
  slug: "computer-repairs",
  title: "Computer Repairs",
  fee: 25000,
  weeks: 4,
  sessionsPerWeek: 2,
  level: "Beginner",
  category: "Hardware & Security",
  hook: "Hands-on hardware training: diagnose, service and fix real machines.",
  goal: [
    "Hands-on hardware training. You open real machines, identify every component, clean and maintain them, install RAM and storage, diagnose faults from symptoms, and service a deliberately broken computer as the final practical.",
    "Repair work is one of the most immediately self-employed skills in Nigeria: businesses, schools, cyber cafés and households all need machines fixed, and the person who can diagnose accurately is rare.",
  ],
  audience: [
    "People who want a technical trade they can practise immediately",
    "IT support staff who need hardware confidence",
    "Students considering a career in IT or networking",
    "Anyone who has always wanted to know what is inside the machine",
  ],
  requirements: [
    "Closed footwear for workshop sessions",
    "No tools needed — the academy provides screwdrivers, testers and practice machines",
    "Willingness to work on real hardware under supervision",
  ],
  outcomes: [
    "Identify every major component in a desktop and a laptop",
    "Work safely with electrostatic discharge, batteries and power supplies",
    "Disassemble, clean, upgrade and reassemble a machine correctly",
    "Diagnose no-power, no-display, overheating, storage and boot faults systematically",
    "Install an operating system and drivers, back up data and document a service",
  ],
  deliverable: {
    title: "A diagnosed and serviced machine",
    detail:
      "You receive a deliberately prepared faulty computer, diagnose the fault from symptoms alone, fix it, install and configure the software, and write the service documentation a customer would receive.",
  },
  weekOutline: [
    {
      week: 1,
      theme: "Computer hardware",
      summary:
        "Every component and what it does — motherboard, CPU, RAM, storage, PSU, cooling, GPU, ports and cables — plus laptop components, ESD and workshop safety, ending in hands-on identification.",
    },
    {
      week: 2,
      theme: "Disassembly & maintenance",
      summary:
        "Opening a desktop safely, laptop maintenance concepts, cleaning and dust removal, thermal paste, RAM and storage installation, cable management, fan maintenance, battery safety and reassembly.",
    },
    {
      week: 3,
      theme: "Troubleshooting",
      summary:
        "Systematic fault diagnosis: no power, no display, slow machines, overheating, keyboard, mouse, storage, RAM, boot, Windows and driver problems — practised on controlled scenarios.",
    },
    {
      week: 4,
      theme: "Software & servicing",
      summary:
        "Operating system installation, drivers, updates, backups, malware awareness, optimisation, user accounts, software installation, a repeatable troubleshooting workflow and service documentation.",
    },
  ],
  sessions: [
    s(1, 1, "Inside the Machine", "inside-the-machine", [
      "Computer components",
      "Motherboard",
      "CPU",
      "RAM",
      "Storage",
      "Power supply",
      "Fans",
      "GPU",
      "CMOS battery",
      "Ports",
      "Cables",
    ]),
    s(2, 1, "Laptops, Safety & Identification", "laptops-safety-identification", [
      "Laptop components",
      "ESD safety",
      "Workshop safety",
      "Proper handling",
      "Practical: identify components from actual computers",
    ]),
    s(3, 2, "Disassembly & Cleaning", "disassembly-and-cleaning", [
      "Opening a desktop safely",
      "Laptop maintenance concepts",
      "Cleaning",
      "Dust removal",
      "Thermal paste concepts",
      "Cable management",
      "Fan maintenance",
      "Battery safety",
      "Reassembly",
    ]),
    s(4, 2, "Upgrades: RAM & Storage", "upgrades-ram-storage", [
      "RAM installation",
      "Storage installation",
      "Compatibility checking",
      "Cloning and reinstalling",
      "Post-upgrade verification",
    ]),
    s(5, 3, "Power, Display & Heat Faults", "power-display-heat-faults", [
      "Computer not powering on",
      "No display",
      "Overheating",
      "Power supply testing",
      "Thermal faults",
    ]),
    s(6, 3, "Storage, Memory & Boot Faults", "storage-memory-boot-faults", [
      "Keyboard problems",
      "Mouse problems",
      "Storage problems",
      "RAM problems",
      "Boot problems",
      "Windows problems",
      "Driver problems",
      "Practical: fault diagnosis using controlled scenarios",
    ]),
    s(7, 4, "Software & System Servicing", "software-and-system-servicing", [
      "Operating-system installation concepts",
      "Drivers",
      "Updates",
      "Backup",
      "Malware awareness",
      "Basic system optimization",
      "User accounts",
      "Software installation",
    ]),
    s(8, 4, "Service Workflow & Final Practical", "service-workflow-and-final-practical", [
      "Troubleshooting workflow",
      "Service documentation",
      "Final practical: diagnose and service a deliberately prepared faulty computer",
    ]),
  ],
  faqs: [
    {
      q: "Is this course dangerous?",
      a: "Handled correctly, no — which is why safety is taught in session two before you open anything. You learn electrostatic discharge practice, how to work on a machine that is disconnected from mains, and why you never open a power supply unit. Batteries and swollen cells are treated as supervised work only.",
    },
    {
      q: "Do I need to bring my own tools or computer?",
      a: "No. The academy provides screwdrivers, testers, thermal paste and the practice machines, including deliberately faulty units for the troubleshooting sessions. You will be told which basic toolset to buy when you start taking customer work.",
    },
    {
      q: "Will I learn laptop and phone repair?",
      a: "Laptop components, disassembly and maintenance are covered, with the differences from desktops made explicit. Phone repair — screens, batteries, board-level work — is a separate specialisation and is not part of this course.",
    },
    {
      q: "Can I earn from this right after the course?",
      a: "Yes, more directly than most skills here. Cleaning, RAM and SSD upgrades, operating system reinstalls and straightforward fault diagnosis are common paid jobs, and the final practical is deliberately the kind of machine customers bring in. Business & Freelancing will teach you to quote, invoice and document that work properly.",
    },
  ],
};

export const cybersecurity: AcademyCourse = {
  slug: "cybersecurity",
  title: "Cybersecurity",
  fee: 25000,
  weeks: 4,
  sessionsPerWeek: 2,
  level: "Beginner",
  category: "Hardware & Security",
  hook: "Defensive and ethical: understand threats and protect real people and data.",
  goal: [
    "Defensive and ethical throughout. You learn what attackers actually do so you can stop it — threats, actors, vulnerabilities and risk — then personal and organisational security, network and web security, and finally incident handling and security assessment.",
    "Every demonstration uses safe, isolated examples. We do not attack real systems, and we do not teach anyone to. Nigerian businesses are losing money to phishing, business email compromise and weak account security, and the people who can prevent that are in short supply.",
  ],
  audience: [
    "Beginners curious about a security career",
    "IT and admin staff responsible for company systems",
    "Business owners who need to protect their own operations",
    "Anyone who has been targeted by scams and wants to understand them",
  ],
  requirements: [
    "A laptop or an academy machine",
    "Basic computer and internet familiarity",
    "A commitment to ethical use — this is stated again at enrolment",
  ],
  outcomes: [
    "Explain the CIA triad, threats, vulnerabilities and risk in professional terms",
    "Implement strong authentication, password management and MFA",
    "Recognise phishing, social engineering and scam patterns on sight",
    "Assess network and web security: Wi-Fi, firewalls, encryption, HTTPS",
    "Run basic incident identification and response",
    "Produce a security assessment and improvement report for an organisation",
  ],
  deliverable: {
    title: "A security assessment report",
    detail:
      "A written security assessment of a fictional organisation: assets, likely threats, identified weaknesses, prioritised recommendations and a practical improvement checklist the business could act on this month.",
  },
  weekOutline: [
    {
      week: 1,
      theme: "Cybersecurity fundamentals",
      summary:
        "What cybersecurity means, cyber threats, threat actors, assets, vulnerabilities, risks, security controls, the CIA triad, authentication, authorization and security awareness.",
    },
    {
      week: 2,
      theme: "Personal & organisational security",
      summary:
        "Strong passwords, password managers, multi-factor authentication, phishing, social engineering, scams, malware, safe downloads, email security, device security and data protection.",
    },
    {
      week: 3,
      theme: "Network & web security",
      summary:
        "Networks, IP addresses, routers, Wi-Fi security, firewalls, encryption concepts, HTTPS, secure browsing and common web-security concepts — using safe, isolated demonstrations.",
    },
    {
      week: 4,
      theme: "Security practice",
      summary:
        "Incident identification, basic incident response, backups, recovery, security policies, checklists, risk assessment, awareness training and career paths.",
    },
  ],
  sessions: [
    s(1, 1, "Threats, Risk & the CIA Triad", "threats-risk-cia", [
      "What cybersecurity means",
      "Cyber threats",
      "Threat actors",
      "Assets",
      "Vulnerabilities",
      "Risks",
      "Security controls",
      "CIA triad",
    ]),
    s(2, 1, "Authentication & Awareness", "authentication-and-awareness", [
      "Authentication",
      "Authorization",
      "Security awareness",
      "Defence in depth",
      "Least privilege",
    ]),
    s(3, 2, "Passwords & Account Security", "passwords-and-account-security", [
      "Strong passwords",
      "Password managers",
      "Multi-factor authentication",
      "Email security",
      "Device security",
      "Data protection",
    ]),
    s(4, 2, "Phishing, Scams & Malware", "phishing-scams-malware", [
      "Phishing",
      "Social engineering",
      "Scam awareness",
      "Malware awareness",
      "Safe downloads",
      "Practical: identify suspicious messages and websites using safe examples",
    ]),
    s(5, 3, "Networks & Wi-Fi Security", "networks-and-wifi-security", [
      "Networks",
      "IP addresses",
      "Routers",
      "Wi-Fi security",
      "Firewalls",
    ]),
    s(6, 3, "Encryption & Web Security", "encryption-and-web-security", [
      "Encryption concepts",
      "HTTPS",
      "Secure browsing",
      "Common web-security concepts",
      "Vulnerability awareness",
    ]),
    s(7, 4, "Incident Response & Recovery", "incident-response-and-recovery", [
      "Incident identification",
      "Basic incident response",
      "Backups",
      "Recovery",
    ]),
    s(8, 4, "Policies, Risk & Final Project", "policies-risk-and-final-project", [
      "Security policies",
      "Security checklists",
      "Risk assessment",
      "Security awareness training",
      "Career paths in cybersecurity",
      "Final project: security assessment and improvement report",
    ]),
  ],
  faqs: [
    {
      q: "Will this course teach me to hack?",
      a: "No. This is a defensive, ethical course. You learn how attacks work so you can recognise and prevent them, using safe isolated demonstrations. We do not teach attacking real systems and we do not accept students who want that.",
    },
    {
      q: "Do I need a technical background?",
      a: "Comfort with using computers and the internet is enough for this course. If you have done Typing & Computer Basics you are ready. Deeper technical security work — networking, Linux, monitoring tools — builds on this foundation and on Computer Networking.",
    },
    {
      q: "Is this the same as your longer cybersecurity programme?",
      a: "No. This four-week course is the practical introduction: literacy, personal and organisational hygiene, and assessment thinking. Our longer Cybersecurity Analyst programme goes into SOC operations, SIEM, detection engineering, forensics and compliance for people targeting security employment.",
    },
    {
      q: "What jobs does this lead to?",
      a: "Directly: IT support with a security remit, security awareness training, and internal security officer work in smaller organisations. As a foundation: security analyst, SOC analyst and GRC roles after further study and hands-on practice. Nigerian banks, fintechs and telcos are all under regulatory pressure to hire for this.",
    },
  ],
};

export const businessFreelancing: AcademyCourse = {
  slug: "business-freelancing",
  title: "Business & Freelancing",
  fee: 15000,
  weeks: 3,
  sessionsPerWeek: 2,
  level: "Beginner",
  category: "Business & Teaching",
  hook: "Turn the skill you just learned into a service people pay for.",
  goal: [
    "The bridge between having a skill and earning from it. You turn one skill into defined services, price them, build a portfolio, find clients ethically, write proposals, handle requirements and revisions professionally, then set up the small-business basics: records, finances, referrals and reputation.",
    "For younger students this module focuses on entrepreneurship and understanding digital services rather than encouraging independent entry into adult freelance marketplaces.",
  ],
  audience: [
    "Graduates of any other course on this page who want to earn from it",
    "People already freelancing without structure or pricing discipline",
    "Students exploring self-employment",
    "Parents and guardians of younger learners (adapted delivery)",
  ],
  requirements: [
    "At least one practical skill you can offer — graphic design, web, social media, office work, repairs",
    "A phone or laptop for building your portfolio",
    "Willingness to talk to real people about their problems",
  ],
  outcomes: [
    "Turn a skill into three concrete, describable services",
    "Price a service defensibly and build service packages",
    "Build a portfolio that demonstrates capability",
    "Find clients ethically and write proposals that get replies",
    "Manage requirements, deadlines, revisions and complaints professionally",
    "Keep records and basic finances that keep you out of trouble",
  ],
  deliverable: {
    title: "A freelance business plan and portfolio",
    detail:
      "A one-page business plan — services, pricing, target clients, acquisition approach — plus a portfolio with three pieces of work presented as case studies rather than screenshots.",
  },
  weekOutline: [
    {
      week: 1,
      theme: "Turning a skill into a service",
      summary:
        "What freelancing means, skills versus services, finding useful problems, identifying customers, choosing a service, pricing, packaging, personal branding and portfolio development.",
    },
    {
      week: 2,
      theme: "Working with clients",
      summary:
        "Finding clients ethically, communication, understanding requirements, proposals, asking the right questions, expectations, deadlines, revisions, deliverables, professional communication and handling complaints.",
    },
    {
      week: 3,
      theme: "Building a small digital business",
      summary:
        "Portfolio, packages, pricing, marketing, customer acquisition, referrals, record keeping, basic finances, repeat customers, scaling and professional reputation.",
    },
  ],
  sessions: [
    s(1, 1, "From Skill to Service", "from-skill-to-service", [
      "What freelancing means",
      "Skills vs services",
      "Finding useful problems",
      "Identifying customers",
      "Choosing a service",
      "Pricing concepts",
      "Creating a service package",
      "Basic personal branding",
      "Portfolio development",
      "Exercise: turn one learned skill into three possible services",
    ]),
    s(2, 2, "Finding Clients & Proposals", "finding-clients-and-proposals", [
      "Finding potential clients ethically",
      "Communication",
      "Understanding requirements",
      "Writing proposals",
      "Asking the right questions",
    ]),
    s(3, 2, "Delivering Professional Work", "delivering-professional-work", [
      "Setting expectations",
      "Deadlines",
      "Revisions",
      "Deliverables",
      "Professional communication",
      "Handling complaints",
    ]),
    s(4, 3, "Pricing & Packaging", "pricing-and-packaging", [
      "Service packages",
      "Pricing models",
      "Deposits and payment terms",
      "Scope control",
      "Knowing when to say no",
    ]),
    s(5, 3, "Records, Money & Reputation", "records-money-and-reputation", [
      "Record keeping",
      "Basic business finances",
      "Repeat customers",
      "Referrals",
      "Scaling services",
      "Professional reputation",
    ]),
    s(6, 3, "Final Project — Business Plan & Portfolio", "business-plan-and-portfolio", [
      "Final project: create a mini freelance-business plan and portfolio",
      "Presenting your plan to the class",
      "Peer critique and pricing challenge",
    ]),
  ],
  faqs: [
    {
      q: "Do I need a skill before taking this course?",
      a: "Ideally yes — one practical skill you can offer. This course does not teach design, coding or marketing; it teaches how to sell and deliver whatever you can already do. Most students take it directly after finishing another course on this page.",
    },
    {
      q: "Is this suitable for a teenager?",
      a: "Yes, with adapted delivery. For younger students the module focuses on entrepreneurship, understanding digital services, pricing logic and building a portfolio — not on independently registering for adult freelance marketplaces or handling client payments.",
    },
    {
      q: "Will you help me register a business or open a bank account?",
      a: "We explain what registration, separate business banking and record keeping involve in Nigeria and when it becomes worth doing, and we point you to the correct processes. We do not file anything on your behalf and this is not legal or accounting advice.",
    },
    {
      q: "How do I price my first job?",
      a: "Session four works through this properly with real numbers. The short version: price against the value of the outcome and the market rate, not against how long it took you — and never so low that you resent the work. Undercutting badly at the start is the most common and most expensive mistake new freelancers make.",
    },
  ],
};

export const contentCreation: AcademyCourse = {
  slug: "content-creation",
  title: "Content Creation",
  fee: 15000,
  weeks: 3,
  sessionsPerWeek: 2,
  level: "Beginner",
  category: "Creative & Media",
  hook: "Plan, shoot, edit and publish video that people watch to the end.",
  goal: [
    "Take you from 'I have nothing to post' to producing a finished short-form video: ideas and scripts, hooks, smartphone filming, framing, lighting, audio, editing with captions, then thumbnails, titles, publishing and reading analytics.",
    "Short-form video is the highest-reach format available to a Nigerian creator or small business right now, and it is also the format where basic craft — lighting, audio, a strong first two seconds — separates watched content from skipped content.",
  ],
  audience: [
    "Creators who want to grow an audience",
    "Business owners who need video for products and services",
    "Churches, schools and organisations documenting their work",
    "Anyone with a smartphone who wants to make videos that look intentional",
  ],
  requirements: [
    "A smartphone with a working camera and a free editing app (CapCut)",
    "Headphones or earphones for monitoring audio",
    "A topic, product or message you want to make content about",
  ],
  outcomes: [
    "Generate content ideas and write scripts with strong hooks",
    "Shoot stable, well-framed, properly lit video on a phone",
    "Record clean audio and recognise when it is unusable",
    "Edit short-form video: trimming, transitions, text, music and captions",
    "Create thumbnails and titles, publish deliberately and read analytics",
    "Work within copyright and privacy limits",
  ],
  deliverable: {
    title: "A complete short-form video",
    detail:
      "One finished educational or promotional video — scripted, shot, edited with captions and a thumbnail, published, and reviewed against its first week of analytics.",
  },
  weekOutline: [
    {
      week: 1,
      theme: "Content fundamentals",
      summary:
        "What content creation is, content types, audience, topics, pillars, storytelling, hooks, scripts, short versus long form and planning — ending with five scripted ideas.",
    },
    {
      week: 2,
      theme: "Production",
      summary:
        "Smartphone photography, framing, lighting, audio, recording, angles, talking to camera, screen recording, then editing: trimming, transitions, text, music and captions.",
    },
    {
      week: 3,
      theme: "Publishing & growth",
      summary:
        "Thumbnails, titles, captions, publishing, calendars, engagement, analytics, copyright, privacy and responsible creation — then the final video project.",
    },
  ],
  sessions: [
    s(1, 1, "Ideas, Audience & Scripts", "ideas-audience-scripts", [
      "What content creation is",
      "Content types",
      "Audience",
      "Topics",
      "Content pillars",
      "Storytelling",
      "Hooks",
      "Scripts",
      "Short-form vs long-form content",
      "Planning content",
      "Project: develop five content ideas and scripts",
    ]),
    s(2, 2, "Shooting on a Phone", "shooting-on-a-phone", [
      "Smartphone photography",
      "Framing",
      "Lighting",
      "Audio",
      "Recording",
      "Camera angles",
      "Talking to camera",
      "Screen recording",
    ]),
    s(3, 2, "Editing", "editing", [
      "Basic video editing",
      "Trimming",
      "Transitions",
      "Text",
      "Music",
      "Captions",
    ]),
    s(4, 3, "Packaging & Publishing", "packaging-and-publishing", [
      "Thumbnails",
      "Titles",
      "Captions",
      "Publishing",
      "Content calendars",
    ]),
    s(5, 3, "Growth, Rights & Responsibility", "growth-rights-responsibility", [
      "Audience engagement",
      "Analytics",
      "Copyright awareness",
      "Privacy",
      "Responsible content creation",
    ]),
    s(6, 3, "Final Project — Short-Form Video", "final-short-form-video", [
      "Final project: produce a complete short-form educational/promotional video",
      "Screening and class critique",
    ]),
  ],
  faqs: [
    {
      q: "Do I need a camera or professional equipment?",
      a: "No. Everything in this course is shot on a smartphone, because that is what you will actually have when the moment comes. We teach lighting and audio technique with free or cheap solutions — window light, a ₦5,000 lapel mic — and explain when equipment genuinely changes the result and when it does not.",
    },
    {
      q: "Which editing app do we use?",
      a: "CapCut, because it is free, runs on a phone and covers trimming, transitions, text, music and captions. The editing principles transfer to Premiere, DaVinci Resolve or Final Cut if you move to desktop editing later.",
    },
    {
      q: "Will this teach me to get famous or go viral?",
      a: "Nobody can promise that honestly. What we teach is what makes content watchable and shareable: a strong first two seconds, clear audio, a single idea per video, and captions — plus how to read your analytics so you learn from your own numbers instead of guessing.",
    },
    {
      q: "I am shy about being on camera. Is this course for me?",
      a: "Yes. Screen recording, voiceover, product shots and b-roll are all covered as formats that do not require your face. Session two includes talking-to-camera practice in a supportive room, and many students who start there end up comfortable.",
    },
  ],
};

export const onlineTeaching: AcademyCourse = {
  slug: "online-teaching",
  title: "Online Teaching",
  fee: 15000,
  weeks: 3,
  sessionsPerWeek: 2,
  level: "Beginner",
  category: "Business & Teaching",
  hook: "Teach what you know — plan lessons, run online classes and assess learners.",
  goal: [
    "Someone who develops a skill can eventually teach that skill to others, and teaching is often the highest-margin way to use it. This course covers what makes teaching work: understanding learners, writing objectives, planning lessons, breaking complex topics into steps, demonstrating, practising, giving feedback and assessing.",
    "Then the digital layer: online classrooms, video meetings, screen sharing, whiteboards, recording lessons, building materials, assignments and quizzes — ending with you delivering a real short online lesson.",
  ],
  audience: [
    "Graduates of other courses who want to teach what they learned",
    "Teachers moving lessons online",
    "Tutors and trainers building an income from teaching",
    "Professionals who need to train colleagues and clients",
  ],
  requirements: [
    "One subject or skill you know well enough to teach",
    "A laptop or phone with a camera and microphone",
    "A free video-meeting account (Zoom or Google Meet)",
  ],
  outcomes: [
    "Write clear learning objectives and a structured lesson plan",
    "Break a complex topic into teachable steps",
    "Run an online class: meetings, screen sharing, whiteboards, recording",
    "Create slides, materials, assignments and quizzes",
    "Give feedback that actually improves performance",
    "Deliver a short online lesson confidently",
  ],
  deliverable: {
    title: "A complete lesson plus a delivered class",
    detail:
      "A written lesson plan with objectives, materials and assessment, the teaching slides, and a recorded short online lesson you delivered to the class with feedback from your peers.",
  },
  weekOutline: [
    {
      week: 1,
      theme: "Teaching fundamentals",
      summary:
        "What makes a good teacher, understanding learners, learning objectives, lesson planning, breaking complex topics into simple steps, demonstration, practice, feedback and assessment.",
    },
    {
      week: 2,
      theme: "Digital teaching",
      summary:
        "Online classrooms, video meetings, screen sharing, presentations, digital whiteboards, recording lessons, teaching materials, assignments, quizzes and student communication.",
    },
    {
      week: 3,
      theme: "Building and delivering a lesson",
      summary:
        "Course, module and lesson structure, slides, demonstrations, exercises, assignments, assessments, feedback and recording — then your delivered lesson.",
    },
  ],
  sessions: [
    s(1, 1, "How People Learn", "how-people-learn", [
      "What makes a good teacher",
      "Understanding learners",
      "Learning objectives",
      "Lesson planning",
      "Breaking complex topics into simple steps",
    ]),
    s(2, 1, "Demonstration, Practice & Assessment", "demonstration-practice-assessment", [
      "Demonstration",
      "Practice",
      "Feedback",
      "Assessment",
      "Project: create a basic lesson plan",
    ]),
    s(3, 2, "Running an Online Classroom", "running-an-online-classroom", [
      "Online classrooms",
      "Video meetings",
      "Screen sharing",
      "Presentations",
      "Digital whiteboards",
      "Recording lessons",
    ]),
    s(4, 2, "Materials, Assignments & Quizzes", "materials-assignments-quizzes", [
      "Creating teaching materials",
      "Digital assignments",
      "Quizzes",
      "Student communication",
    ]),
    s(5, 3, "Course & Lesson Structure", "course-and-lesson-structure", [
      "Course structure",
      "Module structure",
      "Lesson structure",
      "Teaching slides",
      "Demonstrations",
      "Exercises",
      "Giving feedback",
    ]),
    s(6, 3, "Final Project — Deliver a Lesson", "deliver-a-lesson", [
      "Final project: prepare and deliver a short online lesson",
      "Recording your lesson",
      "Peer feedback and improvement plan",
    ]),
  ],
  faqs: [
    {
      q: "I have never taught before. Can I take this?",
      a: "Yes — the course assumes no teaching experience. What it does assume is that you know a subject well enough to teach it, whether that is Excel, sewing, mathematics, a language or a trade skill.",
    },
    {
      q: "Do I need to record myself teaching?",
      a: "The final project is a short lesson delivered live to the class and recorded. Recording matters because watching yourself teach is the fastest way to improve, and a recorded lesson is also portfolio material you can show to schools, clients or students.",
    },
    {
      q: "Will this help me earn as a tutor?",
      a: "Directly. Nigerian parents and professionals pay for structured tutoring, and most tutors lose clients because the teaching is unstructured rather than because the subject knowledge is weak. A lesson plan, materials and clear assessment are what make a tutor look professional and get renewed.",
    },
    {
      q: "Is this the same as your train-the-trainer work for instructors?",
      a: "This is the public, entry-level version. Internal instructor training at the academy goes deeper into curriculum design, assessment rubrics and quality assurance for people teaching inside our programmes.",
    },
  ],
};

/* ---------- Rotating short courses ("and more") ---------- */

export const digitalProductivity: AcademyCourse = {
  slug: "digital-productivity",
  title: "Digital Productivity",
  fee: 15000,
  weeks: 2,
  sessionsPerWeek: 2,
  level: "Absolute beginner",
  category: "Office & Data",
  rotating: true,
  hook: "Google Workspace, email discipline and cloud storage that saves hours weekly.",
  goal: [
    "Get your digital working life organised: Google Workspace (Docs, Sheets, Drive, Calendar, Forms), email that does not control you, file and folder systems that stay usable, and cloud storage that survives a lost phone or laptop.",
  ],
  audience: [
    "Students and professionals drowning in files and email",
    "Small teams that need shared documents and calendars",
    "Anyone who has lost important work to a dead device",
  ],
  requirements: ["A Google account", "A laptop or phone", "No prior experience needed"],
  outcomes: [
    "Work in Google Docs, Sheets, Slides, Drive, Calendar and Forms",
    "Set up an inbox system with labels, filters and folders",
    "Build a folder structure and naming convention that scales",
    "Back up important files to cloud storage correctly",
  ],
  deliverable: {
    title: "A working personal system",
    detail:
      "A cleaned inbox with working filters, a folder structure with a naming convention, your files backed up to cloud storage, and a shared calendar plus a form collecting real responses.",
  },
  weekOutline: [
    {
      week: 1,
      theme: "Google Workspace",
      summary: "Docs, Sheets, Slides, Drive, Calendar and Forms, plus sharing and collaboration.",
    },
    {
      week: 2,
      theme: "Email & organisation",
      summary: "Email management, digital organisation, naming, and cloud storage with backup.",
    },
  ],
  sessions: [
    s(1, 1, "Google Workspace Essentials", "workspace-essentials", [
      "Google Docs",
      "Google Sheets",
      "Google Slides",
      "Google Drive",
      "Sharing and permissions",
      "Real-time collaboration",
    ]),
    s(2, 1, "Calendar & Forms", "calendar-and-forms", [
      "Google Calendar",
      "Scheduling and reminders",
      "Google Forms",
      "Collecting responses",
      "Forms to Sheets",
    ]),
    s(3, 2, "Email Management", "email-management", [
      "Inbox zero thinking",
      "Labels and folders",
      "Filters and rules",
      "Archive vs delete",
      "Templates and signatures",
      "Notification discipline",
    ]),
    s(4, 2, "Files, Naming & Cloud Backup", "files-naming-cloud-backup", [
      "Digital organization",
      "Folder structures",
      "Naming conventions",
      "Cloud storage",
      "Backup strategy",
      "Recovering lost files",
    ]),
  ],
  faqs: [
    {
      q: "Is this course free software only?",
      a: "Yes — everything is Google Workspace's free tier, which is what most Nigerian students and small businesses actually use. No subscriptions are required.",
    },
    {
      q: "How is this different from Microsoft Office?",
      a: "Microsoft Office teaches document, spreadsheet and presentation production in depth. This course teaches the working system around them — email, files, cloud storage, calendars and forms — so your work is organised and recoverable. They complement each other.",
    },
  ],
};

export const aiProductivity: AcademyCourse = {
  slug: "ai-productivity",
  title: "AI Productivity",
  fee: 15000,
  weeks: 2,
  sessionsPerWeek: 2,
  level: "Beginner",
  category: "Office & Data",
  rotating: true,
  hook: "Use AI tools to work faster without producing nonsense or leaking data.",
  goal: [
    "Practical, responsible AI use: what these tools actually are and are not, how to write prompts that produce useful output, how to use AI for research and drafting, and how to keep it honest — including the limits, the errors and the things you must never paste into one.",
  ],
  audience: [
    "Professionals and students who want to work faster",
    "Business owners automating routine writing and admin",
    "Anyone confused by AI claims and wanting a straight answer",
  ],
  requirements: [
    "A laptop or phone with internet",
    "A free AI assistant account",
    "No technical background",
  ],
  outcomes: [
    "Explain what large language models can and cannot reliably do",
    "Write prompts that produce usable drafts, summaries and structures",
    "Use AI for research while verifying claims independently",
    "Spot hallucinations and bias in generated output",
    "Apply a personal policy on data you never share with AI tools",
  ],
  deliverable: {
    title: "An AI-assisted workflow you actually use",
    detail:
      "A documented workflow for one of your real recurring tasks — with the prompts you use, the verification steps and the parts you deliberately keep manual.",
  },
  weekOutline: [
    {
      week: 1,
      theme: "Understanding & prompting",
      summary: "AI fundamentals, how these tools work, prompt writing and iteration.",
    },
    {
      week: 2,
      theme: "Applying it responsibly",
      summary: "AI-assisted research and productivity, verification, and responsible use.",
    },
  ],
  sessions: [
    s(1, 1, "What AI Tools Actually Are", "what-ai-tools-are", [
      "AI fundamentals",
      "How language models work",
      "What they are good at",
      "Where they fail",
      "Choosing a tool",
    ]),
    s(2, 1, "Prompt Writing", "prompt-writing", [
      "Prompt writing",
      "Context and constraints",
      "Examples and formats",
      "Iterating on output",
      "Reusable prompt library",
    ]),
    s(3, 2, "AI-Assisted Research & Work", "ai-assisted-research-work", [
      "AI-assisted research",
      "AI-assisted productivity",
      "Summarising and drafting",
      "Verification",
      "Citation and sources",
    ]),
    s(4, 2, "Responsible Use", "responsible-use", [
      "Responsible AI use",
      "Hallucinations and bias",
      "Data privacy",
      "Academic and workplace honesty",
      "Your personal AI policy",
    ]),
  ],
  faqs: [
    {
      q: "Do I need to pay for an AI subscription?",
      a: "No. The course is taught entirely on free tiers, which are capable enough for everything we cover. We explain what the paid tiers add so you can decide later whether your own work justifies the cost.",
    },
    {
      q: "Will this teach me to cheat on assignments?",
      a: "No. Session four covers academic and workplace honesty explicitly, including where AI assistance must be declared. Using AI to work faster and think clearer is a skill; submitting generated work as your own is a career risk.",
    },
  ],
};

export const mobileAppDevelopment: AcademyCourse = {
  slug: "mobile-app-development",
  title: "Mobile App Development",
  fee: 30000,
  weeks: 4,
  sessionsPerWeek: 2,
  level: "Intermediate",
  category: "Web & Code",
  rotating: true,
  hook: "App concepts, UI design and the fundamentals of building for phones.",
  goal: [
    "An introduction to building mobile software: app concepts and scoping, mobile UI patterns and design, then mobile development fundamentals — screens, navigation, state and publishing. Completing Web Development first is strongly recommended.",
  ],
  audience: [
    "Learners who have completed Web Development or Web Design",
    "Developers curious about mobile",
    "Entrepreneurs scoping an app idea",
  ],
  requirements: [
    "A laptop with 8GB+ RAM",
    "Web Development (or equivalent HTML/CSS/JS)",
    "A free GitHub account",
  ],
  outcomes: [
    "Scope an app idea into a realistic first version",
    "Design mobile screens using platform conventions",
    "Build screens, navigation and state in a mobile framework",
    "Prepare an app for testing and publishing",
  ],
  deliverable: {
    title: "A working app prototype",
    detail:
      "A small multi-screen app you designed and built, running on a phone or emulator, with the screens and flow documented.",
  },
  weekOutline: [
    {
      week: 1,
      theme: "Concepts & UI",
      summary: "App concepts, scoping, and mobile UI design patterns.",
    },
    { week: 2, theme: "UI in practice", summary: "Building screens, components and navigation." },
    {
      week: 3,
      theme: "Development fundamentals",
      summary: "State, data, lists and user input on mobile.",
    },
    {
      week: 4,
      theme: "Testing & shipping",
      summary: "Testing on devices, debugging and publishing concepts.",
    },
  ],
  sessions: [
    s(1, 1, "App Concepts & Scoping", "app-concepts-scoping", [
      "App concepts",
      "Choosing a first project",
      "Scoping a v1",
      "Platform conventions",
    ]),
    s(2, 1, "Mobile UI Design", "mobile-ui-design", [
      "UI design",
      "Screens and flows",
      "Touch targets",
      "Navigation patterns",
      "Prototyping",
    ]),
    s(3, 2, "Building Screens", "building-screens", [
      "Mobile development fundamentals",
      "Setting up the toolchain",
      "Components",
      "Layout on small screens",
    ]),
    s(4, 2, "Navigation & Components", "navigation-components", [
      "Screen navigation",
      "Reusable components",
      "Styling",
      "Responsive behaviour across device sizes",
    ]),
    s(5, 3, "State & Data", "state-and-data", [
      "State management",
      "User input",
      "Lists and data display",
      "Local storage",
    ]),
    s(6, 3, "Working with APIs", "working-with-apis", [
      "Fetching data",
      "Loading and error states",
      "Offline behaviour",
      "Performance on low-end devices",
    ]),
    s(7, 4, "Testing on Devices", "testing-on-devices", [
      "Testing on a phone",
      "Emulators",
      "Debugging",
      "Common mobile bugs",
    ]),
    s(8, 4, "Publishing & Final Project", "publishing-mobile", [
      "Publishing concepts",
      "App store requirements",
      "Final project: working app prototype",
    ]),
  ],
  faqs: [
    {
      q: "Do I need coding experience?",
      a: "Yes — this course assumes you can already write HTML, CSS and JavaScript, which means Web Development or equivalent. Mobile frameworks are much easier to learn as a second step than as a first one.",
    },
    {
      q: "Do I need a Mac to build iOS apps?",
      a: "For publishing to the Apple App Store, yes — Apple requires macOS for final builds. During the course you can develop and test on Android and in browser-based simulators without a Mac. We are explicit about this limitation rather than pretending it away.",
    },
  ],
};

export const photography: AcademyCourse = {
  slug: "photography",
  title: "Photography",
  fee: 15000,
  weeks: 2,
  sessionsPerWeek: 2,
  level: "Absolute beginner",
  category: "Creative & Media",
  rotating: true,
  hook: "Smartphone photography, composition, lighting and editing that look professional.",
  goal: [
    "Make better photographs with the camera you already own. Composition, light, exposure basics, then editing for colour and clarity — applied to the work Nigerian photographers actually get paid for: products, food, events, portraits and church services.",
  ],
  audience: [
    "Product sellers and small businesses",
    "Event and church photographers",
    "Content creators",
    "Complete beginners",
  ],
  requirements: [
    "A smartphone camera",
    "A free editing app (Snapseed or Lightroom Mobile)",
    "Subjects to photograph",
  ],
  outcomes: [
    "Compose a photograph deliberately using framing rules and when to break them",
    "Read and use natural and artificial light",
    "Control exposure, focus and white balance on a phone",
    "Edit for colour, contrast and clarity without over-processing",
  ],
  deliverable: {
    title: "A curated photo set",
    detail:
      "Twelve edited photographs across two assignments — one product or food set and one event or portrait set — with a short note on the decisions behind each.",
  },
  weekOutline: [
    {
      week: 1,
      theme: "Seeing and light",
      summary: "Composition, framing, and how to read and shape light.",
    },
    {
      week: 2,
      theme: "Shooting and editing",
      summary: "Exposure and focus on a phone, then editing workflows for real assignments.",
    },
  ],
  sessions: [
    s(1, 1, "Composition & Framing", "composition-framing", [
      "Composition",
      "Rule of thirds",
      "Leading lines",
      "Negative space",
      "Perspective and angles",
      "Cleaning the frame",
    ]),
    s(2, 1, "Light", "light", [
      "Light direction and quality",
      "Natural light indoors",
      "Golden hour",
      "Cheap reflectors and diffusers",
      "Mixed and artificial light",
    ]),
    s(3, 2, "Camera Control on a Phone", "camera-control", [
      "Exposure",
      "Focus and focus lock",
      "White balance",
      "HDR and when to avoid it",
      "Shooting raw where available",
      "Stability",
    ]),
    s(4, 2, "Editing & Assignment", "editing-photography", [
      "Editing workflow",
      "Colour correction",
      "Contrast and clarity",
      "Cropping and straightening",
      "Batch consistency",
      "Export sizes for web and print",
    ]),
  ],
  faqs: [
    {
      q: "Do I need a DSLR or mirrorless camera?",
      a: "No. The course is taught on smartphones because that is what most paid work in Nigeria is now shot on, and the principles of composition and light are identical. We explain what a dedicated camera genuinely adds and when it is worth buying.",
    },
    {
      q: "Is this the same as the photo part of Content Creation?",
      a: "Content Creation covers still photography briefly as part of video and social work. This course goes deep on photography alone — composition, light, exposure and editing — for people who want photographs as the product.",
    },
  ],
};

export const videoEditing: AcademyCourse = {
  slug: "video-editing",
  title: "Video Editing",
  fee: 20000,
  weeks: 3,
  sessionsPerWeek: 2,
  level: "Beginner",
  category: "Creative & Media",
  rotating: true,
  hook: "Cut, colour, caption and sound-mix video on phone and desktop.",
  goal: [
    "Editing craft rather than button-pushing: story structure, cutting on action and rhythm, audio levels and clean-up, transitions used sparingly, captions, colour consistency and export settings for each platform. Taught in CapCut and Premiere fundamentals.",
  ],
  audience: [
    "Creators producing regular video",
    "Church and event media teams",
    "Businesses with video content",
    "Beginners",
  ],
  requirements: [
    "A phone and/or laptop",
    "CapCut (free) and optionally Premiere",
    "Footage to work with",
  ],
  outcomes: [
    "Structure a video so it holds attention",
    "Cut to rhythm and on action",
    "Clean and mix audio to broadcast-usable levels",
    "Add captions, graphics and colour consistently",
    "Export correctly for Instagram, TikTok, YouTube and WhatsApp",
  ],
  deliverable: {
    title: "Two finished edited videos",
    detail:
      "A short-form vertical piece and a longer horizontal piece, both mixed, captioned, colour-corrected and exported to platform specs.",
  },
  weekOutline: [
    {
      week: 1,
      theme: "Story & cutting",
      summary: "Structure, assembly, cutting on action, rhythm and pacing.",
    },
    {
      week: 2,
      theme: "Audio & captions",
      summary: "Levels, clean-up, music, sound effects and captioning.",
    },
    {
      week: 3,
      theme: "Finish & export",
      summary: "Transitions, graphics, colour and platform-specific export.",
    },
  ],
  sessions: [
    s(1, 1, "Story & Assembly", "story-assembly", [
      "Story structure",
      "Selecting footage",
      "Assembly edit",
      "Hooks and openers",
    ]),
    s(2, 1, "Cutting Craft", "cutting-craft", [
      "Cutting on action",
      "Rhythm and pacing",
      "J and L cuts",
      "Trimming dead air",
    ]),
    s(3, 2, "Audio", "audio-editing", [
      "Audio levels",
      "Noise reduction",
      "Music selection and ducking",
      "Sound effects",
      "Voiceover",
    ]),
    s(4, 2, "Captions & Text", "captions-text", [
      "Captions",
      "Caption styling",
      "Lower thirds",
      "Titles and end cards",
    ]),
    s(5, 3, "Transitions & Graphics", "transitions-graphics", [
      "Transitions",
      "When not to use them",
      "Motion graphics basics",
      "Brand consistency",
    ]),
    s(6, 3, "Colour & Export", "colour-export", [
      "Colour correction",
      "Colour grading",
      "Export settings",
      "Platform specs",
      "Final project: two finished videos",
    ]),
  ],
  faqs: [
    {
      q: "Do I need Premiere Pro?",
      a: "No. The first half is taught in CapCut, which is free and handles most Nigerian commercial work. Premiere fundamentals are covered for people moving into desktop editing, and the editing principles are identical in either tool.",
    },
    {
      q: "Is this the same as Content Creation?",
      a: "Content Creation covers planning, shooting and light editing of short-form video end to end. This course goes deep on the editing craft alone — cutting, audio, colour and export — for people who already have footage and want it to look and sound professional.",
    },
  ],
};

export const wordpress: AcademyCourse = {
  slug: "wordpress",
  title: "WordPress",
  fee: 20000,
  weeks: 3,
  sessionsPerWeek: 2,
  level: "Beginner",
  category: "Web & Code",
  rotating: true,
  hook: "Build, launch and maintain business websites on the platform clients ask for.",
  goal: [
    "WordPress powers a large share of the websites Nigerian small businesses ask for. You learn setup, themes, plugins, pages, the block editor, blogs, forms and e-commerce basics — plus the maintenance and security habits that keep a client site alive.",
  ],
  audience: [
    "Freelancers building client sites",
    "Business owners managing their own site",
    "Web Design graduates",
  ],
  requirements: [
    "A laptop",
    "A free or low-cost hosting plan for the final project",
    "Basic computer literacy",
  ],
  outcomes: [
    "Install and configure WordPress on hosting",
    "Choose and customise a theme without breaking it",
    "Build pages, menus, blogs and contact forms",
    "Install and evaluate plugins safely",
    "Back up, update and secure a live site",
  ],
  deliverable: {
    title: "A live business website",
    detail:
      "A published multi-page WordPress business site with navigation, blog, contact form and working backups, on real hosting.",
  },
  weekOutline: [
    {
      week: 1,
      theme: "Setup & themes",
      summary: "Hosting, installation, dashboard, themes and customisation.",
    },
    { week: 2, theme: "Building the site", summary: "Pages, blocks, menus, blog and plugins." },
    {
      week: 3,
      theme: "Launch & maintenance",
      summary: "Forms, e-commerce basics, security, backups, updates and launch.",
    },
  ],
  sessions: [
    s(1, 1, "Setup & Dashboard", "setup-dashboard", [
      "WordPress setup",
      "Hosting options",
      "Installation",
      "Dashboard tour",
      "Settings that matter",
    ]),
    s(2, 1, "Themes & Customisation", "themes-customisation", [
      "Themes",
      "Choosing a theme",
      "Customiser",
      "Child themes",
      "What breaks themes",
    ]),
    s(3, 2, "Pages & the Block Editor", "pages-block-editor", [
      "Pages",
      "Block editor",
      "Reusable blocks",
      "Menus and navigation",
      "Media library",
    ]),
    s(4, 2, "Blog & Plugins", "blog-plugins", [
      "Blog",
      "Categories and tags",
      "Plugins",
      "Evaluating plugin safety",
      "Conflicts and how to diagnose them",
    ]),
    s(5, 3, "Forms & Business Features", "forms-business-features", [
      "Contact forms",
      "WhatsApp integration",
      "Basic e-commerce",
      "SEO settings",
      "Analytics",
    ]),
    s(6, 3, "Security, Backups & Launch", "security-backups-launch", [
      "Security basics",
      "Backups",
      "Updates",
      "Performance basics",
      "Launching and handing over to a client",
    ]),
  ],
  faqs: [
    {
      q: "Do I need to know how to code?",
      a: "No. WordPress is built to work without code, and this course is taught that way. Understanding HTML and CSS from Web Design makes you significantly more capable — especially when a theme does something you need to override — but it is not required.",
    },
    {
      q: "What does the hosting cost?",
      a: "Nigerian shared hosting for a small WordPress site typically runs a few thousand naira a month, and a .com domain roughly ₦10,000–₦18,000 a year. You can build everything on a free local install first and only pay when you launch. We show you both paths.",
    },
  ],
};

export const dataAnalytics: AcademyCourse = {
  slug: "data-analytics",
  title: "Data Analytics",
  fee: 25000,
  weeks: 4,
  sessionsPerWeek: 2,
  level: "Intermediate",
  category: "Office & Data",
  rotating: true,
  hook: "Clean messy data, find the story in it and present it so people act.",
  goal: [
    "Business analytics with the tools Nigerian companies actually run: advanced Excel, data cleaning, charts and dashboards, then reading and presenting findings. You finish with a dashboard built on a real messy dataset and a written recommendation.",
  ],
  audience: [
    "Excel users ready to go deeper",
    "Business and finance staff",
    "Graduates targeting analyst roles",
  ],
  requirements: [
    "Microsoft Excel or Google Sheets",
    "Data Entry or Microsoft Office (or equivalent)",
    "A laptop",
  ],
  outcomes: [
    "Clean and validate a messy real-world dataset",
    "Build pivot tables and summary analysis",
    "Choose the right chart and build dashboards",
    "Write findings and recommendations a manager can act on",
  ],
  deliverable: {
    title: "A dashboard and an analysis note",
    detail:
      "An interactive Excel or Sheets dashboard over a real messy dataset, plus a one-page written analysis stating what the data shows and what to do about it.",
  },
  weekOutline: [
    {
      week: 1,
      theme: "Data & cleaning",
      summary: "Data types, structures, cleaning, validation and transformation.",
    },
    {
      week: 2,
      theme: "Analysis",
      summary: "Formulas, lookups, pivot tables and summary statistics.",
    },
    { week: 3, theme: "Visualisation", summary: "Chart selection, dashboards and layout." },
    {
      week: 4,
      theme: "Reporting",
      summary: "Interpretation, storytelling with data and the final project.",
    },
  ],
  sessions: [
    s(1, 1, "Data Structure & Types", "data-structure-types", [
      "Data types",
      "Tidy data",
      "Sources of messy data",
      "Planning a dataset",
    ]),
    s(2, 1, "Cleaning & Validation", "cleaning-validation", [
      "Data cleaning",
      "Text functions",
      "Duplicates",
      "Missing values",
      "Validation rules",
    ]),
    s(3, 2, "Formulas & Lookups", "formulas-lookups", [
      "Conditional logic",
      "Lookups",
      "Date and text handling",
      "Combining datasets",
    ]),
    s(4, 2, "Pivot Tables & Summaries", "pivot-tables-summaries", [
      "Pivot tables",
      "Grouping",
      "Calculated fields",
      "Summary statistics",
    ]),
    s(5, 3, "Choosing & Building Charts", "charts", [
      "Chart selection",
      "Bar, line, pie and scatter",
      "Chart formatting",
      "What misleads people",
    ]),
    s(6, 3, "Dashboards", "dashboards", [
      "Dashboard layout",
      "Slicers and filters",
      "Conditional formatting",
      "Keeping it fast",
    ]),
    s(7, 4, "Reading the Numbers", "reading-numbers", [
      "Basic analysis",
      "Trends and comparisons",
      "Correlation vs causation",
      "Sample size honesty",
    ]),
    s(8, 4, "Storytelling & Final Project", "storytelling-final-project", [
      "Storytelling with data",
      "Writing recommendations",
      "Presenting to a manager",
      "Final project: dashboard and analysis note",
    ]),
  ],
  faqs: [
    {
      q: "Do I need to know programming?",
      a: "No. This course uses Excel and Google Sheets, which is what most Nigerian business analysis actually runs on. Python, SQL and Power BI are the natural next step and we tell you when it becomes worth learning them.",
    },
    {
      q: "What level of Excel do I need before starting?",
      a: "You should be comfortable with basic formulas, sorting and filtering — the content of the Microsoft Office course's Excel sessions. If those feel unfamiliar, take Microsoft Office first.",
    },
  ],
};

export const computerNetworking: AcademyCourse = {
  slug: "computer-networking",
  title: "Computer Networking",
  fee: 25000,
  weeks: 3,
  sessionsPerWeek: 2,
  level: "Intermediate",
  category: "Hardware & Security",
  rotating: true,
  hook: "Understand, build and troubleshoot the networks every business depends on.",
  goal: [
    "Network fundamentals, IP addressing, routers, switches and Wi-Fi, then systematic network troubleshooting with real equipment. You finish by diagnosing and fixing deliberately broken network scenarios.",
  ],
  audience: [
    "IT support staff",
    "Cybersecurity students",
    "Anyone installing networks for small offices",
  ],
  requirements: [
    "Basic computer literacy",
    "Computer Repairs or equivalent is helpful",
    "No tools required",
  ],
  outcomes: [
    "Explain how data moves across a network in plain terms",
    "Configure IP addressing, subnetting basics, routers and switches",
    "Set up and secure a small-office Wi-Fi network",
    "Troubleshoot connectivity problems systematically",
  ],
  deliverable: {
    title: "A working configured network",
    detail:
      "A small office network you plan, address, configure and troubleshoot, with the addressing scheme and configuration documented.",
  },
  weekOutline: [
    {
      week: 1,
      theme: "Fundamentals",
      summary: "How networks work, models, addressing and hardware.",
    },
    {
      week: 2,
      theme: "Routers, switches & Wi-Fi",
      summary: "Configuring the devices and securing wireless access.",
    },
    { week: 3, theme: "Troubleshooting", summary: "Systematic diagnosis and the final practical." },
  ],
  sessions: [
    s(1, 1, "Network Fundamentals", "network-fundamentals", [
      "Network fundamentals",
      "LAN, WAN, internet",
      "The layered model in plain terms",
      "Cables and media",
    ]),
    s(2, 1, "IP Addressing", "ip-addressing", [
      "IP addressing",
      "IPv4 and IPv6",
      "Subnet masks",
      "DHCP and static",
      "NAT basics",
    ]),
    s(3, 2, "Routers & Switches", "routers-switches", [
      "Routers",
      "Switches",
      "Basic configuration",
      "Port and VLAN concepts",
    ]),
    s(4, 2, "Wi-Fi", "wifi-setup", [
      "Wi-Fi",
      "Standards and bands",
      "SSID and security settings",
      "Placement and coverage",
      "Guest networks",
    ]),
    s(5, 3, "Troubleshooting Tools", "troubleshooting-tools", [
      "ping, tracert and path testing",
      "DNS problems",
      "DHCP problems",
      "Reading a router's status pages",
    ]),
    s(6, 3, "Network Troubleshooting Practical", "network-troubleshooting-practical", [
      "Network troubleshooting",
      "Controlled fault scenarios",
      "Documentation",
      "Final practical",
    ]),
  ],
  faqs: [
    {
      q: "Do I need my own networking equipment?",
      a: "No. The academy provides routers, switches and cables for the practical sessions, and simulation tools cover the scenarios we cannot physically build in a classroom.",
    },
    {
      q: "How does this relate to the Cybersecurity course?",
      a: "Networking is the foundation security sits on. Taking this before or alongside Cybersecurity makes the network and web security sessions far more meaningful, because you understand what you are protecting.",
    },
  ],
};

export const itSupport: AcademyCourse = {
  slug: "it-support",
  title: "IT Support",
  fee: 20000,
  weeks: 3,
  sessionsPerWeek: 2,
  level: "Beginner",
  category: "Hardware & Security",
  rotating: true,
  hook: "The helpdesk skills that get you hired: troubleshooting, support and documentation.",
  goal: [
    "Helpdesk fundamentals: how support is actually run, structured troubleshooting, supporting users who cannot describe the problem, hardware and software support, account and permission basics, and the documentation habit that makes a support team scalable.",
  ],
  audience: [
    "People targeting their first IT job",
    "Office staff who have become the unofficial IT person",
    "Computer Repairs graduates",
  ],
  requirements: ["Computer Repairs or basic hardware familiarity", "A laptop or academy machine"],
  outcomes: [
    "Run a structured troubleshooting process on any reported fault",
    "Support non-technical users patiently and effectively",
    "Handle accounts, permissions, printers and software installation",
    "Log and document support work properly",
    "Escalate correctly instead of guessing",
  ],
  deliverable: {
    title: "A support playbook",
    detail:
      "A written troubleshooting and support playbook covering the ten most common faults, with diagnostic steps, fixes and escalation rules — the document a real helpdesk runs on.",
  },
  weekOutline: [
    {
      week: 1,
      theme: "Helpdesk fundamentals",
      summary: "How support works, triage, tickets and structured troubleshooting.",
    },
    {
      week: 2,
      theme: "User, hardware & software support",
      summary: "Supporting people, devices, printers, accounts and software.",
    },
    {
      week: 3,
      theme: "Documentation & practice",
      summary: "Documentation, escalation and the final support simulation.",
    },
  ],
  sessions: [
    s(1, 1, "How Support Works", "how-support-works", [
      "Helpdesk fundamentals",
      "Triage and priority",
      "Tickets",
      "Service levels",
      "What good support looks like",
    ]),
    s(2, 1, "Structured Troubleshooting", "structured-troubleshooting", [
      "Troubleshooting",
      "Reproducing the problem",
      "Isolating the cause",
      "Testing the fix",
      "Confirming with the user",
    ]),
    s(3, 2, "User Support", "user-support", [
      "User support",
      "Talking to non-technical users",
      "Remote support",
      "Password and account resets",
      "Patience and professionalism",
    ]),
    s(4, 2, "Hardware & Software Support", "hardware-software-support", [
      "Hardware/software support",
      "Printers",
      "Software installation",
      "Updates and patches",
      "Common fault patterns",
    ]),
    s(5, 3, "Documentation", "documentation-support", [
      "Documentation",
      "Knowledge base articles",
      "Ticket notes that help the next person",
      "Asset records",
    ]),
    s(6, 3, "Support Simulation", "support-simulation", [
      "Escalation",
      "Simulated support calls",
      "Final project: support playbook",
    ]),
  ],
  faqs: [
    {
      q: "Is this a technical or a customer-service course?",
      a: "Both, deliberately. Most people fail at IT support not because they cannot fix things but because they cannot work out what is actually wrong from a vague description, or explain the fix calmly. We train both halves.",
    },
    {
      q: "What jobs does this lead to?",
      a: "Helpdesk and IT support officer roles in schools, hospitals, banks, logistics firms and any office with computers — one of the most common first IT jobs in Nigeria, and a solid route into networking, security or systems administration.",
    },
  ],
};

/** Every course published on the flyer, in flyer order. */
export const flyerCourses: AcademyCourse[] = [
  microsoftOffice,
  computerBasicsTyping,
  graphicDesign,
  webDesign,
  digitalMarketing,
  socialMediaManagement,
  dataEntry,
  computerRepairs,
  webDevelopment,
  cybersecurity,
  businessFreelancing,
  contentCreation,
  onlineTeaching,
];

/** Short courses that rotate through the timetable ("and more"). */
export const rotatingCourses: AcademyCourse[] = [
  digitalProductivity,
  aiProductivity,
  mobileAppDevelopment,
  photography,
  videoEditing,
  wordpress,
  dataAnalytics,
  computerNetworking,
  itSupport,
];

export const allCourses: AcademyCourse[] = [...flyerCourses, ...rotatingCourses];
