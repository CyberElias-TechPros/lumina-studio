/**
 * IT Support — sessions 4 to 6 (full class lectures).
 * Merged by withCoursePrefix() in ../index.ts.
 */

import type { SessionLecture } from "@/data/academy/types";

export const itSupportLessonsB: Record<string, SessionLecture> = {
  "hardware-software-support": {
    summary:
      "The faults that make up most of a support queue: printers, software installation, updates and patches — and the recurring patterns that let you recognise a familiar problem in an unfamiliar description.",
    objectives: [
      "Diagnose and repair printer faults systematically, from queue to network to hardware",
      "Install software properly, including licensing, prerequisites and clean removal",
      "Manage updates and patches without breaking the machines you support",
      "Recognise the common fault patterns that account for most support volume",
      "Know the difference between a fault you fix and a fault you replace",
    ],
    blocks: [
      {
        heading: "Printers: the highest-volume, lowest-prestige fault in support",
        body: [
          "Printer problems are a large share of any support queue, and they are the fault users are most frustrated by, partly because printing feels like it should be trivial. The useful reframe is that **a print job crosses every layer you have studied**: the application, the operating system's print subsystem, the driver, the network, and a physical device with moving parts and consumables. A fault at any of those produces the same visible symptom — nothing comes out.",
          "So diagnosis follows the path rather than guessing. **Does the job reach the queue?** If it does not, the fault is in the application or the print subsystem. **Does it sit in the queue?** Then the printer is not accepting, which points at the connection or the device. **Does it leave the queue and nothing prints?** Then the fault is at the device — paused, offline, out of paper, jammed, or out of toner. **Does it print but wrongly?** Then it is a driver or settings fault. Those four questions divide the entire problem space, and they take a minute.",
          "Two Nigerian-office specifics matter. **Network printers on DHCP addresses change**, so a printer configured by address stops working after a lease renewal — which is why printers must have reserved addresses, a point we covered in the networking course and you will meet again here as a support call. And **shared printers through a host machine fail whenever that machine is off**, which produces the mysterious 'it only works sometimes' report. Neither is a printer fault, and neither is fixed by touching the printer.",
        ],
      },
      {
        heading: "Software installation: the difference between installing and installing properly",
        body: [
          "Installing software is easy; installing it **properly on a machine you support** is a different activity with extra steps. Check **licence status** first — installing unlicensed software on a business machine creates a legal and financial exposure for the company, and in a Nigerian business that may face audits or licensing enquiries, it is a real risk rather than a theoretical one. Check **prerequisites**: many applications need a specific runtime, framework or operating system version, and installing without them produces a broken install that is harder to remove than to avoid.",
          "Then the discipline around the install itself. **Install as an administrator, not with elevated shortcuts scattered around** — a shortcut that prompts for credentials every time is a support call every time. **Note the version you installed and where**, because 'which version is on this machine' is a question you will be asked later and the answer will not be obvious. And when something must be removed, **use the proper uninstaller rather than deleting the folder**, because a half-removed application leaves registry entries, services and drivers that block a clean reinstall — one of the most common causes of 'it will not install again'.",
          "The most valuable habit is **standardising what gets installed**. A company where every machine has a different set of versions and a different arrangement of software is a company where every fault is unique. A defined baseline — these applications, these versions, this configuration — means a fault on one machine can be compared against a known-good one, which is the fastest diagnostic there is. **Standardisation is a support strategy, not an administrative preference.**",
        ],
      },
      {
        heading: "Updates and patches: necessary, and the cause of a surprising share of faults",
        body: [
          "Updates are non-negotiable: **unpatched software is the leading route into an organisation**, and most exploited vulnerabilities were patched publicly some time before they were attacked. But updates are also a genuine cause of support calls, because they change behaviour, occasionally break drivers, and sometimes break applications outright. Pretending otherwise — either 'always update immediately' or 'never update, they break things' — is unprofessional in both directions.",
          "The resolution is **testing before wide deployment**, in miniature. With forty-five machines you cannot run a full staging environment, but you can hold a **pilot group**: three or four machines, ideally including one of each model in use, that receive updates first. If nothing breaks for a few days, the rest follow. That single practice eliminates most update-caused outages at almost no cost, and it is the difference between an organisation that updates safely and one that updates and apologises.",
          "Two supporting habits. **Record what version each machine is on**, so when something breaks after an update you can identify which machines got it and which did not — otherwise you are guessing at correlation. And **never let updates run unattended on a business-critical machine** — the customs software at this company is the kind of application that a framework update can break, and discovering that on the day a shipment must clear is the worst possible timing. **Schedule deliberately, and know what is on the machine before you update it.**",
        ],
      },
      {
        heading: "Common fault patterns: recognition is most of the speed",
        body: [
          "After a few months in support you stop diagnosing from scratch, because most calls match a pattern you have seen. Building that catalogue deliberately — rather than waiting for it to accumulate — is what makes you effective early. The patterns worth knowing cold are few and they cover most volume.",
          "**Slow machine**: nearly always storage full, too many startup programs, insufficient memory for the workload, or a failing disk. Check free space and startup items first; they account for most cases and take minutes. **Cannot connect to the network**: cable, wireless signal, address, or the switch port — work the layers in order. **Application crashes on open**: corrupt user profile, missing runtime, or a bad update; test with a second user account to separate them. **Machine will not start**: power, then disk, then operating system, in that order — and listen to the machine, because fan behaviour and beep patterns are diagnostic.",
          "Two patterns deserve particular attention because they are commonly mishandled. **Intermittent faults** — usually physical, thermal, or a failing component rather than configuration, because configuration fails consistently. A machine that freezes at the same time each afternoon has a scheduled cause; one that freezes when it has been running an hour has a thermal or memory cause. And **faults that follow a user rather than a machine** — profile, permissions, or technique. **When the same problem follows one person between desks, stop looking at the desks.**",
        ],
      },
      {
        heading: "Fix or replace: the judgement call, and how to make it defensibly",
        body: [
          "Not every fault is worth fixing, and knowing when to stop is a professional skill rather than a failure. A five-year-old machine with a failing disk, exhausted memory and an unsupported operating system can be kept alive for a week or a month, but the honest answer is that it should be replaced — and saying so clearly, with reasons, is more valuable than a heroic repair that buys three days.",
          "The judgement has three inputs. **Cost against value**: an hour of your time plus a part, against a machine's remaining useful life. **Reliability risk**: a machine that has failed once will fail again, and for a user whose work is business-critical, an unreliable machine costs more than a new one. And **support burden**: a unique old machine that nobody else has is a machine only you can fix, which makes you a bottleneck and makes the company fragile. All three point the same way more often than people admit.",
          "Then how to say it. Not 'this machine is old' — that sounds like giving up. Rather: **the disk is failing, replacement costs a defined amount, the machine is five years old and no longer receives security updates, and the risk to your work is that it fails during a customs clearance.** Give the client the facts, the cost, and the risk, and let them decide. **Recommending replacement with reasons is professional; repeatedly repairing something that should be replaced is not** — and clients respect the first far more than they appreciate the second.",
        ],
      },
    ],
    demonstration: {
      intro:
        "We work the office's real queue: a printer fault traced through every layer, a proper software installation, a pilot-group update process, and a machine assessed for replacement rather than repair.",
      steps: [
        {
          step: "Take the printer fault and start with the four dividing questions",
          detail:
            "Does the job reach the queue? Does it sit there? Does it leave and nothing prints? Does it print wrongly? One minute of questioning divides the whole problem space, and skipping it is how an hour is lost on the wrong layer.",
        },
        {
          step: "Check the print queue on the machine",
          detail:
            "Open the queue and look at the job's state. A job stuck 'printing' with no output points at the device or connection; no job at all points at the application or print subsystem. The queue tells you which half of the path failed.",
        },
        {
          step: "Check the printer's own state before touching the PC",
          detail:
            "Paused, offline, paper out, toner low, jammed, or an error on its panel. Users routinely report a printer fault that is a message on the printer's own screen, so look at the device before you look at the computer.",
        },
        {
          step: "Test the network path to the printer",
          detail:
            "Ping the printer's address from the affected machine. If it does not respond, the fault is network-side — address, cable, or switch port — and no amount of driver work will help.",
        },
        {
          step: "Find the DHCP-address fault",
          detail:
            "The classic: the printer was configured by IP address and its lease renewed, so it now has a different address. Confirm by checking the printer's current address against what the PC is configured for.",
        },
        {
          step: "Fix it properly with a reservation, not by re-pointing",
          detail:
            "Re-pointing the PC works today and breaks again at the next renewal. Create a DHCP reservation so the printer always receives the same address — the durable fix rather than the one that closes the ticket fastest.",
        },
        {
          step: "Check the shared-printer failure mode",
          detail:
            "Identify any printers shared through a host machine. If the host is off, the printer disappears for everyone, which produces the 'it only works sometimes' report that otherwise looks random.",
        },
        {
          step: "Clear a stuck print queue correctly",
          detail:
            "Cancel the jobs, and if they will not clear, stop the print spooler service, clear the spool folder, and restart it. Doing this in the right order matters — deleting files while the service holds them does not work.",
        },
        {
          step: "Take the software installation request",
          detail:
            "A user needs a new application. Before installing anything, check the licence status and whether the company is entitled to it. Installing unlicensed software exposes the business legally and financially, and that is not your call to make quietly.",
        },
        {
          step: "Check prerequisites before installing",
          detail:
            "Runtime, framework, operating system version. Installing without them produces a broken install that is harder to remove than to avoid, and the resulting error messages rarely name the missing piece.",
        },
        {
          step: "Install properly and record what you did",
          detail:
            "Install as administrator, note the exact version installed and where, and confirm the application launches. 'Which version is on this machine' will be asked later and the answer will not otherwise be recoverable.",
        },
        {
          step: "Remove a failed installation correctly",
          detail:
            "Use the proper uninstaller rather than deleting the folder. A half-removed application leaves services, drivers and registry entries that block a clean reinstall — one of the most common causes of 'it will not install again'.",
        },
        {
          step: "Compare against the standard baseline",
          detail:
            "Check what the company's standard build has and whether this machine deviates. A machine that differs from the baseline is a machine where every fault is unique, and identifying deviations is preventive work.",
        },
        {
          step: "Set up a pilot group for updates",
          detail:
            "Choose three or four machines including one of each model in use. These receive updates first. This is the small-scale version of staged deployment and it eliminates most update-caused outages at almost no cost.",
        },
        {
          step: "Apply updates to the pilot group and observe",
          detail:
            "Install the pending updates, then use those machines normally for a few days. Watch specifically for the customs software, which is the application most likely to be broken by a framework update.",
        },
        {
          step: "Record versions so correlation is possible",
          detail:
            "Note which machines received which update. When something breaks, the first question is 'which machines got the update' — and without a record you are guessing at correlation rather than establishing it.",
        },
        {
          step: "Roll out to the rest once the pilot is clean",
          detail:
            "Deploy to the remaining machines, and deliberately exclude any business-critical machine from unattended updating. Discovering a broken customs application on the day a shipment must clear is the worst possible timing.",
        },
        {
          step: "Take the slow-machine call and work the pattern",
          detail:
            "Check free disk space and startup programs first — between them they account for most slow-machine calls and take minutes. Then memory against workload, then disk health.",
        },
        {
          step: "Assess a machine for replacement rather than repair",
          detail:
            "Five years old, failing disk, unsupported operating system. State the cost of repair, the reliability risk to that user's work, and the fact that it no longer receives security updates. Give the facts and let the business decide.",
        },
        {
          step: "Add the recurring faults to the playbook",
          detail:
            "Printer by path, slow machine, application crash on open, machine will not start, intermittent fault, and user-following fault — each with symptoms, diagnostic order, fix, and the point at which it should be escalated or a replacement recommended.",
        },
      ],
    },
    practice: {
      title: "Work a real hardware and software queue",
      brief:
        "Handle real printer, installation, update and performance faults using the methods in this session, and make at least one defensible replacement recommendation.",
      steps: [
        "Take a printer fault and answer the four dividing questions before touching anything.",
        "Check the print queue state to determine which half of the path failed.",
        "Check the printer's own panel and consumables before investigating the computer.",
        "Test the network path to the printer with a ping from the affected machine.",
        "Check whether the printer's address changed because of a DHCP lease renewal.",
        "Fix any address fault with a reservation rather than by re-pointing the client.",
        "Identify any printers shared through a host machine and note the failure mode.",
        "Clear a stuck queue in the correct order, stopping the spooler service first.",
        "Check licence status and prerequisites before installing any software.",
        "Install as administrator and record the exact version and location.",
        "Remove a failed installation using the proper uninstaller, not by deleting the folder.",
        "Compare the machine against the company's standard baseline and note deviations.",
        "Set up a pilot group of three or four machines including one of each model.",
        "Apply updates to the pilot group and observe for a few days before wider rollout.",
        "Record which machines received which update so correlation is possible later.",
        "Exclude business-critical machines from unattended updating and say why.",
        "Work a slow-machine call starting with free space and startup programs.",
        "Assess one machine for replacement, stating repair cost, reliability risk and support status.",
        "Add six recurring fault patterns to your playbook with diagnostic order and escalation points.",
      ],
      standard:
        "A printer fault diagnosed by the four dividing questions with the queue and device checked before the client, the network path tested, and any address fault fixed with a DHCP reservation rather than re-pointing; a software installation preceded by licence and prerequisite checks, recorded with exact version, and any failed install removed with the proper uninstaller; a pilot group established with versions recorded and business-critical machines excluded from unattended updates; a slow-machine fault worked from free space and startup items; at least one replacement recommendation made with cost, reliability risk and support status stated; and six recurring fault patterns added to the playbook.",
    },
    pitfalls: [
      {
        problem: "Working on the printer driver before checking the printer",
        fix: "Look at the device's own panel first. A large share of reported printer faults are a message on the printer's screen — paused, offline, paper, toner, jam — that nobody looked at.",
      },
      {
        problem: "Re-pointing a client at a printer's new DHCP address",
        fix: "That works today and breaks at the next renewal. Create a reservation so the printer keeps the same address. The durable fix and the fast fix are different things.",
      },
      {
        problem: "Deleting spool files while the print spooler service is running",
        fix: "The service holds them, so the deletion does nothing. Stop the service, clear the folder, restart the service — in that order.",
      },
      {
        problem: "Installing software without checking the licence",
        fix: "Unlicensed software on a business machine creates legal and financial exposure for the company. Verify entitlement first; it is not your decision to make quietly.",
      },
      {
        problem: "Deleting a program folder instead of uninstalling",
        fix: "It leaves services, drivers and registry entries that block a clean reinstall. Use the proper uninstaller, and use a dedicated removal tool when the uninstaller itself fails.",
      },
      {
        problem: "Pushing updates to all machines at once",
        fix: "Use a pilot group of three or four machines including one of each model, observe for a few days, then roll out. It costs almost nothing and prevents most update-caused outages.",
      },
      {
        problem: "Allowing unattended updates on a business-critical machine",
        fix: "A framework update can break the application a shipment depends on. Schedule deliberately and know what is installed before updating.",
      },
      {
        problem: "Heroically repairing a machine that should be replaced",
        fix: "State the repair cost, the reliability risk to the user's work, and whether it still receives security updates. Recommending replacement with reasons is professional; repeated repair is not.",
      },
    ],
    expertNotes: [
      "Diagnose printers along the path, not by preference: application, print subsystem, driver, network, device. The four dividing questions — does it reach the queue, sit there, leave without printing, or print wrongly — cover the entire problem space in about a minute.",
      "Standardising the software baseline is a support strategy rather than an administrative preference. When every machine is the same, a fault can be compared against a known-good machine, which is the fastest diagnostic available. When every machine is unique, every fault is a research project.",
      "The pilot group is the highest-value, lowest-cost practice in this session. Three or four machines receiving updates first, including one of each model, eliminates most update-caused outages and turns 'updates broke everything' into 'updates broke one machine we noticed'.",
      "Learn to recommend replacement with reasons rather than apologising for it. Clients respect a clear statement of cost, risk and support status far more than they appreciate a repair that buys three days on a machine that should have been retired.",
    ],
    vocabulary: [
      {
        term: "Print queue",
        meaning:
          "The operating system's list of pending print jobs. Whether a job reaches it, sits in it, or leaves it determines which part of the print path has failed.",
      },
      {
        term: "Print spooler",
        meaning:
          "The service managing print jobs. A stuck queue is cleared by stopping the service, clearing the spool folder, and restarting it — in that order.",
      },
      {
        term: "DHCP reservation",
        meaning:
          "Binding a fixed address to a device's MAC address. Essential for printers, because a printer configured by address breaks whenever its lease renews.",
      },
      {
        term: "Prerequisite",
        meaning:
          "A runtime, framework or operating system version an application requires. Installing without them produces a broken install that is harder to remove than to avoid.",
      },
      {
        term: "Clean uninstall",
        meaning:
          "Removing an application through its proper uninstaller so no services, drivers or registry entries remain to block a future reinstall.",
      },
      {
        term: "Pilot group",
        meaning:
          "A small set of machines, ideally one of each model, that receive updates before everyone else. The practical version of staged deployment at small scale.",
      },
      {
        term: "Standard baseline",
        meaning:
          "The defined set of applications, versions and configuration every machine should have. It makes faults comparable against a known-good machine.",
      },
      {
        term: "Replacement recommendation",
        meaning:
          "A reasoned statement that a device should be retired rather than repaired, covering repair cost, reliability risk and whether it still receives security updates.",
      },
    ],
    homework: [
      {
        task: "Diagnose three real printer faults by path",
        detail:
          "For each, record the answer to all four dividing questions, what you checked at each layer, and the fix. Note whether any was an address or host-sharing problem rather than a printer problem.",
      },
      {
        task: "Write your software installation procedure",
        detail:
          "The licence check, prerequisite check, installation steps, version recording, and removal procedure. One page, written so someone else can follow it without asking you anything.",
      },
      {
        task: "Establish a pilot group and an update policy",
        detail:
          "Which machines are in the pilot, how long you observe before rollout, how versions are recorded, and which machines are excluded from unattended updating with the reason stated.",
      },
      {
        task: "Write one replacement recommendation",
        detail:
          "For a real machine: repair cost, reliability risk to the specific user's work, support and security-update status, and your recommendation. Written for a manager who has to approve spending.",
      },
    ],
    rubric: [
      {
        criterion: "Printer diagnosis",
        passing: "Got the printer working.",
        excellent:
          "Four dividing questions answered first, queue and device checked before the client, network path tested, and address faults fixed with a reservation rather than re-pointing.",
      },
      {
        criterion: "Software installation",
        passing: "The application was installed.",
        excellent:
          "Licence and prerequisites checked first, version and location recorded, proper uninstaller used for removal, and the machine compared against the standard baseline.",
      },
      {
        criterion: "Update management",
        passing: "Updates were applied.",
        excellent:
          "Pilot group established with one of each model, versions recorded so correlation is possible, business-critical machines excluded from unattended updates, and rollout staged.",
      },
      {
        criterion: "Pattern recognition",
        passing: "Faults were fixed individually.",
        excellent:
          "Recognises the recurring patterns, works each in the correct diagnostic order, and distinguishes intermittent and user-following faults from configuration faults.",
      },
      {
        criterion: "Replacement judgement",
        passing: "Recommended a repair or replacement.",
        excellent:
          "Weighed repair cost against reliability risk and support status, presented the facts and the risk clearly, and let the business decide rather than deciding silently.",
      },
    ],
    faqs: [
      {
        q: "Why does the printer work some days and not others?",
        a: "Two common causes: its DHCP lease renewed and it now has a different address than the computers are configured for, or it is shared through a host machine that was switched off. Neither is a printer fault, and neither is fixed at the printer.",
      },
      {
        q: "A program will not reinstall after I deleted its folder. Why?",
        a: "Deleting the folder leaves services, drivers and registry entries behind, and the installer sees them and refuses. Use the proper uninstaller, or a dedicated removal tool, then reinstall cleanly.",
      },
      {
        q: "An update broke an application. What now?",
        a: "Identify which machines received the update — which is only possible if you recorded versions — and roll back or uninstall that update on the affected machines. Then add the application to your pilot group's watch list before the next rollout.",
      },
      {
        q: "How do I justify replacing a machine that still turns on?",
        a: "Repair cost against remaining useful life, the reliability risk to that specific user's work, and whether it still receives security updates. Present the facts and the risk and let the business decide — that is a professional recommendation, not a shrug.",
      },
      {
        q: "Is a slow machine always a hardware problem?",
        a: "Usually not. Check free disk space and startup programs first — between them they account for most slow-machine calls. Then compare installed memory against the workload, and only then suspect a failing disk.",
      },
    ],
  },

  "documentation-support": {
    summary:
      "The work that makes support survive your absence: knowledge base articles that people actually use, ticket notes that help the next person, and asset records that answer questions before they are asked.",
    objectives: [
      "Write knowledge base articles that a non-technical user can follow unaided",
      "Write ticket notes that transfer knowledge rather than just closing a job",
      "Build and maintain asset records that make diagnosis faster",
      "Understand why documentation is a commercial asset, not an administrative chore",
      "Keep documentation alive rather than letting it rot after launch",
    ],
    blocks: [
      {
        heading: "Documentation is the difference between a support person and a support function",
        body: [
          "Everything you have learned so far lives in your head, and that is precisely the problem. A support operation that depends on one person's memory is fragile: it stops when you are on leave, it degrades when you are busy, and it vanishes when you leave. **Documentation is what converts your knowledge into the organisation's knowledge**, and it is the single clearest marker of a professional support person.",
          "There is also a selfish argument worth making, because it is true. **Every fault you document is a fault that takes five minutes next time instead of fifty** — including when the next time is you, six months from now, with no memory of the job. Support people who do not document work just as hard in year three as in year one. Support people who document get faster, and the speed is visible to everyone around them.",
          "And commercially: a documented support function can be handed over, staffed, and sold. An undocumented one cannot be scaled beyond you. When you pitch a support contract to a small business, **the playbook you produce in this course is the artefact that demonstrates you understand the job** — far more convincingly than any claim about your technical ability.",
        ],
      },
      {
        heading: "Knowledge base articles: written for the reader, not for you",
        body: [
          "A knowledge base article has one job: **let somebody solve the problem without you.** That standard sounds simple and it governs every decision about how you write. The most common failure is an article written from the author's knowledge rather than the reader's ignorance — it skips the step the author considers obvious, which is exactly the step the reader cannot perform.",
          "The structure that works is consistent. **A title phrased as the user's problem**, not as the technical cause: 'Printer says offline' rather than 'Print spooler reset procedure', because that is what somebody will search for. **A one-line statement of the symptom** so readers confirm they are in the right place. **What you will need** — including anything non-obvious, like administrator access. **Numbered steps, one action per step**, each short enough to perform while reading. **What to do if it does not work**, which is the section most articles omit and the one that prevents a failed self-service attempt becoming an angry call.",
          "Then the two disciplines that separate useful articles from decoration. **Test the article on somebody who does not know the answer**, and watch where they hesitate — every hesitation is a missing step. And **write in the user's language**, which for a knowledge base means no jargon at all, since the reader may have no support person available to translate. An article a user cannot follow is not a partial success; it is a document that will not be used and a call you will still receive.",
        ],
      },
      {
        heading: "Ticket notes: written for the next person, who is often you",
        body: [
          "Ticket notes are the most neglected documentation in support, because they are written at the moment you are busiest and for an audience you cannot see. But they are the record that lets a colleague pick up your open tickets when you are absent, that lets you resume a problem after a week, and that reveals a recurring fault across dozens of separate incidents.",
          "The habit that matters most was introduced earlier and bears repeating because it is what separates professionals: **record what you ruled out, not only what you did.** 'Checked disk space, 40 GB free. Checked licence, valid. Tried second user account, works.' Those three lines save the next person thirty minutes, because they will not repeat your dead ends. Notes that say only 'reinstalled, fixed' transfer nothing at all.",
          "Three further habits. **Write while it is fresh** — accuracy decays within hours, and a note written at day end is a reconstruction rather than a record. **Note the environment**, because 'Windows 10, version 22H2, machine GF-014' turns an anecdote into a pattern when the same fault appears on five other machines with the same version. And **state whether it was a fix or a workaround**, because a workaround recorded as a fix guarantees the call returns and the next person starts from a false premise.",
        ],
      },
      {
        heading: "Asset records: the documentation that prevents questions being asked",
        body: [
          "An **asset record** is a register of what the organisation owns: each machine, its user, its specification, its operating system version, its purchase date, its warranty status, and its role. It sounds administrative, and it is one of the most useful things you can build in your first month, because it answers questions that otherwise interrupt your day dozens of times.",
          "Its diagnostic value is immediate and underappreciated. When three machines fail the same way, an asset record tells you they are the same model, bought in the same batch, running the same operating system version — which converts three mysteries into one pattern with one cause. **Without a register you cannot see correlation**, and correlation is what turns reactive support into something closer to prevention.",
          "It also carries financial and security weight. Warranty status tells you whether a repair is free or chargeable, which changes the replacement conversation entirely. Purchase date tells you when a machine is approaching end of life. And knowing exactly what software is licensed against what hardware is what protects the business in a licensing enquiry. **Keep it current** — an asset record that is six months stale is worse than none, because people trust it and act on wrong information.",
        ],
      },
      {
        heading: "Keeping documentation alive: the part everyone skips",
        body: [
          "Documentation fails in a predictable way. It is written carefully at the start, then the environment changes — a new printer, a new software version, an office move — and the documents quietly stop being true. Six months later nobody trusts them, and the organisation reverts to asking whoever knows. **Rot, not absence, is the normal failure mode of documentation.**",
          "The defence is procedural rather than heroic. **Update the article when you close the ticket that invalidates it** — the moment you discover a step is wrong is the moment you are best placed to correct it, and it takes a minute then versus an investigation later. **Review the top ten articles quarterly**, since a small number of articles account for most usage and those are the ones worth keeping accurate. And **record what people actually search for and cannot find**, because a gap in the knowledge base is a support call you will keep receiving.",
          "Finally, make it findable. The best-written article in an unsearchable folder does not exist. **One obvious location, searchable, with titles phrased as users' problems.** If users cannot find it in ten seconds they will message you instead, and you will have written it for nobody. **Findability is a design requirement, not a nice-to-have.**",
        ],
      },
    ],
    demonstration: {
      intro:
        "We build the documentation layer for the freight company: a knowledge base with tested articles, ticket notes that transfer knowledge, and an asset register that turns three separate faults into one pattern.",
      steps: [
        {
          step: "Find out what people already do when they have a problem",
          detail:
            "Ask five users how they would look something up. If the answer is 'message you', that is the gap you are filling, and knowing it shapes how you write and where you put things.",
        },
        {
          step: "Choose one searchable location and commit to it",
          detail:
            "A shared drive folder, a simple wiki, or a shared document — the tool matters far less than there being exactly one obvious place. Documentation in two locations is documentation in no location.",
        },
        {
          step: "Identify the ten most common faults from your tickets",
          detail:
            "Count them from the queue you have been keeping. You are writing the ten articles users actually need, not the ten you find interesting — and the count is evidence for the prioritisation.",
        },
        {
          step: "Write the first article with a user-phrased title",
          detail:
            "'Printer says offline' rather than 'Print spooler reset procedure'. Title it as the problem the reader experiences, because that is what they will type into a search box.",
        },
        {
          step: "Open with a one-line symptom confirmation",
          detail:
            "One sentence describing exactly what the reader sees, so they know within three seconds whether this is their problem. Wrong-article dead ends are why people abandon knowledge bases.",
        },
        {
          step: "List what the reader will need, including the non-obvious",
          detail:
            "Administrator access, the printer name, a cable. Omitting 'you will need admin rights' wastes the reader's whole attempt and turns a self-service success into a support call.",
        },
        {
          step: "Write numbered steps, one action per step",
          detail:
            "Each step short enough to perform while reading, with no step combining two actions. 'Click Start, type Services, press Enter' is three steps, not one, and combining them loses readers.",
        },
        {
          step: "Add the section everyone omits: if this does not work",
          detail:
            "State what to try next and when to contact support. Without it, a failed self-service attempt becomes an angry call rather than an informed one — and an informed caller is much faster to help.",
        },
        {
          step: "Remove every piece of jargon",
          detail:
            "No spooler, driver, cache, permission. Describe what the thing does instead. The reader has no support person beside them to translate, which is the entire premise of the article.",
        },
        {
          step: "Test the article on someone who does not know the answer",
          detail:
            "Watch them follow it and note every hesitation. **Each hesitation is a missing or ambiguous step.** This single test improves articles more than any amount of re-reading your own writing.",
        },
        {
          step: "Fix the article based on where they hesitated",
          detail:
            "Add the missing step, split the ambiguous one, and re-test if the change was substantial. Then publish. An article tested on one real user is worth more than ten reviewed only by their author.",
        },
        {
          step: "Rewrite three old tickets to the knowledge-transferring standard",
          detail:
            "Take tickets that say 'fixed' and rebuild them: symptom in the user's words, what was checked and ruled out, what was changed, environment, and fix or workaround status. The contrast makes the standard obvious.",
        },
        {
          step: "Note the environment in every new ticket from now on",
          detail:
            "Machine identifier, operating system and version, application version. This is what turns three separate incidents into one pattern when they turn out to share a build.",
        },
        {
          step: "Build the asset register",
          detail:
            "One row per machine: identifier, user, model, specification, operating system and version, purchase date, warranty status, role. Start with the machines you can see; complete it over the following weeks rather than delaying it.",
        },
        {
          step: "Use the register to find a real pattern",
          detail:
            "Look for machines sharing a model, batch or operating system version. When you find three faults on the same build, you have converted three mysteries into one cause — which is the register paying for itself.",
        },
        {
          step: "Record warranty and end-of-life status",
          detail:
            "This changes the replacement conversation completely: a repair under warranty is free, and a machine past end of life no longer receives security updates. Both facts belong in the recommendation, not in your head.",
        },
        {
          step: "Set the maintenance routine before you finish",
          detail:
            "Update an article when you close a ticket that invalidates it; review the top ten quarterly; record searches that found nothing. Written down as a routine, because documentation rots by default.",
        },
        {
          step: "Confirm the documentation is actually findable",
          detail:
            "Ask a user to find an article for a problem they have not had. If it takes more than ten seconds, the location or the titles are wrong and the articles will go unused however good they are.",
        },
        {
          step: "Assemble the playbook as the deliverable",
          detail:
            "The ten faults with symptoms, diagnostic steps, fixes and escalation rules; the ticket standard; the asset register; and the maintenance routine. This is the document a real helpdesk runs on, and the thing you show an employer.",
        },
      ],
    },
    practice: {
      title: "Build the documentation layer and prove it is usable",
      brief:
        "Create a knowledge base with tested articles, adopt a knowledge-transferring ticket standard, build an asset register, and demonstrate that a user can actually find and follow your documentation.",
      steps: [
        "Ask five users how they currently look up a problem and record the gap you are filling.",
        "Choose exactly one searchable location and put everything there.",
        "Count the ten most common faults from your ticket history and prioritise those.",
        "Write each article with a title phrased as the user's problem, not the technical cause.",
        "Open each with a one-line symptom so readers confirm they are in the right place.",
        "List what the reader needs, including non-obvious items like administrator access.",
        "Write numbered steps with exactly one action per step.",
        "Include an 'if this does not work' section with next steps and when to call support.",
        "Strip all jargon, describing what things do rather than naming them.",
        "Test each article on someone who does not know the answer and note every hesitation.",
        "Fix the article where they hesitated, and re-test substantial changes.",
        "Rewrite three existing tickets to include ruled-out findings, environment, and fix-or-workaround status.",
        "Record environment details in every new ticket from now on.",
        "Build the asset register with identifier, user, model, specification, operating system, purchase date, warranty and role.",
        "Use the register to identify at least one real correlation across machines.",
        "Record warranty and end-of-life status so replacement recommendations can cite them.",
        "Write the maintenance routine: update on close, quarterly review of the top ten, log searches that find nothing.",
        "Have a user find an article for an unfamiliar problem in under ten seconds.",
        "Assemble the complete playbook deliverable from all of the above.",
      ],
      standard:
        "One searchable location holding at least ten knowledge base articles covering the most common faults, each titled as the user's problem, opening with a symptom confirmation, listing prerequisites including administrator access, using one action per numbered step, including an 'if this does not work' section, and free of jargon; **every article tested on a real user with hesitations fixed**; three tickets rewritten to the knowledge-transferring standard and environment details recorded in all new tickets; an asset register with warranty and end-of-life status used to identify at least one real cross-machine correlation; a written maintenance routine; a findability test passed in under ten seconds; and the complete playbook assembled.",
    },
    pitfalls: [
      {
        problem: "Titles phrased as the technical cause",
        fix: "Users search for their symptom, not your diagnosis. 'Printer says offline' will be found; 'Print spooler reset procedure' will not, however accurate it is.",
      },
      {
        problem: "Skipping the step you consider obvious",
        fix: "That is precisely the step the reader cannot perform. Test every article on someone who does not know the answer and treat each hesitation as a missing step.",
      },
      {
        problem: "Omitting the 'if this does not work' section",
        fix: "Without it a failed self-service attempt becomes an angry call rather than an informed one. State what to try next and when to contact support.",
      },
      {
        problem: "Writing tickets that record only what you did",
        fix: "Record what you ruled out. 'Checked disk space, fine' saves the next person from repeating your dead end; 'fixed' transfers nothing at all.",
      },
      {
        problem: "Writing tickets at the end of the day",
        fix: "Accuracy decays within hours and a late note is a reconstruction rather than a record. Write while the interaction is fresh.",
      },
      {
        problem: "Omitting environment details from tickets",
        fix: "Machine, operating system version and application version are what turn three separate incidents into one recognisable pattern. Without them you cannot see correlation.",
      },
      {
        problem: "An asset register that goes stale",
        fix: "A six-month-old register is worse than none, because people trust it and act on wrong information. Update it when you touch a machine, and review it quarterly.",
      },
      {
        problem: "Documentation in a location nobody can find",
        fix: "One searchable place, with user-phrased titles. If a user cannot find it in ten seconds they will message you instead, and you will have written it for nobody.",
      },
    ],
    expertNotes: [
      "Test every article on someone who does not know the answer and watch where they hesitate. Each hesitation is a missing or ambiguous step, and this single practice improves documentation more than any amount of re-reading your own work.",
      "Record what you ruled out, in every ticket, forever. It is the habit that most reliably separates experienced support people from beginners, because it prevents the next person repeating your dead ends and it makes recurring faults visible across tickets.",
      "The asset register pays for itself the first time three separate faults turn out to share a machine model, batch or operating system version. That correlation is invisible without a register, and it is what turns reactive support into prevention.",
      "Documentation rots rather than disappearing, so the defence is procedural: update the article when you close the ticket that invalidates it, review the top ten quarterly, and log searches that find nothing. Written as a routine, because relying on goodwill does not survive a busy month.",
    ],
    vocabulary: [
      {
        term: "Knowledge base",
        meaning:
          "A searchable collection of articles letting users solve common problems without contacting support. Its measure of success is calls not received.",
      },
      {
        term: "User-phrased title",
        meaning:
          "An article title written as the reader's symptom rather than the technical cause, because that is what they will search for.",
      },
      {
        term: "One action per step",
        meaning:
          "The rule for writing procedure steps. Combining actions loses readers, who cannot tell which part they failed at.",
      },
      {
        term: "Hesitation testing",
        meaning:
          "Watching a real user follow an article and treating every pause as a missing or ambiguous step. The most effective documentation review method.",
      },
      {
        term: "Ruled-out findings",
        meaning:
          "Ticket notes recording what was checked and eliminated. They save the next person from repeating dead ends and reveal patterns across incidents.",
      },
      {
        term: "Asset register",
        meaning:
          "A record of every device: identifier, user, model, specification, operating system, purchase date, warranty status and role.",
      },
      {
        term: "Correlation",
        meaning:
          "Recognising that several separate faults share a model, batch or software version. Only visible with an asset register and environment details in tickets.",
      },
      {
        term: "Documentation rot",
        meaning:
          "The normal failure mode where documents stay present but stop being accurate as the environment changes, causing users to stop trusting them.",
      },
    ],
    homework: [
      {
        task: "Write and test five knowledge base articles",
        detail:
          "Each titled as the user's problem, with symptom confirmation, prerequisites, one action per step, and an 'if this does not work' section. Test each on a real user and record where they hesitated and what you changed.",
      },
      {
        task: "Adopt the knowledge-transferring ticket standard",
        detail:
          "Rewrite three existing tickets to include ruled-out findings, environment details and fix-or-workaround status. Then use the standard for every new ticket and note the difference it makes.",
      },
      {
        task: "Build the asset register",
        detail:
          "One row per machine with identifier, user, model, specification, operating system version, purchase date, warranty status and role. Use it to identify at least one correlation across machines.",
      },
      {
        task: "Assemble the support playbook deliverable",
        detail:
          "Ten faults with symptoms, diagnostic steps, fixes and escalation rules; the ticket standard; the asset register; and the documentation maintenance routine. This is the artefact you show an employer.",
      },
    ],
    rubric: [
      {
        criterion: "Article usability",
        passing: "Articles were written.",
        excellent:
          "User-phrased titles, symptom confirmation, prerequisites including admin access, one action per step, an 'if this does not work' section, and no jargon throughout.",
      },
      {
        criterion: "Testing discipline",
        passing: "Articles were reviewed.",
        excellent:
          "Every article tested on a real user who did not know the answer, with each hesitation treated as a missing step and the article revised accordingly.",
      },
      {
        criterion: "Ticket quality",
        passing: "Tickets were closed with notes.",
        excellent:
          "Ruled-out findings recorded, environment details captured, fix distinguished from workaround, and notes written while fresh rather than reconstructed later.",
      },
      {
        criterion: "Asset management",
        passing: "A list of machines exists.",
        excellent:
          "Complete register including warranty and end-of-life status, used to identify a real cross-machine correlation, and kept current as machines are touched.",
      },
      {
        criterion: "Sustainability",
        passing: "Documentation was produced.",
        excellent:
          "A written maintenance routine covering update-on-close, quarterly review of the top articles and logging failed searches, plus a findability test passed in under ten seconds.",
      },
    ],
    faqs: [
      {
        q: "I do not have time to write documentation while handling tickets.",
        a: "Write it as you close the ticket rather than as a separate task — the knowledge is in front of you at that moment and it takes a few minutes. Every fault documented is a fault that takes five minutes next time instead of fifty, including for you.",
      },
      {
        q: "What tool should I use for the knowledge base?",
        a: "Whichever one location your users will actually search. A shared folder, a simple wiki or a shared document all work. The tool matters far less than there being exactly one obvious, searchable place.",
      },
      {
        q: "How many articles should I write first?",
        a: "Ten, chosen by counting your ticket history rather than by preference. A small number of accurate, tested, findable articles beats fifty untested ones, because users abandon a knowledge base after two failed attempts.",
      },
      {
        q: "Is an asset register really worth the effort?",
        a: "It answers questions that otherwise interrupt your day constantly, it reveals when separate faults share a cause, and it tells you whether a repair is under warranty. It is among the highest-value things you can build in your first month.",
      },
      {
        q: "How do I stop documentation going out of date?",
        a: "Procedurally: update the article when you close a ticket that invalidates it, review the top ten quarterly, and record searches that find nothing. Documentation rots by default, so the routine has to be written down rather than relied on as goodwill.",
      },
    ],
  },

  "support-simulation": {
    summary:
      "The final assessment: live simulated calls with escalating pressure, escalation decisions made against real rules, and completion of the support playbook that is this course's deliverable.",
    objectives: [
      "Handle live support calls under realistic pressure while keeping method intact",
      "Make escalation decisions against defined rules rather than under social pressure",
      "Combine technical diagnosis with the communication skills from session three",
      "Complete a support playbook that another person could actually run a helpdesk from",
      "Articulate your own strengths and gaps honestly as you enter the job market",
    ],
    blocks: [
      {
        heading: "Why the last session is a simulation and not a summary",
        body: [
          "Everything in this course has been practised on faults you knew were coming, in your own time, without anybody watching. The job is not like that. In the job, three problems arrive at once, one user is angry, a manager is asking how long it will take, and you have not seen this particular fault before. **The gap between knowing the method and using it under pressure is the thing this session closes.**",
          "So the assessment is live. Simulated calls arrive with symptoms described in user language, some deliberately vague, some genuinely urgent, and a few that are not urgent at all but arrive with urgency attached. You triage, diagnose, communicate and document, and you are assessed on **method under pressure** at least as much as on getting the right answer — because a correct answer reached by guessing is not a skill you can rely on tomorrow.",
          "This is also where the course deliverable is finished: **a support playbook covering the ten most common faults, with diagnostic steps, fixes and escalation rules.** You have been building it since session one. Today it becomes the complete artefact, and it is the thing that distinguishes you from every other candidate for a first IT job.",
        ],
      },
      {
        heading: "Escalation: the decision that separates competent from reckless",
        body: [
          "**Escalation** means passing a problem to somebody with more access, more authority or more specialist knowledge. Beginners fear it because it feels like admitting failure; experienced people use it constantly because it is the fastest route to a resolution. **Escalating early with good notes is professional. Escalating late, or not at all, is how small problems become incidents.**",
          "The rules that make it a decision rather than a feeling are worth writing down, which is why your playbook contains them. Escalate when: **the fix is beyond your access or authority** — a server change, a firewall rule, a vendor-only repair. When a **business-critical system is affected and time is running out** — the customs software on a clearance day. When you have **made no progress within a defined period**, which you set in advance so that pride cannot extend it indefinitely. And when the fault is **outside your knowledge entirely**, because a specialist will take ten minutes where you would take a day.",
          "Then how to escalate well, which matters as much as when. **Never escalate empty-handed**: hand over the symptom in the user's words, what you checked, what you ruled out, what you changed, and your current hypothesis. That record is the difference between a colleague picking up in two minutes and starting from zero — and it is the same discipline as ticket writing, applied at the moment it matters most. **Escalating with nothing written is not escalation; it is transferring your confusion.**",
        ],
      },
      {
        heading: "Working under pressure without losing the method",
        body: [
          "Pressure produces two characteristic failures. The first is **abandoning sequence** — skipping reproduction, guessing at fixes, changing several things at once. It feels faster and it is slower, because an unattributed fix gets reverted and retried. The second is **going silent** — heads down, no communication, while the user and the manager both imagine the worst. Silence reads as incompetence even when the work is going well.",
          "The counter to both is the same: **narrate the stage you are in.** 'I have reproduced it, I am isolating whether it is the profile or the machine, that will take about ten minutes.' That single sentence keeps your own reasoning honest, gives the user an informed wait, and tells a manager that something controlled is happening. It costs fifteen seconds and it changes how the whole interaction is perceived.",
          "Then the queue discipline. When three problems arrive at once, **triage before you touch any of them**, not after starting the first. The instinct is to begin with whoever spoke loudest or arrived first, which is precisely the wrong ordering. Take two minutes, assign priority by impact, tell each person where they sit in the queue and roughly when you will reach them, and then work in order. **An honest queue position is calming; an unexplained wait is not.**",
        ],
      },
      {
        heading: "The playbook: what makes it a real document rather than coursework",
        body: [
          "The deliverable is ten faults, and the test of quality is simple: **could somebody else run this helpdesk from it without calling you?** That standard governs what goes in. For each fault you need the **symptoms in the user's language** — because that is how it will be reported — the **diagnostic steps in order**, the **specific fix**, and the **escalation rule** saying when to stop and hand it over.",
          "Three things separate a real playbook from a list of fixes. **Order matters and is stated**: 'check free space first, then startup items, then memory' is a diagnostic procedure, whereas listing three possible causes is not. **Negative findings are included**: what to check that will probably be fine, because ruling things out is most of diagnosis and the next person needs to know what to eliminate. And **escalation is explicit**: a fault with no stated hand-off point is a fault someone will struggle with for six hours out of uncertainty about whether they are allowed to ask.",
          "Then the sections that make it an operational document rather than a technical one: the **priority bands and service levels** from session one, the **ticket standard** and the **identity verification procedure** from sessions one and three, and the **asset register** from session five. Together those mean a new person joining the support function can be productive in days rather than months — which is exactly what a manager is buying when they hire someone who arrives with a playbook.",
        ],
      },
      {
        heading: "Entering the job market with something to show",
        body: [
          "Most candidates for a first IT support job can describe troubleshooting. Very few can **show** a structured approach, a documentation standard, and a completed playbook. That difference is worth a great deal in an interview, because it converts a claim into evidence — and because it demonstrates the specific quality employers struggle to find in entry-level candidates: the habit of writing things down.",
          "Be honest about the boundary of what this course gives you. You have **method, communication skill and documentation discipline**, which transfer to any environment. You have **not** accumulated years of pattern recognition, and you will meet faults you cannot solve. Say so plainly in an interview: it reads as maturity rather than weakness, and it is far more credible than claiming expertise you do not have. **What you can promise is that you will diagnose systematically, communicate clearly, and leave everything documented** — which is genuinely most of the job.",
          "The natural progression from here runs through the adjacent courses. **Computer Networking** deepens the infrastructure side, and **Cybersecurity** builds directly on the identity verification, access control and update discipline you have practised here. Support is the standard entry point into IT precisely because it exposes you to every layer at once, and the people who progress fastest are the ones who documented what they learned along the way.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The final assessment. Simulated calls arrive under time pressure with deliberate vagueness and manufactured urgency; the candidate triages, diagnoses, communicates, escalates and documents, then presents the completed playbook.",
      steps: [
        {
          step: "Brief the assessment conditions",
          detail:
            "Eight calls across ninety minutes, symptoms in user language only, some vague, some genuinely critical, some urgent-sounding but low impact. The client and the manager are both played by the instructor. Method is assessed alongside outcome.",
        },
        {
          step: "Establish your queue before taking the first call",
          detail:
            "Have your ticket format, priority bands and escalation rules open and ready. Under pressure you fall back on what is prepared; improvising a format while handling a call is how notes get lost.",
        },
        {
          step: "Take call one: a vague report",
          detail:
            "'The computer is acting funny.' Do not guess. Ask them to show you, preserve their words, and reproduce before investigating. The first thirty seconds determine whether the next ten minutes are useful.",
        },
        {
          step: "Take call two while call one is open, and triage between them",
          detail:
            "A second problem arrives mid-diagnosis. Assess impact against urgency, decide the order out loud, and tell the first user where they now sit. Resisting the impulse to just finish what you started is the skill being tested.",
        },
        {
          step: "Take call three: manufactured urgency on a low-impact problem",
          detail:
            "A senior person is irritated about something that is genuinely medium priority. Apply the published bands without offence, explain the reasoning, and offer a realistic time. Do not let rank set the queue.",
        },
        {
          step: "Narrate your stage throughout",
          detail:
            "'I have reproduced it, I am isolating profile against machine, about ten minutes.' Fifteen seconds of communication that keeps your reasoning honest, gives the user an informed wait, and shows the manager something controlled is happening.",
        },
        {
          step: "Take call four: a business-critical failure",
          detail:
            "The customs software will not open and a shipment must clear today. This is critical, and the pressure is real. Move fast but do not skip reproduction or isolation — speed without method produces changes you cannot attribute.",
        },
        {
          step: "Recognise the escalation point and take it",
          detail:
            "The fix requires a server change beyond your access. Escalate immediately rather than after an hour of struggling. Knowing the boundary of your access and acting on it quickly is the competence being assessed, not a failure.",
        },
        {
          step: "Escalate with a complete handover",
          detail:
            "Hand over the symptom in the user's words, what you checked, what you ruled out, what you changed, and your hypothesis. Escalating with nothing written is transferring your confusion rather than the problem.",
        },
        {
          step: "Keep the user informed after escalating",
          detail:
            "Escalation is not the end of your responsibility. Tell the user who has it, what happens next and when you will update them. Abandoning the user at the handover is the most common way to lose their trust.",
        },
        {
          step: "Take call five: a password reset under social pressure",
          detail:
            "The caller is in a hurry, is irritated, and presses you to skip verification. Apply the procedure identically to everyone, decline calmly, and escalate if the pressure continues. This is the exact shape of the attack that breaches organisations.",
        },
        {
          step: "Take call six: a fault you have not seen before",
          detail:
            "Nothing in the playbook matches. Fall back to the method: reproduce, isolate by layer, run the three isolating tests, change one thing. The assessment is whether the method holds when recognition fails — which is the situation you will be in regularly.",
        },
        {
          step: "Say so when you are stuck",
          detail:
            "State what you have eliminated and what you are examining next. A partial diagnosis that genuinely narrows the problem is more useful and better assessed than a rushed guess, and it is what a professional actually does.",
        },
        {
          step: "Handle the interruption that is not a fault",
          detail:
            "Somebody asks how to do something rather than reporting a problem. Answer briefly, and note whether it belongs in the knowledge base. Recurring how-to questions are documentation gaps, and spotting them is part of the job.",
        },
        {
          step: "Manage the queue honestly at the ninety-minute mark",
          detail:
            "State what is resolved, what is open, what was escalated, and who will be told what. Proactive notification of anything unfinished matters more than having finished everything, because the latter is not always possible.",
        },
        {
          step: "Write every ticket to the standard while it is fresh",
          detail:
            "Symptom in the user's words, ruled-out findings, environment, specific change, fix or workaround, user confirmation. Written immediately, because accuracy decays within hours and a late note is a reconstruction.",
        },
        {
          step: "Review your own performance against the method",
          detail:
            "For each call, identify which stages you completed and which you skipped under pressure. Name the skips honestly — they are the specific things to work on, and self-assessment accuracy is itself part of professional maturity.",
        },
        {
          step: "Complete the playbook's ten fault entries",
          detail:
            "Each with symptoms in user language, diagnostic steps in a stated order, negative findings to check, the specific fix, and an explicit escalation rule. Add the faults from today, which are the ones you have actually worked under pressure.",
        },
        {
          step: "Attach the operational sections",
          detail:
            "Priority bands and service levels, the ticket standard, the identity verification procedure, the remote session procedure, the asset register and the documentation maintenance routine. These are what let someone else run the function, not just fix faults.",
        },
        {
          step: "Present the playbook as though to an employer",
          detail:
            "Ten minutes: what it is, how it is structured, what it would let a new person do, and where its gaps are. Being clear about the gaps reads as maturity and is far more credible than claiming completeness you do not have.",
        },
      ],
    },
    practice: {
      title: "The final practical: live calls, escalation, and the completed playbook",
      brief:
        "Work simulated support calls under time pressure with method assessed alongside outcome, make escalation decisions against defined rules, and deliver the complete support playbook.",
      steps: [
        "Prepare your ticket format, priority bands and escalation rules before the first call rather than improvising them under pressure.",
        "Handle at least eight calls across ninety minutes, logging each before investigating.",
        "Take a deliberately vague report and convert it by observation rather than guessing.",
        "Triage between two simultaneous problems and tell the waiting user where they now sit.",
        "Apply the published priority bands to a senior person's low-impact problem without offence.",
        "Narrate your current stage and time estimate on every call.",
        "Handle a business-critical failure quickly without skipping reproduction or isolation.",
        "Recognise the escalation point and escalate immediately rather than after an hour of struggling.",
        "Escalate with a complete handover: symptom, checks, ruled-out findings, changes, hypothesis.",
        "Keep the user informed after escalating, including who has it and when you will update them.",
        "Decline pressure to skip identity verification on a password reset, and escalate if it continues.",
        "Work a fault not covered by your playbook by falling back to the method rather than recognition.",
        "State clearly what you have eliminated when you are stuck, rather than guessing to appear productive.",
        "Answer a how-to question and record it as a knowledge base gap.",
        "Give an honest end-of-session account of what is resolved, open, escalated and pending notification.",
        "Write every ticket to the standard immediately while the detail is fresh.",
        "Review your own performance stage by stage and name honestly which stages you skipped.",
        "Complete ten playbook entries with stated diagnostic order, negative findings and escalation rules.",
        "Attach the operational sections: bands, service levels, ticket standard, verification, remote procedure, asset register, maintenance routine.",
        "Present the playbook and its gaps as though to a prospective employer.",
      ],
      standard:
        "At least eight calls handled under time pressure with every one logged before investigation; triage performed between simultaneous problems using the published bands, including against a senior person's low-impact request; stage narration on every call; a business-critical failure handled quickly without skipping reproduction or isolation; escalation taken promptly at the defined point with a complete written handover and the user kept informed afterwards; pressure to skip identity verification declined and escalated; an unfamiliar fault worked by method rather than recognition; honest self-review naming skipped stages; **a completed playbook of ten faults with stated diagnostic order, negative findings and explicit escalation rules, plus the operational sections** — delivered to the standard that another person could run the helpdesk from it.",
    },
    pitfalls: [
      {
        problem: "Starting the first call before preparing your queue and format",
        fix: "Under pressure you fall back on what is prepared. Have the ticket format, priority bands and escalation rules open before you begin, because improvising them mid-call is how notes get lost.",
      },
      {
        problem: "Abandoning the method when the pressure rises",
        fix: "Skipping reproduction and changing several things at once feels faster and is slower, because an unattributed fix gets reverted and retried. The method is what keeps you moving purposefully.",
      },
      {
        problem: "Going silent while working hard",
        fix: "Silence reads as incompetence even when the work is going well. Narrate the stage you are in — fifteen seconds that changes how the whole interaction is perceived.",
      },
      {
        problem: "Working in arrival order rather than priority order",
        fix: "Triage before touching any of them. Beginning with whoever spoke loudest is precisely the wrong ordering, and an honest queue position calms users more than speed does.",
      },
      {
        problem: "Struggling for an hour instead of escalating",
        fix: "Set the no-progress period in advance so pride cannot extend it. Escalating early with good notes is professional; escalating late is how small problems become incidents.",
      },
      {
        problem: "Escalating without a written handover",
        fix: "Pass the symptom, what you checked, what you ruled out, what you changed and your hypothesis. Otherwise you are transferring your confusion rather than the problem.",
      },
      {
        problem: "Abandoning the user at the handover",
        fix: "Tell them who has it, what happens next and when you will update them. Losing a user's trust at the escalation point undoes everything you did well before it.",
      },
      {
        problem: "Claiming completeness you do not have",
        fix: "Present the playbook with its gaps named. It reads as maturity, it is more credible, and it is far better received than an overstated claim an interviewer can puncture with one question.",
      },
    ],
    expertNotes: [
      "Escalate early and escalate with notes. The fear that escalation looks like failure is exactly backwards: a colleague with your findings resolves in minutes what you would take a day over, and the written handover is the same ticket discipline you have practised all course, applied at the moment it matters most.",
      "Narrate your stage on every call. It keeps your own reasoning honest, converts an anxious wait into an informed one, and signals to a manager that something controlled is happening. Fifteen seconds of speech, and it changes how the entire interaction is judged.",
      "Set your no-progress escalation period in advance, in writing. Deciding it in the moment means deciding it while tired, watched and reluctant to admit difficulty — which is precisely when pride extends it by another hour.",
      "Name your gaps honestly as you enter the job market. You have method, communication skill and documentation discipline; you do not have years of pattern recognition. Saying so reads as maturity, and the promise that you will diagnose systematically and leave everything documented is genuinely most of what an employer is hiring for.",
    ],
    vocabulary: [
      {
        term: "Escalation",
        meaning:
          "Passing a problem to someone with more access, authority or specialist knowledge. Used early with good notes it is the fastest route to resolution, not an admission of failure.",
      },
      {
        term: "Escalation rule",
        meaning:
          "A written condition triggering hand-off: beyond your access, business-critical with time running out, no progress within a defined period, or outside your knowledge.",
      },
      {
        term: "Written handover",
        meaning:
          "The symptom, checks performed, findings ruled out, changes made and current hypothesis, passed with an escalation. Without it you transfer confusion rather than the problem.",
      },
      {
        term: "Stage narration",
        meaning:
          "Stating the diagnostic stage you are in and roughly how long it will take. Keeps reasoning honest, informs the user, and signals controlled progress to a manager.",
      },
      {
        term: "Queue discipline",
        meaning:
          "Triaging everything before starting anything, then working in priority order and telling each user where they sit. Arrival order and volume are both wrong orderings.",
      },
      {
        term: "No-progress period",
        meaning:
          "A time limit set in advance after which you escalate rather than continue. Deciding it beforehand prevents pride from extending it under pressure.",
      },
      {
        term: "Support playbook",
        meaning:
          "The operational document covering common faults with diagnostic order, fixes and escalation rules, plus bands, ticket standard, verification and asset records.",
      },
      {
        term: "Diagnostic order",
        meaning:
          "A stated sequence of checks for a fault, including what to rule out. A list of possible causes is not a procedure; an ordered set of checks is.",
      },
    ],
    homework: [
      {
        task: "Complete the live simulation",
        detail:
          "At least eight calls in ninety minutes with method assessed alongside outcome: every call logged before investigation, triage between simultaneous problems, stage narration throughout, and honest self-review naming any skipped stages.",
      },
      {
        task: "Write your escalation rules",
        detail:
          "The conditions that trigger hand-off, the no-progress period you will hold yourself to, what a complete written handover contains, and how you will keep the user informed after escalating.",
      },
      {
        task: "Deliver the complete support playbook",
        detail:
          "Ten faults with symptoms in user language, stated diagnostic order, negative findings, specific fixes and escalation rules; plus priority bands, service levels, ticket standard, identity verification, remote procedure, asset register and maintenance routine.",
      },
      {
        task: "Present the playbook to a non-technical audience",
        detail:
          "Ten minutes covering what it is, how it is structured, what it lets a new person do, and where its gaps are. Practise being precise about the boundary of your own knowledge — it is the most credible thing you can do in an interview.",
      },
    ],
    rubric: [
      {
        criterion: "Method under pressure",
        passing: "Most calls were resolved.",
        excellent:
          "Reproduction and isolation maintained throughout, one change at a time, every call logged before investigation, and skipped stages identified honestly in self-review.",
      },
      {
        criterion: "Triage and prioritisation",
        passing: "Calls were handled in a reasonable order.",
        excellent:
          "Triage performed before starting work, priority applied by impact against urgency including to a senior person's low-impact request, and each user told where they sit in the queue.",
      },
      {
        criterion: "Escalation judgement",
        passing: "Escalated when clearly necessary.",
        excellent:
          "Escalated at the defined point without delay, with a complete written handover, and the user kept informed afterwards about who has it and when they will be updated.",
      },
      {
        criterion: "Communication",
        passing: "Was polite and clear.",
        excellent:
          "Stage narration on every call, no jargon, identity verification held under social pressure, and an honest end-of-session account including anything unfinished.",
      },
      {
        criterion: "Playbook deliverable",
        passing: "A set of fixes was documented.",
        excellent:
          "Ten faults with stated diagnostic order, negative findings and explicit escalation rules, plus all operational sections — to the standard that another person could run the helpdesk from it.",
      },
    ],
    faqs: [
      {
        q: "Does escalating make me look incompetent?",
        a: "The opposite. Escalating early with good notes is how experienced people work, because a colleague with your findings resolves in minutes what you would take a day over. Escalating late, or not at all, is what turns small problems into incidents.",
      },
      {
        q: "What if I get a fault in the assessment that I cannot solve?",
        a: "State what you have eliminated and what you are examining next, then escalate with a full handover. A partial diagnosis that genuinely narrows the problem is more useful — and better assessed — than a rushed guess that happens to work.",
      },
      {
        q: "How do I handle three problems arriving at once?",
        a: "Triage before touching any of them. Assign priority by impact, tell each person where they sit and roughly when you will reach them, then work in order. An honest queue position is calming; an unexplained wait is not.",
      },
      {
        q: "What is actually worth showing an employer from this course?",
        a: "The playbook. Most entry-level candidates can describe troubleshooting; almost none can show a structured approach, a documentation standard and a completed operational document. It converts a claim into evidence.",
      },
      {
        q: "What should I learn next?",
        a: "Computer Networking deepens the infrastructure side, and Cybersecurity builds directly on the identity verification, access control and update discipline you have practised here. Support is the entry point to IT because it touches every layer at once.",
      },
    ],
  },
};
