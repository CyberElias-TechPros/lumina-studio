export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "figure"; src: string; alt: string; caption: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  series: string;
  order: number;
  author: string;
  date: string;
  cover: string;
  coverAlt: string;
  body: BlogBlock[];
};

const p = (text: string): BlogBlock => ({ type: "p", text });
const h2 = (text: string): BlogBlock => ({ type: "h2", text });
const ul = (items: string[]): BlogBlock => ({ type: "ul", items });
const fig = (src: string, alt: string, caption: string): BlogBlock => ({
  type: "figure",
  src,
  alt,
  caption,
});

const SERIES = "Computer skills from scratch";
const AUTHOR = "Cyber Elias Academy";
const DATE = "2026-09-19";

export const blogPosts: BlogPost[] = [
  {
    slug: "sitting-down-at-a-computer",
    title: "Sitting down at a computer for the first time",
    excerpt:
      "What the box in front of you actually is, how to wake it, and how to move the pointer without fear. The first hour, explained as if someone is sitting beside you.",
    series: SERIES,
    order: 1,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/computer-desk.jpg",
    coverAlt: "A learner sitting at a wooden desk in front of a desktop computer.",
    body: [
      p(
        "Most people who say they cannot use a computer are not stupid. They were never given a quiet hour with someone who would name the parts out loud. A phone is a computer you already trust because it lived in your pocket first. A desktop is the same idea, only larger, slower to start, and honest about its pieces. This lesson is that quiet hour.",
      ),
      p(
        "Picture a wooden desk, a black screen, a keyboard that looks like a typewriter, and a small plastic oval with a wire. That oval is the mouse. The tall box under the desk, or the slim slab of a laptop, is the machine itself. The screen is not the computer. It is a window. Until you press the power button, the window is dark because nothing is happening behind it.",
      ),
      fig(
        "/images/blog/computer-desk.jpg",
        "A first-time learner at a simple desk facing a desktop computer.",
        "The first sitting. The machine is off until you press the round button on the tower or the laptop hinge. Nothing is broken. It is waiting.",
      ),
      h2("Name the four things in front of you"),
      p(
        "Hold the names in your mouth as you look. The computer — tower or laptop — stores work and does the thinking. The monitor shows you what the computer is thinking. The keyboard is how your fingers send letters and commands. The mouse is how your hand points. If any one of those four is unplugged, the sitting will feel like a dead room. Check the cables at the back once, the way you check that a generator is fuelled before you blame the house.",
      ),
      p(
        "On a laptop the four things are already joined. You still treat them as four jobs. The screen can be too dark: look for a brightness key or a small sun symbol. The keyboard can be set to type in CAPITALS because Caps Lock is on — a tiny light, often on the key itself, will tell you. The mouse on a laptop is the trackpad, the smooth rectangle below the keys. Rest one finger on it and slide. The arrow on the screen should move. If it does not, the machine is still sleeping.",
      ),
      h2("Waking the machine"),
      p(
        "Find the power button. It is a circle broken by a vertical line, or a plain round button. Press it once and take your finger away. Do not hold it. Holding it for several seconds is how you force the machine to shut down, which is a different act. You should hear a fan, see a manufacturer's logo, then a lock screen or a desktop. That wait can be twenty seconds. Sit through it. Tapping the button again will only confuse it.",
      ),
      p(
        "If a box asks for a password and this is not your computer, stop. Ask the owner. Guessing is how people lock themselves out. If it is your computer and you have not set a password yet, there may be a button that says Sign in or a user picture you can click. Click once. Wait. The desktop — a picture, some small icons, a bar along the bottom or the top — is the table you will work on. Everything you open later will sit on that table as a window.",
      ),
      h2("The pointer is your finger"),
      p(
        "Move the mouse on the desk. Watch the small arrow on the screen. That arrow is called the pointer. It is your finger, drawn. You do not need to lift the mouse like a stamp. Keep the heel of your hand on the desk and slide. If you run out of desk, pick the mouse up, set it back in the middle, and continue. The pointer stays where you left it while the mouse is in the air. That one fact saves people months of frustration.",
      ),
      fig(
        "/images/blog/mouse-hand.jpg",
        "A right hand resting on a computer mouse on a wooden desk.",
        "Rest, do not grip. The index finger sits on the left button. A single press is a click. Two presses close together is a double-click, which opens things.",
      ),
      p(
        "A click is one press of the left button, then release. Aim the pointer at an icon — a small picture with a name under it — and click once. The icon should change colour. That means you have selected it, the way you would rest a finger on a sheet of paper before picking it up. A double-click is two clicks close together on the same spot. That is how you open something. If nothing happens, you paused too long between the clicks. Try again, quicker, without moving the mouse in between.",
      ),
      p(
        "The right button is a separate language. One right-click on an icon opens a short menu of extra actions: Open, Rename, Delete. You do not need those yet. Know they exist so that a menu appearing does not feel like an error. Click anywhere empty on the desktop to close it. Nothing you have done so far can break the machine. A computer is not a glass cup. Clicking is not pouring water on the floor.",
      ),
      h2("The first thing you will type"),
      p(
        "Look at the keyboard. The letters are not in ABC order. They are in an old layout called QWERTY, named for the first six letters on the top row of letters. You do not have to understand why. Find the key that says Enter or Return — usually a wide key on the right. That key means “I am done with this line.” Find Backspace or a left-pointing arrow — that key rubs out the letter behind the blinking line. Find the long bar at the bottom. That is Space. Those three keys, plus the letters of your name, are enough for the first sitting.",
      ),
      ul([
        "Open a blank page: on Windows, click the Start button (four small squares, bottom-left), type the word Notepad, press Enter. On a Mac, press Command and Space, type TextEdit, press Enter.",
        "Click once inside the white page so a blinking line appears. That line is the cursor. It is where the next letter will land.",
        "Type your full name, slowly. If a letter is wrong, press Backspace. If you need a space, press the long bar.",
        "Look at what you wrote. That is your first file, even if you have not saved it yet. Close the window with the X. If it asks whether to save, choose Don't Save for now. Saving is the next lesson.",
      ]),
      h2("What this hour was for"),
      p(
        "You learned four names, one button, one pointer, and three keys. That is the whole machine, reduced to what a person actually does with their hands. Tomorrow you will put work into folders so it does not vanish. Tonight, if you can, sit down again for ten minutes and only move the pointer. Aim at icons. Click once. Click twice. Right-click and dismiss the menu. The fear leaves through the hands, not through a speech.",
      ),
      p(
        "If the screen stayed black, check the monitor's own power light, then the wall socket, then the cable at the back. If the pointer did not move, turn the mouse over: a red or blue light should be on. If there is no light, the mouse is unplugged or the battery is dead. These are household problems, not computer science. Treat them as you would a lamp that will not light.",
      ),
    ],
  },
  {
    slug: "files-and-folders",
    title: "Where your work lives: files and folders",
    excerpt:
      "A file is a sheet of paper. A folder is an envelope. The desktop is the table. Once you can see the room this way, nothing you type has to disappear again.",
    series: SERIES,
    order: 2,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/folders-screen.jpg",
    coverAlt: "A computer screen showing folders named Documents, Pictures and Desktop.",
    body: [
      p(
        "The first time a document vanishes, people blame themselves. They typed a letter, the light went, and in the morning the page was gone. What actually happened is simpler: the work lived only in the window, like a letter still in the typewriter. Closing the window without saving is throwing the sheet away. Saving is putting the sheet into an envelope and writing a name on it. This lesson is the envelope.",
      ),
      p(
        "A file is one complete thing: a letter, a photograph, a song, a filled form. It has a name and, after a dot, a short type — .docx for a Word document, .pdf for a print-ready page, .jpg for a picture. You do not need to memorise types. You need to notice the name. “Document (3)” tells you nothing next month. “Chidinma-JAMB-2026” will still make sense when the fan is off and you are hunting.",
      ),
      fig(
        "/images/blog/folders-screen.jpg",
        "File explorer open on a computer, with Documents, Pictures and Desktop folders visible.",
        "This window is a filing cabinet. Each yellow icon is a folder. Double-click to open it. The path along the top tells you which drawer you are in.",
      ),
      h2("The room inside the machine"),
      p(
        "When you open File Explorer on Windows (the yellow folder on the taskbar) or Finder on a Mac, you are walking into a house. Desktop is the table by the door — useful for things you are holding today, a mess if you leave everything there. Documents is a drawer for writing. Pictures is a drawer for photographs. Downloads is the mat where the internet drops parcels. If you never move parcels off the mat, you will one day have three files called invoice.pdf and no idea which one is real.",
      ),
      p(
        "A folder is an envelope you can put envelopes inside. You might make a folder called School, and inside it folders called 2026 and 2027. Inside 2026, a folder called Fees. That is not fussiness. That is how a person finds a receipt in March without opening forty files. To make a folder: right-click on an empty space in the window, choose New, then Folder. Type the name immediately, while it is still highlighted, and press Enter.",
      ),
      h2("Save, then Save As"),
      p(
        "Write two words on a blank page. Look at the top of the window for File, then Save. The first time, the computer will ask you two questions: what to call this, and where to put it. Those questions are Save As, even if the menu said Save. Name it as a human would. Put it in Documents, not on the Desktop if you can help it. Then press Save. From that moment, the file has an address in the house.",
      ),
      p(
        "Every few minutes, press Ctrl and S together (Command and S on a Mac). That is Save again. It does not ask questions the second time. It updates the same envelope. If the light goes, you lose only the last unsaved minute, not the hour. Save As is the other act: it makes a copy with a new name or in a new place. Use it when you want to keep yesterday's version and start a new one — “school-fees-march” and then “school-fees-april”, not “final final 2”.",
      ),
      ul([
        "Open a blank document and type one sentence about your day.",
        "Choose File, then Save. Name it practice-day1. Put it in Documents.",
        "Close the window. Open Documents. Double-click the file. Your sentence should still be there.",
        "Change the sentence, press Ctrl+S, close, reopen. The change should be there. That is the whole trick.",
      ]),
      h2("A second house: the USB drive"),
      p(
        "A flash drive is a tiny extra house you can put in your pocket. Plug it into a USB port — a rectangular hole on the side of a laptop or the back of a tower. Wait a few seconds. A message may appear; if it offers to open the drive, accept. You will see an empty window, or someone else's files. This is not the computer's Documents folder. It is a different address. To copy a file onto it, open Documents in one window, open the USB in another, and drag the file across. A copy appears. The original stays.",
      ),
      fig(
        "/images/blog/usb-papers.jpg",
        "A USB flash drive, a printed document and a notebook on a wooden desk beside a laptop.",
        "Paper is one copy. The computer is another. The USB is a third. Work that matters should live in at least two of these, because light fails and pockets tear.",
      ),
      p(
        "Eject before you pull. On Windows, look for a small USB icon near the clock, click it, choose Eject. On a Mac, drag the drive icon to the bin, which turns into an Eject symbol. Pulling a drive while the computer is still writing is how files corrupt — the page tears in the middle of a sentence. If the computer says the drive is busy, close the window that is showing its files and try again.",
      ),
      h2("The recycle bin is not gone"),
      p(
        "Deleting a file on the computer usually sends it to the Recycle Bin or Trash, a holding room. Open that icon on the desktop. You will see what you threw away. Restore puts it back. Empty Recycle Bin is the real goodbye. Until you empty it, the work is still in the house, only in a cupboard you do not look at. Do not empty it because someone told you it “frees space” unless you have looked first.",
      ),
      p(
        "If you cannot find a file, do not panic-click. Use the search box at the top of File Explorer or Finder and type part of the name you gave it. Search looks through the house. It cannot find a name you never gave. That is why “Document (3)” is a trap, and why the first Save As is the most important minute of any new piece of work.",
      ),
    ],
  },
  {
    slug: "your-hands-on-the-keyboard",
    title: "Your hands on the keyboard",
    excerpt:
      "Hunt-and-peck works until it does not. Home row, the keys that edit, and the two shortcuts that copy a world. Ten honest minutes a day beats a course you never open.",
    series: SERIES,
    order: 3,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/keyboard-hands.jpg",
    coverAlt: "Two hands resting on the home row of a computer keyboard.",
    body: [
      p(
        "Watch someone who has used a computer for years. Their eyes stay on the screen. Their fingers drop without looking. That is not talent. It is a map they built in the hands. You already have a map for your phone: you can type a name in WhatsApp without staring at every letter. The keyboard is a larger version of that map, and the first week feels clumsy because the keys are farther apart than a glass screen.",
      ),
      p(
        "Hunt-and-peck — one finger, eyes on the keys — will write a form. It will not write a letter you are proud of, because the thinking keeps breaking to find M. The cure is not speed. The cure is a resting place for the fingers, called home row, and a promise to return there after every stretch.",
      ),
      fig(
        "/images/blog/keyboard-hands.jpg",
        "Hands in home-row position on a standard keyboard.",
        "Left fingers on A S D F. Right fingers on J K L and the key with the semicolon. Both thumbs on the space bar. The small bumps on F and J are there so you can find home without looking.",
      ),
      h2("Home row, said slowly"),
      p(
        "Sit so your elbows can rest near your sides and your wrists are not climbing over the edge of the desk. Place the four fingers of your left hand on A, S, D and F. Place the four fingers of your right hand on J, K, L and the semicolon. The index fingers should feel a tiny ridge on F and on J. Those ridges are not decoration. They are the only landmarks on a dark keyboard at night. Thumbs rest on the space bar. That is home. Every other key is a reach, then a return.",
      ),
      p(
        "Try this without looking down. Type the word asdf with the left hand, one finger each, then jkl; with the right. Delete it with Backspace. Do it again. It will feel theatrical. That is the point. You are teaching the hands a chair to sit in. After a few days the chair is automatic, and the rest of the keyboard becomes a set of short walks.",
      ),
      h2("The keys that edit, not just write"),
      p(
        "Letters make words. A handful of other keys make the words usable. Enter starts a new line, the way a typewriter's carriage return did. Backspace rubs out the character to the left of the blinking cursor. Delete, if your keyboard has it, rubs out the character to the right. Space inserts a gap. Shift, held down while you tap a letter, makes a capital — and then you let Shift go. Caps Lock is the trap. It leaves every letter large until you press it again. If your sentence suddenly SHOUTS, look for a light on Caps Lock and tap it once.",
      ),
      p(
        "Shift plus a number key is how you get the symbols printed on the upper half of those keys. Shift and 1 is often !. Shift and 2 may be @, which you will need for email. The exact symbols change slightly by keyboard, so look at the key itself. Tab jumps the cursor forward, useful in forms. Escape, usually top-left, dismisses a box you did not mean to open. You will use Escape more than you expect.",
      ),
      ul([
        "Open Notepad or TextEdit. Return your fingers to home row.",
        "Type: The rain in Port Harcourt drums on the zinc.",
        "Use only Backspace to correct mistakes. Do not reach for the mouse yet.",
        "Press Enter twice. Type your name. Press Shift for the capitals, not Caps Lock.",
        "Save the file as typing-practice in Documents. Ten minutes is enough. Stop while you still like it.",
      ]),
      fig(
        "/images/blog/typing-screen.jpg",
        "Over-the-shoulder view of a learner typing a sentence into a blank document.",
        "Eyes on the words, not on the keys. The bumps on F and J are how you find home again after a reach for Enter or Backspace.",
      ),
      h2("Two shortcuts that change everything"),
      p(
        "Highlight a word by dragging the mouse across it, or by holding Shift and tapping an arrow key. When the word is selected — it will sit on a coloured block — press Ctrl and C together (Command and C on a Mac). Nothing looks different. You have copied. Click where you want the word to appear and press Ctrl and V. The word arrives. C is copy. V is paste. X, used the same way, is cut: copy and remove. You can paste into a different document, into an email, into a form. This is how a person stops retyping their own address fifty times a year.",
      ),
      p(
        "Ctrl and Z is undo: take back the last thing you did. If you deleted a paragraph by accident, undo before you panic. You can often undo several times. Ctrl and A selects everything in the window. Be careful with that one around Delete. If you do press Delete on everything, undo immediately.",
      ),
      h2("A rule you can keep"),
      p(
        "Ten minutes a day, on a blank page, with home row, beats a two-hour binge on Saturday. Type sentences from a newspaper, or from a hymn, or from a message you would send anyway. Do not chase speed. Speed is a side effect of not looking down. Looking down is allowed in week one. By week three, try a paragraph with a paper over your hands. You will miss keys. That is the lesson arriving.",
      ),
      p(
        "If your wrists ache, the desk is too high or you are stabbing. Rest the heels of the hands, press the keys, do not punch them. A cheap keyboard is enough. What matters is returning to F and J until the ridges feel like home even in the dark.",
      ),
    ],
  },
  {
    slug: "the-internet-without-getting-lost",
    title: "The internet without getting lost",
    excerpt:
      "A browser is a vehicle. The address bar is the road you typed. Search is asking a librarian. Tabs, the padlock, and how to come back from a wrong turn.",
    series: SERIES,
    order: 4,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/browser-address.jpg",
    coverAlt: "A laptop screen showing a web browser with the address bar visible at the top.",
    body: [
      p(
        "The internet is not inside your computer. Your computer is a window onto a very large library that other machines keep. A browser — Chrome, Edge, Safari, Firefox — is the vehicle you sit in to visit that library. WhatsApp and Instagram are also vehicles, but they only go to one street. A browser can go anywhere someone has published a page. That freedom is why it feels dangerous. It is also why it is the skill worth learning.",
      ),
      p(
        "Open the browser the way you opened Notepad: Start menu, type Chrome or Edge, press Enter. You will see a wide empty field at the top of the window. That field is the address bar. It is the most important strip on the screen. Everything else — the colourful buttons, the news, the adverts — can wait until you can use that strip on purpose.",
      ),
      fig(
        "/images/blog/browser-address.jpg",
        "Close-up of a browser window with the address bar at the top of the screen.",
        "The long field at the top is the address bar. A web address looks like cea.ng or bbc.com/news. If you type a question there, most browsers will search for you. Knowing which of those two things just happened is the whole lesson.",
      ),
      h2("An address is not a question"),
      p(
        "A web address is a place: cea.ng, jumia.com.ng, waec.org.ng. You type it in the address bar and press Enter. The vehicle goes there. A question is different: “what time is JAMB 2026” is not a place. If you type a question, the browser will usually take you to a search engine — Google, Bing, or whatever your browser uses — and show a list of pages that might answer. Both acts start in the same box. Watch what appears after you press Enter. If the top of the window now says google.com or bing.com, you searched. If it says the place you typed, you travelled.",
      ),
      p(
        "Prefer travel when you already know the place. Banks, exam bodies, and the academy have real addresses. Typing “first bank login” into search will also offer fake pages that look like First Bank. Typing the address you already trust, or using a bookmark you saved on a good day, is how you stay on the real street. We will come back to fakes in a later note. For now: if a page asks for a password and you arrived through a surprise link, stop.",
      ),
      h2("How to ask a librarian"),
      p(
        "Search works when you ask a specific question. “Computer” is a warehouse. “how to save a Word document on Windows 11” is a shelf. Put the thing you want and the situation you are in into the same sentence. Add Nigeria when the answer depends on here — school fees, BVN, JAMB dates. Read the grey address under each result before you click. A result from waec.org.ng is not the same as a blog that used the word WAEC.",
      ),
      fig(
        "/images/blog/search-laptop.jpg",
        "A young man searching on a laptop at a small table, phone beside him.",
        "The phone can search too. The laptop gives you a larger page, an address bar you can actually read, and room to open a second tab without losing the first.",
      ),
      p(
        "The first three results are often adverts. They are marked Ad or Sponsored. They can still be useful. They are also how a paid page jumps the queue. Scroll until you see results that are not marked. Open one. If it is wrong, you have not failed. Press the back button — a left-pointing arrow, top-left of the browser — and try the next. Back is the most forgiving key on the internet. It means “take me to the previous room.”",
      ),
      h2("Tabs are extra rooms"),
      p(
        "A tab is a page you are holding open without closing the others. Look at the top of the browser for a row of small titles, and a plus sign. The plus opens a new tab, a fresh empty room. You can have the academy site in one tab and a search in another. Click the titles to switch. The X on a tab closes only that room. Closing the whole browser window closes every tab. If you did that by accident, reopen the browser. Many browsers offer Reopen closed tab if you right-click the tab bar.",
      ),
      ul([
        "Open the browser. Click the address bar once so the text inside is highlighted.",
        "Type cea.ng and press Enter. Confirm that the address at the top is the place you typed.",
        "Open a new tab with the plus. Type: how to copy and paste on a computer. Press Enter.",
        "Read the address under the first unpaid result. Open it. Use Back to return to the list.",
        "Return to the cea.ng tab by clicking its title. You did not lose the page. That is the point of tabs.",
      ]),
      h2("The padlock and the download"),
      p(
        "To the left of the address you will often see a small padlock. It means the road between you and that page is encrypted — a tunnel, not a postcard. It does not mean the page is honest. A thief can also have a padlock. Treat the padlock as necessary, not sufficient. If there is a warning in red that the connection is not private, do not enter a password. Go back.",
      ),
      p(
        "Pages will offer you files: a form, a past question, a programme. Downloading is the internet placing a parcel on your Downloads mat. Know that. Open Downloads after and move the file into Documents if you mean to keep it, the way you would take a parcel off the floor. Do not download a programme because a page shouted that your computer is infected. That shout is a common trick. If you did not go looking for a repair tool, do not install one from a pop-up.",
      ),
      p(
        "Bookmarks are addresses you want to find again. In most browsers, a star at the end of the address bar saves the current page. Name it something you will recognise. The next time you need it, open Bookmarks and click. This is how a person stops searching for their own bank every Saturday.",
      ),
    ],
  },
  {
    slug: "your-first-email",
    title: "Your first email, sent properly",
    excerpt:
      "An address, a subject that tells the truth, a body with one job, and the paperclip. Reply is not Reply all. The first message you send should be one you would still sign on paper.",
    series: SERIES,
    order: 5,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/email-compose.jpg",
    coverAlt: "A laptop showing an email being written, with To, Subject and a message body.",
    body: [
      p(
        "Email is a letter that does not need a stamp. It is older than WhatsApp, less noisy, and still the way schools, banks, and workplaces ask you to apply, reset a password, or send a document that must not vanish in a chat. If you already have Gmail or Outlook because a phone demanded it, you have an address. This lesson is how to send a message that looks like a person wrote it on purpose.",
      ),
      p(
        "An email address has two parts around an @ sign. The part before is the name you chose. The part after is the house — gmail.com, outlook.com, cea.ng. Read yours out loud. Write it in your notebook. People lose work because they cannot remember their own address, then they create a second one, then they have two houses and check the wrong one. One address, written down, is enough.",
      ),
      fig(
        "/images/blog/email-compose.jpg",
        "Compose window of an email with To, Subject and a short message.",
        "Three fields matter: To (who receives it), Subject (the label on the envelope), and the body (the letter). Send is a button you press only after you have looked at all three.",
      ),
      h2("The three fields, in order"),
      p(
        "To is the other person's address, typed exactly. One wrong letter and the letter goes to a stranger or to nobody. If you are writing to the academy, use the address on the contact page, not one you found in a forwarded message. Subject is the short line the other person sees in a list of fifty. “Hello” is not a subject. “Application for Computer Basics — September” is. The body is the letter. Click in the large empty space and type as you would on paper.",
      ),
      p(
        "A body that works in Nigeria, and everywhere else, has four beats. A greeting with a name if you have one: Good morning, Mrs Amadi. One or two sentences that say why you are writing. One sentence that says what you want them to do — reply, expect you on Tuesday, find the attached receipt. A sign-off with your full name and a phone number. That is enough. Do not paste a proverb. Do not write in only capital letters. Do not send four questions in one mail if you need four answers; people reply to the last one and forget the rest.",
      ),
      ul([
        "Open Gmail or Outlook in the browser, or the Mail app if you already set it up.",
        "Click Compose or New mail.",
        "Put your own second address, or a trusted person's, in To — the first practice mail should not go to a stranger.",
        "Subject: Practice mail from [your name].",
        "Body: a greeting, one sentence, your name. Send. Then open the other inbox and confirm it arrived.",
      ]),
      h2("The paperclip"),
      p(
        "An attachment is a file that travels with the letter: a receipt, a passport photograph, a filled form. Look for a paperclip icon. Click it. You will be taken to the same house you learned in the files lesson — Documents, Desktop, Downloads. Choose the file, open it. The name should appear under or beside the body. If the name is missing, you have not attached anything. Look before you send. “Please find attached” with nothing attached is a classic, and it wastes a day.",
      ),
      fig(
        "/images/blog/email-attach.jpg",
        "An email with a paperclip attachment icon and a PDF named school-fees.pdf.",
        "The paperclip means a file is coming with the letter. Check the name. school-fees.pdf is a file someone can open. IMG_0048 is a photograph of a table unless you renamed it.",
      ),
      p(
        "Size matters. A phone photograph straight from the camera can be too large for some inboxes. If the mailer warns you, it is telling the truth. Use a PDF for documents when you can — File, Save As, PDF in Word, or Print to PDF. A PDF looks the same on another person's computer. A .docx can shift if they do not have the same fonts. For a passport photo, a .jpg that is clearly your face is enough. Do not attach five versions. Attach the one you mean.",
      ),
      h2("Reply, Reply all, and the ones you should not open"),
      p(
        "Reply sends your answer to the person who wrote to you. Reply all sends it to everyone who was on the original mail. If a school wrote to thirty parents, Reply all means twenty-nine people who did not ask will read “I will be late.” Use Reply unless you truly need the whole group. Forward sends the letter to a new person. Forward with a sentence of your own at the top, so they know why it arrived.",
      ),
      p(
        "You will receive mail you did not ask for. Some of it will use your name and a bank's colours and a sense of hurry: confirm your account, your parcel is held, you have a job. Do not click the link. Do not type a password into a page you reached from a surprise mail. Open a new tab and travel to the bank's real address yourself, the way the last lesson taught. If the story was true, it will still be true on the real site. If it was a trap, the real site will show nothing, and you will have lost nothing.",
      ),
      p(
        "The first mail you send to a school or an office should be one you would still sign on paper. Subject that tells the truth. Body with one job. Name and number at the end. Attachment checked. Send. Then wait. Email is not a chat. A reply the same day is kindness, not a right. Check the inbox tomorrow, and look in the folder called Spam or Junk once, in case a machine guessed wrong. That is the whole practice: write like a person, send like a clerk, wait like an adult.",
      ),
    ],
  },
  {
    slug: "passwords-you-can-keep",
    title: "Passwords you can keep",
    excerpt:
      "A password is a key, not a motto. Long beats clever. One key per house. A notebook in a drawer beats the same word on every door.",
    series: SERIES,
    order: 6,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/password-notebook.jpg",
    coverAlt: "A notebook and pen beside a closed laptop on a wooden desk.",
    body: [
      p(
        "A password is a key. You would not cut one key and hang it on every door in the street. That is what people do when they use their child's name plus 1234 for email, the bank app, and the academy login. The first site that leaks — and sites leak — hands a stranger the rest of the house. This lesson is how to make keys you can still find in the dark, without writing the actual key on the doorframe.",
      ),
      p(
        "Forget the old advice about one capital, one number, one symbol, eight characters, changed every month. That produced Passw0rd! and a sticky note on the monitor. What actually resists guessing is length, and what actually fails is reuse. A sentence you can say is stronger than a short tangle you will forget and then reset, badly, from a café.",
      ),
      fig(
        "/images/blog/password-notebook.jpg",
        "A lined notebook and pen beside a closed laptop on a wooden desk.",
        "Hints, not keys. Write what will remind you — a hymn line, a stall colour — never the password itself, and never next to the name of the site.",
      ),
      h2("Make a sentence, then hide it"),
      p(
        "Think of four ordinary words that do not belong together. Rain zinc mango Tuesday. Say them. That is already harder to guess than your birthday. Add a small twist you will remember: the year you started the course, or the bus number you take, in the middle, not at the end. Do not use a proverb everyone knows. Do not use a Bible verse with the reference, because those are in books. The sentence should be boring to anyone who is not you.",
      ),
      p(
        "Each important house gets its own sentence. Email is one. Bank is another. The computer login is a third. WhatsApp PINs and app locks are more keys. If that sounds like too many, you have named the real problem: memory. Two honest answers exist. One is a password manager — a programme whose only job is to remember keys, locked with one long sentence you do memorise. The other, if you do not want another programme yet, is a notebook that lives in a drawer, not in the bag you take to town.",
      ),
      h2("The notebook rule"),
      p(
        "If you write passwords down, write hints, not the keys. “Gmail — hymn second line” is useful to you and useless to a thief who finds the book. Do not write the site name beside the full password. Do not photograph the page. Do not keep the book in the laptop bag. A drawer at home is dull, which is the point. Dull is how keys survive.",
      ),
      ul([
        "Pick four unrelated words. Say them until they are a rhythm.",
        "Use that sentence only for your email. Email is the master door: reset links for everything else arrive there.",
        "Make a different sentence for the bank. Do not “just change the last number.”",
        "Write a hint in the notebook, close the drawer, and try logging in tomorrow from memory. If you fail, the hint was too thin. Fix the hint, not the sentence, unless the sentence itself is gone.",
      ]),
      fig(
        "/images/blog/phone-login.jpg",
        "A hand holding a phone that shows a six-digit verification code, laptop open beside it.",
        "The second lock. A code on the phone means a stolen password is not enough. Turn this on for email and banking before you turn it on for anything else.",
      ),
      h2("The second lock on the phone"),
      p(
        "Many sites now offer a second step: after the password, they send a code to your phone, or they ask you to tap a prompt. That is two-factor authentication, which is a long name for a second lock. Turn it on for email first, then for the bank. Use the phone number you actually hold. If the site offers an authenticator app — a small programme that shows rotating codes — that is stronger than SMS, because SMS can be stolen with a swapped SIM. SMS is still far better than nothing.",
      ),
      p(
        "When a site offers “remember this computer,” say yes only on a machine that stays in the house. Say no in a business centre, a café, or a friend's laptop. The computer will keep you signed in. That is convenient at home and a gift to the next person on a shared machine. Sign out when you are done on any computer that is not yours. Look for your name in the corner, click it, choose Sign out. Closing the window is not always the same act.",
      ),
      h2("What you never type into a surprise"),
      p(
        "Nobody who actually works at a bank will ask you to reply with your password. Nobody at the academy will. A page that arrived from a link in a mail or a WhatsApp and then asks for the password is the next lesson. For today: if you did not walk to the real site yourself, do not type the key. Open a new tab. Type the address you already trust. If the story was true, it will still be true there.",
      ),
      p(
        "If you have been using one short password everywhere, change email tonight. That one change closes the master door. The rest can follow this week, one house at a time. You do not need a new personality. You need keys that do not open the neighbour's gate.",
      ),
    ],
  },
  {
    slug: "the-link-you-should-not-open",
    title: "The link you should not open",
    excerpt:
      "Hurry is the bait. A real bank already knows you. Open a new tab and walk there yourself. If the story was true, it will still be true on the real street.",
    series: SERIES,
    order: 7,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/inbox-caution.jpg",
    coverAlt: "A laptop on a wooden desk showing an email inbox.",
    body: [
      p(
        "The trap has a shape. A message arrives with your name, a familiar colour, and a clock. Your account will close. A parcel is held. A job is waiting. A relative is stranded. The button is large. The English is almost right. Your hands want to tap before your head has sat down. That hurry is the product. This lesson is how to sit down anyway.",
      ),
      p(
        "People call this phishing when it comes as email, and the same play arrives on WhatsApp, SMS, and Facebook. The name does not matter. The move is the same: they want you to walk through their door while thinking it is the bank's. Once you type a password or a BVN or an OTP into their page, they have the key. The page can look finished. A padlock can sit in the address bar. A padlock means the tunnel is encrypted. It does not mean the building is the bank.",
      ),
      fig(
        "/images/blog/inbox-caution.jpg",
        "A laptop inbox open on a wooden desk in a modest room.",
        "Read the list before you open the letter. Unknown senders, money, and a deadline in the subject line are three reasons to slow down, not speed up.",
      ),
      h2("Three tells you can see without clicking"),
      p(
        "Look at the sender the way you look at a stamp. A bank's real mail comes from an address that ends in the bank's own house, not from a free gmail with the bank's name in the display. Display names are costumes. The address behind them is the street. On a phone, tap the name to expand it. On a computer, hover or click once. If the street is strange, you are done. You do not need to open the letter to know the stamp is wrong.",
      ),
      p(
        "Look at the ask. Real institutions already have your details. They do not need you to “confirm your BVN to keep this account.” They do not need a photograph of your ATM card, front and back. They do not need the code that just arrived on your phone — that code is a one-time key, and anyone who asks you to read it out is asking you to open the door from inside. A job that wants a “processing fee” before you start is not a job.",
      ),
      p(
        "Look at the clock. “Within 30 minutes or your account closes” is theatre. Banks do not close accounts by WhatsApp. Couriers do not hold parcels behind a random link. If there is a genuine problem, it will still be there in an hour, on the number or the website you already use. Hurry is not a feature of serious offices. It is a feature of thieves.",
      ),
      h2("Walk there yourself"),
      p(
        "This is the whole defence, and it fits in one habit. Do not use the link in the message. Open a new tab. Type the address you already trust, or use the bookmark you saved on a calm day, or open the bank's own app from your phone's home screen — the icon you installed, not a new one the message suggested. If the story was true, the real site will show it. If the story was a trap, the real site will be quiet, and you will have lost nothing but a minute.",
      ),
      fig(
        "/images/blog/address-check.jpg",
        "Close-up of a browser address bar at the top of a laptop screen.",
        "The street name lives here, not in the logo, not in the button. Read it before you type a password. A letter extra, a missing dot, a different ending — any of those is a different building.",
      ),
      p(
        "When you must look at a link, look at the street in the address bar after the page opens, before you type anything. The important part is the name just before the first slash, the house. firstbank.com is not firstbank.com.ru is not first-bank-secure.xyz. You do not need to memorise every fake. You need to know your real ones: the bank you actually use, the exam body, the academy, the mail you signed up with. Write those few addresses in the same notebook as the password hints.",
      ),
      ul([
        "Open yesterday's mail or WhatsApp. Find one message that asked you to tap a button.",
        "Do not tap it. Read the sender. Read the ask. Read the clock.",
        "Open a new tab and type the real address yourself, or open the real app.",
        "Compare. If the real place is silent, the message was noise. Delete it. If you already tapped one last month, change the email password from the real site, then the bank.",
      ]),
      h2("If you already tapped"),
      p(
        "Stop typing. Do not “finish the form.” Close the tab. On your phone, do not call the number in the message. From a number you already have — the back of the card, the app, a printed receipt — tell the bank what happened. Change the email password first, because that is the master door, then the bank password, then any other house that used the same key. If money moved, the bank's fraud line is the next call, not a helper in the comment section of Facebook.",
      ),
      p(
        "Shame is how these traps finish the job. People hide the mistake until the account is empty. The academy would rather you say “I tapped” on the same day than “I think something is wrong” three weeks later. You are not the first. The lesson is the walk: new tab, real street, then maybe the story is true. Everything else can wait.",
      ),
    ],
  },
  {
    slug: "printing-without-waste",
    title: "Printing without waste",
    excerpt:
      "The printer is a tap. Preview is looking at the sink before you open it. One page, the right side of the paper, and ink that is not a rumour.",
    series: SERIES,
    order: 8,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/printer-desk.jpg",
    coverAlt: "A small printer on a wooden desk beside a laptop and a stack of paper.",
    body: [
      p(
        "A printer is a tap. Leave it open and you flood the desk: twenty copies of a page you meant once, the back of a form printed on the front, a photograph that ate a week's ink to look like fog. The machine is not stubborn. It prints exactly what it was last told. This lesson is how to look at the water before you turn the handle.",
      ),
      p(
        "You will meet printers at the academy, in business centres, in church offices, at home if someone bought one. The buttons change. The idea does not. Somewhere on the computer there is a command called Print. Somewhere on the printer there is paper, power, and a warning light. Your job is to join those two only after you have seen a picture of the page.",
      ),
      fig(
        "/images/blog/printer-desk.jpg",
        "A small inkjet printer on a wooden desk beside a laptop and a short stack of A4 paper.",
        "Paper in the tray, face the way the little diagram shows. Power on. Then the computer. The printer cannot guess which way you meant the letterhead.",
      ),
      h2("Before you press anything"),
      p(
        "Check the tray. A4 is the ordinary sheet in Nigeria — the size of a letter, not the long roll of a receipt. If the tray is empty, the printer will either wait or chew the next thing it finds, including the cardboard leftover from the last ream. Fan the paper once so the sheets separate. Put it in the way the icon on the tray shows, usually face down on home inkjets, sometimes face up on office machines. When in doubt, print one test page on cheap paper and look.",
      ),
      p(
        "Check the lights. A steady power light is waiting. A flashing one often means it is hungry for paper or ink, or the lid is open. Opening the lid to stare does not refill ink. If the computer says the printer is offline, it is usually unplugged, asleep, or connected to a different Wi-Fi than the laptop. On a USB printer, the cable is the whole conversation. Wiggle it once, the way you would a kettle that will not boil.",
      ),
      h2("Print means preview"),
      p(
        "In Word, in a browser, in almost any page, Ctrl and P (Command and P on a Mac) opens Print. Do not hit Enter yet. Look. You should see a small picture of the page, the name of the printer, the number of copies, and whether you meant all pages or only this one. That small picture is the truth. If it shows two pages and you wanted one, you still have time. If it shows a huge empty margin and three words, the paper will look the same, only more expensive.",
      ),
      fig(
        "/images/blog/print-preview.jpg",
        "A laptop screen showing a print preview of a one-page letter, a printer behind it.",
        "The miniature page is what will come out. Copies: 1. Pages: this one. Colour only if you need it. Then Print.",
      ),
      p(
        "Copies default to 1 on a good day and to whatever the last person chose on a shared machine. Look every time. Pages can be All, Current, or a range like 1-2. Colour uses more ink than black. For a form, a receipt, a letter, black is enough. Draft or Economy, if you see it, is the pale setting for things you will not keep. Fit to page stops the right edge from vanishing. Portrait is the tall way. Landscape is the wide way, for a table that is too broad.",
      ),
      ul([
        "Open a one-page letter you already saved.",
        "Press Ctrl+P. Confirm copies is 1, and the preview is one page, the right way up.",
        "If you are on a shared printer, read the name. Printing to “Office upstairs” from downstairs is how pages go missing.",
        "Print. Walk to the machine. If nothing comes, look at the lights before you press Print again. Twice is two copies, not one copy faster.",
      ]),
      h2("Ink, jams, and the business centre"),
      p(
        "Ink runs out in the middle of a sentence. The computer may warn you; it may not. A streaked page is often a clogged nozzle, not an empty tank — but do not shake a cartridge over the desk to find out. At home, run the printer's own cleaning routine from its software once, not five times, because cleaning spends ink. At a business centre, pay for the page you got, and ask them to reprint if the streak is theirs.",
      ),
      p(
        "A jam is a folded sheet in the path. Switch the printer off. Open the doors the arrows point to. Pull the paper in the direction it was travelling, slowly, so it does not tear and leave a tooth behind. If you leave a tooth, the next ten pages jam too. Never use a knife. The rollers are rubber.",
      ),
      p(
        "PDF is your friend when the other person's computer is not yours. File, Save As, PDF, then print the PDF. What you see is what the machine will draw, fonts included. For a form that must stay on one page, preview until it does. For photographs, know that a full-page colour picture can cost more than the document it was meant to illustrate. Ask the price before you send twenty wedding pictures to the shop printer. The tap is patient. You do not have to open it all the way.",
      ),
    ],
  },
  {
    slug: "spreadsheets-the-grid-that-counts",
    title: "Spreadsheets: the grid that counts",
    excerpt:
      "Rows, columns, and one cell where they meet. Type a number, not a picture of a number. Let the grid add, so the total is still right when the light returns.",
    series: SERIES,
    order: 9,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/spreadsheet-grid.jpg",
    coverAlt: "A laptop screen showing a simple spreadsheet with names, items and amounts.",
    body: [
      p(
        "A spreadsheet is a grid that can count. Lined paper can hold the same numbers. The grid's trick is this: when Friday's figure changes, the total at the bottom can change with it, if you asked the grid to add instead of typing the answer yourself. Microsoft Excel, Google Sheets, and LibreOffice Calc are three names for that grid. The idea is older than all of them: rows across, columns down, a cell where they meet.",
      ),
      p(
        "You already know the picture if you have kept a shop book or a school fee list. Names down the left. Months across the top. Money in the middle. The spreadsheet is that book, with a machine willing to add until the battery dies. This lesson is not “become an analyst.” It is: open a grid, name the columns, type numbers as numbers, and let one cell do the sum.",
      ),
      fig(
        "/images/blog/spreadsheet-grid.jpg",
        "A laptop screen showing a simple spreadsheet with columns for Name, Item and Amount.",
        "Each box is a cell. A1 is the corner. Type in the cell, not in the margin. The letters across the top and the numbers down the side are how you name a place.",
      ),
      h2("The map: rows, columns, cells"),
      p(
        "Columns wear letters: A, B, C. Rows wear numbers: 1, 2, 3. The box where column B meets row 3 is called B3. Click it. A line appears around it. That is the active cell. Whatever you type next will land there, the way the cursor works in a letter. The long field above the grid is the formula bar. It shows what is really inside the cell, which is useful later, when the cell is showing a total but holding a sum.",
      ),
      p(
        "Click A1 and type Name. Press Tab — the cell to the right, B1, becomes active. Type Item. Tab. Type Amount. Press Enter. You are now on the next row, often A2. That first row is a header. It is a label for humans. Do not put a number in it. The numbers start underneath, one fact per cell. Chidinma in A2, exercise book in B2, 450 in C2. Not “Chidinma — book 450” all in one box. The grid can add a column. It cannot easily add a sentence.",
      ),
      h2("Numbers are not decoration"),
      p(
        "Type 450, not ₦450, if you want the grid to add. The naira sign can come from formatting later — a button that says currency, or a format menu. If you type the sign yourself, some programmes treat the cell as a word, and words do not add. The same trap waits with commas and spaces. 1 200 may be a word. 1200 is a number. Start simple: digits only, then make it pretty after the total is right.",
      ),
      fig(
        "/images/blog/spreadsheet-learner.jpg",
        "A young woman at a small table with a laptop spreadsheet, a paper receipt and a calculator.",
        "The receipt is the source. The grid is the copy that can add. If they disagree, believe the paper until you find the mistyped cell.",
      ),
      p(
        "To add a column, click the cell under the last amount — if your amounts are C2 to C6, click C7. Type =SUM(C2:C6) and press Enter. The equals sign tells the grid this is a formula, not a label. SUM is add. C2:C6 means from C2 through C6. The colon is a range, a stretch of cells. If the number that appears matches your calculator, you are done. If you later change C3, C7 should change by itself. That is the whole magic. If it does not change, you typed the total by hand. Undo and put the formula back.",
      ),
      ul([
        "Open Excel, Google Sheets, or the spreadsheet that came with the computer. File, New.",
        "In row 1, type Name, Item, Amount.",
        "Enter three real lines from your week — a transport fare, a photocopy, a recharge.",
        "In the cell under the amounts, type =SUM( and then drag from the first amount to the last, close the bracket, press Enter.",
        "Change one amount. Watch the total. Save as week-practice in Documents.",
      ]),
      h2("The mistakes that look like maths"),
      p(
        "A cell that shows ###### is not an error in your life. The column is too narrow for the number. Put the pointer on the line between C and D at the top until it becomes a double arrow, then drag. A cell that shows #DIV/0! means you asked the grid to divide by empty. A cell that shows the formula you typed, instead of an answer, usually means you missed the equals sign, or the cell is formatted as text. Delete, type again starting with =.",
      ),
      p(
        "One sheet, one job. A tab at the bottom is a page in the same book. Fees on one tab, attendance on another, not both tangled in column Z. Name the file as you would a folder: fees-2026, not Book1. Save as you learned — Ctrl+S, often. Google Sheets saves itself if you are online; that is a kindness, not a reason to work without looking. When a number matters — school fees, a shop tally — print a copy or keep the paper receipts. The grid is a good clerk. It is not the only witness.",
      ),
    ],
  },
  {
    slug: "whatsapp-is-not-email",
    title: "WhatsApp is not email",
    excerpt:
      "Chat is a tap on the shoulder. Email is a letter on a desk. Schools, banks, and workplaces still want the letter. Knowing which room you are in saves a week of silence.",
    series: SERIES,
    order: 10,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/phone-and-laptop.jpg",
    coverAlt: "A smartphone showing a chat beside a laptop with an email open.",
    body: [
      p(
        "In Nigeria, WhatsApp is how the day moves. A pastor, a landlord, a classmate, a mechanic — the green app is the tap on the shoulder. Email is quieter, older, and still the tray on an office desk. Mixing them up is how applications vanish, how a school never saw your receipt, how a job “did not get your CV.” This lesson is not against the phone. It is about knowing which room you are standing in.",
      ),
      p(
        "Chat is for things that can live in a pocket: “I am five minutes late.” “Is the shop open?” “Here is the gate code.” The message sits in a thread that scrolls. Next week it is hard to find. Next year it is gone if the phone dies and was never backed up. Email is for things that must still make sense on a desk in October: an application, a fee receipt, a letter of request, a document someone else must file. The subject line is the label on the envelope. The attachment is the paper inside.",
      ),
      fig(
        "/images/blog/phone-and-laptop.jpg",
        "A smartphone with a chat open beside a laptop showing an email compose window.",
        "Same news, two rooms. The phone is fast. The laptop letter has a subject, a file, and a date the other person can search.",
      ),
      h2("When the phone is the right room"),
      p(
        "Use WhatsApp when you already have the person's number, when the answer is short, and when both of you are in the habit of that chat. A class group that shares tomorrow's time. A “have you reached” to a sibling. A photograph of a blackboard, if the teacher asked for it there. Voice notes for people who listen faster than they read. That is the phone earning its keep.",
      ),
      p(
        "Even then, a few manners transfer from letters. Say who you are if the number is new: “Good afternoon, this is Amaka from Computer Basics.” Do not send five fragments that could have been one message. Do not send a document as nine blurry photographs if you can send one PDF. Do not assume a blue tick means the person can act; it means the phone received a packet. People drive, teach, and sleep.",
      ),
      h2("When only email will do"),
      p(
        "If an advertisement, a form, or a person with an office says “send it to this address,” they mean email. A WhatsApp to a number you found on Facebook is not the same tray. Admissions, banks, scholarships, job boards, and many lecturers still sort their work by subject line. Your carefully typed chat is invisible there. Use the letter: To, Subject, body, attachment, as the email lesson taught.",
      ),
      fig(
        "/images/blog/whatsapp-vs-letter.jpg",
        "A young man holding a phone while a laptop with email is open on the desk.",
        "If you hesitate, look at what they asked for. A number means chat. An address with an @ means a letter. When they asked for both, send the letter and then a short chat that says you sent it.",
      ),
      p(
        "Sometimes you should do both, in that order. Email the receipt to the address on the form. Then send a short WhatsApp: “Good afternoon. I have emailed the fee receipt to accounts@…, subject March fees — Amaka Okoro.” The chat is a knock. The mail is the file. Do not reverse it — a knock with no file, then silence when they ask you to resend, because the photograph compressed into dust.",
      ),
      ul([
        "Find one thing you must send this week: a receipt, a form, a short request.",
        "If you were given an email address, send it there with a real subject and the file attached, named clearly.",
        "If you were given only a phone number, send one WhatsApp that states who you are and what the file is, then the file, once.",
        "If you were given both, email first, then a two-line chat pointing at the subject. Do not send the same PDF five times in five places.",
      ]),
      h2("Files, groups, and what disappears"),
      p(
        "WhatsApp compresses photographs. A receipt that looked sharp on your screen can arrive as a grey soup. For anything a stranger must read — a passport page, a bank slip, a filled form — a PDF or an original document through email survives. If you must use chat, use Document, not Camera, so the file is not treated as a snapshot. Tap the paperclip, choose Document, find the file in the house you already learned.",
      ),
      p(
        "Groups are rooms with many ears. A class group is not a private letter to the instructor. Do not post your BVN, your OTP, or a quarrel. Reply privately when the matter is one person's. Admin messages pinned at the top are the closest thing chat has to a subject line — read them before asking the question already answered.",
      ),
      p(
        "Back up the phone if the chats matter. WhatsApp can save to Google Drive or iCloud; that is a setting, not a miracle. It still is not a filing cabinet. The academy will not hunt through your backup to find last term's receipt. Put work that must last in Documents, on email, on a USB, the way the files lesson said. Use the green app to live. Use the letter to remain.",
      ),
    ],
  },
];
