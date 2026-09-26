import type { SessionLecture } from "../types";

/**
 * Typing & Computer Basics — session 1.
 * Standalone tutorial for a complete novice. Illustrations in
 * public/images/classes/computer-basics/ are original diagrams, not screenshots.
 *
 * Assumed environment, checked 2026-09-26:
 * Windows 10 and Windows 11. Windows 10 Home/Pro support ended 14 October 2025
 * (Microsoft's Windows specifications page). Menu positions differ; the jobs do not.
 */
export const understandingTheComputer: SessionLecture = {
  reviewed: "2026-09-26",
  summary:
    "You are going to sit at a computer, name the parts, turn it on with one press, reach the desktop, open a program, and leave it the safe way. By the end, a dark screen should feel like a checklist, not a dead machine.",
  objectives: [
    "Point to the computer itself, as distinct from the screen, and name what each piece is for",
    "Explain the four jobs — input, processing, storage, output — and use them to locate a failure",
    "Turn a Windows desktop or laptop on with one press, wait, and reach the desktop",
    "Open Notepad from Start search, switch windows, and close a program without guessing",
    "Shut down through the power menu, and say how sleep, hibernate, shut down and restart differ",
    "Run the dark-screen checks in order, and stop before opening the case",
  ],
  learningPath: {
    fits: "This is the first session of Typing & Computer Basics, the on-ramp course. Every later class on this site — Word, files, the internet, design, code — assumes you can reach a desktop and leave the machine without cutting the power. If you have never sat at one, start here. If you already do this without thinking, still read the shutdown and dark-screen sections. Those are the parts confident people skip, and they are the parts that cost files.",
    prerequisites: [
      "No computer knowledge. A phone in your pocket is useful later, and it is not required.",
      "A Windows 10 or Windows 11 desktop or laptop you are allowed to turn off. An academy practice machine is enough. You do not need to buy anything for this lesson.",
      "About an hour when the power is steady, or a charged laptop, so you are not interrupted mid-boot.",
    ],
    unlocks:
      "The next session, Keyboard & Mouse, assumes you can already reach the desktop and find Start. After that come files, the internet, and email. None of those lessons will re-teach the power button.",
    nextLesson: {
      label: "Session 2: Keyboard & Mouse",
      href: "/classes/computer-basics-typing/keyboard-and-mouse",
    },
    practiceTime:
      "60–80 minutes the first time, including the mistakes. Then one extra power cycle later the same day, without the page open. The second cycle is what makes the first one stick.",
    definitionOfDone: [
      "You can name the computer, the screen, the keyboard and the pointing device without mixing them up.",
      "You turn the machine on with one press and wait, even when the screen stays dark for a while.",
      "You open Notepad from Start search, switch away and back, and close it.",
      "You shut down from the power menu and wait until the screen is dark and the fans stop.",
      "You can say, in order, what to check when a desktop screen stays black — and you do not open the case.",
    ],
    assumptions: [
      "Windows 10 or Windows 11. Windows 10 support ended on 14 October 2025, but many Nigerian homes, schools and cafés still run it. The lesson names the differences that matter.",
      "A desktop (separate tower and monitor) or a laptop. A phone is a different object. A Mac uses the same four jobs and different button names — see the variation near the end, and do not force these click-paths onto it.",
      "You are allowed to shut this machine down. Do not practise shutdown on a café computer other people are using.",
    ],
  },
  blocks: [
    {
      heading: "The hour in front of you",
      body: [
        "Picture Amaka on the Monday before her NYSC posting. She runs a WhatsApp group for her church choir, pays for data, and can find a photo on her phone in three seconds. The desktop in her aunt's provision shop is a different animal. The screen is black. There is a tower on the floor, a keyboard with more keys than she has ever needed, and a small oval with a wire. The last time she touched a machine like this, in secondary school, the teacher said 'just open it' and walked away. She has avoided them since.",
        "That avoidance is not stupidity. A phone teaches itself because the pieces are hidden and the screen is always the thing you hold. A desktop shows its pieces and then refuses to explain them. This hour is the explanation. You will not learn typing yet, or files, or the internet. You will learn how to arrive at the desktop and how to leave it so the machine is still well tomorrow.",
        "If you are reading this on a phone, that is fine for the first section. When the steps begin, sit at the computer. Reading the steps on the same screen you are trying to understand makes the first hour harder than it needs to be. A paper notebook, or this page open on the phone beside the machine, is the easier arrangement.",
        "There is a shorter companion note, [Sitting down at a computer for the first time](/blog/sitting-down-at-a-computer), if you want the same idea in a quieter voice. This page is the one to follow with your hands.",
      ],
      remember:
        "The goal of this hour is not 'computer knowledge'. It is: I can get to the desktop, I can open one program, and I can leave without pulling the plug.",
    },
    {
      heading: "Four jobs, and why the names matter",
      body: [
        "A computer takes information in, does something to it, keeps it, and gives information back. Those are the only four jobs. Everything you will ever plug in, click, or complain about is one of them.",
        "**Input** is how you tell it things. The keyboard, the mouse, a laptop touchpad, a microphone, a scanner. If the machine cannot hear you, the fault is on this side — a loose keyboard cable, a battery-dead mouse, Caps Lock doing something you did not intend.",
        "**Processing** is the work, done by a chip called the CPU, inside the tower or the laptop body. You do not watch the CPU. You watch the result. When people in a computer village say 'the CPU', they often mean the whole tower. That mix-up matters the moment you are buying a part. The CPU is a chip. The box is the system unit.",
        "**Storage** is what remains when the power is gone. A hard disk (HDD) or a solid-state drive (SSD) holds your files. **RAM** is not storage. RAM is a fast desk the CPU uses while the power is on. A power cut clears the desk. That is why an unsaved paragraph disappears when NEPA takes the light, and why a saved file does not. Hold that distinction. It is the reason the shutdown section exists.",
        "**Output** is how the machine talks back: the screen, the speakers, a printer. A dark screen is an output problem until you have proved otherwise. It is not, by itself, proof that the computer is dead.",
        "Before you go on, answer this without looking up. Amaka types a line in a program and the light goes out before she saves. Which job failed to keep the line — input, processing, storage, or output? The line never reached storage. It was sitting in RAM, which is wiped when the power goes. The keyboard did its job. The screen did its job. The save had not happened yet.",
      ],
      remember:
        "When something fails, ask which of the four stopped. Do not start by saying the computer is bad.",
    },
    {
      heading: "What is actually in front of you",
      body: [
        "If you are at a desktop, there are two machines' worth of buttons and only one computer. The **monitor** is the screen on the desk. It has its own power cable and, usually, its own power button. The **system unit** is the tower on the floor or beside the desk. That is the computer. The keyboard and the mouse are input devices, plugged into the tower, not into the monitor. A wire from the tower to the monitor carries the picture. If that wire is out, the computer can be running and the screen will still be black.",
        "Find the power button on the tower before you need it. It is marked with a circle broken by a short vertical line. Pressing the button on the monitor only wakes the screen. Pressing the button on the tower wakes the computer. Beginners lose ten minutes here, pressing the wrong circle and deciding the machine is finished.",
        "Follow the power cable with your eyes, from the tower to the wall. In this country it should pass through a **surge protector** or a UPS, not straight into a bare socket. A surge protector is a strip with a switch. A UPS is the heavier box that beeps when the light goes and gives you a minute or two to shut down. If you see neither, note it. You can still do this lesson. You should not leave the machine that way for months.",
        "A **laptop** has joined the pieces. The screen, keyboard and touchpad are one object. The touchpad is the flat rectangle below the keys — that is your mouse. The power button is still the circle-and-line mark, but it may sit on the keyboard deck, on the side, or near the hinge. The key with a sun on it is brightness, not power. A laptop also has a battery inside. A dead battery looks exactly like a dead computer until you plug the charger in and wait a minute for a small charging light.",
        "Say the names out loud once, with your hand on the thing. Computer — tower or laptop body. Screen. Keyboard. Pointing device — mouse or touchpad. Power button. If you can do that, the rest of the hour has somewhere to land.",
      ],
      remember:
        "On a desktop, the screen is not the computer. It has its own button. The computer's button is on the tower.",
    },
    {
      heading: "First success: one press, then wait",
      body: [
        "You are about to turn it on. The success is small and it is the whole point: a desktop you recognise, with icons and a bar along the bottom. Do not open five programs. Do not 'explore'. Arrive, and notice that you arrived.",
        "Check three things before the press. The tower or laptop is plugged in, or the laptop charger is in and a charging light has shown itself. The monitor, if it is separate, is plugged in and its own button has been pressed — a small light on the monitor's bezel is the sign. The video cable between tower and monitor is pushed in at both ends. HDMI is the wider flat plug. VGA is the blue trapezoid with pins, still common on projectors and older monitors. Match the shape. Do not force a plug that does not fit.",
        "Now the press. One press of the computer's power button. Take your finger off. Do not hold it. Holding the button for about ten seconds forces the machine off, which is an emergency, not a way to start. Do not press it again because nothing happened. On a machine with an SSD you may see a logo in ten or twenty seconds. On an older machine with a hard disk, a full minute is ordinary, and two minutes is not yet a fault.",
        "What you should see, in some order: a light on the tower or laptop, sometimes a fan, then a manufacturer's logo or a spinning circle, then either a sign-in screen or a desktop. A sign-in screen means Windows is awake and waiting for an account. Click the name your instructor wrote on the board, or your own name at home. If it asks for a password you do not know, stop. Two wrong guesses are enough. Some machines lock the account after repeated failures, and guessing is how you spend the rest of the hour locked out. Ask the owner.",
        "If there is no password, clicking the name is the whole login. You should then see the desktop: a background, a few icons, and a bar along the bottom. That bar is the taskbar. You are in.",
        "If the screen is still black after a real wait, do not decide the computer is dead. Use the order in the diagram: computer button, monitor light, both power cables, video cable, two more minutes, then stop. Opening the case is not a step in this lesson. A case is opened unplugged, by someone who has been shown how, in the repairs class. Today you stop at the cable.",
      ],
      remember:
        "One press. Hands off. Two minutes is a wait, not a failure. The second press is what turns a slow boot into a mess.",
    },
    {
      heading: "What the wait is doing",
      body: [
        "The quiet minute is not the machine ignoring you. Windows is being copied from storage into RAM so the CPU has something to run. Storage is slow compared with RAM. That is the whole reason the wait exists, and it is longer when storage is a hard disk rather than an SSD.",
        "You do not need the inside of the case for this lesson. You do need the consequence. Work you can see on screen and have not saved is in RAM. RAM does not survive a power cut, a forced hold of the power button, or a shutdown you interrupt. Work you have saved is on the drive. The drive survives.",
        "This is also why 'the computer is slow' is not one problem. A machine that takes two minutes to reach the desktop is often waiting on a hard disk. A machine that reaches the desktop quickly and then stutters when you open many programs is often short of RAM. You will not fix either today. You will stop calling both of them 'it is bad'.",
        "An SSD and 8 GB of RAM is the practical floor we teach for daily use in 2026 — Word, a browser, WhatsApp Web. Microsoft's published minimum for Windows 11 is lower: 4 GB of RAM and 64 GB of storage. A machine can meet that minimum and still feel tired. If you are buying, ask whether the storage is an SSD before you ask about processor speed. The village will sell you speed. The wait you just sat through is a disk problem more often than a processor problem.",
      ],
      remember:
        "Unsaved work lives in RAM and dies with the power. Saved work lives on the drive and survives. The wait at startup is Windows moving from the drive into RAM.",
    },
    {
      heading: "Ports: match the shape, not the hope",
      body: [
        "A port is a socket. You identify it by shape, then by job. Position changes with every model — the USB port on your aunt's laptop will not sit where the diagram's laptop has it. The shape will.",
        "**USB-A** is the familiar rectangle. Flash drives, mice, keyboards and many printers use it. **USB-C** is the smaller oval. Newer laptops charge through it and also pass data through it. Do not assume every oval port is a charger. If a plug does not seat with a gentle push, it is the wrong port or it is upside down. USB-C can go in either way. USB-A cannot. Flip it once, not five times with force.",
        "**HDMI** carries picture and sound to a monitor, television or projector. **VGA** is the older blue video plug. Many Nigerian projectors still want it. If the projector has VGA and the laptop has only HDMI, you need an adapter. The lesson cannot conjure one. Knowing the names is how you ask for the right adapter instead of 'the cable for the thing'.",
        "**Ethernet** is the network port, a little larger than a phone plug, with a clip. A cable there is usually steadier than Wi-Fi, which matters in a shop where the radio signal is fighting every other radio. The **audio jack** is the small round hole for headphones. On a laptop, plugging headphones in often silences the speakers. If you cannot hear anything later, check that hole before you decide the sound is broken.",
        "You will not plug a flash drive in and pull it out as part of this lesson. When you do, in the files session, close any file you opened from the drive before you remove it. Windows can still be writing after the copy looks finished.",
      ],
      remember:
        "Name the shape, then the job. Forcing a plug is how ports die. Adapters exist because the shapes were never universal.",
    },
    {
      heading: "The desktop, named",
      body: [
        "The desktop is the working surface, not a brand name. On it you should be able to find four things.",
        "**Icons** sit on the background. They are shortcuts — pictures that point at a program or a file. The icon is not the file. Deleting a shortcut does not always delete the work it pointed at, and keeping a shortcut does not mean the work is safe. You will not delete anything today. You will only notice that an icon is a door, not the room.",
        "The **taskbar** is the strip along the bottom. It shows programs that are open, and it holds Start. On Windows 10, Start is at the left. On Windows 11 it is often in the centre, with the icons centred too. If yours is in the centre, the machine is not misconfigured. That is a version difference. The job of Start is the same: it opens search, the list of programs, and the power menu.",
        "The **notification area** is the cluster at the right end of the taskbar, next to the clock. Network, volume, and on a laptop the battery, live there. Most 'it is broken' moments in the first week are answered by that cluster: no internet, muted sound, a battery you did not notice. Look there before you restart.",
        "A **window** is one program's rectangle. Every window has the same three controls at the top-right. The dash **minimises** — the program is still open, hiding on the taskbar. The square **maximises**, filling the screen; click it again and the window returns to a smaller size. The **X closes** the program. Close is not minimise. If you needed the program, X is the one that can ask you about unsaved work and then actually quit.",
        "Move a window by dragging the title bar, the strip where the name sits. Drag an edge to resize. If a window has fallen partly off the screen, do not panic and do not restart. Hold the Windows key and press the left or right arrow, or click its button on the taskbar and choose maximise. You are allowed to be clumsy here. The machine expects it.",
      ],
      remember:
        "Start finds programs. The three marks on a window are hide, fill, and quit. The notification area is where you look before you decide something is broken.",
    },
    {
      heading: "Open something, switch, and close it",
      body: [
        "You are going to open Notepad, because it is on every Windows machine and it cannot surprise you with a template. Click **Start**, or press the Windows key — the key with the four-pane window mark, usually between Ctrl and Alt on the bottom row. Type `notepad`. Do not hunt through a list of tiles. A result named Notepad should appear before you have finished the word. Press Enter, or click it.",
        "What you should see: a plain window, a white page, a blinking cursor, and the word Notepad in the title bar. That blink is the insertion point. Keys you press will land there. Type your first name. You have now put something in RAM that storage does not have.",
        "Open a second program the same way. Type `calculator` in Start search and press Enter. You should have two windows. If one covered the other, that is normal, not a loss. Press **Alt+Tab** — hold Alt, tap Tab — and you should see both. Release on the one you want. This is the switch you will use for the rest of your working life. The taskbar buttons do the same job with the mouse, one click each.",
        "Close Calculator with the X. It should vanish without a question, because you typed nothing it needed to keep. Go back to Notepad. Press Alt+F4, or click the X. Because you typed your name and did not save, Windows should ask whether you want to save changes. Read the question. It exists because the name is only in RAM. For this exercise, choose **Don't save**. You are practising the question, not keeping the file. Saving, folders and names are the next week. Today, notice that the machine asked before it threw the words away.",
        "If Alt+F4 opens a small box titled Shut Down Windows, you were on the empty desktop, not inside a program. That box is a real shutdown path. Press Escape if you are not ready to leave. Choose Shut down only when you mean to leave.",
      ],
      remember:
        "Start, then type the name. Alt+Tab moves between open programs. A save question means the work is still only in memory.",
    },
    {
      heading: "How to leave without losing the machine",
      body: [
        "There are four ways off, and they are not moods of the same button.",
        "**Sleep** keeps your open work in RAM and sips power so it can wake quickly. A power cut during sleep takes the unsaved work with it. Sleep is a bad default in a building where the light fails. If you step away for ten minutes and the supply is steady, sleep is fine. If you are leaving for the night, it is the wrong choice.",
        "**Hibernate** writes the contents of memory to the drive and then powers off. It is the safer cousin of sleep when NEPA is unreliable. On many Windows 10 and Windows 11 machines it is hidden until someone turns it on. You do not have to enable it today. If you want it: open Start, type `control panel`, open Control Panel, go to Power Options, choose **Choose what the power buttons do**, click **Change settings that are currently unavailable**, tick **Hibernate**, and save. If the tick is missing, stop. Do not start typing repair commands from a video. The option depends on the machine.",
        "**Shut down** closes your programs and turns the machine off. Use Start → Power → Shut down, then wait. Waiting means the screen goes dark and the fans stop. Walking away at the logo is how a shutdown gets interrupted. On many Windows PCs, Shut down is not a full reset. A feature called Fast Startup saves part of Windows so the next boot is quicker. Your programs still close. Your unsaved work is still gone. But a problem that lived in that saved kernel can still be there tomorrow.",
        "**Restart** is the full reset. Use it when a program misbehaved, a new device was not noticed, or the machine feels oddly stuck and you have already saved. Restart throws away the Fast Startup snapshot. Shut down may not. This is why a technician says 'restart' and not 'switch it off and on' as if those were identical.",
        "The wall socket is not an off switch. Cutting power while Windows is writing is how files and, over time, disks get hurt. The same is true of holding the power button. Hold it only when the machine will not respond to Start, to Ctrl+Alt+Delete, or to a wait of a full minute. About ten seconds, then release. That is the emergency stop, and you use it rarely.",
        "Do this now, if the machine is yours to turn off. Start → Power → Shut down. Wait for dark and for quiet. Then turn it on again with one press, to prove the leave worked. A machine you can leave and return to is a machine you are no longer afraid of.",
      ],
      remember:
        "Night-time in a building with unstable power: shut down or hibernate, not sleep. Odd behaviour after you have saved: restart, not a pull of the plug.",
    },
    {
      heading: "When the screen does not match this lesson",
      body: [
        "Windows 10 puts Start at the left of the taskbar. Windows 11 often centres the taskbar. Both are current enough to meet in a Nigerian lab in 2026, even though Microsoft ended support for Windows 10 Home and Pro on 14 October 2025. An unsupported Windows 10 machine still follows this lesson. It no longer receives security updates. That is a reason to plan a move, not a reason you cannot learn on it this afternoon. If you are buying new, ask for Windows 11 and an SSD.",
        "A cyber café desktop may already be sitting on a desktop when you arrive. Do not shut it down to practise this lesson if the attendant did not tell you to. Look first: are you in someone else's session, with their documents open? If yes, do not type. Ask, or sign out. Signing out: open Start, click the account name or picture, choose Sign out. If you cannot find it, press Ctrl+Alt+Delete and choose Sign out. That second path works on Windows 10 and Windows 11.",
        "A family laptop with no password will not show the sign-in step this lesson described. Clicking the picture and landing on the desktop is success, not a skipped lesson.",
        "A Mac is a computer and it is not this click-path. The four jobs are the same. The shut-down menu is not Start. Do not hunt for a Windows key that is not there. If a Mac is all you have, use this page for the model — input, processing, storage, output, one press, wait, do not pull the power — and ask someone who uses that Mac for the names of the buttons before you follow a Windows menu.",
        "Your phone is a computer that hid the tower. It will not teach you Alt+Tab, a file you can hand to an office, or a shutdown that protects a disk. Keep the phone for this page if you need it beside you. Do the steps on the machine.",
      ],
      remember:
        "Same jobs, different furniture. If the button is not where this page said, match the job — power, start, close — before you decide you are lost.",
    },
    {
      heading: "The small details that stop the hour",
      body: [
        "Caps Lock is a key, not a fault. If every letter comes out in capitals, look for a light on the key or on the keyboard, and press Caps Lock once. The next lesson lives on the keyboard. Today, that light is the whole diagnosis.",
        "A single click selects or presses a button. A double click opens a desktop icon. The taskbar wants one click. If you double-click Start, you may open the menu and close it again and think nothing happened. One click, then look.",
        "The cursor is a sentence. An arrow can select. An I-beam means text will land there. A spinning circle means wait, not click again. Clicking through a spin is how one slow program becomes three copies of itself.",
        "Brightness is a key or a slider, often a sun icon, sometimes Fn plus a function key on a laptop. A black screen with a faint glow, visible if you look from the side, is often brightness, not death. Tilt the screen or press the sun key before you start the cable checklist. Then do the checklist anyway if it stays black.",
        "If you must leave a shared machine for a minute, press the Windows key and L. That locks it. It is not a shutdown. Your work is still open behind the lock, which means a power cut can still eat it. Lock is for a person walking past. Shut down is for going home.",
      ],
      remember:
        "Look for a light, a cable, or a key you did not mean to press before you look for a fault.",
    },
  ],
  figures: [
    {
      id: "four-jobs",
      src: "/images/classes/computer-basics/four-jobs.jpg",
      alt: "Diagram of four jobs in a row: input, processing, storage and output, with the line 'When something fails, ask which of these four stopped.'",
      caption:
        "Illustration, not a photo of a particular machine. Input is how you speak to it. Processing is the CPU at work. Storage keeps work after the power is gone. Output is how it answers. RAM, which is wiped in a power cut, sits with processing — it is not the storage box.",
      afterHeading: "Four jobs, and why the names matter",
    },
    {
      id: "desktop-setup",
      src: "/images/classes/computer-basics/desktop-setup.jpg",
      alt: "Labeled desk: monitor, keyboard, mouse, system unit, power button, power cable and surge protector.",
      caption:
        "A desktop in pieces. The monitor (1) is only the window. The computer is the system unit (4). Its power button (5) is the round mark on the tower, not the button on the screen. The cable should reach a surge protector (7), not a bare socket. Original illustration — your tower may stand on the other side of the desk.",
      afterHeading: "What is actually in front of you",
    },
    {
      id: "laptop-parts",
      src: "/images/classes/computer-basics/laptop-parts.jpg",
      alt: "Open laptop with labels for screen, webcam, keyboard, touchpad, power button, USB, HDMI, headphone jack, charging port and battery.",
      caption:
        "Same four jobs, joined. The touchpad is the mouse. The power mark may sit somewhere else on your laptop — match the symbol, not this drawing's corner. Ports move by model. The battery is inside and wears out; a machine that only lives on the charger has a tired battery, not necessarily a dead computer.",
      afterHeading: "What is actually in front of you",
    },
    {
      id: "dark-screen",
      src: "/images/classes/computer-basics/dark-screen.jpg",
      alt: "Six-step flowchart for a dark screen: computer power button, monitor light, both power cables, video cable, wait two minutes, then stop without opening the case.",
      caption:
        "Check in this order and stop at the first thing that is wrong. Step 6 is a real instruction: do not open the case in this lesson. A dark screen is usually a second power button, a cable, or a wait.",
      afterHeading: "First success: one press, then wait",
    },
    {
      id: "ports",
      src: "/images/classes/computer-basics/ports.jpg",
      alt: "Six ports in a grid: USB-A, USB-C, HDMI, Ethernet, audio jack and VGA, each with its job.",
      caption:
        "Match the shape on your machine to the shape here. USB-A is the rectangle. USB-C is the small oval. HDMI is the wide video plug. Ethernet has a clip. The audio jack is round. VGA is the blue trapezoid, still common on projectors. Positions differ. Shapes do not.",
      afterHeading: "Ports: match the shape, not the hope",
    },
    {
      id: "desktop-screen",
      src: "/images/classes/computer-basics/desktop-screen.jpg",
      alt: "Simplified desktop illustration labeling icons, Start, taskbar, open program buttons, notification area, and the minimize, maximize and close controls.",
      caption:
        "An illustration of the jobs on screen, not a screenshot. Windows 10 puts Start on the left. Windows 11 often centres the taskbar. Minimize hides the program on the taskbar. Maximize fills the screen. Close quits it. Icons are shortcuts, not the files themselves.",
      afterHeading: "The desktop, named",
    },
    {
      id: "power-choices",
      src: "/images/classes/computer-basics/power-choices.jpg",
      alt: "Four panels: Sleep, Hibernate, Shut down and Restart, with a footer that the wall socket is not an off switch.",
      caption:
        "Sleep keeps work in memory and loses it if the power cuts. Hibernate writes that work to the drive, then powers off — and is often hidden. Shut down closes your programs; on many Windows PCs it is not a full reset. Restart is the full reset. The socket is not a fifth option.",
      afterHeading: "How to leave without losing the machine",
    },
  ],
  demonstration: {
    intro:
      "If you are alone, these are your steps. Do them on the machine, in order, and do not skip the wait. If you are in class, watch once while the instructor narrates, then do the same cycle yourself with the page closed. The point of the second pass is that your hands remember.",
    steps: [
      {
        step: "Name the pieces before you touch power",
        detail:
          "Hand on each thing as you say it: screen, keyboard, pointing device, computer (tower or laptop body), power button, power cable. On a desktop, also find the monitor's own power button so you do not confuse the two.",
      },
      {
        step: "Seat the cables you can see",
        detail:
          "Push the power cables home. On a desktop, check the video cable at the tower and at the monitor. Match HDMI or VGA by shape. Do not open the case.",
      },
      {
        step: "One press, then hands off",
        detail:
          "Press the computer's power button once and release. Say out loud what you are waiting for: a light, a logo or a spinning circle, then a sign-in screen or a desktop. Wait up to two minutes before you call it a failure.",
      },
      {
        step: "Sign in, or stop",
        detail:
          "Click the account you are allowed to use. If a password you do not know appears, stop and ask. Do not try a handful of guesses.",
      },
      {
        step: "Tour the desktop with names",
        detail:
          "Point at an icon, the taskbar, Start, the clock and the notification area. Say whether Start is on the left (typical of Windows 10) or centred (typical of Windows 11). Neither is a fault.",
      },
      {
        step: "Open Notepad from search",
        detail:
          "Press the Windows key, type `notepad`, press Enter. You should see a white page and a blinking cursor. Type your first name.",
      },
      {
        step: "Open Calculator and switch",
        detail:
          "Windows key, type `calculator`, Enter. Press Alt+Tab and land on each window once. Then click each taskbar button once, so you have both routes.",
      },
      {
        step: "Close, and answer the save question",
        detail:
          "Close Calculator with the X. Close Notepad with the X or Alt+F4. When Windows asks about saving, choose Don't save. You are learning the question, not keeping the file.",
      },
      {
        step: "Shut down and wait for quiet",
        detail:
          "Start → Power → Shut down. Stay until the screen is dark and the fans have stopped. If this is a shared café machine the attendant did not give you, skip this step and sign out instead: Ctrl+Alt+Delete → Sign out.",
      },
      {
        step: "Come back once",
        detail:
          "Press power once more, wait, and reach the desktop again. The return is part of the success. A person who can leave and come back is finished with the fear, even if they are still slow.",
      },
    ],
  },
  practice: {
    title: "The cycle, without the page",
    brief:
      "Close this lesson. On a machine you are allowed to shut down, do the whole arrival and departure from memory. If you get stuck, open the page at the step you lost — not at the top. In class, the instructor watches and does not point unless you have stopped for a full minute.",
    steps: [
      "Name the computer, the screen, the keyboard and the pointing device out loud.",
      "Point to the power button you will use, and say why it is not the monitor's button.",
      "Power on with one press and wait for the desktop without a second press.",
      "Open Notepad by typing its name after Start, not by hunting icons.",
      "Open Calculator, switch with Alt+Tab, and close both.",
      "If Notepad asks about saving, choose Don't save, and say why it asked.",
      "Shut down from the power menu and wait until the machine is quiet.",
    ],
    standard:
      "Every step done without a prompt. Hesitation is fine. A second press of the power button during boot is not, unless the first press truly did nothing for two minutes and you have checked the cables. Shutdown through Windows, not at the socket.",
  },
  exercises: [
    {
      title: "Name the four jobs on this desk",
      kind: "Recognition",
      prompt:
        "Look at the machine in front of you, or at the desktop diagram if you are still on your phone. Write four lines: input, processing, storage, output. Beside each, name the actual object on this desk that does that job. If you cannot see storage, write 'inside the tower or the laptop body' — do not invent a brand.",
      expected:
        "Input names the keyboard and the mouse or touchpad. Processing and storage are both inside the system unit or laptop, and you do not pretend you can see the chip. Output names the screen, and the speakers if they are there.",
      solution:
        "A desktop's input is the keyboard and mouse. Its output is the monitor, plus speakers if any. Processing (the CPU and RAM) and storage (HDD or SSD) are inside the system unit, which people wrongly call the CPU. On a laptop the same four sit in one body: keyboard and touchpad in, screen and speakers out, CPU, RAM and drive inside. If you wrote 'the screen is the computer', go back to the labeled desk diagram and put your hand on the tower.",
    },
    {
      title: "One press, one program, one departure",
      kind: "Guided",
      prompt:
        "From a fully off machine: one press, desktop, Notepad, your first name, close without saving, shut down, wait for quiet. Time the boot with your phone. Write the number down.",
      hint: "If you are not allowed to shut a café machine down, do the open-and-close half only, then sign out with Ctrl+Alt+Delete.",
      expected:
        "You reach the desktop without a second press. Notepad shows your name. The save question appears, and you choose Don't save. The machine goes quiet after Shut down. You have a boot time written down — ten seconds or two minutes are both acceptable.",
      solution:
        "Start is the Windows key or the Start button. Notepad is typed, not hunted. The save question appears because the name was in RAM and had not been written to the drive. Don't save is the right choice for this drill. Shut down is Start → Power → Shut down, then a real wait. A boot under about half a minute often means an SSD. A boot near two minutes often means a hard disk. Neither number means you failed the drill.",
    },
    {
      title: "The other shape of computer",
      kind: "Variation",
      prompt:
        "If you practised on a desktop, sit at a laptop, or the reverse. Name the pointing device, find the power mark, and find two ports by shape. Do not shut down a machine other people are using. Identifying is enough.",
      expected:
        "You can say touchpad or mouse correctly for that machine, point at the power symbol, and name two ports (for example USB-A and HDMI, or USB-C and the audio jack) by shape rather than by 'the one on the left'.",
      solution:
        "The laptop's mouse is the touchpad, unless a USB mouse is plugged in — then you have two, and both work. The power symbol is the circle with a line, not the sun key. Port positions are allowed to disagree with the diagram. USB-A is rectangular, HDMI is wide and flat, USB-C is a small oval, the audio jack is round, VGA is a blue trapezoid, Ethernet has a clip. Two correct shapes is the pass.",
    },
    {
      title: "A dark screen, on paper",
      kind: "Mini-task",
      prompt:
        "Your neighbour says the shop desktop is dead. The tower is silent, the monitor is dark, and they have already pressed 'the button' several times. Write the checks you would do, in order, and write the one thing you will not do.",
      expected:
        "Your list separates the monitor's button from the tower's button, includes both power cables and the video cable, includes a wait with no further pressing, and ends with 'stop and tell the owner' rather than opening the case.",
      solution:
        "Ask which button they pressed. Check the monitor's own light, then the tower's power button, one press only. Follow both power cables to the surge protector or the wall. Seat the video cable at both ends, matching HDMI or VGA by shape. Wait two minutes. If it stays dark and silent, stop. Do not open the case, do not hold the power button as a remedy for a machine that never started, and do not keep pressing. Repeated presses are a cause of confusion, not a diagnosis.",
    },
    {
      title: "Which leaving?",
      kind: "Challenge",
      prompt:
        "Three situations. For each, choose sleep, hibernate, shut down, or restart, and write one sentence why. 1) You are going to the market for twenty minutes and the inverter is on. 2) The browser has frozen, and you saved the letter in Word two minutes ago. 3) You are closing the shop for the night, and the light failed twice today.",
      expected:
        "Three different choices, with reasons that mention power or a full reset. You do not pick shut down for all three.",
      solution:
        "1) Sleep is reasonable if the inverter is actually holding and you will be back soon — work stays in RAM and the wake is fast. If you do not trust the inverter, hibernate or shut down. 2) Restart. The letter is saved, and a frozen program is exactly the case where a full reset beats a Fast Startup shutdown. 3) Shut down, or hibernate if you need the same windows tomorrow and you have confirmed hibernate is available. Sleep is the wrong night-time choice after a day of power cuts. The wall socket is not the answer to any of the three.",
    },
  ],
  pitfalls: [
    {
      problem: "You press the power button again and again because the screen stays dark",
      fix: "Press once and wait two minutes. Check you pressed the tower's button, not only the monitor's. Repeated presses can force a recovery screen or turn the machine off just as it was about to arrive.",
    },
    {
      problem: "You call the tower 'the CPU' and ask the village for a new CPU when the machine will not light",
      fix: "The CPU is a chip inside the box. Say system unit, or tower, until you have opened a case with someone who knows what they are looking at. The wrong name buys the wrong part.",
    },
    {
      problem: "You finish by switching the socket off",
      fix: "Start → Power → Shut down, then wait for dark and quiet. The socket is for after the machine has finished writing, or for a surge protector you switch off once the fans have stopped.",
    },
    {
      problem: "Start is in the middle of the bar and you think the lesson is for a different computer",
      fix: "That is Windows 11's usual layout. Windows 10 keeps Start on the left. Click it anyway. Search works the same: type the program's name.",
    },
    {
      problem: "You double-click Start and the menu flashes and vanishes",
      fix: "Start, taskbar buttons and menu items want one click. Desktop icons want two. One click, then look at what changed.",
    },
    {
      problem: "A program will not close and you hold the power button",
      fix: "Try the X. Then Alt+F4. Then Ctrl+Shift+Esc to open Task Manager, select the stuck program, and choose End task. The hold is the last resort, after a real wait, because it cuts power the way a socket does.",
    },
    {
      problem: "You think an icon on the desktop is the file itself",
      fix: "An icon is a door. The file lives on the drive. Do not 'tidy' icons today. The files lesson will show you where the room actually is.",
    },
  ],
  troubleshooting: [
    {
      symptom: "You pressed power and the screen is still black after two minutes.",
      likelyCause:
        "The monitor is off, the video cable is out, you pressed the monitor's button instead of the computer's, or the machine is a laptop with a flat battery. A dead computer is the last guess, not the first.",
      check:
        "Is there any light on the tower or laptop? Is the monitor's own light on? Follow both power cables. Seat the video cable at both ends. On a laptop, plug the charger in and look for a charging light before you press power again.",
      fix: "Correct the one thing that was wrong — usually a second power button or a loose video cable — then one press, and wait again. Use the dark-screen diagram and stop at the first failed check.",
      prevention:
        "Before you sit down tomorrow, glance at the monitor light and the video cable. Make that a habit, the way you check a generator has fuel.",
      whenToStop:
        "No light anywhere, cables are seated, charger is known-good, and a second single press after a two-minute wait still does nothing. Tell the owner. Do not open the case.",
    },
    {
      symptom: "You hear a fan, or see a light on the tower, but the monitor stays black.",
      likelyCause:
        "The computer is probably on. The picture is not arriving. That is an output-side problem: monitor power, brightness, or the video cable.",
      check:
        "Monitor power light. Brightness, including a sun key if this is a laptop. Video cable seated at both ends, correct shape. Try the monitor's input button if it has one — some monitors are listening to HDMI while you plugged in VGA.",
      fix: "Seat the cable or switch the monitor's input. Give it ten seconds after each change. Do not restart the tower until the cable is seated; restarting will not push a picture down a cable that is out.",
      prevention: "When you unplug a monitor, unplug the video cable last and remember which shape you used.",
      whenToStop:
        "The cable is seated, the monitor has power, you have tried its input button, and another monitor — if you can borrow one — also stays black. That can be the video port. It is a repairs problem.",
    },
    {
      symptom: "Windows asks for a password you were never given.",
      likelyCause:
        "You are at someone else's account, or the account has a password the owner set and then forgot to tell you. It is not a fault in the keyboard yet.",
      check:
        "Read the name on the sign-in screen. Is it yours? Is Caps Lock lit? A password is case-sensitive. A light on Caps Lock turns a correct password into a wrong one.",
      fix: "If Caps Lock is on, press it once and try the password you were actually given, once. If you were given none, stop. Ask the owner. Do not keep trying.",
      prevention:
        "Before you depend on a machine, know the account name and where the password is written. In class, that is the board. At home, that is a decision you make while you still remember it.",
      whenToStop:
        "Two failed attempts, or any message that the account is locked. Further guesses make the lock longer.",
    },
    {
      symptom: "The desktop appears, then the machine turns itself off within a minute.",
      likelyCause:
        "Heat, a failing power supply, or a loose power cable that sags out. Less often, a battery on a laptop that is not actually charging. This is not something you fix by clicking.",
      check:
        "Is the power cable still seated? Is the room very hot, or is the tower stuffed against a wall with no air? On a laptop, does the charging light stay on?",
      fix: "Seat the cable. Give the tower air. Let it cool for ten minutes and try one press. If it dies again, stop using it. A machine that cuts out while writing is how files get damaged.",
      prevention:
        "Keep the tower off the floor if you can, and out of a closed cabinet. Dust and heat are ordinary here, and they show up as exactly this symptom.",
      whenToStop:
        "It happens twice. Do not keep booting it to 'see if it holds'. Tell the owner, or bring it to the repairs class. Do not open it while it is plugged in.",
    },
    {
      symptom: "You chose Shut down yesterday, but this morning your programs are still open.",
      likelyCause:
        "You chose Sleep, or you closed the lid of a laptop that is set to sleep, or Shut down did not finish because the power was cut during the wait. Fast Startup does not reopen your programs. If the programs are back, the machine never fully left.",
      check:
        "Start → Power. Read the words before you click. After you click Shut down, did you wait for dark and quiet, or did you leave at the spinning circle?",
      fix: "Save anything you meant to keep, then Shut down and wait. If you need those exact windows tomorrow and the power is unreliable, use Hibernate once you have turned that option on — not Sleep.",
      prevention:
        "Say the word you are clicking. Sleep and Shut down sit next to each other. A lid closed in a hurry is sleep on most laptops.",
      whenToStop:
        "You are sure you waited for a full shutdown and the old windows still return every morning. That is unusual. Note it for a technician. Do not keep cutting the socket to 'really' turn it off.",
    },
    {
      symptom: "A program is frozen. The window will not close.",
      likelyCause:
        "That one program has stopped listening. The rest of Windows is often fine. Restarting the whole machine is the larger hammer, and it throws away unsaved work in every other window.",
      check:
        "Does the mouse still move? Does Alt+Tab still show other windows? If yes, Windows is alive and one program is stuck.",
      fix: "Ctrl+Shift+Esc opens Task Manager. Click the stuck program's name. Choose End task. The other programs should still be there. Save them. If the whole screen ignores the mouse and the keyboard, wait a full minute, then try Ctrl+Alt+Delete. If nothing answers, hold the power button for about ten seconds. That is the emergency, and unsaved work in every program is gone.",
      prevention:
        "Save before a program has a chance to freeze, not after. Ctrl+S becomes useful the week you learn files. Until then, do not type anything in this lesson you needed to keep.",
      whenToStop:
        "Ending the task does not work, and a restart does not work, and the freeze returns immediately. Write down the program's name and what you clicked just before it froze. That note is what you hand to a person who can help.",
    },
    {
      symptom: "Every letter is a capital, or the number keys do nothing useful.",
      likelyCause:
        "Caps Lock or Num Lock is on. Both have lights. Neither means the keyboard is ruined.",
      check: "Look at the small lights on the keyboard, often on the keys themselves or at the top-right of the board.",
      fix: "Press Caps Lock once to return to ordinary letters. Press Num Lock once if the number pad is typing arrows instead of numbers. The next lesson treats this properly. Today, the light is the diagnosis.",
      prevention: "Glance at those lights when the typing looks possessed, before you unplug the keyboard.",
      whenToStop:
        "The lights are correct, another keyboard does the same thing, and you still get letters you did not type. That can be a language layout. Stop and ask. Do not keep uninstalling things.",
    },
  ],
  safetyNotes: [
    "Do not open the case while the machine is plugged in. Do not open it at all in this lesson. Identification through the holes of a tower is enough. The repairs course opens cases, unplugged, with a procedure.",
    "A surge protector is the minimum between a desktop and a Nigerian socket. A UPS is better if you can get one, because it gives you the minute you need to shut down when the light fails. Neither device helps if you never shut down and always let the cut do it for you.",
    "Liquids and the keyboard do not share a desk. If liquid is spilled, shut down properly if the machine will still obey, pull the power, and leave it. Do not press keys to 'test' them while they are wet.",
    "On a shared or café machine: do not tick 'remember this password', do not sign your personal account into the browser and walk away, and do not leave a flash drive in the port. Sign out (Ctrl+Alt+Delete → Sign out) rather than only closing the window. Windows+L locks your own machine if you step away. It is not a substitute for signing out of a shared one.",
    "Holding the power button and switching off at the wall are emergency stops. They cut power while Windows may be writing. Use them when the machine will not answer, not as the ordinary way to finish for the day.",
    "If a sign-in screen shows an account that is not yours, you are in the wrong session. Do not click through it to 'have a look'. Accounts are people. Ask, or sign out.",
  ],
  expertNotes: [
    "The notification area is the first glance of your working life. Network, volume, battery. Most early 'faults' are announced there by an icon, not by an error in English.",
    "If you are choosing a first laptop and the budget is tight, buy the SSD and 8 GB of RAM before you buy a famous processor. Microsoft's minimum for Windows 11 is 4 GB and 64 GB. Daily use wants more. A tired battery is a replacement, not a new computer.",
    "Fast Startup is why a technician insists on Restart. Shut down can save part of Windows for a quicker next boot. Restart does not. You do not need to turn Fast Startup off today. You need to know that 'I switched it off last night' is not always a full reset.",
    "A machine that cannot take Windows 11 is often failing a security-chip check called TPM, or Secure Boot, not failing because it is weak. That is a later conversation. It is not a reason to throw the machine out before you have learned on it.",
    "Dust, sun, and a tower on a bare floor will cause more deaths in this climate than a wrong click. Air around the case, and a surge protector, beat any software tip in this lesson.",
  ],
  vocabulary: [
    {
      term: "System unit",
      meaning:
        "The tower that contains a desktop's working parts. Often wrongly called the CPU. The CPU is a chip inside it.",
    },
    {
      term: "CPU",
      meaning:
        "The processor chip that carries out instructions. Not the box, not the screen.",
    },
    {
      term: "RAM",
      meaning:
        "Fast temporary memory for work in progress. Cleared when power is lost. Unsaved typing lives here.",
    },
    {
      term: "Storage (HDD / SSD)",
      meaning:
        "The drive that keeps files when the power is off. An SSD is the usual reason an old machine starts to feel quick.",
    },
    {
      term: "Input / output",
      meaning:
        "Input is how you speak to the machine (keyboard, mouse, touchpad). Output is how it answers (screen, speakers, printer).",
    },
    {
      term: "Port",
      meaning:
        "A socket identified by shape: USB-A, USB-C, HDMI, Ethernet, audio jack, VGA.",
    },
    {
      term: "Taskbar",
      meaning:
        "The strip along the bottom. Holds Start, open programs, the clock and the notification area.",
    },
    {
      term: "Sleep / hibernate / shut down / restart",
      meaning:
        "Sleep keeps work in RAM. Hibernate writes it to the drive, then powers off. Shut down closes programs. Restart is the full Windows reset.",
    },
    {
      term: "Fast Startup",
      meaning:
        "A Windows behaviour that can make Shut down skip a full reset. Restart still does a full reset. It does not keep your open programs.",
    },
  ],
  homework: [
    {
      task: "One unsupervised return",
      detail:
        "Later today, with the page closed, turn the machine on, open Notepad, close it, and shut down. Write how many seconds the boot took. Bring the number to class. The number is not a grade. The fact that you did it alone is the grade.",
    },
    {
      task: "Label six ports",
      detail:
        "On a machine you are allowed to handle, find as many of these as exist: USB-A, USB-C, HDMI, Ethernet, audio jack, VGA. Write the names. If one is missing, write 'not on this machine'. Do not force any plug.",
    },
    {
      task: "Teach the four jobs in one minute",
      detail:
        "Explain input, processing, storage and output to a person who was not in the room. If you cannot say where an unsaved line goes when the light fails, reread the RAM section and try again.",
    },
  ],
  mastery: [
    "I can point to the computer as distinct from the screen.",
    "I can name the four jobs and say which one loses an unsaved line in a power cut.",
    "I turn the machine on with one press and wait, even when I want to press again.",
    "I know what to do if Windows asks for a password I was not given: stop.",
    "I can open Notepad by typing its name, switch with Alt+Tab, and close it.",
    "I can say why a save question appeared, and I know Don't save was a choice, not an error.",
    "I shut down from the power menu and wait for quiet. I do not use the socket as the off switch.",
    "I can tell sleep from restart in one sentence each.",
    "I can run the dark-screen checks in order, and I know when to stop.",
    "I know whether this machine is Windows 10 or Windows 11, and I am not thrown if Start is in the centre.",
  ],
  rubric: [
    {
      criterion: "Hardware identification",
      passing: "Names the screen, keyboard, pointing device and computer, and does not call the tower the CPU.",
      excellent:
        "Also names four ports by shape and says what each is for, including the difference between the monitor button and the computer button.",
    },
    {
      criterion: "Power procedure",
      passing: "Powers on with one press and shuts down through Windows.",
      excellent:
        "Waits through a slow boot without a second press, and can explain why restart is not the same as shut down.",
    },
    {
      criterion: "Desktop navigation",
      passing: "Opens Notepad from Start search and closes it.",
      excellent: "Switches with Alt+Tab, answers the save question correctly, and locks or signs out appropriately on a shared machine.",
    },
    {
      criterion: "Diagnosis",
      passing: "Suggests a cable or the monitor button when a screen is dark, rather than 'it is spoilt'.",
      excellent:
        "Runs the checks in order, separates a fan-running black screen from a silent machine, and stops before opening the case.",
    },
  ],
  faqs: [
    {
      q: "I am older than the other students. Will I keep up?",
      a: "This session was written for a person who has never sat at a desktop. Age is not the obstacle. Skipping the wait, and skipping the second practice later the same day, is the obstacle. Do the cycle twice. Speed is not the mark.",
    },
    {
      q: "The machine takes almost two minutes to show the desktop. Is it damaged?",
      a: "Usually it is a hard disk, not damage. Note the time. An SSD is the upgrade that changes that wait. Do not pay for a 'scan' that promises to make a hard disk young again. You can learn on a slow machine. You should not buy one if you have a choice.",
    },
    {
      q: "What should I buy if this is my first computer?",
      a: "A laptop with an SSD and at least 8 GB of RAM, from a brand whose charger and battery you can replace locally. Microsoft's minimum for Windows 11 is 4 GB of RAM and 64 GB of storage — that is the floor for installation, not the floor for a pleasant day. Ask for Windows 11. Buy a surge protector in the same week. Confirm the current minimum on [Microsoft's Windows 11 specifications](https://www.microsoft.com/en-us/windows/windows-11-specifications) before you let a seller argue you out of the SSD.",
    },
    {
      q: "The power went out while I was typing. Is the work gone?",
      a: "If you had not saved, the last unsaved minutes are gone. They were in RAM. That is the lesson, not a special failure of your machine. This session told you not to type anything you needed to keep. From the files week onward, save as you go. Some programs keep an automatic copy. You will meet that when you meet Word. Do not assume every program did.",
    },
    {
      q: "Do I need to know what is inside the case?",
      a: "Not to finish this lesson. You need to know that the case is not opened while plugged in, and that 'CPU' is not the name of the box. The repairs course opens the case. Today, cables, buttons and the four jobs are the whole interior you need.",
    },
    {
      q: "Our office still runs Windows 10. Is this lesson wrong for us?",
      a: "No. Start is on the left, and the jobs are the same. Microsoft ended support for Windows 10 Home and Pro on 14 October 2025, so that office machine is no longer receiving security updates. Learn on it. Do not pretend the missing updates are harmless. Moving it is a separate decision, and it is not required to finish tonight's practice.",
    },
  ],
  sources: [
    {
      title: "Windows 11 specifications and system requirements",
      url: "https://www.microsoft.com/en-us/windows/windows-11-specifications",
      note: "Checked 26 September 2026. States that support for Windows 10 ended on 14 October 2025, and lists Windows 11 minimums: 4 GB RAM, 64 GB storage, TPM 2.0. The lesson treats 8 GB and an SSD as the practical daily floor, which is our teaching judgement, not Microsoft's minimum.",
    },
    {
      title: "Windows 10 Home and Pro lifecycle",
      url: "https://learn.microsoft.com/en-us/lifecycle/products/windows-10-home-and-pro",
      note: "The notice on this page says end of support on 14 October 2025. The dates table lists 15 October 2025. If the exact day matters for a purchase or a compliance question, read the page rather than either sentence alone.",
    },
    {
      title: "Microsoft Support — Windows",
      url: "https://support.microsoft.com/en-us/windows",
      note: "Menu labels for Fast Startup and Hibernate move between Windows 10, Windows 11, and later updates. The stable path taught here is Control Panel → Power Options → Choose what the power buttons do. If that label is missing, search this support site for 'shut down, sleep, or hibernate' rather than following a video.",
    },
  ],
};
