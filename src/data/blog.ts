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
  {
    slug: "six-more-keystrokes",
    title: "Six more keystrokes, then rest",
    excerpt:
      "You already own copy, paste, and undo. Add save, find, select all, and three for the browser — then stop collecting. Six is a year's worth.",
    series: SERIES,
    order: 101,
    author: AUTHOR,
    date: "2026-01-01",
    cover: "/images/blog/shortcut-save-hands.jpg",
    coverAlt: "A left little finger pressing the Ctrl key while another finger presses S on a keyboard.",
    body: [
      p(
        "By now your hands own three: Ctrl and C, Ctrl and V, and the undo that rescued the paragraph you did not mean to kill. Alt and Tab walks you through open windows. That is a respectable number. It is also where most people stop, and then spend ten years clicking through menus for the five acts they perform every day. This lesson adds six more keystrokes. Then it asks you to stop. Collecting shortcuts like proverbs is not skill. Using six until they are reflexes is.",
      ),
      p(
        "The first is Ctrl and S — save. The light does not send a warning before it goes, and neither does a battery. Save every few minutes and a power cut costs you a paragraph, not an evening. It works in Word, in spreadsheets, in Docs, in almost everything that makes documents. In a browser it offers to save the page itself, which you will rarely need — so the rule is simple: Ctrl and S belongs to programs, not to pages.",
      ),
      fig(
        "/images/blog/shortcut-save-hands.jpg",
        "A left little finger pressing Ctrl while another finger presses S.",
        "The little finger holds Ctrl; another finger taps S. Two seconds, pressed often, and a power cut becomes a nuisance instead of a funeral.",
      ),
      h2("Find, before you read everything"),
      p(
        "Ctrl and F opens a small box, usually in a corner. Type a word — bank, deadline, refund — and the page jumps to it, marking every place the word sits. It works in Word, in the browser, in the PDFs you met in their own lesson, on long group pages. It is the difference between scrolling a form with your eyes for ten minutes and asking the machine, which reads the whole page in a blink, to point. People underestimate this one. It is the most intelligent lazy thing a computer does for you.",
      ),
      h2("Select all, and three for the browser"),
      p(
        "Ctrl and A selects everything in the document or on the page: one press, and the whole text sits highlighted, ready to copy, ready to delete. Ready to delete is why you pause before pressing A in a document you love. In the browser, three small ones. Ctrl and T opens a new tab — a fresh doorway, so you do not type a new address over the page you are reading. Ctrl and L jumps the cursor straight to the address bar, where the internet lesson taught you to type. Ctrl and W closes the tab you have finished with. It closes without asking, so save any form you were filling first.",
      ),
      fig(
        "/images/blog/find-in-page.jpg",
        "A laptop screen showing a long page with a small find box in the corner and one word highlighted.",
        "Type the word once; the machine counts every place it appears — 1 of 7 — and walks you through them. Reading a page to find one figure is a tax you can stop paying.",
      ),
      ul([
        "Open the letter you typed last week. Press Ctrl and S now, out of respect.",
        "Press Ctrl and F on any long page and look for the word price. Watch it count.",
        "Press Ctrl and A in Notepad, then Ctrl and C. You have copied a page in two seconds.",
        "Practise Ctrl and T, Ctrl and L, Ctrl and W as one walk: open, address, close. Repeat it on purpose for a week.",
      ]),
      h2("Then stop"),
      p(
        "There are hundreds more, and one day you will meet Ctrl and P for printing, and be pleased it was waiting. But six is a year's worth. The hands learn by repetition, not by lists, and a shortcut you use weekly is worth fifty you memorised in one proud evening. Close the list. Go and use the six.",
      ),
    ],
  },
  {
    slug: "the-keyboard-on-the-phone",
    title: "The keyboard on the phone",
    excerpt:
      "You type more on glass than on any keyboard you will meet. Long-presses, a cursor you can slide, and autocorrect put firmly in its place — one quiet hour with the keys you carry everywhere.",
    series: SERIES,
    order: 102,
    author: AUTHOR,
    date: "2026-01-05",
    cover: "/images/blog/phone-keyboard-hands.jpg",
    coverAlt: "Two thumbs typing on a phone keyboard held in both hands.",
    body: [
      p(
        "The computer keyboard has a home row and ridges on F and J. The phone has a sheet of glass, and yet it is the keyboard you use most — the transfers, the WhatsApps, the searches, the letters begun on the bus. It deserves the same quiet hour. Most people have typed on it for years and were never shown a single trick, the way people carry keys for years without knowing what the deadbolt is.",
      ),
      p(
        "Look at the keyboard as a set of floors. The ground floor is the letters. A key marked ?123 or 123 lifts you to the numbers and the common symbols; a second shift on that floor reveals the rarer ones. The arrow above the letters is Shift — tap once for one capital, as on the computer, and tap twice only if you truly intend to shout. The key that rubs out is Backspace, same as ever. And long-press changes everything: hold a letter and its hidden relatives appear. Hold E and you meet the accents the typing lesson gave you on the computer. Hold N and some keyboards will offer the naira; others keep it on the symbols floor, and now you know where to look.",
      ),
      fig(
        "/images/blog/phone-keyboard-hands.jpg",
        "Two thumbs typing on a phone keyboard held in both hands.",
        "Two thumbs, not ten fingers. The phone keyboard is built for the sides of the thumbs; the middle of the screen is where typos are born.",
      ),
      h2("The tricks that save the thumbs"),
      p(
        "Hold the space bar. On most keyboards the letters fade and the cursor becomes something you can drag through the sentence — no more stabbing a fingertip between two letters and hoping. Double-tap the space bar and most keyboards hand you a full stop, a space, and a capital at once — a small luxury for the end of sentences. Then swipe typing, if your keyboard offers it: rest a thumb on the first letter and drag through the word without lifting, lifting only at the end. It feels like writing in one stroke of ink. Practise on your own name ten times and you will not go back.",
      ),
      h2("Autocorrect is a cousin, not a teacher"),
      p(
        "The keyboard will correct your village's name into a European lake and a whole Pidgin sentence into nonsense, with great confidence. You met this manner in the spell-check lesson: it is a cousin, not a teacher. When a word comes out wrong, tap it — the original often appears above, and tapping that returns it. When you spell a name the right way once and refuse the correction, many keyboards remember and stop arguing. Feed it the names of your people, your street, your bank. The keyboard is an app; it can be taught the household.",
      ),
      fig(
        "/images/blog/phone-keyboard-longpress.jpg",
        "A thumb long-pressing a letter on a phone keyboard while a small row of options appears above it.",
        "Hold a key, slide, release. The hidden symbols live behind a half-second of patience, not behind a settings menu.",
      ),
      ul([
        "Type a sentence that needs a number and a symbol, visiting the number floor no more than twice.",
        "Hold the space bar and slide the cursor into the middle of a sentence. Fix one letter. Release.",
        "Long-press five different keys and see what each hides. Note where the naira lives on yours.",
        "Type your street's name and refuse the correction once. See whether the keyboard learns.",
      ]),
      h2("When it misbehaves"),
      p(
        "The keyboard vanished? Tap the box you were typing into; it is shy, not broken. It switched itself to French overnight? Look for the globe or language key beside the space bar. The clicks and vibrations madden you? That lives in the keyboard's own settings, usually behind a gear or a long-press on the comma. Nothing here needs a technician. The keyboard is the smallest computer you own, and like all of them, it only wants to be introduced properly.",
      ),
    ],
  },
  {
    slug: "talking-to-the-keyboard",
    title: "Talking to the keyboard",
    excerpt:
      "Your voice is faster than your thumbs. The microphone key writes as fast as you speak — where it shines, where it fails, and the codes that must never be spoken aloud.",
    series: SERIES,
    order: 103,
    author: AUTHOR,
    date: "2026-01-10",
    cover: "/images/blog/voice-typing-mic.jpg",
    coverAlt: "A man speaking toward his phone while words appear on the screen as text.",
    body: [
      p(
        "On every good keyboard, beside the space bar, sits a small microphone. It is not decoration. Tap it, speak at your normal pace, and the words land on the screen as they leave you. This is voice typing, and it is not cheating. The letter still needs your judgement, the message still needs your manners; only the writing by thumb is replaced. For a long message, a first draft, or tired eyes at the end of the day, it is the fastest pen in the house.",
      ),
      p(
        "Punctuation can be spoken. Say full stop and one arrives; comma, question mark, new paragraph — the decent keyboards obey. On the computer, the browser carries the same gift: in Google Docs, look under Tools for Voice typing, and speak while it listens. Windows keeps its own under Windows and H. The accent is not a wall — Nigerian English is heard well by the big keyboards. Clarity beats loudness. Speak the way you would speak to a respectful junior: plainly, at your own pace, without shouting.",
      ),
      fig(
        "/images/blog/voice-typing-mic.jpg",
        "A man speaking toward his phone while the words appear on the screen as text.",
        "Tap the microphone, speak, watch the sentence build. It hears best when the phone is close and the room is not fighting you.",
      ),
      h2("Where it shines, and where it fails"),
      p(
        "It shines on length. The two-finger typist writes a paragraph in eight minutes; the voice writes it in two and spends the rest on repairs. It shines on drafts — say the messy first version, then edit with your hands. It fails in noise: a generator, a market, a bus park will sprinkle strangers' words into the sentence. It fails with several speakers; it writes whoever is loudest. And it sometimes stumbles on a heavy Pidgin phrase or an unfamiliar name, which you then repair by thumb. So the rule stands: dictate in quiet, review before sending. The machine types what it hears. You remain the owner of what is sent.",
      ),
      p(
        "One line is drawn hard. Do not speak passwords, PINs, card numbers, or the codes that die — the OTPs you met in their own lesson. A code said aloud in a quiet room is still said aloud. The keypad exists precisely for secrets. Let the fingers carry those.",
      ),
      fig(
        "/images/blog/voice-typing-docs.jpg",
        "A woman at a desk speaking while a document fills with lines of text.",
        "A first draft dictated in two minutes, then repaired by hand. The voice writes; the judgement edits. Both belong to you.",
      ),
      ul([
        "Dictate a WhatsApp message to yourself. Read it once, repair two words, then send it on.",
        "Say a sentence with two commas and a question mark, spoken aloud, and see whether they land.",
        "In Google Docs, open Tools, then Voice typing, and dictate one paragraph of anything.",
        "Practise the hard line: the next OTP goes into the keypad with your fingers, never out of your mouth.",
      ]),
      h2("A draft, not a finished letter"),
      p(
        "Treat dictated text as clay, not pottery. Read it before you send it — the machine will have heard a cousin where you said a name, a sale where you said Sade. Fix, then send. People who trust the first hearing spend their evening on apologies; people who read once send like people who write. The microphone has given your thumbs a holiday. It has not taken over the letter.",
      ),
    ],
  },
  {
    slug: "email-in-your-pocket",
    title: "Your email in your pocket",
    excerpt:
      "The desk taught the manners; the phone carries the letter. Attachments opened on glass, the CV attached from where it lives, and the right account chosen before you press send.",
    series: SERIES,
    order: 104,
    author: AUTHOR,
    date: "2026-01-14",
    cover: "/images/blog/email-pocket.jpg",
    coverAlt: "A woman reading an email on her phone in an office corridor.",
    body: [
      p(
        "Your first email was written at a desk, with a keyboard wide enough to be honest. But the letter does not wait at the desk. The interview invitation, the school's admission, the client's correction — they arrive while the phone is already in your hand. So the desk folds into the pocket: the Gmail app, or the phone's own mail app, and everything the desk taught still applies, only smaller.",
      ),
      p(
        "Set it up once. Open the app, choose to add an existing account, give the address you made on purpose in its own lesson, type the password once. The app keeps it; you never type it again on that phone. If you carry two addresses — one serious, one from your younger years — add both. They sit side by side, each labelled, and the app asks which one is speaking every time you compose. Look at that label every time. The classic embarrassment of a working life is a CV that went out under the joke address.",
      ),
      fig(
        "/images/blog/email-pocket.jpg",
        "A woman reading an email on her phone in an office corridor.",
        "The inbox in the pocket. Same letters, same manners, smaller desk — and the sender's name checked twice before anything is sent.",
      ),
      h2("Reading on glass"),
      p(
        "Attachments open with a tap: the CV in PDF, the invoice, the school's letter. If the phone says it cannot open a file, that is the open-with lesson again — the file is not broken, it simply needs to be handed to the right program. Reply sends to one person. Reply all sends to the whole corridor, which you met at the desk and which is no safer for being small. Read the To line before the first word of your reply. Thumbs are quick; that is exactly why you slow them at the top of a letter.",
      ),
      h2("Attaching from the pocket"),
      p(
        "The paperclip is there. Compose, look for the attachment symbol, and the phone offers where from: Files, Drive, or the camera. Files walks to the scan you made in the documents lesson. Drive reaches whatever you have parked in the cloud. The camera takes something new — right for a form that wants your face today, wrong for a certificate that already exists scanned. Attach, then wait for the file's name to appear above the message before you send. Sending before the attachment finishes is posting the envelope before the letter is inside.",
      ),
      fig(
        "/images/blog/attach-from-phone.jpg",
        "A phone showing an email being composed, with an attached file sitting above the message.",
        "The paperclip, the chooser, the file's name sitting above the text like a label on a parcel. Then, and only then, send.",
      ),
      ul([
        "Add your main address to the phone's mail app, and check the label it now carries.",
        "Email yourself a PDF. Open the attachment, then reply to it from the phone.",
        "Attach one file — a scan, not a camera photo — to a draft. Do not send the draft. Look at how the attachment sits.",
        "Read your signature on the phone and shorten it to your name and number, nothing that apologises.",
      ]),
      h2("Notifications without drowning"),
      p(
        "Email is not WhatsApp, and it must not learn to shout like it. The letter does not need an answer in four minutes; it needs an answer today, thought through. In the app's settings, let the important inbox notify you and let the adverts pass in silence — most apps sort this for you, if you look once. A short signature saying who you are is enough; the phone does not need to tell the world it is a phone. The desk gave you the manners. The pocket keeps them, quietly.",
      ),
    ],
  },
  {
    slug: "the-file-that-goes-up",
    title: "The file that goes up",
    excerpt:
      "Downloads taught where files land. Applications need the other direction: choose the file, watch the bar finish, keep the slip. Uploading, done calmly.",
    series: SERIES,
    order: 105,
    author: AUTHOR,
    date: "2026-01-19",
    cover: "/images/blog/choose-file.jpg",
    coverAlt: "A laptop screen showing an online form with a file chosen and its name beside the button.",
    body: [
      p(
        "The Downloads lesson was about files coming down — parcels landing on the mat. The other half of an online life is files going up. A job portal asks for your CV. A school asks for the certificate. A form asks for a passport photograph. Each is the same small act: the machine asks you to choose a file, you choose it, it travels up. People fear this moment more than any other in a form, and it does not deserve the fear. It deserves a slow hand.",
      ),
      p(
        "The button has many names — Choose file, Upload, Attach, Select — but one behaviour. Tap it and a window opens onto your own rooms: Documents, Pictures, the Downloads mat. Walk to where the file lives, tap it once, and its name appears beside the button like a label on a parcel. That is the whole act. What frightens people is not the choosing. It is the size limits and the waiting.",
      ),
      fig(
        "/images/blog/choose-file.jpg",
        "A laptop screen showing an online form with a Choose file button and the chosen file's name beside it.",
        "Tap the button, walk to the room, tap the file. The name appearing beside the button is the parcel being labelled — nothing has flown yet.",
      ),
      h2("Size limits, and the bar that must finish"),
      p(
        "Portals state limits the way airlines state luggage: maximum 500 KB, maximum 2 MB. You already know what KB and MB mean, and you already know how to shrink a photograph. When a form refuses a file for size, the answer is to shrink the file — not to blame the school, not to send the document to a stranger who offers help. When the file is accepted, a bar begins to move. Let it finish. Closing the page mid-upload is hanging up mid-sentence: the form arrives, the paper does not, and nobody writes to tell you. Wait for the word done, the green tick, or the file's name resting quietly in its slot.",
      ),
      p(
        "On the phone, the chooser offers three doors: Camera, Files, Drive. Camera takes a fresh photograph — right for a form that wants your face today. Files walks to the scan you already made. Drive reaches what you have parked in the cloud, which the next lesson turns into a system. For papers that exist as scans, choose Files. Fresh photographs of old certificates come out crooked, with shadows like bruises.",
      ),
      fig(
        "/images/blog/upload-finished.jpg",
        "A phone screen showing a file upload finishing with a green tick.",
        "The tick means the parcel was delivered, not merely posted. A screenshot of that moment is cheaper than re-submitting an application.",
      ),
      ul([
        "Practise once where nothing is at stake: upload a photograph to any profile that asks. Walk the whole road for exercise.",
        "Before a real application, check the size limit first, then check your file's size. Match the luggage to the airline.",
        "Never close a page while a bar is moving. Go and wash a plate instead.",
        "When the tick comes, screenshot it. The slip is the proof you were there, on time, complete.",
      ]),
      h2("The slip is the receipt"),
      p(
        "Most portals, after an upload, show the file's name, or let you download what you submitted. Do download it, once, and look at it with your own eyes. The wrong file — the scanned WAEC where the birth certificate should be — has travelled farther than most lies, and the portal will judge it without pity. Then print or PDF the final confirmation page, the way you keep a teller's slip at the bank. Applications are lost not at the choosing but in the last ten seconds: the bar abandoned, the wrong parcel posted, the slip never kept. You are past all three now.",
      ),
    ],
  },
  {
    slug: "papers-the-bag-cannot-lose",
    title: "Papers the bag cannot lose",
    excerpt:
      "Certificates drown, burn, and walk out of bags. Scanned, named, and parked in Drive, they survive all three — one quiet evening of work, private until you say share.",
    series: SERIES,
    order: 106,
    author: AUTHOR,
    date: "2026-01-24",
    cover: "/images/blog/drive-papers.jpg",
    coverAlt: "A phone held in both hands showing cloud storage folders named Papers, Certificates and IDs.",
    body: [
      p(
        "Consider what sits in that bag: birth certificate, WAEC, the degree, NYSC, the CV. One bag. One rain. One theft on a Thursday. The drawer at home holds the originals, but the drawer is in the same house as the leaking roof, and papers do not swim. What the cloud lesson explained, this lesson does: one evening of scanning gives you a set of papers no bag can lose and no rain can reach.",
      ),
      p(
        "The work is plain. Scan each paper properly — good light, flat surface, all four corners, the way the scanning lesson taught — or photograph it squarely if a scanner is far. Then give each one a name that will still make sense in ten years: waec-certificate-2014, not scan12, not IMG_0093. Renaming matters more than scanning; a good paper with a bad name is lost in your own cupboard. Put them in Drive, in a folder called Papers, with rooms inside it: Certificates, IDs, Work. One evening. Done for life.",
      ),
      fig(
        "/images/blog/drive-papers.jpg",
        "A phone held in both hands showing cloud storage folders named Papers, Certificates and IDs.",
        "A folder called Papers, rooms inside it, names with years. The cupboard that is not in the house.",
      ),
      h2("What this buys you"),
      p(
        "A cyber café at eight in the morning, before an interview, with no flash drive: you sign in, the papers are there, you download, you print, you walk in calm. A form that wants the certificate: you upload straight from Drive, no cables, no borrowing a neighbour's laptop. The bag can be stolen in Owerri and the papers still arrive in Lagos by nightfall. This is what backup before the light goes meant — applied to the papers that carry your name.",
      ),
      p(
        "Now the other half, which is where people hurt themselves. A file in Drive is private until you say share, so say it carefully. Certificates and IDs go to the school, the employer, the portal — one address at a time, or a link set so only they can open it. They do not go to groups. They do not go to a helper's WhatsApp. The spirit of the OTP lesson applies: a thing that proves you are you is a key, and keys are not posted on walls.",
      ),
      fig(
        "/images/blog/certificate-folder.jpg",
        "A scanned certificate on a desk beside a phone showing the same certificate on its screen.",
        "The original stays in the drawer; the copy floats. When the flood or the thief comes, one of these survives.",
      ),
      ul([
        "Tonight, scan one certificate — just one — and name it with the document and the year.",
        "Create the Papers folder in Drive and put it there. Ten more evenings will finish the drawer.",
        "Try the café drill once: on any other machine, sign in, find the paper, download it. That is the whole miracle.",
        "Share one file with yourself, by your own address, and open it. Then leave everything else unshared.",
      ]),
      h2("One evening, then a habit"),
      p(
        "Do not attempt the whole drawer in one heroic night. One paper each evening, the way the keyboard was learned — ten honest minutes. The originals stay where your mother can find them; the copies sit above the flood line, above the fire, above the thief. A house may stand for eighty years without trouble. The papers cost you one week of evenings to make sure that if it does not, your name survives the trouble.",
      ),
    ],
  },
  {
    slug: "before-you-forget-the-password",
    title: "Before you forget the password",
    excerpt:
      "Recovery is the spare key, cut while the main key still opens the door. Set it today, in daylight, and never accept recovery help from a caller.",
    series: SERIES,
    order: 107,
    author: AUTHOR,
    date: "2026-01-29",
    cover: "/images/blog/recovery-screen.jpg",
    coverAlt: "A man looking thoughtfully at his phone showing an account verification screen.",
    body: [
      p(
        "One day — not today, which is exactly the problem — you will type your password and the machine will say no. Not because you did anything wrong. Because you are a person, and persons forget, and phones are stolen, and numbers change. The passwords lesson taught you to keep the key. This lesson is about the second thing every account has: a spare key called recovery, which can only be cut in advance.",
      ),
      p(
        "Open your Google account, the one made on purpose. Under Security you will find Recovery phone and Recovery email. Set both, today, while the door still opens easily. The recovery phone is your real SIM — the one in your pocket, alive, registered. The recovery email is a second address you actually open, not one you created in 2017 and have never visited since. A spare key to a house you no longer live in is not a spare key. It is a gift to whoever moves in after you.",
      ),
      fig(
        "/images/blog/recovery-screen.jpg",
        "A man looking thoughtfully at his phone showing an account verification screen.",
        "Prove you are you — answered not by memory but by the arrangements you made in daylight, months before the question came.",
      ),
      h2("The rules of the spare key"),
      p(
        "Rule one: the recovery email must be alive. Open it once a month, the way you check that the spare key still turns. Rule two: when your number changes, update the recovery phone that same week. This is not paperwork for its own sake — a stolen or recycled number is how strangers inherit accounts, which is why the SIM itself is guarded like cash. Rule three: WhatsApp is tied to your number and the bank to its registered one. When any of those change, walk through all of them in one evening, the way you change the locks when the key count changes.",
      ),
      p(
        "Then the day comes, and it is mild. On the sign-in page: Forgot password. The code goes to the recovery you set — the phone or the email. You type it, you choose a new password by the old rules, you continue. Ten minutes. What recovery is not: a caller. Nobody from Google, from your bank, from any office, phones you to recover an account, and no helper needs the code that arrives for one. You met that shape in the OTP lesson and the prize lesson; recovery has simply become their favourite costume. Recovery happens on your screen, in the app, at your pace. Hang up on anyone who says otherwise.",
      ),
      fig(
        "/images/blog/recovery-code-paper.jpg",
        "A small notebook beside a phone, with ten one-use recovery codes written by hand.",
        "Some accounts offer one-use codes on paper. They live with the password notebook, in the drawer, and they are never typed for anyone who calls.",
      ),
      ul([
        "Today, in daylight: set the recovery phone and recovery email on your main account. Two minutes.",
        "Open your recovery email once now, and put a reminder in the calendar to open it monthly.",
        "Write the recovery address in the password notebook. The address is not a secret from the drawer.",
        "Changed your number? Before the old SIM dies, walk every account through its recovery settings.",
      ]),
      h2("The door behind the door"),
      p(
        "Every account is a door with a locksmith's record behind it. The password is the key in your hand; recovery is the record that says whose hand the key belongs to. Cut the spare while the main still turns, keep the record current when the house changes, and treat anyone who offers to open your door from outside, by phone, as exactly what they are. The next lesson adds a second lock to the door itself.",
      ),
    ],
  },
  {
    slug: "the-second-lock",
    title: "The second lock",
    excerpt:
      "A stolen password should not be enough to be you. Two-step verification, backup codes on paper, and the rule for prompts you did not start.",
    series: SERIES,
    order: 108,
    author: AUTHOR,
    date: "2026-02-01",
    cover: "/images/blog/second-lock.jpg",
    coverAlt: "A phone showing a sign-in approval prompt with two buttons, held by a thoughtful woman.",
    body: [
      p(
        "A password is one lock. Whoever learns it, buys it, or guesses it walks straight in, and you will not see them enter. Two-step verification is the second lock: after the password, the account insists on a code that reaches only your hand — the phone in your pocket, not the thief's laptop. You have watched such codes arrive all your digital life, and the OTP lesson taught you never to read one out. This lesson is the quiet reversal: you start the knock yourself, on purpose, on your own door.",
      ),
      p(
        "Begin with the account that owns the rest. Google: sign in, Security, 2-Step Verification, follow it through, and let it learn the phone you actually carry. WhatsApp: Settings, Account, Two-step verification — a PIN you choose, which is not your birthday and not 1234, because the password rules never retired. Your bank app likely added its own device lock on the day you activated it. Leave it exactly as it is.",
      ),
      fig(
        "/images/blog/second-lock.jpg",
        "A phone showing a sign-in approval prompt with two buttons, held by a thoughtful woman.",
        "The password was right; the account still asks for the second proof. This is the door checking both locks — a friend's voice, not a stranger's.",
      ),
      h2("Where the code should come from"),
      p(
        "By default the code arrives by SMS. That is good enough to start tonight, and starting tonight matters more than the perfect version. The stronger form is an authenticator app, which generates the code on the phone itself every thirty seconds, so that a SIM swap — a stranger convincing the network that your number is theirs — cannot intercept what never travels. When the SMS habit feels like home, spend one evening moving the main account across. Perfection is a poor excuse for refusing the first lock.",
      ),
      p(
        "Before the setup closes, the account will offer backup codes: ten one-use keys, shown once, for the day the phone itself is lost — because the second lock locks you out too, if the phone is at the bottom of a river. Screenshot them, then write them by hand into the password notebook, and keep them where the notebook lives. Losing the phone without the codes means a long, cold proof that you are you. You already built that proof in the recovery lesson; the codes are its fast lane.",
      ),
      fig(
        "/images/blog/backup-codes-paper.jpg",
        "A strip of handwritten one-use backup codes folded inside a notebook beside a phone.",
        "Ten paper keys for the day the phone drowns. They live in the drawer, and they are typed only by you, only into the sign-in page.",
      ),
      ul([
        "Tonight: turn on 2-Step Verification on your main Google account. Ten minutes, once in a lifetime.",
        "Turn on WhatsApp's two-step PIN while the kettle boils.",
        "Write the backup codes into the notebook by hand — not a photo in the gallery the phone will lose with it.",
        "Tell no one your WhatsApp PIN, including people who say they are helping you set it up.",
      ]),
      h2("The prompt you did not start"),
      p(
        "The second lock brings one new danger, and one new rule. A thief with your password can press sign in, which sends an approval prompt to your phone — a question asking, may I come in? If it is 2 a.m. and you are asleep and not signing in, the answer is no: deny, then change the password, because the password is out there now. Never approve a knock you did not knock; never read out a code you did not ask for. The two sentences are the same sentence. The first lock keeps out the lazy. The second keeps out the lucky. After that, what protects you is the habit of pausing.",
      ),
    ],
  },
  {
    slug: "the-forward-that-lies",
    title: "The forward that lies",
    excerpt:
      "Some lies want your money; some want only your finger. The sixty-second check before you forward, and your name as the envelope every lie travels in.",
    series: SERIES,
    order: 109,
    author: AUTHOR,
    date: "2026-02-05",
    cover: "/images/blog/forwarded-many-times.jpg",
    coverAlt: "A phone screen showing a chat message marked Forwarded many times.",
    body: [
      p(
        "Not every lie asks for a fee. Some ask for something you give free, a hundred times a day: your finger on Forward. The invented cure — salt, bitter kola, hot water — that sends a frightened family past the pharmacy. The quote the minister never said, dressed in a broadcaster's logo. The security warning that turns a street against a stranger. Send to ten groups and something will happen; do not break the chain. The prize lesson's lies wore hurry and a fee. These wear care — forward, because you love them — and they travel under your face.",
      ),
      p(
        "Because that is the mechanics of it: a lie forwarded by an honest person arrives wearing the honest person's face. Your aunt does not believe the cure; she believes you. The label at the top — Forwarded many times — is not a certificate of importance. It is a smoke alarm. The further a message has travelled, the less anyone in the chain knows about where it began, and the thing that began it may not be a person at all.",
      ),
      fig(
        "/images/blog/forwarded-many-times.jpg",
        "A phone screen showing a chat message marked Forwarded many times.",
        "The label is the platform counting. It is not a source. Ask what the message knows about its own birth: nothing.",
      ),
      h2("The sixty-second check"),
      p(
        "Before your finger moves, spend one minute. Read past the headline — screenshots crop, and the second paragraph often reverses the first. Search the striking phrase on the real street, in quotes; if the broadcaster truly said it, the words sit on the broadcaster's own site, not only in a status. Check the date — old riots and old deaths are resold as this morning's news every few months. Then ask the oldest question: who gains? A message built to frighten ten thousand people tonight has a landlord somewhere, even if you never learn the name. And for health, the rule is absolute: the cure that skips the hospital is a story. Ask a pharmacist you can stand in front of.",
      ),
      p(
        "If it is false, and a relative sent it, correct in private, gently, with the link: I checked — they did not say this; here is the real one. Nobody is humiliated, and the next forward is changed. If a group keeps passing poison — warnings that could cost a stranger their safety — do not forward, and know that Report exists, quietly, on every decent platform. You are not the town crier. You are the person in the chain who checks. That is a heavier kind of love than forwarding, and it is the kind that holds a community together.",
      ),
      fig(
        "/images/blog/check-the-forward.jpg",
        "A person at a desk searching on a laptop while a phone with an open chat lies beside the keyboard.",
        "The laptop checks; the phone waits; the finger rests. One minute of daylight between the message and the send button.",
      ),
      ul([
        "Before the next forward: read all of it, search the phrase, check the date. Sixty seconds.",
        "Correct one relative in private, once, with a link and without mockery. Watch what they do with the next one.",
        "For any health claim, the pharmacy first. Not the group.",
        "When a message frightens you, that is the cue to check, not to share. If the check cannot be done tonight, sleep on it.",
      ]),
      h2("Your name is the envelope"),
      p(
        "A forward travels in an envelope with your name on it, into rooms you will never sit in. Facts travel that way, and so do flames; the envelope does not choose. Check once and share what survives the check, or let the lie die in your phone, quietly, unwitnessed. A lie needs a writer once and a hundred honest fingers after that. You are only responsible for the one finger you own — but the whole chain hangs from it.",
      ),
    ],
  },
  {
    slug: "paying-for-something-online",
    title: "Paying for something online",
    excerpt:
      "The first honest purchase: pay on delivery, the padlock's honest limits, and counting your change in a market made of screens.",
    series: SERIES,
    order: 110,
    author: AUTHOR,
    date: "2026-02-10",
    cover: "/images/blog/pay-on-delivery.jpg",
    coverAlt: "A courier handing a parcel to a woman at a gate while she holds her phone.",
    body: [
      p(
        "The last chapter closed with the message that wants a fee — money flowing out to a liar. This one closes with the honest twin: paying for a real thing from a real seller, on purpose, and sleeping well after. Buying online is now a basic skill, the same class of skill as buying fuel or choosing a taxi. It is not braver than market sense. It is market sense, carried into a new market.",
      ),
      p(
        "Start where the trust is built into the building: the big marketplaces, where money is held until you confirm the parcel and pay on delivery is a choice; and official sites — the exam body, the airline, the utility — where the fee has one known amount and one known address. The vendor with fine pictures on Instagram is a different animal: a stranger with a phone. Not a criminal — a stranger. With a stranger you lend carefully. Pay on delivery, or pay a small amount first, and read what other buyers have said over months, not what the captions shout today.",
      ),
      fig(
        "/images/blog/pay-on-delivery.jpg",
        "A courier handing a parcel to a woman at a gate while she holds her phone.",
        "Pay on delivery is the market's oldest rule in new clothes: see the thing, count the money, then let go of either.",
      ),
      h2("The signs of a real shop"),
      p(
        "A real shop can be visited, or phoned, and both answers survive scrutiny: an address, a person, a returns policy in ordinary words. Its prices breathe — near the market, above the market, but not beneath it by magic. The shop selling a four-hundred-thousand-naira phone at ninety-five, today only, is the prize message in a new shirt: the discount is the fee. And the padlock beside the address means the road is private, not that the seller is honest. The padlock protects the road. It has never once protected the buyer. Only your own slowness does that.",
      ),
      p(
        "When you pay: card details go only into the shop's own checkout page, never into a chat, never read out to a caller — and the PIN goes nowhere at all, because no shop on earth needs it. A transfer is fine to a business account that carries the shop's name; be still for a moment when a market price is demanded into a personal account with a different surname. Then keep the receipt — the email, the screenshot — and when the bank alert comes, read it twice: the amount, the name, the time. Counting your change never stopped being a skill. It moved indoors.",
      ),
      fig(
        "/images/blog/checkout-padlock.jpg",
        "A laptop screen showing a checkout page with a small padlock in the address bar, a bank card resting face down beside the keyboard.",
        "The padlock means the road is private. Whether the shop at the end of the road is honest is a question the padlock has never answered.",
      ),
      ul([
        "First purchase: choose a marketplace with pay on delivery. Walk the small road before the long one.",
        "Before the price, check the address, the phone, the returns policy. In that order, every time.",
        "Card details in the checkout page only. The PIN nowhere, ever, for anyone.",
        "Keep the receipt and read the alert twice. The market's change-counting, moved indoors.",
      ]),
      h2("What arrives in your hand"),
      p(
        "When the parcel comes, open it while the delivery person stands there, if the platform allows — the size, the colour, whether the thing is the thing. If it is wrong, the app has a returns road; walk it calmly, with photographs taken the way the document lesson taught: straight, in light, all corners. Refunds take days. That is slowness, not defeat. The whole journey — the checking, the slip, the alert, the photographs — is one sentence your grandmother could have said at any market: look well before you pay, and keep the paper. The market has grown a screen. The sense crosses over intact.",
      ),
    ],
  },
  {
    slug: "bank-in-your-hand",
    title: "Your bank in your hand",
    excerpt:
      "The bank in your pocket, used with market sense: the name before the confirm, the receipt kept, the card switch found in daylight. Your money's front door, locked properly.",
    series: SERIES,
    order: 111,
    author: AUTHOR,
    date: "2026-02-15",
    cover: "/images/blog/bank-app-confirm.jpg",
    coverAlt: "A thumb pausing above a transfer confirmation button on a phone held in one hand.",
    body: [
      p(
        "Most money here never becomes notes. It moves as a message between banks, and the bank app is where the message is written. You have watched it in other people's hands for years: the queue that used to fill the banking hall now stands in a pocket. This lesson is that app, treated with the market sense you already have — because the app is a market bag, and a market bag is only as safe as the hand that closes it.",
      ),
      p(
        "Get the real one first. The app store listing shows the developer — your bank's own name, millions of downloads; the bank's own website links to it; a message a strange \"staff\" sends you on WhatsApp does neither. First open, it will ask for your account number and send a code to the SIM the account was registered with — the codes that die, arriving for a knock you started, which is the only kind worth typing. Then it asks for a PIN or password: the old rules hold. Not your birthday. Not 1234. Written in the notebook.",
      ),
      fig(
        "/images/blog/bank-app-confirm.jpg",
        "A thumb pausing above a transfer confirmation button on a phone held in one hand.",
        "The pause before the confirm is the whole lesson. The name on the screen is who receives the money — read it as slowly as you would count notes into a trader's palm.",
      ),
      h2("The name before the confirm"),
      p(
        "You type the account number; the app shows you the name attached to it. Read the name. Every time, even for your own brother — especially for your own brother, because ten digits typed in a hurry can belong to a stranger who shares two of them with him. This is the change-counting of this market. Wrong name, Cancel, type again; the app does not sulk. Right name, Confirm — and then screenshot the receipt before the screen moves on. The receipt is the teller's slip of this age, and the bank's own record is the truth of what happened, not anybody's say-so.",
      ),
      p(
        "Learn the rest of the app in daylight, while nothing is wrong. Where the statement lives — a PDF you can download for the rent, the visa, the audit of yourself. Where the card switch is: most apps carry a control that freezes your card in one tap, and the day a POS text arrives for a purchase you did not make, you want your thumb to know the road without searching. Where the beneficiary list is, so that a name you do not recognise can be deleted instead of wondered about. An app explored in peace is a vault. An app met during a crisis is a maze.",
      ),
      fig(
        "/images/blog/bank-statement-phone.jpg",
        "A man at a table reading a bank statement on his phone, a small notebook open beside him.",
        "The statement is the year's story in one PDF. Download it, keep it with the papers in Drive, and next month's questions answer themselves.",
      ),
      ul([
        "A brand-new beneficiary? Send the smallest note first, watch it land, then send the rest.",
        "Find the card freeze switch today. Practise on nothing. That is the whole drill.",
        "Keep receipts in one album named Money, and a statement in Drive with the other papers.",
        "Nobody else's thumb in the app, and the PIN is never spoken — not to staff, not to family, not to anyone.",
      ]),
      h2("When the alert is quiet"),
      p(
        "Networks delay in both directions. Money you sent and the receiver has not seen: it usually lands within minutes; check your receipt first, then wait a little, then the bank's line — the number on their own site, not one a caller gave you. Money someone claims to have sent you: believe it when your balance moves, in your own app, with the sender's name on it. An SMS tone is not a promise. A screenshot in a chat is not a promise. The balance is the promise. You learned the habit last chapter; this is where it earns its keep.",
      ),
    ],
  },
  {
    slug: "new-phone-without-losing-your-life",
    title: "A new phone without losing your life",
    excerpt:
      "Moving day is where people lose more than thieves ever take. WhatsApp backed up, the Google account carried over, and the old phone wiped like a house whose keys have found a new owner.",
    series: SERIES,
    order: 112,
    author: AUTHOR,
    date: "2026-02-20",
    cover: "/images/blog/two-phones-move.jpg",
    coverAlt: "An old phone and a new phone lying side by side on a table during a move.",
    body: [
      p(
        "A phone stopped being a telephone some years ago. It is the address book, the photograph album, the office, the bank queue, the family. And the day people change phones, they lose more than any thief has ever taken from them — not to bad luck, but to a moving day done in a hurry. This lesson is moving day, done slowly, in the right order.",
      ),
      p(
        "Begin before the new phone exists. Tonight, whatever the age of your phone: open WhatsApp, Settings, Chats, Chat backup, and back up to Google Drive — the account you made on purpose. Note the last-backup time the way you note the last time the tank was filled. Contacts: if the phone was signed into your Google account, they already live with it, safe above the flood line. Photographs: backed up or not, you will check. The backup is the whole secret. The new phone is only a faster shelf for things that already exist in two places.",
      ),
      fig(
        "/images/blog/whatsapp-backup-screen.jpg",
        "A phone showing a chat backup screen with a recent last-backup time.",
        "The little line that says when the chats last flew to safety. Check it the way you check the fuel gauge before a journey.",
      ),
      h2("The order of the day"),
      p(
        "Moving day: charge both phones fully — a move interrupted at thirty percent is its own small tragedy. The SIM moves to the new phone first, because WhatsApp will want to verify the number it already knows. Then set the new phone up, and when it asks, sign in with the same Google account: the apps come down from the store on their own, the contacts arrive like a ledger being restored. Then WhatsApp, verify, and when it offers Restore from backup — accept. The chats come back the way books come back from a shelf, all the voices in their places.",
      ),
      p(
        "Photographs last, because they are the heaviest: if the gallery was backed up to Google Photos they will drop in overnight; if not, cable the old phone to a computer and copy the camera folder the way the photographs lesson taught. Then keep the old phone whole and charged for a week — it is the attic now, and attics are not demolished while the new house is still being unpacked. Something always turns out to be missing. The attic holds it.",
      ),
      fig(
        "/images/blog/two-phones-move.jpg",
        "An old phone and a new phone lying side by side on a table during a move.",
        "Two houses, one moving day. The old one keeps nothing new; it only holds what the new one has not yet asked for.",
      ),
      ul([
        "Tonight, on the present phone: run the chat backup and look at the last-backup time. That is the whole lesson in one minute.",
        "Moving day order: SIM, Google sign-in, WhatsApp restore, gallery last.",
        "Keep the old phone untouched for a week before anything is deleted.",
        "Before selling or giving it away: remove the Google account, remove the SIM and memory card, then factory reset from Settings.",
      ]),
      h2("Wiping the old one properly"),
      p(
        "A phone sold with your accounts inside is a house handed over with keys still in the doors. Sign out of the Google account. Remove the SIM and the memory card. Then factory reset — Settings, System, Reset — and the machine returns to the afternoon it was born, empty and honest. Only then does it go to the market. The new phone will never be sentimental; it is the same ten rooms, rearranged and brighter. What mattered crossed over in the backup. That is what the backup was for.",
      ),
    ],
  },
  {
    slug: "selling-the-thing-you-own",
    title: "Selling the thing you own",
    excerpt:
      "You are the shop now: photographs that tell the truth, a price from the real market, and the one rule — money is confirmed in your own app, never by an alert's tone or a stranger's screenshot.",
    series: SERIES,
    order: 113,
    author: AUTHOR,
    date: "2026-02-23",
    cover: "/images/blog/selling-photo-item.jpg",
    coverAlt: "Hands photographing a used smartphone on a plain table in good daylight.",
    body: [
      p(
        "The buying lesson put you on the customer's side of the counter. Now you are the shop: the old phone, the generator that lost the argument, the sewing machine, the television. Selling online is ordinary trade here now, and it rewards exactly what the market rewards — a truthful face and a steady hand. The difference is that your shopfront is a photograph, and the counter is a chat.",
      ),
      p(
        "The photograph is everything. Plain table, daylight from a window, the whole item in the frame, all sides — the discipline of photographing documents, turned on property. Show the scratches. A scratch disclosed in the third photograph is a settled argument; a scratch discovered at handover is a cancelled sale and a name mentioned at night. Then price it by walking the market from your chair: what do others ask for the same thing, used, in this city? Price near them. Sentiment is a tax no buyer pays.",
      ),
      fig(
        "/images/blog/selling-photo-item.jpg",
        "Hands photographing a used smartphone on a plain table in good daylight.",
        "The shopfront. Daylight, plain ground, every side shown, every scratch confessed. Honesty is the fastest price.",
      ),
      h2("The alert that never was"),
      p(
        "Sellers are scammed more often than buyers, and always by the same play. \"I have sent the money\" — with a screenshot that was edited in an app you do not have. \"My rider will collect it and pay on delivery\" — and the rider collects for a sender who never existed. Or the overpayment: \"I sent one hundred and fifty by mistake, refund the difference\" — when nothing was ever sent. The defence is one sentence and you already own it from the bank lesson: money is confirmed in your own app, balance before, balance after, the sender's name visible. Not by a tone. Not by a screenshot. Not by politeness.",
      ),
      p(
        "For hand-to-hand sales, the old rules hold: meet in daylight where people are — a bank hall, a busy fuel station — bring a person, let the buyer inspect, and let payment complete before the item crosses. A POS slip at handover is fine; wait until the machine prints, or the transfer lands in your app. For delivered sales, the parcel moves after the money, and if the platform offers pay-on-delivery protection, that is its own honest road — walk it the way the buying lesson walked it, from the other side.",
      ),
      fig(
        "/images/blog/verify-payment-seller.jpg",
        "A man checking his bank app beside a wrapped parcel on a table, before handing it over.",
        "Balance before, balance after, the name on the line. The parcel stays on the table until the app says so.",
      ),
      ul([
        "Photograph in daylight, all sides, scratches included. Disclose everything; sell quickly.",
        "Price by the market's asking prices, not by what the item cost you new.",
        "Verify every payment in your own bank app before the item moves one inch.",
        "Meet in public in daylight, bring a person, and trust the slow careful buyer above the urgent one with a story.",
      ]),
      h2("The slow buyer is the real one"),
      p(
        "The buyer who asks small questions, haggles with respect, and pays without theatre is the market's normal human being. The urgent one — pay now, my rider is waiting, my accountant sent it already — is the exception, and exceptions in trade are called something else. Selling online is the buying lesson held to a mirror: same slowness, same receipts, same public place, same refusal of hurry. The mirror does not change the rules. It only changes whose pocket the money is flowing toward.",
      ),
    ],
  },
  {
    slug: "the-ride-that-comes-to-you",
    title: "The ride that comes to you",
    excerpt:
      "Bolt, Uber, inDrive — the street's bargaining, arranged neatly on a map. The plate, the PIN, the person told, and the driver who asks you to cancel answered politely and refused.",
    series: SERIES,
    order: 114,
    author: AUTHOR,
    date: "2026-02-28",
    cover: "/images/blog/ride-app-map.jpg",
    coverAlt: "A phone showing a ride app map with a car icon approaching along the street.",
    body: [
      p(
        "The yellow cab and the okada have grown apps. You open one, say where you are and where you are going, and a car whose name you know comes to your gate — Bolt, Uber, inDrive; the names differ, the grammar is one. The maps lesson taught you to read a map; the form lesson taught you to fill a request. This is both, holding hands, at seven in the evening in the rain. It is worth learning properly, because the ride is where the wider street most often meets the pocket.",
      ),
      p(
        "Request from indoors, while you are still behind your own gate. The app shows the car, its plate, the driver's first name, and the price before anybody moves — some apps price the trip themselves; inDrive lets you propose your own fare and choose among drivers who accept it, which is the market's bargaining, digital at last. Payment is cash or the card in the app, whichever you arranged. Then stand where you said you would stand. A ride is an appointment, and appointments are kept by both parties.",
      ),
      fig(
        "/images/blog/ride-app-map.jpg",
        "A phone showing a ride app map with a car icon approaching along the street.",
        "The car, the plate, the name, the price — all known before the gate opens. The unknown has already been interviewed.",
      ),
      h2("Before the door opens"),
      p(
        "The plate. Compare it with the app, every time, in daylight and in the dark, in a hurry and out of it. Wrong plate: a polite wave, I am waiting for another ride, and a step back behind the gate — a person who checks is difficult, and difficult is the goal. Many apps offer a PIN: the trip cannot start until the driver enters your code. Turn it on. A driver who cannot start the trip is not your driver, whatever he says through the window.",
      ),
      p(
        "Share the trip — the app sends your person a live map of you moving, which is the lantern lesson and the friend standing at the corner, both. Sit behind the driver, belt on, phone in your hand on a night ride, not buried in a bag. And when a driver says cancel the trip and we settle cash: the cancellation deletes the record, the plate you checked, the price you both agreed, and the protection that made you brave enough to enter. Refuse pleasantly. Cancel nothing. If he drives off, the app will find you another car, and you have lost nothing but a minute.",
      ),
      fig(
        "/images/blog/ride-plate-check.jpg",
        "A woman comparing a car's number plate with her phone before opening the door.",
        "Two seconds, eyes moving from glass to screen. The habit that makes every ride boring, which is what a ride should be.",
      ),
      ul([
        "Check the plate against the app before your hand touches the door. Every ride.",
        "Turn on the trip PIN, and share the trip with one person on every night journey.",
        "Never cancel-and-pay-cash. The app is the record, the price, and the protection.",
        "Left something behind? The ride history holds the driver and the trip — the fastest lost-and-found the street has ever had.",
      ]),
      h2("The map is the street"),
      p(
        "Watch the fare breathe with distance and hour, and you are reading a price that used to be argued in sweat and sunshine. Watch the route follow the map, and you are trusting a plan you can see. The ride app is the wider street at its best: the old taxi stand, tidied, priced, and carried to your gate. Gate, plate, PIN, person told. Four words, and the night road is just a road.",
      ),
    ],
  },
  {
    slug: "government-things-online",
    title: "Government things, done online",
    excerpt:
      "NIN, passports, company names: the paperwork of a Nigerian life, on screens. Finding the real gov.ng door, surviving the fakes advertised above it, and keeping every reference number.",
    series: SERIES,
    order: 115,
    author: AUTHOR,
    date: "2026-03-05",
    cover: "/images/blog/gov-portal-form.jpg",
    coverAlt: "A laptop on a desk showing an official-looking application form beside a file of documents.",
    body: [
      p(
        "The queue at the office and the queue on the portal are cousins, but only one of them is in your house. NIN slips, passport renewals, company names, tax records: the paperwork of a Nigerian life has been walking to the screen for years now, and filling a form — lesson eighteen, of all lessons — has quietly become a civic skill. This lesson is how to deal with the state online without paying anybody's cousin for the privilege.",
      ),
      p(
        "Find the real door first, because fakes are parked next to it. The official address ends in gov.ng. Check even then, and check above all the advertisements: a fake \"help centre\" will buy the top advert slot in the search results, dress itself in the agency's colours, and charge you a processing fee the agency never asked for. It is the prize message wearing a suit of flags. The safe road: type the agency's address yourself, or reach it from the agency's own verified page, then bookmark it — lesson forty-six — so that next time the door is yours, not the advertiser's.",
      ),
      fig(
        "/images/blog/gov-portal-form.jpg",
        "A laptop on a desk showing an official-looking application form beside a file of documents.",
        "The queue that is in your house. The form asks what paper used to ask; the difference is that you can read it twice before answering.",
      ),
      h2("What the portal will ask, and what it will never ask"),
      p(
        "Expect: your details typed carefully — spelling exactly as they sit on your certificate, because the papers lesson's folder is only as useful as its names are true. Your documents uploaded: the upload lesson is the whole game, size limits, the bar that must finish, the tick screenshotted. A fee, paid on the portal's own checkout — one known amount, one known page, receipted. What no portal will ever ask: your bank password, your card PIN read to a caller, or an OTP typed for a stranger who phones to help you complete your application. No agency calls you to complete anything. The email that says your application will die in twenty-four hours unless you act through this link is the hurry tell — lesson seven — wearing a government tie.",
      ),
      p(
        "Keep everything the portal gives you. The reference number is your application's name; write it in the notebook the same hour. The acknowledgement slip: print it at the café, or PDF it into the Papers folder in Drive, where the certificates already live. Check your application's status on the portal itself, not by hoping and not by paying an agent to hope on your behalf. The café earns its fee honestly here — scanner, printer, and a person who has walked this particular form before — but the portal account, the password, and the reference number remain yours alone.",
      ),
      fig(
        "/images/blog/official-papers-desk.jpg",
        "A desk with printed acknowledgement slips and a passport photograph resting on a folder of documents.",
        "The paper trail of one application: typed, uploaded, receipted, kept. The folder that answers every clerk before the question is asked.",
      ),
      ul([
        "Type the agency's address yourself and bookmark it. Ignore the adverts above the real result.",
        "Spelling exactly as on the certificate; uploads within the size; payment only on the portal's own page.",
        "Reference number into the notebook; acknowledgement slip into Drive.",
        "No agency telephones for an OTP or a fee. Hang up, and continue on the portal at your pace.",
      ]),
      h2("The queue you can see"),
      p(
        "Portals are sometimes slower than their promises, and always slower than the touts standing beside them claim. But they are visible: a status page that moves, a slip that says received, a date you can point at. Visible beats a cousin's cousin's promise every day of the year. The state is learning the screen the way you learned it — slowly, then suddenly — and every form you fill yourself, receipt and all, is one less door that needs an intermediary to open.",
      ),
    ],
  },
  {
    slug: "learning-online-mostly-free",
    title: "Learning online, mostly free",
    excerpt:
      "The classroom in your pocket, mostly free: search like a student, use pause and captions, finish one thing with your hands, and close the gap between watching and doing.",
    series: SERIES,
    order: 116,
    author: AUTHOR,
    date: "2026-03-08",
    cover: "/images/blog/youtube-tutorial-learning.jpg",
    coverAlt: "A young person watching a tutorial video on a laptop with a notebook open beside them.",
    body: [
      p(
        "Here is the open secret of this century: the classroom is already in your pocket, and most of it asks for nothing but attention and data. YouTube alone holds more teaching than any of us could sit through in a lifetime — tailoring, plumbing, Excel, the camera, the drum, the camera drone. The skill is no longer access. The skill is learning without drowning, because the flood is real: a thousand teachers, all talking, all at once.",
      ),
      p(
        "Search like a student, not a browser. Not a vague word — a subject and a level: Excel for beginners, how to sew a bodice, Photoshop for a small business. Then use the video lesson's three gifts, pause, captions, and speed, as study tools: pause where your hands should catch up, captions when the accent is new to you, speed up the parts you already own. Playlists are courses that strangers have already arranged for you, beginning to end — the shelf built, the books ordered. Sit in one for a month and you will come out different.",
      ),
      fig(
        "/images/blog/youtube-tutorial-learning.jpg",
        "A young person watching a tutorial video on a laptop with a notebook open beside them.",
        "Pause is the tutor's gift. The video waits; the notebook does not. Ten honest minutes a night, and the shelf grows by itself.",
      ),
      h2("Choosing, finishing, practising"),
      p(
        "The flood's real danger is collecting. Fifteen courses bookmarked, four apps installed, none finished — a gallery of beginnings. The cure is one subject for one month, written on paper where you sleep. And practise with your hands: the machine open beside the video, the tutorial followed step by step, the mistake made and undone — you own undo now. A video watched is a video watched. A thing practised is a skill. The gap between those two sentences is where most learners are lost, and you have crossed that gap before, on a keyboard, one honest hour at a time.",
      ),
      p(
        "Certificates: real free courses exist, and a certificate with real learning behind it opens a door or two. But an employer trusts the thing you can do in front of them more than the paper that says you once watched. So finish, then make the smallest real thing with what you learned — a poster for a shop, a spreadsheet for a church, a page for a friend's trade. And when you want a person in the room, machines to sit at, somebody to ask — that is what the academy's classes are for. These notes are the free version of the same belief: this knowledge belongs to whoever wants it.",
      ),
      fig(
        "/images/blog/phone-lesson-notes.jpg",
        "A phone propped against a book showing a paused lesson video, a notebook and pen in front of it.",
        "Data-light and honest: the lesson downloaded on Wi-Fi, the notes in your own hand. The cheapest classroom ever built.",
      ),
      ul([
        "Choose one subject for one month. Write it on paper where you sleep.",
        "Learn with your hands: machine open, pause and repeat, mistake and undo.",
        "Download what you can on Wi-Fi, at the café, before the week the data cannot carry.",
        "When the month ends, build the smallest real thing with it, and let it live where others can see it.",
      ]),
      h2("Respect the gift"),
      p(
        "A grandmother here could not have bought this shelf for any money, at any age in history, and it now sits beside her, free, in her language, mostly. The honour you pay a gift like that is to use it: close the app sometimes and do the thing with your own hands, badly at first, the way every hand in these notes was trained. Watching is the beginning. Doing is the lesson. The rest is the pause button, pressed as often as needed.",
      ),
    ],
  },
  {
    slug: "the-profile-that-finds-work",
    title: "The profile that finds work",
    excerpt:
      "The employer searches your name before the handshake. A CV in Drive, a photograph that is your face, one honest profile, and the two sentences that make an application yours.",
    series: SERIES,
    order: 117,
    author: AUTHOR,
    date: "2026-03-13",
    cover: "/images/blog/work-profile-laptop.jpg",
    coverAlt: "A laptop showing a professional profile page while a woman types at the desk.",
    body: [
      p(
        "Work checks you online before it shakes your hand. The employer, the client, the school — the first meeting now happens in a search box, and what the search returns should be you, tidy. This lesson builds the smallest respectable presence: not a performance, not a boast. A front door that has been swept, with your name correctly painted above it.",
      ),
      p(
        "Three pieces. Your CV as a PDF — the one-page honest CV from its own lesson — living in Drive, where any machine in any café can send it. Named properly: firstname-lastname-cv, not final-final2. A photograph that is your face: plain background, daylight, shoulders square — not the party crop with the sunglasses, however good the party was. And one professional profile on the network where work searches first: your name exactly as it reads on your certificates, one plain sentence saying what you do and what you want, and skills listed honestly — the things you can do today, not the things you plan to watch videos about someday.",
      ),
      fig(
        "/images/blog/work-profile-laptop.jpg",
        "A laptop showing a professional profile page while a woman types at the desk.",
        "Name, face, one sentence, true skills. A front door that is swept costs one evening and works every hour after.",
      ),
      h2("Applying through the door, not the window"),
      p(
        "The application itself is the upload lesson wearing a tie: the CV within the size limit, the bar allowed to finish, the tick screenshotted, the slip kept. It leaves from the email address that carries your name properly — the pocket lesson's account check, done before every send. And each application gets two sentences of its own: why this place, why you. A CV sprayed to ninety companies reads like a spray; the person reading knows within one line whether the letter was written to them or thrown at the wind. Two honest sentences cost four minutes and change everything.",
      ),
      p(
        "And the guard stays up, because the job listing is now a favourite costume of the old lies. A job that charges a fee is not a job — you have known that since the form lesson. The HR manager who interviews you on chat for ten minutes and needs a training kit, a file fee, a courier charge before you start is the prize message with a pay slip. Real interviews can be checked: the company's own site, the company's own address, a call you placed to a number you found yourself. Hurry, secrecy, fee — the three tells have never once retired.",
      ),
      fig(
        "/images/blog/cv-upload-portal.jpg",
        "A laptop screen showing a job application form with a CV file attached and its name visible.",
        "The door, not the window: right file, right size, the tick, the slip. And two sentences that prove a human wrote them.",
      ),
      ul([
        "CV as PDF in Drive, named firstname-lastname-cv. It can now travel anywhere in a minute.",
        "One profile, one plain photograph, skills that are true today.",
        "Two tailored sentences per application. Write them last, send them first.",
        "No fee, ever, for a job. The employer pays you; it does not charge you.",
      ]),
      h2("What the search finds, in time"),
      p(
        "The profile grows quieter work than you expect: the poster you made for the shop, the books you kept, the spreadsheet that saved the school's fees — shared deliberately, the way the sharing lesson taught, never by accident. The search for your name should end at a door you are proud to open. That is the whole of what people call personal brand: a swept front door, true words above it, and real work visible through the window.",
      ),
    ],
  },
  {
    slug: "the-voice-that-borrowed-a-face",
    title: "The voice that borrowed a face",
    excerpt:
      "A clone needs twenty seconds of somebody's voice. The family word, the callback on the known number, and the rule that survives every costume: hurry, secrecy, money — pause.",
    series: SERIES,
    order: 118,
    author: AUTHOR,
    date: "2026-03-18",
    cover: "/images/blog/suspect-voice-call.jpg",
    coverAlt: "An older man holding a phone away from his ear, looking at it with suspicion during a call.",
    body: [
      p(
        "The prize lesson's lies wore hurry and a fee. The relative-in-trouble call wore tears and a phone line. Now the machines that write like people have learned to sound like people: from a few seconds of a voice note, an ordinary laptop can build a copy of a voice — your brother's voice, your pastor's, your mother's. The crying call may have your brother's voice in it and none of your brother. This is not a story of the future. It is the current price of a voice note, and the defence has to be learned the way the links were.",
      ),
      p(
        "You will meet it in other costumes too: the celebrity on video promising to double whatever you send, the announcement with a governor's face saying what no governor said. The face and the voice were once evidence. They no longer are. What remains evidence is the channel and the question — which is why the tells are still exactly the tells you have drilled since lesson seven: hurry, secrecy, money. The costume gets better every year. The skeleton never changes.",
      ),
      fig(
        "/images/blog/suspect-voice-call.jpg",
        "An older man holding a phone away from his ear, looking at it with suspicion during a call.",
        "The voice says come quickly. The face of the man listening says: the voice is no longer the person. Hold the phone away. Think.",
      ),
      h2("The family word"),
      p(
        "One defence, cheap and total: agree on a family word. This week, at the table, in person — not in the family chat, which is the first thing a scammer reads. A word only your people know, dull enough to remember, strange enough to check. Then the rule: anybody who calls claiming to be anybody, in trouble, needing money now, is answered with one question — what is the word? A real brother knows it and laughs. A clone does not know it, and hangs up, and your money stays where it was.",
      ),
      p(
        "The second defence is the callback: end the call and dial the person yourself, on the number you already have for them — the prize lesson's rule for the relative in Dubai, now law for everybody on earth. Video calls change nothing: faces freeze, lips drift out of sync, and network excuse covers a machine's stammer. The caller who grows impatient with the verifying question has answered it. Money moves only after the word, or the callback, or both. This is not distrust. It is the chain on the door — you can love the visitor and still look through the hole first.",
      ),
      fig(
        "/images/blog/family-speakerphone.jpg",
        "A family gathered around a phone on speaker, the mother asking the caller a question while the others watch.",
        "One question, asked together, unhurried. The word is the gate, and the whole family holds its key.",
      ),
      ul([
        "Agree the family word this week — at a table, face to face, never in the group chat.",
        "Any emergency-money call: end it, and call the person back on the number you already have.",
        "A celebrity doubling money is a video, not a promise. There is no doubling.",
        "Teach the elders first. They are called more than you are, and they raised you to be this careful.",
      ]),
      h2("The lie that got cheaper"),
      p(
        "Lies used to need a writer and a hundred honest fingers, the forward lesson said. Now they need a laptop and twenty seconds of somebody's evening. Nothing new is needed in the defence, though: pause, verify on your own road, refuse the hurry. Every scam in these hundred and twenty notes is the same animal in different skins, and it has exactly one strategy — to remove the pause between the story and the money. Keep the pause and you keep everything.",
      ),
    ],
  },
  {
    slug: "cleaning-the-digital-house",
    title: "Cleaning the digital house once a year",
    excerpt:
      "Once a year, open the drawers: apps deleted, subscriptions cut, permissions revoked, the gallery backed up and pruned. The house lighter, the doors fewer, the mind quieter.",
    series: SERIES,
    order: 119,
    author: AUTHOR,
    date: "2026-03-23",
    cover: "/images/blog/uninstall-apps.jpg",
    coverAlt: "A phone screen showing several apps about to be uninstalled.",
    body: [
      p(
        "The house you live in grew drawers, and the drawers filled. The digital life does the same, more quietly: apps tried once and left installed, subscriptions charging since last year for a thing used twice, permissions granted in a hurry to games that wanted the microphone, a gallery of nine thousand photographs among which live perhaps three hundred that matter. Nothing collapses. It only gets heavier, and slower, and full of doors you forgot you owned. Once a year, open the drawers. Pick a date with a handle — your birthday week works — and sweep.",
      ),
      p(
        "The apps first: delete, do not merely tidy the icons. An unused app is a door left unlocked and a small tenant eating your data with updates — you learned the difference between installing and keeping a long time ago. Then the subscriptions, because they are the leaky roof of this house: the phone keeps the list — settings, subscriptions — every monthly charge since the week you forgot. Read it once a year and cut with joy. Two thousand naira a month, unnoticed, is a bag of rice over a year.",
      ),
      fig(
        "/images/blog/uninstall-apps.jpg",
        "A phone screen showing several apps selected to be uninstalled.",
        "The drawer, opened. Every app kept is a door; every door deleted is one less thing that can be opened in the night.",
      ),
      h2("Permissions, accounts, the gallery"),
      p(
        "Permissions next, walking the list the permissions lesson taught: the torch that wanted your contacts, the game that wanted the microphone — revoke without ceremony; the phone will not sulk, and neither will the torch. Then old accounts: the shop you bought from once, the forum from years ago. Sign out where the settings offer it, close what can be closed, and for the rest, change the password to something from the notebook — an old account on an old key is a window that floats open on its own.",
      ),
      p(
        "The gallery last, and always in this order: backup first — the cloud lesson, the papers lesson, photographs being the papers of the heart — then delete with both hands. The screenshots of last year's transfers, the seventeen blurred versions of the same moment, the bundles from group chats. Downloads too: the mat, emptied the way lesson forty-eight emptied it. Then the storage bar, which is the house's own report card, and the empty Bin, which is the last drawer. Back up, then sweep. Never the reverse.",
      ),
      fig(
        "/images/blog/subscriptions-list.jpg",
        "A phone showing a list of app subscriptions with monthly prices, a thumb pausing over one.",
        "The leaky roof, found. Every line is a small monthly rent for a room you may have stopped visiting. Read it. Cut it. Keep what earns its keep.",
      ),
      ul([
        "One date a year: apps deleted, subscriptions read and cut, permissions revoked, accounts re-keyed.",
        "Backup before any deleting. The Bin has a bottom; do not test it with the only copy of anything.",
        "Old accounts: signed out, closed, or given a new key from the notebook.",
        "When the sweep ends, note the free space and the fewer doors. Next year's sweep starts from there.",
      ]),
      h2("The lightness afterwards"),
      p(
        "People report the same two things after a clean: the phone is faster, and the mind is quieter — the slow computer lesson said a slow machine is often a full house, and the same is true of the person carrying it. The sweep takes one evening. The lightness lasts the year. And the notebook, updated during the sweep — every kept account, every new key — remains what it has always been: the key rack of the whole house, hanging by the door of the drawer.",
      ),
    ],
  },
  {
    slug: "each-one-teach-one",
    title: "Each one, teach one",
    excerpt:
      "Somebody sat beside you once, or a note did. Now you are the somebody. Teaching one person, patiently, with their hands on the machine — the skill that travels every other skill.",
    series: SERIES,
    order: 120,
    author: AUTHOR,
    date: "2026-03-26",
    cover: "/images/blog/teaching-one-learner.jpg",
    coverAlt: "A young person guiding an older woman's hand on a laptop trackpad, both smiling slightly.",
    body: [
      p(
        "Somebody sat beside you once — a cousin, a night class, or a note that talked like a person. Everything on this shelf reached you the way knowledge has always travelled on this street: not by brochure, but at a table, with one patient person and one machine. Which means there is only one lesson left, and it is not about the machine. You are now the somebody. The last skill is the first skill, handed over: teach the next person.",
      ),
      p(
        "Teach one person, not a crowd. Your mother. The neighbour's boy. The woman who sells beside your shop. A crowd watches; a person types. And the typing happens on their machine or their phone, not yours — the help lesson's rule, doubly true in teaching, because the learner who watches your hands learns only to watch. Their hands on the keys, your mouth on the names, spoken out loud the way the first sitting spoke them for you: this is the mouse; this is the pointer; this is where the work lives.",
      ),
      fig(
        "/images/blog/teaching-one-learner.jpg",
        "A young person guiding an older woman's hand on a laptop trackpad, both smiling slightly.",
        "Their hand, your patience, one machine between you. The lesson is not finished until their hand moves without yours on it.",
      ),
      h2("The patience contract"),
      p(
        "You will be asked what you now consider obvious. The question is not the problem; the sigh is. Obvious only means already-taught — somebody paid for your obvious with an afternoon once, and this is the change coming back. Answer as if the question were interesting, because to the asker it is the most interesting thing in the room. Then stop while it is still pleasant: ten honest minutes, the keyboard lesson's own rule, because a learner made tired tonight does not come back tomorrow, and tomorrow is the whole plan.",
      ),
      p(
        "Teach the names and the habits, not the tricks. The password rules. The pause before a link. The name read before the confirm. The backup before the sweep. Tricks fill a week; habits fill a life — a person who knows why they sign out of a machine that is not theirs does not need you beside the next machine, and that independence is the graduation. A person taught to copy you needs you forever. A person taught the reasons needs you once.",
      ),
      fig(
        "/images/blog/small-class-laptop.jpg",
        "Three learners around one laptop in a modest training room, one pointing at the screen while the others lean in.",
        "The one became three, the way it always does. One machine, one table, one hour — the academy's whole arithmetic.",
      ),
      ul([
        "Choose one person this month. Sit them down at a machine that is theirs to touch.",
        "Teach the five first: power, pointer, keys, files, and the pause before links.",
        "Lend them these notes — the shelf is free, and it reads like a person sitting beside them, because that is what it is.",
        "Teach the teacher too: show them how to sit somebody else down, and your single hour doubles every year.",
      ]),
      h2("The shelf, and the door"),
      p(
        "One hundred and twenty notes now. The sitting, the files, the letter, the grid, the phone, the locks, the street, and the hand that passes it on. They were written as class notes for rooms in Port Harcourt, and they belong to whoever needs them — forward them, print them, read them aloud to a person who reads slowly. The computer was never the point. The point was always this: another person who can open the door without fear, and hold it open behind them. Go and be somebody's quiet hour. The shelf will hold.",
      ),
    ],
  },
  {
    slug: "the-cybersecurity-analyst-at-work",
    title: "The cybersecurity analyst, at work",
    excerpt:
      "Somebody is paid to sit on the other side of everything these notes taught you — watching, triaging, asking who knocked. What the job actually is, and how a person walks into it.",
    series: SERIES,
    order: 121,
    author: AUTHOR,
    date: "2026-03-30",
    cover: "/images/blog/analyst-monitor-grid.jpg",
    coverAlt: "A young analyst at a desk with two screens showing lists of security alerts.",
    body: [
      p(
        "Everything on this shelf has a shadow profession. The OTP lesson, the fake link, the prize that wants a fee — on the other side of each of those sits a person employed to notice: to watch the doors of an organisation the way you learned to watch your own. That person is the cybersecurity analyst, and it is the most common front door into security work anywhere in the world. This chapter of notes opens that door and describes the rooms, because many of you asked what all this care can become.",
      ),
      p(
        "The day, honestly described, is triage. The analyst sits before a queue of alerts — a machine flagged a login from two countries in one hour; a staff member reported an email that smells like the link lesson; a laptop began talking to an address no list can explain. Each alert is a knock. Most knocks are wind: a traveller's VPN, a marketing tool nobody registered, a user who mistyped a password twenty times. The analyst's craft is telling wind from footfalls quickly — checking logs, asking the machine's own records what happened, closing the innocent, and escalating the real ones to people who can pull a cable or reset a kingdom.",
      ),
      fig(
        "/images/blog/analyst-monitor-grid.jpg",
        "A young analyst at a desk with two screens showing lists of security alerts.",
        "The queue of knocks, in order of loudness. The craft is not staring at screens; it is deciding, alert by alert, wind or footfall.",
      ),
      h2("What the work actually asks of a person"),
      p(
        "Not a genius. Curiosity that survives repetition, the patience to read a log the way a nurse reads a chart, and calm — because the day the real incident arrives, the room needs a person who writes the time down. The technical floor is lower than people fear: you must know how computers and networks speak — the rooms, the roads, the logs — and then the watching tools, which the next few lessons name. What cannot be taught later is the disposition these notes have been drilling since lesson six: refuse hurry, verify the channel, write things down.",
      ),
      p(
        "How a person walks in, from this shelf: the basics you now own, then networking properly, then the security tools, then a first role — often watching and triaging, night shifts included, because attacks keep office hours in every time zone at once. In Nigeria, the ladder is real but the bigger room is remote: an analyst in Port Harcourt with clean fundamentals and honest English can watch doors for a company in Europe or America, paid in the currency of those doors. Certificates open interviews later; the fundamentals open everything first. That is the honest order, and any path that skips it is selling you the certificate's shine.",
      ),
      fig(
        "/images/blog/analyst-notes-desk.jpg",
        "A notebook beside a keyboard, with times and notes written in it during a shift.",
        "The analyst's oldest tool. Alerts fade from screens; the written time, the written address, the written decision — those survive the meeting after.",
      ),
      ul([
        "Re-read your own notes on links, OTPs and passwords as a professional would: each is a lesson in the attacker's choreography.",
        "Learn what a log is — any record a machine keeps of who did what, when. The next three lessons are built on them.",
        "Follow one reputable security news source for a month. Vocabulary before tools, always.",
        "If this room pulls at you, say so at the academy. The road from these notes to the watching chair is mapped, and people have walked it.",
      ]),
      h2("Why this job exists at all"),
      p(
        "Because every organisation now keeps its most valuable things in machines, and machines keep honest records of every visitor. Somebody must read those records the way a bank reconciles its till. That is the whole profession in one sentence: reading the records, noticing the visitor who does not reconcile. If you have ever caught yourself re-checking a locked door, you have already felt the shape of the work. The next lesson is the room they watch from.",
      ),
    ],
  },
  {
    slug: "the-soc-room",
    title: "The room that never sleeps: the SOC",
    excerpt:
      "You will hear people say they work in a SOC. Here is the room, the tiers, the shifts — the place where the watching profession actually sits, explained without the mystique.",
    series: SERIES,
    order: 122,
    author: AUTHOR,
    date: "2026-04-04",
    cover: "/images/blog/soc-room-screens.jpg",
    coverAlt: "A dim room with a wall of monitors showing maps and dashboards, two analysts at desks.",
    body: [
      p(
        "Say SOC aloud — it is said letter by letter, S-O-C — and know that it means only this: a Security Operations Centre. A room, physical or virtual, where an organisation's security watching is gathered under one roof and one rhythm. If you met the letters in a chat or a job group and could not tell what they meant, hold this meaning and you will rarely be wrong: in working talk, SOC is not slang — it is an acronym with a chair behind it, the watching room. Banks have them. Telcos have them. Some companies do not build their own and instead pay a specialist firm to watch for them, which is called an MSSP, and the analysts inside it watch many doors at once. When a job advert says the role is in a SOC, this is the furniture of that sentence.",
      ),
      p(
        "Walk through it, in imagination. A dim room — dim because screens read better in dimness — a wall of displays: a map with dots, a queue of alerts, a chart breathing with the network's traffic. At desks, people in tiers. Tier one sits closest to the queue: the first watch, triaging knocks exactly as the last lesson described, closing wind, raising footfalls. Tier two takes what tier one raises and digs — pulling logs from more rooms, tracing where a thing came from, deciding how sick the machine is. Tier three and the engineers hunt what nobody flagged and build the rules that make the queue wiser. Behind them, an incident manager when the night turns serious: one voice deciding, so ten hands do not pull ten directions.",
      ),
      fig(
        "/images/blog/soc-room-screens.jpg",
        "A dim room with a wall of monitors showing maps and dashboards, two analysts at desks.",
        "The theatre is real but the work is queues and notes. The wall is for the room's shared breath; the craft sits at the desks.",
      ),
      h2("Shifts, nights, and the shape of the day"),
      p(
        "Because the internet does not close, the SOC does not close. Analysts work in shifts — days, evenings, nights, rotating — and the night shift is where juniors famously begin, watching while the country sleeps and the probes continue. A shift has its own spine: handover notes read like a relay baton — what happened on the last watch, what is still open, what to keep an eye on; then the queue; then the small projects between knocks, tuning a rule, writing a note that makes tomorrow faster. It is shift work the way nursing is shift work: routine punctuated by genuine emergencies, and measured mostly by whether you noticed in time.",
      ),
      p(
        "What the room watches with is named across the next two lessons: the SIEM — the giant ledger that collects every machine's records and raises the queue — and the checks and scans that keep the fence honest. Do not let the acronyms intimidate the picture. The SOC is this: one room, one ledger, one queue of knocks, and people in tiers deciding wind from footfall, all night, every night, in shifts. Everything else is furniture.",
      ),
      fig(
        "/images/blog/soc-night-shift.jpg",
        "An analyst on night shift, headset on, the dark room lit only by the desk screens, a mug nearby.",
        "The 2 a.m. watch. The city sleeps; the queue does not. Handover notes at dawn carry the baton to the morning tier.",
      ),
      ul([
        "When you see SOC in an advert, read it as: shift work, tiers, triage first. Adjust your expectations honestly.",
        "Night shifts are an entry, not a sentence. Learn the queue by night, grow into the hunt by day.",
        "The handover note is a craft. practise writing one clear paragraph about one alert.",
        "Every habit these notes taught — patience, notes, channel-checking — is SOC temperament in civilian clothes.",
      ]),
      h2("Is the room for you?"),
      p(
        "If you loved the locking lessons — if the second lock felt like a puzzle you would happily own — the SOC will feel like home with a salary. If you need quiet and long unhurried building, say, making things rather than watching for their breakers — then the developer rooms later in this chapter will fit better, and nobody should pretend otherwise. Security watching is a temperament before it is a career. The shelf is wide. Walk it with your eyes open.",
      ),
    ],
  },
  {
    slug: "siem-in-ordinary-words",
    title: "SIEM, in ordinary words",
    excerpt:
      "SIEM — said like seam — is the ledger that collects what every machine saw, and shouts when the pieces make a pattern. The tool at the heart of every watching room, demystified.",
    series: SERIES,
    order: 123,
    author: AUTHOR,
    date: "2026-04-09",
    cover: "/images/blog/siem-dashboard-alerts.jpg",
    coverAlt: "A computer screen showing a dashboard of stacked alerts and a rising line graph.",
    body: [
      p(
        "SIEM stands for Security Information and Event Management, and is said like seam. Behind the press of consonants is a humble idea: one giant ledger. Every computer, door system, bank app and office machine keeps a record of what happens on it — the log, a line of who did what, when, from where. A SIEM is the room where all those records from all those machines are gathered into one place, laid side by side by time, and watched by rules. Nothing more exotic than that: a notebook that reads every other notebook.",
      ),
      p(
        "Why one ledger? Because a thief's footfalls rarely land in a single notebook. The failed password sits in one log, the unusual login in another, the strange file copy in a third — each innocent alone, each a sentence of a story when laid side by side. Alone, no machine shouts. Together, the pattern is loud. The SIEM's whole craft is correlation: rules that say, if these three quiet things happen within one hour, that is not quiet any more — raise it. What it raises is the alert, and the alert is the queue the analyst eats from. The tool most connected to it: the names you will meet in adverts are Splunk, Microsoft Sentinel, QRadar, Wazuh — different pens for the same ledger.",
      ),
      fig(
        "/images/blog/siem-dashboard-alerts.jpg",
        "A computer screen showing a dashboard of stacked alerts and a rising line graph.",
        "The ledger's face: what was raised, how loud, when it began. Every tile is a sentence assembled from a hundred notebooks.",
      ),
      h2("What feeding the ledger actually looks like"),
      p(
        "Log lines are boring on purpose — that is their honesty. A typical one says: this user, from this address, at this second, tried this door, and it failed. A thousand machines write such lines every second, and the SIEM drinks them without blinking. The analyst's skill against this flood is search: asking the ledger, in its own query language, show me every login for this user today; show me everything that talked to this address this week. It is less programming than good questioning — the Ctrl and F lesson grown into a profession. If you can form a precise question, the ledger answers in seconds with the truth of a hundred rooms.",
      ),
      p(
        "And the ledger needs tending, which is a career in itself. Rules that raise everything bury the room in noise, and a tired room misses the real shout — so somebody tunes: closes the rules that cry wolf, sharpens the ones that matter. Somebody wires new machines into the ledger, because a room whose logs never arrived is a room watched by memory alone. And somebody checks the ledger itself is sealed — a thief who can edit the notebook owns the story it tells. Feeding, tuning, sealing: the three honest jobs around one giant notebook.",
      ),
      fig(
        "/images/blog/siem-log-lines.jpg",
        "A screen filled with dense rows of log lines, one row highlighted.",
        "A hundred notebooks, one page. Boring lines, honest lines — and one highlighted row that only makes sense beside its neighbours.",
      ),
      ul([
        "Say it until it is yours: SIEM, like seam — the giant ledger that correlates and raises.",
        "Understand the chain by heart: logs from machines, rules in the ledger, alerts in the queue, analyst at the desk.",
        "Play with any free log-search tool for one evening. Form three precise questions and watch the ledger answer.",
        "Remember the weakness that matters: a ledger whose sources are missing or editable protects nobody.",
      ]),
      h2("Why this word follows you"),
      p(
        "Because every watching room on earth stands on one. Job adverts for analysts assume you have stood beside a SIEM; interviews ask how you would hunt in one. But the idea, as you now hold it, is a village idea: every compound keeps records; one trusted house collects them each evening; when a pattern crosses compounds, the crier raises it, and the watchers decide. You have just understood what universities wrap in an acronym. The next lesson is the philosophy the whole room increasingly watches by — and it begins at a gate.",
      ),
    ],
  },
  {
    slug: "zero-trust-gate",
    title: "Zero trust: the gate that trusts nobody",
    excerpt:
      "What is zero trust security? The old walls trusted whoever was inside. Zero trust trusts nobody — every knock, every time, identity and device both checked. You already carry its front door in your pocket.",
    series: SERIES,
    order: 124,
    author: AUTHOR,
    date: "2026-04-14",
    cover: "/images/blog/zero-trust-gate-check.jpg",
    coverAlt: "A security guard checking a visitor's identity card at a compound gate.",
    body: [
      p(
        "What is zero trust security? Strip the phrase of marketing and it is one sentence: never trust, always verify. A security way of building — and running — an organisation on the belief that nobody is trusted by where they sit, only by what they can prove, every time they knock. Not once at the gate in the morning. Every door, every hour, every request. The phrase arrived from the industry's own confession: the old way assumed the thief was outside the walls, and the thief kept getting in and walking the corridors freely, because inside was trusted.",
      ),
      p(
        "Picture the two arrangements. The old compound: one strong gate, and inside it every inner door open to anyone wearing a staff lanyard — because the gate already checked them, did it not? One cloned lanyard, and a visitor owns the corridors. The zero-trust compound: the same strong gate, and then every inner door checks again — who are you, prove it; what device is this, is it the one we issued, is it healthy; and even then, this door opens only as far as your work requires, not one room further. The guest with the right lanyard is still checked at accounting's door, and accounting's door does not open into the vault. Nobody is trusted for where they are. Everybody is verified for what they prove.",
      ),
      fig(
        "/images/blog/zero-trust-gate-check.jpg",
        "A security guard checking a visitor's identity card at a compound gate.",
        "The gate is necessary and insufficient. Zero trust is the guard at every inner door, politely asking again — every time.",
      ),
      h2("The pieces, named plainly"),
      p(
        "Three habits hold it up. Strong identity: every person and every machine has a provable self — and the second lock, the one on your Google account, is zero trust's smallest citizen; multi-factor verification is its signature move. Least privilege: each person holds exactly the keys their work needs, no more — the gateman does not carry the cashier's keys, and the accountant cannot open the server room. And small rooms: the organisation is divided so that a thief in one room does not inherit the building — the corridor that once connected everything is replaced by checked doors. The industry formalised this in documents like NIST SP 800-207, but you have just held the whole idea; the documents only add the plumbing.",
      ),
      p(
        "You have met the philosophy already, wearing everyday clothes. The bank app that asks for the code even after the password: zero trust. The laptop that re-verifies before opening payroll: zero trust. The second lock you put on your own account at lesson one hundred and eight — you ran a zero-trust policy on your own life before most companies did. The stakes scale; the sentence does not. Trust is never granted by location or history. It is earned by proof, freshly, at every door.",
      ),
      fig(
        "/images/blog/zero-trust-doors.jpg",
        "A corridor of office doors, each fitted with a small card reader, one glowing as a staff member taps.",
        "Every door a checkpoint, every checkpoint a fresh question. Inside the building is not inside the trust.",
      ),
      ul([
        "Say the sentence until it is yours: never trust, always verify — every user, every device, every request.",
        "Audit your own compound tonight: which accounts hold more keys than their work needs? Least privilege begins at home.",
        "Your second lock is your first zero trust. Notice every re-verification this week with new respect.",
        "In interviews, the question what is zero trust is answered in one sentence and three habits: identity, least privilege, small rooms.",
      ]),
      h2("Why the whole industry turned"),
      p(
        "Because the walls stopped meaning anything. Staff work from cafés and sitting rooms now; the company's jewels sit in rented buildings run by other companies; and the thief stopped pickpocketing lanyards and started logging in. When the perimeter dissolved, the only honest place to draw the line was around each request: prove, every time. That is why the phrase follows every security job advert now, and why the watching rooms of the last lessons are rebuilding their rules around it. The gate keeper's oldest wisdom, promoted to architecture: trust the person, not the lanyard — and check the person, freshly, every time.",
      ),
    ],
  },
  {
    slug: "vulnerability-assessment-fence",
    title: "The vulnerability assessment: checking the fence",
    excerpt:
      "A vulnerability assessment is the systematic walk around your own walls before thieves do it for you — find the weak boards, rank them, fix the loudest first. Here is the honest method.",
    series: SERIES,
    order: 125,
    author: AUTHOR,
    date: "2026-04-17",
    cover: "/images/blog/fence-check-flashlight.jpg",
    coverAlt: "A man inspecting a compound fence with a torch at dusk, looking for weak points.",
    body: [
      p(
        "A vulnerability is a weakness in a wall that still stands: the loose board in the fence, the window the bar removed, the lock that turns with any key of its brand. Every organisation is such a compound, and its walls — computers, programs, doors, people — carry weaknesses nobody has counted. A vulnerability assessment is the disciplined count: walk your own fence deliberately, in daylight, with a list, and find what a thief would find at night. Not paranoia. Maintenance. The same instinct as checking the generator before the wedding, and it answers the question every owner should be able to answer: where exactly are we weak?",
      ),
      p(
        "The walk has a shape. First, count what you own — every machine, app, and account; you cannot check a fence you have not listed, and the forgotten door is every compound's favourite entrance. Then scan: tools run against the list, knocking on known weaknesses the way a mechanic's diagnostic machine queries an engine — thousands of known weaknesses, checked in minutes. Then the human pass, because tools miss what eyes catch: the password on a sticky note, the software that stopped receiving updates, the server room held shut with tape. The result is a report — not a shaming, an inventory: this weakness, here, this severe, this loud, fix it this way.",
      ),
      fig(
        "/images/blog/fence-check-flashlight.jpg",
        "A man inspecting a compound fence with a torch at dusk, looking for weak points.",
        "The owner's walk, done before dark. Every weakness found in daylight is one the night visitor does not get to introduce himself to.",
      ),
      h2("Ranking the holes: not all silence is equal"),
      p(
        "A compound always has several weaknesses at once; money and hours are finite; so the report ranks. Severity scoring — the industry's CVSS numbers, zero to ten — is triage at a clinic: the bleeding patient first, the stubborn cough after. A weakness that lets a stranger in without any key outranks one that needs the janitor's help, an open office, and good luck. The discipline the good assessors bring is honesty about exposure: a hole in the fence facing the market street is a different animal from the same hole facing the lagoon. Fix the loudest, then the next, then the next — and re-scan, because walls do not stay mended by one speech.",
      ),
      p(
        "Two words people confuse, cleared now: the assessment is the inspection — systematic, listed, non-destructive; a penetration test goes further and hires the lockpicker — one weakness, chosen with permission, exploited to prove how far it opens. Inspection first, lockpicker second, always. And for the small businesses reading this over a shoulder: the walk scales down beautifully. List your doors — the phones, the laptops, the email, that one app the whole shop runs on. Update everything the update lesson taught you to update. Turn on the second lock everywhere it exists. Change the defaults the installer left. You have just done the small business version, and most of your competitors have not.",
      ),
      fig(
        "/images/blog/scan-report-paper.jpg",
        "A printed report on a desk, its severity table showing rows of findings ranked with coloured marks.",
        "The count, on paper: each weakness named, ranked, and given a fix. The document is not the harvest; the repairs are.",
      ),
      ul([
        "List what you own — machines, apps, accounts — before you scan anything. The unlisted door is the common door.",
        "Scan with a reputable tool, then walk with your own eyes. Tools count, humans understand.",
        "Rank by severity and exposure. Fix the bleeding first; keep the receipts of every repair.",
        "Re-walk the fence on a calendar, not on a mood. Walls drift; the walk is maintenance, not an event.",
      ]),
      h2("The fence, the room, the ledger"),
      p(
        "See how the profession knits: the assessment finds the weak boards; zero trust builds inner doors so one board cannot cost the building; the SOC and its SIEM watch the fence between walks, because thieves do not wait for reports. Nothing mystical anywhere — just owners who count their own weaknesses before somebody else does it for them, at night, without permission. The next lesson steps back from the compound to the roads that connect every compound: the grammar the whole internet speaks.",
      ),
    ],
  },
  {
    slug: "tcp-ip-road",
    title: "TCP/IP: how the road carries the mail",
    excerpt:
      "TCP/IP is the shared grammar of the internet — a long letter torn into numbered parcels, each finding its own road, reassembled at the door. One lesson to never fear the word again.",
    series: SERIES,
    order: 126,
    author: AUTHOR,
    date: "2026-04-22",
    cover: "/images/blog/tcp-parcels-road.jpg",
    coverAlt: "Small numbered parcels travelling along a road toward a house in warm evening light.",
    body: [
      p(
        "When two computers anywhere on earth speak — the phone and the bank, the laptop and this page — they speak TCP/IP. The name is a hyphenated pair: IP, Internet Protocol, and TCP, Transmission Control Protocol. The first says where; the second says how. Strip the syllables and hold the picture: a post office that never loses a letter if the roads survive, run on two rules — every house has an address, and every letter is sent as numbered parcels that may take different roads and arrive in any order, to be reassembled at the door.",
      ),
      p(
        "IP is the addressing half. Every machine on the network carries an IP address — four numbers, like 172.16.4.1 in the older scheme — its house number on the world's roads. Your phone has one on your network at home; the bank's computer has one on the world's; every parcel of every letter is stamped from and to, and the routers — the junctions of this postal system — pass each parcel road by road, choosing the open street at each junction the way a okada rider weaves a flood. TCP is the manners half: before any letter moves, the two houses have a small conversation — are you there? I am. Then I will send — the handshake, three knocks, and the line is agreed. Then the long letter is torn into parcels, each numbered — 3 of 40, 4 of 40 — so the receiving door can stack them back into the letter, request the missing 7 again, and know exactly what arrived intact.",
      ),
      fig(
        "/images/blog/tcp-parcels-road.jpg",
        "Small numbered parcels travelling along a road toward a house in warm evening light.",
        "The letter did not travel as a letter. It travelled as numbered parcels on several roads, and the door reassembled it. That is TCP/IP, whole.",
      ),
      h2("Doors on the house: ports"),
      p(
        "One computer is one house, but a house does many businesses at once — web, mail, banking app, all arriving together. So each house numbers its doors: these are ports. Port 80 and its locked cousin 443 are where web pages are received — the padlock in your address bar is a padlock on port 443's road. Mail knocks on its own numbered doors; a video call on another. The address finds the house; the port finds the room inside the house. When an advert for the analyst jobs of this chapter says knowledge of TCP/IP, this is the entire requirement's spine: addresses, parcels, handshake, reassembly, ports.",
      ),
      p(
        "Why does a learner who is not chasing those jobs care? Because half of every machine trouble in your life has been a road question wearing a mystery's clothes. The internet is down: which floor broke — the app, the Wi-Fi, the router, the street, or the far house itself? The page will not load but WhatsApp lives: that is not contradiction, that is different roads and different far houses. The bank app times out on the climb up the hill: the parcels are dying between junctions, and no amount of closing and reopening the app repairs a road. Diagnosing by floor — app, house, street, far house — is the ordinary superpower this grammar buys, and you now own the map it stands on.",
      ),
      fig(
        "/images/blog/network-cables-router.jpg",
        "A router on a shelf with two cables running into it, its small lights blinking.",
        "The house's own postal junction. The lights are the parcels passing — and the first thing the road diagnosis looks at.",
      ),
      ul([
        "Say the pair until it separates: IP is the address, TCP is the manners. Where, then how.",
        "Name the five floors of any internet trouble out loud once: app, house, router, street, far house.",
        "Watch your own browser's padlock with new eyes: that is port 443, the locked road, working.",
        "When a job advert says TCP/IP, you may now nod instead of flinching. That is the whole point of this lesson.",
      ]),
      h2("The grammar under everything"),
      p(
        "Every lesson on this shelf rode these roads without naming them: the email lesson, the cloud, the ride map, the bank in your hand. Named now, they lose their last fog — the internet is houses with addresses, roads with junctions, letters as parcels, doors numbered by business. Everything the analysts watch travels these roads; everything the builders build travels them; the padlock, the update, the second lock — all of it is traffic on TCP/IP. One grammar, learned once, used for the rest of the connected life. The next lesson stays with the mail, and asks what it means when a letter must carry proof of who sealed it.",
      ),
    ],
  },
  {
    slug: "digital-signature-meaning",
    title: "What a digital signature really signs",
    excerpt:
      "A digital signature is not a picture of your name. It is arithmetic that proves who sealed a document and that nobody has touched it since. The padlock's cousin, explained.",
    series: SERIES,
    order: 127,
    author: AUTHOR,
    date: "2026-04-27",
    cover: "/images/blog/signing-document-seal.jpg",
    coverAlt: "A hand signing a document with a pen beside a laptop showing a digital signing screen.",
    body: [
      p(
        "What is a digital signature? First, what it is not: not a photograph of your wet-ink name dropped onto a page — that is an electronic signature at its weakest, a picture, and a picture copies. A digital signature is arithmetic: a seal computed from the document itself with a key only you hold, such that changing a single comma breaks the seal's mathematics and tells every later reader the page has been touched. It answers three questions at once, and answers them with proofs rather than manners: who sealed this; has it been altered since; and can the sealer later deny it. That third answer is why contracts, banks and governments moved: the seal cannot be unworn.",
      ),
      p(
        "The machinery is two keys born as a pair. Your private key — long numbers stored on your machine or a bank-grade token — you never show anybody; it seals. Its public key you publish freely; it verifies. Seal with the private, verify with the public: the mathematics runs one way down that street and no other. And the seal is computed not on the whole document but on its fingerprint — a hash, one fixed-length number that any document produces and from which the document cannot be reconstructed, but which changes entirely if a comma changes. So the signature says: the holder of the private key sealed this fingerprint. New fingerprint at the receiving door means the page is not the page that was sealed, and the seal itself says so, loudly.",
      ),
      fig(
        "/images/blog/signing-document-seal.jpg",
        "A hand signing a document with a pen beside a laptop showing a digital signing screen.",
        "The two signatures of one life. The ink commits the person; the arithmetic commits the page — and the arithmetic cannot be photocopied.",
      ),
      h2("Who vouches for the key?"),
      p(
        "One hole remains, and the old city solved it with guilds: anyone can claim a key is theirs — so somebody trusted must vouch. A certificate authority is that vouching office for keys: it checks that the person or company asking, is who they say, and issues a certificate binding the public key to the name — the passport office of the key world. The whole arrangement — keys, certificates, the offices that vouch — carries one industry name: public key infrastructure, or PKI. If you have met the letters in an advert or a chat and found them cold, they only ever meant this warm idea: the guild that makes a stranger's key believable. Your browser carries the list of offices it trusts, which is why the padlock in the address bar — lesson one hundred and ten — means more than a locked road: the site's key was vouched for, the road is sealed, and the seal is checked at your door every visit. The padlock is a digital signature, shown to you a thousand times a day, finally introduced.",
      ),
      p(
        "You will meet the seal in ordinary places now that it has a name. The updates lesson: good software arrives signed, and the machine refuses what the key does not vouch — that refusal is the update box doing its quiet work. The papers lesson: platforms offer signing so a contract can cross the world with its proof attached. And in the analyst's world of this chapter, signatures decide which program may speak and which document may be believed. Three promises in one seal — who, untouched, irrevocable — and each promise is arithmetic rather than good manners. That is the whole meaning, and you now carry it correctly.",
      ),
      fig(
        "/images/blog/certificate-padlock-detail.jpg",
        "A close view of a browser address bar, the small padlock glowing, screen slightly soft.",
        "The seal you have met a thousand times. The padlock says: vouched key, sealed road, checked at your door. Now you can read it.",
      ),
      ul([
        "Say the three promises: who sealed it, untouched since, cannot be denied. That is the definition, whole.",
        "Private key seals, public key verifies, the authority vouches for the pairing. Three sentences to keep for life.",
        "Treat your private keys as the notebook's crown jewels: backed up like the papers, shared like the PIN — never.",
        "A scanned signature photo is a picture. A digital signature is a proof. Ask which one a form truly requires.",
      ]),
      h2("Trust, at last, in arithmetic"),
      p(
        "The whole shelf has been one long lesson in verification: check the name before the confirm, the channel before the code, the plate before the door. The digital signature is where that instinct became mathematics — proof that does not tire, does not flatter, and does not forget what it sealed. From here, whenever somebody says signed, you will know to ask: sealed by whose key, vouched by whose office, verified at which door. The next lesson crosses the compound wall entirely, to the people who build the things all this security watches over.",
      ),
    ],
  },
  {
    slug: "frontend-developer-explained",
    title: "The frontend developer, explained",
    excerpt:
      "The frontend developer builds everything you have ever touched on a screen — the stall that faces the road. What the work is, what the words mean, and how this shelf is already the first step.",
    series: SERIES,
    order: 128,
    author: AUTHOR,
    date: "2026-04-30",
    cover: "/images/blog/frontend-code-screen.jpg",
    coverAlt: "A developer at a laptop with code on one half of the screen and a webpage on the other.",
    body: [
      p(
        "Everything you have ever touched on a screen — every button that pressed, every form that received your details, every page that arranged itself politely on the phone and the laptop — was built by a frontend developer. The word means simply the front: the part of a program that faces the person using it. Every workshop has a front and a back — the stall that faces the road, and the store room where the stock and the accounts live. The frontend is the stall. It decides whether the customer can find what they came for, whether the price is readable in the sun, whether the transaction finishes or the customer walks in irritation.",
      ),
      p(
        "The craft stands on three layers, and you may as well have their true names now. HTML is the skeleton: this is a heading, this is a paragraph, this is the box where the customer types. CSS is the clothing: colours, spacing, what it looks like when the screen is a small phone in the rain or a wide monitor in an office. JavaScript is the movement: what happens when the button is pressed — the menu that opens, the total that recalculates, the form that checks itself before travelling. Larger buildings are raised with frameworks — prepared skeletons and conventions with names like React, the very technology this page is served with — the way builders raise estates with prefabricated parts instead of moulding every brick by hand.",
      ),
      fig(
        "/images/blog/frontend-code-screen.jpg",
        "A developer at a laptop with code on one half of the screen and a webpage on the other.",
        "The stall and its plans, side by side. Change a line, refresh, look again — the frontend's whole rhythm is that small honest loop.",
      ),
      h2("What the work actually is, day to day"),
      p(
        "Less invention than conversation. A designer hands over a picture of what a page should be; the frontend developer makes it real, exactly, on every screen size — and reports back where the picture fights the truth of small screens and slow networks. A backend — the store room, staffed by its own developers — sends goods in parcels of data; the frontend receives, arranges, and sends back what the customer filled. Much of the day is the two elders of this shelf in professional clothes: careful text selection and a thousand small saves — build one piece, look at it in the browser, adjust, save again. The loop you practised in Notepad at lesson three is, genuinely, the trade.",
      ),
      p(
        "The good ones are good in ways you can already judge, because you have been a customer all your life on this shelf. Fast: a page that opens on a three-bar network in Onitsha traffic, not only on office fibre. Clear: letters that read, buttons that say what they do, forms that confess their errors in ordinary sentences. Honest on every screen: the phone is Nigeria's computer, and a stall that only stands on a laptop is a stall on a street with no foot traffic. None of that is decoration — it is the trade's version of the virtues these notes kept repeating: respect for the person on the other side of the screen.",
      ),
      fig(
        "/images/blog/phone-and-desktop-layout.jpg",
        "A phone and a laptop on a desk showing the same webpage arranged differently for each screen.",
        "One stall, two streets. The craft is making the same shop stand properly on the pocket and on the desk.",
      ),
      ul([
        "Look at any page you admire and name its three layers: the skeleton, the clothing, the movement.",
        "View the source of a simple page once — right-click, View page source. The skeleton, in public, is not a secret.",
        "The free-learning lesson applies in full: one month, HTML and CSS, hands on the keys, one real page built by the end.",
        "When you are ready for a room, a machine and a person, the academy's web courses start exactly where this note stops.",
      ]),
      h2("Is the stall for you?"),
      p(
        "If you finished lesson three secretly pleased — if arranging the page, naming things properly and seeing your change appear on refresh gave you a small honest joy — then the frontend is a door worth walking through, and the road from these notes to paid work in it is walked every year, self-taught hands included. The watching rooms of lesson one hundred and twenty-two guard the compound; the stall builders raise what the compound is for. Both are honest work. Only you know which chair fits your temperament — and now you have sat in both, described without mystique, before spending a naira on either.",
      ),
    ],
  },
  {
    slug: "machine-learning-engineer-work",
    title: "What a machine learning engineer does",
    excerpt:
      "A machine learning engineer teaches machines by example instead of instruction — and spends most of the working day cleaning the examples. What the work is, and what it honestly pays.",
    series: SERIES,
    order: 129,
    author: AUTHOR,
    date: "2026-05-05",
    cover: "/images/blog/ml-engineer-whiteboard.jpg",
    coverAlt: "An engineer at a whiteboard covered in diagrams, a laptop open beside them.",
    body: [
      p(
        "Every program you have met on this shelf was instructed: a person wrote the rules — if the password is wrong three times, lock; if the balance is less than the withdrawal, refuse. A machine learning engineer builds programs the other way round: instead of writing rules, they show the machine examples and let it find the rules. Ten thousand past transactions marked honest and fraudulent, shown again and again, until the machine can face an eleventh transaction it has never seen and answer with its own judgement. That is machine learning — teaching by example — and the machine learning engineer is the teacher who prepares the lessons, runs the classes, and checks the examinations.",
      ),
      p(
        "The romantic version has the engineer inventing clever minds all day. The honest version: most of the work is preparing the examples. Data arrives messy — the spreadsheet lesson's world at industrial scale: missing values, mistyped names, the same customer entered three ways — and a model fed on dirt learns dirt faithfully. So the days go to cleaning and arranging data, choosing what the machine should look at, training — running the class — and then examining honestly: the model scores ninety-four percent, but does it score ninety-four percent because it learned, or because it memorised, or because the examples themselves were lopsided? A model that has only ever seen Lagos addresses will stumble in Sokoto, and nobody will tell you — the examination must catch it first. Then the last mile: deployment, putting the trained model behind a door where the bank's systems can ask it questions in real time, and watching it after, because roads change and a model that rode yesterday's roads drifts.",
      ),
      fig(
        "/images/blog/ml-engineer-whiteboard.jpg",
        "An engineer at a whiteboard covered in diagrams, a laptop open beside them.",
        "The honest portrait: less sorcery, more plumbing and examination. The whiteboard is questions; the laptop is patience.",
      ),
      h2("What it pays — the honest paragraph"),
      p(
        "You asked, so plainly: it is among the best-paid rooms in technology, and the numbers travel badly, so read them with their addresses attached. In the United States, the typical quoted range for a machine learning engineer in recent years runs roughly one hundred and twenty to one hundred and sixty thousand dollars a year, and higher at the top houses; Europe and the Gulf sit near that conversation in their own currencies. The reason Nigeria appears in this paragraph at all is remote work: an engineer here with demonstrable skill can be paid from that table into a Nigerian account, and the banks and fintechs and telcos at home pay their own strong range in naira — well above most local salaries, though not the dollar table. The honest summary: the room pays like a scarce skill, because it is one, and scarcity is proven by the thing you can build, not the certificate on the wall. The learning-online lesson applies with full force: the materials are free; the discrimination is the hours.",
      ),
      p(
        "And the road in, honestly: comfort with the spreadsheet's logic, then a real programming language — Python is the trade's lingua franca — then mathematics gently, statistics first, then the practice sets that every major platform gives away. It is a longer road than the frontend's first mile, and it begins exactly where you are sitting: data, cleaned by hand, understood with your own eyes. The data analysts of the next adverts and the machine learning engineers of the dollar table are separated mostly by hours of honest practice.",
      ),
      fig(
        "/images/blog/data-charts-training.jpg",
        "A laptop screen showing rows of data beside a training chart whose accuracy line climbs.",
        "The class in session: examples on the left, the examination on the right. The climbing line is attention, made visible.",
      ),
      ul([
        "Say the flip until it holds: ordinary programs are given rules; learned programs are given examples.",
        "Most of the craft is data cleaning. If that sentence disappoints you, believe it before you choose the road.",
        "Every salary number carries an address. Read dollar figures with the remote question attached.",
        "One month of Python from free materials — then judge the road with your own hands, not the adverts'.",
      ]),
      h2("The teacher's teacher"),
      p(
        "One respect to end on: this room sits behind half the conveniences of the wider street — the ride app's price, the bank's fraud watch, the map's traffic. When it is honest, it is the most powerful apprentice ever hired. When it is fed dirt or examined lazily, it learns the dirt faithfully and repeats it at scale, which is why the world needs people who understand it rather than people who merely invoke it. You now sit in the first group — and the exam of the next ten years will be finding more of them.",
      ),
    ],
  },
  {
    slug: "agile-and-devops",
    title: "Agile and DevOps: how the teams build",
    excerpt:
      "Two words that fill every job advert, explained at a market stall: build small, show early, adjust; and let the people who build carry it live. Agile and DevOps, without the incense.",
    series: SERIES,
    order: 130,
    author: AUTHOR,
    date: "2026-05-10",
    cover: "/images/blog/standup-board-sticky.jpg",
    coverAlt: "A team standing around a board covered in sticky notes, one person speaking.",
    body: [
      p(
        "Every technology job advert carries two words like a password: agile, and DevOps. They sound like philosophy and machinery, and both are simpler than their incense. Start with agile, because you already practise it. The trader who wants a new line of goods does not order a container of a hundred designs and reveal it at Christmas. She buys ten of three designs, puts them out on Tuesday, watches what Onitsha road actually takes, and orders more of what moved by Friday. Small, shown early, adjusted honestly. That is the agile methodology — a way of building anything in short cycles with real feedback, instead of one grand reveal a year late that the market has outgrown.",
      ),
      p(
        "The old way — the industry calls it waterfall — is the container: plan everything at the start, build for months, present at the end, and pray the market still wants what was planned. Agile answers with the sprint: a short fixed cycle, often two weeks, at the end of which something real and usable exists and is shown to the people who will use it, whose answers steer the next sprint. The rituals you will meet in adverts live inside that frame: the standup — the team standing, a few minutes each morning, each person saying what moved yesterday, what moves today, what is stuck; and the board — the wall of cards in three columns, to do, doing, done, which is the sprint's diary in public. Ask a trader about her Tuesday and she will describe the board without the vocabulary.",
      ),
      fig(
        "/images/blog/standup-board-sticky.jpg",
        "A team standing around a board covered in sticky notes, one person speaking.",
        "The morning standup at the board. What moved, what moves, what is stuck — the market's Tuesday meeting, wearing lanyards.",
      ),
      h2("DevOps: the builder carries it live"),
      p(
        "DevOps — said as one word, a marriage of development and operations — fixes an old divorce. The builders wrote the program and threw it over the wall to a separate team who ran it; the runners met the problems, the builders met the complaints secondhand, and the wall between them was where fixes went to die. DevOps ends the divorce: the people who build carry it live, and the people who run it build the running. Its most famous machinery is the pipeline — the conveyor that carries finished work to the street automatically: code is checked, tested, and delivered live in small steps, so that releasing a change is a Tuesday habit rather than a midnight ceremony with candles and prayers.",
      ),
      p(
        "The practices behind the word, named so adverts read plainly: continuous integration — every builder's work joins the shared house daily and is tested as it arrives, so surprises are caught the day they are born; continuous delivery — the conveyor to live, fed constantly, each small step reversible; monitoring — the sensors lesson grown up, watching the live thing and shouting before the customers do; and automation everywhere, because a machine that does the same steps identically every time is the opposite of the tired Thursday technician. When an advert says DevOps practices, it means exactly this list, and you may now read the sentence without blinking.",
      ),
      fig(
        "/images/blog/deploy-pipeline-screen.jpg",
        "A screen showing a pipeline of stages in a row, the first stages ticked green and one in motion.",
        "The conveyor to the street: checked, tested, delivered — small steps, each reversible. Release as habit, not as ceremony.",
      ),
      ul([
        "Say agile at the market's tempo: small, shown early, adjusted honestly. Two weeks, something real, real feedback.",
        "Standup, sprint, board — three words you already own the meaning of. Use them at your next job interview with a straight back.",
        "DevOps in one sentence: the builders carry it live, the runners build, and the conveyor makes it a habit.",
        "Try the method on anything of your own this week — the shop's stock, the church project. Two-week cycles need no software to begin.",
      ]),
      h2("The shelf, from the first sitting to the street"),
      p(
        "And so the chapter closes where the reader now stands: at the edge of a world whose vocabulary you hold. The analyst and the room that never sleeps, the ledger and the gate that trusts nobody, the fence walk, the grammar of the roads, the seal that cannot be photocopied, the stall, the teaching room, and the teams that build in Tuesdays. None of it was magic; none of it was closed to you; it was only never explained at this table before. The notes end here for now — but the reader who began at lesson one, afraid of the power button, has just read the job adverts without flinching. Walk into any of these rooms and say you came from the shelf. Then come back and tell us which chair fit.",
      ),
    ],
  },
  {
    slug: "careers-in-data-analytics",
    title: "Careers in data analytics: the person who reads the numbers",
    excerpt:
      "A data analyst turns an organisation's piles of records into decisions — who buys, what works, where the money leaks. What the career actually is, what it pays, and the honest road in.",
    series: SERIES,
    order: 131,
    author: AUTHOR,
    date: "2026-05-15",
    cover: "/images/blog/analyst-spreadsheet.jpg",
    coverAlt: "A woman studying a spreadsheet of sales figures on a laptop, pen in hand.",
    body: [
      p(
        "Every business here keeps records whether it means to or not: the shop's sales book, the hospital's register, the bank's transactions, the school's fees. Almost nobody reads them well. The data analyst is the person who does — who turns the pile into answers: which goods move in June, which ward wastes medicine, which customers stopped coming and when. When people list careers in data analytics, this is the trade they mean, and it sits behind more Nigerian businesses than the title suggests: shops, fintechs, telcos, hospitals, NGOs, government — anyone with a pile and a decision to make.",
      ),
      p(
        "The work has a rhythm, and you have already practised its first step without knowing. Collect: gather the records into one place, clean — the machine learning lesson's confession is also this trade's daily bread, missing names, mistyped dates, the same customer entered three ways — then analyse: totals, comparisons, patterns, the grid lesson's formulas grown serious. Then the step that separates analysts from spreadsheet keepers: explain. A chart a busy manager understands in ten seconds, a sentence that says what to do by Friday. Analysis that never becomes a decision is decoration. The trade is reading, and then being believed.",
      ),
      fig(
        "/images/blog/analyst-spreadsheet.jpg",
        "A woman studying a spreadsheet of sales figures on a laptop, pen in hand.",
        "The first hour of the work is never glamorous: one pile, one grid, one pen. The glamour arrives later, as a decision someone can defend.",
      ),
      h2("The tool ladder, and what each rung pays"),
      p(
        "The ladder is public knowledge. Rung one is the spreadsheet — Excel or Google Sheets — and it carries a shocking share of Nigerian business analysis all by itself: sort, filter, the money formats, the formulas filled down, the pivot table. Rung two is SQL, the language for asking databases questions directly — show me every customer who bought twice and stopped in March — which is less programming than precise questioning, the find lesson with a salary. Rung three is a BI tool — Power BI or Tableau — where the dashboards live that directors open on Monday mornings. Python comes later, for the heavier lifting, and the data scientist of lesson one hundred and twenty-nine is this same road walked further — more statistics, more machine, more pay.",
      ),
      p(
        "The money, honestly: a junior analyst in Nigeria commonly starts around the range a fresh graduate hopes for and rises quickly with proof — senior analysts and those carrying SQL and BI comfortably earn multiples of entry pay, and remote work puts international tables in play, exactly as the analyst and engineer lessons described. What moves the number is not certificates. It is the portfolio of questions you have answered, and how plainly you can make a stranger see the answer. The learning-online lesson applies in full: the tools have free versions, the tutorials are free, the discrimination is hours.",
      ),
      fig(
        "/images/blog/sql-query-screen.jpg",
        "A laptop screen showing a short database query and beneath it a table of results.",
        "Rung two. Four lines of careful asking, and a database that answers in seconds with ten thousand rows of truth.",
      ),
      ul([
        "Practise the rhythm this week on any record you own: the shop's book, the house expenses. Clean, then ask it three questions.",
        "Learn the pivot table properly — one evening, free videos. It is the single most respected spreadsheet skill in interviews.",
        "When ready for SQL, practise on any free online database course: twenty hours of it changes how you see every business.",
        "The academy's data analytics course walks this ladder with machines and teachers in the room — ask at the front desk, or begin free and climb.",
      ]),
      h2("Why the trade suits this place"),
      p(
        "Because Nigeria is not short of data — it is short of readers. Every problem anyone complains about, fuel, queues, churn, stock, sits on a pile of records nobody has calmly counted. The analyst is the person who counts, and in a country that is learning to measure itself, the person who can say this is what the numbers actually say, and here is the picture, is quietly becoming one of the most useful people in every room. You already read a grid, sort a column, and fill a formula down. The career is those habits, taken seriously, with a decision waiting at the end of every table.",
      ),
    ],
  },
  {
    slug: "how-to-build-mobile-app-nigeria",
    title: "How to build a mobile app in Nigeria, from the first sentence",
    excerpt:
      "The honest ladder from idea to screen: write it small, prototype on paper, start with the web, learn the code or brief a developer, then the Play Store. No magic, no container loads of cash.",
    series: SERIES,
    order: 132,
    author: AUTHOR,
    date: "2026-05-18",
    cover: "/images/blog/app-idea-notebook.jpg",
    coverAlt: "A notebook with hand-drawn phone screen sketches beside a phone on a desk.",
    body: [
      p(
        "How to build a mobile app in Nigeria is a question people ask with their eyes too big: they imagine a Lagos office, a container load of dollars, a team. The honest answer is a ladder, and its first rung costs nothing but a notebook. Write the idea in one sentence — who uses it, and what it does for them. An app that reads school fees for parents. An app that finds mechanics nearby. If the sentence will not come, the app is not ready; if it comes easily, you have already done what many funded teams skip.",
      ),
      p(
        "Rung two: draw it. Paper screens — rectangles with a button here, a list there — the poster lesson's discipline turned inward: what must this screen say, what must this button do? Then put the drawing in front of three people who would actually use it and watch where they frown. Every frown fixed on paper costs nothing; the same frown fixed after programming costs weeks. Rung three is the one most Nigerians should honestly start on: build it as a web app first — a site that works in any phone's browser, installed to the home screen like an app — because it needs no store approval, updates instantly, and reaches the phone that is Nigeria's real computer. The frontend lesson's three layers are the whole trade at this height.",
      ),
      fig(
        "/images/blog/app-idea-notebook.jpg",
        "A notebook with hand-drawn phone screen sketches beside a phone on a desk.",
        "The cheapest laboratory on earth. Every screen argued with on paper is a week of programming never wasted.",
      ),
      h2("The code, or the developer"),
      p(
        "Rung four is a fork, and both paths are honourable. Learn the code: the academy's mobile app development course and the free-learning lesson's method — one month per rung, hands on keys — carry you from web app to true Android apps, and the Play Store's door fee is a one-time twenty-five dollars, a business expense, not a wall. Or brief a developer: hire the portfolio rather than the patter — someone whose finished apps you have opened and used — agree the price in writing with stages, pay in parts as stages land, and never the whole sum upfront; the selling lesson's payment rules, walked from the other side. A clear one-sentence idea, paper screens, and a staged agreement will get a honest build for a fraction of the myth.",
      ),
      p(
        "And build for the street you live on: the app must survive a three-bar network and a low-end phone, or it does not survive Nigeria — test it on the bus, not only on your fine screen. Keep it small: one thing done perfectly beats five things done ashamedly; WhatsApp itself began as statuses and photos arrived years later. Expect power and data to be line items, the way rent is. And when the first version is alive, however ugly, put it in ten people's hands and listen. The idea that survives ten strangers' thumbs is the one worth the next thousand lines.",
      ),
      fig(
        "/images/blog/phone-app-testing.jpg",
        "A young tester tapping through a new app on a phone while the developer watches and takes notes.",
        "The examination that matters. Ten honest thumbs find more truth in an afternoon than a year of private admiring.",
      ),
      ul([
        "Write your idea in one sentence today. If it takes more, cut until it does not.",
        "Draw the three screens that matter on paper before touching any tool or hiring anybody.",
        "Start with the web app. The store can wait; your users' phones cannot.",
        "Hiring? Staged payments against stages delivered, portfolio before patter, everything in writing.",
      ]),
      h2("The myth, and the ladder beside it"),
      p(
        "The myth says building an app here requires somebody's millions. The ladder says otherwise: a sentence, paper screens, a web version, ten honest testers, and only then — if the street confirms the idea — the store, the code, or the developer. Every step is free or nearly, every step teaches, and any step can stop with dignity if the idea fails the test, which is precisely what steps are for. The person who asks how to build an app and begins at rung one this evening is ahead of the person who has been pricing containers since last year.",
      ),
    ],
  },
  {
    slug: "choosing-where-to-learn-bootcamp",
    title: "Choosing where to learn: bootcamps, night classes, and honest papers",
    excerpt:
      "A data science bootcamp in Nigeria can be the best money you ever spend or the fastest you ever lose it. The questions that tell one from the other, before you pay anybody.",
    series: SERIES,
    order: 133,
    author: AUTHOR,
    date: "2026-05-23",
    cover: "/images/blog/classroom-night-class.jpg",
    coverAlt: "Adult learners at computers in a small evening class, an instructor leaning over one screen.",
    body: [
      p(
        "So you have chosen to learn properly — the decision this whole shelf has been preparing you to make. Now the market floods in: every week a new data science bootcamp in Nigeria, a six-week miracle, a certificate with a foreign logo. Some of these schools are genuinely good and change lives at scale. Some are a room, a projector, and a man reading slides he did not write. Both advertise identically. This lesson is the buyer's inspection — the fence check, turned on the people asking for your school fees.",
      ),
      p(
        "Know the three honest shapes first. Self-taught: the free-learning lesson's road — free materials, total discipline, zero fees, and the highest drop-out rate, because nobody notices when you stop. The night class or part-time course: a room, machines, a teacher, a term — what this academy has run for years, built for people who work by day. The bootcamp: the full-time intensive, weeks of immersion, designed for career switchers in a hurry. None is superior in the abstract; each fits a life. The question is never which shape is best, but which shape your job, your pocket, and your temperament can actually finish — because an unfinished cheap course is the most expensive education on earth.",
      ),
      fig(
        "/images/blog/classroom-night-class.jpg",
        "Adult learners at computers in a small evening class, an instructor leaning over one screen.",
        "The room that fits a working life. Machines humming, a teacher within reach, and questions answered before they cool.",
      ),
      h2("The inspection: five questions before any fee"),
      p(
        "One: who teaches, and have they done the work — or only watched it? A working professional teaching evenings beats a full-time lecturer who has never shipped. Two: what will I have built by the end — ask to see past students' actual projects, not the school's own brochure; a good school shows them proudly, like a tailor. Three: machines or not — is a computer provided, or what exactly must you bring, because a laptop is a real cost and pretending otherwise is dishonesty. Four: what does the fee cover — every session, materials, certificate, anything after? State it all before you pay, in writing. Five — the loudest alarm: does the school promise jobs? Guaranteed employment is the prize message in academic dress; a good school promises skills, projects, and honest guidance, and says plainly that the market rewards proof. The moment a school sells you a job instead of a skill, walk out politely and keep your money.",
      ),
      p(
        "Two smaller tells: size and after. A class where one teacher faces sixty students is a cinema, not a school — ask the ratio, and ask what happens when you miss a week, because life here will interrupt you. And the papers: a certificate is a receipt for learning, not the learning itself — lesson one hundred and seventeen's employers trust the portfolio long before the parchment. When you visit a school — ours, or any — ask these five questions and watch the answers. A good school welcomes the inspection. A bad one changes the subject to urgency: promo ends today. You know hurry. Hurry is the oldest tell on this shelf.",
      ),
      fig(
        "/images/blog/student-projects-laptop.jpg",
        "A laptop showing a grid of past students' finished projects, a school owner standing beside it, proud.",
        "The tailor's rack. A school that shows its students' work has nothing to hide; the one that hides it has told you everything.",
      ),
      ul([
        "Choose the shape your life can finish: self-taught, night class, or bootcamp. Write why on paper.",
        "Ask the five before any fee: teachers' work, students' projects, machines, the full fee in writing, and jobs promised or not.",
        "Run from guaranteed jobs and today-only promos. Two tells, one conclusion.",
        "Visit the room before you pay it. Any school worth your evenings will show you the room.",
      ]),
      h2("What a school actually sells"),
      p(
        "Strip the brochures and a school sells three things: a structure you would not have built alone, a teacher who answers before the question cools, and classmates who make Thursday mean something. The internet cannot reliably give the second, and never gives the third. That is the whole case for rooms and fees — and the reason this academy keeps its classes small, its machines humming, and its alumni teaching one another years after. Whatever school you choose, choose it the way you now choose everything: slowly, with the receipt kept and the promise in writing.",
      ),
    ],
  },
  {
    slug: "it-support-the-person-who-fixes-the-day",
    title: "IT support: the person who fixes the day",
    excerpt:
      "When the printer dies before the meeting, one person becomes the most important in the building. What IT support work actually is, and why patience is the core qualification.",
    series: SERIES,
    order: 134,
    author: AUTHOR,
    date: "2026-05-27",
    cover: "/images/blog/support-desk-helping.jpg",
    coverAlt: "An IT support officer crouched beside a colleague's desk, fixing a cable while they watch.",
    body: [
      p(
        "Every office has a moment when everything stops: the printer dies before the meeting, the email will not open, the system asks for a password nobody remembers. In that moment one person becomes the most important in the building — the person who fixes the day. That is IT support: the trade of keeping other people's work moving, and the most common first room in all of technology. The analyst watches for attackers; the builder raises programs; the support person keeps the ordinary daylight running, which every one of those rooms quietly depends on.",
      ),
      p(
        "Here is the secret the job adverts do not say: you already know half the trade. Every lesson on this shelf is a ticket — a reported problem — that an IT support person has answered a thousand times. The computer is slow. The update is stuck. There is no sound. The phone says storage is full. The form will not upload. A ticket is simply one of these, reported by somebody else, and the trade is resolving it calmly while its owner watches. What the job adds to what you know is method: ask what changed last, restart honestly, check the obvious road before the exotic one, write down what you did — and a shell of deeper knowledge around it: networks, accounts, machines, the floors of lesson one hundred and twenty-six, climbed and repaired.",
      ),
      fig(
        "/images/blog/support-desk-helping.jpg",
        "An IT support officer crouched beside a colleague's desk, fixing a cable while they watch.",
        "The most-watched job in the building. Whatever you do at that desk, an audience learns whether technology is safe.",
      ),
      h2("The core qualification nobody lists first"),
      p(
        "Patience. Because the job's real raw material is not machines — it is frightened people: the manager who clicked the link, the accountant certain she has broken the system, the director who needs it now. The support person who sighs makes one enemy and teaches the whole corridor to hide their problems, which is how small faults grow into disasters. The one who explains without making anybody small becomes the person people run to early, and early is where problems are cheap. Every manner this shelf taught — the help lesson's rules for asking, the shared machine's courtesies — is what the good side of this desk looks like. You are not paid to know everything. You are paid to stay calm, find out, and leave the person taller than you met them.",
      ),
      p(
        "The road in, honestly: the fundamentals — machines, networks, accounts, the operating system's moods — then a first role, help desk or school or café support, where the learning is paid for instead of paid for. Certificates in the CompTIA family open doors here the way they do across the trade; the academy's IT support course carries that groundwork with machines to open and break safely. The pay begins modest, like all first rooms — but the room's view is the whole building: support people who learn how everything connects become the sysadmins, the security watchers, the infrastructure engineers, each rung paying better than the last. Almost nobody ends where support began. The trade's habit of fixing things has always included fixing one's own ladder.",
      ),
      fig(
        "/images/blog/opened-laptop-repair.jpg",
        "An opened laptop on a workbench, its parts exposed under a desk lamp, tools laid out neatly.",
        "The calm of method: one machine, one fault, one tool at a time. The screwdriver rarely solves it; the sequence does.",
      ),
      ul([
        "Re-read the shelf as a ticket queue: for each lesson, say how you would fix it for a stranger, in their hearing, kindly.",
        "Learn the floors of trouble by heart — app, machine, router, street, far house — and practise saying which floor broke.",
        "Keep a repair diary: machine, fault, what worked. In a month you own the most persuasive CV a first employer has seen.",
        "When you are ready for the room-with-machines version, the academy's IT support course is the front door. Say the shelf sent you.",
      ]),
      h2("The trade that keeps the lights on"),
      p(
        "No app ships, no analysis lands, no campaign runs, in a building whose machines are down and whose people are afraid of them. IT support is the floor under every floor — unglamorous by design, indispensable by arithmetic. If your temperament is the helper's, if the locked-out colleague's relief is payment you actually enjoy, this is a career that begins where you are already standing: calm, curious, and unafraid of the question everybody else is afraid to ask twice.",
      ),
    ],
  },
  {
    slug: "websites-for-small-businesses",
    title: "Websites for small businesses: a trade you can start this year",
    excerpt:
      "Every shop, school and church needs one honest page on the internet — and somebody local to build and keep it. That somebody can be you, from skills this shelf has already begun.",
    series: SERIES,
    order: 135,
    author: AUTHOR,
    date: "2026-06-01",
    cover: "/images/blog/small-shop-owner-laptop.jpg",
    coverAlt: "A shop owner and a young developer looking at a laptop together behind a shop counter.",
    body: [
      p(
        "Walk your own street and count the businesses with no honest page on the internet: the pharmacy, the school, the church, the fashion house with fine pictures trapped in a WhatsApp gallery. Their customers are searching every day, and finding only strangers. Every one of those businesses needs the same modest thing — one clear page that says who we are, what it costs, where we are, and a button that opens WhatsApp — and somebody local to build it and keep it breathing. That somebody can be you. Of all the trades on this shelf, this one starts soonest and pays first.",
      ),
      p(
        "The skill floor is lower than any hustler will tell you, because the secret is that most small-business sites should be small. A site builder or WordPress — the prepared skeletons the frontend lesson mentioned — covers the majority of cases, and the real craft is not code at all: it is the poster lesson's discipline applied to a whole business. Say the true thing briefly. Put the price where the customer expects it. Make the address findable in one glance. One page done honestly beats five pages done ashamedly, and a button that opens a chat will do more for a Lagos pharmacy than any amount of animation. The frontend lesson's three layers are there when a client genuinely needs more — and by then you will want them.",
      ),
      fig(
        "/images/blog/website-preview-phone.jpg",
        "A hand holding a phone showing a clean one-page business site, the shop's entrance visible behind it.",
        "The whole shop in one honest page: what, where, how much, and a button that opens a conversation. That is the trade.",
      ),
      h2("The money, and how it arrives"),
      p(
        "The trade has two rivers of income, and the second is the one beginners undervalue. The build: a first simple site might earn modest money — a fraction of what agencies charge Lagos firms — and it should, because you are buying proof as much as payment. Then the keep: domains expire yearly, hosting renews, shops change prices, and the person who built the page is the person the owner calls — a small standing income for an afternoon's tidying twice a year. Ten kept clients are a quiet salary. The catalog FAQ's arithmetic applies exactly: a domain costs about ten to eighteen thousand naira a year and simple hosting is cheap or free; charge for the work, pass the costs through plainly, and put every number in writing — the pricing lesson's law before it is even spoken.",
      ),
      p(
        "The road in is the portfolio's road: build the first site for your church free, the second for a relation's shop at cost, the third for the neighbour's school at a fair new price — three live addresses, each with a grateful owner, and you are no longer promising, you are showing. The academy's web design and WordPress courses compress the technical months into weeks with machines and real briefs; the self-taught road costs nothing but evenings and works too. Either way the trade begins where you live, on the street whose businesses you already patronise — and there is a particular satisfaction in walking past a shop and knowing its corner of the internet is yours.",
      ),
      fig(
        "/images/blog/domain-renewal-note.jpg",
        "A small desk calendar with a circled date beside a laptop, a notebook listing client sites and renewal months.",
        "The keeper's ledger: every site, its renewal month, its owner's number. The second river of income flows through this page.",
      ),
      ul([
        "Pick one real business you patronise and draft its one honest page tonight — words first, tool after.",
        "Learn one tool properly — a site builder or WordPress — and finish one full practice site before charging anybody.",
        "Three builds to begin the portfolio: free, at cost, then fair price. Keep every owner's number.",
        "Put the domain and hosting costs in your quotes plainly. The written number is the whole reputation.",
      ]),
      h2("The street is the market"),
      p(
        "Nobody needs to import this trade. The customers are already within twenty minutes of you, already searched by strangers every day, already paying printers for banners that say less than one honest page would. The developer of lesson one hundred and twenty-eight builds for companies and continents; this trade builds for the street, in afternoons, for wages that compound into a living. One clear page at a time — it is how most of the independent web people you admire actually began.",
      ),
    ],
  },
  {
    slug: "social-media-manager-behind-posts",
    title: "The social media manager, behind the posts",
    excerpt:
      "The job is not posting; it is selling with manners at scale — a calendar, a camera, a reply written like a host, and numbers read honestly every week.",
    series: SERIES,
    order: 136,
    author: AUTHOR,
    date: "2026-06-06",
    cover: "/images/blog/phone-content-calendar.jpg",
    coverAlt: "A planner showing a week of scheduled posts beside a phone on a desk.",
    body: [
      p(
        "Every business you pass is being told the same thing: you must be online. Most owners have neither the time nor the stomach for it — the photographs, the captions, the stranger asking the same question forty times — so they hire somebody to stand in the doorway of their business and speak well to the street. That person is the social media manager, and the title undersells the work. It is closer to market trade with a modem: know the goods, show the goods, answer every caller with manners, and count what actually sold on Saturday.",
      ),
      p(
        "The work, honestly itemised. The calendar: a week of posts planned on paper or a simple planner — what goes out, on which day, photographed for which purpose — because posting-by-mood is how business pages die. The camera: clean product photographs in daylight, the selling lesson's discipline, reused across posts. The replies: this is the trade's core and its test — every question answered quickly and kindly, every complaint answered publicly and finished privately, because a thousand strangers are reading the reply who never read the post. WhatsApp is not email, lesson ten said; a business chat is not a group chat either — it is a counter, and the manager is the one behind it. And the numbers, weekly: what was seen, what was clicked, what was bought. Vanity is when a page grows and sales do not; the honest manager reads that sentence and changes the cooking, not the garnish.",
      ),
      fig(
        "/images/blog/phone-content-calendar.jpg",
        "A planner showing a week of scheduled posts beside a phone on a desk.",
        "The week, decided in advance. Saturday's sales are cooked on Monday's calendar; posting by mood is how pages starve politely.",
      ),
      h2("What the good ones charge, and how they begin"),
      p(
        "Begin where you are trusted: a relation's shop, your church's page, the tailor whose work you already wear — one small account, run properly for a season, with before-and-afters kept as proof. Charging follows the pattern of every trade on this shelf: a monthly fee agreed in writing for a defined service — so many posts, photographs included, replies within working hours, one honest report a week — and anything beyond it quoted separately. The marketing programs at the academy teach the paid side properly, with real budgets; the free road starts with the learning lesson and the discipline to finish. What separates earners from hobbyists in this trade is rarely taste. It is reliability: the page that posts when it said it would, the comment answered within the hour, the report that arrives without being chased. Clients renew reliability. They merely compliment beauty.",
      ),
      p(
        "And keep the shelf's guard up while you work, because this desk meets every liar in the book: the client who wants to buy followers, which is renting an empty stadium and calling it a crowd; the scam that arrives as a brand collaboration with a fee attached; the forward-that-lies pressure to post what was never checked. The manager's name sits on every word posted — lesson one hundred and nine's envelope, signed monthly. Guard it, and the trade compounds: one kept shop leads to the next, the way kept sites and kept books do. The street talks. Make sure it is your work it is talking about.",
      ),
      fig(
        "/images/blog/social-reply-desk.jpg",
        "A manager typing a reply to a customer comment on a phone, a notebook of response notes open beside it.",
        "The counter, staffed. Every reply is read by a thousand strangers who never liked a post — and it is the reply they judge the shop by.",
      ),
      ul([
        "Choose one real page and run it properly for a season: calendar on Monday, photographs in daylight, replies within the hour.",
        "Write the weekly report yourself — seen, clicked, bought — and change the cooking when the numbers speak.",
        "Agree the monthly fee and its boundaries in writing before the first post goes up.",
        "Never buy followers, never post unchecked forwards, never let the page promise what the shop cannot deliver.",
      ]),
      h2("The trade of being trusted in public"),
      p(
        "Strip the platforms and the trends — they will change again before these words grow old — and the job is ancient: stand at the front of the shop, know your goods, greet every caller well, and keep honest count of what sells. Businesses will always pay for the person who can be trusted to speak for them in public, because most people cannot bear to do it daily. That is the work behind the posts, and there has never been more of it than now.",
      ),
    ],
  },
  {
    slug: "graphic-designer-table",
    title: "Design as a trade: the graphic designer's table",
    excerpt:
      "The designer's job is not beauty; it is clarity that sells — hierarchy, restraint, and the discipline to stop. What the work is, what the tools cost, and how the first paid jobs arrive.",
    series: SERIES,
    order: 137,
    author: AUTHOR,
    date: "2026-06-09",
    cover: "/images/blog/designer-colour-swatches.jpg",
    coverAlt: "A designer's desk with colour swatches, sketches and a laptop showing a layout.",
    body: [
      p(
        "The poster lesson said it once and this trade is built on it: a flyer is not decoration, it is a sentence arranged so a stranger reads it in one glance. The graphic designer is the person who arranges. Weddings, elections, churches, brands, the suya spot by the junction — every message here competes in the loudest visual street on earth, and the designer's job is to make one message land clean among the noise. Not prettiness. Clarity with a temperature. If you have ever rearranged a shelf until it felt right, or chosen the cloth that made the outfit, you have already done the work's first hour.",
      ),
      p(
        "What the work actually is, day to day: listening first, because the client will say logo when they mean identity and beautiful when they mean trustworthy, and the designer's first skill is translating. Then hierarchy — what the eye reads first, second, third: name, offer, how to reach us, in that order, at those sizes, whether the brief is a funeral programme or a bank campaign. Then restraint — two fonts, three colours, one idea per page; the difference between a professional design and a market noise is what the designer had the discipline to leave out. The tools begin free on the phone and grow into the desktop suites when the work demands them; the camera lesson's lighting and the scanning lesson's flat surfaces are already half of every clean mock-up you will ever admire.",
      ),
      fig(
        "/images/blog/designer-colour-swatches.jpg",
        "A designer's desk with colour swatches, sketches and a laptop showing a layout.",
        "The table of restraint. Three colours, two fonts, one idea — and the discipline to stop before the page shouts.",
      ),
      h2("How taste is actually built"),
      p(
        "Nobody is born with the eye; the eye is a filing cabinet. Fill it deliberately: collect a hundred designs you admire — wedding suites, brand boards, album covers, bank campaigns — and for each, ask one question: where did my eye land first, and why? Copy them shamelessly in practice, the way apprentices have always learned tailoring — recreate the hierarchy until your hands understand the argument. Then vary: same flyer, three hierarchies; same name, five type pairings. The taste that clients pay for is thousands of small comparisons, filed. And the trade's professional manners matter as much as the eye: the brief written back to the client in their own words before any design begins, two concepts shown rather than ten, revisions bounded in writing, and the files delivered in the formats people actually need — the PDF lesson's knowledge, monetised.",
      ),
      p(
        "The first paid jobs arrive the way they do across this whole shelf: the church programme, the cousin's shop banner, the school's flyer — small works, done exactly, collected as proof. The catalog's own advice to design students holds: small jobs — event flyers, social posts, church graphics — once the portfolio carries three to five solid pieces; price modestly at first, deliver precisely what was promised, and most beginners meet their first repeat client within months. From there the ladder is real: brand identities, retainers with businesses who need you monthly, and the print shops and event planners who send steady work to the designer whose files never make their machines complain.",
      ),
      fig(
        "/images/blog/portfolio-design-spread.jpg",
        "A printed portfolio open on a table, showing pages of branding and flyer designs in a neat grid.",
        "The filing cabinet, made public. Three to five honest pieces, shown proudly — the designer's entire storefront.",
      ),
      ul([
        "Start the filing cabinet today: collect ten designs you admire and mark where the eye lands first, and why.",
        "Recreate one admired design from scratch this week — fonts, sizes, spacing — until your version is indistinguishable.",
        "Do one real free job for a cause you respect, and deliver it with all the file formats a printer could ask for.",
        "Two concepts, bounded revisions, written brief — the three manners that separate a trade from a favour.",
      ]),
      h2("The trade of making people look as good as they are"),
      p(
        "Every business on your street already believes in its own message; what it lacks is the person who can make a stranger believe it in one glance. That is what design sells, and why it survives every platform shift: tools will change their names again, but hierarchy, restraint and listening are older than printing. The table is cheap to set, the practice is free, and the first client is probably within three doors of you. Sit down, file a hundred examples, and let the eye grow the way every skill on this shelf grew — one honest hour at a time.",
      ),
    ],
  },
  {
    slug: "working-remote-from-here",
    title: "Working remote from here: dollars, hours, and the light",
    excerpt:
      "Remote work is not a hustle, it is a job with a longer commute. The four things it actually demands — proven skill, power and data, written English, and a way to be paid — and how to arrange each.",
    series: SERIES,
    order: 138,
    author: AUTHOR,
    date: "2026-06-14",
    cover: "/images/blog/remote-work-headphones.jpg",
    coverAlt: "A young professional at a desk with headphones, a laptop and a small UPS, in a home room.",
    body: [
      p(
        "Somewhere in this city tonight, a young man is debugging code for a company whose office he has never seen, paid on Friday in dollars, generator fuel already budgeted like rent. This is remote work at its honest best — not a hustle, not a shortcut, but a job with a longer commute: the skills are the same, the manners are the same, and four practical walls must stand before the first contract. This lesson walks the four, because each has broken more remote careers than any lack of talent.",
      ),
      p(
        "Wall one: a skill proven. Remote employers cannot see your hustle; they can only see finished work and checkable references — the profile lesson's front door, the portfolio lesson's proof, and nothing else. Wall two: power and data, arranged like utilities rather than prayed about. The professional setup here is boring and specific: a laptop with honest battery health, a small inverter or UPS at least for the router and one machine, a primary data plan with a backup — two networks, because lesson ninety-five taught you taps — and a workspace where a full workday does not depend on the grid's mood. The light is a colleague you must manage, not a mystery you must resent. Wall three: written English — the entire remote relationship happens in text: the clear update, the polite disagreement, the question asked once and completely. Lesson five's letter, lesson seventy's manners, worn daily.",
      ),
      fig(
        "/images/blog/remote-work-headphones.jpg",
        "A young professional at a desk with headphones, a laptop and a small UPS, in a home room.",
        "The boring setup that makes it possible: charged machine, backed-up router, two networks, one closed door.",
      ),
      h2("Wall four: the money must arrive"),
      p(
        "Being paid across borders is a solved problem with a small fee attached: established platforms open receiving accounts that accept dollars or pounds and pay out to Nigerian banks; some clients pay by direct transfer through those platforms, a few by card on contracts. The rules you already live by simply grow a passport: get the fee in writing before the work, invoice properly — a document with your name, the client's, the amount, the account — invoice in parts for anything long, and expect the platform's fee like you expect transport. Keep the receipts; the tax conversation in Nigeria is maturing, and the professional's answer is records, not vibes. The bank lesson's alert-checking, the selling lesson's confirm-before-delivery — the same laws, now in dollars.",
      ),
      p(
        "Then the manners of the clock, which finish the picture: know your client's hours — overlap is the service, and a Lagos morning is a London morning; a Lagos evening, an American one — choose contracts whose hours you can honestly hold, and treat the closed door of a home workspace as sacredly as any office. The trades of this chapter all lead here eventually: the analyst, the designer, the support engineer, the writer of apps — remote is not a fifth career, it is where the other careers go to be paid in hard currency. Build the walls in order, and the commute stays long but the pay arrives short.",
      ),
      fig(
        "/images/blog/invoice-cross-border.jpg",
        "A laptop showing a simple invoice document, a phone displaying a payment received notification beside it.",
        "Wall four, standing: the written fee, the proper invoice, the alert checked twice. Same laws, harder currency.",
      ),
      ul([
        "Arrange the boring wall first: one backup network and at least router-and-laptop power cover. This week, not the week of the first client.",
        "Write one practice update as if to a remote manager: what moved, what is next, what is blocked. Three sentences, no grammar casualties.",
        "Choose one receiving platform, open the account while you have no client yet, and learn its fees before you need it.",
        "Keep a work diary from day one — hours, deliverables, payments. Records are the professional's whole armour.",
      ]),
      h2("The longer commute, honestly priced"),
      p(
        "None of this is glamorous, which is precisely why it works: the four walls — proven skill, managed power and data, written English, arranged payment — are each boring, each buildable, and each within this shelf's reach. The reward is the arithmetic everyone whispers about but few prepare for: the same skill, priced in a stronger market, paid into the same account the bank lesson taught you to guard. Build like the person in the first paragraph: quietly, wall by wall, until Friday's alert needs no translation.",
      ),
    ],
  },
  {
    slug: "pricing-your-work",
    title: "Pricing your work without apologising",
    excerpt:
      "The freelancer's hardest lesson: a price is not a confession of worth, it is a tool with a floor, a market, and a value. How to quote, hold, deposit, and raise.",
    series: SERIES,
    order: 139,
    author: AUTHOR,
    date: "2026-06-19",
    cover: "/images/blog/invoice-notebook-writing.jpg",
    coverAlt: "A hand writing figures into a notebook beside a calculator and a laptop.",
    body: [
      p(
        "Every trade in this chapter ends at the same awkward table: the moment the price must be said. The new freelancer's tongue trips — they halve the number, apologise while saying it, and spend the job resenting the work. This lesson is the antidote, and it begins with a redefinition: a price is not a confession of your worth. It is a tool — with a floor beneath it, a market around it, and a value above it — and like every tool on this shelf, it is learned by method, not by mood.",
      ),
      p(
        "The three questions behind any honest quote. The floor: what do your hours, data, transport and skill actually cost you — below this line every job is charity, and charity is a fine thing that belongs in church, not in invoices. The market: what do others ask for this work, at your level, in this city — the selling lesson's walk around the market, applied to your own labour; price near them, not beneath them by magic. The value: what is the outcome worth to the client — the flyer that fills a hall, the site that answers customers at midnight, the books that survive an audit. Beginners quote the floor and apologise; professionals quote the value and explain. You were already taught the instinct — lesson one hundred and thirteen: sentiment is a tax no buyer pays. Charge for the outcome, and never so low that you resent the work; resentment is the most expensive hidden fee in freelancing.",
      ),
      fig(
        "/images/blog/invoice-notebook-writing.jpg",
        "A hand writing figures into a notebook beside a calculator and a laptop.",
        "The quote is prepared, not blurted. Floor calculated, market walked, value named — then one calm number, written and held.",
      ),
      h2("The manners that protect the number"),
      p(
        "Quote in writing, always — one message: what will be delivered, by when, for how much, revisions bounded, payment split. Take a deposit on anything substantial, half or near it, before work begins; the deposit is not distrust, it is the shape of seriousness, and the client who resents it has told you something useful. Bound revisions — the second redesign is a new job, said with a smile and the written brief. And resist the three classic discounts: the friend price for a business that can pay, the exposure payment — a corpse cannot spend exposure, and neither can a portfolio bank it from a client who never pays — and the urgency discount, where their deadline becomes your discount. The family word lesson's rule applies at the pricing table too: the people who pressure you hardest about money are usually the ones the money was never meant to come from.",
      ),
      p(
        "Then raising, which is the part everyone fears and every professional eventually does: new clients get the new price immediately — the next quote is simply higher, said plainly; existing clients get notice and warmth — from next month my fee is this, and here is what the year together has built. The good ones stay. The ones who leave were usually the ones holding the floor beneath your market. The catalog's freelancer course works this ground with real numbers and real scripts; the free road is to practise the sentences aloud until your voice stops apologising. The work deserves a price said without a tremble — and so do you, which in this trade are the same sentence.",
      ),
      fig(
        "/images/blog/quote-message-phone.jpg",
        "A phone showing a written quotation message to a client, the figures clearly typed.",
        "The whole protection, one message long: what, when, how much, revisions bounded, payment split. Written is respected; spoken is negotiated.",
      ),
      ul([
        "Calculate your floor tonight: hours, data, transport, tools — the number below which you do not work for businesses.",
        "Walk the market for your trade and write your range. Quote inside it, never below the floor, and stop apologising in the sentence.",
        "Adopt the written quote and the deposit this week. Practice on the next job, however small.",
        "Say the raising sentences aloud until they are boring: from next month, my fee is this. Boring is the goal.",
      ]),
      h2("The number, said plainly"),
      p(
        "Everything on this shelf has been training for calm at decisive moments — the pause before the link, the name before the confirm, the plate before the door. The pricing moment is that same decisive instant, wearing your own hat: the pause before the number, said plainly, held kindly. Quote the value, take the deposit, bound the revisions, raise without apology. The trade that pays a person properly is built from these small held lines, one quote at a time — and the confidence clients actually respect was never arrogance. It was preparation, with a figure attached.",
      ),
    ],
  },
  {
    slug: "the-portfolio-proof",
    title: "The portfolio: proof over promises",
    excerpt:
      "A CV says you can; a portfolio shows you did; a client decides in one glance. How to build the small body of evidence that turns every trade in this chapter into a living.",
    series: SERIES,
    order: 140,
    author: AUTHOR,
    date: "2026-06-24",
    cover: "/images/blog/portfolio-printed-works.jpg",
    coverAlt: "A printed portfolio of project pages spread across a table beside a laptop.",
    body: [
      p(
        "Every trade this chapter opened — analyst, designer, developer, support, manager, writer of apps — ends at the same door, and the door does not ask for certificates. It asks: show me. The portfolio is the small body of evidence that you did the thing, for somebody, and that it worked. A CV says you can. A portfolio shows you did. The client decides between those two sentences in one glance, which is why this last lesson of the chapter is the one that turns skills into a living — and why it is astonishing how many people spend years collecting skills and one afternoon building proof.",
      ),
      p(
        "What counts as proof is broader than you fear. The finished thing itself — the site, live at its address; the flyer, printed and photographed in the shop; the dashboard, screenshotted with permission; the books, reconciled to the naira. The before and after — the shop that had no page and now does; the queue that took hours and now takes minutes; numbers where you have them, and honest description where you do not. The witness — one line from the church secretary, the shop owner, the relation whose site you built: she said, she did, it worked. Three to five pieces, each with its before, its after, and its witness, outweigh any stack of certificates — and every single one of them is buildable within a month from where you sit, because the free-job road was already marked: the church, the relation's shop, the neighbour's school. The portfolio is not a later reward. It is the next month's assignment.",
      ),
      fig(
        "/images/blog/portfolio-printed-works.jpg",
        "A printed portfolio of project pages spread across a table beside a laptop.",
        "The evidence, laid on the table. Three pieces with witnesses beat thirty promises with punctuation.",
      ),
      h2("Where it lives, and how it is shown"),
      p(
        "Keep it in two houses. The folder: Drive, named, ordered, holding every deliverable and every witness line — the papers lesson applied to your work, safe above the flood, openable in any café on earth. And the page: one clean site — your name, one sentence saying what you do for whom, the three to five pieces with their pictures and their witnesses, and one obvious way to reach you. The frontend lesson's three layers, one page, no more; the profile lesson's front door, now with the workshop visible through the window. When an opportunity appears, you do not scramble: you send the page, or walk in with the printed table, and the conversation starts from what you did instead of what you claim.",
      ),
      p(
        "Then the rhythm that keeps it alive: every finished job, however small, enters the folder within a week — the screenshot taken, the witness line requested while gratitude is still warm, the before remembered and recorded. Retire the weakest piece each time a stronger one arrives; three sharp proofs beat five tired ones. And read your own portfolio the way the clients do, once a season: does this table say what I do, to whom, and does it make a stranger believe me in one glance? When the answer is yes, you have crossed the bridge this whole chapter was building — from person who learned, to person who is hired. The shelf taught you to sit at the machine without fear. The portfolio is how the world finds out.",
      ),
      fig(
        "/images/blog/work-folder-drive.jpg",
        "A laptop screen showing a tidy Drive folder of named project files with a witness letter among them.",
        "Two houses, one body of evidence. The folder for the world to verify; the page for the world to meet.",
      ),
      ul([
        "This month: one free job, done exactly, photographed, witnessed. The first piece is the hardest and costs only an afternoon of humility.",
        "Ask for the witness line while the thank-you is still warm — one sentence, written, kept forever.",
        "Build the one-page portfolio: name, sentence, three pieces with befores and afters, one way to reach you.",
        "Enter every finished job into the folder within a week. The rhythm is the portfolio; the portfolio is the living.",
      ]),
      h2("The shelf, complete"),
      p(
        "One hundred and forty notes. You began at a dark screen and a plastic oval, afraid of breaking something, and you end with the vocabulary of watchers and builders, the manners of money, the law of proof. Nothing on this shelf was magic — it was only never explained at this table before, and you did the hours anyway, which was always the entire secret. Wherever this chapter finds you — the night class, the first free job, the first held price — leave one note behind you for the next person: a taught hand, a kind answer, a kept promise. That is the whole curriculum, and it was always yours. Go and show them.",
      ),
    ],
  },
  {
    slug: "your-first-paid-client",
    title: "Your first paid client, start to finish",
    excerpt:
      "One real job, walked the whole way: the enquiry, the written quote, the deposit, the delivery, the invoice, and the ask that turns one client into the next.",
    series: SERIES,
    order: 141,
    author: AUTHOR,
    date: "2026-06-27",
    cover: "/images/blog/first-client-handshake.jpg",
    coverAlt: "A young freelancer and a shop owner shaking hands over a desk with a laptop on it.",
    body: [
      p(
        "Everything this shelf built — the skills, the prices, the portfolio — now meets its first customer. Walk one small job the whole way, because the first paid job is not really about the money. It is about learning that the road exists, end to end, and that you can walk it without disappearing. Follow a job: the owner of a pharmacy needs a one-page site; a friend showed her your page — the portfolio lesson already working while you slept.",
      ),
      p(
        "The enquiry arrives, and the first meeting is listening: what does the business need the page to do — answer questions, take orders, be findable? Write the brief back to her in her own words: you said the phone never stops; the page will answer the ten common questions so it stops less. Then the quote, written, from the pricing lesson: what, when, how much, revisions bounded, and a deposit before work begins — half, into your account, seen in your own app, the bank lesson's confirm, before a single line of work. The deposit is not distrust. It is the shape of seriousness, hers and yours.",
      ),
      fig(
        "/images/blog/first-client-handshake.jpg",
        "A young freelancer and a shop owner shaking hands over a desk with a laptop on it.",
        "The agreement, sealed. Brief heard, quote accepted, deposit seen — only then does the work begin, and both parties know it.",
      ),
      h2("The work, and the discipline of updates"),
      p(
        "Deliver slightly early of what you promised, never slightly late — a first client forgives a rough edge and never forgives a missed Tuesday. And send updates without being chased: the three-sentence message every few days — what is done, what is next, what I need from you — is the professional's heartbeat, the remote lesson's practice worn at home. When the site is ready, walk her through it on her own phone, in her own shop, and fix the two things the real thumbs reveal. Hand over everything: the logins, the files, the receipts for the domain — it is hers; you built it, but the shop owns its own name.",
      ),
      p(
        "Then the invoice — a document, not a chat message: your name, her business, what was delivered, the balance, the account, the due date. Paid, thanked, receipted. And now the ask that separates a job from a beginning: the witness line, requested while she is still pleased — one sentence for your portfolio, may I show this work? — and the referral, asked as plainly: if anybody needs this, my name is in your mouth. One job walked the whole way teaches more than ten courses, and it leaves behind the only two things that matter: proof and a person who will vouch for you. The next client is already in her market.",
      ),
      fig(
        "/images/blog/invoice-delivery-document.jpg",
        "A printed invoice and a signed receipt lying on a shop counter beside a small calculator.",
        "The end of the road, on paper. Delivered, invoiced, receipted — and the witness line asked before the goodbye.",
      ),
      ul([
        "Take one real job this month, however small. Walk every step: brief, written quote, deposit, build, delivery on her phone, invoice, witness.",
        "Send the three-sentence update unasked, every few days. Clients renew people who talk first.",
        "Hand over everything — logins, files, receipts. The shop owns its name.",
        "Before the goodbye: the witness line and the referral ask. One job, two seeds.",
      ]),
      h2("What the first job actually pays"),
      p(
        "The fee will be modest, and that is correct — you were buying proof, and the proof is now yours. But count the true wages: a finished delivery in the folder, a witness line beside it, a referral walking the street with your name, and the quiet knowledge that the whole road can be walked without fear. Every freelancer you admire began exactly here, at one small job done completely. The second one is easier. The tenth one sets prices.",
      ),
    ],
  },
  {
    slug: "working-with-ai-assistants",
    title: "Working with AI assistants",
    excerpt:
      "The assistant that answers everything and is sure about all of it: how to use the tools as apprentices — drafts, explanations, ideas — and where their confidence must be checked.",
    series: SERIES,
    order: 142,
    author: AUTHOR,
    date: "2026-07-02",
    cover: "/images/blog/ai-assistant-chat.jpg",
    coverAlt: "A person at a laptop reading a chat conversation with an AI assistant, thinking.",
    body: [
      p(
        "A new colleague has joined every office and every phone: the assistant that answers in full sentences, in seconds, in any language you type — writes the letter, explains the tax, drafts the proposal, corrects your code, and never sighs. Used well, it is the most patient apprentice in history, and it is already part of honest work in every field on this shelf. Used carelessly, it is the forward-that-lies with better grammar. This lesson is the difference, and it is now a basic skill, like the keyboard was.",
      ),
      p(
        "Where it shines: drafts — the first version of a letter, a proposal, a poster's wording, written in seconds and then made yours; explanations — a concept from this shelf said five simpler ways until one lands; translation and tone — the firm email softened, the Pidgin polished for a formal client; and brainstorming — ten names, twenty post ideas, three prices, asked without embarrassment. The working method is the one every editor knows: it drafts, you decide. Your knowledge of the actual work — the client, the market, the truth — is what the assistant does not have and cannot fake. The name on the work is still yours, and the judgement must be too.",
      ),
      fig(
        "/images/blog/ai-assistant-chat.jpg",
        "A person at a laptop reading a chat conversation with an assistant, thinking.",
        "The apprentice at work: fast, tireless, plausible. The thinking face is not optional — it is the whole method.",
      ),
      h2("Where its confidence must be checked"),
      p(
        "The assistant does not know when it does not know. It will state a wrong date, invent a policy, cite a law that does not exist — fluently, in beautiful sentences, without blinking. It is the voice-clone lesson in text: fluent is no longer evidence. So the rule is one sentence: everything checkable gets checked before it leaves your hands — the figure, the date, the policy, the legal claim, checked at the source the way the sixty-second check taught. And the privacy line is drawn hard, as always: nothing that belongs to a client goes into the box — not their data, not their invoices, not their logins — and never your own passwords or the codes that die. What you type there has left your house. Treat the chat window like a public street: fine for ideas, dangerous for keys.",
      ),
      p(
        "Then the honesty question every trade is now settling: must you tell the client? The working answer here: the client pays for an outcome — the site that works, the letter that lands — and tools have always been allowed. What is not allowed is passing off its mistakes as your work, or claiming hours you did not work. Draft with the apprentice, verify with your own eyes, stand behind the result with your own name. Do that, and the strongest tool ever handed to a self-taught worker is simply yours — free, patient, and waiting in the same browser you already know how to use.",
      ),
      fig(
        "/images/blog/verify-ai-claims.jpg",
        "A phone and a laptop side by side: the laptop showing a drafted document, the phone open on a search page checking one claim.",
        "The new dance: it writes, you verify. One checked figure is worth a page of fluent nonsense.",
      ),
      ul([
        "Give it one real task today: the first draft of a letter you have been postponing. Then rewrite it until it sounds like you.",
        "Adopt the checking habit: every figure, date or claim that will leave your hands is verified at a real source.",
        "Nothing confidential goes in: no client data, no logins, no OTPs. The chat window is a street, not a filing cabinet.",
        "Use it as a teacher, not an oracle: ask it to explain anything from this shelf in simpler words, then test the explanation on somebody.",
      ]),
      h2("The apprentice, not the master"),
      p(
        "Every tool on this shelf arrived with the same warning label: it does what you tell it, not what you mean — the spreadsheet, the find-and-replace, the calculator. The assistant is that warning at its loudest, because it fills silence with confidence. The people it will serve best are exactly the people this series has been building since lesson one: those who read before they send, check before they trust, and sign nothing they have not understood. The apprentice is remarkable. Keep the master's chair.",
      ),
    ],
  },
  {
    slug: "the-books-of-a-one-person-business",
    title: "The books of a one-person business",
    excerpt:
      "You earned it; now keep it. Separate the money, record every in and out, set aside the tax-and-rain share, and reconcile once a month — books a one-person business can actually keep.",
    series: SERIES,
    order: 143,
    author: AUTHOR,
    date: "2026-07-07",
    cover: "/images/blog/money-two-accounts.jpg",
    coverAlt: "Two bank cards and a small ledger notebook on a desk, one card marked for business.",
    body: [
      p(
        "The first payments have started arriving, and with them the oldest trap of the one-person business: the money that comes in and vanishes, uncounted, into the same pocket as transport and tomatoes. Six months later the work was real but the profit is a rumour. The cure is not an accountant — not yet. The cure is four small habits, all of them things you already know how to do, applied to your own money with the discipline you have been applying to other people's systems since lesson one.",
      ),
      p(
        "Habit one: separate the money. A second account — the bank app lesson's two accounts, now with a purpose — receives every business payment and pays every business cost; personal money is transferred out like a salary, decided, not nibbled. Habit two: record every in and out, weekly, fifteen minutes — the weekly money list from lesson eighty-four, grown up: what came in, from whom; what went out, for what. A notebook works; a spreadsheet works better; the discipline works best of all. Habit three: split every payment the day it lands — set aside a slice for tax, because the government's interest in small business is maturing here too, and a slice for rain, because laptops die in the middle of jobs and clients do not extend deadlines for fun. What remains is profit you can actually spend, without owing anybody.",
      ),
      fig(
        "/images/blog/money-two-accounts.jpg",
        "Two bank cards and a small ledger notebook on a desk, one card marked for business.",
        "The wall between the pockets. One account receives and pays for the work; the other feeds the house. Nibbling dies here.",
      ),
      h2("Habit four: reconcile, monthly"),
      p(
        "Once a month, the quiet hour: download the statement — the bank lesson showed where it lives — and sit it beside your own records. Every entry on one should sit on the other. The transfer that never landed. The subscription you meant to cancel, still drinking. The client's payment recorded twice in hope. The reconciliation is the spreadsheet lesson's when-the-cell-looks-broken, applied to life: a difference found now is a one-line fix; the same difference found in December is a mystery novel. And when the year closes, the books answer the questions that decide next year with numbers instead of vibes: which work actually paid, which clients actually pay, what the business costs to run before a single naira of profit.",
      ),
      p(
        "The tools, honestly: begin with notebook or spreadsheet — you own both skills already. When volume justifies it, a small bookkeeping app or a part-time accountant earns their fee, and the books you kept make hiring them a week's work instead of an archaeology. What no tool supplies is the habit; and no investor, no loan officer, no visa officer, no big client will ever take your business more seriously than your books do. The shop that keeps books is a business. The one that does not is a habit.",
      ),
      fig(
        "/images/blog/ledger-weekly.jpg",
        "A hand writing a week's figures into a ruled notebook beside a phone showing a bank statement.",
        "Fifteen minutes, once a week. The notebook and the statement, agreeing. That agreement is what a business calls profit.",
      ),
      ul([
        "Open the second account this week, even if the first payment has not arrived. Build the wall before the water.",
        "Book the weekly fifteen minutes in the calendar — in and out, every week, no exceptions, no heroics.",
        "Split on arrival: tax slice, rain slice, then spend. The percentages are yours; the order is not negotiable.",
        "Reconcile on the first Saturday of the month. Statement against records, line by line, until they agree.",
      ]),
      h2("The books are the business's own portrait"),
      p(
        "One reframe to close: the books are not bureaucracy. They are the honest mirror the bank lesson taught you to read for your employer's sake — read now for your own. The weekly list, the split on arrival, the monthly hour: together they turn a person who earns into a business that lasts, and they answer, at last, the question every worker on this shelf deserves to ask precisely: is this working? Now you will know, to the naira.",
      ),
    ],
  },
  {
    slug: "secrets-that-are-not-yours",
    title: "Secrets that are not yours",
    excerpt:
      "Professional work means holding other people's keys: their data, their logins, their files. Confidentiality in ordinary words — what you may see, what you may keep, what you must never carry.",
    series: SERIES,
    order: 144,
    author: AUTHOR,
    date: "2026-07-10",
    cover: "/images/blog/client-files-locked.jpg",
    coverAlt: "A laptop with a lock screen turned away from visitors on a tidy desk, files closed beside it.",
    body: [
      p(
        "The moment a client pays you, you begin holding things that are not yours: their customer list, their invoices, their unfinished plans, sometimes their logins. They did not hand these over because they are careless — they handed them over because the work requires it, the way a tailor is trusted with cloth already cut for a wedding. What you do with that trust, between delivery and long after, is called confidentiality, and in every profession on this shelf it is not a legal decoration. It is the trade itself, written down.",
      ),
      p(
        "The rules, in ordinary words. See only what the work needs: the brief that requires the customer list earns access to the customer list; curiosity about the rest of their files does not. Keep it where it belongs: client work on client folders, on your machine, behind your screen lock — the locking lesson, the shared-machine lesson, all of it now protecting other people's houses, not just yours. Carry nothing away: their files do not travel to your personal Drive, their customer list never becomes your marketing list, and the report you wrote for one client does not moonlight in another proposal. And when the job ends, the keys go back: logins changed or access revoked, your copies of their working files deleted or handed over whole, whichever was agreed. A tailor does not keep the wedding cloth.",
      ),
      fig(
        "/images/blog/client-files-locked.jpg",
        "A laptop with its lock screen turned away from visitors on a tidy desk, working files closed beside it.",
        "The desk of a person who holds other people's keys. The screen locks itself; the folders close; the curiosity stays outside.",
      ),
      h2("Logins, screenshots, and the paper that says secret"),
      p(
        "Three situations deserve their own lines. Logins: a client may hand you theirs to do the work — collect it in a way you can return, never reuse their password anywhere of your own, never save it into your personal browser on a shared machine, and ask them to change it when the job ends; better still, ask them to create an access for you that they can switch off. Screenshots for the portfolio: take them with permission, crop the sensitive rows, and remember that one customer's name in a case study is somebody's data — the witness line lesson assumed the client says yes to being shown; the data never did. And the paper: some clients will hand you an NDA — a non-disclosure agreement, a page that says what you may tell others, for how long. Read it the way you read any contract, ask about any line you do not understand, and keep your signed copy with the papers in Drive. The NDA is not an insult. It is their family word, formalised.",
      ),
      p(
        "And the quiet everyday forms, because the big leaks rarely look dramatic: the project you mention too freely at a beer parlour, the screen facing the window in a café, the file shared to the wrong address — the sharing lesson's one wrong address, now wearing someone else's name. The professional's manner is boring and total: speak of clients' business only with clients, lock everything, share deliberately or not at all. One breach ends a trade career faster than any lack of skill; one kept secret, quietly held for years, is the reason the big clients come. Discretion compounds. So does its absence.",
      ),
      fig(
        "/images/blog/nda-signing-desk.jpg",
        "A hand signing a short agreement on a desk between two people, pens and a laptop nearby.",
        "The family word, on paper. What may be told, to whom, until when — agreed before the work, kept long after it.",
      ),
      ul([
        "Audit your access today: every client login, file and folder you hold. Return what the work no longer needs.",
        "Never reuse a client's password anywhere, and ask for access you can hand back, not keys you must keep.",
        "Ask permission before any screenshot leaves their work, and crop the data that is not yours to show.",
        "Signed an NDA? Into Drive it goes, beside the papers. Your copy is the memory that outlives your goodwill.",
      ]),
      h2("The trade inside the trade"),
      p(
        "Skills get you hired once; discretion gets you hired again, quietly, for years, by people who tell other people with money. Every profession that touches other people's machines — the analyst, the support engineer, the web builder, the accountant of lesson one hundred and forty-three — is trusted first and skilled second, because the files can be rebuilt and the trust cannot. Hold other people's secrets like your own OTPs. The street is watching, and it keeps better records than any ledger.",
      ),
    ],
  },
  {
    slug: "the-body-at-the-desk",
    title: "The body at the desk",
    excerpt:
      "The trade you chose is a sitting trade, and sitting is a hazard. Eyes, wrists, neck and back — the small arrangements that let a person work for decades instead of years.",
    series: SERIES,
    order: 145,
    author: AUTHOR,
    date: "2026-07-15",
    cover: "/images/blog/posture-desk-chair.jpg",
    coverAlt: "A person sitting properly at a desk, feet flat, screen raised to eye level on a stand of books.",
    body: [
      p(
        "Nobody warns you that typing is a physical trade. The tailor stands, the mechanic bends, and the person at the machine sits — for years — and the sitting collects its rent quietly: the eyes that blur by evening, the wrist that wakes you at night, the neck that no longer turns without opinion. The body is the only tool every career on this shelf shares, and like every tool here it works better maintained than repaired. This lesson is the maintenance manual, and it costs almost nothing.",
      ),
      p(
        "The arrangement first, because posture follows furniture. Screen raised so its top edge sits at eye level — on books, on a stand, on anything steady — so the neck stops hanging forward like a reading grandmother's. Back against the chair's back, or a cushion folded behind it; feet flat on the floor or on a box, not folded under you like a heron. Elbows near the sides, wrists level — not bent up over the keyboard's edge, which is where the wrist's slow trouble begins. The brightness lesson set your screen light; set your room's too, so the eyes are not reading a lamp in a cave. None of this needs money. It needs one deliberate hour of moving your furniture, once.",
      ),
      fig(
        "/images/blog/posture-desk-chair.jpg",
        "A person sitting properly at a desk, feet flat, screen raised to eye level on a stand of books.",
        "The one-hour arrangement: screen at eye level, back supported, feet down, wrists level. The neck, the eyes and the wrists all keep the same appointment.",
      ),
      h2("The eyes, the wrists, and the hourly debt"),
      p(
        "The eyes rule, learned and kept: every twenty minutes, look at something twenty feet away — out the window, down the corridor — for twenty seconds. It is called 20-20-20, it is free, and it is the difference between eyes that work at forty and eyes that throb at thirty-five; blink too, because staring screens dry them. The wrists: take the small breaks seriously — a minute of shaking out the hands every half hour, the stretch of the fingers backwards, gentle, the way you would stretch any worker's tool after repetitive lifting; and if tingling starts at night, that is not tiredness, that is a warning worth a clinic visit before it becomes a story. And the hourly debt: stand and walk for two minutes every hour — water, gate, window — because the studies all agree with grandmothers: the sitting itself is the hazard, and the body keeps books more honestly than any ledger of lesson one hundred and forty-three.",
      ),
      p(
        "One more, in the Nigerian register: the generator and the heat. A hot room tires a body faster than a long file, and the fan aimed at the room rather than the back of the neck saves the morning's stiffness; the machine's vents were cleared in an earlier lesson — clear your own cooling too, water, actual water, through the day. The work of this shelf is a long game — decades of Thursdays at a desk. The body is the colleague who attends every one of them. Arrange the furniture once, keep the small rules forever, and it stays a colleague instead of becoming a complaint.",
      ),
      fig(
        "/images/blog/eyes-break-window.jpg",
        "A worker standing at a window, looking out at the street, hands behind back, screen glowing behind them.",
        "Twenty seconds, twenty feet away, every twenty minutes. The oldest free medicine in the sitting trades.",
      ),
      ul([
        "Rearrange your desk this hour: books under the screen, cushion behind the back, box under the feet if needed.",
        "Set the 20-20-20 rhythm — a phone timer for a week will install it permanently.",
        "Hourly: two minutes standing, water taken, window visited. Debt avoided, not repaid.",
        "Night-time tingling in the hands is a clinic visit, not a character flaw. Go early.",
      ]),
      h2("The long game needs a body"),
      p(
        "The analyst lesson said the work asks for patience and calm; it quietly asks for vertebrae too. Every plan this chapter has made — the clients, the books, the decade of remote Fridays — assumes a body that can still sit, see and type when the plan matures. Maintain the only tool you cannot replace, and the sitting trade stays what it should be: a livelihood that lifts nothing heavier than a laptop, carried lightly for forty years.",
      ),
    ],
  },
  {
    slug: "learning-in-public",
    title: "Learning in public",
    excerpt:
      "Share what you learn, ask questions worth answering, and let the next person watch you climb. The habit that compounds a course into a career — and strangers into colleagues.",
    series: SERIES,
    order: 146,
    author: AUTHOR,
    date: "2026-07-19",
    cover: "/images/blog/question-post-forum.jpg",
    coverAlt: "A person typing a question into an online forum on a laptop, notebook open beside them.",
    body: [
      p(
        "Here is the difference between the people who finish and the people who stall: the finishers let others watch. They post the small win — first pivot table, first page live, first repaired machine — and answer the beginner's question behind them, and in doing so turn a private course into a public track record. Learning in public is not self-promotion. It is the each-one-teach-one lesson pointed forward: you teach what you just learned while it is still warm, and the teaching is what makes it yours.",
      ),
      p(
        "The mechanics are modest. After each week of learning, write three sentences somewhere others can see: what I set out to learn, what actually happened, what I will try next. Post it where your people are — the platform of your trade, a group, the profile lesson's page. Share the artefacts, not just the verdicts: the screenshot of the chart, the before-and-after of the site, the photo of the opened laptop — the portfolio lesson's raw material, produced as a by-product of studying. And answer downward: the question a newcomer asks that you can now answer is your rent for the questions you are about to ask above. Communities remember who answered.",
      ),
      fig(
        "/images/blog/question-post-forum.jpg",
        "A person typing a question into an online forum on a laptop, notebook open beside them.",
        "The question, asked well: what I tried, what happened, what I expected. Half the answer is already in the asking.",
      ),
      h2("How to ask, and how to find the mentors"),
      p(
        "Asking is a skill with manners, and the help lesson wrote them: search first — the answer may already be standing there; show what you tried — the error, the steps, the version, not a shrug and do it for me; and close the loop — return and say what worked, because the person who answers you tomorrow reads whether you came back today. Do this and something quiet happens: the people a level above start recognising your name as the one who asks well and reports back. That recognition is what people call finding a mentor, and it cannot be demanded — it is awarded, in comments and DMs and eventually in referrals, to the visible climber, never to the invisible one.",
      ),
      p(
        "Keep the shelf's guard up while you are open: the forward-that-lies circulates in learning groups too, the gurus selling container-loads of courses you do not need, the helpers who DM with fee-bearing salvation — the job-scam lesson's costume, reborn as mentorship. Verify before you forward, pay for structure when you have inspected the structure, and never send anybody money to be taught what a free video teaches. The public road you are walking is real. It simply has the same street traffic every road here has always had — and you already know how to walk among strangers.",
      ),
      fig(
        "/images/blog/community-meetup-laptops.jpg",
        "A small group of learners around a table with laptops, one person pointing at a screen while others watch.",
        "The room builds itself: one learner, one table, one hour — and the questions get better every month. You are somewhere in this photograph.",
      ),
      ul([
        "After every week of learning, post three sentences: aimed, happened, next. Pick your day and keep it.",
        "Share the artefact with the verdict — screenshot, before-and-after, opened machine. Proof collects itself.",
        "Ask by the help lesson's manners: searched, tried, error shown. Close every loop you open.",
        "Answer one beginner's question for every question you ask. The rent keeps the whole floor standing.",
      ]),
      h2("The compounding of being seen"),
      p(
        "A year of learning in public leaves a strange residue: a timeline of a person who keeps showing up, a small library of answers under your name, strangers who forward you work with the words I have been watching you. The certificates lesson will say what papers prove; this lesson says what presence proves — persistence, honesty about the struggle, and the habit of finishing in daylight. The portfolio shows what you did. The public trail shows who you are. Clients and employers read both, and only one of them builds itself while you learn.",
      ),
    ],
  },
  {
    slug: "when-a-client-goes-quiet",
    title: "When a client goes quiet",
    excerpt:
      "The work is delivered; the phone goes silent. Chasing payment with dignity: the gentle ladder, the documents that win disputes, the pause of work, and when to walk away.",
    series: SERIES,
    order: 147,
    author: AUTHOR,
    date: "2026-07-24",
    cover: "/images/blog/payment-reminder-phone.jpg",
    coverAlt: "A hand holding a phone showing a politely worded payment reminder message.",
    body: [
      p(
        "Sooner or later it finds every worker on this shelf: the job was done well, the thanks were warm — and then the silence. No payment, no reply, and a new arrangement of the same five words in your head every morning. This lesson is the ladder for that week, because chasing money with dignity is a skill like any other on this shelf: it has steps, and each step keeps both the money and the name possible.",
      ),
      p(
        "Step one, the gentle reminder, days not hours after due: a short, warm, unashamed message — hello ma, the site went live on the 4th; the balance of the invoice below is due; here is the account again. No apology, no anger; you are reminding, not begging — the invoice lesson's paper speaking for you. Step two, a week later, the restatement: the same message, plainer, with the invoice attached again and a date — by Friday I would need this settled to keep the site maintained. Step three, the pause of work: maintenance stops, access pauses, the next phase waits — politely announced, not ambushed; clients rediscover invoices remarkably fast when the thing they paid for stops breathing. Step four, escalation that does not need shout: a formal demand letter — plain words, dates, amount, your signature; small claims courts here handle exactly these sums; and a client association or platform dispute channel where one exists. What you never do: insult, threaten, or disgrace anybody publicly — the anger post costs more than the debt, and the street remembers the poster, not the debtor.",
      ),
      fig(
        "/images/blog/payment-reminder-phone.jpg",
        "A hand holding a phone showing a politely worded payment reminder message.",
        "Step one: short, warm, unashamed. The invoice attached speaks; the tone keeps the door open for the money and the next referral.",
      ),
      h2("The documents that win"),
      p(
        "Disputes are not won by volume; they are won by paper, and you have been building the paper all along: the written quote saying what would be delivered, the deposit receipt, the update messages tracing approvals, the delivery message, the invoice. Screenshot them in order, and any argument becomes a timeline instead of a quarrel — the analyst lesson's evidence, gathered at a kitchen table. And prevention, because this ladder is best never climbed: deposits before work, balance before handover of final files for new clients, maintenance paid in advance. The pricing lesson's rules are not formality — they are the walls that make the quiet-client week rare instead of seasonal.",
      ),
      p(
        "Then the two verdicts only you can deliver. When to forgive: the client who truly fell on hardship, whose silence was shame not scheme — weigh the history, accept the part-payment, close the file with grace; charity belongs somewhere in every working life, and it is only charity when you chose it. And when to walk away: the client who pays small, owes big, and costs you the one thing you cannot invoice — the months of attention. Fire a client the way the ladder runs, politely and on paper, and give the recovered hours to the ones who pay. The books of lesson one hundred and forty-three will show you something within a year: the quiet clients were never in the profit column at all.",
      ),
      fig(
        "/images/blog/dispute-documents-table.jpg",
        "A table with printed messages, an invoice and receipts laid out in date order, a hand pointing at one.",
        "The timeline instead of the quarrel. Quote, deposit, approvals, delivery, invoice — the paper argues so you do not have to shout.",
      ),
      ul([
        "Chase in steps, spaced by weeks: warm reminder, plain restatement, paused work, formal demand. Never skip a step in anger.",
        "Announce pauses, never ambush. The work stops breathing politely, in writing, with a restart price.",
        "Keep the timeline together from day one — quote, receipts, approvals. Disputes are won in the folder, not the fight.",
        "New client? Balance before final handover. The lesson that prevents this one is cheaper than this one.",
      ]),
      h2("The name and the naira"),
      p(
        "Every step of the ladder protects the same two assets: the money and the name. Run it cold and you usually recover the naira and occasionally the client, who respects being reminded in sentences they could not fault. Run it hot and you keep neither. The working life will always contain a quiet client or two — the shelf cannot legislate other people's pockets. It can make you the person whose paperwork never flinches, whose tone never drops, and whose next client never gets the chance, because the deposit was taken before the first line of work.",
      ),
    ],
  },
  {
    slug: "your-first-hand",
    title: "Your first hand: from freelancer to small studio",
    excerpt:
      "The day the work exceeds your hands is a good day with a hard question. Hiring your first person — paying fairly, teaching openly, checking quality, and the arithmetic of two desks.",
    series: SERIES,
    order: 148,
    author: AUTHOR,
    date: "2026-07-29",
    cover: "/images/blog/two-desks-small-studio.jpg",
    coverAlt: "Two desks facing each other in a small studio, two people working, one pointing at a screen.",
    body: [
      p(
        "There is a day in every solo worker's life when the diary says yes to more than the hands can do. Refusing work you cannot carry is the first answer, and often the wise one. But if the extra work keeps knocking — if turning it away becomes a habit — then the question has changed from can I do this to can somebody do this with me. That question, asked honestly, is the birth of every studio, agency and small firm on your street. This lesson is the first hire, done properly.",
      ),
      p(
        "Begin with what you know how to teach, because your first hand is not a genius you found; it is a person you will make good — the each-one-teach-one lesson, now wearing an employer's hat. Look where you already look for proof: the learning-in-public trail, the community answers, the small portfolio that shows finishing, not just flair. Pay fairly — the pricing lesson pointed at you now: know the floor of the work, pay above it, and pay on time, every time, without being chased; nothing travels faster on a street than an employer whose alert arrives late. Agree terms in writing even for a friend — the days, the pay, who owns the work — because the written quote lesson protects employers exactly as it protects freelancers. And start deliberately small: one paid trial project, reviewed honestly, before any standing arrangement. A trial is kindness — it lets both sides walk away cheap.",
      ),
      fig(
        "/images/blog/two-desks-small-studio.jpg",
        "Two desks facing each other in a small studio, two people working, one pointing at a screen.",
        "The arithmetic of two desks. The work doubled; the checking doubled too. The pointing at screens is the quality control.",
      ),
      h2("The part nobody warns you about"),
      p(
        "The moment a second hand joins, your work changes shape: a part of every week is now checking, teaching and deciding — and that part is the job. Quality control is the whole reputation: their work goes out under your name, so everything is reviewed before the client ever sees it — not because the hand is careless, but because the name is yours and the standard must be one. Teach the reasons, not just the steps — the teach lesson's law — because a hand who knows why the deposit comes first, why the update goes unasked, why the client's secret stays sealed, becomes a second standard instead of a second risk. And share the why of the business too: what a job actually pays, why a client was declined, what the books say. Hands who see the whole board protect it like owners.",
      ),
      p(
        "The arithmetic, kept honest by the books: your hour is now worth what the business earns divided by everything it pays — and the hire only makes sense while the hands you freed bring in more than the hands you pay. Watch it monthly, in the ledger of lesson one hundred and forty-three, and be brave enough to shrink as well as grow; a studio of two that lasts beats a studio of five that folds owing wages. But when it holds — when two desks hum and the checking hour becomes the best hour of your week — you will feel the real promotion happen: from person who works, to person who makes work. That is not a bigger ego. It is a bigger table, and the street eats from it.",
      ),
      fig(
        "/images/blog/paying-hand-first-wage.jpg",
        "An envelope of naira notes and a written payslip being handed across a desk, a handshake above them.",
        "The first wage, on time, in full, with a payslip. The street keeps its own payroll of employers — make sure yours is the good list.",
      ),
      ul([
        "Hire for finishing, teach for flair. The public trail of a learner predicts more than any interview performance.",
        "Written terms, fair pay, paid on time. You know what chasing feels like; do not become it.",
        "Everything reviewed before it reaches the client. The name on the door signs every page.",
        "Watch the arithmetic monthly in the books. Grow when it holds; shrink before it breaks.",
      ]),
      h2("The table grows"),
      p(
        "One hundred and twenty taught one person at a table. One hundred and forty-eight is the same table with a second chair — and the same laws: teach the reasons, pay the fair price, keep the written word, hold the standard when nobody is watching. Studios do not die of smallness; they die of forgotten laws. Keep them, and the second chair becomes a third, and the shop you once sat in as a stranger becomes the shop where somebody else learns what a Friday alert feels like — on time, in full, with a future behind it.",
      ),
    ],
  },
  {
    slug: "certificates-and-the-track-record",
    title: "Certificates, exams, and the track record",
    excerpt:
      "When a certificate opens a door and when it merely decorates a wall — how to prepare for the exams that matter, and how to keep the proof that outranks every paper.",
    series: SERIES,
    order: 149,
    author: AUTHOR,
    date: "2026-08-01",
    cover: "/images/blog/exam-study-desk.jpg",
    coverAlt: "A focused candidate at a desk with past papers, a laptop and a small calendar marked for an exam date.",
    body: [
      p(
        "Sooner or later the question arrives with the job adverts: certified preferred. The certificates lesson of this chapter said what papers do not prove; this lesson says, fairly, what they do — and how to earn the ones worth their fees. Because the honest position is not certificates are useless and it is not collect them all. It is: some doors are genuinely locked without them, and the skill is knowing which.",
      ),
      p(
        "Where certificates genuinely matter. Regulated and corporate doors: the support and security tracks — the CompTIA family, the cloud platforms' own exams — are asked for by name in the adverts of lesson one hundred and twenty-one's world, and government or large-corporate shortlists filter on them mechanically. Contracts and procurement: a vendor certificate on the wall settles a client's committee faster than any portfolio. And the personal case: a structured exam forces the systematic study that self-taught trails allow you to dodge — the fence-check lesson applied to your own gaps. Where they matter little: creative and client-facing trades — nobody asks the designer of lesson one hundred and thirty-seven for a certificate; they ask for the rack. And they never, anywhere, replace the portfolio — the paper opens the door, the track record closes the room.",
      ),
      fig(
        "/images/blog/exam-study-desk.jpg",
        "A focused candidate at a desk with past papers, a laptop and a small calendar marked with an exam date.",
        "Preparation is a calendar, not a mood. Past papers, one section a night, the date circled — the course-finisher's discipline, one last time.",
      ),
      h2("Preparing like a professional"),
      p(
        "Pick one exam, the one the adverts you actually want keep naming — not the collection the internet is selling this month. Book it: a real date, a real fee, paid — the deposit lesson applied to yourself; nothing concentrates study like a receipt. Then the working method: the syllabus as the fence check — walk your own knowledge against the official list of topics, mark the weak boards honestly; one section a night, the ten-honest-minutes rule grown into a season; and past questions early and often, because every exam has a grammar and the grammar is learnable. Study groups from the learning-in-public lesson multiply this — and the exam fees are real money, so put them in the books as what they are: an investment with a door at the end, chosen once, passed once.",
      ),
      p(
        "After the pass: the certificate goes into Drive with the papers, a line goes onto the profile and the CV, the learning-in-public trail hears about it — and then the paper does its one job, at the door, once. What happens in the room after is the portfolio's whole jurisdiction: the dashboard you can build, the machine you can fix, the client you can keep. Keep both ledgers current — the certificates and the track record — and you become the rare thing every employer is actually shopping for: a person whose paper tells the truth about them, and whose work keeps proving it true.",
      ),
      fig(
        "/images/blog/certificate-frame-shelf.jpg",
        "A framed certificate on a shelf above a desk, beside a laptop showing a live project of real work.",
        "The two ledgers, displayed together. The paper opened the door; the screen on the desk is why the room said yes.",
      ),
      ul([
        "Choose one exam — the name in the adverts you actually want — and book a real date this month. The fee is the focus.",
        "Walk the syllabus like a fence check: strong boards, weak boards, and a study calendar that touches the weak ones nightly.",
        "Past questions from week one. Every exam has a grammar; learn the grammar while you learn the content.",
        "After the pass: Drive, profile, CV, community — then back to the work. The paper opens doors; only the work keeps rooms.",
      ]),
      h2("The truth about doors"),
      p(
        "A career on this shelf is a long corridor of doors, and it helps to stop resenting the locks: some were installed by committees, some by law, some by simple habit — and most open to the combination the market has always honoured, proof on paper and proof in hand. Carry both, and the corridor keeps opening. Carry one, and you will spend your years explaining the other. You already know how to build the proof in hand. This lesson was the cheaper half — a calendar, a syllabus, and a receipt.",
      ),
    ],
  },
  {
    slug: "the-working-life",
    title: "The working life",
    excerpt:
      "The last note of the chapter is about the years: routines that survive motivation, integrity that survives temptation, and a career walked one honest Thursday at a time.",
    series: SERIES,
    order: 150,
    author: AUTHOR,
    date: "2026-08-06",
    cover: "/images/blog/morning-routine-desk.jpg",
    coverAlt: "A tidy desk at morning: laptop closed, notebook open with the day's three lines written, tea steaming.",
    body: [
      p(
        "This chapter taught you to be hired, to be paid, to hold secrets and to hold your ground. None of it mentioned the thing that actually decides the career: the years between the Fridays. The working life is not made of breakthroughs. It is made of ordinary Tuesdays, done on purpose, for a long time — and the people you admire on this shelf are people who found a way to keep showing up to their own desks after the excitement moved somewhere else. This last note is about that keeping.",
      ),
      p(
        "Routines that survive motivation, because motivation will not survive the year. The morning page — three lines written before the noise: today's one real thing, its first small step, what can wait; the deep hour — one protected hour, earliest and quietest, given to the work that compounds — the skill, the portfolio, the books — before the inbox donates your day to other people's priorities; and the weekly review — Friday, thirty minutes: what was delivered, what was learned, what next week owes whom. None of it is glamorous; all of it is the hidden machinery behind every smooth career you will ever envy. The ten honest minutes of lesson three, grown into a working life.",
      ),
      fig(
        "/images/blog/morning-routine-desk.jpg",
        "A tidy desk at morning: laptop closed, notebook open with the day's three lines written, tea steaming.",
        "The machinery of the years: three lines, one protected hour, a Friday review. The career is what these quietly accumulate into.",
      ),
      h2("Integrity, and the long game"),
      p(
        "The years will also test the manners this shelf taught, and the tests grow quieter as you rise: the shortcut nobody would see, the secret that would fetch a price, the number that would be kinder rounded, the client who suggests what the law calls something else. The working life's rule for all of them is the family word's rule, scaled: your name is the envelope every future opportunity travels in, and it is spent in seconds and rebuilt in years. Keep the receipts, keep the secrets, keep the standard when the client does not check — not because someone is watching, but because the watching comes later, always, in the form of the biggest opportunity of your life asking around about you.",
      ),
      p(
        "And patience, the last skill: careers here are seasons, not sprints — the learning season, the proof season, the name season, the harvest that arrives while you were busy working and forgot to notice. There will be dry months the books cannot explain and loud months the diary cannot hold; walk both at the same steady pace, with the same Thursday hour, and let compounding do what drama cannot. One hundred and fifty notes ago you sat before a dark screen, afraid of breaking something. Now the screen is your market, your school and your street, and you know what every generation of this academy has learned at these tables: the machine was never the miracle. The person who kept showing up was. The shelf stays open. Go and work.",
      ),
      fig(
        "/images/blog/long-road-signpost.jpg",
        "A quiet road at golden hour with a simple signpost, a figure walking with a bag, unhurried.",
        "The long game, at its true pace: one road, one walker, one season at a time. The shelf stays open behind you. Go and work.",
      ),
      ul([
        "Install the machinery this week: three lines each morning, one protected hour, the Friday thirty minutes. Let the calendar carry what motivation cannot.",
        "Write your own short list of will-nots — the secrets, shortcuts and rounded numbers you have already declined in advance.",
        "Name your season honestly — learning, proof, or name — and let this week's hour serve that season, not another's.",
        "When a dry month comes, and it will: shrink the plan, keep the hour. The pace is the promise.",
      ]),
      h2("The shelf stays open"),
      p(
        "These notes began as class notes for beginners in Port Harcourt and grew, one lesson at a time, into the whole walk — from the first sitting to the working years. They remain free, they remain yours, and they remain best used the way the last lesson of every chapter has said: taught onward. Somewhere near you is the person lesson one was written for — the dark screen, the plastic oval, the fear. Hand them the shelf. Sit with them for ten honest minutes. Then go back to your desk, and keep showing up. That is the whole of it. That was always the whole of it.",
      ),
    ],
  },
  {
    slug: "checking-results-online",
    title: "Checking results and admissions online",
    excerpt:
      "WAEC, NECO, JAMB: the portals, the tokens, the careful typing of exam numbers — and the one scam that hunts results season every single year.",
    series: SERIES,
    order: 151,
    author: AUTHOR,
    date: "2026-08-11",
    cover: "/images/blog/results-portal-phone.jpg",
    coverAlt: "A young person checking an exam result on a phone at a table, pen and scratch card nearby.",
    body: [
      p(
        "Three letters rule results season in this country: WAEC, NECO, JAMB. The results no longer wait in long queues or notice boards — they live on portals, behind a token or a PIN, and the person who can check a result calmly, correctly and cheaply has a small superpower every July and August. This lesson is that superpower, and the one trap that hunts it every single year.",
      ),
      p(
        "The pattern is the same on every board's portal, so learn it once: go to the official address — the board's own site, typed yourself or reached from its verified page, the government-portals lesson's law — buy or already hold your checker token or PIN, enter your exam number exactly as it sits on your photo card, choose your exam year, and submit. The exam number is the whole exam's identity; one swapped digit returns somebody else's silence or somebody else's shame. Type it slowly, twice, from the card itself — not from memory, not from a cousin's WhatsApp message. Then the slip: screenshot it, and download or print the proper PDF into the Papers folder in Drive where the certificates live. A result that exists only in a gallery is one stolen phone from becoming a rumour.",
      ),
      fig(
        "/images/blog/results-portal-phone.jpg",
        "A young person checking an exam result on a phone at a table, pen and checker card nearby.",
        "Exam number from the card, not from memory. The slip saved the same hour — the papers lesson, applied to the day's harvest.",
      ),
      h2("Admissions, and the trap"),
      p(
        "For admissions, the portal is also the truth: JAMB's CAPS shows an admission the moment it is offered, and accepting it there — on the portal, in your own account — is what makes it real. Check with your registration number, at your pace, yourself. Which brings the season's professional liar: the result upgrader. Somebody in a comment section or a quiet DM says they can upgrade a 4 to a 5, change a course, unlock a withheld result — for a fee, quietly, today only. Hold it beside the shelf's oldest tells: hurry, secrecy, fee, and now a fourth — a stranger claiming power over an institution's records. No upgrader has ever touched a board's database. They harvest the fee and the hope, and the candidate discovers both facts at the same painful printout. Results are appealed through the board's own processes, in writing, at its own offices — never through a helper with a data plan.",
      ),
      p(
        "Parents and guardians: the same lesson, taught sideways. Do not outsource the checking to a café stranger who then holds the candidate's numbers and photos hostage to extort a gratitude fee. Sit with the candidate, type the number together, save the slip together. The café earns honestly when it provides the printer and the light — the account, the numbers and the checking remain the family's.",
      ),
      fig(
        "/images/blog/result-slip-printed.jpg",
        "A printed result slip lying on a table beside a phone showing the same result, reading glasses resting nearby.",
        "Two copies, one truth: the printout for the file at home, the PDF in Drive for the world. The upgrader's fee saved is a semester's respect kept.",
      ),
      ul([
        "Type the board's official address yourself; bookmark it. Adverts above the result are not the result.",
        "Exam number from the original card, typed twice, slowly. Then slip: screenshot, PDF, Papers folder.",
        "Admissions are accepted on the portal itself, in your own account. CAPS is the truth; screenshots of CAPS are not.",
        "Nobody can upgrade a result. The fee is the product. Appeals go to the board, in writing, in person.",
      ]),
      h2("The season, handled"),
      p(
        "Results season rewards exactly what this shelf has taught all along: the real address, the careful typing, the slip kept, the hurry refused. A family that can check its own results, accept its own admission and file its own slips has retired one of the season's oldest taxes — paid to queues, to cafés, and to liars. The next lesson stays at the family table, where the phones are smaller and the stakes are the children.",
      ),
    ],
  },
  {
    slug: "the-family-table",
    title: "The family table: phones, kids, and parental controls",
    excerpt:
      "Children inherit our screens before our manners. Family Link, app approval, the bedtime rule that binds adults too — raising the next generation of users without a fight.",
    series: SERIES,
    order: 152,
    author: AUTHOR,
    date: "2026-08-16",
    cover: "/images/blog/family-table-phones.jpg",
    coverAlt: "A family at a living-room table, a parent guiding a child's hands on a small tablet.",
    body: [
      p(
        "A child in this country meets a screen before they can read, and long before they can judge what the screen says. The family that handles this well does not ban the phone and does not surrender to it. It does what this whole shelf has done for adults: names the parts, sets the rules, teaches the reasons. This lesson is the same education, one generation down — and it begins with a confession: the child is watching how you use yours.",
      ),
      p(
        "The tooling first, because it is free and already built. On the child's Android phone, Google's Family Link — the family-table lesson's gatekeeper — lets a parent approve every app install before it lands, set sensible daily limits, see where the hours go, and pause the whole device at bedtime from the parent's own phone. On the video platforms, the kids' versions exist precisely so the algorithm is not raising the child; turn them on. On the browser, safe search is a setting, not a prayer. None of this replaces the conversation — it holds the fence while the conversation does its work, the way the second lock holds the door while the manners keep the street.",
      ),
      fig(
        "/images/blog/parental-controls-screen.jpg",
        "A parent's phone showing a child's device controls: daily limit and an approval screen, UI slightly soft.",
        "The fence, not the warden. Approve the installs, set the bedtime, and spend the saved arguments on the real teaching.",
      ),
      h2("The rules that actually teach"),
      p(
        "Three rules, taught with their reasons the way lesson one hundred and twenty taught the elders. The name rule: in games and chats, a child never uses their real full name, school, street or photographs of themselves — strangers online are strangers, and the manners of the compound apply at every screen. The tell rule: anything that frightens, anything that asks for pictures, anything that says do not tell your parents — shown to a parent, immediately, without punishment; the child who is punished for reporting learns to hide, and hiding is the only real danger. And the table rule: phones sleep outside the bedroom at night — every phone, parents' included, in one basket by the sitting-room door; the child who watches you obey it learns more than any setting can teach.",
      ),
      p(
        "And teach downward with the shelf itself. The child who can play is ready to learn: the typing games, then the files lesson softened, then the pause before a link — the same curriculum, age-bent. A teenager can read lesson six and seven as their own; a twelve-year-old can run the family's WhatsApp backup. The greatest parental control was never an app. It is the child who grows into a user who understands the machine — because somebody sat beside them, ten honest minutes at a time, and named the parts out loud.",
      ),
      fig(
        "/images/blog/child-typing-supervised.jpg",
        "A child typing on a laptop at a family table while a parent sits close, watching and smiling.",
        "The best filter ever installed: a parent within reach. The screen teaches; the table decides what it may teach.",
      ),
      ul([
        "Set up Family Link on the child's device tonight — approvals on, a bedtime limit, kids' video profiles on.",
        "Teach the three rules with their reasons: name, tell, table. Write the last one where everybody, including you, obeys it.",
        "Practise the no-punishment rule until it is true. Children report dangers to safety, not to ambush.",
        "Give the child one small real task on the machine each week — typing practice, the backup, the calendar. Users are raised, not restricted.",
      ]),
      h2("The long inheritance"),
      p(
        "The children on your knees will run a country whose every road, market and classroom is a screen. What they will not pick up from school is judgement — that walks across the family table, one evening at a time: the rules kept, the reasons given, the example set by the adult whose own phone sleeps in the basket by the door. Restriction produces a sneaky user and a skilled liar. Teaching produces the person these notes have always been writing to. The next lesson returns to the working road, at its very first gate: the paper that decides who gets to interview.",
      ),
    ],
  },
  {
    slug: "the-cv-that-gets-read",
    title: "The CV that gets read",
    excerpt:
      "Most CVs die inside a machine before a human ever sees them. The plain format that survives the robot parser, the honest keywords that match the advert, and the one page that opens doors.",
    series: SERIES,
    order: 153,
    author: AUTHOR,
    date: "2026-08-19",
    cover: "/images/blog/cv-tailoring-desk.jpg",
    coverAlt: "A job seeker tailoring a CV on a laptop, the job advert open on a phone beside the keyboard.",
    body: [
      p(
        "The one-page honest CV of lesson seventy-five got its facts straight. This lesson gets it read — because between your CV and the employer's eyes now stands a machine. Big companies and job portals feed every CV into software that scans it for skills, ranks it, and shows a human only the top of the pile. The software — people call it an ATS, an applicant tracking system — is not clever. That is the tragedy and the opportunity: it rewards the plain, the ordered and the matching, and it quietly kills the beautiful, the creative and the strange.",
      ),
      p(
        "So the format that survives is boring, and boring is the strategy. One column, no text boxes, no tables, no photographs in odd corners — all of those scramble a parser the way a wrong file extension scrambles the open-with lesson. Standard headings the software recognises: Summary, Work Experience, Education, Skills, in that order. Dates beside every role in one honest pattern. A plain font, generous spacing, one page for the first decade of your life. Save as PDF, named firstname-lastname-cv, and your contact details as ordinary text — an email address and a phone number the machine can copy, not a designer's graphic the machine cannot read.",
      ),
      fig(
        "/images/blog/cv-tailoring-desk.jpg",
        "A job seeker tailoring a CV on a laptop, the job advert open on a phone beside the keyboard.",
        "The advert on the right is the answer sheet. Its honest words, carried into the CV on the left, are what the robot — and the human — are matching.",
      ),
      h2("The keywords, honestly carried"),
      p(
        "The scanner matches words, and the words it is matching are sitting in the advert. If the advert says customer service, the CV says customer service — not people management, not client relations, however truer your phrase may be. Read the advert twice, list its plain skill words, and carry the ones you truthfully own into your Skills and Experience lines, in the advert's own language. This is not deception; it is translation. The lie — claiming a skill you cannot demonstrate in the room — is the old tells again, and the interview is where it dies. But the honest absence — owning the skill and naming it in a word the scanner never sees — dies earlier, silently, unseen by any human who might have loved your experience.",
      ),
      p(
        "Then the tailoring, which is where the two-sentences lesson grows into a method: for each serious application, adjust the summary line and reorder the experience so the most relevant role reads first — fifteen minutes with the advert open on the phone beside the keyboard. Sprayed CVs read like sprays; tailored ones read like answers. The upload lesson then carries it through the portal door: right size, the bar finished, the tick screenshotted. The CV that gets read was never the prettiest. It was the one a machine could parse, a scanner could match, and a tired human could trust in ten seconds. Boring, matched, true — the three secrets of the paper that opens the room.",
      ),
      fig(
        "/images/blog/plain-cv-screen.jpg",
        "A laptop showing a clean one-column CV with plain headings and clear date lines.",
        "Boring is the strategy: one column, standard headings, honest dates. The machine reads it in seconds; the human reads it in ten.",
      ),
      ul([
        "Rebuild your CV in one column with standard headings. Test it: can you copy the text out of the PDF cleanly? Then the machine can too.",
        "For your next application: read the advert twice, list its skill words, carry your true ones in. Translation, not decoration.",
        "Tailor the top third per application — summary first, most relevant role first. Fifteen minutes, per door, every time.",
        "Ask a friend to read your CV for ten seconds and say what you do. If they cannot, neither can the scanner.",
      ]),
      h2("After the robot, the human"),
      p(
        "Everything the scanner does, it does to decide whose ten seconds of human attention you get. Win them, and the old laws resume: honesty in the room, proof in the portfolio, the manner of the guest. The machine is not your enemy. It is the first gateman of lesson one hundred and twenty-four — dull, fair, and completely readable, now that somebody has finally introduced you.",
      ),
    ],
  },
  {
    slug: "the-interview-on-a-screen",
    title: "The interview on a screen",
    excerpt:
      "The online interview is won before it begins: the test run, the window behind you, the camera at eye level, and the manners of a guest in somebody's parlour.",
    series: SERIES,
    order: 154,
    author: AUTHOR,
    date: "2026-08-24",
    cover: "/images/blog/interview-video-call.jpg",
    coverAlt: "A candidate in a video interview on a laptop, neatly dressed, a notebook beside the keyboard.",
    body: [
      p(
        "The interview used to begin when you walked through the office door. Now it begins on a screen — the hiring manager in Lagos, the panel in London, you in your bedroom with a data plan and a chance. The good news: the screen is a room you fully control, and the candidate who prepares the room as carefully as the answers is already ahead of most. This lesson is the preparation, in the order it should happen.",
      ),
      p(
        "The day before: the test run. Install or update the app the panel named — the meeting link says which — and make one test call to a friend: camera working, microphone working, headphones with a mic better again. Charge the laptop fully and keep the charger plugged in for the call; put the phone on silent in another room, and set a backup tap — the hotspot lesson — in case the Wi-Fi chooses the hour to misbehave. Then stage the room. Light from a window facing you, never behind you — a bright window turns you into a silhouette with opinions. The camera at eye level on a stand of books, so you are not looming down like a judge or grovelling up like a suspect. Behind you: a plain wall or a tidy shelf — the panel will see it and judge it, because humans cannot help themselves.",
      ),
      fig(
        "/images/blog/interview-video-call.jpg",
        "A candidate in a video interview on a laptop, neatly dressed, a notebook beside the keyboard.",
        "The room, rehearsed: window in front, camera level, wall plain, notebook open. The screen is your parlour — clean it like one.",
      ),
      h2("The hour, and the manners"),
      p(
        "Tell the house. A Nigerian interview call dies more often to a gate crash, a blender, or an unexpected visitor than to any technology — brief everybody whose noise can reach you, and put the generator on quiet standby if the grid is in one of its moods. Dress fully — yes, including what the camera cannot see; the stand-up-for-the-document surprise has ended careers at the two-minute mark. Join five minutes early, camera on, sitting already: the panel's first sight of you should be ready, not rising. Keep your CV open on the screen beside the call, your questions written in the notebook, a glass of water within reach.",
      ),
      p(
        "Then the old manners, on a new road. Look at the camera when you answer — the small dark dot above the screen — not at your own magnificent face; eye contact has simply moved address. Speak a touch slower than feels natural; networks eat consonants. When the connection stutters, stop, wait, ask did that land? — it reads as competence, not weakness. Answer in the letter's spirit: short, ordered, honest — one point at a time, the way lesson one hundred and fifty-six's emails will be written. And when it ends, thank them by name, leave the call before celebrating, and send the thank-you note the same day. The screen interview is still a visit: you are the guest, the panel is the parlour, and the oldest courtesy is the newest bandwidth.",
      ),
      fig(
        "/images/blog/interview-desk-setup.jpg",
        "A tidy interview desk from the candidate's view: laptop on books at eye level, headphones, CV printed, water glass, notebook.",
        "The pre-flight check, laid out: power, sound, light, notes, water. Everything within reach; nothing within earshot that can shame you.",
      ),
      ul([
        "Test call the day before: camera, microphone, headphones, backup hotspot. Two minutes of testing buys an hour of calm.",
        "Window in front of you, camera at eye level, wall plain behind you. Set it tonight, not at five minutes to the call.",
        "Brief the house and silence the phone in another room. The blender has ended more interviews than the network.",
        "Camera, not mirror: look at the dot when you answer. Then the same-day thank-you message.",
      ]),
      h2("The room you control"),
      p(
        "The office candidate competes in a room the employer built. You compete in a room you built — its light, its sound, its calm. That is not a disadvantage; it is a rehearsal. Every habit this lesson installs — the test run, the staged room, the briefed house, the early arrival — is the same discipline the remote lesson asked of the paid professional. Practise it at the interview, and you arrive at the job already fluent in its daily grammar.",
      ),
    ],
  },
  {
    slug: "slides-that-speak",
    title: "Slides that speak",
    excerpt:
      "The audience cannot read and listen at once, so the slide carries the lantern and you carry the talk. One idea per slide, letters for the back row, and the rehearsal that removes the fear.",
    series: SERIES,
    order: 155,
    author: AUTHOR,
    date: "2026-08-29",
    cover: "/images/blog/slides-projector-talk.jpg",
    coverAlt: "A speaker beside a projected slide in a small hall, the audience listening in shadow.",
    body: [
      p(
        "Sooner or later the working life asks you to stand in front of people and present — the church committee, the client, the class, the town meeting — and the laptop comes with the territory. The slides were invented to help, and they have mostly become a punishment: walls of tiny text read aloud to a suffering room. This lesson returns them to their job. The slide is the lantern; you are the talk. The moment the slide tries to be the talk, both die.",
      ),
      p(
        "The rules are few and merciful. One idea per slide — if the slide needs an and, it is two slides. Letters big enough for the back row: a title and at most a handful of short lines, in the poster lesson's discipline turned sideways — readable at a glance from a distance, or not at all. Few words, because the audience cannot read and listen to you at the same time; they will read, in silence, while your voice is wasted. So the slide shows the one number, the one picture, the one name — and your mouth carries the story. Two fonts, three colours, the designer's restraint. Images that mean something, not clip art that fills silence.",
      ),
      fig(
        "/images/blog/slides-projector-talk.jpg",
        "A speaker beside a projected slide in a small hall, the audience listening in shadow.",
        "The lantern and the talk. The slide glows with one idea; the room looks at one or the other, never fighting both.",
      ),
      h2("The preparation that removes the fear"),
      p(
        "Public fear of presenting is mostly fear of the machine betraying you, and that fear is treatable. Rehearse aloud once, with a timer, standing — the first run always surprises, which is its purpose. Learn the projector lesson's walk: if the venue matters, test the venue — the projector, the adapter, whether your laptop speaks its language — before the audience arrives, not during your introduction. Learn the presenter view, so your notes sit on your screen while the wall shows only the slide. Carry the slides on a flash drive and in your email, both, in the PDF lesson's spirit: the format that survives every machine. And arrive early enough to be the calmest person in the building.",
      ),
      p(
        "Then the delivery, which is smaller than the fear: face the room, not the wall — the audience gets your eyes, the screen gets your pointing hand. Speak slower than feels natural; rooms eat volume the way networks eat consonants. Pause after each big idea and let the silence hold it. And never, ever read the slide aloud with your back to the room — the audience read it before you finished turning. If a slide needs reading, that is what the handout is for: printed, or sent after, where it cannot compete with your voice. Do these small things and something wonderful happens on the third or fourth slide: the fear leaves, because the room starts nodding, and nodding is a conversation.",
      ),
      fig(
        "/images/blog/slide-big-font.jpg",
        "A laptop screen showing a single large slide: one big statement, one large number, nothing else.",
        "The whole art on one slide: one statement, one number, and a speaker who knows the rest by heart.",
      ),
      ul([
        "Rewrite your next presentation: one idea per slide, nothing smaller than back-row letters. Cut half the words; cut the slide that fights you.",
        "Rehearse aloud, timed, standing, once. The second time is for the room; the first is for the truth.",
        "Test the venue's projector or screen before the hour, and carry the slides twice — flash drive and email.",
        "Face the room. Pause after the big ideas. Send the handout after, never read it out during.",
      ]),
      h2("Why this is a basic skill"),
      p(
        "Because the person who can stand, lantern in hand, and make a room understand an idea in ten minutes becomes the person the room asks to explain things — and the person rooms ask to explain things is the person rooms promote, hire and recommend. The analyst's chart, the designer's concept, the teacher's lesson, the pastor's announcement: all of them ride on this one small machine craft. The lantern is cheap. The nerve is practised. Begin with the next staff meeting.",
      ),
    ],
  },
  {
    slug: "email-that-gets-answered",
    title: "Email that gets answered",
    excerpt:
      "A busy person answers mail between meetings, in twenty seconds each. The subject line that says the thing, the first sentence that asks, and the follow-up that is polite and shameless.",
    series: SERIES,
    order: 156,
    author: AUTHOR,
    date: "2026-09-01",
    cover: "/images/blog/email-subject-line.jpg",
    coverAlt: "A laptop screen showing a short email being composed with a clear subject line filled.",
    body: [
      p(
        "Your first email was written to be correct. This one is written to be answered — a different craft, because the person receiving it is drowning. A working professional clears a hundred messages a day between meetings, giving each about twenty seconds: open, scan, decide — reply, later, or never. The craft of email is winning those twenty seconds, and every rule below serves that one mercy: make it easy to say yes.",
      ),
      p(
        "The subject line is half the battle, because it decides whether the letter opens at all. It states the thing, in plain words, with the decision needed: Invoice 12 for approval — due Friday, not hello or quick question or, sin of sins, empty. The first sentence then does the second half of the work: it states the ask — I am writing to ask whether the budget can cover two more laptops this term. Not a warm-up paragraph about the weather of the matter; the ask, first, so a reader who can answer it in one line has already finished. Then the short middle: two or three tight paragraphs, one idea each, white space between — the letter lesson's manners with the analyst's economy. One ask per email. The letter asking for a meeting, a document and a decision gets sent to later, which is where letters go to die; the letter asking for one thing gets the reply today.",
      ),
      fig(
        "/images/blog/email-subject-line.jpg",
        "A laptop screen showing a short email being composed with a clear subject line filled.",
        "Twenty seconds of reading, structured for mercy: subject states the matter, first sentence asks, one decision needed. Answered by lunch.",
      ),
      h2("The follow-up, and the manners around it"),
      p(
        "Silence after two days is not rejection; it is a full inbox. The follow-up is not rude — it is professional, and it has a shape: three to five working days later, reply on the same thread — the history rises for them like a file reopened, and your subject line is already familiar — with one polite line: dear ma, floating this to the top of your inbox; the invoice approval is due Friday. No new thread, no guilt, no novel. If a second follow-up is needed, change something: shorten the ask, offer a call, or — for true deadlines — go up or around with care, copying the shared boss only when the matter is genuinely shared, the Cc lesson's law. The shameless follow-up, politely done, closes more deals in this country than brilliance ever has; the timid letter that dies quietly after one attempt was never answered because it was never seen.",
      ),
      p(
        "And the small courtesies that make your address a welcome one: the signature with name, role and phone — no quotations, no eight colours; the reply-all refused unless the whole corridor truly needs the thanks; attachments attached before sending, checked twice, the pocket lesson's rule; and the twenty-second mercy granted backwards — when you reply to others, answer the ask in the first line, so your name becomes the one inboxes are glad to see. Email is a reputation written one message at a time. The craft above is how yours becomes the easy yes.",
      ),
      fig(
        "/images/blog/email-inbox-zero.jpg",
        "A laptop showing a tidy inbox with few messages and two replies typed in short lines.",
        "The inbox, at peace. Every message answered in the first line makes your address the one that gets opened first.",
      ),
      ul([
        "Rewrite your next email: subject states the matter, first sentence asks, one ask only. Then send.",
        "Adopt the 3–5 day follow-up on the same thread, one line, no apology. Bury shame where it belongs.",
        "Read your sent folder this week: count the emails with no clear ask. That is why they died.",
        "Reply to others the way you wish to be replied to: answer first, manners after, signatures quiet.",
      ]),
      h2("The twenty-second gift"),
      p(
        "Every rule here is one mercy in two directions: it wins the reader's twenty seconds, and it buys your letter a life. The person whose emails are clear, short and easy to answer is not merely efficient — they are trusted, because clarity reads as competence and brevity reads as respect. Write the letter a busy person can say yes to, and busy people will keep opening yours first.",
      ),
    ],
  },
  {
    slug: "notes-that-last",
    title: "Notes that last",
    excerpt:
      "You will not remember Friday in March, so Friday must write to March. One home for every note, named and dated, reviewed weekly — the quiet system that turns busy weeks into a memory.",
    series: SERIES,
    order: 157,
    author: AUTHOR,
    date: "2026-09-06",
    cover: "/images/blog/notebook-system-desk.jpg",
    coverAlt: "An open notebook with dated notes beside a phone showing a notes app, pen across the page.",
    body: [
      p(
        "Here is a painful test: what did you agree on last Tuesday's call? Who told you the fee changed, and when? Most people cannot say, not because the memory is weak but because nothing was ever written where March could find it. The working life runs on notes — decisions, names, prices, promises — and the difference between people who seem organised and people who actually are, is not talent. It is one home, one habit, and ten minutes a week.",
      ),
      p(
        "One home. Not seven. Choose a single place where every note lives — a notes app on the phone and computer that syncs, or one good notebook always in the same bag pocket — and let it become boring with use. The scattered system is the failed system: the meeting note in the phone, the price on a card, the promise in a chat that has since sunk. Whatever you choose, the rules of the house are the ones you already keep elsewhere: every note gets a date and a title — 14 June, Chidi — generator quote — so the search box of the Ctrl+F lesson finds it in a blink next March. Capture fast, file weekly: in the meeting, thumb flying, spelling be damned; on Friday, ten minutes to tidy, tag and throw out the notes that seemed urgent and turned out to be noise.",
      ),
      fig(
        "/images/blog/notebook-system-desk.jpg",
        "An open notebook with dated notes beside a phone showing the same notes in an app, pen across the page.",
        "Two homes that are one home: paper for the meeting, the app for the archive. Every entry dated, every title honest, Friday tidies it.",
      ),
      h2("What to write, and the weekly review"),
      p(
        "Meeting notes have kept a four-line discipline for a century, and it survives every app: the date and the people; what was decided; who carries what, with a date; and what nobody agreed but somebody thinks happened. Write decisions in the room, and where you can, read them back aloud before the meeting ends — may I confirm, we agreed Friday for the delivery and Nana pays the courier — the sentence that has saved more working friendships than any contract. Personal notes follow the same bones: what happened, what it means, what I will do. And the photograph saves the paper world: a notebook page shot into Drive, the papers lesson's backup applied to your own handwriting, survives the bag, the rain and the taxi seat.",
      ),
      p(
        "The weekly review is where notes become a memory instead of a landfill. Friday, ten minutes: read the week's notes top to bottom, carry the unfinished whos and whens into next week's page, check every promise against the calendar, and — the part nobody regrets — search something old. Watch the search box find, in three seconds, the phone number you wrote in February and thought you would remember. That small miracle, repeated weekly, is the whole system paying rent. You will not remember Friday in March. Friday wrote to March, in a house March knows how to search. That is what organised people actually do, and from this week, so do you.",
      ),
      fig(
        "/images/blog/notes-app-phone.jpg",
        "A hand using a notes app on a phone, the list showing dated titled notes, one being edited.",
        "The archive in the pocket. Dated, titled, searchable — the meeting you half-remember is three thumb-taps from the truth.",
      ),
      ul([
        "Choose the one home today — app or notebook — and move tomorrow's notes there. Boring and faithful beats clever and abandoned.",
        "Date and title every note, always. Future-you searches titles, not vibes.",
        "Book the Friday ten minutes: tidy the week, carry the open whos and whens, search something old.",
        "Meetings: date, people, decided, who carries what by when — read back aloud before the room breaks up.",
      ]),
      h2("The memory you are building"),
      p(
        "A year of this system leaves you with something nobody can take to the cleaners: a searchable record of your own working life — every decision, every price, every promise and its date. It makes you the person who says as I wrote on the 14th instead of I think; it settles arguments before they start; and it compounds, quietly, into the professional's greatest advantage — knowing what actually happened. The books of lesson one hundred and forty-three keep the money honest. This keeps the weeks honest. Same discipline, smaller notebook.",
      ),
    ],
  },
  {
    slug: "the-pivot-table-properly",
    title: "The pivot table, properly",
    excerpt:
      "One thousand rows in, three sentences out, without touching a formula: select, drag, read. The spreadsheet's most respected tool, walked slowly in the series voice.",
    series: SERIES,
    order: 158,
    author: AUTHOR,
    date: "2026-09-10",
    cover: "/images/blog/pivot-table-screen.jpg",
    coverAlt: "A laptop showing a spreadsheet of sales rows beside a small pivot summary table.",
    body: [
      p(
        "The data analyst lesson named the pivot table as the most respected spreadsheet skill in the room. This lesson teaches it, slowly, because the respect is deserved and the fear is not: the pivot table is one of those machines that looks like sorcery and is actually a lever. Ten minutes here replaces hours of formula-copying, and the summary it builds never lies about where it came from.",
      ),
      p(
        "Picture the raw material first, because every pivot begins the same way: one solid block of rows — a thousand sales, a term's fees, a month's transactions — with one clean header row on top: Date, Item, Amount, Branch. Clean means the sorting lesson's rules: no merged cells, no blank columns inside, no notes wandering in row 40. Then the whole act: click once inside the block, choose Insert, then Pivot Table, and tell it where the new summary should live. The spreadsheet now offers you a small panel with four trays — Rows, Columns, Values, Filters — and the whole craft is dragging fields between trays and watching the summary rebuild itself. That is all a pivot is: a machine that groups your rows and counts or adds them, at your instruction, in seconds.",
      ),
      fig(
        "/images/blog/pivot-table-screen.jpg",
        "A laptop showing a spreadsheet of sales rows beside a small pivot summary table.",
        "One thousand rows in, three sentences out. The left panel is the raw truth; the right table is the lever's answer, rebuilt in one drag.",
      ),
      h2("A worked example, walked"),
      p(
        "Drag Item into Rows, and the table lists every product once, neatly, instead of the thousand messy times it appears in the data. Drag Amount into Values, and it adds the money beside each product — the machine chooses Sum because Amount is money; if you drag a column of names instead, it counts them, which is how you answer how many, not how much. Drag Branch into Columns, and the totals split side by side: this product, per branch, meeting in the corner cell. Drag Date under Rows above Item, and the months stack into a story of the year. Every question a small business asks its books — what sells, where, when, how much — is two or three drags away, and the pivot lesson's punchline is the analyst lesson's too: the summary is a lens, not a copy. Change nothing in the original block; refresh the pivot when the data grows, and the lens re-focuses itself. Formulas typed by hand into the summary cannot make that promise — a pivot's answer is always one refresh away from the truth.",
      ),
      p(
        "Then the finishing manners: sort the result — the biggest number to the top, the answer the boss actually asked; give the summary a title that states the question, June sales by branch, not PivotTable4; and where the summary must travel, copy it as values into a fresh sheet or PDF, the way every document on this shelf travels. Practise once on any data you own — the shop's book, the house expenses from lesson eighty-four — and you will feel the moment every analyst remembers: the thousand rows became one sentence, and you did not type a single formula. That moment is the door to lesson one hundred and thirty-one's whole career.",
      ),
      fig(
        "/images/blog/pivot-rows-drag.jpg",
        "A close view of a pivot panel on screen, a field being dragged from a list into the Rows tray.",
        "The whole craft in one gesture: drag the field, drop the tray, watch the answer build itself. No formula, no copy — one lever.",
      ),
      ul([
        "Clean the block first: one header row, no merges, no strays. The pivot is honest; it only summarises what is there.",
        "Walk the drags in order: Item to Rows, Amount to Values, Branch to Columns, Date to stack the months.",
        "Remember the lens rule: change nothing in the original data; refresh and the answer re-focuses.",
        "Title the summary with its question and sort it biggest-first. A pivot that needs explaining has a bad title, not a bad table.",
      ]),
      h2("The lever, not the magic"),
      p(
        "Nothing here required genius — only the willingness to select, drag and read, which you have been doing since the sorting lesson. That is the quiet joke of the spreadsheet world: its most respected tool is a two-minute skill wearing a fearsome name. Learn it once on your own books, and the next time somebody dumps a thousand rows in your lap and asks for the summary by Friday, you will smile the analyst's smile and say: give me five minutes.",
      ),
    ],
  },
  {
    slug: "health-online",
    title: "Health online, without the lies",
    excerpt:
      "Booking appointments, verified telemedicine, pharmacy delivery — and the hard rule the forward lesson left behind: symptoms go to professionals, never to a search box or a broadcast list.",
    series: SERIES,
    order: 159,
    author: AUTHOR,
    date: "2026-09-15",
    cover: "/images/blog/health-booking-phone.jpg",
    coverAlt: "A woman booking a doctor's appointment on her phone at a kitchen table.",
    body: [
      p(
        "The internet has become the front desk of Nigerian healthcare — appointments booked, doctors consulted by video, medicines delivered to the gate — and it works, when it is the real system. It also carries the most dangerous lie on this entire shelf: the health forward. This lesson walks both halves, because the same screen that brings a verified doctor to your parlour also brings the cure that skips the hospital, and the difference is the skill being taught here.",
      ),
      p(
        "The honest half first. Booking: many hospitals and labs now take appointments through their own portals, phone lines or verified WhatsApp lines — the government-portals lesson's law applies with extra force, because health fakes are cruel fakes; the address must be the hospital's own, reached from its verified page or a number you already trust. Telemedicine — a consultation by video or chat — is real and regulated: use platforms you can verify, whose doctors carry recognisable registration, whose reviews stretch over months, and whose fee is stated before the call, the pricing lesson applied to medicine. Pharmacy delivery is real too: licensed pharmacies deliver genuine medicines to your gate — check the seller's licence where the app shows it, check the medicine's packaging and expiry like you check a parcel at the gate, and keep every receipt. Then the records: prescriptions, test results, discharge summaries — scanned and named into the Papers folder in Drive beside the certificates, because in an emergency at midnight, the folder that has your mother's last test result is worth more than everything else on this shelf.",
      ),
      fig(
        "/images/blog/health-booking-phone.jpg",
        "A woman booking a doctor's appointment on her phone at a kitchen table.",
        "The front desk, moved home. Verified platform, stated fee, records kept — healthcare with the shelf's manners.",
      ),
      h2("The hard rule"),
      p(
        "Now the half that saves lives. The forward that lies taught you to check before sharing; for health, the rule is harder — do not diagnose, and do not obey. Symptoms do not go to a search box, a broadcast list, or a church group; they go to a professional, because the search box has no duty of care and no knowledge of your mother's blood pressure. The home cure that skips the hospital — herbs for a lump, lime for a fever that is actually malaria pretending, prayer alone for a child with convulsions — has buried more people on this continent than every scammer combined, and it arrives wearing love. So the family rule, stated once and kept forever: health forwards are not forwarded, not obeyed, and answered with one sentence — let us ask the doctor. And the emergency rule beside it: when the body is clearly failing — chest pain, a child gasping, bleeding that will not stop — you go, you run, you do not type. The phone can book the ambulance. It cannot be one.",
      ),
      p(
        "Used this way, the screen is the best thing that ever happened to a busy household's health: the appointment booked in the queue at work, the follow-up question answered by video, the drugs at the gate, the records safe above the flood. Used carelessly, it is a pharmacy of rumours. You already know how to tell one from the other — verified source, stated fee, professional on the other end, pause before the forward. The next lesson is the last of the chapter, and it asks what happens when all the tools change again.",
      ),
      fig(
        "/images/blog/telemedicine-video-call.jpg",
        "A man on a video call with a doctor, the doctor visible on the phone screen taking notes.",
        "The parlour clinic. A verified professional, a stated fee, and the family rule standing guard: symptoms go to the doctor, not to the group.",
      ),
      ul([
        "Build the family health folder in Drive tonight: last prescriptions, test results, blood groups. Midnight-you will bless this hour.",
        "Verify before the call: the platform, the doctor's registration, the fee in writing. Healthcare gets the government-portals suspicion, doubled.",
        "Install the family rule at the table: health forwards are neither forwarded nor obeyed. The answer is always let us ask the doctor.",
        "Emergencies are travelled, not typed. Know your nearest good hospital the way you know your nearest fuel station.",
      ]),
      h2("The screen, at the bedside"),
      p(
        "Of everything this shelf has taught, this lesson carries the heaviest arithmetic, because the accounts are not in naira. The same care you learned to spend on money — verify the channel, keep the record, refuse the hurry — spends even better on health. The house that books its own appointments, keeps its own records and declines its own forwards is a hard house to hurt. That is the whole lesson. Go and keep it well.",
      ),
    ],
  },
  {
    slug: "the-upgrade-habit",
    title: "The upgrade habit",
    excerpt:
      "Every tool on this shelf will be replaced someday, and none of the habits will. The yearly skills audit, one new tool per quarter, unlearning with grace — how to stay current for decades.",
    series: SERIES,
    order: 160,
    author: AUTHOR,
    date: "2026-09-20",
    cover: "/images/blog/upgrade-shelf-books.jpg",
    coverAlt: "A person comparing an old phone and a new phone side by side at a desk, both open on settings.",
    body: [
      p(
        "Here is a fact nobody enjoys saying aloud: half the specific tools in these one hundred and sixty notes will be renamed, rebuilt or retired within ten years. The apps will change their buttons, the platforms will change their rules, the acronyms of lesson thirteen's world will grow new letters. And yet the people these notes describe — the calm analyst, the honest seller, the teacher at the table — will still be working, because what the tools were carrying was never the skill. The upgrade habit is the last lesson of this chapter: how to keep current for decades without chasing every shiny thing off a cliff.",
      ),
      p(
        "The habit has three parts, and the first is the fence-check turned inward: the yearly skills audit. Once a year — your birthday week, same as the cleaning lesson — sit with your trade's adverts and your own work and ask coldly: what changed this year? What are the new names asking for? What did I keep doing the long way because the short way arrived while I was busy? Write three lines: one skill to deepen, one tool to learn, one habit to drop. The audit is not self-criticism; it is maintenance, the fence walk for the only compound that is entirely yours.",
      ),
      fig(
        "/images/blog/upgrade-shelf-books.jpg",
        "A person comparing an old phone and a new phone side by side at a desk, both open on settings.",
        "The audit, in one photograph: last year's tool and this year's, compared calmly, neither worshipped. The skill is the person holding both.",
      ),
      h2("One tool a quarter, unlearned with grace"),
      p(
        "The second part is pace. One new tool per quarter, learned properly by the free-learning method — one month, hands on keys, one real thing built — beats twelve tools dabbled at, the way one finished course beats a gallery of beginnings. Choose by the adverts you actually want and the work actually in front of you, not by the loudest launch of the season. The third part is the harder muscle: unlearning. When the tool changes — the menu moved, the name changed, the road you had memorised rebuilt — the frustration you feel is the old habit fighting the new map. Give it a week and the free videos, the way every migration in your digital life has gone: clumsy on Tuesday, fluent by Friday. The professionals you admire are not people who never unlearned. They are people who unlearn quickly and without ceremony, again and again, until the unlearning itself became the skill.",
      ),
      p(
        "And teach the upgrades onward — the each-one rule, forever. The colleague you walk through the new interface today is the person who walks you through the next one next year; that is how offices, families and this academy actually stay current. These notes will age exactly as all notes do; the habits underneath — verify before you trust, save before you work, pause before you pay, teach before you leave — are the cargo that survives every vehicle. When the machine of 2036 looks back at the machine of this page, the shelf will be different and the reader will be the same kind of person: the one who sat down, named the parts, and kept showing up. That was always the curriculum. It still is. Go and audit your fence.",
      ),
      fig(
        "/images/blog/learn-new-tool-screen.jpg",
        "A person at a desk following a tutorial for an unfamiliar new app, notebook open, expression calm.",
        "Quarter one's new tool, month one's clumsiness, week two's fluency. The upgrade habit is just the old ten honest minutes, wearing new menus.",
      ),
      ul([
        "Book the yearly audit: one skill to deepen, one tool to learn, one habit to drop. Three lines, birthday week, every year.",
        "One new tool per quarter, learned to the point of one real finished thing. Dabbling is collecting; finishing is learning.",
        "When the menus move, give the new map one week and the free videos. Fluent by Friday, every migration, forever.",
        "Teach each upgrade to one person as you learn it. The office that teaches itself never needs rescuing.",
      ]),
      h2("The shelf, and the road"),
      p(
        "One hundred and sixty notes. From the dark screen of lesson one to the habit that outlasts every screen to come. The chapter closes, the notes stay open, and the rule of the whole shelf says goodbye the only way it knows: whatever changes, sit down, name the parts, do the hours, and teach somebody on your way out. The road will keep being rebuilt. So will you. That is not the tragedy of the trade — it is the trade.",
      ),
    ],
  },
];

