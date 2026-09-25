import type { SessionLecture } from "../types";

/**
 * Data Entry — ₦10,000 · 2 weeks · 4 sessions.
 * Sessions 3 and 4. (Sessions 1 and 2 live in data-entry.ts.)
 */
export const dataEntryLessonsB: Record<string, SessionLecture> = {
  "transcription-and-validation": {
    summary:
      "Transcription is reading a source and reproducing it exactly; validation is proving that what you reproduced is right. This session covers the workflow of transcription, then the checks that catch errors before a client does — verification passes, cross-checks, totals reconciliation and data validation rules built into the sheet.",
    objectives: [
      "Set up a transcription workflow that minimises the chance of error",
      "Transcribe accurately from paper, images and handwriting",
      "Apply a verification pass that is genuinely independent of the entry pass",
      "Use totals reconciliation to prove a dataset matches its source",
      "Build data validation rules into a sheet so errors cannot be entered",
      "Flag ambiguity and missing data professionally instead of guessing",
    ],
    blocks: [
      {
        heading: "Transcription as a disciplined workflow",
        body: [
          "Transcription is the reproduction of information from a source into a structured destination with no change of meaning. The failure mode is not speed — it is drift. When you type the same kind of record five hundred times, your attention narrows, you begin predicting what the next record contains, and you enter what you expected rather than what is written. Every experienced data-entry worker knows this feeling, and the professional response is a workflow that resists it rather than a promise to concentrate harder.",
          "The workflow has four parts. **Position the source and the destination side by side** so your eyes travel the minimum distance — a second monitor, a split screen, or the source taped directly beside the screen. **Work in batches of twenty or fifty records** rather than continuously, because verification is only reliable while the source is still fresh in your mind. **Verify each batch immediately**, not at the end of the day. And **track your position** explicitly, with a ruler or a blank sheet sliding down a paper source, so you can never lose your place or double-enter a line.",
        ],
      },
      {
        heading: "Transcribing the difficult sources",
        body: [
          "Handwriting is the hard case, and the rule is that **you never guess**. An unclear character becomes a flagged cell with a query note, not a plausible letter. Guessing is worse than leaving a gap because a confident-looking wrong value gets accepted and propagates into every downstream calculation, whereas a flagged gap is obviously a gap and gets answered. Build a queries column or a separate queries sheet, mark the record, and deliver the dataset with the queries listed — clients respect this far more than a complete sheet they cannot trust.",
          "Images and scans have their own problems: skew that makes a column of figures misalign, low contrast that turns a 5 into a 6 or a 0 into an O, and compression that blurs digits. Zoom to 150% or more on any ambiguous digit rather than squinting at full size. When a document is a photograph of a table, check whether the row you are reading is actually the row you think it is — misreading across a skewed line is one of the most common and least detectable transcription errors, because every field looks plausible on its own.",
          "Audio transcription — survey responses, interviews, meeting notes — is a related skill where you additionally decide what to record verbatim and what to summarise, and you must decide it once and apply it consistently. Inconsistent transcription conventions make a dataset unusable even when every word is accurate, because the same answer is sometimes captured in full and sometimes paraphrased.",
        ],
      },
      {
        heading: "The independent verification pass",
        body: [
          "Verification only works if it is **independent** of entry. Reading your own work back the way you entered it reproduces the same expectations and finds almost nothing — you will read the value you meant to type, not the value that is there. Three techniques break that. First, **verify in a different direction**: you entered left to right across fields, so verify top to bottom down each column. Second, **verify a different attribute**: instead of re-reading every character, check the shape of the data — does every phone number have eleven digits, does every date fall in a plausible range, does every amount have the right number of decimal places. Third, and best, **have someone else verify a sample**; a second pair of eyes catches in ten minutes what the original entry person misses in an hour.",
          "The attribute check is the one to automate. A helper column with LEN() on a phone field shows instantly which rows are not eleven characters. ISNUMBER() on an amount column shows which rows are text. A conditional format highlighting values outside the expected range shows the outliers without you looking for them. These checks take minutes to build and they scan every row at once, which is something human reading cannot do reliably at scale.",
        ],
      },
      {
        heading: "Totals reconciliation: the proof that nothing is missing",
        body: [
          "Reconciliation is the check that catches errors no reading will find — a record you skipped entirely, an amount entered as 4,500 instead of 45,000. The method is simple: the source document usually states a total somewhere, or you can compute one from it. Enter your data, sum the same field, and compare. If they match, you have strong evidence that nothing was missed and no large error was made. If they differ, at least one entry is wrong, and the size of the difference tells you a great deal.",
          "Learn to read the difference. A difference that is a multiple of 9 is the classic signature of a **transposition** — 4,500 entered as 5,400, or 1,234 as 1,243 — because swapping two adjacent digits always changes the value by a multiple of nine. A difference equal to one plausible record suggests a skipped or duplicated row. A difference that is exactly ten or one hundred times a value suggests a decimal-point error. These patterns let you find the specific error in minutes rather than re-reading the entire dataset, and knowing them is one of the clearest markers of an experienced hand.",
          "Also reconcile **counts**, not just totals. If the source has 480 records and your sheet has 479, one is missing regardless of whether the amount totals match. A count check is one formula and it catches the most dangerous error type, because a missing record is invisible in every other check you can perform.",
        ],
      },
      {
        heading: "Data validation: preventing errors at the point of entry",
        body: [
          "Verification finds errors after they happen. Validation prevents them. Excel and Sheets both offer Data Validation, which restricts what can be entered in a column and rejects anything else with a message you write. Set it up once at the start of a job and you remove entire categories of error for the whole duration.",
          "The rules worth building on any data job: **list validation** for any field with a fixed set of values — city names, product codes, yes/no, payment method — so a typo becomes impossible; **whole-number or decimal validation** with a sensible min and max for amounts and quantities, so an extra zero is rejected at the point of entry; **date validation** restricting to a plausible range, so a 1900 or 2099 date cannot be entered; and **text-length validation** on phone numbers and ID numbers, so an incomplete entry is caught immediately. Add a helpful input message that tells the typist the expected format before they type, and a clear error message that says what went wrong. On a shared sheet that others will enter data into, this is the single highest-value thing you can build.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor transcribes twenty handwritten records live, then runs the full verification sequence on the result — showing what each check catches and what it cannot — and builds validation rules that make the next batch error-proof.",
      steps: [
        {
          step: "Set up the workspace",
          detail:
            "Place the handwritten source beside the screen and set a blank sheet over the rows already done, so the current line is the only one visible. Explain that this one habit prevents skipped and double-entered lines.",
        },
        {
          step: "Build the sheet structure with a queries column",
          detail:
            "Create headers plus a final Query column. Explain that a flagged gap is professional and a confident guess is not.",
        },
        {
          step: "Transcribe ten records",
          detail:
            "Work slowly and deliberately. On one illegible character, stop and flag it in the Query column rather than guessing. Narrate the decision out loud.",
        },
        {
          step: "Verify in a different direction",
          detail:
            "Now read down each column rather than across each row. Show that the vertical pass surfaces an inconsistency the horizontal pass did not.",
        },
        {
          step: "Run the attribute checks",
          detail:
            "Add helper columns with LEN() on Phone and ISNUMBER() on Amount. Filter the helpers to show the rows that fail, and fix them.",
        },
        {
          step: "Reconcile the count",
          detail:
            "Count your rows against the source's stated record count. Show that the check is one formula and that it catches a missing record nothing else would find.",
        },
        {
          step: "Reconcile the total and read the difference",
          detail:
            "Sum the Amount column against the source total. Introduce a deliberate transposition error and show that the resulting difference is a multiple of nine, identifying the error type.",
        },
        {
          step: "Find the transposed entry",
          detail:
            "Use the size of the difference to narrow the search, locate the swapped digits, and correct them. Confirm the total now matches exactly.",
        },
        {
          step: "Build list validation",
          detail:
            "Apply Data Validation with a list of allowed cities. Try to enter a city not on the list and show the rejection message.",
        },
        {
          step: "Build range and length validation",
          detail:
            "Add a whole-number rule with a plausible max to the Amount column and a text-length rule of 11 to the Phone column. Demonstrate both rejections with the custom error messages.",
        },
        {
          step: "Transcribe the next ten records with validation live",
          detail:
            "Show that the same batch is entered with visibly fewer opportunities for error, and compare the time taken — prevention is faster than correction.",
        },
      ],
    },
    practice: {
      title: "Transcribe, verify, reconcile, prove",
      brief:
        "You transcribe forty records from a handwritten source containing one illegible character, one ambiguous amount and a stated record count and total. You then run every verification and reconciliation check and deliver the dataset with a short verification note.",
      steps: [
        "Set up the sheet structure with a Query column and a frozen header row.",
        "Position the source and cover completed rows so only the current line is visible.",
        "Transcribe all forty records, flagging anything unclear rather than guessing.",
        "Build list validation on City, a range rule on Amount, and a length rule on Phone.",
        "Run the vertical verification pass down each column.",
        "Add LEN() and ISNUMBER() helper columns and filter to the failures.",
        "Count your rows and compare with the source's stated record count.",
        "Sum the Amount column and compare with the source total.",
        "If the totals differ, use the size of the difference to identify the error type before searching.",
        "Correct every error found and re-run the checks until all pass.",
        "Write a verification note: what you checked, what you found, what is still flagged for the client.",
        "Deliver the sheet plus the note, with any queries listed clearly.",
      ],
      standard:
        "All forty records transcribed with correct data types, every verification and reconciliation check run and passing, the illegible character and ambiguous amount flagged rather than guessed, and a verification note that states what was checked and what remains open.",
    },
    pitfalls: [
      {
        problem: "You verify by re-reading your work the same way you entered it",
        fix: "That pass reproduces the same expectations and finds almost nothing. Verify in a different direction, check attributes rather than characters, or have someone else sample your work.",
      },
      {
        problem: "You guessed at an illegible character",
        fix: "Flag it instead. A confidently wrong value propagates into every downstream calculation and destroys trust in the whole sheet, while a flagged gap is obviously a gap and gets answered.",
      },
      {
        problem: "You skipped a record and never noticed",
        fix: "Reconcile the count, not just the totals. A missing record is invisible to every other check. Compare your row count with the source's stated record count on every job.",
      },
      {
        problem: "You read across a skewed or photographed table and misaligned a row",
        fix: "Zoom to 150% or more, and confirm the row by checking a second field on the same line. Every field looks plausible on its own, which is why this error survives reading.",
      },
      {
        problem: "You searched the whole dataset for a total mismatch",
        fix: "Read the difference first. A multiple of nine means transposed digits; a value equal to one plausible record means a skipped or duplicated row; a factor of ten means a decimal error. Diagnose before you search.",
      },
      {
        problem: "You did all the verification at the end of the day",
        fix: "Verify in batches of twenty or fifty, immediately. Verification only works while the source is fresh; by the end of a long session you are comparing your work against a memory that no longer exists.",
      },
    ],
    expertNotes: [
      "Build the validation rules before you type the first record, not after the client complains. Rules cost ten minutes at the start and they eliminate entire error categories for the whole job — and on a sheet others will type into, they are the difference between a dataset that stays clean and one that decays within a week.",
      "Learn the multiple-of-nine rule cold. When a total is out by a figure divisible by nine, the error is almost certainly two digits swapped. It narrows a search across hundreds of rows to a handful of candidates in seconds, and it is the single most impressive thing you can do in front of a client.",
      "Keep a queries log as a standing habit on every job, even a tiny one. It protects you — it proves you flagged the ambiguity rather than inventing it — and it is what turns a one-off transcription into an ongoing client relationship, because the client sees a professional process rather than a finished file.",
      "Where possible, verify against a source that was produced independently. If the client has a system total, a printed summary or a second document covering the same records, reconcile against it. Agreement between two independent sources is real evidence; agreement with yourself is not.",
    ],
    vocabulary: [
      { term: "Transcription", meaning: "Reproducing information from a source into a structured destination with no change of meaning." },
      { term: "Verification pass", meaning: "An independent check of entered data, done in a different direction or on different attributes from the entry pass." },
      { term: "Attribute check", meaning: "Testing the shape of data — length, type, range — rather than reading every character." },
      { term: "Reconciliation", meaning: "Comparing your dataset's totals and counts against the source's, to prove nothing was missed or mis-entered." },
      { term: "Transposition error", meaning: "Two adjacent digits swapped. Always changes a total by a multiple of nine." },
      { term: "Data validation", meaning: "A rule that rejects invalid entries at the point of typing — lists, ranges, text length, date ranges." },
      { term: "Queries log", meaning: "A record of every unclear or missing value flagged for the client rather than guessed." },
      { term: "Helper column", meaning: "A temporary column holding a check formula such as LEN() or ISNUMBER(), used to filter to failures." },
    ],
    homework: [
      {
        task: "Transcribe a genuinely handwritten source",
        detail:
          "Find a handwritten list — a register, a receipt book, a notebook — and transcribe twenty records. Flag every unclear value. Report how many queries you raised.",
      },
      {
        task: "Build a validation template",
        detail:
          "Create a reusable template sheet with list, range, length and date validation already configured, plus a queries column. You will use this on every future job, so make it good.",
      },
      {
        task: "Practise reading a difference",
        detail:
          "Take a correct total, introduce three different kinds of error, and record the resulting difference for each. Confirm that the transposition gives a multiple of nine.",
      },
      {
        task: "Have someone else verify your work",
        detail:
          "Ask a friend to check ten of your records against the source. Note what they find that you missed. This is the most valuable exercise in the session and it costs nothing.",
      },
    ],
    rubric: [
      {
        criterion: "Transcription fidelity",
        passing: "All clear records transcribed accurately.",
        excellent: "Accurate throughout, with a workflow that prevents skipped and double-entered lines, and ambiguous values flagged rather than guessed.",
      },
      {
        criterion: "Verification",
        passing: "Verifies work in at least one way.",
        excellent: "Runs a directional pass, attribute checks and an independent sample, and can say what each method catches.",
      },
      {
        criterion: "Reconciliation",
        passing: "Compares totals with the source.",
        excellent: "Reconciles both counts and totals, and diagnoses the error type from the size of the difference before searching.",
      },
      {
        criterion: "Validation",
        passing: "Applies at least one validation rule.",
        excellent: "Builds list, range, length and date rules with helpful input and error messages before entry begins.",
      },
      {
        criterion: "Professional delivery",
        passing: "Delivers the completed sheet.",
        excellent: "Delivers the sheet with a verification note and a queries log, so the client can see exactly what was checked and what is open.",
      },
    ],
    faqs: [
      {
        q: "Is handwriting transcription still paid work?",
        a: "Yes — hospitals, schools, courts, churches, research projects and government archives all hold large volumes of handwritten records that must be digitised. Handwriting recognition software is improving but still needs a human to resolve ambiguity, and the work that remains is precisely the careful, flagged-doubt work this session teaches.",
      },
      {
        q: "What do I do when the source contradicts itself?",
        a: "Flag both values and ask. Never silently choose one — the client needs to know the source disagrees, because that is a problem with their records, not with your typing, and finding it is genuinely valuable to them. Deliver the query rather than the guess.",
      },
      {
        q: "How do I verify 10,000 records? I cannot read them all back.",
        a: "You cannot, and nobody expects you to. You verify structurally: attribute checks on every row, reconciliation of counts and totals, a sampled read of a percentage, and validation rules preventing errors in the first place. Full re-reading of large datasets is what a second person sampling does, not what one person does line by line.",
      },
      {
        q: "Should I use OCR to speed this up?",
        a: "For clean printed documents, yes — it is faster and the client would expect it. But OCR output is not finished data; it needs verification, and its error pattern is character confusion (0/O, 1/l, 5/S). Use OCR for the first pass and human verification for the second, and tell the client which you did.",
      },
      {
        q: "How do I prove my accuracy to a client?",
        a: "Deliver with the checks attached: row count reconciled against source, total reconciled, attribute checks passing, and the queries log. Session four gives you a timed, scored practical that produces an accuracy figure you can quote. A number backed by a repeatable method is what wins the contract.",
      },
    ],
  },

  "accuracy-and-speed-practical": {
    summary:
      "The final Data Entry session is a timed, scored, real-world simulation: enter a complete dataset from mixed sources under time pressure, then verify and deliver it to a professional standard. It ends with the accuracy figure you can quote to clients, the portfolio artefact you will show them, and a clear picture of where the paid work actually is.",
    objectives: [
      "Complete a timed, scored data-entry practical to professional standard",
      "Produce and defend a personal accuracy figure you can quote to clients",
      "Deliver a finished dataset with checks, queries and a professional file name",
      "Identify the realistic paid roles this skill opens and what each pays",
      "Build a portfolio artefact that demonstrates your competence without explanation",
      "Plan the next step — Data Analytics, virtual assistance, or a specialist niche",
    ],
    blocks: [
      {
        heading: "The practical, and what it is measuring",
        body: [
          "The practical is ninety minutes of real work: enter a 150-record dataset drawn from three mixed sources — a printed table, a set of receipts and a handwritten page — into a structured sheet, then run every check from session three and deliver it. It is scored on field accuracy, not just completion, and the accuracy is computed by a script that compares your output cell by cell against the answer key. That matters because it produces a number you did not choose and cannot inflate.",
          "The time pressure is deliberate. Accuracy under no time pressure tells a client almost nothing, because nobody pays for unhurried work; accuracy under pressure is the actual job. Most people discover that their accuracy falls between 1 and 4 percentage points when a clock is running, and knowing your real figure — rather than your comfortable figure — is what allows you to quote a turnaround you can actually meet. Quoting fast and delivering wrong loses a client permanently; quoting realistically and beating it builds one.",
        ],
      },
      {
        heading: "Working accurately at speed",
        body: [
          "Speed in data entry comes from three sources, and only one of them is typing. The first is **touch typing**, which removes the visual cost of finding keys and typically halves entry time. The second is **navigation** — Ctrl+Down, Ctrl+Enter to move down after typing, Tab to move across, Ctrl+arrow to jump — because in structured entry you spend a surprising fraction of your time moving rather than typing. The third, and largest, is **not having to redo anything**: an error caught by validation at the point of entry costs a second, an error caught in verification costs ten seconds, and an error found by the client costs the relationship.",
          "The practical drill that builds this is the same one used in Typing & Computer Basics: work in short bursts against a clock, record the result, rest, repeat. But here you measure **records per hour at a stated accuracy**, not words per minute, because that is what the work actually is. Track both numbers together for two weeks and you will see the accuracy line stay flat while the speed line rises — which is the correct pattern. If accuracy falls as speed rises, you are typing faster than you are reading, and the fix is to slow your eyes rather than your hands.",
        ],
      },
      {
        heading: "What the paid work actually looks like",
        body: [
          "In Nigeria, data entry work appears in several shapes. **Institutional digitisation** — hospitals, schools, courts, churches, government archives converting paper records — is project-based, often large, and usually paid per record or per project. **SME bookkeeping support** — capturing invoices, sales and stock for small businesses that cannot afford an accountant — is ongoing, monthly, and builds the most stable income because it recurs. **E-commerce product loading** — entering product titles, descriptions, prices, images and variants for online sellers — is fast-growing, especially around Jumia, Konga and Shopify stores, and pays per product batch.",
          "**Remote virtual assistance** is where the best rates are: foreign clients pay in dollars for the same skill, and roles advertised as data entry, CRM management, order processing or back-office support commonly run from a few hundred to well over a thousand dollars a month depending on hours and reliability. **Research and survey data capture** pays well and values accuracy above everything, because an unusable dataset costs a research project far more than the entry fee. In every one of these, the thing that wins the work is a demonstrated accuracy figure and a sample of clean deliverables — which is exactly what today produces.",
        ],
      },
      {
        heading: "Building the portfolio artefact",
        body: [
          "Nobody hiring a data-entry person reads a CV claim of 'detail-oriented'. They look at a sample. So the artefact you build today is designed to be shown: a before-and-after package containing the messy source, your cleaned and structured deliverable, the verification checks you ran, and a one-page note stating the record count, the accuracy achieved, the checks performed and the queries raised. That package proves the claim without asking anyone to trust you.",
          "Make it look professional, because presentation is judged. A frozen header row, banded rows from a real Table, consistent number formats, a sensible sheet name, and a file named `2026-09-27_ClientName_CustomerRegister_v1.xlsx`. Add a second sheet called Checks holding your reconciliation figures and validation rules, and a third called Queries holding anything you flagged. A client who opens that file understands immediately that you run a process, and that understanding is the entire difference between a ₦2,000-per-job typist and someone a business retains monthly.",
        ],
      },
      {
        heading: "Where to go next",
        body: [
          "Data entry is a genuine entry point, and the honest thing to say about it is that the pure-typing end of it is being compressed by automation. The durable path is to move up the value chain into the work that surrounds it. **Data Analytics** is the natural next course here — it takes the same cleaning and structure discipline and adds summarisation, visualisation and the ability to answer a business question, which is where the higher fees are. **Virtual assistance** extends the same skills into scheduling, email and CRM management for a single ongoing client, which is the most stable income shape of all.",
          "The specialist niches are also real and better paid than general entry: **medical transcription and records**, which requires terminology but pays accordingly; **legal document processing**; **accounting data capture**, where understanding what an invoice means is worth more than typing it fast; and **e-commerce catalogue management**, where knowing how product data affects search and conversion makes you valuable beyond the keystrokes. Pick one, build a sample in it, and you are no longer competing on price with everyone who can type.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor runs a compressed version of the practical live — fifteen records in ten minutes — scoring accuracy as they go, then shows the complete deliverable package and how to present it to a client.",
      steps: [
        {
          step: "Set the clock and state the target",
          detail:
            "Ten minutes for fifteen records across three sources. State the accuracy target out loud — 98% minimum — so the class sees that both numbers are being measured.",
        },
        {
          step: "Set up the deliverable structure first",
          detail:
            "Create the sheet, headers, validation rules and queries column before typing anything. Emphasise that this two-minute investment is what makes the next eight minutes fast.",
        },
        {
          step: "Enter from the printed table",
          detail:
            "Work in batches with the source positioned beside the screen. Use Tab and Ctrl+Enter to navigate without touching the mouse.",
        },
        {
          step: "Enter from the receipts",
          detail:
            "Handle the amount and date fields carefully, showing the format checks as they go. Flag one unclear figure in the queries column rather than guessing.",
        },
        {
          step: "Enter from the handwritten page",
          detail:
            "Zoom in on ambiguous characters, flag rather than guess, and note that handwriting is where accuracy is actually won or lost.",
        },
        {
          step: "Run the verification sequence",
          detail:
            "Attribute checks, column scan, count reconciliation, total reconciliation — the full session-three sequence, narrated so the class can see it is a routine rather than an improvisation.",
        },
        {
          step: "Score the accuracy",
          detail:
            "Compare against the answer key cell by cell and compute the percentage. Show the arithmetic so the class understands how the figure is derived.",
        },
        {
          step: "Build the Checks sheet",
          detail:
            "Add a second sheet holding the record count, the reconciled total, the validation rules applied and the accuracy achieved. Explain that this is what a client inspects first.",
        },
        {
          step: "Build the Queries sheet",
          detail:
            "List every flagged value with the record reference and what is unclear. Show that a short honest list is far more impressive than a silently guessed value.",
        },
        {
          step: "Finish the file professionally",
          detail:
            "Freeze the header, apply Table formatting, name the sheets, rename the file with the date-client-subject-version pattern. Point out that presentation is part of the deliverable.",
        },
        {
          step: "Present the package",
          detail:
            "Show the one-page note that accompanies the file: what was delivered, what was checked, what accuracy was achieved, what is open. Explain that this is the artefact that wins the next job.",
        },
        {
          step: "Show the market",
          detail:
            "Walk through live examples of the role types described in this session — institutional, SME, e-commerce, remote VA — and what each typically pays and requires.",
        },
      ],
    },
    practice: {
      title: "The timed, scored data-entry practical",
      brief:
        "Ninety minutes. Enter a 150-record dataset from three mixed sources into a structured sheet, run every verification and reconciliation check, and deliver a professional package. Your field accuracy is computed against an answer key and becomes the figure you quote to clients.",
      steps: [
        "Set up the deliverable structure with validation rules and a queries column before typing anything.",
        "Enter all records from the printed table source in verified batches.",
        "Enter all records from the receipt source, checking amounts and dates as you go.",
        "Enter all records from the handwritten source, flagging anything unclear.",
        "Run the attribute checks with LEN() and ISNUMBER() helper columns.",
        "Perform the vertical column scan for inconsistencies.",
        "Reconcile your row count against the source's stated record count.",
        "Reconcile your amount total against the source total, and diagnose any difference before searching.",
        "Correct every error found and re-run the checks until all pass.",
        "Build the Checks sheet with your reconciliation figures and the validation rules applied.",
        "Build the Queries sheet listing every flagged value with its record reference.",
        "Finish the file professionally and name it with the date-client-subject-version pattern.",
        "Write the one-page delivery note: what was delivered, what was checked, accuracy achieved, what is open.",
      ],
      standard:
        "At least 98% field accuracy on general fields and 100% on financial fields, with every check run and passing, all queries flagged rather than guessed, a complete three-sheet deliverable, and a written note stating the accuracy figure and the checks performed.",
    },
    pitfalls: [
      {
        problem: "You chased speed and your accuracy fell below 98%",
        fix: "Accuracy is the product; speed is a bonus. Slow your reading rather than your hands, verify in smaller batches, and rebuild speed over weeks rather than minutes. A client keeps the accurate worker every time.",
      },
      {
        problem: "You set up the structure after you started typing",
        fix: "You then spent the last twenty minutes reformatting and re-splitting fields. Always invest the first five minutes in structure and validation — it is the single largest time saving available in this work.",
      },
      {
        problem: "You guessed on unclear values to finish on time",
        fix: "A guess that is wrong invalidates trust in every other field. Flag it in the queries column — a delivered dataset with three honest queries is professional; one with three silent guesses is a liability.",
      },
      {
        problem: "You delivered the file without the checks attached",
        fix: "The client cannot see your process, so they cannot tell you apart from anyone else. Attach the Checks and Queries sheets and the one-page note. That package is the artefact that wins the next job.",
      },
      {
        problem: "You quoted a turnaround you could not meet",
        fix: "Quote from your measured records-per-hour at your real accuracy, then add a safety margin. Missing a deadline once is worse than quoting a day longer, and beating a realistic deadline is what builds a reputation.",
      },
      {
        problem: "You plan to stay in general data entry",
        fix: "That end of the market is being compressed by automation. Use this as the entry point, then move into analytics, virtual assistance or a specialist niche where understanding the data is worth more than typing it.",
      },
    ],
    expertNotes: [
      "Keep a personal accuracy log from today onward — date, records entered, accuracy, records per hour. It is your strongest sales document, it shows improvement over time, and it lets you quote honestly. Clients hire people who can state a number and explain how it is measured.",
      "Build one reusable template and never start from blank again. Headers, column formats, validation rules, the Checks and Queries sheets, and the file-naming pattern all pre-configured. Every job then starts two minutes in rather than twenty, and consistency across deliverables is itself a professional signal.",
      "Learn the domain of whichever niche you pick. Knowing what an invoice line means, what a medical record field is for, or how product data affects an online store's search makes you worth several times a general typist — and none of that knowledge is about typing.",
      "Deliver early with a note, not late with an apology. A finished file sent a day before the deadline with the checks attached is worth more to a client than a perfect file sent a day late, and the habit compounds into referrals.",
    ],
    vocabulary: [
      { term: "Field accuracy", meaning: "The proportion of individual fields entered correctly, computed against an answer key. The figure you quote to clients." },
      { term: "Records per hour", meaning: "Throughput for structured entry, always quoted alongside an accuracy figure rather than alone." },
      { term: "Answer key", meaning: "The verified correct dataset used to score accuracy objectively." },
      { term: "Deliverable package", meaning: "The finished sheet plus Checks and Queries sheets plus a one-page delivery note." },
      { term: "Queries sheet", meaning: "A list of every value flagged as unclear, with record references, delivered rather than guessed." },
      { term: "Turnaround time", meaning: "How long a job takes from receipt to delivery. Quote from measured throughput plus a safety margin." },
      { term: "Virtual assistance", meaning: "Remote back-office support — data, email, scheduling, CRM — for an ongoing client, usually paid monthly." },
      { term: "Niche specialisation", meaning: "Concentrating on one domain such as medical, legal, accounting or e-commerce data, where domain knowledge raises your value." },
    ],
    homework: [
      {
        task: "Repeat the practical and beat your accuracy",
        detail:
          "Run the ninety-minute practical again on a different dataset within a week. Your target is a higher accuracy at the same or better speed. Log both figures.",
      },
      {
        task: "Build your reusable template",
        detail:
          "Create the master file with headers, formats, validation rules, Checks and Queries sheets, and the naming pattern. Use it on your next real job and note the time saved.",
      },
      {
        task: "Find five real job postings",
        detail:
          "Search Nigerian and remote boards for data entry, back-office and virtual-assistant roles. For each, note the pay, the requirements and whether you could currently meet them.",
      },
      {
        task: "Prepare your portfolio package",
        detail:
          "Assemble your best deliverable into the before-and-after package with the one-page note. This is the file you attach to every application and pitch.",
      },
    ],
    rubric: [
      {
        criterion: "Accuracy",
        passing: "At least 98% on general fields and 100% on financial fields.",
        excellent: "At least 99.5% overall, verified against the answer key, with the figure reproducible.",
      },
      {
        criterion: "Completeness",
        passing: "All records entered with correct data types.",
        excellent: "All records entered, counts and totals reconciled against source, no skipped or duplicated rows.",
      },
      {
        criterion: "Verification",
        passing: "Ran at least the attribute checks and a total reconciliation.",
        excellent: "Ran the full sequence — attribute checks, column scan, count reconciliation, total reconciliation — and can explain what each catches.",
      },
      {
        criterion: "Professional delivery",
        passing: "Delivers a clean, correctly named file.",
        excellent: "Delivers the three-sheet package with Checks, Queries and a one-page note stating accuracy and checks performed.",
      },
      {
        criterion: "Judgement",
        passing: "Flags some unclear values.",
        excellent: "Flags every ambiguity with a record reference, guesses nothing, and can explain why a flagged gap beats a plausible guess.",
      },
    ],
    faqs: [
      {
        q: "What accuracy figure should I quote to clients?",
        a: "Quote your measured figure from today's practical, not your best-ever figure, and quote it alongside your verification method. Saying '99.2% field accuracy, verified by batch checks and full count and total reconciliation' is far more credible than 'very accurate' — and it is the sentence that wins the contract.",
      },
      {
        q: "How much can I realistically earn in Nigeria?",
        a: "It varies widely. Part-time local work often starts around ₦2,000 to ₦5,000 per job or a modest monthly retainer for an SME, while remote roles paying in dollars can reach several hundred dollars a month for consistent part-time work. The determining factors are accuracy, reliability, English communication and whether you specialise — not typing speed.",
      },
      {
        q: "How do I get my first client with no experience?",
        a: "Use today's deliverable package. Offer to clean one real dataset free or at a nominal rate for a church, a school or a small business you already know, in exchange for permission to show the before-and-after. One real example plus a stated accuracy figure beats any CV claim, and referrals from that first client are how the work grows.",
      },
      {
        q: "Will AI take this work?",
        a: "The clean-retyping end, yes, increasingly. What remains and grows is the judgement work: reconciling systems that disagree, resolving ambiguity, verifying against sources, and owning a register a business depends on. That is the half this course taught you, and it is why the verification discipline matters more than the typing.",
      },
      {
        q: "Which course should I take next?",
        a: "Data Analytics if you want to move up the value chain into summarising and answering business questions — it uses exactly the discipline you built here. Microsoft Office or Business & Freelancing if you want to run the work as a business. Digital Marketing or Content Creation if you want clients to find you rather than chasing job boards.",
      },
    ],
  },
};
