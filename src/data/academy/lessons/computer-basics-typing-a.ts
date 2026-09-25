import type { SessionLecture } from "../types";

/**
 * Typing & Computer Basics — ₦10,000 · 2 weeks · 4 sessions.
 * Sessions 1 and 2. (Sessions 3 and 4 live in computer-basics-typing.ts.)
 */
export const computerBasicsTypingLessonsA: Record<string, SessionLecture> = {
  "understanding-the-computer": {
    summary:
      "You cannot use a machine you are afraid of. This session removes the fear by naming every part of the computer, explaining what each one actually does, and practising the correct power and login procedure until it is ordinary rather than tense.",
    objectives: [
      "Name and describe every major hardware component and say what it does",
      "Explain the difference between a desktop and a laptop and when each matters",
      "Connect and identify common peripherals: monitor, keyboard, mouse, printer, speakers, webcam",
      "Turn a computer on and off correctly, and explain why the order matters",
      "Log in to a Windows account and navigate the desktop, taskbar and Start menu",
      "Open, switch between and close applications using both mouse and keyboard",
    ],
    blocks: [
      {
        heading: "What a computer actually is",
        body: [
          "A computer is a machine that takes information in, does something to it, and gives information back. That is the entire idea, and everything else is detail. The **input** devices are how you tell it things — keyboard, mouse, microphone, camera, scanner. The **processing** happens inside the system unit or laptop body, on a chip called the CPU. The **storage** holds your work when the machine is off. The **output** devices are how it tells you things — the screen, the speakers, the printer.",
          "Why this matters practically: when something goes wrong, you diagnose by asking which of those four stages failed. Is the machine not receiving my input (keyboard problem)? Is it not showing me anything (display problem)? Is my file gone (storage problem)? Is the printer not printing (output problem)? Every troubleshooting method you will ever learn is a refinement of that one question, and it starts here.",
        ],
      },
      {
        heading: "Desktop versus laptop",
        body: [
          "A **desktop** is a computer in separate pieces: a system unit (the box, sometimes called the CPU even though the CPU is a chip inside it), a separate monitor, keyboard and mouse. Its advantages are that it is cheaper for the same performance, easier to repair and upgrade, and better cooled — which is why cyber cafés, offices and schools in Nigeria mostly use them. Its disadvantage is obvious: it stays where it is.",
          "A **laptop** combines everything into one portable unit with a built-in screen, keyboard, touchpad and battery. It costs more for the same performance and is harder to open, but it is the only option if you need to work in more than one place. Two things about laptops that beginners get wrong: the **touchpad** replaces the mouse (tap to click, two fingers to scroll, and an external USB mouse works better if you find it fiddly), and the **battery** is a consumable that degrades — a laptop that only runs when plugged in has a tired battery, not a broken computer.",
        ],
      },
      {
        heading: "The parts, named and explained",
        body: [
          "The **system unit** (or laptop body) contains everything that does the work. Inside it: the **motherboard**, the main circuit board that everything else plugs into; the **CPU**, the processor that carries out instructions — its speed is measured in gigahertz and its generations matter more than its clock speed; the **RAM**, temporary fast memory that holds what you are working on right now, wiped when power is cut, which is why 8GB is the practical minimum in 2026 and why an unsaved document disappears in a power cut; the **storage**, either a hard disk drive (HDD, cheaper and slower) or a solid state drive (SSD, faster and the single biggest speed upgrade an old machine can receive); the **power supply unit**, which converts mains electricity to what the components need; and **cooling fans**, which matter more in dusty, hot environments than most people realise.",
          "On the outside you have **ports**, and knowing them saves real time. **USB-A** is the rectangular port everything plugs into — flash drives, mice, keyboards, printers. **USB-C** is the smaller oval port on modern laptops, used for charging, data and displays. **HDMI** carries picture and sound to a monitor, TV or projector — this is the cable you need at any presentation. **Ethernet** is the network port for a wired internet connection, more stable than Wi-Fi. The **3.5mm jack** is for headphones. And on older machines, **VGA** is the blue trapezoid video port still found on many Nigerian projectors.",
          "Peripherals: the **monitor** displays output — check its resolution if text looks tiny, that is a setting not a fault. The **keyboard** and **mouse** are your input. The **printer** produces physical copies. **Speakers** or headphones produce sound. A **webcam** captures video, built into laptops and usually mounted on top of the screen. A **UPS or surge protector** is not optional in Nigeria — power fluctuation kills power supplies, and a UPS also gives you the two minutes you need to save and shut down properly.",
        ],
      },
      {
        heading: "Powering on and off correctly",
        body: [
          "Turning on is simple: connect power, press the power button, wait. What beginners do not know is that the wait is real work — the machine is loading the operating system from storage into RAM. Interrupting it by holding the power button or pulling the plug is how systems get corrupted. If a machine seems stuck, wait a full two minutes before concluding anything is wrong.",
          "Turning off is where mistakes cost money. Never switch off at the wall socket or hold the power button as your normal method. Use Start → Power → Shut down and wait for the screen to go dark. Shutting down properly lets Windows close files, finish writing to disk and park the drive heads — skipping it is how disks develop bad sectors and how documents get corrupted. **Restart** is different from shut down and is the correct fix for most odd behaviour, because it clears RAM completely. **Sleep** keeps your work in memory using a little power and wakes instantly; **Hibernate** writes memory to disk and powers off fully. In a place with unreliable electricity, hibernate is safer than sleep.",
        ],
      },
      {
        heading: "The desktop environment",
        body: [
          "After login you see the **desktop**: the working surface. On it sit **icons**, which are shortcuts — pictures representing programs, files or folders. Double-click an icon to open it. The **taskbar** runs along the bottom and shows every program currently open, plus the clock, the network and volume indicators, and the notification area on the right. The **Start menu** (Windows key, or the Windows button at bottom-left) is where every installed program lives and where the search box is — typing a program name into Start search is faster than hunting through menus.",
          "A **window** is a program's own rectangle on screen. Every window has the same three controls top-right: minimise (dash) hides it to the taskbar without closing it, maximise (square) fills the screen, and close (X) quits the program. Drag the title bar to move a window; drag its edges to resize. **Alt+Tab** switches between open windows and is the single most useful keyboard shortcut in Windows. **Windows key + D** shows the desktop by minimising everything. If a program stops responding, **Ctrl+Shift+Esc** opens Task Manager, where you can end the stuck task without restarting the machine.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor opens a real desktop machine and a laptop side by side, naming every component as it is pointed at, then walks the class through the power and login procedure.",
      steps: [
        {
          step: "Identify the desktop's parts",
          detail:
            "Point at the system unit, monitor, keyboard, mouse and power cable. Ask each learner to name the port a USB drive goes into and the port a projector uses. Correct the common habit of calling the system unit 'the CPU'.",
        },
        {
          step: "Show what is inside",
          detail:
            "With the machine unplugged, open the side panel and point out the motherboard, CPU and its fan, the RAM sticks, the storage drive, the power supply and the cables. Learners come to the front and look. Nothing is touched — this is identification only.",
        },
        {
          step: "Compare with the laptop",
          detail:
            "Open the laptop and identify the built-in equivalents: screen, keyboard, touchpad, webcam, battery, ports along the sides. Demonstrate the touchpad gestures — tap to click, two fingers to scroll, two fingers to right-click.",
        },
        {
          step: "Connect and disconnect peripherals",
          detail:
            "Plug in a USB flash drive and show Windows announcing it. Connect an HDMI cable to the monitor. Plug in headphones. Each time, name the port and say what it is for.",
        },
        {
          step: "Power on correctly",
          detail:
            "Connect power, press the button once, and narrate what is happening while the machine boots. Show the login screen, select the account, enter the password, and reach the desktop. Point out that nothing was pressed twice.",
        },
        {
          step: "Tour the desktop",
          detail:
            "Name the desktop icons, the taskbar, the Start button, the clock and the notification area. Open the Start menu and search for 'Notepad' rather than scrolling to find it.",
        },
        {
          step: "Open, switch and close windows",
          detail:
            "Open Notepad and Calculator. Use Alt+Tab to switch between them. Minimise one, restore it, maximise the other. Close both with the X. Then reopen one and close it with Alt+F4 to show the keyboard route.",
        },
        {
          step: "Demonstrate a frozen program",
          detail:
            "Open Task Manager with Ctrl+Shift+Esc and show the running processes and the End task button. Explain that this is what you use when a program stops responding, and that it does not lose work in other programs.",
        },
        {
          step: "Shut down correctly",
          detail:
            "Start → Power → Shut down. Wait for the screen to go dark. Then explain the difference between shut down, restart, sleep and hibernate, and why restart fixes more problems than shut down.",
        },
        {
          step: "Explain the UPS",
          detail:
            "Show the UPS or surge protector, explain what it protects against, and demonstrate the two-minute warning it gives during a power cut — enough time to save and shut down properly.",
        },
      ],
    },
    practice: {
      title: "Independent machine walk-through",
      brief:
        "Each learner takes a machine and performs the full cycle alone while the instructor observes without helping: identify the components, power on, log in, open three programs, switch between them, and shut down correctly.",
      steps: [
        "Before touching anything, name aloud: the system unit or body, the display, the keyboard, the pointing device and the power button.",
        "Point to three ports and say what each is for.",
        "Power on the machine and wait for the login screen without pressing anything twice.",
        "Log in to your account.",
        "Open Notepad, Calculator and File Explorer using Start search.",
        "Switch between the three using Alt+Tab.",
        "Minimise one, maximise another, restore the first.",
        "Open Task Manager with Ctrl+Shift+Esc, look at the process list, then close it.",
        "Close all three programs.",
        "Shut the machine down through Start → Power → Shut down and wait for the screen to go dark.",
      ],
      standard:
        "Every step completed without prompting, the correct port identified for each of the three asked, and the machine shut down through Windows rather than at the socket. Hesitation is fine; guessing is not.",
    },
    pitfalls: [
      {
        problem: "You press the power button repeatedly because nothing seems to happen",
        fix: "Press once and wait. Booting takes anything from ten seconds on an SSD machine to two minutes on an older one. Repeated pressing can force the machine into a recovery state.",
      },
      {
        problem: "You switch off at the wall socket when you finish",
        fix: "Shut down through Start → Power → Shut down. Cutting power mid-write is how file systems corrupt and how disks develop bad sectors over time.",
      },
      {
        problem: "You call the system unit 'the CPU'",
        fix: "The CPU is a chip inside the box. In a shop or a support call, saying 'the CPU is not powering' means something different from 'the system unit is not powering' and you will get the wrong part.",
      },
      {
        problem: "You double-click everything, including things that need a single click",
        fix: "Taskbar buttons, Start menu entries and browser links take a single click. Desktop icons and folder contents take a double click. If a single click opens things you did not intend, check File Explorer → View → Options → click behaviour.",
      },
      {
        problem: "A program freezes and you restart the whole machine",
        fix: "Try Ctrl+Shift+Esc first and end only the stuck task. Restarting loses unsaved work in every other open program; ending one task usually does not.",
      },
      {
        problem: "You plug a USB drive in and pull it straight out later",
        fix: "Use the eject option in the taskbar notification area before removing it. Windows caches writes, so the files may not have reached the drive yet even though the copy appeared to finish.",
      },
    ],
    expertNotes: [
      "Learn to read the notification area before you learn anything else on screen. The network icon tells you whether you have internet, the speaker icon tells you why you cannot hear anything, and the battery icon tells you how long you have. Most 'my computer is broken' moments are solved by looking there first.",
      "Buy a surge protector the same week you buy a computer, and a UPS if you can afford one. In Nigeria, the power supply unit is one of the most commonly killed components, and it is killed by the mains rather than by age.",
      "If you are choosing between more RAM and a faster CPU on a tight budget, take more RAM — and if the machine has a hard disk drive, spend the money on an SSD instead of either. An eight-year-old laptop with an SSD and 8GB of RAM is faster in daily use than a new one with a hard disk.",
      "Keep your machine off the floor and out of direct sun, and let it breathe. Dust and heat kill fans and throttle CPUs, and both are far more common failure causes in a hot climate than any software problem.",
    ],
    vocabulary: [
      {
        term: "System unit",
        meaning:
          "The box containing a desktop computer's working parts. Often wrongly called the CPU.",
      },
      {
        term: "CPU",
        meaning:
          "The processor chip that carries out instructions. Its generation matters more than its clock speed.",
      },
      {
        term: "RAM",
        meaning:
          "Fast temporary memory holding whatever you are working on now. Cleared when power is lost, which is why you save.",
      },
      {
        term: "SSD / HDD",
        meaning:
          "Solid state drive and hard disk drive — the two kinds of storage. An SSD is the single biggest speed upgrade for an old machine.",
      },
      {
        term: "Peripheral",
        meaning:
          "Any device connected to the computer from outside: keyboard, mouse, printer, monitor, webcam.",
      },
      {
        term: "Port",
        meaning: "A socket for connecting devices — USB-A, USB-C, HDMI, Ethernet, audio jack, VGA.",
      },
      {
        term: "Taskbar",
        meaning:
          "The strip along the bottom of the screen showing open programs, the clock and the notification area.",
      },
      {
        term: "Task Manager",
        meaning:
          "The tool (Ctrl+Shift+Esc) for seeing running programs and ending one that has stopped responding.",
      },
    ],
    homework: [
      {
        task: "Identify every port on a machine you have access to",
        detail:
          "Draw or photograph the sides and back of a computer and label every port with its name and purpose. Bring it to the next session.",
      },
      {
        task: "Practise the power cycle five times",
        detail:
          "Over the week, power on and correctly shut down a machine five times, timing how long the boot takes. The repetition is what makes it stop feeling tense.",
      },
      {
        task: "Learn three window shortcuts",
        detail:
          "Alt+Tab to switch, Windows key + D to show the desktop, Ctrl+Shift+Esc for Task Manager. Use only these for one day.",
      },
      {
        task: "Write the four stages of computing",
        detail:
          "Input, processing, storage, output — with two examples of each from a machine you have used. This framing is the basis of all troubleshooting later in the course.",
      },
    ],
    rubric: [
      {
        criterion: "Hardware identification",
        passing: "Names the major components and their general purpose.",
        excellent:
          "Distinguishes CPU from system unit, HDD from SSD, and identifies at least four ports with their uses.",
      },
      {
        criterion: "Power procedure",
        passing: "Powers on and shuts down correctly.",
        excellent:
          "Waits patiently through boot, can explain why correct shutdown matters, and knows when to restart rather than shut down.",
      },
      {
        criterion: "Desktop navigation",
        passing: "Opens programs and switches between windows.",
        excellent:
          "Uses Start search rather than hunting, and uses Alt+Tab, minimise and Task Manager fluently.",
      },
      {
        criterion: "Confidence",
        passing: "Completes the practical with occasional hesitation.",
        excellent: "Works without prompting and can explain what they are doing while doing it.",
      },
    ],
    faqs: [
      {
        q: "I am older than the other students. Will I keep up?",
        a: "Yes. This course is designed for people who have never used a computer, and our oldest learners are in their sixties and seventies. What matters is supervised repetition, which is exactly what the sessions provide. Age is not a factor in learning this material; lack of practice time is.",
      },
      {
        q: "My computer is slow. Is it broken?",
        a: "Usually not. The two most common causes are a hard disk drive instead of an SSD, and too little RAM for the number of programs open. Before concluding anything is wrong, check Task Manager to see what is using the machine, and shut down properly rather than cutting power — a machine that is always cut off accumulates disk problems.",
      },
      {
        q: "What should I buy if I am getting my first computer?",
        a: "A laptop with an SSD and at least 8GB of RAM, from a mainstream brand whose parts are available locally. Storage size matters less than the SSD. Buy a surge protector with it. Anything that runs Windows 11 comfortably will handle every course on this page.",
      },
      {
        q: "The power went out while I was working. Have I lost everything?",
        a: "Possibly the last few minutes. This is why you save constantly — Ctrl+S every few minutes until it becomes automatic. Most Office programs also keep an AutoRecover copy, so after restarting, open the program and look for recovered documents before assuming the work is gone.",
      },
      {
        q: "Do I need to know what is inside the computer to use it?",
        a: "Not to use it, but it changes how you describe problems and what you buy. Saying 'the fan is loud and the machine is hot' gets you a cleaning; saying 'my computer is slow' gets you a sales pitch. Naming the part is half the diagnosis.",
      },
    ],
  },

  "keyboard-and-mouse": {
    summary:
      "Speed and accuracy both come from hand position, not from trying harder. This session covers every mouse action, the full keyboard layout, the modifier keys that unlock shortcuts, and the typing drills that build correct finger placement from the start.",
    objectives: [
      "Perform every mouse action: left click, right click, double click, drag and drop, scroll",
      "Identify every region of the keyboard and the purpose of the modifier keys",
      "Use Shift, Ctrl, Alt and the Windows key deliberately rather than by accident",
      "Place your hands in the home row position and type without looking",
      "Apply the ten shortcuts that cover most daily work",
      "Run a timed typing drill and measure your own accuracy and speed",
    ],
    blocks: [
      {
        heading: "The five mouse actions",
        body: [
          "There are only five things a mouse does, and every interaction on a computer is built from them. **Left click** selects — one press, once. **Double click** opens — two quick presses on the same spot, used for desktop icons and files; if it opens nothing, you are probably clicking too slowly, and the speed is adjustable in Control Panel → Mouse. **Right click** opens the context menu, which is the most under-used action in computing: it offers exactly the actions available for the thing you clicked, and it is almost always faster than finding the same command in a menu. **Drag and drop** moves or selects — press and hold, move, release; dragging across empty space draws a selection box. **Scroll** moves through content, with the wheel or by two-finger swipe on a touchpad.",
          "Two habits matter more than any of these. First, use the right click constantly — it is the fastest route to rename, copy, paste, delete, open with and properties. Second, look at the cursor, because it tells you what will happen: an arrow means select, an I-beam means you can place text there, a hand means it is clickable, and a spinning circle means the machine is busy and you should wait rather than click again.",
        ],
      },
      {
        heading: "The keyboard, region by region",
        body: [
          "The main **letter and number keys** are the QWERTY block, named for its top-left letters — a layout designed in the 1870s for typewriters and kept ever since for familiarity. Above it are the **function keys** F1 to F12, whose meaning changes per program but which include near-universal assignments: F1 is help, F2 renames a selected file, F5 refreshes, F12 in Word is Save As. The **number pad** on the right is for fast numeric entry and is disabled when Num Lock is off — a common source of confusion when number keys suddenly type arrows instead.",
          "Then the editing keys, which most beginners never use and which save enormous time. **Enter** confirms or starts a new line. **Backspace** deletes backwards, **Delete** deletes forwards — knowing the difference matters when you are editing rather than rewriting. The **arrow keys** move one character or line at a time. **Home** jumps to the start of a line, **End** to the end. **Page Up** and **Page Down** move a screenful. **Tab** jumps between fields in a form, which is why filling a form with Tab and Shift+Tab is several times faster than reaching for the mouse.",
        ],
      },
      {
        heading: "Modifier keys: the four that unlock everything",
        body: [
          "A modifier key does nothing alone; it changes what another key does. **Shift** produces capitals and the upper symbol on a key — press Shift+2 for the at sign, Shift+3 for the naira or hash symbol depending on your layout. **Caps Lock** locks capitals on permanently, and the single most common beginner typing error is forgetting it is on; look at the Caps Lock indicator light before you conclude the keyboard is broken. **Ctrl** is the command modifier and produces nearly every shortcut: Ctrl+C copy, Ctrl+V paste, Ctrl+S save, Ctrl+Z undo, Ctrl+A select all, Ctrl+F find, Ctrl+P print, Ctrl+W close.",
          "**Alt** is the alternative command modifier — Alt+Tab switches programs, Alt+F4 closes the current program, Alt+Enter shows properties. The **Windows key** opens the Start menu alone and produces system shortcuts in combination: Windows+D shows the desktop, Windows+E opens File Explorer, Windows+L locks the screen immediately (use this every time you stand up from a shared machine), Windows+Shift+S takes a screenshot of a region you choose.",
          "The pattern to internalise is that **Ctrl+Shift reverses or extends** the plain Ctrl version: Ctrl+Shift+Z redoes, Ctrl+Shift+T reopens a closed browser tab, and holding Shift while clicking or using arrow keys extends a selection. Once you see that, you can guess most shortcuts correctly instead of memorising them one by one.",
        ],
      },
      {
        heading: "Home row and why not looking matters",
        body: [
          "Correct typing is a hand-position discipline, not a speed effort. Rest your left hand with fingers on **A S D F** and your right on **J K L ;** — those are the home row keys, and F and J each have a small raised bump precisely so you can find them by touch without looking. Each finger owns a diagonal column of keys: the left little finger takes A, Q, Z and the modifiers; the left index reaches R, T, G, B and V as well as F; and the mirror image applies on the right. Thumbs rest on the spacebar.",
          "The reason this matters is arithmetic, not pedantry. Hunting with two fingers means your eyes leave the screen on every keystroke, so your speed is limited by how fast you can find keys and your accuracy drops because you are not watching what you type. Touch typing keeps your eyes on the text, so errors are visible as you make them. Two weeks of correct practice beats two years of hunting, and the uncomfortable truth is that self-taught hunters rarely fix it later because the wrong habit feels faster than the right one while you are relearning.",
          "Expect to be slower for the first few days. That is normal and it passes. Do not abandon the position because hunting feels quicker today — it is a ceiling you will hit within a month, whereas correct placement keeps improving for as long as you practise.",
        ],
      },
      {
        heading: "Drills: how to actually improve",
        body: [
          "Improvement comes from short, frequent, accurate practice — not from long frustrated sessions. Fifteen minutes a day beats two hours once a week, because the skill is motor memory and motor memory consolidates with repetition and sleep. Always practise accuracy first: hitting the right key slowly builds speed, whereas practising fast and wrong builds a habit you must later unlearn.",
          "Use a structured trainer rather than random typing. Free options that work well include typingclub.com, keybr.com and 10fastfingers.com — all run in a browser and need no installation. Work through the home row first, then the rows above and below, then capitals and punctuation. Do not chase the words-per-minute figure; chase the accuracy percentage, and let speed follow. A useful benchmark: below 95% accuracy you are practising mistakes, so slow down until accuracy recovers.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor demonstrates each mouse action and modifier key on the projector, then leads the whole class through hand placement and the first drill set together.",
      steps: [
        {
          step: "Demonstrate the five mouse actions",
          detail:
            "On the desktop: single click to select an icon, double click to open it, right click to show the context menu and choose Rename, drag the icon to a new position, then drag across empty space to draw a selection box. Scroll through a long document with the wheel.",
        },
        {
          step: "Show the cursor shapes",
          detail:
            "Hover over a desktop icon (arrow), over text in Notepad (I-beam), over a link in a browser (hand), and during a save operation (spinning circle). Ask the class to predict what each will do before clicking.",
        },
        {
          step: "Tour the keyboard",
          detail:
            "Name the QWERTY block, the function row, the editing cluster and the number pad. Turn Num Lock off and on to show the number pad changing behaviour. Press F2 on a selected file to rename it and F5 in a browser to refresh.",
        },
        {
          step: "Demonstrate Shift and Caps Lock",
          detail:
            "Type a sentence in lowercase, then hold Shift for capitals, then switch on Caps Lock and show the indicator light. Turn it off. Point out the light's position so learners check it when output looks wrong.",
        },
        {
          step: "Demonstrate the Ctrl shortcuts",
          detail:
            "In Notepad, type a sentence and use Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+Z, Ctrl+Y, Ctrl+S and Ctrl+F in sequence. Say the name of each action aloud as it is pressed.",
        },
        {
          step: "Demonstrate Ctrl+Shift reversal",
          detail:
            "Undo with Ctrl+Z, then redo with Ctrl+Shift+Z. Close a browser tab and reopen it with Ctrl+Shift+T. Extend a selection by holding Shift and pressing the right arrow.",
        },
        {
          step: "Demonstrate the Windows key shortcuts",
          detail:
            "Windows alone for Start, Windows+D for the desktop, Windows+E for File Explorer, Windows+L to lock, Windows+Shift+S to capture a selected region. Emphasise Windows+L as the habit for shared machines.",
        },
        {
          step: "Set hand position as a class",
          detail:
            "Everyone places fingers on A S D F and J K L ; and finds the bumps on F and J with eyes closed. Thumbs on the spacebar. The instructor walks the room correcting position before any typing begins.",
        },
        {
          step: "Run the first drill",
          detail:
            "Open a typing trainer and run the home row lesson together for ten minutes. Call out accuracy over speed. Have learners report their accuracy percentage, not their speed.",
        },
        {
          step: "Measure and record a baseline",
          detail:
            "Each learner runs a one-minute test and records words per minute and accuracy on paper. This is the baseline the session-four test will be compared against.",
        },
      ],
    },
    practice: {
      title: "Mouse precision and typing drills",
      brief:
        "A two-part practical: a mouse-precision exercise proving control of all five actions, then twenty minutes of structured typing drills with a recorded accuracy figure.",
      steps: [
        "Create a new folder on the desktop by right-clicking, choosing New → Folder, and renaming it to your name.",
        "Open the folder, then create three text files inside it using the right-click menu.",
        "Drag one file out of the folder onto the desktop, then drag it back in.",
        "Select all three files at once by dragging a selection box around them.",
        "Open a typing trainer and complete the home row lesson set.",
        "Complete the top row and bottom row lesson sets.",
        "Maintain at least 95% accuracy — slow down if you fall below it.",
        "Run a one-minute timed test and record both words per minute and accuracy.",
        "Compare today's figure with your session-one baseline.",
      ],
      standard:
        "All five mouse actions demonstrated correctly without prompting, the home row hand position held throughout the drills without looking at the keyboard, and a recorded accuracy of 95% or higher at whatever speed that requires.",
    },
    pitfalls: [
      {
        problem: "You look at the keyboard while typing",
        fix: "Cover your hands with a cloth for one drill session if necessary. The bumps on F and J exist so you can find home position by touch. Looking at the keys caps your speed permanently and hides your errors from you.",
      },
      {
        problem: "Your double clicks do not register",
        fix: "You are clicking too slowly or moving the mouse between clicks. Hold the mouse still and click twice quickly. The threshold is adjustable in Control Panel → Mouse → Double-click speed.",
      },
      {
        problem: "Everything you type comes out in capitals",
        fix: "Caps Lock is on. Press it once and check the indicator light. If only some letters are capitals, you are holding Shift unintentionally with your little finger.",
      },
      {
        problem: "The number pad types arrows instead of numbers",
        fix: "Num Lock is off. Press Num Lock once. On compact keyboards the number pad is overlaid on the letter keys and needs the Num Lock or Fn combination.",
      },
      {
        problem: "You hunt for shortcuts in menus instead of using them",
        fix: "Learn ten and use only those for a week: Ctrl+C, Ctrl+V, Ctrl+Z, Ctrl+S, Ctrl+A, Ctrl+F, Alt+Tab, Windows+D, Windows+L and Ctrl+Shift+Esc. Menu hunting is the single biggest daily time cost for new users.",
      },
      {
        problem: "You type fast but with many errors",
        fix: "You are practising mistakes. Drop your speed until accuracy is above 95% and let speed rebuild itself. Speed built on errors does not survive real work, where you must stop and correct.",
      },
    ],
    expertNotes: [
      "Learn Ctrl+A, Ctrl+C, Ctrl+V before anything else, then never select text with the mouse again unless you need a partial selection. Keyboard selection with Shift and the arrow keys is faster and far more precise, and it works identically in every program you will ever use.",
      "Lock your screen with Windows+L every single time you leave a shared machine, even for a minute. This is a security habit, not a typing one, and it costs less than a second. The Cybersecurity course builds on it.",
      "If you use a laptop touchpad and find it imprecise, buy a ₦3,000 USB mouse. It is the cheapest productivity upgrade available and it removes an entire category of frustration for people learning to work quickly.",
      "Set a daily fifteen-minute drill alarm on your phone for the next thirty days. Typing is the one skill on this page where daily repetition produces a permanent, compounding return — every other course you take will be faster because of it.",
    ],
    vocabulary: [
      {
        term: "Context menu",
        meaning:
          "The menu opened by right-clicking, listing actions available for whatever you clicked.",
      },
      {
        term: "Modifier key",
        meaning:
          "A key that does nothing alone but changes another key's effect: Shift, Ctrl, Alt, Windows.",
      },
      {
        term: "Home row",
        meaning:
          "The middle letter row — A S D F and J K L ; — where fingers rest between keystrokes.",
      },
      {
        term: "Touch typing",
        meaning:
          "Typing from muscle memory without looking at the keyboard, enabled by the raised bumps on F and J.",
      },
      {
        term: "Num Lock",
        meaning: "The toggle that switches the number pad between numbers and navigation keys.",
      },
      {
        term: "Caps Lock",
        meaning:
          "The toggle that locks capitals on. Its indicator light is the first thing to check when output looks wrong.",
      },
      {
        term: "Words per minute (wpm)",
        meaning:
          "The standard typing speed measure. Meaningless without the accuracy figure alongside it.",
      },
      {
        term: "Accuracy percentage",
        meaning:
          "The proportion of keystrokes typed correctly. Below 95% you are rehearsing errors.",
      },
    ],
    homework: [
      {
        task: "Fifteen minutes of drills, every day",
        detail:
          "Use a free browser-based typing trainer for fifteen minutes daily until the next session. Record your accuracy and speed each day so you can see the trend rather than guessing.",
      },
      {
        task: "Learn ten shortcuts and use only those",
        detail:
          "Ctrl+C, Ctrl+V, Ctrl+Z, Ctrl+S, Ctrl+A, Ctrl+F, Alt+Tab, Windows+D, Windows+L, Ctrl+Shift+Esc. Write them on paper beside your machine and reach for the paper, not the mouse.",
      },
      {
        task: "Right-click everything for one day",
        detail:
          "Deliberately use the context menu for rename, copy, paste, delete and open with. Notice how often the action you wanted was one click away and you had been walking to a menu instead.",
      },
      {
        task: "Practise home position with eyes closed",
        detail:
          "Five times a day, close your eyes, place your fingers on home row using the F and J bumps, and type the alphabet. This is the exercise that makes not looking automatic.",
      },
    ],
    rubric: [
      {
        criterion: "Mouse control",
        passing: "Performs all five actions correctly.",
        excellent:
          "Uses the context menu as the default route and reads the cursor shape to predict behaviour.",
      },
      {
        criterion: "Keyboard knowledge",
        passing: "Identifies the main keyboard regions and the modifier keys.",
        excellent:
          "Uses Num Lock, Caps Lock indicators, function keys and the editing cluster deliberately.",
      },
      {
        criterion: "Hand position",
        passing: "Starts from home row and uses the correct fingers for most keys.",
        excellent:
          "Maintains home row throughout without looking at the keyboard, including for capitals and punctuation.",
      },
      {
        criterion: "Accuracy",
        passing: "95% or better at any speed.",
        excellent: "97% or better with measurable improvement against the session-one baseline.",
      },
      {
        criterion: "Shortcuts",
        passing: "Uses at least five shortcuts without prompting.",
        excellent:
          "Uses all ten fluently and prefers the keyboard to the mouse for selection and navigation.",
      },
    ],
    faqs: [
      {
        q: "I already type with my own method. Should I really relearn?",
        a: "If you type accurately above 40 words per minute, no — your method works and relearning would cost you weeks. If you are below that, or you make frequent errors, or you look at the keyboard, then yes: the ceiling on hunting is real and you will hit it. Most self-taught typists plateau around 25–35 wpm; touch typists routinely reach 50–70.",
      },
      {
        q: "How fast is fast enough to get data entry work?",
        a: "Most paid data entry roles in Nigeria expect 35–45 words per minute with 98% or better accuracy. Accuracy matters more than speed — a client will keep a slow, accurate typist and drop a fast, careless one immediately. The Data Entry course tests at those thresholds.",
      },
      {
        q: "Do I need an expensive keyboard?",
        a: "No. Any working keyboard will build the skill. A quieter, better-travelled keyboard is more comfortable for long sessions and costs a few thousand naira, but the technique is identical on a cheap one. Spend on a mouse before a keyboard if you are on a laptop.",
      },
      {
        q: "My fingers hurt after practice. Is that normal?",
        a: "Mild tiredness in the first week is normal as unfamiliar muscles are used. Sharp pain, or pain in the wrists, is not — check that your wrists are straight and floating rather than bent up or resting hard on the desk edge, and take a short break every fifteen minutes. Persistent wrist pain needs attention, not more practice.",
      },
      {
        q: "What keyboard layout should I learn?",
        a: "QWERTY, which is what every machine you will meet in Nigeria uses. Other layouts such as Dvorak claim efficiency gains but will leave you unable to use any shared or public machine, which is a bad trade for a beginner.",
      },
    ],
  },
};
