/**
 * Digital Productivity — all 4 sessions (full class lectures).
 * Merged by withCoursePrefix() in ../index.ts.
 */

import type { SessionLecture } from "@/data/academy/types";

export const digitalProductivityLessons: Record<string, SessionLecture> = {
  "workspace-essentials": {
    summary:
      "Google Docs, Sheets, Slides and Drive as one connected system — and the sharing and collaboration settings that stop your work being either stranded on one device or accidentally public.",
    objectives: [
      "Work confidently in Docs, Sheets and Slides and know which to reach for",
      "Understand Drive as the system that holds everything, not just a folder",
      "Share files with the right permission level rather than the default one",
      "Collaborate in real time without two people overwriting each other",
      "Use version history as the safety net it is, rather than saving copies manually",
    ],
    blocks: [
      {
        heading: "What you are building in this course, and why it starts here",
        body: [
          "The deliverable for this course is **a working personal system**: a cleaned inbox with working filters, a folder structure with a naming convention, your files backed up to the cloud, and a shared calendar plus a form collecting real responses. That is not a hypothetical exercise — by the end you will have a system you use every day, and the measure of success is hours saved rather than features learned.",
          "We start with Google Workspace because it solves the problem that ruins most personal systems: **files trapped on one device**. If your work lives only on your laptop, then a dead laptop is a dead archive, and a phone is useless for reaching anything. Workspace puts your documents, spreadsheets, calendar and email in one place that any device can reach, which is the foundation everything else in this course is built on.",
          "The level is **absolute beginner**, so we assume nothing. What we will not do is treat the tools as a list of buttons to memorise. Each one is taught against a real task from your own life — a document you actually need, a schedule you actually keep, a set of files you actually struggle to find — because a productivity system you built for somebody else's example is a system you will not use.",
        ],
      },
      {
        heading: "Docs, Sheets and Slides: three tools, and knowing which one you need",
        body: [
          "The distinction is simple and worth stating plainly, because beginners often use the wrong one and fight it. **Docs** is for text — letters, proposals, reports, notes, anything that is mostly words. **Sheets** is for anything you will calculate, sort or count — budgets, lists with quantities, timetables, records. **Slides** is for presenting to people, and only for that; a document turned into slides is harder to read and harder to write.",
          "The common failure is putting list-like information in Docs. A list of twenty clients with phone numbers and amounts owed, typed as paragraphs, cannot be sorted, cannot be totalled, and cannot be filtered — so you end up scrolling and adding things up by hand. **If you will ever want to sort it, count it, or total it, it belongs in Sheets**, even if it starts as three rows.",
          "Then the habit that makes these tools worth using rather than merely available: **work in the browser version rather than saving local copies.** Every time you download a document, edit it, and re-upload it, you create two versions and eventually you will not know which is current. Workspace's whole advantage is that there is one document with one address; downloading fragments it back into the problem you were trying to solve.",
        ],
      },
      {
        heading: "Drive is not a folder — it is the system that holds everything",
        body: [
          "Drive is where your documents, spreadsheets and slides live, and understanding it as a system rather than a storage box changes how you use it. Every file has **one address**, which means it can be shared, linked, and found again from any device. It also means **there is no such thing as an emailed attachment being the real version** — the real version is the file in Drive, and the email should link to it instead.",
          "That single change is worth more than any other habit in this session. When you email an attachment, the recipient now has a copy that diverges the moment either of you edits. When you share a link, both of you are always looking at the same current document. **Attachments create versions; links do not.** This is the root of most 'which file is the latest?' confusion in small teams and families alike.",
          "Drive also gives you **search that actually works** — it searches inside documents, not just filenames, so a document you cannot remember the name of can still be found by a phrase in it. And it keeps **version history** automatically, so an overwritten or badly edited document can be restored without you having remembered to save copies. Both are free, and both are reasons to stop maintaining parallel copies 'just in case'.",
        ],
      },
      {
        heading: "Sharing and permissions: the setting people get wrong, with real consequences",
        body: [
          "When you share a file you choose a **permission level**, and the three that matter are: **viewer**, who can only read; **commenter**, who can read and suggest but not change; and **editor**, who can change anything including deleting content. The default is not always what you want, and the cost of guessing wrong runs in both directions — too restrictive and nobody can help you, too open and something gets changed or seen that should not have been.",
          "Then the setting that causes genuine embarrassment: **'anyone with the link'**. It is convenient and it is frequently the wrong choice, because it means anyone who obtains the link can access the file — and links get forwarded, screenshotted, and pasted into group chats. For a personal document that is a shrug; for a client list, a staff salary sheet, or anything with someone else's personal information, it is a data breach. **Ask yourself whether you would be comfortable if the link were forwarded to a stranger**, and if not, share with specific people instead.",
          "This is not theoretical in Nigeria. Under the **NDPA 2023**, handling other people's personal data carries real obligations, and a shared spreadsheet of customer names, phone numbers and balances is exactly that. The professional habit is **specific sharing by default**, widening only when there is a reason — and reviewing what you have shared occasionally, because permissions accumulate and are rarely revoked.",
        ],
      },
      {
        heading: "Real-time collaboration, and version history as the safety net",
        body: [
          "Multiple people can edit the same document at once, each seeing the others' cursors and changes as they happen. This is genuinely useful — a proposal written by two people in one sitting rather than exchanged over a week — and it removes the entire 'final_v2_REAL_final' problem, because there is only ever one document. It also requires one discipline: **do not both edit the same paragraph simultaneously**, not because it breaks anything, but because you will overwrite each other's thinking without noticing.",
          "The safety net underneath all of this is **version history**. Workspace records who changed what and when, and lets you restore any earlier state. This means you never need to save defensive copies again — no 'copy before editing', no dated duplicates cluttering a folder. **If something is broken, open version history and restore it**, which is faster and cleaner than any manual backup habit.",
          "Two supporting habits make collaboration reliable. **Use comments and suggestions rather than editing someone's text directly** when the document is theirs — a suggestion they can accept or reject preserves their authorship and avoids silent rewrites. And **name files for their content, not their version**, because version history has made version numbers in filenames unnecessary; 'Client Proposal — Adeyemi Interiors' is complete, and the history tells you which draft you are on.",
        ],
      },
    ],
    demonstration: {
      intro:
        "We build the foundation of your personal system: a real document, a real spreadsheet, correct sharing settings, a live collaboration, and a restoration from version history.",
      steps: [
        {
          step: "Create your workspace and confirm you are signed in",
          detail:
            "A Gmail account gives you Drive, Docs, Sheets, Slides, Calendar and Forms together. Confirm you are signed in on both your laptop and your phone, because a system that only works on one device is not the system this course is building.",
        },
        {
          step: "Create your first real document, not a practice one",
          detail:
            "Choose something you genuinely need this week — a letter, a proposal, a list. Using a real task is the difference between learning a tool and building a habit, and you will keep the result.",
        },
        {
          step: "Use headings rather than bold text for structure",
          detail:
            "Apply Heading 1 and Heading 2 styles instead of manually enlarging and bolding. This generates a navigable outline, makes the document searchable, and keeps formatting consistent if you edit later.",
        },
        {
          step: "Confirm autosave and stop saving manually",
          detail:
            "Note the 'All changes saved' indicator. There is no save button to press and no reason to download a copy — the document in Drive is the real one, and duplicating it locally recreates the problem you are solving.",
        },
        {
          step: "Build a spreadsheet for something you actually track",
          detail:
            "A budget, an expenses list, a client record. Put column headings in row one and one item per row. This shape is what makes sorting, filtering and totalling possible later, and it is the shape most people never use.",
        },
        {
          step: "Use a formula instead of a calculator",
          detail:
            "Total a column with SUM rather than adding on a phone calculator and typing the result. A formula updates when the data changes; a typed number silently becomes wrong.",
        },
        {
          step: "Sort and filter to prove the structure works",
          detail:
            "Sort by amount, then filter to one category. If both work, your sheet is properly structured. If sorting scrambles it, you have merged cells or headings in the wrong row — worth fixing now.",
        },
        {
          step: "Create a short presentation from an existing document",
          detail:
            "Take three points from your document and make three slides. Note how much text you had to remove — that is the point. Slides are for presenting, and a document pasted onto slides serves neither purpose.",
        },
        {
          step: "Organise Drive with a minimal folder structure",
          detail:
            "Three or four top-level folders only — for example Work, Personal, Finance, Documents. Deeply nested folders are rarely used because nobody can remember where things are; a shallow structure with good filenames is findable.",
        },
        {
          step: "Share a file with a specific person as a viewer",
          detail:
            "Enter their email address and choose Viewer. Note that you chose the level deliberately rather than accepting a default, and that only that person can access it.",
        },
        {
          step: "Change that person to editor and explain the difference",
          detail:
            "Now they can change and delete content. This is the distinction that matters: viewer for reading, commenter for feedback, editor for working together. Choose based on what you actually need from them.",
        },
        {
          step: "Demonstrate the 'anyone with the link' risk",
          detail:
            "Turn it on, then copy the link and open it in a private browser window where you are not signed in. Seeing that an anonymous stranger can read your file is more convincing than any warning, and it is why this should never be the default for anything personal.",
        },
        {
          step: "Turn it back off and share specifically instead",
          detail:
            "Revoke link access and add the person by email. Then note the habit: if you would not be comfortable with the link being forwarded to a stranger, do not use link sharing.",
        },
        {
          step: "Collaborate live with someone else",
          detail:
            "Open the same document simultaneously and type in different sections. Watch the cursors. Then deliberately try editing the same sentence and observe how easily thinking gets overwritten — which is why you divide sections rather than share paragraphs.",
        },
        {
          step: "Use a suggestion instead of editing directly",
          detail:
            "Switch to suggesting mode and propose a change to their text. They can accept or reject it. This preserves authorship and avoids the silent rewrite that damages trust in shared documents.",
        },
        {
          step: "Break something on purpose and restore it",
          detail:
            "Delete a paragraph, then open version history and restore the earlier version. Doing this deliberately, while calm, is what makes version history a genuine safety net later rather than a feature you have heard about.",
        },
        {
          step: "Open the same files from your phone",
          detail:
            "Install the Drive app and open the document, spreadsheet and slides. Confirm you can read and edit. A system you cannot reach from the device in your pocket will not survive contact with real life.",
        },
        {
          step: "Use search to find a file you cannot remember the name of",
          detail:
            "Search for a phrase from inside a document rather than its filename. This is the payoff for keeping everything in Drive instead of scattered across devices and email attachments.",
        },
      ],
    },
    practice: {
      title: "Build the foundation of your own system",
      brief:
        "Create the workspace, put real work into it, and set sharing and collaboration habits you will actually keep.",
      steps: [
        "Confirm you are signed in on both a computer and your phone, with Drive installed on the phone.",
        "Create one real document you need this week, using heading styles rather than manual bold and size.",
        "Confirm autosave is working and delete any local duplicate copies of that document.",
        "Build a spreadsheet for something you genuinely track, with headings in row one and one item per row.",
        "Use a formula to total a column rather than typing a calculated number.",
        "Sort and filter the sheet to confirm its structure is sound.",
        "Make a short presentation from an existing document, removing enough text that it works as slides.",
        "Create three or four shallow top-level folders in Drive rather than a deep nested tree.",
        "Share one file with a specific person as viewer, choosing the level deliberately.",
        "Change them to editor and write one line on when each level is appropriate.",
        "Test 'anyone with the link' in a private window, see the exposure, then revoke it.",
        "Collaborate live with someone, dividing sections rather than sharing paragraphs.",
        "Make a suggestion rather than editing their text directly.",
        "Delete a paragraph deliberately and restore it from version history.",
        "Open every file you created from your phone and confirm you can edit them.",
        "Find a file by searching for a phrase inside it rather than its name.",
      ],
      standard:
        "Workspace accessible from both a computer and a phone; one real document using heading styles with no local duplicate copies; a spreadsheet with headings in row one, a working formula total, and successful sort and filter; a short presentation derived from a document; a shallow folder structure of three or four top-level folders; sharing demonstrated at viewer and editor levels with the link-access exposure tested in a private window and then revoked; a live collaboration with a suggestion used rather than a direct edit; a deliberate deletion restored from version history; and a file located by searching its contents.",
    },
    pitfalls: [
      {
        problem: "Putting list data in a document because it started as a list",
        fix: "If you will ever sort, count or total it, it belongs in Sheets. A client list typed as paragraphs cannot be sorted or summed, so you end up scrolling and calculating by hand.",
      },
      {
        problem: "Downloading, editing and re-uploading documents",
        fix: "That creates two divergent versions and eventually you will not know which is current. Work in the browser version; the file in Drive is the real one.",
      },
      {
        problem: "Emailing attachments instead of sharing links",
        fix: "Attachments create copies that diverge the moment either person edits. Share a link so both of you always see the same current document.",
      },
      {
        problem: "Leaving 'anyone with the link' enabled on anything personal",
        fix: "Links get forwarded and screenshotted. Share with specific email addresses by default, and ask whether you would be comfortable if a stranger had the link.",
      },
      {
        problem: "Giving editor access when viewer is all that is needed",
        fix: "Editors can change and delete content. Choose the lowest level that lets the person do what you need — viewer to read, commenter to give feedback, editor to work.",
      },
      {
        problem: "Keeping defensive copies because of version anxiety",
        fix: "Version history records every change and restores any earlier state. 'Copy before editing' and dated duplicates are unnecessary clutter that makes files harder to find.",
      },
      {
        problem: "Two people editing the same paragraph at once",
        fix: "Nothing breaks, but you will silently overwrite each other's thinking. Divide sections between collaborators rather than sharing paragraphs.",
      },
      {
        problem: "Building a deeply nested folder structure",
        fix: "Nobody remembers where things are in six levels of folders. Use three or four shallow top-level folders and rely on good filenames and search.",
      },
    ],
    expertNotes: [
      "Share links instead of sending attachments. It is one small habit and it eliminates the most common source of version confusion in small teams and families — the document everyone has a slightly different copy of.",
      "Test 'anyone with the link' once in a private browser window. Seeing your own file open for an anonymous stranger is far more convincing than being told to be careful, and after seeing it you will not leave it enabled by accident.",
      "Use version history instead of saving copies. Once you have restored a document deliberately, in calm conditions, you stop maintaining defensive duplicates — which removes most of the clutter that makes files hard to find.",
      "Build the system with your own real work rather than example files. A productivity system assembled for somebody else's scenario is a system you abandon in a fortnight; one built around your actual documents and lists survives because you need it.",
    ],
    vocabulary: [
      {
        term: "Google Workspace",
        meaning:
          "The connected set of Google tools — Gmail, Drive, Docs, Sheets, Slides, Calendar, Forms — sharing one account and one file system.",
      },
      {
        term: "Google Drive",
        meaning:
          "The storage system holding your files. Each file has one address, which is what makes linking, sharing and finding-again possible from any device.",
      },
      {
        term: "Viewer / commenter / editor",
        meaning:
          "The three main permission levels. Viewer reads, commenter suggests without changing, editor can alter and delete content.",
      },
      {
        term: "Anyone with the link",
        meaning:
          "A sharing setting allowing anyone who obtains the URL to access a file. Convenient and often inappropriate, because links are easily forwarded.",
      },
      {
        term: "Version history",
        meaning:
          "An automatic record of who changed what and when, allowing any earlier state to be restored. It replaces the need for manual backup copies.",
      },
      {
        term: "Suggesting mode",
        meaning:
          "An editing mode where changes appear as proposals the owner can accept or reject, preserving authorship in shared documents.",
      },
      {
        term: "Heading styles",
        meaning:
          "Formatting styles such as Heading 1 and Heading 2 that create document structure, generate a navigable outline and improve searchability.",
      },
      {
        term: "NDPA 2023",
        meaning:
          "Nigeria's Data Protection Act, which imposes obligations when handling other people's personal information — relevant to any shared list of names, numbers or balances.",
      },
    ],
    homework: [
      {
        task: "Move one real area of your work into Workspace",
        detail:
          "Pick the area that currently causes you the most trouble — documents, a list, or a set of records — and move it in properly. Delete the local duplicates once you have confirmed everything is accessible.",
      },
      {
        task: "Audit what you have shared",
        detail:
          "List every file you have shared, with whom, at what permission level, and whether link access is on. Revoke anything that no longer needs to be shared, and record what you changed.",
      },
      {
        task: "Restore something from version history",
        detail:
          "Make a deliberate destructive edit to a document and restore the earlier version. Note the steps — this is the skill that will save you on the day you actually need it.",
      },
      {
        task: "Write your sharing rule in one line",
        detail:
          "A personal default, such as 'specific people by default, viewer unless editing is needed, link sharing only for files with nothing personal in them'. Written down, because defaults drift without a rule.",
      },
    ],
    rubric: [
      {
        criterion: "Tool selection",
        passing: "Can create documents, sheets and slides.",
        excellent:
          "Chooses the right tool for the task, puts list and calculable data in Sheets, and can explain why a document pasted onto slides serves neither purpose.",
      },
      {
        criterion: "Drive discipline",
        passing: "Files are stored in Drive.",
        excellent:
          "Works in the browser rather than downloading copies, shares links instead of attachments, uses a shallow folder structure, and finds files by searching their contents.",
      },
      {
        criterion: "Sharing judgement",
        passing: "Can share a file.",
        excellent:
          "Chooses permission levels deliberately, has tested link access and understands the exposure, defaults to specific sharing, and considers NDPA 2023 for other people's data.",
      },
      {
        criterion: "Collaboration",
        passing: "Worked in a shared document.",
        excellent:
          "Divides sections rather than sharing paragraphs, uses suggesting mode on others' text, and understands that there is one document rather than several versions.",
      },
      {
        criterion: "Safety habits",
        passing: "Knows version history exists.",
        excellent:
          "Has restored a document deliberately, no longer keeps defensive copies, and can name files by content rather than by version number.",
      },
    ],
    faqs: [
      {
        q: "Do I need to pay for Google Workspace?",
        a: "No. A free Gmail account includes Drive, Docs, Sheets, Slides, Calendar and Forms with generous storage, which is everything this course uses. Paid Workspace adds a custom email domain and more storage, which matters for a business rather than a personal system.",
      },
      {
        q: "What if my internet goes off — do I lose my work?",
        a: "No. Documents keep working offline in the browser and sync when you reconnect, and the phone app caches what you have opened. You will not lose work, though you should not rely on offline mode as your primary way of working.",
      },
      {
        q: "Is 'anyone with the link' ever the right choice?",
        a: "Occasionally, for something genuinely public with nothing personal in it — a flyer, a public timetable. For anything containing names, contacts, money or someone else's information, share with specific people instead.",
      },
      {
        q: "I already have files on my laptop. Do I have to move everything?",
        a: "Move the area that causes you the most trouble first, and let the rest follow as you touch it. Moving everything in one evening is a project you will abandon; moving one painful area is a habit that sticks.",
      },
      {
        q: "Someone shared a file with me and I cannot edit it. Why?",
        a: "They gave you viewer permission. Ask them to change you to editor, or make a copy you own — but do not silently work around it, because two copies is exactly the problem links are meant to prevent.",
      },
    ],
  },

  "calendar-and-forms": {
    summary:
      "A calendar that reminds you before things go wrong, and forms that collect information into a spreadsheet automatically — the two tools that remove the most repeated manual effort.",
    objectives: [
      "Use Google Calendar as a system rather than a place to occasionally write dates",
      "Set reminders and notifications that actually change your behaviour",
      "Build forms that collect clean, usable responses",
      "Understand the forms-to-sheets connection and why it matters",
      "Use both together to replace manual chasing and manual recording",
    ],
    blocks: [
      {
        heading: "A calendar you do not trust is a calendar you do not use",
        body: [
          "Most people's relationship with a calendar is that they write important dates in it and then forget to look. The reason is not laziness; it is that **the calendar does not do anything unless you open it**. A date in a calendar is a note, not a commitment — until it interrupts you at the right moment, which is what a reminder is for.",
          "So the shift is from recording to being reminded. Every event gets a **notification set deliberately**: a meeting needs fifteen minutes, a deadline needs a day or more, a flight needs several days. The default is usually ten minutes for everything, which is useless for a deadline and too noisy for a meeting. **Set the reminder to match the lead time you actually need to act**, not a single default applied to all of life.",
          "Then the habit that makes it stick: **if it has a time, it goes in the calendar, immediately, at the moment you agree it.** Not later, not on a scrap of paper, not in a message you intend to act on. The gap between agreeing something and recording it is where everything gets lost, and closing that gap to zero is the single highest-value change in this session.",
        ],
      },
      {
        heading: "Scheduling and reminders: reducing the back-and-forth to nothing",
        body: [
          "A large share of scheduling effort is the exchange — 'are you free Tuesday?', 'not Tuesday, how about Thursday?', 'Thursday works, what time?' — which costs several messages and often a day. The tools that collapse this are worth learning properly because they compound: every meeting arranged this way saves ten minutes on both sides.",
          "**Appointment schedules** let you publish available slots and let people book one directly, which removes the exchange entirely for anything repetitive — client consultations, student meetings, interviews. **Shared calendars** let a small team see each other's availability without asking, which is the difference between a team that coordinates and one that collides. And **event invitations** carry the time, the location or link, and the RSVP, so the details live in one place rather than across a thread of messages.",
          "Two supporting habits matter more than they sound. **Put the link or location in the event**, because 'we agreed to meet' without the address generates a phone call twenty minutes beforehand. And **schedule the preparation, not just the meeting** — a presentation at 2pm needs a block at 10am, and if that block is not in the calendar it will be given to something else.",
        ],
      },
      {
        heading: "Forms: the tool that stops you retyping other people's information",
        body: [
          "A form collects structured information from people and puts it in one place automatically. The alternative it replaces is the one most people currently use: asking by WhatsApp, receiving twenty replies in twenty different formats, and typing them into a spreadsheet by hand. **That transcription is pure waste**, and it introduces errors at every keystroke.",
          "The design principle is that **a form's quality is determined by its questions, not by its appearance**. Ask only what you need, because every unnecessary question loses responses. Make questions **required** where the answer is essential. Use **multiple choice and dropdowns** rather than free text wherever the answers come from a known set — a dropdown of states produces clean data, while a free-text state field produces 'Lagos', 'lagos', 'Lagos State' and 'LGS' and you will spend an hour cleaning it.",
          "Then the two settings people miss. **Collect email addresses** if you need to contact people or prevent duplicate submissions — but be aware this makes responses identifiable, which carries a privacy obligation. And **write a confirmation message** that tells people what happens next, because a form that ends with a blank screen generates 'did it go through?' messages you did not need to receive.",
        ],
      },
      {
        heading: "Forms to Sheets: the connection that makes both tools worth using",
        body: [
          "Every form can write its responses directly into a spreadsheet, one row per submission, arriving automatically. This is the mechanism that makes forms genuinely transformative rather than merely convenient, and it is worth understanding precisely because it changes what becomes practical.",
          "What it means concretely: **responses become data you can work with immediately.** Sort by date, filter by category, total an amount, count submissions per option, chart a trend — without a single keystroke of transcription. An attendance register, an order form, a survey, an event registration all become things you can analyse the moment the last person submits.",
          "Two practical points follow. **The sheet updates live**, so you can watch responses arrive rather than polling people for updates. And **you should design the form knowing the sheet is the destination** — which is another argument for dropdowns over free text, because a spreadsheet full of inconsistent text cannot be sorted or counted reliably. **Design for the analysis you want to do, not for the questions you find easy to ask.**",
        ],
      },
      {
        heading: "Using them together: the automation most people never build",
        body: [
          "Calendar and forms solve the same underlying problem from two directions: they remove the manual step between something happening and you having a record of it. Used together they replace a surprising amount of everyday chasing, and the combinations are worth seeing because they are the ones you will actually build.",
          "An **event registration form** collects names and numbers into a sheet, and the event itself lives in the calendar with reminders — so registration and attendance stop being two separate manual processes. A **recurring deadline** in the calendar with a long reminder replaces the habit of remembering to remember. A **client intake form** replaces the twenty-message conversation that currently precedes every new engagement, and it produces consistent information every time rather than whatever you happened to ask.",
          "The honest framing is that none of this is technically impressive, and that is exactly why it works. **The value is in the repetition**: a form that saves ten minutes of transcription, used weekly, saves eight hours a year, and it never makes a typing error. Look for the tasks you do repeatedly and manually, and ask whether a form plus a calendar entry replaces them. That question, applied honestly, is what this course is really teaching.",
        ],
      },
    ],
    demonstration: {
      intro:
        "We build a calendar you can rely on and a form that collects real responses into a spreadsheet — using your own actual commitments and an actual thing you need to collect.",
      steps: [
        {
          step: "Open your calendar and look honestly at what is in it",
          detail:
            "Most people find a handful of events and a great many things they meant to add. That gap is the problem this session fixes, and seeing it plainly is what motivates the habit change.",
        },
        {
          step: "Add every commitment you can think of, right now",
          detail:
            "Work deadlines, appointments, bills, family events, anything with a date. Do it in one sitting rather than promising to do it later, because 'later' is precisely where these things are lost.",
        },
        {
          step: "Set reminders to match the lead time each event needs",
          detail:
            "Fifteen minutes for a meeting, a day for a deadline, several days for anything requiring preparation or travel. Do not accept a single default for everything — a ten-minute warning for a deadline is worthless.",
        },
        {
          step: "Put the location or link inside every event",
          detail:
            "The address, the meeting link, the phone number. 'We agreed to meet' without the details generates a phone call twenty minutes beforehand, every single time.",
        },
        {
          step: "Schedule the preparation, not just the event",
          detail:
            "A presentation at 2pm needs a working block at 10am. If the preparation is not in the calendar, something else will take that time and you will discover it at 1:45pm.",
        },
        {
          step: "Make an event recurring where it repeats",
          detail:
            "A weekly meeting, a monthly bill, a quarterly review. Set it once with a repeat rule rather than re-entering it, and it will still be there in six months when you have forgotten to add it.",
        },
        {
          step: "Create an appointment schedule for something repetitive",
          detail:
            "Client consultations, student meetings, or interviews. Publish your available slots so people book directly, removing the entire 'are you free Tuesday' exchange for anything that happens regularly.",
        },
        {
          step: "Share a calendar with someone you coordinate with",
          detail:
            "A colleague, a partner, a teammate. Set it to show availability rather than details if the content is private. The point is coordinating without asking, which is what prevents collisions.",
        },
        {
          step: "Send a real invitation with RSVP",
          detail:
            "Include time, location or link, and request a response. The details now live in one place and in both calendars, rather than across a message thread neither of you will re-read.",
        },
        {
          step: "Open the calendar on your phone and confirm notifications fire",
          detail:
            "This is the test that matters. A calendar that does not interrupt you at the right moment on the device you carry is a calendar you will forget to open. Verify it actually notifies.",
        },
        {
          step: "Create a form for something you genuinely need to collect",
          detail:
            "An attendance register, an order form, a survey, an event registration. Use a real need, because you will keep the result and the habit forms around something you actually use.",
        },
        {
          step: "Use dropdowns and multiple choice wherever answers come from a set",
          detail:
            "A dropdown of Nigerian states rather than a free-text field. Free text gives you 'Lagos', 'lagos', 'Lagos State' and 'LGS'; a dropdown gives you one value you can count and sort.",
        },
        {
          step: "Mark essential questions required and cut the rest",
          detail:
            "Every unnecessary question loses responses. Ask what you need and nothing more — a short form with a high completion rate beats a thorough form nobody finishes.",
        },
        {
          step: "Decide deliberately whether to collect email addresses",
          detail:
            "It prevents duplicates and lets you reply, but it makes responses identifiable and therefore carries a privacy obligation under NDPA 2023. Choose based on need, not convenience.",
        },
        {
          step: "Write a confirmation message that says what happens next",
          detail:
            "'Thank you — we will contact you within one working day.' A form that ends with a blank screen generates 'did it go through?' messages you did not need to receive.",
        },
        {
          step: "Connect the form to a spreadsheet",
          detail:
            "Choose the responses destination so submissions write one row each. This is the step that converts a form from a collection box into a data source you can actually work with.",
        },
        {
          step: "Submit three test responses with deliberately messy data",
          detail:
            "Use different options, leave optional fields blank, submit quickly. Watch the rows appear in the sheet and confirm the data arrives clean — which is the payoff for using dropdowns.",
        },
        {
          step: "Sort, filter and total the responses in the sheet",
          detail:
            "Count submissions per option, total any amounts, filter by date. None of this required transcription, which is the entire argument for forms over asking people by message.",
        },
        {
          step: "Share the form and collect real responses",
          detail:
            "Send the link to the people who actually need to respond. Real submissions arriving in the sheet without you typing anything is the moment this stops being an exercise.",
        },
        {
          step: "Add the follow-up to your calendar",
          detail:
            "A reminder to review responses and act on them. A form nobody reviews is a form nobody benefits from, and the review is as much a scheduled task as any meeting.",
        },
      ],
    },
    practice: {
      title: "Build a calendar you trust and a form that collects real data",
      brief:
        "Turn your calendar into something that interrupts you at the right time, and build a form that collects real responses into a spreadsheet you can analyse.",
      steps: [
        "Open your calendar and note honestly how much is missing from it.",
        "Add every commitment you can think of in one sitting, not later.",
        "Set each reminder to match the lead time that event actually needs.",
        "Put the location, link or phone number inside every event.",
        "Schedule preparation blocks for anything requiring work beforehand.",
        "Make repeating events recurring rather than re-entering them.",
        "Create an appointment schedule for something that happens regularly.",
        "Share a calendar with someone you coordinate with, at availability level if the content is private.",
        "Send a real invitation with RSVP and confirm the details appear in both calendars.",
        "Verify on your phone that notifications actually fire — this is the test that matters.",
        "Create a form for something you genuinely need to collect.",
        "Use dropdowns and multiple choice wherever answers come from a known set.",
        "Mark essential questions required and remove every unnecessary one.",
        "Decide deliberately whether to collect email addresses, weighing the privacy obligation.",
        "Write a confirmation message stating what happens next.",
        "Connect the form to a spreadsheet and submit three test responses with messy data.",
        "Sort, filter and total the responses without transcribing anything.",
        "Share the form and collect real responses from real people.",
        "Add a calendar reminder to review and act on the responses.",
      ],
      standard:
        "A calendar populated with every current commitment in one sitting, reminders matched to each event's required lead time, locations and links inside events, preparation blocks scheduled, repeats set for recurring items, an appointment schedule published, a calendar shared at availability level, a real invitation sent with RSVP, and **notifications verified to fire on the phone**; a form built for a genuine need using dropdowns for known sets, essential questions required, a deliberate email-collection decision, and a confirmation message stating next steps — connected to a spreadsheet, tested with messy submissions, sorted and totalled without transcription, shared for real responses, with a calendar reminder set to act on them.",
    },
    pitfalls: [
      {
        problem: "Writing dates down and then never looking at the calendar",
        fix: "The calendar does nothing unless it interrupts you. Set reminders to match the lead time each event needs — a date without a notification is a note, not a commitment.",
      },
      {
        problem: "Accepting the default ten-minute reminder for everything",
        fix: "Ten minutes is useless for a deadline and too noisy for a meeting. Match the reminder to the time you actually need to act, per event.",
      },
      {
        problem: "Recording commitments later rather than at the moment you agree them",
        fix: "The gap between agreeing and recording is where everything is lost. Put it in the calendar immediately, on the device in your hand, before the conversation ends.",
      },
      {
        problem: "Using free-text fields for answers that come from a known set",
        fix: "A free-text state field produces 'Lagos', 'lagos', 'Lagos State' and 'LGS'. A dropdown produces one value you can sort and count. Design for the analysis you want to do.",
      },
      {
        problem: "Asking more questions than you need",
        fix: "Every unnecessary question loses responses. A short form with a high completion rate is worth more than a thorough form nobody finishes.",
      },
      {
        problem: "Collecting email addresses by default without considering it",
        fix: "It prevents duplicates and enables replies, but makes responses identifiable and carries obligations under NDPA 2023. Decide based on need rather than convenience.",
      },
      {
        problem: "Leaving the form's confirmation screen blank",
        fix: "Write what happens next. A blank ending generates 'did it go through?' messages, which is manual work you created by omitting one sentence.",
      },
      {
        problem: "Building a form and never reviewing the responses",
        fix: "Schedule the review in your calendar. A form nobody acts on benefits nobody, and the review is a task like any other meeting.",
      },
    ],
    expertNotes: [
      "Record commitments at the moment you agree them, on the device in your hand. That single habit closes the gap where almost everything gets lost, and it costs nothing — the discipline is the whole skill.",
      "Use dropdowns for anything drawn from a known set. It feels like a small design choice and it determines whether your responses are analysable data or an hour of cleaning inconsistent text later.",
      "Verify that calendar notifications actually fire on your phone before trusting the system. A calendar that does not interrupt you on the device you carry is a calendar you will forget to open, however complete it is.",
      "Look for tasks you do repeatedly and manually, and ask whether a form plus a calendar entry replaces them. The value is in the repetition — ten minutes saved weekly is eight hours a year, with no typing errors.",
    ],
    vocabulary: [
      {
        term: "Reminder lead time",
        meaning:
          "How far ahead of an event a notification fires. It should match the time you actually need to act, which differs for a meeting, a deadline and a flight.",
      },
      {
        term: "Appointment schedule",
        meaning:
          "A published set of available slots that people book directly, removing the back-and-forth exchange for anything that happens regularly.",
      },
      {
        term: "Shared calendar",
        meaning:
          "A calendar others can view, often at availability level only. It lets a small team coordinate without asking each other.",
      },
      {
        term: "Google Form",
        meaning:
          "A tool collecting structured responses into one place automatically, replacing asking by message and transcribing replies by hand.",
      },
      {
        term: "Response destination",
        meaning:
          "The spreadsheet a form writes into, one row per submission. This connection is what converts a form from a collection box into analysable data.",
      },
      {
        term: "Required question",
        meaning:
          "A form field that must be answered before submission. Used only where the answer is genuinely essential, since each one slightly reduces completion.",
      },
      {
        term: "Confirmation message",
        meaning:
          "The text shown after submission, ideally stating what happens next. Its absence generates avoidable follow-up messages.",
      },
      {
        term: "Structured response",
        meaning:
          "An answer constrained to a known set of options, such as a dropdown. It produces clean data that can be sorted and counted without cleaning.",
      },
    ],
    homework: [
      {
        task: "Populate and trust your calendar",
        detail:
          "Add every current commitment with reminders matched to required lead time, locations inside events, and preparation blocks scheduled. Verify notifications fire on your phone, and record what you changed.",
      },
      {
        task: "Build and share one real form",
        detail:
          "For something you genuinely need to collect, using dropdowns for known sets, required questions only where essential, and a confirmation message stating next steps. Collect at least five real responses.",
      },
      {
        task: "Analyse the responses without transcribing",
        detail:
          "In the connected spreadsheet, sort, filter and total the responses. Write two sentences on what the data tells you that asking by message would not have.",
      },
      {
        task: "Identify one repetitive manual task to automate",
        detail:
          "Name a task you do repeatedly by hand, describe the form and calendar entry that would replace it, and estimate the time saved per week. Then build it.",
      },
    ],
    rubric: [
      {
        criterion: "Calendar reliability",
        passing: "Events were added.",
        excellent:
          "Every commitment recorded, reminders matched to lead time per event, locations and links inside events, preparation scheduled, and notifications verified on the phone.",
      },
      {
        criterion: "Scheduling efficiency",
        passing: "Can create events and invitations.",
        excellent:
          "Uses appointment schedules for repetitive meetings, shares calendars at availability level, and has eliminated at least one recurring back-and-forth exchange.",
      },
      {
        criterion: "Form design",
        passing: "A form was created.",
        excellent:
          "Dropdowns used for known sets, only essential questions required, deliberate email-collection decision, and a confirmation message stating what happens next.",
      },
      {
        criterion: "Data handling",
        passing: "Responses were collected.",
        excellent:
          "Form connected to a spreadsheet, tested with messy submissions, responses sorted filtered and totalled with no transcription, and real responses collected.",
      },
      {
        criterion: "Automation thinking",
        passing: "Used both tools.",
        excellent:
          "Can identify repetitive manual tasks and replace them with a form plus calendar entry, with the review of responses itself scheduled.",
      },
    ],
    faqs: [
      {
        q: "I always forget to look at my calendar. How do I fix that?",
        a: "Stop relying on looking. Set reminders to match the lead time each event needs and verify they fire on your phone. A calendar that interrupts you at the right moment does not require you to remember to check it.",
      },
      {
        q: "Should I collect email addresses on my form?",
        a: "Only if you need to reply or prevent duplicates. It makes responses identifiable, which carries obligations under NDPA 2023, so decide based on need rather than collecting it because the option is there.",
      },
      {
        q: "Why do my form responses look messy in the spreadsheet?",
        a: "Usually free-text fields where a dropdown would have constrained the answers. Change those questions to multiple choice or dropdowns — you will lose nothing and gain responses you can sort and count.",
      },
      {
        q: "Can people edit their responses after submitting?",
        a: "Only if you enable it, and it requires collecting their email address. Most forms do not need it; if yours does, that is a further reason to collect emails deliberately rather than by default.",
      },
      {
        q: "Is an appointment schedule worth setting up for occasional meetings?",
        a: "For occasional one-off meetings, no — an invitation is simpler. For anything recurring, such as consultations or interviews, yes: it removes the scheduling exchange entirely every single time.",
      },
    ],
  },

  "email-management": {
    summary:
      "An inbox that is a processed queue rather than a storage box: labels and filters doing the sorting, archive instead of delete, templates for what you write repeatedly, and notifications that serve you rather than interrupt you.",
    objectives: [
      "Apply inbox zero as a processing method rather than an aspirational number",
      "Build a label structure that reflects how you actually work",
      "Create filters that sort mail automatically and reliably",
      "Understand archive against delete and stop losing things you need",
      "Use templates and manage notifications so email serves you",
    ],
    blocks: [
      {
        heading: "Inbox zero is a method, not a number",
        body: [
          "The phrase misleads people into thinking the goal is an empty inbox, which sounds exhausting and pointless. The actual idea is narrower and much more useful: **the inbox is for decisions you have not yet made, not for storage.** Once you have decided what something is, it leaves the inbox — actioned, filed, or removed. An inbox containing only unprocessed items is a to-do list you can trust; an inbox containing everything is a pile you have stopped reading.",
          "The processing step has four outcomes and they cover every message. **Do it** if it takes under two minutes. **Defer it** if it needs real time, by turning it into a calendar entry or a task rather than leaving it to be re-read. **Delegate it** if it belongs to someone else. **File it** if it is reference you may need later. Anything that does not fit those is deleted. **The decision is the work**; the empty inbox is only the evidence that decisions were made.",
          "This matters practically because an unprocessed inbox actively costs you. Every unread message is re-scanned each time you open mail, which is a small tax paid repeatedly, and important messages hide among the unread. **A processed inbox is faster to use even when it holds the same mail**, because you are not re-reading things you have already decided about.",
        ],
      },
      {
        heading: "Labels and folders: one structure, built from how you work",
        body: [
          "Gmail uses **labels** rather than folders, and the difference is worth understanding: a message can carry several labels at once, whereas a folder holds one copy. That makes labels better suited to real life, where an email can be both about a client and about an invoice.",
          "The structure that works is small and reflects your actual categories, not an idealised taxonomy. **Five to ten labels is usually right** — by client or project, plus a few functional ones like Finance, Waiting For, and Reference. The common failure is building twenty-five labels on the first enthusiastic afternoon and then filing nothing, because deciding between twenty-five options takes longer than leaving the mail alone.",
          "Two habits make the structure earn its keep. **A 'Waiting For' label** for anything you have actioned that now depends on someone else — this is the single most useful label most people never create, and it turns 'did anybody reply?' from a memory exercise into a list. And **filing at the moment of processing rather than later**, because a message left in the inbox to be filed eventually is a message that will be re-read six more times instead.",
        ],
      },
      {
        heading: "Filters: the sorting you should never do by hand again",
        body: [
          "A **filter** is a rule that acts on incoming mail automatically — applying a label, archiving, marking read, or forwarding, based on the sender, subject or contents. Every message you sort by hand is a message a filter could have sorted for the last year, and filters are the highest-leverage hour you can spend on email.",
          "The candidates are obvious once you look for them. **Newsletters and notifications** you read occasionally but which should not interrupt you: label and skip the inbox. **Invoices and receipts**: straight to Finance. **Mail from a specific client**: straight to their label. **Automated system messages**: labelled and archived. Between them these typically clear a large share of daily volume, and what remains in the inbox is mail that genuinely needs you.",
          "Two disciplines keep filters trustworthy. **Test each one immediately** by sending yourself a matching message, because a filter with a typo silently does nothing and you will not notice for weeks. And **review them occasionally**, because senders change addresses and a filter that stops matching is invisible — it produces no error, only mail arriving where it should not. **A filter you have not verified is a filter you are assuming works.**",
        ],
      },
      {
        heading: "Archive against delete: the distinction that stops you losing things",
        body: [
          "This is the misunderstanding that keeps people from processing their inbox at all. **Archiving does not delete.** An archived message leaves the inbox but remains in All Mail, fully searchable, and reappears in your inbox if the person replies. Deleting removes it permanently. Those are completely different actions, and conflating them makes clearing the inbox feel dangerous.",
          "Once that is clear, the default becomes obvious: **archive almost everything, delete only what has no conceivable future value.** Newsletters you have read, notifications, spam, messages that needed no reply. Archive is free, costs nothing to keep, and search finds anything in seconds — so the anxiety about losing something is almost always misplaced.",
          "Two exceptions deserve genuine caution. Anything with **legal, financial or contractual significance** — contracts, agreements, payment records, official correspondence — should be deliberately retained, and for important documents the safer practice is to save a copy to Drive rather than relying on mail search alone. And remember that **deletion is not always instant or recoverable**, so treat it as the irreversible action it is rather than a tidying gesture.",
        ],
      },
      {
        heading: "Templates and notifications: writing less and being interrupted less",
        body: [
          "**Templates** store the messages you write repeatedly, so a common reply becomes a keystroke rather than a composition. The candidates are the ones you already recognise: acknowledging receipt, sending an invoice, answering the same three questions, confirming an appointment, declining a request politely. **If you have typed it three times, it should be a template.**",
          "The discipline is to write templates once, properly, rather than dashing off a quick reply — a well-written standard acknowledgement is more professional than an improvised one, and it is consistent every time. Keep the personal part small and obvious, such as the recipient's name and the specific matter, so the template does not read as mass mail.",
          "Then notifications, which most people have configured against their own interests. Every ping is an interruption with a real recovery cost, and the majority of mail is not urgent. **Turn off notifications for everything except what genuinely needs immediate attention**, and check mail at set times rather than continuously. This is uncomfortable for a few days and then it is simply how you work — and the honest measure is that **you will not miss anything important, because important things arrive by phone.**",
        ],
      },
    ],
    demonstration: {
      intro:
        "We process a real inbox from unmanageable to trusted: a label structure, filters that sort automatically, an archive discipline, templates for repeated replies, and notifications reconfigured deliberately.",
      steps: [
        {
          step: "Look at the current state honestly and count it",
          detail:
            "Note the unread count and how far back the inbox goes. This is the baseline, and it is also the evidence for why the method matters — an inbox nobody has reached the end of is an inbox nobody trusts.",
        },
        {
          step: "Create a small label structure, not an ambitious one",
          detail:
            "Five to ten labels reflecting real categories: by client or project, plus Finance, Waiting For, and Reference. Twenty-five labels created enthusiastically on one afternoon results in nothing being filed at all.",
        },
        {
          step: "Create the Waiting For label specifically",
          detail:
            "For anything you have actioned that now depends on someone else. This is the most useful label most people never make, and it turns 'did anybody reply?' from memory into a list you can read.",
        },
        {
          step: "Process the oldest hundred messages using the four outcomes",
          detail:
            "Do it, defer it, delegate it, or file it — and delete what fits none. Work from the oldest rather than the newest, because the newest will keep arriving and you will never reach the bottom otherwise.",
        },
        {
          step: "Turn anything needing real time into a calendar entry",
          detail:
            "A message that requires an hour of work is not an email task, it is a scheduled task. Deferring means putting it in the calendar, not leaving it in the inbox to be re-read daily.",
        },
        {
          step: "Archive rather than delete, and prove it is safe",
          detail:
            "Archive a batch, then find one in All Mail by searching for it. Seeing that archived mail is still fully searchable is what makes clearing the inbox feel safe rather than reckless.",
        },
        {
          step: "Delete only genuine rubbish",
          detail:
            "Newsletters already read, notifications, spam. Be deliberate, because deletion is not reliably reversible — treat it as the irreversible action it is, not as tidying.",
        },
        {
          step: "Save anything legally or financially significant to Drive",
          detail:
            "Contracts, agreements, payment records, official correspondence. For important documents do not rely on mail search alone; a copy in Drive is a deliberate retention decision.",
        },
        {
          step: "Create your first filter for a newsletter",
          detail:
            "Match the sender, apply a label, and choose skip inbox. Reading it when you choose is different from being interrupted by it whenever it arrives.",
        },
        {
          step: "Test that filter immediately",
          detail:
            "Send yourself a matching message or wait for the next one and confirm it lands labelled and out of the inbox. A filter with a typo silently does nothing, and you will not notice for weeks.",
        },
        {
          step: "Create a filter for invoices and receipts",
          detail:
            "Match common senders and subject words, label Finance, archive. These never need to sit in the inbox, and they are exactly the messages you need to find quickly later.",
        },
        {
          step: "Create a filter per client or project",
          detail:
            "Mail from a client goes straight to their label. This alone typically clears a large share of volume and means client history is already gathered when you need it.",
        },
        {
          step: "List every filter you created and review the matching rules",
          detail:
            "Confirm each rule matches what you intended. Filters produce no error when they stop working, so an unreviewed list is a list you are assuming is correct.",
        },
        {
          step: "Enable templates and write your first three",
          detail:
            "Acknowledging receipt, sending an invoice, and confirming an appointment. Write them properly once rather than quickly — a standard acknowledgement is more professional than an improvised one.",
        },
        {
          step: "Use a template in a real reply",
          detail:
            "Insert it, add the recipient's name and the specific matter, and send. Note how long it took against writing the same message from scratch, because that difference multiplied by frequency is the payoff.",
        },
        {
          step: "Review your notification settings honestly",
          detail:
            "Count how many interruptions you received today and ask how many were urgent. The answer is almost always very few, and every interruption carries a real recovery cost.",
        },
        {
          step: "Turn off notifications except what genuinely needs immediate attention",
          detail:
            "Keep alerts for direct messages from people who matter and disable the rest. Then check mail at set times rather than continuously — uncomfortable for a few days, then simply how you work.",
        },
        {
          step: "Set a daily processing time and put it in the calendar",
          detail:
            "Two short blocks rather than continuous checking. A scheduled processing time is what keeps the inbox processed; without it, the system decays within a fortnight.",
        },
        {
          step: "Confirm the end state and record the method",
          detail:
            "Inbox contains only unprocessed items; everything else is labelled, archived or deleted. Write down your four-outcome method and your label list, because the system survives only if the method is written rather than remembered.",
        },
      ],
    },
    practice: {
      title: "Process a real inbox and make it stay processed",
      brief:
        "Take your actual inbox from unmanageable to trusted, and put in place the filters, templates and notification settings that keep it that way.",
      steps: [
        "Record your baseline: unread count and how far back the inbox goes.",
        "Create five to ten labels reflecting real categories, including Waiting For and Finance.",
        "Process the oldest hundred messages using do, defer, delegate, file — deleting what fits none.",
        "Turn every message needing real time into a calendar entry rather than leaving it in the inbox.",
        "Archive rather than delete, then prove archived mail is searchable in All Mail.",
        "Delete only genuine rubbish, treating deletion as irreversible.",
        "Save anything legally or financially significant to Drive as a deliberate retention decision.",
        "Create a filter for a newsletter: label it and skip the inbox.",
        "Test that filter immediately by sending a matching message.",
        "Create a filter for invoices and receipts routing to Finance.",
        "Create a filter per client or project.",
        "List all your filters and verify each matching rule does what you intended.",
        "Enable templates and write your three most-repeated messages properly.",
        "Use a template in a real reply and note the time saved.",
        "Count today's interruptions and assess how many were genuinely urgent.",
        "Disable notifications except what needs immediate attention.",
        "Schedule two daily processing blocks in your calendar.",
        "Write down your four-outcome method and label list so the system outlives your memory of it.",
      ],
      standard:
        "A baseline recorded before starting; five to ten labels including Waiting For and Finance; the oldest hundred messages processed through do, defer, delegate, file with anything needing real time converted to calendar entries; archive used as the default with searchability proven in All Mail and deletion reserved for genuine rubbish; legally and financially significant items saved to Drive; at least three filters created covering newsletters, invoices and per-client mail, **each tested immediately and the full list verified**; three templates written properly and used in a real reply; interruption count assessed and notifications disabled except for genuinely immediate matters; two daily processing blocks scheduled; and the method and label list written down.",
    },
    pitfalls: [
      {
        problem: "Treating the inbox as storage rather than a queue of pending decisions",
        fix: "Every message gets one of four outcomes — do, defer, delegate, file — or is deleted. The decision is the work; an empty inbox is only the evidence that decisions were made.",
      },
      {
        problem: "Building twenty-five labels on the first afternoon",
        fix: "Five to ten, reflecting real categories. Deciding between twenty-five options takes longer than leaving the mail unfiled, which is why ambitious structures get abandoned.",
      },
      {
        problem: "Never creating a Waiting For label",
        fix: "It holds everything you have actioned that now depends on someone else, and it turns 'did anybody reply?' from a memory exercise into a list. It is the most useful label most people never make.",
      },
      {
        problem: "Creating filters and never testing them",
        fix: "A filter with a typo silently does nothing and produces no error. Send yourself a matching message and confirm the behaviour, then review the list periodically as senders change.",
      },
      {
        problem: "Believing archive means delete",
        fix: "Archived mail stays in All Mail, fully searchable, and returns to the inbox if the person replies. Once that is clear, archive becomes the safe default and clearing the inbox stops feeling dangerous.",
      },
      {
        problem: "Deleting mail with legal or financial significance",
        fix: "Save contracts, agreements, payment records and official correspondence to Drive deliberately. Do not rely on mail search alone for documents that matter, and treat deletion as irreversible.",
      },
      {
        problem: "Rewriting the same reply for the tenth time",
        fix: "If you have typed it three times it should be a template. Write it properly once — a standard acknowledgement is more professional and more consistent than an improvised one.",
      },
      {
        problem: "Leaving notifications on for everything",
        fix: "Every ping carries a real recovery cost and most mail is not urgent. Disable all but genuinely immediate matters and check at set times; important things arrive by phone.",
      },
    ],
    expertNotes: [
      "Archive is not delete, and understanding that is what unlocks the whole method. Archived mail remains searchable and returns to the inbox if the person replies, so archive becomes the safe default — which is what makes clearing the inbox feel possible rather than reckless.",
      "Filters are the highest-leverage hour you can spend on email, but an untested filter is an assumption. Send yourself a matching message and confirm the behaviour, because a filter that silently stops matching produces no error, only misplaced mail.",
      "Create a Waiting For label today. It is a small thing and it is the one most people lack: everything you have actioned that now depends on somebody else, in one list, instead of held in memory alongside everything else.",
      "Turn off notifications and check mail at set times. It is uncomfortable for a few days and then it is simply how you work. The honest test is that you will not miss anything important, because genuinely urgent matters arrive by phone rather than by email.",
    ],
    vocabulary: [
      {
        term: "Inbox zero",
        meaning:
          "A processing method where the inbox holds only unprocessed items. The goal is that decisions have been made, not that the count is zero.",
      },
      {
        term: "The four outcomes",
        meaning:
          "Do it, defer it, delegate it, or file it — with deletion for anything fitting none. Together they cover every message that arrives.",
      },
      {
        term: "Label",
        meaning:
          "Gmail's tagging system. Unlike a folder, one message can carry several labels, which suits mail that belongs to more than one category.",
      },
      {
        term: "Waiting For",
        meaning:
          "A label holding everything you have actioned that now depends on someone else. It converts 'did anybody reply?' from memory into a readable list.",
      },
      {
        term: "Filter",
        meaning:
          "A rule acting on incoming mail automatically by sender, subject or content — applying labels, archiving or forwarding. It produces no error when it stops matching.",
      },
      {
        term: "Archive",
        meaning:
          "Removing a message from the inbox while keeping it in All Mail, searchable, and returning it to the inbox if the sender replies. It is not deletion.",
      },
      {
        term: "Template",
        meaning:
          "A stored message for replies you write repeatedly. Worth creating once you have typed the same thing three times.",
      },
      {
        term: "Notification discipline",
        meaning:
          "Deliberately limiting alerts to what needs immediate attention and checking mail at set times, because each interruption carries a recovery cost.",
      },
    ],
    homework: [
      {
        task: "Process your oldest hundred messages",
        detail:
          "Using do, defer, delegate, file, and delete for what fits none. Convert anything needing real time into calendar entries, and record how long it took and what the inbox looked like afterwards.",
      },
      {
        task: "Build and test three filters",
        detail:
          "Covering newsletters, invoices and one client or project. Test each by sending a matching message, then list all your filters and verify every matching rule does what you intended.",
      },
      {
        task: "Write your three most-used templates",
        detail:
          "Written properly rather than quickly, with an obvious place for the recipient's name and the specific matter. Use each in a real reply this week and note the time saved.",
      },
      {
        task: "Reconfigure your notifications and schedule processing time",
        detail:
          "Disable everything except genuinely immediate matters, set two daily processing blocks in your calendar, and record how many interruptions you had before and after over one week.",
      },
    ],
    rubric: [
      {
        criterion: "Processing method",
        passing: "Reduced the unread count.",
        excellent:
          "Applied the four outcomes consistently, worked from the oldest messages, converted time-consuming items into calendar entries, and can explain that the decision is the work.",
      },
      {
        criterion: "Organisation structure",
        passing: "Labels were created.",
        excellent:
          "Five to ten labels reflecting real categories including Waiting For, with filing done at the moment of processing rather than deferred.",
      },
      {
        criterion: "Automation",
        passing: "A filter was created.",
        excellent:
          "At least three filters covering newsletters, invoices and per-client mail, each tested immediately, with the full list verified and understood to need periodic review.",
      },
      {
        criterion: "Archive judgement",
        passing: "Knows archive is not delete.",
        excellent:
          "Uses archive as the default with searchability proven, deletes only genuine rubbish, and saves legally and financially significant items to Drive deliberately.",
      },
      {
        criterion: "Sustainability",
        passing: "The inbox was cleared once.",
        excellent:
          "Templates written and used, notifications reduced to genuinely immediate matters, processing time scheduled, and the method written down so it outlives memory.",
      },
    ],
    faqs: [
      {
        q: "I am afraid of archiving something I will need. What do I do?",
        a: "Search for an archived message in All Mail and see that it is there. Archive does not delete — the mail stays searchable and returns to your inbox if the sender replies. Once you have seen that, clearing the inbox stops feeling dangerous.",
      },
      {
        q: "How long does it take to clear a years-deep inbox?",
        a: "Process the oldest hundred in one sitting and you will find most need no action at all — they are read newsletters and notifications to archive. Most people reach a processed state in a few hours spread over a week, not the months they fear.",
      },
      {
        q: "Will I miss something urgent if I turn off notifications?",
        a: "Almost certainly not, because genuinely urgent matters arrive by phone rather than by email. Keep alerts for direct messages from people who matter, disable the rest, and check at set times.",
      },
      {
        q: "My filters stopped working. Why?",
        a: "Usually the sender changed address or subject wording, and filters produce no error when they stop matching — they simply stop acting. Review your filter list periodically and test each rule with a matching message.",
      },
      {
        q: "Is inbox zero actually achievable alongside a busy job?",
        a: "The empty inbox is not the target; a processed one is. Two short daily blocks using the four outcomes keeps it there, and the payoff is that you stop re-reading the same unread messages several times a day.",
      },
    ],
  },

  "files-naming-cloud-backup": {
    summary:
      "The layer that protects everything else: a folder structure you can navigate, filenames that survive being separated from their folder, cloud storage used properly, a backup strategy that assumes devices die, and how to recover a lost file.",
    objectives: [
      "Build a folder structure shallow enough to actually use",
      "Apply a naming convention that works when a file leaves its folder",
      "Use cloud storage as a working system rather than a dumping ground",
      "Implement the three-two-one backup principle on a real budget",
      "Recover a deleted or overwritten file, and know when recovery is not possible",
    ],
    blocks: [
      {
        heading: "The problem is not storage, it is finding",
        body: [
          "Nobody runs out of space; people run out of ability to locate what they saved. Storage is cheap and effectively unlimited, so the failure mode of personal file management is not loss of capacity — it is **a document you know exists and cannot find**, or three versions of it with no way to tell which is current. That is the problem this session solves, and it is why naming and structure matter more than any amount of storage.",
          "The cause is almost always the same: files were saved **at the moment of saving rather than with any system**, into whatever location was convenient, with whatever name came to mind. 'Document1', 'final', 'new version', 'invoice' — none of which mean anything six weeks later. **A filename is a message you write to your future self**, and most people write nothing.",
          "There is also the deeper risk that this course has been circling: **a file on one device is one hardware failure away from gone.** Laptops die, phones are stolen, and disks fail without warning. A system with no backup is not a system, it is a countdown — which is why the second half of this session is about redundancy rather than organisation.",
        ],
      },
      {
        heading: "Folder structures: shallow beats deep, every time",
        body: [
          "The instinct is to build a detailed hierarchy, and the result is a tree nobody can navigate. **Three or four top-level folders, with at most two levels beneath them**, is the structure that actually gets used — because you can hold it in your head, and because filing a document requires one decision rather than five.",
          "Organise by **category, then by time**, rather than trying to build a perfect taxonomy. Work, Personal, Finance, Documents at the top level; then by year or by client within them. Deeply nested structures fail for a specific reason: **every additional level is another decision at the moment of filing, and when filing is effortful, people dump files on the Desktop instead** — which is how a careful structure ends up empty while the Desktop holds everything.",
          "The supporting habit is a **single inbox for the undecided**. A folder called To Sort, checked weekly, catches the files you cannot immediately categorise. Without it, an unclear file goes to the Desktop and stays there; with it, filing becomes a small weekly task rather than a source of friction every time you save something.",
        ],
      },
      {
        heading: "Naming conventions: the filename must survive leaving its folder",
        body: [
          "The test of a good filename is this: **if the file were emailed to you with no folder context, would you know what it is?** 'invoice.pdf' fails. '2026-03-14 Adeyemi Interiors — Invoice 0042.pdf' passes. Files get attached, downloaded, shared and copied out of their folders constantly, and the moment that happens, the folder structure you relied on is gone and the name is all that remains.",
          "The convention that works has three parts. **Date first, in year-month-day order** — 2026-03-14 — because it sorts chronologically in every file manager without any configuration, which no other date format does reliably. **Then who or what it concerns**, in plain words. **Then what it is.** That order puts the most useful sorting key first and reads naturally left to right.",
          "Two rules complete it. **Never use the words final, new, or a version number as the distinguishing part** — 'final_v2_REAL' tells you nothing except that you were unsure, and it guarantees ambiguity. And **be consistent rather than clever**: a mediocre convention applied to every file beats an elegant one applied to half of them, because search only works predictably when naming is uniform.",
        ],
      },
      {
        heading: "Cloud storage: a working system, not a dumping ground",
        body: [
          "Cloud storage does three distinct jobs and it is worth separating them. It **syncs** your files across devices, so the phone and the laptop see the same things. It provides **access from anywhere**, which is what makes a dead laptop survivable in the short term. And it keeps **version history**, so an overwritten file can be restored. Those are three different protections and none of them is a substitute for a real backup.",
          "The habit that makes cloud storage work is **saving to it by default rather than to the local disk.** Most people save locally and upload occasionally, which means the cloud copy is always stale and the local copy is always at risk. Invert it: **the cloud is where the file lives**, and the local copy is a cache. Once that is your default, the sync happens without thought and the risk profile changes completely.",
          "Then the caution that matters. **Sync is not backup.** If you delete a file, or overwrite it with something wrong, or ransomware encrypts it, the change syncs to the cloud just as faithfully as an intentional edit. Cloud storage protects against device failure and nothing else. **Treating sync as backup is the single most common and most expensive misunderstanding in personal file management.**",
        ],
      },
      {
        heading: "Backup: the three-two-one principle, and recovering what is lost",
        body: [
          "**Three copies of your data, on two different types of medium, with one kept offsite.** That is the standard, and it exists because each part covers a failure the others do not. Three copies because any single copy can fail unnoticed. Two types of medium because a disk fault and a cloud account problem are different risks. One offsite because theft, fire and flood take the building and everything in it.",
          "On a realistic Nigerian budget this is achievable without expense. **Copy one** is your working files in cloud storage. **Copy two** is a scheduled export to an external drive or a second cloud service. **Copy three, offsite,** is a second cloud provider or a drive kept somewhere other than where the computer lives. The critical part that most people skip is **the schedule** — a backup you must remember to run will be missing on the day you need it, so automate it or attach it to something you already do weekly.",
          "Then recovery, which is the part that determines whether a backup is real. **Cloud version history** restores an overwritten or deleted file within the retention window. **Cloud trash** holds deleted items for a limited period before permanent removal. **A drive backup** restores anything from the moment it was taken. And the honest limits: a file deleted from everywhere, past the retention window, with no backup, is **gone** — and knowing that in advance is what motivates the schedule. **Test a restoration once, deliberately, while nothing is at stake**, because a backup you have never restored is a hope rather than a plan.",
        ],
      },
    ],
    demonstration: {
      intro:
        "We organise a real set of files, apply a naming convention, invert the save-to-cloud default, build a three-two-one backup on a real budget, and recover a deliberately destroyed file.",
      steps: [
        {
          step: "Survey what you actually have before organising anything",
          detail:
            "Count the files on your Desktop and in Downloads, and look at how many are named 'new', 'final', 'document' or a date you cannot interpret. This is the baseline, and it explains why finding things takes so long.",
        },
        {
          step: "Create three or four top-level folders",
          detail:
            "Work, Personal, Finance, Documents. Resist adding more — the structure that gets used is the one you can hold in your head, and every extra category is another decision at the moment of filing.",
        },
        {
          step: "Add at most two levels beneath them",
          detail:
            "By year or by client within each. Deeper than that and filing becomes effortful, which is precisely when people start dumping files on the Desktop instead.",
        },
        {
          step: "Create a To Sort folder as the inbox for the undecided",
          detail:
            "For anything you cannot categorise immediately. Without it an unclear file goes to the Desktop and stays there; with it, filing becomes one small weekly task rather than friction every time you save.",
        },
        {
          step: "Move your Desktop and Downloads contents into the structure",
          detail:
            "Do it in one sitting, putting anything unclear into To Sort rather than agonising. A cleared Desktop is the visible proof that the system works, and it takes less time than deciding each file individually.",
        },
        {
          step: "Rename ten files to the convention",
          detail:
            "Date first as 2026-03-14, then who or what it concerns, then what it is. Note how much more searchable they become, and how they now sort chronologically without any configuration.",
        },
        {
          step: "Apply the email test to each name",
          detail:
            "Ask whether the filename alone would tell you what the file is if it arrived with no folder context. Files leave their folders constantly, and when they do the name is all that remains.",
        },
        {
          step: "Remove every 'final', 'new' and version number",
          detail:
            "Replace them with content words. 'final_v2_REAL' tells you nothing except that you were unsure, and it guarantees you will not know which copy to use six weeks later.",
        },
        {
          step: "Move your working files into cloud storage",
          detail:
            "Not a copy — the files themselves. The cloud becomes where they live and the local disk becomes a cache, which inverts the usual arrangement where the cloud copy is always stale.",
        },
        {
          step: "Confirm sync is actually working on both devices",
          detail:
            "Create a file on the laptop and find it on the phone. Create one on the phone and find it on the laptop. Assuming sync works is how people discover it does not, at the worst moment.",
        },
        {
          step: "Demonstrate why sync is not backup",
          detail:
            "Delete a file and watch it disappear from the cloud too. This is the moment the distinction becomes concrete: sync faithfully replicates mistakes, ransomware and accidental deletion.",
        },
        {
          step: "Set up backup copy two",
          detail:
            "An external drive, or a second cloud service, holding a scheduled export of your working files. Two different types of medium, because a disk fault and an account problem are different risks.",
        },
        {
          step: "Set up backup copy three, offsite",
          detail:
            "A second cloud provider, or a drive kept somewhere other than where the computer lives. Theft, fire and flood take the building and everything in it, so offsite is not optional.",
        },
        {
          step: "Attach the backup to a schedule you will actually keep",
          detail:
            "Automate it, or tie it to something you already do weekly and put that in your calendar. A backup you must remember to run will be missing on the day you need it.",
        },
        {
          step: "Recover a file from cloud version history",
          detail:
            "Overwrite a document badly, then restore the earlier version. Doing this deliberately while calm is what makes it a skill you have rather than a feature you have heard about.",
        },
        {
          step: "Recover a file from cloud trash",
          detail:
            "Delete something and restore it from trash, noting the retention period. After that window, deletion becomes permanent — which is a fact worth knowing before you need it.",
        },
        {
          step: "Restore a file from the drive backup",
          detail:
            "Prove the second copy works by restoring from it. A backup you have never restored is a hope rather than a plan, and this test takes two minutes.",
        },
        {
          step: "Establish the honest limit",
          detail:
            "Name the situation where recovery is impossible: deleted everywhere, past the retention window, no backup. Knowing that precisely is what motivates keeping the schedule.",
        },
        {
          step: "Write your conventions down",
          detail:
            "The folder list, the naming pattern, the backup schedule and the recovery steps. A system that exists only in your head stops existing the day you are busy or the day someone else needs to help you.",
        },
        {
          step: "Confirm the complete system works end to end",
          detail:
            "Save a new file with the convention into the structure, confirm it syncs, confirm the backup captures it, and confirm you can find it by search a week later. That is the deliverable: a system, not a tidy folder.",
        },
      ],
    },
    practice: {
      title: "Build the system that protects everything else",
      brief:
        "Organise your real files, apply a naming convention that survives a file leaving its folder, build a three-two-one backup on a real budget, and prove you can recover.",
      steps: [
        "Survey your Desktop and Downloads, counting files with uninformative names as your baseline.",
        "Create three or four top-level folders with at most two levels beneath them.",
        "Create a To Sort folder for files you cannot categorise immediately.",
        "Move everything from Desktop and Downloads into the structure in one sitting, using To Sort rather than agonising.",
        "Rename ten files to the convention: date as 2026-03-14, then who or what, then what it is.",
        "Apply the email test to each name — would the filename alone tell you what it is?",
        "Remove every final, new and version number, replacing them with content words.",
        "Move your working files into cloud storage so the cloud is where they live.",
        "Confirm sync works in both directions between laptop and phone.",
        "Delete a file and watch it vanish from the cloud, proving sync is not backup.",
        "Set up backup copy two on an external drive or a second cloud service.",
        "Set up backup copy three offsite, on a second provider or a drive kept elsewhere.",
        "Attach the backup to automation or to a weekly habit recorded in your calendar.",
        "Restore an overwritten file from cloud version history.",
        "Restore a deleted file from cloud trash and note the retention period.",
        "Restore a file from your drive backup to prove the second copy works.",
        "Write down the folder list, naming pattern, backup schedule and recovery steps.",
        "Save a new file with the convention and confirm it syncs, is backed up, and is findable by search.",
      ],
      standard:
        "A baseline count of uninformatively named files; three or four top-level folders with at most two levels and a To Sort inbox; Desktop and Downloads emptied into the structure; ten files renamed with date-first convention, each passing the email test, with no final/new/version wording; working files living in cloud storage with sync verified in both directions; the sync-is-not-backup distinction demonstrated by deleting a file; **three-two-one backup implemented with copy two and an offsite copy three, attached to a schedule that will actually be kept**; recovery demonstrated from cloud version history, cloud trash and the drive backup; the honest limit of recovery stated; conventions written down; and a new file confirmed to sync, be backed up and be findable by search.",
    },
    pitfalls: [
      {
        problem: "Building a deep folder hierarchy nobody can navigate",
        fix: "Three or four top-level folders with at most two levels beneath. Every additional level is another decision at the moment of filing, and effortful filing sends files to the Desktop instead.",
      },
      {
        problem: "Naming files for the folder they are in",
        fix: "Files get attached, downloaded and copied out constantly, and then only the name remains. Apply the email test: would the filename alone tell you what it is?",
      },
      {
        problem: "Using final, new, or version numbers as the distinguishing part",
        fix: "'final_v2_REAL' records your uncertainty, not the content. Use date plus who or what plus what it is, and let version history handle drafts.",
      },
      {
        problem: "Saving locally and uploading occasionally",
        fix: "That leaves the cloud copy stale and the local copy at risk. Invert it: the cloud is where the file lives and the local disk is a cache.",
      },
      {
        problem: "Treating cloud sync as backup",
        fix: "Sync faithfully replicates deletion, overwriting and ransomware. It protects against device failure and nothing else. The most common and most expensive misunderstanding in personal file management.",
      },
      {
        problem: "Having one copy of anything important",
        fix: "Three copies, on two types of medium, with one offsite. Each part covers a failure the others do not, and a single copy can fail unnoticed.",
      },
      {
        problem: "A backup with no schedule",
        fix: "A backup you must remember to run will be missing on the day you need it. Automate it or tie it to an existing weekly habit and put it in the calendar.",
      },
      {
        problem: "Never testing a restoration",
        fix: "A backup you have never restored is a hope rather than a plan. Restore something deliberately while nothing is at stake, from each copy, and note the retention windows.",
      },
    ],
    expertNotes: [
      "Name files so the name survives leaving the folder. Files are attached, downloaded and copied out constantly, and the folder structure you relied on is gone at that moment — the filename is a message to your future self, and most people write nothing.",
      "Use date-first naming in year-month-day order. It is the only date format that sorts chronologically in every file manager without configuration, which is a small detail with a permanent daily payoff.",
      "Sync is not backup, and this is worth internalising before it costs you something. Cloud storage faithfully replicates an accidental deletion or an overwrite, so it protects against device failure and nothing else. You need a separate copy.",
      "Test a restoration deliberately while nothing is at stake. Almost everyone who has done it found something they had assumed about their backup; almost everyone who has not done it finds out during the incident. Two minutes now is cheap.",
    ],
    vocabulary: [
      {
        term: "Shallow structure",
        meaning:
          "A folder hierarchy of three or four top-level folders with at most two levels beneath. Deep trees are not used because filing becomes effortful.",
      },
      {
        term: "To Sort folder",
        meaning:
          "An inbox for files that cannot be categorised immediately, reviewed weekly. Without it, unclear files accumulate on the Desktop permanently.",
      },
      {
        term: "Naming convention",
        meaning:
          "A consistent filename pattern — date as YYYY-MM-DD, then who or what it concerns, then what it is. Its test is whether the name works with no folder context.",
      },
      {
        term: "The email test",
        meaning:
          "Asking whether a filename alone would identify the file if it arrived as an attachment. Files leave their folders constantly, so this is the real standard.",
      },
      {
        term: "Sync versus backup",
        meaning:
          "Sync replicates changes both ways including deletions and overwrites; backup keeps an independent copy. Sync protects against device failure only.",
      },
      {
        term: "Three-two-one principle",
        meaning:
          "Three copies of your data, on two types of medium, with one kept offsite. Each element covers a failure mode the others do not.",
      },
      {
        term: "Version history retention",
        meaning:
          "The period during which earlier versions and deleted files can be recovered. After it, removal becomes permanent.",
      },
      {
        term: "Test restoration",
        meaning:
          "Deliberately restoring a file from each backup copy while nothing is at stake. The only real evidence that a backup is usable.",
      },
    ],
    homework: [
      {
        task: "Reorganise your real files",
        detail:
          "Three or four top-level folders with at most two levels, a To Sort inbox, and Desktop and Downloads emptied into the structure in one sitting. Record how many files had uninformative names before you started.",
      },
      {
        task: "Rename twenty files to your convention",
        detail:
          "Date-first as YYYY-MM-DD, then who or what, then what it is. Apply the email test to each and remove every final, new and version number. Note how much faster search becomes.",
      },
      {
        task: "Implement three-two-one backup",
        detail:
          "Working files in cloud storage, copy two on a drive or second service, copy three offsite — attached to a schedule you will actually keep, recorded in your calendar.",
      },
      {
        task: "Prove you can recover",
        detail:
          "Restore a file from cloud version history, one from cloud trash, and one from your drive backup. Note each retention window and write down the situation in which recovery would be impossible.",
      },
    ],
    rubric: [
      {
        criterion: "Structure",
        passing: "Folders were created.",
        excellent:
          "Three or four top-level folders with at most two levels, a To Sort inbox, and Desktop and Downloads genuinely emptied rather than partially tidied.",
      },
      {
        criterion: "Naming discipline",
        passing: "Some files were renamed.",
        excellent:
          "Date-first YYYY-MM-DD convention applied consistently, each name passing the email test, with no final/new/version wording anywhere.",
      },
      {
        criterion: "Cloud usage",
        passing: "Files are in the cloud.",
        excellent:
          "Cloud is where files live rather than an occasional upload, sync verified in both directions, and the sync-is-not-backup distinction demonstrated rather than merely stated.",
      },
      {
        criterion: "Backup completeness",
        passing: "A backup exists.",
        excellent:
          "Three-two-one implemented with an offsite copy, attached to a schedule that will actually be kept, and each copy verified by restoring from it.",
      },
      {
        criterion: "Recovery capability",
        passing: "Knows where deleted files go.",
        excellent:
          "Has restored from version history, trash and the drive backup, can state each retention window, and knows precisely the situation in which recovery is impossible.",
      },
    ],
    faqs: [
      {
        q: "Is cloud storage enough on its own?",
        a: "No. Sync faithfully replicates deletion, overwriting and ransomware, so it protects against device failure and nothing else. You need an independent second copy and an offsite third — that is what three-two-one means.",
      },
      {
        q: "How much does a proper backup cost?",
        a: "Very little. One external drive plus a second cloud account covers three-two-one for a personal system. The expensive part is not the equipment; it is the schedule, which costs nothing but requires a habit.",
      },
      {
        q: "I have thousands of badly named files. Do I rename them all?",
        a: "No. Rename files as you touch them, and start with the twenty you use most often. A convention applied going forward is worth more than a weekend of retroactive renaming you will abandon halfway through.",
      },
      {
        q: "Can I always recover a deleted file?",
        a: "No, and the limits are worth knowing in advance. Cloud trash and version history have retention windows; after those, and with no separate backup, the file is genuinely gone. That is the argument for the schedule.",
      },
      {
        q: "Why date-first naming rather than putting the date at the end?",
        a: "Because YYYY-MM-DD sorts chronologically in every file manager without configuration, and no other date format does so reliably. It is a small choice with a permanent payoff every time you look at a folder.",
      },
    ],
  },
};
