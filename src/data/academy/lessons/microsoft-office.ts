import type { SessionLecture } from "../types";

/**
 * Microsoft Office — ₦15,000 · 3 weeks · 6 sessions.
 * Full class lectures, one per session.
 */
export const microsoftOfficeLessons: Record<string, SessionLecture> = {
  "word-fundamentals": {
    summary:
      "Before you format anything you need to know where things live and, more importantly, how to keep your work. This session covers the Word interface, creating and saving documents, file formats and the editing operations you will use in every document you ever write.",
    objectives: [
      "Open Word and create a new document from a blank page",
      "Name and describe the ribbon, document area and status bar",
      "Save, Save As, and choose the correct file format for the job",
      "Create folders and organise documents so you can find them later",
      "Select, copy, cut, paste, undo and redo without losing work",
      "Use the twelve keyboard shortcuts that cover most daily work",
    ],
    blocks: [
      {
        heading: "What Word is actually for",
        body: [
          "Microsoft Word is a word processor — software for producing text documents that other people will read, print or edit. That sounds obvious, but the distinction matters because it tells you when Word is the wrong tool. Word is excellent for anything with a beginning, a middle and an end that flows down a page: letters, reports, CVs, proposals, minutes, church bulletins, contracts, school assignments. It is poor for lists you need to calculate over (that is Excel), for pages you need to design visually (that is graphic design or a layout tool), and for anything more than a few pages where the layout must never move (that is a PDF, which you make by exporting from Word).",
          "In Nigerian workplaces Word is the default. Job applications arrive as .docx or PDF. Minutes of meetings are Word documents. Church programmes, school notices, quotations and memos are Word documents. Learning Word is not about learning software; it is about being able to produce the artefacts that work actually consists of.",
        ],
      },
      {
        heading: "The interface: where everything lives",
        body: [
          "Word's screen has five parts you need to be able to name. The **ribbon** is the strip of tabs across the top — File, Home, Insert, Design, Layout, References, Mailings, Review, View. Each tab opens a group of related commands; Home holds formatting, Insert adds objects, Layout controls the page itself. The **document area** is the white page in the middle where your text goes. The **status bar** along the bottom shows the page number, word count and zoom slider, and it is the first place to look when something seems wrong. The **Quick Access Toolbar** sits top-left and can be customised to hold the commands you use constantly. And the **scroll bar** on the right moves you through the document.",
          "Notice the logic: the ribbon is organised by *what you are doing*, not alphabetically. If you want to change how text looks, it is on Home. If you want to add a picture or a table, it is on Insert. If you want to change the paper size or margins, it is on Layout. Once you internalise that pattern you stop hunting and start knowing. Spend five minutes clicking through every tab now, without trying to memorise anything — familiarity beats memorisation.",
        ],
      },
      {
        heading: "Creating, saving and the file formats that matter",
        body: [
          "There are two save commands and beginners constantly confuse them. **Save** (Ctrl+S) overwrites the current file — it keeps your changes in the same place, with the same name. **Save As** (F12, or File → Save As) creates a new file: a new name, a new location, or a new format. You use Save As the first time you save anything, and every time you want a copy rather than a replacement. The most common beginner disaster is opening an old document, changing it, pressing Save, and destroying the original — always use Save As to make a working copy first.",
          "The formats you must know: **.docx** is the modern Word format and the one you work in. **.pdf** is a fixed-layout format that looks identical on every device and cannot be casually edited — you send PDFs to clients, employers and printers, never .docx, because a .docx can shift when opened on someone else's machine. **.doc** is the pre-2007 format; you will receive these from older offices and should convert them to .docx. **.rtf** and **.txt** are plain formats used for moving text between systems without formatting. **.odt** is the open format used by LibreOffice, which matters if you ever work on a machine without Microsoft Office.",
        ],
      },
      {
        heading: "Files and folders: the habit that saves you",
        body: [
          "Every document lives somewhere, and 'somewhere' is either deliberate or accidental. Create a folder structure the first day and use it forever: a top folder named for the year or the course, with sub-folders by subject — `2026/CEA-Office/Word`, `2026/CEA-Office/Excel`, and so on. Name files so a stranger could understand them in six months: `2026-09-12_CV_Adebayo-Okafor.docx` beats `cv final final 2.docx` every time. Dates first, then subject, then version — that pattern sorts correctly and never confuses you.",
          "Windows makes this easy: right-click in any folder → New → Folder. Use Ctrl+N inside File Explorer for the same thing. Learn the difference between a file (a document, a picture, a program) and a folder (a container for files and other folders). Then learn to move between them with the address bar and the back button, because hunting through double-clicks is the slowest way to work.",
        ],
      },
      {
        heading: "Selecting text: the skill nobody teaches",
        body: [
          "Almost every formatting mistake begins with a selection mistake. You cannot format what you have not selected, and Word offers six ways to select, each faster for a different job. Click and drag for a phrase. Double-click a word to select the word. Triple-click anywhere in a paragraph to select the paragraph. Click at the start, hold Shift, click at the end to select everything between two points — this is the professional method and it is precise. Ctrl+A selects the entire document. And clicking once in the left margin beside a line selects that whole line.",
          "Then the four operations that run on selections: **Copy** (Ctrl+C) duplicates, **Cut** (Ctrl+X) removes and stores, **Paste** (Ctrl+V) inserts. Use **Paste Options** (Ctrl+V then Ctrl, or the clipboard icon) when you want to paste text only without dragging someone else's formatting into your document — this single habit prevents most 'why does my document look broken' problems. And **Undo** (Ctrl+Z) is unlimited: if you are unsure whether something will work, do it and undo it if it does not. **Redo** (Ctrl+Y) brings it back.",
        ],
      },
    ],
    demonstration: {
      intro:
        "Watch the instructor do this once, then do it yourself immediately — you will not remember it from watching.",
      steps: [
        {
          step: "Open Word",
          detail:
            "Press the Windows key, type 'Word', press Enter. Word opens to a start screen with templates. Choose 'Blank document'. Do not choose a template yet — templates hide the decisions you need to learn to make.",
        },
        {
          step: "Walk the interface",
          detail:
            "Click each ribbon tab in turn and look at what is grouped there. Point at the status bar and read the page and word count aloud. Drag the zoom slider at bottom-right and watch the page change size — note that zoom changes your view only, never the printed output.",
        },
        {
          step: "Type a paragraph about yourself",
          detail:
            "Write four or five sentences: your name, where you are from, why you are taking this course, what you want to be able to do in three weeks. Do not format anything yet.",
        },
        {
          step: "Create the folder",
          detail:
            "Open File Explorer (Windows key + E), go to Documents, right-click → New → Folder, name it `CEA-Office`. Inside it create `Word`, `Excel` and `PowerPoint`. This is where everything from this course lives.",
        },
        {
          step: "Save properly with Save As",
          detail:
            "Press F12. Navigate into the Word folder. Name the file `Session-01_Profile_YourName.docx`. Confirm 'Word Document (*.docx)' is the format. Click Save. Look at the title bar — it should now show your filename, not 'Document1'.",
        },
        {
          step: "Change something and Save",
          detail:
            "Add a sentence to your paragraph. Press Ctrl+S. Notice how fast that is and how nothing else happens — Save silently updates the same file. Now press F12 and save a copy as `Session-01_Profile_YourName_v2.docx`. You now have two files, which is exactly what Save As does.",
        },
        {
          step: "Select with each method",
          detail:
            "Double-click a word. Triple-click a paragraph. Click at the start of a sentence, hold Shift, click at its end. Click in the left margin. Ctrl+A. After each one, note what is highlighted — the shading is your confirmation.",
        },
        {
          step: "Copy, cut and paste",
          detail:
            "Select a sentence, Ctrl+C, move to the end, Ctrl+V. Select another sentence, Ctrl+X, move it somewhere else, Ctrl+V. Then use Paste Options and choose 'Keep Text Only' — compare the result.",
        },
        {
          step: "Undo and redo deliberately",
          detail:
            "Delete a paragraph on purpose. Press Ctrl+Z. Watch it come back. Press Ctrl+Y to remove it again. Click the small arrow beside Undo and see the full history — you can undo ten operations at once.",
        },
        {
          step: "Close and reopen",
          detail:
            "Close the document (Ctrl+W). Reopen it from File → Open → Recent. This proves your save worked. Closing and reopening is the honest test of whether you actually saved.",
        },
      ],
    },
    practice: {
      title: "Personal profile document",
      brief:
        "Produce a one-page personal profile and save it correctly. This is not a formatting exercise — Session 2 handles formatting. This is about producing, naming, saving and organising a real file.",
      steps: [
        "Create the folder structure: CEA-Office with Word, Excel and PowerPoint sub-folders.",
        "Open a blank document and write your full name as the first line.",
        "Write a heading line: 'Personal Profile'.",
        "Write four short paragraphs: background, education, skills, goals.",
        "Add a contact line with your phone number and email address.",
        "Save as `Session-01_Profile_YourName.docx` into the Word folder.",
        "Use Save As to make a PDF copy called `Session-01_Profile_YourName.pdf`.",
        "Close Word, reopen the file from File → Open → Recent, and confirm both files exist in your folder.",
      ],
      standard:
        "Both files exist in the correct folder with correct names, both open without error, and you can explain the difference between the .docx and .pdf versions and when you would send each.",
    },
    pitfalls: [
      {
        problem: "You press Save on an existing document and lose the original",
        fix: "Open documents you did not create read-only, or immediately use Save As to make a working copy before changing anything. Ctrl+S overwrites without asking — that is the whole problem.",
      },
      {
        problem: "You cannot find the file you just saved",
        fix: "Look at the title bar, which shows the filename and location. Or press F12 immediately after saving to see exactly where it went. If you are lost, search File Explorer for the filename.",
      },
      {
        problem: "Pasted text arrives with strange fonts and colours",
        fix: "Use Paste Options and choose 'Keep Text Only'. This strips the source formatting. Once it is in your document, your own styles apply cleanly.",
      },
      {
        problem: "You select the wrong text and format the wrong thing",
        fix: "Before applying any formatting, look at what is highlighted. If nothing is highlighted, Word applies the format to your next typed word instead — which is why text sometimes turns bold unexpectedly.",
      },
      {
        problem: "You type over existing text instead of inserting",
        fix: "You have switched on Overtype mode. Press the Insert key to toggle back, or turn it off in File → Options → Advanced.",
      },
      {
        problem: "You send a .docx to a client and it looks different on their screen",
        fix: "Send a PDF. That is what PDF is for: fixed layout that renders identically everywhere. Keep the .docx as your editable master.",
      },
    ],
    expertNotes: [
      "Set AutoRecover to five minutes (File → Options → Save). Power cuts are common and AutoSave is the cheapest insurance in computing. If you use OneDrive or SharePoint, turn on the AutoSave switch in the title bar so every keystroke is stored.",
      "Pin Word to your taskbar and learn to open it with Windows key + the pinned number. Two seconds saved on every single session adds up to real time across a course.",
      "Turn on 'Show formatting marks' (the ¶ button on Home) while you learn. It reveals spaces, tabs and paragraph marks, which makes invisible layout problems visible. Turn it off once you are comfortable.",
      "Never rely on the spacebar to push text around. Every alignment problem in a beginner document comes from spaces and tabs used for layout. Sections 2 and 3 give you the proper tools — alignment, indents, tables — and you will never go back.",
    ],
    vocabulary: [
      {
        term: "Ribbon",
        meaning:
          "The tabbed command bar across the top of Word that groups every command by what you are trying to do.",
      },
      {
        term: "Document area",
        meaning: "The central page where your text appears and where you type and edit.",
      },
      {
        term: "Status bar",
        meaning:
          "The strip along the bottom showing page number, word count, view buttons and the zoom slider.",
      },
      {
        term: "Save As",
        meaning:
          "The command that creates a new file — new name, location or format — instead of overwriting the current one.",
      },
      {
        term: ".docx",
        meaning: "The standard modern Word file format. Editable, and the format you work in.",
      },
      {
        term: "PDF",
        meaning:
          "Portable Document Format. Fixed layout that looks the same on every device; used for sending finished work.",
      },
      {
        term: "Clipboard",
        meaning:
          "Temporary storage holding whatever you last copied or cut, ready to be pasted elsewhere.",
      },
      {
        term: "Undo stack",
        meaning:
          "The running history of operations Word can reverse with Ctrl+Z. It is deep, and it is your safety net.",
      },
    ],
    homework: [
      {
        task: "Build your folder system",
        detail:
          "Create CEA-Office with Word, Excel and PowerPoint sub-folders. Inside Word, create this week's folder. Confirm you can navigate there from the Start menu without hunting.",
      },
      {
        task: "Write a 300-word document from memory",
        detail:
          "Without looking at notes, create and save a document about a topic you know well. Save it, close Word, reopen it, add two sentences, save again. The point is the save-and-reopen cycle, not the writing.",
      },
      {
        task: "Learn twelve shortcuts",
        detail:
          "Ctrl+S, F12, Ctrl+C, Ctrl+X, Ctrl+V, Ctrl+Z, Ctrl+Y, Ctrl+A, Ctrl+F, Ctrl+W, Ctrl+N, Ctrl+P. Write them on paper and use only these for one full working day.",
      },
      {
        task: "Convert one document to PDF",
        detail:
          "Take any document you have saved, use File → Export → Create PDF, and open the result. Compare it side by side with the .docx and note what changed and what did not.",
      },
    ],
    rubric: [
      {
        criterion: "File creation and saving",
        passing: "Creates a document and saves it with a sensible name in the right folder.",
        excellent:
          "Uses Save As deliberately to keep versions, names files with a date-subject pattern, and saves both .docx and .pdf.",
      },
      {
        criterion: "Interface knowledge",
        passing: "Can find a command when told which tab it is on.",
        excellent:
          "Navigates to commands independently and can explain why a command sits on the tab it does.",
      },
      {
        criterion: "Text editing",
        passing: "Selects, copies, cuts and pastes correctly using the mouse.",
        excellent:
          "Uses Shift-click and triple-click selection for precision and uses Keep Text Only when pasting foreign formatting.",
      },
      {
        criterion: "Recovery behaviour",
        passing: "Uses Undo when a mistake happens.",
        excellent:
          "Uses Undo confidently to experiment, and uses the history list to reverse multiple operations at once.",
      },
    ],
    faqs: [
      {
        q: "Is Word free?",
        a: "The desktop application requires a Microsoft 365 subscription or a one-time Office licence, though the free trial covers the course duration. Word on the web at office.com is free with a Microsoft account and handles most of this course, with a few advanced features missing. Many Nigerian students also use LibreOffice Writer, which is free and opens .docx files — the concepts are the same, the button positions differ.",
      },
      {
        q: "My document says 'Compatibility Mode'. What does that mean?",
        a: "You opened an older .doc file, so Word is restricting itself to older features so the file stays readable by old versions. Use File → Info → Convert to upgrade it to .docx, then save. You will get the full modern feature set.",
      },
      {
        q: "How do I recover a document I closed without saving?",
        a: "File → Info → Manage Document → Recover Unsaved Documents, or look in the AutoRecover folder shown in File → Options → Save. Whether anything is there depends on your AutoRecover interval, which is why you set it to five minutes today.",
      },
      {
        q: "Should I learn the mouse or the keyboard first?",
        a: "Both, but do not skip the keyboard. The mouse teaches you where things are, which is essential this week. Keyboard shortcuts teach you speed, which is what makes you employable. By session three you should be reaching for Ctrl+S without thinking.",
      },
      {
        q: "Why does my text keep jumping to the next page?",
        a: "Almost always a stray paragraph mark or a manual page break. Turn on the ¶ button on the Home tab and you will see exactly what is there. Delete the extra marks — this is the single most common layout mystery in Word and it is solved in two seconds once you can see the invisible characters.",
      },
    ],
  },

  "document-formatting": {
    summary:
      "Formatting is what turns text into a document someone takes seriously. This session covers the full character and paragraph toolkit — fonts, colour, alignment, spacing, indentation, lists, borders — plus Format Painter and Find and Replace, the two commands that make repetitive formatting take seconds instead of an hour.",
    objectives: [
      "Choose and apply fonts and sizes deliberately rather than by accident",
      "Use bold, italic, underline and colour with intent rather than decoration",
      "Control alignment, line spacing, paragraph spacing and indentation precisely",
      "Build proper bulleted and numbered lists that survive editing",
      "Apply borders and page colour, and know when not to",
      "Use Format Painter to copy formatting between blocks instantly",
      "Use Find and Replace to correct a whole document in seconds",
    ],
    blocks: [
      {
        heading: "Character formatting: fonts, size and emphasis",
        body: [
          "Fonts fall into two families and knowing which to use is half of good typography. **Serif** fonts have small strokes at the ends of letters — Times New Roman, Georgia, Garamond — and they guide the eye along long lines, which is why books and printed reports use them. **Sans-serif** fonts have plain ends — Calibri, Arial, Helvetica, Verdana — and they read better on screens and at small sizes, which is why the web and business documents use them. For most Nigerian business documents, a sans-serif at 11pt is the safe, professional default. Use one font per document; two is the maximum and only when one is a heading face and the other is body text.",
          "Size follows the same logic. Body text at 11–12pt, headings at 14–18pt, and nothing below 9pt anywhere a person must read it. Then emphasis: **bold** for headings and terms that must be found by scanning; *italic* for titles, foreign words and gentle emphasis; underline is legacy from typewriters and reads as a hyperlink on screen, so use it only for actual links. Text colour should be near-black for body (pure black on a screen is harsher than #1a1a1a) and a single accent colour for headings. Highlighting is a review tool, not a design tool — remove it before you send anything.",
        ],
      },
      {
        heading: "Paragraph formatting: the invisible half",
        body: [
          "This is where beginners lose the most marks, because paragraph formatting is invisible until it is wrong. **Alignment** has four settings: left (correct for almost everything in English, because the uneven right edge helps the eye track lines), centred (for titles and formal headings only), right (for dates and signature blocks), and justified (both edges straight — it looks formal in print but creates awkward word gaps on screen and in narrow columns, so use it only for printed documents you have checked).",
          "**Line spacing** is the space between lines within a paragraph: 1.0 is tight, 1.15 is the modern default, 1.5 reads comfortably for anything longer than a page, 2.0 is for documents that will be marked up by hand. **Paragraph spacing** is different and often confused with it: space before and after a paragraph, measured in points. Use 6–12pt after a paragraph instead of pressing Enter twice — double returns are the number one cause of documents that fall apart when edited, because every later change shifts the whole layout.",
          "**Indentation** moves a paragraph in from the margin: left indent for the whole paragraph, right indent likewise, first-line indent for the classic book style, and hanging indent for reference lists where the first line starts at the margin and the rest is pushed in. Set these in the Paragraph dialog (the small arrow in the bottom-right of the Paragraph group) rather than with tabs or spaces.",
        ],
      },
      {
        heading: "Lists: bullets and numbering",
        body: [
          "Lists make documents scannable, and Word's real lists are far better than typing dashes. Bullets (Home → Bullets) suit items with no required order — features, ingredients, points. Numbers (Home → Numbering) suit anything with sequence or that you will refer to by number — steps, clauses, requirements. Multilevel lists handle nested structure: main points numbered, sub-points lettered.",
          "The reason to use real lists rather than typing '1.' yourself is that real lists survive editing. Insert a step in the middle of a typed list and every number below it is now wrong and you must fix them by hand. Insert into a real numbered list and Word renumbers automatically. The same is true of bullets: a real list keeps consistent spacing and indentation, while typed dashes drift as soon as someone edits a line.",
        ],
      },
      {
        heading: "Borders, shading and page colour",
        body: [
          "Borders and shading live on Home (for paragraphs) and under Table Design (for tables). A single thin border under a heading, or a light shading behind a call-out box, is a professional touch. A heavy coloured border around every paragraph is not. The rule is restraint: borders are for separating things that genuinely belong apart — a warning box, a quote, a summary — not for decorating everything on the page.",
          "Page colour (Design → Page Color) tints the entire page. It is appropriate for certificates, flyers and children's materials, and inappropriate for anything that will be printed in bulk or read as a formal document, because it burns ink and reduces contrast. If you use it, choose a very light tint and check the printed result before you commit.",
        ],
      },
      {
        heading: "Format Painter and Find & Replace: the speed tools",
        body: [
          "**Format Painter** (Home → the paintbrush) copies formatting from one piece of text and applies it to another. Select the correctly formatted text, click Format Painter, then drag over the target. Double-click the brush instead of single-clicking and it stays armed, letting you apply the same formatting to many places in a row — press Esc to stop. This is how you make a 20-page document consistent in ninety seconds rather than an afternoon.",
          "**Find and Replace** (Ctrl+H) is the most under-used command in Word. It finds text and replaces it, but the power is in the options: 'Match case' to distinguish 'CEA' from 'cea'; 'Find whole words only' so replacing 'art' does not destroy 'part' and 'start'; and the Replace All button that corrects a wrong client name across a whole document in one action. Beginners fix documents by scrolling and retyping; professionals fix them with Ctrl+H. Always use 'Find Next' to inspect a few matches before committing to Replace All.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor takes one badly formatted paragraph and rebuilds it live, narrating every decision. Then you rebuild a different one yourself.",
      steps: [
        {
          step: "Show the bad version",
          detail:
            "Open a paragraph typed in mixed fonts, with double Enter between every line, spaces used for indentation, and a title typed at 11pt. Ask the class what looks wrong before changing anything — training your eye comes before training your hands.",
        },
        {
          step: "Clear the existing formatting",
          detail:
            "Select everything, Home → Clear All Formatting (the A with a pink eraser). The document returns to the default style. Starting clean is faster than fighting inherited formatting.",
        },
        {
          step: "Set the base font",
          detail:
            "With everything selected, choose Calibri 11pt. One decision, applied everywhere. Note how much more professional it looks before doing anything else.",
        },
        {
          step: "Fix paragraph spacing, not double returns",
          detail:
            "Select the body paragraphs, open the Paragraph dialog, set Spacing After to 8pt and Line Spacing to 1.15. Then delete the empty paragraphs that were being used as gaps. The document now survives editing.",
        },
        {
          step: "Format the title",
          detail:
            "Select the title line, set 18pt, Bold, Centred, Spacing After 12pt. Compare with simply making it bigger — the spacing is what makes it look like a title.",
        },
        {
          step: "Convert typed dashes into a real bulleted list",
          detail:
            "Select the lines that begin with '-'. Home → Bullets. Then add a line in the middle and show that nothing needs fixing.",
        },
        {
          step: "Apply a hanging indent to a reference list",
          detail:
            "Select the reference lines, Paragraph dialog → Special: Hanging, 1.25cm. Show how the first line starts at the margin and the rest is indented.",
        },
        {
          step: "Use Format Painter across the document",
          detail:
            "Select the correctly formatted title, double-click Format Painter, then drag over each of the three sub-headings. Press Esc. All three now match exactly.",
        },
        {
          step: "Add one border, deliberately",
          detail:
            "Select the summary paragraph, Home → Borders → Bottom Border only. Note the difference between this and boxing the whole paragraph.",
        },
        {
          step: "Fix a wrong name with Find and Replace",
          detail:
            "Ctrl+H, find 'Cyber Elias Acadamy' (misspelled), replace with 'Cyber Elias Academy', tick 'Find whole words only', click Find Next twice to verify, then Replace All. Report the count Word gives you.",
        },
      ],
    },
    practice: {
      title: "A properly formatted one-page document",
      brief:
        "You are given an unformatted page of raw text — a church announcement, a business memo or a school notice. Rebuild it to a professional standard in 45 minutes using nothing but the tools from this session.",
      steps: [
        "Clear all formatting and set one base font at 11pt.",
        "Format the title: larger, bold, centred, with spacing after.",
        "Format section headings consistently — same size, same weight, same spacing.",
        "Set paragraph spacing after to 8pt and remove all double returns.",
        "Convert any hand-typed lists into real bulleted or numbered lists.",
        "Apply one accent colour to headings only, and remove all highlighting.",
        "Use Format Painter to make every heading identical.",
        "Use Find and Replace to correct at least three deliberate errors planted in the text.",
        "Add one border or shading element where it genuinely helps — and justify the choice aloud.",
        "Save as `Session-02_Formatted_YourName.docx` and export a PDF copy.",
      ],
      standard:
        "One font family, consistent heading hierarchy, no double returns used for spacing, real lists, no stray highlighting, corrections applied, and a printed or PDF version that looks like it came from an office rather than a classroom.",
    },
    pitfalls: [
      {
        problem: "You press Enter twice to create space between paragraphs",
        fix: "Set Spacing After in the Paragraph dialog instead. Double returns break as soon as anyone edits the document and they print as visible blank lines you cannot control.",
      },
      {
        problem: "You use the spacebar or tab to indent",
        fix: "Use the Paragraph dialog's indentation settings, or the ruler's indent markers. Spaces shift the moment the font or size changes; paragraph indentation does not.",
      },
      {
        problem: "You apply bold to whole sentences for emphasis",
        fix: "Bold a phrase or a term, not a sentence. When everything is emphasised, nothing is. If a whole sentence needs emphasis, it should probably be a separate short line.",
      },
      {
        problem: "Justified text creates ugly gaps between words",
        fix: "Switch to left-aligned. Justification only works well with hyphenation enabled and a wide column; on screen and in narrow layouts it looks broken.",
      },
      {
        problem: "Format Painter copies more than you wanted",
        fix: "Select only the text whose formatting you want — not the whole paragraph including its spacing — before clicking the brush. And press Esc when done, or the next thing you select gets painted too.",
      },
      {
        problem: "Replace All destroys words you did not mean to change",
        fix: "Tick 'Find whole words only' and run Find Next a few times first. If you have already replaced everything wrongly, Ctrl+Z reverses the entire Replace All in one step — but only before you do anything else.",
      },
    ],
    expertNotes: [
      "Styles (Home → Styles) are the professional version of manual formatting: define Heading 1, Heading 2 and Normal once, apply them throughout, and change the whole document's appearance by editing the style. Session 3 uses them for headers, footers and automatic tables of contents. Start using them now even though we have not formally taught them — it is the single biggest leap from amateur to professional documents.",
      "Set your defaults once: File → Options → Advanced, or right-click the Normal style and Modify. If you always work in Calibri 11 with 8pt after, make that the default and stop setting it document by document.",
      "Use the ruler (View → Ruler) for indentation and tabs rather than the dialog box. Dragging the small triangles gives you visual control and it is much faster once you understand which triangle controls what — top for first line, bottom for hanging indent, the rectangle for the whole paragraph.",
      "Before sending any formatted document, switch to Print Layout (View → Print Layout) and read it as a page, not as a scroll. Formatting errors that are invisible on screen are obvious on a page.",
    ],
    vocabulary: [
      {
        term: "Serif / sans-serif",
        meaning:
          "The two main font families. Serif fonts have strokes at letter ends and suit print; sans-serif fonts are plain-ended and suit screens.",
      },
      {
        term: "Line spacing",
        meaning:
          "The vertical distance between lines inside one paragraph — 1.0, 1.15, 1.5 or 2.0.",
      },
      {
        term: "Paragraph spacing",
        meaning:
          "Space added before or after a whole paragraph, measured in points. The correct way to separate paragraphs.",
      },
      {
        term: "Hanging indent",
        meaning:
          "Indentation where the first line starts at the margin and subsequent lines are indented — used for reference lists.",
      },
      {
        term: "Justified",
        meaning:
          "Text aligned to both left and right margins, giving straight edges on both sides at the cost of uneven word spacing.",
      },
      {
        term: "Format Painter",
        meaning:
          "A tool that copies all formatting from selected text and applies it to other text. Double-click to use it repeatedly.",
      },
      {
        term: "Find and Replace",
        meaning:
          "A command (Ctrl+H) that locates text throughout a document and substitutes different text, optionally matching case and whole words.",
      },
      {
        term: "Style",
        meaning:
          "A saved set of formatting — font, size, colour, spacing — applied by name. Editing the style updates every paragraph using it.",
      },
    ],
    homework: [
      {
        task: "Reformat a real document",
        detail:
          "Find any poorly formatted document you own — an old assignment, a church notice, a receipt template — and reformat it to professional standard. Save before and after versions and compare them.",
      },
      {
        task: "Build a reusable letterhead",
        detail:
          "Create a one-page document with a bold title, a rule underneath, three consistently formatted section headings and a bulleted list. Save it as a template you will reuse in session 3.",
      },
      {
        task: "Practise Find and Replace on a long text",
        detail:
          "Paste a 1,000-word article into Word, deliberately introduce ten errors, then find and correct all ten using Ctrl+H with 'whole words only'. Record how long it takes.",
      },
      {
        task: "Type the formatting decisions from memory",
        detail:
          "Write down: when to use serif versus sans-serif, what size for body and headings, when justified is acceptable, and the correct way to separate paragraphs. This is the exam content.",
      },
    ],
    rubric: [
      {
        criterion: "Typographic consistency",
        passing: "One font family used throughout with sensible sizes for body and headings.",
        excellent:
          "Deliberate font choice with a stated reason, a clear hierarchy of at least three levels, and consistent spacing at every level.",
      },
      {
        criterion: "Paragraph control",
        passing:
          "Uses paragraph spacing rather than double returns and applies consistent alignment.",
        excellent:
          "Sets line and paragraph spacing, indentation and alignment from the Paragraph dialog with values chosen for the document's purpose.",
      },
      {
        criterion: "Lists",
        passing: "Uses real bulleted or numbered lists.",
        excellent:
          "Chooses bullets versus numbers correctly for the content and uses hanging or multilevel indentation where the structure demands it.",
      },
      {
        criterion: "Efficiency tools",
        passing: "Uses Format Painter or Find and Replace at least once.",
        excellent:
          "Uses both fluently, including double-click Format Painter for repeated application and whole-word matching in Replace.",
      },
      {
        criterion: "Restraint",
        passing: "Document is readable and not over-decorated.",
        excellent:
          "Every formatting choice is defensible; no stray highlighting, no unnecessary borders, one accent colour maximum.",
      },
    ],
    faqs: [
      {
        q: "Which font should I default to?",
        a: "Calibri 11pt for on-screen business documents, Georgia or Times New Roman 12pt for formal printed documents, Arial 11pt when you must be certain the recipient's machine has the font. The safest choice is a font that ships with Windows and macOS — Calibri, Arial, Georgia and Times New Roman all do.",
      },
      {
        q: "Why does my document look different on another computer?",
        a: "Usually because the other machine does not have your font and Word substituted one. Either stick to universally installed fonts, or export to PDF, which embeds the fonts and always renders identically. This is precisely why you send PDFs to clients.",
      },
      {
        q: "Is 1.5 line spacing unprofessional?",
        a: "No — it depends on the document. Academic submissions in Nigeria frequently require 1.5 or 2.0, and documents that will be annotated by hand need the room. Business correspondence and reports usually use 1.0 to 1.15. Follow the reader's expectation, not a rule.",
      },
      {
        q: "How do I make a heading style apply everywhere automatically?",
        a: "Apply a Style rather than manual formatting. Select the heading, click Heading 1 in the Styles gallery. To change every Heading 1 in the document, right-click the style, Modify, and adjust — every instance updates instantly. This is the difference between a document you can maintain and one you must rebuild.",
      },
      {
        q: "My bullets and numbers keep continuing from the previous list. How do I stop that?",
        a: "Right-click the first number and choose 'Restart at 1', or right-click and choose 'Continue Numbering' when you actually want it to continue. Word guesses, and it guesses wrong often enough that knowing the right-click menu is essential.",
      },
    ],
  },
};
