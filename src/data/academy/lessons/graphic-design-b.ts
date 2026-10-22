import type { SessionLecture } from "../types";

/**
 * Graphic Design — ₦20,000 · 4 weeks · 8 sessions.
 * Sessions 4 to 6. (Sessions 1–3 in graphic-design.ts, 7–8 in graphic-design-c.ts.)
 */
export const graphicDesignLessonsB: Record<string, SessionLecture> = {
  "layers-and-brand": {
    summary:
      "This session finishes the tool and starts the business. You master layers and grouped components so complex designs stay editable, then learn what a brand actually is — logo, palette, typefaces, tone — and how to build a brand kit that lets one client's materials look consistent across dozens of pieces.",
    objectives: [
      "Control layer order, grouping and locking on a complex multi-element design",
      "Build reusable grouped components and a personal template library",
      "Explain what a brand is beyond a logo, and why consistency is the point",
      "Design a simple logo and understand where a wordmark beats a symbol",
      "Build a complete brand kit: logo, palette, typefaces, tone, usage rules",
      "Apply one brand consistently across several formats",
    ],
    blocks: [
      {
        heading: "Layers on a complex design",
        body: [
          "A simple flyer has ten elements and layer order barely matters. A real brand deliverable — a poster with a photo background, an overlay, a logo, three text blocks, four icons, a divider and a call-to-action button — has thirty or more, and without layer discipline it becomes unworkable within twenty minutes. The discipline is straightforward: build from the back forward, keep the background and its overlay at the bottom, lock them once they are correct, then work in one region at a time rather than jumping around the canvas.",
          "Use the **Layers panel** rather than guessing. Canva's Position → Layers view lists every element and lets you drag to reorder, which is far more reliable than repeatedly pressing forward and backward. Learn to read the list: elements are listed topmost first, so the first item in the list is what the viewer sees on top. When something disappears, it has almost always been covered by a larger element above it in the list — and finding it in the panel takes five seconds while hunting on the canvas can take minutes. **Lock** anything finished, **group** anything that belongs together, and **name** groups where Canva allows it so the panel stays readable.",
        ],
      },
      {
        heading: "Reusable components and your template library",
        body: [
          "The professional multiplier is reuse. Once you have built a call-to-action button — a rounded rectangle with text on it, aligned and grouped — you should never build another. Group it, duplicate it, and change only the words. The same applies to a price tag, a social handle bar, a photo frame with a caption, a section header with a divider. Build each once as a grouped component and your speed roughly doubles from the third project onward, while your output becomes visibly consistent — which clients read as professionalism.",
          "Then build the library. After every finished job, save a stripped version — your structure with placeholder text and neutral colours — into a personal templates folder. After five projects you will have flyer, poster, social post, story, business card and presentation structures ready to adapt, and you will deliver in the time it takes a beginner to choose a public template. This library is a genuine business asset: it is why an experienced designer can quote a two-hour turnaround on a flyer and mean it.",
        ],
      },
      {
        heading: "What a brand actually is",
        body: [
          "A brand is not a logo. A brand is the set of expectations a person carries about a business, formed by everything they encounter: how the materials look, how the writing sounds, how the phone is answered, how the packaging feels. The logo is one small visible marker of that. This is why 'design me a logo' is almost never the real request — the real request is 'make my business look like the kind of business I want to be', and a logo delivered without a palette, a typeface and a tone does not achieve it.",
          "The thing a brand kit buys is **consistency**, and consistency is what makes a small business look established. When a customer sees the same colours, the same two typefaces and the same visual tone across a flyer, an Instagram post, a receipt and a sign, they build trust without being able to say why. When each material looks different, the business reads as improvised even if the work is individually good. This is the argument you make to a Nigerian small-business client who thinks they only need one flyer: the value is not the flyer, it is that the next ten things match it.",
        ],
      },
      {
        heading: "Logos: wordmarks, symbols and the honest limits",
        body: [
          "Most small businesses need a **wordmark** — the business name set in a distinctive typeface, possibly with one simple modification — rather than a symbol. Wordmarks are faster to produce, they communicate the name directly, they scale down to a WhatsApp profile picture without losing legibility, and they avoid the trap of a generic clip-art symbol that says nothing. Look at how many major brands are simply their name well set; the reasoning applies doubly to a business with no marketing budget.",
          "If a symbol is needed, the rules are **simple, distinctive and legible at 32 pixels**. Test every logo at that size before delivering it, because that is roughly how it appears as a profile picture, and a symbol that collapses at 32 pixels is useless in practice. Avoid gradients in a logo, because they reproduce badly in single-colour print and embroidery. Avoid fine detail for the same reason. And always deliver the logo in a **single-colour version** as well as the full-colour one, because the client will need it embroidered, stamped, faxed or printed in black and white, and a logo that only works in full colour is an incomplete deliverable.",
          "Be honest about Canva's limits here. Canva is excellent for wordmarks and simple composed symbols. It is not a vector illustration tool, so a complex hand-drawn mark or an intricate custom letterform is beyond it — that work belongs in Adobe Illustrator or with a specialist. Saying so to a client is professional; producing a weak complex mark in the wrong tool is not.",
        ],
      },
      {
        heading: "Building the brand kit",
        body: [
          "A complete kit has six parts and takes about an hour once you know what you are doing. **The logo** in full colour, single colour, and on a dark background. **The palette** with named roles and hex codes — primary, secondary, text, accent — written down so anyone can use them. **The typefaces**, one for headings and one for body, with the specific weights you use. **The tone of voice** in three adjectives and two example sentences, so captions sound like the business. **Imagery direction** — what kinds of photographs fit, and what never appears. And **usage rules**: minimum logo size, clear space around it, what it must never be placed on.",
          "Deliver it as a document, not a conversation. A two- or three-page PDF holding the logo variants, the palette with hex codes, the typefaces with sample text, and a page of correct and incorrect examples. This document is what turns a one-off design job into a paid brand package, it is what makes the client's next designer consistent with your work, and it is the artefact that justifies charging for a brand rather than for a logo. In this market a documented brand kit is genuinely uncommon, which is precisely why it commands a higher price.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor builds a real brand for a named Lagos business — logo, palette, typefaces, tone — assembles the kit document, then applies it across three formats to prove the consistency argument.",
      steps: [
        {
          step: "Take the brief and find the real request",
          detail:
            "A client asks for a logo. Ask what the business wants to feel and who it serves, and show that the answer determines everything downstream.",
        },
        {
          step: "Choose wordmark over symbol",
          detail:
            "Explain the reasoning: faster, communicates the name, scales to a profile picture. Set the business name in two or three candidate typefaces.",
        },
        {
          step: "Make one deliberate modification",
          detail:
            "Adjust letter spacing and weight, and add one simple distinguishing element. Explain that one modification is usually enough and more becomes decorative.",
        },
        {
          step: "Test at 32 pixels",
          detail:
            "Export and view the logo at profile-picture size. Show what survives and what collapses, and adjust the weight until it holds.",
        },
        {
          step: "Produce the three logo variants",
          detail:
            "Full colour, single colour, and reversed for dark backgrounds. Explain that a single-colour version is not optional because of embroidery and mono printing.",
        },
        {
          step: "Finalise the palette",
          detail:
            "Set primary, secondary, text and accent with hex codes, checking each text pair against a contrast checker as you go.",
        },
        {
          step: "Set the typefaces and tone",
          detail:
            "Choose heading and body faces with the specific weights, then write three tone adjectives and two example sentences in the business's voice.",
        },
        {
          step: "Write the usage rules",
          detail:
            "State minimum logo size, clear space, and what the logo must never sit on. Show correct and incorrect examples side by side.",
        },
        {
          step: "Assemble the kit document",
          detail:
            "Build the two-page PDF holding all six parts. Explain that this document is the deliverable that justifies a brand fee rather than a logo fee.",
        },
        {
          step: "Build the reusable components",
          detail:
            "In Canva, create and group the call-to-action button, the social bar and the section header. Show duplicating and re-editing them.",
        },
        {
          step: "Apply the brand to three formats",
          detail:
            "Produce a square social post, an A5 flyer and a business card from the same kit. Point out that the palette and typefaces never change — only the layout does.",
        },
        {
          step: "Review for consistency",
          detail:
            "Place all three side by side and confirm they read as one business. Explain that this is the argument that wins the ongoing client.",
        },
      ],
    },
    practice: {
      title: "Build a brand, prove it works",
      brief:
        "You create a complete brand for a real or invented Nigerian business — logo in three variants, documented palette, typefaces, tone, usage rules — assemble the kit document, then apply it to three formats and review them together for consistency.",
      steps: [
        "Write the brief: what the business is, who it serves, and three words for what it should feel like.",
        "Choose between a wordmark and a symbol, and write one line justifying the choice.",
        "Design the logo, testing it at 32 pixels before finalising.",
        "Produce full-colour, single-colour and reversed variants.",
        "Document the palette with named roles and hex codes, checking contrast on every text pair.",
        "Choose heading and body typefaces with specific weights and a sample line of each.",
        "Write the tone: three adjectives and two example sentences.",
        "Write usage rules: minimum size, clear space, prohibited backgrounds.",
        "Assemble everything into a two-page kit PDF with correct and incorrect examples.",
        "Build grouped reusable components in Canva: call to action, social bar, section header.",
        "Apply the brand to a square social post, an A5 flyer and a business card.",
        "Place all three side by side and write two sentences on what makes them read as one business.",
      ],
      standard:
        "A logo that survives 32 pixels and exists in three variants, a documented palette with verified contrast, two typefaces with weights, a written tone and usage rules, a two-page kit PDF, and three formats that visibly belong to one brand.",
    },
    pitfalls: [
      {
        problem: "An element vanished from your design",
        fix: "It is covered by something above it in the stack. Open the Layers panel and look for it there — hunting on the canvas wastes minutes. Lock large background elements so this happens less.",
      },
      {
        problem: "You delivered a logo that only works in full colour",
        fix: "Always deliver single-colour and reversed variants. The client will need it embroidered, stamped or printed in black and white, and a full-colour-only logo is an incomplete deliverable.",
      },
      {
        problem: "Your logo collapses as a WhatsApp profile picture",
        fix: "Test at 32 pixels before delivering. Increase weight, remove fine detail, or simplify. If a symbol cannot survive that size, use a wordmark instead.",
      },
      {
        problem: "You built a logo and called it a brand",
        fix: "A logo without a palette, typefaces and tone leaves the client inconsistent from the next material onward. Deliver the kit — it is more useful to them and it justifies a higher fee.",
      },
      {
        problem: "You tried to draw a complex custom mark in Canva",
        fix: "Canva is not a vector illustration tool. Use a wordmark, or say plainly that the mark needs Illustrator or a specialist. Producing weak work in the wrong tool costs more than an honest referral.",
      },
      {
        problem: "Each of the client's materials looks different",
        fix: "Build reusable grouped components and apply the kit unchanged across formats. Consistency, not any single piece, is what makes a small business look established.",
      },
    ],
    expertNotes: [
      "Always ask what the business wants to feel before you design anything for it. That answer determines the palette temperature, the typeface character and the tone, and getting it early saves three rounds of revision — which is where most design jobs lose their profit.",
      "Deliver the brand kit as a document even when the client did not ask for one. It costs you an hour, it makes their business more coherent, and it is the single most effective way to raise your perceived level in this market.",
      "Keep a components file open while you work — one Canva project holding your grouped buttons, headers, social bars and frames. Pull from it instead of rebuilding, and your delivery time drops while your consistency rises.",
      "Save a stripped template after every job. Ten saved structures later you will quote turnaround times that sound impossible to a beginner, and you will actually meet them — which is what builds a referral business.",
    ],
    vocabulary: [
      {
        term: "Layer order",
        meaning:
          "The stacking sequence of elements. Later elements sit on top; the Layers panel is the reliable way to control it.",
      },
      {
        term: "Component",
        meaning:
          "A grouped, reusable design element such as a button or header, duplicated and re-edited rather than rebuilt.",
      },
      {
        term: "Brand kit",
        meaning:
          "The documented set of logo, palette, typefaces, tone and usage rules that keeps a brand consistent.",
      },
      {
        term: "Wordmark",
        meaning:
          "A logo that is the business name set distinctively, with no separate symbol. The right choice for most small businesses.",
      },
      {
        term: "Clear space",
        meaning:
          "The empty area reserved around a logo so nothing crowds it. Specified in the usage rules.",
      },
      {
        term: "Reversed logo",
        meaning: "The version designed to sit on a dark background, usually white or light.",
      },
      {
        term: "Tone of voice",
        meaning:
          "How a brand sounds in writing, captured as adjectives and example sentences so anyone can match it.",
      },
      {
        term: "Template library",
        meaning:
          "Your saved stripped structures from past jobs — the asset that makes you faster than anyone starting blank.",
      },
    ],
    homework: [
      {
        task: "Collect twenty logos and sort them",
        detail:
          "Divide them into wordmarks and symbols, and note which survive at 32 pixels. This trains the judgement that makes your own logo decisions fast.",
      },
      {
        task: "Build a kit for a business you know",
        detail:
          "Take a real shop, salon or church near you and build the full kit. Even unsolicited, this is portfolio work and sometimes becomes a paid job.",
      },
      {
        task: "Create five reusable components",
        detail:
          "Call-to-action button, social handle bar, section header with divider, price tag, photo frame with caption. Group each and keep them in one file.",
      },
      {
        task: "Apply one brand to five formats",
        detail:
          "Social post, story, A5 flyer, business card and a presentation title slide — all from one kit. Consistency across five is the real test.",
      },
    ],
    rubric: [
      {
        criterion: "Layer command",
        passing: "Manages layers on a moderate design.",
        excellent:
          "Uses the Layers panel deliberately, locks finished areas, and groups components so the design stays editable at thirty-plus elements.",
      },
      {
        criterion: "Reuse",
        passing: "Duplicates elements when helpful.",
        excellent:
          "Maintains grouped components and a saved template library, and can show the time saving on a second project.",
      },
      {
        criterion: "Logo",
        passing: "Produces a legible logo.",
        excellent:
          "Justifies wordmark versus symbol, survives 32 pixels, and is delivered in full-colour, single-colour and reversed variants.",
      },
      {
        criterion: "Brand kit",
        passing: "Documents colours and typefaces.",
        excellent:
          "Complete six-part kit with verified contrast, written tone, usage rules, and correct and incorrect examples.",
      },
      {
        criterion: "Consistency",
        passing: "Formats look related.",
        excellent:
          "Three or more formats that read unmistakably as one business, with the palette and typefaces unchanged and only layout varying.",
      },
    ],
    faqs: [
      {
        q: "Can I design a real logo in Canva?",
        a: "For most small businesses, yes — a well-set wordmark with one simple modification is a genuine professional logo and it is what the majority of businesses actually need. For an intricate custom symbol or hand-drawn lettering, no: that needs a vector illustration tool or a specialist, and saying so is the professional answer.",
      },
      {
        q: "How much should I charge for a brand kit?",
        a: "It depends on your market and confidence, but a documented kit is worth substantially more than a logo alone because it governs every future material. Price it as a package rather than as a logo plus extras, and present the kit document as the reason. Session seven covers pricing properly.",
      },
      {
        q: "My client only wants one flyer, not a brand. What do I do?",
        a: "Do the flyer well, and apply one consistent palette and typeface pair to it anyway. Then show them what a second matching piece would look like. Clients buy consistency once they can see it — you rarely win that argument with words.",
      },
      {
        q: "Should the logo come first or the palette?",
        a: "Usually together, from the same brief. The palette temperature and the typeface character both come from what the business wants to feel, so deciding the brief properly settles both. Designing a logo in isolation often produces something the rest of the brand cannot support.",
      },
      {
        q: "What if the client hates my logo?",
        a: "It happens and it is not a failure. Present two or three directions with a one-line rationale each rather than one, so the conversation is about direction rather than taste. Session seven covers presenting work so that revision rounds stay productive rather than endless.",
      },
    ],
  },

  "flyers-and-social": {
    summary:
      "The work that pays most often: flyers and social media content. This session covers how to design for the two very different conditions each faces — a flyer seen for three seconds at arm's length, a social post seen for under two seconds on a small screen — and how to produce a campaign set efficiently from one brand system.",
    objectives: [
      "Design a flyer that communicates its one message within three seconds",
      "Adapt one design across Instagram, Facebook, WhatsApp and story formats",
      "Write and place the copy elements a flyer actually needs",
      "Work with images: choosing, cropping, treating and licensing them correctly",
      "Produce a consistent campaign set rather than one-off posts",
      "Deliver files a client or printer can actually use",
    ],
    blocks: [
      {
        heading: "The three-second flyer",
        body: [
          "A flyer has one job and about three seconds to do it. Somebody is handed it, or sees it pinned to a wall, or scrolls past it in a WhatsApp status. In that window they must learn what is being offered and why it might matter to them. Everything else — venue, terms, social handles — is secondary and is read only by people already interested. Design the flyer for the person who is not yet interested, because they are the majority.",
          "This produces a fixed structure that works almost every time. **One headline** stating the offer or the event in as few words as possible, at a size readable from two metres. **One supporting line** giving the essential detail — date, time, price, or the main benefit. **One image** that makes the subject concrete. **One call to action** with a phone number or handle, large enough to dial from. **One identity mark** — the logo or business name — placed where the eye finishes. That is five elements. Every additional element you add steals attention from these five, and the most common flyer failure in this market is a page carrying twelve.",
          "The practical test is distance. Print your flyer or view it at actual size, step back two metres, and see what you can read. If you cannot read the headline, it is too small. If you can read the small print but not the offer, your hierarchy is inverted. This test takes twenty seconds and it catches essentially every layout problem before a client does.",
        ],
      },
      {
        heading: "Social media: a harder problem than it looks",
        body: [
          "Social is more constrained than print in three ways. The **screen is small** — most Nigerians view content on a phone, so anything below roughly 24pt equivalent is unreadable and the safe approach is far larger text than feels necessary on a desktop. The **attention window is under two seconds**, so the message must land without reading a paragraph. And **the feed crops you** — Instagram displays a 4:5 preview of a square in some contexts, Facebook crops differently, and a WhatsApp status is vertical. Design so the essential content sits inside a safe central area and nothing critical touches an edge.",
          "The formats you will produce constantly: **1080×1350** portrait for the feed, which occupies the most screen; **1080×1080** square, which is the safest across platforms; **1080×1920** for stories and status, where you must leave the top and bottom clear for the platform's own interface. For a story, keep text in the middle third — the platform puts the profile name at the top and the reply bar at the bottom, and covering either makes the post awkward to use.",
          "One more constraint that is easy to forget: **WhatsApp compression**. Most Nigerian business content is shared through WhatsApp, which recompresses images and softens text. Export at full size, use solid colours and strong contrast rather than subtle gradients and thin type, and always check the file after sending it to yourself through WhatsApp before delivering to a client.",
        ],
      },
      {
        heading: "Copy: what a flyer actually needs to say",
        body: [
          "Designers who cannot write copy produce beautiful flyers that do not work. The elements, in order of importance: the **offer or headline** — what is happening, in the fewest words possible; the **primary detail** — date and time for an event, price for a product, or the main benefit for a service; the **call to action** — the exact next step, with a phone number in a diallable format rather than a handle alone; **proof or reassurance** where relevant, such as 'free entry', 'limited seats', or a testimonial line; and the **identity** — business name and one contact route.",
          "The most common copy failures are vagueness and overload. 'Quality service at affordable prices' tells a reader nothing and is on thousands of Nigerian flyers; 'Generator repair — same day, ₦5,000 callout' tells them exactly what to expect. Overload is the other extreme: eight services listed at the same size, so the reader learns none of them. Choose the one thing this flyer is for. If the client insists on listing everything, use one strong headline and put the list small and secondary — the hierarchy does the work that the words cannot.",
          "Write the copy before you design. Type it out in a plain document at the correct hierarchy, get the client's agreement on the words, and only then place it. This single habit eliminates the most expensive part of design work: rebuilding a layout because the words changed.",
        ],
      },
      {
        heading: "Images: choosing, treating and licensing",
        body: [
          "A relevant photograph beats a decorative one every time. For a food business, the food. For a training centre, real students in a real class. For a salon, the finished work. Nigerian audiences respond strongly to images that look like their own environment, and a stock photograph of a European office is worth less than an honest phone photograph of the actual shop. Where the client has real photographs, use them, and improve them with Canva's brightness, contrast and saturation adjustments rather than replacing them.",
          "The technical treatment matters. **Crop for composition**, keeping the subject clear of the edges and giving it room in the direction it faces. **Treat consistently** — if one image is warm and saturated and the next is cool and desaturated, the set looks accidental; apply the same adjustment to every image in a campaign. **Overlay for legibility** — put a semi-transparent shape behind text placed on a photograph, at roughly 40–60% opacity, so the words stay readable against any part of the image.",
          "Licensing is a real commercial risk. Canva's included media is generally licensed for commercial use, but check anything prominent before delivering paid work, and never take an image from a Google search — image copyright claims against small businesses are common and a ₦50,000 job is not worth a dispute. Free libraries like Unsplash and Pexels are safe, and the client's own photographs are safest of all. Keep a record of where each image came from so you can answer the question later.",
        ],
      },
      {
        heading: "Producing a campaign set efficiently",
        body: [
          "Clients rarely need one post. They need a launch post, a reminder, a testimonial, an offer and a closing post — five pieces that must look like one campaign. Building these as separate designs from scratch is slow and produces inconsistency; building them from one system is fast and produces a set that reads as deliberate.",
          "The method: design the **first piece completely**, establishing the palette application, the typeface sizes, the image treatment and the position of the logo and call to action. Then **duplicate the page** rather than starting again, and change only the content — the headline, the image, the detail. Keep the logo position, the margin structure and the colour proportions identical across every piece. In Canva, hold all five as pages in one project file so you can review them together and apply a change once.",
          "This is also what makes the work profitable. A five-post campaign built as a system takes barely more than two hours; the same five built independently takes a day and looks worse. Learning to design for sets rather than singles is one of the clearest differences between a hobbyist and someone running a design service.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor designs a real campaign for a named business — flyer plus four social posts — live, starting from agreed copy, and shows the two-metre test, the WhatsApp check and the set review.",
      steps: [
        {
          step: "Write the copy first",
          detail:
            "Type the five pieces' words in a plain document at the correct hierarchy. Explain that agreeing the words before designing removes the most expensive revision round.",
        },
        {
          step: "Reduce to five elements",
          detail:
            "Cut the flyer copy to headline, primary detail, image, call to action and identity. Show the client's original twelve-item list and what was removed.",
        },
        {
          step: "Set the canvas and margins",
          detail:
            "Create the A5 flyer, turn on rulers, and drag margin guides. Explain that margins are set before content on every job.",
        },
        {
          step: "Place the headline for distance",
          detail:
            "Set the headline at a size readable from two metres. Run the distance test on screen and then explain the printed version.",
        },
        {
          step: "Choose and treat the image",
          detail:
            "Use a real photograph of the subject, crop for composition, and apply a brightness and contrast adjustment. Explain why a real local image beats stock.",
        },
        {
          step: "Overlay for legibility",
          detail:
            "Place text on the photograph with a semi-transparent rectangle at 50% opacity behind it. Show the before and after in readability.",
        },
        {
          step: "Place the call to action",
          detail:
            "Put the phone number large and diallable at the end of the eye path. Explain that a handle alone loses customers who will not type it.",
        },
        {
          step: "Export and check through WhatsApp",
          detail:
            "Export the flyer as PNG and PDF Print, then send the PNG to yourself on WhatsApp and open it. Show what compression does and why you check before delivery.",
        },
        {
          step: "Build the first social post completely",
          detail:
            "Create the 1080×1350 launch post, establishing colour proportions, type sizes, image treatment and logo position for the whole campaign.",
        },
        {
          step: "Duplicate for the remaining four",
          detail:
            "Duplicate the page four times and change only the content. Show how quickly a consistent set appears and how little drifts.",
        },
        {
          step: "Create the story versions",
          detail:
            "Adapt to 1080×1920 keeping text in the middle third. Explain the platform interface areas that must stay clear.",
        },
        {
          step: "Review the set together",
          detail:
            "Display all five side by side and check logo position, colour proportions and type sizes match. Explain that this review is what makes it read as a campaign.",
        },
      ],
    },
    practice: {
      title: "One campaign, six pieces, one system",
      brief:
        "For a real or invented Nigerian business you produce a complete campaign: an A5 flyer, three feed posts, one story and one WhatsApp-status version — all from agreed copy and one brand system, with correct exports checked through WhatsApp.",
      steps: [
        "Write the copy for all six pieces in a plain document at the correct hierarchy.",
        "Cut the flyer copy to five elements and note what you removed.",
        "Set the A5 canvas with rulers and margin guides before placing content.",
        "Place the headline at a size readable from two metres and run the distance test.",
        "Choose a real, relevant image and apply a consistent brightness and contrast treatment.",
        "Add a semi-transparent overlay behind any text sitting on the photograph.",
        "Place a large diallable phone number at the end of the eye path.",
        "Export the flyer as PNG and as PDF Print with crop marks and bleed.",
        "Build the first 1080×1350 feed post completely, establishing the campaign system.",
        "Duplicate it for the second and third posts, changing only the content.",
        "Adapt to 1080×1920 for the story, keeping text in the middle third.",
        "Adapt to a WhatsApp-status version and send it to yourself to check compression.",
        "Display all six side by side and confirm logo position, colour proportions and type sizes match.",
      ],
      standard:
        "Six pieces that read unmistakably as one campaign, a flyer that passes the two-metre test, text legible over any image via overlay, correct exports for print and screen, and every file verified after WhatsApp compression.",
    },
    pitfalls: [
      {
        problem: "Your flyer has twelve elements and communicates none of them",
        fix: "Cut to five: headline, primary detail, image, call to action, identity. Every extra element steals attention from these. If the client insists on more, keep one strong headline and make the rest small and secondary.",
      },
      {
        problem: "Your social text is unreadable on a phone",
        fix: "Design much larger than feels right on a desktop, and check on a phone at real size. Also keep critical content inside a safe central area, because every platform crops differently.",
      },
      {
        problem: "Your story text is covered by the platform interface",
        fix: "Keep text in the middle third of a 1080×1920 canvas. The profile name sits at the top and the reply bar at the bottom, and covering either makes the post awkward to use.",
      },
      {
        problem: "You designed first and the copy changed afterwards",
        fix: "Agree the words in a plain document before designing. This one habit removes the most expensive revision round in design work.",
      },
      {
        problem: "You took an image from a Google search",
        fix: "Use Canva's licensed media, Unsplash or Pexels, or the client's own photographs, and record where each came from. Image copyright claims against small businesses are common and not worth the risk.",
      },
      {
        problem: "Your five posts look like five different designers made them",
        fix: "Design the first completely, then duplicate the page and change only the content. Keep logo position, margins and colour proportions identical, and review the set side by side before delivery.",
      },
    ],
    expertNotes: [
      "Run the two-metre test on every printed piece and the phone test on every social piece. These two checks take under a minute together and they catch nearly every legibility failure before a client sees it — which is the difference between being trusted and being corrected.",
      "Keep a swipe file of flyers and posts that worked, with a note on why. Over a year this becomes more valuable than any tutorial, because it holds the specific solutions for the specific market you sell into.",
      "Send every social deliverable to yourself on WhatsApp before delivering it. Compression softens thin type and subtle gradients, and knowing what the client will actually see lets you strengthen the design rather than defend it later.",
      "Offer campaigns rather than single posts. A five-piece set from one system costs you barely more than two singles, looks far more professional, and turns a one-off buyer into a monthly client — which is the only stable shape this business has.",
    ],
    vocabulary: [
      {
        term: "Safe area",
        meaning:
          "The central region where critical content must sit, because platforms crop edges differently.",
      },
      {
        term: "Two-metre test",
        meaning:
          "Viewing a printed piece from two metres to confirm the headline is readable. The primary flyer check.",
      },
      {
        term: "Overlay",
        meaning:
          "A semi-transparent shape placed behind text on a photograph so the words stay readable anywhere on the image.",
      },
      {
        term: "Campaign set",
        meaning:
          "Several pieces built from one system so they read as deliberate rather than as separate efforts.",
      },
      {
        term: "Call to action",
        meaning:
          "The exact next step for the viewer — a diallable phone number, a handle, a date to register by.",
      },
      {
        term: "WhatsApp compression",
        meaning:
          "The quality reduction WhatsApp applies to shared images. Always check a deliverable after it.",
      },
      {
        term: "Swipe file",
        meaning:
          "Your collected examples of work that worked, with notes on why. A working designer's most useful asset.",
      },
      {
        term: "Image licence",
        meaning:
          "The permission attached to a photograph. Check it before using anything prominent in paid client work.",
      },
    ],
    homework: [
      {
        task: "Run the two-metre test on ten local flyers",
        detail:
          "Photograph ten flyers near you and judge each from two metres. Note how many fail — and what specifically failed, headline or hierarchy.",
      },
      {
        task: "Write copy before designing",
        detail:
          "Take a real brief and write the copy in a plain document at the correct hierarchy. Cut it to five elements and record what you removed and why.",
      },
      {
        task: "Build a five-piece campaign",
        detail:
          "Launch, reminder, testimonial, offer, closing — all from one system. Review them side by side and write two sentences on what makes them cohere.",
      },
      {
        task: "Test WhatsApp compression",
        detail:
          "Export one design with thin type and one with bold type, send both to yourself on WhatsApp, and compare. Note what survives and adjust your defaults accordingly.",
      },
    ],
    rubric: [
      {
        criterion: "Flyer clarity",
        passing: "The main message is findable.",
        excellent:
          "Five elements only, headline readable from two metres, and a diallable call to action at the end of the eye path.",
      },
      {
        criterion: "Social adaptation",
        passing: "Produces posts at the right sizes.",
        excellent:
          "Critical content inside the safe area, text large enough for a phone, and story versions keeping the interface zones clear.",
      },
      {
        criterion: "Copy",
        passing: "The flyer says what it needs to.",
        excellent:
          "Specific rather than vague, agreed in a plain document before design, and cut to the one thing the piece is for.",
      },
      {
        criterion: "Image work",
        passing: "Uses a relevant image.",
        excellent:
          "Real and relevant, cropped for composition, treated consistently across the set, overlaid for legibility, and properly licensed.",
      },
      {
        criterion: "Campaign consistency",
        passing: "The pieces look related.",
        excellent:
          "Built by duplicating one system, with identical logo position, margins and colour proportions, reviewed side by side.",
      },
    ],
    faqs: [
      {
        q: "What size flyer should I design?",
        a: "A5 (148×210mm) is the Nigerian default for handouts — big enough to read, cheap to print. A4 for posters and noticeboards. Ask the printer what they recommend for the quantity, and always export PDF Print with crop marks and bleed rather than an image file.",
      },
      {
        q: "Do I need to design separately for Instagram and Facebook?",
        a: "Design once at 1080×1350 or 1080×1080 and it works on both. What differs is the caption, not the image. The exception is stories and status, which need the vertical 1080×1920 format with the interface zones kept clear.",
      },
      {
        q: "My client wants everything on one flyer. How do I handle that?",
        a: "Keep one dominant headline and demote the rest into a small, clearly secondary block. The hierarchy lets you include more without losing the three-second message. Then show them a version with five elements so they can see the difference and choose.",
      },
      {
        q: "Where do I get good images for Nigerian businesses?",
        a: "The client's own photographs first — they are more believable and they carry no licence risk. Then Unsplash and Pexels for free licensed stock, and Canva's included library. Avoid anything from a general image search, and keep a record of the source for each image you use.",
      },
      {
        q: "How do I price a campaign set?",
        a: "Price the set as one deliverable rather than per post, because building five from one system costs you little more than two. Present it as a package with a stated number of pieces and formats. Session seven covers pricing and packaging in detail.",
      },
    ],
  },

  "print-and-identity": {
    summary:
      "Print is where design mistakes become physical and expensive. This session covers the print production chain — bleed, crop marks, CMYK versus RGB, resolution, paper stocks and Nigerian print realities — then applies it to identity materials: business cards, letterheads, banners and signage.",
    objectives: [
      "Explain bleed, trim, crop marks and safe margins, and set them correctly",
      "Understand the difference between RGB and CMYK and what it does to your colours",
      "Calculate the resolution a print job needs and design to it",
      "Choose paper stock and finish appropriately and communicate with a Nigerian printer",
      "Design a business card, letterhead and banner to professional standard",
      "Prepare a print-ready file package and proof it before it goes to press",
    ],
    blocks: [
      {
        heading: "Bleed, trim and safe margins",
        body: [
          "Every print job is cut after printing, and no cutter is perfectly accurate — the blade can be a millimetre or two off in any direction. **Bleed** is the extra area you add beyond the finished edge so that any small cutting error reveals more of your design rather than a white strip. The standard is **3mm on every side**, so an A5 flyer at 148×210mm is designed at 154×216mm with the extra 3mm all round carrying your background colour or image. Any element that touches the edge — a full-bleed photo, a coloured background — must extend into the bleed.",
          "The other side of the same problem is the **safe margin**. Because the cut can move inward as well as outward, anything important must sit well inside the trim edge. Keep text and logos at least **5mm inside the trim** — many printers ask for 10mm on larger pieces. This is why the margin discipline from session one is not aesthetic but mechanical: a flyer with text 2mm from the edge will occasionally arrive with the text cut.",
          "**Crop marks** are the small lines in the corners showing the printer where to cut. Canva adds them when you tick the option in PDF Print export. Some Nigerian digital printers do not need them and will ask you to remove them; ask. The full set of terms — bleed, trim, safe area, crop marks — is the vocabulary that makes a printer take you seriously, and using it correctly is often the difference between a job that comes back right and one that comes back with white edges.",
        ],
      },
      {
        heading: "RGB versus CMYK, and why your colours shift",
        body: [
          "Screens make colour with **RGB** — red, green and blue light added together, which can produce very bright, saturated colours. Presses make colour with **CMYK** — cyan, magenta, yellow and black inks layered on paper, which cannot reach the same brightness. Every RGB design is converted to CMYK at some point in printing, and in that conversion some colours dull. Bright electric blues, vivid greens and hot pinks are the worst affected; they come back noticeably flatter than they looked on your screen.",
          "The professional response is not to fight it but to design for it. Avoid depending on very saturated colours for anything critical. Expect your printed piece to be slightly duller than the screen and tell the client before they see it. Where a specific brand colour must be exact — a corporate blue, for instance — the correct answer is a **spot colour** such as a Pantone, which is a mixed ink rather than a CMYK mixture; that is a specialist conversation with the printer and beyond Canva, but knowing it exists tells a client you understand print.",
          "Also understand that **your screen is not calibrated**. A cheap laptop screen and a phone screen show the same file differently, and neither matches a press. The reliable reference is a printed proof. For any job where colour matters commercially, ask the printer for a proof and approve it before the full run — a proof costs a little and a ruined five-hundred-piece run costs a great deal.",
        ],
      },
      {
        heading: "Resolution: the numbers that decide quality",
        body: [
          "Print needs roughly **300 DPI** — dots per inch — at the final printed size. A4 at 300 DPI is about 2480×3508 pixels. A screen image at 96 DPI looks fine online and prints soft. The rule that saves jobs is to think in **final pixel dimensions**: multiply the physical size in inches by 300. A business card at 85×55mm is about 3.35×2.17 inches, so it needs roughly 1004×650 pixels. A banner at 1×2 metres is a different problem entirely, discussed below.",
          "Canva's free tier exports at screen resolution, which is fine for A5 and A4 pieces viewed at arm's length but marginal for anything larger. Two workarounds: design at a **larger canvas size** so the exported pixels are sufficient — designing an A4 at A2 dimensions gives you four times the pixels — or use Canva Pro's size-multiplier export. Either way, check the exported file's actual pixel dimensions before sending, because 'it looked fine on screen' is the sentence that precedes every soft print job.",
          "**Large format** breaks the 300 DPI rule. A roll-up banner or a billboard is viewed from metres away, so printers typically ask for 100–150 DPI at full size, or even less for billboards. The right move is always the same: **ask the printer what resolution and file format they want** before you design. Printers answer this question freely, and asking it early is the single most professional habit in print work.",
        ],
      },
      {
        heading: "Paper, finish and the Nigerian print conversation",
        body: [
          "Paper choice changes how a design reads as much as the design does. **GSM** is the weight in grams per square metre: 130–170gsm is standard flyer paper, 250–300gsm is card stock for business cards and premium flyers, and 350gsm and above is heavy card. **Matte** finishes read as refined and are easier to read under bright light; **gloss** finishes make colours pop and suit photographs and food; **silk or satin** sits between them and is the most common premium choice. A business card on 130gsm feels disposable no matter how well it is designed, and clients notice the paper before they notice the layout.",
          "The Nigerian print conversation has specifics worth knowing. Most small jobs go to digital printers in places like Shomolu and Ojuelegba in Lagos, or local equivalents elsewhere, and they will usually accept a PDF. Ask three things every time: **what file format and resolution** they want, **what bleed** they require, and **what paper stock** they recommend for the quantity. Then ask for a **proof** — a single printed sample — before the full run, especially for anything with a specific brand colour. Get the quote in writing including paper, quantity, finish and turnaround, because prices vary widely and verbal quotes change.",
          "Build a relationship with one good printer rather than shopping each job. A printer who knows your files, your usual stocks and your standards will catch your mistakes before they print, which is worth far more than a small price difference. This relationship is a genuine business asset and it takes three or four jobs to build.",
        ],
      },
      {
        heading: "Identity materials: card, letterhead, banner",
        body: [
          "The **business card** is the smallest and most-examined piece you will design. At 85×55mm there is room for the name, the role, one or two contact routes and the logo — nothing more. The most common failure is cramming a full address, three phone numbers, four social handles and a list of services onto it, which makes it unreadable and unusable. Choose one primary contact route. Keep type at 7pt or above, use 300gsm card, and leave real margins — a card that feels airy reads as confident.",
          "The **letterhead** carries the same identity onto A4 with the logo and contact details in a header and often a thin footer. The design constraint is that the actual letter must have room: keep the header compact and leave generous space for content, and remember that whatever you design will be printed on repeatedly, so it must be quiet rather than decorative. Deliver it as an editable document the client can actually type into — a Word file or a Canva template link — not as a flat image, because a letterhead nobody can use is worthless.",
          "The **banner or roll-up** inverts the flyer logic entirely. It is read from several metres away, so it needs one headline in enormous type, the logo large, and almost nothing else. A roll-up also has its bottom third largely hidden behind the stand mechanism and by people standing in front of it, so keep all critical content in the top two-thirds. Designing a roll-up like an enlarged flyer is the standard amateur error and it produces a piece that communicates nothing from the distance it exists to be seen at.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor prepares a real print package for a client — business card, A5 flyer and a roll-up banner — setting bleed and margins, checking resolution, and showing the exact conversation to have with a Nigerian printer.",
      steps: [
        {
          step: "State the job and ask the printer's questions",
          detail:
            "Before designing, list the three questions: file format and resolution, bleed required, paper stock recommended. Explain that asking first is the professional habit.",
        },
        {
          step: "Set up the business card with bleed",
          detail:
            "Create a 91×61mm canvas for an 85×55mm card with 3mm bleed all round. Show where the trim line sits and mark the safe area inside it.",
        },
        {
          step: "Design the card with restraint",
          detail:
            "Place name, role, one contact route and logo. Explain what was left off and why a card that feels airy reads as confident.",
        },
        {
          step: "Check the card resolution",
          detail:
            "Calculate the pixel dimensions needed at 300 DPI and confirm the export meets them. Show what a soft export looks like at 100% zoom.",
        },
        {
          step: "Set up the A5 flyer with bleed",
          detail:
            "Create 154×216mm for a 148×210mm flyer, extend the background fully into the bleed, and keep all text at least 5mm inside trim.",
        },
        {
          step: "Discuss the colour shift",
          detail:
            "Show a saturated blue on screen and explain what CMYK conversion will do to it. Recommend avoiding dependence on very bright colours and telling the client beforehand.",
        },
        {
          step: "Choose paper and finish",
          detail:
            "Recommend 170gsm silk for the flyer and 300gsm matte for the card, explaining how each changes the perceived quality and readability.",
        },
        {
          step: "Set up the roll-up banner",
          detail:
            "Create the banner at the printer's requested size and reduced resolution, and mark the bottom third as unusable because of the stand and passers-by.",
        },
        {
          step: "Design the banner for distance",
          detail:
            "One enormous headline, a large logo, one detail. Compare with an enlarged-flyer version and show why it fails from five metres.",
        },
        {
          step: "Export all three correctly",
          detail:
            "PDF Print with crop marks and bleed for each, checking the pixel dimensions of the exports before sending.",
        },
        {
          step: "Request and read a proof",
          detail:
            "Show what to ask for, what to check on the proof — colour, trim, text position — and why approving a proof beats approving a screen image.",
        },
        {
          step: "Assemble the client package",
          detail:
            "Bundle the three PDFs with a note stating sizes, stocks, quantities and what was checked. Explain that this note is what prevents a print dispute.",
        },
      ],
    },
    practice: {
      title: "A print-ready identity package",
      brief:
        "You produce a print-ready package for one brand: a business card, an A4 letterhead, an A5 flyer and a roll-up banner — all with correct bleed and safe margins, correct resolution, and a written note to the printer stating specs and questions.",
      steps: [
        "Write the three questions you will ask the printer before designing anything.",
        "Set up the business card canvas at 91×61mm for an 85×55mm card with 3mm bleed.",
        "Mark the trim line and a 5mm safe area, and keep all content inside it.",
        "Design the card with a name, role, one contact route and the logo only.",
        "Confirm the card export meets roughly 300 DPI at final size.",
        "Set up the A5 flyer at 154×216mm, extending the background fully into the bleed.",
        "Export the flyer as PDF Print with crop marks and bleed ticked.",
        "Build the A4 letterhead with a compact header, generous content space and a thin footer.",
        "Deliver the letterhead as an editable file the client can type into, not a flat image.",
        "Set up the roll-up at the printer's requested size and reduced resolution.",
        "Design the roll-up for distance: one headline, a large logo, one detail, nothing in the bottom third.",
        "Check every export's pixel dimensions before packaging.",
        "Write the note to the printer: sizes, bleed, stocks, quantities, resolution, and your three questions.",
      ],
      standard:
        "Four pieces each with 3mm bleed and content inside a 5mm safe area, exports at sufficient resolution verified by pixel count, a letterhead delivered editable, a banner designed for viewing distance rather than enlarged from a flyer, and a written printer's note.",
    },
    pitfalls: [
      {
        problem: "The printed piece has white edges",
        fix: "No bleed, or the background did not extend into it. Design 3mm larger on every side, extend every edge-touching element into the bleed, and tick crop marks and bleed on export.",
      },
      {
        problem: "Text near the edge was cut off",
        fix: "Cutting is never perfectly accurate. Keep all text and logos at least 5mm inside the trim line, and set margin guides before placing content rather than judging by eye.",
      },
      {
        problem: "The printed colours look duller than your screen",
        fix: "That is CMYK conversion and it is normal. Avoid depending on very saturated colours, tell the client in advance, and approve a printed proof rather than a screen image.",
      },
      {
        problem: "Your large banner printed soft",
        fix: "You exported at screen resolution. Ask the printer what DPI they want for the format, then design at a larger canvas or use a size-multiplier export, and check the export's pixel dimensions before sending.",
      },
      {
        problem: "Your business card is unreadable",
        fix: "You put too much on it. Keep name, role, one contact route and logo, at 7pt or above, on 300gsm card with real margins. A card nobody can read is worse than no card.",
      },
      {
        problem: "You delivered the letterhead as an image",
        fix: "The client cannot type into it. Deliver an editable Word file or a Canva template link. A letterhead nobody can use has no value regardless of how it looks.",
      },
      {
        problem: "You designed the roll-up like a big flyer",
        fix: "It is read from metres away. One enormous headline, a large logo, one detail, and nothing in the bottom third where the stand and people block it.",
      },
    ],
    expertNotes: [
      "Ask the printer their specification before every job, and write the answer down. Format, resolution, bleed, stock and finish vary between printers, and a two-minute question prevents a wasted run. Printers respect the designer who asks.",
      "Always order one proof before a full run when colour matters. It costs a fraction of the job and it is the only real check available, because no screen — calibrated or not — shows what ink on that paper will look like.",
      "Design with a little more restraint than feels necessary for print. Ink spreads slightly, fine hairlines fill in, and small type on matte stock reads softer than on screen. Slightly bolder type and slightly heavier lines survive the press better.",
      "Keep a spec sheet for every client: their usual sizes, stocks, finishes, printer and file format. After three jobs you can quote turnaround and price instantly, and the client experiences you as someone who already knows their business.",
    ],
    vocabulary: [
      {
        term: "Bleed",
        meaning:
          "Extra area beyond the trim edge, standard 3mm, so a small cutting error shows design rather than white.",
      },
      {
        term: "Trim",
        meaning: "The final cut size of the piece. Everything important sits inside it.",
      },
      {
        term: "Safe margin",
        meaning: "The zone at least 5mm inside trim where all text and logos must sit.",
      },
      {
        term: "Crop marks",
        meaning:
          "Corner lines showing the printer where to cut. Added on Canva's PDF Print export.",
      },
      {
        term: "CMYK",
        meaning:
          "The four printing inks. Cannot reach the brightness of screen RGB, so saturated colours dull in conversion.",
      },
      {
        term: "GSM",
        meaning:
          "Paper weight in grams per square metre. 130–170 for flyers, 300 for cards, higher for premium.",
      },
      {
        term: "DPI",
        meaning:
          "Dots per inch. Print needs about 300 at final size; large format needs less because it is viewed from further away.",
      },
      {
        term: "Proof",
        meaning:
          "A single printed sample approved before the full run. The only reliable colour check.",
      },
    ],
    homework: [
      {
        task: "Visit a printer with three questions",
        detail:
          "Ask a local printer what file format, resolution, bleed and stock they prefer for flyers, cards and banners. Write the answers down. This conversation is worth more than any tutorial.",
      },
      {
        task: "Set up bleed templates",
        detail:
          "Build reusable canvases at A5, A4 and 85×55mm, each with 3mm bleed, trim guides and 5mm safe-area guides marked. You will use these on every print job.",
      },
      {
        task: "Order one proof",
        detail:
          "Print one of your designs and compare it with your screen. Note exactly which colours shifted and by how much. That memory will guide every future colour decision.",
      },
      {
        task: "Design a roll-up for distance",
        detail:
          "Design a 800×2000mm roll-up, then view it scaled so it appears the size it would from five metres. Cut everything that is not readable at that distance.",
      },
    ],
    rubric: [
      {
        criterion: "Print mechanics",
        passing: "Uses bleed on at least one piece.",
        excellent:
          "3mm bleed on every piece, all content inside a 5mm safe area, crop marks ticked, and the terms used correctly with the printer.",
      },
      {
        criterion: "Colour understanding",
        passing: "Knows print differs from screen.",
        excellent:
          "Designs avoiding dependence on saturated colours, explains the CMYK shift to the client in advance, and approves a printed proof.",
      },
      {
        criterion: "Resolution",
        passing: "Exports a usable file.",
        excellent:
          "Calculates required pixel dimensions for each format, verifies exports, and adjusts canvas size or export multiplier to meet them.",
      },
      {
        criterion: "Piece quality",
        passing: "The pieces look reasonable.",
        excellent:
          "A restrained card, a usable editable letterhead, and a banner designed for viewing distance with nothing in the bottom third.",
      },
      {
        criterion: "Printer communication",
        passing: "Sends files to a printer.",
        excellent:
          "Asks the specification first, writes a note stating sizes, stocks, quantities and checks, and requests a proof before the run.",
      },
    ],
    faqs: [
      {
        q: "How much bleed do I need?",
        a: "3mm on every side is the standard and what most Nigerian digital printers expect, but always confirm — some ask for 5mm on large format. Design the canvas that much larger and extend every edge-touching element into it.",
      },
      {
        q: "Can Canva do CMYK?",
        a: "Canva works in RGB and the printer converts. That is normal and workable, but it means you cannot control the conversion, so avoid relying on very saturated colours and approve a printed proof when a specific colour matters commercially.",
      },
      {
        q: "What GSM should I recommend for flyers?",
        a: "130–170gsm for handout flyers in quantity, 250–300gsm for a premium piece a client wants to feel substantial. For business cards, 300gsm minimum — a lighter card feels disposable however good the design is.",
      },
      {
        q: "How do I design a banner that big in Canva?",
        a: "Design at the size the printer specifies, and ask what resolution they need — usually far below 300 DPI because banners are viewed from metres away. Keep one enormous headline, a large logo and nothing in the bottom third, then check the export's pixel dimensions before sending.",
      },
      {
        q: "My printer rejected my file. What now?",
        a: "Ask specifically what failed — format, resolution, bleed or fonts. The most common causes are a missing bleed, an image file sent instead of a PDF, or insufficient resolution. Fixing it is quick once you know which, and asking the question makes you look competent rather than inexperienced.",
      },
    ],
  },
};
