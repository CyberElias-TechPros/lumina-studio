import type { SessionLecture } from "../types";

export const microsoftOfficeExcelLessons: Record<string, SessionLecture> = {
  "excel-fundamentals": {
    summary:
      "Excel is not a grid of boxes — it is a calculation engine that happens to look like a grid. This session builds the mental model: workbooks, worksheets, cells and references, then data entry, number formatting, and the five functions that do most real-world work.",
    objectives: [
      "Explain the difference between a workbook, a worksheet and a cell",
      "Read and write cell references such as B7 or D2:D40",
      "Enter and edit data correctly, including dates, currency and text",
      "Format cells, set number formats, and adjust column widths and row heights",
      "Write formulas using cell references rather than typed numbers",
      "Use SUM, AVERAGE, MIN, MAX and COUNT and choose the right one",
    ],
    blocks: [
      {
        heading: "The mental model: everything has an address",
        body: [
          "A **workbook** is the file itself (the .xlsx). Inside it are **worksheets** — the tabs along the bottom, three by default. Each worksheet is a grid of **cells**, and every cell has an address made from its column letter and row number: the cell where column C meets row 12 is C12. A **range** is a rectangular block of cells written with a colon: C12:C20 means every cell from C12 down to C20. The **active cell** is the one with the dark border, and its address appears in the Name Box at top-left. The **formula bar** above the grid shows what is actually inside the active cell — which matters enormously, because a cell displaying '₦45,000' might contain the number 45000 formatted as currency, or the text string '₦45,000' which cannot be calculated. Look at the formula bar to know the truth.",
          "Once you see Excel this way, everything else follows. You are never 'typing in boxes'; you are storing values at addresses and then referring to those addresses in formulas. That indirection is the whole reason spreadsheets are useful: change one input and every calculation that references it updates instantly.",
        ],
      },
      {
        heading: "Data entry: the rules that prevent broken sheets",
        body: [
          "The most important rule in Excel is: **one fact per cell**. Never type 'Adebayo Okafor — 0803 456 7890' into one cell; put the name in one column and the phone number in another. Never type '₦45,000' as text; type 45000 and format it as currency. Never leave a blank row in the middle of a data list — Excel reads contiguous blocks, and a blank row silently truncates your range. And never merge cells in a data table; merging breaks sorting, filtering and formulas. Merge cells for display headings only.",
          "Dates deserve particular care in Nigeria because of format confusion. Type dates in an unambiguous form and let formatting handle display. Excel stores dates as serial numbers, which is why it can calculate the difference between them — but only if it recognises what you typed as a date. If a date appears left-aligned, Excel read it as text and no date maths will work. Right-aligned numbers and dates are real values; left-aligned entries are text. That single visual cue will save you hours.",
          "Editing: double-click a cell or press F2 to edit inside it. Press Enter to commit and move down, Tab to commit and move right, Escape to abandon the edit. Ctrl+; inserts today's date. Ctrl+' copies the value from the cell directly above, which is enormously useful when filling a column.",
        ],
      },
      {
        heading: "Formatting: number formats, borders and dimensions",
        body: [
          "Number formatting changes how a value *displays* without changing what it *is*. The same number 45000 can show as 45000, 45,000, ₦45,000, 45000.00 or 4.5E+04 depending on format. Home → Number Format dropdown gives you General, Number, Currency, Accounting, Date, Percentage and Text. Use Accounting for financial columns because it aligns the currency symbol at the left of the cell and negatives in brackets, which is what Nigerian financial statements use. Use Percentage when the underlying value is a decimal (0.15 displays as 15%).",
          "The trap: formatting does not change the stored value. If a cell holds 45000.678 and you format it to zero decimals, it displays 45001 but any formula using it still uses 45000.678. When displayed totals do not add up to the sum of displayed rows, this is almost always why. Use ROUND() in the formula when the rounded value is the real business value.",
          "Then the visual layer: **borders** (Home → Borders) draw lines around cells — Excel's faint gridlines never print, so if you want lines on paper you must add borders. **Column width** is adjusted by double-clicking the boundary between column headers to auto-fit, or dragging it manually. **Row height** works the same way. **Wrap Text** makes long content flow onto multiple lines within its cell, and after enabling it you usually need to auto-fit the row height. Finally, **Freeze Panes** (View → Freeze Panes) locks your header row and first column in place so a long list stays readable as you scroll — set this on every table longer than a screen.",
        ],
      },
      {
        heading: "Formulas: the point of the whole exercise",
        body: [
          "Every formula begins with `=`. What follows can be arithmetic (`=B2*C2`), a function (`=SUM(B2:B20)`), or a mix. The critical discipline is that you reference cells, not values. `=B2*0.15` is fragile; `=B2*$E$1` where E1 holds the VAT rate is maintainable — change E1 once and every row updates.",
          "Operators in order of precedence: parentheses first, then exponent `^`, then multiplication and division `*` `/`, then addition and subtraction `+` `-`. Use parentheses liberally; `=(B2+C2)*0.15` and `=B2+C2*0.15` give completely different answers and only one of them is what you meant.",
          "The five functions that carry most everyday work: **SUM** adds a range (`=SUM(D2:D40)`); **AVERAGE** computes the mean (`=AVERAGE(D2:D40)`); **MIN** and **MAX** return the smallest and largest values; **COUNT** counts cells containing numbers — note the difference from **COUNTA**, which counts any non-empty cell including text. Choosing COUNT when you meant COUNTA, or the reverse, is one of the most common beginner errors. All of these ignore empty cells and text within the range, which is usually what you want but occasionally is not.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor builds a personal monthly expense sheet live, from a blank workbook to a formatted, formula-driven sheet with totals.",
      steps: [
        {
          step: "Set up the table structure",
          detail:
            "Rename Sheet1 to 'September' by double-clicking the tab. In row 1 type headers: Date, Description, Category, Amount. Say out loud that row 1 is headers and data starts at row 2 — this is the convention every tool expects.",
        },
        {
          step: "Enter twelve rows of real expenses",
          detail:
            "Use realistic entries: transport, data subscription, fuel, food, rent contribution. Type dates as 01/09/2026 style, amounts as plain numbers with no currency symbol and no comma. Watch how dates and numbers right-align — confirm they are real values, not text.",
        },
        {
          step: "Demonstrate the one-fact-per-cell rule",
          detail:
            "Deliberately type 'Transport - 08034567890' into one cell, then split it into two columns and explain why the split version can be sorted, filtered and summed while the combined version cannot.",
        },
        {
          step: "Format the amount column as currency",
          detail:
            "Select D2:D13, Home → Number Format → Accounting, choose the Naira symbol, 2 decimal places. Show that the underlying value did not change by clicking a cell and reading the formula bar.",
        },
        {
          step: "Auto-fit columns and wrap the description",
          detail:
            "Double-click the boundary between column B and C headers to auto-fit. Select the Description column, click Wrap Text, then auto-fit the row heights by selecting all rows and double-clicking a row boundary.",
        },
        {
          step: "Add borders and freeze the header",
          detail:
            "Select A1:D13, Home → Borders → All Borders. Then View → Freeze Panes → Freeze Top Row. Scroll down and show that the headers stay visible.",
        },
        {
          step: "Write the SUM formula",
          detail:
            "In A15 type 'Total'. In D15 type `=SUM(D2:D13)` and press Enter. Then click D15 and drag the fill handle — the small square at the bottom-right corner — to show how formulas copy. Explain that D2:D13 becomes D3:D14 as it moves, which is relative referencing.",
        },
        {
          step: "Add AVERAGE, MIN, MAX and COUNT",
          detail:
            "In D16 type `=AVERAGE(D2:D13)`, D17 `=MIN(D2:D13)`, D18 `=MAX(D2:D13)`, D19 `=COUNT(D2:D13)`. Label each in column A. Discuss what each number tells you about the month.",
        },
        {
          step: "Break it on purpose, then fix it",
          detail:
            "Type '₦5,000' as text into D14 and show that SUM ignores it and COUNT does not count it. Delete it and explain the lesson: text in a number column is invisible to maths.",
        },
        {
          step: "Save and print",
          detail:
            "Save as `Session-04_Expenses_YourName.xlsx`. Page Layout → set to fit one page wide, add borders, then Ctrl+P to preview. Export a PDF copy.",
        },
      ],
    },
    practice: {
      title: "Personal or business expense sheet",
      brief:
        "Build a working expense sheet for a real month — yours, your family's, or a small business you know. Twelve entries minimum, properly formatted, with the five summary functions and a percentage breakdown of your three largest categories.",
      steps: [
        "Create headers in row 1: Date, Description, Category, Amount.",
        "Enter at least twelve real transactions with correct data types.",
        "Format the Amount column as Naira accounting format.",
        "Auto-fit columns, wrap descriptions, add all borders, freeze the header row.",
        "Add a Total row using SUM.",
        "Add AVERAGE, MIN, MAX and COUNT rows with labels.",
        "Add a small summary block calculating each category's share as a percentage of the total.",
        "Change one amount and confirm every figure updates automatically.",
        "Save the .xlsx and export a one-page PDF.",
      ],
      standard:
        "Every amount is a real number formatted as currency (not text), no merged cells in the data, the header row is frozen, all five functions return correct values, and editing one input updates every dependent figure.",
    },
    pitfalls: [
      {
        problem: "A number is left-aligned and formulas ignore it",
        fix: "Excel read it as text, usually because of a leading apostrophe, a space, or a currency symbol typed by hand. Retype it as a plain number, or select the range and use Data → Text to Columns → Finish to force conversion.",
      },
      {
        problem: "SUM returns 0 or less than expected",
        fix: "There is text in the range, or the range does not cover the cells you think it does. Click the SUM cell and look at the coloured outline Excel draws around the referenced range — it shows you exactly what is included.",
      },
      {
        problem: "Your displayed total does not equal the sum of the displayed rows",
        fix: "Display rounding. The cells hold decimals but show whole numbers. Use =ROUND(value, 2) in the formula if the rounded figure is the true business value.",
      },
      {
        problem: "Sorting scrambles your data",
        fix: "You sorted one column instead of the whole table. Always select the entire data range (or click any cell and let Excel detect the region) before sorting, and confirm 'Expand the selection' when Excel asks.",
      },
      {
        problem: "Merged cells break your formulas",
        fix: "Unmerge. A merged cell occupies multiple addresses but stores its value in only the top-left one, so formulas referencing the others return empty. Use 'Centre Across Selection' in Format Cells → Alignment if you want the visual effect without the damage.",
      },
      {
        problem: "You typed a formula and the cell shows the text instead of the result",
        fix: "The cell is formatted as Text. Change the format to General, then double-click the cell and press Enter to re-evaluate it.",
      },
    ],
    expertNotes: [
      "Learn Ctrl+arrow keys immediately. Ctrl+Down jumps to the last populated cell in a column, Ctrl+Right to the last in a row. Add Shift to select everything in between. This is how professionals navigate 5,000-row sheets, and it takes one afternoon to become automatic.",
      "Convert real data tables into Excel Tables (Ctrl+T). You get automatic banded rows, filter buttons, a header row that repeats, and — most valuable — formulas that expand automatically when you add rows. It also gives your ranges readable names like Table1[Amount].",
      "Name your important cells. Select the cell holding the VAT rate, type a name in the Name Box (say `VAT_Rate`), press Enter. Now `=B2*VAT_Rate` is self-documenting and cannot be broken by someone inserting a row. This is a five-second habit that makes sheets readable by other people.",
      "Press Ctrl+` (the backtick) to toggle formula view, which shows every formula in the sheet instead of results. It is the fastest way to audit a spreadsheet you did not build — and to check your own work before you send it.",
    ],
    vocabulary: [
      {
        term: "Workbook / worksheet",
        meaning:
          "The workbook is the file; worksheets are the tabs inside it. Every sheet has its own independent grid.",
      },
      {
        term: "Cell reference",
        meaning:
          "A cell's address, written column letter then row number — C12, or a range like C12:C20.",
      },
      {
        term: "Formula bar",
        meaning:
          "The bar above the grid showing the true contents of the active cell, revealing whether a value is a number, a date or text.",
      },
      {
        term: "Number format",
        meaning:
          "How a value is displayed without changing the stored value — currency, percentage, date, decimals.",
      },
      {
        term: "Accounting format",
        meaning:
          "A number format that left-aligns the currency symbol and shows negatives in brackets; the standard for financial statements.",
      },
      {
        term: "Freeze panes",
        meaning: "Locking header rows or columns in place so they remain visible while scrolling.",
      },
      {
        term: "Fill handle",
        meaning:
          "The small square at a cell's bottom-right corner used to copy formulas or continue a series by dragging.",
      },
      {
        term: "COUNT vs COUNTA",
        meaning:
          "COUNT counts cells containing numbers; COUNTA counts any non-empty cell including text.",
      },
    ],
    homework: [
      {
        task: "Track real spending for one week",
        detail:
          "Record every expense for seven days in the sheet you built, then total it, average it and identify your largest category. Bring the numbers to the next session.",
      },
      {
        task: "Practise cell references until they are automatic",
        detail:
          "On paper, write the addresses of ten cells the instructor calls out, and write the range notation for five blocks. Then do it in Excel against the clock.",
      },
      {
        task: "Build a class attendance sheet",
        detail:
          "Create a sheet with student names down the rows and five session dates across the columns. Use COUNT to total attendance per student and per session.",
      },
      {
        task: "Break your own sheet and diagnose it",
        detail:
          "Deliberately introduce a text value in a number column and a blank row inside a data range. Observe how SUM and COUNT respond, then fix both. Being able to diagnose is more valuable than never making the error.",
      },
    ],
    rubric: [
      {
        criterion: "Data structure",
        passing: "One fact per cell, headers in row 1, no blank rows inside the data.",
        excellent:
          "Uses an Excel Table or named ranges, no merged cells in data, and consistent data types throughout.",
      },
      {
        criterion: "Data types",
        passing: "Amounts are real numbers, dates are real dates.",
        excellent:
          "Can demonstrate right-versus-left alignment as the text test and explain how date serial numbers work.",
      },
      {
        criterion: "Formatting",
        passing: "Currency format applied, borders added, columns sized.",
        excellent:
          "Accounting format, frozen header, wrapped text with fitted rows, and a print setup that fits one page.",
      },
      {
        criterion: "Formulas",
        passing: "SUM, AVERAGE, MIN, MAX and COUNT return correct results.",
        excellent:
          "Uses cell references rather than typed values, understands relative referencing when filling, and can explain why a formula result changed.",
      },
    ],
    faqs: [
      {
        q: "Should I learn Excel or Google Sheets?",
        a: "Learn Excel first. It is what Nigerian employers specify, what government and bank forms assume, and it has the deeper feature set. Google Sheets is nearly identical in concept and you will pick it up in an afternoon once you know Excel — the formulas, references and formatting logic are the same.",
      },
      {
        q: "Why does Excel keep changing my phone numbers into scientific notation?",
        a: "It is treating the number as a numeric value and abbreviating a long one. Format the column as Text *before* typing, or prefix the entry with an apostrophe ('08034567890). Phone numbers, account numbers and ID numbers are identifiers, not quantities — they should always be text so leading zeros survive.",
      },
      {
        q: "What is the difference between =SUM(A1:A10) and =A1+A2+A3...?",
        a: "They give the same answer today and behave completely differently tomorrow. The range version automatically adapts if you insert a row inside it; the typed-out version does not, and silently omits the new row. Always use the range version.",
      },
      {
        q: "How do I stop Excel from auto-completing my entries?",
        a: "File → Options → Advanced → untick 'Enable AutoComplete for cell values'. AutoComplete copies patterns from the column above, which is helpful for categories and dangerous for names and amounts.",
      },
      {
        q: "My formula shows ###### instead of a number. What happened?",
        a: "Nothing is wrong with the formula — the column is too narrow to display the value. Double-click the column boundary to auto-fit. If a date shows #####, it means the date is negative, which means a subtraction produced an impossible date.",
      },
    ],
  },

  "practical-excel": {
    summary:
      "The Excel skills that turn a list into a report. Sorting and filtering to interrogate data, tables for structure, percentages and calculations for insight, relative references for scale, and charts for communicating the result — finished with printing that actually fits the page.",
    objectives: [
      "Sort data by one or several columns without scrambling rows",
      "Filter a list to answer a specific question",
      "Convert a range into an Excel Table and use its features",
      "Calculate percentages, VAT, discounts and growth correctly",
      "Use relative and absolute references deliberately",
      "Choose and build the right chart — bar, pie or line",
      "Set up a spreadsheet to print cleanly",
    ],
    blocks: [
      {
        heading: "Sorting and filtering: asking questions of your data",
        body: [
          "**Sorting** reorders rows. Data → Sort lets you sort by one column, or add levels — sort by Category, then within each category by Amount descending. The rule that prevents disaster: always sort the whole table, never a single column. If Excel prompts 'Expand the selection', choose it. Sorting one column alone shuffles that column against the others and destroys the relationship between a name and its amount, which is a data-integrity failure you may not notice for weeks.",
          "**Filtering** hides rows that do not match a condition, leaving the data intact. Select the table, Data → Filter, and dropdown arrows appear on the headers. Tick boxes for exact values, or use Text Filters / Number Filters for conditions like 'greater than 50000' or 'contains church'. The status bar then shows the count and sum of visible cells only — which is how you answer 'what did we spend on transport this month' in three clicks. To clear, use Data → Clear; the data was never deleted, only hidden.",
        ],
      },
      {
        heading: "Tables, percentages and calculations",
        body: [
          "Select any data range and press **Ctrl+T** to convert it to an Excel Table. You gain filter buttons, banded rows, automatic expansion, a repeating header on every printed page, and structured references. It also means new rows inherit the column's format and formulas automatically. For any list you will keep adding to, this is the first thing to do.",
          "**Percentages** are where most spreadsheet errors live. A percentage is a ratio, and Excel stores ratios as decimals: 15% is 0.15. To find what share one item is of a total, divide: `=D2/$D$15`, then format the result as Percentage. To add VAT of 7.5% to an amount, multiply by 1.075 (`=D2*1.075`) — not by 0.075, which gives you only the VAT. To remove VAT from a VAT-inclusive figure, divide by 1.075. Learn these three patterns cold; they cover most Nigerian financial spreadsheet work, and 7.5% VAT appears in almost all of it.",
          "Then the everyday calculations: discount `=Price*(1-DiscountRate)`; margin `=(Selling-Cost)/Selling`; growth between two periods `=(New-Old)/Old`; running total `=SUM($D$2:D2)` filled down, where the mixed reference locks the start and lets the end move.",
        ],
      },
      {
        heading: "Relative, absolute and mixed references",
        body: [
          "This is the concept that separates people who use Excel from people who fight it. When you copy a formula, Excel adjusts its references *relative* to how far the formula moved. `=B2*C2` filled down one row becomes `=B3*C3` — usually exactly what you want. But if that formula refers to a fixed cell, like a VAT rate in E1, filling it down turns E1 into E2, E3, E4 and your calculation quietly breaks.",
          "The dollar sign locks a reference. `$E$1` never changes no matter where the formula is copied — that is an **absolute** reference. `$E1` locks the column but lets the row move; `E$1` locks the row but lets the column move — these are **mixed** references and they are what make cross-tabulation tables work. Press **F4** while the cursor is inside a reference to cycle through the four forms. Learn to reach for F4 without thinking: it is the single keystroke that prevents the most expensive category of spreadsheet error, the one where the numbers look plausible and are wrong.",
        ],
      },
      {
        heading: "Charts: choosing the right picture",
        body: [
          "Charts exist to answer a question faster than reading numbers can. Choose by the question, not by what looks attractive. **Bar and column charts** compare quantities across categories — spending by category, sales by branch. Use columns for few categories with short labels and horizontal bars when labels are long. **Pie charts** show parts of a whole and are only honest with five slices or fewer, clearly different values, and a total that genuinely sums to 100% — otherwise use a bar chart. **Line charts** show change over time and are the correct choice for anything with dates on the horizontal axis; a pie chart of monthly figures is meaningless because months are not parts of a whole.",
          "Build them from properly structured data: categories in one column, values in the adjacent column, headers in row 1. Select both, Insert → the chart type. Then do the three things beginners skip: give the chart a title that states the finding rather than the topic ('Transport was 34% of September spending', not 'Spending Chart'), add axis titles with units, and add data labels only where they help. Delete the legend if the categories are already labelled on the axis. Resize by dragging corners, never edges, or you distort the proportions.",
        ],
      },
      {
        heading: "Printing spreadsheets that fit",
        body: [
          "Spreadsheets print badly by default because they are wide. Fix it deliberately: Page Layout → Orientation → Landscape for wide tables; Scale → 'Fit All Columns on One Page' so nothing spills onto a second sheet; Margins → Narrow if needed; and Page Layout → Print Area → Set Print Area to print only the table rather than the empty grid. Print Titles (Page Layout → Print Titles → Rows to repeat at top) makes your header row appear on every printed page, which is essential for multi-page reports.",
          "Before printing anything, Ctrl+P and read the preview page by page. Check that no column is split across pages, that totals appear on the last page, and that gridlines and headers are on if you want them (Page Layout → Sheet Options → Print → tick Gridlines and Row & Column Headings). Then export a PDF and send that, because a PDF preserves the layout you just fought for.",
        ],
      },
    ],
    demonstration: {
      intro:
        "Starting from last session's expense sheet, the instructor produces a one-page monthly report with a summary table and two charts.",
      steps: [
        {
          step: "Convert to a table",
          detail:
            "Click any cell in the data, Ctrl+T, confirm the range includes headers. Note the filter arrows and banded rows. Add three more rows and show that formatting and formulas carried down automatically.",
        },
        {
          step: "Sort and filter to answer a question",
          detail:
            "Sort by Amount descending to find the biggest expenses. Then filter Category to 'Transport' and read the count and sum from the status bar. Clear the filter and confirm no data was lost.",
        },
        {
          step: "Build a category summary with percentages",
          detail:
            "Create a small summary block listing each category. Use SUMIF to total each category's amount, then divide by the grand total using an absolute reference to the total cell, and format as Percentage. Show what happens without the dollar signs — this is the F4 lesson made visible.",
        },
        {
          step: "Add a VAT calculation",
          detail:
            "Add a column showing 7.5% VAT on each amount using `=D2*0.075`, and another showing the VAT-inclusive total using `=D2*1.075`. Explain the difference between adding VAT and extracting it.",
        },
        {
          step: "Build a column chart",
          detail:
            "Select the summary block's categories and amounts, Insert → Column Chart. Retitle it to state the finding. Add data labels. Delete the legend since the axis already names the categories.",
        },
        {
          step: "Build a pie chart correctly",
          detail:
            "Same data, Insert → Pie Chart. Show what it looks like with eight categories and discuss why it fails, then group the smallest three into 'Other' and show the improvement.",
        },
        {
          step: "Build a line chart from dated data",
          detail:
            "Summarise spending by date, select date and amount, Insert → Line Chart. Contrast this with the pie chart of the same data and explain why the line is the only honest choice.",
        },
        {
          step: "Set up printing",
          detail:
            "Landscape, Fit All Columns on One Page, Print Titles set to row 1, print area set to the report block. Preview every page.",
        },
        {
          step: "Audit before sending",
          detail:
            "Ctrl+` to show all formulas. Read every one aloud and confirm each references what it should. Then export the PDF.",
        },
      ],
    },
    practice: {
      title: "Sales or expense report",
      brief:
        "Produce a one-page monthly report from a raw dataset: a category summary with percentages, at least two correctly chosen charts, and a three-sentence written summary of what the data shows.",
      steps: [
        "Convert the raw data into an Excel Table.",
        "Sort and filter to identify the three largest items.",
        "Build a category summary with amounts and percentage shares.",
        "Add VAT or discount calculations where relevant to the data.",
        "Create one bar or column chart and one line or pie chart, chosen for the question each answers.",
        "Title each chart with its finding, not its topic.",
        "Write three sentences interpreting the results in plain language.",
        "Set up the page and export a one-page PDF.",
      ],
      standard:
        "The report fits one page, every chart type is justified by the question it answers, percentages sum to 100%, references use absolute locking where required, and the written summary states findings rather than describing the chart.",
    },
    pitfalls: [
      {
        problem: "Sorting one column destroys the row relationships",
        fix: "Always sort the whole table. When Excel asks, choose 'Expand the selection'. If you use an Excel Table, this cannot happen.",
      },
      {
        problem: "Percentages do not add up to 100%",
        fix: "Either the denominator differs between rows (you forgot the absolute reference) or categories overlap. Check every percentage divides by the same total cell, written as $D$15.",
      },
      {
        problem: "You added VAT by multiplying by 0.075 and got a tiny number",
        fix: "0.075 gives you the VAT alone. Multiply by 1.075 to get the VAT-inclusive total. To reverse a VAT-inclusive figure, divide by 1.075 — never multiply by 0.925.",
      },
      {
        problem: "A pie chart with twelve slices is unreadable",
        fix: "Group the small categories into 'Other' or switch to a bar chart sorted descending. If you cannot read the slices, the reader cannot either.",
      },
      {
        problem: "A line chart of monthly data was drawn as a bar chart",
        fix: "Time belongs on a line chart. Bar and column charts compare separate categories; a line shows a trend, which is the actual point of monthly data.",
      },
      {
        problem: "The report prints across four pages and columns are split",
        fix: "Page Layout → Scale → Fit All Columns on One Page, set the print area, and set Print Titles to repeat the header row. Preview before printing.",
      },
    ],
    expertNotes: [
      'Learn SUMIF and COUNTIF this session even though they are not on the topic list — `=SUMIF(CategoryRange,"Transport",AmountRange)` replaces an entire manual filter-and-add workflow. They are the most-used functions in real Nigerian business spreadsheets after SUM itself.',
      "Use Paste Special → Values when you have finished with a calculation and want to freeze the results. Copy, then right-click → Paste Special → Values. The formulas become static numbers, which prevents someone editing an input and silently changing your delivered report.",
      "Duplicate a worksheet (right-click the tab → Move or Copy → Create a copy) before making experimental changes. It costs nothing and it means you can always compare against the original — the spreadsheet equivalent of keeping a backup.",
      "Name your charts' source ranges and keep chart data adjacent to the chart. When a chart is built from a range on another sheet, nobody can audit it six months later. Keep the summary block visible next to the chart it feeds.",
    ],
    vocabulary: [
      {
        term: "Filter",
        meaning:
          "Temporarily hides rows that do not match a condition. Data is never deleted, only hidden.",
      },
      {
        term: "Excel Table",
        meaning:
          "A structured range (Ctrl+T) with automatic formatting, filters, expansion and structured references.",
      },
      {
        term: "Absolute reference",
        meaning:
          "A cell reference with dollar signs — $E$1 — that does not change when the formula is copied.",
      },
      {
        term: "Mixed reference",
        meaning: "A reference locking either the row or the column only, such as $E1 or E$1.",
      },
      {
        term: "SUMIF / COUNTIF",
        meaning: "Functions that total or count only the rows matching a condition.",
      },
      {
        term: "Data labels",
        meaning:
          "Values printed directly on chart elements so the reader does not have to estimate from the axis.",
      },
      {
        term: "Print area",
        meaning: "The specific range Excel will print, excluding everything else on the sheet.",
      },
      {
        term: "Print titles",
        meaning: "Rows or columns repeated at the top or left of every printed page.",
      },
    ],
    homework: [
      {
        task: "Analyse a real dataset",
        detail:
          "Take your own month of spending, or ask a small business you know for an anonymised sales list, and produce the full report: summary, percentages, two charts, three findings.",
      },
      {
        task: "Master F4",
        detail:
          "Build a small table where one formula must reference a fixed rate cell. Fill it down with and without absolute references and compare. Write down what F4 does in one sentence.",
      },
      {
        task: "Deliberately choose the wrong chart and defend it",
        detail:
          "Make a pie chart of twelve categories and a line chart of a single comparison. Explain in writing why each is wrong and what the correct choice would be. Recognising a bad chart is a professional skill.",
      },
      {
        task: "Print a real report",
        detail:
          "Configure page setup so your report prints on exactly one A4 page, then actually print it or export the PDF. Verify no column is split and the header repeats.",
      },
    ],
    rubric: [
      {
        criterion: "Data interrogation",
        passing: "Sorts and filters correctly without scrambling rows.",
        excellent:
          "Uses multi-level sorting, Excel Tables and SUMIF to answer questions without manual work.",
      },
      {
        criterion: "Calculation accuracy",
        passing: "Percentages and VAT calculations are correct.",
        excellent:
          "Uses absolute and mixed references deliberately and can explain the difference between adding and extracting VAT.",
      },
      {
        criterion: "Chart selection",
        passing: "Charts are built and readable.",
        excellent:
          "Each chart type is justified by the question, titled with its finding, and honestly represents the data.",
      },
      {
        criterion: "Reporting",
        passing: "Report fits one page with a header and totals.",
        excellent:
          "Print area, titles and scale configured, plus a written interpretation stating findings rather than describing charts.",
      },
    ],
    faqs: [
      {
        q: "When should I use a pie chart at all?",
        a: "Rarely. A pie chart is honest only when you have five or fewer categories, the slices are visibly different sizes, and the parts genuinely sum to a whole. For almost everything else a horizontal bar chart sorted from largest to smallest communicates the same information faster and more accurately.",
      },
      {
        q: "How do I calculate a running total?",
        a: "Use a mixed reference: `=SUM($D$2:D2)` in the first row, then fill down. The start is locked with dollar signs while the end moves, so each row sums everything from the top to itself. This is the clearest practical demonstration of why mixed references exist.",
      },
      {
        q: "My filter hides rows but the total at the bottom still counts them",
        a: "Correct — SUM ignores filters. Use SUBTOTAL(109, range) instead of SUM; the 109 tells it to sum only visible rows and to ignore other SUBTOTAL results. This is standard practice on any sheet people will filter.",
      },
      {
        q: "What is the difference between a chart and a PivotChart?",
        a: "A regular chart plots a range you prepared. A PivotChart is driven by a PivotTable, which summarises raw data interactively — drag a field and the totals recalculate. PivotTables are the next step beyond this session and are the single most valuable Excel skill for reporting work.",
      },
    ],
  },

  powerpoint: {
    summary:
      "The final session, and the one that puts you in front of a room. You learn to build a presentation that supports a speaker rather than replacing one: slides, layouts, themes, text, images, shapes, icons, transitions, animations, speaker notes and presentation mode — then you deliver a 5–7 slide presentation to the class.",
    objectives: [
      "Create a presentation and choose or build a coherent theme",
      "Use layouts instead of dragging text boxes around",
      "Write slide text that a room can read in three seconds",
      "Insert and position images, shapes and icons purposefully",
      "Apply transitions and animations sparingly and consistently",
      "Write speaker notes and present from them",
      "Deliver a 5–7 slide presentation confidently",
    ],
    blocks: [
      {
        heading: "What a slide is for",
        body: [
          "A slide is not a document. It is a visual aid for a person speaking, and its job is to make the speaker's point land faster than speech alone could. That single idea determines almost every rule in this session. If your slides can be read and understood without you, you have written a document and should have sent it as a PDF instead. If your slides are unreadable from the back of the room, they are decoration.",
          "The practical consequence: very little text per slide. One idea per slide. Large type — 28pt minimum for body, 40pt or more for headings, because a projection in a bright Nigerian hall with a weak projector loses more than you expect. Full sentences become fragments. And the speaker carries the detail, not the slide.",
        ],
      },
      {
        heading: "Slides, layouts and themes: structure before content",
        body: [
          "Every new slide should start from a **layout** (Home → Layout): Title Slide, Title and Content, Two Content, Section Header, Title Only, Blank. Layouts are pre-built arrangements with correct placeholder positions, sizes and inheritance from the theme. Beginners skip layouts and drag text boxes manually, which produces slides that are inconsistent with each other and impossible to restyle later. Choose the layout, then fill the placeholders.",
          "The **theme** (Design tab) sets the colour palette, the font pairing and the background for the entire presentation. Choose one before you build anything, because changing it later restyles every slide. If you need a change to apply to every slide — a logo, a footer, a heading position — do not format each slide; use View → Slide Master and edit the master. One edit, applied everywhere. That is the difference between a presentation you can maintain and one you must rebuild.",
        ],
      },
      {
        heading: "Text, images, shapes and icons",
        body: [
          "Text on a slide follows hierarchy rules: one heading, one level of body text, bullet fragments rather than sentences, and no more than six lines. If you need more, you need another slide. Use bold for the key phrase in a bullet rather than making everything bold.",
          "**Images** (Insert → Pictures) should be large and relevant — one strong image beats four small ones. Use Picture Format → Crop to remove the irrelevant parts, and Correct/Color to fix exposure. Always compress images (Picture Format → Compress Pictures) or your file becomes enormous and slow on a borrowed laptop. **Shapes** (Insert → Shapes) build diagrams, highlight regions and create simple flow charts; use Align (Shape Format → Align) to distribute them evenly rather than eyeballing. **Icons** (Insert → Icons) are vector graphics that scale cleanly and can be recoloured to match your theme — they look far more professional than clip art, and they are the modern replacement for it.",
        ],
      },
      {
        heading: "Transitions and animations: restraint is the skill",
        body: [
          "A **transition** is how one slide replaces the previous one. An **animation** is how an element within a slide appears or moves. Both exist to control the audience's attention, and both destroy attention when overused. The professional default is one subtle transition applied to all slides — Fade, applied via Transitions → Apply To All — and no animation at all on most slides.",
          "Use animation deliberately for one purpose: revealing bullet points one at a time so the room listens to you rather than reading ahead. Animations → Add Animation → Fade or Wipe, then Effect Options → By Paragraph. Set the trigger to 'On Click' so you control the pace. Avoid bounce, spin, and anything that draws attention to the effect rather than the content. If the audience notices your animation, you have used too much of it.",
        ],
      },
      {
        heading: "Speaker notes and presenting",
        body: [
          "**Speaker notes** (View → Notes, or the Notes pane at the bottom) hold what you will say, not what the slide says. Write them as prompts, not scripts — a script makes you read, and reading loses a room. Three or four keywords per slide are enough if you know the material.",
          "Then the delivery mechanics. **F5** starts from the beginning; **Shift+F5** starts from the current slide. Arrow keys and the space bar advance; Esc exits; the **B** key blacks the screen when you want attention back on you; **Ctrl+P** turns the cursor into a pen for drawing on slides. If you have a second screen, Presenter View (Slide Show → Use Presenter View) shows you the current slide, the next slide, your notes and a timer while the audience sees only the slide — practise with it, because it changes how you present.",
          "Finally, the habits that make delivery work: arrive early and test on the actual projector; carry your file on a USB drive *and* in your email *and* as a PDF backup, because fonts and layouts do break on unfamiliar machines; keep it to one minute per slide; and rehearse aloud at least twice, timing yourself, because a presentation that has never been spoken always runs long.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor builds a seven-slide presentation live from a blank file, then delivers it — including two deliberate mistakes so the class learns to spot them.",
      steps: [
        {
          step: "Start from a theme, not a template",
          detail:
            "New blank presentation. Design → choose a simple theme. Explain why a plain theme with good typography beats a busy template that fights your content.",
        },
        {
          step: "Build the title slide with the correct layout",
          detail:
            "Home → Layout → Title Slide. Type the title and a subtitle with your name and the date. Note that you typed into placeholders rather than inserting text boxes.",
        },
        {
          step: "Add a section and content slides",
          detail:
            "New Slide → Title and Content, five times. Type one heading and no more than five bullet fragments on each. Read them aloud to show they are prompts, not sentences.",
        },
        {
          step: "Demonstrate the too-much-text mistake",
          detail:
            "Deliberately paste a full paragraph onto one slide at 14pt, then walk to the back of the room and try to read it. Delete it and replace with three fragments. This is the lesson the class will remember.",
        },
        {
          step: "Insert and crop an image",
          detail:
            "Insert → Pictures. Crop to the relevant portion. Resize by dragging a corner handle, never an edge. Use Picture Format → Align → Align Right to position precisely.",
        },
        {
          step: "Add icons and a simple diagram",
          detail:
            "Insert → Icons, choose three related icons, recolor them to the theme accent, and arrange them in a row. Select all three, Shape Format → Align → Distribute Horizontally.",
        },
        {
          step: "Edit the slide master",
          detail:
            "View → Slide Master. Add a small footer with the date and a slide-number placeholder. Close Master View and show that every slide now has it.",
        },
        {
          step: "Apply one transition to all",
          detail:
            "Transitions → Fade → Apply To All. Set duration to 0.5 seconds. Show how the Bounce and Origami options look and explain why they are not used.",
        },
        {
          step: "Animate bullets on one slide",
          detail:
            "Select the bullet placeholder, Animations → Fade, Effect Options → By Paragraph, Start → On Click. Advance through them in Slide Show to demonstrate the pacing control.",
        },
        {
          step: "Write speaker notes and present",
          detail:
            "Open the Notes pane and write three keyword prompts per slide. Press F5, present the deck using Presenter View, use B to black the screen once, then Esc. Discuss what felt different about presenting from notes.",
        },
      ],
    },
    practice: {
      title: "Final project: a 5–7 slide presentation, delivered",
      brief:
        "Build a 5–7 slide presentation on a topic you know well — your course, your trade, your business, your community — and deliver it to the class in five minutes, using speaker notes rather than reading the slides.",
      steps: [
        "Choose a topic you can speak about without research.",
        "Write your message as one sentence before opening PowerPoint.",
        "Choose a theme and build a title slide from the Title Slide layout.",
        "Build 4–6 content slides, one idea each, maximum five bullet fragments per slide.",
        "Add at least one image, one icon set or one simple shape diagram.",
        "Add a closing slide with a clear call to action or summary.",
        "Apply one transition to all slides and animate bullets on at most one slide.",
        "Write keyword speaker notes for every slide.",
        "Rehearse aloud twice, timing yourself to five minutes.",
        "Deliver to the class, then accept one round of feedback.",
      ],
      standard:
        "Every slide is readable from the back of the room, no slide is a paragraph, the presenter speaks rather than reads, timing lands within five minutes, and the file opens correctly on a different machine as both .pptx and PDF.",
    },
    pitfalls: [
      {
        problem: "Your slides are full paragraphs",
        fix: "Cut to fragments. Move the sentences into speaker notes where they belong. If a slide needs a paragraph, it is a handout, not a slide.",
      },
      {
        problem: "Fonts change or the layout breaks on another computer",
        fix: "File → Options → Save → tick 'Embed fonts in the file', and always carry a PDF export as backup. The PDF will never break, and you can present from it in a pinch.",
      },
      {
        problem: "Images make the file huge and slow",
        fix: "Picture Format → Compress Pictures, choose 150ppi or 220ppi, and untick 'Apply only to this picture'. Also delete cropped areas, which otherwise stay in the file.",
      },
      {
        problem: "You stretched an image and it looks distorted",
        fix: "Always resize from a corner handle, which preserves aspect ratio. Dragging an edge handle stretches one axis only. If it is already distorted, use Picture Format → Reset Picture and start again.",
      },
      {
        problem: "Animations distract and slow the presentation",
        fix: "Remove all but the bullet reveal. Animations → Animation Pane makes it easy to see and delete everything you added. One subtle effect, applied consistently, is the ceiling.",
      },
      {
        problem: "You read the slides aloud",
        fix: "That means the slides hold too much text or your notes hold too little. Put fragments on the slide, keywords in the notes, and the detail in your head. Rehearse aloud — you cannot discover this problem silently.",
      },
    ],
    expertNotes: [
      "Write the presentation on paper first. One sentence for the overall message, then one line per slide. Only then open PowerPoint. Building slides before you know your argument is why most presentations wander, and no amount of design fixes a structure problem.",
      "Use the 10/20/30 discipline as a sanity check, adapted: no more than about ten slides, no more than twenty minutes, no font smaller than thirty points for a projected talk in a bright room. Nigerian halls and projectors are unforgiving — test your smallest text from the back.",
      "Design for the worst room you will present in. Low contrast dies under fluorescent light, thin fonts vanish on a cheap projector, and dark backgrounds with light text often reverse badly when printed as handouts. High contrast, heavy weights, and a light background are the safe defaults.",
      "Always carry three copies: the .pptx on a USB drive, the .pptx emailed to yourself, and a PDF export. Presenters who present reliably are not lucky — they are simply the ones with backups.",
    ],
    vocabulary: [
      {
        term: "Layout",
        meaning:
          "A pre-built slide arrangement with positioned placeholders. Choosing a layout beats dragging text boxes.",
      },
      {
        term: "Theme",
        meaning:
          "The presentation-wide set of colours, fonts and background. Set it before building content.",
      },
      {
        term: "Slide Master",
        meaning:
          "The underlying template controlling every slide. Edit here to apply a change everywhere at once.",
      },
      {
        term: "Placeholder",
        meaning:
          "A pre-formatted box on a layout that holds a title, body text, image or other content.",
      },
      { term: "Transition", meaning: "The effect used when moving from one slide to the next." },
      {
        term: "Animation",
        meaning:
          "The effect controlling how an element within a slide appears, emphasises or exits.",
      },
      {
        term: "Speaker notes",
        meaning:
          "The private notes pane holding your prompts, visible only to you in Presenter View.",
      },
      {
        term: "Presenter View",
        meaning:
          "A dual-screen mode showing you the current slide, next slide, notes and timer while the audience sees only the slide.",
      },
    ],
    homework: [
      {
        task: "Rewrite an existing presentation",
        detail:
          "Find any text-heavy presentation you own or have received, and rebuild it to the standard taught in class. Count how many words you removed. That number is the lesson.",
      },
      {
        task: "Practise delivery twice, timed",
        detail:
          "Deliver your presentation aloud twice with a timer. Record yourself on your phone the second time and watch it. Note where you looked at the screen instead of the room.",
      },
      {
        task: "Build a reusable master",
        detail:
          "Edit a Slide Master with your name or organisation in the footer and save the file as a .potx template for future presentations.",
      },
      {
        task: "Assemble your course portfolio",
        detail:
          "Collect your Word document, your Excel report and this presentation into one portfolio folder with a PDF of each. This is the deliverable for the Microsoft Office course and the evidence you attach to applications.",
      },
    ],
    rubric: [
      {
        criterion: "Slide design",
        passing: "Slides use layouts, are readable and hold no more than six short lines.",
        excellent:
          "One idea per slide, strong visual hierarchy, purposeful imagery, and a theme applied consistently through the Slide Master.",
      },
      {
        criterion: "Visual elements",
        passing: "At least one image, icon set or diagram used correctly.",
        excellent:
          "Visuals are aligned, proportionally resized, compressed and recoloured to the theme.",
      },
      {
        criterion: "Motion",
        passing: "One transition applied to all slides.",
        excellent:
          "Motion used only to control attention, with bullet reveals paced by the speaker.",
      },
      {
        criterion: "Delivery",
        passing: "Presents the full deck within the time limit.",
        excellent:
          "Speaks from notes rather than reading, manages the room, handles the technology confidently and accepts feedback professionally.",
      },
      {
        criterion: "Course deliverable",
        passing: "All three artefacts submitted — document, spreadsheet, presentation.",
        excellent:
          "All three are professional quality, exported to PDF, organised in a portfolio folder and presentable to an employer.",
      },
    ],
    faqs: [
      {
        q: "How many words should be on a slide?",
        a: "As few as will carry the idea — commonly under twenty, and often just a heading. The test is whether someone at the back can read it in three seconds while still listening to you. If they must choose between reading and listening, the slide has failed.",
      },
      {
        q: "Should I use a template from the internet?",
        a: "Use one to start if it saves time, but strip it back. Most free templates are over-designed, use fonts your machine may not have, and put decoration where your content should be. A plain theme with disciplined typography looks more professional than a busy template.",
      },
      {
        q: "PowerPoint, Google Slides or Canva?",
        a: "PowerPoint for anything presented through a projector in a Nigerian office or hall, because .pptx is the format every machine has. Google Slides when a team edits together. Canva when the output is a visual document rather than a spoken presentation. The design principles in this session apply to all three.",
      },
      {
        q: "I am terrified of presenting. Does this course help?",
        a: "Yes, and deliberately so. The final project is delivered to a small supportive class, which is the safest place to discover what you need to work on. Preparation is most of the answer: knowing your material, having keyword notes, and having rehearsed aloud twice removes most of the fear, because most presentation anxiety is really unpreparedness.",
      },
      {
        q: "What do I get at the end of the Microsoft Office course?",
        a: "Three artefacts and a certificate. A formatted document (letter or CV) as a PDF, a working spreadsheet with formulas and charts, and a presentation you delivered — organised in a portfolio folder. That portfolio is what you attach to job applications, and it is far more convincing than a certificate on its own.",
      },
    ],
  },
};
