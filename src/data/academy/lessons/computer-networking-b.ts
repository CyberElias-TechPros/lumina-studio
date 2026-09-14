/**
 * Computer Networking — sessions 4 to 6 (full class lectures).
 * Merged by withCoursePrefix() in ../index.ts.
 */

import type { SessionLecture } from "@/data/academy/types";

export const networkingLessonsB: Record<string, SessionLecture> = {
  "wifi-setup": {
    summary:
      "Wireless done properly for a real Lagos office: what the standards and bands actually mean, secure SSID configuration, coverage planning for concrete floors, and a guest network that does not become a liability.",
    objectives: [
      "Explain what Wi-Fi standards and frequency bands mean in practical terms",
      "Configure SSIDs and wireless security correctly, and know which settings to avoid",
      "Plan access point placement for a multi-floor concrete building rather than guessing",
      "Build a guest network that is genuinely isolated from the office",
      "Diagnose interference and coverage problems with evidence rather than opinion",
    ],
    blocks: [
      {
        heading: "Wireless is a shared medium, and that one fact explains most wireless problems",
        body: [
          "Everything about Wi-Fi follows from a single property: **the air is shared**. On a wired switch, each port has its own path, so two conversations happen simultaneously without interfering. On wireless, every device on a channel is competing for the same medium, and only one transmits at a time. Add capacity by adding more access points on non-overlapping channels, not by adding more clients to one access point.",
          "The second property is that **radio behaves badly in buildings**. Lagos offices are typically concrete and blockwork construction with steel reinforcement, and both absorb and reflect 2.4 GHz and especially 5 GHz signals. A floor slab is not a minor obstacle — it can remove most of a signal's strength. This is why a single access point in a corner produces dead zones upstairs, and why the fix is placement and a second unit rather than a stronger antenna.",
          "Hold those two together and the design approach becomes obvious. **Plan coverage per floor, choose channels so neighbouring access points do not overlap, and put the access points where the people are.** Everything else in this session is detail on those three decisions.",
        ],
      },
      {
        heading: "Standards and bands: what the labels mean when you are choosing equipment",
        body: [
          "The naming has changed twice, which causes confusion. The technical names are **802.11n**, **802.11ac** and **802.11ax**; the marketing names are **Wi-Fi 4**, **Wi-Fi 5** and **Wi-Fi 6**. For a new installation in 2026, **Wi-Fi 6 equipment is the sensible choice** — not because you need its peak speed, but because it handles many simultaneous clients far better, which is exactly the situation in an office with twenty-two staff each carrying a phone and a laptop.",
          "The bands matter more than the standard. **2.4 GHz** travels further and penetrates walls better, but has only three non-overlapping channels and is heavily congested — in an office block with neighbouring businesses, you will find the band crowded before you install anything. **5 GHz** offers many more channels and much higher throughput, but shorter range and weaker penetration. Practical consequence: **5 GHz for the desks, 2.4 GHz as coverage filler**, and let clients roam to whichever is stronger.",
          "Two settings follow from this. **Channel width** — wider channels give more speed but consume more spectrum and cause more overlap with neighbours, so in a congested building narrower is often faster in practice because it is cleaner. And **channel selection** — on 2.4 GHz use only channels 1, 6 and 11, because those are the only three that do not overlap; choosing 3 or 8 overlaps two others and degrades everyone. **Auto channel selection is acceptable on one access point and unreliable on several**, because neighbouring units can pick the same channel.",
        ],
      },
      {
        heading: "SSID and security: the settings that are wrong far more often than right",
        body: [
          "The SSID is the network name. Give it something professional and identifiable — the practice's name rather than the router's default model number, which advertises your equipment to anyone scanning. **Do not hide the SSID** as a security measure; a hidden network still broadcasts in probe responses and is trivially discovered, so all hiding achieves is making legitimate connections less reliable and support calls more frequent.",
          "Security is where the real decisions are. Use **WPA2-AES at minimum and WPA3 where equipment supports it**. What you must never configure is **WEP**, which is broken and can be cracked in minutes, or **WPA-TKIP**, which is the legacy mode that caps throughput and has known weaknesses. On a lot of consumer equipment there is a mixed mode offered for compatibility with ancient devices; unless you have a genuine ten-year-old device that must connect, **choose WPA2-AES only** — the compatibility mode weakens the network for a device that no longer exists.",
          "Then three settings that are commonly misconfigured. **The administrator password on the access point itself** must be changed from default, exactly as with switches — an access point with factory credentials can be reconfigured by anyone who reaches it. **Remote management from the wireless side should be disabled**, so a guest cannot open the configuration page. And **WPS should be turned off**, because its PIN mechanism is vulnerable to brute force and it is a convenience nobody in an office actually needs.",
        ],
      },
      {
        heading: "Placement and coverage: the part that determines whether the network is usable",
        body: [
          "Placement is where most small wireless installations fail, and it fails quietly — the network works when you test it standing next to the access point and drops out where people actually sit. The rules are physical, not technical. **Mount high, centrally, and away from obstructions.** A ceiling mount in the middle of the floor beats a desk unit in a corner every time, because radio spreads outward and downward better than it penetrates upward through a slab.",
          "Then the things that destroy signal, which are worth listing because clients will ask why the network is worse in one room. **Metal** reflects — a steel door, a server rack, a filing cabinet. **Concrete and brick** absorb. **Water** absorbs strongly, which means aquariums and water dispensers are genuinely bad neighbours for an access point. **Microwaves and cordless phones** interfere on 2.4 GHz. And **mirrored or tinted glass** with a metallic coating reflects far more than plain glass does.",
          "For our two-floor office the answer is **two access points, one per floor**, each ceiling-mounted toward the centre of its working area, on non-overlapping channels. That is not a compromise — it is the correct design, because a single unit cannot reliably cover a reinforced-concrete slab between floors. **The test is to walk the site with a device and measure**, not to assume. Coverage you have not measured is coverage you are guessing at.",
        ],
      },
      {
        heading: "Guest networks: convenient, and a serious risk if configured carelessly",
        body: [
          "A guest network is not a courtesy feature; it is a **security boundary**. Visitors, contractors, a client's laptop, and staff personal phones all carry unknown software onto your network. Putting them on the staff VLAN means any one of those devices can attempt to reach the accounts server. Putting them on a separate SSID mapped to the guest VLAN means they cannot — which is why we built VLAN 30 in session three.",
          "The configuration that makes it real has four parts. **A separate SSID** on its own VLAN, with its own DHCP scope and gateway. **Client isolation** enabled, so guests cannot see or reach each other — without it, one infected guest device can attack the others. **No access to internal networks**, enforced by the router's inter-VLAN policy, not merely by a different address range. And **a short DHCP lease**, so addresses recycle as people come and go rather than exhausting the pool by lunchtime.",
          "Two further points that clients consistently get wrong. **Staff personal phones belong on the guest network, not the staff network** — they are the least controlled devices in the building and they carry the same software as the devices strangers carry. And the guest password should be **changed periodically**, because it is the one credential that gets shared casually and written on a whiteboard. None of this is complicated; it is simply a set of decisions that must be made deliberately rather than left at defaults.",
        ],
      },
    ],
    demonstration: {
      intro:
        "We survey the wireless environment, deploy two access points across the two floors with a planned channel layout, configure office and guest SSIDs securely, and verify coverage by measurement.",
      steps: [
        {
          step: "Survey before installing anything",
          detail:
            "Walk both floors with a wireless analyser and record which networks and channels are already in use. In an office block you will find the 2.4 GHz band crowded. This survey determines your channel plan, so doing it first is not optional.",
        },
        {
          step: "Record signal strength in the places people actually work",
          detail:
            "Measure at desks, in the meeting room, and in the corners. Note the weak areas now, as a baseline. Coverage you have not measured is coverage you are guessing at, and the baseline is what proves improvement later.",
        },
        {
          step: "Choose the access point locations on the plan",
          detail:
            "One unit per floor, ceiling-mounted toward the centre of the working area. Explicitly avoid the server cupboard, the steel door, the water dispenser and the filing cabinets — each of which will cost you coverage in a way that is invisible on paper.",
        },
        {
          step: "Plan the channel layout before configuring",
          detail:
            "Ground floor 2.4 GHz on **channel 1**, first floor on **channel 6** — non-overlapping, so the two units do not interfere with each other through the floor slab. On 5 GHz, choose channels far apart and confirm neither collides with a neighbour from the survey.",
        },
        {
          step: "Mount the first access point and run its cable",
          detail:
            "Ceiling-mounted, with the data cable run properly rather than draped. Confirm PoE or power availability before you commit to the position — discovering there is no power at the chosen spot means moving it, and moving it changes the coverage.",
        },
        {
          step: "Assign it to the correct VLAN via a trunk port",
          detail:
            "The switch port feeding the access point must be a **trunk** carrying the staff and guest VLANs, tagged. An access port here means the guest SSID lands on the staff network, which defeats the entire purpose of having one.",
        },
        {
          step: "Change the access point's administrator credentials first",
          detail:
            "Before any wireless settings. An access point with factory credentials can be reconfigured by anyone who reaches it, and the defaults for common models are published and widely known.",
        },
        {
          step: "Create the office SSID with proper security",
          detail:
            "SSID named after the practice, mapped to VLAN 10, secured with **WPA2-AES** — or WPA3 if every client device supports it. Do not select the TKIP or mixed compatibility mode unless you have a genuine legacy device that must connect.",
        },
        {
          step: "Create the guest SSID on its own VLAN",
          detail:
            "A distinct SSID mapped to VLAN 30 with its own passphrase. Confirm it is a separate SSID and not the same network with a shared password, because a shared password is not a boundary at all.",
        },
        {
          step: "Enable client isolation on the guest network",
          detail:
            "This stops guests reaching each other, which matters because one infected visitor device would otherwise be able to attack the others. It is a single checkbox that is off by default on most equipment.",
        },
        {
          step: "Leave the SSIDs visible and disable WPS",
          detail:
            "Hiding the SSID is not security — it is still discoverable and it makes legitimate connections less reliable. WPS, by contrast, is a real vulnerability via its PIN mechanism and serves no purpose in an office. Turn it off.",
        },
        {
          step: "Disable remote management from the wireless interface",
          detail:
            "Management should be reachable only from the management network. Otherwise a guest sitting in your meeting room can open the access point's configuration page, which is not a hypothetical scenario.",
        },
        {
          step: "Set the DHCP scope and lease for guests",
          detail:
            "Confirm the guest VLAN's scope has a short lease — a couple of hours — so addresses recycle as visitors leave. A day-long lease on a guest network exhausts the pool during a busy morning.",
        },
        {
          step: "Verify the guest network cannot reach the office",
          detail:
            "Connect a laptop to the guest SSID, confirm it receives a 10.10.30.x address, then attempt to reach the server on 10.10.20.x. It must fail. **This test is the entire point of the guest network** — if it passes, you have built a convenience, not a boundary.",
        },
        {
          step: "Confirm staff personal phones go on the guest SSID",
          detail:
            "Enrol a phone on guest, not office. Staff phones are the least controlled devices in the building and carry the same software as visitors' devices. Explain the reasoning to the client, because they will otherwise ask to move them back.",
        },
        {
          step: "Measure coverage after installation",
          detail:
            "Repeat the walkthrough and compare against your baseline. Every working area should have usable signal; note any remaining dead zone and decide whether it needs a third unit or is simply a store room nobody works in.",
        },
        {
          step: "Test roaming between the two access points",
          detail:
            "Walk from floor to floor on a video call and observe whether the handover is smooth. A call that drops at the stairs means the two units overlap too little, or one is transmitting so strongly that clients refuse to let go.",
        },
        {
          step: "Test throughput where people work, not next to the unit",
          detail:
            "Run a speed test at a desk furthest from the access point. Testing next to the unit tells you what the unit can do; testing at the far desk tells you what the network delivers, and only the second number is honest.",
        },
        {
          step: "Document the wireless design",
          detail:
            "Record SSIDs, VLAN mapping, security mode, channel plan, access point locations, management addresses and the guest passphrase rotation policy. Include the coverage measurements, because they justify the placement decisions to the next person.",
        },
      ],
    },
    practice: {
      title: "Survey, deploy and verify a real wireless network",
      brief:
        "Plan and configure wireless for a real space — the office, a home, or a lab — and prove the guest network is genuinely isolated rather than nominally separate.",
      steps: [
        "Survey the existing wireless environment and record which networks occupy which channels on both bands.",
        "Measure baseline signal strength in the places people actually work, not next to where the access point will go.",
        "Choose access point locations that are high, central and away from metal, concrete, water and interference sources.",
        "Produce a written channel plan using only 1, 6 and 11 on 2.4 GHz, with neighbouring units on non-overlapping channels.",
        "Mount and cable the access point properly, confirming power or PoE availability before committing to the position.",
        "Configure the feeding switch port as a tagged trunk carrying the staff and guest VLANs.",
        "Change the access point's administrator credentials before touching any wireless setting.",
        "Create the office SSID on the staff VLAN with WPA2-AES or WPA3, avoiding TKIP and mixed compatibility modes.",
        "Create a separate guest SSID on the guest VLAN with its own passphrase.",
        "Enable client isolation on the guest network.",
        "Leave the SSIDs visible and disable WPS.",
        "Disable management access from the wireless interface.",
        "Configure a short DHCP lease on the guest scope.",
        "Prove isolation: connect to the guest SSID, confirm the address range, and confirm the internal server is unreachable.",
        "Re-measure coverage and compare it against your baseline, noting any remaining dead zone.",
        "Test roaming between access points on a live call, and test throughput at the furthest desk.",
        "Document SSIDs, VLANs, security mode, channel plan, locations and measurements.",
      ],
      standard:
        "A pre-installation survey with channels and baseline signal recorded; access point locations chosen with metal, concrete, water and interference explicitly avoided; a written channel plan using only non-overlapping 2.4 GHz channels; trunk-mode switch ports carrying both VLANs; credentials changed first; office SSID on WPA2-AES or WPA3 with no TKIP; a separate guest SSID on its own VLAN with client isolation, a short lease and no wireless-side management; **isolation proven by a failed reachability test**; post-installation measurements compared to baseline; roaming and far-desk throughput tested; and full documentation of the design.",
    },
    pitfalls: [
      {
        problem: "Hiding the SSID as a security measure",
        fix: "A hidden network is still discoverable in probe responses. All hiding achieves is unreliable legitimate connections and more support calls. Security comes from WPA2-AES or WPA3, not from obscurity.",
      },
      {
        problem: "Configuring WEP, TKIP, or a mixed compatibility mode",
        fix: "WEP is broken and cracks in minutes; TKIP is legacy and caps throughput. Choose WPA2-AES only unless a genuine legacy device requires otherwise — and in 2026 almost none do.",
      },
      {
        problem: "Leaving WPS enabled",
        fix: "Its PIN mechanism is vulnerable to brute force and it provides no benefit in an office. Turn it off.",
      },
      {
        problem: "Choosing channels 3 or 8 on 2.4 GHz",
        fix: "Only channels 1, 6 and 11 do not overlap. Anything else overlaps two neighbours and degrades everyone including you. Set channels manually rather than trusting auto on a multi-unit deployment.",
      },
      {
        problem: "One access point trying to cover two concrete floors",
        fix: "A reinforced-concrete slab removes most of a signal. Use one unit per floor, ceiling-mounted and centred — that is correct design, not extra cost.",
      },
      {
        problem: "An access point fed by an access port instead of a trunk",
        fix: "Then the guest SSID lands on the staff network and the boundary does not exist. The switch port must carry both VLANs tagged.",
      },
      {
        problem: "A guest network with no client isolation",
        fix: "One infected visitor device can then attack every other guest. Enable isolation — it is one checkbox, off by default on most equipment.",
      },
      {
        problem: "Testing coverage standing next to the access point",
        fix: "Measure where people work, at the furthest desk, and compare against a pre-installation baseline. Otherwise you are reporting what the unit can do rather than what the network delivers.",
      },
    ],
    expertNotes: [
      "Survey before you install. Five minutes with an analyser tells you which channels are occupied in a crowded Lagos office block, and that determines whether your deployment works or merely appears to. Installing first and surveying after is how you end up re-doing the job.",
      "The guest network isolation test is the single most important verification in this session. Configuring a separate SSID and not testing that it cannot reach the server leaves you with a convenience feature and a false sense of security. The test takes a minute and it is the entire point.",
      "Staff personal phones belong on the guest network. Clients resist this because it feels punitive, but those phones are the least controlled devices in the building — unmanaged, personally installed software, carried in and out daily. Explain the reasoning rather than just enforcing it.",
      "Coverage is a measurement, not an opinion. Record baseline signal before installation and re-measure after; the comparison is what justifies your placement decisions to a client and to the next engineer, and it is the difference between a professional assessment and a guess.",
    ],
    vocabulary: [
      {
        term: "802.11ax (Wi-Fi 6)",
        meaning:
          "The current mainstream wireless standard. Its main practical advantage over Wi-Fi 5 is handling many simultaneous clients well, which matters in an office.",
      },
      {
        term: "2.4 GHz band",
        meaning:
          "Longer range and better wall penetration, but only three non-overlapping channels and heavy congestion. Useful as coverage filler.",
      },
      {
        term: "5 GHz band",
        meaning:
          "More channels and higher throughput, with shorter range and weaker penetration. The right band for desks close to an access point.",
      },
      {
        term: "Non-overlapping channels",
        meaning:
          "On 2.4 GHz, only channels 1, 6 and 11. Any other choice overlaps two neighbours and degrades performance for everyone on the band.",
      },
      {
        term: "WPA2-AES",
        meaning:
          "The minimum acceptable wireless security. TKIP and WEP are legacy and insecure and should never be selected on a business network.",
      },
      {
        term: "Client isolation",
        meaning:
          "A setting preventing wireless clients from reaching each other. Essential on a guest network, and off by default on most equipment.",
      },
      {
        term: "WPS",
        meaning:
          "Wi-Fi Protected Setup, a convenience pairing mechanism whose PIN is vulnerable to brute force. Should be disabled on any business network.",
      },
      {
        term: "Coverage measurement",
        meaning:
          "Recording signal strength at the locations people actually work, before and after installation. The only honest basis for placement decisions.",
      },
    ],
    homework: [
      {
        task: "Survey a real wireless environment",
        detail:
          "Record every network visible at a location, which channel and band each uses, and signal strength at three working positions. Identify which 2.4 GHz channels are free and justify a channel choice.",
      },
      {
        task: "Configure a secure office and guest SSID pair",
        detail:
          "Two SSIDs on separate VLANs, office on WPA2-AES or WPA3, guest with client isolation and a short lease. Document every setting and the reasoning behind it.",
      },
      {
        task: "Prove guest isolation",
        detail:
          "Connect to the guest SSID, record the address you receive, and demonstrate that an internal address is unreachable. Screenshot the failed test — evidence of a control working is worth more than the configuration screen.",
      },
      {
        task: "Produce a wireless placement plan for a two-floor office",
        detail:
          "A floor sketch showing access point positions, channel assignments, and the obstructions you deliberately avoided. Include predicted coverage and where you would measure to verify it.",
      },
    ],
    rubric: [
      {
        criterion: "Standards and band understanding",
        passing: "Can name current standards and the two bands.",
        excellent:
          "Chooses band and channel width for a specific building, explains the range-against-throughput trade-off, and uses only non-overlapping 2.4 GHz channels.",
      },
      {
        criterion: "Security configuration",
        passing: "A password-protected SSID exists.",
        excellent:
          "WPA2-AES or WPA3 with no TKIP, WPS disabled, SSIDs visible, access point credentials changed, and management disabled from the wireless side.",
      },
      {
        criterion: "Coverage planning",
        passing: "An access point was installed and works nearby.",
        excellent:
          "Locations chosen with obstructions explicitly avoided, baseline measured before installation, re-measured after, and throughput tested at the furthest desk.",
      },
      {
        criterion: "Guest isolation",
        passing: "A separate guest SSID exists.",
        excellent:
          "Own VLAN, client isolation, short lease, trunk-mode switch port, and a **demonstrated failed attempt to reach an internal address**.",
      },
      {
        criterion: "Documentation",
        passing: "Settings were noted.",
        excellent:
          "SSIDs, VLAN mapping, security mode, channel plan, locations, management addresses and coverage measurements recorded well enough for someone else to maintain it.",
      },
    ],
    faqs: [
      {
        q: "Is Wi-Fi 6 worth it for a small office?",
        a: "Usually yes, but not for the headline speed. Its real advantage is handling many simultaneous clients, and twenty-two staff each with a laptop and a phone is exactly that situation. The price premium over Wi-Fi 5 hardware is now small.",
      },
      {
        q: "How many access points does a two-floor office need?",
        a: "At least one per floor in concrete construction, because a reinforced slab removes most of a signal. Two is the correct starting point for our scenario, and coverage measurement tells you whether a third is needed.",
      },
      {
        q: "Should I hide my SSID?",
        a: "No. A hidden network is still discoverable, so you gain no security while making legitimate connections less reliable. Use WPA2-AES or WPA3 and a strong passphrase instead — that is what actually protects the network.",
      },
      {
        q: "Why can't staff put their personal phones on the office network?",
        a: "Because those phones are unmanaged, carry personally installed software, and travel in and out of the building daily. They are the least controlled devices you have, so they belong on the guest network alongside visitors' devices.",
      },
      {
        q: "My network is fast next to the router and slow at my desk. Why?",
        a: "Because you have measured the access point, not the network. Concrete, metal, water and distance all reduce signal, and the fix is placement or an additional unit — not a stronger antenna or a bigger package from the ISP.",
      },
    ],
  },

  "troubleshooting-tools": {
    summary:
      "The diagnostic toolkit: ping and path testing, isolating DNS from connectivity, diagnosing DHCP failures, and reading a router's status pages so the equipment tells you what is wrong instead of you guessing.",
    objectives: [
      "Use ping correctly and understand what its results do and do not prove",
      "Interpret traceroute output to find where a path actually fails",
      "Separate a DNS failure from a connectivity failure with two tests",
      "Diagnose DHCP failures and identify the 169.254 address for what it means",
      "Read a router's status pages to locate faults without guessing",
    ],
    blocks: [
      {
        heading: "Diagnosis is a sequence, and the sequence is what makes it fast",
        body: [
          "When a client says 'the internet is down', the temptation is to start changing settings. The professional response is to run a fixed sequence that narrows the fault to a layer, because each test eliminates a category and the order is chosen so that cheap, definitive tests come first. Random changes are slower, and worse, they leave the network in a state nobody can describe afterwards.",
          "The sequence we use follows the layered model from session one, working **outward from the machine**. First: does the machine have a valid address? Second: can it reach its own gateway? Third: can it reach something on the internet by address? Fourth: can it resolve a name? Four questions, and the answer to each points at a different device and a different fix.",
          "That last distinction — **address against name** — is the single most useful split in network diagnosis. If you can reach an IP address but not a domain name, your connectivity is fine and your DNS is broken. Those are completely different problems, they live on different equipment, and clients describe them identically. **Testing both is what tells you which one you are actually dealing with.**",
        ],
      },
      {
        heading: "Ping: what it proves, and the three results people misread",
        body: [
          "**Ping** sends an ICMP echo request and waits for a reply. It answers one question — can this machine reach that address right now — and it answers it quickly, which is why it is the first tool. Ping your own address to confirm the stack works, your gateway to confirm the local network works, and a public address such as 8.8.8.8 to confirm the internet path works.",
          "Three results get misread constantly. **A successful ping to the gateway proves only that the local link works** — not that the internet works, and not that DNS works. **A failed ping does not always mean the host is down**, because many servers and firewalls are configured to ignore ICMP, so no reply can mean 'blocked' rather than 'absent'. And **a slow ping is often more informative than a failed one** — high or wildly variable latency points at congestion, a failing wireless link, or an overloaded device, which a simple pass or fail hides.",
          "Read the summary line, not just whether replies appear. Packet loss percentage and the spread between minimum, maximum and average tell you whether a link is stable. **Twenty per cent loss on a wireless connection is a coverage or interference problem**, and it presents to the user as 'the internet keeps dropping' with nothing actually failing completely — which is precisely the kind of fault that is hard to diagnose without looking at the numbers.",
        ],
      },
      {
        heading: "Traceroute: finding where the path breaks, and reading it honestly",
        body: [
          "**Traceroute** — `tracert` on Windows, `traceroute` on Linux and macOS — shows each hop a packet takes toward a destination. It works by sending packets with progressively increasing time-to-live values, so each router along the way reports itself. The output tells you where your traffic leaves your network, which ISP links it crosses, and where it stops.",
          "Reading it requires one important piece of honesty: **a line of asterisks does not necessarily mean a failure.** Routers commonly deprioritise or block the ICMP responses traceroute relies on, so an unresponsive hop in the middle of a path is normal. What matters is whether the **final destination** is reached. If it is, the path works and the silent hops are irrelevant. If the trace stops and never completes, the last responding hop tells you roughly where the problem begins.",
          "The practically useful observation is **whose network the failure is in**. If the trace dies at your router, the fault is yours. If it completes through your router and into your ISP's network and then stops, the fault is theirs — and that is the evidence you need when you call them. **Without a traceroute, an ISP support call is your word against theirs; with one, it is a conversation about a specific hop.**",
        ],
      },
      {
        heading: "DNS: the fault that looks exactly like a connectivity failure",
        body: [
          "**DNS** translates names to addresses, and when it fails every symptom looks like the internet being down — because from a user's perspective, it is. The browser says the site cannot be reached. Nothing suggests a name-resolution problem, because nobody thinks in addresses.",
          "The isolation takes two tests and about thirty seconds. **Ping a public IP address**, such as 8.8.8.8. If that succeeds, your network path to the internet is working. Then **ping a domain name**, such as google.com. If that fails while the address succeeded, your problem is DNS and nothing else. That single comparison is the most valuable diagnostic habit in this entire session.",
          "Then diagnose the DNS side. **`nslookup` or `dig`** shows what a name resolves to and which server answered — if it returns nothing or times out, the configured DNS server is not responding. Check which servers the machine actually has, because a common cause is a stale or wrong setting left over from a previous configuration, or a DHCP scope handing out an address that no longer serves DNS. And note the failure mode where **one DNS server is down and the other works**, producing intermittent name resolution that appears random but is entirely explainable once you test each server separately.",
        ],
      },
      {
        heading: "DHCP failures, and the address that tells you what happened",
        body: [
          "When a machine cannot obtain an address from DHCP, it does not simply have no address — it assigns itself one from **169.254.0.0/16**, known as an APIPA or link-local address. Seeing a 169.254 address is diagnostic gold, because it means precisely one thing: **the machine tried to get an address and failed.** It is not a configuration error by the user; it is a failed negotiation.",
          "The causes follow a short list. **No DHCP server reachable** — the scope does not exist, or the VLAN the machine is on has no scope, which is common after a segmentation change. **An exhausted pool** — the scope has run out of addresses, typically on a guest network with a lease that is too long. **A blocked path** — DHCP uses broadcast, and broadcasts do not cross a router unless a relay is configured, so a scope on the wrong VLAN simply cannot be reached. And **a physical problem**, because a dead cable produces the same symptom as a missing scope.",
          "The diagnostic order matters. Check the address first — a 169.254 address means DHCP failed; a valid address in the wrong range means the machine reached a different scope than intended, which points at VLAN assignment. Then check the scope has free addresses. Then check the VLAN and relay configuration. **Working through that list in order resolves almost every DHCP call**, and it is much faster than rebooting the router and hoping.",
        ],
      },
      {
        heading: "Reading a router's status pages: the information is already there",
        body: [
          "Most network faults can be located from the router's own status pages, and most people never look at them. The pages worth knowing are the **WAN or internet status**, which shows whether the connection is up, what public address was assigned, and when it was established; the **DHCP client list**, which shows every device that has been given an address; the **connected devices or wireless clients** list; and the **system log**, which records disconnections, authentication failures and configuration changes.",
          "The WAN status alone answers the question clients actually ask. If it shows the connection up with a valid public address, your problem is internal. If it shows disconnected, or an address that changed unexpectedly, the fault is at the ISP boundary or the line itself. **The uptime figure matters too** — a WAN connection that has been up for four minutes at 3pm means it dropped recently, which reframes the whole investigation.",
          "Then the log, which is the most neglected resource on the device. It records when the connection dropped, when a device failed to authenticate, and — critically — **when somebody changed a setting**. A surprising share of network faults turn out to be a configuration change nobody documented, and the log is the only place that remembers. Make reading the log a habit before changing anything, because it frequently tells you the fault's start time, which is often enough to identify its cause.",
        ],
      },
    ],
    demonstration: {
      intro:
        "We run the full diagnostic sequence on the office network, then create four controlled faults — DNS, DHCP, gateway and path — and diagnose each one from symptoms alone.",
      steps: [
        {
          step: "Establish the baseline on a healthy network",
          detail:
            "Record a working machine's address, mask, gateway and DNS servers. Ping the gateway, a public address and a domain name, and save all three results. **A baseline taken while things work is what makes a fault legible later**, and almost nobody has one.",
        },
        {
          step: "Run the four-question sequence in order",
          detail:
            "Valid address? Gateway reachable? Public address reachable? Name resolves? Narrate what each answer eliminates. The point is the sequence, not the individual commands — the order is what makes diagnosis fast.",
        },
        {
          step: "Read the ping summary rather than just the replies",
          detail:
            "Ping the gateway fifty times and examine loss percentage and the min/max/average spread. A stable link shows near-zero loss and a tight spread. This is how you catch a marginal wireless connection that never fails completely.",
        },
        {
          step: "Run a traceroute and read it honestly",
          detail:
            "Trace to a well-known public address. Identify your router, the first ISP hop, and the destination. Note which hops do not respond and explain that unresponsive intermediate hops are normal — what matters is whether the destination is reached.",
        },
        {
          step: "Use traceroute to attribute a fault",
          detail:
            "Show that if the trace dies at the router the fault is internal, and if it completes past the router and dies in the ISP's network the fault is theirs. This is the evidence that turns an ISP support call into a specific conversation.",
        },
        {
          step: "Demonstrate the DNS isolation test",
          detail:
            "Ping 8.8.8.8 — succeeds. Ping a domain name — succeeds. Both working means DNS is fine. Explain that this comparison, and only this comparison, separates a DNS fault from a connectivity fault.",
        },
        {
          step: "Inspect which DNS servers the machine actually uses",
          detail:
            "Show the configured servers and query each one individually with nslookup. Demonstrate that if one server is dead and the other works, name resolution becomes intermittent — appearing random but entirely explainable.",
        },
        {
          step: "Create fault one: break DNS deliberately",
          detail:
            "Point the machine at an invalid DNS server address. Observe that every website fails while connectivity is intact, then prove it by pinging a public IP successfully. This is the fault users describe as 'the internet is down'.",
        },
        {
          step: "Diagnose fault one from symptoms alone",
          detail:
            "Without looking at the configuration, run the sequence and show it lands on DNS. Then fix it by restoring correct servers and confirm recovery. The skill is reaching the right conclusion from symptoms, not from knowing what you changed.",
        },
        {
          step: "Create fault two: exhaust or remove the DHCP scope",
          detail:
            "Shrink the scope so a new device cannot get an address. Connect a fresh laptop and observe what happens, then check its assigned address.",
        },
        {
          step: "Identify the 169.254 address and explain it",
          detail:
            "Show the self-assigned link-local address and state what it proves: the machine requested an address and no server answered. Then work the cause list — scope missing, pool exhausted, wrong VLAN, or dead cable — in that order.",
        },
        {
          step: "Create fault three: wrong gateway",
          detail:
            "Configure a valid address with an incorrect gateway. The machine now reaches its own network but nothing beyond it. Observe that ping to the gateway fails while local devices still work, which is the signature of this fault.",
        },
        {
          step: "Create fault four: a path failure",
          detail:
            "Block outbound traffic for one protocol or destination at the router. Show that general connectivity is fine while one service fails — the pattern users report as 'only one website does not work', which is almost always a filtering or routing rule rather than a broken internet.",
        },
        {
          step: "Read the router's WAN status page",
          detail:
            "Show connection state, assigned public address, and uptime. Explain that a short uptime means a recent drop, and that a valid public address means any remaining fault is internal. This one page answers the question clients actually ask.",
        },
        {
          step: "Read the DHCP client list and the system log",
          detail:
            "Show every device that has been allocated an address — which is how you find an unknown device — and read the log for disconnections, authentication failures and configuration changes. Note the timestamps, because a fault's start time often identifies its cause.",
        },
        {
          step: "Restore everything and re-verify against the baseline",
          detail:
            "Undo all four faults, then re-run the four-question sequence and compare against the baseline you saved at the start. Confirm the network is genuinely back, rather than assuming it is because one page loaded.",
        },
        {
          step: "Write the diagnostic runbook",
          detail:
            "Document the four-question sequence, what each result means, the 169.254 interpretation, and how to read the router's status pages. This runbook is what turns a diagnosis you performed once into one anyone on the team can repeat.",
        },
      ],
    },
    practice: {
      title: "Build a baseline, then diagnose four faults from symptoms alone",
      brief:
        "Take a real network, record a healthy baseline, then create and diagnose four controlled faults using only the tools in this session.",
      steps: [
        "Record a full baseline on a healthy network: address, mask, gateway, DNS servers, and successful ping results to gateway, public address and domain.",
        "Run the four-question diagnostic sequence in order and write down what each answer eliminates.",
        "Ping the gateway fifty times and record loss percentage and the min/max/average spread.",
        "Run a traceroute to a public address and identify your router, the first ISP hop and the destination.",
        "Explain in writing why unresponsive intermediate hops in a traceroute are normal and what result actually matters.",
        "Perform the DNS isolation test — public IP against domain name — and record both outcomes.",
        "Query each configured DNS server individually and note whether one is failing while the other works.",
        "Break DNS deliberately, then diagnose it from symptoms without looking at the configuration, and restore it.",
        "Cause a DHCP failure and identify the self-assigned 169.254 address, explaining precisely what it proves.",
        "Work the DHCP cause list in order — scope missing, pool exhausted, wrong VLAN, dead cable — and record which applied.",
        "Cause a wrong-gateway fault and observe that local devices work while nothing beyond the network does.",
        "Cause a path or filtering fault and observe that general connectivity is fine while one service fails.",
        "Read the router's WAN status page and record connection state, public address and uptime.",
        "Read the DHCP client list to identify every allocated device, and the system log for drops, auth failures and configuration changes.",
        "Restore all faults and re-verify against your saved baseline rather than assuming recovery.",
        "Write a one-page diagnostic runbook someone else could follow without asking you a question.",
      ],
      standard:
        "A recorded healthy baseline; the four-question sequence executed in order with each result's meaning explained; ping loss and latency spread measured; a traceroute interpreted honestly including why silent hops are normal; the DNS isolation test performed and both outcomes recorded; four faults created and each diagnosed **from symptoms rather than from knowledge of what was changed**; the 169.254 address correctly identified and explained; router WAN status, DHCP client list and system log all read; recovery verified against baseline; and a written runbook.",
    },
    pitfalls: [
      {
        problem: "Assuming a failed ping means the host is down",
        fix: "Many servers and firewalls ignore ICMP, so no reply can mean blocked rather than absent. Treat ping as one input, and confirm with a real service test before concluding a host is dead.",
      },
      {
        problem: "Reading a successful gateway ping as 'the internet works'",
        fix: "It proves only that the local link works. Continue to a public address and then to a domain name — those are different tests answering different questions.",
      },
      {
        problem: "Treating asterisks in a traceroute as a failure",
        fix: "Routers commonly block the ICMP responses traceroute uses. What matters is whether the destination is reached, not whether every intermediate hop answered.",
      },
      {
        problem: "Diagnosing 'the internet is down' without separating DNS from connectivity",
        fix: "Ping a public IP, then a domain name. If the address works and the name does not, your fault is DNS. Two tests, thirty seconds, and it ends most misdiagnosis.",
      },
      {
        problem: "Seeing a 169.254 address and assuming the user misconfigured something",
        fix: "That address means the machine requested one and no DHCP server answered. It is a failed negotiation, and the cause is a missing scope, an exhausted pool, a wrong VLAN, or a dead cable.",
      },
      {
        problem: "Rebooting the router instead of reading its status pages",
        fix: "A reboot destroys the evidence. Read the WAN status, DHCP client list and system log first — the fault's start time and the connection's uptime frequently identify the cause immediately.",
      },
      {
        problem: "Changing several settings at once during diagnosis",
        fix: "You lose the ability to say what fixed it, and the network ends up in a state nobody can describe. Change one thing, test, and record the result before moving on.",
      },
      {
        problem: "Having no baseline taken while the network worked",
        fix: "Record addresses, DNS servers and ping results when everything is healthy. Without a baseline, a fault gives you nothing to compare against and every investigation starts from zero.",
      },
    ],
    expertNotes: [
      "The DNS isolation test is the highest-value habit in this session. Ping an address, ping a name — that comparison separates two faults that users describe identically and that live on entirely different equipment. Thirty seconds of work prevents an hour of misdirected effort.",
      "Read the ping summary line rather than just watching for replies. Loss percentage and the min-to-max spread reveal a marginal link that never fails completely, which is exactly the fault users report as 'the internet keeps dropping' and that nothing else exposes.",
      "A traceroute is what turns an ISP support call from an argument into a conversation. Without it, it is your word against theirs; with it, you can name the hop where the path dies and whose network it is in. Keep one before you call.",
      "The router's system log is the most neglected diagnostic resource available. It records when the connection dropped, when authentication failed, and when somebody changed a setting — and a surprising share of faults turn out to be an undocumented change. Read the log before you change anything.",
    ],
    vocabulary: [
      {
        term: "ICMP",
        meaning:
          "The protocol ping and traceroute use. Because it is often filtered, a missing reply can mean blocked rather than absent.",
      },
      {
        term: "Traceroute",
        meaning:
          "A tool showing each hop toward a destination, using progressively increasing TTL values. Used to locate where a path fails and whose network it is in.",
      },
      {
        term: "TTL",
        meaning:
          "Time to live — a hop counter in each packet. Traceroute manipulates it deliberately so each router along the path reports itself.",
      },
      {
        term: "DNS resolution",
        meaning:
          "Translating a domain name to an IP address. When it fails, every symptom resembles a total connectivity failure, which is why it must be tested separately.",
      },
      {
        term: "nslookup / dig",
        meaning:
          "Tools that query a DNS server directly and show what a name resolves to and which server answered. Essential for isolating a DNS fault.",
      },
      {
        term: "169.254.x.x (APIPA)",
        meaning:
          "The link-local range a machine assigns itself when DHCP fails. Seeing it proves the machine requested an address and no server answered.",
      },
      {
        term: "DHCP relay",
        meaning:
          "The mechanism that forwards DHCP broadcasts across a router. Without it, a scope on a different VLAN cannot be reached, because broadcasts do not route.",
      },
      {
        term: "WAN status page",
        meaning:
          "A router page showing connection state, assigned public address and uptime. It answers immediately whether a fault is internal or at the ISP boundary.",
      },
    ],
    homework: [
      {
        task: "Record a healthy baseline",
        detail:
          "For a network you support, document addresses, mask, gateway, DNS servers, and ping results to gateway, public address and domain, plus a traceroute. Store it where you can find it during an incident.",
      },
      {
        task: "Diagnose four faults from symptoms",
        detail:
          "Create DNS, DHCP, gateway and path faults, and for each one write the symptoms a user would report, the tests that identify it, and the fix. Have someone else read only the symptoms and confirm your tests identify the right cause.",
      },
      {
        task: "Measure a marginal link",
        detail:
          "Ping a gateway fifty times on both a wired and a wireless connection. Compare loss and latency spread, and explain what the difference tells you about each link's reliability.",
      },
      {
        task: "Write the diagnostic runbook",
        detail:
          "One page: the four-question sequence, what each result means, the 169.254 interpretation, the DNS isolation test, and which router status pages to read. Written so a colleague can follow it without asking you anything.",
      },
    ],
    rubric: [
      {
        criterion: "Tool competence",
        passing: "Can run ping, traceroute and nslookup.",
        excellent:
          "Chooses the right tool for the question, reads output beyond pass/fail, and can explain what each result does and does not prove.",
      },
      {
        criterion: "Diagnostic method",
        passing: "Eventually finds the fault.",
        excellent:
          "Runs the four-question sequence in order, changes one thing at a time, and reaches the right conclusion from symptoms rather than from knowing what was changed.",
      },
      {
        criterion: "DNS isolation",
        passing: "Knows DNS translates names.",
        excellent:
          "Performs the address-against-name comparison instinctively, queries individual servers, and recognises the one-dead-server intermittent pattern.",
      },
      {
        criterion: "DHCP diagnosis",
        passing: "Can renew an address.",
        excellent:
          "Recognises 169.254 immediately, works the cause list in order, and understands why broadcasts need a relay to cross a router.",
      },
      {
        criterion: "Evidence and documentation",
        passing: "Faults were fixed.",
        excellent:
          "Baseline recorded before faults, router status pages and log read before changes were made, recovery verified against baseline, and a runbook written for someone else.",
      },
    ],
    faqs: [
      {
        q: "A website will not load but ping works. What is wrong?",
        a: "Test a domain name against a raw IP address. If the IP works and the name does not, DNS is your fault. If both work, the problem is likely a filtering rule or the site itself rather than your network.",
      },
      {
        q: "Is a failed ping proof that a server is down?",
        a: "No. Many servers and firewalls ignore ICMP deliberately, so no reply can mean blocked rather than absent. Confirm with an actual service test before concluding anything is dead.",
      },
      {
        q: "What does a 169.254 address mean?",
        a: "The machine requested an address from DHCP and no server answered, so it assigned itself a link-local one. Check the scope exists for that VLAN, that the pool is not exhausted, and that the cable is live.",
      },
      {
        q: "Should I reboot the router first?",
        a: "Read its status pages first. A reboot destroys the evidence — the uptime, the log entries and the client list that would have told you what happened. Reboot after you have looked, not instead of looking.",
      },
      {
        q: "How do I prove a fault is the ISP's and not mine?",
        a: "A traceroute showing the path completing through your router and dying inside the ISP's network, plus a WAN status page showing a valid connection. Take both before you call, and the conversation becomes specific.",
      },
    ],
  },

  "network-troubleshooting-practical": {
    summary:
      "The final practical: a deliberately broken network, a timed diagnosis under realistic conditions, and the documentation that turns one engineer's knowledge into something the client can rely on.",
    objectives: [
      "Apply the layered diagnostic method to unknown faults under time pressure",
      "Work through controlled fault scenarios systematically, changing one thing at a time",
      "Attribute each fault to the correct layer and the correct device",
      "Communicate findings clearly to a non-technical client",
      "Produce documentation that makes the network maintainable by someone else",
    ],
    blocks: [
      {
        heading: "Why this session is a practical and not another lecture",
        body: [
          "Everything so far has been taught on faults you knew about, because we created them together. That is a safe way to learn the tools and it is not how the job works. In the job, somebody tells you the network is slow, or a printer vanished, or the accounts department cannot reach the server, and nobody knows what changed. **The skill is not knowing commands; it is reaching the right conclusion from incomplete information.**",
          "So this session runs as a timed assessment. The network has faults you have not seen, deliberately introduced across the layers — physical, addressing, DHCP, DNS, VLAN, wireless and filtering. You diagnose and repair them, narrating your reasoning, and you are assessed on **method** as much as on outcome. Guessing your way to a fix is not a pass even when it works, because it will not work next time.",
          "This is also the session where the course deliverable is completed: **a small office network you planned, addressed, configured and troubleshot, with the addressing scheme and configuration documented.** You have been building it since session one. Today you prove you can repair it without a map, and you hand over the documentation that makes it somebody else's to maintain.",
        ],
      },
      {
        heading: "The method under pressure: what changes when the client is watching",
        body: [
          "The four-question sequence from last session still applies, but under pressure two additional disciplines matter. **Narrate what you are doing and why**, even when nobody asks — it keeps your own reasoning honest, it prevents the flailing that time pressure produces, and it gives the client confidence that the work is controlled rather than hopeful. And **record what you change**, because a fault fixed by three simultaneous changes is a fault you cannot explain, repeat, or prevent.",
          "The second discipline is resisting the urge to restart things. A reboot makes many symptoms disappear temporarily, which feels like progress and destroys the evidence. When you restart a device, you lose its uptime, its logs and its current state — precisely the information that would have identified the cause. **Look before you restart.** If a restart is genuinely the fix, the diagnosis should say so and explain why.",
          "Third, and hardest: **stop when you are stuck and say so.** A client would far rather hear 'I have eliminated the physical layer, addressing and DNS, and I am now looking at the routing between VLANs' than watch an hour of random changes. Stating what you have eliminated is genuinely useful information — it narrows the problem for whoever picks it up, and it is an honest account of real progress.",
        ],
      },
      {
        heading: "Reading symptoms: the translation layer between users and faults",
        body: [
          "Users describe symptoms; engineers need causes. The translation is a skill, and most of it is knowing which questions to ask. **'The internet is slow'** could be a marginal wireless link, a congested channel, a 100-megabit negotiation on a gigabit port, or one machine saturating the connection — four different faults with the same description. **'It works for some people'** is the most useful phrase a user can say, because it points immediately at something user-specific or location-specific rather than a total failure.",
          "The questions that separate causes are consistent. **Who is affected** — everyone, one person, one floor? **What exactly fails** — everything, one site, one application? **When did it start**, and did anything change? **Is it constant or intermittent?** Those four answers eliminate most possibilities before you touch a keyboard, and asking them takes two minutes.",
          "Two patterns are worth memorising. **Intermittent faults are usually physical or wireless** — a marginal cable, a weak signal, interference — because configuration faults tend to fail consistently. And **faults that follow a person are configuration; faults that follow a location are infrastructure.** A user who has problems at every desk has a machine problem; a user who has problems at one desk has a port, cable or coverage problem.",
        ],
      },
      {
        heading: "The fault catalogue you will meet, and where each one lives",
        body: [
          "Across three weeks we have built a catalogue, and it is worth consolidating because these are the faults that account for most real calls. At the **physical layer**: a damaged pair negotiating 100 megabits, an unseated cable, a data run bundled with power. At **addressing**: a wrong subnet mask making remote networks appear local, a static address colliding with a DHCP allocation, a wrong gateway that leaves local traffic working while everything beyond fails.",
          "At **DHCP**: an exhausted pool, a scope on the wrong VLAN, a self-assigned 169.254 address. At **DNS**: a dead server producing intermittent resolution, a stale setting from a previous configuration. At **switching**: an endpoint on a trunk port, an untagged VLAN mismatch between switch and router, a rogue device on an unsecured spare port.",
          "At **wireless**: a guest SSID landing on the staff VLAN because the switch port is access rather than trunk, channel overlap with a neighbour, coverage that was never measured. And at **filtering**: a rule blocking one protocol, which presents as 'only one website does not work' and is almost never an internet failure. **Knowing which layer a symptom belongs to is most of the diagnosis**, and the rest is confirmation.",
        ],
      },
      {
        heading: "Documentation and handover: the deliverable, and why it is the deliverable",
        body: [
          "The documentation is not paperwork attached to the project — it is the product the client keeps after you leave. A network that only one person understands is a liability the client is carrying, and the moment you are unavailable it becomes an emergency. What you hand over should let a competent stranger maintain the network without calling you, which is a higher standard than most freelancers meet and a real competitive advantage when you do.",
          "The pack has five parts. **The as-built network diagram**, showing devices, connections, media and VLANs. **The addressing table**, with every network, its range, gateway, purpose and reserved addresses. **The device configuration record** — hostnames, management addresses, port assignments, SSIDs, channels, and where credentials are stored securely. **The diagnostic runbook** from last session. And **the change log**, recording what was done and when, which is what makes the next change safe.",
          "Then the conversation that finishes the project. **Who applies updates, who monitors the network, what happens during an incident, and what a change costs.** Networks need ongoing attention; a client who believes a configured network needs nothing will be surprised, and the surprise will be your reputation. Defining the ongoing relationship in writing protects both of you — and it is where the recurring revenue in this work lives.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The assessment itself. The instructor breaks the network in ways the student has not seen; the student diagnoses and repairs under time pressure, narrating method, then completes the handover documentation.",
      steps: [
        {
          step: "Brief the scenario and the constraints",
          detail:
            "The accounting practice reports three problems: the accounts department cannot reach the server, visitors cannot connect to Wi-Fi, and one workstation is intermittently slow. Time limit sixty minutes. No hints about what was changed. The client — played by the instructor — will describe symptoms in user language only.",
        },
        {
          step: "Take the report properly before touching anything",
          detail:
            "Ask the four separating questions: who is affected, what exactly fails, when it started, and whether it is constant or intermittent. Two minutes of questioning here routinely eliminates half the possibilities, and skipping it is the most common way to waste the hour.",
        },
        {
          step: "Establish scope before depth",
          detail:
            "Determine quickly whether this is everyone or some people, one location or several. Faults that follow a person are configuration; faults that follow a location are infrastructure. This one decision determines which direction the whole investigation goes.",
        },
        {
          step: "Start with the server access fault and run the four-question sequence",
          detail:
            "From an affected machine: valid address? Gateway reachable? Server address reachable? Name resolves? Narrate each result and what it eliminates. Do not skip steps because you have a suspicion — confirm or eliminate it.",
        },
        {
          step: "Isolate the fault to a layer and state it out loud",
          detail:
            "Say explicitly: this is an addressing fault, or a routing fault, or a VLAN fault. Naming the layer commits you to a hypothesis and makes the next test purposeful rather than exploratory.",
        },
        {
          step: "Diagnose the VLAN fault",
          detail:
            "The classic: the switch port feeding the accounts department was moved from access to trunk, or the trunk on the router no longer carries the server VLAN. Verify by checking port mode and the VLAN membership on both ends against your documentation.",
        },
        {
          step: "Repair it and prove the repair",
          detail:
            "Fix the port mode or VLAN tagging, then confirm from the affected machine that the server is reachable. Prove it, do not assume it — and confirm from a second machine so you know the fix is not specific to one device.",
        },
        {
          step: "Move to the guest Wi-Fi fault",
          detail:
            "Visitors cannot connect. Test it yourself on a device rather than relying on the description — 'cannot connect' covers wrong passphrase, no DHCP address, and association failure, which are three different faults.",
        },
        {
          step: "Distinguish association failure from DHCP failure",
          detail:
            "Does the device associate and then fail to get an address, or fail to associate at all? The first is a DHCP or VLAN problem; the second is security settings, signal, or the access point itself. This distinction halves the search space immediately.",
        },
        {
          step: "Find the guest VLAN fault",
          detail:
            "Commonly the access point's switch port was set to access mode, so the guest SSID has no path to its VLAN and cannot obtain an address. Confirm against the documentation, correct the port mode, and verify a guest receives a 10.10.30.x address.",
        },
        {
          step: "Verify the guest is still isolated after the repair",
          detail:
            "A repair that reconnects guests to the staff network is worse than the outage. Confirm the guest address cannot reach the server. **Never finish a wireless repair without re-testing the security boundary.**",
        },
        {
          step: "Address the intermittent slowness last, deliberately",
          detail:
            "Intermittent faults take longest, so handle them after the definite outages. Ask where the machine sits and whether the problem follows the machine or the location — that single answer tells you whether to look at the device or the infrastructure.",
        },
        {
          step: "Measure rather than guess",
          detail:
            "Ping the gateway fifty times and read loss and latency spread. Check the negotiated link speed. Both take under a minute and between them identify the great majority of intermittent faults.",
        },
        {
          step: "Find the physical fault",
          detail:
            "The classic: a gigabit port negotiating 100 megabits because of a damaged pair, so the user experiences slowness with no error anywhere. Confirm from the switch port and the operating system, then replace the cable.",
        },
        {
          step: "Verify the fix under real load, not just with a ping",
          detail:
            "Transfer a large file and observe throughput. A ping that looks fine tells you almost nothing about a throughput problem — test the thing the user actually complained about.",
        },
        {
          step: "Confirm nothing else broke during the repair",
          detail:
            "Re-run the four-question sequence on a machine from each VLAN, confirm staff, guest and server networks all behave, and re-check the inter-VLAN policy. Repairs cause second faults more often than anyone expects.",
        },
        {
          step: "Report to the client in their language",
          detail:
            "Three faults, three causes, three fixes, in plain terms — no jargon, no blame. State what was wrong, what you changed, what you verified, and what to watch for. This conversation is assessed alongside the technical work, because it is half the job.",
        },
        {
          step: "Complete the handover pack",
          detail:
            "As-built diagram, addressing table, device configuration record, diagnostic runbook and change log. Confirm a competent stranger could maintain this network from the pack alone — that is the standard, and it is what the client is paying for.",
        },
        {
          step: "Agree the ongoing arrangement in writing",
          detail:
            "Who applies changes, who monitors, what happens during an incident, and what a change costs. Networks need continuing attention; a client who expects otherwise will be surprised, and the surprise lands on your reputation.",
        },
      ],
    },
    practice: {
      title: "The final practical: diagnose an unknown broken network and hand it over",
      brief:
        "Work a network with faults you have not seen, under time pressure, using only the method from this course — then produce the complete handover documentation.",
      steps: [
        "Take the fault report using the four separating questions before touching any equipment.",
        "Establish whether each fault follows a person or a location, and record what that implies.",
        "Work the definite outages before the intermittent faults, and say why you are ordering them that way.",
        "Run the four-question sequence on each fault and narrate what every result eliminates.",
        "Name the layer you believe is at fault before testing, so your next test is purposeful.",
        "Change one thing at a time and record every change as you make it.",
        "Prove each repair from at least two machines rather than assuming the first success generalises.",
        "After any wireless repair, re-test that guests still cannot reach internal addresses.",
        "For intermittent faults, measure loss, latency spread and negotiated speed rather than guessing.",
        "Verify throughput with a real file transfer, not with a ping, when the complaint was about speed.",
        "Re-test every VLAN after repairs to confirm you have not introduced a second fault.",
        "Resist restarting devices until you have read their status pages and logs.",
        "If you get stuck, state clearly what you have eliminated and what you are examining next.",
        "Report to the client in plain language: what was wrong, what you changed, what you verified.",
        "Complete the handover pack: as-built diagram, addressing table, device record, runbook, change log.",
        "Write the ongoing maintenance arrangement in three lines and agree it explicitly.",
      ],
      standard:
        "All introduced faults correctly diagnosed and repaired within the time limit; **method assessed alongside outcome** — the four-question sequence used in order, one change at a time, every change recorded, and the layer named before testing; security boundaries re-verified after wireless repairs; intermittent faults diagnosed by measurement rather than guesswork; all VLANs re-tested after repairs; a plain-language client report delivered; and a complete handover pack that would let a competent stranger maintain the network, plus a written ongoing maintenance arrangement.",
    },
    pitfalls: [
      {
        problem: "Touching equipment before taking the fault report",
        fix: "Two minutes of questioning — who, what, when, constant or intermittent — routinely eliminates half the possibilities. Skipping it is the most common way to waste an hour.",
      },
      {
        problem: "Guessing your way to a fix and calling it a pass",
        fix: "A fix reached by accident does not generalise. Method is assessed alongside outcome, because the next fault will be different and only the method carries over.",
      },
      {
        problem: "Restarting devices before reading their logs",
        fix: "A reboot destroys uptime, logs and current state — the exact evidence that identifies the cause. Look first; if a restart really is the fix, your diagnosis should explain why.",
      },
      {
        problem: "Changing several settings at once",
        fix: "You lose the ability to say what fixed it, and the network ends up in a state nobody can describe. One change, one test, one record — every time.",
      },
      {
        problem: "Finishing a wireless repair without re-testing isolation",
        fix: "A guest network reconnected to the staff VLAN is worse than the outage it fixed. Re-test that guests cannot reach internal addresses after every wireless change.",
      },
      {
        problem: "Verifying a throughput fix with a ping",
        fix: "Ping measures reachability and latency, not throughput. If the complaint was speed, transfer a real file and observe the result.",
      },
      {
        problem: "Reporting to the client in technical language",
        fix: "Say what was wrong, what you changed and what you verified, without jargon and without blame. The client's confidence comes from understanding, and this conversation is half the job.",
      },
      {
        problem: "Handing over with no documentation",
        fix: "A network only you understand is a liability the client carries. The handover pack is the deliverable — a competent stranger should be able to maintain the network from it alone.",
      },
    ],
    expertNotes: [
      "Method is the transferable skill; specific fixes are not. Every fault you meet professionally will be new in its details, and the only thing that carries over is the disciplined sequence: establish scope, run the four questions, name the layer, change one thing, test, record. That is what this assessment is really testing.",
      "Narrate while you work. It keeps your reasoning honest, it stops the flailing that time pressure produces, and it gives the client visible evidence that the work is controlled. Engineers who work silently look uncertain even when they are not.",
      "Intermittent faults are almost always physical or wireless, because configuration faults fail consistently. When a client says 'it drops sometimes', reach for a fifty-count ping and a link-speed check before anything else — those two measurements identify most of them.",
      "The handover pack is what separates a professional from someone who fixed a network. It is also commercial: a documented, maintainable network justifies a maintenance agreement, and the maintenance agreement is where the recurring income in this work actually lives.",
    ],
    vocabulary: [
      {
        term: "Fault isolation",
        meaning:
          "Narrowing a problem to a specific layer and device before attempting a repair. The discipline that makes diagnosis fast rather than exploratory.",
      },
      {
        term: "Symptom translation",
        meaning:
          "Converting a user's description into a technical hypothesis by asking who is affected, what fails, when it started, and whether it is constant or intermittent.",
      },
      {
        term: "Controlled fault scenario",
        meaning:
          "A deliberately introduced fault used for training and assessment, so diagnosis can be practised safely and evaluated fairly.",
      },
      {
        term: "Change log",
        meaning:
          "A record of what was changed on the network and when. It is what makes the next change safe and what identifies undocumented modifications.",
      },
      {
        term: "As-built diagram",
        meaning:
          "The network diagram updated to reflect what was actually installed, as against the design or the state found at the start of the project.",
      },
      {
        term: "Diagnostic runbook",
        meaning:
          "A written procedure for working through common faults, so diagnosis does not depend on one person's memory or presence.",
      },
      {
        term: "Intermittent fault",
        meaning:
          "A fault that appears and disappears. Usually physical or wireless in origin, because configuration faults tend to fail consistently.",
      },
      {
        term: "Maintenance arrangement",
        meaning:
          "A written agreement covering who applies changes, who monitors, incident response and the cost of changes. It defines the ongoing relationship after handover.",
      },
    ],
    homework: [
      {
        task: "Complete the timed practical",
        detail:
          "Diagnose and repair all introduced faults within sixty minutes, narrating method throughout and recording every change. Assessed on sequence and reasoning as much as on the outcome.",
      },
      {
        task: "Deliver the client report",
        detail:
          "A plain-language account of each fault: what was wrong, what you changed, what you verified, and what to watch for. No jargon, no blame — written for a manager who has never seen a switch.",
      },
      {
        task: "Submit the complete handover pack",
        detail:
          "As-built diagram, addressing table, device configuration record with credential storage location, diagnostic runbook, and change log. The test is whether a competent stranger could maintain the network from it alone.",
      },
      {
        task: "Write your own fault catalogue",
        detail:
          "Every fault you met in this course, organised by layer, with its symptoms, the test that identifies it, and the fix. This becomes your professional reference and it is worth more than any certification sheet.",
      },
    ],
    rubric: [
      {
        criterion: "Diagnostic method",
        passing: "Faults were eventually fixed.",
        excellent:
          "Four-question sequence used in order, layer named before testing, one change at a time, every change recorded, and reasoning narrated throughout.",
      },
      {
        criterion: "Technical accuracy",
        passing: "Most faults correctly identified.",
        excellent:
          "Every fault attributed to the correct layer and device, repairs verified from multiple machines, and all VLANs re-tested afterwards.",
      },
      {
        criterion: "Measurement over guesswork",
        passing: "Tools were used.",
        excellent:
          "Intermittent faults diagnosed by loss, latency spread and negotiated speed; throughput verified with a real transfer rather than a ping.",
      },
      {
        criterion: "Client communication",
        passing: "The client was told it was fixed.",
        excellent:
          "A plain-language report covering cause, change and verification for each fault, with no jargon and no blame, delivered confidently under questioning.",
      },
      {
        criterion: "Handover documentation",
        passing: "Some notes were provided.",
        excellent:
          "A complete pack — diagram, addressing table, device record, runbook, change log — that would let a competent stranger maintain the network, plus a written maintenance arrangement.",
      },
    ],
    faqs: [
      {
        q: "What if I cannot finish within the time limit?",
        a: "State clearly what you have eliminated and what you are examining next. A partial diagnosis that has genuinely narrowed the problem is more useful — and better assessed — than a rushed guess that happens to work.",
      },
      {
        q: "Is guessing acceptable if the network ends up working?",
        a: "No. Method is assessed alongside outcome, because a fix reached by accident does not generalise to the next fault. The sequence is the skill; the individual fix is not.",
      },
      {
        q: "Should I restart the router during the assessment?",
        a: "Only after you have read its status pages and log. A restart destroys the uptime, logs and current state that would identify the cause, and it will mask the fault rather than explain it.",
      },
      {
        q: "How detailed does the handover documentation need to be?",
        a: "Detailed enough that a competent stranger could maintain the network without calling you. That is the standard, and meeting it is a genuine competitive advantage because most freelancers do not.",
      },
      {
        q: "What happens after the course ends?",
        a: "You have a documented network, a diagnostic runbook and a fault catalogue — the three things that make you employable in IT support and useful to small businesses. The natural next step is the IT Support course, which builds directly on this method.",
      },
    ],
  },
};
