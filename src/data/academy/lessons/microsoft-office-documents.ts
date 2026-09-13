import type { SessionLecture } from "../types";

export const microsoftOfficeLessonsB: Record<string, SessionLecture> = {
  "professional-documents": {
    summary:
      "Documents that leave the building. Page setup, headers and footers, tables, images, shapes and text boxes, hyperlinks — then the three artefacts Nigerian offices ask for most: a certificate, a formal letter and a CV, finished with correct printing and PDF export.",
    objectives: [
      "Set page size, margins and orientation correctly for the job",
      "Create headers, footers and automatic page numbers",
      "Build and format tables that hold their shape",
      "Insert and position images, shapes and text boxes properly",
      "Insert working hyperlinks",
      "Produce a certificate, a formal letter and a structured CV",
      "Print correctly and export a clean PDF",
    ],
    blocks: [
      {
        heading: "Page setup: the decisions before the first word",
        body: [
          "Every document has a physical destination, and page setup exists to match it. **Page size** in Nigeria is almost always A4 (210 × 297mm); Letter is the American size and printing an A4 document on Letter paper, or the reverse, cuts off content. Set it explicitly on Layout → Size rather than trusting the default, because Word inherits it from the printer driver and shared machines change. **Margins** are the blank border: Normal (2.54cm all round) is standard, Narrow (1.27cm) fits more content but looks cramped and often fails to print because most printers cannot reach the paper edge, and Wide suits documents that will be bound. **Orientation** is Portrait for reading and Landscape for wide tables and charts — and you can mix both in one document using section breaks, which is what professional reports do.",
          "Get these three settings right before typing. Changing page size after writing reflows everything and destroys careful layout work, which is the reason beginners end up fighting their own documents in the last ten minutes before a deadline.",
        ],
      },
      {
        heading: "Headers, footers and page numbers",
        body: [
          "A header sits in the top margin of every page; a footer sits in the bottom. Insert → Header or Footer opens the header area and, crucially, switches on the Design tab with the tools that control them. Page numbers go in the footer for most documents (Insert → Page Number → Bottom of Page) and are not optional on anything longer than two pages — a printed report without page numbers cannot be referenced, filed or discussed.",
          "Three options matter. 'Different First Page' removes the header from a cover page, which is what formal reports need. 'Different Odd & Even Pages' supports double-sided printing where the header mirrors. And section breaks let you have no header on page one, Roman numerals in the front matter and Arabic numerals in the body — the pattern every dissertation and formal report uses. Type your document title or organisation name into the header once and it repeats automatically; never retype it per page.",
        ],
      },
      {
        heading: "Tables: the structure you should have been using",
        body: [
          "Tables are the correct answer to almost every layout problem beginners solve with tabs and spaces. Insert → Table, choose your rows and columns, and you get a grid where content aligns perfectly and stays aligned no matter what anyone edits. Use them for comparison data, schedules, price lists, CV work history, and for placing text beside an image.",
          "Two habits separate a working table from a broken one. First, use the Table Design and Layout tabs that appear when the cursor is inside a table: they hold cell merging, row and column sizing, alignment within cells, and border and shading control. Second, set the header row to repeat across pages (Layout → Repeat Header Rows) so a long table split over two pages still labels its columns. If a table will not stay on one page, do not fight it — right-click the row, Table Properties → Row, and untick 'Allow row to break across pages'.",
        ],
      },
      {
        heading: "Images, shapes, text boxes and hyperlinks",
        body: [
          "Insert → Pictures places an image, but the step everyone skips is **Wrap Text** (Picture Format → Wrap Text). The default 'In Line with Text' locks the image to the text line and makes it impossible to position; 'Square' or 'Tight' lets text flow around it and lets you drag it freely. 'Behind Text' puts the image under your text, which is how you make watermarks and certificate backgrounds. Then use Position and Align (Picture Format) for exact placement rather than eyeballing with the mouse.",
          "Shapes (Insert → Shapes) give you lines, arrows, boxes and callouts; Text Boxes (Insert → Text Box) give you movable containers for text that sits outside the normal flow — essential for certificates, flyers and pull quotes. Both need the same wrap-text decision. **Hyperlinks** (Ctrl+K) make text clickable: select the words, press Ctrl+K, paste the address. Never paste a raw URL into a formal document; link the words instead. For internal links, choose 'Place in This Document' to jump to a heading — that is how you build a clickable table of contents.",
        ],
      },
      {
        heading: "Certificates, letters and CVs: the three artefacts",
        body: [
          "A **certificate** is landscape, centred, uses a serif display face for the recipient's name, has a decorative border or background image set to 'Behind Text', and includes the course title, date, signatory name and space for signatures. Keep the text short — a certificate that explains too much looks amateur.",
          "A **formal letter** in the Nigerian business convention puts the sender's address top-right, the date below it, the recipient's designation and address on the left, a formal salutation ('Dear Sir/Ma' or 'Dear Mr Okafor'), a bold underlined subject line, the body in short paragraphs, then 'Yours faithfully' with signature space and the typed name underneath. Get this structure right and the letter reads as competent before anyone reads a word.",
          "A **CV** is one to two pages, reverse-chronological, with consistent section headings: personal details, personal statement, work experience (role, organisation, dates, three bullet achievements), education, skills, referees. Use a table with invisible borders to align dates against roles — that is the trick behind every clean CV. No photograph unless requested, no date of birth or state of origin unless the employer asks, and always send it as a PDF.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor builds a certificate and a formal letter from scratch, then converts a messy typed CV into a properly structured one.",
      steps: [
        {
          step: "Set up the page for a certificate",
          detail:
            "New document. Layout → Orientation → Landscape. Layout → Size → A4. Layout → Margins → Narrow. Say out loud why each choice was made.",
        },
        {
          step: "Add a decorative border",
          detail:
            "Design → Page Borders → Box, choose a style and width, set Apply to: Whole document. Show what happens if you apply it to 'This section' instead.",
        },
        {
          step: "Build the certificate text",
          detail:
            "Centre everything. Small caps line for the organisation, 'CERTIFICATE OF COMPLETION' at 28pt, 'This is to certify that' at 12pt, the recipient's name at 36pt in a serif face, the course title, then the date and two signature lines built as a two-column table with invisible borders.",
        },
        {
          step: "Use a text box for the signatory block",
          detail:
            "Insert → Text Box → Simple. Place it bottom-right, set Shape Format → Shape Fill → No Fill and Shape Outline → No Outline. Now it can be dragged anywhere without disturbing the text.",
        },
        {
          step: "Export the certificate to PDF",
          detail:
            "File → Export → Create PDF/XPS. Open it and confirm nothing moved. This is the file you print and hand out.",
        },
        {
          step: "Build the formal letter",
          detail:
            "New portrait A4 document, Normal margins. Sender address right-aligned top, date below, recipient block left-aligned, salutation, bold underlined subject line, three short body paragraphs, 'Yours faithfully', four blank lines for the signature, then the typed full name and designation.",
        },
        {
          step: "Add a footer with page numbers",
          detail:
            "Insert → Page Number → Bottom of Page → Plain Number 2 (centred). Then Insert → Header and type the organisation name, small and grey. Tick 'Different First Page' if the letter has a letterhead.",
        },
        {
          step: "Rebuild a CV with a borderless table",
          detail:
            "Insert a two-column table, one row per job. Right column holds the dates, right-aligned; left column holds the role, organisation and three achievement bullets. Table Design → Borders → No Border. The dates now align perfectly and stay aligned.",
        },
        {
          step: "Add a working hyperlink",
          detail:
            "Type the words 'Portfolio' in the CV, select them, Ctrl+K, paste a URL. Show that the words are clickable and the raw address never appears.",
        },
        {
          step: "Print-preview and export",
          detail:
            "Ctrl+P to preview every page before printing. Check that nothing is cut off at the edges. Then File → Export → Create PDF for the version you email.",
        },
      ],
    },
    practice: {
      title: "Professional letter or CV, exported to PDF",
      brief:
        "Choose either a formal application letter for a real role you would want, or your own CV rebuilt to professional standard. Build it from a blank document using the correct page setup, then export to PDF.",
      steps: [
        "Set A4, correct orientation and margins before typing anything.",
        "Build the correct structure for your chosen document type — do not improvise it.",
        "Use a borderless table wherever two things must align side by side.",
        "Add a footer with page numbers if the document exceeds one page.",
        "Apply one heading style consistently to every section heading.",
        "Insert at least one working hyperlink.",
        "Proofread at 150% zoom, then proofread again in print preview.",
        "Export to PDF and open the PDF to verify nothing moved.",
        "Submit both the .docx and the .pdf.",
      ],
      standard:
        "The PDF opens on any device with identical layout, the structure matches the professional convention for that document type, alignment is achieved with tables rather than spaces, and there are no orphan headings, cut-off lines or broken images.",
    },
    pitfalls: [
      {
        problem: "Content disappears at the edge when printed",
        fix: "Your margins are narrower than the printer's physical limit, usually below 1cm. Set margins to at least 1.27cm and check print preview, which shows the true printable area.",
      },
      {
        problem: "An image will not move where you want it",
        fix: "Change Wrap Text from 'In Line with Text' to 'Square' or 'In Front of Text'. Inline images behave like a giant character and can only sit where a character can sit.",
      },
      {
        problem: "A table splits across pages with no column headings on the second page",
        fix: "Select the header row, Layout → Repeat Header Rows. Also untick 'Allow row to break across pages' if individual rows are splitting mid-cell.",
      },
      {
        problem: "Page numbers appear on your cover page",
        fix: "Header & Footer Design tab → tick 'Different First Page'. The first page then has its own empty header and footer while the rest keep the numbering.",
      },
      {
        problem: "Your CV looks fine on your screen but scrambled when you email it",
        fix: "You sent the .docx. Send the PDF — it embeds fonts and fixes the layout. Keep the .docx as your editable master and regenerate the PDF after every edit.",
      },
      {
        problem: "Text boxes and shapes print but do not appear in the exported PDF",
        fix: "Usually a 'Print drawing objects' or 'Print hidden text' setting. Check File → Options → Display, and confirm the objects are not set to a white fill on a white page.",
      },
    ],
    expertNotes: [
      "Turn on 'Keep with next' for headings (Paragraph dialog → Line and Page Breaks). It prevents a heading from being stranded at the bottom of a page with its content on the next — the most common professional-document mistake and it takes one checkbox to fix permanently.",
      "Use section breaks (Layout → Breaks → Next Page) whenever a document needs different page setup in different places: landscape tables inside a portrait report, no header on the cover, different numbering in front matter. Sections are the tool professionals use and beginners never discover.",
      "Build your certificate, letterhead and CV as Word **templates** (.dotx) once you are happy with them. File → Save As → Word Template. You then start every future document from a correct base instead of rebuilding it, which is how an office produces consistent output at speed.",
      "Name exported PDFs the same as the source with only the extension changed, and store them together. `2026-09_CV_Adebayo-Okafor.docx` and `2026-09_CV_Adebayo-Okafor.pdf` in the same folder means you never send a stale version.",
    ],
    vocabulary: [
      {
        term: "A4",
        meaning:
          "The 210 × 297mm paper size used in Nigeria and most of the world. Set it explicitly rather than trusting the default.",
      },
      {
        term: "Header / footer",
        meaning:
          "Regions in the top and bottom margins that repeat on every page — used for titles, page numbers and organisation names.",
      },
      {
        term: "Section break",
        meaning:
          "A division that lets different parts of one document have different page setup, headers or numbering.",
      },
      {
        term: "Wrap text",
        meaning:
          "The setting that controls how text flows around an image or shape. Changing it is what makes objects freely positionable.",
      },
      {
        term: "Text box",
        meaning:
          "A movable container for text that sits outside the normal document flow — used for certificates, pull quotes and overlays.",
      },
      {
        term: "Repeat header rows",
        meaning: "A table setting that reprints the header row on every page a long table spans.",
      },
      {
        term: "Keep with next",
        meaning:
          "A paragraph setting that prevents a heading from being separated from the paragraph that follows it.",
      },
      {
        term: "Template (.dotx)",
        meaning:
          "A saved document used as a starting point for new documents, preserving layout and styles.",
      },
    ],
    homework: [
      {
        task: "Produce a certificate for someone real",
        detail:
          "Design a landscape A4 certificate for a real event — a class, a church programme, a training you attended. Include a border, correct typography hierarchy and a signature block. Export to PDF.",
      },
      {
        task: "Write and send a formal letter",
        detail:
          "Write a formal letter of enquiry to a real organisation using the correct Nigerian business structure. Export to PDF. You do not have to send it, but it must be sendable.",
      },
      {
        task: "Rebuild your CV",
        detail:
          "Rebuild your CV to the standard taught in class: one to two pages, borderless tables for alignment, consistent headings, achievement bullets rather than duty lists. Export to PDF and put it in your portfolio folder.",
      },
      {
        task: "Create a reusable template",
        detail:
          "Save your best document as a .dotx template so the next version takes five minutes instead of an hour.",
      },
    ],
    rubric: [
      {
        criterion: "Page setup",
        passing: "Correct paper size, orientation and margins set before writing.",
        excellent:
          "Uses section breaks where a document needs mixed setup, and can explain the printable-area limit of the printer.",
      },
      {
        criterion: "Structure and convention",
        passing: "Document follows the recognised structure for its type.",
        excellent:
          "Follows the convention precisely, including Nigerian business letter conventions and reverse-chronological CV structure.",
      },
      {
        criterion: "Objects and alignment",
        passing: "Inserts images, tables or text boxes that stay where placed.",
        excellent:
          "Uses wrap text deliberately, aligns with tables and alignment tools rather than spaces, and controls object positioning exactly.",
      },
      {
        criterion: "Output quality",
        passing: "Exports a PDF that opens correctly.",
        excellent:
          "PDF renders identically on other devices, prints without cut-off content, and is named and stored alongside its source file.",
      },
    ],
    faqs: [
      {
        q: "How do I put an image behind my text for a certificate?",
        a: "Insert the image, then Picture Format → Wrap Text → Behind Text, and resize it to cover the page. Increase the image transparency or lighten it if your text is hard to read over it. Export to PDF and check the result, because behind-text images occasionally behave differently in print.",
      },
      {
        q: "My CV is three pages. Is that wrong?",
        a: "For a Nigerian entry-level or early-career application, yes — cut it to one or two pages. Recruiters spend seconds on a first pass. Keep achievements and relevance; remove duty descriptions that any job title already implies, old irrelevant roles, and full addresses.",
      },
      {
        q: "Should a formal letter use 'Yours faithfully' or 'Yours sincerely'?",
        a: "The convention: 'Yours faithfully' when you opened with 'Dear Sir/Ma' (you do not know the name), and 'Yours sincerely' when you opened with the person's name. It is a small detail that experienced readers notice immediately.",
      },
      {
        q: "How do I make a table's borders invisible?",
        a: "Select the table, Table Design → Borders → No Border. The gridlines you still see on screen are Word's editing guides and never print. If you cannot see them, View → tick Gridlines.",
      },
    ],
  },
};
