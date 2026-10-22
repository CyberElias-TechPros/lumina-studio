import type { SessionLecture } from "../types";

/**
 * Photography — ₦15,000 · 2 weeks · 4 sessions.
 * Phone-first, aimed at the paid work Nigerian photographers actually get:
 * products, food, events, portraits and church services.
 *
 * Shape differs from the technical courses on purpose: the demonstration is a
 * narrated shoot rather than a UI walkthrough, and the practice is an
 * assignment with a frame count rather than a build task.
 */
export const photographyLessons: Record<string, SessionLecture> = {
  "composition-framing": {
    summary:
      "Composition is not a set of rules to obey but a series of decisions about what belongs in the frame. This session covers the rule of thirds, leading lines, negative space, perspective and the single habit that improves photographs faster than any other: cleaning the frame.",
    objectives: [
      "Decide what belongs in a frame rather than including everything",
      "Place a subject using the rule of thirds and know when to break it",
      "Use leading lines and foreground to create depth",
      "Use negative space to simplify an image and leave room for text",
      "Choose a viewpoint deliberately instead of shooting from standing height",
      "Check the edges of a frame for intrusions before pressing the shutter",
    ],
    blocks: [
      {
        heading: "Composition is deciding what to leave out",
        body: [
          "A camera records everything in front of it without judgement, which is exactly why most untrained photographs are weak. The lens does not know that the plastic chair at the edge matters less than the face, or that the pole behind someone's head is ruining the picture. **Composition is you making the decisions the camera cannot make** — chiefly, what to exclude.",
          "This reframing matters because beginners usually approach composition as a set of rules to apply to a scene they have already accepted. The stronger habit is the reverse: **walk around the subject until the frame is clean**, then apply technique. Thirty seconds of moving your feet changes a photograph more than any setting you can adjust.",
          "And it is the cheapest upgrade available, because it costs nothing. You do not need a better phone, a lens or a light. Every improvement in this session is available to you today with the camera already in your pocket, which is the entire premise of this course.",
        ],
      },
      {
        heading: "The rule of thirds — and its limits",
        body: [
          "Turn on the **grid** in your camera app and you get nine boxes. The rule says place your subject on one of the four points where the lines cross, rather than dead centre, and put the horizon on the upper or lower line rather than slicing the frame in half. It works because an off-centre subject gives the eye somewhere to travel, and a level horizon stops an image feeling accidentally tilted.",
          "The reason it is taught first is that it fixes the two most common amateur problems at once: a subject plonked in the middle with no reason, and a crooked horizon. Fix those two and most photographs improve noticeably. For product and food work it is especially useful, because the negative space beside an off-centre subject is exactly where a client will want to put a price or a caption.",
          "But it is a starting point, not a law. **A centred subject has real power** when the subject is symmetrical, when it is looking straight at the camera, or when the symmetry is the point — a face in a portrait, a church altar, a building front. The rule exists so that breaking it is a choice. The mistake is never centring; the mistake is centring without deciding to.",
        ],
      },
      {
        heading: "Leading lines and depth",
        body: [
          "A photograph is flat, so **depth has to be created**. The most reliable tool is lines: anything that runs from the edge of the frame toward your subject pulls the viewer's eye inward. Roads, market aisles, railings, table edges, power cables, rows of seats, a line of shadows across a wall, the curve of a staircase. Lagos is full of them, and most people shoot straight down them without noticing.",
          "Lines work best when they start near a corner and converge on the subject, because the eye follows them to exactly where you want attention. If a line runs toward something unimportant — or worse, out of the frame past your subject — it drags attention away with it. Check where every line in the frame terminates before you shoot.",
          "The other half of depth is **layers**: something close, something in the middle, something far. A foreground element — a leaf, a doorway, a shoulder, a blurred bottle in front — separates your subject from the background and makes a flat phone image feel like a place. It also signals intent, which is the difference between a snapshot and a photograph.",
        ],
      },
      {
        heading: "Negative space and the discipline of one subject",
        body: [
          "The single most effective habit for a beginner is asking, before every shot: **what is this photograph about?** Not what is in it — what it is about. If the answer needs the word 'and', you are usually making two photographs and should choose one.",
          "**Negative space** — the empty area around a subject — is what makes the subject readable. A product on a plain wall, a person against clear sky, a plate on an uncluttered table. Beginners fear emptiness and fill it, which is precisely backwards: the empty area is what tells the eye what matters. It also has commercial value, because clients constantly need room for text, and a busy frame gives them nowhere to put it.",
          "Practically this means getting closer, or finding a plainer background, or shooting upward so the background is sky or ceiling instead of a street. On a phone with a wide lens, **stepping closer and shooting slightly upward** solves more clutter problems than any other move, and it costs nothing.",
        ],
      },
      {
        heading: "Viewpoint, and cleaning the frame",
        body: [
          "Almost everyone photographs from standing height, which produces images that look like standing height. **Your viewpoint is a decision**: crouch to a child's or a seated person's eye level and the portrait immediately becomes more intimate; shoot down at food on a table and it reads as a flat pattern; shoot up at a building and it gains presence. Move around the subject — left, right, higher, lower — and the photograph changes each time.",
          "A useful default for people and animals is **level with their eyes**. Shooting down at someone from standing height is subtly diminishing and distorts proportions, which is why so many photographs of children and seated people look slightly wrong without anyone being able to say why.",
          "Then the habit that catches more ruined photographs than any other: **check the edges before you press**. Walk the frame border — top, bottom, left, right — and look for intrusions: a bin, a stranger's arm, a bright sign, a pole appearing to grow from someone's head, a distorted face half in frame at the edge. Faces and bright objects at the edges pull the eye hard. Take one step left or right and they are gone, but only if you looked.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor photographs one subject — a bowl of food on a table beside a window — making fifteen frames, each changing exactly one thing and nothing else. The frames are shown side by side so the effect of each decision is visible rather than described.",
      steps: [
        {
          step: "Frame 1: shoot it from standing height, first attempt",
          detail:
            "Show the result and ask the class what is wrong with it before saying anything. Let them find the clutter, the crooked horizon and the meaningless background.",
        },
        {
          step: "Turn on the camera grid",
          detail:
            "Show the nine boxes. Explain that the grid is the only setting that improves composition and it is free.",
        },
        {
          step: "Frame 2: place the bowl on a grid intersection",
          detail:
            "Compare with frame 1. Explain that off-centring gives the eye somewhere to travel and leaves space a client could put a caption in.",
        },
        {
          step: "Frame 3: straighten the horizon",
          detail:
            "Show how much the tilt was costing. Explain that a level horizon is the difference between deliberate and accidental.",
        },
        {
          step: "Frame 4: step in close and fill the frame",
          detail:
            "Explain that most beginners stand too far back, and that moving your feet beats zooming.",
        },
        {
          step: "Frame 5: move back and include a foreground object",
          detail:
            "Place a glass or a cloth edge low in frame. Explain that layers create depth in a flat image.",
        },
        {
          step: "Frame 6: find and use a leading line",
          detail:
            "Shoot along the table edge so it runs from a corner to the bowl. Explain that lines pull the eye to whatever they terminate on.",
        },
        {
          step: "Frame 7: check where the line goes",
          detail:
            "Deliberately shoot a version where the line runs past the subject and out of frame. Explain that a line pointing away steals attention.",
        },
        {
          step: "Frame 8: centre the subject deliberately",
          detail:
            "Explain that centring is powerful when the subject is symmetrical or facing the camera — the rule exists so breaking it is a choice.",
        },
        {
          step: "Frame 9: shoot from directly above",
          detail:
            "Explain that a top-down view turns food into pattern, which suits some dishes and flattens others.",
        },
        {
          step: "Frame 10: shoot from bowl height",
          detail:
            "Crouch to the subject's level. Explain that viewpoint is a decision, and that standing height is the least considered one.",
        },
        {
          step: "Frame 11: add negative space",
          detail:
            "Reframe with plain wall behind and empty space to one side. Explain that emptiness is what makes the subject readable.",
        },
        {
          step: "Frame 12: deliberately clutter the frame",
          detail:
            "Push cups, a phone and a wrapper into shot. Explain that this is what an undecided frame actually looks like.",
        },
        {
          step: "Frame 13: remove everything except the subject",
          detail:
            "Clear the table completely. Explain that asking what the photograph is about is the habit that fixes most frames.",
        },
        {
          step: "Frame 14: walk the edges of the frame",
          detail:
            "Narrate checking top, bottom, left and right. Find an intrusion, take one step sideways, and show it gone.",
        },
        {
          step: "Frame 15: choose the keeper and say why",
          detail:
            "Put all fifteen on screen together. Explain that the deciding skill was not the camera but the decisions.",
        },
      ],
    },
    practice: {
      title: "Forty frames, six keepers",
      brief:
        "You shoot forty frames of one subject in one location, changing your viewpoint and framing deliberately each time, then select six and explain the compositional decision behind each. The selection is the exercise — the forty frames exist to give you choices.",
      steps: [
        "Turn on the grid in your camera app before you start.",
        "Choose one subject you can spend an hour with — food, a product, a person, a doorway.",
        "Make your first ten frames without moving, changing only how you frame.",
        "Place the subject on a grid intersection in at least four frames.",
        "Straighten the horizon deliberately in every frame that has one.",
        "Make five frames from directly above the subject.",
        "Make five frames from the subject's own height, crouching or lying down if needed.",
        "Find one leading line and shoot along it so it terminates on your subject.",
        "Make one frame where the line runs away from the subject, and note the difference.",
        "Make three frames with deliberate negative space on one side.",
        "Make one deliberately centred frame and decide whether the symmetry earns it.",
        "Before every single shutter, walk the four edges of the frame looking for intrusions.",
        "Move at least five metres in each direction over the hour and reshoot the subject.",
        "Review all forty frames and mark six keepers.",
        "Write one sentence per keeper naming the compositional decision that made it work.",
        "Write one sentence about the best frame you rejected and why you rejected it.",
      ],
      standard:
        "Forty frames of one subject shot with the grid on and the viewpoint changed deliberately throughout, including at least four on grid intersections, five from directly above, five from subject height, one along a leading line terminating on the subject, one with a line running away for comparison, three with deliberate negative space and one deliberate centred frame; every frame checked at all four edges before the shutter; six keepers selected with a sentence each naming the compositional decision that made it work, plus one sentence explaining the strongest rejected frame.",
    },
    pitfalls: [
      {
        problem: "You include everything and decide nothing",
        fix: "Ask what the photograph is about before shooting. If the answer needs the word and, you are making two photographs — choose one and remove the rest.",
      },
      {
        problem: "Every photograph is shot from standing height",
        fix: "Change your viewpoint deliberately. Crouch to the subject's eye level, shoot from above, or get low. Standing height is the least considered position and it shows.",
      },
      {
        problem: "You never check the edges of the frame",
        fix: "Walk the four borders before every shutter. A bin, a stranger's arm or a pole behind a head costs the photograph, and one step sideways removes it.",
      },
      {
        problem: "Your horizons are slightly tilted",
        fix: "Use the grid and align to it. A small tilt reads as accidental, and a level horizon is one of the cheapest signals of intent available.",
      },
      {
        problem: "You centre everything because the rule of thirds feels difficult",
        fix: "Off-centre by default, centre when the subject is symmetrical or facing you. The rule exists so that centring is a decision rather than a habit.",
      },
      {
        problem: "You stand too far back and crop later",
        fix: "Move closer. Cropping a phone image throws away resolution and quality, while stepping forward costs nothing and improves both.",
      },
      {
        problem: "Your frames are busy with no room for anything",
        fix: "Leave negative space, especially for product and food work. Clients need somewhere to put a price or a caption, and a cluttered frame gives them nowhere.",
      },
      {
        problem: "A line in the frame runs past your subject",
        fix: "Check where every line terminates. Lines drag the eye to whatever they point at, so a line exiting the frame takes attention out with it.",
      },
    ],
    expertNotes: [
      "Move before you change any setting. Thirty seconds of walking around a subject improves more photographs than any technique, because a clean frame is a precondition for every other decision to matter.",
      "Shoot more frames than you need and select hard. Professionals routinely keep one or two images in a hundred; the skill is in the choosing, and forty frames exist to give you something to choose from.",
      "Crouch to eye level for people and animals. Shooting down from standing height subtly diminishes the subject and distorts proportions, which is why so many photographs of children and seated people feel wrong without anyone being able to say why.",
      "Leave deliberate negative space in commercial work. Product and food clients almost always need room for a price or a caption, and a frame with space in it sells far more easily than a crowded one.",
    ],
    vocabulary: [
      {
        term: "Frame",
        meaning:
          "The rectangle the camera records. Composition is deciding what enters it and what is kept out.",
      },
      {
        term: "Rule of thirds",
        meaning:
          "Placing a subject on the intersections of a nine-box grid. Fixes a meaningless centre and a tilted horizon at once.",
      },
      {
        term: "Leading line",
        meaning:
          "A line running from the frame edge toward the subject, pulling the eye inward. Check where it terminates.",
      },
      {
        term: "Negative space",
        meaning:
          "The empty area around a subject. Makes the subject readable and gives clients room for text.",
      },
      {
        term: "Foreground",
        meaning:
          "Something close to the camera. Creates layers, which is how depth is made in a flat image.",
      },
      {
        term: "Viewpoint",
        meaning:
          "Where the camera is, including height. A decision, not a default — crouch, get low, or move around.",
      },
      {
        term: "Eye level",
        meaning:
          "Camera at the subject's own eye height. The default for people and animals, and the one beginners skip.",
      },
      {
        term: "Frame intrusion",
        meaning:
          "Something unwanted at the edge — a bin, an arm, a pole behind a head. Found by walking the borders before the shutter.",
      },
    ],
    homework: [
      {
        task: "Shoot one subject from ten viewpoints",
        detail:
          "Same subject, ten positions: standing, crouching, lying down, directly above, from below, and five around it. Compare them and note which viewpoint suited the subject and why.",
      },
      {
        task: "Make twenty frames with nothing at the edges",
        detail:
          "Check all four borders before every shutter and take a step if you find anything. Report how many frames you would have ruined without looking.",
      },
      {
        task: "Deliberately break the rule of thirds twice",
        detail:
          "Centre a symmetrical subject and place one on a grid point. Write which is stronger and what made the difference.",
      },
      {
        task: "Find five leading lines near where you live",
        detail:
          "Photograph each so the line terminates on a subject. Roads, aisles, railings, shadows and wires all count.",
      },
    ],
    rubric: [
      {
        criterion: "Framing decisions",
        passing: "Subject is in frame and recognisable.",
        excellent:
          "The subject is clearly the point of every image, placement is deliberate, and each keeper can be justified by a named compositional decision.",
      },
      {
        criterion: "Viewpoint",
        passing: "Shot from more than one position.",
        excellent:
          "Frames made from standing, crouching, low and overhead positions, with the chosen height suiting the subject and eye level used for people.",
      },
      {
        criterion: "Depth and lines",
        passing: "Uses the grid.",
        excellent:
          "Leading lines terminate on the subject, foreground layers create depth, and at least one frame shows a line running away for deliberate comparison.",
      },
      {
        criterion: "Clean frames",
        passing: "Few distractions.",
        excellent:
          "No intrusions at any edge in any keeper, horizons level, and background clutter either removed or used deliberately.",
      },
      {
        criterion: "Selection",
        passing: "Submits six images.",
        excellent:
          "Six strong keepers chosen from forty with a sentence each on why it works, plus a reasoned explanation of the strongest rejected frame.",
      },
    ],
    faqs: [
      {
        q: "Do I need a proper camera to take good photographs?",
        a: "No. Everything in this course works on a phone, and composition — which is most of what makes an image good — is entirely free. A better camera records a badly composed photograph in higher resolution, which is not an improvement anyone notices.",
      },
      {
        q: "Is the rule of thirds always right?",
        a: "No, and treating it as a law makes images predictable. It is a starting point that fixes a meaningless centre and a tilted horizon. Centre a subject deliberately when it is symmetrical or facing the camera — the rule exists so breaking it is a choice.",
      },
      {
        q: "How many photographs should I take?",
        a: "Far more than you keep. Professionals routinely keep one or two in a hundred. Shoot forty and select six; the value is in having choices, and the selecting is the skill being practised.",
      },
      {
        q: "My photographs always look cluttered. What am I doing wrong?",
        a: "You are deciding what to include rather than what to exclude. Get closer, find a plainer background, or shoot slightly upward so the background is sky or ceiling. Then walk the four edges before every shutter and remove what you find.",
      },
      {
        q: "Should I zoom in?",
        a: "Move closer instead. Pinch zooming on most phones crops the image and throws away resolution. If your phone has a second or third lens, switch to that lens rather than pinching — it is a real optical change, not a crop.",
      },
    ],
  },

  light: {
    summary:
      "Photography is literally writing with light, and light is the variable that changes a photograph most. This session covers direction and quality, working with window light indoors, golden hour, building reflectors and diffusers from materials you already have, and surviving the mixed lighting of a church service.",
    objectives: [
      "Identify the direction of light and what it does to a subject",
      "Tell hard light from soft light and choose deliberately",
      "Set up a usable indoor studio with a window and a white board",
      "Shoot golden hour and understand why it flatters",
      "Build a reflector and a diffuser from household materials",
      "Handle mixed artificial light without wrecking the colour",
    ],
    blocks: [
      {
        heading: "Light is the actual subject",
        body: [
          "The word photography means writing with light, and that is not a flourish — it is a description of what the camera records. The camera does not see a person or a plate of food; it sees the pattern of light bouncing off them. Two photographs of the same subject in different light are not the same photograph with different brightness, they are **different images**, and the difference is larger than any change of camera or lens could produce.",
          "This is the most useful idea in the course, because it tells you where to spend attention. Most people photograph a subject and hope the light cooperates. The better habit is to **look at the light first and then find where the subject works in it** — moving a person two metres toward a window, or waiting ten minutes, or shooting the product on a different table.",
          "And it is free. Light is the one variable in photography that costs nothing to improve, which matters in a context where gear is expensive and the sun arrives daily at roughly the same time whether you are ready or not.",
        ],
      },
      {
        heading: "Direction: front, side and back",
        body: [
          "**Front light** — the source behind you, hitting the subject's face — is what a phone flash and a built-in flash produce. It is easy and it is flat: because the light comes from near the lens, shadows fall directly behind the subject and are invisible, so no shape is revealed. Faces look smooth and dimensionless, which is sometimes wanted and usually dull.",
          "**Side light** is where photographs come alive. Light from one side makes one half of the subject brighter than the other, and that difference is what the eye reads as shape and texture. It is why skin looks real, why food looks appetising, why fabric shows weave. Almost every flattering portrait and every good product photograph uses light from an angle rather than straight on.",
          "**Backlight** — the source behind the subject — creates silhouettes, glowing edges around hair, and mood. It is also the reason so many holiday photographs are dark: the camera sees the bright background, exposes for it, and turns the subject into a shadow. Backlight is powerful when you choose it and ruinous when you do not notice it.",
        ],
      },
      {
        heading: "Quality: hard light and soft light",
        body: [
          "This is the distinction that most improves beginner work. **Hard light** comes from a small source and produces sharp-edged shadows with an abrupt jump from light to dark — the midday sun, a bare bulb, a phone flash. **Soft light** comes from a large source and produces gentle transitions — an overcast sky, a north-facing window, a white wall bounced into, a diffusing curtain.",
          "The counter-intuitive part is that **size is relative to the subject**. The sun is enormous but very far away, so it behaves as a tiny point source and gives hard light. A cloudy sky is a soft source because the whole sky is glowing. Hold a white sheet between the sun and your subject and you have turned hard light into soft light by making the source bigger.",
          "Soft light is forgiving, which is why it suits beginners and portraits: it wraps around a face, hides blemishes, and gives you a wide margin of error. Hard light is dramatic and unforgiving — it flatters texture and architecture and is brutal on skin at midday. Neither is better; **knowing which one you have is the skill**, because it determines whether to shoot or to modify.",
        ],
      },
      {
        heading: "The window studio",
        body: [
          "A large window is the best free light source most people will ever own, and it is the standard setup for product and food photography. The method is short. Place the subject **beside the window, not in front of it**, roughly forty-five degrees to the glass so the light falls across it at an angle rather than flat. **Turn off every other light in the room** — this matters more than people expect, because a ceiling bulb adds a second light of a different colour and makes the whole image muddy.",
          "Then fix the shadow side with a **reflector**: a piece of white foam board, a sheet of cardboard wrapped in kitchen foil, a white bedsheet hung behind, even a large white plate. Hold or prop it on the opposite side from the window and it bounces light back into the shadows. Moving it closer brightens the shadows; angling it away deepens them. **You now have controllable two-light photography for the cost of a piece of board.**",
          "A curtain or a white bedsheet over the window works the other way: it **diffuses**, spreading the light and softening the shadows further. Between a reflector and a diffuser you can shape window light into almost anything, which is why professional food photographers work next to windows rather than under studio strobes.",
        ],
      },
      {
        heading: "Golden hour, harmattan and artificial light",
        body: [
          "**Golden hour** — the hour after sunrise and before sunset, in Lagos roughly 6:20 to 6:50 in the morning and 6:20 to 6:50 in the evening — is flattering for a specific reason, not a mystical one. The sun is low, so the light arrives at an angle and creates shape; it travels through more atmosphere, so it warms; and it is weaker, so it is gentler than midday sun. Shoot portraits then and almost everything improves without you doing anything.",
          "**Harmattan**, from around December to February, changes the rules. The dust haze scatters light, which flattens contrast and drains colour, and it can turn the sun into a diffuse white disc. That soft light is genuinely good for portraits, but colours come out dull and slightly grey, so expect to add warmth and saturation when editing rather than fighting it in camera.",
          "Then the hard case: **mixed artificial light**. A church service is the classic example — daylight through windows, warm tungsten bulbs, cool white LED panels, possibly a projector, all at once. No white balance setting can be correct for all of them, so pick a strategy: **expose for the faces** and accept the mixed colours, or move so one source dominates, or shoot in raw if your phone allows and fix the balance afterwards. The professional move is deciding which colour you are willing to live with before you shoot, rather than discovering you cannot fix it later.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor photographs the same subject under six different light conditions with the camera settings and composition held constant, so the class can see that the light — not the camera — produced every difference. A reflector and a diffuser are built on the spot from foam board and a bedsheet.",
      steps: [
        {
          step: "Set the subject up once and do not move it",
          detail:
            "Fix composition and exposure at the start. Explain that holding everything else constant is the only way to see what light alone does.",
        },
        {
          step: "Shoot 1: midday sun, direct",
          detail:
            "Show the hard shadows and blown highlights. Explain that the sun is far away, so it behaves as a small source and gives hard light.",
        },
        {
          step: "Shoot 2: hang a bedsheet between the sun and the subject",
          detail:
            "Show the shadows soften immediately. Explain that diffusion means making the source bigger, and that this cost nothing.",
        },
        {
          step: "Shoot 3: move the subject into open shade",
          detail:
            "Place it under a roof overhang out of direct sun. Explain that shade is soft light from a large sky, and why it flatters faces.",
        },
        {
          step: "Move indoors to a window and turn the room lights off",
          detail:
            "Kill the ceiling bulb before shooting. Explain that a second light of a different colour makes the whole image muddy and is the most common indoor mistake.",
        },
        {
          step: "Shoot 4: subject at forty-five degrees to the window",
          detail:
            "Compare with placing it directly facing the glass. Explain that angled light reveals shape while frontal light flattens it.",
        },
        {
          step: "Build a reflector from foam board",
          detail:
            "Prop white board on the shadow side and show the shadows lift. Explain that this is controllable two-light photography for the price of a board.",
        },
        {
          step: "Vary the reflector distance",
          detail:
            "Move it close, then far, and compare. Explain that distance controls how much shadow remains, which is where mood comes from.",
        },
        {
          step: "Wrap cardboard in foil and use the dull side",
          detail:
            "Show the brighter, more directional bounce. Explain that the shiny side is harsher and the dull side gentler, and either works.",
        },
        {
          step: "Shoot 5: subject directly backlit by the window",
          detail:
            "Show the silhouette. Explain that the camera exposes for the bright background and the subject goes dark unless you choose this deliberately.",
        },
        {
          step: "Shoot 6: golden hour, outdoors",
          detail:
            "Go out near sunset and shoot the same subject. Explain that low angle, warmth and gentleness are physical effects, not a mood.",
        },
        {
          step: "Compare midday and golden hour side by side",
          detail:
            "Put the two frames up together. Explain that nothing changed except the light, which is the whole argument of the session.",
        },
        {
          step: "Show a mixed-light church interior",
          detail:
            "Point out daylight, tungsten and LED in one frame. Explain that no white balance is correct for all three, so you choose which colour to live with.",
        },
        {
          step: "Expose for the faces in that frame",
          detail:
            "Tap a face to set exposure and accept the mixed cast. Explain that a correct face with odd colours is usable, while a correct background with a dark face is not.",
        },
        {
          step: "Review all six side by side",
          detail:
            "Ask the class which they would keep. Explain that the differences are larger than any camera upgrade would produce.",
        },
      ],
    },
    practice: {
      title: "One subject, six lights",
      brief:
        "You photograph one subject under six different lighting conditions with your composition held constant, build a reflector and a diffuser from household materials, and present the six frames with a note on what the light did in each.",
      steps: [
        "Choose one subject you can move or return to easily — food, a product, a person, a plant.",
        "Decide your composition and keep it identical for all six frames.",
        "Build a reflector from foam board, or cardboard wrapped in foil with the dull side out.",
        "Build a diffuser from a white bedsheet, a curtain or a white plastic bag.",
        "Shoot the subject in direct midday sun and note the hard shadows.",
        "Shoot it again with the diffuser between the sun and the subject.",
        "Shoot it in open shade under an overhang, out of direct sun.",
        "Move indoors, turn off every other light in the room, and shoot beside a window at forty-five degrees.",
        "Add the reflector on the shadow side and shoot again.",
        "Move the reflector close, then far, and compare the shadow depth.",
        "Shoot the subject backlit by the window and observe the silhouette.",
        "Shoot it at golden hour outdoors and compare with the midday frame.",
        "Find one interior with mixed light — a church, a shop with both daylight and bulbs — and expose for a face.",
        "Write one sentence per frame describing what the light did to the subject.",
        "Choose your strongest frame and say which property of the light made it work.",
        "Note which light you would choose for a portrait, a product and a plate of food.",
      ],
      standard:
        "Six frames of one subject under six lighting conditions with composition held constant — direct midday sun, the same sun through a self-built diffuser, open shade, window light at forty-five degrees with the room lights off, window light plus a self-built reflector, and golden hour — with the reflector distance varied and compared; a mixed-light interior shot with exposure set for a face; one sentence per frame describing what the light did; a named strongest frame with the property of the light identified; and a reasoned choice of light for a portrait, a product and a plate of food.",
    },
    pitfalls: [
      {
        problem: "You shoot at midday and wonder why faces look harsh",
        fix: "Move to open shade or wait for golden hour. The midday sun is a small, hard source, and the fix is changing the light rather than changing a setting.",
      },
      {
        problem: "You leave the room lights on while using window light",
        fix: "Turn every other light off. A ceiling bulb adds a second source at a different colour temperature and makes the whole image muddy — this is the most common indoor mistake.",
      },
      {
        problem: "You place the subject facing the window squarely",
        fix: "Turn it to about forty-five degrees. Angled light reveals shape and texture; frontal light flattens the subject the same way a built-in flash does.",
      },
      {
        problem: "Your shadows are too dark and you cannot recover them",
        fix: "Bounce light back with a reflector. A piece of white foam board on the shadow side gives you controllable two-light photography for almost nothing.",
      },
      {
        problem: "Backlit subjects keep coming out dark",
        fix: "Tap the subject to set exposure, or move so the light is at an angle rather than directly behind. The camera exposes for the bright background unless you tell it otherwise.",
      },
      {
        problem: "You use the phone flash indoors",
        fix: "Find window light or turn on every practical light in the room instead. A phone flash is small, hard, frontal and close, which is the least flattering combination available.",
      },
      {
        problem: "Mixed church lighting gives you strange colours",
        fix: "Accept it and expose for the faces. No white balance is correct for daylight, tungsten and LED at once, so choose which colour you will live with before shooting.",
      },
      {
        problem: "You fight harmattan haze in camera",
        fix: "Shoot it and fix colour in editing. Haze scatters light, which flattens contrast and drains colour — the light is genuinely soft and good for faces, and the dullness is recoverable afterwards.",
      },
    ],
    expertNotes: [
      "Look at the light before you look at the subject. The camera records the pattern of light, not the thing itself, so moving a person two metres toward a window changes a photograph more than any camera upgrade could.",
      "Turn the room lights off when using a window. A second source at a different colour temperature muddies everything, and this single habit is the difference between amateur and convincing indoor work.",
      "Build a reflector before you buy anything. White foam board on the shadow side gives controllable two-light photography, and moving it closer or further changes the mood of the image at no cost.",
      "Expose for faces in mixed light. In a church with daylight, tungsten and LED, no white balance is correct for all three — a correct face with odd colours is usable, while a correct background with a dark face is not.",
    ],
    vocabulary: [
      {
        term: "Light direction",
        meaning:
          "Where the source is relative to the subject. Front flattens, side reveals shape, back silhouettes.",
      },
      {
        term: "Hard light",
        meaning:
          "From a small source, giving sharp-edged shadows. Midday sun, a bare bulb, a phone flash.",
      },
      {
        term: "Soft light",
        meaning:
          "From a large source, giving gentle transitions. Overcast sky, a curtained window, bounced light. Forgiving on faces.",
      },
      {
        term: "Diffusion",
        meaning:
          "Making the source larger and softer — a sheet or curtain between sun and subject. Turns hard light into soft light for nothing.",
      },
      {
        term: "Reflector",
        meaning:
          "A white or foil surface bouncing light into the shadows. Distance controls how much shadow remains.",
      },
      {
        term: "Window light",
        meaning:
          "The best free studio light available. Subject at forty-five degrees, all other lights off.",
      },
      {
        term: "Golden hour",
        meaning:
          "Roughly the hour after sunrise and before sunset. Low angle, warm and gentle for physical reasons.",
      },
      {
        term: "Mixed lighting",
        meaning:
          "Several sources at different colour temperatures in one frame. No white balance is correct for all; choose one to live with.",
      },
    ],
    homework: [
      {
        task: "Build a reflector and a diffuser",
        detail:
          "Foam board or foil-wrapped cardboard for the reflector, a white bedsheet or curtain for the diffuser. Photograph one subject with and without each and keep both frames.",
      },
      {
        task: "Shoot one portrait at golden hour",
        detail:
          "Between roughly 6:20 and 6:50 in the evening, with the sun at an angle to the face rather than behind it. Compare it with a midday portrait of the same person.",
      },
      {
        task: "Set up the window studio",
        detail:
          "Turn off every other light, place a product at forty-five degrees to the window, and add a reflector on the shadow side. This is the standard setup for product work and costs nothing.",
      },
      {
        task: "Photograph one mixed-light interior",
        detail:
          "A church, a shop, anywhere with daylight and bulbs together. Expose for a face, note which colour you chose to live with, and explain why.",
      },
    ],
    rubric: [
      {
        criterion: "Reading light",
        passing: "Can tell bright from dim.",
        excellent:
          "Identifies direction and hardness in any situation, and can say whether the light suits the subject before shooting.",
      },
      {
        criterion: "Modification",
        passing: "Uses available light.",
        excellent:
          "A reflector and a diffuser built from household materials and demonstrably used, with reflector distance varied to control shadow depth.",
      },
      {
        criterion: "Indoors",
        passing: "Photographs inside.",
        excellent:
          "Window light at forty-five degrees with every other light off, shadows lifted by a reflector, and no muddy mixed-colour cast.",
      },
      {
        criterion: "Golden hour",
        passing: "Shot outdoors.",
        excellent:
          "A frame made in golden hour with the sun at an angle to the subject, compared directly against a midday frame of the same subject.",
      },
      {
        criterion: "Mixed light",
        passing: "Handled a difficult interior.",
        excellent:
          "Exposure set for a face in mixed daylight and artificial light, with a stated decision about which colour to accept and why.",
      },
    ],
    faqs: [
      {
        q: "What is the best time of day to photograph outdoors?",
        a: "The hour after sunrise or before sunset — roughly 6:20 to 6:50 in the morning and evening in Lagos. The sun is low, so the light is angled, warm and gentle. Midday sun is hard and unflattering on faces, which is why so many outdoor photographs disappoint.",
      },
      {
        q: "What can I use as a reflector?",
        a: "White foam board, a piece of cardboard wrapped in kitchen foil with the dull side out, a white bedsheet, or even a large white plate. Hold or prop it on the shadow side opposite the light. It costs almost nothing and is the single most useful piece of equipment you can own.",
      },
      {
        q: "Why do my indoor photographs look bad?",
        a: "Almost always because the room lights are on. A ceiling bulb adds a second source at a different colour and muddies the image. Turn everything off, use window light at forty-five degrees to the subject, and add a white board on the shadow side.",
      },
      {
        q: "How do I photograph a church service?",
        a: "Accept the mixed light rather than fighting it — daylight, tungsten and LED cannot all be balanced at once. Expose for faces by tapping one, avoid the flash, and choose which colour cast you are willing to live with. A correct face with odd colours is usable; a dark face is not.",
      },
      {
        q: "Is overcast weather bad for photography?",
        a: "It is often the best light available. Cloud turns the whole sky into one large soft source, which flatters faces and hides blemishes, and it removes the harsh shadows of direct sun. Colours come out slightly flat, which is easy to correct in editing.",
      },
    ],
  },

  "camera-control": {
    summary:
      "A phone camera makes dozens of decisions per second, most of them sensible and some of them wrong for your photograph. This session takes back the ones that matter: exposure and exposure lock, focus and focus lock, white balance, when HDR helps and when it ruins the image, raw capture, and stability.",
    objectives: [
      "Understand what the camera decides automatically and why it sometimes fails",
      "Set and lock exposure for the highlights",
      "Focus deliberately and lock focus to recompose",
      "Recognise white balance errors and choose how to handle them",
      "Know when HDR improves an image and when to switch it off",
      "Hold a phone steady enough for sharp images in low light",
    ],
    blocks: [
      {
        heading: "What the phone decides for you",
        body: [
          "Point a phone at a scene and it instantly guesses the brightness, the focus distance, the colour temperature and the processing. **Most of the time it guesses well**, which is why phone photography is so accessible and why most people never touch a setting. The problem is that it guesses for the average, and a photograph is usually about the exception.",
          "It fails in predictable ways. Faced with a bright window behind a person, it exposes for the window and silhouettes the person. Faced with a dark room, it brightens everything and produces noise. Faced with a subject that is not in the middle, it focuses on whatever is in the middle. **These are not malfunctions — the camera is doing exactly what it was told to do, which is to average.**",
          "So the goal is not to take manual control of everything, which would slow you down and mostly make things worse. It is to **know the three or four situations where the average is wrong** and intervene for those. That is what the rest of this session is: a short list of interventions rather than a manual mode.",
        ],
      },
      {
        heading: "Exposure and exposure lock",
        body: [
          "Tap the screen and the phone sets focus and brightness for that point. On almost every phone, a small sun icon appears beside the focus box, and **dragging it up or down changes the brightness** while keeping the focus. That single control fixes most exposure problems and takes a second.",
          "The principle to hold onto is **expose for the highlights**. A camera can often recover a dark area when you edit; it very rarely recovers a blown-out white, because the detail was never recorded. A bright sky, a white shirt, a white plate of food — if those are pure featureless white, no amount of editing brings them back. It is usually better to have a slightly dark image you can lift than a bright one with nothing in the whites.",
          "Then **exposure lock**: press and hold until you see AE/AF Lock, and both brightness and focus stay fixed while you move the phone. This is essential whenever you want to focus on one thing and frame another — a face at the edge of the frame, a subject against a bright background — because without the lock, every time you move the phone the camera re-guesses and the exposure jumps.",
        ],
      },
      {
        heading: "Focus and recomposing",
        body: [
          "Phone autofocus is good but it has one habit that ruins photographs: **it focuses on whatever is nearest or most central**, not on what the photograph is about. Point at a person with a busy street behind them and it may well choose the street, because the street has more edges to lock onto.",
          "The fix is to **tap the subject** — specifically the eye, for a person, because that is where the viewer looks and a slightly soft nose is forgiven while a soft eye is not. If the subject is not where you want it in the frame, tap to focus, **hold to lock**, then move the phone to compose. This is called recomposing and it is the standard technique for any off-centre subject.",
          "Focus also struggles in **low light and low contrast**, where the camera hunts back and forth and never settles. Give it something with an edge: tap a boundary between light and dark rather than a smooth area. If it still will not lock, you are at the limit of the phone, and the honest answer is more light or a closer subject rather than more patience.",
        ],
      },
      {
        heading: "White balance and colour temperature",
        body: [
          "**White balance** is the camera working out what colour the light is so that white things look white. Daylight is bluish, tungsten bulbs are orange, fluorescent and many LEDs are greenish. Automatic white balance handles a single light source well, which is most situations, and fails when there are several at once.",
          "The failure is visible as a **colour cast**: everyone at a party lit by warm bulbs looks orange, a room under mixed bulbs and daylight has half the people warm and half cool. Sometimes that is fine and even attractive — warm evening light is pleasant — but for product photography it is a real problem, because a customer who receives an item that is not the colour in the photograph will complain, and rightly.",
          "The practical rules are simple. **Remove competing light sources** where you can — turn off the bulb and use the window, which gives one clean colour. **Use something white in the frame as a reference** so you can correct the cast later with confidence. And if your phone offers a manual white balance or a raw mode, use it in mixed light, because raw records the data without baking in a colour decision you cannot undo.",
        ],
      },
      {
        heading: "HDR, raw and stability",
        body: [
          "**HDR** takes several exposures and merges them so that both bright and dark areas hold detail. It genuinely helps in high-contrast scenes — a person against a bright sky, an interior with a window — and it is on by default for good reason. But it has three failure modes worth knowing: it **smears movement**, so it is wrong for anything in motion; it **kills deliberate silhouettes**, because the whole point of a silhouette is lost shadow; and it can **flatten mood** in a dark, atmospheric scene by lifting shadows you wanted dark.",
          "**Raw** — DNG on Android, ProRAW on some phones — records far more information than a JPEG, at the cost of a much larger file and the need to edit it. A raw file looks flat and dull straight out of the camera, which surprises people; that flatness is the point, because it means the data is still there. Shoot raw when the light is difficult, when you plan to edit seriously, or when you might want to fix white balance later. Shoot JPEG when you need the file small and the image finished.",
          "Then **stability**, which decides whether any of this matters. In low light the phone uses a slower shutter, and movement becomes blur. Hold the phone with **both hands, elbows tucked against your ribs**, and brace against a wall, a table or a doorway. Use the **volume button or a timer** rather than tapping the screen, because the tap itself moves the camera. And **do not pinch-zoom** — on most phones that crops the image and discards resolution; switch to the phone's second or third lens if it has one, which is a real optical change.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor shoots the same handful of difficult scenes twice — once on full automatic and once with the intervention applied — and shows them side by side: a backlit face, an off-centre subject, a white product on a white table, a high-contrast interior with HDR on and off, and a low-light frame braced against a wall.",
      steps: [
        {
          step: "Shoot a backlit face on automatic",
          detail:
            "Show the silhouette. Explain that the camera exposed for the bright background, which is correct behaviour and the wrong photograph.",
        },
        {
          step: "Tap the face and drag the sun slider up",
          detail:
            "Show the face recover. Explain that this one control fixes most exposure problems in about a second.",
        },
        {
          step: "Deliberately overexpose a white shirt",
          detail:
            "Show that the detail is gone and cannot be recovered. Explain that a camera can lift a dark area but almost never recovers a blown highlight.",
        },
        {
          step: "Shoot a dark frame you can lift",
          detail:
            "Underexpose slightly and brighten it in editing. Explain that this is why you expose for the highlights rather than for the average.",
        },
        {
          step: "Focus on an off-centre subject without a lock",
          detail:
            "Move the phone to compose and show the focus jump. Explain that the camera re-guesses every time you move it.",
        },
        {
          step: "Press and hold to lock, then recompose",
          detail:
            "Show AE/AF Lock engage and the exposure hold. Explain that this is the standard technique for any subject that is not in the middle.",
        },
        {
          step: "Tap the eye rather than the face",
          detail:
            "Explain that a soft nose is forgiven while a soft eye is not, because the eye is where the viewer looks.",
        },
        {
          step: "Try to focus in low light and watch it hunt",
          detail:
            "Point at a smooth dark area. Explain that focus needs an edge, so tap a boundary between light and dark instead.",
        },
        {
          step: "Photograph a white product under warm bulbs",
          detail:
            "Show the orange cast. Explain that for products this is a commercial problem, because a customer receiving a different colour will complain.",
        },
        {
          step: "Turn the bulbs off and use window light",
          detail:
            "Show the colour go clean. Explain that removing competing light sources is the best white balance fix available.",
        },
        {
          step: "Shoot a high-contrast interior with HDR on",
          detail:
            "Show detail in both the window and the room. Explain that this is what HDR is for and why it is on by default.",
        },
        {
          step: "Shoot the same frame with HDR off",
          detail:
            "Compare. Explain that HDR can flatten mood by lifting shadows you wanted dark, and that this is a decision rather than a setting.",
        },
        {
          step: "Shoot a moving subject with HDR on",
          detail:
            "Show the smearing. Explain that HDR merges several exposures, so anything in motion becomes a ghost.",
        },
        {
          step: "Capture one raw frame and open it",
          detail:
            "Show how flat it looks. Explain that the flatness means the data survived, and that a JPEG has already thrown most of it away.",
        },
        {
          step: "Shoot handheld in low light, then braced",
          detail:
            "Compare the blur. Explain that both hands, elbows in and a wall to lean on is worth more than any setting.",
        },
        {
          step: "Use the volume button instead of tapping the screen",
          detail:
            "Explain that the tap itself moves the camera, and that at slow shutter speeds that movement is the blur.",
        },
        {
          step: "Compare pinch zoom with the second lens",
          detail:
            "Show the resolution difference. Explain that pinching crops and discards pixels while switching lenses is a real optical change.",
        },
      ],
    },
    practice: {
      title: "Thirty frames under constraints",
      brief:
        "You shoot thirty frames under deliberate constraints that force the interventions from this session — exposure locked, no pinch zoom, every frame braced, one raw file, one deliberate silhouette — and submit the frames alongside the automatic version of the three hardest scenes.",
      steps: [
        "Find one high-contrast scene with a bright background and a darker subject.",
        "Shoot it on full automatic and keep the frame for comparison.",
        "Tap the subject and drag the exposure slider until the subject is correct.",
        "Compare the two frames and note what the automatic version lost.",
        "Find one white object and photograph it so the whites hold detail rather than blowing out.",
        "Deliberately underexpose one frame, then brighten it in editing to prove the shadows recover.",
        "Photograph one off-centre subject using press-and-hold to lock, then recomposing.",
        "Photograph one person tapping specifically on the eye.",
        "Find a low-contrast scene and get focus by tapping an edge between light and dark.",
        "Shoot one product under a single light source with all other lights off.",
        "Place something white in that frame so the colour cast can be corrected later.",
        "Shoot one interior with HDR on and the same frame with HDR off, and keep both.",
        "Shoot one moving subject with HDR off to avoid smearing.",
        "Capture one raw file and note how flat it looks before editing.",
        "Shoot five frames in low light with both hands, elbows tucked, braced against a wall.",
        "Use the volume button or a timer for every low-light frame rather than tapping the screen.",
        "Use the phone's second or third lens instead of pinch zooming for at least five frames.",
        "Make one deliberate silhouette and say what you gave up to get it.",
        "Submit the three hardest scenes as automatic-versus-intervened pairs.",
      ],
      standard:
        "Thirty frames shot under stated constraints, including a high-contrast scene submitted as an automatic-versus-exposure-adjusted pair with what was lost identified; one white object photographed with highlights held rather than blown; one deliberate underexposure recovered in editing; one off-centre subject shot with press-and-hold lock and recompose; one portrait focused on the eye; focus achieved in a low-contrast scene by tapping an edge; one product under a single light source with all others off and something white in frame; one interior shot with HDR on and off; one moving subject with HDR off; one raw file captured and its flatness noted; five low-light frames braced with both hands using the volume button or timer; at least five frames using an optical lens rather than pinch zoom; and one deliberate silhouette with the trade-off stated.",
    },
    pitfalls: [
      {
        problem: "Your subject is dark because the background is bright",
        fix: "Tap the subject and drag the exposure slider. The camera exposed for the average of the frame, which is correct behaviour and the wrong photograph.",
      },
      {
        problem: "Your whites are pure white with no detail",
        fix: "Expose for the highlights. A camera can lift a dark area when you edit but almost never recovers a blown-out white, because the detail was never recorded.",
      },
      {
        problem: "Focus jumps when you move to compose",
        fix: "Press and hold to lock exposure and focus, then recompose. Without the lock the camera re-guesses every time the phone moves.",
      },
      {
        problem: "Portraits are sharp on the nose and soft on the eyes",
        fix: "Tap the eye specifically. A slightly soft nose is forgiven while a soft eye is not, because the eye is where the viewer looks first.",
      },
      {
        problem: "Products come out orange or green",
        fix: "Remove the competing light source and use one clean source. A customer who receives an item that is not the colour in the photograph will complain, and rightly.",
      },
      {
        problem: "You leave HDR on for everything",
        fix: "Switch it off for movement, for deliberate silhouettes and for moody low-light scenes. It merges several exposures, so motion smears and intended darkness is lifted away.",
      },
      {
        problem: "Your low-light frames are blurred",
        fix: "Brace: both hands, elbows tucked, lean on a wall or table, and use the volume button rather than tapping the screen, because the tap itself moves the camera.",
      },
      {
        problem: "You pinch-zoom instead of moving or switching lenses",
        fix: "Move closer or use the phone's second or third lens. Pinching crops the image and discards resolution; switching lenses is a real optical change.",
      },
    ],
    expertNotes: [
      "Expose for the highlights every time. A dark image can usually be lifted in editing, while a blown-out white is gone permanently because the detail was never recorded — this single habit saves more frames than any other setting.",
      "Press and hold to lock before you compose. Focus and exposure lock is what makes off-centre subjects possible at all, and without it the camera re-guesses every time the phone moves.",
      "Turn the room lights off and use one source. Removing competing light is a better white balance fix than any setting, and it is the difference between a product that photographs true to colour and one that generates complaints.",
      "Brace the phone rather than hoping for a fast shutter. Both hands, elbows against your ribs, a wall to lean on, and the volume button instead of a screen tap — in low light this is worth more than any setting you can change.",
    ],
    vocabulary: [
      {
        term: "Exposure",
        meaning: "How bright the image is. Tap to set it, drag the sun icon to adjust it.",
      },
      {
        term: "Blown highlight",
        meaning:
          "A white area with no recorded detail. Unrecoverable, which is why you expose for the highlights.",
      },
      {
        term: "Exposure lock (AE/AF Lock)",
        meaning:
          "Press and hold to freeze brightness and focus so you can move and recompose without the camera re-guessing.",
      },
      {
        term: "Recompose",
        meaning:
          "Focus on the subject, lock, then move the phone to place it where you want. The standard technique for off-centre subjects.",
      },
      {
        term: "White balance",
        meaning:
          "The camera's guess at the colour of the light. Handles one source well and fails when there are several.",
      },
      {
        term: "Colour cast",
        meaning:
          "An overall tint from the light — orange under tungsten, greenish under some LEDs. A commercial problem for product work.",
      },
      {
        term: "HDR",
        meaning:
          "Merges several exposures to hold detail in brights and darks. Wrong for movement, silhouettes and intended darkness.",
      },
      {
        term: "Raw",
        meaning:
          "Unprocessed sensor data with far more to edit. Looks flat by design, because the information is still there.",
      },
    ],
    homework: [
      {
        task: "Shoot one backlit scene twice",
        detail:
          "Once automatic, once with the subject tapped and exposure lifted. Submit both and write what the automatic version lost.",
      },
      {
        task: "Practise exposure lock on five off-centre subjects",
        detail:
          "Press and hold, recompose, shoot. Note how often the focus would have jumped without the lock.",
      },
      {
        task: "Photograph one white product truthfully",
        detail:
          "One light source, all others off, something white in frame as a reference. This is the standard commercial setup and the one that prevents colour complaints.",
      },
      {
        task: "Make ten braced low-light frames",
        detail:
          "Both hands, elbows in, braced against something solid, volume button or timer for the shutter. Compare them with ten handheld frames of the same scene.",
      },
    ],
    rubric: [
      {
        criterion: "Exposure control",
        passing: "Images are roughly the right brightness.",
        excellent:
          "Highlights held rather than blown in every frame, exposure set deliberately by tapping and dragging, and a backlit scene shown as an automatic-versus-corrected pair.",
      },
      {
        criterion: "Focus control",
        passing: "Subjects are in focus.",
        excellent:
          "Exposure and focus locked and recomposed for off-centre subjects, eyes focused in portraits, and focus achieved in low contrast by tapping an edge.",
      },
      {
        criterion: "Colour",
        passing: "Colours look acceptable.",
        excellent:
          "A single light source used for product work with competing lights off, something white in frame as a reference, and any cast identified rather than ignored.",
      },
      {
        criterion: "Deliberate settings",
        passing: "Understands HDR.",
        excellent:
          "HDR used where it helps and switched off for movement, silhouettes and intended darkness, with the reasoning stated, and a raw file captured with its flatness explained.",
      },
      {
        criterion: "Sharpness",
        passing: "Most frames are sharp.",
        excellent:
          "Low-light frames braced with both hands and triggered by the volume button or timer, optical lenses used instead of pinch zoom, and the difference demonstrated.",
      },
    ],
    faqs: [
      {
        q: "Why are my subjects dark when the background is bright?",
        a: "The camera exposed for the average of the frame, and the bright background dominated it. Tap the subject and drag the small sun icon up to lift it — this fixes most backlit photographs in about a second.",
      },
      {
        q: "Should I shoot in raw?",
        a: "When the light is difficult or you plan to edit seriously, yes. Raw files are larger and look flat and dull straight from the camera, but that flatness means the data survived. For finished images you need to send quickly, a JPEG is the right choice.",
      },
      {
        q: "When should I turn HDR off?",
        a: "For anything moving, because it merges several exposures and smears motion; for deliberate silhouettes, because lifting the shadows destroys the point; and for moody low-light scenes where you want the darkness to stay dark.",
      },
      {
        q: "My low-light photos are always blurry. Is my phone too old?",
        a: "Usually not. In low light the phone slows the shutter, so any movement becomes blur. Hold it with both hands, tuck your elbows in, brace against a wall, and use the volume button rather than tapping the screen — the tap itself is often the movement.",
      },
      {
        q: "Should I zoom in?",
        a: "Move closer, or switch to your phone's second or third lens if it has one. Pinch zooming on most phones crops the image and throws away resolution, while switching lenses is a real optical change that costs you nothing in quality.",
      },
    ],
  },

  "editing-photography": {
    summary:
      "Editing is finishing a photograph, not rescuing it. This session covers the order of operations, colour correction, contrast and the line where clarity becomes damage, making a set of images look like one photographer took them, and exporting correctly for web, WhatsApp and print.",
    objectives: [
      "Edit in an order that does not undo earlier work",
      "Correct a colour cast using a known reference",
      "Use contrast, highlights and shadows rather than crushing everything",
      "Apply clarity and sharpening without damaging skin",
      "Make a set of photographs consistent with each other",
      "Export at the right size for web, WhatsApp and print",
    ],
    blocks: [
      {
        heading: "Editing is finishing, not fixing",
        body: [
          "The purpose of editing is to **make the photograph look like what you saw**. You were there; the camera was not. It recorded a flat, slightly dull version of a scene your eye and brain had already improved — brightening the shadows, warming the sunset, ignoring the bin at the edge. Editing closes that gap.",
          "The opposite approach — using editing to rescue a photograph that was never made properly — is the trap. **No edit fixes a badly composed frame, a subject out of focus, or light that was wrong.** It is far faster and better to move two metres and reshoot than to spend twenty minutes on an image that will still be mediocre afterwards.",
          "There is also a commercial reason to be restrained. Clients recognise over-editing immediately even when they cannot name it, and heavily processed skin, oversaturated colour and crushed blacks read as amateur however technically smooth they are. **The edit nobody notices is the successful one.**",
        ],
      },
      {
        heading: "The order of operations",
        body: [
          "Editing has a correct order, and doing it out of sequence wastes work. **Straighten and crop first**, because everything after is judged relative to the frame, and cropping changes what the composition needs. **Then white balance**, because colour correction changes how contrast and exposure read — warming an image makes it feel brighter, so setting exposure before colour means setting it twice.",
          "**Then exposure**, then **contrast**, then **colour** — saturation and vibrance — and **clarity and sharpening last**, because they amplify whatever is already there and are the easiest to overdo. The reason sharpening goes last is concrete: it enhances edges, so if you crop after sharpening you have sharpened pixels that are about to be thrown away, and if you brighten after sharpening you amplify noise the sharpening made visible.",
          "In practice this means a workflow of about a minute per image once it is habitual: crop, colour, exposure, contrast, colour intensity, a little clarity, export. Doing it in this order is not pedantry — it is the difference between one pass and three.",
        ],
      },
      {
        heading: "Colour correction first",
        body: [
          "Most colour problems are a **cast** — everything in the frame is shifted warm or cool — and the fix is white balance, which is the temperature and tint sliders. Slide toward blue to cool an orange image, toward yellow to warm a blue one; tint handles the green-magenta shift that fluorescent and some LED lighting produce, which temperature alone cannot fix.",
          "The reliable way to judge it is to **find something that should be neutral** — a white shirt, a white plate, a grey wall, the whites of someone's eyes — and adjust until that thing is actually neutral. Without a reference you are guessing, and your eye adapts to a cast within about thirty seconds, so you will convince yourself an orange image is correct if you stare at it long enough.",
          "This is exactly why the previous session told you to put something white in product frames. **A reference makes colour correction objective rather than a matter of taste**, and for commercial work that matters: a customer comparing a photograph with the item in their hand will notice a cast you have stopped seeing.",
        ],
      },
      {
        heading: "Contrast, clarity and the over-editing line",
        body: [
          "**Contrast** is the difference between the light and dark parts of an image, and it is where most editing goes wrong. Pushing the contrast slider hard crushes the shadows to black and blows the highlights to white, losing detail at both ends. The better tool is usually the **highlights and shadows sliders**, which let you recover a bright sky and lift a dark face independently — a targeted adjustment rather than a blunt one.",
          "**Clarity** adds contrast in the midtones, which is what makes textures pop: fabric weave, food surfaces, stone, bark. It is genuinely useful and it is the slider people abuse most. **On skin it is destructive**, because the midtone texture it enhances is pores and blemishes, and clarity applied to a face ages and roughens the person. Leave skin alone or reduce clarity slightly instead.",
          "The practical discipline is the **seventy per cent rule**: take any slider to where you think it looks right, then pull it back about thirty per cent. Almost every beginner over-adjusts, because the eye adapts and each small increase looks correct in the moment. Coming back to an image the next day is the only reliable check, and it is worth doing for anything a client will see.",
        ],
      },
      {
        heading: "Batch consistency, export and delivery",
        body: [
          "A set of photographs from one shoot should look like one photographer took them. Nothing announces amateur work more clearly than a gallery where frame one is warm, frame two is cool, frame three is high contrast and frame four is faded. The fix is to **edit one image properly, then copy those settings across the rest** — most editing apps, including free ones, let you copy and paste edits or save a preset — and then adjust each frame slightly for its own exposure.",
          "Then **export sizes**, which people get wrong constantly. For **web and Instagram**, roughly 2,048 pixels on the long edge at high JPEG quality is plenty; larger files load slowly on mobile data and the platform compresses them anyway. For **print**, you need resolution, not just pixels — a 6×4 inch print at 300 dots per inch needs about 1,800 by 1,200 pixels, and an A3 poster needs far more. Exporting a web-sized file for a client's banner is a common and avoidable failure.",
          "Finally, **delivery**. WhatsApp compresses images aggressively and will visibly degrade a photograph you spent time on, so send finished work by email or a cloud link and let the client download the full file. Keep your **originals and your edited versions separate** — never overwrite a raw or an original JPEG, because you will be asked for a different crop or a larger export, and the ability to go back is the difference between a five-minute job and a reshoot.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor edits one photograph through the full order of operations on a projected screen, deliberately overshoots every slider to show the damage, then applies the settings to a set of ten frames for consistency and exports the same image at three sizes.",
      steps: [
        {
          step: "Open an unedited frame and resist touching anything",
          detail:
            "Describe what is wrong with it out loud first. Explain that naming the problem before editing prevents fiddling.",
        },
        {
          step: "Straighten the horizon",
          detail:
            "Use the straighten tool. Explain that this comes first because everything after is judged relative to the frame.",
        },
        {
          step: "Crop to improve the composition",
          detail:
            "Remove dead space and intrusions. Explain that cropping before sharpening avoids sharpening pixels you are about to throw away.",
        },
        {
          step: "Find a neutral reference in the frame",
          detail:
            "Point out a white shirt or plate. Explain that without a reference you are guessing, and your eye adapts to a cast in about thirty seconds.",
        },
        {
          step: "Correct the white balance",
          detail:
            "Adjust temperature until the reference is neutral, then tint for any green shift. Explain that fluorescent and some LEDs need tint, which temperature alone cannot fix.",
        },
        {
          step: "Set the exposure",
          detail:
            "Adjust brightness now that the colour is right. Explain that warming an image makes it feel brighter, so exposure set before colour means setting it twice.",
        },
        {
          step: "Recover highlights and lift shadows separately",
          detail:
            "Use the two sliders instead of contrast. Explain that this is a targeted adjustment where the contrast slider is a blunt one that loses detail at both ends.",
        },
        {
          step: "Add contrast, then pull it back thirty per cent",
          detail:
            "Overshoot deliberately, then reduce. Explain the seventy per cent rule and that the eye adapts so each increase looks correct in the moment.",
        },
        {
          step: "Push clarity to maximum on a portrait",
          detail:
            "Show the skin degrade. Explain that clarity enhances midtone texture, and on a face that texture is pores and blemishes.",
        },
        {
          step: "Reduce clarity slightly and compare",
          detail:
            "Show the improvement. Explain that on skin the correct move is often negative, and that clarity belongs on fabric, food and stone.",
        },
        {
          step: "Add vibrance rather than saturation",
          detail:
            "Explain that vibrance protects skin tones while saturation pushes everything, including faces, toward orange.",
        },
        {
          step: "Sharpen last, and only a little",
          detail:
            "Explain that sharpening amplifies whatever is there, including noise, which is why it goes at the end.",
        },
        {
          step: "Copy the settings to nine more frames",
          detail:
            "Paste the edit across the set. Explain that a gallery where every frame has a different look is the clearest mark of amateur work.",
        },
        {
          step: "Adjust two frames individually",
          detail:
            "Correct exposure on frames that differ. Explain that consistency means a shared starting point, not identical settings regardless of the frame.",
        },
        {
          step: "Export at 2,048 pixels for web",
          detail:
            "Show the file size. Explain that larger is wasted on Instagram, which compresses anyway, and slow on mobile data.",
        },
        {
          step: "Export a print-sized file at 300 dpi",
          detail:
            "Calculate the pixels needed for a 6×4 print. Explain that print needs resolution, not just pixel count.",
        },
        {
          step: "Send the web file by WhatsApp and compare",
          detail:
            "Show the compression damage. Explain that finished work goes by email or cloud link so the client receives the real file.",
        },
        {
          step: "Show the folder structure for originals and edits",
          detail:
            "Explain that overwriting an original means a reshoot when a client asks for a different crop or a larger export.",
        },
      ],
    },
    practice: {
      title: "Final assignment: a curated set of twelve",
      brief:
        "You shoot for one real brief — products, food, portraits or an event — select twelve frames from everything you shot, edit them consistently in the correct order, and deliver them at two export sizes with a short note on what you changed and why.",
      steps: [
        "Choose one brief: a product set, a plate of food, a portrait session or a church service.",
        "Shoot at least one hundred and fifty frames using composition, light and camera control from the earlier sessions.",
        "Review every frame and mark your candidates, not your favourites.",
        "Select twelve that work as a set rather than twelve that each work alone.",
        "Straighten and crop every selected frame first, before any other adjustment.",
        "Find a neutral reference in at least three frames and correct white balance against it.",
        "Set exposure after colour, not before.",
        "Use the highlights and shadows sliders rather than crushing contrast.",
        "Apply the seventy per cent rule to every contrast and clarity adjustment.",
        "Leave clarity alone or negative on any skin.",
        "Use vibrance rather than saturation where there are faces.",
        "Sharpen last and lightly.",
        "Copy your settings across all twelve frames, then adjust individual exposure where needed.",
        "Come back to the set the next day and reduce any adjustment that now looks too strong.",
        "Export all twelve at 2,048 pixels on the long edge for web delivery.",
        "Export two frames at 300 dpi sized for a 6×4 print.",
        "Write one short note per frame on what you changed and why.",
        "Deliver by email or cloud link, and keep originals and edits in separate folders.",
      ],
      standard:
        "A curated set of twelve images selected from at least one hundred and fifty frames for one real brief, chosen to work as a set rather than individually; every frame straightened and cropped before any other edit, white balance corrected against a neutral reference in at least three frames, exposure set after colour, highlights and shadows used instead of crushed contrast, the seventy per cent rule applied to every contrast and clarity adjustment, clarity left neutral or negative on skin, vibrance used rather than saturation where faces appear, and sharpening applied last and lightly; settings copied across all twelve with individual exposure adjusted where needed and the set reviewed the next day for over-adjustment; all twelve exported at 2,048 pixels for web and two at 300 dpi for a 6×4 print; one note per frame explaining the change; delivered by email or cloud link with originals and edits kept separate.",
    },
    pitfalls: [
      {
        problem: "You edit to rescue a photograph that was never made",
        fix: "Reshoot instead. No edit fixes bad composition, an out-of-focus subject or wrong light, and moving two metres is faster than twenty minutes on an image that will still be mediocre.",
      },
      {
        problem: "You adjust sliders in any order",
        fix: "Crop, colour, exposure, contrast, colour intensity, clarity, sharpen. Warming an image makes it read brighter, so exposure set before colour means setting it twice.",
      },
      {
        problem: "You correct colour by eye with no reference",
        fix: "Find something that should be neutral and adjust until it is. Your eye adapts to a cast in about thirty seconds, so you will convince yourself an orange image is correct.",
      },
      {
        problem: "You crush the contrast slider",
        fix: "Use the highlights and shadows sliders instead. Hard contrast loses detail at both ends, while targeted sliders recover a bright sky and lift a dark face independently.",
      },
      {
        problem: "You apply clarity to faces",
        fix: "Leave skin alone or reduce it slightly. Clarity enhances midtone texture, and on a face that texture is pores and blemishes — it ages and roughens the person.",
      },
      {
        problem: "Every adjustment looks right while you are making it",
        fix: "Apply the seventy per cent rule and review the next day. The eye adapts, so each small increase looks correct in the moment, and only distance reveals the over-edit.",
      },
      {
        problem: "Your gallery looks like several photographers",
        fix: "Edit one frame properly and copy the settings across the set. Inconsistent colour and contrast between frames is the clearest mark of amateur work there is.",
      },
      {
        problem: "You deliver finished work over WhatsApp",
        fix: "Send by email or a cloud link. WhatsApp compresses aggressively and will visibly degrade a photograph you spent time on, which is what the client will judge you by.",
      },
    ],
    expertNotes: [
      "Edit to match what you saw, not to improve on it. Your eye and brain already brightened the shadows and warmed the light on the day; editing closes the gap between the flat file and your memory of the scene.",
      "Correct colour before exposure, and crop before everything. Warming an image makes it read brighter, so setting exposure first means doing it twice — and the correct order turns three passes into one.",
      "Apply the seventy per cent rule and review the next day. Every beginner over-adjusts because the eye adapts, and coming back to an image after a night is the only reliable check on whether you went too far.",
      "Keep originals and edits in separate folders, always. Clients ask for a different crop, a larger export or the raw file weeks later, and the ability to go back is the difference between a five-minute job and a reshoot.",
    ],
    vocabulary: [
      {
        term: "Order of operations",
        meaning:
          "Crop, colour, exposure, contrast, colour intensity, clarity, sharpen. Out of sequence, work is undone and repeated.",
      },
      {
        term: "Colour cast",
        meaning:
          "An overall warm or cool shift. Corrected with temperature and tint, judged against something neutral.",
      },
      {
        term: "Tint",
        meaning:
          "The green-magenta adjustment. Fixes fluorescent and some LED light, which temperature alone cannot.",
      },
      {
        term: "Highlights and shadows",
        meaning:
          "Targeted recovery of bright and dark areas. Better than the contrast slider, which loses detail at both ends.",
      },
      {
        term: "Clarity",
        meaning:
          "Midtone contrast. Excellent on fabric, food and stone; destructive on skin, where the texture it enhances is blemishes.",
      },
      {
        term: "Vibrance",
        meaning:
          "Saturation that protects skin tones. Preferred over saturation wherever faces appear.",
      },
      {
        term: "Batch editing",
        meaning: "Copying one edit across a set so a gallery looks like one photographer took it.",
      },
      {
        term: "DPI",
        meaning:
          "Dots per inch, the resolution print requires. A 6×4 print at 300 dpi needs about 1,800 by 1,200 pixels.",
      },
    ],
    homework: [
      {
        task: "Edit one photograph in the correct order",
        detail:
          "Crop, colour, exposure, contrast, colour intensity, clarity, sharpen — and write down what happened when you did two of them out of sequence.",
      },
      {
        task: "Correct one badly cast image",
        detail:
          "Find a warm or green frame, locate something neutral in it, and correct against that reference. Note how different it looks from correcting by eye.",
      },
      {
        task: "Make ten frames consistent",
        detail:
          "Edit one properly, copy the settings to the other nine, then adjust individual exposure. Compare the set before and after.",
      },
      {
        task: "Export one image three ways",
        detail:
          "2,048 pixels for web, 300 dpi at 6×4 for print, and send it to yourself over WhatsApp. Compare all three and note where the quality went.",
      },
    ],
    rubric: [
      {
        criterion: "Workflow",
        passing: "Images are edited.",
        excellent:
          "Every frame edited in the correct order — crop, colour, exposure, contrast, colour intensity, clarity, sharpen — with the reasoning for the sequence explained.",
      },
      {
        criterion: "Colour",
        passing: "Colours look reasonable.",
        excellent:
          "Casts corrected against a neutral reference rather than by eye, tint used where fluorescent or LED light required it, and no frame left with an obvious shift.",
      },
      {
        criterion: "Tonal control",
        passing: "Contrast is applied.",
        excellent:
          "Highlights and shadows used rather than the contrast slider crushed, detail retained at both ends, and the seventy per cent rule applied with a next-day review.",
      },
      {
        criterion: "Restraint",
        passing: "Edits are not extreme.",
        excellent:
          "Clarity neutral or negative on skin, vibrance preferred over saturation where faces appear, sharpening last and light, and no frame that reads as over-processed.",
      },
      {
        criterion: "Delivery",
        passing: "Submits edited images.",
        excellent:
          "Twelve frames consistent as a set, exported at 2,048 pixels for web and 300 dpi for print, delivered by email or cloud link rather than WhatsApp, with originals and edits kept separate.",
      },
    ],
    faqs: [
      {
        q: "Which editing app should I use?",
        a: "Any app that gives you temperature, exposure, highlights, shadows, clarity and vibrance — the free versions of Snapseed and Lightroom both do, and so do most phone camera apps. The technique in this session is identical across all of them, and it matters far more than which one you pick.",
      },
      {
        q: "How much editing is too much?",
        a: "When someone can tell you edited it. Take each slider to where it looks right, then pull back about thirty per cent, and review the image the next day — your eye adapts within about thirty seconds, so every adjustment looks correct while you are making it.",
      },
      {
        q: "Why do my edited faces look rough?",
        a: "Clarity. It enhances midtone texture, and on skin that texture is pores and blemishes. Leave clarity alone on faces or reduce it slightly, and use vibrance rather than saturation so skin does not go orange.",
      },
      {
        q: "What size should I export for Instagram?",
        a: "About 2,048 pixels on the long edge at high JPEG quality. Larger files load slowly on mobile data and the platform compresses them anyway, so the extra resolution is wasted. For print you need the opposite — a 6×4 at 300 dpi is roughly 1,800 by 1,200 pixels.",
      },
      {
        q: "Should I send finished work over WhatsApp?",
        a: "No. WhatsApp compresses aggressively and will visibly degrade the photograph you spent time on, and that degraded version is what the client will judge. Send by email or a cloud link so they can download the full file.",
      },
    ],
  },
};
