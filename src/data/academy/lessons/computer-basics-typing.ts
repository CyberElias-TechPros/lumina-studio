import type { SessionLecture } from "../types";

/** Typing & Computer Basics — sessions 3 and 4. */
export const computerBasicsTypingLessonsB: Record<string, SessionLecture> = {
  "files-and-internet": {
    summary:
      "Losing work because you cannot find it is the most common and most avoidable failure in computing. This session builds a file system you can navigate in the dark, then covers the browser, searching properly, and downloading without breaking anything.",
    objectives: [
      "Explain the difference between a file and a folder, and how paths describe location",
      "Create, rename, move, copy and delete files and folders deliberately",
      "Recover a deleted file from the Recycle Bin and understand what deleting really does",
      "Use a USB drive correctly, including ejecting it safely",
      "Navigate a browser: address bar, tabs, back, refresh, bookmarks and history",
      "Search the internet effectively instead of typing whole questions",
      "Download a file safely and recognise an unsafe download",
      "Upload a file to a website and know what uploading means",
    ],
    blocks: [
      {
        heading: "Files, folders and paths",
        body: [
          "A **file** is a single stored item: a document, a photo, a song, a program. A **folder** (also called a directory) is a container that holds files and other folders, which is what lets you organise rather than pile. Every file has a **name** and an **extension** — the part after the last dot — and the extension tells Windows what kind of file it is: .docx is a Word document, .xlsx a spreadsheet, .pdf a fixed-layout document, .jpg and .png images, .mp4 video, .mp3 audio, .zip a compressed archive. Windows often hides extensions by default, which is why two files can look identical and behave differently. Turn them on: File Explorer → View → Show → File name extensions.",
          "A **path** is a file's full address, shown in the address bar at the top of File Explorer: `C:\\Users\\YourName\\Documents\\CEA\\notes.docx`. Read it left to right as a set of nested folders ending in the file. The important drives are **C:** where Windows and your programs live, and whatever letter Windows assigns to an inserted USB drive — usually D: or E:. Understanding paths is what stops the panic of 'I saved it but I cannot find it', because you can always look at the address bar and know exactly where you are.",
        ],
      },
      {
        heading: "The five file operations",
        body: [
          "**Create** a folder with Ctrl+Shift+N inside File Explorer, or right-click → New → Folder. Name it immediately — 'New folder' is how work gets lost. **Rename** with F2 on a selected item, or right-click → Rename; never rename by deleting and retyping the whole name, because F2 lets you edit just the part you want. **Move** by cutting (Ctrl+X) and pasting (Ctrl+V) into the destination, or by dragging. **Copy** with Ctrl+C then Ctrl+V leaves the original in place and puts a duplicate at the destination — and be careful, because copying instead of moving is how you end up with two versions and edit the wrong one.",
          "**Delete** sends an item to the **Recycle Bin**, where it stays until you empty the bin. This is your safety net: right-click the Recycle Bin → Open, find the item, right-click → Restore, and it returns to its original folder. Note the important exception — files deleted from a USB drive, or deleted with Shift+Delete, bypass the Recycle Bin entirely and are gone immediately. And understand what deleting really does: it removes the pointer to the file, not necessarily the data, which is why 'deleted' files can sometimes be recovered and why you should never assume a sensitive file is truly erased just because you deleted it.",
        ],
      },
      {
        heading: "Naming: the habit that saves hours",
        body: [
          'Name files so a stranger could understand them in six months and so they sort correctly. The pattern that works: **date, then subject, then version** — `2026-09-13_CEA-Notes_Session-03.docx`. Dates first in YYYY-MM-DD format sort chronologically in every file manager; putting the day first sorts September after January incorrectly. Avoid spaces if you can, because some websites and systems mangle them in uploads. Never use the characters `\\ / : * ? " < > |` — Windows forbids them and other systems handle them badly.',
          "Then avoid the version-naming trap. `final.docx`, `final2.docx`, `final-FINAL.docx` and `final-real.docx` tell nobody anything. Either use dates, or use v1/v2/v3 consistently, and keep only one current version in the working folder with older ones moved to an `Archive` sub-folder. Build the structure once — a top folder for the year or course, with sub-folders by subject — and use it every single time. A file saved in the right place the first time is a file you never have to search for.",
        ],
      },
      {
        heading: "USB drives and downloads",
        body: [
          "Plug a USB drive in and Windows assigns it a letter and usually announces it. Open File Explorer, find the drive, and copy files to or from it like any other folder. The critical step is **ejecting before removal**: click the USB icon in the taskbar notification area and choose Eject, wait for the confirmation, then pull it out. Windows caches writes in memory, so a copy that appears finished may not have reached the drive yet — pulling early is how files arrive corrupted or missing. If Windows says the drive is in use, close whatever program is touching it rather than forcing removal.",
          "**Downloading** is copying a file from the internet to your machine; the browser puts it in your Downloads folder by default and shows progress at the top or bottom of the window. Download safely by checking three things before you click: is the site the one you intended (look at the address, not the page design), does the link say what you expect, and does the file extension match what you asked for. A file you wanted as .pdf arriving as .exe or .zip is a warning — executables run code on your machine, and that is how malware arrives. Never download from a pop-up you did not ask for, and treat any file that arrives as an attachment from someone you do not know as hostile until proven otherwise.",
          "**Uploading** is the reverse: sending a file from your machine to a website. Every upload control works the same way — click Choose File or Browse, navigate to the file, select it, then confirm. Know your file sizes, because Nigerian mobile data is expensive and many services reject files above a limit. If a form rejects your upload, the cause is almost always size or format, and the fix is to compress the file or export it in an accepted format.",
        ],
      },
      {
        heading: "The browser and searching properly",
        body: [
          "A **browser** is the program that displays websites — Chrome, Edge, Firefox, Safari, Opera. Know its parts. The **address bar** at the top shows where you are and is where you type a web address; it is also the search box in modern browsers. **Tabs** let you hold several pages at once — Ctrl+T opens one, Ctrl+W closes it, Ctrl+Tab switches, and Ctrl+Shift+T reopens one you closed by accident. **Back** and **Forward** move through your history, **Refresh** (F5) reloads the current page, and the **bookmark** or star icon saves a page so you can return without searching again. Your **history** (Ctrl+H) lists everywhere you have been, which is how you find a page you read yesterday and did not save.",
          "Then the skill most people never learn: searching. A search engine is a keyword matcher, not a person, so typing 'please how can I find out what time the CEA class starts on Saturday' works worse than `CEA Port Harcourt class timetable`. Use specific nouns, drop the polite filler, add a location or a year when it matters, and put an exact phrase in quotation marks. Add `-` before a word to exclude it. If the first page of results is unhelpful, change your words rather than scrolling — the tenth result for a bad query is worse than the first result for a better one. And when you need something from an official source, search for the organisation's name and go to its own site rather than trusting a third-party page that may be outdated.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor builds a folder structure live, deliberately loses a file and recovers it, then demonstrates a safe download and a search that gets refined three times.",
      steps: [
        {
          step: "Turn on file extensions",
          detail:
            "File Explorer → View → Show → tick File name extensions. Show a .docx and a .pdf with the same base name and explain why hiding extensions causes confusion.",
        },
        {
          step: "Build a folder structure",
          detail:
            "In Documents, create CEA-2026, then inside it Week-01 and Week-02. Narrate the naming pattern — date, subject, version — as each folder is created.",
        },
        {
          step: "Create, rename and move files",
          detail:
            "Create three text files in Week-01. Use F2 to rename one, changing only part of the name. Cut and paste one into Week-02. Copy another so a duplicate exists, and point out the danger of having two versions.",
        },
        {
          step: "Delete and recover",
          detail:
            "Delete a file, open the Recycle Bin, restore it, and show that it returned to its original folder. Then explain that Shift+Delete and USB deletions skip the bin entirely.",
        },
        {
          step: "Read a path aloud",
          detail:
            "Click into a nested file and read the address bar left to right, naming each level. Then click each part of the address bar to jump up a level.",
        },
        {
          step: "Use a USB drive correctly",
          detail:
            "Insert the drive, note the letter Windows assigns, copy a file onto it, then eject from the notification area and wait for the confirmation before removal. Show what Windows says if you try to eject while a file is open.",
        },
        {
          step: "Browser basics",
          detail:
            "Open three tabs with Ctrl+T, switch with Ctrl+Tab, close one with Ctrl+W and reopen it with Ctrl+Shift+T. Bookmark a page, then find it again through Ctrl+H history.",
        },
        {
          step: "Refine a search three times",
          detail:
            "Search a vague question and show the poor results. Strip it to keywords, then add a year, then add an exact phrase in quotes. Compare the first results at each stage and discuss what changed.",
        },
        {
          step: "Download safely",
          detail:
            "Download a real PDF from an official site, checking the address first. Then show what a suspicious download looks like — a .exe offered where a document was promised — and explain why that is refused.",
        },
        {
          step: "Upload a file",
          detail:
            "Use a form's Choose File control to select and upload the downloaded PDF. Show where the file size is displayed and explain the common rejection reasons.",
        },
      ],
    },
    practice: {
      title: "Find it, fix it, fetch it",
      brief:
        "A timed practical: build a folder structure, deliberately lose and recover a file, transfer files via USB with correct ejection, then find and download three specific pieces of information from the internet using refined searches.",
      steps: [
        "In Documents, create CEA-2026 with Week-01 and Week-02 sub-folders.",
        "Create five text files in Week-01 named with the date-subject-version pattern.",
        "Move two to Week-02 and copy one back, then delete the copy.",
        "Delete one file permanently to the Recycle Bin, then restore it.",
        "Copy two files to a USB drive and eject it safely before removal.",
        "Open three browser tabs and find: the current exchange rate from an official source, the opening hours of a named Port Harcourt business, and one news item from today.",
        "Write down the search terms you actually used for each, including any you abandoned.",
        "Download one PDF from an official site, checking the address before clicking.",
        "Upload that PDF back to any form that accepts a file, and confirm it succeeded.",
        "Save your search notes into your Week-02 folder.",
      ],
      standard:
        "Every file correctly named and located, the deleted file recovered without help, the USB ejected safely, all three pieces of information found from credible sources within the time limit, and the search notes show at least one query that was refined rather than repeated.",
    },
    pitfalls: [
      {
        problem: "You saved a file and now cannot find it",
        fix: "Look at the address bar of the folder you are in, or use File Explorer's search box. In future, check the location shown in the Save dialog before clicking Save — most 'lost' files are sitting in Downloads or on the Desktop.",
      },
      {
        problem: "You have two versions of a file and do not know which is current",
        fix: "This is the copy-instead-of-move problem. Sort by Date modified, keep the newest, move older versions into an Archive folder, and use dates in filenames so the ordering is visible without opening anything.",
      },
      {
        problem: "You pulled a USB drive out and the files are missing or corrupted",
        fix: "You removed it before the cached writes reached the drive. Always eject from the notification area and wait for the confirmation. If the drive now asks to be formatted, do not format it — try it in another machine first.",
      },
      {
        problem: "Your searches return nothing useful",
        fix: "You are typing a sentence. Strip it to specific keywords, add a year or a location, and put exact phrases in quotes. If results are still poor, change your vocabulary — different people call the same thing different names.",
      },
      {
        problem: "You downloaded something and your machine started behaving oddly",
        fix: "You ran an executable you did not intend to. Do not click anything else in the window. Disconnect from the internet, then run a scan with Windows Defender (Start → search 'Virus & threat protection'). Session four covers this in full.",
      },
      {
        problem: "An upload keeps failing",
        fix: "Almost always size or format. Check the file size against the site's stated limit, and check the accepted extensions. A photo straight from a phone is often 5–10MB when the limit is 2MB — compress or resize it rather than retrying.",
      },
    ],
    expertNotes: [
      "Adopt one folder structure and never deviate from it. The structure matters less than the consistency: if you always know where a file belongs, you never have to decide, and you never have to search. Most people's file chaos is not a system failure, it is a habit failure.",
      "Search with the vocabulary of the person who wrote the answer, not your own. If you are looking for a Nigerian government process, use the official term rather than how you would describe it to a friend — and add the year, because procedures change and old pages stay online forever.",
      "Bookmarked is better than remembered, and written down is better than bookmarked. Keep a single text file of the addresses you use weekly; bookmarks get lost when you switch browsers or machines, and a text file can be copied anywhere.",
      "Check the address bar before you trust a page, not the page's appearance. A convincing design proves nothing. The address is the only thing on a webpage that is hard to fake, and reading it takes two seconds.",
    ],
    vocabulary: [
      {
        term: "File extension",
        meaning:
          "The letters after the last dot in a filename, identifying the file type. Turn them on in File Explorer's View menu.",
      },
      {
        term: "Path",
        meaning:
          "A file's full address showing every folder from the drive down to the file, displayed in the address bar.",
      },
      {
        term: "Recycle Bin",
        meaning:
          "Where deleted files wait until the bin is emptied. Files deleted from USB drives or with Shift+Delete skip it entirely.",
      },
      {
        term: "Eject",
        meaning:
          "Telling Windows to finish writing and release a removable drive so it can be removed without corrupting files.",
      },
      {
        term: "Download",
        meaning:
          "Copying a file from the internet to your machine, normally into the Downloads folder.",
      },
      {
        term: "Upload",
        meaning:
          "Sending a file from your machine to a website through a Choose File or Browse control.",
      },
      {
        term: "Tab",
        meaning:
          "An additional page held open in the same browser window. Ctrl+T opens, Ctrl+W closes, Ctrl+Shift+T reopens.",
      },
      {
        term: "Search query",
        meaning:
          "The words you give a search engine. Specific keywords outperform full sentences every time.",
      },
    ],
    homework: [
      {
        task: "Build your permanent folder structure",
        detail:
          "Create the folder tree you will actually use for the next year — by year or course, then by subject — and move your existing loose files into it. Report how many files you had sitting on the Desktop.",
      },
      {
        task: "Rename twenty files properly",
        detail:
          "Take twenty badly named files and rename them with the date-subject-version pattern using F2. Note how much faster finding things becomes.",
      },
      {
        task: "Practise three refined searches",
        detail:
          "Pick three questions you genuinely need answers to. For each, write your first search, the result quality, and the refined search that worked. Bring the comparisons to class.",
      },
      {
        task: "Download and upload a real file",
        detail:
          "Download a document from an official source, verify its size and extension, then upload it somewhere that accepts files. Confirm both directions worked before you finish.",
      },
    ],
    rubric: [
      {
        criterion: "File management",
        passing: "Creates, renames, moves, copies and deletes correctly.",
        excellent:
          "Uses a consistent naming pattern, understands paths, and recovers a deleted file from the Recycle Bin unaided.",
      },
      {
        criterion: "Removable media",
        passing: "Transfers files to and from a USB drive.",
        excellent: "Ejects safely every time and can explain why premature removal corrupts files.",
      },
      {
        criterion: "Browser control",
        passing: "Opens, switches and closes tabs; uses back, refresh and bookmarks.",
        excellent:
          "Uses keyboard tab control, history and bookmarks as a working system rather than by accident.",
      },
      {
        criterion: "Searching",
        passing: "Finds the requested information.",
        excellent:
          "Demonstrably refines queries, uses quotes and exclusions, and judges source credibility rather than taking the first result.",
      },
      {
        criterion: "Safe downloading",
        passing: "Downloads a file and locates it afterwards.",
        excellent:
          "Checks the address and the file extension before downloading and can identify a suspicious download.",
      },
    ],
    faqs: [
      {
        q: "I deleted something important and emptied the Recycle Bin. Is it gone?",
        a: "Not necessarily. Deleting removes the pointer, not always the data, so recovery software can sometimes retrieve it — but only if you stop writing to that disk immediately, because new data overwrites the space. Stop using the machine and ask for help rather than installing several recovery tools and making it worse.",
      },
      {
        q: "Why does Windows hide file extensions?",
        a: "To make filenames look cleaner, on the assumption that the icon already tells you the type. It is a convenience that costs you information, and it is genuinely dangerous because it lets a file called invoice.pdf.exe appear as invoice.pdf. Turn extensions on and leave them on.",
      },
      {
        q: "Which browser should I use?",
        a: "Whichever one you will keep updated. Chrome, Edge and Firefox are all fine and all free. What matters more is that you update it, do not install random extensions, and know how to use tabs, bookmarks and history — those skills are identical in every browser.",
      },
      {
        q: "How do I know a website is genuine?",
        a: "Read the address, not the design. Check that the domain is the organisation's real one and not a near-miss spelling, that it begins with https, and that there is no strange text before or after the real name. A padlock icon means the connection is encrypted; it does not mean the site is trustworthy. Session four goes through this properly.",
      },
      {
        q: "My Downloads folder is full of things I do not recognise",
        a: "Normal — every browser download lands there and nobody cleans it. Sort by date, delete what you do not need, and move what you do into your proper folder structure. Make it a monthly habit; an unmanaged Downloads folder is where people lose files and where unwanted programs hide.",
      },
    ],
  },

  "digital-independence": {
    summary:
      "The final session, and the one that makes everything else usable. You create and use a real email account with attachments, fill in online forms, join an online meeting, store files in the cloud, and learn to recognise the scams that cost Nigerians money every day — then you prove independence by doing it all unaided.",
    objectives: [
      "Create an email account with a strong password and a recovery option",
      "Compose, send, reply to and organise email, including attachments both ways",
      "Fill in an online form correctly and handle the errors it throws back",
      "Join and participate in an online meeting, including sharing your screen",
      "Store and share files using cloud storage",
      "Create passwords that resist guessing and explain why reuse is dangerous",
      "Recognise phishing, advance-fee and fake-support scams on sight",
      "Complete a full set of computer tasks independently, unaided",
    ],
    blocks: [
      {
        heading: "Creating and using email properly",
        body: [
          "Email is still the identity layer of the internet: almost every account you will ever create is tied to one, and password recovery runs through it. Create one with a provider you trust — Gmail and Outlook are the practical choices in Nigeria because they are free, reliable and work well on slow connections. Use a professional address built from your real name, such as `adebayo.okafor@gmail.com`, because `sweetbaby2019@` on a job application costs you credibility before anyone reads the CV. Set a **recovery email and phone number** during setup; without one, a forgotten password means a lost account and every account attached to it.",
          "The parts of an email: **To** is the recipient, **Cc** copies others visibly, **Bcc** copies others invisibly — use Bcc when emailing a group who do not know each other, so you do not hand out everyone's address. The **subject line** is the most important field you write and the one most people waste; 'Application for Data Entry Position — Adebayo Okafor' will be read, while 'Hello' will not. **Attachments** are added with the paperclip icon, and you should attach before you write the body so you do not send without them. To save a received attachment, open the message and use the download or Save option, then note where it lands — usually your Downloads folder.",
          "Then organisation, because an inbox you cannot search is an inbox you have lost. Use **labels or folders** to file by subject, **archive** rather than delete for anything you may need, and **search** rather than scroll — the search box finds any message you have ever received in seconds. Learn the difference between Reply (sender only), Reply All (everyone, use sparingly) and Forward. And write for the reader: a greeting, one clear purpose, the action you need, and a sign-off. Four short paragraphs beat one long one, and a request buried in the middle of paragraph three does not get actioned.",
        ],
      },
      {
        heading: "Online forms, meetings and cloud storage",
        body: [
          "**Online forms** are how you apply for things, and most failures are mechanical rather than personal. Required fields are usually marked with an asterisk and the form will refuse to submit until they are complete — read the error message, it names the problem. Enter dates and phone numbers in the exact format requested, because validation is often strict about leading zeros and separators. Use **Tab** to move between fields, which is far faster than clicking each one. Where a form asks you to upload a document, check the accepted format and size limit first. And before submitting anything important, copy your answers into a text file — forms time out, connections drop, and re-typing a long application from memory is a miserable experience.",
          "**Online meetings** on Zoom or Google Meet follow the same pattern: join from the link, allow microphone and camera access when prompted, and stay muted until you speak. Know the three controls that matter — mute and unmute, camera on and off, and **share screen** for showing your work. Test your microphone and camera in the settings before the meeting, not during it. If audio fails, leave and rejoin before troubleshooting anything else, because that fixes it most of the time. Use a stable connection or move closer to the router, and turn off video if the connection is poor — audio matters more.",
          "**Cloud storage** — Google Drive, OneDrive, Dropbox — keeps your files on someone else's servers so they survive a lost, stolen or dead machine, and lets you open them from anywhere. Upload by dragging files into the folder in your browser, organise them into folders exactly as you would locally, and **share** by generating a link with the permission you choose: view only, comment, or edit. Understand the sharing setting every time, because 'anyone with the link' is public. The free tiers are enough for documents — 15GB on Google covers a great deal of text — and cloud storage is the single cheapest protection against the most common way Nigerians lose work.",
        ],
      },
      {
        heading: "Passwords: the one habit that matters most",
        body: [
          "A password's job is to resist guessing, and length does that better than complexity. 'CorrectHorseBatteryStaple' style passphrases — four unrelated words — are far harder to crack than 'P@ssw0rd1' and far easier to remember. Aim for at least twelve characters, never use your name, birthday, phone number or any word tied to you, and never use the same password twice. Reuse is the actual danger: when a small site you registered on years ago is breached, attackers try that email-and-password pair everywhere else, and your bank and email fall with it.",
          "The practical answer is a **password manager** — Bitwarden and KeePass are free — which generates and stores a unique long password for every site behind one master passphrase. You then remember exactly one thing. Enable **multi-factor authentication (MFA)** on your email first, since email is the key to everything else; MFA asks for a second factor, usually a code from an app, so a stolen password alone is useless. And never share a verification code with anyone, ever — no legitimate organisation will ever ask you for one, and that request is the single most reliable sign of a scam in Nigeria today.",
        ],
      },
      {
        heading: "Recognising the scams that actually work",
        body: [
          "**Phishing** is a message pretending to be from an organisation you trust, pushing you to click a link and enter credentials. The tells are consistent: urgency ('your account will be closed within 24 hours'), a generic greeting, spelling errors, and most reliably an address that is not the real one — `secure-bank-verify.com` instead of your bank's actual domain. Never click through to a login; type the address yourself or use the official app.",
          "**Advance-fee fraud** is the classic Nigerian scam in both directions: a job offer requiring you to pay for training or a 'verification fee', a scholarship requiring a processing payment, a buyer overpaying and asking you to forward the difference. The rule is absolute — legitimate opportunities pay you, they do not ask you to pay first. **Fake support** arrives as a pop-up or a call claiming your computer is infected and offering to fix it for a fee, sometimes asking you to install remote-access software; that software hands them your machine. Real companies do not cold-call about your computer.",
          "Then the general defences. Keep your operating system and browser updated, because updates close the holes attackers use. Do not install software from pop-ups. Read every permission a phone app requests and refuse ones that make no sense — a torch app does not need your contacts. Back up your important files to cloud storage so that a successful attack costs you money rather than everything. And slow down: nearly every successful scam depends on you acting quickly out of fear or excitement, which is why the single best defence is refusing to act within the first five minutes.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor creates an email account live, sends and receives an attachment, joins a meeting and shares a screen, uploads to cloud storage, then works through real scam examples with the class identifying the tells.",
      steps: [
        {
          step: "Create an email account",
          detail:
            "Walk through signup with a professional name-based address. Show the password strength indicator, deliberately set a recovery email and phone number, and explain why skipping recovery locks you out permanently.",
        },
        {
          step: "Send an email with an attachment",
          detail:
            "Compose with a specific subject line, attach the document from session three, write a four-line professional body, and send. Show the sent folder afterwards.",
        },
        {
          step: "Receive, reply and download an attachment",
          detail:
            "Reply to a message, then download its attachment and confirm where it landed. Show the difference between Reply and Reply All, and explain when Reply All causes problems.",
        },
        {
          step: "Organise the inbox",
          detail:
            "Create two labels or folders, file messages into them, archive one, and find a specific old message using search rather than scrolling.",
        },
        {
          step: "Fill an online form",
          detail:
            "Complete a real registration form using Tab to move between fields. Deliberately leave a required field blank to show the error message, then read it and fix it. Upload a document where asked.",
        },
        {
          step: "Join an online meeting",
          detail:
            "Open a meeting link, grant microphone and camera permission, test both in settings, mute and unmute, then share the screen. Show what the other participants see.",
        },
        {
          step: "Upload and share from cloud storage",
          detail:
            "Drag a file into Google Drive, organise it into a folder, generate a share link, and show the permission options — emphasising that 'anyone with the link' means public.",
        },
        {
          step: "Set up a password manager",
          detail:
            "Install a free password manager, generate a long random password for one account, and show the master passphrase concept. Explain why remembering one strong secret beats remembering twenty weak ones.",
        },
        {
          step: "Enable MFA on email",
          detail:
            "Turn on two-step verification using an authenticator app, and show the backup codes. Explain that email is the master key and must be protected first.",
        },
        {
          step: "Dissect real scams",
          detail:
            "Show four safe, reproduced examples — a phishing email, an advance-fee job offer, a fake support pop-up, and a message requesting a verification code. The class identifies the tell in each before the instructor confirms it.",
        },
      ],
    },
    practice: {
      title: "Final practical: independent task set",
      brief:
        "You perform a full sequence of computer tasks alone, with the instructor observing and not helping. This is the deliverable for the course — demonstrated independence, not a written test.",
      steps: [
        "Power on the machine, log in and open the programs you need.",
        "Create a folder named with your surname and today's date.",
        "Create a document, write four sentences about yourself, and save it into that folder with a correct filename.",
        "Attach that document to an email with a clear subject line and send it to the instructor's address.",
        "Download an attachment from the reply and save it into the same folder.",
        "Copy both files to a USB drive and eject it safely.",
        "Upload the document to cloud storage and generate a view-only share link.",
        "Fill in a short online form, handling any validation errors, and submit it.",
        "Join an online meeting link, unmute, say your name, share your screen for ten seconds, then leave.",
        "Identify the tells in three scam examples shown to you and state what you would do in each case.",
        "Shut the machine down correctly.",
      ],
      standard:
        "Every task completed without prompting, filenames and subject lines professionally formed, the USB ejected safely, the share link set to view-only rather than edit, and all three scams correctly identified with a stated response. Hesitation is acceptable; asking for the step is not.",
    },
    pitfalls: [
      {
        problem: "You forget your email password and have no recovery option",
        fix: "Set a recovery email and phone number the day you create the account. If you already have an account without one, add them now — this is the most common irreversible loss in this whole course.",
      },
      {
        problem: "You send an email and realise the attachment is missing",
        fix: "Attach first, then write. Most email clients now warn you if your message mentions an attachment but has none, but the habit is what actually prevents it.",
      },
      {
        problem: "You used Reply All and embarrassed everyone",
        fix: "Reply goes to the sender only; Reply All includes every recipient. Default to Reply and only use Reply All when everyone genuinely needs your response.",
      },
      {
        problem: "A form keeps rejecting what you typed",
        fix: "Read the error — it names the field and the reason. Usually it is a format problem: a phone number with a leading zero or spaces, a date in the wrong order, or a required tick box you missed.",
      },
      {
        problem: "Nobody can hear you in the meeting",
        fix: "Check the microphone is unmuted in the meeting and selected as the input device in settings. If that is correct, leave and rejoin — that resolves most audio failures immediately.",
      },
      {
        problem: "You shared a cloud link and strangers can edit the file",
        fix: "Check the permission every time you share. 'Anyone with the link can edit' is public write access. Set view-only unless you specifically need collaboration.",
      },
      {
        problem: "You use one password everywhere",
        fix: "This is the most dangerous habit in the course. A breach at any small site hands attackers your email and banking. Move to a password manager and enable MFA on your email this week.",
      },
    ],
    expertNotes: [
      "Protect your email before anything else, because it is the recovery path for every other account you own. Strong unique password, MFA enabled, recovery contact set. Do those three things and you are ahead of most working professionals.",
      "Never share a one-time verification code, with anyone, for any reason, no matter how official they sound. Banks, telcos, Google and the police will never ask for one. That single rule blocks a large share of the fraud targeting Nigerians.",
      "Back up to cloud storage the same day you create something important. The failure mode is not dramatic — a phone goes into water, a laptop is stolen, a disk dies on a Tuesday — and the only reliable protection is a copy that is not on the machine.",
      "When anything creates urgency, stop. Every effective scam is built on making you act before you think. Waiting five minutes costs nothing and defeats almost all of them, because the pressure cannot survive a pause.",
    ],
    vocabulary: [
      {
        term: "Attachment",
        meaning:
          "A file sent with an email. Attach before writing the body so you do not send without it.",
      },
      {
        term: "Cc / Bcc",
        meaning:
          "Copy others visibly, or invisibly. Use Bcc for groups who do not know each other.",
      },
      {
        term: "Cloud storage",
        meaning:
          "Files kept on remote servers, accessible anywhere and surviving loss of your device.",
      },
      {
        term: "Share link permission",
        meaning:
          "The access level attached to a shared file — view, comment or edit. Check it every time.",
      },
      {
        term: "Passphrase",
        meaning:
          "A password built from several unrelated words. Length resists guessing better than symbols do.",
      },
      {
        term: "Password manager",
        meaning:
          "Software that generates and stores a unique password per site behind one master passphrase.",
      },
      {
        term: "Multi-factor authentication",
        meaning:
          "A second verification step beyond the password, making a stolen password alone useless.",
      },
      {
        term: "Phishing",
        meaning:
          "A message impersonating a trusted organisation to steal credentials. Recognisable by urgency and a wrong address.",
      },
    ],
    homework: [
      {
        task: "Secure your email account",
        detail:
          "Set a strong unique password, add a recovery email and phone number, and enable two-step verification. Save the backup codes somewhere safe offline. This is the single highest-value thirty minutes in the course.",
      },
      {
        task: "Install a password manager",
        detail:
          "Set up a free password manager, move at least five accounts into it with generated passwords, and change each one so no two are alike.",
      },
      {
        task: "Back up your important files",
        detail:
          "Upload everything you would be upset to lose to cloud storage, organised into folders. Note how much space you used and how much remains.",
      },
      {
        task: "Report three scams you have received",
        detail:
          "Write down three scam messages or calls you have personally received, identify the tell in each, and say what you did or would do. Bring them to the final session — real examples teach the class more than any slide.",
      },
    ],
    rubric: [
      {
        criterion: "Email competence",
        passing: "Creates an account, sends and receives with attachments.",
        excellent:
          "Professional address and subject lines, recovery contacts set, inbox organised with labels, and search used rather than scrolling.",
      },
      {
        criterion: "Online tasks",
        passing: "Completes a form, joins a meeting and uploads a file.",
        excellent:
          "Handles validation errors calmly, tests audio and camera before joining, and sets share permissions deliberately.",
      },
      {
        criterion: "Security practice",
        passing: "Creates a strong password and knows not to reuse it.",
        excellent:
          "Uses a password manager, has MFA enabled on email, and can explain why reuse is the real danger.",
      },
      {
        criterion: "Scam recognition",
        passing: "Identifies the obvious scam examples.",
        excellent:
          "Identifies the tell in each example, states the correct response, and can explain why urgency is the mechanism.",
      },
      {
        criterion: "Independence",
        passing: "Completes the practical with occasional hesitation.",
        excellent:
          "Completes every task unaided, in order, and explains what they are doing while doing it.",
      },
    ],
    faqs: [
      {
        q: "Which email provider should I use?",
        a: "Gmail or Outlook. Both are free, reliable on slow Nigerian connections, well supported on every device, and neither will disappear. Whichever you choose, create the account in your real name and set recovery contacts immediately.",
      },
      {
        q: "Is cloud storage safe? Could someone read my files?",
        a: "Files are stored encrypted and access requires your account credentials, so the practical risk is your password being weak rather than the provider being broken. The bigger real-world risk is sharing a link with edit access by mistake. For genuinely sensitive documents, keep the master copy offline as well.",
      },
      {
        q: "I received a message saying my bank account is blocked and I must click a link. What do I do?",
        a: "Nothing. Do not click. Close the message, then open your banking app or type your bank's address yourself and check there. If the concern is real it will be visible in your actual account. Banks do not resolve account problems through emailed links, and urgency is the giveaway.",
      },
      {
        q: "Someone called offering to fix my computer remotely. Is that legitimate?",
        a: "Almost certainly not. No reputable company cold-calls to tell you your computer has a problem. Never install remote-access software at a stranger's request — it hands them full control of your machine, including your banking sessions. Hang up.",
      },
      {
        q: "I am finished with the course. What should I do next?",
        a: "Pick the course that matches what you want to be able to do. Microsoft Office if you need documents and spreadsheets for work, Data Entry if you want paid data work, Graphic Design or Content Creation for visual work, Web Design if you want to build websites. Keep the fifteen-minute daily typing drill going regardless — it makes every other course faster.",
      },
    ],
  },
};
