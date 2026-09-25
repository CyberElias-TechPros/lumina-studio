import type { SessionLecture } from "../types";

/**
 * Graphic Design — ₦20,000 · 4 weeks · 8 sessions.
 * Sessions 1 to 3. (Sessions 4–6 in graphic-design-b.ts, 7–8 in graphic-design-c.ts.)
 */
export const graphicDesignLessonsA: Record<string, SessionLecture> = {
  "design-foundations-seeing": {
    summary:
      "Before you open any tool you have to be able to see. This session teaches the vocabulary and judgement that separate designed work from decorated work: layout, balance, contrast, hierarchy, alignment, white space and how the eye actually travels across a page. Everything after this builds on being able to look at a design and name what is wrong with it.",
    objectives: [
      "Explain what graphic design is for, and what it is not",
      "Use the principles of layout, balance, contrast, hierarchy, alignment and white space correctly",
      "Describe how the eye travels a page and design for that path deliberately",
      "Diagnose a weak design in specific, actionable language",
      "Identify where design work is paid for in Nigeria and what each type requires",
      "Set up your working environment and file habits for the course",
    ],
    blocks: [
      {
        heading: "What graphic design is actually for",
        body: [
          "Graphic design is the deliberate arrangement of text and image so that a specific viewer takes a specific action or forms a specific impression. Not decoration, not self-expression, not making things pretty — although pretty is often a by-product. A church flyer that makes the service time impossible to find has failed regardless of how beautiful it is. A product label that does not communicate what is inside has failed. A business card nobody can read in dim light has failed.",
          "This definition has a practical consequence that will govern everything you do in this course: **every design decision must be justified by the audience and the goal**, not by preference. When a client says 'make the logo bigger', they are usually saying 'I cannot see what this business is' — and the professional response is to find the real problem, which might be that the headline is competing with the logo, or that the contrast is too low, or that there is too much else on the page. Amateurs argue about taste. Professionals diagnose the communication problem.",
          "The Nigerian market for this work is broad and real: churches and mosques producing weekly materials, schools and training centres, event planners, small businesses needing product labels and price lists, fashion and beauty brands needing social content, restaurants needing menus, political campaigns in season, and a large volume of remote work for foreign clients who pay in dollars. The entry ticket in every one of those is not software mastery — it is being able to make something that communicates clearly and looks deliberate.",
        ],
      },
      {
        heading: "How the eye actually moves",
        body: [
          "Readers of Latin-script text do not scan a page evenly. Research on eye tracking, and the everyday evidence of how people read, consistently shows two patterns: the **F-pattern**, where the eye sweeps the top horizontally, moves down and sweeps a shorter line, then travels down the left edge — common on text-heavy pages like websites and documents; and the **Z-pattern**, where the eye starts top-left, travels to top-right, diagonals down to bottom-left, then travels to bottom-right — common on posters and flyers with less text.",
          "You design for this. The most important element goes where the eye lands first, which is usually the top-left or the centre-top. The call to action — phone number, date, 'Register now' — goes at the end of the path, bottom-right on a Z layout, because that is where the eye finishes. Anything you place in the middle of the page without contrast will be glanced at and skipped. This is why so many amateur flyers fail: the service time is buried in the middle at the same size as everything else, so the eye passes over it and the reader never receives the one piece of information that mattered.",
        ],
      },
      {
        heading: "Contrast and hierarchy: the two that matter most",
        body: [
          "**Contrast** is difference made deliberate. It can be contrast of size, weight, colour, position, shape or texture. Its job is to tell the viewer what to look at first, second and third. The failure mode is not too little contrast but **too many equal things** — a page where the title, the subtitle, the date, the price and the contact details are all roughly the same size and weight. When everything is emphasised, nothing is. The eye has no instruction, so it wanders and the reader gives up.",
          "**Hierarchy** is the ranking that contrast produces. A well-hierarched flyer has roughly three levels: the one thing that must be seen from across a room (the offer or the headline), the supporting detail that confirms it (date, time, venue, price), and the small print nobody needs until they have already decided (terms, address, social handles). Decide those three levels before you place a single element, and write them down. Most bad designs are not badly executed; they are designs where nobody ever decided what was most important.",
          "A useful test: squint at your design until it blurs. What you can still make out is your hierarchy. If three things compete at the same blurred intensity, your hierarchy is flat and you must choose. This one test catches more layout problems than any other, and it takes two seconds.",
        ],
      },
      {
        heading: "Balance, alignment and white space",
        body: [
          "**Balance** is how visual weight is distributed. **Symmetrical** balance mirrors elements around a centre and reads as formal, stable, traditional — appropriate for a wedding invitation or an institution. **Asymmetrical** balance uses unequal elements of differing weight and reads as modern and energetic — a large image on one side balanced by a block of text on the other. Both are valid; what is not valid is accidentally lopsided, where everything crowds one side and the other feels abandoned.",
          "**Alignment** is the invisible grid that makes a design feel organised. Every element should align to something else — a common left edge, a common centre, a common baseline. The most common amateur tell is arbitrary placement: the title slightly left of centre, the body text centred, the logo off to the right, the price floating. Pick one alignment discipline and hold it. Left-aligned text is easier to read than centred for anything longer than a few words, because the eye returns to a consistent starting point.",
          "**White space** — the empty area, which need not be white — is not wasted space. It is what makes the important things visible. Crowding is the single most common fault in amateur Nigerian design, driven by the instinct that empty space looks unfinished and the client paid for a full page. The opposite is true: white space around an element signals that it matters. If your design feels busy, the fix is almost never to make things smaller — it is to remove elements or enlarge the margins.",
        ],
      },
      {
        heading: "Learning to see: the critique vocabulary",
        body: [
          "The most valuable thing this session gives you is a language for what is wrong. 'It doesn't look nice' is useless to a client and useless to you. 'The hierarchy is flat, so the date is not readable' is a diagnosis with a fix attached. Learn to name things: the hierarchy is flat; the alignment is inconsistent; there is not enough contrast between the headline and the body; the margins are uneven; the elements are crowded with no white space; the eye path dead-ends with no call to action; the balance is accidental rather than chosen.",
          "Practise this deliberately. Collect ten flyers from your church, your street, WhatsApp statuses and Instagram — good and bad — and write a two-sentence diagnosis of each using the vocabulary. This is how professional designers think, and it is why they can improve a design in one pass where an amateur edits for an hour and makes it worse. It is also the difference that clients notice: a designer who can explain a decision in one sentence is trusted with the account.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor takes one deliberately bad flyer and redesigns it live using only the principles from this session — no software tricks — narrating each decision and the principle behind it.",
      steps: [
        {
          step: "Show the bad flyer",
          detail:
            "Display an actual cluttered church or event flyer with twelve competing elements. Ask the class what they notice first. Almost nobody says the service time.",
        },
        {
          step: "Diagnose it out loud",
          detail:
            "Name each fault in the critique vocabulary: flat hierarchy, inconsistent alignment, no white space, accidental balance, eye path with no destination.",
        },
        {
          step: "Decide the three hierarchy levels",
          detail:
            "Write on the board: level one — the event name; level two — date, time, venue; level three — contact and social handles. Explain that this decision comes before any design.",
        },
        {
          step: "Choose the eye path",
          detail:
            "Sketch the Z-path over the blank page and mark where level one, two and three go. Explain that the call to action sits at the end of the path.",
        },
        {
          step: "Set the margins first",
          detail:
            "Draw a generous margin around all four edges. Explain that margins are decided before content, and that this single habit removes most of the crowded feeling.",
        },
        {
          step: "Place the headline with strong contrast",
          detail:
            "Place the event name at the top-left at roughly three times the body size. Show the before-and-after in perceived importance.",
        },
        {
          step: "Group the supporting detail",
          detail:
            "Put date, time and venue together as a tight group aligned on one edge, clearly smaller than the headline but clearly larger than the small print.",
        },
        {
          step: "Choose one alignment",
          detail:
            "Align every element to the same left edge. Show how instantly the design reads as organised, with nothing else changed.",
        },
        {
          step: "Remove elements rather than shrinking them",
          detail:
            "Delete four elements that were not needed. Explain that removal is the primary tool against clutter and shrinking is the last resort.",
        },
        {
          step: "Add white space deliberately",
          detail:
            "Increase the space between the three groups until each reads separately. Show that the same elements now feel calm rather than busy.",
        },
        {
          step: "Run the squint test",
          detail:
            "Squint until the design blurs and confirm the headline still dominates. Show the original failing the same test.",
        },
        {
          step: "Compare and count the changes",
          detail:
            "Place the two versions side by side. Point out that no software effect was used — every improvement came from a principle.",
        },
      ],
    },
    practice: {
      title: "Diagnose ten, redesign one",
      brief:
        "You collect ten real designs, write a specific two-sentence diagnosis of each using the critique vocabulary, then redesign the worst one applying every principle from this session.",
      steps: [
        "Collect ten real designs from your environment — church flyers, shop signs, event posters, social media posts.",
        "For each, write one sentence naming the main fault in the critique vocabulary.",
        "For each, write one sentence giving the specific fix.",
        "Choose the worst of the ten as your redesign subject.",
        "Write down its three hierarchy levels before you touch any layout.",
        "Sketch the eye path and mark where each level goes.",
        "Set generous margins before placing any content.",
        "Choose one alignment discipline and hold it for every element.",
        "Remove at least four elements rather than shrinking anything.",
        "Add white space between the three groups.",
        "Run the squint test and confirm the headline dominates.",
        "Present both versions with your written diagnosis.",
      ],
      standard:
        "Ten diagnoses that each name a specific principle rather than saying 'not nice', and a redesign where the hierarchy is visibly three-level, the alignment is consistent, the margins are generous, and the squint test passes.",
    },
    pitfalls: [
      {
        problem: "You start designing before deciding what matters most",
        fix: "Write the three hierarchy levels first. Most weak designs are not badly executed — nobody ever decided what was most important, so everything got equal weight.",
      },
      {
        problem: "You fill the page because empty space looks unfinished",
        fix: "White space signals importance. If a design feels busy, remove elements or enlarge margins. Making things smaller is the last resort, not the first.",
      },
      {
        problem: "You centre everything",
        fix: "Centred text is hard to read beyond a few words because the eye has no consistent starting point. Left-align body copy and reserve centring for short display lines.",
      },
      {
        problem: "You emphasise everything",
        fix: "When everything is bold, large and coloured, nothing is. Choose one thing to dominate and let the rest support it. Contrast requires something to contrast against.",
      },
      {
        problem: "You place elements wherever they fit",
        fix: "Choose one alignment — usually a single left edge — and align everything to it. Arbitrary placement is the most reliable visual signal of amateur work.",
      },
      {
        problem: "You cannot explain your decisions to a client",
        fix: "Learn the vocabulary and practise diagnosing other people's work. A designer who can justify a choice in one sentence is trusted; one who says 'I thought it looked nice' is not.",
      },
    ],
    expertNotes: [
      "Build a reference folder from day one. Save every design you admire, sorted by type — flyer, logo, menu, social post. When you are stuck, look at ten references before you invent anything. Professionals do not design from imagination; they design from a library of solved problems.",
      "Steal structure, never content. It is completely legitimate to copy the layout logic, spacing rhythm and hierarchy of a great poster while using your own words and images. That is how every designer learned, and it is the fastest route to competent work.",
      "Print your designs, or at least view them at 100% on a phone screen. On-screen zoom lies constantly — a flyer that looks fine at 25% zoom in your editor can be unreadable at actual size in daylight. Always check at real size before delivery.",
      "Ask 'what does the viewer need to do?' before 'what should this look like?'. Keeping the action in mind is what separates a designer from a decorator, and it is the question that makes a client feel understood rather than served.",
    ],
    vocabulary: [
      {
        term: "Hierarchy",
        meaning:
          "The ranking of elements by importance, produced by deliberate contrast. Three levels is usually right.",
      },
      {
        term: "Contrast",
        meaning:
          "Deliberate difference — of size, weight, colour or position — that tells the eye where to go first.",
      },
      {
        term: "White space",
        meaning:
          "The empty area around and between elements. Not waste; it is what makes the important things visible.",
      },
      {
        term: "Alignment",
        meaning:
          "Elements sharing a common edge, centre or baseline. The invisible grid that makes work look organised.",
      },
      {
        term: "Balance",
        meaning:
          "How visual weight is distributed. Symmetrical reads formal, asymmetrical reads modern, accidental reads wrong.",
      },
      {
        term: "F-pattern",
        meaning: "How eyes scan text-heavy pages: two horizontal sweeps then down the left edge.",
      },
      {
        term: "Z-pattern",
        meaning:
          "How eyes scan posters: top-left to top-right, diagonal to bottom-left, then to bottom-right.",
      },
      {
        term: "Squint test",
        meaning:
          "Blurring your vision to reveal which elements still dominate — the fastest check on hierarchy.",
      },
    ],
    homework: [
      {
        task: "Build your reference folder",
        detail:
          "Save twenty designs you admire, sorted by type. Write one line on each saying what it does well. This folder becomes your working library for the rest of the course.",
      },
      {
        task: "Diagnose five designs in your neighbourhood",
        detail:
          "Photograph five real signs or flyers near you and write a diagnosis and a fix for each using the vocabulary from this session.",
      },
      {
        task: "Run the squint test on ten designs",
        detail:
          "Squint at ten designs and write what you can still see. Note which ones pass and which collapse into a grey blur — that blur is a flat hierarchy.",
      },
      {
        task: "Write your three hierarchy levels for a real brief",
        detail:
          "Take any real event or product you know and write its level one, level two and level three in three lines. Bring this to the next session — it is the first step of every design you will make.",
      },
    ],
    rubric: [
      {
        criterion: "Principle knowledge",
        passing: "Can name the main principles correctly.",
        excellent:
          "Can explain each principle's job and give a concrete example of it failing in real work.",
      },
      {
        criterion: "Diagnosis",
        passing: "Identifies problems in collected designs.",
        excellent:
          "Names specific faults in the critique vocabulary and gives a fix that follows from the diagnosis rather than from taste.",
      },
      {
        criterion: "Hierarchy",
        passing: "The redesign has a clear main element.",
        excellent:
          "Three visibly distinct levels, decided in writing before layout, and passing the squint test.",
      },
      {
        criterion: "Layout discipline",
        passing: "Elements are roughly organised.",
        excellent:
          "One consistent alignment, generous margins, deliberate white space between groups, and elements removed rather than shrunk.",
      },
      {
        criterion: "Communication",
        passing: "Can describe what they changed.",
        excellent:
          "Justifies each change by reference to audience and goal, in one sentence, as they would to a client.",
      },
    ],
    faqs: [
      {
        q: "Do I need to be able to draw?",
        a: "No. Graphic design is arrangement and communication, not illustration. You will need an eye for spacing and proportion, which is trained by looking and measuring rather than by drawing talent. Plenty of excellent designers cannot sketch.",
      },
      {
        q: "What software will we use?",
        a: "Canva, because it is free, runs on a phone, is what most Nigerian small-business clients already recognise, and produces professional output when you apply real principles. We cover the interface in session three. The principles from this session are what make the difference — the same Canva account produces garbage in untrained hands.",
      },
      {
        q: "Can I earn from this in Nigeria?",
        a: "Yes, and the volume is high. Churches, schools, event planners, salons, restaurants, fashion brands and political campaigns all need materials continuously, and most currently pay someone whose work is weak. A designer who can produce a clean flyer in thirty minutes and explain the choices charges properly and keeps the client.",
      },
      {
        q: "Is Canva real design or a toy?",
        a: "It is a real production tool used commercially every day. It is not where you would draw a complex vector logo from scratch, and session six covers that limit honestly. But for the work that makes up most paid design in this market — flyers, social content, presentations, print material — Canva is entirely professional when your decisions are.",
      },
      {
        q: "How do I know when a design is finished?",
        a: "When every element can justify its presence and nothing competes with the main message. Practically: run the squint test, check the alignment, confirm there is one clear call to action, and then stop. Adding more is almost always the wrong instinct at that point.",
      },
    ],
  },

  "design-foundations-colour-type": {
    summary:
      "Colour and type are the two decisions that most visibly separate professional work from amateur work, and both are learnable systems rather than taste. This session covers how colour works, how to build and apply a palette, how contrast and accessibility constrain it, then typefaces, pairing, scale and the spacing that makes text readable.",
    objectives: [
      "Explain hue, saturation, brightness and colour temperature in practical terms",
      "Build a usable palette with primary, secondary and accent roles",
      "Apply the 60-30-10 rule and explain why it works",
      "Check text contrast and explain why it is an accessibility requirement, not a preference",
      "Choose typefaces deliberately and pair them without conflict",
      "Build a type scale and control line spacing, letter spacing and line length",
      "Avoid the common colour and typography failures that mark amateur work",
    ],
    blocks: [
      {
        heading: "How colour actually works",
        body: [
          "Every colour has three independent properties, and separating them is what makes colour controllable rather than a matter of luck. **Hue** is which colour it is — red, green, blue — measured as a position on the colour wheel. **Saturation** is how intense or vivid it is, from a pure vivid colour at one extreme to grey at the other. **Brightness** (or value) is how light or dark it is, from white to black. Almost every amateur colour problem is a brightness problem disguised as a colour problem: two colours that seem to clash often simply have the same brightness, so nothing separates them.",
          "**Temperature** divides the wheel into warm hues — red, orange, yellow — which read as energetic, urgent, close; and cool hues — blue, green, violet — which read as calm, professional, distant. Nigerian commercial design leans heavily warm because warmth reads as energy and invitation, which suits food, fashion, events and church materials; finance, health and technology lean cool because cool reads as trustworthy. Neither is right in the abstract. Choose the temperature from the message, not from preference.",
        ],
      },
      {
        heading: "Building a palette that works",
        body: [
          "A working palette has roles, not just colours. The **primary** carries the brand and covers the largest area. The **secondary** supports it — usually a neutral such as white, off-white, grey or near-black that gives the eye somewhere to rest. The **accent** is used sparingly for the one thing that must be noticed: the price, the button, the call to action. When the accent appears everywhere it stops being an accent, which is the single most common colour failure in commercial design.",
          "The **60-30-10 rule** gives you the proportions: roughly 60% dominant, 30% secondary, 10% accent. It works because it guarantees contrast by construction — a small vivid area against a large calm area is always visible, while two equal vivid areas fight each other. Build palettes with **colour harmony** relationships: analogous colours sit next to each other on the wheel and read as calm and unified; complementary colours sit opposite and read as bold and energetic; triadic colours sit at three equal points and read as vibrant but need careful proportioning.",
          "Then check contrast, which is not optional. Body text needs a contrast ratio of at least 4.5:1 against its background, and large text at least 3:1. This is the WCAG accessibility standard and it is a real requirement, not a nicety — low-contrast grey text on white fails for a large proportion of viewers, especially on a phone in daylight, which is how most Nigerians will see your design. Use a contrast checker; do not trust your eye, because your eye adapts and a screen in a dark room is not a phone in the sun.",
        ],
      },
      {
        heading: "Typefaces: the four families and what they signal",
        body: [
          "**Serif** typefaces have small strokes at the ends of letters — Times New Roman, Georgia, Playfair. They read as traditional, formal, established, and they work well for printed body text and for institutions. **Sans-serif** typefaces have no such strokes — Arial, Helvetica, Inter, Montserrat. They read as modern, clean, direct, and they dominate digital screens because they stay legible at small sizes. **Script** typefaces imitate handwriting and read as elegant or personal; they are for accents only, never for body text. **Display** typefaces are decorative and exist to be noticed at large size; they are almost always unreadable small.",
          "The professional habit is to **limit yourself to two typefaces**, occasionally three. One for headings, one for body. More than that produces visual noise with no communicative benefit, and it is one of the most reliable amateur tells. Within those two you get all the variation you need from **weight** (light, regular, medium, bold, black), **size**, and **case** — not from adding another family.",
          "Choosing deliberately means asking what the message needs. A law firm and a cake shop should not use the same typeface, because the typeface is communicating before anyone reads a word. Browse a library — Google Fonts is free and huge — and choose by asking whether the letterforms match the tone, then test them at the actual size you will use rather than at the large preview size that makes everything look good.",
        ],
      },
      {
        heading: "Type scale, spacing and line length",
        body: [
          "A **type scale** is a consistent set of sizes rather than sizes chosen one at a time. Pick a base body size and multiply by a ratio to get your other sizes — a common approach is 1.25 or 1.5. So with a 16px base and a 1.25 ratio you get 20, 25, 31 and so on. Using a scale means every size on the page relates to every other, which is why designed text looks ordered while arbitrary sizes look arbitrary even when the viewer cannot say why.",
          "**Line spacing** (leading) controls readability more than font choice does. Body text needs roughly 1.4 to 1.6 times the font size; headings need tighter, around 1.1 to 1.2, because short lines do not need help being followed. Too tight and lines blur together; too loose and the eye loses its place between lines. **Letter spacing** (tracking) should be slightly increased for all-caps and small text, and slightly reduced for very large display text, which is why big headlines look better tightened.",
          "**Line length** is the most ignored factor. Body lines should run roughly 45 to 75 characters — about 60 is ideal. Longer than that and the eye struggles to return to the start of the next line; shorter and it breaks rhythm constantly. On a poster this means your body text block should be far narrower than the page, which is exactly the kind of decision that looks deliberate and reads easily.",
        ],
      },
      {
        heading: "The failures that mark amateur work",
        body: [
          "Colour failures cluster. **Pure black on pure white** is harsher than it needs to be — a near-black like #1A1A1A on white, or white on near-black, is easier to read. **Vibrating colours** — saturated red against saturated green, or blue against red — create a flickering edge because neither can settle as figure or ground; separate them with a neutral. **Rainbow palettes** use too many hues with no hierarchy, so nothing leads. And **gradient text at small sizes** destroys legibility entirely.",
          "Typography failures cluster too. **Stretching type** — distorting it wider or taller than its natural proportions — is instantly recognisable and instantly cheap; scale it, never stretch it. **Centred body paragraphs** longer than a few lines force the eye to hunt for the start of each line. **Widows and orphans** — a single word alone on the last line, or a heading stranded at the bottom of a page — look careless and take ten seconds to fix. **Fake italics** produced by slanting a roman face rather than using the real italic look wrong to anyone who reads a lot.",
          "The through-line in all of these is the same: they are shortcuts taken to save thirty seconds, and each one costs the design credibility that took hours to build. Learn the list and check against it before every delivery.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor builds a palette from scratch for a real Nigerian business, checks its contrast numerically, pairs typefaces, builds a scale, and applies both to a flyer — then shows the common failures side by side.",
      steps: [
        {
          step: "Take a real brief",
          detail:
            "Use a real example — a Lagos bakery needing social content and a flyer. Ask what the brand should feel: warm, appetising, trustworthy, affordable.",
        },
        {
          step: "Choose a temperature from the message",
          detail:
            "Explain that food leans warm, and pick a hue in the orange-red range as the starting point rather than picking a favourite colour.",
        },
        {
          step: "Build the palette with roles",
          detail:
            "Set a primary warm hue, a warm off-white secondary, a near-black for text, and one accent. Name each role out loud as it is created.",
        },
        {
          step: "Apply 60-30-10",
          detail:
            "Sketch the flyer and assign roughly 60% off-white background, 30% primary, 10% accent. Show how the accent immediately reads as the call to action.",
        },
        {
          step: "Check contrast numerically",
          detail:
            "Run the text-on-background pair through a contrast checker. Show the ratio, compare it with the 4.5:1 requirement, and adjust the near-black until it passes.",
        },
        {
          step: "Test on a phone in bright light",
          detail:
            "Open the design on a phone with the brightness up. Explain that this is the real viewing condition for most Nigerian audiences and that a dark room lies.",
        },
        {
          step: "Choose the heading typeface",
          detail:
            "Browse two or three candidates in Google Fonts, test them at the actual heading size, and explain the choice by reference to tone rather than preference.",
        },
        {
          step: "Choose the body typeface",
          detail:
            "Pick a clean sans-serif that stays legible small. Show the pairing at real sizes and explain why two families are enough.",
        },
        {
          step: "Build the type scale",
          detail:
            "Set a base size and derive heading, subheading and caption sizes using a 1.25 ratio. Show how relating sizes makes the page look ordered.",
        },
        {
          step: "Set spacing and line length",
          detail:
            "Apply 1.5 line spacing to body, 1.15 to the heading, and narrow the text block to about 60 characters. Show the readability difference.",
        },
        {
          step: "Show the failures",
          detail:
            "Rebuild the same flyer with stretched type, a rainbow palette, centred body text, vibrating colours and a low-contrast grey. Place it beside the correct version.",
        },
        {
          step: "Run the checklist",
          detail:
            "Walk the amateur-failure checklist against the good version, confirming each item. Explain that this checklist is run before every professional delivery.",
        },
      ],
    },
    practice: {
      title: "Palette, type system, applied",
      brief:
        "You build a complete colour and type system for a real business, verify it numerically, and apply it to two pieces — a social media post and a printed flyer — so the system proves itself across formats.",
      steps: [
        "Choose a real business and write one line on what the brand should feel.",
        "Pick a temperature from the message and a primary hue from that temperature.",
        "Build the palette: primary, secondary neutral, near-black text colour, one accent.",
        "Assign 60-30-10 proportions and write them down before designing.",
        "Check every text-and-background pair against a contrast checker; all must pass 4.5:1.",
        "Choose a heading typeface and a body typeface, testing both at real sizes.",
        "Write the type scale: base size plus the derived sizes using one ratio.",
        "Set line spacing, letter spacing and line length for body and headings.",
        "Apply the system to a square social media post.",
        "Apply the same system unchanged to an A5 flyer.",
        "Run the amateur-failure checklist against both.",
        "Present the system sheet alongside the two pieces.",
      ],
      standard:
        "A documented palette with named roles and verified contrast ratios, a two-typeface system with a written scale and spacing rules, and two pieces that use the system identically with no stretched type, no low-contrast text and no more than two families.",
    },
    pitfalls: [
      {
        problem: "Your colours clash and you cannot say why",
        fix: "Check brightness first. Two hues that fight usually have the same brightness, so nothing separates them. Change the lightness of one and the clash normally disappears without changing the hues at all.",
      },
      {
        problem: "Your accent colour is everywhere",
        fix: "An accent used broadly stops being an accent. Hold it to about 10% of the design and reserve it for the single thing that must be noticed.",
      },
      {
        problem: "Your text is grey on white and hard to read",
        fix: "Measure it. Body text needs at least 4.5:1 contrast. Darken the text to a near-black rather than pure black, and check on a phone in bright light rather than trusting your eye in a dim room.",
      },
      {
        problem: "You used four typefaces",
        fix: "Cut to two — one heading, one body — and get your variation from weight, size and case. More families produce noise without adding meaning.",
      },
      {
        problem: "You stretched a typeface to fill a space",
        fix: "Scale it proportionally instead, or shorten the words. Distorted letterforms are the single most recognisable mark of amateur work and no client forgives them.",
      },
      {
        problem: "Your paragraphs are centred and hard to read",
        fix: "Left-align anything longer than a few words and narrow the line to about 60 characters. Centred body copy forces the eye to hunt for the start of each line.",
      },
      {
        problem: "You left a one-word last line",
        fix: "Widows and orphans look careless. Reword, adjust the line length slightly or change the size — it takes ten seconds and it is exactly what a careful client notices.",
      },
    ],
    expertNotes: [
      "Build a personal palette library. Every time you see a colour combination that works — on a package, a sign, a photograph — save it. After six months you will have thirty proven palettes and you will never sit staring at a colour wheel again.",
      "Default to a near-black like #1A1A1A rather than pure #000000 for text, and an off-white rather than pure white for large backgrounds. Pure black on pure white creates harsh edges and reads as unrefined, while the softened version looks more expensive for no extra effort.",
      "Learn two or three typeface pairings so well that they become reflex. A strong grotesque for headings with a readable humanist sans for body covers most commercial work. Depth in a small number of choices beats shallow familiarity with a hundred fonts.",
      "Test at the real size and the real device, always. A design judged at 100% zoom on a desktop monitor tells you almost nothing about how it reads on a cracked phone screen in Lagos sunlight — and that second condition is where the design actually lives.",
    ],
    vocabulary: [
      { term: "Hue", meaning: "Which colour it is — its position on the colour wheel." },
      {
        term: "Saturation",
        meaning:
          "How vivid a colour is, from pure to grey. Lowering saturation is often the fix for a clashing palette.",
      },
      {
        term: "Brightness (value)",
        meaning:
          "How light or dark a colour is. Most perceived colour clashes are actually equal-brightness problems.",
      },
      {
        term: "60-30-10",
        meaning:
          "Palette proportion rule: roughly 60% dominant, 30% secondary, 10% accent. Guarantees contrast by construction.",
      },
      {
        term: "Contrast ratio",
        meaning:
          "A numeric measure of text legibility against its background. Body text needs at least 4.5:1.",
      },
      {
        term: "Type scale",
        meaning:
          "A related set of type sizes derived from a base by a fixed ratio, rather than sizes chosen individually.",
      },
      {
        term: "Leading (line spacing)",
        meaning:
          "Vertical space between lines. Body text needs 1.4–1.6× the font size; headings need tighter.",
      },
      {
        term: "Widow / orphan",
        meaning:
          "A single stranded word or heading left alone. Looks careless; takes ten seconds to fix.",
      },
    ],
    homework: [
      {
        task: "Build three palettes from photographs",
        detail:
          "Take three photographs you like — a market scene, a fabric, a building — and extract a four-colour palette from each with named roles. Photographs produce naturally harmonious palettes because real light already balanced them.",
      },
      {
        task: "Test contrast on five real designs",
        detail:
          "Pick five social posts or flyers you see this week and run their text colours through a contrast checker. Note how many fail 4.5:1 — it is usually most of them.",
      },
      {
        task: "Learn one typeface pair deeply",
        detail:
          "Choose a heading and a body face and set the same paragraph in it at five sizes with three weights. Note where each stops being legible. That knowledge transfers to every future project.",
      },
      {
        task: "Rebuild one of your old designs with the new system",
        detail:
          "Take something you made before this session and rebuild it with a documented palette and type scale. Keep both versions — the comparison is the clearest evidence of your own progress.",
      },
    ],
    rubric: [
      {
        criterion: "Colour system",
        passing: "Uses a limited, sensible palette.",
        excellent:
          "A documented palette with named roles, a chosen harmony relationship, and 60-30-10 proportions applied deliberately.",
      },
      {
        criterion: "Accessibility",
        passing: "Text is generally readable.",
        excellent:
          "Every text-and-background pair measured and passing 4.5:1, verified on a phone in bright light.",
      },
      {
        criterion: "Typeface choice",
        passing: "Uses one or two typefaces.",
        excellent:
          "Two faces chosen for tone, tested at real sizes, with variation from weight and size rather than added families.",
      },
      {
        criterion: "Typographic craft",
        passing: "Text is set reasonably.",
        excellent:
          "A written scale from one ratio, correct leading for body and headings, controlled line length, no stretched type, no widows.",
      },
      {
        criterion: "Application",
        passing: "Applies the system to one piece.",
        excellent:
          "Applies the identical system to two different formats and can explain what had to change and what deliberately did not.",
      },
    ],
    faqs: [
      {
        q: "How many colours should a design have?",
        a: "Three to four with clear roles: a dominant, a secondary neutral, a text colour and one accent. Beyond that you lose hierarchy and the design starts reading as noise. Clients often ask for more colours; the professional answer is to make the existing ones work harder rather than add another.",
      },
      {
        q: "Does contrast really matter that much?",
        a: "Yes, and it is measurable rather than a matter of opinion. At least 4.5:1 for body text is the accessibility standard, and it exists because a large proportion of viewers cannot read below it — particularly on phones in daylight, which is how most Nigerians will see your work. Low-contrast design quietly excludes people.",
      },
      {
        q: "Where do I get fonts, and are they free to use commercially?",
        a: "Google Fonts is free and licensed for commercial use, which covers almost everything you will need. Always check the licence on any font from elsewhere, and never use a font you found on a random site in paid client work — a font licence dispute is a genuinely expensive mistake for a ₦50,000 job.",
      },
      {
        q: "Can I use more than two typefaces if they suit the design?",
        a: "Occasionally three works — for example a display face for one large word, a heading face and a body face. But you should be able to say what each one is doing. If you cannot, you do not need it.",
      },
      {
        q: "How do I choose colours for a client who has no brand?",
        a: "Start from the message and the audience, not from preference. Ask what the business wants to feel — trustworthy, exciting, premium, affordable — pick the temperature that carries it, then build the palette. Present two options with a one-line rationale each, and let the client choose between two good answers rather than an open field.",
      },
    ],
  },

  "canva-interface": {
    summary:
      "Canva is where most paid design work in this market actually gets done — it is free, runs on a phone, and clients recognise it. This session takes you through the whole interface deliberately: the workspace, templates, elements, text, uploads, backgrounds, layers, sizing and export, so the tool stops being in the way.",
    objectives: [
      "Set up a Canva account, brand kit and folder structure for professional work",
      "Navigate the workspace and choose the right canvas size for the job",
      "Use templates as a starting structure rather than a finished design",
      "Work confidently with elements, text, uploads and backgrounds",
      "Control position, alignment and distribution precisely",
      "Manage layers, grouping and locking on a real design",
      "Export at the correct size and format for print and for screen",
    ],
    blocks: [
      {
        heading: "The workspace and setting up properly",
        body: [
          "Canva's workspace has five regions and knowing them by name makes the tool immediate. The **canvas** is the centre — your actual design at its true proportions. The **side panel** on the left holds Design, Elements, Text, Brand, Uploads, Draw, Projects and Apps. The **top bar** holds file name, undo and redo, resize, share, and the download button. The **context toolbar** appears above the canvas whenever something is selected and changes with what you selected — this is where most real work happens. And the **position and layer controls** sit at the top-right of the canvas.",
          "Set up three things before you design anything. First, a **Brand Kit** under Brand, holding your colours, your two typefaces and your logo — Canva's free tier gives you a limited version, and even that saves you from re-picking colours on every job. Second, a **folder structure** in Projects: one folder per client, and inside it a folder per project, so that six months later you can find the file a client is asking about. Third, **turn on version naming** by renaming every design with the date, client and subject — `2026-09-27 AdeBakery Instagram Launch` — because Canva autosaves continuously and you cannot rely on remembering which of four untitled designs was the final one.",
        ],
      },
      {
        heading: "Canvas size, templates and why size comes first",
        body: [
          "Choose the canvas size before anything else, because resizing a finished design is far harder than starting at the right dimensions. The sizes you will use constantly: **1080×1080** for a square Instagram or Facebook post; **1080×1350** for a portrait Instagram post, which takes more screen space and generally performs better; **1080×1920** for a story or reel cover; **A4** (210×297mm) for printed flyers and documents; **A5** (148×210mm) for handouts; **85×55mm** for Nigerian business cards; and **1920×1080** for a presentation slide. Use Custom size for anything unusual rather than designing at the wrong dimensions and stretching later.",
          "Templates are a legitimate professional starting point, and using one is not cheating — but use them for **structure**, not for content. The right way is to pick a template whose layout logic suits your hierarchy, then replace every colour with your palette, every font with your two faces, and every image with a relevant one. The wrong way is to leave its fonts and colours, which produces the generic look that makes Canva a byword for amateur design. A good rule: if a viewer could recognise the template, you have not adapted it enough.",
        ],
      },
      {
        heading: "Elements, text, uploads and backgrounds",
        body: [
          "The **Elements** panel holds shapes, lines, frames, grids, stickers, illustrations, photos and videos. The two you will use most are **frames** and **grids**: drop a frame onto the canvas, then drag any photo into it and the photo is masked to the frame's shape — this is how you get a circular portrait or a rounded image without any editing skill. **Lines** with adjustable weight and style are how you create dividers and structure, and they are used far less than they should be.",
          "**Text** has three entry points — a heading, a subheading and body text preset — plus the ability to add a plain text box. The presets apply a size and font, which you should immediately replace with your own scale. Right-click any text and choose 'Copy style' then paste it onto other text to propagate formatting consistently, which is much faster than setting each box separately. **Uploads** is where your own images go; drag them straight onto the canvas or into a frame. Note that Canva has a built-in Background Remover, which is genuinely useful for product shots but is a paid feature on the free tier.",
          "**Backgrounds** can be a solid colour, a gradient, a photo or a pattern. The professional default is a solid colour or a very subtle gradient, because a busy background competes with everything above it. If you must use a photo background, place a semi-transparent rectangle over it and reduce its opacity so text becomes readable — this single technique fixes most unreadable photo-background designs.",
        ],
      },
      {
        heading: "Position, alignment and precision",
        body: [
          "Precision is what separates deliberate design from approximate design, and Canva gives you real tools for it. With an element selected, the **Position** control offers left, centre and right horizontal alignment and top, middle and bottom vertical alignment — relative to the page, or to a selection if you select several elements first. Selecting several elements also gives you **Tidy up**, which spaces them evenly, and explicit **Align** and **Distribute** options.",
          "The fastest precision habits: hold **Shift while dragging** to constrain movement to a straight axis; hold **Shift while resizing** a corner handle to keep proportions — never resize from a side handle on an image or type, which stretches it; use the **arrow keys** to nudge one pixel at a time, and **Shift+arrow** for larger steps. Turn on the **rulers and guides** (File → View settings) and drag guides from the rulers to mark your margins, so every element snaps to the same structure. Canva also shows smart guides — pink lines that appear when an edge or centre lines up with another element — and you should train yourself to wait for them.",
        ],
      },
      {
        heading: "Layers, grouping and locking",
        body: [
          "Everything on a Canva canvas is a layer, and layers stack: later elements sit on top of earlier ones. The **Position → Layers** panel lists them and lets you reorder by dragging, or send something backward or forward one step or all the way. The keyboard equivalents are worth memorising because you will use them constantly: **Ctrl+]** forward, **Ctrl+[** backward, and with Shift added, all the way to front or back.",
          "**Grouping** (Ctrl+G) binds several elements so they move and resize together — essential once you have built a repeated component like a price tag with a background shape and text on it. Ungroup with Ctrl+U. **Locking** an element (the padlock in the context toolbar, or Shift+L) prevents it from being selected or moved at all, which is the right thing to do with your background and any finished area you keep accidentally dragging. These two features are the difference between working quickly on a complex design and fighting it.",
        ],
      },
      {
        heading: "Export: the setting that ruins most work",
        body: [
          "Export correctly or everything before it was wasted. **For screen** — social media, web, WhatsApp — export **PNG** at the canvas size; PNG is sharper than JPG for designs containing text and flat colour, which is almost all of your work. **For print**, export **PDF Print**, and tick 'Crop marks and bleed' if the printer requires them, because a design printed without bleed shows a white edge wherever the trim is slightly off. Never export a print job as PNG or JPG.",
          "The most common and most expensive export mistake is **resolution**. Canva's free tier exports at 96 DPI-equivalent screen resolution, which is fine online but soft in print. If a client needs a large printed piece — a banner, a poster, a roll-up — design it at a larger canvas size so the exported pixel dimensions are high enough, or use Canva Pro's ability to export at a size multiplier. Tell the client the constraint rather than delivering a soft banner and being blamed for it. Also always check the exported file on the device it will be viewed on before you send it, because compression in WhatsApp will reduce quality further and you should know what the client will actually see.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor sets up a fresh Canva workspace from scratch, then builds a complete square social post start to finish, narrating every panel, shortcut and setting as it is used.",
      steps: [
        {
          step: "Create the account and set the language",
          detail:
            "Sign up, choose the free tier, and show where the Brand Kit, Projects folders and settings live. Explain the folder-per-client structure and create it.",
        },
        {
          step: "Build the Brand Kit",
          detail:
            "Add the palette from session two, the two typefaces and a logo. Show how the kit then appears in every future design and saves re-picking colours.",
        },
        {
          step: "Create the canvas at the correct size",
          detail:
            "Choose 1080×1350 for a portrait Instagram post and explain why that size beats the square for reach. List the other sizes the class will use constantly.",
        },
        {
          step: "Pick a template for structure only",
          detail:
            "Choose a template whose layout suits the hierarchy, then immediately strip its colours and fonts. Explain that recognisable templates are the amateur tell.",
        },
        {
          step: "Set the background",
          detail:
            "Apply a solid brand colour. Then demonstrate the photo-background technique: add a photo, overlay a rectangle at reduced opacity, and show the text becoming readable.",
        },
        {
          step: "Add text with the type scale",
          detail:
            "Add heading, subheading and body using the session-two scale. Use Copy style to propagate formatting rather than setting each box separately.",
        },
        {
          step: "Use a frame for the image",
          detail:
            "Drop a circular frame, drag an uploaded product photo into it, and show the automatic masking. Explain that this replaces any need for image-editing skill.",
        },
        {
          step: "Add structure with lines and shapes",
          detail:
            "Add a weighted divider line and a rounded rectangle behind the call to action. Show how two simple elements create deliberate structure.",
        },
        {
          step: "Align precisely",
          detail:
            "Turn on rulers and guides, drag margin guides, then use Position to align every element to the same left edge. Wait for the smart guides.",
        },
        {
          step: "Group and lock",
          detail:
            "Group the call-to-action shape and text with Ctrl+G, then lock the background with Shift+L. Show how much faster the design is to work on afterwards.",
        },
        {
          step: "Resize for a second format",
          detail:
            "Create a 1080×1920 story version and reposition rather than stretch. Explain why resizing a finished design is harder than starting at the right size.",
        },
        {
          step: "Export both ways",
          detail:
            "Export PNG for social and PDF Print for a printed version, ticking crop marks and bleed on the print one. Explain the resolution limitation and what to tell a client.",
        },
      ],
    },
    practice: {
      title: "One design, three formats, correctly exported",
      brief:
        "You set up a professional Canva workspace, then produce one design in three formats — a square post, a portrait post and an A5 flyer — using a documented system, and export each at the correct settings for its destination.",
      steps: [
        "Create your folder structure: one folder per client, one per project inside it.",
        "Build your Brand Kit with your palette, two typefaces and a logo.",
        "Create the design at 1080×1080 with the correct name: date, client, subject.",
        "Choose a template for structure and strip its colours and fonts.",
        "Set the background, adding an opacity overlay if you use a photo.",
        "Add text using your documented type scale, propagating with Copy style.",
        "Use a frame for the main image so it is masked cleanly.",
        "Turn on rulers and guides and set margin guides before aligning.",
        "Align every element to one edge using Position, waiting for smart guides.",
        "Group repeated components and lock the background.",
        "Duplicate and adapt to 1080×1350, repositioning rather than stretching.",
        "Duplicate and adapt to A5, adjusting the type scale for print.",
        "Export PNG for both social sizes and PDF Print with crop marks and bleed for the A5.",
        "Open each exported file on a phone and check it at real size.",
      ],
      standard:
        "A tidy workspace with Brand Kit and named folders, one coherent design in three formats using the same palette and typefaces, every element aligned to a guide, no stretched images or type, and three correctly formatted exports verified on a phone.",
    },
    pitfalls: [
      {
        problem: "Your exported print file came out soft or has white edges",
        fix: "Export PDF Print rather than PNG, tick crop marks and bleed, and design large-format pieces at a larger canvas size so the pixel dimensions are sufficient. Tell the client the resolution constraint up front rather than after delivery.",
      },
      {
        problem: "Your design still looks like the template",
        fix: "Replace every colour with your palette, every font with your own two faces, and every image with a relevant one. If a viewer could recognise the template, you have not adapted it enough.",
      },
      {
        problem: "You resized an image from a side handle and it stretched",
        fix: "Always resize from a corner handle with Shift held. Stretched images and stretched type are the most immediately recognisable marks of amateur work.",
      },
      {
        problem: "You keep dragging the background by accident",
        fix: "Lock it with Shift+L, and lock any finished area. Locking costs one keystroke and prevents the accidental move that undoes ten minutes of alignment.",
      },
      {
        problem: "You have four untitled designs and cannot find the final one",
        fix: "Rename every design the moment you create it: date, client, subject. Canva autosaves continuously, so versioning by name is your only reliable history on the free tier.",
      },
      {
        problem: "You used a Canva element in paid client work without checking the licence",
        fix: "Most Canva media is licensed for commercial use, but not all, and some content carries restrictions. Check the licence on anything prominent before delivering paid work, and prefer your own or properly licensed imagery for anything central to the brand.",
      },
    ],
    expertNotes: [
      "Learn the keyboard shortcuts in the first week: Ctrl+D to duplicate, Ctrl+G to group, Ctrl+] and Ctrl+[ for layer order, Shift+L to lock, Shift+arrow to nudge, and C and V to paste a copied style. Canva's shortcuts are shallow but they are the difference between designing at speed and hunting through menus on every element.",
      "Build a personal template library from your own finished work. Once you have made a good flyer, save it as a template and reuse its structure for the next client. After five projects you will have a library that makes you visibly faster than anyone starting from a blank canvas or from Canva's public templates.",
      "Work in one project file with multiple pages rather than many separate files. Canva pages let you hold the square, portrait and print versions of one campaign together, so the client reviews them as a set and you apply changes once.",
      "Check every deliverable on a phone before sending. WhatsApp compression, screen brightness and small size change how a design reads, and the ten seconds it takes to check prevents the most common and most avoidable client complaint.",
    ],
    vocabulary: [
      {
        term: "Canvas",
        meaning:
          "The design surface at its true proportions. Choose its size before anything else.",
      },
      {
        term: "Brand Kit",
        meaning:
          "Your saved colours, typefaces and logo, available in every design. Set it up before your first project.",
      },
      {
        term: "Frame",
        meaning:
          "A shape that masks any image dragged into it — the fastest way to get clean circular or rounded images.",
      },
      {
        term: "Smart guides",
        meaning:
          "Pink lines that appear when an edge or centre lines up with another element. Wait for them rather than eyeballing.",
      },
      {
        term: "Grouping",
        meaning:
          "Binding elements so they move and resize together (Ctrl+G). Essential for repeated components.",
      },
      {
        term: "Locking",
        meaning:
          "Preventing an element from being selected or moved (Shift+L). Use it on backgrounds and finished areas.",
      },
      {
        term: "Bleed",
        meaning:
          "Extra area beyond the trim edge so no white shows when a print job is cut. Always ticked for print.",
      },
      {
        term: "PDF Print",
        meaning: "Canva's print export format. Never export a print job as PNG or JPG.",
      },
    ],
    homework: [
      {
        task: "Set up your professional workspace",
        detail:
          "Build your folder structure, Brand Kit with your session-two palette and typefaces, and a naming convention. This setup is used for every remaining session of the course.",
      },
      {
        task: "Learn ten shortcuts",
        detail:
          "Ctrl+D, Ctrl+G, Ctrl+U, Ctrl+], Ctrl+[, Shift+L, Shift+arrow, C, V, and Ctrl+Z. Use only these for one full design and note the time saved.",
      },
      {
        task: "Reproduce one design you admire",
        detail:
          "Take a design from your reference folder and rebuild its structure in Canva with your own content. Reproducing solved problems is the fastest way to internalise layout decisions.",
      },
      {
        task: "Test your export knowledge",
        detail:
          "Export one design as PNG, JPG and PDF Print, then compare the three files at 100% zoom on your phone. Write down which you would use for social and which for a printer, and why.",
      },
    ],
    rubric: [
      {
        criterion: "Workspace setup",
        passing: "Has an account and can find the main panels.",
        excellent:
          "Brand Kit configured, client folders created, and a naming convention applied to every file.",
      },
      {
        criterion: "Tool command",
        passing: "Can place and format text, images and shapes.",
        excellent:
          "Uses frames, guides, Position alignment, grouping and locking fluently, with shortcuts rather than menus.",
      },
      {
        criterion: "Design application",
        passing: "Produces a legible design.",
        excellent:
          "Applies the session-one and session-two principles visibly — hierarchy, alignment, palette roles and type scale all present.",
      },
      {
        criterion: "Multi-format work",
        passing: "Produces one format.",
        excellent:
          "Produces three formats from one system, repositioning rather than stretching, with no distortion anywhere.",
      },
      {
        criterion: "Export correctness",
        passing: "Exports a usable file.",
        excellent:
          "PNG for screen, PDF Print with crop marks and bleed for print, every file checked on a phone at real size.",
      },
    ],
    faqs: [
      {
        q: "Do I need Canva Pro?",
        a: "Not to learn or to do most paid work. The free tier covers design, templates, uploads and export. Pro adds the Background Remover, larger export sizes, more stock media and folder sharing — worth it once clients are paying you, not required to start. Session six covers what to do about large-format print resolution on the free tier.",
      },
      {
        q: "Can I do this whole course on a phone?",
        a: "Yes — Canva's mobile app is genuinely capable and many Nigerian designers work entirely on phones. A laptop is faster for precision alignment and layer work, but the phone is not a limitation for the standard of work this course requires.",
      },
      {
        q: "Is using templates unprofessional?",
        a: "No — professionals use structure from everywhere. What is unprofessional is leaving a template's fonts and colours in place. Adapt it to your system and it becomes your work; leave it recognisable and it becomes generic.",
      },
      {
        q: "What size should I design for Instagram?",
        a: "1080×1350 for a portrait feed post, which occupies more of the screen than a square and generally performs better; 1080×1080 if the client wants a square; 1080×1920 for stories and reels. Design at those exact dimensions rather than resizing afterwards.",
      },
      {
        q: "My client's printer says my file is wrong. What do I send?",
        a: "PDF Print with crop marks and bleed ticked, and ask the printer what bleed they want — commonly 3mm. If the piece is large, confirm the required resolution before you design, because a banner needs a much larger canvas than a flyer. Asking the printer first is a professional habit, not an admission of weakness.",
      },
    ],
  },
};
