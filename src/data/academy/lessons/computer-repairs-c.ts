import type { SessionLecture } from "../types";

/**
 * Computer Repairs — ₦25,000 · 4 weeks · 8 sessions.
 * Sessions 7 and 8. (Sessions 1–3 in computer-repairs.ts, 4–6 in computer-repairs-b.ts.)
 */
export const computerRepairsLessonsC: Record<string, SessionLecture> = {
  "software-and-system-servicing": {
    summary:
      "Half of what customers call a hardware problem is software. This session covers diagnosing and fixing a slow or unstable Windows machine, malware removal done properly, driver and update management, and a clean reinstall with the customer's data preserved.",
    objectives: [
      "Diagnose slowness by evidence rather than by assumption",
      "Distinguish a software cause from a hardware cause",
      "Remove malware properly and know when removal is not the right answer",
      "Manage drivers and Windows updates without breaking a working machine",
      "Perform a clean reinstall preserving the customer's files",
      "Apply the routine servicing that keeps a machine healthy",
    ],
    blocks: [
      {
        heading: "Diagnosing slowness with evidence",
        body: [
          "'My computer is slow' is not a diagnosis, and the fastest way to waste an hour is to start uninstalling things. Open **Task Manager** and look at the actual numbers: which process is consuming CPU, how much of the RAM is in use and whether it is saturated, and — most revealingly — whether the **disk is at 100%**. A disk pegged at full utilisation on a mechanical drive is the single most common cause of an unusable Windows machine, and it points straight at the SSD upgrade from session four rather than at any software fix.",
          "Then look at **startup programs**. A machine that takes three minutes to become usable usually has twenty applications launching at boot, each competing for the disk. Disabling the unnecessary ones in Task Manager's Startup tab is free, reversible and routinely transforms a machine. Note what you disable so you can undo it if the customer needs something back.",
          "Check the basics that are routinely overlooked: **how full the system drive is** — Windows needs meaningful free space to operate and a drive above roughly 90% full degrades badly; **how much RAM** is installed against what is actually needed; and whether the machine is **thermal throttling**, which session three and five cover and which presents identically to a software problem. Evidence first, action second, and write down what you found.",
        ],
      },
      {
        heading: "Software or hardware: telling them apart",
        body: [
          "The distinction determines everything about the job, and a few tests settle it. **Does the problem occur in the firmware or in a bootable environment?** If a machine is unstable in Windows but stable when booted from a USB Linux stick or a diagnostic tool, the hardware is probably fine and the fault is in Windows. If it crashes in both, suspect RAM, storage or heat.",
          "**Blue screens** carry a stop code, and that code is a genuine clue — `MEMORY_MANAGEMENT` points at RAM, `CRITICAL_PROCESS_DIED` and `INACCESSIBLE_BOOT_DEVICE` at storage or drivers, `WHEA_UNCORRECTABLE_ERROR` at hardware. Photograph the code, or note that Windows stores minidumps you can read later. Guessing at a blue screen's cause without the code is how a technician replaces a perfectly good part.",
          "**Does the problem follow the user or the machine?** If it happens only in one person's profile, the profile is corrupted and a new one fixes it. If it happens for every user, it is system-wide. That single test — create a second local user and log into it — takes two minutes and it splits an enormous category of problems in half.",
        ],
      },
      {
        heading: "Malware removal, honestly assessed",
        body: [
          "Run a scan with a reputable tool — the built-in Windows Defender is genuinely adequate for most cases, supplemented by a second-opinion scanner for anything stubborn. But understand what scanning does and does not achieve. It removes detected threats; it does not undo everything a threat did, and it cannot guarantee the system is clean afterwards, because sophisticated malware is specifically designed to persist and to hide from scanners.",
          "This leads to the honest professional position: **for a machine with a serious infection, and especially one used for banking or business, a clean reinstall is the correct answer, not a cleanup**. A cleaned machine is probably fine; a reinstalled machine is known to be fine. Where the customer handles money or sensitive data, 'probably' is not good enough, and saying so is the responsible advice even though it is more work and a harder conversation.",
          "For lighter cases — adware, a browser hijacker, a toolbar — targeted removal is reasonable: reset the browser, remove unknown extensions, uninstall unknown programs by install date, and check the scheduled tasks and startup entries where persistence hides. Then change the passwords for anything important, from a different device, because credentials captured before removal are already compromised regardless of whether the malware is gone.",
        ],
      },
      {
        heading: "Drivers and updates: the discipline of not breaking things",
        body: [
          "The rule that governs this whole area is: **if it works, do not update it out of curiosity**. Driver updates are not improvements by default — they are changes, and any change can break something that was fine. Update a driver when there is a specific fault it addresses, a specific feature you need, or a known security issue. Otherwise leave it.",
          "Get drivers from the **machine or component manufacturer**, not from a generic driver-updater utility. Those utilities are a common source of damage and of malware, and they frequently install the wrong version. On a laptop, the manufacturer's support page for the exact model is the source; on a desktop, the motherboard and component manufacturers. Windows Update handles most drivers adequately for everyday hardware.",
          "**Windows updates** should be kept current for security, but the discipline is to update deliberately rather than mid-job. A machine that restarts during a repair loses your place and occasionally corrupts the work in progress. Pause updates while you work, complete them before handing back, and confirm afterwards that the machine boots and its devices function — because an update that breaks a network driver or a touchpad is your problem the moment you hand the machine over, not the customer's.",
        ],
      },
      {
        heading: "Clean reinstall and routine servicing",
        body: [
          "A clean reinstall is the most effective software repair there is and it is underused because technicians fear the data loss. The procedure removes that fear: **recover the data first**, to an external drive, and verify the copy before touching anything. Then back up **what people forget** — browser bookmarks and saved passwords, email archives, licence keys for paid software, and any application settings that took the customer years to configure. Losing a customer's licence key is a real and avoidable failure.",
          "Then install from clean media, install drivers from the manufacturer, run Windows Update to completion, reinstall the customer's applications, restore the data, and verify. Verification matters: open a sample of the restored files and confirm they are intact, confirm the email and browser are working, and confirm the licences activated. A reinstall you have not verified is a job you will hear about again.",
          "The **routine service** that keeps a machine healthy is short and worth offering as a package: clean the dust and replace the paste, check drive health through S.M.A.R.T., verify the backups are actually running, review startup programs, complete the updates, and confirm the antivirus is active. Most of these are checks rather than repairs, and a machine serviced twice a year rarely develops the dramatic failures that bring customers in panicking — which is a better outcome for them and a steadier income for you.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor diagnoses a genuinely slow machine by evidence, isolates a software fault from a hardware one, handles a malware case with an honest recommendation, then performs a clean reinstall with the data recovered and verified first.",
      steps: [
        {
          step: "Read Task Manager before touching anything",
          detail:
            "Show CPU, memory and disk utilisation, and point to a disk at 100%. Explain that this one number redirects the whole diagnosis toward storage rather than software.",
        },
        {
          step: "Review startup programs",
          detail:
            "Open the Startup tab, count what launches, and disable the unnecessary entries while recording each one. Explain that this is free, reversible and often transformative.",
        },
        {
          step: "Check free space and drive health",
          detail:
            "Show how full the system drive is and read its S.M.A.R.T. status. Explain that a drive above 90% full degrades badly and that health must be confirmed before blaming software.",
        },
        {
          step: "Create a second user profile",
          detail:
            "Add a local user and log in. Explain that if the fault disappears, the original profile is corrupted — a two-minute test that splits a large category of problems.",
        },
        {
          step: "Read a blue screen stop code",
          detail:
            "Trigger or show a recorded blue screen, photograph the code, and look up what it indicates. Show where Windows stores the minidumps for later analysis.",
        },
        {
          step: "Boot from a USB diagnostic environment",
          detail:
            "Boot the unstable machine from USB and show it behaving normally. Explain that stability outside Windows points away from hardware.",
        },
        {
          step: "Run a malware scan",
          detail:
            "Scan with Windows Defender and a second-opinion tool, and show what is found. Explain what a scan can and cannot guarantee afterwards.",
        },
        {
          step: "Make the honest recommendation",
          detail:
            "For a machine used for banking, recommend a reinstall rather than a cleanup and explain why 'probably clean' is not acceptable for money. Practise saying it.",
        },
        {
          step: "Recover the data first",
          detail:
            "Copy the customer's files to an external drive and verify the copy. Include bookmarks, saved passwords, email archives and licence keys.",
        },
        {
          step: "Install from clean media",
          detail:
            "Boot the installation USB, install to a clean drive, and explain why you pause Windows Update until the machine is stable rather than letting it restart mid-job.",
        },
        {
          step: "Restore and verify",
          detail:
            "Install manufacturer drivers, complete the updates, restore the data, and open a sample of files to confirm integrity. Confirm licences activated.",
        },
        {
          step: "Present the service package",
          detail:
            "List the routine service items and explain how a twice-yearly check prevents the dramatic failures that bring customers in panicking.",
        },
      ],
    },
    practice: {
      title: "Diagnose, service and reinstall with data preserved",
      brief:
        "You diagnose a slow or unstable machine from evidence, isolate whether the cause is software or hardware, handle a malware case with a justified recommendation, then perform a clean reinstall with the customer's data recovered and verified beforehand.",
      steps: [
        "Record Task Manager readings for CPU, memory and disk utilisation before changing anything.",
        "List and disable unnecessary startup programs, recording each one you disabled.",
        "Check system drive free space and read the drive's S.M.A.R.T. status.",
        "Check installed RAM against what the workload needs, and check for thermal throttling.",
        "Create a second local user and log in to determine whether the fault follows the profile.",
        "Photograph or record any blue screen stop code and look up what it indicates.",
        "Boot from a USB diagnostic environment and note whether the fault persists outside Windows.",
        "Run a malware scan with two tools and record what is found.",
        "Write a recommendation for a banking machine and justify why reinstall beats cleanup.",
        "Recover the data to an external drive, including bookmarks, passwords, email and licence keys.",
        "Verify the recovered copy before touching the system.",
        "Install Windows from clean media with updates paused during the work.",
        "Install manufacturer drivers, complete updates, restore the data and verify a sample of files.",
        "Write up the diagnosis, the evidence, the action taken and the routine service you would recommend.",
      ],
      standard:
        "A diagnosis supported by recorded evidence rather than assumption, the software-versus-hardware question settled by a bootable-environment or second-profile test, a justified malware recommendation, and a completed clean reinstall where the data was recovered and verified first, with a sample of restored files confirmed intact.",
    },
    pitfalls: [
      {
        problem: "You started uninstalling things before looking at Task Manager",
        fix: "Read the numbers first. CPU, memory, disk utilisation and the startup list usually name the cause in two minutes, and guessing wastes an hour and risks removing something the customer needs.",
      },
      {
        problem: "You ignored a disk running at 100%",
        fix: "That reading on a mechanical drive is the most common cause of an unusable Windows machine and it points at an SSD, not at software. No amount of cleanup fixes a saturated disk.",
      },
      {
        problem: "You guaranteed a machine was clean after a malware scan",
        fix: "Scans remove detected threats; they cannot guarantee the absence of everything. For a machine used for banking or business, recommend a reinstall — 'probably clean' is not acceptable where money is involved.",
      },
      {
        problem: "You used a generic driver-updater utility",
        fix: "Get drivers from the machine or component manufacturer for the exact model. Updater utilities frequently install the wrong version and are a known source of malware.",
      },
      {
        problem: "You updated drivers on a machine that was working fine",
        fix: "Updates are changes, not improvements by default. Update for a specific fault, feature or security issue; otherwise leave a working machine alone.",
      },
      {
        problem: "You let Windows Update restart the machine mid-repair",
        fix: "Pause updates while you work and complete them before handing back. An update that breaks a driver becomes your problem the moment the customer leaves with the machine.",
      },
      {
        problem: "You reinstalled without recovering licence keys",
        fix: "Back up licence keys, bookmarks, saved passwords and email archives along with the files. Losing a customer's paid software licence is a real and entirely avoidable failure.",
      },
      {
        problem: "You handed back a reinstall without verifying it",
        fix: "Open a sample of restored files, confirm email and browsers work, and confirm licences activated. An unverified reinstall is a job you will hear about again.",
      },
    ],
    expertNotes: [
      "Look at Task Manager before you touch anything, on every slow-machine job. Two minutes of reading CPU, memory, disk and startup entries names the cause more often than any other single action in software work.",
      "Create a second local user and log into it early in any profile-related diagnosis. It takes two minutes and it splits an enormous category of problems in half, which is the highest value-per-minute test in this session.",
      "Recommend a reinstall over a cleanup for any machine handling money or sensitive data, and be able to explain why. It is more work and a harder conversation, and it is the advice that protects both the customer and your reputation.",
      "Offer routine servicing as a package rather than waiting for failures. Most of it is checking rather than repairing, it prevents the dramatic jobs, and it turns one-off customers into an annual relationship.",
    ],
    vocabulary: [
      {
        term: "Task Manager",
        meaning:
          "The Windows tool showing per-process CPU, memory and disk use, plus startup programs. The first place to look at any slow machine.",
      },
      {
        term: "100% disk usage",
        meaning:
          "A saturated disk, usually mechanical. The most common cause of an unusable Windows machine and a pointer to an SSD.",
      },
      {
        term: "Stop code",
        meaning:
          "The code on a blue screen identifying the fault class, such as MEMORY_MANAGEMENT. Photograph it rather than guessing.",
      },
      {
        term: "Minidump",
        meaning:
          "The crash file Windows stores for later analysis. Useful evidence after an intermittent blue screen.",
      },
      {
        term: "Second profile test",
        meaning:
          "Logging into a new local user to determine whether a fault follows the profile or the system.",
      },
      {
        term: "Second-opinion scanner",
        meaning:
          "An additional malware scanner run alongside the primary one. Useful for stubborn or newly emerged threats.",
      },
      {
        term: "Clean reinstall",
        meaning:
          "Installing Windows fresh. The correct answer for a serious infection on a machine handling money or sensitive data.",
      },
      {
        term: "Routine servicing",
        meaning:
          "Dust cleaning, paste, drive health, backups, startup review, updates and antivirus checks. Prevents the dramatic failures.",
      },
    ],
    homework: [
      {
        task: "Diagnose a slow machine by evidence",
        detail:
          "Take any slow machine and record Task Manager readings, startup entries, free space and drive health before changing anything. Write the diagnosis from the evidence.",
      },
      {
        task: "Run the second-profile test",
        detail:
          "Create a local user on a machine you are working on and log in. Note whether behaviour differs. Practise until this is a reflex rather than an afterthought.",
      },
      {
        task: "Practise a clean reinstall",
        detail:
          "Do a full reinstall on a scrap machine including data recovery and verification. Time it, so you can quote the job accurately later.",
      },
      {
        task: "Write your service package",
        detail:
          "List what a twice-yearly service includes, what it costs and what it prevents. This is a recurring income product, not a favour.",
      },
    ],
    rubric: [
      {
        criterion: "Evidence-based diagnosis",
        passing: "Identifies a cause.",
        excellent:
          "Task Manager readings, startup list, free space and drive health all recorded before any change, and the conclusion drawn from them.",
      },
      {
        criterion: "Software versus hardware",
        passing: "Makes a judgement.",
        excellent:
          "Settled by a bootable-environment test or a second-profile test, with any blue screen stop code photographed and looked up.",
      },
      {
        criterion: "Malware handling",
        passing: "Runs a scan.",
        excellent:
          "Two tools used, the limits of a cleanup stated honestly, and a reinstall recommended with justification for any machine handling money.",
      },
      {
        criterion: "Drivers and updates",
        passing: "Updates the machine.",
        excellent:
          "Manufacturer drivers for the exact model, updates paused during work and completed before handover, and no working machine updated out of curiosity.",
      },
      {
        criterion: "Reinstall discipline",
        passing: "Completes a reinstall.",
        excellent:
          "Data, licence keys, bookmarks and email recovered and verified first, then a sample of restored files confirmed intact after the install.",
      },
    ],
    faqs: [
      {
        q: "My customer's machine is slow. Where do I start?",
        a: "Task Manager, before anything else. Check disk utilisation first — 100% on a mechanical drive is the most common cause and points at an SSD — then memory saturation, then the startup list. Those three account for most slow machines.",
      },
      {
        q: "Is Windows Defender enough, or should I install third-party antivirus?",
        a: "Windows Defender is genuinely adequate for most users and has the advantage of not slowing the machine. A second-opinion scanner is worth running for anything stubborn. What matters more than which product is that something is active and that the customer does not click through warnings.",
      },
      {
        q: "Should I always reinstall after a malware infection?",
        a: "For a machine used for banking, business or sensitive data, yes — a cleaned machine is probably fine while a reinstalled one is known to be fine. For light adware or a browser hijacker, targeted removal plus password changes from another device is reasonable.",
      },
      {
        q: "How do I find a customer's Windows licence key before reinstalling?",
        a: "On most modern machines the key is embedded in the firmware and Windows reactivates automatically. Where it is not, use a reputable key-finder tool before wiping, and record it. Never start a reinstall without knowing how the machine will reactivate.",
      },
      {
        q: "What should a routine service include?",
        a: "Dust cleaning and thermal paste, drive health through S.M.A.R.T., a check that backups are actually running, a startup program review, completing updates, and confirming antivirus is active. Most of it is checking rather than repairing, which is why it prevents dramatic failures.",
      },
    ],
  },

  "service-workflow-and-final-practical": {
    summary:
      "The final session turns skill into a business: intake and diagnosis, quoting honestly, handling customer data and expectations, the paperwork that protects you, and a timed practical where you diagnose and repair a real machine end to end.",
    objectives: [
      "Run a professional intake that captures what you need before you start",
      "Diagnose within a time box and quote from what you found",
      "Handle customer data, privacy and expectations correctly",
      "Use job documentation that protects both you and the customer",
      "Complete a timed end-to-end diagnosis and repair",
      "Price repair work and build the reputation that sustains it",
    ],
    blocks: [
      {
        heading: "Intake: the five minutes that prevent every argument",
        body: [
          "Almost every dispute in repair work traces back to an undocumented intake. The customer says 'it was working yesterday', you open it and find a cracked board, and now there is an argument about who broke it — because nobody recorded the machine's condition on arrival. Intake takes five minutes and it prevents all of it.",
          "Record four things. **The machine**: make, exact model, serial, and a photograph of its condition on arrival, including any existing cracks, dents or missing screws. **The reported fault** in the customer's own words, not your interpretation of them. **What is on it**: whether there is data that matters, whether it is backed up, and written acknowledgement that you are not responsible for data loss if the drive fails during work. And **the terms**: your diagnostic fee, whether it is credited against the repair, and that you will quote before doing any work beyond diagnosis.",
          "That last point is the one that protects your time. A machine that arrives with no agreement on a diagnostic fee becomes a machine you have worked on for free and cannot charge for. Stating a fee up front, in writing, is not distrust — it is what makes the relationship professional, and customers accept it readily when it is presented calmly as standard practice.",
        ],
      },
      {
        heading: "Diagnosing within a time box",
        body: [
          "Diagnosis can consume unlimited time if you let it, and unpaid diagnosis is how repair businesses quietly fail. Set a **time box** — thirty to sixty minutes for a standard fault — and work the systematic method from the earlier sessions: simplest external cause first, then evidence rather than part swapping, then the specific tests for the fault family you have identified.",
          "When the time box expires, make a decision rather than continuing: either you have a diagnosis and can quote, or you do not and you tell the customer what you found, what remains uncertain, and what further diagnosis would cost. Both outcomes are professional. Drifting into a fourth hour on a difficult fault, unpaid and without telling anyone, is neither.",
          "The **diagnostic fee** exists precisely to cover this. Charge it, credit it against the repair if the customer proceeds, and it stops being lost time. Customers who decline a repair after diagnosis still owe for the diagnosis, and saying so at intake makes that conversation easy instead of awkward. This single practice is the difference between a repair business that pays its owner and one that does not.",
        ],
      },
      {
        heading: "Customer data, privacy and expectations",
        body: [
          "You are inside someone's personal machine, with access to their photographs, their messages and possibly their banking. The professional standard is firm: **do not browse**. Open only what the job requires, do not read what you do not need to, and never copy anything. Where you must access files to recover data, do it in front of the customer where possible, or with their explicit permission, and tell them what you opened and why.",
          "**Passwords** are the awkward part. Sometimes you need to log in to diagnose. Ask the customer to enter the password themselves rather than telling it to you wherever that is possible, and if you must have it, do not write it down anywhere persistent and change nothing. If you reset a password to gain access, tell the customer clearly that you did and that they should change it.",
          "**Expectations** are where most dissatisfaction originates, and they are set by what you say at intake. Do not promise a same-day fix you cannot guarantee. Do not quote a price before diagnosing, because a guessed price becomes a promise. Do say: 'I will diagnose it and call you with what I found and what it will cost, and I will not do any work beyond diagnosis without your agreement.' That sentence protects you from every version of this argument.",
        ],
      },
      {
        heading: "Documentation and the paperwork that protects you",
        body: [
          "Keep a **job record** for every machine: the intake details, what you found, what you did, what parts you fitted with their cost, what you charged, and the date. It takes two minutes per job and it is what lets you answer 'what did you do to my laptop six months ago?' instantly. It is also what turns a repeat customer into a relationship, because you remember their machine.",
          "Three documents matter. An **intake form** capturing machine, condition photographs, reported fault, data acknowledgement and terms. A **quote** stating the diagnosis, the parts, the labour and the total, with an expiry, so the customer agrees before work begins. And a **receipt or invoice** stating what was done and any **warranty** you offer — commonly thirty to ninety days on labour and the manufacturer's period on parts, which is standard practice and worth stating explicitly rather than leaving ambiguous.",
          "Be clear about the warranty's limits in writing: it covers the work you did, not unrelated failures, and not damage caused afterwards. That clarity is not defensive; it prevents a customer bringing back a machine dropped two months later and expecting a free repair, and it is far kinder to say it at the start than to argue about it later.",
        ],
      },
      {
        heading: "Pricing and the reputation that sustains the work",
        body: [
          "Price repair work on **parts plus labour at an honest hourly rate**, and be able to explain both. Customers accept a fair price far more readily than they accept an unexplained one, and showing the arithmetic — 'the drive is ₦X, the work is about an hour at ₦Y' — turns a negotiation into a conversation. Underselling is the common beginner error: it attracts the most difficult customers, it makes the work unsustainable, and it makes raising prices later feel like a betrayal.",
          "Then understand what actually builds this business: **honesty about whether a repair is worth doing**. The technician who says 'this is not worth repairing, here is why, and here is what I would buy instead' is remembered and referred, permanently. The technician who repairs a dead machine for a large fee is paid once and talked about badly forever. In a market where everyone knows everyone, that difference is the entire business.",
          "The compounding assets are a **reputation for honesty**, a **record of your work** that lets you serve repeat customers well, and **referrals**, which in Nigeria come overwhelmingly from personal recommendation rather than advertising. Do the honest thing on every job, document it, and the work arrives. That is not a platitude; it is the actual operating model of every successful repair business in this market.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor runs a full job end to end on a real machine — intake with photographs, a time-boxed diagnosis, a written quote, the repair, verification, invoicing and handover — then sets the class a timed practical and reviews the results.",
      steps: [
        {
          step: "Complete the intake",
          detail:
            "Record make, model, serial, and photograph the machine's condition. Explain that this photograph is what ends the 'you broke it' argument before it starts.",
        },
        {
          step: "Record the fault in the customer's words",
          detail:
            "Write down what they said rather than your interpretation. Explain that interpretation at intake is how misdiagnosis begins.",
        },
        {
          step: "Take the data acknowledgement",
          detail:
            "Ask what is on the machine and whether it is backed up, and get written acknowledgement about data loss risk. Explain why this must happen before work, not after.",
        },
        {
          step: "State the terms",
          detail:
            "Give the diagnostic fee, confirm it credits against the repair, and say that no work beyond diagnosis happens without agreement. Practise saying it calmly.",
        },
        {
          step: "Run a time-boxed diagnosis",
          detail:
            "Set thirty minutes and work the systematic method: external causes first, then evidence, then the specific tests. Show the clock and stop when it expires.",
        },
        {
          step: "Write the quote",
          detail:
            "State the diagnosis, the part and its cost, the labour, the total and an expiry date. Explain that showing the arithmetic turns a negotiation into a conversation.",
        },
        {
          step: "Handle a declined repair",
          detail:
            "Show how to charge the diagnostic fee where the customer declines, referring back to the intake agreement. Explain why this is easy when stated up front.",
        },
        {
          step: "Perform the repair",
          detail:
            "Complete the repair with the safety and organisation discipline from earlier sessions, photographing before disassembly.",
        },
        {
          step: "Verify before handover",
          detail:
            "Confirm the fault is resolved, run a short stability check, and where relevant record before-and-after measurements. Explain that unverified work is a returned job.",
        },
        {
          step: "Write the invoice and state the warranty",
          detail:
            "Record what was done, the parts fitted, the charge and the warranty period with its limits. Explain that stating limits at the start is kinder than arguing later.",
        },
        {
          step: "Hand over and advise",
          detail:
            "Explain what caused the fault and how to delay recurrence. Explain that free, genuinely useful advice is what produces the referral.",
        },
        {
          step: "Set and review the timed practical",
          detail:
            "Brief the class on the practical, then review each diagnosis against the actual fault and discuss where the reasoning went right or wrong.",
        },
      ],
    },
    practice: {
      title: "The final practical: a full job, timed and documented",
      brief:
        "You take an unknown faulty machine from intake to handover within a set time: documented intake with photographs, a time-boxed systematic diagnosis, a written quote, the repair, verification, an invoice with warranty terms, and a handover explanation. Your diagnosis is then compared with the actual fault.",
      steps: [
        "Complete an intake form with make, model, serial and condition photographs.",
        "Record the reported fault in the customer's own words.",
        "Ask what data is on the machine and record the data-loss acknowledgement.",
        "State the diagnostic fee, the credit against repair, and that no further work happens without agreement.",
        "Set a thirty-minute time box and begin the diagnosis.",
        "Work the systematic method: external causes first, then evidence, then fault-family tests.",
        "Stop at the time box and decide: diagnose and quote, or report what remains uncertain.",
        "Write a quote showing diagnosis, part cost, labour, total and expiry.",
        "Perform the repair with safe handling, photographs before disassembly and screws in removal order.",
        "Verify the repair resolved the fault and run a short stability check.",
        "Where measurable, record before-and-after figures as evidence.",
        "Write an invoice recording the work, the parts and the warranty period with its limits.",
        "Explain to the customer what caused the fault and how to delay recurrence.",
        "Compare your diagnosis with the actual fault and write two sentences on your reasoning.",
      ],
      standard:
        "A complete documented job within the time limit: intake with photographs and data acknowledgement, a diagnosis reached by systematic testing rather than part swapping, a written quote before any repair work, a verified repair with screws correctly replaced, and an invoice stating the warranty and its limits.",
    },
    pitfalls: [
      {
        problem: "You started work with no documented intake",
        fix: "Record the machine, photograph its condition, capture the fault in the customer's words, take the data acknowledgement and state the terms. Five minutes prevents every later argument.",
      },
      {
        problem: "You diagnosed for three hours without charging",
        fix: "Set a time box and charge a diagnostic fee that credits against the repair. Unpaid diagnosis is how repair businesses quietly fail, and customers accept the fee when it is stated at intake.",
      },
      {
        problem: "You quoted a price before diagnosing",
        fix: "Never. A guessed price becomes a promise, and the real fault is usually different. Say you will diagnose and call with what you found and what it will cost.",
      },
      {
        problem: "You browsed the customer's files",
        fix: "Open only what the job requires. Have the customer enter passwords themselves where possible, write nothing persistent down, and tell them clearly if you reset anything.",
      },
      {
        problem: "You promised a same-day fix you could not guarantee",
        fix: "Promise the diagnosis, not the completion time. Parts may need ordering and faults may be worse than they look. An honest delay is accepted; a broken promise is not.",
      },
      {
        problem: "You kept no job record",
        fix: "Record intake, findings, parts, cost and date for every job. It answers 'what did you do six months ago?' instantly and it is what makes a repeat customer feel known.",
      },
      {
        problem: "Your warranty terms were never written down",
        fix: "State the period and its limits on the invoice. Clarity at the start prevents a customer returning a machine dropped two months later expecting a free repair.",
      },
      {
        problem: "You undersold to win the job",
        fix: "Price parts plus honest labour and explain both. Underselling attracts the most difficult customers, makes the work unsustainable, and makes raising prices later feel like a betrayal.",
      },
    ],
    expertNotes: [
      "Photograph every machine on arrival, every time, without exception. It costs ten seconds and it is the only reliable defence against a claim that you caused damage that was already there.",
      "Charge a diagnostic fee that credits against the repair. It is the single change that most improves the economics of repair work, and it also filters out customers who were never going to pay.",
      "Say 'this is not worth repairing' when it is true, with the arithmetic shown. That sentence costs you one job and earns you every referral that customer will ever give, and in this market referrals are the entire business.",
      "Keep a job record on every machine, including the ones you did not repair. Being able to say 'we cleaned yours in March and replaced the battery' is what turns a customer into a relationship, and it costs two minutes.",
    ],
    vocabulary: [
      {
        term: "Intake",
        meaning:
          "The documented arrival record: machine details, condition photographs, reported fault, data acknowledgement and terms.",
      },
      {
        term: "Diagnostic fee",
        meaning:
          "A charge for diagnosis, credited against the repair if it proceeds. What makes unpaid diagnosis stop being lost time.",
      },
      {
        term: "Time box",
        meaning:
          "A fixed limit on diagnosis time, after which you either quote or report what remains uncertain.",
      },
      {
        term: "Data acknowledgement",
        meaning:
          "Written agreement about data-loss risk taken before work begins, not after a failure.",
      },
      {
        term: "Quote",
        meaning:
          "A written statement of diagnosis, parts, labour and total, agreed before work starts. Never given before diagnosis.",
      },
      {
        term: "Job record",
        meaning:
          "The permanent note of intake, findings, parts, cost and date. What makes repeat service possible.",
      },
      {
        term: "Warranty terms",
        meaning:
          "The stated period and limits of your guarantee. Clear at the start; argued about at the end if not.",
      },
      {
        term: "Referral",
        meaning:
          "Personal recommendation, which is how nearly all repair work arrives in Nigeria. Built by honesty, not advertising.",
      },
    ],
    homework: [
      {
        task: "Write your intake form",
        detail:
          "Machine details, condition photograph space, reported fault, data acknowledgement, terms and signature. Print several and use them on every job from now on.",
      },
      {
        task: "Set your prices in writing",
        detail:
          "Diagnostic fee, hourly labour rate, and typical part margins. Write them down so you quote consistently rather than inventing a number per customer.",
      },
      {
        task: "Run one real job end to end",
        detail:
          "Intake, diagnosis, quote, repair, verification, invoice and handover — fully documented. Note how long each stage actually took.",
      },
      {
        task: "Practise the uneconomic-repair conversation",
        detail:
          "Say it out loud until it is natural: the part cost, the labour, the machine's value, the alternatives, and the data-recovery offer. This conversation builds your reputation.",
      },
    ],
    rubric: [
      {
        criterion: "Intake",
        passing: "Notes the machine and the fault.",
        excellent:
          "Model and serial recorded, condition photographed, fault in the customer's words, data acknowledgement taken, terms and diagnostic fee stated.",
      },
      {
        criterion: "Diagnosis",
        passing: "Finds the fault.",
        excellent:
          "Reached within the time box by systematic testing from external causes inward, with no part swapped before a test pointed to it.",
      },
      {
        criterion: "Commercial discipline",
        passing: "Names a price.",
        excellent:
          "A written quote showing diagnosis, parts, labour and total, issued before any repair work, with a diagnostic fee charged where the repair is declined.",
      },
      {
        criterion: "Repair and verification",
        passing: "The machine works.",
        excellent:
          "Safe handling, photographs before disassembly, screws in the right holes, the fault confirmed resolved, a stability check run, and measurements recorded where relevant.",
      },
      {
        criterion: "Professional practice",
        passing: "Hands the machine back.",
        excellent:
          "An invoice stating the work, parts and warranty limits, a job record kept, privacy respected throughout, and an honest recommendation where the repair was uneconomic.",
      },
    ],
    faqs: [
      {
        q: "How much should I charge for diagnosis?",
        a: "Enough to cover thirty to sixty minutes of skilled time, credited against the repair if the customer proceeds. The exact figure depends on your market, but charging nothing is the mistake — it makes diagnosis unpaid work and attracts customers who were never going to pay for the repair.",
      },
      {
        q: "Do customers really accept a diagnostic fee?",
        a: "Yes, when it is stated calmly at intake as standard practice rather than sprung on them afterwards. Present it as what makes the quote accurate, which is true, and most customers agree without discussion.",
      },
      {
        q: "What warranty should I offer?",
        a: "Thirty to ninety days on your labour, plus the manufacturer's period on parts, is standard. State the limits in writing: it covers the work you did, not unrelated failures or later damage. Clarity at the start is far kinder than an argument later.",
      },
      {
        q: "How do I handle a customer who says I broke their machine?",
        a: "With the intake photograph. That is exactly what it is for. If you did cause damage, say so and put it right — but in the large majority of cases the photograph shows the crack or the missing screw was already there.",
      },
      {
        q: "How do I get customers in a market with many technicians?",
        a: "Honesty, visibly applied. Say when a repair is not worth doing, show your arithmetic, document the job and hand back a machine that works. In a market where everyone knows everyone, that reputation produces referrals without any advertising — and it is the only durable advantage available.",
      },
    ],
  },
};
