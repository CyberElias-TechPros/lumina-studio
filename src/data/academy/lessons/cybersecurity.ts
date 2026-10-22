import type { SessionLecture } from "../types";

/**
 * Cybersecurity — ₦25,000 · 4 weeks · 8 sessions.
 * Sessions 1 to 3. (Sessions 4–6 in cybersecurity-b.ts, 7–8 in cybersecurity-c.ts.)
 */
export const cybersecurityLessonsA: Record<string, SessionLecture> = {
  "threats-risk-cia": {
    summary:
      "The vocabulary and judgement that everything else rests on: what security actually protects, how threats become risks, and how to think about a system's weaknesses rather than memorise a list of scare stories. This session builds the mental model the rest of the course applies.",
    objectives: [
      "Explain the CIA triad and apply it to a real system",
      "Distinguish a threat, a vulnerability, a risk and a control",
      "Assess the risk in a real Nigerian small-business setup",
      "Explain why people, not technology, are usually the weakest link",
      "Describe the threat landscape a Nigerian individual or business actually faces",
      "Prioritise controls by cost against the risk they reduce",
    ],
    blocks: [
      {
        heading: "What security actually protects: the CIA triad",
        body: [
          "Security is not one thing; it is three, and every control you will ever apply serves at least one of them. **Confidentiality** means the wrong people cannot read it — your bank details, your customers' data, your business's pricing. **Integrity** means nobody can change it without you knowing — a transferred amount, a contract, a database record. **Availability** means it is there when you need it — your files, your systems, your ability to trade.",
          "The triad is genuinely useful because it turns vague worry into specific questions. 'We need security' means nothing. 'An attacker could read our customer list' is confidentiality. 'Someone could alter an invoice before it is paid' is integrity. 'Ransomware could stop us trading for a week' is availability. Once you can name which of the three is at stake, you can reason about what to do, and you can explain it to a client or an employer in one sentence.",
          "Notice also that the three trade against each other and against convenience. Strong confidentiality usually means more authentication steps, which reduces availability and annoys users. Perfect availability — everything public, no passwords — destroys confidentiality. Security work is choosing the balance for the actual risk, not maximising all three, which is impossible.",
        ],
      },
      {
        heading: "Threats, vulnerabilities, risks and controls",
        body: [
          "Four words that people use interchangeably and should not. A **threat** is anything that could cause harm — a thief, a ransomware campaign, a fire, a careless employee. A **vulnerability** is a weakness in your specific setup that a threat could exploit — an unpatched system, a reused password, an unattended unlocked laptop, a business with no backup. A **risk** is the combination: the likelihood that a threat exploits a vulnerability, multiplied by the impact if it does. And a **control** is what you put in place to reduce either the likelihood or the impact.",
          "This distinction is the whole discipline. A threat you cannot do anything about — criminals exist — is not actionable. A vulnerability you own is. So the work is finding your vulnerabilities, estimating the risk each creates, and applying controls where the risk justifies the cost. That is why a security professional asks 'what could go wrong here, how likely, and how bad?' rather than reciting a list of famous attacks.",
          "It also produces honest prioritisation. A small Nigerian business whose only computer holds customer records faces a real availability risk from ransomware with no backup, and a real confidentiality risk from a shared password written on a note. It does not face a meaningful risk from a nation-state actor. Spending money on the wrong risk is a failure even when the money buys genuine security, because the actual exposure is elsewhere.",
        ],
      },
      {
        heading: "The threat landscape you will actually meet",
        body: [
          "For an individual or a small business in Nigeria, the realistic threats are mundane and financially motivated. **Account takeover** — someone obtaining your password and draining a bank account, an email inbox or a social account — is the most common serious loss. **Phishing and impersonation**, particularly on WhatsApp, where a message from a number posing as a relative, a bank or a delivery company asks for a code or a payment. **Fraudulent payment requests** and fake alerts, aimed at businesses that accept transfers.",
          "**Ransomware and destructive malware**, which arrives through a pirated software download, a cracked activation tool, or an attachment, and encrypts everything — devastating for a business with no backup. **Device theft or loss**, which is a data breach if the device holds customer information and is not encrypted. And **insider risk**, which is not usually malice: a staff member who shares a password, leaves an account logged in on a shared machine, or falls for a scam while acting for the business.",
          "What is notably **not** a realistic threat for most people here: a targeted attack by a sophisticated actor. Those exist and they matter to banks and governments, but designing a small business's security around them wastes money that would do far more good on backups, passwords and staff awareness. Saying this plainly to a client is part of the job.",
        ],
      },
      {
        heading: "People are the weakest link, and why that is not a criticism",
        body: [
          "The majority of successful attacks on ordinary people and small businesses succeed because a person did something reasonable — clicked a plausible message, reused a password, shared a code to be helpful. Technical controls fail far less often than human ones, which is why awareness matters more than any product you could buy.",
          "But framing this as 'users are stupid' is both unkind and useless, because it produces no improvement. The accurate framing is that **attackers design for normal human behaviour**. A message that arrives at the right moment, from an apparently known sender, asking for something small and urgent, exploits helpfulness and time pressure — traits that are virtues in every other context. People are not the weak link; the systems that let one mistake be catastrophic are.",
          "The practical conclusion is to design so that a single mistake is survivable. Two-factor authentication means a stolen password alone is not enough. A backup means ransomware is an inconvenience rather than a disaster. Encrypted storage means a lost phone is a replacement cost rather than a breach. Every one of those converts a human error into a non-event, which is a far better outcome than training people never to make one.",
        ],
      },
      {
        heading: "Choosing controls: cost against risk reduced",
        body: [
          "Security spending is a series of trade-offs, and the discipline is to buy the control that reduces the most risk per naira. For an individual or small business, the ranking is remarkably consistent. **Backups** first, because they turn the worst realistic outcome — total data loss — into an inconvenience, and they cost almost nothing. **Two-factor authentication** on email, banking and social accounts, because it neutralises the most common serious attack. **A password manager with unique passwords**, because reuse is how one breach becomes every breach.",
          "Then **updates**, which close the vulnerabilities that malware actually exploits; **device encryption**, which makes theft survivable; **antivirus**, which catches the common malware that reaches ordinary machines; and **staff awareness**, which is free and compounds. Only well down the list come the things that sound impressive — firewalls with complex rules, penetration tests, security appliances — which matter for larger organisations and are largely wasted on a two-person business.",
          "The honest test of any control is: what specific risk does it reduce, and by how much, and what does it cost in money and friction? If you cannot answer those three questions, you are buying reassurance rather than security. Being able to say that to a client — and to say 'you do not need this' — is what makes you trustworthy rather than merely alarming.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor takes a real Nigerian small business setup, maps its assets and threats, walks a live phishing example, and produces a prioritised control list with the cost and risk reduction for each item.",
      steps: [
        {
          step: "Describe the business",
          detail:
            "Use a real example: a Lagos fashion retailer with two staff, a laptop, a phone, a bank account, an Instagram shop and a WhatsApp Business line. Explain that this is the setup you must be able to secure.",
        },
        {
          step: "List the assets",
          detail:
            "Identify what actually matters: the customer list, the bank account, the social accounts, the supplier relationships, the order records. Explain that you cannot protect what you have not named.",
        },
        {
          step: "Apply the CIA triad to each asset",
          detail:
            "For each, state which of confidentiality, integrity and availability matters and why. Show that the bank account is integrity and availability while the customer list is confidentiality.",
        },
        {
          step: "Identify the realistic threats",
          detail:
            "List account takeover, WhatsApp impersonation, fake payment alerts, ransomware from cracked software, and device theft. Explicitly rule out the sophisticated-actor scenario and explain why.",
        },
        {
          step: "Find the vulnerabilities",
          detail:
            "Walk the setup and find them: one shared password, no backup, an unencrypted laptop, software installed from a pirated source, no two-factor. Explain that these, not the threats, are what you can act on.",
        },
        {
          step: "Score the risks",
          detail:
            "For each vulnerability, estimate likelihood and impact. Show that ransomware-with-no-backup and account-takeover-with-no-2FA sit at the top.",
        },
        {
          step: "Show a live phishing message",
          detail:
            "Examine a real WhatsApp impersonation message and identify the tells: urgency, a request for a code, a subtly wrong sender. Explain why it works on helpful people.",
        },
        {
          step: "Show a fake payment alert",
          detail:
            "Examine a forged transfer notification and demonstrate verifying it in the bank app rather than trusting the screenshot. Explain how common this is against Nigerian businesses.",
        },
        {
          step: "Demonstrate the single point of failure",
          detail:
            "Show how one reused password compromises email, banking and social together. Explain that reuse, not weak passwords, is the real failure.",
        },
        {
          step: "Build the prioritised control list",
          detail:
            "Order the controls by risk reduced per naira: backup, 2FA, password manager, updates, encryption, antivirus, awareness. State the cost of each.",
        },
        {
          step: "Show what converts an error into a non-event",
          detail:
            "Walk through a stolen password with 2FA on, and a ransomware hit with a backup. Explain that survivable mistakes beat perfect behaviour.",
        },
        {
          step: "Name what to skip",
          detail:
            "List the impressive-sounding controls this business does not need and explain why. Explain that saying 'you do not need this' is what builds trust.",
        },
      ],
    },
    practice: {
      title: "Risk-assess a real small business",
      brief:
        "You take a real Nigerian small business, list its assets, apply the CIA triad, identify its realistic threats and actual vulnerabilities, score the risks, and produce a prioritised control list with a cost and a stated risk reduction for each item — including what you would deliberately not spend on.",
      steps: [
        "Describe the business: what it does, how many staff, what devices and accounts it uses.",
        "List the assets that would genuinely hurt to lose or expose.",
        "For each asset, state which of confidentiality, integrity and availability is at stake and why.",
        "List the realistic threats, explicitly ruling out any that do not apply at this scale.",
        "Inspect the setup and list the actual vulnerabilities you find.",
        "Score each vulnerability on likelihood and impact.",
        "Rank the resulting risks from most to least serious.",
        "Write a prioritised control list ordered by risk reduced per naira.",
        "State the cost of each control in money and in friction for the staff.",
        "Identify one common control you would deliberately not buy, and justify it.",
        "Describe one scenario where a mistake occurs and explain which control makes it survivable.",
        "Present the assessment in one page, in language a business owner would understand.",
      ],
      standard:
        "A one-page assessment naming the assets with their CIA exposure, listing realistic threats with irrelevant ones explicitly ruled out, identifying real vulnerabilities, scoring and ranking the risks, and giving a prioritised control list where every item states its cost and its risk reduction — including at least one justified omission.",
    },
    pitfalls: [
      {
        problem: "You cannot say what you are protecting",
        fix: "Name the assets first. 'We need security' is not a requirement; 'an attacker could read our customer list' is. You cannot protect what you have not identified.",
      },
      {
        problem: "You confused a threat with a vulnerability",
        fix: "Criminals exist — that is a threat and you cannot change it. Your reused password is a vulnerability and you can. Act on the vulnerabilities, because those are the ones you own.",
      },
      {
        problem: "You designed the security around a sophisticated attacker",
        fix: "For an individual or small business the realistic threats are account takeover, impersonation, ransomware and theft. Spending on nation-state defences while there is no backup is a failure however impressive it looks.",
      },
      {
        problem: "You blamed users for falling for a scam",
        fix: "Attackers design for normal human behaviour — helpfulness and time pressure. Design so a single mistake is survivable instead of training people never to make one.",
      },
      {
        problem: "You bought controls you could not justify",
        fix: "For every control, state the specific risk it reduces, by how much, and what it costs. If you cannot answer all three, you are buying reassurance rather than security.",
      },
      {
        problem: "You recommended expensive tooling before the basics",
        fix: "Backup, two-factor, unique passwords and updates come first, always. They are cheap, they address the most common losses, and nothing else matters much until they are in place.",
      },
    ],
    expertNotes: [
      "Learn to name which part of the CIA triad is at stake in any incident. It turns a panic into a specific problem with a specific answer, and it is the vocabulary that makes you sound competent in a room with a bank's security team or a worried business owner.",
      "Always ask what the realistic threat is before recommending anything. The honest answer for most Nigerian small businesses is impersonation, account takeover and ransomware, and saying so — while ruling out the dramatic scenarios — is what separates an adviser from a salesperson.",
      "Design for survivable mistakes rather than perfect behaviour. Two-factor, backups and encryption each convert a human error into a non-event, and that is worth more than any amount of training.",
      "Be willing to tell a client they do not need something. Recommending against an expensive control you could easily have sold is the fastest way to be trusted with everything else.",
    ],
    vocabulary: [
      {
        term: "CIA triad",
        meaning:
          "Confidentiality, integrity and availability — the three things every security control serves.",
      },
      { term: "Threat", meaning: "Anything that could cause harm. You usually cannot change it." },
      {
        term: "Vulnerability",
        meaning: "A weakness in your specific setup. This is what you can act on.",
      },
      {
        term: "Risk",
        meaning:
          "Likelihood that a threat exploits a vulnerability, multiplied by the impact. The thing you prioritise.",
      },
      {
        term: "Control",
        meaning: "A measure reducing either the likelihood or the impact of a risk.",
      },
      {
        term: "Account takeover",
        meaning:
          "An attacker obtaining credentials and using a real account. The most common serious loss for individuals and small businesses.",
      },
      {
        term: "Ransomware",
        meaning:
          "Malware encrypting your files for payment. Devastating without a backup; an inconvenience with one.",
      },
      {
        term: "Survivable mistake",
        meaning:
          "A design where a single human error does not become a catastrophe. The realistic goal of security work.",
      },
    ],
    homework: [
      {
        task: "List your own assets and exposures",
        detail:
          "Write down what would genuinely hurt you to lose or expose, and which part of the CIA triad each involves. Do the same for one business you know.",
      },
      {
        task: "Find three vulnerabilities in your own setup",
        detail:
          "Check for reused passwords, missing two-factor, absent backups and unencrypted devices. Write what you find rather than what you assume.",
      },
      {
        task: "Write a control priority list for one business",
        detail:
          "Order the controls by risk reduced per naira, with a cost against each. Include one thing you would deliberately not buy, with a justification.",
      },
      {
        task: "Explain the triad to a non-technical person",
        detail:
          "Describe confidentiality, integrity and availability to someone with no technical background, using their own business as the example. If they cannot repeat it back, simplify it.",
      },
    ],
    rubric: [
      {
        criterion: "Triad application",
        passing: "Can define the three terms.",
        excellent:
          "Applies each to specific assets in a real business and can state which is at stake in a given incident.",
      },
      {
        criterion: "Vocabulary precision",
        passing: "Uses the terms roughly correctly.",
        excellent:
          "Distinguishes threat, vulnerability, risk and control cleanly, and acts on vulnerabilities rather than threats.",
      },
      {
        criterion: "Threat realism",
        passing: "Lists common threats.",
        excellent:
          "Names the realistic Nigerian small-business threats and explicitly rules out the dramatic ones with reasoning.",
      },
      {
        criterion: "Risk assessment",
        passing: "Identifies some risks.",
        excellent:
          "Scores likelihood and impact for each vulnerability and produces a defensible ranking.",
      },
      {
        criterion: "Control judgement",
        passing: "Suggests sensible controls.",
        excellent:
          "Prioritises by risk reduced per naira, states each cost in money and friction, and justifies at least one deliberate omission.",
      },
    ],
    faqs: [
      {
        q: "Is cybersecurity a real career path in Nigeria?",
        a: "Yes, and demand exceeds supply. Banks, fintechs, telcos, government agencies and larger businesses all employ security staff, and the entry route is exactly what this course teaches: understanding risk, then applying practical controls. Certifications help later, but the judgement comes first.",
      },
      {
        q: "Do I need to be a programmer to work in security?",
        a: "No, not for most roles. Security awareness, risk assessment, policy, incident handling and compliance are largely non-programming work and they are where most jobs are. Technical specialisms such as penetration testing need deeper skills, which you can add later.",
      },
      {
        q: "What is the single most important thing a small business can do?",
        a: "Back up its data, properly and tested. It converts the worst realistic outcome — ransomware or total loss — into an inconvenience, and it costs almost nothing. No other control has that ratio of benefit to cost.",
      },
      {
        q: "Why does everyone say two-factor authentication matters so much?",
        a: "Because account takeover is the most common serious attack, and it usually starts with a stolen or reused password. Two-factor means the password alone is not enough, which neutralises the attack entirely for a few minutes of setup per account.",
      },
      {
        q: "Is antivirus worth paying for?",
        a: "The built-in Windows Defender is adequate for most users and has the advantage of not slowing the machine. What matters more is that something is active, that the system is updated, and that software is not installed from pirated sources — which is where most Nigerian ransomware actually comes from.",
      },
    ],
  },

  "authentication-and-awareness": {
    summary:
      "How systems decide who you are, why most of that machinery fails in practice, and how people — including you — are targeted. This session covers the authentication methods and their real weaknesses, then social engineering as the attack that bypasses all of it.",
    objectives: [
      "Explain the three authentication factors and why two of them matter",
      "Compare passwords, codes, apps, keys and biometrics on real trade-offs",
      "Set up two-factor authentication correctly, including recovery",
      "Explain how session and cookie theft bypasses strong authentication",
      "Recognise social engineering techniques and why they work",
      "Build personal awareness habits that survive a busy day",
    ],
    blocks: [
      {
        heading: "The three factors, and why one is not enough",
        body: [
          "Authentication proves who you are, and there are only three kinds of proof. **Something you know** — a password or PIN. **Something you have** — a phone receiving a code, a hardware key, a card. **Something you are** — a fingerprint, a face. A system using one of these is **single-factor**; one requiring two different kinds is **two-factor** or **multi-factor**.",
          "The distinction between the **kinds** matters more than the count. Two passwords are not two factors, because both are 'something you know' and an attacker who obtains one likely obtained both. A password plus a code from your phone is genuinely two factors, because compromising them requires two different kinds of attack. This is why the phrase 'two-step verification' sometimes means something weaker than real two-factor, and why you should check what you have actually enabled.",
          "The reason two-factor works is straightforward: password theft is common and cheap, because passwords are reused, guessed, phished and bought in bulk after breaches. Getting physical access to your phone at the same moment is neither. That mismatch is the whole security gain, and it is why two-factor is the highest-value control available to an ordinary person.",
        ],
      },
      {
        heading: "Comparing the methods honestly",
        body: [
          "**SMS codes** are the most common and the weakest of the real second factors, because they can be intercepted through SIM-swap fraud — where an attacker convinces your network to move your number to their SIM, which is a genuine and documented problem in Nigeria. They are still vastly better than nothing, and for most accounts they are worth enabling, but they are not the best option where a choice exists.",
          "**Authenticator apps** — Google Authenticator, Microsoft Authenticator, Authy — generate codes on the device with no network involved, so there is nothing to intercept. They are strictly better than SMS and cost nothing. **Passkeys and hardware keys** are stronger again: a passkey uses public-key cryptography so there is no shared secret to phish, and a hardware key requires physical possession. These are the right choice for your most important accounts where supported.",
          "**Biometrics** — fingerprint and face — are convenient and adequate for unlocking your own device, but understand what they are: a local unlock mechanism, not usually a real second factor for a remote service, and they cannot be changed if compromised. Your fingerprint is not a secret in the way a password is; you leave copies of it everywhere you touch.",
        ],
      },
      {
        heading: "Setting up two-factor properly, including recovery",
        body: [
          "Enabling two-factor is easy; the part people skip is recovery, and it is the part that causes the disasters. When you enable it, the service gives you **backup or recovery codes** — a list of one-time codes for use if you lose your phone. Save them somewhere that is not the phone: printed and kept safely, or stored in your password manager. Losing a phone with two-factor enabled and no recovery codes is a genuinely difficult problem, and it locks people out of email accounts they depend on.",
          "Protect the **recovery email and phone number** on every important account with the same care as the account itself, because an attacker who can change them can reset everything. Check what those are set to on your main email account today — an old number you no longer control is a serious and common exposure.",
          "And understand the ordering: your **email account is the master key**, because almost every other service can be reset through it. If you secure one account to a high standard, make it your primary email. Two-factor on it, a unique strong password, correct recovery details, and ideally a passkey. Everything else inherits that protection.",
        ],
      },
      {
        heading: "Session theft: bypassing authentication entirely",
        body: [
          "Here is the part most awareness training omits, and it matters. When you log into a website, the server gives your browser a **session cookie** — a token proving you are authenticated, so you do not have to type your password on every page. That cookie is what actually grants access, and stealing it grants access too, **without ever needing your password or your second factor**.",
          "This is why a phishing page can succeed even against a two-factor account: the attacker proxies your login in real time, you enter both factors believing you are on the real site, and the attacker receives a valid session token. It is also why malware on a machine can steal active sessions from a browser, and why logging in on an untrusted or shared computer is genuinely risky in a way that 'being careful' does not fix.",
          "The practical defences are concrete. Check the **URL before entering credentials**, every time, because a proxied phishing site has a different address however real it looks. **Log out on shared machines** rather than closing the tab. **Do not log into important accounts on computers you do not control** — a business centre machine, a friend's laptop. And treat a sudden request to re-authenticate as a reason to type the address yourself rather than follow the link.",
        ],
      },
      {
        heading: "Social engineering: the attack that works",
        body: [
          "Social engineering is manipulation rather than technology, and it works because it exploits traits that are useful in every other context: helpfulness, urgency, deference to authority, and reluctance to seem difficult. The common patterns are consistent. **Urgency** — 'your account will be closed within an hour' — which suppresses the checking you would otherwise do. **Authority** — a message apparently from a bank, a network operator, or your boss. **Familiarity** — a WhatsApp message from a number using a relative's name and photograph, asking for a small favour.",
          "The specific asks are almost always one of three things: a **one-time code**, which is never legitimately requested by any real organisation and is the clearest signal of an attack; a **payment**, usually urgent and to an unfamiliar account; or **credentials**, via a link to a convincing fake login page. Learn those three and you will recognise the overwhelming majority of attempts, because the technique varies but the goal does not.",
          "The defence is a small set of habits rather than vigilance, because vigilance fails when you are tired. **Never share a one-time code with anyone, for any reason** — no bank, network or delivery company will ever ask. **Verify through a second channel**: if a message claims to be from your bank, call the number on your card rather than the one in the message. **Slow down deliberately** when anything is urgent, because urgency is itself the strongest indicator that something is wrong. And **check the sender and the link** before acting, not after.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor demonstrates each authentication method, enables two-factor correctly with recovery codes, shows a live session-cookie theft to explain why strong passwords are not enough, and walks through four real social-engineering attempts.",
      steps: [
        {
          step: "Show single-factor login",
          detail:
            "Log into an account with only a password and explain that password theft is cheap and common because passwords are reused and bought in bulk after breaches.",
        },
        {
          step: "Distinguish two-step from two-factor",
          detail:
            "Show two passwords versus a password plus a device code. Explain that only different kinds of factor count, and why the marketing phrase can mislead.",
        },
        {
          step: "Demonstrate an SMS code and explain SIM-swap",
          detail:
            "Enable SMS verification and explain how an attacker can move your number to their SIM. Conclude that it is worth enabling but not the best option.",
        },
        {
          step: "Set up an authenticator app",
          detail:
            "Scan the QR code and generate codes. Explain that nothing crosses a network, so there is nothing to intercept, which makes it strictly better than SMS.",
        },
        {
          step: "Show a passkey",
          detail:
            "Register a passkey and explain that it uses public-key cryptography, so there is no shared secret to phish. Note where support is still limited.",
        },
        {
          step: "Save the recovery codes",
          detail:
            "Display the backup codes and store them properly. Explain the lockout disaster that follows losing a phone with two-factor and no recovery codes.",
        },
        {
          step: "Audit recovery details",
          detail:
            "Check the recovery email and phone number on the main email account. Explain that an old number you no longer control is a serious exposure.",
        },
        {
          step: "Explain why email is the master key",
          detail:
            "Show that almost every other service resets through email. Conclude that this is the one account to secure to the highest standard.",
        },
        {
          step: "Demonstrate a session cookie",
          detail:
            "Show the session cookie in the browser after login and explain that this token, not the password, is what grants access on each page.",
        },
        {
          step: "Explain proxied phishing",
          detail:
            "Describe how a real-time proxy captures a valid session even with two-factor enabled. Emphasise checking the URL as the defence.",
        },
        {
          step: "Examine four social-engineering messages",
          detail:
            "Show a bank impersonation, a network-operator message, a WhatsApp relative scam and a fake payment alert. Identify the ask in each — code, payment or credentials.",
        },
        {
          step: "Practise the second-channel verification",
          detail:
            "Take one message and demonstrate calling the number on the card rather than the one in the message. Explain why this habit defeats most impersonation.",
        },
      ],
    },
    practice: {
      title: "Harden your own authentication and analyse four attacks",
      brief:
        "You secure your own most important accounts properly — two-factor with recovery codes saved, recovery details audited, unique passwords — then analyse four real social-engineering attempts, identifying the technique, the ask and the specific habit that defeats each.",
      steps: [
        "List your five most important accounts and identify which is your primary email.",
        "Check which of the three factors each account currently uses.",
        "Enable two-factor on your primary email first, preferring an authenticator app over SMS.",
        "Save the recovery codes somewhere that is not your phone, and confirm you can find them.",
        "Audit the recovery email and phone number on your primary email and correct anything stale.",
        "Enable two-factor on your remaining four important accounts.",
        "Confirm no password is reused across any of them, using a password manager.",
        "Record which method each account uses and note where a passkey is available.",
        "Collect four real social-engineering messages you or someone you know has received.",
        "For each, identify the technique used — urgency, authority or familiarity.",
        "For each, identify the ask: a code, a payment, or credentials.",
        "For each, state the specific habit that defeats it.",
        "Write the four habits as a list you could give to a non-technical relative.",
      ],
      standard:
        "Two-factor enabled on all five accounts with the primary email secured first, recovery codes saved off-device and verified findable, recovery details audited and corrected, no password reused, and all four attacks analysed by technique, ask and defeating habit with the habits written in plain language.",
    },
    pitfalls: [
      {
        problem: "You counted two passwords as two factors",
        fix: "Only different kinds of factor count — something you know, have or are. Two passwords are both 'something you know' and an attacker with one likely has both.",
      },
      {
        problem: "You enabled two-factor but did not save the recovery codes",
        fix: "Save them printed or in your password manager, not on the phone. Losing a phone with two-factor and no recovery codes locks you out of accounts you depend on.",
      },
      {
        problem: "Your recovery phone number is one you no longer control",
        fix: "Audit the recovery email and number on every important account, starting with your primary email. An attacker who can change them can reset everything else.",
      },
      {
        problem: "You assumed a strong password protects a two-factor account",
        fix: "Session tokens grant access without a password or a second factor. Check the URL before entering credentials, log out on shared machines, and never log into important accounts on computers you do not control.",
      },
      {
        problem: "You shared a one-time code to be helpful",
        fix: "Never share a code with anyone for any reason. No bank, network or delivery company will ever ask for one, and a request for a code is the clearest signal of an attack.",
      },
      {
        problem: "You relied on vigilance rather than habits",
        fix: "Vigilance fails when you are tired or busy. Build fixed habits — never share codes, verify through a second channel, slow down when anything is urgent — because those hold when attention does not.",
      },
      {
        problem: "You used SMS where an authenticator app was available",
        fix: "Prefer an app. SMS can be defeated by SIM-swap fraud, which is a documented problem in Nigeria. Enable SMS if that is all that is offered, but choose the app when you can.",
      },
    ],
    expertNotes: [
      "Secure your primary email account above everything else, because almost every other service can be reset through it. Two-factor, a unique password, correct recovery details and ideally a passkey — that one account protects everything downstream.",
      "Save recovery codes the moment you enable two-factor, and verify you can actually find them. The lockout that follows a lost phone with no recovery codes is one of the most common and most preventable security disasters.",
      "Treat any request for a one-time code as an attack, without exception. No legitimate organisation ever asks for one, so this single absolute rule defeats a very large share of real attempts with no judgement required.",
      "Check the URL before entering credentials, every time. It is the only reliable defence against proxied phishing, which defeats two-factor entirely, and it takes two seconds.",
    ],
    vocabulary: [
      {
        term: "Authentication factor",
        meaning:
          "A kind of proof: something you know, something you have, or something you are. Two different kinds make real two-factor.",
      },
      {
        term: "SIM-swap",
        meaning:
          "Fraud moving your phone number to an attacker's SIM, defeating SMS codes. Documented in Nigeria.",
      },
      {
        term: "Authenticator app",
        meaning:
          "Software generating codes locally with no network involvement, so nothing can be intercepted. Prefer it to SMS.",
      },
      {
        term: "Passkey",
        meaning:
          "A public-key credential with no shared secret, so there is nothing to phish. The strongest practical option where supported.",
      },
      {
        term: "Recovery code",
        meaning:
          "A one-time backup code for use when your second factor is unavailable. Save it off-device.",
      },
      {
        term: "Session cookie",
        meaning:
          "The token proving you are authenticated. Stealing it grants access without a password or second factor.",
      },
      {
        term: "Proxied phishing",
        meaning:
          "A real-time fake site relaying your login to the real one, capturing a valid session despite two-factor.",
      },
      {
        term: "Social engineering",
        meaning:
          "Manipulation exploiting helpfulness, urgency and authority rather than technical weakness.",
      },
    ],
    homework: [
      {
        task: "Secure your primary email to the highest standard",
        detail:
          "Two-factor via an app, a unique strong password, recovery codes saved off-device, recovery email and number audited, and a passkey if supported.",
      },
      {
        task: "Audit five accounts",
        detail:
          "For each, record what factors it uses, whether the password is unique, and what its recovery details are. Fix anything stale.",
      },
      {
        task: "Collect four real scam messages",
        detail:
          "From your own phone or family members'. Identify the technique, the ask and the defeating habit for each.",
      },
      {
        task: "Teach the four habits to one person",
        detail:
          "Never share codes, verify through a second channel, slow down when it is urgent, check the link. If they cannot repeat them, simplify until they can.",
      },
    ],
    rubric: [
      {
        criterion: "Factor understanding",
        passing: "Knows there are three factors.",
        excellent:
          "Distinguishes two-step from genuine two-factor and can explain why password theft is cheap while simultaneous device theft is not.",
      },
      {
        criterion: "Method selection",
        passing: "Has enabled two-factor somewhere.",
        excellent:
          "Chooses an authenticator app over SMS with reasoning, knows what a passkey offers, and understands the limits of biometrics.",
      },
      {
        criterion: "Recovery",
        passing: "Enabled two-factor.",
        excellent:
          "Recovery codes saved off-device and verified findable, recovery email and number audited, and the primary email secured first as the master key.",
      },
      {
        criterion: "Session awareness",
        passing: "Knows passwords matter.",
        excellent:
          "Explains how session theft and proxied phishing bypass strong authentication, and checks URLs and logs out on shared machines.",
      },
      {
        criterion: "Social engineering defence",
        passing: "Is generally cautious.",
        excellent:
          "Identifies urgency, authority and familiarity, recognises the three asks, and holds fixed habits rather than relying on vigilance.",
      },
    ],
    faqs: [
      {
        q: "Is SMS two-factor worth enabling if it can be SIM-swapped?",
        a: "Yes — enable it, because it stops the far more common attacks. But prefer an authenticator app wherever the account offers one, and protect your mobile account with a PIN or port-out protection, which most Nigerian networks now provide.",
      },
      {
        q: "What is a passkey and should I use one?",
        a: "A passkey replaces a password with public-key cryptography, so there is no secret to steal or phish. Use one on your most important accounts where supported. It is the strongest practical option available today and it is also more convenient than typing a password.",
      },
      {
        q: "I lost my phone with two-factor enabled. What do I do?",
        a: "Use the recovery codes you saved. If you did not save them, contact the service's support with identity evidence — which is slow and sometimes unsuccessful. This is exactly why saving recovery codes off-device is part of enabling two-factor, not an optional extra.",
      },
      {
        q: "Can a phishing attack really beat two-factor?",
        a: "Yes, through a real-time proxy that relays your login to the genuine site and captures the resulting session token. The defence is checking the URL before entering credentials, because the fake site's address differs however convincing the page looks.",
      },
      {
        q: "Someone asked me for the code sent to my phone. Is that ever legitimate?",
        a: "Never. No bank, network operator, delivery company or government agency will ever ask for a one-time code. A request for a code is the single clearest signal of an attack, and treating it as an absolute rule requires no judgement in the moment.",
      },
    ],
  },

  "passwords-and-account-security": {
    summary:
      "Passwords remain the foundation of almost everything, and most of what people believe about them is wrong. This session covers how they actually fail, why a password manager changes the entire problem, and how to secure the accounts that matter — including the practical account hygiene most people never do.",
    objectives: [
      "Explain how passwords are actually attacked, and what that means for your choices",
      "Use a password manager properly, including on a phone",
      "Construct memorable strong secrets and explain why length beats complexity",
      "Audit and fix reused and weak passwords across real accounts",
      "Secure high-value accounts: email, banking, social and business accounts",
      "Recognise breach notifications and respond correctly",
    ],
    blocks: [
      {
        heading: "How passwords actually fail",
        body: [
          "Understanding the attack tells you what to defend against, and the reality is different from the common belief. **Guessing and dictionary attacks** work against weak passwords — 'password', '123456', names, dates — and against predictable patterns like capitalising the first letter and appending a year. Automated tools test billions of candidates, so a short or patterned password falls quickly.",
          "But the most common real-world failure is not cracking at all: it is **reuse**. Attackers buy lists of email-and-password pairs leaked from breached services and simply try them everywhere — a technique called **credential stuffing**. If you use the same password on a forum that was breached in 2019 and on your bank, the forum breach becomes a bank breach. This is why uniqueness matters more than complexity, and it is the single most important idea in this session.",
          "The third vector is **phishing**, where you hand the password over believing the site is genuine, and the fourth is **malware** on an infected machine capturing what you type. Note that neither is defeated by a stronger password, which is why the earlier session's two-factor and URL checking matter alongside this one.",
        ],
      },
      {
        heading: "Length beats complexity, and why",
        body: [
          "The traditional advice — mix capitals, symbols and numbers, change it often — was based on a model of attacks that is largely obsolete, and it produces passwords that are hard to remember and easy to write down. What actually resists cracking is **length**, because each additional character multiplies the search space rather than adding to it. A twenty-character passphrase of ordinary words is vastly harder to crack than an eight-character string of symbols, and it is far easier to remember.",
          "So the guidance is: **let the password manager generate long random passwords** for every account, and never construct them yourself. Where you must memorise a secret — the manager's master password, or a device login — use a **passphrase** of several unrelated words, which is both long and memorable. 'correct horse battery staple' is the classic illustration, and the principle holds: unrelated words, several of them, no personal information.",
          "And **stop changing passwords on a schedule**. Forced rotation produces predictable variations — the same root with an incremented number — which is weaker than one strong password kept indefinitely. Change a password when there is a reason: a breach, a suspicion, or a shared secret that should no longer be shared. Otherwise leave it.",
        ],
      },
      {
        heading: "The password manager, which changes the whole problem",
        body: [
          "A password manager stores an encrypted vault of credentials, unlocked by one master passphrase, and fills them into sites automatically. It solves three problems at once: you can have a unique strong password everywhere because you never need to remember any of them; it autofills only on the correct domain, which is a genuine phishing defence because a fake site will not trigger it; and it can generate, audit and warn you about reuse.",
          "The **master passphrase** is now the single most important secret you hold, because it protects everything. Make it a long passphrase of unrelated words, memorise it, and never use it anywhere else. Enable two-factor on the vault itself. And make sure you have a recovery path — most managers provide an emergency kit or recovery key, and losing the master with no recovery is unrecoverable by design.",
          "Choose a reputable manager and enable its **sync** so your phone and computer share the vault, because a manager you do not have with you will not be used. The common objection — 'putting all my passwords in one place is risky' — inverts the real situation: your passwords are already all in one place, in your head, protected by the weakest of them. A manager makes them all strong and encrypts them at rest.",
        ],
      },
      {
        heading: "Auditing and fixing real accounts",
        body: [
          "An audit is concrete work, not a worry. Start with the manager's built-in audit, which flags reused and weak passwords, or work through your accounts by importance. The order is: **primary email** first, because it resets everything else; then **banking and payment**; then **social accounts**, which are targets for impersonation fraud against your contacts; then **business accounts** if you have them; then everything else over time.",
          "For each account, generate a new unique password in the manager, and enable two-factor where available. Where an account does not support a manager, use its own generator. Expect this to take an hour or two spread over a few sittings — that is normal, and it is a one-time cost that removes the entire category of credential-stuffing risk permanently.",
          "Then check whether your email appears in known breaches. Services such as Have I Been Pwned will tell you, and a hit is not a disaster but it is information: change that password everywhere it was used, and assume anything protected by it should be treated as compromised. Being told you were breached is far better than discovering it through a drained account.",
        ],
      },
      {
        heading: "Business accounts and shared access",
        body: [
          "Small businesses have additional exposures that individuals do not. **Shared passwords** — one login written on a note and used by everyone — mean you cannot tell who did what, you cannot revoke access for one person without changing it for everyone, and a departing employee keeps working access indefinitely. That last point is a genuine and common problem: staff leave with the social media login, the email password, or the bank app still installed on their phone.",
          "The fixes are practical. Give **each person their own account** wherever the service supports it, so access can be revoked individually. Where a single account is unavoidable, store it in a **shared vault** in a password manager rather than on a note, and change it when someone leaves. Use **two-factor on every business account**, and make sure the recovery details belong to the business owner rather than to a member of staff who might leave.",
          "Then apply the same discipline to **devices**: a machine leaving the business should have its accounts signed out and its data wiped, and staff should not be logging into business accounts on personal machines they control. None of this is sophisticated; it is the ordinary hygiene that most small businesses have never done, and doing it puts you ahead of nearly all of them.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor sets up a password manager from scratch, generates and stores credentials, runs the reuse audit, fixes a set of real accounts in priority order, and configures a small business's shared vault with per-person access.",
      steps: [
        {
          step: "Explain credential stuffing first",
          detail:
            "Show how a breached password list is tried across many services. Explain that this, not cracking, is the most common real failure and why uniqueness beats complexity.",
        },
        {
          step: "Demonstrate length versus complexity",
          detail:
            "Compare an eight-character complex password with a twenty-character passphrase and explain why length multiplies the search space while complexity only adds to it.",
        },
        {
          step: "Install and set up a password manager",
          detail:
            "Create the vault with a long unrelated-word master passphrase, enable two-factor on the vault, and save the recovery kit. Explain that this passphrase is now the most important secret you hold.",
        },
        {
          step: "Enable sync across devices",
          detail:
            "Connect the phone and the computer. Explain that a manager you do not carry will not be used, which defeats the purpose.",
        },
        {
          step: "Generate and store a password",
          detail:
            "Let the manager generate a long random password for a real account and store it. Explain that you should never construct passwords yourself again.",
        },
        {
          step: "Show the autofill phishing defence",
          detail:
            "Demonstrate that autofill triggers only on the correct domain. Explain that a convincing fake site will not trigger it, which is a real defence.",
        },
        {
          step: "Run the reuse audit",
          detail:
            "Open the manager's audit and show the reused and weak passwords it finds. Explain that this list is the actual work to be done.",
        },
        {
          step: "Fix the primary email first",
          detail:
            "Generate a new unique password, enable two-factor, and audit the recovery details. Explain that this account resets everything else so it goes first.",
        },
        {
          step: "Work through banking and social accounts",
          detail:
            "Fix each in priority order, enabling two-factor where available. Note that social accounts are targets for impersonation fraud against your contacts.",
        },
        {
          step: "Check for known breaches",
          detail:
            "Look up an email address in a breach-checking service and explain what a hit means: change that password everywhere and treat what it protected as compromised.",
        },
        {
          step: "Set up a business shared vault",
          detail:
            "Create a shared vault for a small business with per-person access, so access can be revoked individually. Explain why a shared note is a liability.",
        },
        {
          step: "Handle a departing employee",
          detail:
            "Demonstrate revoking one person's vault access and rotating the accounts they knew. Explain that staff leaving with live access is a common and preventable exposure.",
        },
      ],
    },
    practice: {
      title: "Set up a manager and fix your real accounts",
      brief:
        "You set up a password manager with a strong master passphrase and recovery, then audit and fix your real accounts in priority order — primary email, banking, social, business — generating unique passwords and enabling two-factor, and design a shared-vault arrangement for a small business.",
      steps: [
        "Write down what credential stuffing is and why uniqueness matters more than complexity.",
        "Choose a reputable password manager and create the vault.",
        "Set a master passphrase of several unrelated words, with no personal information.",
        "Enable two-factor on the vault itself and save the recovery kit somewhere safe.",
        "Enable sync between your phone and your computer.",
        "Run the manager's reuse and weakness audit and record what it finds.",
        "Fix your primary email: unique generated password, two-factor, recovery details audited.",
        "Fix your banking and payment accounts next, with two-factor on each.",
        "Fix your social accounts, noting why they matter for impersonation fraud.",
        "Fix any business accounts you hold.",
        "Check your email address against a breach-checking service and act on any hit.",
        "Continue through the remaining accounts until no reuse remains.",
        "Design a shared-vault arrangement for a small business with per-person access.",
        "Write the procedure for revoking access and rotating credentials when someone leaves.",
      ],
      standard:
        "A working manager with a strong master passphrase, vault two-factor and a saved recovery kit, synced across devices; the primary email, banking, social and business accounts fixed with unique generated passwords and two-factor; a breach check completed and acted on; and a written shared-vault and leaver procedure for a small business.",
    },
    pitfalls: [
      {
        problem: "You reuse one password across several services",
        fix: "This is the most common real failure. Attackers buy breached credential lists and try them everywhere, so one weak site compromises all of them. A password manager removes the entire problem.",
      },
      {
        problem: "You built a complex eight-character password and wrote it down",
        fix: "Length beats complexity, and a manager means you never need to remember it. A twenty-character generated password you cannot recall is stronger than a clever short one on a sticky note.",
      },
      {
        problem: "You change passwords on a schedule",
        fix: "Stop. Forced rotation produces predictable variations of the same root, which is weaker than one strong password kept indefinitely. Change for a reason — breach, suspicion, or a shared secret — not by calendar.",
      },
      {
        problem: "Your master passphrase is weak or reused",
        fix: "It protects everything now. Use several unrelated words, memorise it, and never use it anywhere else. Enable two-factor on the vault and save the recovery kit.",
      },
      {
        problem: "You enabled a manager but never sync it to your phone",
        fix: "A manager you do not carry will not be used, and you will fall back on a memorised password. Enable sync so the vault is with you wherever you log in.",
      },
      {
        problem: "Your business shares one login written on a note",
        fix: "Give each person their own account, or use a shared vault. A note means you cannot tell who did what, cannot revoke one person's access, and a departing employee keeps working access.",
      },
      {
        problem: "You ignored a breach notification",
        fix: "A hit means that password is in criminal hands. Change it everywhere it was used and treat what it protected as compromised. Being told is far better than discovering it through a drained account.",
      },
    ],
    expertNotes: [
      "Set up a password manager before doing anything else in this session, because every other password recommendation depends on it. Without one, unique strong passwords are simply not practical for a person with fifty accounts.",
      "Fix your primary email first, then banking, then social. That order reflects what an attacker does with each: email unlocks everything else, banking takes money, and social accounts are used to defraud your contacts in your name.",
      "Never construct a password yourself again. Let the manager generate long random ones, and reserve memorisable passphrases for the two or three secrets you genuinely must remember.",
      "Rotate credentials and revoke access when anyone leaves a business, without exception. Staff departing with live access to a social account or a bank app is a common and entirely preventable exposure, and it is usually discovered too late.",
    ],
    vocabulary: [
      {
        term: "Credential stuffing",
        meaning:
          "Trying breached email-and-password pairs across many services. The most common real-world password failure.",
      },
      {
        term: "Password manager",
        meaning:
          "An encrypted vault holding unique strong passwords, unlocked by one master passphrase. Also a phishing defence through domain-bound autofill.",
      },
      {
        term: "Master passphrase",
        meaning:
          "The single secret protecting the whole vault. Long, unrelated words, never reused anywhere.",
      },
      {
        term: "Passphrase",
        meaning:
          "A secret of several unrelated words. Long, memorable and far stronger than a short complex password.",
      },
      {
        term: "Recovery kit",
        meaning:
          "The manager's emergency access mechanism. Losing the master with no recovery is unrecoverable by design.",
      },
      {
        term: "Shared vault",
        meaning:
          "A manager vault a business shares with per-person access, so individuals can be revoked without changing everything.",
      },
      {
        term: "Breach notification",
        meaning:
          "Notice that a service you used was compromised, meaning that password is in criminal hands.",
      },
      {
        term: "Leaver procedure",
        meaning:
          "Revoking access and rotating credentials when someone leaves. The control most small businesses lack.",
      },
    ],
    homework: [
      {
        task: "Set up your password manager",
        detail:
          "Vault created, strong master passphrase, two-factor on the vault, recovery kit saved, and sync enabled on your phone. Do this before anything else.",
      },
      {
        task: "Fix your top five accounts",
        detail:
          "Primary email, banking, payment, and two social accounts: unique generated passwords, two-factor enabled, recovery details audited.",
      },
      {
        task: "Run the reuse audit and clear it",
        detail:
          "Work through what the manager reports until no reuse remains. Spread it over a few sittings if needed — this is a one-time cost.",
      },
      {
        task: "Write a leaver procedure for one business",
        detail:
          "List every account a departing employee could access and the steps to revoke and rotate each. Most small businesses have never written this.",
      },
    ],
    rubric: [
      {
        criterion: "Attack understanding",
        passing: "Knows weak passwords are risky.",
        excellent:
          "Explains credential stuffing as the dominant real failure, and why uniqueness matters more than complexity and why length beats it.",
      },
      {
        criterion: "Manager setup",
        passing: "Has installed a manager.",
        excellent:
          "Strong master passphrase, vault two-factor enabled, recovery kit saved, and sync working across phone and computer.",
      },
      {
        criterion: "Audit and remediation",
        passing: "Has changed some passwords.",
        excellent:
          "Ran the reuse audit, fixed accounts in priority order starting with primary email, and enabled two-factor throughout.",
      },
      {
        criterion: "Breach response",
        passing: "Is aware breaches happen.",
        excellent:
          "Checked against a breach service, acted on any hit by changing that password everywhere, and understands what a hit implies.",
      },
      {
        criterion: "Business hygiene",
        passing: "Understands shared passwords are bad.",
        excellent:
          "Designed a shared vault with per-person access and written a leaver procedure covering revocation and rotation.",
      },
    ],
    faqs: [
      {
        q: "Is it safe to put all my passwords in one app?",
        a: "Your passwords are already all in one place — your head — protected by the weakest of them. A manager encrypts them at rest with a key only you hold, makes every one of them strong, and adds domain-bound autofill that resists phishing. It is strictly safer than the alternative.",
      },
      {
        q: "What if I forget my master passphrase?",
        a: "Use the recovery kit or emergency access you set up. Without it, the vault is unrecoverable by design — that is the point of end-to-end encryption. This is why saving the recovery kit is part of setup rather than an optional extra.",
      },
      {
        q: "Should I still change my passwords regularly?",
        a: "No. Scheduled rotation produces predictable variations of the same root, which is weaker than one strong password kept indefinitely. Change a password when there is a reason — a breach, a suspicion, or a shared secret that should no longer be shared.",
      },
      {
        q: "How do I create a good master passphrase?",
        a: "Several unrelated words, none of them personal, no common phrase from a song or a proverb. It should be long enough to be strong and memorable enough that you will not write it down. Do not use it anywhere else, ever.",
      },
      {
        q: "My business has one login everyone uses. Is that acceptable?",
        a: "It is common and it is a genuine liability: you cannot tell who did what, you cannot revoke one person without changing it for everyone, and someone who leaves keeps working access. Move to per-person accounts where possible, otherwise a shared vault plus rotation on every departure.",
      },
    ],
  },
};
