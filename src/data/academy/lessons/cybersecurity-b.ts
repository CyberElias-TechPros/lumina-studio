import type { SessionLecture } from "../types";

/**
 * Cybersecurity — ₦25,000 · 4 weeks · 8 sessions.
 * Sessions 4 to 6. (Sessions 1–3 in cybersecurity.ts, 7–8 in cybersecurity-c.ts.)
 */
export const cybersecurityLessonsB: Record<string, SessionLecture> = {
  "phishing-scams-malware": {
    summary:
      "The three attacks that cause almost all real losses in Nigeria: phishing and impersonation, the scams built on them, and the malware that arrives through both. This session teaches you to recognise each in seconds, respond correctly when you have already clicked, and remove an infection properly.",
    objectives: [
      "Recognise phishing across email, SMS, WhatsApp and voice",
      "Identify the specific scams targeting Nigerians and what each asks for",
      "Explain how malware is delivered and what each family actually does",
      "Respond correctly in the minutes after a suspected compromise",
      "Remove malware properly and know when removal is not enough",
      "Build the habits that make these attacks fail",
    ],
    blocks: [
      {
        heading: "Phishing across every channel",
        body: [
          "Phishing is a message designed to make you act before you think, and it arrives in every format. **Email** phishing uses urgency and impersonation — a bank warning, a delivery failure, an invoice. **SMS** phishing carries a link and a claim that something needs your attention. **WhatsApp** is where most Nigerian phishing actually happens, because it arrives from a number that looks plausible, often with a familiar name and photograph, and the medium itself signals trust.",
          "The tells are consistent across all of them. **Urgency** — a deadline of minutes or hours, which exists only to suppress the checking you would normally do. **An unexpected request** — nobody was expecting this message, and that is precisely why it works. **A request for a code, a payment or credentials**, which are the only three things an attacker actually wants. **A link whose destination differs from its text** — hover or long-press to see where it really goes. And **subtle sender errors**: a domain one character off, a number that is not the organisation's, a display name that does not match the address.",
          "Voice phishing deserves separate mention because it is under-recognised. A caller claiming to be from your bank, your network operator or the police, speaking confidently and creating urgency, is more persuasive than any email. The defence is identical and simple: **hang up and call back on a number you obtained independently** — from your card, your bill, or the organisation's official site. No legitimate caller has any objection to that.",
        ],
      },
      {
        heading: "The scams you will actually meet",
        body: [
          "**SIM-swap fraud** begins with an attacker gathering enough about you to convince your network to move your number to their SIM. Once they hold your number, every SMS one-time code goes to them, and account takeovers follow quickly. The defence is a **port-out PIN or account PIN** on your mobile account — most Nigerian networks offer one and most people have never set it. This is a five-minute action that closes a serious hole.",
          "**Fake payment alerts** target businesses: a forged transfer notification arrives, apparently genuine, and goods are released before the money is checked. The rule is absolute — **verify in your own banking app, never from a screenshot or an SMS**, because both are trivially forged. **One-time-code requests** arrive posing as a bank, a network or a delivery firm; no legitimate organisation ever asks for a code, so treat any such request as an attack without analysis.",
          "**Impersonation of someone you know** is the most effective, because it defeats suspicion entirely — a WhatsApp message from 'your sister' with her photograph asking for urgent help, or 'your boss' asking for a favour. The defence is verification through a **second channel**: call the person on the number you already have. And **romance and investment scams** run long, building trust over weeks before asking for money; the marker is not the story but that money is eventually requested, always urgently, always to an unfamiliar account.",
        ],
      },
      {
        heading: "Malware: how it arrives and what it does",
        body: [
          "In Nigeria, malware most often arrives through **pirated software** — a cracked activation tool, a 'free' licensed program, a modified installer. This is the dominant route and it is worth being blunt about with clients: the activation crack that saves a licence fee routinely carries a payload that costs far more. Attachments and downloaded files are the second route, and malicious browser extensions the third.",
          "The families matter because the response differs. **Ransomware** encrypts your files and demands payment — the only real defence is a backup, because paying does not guarantee recovery and marks you as someone who pays. **Infostealers** silently harvest saved browser passwords, cookies and wallet keys, which is why a session token can be stolen without any password being guessed. **Spyware and keyloggers** record what you type. **Banking trojans** intercept and modify transactions. And **cryptominers** simply consume your machine, making it slow and hot — which is often how they are noticed.",
          "The signs of infection are worth memorising: unexplained slowness, a fan running constantly at idle, browser redirects or a changed homepage, new toolbars or extensions you did not install, pop-ups, passwords that stop working, and contacts reporting strange messages from your accounts. Any of these is a reason to stop using the machine for anything sensitive until it is checked.",
        ],
      },
      {
        heading: "The first hour after a suspected compromise",
        body: [
          "The response in the first hour determines how bad the outcome is, and it has a fixed order. **Disconnect** — take the machine off the network, or if it is an account, stop using it. This limits what an active attacker can do. **From a different, clean device**, change the password on the affected account and on your primary email, because email resets everything else. **Enable or reset two-factor**, since an attacker may have added their own.",
          "Then **revoke active sessions** — most email and social services list logged-in devices and let you sign all of them out, which defeats an attacker holding a stolen session token even after a password change. **Check the recovery details**, because changing the recovery email or phone number is one of the first things an attacker does and it locks you out later. **Notify the bank immediately** if money is involved, and report to the platform.",
          "In Nigeria, report fraud to the relevant platform and to the police, and consider the **EFCC** for financial fraud. Reporting rarely recovers money on its own, but it creates a record, which matters for any bank claim, and it contributes to the data that makes these operations harder. Finally, **tell the people who might be affected** — if your social account was used to message your contacts, they need to know to ignore it.",
        ],
      },
      {
        heading: "Removing malware, honestly assessed",
        body: [
          "Run a full scan with Windows Defender and a reputable second-opinion scanner, in **Safe Mode** where possible so active malware is not running to defend itself. Remove what is found, then check the places persistence hides: startup entries, scheduled tasks, browser extensions, and recently installed programs sorted by date.",
          "But be honest about what cleaning achieves, because this is where technicians overclaim. Scanners remove what they detect; they cannot guarantee that everything is gone, and **infostealers have already sent your credentials the moment they ran** — removing the malware afterwards does not un-send them. So the correct sequence after any real infection is: remove it, then **change every password stored in that browser** and revoke sessions, because you must assume they were taken.",
          "For a serious infection, and always for a machine used for banking or business, the honest recommendation is a **clean reinstall** — which session seven of Computer Repairs covers in full. A cleaned machine is probably fine; a reinstalled machine is known to be fine. Recover the data first, verify the copy, then install clean. Where the customer handles money, 'probably' is not an acceptable standard, and saying so is the responsible advice even though it is more work.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor examines real phishing messages across four channels, walks through the specific Nigerian scams, shows how malware arrives, then runs a full incident response on a simulated compromise and a proper malware removal.",
      steps: [
        {
          step: "Examine an email phish",
          detail:
            "Show a bank impersonation email and identify the urgency, the mismatched sender domain and the link destination. Hover to reveal where the link actually goes.",
        },
        {
          step: "Examine an SMS phish",
          detail:
            "Show a delivery-failure message with a link. Explain that the claim of an expected parcel is what makes it persuasive, and that the domain gives it away.",
        },
        {
          step: "Examine a WhatsApp impersonation",
          detail:
            "Show a message from a familiar name and photograph with a different number. Explain that the medium signals trust, which is why this is the most effective channel in Nigeria.",
        },
        {
          step: "Demonstrate voice phishing defence",
          detail:
            "Role-play a confident caller claiming to be a bank. Then hang up and call the number on the card, explaining that no legitimate caller objects to that.",
        },
        {
          step: "Walk the SIM-swap attack",
          detail:
            "Explain how an attacker moves your number and then receives every SMS code. Then set a port-out PIN on a mobile account and explain that most people have never done this.",
        },
        {
          step: "Examine a fake payment alert",
          detail:
            "Show a forged transfer notification and verify it in the bank app, where it does not exist. Explain that screenshots and SMS are trivially forged and never evidence of payment.",
        },
        {
          step: "Show how malware arrives",
          detail:
            "Examine a pirated-software installer and explain that the activation crack is the delivery mechanism. Be blunt that this is the dominant route in Nigeria.",
        },
        {
          step: "Identify infection signs",
          detail:
            "List the symptoms on a live machine: unexplained slowness, a fan at idle, a changed homepage, an unknown extension. Explain that any one of these justifies stopping sensitive use.",
        },
        {
          step: "Run the first-hour response",
          detail:
            "Disconnect, change the password and the primary email password from a clean device, reset two-factor, and revoke all active sessions. Explain why session revocation is essential.",
        },
        {
          step: "Audit the recovery details",
          detail:
            "Check the recovery email and phone on the affected account and explain that attackers change these early, which locks the real owner out later.",
        },
        {
          step: "Scan and remove malware",
          detail:
            "Boot to Safe Mode, run a full scan with two tools, then check startup entries, scheduled tasks and extensions where persistence hides.",
        },
        {
          step: "Make the honest recommendation",
          detail:
            "Explain that infostealers have already transmitted any credentials, so every stored password must change, and that a banking machine should be reinstalled rather than cleaned.",
        },
      ],
    },
    practice: {
      title: "Recognise, respond, and recover",
      brief:
        "You analyse real phishing attempts across four channels, set a port-out PIN on your mobile account, then run a complete incident response on a simulated compromise and a full malware removal — including the credential changes and session revocations that follow.",
      steps: [
        "Collect four real phishing messages: one email, one SMS, one WhatsApp, one voice attempt described.",
        "For each, identify the channel, the urgency mechanism and the specific tell that gives it away.",
        "For each, state the ask — a code, a payment or credentials.",
        "Write the three-ask rule as a single line you could teach a relative.",
        "Describe the SIM-swap attack and what it enables once your number is moved.",
        "Set a port-out or account PIN on your mobile account and confirm it is active.",
        "Describe the fake-payment-alert scam and the verification rule that defeats it.",
        "Write the first-hour response sequence in order, from disconnection onward.",
        "Practise revoking active sessions on your email and social accounts and note where the option lives.",
        "Audit the recovery email and phone number on your primary email and correct anything stale.",
        "Boot a test machine to Safe Mode and run a full scan with two tools.",
        "Check startup entries, scheduled tasks, browser extensions and recently installed programs.",
        "List every password stored in that machine's browser and change them all.",
        "State in writing when you would recommend a clean reinstall instead of a cleanup, and why.",
      ],
      standard:
        "Four real attempts analysed by channel, urgency mechanism, tell and ask; a port-out PIN confirmed active; the first-hour response sequence written in correct order including session revocation and recovery-detail audit; a Safe Mode scan completed with persistence locations checked; and a written statement of when reinstall beats cleanup.",
    },
    pitfalls: [
      {
        problem: "You judged a message by its appearance",
        fix: "Judge it by the ask. Any message requesting a code, a payment or credentials is an attack however genuine it looks, because no legitimate organisation asks for those by message.",
      },
      {
        problem: "You clicked the link to see where it went",
        fix: "Hover or long-press to preview the destination without visiting it. Visiting can be enough to confirm your number is live or, in some cases, to begin an attack.",
      },
      {
        problem: "You trusted a payment screenshot or SMS",
        fix: "Verify in your own banking app, always. Both are trivially forged, and releasing goods against a fake alert is one of the most common losses Nigerian businesses suffer.",
      },
      {
        problem: "You never set a port-out PIN on your mobile account",
        fix: "Set it today. SIM-swap fraud defeats every SMS one-time code you have, and this five-minute action closes the hole. Most people have never done it.",
      },
      {
        problem: "You changed the password but did not revoke sessions",
        fix: "An attacker holding a session token keeps access after a password change. Sign out all active sessions from a clean device — it is the step most people miss.",
      },
      {
        problem: "You cleaned the malware and considered it resolved",
        fix: "An infostealer already transmitted whatever it harvested. Change every password stored in that browser and revoke sessions, because you must assume they were taken.",
      },
      {
        problem: "You installed software from a pirated source",
        fix: "The activation crack is the dominant malware route in Nigeria. The licence fee it saves is far smaller than what the payload costs, and telling clients this plainly is part of the service.",
      },
    ],
    expertNotes: [
      "Judge every unsolicited message by what it asks for, not by how it looks. The three asks — a code, a payment, credentials — are the whole game, and this rule requires no technical knowledge to apply under pressure.",
      "Set a port-out PIN on your mobile account and on every client's and relative's you can reach. It is the highest-value five-minute action available against SIM-swap fraud, and almost nobody has done it.",
      "Revoke active sessions after any password change, from a clean device. It is the step most people omit, and without it an attacker holding a stolen session keeps working regardless of your new password.",
      "Assume credentials were taken after any real infection, and change everything stored in that browser. Cleaning the machine does not un-send what an infostealer already transmitted, and pretending otherwise is how a technician gets called back.",
    ],
    vocabulary: [
      { term: "Phishing", meaning: "A message engineered to prompt action before thought. Judged by what it asks for, not how it looks." },
      { term: "SIM-swap", meaning: "Fraud moving your number to an attacker's SIM, capturing every SMS code. Defeated by a port-out PIN." },
      { term: "Port-out PIN", meaning: "A PIN on your mobile account required before your number can be moved. The key control against SIM-swap." },
      { term: "Fake payment alert", meaning: "A forged transfer notification. Verified only in your own banking app, never from a screenshot or SMS." },
      { term: "Ransomware", meaning: "Malware encrypting files for payment. Backups are the only reliable defence; paying does not guarantee recovery." },
      { term: "Infostealer", meaning: "Malware harvesting saved passwords and cookies. Removal does not un-send what it already transmitted." },
      { term: "Session revocation", meaning: "Signing out all logged-in devices. Essential after a password change, because a stolen token survives it." },
      { term: "Persistence", meaning: "Where malware survives a restart: startup entries, scheduled tasks, extensions. Checked during removal." },
    ],
    homework: [
      {
        task: "Set a port-out PIN today",
        detail:
          "On your own mobile account, then help two family members set theirs. It is the single highest-value action in this session and it takes five minutes each.",
      },
      {
        task: "Collect and analyse four real attempts",
        detail:
          "One each from email, SMS, WhatsApp and voice. Identify the urgency mechanism, the tell and the ask for each.",
      },
      {
        task: "Write the first-hour response card",
        detail:
          "Disconnect, change passwords from a clean device, reset two-factor, revoke sessions, audit recovery details, notify the bank, report. Keep it where you can reach it fast.",
      },
      {
        task: "Teach the three-ask rule",
        detail:
          "Explain to one non-technical person that any message asking for a code, a payment or credentials is an attack. If they cannot repeat it, simplify it.",
      },
    ],
    rubric: [
      {
        criterion: "Recognition",
        passing: "Is suspicious of odd messages.",
        excellent: "Identifies urgency, the mismatched sender and the link destination across all four channels, and judges by the ask rather than the appearance.",
      },
      {
        criterion: "Scam knowledge",
        passing: "Knows scams exist.",
        excellent: "Explains SIM-swap, fake payment alerts, code requests and impersonation, with the specific control that defeats each.",
      },
      {
        criterion: "Preventive action",
        passing: "Is generally careful.",
        excellent: "Port-out PIN set and confirmed, verification-in-app as an absolute rule, and no software from pirated sources.",
      },
      {
        criterion: "Incident response",
        passing: "Would change a password.",
        excellent: "Follows the full first-hour sequence in order from a clean device, including session revocation and a recovery-detail audit.",
      },
      {
        criterion: "Malware handling",
        passing: "Runs a scan.",
        excellent: "Scans in Safe Mode, checks persistence locations, changes every stored password, and states clearly when a reinstall is the correct answer.",
      },
    ],
    faqs: [
      {
        q: "I clicked a phishing link but entered nothing. Am I compromised?",
        a: "Usually not, if you entered no credentials and downloaded nothing. Change any password you may have used there as a precaution, run a scan, and check your accounts for unusual activity. The real risk begins when you enter something or download a file.",
      },
      {
        q: "How do I stop SIM-swap fraud?",
        a: "Set a port-out or account PIN with your network today, limit how much personal detail you publish, and prefer authenticator apps over SMS codes for important accounts. If your phone suddenly loses signal unexpectedly, treat it as a possible swap and act immediately.",
      },
      {
        q: "Someone sent me a payment screenshot but my app shows nothing. What do I do?",
        a: "Do not release anything. Verify only in your own banking app — screenshots and SMS alerts are trivially forged and are the basis of one of the most common frauds against Nigerian businesses. If it is not in your app, you have not been paid.",
      },
      {
        q: "My machine has malware. Is a scan enough?",
        a: "A scan removes what it detects but cannot guarantee the machine is clean, and any infostealer has already transmitted what it harvested. Change every stored password, revoke sessions, and for a machine used for banking or business, do a clean reinstall rather than a cleanup.",
      },
      {
        q: "Should I pay a ransomware demand?",
        a: "Generally no. Payment does not guarantee recovery, it funds the operation, and it marks you as someone who pays. Restore from your backup — which is why backups are the first control in this entire course. If there is no backup, seek specialist advice before deciding.",
      },
    ],
  },

  "networks-and-wifi-security": {
    summary:
      "The network is where a lot of security quietly fails — an open Wi-Fi, a default router password, a guest who never left. This session covers how home and small-office networks actually work, how they are attacked, and how to configure one properly.",
    objectives: [
      "Explain how a home or small-office network is put together",
      "Identify the default settings that create the most common exposures",
      "Configure a router securely, including Wi-Fi encryption and guest access",
      "Understand what is and is not safe on public Wi-Fi",
      "Explain how a firewall works and what it does not do",
      "Assess and remediate a real small-business network",
    ],
    blocks: [
      {
        heading: "How the network is actually built",
        body: [
          "A typical Nigerian home or small-office network has one device doing several jobs. The **router** connects your local network to the internet and decides where traffic goes. It usually contains a **switch**, giving wired ports, and a **Wi-Fi access point**, giving wireless. It also runs **DHCP**, which hands out local addresses automatically, and **NAT**, which lets all your devices share the single public address your provider gave you.",
          "Understand the two address spaces, because the distinction matters. **Private addresses** — the 192.168.x.x range most routers use — exist only inside your network and are how your devices talk to each other. Your **public address** is what the internet sees. NAT is the boundary between them, and it is the reason a device on your network is not directly reachable from outside by default — which is a genuine, if unglamorous, security benefit.",
          "This model explains most network security advice. A device on your local network can reach every other device on it, which is why an infected laptop is a risk to the printer and the phone. A guest on your Wi-Fi is inside that boundary, which is why guest access matters. And anything reachable from the internet is reachable by anyone who finds it, which is why port forwarding and remote administration deserve suspicion.",
        ],
      },
      {
        heading: "Default settings: where most exposure lives",
        body: [
          "Routers ship configured for convenience, not security, and the defaults are the single largest source of home and small-business network exposure. The **admin password** is printed on a sticker and is the same on every unit of that model, so anyone who knows the model knows how to get in — and once inside, they can redirect traffic, change DNS, or open the network. Changing it is the first and most important action.",
          "The **Wi-Fi password** is likewise on the sticker, visible to anyone who sees the router, and often shared freely with visitors who never leave. **WPS** — the push-button pairing feature — has known weaknesses and should be disabled. **Remote administration** lets the router be configured from the internet, which almost nobody needs and which should be off. **UPnP** lets devices open ports on the router automatically, which is convenient and which malware also uses.",
          "Then the firmware, which is the operating system of the router and which almost nobody updates. Router firmware vulnerabilities are well documented and are actively exploited, and an unpatched router with a default password is one of the easiest targets on the internet. Checking for a firmware update is a five-minute task that belongs in every network assessment.",
        ],
      },
      {
        heading: "Configuring it properly",
        body: [
          "The configuration that matters, in order. **Change the admin password** to something strong and unique. **Use WPA2-AES or WPA3** for Wi-Fi encryption — WEP and WPA-TKIP are broken and should never be selected; if a device will only connect with WEP, that device is the problem. **Set a strong Wi-Fi passphrase**, and change it when someone who had it should no longer have access, which is the part everyone forgets.",
          "**Disable WPS, remote administration and UPnP** unless there is a specific reason for each. **Set up a guest network** for visitors, which isolates them from your own devices — this is genuinely valuable in a business where customers, delivery people and contractors all ask for the Wi-Fi. **Rename the network** to something that does not identify you or your router model, and **do not broadcast** anything unnecessarily.",
          "For a business, two more things. **Separate the networks** you can: staff devices, guest access, and any payment or point-of-sale equipment should not share a network with a visitor's phone. And **write down the configuration** — the admin credentials in a password manager, the Wi-Fi passphrase, what was disabled and why — because the next person to work on it will otherwise guess.",
        ],
      },
      {
        heading: "Public Wi-Fi: what is actually risky",
        body: [
          "The danger of public Wi-Fi is usually overstated and occasionally understated, so be precise. The real risk is that you are on a network other people control, alongside other people you do not know. **Encrypted traffic is largely safe** — and almost everything is encrypted now, because HTTPS is universal — so a site using HTTPS protects your data even on a hostile network.",
          "The genuine risks are specific. **A fake access point** — someone broadcasting a network named after the café or airport, which your device may join automatically, putting a stranger between you and everything. **Unencrypted traffic**, which still exists in older apps and some protocols, is readable by anyone on the network. **Device sharing** — if your laptop has file sharing or network discovery enabled, others on the network may reach it. And **captive-portal pages** that appear before you connect can be imitated to harvest credentials.",
          "The practical rules: **turn off automatic joining** of open networks; **turn on the firewall** and disable file and printer sharing before connecting; **use a VPN** on public Wi-Fi, which encrypts everything to a server you trust and neutralises most of the risk; and **never log into anything sensitive** — banking especially — on a network you do not control, because a convincing fake access point defeats the URL check you would otherwise rely on.",
        ],
      },
      {
        heading: "Firewalls, and what they do not do",
        body: [
          "A **firewall** controls which connections are allowed, based on rules about direction, port and address. Your operating system has one built in, and your router is effectively one because NAT blocks unsolicited inbound connections by default. Both are worth having and neither is dramatic.",
          "Understand what a firewall does not do, because the misconception is common and costly. It does **not** protect you from phishing — a firewall happily permits your own outbound connection to a fake banking site. It does **not** stop malware arriving through something you downloaded or an attachment you opened, because you initiated that connection. And it does **not** protect against a weak password, a reused credential, or someone you gave the Wi-Fi passphrase to.",
          "This is why the honest summary is that a firewall is necessary and insufficient. The controls that actually prevent most losses are the ones from the earlier sessions: two-factor authentication, unique passwords, backups, and not opening what you did not expect. A client who buys a firewall and does none of those has spent money on the wrong risk, and part of your job is saying so.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor assesses a real small-business network, finds its default-configuration exposures, reconfigures the router properly with a guest network, demonstrates the public Wi-Fi risks and the VPN defence, and shows what a firewall does and does not stop.",
      steps: [
        {
          step: "Map the network",
          detail:
            "Identify the router, the switch ports, the access point, and the connected devices. Explain the two address spaces and what NAT is doing at the boundary.",
        },
        {
          step: "Find the router's default credentials",
          detail:
            "Show the sticker with the model's standard admin password. Explain that anyone knowing the model can log in and reconfigure the whole network.",
        },
        {
          step: "Change the admin password",
          detail:
            "Set a strong unique password and store it in a password manager. Explain that this is the single highest-value network action.",
        },
        {
          step: "Check the Wi-Fi encryption",
          detail:
            "Show the security setting and confirm WPA2-AES or WPA3. Explain that WEP and WPA-TKIP are broken and that a device requiring them is the problem.",
        },
        {
          step: "Set a strong Wi-Fi passphrase",
          detail:
            "Replace the sticker default. Explain that the passphrase must be changed when anyone who had it should no longer have access.",
        },
        {
          step: "Disable WPS, remote admin and UPnP",
          detail:
            "Turn each off and explain the specific risk each creates. Note that UPnP is used by malware to open ports automatically.",
        },
        {
          step: "Set up a guest network",
          detail:
            "Enable and configure an isolated guest SSID. Explain why this matters in a business where customers and contractors all request Wi-Fi.",
        },
        {
          step: "Check for a firmware update",
          detail:
            "Look for an update and apply it. Explain that router firmware vulnerabilities are documented and actively exploited, and almost nobody patches.",
        },
        {
          step: "Demonstrate automatic Wi-Fi joining",
          detail:
            "Show a device joining an open network automatically and explain how a fake access point exploits this. Then disable automatic joining.",
        },
        {
          step: "Show file sharing exposure",
          detail:
            "Display what the machine exposes on a network, then disable file and printer sharing and confirm the firewall is on.",
        },
        {
          step: "Demonstrate a VPN on public Wi-Fi",
          detail:
            "Connect a VPN and explain that it encrypts everything to a trusted server, neutralising most public-network risk.",
        },
        {
          step: "Show what a firewall does not stop",
          detail:
            "Navigate to a fake banking page with the firewall enabled. Explain that it permits your own outbound connections, so it does nothing against phishing.",
        },
      ],
    },
    practice: {
      title: "Assess and secure a real network",
      brief:
        "You assess a real home or small-business network, document every default-configuration exposure, reconfigure the router to a secure standard with a guest network, and write a plain-language configuration record plus a public Wi-Fi policy.",
      steps: [
        "Map the network: router, switch, access point, and the devices connected to it.",
        "Record the router model and check whether the admin password is still the sticker default.",
        "Change the admin password to a strong unique one and store it in a password manager.",
        "Confirm the Wi-Fi encryption is WPA2-AES or WPA3, and change it if not.",
        "Set a strong Wi-Fi passphrase replacing any default.",
        "Disable WPS, remote administration and UPnP, noting the reason for each.",
        "Check for and apply any router firmware update.",
        "Enable an isolated guest network for visitors.",
        "Rename the network so it does not identify the owner or the router model.",
        "On a laptop, disable file and printer sharing and confirm the firewall is enabled.",
        "Disable automatic joining of open Wi-Fi networks on the devices you control.",
        "Write a configuration record: credentials location, passphrase, what was disabled and why.",
        "Write a short public Wi-Fi policy covering VPN, automatic joining and sensitive logins.",
      ],
      standard:
        "A network with a non-default admin password, WPA2-AES or WPA3 encryption, a strong Wi-Fi passphrase, WPS and remote administration and UPnP disabled, firmware current, an isolated guest network enabled, device sharing disabled, and both a written configuration record and a public Wi-Fi policy in plain language.",
    },
    pitfalls: [
      {
        problem: "The router admin password is still the sticker default",
        fix: "Change it first. Anyone who knows the model knows the password, and inside the router an attacker can redirect traffic, change DNS or open the network entirely.",
      },
      {
        problem: "You are using WEP or WPA-TKIP",
        fix: "Both are broken and can be cracked quickly. Use WPA2-AES or WPA3. If a device only connects with WEP, that device is the problem and should be replaced or isolated.",
      },
      {
        problem: "You left WPS and remote administration enabled",
        fix: "Disable both. WPS has known weaknesses and remote administration exposes the router's configuration to the internet for no benefit most people need.",
      },
      {
        problem: "You never update the router firmware",
        fix: "Check for updates as part of every assessment. Router firmware vulnerabilities are documented and actively exploited, and an unpatched router with default credentials is among the easiest targets online.",
      },
      {
        problem: "Visitors share your main Wi-Fi",
        fix: "Enable an isolated guest network. Anyone on your main network can reach every other device on it, which in a business means customers alongside your payment terminal.",
      },
      {
        problem: "You rely on a firewall to protect against phishing",
        fix: "A firewall permits your own outbound connections, including to a fake banking site. Two-factor, unique passwords, backups and scepticism are what actually prevent the common losses.",
      },
      {
        problem: "You log into banking on public Wi-Fi",
        fix: "Do not. A fake access point defeats the URL check you rely on. Use a VPN for general browsing, and avoid sensitive logins on networks you do not control.",
      },
    ],
    expertNotes: [
      "Change the router admin password before anything else, on every network you touch. It is the highest-value single action in this session and it takes two minutes.",
      "Set up a guest network on every business network, even a one-person one. Isolating visitors from your own devices costs nothing and removes an entire category of exposure that most small businesses never considered.",
      "Write down the configuration in a password manager, including what you disabled and why. The next person to work on the network will otherwise re-enable things, and a documented baseline is what makes future troubleshooting fast.",
      "Tell clients plainly that a firewall does not stop phishing. The misconception that buying a security product makes them safe is expensive, and correcting it is part of the service rather than a sales obstacle.",
    ],
    vocabulary: [
      { term: "Router", meaning: "The device connecting a local network to the internet and directing traffic. Usually also a switch and access point." },
      { term: "NAT", meaning: "Network address translation, letting many devices share one public address. Also the default barrier to unsolicited inbound connections." },
      { term: "DHCP", meaning: "The service handing out local addresses automatically to devices joining the network." },
      { term: "WPA2-AES / WPA3", meaning: "The Wi-Fi encryption standards to use. WEP and WPA-TKIP are broken and must never be selected." },
      { term: "WPS", meaning: "Push-button Wi-Fi pairing with known weaknesses. Disable it." },
      { term: "UPnP", meaning: "A protocol letting devices open router ports automatically. Convenient, and used by malware. Disable unless required." },
      { term: "Guest network", meaning: "An isolated SSID for visitors, keeping them away from your own devices. Essential in any business." },
      { term: "VPN", meaning: "An encrypted tunnel to a trusted server. The main defence on public Wi-Fi, neutralising most of its risks." },
    ],
    homework: [
      {
        task: "Secure your own router",
        detail:
          "Admin password changed, WPA2-AES or WPA3 confirmed, strong Wi-Fi passphrase, WPS and remote admin and UPnP disabled, firmware updated, guest network enabled.",
      },
      {
        task: "Assess one business network",
        detail:
          "Document every default-configuration exposure you find and present the fixes in priority order. Most small businesses have never had this done.",
      },
      {
        task: "Configure a device for public Wi-Fi",
        detail:
          "Disable automatic joining, disable file and printer sharing, confirm the firewall, and install a VPN. Note how long it takes — it is under ten minutes.",
      },
      {
        task: "Write a one-page network record",
        detail:
          "Model, credentials location, Wi-Fi passphrase, encryption standard, what was disabled and why, firmware version. This is the document the next person needs.",
      },
    ],
    rubric: [
      {
        criterion: "Network understanding",
        passing: "Knows what a router does.",
        excellent: "Explains the router, switch, access point, DHCP and NAT, the two address spaces, and why anything on the local network can reach everything else.",
      },
      {
        criterion: "Default exposure",
        passing: "Changes the Wi-Fi password.",
        excellent: "Identifies the admin default, the sticker passphrase, WPS, remote administration and UPnP, and unpatched firmware as the main exposures.",
      },
      {
        criterion: "Configuration",
        passing: "Improves the settings.",
        excellent: "Admin password changed, WPA2-AES or WPA3 set, dangerous features disabled, firmware current, and an isolated guest network enabled.",
      },
      {
        criterion: "Public Wi-Fi judgement",
        passing: "Is cautious on public networks.",
        excellent: "Distinguishes encrypted from unencrypted risk, explains fake access points, disables automatic joining, uses a VPN and avoids sensitive logins.",
      },
      {
        criterion: "Honest scoping",
        passing: "Recommends a firewall.",
        excellent: "Explains what a firewall does not stop, and directs the client to the controls that actually prevent the common losses.",
      },
    ],
    faqs: [
      {
        q: "What is the most important thing to change on a router?",
        a: "The admin password. It is printed on the sticker and identical on every unit of that model, so anyone who knows the model can reconfigure your whole network. Changing it takes two minutes and is the highest-value network action there is.",
      },
      {
        q: "Is public Wi-Fi actually dangerous?",
        a: "Less than people fear, because HTTPS encrypts almost everything now. The real risks are fake access points, unencrypted legacy traffic, and device sharing being enabled. Use a VPN, disable automatic joining, and do not do banking on a network you do not control.",
      },
      {
        q: "Do I need a VPN at home?",
        a: "Usually not — your home network is already yours, and a VPN mainly hides your traffic from your provider. The clear case for a VPN is public Wi-Fi, where it encrypts everything to a server you trust and neutralises most of the risk.",
      },
      {
        q: "Should a business give customers its Wi-Fi password?",
        a: "Give them a guest network instead. Anyone on your main network can reach every other device on it, which in a business means customers alongside your payment equipment and staff machines. Guest isolation is free on almost every router.",
      },
      {
        q: "Does a firewall protect me from phishing?",
        a: "No. A firewall permits your own outbound connections, including to a convincing fake banking site. It does not stop phishing, malware you download yourself, or a weak password. Two-factor, unique passwords, backups and scepticism do the real work.",
      },
    ],
  },

  "encryption-and-web-security": {
    summary:
      "The last technical layer: how encryption actually protects data at rest and in transit, what HTTPS does and does not guarantee, and how to browse and transact safely. This session covers the practical cryptography a working professional needs, without the mathematics.",
    objectives: [
      "Explain encryption at rest and in transit in practical terms",
      "Enable and verify device encryption and understand recovery keys",
      "Explain what HTTPS guarantees and the three things it does not",
      "Recognise certificate warnings and respond correctly",
      "Transact safely online and recognise a secure payment page",
      "Explain end-to-end encryption and where it applies",
    ],
    blocks: [
      {
        heading: "Encryption at rest and in transit",
        body: [
          "Encryption converts data into a form that is unreadable without a key, and it applies in two distinct places. **In transit** means while data travels — between your browser and a website, your phone and a server. **At rest** means while data sits — on your laptop's disk, your phone's storage, a backup drive in a drawer. Both matter, and people usually think about only the first.",
          "**At rest** is the one most people neglect, and it is what makes device theft survivable. An unencrypted laptop that is stolen hands over every file on it immediately. An encrypted one hands over a brick, because the data is unreadable without the key. Both Windows (**BitLocker**) and macOS (**FileVault**) provide this, and Android and iOS encrypt by default when a passcode is set — so for most phones the action is simply to have a real passcode rather than none.",
          "**In transit** is what HTTPS provides, and it is now the default on almost the entire web. The important idea is that encryption protects the **content** of the connection from anyone watching the network, which on public Wi-Fi or any network you do not control is the difference between your banking details being readable and being noise.",
        ],
      },
      {
        heading: "Device encryption and the recovery key",
        body: [
          "Enable encryption on every machine you or a client uses. On Windows, check whether **BitLocker** or **device encryption** is available and enabled; on macOS, confirm **FileVault** is on. On phones, a passcode or biometric lock is what activates the built-in encryption, so a phone with no lock is an unencrypted phone.",
          "The critical and routinely skipped step is the **recovery key**. Full-disk encryption means that if something goes wrong — a hardware change, a failed update, a forgotten PIN — the data is genuinely inaccessible without the recovery key. That is the entire point of encryption, and it applies equally to you. Save the key somewhere that is not the device: printed and kept safely, or stored in a password manager or a Microsoft or Apple account.",
          "Losing the recovery key is unrecoverable by design, and it is a real outcome: people enable encryption, something breaks a year later, and years of files are gone. So the honest guidance is that enabling encryption is essential and saving the recovery key is part of enabling it, not an optional extra. Write it into any procedure you give a client.",
        ],
      },
      {
        heading: "What HTTPS does, and the three things it does not",
        body: [
          "HTTPS encrypts the connection between your browser and the website, and it does three useful things. It **protects the content** from anyone watching the network. It **proves the site's identity** through a certificate issued to that domain, so you are talking to the real bank rather than an impostor on the network. And it **protects integrity**, so nobody in between can alter what is sent or received.",
          "Now the three things it does not do, which matter more. It **does not make a site trustworthy** — criminals obtain valid certificates routinely, and a padlock on a fraudulent site is entirely normal. It **does not protect against phishing**, because a proxied fake site can present a valid certificate for its own domain while you believe you are on the real one. And it **does not protect the site's own security** — an HTTPS site can still be breached, and your data stored there can still be stolen afterwards.",
          "The practical conclusion: HTTPS is necessary and it is table stakes, but it is not a trust signal. The trust question is answered by the **domain name**, which is why checking the URL remains the single most important habit in web safety. A padlock tells you the connection is encrypted; only the address tells you who you are talking to.",
        ],
      },
      {
        heading: "Certificate warnings: when to stop",
        body: [
          "A certificate warning means the browser could not verify the site's identity, and it should be treated as a hard stop rather than a nuisance to click through. The common causes: an **expired certificate**, which is sloppy but not necessarily malicious; a **name mismatch**, where the certificate belongs to a different domain, which is a serious signal; and an **untrusted issuer**, which can indicate someone intercepting your connection.",
          "The discipline is simple: **on a site where you enter credentials or make a payment, a certificate warning means stop**. Close the tab and type the address yourself. On a site where you are reading an article and entering nothing, the risk is lower but still worth noting. Never click through a warning to reach a banking or email page, because that is precisely the situation an interception attack creates.",
          "One legitimate exception is worth knowing: a warning on a site you are reaching through a **captive portal** — the login page on hotel or airport Wi-Fi — is normal, because the network is intercepting to present its login. That is expected. What is not expected is a warning on your bank, and distinguishing the two is a matter of noticing where you are rather than any technical test.",
        ],
      },
      {
        heading: "Transacting safely and end-to-end encryption",
        body: [
          "Safe online payment is mostly about the site, not the padlock. Check the **domain carefully** — a fraudulent store will use a name close to a real one. Prefer **established payment methods** that offer protection, and be sceptical of a seller who insists on a direct bank transfer for goods from an unknown source, because that route has no recourse. For Nigerian online shopping, recognised marketplaces and payment processors exist precisely because direct transfers to strangers are how most e-commerce fraud works.",
          "**End-to-end encryption** is a distinct and stronger idea: the message is encrypted so that only the sender and recipient can read it, and nobody in between — not even the service provider — can. WhatsApp messages use it, which is why the content is protected in transit. But understand the limits: end-to-end encryption protects the **content**, not the **metadata** (who you contacted, when, how often), and it does nothing at all about what happens at either end — a compromised phone reads everything, and a screenshot defeats any encryption.",
          "So the honest summary is that encryption is genuinely powerful and genuinely limited. It makes stolen devices useless and network eavesdropping useless, and it does nothing about phishing, weak passwords, malware on your own machine, or a person you trusted. Knowing both halves is what lets you advise a client correctly rather than either overselling encryption or dismissing it.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor enables device encryption and saves the recovery key, inspects certificates on real sites including a fraudulent one, demonstrates what a warning means, and walks through safe payment practice and the real limits of end-to-end encryption.",
      steps: [
        {
          step: "Check the encryption status",
          detail:
            "Show whether BitLocker or device encryption is active on a Windows machine and FileVault on a Mac. Explain the difference between at rest and in transit.",
        },
        {
          step: "Enable encryption",
          detail:
            "Turn it on and explain that this is what makes a stolen laptop a brick rather than a handover of every file on it.",
        },
        {
          step: "Save the recovery key",
          detail:
            "Display the recovery key and store it in a password manager and printed. Explain that losing it is unrecoverable by design and that this is part of enabling encryption.",
        },
        {
          step: "Check phone encryption",
          detail:
            "Show that a passcode activates the built-in encryption on Android and iOS, and that a phone with no lock is unencrypted.",
        },
        {
          step: "Inspect a valid certificate",
          detail:
            "Open the padlock on a real bank site and read the certificate: the domain it was issued to, the issuer, the expiry. Explain what each field proves.",
        },
        {
          step: "Show a fraudulent site with a valid certificate",
          detail:
            "Demonstrate that criminals hold valid certificates too. Explain that the padlock is not a trust signal and that only the domain answers who you are talking to.",
        },
        {
          step: "Trigger a certificate warning",
          detail:
            "Show a name mismatch or expired certificate and explain the discipline: on any site taking credentials or payment, a warning means stop and retype the address.",
        },
        {
          step: "Explain the captive-portal exception",
          detail:
            "Show a hotel Wi-Fi login page and explain why a warning there is normal, and how that differs from a warning on your bank.",
        },
        {
          step: "Walk a safe purchase",
          detail:
            "Check the domain carefully, confirm a recognised payment method, and show why a direct transfer to an unknown seller has no recourse.",
        },
        {
          step: "Show an e-commerce fraud pattern",
          detail:
            "Examine a fake store using a name close to a real one. Explain that domain checking, not the padlock, is the defence.",
        },
        {
          step: "Explain end-to-end encryption",
          detail:
            "Show that WhatsApp content is encrypted end to end, then explain that metadata is not protected and that a compromised phone reads everything.",
        },
        {
          step: "State the honest limits",
          detail:
            "List what encryption defeats — stolen devices, network eavesdropping — and what it does not: phishing, weak passwords, malware, and trusted insiders.",
        },
      ],
    },
    practice: {
      title: "Encrypt your devices and audit your web habits",
      brief:
        "You enable encryption on your own devices with recovery keys saved properly, inspect certificates on real sites, analyse a fraudulent site that holds a valid certificate, and write a safe-transacting checklist plus a plain-language explanation of what encryption does and does not protect.",
      steps: [
        "Check whether encryption is enabled on your laptop and record the result.",
        "Enable it if it is not, and note how long the process takes.",
        "Save the recovery key in a password manager and in printed form.",
        "Confirm your phone has a passcode, which is what activates its encryption.",
        "Inspect the certificate on your bank's site: domain, issuer and expiry date.",
        "Inspect the certificate on two other sites you use and note the issuers.",
        "Find or examine a fraudulent site holding a valid certificate and identify it by its domain.",
        "Write the rule for responding to a certificate warning, including the captive-portal exception.",
        "Write a safe-transacting checklist covering domain checking, payment method and transfer risk.",
        "Describe one Nigerian e-commerce fraud pattern and the specific check that defeats it.",
        "Explain end-to-end encryption, including what metadata is and why it is not protected.",
        "List what encryption defeats and what it does not, in plain language.",
        "Explain that list to one non-technical person and confirm they can repeat it.",
      ],
      standard:
        "Encryption enabled on the laptop with the recovery key saved in two places, phone passcode confirmed, certificates inspected on three real sites, a fraudulent valid-certificate site identified by domain, and both a safe-transacting checklist and a plain-language account of what encryption does and does not protect that a non-technical person can repeat.",
    },
    pitfalls: [
      {
        problem: "Your laptop is unencrypted",
        fix: "Enable BitLocker or device encryption. A stolen unencrypted laptop hands over every file immediately; an encrypted one is a brick. It is the control that makes device theft survivable.",
      },
      {
        problem: "You enabled encryption without saving the recovery key",
        fix: "Save it printed and in a password manager. Losing it is unrecoverable by design, and a failed update or hardware change a year later will then cost you every file on the machine.",
      },
      {
        problem: "You treated the padlock as a trust signal",
        fix: "Criminals hold valid certificates routinely. The padlock means the connection is encrypted; only the domain name tells you who you are talking to. Check the URL, always.",
      },
      {
        problem: "You clicked through a certificate warning to reach a bank",
        fix: "Stop. On any site taking credentials or payment, a warning means close the tab and type the address yourself. That is precisely the situation an interception attack creates.",
      },
      {
        problem: "You paid an unknown seller by direct transfer",
        fix: "Use recognised marketplaces and payment processors that offer protection. A direct transfer to a stranger has no recourse, and it is how most Nigerian e-commerce fraud works.",
      },
      {
        problem: "You assumed end-to-end encryption makes a message safe",
        fix: "It protects the content in transit only. Metadata is not protected, a compromised phone reads everything, and a screenshot defeats any encryption. Know both halves before advising anyone.",
      },
      {
        problem: "You have no phone passcode",
        fix: "Set one. The passcode is what activates the built-in encryption on Android and iOS, so a phone with no lock is an unencrypted phone holding your messages and banking apps.",
      },
    ],
    expertNotes: [
      "Enable device encryption and save the recovery key in the same sitting, every time. Encryption without a saved recovery key is a time-delayed data loss, and treating the key as part of the process rather than an afterthought is the whole discipline.",
      "Check the domain, not the padlock, on every sensitive site. Valid certificates on fraudulent sites are routine, so the URL is the only reliable answer to who you are actually talking to.",
      "Treat a certificate warning as a hard stop on anything taking credentials or payment. It costs a retyped address, and the alternative is entering your banking details into an interception.",
      "Be honest with clients about what encryption does not do. Overselling it produces false confidence, which is worse than none, because they then neglect the passwords, backups and scepticism that actually prevent losses.",
    ],
    vocabulary: [
      { term: "Encryption at rest", meaning: "Data protected while stored on a device. What makes theft survivable." },
      { term: "Encryption in transit", meaning: "Data protected while travelling between two points. What HTTPS provides." },
      { term: "BitLocker / FileVault", meaning: "Full-disk encryption on Windows and macOS respectively." },
      { term: "Recovery key", meaning: "The credential restoring access if encryption cannot unlock normally. Losing it is unrecoverable by design." },
      { term: "HTTPS", meaning: "An encrypted, authenticated connection. Protects content and proves the domain, but is not a trust signal." },
      { term: "Certificate", meaning: "A document issued to a domain proving its identity. Criminals obtain valid ones routinely." },
      { term: "Certificate warning", meaning: "The browser failing to verify a site's identity. A hard stop on any site taking credentials or payment." },
      { term: "End-to-end encryption", meaning: "Encryption only the endpoints can undo. Protects content, not metadata, and nothing at either end." },
    ],
    homework: [
      {
        task: "Enable encryption and save the key",
        detail:
          "On your laptop, and confirm your phone has a passcode. Store the recovery key printed and in a password manager. Do both in one sitting.",
      },
      {
        task: "Inspect five certificates",
        detail:
          "Your bank and four sites you use. Record the domain each was issued to, the issuer and the expiry, and note anything unexpected.",
      },
      {
        task: "Write your safe-transacting checklist",
        detail:
          "Domain check, recognised payment method, no direct transfer to strangers, certificate warning means stop. Keep it short enough to actually use.",
      },
      {
        task: "Explain the limits of encryption",
        detail:
          "In plain language, to one non-technical person: what it defeats and what it does not. If they cannot repeat it, simplify until they can.",
      },
    ],
    rubric: [
      {
        criterion: "Encryption understanding",
        passing: "Knows encryption exists.",
        excellent: "Distinguishes at rest from in transit, explains what each protects, and can state why at-rest encryption makes theft survivable.",
      },
      {
        criterion: "Device encryption",
        passing: "Has a phone passcode.",
        excellent: "Full-disk encryption enabled on the laptop with the recovery key saved in two places, and phone passcode confirmed as the encryption trigger.",
      },
      {
        criterion: "HTTPS judgement",
        passing: "Looks for the padlock.",
        excellent: "Explains the three things HTTPS guarantees and the three it does not, and checks the domain rather than trusting the padlock.",
      },
      {
        criterion: "Warning response",
        passing: "Notices warnings.",
        excellent: "Treats a warning as a hard stop on credential and payment sites, understands the causes, and knows the captive-portal exception.",
      },
      {
        criterion: "Honest communication",
        passing: "Recommends encryption.",
        excellent: "States plainly what encryption defeats and what it does not, so the client does not develop false confidence and neglect the real controls.",
      },
    ],
    faqs: [
      {
        q: "Is a site safe because it has a padlock?",
        a: "No. The padlock means the connection is encrypted; criminals obtain valid certificates routinely, so a fraudulent site can display one. The domain name is what tells you who you are talking to, which is why checking the URL is the single most important web habit.",
      },
      {
        q: "What do I do if I lose my BitLocker recovery key?",
        a: "If it is stored in your Microsoft account, you may be able to retrieve it there — check before anything else. If it is genuinely lost, the data is unrecoverable by design. This is exactly why saving the key is part of enabling encryption rather than an optional extra.",
      },
      {
        q: "Should I click through a certificate warning?",
        a: "Not on any site where you enter credentials or make a payment — close the tab and type the address yourself. On a captive-portal login page for hotel or airport Wi-Fi a warning is normal, which is the one exception worth knowing.",
      },
      {
        q: "Does WhatsApp's encryption make my messages safe?",
        a: "It protects the content from anyone in between, including the provider. It does not protect the metadata about who you contacted and when, and it does nothing at either end — a compromised phone reads everything, and a screenshot defeats any encryption.",
      },
      {
        q: "How do I know an online seller is genuine?",
        a: "Check the domain character by character against the real one, use recognised marketplaces and payment processors that offer protection, and never send a direct bank transfer to an unknown seller — that route has no recourse and is how most e-commerce fraud in Nigeria works.",
      },
    ],
  },
};
