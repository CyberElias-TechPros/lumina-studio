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
const AUTHOR = "Ellis Dennis Graham";

export const NOTES_AUTHOR = {
  name: AUTHOR,
  role: "Founder, Cyber Elias Academy",
  photo: "/images/team/ellis-dennis-graham.jpg",
};

/** Lesson 1 on 13 Jan 2026, then about every two and a half days through September. */
function lessonDate(order: number): string {
  const start = Date.UTC(2026, 0, 13);
  const ms = start + Math.round((order - 1) * 2.525 * 86_400_000);
  return new Date(ms).toISOString().slice(0, 10);
}

export const blogPosts: BlogPost[] = [
  {
    slug: "sitting-down-at-a-computer",
    title: "Sitting down at a computer for the first time",
    excerpt:
      "What the box in front of you actually is, how to wake it, and how to move the pointer without fear. The first hour, explained as if someone is sitting beside you.",
    series: SERIES,
    order: 1,
    author: AUTHOR,
    date: lessonDate(1),
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
    date: lessonDate(2),
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
    date: lessonDate(3),
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
    date: lessonDate(4),
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
    date: lessonDate(5),
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
    date: lessonDate(6),
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
    date: lessonDate(7),
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
    date: lessonDate(8),
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
    date: lessonDate(9),
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
    date: lessonDate(10),
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
    date: lessonDate(11),
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
    date: lessonDate(12),
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
    date: lessonDate(13),
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
    date: lessonDate(14),
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
    date: lessonDate(15),
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
    date: lessonDate(16),
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
    date: lessonDate(17),
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
    date: lessonDate(18),
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
    date: lessonDate(19),
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
    date: lessonDate(20),
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
    date: lessonDate(21),
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
    date: lessonDate(22),
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
    date: lessonDate(23),
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
    date: lessonDate(24),
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
    date: lessonDate(25),
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
    date: lessonDate(26),
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
    date: lessonDate(27),
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
    date: lessonDate(28),
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
    date: lessonDate(29),
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
    date: lessonDate(30),
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
    date: lessonDate(31),
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
    date: lessonDate(32),
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
    date: lessonDate(33),
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
    date: lessonDate(34),
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
    date: lessonDate(35),
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
    date: lessonDate(36),
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
    date: lessonDate(37),
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
    date: lessonDate(38),
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
    date: lessonDate(39),
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
    date: lessonDate(40),
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
  {
    slug: "charging-without-killing-the-battery",
    title: "Charging without killing the battery",
    excerpt:
      "The brick and the cable are two parts. Use the one that fits. Leave it on the table while it drinks. A red X on the battery is a story; a swollen pack is a shop the same day.",
    series: SERIES,
    order: 41,
    author: AUTHOR,
    date: lessonDate(41),
    cover: "/images/blog/laptop-charging.jpg",
    coverAlt: "A laptop charging cable plugged in on a wooden desk.",
    body: [
      p(
        "A laptop drinks through a brick and a cable. The brick is the heavy square that sits on the floor. The cable is the thin line to the wall, and the thicker line to the machine. People borrow a phone charger, or a cousin's brick that almost fits, and then wonder why the battery icon never moves. Wrong brick, or a cable that only looks right. This lesson is how to feed the machine without cooking it, and without the myths that say you must drain it to zero every time.",
      ),
      p(
        "Use the brick that came with the laptop, or one the maker named. The plug on the laptop side is particular — round with a pin, or USB-C. USB-C chargers from phones may trickle a little charge into some machines and starve others. If the brick is hot as a kettle, unplug. If the cable is broken at the elbow, tape is not a repair; a new cable is. Cheap copies from a market stall fail by melting, slowly.",
      ),
      fig(
        "/images/blog/laptop-charging.jpg",
        "A charging cable seated in a laptop on a wooden desk.",
        "Seat it fully. A half-in plug charges when the table is still and dies when you type. The brick should sit where air can reach it, not under a pillow.",
      ),
      h2("The icon, and the old story about zero"),
      p(
        "The battery icon near the clock tells the truth more often than a cousin. Plugged in, charging. Plugged in, not charging — the brick is wrong, the port is loose, or the battery is full and resting. Not plugged in, a percentage. At 20 percent, save and find a wall. At 5 percent, the machine will sleep itself and take unsaved work with it. You already know Ctrl+S.",
      ),
      p(
        "You do not need to drain to empty to “calibrate” every week. Modern packs prefer not to live at 0 percent. Leaving it on charge while you work is ordinary. Leaving it in a hot car at 100 percent for a month is not. If the maker offers a “care” slider that stops at 80 percent, that is a kindness for a machine that stays on the desk. Use it if you live at a desk. Ignore it if you live on NEPA and need the full tank.",
      ),
      fig(
        "/images/blog/battery-icon.jpg",
        "A laptop battery or charging icon on screen.",
        "A lightning bolt means drinking. A red X means Windows cannot see a pack, or the pack has retired. Look before you buy. A shop that “repairs battery in software” is selling a story.",
      ),
      ul([
        "Plug in the proper brick. Confirm the icon changes within a minute.",
        "Feel the brick. Warm is normal. Too hot to hold is unplug.",
        "Save a file. Unplug. Confirm the percentage is visible. Plug in again.",
        "Do not twist the cable at the port. Hold the plastic.",
      ]),
      h2("Swollen, wet, and the generator"),
      p(
        "If the trackpad no longer sits flat, or the lid will not close, the pack may be swollen. Stop using it. Do not puncture. A shop, same day, after you copy files off if the machine still boots. Water in the port: unplug, dry, wait. Do not blow-dry on hot. A generator's wild voltage can kill a brick; a small surge protector is cheaper than a motherboard. That is household wisdom, not a gadget cult.",
      ),
      p(
        "A desktop does not have this pack. It still wants a good cable to the wall, and a UPS if the light dances. The laptop is just a desktop with a tank. Fill the tank with the right hose. Do not sleep with it charging under a duvet. Heat is the next lesson. Charge on the table, like a kettle on a counter, not in a bed.",
      ),
    ],
  },
  {
    slug: "heat-and-the-vents",
    title: "Heat and the vents",
    excerpt:
      "The fan is a lung. Beds and cloths are pillows over the lung. A table, a few centimetres of air, and a shutdown when it is too hot to touch.",
    series: SERIES,
    order: 42,
    author: AUTHOR,
    date: lessonDate(42),
    cover: "/images/blog/laptop-vents.jpg",
    coverAlt: "Laptop side vents on a wooden desk.",
    body: [
      p(
        "A laptop makes heat the way a generator makes heat: work. The vents are how it breathes. Put the machine on a bed, a prayer mat, a sofa, and the cloth blocks the vents. The fan screams. The machine slows, as you saw in the slow-computer lesson. Then it dies in the middle of a letter. This lesson is where the lungs are, what not to sit them on, and when heat is a warning rather than a personality.",
      ),
      p(
        "Look at the sides and the underside. Slits, a grille, sometimes a sticker that already peels into the grille. Those must see air. A hard table is enough. A “cooling pad” is optional. A stack of books that leaves the grille in space is a village solution that works. A closed bag with the machine on is a slow oven. If you must move, shut down first.",
      ),
      fig(
        "/images/blog/laptop-vents.jpg",
        "Laptop vents on a wooden desk, not covered.",
        "Dust loves Port Harcourt. A dry brush on a cool, unplugged machine is allowed. A knife in the grille is not. Water is not.",
      ),
      h2("The bed is the enemy"),
      p(
        "Laptops on thighs for ten minutes are a habit. Laptops on duvets for an hour are how fans eat lint. If the underside is too hot to rest a hand, shut down, lift it onto a table, wait. Do not pour water on it. Do not put it in a fridge. Cold drinks next to it are how keyboards drink. Heat leaves through air, not through drama.",
      ),
      p(
        "When the fan is loud and you are only typing a letter, something else is working — a download, an update, a browser with too many tabs. Save, close the crowd, listen again. If the fan is loud at rest, on a table, after a restart, that is dust or a dying fan. Backup, then a shop. A shop that “re-pastes” is sometimes telling the truth. Ask the price first.",
      ),
      fig(
        "/images/blog/laptop-on-bed.jpg",
        "A laptop on a bedspread, with a clear table nearby.",
        "The table is the right desk. The bed is comfortable for you and hostile to the vents. Move the machine, not your whole life.",
      ),
      ul([
        "Turn the laptop over, unplugged and off. Find the grille. Remember its face.",
        "Work on a table for one sitting. Notice the fan.",
        "If you have been on a bed, move to the table and wait one minute. The pitch of the fan should fall.",
        "Never block the grille with paper under the machine “to look neat.”",
      ]),
      h2("Outdoor sun, and the car"),
      p(
        "Direct sun on a black lid is a second heater. Shade, even a veranda, is better. A closed car at noon will cook a pack until it swells. Take the machine with you, or do not leave it there. This is not delicate. It is the same as not leaving a bottle of perfume on a dashboard.",
      ),
      p(
        "If Windows says it is too hot and goes off, believe it. Let it cool on a table, lid open a little, before you start again. Starting immediately to “see if it works” is how you meet a shutdown loop. Heat is a message. The vents are the mouth. Give them air.",
      ),
    ],
  },
  {
    slug: "the-webcam-and-who-can-see-you",
    title: "The webcam and who can see you",
    excerpt:
      "The camera is a hole at the top of the screen. A light means it is looking. A cover is a curtain. Off in the meeting is not the same as a closed curtain.",
    series: SERIES,
    order: 43,
    author: AUTHOR,
    date: lessonDate(43),
    cover: "/images/blog/webcam-cover.jpg",
    coverAlt: "A laptop webcam with a small sliding privacy cover closed.",
    body: [
      p(
        "At the top of the screen, a small eye. That is the webcam. You used it, or will, in a video call. It can also look when you did not mean it to, if a program asks and you say yes forever, or if a site talks you into allowing the camera for a “preview.” This lesson is the light, the permission, a paper curtain, and the difference between camera off in Zoom and actually covered.",
      ),
      p(
        "Many laptops light a tiny lamp beside the lens when the camera is on. Believe the lamp. If the lamp is on and you are not in a meeting, close the program that is looking — often a leftover browser tab, or a shop's “test.” Task Manager, if you must. A cover — a sliding plastic, a sticker you can lift, a bit of tape you do not love — is a physical no. Software can lie. Tape cannot.",
      ),
      fig(
        "/images/blog/webcam-cover.jpg",
        "A sliding privacy cover closed over a laptop webcam.",
        "A curtain. Open it when you join a call. Close it when you leave. Tape works. Muddy tape that never comes off is how people fail interviews. Use something you will actually move.",
      ),
      h2("Permission is a yes you can take back"),
      p(
        "Windows: Settings, Privacy & security, Camera. A list of programs allowed to look. Turn off the ones you do not recognise. A browser may ask, site by site. Allow for a class. Deny for a random page that wants to “verify you are human” with your face. You can walk. The same list exists for the microphone. They are neighbours. Treat them both as doors.",
      ),
      p(
        "In a meeting, camera off is polite and not the same as covered. A bug, a wrong click, or a host who “enables video” can still open the eye if the cover is off. Cover after class if you share a room with family in the background. You do not owe a stranger your unmade bed.",
      ),
      fig(
        "/images/blog/webcam-preview.jpg",
        "A young woman in a camera preview on a laptop.",
        "Preview before Join, as in the video-call lesson. If the preview is you, the curtain is open. If you did not mean that, close the curtain, then the permission.",
      ),
      ul([
        "Find the lens. Cover it with a finger. Open the camera app or Meet preview. Confirm you see dark, not your finger's skin if the cover is opaque.",
        "Open Settings, Camera. Read the list of allowed programs. Switch off one you do not use.",
        "Join nothing. Confirm the lamp is off.",
        "A sticky note folded once is a curtain if you have no slider. Do not use wet glue.",
      ]),
      h2("Other people, and shops"),
      p(
        "A shop testing a camera should do it in front of you. A “support” person on the phone who needs the camera on while they remote-control the machine is the password lesson wearing a lens. No. Family sharing a laptop: a cover is kinder than an argument. Children: the cover is not a toy. It slides for a reason.",
      ),
      p(
        "You are not being asked to fear the eye every minute. You are being asked to know when it is open. Light, permission, curtain. Three checks. Then use the camera on purpose, as you use the microphone on purpose. The machine looking without you is a guest you did not invite. Show it the door.",
      ),
    ],
  },
  {
    slug: "cookies-and-accept-all",
    title: "Cookies and “Accept all”",
    excerpt:
      "A cookie is a small note a site leaves on your machine. Accept all is a long signature. Necessary is often enough. You can refuse a fair without refusing the page.",
    series: SERIES,
    order: 44,
    author: AUTHOR,
    date: lessonDate(44),
    cover: "/images/blog/cookie-banner.jpg",
    coverAlt: "A cookie consent banner at the bottom of a browser window.",
    body: [
      p(
        "A banner at the bottom of a page: Accept all, Reject, Manage. People tap Accept all because it is the big button, then wonder why every shop on the internet seems to know they looked at a generator. A cookie is a small note the site stores on your computer so it can remember you — logged in, a language, a cart. That can be useful. “All” often includes notes for other companies, tracking you from page to page. This lesson is the banner, the difference between necessary and advertising, and when to clear the notes.",
      ),
      p(
        "Necessary or essential cookies are how a login stays a login while you move from page to page. Without them, a site may forget you at every click. Functional ones remember a language. Analytics count visitors. Advertising and “partners” are the fair. If the banner offers Reject all or Necessary only, that is usually enough to read the news. If it offers only Accept, and the page is a shop you need, you may have to accept to enter. That is a cost. Know you paid it.",
      ),
      fig(
        "/images/blog/cookie-banner.jpg",
        "A cookie banner at the bottom of a webpage.",
        "The large button is not always the kind one. Look for Reject, Necessary, or Manage. Manage is extra taps and worth it on sites you will live on.",
      ),
      h2("Manage, and what you are signing"),
      p(
        "Manage, or Cookie settings, is a list of taps. Turn advertising off. Turn necessary on — you often cannot turn it off. Save. The banner should leave. If it returns every visit, the site is rude, or you are blocking too much and it cannot remember even your “no.” Allowing necessary is how “no” sticks.",
      ),
      p(
        "A cookie is not a virus. It is not a program. Clearing cookies logs you out of Gmail and shops until you sign in again. That can be a kindness on a shared computer. It is a nuisance on your own if you do it daily. You do not need a “cleaner” app to wipe cookies. The browser can do it.",
      ),
      fig(
        "/images/blog/cookie-dialog.jpg",
        "A browser with a privacy or cookies dialog open.",
        "Settings, Privacy, Cookies. A list, a clear button. Clearing “all time” is a full reset of those notes. Clearing “last hour” is a smaller broom.",
      ),
      ul([
        "Open a news site you trust. When the banner appears, find Reject or Necessary. Do not Accept all today.",
        "Confirm the page still reads.",
        "In the browser settings, find Cookies. You do not have to clear them now. Know the door.",
        "On a site you must use that offers no reject, Accept, then remember it is a shop with a guest book.",
      ]),
      h2("Shared machines, and fear"),
      p(
        "On a business-centre computer, do not Accept all, then leave. Sign out of mail. Close the browser. If you can, clear cookies for the hour. You already know not to remember this computer. Cookies are part of that remembering. Your own laptop can keep the notes for sites you live in. A stranger's laptop should forget you.",
      ),
      p(
        "Ignore pages that say “your cookies are corrupted — download repair.” That is the fake update again. Cookies do not need a doctor from a banner. They need a choice on the banner of the site you meant to visit, and a clear button in your own browser when the computer is not yours. Accept all is easy. Easy is how the fair gets your name.",
      ),
    ],
  },
  {
    slug: "a-browser-profile-on-a-shared-computer",
    title: "A browser profile on a shared computer",
    excerpt:
      "A profile is a schoolbag. Yours holds your mail and your passwords. Guest is a bag that empties. Sign out is not as empty as you think. Use Guest, or your own bag, not the house bag.",
    series: SERIES,
    order: 45,
    author: AUTHOR,
    date: lessonDate(45),
    cover: "/images/blog/browser-profile.jpg",
    coverAlt: "A browser profile icon in the corner of a laptop window.",
    body: [
      p(
        "A family laptop, a church office, a shop counter — one browser, many hands. If everyone uses the same Chrome window, everyone can open your Gmail with a click, because you stayed signed in. A profile is a separate schoolbag inside the browser: bookmarks, cookies, logged-in sites. Guest is a bag that throws itself away when you close it. This lesson is how to stop leaving your keys in the house bag.",
      ),
      p(
        "In Chrome or Edge, the circle at the top-right is the person. Click it. You may see your name, Guest, Add. Add is a new bag with its own name — yours. Guest is for the cousin who wants to check one thing. When they close the Guest window, their trail goes. Your bag stays shut if you did not open it. That is the point.",
      ),
      fig(
        "/images/blog/browser-profile.jpg",
        "The profile icon in the corner of a browser.",
        "The circle is whose bag is open. If it says a sibling's name, you are in their mail if they stayed signed in. Switch. Do not rummage.",
      ),
      h2("Your bag, Guest, and the house"),
      p(
        "Create a profile with your name. Sign into Gmail only there. Set a browser profile lock if the machine offers it — a second password just for the bag. Windows sign-in is even better: each person their own Windows user. That is a later, larger room. Profiles are the cheap curtain that works today.",
      ),
      p(
        "Sign out of Gmail is not the same as closing the bag. Sign out, then close. On a business-centre machine, do not use your profile at all. Guest, or the machine as you found it, then close every window. Do not tick “remember me.” You have heard that. The profile is how “remember me” becomes a trap at home as well as in a café.",
      ),
      fig(
        "/images/blog/shared-computer.jpg",
        "Two people taking turns at one laptop in a modest room.",
        "Turns are fine. One bag for all is how a brother sends mail as you. Guest, or a named profile, then close.",
      ),
      ul([
        "Open the browser. Click the circle. Add a profile with your first name, or open Guest.",
        "In Guest, visit a site. Close the Guest window. Open the browser again. Guest should be empty.",
        "If this is your machine, keep your named profile. Do not work in the Default bag if others use it.",
        "Never save a bank password in a profile that is not locked.",
      ]),
      h2("Passwords saved in the browser"),
      p(
        "The browser will offer to remember passwords. On your locked profile, on your laptop, that can be a help — one more keyring, with a risk if someone opens the bag. On a shared profile, never. The keyring is then a public hook. You already have a notebook in a drawer, and a sentence password. Use those on a shared machine. Let the browser forget.",
      ),
      p(
        "If you find you have been living in the house bag with three relatives, create your profile today, sign into mail there, sign out of the old window. It is not rude. It is the same as not leaving your ATM card on the table. The circle in the corner tells you whose bag is open. Look at it the way you look at ENG on the taskbar. Then type.",
      ),
    ],
  },
  {
    slug: "bookmarks-you-can-find-again",
    title: "Bookmarks you can find again",
    excerpt:
      "The star is a pin in a map. Name it. Put it in a folder. The address bar's memory is not a filing cabinet. A bookmark is.",
    series: SERIES,
    order: 46,
    author: AUTHOR,
    date: lessonDate(46),
    cover: "/images/blog/bookmarks-bar.jpg",
    coverAlt: "A browser bookmarks bar with a few named bookmarks.",
    body: [
      p(
        "You already know the address bar and the real street. A bookmark is how you stop searching for your own bank every Saturday. The star at the end of the address bar saves the page you are on. People click the star, then never look at Bookmarks again, then search, then click the wrong result. The pin was made. The map was never opened. This lesson is naming the pin, putting it in a room, and finding it on purpose.",
      ),
      p(
        "Click the star. A small box: name, and a folder. The name should be a word you would say — First Bank, JAMB, CEA, WAEC — not the long title the site gave itself. The folder is Bookmarks bar if you want it on the strip under the address, or Other, or a folder you make: School, Money, Church. Confirm. The star fills in. That is the pin dropped.",
      ),
      fig(
        "/images/blog/bookmarks-bar.jpg",
        "A bookmarks bar with a few named shortcuts under the address bar.",
        "The strip under the address is the bookmarks bar. A few names you can read. Forty names is a second address bar nobody uses. Pin the weekly streets, not every article.",
      ),
      h2("The bar, the menu, the folders"),
      p(
        "Right-click under the address bar if you cannot see the strip: Show bookmarks bar, Always. Drag a pin left or right. Right-click a pin to rename or delete. Delete removes the pin, not the website. The bank still exists. You only took the pin out of your map.",
      ),
      p(
        "Folders on the bar are envelopes. A folder called School can hold CEA, JAMB, the portal. Click the folder, then the name. That is the same idea as Documents/School. If you bookmark on a phone, that pin may live in the Google account if you signed the browser in. On a Guest window, bookmarks die when Guest closes. You learned that bag.",
      ),
      fig(
        "/images/blog/bookmark-star.jpg",
        "A young woman clicking the star in a browser.",
        "Star, name, folder, Done. Three extra seconds. The next Saturday is shorter by a search and a fake result.",
      ),
      ul([
        "Open cea.ng. Click the star. Name it CEA. Put it on the bookmarks bar.",
        "Open a second site you actually use. Star it. Name it in one word.",
        "Click the CEA pin. Confirm you arrive without typing.",
        "Delete a pin you made by accident. Confirm the site still opens if you type the address. The pin was not the house.",
      ]),
      h2("What not to pin"),
      p(
        "Do not pin a page you reached from a strange link. Pin the real street after you typed it. Do not pin “login” pages that are really searches. Do not pin fifty news articles; that is history, next lesson. A bookmark is for a door you will use again. An article is a room you visited.",
      ),
      p(
        "If the bar vanished after an update, it is hiding, not gone. Right-click, show it. If pins duplicated, delete the extras. If you use two computers, signing the browser into your Google account can copy pins. That is useful and it means the bag travels. On a shared computer, do not sign the house browser into your account just for pins. Type the few addresses, or use your profile. The star is a servant. It is not a reason to leave the keys on the table.",
      ),
    ],
  },
  {
    slug: "history-and-private-windows",
    title: "History and private windows",
    excerpt:
      "History is a list of rooms you walked through. A private window does not write on that list. It is not invisible to the network, the school, or the café.",
    series: SERIES,
    order: 47,
    author: AUTHOR,
    date: lessonDate(47),
    cover: "/images/blog/browser-history.jpg",
    coverAlt: "A browser history list on a laptop screen.",
    body: [
      p(
        "The browser remembers where you went. That list is History. It is how you find a page from Tuesday without a bookmark. It is also how a sibling, a shop, or a business-centre clerk can see what you opened. A private window — Incognito, InPrivate — is a sitting that does not add to that list on this computer. It is not a cloak on the internet. This lesson is the list, the broom, and what private actually hides.",
      ),
      p(
        "Ctrl+H opens History. A list, newest first. Search it like files. Click a line to return. Delete a line if you want that room forgotten here. Clear browsing data is the larger broom: last hour, last day, all time. Cookies you already met. Cached images are leftovers that make pages load faster and can be swept. Passwords and bookmarks are usually separate ticks — do not sweep those by accident.",
      ),
      fig(
        "/images/blog/browser-history.jpg",
        "Browser history listed on a laptop.",
        "A diary of addresses. Useful on your machine. Unkind on a shared one if you leave it. Sweep the hour before you stand up in a café.",
      ),
      h2("Private is a clean table, not a mask"),
      p(
        "Ctrl+Shift+N in Chrome is Incognito. Edge uses Ctrl+Shift+P. A darker window, a hat or a badge. Bookmarks still work. History in this window does not join the main list. Cookies from this sitting die when the last private window closes. Downloads still land in Downloads — files are files. The school Wi‑Fi, the café, your network provider can still see that a connection happened. Private is not a VPN. It is not illegal. It is a clean table on this machine.",
      ),
      p(
        "Use it on a shared computer for mail if you have no Guest profile. Use it to check a bank if you must, then close every private window — all of them, or the sitting continues. Do not use it to feel invisible while clicking the link you should not open. The trap still traps. Private will not save you from a typed password on a fake street.",
      ),
      fig(
        "/images/blog/private-window.jpg",
        "A private browsing window on a laptop.",
        "The dark frame is a reminder: this table wipes when you close it. Close it. A private window left open is an ordinary window with a costume.",
      ),
      ul([
        "Open History. Find today's lesson page or cea.ng. That is the diary.",
        "Open a private window. Visit cea.ng. Close the private window.",
        "Open History in a normal window. The private visit should not be there.",
        "On a machine that is not yours, close all windows when you stand up. Private or not.",
      ]),
      h2("What still remains"),
      p(
        "Files you saved. Things you printed. Mail you sent. The other person's computer if you logged into WhatsApp Web and did not log out. Private does not unsend. It does not hide you from a camera over your shoulder. It hides the diary in this browser. That is still worth doing. It is not magic.",
      ),
      p(
        "If a family needs the history gone on the house profile, clear the last day, then use profiles as you learned. Fighting over History is a sign the bags were mixed. Separate bags beat endless sweeping. The diary is a tool. On your laptop, keep it. On theirs, do not write in it.",
      ),
    ],
  },
  {
    slug: "the-downloads-pile",
    title: "The Downloads pile",
    excerpt:
      "The mat by the door fills. A file that matters should walk into Documents the same day. The pile is not a folder structure. It is a habit of not finishing.",
    series: SERIES,
    order: 48,
    author: AUTHOR,
    date: lessonDate(48),
    cover: "/images/blog/downloads-folder.jpg",
    coverAlt: "A Downloads folder with mixed files on a laptop.",
    body: [
      p(
        "Every browser, every phone cable, every “save this PDF” drops a parcel on Downloads. You named it a mat in the files lesson. Mats disappear under shoes. Three files called invoice.pdf, a setup.exe you forgot, a photograph of a chalkboard. Then search cannot help because everything is named by someone else. This lesson is a weekly walk from the mat to the rooms, and how to download into the right room the first time.",
      ),
      p(
        "Open File Explorer, Downloads. Sort by date. Newest at the top. That is what landed this week. Anything you still need: cut, walk to School/2026/Fees or Pictures, paste. Anything you already installed: the installer can go to Recycle Bin. Anything you do not recognise from a banner: do not open it. Delete it. You know that guest.",
      ),
      fig(
        "/images/blog/downloads-folder.jpg",
        "A crowded Downloads folder on a laptop.",
        "A mat. Useful for an hour. A year of mats is how disks go red and files go missing in plain sight.",
      ),
      h2("Save As, not Save wherever"),
      p(
        "When the browser asks where to put a file, look. Choose Documents, then the room, then a name. Chrome can be told to ask every time: Settings, Downloads, “Ask where to save.” That extra click is the whole skill. A PDF of a receipt that lands already in Fees will still be there in March. A PDF that lands on the mat will be invoice (4).pdf by Friday.",
      ),
      p(
        "Phones have a Downloads too. The same walk applies when you copy off the phone: do not dump DCIM into Downloads on the laptop. Pictures has a room. Installers from the internet should not live in Pictures. Kind with kind. You built the rooms. Use them on the way in, not only in a guilty sort at midnight.",
      ),
      fig(
        "/images/blog/sorting-downloads.jpg",
        "A young man moving files from Downloads into Documents.",
        "Cut, path, paste. The mat should be almost empty if you sit at the machine daily. A business-centre machine: take your files with you. Leave the mat as you found it.",
      ),
      ul([
        "Open Downloads. Sort by date. Move one real file into the room it belongs in.",
        "Delete one installer you have already used, through the Recycle Bin.",
        "In the browser, turn on “Ask where to save” if you can find it.",
        "Download a small PDF on purpose into Documents/School. Confirm it is not on the mat.",
      ]),
      h2("When the mat is the disk"),
      p(
        "If C: is red, Downloads is often the fat. Videos, installers, zoom recordings. Sort by size. The largest files are the first to walk or to leave. Empty Recycle Bin after you have looked. Do not delete Windows folders because Downloads was scary. You have had that warning.",
      ),
      p(
        "A zip on the mat is still a suitcase. Extract into Documents, then you may bin the zip. Opening a file from inside Downloads and editing it there means Save will keep it on the mat. Save As, room, name. The pile is not a personality. It is unfinished walking. Finish the walk the same sitting you downloaded.",
      ),
    ],
  },
  {
    slug: "the-cloud-in-ordinary-words",
    title: "What the cloud is, in ordinary words",
    excerpt:
      "The cloud is a computer that is not in the room, with a door on the internet. Drive, Photos, iCloud are rooms in that building. It is not magic, and it is not a backup until you can open the file on a second machine.",
    series: SERIES,
    order: 49,
    author: AUTHOR,
    date: lessonDate(49),
    cover: "/images/blog/cloud-folder.jpg",
    coverAlt: "A cloud storage folder list in a browser on a laptop.",
    body: [
      p(
        "People say “it is in the cloud” as if the file had gone to heaven. It has gone to someone else's computer, in a building you will not visit, behind a password you hold. Google Drive, OneDrive, iCloud, a school portal — those are doors. The internet is the road. If the road is down, the door is down. This lesson is that building, what it is good for, and why it does not replace the USB in the drawer until you have tested it.",
      ),
      p(
        "You already made a Google account. Drive is a folder that lives with that account. Open drive.google.com on the real street. You will see a list that looks like File Explorer. Upload is copy from your machine into that building. Download is copy back. A file only in Drive is not on your USB. A file only on your USB is not in Drive. Two houses, remember.",
      ),
      fig(
        "/images/blog/cloud-folder.jpg",
        "A cloud storage list of files in a browser.",
        "A folder with a road. The names should still be human. fees-2026.pdf in Drive is as useful as it is in Documents. IMG_0048 is as useless in both places.",
      ),
      h2("What it is for, and what it eats"),
      p(
        "It is for a file you want on the phone and the laptop without a cable. It is for a second copy that survives a stolen bag, if the password is yours and the second lock is on. It is for sending a large PDF when email refuses the zip. It eats data when you upload photographs. It eats space in the free allotment — Gmail and Drive often share a tank. When the tank is full, mail may stop. That surprise is why you do not dump the whole DCIM there on a school bundle.",
      ),
      p(
        "Sharing a Drive link is not the same as attaching. Anyone with the link may open it if you set it that way. Anyone with the email you typed may open it if you set it that way. Check the setting. A link in a WhatsApp group is a public tray if “anyone with the link” is on. For a school, prefer email attach or a link to one address.",
      ),
      fig(
        "/images/blog/cloud-devices.jpg",
        "A laptop, a phone and a notebook on a desk.",
        "The same file on two devices is the test. If you cannot open it on the phone after you upload from the laptop, it is not in the cloud yet. It is a hope.",
      ),
      ul([
        "Open drive.google.com signed into your account.",
        "Upload one small PDF you own. Open it in the browser.",
        "On the phone, open Drive or Gmail's Drive, same account. Confirm the file.",
        "That is the cloud: a building, a door, two rooms you can walk into.",
      ]),
      h2("Not a backup until it is a second house"),
      p(
        "Sync folders that “keep a copy here and there” can empty both sides if you delete in one place and do not understand. Until you do, upload copies. Do not turn on a sync you have not been shown. The USB in the drawer is still the backup you can hold. Drive is the backup that survives fire if you also remember the password. Both is adult. One is a start.",
      ),
      p(
        "iCloud is Apple's building. OneDrive is Microsoft's. They are not interchangeable bags. A file in one is not in the other unless you copied it. “The cloud” is not one cupboard. It is several landlords. Know which door you used. Write it next to the account in the notebook. Then the word stops meaning magic and starts meaning a street you can type.",
      ),
    ],
  },
  {
    slug: "signing-out-of-a-machine-that-is-not-yours",
    title: "Signing out of a machine that is not yours",
    excerpt:
      "Close is not sign out. Remember me is a trap you tick once. A last five minutes: mail, Drive, WhatsApp Web, browser, Guest. Then stand up.",
    series: SERIES,
    order: 50,
    author: AUTHOR,
    date: lessonDate(50),
    cover: "/images/blog/sign-out.jpg",
    coverAlt: "A browser account menu with Sign out visible.",
    body: [
      p(
        "A business centre, a church office, a friend's house, the academy's own machines if you are a visitor — the sitting ends. Closing the laptop lid is not leaving. The next person opens the lid and is you, in Gmail, in Drive, in a bank tab you forgot. This lesson is a short ritual for the last five minutes, so your keys do not stay on someone else's table. You have met the pieces. This is the order to walk them.",
      ),
      p(
        "Sign out is a sentence in an account menu: your picture or name, then Sign out, Log out, or Sign off. Gmail has one. Drive is the same Google, so one Google sign-out often covers both. WhatsApp Web has a menu, Log out. Windows itself may have a user you should not shut down if it is not your PC — Sign out of your sites first, then leave Windows as you found it. Do not shut down a shop's counter machine unless they asked.",
      ),
      fig(
        "/images/blog/sign-out.jpg",
        "A browser account menu showing Sign out.",
        "The words are small. They are the whole point. Close without this and the next sitter is you.",
      ),
      h2("The five-minute walk"),
      p(
        "Mail: picture, Sign out. Confirm the browser is asking for a password again. WhatsApp Web: three dots, Log out. Bank: the bank's own logout, not only the tab's X. Browser: if you used Guest, close all Guest windows. If you used a profile, sign out of the profile or close it. If you used the house browser, clear the last hour of cookies if you can do it without a fight, or at least close every tab. Downloads: copy your files to your USB, then delete those copies from their Downloads if the machine is public. Recycle Bin if you deleted.",
      ),
      p(
        "Remember me, Stay signed in, Trust this device — you should have said no on the way in. If you said yes, sign out is still required, and you may need to remove the device from Google's account later, from a machine that is yours: myaccount.google.com, Security, your devices. That is homework for the evening, not a reason to skip sign-out now.",
      ),
      fig(
        "/images/blog/leaving-shared-pc.jpg",
        "A young woman closing a laptop at a shared desk.",
        "USB in your pocket. Tabs gone. Sign out done. The lid is last, not first.",
      ),
      ul([
        "Practise on your own machine: sign out of Gmail, then sign in again. Feel the extra step. That step is what you owe a shared machine.",
        "Next time you sit at a computer that is not yours, start from Guest or a private window.",
        "Before you stand: mail, WhatsApp Web, bank, USB, close.",
        "Do not leave a phone charging in their USB “for a minute” with the phone unlocked.",
      ]),
      h2("What still leaks"),
      p(
        "A file on their Desktop. A print they have not collected. A photo in their WhatsApp if you sent it to yourself from their app. Paper in the printer tray. Look. The ritual is not paranoia. It is leaving a borrowed room as you found it, plus not leaving your ATM card in the sofa.",
      ),
      p(
        "If you forgot, from home, change the mail password, then the bank if you touched it. Google can sign out other sessions. Do it the same day. Shame is how this one finishes badly, like the phishing lesson. You are not the first person to leave a tab open in a café. You can still lock the door from the other street. Then the next sitting, walk the five minutes. Lid last.",
      ),
    ],
  },
  {
    slug: "tables-in-a-letter",
    title: "A table in a letter",
    excerpt:
      "A table is a grid that lives on a page, not in a spreadsheet. Rows, columns, one fact per cell. Tab moves. The borders are for reading, not for decoration.",
    series: SERIES,
    order: 51,
    author: AUTHOR,
    date: lessonDate(51),
    cover: "/images/blog/word-table.jpg",
    coverAlt: "A simple three-column table in a Word document on a laptop.",
    body: [
      p(
        "A letter sometimes needs a list that lines up: three fees, four names, a timetable. People hit Tab and Space until the words look like columns, then print, then watch the line collapse because one name was longer. A table is a grid on the page — the cousin of the spreadsheet, but it does not add unless you ask. It holds. This lesson is Insert Table, Tab through the cells, and not drawing the grid with the mouse like a fence.",
      ),
      p(
        "In Word: Insert, Table, then hover a small grid — 3 columns, 4 rows is enough to start. Click. A box appears in the letter. The first row can be headers: Name, Item, Amount. Click in a cell. Type. Tab to the next cell. At the end of a row, Tab makes a new row. That is the whole trick. You do not need Design until the words are in.",
      ),
      fig(
        "/images/blog/word-table.jpg",
        "A simple table with names and amounts in a Word document.",
        "One fact per cell. The line between cells is a wall. Do not put “Amaka — 4500” in one box and hope it lines up with the next person's two boxes.",
      ),
      h2("Tab, width, and the page"),
      p(
        "If a table runs off the right edge, you have too many columns or the font is large. Click inside the table, then drag the lines, or Table Layout, Autofit, Window. Prefer fewer columns. A letter is not Excel. Amounts can be a column. Dates can be a column. A story cannot. Stories stay in paragraphs above the table.",
      ),
      p(
        "Borders are on by default in Word. That is useful. If a school asked for “no grid,” Table Design, Borders, No border — the cells remain; only the ink of the walls hides. You can still Tab. Do not delete the table to hide the lines. You will be back to Space-bar columns.",
      ),
      fig(
        "/images/blog/table-learner.jpg",
        "A young woman inserting a table in a Word document.",
        "Insert, a small grid, click. If you drew a table with the Draw Table pen, Undo. The pen is for odd shapes. A fee list is not an odd shape.",
      ),
      ul([
        "Open a letter. Insert a table, 3 columns, 3 rows.",
        "Header row: Name, Item, Amount. Two lines of real facts underneath.",
        "Tab until a fourth row appears. That is enough.",
        "Save as table-practice.docx in Letters. PDF it if you will email it.",
      ]),
      h2("When the spreadsheet is the right tool"),
      p(
        "If you must add a column of naira, Excel will not forget the formula. A Word table can add with a formula field, and it is a maze. Copy the numbers to a sheet, add, copy the total back as a number. Or keep the whole list in Excel and put a screenshot in the letter only if they asked for a picture. Usually they asked for a list. A table is a list that will not collapse.",
      ),
      p(
        "Merging cells to make a title across the top is allowed once. Nested tables are not a first-week skill. If the table looks busy, you have too much border, too much colour, too many columns. Black lines, white cells, words. Print preview. If it fits on the page with the greeting still above it, you are done.",
      ),
    ],
  },
  {
    slug: "mail-merge-you-can-skip",
    title: "Mail merge, and when you can skip it",
    excerpt:
      "Mail merge is a factory for letters. Thirty names, one template. For three letters, type the name. For thirty, a list and a skip-or-learn moment. You do not owe the factory yet.",
    series: SERIES,
    order: 52,
    author: AUTHOR,
    date: lessonDate(52),
    cover: "/images/blog/name-list.jpg",
    coverAlt: "A printed list of names beside a laptop.",
    body: [
      p(
        "Word can take a list of names and pour each one into a copy of the same letter. That factory is mail merge. Offices love it. Beginners are sent to it on day two and drown in “data sources.” This lesson is honest: for three letters, type the name. For a class of thirty identical notes, there is a factory. You may skip it until you have thirty. Knowing it exists is enough to not feel stupid when someone says the words.",
      ),
      p(
        "The factory needs two things: a letter with holes — Dear «Name» — and a list, often Excel, with a column called Name. Word walks the list, fills a hole, prints or saves, next row. If the list is dirty — two spellings, a blank, a nickname in the wrong column — thirty letters come out wrong. Cleaning the list is most of the work. The button is the small part.",
      ),
      fig(
        "/images/blog/name-list.jpg",
        "A simple list of names on paper beside a laptop.",
        "If the list fits on one sheet and you can say every name, you may not need the factory. Typing three greetings is not failure. It is proportion.",
      ),
      h2("The small way, and the factory door"),
      p(
        "Small way: copy the letter, change the name, Save As, next. Three files, three names. You already know Save As. That is skip, and it is correct. Factory door, when you mean it: Mailings in Word, Start Mail Merge, Letters. Select Recipients, Use an existing list, pick the Excel sheet. Insert Merge Field, Name. Preview. Finish & Merge. If any of those words is a wall, close Mailings. You have not failed a computer course. You have refused a factory you do not need.",
      ),
      p(
        "Labels and envelopes are the same factory with stickers. A church with two hundred names may want it. A tenant writing a landlord does not. Do not let a YouTube thumbnail shame you into Mail Merge for a one-page request.",
      ),
      fig(
        "/images/blog/letter-and-list.jpg",
        "A letter on one window and a list of names on another.",
        "Two files. The factory joins them. Until the list is clean and long, keep them separate and type.",
      ),
      ul([
        "Write one short letter with a real name in the greeting. Save.",
        "Save As for a second person. Change only the name. That is the skip, practised.",
        "If you have an Excel list of more than twenty names you must write to, ask a helper to start Mail Merge beside you — they point, you click.",
        "Do not download a “mail merge wizard” from a banner.",
      ]),
      h2("When you should learn it"),
      p(
        "A job that prints fees notices. A union. A school office. Then learn it on a copy of the list, not the only list. Preview ten records before you print two hundred. Paper is a tap, you know that. Merge to PDF first if you can, look, then print. The factory is fast at making mistakes too.",
      ),
      p(
        "You now know the name of the machine so a supervisor cannot use it as a fog. “We will mail-merge” means a list plus a template. Ask to see the list. If there is no list, there is no merge. There is only hope. Skip until the list is real.",
      ),
    ],
  },
  {
    slug: "calendar-and-reminders",
    title: "Calendar and reminders",
    excerpt:
      "A calendar is a wall chart that can tap you on the shoulder. One sitting, one date, a time, a name. The phone and the laptop can share it if they share an account.",
    series: SERIES,
    order: 53,
    author: AUTHOR,
    date: lessonDate(53),
    cover: "/images/blog/calendar-week.jpg",
    coverAlt: "A week view of a calendar on a laptop screen.",
    body: [
      p(
        "Paper diaries work. Phones already buzz. A calendar on the computer is the same wall chart, with a reminder that does not depend on you opening the book. Google Calendar, Outlook, the Windows calendar — three names. The idea is one: a day, a time, a sentence, an alarm. This lesson is making one event, not becoming a productivity person.",
      ),
      p(
        "If you have Gmail, calendar.google.com on the real street is enough. Click a day, type JAMB registration, set a time, Save. A reminder defaults to ten or thirty minutes before. That is a tap on the shoulder. Put the real time of the thing, not the time you wish to start getting ready, or you will bargain with the alarm and lose.",
      ),
      fig(
        "/images/blog/calendar-week.jpg",
        "A week on a calendar with a few ordinary appointments.",
        "A week you can see. Do not colour-code a life you have not yet filled. One colour, names you can read, times that are true.",
      ),
      h2("The phone, the laptop, the same account"),
      p(
        "Sign the phone into the same Google account and open the Calendar app. The JAMB line should appear. That is the cloud, doing a small job. If it does not appear, pull down to refresh, or confirm the same address. Two accounts is how events vanish. You have one house; use it.",
      ),
      p(
        "All-day events are birthdays and deadlines that are a date, not a clock. Timed events are classes. Recurring — every Tuesday — is useful and dangerous. A class that ends in June should not still buzz in November. When the term ends, open the event, end the series. Do not delete one Tuesday and think the rest have gone.",
      ),
      fig(
        "/images/blog/reminder-phone.jpg",
        "A young man checking a calendar reminder on a phone, laptop beside him.",
        "The shoulder-tap is the point. A calendar you never open is a paper diary in a drawer. Let the phone buzz. Then open the thing, not only dismiss.",
      ),
      ul([
        "Open the calendar you already have — Google if you made the account.",
        "Create one event this week with a real name and a time.",
        "Set a reminder. When it buzzes, you may dismiss. You have proved the tap.",
        "Do not import a stranger's ICS file from a WhatsApp. That is a cousin of the link you should not open.",
      ]),
      h2("Invitations, and what not to accept"),
      p(
        "Email will bring “Will you attend?” calendar invites. Accept only if you know the sender. A meeting invite from a stranger is a phishing costume. Decline, or ignore. Do not click “Join Zoom” from an invite you did not expect. Walk to the real street if the class is real.",
      ),
      p(
        "A calendar is not a cage. Three events a week is a tool. Forty overlapping colours is a second job. Put fees deadlines, class times, a birthday you always miss. Leave the rest to the paper on the wall if that is how the house already works. The computer should tap you. It should not become the only clock in the room.",
      ),
    ],
  },
  {
    slug: "contacts-versus-the-phone-book",
    title: "Contacts versus the phone book",
    excerpt:
      "A contact is a card: name, number, maybe email. The SIM is one drawer. The Google account is another. Two drawers is how numbers vanish when the phone dies.",
    series: SERIES,
    order: 54,
    author: AUTHOR,
    date: lessonDate(54),
    cover: "/images/blog/contacts-list.jpg",
    coverAlt: "A contacts list showing names and phone numbers.",
    body: [
      p(
        "The phone book on a feature phone lived on the SIM. Android and iPhones keep cards in an account if you let them. People lose a hundred names at a repair shop because the names lived only on a dead handset. A contact is a small file: name, number, email, maybe a photo. This lesson is one card, where it is stored, and copying the drawer before the basin.",
      ),
      p(
        "On the phone, Contacts, add. Name as you would search — Amaka Okoro, not AMK. Number with the country code if they are not beside you every day: +234… Email if you have it, so the card can open a letter. Save. Then look at the save location: Phone, SIM, or Google. Google is the drawer that survives a new handset if you sign in. Phone-only is the basin risk. SIM holds few names and fewer emails.",
      ),
      fig(
        "/images/blog/contacts-list.jpg",
        "A contacts list with names and numbers.",
        "A card per person. Duplicates — Amaka, Amaka Okoro, Mrs Amaka — are three cards. Merge when the phone offers. One person, one card.",
      ),
      h2("The laptop, and the same house"),
      p(
        "contacts.google.com on the real street shows the same cards if the phone used Google. You can add from the laptop, with a proper keyboard, for a list you were given on paper. Export is a backup file. A CSV is a spreadsheet of names. That file in Drive or on a USB is a second house. Do not email your whole book to a stranger who asked nicely.",
      ),
      p(
        "WhatsApp is not the phone book. It reads the book and shows who has the app. If you delete a WhatsApp chat, the number may still be in Contacts. If you “delete contact,” some apps forget the name and keep the number as digits. Look twice. The green app is a room. The book is a drawer.",
      ),
      fig(
        "/images/blog/address-book.jpg",
        "A paper address book beside a phone and a laptop.",
        "Paper is still a house. The useful numbers — family, landlord, academy — can live on paper and in Google. Two houses, again.",
      ),
      ul([
        "Add one new contact with a full name and number, saved to Google if you can.",
        "Open contacts.google.com on the laptop. Confirm the card is there.",
        "If it is not, the phone saved to Phone only. Edit the contact, move it to the account.",
        "Do not grant a random app your whole book because a banner asked.",
      ]),
      h2("When the phone dies"),
      p(
        "A new handset, same Google account, Contacts on: the cards come back. That is the test of the cloud, in names. If they do not, you had saved to the old phone. A shop that “transfers contacts” is copying drawers. Watch which drawer. SIM to SIM is small. Account to account is the real move.",
      ),
      p(
        "Write the academy, the landlord, and two family numbers on paper anyway. Electricity and accounts fail. The book on the computer is a tool. The paper in the drawer is how you still phone a person when the tool is in the shop. You do not need five hundred cards on paper. You need the few that open a door.",
      ),
    ],
  },
  {
    slug: "what-a-qr-code-is-doing",
    title: "What a QR code is doing",
    excerpt:
      "A QR code is a printed address. The camera reads it and offers a door. Read the door before you walk. A sticker on a pole is not your bank.",
    series: SERIES,
    order: 55,
    author: AUTHOR,
    date: lessonDate(55),
    cover: "/images/blog/qr-scan.jpg",
    coverAlt: "A phone camera pointed at a QR code on a paper flyer.",
    body: [
      p(
        "Those square patches of dots on a flyer, a receipt, a restaurant table, a church poster — QR codes. They are barcodes that hold a sentence, usually a web address, sometimes a Wi‑Fi key, sometimes an account number. Your camera reads the dots and offers to open a door. The door is the point, not the pattern. This lesson is scan, read the address, then decide, the same as a link in mail.",
      ),
      p(
        "Open the camera. Point at the square until a banner appears with a link or a suggestion. Do not tap yet. Read. If it is cea.ng, or a menu, or a Wi‑Fi name you asked for, tap. If it is a shortened link, a bank you did not approach, a “verify your BVN,” put the phone down. The printed square can be stuck over another square. A pole in the street is not a teller.",
      ),
      fig(
        "/images/blog/qr-scan.jpg",
        "A phone camera aimed at a QR code on a flyer.",
        "The camera is the reader. The banner is the door. The dots are not a virus. The door might be.",
      ),
      h2("What might be inside"),
      p(
        "A website. A payment page — then you are in the form lesson, plus money. A Wi‑Fi password, on a café card, which can be kinder than typing. A WhatsApp number. A vCard, which is a contact. None of these is magic. All of them can be forged. A printed menu at a table you are sitting at is ordinary. A code on a sticker over the restaurant's real code is a thief. Look at the plastic. If it sits badly, type the URL from the receipt instead.",
      ),
      p(
        "WhatsApp and bank apps have their own scan buttons for payments. Use the bank's app to pay the bank, not a camera that opened a browser. You already prefer the real app to a surprise link. QR is a surprise link made of ink.",
      ),
      fig(
        "/images/blog/qr-result.jpg",
        "A young woman looking at a phone after scanning a flyer.",
        "Read the result like an address bar. If you would not type that street, do not tap it because dots asked.",
      ),
      ul([
        "Find a QR on a packet in the house, or the academy flyer if you have one — something you already trust.",
        "Scan. Read the banner. If it matches the packet, open it.",
        "Do not scan a code from an unsolicited WhatsApp image “to claim.”",
        "If the camera does nothing, more light, hold still. A blurry square is not a broken phone.",
      ]),
      h2("Making one, if you must"),
      p(
        "You can turn an address into dots on many sites. Walk to a maker you typed, not the first advert. Put cea.ng in, download a PNG, print. That is a signpost to your real street. Do not put a password into a QR on a poster. A Wi‑Fi QR on a café board is a choice they made; on your gate it is a password on a flag.",
      ),
      p(
        "The code is a servant of the address. If you remember nothing else: scan, read, then walk or don't. The square will wait. Hurry is still the bait, even when the bait is printed in a church bulletin. You know how to sit down anyway.",
      ),
    ],
  },
  {
    slug: "whatsapp-web-on-a-computer",
    title: "WhatsApp Web on a computer",
    excerpt:
      "The green app can sit in a browser. The phone stays the key. Scan once, type with a keyboard, log out when the desk is not yours.",
    series: SERIES,
    order: 56,
    author: AUTHOR,
    date: lessonDate(56),
    cover: "/images/blog/whatsapp-web.jpg",
    coverAlt: "A laptop showing WhatsApp in a browser beside a phone with a QR code.",
    body: [
      p(
        "WhatsApp lives in the pocket. It can also live in a browser, with a real keyboard, so a long letter to a landlord is not thumbs. That sitting is WhatsApp Web — or the Desktop app, which is the same idea in a window of its own. The phone does not retire. The phone is the key. If the phone is off, the computer chat is off. This lesson is opening the door, keeping the phone awake, and shutting the door when you stand up.",
      ),
      p(
        "Walk to web.whatsapp.com yourself. A square of dots waits. On the phone: WhatsApp, the three dots or Linked devices, Link a device, point the camera at the square. When the chats appear on the laptop, you are in. The phone must stay on the internet. A dead phone is a dead Web. Charge it. Do not put it in airplane mode to “save data” and expect the laptop to keep talking.",
      ),
      fig(
        "/images/blog/whatsapp-web.jpg",
        "WhatsApp in a browser beside a phone showing a QR code.",
        "The dots are a handshake, not a payment. You are pairing your own phone to your own browser. A square a stranger sent you in a chat is a different story — do not scan that.",
      ),
      h2("Typing, files, and two clocks"),
      p(
        "The list of chats is on the left. A click opens a thread. Type as you would in email, then Enter to send — or Shift+Enter for a new line, depending on the setting. Paperclip attaches a document from Documents, the house you know. Prefer Document for a PDF, not a camera picture, so the file does not become soup. You have heard that. It is louder on a laptop, where the real file is sitting next to you.",
      ),
      p(
        "Blue ticks and “typing…” still come from the phone's network. If the laptop shows one tick and the phone shows two, wait. Do not send five times. Notifications may ring on both; that is two clocks. Mute one. The computer is for writing. The pocket is for the tap on the shoulder when you leave the desk.",
      ),
      fig(
        "/images/blog/phone-beside-laptop.jpg",
        "A laptop in use with a phone on the same wooden desk.",
        "Keep the phone on the desk while Web is open, at least the first week. When the handshake drops, the QR returns. Scan again. You have not lost the chats. You have only lost this sitting.",
      ),
      ul([
        "On your own laptop, open web.whatsapp.com. Link the phone.",
        "Send yourself a one-line message from the computer. Confirm it on the phone.",
        "Attach one small PDF as Document. Confirm it arrives readable.",
        "Log out from the laptop menu before you close if this machine is not only yours.",
      ]),
      h2("Log out, and other people's desks"),
      p(
        "The menu — three dots, Log out — ends this computer's handshake. Closing the tab is not always enough; a session can linger. On a business-centre machine, log out, then the five-minute walk from the signing-out lesson. Linked devices on the phone lists every computer still holding a key. Remove the ones you do not recognise. That list is worth a look after a café.",
      ),
      p(
        "Do not link WhatsApp to a shop's “test” computer. Do not photograph your own QR and send it to a helper. The square is a key laid on the table. Anyone who scans it sits in your chats until you remove the device. Web is a keyboard for your pocket, not a copy of your life left behind. Type, send, log out. The green app goes back in the pocket, where it belongs.",
      ),
    ],
  },
  {
    slug: "maps-without-getting-lost",
    title: "Maps without getting lost",
    excerpt:
      "A map app is a paper map that can talk. Search a place, read the pin, then the road. Download the area if the data will die. The blue dot is you, not the destination.",
    series: SERIES,
    order: 57,
    author: AUTHOR,
    date: lessonDate(57),
    cover: "/images/blog/maps-screen.jpg",
    coverAlt: "A map with a search box on a laptop screen.",
    body: [
      p(
        "Google Maps, or the map in a ride-hailing app, is a paper map that knows where you are if the phone allows it. People type a name, tap the first pin, and walk into the wrong street because Lagos and Port Harcourt share shop names. This lesson is search, the pin, the address line, and when to download a piece of the city so the map still works when the bundle ends.",
      ),
      p(
        "On the phone or laptop, maps.google.com, or the Maps app. The box at the top is search, like the internet lesson. Type a full thought: 26 Ebony Road Rumuola, not only “computer school.” Read the grey address under the result before you tap. One pin is a guess. The address line is the street. If two pins share a name, the one with the matching road is yours.",
      ),
      fig(
        "/images/blog/maps-screen.jpg",
        "A map on a laptop with a search box at the top.",
        "Search is a question. The pin is an answer you must still read. Zoom out once. If the pin is in another state, you asked too little.",
      ),
      h2("The blue dot, and permission"),
      p(
        "The blue dot is this device, if Location is on. A grey or missing dot means the phone has not been allowed to say where it is. Settings, Location, on, and Maps allowed. That permission is a door, like the camera. On a laptop, the dot is often weaker; use the phone in the street. The laptop is for planning at the desk: look, print, or screenshot the area, then walk with the phone.",
      ),
      p(
        "Directions: tap Directions, choose walking, driving, or bus if it exists. The minutes are a guess in Port Harcourt traffic. The line on the map is the suggestion, not a law. If the voice says turn and the road is a ditch, believe the road. Mute the voice in a church or a shared taxi if it shouts. You can follow the line with your eyes.",
      ),
      fig(
        "/images/blog/maps-phone.jpg",
        "A young woman checking directions on a phone, a map on a laptop behind her.",
        "Plan on the large screen. Walk with the small one. Screenshot the junction before you lose data. A picture of the map is a paper map you made.",
      ),
      ul([
        "Search the academy address or your own street. Confirm the pin matches a road you know.",
        "Zoom out. Find a landmark you can name — a flyover, a market.",
        "If you have a phone, turn Location on for Maps only, not for every app that asks.",
        "Do not share live location in a group you do not trust. That is a moving flag on your body.",
      ]),
      h2("Offline, and the wrong pin"),
      p(
        "On the phone, search the area, then Download offline map if you will travel where data is rude. A piece of the city sits on the phone. It will not know live traffic. It will still show the streets. That is enough to find a compound. Update the download when you have Wi‑Fi, like any other parcel.",
      ),
      p(
        "A pin dropped by a stranger in WhatsApp is a suggestion. Open it, read the address, match it to a name you were told. If the pin is a beach and you were invited to an office, you are in the link lesson again. Type the street yourself. The map is a servant. It will take you to whichever pin you believed.",
      ),
    ],
  },
  {
    slug: "a-simple-poster",
    title: "A simple poster that can be read",
    excerpt:
      "A poster is a shout from across a room. One heading, one sentence, one time and place. Size 72 is not pride. It is distance. Colour is optional. Printing is the test.",
    series: SERIES,
    order: 58,
    author: AUTHOR,
    date: lessonDate(58),
    cover: "/images/blog/simple-poster.jpg",
    coverAlt: "A simple poster on a laptop screen with a heading and plenty of white space.",
    body: [
      p(
        "A poster is not a letter. A letter is read at a desk. A poster is read while walking — a church door, a school gate, a shop window. If the walker must stop and squint, the poster failed. Word can make one. Canva can make one. A marker and a card can make one. The tool is not the point. One heading, one sentence, the time and the place. This lesson is that discipline, in Word, because you already have Word.",
      ),
      p(
        "Page Layout or Layout, Orientation, Landscape if you want a wide sheet, Portrait for a door. Margins Normal or narrow. Type the heading first, large — 48 or 72, bold, one typeface. Then a sentence a person can say aloud: Computer Basics, Saturday 9 o'clock, 26 Ebony Road. Then a phone number. Then stop. A photograph is optional and must not sit on the words. If you add one, keep it small, as in the letter lesson.",
      ),
      fig(
        "/images/blog/simple-poster.jpg",
        "A one-page poster with a heading, a short sentence, and white space.",
        "White space is the shout. If every inch has a word, nobody reads any word. The heading should work from two metres.",
      ),
      h2("Canva, if you must, and the same rules"),
      p(
        "Canva is a website of templates. Walk to canva.com on the real street. Sign in with the Google account you made on purpose. Choose a poster size — A4 is enough to print at a business centre. A template is a costume. Delete the extra boxes until you have a heading and a sentence. Free templates are fine. “Pro” lock icons are a shop. You do not need them for a class announcement.",
      ),
      p(
        "Download as PDF for print, PNG for WhatsApp. PDF for the business centre, as you know. A PNG in a group chat will be compressed; the heading must still be large enough to survive soup. If it cannot, the poster was too clever. Make the words bigger. Send.",
      ),
      fig(
        "/images/blog/printed-poster.jpg",
        "A printed A4 poster on a desk beside a laptop.",
        "Print one copy. Tape it at arm's length. If you cannot read the heading, the screen lied. Fix, print again. One sheet is cheaper than a hundred unread ones.",
      ),
      ul([
        "In Word, one landscape page. Heading, one sentence, a place, a number.",
        "No more than two typefaces. Black on white is enough.",
        "Print preview. Then one real print if you can.",
        "Do not steal a famous logo to “look official.” A clear sentence is official enough.",
      ]),
      h2("What a poster is not"),
      p(
        "It is not a programme of ten courses in size 12. That is a flyer for a hand, or a letter. It is not a photograph of a full Word page taken with a phone at an angle. Export. It is not fluorescent text on a fluorescent ground. Contrast is kindness. If the academy already has a simple sheet, copy the bones — heading, date, place — not the decoration from a party invitation.",
      ),
      p(
        "When you can read it from the door, you are done. Save as poster-class.pdf in Documents. A poster is a one-job page. You already know one job per email. Same manners, larger letters.",
      ),
    ],
  },
  {
    slug: "shrinking-a-photo-for-email",
    title: "Shrinking a photo so email will take it",
    excerpt:
      "A phone photograph is a wall. Email wants a window. Resize is not crop. Save a copy. The original stays in Pictures.",
    series: SERIES,
    order: 59,
    author: AUTHOR,
    date: lessonDate(59),
    cover: "/images/blog/resize-photo.jpg",
    coverAlt: "A photograph being resized in a simple window on a laptop.",
    body: [
      p(
        "Phone cameras save large files. A single portrait can be three or eight megabytes. Five of those will bounce from Gmail or sit in a queue until you leave the café. WhatsApp shrinks by force and makes soup. Email often refuses. The kind middle is a smaller copy: enough to see a face or a receipt, small enough to travel. This lesson is copy, resize, save as, attach the copy.",
      ),
      p(
        "Do not work on the only original. In Pictures, copy the file — Ctrl+C, Ctrl+V — and rename the copy receipt-small.jpg. Open it in Photos, Paint, or whatever preview the machine has. You want Resize, not Crop. Crop cuts the picture. Resize keeps the whole picture and makes the grid of dots smaller. A receipt still shows the whole slip. A head still has shoulders if it had them.",
      ),
      fig(
        "/images/blog/resize-photo.jpg",
        "A simple image window with a photograph being resized.",
        "Width in pixels is the useful number. 1280 on the long side is plenty for a form. 4000 is the wall the phone built. You are making a window.",
      ),
      h2("Paint, Photos, and a number"),
      p(
        "In Paint: Resize, Pixels, uncheck “maintain aspect ratio” only if you like distortion — leave it checked. Set the longer side to 1280 or 1600. OK. Save. In Windows Photos, there is often Edit, then a resize or save a copy. On a Mac, Preview, Tools, Adjust Size. The file size in kilobytes should drop. A passport photo for a form is often asked in kilobytes — 50 KB, 100 KB. That is smaller still; 600 pixels on the long side, saved as JPEG. If the form rejects, you are still too heavy. Smaller, new copy, try again.",
      ),
      p(
        "JPEG is the usual type for photos. PNG is heavier and useful for a poster with text. Do not convert a receipt to a masterpiece. Save as JPEG, quality medium if it asks. The words on the receipt must stay readable. Zoom the small copy before you send. If the naira amount is a blur, you shrank too far. Undo, a middle size.",
      ),
      fig(
        "/images/blog/photo-size.jpg",
        "A laptop with a large camera photo and a smaller copy for email.",
        "Two files. The original stays. The small one travels. If you overwrite the original, the wall is gone. Save as, new name, always.",
      ),
      ul([
        "Copy one photo. Rename the copy with -small.",
        "Resize the long side to about 1280 pixels. Save.",
        "Compare the two file sizes in File Explorer — Details view, Size column.",
        "Attach the small one to a mail to yourself. Confirm it opens and can be read.",
      ]),
      h2("What not to do"),
      p(
        "Do not screenshot a photo to shrink it — you lose quality and gain a taskbar. Do not send the whole DCIM zip and hope. Do not use an online “compressor” you reached from an advert; you are uploading the face to a stranger. Paint is enough. If a job portal wants 20 KB, it will say so. Obey the number. A blurry ID is worse than a second attempt.",
      ),
      p(
        "The original remains in Pictures, in the room you made, backed up if you learned that lesson. The small copy can live next to it or in the Fees folder if it is a receipt. Names: receipt-march-small.jpg. You know why. Email will take a window. It will not take a wall. Give it a window.",
      ),
    ],
  },
  {
    slug: "what-a-virus-usually-is",
    title: "What “the computer has a virus” usually is",
    excerpt:
      "A flashing count of infections is usually an advert. A real problem is quieter: a file you cannot open, a browser that will not leave a stranger's page, a program you did not install. Close the scare. Do not call the number on it.",
    series: SERIES,
    order: 60,
    author: AUTHOR,
    date: lessonDate(60),
    cover: "/images/blog/fake-virus.jpg",
    coverAlt: "A generic fake virus warning on a laptop screen.",
    body: [
      p(
        "Someone will say the computer has a virus. Sometimes they are pointing at a banner that will not close. Sometimes a cousin installed a “cleaner.” Sometimes a shop wants a fee. Real malware exists. It is usually quiet. It does not put a siren on your screen with a phone number in Lagos or India. This lesson is the scare, the quiet problems, and the first walks that do not begin with a credit card.",
      ),
      p(
        "A page that fills the screen with “YOUR PC IS INFECTED — CALL NOW” is a website. It is not Windows. It cannot see your files. Alt+F4, or close the tab, or close the whole browser. If it went full screen, F11, then close. Do not call the number. Do not download the “removal tool” it offers. You have met this cousin in updates, in audio fixers, in cookies. Same family. Same door: close.",
      ),
      fig(
        "/images/blog/fake-virus.jpg",
        "A scare pop-up pretending the computer is infected.",
        "The number on the screen is their shop, not Microsoft. Windows does not advertise a helpline on a red page while you are reading the news.",
      ),
      h2("Quiet trouble, and what to actually do"),
      p(
        "Quieter signs: the browser's homepage became a stranger and you cannot change it. New toolbars. Passwords that fail because a fake page ate them last week. A program in the Apps list you never chose. Pop-ups even when the browser is closed — that last one is more serious. Walk: uninstall extras you can name, as you learned. Change the email password from a machine you trust. Run Windows Security, which is already on the computer — Start, type Windows Security, Virus & threat protection, a scan. It is not exciting. Excitement is the product they sell.",
      ),
      p(
        "A file that will not open, or a ransom note that says pay in crypto to get your letters back, is a real bad day. Unplug from the network if you can, do not pay from panic, copy nothing onto your only USB until someone who knows backup-for-ransom has spoken. The academy can look. A random Facebook helper cannot. Backup from last month is the whole religion here. If you have no backup, you still do not pay a banner.",
      ),
      fig(
        "/images/blog/closing-popup.jpg",
        "A young woman closing a scare tab calmly.",
        "Close. Do not talk to the page. Then, if you wish, scan with Windows Security. The order matters. The scare wants the first word. Do not give it.",
      ),
      ul([
        "If a scare page appears, close the tab. No downloads. No numbers.",
        "Open Windows Security yourself, from Start, not from a banner. Note what it says. It often says nothing is wrong.",
        "Look at Apps for a name you do not remember. Uninstall only what you can defend.",
        "If mail was opened on that sitting, change the mail password from a different, trusted machine.",
      ]),
      h2("Prevention is the boring list you already have"),
      p(
        "Updates. The real street. No unknown installers. No USB from a stranger without a look. A browser that is not a carnival of toolbars. Guest on shared machines. That list is the antivirus. Windows Security is the night watchman, not a preacher on a billboard. A paid extra antivirus can be fine if you chose it on purpose; three at once fight each other. One is enough. Zero extra is also enough for a careful person.",
      ),
      p(
        "When a relative says “virus,” ask what they saw. A red page is a website. A slow machine is heat, disk, crowd. A missing file is the Recycle Bin. Name the thing. Then walk. You now have enough names to refuse a shop that formats first and talks second. Backup, then a person you can see. The siren on the screen is not the disease. It is an advert with a costume.",
      ),
    ],
  },
  {
    slug: "two-windows-at-once",
    title: "Two windows at once",
    excerpt:
      "A letter on the left, a page on the right. Snap is not magic. Alt+Tab is the other door. You do not have to close one room to stand in the other.",
    series: SERIES,
    order: 61,
    author: AUTHOR,
    date: lessonDate(61),
    cover: "/images/blog/two-windows.jpg",
    coverAlt: "A laptop showing a letter and a browser side by side.",
    body: [
      p(
        "People type a letter, minimise it, open a browser, copy an address, minimise the browser, hunt for the letter, paste, forget the next line, and do it again. The machine can hold two rooms open at the same time. One half of the screen is Word. The other is the page you are copying from. That is not advanced. It is the desk with two sheets on it instead of one sheet you keep putting in a drawer. This lesson is snap, Alt+Tab, and not losing the letter because you opened a map.",
      ),
      p(
        "On Windows, click the letter so it is the active window. Hold the Windows key and tap the left arrow. The letter should jump to the left half. Then click the browser, Windows key and right arrow. Two rooms, one desk. Drag the edge in the middle if one needs more width. A click in a window makes it the one that hears the keyboard. Type only after you have clicked the letter. Paste lands where the cursor last sat, not where your eyes are looking.",
      ),
      fig(
        "/images/blog/two-windows.jpg",
        "A letter and a browser sharing one laptop screen.",
        "Left is the work. Right is the source. You still Save in the letter. The browser is a window, not a second computer.",
      ),
      h2("Alt+Tab is the stack of papers"),
      p(
        "Hold Alt, tap Tab, keep Alt down. A row of open programs appears. Each Tab hop is the next paper. Let go on the one you want. That is how you return to the letter without hunting the taskbar. Alt+Tab+Tab walks further. If you let go too soon, you land on the neighbour. Do it again, slower. The taskbar glow you learned is the same stack, seen from the floor.",
      ),
      p(
        "Minimise — the line at the top of a window — hides a room. It does not close it. The X closes it, and unsaved work will ask. People minimise five things, then think the machine is empty. Look at the taskbar. The crowd is still standing. Restore one, or snap two, and send the rest to the line. You do not need six halves. Two is a sitting. Four is a market.",
      ),
      fig(
        "/images/blog/alt-tab.jpg",
        "Overlapping windows on a laptop, a learner choosing among them.",
        "The stack is not a crash. It is every room you left open. Alt+Tab is walking the stack. Close what you are not using. Two is enough for a letter and a source.",
      ),
      ul([
        "Open a letter and a browser. Snap one left, one right.",
        "Click the letter. Type one sentence. Click the browser. You should not be typing in the letter any more.",
        "Alt+Tab back to the letter. Confirm the sentence is still there. Save.",
        "Close the extra windows you are not using. Leave two.",
      ]),
      h2("When the window vanishes"),
      p(
        "A window can sit on a second screen that is unplugged, as in the projector lesson. Windows+P, PC screen only, then Alt+Tab. Or Windows+arrow until it walks back. If the letter is “gone,” it is usually minimised, behind another window, or on a wall that went home. Search will not find an unsaved window. Alt+Tab will.",
      ),
      p(
        "On a small laptop, two halves can feel cramped. Then use Alt+Tab and a larger font, next lesson, instead of snap. The point is not a pretty split. The point is not closing the letter to look at a fee on a website. Two rooms. One save. Then you can stand up.",
      ),
    ],
  },
  {
    slug: "making-text-larger",
    title: "Making the page larger without breaking it",
    excerpt:
      "Ctrl and plus is a magnifying glass on this page. It is not a new font. Accessibility is a lamp you are allowed to turn up. Squinting is not a virtue.",
    series: SERIES,
    order: 62,
    author: AUTHOR,
    date: lessonDate(62),
    cover: "/images/blog/zoom-page.jpg",
    coverAlt: "A laptop document zoomed in so the words are easy to read.",
    body: [
      p(
        "A page can be too small. People lean in until their neck hurts, then buy glasses they already own, then blame the machine. The machine has a magnifying glass. In a browser, Ctrl and the plus key makes this page larger. Ctrl and minus makes it smaller. Ctrl and 0 puts it back. The website did not change for the world. Only your window did. This lesson is zoom, the Display slider, and the difference between a bigger page and a bigger Windows.",
      ),
      p(
        "Word has its own zoom in the bottom-right corner — 100 percent, 120, 150. That is how the page looks while you type. It is not how it prints. Print preview is still the truth, as you learned. A letter at 200 percent on screen can still be size 12 on paper. Do not raise the font to 28 because you could not find zoom, then email a poster to a school. Zoom for your eyes. Font size for the reader.",
      ),
      fig(
        "/images/blog/zoom-page.jpg",
        "A document zoomed in on a laptop screen.",
        "The words are large. The file is the same file. Ctrl+0, or 100 percent, is home if you get lost.",
      ),
      h2("Windows itself, and Magnifier"),
      p(
        "If every program is tiny, the lamp is the display scale, not each page. Settings, System, Display, Scale — 125 percent or 150 on a small laptop is ordinary. It enlarges buttons, the taskbar, the Start menu. Restart a stubborn program if it looks blurry after. This is not “making Windows for old people.” It is matching the lamp to the room, like brightness.",
      ),
      p(
        "Magnifier is a stronger glass: Windows and the plus key, or Start, Magnifier. A lens follows the pointer. Windows and Esc closes it if you opened it by accident — a common fright. You are allowed to use it for a form with grey-on-grey type. You are allowed to sit at a comfortable distance. Squinting through a whole JAMB page is not toughness. It is how people tick the wrong box.",
      ),
      fig(
        "/images/blog/large-text.jpg",
        "A learner reading large, comfortable text on a laptop.",
        "If you can read it without leaning, the sitting will last. Comfort is not decoration. It is how the letter gets finished.",
      ),
      ul([
        "Open cea.ng. Press Ctrl and plus a few times. Read. Ctrl+0 to return.",
        "Open a letter. Find the zoom percentage at the bottom. Try 130. Type. Print preview — the paper should still be ordinary.",
        "If the whole machine is tiny, try Display, Scale, 125 percent. Look at Start. If you hate it, 100 is still there.",
        "Do not change a font to “fix” a website. Zoom the website.",
      ]),
      h2("What zoom will not do"),
      p(
        "A photograph zoomed in becomes cubes. That is the dots, not a broken file. A PDF of a scan may never become sharp. A form that uses tiny grey type may still print tiny; zoom is for you, on the glass. If a site forbids zoom, that site is rude. The browser still often allows Ctrl+plus. Try.",
      ),
      p(
        "High contrast and narrator are extra doors in Accessibility, for people who need them. You do not have to use them to be allowed a larger page. Ctrl and plus is the everyday glass. Use it at the academy, on a phone (pinch), in a café. The words were always that size. You have only walked closer without moving the chair.",
      ),
    ],
  },
  {
    slug: "bullets-and-numbered-lists",
    title: "Bullets and numbered lists",
    excerpt:
      "A list is a set of steps or a set of things. Numbers mean order. Dots mean a pile. Tab nests. Enter twice gets you out. Space-bar art is not a list.",
      series: SERIES,
    order: 63,
    author: AUTHOR,
    date: lessonDate(63),
    cover: "/images/blog/word-bullets.jpg",
    coverAlt: "A short bullet list in a word processor on a laptop.",
    body: [
      p(
        "A paragraph is a thought. A list is a set of things or a set of steps. People make lists with a hyphen and a hope, then add a line, then watch the hyphens wander. Word already knows lists. A dot — a bullet — means these items are a pile, not a sequence. A number means do this, then that. Mixing them is how a recipe becomes a shopping list in the middle. This lesson is the two buttons, Tab to nest, and how to leave the list when the thought is over.",
      ),
      p(
        "Type a line. On the Home ribbon, the dots button is bullets, the 123 button is numbers. Click one. Enter makes the next item. Type. Enter. When the list is finished, Enter on an empty item, or Enter twice — you should be back in ordinary paragraphs. If you stay trapped in dots, click the same button again to switch it off. That is the lamp, not a ghost.",
      ),
      fig(
        "/images/blog/word-bullets.jpg",
        "A short bullet list on a word-processor page.",
        "One idea per line. If a line is a paragraph, it is not a list item. Lists are for things you can count on fingers.",
      ),
      h2("Numbers, nested lists, and Tab"),
      p(
        "Numbers restart if you make two lists with a paragraph between them. That is correct. If you want 4 after a break, right-click the number, Continue numbering — when you mean it. If the numbers go 1, 1, 1, you have three lists, not one. Select them, click Numbering once. For steps — how to pay fees — use numbers. For what to bring — card, biro, passport photograph — use bullets.",
      ),
      p(
        "Tab at the start of an item nests it under the one above, a smaller pile. Shift+Tab climbs out. That is how “bring” has “two copies of the receipt” underneath. Do not nest three deep in a letter. A letter is not a legal tree. One nest is plenty. Space-bar indent is the cousin of Space-bar columns. It will break when the font changes.",
      ),
      fig(
        "/images/blog/numbered-list.jpg",
        "A numbered list on paper beside the same list on a laptop.",
        "If you print and the numbers still line up, you used a list, not art. If they wander, you used spaces. Undo, real list, print again.",
      ),
      ul([
        "In a blank document, make three bullets: card, biro, photograph.",
        "Enter twice. Write one ordinary sentence.",
        "Make a numbered list of three steps you actually know — save, print preview, print.",
        "Save as list-practice in Letters. PDF if you will send it.",
      ]),
      h2("On the web, and in WhatsApp"),
      p(
        "Email and many websites have the same two buttons. WhatsApp does not. In chat, a hyphen and a line break is all you get, and that is fine for a pocket. For a school, a list in Word, then PDF, still looks like a list on their printer. Do not screenshot a WhatsApp list and call it a document.",
      ),
      p(
        "A list that is longer than a thumb is probably a table, or two lists. Fees with amounts belong in a table, as you learned. A list is for names of things and names of steps. When the walker can say them aloud, you are done. When you are decorating with wings and arrows from a clip-art pane, you have left the lesson. Dots or numbers. Then stop.",
      ),
    ],
  },
  {
    slug: "spell-check-is-a-cousin",
    title: "Spell check is a cousin, not a teacher",
    excerpt:
      "The red line catches letters. It will not catch from for form. Read the letter out loud. Right-click a squiggle. Do not Accept all like a cookie banner.",
    series: SERIES,
    order: 64,
    author: AUTHOR,
    date: lessonDate(64),
    cover: "/images/blog/spellcheck-red.jpg",
    coverAlt: "A word-processor paragraph with a red squiggle under a misspelled word.",
    body: [
      p(
        "A red squiggle appears under a word. People either ignore every line until the page is measles, or they right-click Accept until a name becomes something else. Spell check is a cousin who is good at letters and bad at meaning. It will shout at Okoro, at naira, at a street in Rumuola. It will stay quiet for “I have from for you” when you meant form. This lesson is the squiggle, the dictionary, and the only check that still works: reading the letter aloud.",
      ),
      p(
        "Right-click a red word. A short list of guesses. If the guess is right, click it. If the word is a name you meant, Add to dictionary, or Ignore all for this document. Ignore all is for Okoro. Add to dictionary is for a word you will keep typing on this machine. Do not add a misspelling because you are tired. The cousin will then defend the mistake forever.",
      ),
      fig(
        "/images/blog/spellcheck-red.jpg",
        "A paragraph with a red underline under one wrong word.",
        "One squiggle is a kindness. A page of them means you have not looked yet. Walk the page before you send, the way you look at print preview.",
      ),
      h2("Language, and the blue line"),
      p(
        "Word guesses a language. If the whole letter is squiggled, it may think you are writing French. Review, Language, Set proofing language, English (United Kingdom) is close enough for Nigeria; English (United States) is also fine. Mixed languages in one sentence will confuse it. A quote in Pidgin may stay red. That is the cousin, not a verdict on your English.",
      ),
      p(
        "A blue underline, on many versions, is grammar: a missing question mark, a long sentence, “their” when it wanted “there.” It is still a cousin. It will be wrong about names and about the way we write dates. Read the suggestion. If it wants to flatten a greeting into American office-speak, Ignore. You are not obliged to sound like a template.",
      ),
      fig(
        "/images/blog/reading-letter.jpg",
        "A learner reading a letter on a laptop, a printed draft beside him.",
        "The mouth catches what the squiggle misses. If you stumble, the reader will stumble. Change that sentence. The cousin cannot hear it.",
      ),
      ul([
        "Type a sentence with a real typo — reciept. See the red line. Right-click, choose receipt.",
        "Type your surname. If it squiggles, Ignore or Add. Do not change your name to please Word.",
        "Read the paragraph out loud. Fix one thing the cousin did not see.",
        "Do not click Change all on a name.",
      ]),
      h2("Browser boxes, and what you still owe"),
      p(
        "Gmail and many forms squiggle too. The same manners. A phone will autocorrect a name into a stranger on the way to WhatsApp. Watch the name before you send, especially a number that became a word. Autocorrect is a cousin who interrupts. Hold the word, choose what you typed, if the phone allows.",
      ),
      p(
        "Spell check does not make a letter true. It does not check that the fee is 15,000 and not 150,000. It does not check that you attached the file. You still owe a slow read, the attachment glance, and a subject that tells the truth. The red line is a helper on the walk. It is not the walk. When the cousin is quiet and the mouth is quiet, send.",
      ),
    ],
  },
  {
    slug: "find-and-replace",
    title: "Find and replace",
    excerpt:
      "Find is search inside the page. Replace is change, once or everywhere. Look at the one before you change the thirty. Replace all is a tap you cannot always undo in email.",
    series: SERIES,
    order: 65,
    author: AUTHOR,
    date: lessonDate(65),
    cover: "/images/blog/find-replace.jpg",
    coverAlt: "A Find and Replace box open over a letter on a laptop.",
    body: [
      p(
        "You wrote March in a letter twelve times, and it is now April. You could hunt with your eyes. Find is search for a lost word inside this page, the way Explorer searches a house. Replace is the same hunt, with a new word in its pocket. Ctrl+F finds. Ctrl+H, in Word, opens Find and Replace. This lesson is the box, the one change, and why Replace all is a generator you start only after you have looked.",
      ),
      p(
        "Ctrl+F. A small field. Type the word. Enter, or the arrows, walks to the next. The page jumps. That is enough when you only need to see whether you used a name. In a long PDF, the reader has the same box. In a browser, Ctrl+F finds on this page, not on the whole internet. People forget that and think Google is broken because Find cannot see the next site.",
      ),
      fig(
        "/images/blog/find-replace.jpg",
        "A Find and Replace dialog over a letter.",
        "Two fields: what is there, what you want instead. Replace is one. Replace all is the tap. Look at one before you open the tap.",
      ),
      h2("One, then maybe all"),
      p(
        "In Word, Ctrl+H. Find what: March. Replace with: April. Replace — once — changes the one that is highlighted. Look. If that March was “the Marching band,” you have just made “the Apriling band.” Undo. That is why the next button is not Replace all until you have seen two or three. Match case if you only want March, not march. Whole word if you do not want to cut March out of Marching.",
      ),
      p(
        "Replace all on a name is how Chidi becomes Chidioma in the middle of Chidinma, or how a school’s name eats a similar syllable in a street. If the letter is short, change by hand. The factory is for a long report you have already sampled. Ctrl+Z undoes a Replace all in Word if you do it immediately. In a web form, it may not. In a spreadsheet, Replace all can rewrite a column of codes. Save first, as always.",
      ),
      fig(
        "/images/blog/replace-all.jpg",
        "A notebook with a name crossed out and rewritten, a laptop beside it.",
        "Paper still teaches the caution. One name, looked at. Then the next. The machine is faster. It is not wiser.",
      ),
      ul([
        "In a practice letter, type March twice. Ctrl+H. Replace one with April. Look. Then the second.",
        "Try Find for a word you did not type. Zero results is an answer, not a freeze.",
        "In the browser, Ctrl+F on this academy site for the word computer. Count a few. That is this page only.",
        "Never Replace all on a live form you cannot undo. Copy the text out, or go slowly.",
      ]),
      h2("What Find cannot see"),
      p(
        "It cannot see inside a photograph of a letter. It cannot see a word you spelled three ways. It cannot see “March” if you typed “march” and Match case is on. If you cannot find a sentence you remember, you may be in another window — Alt+Tab — or in an older Save As. Find searches this file, not the house. Explorer searches the house. Two clerks, two rooms.",
      ),
      p(
        "Used gently, Replace is how a wrong phone number leaves a ten-page notice without ten hunts. Used as a panic, it is how a letter becomes nonsense in one click. Sample, then the tap. You already know that manners from printing, from mail merge, from the virus banner. Look. Then act. The box will wait.",
      ),
    ],
  },
  {
    slug: "undo-and-redo",
    title: "Undo, and the thing you did not mean",
    excerpt:
      "Ctrl+Z takes back the last act. Ctrl+Y puts it back. Save is still the floor. Undo is a rope, not a time machine, and it dies when you close the window.",
    series: SERIES,
    order: 66,
    author: AUTHOR,
    date: lessonDate(66),
    cover: "/images/blog/undo-menu.jpg",
    coverAlt: "A word-processor letter on a laptop with an undo control nearby.",
    body: [
      p(
        "You deleted a paragraph. Your stomach dropped. Before you rewrite from memory, try Undo. Ctrl+Z — Command+Z on a Mac — takes back the last thing you did. Type a word, undo, the word leaves. Delete a paragraph, undo, it returns. Do it again, and the thing before that returns. This lesson is that rope, Redo when you undid too far, and the moment the rope is cut: closing the window, or saving over the only copy on purpose.",
      ),
      p(
        "Most programs keep a short memory of acts: typing, delete, paste, a format. Each Ctrl+Z walks one step back. If you undo too many times and the paragraph you wanted is gone the other way, Ctrl+Y or Ctrl+Shift+Z is Redo — walk forward again. You are on a path, not in two universes. Stop when the page looks like the one you meant. Then Save. Undo is not Save. If the light goes, undo dies with the unsaved window.",
      ),
      fig(
        "/images/blog/undo-menu.jpg",
        "A letter on a laptop, undo within reach.",
        "The arrow is a rope. Pull it soon. If you type a new sentence after a mistake, that sentence is now the last act. Undo will eat it first. Undo the mistake before you panic-type.",
      ),
      h2("What undo will not resurrect"),
      p(
        "Empty Recycle Bin is not undone with Ctrl+Z. A file you Shift+Deleted is not in the Bin and not in undo. Replace all, if you then typed, may still undo in Word if you have not closed. A form on a website often has no undo at all. Explorer's undo — Ctrl+Z in a folder — can put a file back you just moved, once, if you have not done something else. Do not rely on it for a wedding folder. Copy, then move, as you learned.",
      ),
      p(
        "Some programs forget after a Save, some do not. Word usually still undoes after Save, until you close. Notepad may be ruder. A browser tab's Back is not undo of a form; it may wipe the form. You have met that cousin. If you pasted the wrong thing over a selected page, undo immediately, before you click elsewhere. Selection plus paste is how whole letters vanish in one act. Undo is the next act. Then breathe.",
      ),
      fig(
        "/images/blog/recovered-letter.jpg",
        "A learner looking at a recovered letter on a laptop.",
        "The paragraph came back. Save now. The rope is not a backup. The USB in the drawer is a backup. Undo is only for this sitting.",
      ),
      ul([
        "Open a practice letter. Type a sentence. Ctrl+Z. It should leave. Ctrl+Y. It should return.",
        "Select a paragraph. Delete. Undo. Confirm it is whole, not half.",
        "Save. Close. Reopen. Ctrl+Z should do nothing useful. That is the cut rope. The file on disk is the truth now.",
        "Do not practise undo on the only copy of a real certificate. Copy first.",
      ]),
      h2("The manners of a mistake"),
      p(
        "If undo cannot help — the window closed, the Bin emptied — stop clicking. Search, Recycle Bin, the USB, last month's backup. Rewriting in a panic makes a second bad copy. You already know the rooms. Walk them in order. A helper can look. A banner that says “restore deleted files — download now” is the virus costume. You know that door.",
      ),
      p(
        "Undo is how a person stays calm at a keyboard. It is not bravery to refuse it. It is not a reason to skip Save every few minutes. The rope is short. The disk is the floor. Use both. Then the thing you did not mean is only a minute, not an afternoon.",
      ),
    ],
  },
  {
    slug: "selecting-text",
    title: "Selecting text without rage",
    excerpt:
      "Highlight is how the machine knows which words you mean. A drag, a double-click, Shift and an arrow. Click once in empty space if the blue block was a mistake.",
    series: SERIES,
    order: 67,
    author: AUTHOR,
    date: lessonDate(67),
    cover: "/images/blog/selecting-text.jpg",
    coverAlt: "A paragraph on a laptop with a few words highlighted.",
    body: [
      p(
        "Copy, bold, delete, replace — all of them need to know which words. That knowledge is a blue block. People call it highlight, or select. Without it, Ctrl+C copies nothing, or copies the last thing, and you paste an old address into a new letter. With too much of it, one tap of a letter wipes a page, because typing replaces a selection. This lesson is how to paint the words you mean, and how to unpaint them before you type.",
      ),
      p(
        "Click at the start of a word. Hold the left mouse button. Drag to the end. Release. The block should cover only what you meant. If your hand shook and took three extra lines, click once in empty space — the block dies — and try again, slower. Double-click a word to take just that word. Triple-click, in Word, often takes the paragraph. Ctrl+A takes everything in the window. You met Ctrl+A as a danger near Delete. It is useful when you mean the whole page, then Copy, then paste into a new file.",
      ),
      fig(
        "/images/blog/selecting-text.jpg",
        "A few words highlighted in a paragraph.",
        "The blue is a choice. Typing now will replace only that choice. If you did not mean the blue, click away before you press a key.",
      ),
      h2("The keyboard, when the mouse lies"),
      p(
        "Click once to plant the cursor. Hold Shift, tap the right arrow. One letter joins the block. Hold Shift, tap down-arrow, a line joins. Shift+Ctrl+arrow takes a word at a time. This is how you select on a trackpad that jumps, or when a finger is tired. Shift+Home takes to the start of the line. Shift+End to the end. You do not need all of them today. Shift and the arrows are enough to stop fighting the pad.",
      ),
      p(
        "If you click in the margin of Word, you may select a whole line. That is a feature. If the whole document goes blue, you Ctrl+A'd or you clicked the corner. Click once in the page. The blue should leave. Then select smaller. A selection that covers a picture as well as words will copy the picture. Click the picture once to select only it, or avoid it with the arrows.",
      ),
      fig(
        "/images/blog/shift-select.jpg",
        "A learner selecting a block of text with the keyboard.",
        "Plant the cursor, then Shift. The block grows from a place you can see. Dragging across a whole page is how people select a heading they did not want.",
      ),
      ul([
        "Type two sentences. Double-click one word. Ctrl+C, click elsewhere, Ctrl+V. Only that word should travel.",
        "Click away. Shift+arrow across a short phrase. Bold it if you have the B button. Click away.",
        "Ctrl+A, then click once in the page. Confirm the blue has gone before you type.",
        "If a whole page vanishes under one letter, Ctrl+Z immediately. That was a selection you did not see.",
      ]),
      h2("On phones, and in forms"),
      p(
        "On a phone, press and hold a word, then drag the two handles. Copy sits in a small menu. The handles are fussy. Zoom first, last lesson but a few, then hold. In a web form, select the box's text with Ctrl+A inside the box — click the box first — not Ctrl+A on the whole page, which may try to copy the site. A greyed box cannot be selected; it is not yours to copy, or it is already filled.",
      ),
      p(
        "Selection is a quiet skill that sits under copy, under bold, under replace, under “why did my letter disappear.” Look for the blue before you press anything that changes words. If there is blue you did not paint, click it off. Then act. The machine is literal. It will spend its next key on whichever words are wearing the blue coat.",
      ),
    ],
  },
  {
    slug: "page-numbers-and-headers",
    title: "Page numbers and a quiet header",
    excerpt:
      "A header is a small line that repeats. A page number is a counter, not a number you type at the bottom of each sheet. Insert it once. The next page will count.",
    series: SERIES,
    order: 68,
    author: AUTHOR,
    date: lessonDate(68),
    cover: "/images/blog/page-numbers.jpg",
    coverAlt: "A letter on a laptop with a page number at the bottom of the page.",
    body: [
      p(
        "A one-page letter does not need a number. A three-page request, a report, a list of names — the person who drops the staple needs to know which sheet is two. People type “2” at the bottom of page two, then add a paragraph, and “2” is now in the middle of page three. A page number is a field that counts. You insert it once. Word walks it forward. This lesson is that field, a quiet header, and not building a second letter in the margin.",
      ),
      p(
        "In Word: Insert, Page Number, Bottom of page, a simple centre or right. Close Header and Footer, or double-click the main letter, to return to the body. The number sits in a footer — a strip at the bottom that repeats. A header is the strip at the top. Double-click near the top of the page to type there. Your name, or the title of the document, once, small. Size 10 is enough. The body stays size 12. If the header is as loud as the greeting, it is not a header. It is a poster in the wrong place.",
      ),
      fig(
        "/images/blog/page-numbers.jpg",
        "A letter with a small page number at the bottom.",
        "The number is a servant. It should not shout. Centre or right, one typeface, no colour. Close the header to type the letter again.",
      ),
      h2("Different first page, and too much"),
      p(
        "A letter often wants no number on the first sheet, then 2 on the second. Header & Footer, Different first page. Leave the first footer empty. Put the number on the second. That is enough. Do not invent “Page 1 of 3” unless someone asked. The extra words eat the margin and look like a manual.",
      ),
      p(
        "A header that contains a logo, a slogan, a phone number, an email, a coloured bar, and a line is a letterhead. Schools and offices have those as templates. You do not need to design one for a request to a landlord. Your name at the top of the body is enough, as in the letter lesson. If you must, one line in the header: Amaka Okoro — March fees. Then stop.",
      ),
      fig(
        "/images/blog/header-letter.jpg",
        "A printed letter with a simple header, beside a laptop.",
        "Print preview still rules. If the header collides with the greeting, the margin is too small or the header is too tall. Shrink the header, not the courtesy of the letter.",
      ),
      ul([
        "Open a two-page practice by pressing Enter until you have a second sheet.",
        "Insert a page number at the bottom. Scroll. Page 2 should say 2 without you typing 2.",
        "Double-click the header. Type one short line. Close the header. Confirm the body is still the body.",
        "Print preview. If the number sits on the text, increase the bottom margin a little.",
      ]),
      h2("PDF, and when to skip"),
      p(
        "Save as PDF after the numbers look right. A PDF keeps the footer. If you number in Word then export, do not also stamp numbers in a second program. Two counters fight. For a one-page PDF of a receipt, skip the header. For a ten-page notes file, the number is kindness.",
      ),
      p(
        "Headers are not a place to hide a second essay. They repeat on every page, which is how a joke becomes a punishment. Name, or title, or nothing. Number at the bottom. Body in the middle. You already know white space. The strips at the top and bottom are more of it, with one small fact each.",
      ),
    ],
  },
  {
    slug: "cc-bcc-and-reply-all",
    title: "Cc, Bcc, and Reply all",
    excerpt:
      "To is the person who must act. Cc is the person who should see. Bcc is a copy they did not all see each other get. Reply all is a loud room. Use it rarely.",
    series: SERIES,
    order: 69,
    author: AUTHOR,
    date: lessonDate(69),
    cover: "/images/blog/cc-bcc.jpg",
    coverAlt: "An email compose window showing To, Cc and Bcc fields.",
    body: [
      p(
        "You already send To, Subject, body. Two extra fields sit on the envelope, often hidden behind a small Cc. Cc means carbon copy — a name from the age of paper: this person should see the letter, but it is not their job to answer. Bcc means blind carbon copy: they get it, and the others do not see their address. Reply all sends your answer to everyone who was on the original. This lesson is who belongs in which field, and the moment Reply all turns a school thread into a market.",
      ),
      p(
        "To: the person who must do something — accounts, the landlord, Mrs Amadi. One address, or two if they share the job. Cc: your own second address if you want a copy; a supervisor who asked to be kept in the picture; a parent on a school mail if the school said so. Not a whole class. Not a group of cousins “for awareness.” Extra eyes are not free. They cost the other person a minute, and they cost you a wider room if you later need to speak plainly.",
      ),
      fig(
        "/images/blog/cc-bcc.jpg",
        "To, Cc and Bcc on an email, a short body underneath.",
        "If you cannot say why a person is in Cc, they should not be there. Bcc is not a secret insult. It is a way not to publish a list of addresses.",
      ),
      h2("Bcc, and the list you should not expose"),
      p(
        "If you must mail twenty parents, or twenty members, put your own address in To, and the twenty in Bcc. Each person receives one letter. They do not receive each other's addresses. Putting twenty people in To or Cc is how a family WhatsApp is born inside email, and how a stranger harvests numbers. Bcc is manners for a list. It is not a place to hide a boss so you can pretend they were not told. If the To person should know the boss was copied, use Cc.",
      ),
      p(
        "Reply is to the sender. Reply all is to the sender and every Cc, and sometimes a list you cannot see. Before you press it, look at the To line of your reply. If there are fifteen names, ask whether fourteen of them need “thank you.” Usually they do not. A thread about a timetable that becomes twenty “noted” mails is how people mute the school. Reply to the sender, or to the one person you must correct.",
      ),
      fig(
        "/images/blog/reply-all.jpg",
        "A learner pausing at an email on a laptop.",
        "The pause is the skill. If the mail went to a group, your joke goes to the group. If you did not mean the group, Reply, not Reply all.",
      ),
      ul([
        "Open Compose. Show Cc and Bcc if they are hidden — a small link next to To.",
        "Send yourself a practice: To your address, Bcc a second address you own if you have one. Confirm both arrive, and that To does not list the Bcc.",
        "Find an old group mail. Look at Reply versus Reply all. Do not send. Only look at who would receive it.",
        "Never Bcc a person on a quarrel so they can “see who you are.” That is theatre. Leave them out, or use Cc honestly.",
      ]),
      h2("Forward, and the chain"),
      p(
        "Forward sends the letter on. The chain below may hold old addresses and an argument. Read the chain before you forward to a new person. Cut what they do not need, or copy the one fact into a new mail. “Please find below” with six weeks of Reply all is not a briefing. It is a pile.",
      ),
      p(
        "You now have four doors: To, Cc, Bcc, Reply all. Most letters use only To. That is not unsophisticated. That is a letter with one job. Extra fields are for extra jobs. If you cannot name the job, close the field. The envelope should be as quiet as the body.",
      ),
    ],
  },
  {
    slug: "an-email-signature",
    title: "A signature at the bottom of a mail",
    excerpt:
      "A signature is your name and how to reach you, repeated without retyping. Three lines is enough. A novel, a logo, and a quote are a poster glued to a letter.",
    series: SERIES,
    order: 70,
    author: AUTHOR,
    date: lessonDate(70),
    cover: "/images/blog/email-signature.jpg",
    coverAlt: "An email with a short name-and-phone signature at the bottom.",
    body: [
      p(
        "Every mail you send should still sign off like paper: your name, a number. Typing that every time is how people forget the number, or send from a nickname. A signature is a small stamp the mailer adds at the bottom. You write it once. It walks with every new compose. This lesson is three lines, how to switch it on, and what not to paste from a cousin's colourful template.",
      ),
      p(
        "In Gmail: the gear, See all settings, General, Signature. Create new. Type your full name, as on your ID. Next line: a phone number you answer. Next line, if you must: Computer Basics student, or the name of your shop, or nothing. Save. Tick that it applies to new mail, and, if you like, to replies. On Outlook or the Mail app, the words are Signature in settings. Same three lines. You do not need a different stamp for each mood.",
      ),
      fig(
        "/images/blog/email-signature.jpg",
        "A short signature under an email body.",
        "Name, number, one optional line. Black, size of the body or a little smaller. If it is louder than the letter, it is wrong.",
      ),
      h2("Replies, and the stack of stamps"),
      p(
        "A signature on every reply in a long thread repeats your number ten times. Some people switch “insert on reply” off and sign the first mail only. Either is polite. What is not polite is a signature taller than the answer — a logo, a banner, a row of social icons, a confidentially notice copied from a bank, a proverb. The other person has to scroll past your billboard to find “Tuesday is fine.”",
      ),
      p(
        "Do not put a scanned handwriting as a huge image. Do not put a QR to your WhatsApp unless you are a shop and they asked. Do not put a second person's number “in case.” One person, one stamp. If you send for an office, the office will give you the stamp. Until then, you.",
      ),
      fig(
        "/images/blog/signature-block.jpg",
        "A learner writing a full name in a notebook, an email open on the laptop.",
        "The paper name and the stamp should match. A nickname in the signature and a legal name in the letter is how clerks file you twice.",
      ),
      ul([
        "Write three lines on paper: name, number, optional one-line role.",
        "Put them in the mailer's signature settings. Send yourself a new mail. Confirm they appear.",
        "Open a reply to an old mail. Decide whether you want the stamp there too. One tick.",
        "If a colourful template arrives in WhatsApp “for professionals,” delete it. Three lines you typed are professional.",
      ]),
      h2("When the stamp is wrong"),
      p(
        "A new number: edit the signature the same day. An old number in the stamp is how people miss you for a term. If you use two addresses, set the stamp on both, or you will send from the academy-looking address with no name. On a shared computer, do not save a signature in the house profile. Guest, then type your name at the bottom once, as you used to. The stamp lives in the bag. You know whose bag you are in.",
      ),
      p(
        "A signature is not a CV. It is not a poster. It is the printed name under the last sentence, with a number so the other person can call instead of hunting. When the letter is one job, the stamp is one name. You have reached the end of the envelope. To, maybe Cc, body, attachment, stamp. Send. Then wait, like an adult.",
      ),
    ],
  },
  {
    slug: "open-with-the-right-program",
    title: "Open with — this program, not that one",
    excerpt:
      "A file is not a program. Double-click asks Windows to guess. Open with is how you choose. Always is a marriage. Once is a visit.",
    series: SERIES,
    order: 71,
    author: AUTHOR,
    date: lessonDate(71),
    cover: "/images/blog/open-with.jpg",
    coverAlt: "An Open with list of programs over a file on a laptop.",
    body: [
      p(
        "A PDF is a plate. A .docx is a working letter. A .jpg is a photograph. None of those is Word, or Chrome, or Photos. They are papers. A program is the pair of hands that opens the paper. Double-click asks Windows to guess which hands. Sometimes the guess is a browser that cannot edit. Sometimes it is a shop's “PDF Professional” that shouts. Open with is how you pick the hands for this sitting, or for always. This lesson is that choice, and why Always is a bigger word than it looks.",
      ),
      p(
        "Right-click the file, Open with, choose a name you recognise — Word, Edge, Photos, Excel. If the list is short, Choose another app, More apps. Once, or Always. Once is a visit: this time, Photos. Always is a marriage: every .jpg from now on. Do not marry a program you met today from a banner. Visit first. If the file opens and looks like itself, you chose well. If Word tries to eat a photograph, you chose badly. Close. Open with, the other hands.",
      ),
      fig(
        "/images/blog/open-with.jpg",
        "A list of programs offering to open a file.",
        "The list is a set of hands, not a set of files. Pick the hands that already live on the machine. A name you do not remember installing is the shop guest from the uninstall lesson.",
      ),
      h2("When the wrong marriage is already made"),
      p(
        "If every PDF now opens in a browser and you wanted a reader, right-click a PDF, Open with, pick the reader, Always. The marriage changes. Settings, Apps, Default apps, is the same idea in a longer list — which program opens .pdf, which opens .jpg. You do not need to tour that list on day one. One file, Open with, is enough to fix a nuisance.",
      ),
      p(
        "A file that says “Windows cannot open this” is often a type you do not have hands for — .psd, .ai, a specialist thing — or a type that was renamed until the dot lied. You know the dot from renaming. Put the real type back if you hid it. If the type is honest and you still have no program, you do not have to fetch one from the first advert. Ask whether you even need to open it, or whether a PDF export exists instead.",
      ),
      fig(
        "/images/blog/default-app.jpg",
        "A learner looking at a folder of files on a laptop.",
        "The paper does not change because you changed the hands. A letter opened in Word and in Google Docs is still the letter. Choose the hands you can type with.",
      ),
      ul([
        "Right-click a photograph. Open with Photos or Preview, once. Confirm you see the picture.",
        "Right-click a PDF. Open with your browser, once. Then try another program if you have one.",
        "Do not tick Always until you have seen the file look right.",
        "If a stranger program appears in the list, do not pick it. Uninstall is a different sitting.",
      ]),
      h2("The browser is not always the wrong hands"),
      p(
        "A PDF in Edge or Chrome is fine for reading. Word is for editing. Photos is for a picture you might crop. Excel is for a grid that must add. Matching the job to the hands is the whole skill. Double-click is a habit. Open with is a decision. When the habit is wrong, use the decision. The file will wait. It is only paper until hands pick it up.",
      ),
    ],
  },
  {
    slug: "kilobytes-and-megabytes",
    title: "What KB, MB and GB actually mean",
    excerpt:
      "Size is how heavy the suitcase is. A page of text is light. A phone photograph is a brick. Email has a door that will not take bricks. Look at the Size column.",
    series: SERIES,
    order: 72,
    author: AUTHOR,
    date: lessonDate(72),
    cover: "/images/blog/file-size-column.jpg",
    coverAlt: "A folder window showing a Size column for a few files.",
    body: [
      p(
        "A file has a weight. The computer writes it as KB, MB, GB — kilobytes, megabytes, gigabytes. People send five phone photographs, the mail bounces, and they think Gmail is broken. The door has a width. A letter is a letter. A photograph from a modern phone is a wall, as you learned when shrinking. This lesson is the numbers on the Size column, what will travel, and what will fill a USB or a disk until the bar goes red.",
      ),
      p(
        "Rough, in the hand: a page of Word is often tens of KB. A PDF of that page is similar, unless it is full of pictures. One phone photograph is often 2–8 MB. A minute of video can be tens of MB. A gigabyte is about a thousand megabytes — a small pile of video, or hundreds of photographs, or a huge pile of letters. You do not need the exact science. You need: text is light, photos are heavy, video is heavier, and installers are often heavy on purpose.",
      ),
      fig(
        "/images/blog/file-size-column.jpg",
        "The Size column in a folder of mixed files.",
        "Details view, Size. Sort by size if the disk is fat. The largest names at the top are the first to walk to a USB or to leave.",
      ),
      h2("Email, USB, and the red bar"),
      p(
        "Gmail and many offices refuse around 20–25 MB for the whole mail. One unshrunk photograph can be legal. Five can bounce. A zip of a wedding will not go. Drive, or the USB in the pocket, or shrink as you learned. WhatsApp compresses pictures so they travel; that is soup, not a size lesson. Document keeps the weight, and may still refuse if the brick is huge.",
      ),
      p(
        "A USB that says 8 GB is not 8 GB of your photos after formatting, and not 8 GB if it is a fake stick from a stall. Copy, then open a file from the stick, then eject. If the stick claims 1 TB and cost a sandwich, believe the sandwich. On the computer, This PC, the C: bar — green is room, red is the slow-computer lesson. Size is why that bar moves.",
      ),
      fig(
        "/images/blog/storage-bar.jpg",
        "A laptop disk bar with a USB drive on the desk.",
        "The bar is the tank. Photographs and video fill it. Letters do not. Empty Recycle Bin after you have looked. Do not delete Windows because a number looked large.",
      ),
      ul([
        "Open Documents. Switch to Details view. Show the Size column if it is hidden.",
        "Find a letter and a photograph. Compare the two numbers. The photo should be the brick.",
        "If you have a USB, look at its free space the same way.",
        "Before you email a picture, look at Size. If it is more than 2 MB and they only need a face, shrink a copy.",
      ]),
      h2("What the number is not"),
      p(
        "It is not quality by itself. A 50 KB passport photo can be the right photo. A 12 MB blur is still a blur. It is not “speed” of the computer. A large file can open fine on a healthy machine. It is not a virus scan. Bigger is not guiltier. A shop that formats because “too many GB” without copying your Documents is selling convenience, not care.",
      ),
      p(
        "When a form says “maximum 100 KB,” obey the number, as with the small photograph. When a portal says “2 MB,” that is the door. The Size column is how you know before you try. Look, then shrink or zip or Drive. The suitcase has a scale. Use it before you walk to the post.",
      ),
    ],
  },
  {
    slug: "the-right-click-menu",
    title: "The right-click menu is a map",
    excerpt:
      "The right button is not a second click. It is a list of extra acts for whatever is under the pointer. Open, Rename, Delete, Open with, Properties. Click empty space to dismiss it.",
    series: SERIES,
    order: 73,
    author: AUTHOR,
    date: lessonDate(73),
    cover: "/images/blog/right-click-menu.jpg",
    coverAlt: "A small right-click menu open over a file on a laptop.",
    body: [
      p(
        "The first sitting named the right button and told you not to fear the menu. You have used it since: New folder, Compress, Open with, Restore. This lesson is the menu as a map, not a jump scare. Whatever sits under the pointer — a file, a paragraph, the desktop, a browser link — owns a short list of extra acts. Left click selects or opens. Right click asks “what else?” If the list appears and you did not want it, click empty space, or press Escape. The list is not an error. It is a drawer.",
      ),
      p(
        "On a file: Open, Open with, Rename, Cut, Copy, Delete, Properties, Send to, Compress. On a paragraph in Word: Cut, Copy, Paste, Font, sometimes a translator you did not ask for. On a browser page: Back, Save image, Inspect — Inspect is for builders; you can ignore it. On empty desktop: View, New, Display settings. The list changes because the thing under the pointer changed. That is the whole design. Look at the words. If you do not recognise a word, do not pick it. The drawer will wait.",
      ),
      fig(
        "/images/blog/right-click-menu.jpg",
        "A short right-click menu over a file icon.",
        "A few honest verbs. If the menu is a novel of extras, a shop installed guests. You can still pick Open and leave the rest.",
      ),
      h2("Trackpad, and the extra guest"),
      p(
        "A laptop without a mouse: two-finger tap, or a bottom-right corner of the trackpad, or hold Control and click on a Mac. If nothing appears, the pad may be in a mode that wants a physical button. Try a USB mouse for a week if the pad fights you. You already know USB guests.",
      ),
      p(
        "A menu that offers “Scan with PC Cleaner” or “Upload to MegaSpeed” is a guest talking. You do not owe it a click. Uninstall the guest when you are ready. Right-click is not improved by twelve extra lines. It is worsened. The useful verbs are still near the top: Open, Rename, Delete.",
      ),
      fig(
        "/images/blog/right-click-learner.jpg",
        "A learner using a mouse, a small menu on the laptop screen.",
        "Point first, then the right button. If you right-click the wrong icon, the wrong drawer opens. Click away. Point again.",
      ),
      ul([
        "Right-click the desktop. Look. Escape. Nothing should have changed.",
        "Right-click a file you can afford to practise on. Read Open, Rename, Delete. Do not Delete it.",
        "Right-click a blank part of a Word page. See how the list differs.",
        "If a name in the list is a stranger, write it down. That is a clue for Apps, later, not a reason to click it now.",
      ]),
      h2("Properties, and the quiet facts"),
      p(
        "Properties, at the bottom of many file menus, is a fact sheet: size, type, date modified, sometimes a Security tab you can leave alone. Size you now know. Date modified is when the file last changed — useful when two receipts have similar names. Read-only is a tick that says “do not save over me”; useful on a template. You do not need to live in Properties. Know it exists so a helper who says “check the size” is not speaking a foreign language.",
      ),
      p(
        "The right button is how a computer hides power in a small list instead of fifty icons. You will not memorise every list. You will look, pick a verb you can defend, or leave. That is the same manners as the installer boxes. Next is not a trance. The menu is not a command. It is an offer.",
      ),
    ],
  },
  {
    slug: "drag-and-drop",
    title: "Drag and drop without losing the file",
    excerpt:
      "Hold, move, release. Inside one disk, that is often a move. Onto a USB, it is often a copy. Watch the ghost icon. Drop on a folder, not on a hole.",
    series: SERIES,
    order: 74,
    author: AUTHOR,
    date: lessonDate(74),
    cover: "/images/blog/drag-drop.jpg",
    coverAlt: "A file icon being dragged toward a folder on a laptop screen.",
    body: [
      p(
        "Drag and drop is pick up, walk, put down. Click a file, keep the button held, move, release on a folder. The file goes, or a copy goes, depending on the walk. People drop onto the gap between windows and the file vanishes into a path they did not mean — Desktop, a neighbour folder, Recycle Bin if they drifted onto the Bin. This lesson is a deliberate drop, the difference between move and copy, and what to do when the ghost icon lies.",
      ),
      p(
        "Open two windows: Documents on the left, the USB or School/2026 on the right. Click the file in the left. Hold. Drag until the right folder is highlighted — a box or a name that lights. Release. If you are walking inside the same disk, Windows often moves: the original leaves the first room. If you are walking to a USB, it often copies: both rooms have it. A small plus sign on the ghost means copy. No plus can mean move. Hold Ctrl while you drop to force a copy. Hold Shift to force a move. If you cannot remember, copy with Ctrl+C and paste. The long way is still correct.",
      ),
      fig(
        "/images/blog/drag-drop.jpg",
        "A file being dragged from one folder toward another.",
        "The destination should light up before you release. If nothing is lit, you are dropping into a hole. Keep holding, move until a folder claims it, then release.",
      ),
      h2("When it disappears"),
      p(
        "Undo in the folder — Ctrl+Z — can put a moved file back, once, if you have not done something else. Search the rooms you know. Check Desktop. Check Recycle Bin if the path crossed the Bin. Check the USB. A drop that looked like a copy to a stick that then ejected early can corrupt, as a yanked USB does. Wait for the progress box. Then open the file from the new room before you delete the old one. Copy, look, then delete, is still the religion. Drag is only a faster copy or move.",
      ),
      p(
        "Dragging a file onto a Word window may insert it as a picture or an attachment inside the letter. Dragging onto a browser may upload it to a site you did not mean to feed. If you did not mean that, undo in Word, or close the tab without sending. Drag onto folders, not onto programs, until you are sure.",
      ),
      fig(
        "/images/blog/dragging-file.jpg",
        "A learner dragging a file between two folder windows.",
        "Two windows, both paths visible. A drag across a crowded desktop is how files land in the wrong envelope. Clear the desk, then walk.",
      ),
      ul([
        "Copy a practice file first, so the original is safe.",
        "Open Documents and a second folder. Drag the copy. Confirm which room it lives in now.",
        "If it moved and you wanted both, copy it back. Next time hold Ctrl, or use Ctrl+C.",
        "Do not drag the only wedding folder onto a USB and then empty the laptop before you have opened a photo from the stick.",
      ]),
      h2("On a trackpad, and on a phone"),
      p(
        "Trackpads make drag fussy: the finger lifts, the drop fires early. A mouse is kinder for this one act. On a phone, hold a photo, then a share sheet — that is not the same as a Windows move. Do not practise drag with files you cannot replace. Practise with delete-practice, zip-practice, the names you already made. When the drop is boring, you have learned it. Boring is the goal. Drama is a file in a hole.",
      ),
    ],
  },
  {
    slug: "a-one-page-cv-that-is-honest",
    title: "A one-page CV that is honest",
    excerpt:
      "A CV is a letter about work you have actually done. One page, real dates, a number that rings. Empty years are allowed. Invented jobs are not.",
    series: SERIES,
    order: 75,
    author: AUTHOR,
    date: lessonDate(75),
    cover: "/images/blog/simple-cv.jpg",
    coverAlt: "A simple one-page CV on a laptop screen.",
    body: [
      p(
        "A CV is not a poster of who you wish you were. It is a one-page letter that says your name, how to reach you, and what you have actually done — school, a shop, a church role, a computer course you finished. Shops sell templates with gold lines and a photograph that ate the margin. Offices in this city still read a quiet page. This lesson is that page in Word, with the bones you already have: one typeface, a list, the truth.",
      ),
      p(
        "Name at the top, large enough to read, not a banner. Next line: phone, email you can open — the address you made on purpose. Then a short sentence if you must: Seeking computer basics work, or Available for shop and office tasks. Then headings: Education, Experience, Skills. Education can be SSCE, a year, a school that exists. Experience can be “helped at a family stall, 2024–2025” or “completed Computer Basics at Cyber Elias Academy, Port Harcourt.” Skills: things you can do at a desk this week — email, Word, Excel totals, not “Microsoft Office Suite Guru.” If you cannot demonstrate it on a machine, it is not a skill yet.",
      ),
      fig(
        "/images/blog/simple-cv.jpg",
        "A one-page CV with a name, a few headings and white space.",
        "White space is honesty. A packed page of twenty courses you have not taken is a poster. One page they can hold is a CV.",
      ),
      h2("Dates, gaps, and what to leave off"),
      p(
        "Year–year is enough. Do not invent a job to fill 2023. A gap is ordinary. A lie is a conversation you will lose in the room. Do not put a BVN, a home address if you are not asked, a photograph unless they asked, a date of birth unless they asked. Do not put a motivational quote. Do not put “references available on request” if you have no one to name; name one person who will pick up, with their permission, or omit the line.",
      ),
      p(
        "Bullets, not a novel. Two or three lines under each role: what you did, in verbs you can stand by — received customers, kept a fee book in Excel, typed letters. Spell check, then read aloud. Your name must be spelled as on your ID. Save as yourname-cv-2026.docx, then PDF. Send the PDF unless they asked for Word. You know why.",
      ),
      fig(
        "/images/blog/cv-print.jpg",
        "A printed one-page CV beside a laptop, a learner reading it.",
        "Print one copy. If you would be embarrassed to hand it over, it is not finished. Fix the page, not the printer.",
      ),
      ul([
        "One page in Word. Name, phone, email, Education, Experience, Skills.",
        "Three true bullets under one real thing you have done.",
        "Spell check. Read aloud. PDF. Open the PDF. Confirm it is one page.",
        "Do not download a “professional CV builder” from an advert. Word is enough.",
      ]),
      h2("When they asked for two pages, and when they asked for a form"),
      p(
        "Some offices want their own form. Fill the form. Attach the CV if they said so, not instead. Some public-sector processes want NYSC, certificates, a longer pile. That pile is not this one page; it is a folder, School or Work, named. The one page is the door. The folder is the house. Do not email the whole house unasked.",
      ),
      p(
        "A CV is a letter with a longer memory. It should still look like something you would sign. When the page is quiet and true, it is done. Update it when something real happens — a course finished, a role ended — not every Saturday. The file lives in Documents/Work or School, backed up, like anything you would cry about. You already know that part. The new part is refusing to invent a life to fill a margin.",
      ),
    ],
  },
  {
    slug: "google-docs-when-there-is-no-word",
    title: "Google Docs when there is no Word",
    excerpt:
      "A letter can live in the browser. Same bones: a page, a cursor, Save that happens by itself if you are online. Download a PDF before you send it to an office.",
    series: SERIES,
    order: 76,
    author: AUTHOR,
    date: lessonDate(76),
    cover: "/images/blog/docs-browser.jpg",
    coverAlt: "A simple letter open in a browser on a laptop.",
    body: [
      p(
        "Not every machine has Word. A business-centre PC may have a browser and nothing else worth using. Google Docs is a word processor that lives on the internet, behind the Google account you made on purpose. The page looks like a letter. The cursor blinks. The ribbon is quieter. This lesson is opening a blank doc, typing like Word, and taking a PDF home so the office does not have to log into your cloud.",
      ),
      p(
        "Walk to docs.google.com yourself. Blank document. The title at the top, where it says Untitled, is the file name — click it, type letter-landlord-2026, Enter. That is Save As, in a different coat. If you are online, it keeps saving. If the café Wi‑Fi dies, a small notice will say so; stop typing important sentences until the road is back, or copy the text into Notepad as a rope. The cloud is a building with a road. You know that.",
      ),
      fig(
        "/images/blog/docs-browser.jpg",
        "A one-page letter in a browser window.",
        "The address bar is still the street. If you arrived from a search advert, you may not be in Docs. Type the address. Then type the letter.",
      ),
      h2("The same bones, a few different buttons"),
      p(
        "Font, size 12, bold, alignment — they are there. File, Download, PDF, or Microsoft Word (.docx) if someone insisted on Word. Download lands on the mat, then you walk it into Letters. Print still wants preview. A table, a list, find and replace — cousins of what you already learned, sometimes under a smaller menu. You do not need Add-ons. You do not need a template with a purple sidebar. A blank page is still a blank page.",
      ),
      p(
        "Offline: Google can cache Docs on a machine you use often, if you tick that in settings on a calm day. Until then, treat Docs as a café tool and Word or Writer as the desk tool. Do not start a ten-page report in a browser on a dying bundle. A one-page request is the right size for this sitting.",
      ),
      fig(
        "/images/blog/docs-learner.jpg",
        "A learner typing a letter in the browser, notebook beside the laptop.",
        "The notebook is still allowed. If the tab closes, the doc should still be in Drive under that title. If the title was Untitled, hunt Untitled. Name it while you remember.",
      ),
      ul([
        "Open docs.google.com signed into your account. Blank document. Name it practice-docs.",
        "Type a short letter. Download as PDF. Open the PDF from Downloads. Move it to Letters.",
        "Close the tab. Open docs.google.com again. Confirm practice-docs is in the list.",
        "Do not install a “Docs offline pro” from a banner. The real setting is inside Google, on the real street.",
      ]),
      h2("Whose machine, whose bag"),
      p(
        "On a shared computer, Docs in Guest is a trap: you will type, then Guest will throw the bag away if you were not signed in. Sign in, write, Download the PDF to your USB, sign out, as in the five-minute walk. The doc remains in Drive, which is your building, not theirs — if you signed into your account. If you signed into theirs, you have written a letter in their house. Copy it out. Sign out.",
      ),
      p(
        "Docs is Word without a disc. It is not better manners, not worse. A PDF you downloaded is what you attach. A link is the next lesson. For today: a page, a name at the top, a PDF on the USB. The office can read a plate. They should not have to knock on your cloud to do it, unless they asked.",
      ),
    ],
  },
  {
    slug: "sharing-a-file-without-publishing-it",
    title: "Sharing a file without publishing it",
    excerpt:
      "Anyone with the link is a public tray. A named email is a letter to one person. Viewer is enough for a receipt. Editor is a second pair of hands on your only copy.",
    series: SERIES,
    order: 77,
    author: AUTHOR,
    date: lessonDate(77),
    cover: "/images/blog/share-dialog.jpg",
    coverAlt: "A share dialog with an email field on a laptop screen.",
    body: [
      p(
        "Drive, Docs, and many portals offer Share. A box, an email field, a permission. People tick “anyone with the link” because it is fast, then paste the link in a WhatsApp group of forty, then wonder why a stranger commented. Anyone with the link is a tray on the street. A named address is a letter. This lesson is the box, Viewer versus Editor, and when a PDF attachment is still the kinder door.",
      ),
      p(
        "Share, add the person's real email, choose Viewer if they only need to read, Commenter if they should mark, Editor if they must change the words. Send. They get mail with a link, if that address is a Google address that can open it. If they have no Google account, Viewer links can fail, or ask them to sign in. Then attach a PDF instead. Do not fight the cloud when the envelope still works.",
      ),
      fig(
        "/images/blog/share-dialog.jpg",
        "A share box with an email and a permission.",
        "One address, one permission. If the box says Restricted, only people you named. That is the default you want. Anyone with the link is the extra you must mean.",
      ),
      h2("Anyone with the link, and the group"),
      p(
        "Anyone with the link, Viewer, is for a poster you would tape on a gate — a timetable that is not private. It is not for a passport scan, a fee receipt with an account number, a CV with your phone. A link in a group chat forwards forever. You cannot un-forward. Restricted, named people, is how a receipt should travel. If the school asked for a link, Restricted, their address, Viewer. Then a short WhatsApp that says you shared it, as you learned when chat is a knock.",
      ),
      p(
        "Editor on your only copy is two people in one letter. That is useful for a shared fee list in a family. It is how a cousin deletes a paragraph you needed. File, Make a copy, share the copy, keep the original in a folder they cannot see. You already know Save As. This is Save As for the cloud.",
      ),
      fig(
        "/images/blog/share-learner.jpg",
        "A learner pausing before sharing a document.",
        "The pause is: who, and what may they do. If you cannot name both, attach a PDF. The link will wait.",
      ),
      ul([
        "Upload or create a practice doc that holds no secrets.",
        "Share it to your own second address as Viewer, Restricted. Open it from the other side.",
        "Look at Anyone with the link. Do not turn it on for this file. Know where the tap is.",
        "Remove the share when you are done practising. Share, the person, Remove.",
      ]),
      h2("Turning it off"),
      p(
        "Share, the list of people, Remove, or change Editor to Viewer. Anyone with the link: change back to Restricted. Old links then die for strangers. Copies people already downloaded do not die. A PDF you emailed is out of the house, as paper is. Share is not a spell. It is a door with a list. Keep the list short. Prefer Viewer. Prefer a name. Prefer a PDF when the other person only needs to read and print.",
      ),
    ],
  },
  {
    slug: "comments-on-a-document",
    title: "Comments on a document",
    excerpt:
      "A comment is a note in the margin, not a change to the letter. Reply, resolve, or ignore. Suggesting is a cousin that writes in another colour. You still own Accept.",
    series: SERIES,
    order: 78,
    author: AUTHOR,
    date: lessonDate(78),
    cover: "/images/blog/doc-comment.jpg",
    coverAlt: "A document with a short comment in the margin.",
    body: [
      p(
        "Two people on one letter can shout in the body: red, caps, “CHANGE THIS.” A comment is a sticky note on a sentence. The sentence stays until someone edits it. Google Docs, Word, and PDFs with comments all use the same idea. This lesson is leaving a note, reading one, and not treating a comment as an order from the machine.",
      ),
      p(
        "Select a word, as you learned. Right-click, Comment, or the + in the margin. Type one thought: “Date is March, should be April.” Send or Comment. A small mark sits in the margin. The other person clicks it, replies, or Resolve. Resolve hides the thread. It does not mean the sentence changed. Look at the words. If they are still wrong, the note was only a note.",
      ),
      fig(
        "/images/blog/doc-comment.jpg",
        "A highlighted sentence with a comment beside it.",
        "The letter is the page. The note is the margin. Do not put the whole argument in the body in red. Put a sentence in the margin.",
      ),
      h2("Suggesting, and Accept"),
      p(
        "Suggesting mode, in Docs, writes new words in a colour and calls them a suggestion. The owner sees Accept or Reject. That is mail merge's cousin: a factory of edits you still have to look at. Accept all is Replace all. Sample first. In Word, Track Changes is the older name. Same manners. If you are the owner, you are not rude to Reject. It is your letter.",
      ),
      p(
        "Turn on Suggesting only when two people agreed to share a draft. If you only needed them to read, Viewer, no comments even, or Commenter without Editor. A stranger with Editor and a loud Suggesting session is how a CV becomes someone else's. Share settings first, comments second.",
      ),
      fig(
        "/images/blog/suggesting-edits.jpg",
        "Two people looking at a commented document on one laptop.",
        "Talk if you are in the same room. The margin is for when you are not. A comment that says “see me” is a knock. The body is still the work.",
      ),
      ul([
        "In a practice doc, select one word, add a comment, resolve it. Confirm the word did not change.",
        "If Docs offers Suggesting, type one suggested word. Reject it. Confirm the original returned.",
        "Do not comment on a passport number in a file shared with Anyone with the link.",
        "When a thread is finished, Resolve. A page of old notes is a second letter nobody asked for.",
      ]),
      h2("Email comments, and what not to @"),
      p(
        "Some tools mail you for every comment. That can be a tap on the shoulder. It can also be a siren. Mute a document you only needed to send. @name in a comment notifies that person if they are on the share list. Do not @ a list. Do not paste an OTP into a comment. The margin is not a vault.",
      ),
      p(
        "A comment is manners for two desks. It is not a court. You may disagree in a short reply, then edit the body yourself if you own it. When the page is clean and the margin is empty, you are done. Download the PDF if the office wants a plate without notes. Notes are for the kitchen. The plate is for the tray.",
      ),
    ],
  },
  {
    slug: "sorting-a-spreadsheet-column",
    title: "Sorting a column without scrambling the rows",
    excerpt:
      "Sort is lining up a register. Select the whole table, then sort by one column. Sorting a single column on its own is how names leave their amounts.",
    series: SERIES,
    order: 79,
    author: AUTHOR,
    date: lessonDate(79),
    cover: "/images/blog/spreadsheet-sort.jpg",
    coverAlt: "A simple spreadsheet with a column sorted A to Z.",
    body: [
      p(
        "A register in a book is in the order people arrived. A spreadsheet can line the same rows up by name, or by amount, or by date. Sort is that lining up. The danger is sorting one column while the neighbours stay still — Amaka keeps 500, the 500 slides under Chidi, and the book is now a lie. This lesson is select the table, sort by one header, and undo if the amounts look drunk.",
      ),
      p(
        "Click any cell inside the table. Data, Sort, or the small A↓Z button. Tell it which column is the key — Name, or Amount. A to Z, or smallest to largest. Expand the selection if it asks. Yes, expand. That is the machine saying “do you mean the whole register?” You do. Headers: tick “my data has headers” so Name does not sort into the middle of the list as if it were a person.",
      ),
      fig(
        "/images/blog/spreadsheet-sort.jpg",
        "A Name column sorted, amounts still on the same rows.",
        "Each row is a person or a fact. Sort moves whole rows. If only one column moved, Undo immediately. The book is wrong until you do.",
      ),
      h2("Numbers, text, and mixed cells"),
      p(
        "Amounts stored as numbers sort by size. Amounts stored as words — ₦500, or 500 with a space — sort as text, which puts 1000 before 200 because 1 is before 2. You met this in the grid lesson. Format the column as number, or type digits only, then sort. Dates need to be real dates, not “March 3” typed as a story in some cells and 03/03 in others. Clean, then sort. Sorting will not clean.",
      ),
      p(
        "A filter — the funnel — hides rows that do not match. It is not sort. It is a pair of blinkers. Useful when the list is long. Clear the filter when you are done or you will print a half register and call it complete. Undo undoes a sort in Excel and Sheets if you have not closed. Save a copy before you sort a fees book you cannot rebuild. Save As, fees-2026-sorted, leave fees-2026 alone.",
      ),
      fig(
        "/images/blog/sorted-list.jpg",
        "A paper list beside a sorted spreadsheet.",
        "If the paper and the grid disagree after a sort, believe the paper until you find the slipped column. Then Undo, expand the selection, sort again.",
      ),
      ul([
        "Make a tiny table: three names, three amounts. Save.",
        "Sort by Name, whole table. Confirm each name kept its amount.",
        "Undo. Sort by Amount. Confirm again.",
        "On a copy, sort only the Name column if the program lets you. See the lie. Undo. Never do that to a real book.",
      ]),
      h2("Print after, not before"),
      p(
        "Sort, look, then print. A printed pile in arrival order may be what the meeting wants; a sorted pile may be what the accountant wants. Ask. The grid will do either. It will not know which truth you meant. You are still the clerk. Sort is a tool for the eyes. The rows must stay married to their facts. That marriage is the whole lesson.",
      ),
    ],
  },
  {
    slug: "printing-a-sheet-so-it-fits",
    title: "Printing a spreadsheet so it fits",
    excerpt:
      "A grid is wider than a letter. Preview, landscape, fit to one page wide. A shrunk ant-stack is not a register. Cut columns, or take two sheets on purpose.",
    series: SERIES,
    order: 80,
    author: AUTHOR,
    date: lessonDate(80),
    cover: "/images/blog/print-sheet.jpg",
    coverAlt: "A spreadsheet print preview fitted onto one page.",
    body: [
      p(
        "Excel will print what you asked, including twelve columns of ants across two centimetres, or one column alone on a lonely page. The printer is still a tap. Preview is still looking at the sink. A spreadsheet is just wider than a letter, so the same Print button needs extra manners: orientation, fit, and which rows you meant. This lesson is that preview, landscape, and refusing a page nobody can read.",
      ),
      p(
        "Ctrl+P. Look at the miniature. If columns vanish off the right, the paper is too narrow. Layout, Orientation, Landscape — the wide way. If it still spills, Page Setup, Fit to 1 page wide by 1 page tall — or “fit all columns on one page.” Then look again. If the type is too small to read a naira amount, Fit is a lie. Undo the fit. Hide or delete columns you do not need on paper. A register of Name and Amount may not need a phone, an email, and a remark on the same sheet.",
      ),
      fig(
        "/images/blog/print-sheet.jpg",
        "Print preview of a grid on one landscape page.",
        "The miniature is the truth. If you cannot read the numbers there, you will not read them on A4. Fewer columns, or two pages on purpose.",
      ),
      h2("Print area, titles, and the header row"),
      p(
        "If you only wanted the fees table, not the scratch numbers in column Z, select the table, Print area, Set print area. Preview should show only that. Repeat the header row on each page: Page Setup, Sheet, Rows to repeat at top. Then page 2 still says Name, Amount. Without that, page 2 is a pile of numbers with no names. People invent the names from memory. Memory is how books drift.",
      ),
      p(
        "Gridlines: tick print gridlines if the page looks like free-floating words. Black and white is enough. Colour in a sheet is extra ink and often a grey mess. Draft quality for a working copy; a clearer setting for something you will stamp. You know Economy from the printing lesson. It still spends paper if you print twenty copies. Copies: 1, then look.",
      ),
      fig(
        "/images/blog/fitted-print.jpg",
        "A printed spreadsheet on one A4 sheet beside a laptop.",
        "If the paper matches the preview, you are done. If the right edge is missing, the fit was ignored or the printer scaled again. Preview, then the machine.",
      ),
      ul([
        "Open a small table. Ctrl+P. Note whether it spills.",
        "Landscape. Preview. If needed, fit to one page wide. Preview again. Read a number in the miniature.",
        "If the number is a speck, cancel. Remove a column. Preview again.",
        "Print one copy if you can. Write the date on it. Paper is still a witness.",
      ]),
      h2("PDF of a sheet"),
      p(
        "Save as PDF from Print, or Export. The PDF is a picture of the grid, not a grid that adds. For an office that must add, send the Excel or Sheets file. For an office that must see, send the PDF. Do not send both “in case” unless they asked. One job, one attachment. The sheet on the screen can be as wide as you like. The sheet on the tray has to fit a hand. Preview until it does. Then the tap.",
      ),
    ],
  },
  {
    slug: "making-numbers-look-like-money",
    title: "Making numbers look like money",
    excerpt:
      "Type 1500. Then tell the grid it is naira. The sign is a costume. The number underneath still adds. Typing ₦ yourself is how totals become words.",
    series: SERIES,
    order: 81,
    author: AUTHOR,
    date: lessonDate(81),
    cover: "/images/blog/currency-format.jpg",
    coverAlt: "A spreadsheet amount column formatted as money.",
    body: [
      p(
        "You already know to type 450, not ₦450, if you want the grid to add. The page still looks naked. Offices like a sign and two decimals. Formatting is a costume on a number that is still a number. This lesson is selecting the amount column, choosing currency or a custom naira, and not painting the header as money so the word Amount becomes a joke in the total.",
      ),
      p(
        "Click the header of the amount column, or select the cells that hold amounts — not the word Amount, not the names. In Excel: Home, the Number box, Currency, or More number formats. If ₦ is in the list, pick it. If not, pick a symbol you can stand, or type NGN in the header and keep the cells as numbers with two decimals. Sheets: Format, Number, Custom currency. Two decimal places is ordinary. 1500 becomes 1,500.00. The comma is the costume. The 1500 is still 1500.",
      ),
      fig(
        "/images/blog/currency-format.jpg",
        "An amount column wearing a money format.",
        "The sign sits in the cell. The formula bar, at the top, still shows the plain number when you click. That is the truth the SUM uses.",
      ),
      h2("When the costume fights the sum"),
      p(
        "If you typed ₦1500 as text in some cells and formatted others, SUM will skip the text. The total looks too small. Delete the sign from the cell, type the digits, format the column. If a cell shows ###### after currency, the column is too thin for the extra characters — next lesson but one, widen it. That is not a lost amount. It is a curtain.",
      ),
      p(
        "Accounting format in Excel adds a dash for zero and hangs the sign on the left. It looks like a bank. It is optional. Do not mix Accounting, Currency, and plain in one column. Pick one costume. The total cell should wear the same clothes as the column, or it looks like a different kind of number. Click the total, format it the same way.",
      ),
      fig(
        "/images/blog/naira-column.jpg",
        "A learner with a spreadsheet of amounts, naira notes and a receipt on the desk.",
        "The paper is still the source. The costume on the grid is for reading. If they disagree, the receipt wins until you find the mistyped cell.",
      ),
      ul([
        "Type three amounts as plain digits. SUM them. Note the total.",
        "Select the amounts and the total. Apply currency or two decimals. Confirm the total did not change in meaning.",
        "Click a dressed cell. Look at the formula bar. You should see digits, not a picture.",
        "Do not format the Name column as money. If you did, Undo, or set it back to General or Text.",
      ]),
      h2("NGN, and what a form wants"),
      p(
        "A government form that wants 1500.00 in a box may reject ₦. Paste digits. A letter to a person may want ₦1,500 — that is Word, Insert symbol, not a spreadsheet cell. Two rooms, two costumes. In the grid, the number is the worker. The sign is a hat. Put the hat on after the worker is in place. Then the total still moves when Friday's figure changes, which was the whole point of the grid.",
      ),
    ],
  },
  {
    slug: "freeze-the-top-row",
    title: "Freeze the top row so the header stays",
    excerpt:
      "A long list swallows the words Name and Amount. Freeze panes pins the header. Scroll the people, keep the labels. You have not split the file. You have pinned a ruler.",
    series: SERIES,
    order: 82,
    author: AUTHOR,
    date: lessonDate(82),
    cover: "/images/blog/freeze-panes.jpg",
    coverAlt: "A spreadsheet scrolled down with the header row still visible.",
    body: [
      p(
        "Row 1 says Name, Item, Amount. Row 80 is a person you are checking. By the time you are at 80, row 1 has gone to heaven and you are guessing which column is the phone. Freeze is a pin through the header. The names still scroll. The labels do not. This lesson is View, Freeze top row, and unfreezing when the pin is in the wrong place.",
      ),
      p(
        "Click anywhere in the sheet. View, Freeze panes, Freeze top row. Scroll down. Row 1 should sit still. Freeze first column is the cousin, for a wide sheet where the name on the left should not vanish when you hunt amounts on the right. Freeze panes (the general one) pins above and left of the cell you selected — so click the cell just under the header and just right of the names, then Freeze panes, if you want both. If that sounds like a knot, freeze top row only. It solves most registers.",
      ),
      fig(
        "/images/blog/freeze-panes.jpg",
        "A long sheet with Name, Item, Amount still at the top.",
        "The pin is not a new row. It is a window. Print does not care about freeze. Headers to repeat at top, from the printing lesson, is the paper version of this pin.",
      ),
      h2("When the pin is wrong"),
      p(
        "If you froze with a random cell selected, a line may cut the sheet in half and half your data will not scroll. View, Unfreeze panes. Then freeze top row, which does not depend on which cell is active. A thick grey line under row 1 is normal. A thick line under row 20 usually means you froze too late. Unfreeze, try again.",
      ),
      p(
        "Sheets in the browser: View, Freeze, 1 row. Same idea. Split is a different tool — two scroll bars on one sheet — and you do not need it for a fee list. If you split by accident, View, Remove split, or drag the split bar to the edge until it dies.",
      ),
      fig(
        "/images/blog/header-stuck.jpg",
        "A learner scrolling a long list, a paper register beside the laptop.",
        "Paper already keeps the column titles in your head. The pin is for when the list is longer than the screen. You should still know which column is which if the pin fails.",
      ),
      ul([
        "Make or open a list longer than the screen. Freeze top row. Scroll. Confirm the headers stay.",
        "Unfreeze. Scroll. Confirm they leave. Freeze again if you like living with the pin.",
        "Do not freeze in the middle of a table as a way to “lock” amounts. That is not protection. That is a stuck window.",
        "Save. Freeze is part of the file's view on this machine. Another person may not see your pin. The data is still there.",
      ]),
      h2("What freeze is not"),
      p(
        "It is not protect sheet. It is not hide. It is not a backup. People still edit frozen headers if they click them. If you want the header safe, that is a different lock, and you do not need it yet. For today: a ruler that stays while the register walks. When you can name column C at row 90 without scrolling home, the pin has earned its keep.",
      ),
    ],
  },
  {
    slug: "filling-a-formula-down",
    title: "Filling a formula down a column",
    excerpt:
      "One SUM or one price times quantity is enough. The fill handle copies the idea down. Each row should keep its own cells. Watch the first three answers before you fill a hundred.",
    series: SERIES,
    order: 83,
    author: AUTHOR,
    date: lessonDate(83),
    cover: "/images/blog/fill-handle.jpg",
    coverAlt: "A spreadsheet formula being filled down a column.",
    body: [
      p(
        "A shop book may need quantity times price on every line. You can type =B2*C2, then =B3*C3, then weep. The small square at the corner of a selected cell is the fill handle. Drag it down, or double-click it, and the grid copies the pattern: next row, next cells. This lesson is that handle, the difference between a relative cell and a number you meant to freeze, and why you look at row 3 before you fill to row 200.",
      ),
      p(
        "Click the cell with the first formula. A tiny square at the bottom-right. Pointer becomes a thin cross. Drag down as far as the last row of facts. Release. Each new cell should show an answer, not the formula, unless you are in a view that shows formulas. Click row 4's answer. The formula bar should say =B4*C4, not still B2*C2. If it still says B2, you copied values, not the formula — Undo, copy the cell, paste formulas, or drag the handle again.",
      ),
      fig(
        "/images/blog/fill-handle.jpg",
        "The fill handle at the corner of a formula cell.",
        "A thin cross, not a thick arrow. The thick arrow is select. The cross is fill. If you drag with the wrong pointer you will move the cell instead of copying the idea.",
      ),
      h2("When one number should not walk"),
      p(
        "A tax rate in F1 should stay F1 on every row. If you fill =D2*F1 down, Excel may turn F1 into F2, F3, empty, empty. Put a dollar in: F$1 or $F$1 — the lock. Or type the rate 0.075 in the formula, which is ruder when the rate changes. For this course: keep the rate in a labelled cell, use $ to pin it, fill, check three rows. If that $ is a fog, do not fill a tax column yet. Fill quantity times price, which should walk.",
      ),
      p(
        "Double-click the handle fills down as far as the neighbouring column has facts. If column B stops at 20, the fill stops at 20. If column B has a hole, the fill may stop at the hole. Drag by hand when the list is short. A hundred empty formulas below the data are zeros that will sit in a SUM if you were sloppy with the range. Fill to the last fact, not to row 1000 “in case.”",
      ),
      fig(
        "/images/blog/formula-column.jpg",
        "A learner checking a column of formula results against a calculator.",
        "The calculator is the witness for three rows. If three match, the fill is probably honest. If row 1 matches and row 5 does not, look at the formula bar. Do not print yet.",
      ),
      ul([
        "In a practice sheet, quantity in B, price in C, =B2*C2 in D2.",
        "Fill down three more rows. Click each answer. Confirm the row numbers walked.",
        "Change one price. Confirm that row's answer moves and the neighbours do not.",
        "Save as fill-practice. Do not fill a live fees book until three rows have been true.",
      ]),
      h2("Paste, and the overfill"),
      p(
        "Ctrl+C on a formula, select a block, Ctrl+V, also fills. Same checks. If you overfill onto a total row, the total may become a product and the book will lie with confidence. Leave a blank row before the SUM, or look at the last formula. You already know Undo. Use it the second the column looks too clever. The handle is a servant. It will copy a mistake as cheerfully as a truth.",
      ),
    ],
  },
  {
    slug: "a-simple-weekly-money-list",
    title: "A simple weekly money list",
    excerpt:
      "Four columns, seven days, one total. The grid is a shop book for a life. If you will not open it on Sunday, a paper envelope is still allowed.",
    series: SERIES,
    order: 84,
    author: AUTHOR,
    date: lessonDate(84),
    cover: "/images/blog/weekly-budget.jpg",
    coverAlt: "A simple weekly spending list on a spreadsheet.",
    body: [
      p(
        "People buy a budget app, then ignore it. A sheet with four columns will do: Date, Item, Amount, maybe In or Out. One week, not a five-year plan. This lesson is that small book, a total, and the honesty of typing the recharge you would rather forget. The grid does not judge. It only adds what you admitted.",
      ),
      p(
        "New sheet. Row 1: Date, Item, Amount. Freeze the top row if you like. Type this week's real lines — transport, photocopy, rice, data. Amounts as digits. SUM at the bottom of Amount. Currency costume if you want. Name the file week-2026-09-22 in whatever room you keep money papers — Work, or a folder called Money inside Documents. Next week, Save As, new date, or a new tab at the bottom named 22-Sep, 29-Sep. One job per tab, as you were told.",
      ),
      fig(
        "/images/blog/weekly-budget.jpg",
        "A weekly list with a total at the bottom.",
        "Seven to twenty lines is a week. A hundred categories is a second job. Food, transport, data, other — enough buckets if you even need buckets.",
      ),
      h2("In and out, if you must"),
      p(
        "If money comes in as well as out, a fourth column, Type, with the word in or out. Then two SUMs, or a column In and a column Out. Keep it ugly and true. A “balance” cell that subtracts is =in_total-out_total. If that formula scares you, two totals at the bottom are enough for a human to subtract. Do not build a dashboard. Do not download a template with 40 coloured tabs. You will not fill it.",
      ),
      p(
        "The sheet is not the money. The envelope or the account is the money. If they disagree, the envelope wins until you find the missing line. A week you did not record is gone; start today, do not invent last month from memory and call it a book.",
      ),
      fig(
        "/images/blog/money-list.jpg",
        "A paper spending list beside the same list on a laptop.",
        "Paper in the market, grid on Sunday. Photograph the paper if you must, then type. A blurry stall receipt still wants a line with a date and a number.",
      ),
      ul([
        "Make this week's sheet. Three real lines. A SUM.",
        "Save it in a named folder. Put the week in the file name.",
        "Tomorrow, add one line. Confirm the total moves.",
        "If you will not open it, stop. A notebook in the drawer is a better book than a dead file.",
      ]),
      h2("What not to put here"),
      p(
        "Card PINs, BVN, the password to the bank. Those are keys. This is a register. Do not share the sheet as Anyone with the link. A PDF of a week, if someone must see, is enough. And do not let a colourful “finance guru” sheet shame you into twenty categories. The skill is the habit of one true line. The grid is only the clerk. You are still the one who spent the naira.",
      ),
    ],
  },
  {
    slug: "when-the-cell-looks-broken",
    title: "When the cell says ##### or #DIV/0!",
    excerpt:
      "Hashes are a curtain: the column is too thin. #DIV/0! is divide by empty. #VALUE! is a word where a number should be. The amount is often still there. Widen, or fix the formula, before you panic.",
    series: SERIES,
    order: 85,
    author: AUTHOR,
    date: lessonDate(85),
    cover: "/images/blog/cell-error.jpg",
    coverAlt: "A spreadsheet cell filled with hash marks because the column is narrow.",
    body: [
      p(
        "The grid has a few shouts that look like a crash. ##### is the most common: the column is too narrow for the number, especially after you dressed it as money. The amount is still in the cell. Drag the line between C and D at the top until the number appears. Double-click that line and the column fits the widest fact. This lesson is that curtain, the formula errors, and what is not a broken file.",
      ),
      p(
        "#DIV/0! means you divided by zero or by an empty cell — a rate with no quantity, a per-person split with no people. Point the formula at a real number, or leave the cell blank until the quantity exists. #VALUE! means you asked maths to eat a word: =B2*C2 when C2 says “see receipt.” Put the number in C2, the story in Item. #REF! means a cell the formula loved was deleted. Undo if you just deleted a column. #NAME? means a typo in SUM — =SUME or a missing bracket. Look at the formula bar. The grid is literal.",
      ),
      fig(
        "/images/blog/cell-error.jpg",
        "A cell showing ##### beside ordinary numbers.",
        "Hashes are not a lost fortune. They are a curtain. Widen before you retype. Retyping is how 1500 becomes 150.",
      ),
      h2("Green corners, and the warning triangle"),
      p(
        "Excel may put a green mark in a cell it finds odd — a number stored as text, a formula that skips a neighbour. Click, the yellow diamond, read the sentence. Convert to number if that is the truth. Ignore if you meant the skip. Sheets is quieter. Do not Accept every offer. The cousin is still a cousin, like spell check.",
      ),
      p(
        "A cell that shows the formula you typed, =SUM(C2:C6) in plain sight, is often formatted as text, or you missed the equals, or there is a space before =. Delete, type again starting with =. A cell that shows 1/2/2026 when you meant 0.5 is a date costume on a fraction. Format as number. The grid guessed. You can unguess.",
      ),
      fig(
        "/images/blog/wide-column.jpg",
        "A learner widening a spreadsheet column.",
        "The line between letters at the top is a handle. Drag. The hashes should become amounts. If they become dates, that is a format, not a width.",
      ),
      ul([
        "Make a number, narrow the column until ##### appears. Widen it. The number should return unchanged.",
        "In an empty cell, type =1/0 and Enter. See #DIV/0!. Delete it. You do not need it in a real book.",
        "Type =A1*B1 where A1 is a word. See #VALUE!. Put a number in A1. The error should leave.",
        "Do not download an “error fixer” for Excel from a banner. The fixer is your eyes and Undo.",
      ]),
      h2("When it is actually broken"),
      p(
        "A file that will not open, or opens with “repaired” and missing sheets, is the backup lesson. Close, copy the file, try again. Do not keep saving over the only copy while it limps. Circular reference — a SUM that includes itself — makes a warning and a restless total. Look at the range. If C7 is =SUM(C2:C7), the snake is eating its tail. SUM to C6, put the total in C7.",
      ),
      p(
        "Name the shout before you call a shop. Hashes: width. #DIV/0!: empty bottom. #VALUE!: a word in the maths. ##### is the one you will see every week once money wears a costume. Widen, smile, continue. The grid is still a clerk. Clerks sometimes write too large for the column. They rarely burn the book.",
      ),
    ],
  },
  {
    slug: "watching-a-video-without-getting-lost",
    title: "Watching a video without getting lost",
    excerpt:
      "A video site is a market with a search box. Type the thing you came for. Full screen is not a new street. The sidebar is a stall shouting. You may leave.",
    series: SERIES,
    order: 86,
    author: AUTHOR,
    date: lessonDate(86),
    cover: "/images/blog/video-search.jpg",
    coverAlt: "A video site with a search box on a laptop screen.",
    body: [
      p(
        "YouTube, and the other places that play film, are useful and noisy. You came to see how to print a page. An hour later you have watched a lottery and a quarrel. The machine did not kidnap you. The sidebar did what a market does: shout. This lesson is search, the address, full screen, and leaving when the job is done. The internet lesson still applies. A video is a page that moves.",
      ),
      p(
        "Walk to youtube.com yourself, or open the app you installed on purpose. The box at the top is search. Type a full thought: how to save a Word document as PDF, not “computer.” Add Nigeria when the answer depends on here. Read the channel name under the result the way you read the grey address under a Google result. A ten-year-old upload from a school can be better than a loud new one that wants you to download a fixer.",
      ),
      fig(
        "/images/blog/video-search.jpg",
        "A video search page on a laptop.",
        "The box at the top is the job. The row of suggestions after you finish is a stall. You do not owe it a click.",
      ),
      h2("Play, full screen, and the wrong door"),
      p(
        "Click the video you meant. Space bar pauses. The square in the corner is full screen — the picture uses the whole monitor. Esc leaves full screen. Full screen is not a new website. The address bar may hide; move the pointer to the top if you need it. If a video asks you to install a player, or a codec, or to “enable flash,” you are not on the real street. Back. Search again. You already play video in the browser.",
      ),
      p(
        "Autoplay will start the next film. Turn it off if you can see a toggle. The queue is a list the site wants. Your list is the search you typed. On a phone, Wi‑Fi is kinder than a bundle for a long lesson. Download in the app, if you pay for that, is a parcel; a random “download MP4” button under the video is a cousin of the fake update. Do not.",
      ),
      fig(
        "/images/blog/video-learner.jpg",
        "A learner watching a tutorial on a laptop, earphones beside her.",
        "Earphones keep the house quiet. The notebook is for one step you will try. Watching ten videos without touching the keyboard is not a class. It is a stall.",
      ),
      ul([
        "Search a thing you already know — how to copy and paste — so you can judge the result.",
        "Open one video. Pause. Full screen. Esc. Confirm you are still on the same page.",
        "Do not click a download button under the video. You did not come for a file.",
        "When the step is clear, pause, try it on your own document. Then come back if you must.",
      ]),
      h2("Comments, and what a video cannot do"),
      p(
        "Comments are a crowd. A PIN, a “WhatsApp me for the file,” a link in a comment, are the phishing lesson wearing a film. The description can hold a real link to a school; it can also hold a trap. Prefer the site you already trust. A video will not see your computer. A file you download because the video shouted will.",
      ),
      p(
        "You now have a way to learn a button you forgot, at 10 p.m., without a shop. Search, one film, pause, try, leave. The sidebar will still shout. You do not have to answer. The search box is the map. Everything else is a stall on the way to the door.",
      ),
    ],
  },
  {
    slug: "captions-pause-and-speed",
    title: "Captions, pause, and speed",
    excerpt:
      "CC is words on the picture. Pause is thinking time. Speed is not a virtue. 0.75 is allowed. A notebook is still faster than rewinding ten times without writing.",
    series: SERIES,
    order: 87,
    author: AUTHOR,
    date: lessonDate(87),
    cover: "/images/blog/captions-on.jpg",
    coverAlt: "A paused video with captions at the bottom of the picture.",
    body: [
      p(
        "A video is speech. Speech is easy to miss when the accent is new, the fan is loud, or the teacher talks like a train. Captions — CC, subtitles — write the words on the picture. Pause stops the train. Speed, a gear like 0.75 or 1.25, is a courtesy, not a race. This lesson is those three taps, so a tutorial is a class and not a blur.",
      ),
      p(
        "Look along the bottom of the video for CC, or a wheel, Settings, Subtitles. Turn captions on. English is fine when the speaker is English. Auto-generated captions will miss naira, Okoro, Rumuola — they are a cousin of spell check. If the line is nonsense, use your ears for that word. If the line helps you catch “Save As,” keep them on. Size and colour live in the same settings if the type is small. You may zoom the page, as you learned, without changing the film.",
      ),
      fig(
        "/images/blog/captions-on.jpg",
        "A video with a caption line at the bottom.",
        "The words are a lamp, not a second film. If they cover a button the teacher is pointing at, pause, read, play. You are allowed to be slow.",
      ),
      h2("Pause, rewind, a notebook"),
      p(
        "Space bar, or the tap on the picture, pauses. Left arrow often jumps back a few seconds. That is enough to catch a sentence. If you rewind the same ten seconds five times, pause and write the step. The notebook is cheaper than another pass. Full screen plus captions plus a notebook is a desk. Autoplay plus no notes is a bus window.",
      ),
      p(
        "Speed: the gear, Playback speed. 0.75 when the mouth is fast. 1.25 when they repeat themselves and you only need the shape. 2× is how people “finish” a course and remember nothing. You are not late. The video will wait. On a phone the same gear lives in the three dots. Earphones help captions and speech sit together without the street.",
      ),
      fig(
        "/images/blog/pause-video.jpg",
        "A learner paused on a tutorial, writing in a notebook.",
        "The film is still. The hand is working. That is the lesson landing. A finished video with an empty page is a stall you walked through.",
      ),
      ul([
        "Open a short tutorial. Turn captions on. Read one line. Confirm it matches the mouth, more or less.",
        "Pause. Write one step. Play. Pause again.",
        "Try 0.75 for a sentence, then 1. You are allowed to return to 1.",
        "Do not download a “subtitle plugin” from a banner under the video.",
      ]),
      h2("When there are no captions"),
      p(
        "Some films have none. Lower the speed, use earphones, write. A live class on Meet may have captions if the host switched them on — a different tap, still CC. Do not trust live captions with a fee amount. Ask in the chat. And if a video is only music with no speech, captions will be empty or wild. You did not break them.",
      ),
      p(
        "The point of a tutorial is one thing you can do after. Captions, pause, speed, paper. Then close the tab. The next video will offer itself. You already know how to leave a market. Leave.",
      ),
    ],
  },
  {
    slug: "airplane-mode",
    title: "Airplane mode",
    excerpt:
      "The plane icon mutes the radios: calls, data, Wi‑Fi, Bluetooth. The phone is still a clock, a camera, a torch. Use it in a hall, in a queue, and when the bundle must sleep.",
    series: SERIES,
    order: 88,
    author: AUTHOR,
    date: lessonDate(88),
    cover: "/images/blog/airplane-mode.jpg",
    coverAlt: "A phone settings screen with Airplane mode switched on.",
    body: [
      p(
        "Airplane mode is a master mute for the phone's radios. It was built so a plane's instruments would not argue with a pocket. On the ground it is still useful: a class, a church, a meeting, a bundle you refuse to feed overnight, a child watching a downloaded film. The phone does not die. It stops talking to masts and to Wi‑Fi until you say so. This lesson is the tap, what still works, and turning Wi‑Fi back on without opening the whole house.",
      ),
      p(
        "Swipe down from the top of an Android, or down from the right on many iPhones. A plane icon. Tap it. The icon lights. The signal bars go. You will not receive WhatsApp until you switch it off. Calls will fail. That is the point. To undo, tap the plane again. If you cannot find the shade, Settings, Network, Airplane mode — the same lamp, a longer walk.",
      ),
      fig(
        "/images/blog/airplane-mode.jpg",
        "Airplane mode on in phone settings.",
        "One tap, many radios. If you only meant to silence a ringer, use mute or Do not disturb. The plane is ruder. It hangs up on the network.",
      ),
      h2("What still works, and a hole you can open"),
      p(
        "Camera, torch, clock, photos already on the phone, a downloaded video, a PDF in Files, the calculator. GPS may sulk. Bluetooth often goes off with the plane; some phones let you switch Bluetooth back on after, for earphones, while the mast stays muted. Wi‑Fi can sometimes be turned on on top of airplane mode — a plane with a café network, no SIM data. That is a useful knot in a hall with Wi‑Fi and a greedy bundle. Look: plane on, then Wi‑Fi on. Data should stay dead.",
      ),
      p(
        "Alarms still ring on most phones. Do not trust that with your life until you have tested it once the night before. A power-off is ruder than the plane: nothing rings. The plane is a sleep for the radios, not a shutdown. Battery lasts longer because the phone stops hunting a mast in a weak area. That hunt is why a phone dies in a bus between towns. Plane, then you arrive, then off.",
      ),
      fig(
        "/images/blog/plane-icon.jpg",
        "A phone face-down on a desk beside a laptop.",
        "The desk is working. The pocket is quiet. If you need the laptop's internet, that is a different radio. The phone can rest.",
      ),
      ul([
        "Swipe to the plane. Switch it on. Try to open WhatsApp. It should fail or stall.",
        "Open the camera. Take a picture. That should work.",
        "Switch the plane off. Wait a few seconds. Signal should return.",
        "If you only wanted silence, practise Do not disturb once, so you do not use a sledgehammer for a fly.",
      ]),
      h2("When it is the wrong tool"),
      p(
        "A bank OTP will not arrive on the plane. Switch off before you pay. Maps that need live data will freeze; an offline map, from the maps lesson, still shows streets. WhatsApp Web on the laptop dies if the phone is on the plane, because the phone is the key. You know that handshake.",
      ),
      p(
        "The plane is a door you close on purpose. It is not broken signal. It is not a virus. If a relative says the phone “has no network,” look for the plane before you buy data. The icon is small. The effect is large. Look, then tap.",
      ),
    ],
  },
  {
    slug: "storage-on-the-phone",
    title: "When the phone says storage is full",
    excerpt:
      "Photos, WhatsApp, and video fill a pocket. The computer is a drawer. Delete the soup, keep the originals you already copied. A “cleaner” app is usually a stall.",
    series: SERIES,
    order: 89,
    author: AUTHOR,
    date: lessonDate(89),
    cover: "/images/blog/phone-storage.jpg",
    coverAlt: "Phone storage settings showing what is using space.",
    body: [
      p(
        "A phone fills the way Downloads fills: quietly, then all at once. You cannot install an update, cannot receive a photo, the camera refuses. Storage full. The usual fat is the gallery, WhatsApp's own folder of pictures, downloaded films, and apps you have not opened this year. This lesson is looking at the bar, walking copies to the computer first, then deleting with a name, not with a shouting cleaner.",
      ),
      p(
        "Settings, Storage — a bar, then a list: Photos, Apps, Other. Other is often WhatsApp and caches. You already know how to copy photographs off the phone with a cable. Do that before you delete. Open a few on the computer. Then, on the phone, delete the ones you have seen on the larger screen. WhatsApp: Settings, Storage and data, Manage storage. It will offer large files and old videos. Those are often soup. The originals, if they were yours, should already be in Pictures on the computer.",
      ),
      fig(
        "/images/blog/phone-storage.jpg",
        "A storage bar on a phone: photos, apps, free space.",
        "The bar is the tank, like C: on the laptop. Photos and video fill it. Letters do not. A 4 GB phone fills faster than a 128 GB one. The habit is the same.",
      ),
      h2("What to delete, what to leave"),
      p(
        "Safe to consider: downloaded films you have watched, installers, screenshots of OTPs, WhatsApp statuses that landed in the gallery, duplicate burst shots of the same plate of rice. Not safe to guess: the WhatsApp Databases folder if you do not know it, system apps, Downloads you have not opened. Uninstall apps from Settings, Apps — the guest list — not by dragging an icon to a bin that only removes the sign, on some phones. You have met that lie on the desktop.",
      ),
      p(
        "Cache is leftover packing. Clearing cache in Storage, or inside an app's info, can free space without deleting your photos. Clearing data is ruder: it signs you out of that app. Read the word. Cache, not data, unless you mean to start the app from zero.",
      ),
      fig(
        "/images/blog/storage-settings.jpg",
        "A learner comparing phone storage with files on a laptop.",
        "The laptop is the drawer. The phone is the pocket. Fill the drawer first. Empty the pocket second. A cleaner that never copied is a hole.",
      ),
      ul([
        "Open Settings, Storage. Note the largest item.",
        "If it is photos, copy a year to the computer. Open three. Then delete from the phone only those you have confirmed.",
        "In WhatsApp, Manage storage. Delete a large video you do not need. Do not delete the whole chat until you mean it.",
        "Do not install a “phone booster” from an advert. Settings is the cleaner.",
      ]),
      h2("Cloud, SD cards, and the shop"),
      p(
        "Google Photos can offload pictures if you chose that on purpose and the bundle can stand it. An SD card is a second pocket; some phones still have the slot. Apps on the card are fussy. Photos on the card vanish if the card dies. Copy to the computer is still the backup. A shop that “cleans storage” in five minutes without your cable has deleted first. Ask them to copy. Stand there.",
      ),
      p(
        "When the bar has room again, the camera will open. That is the whole practical aim. A full phone is not a virus. It is a pocket with too many bricks. You know bricks from kilobytes. Walk them to the drawer. Then the pocket works.",
      ),
    ],
  },
  {
    slug: "app-permissions",
    title: "When an app asks for the camera or your location",
    excerpt:
      "A permission is a door. Camera, microphone, location, contacts. Allow only if the app needs that door for the job you asked. Deny is a full sentence.",
    series: SERIES,
    order: 90,
    author: AUTHOR,
    date: lessonDate(90),
    cover: "/images/blog/app-permission.jpg",
    coverAlt: "A phone permission dialog asking for the camera, with Allow and Deny.",
    body: [
      p(
        "You install a torch app. It asks for contacts, location, and the microphone. That is not a torch. That is a guest requesting the house. A permission is a door in the phone: camera, microphone, location, contacts, files, notifications. The app cannot walk through until you say Allow. This lesson is reading the door, saying Deny without shame, and changing your mind later in Settings.",
      ),
      p(
        "When the box appears, name the job. WhatsApp needs the camera for a photo in a chat, the microphone for a voice note, contacts if you want to find who else has the app. A game does not need your contacts. A PDF reader does not need the microphone. Maps needs location while you use it — “only while using the app” is the kind option on modern phones, not “all the time.” Deny, or Don’t allow, is allowed. The app should still do the rest of its job. If it refuses to open until you Allow everything, that app is a stall. Uninstall.",
      ),
      fig(
        "/images/blog/app-permission.jpg",
        "Allow and Deny on a camera permission.",
        "Two buttons. The large one is not always the kind one. Deny, then try the job. If the job truly needs the door, you can Allow next time.",
      ),
      h2("The list after the fact"),
      p(
        "Settings, Apps, the app's name, Permissions. A list of doors and whether they are on. Turn off the ones that surprise you. Photos versus All files: a school app that must upload one PDF needs access to that file, not to the whole gallery forever. On newer Androids you can pick a file at the moment of upload. Prefer that. Notifications are a permission too. A shop app that pings ten times a day can be muted here without uninstalling, if you still need it.",
      ),
      p(
        "The browser asks as well: this site wants to know your location, use the camera, send notifications. A maps site may need location. A news site that wants notifications is a tap on the shoulder you can refuse. You met this in the webcam lesson on the computer. The phone is the same doors, in a pocket.",
      ),
      fig(
        "/images/blog/permission-dialog.jpg",
        "A learner pausing at a permission prompt on a phone.",
        "The pause is the skill. If you cannot say why this app needs this door, Deny. You can open the door later. You cannot un-send contacts you already gave.",
      ),
      ul([
        "Open Settings, Apps. Pick one app you use. Read its permissions.",
        "Switch off one door that does not match the job — a game with contacts, a torch with location.",
        "Use the app. If it still works, you were right.",
        "Do not Allow a new app all doors on the first sitting because the screen is in a hurry.",
      ]),
      h2("Once you have said yes"),
      p(
        "A permission given is not a marriage forever. You can close the door. If you already allowed a random app, turn the doors off, then uninstall. Changing a password is for accounts; permissions are for this device. A cousin who borrowed the phone may have said Allow for you. Look at the list after they leave, the way you look at Linked devices after a café.",
      ),
      p(
        "You are not being asked to fear every app. You are being asked to match the door to the job. Camera for a camera. Location for a map. Microphone for a call. Contacts for a phone book. Everything else can wait. Deny is a full sentence. The app will not take offence. It does not have feelings. It has a list. Keep the list short.",
      ),
    ],
  },
  {
    slug: "locking-the-phone-and-the-laptop",
    title: "Locking the phone and the laptop",
    excerpt:
      "A lock is a gate, not a decoration. PIN, pattern, fingerprint, Windows+L. The screen going dark is not a lock. A cousin should meet a gate, not your mail.",
    series: SERIES,
    order: 91,
    author: AUTHOR,
    date: lessonDate(91),
    cover: "/images/blog/screen-lock.jpg",
    coverAlt: "A phone lock screen with a PIN pad on a wooden desk.",
    body: [
      p(
        "A phone without a lock is a house with the gate open. Anyone who picks it up is you: WhatsApp, mail, the bank app if it does not ask again. A laptop the same. The screen going dark is only a lamp. The lock is a gate that asks for a key when the lamp comes back. This lesson is a PIN you can remember, a pattern that is not a letter Z, Windows+L when you stand up, and why “none” is not a time-saver.",
      ),
      p(
        "On the phone: Settings, Security, Screen lock — PIN, password, pattern, or fingerprint if the machine has a pad. A PIN of six digits you do not use for the ATM is enough for most people. Four is weak and still better than none. A pattern that is a straight line or your initial is a pattern a shoulder can steal. Fingerprint is convenient; it still needs a PIN as backup when a wet hand fails. Face unlock is a cousin: fine at a desk, weaker in a crowd with a photograph. You choose. You write the PIN hint in the notebook in the drawer, not on a sticky on the phone.",
      ),
      fig(
        "/images/blog/screen-lock.jpg",
        "A phone lock screen waiting for a PIN.",
        "The gate. If you can swipe into the home screen with no question, there is no gate. Settings, Screen lock, until a question appears.",
      ),
      h2("The laptop, and standing up"),
      p(
        "Windows: Settings, Accounts, Sign-in options. A PIN for this machine is not your Microsoft password; it is a local gate. Use a different number from the phone if you can bear it. Windows+L locks at once — lamp off, gate on — without shutting down. Practise it every time you leave the chair, even to the kettle, on a shared desk. A Mac: Control+Command+Q, or close the lid if the lid is set to lock. The lid is not a lock until you have checked that it asks for a password on wake.",
      ),
      p(
        "Require a sign-in when the PC wakes from sleep. A screen saver that does not lock is a curtain. Auto-lock after a few minutes is kindness when you forget Windows+L. On a business-centre machine, do not set your PIN. Guest, then the five-minute walk. Their gate is not yours to change.",
      ),
      fig(
        "/images/blog/lock-screen.jpg",
        "A learner locking a laptop, phone face-down beside it.",
        "Two gates. The pocket and the desk. If a child can open the mail, the gate is theatre. Shorten the time to lock. Practise the key until it is a habit, not a performance.",
      ),
      ul([
        "Put a PIN or password on the phone if it has none. Unlock it twice to prove you remember.",
        "On the laptop, Windows+L. Unlock. Do it again.",
        "Set a short lock time — one or two minutes on a phone in a compound.",
        "Do not use 1234, your birthday, or the phone number. You know why.",
      ]),
      h2("When the key is forgotten"),
      p(
        "Phone: the Google or Apple account you made on purpose is the rope, plus a wait. A shop that “opens it” without that account is often formatting. Backup first, always, if you still can. Windows: the PIN can be reset from the account if you set one; a local account with a forgotten password is a harder day. The notebook in the drawer is cheaper than that day.",
      ),
      p(
        "A lock is not encryption of the whole disk. It is still the difference between a stranger reading your mail and a stranger holding a brick. Use it. The extra three seconds when you sit down are the whole rent. Pay them.",
      ),
    ],
  },
  {
    slug: "if-the-phone-is-stolen",
    title: "If the phone is stolen",
    excerpt:
      "Call the network. Change mail and bank from another machine. Find My Device is a map, not a miracle. The lock you set yesterday is today’s whole defence.",
    series: SERIES,
    order: 92,
    author: AUTHOR,
    date: lessonDate(92),
    cover: "/images/blog/lost-phone.jpg",
    coverAlt: "A learner at a desk looking at the empty place where a phone was.",
    body: [
      p(
        "A stolen phone is a stolen gate to WhatsApp, mail, and sometimes the bank. Panic wants you to chase the street. The useful hour is elsewhere: the network, the accounts, a second machine. This lesson is that hour, what Find My Device can and cannot do, and why yesterday’s lock and yesterday’s copies matter more than a shop’s “tracker app” from a banner.",
      ),
      p(
        "From another phone or a laptop: call your network — MTN, Glo, Airtel, 9mobile — and block the SIM. The number stops. OTPs stop arriving on the thief’s table. Then mail: from a computer you trust, change the password, sign out other sessions, as in the café lesson. Then the bank, from the real app or the real street, not from a link in a “we saw your phone” SMS. Then WhatsApp: if you still have another phone and the same SIM later, verify; there is also a way to log out other devices from the phone you no longer hold, if you set it up before. Linked devices you already know. Remove what you can from a remaining phone or from Web if a session is open.",
      ),
      fig(
        "/images/blog/lost-phone.jpg",
        "An empty place on a desk where a phone should be.",
        "The pocket is gone. The accounts are not gone until someone opens them. Speed belongs to passwords and the SIM, not to a chase.",
      ),
      h2("Find, ring, erase"),
      p(
        "Google: android.com/find, or Find My Device, signed into the same account the phone used. Apple: iCloud, Find. If the phone is on and on a network, a map may show a neighbourhood, not a house number. You may ring it. You may lock it with a message. You may erase it — a last tap that wipes the pocket if the machine still hears the cloud. Erase after you have copied what you could, which, if the phone is gone, means yesterday’s copies. Do not erase before the SIM is blocked if you still hope to call it; in practice, block first, then find, then lock or erase.",
      ),
      p(
        "If the map is empty, the phone is off, on a plane, or already wiped. The account steps still matter. A police report may be needed for a new SIM with the same number. A tracker app you never heard of until a Facebook post is the virus costume. You do not install new guests on a remaining laptop in this hour.",
      ),
      fig(
        "/images/blog/find-device.jpg",
        "A find-device map on a laptop, a generic pin.",
        "A neighbourhood is not a street address. Do not walk into a compound because a pin said so. Use the map to decide lock or erase. Leave the chase to people who do that work.",
      ),
      ul([
        "Today, while the phone is in your hand: confirm you can sign into Find My Device or iCloud from a laptop.",
        "Confirm the phone has a lock. Confirm photos you care about are on the computer.",
        "Write the network’s official number in the notebook, not a number from a search advert.",
        "If it happens: SIM, mail, bank, find, lock or erase. In that spirit. Shame later. Speed now.",
      ]),
      h2("After"),
      p(
        "A new handset, same Google account, contacts and some apps come back if they lived in the account. WhatsApp backups, if you had Drive or iCloud on, may restore chats. If you had none, the chats are the price. The money in the bank is not, if you were fast. Tell family the old number may be in a thief’s hand until the SIM dies; they should not send OTPs or “urgent” airtime to a message that sounds like you.",
      ),
      p(
        "The lock from the last lesson is the whole difference between a brick and an open mail. The copies are the whole difference between a lost pocket and a lost life. You cannot do those after. You can do them this evening. Then the hour, if it comes, is a list, not a freeze.",
      ),
    ],
  },
  {
    slug: "do-not-disturb",
    title: "Do not disturb",
    excerpt:
      "The moon icon silences rings and banners and leaves the radios on. Alarms still speak if you allow them. A class, a night, a driving seat. Not airplane mode.",
    series: SERIES,
    order: 93,
    author: AUTHOR,
    date: lessonDate(93),
    cover: "/images/blog/do-not-disturb.jpg",
    coverAlt: "A phone with Do not disturb or a moon icon switched on.",
    body: [
      p(
        "Airplane mode hangs up on the network. Do not disturb — the moon — hangs up on noise. Calls may still arrive in silence. WhatsApp still lands, unseen until you look. The radio is on. The ringer is off. This lesson is that moon, exceptions for a mother or an alarm, and not using the plane when you only meant a quiet hour.",
      ),
      p(
        "Swipe the shade, tap the moon, or Settings, Sound, Do not disturb. On many phones you can schedule it: 11 p.m. to 6 a.m. Alarms from the Clock app still ring on most machines; test once. Favourite contacts can break through if you tick that — so a family call at night still shakes the table, and a group chat does not. People you do not list wait until morning. That is allowed.",
      ),
      fig(
        "/images/blog/do-not-disturb.jpg",
        "Do not disturb switched on in phone settings.",
        "The moon is a curtain on sound, not on the network. OTPs still arrive. You will see them when you lift the phone. The bank is not on the plane.",
      ),
      h2("A class, a meeting, a laptop"),
      p(
        "In a lesson, the moon is kinder than switching off. You still have the clock. You still have the camera for a board if you must. Windows has Focus assist or Do not disturb too — Settings, System — so a mail toast does not ride over a form you are filling. The machine can be quiet without being offline. Use that in a CBT hall if phones are allowed at all; if they are not, the plane or the bag is the rule in the room, not this lesson.",
      ),
      p(
        "Driving: some phones offer a driving mode that is the moon plus maps. Do not polish it while the car is moving. Set it before you start. A voice reading WhatsApp aloud in a danfo is a choice you can refuse.",
      ),
      fig(
        "/images/blog/quiet-desk.jpg",
        "A quiet desk: dark phone, laptop, closed notebook.",
        "Silence is a tool. The work is on the laptop. The pocket is not dead. It is waiting. That is enough for an hour.",
      ),
      ul([
        "Turn the moon on. Ask someone to call. Confirm you see a missed call and heard nothing — or heard only a favourite, if you set that.",
        "Set an alarm five minutes from now. Confirm it still rings.",
        "Turn the moon off. The banners you missed should be waiting.",
        "If you needed the network off, that is the plane. Do not confuse the two icons.",
      ]),
      h2("What still gets through"),
      p(
        "Alarms, timers, and any app you allowed to override. A bank app may still flash. Repeat callers can break through on some Androids — a person who calls twice. That is a kindness for emergencies and a hole for a nuisance. You can switch that off. Read the exceptions list once. Shorten it.",
      ),
      p(
        "The moon is manners for a pocket that never learned to whisper. You do not owe every banner your eyes. Schedule a night. Use a sitting. Then look, on purpose, the way you check mail and not WhatsApp every ten seconds. The messages will wait. They are not more important because they shook.",
      ),
    ],
  },
  {
    slug: "the-phone-as-a-hotspot",
    title: "The phone as a hotspot",
    excerpt:
      "The pocket can be a router. A name, a key, the laptop joins. The bundle pays. Heat and battery follow. Switch it off when the sitting ends.",
    series: SERIES,
    order: 94,
    author: AUTHOR,
    date: lessonDate(94),
    cover: "/images/blog/phone-hotspot.jpg",
    coverAlt: "Phone hotspot settings on a wooden desk.",
    body: [
      p(
        "You met this as a sentence in the Wi‑Fi lesson: the phone can share its data with a laptop. The name is hotspot, or tethering. The phone becomes a small router. The laptop joins it like a house network. The bundle is the pipe. This lesson is switching it on, a password that is not 12345678, one laptop not a compound, and switching it off so the battery and the naira do not leak overnight.",
      ),
      p(
        "Settings, Network, Hotspot and tethering, Wi‑Fi hotspot. Set a name you will recognise — not “Android” in a hall of Androids. Set a password, eight characters at least, a sentence fragment, not the phone’s unlock PIN. Turn the hotspot on. On the laptop, open the fan list, join that name, type the key. Private network if Windows asks; it is your pocket, not a café. When the page loads, the pipe is the SIM.",
      ),
      fig(
        "/images/blog/phone-hotspot.jpg",
        "Hotspot settings on a phone.",
        "The name and the key are the sticker on this tiny router. Write the key in the notebook if you must. Do not shout it in a bus.",
      ),
      h2("Who joins, and what it costs"),
      p(
        "One laptop is the point. If the list of connected devices shows names you do not know, change the password, switch off, on again. A neighbour can join an open hotspot the way they join an open house Wi‑Fi. Do not leave it without a key. USB tethering — a cable from phone to laptop — is a quieter cousin: no radio for the neighbours, uses the cable you already own. Turn USB tethering on after you plug in. It still spends the bundle.",
      ),
      p(
        "Video will eat a week’s data in an evening. Updates on the laptop will try to drink. Pause Windows Update if you are on a thin bundle, or let it wait for house Wi‑Fi. The phone will get hot. That is the radio working. Take it off the bed, as with a laptop. Charge while you share if you can. A dead phone is a dead pipe, and WhatsApp Web will die with it.",
      ),
      fig(
        "/images/blog/hotspot-laptop.jpg",
        "A laptop using a phone hotspot on a wooden desk.",
        "The pocket is the router. When the sitting ends, the hotspot ends. The fan list on the laptop should not still show a phone in another room at midnight.",
      ),
      ul([
        "Set a hotspot name and password. Switch on. Join from the laptop. Load cea.ng.",
        "Look at the phone’s connected-devices list. You should see one machine.",
        "Switch the hotspot off. Confirm the laptop has no internet, or has returned to house Wi‑Fi.",
        "Do not lend an open hotspot to a shop “for a minute.” Give a key, or use USB, or refuse.",
      ]),
      h2("When the house Wi‑Fi exists"),
      p(
        "Prefer the house pipe. It is cheaper by the gigabyte, cooler, and does not kill the phone. Hotspot is a spare tyre: a form that must go in tonight, a café with a password you do not trust for a bank, a generator night when the router is off. Spare tyres are not daily drivers. If you live on hotspot, you are paying phone prices for a home. Ask the house about data on the router. That is another bill, not this lesson.",
      ),
      p(
        "Off when you stand up. The plane is another off. The hotspot is a tap. Close it. The bundle is not a river. It is a tank you can see in the phone’s data usage if you look. Look once after a hotspot evening. You will learn what a PDF costs, and what a film costs, without a speech.",
      ),
    ],
  },
  {
    slug: "wifi-or-mobile-data",
    title: "Wi‑Fi or mobile data — which tap is open",
    excerpt:
      "The fan is house radio. The arrows are the SIM. Both can be on; one is used. Look at the top of the phone before a video. A download on the wrong tap is a bill.",
    series: SERIES,
    order: 95,
    author: AUTHOR,
    date: lessonDate(95),
    cover: "/images/blog/wifi-vs-data.jpg",
    coverAlt: "A phone status bar showing Wi-Fi and mobile data icons.",
    body: [
      p(
        "Two pipes can reach a phone: the house Wi‑Fi, and the SIM’s mobile data. The top of the screen tells you which one is actually drinking. A fan or waves means Wi‑Fi. LTE, 4G, 5G, H, E, or two arrows means the SIM. If both radios are on, the phone prefers Wi‑Fi when the fan is connected. When the fan is a lie — connected with no internet — some phones sit there thirsty and do not fall back to the SIM. This lesson is reading the icons, switching a tap, and not starting a film until you know who is paying.",
      ),
      p(
        "Swipe the shade. The Wi‑Fi tile, the data tile. If you are at home and the fan is on, data can stay on as a spare; the phone should use the fan. If you are on the road, Wi‑Fi off saves it hunting for every shop’s radio. If a page fails at home, look: is the fan connected to the wrong name, or to a network with no pipe? Forget the network, join the sticker name, or switch Wi‑Fi off so the SIM can work. You already restarted a router. Do that before you buy more data because a page was slow.",
      ),
      fig(
        "/images/blog/wifi-vs-data.jpg",
        "Wi-Fi and mobile data icons at the top of a phone.",
        "One glance before a video. The fan is the house. The 4G is the bundle. If you see E, you are on a slow old pipe and a film will crawl and still charge you.",
      ),
      h2("Downloads, updates, and apps that ignore you"),
      p(
        "Play Store and iOS can be told: updates only on Wi‑Fi. WhatsApp: Settings, Storage and data, use less data, download media on Wi‑Fi. A child can still start a film. The icon at the top is the parent’s check. Some apps have their own “HD on mobile data” greed. YouTube: settings, quality, or data saving. A form, a PDF, a map — small. A live stream — a tank.",
      ),
      p(
        "Wi‑Fi that asks you to log in through a page — a hotel, a bus, some estates — is a captive portal. Data may pause until you finish that page, or both may fight. Complete the page on the real network, or use your SIM and ignore their radio. Do not type a bank password on a portal that is not your bank. You know the street.",
      ),
      fig(
        "/images/blog/data-toggle.jpg",
        "A learner checking the top of a phone before playing a video.",
        "The glance is the skill. If the fan is missing and 4G is on, a tutorial will cost. Wait for the house, or use captions and low quality, or do not play it.",
      ),
      ul([
        "At home, confirm the fan is on and a page loads. Note the icon.",
        "Switch Wi‑Fi off. Confirm the SIM icon appears and the page still loads, if you have data.",
        "Switch Wi‑Fi back on. Prefer the fan for a download.",
        "Open one app’s data settings — WhatsApp or Play Store — and tick Wi‑Fi for heavy things if you can find it.",
      ]),
      h2("When both are lying"),
      p(
        "Airplane mode, then off, is a reset of both radios. It is cheaper than a shop. If the fan shows connected and nothing loads, the router’s internet light is the next look. If the SIM shows 4G and nothing loads, the bundle may be zero, or the APN is wrong after a new SIM — a shop or the network can set APN; you should not download an “APN tool.”",
      ),
      p(
        "You now have names for the two taps, the plane, the moon, the hotspot. Glance at the top of the phone the way you glance at ENG on the taskbar. Then type, or watch, or wait. The bill is a consequence of that glance, not of bad luck. Look. Then open the film, or do not.",
      ),
    ],
  },
  {
    slug: "photographing-a-document",
    title: "Photographing a document so it can be read",
    excerpt:
      "A receipt at an angle is a riddle. Flatten the paper, stand above it, fill the frame, check the naira amount before you send. Light is the whole trick.",
    series: SERIES,
    order: 96,
    author: AUTHOR,
    date: lessonDate(96),
    cover: "/images/blog/document-photo.jpg",
    coverAlt: "A phone held directly above a document on a wooden desk.",
    body: [
      p(
        "Offices still ask for a picture of a paper: a receipt, an ID, a filled form. People photograph from the hip, under a yellow bulb, with a thumb in the corner, then argue that the clerk is wicked. The clerk cannot read a slanted glare. This lesson is a photograph that behaves like a copy: flat, filled, sharp, the amount visible. It is not yet a PDF. It is a picture you would still sign.",
      ),
      p(
        "Put the paper on a dark table, not on a patterned wrapper. Stand above it so the phone is parallel to the page — as if you were the ceiling. The page should fill the screen with a little margin, not sit as a postage stamp in a room. Wait for the camera to settle. Tap the amount so the focus sits there. Take two. Open the better one. Zoom until you can read the naira figure and the date. If you cannot, the clerk cannot. Delete that one. Try again, more light.",
      ),
      fig(
        "/images/blog/document-photo.jpg",
        "A phone held square above a page on a desk.",
        "Above, not from a chair at 45 degrees. The edges of the paper should be edges, not trapezoids. A slant is how a 5 becomes a 6.",
      ),
      h2("Light, glare, and the plastic cover"),
      p(
        "Daylight from the side is kinder than a bare bulb overhead, which turns a laminated ID into a white lake. If the card shines, tilt a few degrees until the lake leaves the numbers, or take the card out of a shiny holder. Flash is a last resort; it often paints a coin of light on the plastic. A second lamp across the room is better than flash in the face of the page.",
      ),
      p(
        "An ID: both sides if they asked. One file per side, named — id-front.jpg, id-back.jpg — not IMG_0048. A receipt: the whole slip, including the shop name. Crop after, in the phone's editor, if the table still crowds the page. Crop is not resize. You already know that pair. Do not beautify, do not add a filter, do not write on the picture in a sticker app. A clerk's machine will see the sticker. They will send you back.",
      ),
      fig(
        "/images/blog/document-glare.jpg",
        "A flat ID or receipt on a wooden desk, a phone beside it.",
        "The table is a copier. Wrinkles and a wallet edge are noise. Smooth the paper with a hand, then lift the hand, then shoot.",
      ),
      ul([
        "Photograph a page you can throw away. Open it. Read the smallest line.",
        "If you cannot, shoot again from higher, with more light, less angle.",
        "Name the file as a human would. Copy it to the computer if it must last.",
        "Do not send a photo of a password, an OTP, or a full card number in a group.",
      ]),
      h2("When they asked for a scan"),
      p(
        "A photograph can pass. A scan is the next lesson — edges found, a PDF, often flatter. If the portal says PDF, do not send a WhatsApp soup of the page. If they say JPEG under 100 KB, shrink a copy, as you learned. The picture is only as good as the last look you took before Send. Zoom. Read. Then the paperclip.",
      ),
    ],
  },
  {
    slug: "scanning-to-pdf-on-the-phone",
    title: "Scanning a page to PDF on the phone",
    excerpt:
      "A scan is a photograph with manners: edges found, a page, a PDF. Notes, Drive, and the camera's document mode are enough. A random scanner app from an advert is not.",
    series: SERIES,
    order: 97,
    author: AUTHOR,
    date: lessonDate(97),
    cover: "/images/blog/phone-scan.jpg",
    coverAlt: "A phone camera framing a document to scan.",
    body: [
      p(
        "A scan is what a photocopier does: a flat page, honest edges, a file an office can print. Phones can do this without a shop. Google Drive, Google Notes, Apple Notes, many camera apps — Document or Scan. The machine finds the four corners, greys the table, and can save PDF. This lesson is that walk, two pages into one file, and not giving a stranger app your camera roll to “scan better.”",
      ),
      p(
        "Drive on Android: the + or camera, Scan. Hold above the page, as in the last lesson. When the frame hugs the paper, shoot. The preview should look like a page, not a rug. Retake if a corner is missing. Add another page if they asked for front and back. Save as PDF, a human name, into the folder you use for Fees or IDs. On iPhone: Notes, New, the camera, Scan Documents. Same idea. The file should open as a PDF on the laptop, not as a photograph that still shows your bed.",
      ),
      fig(
        "/images/blog/phone-scan.jpg",
        "A phone framing a page to scan.",
        "The rectangle is the machine guessing the paper. If it guessed the table, cancel, flatten the sheet, try again. You are the copier operator. It is only a helper.",
      ),
      h2("Colour, size, and two sides"),
      p(
        "Black and white or greyscale is enough for a letter and a receipt. Colour for a passport photograph if they asked for colour. More contrast is not always more readable; it can eat faint ink. Look at the preview. A two-page ID is one PDF with two pages, not two chats. Offices lose the back. You already know one attachment, one job.",
      ),
      p(
        "The PDF may still be heavy. If the portal refuses, the shrinking lesson applies in spirit: a smaller scan, or a compress that is not an advert. Drive's own quality settings, or a second scan from higher with less colour. Do not screenshot the scan. That puts a taskbar on a copier page.",
      ),
      fig(
        "/images/blog/scan-pdf.jpg",
        "A scanned letter as a PDF on a laptop, paper original beside it.",
        "If the screen matches the paper, the scan worked. If the screen is a yellow mattress with a receipt on it, you sent a photograph. Scan again.",
      ),
      ul([
        "Scan one throwaway page to PDF. Open it on the laptop or in Drive.",
        "Confirm it is a page, not a photo of a room.",
        "Name it. Move it off the phone's default pile if you can.",
        "Do not install CamScanner-from-an-advert. The Notes or Drive you already have will do.",
      ]),
      h2("What a scan is not"),
      p(
        "It is not a signed original if they asked to see ink in person. It is not encryption. A PDF of an ID in Anyone-with-the-link is still an ID on the street. Mail it to the address they gave, or upload to their portal, Restricted. And a scan of a screen — a phone pointed at a laptop — is a photograph of pixels. Use a screenshot on the laptop, or Download the real file. The copier is for paper. The screenshot is for glass. You now have both.",
      ),
    ],
  },
  {
    slug: "one-time-passwords",
    title: "OTPs — codes that die",
    excerpt:
      "A six-digit SMS is a key that works once. Nobody who is helping you needs to hear it. Type it into the page you opened on purpose. Then let it expire.",
    series: SERIES,
    order: 98,
    author: AUTHOR,
    date: lessonDate(98),
    cover: "/images/blog/otp-sms.jpg",
    coverAlt: "A phone showing a short SMS with a six-digit code.",
    body: [
      p(
        "A bank, a mail, a government portal will send a short number to the phone: one-time password, OTP, token. It is a second lock. It dies in minutes. It is not a PIN you reuse. It is not a balance. The whole crime of the last few years, in this city, is someone asking you to read that number aloud. This lesson is where it belongs — the page you walked to — and where it does not: a call, a WhatsApp, a “Microsoft support.”",
      ),
      p(
        "You typed your password on the real street. The site says it will SMS you. Wait. The phone lights. A sender that looks like the bank, or 33123, or Google. Open the SMS, not a WhatsApp that arrived at the same time. Type the digits into the same page. Submit once. If the page says wrong, wait for a new code; the old one may already be dead. Do not type the code into a second page that popped up. One walk, one box.",
      ),
      fig(
        "/images/blog/otp-sms.jpg",
        "A six-digit code in an SMS on a phone.",
        "The number is a key on a timer. Anyone who asks you to read it is asking you to open the door from inside. Hang up.",
      ),
      h2("Calls, WhatsApp, and the helpful thief"),
      p(
        "A voice: we are the bank, we are reversing a debit, read the code we just sent. Hang up. Call the number on the back of the card. A WhatsApp: send the code to confirm your BVN. You already know that play. A page that arrived from a link and then asks for OTP is two rooms: their fake, then your real SMS, which they will use on the real bank. Close. Walk to the bank yourself. If nothing is wrong, nothing is wrong.",
      ),
      p(
        "Autofill on a phone may offer to paste the code. That is convenient on your phone, on the real app. It is a trap if a fake app is in the foreground. Look at the app name before you Accept. Some banks' own apps ask for a token from a hardware fob or from their app, not SMS. Obey that. Do not hunt a code in SMS that was never sent.",
      ),
      fig(
        "/images/blog/otp-waiting.jpg",
        "A learner with a laptop login and a phone, waiting for a code.",
        "The computer is the door. The phone is the second key. Both should be yours. A helper does not need to hold the phone.",
      ),
      ul([
        "The next time a real site sends a code, type it yourself. Do not read it to anyone.",
        "If a call asks for it, hang up. Dial the printed number.",
        "Delete old OTP messages when you remember. They are dead, but they clutter.",
        "Do not screenshot an OTP into a group to “show I tried.”",
      ]),
      h2("When it does not arrive"),
      p(
        "Airplane mode, no signal, a full SIM, a new number the bank does not have. Switch the plane off. Wait a minute. Resend once. If you just ported a number, tell the bank before you panic. Do not give a shop your OTP to “unlock a faster SIM.” That is the key to the house.",
      ),
      p(
        "The second lock only works if the second key stays in your hand. Password, then OTP, then you are in. Anyone who wants the middle of that sandwich wants the house. You have had this lesson in other clothes. The digits are just smaller. Let them die in the box you chose, not in a stranger's ear.",
      ),
    ],
  },
  {
    slug: "public-wifi-and-the-bank",
    title: "Public Wi‑Fi and the bank",
    excerpt:
      "A free fan in a café is a shared tap. Mail can wait. The bank should use the SIM or the house. A login page that is not the café's is a street you did not mean.",
    series: SERIES,
    order: 99,
    author: AUTHOR,
    date: lessonDate(99),
    cover: "/images/blog/cafe-wifi.jpg",
    coverAlt: "A laptop at a small café table with a Wi-Fi password card.",
    body: [
      p(
        "Free Wi‑Fi is a kindness and a crowd. The café, the bus, the business centre, an estate's “Guest.” You already know not to tick Remember this computer. This lesson is the extra caution: which jobs may use a stranger's radio, and which jobs pay a little data to stay on the SIM. The bank, a password change, a transfer, a BVN portal — the SIM, or the house, or not today.",
      ),
      p(
        "Joining is the same fan list. The name should match the card on the counter, not “Cafe_Free_Login” with an extra word. A portal page that only asks you to tap Continue is ordinary. A portal that asks for a Google password is not the café; it is a trap wearing a kettle. Close. Use your data. Tell the counter if you like. Do not type the mail key into a page whose address is not the café and not Google.",
      ),
      fig(
        "/images/blog/cafe-wifi.jpg",
        "A laptop at a café table, a Wi-Fi card beside it.",
        "The card is the sticker. The list is full of cousins. If two names are almost the same, ask a human who works there which fan is theirs.",
      ),
      h2("What you may do, and what you postpone"),
      p(
        "Read the news. Search a map. Watch a short video if the bundle at home is the problem. Mail, if you must, in a private window, then sign out. Do not tick Stay signed in. Do not open the bank. Do not type a card number. Do not change a password. The radio is shared; a badly run café, or a neighbour, can be nosy. You do not need the science. You need the habit: money stays on a pipe you pay for.",
      ),
      p(
        "A VPN is a tunnel some people buy. It is not a magic cloak, and a random free VPN is another stall. You do not need one to finish this course. You need the SIM for the bank and the house for the rest. If a form is due tonight and the café is the only light, use the phone's data, even hotspot to the laptop, rather than their fan. You know the spare tyre.",
      ),
      fig(
        "/images/blog/bank-on-public.jpg",
        "A browser on a laptop, no bank page open.",
        "If you are not sure whose radio this is, it is public. The bank can wait until the fan is yours. A late transfer is cheaper than a fast one on a stranger's tap.",
      ),
      ul([
        "At a café, join the name on the card. Open cea.ng. That is enough of a test.",
        "Do not open the bank. If you must pay, switch to mobile data, Wi‑Fi off.",
        "When you leave: forget the network, or just leave. Sign out of mail if you opened it.",
        "If a portal asked for your Gmail password, you did not join a café. Change the mail password from a machine you trust.",
      ]),
      h2("The business centre"),
      p(
        "Their machines plus their Wi‑Fi is two crowds. USB your files, do the work, five-minute walk, take the stick. Their bank login is not a thing you should ever do. If they offer to “help you pay,” they are in the password lesson. You type, they point, or you leave.",
      ),
      p(
        "Public radio is not evil. It is shared. Shared is fine for a newspaper. Shared is not fine for a key. Look at the fan. Name the job. If the job is money, pay for the pipe. The bundle is smaller than a reversal you will not get.",
      ),
    ],
  },
  {
    slug: "you-have-won",
    title: "“You have won” — the message that wants a fee",
    excerpt:
      "A prize you did not enter is not a prize. A fee to release money is a tap that only flows out. Delete. Do not call the number. Do not send airtime to claim a car.",
    series: SERIES,
    order: 100,
    author: AUTHOR,
    date: lessonDate(100),
    cover: "/images/blog/you-have-won.jpg",
    coverAlt: "A phone showing a prize or winnings message.",
    body: [
      p(
        "You have sat through passwords, links, OTPs, fake virus banners, QR codes on poles. This is the same play in party clothes. A text, a WhatsApp, an email: you have won a car, a grant, a UN fund, a lottery you did not enter, a parcel worth millions. To release it, pay a small fee, send airtime, share a BVN, click a link. The small fee is the whole harvest. There is no car. This lesson is the shape, so you can delete it in one breath and teach the next person the same breath.",
      ),
      p(
        "You did not enter. That is enough. Real lotteries in Nigeria are not in the habit of hunting you on WhatsApp. Banks do not release “USD grants” after a processing fee. A church does not need you to pay Customs for a blessing that arrived as a container. A job that wants a processing fee before you start is not a job — you met that in the form lesson. Hurry, secrecy, a prize, a fee: four tells. You only need one.",
      ),
      fig(
        "/images/blog/you-have-won.jpg",
        "A prize message on a phone.",
        "The number will not be in your contacts. The English will be almost right. The amount will be large. The ask will be small. Small is how they pass the gate.",
      ),
      h2("Airtime, gift cards, and the kind relative"),
      p(
        "Send ₦5,000 airtime to this number to confirm. Buy a Google card and read the code. Pay Customs to this personal account. All of those are one-way taps. Reversals do not come. A relative's voice on the phone, crying, send money, is a different costume — confirm with another number you already have for that relative. Do not use the number that called. The prize message is the simpler cousin. Delete. Block. Do not argue with it. Arguing is how they keep you on the line until a fee feels like your idea.",
      ),
      p(
        "A website with balloons and a form is still a form. You do not put a card into it. You do not download a “claim kit.” You do not call the international number; the call is the bill. If you already sent a little, stop. Do not send a second time to “unlock the first.” Tell the bank if an account you paid is still reachable. Shame is the second harvest. You are not the first. You will not be the last. You can still close the tap.",
      ),
      fig(
        "/images/blog/prize-message.jpg",
        "A learner looking skeptically at a phone message.",
        "Skepticism is the whole skill. A prize you cannot name from a life you actually lived is a story. You do not belong in that story. Put the phone down.",
      ),
      ul([
        "The next “you have won,” delete, without opening a link.",
        "If a family member forwards one, tell them the four tells. Do not click theirs to “see.”",
        "Nobody at the academy, a bank, or a church needs a fee to release a prize you did not enter.",
        "If you already paid, stop paying. Bank, then a person you can see. Not a helper in the comments.",
      ]),
      h2("What you now have, in this one habit"),
      p(
        "Walk there yourself. Do not pay to be paid. Do not read an OTP aloud. Do not trust hurry. The hundred notes in this series are names for rooms you already live in: files, mail, money, the pocket, the street. The prize message is a room with no door out. You do not enter. You already know how to sit down when a message shouts. Sit down. Then delete. Then go back to the letter that is actually yours.",
      ),
    ],
  },
];

