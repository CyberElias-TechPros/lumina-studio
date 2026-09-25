import type { SessionLecture } from "../types";

/**
 * Computer Repairs — ₦25,000 · 4 weeks · 8 sessions.
 * Sessions 4 to 6. (Sessions 1–3 in computer-repairs.ts, 7–8 in computer-repairs-c.ts.)
 */
export const computerRepairsLessonsB: Record<string, SessionLecture> = {
  "upgrades-ram-storage": {
    summary:
      "The upgrade work that makes up most paid jobs: more RAM, a hard drive replaced with an SSD, and migrating a customer's Windows installation without reinstalling it. This session covers compatibility, the physical work, cloning, and how to verify an upgrade actually delivered what you promised.",
    objectives: [
      "Determine exactly what RAM and storage a specific machine can take",
      "Fit SO-DIMM and M.2 components correctly and safely",
      "Explain the real performance gain from each upgrade honestly",
      "Clone a Windows installation to a new SSD without reinstalling",
      "Handle the data-safety and licensing questions a clone raises",
      "Verify an upgrade worked and report it to the customer",
    ],
    blocks: [
      {
        heading: "Compatibility: the check that comes before the quote",
        body: [
          "An upgrade fails most often at the compatibility stage, not during fitting. For **RAM** you need four facts: the **type** — DDR3, DDR4 or DDR5, which are physically incompatible and will not fit the wrong slot; the **form factor** — SO-DIMM for a laptop, DIMM for a desktop; the **maximum capacity** the board supports, which is a firmware and chipset limit rather than a physical one; and the **speed**, which must be supported, though a faster stick will usually run at a slower supported speed rather than fail.",
          "Get these from the manufacturer's specification for the exact model, or read them off the installed stick, or use a system information tool that reports the board's capabilities. A machine with one slot plus soldered memory is a common arrangement on mid-range laptops, and it caps what you can do — which is why you check before quoting rather than after ordering.",
          "For **storage** the questions are: does the machine have an **M.2 slot**, and if so does it support **NVMe** or only SATA over M.2 — these are different and an NVMe drive will not work in a SATA-only slot; is there a **2.5-inch bay** for a SATA SSD; and is there room for both. Many laptops from roughly 2016 onward have an M.2 slot plus a 2.5-inch bay, which allows an SSD for the system and a hard drive for bulk storage — a genuinely good outcome for a customer with a lot of files.",
        ],
      },
      {
        heading: "Fitting RAM and storage",
        body: [
          "RAM fits one way only, because the notch in the module is offset. Insert it at roughly a thirty-degree angle, push it in fully until the contacts are almost entirely hidden, then press it down until the two side clips click into place. If it needs force, it is the wrong way round or the wrong type. With two sticks, fill the matching slots — often marked or colour-coded — so the board can run them in **dual channel**, which gives a real performance improvement over two sticks in the wrong slots.",
          "An **M.2 SSD** inserts into its slot at a shallow angle, then is pressed down and secured with a single small screw. Many machines ship without that screw, or with a plastic stand-off, and losing it is a common annoyance; keep spares. A **2.5-inch SATA SSD** goes in the drive caddy or bracket, connected with a short SATA data cable and a SATA power connector, and must be secured so it cannot move — a loose drive in a laptop will eventually damage its own connector.",
          "Throughout, the discipline from session two applies: mains unplugged, laptop battery disconnected first, wrist strap on, board handled by its edges. A RAM stick is cheap; a board damaged by static or by a screwdriver slipping is not, and the machine is the customer's livelihood.",
        ],
      },
      {
        heading: "Cloning versus reinstalling",
        body: [
          "Replacing a hard drive with an SSD raises the question of what happens to Windows and the customer's files. There are two answers. A **clean install** gives the best result — a fresh Windows, no accumulated cruft, genuinely the fastest outcome — but it requires reinstalling every program, and for a customer with many applications and a complicated setup that is a day of disruption they did not ask for.",
          "**Cloning** copies the entire drive, including Windows, programs, settings and files, onto the new SSD, so the machine boots into exactly the same state, only faster. This is usually what a customer actually wants, and it is the professional default when the existing installation is healthy. The tools are free or cheap — manufacturers such as Samsung and Crucial ship cloning software with their drives, and there are reputable third-party utilities.",
          "The catch is that the **target must be at least as large as the data on the source**, not necessarily as large as the source drive. A 1TB hard drive holding 200GB of data can be cloned to a 256GB SSD, and most cloning tools handle shrinking the partitions automatically. But a 1TB drive holding 400GB cannot go onto a 256GB SSD, and you must tell the customer that before they buy the drive — which is why you check used space, not drive capacity, when advising.",
        ],
      },
      {
        heading: "The cloning procedure, and the data-safety question",
        body: [
          "The procedure: connect the new SSD to the machine — in the second slot if there is one, otherwise through a **USB-to-SATA or USB-to-NVMe adapter**. Run the cloning tool, select source and target carefully, and start the copy. This takes from twenty minutes to a couple of hours depending on the amount of data. Then **swap the drives physically**, boot, and confirm Windows starts from the new SSD and reports the correct capacity.",
          "The critical safety rule: **the original drive is the backup until the clone is verified**. Do not wipe, format or dispose of the original until the machine has booted successfully from the clone and the customer has confirmed their files are there. If the clone fails, the original is untouched and you have lost nothing but time. A technician who wipes the source first has converted a routine job into a data-loss incident.",
          "Be honest with the customer about what cloning does and does not do. It copies everything — including whatever problems the installation already had. If the machine was slow because of malware or a corrupted profile, cloning carries that across, and the SSD will make it faster but not fix it. In that case a clean install is the right answer and you should say so rather than clone a broken system and be called back.",
        ],
      },
      {
        heading: "Verifying and reporting the upgrade",
        body: [
          "An upgrade you cannot demonstrate is a claim the customer has to trust. Verify concretely: check that the machine reports the **new RAM capacity** in system information, and that both sticks are detected; confirm the **SSD is recognised at its full capacity** and is the boot device; and measure the difference — boot time, and the time to launch a heavy program. Going from a ninety-second boot to fifteen seconds is dramatic and it is worth recording with a phone camera, because it is the evidence that justifies your fee and earns the referral.",
          "Then run a short stability check. Boot a few times, open several applications, and confirm nothing crashes — a badly seated RAM stick often works initially and then produces random restarts, so a five-minute test catches it in your workshop rather than in the customer's office. On Windows, the built-in **Memory Diagnostic** is worth running after a RAM upgrade; it takes a few minutes and settles the question.",
          "Finally, report honestly, including where the upgrade did not help. A machine whose slowness was caused by malware or a failing board will not be transformed by an SSD, and saying so plainly — 'the SSD is in and it boots faster, but the freezing you described is a separate fault and here is what it is' — is what separates a technician from someone who sells parts.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor determines a real machine's upgrade limits, fits RAM and an M.2 SSD, clones Windows to the new drive through a USB adapter, swaps the drives, and verifies the result with measured before-and-after figures.",
      steps: [
        {
          step: "Determine the RAM limits",
          detail:
            "Check the manufacturer specification for the exact model, read the installed stick's label, and confirm type, form factor, maximum capacity and supported speed.",
        },
        {
          step: "Check for soldered memory",
          detail:
            "Open the base and confirm whether there are SO-DIMM slots, one slot plus soldered memory, or fully soldered. Explain that this must be known before quoting.",
        },
        {
          step: "Determine the storage options",
          detail:
            "Identify the M.2 slot and whether it supports NVMe or only SATA, and check for a 2.5-inch bay. Explain the difference and why an NVMe drive will not work in a SATA-only slot.",
        },
        {
          step: "Check used space before advising on capacity",
          detail:
            "Look at how much data is actually on the drive, not its capacity, and explain that this is what determines whether a smaller SSD can be cloned to.",
        },
        {
          step: "Fit the RAM",
          detail:
            "Insert at thirty degrees, push in fully, press down until both clips click. Show the wrong-way-round attempt and explain the offset notch.",
        },
        {
          step: "Fill the correct slots for dual channel",
          detail:
            "Fit two sticks into the matching slots and explain the performance difference. Show how to confirm dual-channel operation in a system tool.",
        },
        {
          step: "Fit the M.2 SSD",
          detail:
            "Insert at a shallow angle, press down, secure with the small screw. Note that machines often ship without the screw and that spares are worth keeping.",
        },
        {
          step: "Connect the SSD by USB for cloning",
          detail:
            "Use a USB-to-NVMe adapter and confirm the drive is detected in Windows before starting. Explain that this avoids opening the machine twice.",
        },
        {
          step: "Run the clone",
          detail:
            "Select source and target carefully, confirm the direction, and start. Explain that the original must remain untouched until the clone is verified.",
        },
        {
          step: "Swap the drives physically",
          detail:
            "Remove the original, fit the clone in its place, and keep the original safe. Explain that it is the backup until the customer confirms their files.",
        },
        {
          step: "Boot and verify",
          detail:
            "Confirm Windows starts from the new SSD, reports full capacity, shows the new RAM total, and boots in the measured time. Record the figures.",
        },
        {
          step: "Run a stability check",
          detail:
            "Reboot several times, open applications, and run the Windows Memory Diagnostic. Explain that a badly seated stick often works first and fails later.",
        },
      ],
    },
    practice: {
      title: "Upgrade and clone, with verified results",
      brief:
        "You determine a real machine's upgrade limits, fit RAM and an SSD correctly, clone the Windows installation to the new drive, swap it in, and verify the result with measured before-and-after figures and a stability check.",
      steps: [
        "Record the machine's exact model and check the manufacturer specification for RAM type, form factor and maximum capacity.",
        "Open the machine and confirm whether memory is socketed, partly soldered or fully soldered.",
        "Identify the storage interfaces available and whether the M.2 slot supports NVMe.",
        "Check the used space on the existing drive and state the smallest SSD the data will fit on.",
        "Fit the RAM at thirty degrees until both clips click, using the correct slots for dual channel.",
        "Fit the SSD, securing it properly so it cannot move.",
        "Connect the new drive by USB adapter and confirm Windows detects it.",
        "Clone source to target, confirming the direction before starting.",
        "Keep the original drive untouched and stored safely.",
        "Swap the drives physically and boot from the clone.",
        "Confirm the new RAM total and the SSD's full capacity are reported, and that the SSD is the boot device.",
        "Measure boot time and program launch before and after, and record both.",
        "Reboot several times, run the Windows Memory Diagnostic, and confirm stability.",
      ],
      standard:
        "Compatibility confirmed from the specification before any part was ordered, components fitted correctly with dual channel where applicable, the clone verified working before the original was set aside, new capacity confirmed in system information, and measured before-and-after boot figures plus a passed stability check.",
    },
    pitfalls: [
      {
        problem: "You ordered RAM before checking the type",
        fix: "Confirm DDR generation, form factor, maximum capacity and supported speed for the exact model first. DDR3, DDR4 and DDR5 are physically incompatible and will not fit the wrong slot.",
      },
      {
        problem: "You quoted a RAM upgrade on soldered memory",
        fix: "Open the machine or check the service manual before quoting. Some laptops have one slot plus soldered memory and some are fully soldered; a promise you cannot keep is worse than no upgrade.",
      },
      {
        problem: "You bought an NVMe drive for a SATA-only M.2 slot",
        fix: "Confirm what the slot supports. Many machines have an M.2 slot that only handles SATA, and an NVMe drive will not be detected in it.",
      },
      {
        problem: "You bought an SSD too small for the customer's data",
        fix: "Check used space, not drive capacity. A 1TB drive holding 200GB clones fine to 256GB, but one holding 400GB does not. Advise on data size, not disk size.",
      },
      {
        problem: "You wiped the original drive before verifying the clone",
        fix: "The original is your backup until the clone has booted and the customer has confirmed their files. Wiping first turns a routine job into a data-loss incident.",
      },
      {
        problem: "You cloned a broken Windows installation",
        fix: "Cloning copies everything, including malware and corrupted profiles. If the system was unhealthy, do a clean install and say so — cloning a broken system gets you called back.",
      },
      {
        problem: "You handed the machine back without a stability check",
        fix: "Reboot several times, open applications, and run the memory diagnostic. A badly seated stick often works initially and then causes random restarts at the customer's desk.",
      },
    ],
    expertNotes: [
      "Check compatibility from the manufacturer's specification for the exact model before you order anything, every time. It takes five minutes and it is the difference between a smooth job and a returned part you paid for.",
      "Keep USB-to-SATA and USB-to-NVMe adapters in your kit. They let you clone without opening the machine twice, they let you recover data from a dead machine quickly, and they are among the most-used tools in this trade.",
      "Never release the original drive until the clone is verified and the customer has confirmed their files. It costs nothing to hold it for a week and it is the only thing standing between a routine job and a data-loss disaster.",
      "Record the boot time before and after with your phone. A ninety-second-to-fifteen-second clip is the most persuasive evidence you can show a customer, and it is what makes them tell their friends.",
    ],
    vocabulary: [
      {
        term: "SO-DIMM",
        meaning:
          "The smaller laptop RAM module. Distinct from the full-size desktop DIMM and not interchangeable.",
      },
      {
        term: "Dual channel",
        meaning:
          "Running two matched RAM sticks in the correct slots together, giving a real performance gain over single channel.",
      },
      {
        term: "NVMe",
        meaning:
          "The fast SSD protocol over M.2. Distinct from SATA over M.2, which is slower and not interchangeable.",
      },
      {
        term: "2.5-inch bay",
        meaning: "The drive space taking a SATA SSD or hard drive, common alongside an M.2 slot.",
      },
      {
        term: "Cloning",
        meaning:
          "Copying an entire drive, including the operating system, to a new one so the machine boots into the same state.",
      },
      {
        term: "USB-to-NVMe adapter",
        meaning:
          "An enclosure letting an SSD connect by USB for cloning or data recovery without opening the machine twice.",
      },
      {
        term: "Clean install",
        meaning:
          "Installing Windows fresh. Gives the best result but requires reinstalling every program.",
      },
      {
        term: "Memory Diagnostic",
        meaning: "The Windows tool testing RAM for faults. Worth running after any RAM upgrade.",
      },
    ],
    homework: [
      {
        task: "Specify three upgrades",
        detail:
          "Take three real machines and determine, for each, the RAM type and maximum, the storage interfaces, and the smallest SSD their data would fit on. Write it as you would quote it.",
      },
      {
        task: "Fit RAM on a scrap machine",
        detail:
          "Practise the thirty-degree insertion and clip engagement until it is automatic, including the wrong-way-round attempt so you recognise the feel.",
      },
      {
        task: "Clone a drive end to end",
        detail:
          "Clone a real Windows installation to a smaller SSD through a USB adapter. Verify it boots, then repeat until the procedure is comfortable.",
      },
      {
        task: "Measure an upgrade",
        detail:
          "Record boot time and program launch before and after an SSD swap. Keep the figures — they are your evidence for every future customer conversation.",
      },
    ],
    rubric: [
      {
        criterion: "Compatibility checking",
        passing: "Checks the RAM type.",
        excellent:
          "Confirms type, form factor, maximum capacity, speed and M.2 protocol from the specification, and checks used space before advising on SSD size.",
      },
      {
        criterion: "Fitting",
        passing: "Components are installed.",
        excellent:
          "RAM seated at thirty degrees until both clips click in the dual-channel slots, SSD secured properly, and safe handling throughout.",
      },
      {
        criterion: "Cloning",
        passing: "Produces a working clone.",
        excellent:
          "Source and target confirmed before starting, the original preserved until verification, and a healthy versus broken installation correctly distinguished.",
      },
      {
        criterion: "Verification",
        passing: "The machine boots.",
        excellent:
          "New capacity confirmed in system information, boot and launch times measured before and after, and a stability check including the memory diagnostic.",
      },
      {
        criterion: "Honest reporting",
        passing: "Reports the work done.",
        excellent:
          "States plainly what the upgrade fixed and what it did not, with a separate diagnosis offered where a different fault remains.",
      },
    ],
    faqs: [
      {
        q: "Is cloning or a clean install better?",
        a: "Cloning if the existing Windows is healthy, because the customer keeps everything and the disruption is minimal. A clean install if the system was slow because of malware, corruption or accumulated cruft — the SSD will make a broken system faster but not fix it, and you will be called back.",
      },
      {
        q: "Can I clone a 1TB drive to a 256GB SSD?",
        a: "Yes, if the data on the 1TB drive is under about 256GB. Cloning tools shrink the partitions to fit. Check used space rather than drive capacity, and leave some headroom on the target.",
      },
      {
        q: "How much RAM does a typical user need in 2026?",
        a: "Eight gigabytes is the practical minimum for browsing with several tabs, Office and video calls. Sixteen is comfortable and future-proof. Four gigabytes is genuinely painful and is the most common reason a machine feels unusable.",
      },
      {
        q: "My machine will not boot after fitting RAM. What now?",
        a: "Remove and reseat the stick, checking it is fully down and both clips are engaged. Try one stick at a time in each slot to isolate a faulty module or slot. If it beeps, count the beeps — the pattern identifies the fault in the manual.",
      },
      {
        q: "Should I recommend an SSD to every customer?",
        a: "Only where it will actually help — a machine booting from a mechanical hard drive. If the machine already has an SSD and is slow, the cause is elsewhere and saying so honestly is what builds your reputation.",
      },
    ],
  },

  "power-display-heat-faults": {
    summary:
      "The three hardware fault families that make up most physical repair work: a machine that will not power on, a screen that does not display correctly, and a machine that overheats or shuts down. This session covers systematic diagnosis of each, using a multimeter, and knowing when a repair stops being economic.",
    objectives: [
      "Diagnose a no-power fault systematically from the mains inward",
      "Test a power adapter and a charging circuit with a multimeter",
      "Identify display faults and distinguish panel, cable and GPU failures",
      "Diagnose overheating and random shutdown correctly",
      "Use a multimeter for continuity, voltage and battery testing",
      "Judge when a repair is uneconomic and say so honestly",
    ],
    blocks: [
      {
        heading: "No power: working from the outside in",
        body: [
          "A machine that shows no sign of life has a fault somewhere in a short chain, and you work along it from the easiest point. **Is the wall socket live?** Test it with something else — this is embarrassing to overlook and it happens constantly. **Is the adapter working?** A laptop adapter should output its rated voltage, commonly 19 or 19.5 volts, measured with a multimeter on the DC setting; zero or a wildly wrong figure means a dead adapter, which is a cheap fix. **Is the cable damaged?** Check the whole length, especially at the strain reliefs near the plug and the connector, where internal breaks are common and invisible.",
          "Then the machine itself. On a desktop, check the **power supply's own switch** at the back, which people routinely leave off, and the **24-pin and CPU power connectors** on the board, which come loose. A useful test is the **paperclip test** on a suspect supply — bridging the green wire to a black one makes it run without a board — though this is a diagnostic, not a repair. On a laptop, check the **charging port** for a loose or broken centre pin, and try booting with the battery removed and only the adapter connected, which isolates a battery that is preventing startup.",
          "If power reaches the board and still nothing happens — no fan, no LED — the fault is usually the board itself or a short somewhere on it. That is the point at which you consider whether the repair is economic, and section five covers how to make that judgement honestly.",
        ],
      },
      {
        heading: "Using the multimeter, which is easier than it looks",
        body: [
          "A multimeter does three things you need constantly. **DC voltage** measures what a power source is outputting — set the dial to a DC range above the expected voltage, black probe to the negative or ground, red to the positive, and read. A laptop adapter should read its rated voltage; a car battery reads about 12.6; a CMOS battery reads about 3. **Continuity** tests whether a path is unbroken — the meter beeps when the probes are connected through a continuous conductor. Use it to check a cable, a fuse, and whether a switch actually closes.",
          "**Resistance** measures opposition to flow, and it is how you test a battery's health indirectly and check for shorts. A very low resistance between a power rail and ground suggests a short circuit, which is a serious board fault.",
          "The habits that keep you safe: never measure resistance or continuity on a live circuit; never use a current setting when you mean voltage; and start on a higher range than you expect and work down. A multimeter is not dangerous on the low-voltage circuits inside a computer, but treating it carelessly is how people damage the meter or get a surprise from a power supply that is still connected to mains.",
        ],
      },
      {
        heading: "Display faults: panel, cable or GPU",
        body: [
          "A bad display has three possible causes and the diagnosis distinguishes them. **Connect the laptop to an external monitor** first — this one test splits the problem in half. If the external display works correctly while the laptop's own screen is faulty, the fault is the **panel or its cable**, not the graphics hardware. If both are faulty, the problem is the GPU or the board, which is usually uneconomic to repair.",
          "A **failed panel** shows as a cracked screen, lines, dead areas, or a completely black screen with a faint image visible under a torch — which indicates the backlight has failed rather than the panel. A **failing display cable** shows as flickering, distortion, or a display that changes when you move the lid, because the cable runs through the hinge and fatigues there. That last symptom is diagnostic: if the picture changes with lid position, it is almost certainly the cable, and it is a cheap, common repair.",
          "A **backlight failure** produces a screen that looks dead but shows a very faint image under bright light. It is worth checking with a torch before condemning a panel, because the fix may be a backlight circuit rather than a whole screen. And note that after any screen replacement you must verify the **resolution and connector match** — a panel that fits physically but reports the wrong resolution is the wrong part.",
        ],
      },
      {
        heading: "Heat and random shutdown",
        body: [
          "A machine that shuts down under load, or that becomes too hot to keep on a lap, is protecting itself. The CPU has a thermal limit, commonly around 95–100°C, and when it reaches it the machine cuts power immediately to prevent damage. That is what a random shutdown under load usually is, and it is a symptom rather than a mystery.",
          "The causes, in order of likelihood: **dust-blocked cooling**, which session three covers and which is by far the most common; **dried thermal paste**; a **failed fan** that spins erratically or not at all; and, rarely, a genuine heatsink mounting problem. Diagnose by measuring: run a temperature tool, watch the figure under load, and listen to the fan. A machine that idles at 85°C has a cooling problem, not a software one.",
          "Distinguish this from **battery-related shutdown**. A machine that dies suddenly at a reported 30% charge has a degraded battery whose reported capacity no longer matches reality — the operating system thinks there is charge left and the cell cannot deliver it. That is a battery replacement, not a thermal fault, and the two are confused often enough that it is worth checking the battery report Windows can generate before opening the machine.",
        ],
      },
      {
        heading: "When a repair stops being worth doing",
        body: [
          "Part of being a technician is knowing when not to repair. A board-level fault on a laptop — a dead CPU, a failed GPU, a cracked board — usually costs more in parts and labour than the machine is worth, particularly on a mid-range machine that is several years old. Fitting a replacement board often approaches the price of a comparable used machine, and it carries no warranty on the rest of the hardware.",
          "Make the judgement out loud and show your working: what the part costs, what the labour is, what the machine is worth, and what the alternatives are. Then let the customer decide with real information. This is where honesty earns its keep — a technician who says 'this is not worth repairing, and here is why, and here is what I would buy instead' is trusted for life, and that customer sends everyone they know. A technician who repairs a dead machine for a large fee gets paid once and talked about badly forever.",
          "There is also a data-recovery dimension. A machine that is beyond repair may still hold files the customer desperately needs, and recovering them — by removing the drive and reading it in another machine or through a USB adapter — is often the real service, and it is worth more to the customer than the repair would have been. Always ask what is on the machine before you conclude anything.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor works through four real faults — a dead adapter, a display that fails only when the lid moves, a machine shutting down under load, and a board-level failure — measuring with a multimeter and showing the economic judgement on the last one.",
      steps: [
        {
          step: "Start with the simplest cause",
          detail:
            "Test the wall socket with another device and check the power supply's rear switch. Explain how often the fault is outside the machine entirely.",
        },
        {
          step: "Measure an adapter with the multimeter",
          detail:
            "Set DC voltage, measure the output against the rating on the label, and show a dead adapter reading zero beside a working one at 19.5V.",
        },
        {
          step: "Test cable continuity",
          detail:
            "Use the continuity setting along an adapter cable and find an internal break near the strain relief. Explain why these failures are invisible from outside.",
        },
        {
          step: "Inspect a charging port",
          detail:
            "Show a loose and a broken centre pin, and explain why a wobbly connector produces intermittent charging that looks like a board fault.",
        },
        {
          step: "Try booting without the battery",
          detail:
            "Remove the battery and run on adapter only. Explain how this isolates a battery that is preventing startup from a genuine power fault.",
        },
        {
          step: "Diagnose a display with an external monitor",
          detail:
            "Connect an external display and show it working while the laptop panel fails. Explain that this single test splits panel faults from GPU faults.",
        },
        {
          step: "Demonstrate the lid-movement test",
          detail:
            "Move the lid on a machine with a fatigued display cable and show the picture changing. Explain that this symptom is diagnostic of the cable.",
        },
        {
          step: "Check for a backlight failure",
          detail:
            "Shine a torch at an angle on a screen that appears dead and reveal a faint image. Explain that this indicates backlight rather than panel failure.",
        },
        {
          step: "Measure temperatures under load",
          detail:
            "Run a load and watch the CPU temperature climb toward the thermal limit, then show the shutdown. Explain that this is protection, not a mystery.",
        },
        {
          step: "Generate the Windows battery report",
          detail:
            "Run the battery report command and compare design capacity with full charge capacity. Explain how this distinguishes a degraded battery from a thermal fault.",
        },
        {
          step: "Assess a board-level failure",
          detail:
            "Show a machine with a dead board, price the replacement against the machine's value, and walk through the alternatives out loud.",
        },
        {
          step: "Recover the data instead",
          detail:
            "Remove the drive from the dead machine, connect it through a USB adapter, and copy the customer's files. Explain that this is often the real service.",
        },
      ],
    },
    practice: {
      title: "Diagnose four fault families systematically",
      brief:
        "You work through a no-power fault, a display fault, an overheating fault and a battery fault on real or simulated machines, using a multimeter and the diagnostic tests from this session, and write up each diagnosis with the evidence that supports it.",
      steps: [
        "Verify the wall socket and the power supply's rear switch before opening anything.",
        "Measure a laptop adapter's output with the multimeter on DC voltage and compare with its rating.",
        "Test an adapter cable for continuity and locate any internal break.",
        "Inspect a charging port for looseness or a damaged centre pin.",
        "Attempt a boot with the battery removed on adapter only, and record what it isolates.",
        "Connect an external monitor to a faulty-display machine and record what the result tells you.",
        "Perform the lid-movement test and state whether the fault is panel, cable or GPU.",
        "Check a dead-looking screen with a torch at an angle for a faint image.",
        "Measure idle and load CPU temperature and record whether thermal shutdown occurs.",
        "Generate and read the Windows battery report, comparing design with full-charge capacity.",
        "For a board-level fault, price the repair against the machine's value and list the alternatives.",
        "Remove the drive from an uneconomic machine and recover the data through a USB adapter.",
        "Write up all four diagnoses with the evidence supporting each conclusion.",
      ],
      standard:
        "Each of the four faults diagnosed by systematic test rather than by part swapping, multimeter measurements recorded for the power faults, the external-monitor and lid-movement tests used for the display fault, temperature and battery report evidence for the shutdown fault, and an honest written economic assessment with a data-recovery option for the board-level failure.",
    },
    pitfalls: [
      {
        problem: "You opened the machine before checking the socket and the adapter",
        fix: "Work from the outside in. The fault is frequently the wall socket, the adapter, the cable or the rear power switch — all of which take a minute to check and none of which need a screwdriver.",
      },
      {
        problem: "You measured resistance on a live circuit",
        fix: "Never. Resistance and continuity are measured on dead circuits only, and voltage on live ones. Starting on a higher range than expected and working down protects the meter.",
      },
      {
        problem: "You condemned a screen without testing an external monitor",
        fix: "The external monitor test splits panel faults from GPU faults in one step. Skipping it means you may replace a panel on a machine whose GPU is actually dead.",
      },
      {
        problem: "You replaced a panel that only had a backlight fault",
        fix: "Check for a faint image under a torch first. A screen that looks completely dead may have a working panel and a failed backlight, which is a different and cheaper repair.",
      },
      {
        problem: "You treated a random shutdown as a software problem",
        fix: "Measure the temperature under load. A shutdown at the thermal limit is hardware protection, and it will keep happening however many times you reinstall the operating system.",
      },
      {
        problem: "You confused a degraded battery with overheating",
        fix: "Generate the Windows battery report and compare design with full-charge capacity. A machine dying at a reported 30% has a battery whose real capacity no longer matches what the system believes.",
      },
      {
        problem: "You repaired a machine that was not worth repairing",
        fix: "Price the part and labour against the machine's value and say it out loud. A large fee for a dead machine gets you paid once and talked about badly forever.",
      },
      {
        problem: "You scrapped a dead machine without asking about the data",
        fix: "Always ask what is on the machine. Recovering the files is often worth more to the customer than the repair would have been, and it is a service you can still provide.",
      },
    ],
    expertNotes: [
      "Always start with the cheapest and simplest check, even when you are confident it is not the cause. The wall socket, the rear switch and the adapter take two minutes together, and finding the fault there saves an hour and looks like competence rather than luck.",
      "Carry a multimeter and use it on every power job. It converts 'I think the adapter is dead' into 'the adapter outputs zero volts', which settles the conversation with the customer in one sentence and justifies the part.",
      "Connect an external monitor before diagnosing any display fault. It is the single highest-value test in this session and it takes fifteen seconds.",
      "Always ask what data is on a machine before you declare it uneconomic. Recovering files from a dead machine through a USB adapter is frequently the service the customer actually needed, and it turns a lost job into a grateful referral.",
    ],
    vocabulary: [
      {
        term: "Multimeter",
        meaning:
          "The instrument measuring voltage, resistance and continuity. The core diagnostic tool for power faults.",
      },
      {
        term: "Continuity test",
        meaning:
          "Checking whether a path is unbroken — the meter beeps on a continuous conductor. Used on cables, fuses and switches.",
      },
      {
        term: "Thermal shutdown",
        meaning:
          "The machine cutting power at the CPU's thermal limit to prevent damage. A symptom of a cooling fault, not a mystery.",
      },
      {
        term: "Backlight failure",
        meaning:
          "A screen that appears dead but shows a faint image under a torch. Different from a failed panel.",
      },
      {
        term: "Display cable fatigue",
        meaning:
          "Damage to the cable running through the hinge, diagnosed by the picture changing with lid position.",
      },
      {
        term: "Battery report",
        meaning:
          "The Windows-generated comparison of design capacity with full-charge capacity, revealing battery degradation.",
      },
      {
        term: "Board-level fault",
        meaning:
          "A failure of the motherboard itself, usually uneconomic to repair on a mid-range laptop.",
      },
      {
        term: "Data recovery",
        meaning:
          "Retrieving files from a dead machine by reading its drive elsewhere. Often the real service a customer needs.",
      },
    ],
    homework: [
      {
        task: "Practise the multimeter",
        detail:
          "Measure three adapters' outputs, test three cables for continuity, and check a CMOS battery's voltage. Repeat until setting the dial is automatic.",
      },
      {
        task: "Run the external monitor test",
        detail:
          "Connect an external display to any laptop and observe how the output behaves. Practise until the test is reflex, because it splits most display diagnoses instantly.",
      },
      {
        task: "Generate a battery report",
        detail:
          "Run the Windows battery report on a real machine and read the design versus full-charge capacity. Note the degradation percentage and what it means for runtime.",
      },
      {
        task: "Write an uneconomic-repair conversation",
        detail:
          "Script what you would say to a customer whose machine is not worth repairing: the part cost, the labour, the machine's value, the alternatives, and the data-recovery offer.",
      },
    ],
    rubric: [
      {
        criterion: "Systematic method",
        passing: "Reaches a diagnosis.",
        excellent:
          "Works from the simplest external cause inward, never swapping parts before a test points to them.",
      },
      {
        criterion: "Multimeter use",
        passing: "Can measure voltage.",
        excellent:
          "Correct settings chosen, adapter output compared with its rating, continuity used to locate a cable break, and no measurement taken on a live circuit in the wrong mode.",
      },
      {
        criterion: "Display diagnosis",
        passing: "Identifies a screen problem.",
        excellent:
          "External monitor test used first, lid-movement test applied, torch check for backlight failure, and panel versus cable versus GPU correctly distinguished.",
      },
      {
        criterion: "Thermal diagnosis",
        passing: "Recognises overheating.",
        excellent:
          "Temperatures measured at idle and under load, thermal shutdown explained as protection, and the battery report used to rule out a degraded cell.",
      },
      {
        criterion: "Judgement",
        passing: "Completes the repair.",
        excellent:
          "Prices the repair against the machine's value, presents alternatives, asks about the data, and offers recovery where the repair is uneconomic.",
      },
    ],
    faqs: [
      {
        q: "Do I really need a multimeter?",
        a: "Yes, and it is inexpensive. It converts a guess into a measurement, which settles arguments with customers, prevents you replacing working parts, and is the difference between a technician and someone who swaps components until something works.",
      },
      {
        q: "How do I know if a laptop adapter is dead?",
        a: "Measure its output on DC voltage and compare with the rating printed on it — commonly 19 or 19.5 volts. Zero or a figure far off the rating means it is dead. Also test the cable for continuity, because internal breaks near the strain relief are common.",
      },
      {
        q: "My screen flickers when I move the lid. What is it?",
        a: "Almost certainly the display cable, which runs through the hinge and fatigues there. That symptom is genuinely diagnostic, and it is a cheap repair compared with a panel replacement.",
      },
      {
        q: "When should I tell a customer a repair is not worth it?",
        a: "When the part and labour approach or exceed the machine's value — typically a board-level fault on a mid-range laptop several years old. Show the arithmetic, present the alternatives, and offer to recover the data. That conversation builds more trust than any repair you complete.",
      },
      {
        q: "Can I recover data from a laptop that will not turn on?",
        a: "Usually yes, if the storage itself is healthy. Remove the drive and read it in another machine or through a USB adapter. This is often what the customer actually needs, and it is why you should always ask about the data before concluding a machine is finished.",
      },
    ],
  },

  "storage-memory-boot-faults": {
    summary:
      "The faults that stop a machine reaching Windows: a failing drive, faulty RAM, a corrupted boot sequence, and the error messages each produces. This session covers reading those messages correctly, testing storage and memory properly, and recovering data before you attempt any repair.",
    objectives: [
      "Interpret the common startup error messages and what each actually indicates",
      "Test a hard drive and an SSD for health before trusting either",
      "Test RAM properly rather than by reseating and hoping",
      "Repair or rebuild a boot sequence without destroying data",
      "Recover data from a failing drive safely",
      "Decide the correct sequence: data first, then repair",
    ],
    blocks: [
      {
        heading: "Startup errors are a language, not a mystery",
        body: [
          "The messages a machine shows before Windows loads are the firmware telling you what it could not do, and learning to read them is most of this session. **'No bootable device'** or **'Boot device not found'** means the firmware found no drive with a working boot sequence — which can be a disconnected drive, a changed boot order in the firmware, a corrupted boot record, or a failed drive. These have very different fixes, so you check the simplest first: is the drive detected in the firmware at all?",
          "**Beep codes** are the firmware's alternative to a display. A pattern of beeps on a machine with no picture identifies the fault — commonly one long and two or three short for a memory fault, or a repeating pattern for a display fault. The meaning is specific to the firmware manufacturer, so you look up the pattern for that board rather than guessing. **A spinning fan and no display** usually points to RAM, the board, or the GPU. **Endless restart loops** often indicate faulty RAM or a corrupted operating system.",
          "The discipline is to write the message down exactly, or photograph it. Customers describe errors loosely — 'it says something about a disk' — and the exact wording distinguishes a boot-order problem from a dead drive. Photograph the screen before doing anything else; it costs nothing and it is frequently the whole diagnosis.",
        ],
      },
      {
        heading: "Testing storage properly",
        body: [
          "A drive can be working and still failing, which is why you test rather than assume. Every modern drive reports its own health through **S.M.A.R.T.** — Self-Monitoring, Analysis and Reporting Technology — which tracks reallocated sectors, pending sectors, power-on hours and temperature. A drive with reallocated or pending sectors is degrading and will fail; how quickly is unpredictable, which is exactly why you do not wait.",
          "Read S.M.A.R.T. with a free tool, or on Windows with `wmic diskdrive get status`, which returns OK or Pred Fail. For a mechanical drive, also **listen** — a clicking or grinding noise is a head or bearing failure and the drive must be treated as a data-recovery case immediately, not a repair case. Continuing to power a clicking drive can destroy the data permanently, and this is the single most important rule in this session.",
          "An SSD reports differently: it has no moving parts to listen to, but it has a finite write endurance and reports its remaining life. The practical rule for both: **if a drive shows any sign of degradation, back up the data first and replace the drive**. There is no repair for a failing drive, only replacement — and the value you provide is getting the data off before it is gone.",
        ],
      },
      {
        heading: "Testing memory properly",
        body: [
          "Faulty RAM produces the most confusing symptoms in computing: random blue screens, restarts under load, files that corrupt for no reason, an operating system that fails to install. Because the symptoms are random, the only reliable approach is to test rather than to guess.",
          "Two methods. **Windows Memory Diagnostic** runs from a restart and checks the installed memory, reporting errors afterwards — it is built in and adequate for a first pass. For a thorough test, **MemTest86** boots from a USB stick and runs a long series of patterns, which is the professional standard; let it complete at least one full pass, ideally several, because some faults only appear after the memory has warmed or after many passes.",
          "The physical approach complements it: with multiple sticks, **test one at a time in one slot**, which isolates both a bad module and a bad slot. And reseat first — a poorly seated stick causes exactly these symptoms and costs thirty seconds to rule out. The sequence is: reseat, then test each stick individually, then test each slot. That finds the fault without buying anything.",
        ],
      },
      {
        heading: "Boot repair without losing data",
        body: [
          "A corrupted boot sequence is common after a failed update, an improper shutdown or a malware infection, and it is usually repairable without touching the user's files. The sequence: boot from a **Windows installation USB**, choose **Repair your computer** rather than Install, and use the **Startup Repair** tool first, which fixes many cases automatically. If that fails, the **command prompt** in the recovery environment lets you rebuild the boot records with the `bootrec` commands — rebuilding the boot configuration data and rewriting the master boot record.",
          "The critical rule is that you **do not reinstall Windows as a first response**. A reinstall overwrites the operating system and, depending on the choices made, can destroy the user's files. It is the last resort after boot repair has failed and after the data has been recovered. A technician who reaches for a reinstall first is a technician who destroys data, and customers remember that permanently.",
          "Related and often confused: a **changed boot order** in the firmware produces the same 'no bootable device' message as a dead drive, and it is fixed in seconds by putting the correct drive first. Check it before assuming anything is broken — particularly after a battery replacement or a CMOS reset, which can reset the boot order as a side effect.",
        ],
      },
      {
        heading: "Data recovery: the sequence that matters",
        body: [
          "When a drive is failing, the order of operations determines whether the data survives. **Stop using the machine immediately.** Every write to a failing drive reduces the chance of recovery, and continuing to boot it, or attempting a repair, or running a disk check on a mechanically failing drive can finish it. This is the rule that separates a recovered family photograph archive from a lost one.",
          "The safe sequence: power down, remove the drive, connect it to a healthy machine through a **USB adapter** as a secondary drive rather than booting from it, and copy the most important files first — documents, photographs, anything irreplaceable — before attempting a full copy. Copy, never move; the original stays untouched until you are certain. If the drive is mechanically clicking, stop and refer it to a professional data-recovery service; no software will help and continuing makes it worse.",
          "Then be honest about what you can and cannot do. Software recovery from a logically damaged but physically healthy drive is well within your scope and is a genuinely valuable service. Physical recovery — opening a drive in a clean room, swapping heads — is a specialist discipline requiring equipment you do not have, and referring it out is the correct professional answer. Customers respect a referral; they do not respect a technician who takes money and destroys the drive.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor works through four machines: one with a boot-order problem, one with a corrupted boot record, one with faulty RAM and one with a clicking drive — showing the tests, the repair, and the point at which the work becomes a data-recovery referral.",
      steps: [
        {
          step: "Photograph the error first",
          detail:
            "Show that the exact wording matters, and photograph the screen before touching anything. Explain how 'no bootable device' has four different causes.",
        },
        {
          step: "Check whether the drive is detected",
          detail:
            "Enter the firmware and look for the drive in the storage list. Explain that a drive absent here is a connection or drive fault, while a drive present here is a boot or software problem.",
        },
        {
          step: "Fix a boot order problem",
          detail:
            "Reorder the boot sequence and boot successfully. Explain that a CMOS reset or battery replacement can change this, producing a scary message with a five-second fix.",
        },
        {
          step: "Read S.M.A.R.T. health",
          detail:
            "Run a S.M.A.R.T. tool and the wmic status command on a healthy and a degrading drive. Point out reallocated and pending sectors and explain what they predict.",
        },
        {
          step: "Listen to a failing mechanical drive",
          detail:
            "Play or demonstrate a clicking drive and explain why it must be powered down immediately. Emphasise that continuing can destroy the data permanently.",
        },
        {
          step: "Reseat and test RAM",
          detail:
            "Reseat the sticks, then test one at a time in one slot. Explain how this isolates both a bad module and a bad slot without buying anything.",
        },
        {
          step: "Run the memory diagnostics",
          detail:
            "Run Windows Memory Diagnostic and show a MemTest86 boot. Explain why several passes are needed rather than one.",
        },
        {
          step: "Repair a boot record",
          detail:
            "Boot from installation media, choose Repair, run Startup Repair, and where needed use the bootrec commands from the recovery command prompt.",
        },
        {
          step: "Show what a reinstall would have cost",
          detail:
            "Explain that reinstalling first would have overwritten the operating system and risked the files, and that it is the last resort after recovery.",
        },
        {
          step: "Recover data through a USB adapter",
          detail:
            "Remove a drive, connect it as a secondary drive on a healthy machine, and copy the most important files first. Explain copy-not-move and why the original stays untouched.",
        },
        {
          step: "Identify the referral point",
          detail:
            "Show a mechanically failed drive and explain that clean-room recovery is a specialist discipline. Demonstrate how to refer it out and what to tell the customer.",
        },
        {
          step: "Replace and restore",
          detail:
            "Fit a new drive, install or clone as appropriate, and confirm the customer's files are present before handing back.",
        },
      ],
    },
    practice: {
      title: "Diagnose and recover: four boot and storage faults",
      brief:
        "You diagnose four machines — a boot-order fault, a corrupted boot record, faulty RAM and a degrading drive — using the tests from this session, repair what is repairable, recover the data where the drive is failing, and document the sequence you followed and why.",
      steps: [
        "Photograph each machine's error message exactly before doing anything.",
        "Check the firmware's storage list on each to confirm whether the drive is detected.",
        "Fix the boot-order machine by reordering the sequence, and note what could have caused it.",
        "Run a S.M.A.R.T. tool and the wmic status command on each drive and record the results.",
        "Identify which drive shows reallocated or pending sectors and treat it as failing.",
        "Reseat the RAM, then test sticks one at a time in one slot.",
        "Run Windows Memory Diagnostic and record the result; run MemTest86 for a full pass where available.",
        "Repair the corrupted boot record from installation media, trying Startup Repair before the bootrec commands.",
        "Confirm no reinstall was performed and the user's files are intact.",
        "Power down the failing-drive machine immediately and remove its drive.",
        "Connect it through a USB adapter as a secondary drive and copy the most important files first.",
        "Copy rather than move, keeping the original untouched until the copy is verified.",
        "State clearly where a mechanical failure would require a professional referral, and why.",
        "Document the whole sequence for each machine and the reasoning behind the order.",
      ],
      standard:
        "Each fault correctly identified from its exact error message and confirmed by test rather than by part swapping, RAM isolated stick by stick, the boot repaired without a reinstall, the failing drive powered down immediately with data copied through an adapter, and a written sequence explaining why data recovery came before repair in every case.",
    },
    pitfalls: [
      {
        problem: "You reinstalled Windows as your first response",
        fix: "Try boot repair first and recover the data before anything destructive. A reinstall can overwrite the operating system and destroy the customer's files, and it is the last resort, not the first instinct.",
      },
      {
        problem: "You kept using a drive that was clicking",
        fix: "Power it down immediately. Every write to a mechanically failing drive reduces the chance of recovery, and continuing can destroy the data permanently. This is the most important rule in the session.",
      },
      {
        problem: "You ran a disk check on a failing drive",
        fix: "Do not. A surface check stresses a failing drive and can finish it. Copy the data off first, then replace the drive — there is no repair for a failing drive.",
      },
      {
        problem: "You moved files instead of copying them",
        fix: "Always copy. Moving deletes from the source, so an interruption mid-transfer loses data from both places. The original stays untouched until the copy is verified.",
      },
      {
        problem: "You reseated RAM and assumed the fault was fixed",
        fix: "Reseating rules out a poor connection; it does not test the memory. Run a diagnostic, testing sticks one at a time, and let MemTest86 complete several passes.",
      },
      {
        problem: "You guessed at a beep code",
        fix: "Look up the pattern for that specific board or firmware manufacturer. Meanings differ between manufacturers, and a guessed interpretation sends you to the wrong component.",
      },
      {
        problem: "You took money for a clean-room recovery you cannot do",
        fix: "Refer mechanical failures to a specialist. Physical recovery needs clean-room equipment you do not have, and continuing can destroy the drive. A referral is respected; a destroyed drive is not.",
      },
    ],
    expertNotes: [
      "Photograph every error screen before you touch anything. Customers describe errors loosely and the exact wording frequently distinguishes a five-second boot-order fix from a dead drive.",
      "Power down a failing drive the moment you suspect it, and copy the data through a USB adapter before attempting any repair. This one habit is the difference between being the technician who saved the family photographs and the one who lost them.",
      "Copy, never move, during recovery, and take the most irreplaceable files first. Documents and photographs before anything reproducible, because a transfer can be interrupted and you want the important data across first.",
      "Know your referral point and use it. Referring a clean-room recovery to a specialist costs you one job and earns lasting trust; attempting it and destroying the drive costs you a reputation.",
    ],
    vocabulary: [
      {
        term: "S.M.A.R.T.",
        meaning:
          "A drive's self-reported health data — reallocated sectors, pending sectors, power-on hours. Any reallocated sector means the drive is degrading.",
      },
      {
        term: "Boot order",
        meaning:
          "The sequence the firmware tries devices in. A changed order mimics a dead drive and is fixed in seconds.",
      },
      {
        term: "Beep code",
        meaning:
          "A firmware error signalled by beeps when there is no display. The pattern's meaning is manufacturer-specific.",
      },
      {
        term: "MemTest86",
        meaning:
          "The professional memory test, booted from USB. Needs several full passes to catch intermittent faults.",
      },
      {
        term: "bootrec",
        meaning:
          "The Windows recovery commands rebuilding the boot configuration data and master boot record.",
      },
      {
        term: "Startup Repair",
        meaning: "The automated Windows recovery tool. Try it before the manual commands.",
      },
      {
        term: "Reallocated sector",
        meaning:
          "A bad sector the drive has moved data away from. A clear sign of degradation and a reason to replace the drive.",
      },
      {
        term: "Clean-room recovery",
        meaning:
          "Specialist physical data recovery requiring controlled conditions. A referral, not a service you should attempt.",
      },
    ],
    homework: [
      {
        task: "Read S.M.A.R.T. on three drives",
        detail:
          "Run a S.M.A.R.T. tool and the wmic status command on three real drives and record the results. Learn what reallocated and pending sectors look like in the output.",
      },
      {
        task: "Build a Windows recovery USB",
        detail:
          "Create installation media and practise reaching the recovery environment, Startup Repair and the command prompt. You will need this on real jobs and should not learn it under pressure.",
      },
      {
        task: "Run a full MemTest86 pass",
        detail:
          "Boot MemTest86 from USB on a scrap machine and let it complete. Learn how long a pass takes so you can plan a job around it.",
      },
      {
        task: "Practise data recovery through an adapter",
        detail:
          "Remove a drive from a scrap machine, connect it by USB to another, and copy files from it. Practise until the sequence is automatic.",
      },
    ],
    rubric: [
      {
        criterion: "Error interpretation",
        passing: "Recognises common messages.",
        excellent:
          "Photographs the exact message, checks whether the drive is detected in firmware, and distinguishes boot-order, boot-record and drive-failure causes.",
      },
      {
        criterion: "Storage testing",
        passing: "Checks whether a drive works.",
        excellent:
          "Reads S.M.A.R.T. and the wmic status, identifies reallocated and pending sectors, and listens for mechanical failure.",
      },
      {
        criterion: "Memory testing",
        passing: "Reseats the RAM.",
        excellent:
          "Tests sticks one at a time in one slot, runs Windows Memory Diagnostic and MemTest86 for multiple passes.",
      },
      {
        criterion: "Boot repair",
        passing: "Gets the machine booting.",
        excellent:
          "Tries Startup Repair before the bootrec commands, never reinstalls first, and confirms the user's files are intact afterwards.",
      },
      {
        criterion: "Data safety",
        passing: "Does not lose data.",
        excellent:
          "Failing drive powered down immediately, data copied through an adapter with the most irreplaceable files first, original untouched, and the clean-room referral point stated clearly.",
      },
    ],
    faqs: [
      {
        q: "What does 'No bootable device' actually mean?",
        a: "The firmware found no drive with a working boot sequence. It has four common causes: a changed boot order, a loose connection, a corrupted boot record, or a failed drive. Check the boot order and whether the drive is detected in firmware before assuming anything is broken.",
      },
      {
        q: "How do I know a drive is failing before it dies?",
        a: "Read its S.M.A.R.T. data. Reallocated or pending sectors mean it is degrading and will fail at an unpredictable time. On a mechanical drive, clicking or grinding is already late. Back up and replace at the first sign — there is no repair for a failing drive.",
      },
      {
        q: "Should I run chkdsk on a failing drive?",
        a: "No. A surface check stresses a failing drive and can finish it. Copy the data off through a USB adapter first, then replace the drive. Repair tools are for logically damaged but physically healthy drives.",
      },
      {
        q: "How many passes of MemTest86 do I need?",
        a: "At least one full pass, ideally several. Some faults only appear after the memory warms or after many pattern cycles. It is slow, which is why you run it while doing other work rather than watching it.",
      },
      {
        q: "When should I refer a data recovery out?",
        a: "Whenever the drive is mechanically failing — clicking, grinding, or not spinning. That needs clean-room equipment and specialist skill. Software recovery from a logically damaged but physically healthy drive is within your scope; opening a drive is not.",
      },
    ],
  },
};
