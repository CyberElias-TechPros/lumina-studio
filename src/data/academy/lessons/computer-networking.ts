/**
 * Computer Networking — sessions 1 to 3 (full class lectures).
 * Merged by withCoursePrefix() in ../index.ts.
 */

import type { SessionLecture } from "@/data/academy/types";

export const networkingLessonsA: Record<string, SessionLecture> = {
  "network-fundamentals": {
    summary:
      "How data actually moves between two machines and across the world — the layered model in terms you can use at a client site, and the physical cables and media that everything else depends on.",
    objectives: [
      "Explain what a network is and what problem each layer of the model solves",
      "Distinguish LAN, WAN and the internet accurately rather than interchangeably",
      "Use the layered model as a diagnostic tool, not just as theory to recite",
      "Identify cable types by their category, and terminate and test one correctly",
      "Recognise the failure modes of physical media before blaming configuration",
    ],
    blocks: [
      {
        heading: "The project you are building across these three weeks",
        body: [
          "This course runs around one job, because networking is not learned by describing it. The scenario is real and deliberately ordinary: **a two-floor office in Ikeja for an accounting practice with twenty-two staff**, twelve on the ground floor and ten upstairs, a server cupboard under the stairs, a fibre connection from an ISP, and a manager who wants the network to simply work and to be documented so that the next person can maintain it.",
          "By the end of the course you will have planned the addressing scheme, configured the router and switches, set up the wireless with a separate guest network, deliberately broken the network in controlled ways and repaired it, and produced the documentation a real client pays for. That documentation is the deliverable, and it is what separates someone who fiddled with a router from someone who can be trusted with a client's infrastructure.",
          "The level is **intermediate**, which means we assume you can use a computer confidently but not that you have configured a switch before. What we will not do is skip the fundamentals to get to the interesting parts, because in networking the fundamentals are where the failures live. Almost every 'mysterious' network problem turns out to be a cable, an address, or a setting somebody changed and did not record.",
        ],
      },
      {
        heading: "What a network is, and the three terms people use interchangeably",
        body: [
          "A network is a set of devices that can exchange data, plus the rules they agree on to do so. The rules matter as much as the devices, because two machines connected by a cable that do not share a protocol cannot communicate — which is why standards bodies exist and why 'it is just a cable' is rarely the whole story.",
          "Then the three terms that get blurred. A **LAN**, a local area network, is a network you control within a bounded space — the office we are building. A **WAN**, a wide area network, connects geographically separated networks, and the classic example is a branch office in Abuja linked to head office in Lagos. The **internet** is a specific, very large internetwork made of networks that agree to route to each other using a common set of protocols. It is not a synonym for 'the network' and it is not a synonym for 'the cloud'.",
          "This distinction is practically useful, not pedantic. When a client says 'the network is down', your first question is which network. If the LAN is fine and the WAN link is down, the printer still works and the file server is still reachable — only external access has failed. Diagnosing the wrong one wastes the morning. **Establish the boundary of the failure before you touch anything.**",
        ],
      },
      {
        heading:
          "The layered model in plain terms — because it is a diagnostic tool, not an exam topic",
        body: [
          "The layered model exists for one reason: it lets different people build different parts of a network without coordinating on every detail. Your browser does not need to know whether the office is wired or wireless; the cable does not need to know what a web page is. Each layer does one job and hands the result to the next. The version you will hear most is the **TCP/IP model** — network access, internet, transport, application — which maps onto the more academic seven-layer OSI model you will meet in certification material.",
          "Learn it by what each layer is responsible for rather than by reciting names. At the **bottom**, bits travel over a physical medium — copper, fibre, or radio. Above that, **IP** handles addressing and routing: getting a packet from a source address to a destination address across however many networks lie between. Above that, **TCP and UDP** handle the conversation — TCP guarantees delivery and order and retransmits what is lost, which is why web pages and file transfers use it; UDP just sends, which is why voice and video use it, since a late packet is worse than a missing one.",
          "At the **top** sit the applications — HTTP, DNS, SMTP, SSH. The reason to internalise this is diagnostic: **when something breaks, ask which layer is failing.** A page that will not load could be DNS failing at the application layer, an address problem at the internet layer, or a dead cable at the bottom. Those are three completely different fixes, and the layered model tells you which test to run. That is the whole point of learning it, and we will use it that way in session five.",
        ],
      },
      {
        heading: "Cables and media: the layer everyone blames last and that fails most often",
        body: [
          "The physical layer is unglamorous and it is where a large share of real faults live. **Twisted-pair copper** is the standard for office wiring. The categories matter: **Cat5e** supports a gigabit to 100 metres, **Cat6** does the same with better performance and headroom, and **Cat6a** supports 10 gigabit over the full distance. For a new office fit-out, Cat6 is the sensible minimum — the cable outlasts the equipment by a decade, so specifying Cat5e in 2026 to save a small amount now is a poor trade.",
          "Two physical details cause more faults than anything else. **Termination quality** — a plug crimped badly, a pair nicked while stripping, or conductors in the wrong order produces a link that works intermittently or negotiates down to 100 megabits, and intermittent is far harder to diagnose than dead. And **cable length and route** — beyond 100 metres copper degrades, and a cable run tightly parallel to power cabling or wrapped around a fluorescent ballast picks up interference that shows up as errors under load rather than at idle.",
          "Then the alternatives, each with a real use case. **Fibre** carries light rather than electricity, so it is immune to electrical interference, suffers no meaningful signal loss over distance, and is what your ISP link and any run between buildings should use. **Wi-Fi** trades reliability and speed for mobility, and in a Lagos office with concrete floors it needs deliberate planning rather than a single access point and hope. Knowing which medium suits which job is a large part of designing a network that does not need revisiting.",
        ],
      },
      {
        heading: "Reading the physical layer: what a link light is actually telling you",
        body: [
          "Every switch port and network card has indicators, and most people ignore them. A steady link light means the two ends have negotiated a connection. A **flashing** light means traffic is passing. The colour or label often indicates speed — a green gigabit link versus an amber 100-megabit link. When a client reports that a machine is slow, and you find it has negotiated 100 megabits on a gigabit port, the cause is almost always one bad pair in the cable: gigabit uses all four pairs, and 100 megabit only needs two, so a cable with one damaged pair will happily run at the lower speed and appear to work.",
          "That single observation — **a working link at the wrong speed means damaged pairs** — saves hours. It is invisible from the operating system unless you know to look, and it produces exactly the symptom clients describe as 'the internet is slow today' with no error anywhere.",
          "So the physical inspection routine is short and worth memorising: check the link light and its speed, check the cable is fully seated at both ends, check the run for damage or sharp bends, check it is not bundled with power cabling, and if anything is questionable **swap the cable**. A known-good cable is the cheapest diagnostic tool in networking, and swapping one takes ten seconds. Professionals swap the cable first and theorise second.",
        ],
      },
    ],
    demonstration: {
      intro:
        "We survey the Ikeja office, produce its network diagram, inspect and test the existing cabling, and terminate a cable to a standard we would sign off on.",
      steps: [
        {
          step: "Walk the site and write down what is actually there",
          detail:
            "Count the machines per floor, find the server cupboard, identify where the ISP fibre enters the building, note the existing switch and its port count, and record where power and data cabling run together. Do not trust the previous installer's diagram — verify it, because it is usually wrong.",
        },
        {
          step: "Draw the network as it exists, not as it should be",
          detail:
            "Sketch the ISP termination, the router, the switch, the access points and the endpoints, with cable types marked. This is the 'as-found' diagram. It feels like wasted time and it is the single most useful document in the project, because every later decision refers back to it.",
        },
        {
          step: "Identify the media in use and whether it is adequate",
          detail:
            "Read the printing on the cable jackets — it states the category. If you find Cat5e in a new fit-out, flag it. If you find cable runs near power conduit or fluorescent fittings, note them as interference risks before anything goes wrong.",
        },
        {
          step: "Inspect link lights on the switch",
          detail:
            "Check every port: is there a link, is it active, and what speed has it negotiated? Record any port showing a link at 100 megabits on a gigabit switch — each one is a candidate damaged cable and a client complaint waiting to happen.",
        },
        {
          step: "Check the operating system's view of the same link",
          detail:
            "On a Windows machine, open the network adapter status and confirm the negotiated speed matches the switch. A mismatch between what the switch reports and what the OS reports points at the cable or the adapter rather than at configuration.",
        },
        {
          step: "Test an existing drop with a cable tester",
          detail:
            "Use a tester that checks all eight conductors and reports which pairs pass. A pass on all pairs with the correct wire map means the cable is sound; a failure on one pair explains a 100-megabit negotiation exactly.",
        },
        {
          step: "Strip and prepare a cable for termination",
          detail:
            "Strip roughly 25 mm of outer jacket without nicking the inner conductors — a nicked conductor is a future intermittent fault. Untwist each pair only as far as necessary, because excessive untwisting degrades performance in a way no tester will show you.",
        },
        {
          step: "Arrange conductors to the T568B standard",
          detail:
            "Order them white-orange, orange, white-green, blue, white-blue, green, white-brown, brown. Use the same standard at both ends — mixing T568A and T568B produces a crossover, which is not what an office patch run needs. Consistency matters more than which standard you choose.",
        },
        {
          step: "Trim, insert and crimp",
          detail:
            "Trim the conductors square so all eight reach the end of the plug, confirm the outer jacket enters the plug body so the crimp grips the cable rather than only the wires, then crimp firmly. A plug that grips only conductors will fail when it is pulled.",
        },
        {
          step: "Test the cable you just made",
          detail:
            "Run the tester and confirm all eight conductors pass in the correct order. If one fails, cut the plug off and redo it — do not 'make it work'. A marginal termination is worse than a bad one, because it fails later and somewhere inconvenient.",
        },
        {
          step: "Prove it in service, not just on a tester",
          detail:
            "Connect a laptop through the new cable and confirm a gigabit link is negotiated. Then transfer a large file and watch the throughput. A tester passing and a real transfer at full speed are different claims, and you want both.",
        },
        {
          step: "Demonstrate the classic 100-megabit fault",
          detail:
            "Deliberately use a cable with one damaged pair and show the port negotiating 100 megabits while still passing traffic. This is the fault that produces 'the network is slow' with no error message, and recognising it by the link light alone is the skill.",
        },
        {
          step: "Label everything you touch",
          detail:
            "Label both ends of every cable and every patch panel port. Label now, while you know what goes where, because the alternative is somebody tracing cables under a floor in six months with no information.",
        },
        {
          step: "Update the diagram to match reality",
          detail:
            "Mark what you changed, the cable categories in use, and the ports you tested. The 'as-found' diagram becomes the 'as-built' diagram, and that is the document the client keeps.",
        },
      ],
    },
    practice: {
      title: "Survey a real network, test its cabling, and terminate to standard",
      brief:
        "Take an actual network — the office, a cyber café, a home — and produce professional documentation of it, then demonstrate competent physical work.",
      steps: [
        "Walk the site and count the devices, identifying where the internet enters the building and where the switching happens.",
        "Draw an as-found diagram showing ISP, router, switches, access points and endpoints, with cable types marked on each run.",
        "Read the cable jackets and record the category in use; flag any run that is under-specified for a new installation.",
        "Note any data cabling bundled with power cabling or passing near fluorescent fittings as interference risks.",
        "Inspect every switch port and record link state and negotiated speed; list any gigabit port linked at 100 megabits.",
        "Compare the operating system's reported link speed with the switch's view on at least one machine and note any mismatch.",
        "Test at least three existing drops with a cable tester and record which pairs pass.",
        "Terminate two cables to T568B, stripping without nicking conductors and keeping untwisting to a minimum.",
        "Test both terminated cables and confirm all eight conductors pass in the correct order.",
        "Connect a laptop through one and confirm a gigabit link, then transfer a large file to verify real throughput.",
        "Reproduce the damaged-pair fault and observe the link negotiating 100 megabits while still passing traffic.",
        "Label both ends of every cable you made and every port you tested.",
        "Explain out loud, in your own words, which layer of the model each of today's faults lived at.",
        "Update your diagram into an as-built version and write ten lines on what you found and what you would change.",
      ],
      standard:
        "An accurate as-found diagram of a real network with media identified; a record of link states and negotiated speeds with slow ports flagged; three drops tested with results recorded; two cables terminated to T568B passing all eight conductors and delivering a verified gigabit link under real file transfer; the 100-megabit damaged-pair fault reproduced and explained; every cable labelled; and a written summary that places each observed fault at the correct layer of the model.",
    },
    pitfalls: [
      {
        problem: "Treating LAN, WAN and internet as the same thing",
        fix: "Ask which network has failed before diagnosing. If the LAN is healthy and only the WAN link is down, internal services still work — and the fix is with the ISP, not with your switch.",
      },
      {
        problem: "Learning the layered model as names to recite",
        fix: "Learn it as a diagnostic map. When something breaks, ask which layer is failing, because a DNS failure, an addressing failure and a dead cable are three unrelated fixes.",
      },
      {
        problem: "Specifying Cat5e on a new installation to save money",
        fix: "Cabling outlasts equipment by a decade. Cat6 minimum for a new fit-out — the saving is small now and the cost of rewiring later is enormous.",
      },
      {
        problem: "Nicking conductors while stripping the jacket",
        fix: "A nicked conductor passes a tester and fails under load, months later, intermittently. Strip carefully and cut the plug off and restart if you damage one.",
      },
      {
        problem: "Mixing T568A and T568B between the two ends",
        fix: "That produces a crossover cable. Use the same standard at both ends and keep it consistent across the whole installation.",
      },
      {
        problem: "Ignoring the link light's speed indication",
        fix: "A gigabit port linked at 100 megabits means damaged pairs, because gigabit needs all four pairs and 100 megabit only two. It presents as unexplained slowness with no error anywhere.",
      },
      {
        problem: "Running data cable parallel to power or around fluorescent ballasts",
        fix: "Induced interference causes errors under load that do not appear at idle. Separate data and power runs, and cross them at right angles where they must meet.",
      },
      {
        problem: "Leaving cables and ports unlabelled",
        fix: "Label both ends while you know what goes where. The alternative is somebody tracing cables under a floor with no information, at the client's expense.",
      },
    ],
    expertNotes: [
      "Swap the cable before you theorise. A known-good cable is the cheapest diagnostic in networking and takes ten seconds; most 'mysterious' faults end there. The discipline of testing the physical layer first, before touching configuration, is what makes an experienced engineer fast.",
      "The 100-megabit-on-a-gigabit-port fault is worth memorising because it is common and invisible. It presents exactly as clients describe: 'the internet is slow today', with no error, no warning, and nothing wrong in the configuration. The link light tells you immediately.",
      "Documentation is the deliverable, not an administrative afterthought. A network that only one person understands is a liability the client is carrying, and the as-built diagram is what makes your work maintainable by anyone. It is also what justifies your fee.",
      "Fibre between buildings and for the ISP link is not a luxury. Copper between two structures invites ground-potential and lightning damage, and a single storm can destroy equipment at both ends. In Lagos, where thunderstorms are seasonal and severe, this is a practical rather than theoretical consideration.",
    ],
    vocabulary: [
      {
        term: "LAN",
        meaning:
          "A local area network — devices communicating within a bounded space you control, such as a single office or building.",
      },
      {
        term: "WAN",
        meaning:
          "A wide area network connecting geographically separated networks, such as a branch office linked to head office.",
      },
      {
        term: "TCP/IP model",
        meaning:
          "The practical layered description of network communication: network access, internet, transport and application. Its value is as a diagnostic map.",
      },
      {
        term: "Packet",
        meaning:
          "A unit of data with source and destination addressing plus payload, routed independently across a network.",
      },
      {
        term: "TCP versus UDP",
        meaning:
          "TCP guarantees delivery and order by retransmitting losses, suiting web and file transfer. UDP simply sends, suiting voice and video where a late packet is worse than a lost one.",
      },
      {
        term: "Cat6",
        meaning:
          "A category of twisted-pair copper cabling supporting gigabit to 100 metres with headroom; the sensible minimum for a new office installation.",
      },
      {
        term: "T568B",
        meaning:
          "The standard conductor ordering for terminating an RJ45 plug. Must match at both ends of a run, or you create a crossover.",
      },
      {
        term: "Negotiated speed",
        meaning:
          "The link speed two connected devices agree on. A gigabit port linking at 100 megabits indicates damaged pairs in the cable.",
      },
    ],
    homework: [
      {
        task: "Document a real network",
        detail:
          "Produce an as-found diagram of a network you have access to, with device roles, media types and port speeds recorded. Include three faults or risks you observed and what you would change.",
      },
      {
        task: "Terminate and prove two cables",
        detail:
          "Terminate two cables to T568B, test all eight conductors, then verify a gigabit link and real file throughput through one of them. Photograph the tester result.",
      },
      {
        task: "Explain the layers in your own words",
        detail:
          "Write one paragraph per layer of the TCP/IP model saying what it does and naming one fault that lives there. No definitions copied from anywhere — this is the test of whether the model is useful to you yet.",
      },
      {
        task: "Find a slow link in the wild",
        detail:
          "Check the negotiated speed on three machines you use regularly. Any that are not at the expected speed, investigate the cable and report what you found. This fault is everywhere once you start looking.",
      },
    ],
    rubric: [
      {
        criterion: "Conceptual accuracy",
        passing: "Can define LAN, WAN and internet and name the layers.",
        excellent:
          "Uses the layered model to reason about faults, placing each observed problem at the correct layer and choosing the right test because of it.",
      },
      {
        criterion: "Site documentation",
        passing: "A diagram of the network exists.",
        excellent:
          "An accurate as-found diagram with media types, port speeds and identified risks, updated into an as-built version after work is done.",
      },
      {
        criterion: "Physical workmanship",
        passing: "A cable was terminated and it works.",
        excellent:
          "Termination to T568B with clean stripping and minimal untwisting, all eight conductors passing, and a verified gigabit link under real file transfer.",
      },
      {
        criterion: "Physical-layer diagnosis",
        passing: "Used a cable tester.",
        excellent:
          "Identified a 100-megabit negotiation as damaged pairs from the link light alone, and reproduced the fault deliberately to confirm the reasoning.",
      },
      {
        criterion: "Professional habits",
        passing: "The work is functional.",
        excellent:
          "Everything labelled, cable category choices justified, interference risks noted, and the swap-the-cable-first discipline applied before theorising.",
      },
    ],
    faqs: [
      {
        q: "Do I need to memorise the OSI seven layers?",
        a: "For certification exams, yes. For doing the work, the four-layer TCP/IP model is what you will actually use to reason about faults. Learn what each layer is responsible for — that is what makes it useful at a client site.",
      },
      {
        q: "Is Cat6 worth the extra cost over Cat5e?",
        a: "On a new installation, yes. Cabling lasts a decade or more and outlives several generations of equipment. The price difference now is small against the cost of rewiring a finished office later.",
      },
      {
        q: "Why does my link show 100 megabits on a gigabit switch?",
        a: "Almost always damaged pairs. Gigabit needs all four pairs; 100 megabit needs only two, so a cable with one bad pair runs at the lower speed while appearing to work fine. Test the cable and re-terminate or replace it.",
      },
      {
        q: "Should I use fibre or copper between two buildings?",
        a: "Fibre. It is immune to electrical interference, has no practical distance limit at office scales, and — importantly in Lagos — carries no electrical path between structures, which protects equipment during thunderstorms.",
      },
      {
        q: "How long can a copper run be?",
        a: "100 metres for standard Ethernet over twisted pair, including patch leads. Beyond that you need a switch to regenerate the signal or a fibre run, and the limit is firm rather than approximate.",
      },
    ],
  },

  "ip-addressing": {
    summary:
      "The addressing scheme that makes a network work: IPv4 and IPv6, subnet masks and what they actually do, DHCP against static allocation, and the NAT that lets a whole office share one public address.",
    objectives: [
      "Read and explain an IPv4 address and its subnet mask without guessing",
      "Size a subnet correctly for a given number of hosts",
      "Design a coherent addressing scheme for the office, with room to grow",
      "Configure DHCP sensibly and know which devices must be static",
      "Explain NAT accurately, including what it does and does not protect",
    ],
    blocks: [
      {
        heading:
          "An IP address is a location, and a subnet mask says how much of it is the location",
        body: [
          "Every device on an IP network has an address, and the address has two parts that are not marked: the **network portion**, which identifies which network you are on, and the **host portion**, which identifies you within it. The **subnet mask** is what divides them. This is the single idea the rest of the session rests on, and it is worth getting solid before anything else.",
          "With **255.255.255.0** — or **/24**, the same thing written differently — the first three octets are the network and the last is the host. So 192.168.1.0 through 192.168.1.255 is one network, and 192.168.2.0/24 is a different network entirely. Within a /24 there are 256 addresses, of which **254 are usable**: the first is the network address and the last is the broadcast address, and neither can be assigned to a device. Forgetting those two is the most common arithmetic error in this subject.",
          "The practical consequence is immediate and it is the one that generates support calls. Two machines on 192.168.1.10/24 and 192.168.1.20/24 are on the same network and can talk directly. Two machines on 192.168.1.10/24 and 192.168.2.10/24 are on **different** networks and cannot talk without a router, no matter how physically close they sit. When a client says 'the printer worked yesterday', a changed subnet mask is a genuine candidate, and it is invisible unless you check it.",
        ],
      },
      {
        heading: "Private and public addresses, and why your office uses the ones it uses",
        body: [
          "Not every address is reachable from the internet. Three ranges are reserved for private use and will never be routed publicly: **10.0.0.0/8**, **172.16.0.0/12**, and **192.168.0.0/16**. Your office uses addresses from these ranges, and every other home and small business on earth uses the same ones. That is not a collision, because private addresses only have meaning inside the network that uses them.",
          "Everything outside those ranges is **public** — globally unique and routable on the internet. Your office has a small number of public addresses from the ISP, usually just one, and everything internal is private. The mechanism that connects the two is NAT, which we will come to, and understanding that boundary is essential to understanding why an internal server is not automatically reachable from outside.",
          "For our accounting practice the sensible choice is **10.10.0.0/16** rather than 192.168.0.0/16. The reason is not fashion: 192.168.x is what every domestic router defaults to, so if a staff member connects over VPN from home, their home network collides with the office network and the VPN fails in confusing ways. Using a less common private range costs nothing and removes a whole category of remote-access problem. **This is the kind of decision that looks trivial and saves hours later.**",
        ],
      },
      {
        heading: "Sizing subnets: the arithmetic, and why you should leave room",
        body: [
          "Subnet size is a power of two, which is the part people find awkward until they see the pattern. The number of host bits determines capacity: **/24** gives 256 addresses and 254 usable hosts, **/25** gives 128 and 126 usable, **/26** gives 64 and 62 usable, **/27** gives 32 and 30 usable. Each step down the prefix halves the space. The usable count is always the total minus two, for network and broadcast.",
          "For twenty-two staff, a single /24 is the obvious answer and the right one. You might be tempted to use a /27 to be tidy, since thirty usable addresses covers twenty-two — but that leaves room for eight more devices, and an accounting practice will acquire printers, a server, access points, a network storage device, cameras and guests. **Size for what the network will be in three years, not what it is today**, because re-addressing a live network means touching every device and every documented reference to it.",
          "The reason to subnet at all, rather than putting everything in one flat network, is separation. Staff, guests, servers and devices like printers and cameras have different trust levels and different needs. Splitting them means a guest cannot reach the accounts server, and a compromised camera cannot reach the file share. **Separation is a security control, not an organisational preference**, and it is far easier to build in at design time than to retrofit.",
        ],
      },
      {
        heading: "DHCP against static: both are correct, for different devices",
        body: [
          "**DHCP** hands out addresses automatically. A device joins, broadcasts a request, and the DHCP server replies with an address, the subnet mask, the gateway and DNS servers. It removes an entire class of human error and it is why plugging in a laptop just works. For a network with staff coming and going, it is the only sane approach for client devices.",
          "But DHCP is wrong for devices other machines need to find. A server, a network printer, a network storage device, or an access point that staff connect to by name must have a **predictable address**, because a DHCP address can change and every reference to the old one then breaks. The professional solution is not to abandon DHCP but to use a **DHCP reservation**: the server still gets its address from DHCP, so configuration stays centralised, but it always receives the same one.",
          "Two related settings matter and are frequently misconfigured. The **lease time** determines how long an address is held before renewal — a day is reasonable for staff devices, while a guest network benefits from a short lease of a couple of hours so addresses are recycled as people come and go. And the **scope** must have room: if your DHCP pool holds thirty addresses and forty devices connect, the last ten get nothing and the symptom looks like a broken network rather than an exhausted pool. **Always size the pool above the realistic device count.**",
        ],
      },
      {
        heading: "NAT: what it does, and the security claim you should not repeat",
        body: [
          "**Network Address Translation** is what lets twenty-two machines share one public address. When an internal machine contacts a website, the router rewrites the source address from the private one to the public one and records the mapping, so the reply can be translated back to the right machine. Thousands of these translations happen per second and the whole thing is invisible.",
          "NAT is often described as a firewall, and you should be careful with that claim. It does provide a degree of protection as a side effect — because the router only forwards replies to connections it initiated, an unsolicited inbound connection has nowhere to go. But that is a consequence of stateful behaviour, not a security design. **A firewall is a policy about what is permitted; NAT is an addressing translation.** A network can have NAT and no meaningful filtering, and it can have a firewall with no NAT at all. Say it accurately, because clients repeat what you tell them.",
          "The practical implications are worth knowing. Because internal machines are not directly reachable, **hosting a service inside the office requires port forwarding** — an explicit rule telling the router to send inbound traffic on a port to a specific internal address. Each such rule is a hole you deliberately opened and must maintain. And NAT is why a remote user needs a VPN rather than simply connecting to the file server: from outside, the server has no address. Finally, **IPv6 removes the need for NAT** entirely, because there are enough addresses for everything to be public — which changes how you think about firewalling, not whether you need it.",
        ],
      },
      {
        heading: "IPv6: not optional forever, and worth understanding now",
        body: [
          "IPv4 addresses ran out. The global pool was exhausted years ago, and while address trading and NAT keep things running, the long-term direction is unambiguous. **IPv6** uses 128-bit addresses, written in hexadecimal groups separated by colons, giving enough addresses that the entire concept of a scarce public address disappears. Your ISP may already be providing it alongside IPv4.",
          "What changes practically: there is no NAT, so devices can have globally routable addresses, which makes **the firewall more important rather than less** — you can no longer rely on private addressing as an incidental barrier. Subnetting works differently too; the convention is a /64 per network regardless of host count, because the address space is not scarce and a consistent size simplifies everything.",
          "For this course, the honest position is that your office will run **IPv4 today and dual-stack soon**. You should be able to read an IPv6 address, understand that a /64 is the standard allocation, and know that enabling IPv6 without reviewing firewall rules is a genuine security regression. That is enough to be useful and enough to not be surprised, which is the standard this course holds throughout.",
        ],
      },
    ],
    demonstration: {
      intro:
        "We design the addressing scheme for the Ikeja office from first principles, then configure DHCP with reservations and demonstrate NAT working on the router.",
      steps: [
        {
          step: "List what needs an address, now and in three years",
          detail:
            "Twenty-two staff machines, two servers, three printers, network storage, two access points per floor, a network camera system, and guests. Write the count honestly and add a third for growth — the number you design for is the one that matters, not today's headcount.",
        },
        {
          step: "Choose the private range deliberately",
          detail:
            "Select **10.10.0.0/16** rather than the 192.168.0.0/16 every home router uses. Explain why: staff connecting over VPN from home will not have their home network collide with the office network. Free decision, real benefit.",
        },
        {
          step: "Decide how many networks you need and why",
          detail:
            "Four: **staff**, **servers**, **guests**, and **devices** for printers, cameras and access points. Justify each by trust level — a guest must not reach the accounts server, and a compromised camera must not reach the file share. Separation is a control, not tidiness.",
        },
        {
          step: "Size each subnet and show the arithmetic",
          detail:
            "Staff **10.10.10.0/24** with 254 usable for twenty-two machines plus growth. Servers **10.10.20.0/28** — sixteen addresses, fourteen usable, which is tight but appropriate. Guests **10.10.30.0/24** because the population is unpredictable. Devices **10.10.40.0/24**. State the usable count for each, remembering to subtract two.",
        },
        {
          step: "Write the scheme down before configuring anything",
          detail:
            "A table: network, address and prefix, usable range, gateway, purpose, and expected device count. This table is the deliverable's core, and every later configuration refers back to it. Configuring before designing is how networks end up undocumented.",
        },
        {
          step: "Configure the router interfaces as gateways",
          detail:
            "Assign 10.10.10.1, 10.10.20.1, 10.10.30.1 and 10.10.40.1 to the respective interfaces or VLAN interfaces, each with its correct mask. The gateway is the first usable address by convention — not a rule of IP, but a convention that makes documentation obvious to the next person.",
        },
        {
          step: "Verify the gateways before adding clients",
          detail:
            "From a laptop connected to each network, confirm you can reach its gateway. Doing this now, with one machine, is trivial; discovering it after forty devices are connected is a morning lost.",
        },
        {
          step: "Configure the DHCP scope for staff",
          detail:
            "Pool 10.10.10.50 to 10.10.10.200, mask 255.255.255.0, gateway 10.10.10.1, DNS as chosen. The pool deliberately excludes the first forty-nine addresses so static and reserved devices have predictable space below it.",
        },
        {
          step: "Size the pool against the real device count",
          detail:
            "Confirm the pool holds far more addresses than the staff network will ever have. A pool of thirty serving forty devices produces an exhausted-scope failure that looks exactly like a broken network, and it is entirely preventable.",
        },
        {
          step: "Set a sensible lease time per network",
          detail:
            "One day for staff, who reconnect predictably. Two hours for guests, so addresses are recycled as people leave. A long lease on a guest network exhausts the pool; a very short lease on staff devices causes needless churn.",
        },
        {
          step: "Create reservations for everything that must be findable",
          detail:
            "Reserve addresses for the two servers, three printers and the storage device by their MAC addresses. They still receive configuration from DHCP — so it stays centralised — but always get the same address. This is the professional alternative to manual static configuration.",
        },
        {
          step: "Prove DHCP works end to end",
          detail:
            "Connect a fresh laptop, confirm it receives an address from the correct scope, the right mask, gateway and DNS. Then release and renew, and confirm it comes back. Finally connect a second machine and confirm it gets a different address.",
        },
        {
          step: "Demonstrate the wrong-mask failure",
          detail:
            "Set a laptop to 10.10.10.10 with mask 255.255.0.0 and show that it now believes 10.10.20.x is local, so it tries to reach the server directly instead of via the gateway — and fails. This is the exact fault behind 'the printer worked yesterday'.",
        },
        {
          step: "Watch NAT working on the router",
          detail:
            "Open the router's NAT or connection-tracking table and show the translations in progress: internal private address and port mapped to the public address and a different port. Then explain that the router only forwards replies to connections it initiated, which is why unsolicited inbound traffic has nowhere to go.",
        },
        {
          step: "Show what happens without a forwarding rule",
          detail:
            "From an external connection, attempt to reach the internal server. It will fail, because from outside the server has no address. This is precisely why a remote user needs a VPN rather than a direct connection — and why hosting anything internally means opening a deliberate, maintained hole.",
        },
        {
          step: "Check the IPv6 position",
          detail:
            "Look at whether the ISP is providing IPv6 and whether the router has it enabled. If it is on, confirm firewall rules were reviewed — enabling IPv6 while assuming private addressing is protecting you is a real and common regression.",
        },
        {
          step: "Finalise the documentation",
          detail:
            "Update the addressing table with what was actually configured, including reservations by MAC address and lease times. Note any deviation from the plan and why. This document is what the client keeps and what the next engineer reads.",
        },
      ],
    },
    practice: {
      title: "Design, configure and break an addressing scheme",
      brief:
        "Produce a real addressing design for a small office, configure it, and then deliberately cause the addressing faults you will be called out to fix.",
      steps: [
        "Inventory every device that needs an address today and estimate the count in three years.",
        "Choose a private range deliberately, avoiding 192.168.0.0/16, and write down why you chose it.",
        "Design at least four networks separated by trust level — staff, servers, guests and devices — and justify each.",
        "Size each subnet, writing the total addresses, the usable count after subtracting network and broadcast, and the growth headroom.",
        "Produce the addressing table: network, prefix, usable range, gateway, purpose, expected devices.",
        "Configure each gateway on the router and verify reachability from one machine on each network before adding more.",
        "Configure a DHCP scope with the pool starting above the static range, the correct mask, gateway and DNS.",
        "Confirm the pool is comfortably larger than the realistic device count, and show the arithmetic.",
        "Set different lease times for staff and guest networks and explain the reasoning for each.",
        "Create DHCP reservations for at least three devices that other machines must find, using their MAC addresses.",
        "Connect a fresh machine and confirm it receives a correct address, then release and renew to prove it repeats.",
        "Demonstrate the wrong-subnet-mask fault and explain precisely why the machine then fails to reach another network.",
        "Inspect the router's NAT table and describe what each translation entry represents.",
        "Attempt to reach an internal device from outside and explain why it fails without a forwarding rule.",
        "Check whether IPv6 is active and whether firewall rules were reviewed alongside it.",
        "Update your documentation to match what you actually built, noting any deviation from the design.",
      ],
      standard:
        "A written addressing design with at least four trust-separated networks, each sized with total and usable counts shown and growth headroom justified; gateways configured and verified before clients were added; a DHCP scope correctly sized with a sensible pool range and per-network lease times; at least three MAC-based reservations; a demonstrated wrong-mask fault with a correct explanation; NAT observed in the router's translation table with an accurate account of what it does and does not protect; IPv6 status checked; and documentation matching the built network.",
    },
    pitfalls: [
      {
        problem: "Forgetting to subtract the network and broadcast addresses",
        fix: "Usable hosts are always the total minus two. A /24 has 254 usable addresses, not 256. This arithmetic error propagates into every capacity decision that follows.",
      },
      {
        problem: "Using 192.168.0.0/16 because it is the default",
        fix: "It collides with every home router, which breaks staff VPN connections in confusing ways. Use a less common private range such as 10.10.0.0/16 — it costs nothing.",
      },
      {
        problem: "Sizing subnets for today's device count",
        fix: "Re-addressing a live network means touching every device and every documented reference. Size for three years ahead; address space is free and rewiring is not.",
      },
      {
        problem: "Putting everything in one flat network",
        fix: "Guests, staff, servers and cameras have different trust levels. Separate them, because a guest who can reach the accounts server is a breach waiting to happen.",
      },
      {
        problem: "A DHCP pool smaller than the device count",
        fix: "The last devices to connect get no address and the symptom reads as a broken network. Always size the pool well above the realistic population, especially for guests.",
      },
      {
        problem: "Configuring servers and printers with manual static addresses",
        fix: "Use DHCP reservations instead — the device still gets centralised configuration but always receives the same address. Manual statics drift and are never documented.",
      },
      {
        problem: "Describing NAT as a firewall",
        fix: "NAT translates addresses; a firewall applies policy. They often coexist but they are different things, and clients repeat whatever you tell them. Be precise.",
      },
      {
        problem: "Enabling IPv6 without reviewing firewall rules",
        fix: "With IPv6 there is no NAT, so devices can be globally routable. Enabling it while assuming private addressing protects you is a genuine security regression, and a common one.",
      },
    ],
    expertNotes: [
      "Design the addressing on paper before touching a device. Thirty minutes of design prevents a live network that has to be re-addressed later, and the resulting table is the document that makes your work maintainable. It is also the artefact that shows a client you did real engineering.",
      "DHCP reservations are the mark of someone who has maintained networks. Manual static addresses work until somebody changes them, and then nothing is documented. Centralised allocation with per-device reservations gives you predictability and an audit trail in the same place.",
      "The wrong-subnet-mask fault is worth internalising because it is invisible and common. The machine appears connected, has an address, and can reach some things — but not others, because it believes they are local when they are not. Checking the mask before the configuration saves a great deal of time.",
      "Be accurate about NAT in front of clients. Saying it is a firewall is a small imprecision that becomes a large misunderstanding, because it leads people to believe they are protected when they have applied no policy at all. Precision here is a professional courtesy.",
    ],
    vocabulary: [
      {
        term: "Subnet mask",
        meaning:
          "The value that divides an IP address into its network and host portions. It determines which addresses a machine considers local and which must go via a gateway.",
      },
      {
        term: "CIDR notation",
        meaning:
          "The slash form of a subnet mask — /24 means 255.255.255.0. A shorter prefix means a larger network; each step down halves the space.",
      },
      {
        term: "Private address range",
        meaning:
          "10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16 — reserved for internal use and never routed on the public internet.",
      },
      {
        term: "Broadcast address",
        meaning:
          "The last address in a subnet, used to reach every host on it. Not assignable to a device, which is why usable hosts are the total minus two.",
      },
      {
        term: "DHCP scope",
        meaning:
          "The range of addresses a DHCP server may allocate, together with the mask, gateway, DNS servers and lease time it hands out.",
      },
      {
        term: "DHCP reservation",
        meaning:
          "Binding a specific address to a specific MAC address so a device always receives the same one while still being configured centrally.",
      },
      {
        term: "NAT",
        meaning:
          "Network Address Translation, rewriting private source addresses to a public one so many machines can share one address. An addressing mechanism, not a firewall.",
      },
      {
        term: "Dual stack",
        meaning:
          "Running IPv4 and IPv6 simultaneously, which is the practical reality during the long transition between the two.",
      },
    ],
    homework: [
      {
        task: "Design an addressing scheme for a real organisation",
        detail:
          "Pick a business you know, inventory its likely devices, and produce a full addressing table with at least four trust-separated networks. Show the usable-host arithmetic for every subnet and justify the growth headroom.",
      },
      {
        task: "Configure DHCP with reservations",
        detail:
          "On your own network or the lab router, configure a scope with the pool starting above the static range, sensible lease times, and at least three MAC-based reservations. Document it.",
      },
      {
        task: "Cause and explain two addressing faults",
        detail:
          "Deliberately apply a wrong subnet mask and an exhausted DHCP pool, observe the symptoms each produces, and write down how you would recognise each one from the symptoms alone.",
      },
      {
        task: "Explain NAT accurately to a non-technical reader",
        detail:
          "Two paragraphs covering what NAT does, why an internal server is not reachable from outside, and precisely why calling it a firewall is wrong. Assume the reader will repeat your explanation to someone else.",
      },
    ],
    rubric: [
      {
        criterion: "Addressing accuracy",
        passing: "Can read an address and mask and identify the network.",
        excellent:
          "Computes usable hosts correctly every time, converts between dotted and CIDR forms fluently, and explains why two hosts are or are not on the same network.",
      },
      {
        criterion: "Network design",
        passing: "A scheme was produced.",
        excellent:
          "Four or more networks separated by trust level, each sized with headroom justified, private range chosen deliberately, and the whole design written before anything was configured.",
      },
      {
        criterion: "DHCP configuration",
        passing: "DHCP is enabled and clients get addresses.",
        excellent:
          "Pool sized against real device counts, static range excluded, per-network lease times reasoned, and MAC-based reservations used for every device others must find.",
      },
      {
        criterion: "NAT understanding",
        passing: "Can say NAT lets many machines share one address.",
        excellent:
          "Can read the translation table, explain why inbound connections fail without forwarding, and state accurately why NAT is not a firewall.",
      },
      {
        criterion: "Fault diagnosis",
        passing: "Caused and fixed a fault.",
        excellent:
          "Reproduced the wrong-mask and exhausted-pool faults, described the exact symptoms each produces, and can recognise both from symptoms alone.",
      },
    ],
    faqs: [
      {
        q: "Why subtract two addresses from every subnet?",
        a: "The first address identifies the network itself and the last is the broadcast address for reaching every host on it. Neither can be assigned to a device, so a /24 gives 254 usable addresses rather than 256.",
      },
      {
        q: "Should I still learn IPv4 if IPv6 is the future?",
        a: "Absolutely. Almost every small business network you will work on runs IPv4 today, and most will be dual-stack for years. IPv4 is where the jobs are now; IPv6 knowledge keeps you from being surprised later.",
      },
      {
        q: "How many subnets does a small office really need?",
        a: "Four is a good baseline: staff, servers, guests, and devices such as printers, cameras and access points. More is defensible; fewer means guests and cameras share a network with your accounts data, which is a poor trade.",
      },
      {
        q: "Is NAT a firewall?",
        a: "No. NAT translates addresses; a firewall applies policy about what traffic is permitted. They usually appear together, and NAT does block unsolicited inbound traffic as a side effect, but they are different mechanisms.",
      },
      {
        q: "What lease time should I use?",
        a: "About a day for staff devices, which reconnect predictably, and a couple of hours for guests, so addresses recycle as people leave. A long guest lease exhausts the pool; a very short staff lease causes needless churn.",
      },
    ],
  },

  "routers-switches": {
    summary:
      "The two devices that make a network a network — what a switch does that a hub never could, what a router does that a switch cannot, and how to configure ports, VLANs and the basics safely on real equipment.",
    objectives: [
      "Explain precisely what a switch does and why it replaced hubs",
      "Explain what a router does and where the boundary between the two devices sits",
      "Configure a managed switch: naming, port settings and access control",
      "Apply VLAN concepts to the trust-separated design from last session",
      "Configure a router's basics including the WAN side and remote management",
    ],
    blocks: [
      {
        heading:
          "A switch learns where devices are, and that single behaviour is why networks work",
        body: [
          "A switch operates at layer two and makes decisions based on **MAC addresses** — the hardware addresses burned into every network interface. Its behaviour is simple and worth understanding exactly. It maintains a **MAC address table** mapping each learned address to the port it was seen on. When a frame arrives for a known address, it goes **only** to that port. When the destination is unknown, it floods to every port except the source, learns from the reply, and next time sends it directly.",
          "This is the entire reason switches replaced hubs. A **hub** repeats every frame to every port, so every device sees everyone else's traffic and the whole network is one collision domain — ten machines on a hub share one conversation space. A switch gives each port its own collision domain and, crucially, **stops traffic going where it is not needed**. That is a performance improvement and a security improvement at the same time, which is why unmanaged hubs vanished.",
          "The practical consequences are what you will use at a client site. **The MAC table tells you where a device is physically connected**, which is how you trace an unknown machine or find which port a printer is on. And because a switch floods unknown destinations, **ARP traffic and broadcasts reach everywhere on the same VLAN** — which is precisely why large flat networks become slow, and why we split them.",
        ],
      },
      {
        heading:
          "A router connects networks; a switch connects devices — and the distinction decides your diagnosis",
        body: [
          "A router operates at layer three and makes decisions based on **IP addresses**. Its job is to move packets between different networks, using a **routing table** that says which network is reachable via which interface or next hop. It also typically provides DHCP, NAT, and the firewall between your private network and the internet.",
          "The clean way to hold it: **a switch connects devices within one network; a router connects networks to each other.** Two machines on 10.10.10.0/24 talk through the switch. A machine on 10.10.10.0/24 reaching a server on 10.10.20.0/28 goes through the router, even if both are plugged into the same physical switch.",
          "That last sentence is the key to modern small-network configuration, and it is where **VLANs** come in — a single physical switch can carry several logically separate networks, with the router handling traffic between them. Understanding that a switch port belongs to a network, and that the router is the gatekeeper between networks, is what makes the next session's design implementable on real hardware rather than only on paper.",
        ],
      },
      {
        heading: "Managed against unmanaged: the difference is not ports, it is control",
        body: [
          "An **unmanaged switch** is plug and play. It learns MAC addresses and forwards frames, and there is nothing to configure — no interface, no VLANs, no visibility. For three machines at home, it is entirely adequate. For an office, it is a dead end, because you cannot segment anything, cannot see what is happening, and cannot apply any policy.",
          "A **managed switch** gives you an interface, and with it the ability to create VLANs, name ports so you know what is connected where, monitor traffic, and control access. For our accounting practice this is not optional — the trust-separated design from last session is simply not implementable on unmanaged hardware.",
          "Between them sits the **smart switch**, offering VLANs and basic management at lower cost, which is often the right answer for a genuinely small office. And note the related device class: an access point that only bridges wireless to wired is layer two, while one that routes is doing something different. **Know which layer a device operates at before you try to configure it**, because the settings available follow directly from that.",
        ],
      },
      {
        heading: "VLANs: one cable, several networks, and the security that comes with it",
        body: [
          "A **VLAN**, a virtual LAN, is a logical grouping of switch ports that behaves like a separate network regardless of where the cables physically go. Ports assigned to VLAN 10 cannot communicate with ports on VLAN 20 at layer two, even though they share the same switch and often the same physical cabling. Broadcasts stay inside their VLAN, which is what makes segmentation real rather than nominal.",
          "For our design this maps directly: **VLAN 10** for staff on 10.10.10.0/24, **VLAN 20** for servers on 10.10.20.0/28, **VLAN 30** for guests on 10.10.30.0/24, and **VLAN 40** for printers, cameras and access points on 10.10.40.0/24. A guest in the meeting room is on the guest VLAN whichever socket they use, and cannot reach the accounts server — not because of a firewall rule, but because the two are simply not on the same network.",
          "Two mechanics are worth understanding. An **access port** belongs to exactly one VLAN and carries that VLAN's traffic untagged, which is what you use for endpoints. A **trunk port** carries several VLANs at once with each frame tagged so the far end knows which network it belongs to, which is what you use between switches and to access points. Getting this wrong is the single most common VLAN misconfiguration: **a port set as access where a trunk is needed, or the reverse, produces a link that appears up and carries almost nothing.**",
        ],
      },
      {
        heading: "Configuration discipline: the habits that keep you out of trouble",
        body: [
          "Configuring network equipment has one unusual hazard: **you are doing it over the network you are changing.** A mistake can disconnect you mid-change, and on a device in a cupboard under the stairs that means a walk with a laptop and a cable. The standard protections are worth making habitual.",
          "First, **change the default credentials immediately**. A switch or router still using its factory password is an open door on the internal network, and default credentials for common models are published and widely known. Second, **name the device and name every port** — a switch called 'switch1' with ports labelled 1 through 24 tells the next engineer nothing; 'GF-SW01' with port 7 labelled 'Printer-Main' tells them everything. Third, **disable what you do not use**: unused ports should be shut down and assigned to an unused VLAN, so plugging a rogue device into a wall socket gets it nowhere.",
          "Then the two that save the most time. **Save the configuration** after every working change — on many devices the running configuration is lost on reboot unless explicitly saved, which turns a finished job into a mystery the following morning. And **keep an out-of-band way in**, meaning a console cable or a known physical port, so a bad change does not become a device you cannot reach. Finally, restrict **remote management** to the management VLAN only; a switch manageable from the guest network is a switch a customer can attack.",
        ],
      },
    ],
    demonstration: {
      intro:
        "We configure the office's managed switch and router from factory state, implementing the four-VLAN design from last session and locking down what a client would otherwise leave open.",
      steps: [
        {
          step: "Connect to the switch's management interface",
          detail:
            "Use the default address and credentials from the label, over a direct cable. Confirm firmware version and note it — you will update, but not in the middle of a configuration change.",
        },
        {
          step: "Change the default credentials first, before anything else",
          detail:
            "Set a long unique administrator password. Default credentials for common switch models are published and widely known, and a switch with a factory password is an open door to anyone who reaches a wall socket.",
        },
        {
          step: "Name the device meaningfully",
          detail:
            "Set the hostname to **GF-SW01** rather than leaving the default. When you are managing three switches across two floors at 6pm, the name is the only thing telling you which one you are about to reconfigure.",
        },
        {
          step: "Set the management address into the correct VLAN",
          detail:
            "Give the switch a static management IP in the devices network — 10.10.40.2 with gateway 10.10.40.1 — so it is reachable by you but not by guests. A switch with no management address is a device you cannot find later.",
        },
        {
          step: "Create the four VLANs to match the design",
          detail:
            "Create **VLAN 10 Staff**, **VLAN 20 Servers**, **VLAN 30 Guests**, **VLAN 40 Devices**, naming each. Names matter as much as numbers — VLAN 30 means nothing to the person maintaining this in two years.",
        },
        {
          step: "Assign access ports to their VLANs",
          detail:
            "Set ports 1 to 12 as access ports on VLAN 10 for ground-floor staff. Confirm each port mode reads **access**, not trunk — an endpoint on a trunk port behaves unpredictably and is a classic misconfiguration.",
        },
        {
          step: "Assign the remaining ports deliberately",
          detail:
            "Ports 13 and 14 to VLAN 20 for servers, ports 15 to 17 to VLAN 40 for printers and storage, and ports 18 to 20 to VLAN 30 for the meeting-room guest sockets. Every port accounted for, because an unassigned port is an uncontrolled one.",
        },
        {
          step: "Configure the uplink as a trunk",
          detail:
            "Set the port connecting to the router as a **trunk** carrying all four VLANs, tagged. This is the port that lets one cable carry four networks, and getting its mode wrong breaks everything while the link light still shows green.",
        },
        {
          step: "Shut down and isolate unused ports",
          detail:
            "Disable every spare port and assign it to an unused VLAN. Without this, plugging a laptop into any spare wall socket puts it on your staff network. With it, the socket goes nowhere — a real control, not a nicety.",
        },
        {
          step: "Restrict remote management to the management network",
          detail:
            "Configure management access to be permitted only from 10.10.40.0/24. A switch manageable from the guest VLAN is a switch a customer with a laptop can attack, which is not a hypothetical.",
        },
        {
          step: "Save the configuration and verify it survives",
          detail:
            "Write the running configuration to startup, then reload the switch and confirm the VLANs and port assignments are still there. On many devices an unsaved configuration is lost on reboot, turning a finished job into a mystery the next morning.",
        },
        {
          step: "Prove the segmentation actually works",
          detail:
            "Connect a laptop to a staff port and confirm it gets a 10.10.10.x address. Move it to a guest port and confirm it gets 10.10.30.x. Then from the guest address attempt to reach the server on 10.10.20.x and confirm it fails. The failure is the control working.",
        },
        {
          step: "Read the MAC address table",
          detail:
            "Display the switch's MAC table and match entries to ports. This is how you find where an unknown device is physically connected, and how you confirm a printer is on the port you think it is.",
        },
        {
          step: "Move to the router and configure the WAN side",
          detail:
            "Enter the ISP credentials, confirm the connection type, and note whether the public address is static or dynamically assigned. Record what you find — the ISP's actual configuration is frequently different from what their documentation claims.",
        },
        {
          step: "Create the router interfaces for each VLAN",
          detail:
            "Configure 10.10.10.1, 10.10.20.1, 10.10.30.1 and 10.10.40.1 as the gateways, matching the switch trunk exactly. A mismatch between switch and router is the most common reason a VLAN design works on paper and not in practice.",
        },
        {
          step: "Add DHCP scopes per VLAN with reservations",
          detail:
            "One scope per network with the correct gateway for that VLAN — a client that receives the wrong gateway will fail to reach anything beyond its own network, and the fault is not obvious from the client side.",
        },
        {
          step: "Review the firewall rules between VLANs",
          detail:
            "Decide and document what may cross: staff may reach servers and the internet; guests may reach only the internet; the devices VLAN may reach the internet for updates but not the staff network. **VLANs separate; the router's rules decide what is allowed across.** Both are needed.",
        },
        {
          step: "Disable remote administration from the WAN",
          detail:
            "Confirm the router's management interface is not reachable from the internet. An internet-facing admin page is found automatically within hours, and default or weak credentials against it are how offices get compromised.",
        },
        {
          step: "Save, document, and record the console fallback",
          detail:
            "Save both configurations, update the documentation with VLAN-to-network mapping, port assignments and management addresses, and note where the console cable is. That last item is what saves you when a bad change leaves you unable to reach the device at all.",
        },
      ],
    },
    practice: {
      title: "Build the segmented office network on real equipment",
      brief:
        "Configure a managed switch and router from factory state to implement a four-VLAN design, then prove the segmentation is real rather than nominal.",
      steps: [
        "Connect to the switch and record its firmware version before changing anything.",
        "Change the default administrator credentials as your very first action.",
        "Name the device with a convention that identifies its location and role.",
        "Assign a static management address in the devices VLAN so it is reachable by you but not by guests.",
        "Create four named VLANs matching the addressing design from last session.",
        "Assign access ports to their VLANs, confirming each port mode reads access rather than trunk.",
        "Account for every port — there should be none left unassigned and unconsidered.",
        "Configure the router uplink as a tagged trunk carrying all four VLANs.",
        "Shut down unused ports and assign them to an unused VLAN.",
        "Restrict management access to the management network only.",
        "Save the configuration, reload the switch, and confirm everything persisted.",
        "Prove segmentation: a laptop on a staff port gets a staff address, on a guest port gets a guest address, and from the guest address cannot reach the server.",
        "Read the MAC address table and identify which port a specific device is connected to.",
        "Configure the router's WAN connection and record whether the public address is static or dynamic.",
        "Create the four VLAN interfaces on the router with matching gateways.",
        "Configure a DHCP scope per VLAN, each handing out its own correct gateway.",
        "Document the firewall policy between VLANs — what may cross and why.",
        "Confirm the router's management interface is not reachable from the internet.",
        "Save both configurations and write up the VLAN map, port assignments and console-access location.",
      ],
      standard:
        "Default credentials changed first; device and every port meaningfully named; four named VLANs implemented with correct access and trunk modes; unused ports shut and isolated; management restricted to the management network; configuration saved and verified to survive a reload; segmentation proven by moving a laptop between ports and confirming a guest cannot reach the server; MAC table read to locate a device; router VLAN interfaces matching the switch trunk exactly with correct per-VLAN gateways; inter-VLAN policy documented; WAN management confirmed disabled; and full documentation including the console fallback location.",
    },
    pitfalls: [
      {
        problem: "Leaving factory default credentials on a switch or router",
        fix: "Change them first, before anything else. Default credentials for common models are published, and any device reachable from a wall socket with a factory password is an open door.",
      },
      {
        problem: "An endpoint connected to a port in trunk mode",
        fix: "Access ports belong to one VLAN and carry it untagged; trunks carry many, tagged. The wrong mode produces a link that shows up but passes almost nothing — check port mode before anything else.",
      },
      {
        problem: "Switch trunk and router interface not matching",
        fix: "If the router expects VLAN 30 tagged and the switch sends it untagged, the VLAN exists on paper only. Configure both ends from the same table and verify by testing, not by looking.",
      },
      {
        problem: "A DHCP scope handing out the wrong gateway for its VLAN",
        fix: "A client with the wrong gateway cannot leave its own network, and nothing on the client looks wrong. One scope per VLAN, each with that VLAN's gateway.",
      },
      {
        problem: "Leaving spare ports enabled on the default VLAN",
        fix: "Shut them and assign them to an unused VLAN. Otherwise any wall socket in the building puts a plugged-in laptop on your staff network.",
      },
      {
        problem: "Not saving the configuration before a reboot",
        fix: "On many devices the running configuration is lost on reload unless written to startup. Save after every working change and verify it survived a reload.",
      },
      {
        problem: "Creating VLANs but no rules between them",
        fix: "VLANs separate networks; the router's firewall rules decide what may cross. Both are required — segmentation without policy still lets guests reach servers if routing is open.",
      },
      {
        problem: "No out-of-band access to the device",
        fix: "Keep a console cable and know the physical port. A bad change made over the network can leave you unable to reach the device at all, and a cupboard under the stairs is a poor place to discover that.",
      },
    ],
    expertNotes: [
      "The MAC address table is the most underused diagnostic in small-network work. It tells you which physical port a device is on, which turns 'there is an unknown machine on the network' from an investigation into a walk to a specific socket. Learn to read it before you need it.",
      "Segmentation is only real if you test it. Configuring four VLANs and confirming that a guest genuinely cannot reach the server is the difference between a network that is secure and one that is documented as secure. The test takes two minutes and is the whole point of the exercise.",
      "Naming conventions are professionalism made visible. Hostnames like GF-SW01 and port labels like Printer-Main are what let someone else — or you, in eighteen months — make a change at speed without tracing cables. Clients notice this even when they cannot articulate why.",
      "You are always configuring over the network you are changing, so plan for losing access. Save constantly, keep a console cable, and know which physical port will still reach you. Every engineer who has worked on remote equipment has learned this the expensive way once.",
    ],
    vocabulary: [
      {
        term: "MAC address",
        meaning:
          "The hardware address burned into a network interface. Switches forward frames based on MAC addresses, which is layer-two operation.",
      },
      {
        term: "MAC address table",
        meaning:
          "A switch's map of learned MAC addresses to the ports they were seen on. It is how a switch forwards selectively and how you find where a device is connected.",
      },
      {
        term: "Collision domain",
        meaning:
          "A set of devices sharing one transmission space. A hub creates one large collision domain; a switch gives each port its own, which is why switches replaced hubs.",
      },
      {
        term: "Routing table",
        meaning:
          "A router's map of which networks are reachable via which interface or next hop. It is what allows traffic to move between different networks.",
      },
      {
        term: "VLAN",
        meaning:
          "A logical grouping of switch ports that behaves as a separate network regardless of physical cabling. Broadcasts stay within a VLAN, making segmentation real.",
      },
      {
        term: "Access port",
        meaning:
          "A switch port belonging to exactly one VLAN, carrying that VLAN untagged. Used for endpoints such as computers and printers.",
      },
      {
        term: "Trunk port",
        meaning:
          "A switch port carrying multiple VLANs simultaneously with frames tagged by VLAN. Used between switches and to access points.",
      },
      {
        term: "Managed switch",
        meaning:
          "A switch with a configuration interface, enabling VLANs, port naming, monitoring and access control — as against an unmanaged switch which only forwards.",
      },
    ],
    homework: [
      {
        task: "Configure the four-VLAN network end to end",
        detail:
          "On the lab equipment or your own, implement the full design: named VLANs, correct access and trunk modes, unused ports isolated, management restricted. Save and verify it survives a reload.",
      },
      {
        task: "Prove your segmentation is real",
        detail:
          "Move a laptop between ports and record the address it receives on each. Then demonstrate that a guest address cannot reach a server address, and explain in writing whether that is because of VLAN separation, a firewall rule, or both.",
      },
      {
        task: "Trace a device using the MAC table",
        detail:
          "Find the physical port a specific device is connected to using only the switch's MAC address table. Write down the steps you took — this is a task you will be asked to do under pressure.",
      },
      {
        task: "Write the configuration standard for a client",
        detail:
          "One page covering naming conventions, credential policy, unused-port handling, management access restrictions, and save-and-backup discipline. This is the document that makes your work repeatable across sites.",
      },
    ],
    rubric: [
      {
        criterion: "Conceptual clarity",
        passing: "Can describe what a switch and a router do.",
        excellent:
          "Explains layer-two against layer-three operation precisely, and uses the distinction to decide where a fault lives and which device to inspect.",
      },
      {
        criterion: "Switch configuration",
        passing: "VLANs created and ports assigned.",
        excellent:
          "Correct access and trunk modes throughout, every port accounted for, unused ports shut and isolated, configuration saved and verified across a reload.",
      },
      {
        criterion: "Router configuration",
        passing: "The router routes between networks.",
        excellent:
          "VLAN interfaces matching the switch trunk exactly, correct per-VLAN DHCP gateways, documented inter-VLAN policy, and WAN management confirmed disabled.",
      },
      {
        criterion: "Verification",
        passing: "The network works.",
        excellent:
          "Segmentation proven by moving a device between ports and testing reachability, and able to say whether a block comes from VLAN separation or a firewall rule.",
      },
      {
        criterion: "Professional discipline",
        passing: "The configuration is functional.",
        excellent:
          "Credentials changed first, meaningful naming throughout, management access restricted, out-of-band access planned for, and documentation a stranger could follow.",
      },
    ],
    faqs: [
      {
        q: "Do I need a managed switch for a small office?",
        a: "If you want segmentation, yes — unmanaged hardware cannot do VLANs, so guests and cameras would share a network with your servers. A smart switch is often the right cost-effective middle ground for a genuinely small site.",
      },
      {
        q: "What happens if I set an access port where a trunk is needed?",
        a: "The link comes up and passes almost nothing useful, because the far end expects tagged frames for several VLANs and receives untagged frames for one. The link light gives no warning, so check port mode before anything else.",
      },
      {
        q: "Are VLANs a security control?",
        a: "They are a segmentation control, which is a strong foundation — but they need firewall rules between them to be a real control on their own. VLANs decide what is on the same network; the router's rules decide what may cross.",
      },
      {
        q: "Why name ports when I have a diagram?",
        a: "Because diagrams go stale and port labels do not. At 6pm, standing in front of a switch, the label is the fastest source of truth available, and it costs nothing to apply during installation.",
      },
      {
        q: "Can I manage a switch if I lose network access to it?",
        a: "Only through the console port, which is why you keep the cable and know where it goes. Planning for losing access is not pessimism — you are configuring over the very network you are changing.",
      },
    ],
  },
};
