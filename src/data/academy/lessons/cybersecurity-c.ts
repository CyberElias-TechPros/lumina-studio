import type { SessionLecture } from "../types";

/**
 * Cybersecurity — ₦25,000 · 4 weeks · 8 sessions.
 * Sessions 7 and 8. (Sessions 1–3 in cybersecurity.ts, 4–6 in cybersecurity-b.ts.)
 */
export const cybersecurityLessonsC: Record<string, SessionLecture> = {
  "incident-response-and-recovery": {
    summary:
      "The backup that nobody tested is not a backup, and the plan nobody rehearsed is not a plan. This session covers designing and testing real backups, the incident-response sequence when something has already gone wrong, and how to recover a business rather than just a machine.",
    objectives: [
      "Design a backup scheme that survives ransomware and theft",
      "Test a restore and understand why an untested backup is not a backup",
      "Follow a structured incident-response sequence under pressure",
      "Contain an active compromise without destroying the evidence",
      "Recover systems and data in the right order",
      "Run a post-incident review that actually prevents recurrence",
    ],
    blocks: [
      {
        heading: "Backups: the only control that beats the worst case",
        body: [
          "Most controls reduce the likelihood of something going wrong. Backups reduce the **impact** of the worst outcome, which is why they come first in every prioritisation in this course. Ransomware, a failed drive, a stolen laptop, an accidental deletion, a corrupted update — every one of those stops being a catastrophe and becomes an inconvenience if a working backup exists, and stays a catastrophe if it does not.",
          "The standard scheme is **3-2-1**: three copies of your data, on two different kinds of media, with one copy off-site. In practice for a small business that means the working files on the machine, a second copy on an external drive or a network location, and a third in cloud storage. The off-site copy is the part people skip, and it is the part that matters when the premises burn, flood or are burgled — which happens.",
          "Then the part that defeats naive backups: **ransomware encrypts whatever it can reach**, including a mapped network drive and a permanently connected external disk. So the off-site or offline copy must be genuinely separated — a drive that is disconnected when not backing up, or cloud storage with **versioning**, which keeps previous versions so an encrypted or deleted file can be rolled back. A backup that is connected at the moment of infection is just another copy for the ransomware to encrypt.",
        ],
      },
      {
        heading: "Testing: the step that makes it real",
        body: [
          "An untested backup is a hope, not a control. Drives fail silently, sync jobs stop running after an error nobody read, and the folder that was being backed up is not the folder that mattered. The only way to know is to **restore something and open it**.",
          "Test on a schedule — monthly for a small business is reasonable — and test properly: pick a real file, restore it to a different location, and open it to confirm it is intact and current. Once a quarter, do a larger test: restore a whole folder, or better, boot from the recovery media to confirm the machine itself can be rebuilt. Record the date and result each time, because a log of successful restores is genuinely useful evidence and it catches the month the job quietly stopped.",
          "Also test **what you would do without the machine**. If the laptop is stolen on a Monday, how does the business operate on Tuesday? Knowing the answer in advance — which files are essential, where the credentials live, who to call — is worth more than any single backup, because it turns a crisis into a procedure.",
        ],
      },
      {
        heading: "The incident-response sequence",
        body: [
          "When something has gone wrong, order matters more than speed, and the sequence is fixed. **Detect and confirm** — establish what is actually happening rather than assuming. A slow machine is not necessarily compromised; a bank alert you did not expect probably is. **Contain** — stop the damage spreading: disconnect the affected machine from the network, disable the compromised account, change the credentials from a clean device, revoke active sessions.",
          "Then **assess** — what was affected, what data was involved, what is the exposure. Then **eradicate** — remove the cause: the malware, the attacker's access, the vulnerability they used. Then **recover** — restore systems and data in the right order, which section five covers. Then **review**, which most people skip and which is the only part that prevents the next one.",
          "Two rules govern the whole sequence. **Do not power off a machine you suspect is actively compromised** if you may need evidence — a shutdown can destroy volatile data, and for a business facing a fraud claim or a police report, that evidence matters. Suspend or disconnect it from the network instead. And **do not rush to rebuild**, because rebuilding before you understand the entry point means rebuilding the same vulnerability, and you will be back here in a month.",
        ],
      },
      {
        heading: "Containing without destroying evidence",
        body: [
          "Containment is about stopping the spread while preserving what you may need. **Disconnect from the network** — pull the cable or disable Wi-Fi — which stops lateral movement and stops data leaving, without destroying anything on the disk. **Do not shut down** unless you must; volatile memory holds running processes and network connections that are gone forever at power-off.",
          "**Change credentials from a clean device**, not from the compromised one, because a keylogger there will simply capture the new password. **Revoke active sessions** across email and social accounts, because an attacker holding a session token keeps access after a password change. **Disable the account** if a staff member's credentials are involved, rather than only changing the password.",
          "Then **preserve what you have**: photograph any error message or ransom note, note the times of what happened, and if the incident involves money or a customer's data, keep the machine aside rather than wiping it. In Nigeria, financial fraud should be reported to the platform and to the police, and the **EFCC** handles financial crime; a preserved machine and a documented timeline are what make a report useful rather than anecdotal.",
        ],
      },
      {
        heading: "Recovery and the review that prevents the next one",
        body: [
          "Recovery has an order, and getting it wrong wastes days. **Restore the essentials first** — whatever the business needs to trade: the customer list, the order records, the communication channels. Not everything at once. **Verify each restore** by opening the files before you rely on them, because a restore that silently failed is worse than none, since you believe you are safe. **Rebuild rather than clean** where the machine was compromised: recover the data, verify it, then install fresh, because a cleaned machine is probably fine and a rebuilt one is known to be fine.",
          "Then change every credential that was on the affected machine, revoke sessions, and only reconnect it once it is clean and updated. **Confirm the vulnerability is closed** — the pirated software removed, the router password changed, the two-factor enabled — before considering the incident over. Recovering without closing the entry point is how the same incident happens again.",
          "Finally, **review**. Write down what happened, how it got in, what worked, what did not, and what you will change. Then make those changes: the backup that was missing, the two-factor that was never enabled, the staff member who needs ten minutes of explanation. Most incidents are not sophisticated; they are an unpatched system, a reused password or a clicked link. The review is where a bad week becomes a permanently better setup, and skipping it is the most expensive omission in this entire course.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor sets up a 3-2-1 backup with an offline copy, tests a restore, then runs a full simulated incident — detection, containment without shutdown, credential and session revocation, assessment, rebuild, and a written review.",
      steps: [
        {
          step: "Explain why backups come first",
          detail:
            "Show that most controls reduce likelihood while backups reduce the impact of the worst case. Explain that this is why they top every prioritisation in the course.",
        },
        {
          step: "Set up the 3-2-1 scheme",
          detail:
            "Configure working files, a second local copy, and a cloud copy. Explain that the off-site copy is the one people skip and the one that matters when premises are lost.",
        },
        {
          step: "Show why a connected backup fails",
          detail:
            "Demonstrate that a mapped drive or permanently attached disk is reachable by ransomware. Explain that the third copy must be disconnected or versioned.",
        },
        {
          step: "Enable versioning",
          detail:
            "Configure cloud versioning and show rolling a file back to a previous version. Explain that this is what defeats encryption and accidental deletion.",
        },
        {
          step: "Test a restore properly",
          detail:
            "Restore a real file to a different location and open it. Explain that a backup nobody has restored is a hope rather than a control.",
        },
        {
          step: "Test a larger recovery",
          detail:
            "Restore a whole folder and boot from recovery media. Explain that confirming the machine can be rebuilt is a different test from confirming a file exists.",
        },
        {
          step: "Detect and confirm",
          detail:
            "Take a reported symptom and establish what is actually happening before acting. Explain that assuming wastes time in both directions.",
        },
        {
          step: "Contain without shutting down",
          detail:
            "Disconnect the network and leave the machine powered. Explain that shutdown destroys volatile evidence that a fraud report may need.",
        },
        {
          step: "Change credentials from a clean device",
          detail:
            "Demonstrate changing the password from a different machine and explain that changing it on a compromised one simply feeds a keylogger.",
        },
        {
          step: "Revoke sessions and disable the account",
          detail:
            "Sign out all active sessions and disable a staff account rather than only changing its password. Explain why a session token survives a password change.",
        },
        {
          step: "Preserve the evidence",
          detail:
            "Photograph the ransom note, record the timeline, and set the machine aside. Explain what makes a police or EFCC report useful rather than anecdotal.",
        },
        {
          step: "Recover in order and verify",
          detail:
            "Restore the essentials first, open files to confirm integrity, then rebuild the machine rather than cleaning it. Confirm the entry point is closed before reconnecting.",
        },
        {
          step: "Write the review",
          detail:
            "Document what happened, how it entered, what worked and what will change. Explain that skipping this is the most expensive omission in the course.",
        },
      ],
    },
    practice: {
      title: "Build and test backups, then run a full incident",
      brief:
        "You design and implement a 3-2-1 backup for a real business with a genuinely offline or versioned third copy, test restores at two scales, then run a complete simulated incident from detection through containment, assessment, recovery and a written review.",
      steps: [
        "List the data the business would genuinely lose money without.",
        "Implement the 3-2-1 scheme: working files, a second local copy, and a cloud copy.",
        "Ensure the third copy is disconnected when not backing up, or has versioning enabled.",
        "Confirm the backup covers the folders that actually matter, not a convenient subset.",
        "Restore a single real file to a different location and open it to confirm integrity.",
        "Restore a whole folder and record the time it took.",
        "Boot from recovery media and confirm the machine can be rebuilt.",
        "Record the date and result of each test in a log.",
        "Write what the business would do on day one without the machine.",
        "Run the simulated incident: confirm what is actually happening before acting.",
        "Contain by disconnecting the network without powering off, and explain why.",
        "Change credentials from a clean device and revoke all active sessions.",
        "Preserve evidence: photograph messages, record the timeline, set the machine aside.",
        "Recover the essentials first, verifying each restore by opening files.",
        "Rebuild the machine rather than cleaning it, and close the entry point before reconnecting.",
        "Write the review: cause, what worked, what did not, and the specific changes to make.",
      ],
      standard:
        "A working 3-2-1 backup with a genuinely offline or versioned third copy, restores tested at file and folder scale with results logged, recovery media confirmed bootable, and a full incident run in the correct order — containment without shutdown, credentials changed from a clean device, sessions revoked, evidence preserved, essentials restored first and verified, machine rebuilt, entry point closed, and a written review naming specific changes.",
    },
    pitfalls: [
      {
        problem: "Your only backup is on a drive that stays connected",
        fix: "Ransomware encrypts whatever it can reach, including mapped drives and attached disks. The third copy must be disconnected when not backing up, or held in cloud storage with versioning.",
      },
      {
        problem: "You have never restored anything",
        fix: "Test monthly: restore a real file elsewhere and open it. Drives fail silently and sync jobs stop after an unread error, so an untested backup is a hope rather than a control.",
      },
      {
        problem: "You backed up a convenient folder rather than the important one",
        fix: "Verify the backup covers what actually matters. A backup of the wrong directory is indistinguishable from no backup until the moment you need it.",
      },
      {
        problem: "You shut down a compromised machine immediately",
        fix: "Disconnect the network and leave it powered. Shutdown destroys volatile evidence that a fraud report or a police investigation may need, and it can also complicate understanding what happened.",
      },
      {
        problem: "You changed the password on the compromised machine",
        fix: "Change credentials from a clean device. A keylogger on the affected machine will simply capture the new password, and you will believe you have secured the account when you have not.",
      },
      {
        problem: "You changed the password but left sessions active",
        fix: "Revoke all active sessions. An attacker holding a session token keeps access regardless of the new password, and this is the step most people omit.",
      },
      {
        problem: "You rebuilt the machine without closing the entry point",
        fix: "Remove the pirated software, change the router password, enable two-factor — whatever let the attacker in — before reconnecting. Otherwise you have rebuilt the same vulnerability and will be back in a month.",
      },
      {
        problem: "You never wrote the review",
        fix: "Document the cause, what worked, what did not and what changes. Most incidents are an unpatched system, a reused password or a clicked link, and the review is where a bad week becomes a permanently better setup.",
      },
    ],
    expertNotes: [
      "Test a restore every month and log the result. It is the only way to know the backup works, and the log is what catches the month the job quietly stopped — which is far more common than people assume.",
      "Keep the third backup copy disconnected or versioned, without exception. A backup that is online at the moment of infection is simply another copy for the ransomware to encrypt, and this is the mistake that turns a survivable incident into a business-ending one.",
      "Disconnect rather than shut down when containing a suspected compromise. Preserving volatile evidence costs nothing and may be the difference between a usable fraud report and an anecdote.",
      "Always write the review, even for a small incident. Most compromises are mundane — an unpatched system, a reused password, a clicked link — and the review is the only part of the process that stops the next one.",
    ],
    vocabulary: [
      { term: "3-2-1 backup", meaning: "Three copies, on two media types, with one off-site. The standard scheme for surviving the worst case." },
      { term: "Versioning", meaning: "Cloud storage keeping previous file versions, allowing rollback after encryption or deletion." },
      { term: "Offline copy", meaning: "A backup disconnected when not in use, so ransomware cannot reach it." },
      { term: "Restore test", meaning: "Restoring a real file and opening it. The only proof a backup works." },
      { term: "Containment", meaning: "Stopping an incident spreading — disconnect, disable, revoke — without destroying evidence." },
      { term: "Volatile evidence", meaning: "Data in memory that is lost at power-off. Why you disconnect rather than shut down." },
      { term: "Eradication", meaning: "Removing the cause — malware, attacker access, the exploited vulnerability." },
      { term: "Post-incident review", meaning: "The written analysis of cause and response, producing specific changes. The only part that prevents recurrence." },
    ],
    homework: [
      {
        task: "Implement 3-2-1 for your own data",
        detail:
          "Working files, a second local copy, and a cloud copy with versioning. Confirm the third copy is genuinely unreachable by malware on your machine.",
      },
      {
        task: "Test a restore today",
        detail:
          "Restore a real file to a different location and open it. Then restore a whole folder and time it. Record both results and the date.",
      },
      {
        task: "Write your day-one-without-the-machine plan",
        detail:
          "What the business does if the laptop is stolen on a Monday: which files are essential, where credentials live, who to call. Most people have never written this.",
      },
      {
        task: "Write an incident-response card",
        detail:
          "Confirm, contain without shutdown, change credentials from a clean device, revoke sessions, preserve evidence, assess, recover essentials first, close the entry point, review. Keep it reachable.",
      },
    ],
    rubric: [
      {
        criterion: "Backup design",
        passing: "Has some backup.",
        excellent: "A 3-2-1 scheme covering the data that matters, with the third copy disconnected or versioned so ransomware cannot reach it.",
      },
      {
        criterion: "Testing",
        passing: "Believes the backup works.",
        excellent: "Restores tested at file and folder scale, recovery media confirmed bootable, and every test dated and logged.",
      },
      {
        criterion: "Incident sequence",
        passing: "Would react sensibly.",
        excellent: "Follows detect, contain, assess, eradicate, recover, review in order, and does not rush to rebuild before understanding the entry point.",
      },
      {
        criterion: "Containment discipline",
        passing: "Would change a password.",
        excellent: "Disconnects without shutting down, changes credentials from a clean device, revokes sessions, disables accounts, and preserves evidence.",
      },
      {
        criterion: "Recovery and review",
        passing: "Restores the data.",
        excellent: "Restores essentials first, verifies each by opening files, rebuilds rather than cleans, closes the entry point, and produces a written review naming specific changes.",
      },
    ],
    faqs: [
      {
        q: "Is cloud backup enough on its own?",
        a: "It is a good third copy but not sufficient alone. You need a local copy for fast recovery of large amounts of data, and the cloud copy must have versioning so an encrypted or deleted file can be rolled back. 3-2-1 exists because no single copy is enough.",
      },
      {
        q: "How often should I test my backups?",
        a: "Restore a real file monthly and do a larger folder or full-machine test quarterly. Log each result. The log is what reveals the month the backup job quietly stopped, which is far more common than a dramatic failure.",
      },
      {
        q: "Should I turn off a machine I think is compromised?",
        a: "Disconnect it from the network and leave it powered. Shutting down destroys the volatile evidence — running processes, active connections — that a fraud report or police investigation may need. Power off only if you have no alternative.",
      },
      {
        q: "My business was hit by ransomware. Do I pay?",
        a: "Generally no. Payment does not guarantee recovery, it funds the operation, and it marks you as someone who pays. Restore from your backup. If you have no backup, take specialist advice before deciding — and let that be the last time you have no backup.",
      },
      {
        q: "What should I report, and to whom?",
        a: "Report financial fraud to the platform involved and to the police, and consider the EFCC for financial crime in Nigeria. Reporting rarely recovers money on its own, but it creates a record that matters for any bank claim, and preserve the machine and timeline so the report is useful.",
      },
    ],
  },

  "policies-risk-and-final-project": {
    summary:
      "The final session turns individual knowledge into something an organisation can run: simple policies that people actually follow, a risk assessment a small business can act on, and a complete security review of a real setup delivered as a professional report.",
    objectives: [
      "Write simple security policies that survive contact with real staff",
      "Conduct a risk assessment a small business can act on",
      "Prioritise remediation by risk reduced rather than by impression",
      "Deliver a security review as a professional written report",
      "Explain your findings to a non-technical owner",
      "Identify your next step in a security career",
    ],
    blocks: [
      {
        heading: "Policies that people actually follow",
        body: [
          "Most security policies fail because they are written to be impressive rather than usable: twenty pages nobody reads, requiring behaviour that makes the job harder, and enforced by nobody. A policy that is followed is short, specific, and costs people almost nothing. For a small business, one page covering five things outperforms a handbook covering fifty.",
          "The five that matter: **passwords and accounts** — a password manager is provided and required, passwords are never shared or written down, and two-factor is on for every business account. **Devices** — every laptop and phone is locked and encrypted, and a lost or stolen device is reported immediately. **Data** — backups run automatically and nobody stores business data only on their own machine. **Messages** — no one-time code is ever shared with anyone, and any request for payment is verified through a second channel. **Reporting** — if something seems wrong, say so immediately and there will be no blame.",
          "That last point deserves emphasis, because it is the one organisations get wrong. If staff fear being told off for clicking a link, they hide it, and a hidden incident becomes a large one. A no-blame reporting culture is a security control, and it is free. The policy should say so explicitly, because otherwise nobody believes it.",
        ],
      },
      {
        heading: "Conducting the risk assessment",
        body: [
          "The assessment follows the model from session one and produces something a business can act on. **List the assets** — what would genuinely hurt to lose or expose: customer data, the bank account, the social accounts, the order records, the ability to trade. **Apply the CIA triad** to each, because it turns vague worry into a specific question.",
          "Then **identify the vulnerabilities in this specific setup**, not generic threats: no backup, one shared password, an unencrypted laptop, a router on its default admin password, no two-factor, software installed from a pirated source, a staff member who is the only person who knows the passwords. These are findable by looking, and they are what you can act on.",
          "**Score each** on likelihood and impact — a simple high, medium, low is sufficient and more honest than a false numeric precision. **Rank them**, and then **recommend controls in order of risk reduced per naira**, which for almost every small business means backups, two-factor, a password manager, updates, device encryption, and staff awareness, in that order. Include what you would deliberately not spend on, because that is as valuable as what you recommend.",
        ],
      },
      {
        heading: "The written report",
        body: [
          "A security review is a document, and its quality determines whether anything changes. The structure that works: an **executive summary** of one paragraph in plain language, stating the overall position and the top three actions — because the owner will read this and possibly nothing else. Then the **scope**, so it is clear what was and was not examined. Then the **findings**, each with what it is, why it matters in this business's terms, and how to fix it. Then the **prioritised recommendations** with cost and effort. And finally what was **not** covered.",
          "Two habits make the difference. **Write every finding in the business's terms**, not in technical ones: not 'the router uses default credentials' but 'anyone who knows your router model can take control of your internet connection and see where your staff go online'. And **give each finding a clear fix with a cost**, because a problem without a solution is just a worry, and a business owner who cannot act on it will set the report down.",
          "Be honest about the limits of what you did. A review is not a penetration test and does not prove anything is unbreakable; it identifies the exposures that matter and the order to fix them. Saying so protects you and it is what a professional does. Overclaiming — 'your systems are now secure' — is both false and a liability waiting to arrive.",
        ],
      },
      {
        heading: "Explaining it to a non-technical owner",
        body: [
          "The conversation matters as much as the document. Lead with the **business consequence**, not the technical fault: 'if this laptop is stolen today, every customer record on it goes with it, and there is no copy' lands where 'the disk is unencrypted' does not. Then give the fix and its cost, and let them decide.",
          "Avoid fear as a sales technique. A frightened client makes bad decisions, buys the wrong things, and resents you later. The honest framing is that most risks are ordinary and most fixes are cheap, and that doing the five basics puts them ahead of nearly every comparable business. That is true, it is reassuring, and it is more likely to produce action than a threat.",
          "And be willing to say **'you do not need this'**. Declining to sell a control that does not reduce their actual risk is the fastest way to be trusted with everything else, and in a market where everyone knows everyone, that trust is the entire business.",
        ],
      },
      {
        heading: "Where to go next",
        body: [
          "The honest position after four weeks: you can assess a small business's security, apply the controls that matter, respond to the common incidents, and explain all of it to someone with no technical background. That is genuinely employable and genuinely useful, and it is more than most small businesses in this market have ever had done.",
          "The natural next steps branch. **Security operations and monitoring** — watching for and triaging alerts — is where most entry-level jobs sit. **Governance, risk and compliance** is document and process work, largely non-technical, and it is a large and steady employment area. **Technical specialisms** such as penetration testing need deeper networking and scripting skill, which you can build on top of this. And **IT support** is the most common entry route into security in practice, because it teaches you how systems actually fail.",
          "Certifications help once you have the grounding — CompTIA Security+ is the usual first one and it maps closely to what this course covered — but they certify knowledge you already have rather than supplying it. What actually gets you hired is being able to look at a real setup, name what is wrong with it in plain language, and fix the things that matter in the right order. That is what the final project demonstrates.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor writes a one-page policy set for a real small business, conducts a full risk assessment, then delivers the review as a written report and presents it to a non-technical owner, fielding the objections that actually come up.",
      steps: [
        {
          step: "Show a policy nobody follows",
          detail:
            "Display a twenty-page corporate policy and explain why a small business ignores it entirely. Contrast with what a usable one page contains.",
        },
        {
          step: "Write the five-point policy",
          detail:
            "Draft passwords and accounts, devices, data, messages, and reporting. Explain why each is included and what it costs staff to comply.",
        },
        {
          step: "Add the no-blame reporting clause",
          detail:
            "Write it explicitly and explain that fear of blame turns a small incident into a large one because staff hide it.",
        },
        {
          step: "List the business's assets",
          detail:
            "Identify what would genuinely hurt to lose, and apply the CIA triad to each. Explain that you cannot protect what you have not named.",
        },
        {
          step: "Find the actual vulnerabilities",
          detail:
            "Walk the setup: no backup, shared password, unencrypted laptop, default router credentials, no two-factor, pirated software. Note that these are found by looking, not by scanning.",
        },
        {
          step: "Score and rank",
          detail:
            "Apply high, medium and low for likelihood and impact, and produce a ranked list. Explain why a simple scale is more honest than false numeric precision.",
        },
        {
          step: "Recommend in order of risk reduced",
          detail:
            "Order the controls by benefit per naira with a cost against each, and name one thing you would deliberately not buy.",
        },
        {
          step: "Write the executive summary",
          detail:
            "Draft one plain-language paragraph with the top three actions. Explain that the owner may read this and nothing else.",
        },
        {
          step: "Translate a finding into business terms",
          detail:
            "Rewrite 'the router uses default credentials' as a consequence the owner feels. Explain that the translation is what produces action.",
        },
        {
          step: "State the report's limits",
          detail:
            "Note that this is a review, not a penetration test, and does not prove anything is unbreakable. Explain why overclaiming is a liability.",
        },
        {
          step: "Present to the owner",
          detail:
            "Deliver the summary, take the objections — cost, disruption, 'we have never had a problem' — and answer each without fear tactics.",
        },
        {
          step: "Map the next steps",
          detail:
            "Lay out security operations, governance and compliance, technical specialisms and IT support as routes, and explain where certification fits.",
        },
      ],
    },
    practice: {
      title: "The final project: a complete security review",
      brief:
        "You conduct a full security review of a real Nigerian small business: a one-page policy set, an asset and vulnerability assessment with scored and ranked risks, prioritised recommendations with costs, and a written report with an executive summary — then present it to a non-technical owner and handle their objections.",
      steps: [
        "Describe the business: what it does, staff count, devices, accounts and how it takes payment.",
        "List the assets that would genuinely hurt to lose or expose.",
        "Apply the CIA triad to each asset, stating which property is at stake and why.",
        "Walk the setup and list the actual vulnerabilities you find, with evidence for each.",
        "Score each on likelihood and impact and produce a ranked list.",
        "Write a one-page policy covering passwords, devices, data, messages and reporting.",
        "Include an explicit no-blame reporting clause.",
        "Recommend controls ordered by risk reduced per naira, each with a cost and an effort estimate.",
        "Name at least one control you would deliberately not buy, and justify it.",
        "Write a one-paragraph executive summary in plain language with the top three actions.",
        "Translate every finding into a business consequence rather than a technical fault.",
        "State clearly what the review did not cover and that it is not a penetration test.",
        "Present the report to a non-technical owner and record their objections.",
        "Answer each objection without fear tactics and note which recommendations they accepted.",
      ],
      standard:
        "A complete written review with assets mapped to the CIA triad, real vulnerabilities evidenced and scored, risks ranked, a one-page policy with a no-blame clause, recommendations ordered by risk reduced per naira with costs, at least one justified omission, a plain-language executive summary, every finding expressed as a business consequence, stated limits, and a delivered presentation with objections handled without fear tactics.",
    },
    pitfalls: [
      {
        problem: "You wrote a long policy nobody will read",
        fix: "One page, five topics, specific and cheap to comply with. A policy is measured by whether it is followed, and a twenty-page document in a small business is followed by nobody.",
      },
      {
        problem: "Your policy punishes people for reporting incidents",
        fix: "Add an explicit no-blame clause and mean it. Fear of being told off makes staff hide a clicked link, and a hidden incident becomes a large one.",
      },
      {
        problem: "You listed generic threats instead of this business's vulnerabilities",
        fix: "Walk the actual setup and find the real weaknesses: no backup, shared passwords, default router credentials, unencrypted devices. Generic threats are not actionable; specific vulnerabilities are.",
      },
      {
        problem: "You used false numeric precision in your scoring",
        fix: "High, medium and low is sufficient and more honest. A risk score of 7.4 implies a precision you do not have, and it invites arguments about the number rather than the risk.",
      },
      {
        problem: "You wrote findings in technical language",
        fix: "Translate each into a business consequence the owner feels. 'Anyone who knows your router model can see where your staff go online' produces action; 'default credentials' does not.",
      },
      {
        problem: "You recommended without costs",
        fix: "Every recommendation needs a cost and an effort estimate. A problem without a priced solution is a worry the owner will set down and forget.",
      },
      {
        problem: "You used fear to sell controls",
        fix: "A frightened client buys the wrong things and resents you later. The honest framing is that most risks are ordinary and most fixes are cheap, which is both true and more likely to produce action.",
      },
      {
        problem: "You claimed the business is now secure",
        fix: "Say plainly that this is a review, not a penetration test, and that it does not prove anything unbreakable. Overclaiming is false and it is a liability waiting to arrive.",
      },
    ],
    expertNotes: [
      "Write every policy so compliance costs staff almost nothing. A policy that makes the job harder is worked around, and a worked-around policy is worse than none because it creates the illusion of control.",
      "Lead every conversation with the business consequence, not the technical fault. Owners act on what they feel, and translating 'unencrypted disk' into 'every customer record leaves with a stolen laptop' is the skill that makes the rest of your work matter.",
      "Recommend in order of risk reduced per naira and always include something you would not buy. Declining an easy sale is the fastest way to be trusted with everything else.",
      "State the limits of your review explicitly. 'This is not a penetration test and does not prove anything is unbreakable' protects you, and it is what a professional says rather than something a professional has to retract.",
    ],
    vocabulary: [
      { term: "Acceptable use policy", meaning: "What staff may and may not do with business systems. Short and specific beats long and ignored." },
      { term: "No-blame reporting", meaning: "A commitment that reporting an incident brings no punishment. A genuine control, because fear makes staff hide incidents." },
      { term: "Risk scoring", meaning: "Rating likelihood and impact. High, medium and low is more honest than false numeric precision." },
      { term: "Remediation", meaning: "Fixing an identified vulnerability. Prioritised by risk reduced, not by how impressive the fix sounds." },
      { term: "Executive summary", meaning: "One plain-language paragraph with the top actions. Often the only part an owner reads." },
      { term: "Scope", meaning: "What the review did and did not examine. Stating it prevents misunderstanding and protects you." },
      { term: "Penetration test", meaning: "An authorised simulated attack proving whether defences hold. Distinct from a review, and worth saying so." },
      { term: "Governance, risk and compliance", meaning: "The policy, assessment and standards side of security. Largely non-technical and a large employment area." },
    ],
    homework: [
      {
        task: "Write a one-page policy",
        detail:
          "Passwords, devices, data, messages, reporting — with an explicit no-blame clause. Give it to one real business and see whether they follow it.",
      },
      {
        task: "Assess one real business",
        detail:
          "Assets, CIA triad, real vulnerabilities found by walking the setup, scored and ranked. This is the exercise that makes everything else concrete.",
      },
      {
        task: "Translate five findings",
        detail:
          "Take five technical findings and rewrite each as a business consequence the owner would feel. Practise until the translation is immediate.",
      },
      {
        task: "Plan your next step",
        detail:
          "Choose between security operations, governance and compliance, a technical specialism and IT support, and write what you would do in the next three months to get there.",
      },
    ],
    rubric: [
      {
        criterion: "Policy design",
        passing: "Writes some rules.",
        excellent: "One page covering five specific topics, cheap to comply with, and including an explicit no-blame reporting clause.",
      },
      {
        criterion: "Assessment",
        passing: "Identifies some risks.",
        excellent: "Assets mapped to the CIA triad, real vulnerabilities found by inspecting the setup, and risks scored and ranked with honest rather than falsely precise scoring.",
      },
      {
        criterion: "Recommendations",
        passing: "Suggests fixes.",
        excellent: "Ordered by risk reduced per naira with a cost and effort for each, plus at least one justified omission.",
      },
      {
        criterion: "Communication",
        passing: "Explains the findings.",
        excellent: "Every finding expressed as a business consequence, an executive summary a non-technical owner can act on, and objections handled without fear tactics.",
      },
      {
        criterion: "Professional honesty",
        passing: "Delivers a report.",
        excellent: "States the scope and the limits, does not claim the business is secure, and does not oversell controls the business does not need.",
      },
    ],
    faqs: [
      {
        q: "Does a small business really need a written security policy?",
        a: "Yes, but a one-page one. It sets the expectation that passwords are not shared and codes are never given out, it tells staff what to do when something seems wrong, and the no-blame clause means incidents get reported rather than hidden. A twenty-page document would simply be ignored.",
      },
      {
        q: "How do I get my first security job?",
        a: "IT support is the most common route, because it teaches how systems actually fail. Governance, risk and compliance is a large non-technical area. What gets you hired is being able to look at a real setup and say what is wrong with it in plain language — which is exactly what the final project demonstrates, so keep it as a portfolio piece.",
      },
      {
        q: "Do I need certifications?",
        a: "They help once you have the grounding. CompTIA Security+ is the usual first step and maps closely to this course. But a certification certifies knowledge you already have; being able to assess a real business and explain it to its owner is what actually gets you work.",
      },
      {
        q: "How do I price a security review?",
        a: "Price it as a professional assessment with a written deliverable, not as an hourly favour. It is a document a business can act on and keep, and it is worth considerably more than the hours suggest — particularly when it prevents a single incident. Business & Freelancing covers pricing in depth.",
      },
      {
        q: "What should I never claim in a report?",
        a: "Never claim the business is secure or that anything is unbreakable. State what you examined, what you found, what you recommend, and what was out of scope. Overclaiming is false, and it becomes a liability the moment something goes wrong.",
      },
    ],
  },
};
