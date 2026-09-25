import type { SessionLecture } from "../types";

/**
 * Computer Repairs — ₦25,000 · 4 weeks · 8 sessions.
 * Sessions 1 to 3. (Sessions 4–6 in computer-repairs-b.ts, 7–8 in computer-repairs-c.ts.)
 */
export const computerRepairsLessonsA: Record<string, SessionLecture> = {
  "inside-the-machine": {
    summary:
      "You cannot diagnose what you cannot picture. This session opens a real machine and names every component, explains what each one actually does and how they depend on each other, then teaches the mental model that turns a list of symptoms into a probable cause.",
    objectives: [
      "Identify every major component inside a desktop and a laptop by sight",
      "Explain what each component does and what fails when it dies",
      "Describe how components depend on each other during startup",
      "Explain what RAM, storage and the CPU each contribute to speed",
      "Read a specification sheet and say what it means for real use",
      "Use the dependency model to narrow a fault before touching a screwdriver",
    ],
    blocks: [
      {
        heading: "The machine as a system, not a box of parts",
        body: [
          "A computer is not a collection of independent components; it is a chain where each link depends on the one before it. The **power supply** converts mains electricity to the low voltages the board needs. The **motherboard** distributes power and carries the signals between everything. The **CPU** executes instructions. **RAM** holds what the CPU is working on right now, and loses it when power goes. **Storage** — an SSD or a hard drive — holds the operating system and your files permanently. The **GPU** draws what you see. And **BIOS/UEFI** is the small firmware that runs first, checks the hardware, and hands over to the operating system.",
          "That chain is why diagnosis works at all. If the power supply is dead, nothing else matters — no lights, no fans. If the motherboard is dead, you may get fans spinning but no display. If RAM is faulty, the machine may power on and then beep or restart endlessly. If storage has failed, the machine starts fine, the fans run, the logo appears, and then it cannot find an operating system. Each failure has a signature, and the signature tells you where in the chain to look.",
          "This is the single most valuable idea in this course: **symptoms point to positions in the chain**. Beginners open a machine and start swapping parts at random. Technicians look at the symptom, place it in the chain, and go to the most likely link first. That difference is what makes a diagnosis take ten minutes instead of three hours.",
        ],
      },
      {
        heading: "The motherboard: the thing everything hangs off",
        body: [
          "The motherboard is a printed circuit board carrying the **CPU socket**, the **RAM slots**, the **storage connectors** (SATA for older drives, M.2 slots for modern NVMe SSDs), the **power connectors**, the **expansion slots**, and the **rear I/O** — the USB ports, network socket and audio jacks you plug things into. It also carries the **chipset**, which manages traffic between the CPU and everything slower.",
          "Two features on it matter constantly in repair work. The **CMOS battery** — a small coin cell — keeps the BIOS settings and the system clock alive when the machine is unplugged. When it goes flat, a machine forgets its boot order and shows the wrong date and time, often with a 'CMOS checksum error' or 'date/time not set' message on startup. That is a five-minute fix with a battery that costs a few hundred naira, and it is one of the most commonly misdiagnosed faults by people who do not know it exists.",
          "The other is the **front panel header** — the small pin block where the case's power button, reset button and indicator LEDs connect. It is fiddly, its pinout varies by manufacturer, and getting it wrong is why a machine sometimes will not power on after a rebuild even though every component is fine. Photograph it before you disconnect it, every time.",
        ],
      },
      {
        heading: "CPU, RAM and storage: what actually makes a machine fast",
        body: [
          "The **CPU** executes instructions, and its speed matters — but for the work most Nigerian users complain about, it is rarely the bottleneck. A ten-year-old CPU still handles browsing, Office and video calls comfortably. **RAM** holds what is open right now; when it fills, the operating system starts using storage as overflow, which is dramatically slower, and the machine becomes unusable. Eight gigabytes is the practical minimum in 2026; four gigabytes is genuinely painful, and upgrading it is the cheapest large improvement available.",
          "**Storage** is where the biggest single gain lives. A mechanical hard drive has a spinning platter and a moving head; an **SSD** has no moving parts and accesses data electronically. The difference is not incremental — it is the difference between a machine that boots in ninety seconds and one that boots in fifteen, and between launching a program in eight seconds and under one. Replacing a hard drive with a SATA SSD is the most cost-effective repair in this entire trade, and it is the recommendation you will make most often.",
          "The combination that matters: a machine that feels slow usually needs **more RAM and an SSD**, not a new computer. Diagnosing that correctly — and saying so honestly when the machine is genuinely fine — is what builds a reputation. The opposite, telling every customer they need a new laptop, works once and destroys trust permanently.",
        ],
      },
      {
        heading: "Laptops and desktops: what differs and why it matters",
        body: [
          "A laptop contains the same components as a desktop, arranged differently and constrained by heat and space. The CPU and GPU are usually soldered to the board rather than socketed, which means they cannot be replaced — a dead CPU on a laptop is a dead board. RAM may be on removable **SO-DIMM** sticks or soldered; storage is usually an M.2 SSD or, on older machines, a 2.5-inch drive in a caddy. The **battery**, the **screen assembly**, the **keyboard** and the **hinges** are all failure points that do not exist on a desktop, and together they account for most laptop repair work.",
          "The consequence for repair work is significant. On a desktop, almost everything is replaceable individually and cheaply. On a laptop, you must check what is actually serviceable on that specific model **before you quote**, because a customer told 'we will replace your RAM' on a machine with soldered RAM has been given a promise that cannot be kept. Look up the model's service manual or a teardown video before committing.",
          "Heat is the other laptop-specific reality. A laptop's cooling is a small fan and a heat pipe with a limited margin, and dust blocks it. A machine that is slow, loud and hot is very often simply clogged — the CPU reduces its own speed to avoid damage, a behaviour called **thermal throttling**, which presents as mysterious slowness. Cleaning the fan and replacing the dried thermal paste routinely restores a machine that a customer believed was dying.",
        ],
      },
      {
        heading: "Reading a specification sheet",
        body: [
          "A specification tells you what a machine can do, and reading one is a real skill. **CPU** is described by family, generation and suffix: 'Intel Core i5-8250U' means an i5, eighth generation, and the 'U' suffix means a low-power chip designed for battery life rather than performance. An AMD 'Ryzen 5 5500U' follows the same logic. Generation matters more than the i3/i5/i7 label — an eighth-generation i5 will usually beat a fifth-generation i7, and customers routinely get this wrong when buying used.",
          "**RAM** is stated as capacity, type and speed: '8GB DDR4-2400'. Capacity is what matters most; the type must match what the board accepts, because DDR3, DDR4 and DDR5 are physically incompatible and will not fit. **Storage** is stated as capacity and type: '256GB NVMe SSD' is fast; '1TB 5400RPM HDD' is slow and large. **Display** is stated as size, resolution and panel type: a 1920×1080 IPS panel is far more pleasant than a 1366×768 TN panel of the same size, and the difference is immediately visible.",
          "Learn to translate these into real use, because that is what customers are actually asking. 'Will this run my work?' means: at least 8GB of RAM, an SSD rather than a hard drive, and a CPU from roughly the eighth generation onward. That description covers browsing with many tabs, Microsoft Office, video calls and light design work — which is what almost everyone means.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor opens a desktop and a laptop side by side, names every component as it is exposed, swaps a CMOS battery, compares a hard drive with an SSD, and works through four symptoms placing each in the dependency chain.",
      steps: [
        {
          step: "Open the desktop",
          detail:
            "Remove the side panel and orient the board. Name the CPU socket, RAM slots, storage connectors, power connectors, expansion slots and rear I/O in sequence.",
        },
        {
          step: "Trace the power path",
          detail:
            "Follow the mains lead to the power supply, then the 24-pin board connector and the CPU power connector. Explain that if this chain fails, nothing else matters.",
        },
        {
          step: "Identify the storage types",
          detail:
            "Show a SATA hard drive and cable beside an M.2 NVMe SSD. Explain the physical and speed difference, and why the SSD swap is the most common recommendation.",
        },
        {
          step: "Remove and read the RAM",
          detail:
            "Release the clips, remove a stick, and read the label: capacity, type and speed. Explain that DDR3, DDR4 and DDR5 are physically incompatible.",
        },
        {
          step: "Find and replace the CMOS battery",
          detail:
            "Locate the coin cell, remove it, fit a new one, and explain the symptoms of a flat one — wrong date and time, forgotten boot order, a checksum error on startup.",
        },
        {
          step: "Photograph the front panel header",
          detail:
            "Show the pin block for the power button and LEDs, photograph it, and explain why getting it wrong leaves a machine that will not power on after a rebuild.",
        },
        {
          step: "Open the laptop",
          detail:
            "Remove the base cover and compare the layout with the desktop. Point out the fan and heat pipe, the SO-DIMM slots and the M.2 slot.",
        },
        {
          step: "Show what is soldered",
          detail:
            "Identify a soldered CPU and soldered RAM on a thin machine. Explain that this is why you must check the service manual before quoting a RAM upgrade.",
        },
        {
          step: "Show the battery and screen assembly",
          detail:
            "Point out the battery, the display cable routing through the hinge, and the keyboard. Explain that these account for most laptop repair work.",
        },
        {
          step: "Read three real specification sheets",
          detail:
            "Take three real laptops and translate each into plain terms: what generation the CPU is, whether the storage is an SSD, and what it can realistically do.",
        },
        {
          step: "Compare a hard drive with an SSD",
          detail:
            "Boot the same machine from each and time it. Show the difference and explain why this is the cheapest large improvement in the trade.",
        },
        {
          step: "Work through four symptoms",
          detail:
            "No power at all; fans spin but no display; powers on then restarts repeatedly; starts normally but cannot find an operating system. Place each in the dependency chain and name the first component to check.",
        },
      ],
    },
    practice: {
      title: "Strip, identify, and diagnose from symptoms",
      brief:
        "You open a desktop and a laptop, label every component from memory, replace a CMOS battery and a RAM stick correctly, then place eight written symptoms into the dependency chain with the first component to check for each.",
      steps: [
        "Photograph the desktop before opening it, then remove the side panel.",
        "Label every major component on your photograph: CPU, RAM, storage, power supply, board, GPU, CMOS battery, front panel header.",
        "Trace the power path from the mains lead to the board connectors and describe it in writing.",
        "Remove a RAM stick, read its label, and record capacity, type and speed.",
        "Refit the RAM correctly, noting how it only fits one way round.",
        "Locate and replace the CMOS battery, recording the symptoms a flat one causes.",
        "Photograph the front panel header before disconnecting anything.",
        "Open the laptop and label its components, marking which are soldered and which are removable.",
        "Identify the fan, heat pipe, battery, display cable and keyboard.",
        "Read three real specification sheets and translate each into what the machine can realistically do.",
        "Take eight written symptoms and place each in the dependency chain.",
        "For each symptom, name the first component you would check and one sentence on why.",
      ],
      standard:
        "Every component correctly labelled on both machines, RAM and CMOS battery handled correctly, soldered versus removable parts correctly identified on the laptop, three specifications translated into plain terms, and all eight symptoms correctly placed in the chain with a justified first component for each.",
    },
    pitfalls: [
      {
        problem: "You start swapping parts before locating the fault in the chain",
        fix: "Place the symptom in the chain first. No power means the supply or board; fans with no display means board, RAM or GPU; booting but no operating system means storage. Random swapping takes hours and teaches nothing.",
      },
      {
        problem: "You quoted a RAM upgrade on a machine with soldered RAM",
        fix: "Check the service manual or a teardown video for that exact model before quoting. A promise that cannot be kept destroys trust faster than anything else in this trade.",
      },
      {
        problem: "You told a customer with a slow machine to buy a new one",
        fix: "Check RAM capacity and whether storage is a hard drive first. Most slow machines need 8GB or more and an SSD, not replacement. Recommending a purchase they do not need works once and ruins your reputation.",
      },
      {
        problem: "You did not photograph the front panel header",
        fix: "Photograph every connector before disconnecting it. Pinouts vary by manufacturer and getting it wrong leaves a machine that will not power on, with every component actually working.",
      },
      {
        problem: "You forced a RAM stick the wrong way round",
        fix: "The notch is offset so it only fits one way. If it needs force, it is the wrong way round or the wrong type — DDR3, DDR4 and DDR5 are physically incompatible.",
      },
      {
        problem: "You dismissed a wrong-date-and-time fault as software",
        fix: "Check the CMOS battery. A flat coin cell resets the clock and the boot order and produces a checksum error on startup. It is a few hundred naira and five minutes.",
      },
    ],
    expertNotes: [
      "Learn the dependency chain so well that you recite it: power, board, CPU, RAM, storage, display. Almost every fault you will meet sits at one of those points, and knowing the order tells you where to start without touching a screwdriver.",
      "Photograph every connector and every screw position before you remove anything, on every job. It costs ten seconds and it is the difference between a confident rebuild and an hour of guessing at the end of a long day.",
      "Keep a spare CR2032 CMOS battery, a known-good RAM stick and a known-good SSD in your kit. Substituting a known-good part is the fastest diagnostic there is, and it settles an argument with a customer in seconds.",
      "Recommend the SSD-and-RAM upgrade honestly, including when the machine does not need it. Customers talk, and the technician who says 'your machine is fine, the problem is elsewhere' is the one who gets called back.",
    ],
    vocabulary: [
      { term: "Motherboard", meaning: "The main circuit board carrying the CPU socket, RAM slots, storage connectors and power distribution." },
      { term: "CMOS battery", meaning: "A coin cell keeping BIOS settings and the clock alive when unplugged. A flat one causes wrong time and forgotten boot order." },
      { term: "SO-DIMM", meaning: "The smaller RAM module used in laptops, as opposed to the full-size DIMM in desktops." },
      { term: "NVMe / M.2", meaning: "The modern fast SSD format plugging directly into the board, replacing SATA cables for most new machines." },
      { term: "SATA", meaning: "The older storage interface using a data cable and a power cable, still common on 2.5-inch drives." },
      { term: "Thermal throttling", meaning: "A CPU deliberately slowing itself to avoid overheating. Presents as mysterious slowness in a dusty laptop." },
      { term: "Front panel header", meaning: "The pin block connecting the case power button, reset and LEDs. Photograph it before disconnecting." },
      { term: "BIOS / UEFI", meaning: "The firmware that runs first, checks hardware and hands over to the operating system." },
    ],
    homework: [
      {
        task: "Label every component from memory",
        detail:
          "Photograph a machine's internals and label every component without looking anything up. Then check your labels and correct them. Repeat until you need no reference.",
      },
      {
        task: "Translate five specification sheets",
        detail:
          "Take five real laptops — from a shop or a marketplace listing — and translate each into what it can realistically do, in plain language a customer would understand.",
      },
      {
        task: "Time a hard drive against an SSD",
        detail:
          "Boot the same machine from each and record the times. This is the evidence you will use with every customer who asks whether an SSD is worth it.",
      },
      {
        task: "Place ten symptoms in the chain",
        detail:
          "Write ten symptoms you have seen or read about, place each in the dependency chain, and name the first component to check. Bring them to the next session.",
      },
    ],
    rubric: [
      {
        criterion: "Component identification",
        passing: "Names the main components.",
        excellent: "Labels every component on both a desktop and a laptop from memory, including the CMOS battery and front panel header.",
      },
      {
        criterion: "System understanding",
        passing: "Knows what parts do.",
        excellent: "Explains the dependency chain and can state what fails when each link breaks.",
      },
      {
        criterion: "Hands-on handling",
        passing: "Can remove and refit parts.",
        excellent: "RAM fitted the correct way round, CMOS battery replaced, connectors photographed before disconnection.",
      },
      {
        criterion: "Specification literacy",
        passing: "Reads capacity figures.",
        excellent: "Reads CPU generation and suffix, RAM type, storage type and panel type, and translates each into real-world capability.",
      },
      {
        criterion: "Diagnostic reasoning",
        passing: "Can guess at a cause.",
        excellent: "Places all eight symptoms correctly in the chain with a justified first component for each, before touching a screwdriver.",
      },
    ],
    faqs: [
      {
        q: "Do I need expensive tools to start?",
        a: "No. A good precision screwdriver set, an anti-static wrist strap, a plastic spudger, isopropyl alcohol and a can of compressed air are enough for most laptop and desktop work. Add a multimeter when you reach power diagnosis in session five.",
      },
      {
        q: "Is computer repair still a viable business with phones everywhere?",
        a: "Yes, and demand is steady. Businesses, schools and individuals all run Windows machines, and the common failures — dust, flat batteries, failing hard drives, insufficient RAM — are constant. The SSD-and-RAM upgrade alone is a large and recurring market in Nigeria.",
      },
      {
        q: "How do I know if a laptop's RAM is upgradeable?",
        a: "Look up the exact model's service manual or a teardown video before quoting. Some machines have SO-DIMM slots, some have one slot plus soldered memory, and thin machines are often fully soldered. Never promise an upgrade you have not confirmed.",
      },
      {
        q: "What is the single most cost-effective repair?",
        a: "Replacing a mechanical hard drive with a SATA SSD. It typically takes a machine from a ninety-second boot to fifteen seconds and makes everything else feel faster too, for a modest parts cost. It is the recommendation you will make most often.",
      },
      {
        q: "Can a dead laptop CPU be replaced?",
        a: "Almost never. Laptop CPUs are soldered to the board on nearly all modern machines, so a failed CPU means a replacement board, which is often uneconomic. This is why diagnosis matters — you must know whether the fault is worth repairing before you quote.",
      },
    ],
  },

  "laptops-safety-identification": {
    summary:
      "Before you open anything you need to work safely and know exactly what you are holding. This session covers electrical safety, static discharge and battery hazards, then how to identify a machine precisely from its model number, read a service manual, and source the right part.",
    objectives: [
      "Work safely around mains power, capacitors and lithium batteries",
      "Protect components from electrostatic discharge",
      "Set up a workspace and tool kit for repair work",
      "Identify a machine exactly from its model and serial numbers",
      "Find and read a service manual or teardown before starting",
      "Source the correct part and avoid the wrong one",
    ],
    blocks: [
      {
        heading: "Electrical safety: what can actually hurt you",
        body: [
          "Most computer repair is low-voltage and safe, but three things are not. **Mains power** — never work on a machine that is plugged in, and do not rely on the power switch being off; unplug it. A desktop power supply contains **capacitors** that hold a charge after unplugging and can deliver a genuine shock, so never open a power supply unit unless you know what you are doing; the professional habit is to replace a suspect supply rather than repair it, because a new one costs less than an injury.",
          "The third is the **lithium battery** in a laptop. These store a great deal of energy, and if punctured, bent or shorted they can heat rapidly, swell and in the worst case catch fire. The rules are firm: never use a metal tool to lever a battery out, never continue working on a battery that is swollen — a swollen pack is a hazard and must be removed carefully and disposed of properly, not put back in a drawer — and if a battery is heavily glued in place, use a recommended solvent and patience rather than force.",
          "Beyond injury, there is the risk to the machine. Shorting a connector with a screwdriver while a battery is connected can kill a board instantly. The habit that prevents almost all of it: **unplug the mains, then disconnect the internal battery, before touching anything else**. On a laptop that means the battery connector comes out first, before any other work begins.",
        ],
      },
      {
        heading: "Static discharge: the invisible damage",
        body: [
          "**Electrostatic discharge** is a small spark you usually cannot feel, and it can damage semiconductor components in a way that does not fail immediately. A board damaged by static may work for weeks and then fail intermittently — which is the worst possible outcome, because the failure appears unrelated to your work and the customer concludes you broke it.",
          "The protection is simple and cheap. An **anti-static wrist strap** clipped to a grounded point keeps you at the same potential as the machine. If you do not have one, **touch an unpainted metal part of the case** before handling components, and keep doing so. Work on a hard surface rather than carpet, which generates charge; do not work in a nylon shirt on a dry day if you can avoid it. Keep components in their **anti-static bags** until the moment you fit them, and handle boards by their edges rather than touching contacts or chips.",
          "Be honest about the risk level: modern components are more resistant than they were, and a great many repairs happen without a strap and nothing goes wrong. But the cost of the precaution is trivial and the cost of intermittent failure is your reputation, so the strap is worth wearing on every job — and it is also a visible signal of professionalism that customers notice.",
        ],
      },
      {
        heading: "Workspace and tool kit",
        body: [
          "A repair workspace needs four things. **Good light** — a lamp directed into the machine, because a dropped screw or a missed connector is invisible in poor light. **Organisation** — a magnetic mat or a set of small containers, because laptop screws are of several different lengths and driving a long screw into a short hole can crack a board. **Space** to lay a machine open and keep parts in order. And a **clean surface**, because dust is the enemy you will be removing.",
          "The tool kit that covers most work: a **precision screwdriver set** with Phillips PH00, PH0 and PH1 bits plus Torx T5 and T6, which covers nearly every laptop and desktop; a **plastic spudger** and a set of **plastic pry tools** for clips and adhesive, because a metal tool marks a case and can cut a cable; **tweezers** for small connectors; **isopropyl alcohol** at 90% or higher and **lint-free cloths** for cleaning; **compressed air** for dust; and a **multimeter** for power and continuity work from session five onward. Add **thermal paste**, a **CMOS battery** and a **known-good RAM stick and SSD** as diagnostic spares.",
          "The organisation habit matters more than the tools. **Photograph before you disassemble**, and lay screws out in the order you removed them — a magnetic mat with a drawn outline of the machine is the cheapest way to guarantee that every screw goes back into its own hole. Most catastrophic repair outcomes are not diagnostic failures; they are a long screw forced into a short hole.",
        ],
      },
      {
        heading: "Identifying the machine exactly",
        body: [
          "'It is an HP laptop' is not enough to order a part. You need the **exact model number**, and there are three ways to get it. On the machine itself: a label on the base, under the battery on older laptops, or in the battery compartment. In the firmware: press the manufacturer's key during startup — commonly F1, F2, F10, Del or Esc — to enter BIOS, where the model and serial are displayed. Or in Windows: **System Information** (`msinfo32`) shows the system model, and `wmic csproduct get name, version, identifyingnumber` in a terminal prints them directly.",
          "Distinguish the **model number** from the **serial number** and from the marketing name. 'HP Pavilion 15' is a marketing name covering many different machines with different boards, screens and keyboards. 'HP 15-cs3021nr' is a model. The serial identifies that individual unit for warranty purposes. Parts are ordered against the model, and sometimes against a specific part number printed on the component itself — which is why, for screens, keyboards and batteries, the reliable method is to open the machine and read the number off the part.",
          "This is the single most common source of wasted money in repair work: ordering a part against a marketing name and receiving something that does not fit. Take the time to get the model number, photograph the label, and where possible read the part number off the failed component before ordering.",
        ],
      },
      {
        heading: "Service manuals and sourcing parts",
        body: [
          "Before opening an unfamiliar machine, find its **service manual** or a **teardown video**. Manufacturers such as Dell, HP and Lenovo publish service manuals listing the disassembly sequence, screw lengths, part numbers and what is removable. Where no manual exists, a teardown video for that exact model shows the sequence and the traps — which screws are hidden under rubber feet or under the keyboard, which clips are fragile, where the display cable runs.",
          "This ten minutes of research prevents almost every bad outcome in disassembly. A technician who opens a machine cold will snap a clip, strip a screw or tear a cable; one who has watched a teardown will know that the keyboard must come off first, that three screws hide under the rubber strip, and that the battery connector is under a plastic cover. The difference in outcome is not skill — it is preparation.",
          "For **sourcing parts**, the reliable order is: the manufacturer's spare parts store using the part number; then a reputable specialist supplier; then a general marketplace, where you must read reviews and check the part number matches exactly. In Nigeria, computer villages and established online vendors carry common parts, but always confirm the model and, for screens, the exact part number and connector type — a screen that fits physically but has a different connector or resolution is a common and expensive mistake.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor sets up a proper workspace, demonstrates safe battery disconnection and static precautions, then identifies three real machines exactly from their labels and firmware, finds their service manuals and prices the correct parts.",
      steps: [
        {
          step: "Set up the workspace",
          detail:
            "Arrange the light, the magnetic mat and the tool kit. Explain why organisation prevents the long-screw-in-a-short-hole failure that cracks boards.",
        },
        {
          step: "Show the tool kit",
          detail:
            "Lay out the screwdriver bits, spudger, pry tools, tweezers, alcohol, cloths, air and multimeter. Explain what each is for and why a metal tool damages a case.",
        },
        {
          step: "Demonstrate the safe shutdown sequence",
          detail:
            "Unplug the mains, then open and disconnect the internal battery first. Explain that this order is the habit that prevents almost all board damage.",
        },
        {
          step: "Show a swollen battery",
          detail:
            "Explain how to recognise swelling, why it must not be forced or put back in a drawer, and how to dispose of it properly. Emphasise never levering with metal.",
        },
        {
          step: "Demonstrate static precautions",
          detail:
            "Fit the wrist strap, show the alternative of touching unpainted case metal, and demonstrate handling a board by its edges from an anti-static bag.",
        },
        {
          step: "Identify a machine from its label",
          detail:
            "Find the base label, read the model and serial, and explain the difference between the marketing name, the model number and the serial.",
        },
        {
          step: "Identify a machine from firmware",
          detail:
            "Enter BIOS and read the model. Then boot to Windows and run msinfo32 and the wmic command, showing both outputs.",
        },
        {
          step: "Show why the marketing name fails",
          detail:
            "Search for parts using 'HP Pavilion 15' and show the incompatible results. Repeat with the exact model number and show the correct parts.",
        },
        {
          step: "Find the service manual",
          detail:
            "Locate the manufacturer's manual for one machine and open the disassembly section, pointing out screw lengths and the sequence.",
        },
        {
          step: "Find a teardown video",
          detail:
            "Locate a teardown for a machine with no manual and note the traps: hidden screws under rubber feet, fragile clips, the display cable route.",
        },
        {
          step: "Read a part number off a component",
          detail:
            "Remove a screen or battery and read its part number. Explain that this is the only reliable way to order a matching part.",
        },
        {
          step: "Price the correct part",
          detail:
            "Compare the manufacturer's spare store, a specialist supplier and a marketplace listing for the same part number, and explain how to verify a listing.",
        },
      ],
    },
    practice: {
      title: "Safe setup and exact identification of three machines",
      brief:
        "You set up a compliant workspace, perform the safe shutdown and static sequence on a laptop, disconnect its battery correctly, then identify three real machines exactly, find a service manual or teardown for each, and source one correct part with its part number verified.",
      steps: [
        "Set up light, a magnetic mat or containers, and lay out your tool kit.",
        "Unplug the mains from a desktop and explain the capacitor risk in a power supply.",
        "Perform the safe sequence on a laptop: unplug, open, disconnect the battery first.",
        "Fit an anti-static wrist strap, or demonstrate the case-touch alternative.",
        "Handle a board by its edges from an anti-static bag and describe correct handling.",
        "Identify machine one from its base label, recording model and serial.",
        "Identify machine two from BIOS, recording what the firmware reports.",
        "Identify machine three using msinfo32 and the wmic command in Windows.",
        "Explain in writing why a marketing name is not sufficient to order a part.",
        "Find a service manual for one machine and note the disassembly sequence and screw lengths.",
        "Find a teardown video for a second machine and list three traps it reveals.",
        "Remove one component and read its part number directly.",
        "Source that part from two suppliers, verify the part number matches exactly, and record both prices.",
      ],
      standard:
        "A workspace with light and screw organisation, the safe shutdown and static sequence performed correctly with the battery disconnected first, all three machines identified by exact model number through two different methods each, a manual or teardown found with traps noted, and one part sourced with its part number verified against the physical component.",
    },
    pitfalls: [
      {
        problem: "You worked on a machine that was still plugged in",
        fix: "Unplug the mains before anything else, and do not trust the power switch. On a laptop, disconnect the internal battery before touching any other component.",
      },
      {
        problem: "You opened a power supply to repair it",
        fix: "Do not. Its capacitors hold a charge after unplugging. Replace a suspect supply instead — a new one costs less than an injury.",
      },
      {
        problem: "You levered a glued battery out with a metal tool",
        fix: "Use a plastic pry tool and a recommended solvent, with patience. Puncturing or bending a lithium cell can cause it to heat rapidly and catch fire.",
      },
      {
        problem: "You put a swollen battery back in a drawer",
        fix: "A swollen pack is a fire hazard. Remove it carefully and dispose of it properly at a collection point. Never store it and never refit it.",
      },
      {
        problem: "You ordered a part against the marketing name",
        fix: "Use the exact model number, and for screens, keyboards and batteries read the part number off the failed component. 'HP Pavilion 15' covers many incompatible machines.",
      },
      {
        problem: "You opened an unfamiliar machine without research",
        fix: "Find the service manual or a teardown video first. Ten minutes of preparation prevents the snapped clip, the stripped screw and the torn cable.",
      },
      {
        problem: "Your laptop screws went back into the wrong holes",
        fix: "Lay screws out in removal order on a magnetic mat and photograph first. A long screw driven into a short hole can crack the board, which is a repair failure no diagnosis would have predicted.",
      },
    ],
    expertNotes: [
      "Disconnect the internal battery before touching anything else inside a laptop, on every single job, without exception. It is the one habit that prevents the largest category of catastrophic repair outcomes, and it costs ten seconds.",
      "Photograph the machine, the screw layout and every connector before disassembly. It is the cheapest insurance in this trade and it is what lets you rebuild confidently at the end of a long day when you cannot remember which screw went where.",
      "Read the part number off the failed component for screens, keyboards, batteries and cables. Ordering against a model number alone is usually fine; ordering against a marketing name is how you end up with a part that fits physically but has the wrong connector.",
      "Wear the wrist strap even when it feels unnecessary. Modern components are fairly resistant, but intermittent static failure appears weeks later and looks like an unrelated fault — which the customer will attribute to you.",
    ],
    vocabulary: [
      { term: "Electrostatic discharge (ESD)", meaning: "A small spark that can damage semiconductors, often causing failure weeks later. Prevented by a wrist strap or touching case metal." },
      { term: "Capacitor", meaning: "A component that stores charge. Power supplies hold charge after unplugging, which is why they are replaced rather than repaired." },
      { term: "Model number", meaning: "The exact identifier parts are ordered against, such as HP 15-cs3021nr. Distinct from the marketing name and the serial." },
      { term: "Serial number", meaning: "The identifier of one individual unit, used for warranty. Not what parts are ordered against." },
      { term: "Part number", meaning: "The number printed on a component itself. The most reliable basis for ordering a screen, keyboard or battery." },
      { term: "Service manual", meaning: "The manufacturer's document giving disassembly sequence, screw lengths and part numbers. Read it before opening." },
      { term: "Spudger", meaning: "A plastic tool for separating clips and adhesive without marking a case or cutting a cable." },
      { term: "Swollen battery", meaning: "A lithium pack that has expanded. A fire hazard — remove carefully, dispose of properly, never refit." },
    ],
    homework: [
      {
        task: "Assemble your tool kit",
        detail:
          "Get the precision screwdriver set, spudger, tweezers, alcohol, cloths, air and a wrist strap. Add thermal paste and a CMOS battery as spares.",
      },
      {
        task: "Identify three machines two ways each",
        detail:
          "For each machine, get the model number from a physical label and from firmware or Windows. Note where they disagree and why.",
      },
      {
        task: "Find three service manuals",
        detail:
          "Locate manuals for three common laptop models and read the disassembly sections. Note how screw lengths are specified.",
      },
      {
        task: "Price one part from three sources",
        detail:
          "Take a real part number and compare the manufacturer's store, a specialist supplier and a marketplace. Note how you verified each listing.",
      },
    ],
    rubric: [
      {
        criterion: "Safety",
        passing: "Works without obvious danger.",
        excellent: "Mains disconnected first, internal battery disconnected before any other work, swollen batteries handled correctly, power supplies never opened.",
      },
      {
        criterion: "Static discipline",
        passing: "Is aware of ESD.",
        excellent: "Wrist strap worn or the case-touch alternative used, boards handled by edges from anti-static bags, work done off carpet.",
      },
      {
        criterion: "Workspace",
        passing: "Has the basic tools.",
        excellent: "Good light, magnetic mat or containers with screws in removal order, photographs taken before disassembly.",
      },
      {
        criterion: "Identification",
        passing: "Can find a model number.",
        excellent: "All three machines identified exactly through two methods each, with the model, serial and marketing-name distinction clearly explained.",
      },
      {
        criterion: "Preparation and sourcing",
        passing: "Can order a part.",
        excellent: "Service manual or teardown consulted with traps listed, part number read off the component, and a part sourced with the number verified.",
      },
    ],
    faqs: [
      {
        q: "Do I really need an anti-static wrist strap?",
        a: "It costs very little and prevents damage that appears weeks later as an intermittent fault, which the customer will blame on you. Touching unpainted case metal before handling components is an acceptable alternative, but the strap is the professional standard and customers notice it.",
      },
      {
        q: "Can I repair a laptop power supply or a desktop PSU?",
        a: "Replace them, do not repair them. Both contain capacitors that hold a charge after unplugging, and a replacement costs far less than an injury or a board destroyed by a failing supply.",
      },
      {
        q: "How do I find a service manual for an obscure laptop?",
        a: "Search the exact model number plus 'service manual' or 'maintenance manual' on the manufacturer's site. Dell, HP and Lenovo publish most of theirs. If none exists, search the model plus 'disassembly' or 'teardown' for a video — that is usually enough.",
      },
      {
        q: "My battery is glued in and will not come out. What do I do?",
        a: "Use a recommended adhesive solvent and a plastic pry tool, working slowly around the edges. Never use a metal tool and never force it. If the pack is swollen, stop and treat it as a hazard rather than a repair problem.",
      },
      {
        q: "How do I avoid buying the wrong screen?",
        a: "Remove the old panel and read its part number, then match it exactly — not just size and resolution, but the connector type and pin count. A panel that fits the lid but has a different connector is a very common and expensive mistake.",
      },
    ],
  },

  "disassembly-and-cleaning": {
    summary:
      "The most common paid job in this trade: open a laptop, clean out the dust that is making it slow and hot, replace the thermal paste, and put it back together working. This session covers the full disassembly and reassembly sequence, cleaning method, and thermal paste application done properly.",
    objectives: [
      "Disassemble a laptop in the correct order without breaking clips or cables",
      "Remove and clean a fan and heatsink properly",
      "Clean old thermal paste and apply new paste correctly",
      "Clean a keyboard, screen and exterior without damaging them",
      "Reassemble correctly with every screw in its own hole",
      "Verify the repair worked by measuring temperature and behaviour",
    ],
    blocks: [
      {
        heading: "Why cleaning is a real repair, not a favour",
        body: [
          "A laptop that has been used for two or three years in a dusty environment is almost certainly running hot, and heat is the reason it feels slow. When a CPU approaches its thermal limit it reduces its own clock speed to avoid damage — **thermal throttling** — and the machine becomes dramatically slower under any load. The customer experiences this as 'my laptop is dying' or 'it is just old', and they are often told to buy a new one. In a large share of cases the actual cause is a fan clogged with dust and thermal paste that has dried to a crust.",
          "The fix costs almost nothing in parts and takes under an hour: remove the dust from the fan and heatsink fins, clean the old paste, apply new paste, reassemble. The result is routinely a machine that runs fifteen to twenty-five degrees cooler and stops throttling, which the customer experiences as a machine that has come back to life. This is the most reliably satisfying job in the trade and the one that generates the most referrals.",
          "It is also honest work, which matters. There is no upsell required and no ambiguity about the outcome — you can measure the temperature before and after and show the customer the difference. That evidence is what turns a one-off repair into a reputation.",
        ],
      },
      {
        heading: "The disassembly sequence",
        body: [
          "The general sequence holds across most laptops, though the details vary — which is why the service manual or teardown from session two comes first. **Power down fully**, unplug the mains, and remove any external devices. **Remove the battery** if it is external, or open the base and disconnect the internal battery connector before anything else. **Remove the base cover**, which is usually held by a ring of Phillips screws — note that some are hidden under rubber feet or under a rubber strip, and that laptop screws are commonly of two or three different lengths.",
          "Then work inward: disconnect the battery if you have not already, remove the **storage** and **RAM** if access is needed, then reach the **cooling assembly**. The fan is usually held by two or three small screws and a delicate power connector that lifts rather than pulls. The **heatsink** is a copper pipe assembly bolted to the CPU and often the GPU with **spring-loaded screws that must be loosened in a diagonal sequence** — numbered on the heatsink itself on many machines — to avoid cracking the die by releasing pressure unevenly.",
          "Throughout, the two rules are: **photograph before each step**, and **lay screws out in removal order**. The most expensive mistake in laptop repair is not a diagnostic error; it is a long screw driven into a short hole, which can crack the board and turn a fifty-minute cleaning into a written-off machine.",
        ],
      },
      {
        heading: "Cleaning the fan and heatsink",
        body: [
          "The fan comes out first, and it is fragile: its blades are thin plastic and its connector is small. Blow dust out with compressed air, but **hold the fan blades still while you do it** — spinning a fan with compressed air can generate a voltage in its motor and damage it, and it can also overspeed the bearing. A soft brush loosens the compacted dust that air alone will not move, which after two years is most of it.",
          "The **heatsink fins** are where the real blockage lives. Dust forms a felt-like mat across the fins, and until it is removed, air cannot pass. Blow from the inside outward, and where the mat is compacted, lift it off gently with tweezers rather than trying to blast it through — pushing it further in only packs it tighter. Check the **exhaust vent** in the case as well; a mat of dust sitting just inside the vent is extremely common and is often the whole problem.",
          "Then clean the rest of the interior gently: the board surface, the keyboard underside if exposed, and any other fan. Do not use a vacuum cleaner directly on a board, because it generates static; compressed air and a brush are correct. Wipe the interior surfaces with a lint-free cloth slightly dampened with isopropyl alcohol, which evaporates without leaving residue.",
        ],
      },
      {
        heading: "Thermal paste: the part people get wrong",
        body: [
          "**Thermal paste** fills the microscopic gaps between the CPU's heat spreader and the heatsink, because even machined-flat metal surfaces touch at only a fraction of their area. Old paste dries into a crust and stops conducting, which is why a five-year-old machine runs hot regardless of how clean the fan is. Cleaning and replacing it is a genuine part of the service, not an optional extra.",
          "Clean both surfaces with **isopropyl alcohol at 90% or higher** on a lint-free cloth or a coffee filter, which does not shed fibres the way cotton wool does. Wipe until the surface is shiny and no grey residue remains. Let it dry fully — alcohol evaporates in seconds — before applying anything.",
          "Application is where most people go wrong, usually by using too much. The correct amount is **a small dot roughly the size of a grain of rice** in the centre of the die, or a thin line across a rectangular die. The pressure of the heatsink spreads it. Too little leaves gaps; too much squeezes out over the surrounding components, and while most modern paste is non-conductive, excess is still messy and can foul nearby parts. Do not spread it by hand or with a card — the mounting pressure does a better job than you can.",
          "Then refit the heatsink and tighten the spring screws **in the numbered diagonal sequence**, a little at a time on each, so pressure builds evenly. Uneven tightening on a spring-loaded heatsink is a genuine risk of cracking the die, and it is a mistake that is invisible until the machine fails.",
        ],
      },
      {
        heading: "Reassembly and verifying the result",
        body: [
          "Reassembly is disassembly in reverse, with the screws going back into their own holes from the layout you made. Reconnect the fan, the battery last, then refit the base cover — clips first, then screws, and do not force a cover that will not seat, because something underneath is usually misaligned. Before closing up entirely, it is worth powering on with the cover off once to confirm the fan spins and the machine boots.",
          "Then **measure the result**, because a repair you cannot demonstrate is a repair the customer has to take on trust. Record the idle and load temperatures before you start — free tools such as HWMonitor show CPU temperature — and again afterwards. A drop of fifteen to twenty-five degrees under load is normal and is compelling evidence. Also confirm the fan is quieter, that the machine no longer throttles under sustained load, and that the exhaust actually blows warm air rather than nothing.",
          "Finally, tell the customer what caused it and how to delay the recurrence: a laptop used on a bed or a lap draws dust in through the base and blocks its intake, and a hard flat surface makes a real difference. That advice costs you nothing, it is genuinely useful, and it is the kind of thing that makes a customer recommend you rather than just pay you.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor cleans a genuinely dusty laptop end to end — measuring temperatures before and after — demonstrating the heatsink screw sequence, the correct paste amount, and the fan-holding technique, then reassembles and shows the evidence.",
      steps: [
        {
          step: "Record the starting temperatures",
          detail:
            "Run a temperature tool, note idle and load figures, and let the machine run a load so throttling is visible. Explain that this is the evidence you will show the customer.",
        },
        {
          step: "Power down and disconnect",
          detail:
            "Shut down fully, unplug the mains, and open the base to disconnect the internal battery first. Explain why this is always the first internal step.",
        },
        {
          step: "Photograph and lay out the screws",
          detail:
            "Photograph the interior and the screw positions, then lay screws out in removal order on the magnetic mat. Point out any hidden screws under rubber feet.",
        },
        {
          step: "Remove the fan",
          detail:
            "Take out its screws and lift the delicate power connector rather than pulling the wires. Explain how easily the connector is damaged.",
        },
        {
          step: "Clean the fan with the blades held",
          detail:
            "Hold the blades still while blowing air through, and brush the compacted dust. Explain why spinning a fan with compressed air can damage it.",
        },
        {
          step: "Clear the heatsink fins",
          detail:
            "Blow from the inside out and lift the compacted mat off with tweezers. Check the case exhaust vent for a dust mat sitting just inside.",
        },
        {
          step: "Remove the heatsink in diagonal sequence",
          detail:
            "Loosen the numbered spring screws a little at a time in diagonal order. Explain that uneven release on a spring-loaded heatsink risks cracking the die.",
        },
        {
          step: "Show the old paste",
          detail:
            "Display the dried crust on both surfaces and explain that this alone would keep the machine hot however clean the fan is.",
        },
        {
          step: "Clean both surfaces",
          detail:
            "Use 90%+ isopropyl alcohol on a lint-free cloth until shiny, and let it evaporate fully. Explain why cotton wool is the wrong choice.",
        },
        {
          step: "Apply the correct amount of paste",
          detail:
            "Place a rice-grain dot in the centre. Show a deliberately excessive amount beside it and explain why too much is worse than too little.",
        },
        {
          step: "Refit and tighten evenly",
          detail:
            "Replace the heatsink and tighten in the numbered diagonal sequence, a little on each screw at a time. Explain that mounting pressure spreads the paste better than a card can.",
        },
        {
          step: "Reassemble and re-measure",
          detail:
            "Refit the fan, connect the battery last, close the cover clips-first, boot, and record idle and load temperatures. Compare with the starting figures.",
        },
      ],
    },
    practice: {
      title: "Full clean, repaste and verified result",
      brief:
        "You perform a complete clean and thermal-paste replacement on a real laptop: temperatures recorded before and after, fan and heatsink cleaned, paste replaced correctly, heatsink refitted in diagonal sequence, machine reassembled with every screw in its own hole, and the improvement measured.",
      steps: [
        "Record idle and load temperatures before starting, and note whether the machine throttles under load.",
        "Power down fully, unplug the mains, and disconnect the internal battery before any other work.",
        "Photograph the interior and lay all screws out in removal order.",
        "Remove the fan, lifting its connector rather than pulling the wires.",
        "Clean the fan with the blades held still, using air and a soft brush.",
        "Clear the heatsink fins from the inside out and check the case exhaust vent for a dust mat.",
        "Loosen the heatsink spring screws in the numbered diagonal sequence.",
        "Clean both mating surfaces with 90%+ isopropyl alcohol on a lint-free cloth until shiny.",
        "Apply a rice-grain-sized dot of paste to the centre of the die.",
        "Refit the heatsink and tighten in diagonal sequence, a little at a time on each screw.",
        "Reassemble in reverse order, clips before screws, battery connected last.",
        "Boot the machine and confirm the fan spins, the exhaust blows warm air and the machine no longer throttles.",
        "Record idle and load temperatures afterwards and write up the before-and-after difference.",
      ],
      standard:
        "A fully reassembled laptop with every screw in its own hole, fan and heatsink visibly clean, paste replaced in the correct quantity, heatsink tightened in diagonal sequence, battery connected last, and a measured temperature drop of at least ten degrees under load documented as before-and-after evidence.",
    },
    pitfalls: [
      {
        problem: "You drove a long screw into a short hole",
        fix: "Lay screws out in removal order and photograph first. A long screw in a short hole can crack the board, turning a fifty-minute cleaning into a written-off machine.",
      },
      {
        problem: "You spun the fan with compressed air",
        fix: "Hold the blades still while blowing. Free-spinning a fan with air can generate voltage in its motor and damage it, and it can overspeed the bearing.",
      },
      {
        problem: "You packed the dust further into the heatsink",
        fix: "Blow from the inside outward and lift compacted mats off with tweezers. Pushing a dust mat deeper only packs it tighter and blocks airflow completely.",
      },
      {
        problem: "You used far too much thermal paste",
        fix: "A rice-grain dot in the centre is enough — mounting pressure spreads it. Excess squeezes out over surrounding components and is messy even when the paste is non-conductive.",
      },
      {
        problem: "You spread the paste with a card or a finger",
        fix: "Do not. The heatsink's mounting pressure spreads a centred dot more evenly than you can by hand, and a finger transfers oil to the surface.",
      },
      {
        problem: "You tightened the heatsink screws one at a time",
        fix: "Tighten in the numbered diagonal sequence, a little on each at a time. Uneven pressure on a spring-loaded heatsink can crack the CPU die.",
      },
      {
        problem: "You forced a base cover that would not seat",
        fix: "Stop and look underneath — something is misaligned, usually a cable routed wrongly or a clip not engaged. Forcing it cracks the plastic.",
      },
      {
        problem: "You could not demonstrate the improvement",
        fix: "Record temperatures before and after. A repair you cannot evidence is a repair the customer takes on trust, and the evidence is what earns the referral.",
      },
    ],
    expertNotes: [
      "Record temperatures before you touch anything, every time. The before-and-after figures are the only objective evidence that the cleaning helped, and showing a customer a twenty-degree drop does more for your reputation than any explanation.",
      "Loosen and tighten heatsink screws in the numbered diagonal sequence as an unbreakable habit. It feels slow the first few times and it is the difference between a repaired machine and a cracked die.",
      "Keep a syringe of decent thermal paste and a bottle of 90%+ isopropyl alcohol in your kit at all times. They are cheap, they are used on almost every cleaning job, and running out mid-job is unprofessional.",
      "Tell every customer to keep the laptop on a hard flat surface. Using it on a bed or a lap blocks the intake and is the main reason machines reclog quickly. Free advice, genuinely useful, and it is remembered.",
    ],
    vocabulary: [
      { term: "Thermal throttling", meaning: "A CPU reducing its clock speed to avoid overheating. The real cause of most 'slow old laptop' complaints." },
      { term: "Thermal paste", meaning: "The compound filling microscopic gaps between the CPU and heatsink. Dries out over a few years and must be replaced." },
      { term: "Heatsink", meaning: "The copper pipe and fin assembly carrying heat away from the CPU. Its fins are where dust mats form." },
      { term: "Spring-loaded screw", meaning: "A heatsink screw on a spring, requiring diagonal tightening so pressure builds evenly across the die." },
      { term: "Isopropyl alcohol", meaning: "A fast-evaporating solvent for cleaning paste and boards. Use 90% or higher and a lint-free cloth." },
      { term: "Lint-free cloth", meaning: "A cloth that sheds no fibres, such as a microfibre cloth or coffee filter. Cotton wool leaves fibres behind." },
      { term: "Dust mat", meaning: "Compacted felt-like dust blocking heatsink fins or an exhaust vent. Often the entire cause of overheating." },
      { term: "Idle and load temperature", meaning: "The CPU temperature at rest and under work. The before-and-after evidence that a cleaning worked." },
    ],
    homework: [
      {
        task: "Clean one real laptop end to end",
        detail:
          "Record temperatures first, clean and repaste, reassemble, and record again. Write up the before-and-after figures as if reporting to a customer.",
      },
      {
        task: "Practise the diagonal screw sequence",
        detail:
            "Remove and refit a heatsink three times on a scrap machine until the diagonal sequence is automatic. This is a habit, not a step you look up.",
      },
      {
        task: "Practise paste application",
        detail:
          "Apply paste on a scrap heatsink several times, checking how it spreads under pressure. Learn what a rice-grain dot becomes when compressed.",
      },
      {
        task: "Advise a customer in writing",
        detail:
          "Write four lines explaining what caused the overheating, what you did, the temperature improvement, and how to delay recurrence. Reuse the format.",
      },
    ],
    rubric: [
      {
        criterion: "Disassembly",
        passing: "Opens the machine without breaking anything.",
        excellent: "Battery disconnected first, photographs taken, screws in removal order, connectors lifted rather than pulled, and the manual consulted beforehand.",
      },
      {
        criterion: "Cleaning",
        passing: "Removes visible dust.",
        excellent: "Fan cleaned with blades held, fins cleared from inside out, exhaust vent checked, and no dust pushed deeper into the assembly.",
      },
      {
        criterion: "Thermal paste",
        passing: "Applies new paste.",
        excellent: "Both surfaces cleaned to shiny with 90%+ alcohol, a rice-grain dot applied, and the heatsink tightened in numbered diagonal sequence.",
      },
      {
        criterion: "Reassembly",
        passing: "The machine goes back together.",
        excellent: "Every screw in its own hole, clips engaged before screws, battery connected last, and the cover seated without force.",
      },
      {
        criterion: "Evidence",
        passing: "The machine works afterwards.",
        excellent: "Idle and load temperatures recorded before and after, throttling confirmed gone, and the improvement written up for the customer.",
      },
    ],
    faqs: [
      {
        q: "How often should a laptop be cleaned?",
        a: "Every eighteen months to two years in a dusty environment, sooner if it is used on a bed or a lap. The signs are a hot base, a loud fan, and slowness that appears under load and improves when the machine rests.",
      },
      {
        q: "What thermal paste should I buy?",
        a: "Any reputable brand paste is fine for this work — the difference between mid-range and premium pastes is a couple of degrees, far less than the difference between old crust and new paste. Buy a syringe rather than a single-use sachet so you are not caught out mid-job.",
      },
      {
        q: "Is too much thermal paste actually harmful?",
        a: "Most modern pastes are non-conductive, so excess is mainly messy rather than dangerous, but it can foul nearby components and makes the next service harder. A rice-grain dot is correct; the mounting pressure spreads it.",
      },
      {
        q: "Can I clean a laptop without opening it?",
        a: "Blowing air into the vents removes a little loose dust but cannot clear a compacted mat on the fins or replace dried paste, which is where most of the benefit is. It is a temporary measure at best and can pack dust tighter.",
      },
      {
        q: "What if the fan does not spin after reassembly?",
        a: "Check its connector first — it is small and easy to leave partially seated. Then check in the firmware or with a tool whether the fan is being detected. If the connector is firm and the fan still does not spin, the fan itself has failed and needs replacing.",
      },
    ],
  },
};
