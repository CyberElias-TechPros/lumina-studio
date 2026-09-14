import type { SessionLecture } from "../types";

/**
 * Data Entry — ₦10,000 · 2 weeks · 4 sessions.
 * Sessions 1 and 2. (Sessions 3 and 4 live in data-entry-b.ts.)
 */
export const dataEntryLessonsA: Record<string, SessionLecture> = {
  "data-discipline": {
    summary:
      "Data entry is not typing. It is the discipline of moving information between systems without changing its meaning — and the habits that catch errors before a client does. This session builds that discipline: data types, fields, accuracy, speed, and the attention patterns that separate a professional from a liability.",
    objectives: [
      "Explain what data entry actually is as paid work, and what clients pay for",
      "Distinguish data types and explain why entering the wrong type breaks a spreadsheet",
      "Identify the components of a form, a table and a spreadsheet",
      "Define accuracy and speed correctly, and state realistic professional thresholds",
      "Describe and apply an error-catching routine rather than hoping not to make mistakes",
      "Set up a workspace and a file-naming system for data work",
    ],
    blocks: [
      {
        heading: "What data entry actually is",
        body: [
          "Data entry is the transfer of information from one place to another — paper to spreadsheet, email to a CRM, one system to a better one, an image to text — where the value lies in the transfer being correct. It is paid work in Nigeria in real volume: hospitals digitising patient records, schools entering results, logistics firms capturing waybills, e-commerce sellers loading products, accounting firms keying invoices, research projects transcribing survey responses, and remote virtual-assistant work for foreign clients who pay in dollars.",
          "What clients pay for is not keystrokes. It is the absence of errors. A retail inventory sheet with 200 wrong prices costs a business real money; a payroll sheet with one misplaced digit is a crisis; a research dataset with inconsistent entries is unusable and must be redone from source. This is why the professional standard is measured in accuracy percentage rather than speed, and why a slower, careful worker keeps clients while a fast, careless one loses them after the first audit. Understand that trade and you understand the whole job.",
        ],
      },
      {
        heading: "Data types: the root of most errors",
        body: [
          "Every piece of data has a **type**, and the type determines what can be done with it. **Text** is anything read as characters — names, addresses, product descriptions. **Numbers** can be calculated on. **Dates** can be compared and subtracted. **Currency** is a number with a money format. **Boolean** is a yes/no or true/false flag. **Identifiers** — phone numbers, account numbers, ID numbers, invoice references — look numeric but are text, because you never add two phone numbers together and a leading zero is meaningful.",
          "Getting the type wrong is the single most common data entry failure and it fails silently. Type a phone number as a number and Excel drops the leading zero and may show it in scientific notation; type a date as text and no date calculation will ever work on it; type an amount with a naira symbol by hand and it becomes text that SUM ignores. The visible symptom is a total that does not add up or a sort that produces nonsense, and by then the error is scattered across hundreds of rows. Learn to enter each type correctly at the point of entry and you eliminate the entire category.",
        ],
      },
      {
        heading: "Fields, records, forms and tables",
        body: [
          "The vocabulary matters because it is how you describe problems precisely. A **field** is one category of information — surname, phone number, amount. A **record** (or row) is one complete entry across all fields — one customer, one transaction. A **table** is a set of records sharing the same fields. A **form** is the interface for entering one record at a time, and it is safer than a raw table because it shows one record, labels each field, and can validate as you type.",
          "The rule that follows is **one fact per field**. Never enter 'Adebayo Okafor — 0803 456 7890 — Lagos' into a single cell. Split it into Name, Phone and City. Combined fields cannot be sorted, filtered, searched, deduplicated or reported on, and every client request that requires any of those becomes a manual re-typing job. If you receive data already combined, splitting it is often the first task you are being paid for.",
        ],
      },
      {
        heading: "Accuracy, speed and the real thresholds",
        body: [
          "**Accuracy** is the proportion of fields entered correctly. **Speed** is throughput, usually records per hour or keystrokes per hour. They trade against each other, and the professional order is accuracy first, speed second — because speed is easy to gain with practice and accuracy is a discipline you either have or do not.",
          "Realistic thresholds in Nigerian and remote work: general business data should be at 98% field accuracy minimum, with 99.5% or better being what makes a client keep you. Financial fields — amounts, account numbers, invoice references — should be at 100%, because a single error moves money. Speed expectations for general entry sit around 35–45 words per minute equivalent, or roughly 150–250 simple records per hour depending on field count. Note what those numbers imply: at 98% accuracy across 1,000 fields you have made twenty errors, which is why verification is not optional and is the subject of session three.",
        ],
      },
      {
        heading: "The error-catching mindset",
        body: [
          "Errors are not avoided by concentration. Concentration is a finite resource and it fails on the four-hundredth row of a long session regardless of how careful you were. Errors are avoided by **process**: entering in a fixed order so you never skip a field, verifying in batches rather than at the end when the source is far away, checking totals against the source document, and reviewing at natural breakpoints rather than after hours of continuous entry.",
          "Three habits do most of the work. First, **batch and verify**: enter twenty or fifty records, then check them against the source before continuing — errors found immediately are cheap, errors found after five hundred rows require re-reading everything. Second, **spot-check by column**: after a batch, scan one field down the whole column; inconsistencies in format, spelling or type jump out vertically in a way they never do horizontally. Third, **stop when you are tired**. Error rates climb steeply with fatigue, and the last hour of a long session produces most of the mistakes. Take a real break every forty-five minutes.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor enters a set of records live — deliberately making the classic mistakes — then shows the class how each mistake is caught, and what it would have cost in a real client deliverable.",
      steps: [
        {
          step: "Show the source document",
          detail:
            "Display a paper-style customer list with names, phone numbers, cities and amounts. Point out that the source is messy — inconsistent capitalisation, one missing phone number, one amount written in words.",
        },
        {
          step: "Set up the spreadsheet correctly",
          detail:
            "Create headers in row 1: Surname, First Name, Phone, City, Amount, Date Joined. Explain that the structure is decided before any typing starts, and that changing it later means redoing the work.",
        },
        {
          step: "Make the combined-field mistake",
          detail:
            "Deliberately enter 'Adebayo Okafor — 08034567890' into one cell, then try to sort by surname. Show that it cannot be done. Split the field and sort again.",
        },
        {
          step: "Make the phone number mistake",
          detail:
            "Enter 08034567890 into a General-format cell and show Excel dropping the leading zero and switching to scientific notation. Format the column as Text, retype it, and confirm the zero survives.",
        },
        {
          step: "Make the date mistake",
          detail:
            "Enter a date in an ambiguous form and show it landing left-aligned as text. Retype it correctly, confirm it right-aligns, then subtract two dates to prove the difference only works on real dates.",
        },
        {
          step: "Make the currency mistake",
          detail:
            "Type '₦45,000' by hand into a cell, then run SUM over the column and show it ignoring the entry. Retype as 45000, apply Accounting format, and show the total change.",
        },
        {
          step: "Demonstrate batch verification",
          detail:
            "Enter ten records, then verify all ten against the source before continuing. Narrate the difference in cost between catching an error now and catching it after row 500.",
        },
        {
          step: "Demonstrate the column scan",
          detail:
            "After entering twenty records, scan the City column top to bottom and point out three inconsistent spellings of the same city. Show that the inconsistency is invisible horizontally and obvious vertically.",
        },
        {
          step: "Check the total against the source",
          detail:
            "Sum the Amount column and compare with the source document's stated total. Show what a mismatch tells you — that at least one amount is wrong — even though it does not tell you which.",
        },
        {
          step: "Set up the file-naming system",
          detail:
            "Save the file as 2026-09-13_ClientName_CustomerRegister_v1.xlsx into a dated project folder. Explain the naming pattern and why versions matter when a client asks what changed.",
        },
      ],
    },
    practice: {
      title: "Enter, mistype, and catch it",
      brief:
        "You enter a thirty-record dataset from a messy source, deliberately introducing three typed errors in your first pass, then find all three using the verification methods from this session. The point is learning to catch errors, not to avoid them.",
      steps: [
        "Create a spreadsheet with the headers: Surname, First Name, Phone, City, Amount, Date Joined.",
        "Format the Phone column as Text and the Amount column as Accounting before typing anything.",
        "Enter thirty records from the source sheet, one fact per field.",
        "Deliberately introduce three errors: one wrong digit in a phone number, one wrong amount, one misspelt city.",
        "Verify the first ten records against the source and find any error in that batch.",
        "Scan each column top to bottom, looking for inconsistencies.",
        "Sum the Amount column and compare with the source total.",
        "Locate all three planted errors and correct them.",
        "Write a two-line note describing how you found each one.",
        "Save with the date-client-subject-version naming pattern.",
      ],
      standard:
        "All fields correctly typed with the correct data types, no combined fields, all three planted errors found and corrected, and a written note that names the verification method that caught each one rather than saying 'I looked again'.",
    },
    pitfalls: [
      {
        problem: "You enter phone numbers or ID numbers as numeric values",
        fix: "Format the column as Text before typing, or prefix with an apostrophe. Identifiers are not quantities — leading zeros are meaningful and they are never added together.",
      },
      {
        problem: "You type currency symbols into the cells",
        fix: "Type plain numbers and apply a currency number format. A hand-typed symbol turns the value into text, which SUM silently ignores.",
      },
      {
        problem: "You combine several facts into one field",
        fix: "One fact per field. If the source combines them, splitting them is the job. Combined fields cannot be sorted, filtered, deduplicated or reported.",
      },
      {
        problem: "You verify only at the very end",
        fix: "Verify in batches of twenty or fifty, immediately. An error caught on row 30 costs ten seconds; the same error caught on row 500 means re-reading everything.",
      },
      {
        problem: "You work for hours without a break and your error rate climbs",
        fix: "Break every forty-five minutes. Fatigue raises error rates faster than any other factor, and the mistakes made in the final hour are the ones that reach the client.",
      },
      {
        problem: "You fill gaps with guesses",
        fix: "Leave a cell empty and flag it. An honest blank with a query note is professional; a plausible guess that turns out wrong destroys trust in every other field you entered.",
      },
    ],
    expertNotes: [
      "Decide the structure before you type a single character. Every minute spent deciding field names, order and data types saves ten minutes of restructuring later, and restructuring a half-finished sheet is where most data jobs go badly wrong.",
      "Format columns before entering data, not after. Excel converts as you type, so a column formatted as Text keeps your leading zeros while a General column destroys them silently. Setting formats first is a five-second habit that prevents an hour of cleanup.",
      "Keep the source document visible beside your work at all times, ideally on a second screen or split view. Every time you look away and back you introduce a chance of skipping a row, and skipped rows are the hardest errors to detect after the fact.",
      "Count your rows against the source when you finish. If the source has 480 records and your sheet has 479, you missed one — and that single check catches the most dangerous error type, because a missing record is invisible in every other check.",
    ],
    vocabulary: [
      { term: "Field", meaning: "One category of information — a column. Examples: surname, phone, amount." },
      { term: "Record", meaning: "One complete entry across all fields — a row. One customer, one transaction." },
      { term: "Data type", meaning: "The kind of value a field holds: text, number, date, currency, boolean. Wrong types fail silently." },
      { term: "Identifier", meaning: "A number-like value that is really text — phone, account, ID, invoice reference. Never formatted as a number." },
      { term: "Field accuracy", meaning: "The proportion of individual fields entered correctly. The metric clients actually care about." },
      { term: "Batch verification", meaning: "Checking a small group of records against the source immediately after entering them." },
      { term: "Column scan", meaning: "Reading one field down the whole column to spot inconsistencies that are invisible horizontally." },
      { term: "Source document", meaning: "The original material you are transcribing from. Keep it visible throughout." },
    ],
    homework: [
      {
        task: "Design a register for something real",
        detail:
          "Choose something you actually track — church attendance, shop sales, class results — and design the field structure: name each field, state its data type, and say why. Bring the design to the next session.",
      },
      {
        task: "Enter fifty records from a messy source",
        detail:
          "Take any real list you can find and enter it with correct types, one fact per field, verifying every twenty records. Report your accuracy and how long it took.",
      },
      {
        task: "Practise the column scan",
        detail:
          "After entering your fifty records, scan each column vertically and list every inconsistency you find — spelling, capitalisation, format. This exercise trains the eye that gets you kept.",
      },
      {
        task: "Write your error-catching routine",
        detail:
          "In five lines, write the routine you will follow on every data job: order of entry, batch size, verification method, break schedule. Having it written means you follow it when tired.",
      },
    ],
    rubric: [
      {
        criterion: "Structure",
        passing: "Uses separate fields with headers in row 1.",
        excellent: "Decides and documents the structure before entry, with a stated data type for every field.",
      },
      {
        criterion: "Data types",
        passing: "Most values entered with the correct type.",
        excellent: "Identifiers stored as text, amounts as real numbers, dates as real dates, with formats applied before entry.",
      },
      {
        criterion: "Verification",
        passing: "Verifies work at some point.",
        excellent: "Verifies in batches immediately, scans by column, reconciles totals and counts rows against the source.",
      },
      {
        criterion: "Error detection",
        passing: "Finds at least two of the three planted errors.",
        excellent: "Finds all three and can name the specific method that caught each one.",
      },
      {
        criterion: "Professional habits",
        passing: "Files named sensibly and work saved correctly.",
        excellent: "Uses the date-client-subject-version pattern, flags gaps rather than guessing, and keeps the source visible throughout.",
      },
    ],
    faqs: [
      {
        q: "Is data entry still a real job with AI around?",
        a: "Yes, but the shape has changed. Clean retyping of legible documents is being automated. What still pays is the messy middle: reconciling two systems that disagree, cleaning historical records, verifying entries against source documents, and owning a register a business depends on. This course teaches the verification and cleaning half, which is the half that survives automation.",
      },
      {
        q: "What accuracy do I need to be paid?",
        a: "98% field accuracy is the working minimum for general business data and 99.5% or better is what keeps a client. Financial fields should be 100%. Session four tests you at those thresholds and shows you how to structure work so errors get caught before delivery.",
      },
      {
        q: "Can I do this work remotely for foreign clients?",
        a: "Yes, and it is where the better rates are. Remote data entry and virtual-assistant roles are commonly advertised on Upwork, OnlineJobs.ph-style boards and through referrals, and they pay in dollars. What gets you the work is a demonstrated accuracy figure and a sample of clean work — which is exactly what the session-four practical gives you.",
      },
      {
        q: "My typing is slow. Can I still take this course?",
        a: "Yes. Slow and accurate beats fast and wrong every time in this work, and speed improves with the drills. If your typing is very slow, Typing & Computer Basics first will make the timed practical in session four far more comfortable.",
      },
      {
        q: "What software do I need?",
        a: "Microsoft Excel or Google Sheets — either is fine and the skills transfer directly, because concepts matter more than buttons. Some clients specify one or the other, and being comfortable in both is a genuine advantage in remote work.",
      },
    ],
  },

  "spreadsheets-for-data-work": {
    summary:
      "The spreadsheet is where data entry lives. This session covers the parts of Excel and Google Sheets that data work actually depends on — structure, rows and columns, formatting for each data type, dates, names, phone numbers and addresses — then sorting, filtering and removing duplicates to clean what you have entered.",
    objectives: [
      "Work fluently in both Microsoft Excel and Google Sheets",
      "Structure a sheet so it stays usable as it grows to thousands of rows",
      "Apply the correct format to each data type before entering data",
      "Handle dates, names, phone numbers and addresses so they sort and search correctly",
      "Sort data by one or more columns without scrambling rows",
      "Filter a dataset to inspect or extract a subset",
      "Find and remove duplicate records safely",
    ],
    blocks: [
      {
        heading: "Excel and Sheets: the same ideas, two interfaces",
        body: [
          "Microsoft Excel and Google Sheets are the two tools this work is done in, and they share almost every concept: rows, columns, cells, references, formats, sorting, filtering. The differences that matter in practice are that Excel is what Nigerian employers and government forms assume, is faster on very large files, and has the deeper feature set; while Google Sheets is free, lives in the browser, saves automatically, and allows several people to edit at once — which is why remote clients often prefer it.",
          "Learn Excel first, because its concepts are a superset and Sheets will feel familiar within an afternoon. Two Sheets-specific habits are worth knowing early: it stores everything in Drive so there is no save step, and its menu equivalents live under Data rather than under the Home ribbon. If a client sends you a .xlsx and you open it in Sheets, be careful about formats on download — round-tripping through the two tools can alter date and number formatting, so check a sample after converting.",
        ],
      },
      {
        heading: "Structure that survives growth",
        body: [
          "A data sheet has one job structurally: be a clean rectangle. **Headers in row 1**, one per column, named clearly and consistently — no merged header cells, no two-row titles, no decorative banner above the data. **Data from row 2 downward**, one record per row, with **no blank rows inside the data** — Excel and Sheets both detect the extent of a dataset by finding the first blank row, so one stray blank row silently truncates every sort, filter and formula range you apply. And **no merged cells anywhere in the data**: a merged cell stores its value in only the top-left position, so the others read as empty and sorting breaks.",
          "Then make it a real table. In Excel, select the data and press **Ctrl+T** to convert it to a Table; in Sheets, use Data → Create a filter or Data → Named ranges. A table gives you filter buttons, banded rows that make scanning easier, a header that repeats when printing, and — most valuable — automatic expansion, so new rows inherit the column's format and formulas instead of arriving unformatted and silently outside your ranges.",
        ],
      },
      {
        heading: "Formatting each data type correctly",
        body: [
          "**Dates** are the most common source of quiet failure. Excel and Sheets store dates as serial numbers, which is what makes date arithmetic possible — subtract one date from another and you get days. But that only works if the value was recognised as a date, and the giveaway is alignment: real dates and numbers right-align, text left-aligns. If your date sits on the left, it is text and no calculation will ever work on it. Enter dates in an unambiguous form and let the number format handle display, because 03/04/2026 means April the third to some people and the third of April to others.",
          "**Names** need consistency more than correctness. Decide once whether you store Surname and First Name in separate columns (recommended, because it sorts and searches properly) or a single Full Name column, and whether you use Title Case throughout. Inconsistent capitalisation — 'adebayo', 'ADEBAYO', 'Adebayo' in the same column — breaks deduplication and looks unprofessional in any report. Use PROPER() to fix a whole column at once if you inherit a mess.",
          "**Phone numbers** are text, always. Format the column as Text before typing, or prefix with an apostrophe, so the leading zero survives and the value never becomes scientific notation. Decide on one format — `0803 456 7890` is the most readable Nigerian convention — and apply it consistently, because mixed formats make deduplication impossible. **Addresses** should be split into at least Street, City and State; a single address blob cannot be filtered by city, which is one of the first things a client asks for.",
        ],
      },
      {
        heading: "Sorting: asking a question of your data",
        body: [
          "Sorting reorders rows so patterns become visible. Excel: Data → Sort. Sheets: Data → Sort range. You can sort by one column or add levels — sort by City, then within each city by Surname — which is how you produce a grouped report. The rule that prevents disaster is to **always sort the whole table, never a single column**. Sorting one column alone shuffles it against the others and destroys the relationship between a name and its phone number, which is a data-integrity failure you may not notice for weeks. If the tool prompts 'Expand the selection', choose it; if you have used a real Table, the problem cannot arise.",
          "Sorting is also your best error-finding tool. Sort a numeric column ascending and the outliers appear at both ends — an amount ten times larger than the rest, or a negative value that should not exist. Sort a text column and the inconsistencies group together, so 'LAGOS', 'Lagos' and 'lagos' sit adjacent and become obvious. Sort by date and the impossible entries — a 1900 date, a future date — surface immediately. Whenever a dataset feels wrong, sort it; it is faster than reading.",
        ],
      },
      {
        heading: "Filtering and removing duplicates",
        body: [
          "**Filtering** hides rows that do not match a condition while leaving the data intact. Turn on filter buttons (Data → Filter), then use the dropdown on any column to tick specific values or apply conditions such as 'greater than' or 'contains'. This is how you answer a client question in three clicks — 'show me everyone in Port Harcourt who joined this year' — and how you inspect one field across the whole dataset without scrolling. To clear, use Data → Clear; nothing was ever deleted, only hidden. One important note: a SUM over a filtered range still counts the hidden rows, so use SUBTOTAL(109, range) when you want the visible total.",
          "**Duplicates** are inevitable in real data — the same customer entered twice, the same invoice captured by two people. Find them with Conditional Formatting → Highlight Cells Rules → Duplicate Values to see them, then Data → Remove Duplicates to delete them. Read the Remove Duplicates dialog carefully before confirming: it deletes rows that match on the columns you have ticked, so if you tick only Surname you will delete every second person who shares a surname. Tick the columns that together define a unique record — usually the full set of identifying fields — and always work on a copy of the sheet first, because the deletion is immediate and not always undoable.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor takes a deliberately messy 200-row register — mixed formats, duplicates, blank rows, merged cells — and cleans it live while explaining every decision, then repeats the key steps in Google Sheets.",
      steps: [
        {
          step: "Show the mess",
          detail:
            "Open the raw register. Point out the merged header, the blank row in the middle, three capitalisation styles for names, phone numbers in four different formats, dates that are text, and an obvious duplicate.",
        },
        {
          step: "Remove merged cells and the banner",
          detail:
            "Unmerge everything, delete the decorative top rows, and get headers into row 1. Explain why a clean rectangle is the precondition for everything else.",
        },
        {
          step: "Split combined fields",
          detail:
            "Use Text to Columns to split a combined name-and-phone column on the separator. Show the result and explain that this single operation is a billable task in real work.",
        },
        {
          step: "Fix phone numbers",
          detail:
            "Format the column as Text, then use Find and Replace to strip spaces and dashes so every number follows one format. Verify the leading zeros survived.",
        },
        {
          step: "Fix dates",
          detail:
            "Identify the text dates by their left alignment, retype or convert a sample, apply a consistent date format, and prove date arithmetic now works by subtracting two dates.",
        },
        {
          step: "Normalise capitalisation",
          detail:
            "Add a helper column using PROPER(), fill it down, copy it, paste as values over the original, then delete the helper. Show the before and after.",
        },
        {
          step: "Convert to a Table",
          detail:
            "Press Ctrl+T and confirm the range. Show the filter buttons, banded rows and automatic expansion by adding a new row and watching the format carry down.",
        },
        {
          step: "Sort and inspect",
          detail:
            "Sort by Amount ascending and point out the outliers at both ends. Sort by City and show the capitalisation inconsistencies now grouped together.",
        },
        {
          step: "Filter to answer a question",
          detail:
            "Filter to one city and read the visible record count. Change the SUM to SUBTOTAL(109, range) and show the total updating to visible rows only.",
        },
        {
          step: "Find and remove duplicates",
          detail:
            "Highlight duplicates with Conditional Formatting first so the class can see them. Then use Remove Duplicates with the correct columns ticked, on a copy, and report how many rows were removed.",
        },
        {
          step: "Repeat in Google Sheets",
          detail:
            "Open the same file in Sheets and perform the sort, filter and duplicate removal using its menus, noting where the options live differently and what to check after converting formats.",
        },
      ],
    },
    practice: {
      title: "Clean a messy register",
      brief:
        "You are given a 200-row register containing every common defect: merged headers, blank rows, mixed capitalisation, inconsistent phone formats, text dates, and at least five duplicates. Produce a clean, structured, correctly formatted table in both Excel and Google Sheets.",
      steps: [
        "Work on a copy of the file and name it with the date-client-subject-version pattern.",
        "Remove merged cells and any banner rows so headers sit in row 1.",
        "Split any combined fields into separate columns.",
        "Format the Phone column as Text and normalise every number to one format.",
        "Convert text dates to real dates and apply one consistent date format.",
        "Normalise name capitalisation using a PROPER() helper column, pasted back as values.",
        "Remove any blank rows inside the data range.",
        "Convert the range to a Table (Excel) and apply a filter (Sheets).",
        "Sort by Amount ascending and list the three largest and three smallest values.",
        "Filter to one city and report the record count and the visible-only total using SUBTOTAL.",
        "Highlight duplicates, then remove them on the correct columns, reporting how many rows went.",
        "Save the cleaned file and repeat steps 7 to 11 in Google Sheets.",
      ],
      standard:
        "A clean rectangle with headers in row 1, no merged cells, no blank rows, no duplicates, every field in the correct data type with consistent formatting, working in both Excel and Google Sheets, with the record count before and after stated.",
    },
    pitfalls: [
      {
        problem: "A blank row in the middle truncates your sort or formula",
        fix: "Delete blank rows inside the data range. Both tools find the end of a dataset at the first blank row, so everything below it is silently excluded. Convert to a Table so the range is explicit instead of guessed.",
      },
      {
        problem: "You sorted one column and now names do not match phone numbers",
        fix: "Always sort the whole table, and choose 'Expand the selection' when prompted. If the damage is done and you cannot undo, you must re-enter from source — which is why using a Table is worth the habit.",
      },
      {
        problem: "Remove Duplicates deleted records you needed",
        fix: "You ticked too few columns, so genuinely different people matched. Tick every column that together defines a unique record, preview with Conditional Formatting first, and always work on a copy.",
      },
      {
        problem: "Your dates will not calculate",
        fix: "They are stored as text — check the left alignment. Re-enter them in an unambiguous form or convert them, then apply a date format. Text dates cannot be subtracted, sorted chronologically or filtered by month.",
      },
      {
        problem: "Phone numbers lost their leading zeros",
        fix: "They were entered as numbers. Format the column as Text before typing, or prefix with an apostrophe. If the zeros are already gone you must retype or pad them back with a formula, because the information is genuinely lost.",
      },
      {
        problem: "Your filtered total still includes hidden rows",
        fix: "SUM ignores filters by design. Use SUBTOTAL(109, range) for a visible-only total. This is standard on any sheet a client will filter themselves.",
      },
    ],
    expertNotes: [
      "Freeze the header row on every sheet you touch — View → Freeze Panes → Freeze Top Row. On a 2,000-row register, losing sight of which column is which causes more entry errors than any other single factor, and it takes two seconds to prevent.",
      "Use Data Validation (Data → Data validation) to restrict a column to a list of allowed values — city names, yes/no, a product code list. It stops typos at the point of entry rather than requiring you to find them later, and it is the difference between a sheet that stays clean and one that decays.",
      "Learn Ctrl+arrow keys immediately. Ctrl+Down jumps to the last populated cell in a column, and Ctrl+Shift+Down selects everything in between. On large sheets this is the difference between working quickly and scrolling for minutes, and it takes one afternoon to become automatic.",
      "Keep a helper-column habit. Adding a temporary column with a formula to fix a value, then pasting it back as values and deleting the helper, is cleaner and safer than editing cells by hand — and it is reproducible, so you can show a client exactly what you changed.",
    ],
    vocabulary: [
      { term: "Header row", meaning: "Row 1, holding one clear column name per field. Never merged, never split across two rows." },
      { term: "Excel Table", meaning: "A structured range (Ctrl+T) with filters, banded rows, automatic expansion and a repeating print header." },
      { term: "Text to Columns", meaning: "The tool that splits one column into several on a separator — the standard fix for combined fields." },
      { term: "Serial date", meaning: "How spreadsheets store dates internally, as a number of days. This is what makes date arithmetic possible." },
      { term: "Data validation", meaning: "A rule restricting what can be entered in a column, preventing typos at the point of entry." },
      { term: "Filter", meaning: "Temporarily hides rows not matching a condition. Data is never deleted, only hidden." },
      { term: "SUBTOTAL", meaning: "A function that aggregates only visible rows — use SUBTOTAL(109, range) for a filtered sum." },
      { term: "Remove Duplicates", meaning: "Deletes rows matching on the ticked columns. Irreversible in practice, so preview and work on a copy." },
    ],
    homework: [
      {
        task: "Clean a real dataset",
        detail:
          "Find or request a genuinely messy list — a church register, a shop's customer list, a class result sheet — and clean it to the standard in this session. Report the record count before and after.",
      },
      {
        task: "Set up data validation on one column",
        detail:
          "Restrict a City column to a fixed list of allowed values and try to enter something not on the list. Note what the tool does and why that prevents a whole class of errors.",
      },
      {
        task: "Practise the same work in both tools",
        detail:
          "Do one cleaning task in Excel and the identical task in Google Sheets. Write down where the menus differ. Being fluent in both is a real advantage in remote work.",
      },
      {
        task: "Learn five navigation shortcuts",
        detail:
          "Ctrl+Down, Ctrl+Shift+Down, Ctrl+T, Ctrl+F, Ctrl+H. Use only these for one working session and note how much scrolling you avoided.",
      },
    ],
    rubric: [
      {
        criterion: "Structure",
        passing: "Headers in row 1, no merged cells, no blank rows in the data.",
        excellent: "Converted to a Table with a frozen header, and the structure would survive another 2,000 rows unchanged.",
      },
      {
        criterion: "Data types and formatting",
        passing: "Most fields correctly typed and consistently formatted.",
        excellent: "Identifiers as text with leading zeros intact, real dates, one phone format throughout, names normalised with a helper column.",
      },
      {
        criterion: "Sorting and filtering",
        passing: "Sorts and filters correctly without scrambling rows.",
        excellent: "Uses multi-level sorting, reads outliers from a sorted column, and uses SUBTOTAL for visible-only totals.",
      },
      {
        criterion: "Deduplication",
        passing: "Finds and removes duplicates.",
        excellent: "Previews with conditional formatting, selects the correct uniqueness columns, works on a copy, and reports rows removed.",
      },
      {
        criterion: "Tool fluency",
        passing: "Completes the work in one tool.",
        excellent: "Completes it in both Excel and Google Sheets and can explain where the two differ.",
      },
    ],
    faqs: [
      {
        q: "Excel or Google Sheets — which should I learn?",
        a: "Excel first. It is what Nigerian employers specify, what government and bank forms assume, and it has the deeper feature set. Sheets is nearly identical in concept and you will pick it up in an afternoon, and being comfortable in both is genuinely valuable for remote work where clients often prefer Sheets.",
      },
      {
        q: "How do I handle a file with 50,000 rows?",
        a: "Never scroll it. Use Ctrl+Down to jump to the end, filters to inspect subsets, and formulas or pivot tables to summarise. Convert it to a Table so ranges are explicit. If it is genuinely enormous, the client should be using a database rather than a spreadsheet, and saying so is part of the job.",
      },
      {
        q: "I removed duplicates and now the count is wrong. What happened?",
        a: "Either you ticked too few columns and deleted distinct records, or you ticked too many and left real duplicates behind. Reopen the original, preview duplicates with conditional formatting, decide which columns together make a record unique, then redo it on a fresh copy.",
      },
      {
        q: "Why does my spreadsheet get slow as it grows?",
        a: "Usually volatile formulas recalculating over large ranges, excessive conditional formatting, or whole-column references like A:A. Restrict formulas to the actual data range, use a Table so ranges stay tight, and remove conditional formatting rules you no longer need.",
      },
      {
        q: "Should I learn pivot tables in this course?",
        a: "They are introduced at the end of session four as the natural next step, and covered properly in Data Analytics. For pure data entry work you need sorting, filtering and deduplication far more often than pivots — but knowing a pivot exists tells you when a client's request is a summary job rather than a cleaning job.",
      },
    ],
  },
};
