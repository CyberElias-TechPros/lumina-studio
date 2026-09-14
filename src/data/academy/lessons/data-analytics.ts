import type { SessionLecture } from "../types";

/**
 * Data Analytics — ₦25,000 · 4 weeks · 8 sessions.
 * Sessions 1 to 3. (4–6 in data-analytics-b.ts, 7–8 in data-analytics-c.ts.)
 *
 * Shape differs from the other courses on purpose: every session works on ONE
 * shared dataset — the order export of a Lagos household-goods distributor —
 * so cleaning in week 1 feeds the pivots in week 2, the charts in week 3 and
 * the dashboard and analysis note in week 4. Demonstrations are worked
 * transformations with real formulas; practices have checkable answers.
 *
 * THE RUNNING DATASET (defined in session 1, reused in every later session):
 *   ~1,200 rows, one row per order line, exported from an invoicing/POS tool.
 *   Columns: OrderID, OrderDate, CustomerName, Phone, State, Product,
 *            Category, Quantity, UnitPrice, LineTotal, PaymentMethod, SalesRep
 *   Known defects: inconsistent State and Product spelling; dates in three
 *   formats including ambiguous DD/MM vs MM/DD; names with stray spaces and
 *   mixed case; phone numbers in four formats; Quantity and UnitPrice partly
 *   stored as text with currency symbols; LineTotal sometimes blank or wrong;
 *   14 duplicated rows from double entry; missing PaymentMethod recorded as
 *   blank, "N/A", "-" and "unknown" interchangeably.
 */
export const dataAnalyticsLessonsA: Record<string, SessionLecture> = {
  "data-structure-types": {
    summary:
      "Analysis fails far more often because of how data is arranged than because of the formula used. This session covers data types, tidy data, the real sources of mess in business data, and planning a dataset before you touch it — using one messy order export that the rest of the course works on.",
    objectives: [
      "Identify what data type each column holds and why it matters",
      "Recognise tidy data and reshape a sheet into it",
      "Explain where mess in business data actually comes from",
      "Read an unfamiliar dataset before analysing it",
      "Plan a cleaning approach rather than improvising it",
      "Keep an untouched original and work on a copy",
    ],
    blocks: [
      {
        heading: "The dataset this course runs on",
        body: [
          "Everything from here to the final project uses **one dataset**, because that is how analysis actually works — you do not get eight separate clean problems, you get one messy file and eight weeks of dealing with it. It is an order export from a mid-sized distributor of household goods to retailers across Lagos, Ogun and Oyo, produced by their invoicing tool. About 1,200 rows, one row per order line, and twelve columns: **OrderID, OrderDate, CustomerName, Phone, State, Product, Category, Quantity, UnitPrice, LineTotal, PaymentMethod and SalesRep**.",
          "It is messy in the ordinary way real exports are messy, not in a contrived way. State appears as *Lagos*, *lagos*, *LAGOS*, *Lagos State* and *LG*. Dates arrive in three different formats, and one of them is ambiguous. Names carry stray double spaces and inconsistent capitalisation. Phone numbers appear with and without the country code, with dashes, and with spaces. Some Quantity and UnitPrice values are stored as **text** rather than numbers, several carrying a naira sign and a thousands comma. Fourteen rows are duplicated because the counter staff entered the same sale twice. And missing payment methods are recorded as blank, *N/A*, a dash, and the word *unknown*, interchangeably.",
          "This matters because the mess is not decoration. **Every one of these defects will produce a wrong answer if you ignore it** — *LAGOS* and *Lagos* are two states to a pivot table, a text-stored price sums to zero, and a duplicated row doubles the revenue you report to a manager. We are going to spend the whole course finding out exactly how wrong, and then fixing it.",
        ],
      },
      {
        heading: "Data types, and why they decide everything",
        body: [
          "Every value in a spreadsheet has a type, and the type determines what you can do with it. The four that matter here are **text**, **number**, **date** and **logical** (TRUE/FALSE). Getting the type wrong does not produce an error — it produces a plausible, confident, wrong answer, which is far worse.",
          "The commonest failure in our dataset is a **number stored as text**. Our UnitPrice column contains values like *₦4,500* and *4,500.00*, which Excel reads as text because of the symbol and the comma. Sum a column of text-numbers and you get **zero**, or only the few genuine numbers, with no warning. The giveaway is that text-numbers are usually **left-aligned** while real numbers are right-aligned, and a small green triangle often appears in the cell corner.",
          "**Dates are the subtlest trap.** A spreadsheet date is really a number — days since a fixed starting point — displayed as a date, which is what lets you subtract dates and group by month. A date stored as text cannot be grouped by month at all; the pivot table simply will not offer it. Our OrderDate column mixes *12/03/2025*, *2025-03-12* and *12-Mar-25*, and the first format is genuinely ambiguous: is it the 12th of March or the 3rd of December? **That is not a formatting question, it is a question you must answer before you can trust any monthly figure.**",
        ],
      },
      {
        heading: "Tidy data: one rule that fixes most structure problems",
        body: [
          "**Tidy data** has a precise meaning, and it is worth memorising because it settles most structural arguments: **one variable per column, one observation per row, one value per cell.** Our order export is close to tidy, which is why it is analysable at all.",
          "The violation to watch for is the **report layout** — the shape people produce when they make a spreadsheet look nice rather than work. A sheet with a title in row 1, a merged header spanning four columns, *Lagos* down the side and months across the top, with totals in a right-hand column and a grand total at the bottom, is unreadable to any analysis tool. Every one of those features — merged cells, embedded headings, total rows, blank spacer rows — is decoration that breaks a pivot table.",
          "The other common violation is **multiple values in one cell**, and we have it: some Quantity cells read *2 pcs*, and some Product cells read *Bucket 20L (blue)*. A cell holding two facts cannot be counted, averaged or filtered reliably. The fix is to split it — Quantity as 2 and a separate Units column, Product as *Bucket 20L* with Colour separate — which is more work once and saves it every time afterwards.",
        ],
      },
      {
        heading: "Where the mess actually comes from",
        body: [
          "Mess is not random, and understanding its source tells you where to look. **Free-text entry** is the biggest cause: any field a human types will contain variants, which is why State and Product are inconsistent while OrderID, generated by the system, is clean. If a column was typed by a person, assume it needs cleaning; if it was generated, check it anyway but expect less.",
          "**System boundaries** are the second. Data that has crossed from one tool to another — exported from a POS, emailed as CSV, opened in Excel, re-saved — picks up changes at each hop. Opening a CSV in Excel and saving it can silently convert *08031234567* into a number and destroy the leading zero, or reinterpret a date. Our export has been through at least two tools, and the date formats show it.",
          "**Multiple people, no rules** is the third, and it explains our fourteen duplicates and our four different spellings of *missing*. When three counter staff enter orders and nobody has said how to record an unknown payment method, you get blank, *N/A*, a dash and *unknown* — four values that all mean the same thing and that Excel treats as four different categories.",
        ],
      },
      {
        heading: "Reading a dataset before you analyse it",
        body: [
          "The discipline that separates people who get answers from people who get wrong answers is **looking before calculating**. Concretely: how many rows, and does that match what you expected? How many columns, and does each hold one thing? For every column, what type is it, how many distinct values does it have, and how many are empty? Are there duplicates? What are the minimum and maximum of every number, and do they make sense — a UnitPrice of zero, or of 4,500,000 for a bucket?",
          "Most of this takes five minutes and answers itself. **`=COUNTA(A:A)`** tells you how many rows have anything; a pivot table with a field in Rows tells you every distinct value in that column instantly, which is how you discover that State has nine spellings for three states. **`=MIN()`** and **`=MAX()`** on every numeric column catch the impossible values — the negative quantity, the price entered as 45000 instead of 4500.",
          "And the rule that protects everything else: **never work on the original**. Copy the export to a working file, keep the original untouched, and do all cleaning on the copy. You will make a mistake at some point — everyone does — and the difference between a five-second recovery and a request to re-export three months of orders is whether you kept the original.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor opens the raw 1,200-row order export and profiles it column by column before touching anything, finding every defect in the dataset with formulas and pivot tables rather than by scrolling — then demonstrates exactly how one of those defects produces a confidently wrong revenue figure.",
      steps: [
        {
          step: "Make a working copy and leave the original alone",
          detail:
            "Save as a working file before anything else. Explain that you will make a mistake eventually, and keeping the original is the difference between a five-second recovery and a re-export request.",
        },
        {
          step: "Count the rows",
          detail:
            "Use =COUNTA(A:A) and compare with the expected order count. Explain that a mismatch is the first sign of duplication or of a truncated export.",
        },
        {
          step: "Check each column holds one thing",
          detail:
            "Scan the headers. Explain the tidy rule: one variable per column, one observation per row, one value per cell.",
        },
        {
          step: "Pivot the State column to list its values",
          detail:
            "Drop State into Rows. Show Lagos, lagos, LAGOS, Lagos State and LG appearing as five separate states. Explain that a pivot table is the fastest way to see every distinct value in a column.",
        },
        {
          step: "Do the same for Product",
          detail:
            "Show Bucket 20L, bucket 20l and BUCKET 20L as three products. Explain that the same product split across three rows will understate every figure you report.",
        },
        {
          step: "Test whether UnitPrice is really a number",
          detail:
            "Type =ISNUMBER(I2) beside a cell showing ₦4,500. Show FALSE. Explain that the naira sign and comma made it text.",
        },
        {
          step: "Sum the UnitPrice column as it stands",
          detail:
            "Show the total come out near zero. Explain that this is the most dangerous failure in spreadsheets, because it produces a number with no error message.",
        },
        {
          step: "Check alignment as a quick type test",
          detail:
            "Point out that text sits left and numbers right. Explain that a column with mixed alignment is mixed-type and cannot be trusted until fixed.",
        },
        {
          step: "Look for the green error triangles",
          detail:
            "Hover one and read the message. Explain that Excel often flags text-numbers for you, and the flag is worth acting on rather than dismissing.",
        },
        {
          step: "Examine the three date formats",
          detail:
            "Show 12/03/2025, 2025-03-12 and 12-Mar-25 side by side. Explain that a date stored as text cannot be grouped by month at all.",
        },
        {
          step: "Show the ambiguous date problem",
          detail:
            "Ask the class whether 12/03/2025 is 12 March or 3 December. Explain that this must be resolved before any monthly figure can be trusted.",
        },
        {
          step: "Find the duplicates",
          detail:
            "Use Conditional Formatting, Highlight Duplicate Values on OrderID. Show fourteen highlighted. Explain that these came from double entry at the counter.",
        },
        {
          step: "Count the missing PaymentMethod values",
          detail:
            "Filter the column and show blank, N/A, a dash and unknown all present. Explain that four spellings of missing will appear as four categories in every summary.",
        },
        {
          step: "Run MIN and MAX on Quantity and UnitPrice",
          detail:
            "Show a negative quantity and an implausible price. Explain that impossible values are usually keying errors and must be resolved, not deleted silently.",
        },
        {
          step: "Write the defect list down",
          detail:
            "Record every finding in a notes tab. Explain that cleaning without a list means you will miss some and repeat others, and the list becomes your documentation.",
        },
      ],
    },
    practice: {
      title: "Profile the export before you touch it",
      brief:
        "You are given the raw order export and you profile it completely without cleaning anything — every column typed, every distinct value listed, every defect recorded — then you demonstrate one wrong answer that a defect would cause.",
      steps: [
        "Save a working copy and confirm the original is untouched.",
        "Count the rows with =COUNTA(A:A) and record the number.",
        "List all twelve columns and state the intended type of each.",
        "Use =ISNUMBER() on ten UnitPrice cells and record how many return FALSE.",
        "Check the alignment of every numeric column and note any that are mixed.",
        "Build a pivot table with State in Rows and record every distinct value.",
        "Build a pivot table with Product in Rows and record every distinct value.",
        "Sum the UnitPrice column as it stands and record the result.",
        "List the three date formats present and identify which are ambiguous.",
        "Highlight duplicate OrderIDs and record how many there are.",
        "Filter PaymentMethod and list every value that means missing.",
        "Run =MIN() and =MAX() on Quantity and UnitPrice and flag implausible values.",
        "Count how many rows have a blank LineTotal.",
        "Check whether LineTotal equals Quantity times UnitPrice on twenty rows and record the mismatches.",
        "Write a defect list of every finding, grouped by column.",
        "Produce one wrong revenue figure caused by a defect and explain the mechanism.",
      ],
      standard:
        "A complete profile of the raw export with no cleaning applied: row count recorded, all twelve columns listed with intended types, ISNUMBER tested on ten UnitPrice cells with the FALSE count recorded, mixed alignment flagged, every distinct State and Product value listed via pivot table, the raw UnitPrice sum recorded as evidence of the text-number problem, all three date formats listed with the ambiguous one identified, duplicate OrderIDs highlighted and counted, every value meaning missing in PaymentMethod listed, MIN and MAX run on Quantity and UnitPrice with implausible values flagged, blank LineTotal rows counted, LineTotal checked against Quantity times UnitPrice on twenty rows with mismatches recorded, a defect list grouped by column, and one demonstrably wrong revenue figure with its mechanism explained.",
    },
    pitfalls: [
      {
        problem: "You analyse a column that is secretly text",
        fix: "Test with =ISNUMBER() and check alignment. A number stored as text sums to zero or to only the genuine numbers, with no error message — the most dangerous failure in spreadsheets.",
      },
      {
        problem: "You treat LAGOS and Lagos as different states",
        fix: "Pivot the column to list every distinct value before analysing. Variants split one category across several rows and understate every figure you report.",
      },
      {
        problem: "You group dates that are stored as text",
        fix: "Convert to real dates first. A text date cannot be grouped by month at all, so the pivot table simply omits the option and you may not notice it is missing.",
      },
      {
        problem: "You assume 12/03/2025 means what you think it means",
        fix: "Resolve the ambiguity explicitly before any monthly figure. Is it 12 March or 3 December? Guessing silently corrupts every time-based conclusion you draw.",
      },
      {
        problem: "You clean the original export",
        fix: "Work on a copy and keep the original untouched. Everyone makes a cleaning mistake eventually, and the original is the only recovery that does not involve asking someone to re-export.",
      },
      {
        problem: "You delete impossible values without asking",
        fix: "Flag and investigate. A UnitPrice of 45000 is probably 4500 with a slipped digit, and silently deleting it removes a real sale from your revenue.",
      },
      {
        problem: "You build on a report layout with merged cells and totals",
        fix: "Reshape to tidy data first: one variable per column, one observation per row. Merged cells, embedded headings and total rows break pivot tables and are invisible until they do.",
      },
      {
        problem: "You leave two facts in one cell",
        fix: "Split them. A Quantity of 2 pcs or a Product of Bucket 20L (blue) cannot be counted, averaged or filtered reliably, and splitting once saves the work every time after.",
      },
    ],
    expertNotes: [
      "Profile before you calculate. Five minutes of counting rows, pivoting each column and running MIN and MAX finds the defects that would otherwise surface as a wrong answer in front of a manager.",
      "Treat any human-typed column as dirty by default. State and Product are inconsistent because people typed them; OrderID is clean because a system generated it. Knowing the source tells you where to look first.",
      "Never work on the original export. Copy it, keep the original untouched, and clean on the copy — the difference between recovering in five seconds and requesting a three-month re-export.",
      "A number stored as text is the failure to fear most, because it produces a confident wrong total with no error. Check alignment, look for the green triangles, and test with ISNUMBER before summing anything.",
    ],
    vocabulary: [
      { term: "Data type", meaning: "Whether a value is text, number, date or logical. Wrong types produce plausible wrong answers rather than errors." },
      { term: "Text-number", meaning: "A number stored as text, often from a currency symbol or comma. Sums to zero silently; usually left-aligned." },
      { term: "Tidy data", meaning: "One variable per column, one observation per row, one value per cell. The precondition for pivot tables to work." },
      { term: "Report layout", meaning: "A sheet shaped to look nice — merged cells, headings, total rows — that breaks analysis tools." },
      { term: "Profiling", meaning: "Examining a dataset before analysing it: row counts, distinct values, types, blanks, duplicates, ranges." },
      { term: "Distinct values", meaning: "Every unique entry in a column. A pivot table lists them instantly and reveals spelling variants." },
      { term: "Ambiguous date", meaning: "A date whose day and month cannot be told apart, like 12/03/2025. Must be resolved before monthly analysis." },
      { term: "Free-text field", meaning: "Any column a human types. The main source of spelling variants and inconsistent missing values." },
    ],
    homework: [
      {
        task: "Profile one real spreadsheet you already have",
        detail:
          "A bank statement, a sales log, a register. Count the rows, pivot two text columns to list their distinct values, test a numeric column with ISNUMBER, and write the defect list.",
      },
      {
        task: "Find a text-number in the wild",
        detail:
          "Locate a column that looks numeric but is stored as text, prove it with ISNUMBER, and show what the sum returns before and after conversion.",
      },
      {
        task: "Resolve the ambiguous dates in the export",
        detail:
          "Establish whether the DD/MM rows are day-first, using surrounding unambiguous rows as evidence. Document how you decided — this answer governs every monthly figure later.",
      },
      {
        task: "Reshape one report layout into tidy data",
        detail:
          "Take a sheet with merged cells or a total row and rebuild it as one variable per column, one observation per row. Then build a pivot table on it to prove it works.",
      },
    ],
    rubric: [
      {
        criterion: "Type awareness",
        passing: "Can say what a column contains.",
        excellent: "Types tested with ISNUMBER, alignment and error triangles used as evidence, and the silent-zero failure on text-numbers demonstrated rather than described.",
      },
      {
        criterion: "Structure",
        passing: "Uses a spreadsheet competently.",
        excellent: "Tidy data explained as one variable per column, one observation per row, one value per cell, and a report layout correctly identified and reshaped.",
      },
      {
        criterion: "Profiling",
        passing: "Looks at the data first.",
        excellent: "Rows counted, every distinct value listed by pivot table, MIN and MAX run on numerics with implausible values flagged, duplicates highlighted, and all findings recorded in a defect list.",
      },
      {
        criterion: "Handling ambiguity",
        passing: "Notices odd values.",
        excellent: "The ambiguous date format resolved with stated evidence, four spellings of missing identified as one category, and impossible values investigated rather than deleted.",
      },
      {
        criterion: "Working safely",
        passing: "Edits carefully.",
        excellent: "Original export preserved untouched with all work on a copy, and a wrong revenue figure produced deliberately to show what a defect costs.",
      },
    ],
    faqs: [
      {
        q: "Why does my total come out as zero when the column has numbers in it?",
        a: "They are almost certainly stored as text, usually because of a naira sign, a thousands comma, or a CSV import. Text-numbers are left-aligned where real numbers are right-aligned, and they sum to zero with no error. Test a cell with =ISNUMBER() to confirm.",
      },
      {
        q: "What is tidy data and why does everyone mention it?",
        a: "One variable per column, one observation per row, one value per cell. It matters because pivot tables and every analysis tool assume it — merged cells, embedded headings, total rows and blank spacer rows all silently break them.",
      },
      {
        q: "How do I find every spelling variant in a column quickly?",
        a: "Make a pivot table with that column in Rows. It lists every distinct value instantly, which is how you discover that State has nine spellings for three states. Scrolling will not find them; a pivot table will.",
      },
      {
        q: "Should I just delete the rows that look wrong?",
        a: "Flag them and investigate first. A UnitPrice of 45000 is probably 4500 with a slipped digit, and deleting it removes a real sale from your revenue. Deleting data is a last resort, and it should be documented when you do.",
      },
      {
        q: "Do I need Excel, or will Google Sheets do?",
        a: "Sheets does everything in this course. A few function names and the pivot table interface differ slightly, and both are noted as we go. Pick one and stay in it — the analysis is identical.",
      },
    ],
  },

  "cleaning-validation": {
    summary:
      "Cleaning is where most analysis time actually goes, and it should be repeatable rather than manual. This session covers the text functions that fix spelling and spacing, removing duplicates safely, handling missing values deliberately, and validation rules that stop the mess coming back.",
    objectives: [
      "Use TRIM, CLEAN, PROPER, UPPER and SUBSTITUTE to standardise text",
      "Convert text-numbers into real numbers without breaking them",
      "Normalise dates stored in mixed and ambiguous formats",
      "Remove duplicates deliberately and record what you removed",
      "Decide what to do with missing values rather than ignoring them",
      "Add validation rules so the same mess does not return",
    ],
    blocks: [
      {
        heading: "Cleaning is repeatable work, not manual work",
        body: [
          "The first principle of cleaning is that **you should never fix the same problem twice by hand**. Our State column has about 1,200 entries across nine spellings of three states. Changing them one at a time would take an hour, introduce new errors, and have to be done again next month when the next export arrives.",
          "So cleaning is done with **formulas in a helper column**, which is fast, consistent and reviewable, and then the result is pasted back as values. A helper column is simply a new column beside the data holding a formula — *CleanState* next to *State* — which you can check before you commit to it. **Never overwrite the original column in place until the helper column has been verified**, because a formula dragged 1,200 rows down will happily apply a wrong logic 1,200 times.",
          "The second principle is that **cleaning must be documented**. Every change you make — what, why, how many rows it affected — goes in a notes tab. Not for bureaucracy: because in six weeks you or a colleague will ask why *LG* became *Lagos*, and because a manager is entitled to know that fourteen duplicated rows were removed before the revenue figure was calculated.",
        ],
      },
      {
        heading: "The text functions that do most of the work",
        body: [
          "Five functions handle almost every text problem in business data. **`=TRIM(A2)`** removes leading and trailing spaces and collapses repeated internal spaces — which fixes *Adebayo  Ogundimu* and *LAGOS* with a trailing space in one step. **`=CLEAN(A2)`** strips non-printing characters, which is what you need for data that came out of another system and carries invisible junk; a value that looks identical to another but will not match is usually carrying one.",
          "**`=UPPER(A2)`**, **`=LOWER(A2)`** and **`=PROPER(A2)`** control capitalisation. For names and products, **PROPER** is usually right, giving *Adebayo Ogundimu* and *Bucket 20L*. Be careful: PROPER also capitalises the second letter of anything after a punctuation mark, so *McDonald* becomes *Mcdonald* and *20L* is fine but *iPhone* becomes *Iphone* — check the results rather than assuming.",
          "**`=SUBSTITUTE(A2, \"old\", \"new\")`** replaces text, and it is the workhorse for standardisation. To collapse our nine State spellings into three you can chain them: **`=SUBSTITUTE(SUBSTITUTE(PROPER(TRIM(B2)), \"Lagos State\", \"Lagos\"), \"Lg\", \"Lagos\")`**. Note the order — **TRIM and PROPER first**, so that *lagos*, *LAGOS* and *LAGOS* all become *Lagos* before you try to match anything, otherwise you are matching against moving targets. SUBSTITUTE is also how you strip a naira sign and comma from a price: replace *₦* with nothing, then replace the comma with nothing.",
        ],
      },
      {
        heading: "Fixing numbers and dates",
        body: [
          "Once UnitPrice is free of the naira sign and comma it may still be text. **`=VALUE(A2)`** converts a text-number into a real number; **`=NUMBERVALUE(A2)`** does the same and lets you specify the decimal and grouping separators, which matters when a file was produced with different regional settings. After converting, **re-test with `=ISNUMBER()`** — do not assume, because a stray space or an invisible character will make VALUE fail and return #VALUE!.",
          "For our Quantity column, where some cells read *2 pcs*, extract the number rather than retyping: pull the digits with **`=VALUE(LEFT(A2, FIND(\" \", A2) - 1))`**, or, more robustly, strip the unit with SUBSTITUTE first and then convert. The general habit is **extract, then convert, then verify** — three steps, because a conversion that fails silently is worse than one that fails loudly.",
          "Dates are harder because of the ambiguity we found. **`=DATEVALUE(A2)`** converts a text date to a real one, but only if your spreadsheet can interpret the format — and for *12/03/2025* it will guess using your system's regional settings, which may not be what the exporting system meant. The reliable method is to **split the text and rebuild it explicitly**: extract the parts with MID and FIND, then assemble with **`=DATE(year, month, day)`**, deciding for yourself which part is the month. Then **verify against rows that are unambiguous** — a value like *25/03/2025* can only be 25 March, and if your logic gets that one wrong, the logic is wrong.",
        ],
      },
      {
        heading: "Duplicates and missing values",
        body: [
          "Our fourteen duplicate rows came from double entry, and removing them is easy — **but removing the wrong things is easy too**. Highlight duplicates on OrderID first and **look at them**. Two rows with the same OrderID and identical values are a genuine duplicate. Two rows with the same OrderID but different products are a legitimate multi-line order, and deleting one loses a real sale. **The duplicate check must be on the whole row, or on a key you have verified is genuinely unique**, not on any column that happens to repeat.",
          "Then remove them deliberately: copy the duplicates to a separate tab **before** deleting, so you have a record of what went and can put it back. Then delete. The count should match what you found — fourteen, not thirty-seven — and if it does not, stop and find out why.",
          "**Missing values are a decision, not an absence.** Our PaymentMethod has blanks, *N/A*, a dash and *unknown* — all meaning the same thing, and Excel treats them as four categories. First **standardise**: replace all four with one value, say *Not recorded*, using SUBSTITUTE and a blank check. Then **decide what it means for your analysis**. If 9 per cent of payment methods are unrecorded, you can report cash versus transfer across the 91 per cent that is known — as long as you say so. What you must not do is treat the missing as a category called *Not recorded* and report it alongside Cash and Transfer as though it were a payment method.",
        ],
      },
      {
        heading: "Validation: stopping the mess coming back",
        body: [
          "Cleaning a dataset once is half the job; the other half is making sure next month's export is not equally messy. **Data validation** constrains what can be entered in a column. In Excel: **Data → Data Validation**. Set State to a **List** containing exactly *Lagos*, *Ogun*, *Oyo*, and nobody can type *LAGOS* again. Set Quantity to a **Whole number** between 1 and 500, and a keying error of 5000 is rejected at entry rather than discovered in the quarterly report.",
          "Validation is cheap and it is the highest-value thing in this session, because every rule you add removes a cleaning step forever. The columns to constrain first are exactly the ones that were dirty: any **category** column becomes a list, any **number** column gets a range, any **date** column gets a date range, and any **required** column is set to reject blanks.",
          "For data coming from a system you do not control, you cannot validate at entry, so validate **on arrival**: a checks tab with formulas that count rows where State is not in the allowed list, where Quantity is out of range, where LineTotal does not equal Quantity times UnitPrice. **`=SUMPRODUCT(--(ISNA(MATCH(E2:E1201, {\"Lagos\",\"Ogun\",\"Oyo\"}, 0))))`** counts invalid states in one cell. Run those checks on every new export before you analyse it, and cleaning stops being a monthly scramble.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor cleans the order export column by column using helper columns, verifying each result before committing — standardising State and Product, converting text prices to real numbers, rebuilding ambiguous dates explicitly, removing exactly the fourteen true duplicates, unifying four spellings of missing, and adding validation so the next export arrives clean.",
      steps: [
        {
          step: "Add a CleanState helper column beside State",
          detail:
            "Never overwrite the original in place. Explain that a formula dragged 1,200 rows applies wrong logic 1,200 times, so the result must be checkable first.",
        },
        {
          step: "Apply TRIM and PROPER first",
          detail:
            "=PROPER(TRIM(B2)). Explain that you normalise case and spacing before matching, otherwise you are matching against moving targets.",
        },
        {
          step: "Chain SUBSTITUTE to collapse the variants",
          detail:
            "Map Lagos State and Lg to Lagos. Show nine spellings reduce to three. Explain that chaining handles each variant in turn.",
        },
        {
          step: "Pivot CleanState to verify",
          detail:
            "Confirm exactly three values remain. Explain that verification is a pivot table, not a scroll, because scrolling 1,200 rows finds nothing.",
        },
        {
          step: "Standardise Product the same way",
          detail:
            "TRIM, PROPER, then SUBSTITUTE 20ltr to 20L. Explain that product variants split revenue across rows and understate every figure.",
        },
        {
          step: "Strip the naira sign and comma from UnitPrice",
          detail:
            "SUBSTITUTE twice into a helper column. Explain that symbols and thousands separators are what turned the numbers into text.",
        },
        {
          step: "Convert with VALUE and re-test",
          detail:
            "=VALUE(helper) then =ISNUMBER() on the result. Explain that you verify the conversion rather than assuming it, because a stray space makes VALUE fail.",
        },
        {
          step: "Extract the number from 2 pcs",
          detail:
            "Use FIND and LEFT, or SUBSTITUTE the unit away first. Explain the habit: extract, then convert, then verify.",
        },
        {
          step: "Sum UnitPrice before and after",
          detail:
            "Show the near-zero total become a real figure. Explain that this single fix changes every revenue number in the course.",
        },
        {
          step: "Split the ambiguous date text explicitly",
          detail:
            "Extract the parts with MID and FIND, rebuild with DATE(year, month, day). Explain that DATEVALUE guesses from your regional settings, which may not match the exporting system.",
        },
        {
          step: "Verify the date logic against unambiguous rows",
          detail:
            "Check 25/03/2025 comes out as 25 March. Explain that if the logic fails on a row that can only mean one thing, the logic is wrong.",
        },
        {
          step: "Highlight duplicates on OrderID and inspect them",
          detail:
            "Show that some share an ID but differ in product. Explain that those are legitimate multi-line orders and deleting one loses a real sale.",
        },
        {
          step: "Copy the true duplicates to a separate tab",
          detail:
            "Keep a record before deleting. Explain that this is what lets you put them back and lets you tell a manager exactly what was removed.",
        },
        {
          step: "Delete and check the count matches fourteen",
          detail:
            "Explain that if you removed thirty-seven instead of fourteen, you deleted real orders and must undo it.",
        },
        {
          step: "Unify the four spellings of missing PaymentMethod",
          detail:
            "Replace blank, N/A, dash and unknown with Not recorded. Explain that Excel treats four spellings as four categories in every summary.",
        },
        {
          step: "Recompute LineTotal and compare",
          detail:
            "Quantity times UnitPrice against the recorded value. Explain that mismatches reveal either keying errors or discounts that are not recorded anywhere.",
        },
        {
          step: "Add list validation to State",
          detail:
            "Data, Data Validation, List with Lagos, Ogun, Oyo. Explain that nobody can type LAGOS again, which removes a cleaning step permanently.",
        },
        {
          step: "Add range validation to Quantity",
          detail:
            "Whole number between 1 and 500. Explain that a keying error is better rejected at entry than discovered in a quarterly report.",
        },
        {
          step: "Build a checks tab for future exports",
          detail:
            "Formulas counting invalid states, out-of-range quantities and LineTotal mismatches. Explain that this turns monthly cleaning from a scramble into a two-minute check.",
        },
      ],
    },
    practice: {
      title: "Clean the export and prove it is clean",
      brief:
        "You clean the order export using helper columns, verify every change with a pivot table or formula rather than by looking, document each change with the number of rows it affected, and build a checks tab that would catch the same defects in next month's export.",
      steps: [
        "Work on a copy and leave the original export untouched.",
        "Create a CleanState helper column and standardise all nine spellings into three.",
        "Verify with a pivot table that exactly three state values remain.",
        "Create a CleanProduct helper column and standardise every variant.",
        "Verify the distinct product count before and after and record both.",
        "Strip the naira sign and comma from UnitPrice in a helper column.",
        "Convert with VALUE and confirm every row with =ISNUMBER().",
        "Extract the numeric part of any Quantity stored as text.",
        "Record the UnitPrice sum before and after conversion.",
        "Rebuild OrderDate explicitly with DATE(year, month, day).",
        "Verify the date logic on rows that can only be read one way.",
        "Identify duplicate rows and separate true duplicates from multi-line orders.",
        "Copy the true duplicates to a record tab, then delete them.",
        "Confirm the number deleted matches the number you identified.",
        "Replace every spelling of missing PaymentMethod with one standard value.",
        "Recompute LineTotal and list every row that does not match.",
        "Write a cleaning log: what changed, why, and how many rows were affected.",
        "Add list validation to State and range validation to Quantity.",
        "Build a checks tab counting invalid states, out-of-range quantities and total mismatches.",
      ],
      standard:
        "A cleaned copy of the export with the original untouched, in which State is standardised to exactly three values and Product to its true distinct count, both verified by pivot table; UnitPrice stripped of currency symbols, converted with VALUE and confirmed numeric on every row by ISNUMBER, with the sum recorded before and after; text quantities extracted to numbers; OrderDate rebuilt explicitly with DATE and verified against rows readable only one way; true duplicates separated from legitimate multi-line orders, copied to a record tab before deletion, with the deleted count matching the identified count; all four spellings of missing PaymentMethod unified into one value; LineTotal recomputed with every mismatch listed; a cleaning log recording each change, its reason and its row count; list validation on State and range validation on Quantity; and a checks tab counting invalid states, out-of-range quantities and LineTotal mismatches.",
    },
    pitfalls: [
      {
        problem: "You fix values one at a time by hand",
        fix: "Use a formula in a helper column. Manual fixes take an hour, introduce new errors, and must be repeated next month when the next export arrives.",
      },
      {
        problem: "You overwrite the original column before checking the formula",
        fix: "Build in a helper column, verify with a pivot table, then paste as values. A formula dragged 1,200 rows down applies wrong logic 1,200 times.",
      },
      {
        problem: "You run SUBSTITUTE before TRIM and PROPER",
        fix: "Normalise spacing and case first. Otherwise lagos, LAGOS and LAGOS with a trailing space are three different targets and your replacement misses two of them.",
      },
      {
        problem: "You trust PROPER blindly",
        fix: "Check the output. PROPER capitalises after punctuation, so McDonald becomes Mcdonald and iPhone becomes Iphone — plausible-looking and wrong.",
      },
      {
        problem: "You convert with VALUE and do not verify",
        fix: "Re-test with ISNUMBER. A stray space or invisible character makes VALUE return #VALUE!, and an unverified column is still partly text.",
      },
      {
        problem: "You delete every row with a repeated OrderID",
        fix: "Inspect first. Rows sharing an ID with different products are a legitimate multi-line order, and deleting one removes a real sale from your revenue.",
      },
      {
        problem: "You leave four spellings of missing",
        fix: "Standardise to one value. Blank, N/A, a dash and unknown are four categories to Excel, and they will fragment every summary you build.",
      },
      {
        problem: "You report Not recorded as a payment method",
        fix: "State what is missing and analyse what is known. Reporting an absence alongside Cash and Transfer as though it were a method is how a chart misleads a manager.",
      },
    ],
    expertNotes: [
      "Always clean in a helper column, verify, then paste as values. It costs one extra column and it means a wrong formula affects a column you can delete rather than the only copy of your data.",
      "Normalise case and spacing before you match anything. TRIM and PROPER first, SUBSTITUTE second — otherwise every variant you failed to normalise is a variant your replacement silently missed.",
      "Inspect duplicates before deleting them. Rows sharing an OrderID with different products are a legitimate multi-line order, and blind deletion quietly removes real sales from your figures.",
      "Add validation as you clean. Every list and range rule you set removes that cleaning step permanently, and for data you cannot control at entry, a checks tab turns a monthly scramble into a two-minute check.",
    ],
    vocabulary: [
      { term: "Helper column", meaning: "A new column holding the cleaning formula, checked before being pasted back as values. Never clean in place." },
      { term: "TRIM", meaning: "Removes leading, trailing and repeated internal spaces. Fixes stray spacing in one step." },
      { term: "CLEAN", meaning: "Strips non-printing characters. Needed for data from other systems; invisible characters break matching." },
      { term: "SUBSTITUTE", meaning: "Replaces specified text. Chained to collapse spelling variants into one standard value." },
      { term: "VALUE / NUMBERVALUE", meaning: "Converts a text-number into a real number. Must be verified with ISNUMBER afterwards." },
      { term: "DATEVALUE", meaning: "Converts text to a date using your regional settings — which may not match the exporting system. Rebuild explicitly instead when dates are ambiguous." },
      { term: "Data validation", meaning: "Rules constraining what can be entered: a list for categories, a range for numbers. Stops the mess returning." },
      { term: "Cleaning log", meaning: "A record of each change, its reason and its row count. What lets you explain a figure to a manager six weeks later." },
    ],
    homework: [
      {
        task: "Standardise one dirty text column",
        detail:
          "Take a column with spelling variants from a real file, clean it in a helper column with TRIM, PROPER and SUBSTITUTE, and prove with a pivot table that the distinct count dropped.",
      },
      {
        task: "Convert a column of text-numbers",
        detail:
          "Strip any currency symbols and commas, convert with VALUE, verify every row with ISNUMBER, and record the sum before and after.",
      },
      {
        task: "Resolve a set of ambiguous dates",
        detail:
          "Rebuild them explicitly with DATE(year, month, day) and verify against rows that can only be read one way. Document the evidence for your decision.",
      },
      {
        task: "Add validation to a sheet you use regularly",
        detail:
          "One list rule on a category column and one range rule on a number column. Then try to break both and confirm they reject bad entry.",
      },
    ],
    rubric: [
      {
        criterion: "Text cleaning",
        passing: "Fixes inconsistent text.",
        excellent: "TRIM, PROPER and SUBSTITUTE chained in the correct order in a helper column, with PROPER's punctuation behaviour checked and results verified by pivot table.",
      },
      {
        criterion: "Type conversion",
        passing: "Makes numbers usable.",
        excellent: "Symbols and separators stripped, VALUE applied, every row confirmed with ISNUMBER, text quantities extracted, and the sum recorded before and after.",
      },
      {
        criterion: "Dates",
        passing: "Dates are consistent.",
        excellent: "Ambiguous dates rebuilt explicitly with DATE rather than left to DATEVALUE, and the logic verified against rows readable only one way.",
      },
      {
        criterion: "Duplicates and missing",
        passing: "Removes duplicates.",
        excellent: "True duplicates distinguished from multi-line orders by inspection, copied to a record tab before deletion, count verified, and all spellings of missing unified with a stated decision about how they are treated.",
      },
      {
        criterion: "Prevention",
        passing: "Cleans the file.",
        excellent: "List and range validation added to the columns that were dirty, a checks tab built for future exports, and a cleaning log recording every change with its row count.",
      },
    ],
    faqs: [
      {
        q: "Why not just use Find and Replace?",
        a: "Because it is invisible and irreversible. A helper column formula lets you see the result, verify it with a pivot table and delete the column if the logic is wrong. Find and Replace applied to 1,200 rows gives you no chance to check before the original values are gone.",
      },
      {
        q: "PROPER turned McDonald into Mcdonald. What do I do?",
        a: "That is expected — PROPER capitalises the letter after any punctuation, including the apostrophe. Fix the specific cases with SUBSTITUTE afterwards, or leave those values out of the PROPER step. Always check the output rather than assuming a function did the right thing.",
      },
      {
        q: "How do I know I removed the right duplicates?",
        a: "Inspect them before deleting, and keep a copy. Rows sharing an OrderID with identical values are true duplicates; rows sharing an ID with different products are a legitimate multi-line order. The number you delete should match the number you identified — if it does not, stop.",
      },
      {
        q: "What should I do with the missing payment methods?",
        a: "Standardise the four spellings into one value, then report what is known and say what is not. If 9 per cent are unrecorded, analyse the 91 per cent and state the gap. Do not present Not recorded alongside Cash and Transfer as though it were a payment method.",
      },
      {
        q: "My data comes from a system I cannot change. Does validation help?",
        a: "Yes, but on arrival rather than at entry. Build a checks tab with formulas that count rows where State is not in the allowed list, Quantity is out of range, or LineTotal does not equal Quantity times UnitPrice. Run it on every new export before you analyse.",
      },
    ],
  },

  "formulas-lookups": {
    summary:
      "Once data is clean, formulas turn rows into answers. This session covers conditional logic with IF and IFS, lookups with VLOOKUP and XLOOKUP for combining datasets, date and text handling for real questions, and the errors every lookup eventually produces.",
    objectives: [
      "Use IF, IFS and nested conditions to classify rows",
      "Combine two tables with a lookup and choose the right function",
      "Handle dates to answer monthly, weekly and period questions",
      "Read and fix #N/A, #VALUE! and #REF! errors",
      "Use COUNTIFS and SUMIFS for grouped totals",
      "Know when a formula is the wrong tool and a pivot table is right",
    ],
    blocks: [
      {
        heading: "Conditional logic",
        body: [
          "**`=IF(condition, value_if_true, value_if_false)`** is the basis of classification, and most analysis involves classifying rows. On our cleaned export, flagging large orders is one test: **`=IF(J2>50000, \"Large\", \"Standard\")`**. Marking whether an order is inside Lagos: **`=IF(E2=\"Lagos\", \"In-state\", \"Out-of-state\")`** — which is immediately useful, because in-state and out-of-state orders have different delivery costs and different margins.",
          "For more than two categories, **`=IFS()`** is cleaner than nesting IFs. Classifying order size into three bands reads far better as **`=IFS(J2>100000, \"Tier 1\", J2>50000, \"Tier 2\", TRUE, \"Tier 3\")`** than as nested IFs, and the final **`TRUE`** catches everything else — omit it and rows matching no condition return #N/A, which is a common and confusing surprise.",
          "Then **`=COUNTIFS()`** and **`=SUMIFS()`**, which answer grouped questions directly without a pivot table: **`=SUMIFS(J:J, E:E, \"Lagos\", K:K, \"Transfer\")`** gives total revenue from Lagos paid by transfer, and **`=COUNTIFS(E:E, \"Lagos\", J:J, \">50000\")`** counts the large Lagos orders. These are the fastest way to check a pivot table's answer, and being able to cross-check a number two different ways is worth a great deal when a manager is acting on it.",
        ],
      },
      {
        heading: "Lookups: combining two tables",
        body: [
          "Real analysis almost always needs data that lives in another table. Our export has a Product name but no cost price; cost price sits in a separate **product master** table of thirty rows. To calculate margin you must pull the cost across, and that is what a lookup does: **find this value in that table, return the matching cell**.",
          "**`=VLOOKUP(lookup_value, table_array, col_index, FALSE)`** is the classic, and the fourth argument matters more than any other detail in this course. **FALSE means exact match.** Omit it and VLOOKUP defaults to TRUE, which is an *approximate* match requiring the table to be sorted — and on unsorted data it silently returns the wrong row rather than an error. This single omitted argument is responsible for a great many confidently wrong spreadsheets.",
          "**`=XLOOKUP(lookup_value, lookup_array, return_array)`** is the modern replacement, available in Excel 365 and Google Sheets. It defaults to exact match, it can look left as well as right, and it takes an argument for what to return when nothing is found: **`=XLOOKUP(A2, Products!A:A, Products!C:C, \"Not in master\")`**. If you have it, use it. VLOOKUP still matters because most existing spreadsheets and most job interviews use it, and because you will inherit files written with it.",
        ],
      },
      {
        heading: "Dates and periods",
        body: [
          "Business questions are almost always about periods, so date functions are not a side topic. From a real date you can extract **`=YEAR(A2)`**, **`=MONTH(A2)`** and **`=DAY(A2)`**, which is how you group by month. **`=TEXT(A2, \"yyyy-mm\")`** produces a label like *2025-03* that sorts correctly and pivots cleanly — much better than a month number, which sorts 1, 10, 11, 12, 2.",
          "**`=DATEDIF(start, end, \"d\")`** gives the days between two dates, and **`=NETWORKDAYS(start, end)`** gives working days, which is what you need for delivery-time questions. **`=EOMONTH(A2, 0)`** returns the last day of that month, useful for period boundaries, and **`=TODAY()`** lets a report age itself rather than sitting at a fixed date nobody updates.",
          "The trap worth naming: **all of this only works on real dates**. If OrderDate is still text, YEAR returns an error or a nonsense number and grouping by month is simply unavailable. That is why session 2 rebuilt the dates explicitly — every period question in this course depends on that work having been done properly.",
        ],
      },
      {
        heading: "Reading errors instead of hiding them",
        body: [
          "Errors are information, and the first instinct to wrap everything in IFERROR is exactly wrong. **#N/A from a lookup means the value was not found in the other table** — in our case, a product in the orders that is not in the product master. That is a genuine finding, and hiding it with IFERROR conceals a real data problem behind a tidy zero.",
          "The other three you will meet constantly: **#VALUE!** means the wrong type was used, usually arithmetic on text — which in our dataset means a price that is still text somewhere. **#REF!** means a formula points at a cell that no longer exists, usually because a column was deleted; it is a warning that your workbook is broken, not a value to suppress. **#DIV/0!** means division by zero, which happens the moment you calculate an average over an empty group.",
          "The discipline is: **read the error, find the cause, fix the data or the formula**. Only then, if a legitimate absence should display as something readable, use **`=IFERROR(formula, \"Not in master\")`** — with a message that says what happened, not a blank or a zero. A zero that means *missing* will be averaged into your figures and drag them down, and nobody will be able to see why.",
        ],
      },
      {
        heading: "When a formula is the wrong tool",
        body: [
          "Formulas are precise and they are also where spreadsheets become unmaintainable. A workbook with 4,000 interdependent formulas, three of which contain a typo nobody can find, is a liability however correct its output looked last quarter. **If a question is about grouping and totalling, a pivot table is the right tool** — it is faster, it cannot contain a typo in the same way, and it updates when the data changes.",
          "Use formulas for what they are genuinely good at: **row-level classification** (this order is Tier 2), **lookups across tables** (pull the cost price), **derived columns** (margin, days to deliver) and **specific checks** (does LineTotal equal Quantity times UnitPrice). Use pivot tables for aggregation, and keep the number of distinct formulas in a workbook small enough that you could explain every one of them.",
          "The related discipline is **one calculation in one place**. If margin is calculated in six cells with slightly different formulas, they will eventually disagree and you will not know which is right. Calculate it once, in a column, and reference that column everywhere else.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor works on the cleaned export, building the columns the rest of the course needs — order tiers, in-state flagging, cost price looked up from a product master, margin, month labels and delivery days — then breaks a lookup deliberately to show what each error means and why suppressing it would hide a real problem.",
      steps: [
        {
          step: "Confirm the export is clean before starting",
          detail:
            "Check the checks tab from the last session is clear. Explain that formulas on dirty data produce precise wrong answers, which are worse than obviously wrong ones.",
        },
        {
          step: "Add a month label column",
          detail:
            "=TEXT(B2, \"yyyy-mm\"). Explain that a month number sorts 1, 10, 11, 12, 2 while a text label sorts correctly.",
        },
        {
          step: "Classify orders into tiers with IFS",
          detail:
            "=IFS(J2>100000, \"Tier 1\", J2>50000, \"Tier 2\", TRUE, \"Tier 3\"). Explain that the final TRUE catches everything else and omitting it returns #N/A.",
        },
        {
          step: "Flag in-state orders with IF",
          detail:
            "=IF(E2=\"Lagos\", \"In-state\", \"Out-of-state\"). Explain that the two groups have different delivery costs, so this column drives a real margin question.",
        },
        {
          step: "Open the product master table",
          detail:
            "Show thirty rows of product, category and cost price. Explain that cost price lives in another table, which is exactly the situation lookups exist for.",
        },
        {
          step: "Look up cost price with VLOOKUP",
          detail:
            "=VLOOKUP(F2, Products!A:C, 3, FALSE). Explain each argument, and that the table must have the lookup value in its first column.",
        },
        {
          step: "Delete the FALSE and show what happens",
          detail:
            "Demonstrate the approximate match returning a wrong cost silently. Explain that this one omitted argument causes more wrong spreadsheets than anything else in Excel.",
        },
        {
          step: "Do the same lookup with XLOOKUP",
          detail:
            "=XLOOKUP(F2, Products!A:A, Products!C:C). Explain that it defaults to exact match, can look left, and takes a not-found argument.",
        },
        {
          step: "Trigger a deliberate #N/A",
          detail:
            "Change one product name so it is not in the master. Explain that #N/A here is a real finding: a product being sold that is not in the product master.",
        },
        {
          step: "Show what IFERROR would hide",
          detail:
            "Wrap it as IFERROR(..., 0) and show margin become nonsense. Explain that a zero meaning missing gets averaged into your figures invisibly.",
        },
        {
          step: "Use a message instead of a zero",
          detail:
            "IFERROR(..., \"Not in master\"). Explain that the honest fix states what happened rather than inventing a number.",
        },
        {
          step: "Calculate margin in one column",
          detail:
            "=(J2 - Quantity times Cost) / J2. Explain the rule of one calculation in one place, because six slightly different margin formulas will eventually disagree.",
        },
        {
          step: "Compute delivery days with DATEDIF",
          detail:
            "Days between order and delivery date. Explain that NETWORKDAYS gives working days, which is what a delivery promise is actually measured in.",
        },
        {
          step: "Cross-check a pivot total with SUMIFS",
          detail:
            "=SUMIFS(J:J, E:E, \"Lagos\", K:K, \"Transfer\") against the pivot figure. Explain that checking a number two ways is worth a great deal when someone will act on it.",
        },
        {
          step: "Count large Lagos orders with COUNTIFS",
          detail:
            "=COUNTIFS(E:E, \"Lagos\", J:J, \">50000\"). Explain that the criteria syntax needs the comparison inside quotes.",
        },
        {
          step: "Trigger a #DIV/0! on an empty group",
          detail:
            "Average margin for a state with no orders. Explain that it means the group is empty, which is a fact about the data rather than a bug.",
        },
        {
          step: "Review which calculations should be pivot tables",
          detail:
            "Identify the aggregations among the new columns. Explain that grouping and totalling belongs in a pivot table, which cannot contain a typo in the same way.",
        },
      ],
    },
    practice: {
      title: "Build the derived columns the analysis needs",
      brief:
        "You extend the cleaned export with the derived columns the rest of the course depends on — month labels, order tiers, in-state flags, looked-up cost price, margin and delivery days — cross-checking your figures against pivot tables and resolving every error to its cause rather than suppressing it.",
      steps: [
        "Confirm the checks tab is clear before adding any formula.",
        "Add a month label column with TEXT in yyyy-mm format.",
        "Add a tier column with IFS, including a final TRUE catch-all.",
        "Add an in-state flag with IF comparing State to Lagos.",
        "Look up cost price from the product master with VLOOKUP and FALSE.",
        "Repeat the lookup with XLOOKUP and confirm both agree on every row.",
        "Deliberately break one lookup and record what the error was.",
        "Resolve that error by fixing the data, not by suppressing it.",
        "Use IFERROR with an explanatory message only where a genuine absence should be readable.",
        "Calculate margin once, in one column, and reference it everywhere else.",
        "Calculate delivery days with DATEDIF, and working days with NETWORKDAYS.",
        "Answer with SUMIFS: total revenue from Lagos paid by transfer.",
        "Answer with COUNTIFS: how many Lagos orders exceed 50,000 naira.",
        "Cross-check both answers against a pivot table and record any difference.",
        "Investigate and explain any difference rather than accepting it.",
        "List every distinct error in the workbook and the cause of each.",
        "Identify which of your columns should have been pivot tables instead.",
      ],
      standard:
        "The cleaned export extended with a yyyy-mm month label, an IFS tier column including a TRUE catch-all, an in-state flag, cost price looked up from the product master by both VLOOKUP with an explicit FALSE and XLOOKUP with both confirmed to agree on every row, margin calculated once in a single column and referenced elsewhere, and delivery days by DATEDIF with working days by NETWORKDAYS; one lookup deliberately broken with the resulting error recorded and resolved by fixing the data rather than suppressing it; IFERROR used only with an explanatory message; total Lagos transfer revenue by SUMIFS and the count of Lagos orders over 50,000 naira by COUNTIFS, both cross-checked against a pivot table with any difference investigated and explained; every distinct error in the workbook listed with its cause; and the columns that should have been pivot tables identified.",
    },
    pitfalls: [
      {
        problem: "You omit the FALSE in VLOOKUP",
        fix: "Always pass FALSE for an exact match. The default is an approximate match that requires sorted data and silently returns the wrong row on unsorted data — no error, just a wrong answer.",
      },
      {
        problem: "You wrap every formula in IFERROR",
        fix: "Read the error first. #N/A from a lookup means the value is genuinely missing from the other table, which is a finding — hiding it behind a zero conceals a real data problem.",
      },
      {
        problem: "You let IFERROR return zero for a missing value",
        fix: "Return a message such as Not in master. A zero meaning missing is averaged into your figures and drags them down, and nobody can see that it happened.",
      },
      {
        problem: "You omit the TRUE catch-all in IFS",
        fix: "Add TRUE as the final condition. Without it, rows matching no condition return #N/A, which looks like a lookup failure and sends you debugging the wrong thing.",
      },
      {
        problem: "You group by month number",
        fix: "Use TEXT with yyyy-mm. Month numbers sort 1, 10, 11, 12, 2, which produces a chart in the wrong order that is easy to miss.",
      },
      {
        problem: "You apply date functions to text dates",
        fix: "Convert to real dates first. YEAR on a text date returns an error or nonsense, and grouping by month is simply unavailable until the conversion is done.",
      },
      {
        problem: "The same calculation exists in six places",
        fix: "Calculate once in a column and reference it. Multiple slightly different formulas will eventually disagree and you will have no way to tell which is right.",
      },
      {
        problem: "You use formulas for aggregation",
        fix: "Use a pivot table for grouping and totalling. It is faster, it updates with the data, and it cannot contain a buried typo the way 4,000 interdependent formulas can.",
      },
    ],
    expertNotes: [
      "Always pass FALSE as the fourth VLOOKUP argument. The default approximate match silently returns wrong rows on unsorted data, and this single omission is responsible for more confidently wrong spreadsheets than anything else in Excel.",
      "Treat #N/A as a finding rather than a nuisance. A product in your orders that is not in your product master is a real problem someone needs to fix, and IFERROR with a zero hides it inside your averages.",
      "Cross-check important figures two ways — a pivot table and a SUMIFS. When someone is going to act on a number, being able to demonstrate it two independent ways is worth more than the number itself.",
      "Calculate each thing once, in one column, and reference it. Six slightly different margin formulas will eventually disagree, and at that point nobody can tell which one was ever right.",
    ],
    vocabulary: [
      { term: "IF / IFS", meaning: "Conditional classification. IFS needs a final TRUE catch-all or unmatched rows return #N/A." },
      { term: "VLOOKUP", meaning: "Finds a value in a table's first column and returns a cell from that row. The fourth argument must be FALSE for an exact match." },
      { term: "XLOOKUP", meaning: "The modern lookup: exact match by default, can look left, and accepts a not-found value. Prefer it where available." },
      { term: "SUMIFS / COUNTIFS", meaning: "Totals and counts with multiple conditions. The fastest independent check on a pivot table figure." },
      { term: "TEXT", meaning: "Formats a value as text. TEXT(date, yyyy-mm) makes month labels that sort correctly." },
      { term: "DATEDIF / NETWORKDAYS", meaning: "Days between dates, and working days between them. What delivery-time questions are actually measured in." },
      { term: "#N/A", meaning: "Not found. From a lookup, it means the value is genuinely absent from the other table — a finding, not noise." },
      { term: "#REF!", meaning: "A formula points at a deleted cell. It means the workbook is broken and must be fixed, never suppressed." },
    ],
    homework: [
      {
        task: "Combine two tables with a lookup",
        detail:
          "Take any two related tables — orders and products, staff and departments — and pull a field across. Do it with VLOOKUP and FALSE, then with XLOOKUP, and confirm they agree on every row.",
      },
      {
        task: "Break a lookup on purpose",
        detail:
          "Cause #N/A, #VALUE! and #DIV/0! deliberately. Write what each one actually meant in your data, and what you would fix rather than hide.",
      },
      {
        task: "Answer one business question two ways",
        detail:
          "Pick a total, compute it with SUMIFS and with a pivot table, and record whether they agree. If they do not, find out why before you trust either.",
      },
      {
        task: "Build three derived columns",
        detail:
          "A classification with IFS, a lookup column, and a date-derived column. Each calculated once, in one place, and referenced everywhere else.",
      },
    ],
    rubric: [
      {
        criterion: "Conditional logic",
        passing: "Uses IF correctly.",
        excellent: "IFS used for multi-band classification with a TRUE catch-all, conditions written against cleaned values, and results spot-checked against the underlying rows.",
      },
      {
        criterion: "Lookups",
        passing: "Pulls data from another table.",
        excellent: "VLOOKUP with an explicit FALSE and XLOOKUP both used and confirmed to agree on every row, with the approximate-match failure demonstrated and explained.",
      },
      {
        criterion: "Dates",
        passing: "Extracts month and year.",
        excellent: "yyyy-mm labels used so periods sort correctly, DATEDIF and NETWORKDAYS applied to a real delivery question, and all date work done on genuinely converted dates.",
      },
      {
        criterion: "Error handling",
        passing: "Notices errors.",
        excellent: "Each error traced to its cause and the data fixed, IFERROR used only with an explanatory message, and no missing value silently converted into a zero.",
      },
      {
        criterion: "Judgement",
        passing: "Formulas produce answers.",
        excellent: "Aggregations cross-checked with SUMIFS against a pivot table and any difference investigated, each calculation held in one place, and the columns that belonged in a pivot table identified.",
      },
    ],
    faqs: [
      {
        q: "VLOOKUP or XLOOKUP — which should I learn?",
        a: "Both. XLOOKUP is better — exact match by default, can look left, handles not-found values — and you should use it in new work. But most existing spreadsheets and most job interviews use VLOOKUP, so you need to read it and explain the FALSE argument.",
      },
      {
        q: "Why does my VLOOKUP return the wrong row?",
        a: "You almost certainly omitted the fourth argument. Without FALSE it does an approximate match, which requires the table to be sorted and silently returns a neighbouring row on unsorted data. Add FALSE and it will either match exactly or return #N/A.",
      },
      {
        q: "Should I use IFERROR to clean up my sheet?",
        a: "Only after you have read the error and fixed its cause. #N/A means a value is genuinely missing from the other table, which is a finding worth reporting. Wrapping it in IFERROR with a zero hides it inside your averages where nobody will find it.",
      },
      {
        q: "My months are in the wrong order on the chart. Why?",
        a: "You are grouping by month number, which sorts 1, 10, 11, 12, 2. Use TEXT with a yyyy-mm format to make a label that sorts correctly, or sort the pivot table by the underlying date rather than the label.",
      },
      {
        q: "When should I use a pivot table instead of a formula?",
        a: "For any grouping and totalling. Pivot tables are faster, update with the data, and cannot contain a buried typo the way thousands of interdependent formulas can. Save formulas for row-level classification, lookups and derived columns.",
      },
    ],
  },
};
