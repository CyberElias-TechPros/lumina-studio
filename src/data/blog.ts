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
  {
    slug: "a-letter-that-looks-like-one",
    title: "A letter that looks like one",
    excerpt:
      "Word is lined paper that can change its mind. Margins, a greeting, one typeface, and Save As PDF so the other person's computer cannot rearrange your name.",
    series: SERIES,
    order: 11,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/word-letter.jpg",
    coverAlt: "A laptop showing a one-page formal letter in a word processor.",
    body: [
      p(
        "A word processor is lined paper that can change its mind. Microsoft Word, Google Docs, and LibreOffice Writer are three names for the same job: a page you can type on, move, and print without starting again in ink. Notepad, from the first sitting, has no margins worth showing a school. This lesson is how to make a letter that still looks like a letter when it leaves your desk.",
      ),
      p(
        "Open Word the way you opened everything else: Start, type Word, Enter. If the computer has no Word, Google Docs in the browser is enough, or Writer if it came with the machine. You will see a white page, a blinking cursor, and a ribbon of buttons at the top. Ignore most of the buttons. You need a handful: font, size, bold, alignment, and Save.",
      ),
      fig(
        "/images/blog/word-letter.jpg",
        "A one-page letter on a laptop screen, with a heading, greeting and short paragraphs.",
        "One typeface, left-aligned, space between paragraphs. The page should look like something you would still sign. Decoration is not the work.",
      ),
      h2("The bones of a letter"),
      p(
        "Put your address or your name at the top, then the date, then the name of the person you are writing to, then the greeting. Good morning, Mrs Amadi. Then the body — short paragraphs, one idea each. Then yours faithfully, or yours sincerely if you used their name, then your full name. That order is older than computers. The machine did not invent it. The machine only makes the lines easier to move.",
      ),
      p(
        "Pick one typeface and stay there. Calibri, Times New Roman, or Georgia. Size 12 for the body. Size 11 is small for printing; 14 is a poster. Left-align ordinary letters. Centre only a title, if you must have one. Bold is for a heading, not for a whole paragraph. Colour is almost never needed. If the page looks busy, it will look amateur to the person whose tray it lands in. White space is not wasted paper. It is how the eye rests.",
      ),
      h2("Margins, pages, and the things that jump"),
      p(
        "A margin is the quiet border around the words. Too narrow and a printer eats the last letters. Too wide and a one-page letter becomes two. In Word, Layout then Margins, then Normal, is enough. If a heading has run onto a second page for three lines, you do not need a new font. You need to look at spacing: after a paragraph, one blank line, not three. Press Enter once between paragraphs. If the computer is adding extra space, look for Paragraph, then the box that says space after, and set it to a small number.",
      ),
      p(
        "Pictures jump. A photograph dropped into the middle of a sentence will shove the text in ways that feel like the page is haunted. If you need a passport photo on an application, Insert, Picture, and then click the picture, choose a wrapping that says In line with text or Top and bottom — not the one that lets it float over words. Keep pictures small. A letter is not a poster.",
      ),
      fig(
        "/images/blog/letter-paper.jpg",
        "A printed one-page letter on A4 paper beside the laptop that wrote it.",
        "If it looks right on paper, it is finished. If it only looks right on your screen, Save As PDF before you send it, so another computer cannot restyle your name.",
      ),
      ul([
        "Open a blank document. Type a short letter asking for your own transcript, or a letter to a landlord, or a thank-you. Real words, one page.",
        "Date, greeting, two short paragraphs, your name. One typeface, size 12.",
        "Save as letter-practice in Documents. Press Ctrl+S twice while you work.",
        "File, Save As, choose PDF. Open the PDF. If the letter still looks like a letter, you can attach it.",
      ]),
      h2("PDF is how a letter travels"),
      p(
        "A .docx is a working file. Another person's Word can change the font, shift a heading, or refuse to open it. A PDF is a photograph of the page that still lets you select the words. When you email a school, a bank, or an office, send the PDF unless they asked for Word so they can edit. File, Save As, PDF. Look at the PDF before you attach it. If a heading has slipped to a lonely last page, go back to Word and fix the spacing, then save the PDF again. Do not send both “because one might work.” Send the one you mean.",
      ),
      p(
        "Spell check is a cousin, not a teacher. The red underline catches letters. It will not catch form instead of from, or the wrong Mrs. Read the letter out loud once. If you would not sign it on paper, do not send it. The machine made the lines neat. You still have to mean them.",
      ),
    ],
  },
  {
    slug: "photos-off-the-phone",
    title: "Getting photographs off the phone",
    excerpt:
      "The gallery is a pocket. The computer is a drawer. A cable, a folder called Pictures, and names that will still make sense when the phone is gone.",
    series: SERIES,
    order: 12,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/phone-usb.jpg",
    coverAlt: "A USB cable connecting a phone to a laptop on a wooden desk.",
    body: [
      p(
        "The phone is a camera you already know. The gallery fills until the phone is slow, or until it falls in a basin, or until the shop formats it “to repair the screen.” Photographs that live only in the pocket are not kept. They are borrowed. This lesson is how to move them into the Pictures drawer on the computer, name a few that matter, and leave the rest without drowning.",
      ),
      p(
        "Three ordinary roads exist. A USB cable from the phone to the laptop. A cloud — Google Photos, iCloud — if you already signed in and the data can stand it. Bluetooth, which is slow and fine for three pictures, not for a wedding. Start with the cable. It does not need airtime. It does not compress the file into WhatsApp soup.",
      ),
      fig(
        "/images/blog/phone-usb.jpg",
        "A USB cable connecting an Android phone to a laptop.",
        "Unlock the phone. When it asks whether to allow the computer, allow. If the computer still cannot see it, the cable may be charge-only. Try another cable before you blame the machine.",
      ),
      h2("The cable, said slowly"),
      p(
        "Unlock the phone first. A locked phone often shows as an empty drive. Plug the cable into the phone and into a USB port on the computer. On Android, a notice usually appears: charging only, or file transfer. Choose file transfer, or MTP, or the words that mean “share files.” On an iPhone, the computer may ask you to trust this computer; tap Trust, then the passcode. Wait. A new device should appear in File Explorer or Finder, with a name like the phone's model.",
      ),
      p(
        "Open that device as you would a USB drive. On Android you will often walk through Internal storage, then DCIM, then Camera. That Camera folder is the roll. On an iPhone, pictures may appear in a Photos app on the computer rather than as ordinary files — follow that window; it is still a drawer. Do not start dragging yet. First, on the computer, open Pictures and make a folder with a human name: 2026-family, or church-harvest, or id-scans. Then copy.",
      ),
      h2("Copy, do not cut"),
      p(
        "Select the photographs you want. Click the first, hold Shift, click the last, for a block. Or hold Ctrl and click to pick. Copy — Ctrl+C — then open your new folder and paste. Wait until the progress box finishes. A phone cable that wiggles will corrupt a file in the middle, the way a yanked USB does. When the copy is done, open two or three photographs on the computer to prove they are really there. Only then may you delete from the phone, and only if you need the space. Copy is the safe verb. Cut is how people empty a pocket into a hole.",
      ),
      fig(
        "/images/blog/pictures-folder.jpg",
        "A Pictures folder on a laptop, with photo thumbnails visible.",
        "This is the drawer. Rename the ones that must be found — passport-amaka.jpg, not IMG_0048. The camera's numbers are for the camera, not for October.",
      ),
      ul([
        "Plug the phone in. Unlock it. Choose file transfer if asked.",
        "On the computer, make Pictures/practice-roll.",
        "Copy five photographs into it. Open one. Confirm you can see it with the cable unplugged.",
        "Rename one file to something you would search for. Leave the rest until you care.",
      ]),
      h2("What to keep, what to leave"),
      p(
        "You do not need every blurry plate of rice. You need the passport, the receipt, the group photograph from a funeral, the child's first day. Those get names. Screenshots of a bank OTP can go. WhatsApp images that were compressed twice can go if the original is already in Pictures. A full dump of DCIM is fine as a first backup; sorting can wait. What cannot wait is one copy off the phone.",
      ),
      p(
        "If there is no cable that works, email a few originals to yourself as documents, or use the computer's phone-link app if it already exists. Do not send the wedding through WhatsApp to “save them.” You will save a fog. And when the copy is on the computer, the next lesson but one — backup — is how that drawer survives a stolen laptop. For today: pocket to drawer, cable, copy, look, then maybe delete.",
      ),
    ],
  },
  {
    slug: "updates-without-panic",
    title: "Updates without panic",
    excerpt:
      "The restart is not a punishment. Save first, plug in the charger, let the bar finish. An update is a repair the machine already knows how to fetch.",
    series: SERIES,
    order: 13,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/windows-update.jpg",
    coverAlt: "A laptop screen showing a Windows restart and update message.",
    body: [
      p(
        "Sooner or later the computer will ask to restart. A bar will crawl. People pull the plug because the wait feels like a freeze, and then the machine wakes half-repaired, if it wakes. An update is not a virus. It is the manufacturer sending a patch for a hole someone found, or a fix for a printer, or a new date on the clock. This lesson is how to let that happen without losing the letter you had not saved.",
      ),
      p(
        "Windows calls it Windows Update. A Mac calls it Software Update. A browser updates itself more quietly. Phone updates are cousins: same idea, smaller screen. The feeling is the same — a request to stop working for ten minutes. Ten honest minutes beat a machine that will not start on Monday.",
      ),
      fig(
        "/images/blog/windows-update.jpg",
        "A laptop showing a message that Windows is restarting to finish an update.",
        "Do not hold the power button. Do not close the lid to “pause” it. The bar is working. Leave the charger in.",
      ),
      h2("Save, plug in, then say yes"),
      p(
        "When a box offers Restart now or later, look at your open windows first. Save every document. Unsaved work dies in a restart the same way it dies when the light goes. Then plug the laptop in. Updates that die at 12 percent because the battery died are how machines spend a day in the shop. On a desktop, ignore the generator for a moment only if you know the light is stable. If NEPA is flickering, choose later and wait for a calmer hour.",
      ),
      p(
        "Later is allowed. “Remind me in 4 hours” is a real button. What is not allowed is later forever. The machine will nag because the patch is sitting in the house unapplied, like medicine on the table. Pick an evening. Let it run while you eat. A long update can take twenty or forty minutes. The screen may go black. The fan may rise. A percentage may freeze at 37 for a while. Frozen is not the same as dead. Give it half an hour before you assume the worst.",
      ),
      h2("What you must not do while the bar is moving"),
      p(
        "Do not hold the power button. That is a force shutdown, and during an update it can leave Windows unable to start. Do not unplug. Do not close the lid hoping it will sleep; some laptops will sleep in the middle of a write. Do not start a download of something else “since the internet is on.” Sit. If you must leave the room, leave the machine open and charging.",
      ),
      fig(
        "/images/blog/update-wait.jpg",
        "A laptop on a wooden desk with an update in progress, a glass of water beside it.",
        "This is the work: waiting. The machine is copying files over itself. Interruptions here are how a quiet evening becomes a recovery screen.",
      ),
      ul([
        "Save everything that is open. Close the browser if you like; it is not required.",
        "Plug the laptop in. Start, type Windows Update, Enter. On a Mac, System Settings, General, Software Update.",
        "If updates are waiting, choose Download or Restart when you have twenty quiet minutes.",
        "Stay until the desktop returns. Sign in. Open one file to prove the house is still standing.",
      ]),
      h2("When it goes wrong, and when it is a trick"),
      p(
        "If the computer boots to a recovery screen after a failed update, do not click random options. Shut down if you can, plug in, start again, and wait. Windows often finishes on the second try. If it asks to restore to an earlier point, that is a last resort, not the first. At the academy, stop and ask. At home, a second restart is cheaper than a guessed reset.",
      ),
      p(
        "A page or a pop-up that says your Windows is expired and you must call a number, or download a repair tool from a banner, is not Windows Update. Real updates live in Settings, not in an advert. You already met this cousin in the lesson about links. Close the banner. Open Settings yourself. If nothing is waiting, nothing is waiting. Fear is a product someone is selling.",
      ),
      p(
        "Phones: at night, on Wi-Fi, charging. Let the system update. App stores can wait their turn. The principle is identical. Save what you can, give the machine a full cup of power, and do not snatch the cup away because the bar is slow. The bar is the repair.",
      ),
    ],
  },
  {
    slug: "backup-before-the-light-goes",
    title: "Backup before the light goes",
    excerpt:
      "One copy is a rumour. Two copies is a backup. A USB, a folder you named, and a date you will actually repeat.",
    series: SERIES,
    order: 14,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/backup-drives.jpg",
    coverAlt: "An external drive and a USB flash drive beside a laptop on a wooden desk.",
    body: [
      p(
        "A computer is a house that can burn. Theft, a dead drive, a cup of water, a format at the repair shop — any of these can empty Documents in an afternoon. The photographs you copied off the phone, the letter, the fees spreadsheet, the password notebook if you typed it: if they live in only one place, they are not kept. They are hoped. This lesson is the unglamorous habit of a second house.",
      ),
      p(
        "Backup is not the Recycle Bin. It is not emailing yourself a file once in 2023. It is a copy, on a different object, that you could open if the first object vanished. A USB flash drive is enough to start. An external hard disk is better for photographs. A cloud folder — Google Drive, OneDrive — is a second house that is not in the same room, which matters when the room is the thing that floods. You do not need all three on day one. You need one extra copy of the work you would cry about.",
      ),
      fig(
        "/images/blog/backup-drives.jpg",
        "A USB flash drive and an external hard drive beside a laptop and a stack of papers.",
        "Paper is a copy. The computer is a copy. The small drive is a copy. Two of these should hold the files that matter, and they should not all sleep in the same bag.",
      ),
      h2("What is worth copying"),
      p(
        "Not the whole machine. Not every installer in Downloads. The human work: Documents, Pictures you named, a Desktop if you still keep letters there against advice. School, church, shop, family. If you have a folder called 2026, copy that. If you have nothing named, this is the week to make the folders, then copy them. A jumble copied to a USB is still a jumble, but it is a jumble you still have.",
      ),
      p(
        "Do not back up the only copy of a password list onto a USB that lives in the laptop bag. If you keep hints in a notebook, leave the notebook in the drawer. If you use a password manager, its own backup is a separate conversation. The principle is the same: the key and the house should not travel together.",
      ),
      h2("The monthly hour"),
      p(
        "Plug in the USB. Open it. Open Documents. Copy the folders that changed. If the drive already has last month's copy, you can replace files with the same names, or keep a folder called 2026-09 and next month 2026-10, until the drive fills. Dated folders are easier to understand when you are frightened. Eject, as you learned. Put the drive somewhere that is not the laptop bag — a drawer, a different room, a trusted person's house if the files are a shop's whole year.",
      ),
      fig(
        "/images/blog/copying-files.jpg",
        "A young man copying files from a laptop to a USB drive at a small table.",
        "Watch the progress box finish. Open one file from the USB before you eject. A copy you have not opened is still a rumour.",
      ),
      ul([
        "List, on paper, three things you would hate to lose. Find them on the computer.",
        "Plug in a USB. Make a folder called backup-2026.",
        "Copy those three things into it. Open one from the USB. Eject.",
        "Write the next date on the calendar — a month from today — and the words copy the drawer.",
      ]),
      h2("Cloud, theft, and the repair shop"),
      p(
        "If you have a Google account, Drive can hold the same folders. That is a backup that survives a stolen bag, if you also had a password you can keep and a second lock on the phone. Use it for the small, important files first: the PDF of a certificate, the passport photograph, the fees sheet. A full photograph library will eat data and space; the cable-and-USB copy is still the workhorse in Port Harcourt when the network is tired.",
      ),
      p(
        "Before a machine goes to the shop, copy first. Say it out loud to the technician: the files have been copied; do not format unless you tell me. Shops format because it is fast. Fast is not your friend if the only wedding photographs were on that disk. After a theft, the backup is the whole point. If you have none, start now with whatever is left. The light will go again. The second house is how you do not start the letter from memory.",
      ),
    ],
  },
  {
    slug: "a-google-account-on-purpose",
    title: "A Google account on purpose",
    excerpt:
      "Gmail is a house you rent. Choose a name you can say on the phone, write it down, add a recovery number, and do not let a shop create it for you in a hurry.",
    series: SERIES,
    order: 15,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/account-form.jpg",
    coverAlt: "A laptop browser showing a simple account creation form.",
    body: [
      p(
        "Many people in this city have a Gmail address they cannot recite. A shop created it to “open WhatsApp,” or a nephew created it to download an app, and the password is a mystery. Then a school asks for email, and a second address is born, and a third. This lesson is how to make one Google account on purpose: a name you can say, a password you can keep, a phone that can catch the reset, written in the notebook from the keys lesson.",
      ),
      p(
        "Google is not the only house. Outlook and a school address are fine. Google is the one most phones, most Android shops, and most forms in Nigeria expect. If you already have an address you can sign into, and you wrote it down, do not make another. This page is for the person who has none, or who has one they do not own.",
      ),
      fig(
        "/images/blog/account-form.jpg",
        "A browser on a laptop showing a simple form for creating an account.",
        "Your name as it appears on paper, then a username you can spell aloud. If the name is taken, add a number you will remember — a year, not your birthday if you can help it.",
      ),
      h2("Walk there yourself"),
      p(
        "Open the browser. Type accounts.google.com in the address bar. Do not search “create gmail” and tap the first advert. You already know why. Click Create account, then For my personal use. Use your real first and last name — the one on your ID — because this address will sit on applications. A nickname can be the username; the profile name should be you.",
      ),
      p(
        "The username is the part before @gmail.com. Keep it boring and speakable: amaka.okoro, not xXxqueenxXx. You will dictate this over a bad line. If the name is taken, amaka.okoro.26 is better than a random string the page suggests. Avoid your full date of birth. Avoid a BVN. Write the finished address in the notebook before you continue. Read it back. That is the house name.",
      ),
      h2("Password, phone, recovery"),
      p(
        "Use a sentence password, as you learned, and not the same sentence as the bank. The next screen will ask for a phone number. Give the number you hold. That number is how you get back in when the password slips. A recovery email, if you have a second address you control, is extra rope. If you have none, the phone is the rope. Skip only if the page allows it and you understand you have less rope.",
      ),
      fig(
        "/images/blog/writing-address.jpg",
        "A young woman writing an email address into a notebook with a laptop open.",
        "If it is not in the book, it is not yours yet. Address, hint for the password, and the phone number you used for recovery. Drawer, not the laptop bag.",
      ),
      ul([
        "Go to accounts.google.com yourself. Create account.",
        "Choose a speakable username. Write the full address down before you click Next.",
        "Set a long password you have not used for the bank. Hint in the notebook.",
        "Add your own phone number. Finish. Then sign out and sign in once, from memory, to prove it.",
      ]),
      h2("What this account is for — and is not"),
      p(
        "This is your email, your door to Drive, and often the door to a phone's Play Store. It is not a public noticeboard. Do not type the password into a shop's computer and walk away signed in. If a technician must open the Play Store, stand there, sign in, let them work, sign out. “Remember this computer” is for your house, not theirs.",
      ),
      p(
        "You will be offered Gmail, Drive, Photos, a phone backup. You do not have to switch every tap on. Gmail is enough for today. Drive, when you are ready, is the cloud drawer from the backup lesson. Photos can eat data; wait until you mean it. If Google asks for a second step — a code on the phone — say yes. That is the second lock. You have met it before.",
      ),
      p(
        "If you already have an old address you cannot enter, do not start a maze of resets on a borrowed laptop. Sit at a machine you trust, try Forgot password once, and take the code on your own phone. If the recovery phone is a number you lost years ago, the account may be gone. Make a new one on purpose, write it down, and tell the school, the bank, and the academy the new house. One address, owned, is worth more than four that a shop still knows.",
      ),
    ],
  },
  {
    slug: "wifi-at-home-without-mystery",
    title: "Wi‑Fi at home without mystery",
    excerpt:
      "The router is a small radio. The laptop asks for the house name and the key on the sticker. If the internet dies, check the lights before you blame the website.",
    series: SERIES,
    order: 16,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/wifi-router.jpg",
    coverAlt: "A small home Wi-Fi router on a wooden shelf, a laptop in the background.",
    body: [
      p(
        "Wi‑Fi is a short radio conversation between a box in the house and the computer. The box is the router. The conversation is not the same thing as “the internet.” The internet is a pipe that arrives at that box — fibre, a SIM, a dish. Wi‑Fi is only the last few metres, through walls, to your laptop. When people say “the Wi‑Fi is down,” they often mean one of three different deaths. This lesson is how to tell them apart.",
      ),
      p(
        "The router usually lives near the door, on a fridge, or under the television. It has lights. Those lights are the first diagnostic, cheaper than a technician. Power light on means the box is awake. A light labelled WAN, Internet, or a globe means the pipe has arrived. Lights labelled WLAN or Wi‑Fi mean the radio is talking. If power is off, nothing else matters. If power is on and the internet light is off, the radio can still look busy while every website fails. That is a pipe problem, not a laptop problem.",
      ),
      fig(
        "/images/blog/wifi-router.jpg",
        "A small home router on a wooden shelf, laptop out of focus behind it.",
        "The sticker on the underside usually holds two facts: the network name (SSID) and the password. That sticker is the keyring. Do not throw the carton away until those two lines are in the notebook.",
      ),
      h2("Joining the house radio"),
      p(
        "On Windows, click the fan-shaped icon near the clock, bottom-right. A list of names appears. Those names are neighbouring radios — yours, the shop downstairs, a phone someone is sharing. Click yours. Type the password from the sticker or from the person who pays the bill. Click Connect. A padlock on a name means it wants a key. An open name with no padlock is a stranger's door. Do not use café Wi‑Fi for the bank. You already know why.",
      ),
      p(
        "The first time, Windows may ask “Is this a private network?” Private is home. Public is a shop. Private lets printers and folders see each other; public is ruder, which is what you want among strangers. On a Mac, the fan is top-right. Same list, same key. If the name is not in the list, you are too far from the box, the radio is off, or the name was changed and nobody told you.",
      ),
      fig(
        "/images/blog/wifi-list.jpg",
        "A laptop screen showing a list of available Wi-Fi networks.",
        "Your house name should look like the sticker, not like “Free_Fibre_Login.” If two names are almost the same, the extra one is often a trap or a neighbour. Ask someone who lives here which is ours.",
      ),
      h2("When the fan is empty, or full of strangers"),
      p(
        "No list at all usually means the laptop's own radio is off. On many machines a function key with the same fan symbol, used with Fn, toggles it. A tiny physical switch on older laptops does the same. Airplane mode, borrowed from phones, also mutes Wi‑Fi. Turn it off. Then wait ten seconds. Radios are not instant.",
      ),
      p(
        "Connected, but pages will not load: look at the router lights. Internet light dead — call the provider, or check the SIM in an LTE router, or the fibre box in the stairwell. Internet light alive — the problem may be DNS or a captive page. Open a new tab and type the provider's own site, or 1.1.1.1. If a login page appears (hotels, some estates), that page is the gate. Fill it. If nothing loads, restart the router: pull power, count to twenty, put it back. Restart the laptop only after that, and only if the box recovered and the laptop did not notice.",
      ),
      ul([
        "Find the router. Read the sticker. Write the network name and the key in the notebook.",
        "On the laptop, open the fan list. Connect to that name. Confirm a small “connected” under it.",
        "Open the browser and type cea.ng. If it loads, the pipe and the radio are both working.",
        "If it does not, look at the lights before you change any password.",
      ]),
      h2("Sharing from a phone, and forgetting a network"),
      p(
        "A phone can be a temporary router: hotspot, or tethering. That is useful when the house pipe is dead and you have data. It will eat the phone's battery and the bundle. Turn it off when the laptop is done. The hotspot name and password live in the phone's settings; they are not the house Wi‑Fi. Do not leave a hotspot named “Android” open without a key in a compound.",
      ),
      p(
        "If you typed the house password wrong too many times, Forget the network — in the same fan list, under the name, Forget — then join again slowly. Caps Lock is the usual villain, as it was on the keyboard lesson. And if a shop ever “set up Wi‑Fi” for you, change the sticker password in the router's own page later, or ask someone who already knows that page. A key the shop still knows is a key you do not fully hold.",
      ),
    ],
  },
  {
    slug: "shutdown-sleep-and-the-power-button",
    title: "Shut down, sleep, and the power button",
    excerpt:
      "Closing the lid is not the same as leaving. Sleep is a nap. Shut down is going home. Holding the power button is a shove, for when the machine will not wake.",
    series: SERIES,
    order: 17,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/shutdown-menu.jpg",
    coverAlt: "A laptop Start menu showing Shut down, Sleep and Restart.",
    body: [
      p(
        "People treat the laptop like a phone: close the lid, walk away, open it tomorrow. Sometimes that is sleep, and the letter is still there. Sometimes the battery died in the bag, and the letter is not. Sometimes the machine is hot because it never stopped working in the dark. The power button is not one action. It is several, depending on how long you hold it, and whether the machine was already awake. This lesson names those acts so you choose them.",
      ),
      p(
        "Awake is the sitting you already know: screen on, programs open. Sleep is a nap: the screen goes dark, the RAM keeps the work in a dim room, a small amount of battery still drains. Shut down is going home: everything closes, the disk rests, battery drain is tiny. Restart is going home and coming back immediately — useful after an update, or when a program is haunted. Hibernate, if you see it, is a deep sleep that writes the nap onto the disk so a dead battery does not erase it. Not every machine offers it.",
      ),
      fig(
        "/images/blog/shutdown-menu.jpg",
        "The Windows Start menu open to Shut down, Sleep and Restart.",
        "Start button, power icon, then the word you mean. Shut down closes the work. Sleep keeps it. Restart is the polite repair. The lid is none of these until you have checked what the lid is set to do.",
      ),
      h2("The lid, the nap, and the bag"),
      p(
        "On most laptops, closing the lid asks the machine to sleep. That is convenient at a desk. It is a bad plan in a school bag. The machine may not sleep. It may stay awake, fan running, and arrive hot, or dead. If you are moving, shut down, or at least click Sleep from the menu and wait until the lights go, then close the lid. Do not assume the click of the lid is a promise.",
      ),
      p(
        "To wake from sleep, open the lid and tap a key, or press the power button once — once, not a hold. The screen should return to the lock picture, then your desktop, programs still open. If it does not, the nap ended in a shutdown because the battery finished. That is why unsaved work is a rumour. Ctrl+S is still the cheaper insurance.",
      ),
      fig(
        "/images/blog/power-button.jpg",
        "Close-up of a laptop power button and the edge of the lid.",
        "One press wakes or starts. A long hold of five to ten seconds is a force shutdown — a shove. Use the shove only when the machine will not listen to Shut down.",
      ),
      h2("Shut down as a habit"),
      p(
        "End of the day, especially if light is unreliable: Start, power icon, Shut down. Wait until the screen is fully dark and the lights die. Then close the lid. That is how a machine survives a night of NEPA and a generator that coughs. Restart is the same menu. Use it when a program freezes, after an update, or when the sound, the Wi‑Fi, or the screen has gone strange. Restart is a smaller medicine than a shove.",
      ),
      ul([
        "Save every open document.",
        "Start, power icon. Look at the three words. Choose Sleep. Wait for the screen to go dark. Tap a key. Confirm your letter is still there.",
        "Then Start, Shut down. Wait for darkness. Press the power button once to start again.",
        "Do not practise the long hold today. Know it exists. It is for a frozen screen that ignores the menu.",
      ]),
      h2("When the screen is frozen"),
      p(
        "If the pointer will not move and Shut down will not open, wait thirty seconds. Some freezes are a disk catching up. Then try Ctrl+Alt+Delete — three keys together — which on Windows often offers Task Manager or a sign-out. If nothing, the long hold on the power button until the machine dies. Count slowly to ten. Then wait another ten before starting it. That shove can lose unsaved work. It should not be how you leave every evening.",
      ),
      p(
        "A desktop tower's power button is the same family: one press to start, one press often to sleep or to ask Windows to shut down, a long hold to force. The monitor has its own button; turning off only the screen is not shutting down the computer. The box under the desk may still be working, quietly, for hours. If you can hear the fan after you “left,” you have only darkened the window.",
      ),
    ],
  },
  {
    slug: "filling-a-form-on-a-website",
    title: "Filling a form on a website",
    excerpt:
      "A form is a paper with boxes. Tab moves to the next box. A red star means required. Submit once, then wait. The back button is how people pay twice.",
    series: SERIES,
    order: 18,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/web-form.jpg",
    coverAlt: "A laptop browser showing a simple web form with name, phone and email fields.",
    body: [
      p(
        "A website form is a paper with boxes that send themselves. School applications, JAMB, NYSC, bank KYC, the academy's own apply page — they all ask you to type into rectangles and then press a button that says Submit, Continue, or Pay. The fear is that a wrong click will send the wrong life. The usual disaster is smaller and more common: you press the button twice, or you leave a required box empty, or you use the back button in the middle of a payment. This lesson is how to treat the page like a clerk who can only read what is in the boxes.",
      ),
      p(
        "Walk to the real address yourself, as you learned. Bookmark it if you will return. Do not start a government form from a WhatsApp link you did not ask for. Have the paper beside you: ID, names as they appear on the ID, phone number, email you can open, a passport photograph already on the computer in Pictures. Hunting for a scan in the middle of a form is how sessions expire.",
      ),
      fig(
        "/images/blog/web-form.jpg",
        "A browser form with fields for full name, phone and email.",
        "One box, one fact. The little red star or the word required means the clerk will refuse the page without it. A greyed box is not rude; it is already filled or not yours to type.",
      ),
      h2("Moving through the boxes"),
      p(
        "Click the first box. Type. Tab — the key left of Q — jumps to the next box. Shift+Tab jumps back. That is faster than the mouse and less likely to click Submit by accident. Drop-down lists need a click, then an arrow key, then Enter. Date fields are troublemakers: some want day-month-year, some want you to pick from a calendar icon. Look at the grey example inside the box, if there is one. Do not invent a format.",
      ),
      p(
        "Checkboxes are squares; tick them only if you mean the sentence beside them. Round ones are radio buttons — one choice in the family, not all. CAPTCHA — “select the traffic lights” — is a gate against machines. Do it slowly. File upload boxes want Choose file, then the house you already know: Pictures, Documents. The name of the file should appear beside the button. If it does not, you have not attached anything. Look before you continue.",
      ),
      fig(
        "/images/blog/form-learner.jpg",
        "A young woman filling a form on a laptop, an ID card and notebook beside her.",
        "The paper is the source. Type names as they are printed, not as you prefer them. A mismatch with an ID is how applications bounce a month later.",
      ),
      h2("Required, errors, and the red text"),
      p(
        "When you press Continue and the page jumps, look for red text or a box outlined in red. That is the clerk pointing. Often it is a missing digit in a phone number, an email without the @, or a password that is “too short” by their rule, not yours. Fix the pointed box. Do not start the whole form again unless the page has gone blank. If the page has gone blank, your session may have expired — too many minutes idle. Open the real address again. Keep the paper. You are not starting your life over. You are typing.",
      ),
      ul([
        "Open a practice form — the academy apply page, or a site you already trust.",
        "Fill three boxes using Tab. Attach nothing you would not send.",
        "Leave one required box empty on purpose. Press Continue. Find the red text. Fill it.",
        "Do not press Submit twice. Watch the button. If it says Please wait or becomes grey, the clerk has the paper.",
      ]),
      h2("Submit once, especially when money is involved"),
      p(
        "The last button is the one that files you, or takes money. One click. Then wait. A slow network will tempt a second click. A second click is how people are charged twice or create two applications. If the page seems dead, look at the tab's little spinner. Count to sixty. If nothing, do not Back. Back in a payment is famous. Open a new tab, go to the same real site, and look for a dashboard, a receipt, or “already submitted.” If money left the bank and the site is silent, you have a receipt in the bank SMS — keep it, then use the site's own contact, not a number from a pop-up.",
      ),
      p(
        "Save or screenshot the success page if the site does not email you. Pictures, named. The form is finished when you have evidence, not when you feel finished. And if a page asks you to create a password for this one form, use a new sentence, write the hint, and do not recycle the Gmail key. Each house its own key. You have heard that before because it keeps being true.",
      ),
    ],
  },
  {
    slug: "a-video-call-without-panic",
    title: "A video call without panic",
    excerpt:
      "The link is a room. Mute is a kindness. Camera is optional more often than pride admits. Join five minutes early, from the real address, with the kettle elsewhere.",
    series: SERIES,
    order: 19,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/video-call.jpg",
    coverAlt: "Over-the-shoulder view of a laptop on a video call, earphones beside it.",
    body: [
      p(
        "A video call is a room that exists for an hour. Zoom, Google Meet, Microsoft Teams — three doors, same furniture: a camera, a microphone, a red mute button, and a link that should have come from a person you know. Classes, church, a job interview, a family meeting abroad. The panic is always the same: they can hear the generator, the camera is a nostril, the link does nothing. This lesson is a small ritual that makes the room ordinary.",
      ),
      p(
        "You need a link or a meeting ID, the internet you tested by opening a simple page, and a quiet-enough corner. Earphones with a mic are better than the laptop's own, because they reduce echo — that hollow barrel sound when two devices in one room listen to each other. A phone can join the same meeting. A laptop is easier to read a document on. Either works. Both at once, in the same room, with speakers on, is the echo.",
      ),
      fig(
        "/images/blog/video-call.jpg",
        "A laptop on a wooden desk showing a video call, earphones beside it.",
        "Join early. Check the preview of your own face before you enter. If the preview is black, the camera is covered, unplugged, or in use by another program. Close the other program.",
      ),
      h2("Entering the room"),
      p(
        "Open the link from email or from a calendar, on the computer you will use. If the browser asks to open the Zoom app, and you have the app, allow it. If you do not, there is almost always a choice that says Join from browser. Prefer the real host's link, not a forwarded bit.ly with no name. For Meet, the address looks like meet.google.com/three-words. Type that if the link is clumsy.",
      ),
      p(
        "Before you Join, the page usually shows a preview. Camera on or off is a toggle. Microphone on or off is another. Join muted if you are not speaking first — a class of thirty open mics is a market. Your name: type the name the teacher or the interviewer expects, not a nickname from gaming. Then Join. Waiting room means you are in a corridor. Sit. Do not join five times; that is five corridors.",
      ),
      fig(
        "/images/blog/mute-earphones.jpg",
        "Earphones and a laptop with a muted microphone icon on the screen.",
        "The mute icon is a microphone with a line through it. Red or struck-through means they cannot hear the kettle. Unmute only when it is your turn, then mute again. This is manners, not fear.",
      ),
      h2("Mute, camera, and the generator"),
      p(
        "Find mute as soon as you arrive. It is usually bottom-centre. Practise toggling it once if the host has not started. Camera off is allowed in most classes; in an interview, ask or follow what they do. Light from a window on your face is better than a bare bulb behind your head, which turns you into a silhouette. A virtual background is optional and often glitchy; a tidy wall is enough.",
      ),
      ul([
        "Put on earphones. Close extra tabs. Open cea.ng to prove the internet is alive.",
        "Five minutes before, open the real meeting link. Check preview. Join muted.",
        "Find the mute button. Find Leave or End — Leave is you going; End meeting is for the host.",
        "If they cannot hear you, unmute, then check the tiny sound settings: the right microphone, not “Stereo Mix.”",
      ]),
      h2("When you cannot get in"),
      p(
        "A link that does nothing: copy it, paste it into the address bar yourself. Still nothing: the meeting has not opened yet, or it has ended, or the ID is wrong by one letter. Message the host on the channel they already use — WhatsApp, email — not a second join every ten seconds. Camera not found: close WhatsApp Desktop or another app that might be holding the camera, then rejoin. Echo: mute the laptop speakers and use earphones, or mute one of the two devices in the room.",
      ),
      p(
        "Data: video eats a bundle. If the picture stutters, turn your camera off. Audio-only still counts as present. A phone hotspot will work for a short call and suffer on a two-hour class; sit near the house router if you can. And when it is over, Leave, then close the tab. A meeting left open in the background is a microphone you forgot. The room should not hear you after you think you have gone.",
      ),
    ],
  },
  {
    slug: "when-the-computer-is-slow",
    title: "When the computer is slow",
    excerpt:
      "Slow is usually a crowd, a full disk, or a dying drive. Close windows you cannot see. Restart is the polite medicine. A pop-up that sells a “cleaner” is not.",
    series: SERIES,
    order: 20,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/cluttered-windows.jpg",
    coverAlt: "A laptop on a wooden desk with many windows open.",
    body: [
      p(
        "A slow computer feels like insult. You click, nothing, you click again, then three windows open at once. Before you spend money, name the usual causes. Too many programs standing up at the same time. A disk so full the machine has no room to think. A browser with forty tabs, each a live market. Dust and heat, so the fan screams and the processor walks. Or a drive that is actually dying — clicks, freezes, a long stare at a blank desktop. This lesson is the cheap checks, in order, before a shop formats you into a new life.",
      ),
      p(
        "Heat first, because it is physical. If the laptop is on a bed or a cloth, the vents are eating fabric. Put it on a table. Feel the underside. If it is too hot to rest a hand, shut down, let it cool, then start again. A desktop's vents fill with dust in a year of Port Harcourt air; a careful vacuum at the grilles, machine off and unplugged, is allowed. Do not pour water. Do not open the case if you have not been shown.",
      ),
      fig(
        "/images/blog/cluttered-windows.jpg",
        "A laptop with many windows open on a wooden desk.",
        "Each window is a person standing in the room. Close the ones you cannot see. The programs along the taskbar at the bottom are still standing even if their windows are minimised.",
      ),
      h2("Close the crowd"),
      p(
        "Look at the taskbar — the strip along the bottom. Each icon is a program. Close the ones you are not using: the X on their window, not just a smaller bar. Browsers: close extra tabs. One tab of a video left playing overnight will slow tomorrow. On Windows, Ctrl+Shift+Esc opens Task Manager. You will see a list. CPU and Memory columns are the crowd noise. If a name you do not recognise is using 90 percent, select it, End task. Do not End task on anything called Windows Explorer or your unsaved Word until you have saved. When in doubt, restart instead.",
      ),
      p(
        "Restart, as you learned, is the polite medicine. Save, Start, Restart. A surprising number of “my computer is finished” stories end there. If slowness returns in ten minutes, it is not a mood. It is a program that starts itself, or a disk that is full.",
      ),
      fig(
        "/images/blog/task-manager.jpg",
        "A simple list of running programs on a laptop screen.",
        "Task Manager is a roll call. Sort by Memory or CPU. The top of the list is the crowd. End task on a browser you thought you had closed. Then see if the machine breathes.",
      ),
      h2("Room on the disk"),
      p(
        "This PC, then the C: drive. If the bar is red, or “a few GB free,” the machine is writing on the last scrap of paper. Empty Recycle Bin after you have looked. Delete installers in Downloads you have already used. Move photographs to the USB you use for backup. Do not delete folders named Windows or Program Files because they look large. They are the house. A shop “cleaner” advertised in a pop-up is the cousin of the fake update. You know that trap.",
      ),
      ul([
        "Save your work. Restart. Use the machine for ten minutes. If it is fine, you had a crowd.",
        "If it is still slow, open This PC and look at the C: bar. If it is red, move pictures to a USB.",
        "Open Task Manager. Note the top two names. Close those programs the ordinary way if you recognise them.",
        "If the disk clicks, or the machine freezes while saving, copy your Documents off today. That is a dying drive, not a mood.",
      ]),
      h2("When it is the drive, and when it is a salesman"),
      p(
        "A dying disk has a personality: long pauses, files that corrupt, a restart that hangs on the manufacturer's logo. Backup first — the whole point of the earlier lesson — then a shop. Tell them the files are copied. Ask them not to format until you say. A slow-but-healthy machine after a restart and a cleaner disk can live for years. Adding memory (RAM) helps some older laptops; that is a shop conversation with a price, not a pop-up.",
      ),
      p(
        "Ignore banners that say “your PC is 82 percent infected.” Real Windows Security lives in Settings, not in a flashing count. If a relative installed three toolbars and a lottery of free PDFs, those programs are the crowd — Uninstall from Settings, Apps, one by one, names you recognise as extras. When the machine is honest again, it feels like a different object. Usually it was only tired.",
      ),
    ],
  },
  {
    slug: "installing-a-program-on-purpose",
    title: "Installing a program on purpose",
    excerpt:
      "An installer is a guest you invited. Next is not the same as I agree to extra toolbars. Download from the real street, then walk through the boxes with your eyes open.",
    series: SERIES,
    order: 21,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/installer-window.jpg",
    coverAlt: "A laptop screen showing a simple software installer with a Next button.",
    body: [
      p(
        "A program is a tool that was not on the machine when you sat down. Word, a browser, a video player, the academy's own software if a course needs it. Installing is inviting that tool into the house. Uninvited guests arrive as pop-ups, “free converters,” and a shop that loaded three extras while fixing the screen. This lesson is the invited kind: you chose it, you fetched it from the real street, and you watch the boxes instead of tapping Next in a trance.",
      ),
      p(
        "You already know downloads land on the mat. An installer is usually a file named Setup, or the program's name plus .exe on Windows, or .dmg on a Mac. Double-clicking it starts a short conversation of windows. Those windows are not decoration. They are where extra toolbars, extra browsers, and a “partner offer” try to sit down beside the guest you wanted.",
      ),
      fig(
        "/images/blog/installer-window.jpg",
        "A simple installer window on a laptop, with a Next button visible.",
        "Read the sentence above the button before you press it. Next is “I saw this page.” I agree is a contract. A ticked box you did not tick on purpose is how a second program arrives.",
      ),
      h2("Fetch it from the real street"),
      p(
        "Open the browser. Type the address you already trust — the maker's own site, or the academy's instruction — not the first advert for “VLC free download fast.” You have met that cousin. If a page shouts DOWNLOAD in three colours, look at the address bar. A small, boring button on the maker's own page is usually the real door. Save the file. Open Downloads. Confirm the name looks like the program you asked for, not “setup_bundle_free.”",
      ),
      p(
        "Windows may then warn: “Do you want to allow this app to make changes?” That is User Account Control, a locked door. If you started the installer on purpose, Yes. If a window you did not start is asking, No. A Mac will similarly ask you to drag an icon into Applications, or to open a file from the internet; Open is fine when you fetched it. Do not fetch installers from a WhatsApp stranger. A USB from a friend is only as safe as that friend's habits.",
      ),
      fig(
        "/images/blog/install-usb.jpg",
        "A laptop on a wooden desk with a USB flash drive beside it.",
        "A USB can carry an installer when the network is tired. It can also carry guests you did not invite. Scan if you know how; otherwise use the maker's site when you can, and a known USB when you cannot.",
      ),
      h2("The boxes, walked slowly"),
      p(
        "Typical pages: welcome, licence, where to put the files, extra offers, install, finish. Licence is legal wallpaper; you will not understand it all. You should still notice a ticked box that says “set as default browser” or “install this toolbar.” Untick extras. Choose Custom or Advanced if the window offers Typical versus Custom — Typical is how extras hide. The folder it suggests, usually Program Files, is fine. Do not browse to Documents. Programs are not letters.",
      ),
      ul([
        "Pick one program you actually need — VLC for video, or LibreOffice if you have no Word. Walk to its real site.",
        "Download. Open the installer. Untick anything that is not the program's name.",
        "Finish. Find the new icon in Start. Open it once to prove it is the guest you invited.",
        "Delete the installer from Downloads if you like, after it works. The program now lives in the house, not on the mat.",
      ]),
      h2("When Windows blocks it, and when you should listen"),
      p(
        "SmartScreen may say “Windows protected your PC.” If you are on the maker's real site and you recognise the name, More info, then Run anyway. If you do not recognise the name, Close. That warning is not always a liar. It is a cautious clerk. Treat unknown installers as you treat unknown links.",
      ),
      p(
        "After install, a browser may have a new homepage you did not want. That is the extra guest. You will remove it in the next lesson. For today: one program, one purpose, eyes on the ticks. Installing is not dangerous because it is technical. It is dangerous because Next is easy.",
      ),
    ],
  },
  {
    slug: "uninstalling-what-a-shop-added",
    title: "Uninstalling what a shop added",
    excerpt:
      "Settings, Apps, the name you do not remember asking for. Uninstall is showing a guest the door. The Start menu is not the same as gone.",
      series: SERIES,
    order: 22,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/apps-list.jpg",
    coverAlt: "A Windows Settings list of installed apps on a laptop screen.",
    body: [
      p(
        "Machines come home from the shop with extra furniture: a “PC cleaner,” a second browser, a lottery of PDF tools, a trial antivirus shouting days remaining. Relatives do this too, with love. Each extra is a guest using chairs — memory, disk, a pop-up at breakfast. Uninstall is showing that guest the door. It is not the same as deleting a shortcut from the desktop. The shortcut is a sign on the street. The guest is still in the house.",
      ),
      p(
        "On Windows, the roll call lives in Settings. Start, type Apps, Enter — or Settings, then Apps, Installed apps. You will see a long list, newest or name. You will not recognise half of them. That is normal. Windows itself has many names. You are hunting for the extras: things you can say out loud as “I never asked for this.”",
      ),
      fig(
        "/images/blog/apps-list.jpg",
        "The Windows installed-apps list on a laptop.",
        "One row, one program. The three dots, or Uninstall, is the door. If you are not sure, write the name down and ask someone who uses the machine with you before you show it out.",
      ),
      h2("What you may show out, and what you must not"),
      p(
        "Safe to consider: toolbars, “optimizer,” “driver updater” that is not from the laptop's own maker, extra browsers you do not use if another browser still works, games a shop installed as a gift you do not want. Not safe to guess: anything with Microsoft, Intel, NVIDIA, Realtek, AMD in the name, or the laptop brand — HP, Dell, Lenovo, Acer. Those are often the hands and ears of the machine. When in doubt, leave it. A leftover trial is annoying. A missing driver is a black screen.",
      ),
      p(
        "Click the extra, Uninstall, follow the boxes. Some will plead “are you sure” and offer a survey. No thanks. Some will leave a “keep my settings” tick; for malware-adjacent junk, untick. Restart if it asks. Then look at the desktop. If a shortcut remains, delete the shortcut — that is only the sign. If the program is still in the Apps list, uninstall did not finish; try again, or restart first.",
      ),
      fig(
        "/images/blog/settings-learner.jpg",
        "A young man looking at a laptop settings screen in a modest room.",
        "Read the name twice. If you cannot tell whether it is Windows or a shop gift, leave it for a person who can. Uninstall is reversible only if you still have the installer and a reason.",
      ),
      ul([
        "Open Settings, Apps. Scroll slowly. Write down three names you do not remember installing.",
        "For each, decide: extra, or unknown. Unknown stays.",
        "Uninstall one extra you are sure of. Restart if asked. Confirm the name is gone from the list.",
        "If a browser homepage is still a stranger, that is Settings inside the browser — a later five minutes — not a reason to uninstall the browser itself.",
      ]),
      h2("The Start menu lie, and the leftover toolbar"),
      p(
        "Unpinning from Start, or dragging an icon to Recycle Bin, does not uninstall. It tidies the street. The guest still eats. Always return to the Apps list to know the truth. A toolbar that lives inside the browser may not even appear as its own app — look at the browser's Extensions or Add-ons, and remove the stranger there.",
      ),
      p(
        "If the machine is packed with extras you cannot name, this is a good moment for the backup lesson, then a more patient person, not a “one-click cleaner” from a banner. You already know that banner is a cousin of the fake update. Show guests out one at a time, names you can defend. The machine will feel lighter because it is, not because a percentage said so.",
      ),
    ],
  },
  {
    slug: "naira-and-accents",
    title: "Typing naira, accents, and another language",
    excerpt:
      "₦ is a character, not a drawing. A language in the taskbar is a second keyboard laid over the same keys. Alt codes and the emoji panel are how the symbol arrives.",
    series: SERIES,
    order: 23,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/naira-typing.jpg",
    coverAlt: "A document on a laptop showing the naira symbol and accented letters.",
    body: [
      p(
        "The keyboard in front of you is mostly English. Nigeria writes ₦, names with accents, and sometimes Igbo, Yoruba, or Hausa letters that the keys do not paint. People draw a N and overstrike it, or type NGN, or skip the mark on a name that should have one. The machine can do better. This lesson is how to ask it for a character that is not printed on the plastic.",
      ),
      p(
        "A character is a letter, a number, or a symbol the file can store. ₦ is one character. If you paste a picture of a naira sign into a spreadsheet, the grid cannot add it. If you type the character, it is money. The same is true of é in a French name, ọ in a Yoruba name, or a naira amount in a letter to a school.",
      ),
      fig(
        "/images/blog/naira-typing.jpg",
        "A document showing the naira symbol ₦ and accented letters on a laptop screen.",
        "The symbol is text. It will print, search, and sit in a PDF. A hand-drawn N with a line is a picture, and pictures do not add.",
      ),
      h2("₦ on Windows, without a fight"),
      p(
        "Several doors. The reliable one: hold the Windows key and press the full stop (period). A panel opens — emoji and symbols. Search naira, or scroll to ₦, click it. It lands where the cursor was. Another door, on many machines: hold Alt and type 8358 on the numeric keypad, then release Alt. Laptops without a keypad may need Fn and a printed number pad. If that is a maze, use the panel. In Word, Insert, Symbol, and find ₦. Once you have it, copy and paste it for the rest of the page.",
      ),
      p(
        "Google Docs and many websites accept the same paste. If a bank form rejects ₦, they want NGN or Naira as a word — obey the form. The symbol is for letters, invoices, and spreadsheets that know it. Do not fight a government box that was built in 2011.",
      ),
      fig(
        "/images/blog/keyboard-language.jpg",
        "Keyboard or language settings on a laptop screen.",
        "ENG in the taskbar is a language. Click it. A second keyboard — United States-International, or a Nigerian language pack — uses the same plastic for different marks.",
      ),
      h2("A second keyboard on the same keys"),
      p(
        "Windows: Settings, Time & language, Language & region, Add a language. English (United States) International, or Yoruba, Igbo, Hausa if you will type those daily. After it installs, look near the clock for ENG. Click it to switch, or hold Windows and press Space. International English lets you type an apostrophe then e to get é, and similar pairs for other accents. It will surprise you the first week — a quote mark that “swallows” the next letter. That is the accent waiting. Press Space if you wanted a plain quote.",
      ),
      ul([
        "Open Notepad. Press Windows and full stop. Insert ₦. Type a price.",
        "Add a second language you actually need, or skip if ₦ was the only gap.",
        "Switch with Windows+Space. Type your name as you want it on a letter.",
        "Switch back to ENG. Save as typing-naira in Documents.",
      ]),
      h2("Phones, and names that matter"),
      p(
        "On a phone, hold the letter key — e, o, a — to see accents. Hold N or the currency key if your keyboard offers ₦. Gboard and others have a symbols page. Use the character in WhatsApp if you like; use it in the Word letter if the letter will be printed. A name on an ID should match the form. Accents that the ID does not have can wait. Accents that the ID does have should be typed, not approximated, when the box allows it.",
      ),
      p(
        "You do not need every language pack. You need the marks you actually write. One extra keyboard, the naira in the panel, and the habit of checking ENG before you type a password — because a French layout will move where A and Q live, and a password typed on the wrong layout is a lockout. Glance at the taskbar. Then type.",
      ),
    ],
  },
  {
    slug: "the-recycle-bin-and-i-deleted-it",
    title: "The Recycle Bin and “I deleted it”",
    excerpt:
      "Delete is a cupboard, not a fire. Restore puts the file back. Empty is the real goodbye. Shift+Delete skipped the cupboard — look twice.",
    series: SERIES,
    order: 24,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/recycle-bin.jpg",
    coverAlt: "A Recycle Bin window on a laptop showing a few deleted files.",
    body: [
      p(
        "The first time a file vanishes under your own hand, the stomach drops as if the machine has judged you. Usually it has not. Delete, on a computer, is putting the paper in a cupboard by the door. The cupboard is the Recycle Bin on Windows, Trash on a Mac. Empty Recycle Bin is taking the cupboard to the fire. Until then, Restore is allowed. This lesson is that cupboard, the two deletes, and what to do when the cupboard was skipped.",
      ),
      p(
        "You met this briefly in the files lesson. People still panic because the file is not in Documents, so it must be gone. Look in the cupboard before you rewrite a letter from memory. Look before you pay a shop to “recover.” Recovery after Empty is a maybe, a disk that must not be used, and money. Recovery from the Bin is a click.",
      ),
      fig(
        "/images/blog/recycle-bin.jpg",
        "The Recycle Bin open, with a short list of deleted files.",
        "Date deleted is a gift. Sort by date if the name escapes you. Restore puts the file back where it was, or asks you where, if that folder is gone.",
      ),
      h2("Ordinary delete, and the one that skips the cupboard"),
      p(
        "Select a file. Press Delete, or right-click, Delete. It leaves Documents and appears in the Bin. The desktop icon for the Bin may look empty or full — a small change. Double-click it. Your file should be there. Restore. Close. Open Documents. Breathe.",
      ),
      p(
        "Shift+Delete — the Shift key held while you press Delete — skips the cupboard. Windows will ask “Are you sure you want to permanently delete?” Permanently is the fire. If you did that by accident and said Yes, stop using the machine for heavy work and ask someone about recovery the same day. Do not install a “free recovery tool” from a banner. That banner is an old acquaintance. At the academy, say what happened before you fill the disk with new downloads.",
      ),
      fig(
        "/images/blog/recycle-desktop.jpg",
        "A laptop desktop with the Recycle Bin icon visible.",
        "The icon is the cupboard door. If it is missing, the desktop was tidied; search Recycle Bin in Start. It is still there. A USB's delete is often already the fire — many flash drives do not have a bin.",
      ),
      ul([
        "Create a file called delete-practice in Documents. Type one sentence. Save.",
        "Delete it the ordinary way. Open the Recycle Bin. Restore it. Confirm it is back.",
        "Delete it again. This time Empty Recycle Bin only after you have looked. That file is gone. That is the point of the practice file.",
        "Never practise Shift+Delete on a real letter.",
      ]),
      h2("USB, photos, and other people's machines"),
      p(
        "Delete on a USB flash drive often does not use the Bin. The file is gone. Another reason copy is better than cut when you move photographs off a phone. Email attachments you “removed” from Gmail may sit in Trash on the mail site for thirty days — a different cupboard, in the browser, not on the desktop. Phones have their own recently deleted albums. Different rooms, same idea: look for a recently deleted before you despair.",
      ),
      p(
        "Empty the Bin when you have looked, and when you need the disk space from the slow-computer lesson. Do not empty it because a cousin said it “makes RAM.” It does not. It frees disk. If you empty weekly without looking, you will empty a tax file you deleted by accident on Thursday. Looking is the whole skill. The cupboard is kind until you set it on fire.",
      ),
    ],
  },
  {
    slug: "asking-for-help-without-the-password",
    title: "Asking for help without handing over the password",
    excerpt:
      "A helper can look. A helper does not need the keys. You type, they point. Remote “support” from a pop-up is not a nephew.",
    series: SERIES,
    order: 25,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/asking-help.jpg",
    coverAlt: "A learner at a laptop with a helper pointing at the screen, not typing.",
    body: [
      p(
        "Sooner or later the machine will confuse you, and another person will stand at your shoulder, or a voice on the phone will say “let me take over.” Help is good. Help that includes your Gmail password, your bank OTP, and a remote-control program from a pop-up is how the house is emptied. This lesson is the manners of asking: you keep the keys, they keep the knowledge, and the screen can be seen without being owned.",
      ),
      p(
        "At the academy, in a family, at a church office — a person you can see is the ordinary case. Let them sit beside you, not in your chair with you in the corridor. You stay signed in as you. You type the password, if one is needed, with their eyes elsewhere. They point. You click. That feels slower. It is how you still know your own machine on Tuesday.",
      ),
      fig(
        "/images/blog/asking-help.jpg",
        "A helper standing beside a learner, pointing at the laptop screen without taking the keyboard.",
        "Pointing is teaching. Taking the keyboard is doing it for you. Both can fix today's problem. Only one leaves you able to fix tomorrow's.",
      ),
      h2("What you never read out loud"),
      p(
        "Password. PIN. OTP from SMS. BVN. The numbers on the back of a card. Recovery phrases for anything. A real helper at a school or a shop that only needed to install a printer does not need those. If they ask, stop. A bank will not phone you to request an OTP. You have had that lesson. It does not change because the voice is kind, or because they know your name from a form you filled.",
      ),
      p(
        "If Windows needs an administrator password to install, and this is your machine, you type it. If it is an office machine, the office types it. If a “Microsoft support” number on the screen asks you to buy a voucher or to install AnyDesk, that is not Microsoft. Close. Real Windows help does not start from a red banner.",
      ),
      fig(
        "/images/blog/cover-password.jpg",
        "A notebook covering the keyboard while a password is typed, helper looking away.",
        "This is not rudeness. It is the same as not shouting a gate code in a bus. A helper who minds this is not a helper you want.",
      ),
      ul([
        "The next time someone helps, you sit, they stand or sit beside.",
        "They name the button. You move the mouse. If a password box appears, they look away. You type.",
        "If they need to type, they can — after the box is past. Watch what they install. Names you can repeat.",
        "When they leave, you should be able to say what changed: a printer, a setting, a program. If you cannot, ask them to say it once more before the door.",
      ]),
      h2("Remote help, shops, and the academy"),
      p(
        "Remote control — AnyDesk, TeamViewer, Quick Assist — means someone far away moves your pointer. Use it only with a person you already know, on a channel you already use, and watch the screen the whole time. When they are done, disconnect. Do not leave the program set to start forever. Do not give a code from a pop-up to a stranger who phoned you.",
      ),
      p(
        "A shop that asks to “just sign into your Google to test the Play Store” can test with a guest or with you standing there. You sign in, they work, you sign out. You met this in the Google-account lesson. Backup before the shop, as you also learned. And at the academy: ask. That is what the room is for. Bring the machine if you can. Bring the question in one sentence. Bring what you already tried. Keep the keys in your pocket. A person who will not teach without the password is offering a service you should not buy.",
      ),
    ],
  },
  {
    slug: "copy-and-paste-between-programs",
    title: "Copy and paste between programs",
    excerpt:
      "The clipboard is a small tray. Select, copy, click the other window, paste. It holds one thing at a time. That is enough to stop retyping your own address.",
    series: SERIES,
    order: 26,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/selected-text.jpg",
    coverAlt: "Selected text highlighted in a document on a laptop screen.",
    body: [
      p(
        "You met copy and paste on the keyboard lesson as two shortcuts. This lesson is the tray those shortcuts use, and the fact that the tray travels between programs. A sentence in a browser can become a sentence in Word. A number in a spreadsheet can become a number in an email. People retype because they do not trust the tray. Trust comes from watching it once.",
      ),
      p(
        "The clipboard is an invisible plate that holds one thing. Copy puts something on the plate. Cut puts it on the plate and removes it from where it was. Paste sets down whatever is on the plate, without emptying the plate — you can paste twice. Copy again, and the old thing falls off. There is no cupboard of yesterday's copies unless you install extra software. One plate is enough.",
      ),
      fig(
        "/images/blog/selected-text.jpg",
        "Text highlighted in a document, ready to copy.",
        "Selection is the first act. If nothing is highlighted, Copy has nothing to put on the plate. A blinking cursor alone is not a selection.",
      ),
      h2("Select, then copy, then the other window"),
      p(
        "Drag the mouse across the words, or hold Shift and tap the arrow keys. The words sit on a coloured block. Ctrl+C. Nothing looks different — that is correct. Alt+Tab, or click the other program's title bar, to go to Word or Gmail. Click where the words should land. Ctrl+V. The words arrive. If they do not, you either never selected, or you clicked somewhere that cannot receive paste — a picture, a locked PDF, a box that only wants a date.",
      ),
      p(
        "Pictures copy too. Click a picture in a page, Ctrl+C, then paste into Paint or Word. Websites sometimes block this. A screenshot, next lesson, is the fallback. Files copy in File Explorer the same way: select the file, Ctrl+C, open the other folder, Ctrl+V. That is how you filled the USB. The plate does not care whether it is holding a sentence or a photograph. It cares that you selected first.",
      ),
      fig(
        "/images/blog/copy-between.jpg",
        "A learner copying from a browser into a Word document.",
        "Two windows, one plate. The browser still has the original. Word has a copy. That is copy. Cut would have emptied the first window — useful for moving, dangerous for the only copy of a letter.",
      ),
      h2("Paste special, and the mess of formatting"),
      p(
        "Sometimes the words arrive in a wild font, with a blue underline and a yellow background from the website. That is formatting riding along. In Word, Home, Paste, then Keep text only — or Ctrl then a small menu — strips the costume. The words remain. When you paste into a form, the form usually strips it for you. When you paste into WhatsApp from a laptop, you may get extra blank lines. Delete them. The plate is not a designer.",
      ),
      ul([
        "Open a browser page you trust and a blank Word document.",
        "Select one sentence on the page. Ctrl+C. Click Word. Ctrl+V.",
        "Select a different sentence. Copy. Paste again. The first sentence is still in Word; the plate now holds the second.",
        "Save as copy-practice in Documents. You have stopped retyping.",
      ]),
      h2("What the plate will not do"),
      p(
        "It will not remember ten things unless you use Windows+V, which on newer Windows opens a clipboard history you can turn on. Until then, assume one thing. Do not copy a password, then copy something else, then expect the password still to paste into the bank. The plate moved on. And do not paste a password into a chat to “save it.” You know that room is the wrong room.",
      ),
      p(
        "If paste is greyed out, the plate is empty or the box refuses it. Copy again. If a website says “do not copy,” that is their wish; a short quote for a form is still ordinary work. Whole books are not. Use the tray for your own life: address, email, the sentence you already wrote. The machine is good at not making you write the same line twice. Let it.",
      ),
    ],
  },
  {
    slug: "taking-a-screenshot",
    title: "Taking a screenshot",
    excerpt:
      "The screen can photograph itself. Print Screen is the shutter. Snipping Tool is the crop. Save it in Pictures with a name, not as a rumour in the clipboard.",
    series: SERIES,
    order: 27,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/printscreen-key.jpg",
    coverAlt: "A finger near the Print Screen key on a laptop keyboard.",
    body: [
      p(
        "A screenshot is a photograph of the screen, taken by the machine. Receipts that will not download, an error message a shop should see, a timetable that exists only as a page — the shutter is faster than a phone pointed at the laptop, and sharper. People use the phone anyway because nobody named the key. The key is Print Screen, often PrtSc, PrtScn, or a camera-and-screen symbol. This lesson is that shutter, the crop, and saving so the picture is a file.",
      ),
      p(
        "A screenshot is not a scan of a paper. For an ID or a signed letter, a scan or a careful photo of the paper is still better. For something that already lives on the screen, photograph the screen from inside. You avoid glare, crop, and a thumb in the corner.",
      ),
      fig(
        "/images/blog/printscreen-key.jpg",
        "A laptop keyboard with the Print Screen key in reach.",
        "PrtSc is often above Insert, sometimes sharing a key with Fn. On many laptops you hold Fn then PrtSc. The screen may dim or a small notice may appear. That is the shutter firing.",
      ),
      h2("The whole screen, and one window"),
      p(
        "Press PrtSc (with Fn if needed). On older Windows, that only copies to the clipboard — the plate from the last lesson. You must paste into Paint or Word and then Save, or the photograph dies when you copy something else. On newer Windows, PrtSc may open Snipping Tool. Windows+Shift+S is the reliable crop: the screen greys, you drag a rectangle, the snip sits on the plate and often as a notice you can click to save.",
      ),
      p(
        "Alt+PrtSc copies the active window only — the one you last clicked — not the whole desktop. Useful when the desktop has a mess you do not want in the picture. Windows+PrtSc, on many machines, saves a file immediately into Pictures, Screenshots. That is the kindest version: a file, a folder, a name the machine chose. Rename it.",
      ),
      fig(
        "/images/blog/screenshot-file.jpg",
        "A screenshot image sitting in a Pictures folder on a laptop.",
        "A file in Pictures is a photograph you still have tomorrow. A snip that only lived on the clipboard is gone when you copy an address. Click the notice, Save as, human name.",
      ),
      ul([
        "Open a simple page. Press Windows+Shift+S. Drag across the bit you want.",
        "Click the notice if it appears, or open Paint and Ctrl+V.",
        "Save as practice-snip in Pictures. Close everything. Open the file. That is proof.",
        "Try Windows+PrtSc if your machine has it. Look in Pictures/Screenshots.",
      ]),
      h2("Errors, receipts, and what not to photograph"),
      p(
        "When something fails, screenshot the error before you click OK. The OK dismisses the only sentence a helper can use. When a payment page shows a reference, screenshot before you leave. When a form refuses a file, screenshot the red text. Do not screenshot a password, an OTP, or a bank balance to send in a group. Crop if you must send proof of a transfer — amount and reference, not the whole dashboard.",
      ),
      p(
        "Phones already know this gesture: volume down and power, or a swipe. Same idea. For a laptop problem, a laptop screenshot is clearer than a phone photo of the laptop. Save it, name it, then send it as a document if the other person must read the words. WhatsApp will squash it if you send it as a camera picture. You have heard that warning. It still applies to snips.",
      ),
    ],
  },
  {
    slug: "zipping-a-folder-to-email",
    title: "Zipping a folder to email",
    excerpt:
      "A zip is a suitcase. Many files become one. Attach the suitcase, not twenty photographs. The other person unzips on their desk.",
    series: SERIES,
    order: 28,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/zip-folder.jpg",
    coverAlt: "A File Explorer window showing a zip folder beside ordinary folders.",
    body: [
      p(
        "Email dislikes a crowd of attachments. Twenty photographs, each with its own paperclip, will bounce or clog. A zip is a suitcase: many files, one object, often smaller. Windows can make one without extra software. The other person double-clicks it, or right-clicks Extract, and the files come out on their desk. This lesson is packing, attaching, and not sending a suitcase of the wrong room.",
      ),
      p(
        "A zip is still a file. It has a name and a .zip at the end. It is not encryption unless you added a password, which Windows' simple zip does not really do well. Do not put secrets in a zip and call them safe. Put the school papers you were asked to send together, or the photographs of a filled form, front and back.",
      ),
      fig(
        "/images/blog/zip-folder.jpg",
        "A compressed folder named school-papers.zip beside ordinary folders.",
        "The zipper icon is the suitcase. The original folder is still there. You packed a copy. Delete the zip after it has arrived if you need the space; keep the originals in Documents.",
      ),
      h2("Packing"),
      p(
        "Put the files in one ordinary folder first — school-papers — so you know what is going in. Then right-click the folder, Compress to ZIP file, or Send to, Compressed (zipped) folder, depending on the Windows version. A new file appears beside the folder, same name, .zip. If the name is still highlighted, you can type a better one before you press Enter. school-papers-amaka.zip will still make sense in someone else's Downloads.",
      ),
      p(
        "Open the zip with a double-click if you want to peek. It looks like a folder but it is the suitcase interior. Do not work from inside it as if it were Documents — save and edit in the real folder, then pack again if you changed something. On a Mac, right-click, Compress. Same suitcase, same .zip.",
      ),
      fig(
        "/images/blog/zip-email.jpg",
        "A laptop ready to email, a USB and notebook on the desk.",
        "One paperclip, one zip. If the mailer refuses the size, the suitcase is still too heavy — fewer photographs, or a USB, or Drive as you learned in backup.",
      ),
      ul([
        "Make a folder called zip-practice. Put two small files in it.",
        "Right-click the folder, compress to zip. Confirm school-papers is still there as well as the zip.",
        "Email the zip to yourself. Download it on the same machine or another. Extract. Open a file.",
        "That round trip is the whole skill.",
      ]),
      h2("Too heavy, and unpacking someone else's suitcase"),
      p(
        "Gmail and many offices cap attachments around 20–25 MB. A zip of camera photographs can still exceed that. Then use Drive, or send two zips, or shrink pictures first. A bounced mail with no zip is a silent failure — watch for the failure message. If you were asked for PDF, do not zip a Word file and hope. Pack what they named.",
      ),
      p(
        "When someone sends you a zip: download, then right-click, Extract All, choose Documents, not Desktop if you can help it. Look at the files before you open a .exe inside a zip from a stranger. A suitcase can hold a guest you did not invite. You know installers now. A zip of PDFs and pictures is ordinary. A zip of setup.exe from a person you do not know is the link you should not open, wearing a zipper.",
      ),
    ],
  },
  {
    slug: "bluetooth-to-a-phone",
    title: "Sending a file to a phone with Bluetooth",
    excerpt:
      "Bluetooth is a short handshake. Pair once, send a file, turn it off. The cable is still better for a wedding. The radio is enough for one PDF across the desk.",
    series: SERIES,
    order: 29,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/bluetooth-share.jpg",
    coverAlt: "A phone and a laptop on a wooden desk, sharing a file over Bluetooth.",
    body: [
      p(
        "Bluetooth is a short radio, shorter than Wi‑Fi, meant for a handshake across a desk: earphones, a mouse, one PDF to a phone. It is not the internet. It does not use your bundle. It is slow for a folder of photographs and fussy about pairing. Use it when you have no cable, no data, and one file that must leave the laptop. Use the cable when you have many files. You already know that road.",
      ),
      p(
        "Pairing is introductions. Each device must be willing to be seen, then they exchange a code or a tap, then they remember each other for next time. If they will not see each other, they are too far, Bluetooth is off, or one is already busy with a speaker. Turn the speaker off in your head. Then try again.",
      ),
      fig(
        "/images/blog/bluetooth-share.jpg",
        "An Android phone and a laptop on a desk, ready to share a file.",
        "Both radios on. Phone discoverable. Laptop sending. The file is a document, not a stream. Stand them a hand-span apart the first time.",
      ),
      h2("Pair, then send"),
      p(
        "On the phone: Settings, Bluetooth, on, and Make visible or Pair new device. On Windows: Start, type Bluetooth, turn it on, Add device, Bluetooth. The phone's name should appear. Click it. Accept on the phone if a code matches. Paired is not sent. It is only introduced.",
      ),
      p(
        "To send: on Windows, right-click the file, Send to, Bluetooth device, choose the phone. Or Share if you see it. The phone should ask to accept. Accept. Wait. A 2 MB PDF is seconds. A 50 MB video is a kettle. If it fails at 90 percent, they drifted or a call interrupted. Send again. On a Mac, Bluetooth in Control Centre, send a file from the Bluetooth menu, or AirDrop if both ends are Apple — a cousin, easier when it works.",
      ),
      fig(
        "/images/blog/phone-received.jpg",
        "A phone showing a received document, laptop beside it.",
        "Find the file in Downloads, Bluetooth, or Files — not only in the notification. Open it once on the phone to prove it is not an empty name.",
      ),
      ul([
        "Turn Bluetooth on, both sides. Pair. Send one small PDF you own to yourself.",
        "Open it on the phone. If it is a letter, confirm you can read the words.",
        "Turn Bluetooth off on the laptop when you are done. The radio uses a little power and is one more door.",
        "If pairing fails twice, use the cable or email the file to the Gmail you can open on the phone.",
      ]),
      h2("When it is the wrong tool"),
      p(
        "A whole DCIM folder: cable. A file for someone in another city: email or Drive, not Bluetooth. Bluetooth will not stretch to the next street. Earphones pairing is the same radio — one pair at a time on many phones. If the laptop steals the earphones, disconnect them from the laptop's Bluetooth list.",
      ),
      p(
        "Do not leave the phone discoverable all day in a market. Pair, send, switch discoverable off. The file on the phone is now in the pocket. If it matters, copy it off the phone later, as you learned. Bluetooth moved it. It did not file it.",
      ),
    ],
  },
  {
    slug: "what-a-pdf-is-for",
    title: "What a PDF is for",
    excerpt:
      "A PDF is a photograph of a page that still lets you select the words. It will not rearrange itself on another computer. That is why offices ask for it.",
    series: SERIES,
    order: 30,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/pdf-letter.jpg",
    coverAlt: "A laptop screen showing a PDF of a one-page letter.",
    body: [
      p(
        "You have saved as PDF in the letter lesson and attached PDFs in email. This lesson is why the office asked. A Word file is a working notebook. Another person's Word can change the font, shift a heading onto a lonely last page, or refuse to open. A PDF is a finished plate: what you saw is what they print. It is the photocopier of the computer, except the words can still be copied if the sender allowed it.",
      ),
      p(
        "PDF means Portable Document Format. Portable is the point. Phones open it. Business-centre machines open it. A ten-year-old computer opens it. Forms from JAMB, banks, and schools arrive as PDF because they want the layout to survive. You fill a PDF form only if it was built as a form; many are just pictures of boxes, and you print, write, scan. Look before you type into the page.",
      ),
      fig(
        "/images/blog/pdf-letter.jpg",
        "A one-page letter opened as a PDF on a laptop.",
        "Same margins, same typeface, another machine. If a heading has slipped, it slipped on your computer first. Fix it in Word, then Save As PDF again. Do not “fix” a PDF in a panic unless you know a PDF editor.",
      ),
      h2("Making one, opening one"),
      p(
        "In Word: File, Save As, PDF. In Google Docs: File, Download, PDF. In a browser: Print, then Destination, Save as PDF — useful for a receipt that is only a page. Open the PDF after you make it. If it is two pages and you meant one, go back to the source. The PDF will not magically tighten. Print preview and PDF preview are cousins; trust them before you send.",
      ),
      p(
        "Double-click a PDF and Windows may open Edge, or Adobe, or another reader. Any of those is fine for reading. If nothing opens, you need a reader once — fetch it from the real street, as you learned to install. Do not fetch a “PDF professional crack” from a banner. Reading is free.",
      ),
      fig(
        "/images/blog/pdf-print.jpg",
        "A young man comparing a printed page with a PDF on a laptop.",
        "If they match, the portable page did its job. If the print is cut off, the margins were too tight in the original, not because PDF “shrunk it.”",
      ),
      ul([
        "Open a one-page letter. Save As PDF. Open the PDF. Confirm it is one page.",
        "Email it to yourself. Open it on the phone. Confirm the words are still words.",
        "In the browser, Print a simple page you trust, Save as PDF. Name it in Documents.",
        "Do not send the Word file as well “in case.” Send the one they asked for.",
      ]),
      h2("When PDF is the wrong tool"),
      p(
        "If someone must edit the words with you, send Word or Docs, or share a Drive file. A PDF is a finished plate. Editing it is possible and clumsy. If they asked for Excel, a PDF of the sheet is a picture of numbers that will not add. If they asked for a photograph of your face, a PDF is extra wrapping. Obey the request. Then PDF is for the letter, the certificate, the form that should not restyle itself overnight.",
      ),
      p(
        "A scanned pile of photographs in a PDF can be huge. One or two pages is a letter. Forty colour photos is a brick that email will refuse — zip, or Drive, or fewer pages. And a PDF from a stranger that contains only a link and a button is not a document; it is a cousin of the mail you should not open. Close it. Walk to the real street if the story might be true.",
      ),
    ],
  },
  {
    slug: "a-folder-for-school-or-work",
    title: "A folder structure for school or work",
    excerpt:
      "One drawer is not a filing system. School, then the year, then the kind of paper. Name the rooms before the term fills them.",
    series: SERIES,
    order: 31,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/folder-tree.jpg",
    coverAlt: "File Explorer showing nested folders named School, 2026 and Fees.",
    body: [
      p(
        "You know a folder is an envelope. This lesson is a small house of envelopes that will still make sense in March. People dump everything on the Desktop because the Desktop is the table they can see. By week six the table is a market stall: three files called assignment, a photograph of a receipt, a zip they never opened. Searching then feels like failure. It is only a house with no rooms.",
      ),
      p(
        "You do not need a masterpiece. You need three levels, named in words you would say to a person. School, or Work, or Church. Inside that, a year. Inside the year, the kinds of paper: Fees, Letters, Notes, Photos. That is enough to start a term. Extra rooms can wait until a pile appears.",
      ),
      fig(
        "/images/blog/folder-tree.jpg",
        "Nested folders: School, then 2026, then Fees.",
        "The path along the top of File Explorer is the address of the room you are in. Documents > School > 2026 > Fees is a sentence you can say aloud.",
      ),
      h2("Build the rooms once"),
      p(
        "Open Documents, not Desktop. Right-click, New, Folder. Name it School. Open it. New folder, 2026. Open that. New folders: Fees, Letters, Notes. If you run a shop, Work, 2026, Invoices, Receipts, Customers. If the academy is your whole computer life, one School tree is enough. Do not make a folder for every day. Daily rooms go stale and you stop using them.",
      ),
      p(
        "When you Save As, walk into the room on purpose. The left side of the Save window is the same house. Click Documents, then School, then 2026, then Fees. Then name the file. Two extra clicks now save twenty minutes in April. If you saved to Desktop by habit, cut the file — Ctrl+X — and paste it into the room. The Desktop is a table. Tables get cleared.",
      ),
      fig(
        "/images/blog/organizing-desk.jpg",
        "Paper files beside a laptop showing folders.",
        "The paper pile and the computer pile should use the same words. If the envelope says Fees, the folder should say Fees. Translation is how things go missing.",
      ),
      ul([
        "In Documents, make School, then 2026, then Fees, Letters, Notes.",
        "Move one real file into Fees — a receipt, a PDF, anything that belongs.",
        "Save a new one-line letter into Letters using Save As, walking the path.",
        "Look at the path at the top. Read it out loud. That is the address.",
      ]),
      h2("What not to invent"),
      p(
        "Do not name a folder Miscellaneous, or New folder (2), or Stuff. Those are unmarked boxes. Do not copy the entire Downloads mat into School. Downloads is still a mat; sort from it, do not bury it. Do not make both School and school — Windows may allow it to look different and then confuse you. One spelling.",
      ),
      p(
        "A USB backup should mirror the same words: backup-2026/School/…. When the laptop dies, you should not have to learn a second language. The rooms are the skill. The files will come. If a new kind of paper appears — Timetable, NYSC — add one room, not a new tree. The house stays small so you will actually walk through it.",
      ),
    ],
  },
  {
    slug: "renaming-files-without-breaking-them",
    title: "Renaming files without breaking them",
    excerpt:
      "The name is for you. The part after the last dot is for the computer. Change Chidinma-JAMB. Leave .pdf alone.",
    series: SERIES,
    order: 32,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/rename-file.jpg",
    coverAlt: "A file name highlighted in File Explorer, ready to type.",
    body: [
      p(
        "IMG_0048.jpg is a name a camera gave because it cannot care. document(3).docx is a name Word gave because you already had two documents. Neither will help you in October. Rename is how a file becomes a sentence. It is also how people hide a file from the computer by deleting the .pdf at the end. This lesson is the name, the dot, and the slow click.",
      ),
      p(
        "A file name has two parts. Everything before the last dot is yours. Everything after — pdf, jpg, docx, xlsx, zip — is the type. The computer uses the type to choose a program. If you turn receipt.pdf into receipt, Windows may ask which program should open it, as if you had handed it a letter with no envelope. If you turn it into receipt.docx, Word will try to open a PDF and fail in a language you will not enjoy.",
      ),
      fig(
        "/images/blog/rename-file.jpg",
        "A file name selected for renaming in File Explorer.",
        "Click once to select, then wait, then click the name — or press F2. If you double-click, you will open the file instead. Opening is not renaming. Escape cancels a rename you do not mean.",
      ),
      h2("The slow click, and F2"),
      p(
        "Click the file once. Pause. Click the name, not the icon. The name highlights. Type the new name. Watch the .pdf or .jpg at the end. If the type is highlighted too, do not type over it. Click once in the name, or press F2, which on many machines highlights only the name and leaves the type. Enter to confirm. Esc if you panicked.",
      ),
      p(
        "If Windows hides the type — “File Explorer Options, hide extensions” — turn that off so you can see the dot. View, Show, File name extensions, on modern Windows. Seeing the type is how you stop breaking it. A name you cannot see is a name you will damage.",
      ),
      fig(
        "/images/blog/file-names.jpg",
        "Two files with similar names on a laptop screen.",
        "document and document-final are a trap. fees-2026-03 and fees-2026-04 are a timeline. Dates and names beat the word final, which is never final.",
      ),
      ul([
        "Copy a practice file. Rename the copy to rename-practice.pdf or whatever type it actually is. Keep the type.",
        "Open it. If it opens as before, you renamed well.",
        "Rename it again to include a date: rename-practice-2026-09.",
        "Do not put a slash, a question mark, or a colon in a name. Windows will refuse, or worse, misread.",
      ]),
      h2("Characters that bite, and duplicates"),
      p(
        "Avoid / \\ : * ? \" < > | in names. They are commands to the computer, not decoration. Spaces are allowed but a-name-like-this travels better in some links. Accents are allowed; you learned those. A trailing space is a ghost that makes two files look identical. Keep names short enough to read in a narrow window.",
      ),
      p(
        "If a file is open in Word, rename will fail — “in use.” Close, then rename. If two files cannot have the same name in the same folder, that is the computer protecting you. Put them in different rooms, or date them. And if you already stripped a .pdf, rename and put the .pdf back. The file was not converted. It was only disguised. You did not lose the letter. You hid its envelope.",
      ),
    ],
  },
  {
    slug: "searching-for-a-lost-file",
    title: "Searching the computer for a lost file",
    excerpt:
      "Search is a clerk who can spell part of a name. Start in Documents, not the whole disk. One word you remember is enough if you named it like a human.",
    series: SERIES,
    order: 33,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/file-search.jpg",
    coverAlt: "File Explorer search box with results listed below.",
    body: [
      p(
        "A lost file is usually not lost. It is in Downloads, or on the Desktop, or in a folder you made in a burst of virtue and then forgot. Panic-clicking makes a second copy, then a third. Search is slower in the hands and faster in the outcome. This lesson is the search box, where to stand when you search, and what to do when the clerk shrugs.",
      ),
      p(
        "Windows has two clerks. The taskbar search looks at programs, settings, and some files. File Explorer's box, top-right of a folder window, looks in the room you are standing in, and its inner rooms. Start Explorer in Documents, then search. If you start at This PC, you will wait while it rummages through Windows itself, which is a large house of parts you do not want.",
      ),
      fig(
        "/images/blog/file-search.jpg",
        "The search box in File Explorer, with a few results.",
        "Type part of the name you gave it — fees, JAMB, amaka. You do not need the whole sentence. The clerk matches pieces.",
      ),
      h2("Stand in the right room"),
      p(
        "Open Documents. Click the search box. Type a word you are sure of. Wait for the green bar to finish. If nothing, try Downloads. Then Desktop. Then Pictures. Those four rooms hold almost all human work. If you used a USB last week, plug it in and search there too. A file on a flash drive is not in Documents, however much you remember saving “on the computer.”",
      ),
      p(
        "If you remember when, Explorer can sort results by date. If you remember it was a PDF, type .pdf in the box after a space, or use the filter chips Windows offers: Kind, Document. A word plus a type is a short question: fees .pdf. That is enough.",
      ),
      fig(
        "/images/blog/searching-laptop.jpg",
        "A young man searching on a laptop, notebook beside him.",
        "Write the words you already tried. Repeating the same search in the same room is not a strategy. Change the room or change the word.",
      ),
      ul([
        "Save a file named find-me-practice in Documents/School if you have that room, or in Documents.",
        "Go to Desktop. Search find-me. Confirm it does not appear, or appears as a path pointing at Documents.",
        "Go to Documents. Search find-me. Open it from the result.",
        "That is the difference between the whole market and the right stall.",
      ]),
      h2("When search finds nothing"),
      p(
        "You may have named it document. Search cannot invent a name you never gave. Think of a word inside the file — Windows can search inside many documents, slower. Think of the program: Word's Recent list, Excel's, the browser's downloads history. The last is a list of what landed on the mat, with dates. A bounced download may never have landed.",
      ),
      p(
        "Recycle Bin next, as you learned. Then the USB. Then ask: did I save at all, or only type? If the computer restarted without Ctrl+S, there is no file. That is not a search failure. After you find it, move it to the room it should have lived in, and rename it so next term's clerk has something to hold. Search is a rescue. Rooms are how you stop needing rescue every Friday.",
      ),
    ],
  },
  {
    slug: "start-menu-and-taskbar",
    title: "The Start menu and the taskbar as a map",
    excerpt:
      "Start is the front door. The taskbar is the row of rooms you are in. Pin what you use. Do not confuse a pin with the program itself.",
    series: SERIES,
    order: 34,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/start-menu.jpg",
    coverAlt: "The Windows Start menu open on a laptop.",
    body: [
      p(
        "Windows hides most of the house until you open the front door. That door is Start — the four squares, or the Windows logo, bottom-left. The strip along the bottom is the taskbar: clocks, Wi‑Fi, and the programs that are open or pinned. People hunt on the Desktop for Word because they can see icons there. Word may never have lived on the Desktop. It lives behind Start. This lesson is the map of the ground floor.",
      ),
      p(
        "Click Start. A list, a search box, a power button you already used to shut down. Type the first letters of what you want — word, excel, chrome, settings — and Enter. That search is faster than scrolling a mural of tiles. If you do this every day for one program, pin it, so the door remembers.",
      ),
      fig(
        "/images/blog/start-menu.jpg",
        "The Start menu open, search at the ready.",
        "Typing is allowed. Start is not only a grid of pictures. The box at the top is the same idea as searching for a file: a few letters, then Enter.",
      ),
      h2("Pin, unpin, open"),
      p(
        "Right-click a program in Start, Pin to Start, or Pin to taskbar. Taskbar pins sit on the strip even when the program is closed. Start pins sit in the menu. Neither moves the program; both are signs on the street, like shortcuts. Unpin if the strip is crowded. Right-click, Unpin. The program is still in the house. You have only taken down the sign.",
      ),
      p(
        "Open programs show a little line or a glow on their taskbar icon. Hover to see the window. Right-click the icon for a jump list — recent files in Word, extra windows. Clicking the icon of an open program minimises it, which is hiding, not closing. Click again to bring it back. The X on the window is close. The line on the taskbar is still in the room.",
      ),
      fig(
        "/images/blog/taskbar.jpg",
        "The Windows taskbar with Start and a few program icons.",
        "Clock and Wi‑Fi live at the right. Programs live at the left and centre. The empty middle is not broken. It is waiting for pins.",
      ),
      ul([
        "Open Start. Type notepad. Enter. Close it.",
        "Open Start, type notepad again, right-click, Pin to taskbar.",
        "Click the new taskbar icon. Close Notepad with the X. The icon stays. That is a pin, not an open program.",
        "Right-click, Unpin when you are done practising, or keep it if you write every day.",
      ]),
      h2("The tray, and a missing taskbar"),
      p(
        "The far right is the system tray: volume, network, battery, hidden extras behind a small arrow. Those extras are background guests. You met them when the machine was slow. You do not need to empty the tray tonight. Know that the fan of Wi‑Fi lives there, and the clock, and sometimes a tiny USB-eject icon.",
      ),
      p(
        "If the taskbar vanished, it may be set to hide: move the pointer to the bottom edge. If Start vanished after a shock, Ctrl+Esc often opens it, or the Windows key. If the whole bar is on the side, you or a helper dragged it; drag it back to the bottom from an empty stretch, after unlocking it if Windows asks. The map is ordinary. When it moves, it is almost never gone. It is only standing somewhere you are not looking.",
      ),
    ],
  },
  {
    slug: "a-shortcut-is-not-the-file",
    title: "A shortcut is not the file",
    excerpt:
      "The little arrow means a signpost. Deleting the signpost leaves the house standing. Deleting the real folder takes the house down. Look for the arrow.",
    series: SERIES,
    order: 35,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/shortcut-icon.jpg",
    coverAlt: "A desktop shortcut icon with a small arrow, beside a real folder.",
    body: [
      p(
        "A shortcut is a sign on the road that points at a house. The icon looks like the house. It is not the house. Windows draws a small arrow on the corner to say so. People delete a shortcut from the Desktop and think they have uninstalled Word, or they copy a shortcut to a USB and wonder why the letter will not open on another computer. This lesson is the arrow, how to make a sign on purpose, and how not to smash the house while tidying the street.",
      ),
      p(
        "A shortcut is a tiny file whose type is .lnk, often hidden. It stores an address: this program, this folder, this document. Double-clicking the sign is walking to that address. If the house moved, the sign still points at the old street, and Windows says it cannot find it. The file may be fine, in the room you moved it to. The sign is stale.",
      ),
      fig(
        "/images/blog/shortcut-icon.jpg",
        "A shortcut with a small arrow next to a real folder.",
        "Arrow: signpost. No arrow: the thing itself. On a crowded Desktop, look at the corner of the icon before you delete.",
      ),
      h2("Making a sign, not a second house"),
      p(
        "Right-click a folder or a file, Show more options if Windows 11 hides the list, Create shortcut. Or Send to, Desktop (create shortcut). A sign appears on the Desktop. The original stays in Documents. You have not copied the letter. You have put a sign on the table that points at the drawer. That is the right way to keep School in reach without emptying School onto the table.",
      ),
      p(
        "You can pin to the taskbar instead, as in the last lesson. Same idea: a sign. For a program, prefer pin. For a folder you open all day, a Desktop shortcut is fine. For a USB, copy the real files, not the shortcuts. A sign that points at C:\\Users\\… on your laptop is a dead sign on another machine.",
      ),
      fig(
        "/images/blog/desktop-shortcuts.jpg",
        "A laptop desktop with a few shortcut icons.",
        "A few signs are a map. Forty signs are a second junk drawer. If the Desktop is full, you are using signs as storage. Move the houses into Documents and leave two or three arrows.",
      ),
      ul([
        "In Documents, right-click your School folder, create a shortcut on the Desktop.",
        "Open the shortcut. Confirm you are in School. Look at the path at the top — it should still say Documents.",
        "Delete the shortcut from the Desktop. Open Documents. School should still be there.",
        "That is the whole difference between tidying a sign and demolishing a room.",
      ]),
      h2("When the sign is broken"),
      p(
        "“Missing shortcut” means the address inside the sign is wrong. Do not hunt the sign. Hunt the file with search, in the rooms you know. When you find it, delete the stale sign and make a new one if you still want it. Repairing a .lnk by hand is not a first-week skill.",
      ),
      p(
        "Copying a shortcut into email attaches a sign, not the letter. The other person receives a useless arrow. Attach the PDF, or the zip, as you learned. And when a shop Desktop is forty arrows plus five “cleaners,” you now know you can delete arrows without uninstalling Windows. Look for the arrow. If there is none, stop and ask. The house and the sign look alike on purpose. The corner of the icon is the truth.",
      ),
    ],
  },
  {
    slug: "volume-and-headphones",
    title: "Volume and headphones",
    excerpt:
      "Sound has a tap on the keyboard and a tap in the tray. Headphones steal the speakers until you unplug them. Mute is a line through the speaker, not a broken machine.",
    series: SERIES,
    order: 36,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/volume-keys.jpg",
    coverAlt: "Laptop keyboard with volume keys, a speaker icon on the screen.",
    body: [
      p(
        "Sound is a tap. Too open, and a video in a class becomes a market. Closed, and you think the machine is dead. There are at least two taps: the keys on the keyboard, often with a speaker symbol, and the speaker icon near the clock. They can disagree. Headphones are a third tap: plug them in, and the speakers often go silent on purpose. This lesson is how to hear what you meant, without a shop.",
      ),
      p(
        "On many laptops the volume keys share F1–F12 with other jobs. You hold Fn, then the key with the speaker. One key mutes, two raise and lower. A tiny on-screen bar should move. If it does not, Fn is inverted on that machine — try without Fn. The tray icon, bottom-right, is the same tap in another place. Click it. A slider. Drag. A speaker with a circle-slash is mute. Click it to unmute. Mute is not broken. It is a closed tap.",
      ),
      fig(
        "/images/blog/volume-keys.jpg",
        "Volume keys on a laptop keyboard, speaker icon on screen.",
        "The keys and the tray should agree. If the keys move a bar but you still hear nothing, the sound is going somewhere else — headphones, a mute inside the video, or a wrong speaker.",
      ),
      h2("Headphones, the jack, and Bluetooth"),
      p(
        "A wired headset uses a round hole, often with a headset symbol. Push in until it clicks. The speakers should stop. If they do not, the machine has not noticed — unplug, wait, plug again. If you hear nothing in the phones, they may be in a microphone-only hole, or the volume inside the video player is at zero. Two taps: Windows, and the program. Both must be open.",
      ),
      p(
        "Bluetooth earphones need pairing, as a phone did. When they connect, Windows may switch output to them without asking. If you then unpair and the laptop stays silent, click the tray speaker, the small arrow, and choose Speakers instead of the missing headphones. The machine is still sending sound down a path that left the room.",
      ),
      fig(
        "/images/blog/earphones-laptop.jpg",
        "Wired earphones plugged into a laptop on a wooden desk.",
        "Plugged in, the speakers often rest. Unplug fully — a half-seated jack is a famous silence. The hole is usually on the side, not the USB ports.",
      ),
      ul([
        "Play a short video you trust, volume low.",
        "Mute from the keyboard. Confirm silence. Unmute. Confirm sound.",
        "Plug in earphones if you have them. Confirm the speakers stop and the phones work.",
        "Unplug. If the speakers stay dead, click the tray speaker and choose Speakers.",
      ]),
      h2("The program has its own tap"),
      p(
        "YouTube, VLC, Zoom each have a volume slider. Windows can be loud and the video silent. Look for a speaker on the player. Zoom mute you already know — a different mute, for the microphone, not the speakers. Hearing others is the speaker tap. Being heard is the mic. People mix them up and shout at a silent room.",
      ),
      p(
        "If the whole machine is loud at night, lower the tray slider rather than hunting every program. If one program is loud and others are fine, open Volume mixer from the tray — a list of taps per program. That is the next lesson's cousin, when there is no sound at all. For today: keys, tray, headphones, then the player. Four places. Not a broken speaker until those four have been looked at.",
      ),
    ],
  },
  {
    slug: "brightness-and-night",
    title: "Brightness and night use",
    excerpt:
      "The screen is a lamp. Too bright in a dark room is a headache, not a better computer. A function key, a slider, and a battery that lasts longer when the lamp is dimmer.",
    series: SERIES,
    order: 37,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/dim-screen.jpg",
    coverAlt: "A laptop screen at low brightness in a dim room.",
    body: [
      p(
        "The screen is a lamp you look into. In a bright Port Harcourt afternoon you need that lamp high or you will lean in and guess. At night, in a room with one bulb, the same setting is a headache and a dead battery. People raise brightness as if it were volume for the eyes, then leave it there until the fan is loud. This lesson is the dimmer, night light if you have it, and why a dim screen is not a dying screen.",
      ),
      p(
        "Look for a sun symbol on the F-keys. Fn plus that key, up or down. A bar should appear. On a desktop monitor the dimmer is often a physical button on the screen's own frame, not on the keyboard — the computer can be “bright” in software while the monitor is dark. Two lamps, two taps, like volume.",
      ),
      fig(
        "/images/blog/dim-screen.jpg",
        "A laptop at low brightness in a dim room.",
        "A dim screen in a dim room is comfort. A dim screen at noon is a setting, or a dying backlight. Match the lamp to the room before you blame the machine.",
      ),
      h2("Settings, battery, and the false death"),
      p(
        "Windows: Settings, System, Display, Brightness. A slider. On battery, Windows may dim by itself to save power — useful, surprising if you did not know. Plug in, the screen may jump brighter. That is not a ghost. Some laptops have a conserving mode that caps brightness; look in the maker's power app only if the slider will not rise.",
      ),
      p(
        "A screen that is black but the computer is on — power light, fan — may be brightness at zero, or the lid switch, or an extra monitor stealing the picture. Raise brightness first. Then Fn plus the display-switch key if there is one. Then the second-screen lesson. Do not hold the power button yet. A black lamp is not always a dead house.",
      ),
      fig(
        "/images/blog/brightness-learner.jpg",
        "A young woman adjusting laptop brightness at a small table.",
        "Afternoon light wants more lamp. Evening light wants less. The battery lasts longer when the lamp is not at full shout.",
      ),
      ul([
        "Find the sun key. Lower brightness until the bar moves. Raise it again.",
        "Open Settings, Display, and find the same slider. Confirm they agree.",
        "If you have Night light — Settings, Display — turn it on for a minute. The page goes warmer. Off again if you dislike it.",
        "At night, prefer a dimmer lamp to a brighter one. Your eyes are not a weakness.",
      ]),
      h2("Night light, and not staring"),
      p(
        "Night light, or a blue-light filter, tints the screen yellow after sunset. It is optional. It does not repair sleep on its own. What repairs sleep is shutting down, as you learned, and not taking the lamp to bed at full brightness. A phone already taught you that. The laptop is a larger phone in this one way.",
      ),
      p(
        "If the screen flickers at one brightness and not another, that is a hardware conversation — a shop, after backup. If only one program is dark, it is not brightness; it is that window. And if a cousin set the contrast or inverted colours in Accessibility, Settings, Accessibility, Visual effects will undo it. The lamp has a dimmer. Use it like the one on the wall.",
      ),
    ],
  },
  {
    slug: "a-second-screen-or-projector",
    title: "A second screen or a projector",
    excerpt:
      "The picture can leave the laptop. Duplicate is the same page twice. Extend is two desks. The projector is just another screen with a long cable.",
    series: SERIES,
    order: 38,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/second-monitor.jpg",
    coverAlt: "A laptop connected by a cable to a small extra monitor.",
    body: [
      p(
        "A laptop has a screen. It can also send the picture down a cable to a monitor, a classroom projector, or a television. The first time, the extra screen is black, or the laptop goes black, or the picture is on the wall but the pointer is lost. None of that is failure of the course. It is a missing choice: duplicate, extend, or second screen only. This lesson is the cable, the key, and those three words.",
      ),
      p(
        "Look at the side of the laptop for HDMI — a wide, flat, notched plug — or USB-C. The projector or monitor uses a matching cable. Seat it fully. Turn the extra screen on. Wait. Windows may notice and copy the desktop by itself. If nothing, Windows+P. A small menu: PC screen only, Duplicate, Extend, Second screen only. Duplicate is what a class usually wants: the same page on the wall and on your desk. Extend is two desks — a pointer can vanish onto the wall while you look at the laptop. Second screen only blacks the laptop. PC screen only ignores the wall.",
      ),
      fig(
        "/images/blog/second-monitor.jpg",
        "A laptop cabled to a small extra monitor on a wooden desk.",
        "Cable in, extra screen on, then Windows+P. If the extra screen says No signal, the laptop is not sending, or the extra screen is on the wrong input — HDMI 1 versus HDMI 2.",
      ),
      h2("Duplicate for a room, extend for you"),
      p(
        "Teaching, church, a meeting: Duplicate. You see what they see. If the wall is cropped, the extra screen's resolution is different — Windows will often letterbox. That is all right. Extend is for spreading Word on one side and a browser on the other at a desk. The taskbar may run across both. Drag a window until it appears on the wall. If you lose a window, Windows+P, PC screen only, then Duplicate again. The window comes home.",
      ),
      p(
        "Sound may follow the picture to a television and leave the laptop silent. The volume lesson applies: tray speaker, choose the laptop speakers if you want the sound here. A projector in a hall often has no useful speakers; use the laptop or a cable to the hall sound if someone has set that up. You do not have to invent it on the morning of the talk.",
      ),
      fig(
        "/images/blog/projector.jpg",
        "A projector throwing a laptop picture onto a wall, laptop in the foreground.",
        "The projector is a lamp with a cable. Focus and keystone are on the projector, not in Windows. If the wall is blurry, twist the projector's focus ring before you change laptop settings.",
      ),
      ul([
        "If you have no extra screen today, still press Windows+P and look at the four words. Esc to leave.",
        "When you do have a cable: plug in, power the extra screen, Windows+P, Duplicate.",
        "Confirm the same picture in both places. Move the pointer. It should appear on both in Duplicate.",
        "When you unplug, the picture should return to the laptop. If the laptop stays black, Windows+P, PC screen only.",
      ]),
      h2("When the laptop goes black"),
      p(
        "Second screen only, left on after you unplug, is a famous black laptop. Windows still thinks the picture lives on a wall that has gone home. Windows+P, then the down arrow, then Enter on PC screen only — even if you cannot see it, it often works. Or close the lid, wait, open, or plug the extra screen back in to undo the choice. Do not format. Do not hold power yet.",
      ),
      p(
        "A church projector on VGA — older, blue, screws — may need an adapter on a new laptop. Adapters fail quietly. Try another cable before you blame Windows. And arrive twenty minutes early. The second screen is easy when it is easy, and a teacher of patience when the hall lights and the HDMI handshake disagree. Duplicate, then teach. Extend later, at your own desk.",
      ),
    ],
  },
  {
    slug: "usb-devices-that-are-not-flash-drives",
    title: "USB devices that are not flash drives",
    excerpt:
      "The same hole takes a mouse, a keyboard, a printer, a dongle. Plug in, wait, look at the lights. The computer usually knows the guest. You still have to seat the plug.",
    series: SERIES,
    order: 39,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/usb-devices.jpg",
    coverAlt: "A USB mouse, a keyboard, and a cable on a desk beside a laptop.",
    body: [
      p(
        "You used USB for a flash drive and for a phone cable. The same rectangular hole takes other guests: a mouse, a keyboard, a printer, a Wi‑Fi dongle, a camera. People buy a wireless mouse, lose the tiny USB nub, and declare the mouse dead. The nub was the radio. This lesson is plugging in a guest that is not a suitcase of files, waiting for Windows to nod, and what to do when the hole is too small.",
      ),
      p(
        "USB-A is the older wide plug. USB-C is the small oval that goes in either way. A mouse with USB-A will not fit USB-C without a cheap adapter. The adapter is not a trick. Ports on the left and right of a laptop are often the same family; one may be marked SS or a lightning bolt for charging. A printer usually wants a USB-A on the computer end and a square USB-B on the printer end. The cable is specific. The phone cable you already own may only charge, not talk, as you learned with photographs.",
      ),
      fig(
        "/images/blog/usb-devices.jpg",
        "A USB mouse, keyboard and cable on a wooden desk beside a laptop.",
        "Each guest uses the same family of holes. Seat the plug fully. A half-in mouse dongle is a mouse that works when you press the laptop and fails when you breathe.",
      ),
      h2("Plug in, wait, do not stack panic"),
      p(
        "Turn the device on if it has a switch. Plug in. Wait ten seconds. A mouse should move the pointer. A keyboard should type in Notepad. A printer may install quietly, then appear in Print. Windows may say “setting up a device.” Let it. If nothing, try another hole. Try another cable for printers. Wireless mouse: the dongle is often in the mouse itself, in a slot, for storage. Pull it out. Plug the dongle into the computer, not into a USB hub that is already full of hungry disks.",
      ),
      p(
        "A red X on a USB device in Device Manager is for later. For now: another port, another cable, restart. Bluetooth mice pair like earphones; they are not USB. Do not hunt a dongle that was never in the box. Read the carton once.",
      ),
      fig(
        "/images/blog/usb-ports.jpg",
        "USB ports on the side of a laptop with a small dongle plugged in.",
        "The tiny radio for a wireless mouse is easy to steal with a bag. When the mouse dies, look for the dongle before you buy a new mouse. It is often still in the last port you used.",
      ),
      ul([
        "Plug in a mouse if you have one, or unplug and replug the one you use. Confirm the pointer.",
        "If you have a spare keyboard, unplug the laptop's thought of an external one by seating it fully.",
        "Look at every port. Count the dongles. A spare hole is for the next guest, not for dust if you can help it — but a cover is fine.",
        "Do not force a plug upside down. USB-A only fits one way. USB-C fits both.",
      ]),
      h2("Printers, hubs, and power"),
      p(
        "A printer on USB still needs power of its own. Cable to the computer, power to the wall, paper in the tray, as in the printing lesson. A USB hub — one hole becoming four — is useful and can starve a hungry disk. Plug the disk into the laptop directly if it keeps disconnecting. Some hubs need their own power brick. That is written on the hub, not on Windows.",
      ),
      p(
        "Unplug by holding the plastic, not the wire. You already eject flash drives; a mouse does not need eject. A printer might — but closing the queue and turning the printer off is enough at this level. If Windows asks for a disc that did not come in the box, cancel and let Windows use its own driver first. A random driver from a banner is an old acquaintance. The hole is simple. The guest is simple. The wait is the skill.",
      ),
    ],
  },
  {
    slug: "when-there-is-no-sound",
    title: "When there is no sound",
    excerpt:
      "Silence has a checklist: mute, headphones, the wrong speaker, the player, then the driver. A pop-up “audio fixer” is not on the list.",
    series: SERIES,
    order: 40,
    author: AUTHOR,
    date: DATE,
    cover: "/images/blog/no-sound.jpg",
    coverAlt: "A young man looking at a silent laptop, earphones beside it.",
    body: [
      p(
        "No sound feels like a hardware funeral. Usually it is a closed tap, a pair of earphones Windows still believes in, or a video muted inside itself. You already have the volume lesson. This one is the order to walk when those taps failed, so you do not format a laptop because YouTube was quiet. The speaker inside a laptop is a small, cheap thing, but it rarely dies without a crack or a drowning first.",
      ),
      p(
        "Walk the list without skipping. Mute off, tray slider up. Unplug headphones, including a jack that was half in. Click the tray speaker, choose Speakers or the laptop's real name, not Headphones or HDMI when nothing is plugged in. Play a different file — a second video, a Windows test beep in Settings, Sound. If one video is silent and another is not, the first player is the tap. If everything is silent, keep walking.",
      ),
      fig(
        "/images/blog/no-sound.jpg",
        "A learner with a silent laptop, earphones on the desk.",
        "Earphones on the desk and Windows still set to Headphones is a classic. The machine is speaking into a plug that is empty.",
      ),
      h2("The mixer, and the HDMI thief"),
      p(
        "Right-click the tray speaker, Open volume mixer. Each program has a slider. One of them may be at zero. Raise it. If you had a projector or a TV connected, sound may still be hunting HDMI. Windows+P, PC screen only, then choose Speakers again. Restart after unplugging the extra screen if the list is haunted.",
      ),
      p(
        "Settings, System, Sound, Output. Pick the laptop speakers. Click Test. A chime should play. If Test is silent but the device is listed, a driver may have fallen over — Restart first, always Restart before a shop. If the list is empty, Windows cannot see a speaker. That is more serious, and still not a banner “fixer.”",
      ),
      fig(
        "/images/blog/sound-settings.jpg",
        "Windows sound settings or volume mixer on a laptop screen.",
        "Output is who hears. Input is who speaks — the microphone. Test the output. Do not uninstall the microphone to fix speakers. They are neighbours, not the same room.",
      ),
      ul([
        "Unplug headphones. Unmute. Slider up. Play a short video.",
        "Tray speaker, choose Speakers. Test in Settings, Sound.",
        "Open the mixer. Confirm no program is at zero.",
        "Restart. Try again. Only then ask a person, with what you already tried named in one sentence.",
      ]),
      h2("What not to download"),
      p(
        "A page that says “audio driver outdated — download now” from a pop-up is the same family as the fake update. Close it. Real driver updates live in Windows Update, or the laptop maker's own site, walked to on purpose. A shop can test the speaker with a known file in five minutes. Backup first if they will keep the machine.",
      ),
      p(
        "Bluetooth earphones connected and sitting in another room will steal output. Disconnect them. A USB headset still plugged in will do the same. Silence is almost always a path to the wrong door. Open the right door, then listen. If after restart, Speakers, mixer, and a second file you still hear nothing, and the laptop never cracked or drank water, then a helper. You will not have wasted their time. You will have already walked the house.",
      ),
    ],
  },
];
