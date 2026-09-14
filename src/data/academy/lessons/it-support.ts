/**
 * IT Support — sessions 1 to 3 (full class lectures).
 * Merged by withCoursePrefix() in ../index.ts.
 */

import type { SessionLecture } from "@/data/academy/types";

export const itSupportLessonsA: Record<string, SessionLecture> = {
  "how-support-works": {
    summary:
      "What an IT support function actually is: how work arrives, how it gets triaged and prioritised, what a ticket is for, what service levels really mean — and what separates support people who get trusted from those who get worked around.",
    objectives: [
      "Explain what a helpdesk does and why it exists as a function rather than a favour",
      "Triage incoming problems and assign priority using a defensible method",
      "Write tickets that are useful to the next person, not just to you",
      "Understand service levels and what they genuinely commit you to",
      "Describe what good support looks like from the user's side of the desk",
    ],
    blocks: [
      {
        heading: "The job you are preparing for, and the company we will work with",
        body: [
          "This course runs around one engagement, because support is learned by doing it rather than by describing it. The scenario is real and common: **a freight-forwarding company in Apapa with forty-five staff across two offices**, Windows machines of mixed ages, a couple of servers in a cupboard, four network printers, a business-critical customs software package that nobody fully understands, and — critically — **no IT documentation of any kind**. Until now, problems have been handled by whoever was nearest and knew most.",
          "You have just been hired as the company's **first dedicated support person**. That is the most common entry point into this career in Nigeria, and it is harder than joining an established helpdesk, because there is no queue to join, no playbook to follow, and no colleague to ask. Everything you build in this course — the triage method, the ticket habit, the playbook — is what makes that position survivable.",
          "The deliverable is **a support playbook covering the ten most common faults**, with diagnostic steps, fixes and escalation rules. That document is not coursework; it is the artefact a real helpdesk runs on, and it is the thing you can show an employer that proves you understand the job rather than merely wanting it.",
        ],
      },
      {
        heading: "Why support exists as a function, and what happens without one",
        body: [
          "Before there is a support function, there is an **unofficial IT person** — somebody who happened to be good with computers and gradually acquired everyone else's problems on top of their actual job. Every Nigerian office has one. It looks like a favour and it is actually an unmanaged risk: the person has no time allocated, no record of what they changed, and no authority to say no.",
          "The consequences are predictable and worth understanding, because you will see them on day one. **Nobody knows what was changed**, so faults recur and nobody can trace them. **Work is invisible**, so it is never prioritised — the person doing it is judged on their real job while carrying an unmeasured second one. And **the knowledge lives in one head**, so when that person leaves, everything they knew leaves with them. That last point is why your playbook matters commercially, not just academically.",
          "A support function exists to change all three. Work arrives through **one channel**, gets **recorded**, gets **prioritised against business impact**, and gets **documented so the next person can repeat it**. That is the entire purpose: not to fix computers, but to make fixing computers predictable, visible and independent of any individual. Hold that framing, because it explains every process decision in this session.",
        ],
      },
      {
        heading: "How work arrives, and why one channel matters more than any tool",
        body: [
          "In an organisation without support, problems arrive by **WhatsApp, a shout across the room, a phone call, and somebody walking to your desk** — simultaneously, with no order and no record. The single most valuable change you can make in your first month is not a tool; it is establishing that **requests come through one place**. Everything else follows from that.",
          "This is harder than it sounds, because the informal channels are more convenient for the user and you will be under pressure to keep accepting them. The professional answer is not to refuse people but to **redirect consistently and kindly**: acknowledge the problem, then say you are logging it so it is not lost and so it can be prioritised fairly. Within a few weeks the habit forms. **The channel is not bureaucracy; it is what makes your work visible and your promises keepable.**",
          "The practical minimum is small. You do not need expensive software — a shared mailbox, a simple ticketing system, or even a structured spreadsheet will do at this scale. What you need is that every request has a **record**: who reported it, what the problem is, when it arrived, what was done, and when it was resolved. That record is what turns support from a series of favours into a function that can be measured, staffed and improved.",
        ],
      },
      {
        heading: "Triage and priority: impact against urgency, decided in the first two minutes",
        body: [
          "**Triage** is the quick assessment that decides what order things get handled in, and it is the highest-leverage skill in this session. The method that works is two questions, not one. **What is the impact** — how many people are affected, and how badly? **How urgent is it** — is work stopped now, or merely inconvenient? A problem affecting one person completely is different from a problem mildly annoying forty people, and neither is automatically the higher priority.",
          "That gives four practical bands. **Critical**: business-stopping for many people — the network is down, the customs software will not open, the server is unreachable. **High**: one person cannot work at all, or a system is degraded for many. **Medium**: work is possible but impaired — a printer is down and another is available. **Low**: cosmetic, a request, or something that can wait. Note that **a senior manager's personal inconvenience is not automatically critical**; priority follows business impact, and the moment you let rank set priority you lose the ability to defend any other decision you make.",
          "Then the part beginners consistently get wrong: **the loudest request is not the most important one.** Somebody who walks to your desk and stands there has expressed urgency, not impact. Meanwhile a silently failing backup is affecting nobody today and will affect everybody next month. **Triage on impact, respond on urgency, and record both** — that combination is what makes your queue defensible when somebody asks why their problem was not first.",
        ],
      },
      {
        heading: "Tickets: what they are actually for, and what makes one useful",
        body: [
          "A ticket is not paperwork. It is the **memory of the support function** — the record that lets somebody other than you pick up a problem, that lets you spot a recurring fault, and that lets you prove what you did. A support person who keeps no tickets is personally effective and organisationally invisible, and when they leave, everything they knew leaves too.",
          "A useful ticket has a predictable shape. **Who** reported it and how to reach them. **What** the problem is, in the user's own words first — their description is evidence, even when it is wrong, because 'the internet keeps cutting' and 'the printer says offline' point in different directions. **When** it started and whether anything changed. **What you found**, including the things you ruled out, because negative results are information. **What you changed**, specifically. And **how it was confirmed fixed**, ideally by the user rather than by you.",
          "The habit that most distinguishes professionals is recording **what did not work**. Beginners write what they did; experienced people write what they tried and eliminated. That difference is worth hours to the next person, because it prevents them repeating your dead ends. **Write the ticket as though the next reader is you in six months with no memory of the job** — because frequently it is.",
        ],
      },
      {
        heading: "Service levels, and what good support actually looks like to a user",
        body: [
          "A **service level** is a commitment about response and resolution time, usually expressed per priority band — for example, critical problems responded to within fifteen minutes, high within two hours, medium within one working day. Two things matter about them. First, **response is not resolution**: responding means somebody has acknowledged and started, not that it is fixed, and confusing the two produces broken promises. Second, **a service level you cannot meet is worse than none**, because it converts an honest delay into a failure against a stated commitment.",
          "Set them from your actual capacity, then measure against them. At this company, with one support person and forty-five staff, realistic figures might be fifteen minutes for critical, four hours for high, one working day for medium and three days for low. Publish them, and — this is the part that builds trust — **tell people when you are going to miss one**, before you miss it. A user who is told at 10am that their problem will be tomorrow is annoyed; a user told at 5pm that it will be tomorrow is angry.",
          "Then what good support looks like from the other side of the desk, because it is not primarily technical. Users remember whether you **listened before typing**, whether you **explained what you were doing**, whether you **came back when you said you would**, and whether you treated the problem as real even when the cause was trivial. **Technical skill gets the fault fixed; these behaviours get you trusted**, and trusted support people are given the information that makes the next diagnosis faster. That loop is the actual job.",
        ],
      },
    ],
    demonstration: {
      intro:
        "We stand up the support function for the freight company from nothing: one intake channel, a triage method, a ticket format, published service levels — and we work a live morning queue against it.",
      steps: [
        {
          step: "Survey what support currently looks like",
          detail:
            "Ask five staff members how they currently get help. You will hear WhatsApp, shouting, and the name of whoever used to fix things. Record it verbatim — this is the baseline you are replacing, and it is evidence for why the change matters.",
        },
        {
          step: "Count the machines and users before setting any targets",
          detail:
            "Forty-five staff, two offices, and a rough machine count. You cannot set realistic service levels without knowing the population you serve, and setting them from a guess is how support people burn out in month two.",
        },
        {
          step: "Choose one intake channel and set it up",
          detail:
            "A shared email address is the lowest-friction starting point in a Nigerian office, because everyone already has email and it creates a record automatically. Whatever you choose, it must produce a written record with a timestamp.",
        },
        {
          step: "Announce it without making it feel like a barrier",
          detail:
            "Send one short message: here is where to send problems, here is what happens next, here is roughly how long each priority takes. Frame it as 'so nothing gets lost', never as 'stop messaging me personally'. The framing determines whether people comply.",
        },
        {
          step: "Define the four priority bands in writing",
          detail:
            "Critical, high, medium, low — each with a plain-language definition and two examples from this company. Examples matter more than definitions, because 'business-stopping' means different things to different people until you show them.",
        },
        {
          step: "Set service levels from real capacity, not ambition",
          detail:
            "Fifteen minutes to respond on critical, four hours on high, one working day on medium, three days on low. Write them down. A level you cannot meet converts an honest delay into a broken promise.",
        },
        {
          step: "Distinguish response from resolution explicitly",
          detail:
            "State it in the published levels: response means acknowledged and started; resolution means fixed and confirmed. Confusing the two is the most common way support people over-promise on day one.",
        },
        {
          step: "Build the ticket format",
          detail:
            "Six fields: who and how to reach them; what the problem is in the user's words; when it started and what changed; what you found including what you ruled out; what you changed; how it was confirmed fixed. Keep it short enough that you will actually fill it in.",
        },
        {
          step: "Work the first incoming request end to end",
          detail:
            "A user reports the customs software will not open. Log it before investigating — this is the discipline, and skipping it 'just this once' is how the habit never forms.",
        },
        {
          step: "Triage it out loud against the bands",
          detail:
            "One person, cannot work at all, business-critical software: **high**, not critical, because the company is still operating. Say the reasoning out loud. Priority decisions you cannot explain are decisions you cannot defend later.",
        },
        {
          step: "Record the user's own words before your interpretation",
          detail:
            "Write 'it just closes when I click Open' rather than 'application crashes'. Their phrasing is evidence — 'closes' and 'freezes' and 'shows an error' point at different causes, and your paraphrase destroys that distinction.",
        },
        {
          step: "Note what you ruled out, not only what you did",
          detail:
            "Checked disk space, fine. Checked the licence, valid. Tried a second user account, works. Each eliminated possibility is information the next person will otherwise waste time rediscovering.",
        },
        {
          step: "Record the actual change you made",
          detail:
            "Not 'fixed it' — write the specific change: rebuilt the user's software profile, or reinstalled the print driver, or whatever it was. Vague notes are worthless to anyone else and to future you.",
        },
        {
          step: "Confirm with the user and record their confirmation",
          detail:
            "Ask them to do the thing that failed, in front of you or on a call. A fix you have not had the user verify is a fix you are assuming, and roughly one in five will come back.",
        },
        {
          step: "Work a second, competing request and prioritise between them",
          detail:
            "A manager reports their own laptop is slow while the customs software fault is open. Explain, without offence, why the manager's laptop is medium and the shared software is high. **This conversation is the job**, and practising it here is the point.",
        },
        {
          step: "Handle a request that arrives by WhatsApp anyway",
          detail:
            "Somebody messages you directly. Respond helpfully, then log it in the channel and tell them you have done so. Redirecting consistently and kindly for a few weeks is what establishes the habit — refusing people establishes nothing except resentment.",
        },
        {
          step: "Close the day by reviewing the queue",
          detail:
            "Look at what came in, what was resolved, what is open, and whether any service level was missed. If one will be missed, notify the affected user **before** it is missed. That single habit does more for your reputation than any amount of technical skill.",
        },
        {
          step: "Start the playbook document",
          detail:
            "Open the file that will become the deliverable. Add the first fault you resolved today, with its symptoms, diagnostic steps, fix and escalation rule. Ten faults over three weeks is the target, and you build it from real tickets rather than from imagination.",
        },
      ],
    },
    practice: {
      title: "Stand up a support function and run one real day against it",
      brief:
        "For a real organisation — your workplace, a family business, or the lab — establish one intake channel, a triage method, a ticket format and published service levels, then work a day's requests through them.",
      steps: [
        "Ask five people how they currently get technical help and record their answers verbatim as your baseline.",
        "Count the users and devices you would be supporting, and note which systems are business-critical.",
        "Choose one intake channel that automatically produces a timestamped written record.",
        "Announce it framed as 'so nothing gets lost', not as a restriction on contacting you.",
        "Write four priority bands with plain-language definitions and two real examples each.",
        "Set response and resolution service levels derived from your actual capacity, not from ambition.",
        "State explicitly that response is not resolution in the published levels.",
        "Build a six-field ticket format short enough that you will genuinely use it.",
        "Log at least three real requests before investigating any of them.",
        "Triage each out loud against the bands and write the reasoning in the ticket.",
        "Record each user's own words before your own interpretation of the problem.",
        "Record what you ruled out, not only what you did.",
        "Record the specific change you made, never just 'fixed'.",
        "Confirm each fix with the user and note their confirmation in the ticket.",
        "Handle at least one request that bypasses your channel, redirecting it kindly.",
        "Review the queue at day end and notify anyone whose service level you will miss, before you miss it.",
        "Add every fault you resolved to the playbook document with symptoms, steps, fix and escalation rule.",
      ],
      standard:
        "A baseline record of how support currently happens; one intake channel established and announced without framing it as a barrier; four priority bands with real examples; service levels set from real capacity with response distinguished from resolution; a six-field ticket format; at least three requests logged before investigation, each triaged with written reasoning, the user's own words preserved, ruled-out findings recorded, the specific change documented, and user confirmation noted; one bypassing request redirected kindly; a day-end queue review with proactive notification of any missed level; and the playbook started from real tickets.",
    },
    pitfalls: [
      {
        problem: "Accepting requests through every channel simultaneously",
        fix: "Establish one intake channel and redirect consistently and kindly. Without it your work has no record, no order, and no visibility — and none of it can be measured or handed over.",
      },
      {
        problem: "Letting seniority set priority",
        fix: "Priority follows business impact. The moment rank decides the queue, you cannot defend any other prioritisation you make, and the function stops being fair.",
      },
      {
        problem: "Treating the loudest request as the most important",
        fix: "Somebody standing at your desk has expressed urgency, not impact. A silently failing backup affects nobody today and everybody next month. Triage on impact, respond on urgency.",
      },
      {
        problem: "Promising resolution times you cannot meet",
        fix: "Set service levels from actual capacity and publish the distinction between response and resolution. An honest delay communicated early is survivable; a broken commitment is not.",
      },
      {
        problem: "Investigating before logging",
        fix: "Log first, every time, including the urgent ones. Skipping it 'just this once' is how the record never exists, and the record is the entire function.",
      },
      {
        problem: "Writing tickets that only record what you did",
        fix: "Record what you ruled out as well. Negative results save the next person hours, and vague notes like 'fixed it' are worthless to anyone else and to future you.",
      },
      {
        problem: "Paraphrasing the user's description",
        fix: "Preserve their words. 'It closes' and 'it freezes' and 'it shows an error' point at different causes, and your interpretation destroys evidence before you have used it.",
      },
      {
        problem: "Declaring a fix without user confirmation",
        fix: "Have the user perform the action that failed, and record their confirmation. Roughly one in five unconfirmed fixes comes back, and it comes back with less goodwill.",
      },
    ],
    expertNotes: [
      "The intake channel is the single highest-leverage change you can make, and it costs nothing. Everything else — prioritisation, service levels, measurement, handover — depends on there being one record of what arrived. Establish it in your first month and the rest becomes possible.",
      "Record what did not work. This one habit separates experienced support people from beginners more reliably than any technical skill, because it prevents the next person repeating your dead ends and it makes recurring faults visible across tickets.",
      "Priority must follow business impact rather than rank, and you must be able to explain each decision out loud. The first time you defer a manager's laptop in favour of a shared system is uncomfortable; being able to state the reasoning calmly is what earns you the right to make the next one.",
      "Proactive communication about a missed deadline is worth more than technical brilliance. Telling a user at 10am that their problem will be resolved tomorrow is a minor annoyance; telling them at 5pm is a breach of trust. Same outcome, completely different relationship.",
    ],
    vocabulary: [
      {
        term: "Helpdesk",
        meaning:
          "The single point of contact for technical problems. Its purpose is to make support predictable, visible and independent of any individual.",
      },
      {
        term: "Triage",
        meaning:
          "The quick assessment that decides handling order, based on impact — how many people and how badly — against urgency, which is whether work is stopped now.",
      },
      {
        term: "Impact versus urgency",
        meaning:
          "Impact is the scale of the effect; urgency is how quickly it must be addressed. A problem can be high in one and low in the other, and both must be assessed.",
      },
      {
        term: "Ticket",
        meaning:
          "The written record of a request: who, what, when, what was found, what was changed, and how it was confirmed. The memory of the support function.",
      },
      {
        term: "Service level",
        meaning:
          "A published commitment about response and resolution time per priority band. A level you cannot meet is worse than having none.",
      },
      {
        term: "Response versus resolution",
        meaning:
          "Response means acknowledged and started; resolution means fixed and confirmed. Confusing them is the most common way support people over-promise.",
      },
      {
        term: "Intake channel",
        meaning:
          "The one agreed route through which requests arrive. Without it there is no record, no fair ordering, and no way to measure or hand over the work.",
      },
      {
        term: "Support playbook",
        meaning:
          "A written reference covering common faults with diagnostic steps, fixes and escalation rules, so support does not depend on one person's memory.",
      },
    ],
    homework: [
      {
        task: "Establish one intake channel for a real organisation",
        detail:
          "Set it up, announce it framed as protection against losing requests rather than as a restriction, and record the baseline of how support happened before. Note any resistance you met and how you handled it.",
      },
      {
        task: "Write your priority bands and service levels",
        detail:
          "Four bands with plain-language definitions and two real examples each, plus response and resolution targets derived from your actual capacity. Include the explicit statement that response is not resolution.",
      },
      {
        task: "Log three real tickets properly",
        detail:
          "Each with the user's own words preserved, triage reasoning written, ruled-out findings recorded, the specific change documented, and user confirmation noted. These become your first three playbook entries.",
      },
      {
        task: "Describe good support from the user's side",
        detail:
          "Half a page on what a user actually remembers about a support interaction, and which of those things are technical. Written for somebody about to start their first support job.",
      },
    ],
    rubric: [
      {
        criterion: "Understanding of the function",
        passing: "Can explain what a helpdesk does.",
        excellent:
          "Explains why support exists as a function rather than a favour, and can name the specific risks of the unofficial-IT-person model.",
      },
      {
        criterion: "Triage quality",
        passing: "Can assign a priority.",
        excellent:
          "Assesses impact against urgency separately, resists rank and volume as priority drivers, and can defend every decision out loud with reference to the published bands.",
      },
      {
        criterion: "Ticket discipline",
        passing: "Tickets were written.",
        excellent:
          "User's own words preserved, ruled-out findings recorded, specific changes documented rather than 'fixed', and user confirmation captured in every ticket.",
      },
      {
        criterion: "Service level realism",
        passing: "Targets were set.",
        excellent:
          "Derived from actual capacity, response distinguished from resolution, and proactive notification given before any level is missed.",
      },
      {
        criterion: "Professional judgement",
        passing: "Requests were handled politely.",
        excellent:
          "Bypassing requests redirected kindly rather than refused, the loudest request resisted when impact was lower, and trust-building behaviour treated as part of the technical work.",
      },
    ],
    faqs: [
      {
        q: "Do I need expensive ticketing software to start?",
        a: "No. At forty-five users a shared mailbox or a structured spreadsheet is enough, because what matters is that a timestamped written record exists. Move to a proper system when volume makes the spreadsheet hard to search.",
      },
      {
        q: "People keep messaging me on WhatsApp. Should I refuse them?",
        a: "Refusing builds resentment and teaches nothing. Respond helpfully, log it in the channel, and tell them you have done so. Consistent kind redirection for a few weeks establishes the habit; a hard refusal does not.",
      },
      {
        q: "A senior manager's problem is not critical. How do I say that?",
        a: "State the published band and the reasoning calmly: the shared system affects everyone's ability to clear customs, so it is high, and their laptop is medium. Defensible rules protect you — improvising under pressure does not.",
      },
      {
        q: "What if I miss a service level?",
        a: "Tell the user before it is missed, not after. Explain what is holding it up and give a revised time. An honest early update is a minor annoyance; discovering it at the end of the day is a breach of trust.",
      },
      {
        q: "Is support a real career or a dead end?",
        a: "It is the standard entry point into IT, and the people who progress are the ones who document. A support playbook, clean tickets and a habit of recording what you ruled out are exactly the evidence that gets you moved onto infrastructure, security or systems work.",
      },
    ],
  },

  "structured-troubleshooting": {
    summary:
      "The method that makes diagnosis repeatable: reproducing the problem, isolating the cause by elimination, testing the fix properly, and confirming with the user — applied to the faults you will actually meet.",
    objectives: [
      "Reproduce a problem reliably before attempting to fix it",
      "Isolate causes by systematic elimination rather than by trying likely fixes",
      "Distinguish a fix from a workaround, and know when each is appropriate",
      "Test a fix in a way that proves it rather than assumes it",
      "Confirm with the user and close the loop so faults do not return",
    ],
    blocks: [
      {
        heading: "Why method beats experience, at least at first",
        body: [
          "Experienced support people often diagnose quickly by intuition, and it is tempting to imitate that. It is also a trap, because their intuition is compressed experience you do not have yet, and imitating the speed without the knowledge produces confident guessing. **Method is what you use until you have earned the intuition**, and it remains useful afterwards for anything unfamiliar.",
          "The method has five stages and we will work through them all: **reproduce, isolate, fix, test, confirm.** Each exists because skipping it has a specific cost. Skipping reproduction means you fix something you cannot verify. Skipping isolation means you change several things and never learn which mattered. Skipping testing means you hand back a machine that appears fixed. Skipping confirmation means the fault returns next week and takes your credibility with it.",
          "There is also a psychological benefit worth naming. Under pressure — a user watching, a manager asking how long — a method keeps you moving purposefully instead of flailing. **Narrating the stage you are in is both a diagnostic discipline and a communication tool**, because it tells the user something controlled is happening even when the answer is not yet known.",
        ],
      },
      {
        heading: "Reproducing the problem: the stage everyone rushes and nobody should",
        body: [
          "You cannot fix what you cannot make happen, and a fault you cannot reproduce is a fault you cannot verify. Reproduction means making the problem occur **on demand, in front of you, with the same symptoms the user described**. It sounds trivial and it is where most misdiagnosis begins, because the user's description and the actual behaviour frequently differ.",
          "The questions that produce reproduction are specific. **What exactly were you doing?** Not 'using the computer' — which file, which application, which button. **Does it happen every time or sometimes?** **Does it happen for other people?** **Has anything changed recently — an update, a new program, a move to a different desk?** That last question catches a remarkable share of faults, because 'it worked yesterday' almost always has a cause and the cause is usually a change.",
          "Two situations need particular care. An **intermittent** fault cannot be reproduced on demand, so you shift to measurement and monitoring rather than repetition — check logs, watch resource usage, and gather evidence over time. And a fault that **only happens for the user** and not for you points at something user-specific: their profile, their permissions, their machine, or their technique. **When it works for you and fails for them, the difference between you is the diagnosis** — that single idea resolves a large fraction of support calls.",
        ],
      },
      {
        heading: "Isolating the cause: elimination, not inspiration",
        body: [
          "Isolation is the heart of troubleshooting and it works by **removing possibilities**, not by guessing solutions. The most useful framing is the one from networking: **which layer is failing?** Hardware, operating system, application, user profile, network, or permissions. Naming the layer narrows everything that follows and stops you trying application fixes for a hardware fault.",
          "The three tests that do most of the isolating are worth memorising. **Another user on the same machine** — if it works for them, the fault is user-specific: profile, permissions, or their data. **The same user on another machine** — if it works there, the fault is machine-specific: hardware, drivers, or local configuration. **The same action on another application** — if printing fails from one program but works from another, the fault is in that program, not the printer. Three tests, and between them they locate most faults.",
          "Then the discipline that makes isolation real: **change one thing at a time.** Every change is a variable, and two simultaneous changes mean you cannot attribute the result. It feels slow and it is faster, because a fix you understand can be repeated, documented and taught, while a fix that happened to work after four changes cannot. When you must test several hypotheses, test them **sequentially and record each result** — including the failures, which is what turns a diagnosis into a playbook entry.",
        ],
      },
      {
        heading: "Fixing: the difference between a fix and a workaround, and why it matters",
        body: [
          "A **fix** removes the cause. A **workaround** avoids the symptom while the cause remains. Both are legitimate, and knowing which you have applied is what makes you trustworthy. Restarting a machine that freezes every afternoon is a workaround; finding the failing disk or the memory leak is the fix. Neither is wrong, but recording a workaround as a fix guarantees the call comes back.",
          "Sometimes a workaround is the **correct** professional choice, and you should be able to argue for it. If a user has a deadline in an hour and the root cause needs an hour to diagnose, restore their ability to work first, log the underlying fault as an open ticket, and return to it. **Business continuity can legitimately outrank root-cause analysis** — provided you say so explicitly and the underlying issue stays on the list rather than being quietly forgotten.",
          "Two related habits. **Do not apply a fix you cannot explain** — if you are not sure why it worked, say so and keep the ticket open, because an unexplained fix will recur in a form you do not recognise. And **check whether the same fault exists elsewhere**: if one machine has a failing disk from a bad batch, or one user's profile is corrupt from a bad update, the pattern is usually not unique. That check is what turns reactive support into something closer to prevention.",
        ],
      },
      {
        heading: "Testing and confirming: proving it, and closing the loop",
        body: [
          "Testing is not 'it seems fine now'. It is **performing the exact action that failed, under the same conditions, and observing the result**. If printing failed from a specific document, print that document. If the application crashed when opening a particular file, open that file. Testing something adjacent proves nothing, and this is where support people most often deceive themselves honestly.",
          "Then confirm with the **user**, not with yourself. You have context they do not — you know what you changed and you may unconsciously avoid the path that fails. Have them perform the action, ideally while you watch, and ask the question that catches the residual problem: **is it doing anything else that is not right?** A surprising number of 'fixed' tickets come back because a second symptom was present all along and nobody asked.",
          "Finally, close the loop properly. Record the cause, the fix, and whether it was a fix or a workaround. Tell the user what happened in one sentence they can understand — not because they need the technical detail, but because **an explained fix builds the trust that gets you better information next time**. And check whether the same fault needs recording in the playbook, because a fault you solved once and documented is a fault that takes five minutes next time instead of fifty.",
        ],
      },
    ],
    demonstration: {
      intro:
        "We work four real faults through all five stages — reproduction, isolation, fix, test, confirm — including one intermittent fault and one that only affects a single user.",
      steps: [
        {
          step: "Take the first fault: the customs software closes on opening",
          detail:
            "Log it before touching anything. Record the user's exact words — 'it just closes when I click Open' — because 'closes', 'freezes' and 'shows an error' point at different causes and paraphrasing destroys that evidence.",
        },
        {
          step: "Stage one: reproduce it",
          detail:
            "Sit at the machine and do exactly what the user did. Confirm the same symptom occurs. If it does not reproduce, stop and go back to the questions — do not start changing things on a machine that currently works.",
        },
        {
          step: "Ask what changed recently",
          detail:
            "An update, a new program, a moved cable, a changed password. 'It worked yesterday' almost always has a cause, and the cause is usually a change. This one question resolves a large share of faults before any testing.",
        },
        {
          step: "Stage two: isolate by layer — name it out loud",
          detail:
            "Hardware, operating system, application, profile, network, or permissions? Say which you suspect and why. Naming the layer makes the next test purposeful instead of exploratory.",
        },
        {
          step: "Run the three isolating tests",
          detail:
            "Another user on this machine. This user on another machine. The same action in another application. Between them these locate most faults, and they take minutes rather than hours.",
        },
        {
          step: "Interpret the results rather than reacting to them",
          detail:
            "If it works for another user, the fault is user-specific — profile, permissions or their data. If it works on another machine, it is machine-specific. State the conclusion before changing anything, so the change is a test of a hypothesis.",
        },
        {
          step: "Change one thing, and only one thing",
          detail:
            "Apply the single change your isolation points to. Resist bundling a second 'while I am here' change — it destroys your ability to attribute the result and it is the most common way diagnoses go wrong.",
        },
        {
          step: "Stage three and four: apply the fix and test the exact failing action",
          detail:
            "Open the customs software the way the user does, with their file. Testing something adjacent proves nothing. If the fault was opening a specific document, open that document.",
        },
        {
          step: "Stage five: confirm with the user",
          detail:
            "Have them perform the action while you watch. Then ask the question that catches residual problems: is it doing anything else that is not right? A second symptom present all along is why 'fixed' tickets come back.",
        },
        {
          step: "Record it as fix or workaround, explicitly",
          detail:
            "If you rebuilt a profile rather than finding the corruption's cause, that is a workaround and the ticket says so. Recording a workaround as a fix guarantees the call returns, usually at the worst moment.",
        },
        {
          step: "Take the second fault: printing fails from one application",
          detail:
            "Reproduce it, then apply the third isolating test — print from a different program. If it prints from Notepad but not from the customs software, the fault is in that program's print path, not the printer. This reframes the whole job.",
        },
        {
          step: "Take the third fault: an intermittent freeze",
          detail:
            "This one cannot be reproduced on demand, so the method adapts rather than stops. Shift to measurement: check the system event log for the freeze times, and look for a pattern in what was running.",
        },
        {
          step: "Gather evidence over time instead of guessing",
          detail:
            "Note the times, check resource usage, and look for a repeating trigger. Intermittent faults are almost always caused by something periodic — a scheduled task, a backup, a temperature threshold — so look for the cycle.",
        },
        {
          step: "Take the fourth fault: only one user is affected",
          detail:
            "Works for you, fails for them. Apply the principle directly: the difference between you is the diagnosis. Compare profile, permissions, mapped drives and installed software between the two accounts.",
        },
        {
          step: "Check whether the fault exists elsewhere",
          detail:
            "If one machine has a failing disk or one profile is corrupt from an update, ask whether others share the batch or the update. Reactive support becomes preventive when you check the pattern instead of only the instance.",
        },
        {
          step: "Review all four tickets against the five stages",
          detail:
            "For each, confirm you can point to where you reproduced, isolated, fixed, tested and confirmed. Any stage you skipped is where the fault is most likely to return, and naming it honestly is part of the discipline.",
        },
        {
          step: "Add all four to the playbook",
          detail:
            "Symptoms in the user's words, the isolating tests that identified the cause, the specific change made, how it was tested, and whether it was a fix or a workaround. That structure is what makes an entry reusable by someone else.",
        },
      ],
    },
    practice: {
      title: "Work four faults through all five stages",
      brief:
        "Take four real faults — including one intermittent and one affecting a single user — and work each through reproduction, isolation, fix, testing and user confirmation, recording every stage.",
      steps: [
        "Log each fault before investigating, preserving the user's exact description of the symptom.",
        "Ask what changed recently, and record the answer even if it seems irrelevant.",
        "Reproduce each fault on demand before changing anything; if it will not reproduce, say so and switch to measurement.",
        "Name the suspected layer out loud for each fault before running any test.",
        "Run the three isolating tests: another user on the same machine, same user on another machine, same action in another application.",
        "State your conclusion from the isolation results before applying any change.",
        "Change exactly one thing per attempt and record the result, including failures.",
        "Distinguish clearly in your notes between a fix and a workaround, and justify any deliberate workaround.",
        "Test the exact action that failed, under the same conditions, rather than something adjacent.",
        "Have the user perform the failing action and record their confirmation.",
        "Ask whether anything else is not quite right, and record the answer.",
        "For the intermittent fault, gather evidence over time and look for a periodic trigger.",
        "For the single-user fault, identify the specific difference between the working and failing accounts.",
        "Check whether the same fault exists on other machines or accounts.",
        "Add all four to your playbook with symptoms, isolating tests, specific change, test method, and fix-or-workaround status.",
      ],
      standard:
        "Four faults each worked through all five stages with every stage recorded; the user's own words preserved; the suspected layer named before testing; the three isolating tests applied and interpreted before any change; exactly one change per attempt; fix and workaround distinguished explicitly; the exact failing action retested under original conditions; user confirmation captured along with an answer to 'anything else not right'; the intermittent fault handled by measurement with a periodic trigger sought; the single-user fault resolved by identifying the account difference; a check for the same fault elsewhere; and all four added to the playbook.",
    },
    pitfalls: [
      {
        problem: "Changing things on a fault you have not reproduced",
        fix: "You cannot verify a fix for a problem you cannot make happen. Reproduce first; if it will not reproduce, gather evidence rather than experimenting on a working machine.",
      },
      {
        problem: "Paraphrasing the user's description of the symptom",
        fix: "Preserve their words. 'It closes', 'it freezes' and 'it shows an error' are different faults, and your interpretation destroys that evidence before you have used it.",
      },
      {
        problem: "Applying several changes at once",
        fix: "You lose the ability to say which mattered, and an unattributable fix cannot be documented or repeated. One change, one test, one record.",
      },
      {
        problem: "Recording a workaround as a fix",
        fix: "A restart that clears an afternoon freeze is a workaround. Label it as such and keep the underlying fault open, or the call returns at the worst possible moment.",
      },
      {
        problem: "Applying a fix you cannot explain",
        fix: "If you do not know why it worked, say so and keep the ticket open. An unexplained fix recurs in a form you will not recognise, and you will have no notes to work from.",
      },
      {
        problem: "Testing something adjacent to the failure",
        fix: "Perform the exact action that failed under the same conditions. Printing a different document proves nothing about the document that failed.",
      },
      {
        problem: "Confirming the fix yourself instead of with the user",
        fix: "You have context they do not and may unconsciously avoid the failing path. Have them do it while you watch, and ask whether anything else is wrong.",
      },
      {
        problem: "Fixing the instance without checking the pattern",
        fix: "If one disk is failing from a bad batch or one profile is corrupt from an update, others probably share it. Checking the pattern is what turns reactive support into prevention.",
      },
    ],
    expertNotes: [
      "When it works for you and fails for the user, the difference between you is the diagnosis. Compare profile, permissions, mapped drives and installed software. This single principle resolves a large fraction of support calls and it is the first thing experienced support people check.",
      "Ask what changed recently, every single time. 'It worked yesterday' almost always has a cause, and the cause is usually a change — an update, a new program, a moved cable, a changed password. One question, and it frequently ends the investigation before testing begins.",
      "A deliberate workaround can be the right professional decision. If a user has a deadline, restore their ability to work first and keep the root cause as an open ticket — provided you say so explicitly. Business continuity legitimately outranks root-cause analysis when you are honest about the trade.",
      "Write your tickets as though the next reader is you in six months with no memory of the job, because frequently it is. The faults that took you an hour today should take five minutes next time, and the only mechanism that makes that true is what you wrote down.",
    ],
    vocabulary: [
      {
        term: "Reproduction",
        meaning:
          "Making a fault occur on demand with the same symptoms the user described. Without it you cannot verify a fix, so it comes before any change.",
      },
      {
        term: "Isolation",
        meaning:
          "Narrowing a fault to a layer and a component by removing possibilities, rather than by trying likely fixes in order of preference.",
      },
      {
        term: "The three isolating tests",
        meaning:
          "Another user on the same machine, the same user on another machine, and the same action in another application. Between them they locate most faults.",
      },
      {
        term: "Intermittent fault",
        meaning:
          "A fault that cannot be reproduced on demand. Handled by measurement and log review rather than repetition, looking for a periodic trigger.",
      },
      {
        term: "Workaround",
        meaning:
          "A change that avoids the symptom while the cause remains. Legitimate when business continuity requires it, provided it is labelled and the underlying fault stays open.",
      },
      {
        term: "Root cause",
        meaning:
          "The underlying reason a fault occurs, as against the symptom it produces. Fixing symptoms without finding causes guarantees recurrence.",
      },
      {
        term: "User confirmation",
        meaning:
          "Having the user perform the failing action and confirm the result, plus asking whether anything else is wrong. Catches the residual second symptom.",
      },
      {
        term: "Single change discipline",
        meaning:
          "Applying one change per attempt and recording the result, so any improvement can be attributed to a known cause and therefore documented and repeated.",
      },
    ],
    homework: [
      {
        task: "Work four real faults through all five stages",
        detail:
          "Each with reproduction, isolation, fix, testing and user confirmation recorded separately. Include one intermittent fault handled by measurement and one single-user fault resolved by comparing accounts.",
      },
      {
        task: "Practise the three isolating tests",
        detail:
          "On any fault, run all three tests even when you think you already know the answer, and write down what each one told you. The value is in learning what the results mean before you are under pressure.",
      },
      {
        task: "Distinguish your fixes from your workarounds",
        detail:
          "Review your tickets and label each resolution as a fix or a workaround. For every workaround, open or confirm an underlying-fault ticket so nothing is quietly forgotten.",
      },
      {
        task: "Add four entries to your playbook",
        detail:
          "Each with symptoms in the user's words, the isolating tests used, the specific change, the test method, fix-or-workaround status, and the point at which it should be escalated.",
      },
    ],
    rubric: [
      {
        criterion: "Reproduction discipline",
        passing: "Confirmed the fault before fixing.",
        excellent:
          "Reproduced on demand with the user's exact words preserved, asked what changed recently, and switched to measurement when a fault would not reproduce.",
      },
      {
        criterion: "Isolation method",
        passing: "Found the cause eventually.",
        excellent:
          "Named the layer before testing, ran the three isolating tests, interpreted the results, and applied the three-user/machine/application comparisons correctly.",
      },
      {
        criterion: "Change discipline",
        passing: "The fault was fixed.",
        excellent:
          "One change per attempt, every result recorded including failures, and fix clearly distinguished from workaround with any deliberate workaround justified.",
      },
      {
        criterion: "Verification",
        passing: "It appeared to work afterwards.",
        excellent:
          "The exact failing action retested under original conditions, and the user performed it while asked whether anything else was wrong.",
      },
      {
        criterion: "Knowledge capture",
        passing: "Notes were written.",
        excellent:
          "Tickets written for a reader with no memory of the job, ruled-out findings included, pattern checked elsewhere, and all four faults added to the playbook.",
      },
    ],
    faqs: [
      {
        q: "What if I cannot reproduce the fault at all?",
        a: "Stop changing things and start measuring. Check the event log for the times it happened, look at resource usage, and hunt for a periodic trigger. A fault you cannot reproduce is diagnosed with evidence gathered over time, not by experiment.",
      },
      {
        q: "Is it acceptable to restart the machine first?",
        a: "As a diagnostic step, sometimes — it can tell you whether the fault is persistent. But it destroys the current state and the evidence in it, so look at logs first, and if the restart clears the symptom, label it a workaround and keep investigating.",
      },
      {
        q: "How do I handle a user who cannot describe the problem?",
        a: "Watch them do it rather than asking them to explain. Ask them to show you the exact clicks, and note where they hesitate. Most 'vague' reports become precise the moment you observe the actual behaviour.",
      },
      {
        q: "Why does it work when I do it and fail for the user?",
        a: "Because the difference between you is the diagnosis — profile, permissions, mapped drives, installed software, or technique. Compare the two accounts systematically; that comparison resolves a large share of support calls.",
      },
      {
        q: "When should I escalate instead of continuing?",
        a: "When you have isolated the layer and the fix is beyond your access or authority, when the fault affects a business-critical system and time is running out, or when you have made no progress after a defined period. Escalating with your findings recorded is professional; escalating with nothing written is not.",
      },
    ],
  },

  "user-support": {
    summary:
      "The human half of the job: talking to people who are frustrated and not technical, running remote support sessions that actually work, handling password and account resets safely, and staying professional when the problem is trivial and the emotion is not.",
    objectives: [
      "Communicate with non-technical users in a way that gathers better information",
      "Run an effective remote support session rather than a confusing one",
      "Handle password and account resets securely, including verifying who is asking",
      "Manage frustrated users without becoming defensive or dismissive",
      "Sustain patience and professionalism across a full support day",
    ],
    blocks: [
      {
        heading: "The technical fix is usually the easy part",
        body: [
          "Most people enter support because they are good with computers, and then discover that the hard part is the conversation. A fault that takes four minutes to fix can take forty minutes to diagnose because the description was imprecise — and the imprecision is not the user's fault, because they have no vocabulary for what they are seeing. **Getting usable information from someone who cannot describe the problem is a core technical skill**, and it is learned rather than innate.",
          "There is also an emotional dimension that beginners find surprising. By the time somebody contacts support, they have usually already lost work, missed a deadline, or been told to restart twice by a colleague. **They are not annoyed at you; they are annoyed at the situation, and you are the situation's representative.** Understanding that reframing changes how you respond, and it is the difference between an interaction that leaves the user calmer and one that leaves them calmer about you but angrier about everything else.",
          "The practical consequence is that support quality has two halves. Fixing the fault correctly is one. Making the user feel heard, informed and respected is the other, and it is what determines whether they call you early next time or wait until the problem is critical. **Users who trust you give you better information, and better information makes you faster** — so the soft skills are not separate from the technical work, they feed it.",
        ],
      },
      {
        heading: "Talking to non-technical users: watch, don't interrogate",
        body: [
          "The most effective technique is also the simplest: **ask them to show you rather than describe it.** 'Can you do the thing that fails, and I will watch' produces more diagnostic information in thirty seconds than ten well-chosen questions, because users routinely omit the step they consider obvious — which is usually the step that matters.",
          "Then the language discipline. Avoid jargon absolutely, and be aware that words you consider plain are not: **cache, driver, server, network, sync, permission** all mean nothing to most users, and worse, they often mean something else. Say 'the temporary files the program keeps' rather than 'the cache'. And never let a user feel foolish for not knowing — **the moment someone feels stupid they stop telling you things**, and you lose the information you need.",
          "Three phrases do a great deal of work. **'That is a common one'** — which is usually true and removes embarrassment. **'Can you show me what you see?'** — which replaces a vague description with evidence. And **'here is what I am going to do, and here is roughly how long it will take'** — which converts an anxious wait into an informed one. **Setting an expectation you then meet is worth more than a faster fix delivered in silence.**",
        ],
      },
      {
        heading: "Remote support: powerful, and easy to make worse than being there",
        body: [
          "Remote support tools let you control a machine across the network, which is enormously efficient — a fifteen-minute desk visit becomes a two-minute session. It also fails in a characteristic way: **you move the mouse and the user has no idea what is happening**, so they move it back, or click something, or panic and disconnect. The tool works; the interaction does not.",
          "The fix is procedural. **Announce every action before you take it**: 'I am going to open the Control Panel now.' **Ask them not to touch the mouse or keyboard** while you are working, and explain why. **Move slowly and deliberately**, because fast cursor movement across a screen the user is also watching is disorienting. And **hand back control explicitly** at the end rather than simply disconnecting, so the session has a clear boundary.",
          "Then the security discipline, which matters more than the etiquette. **Verify who you are connecting to before you accept a session** — remote access is exactly what an attacker wants, and a plausible phone call is a common way to obtain it. Confirm the person through a known channel, confirm they actually requested support, and **never accept an unsolicited remote session from someone who called you**. Also remember that a remote session gives you access to whatever is on that screen, including personal and business information: **look only where the fault requires, and say so.**",
        ],
      },
      {
        heading: "Password and account resets: the most common request and the most exploited",
        body: [
          "Password resets are a large share of support volume and they are also **the single most common way accounts are taken over**. The attack is simple and requires no technical skill: call the helpdesk, sound plausible, claim to be somebody, ask for a reset. Every organisation that has suffered this breach has the same story, and the failure was never technical — it was a support person being helpful without verifying.",
          "So verification is not optional and it must not be negotiable under pressure. Establish a **defined verification method** — a manager's confirmation, a callback to a known number from your records, an in-person request — and apply it identically to everyone, **including the managing director**. That last part is where it breaks down in practice, because refusing a senior person feels uncomfortable. The professional framing helps: you are not doubting them, you are following the rule that protects them, and you would apply it to yourself.",
          "Then the reset itself. **Set a temporary password that must be changed at first login**, never leave a permanent one you have chosen. **Do not send passwords by email or WhatsApp** — both are readable by others and persist in history; use a phone call or a one-time mechanism. **Record the reset in the ticket** including how identity was verified, because that record is your protection if the account is later misused. And if a request feels wrong — unusual urgency, unfamiliar details, pressure to skip the process — **escalate rather than comply.** Feeling uneasy is information.",
        ],
      },
      {
        heading: "Patience and professionalism across a whole day",
        body: [
          "Support is emotionally tiring in a way that pure technical work is not, because you absorb other people's frustration all day, often about problems you did not cause and cannot permanently prevent. The fifth person reporting the same printer fault is not testing you personally, but by the fifth time it feels that way. **Recognising that accumulation is the first step to managing it.**",
          "Three practical habits help. **Do not carry one user's frustration into the next interaction** — take the thirty seconds between tickets to reset, because the tone you bring is contagious in both directions. **Write the ticket while it is fresh** rather than at the end of the day, both because accuracy decays and because the act of writing imposes a useful pause. And **escalate when you are out of your depth rather than struggling in silence** — asking for help is a professional behaviour, and hiding a problem until it becomes critical is not.",
          "Finally, the boundary that sustains the role. You are responsible for **handling the problem well**, not for the fact that the problem exists. Old equipment fails, software has bugs, and networks have limits — none of which you caused and none of which you can wish away. Taking responsibility for your response while declining responsibility for the fault is what makes the job sustainable, and it is also what makes you honest with users about what can and cannot be fixed.",
        ],
      },
    ],
    demonstration: {
      intro:
        "We run real support interactions end to end: a vague report turned into a diagnosis, a remote session run properly, a password reset with verification, and a frustrated user handled without escalation of emotion.",
      steps: [
        {
          step: "Take a deliberately vague report",
          detail:
            "A user says 'the computer is not working'. Do not start guessing. Ask them to show you what happens, and record their exact words. This is the skill: turning a useless description into evidence without making the user feel tested.",
        },
        {
          step: "Use observation instead of interrogation",
          detail:
            "Watch them perform the action. Note the step they treat as obvious — it is usually the relevant one. You will typically find the actual fault within thirty seconds of watching, having spent five minutes failing to ask the right question.",
        },
        {
          step: "Remove jargon deliberately",
          detail:
            "Explain what you are doing without the words cache, driver, server, permission or sync. Say what the thing does instead. If the user cannot repeat your explanation back, your explanation was the problem.",
        },
        {
          step: "Set an expectation before you start work",
          detail:
            "'Here is what I am going to do, and it will take about ten minutes.' Then meet it. An informed wait is tolerable; an unexplained silence is not, even when the silence is shorter.",
        },
        {
          step: "Start a remote support session correctly",
          detail:
            "Verify who you are connecting to through a known channel and confirm they requested support **before** accepting the session. Remote access is exactly what an attacker wants, and a plausible voice is all the attack requires.",
        },
        {
          step: "Narrate every action during the session",
          detail:
            "'I am opening the printer settings now.' Move slowly and deliberately. A cursor flying across a screen the user is also watching is disorienting and makes them grab the mouse, which undoes your work.",
        },
        {
          step: "Ask them not to use the mouse, and explain why",
          detail:
            "Say it once, plainly, at the start. This single instruction prevents the majority of failed remote sessions, which fail because two people are controlling one cursor rather than because of any technical problem.",
        },
        {
          step: "Respect what is on the screen",
          detail:
            "A remote session exposes personal and business information. Look only where the fault requires, and say that you are doing so. This is a trust obligation, not a formality, and users notice whether you honour it.",
        },
        {
          step: "Hand back control explicitly before disconnecting",
          detail:
            "Confirm the fix with them in the session, release control, and say you are ending the connection. A session that simply terminates leaves the user unsure whether you are still in their machine.",
        },
        {
          step: "Take a password reset request by phone",
          detail:
            "Somebody calls claiming to be a staff member who cannot log in. **Do not reset anything yet.** The first task is identity verification, not the reset, and the order matters more than either step alone.",
        },
        {
          step: "Verify identity using the defined method",
          detail:
            "Callback to the number in your records, or confirmation from their manager — whatever the organisation's rule is. Apply it identically to everyone. Explain that you are following the process that protects their account, not doubting them personally.",
        },
        {
          step: "Handle pressure to skip verification",
          detail:
            "The caller is in a hurry and is getting irritated. Stay calm, repeat the reason once, and offer the fastest legitimate route. If pressure continues, escalate. **Urgency and irritation are common features of this exact attack**, and feeling uneasy is information.",
        },
        {
          step: "Perform the reset securely",
          detail:
            "Set a temporary password that must change at first login. Never a permanent one you chose, and never delivered by email or WhatsApp — use a call or a one-time mechanism, because messages persist and get forwarded.",
        },
        {
          step: "Record the reset and the verification method in the ticket",
          detail:
            "Who requested it, how identity was verified, what was set, and when. If the account is later misused, that record is your protection and the organisation's evidence.",
        },
        {
          step: "Take a call from a genuinely frustrated user",
          detail:
            "They have lost work and they are angry. Let them finish without interrupting. Acknowledge the impact before offering the technical solution — **an unacknowledged frustration does not disappear when you start fixing things.**",
        },
        {
          step: "Respond without becoming defensive",
          detail:
            "Do not explain why it is not your fault, even when it is not. State what you are going to do and when. Defensiveness escalates; a clear plan de-escalates. This is a learnable behaviour and we practise it deliberately.",
        },
        {
          step: "Reset between tickets",
          detail:
            "Take thirty seconds before the next interaction. Tone carries in both directions, and the fifth person reporting the same printer fault deserves the same patience as the first — which requires a deliberate reset rather than willpower.",
        },
        {
          step: "Write tickets while the interaction is fresh",
          detail:
            "Record what was said and done immediately, not at day end. Accuracy decays quickly, and the act of writing imposes a useful pause between one user's frustration and the next.",
        },
        {
          step: "Add the human-procedure entries to the playbook",
          detail:
            "The verification method for resets, the remote session procedure, and the escalation rule for pressure. These are procedures, not instincts, and they belong written down where anyone can follow them.",
        },
      ],
    },
    practice: {
      title: "Run real support interactions, including the uncomfortable ones",
      brief:
        "Practise the human side of support deliberately: turn a vague report into a diagnosis, run a clean remote session, handle a verified password reset, and manage a frustrated user.",
      steps: [
        "Take a vague report and resist guessing; ask the user to show you the failing action instead.",
        "Record the user's exact words and note the step they treated as obvious.",
        "Explain what you are doing without using cache, driver, server, permission or sync.",
        "Set a time expectation before starting work, and meet it.",
        "Verify identity through a known channel before accepting any remote session.",
        "Narrate every action during the remote session and move deliberately.",
        "Ask the user not to touch the mouse or keyboard, and explain why at the start.",
        "Look only where the fault requires on the remote screen, and say so.",
        "Confirm the fix in-session, hand back control, and announce the disconnection.",
        "Handle a password reset request by verifying identity before doing anything else.",
        "Apply the same verification to a senior person as to anyone else, and explain the reasoning.",
        "Respond calmly to pressure to skip verification, and escalate if it continues.",
        "Set a temporary password requiring change at first login, delivered by call rather than message.",
        "Record who requested the reset, how identity was verified, and what was set.",
        "Take a call from a frustrated user, let them finish, and acknowledge the impact before offering a fix.",
        "Respond without explaining whose fault it is; state the plan and the timing instead.",
        "Reset deliberately between tickets and write each ticket while it is fresh.",
        "Add the verification method, remote session procedure and escalation rule to your playbook.",
      ],
      standard:
        "A vague report converted into a diagnosis by observation rather than interrogation, with the user's exact words recorded; explanations given with no jargon and a time expectation set and met; a remote session run with identity verified beforehand, every action narrated, mouse control requested, screen privacy respected and control handed back explicitly; a password reset performed only after defined verification applied equally to a senior person, with pressure to skip it declined and escalated, a temporary change-on-login password delivered by call, and the verification method recorded; a frustrated user heard and acknowledged before any fix was offered, with no defensiveness; deliberate resets between tickets; and the verification, remote and escalation procedures written into the playbook.",
    },
    pitfalls: [
      {
        problem: "Interrogating a user who cannot describe the problem",
        fix: "Ask them to show you instead. Watching the failing action produces more evidence in thirty seconds than ten well-chosen questions, and it does not make the user feel tested.",
      },
      {
        problem: "Using jargon and assuming it is understood",
        fix: "Cache, driver, server, permission and sync mean nothing to most users — or mean something else. Describe what the thing does. If they cannot repeat your explanation, your explanation failed.",
      },
      {
        problem: "Letting a user feel foolish",
        fix: "The moment someone feels stupid they stop telling you things, and you lose the information you need. 'That is a common one' is usually true and costs nothing.",
      },
      {
        problem: "Accepting a remote session without verifying who is asking",
        fix: "Verify through a known channel and confirm they requested support, before accepting. Remote access is precisely what an attacker wants, and a plausible voice is the whole attack.",
      },
      {
        problem: "Resetting a password without verifying identity",
        fix: "Verification comes first and applies to everyone including the managing director. You are not doubting the person; you are following the rule that protects their account.",
      },
      {
        problem: "Sending passwords by email or WhatsApp",
        fix: "Both persist in history and are read by others. Use a phone call or a one-time mechanism, and set a temporary password that must change at first login.",
      },
      {
        problem: "Becoming defensive with a frustrated user",
        fix: "Do not explain why it is not your fault, even when it is not. Acknowledge the impact, then state what you will do and when. Defensiveness escalates; a clear plan de-escalates.",
      },
      {
        problem: "Carrying one user's frustration into the next ticket",
        fix: "Take thirty seconds between interactions. Tone is contagious in both directions, and the fifth person reporting the same fault deserves the same patience as the first.",
      },
    ],
    expertNotes: [
      "Ask users to show you rather than describe it. It is the highest-value technique in this session: it produces better evidence, it is faster, and it avoids making the user feel examined. Most 'vague' reports become precise the moment you watch the actual behaviour.",
      "Identity verification before a password reset is the control that prevents the most common account takeover, and it will feel awkward exactly when it matters most. Apply it identically to everyone, and use the framing that you are following the rule that protects them rather than doubting them personally.",
      "Never let a user feel foolish. The instant someone feels stupid they withhold information, and the information they withhold is usually the detail that solves the fault. Patience is not merely courtesy here — it is a diagnostic technique.",
      "Take responsibility for your response, not for the existence of the fault. Old equipment fails and software has bugs; you did not cause either. That distinction is what makes the role sustainable over years rather than months, and it is also what lets you be honest about what can and cannot be fixed.",
    ],
    vocabulary: [
      {
        term: "Observation over interrogation",
        meaning:
          "Asking a user to demonstrate the failing action rather than describe it. Produces better evidence faster and avoids making the user feel tested.",
      },
      {
        term: "Jargon-free explanation",
        meaning:
          "Describing what a component does instead of naming it. Necessary because cache, driver, server, permission and sync mean nothing — or something else — to most users.",
      },
      {
        term: "Remote support session",
        meaning:
          "Controlling a user's machine across the network. Efficient, but requires verified identity, narrated actions, requested mouse control and explicit handback.",
      },
      {
        term: "Identity verification",
        meaning:
          "Confirming who is requesting an account action through a known channel before performing it. The primary control against social-engineering account takeover.",
      },
      {
        term: "Temporary password",
        meaning:
          "A one-use credential that must be changed at first login. Never a permanent password chosen by support, and never delivered by email or messaging app.",
      },
      {
        term: "Social engineering",
        meaning:
          "Obtaining access by manipulating a person rather than by technical attack. Password reset requests are its most common form against a helpdesk.",
      },
      {
        term: "Acknowledgement before solution",
        meaning:
          "Recognising the impact on the user before offering a technical fix. An unacknowledged frustration does not disappear when you start solving the problem.",
      },
      {
        term: "Emotional reset",
        meaning:
          "The deliberate pause between tickets that stops one user's frustration carrying into the next interaction. A learned habit rather than willpower.",
      },
    ],
    homework: [
      {
        task: "Run five real support interactions and review your language",
        detail:
          "Record or recall how you explained each fix, and rewrite each explanation with no jargon. Note where a user's confusion turned out to be caused by your wording rather than by the problem.",
      },
      {
        task: "Write your organisation's identity verification procedure",
        detail:
          "The defined method for verifying a password reset request, the rule that it applies equally to everyone including senior staff, and the escalation path when somebody pressures you to skip it.",
      },
      {
        task: "Run a clean remote support session",
        detail:
          "With identity verified beforehand, every action narrated, mouse control requested, screen privacy respected, and control handed back explicitly. Note what felt awkward and how you handled it.",
      },
      {
        task: "Practise the frustrated-user conversation",
        detail:
          "Role-play a call with an angry user who has lost work. Practise letting them finish, acknowledging the impact, and stating a plan without becoming defensive or explaining whose fault it is.",
      },
    ],
    rubric: [
      {
        criterion: "Information gathering",
        passing: "Established what the problem was.",
        excellent:
          "Used observation rather than interrogation, preserved the user's exact words, and identified the step the user treated as obvious.",
      },
      {
        criterion: "Communication quality",
        passing: "Explained the fix.",
        excellent:
          "No jargon, an expectation set and met, no user left feeling foolish, and an explanation the user could have repeated back accurately.",
      },
      {
        criterion: "Remote session discipline",
        passing: "Completed a remote session.",
        excellent:
          "Identity verified before accepting, actions narrated, mouse control requested with a reason, screen privacy respected, and control handed back explicitly.",
      },
      {
        criterion: "Reset security",
        passing: "Reset the password.",
        excellent:
          "Verification applied before action and equally to senior staff, pressure declined and escalated, temporary change-on-login password delivered by call, and the verification method recorded.",
      },
      {
        criterion: "Professionalism under pressure",
        passing: "Stayed polite.",
        excellent:
          "Acknowledged impact before offering a solution, no defensiveness about fault, deliberate resets between tickets, and honest about what can and cannot be fixed.",
      },
    ],
    faqs: [
      {
        q: "Users get annoyed when I ask them to verify their identity. What do I say?",
        a: "That you are following the process that protects their account, and that it applies to everyone including you. Most people accept that readily. If someone becomes aggressive about it, that is a reason to escalate rather than to relax the rule.",
      },
      {
        q: "Is it rude to ask a user not to touch the mouse?",
        a: "No — explain why and they will understand immediately. Two people controlling one cursor is the main reason remote sessions fail, so the request is a practical necessity rather than a preference.",
      },
      {
        q: "How do I explain something technical without jargon?",
        a: "Describe what the thing does rather than what it is called. 'The temporary files the program keeps' instead of 'the cache'. If the user cannot repeat your explanation back to you, the explanation was the problem, not their understanding.",
      },
      {
        q: "What if the managing director demands a reset without verification?",
        a: "Apply the same rule and offer the fastest legitimate route — a callback to the number in your records takes a minute. If they continue to press, escalate to whoever owns the policy. The rule protects them, and bending it once establishes that it can be bent.",
      },
      {
        q: "Does the emotional side of the job get easier?",
        a: "It does, but through technique rather than toughness. Letting users finish, acknowledging impact before fixing, resetting deliberately between tickets, and declining responsibility for faults you did not cause are all learnable habits that make the role sustainable.",
      },
    ],
  },
};
