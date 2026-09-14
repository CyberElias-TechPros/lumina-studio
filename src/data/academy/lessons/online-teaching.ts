import type { SessionLecture } from "../types";

/**
 * Online Teaching — ₦15,000 · 3 weeks · 6 sessions.
 * Sessions 1 to 3. (Sessions 4–6 in online-teaching-b.ts.)
 */
export const onlineTeachingLessonsA: Record<string, SessionLecture> = {
  "how-people-learn": {
    summary:
      "Knowing a subject and being able to teach it are different skills, and the gap between them is why experts often make poor teachers. This session covers what actually makes teaching work: understanding learners, writing objectives you can test, planning a lesson, and breaking anything complex into simple steps.",
    objectives: [
      "Explain what makes a good teacher, and why expertise alone is not it",
      "Identify what a learner already knows and what they are struggling with",
      "Write learning objectives you can actually test",
      "Plan a lesson with a structure that works online",
      "Break a complex topic into steps small enough to follow",
      "Recognise and remove the curse of knowledge",
    ],
    blocks: [
      {
        heading: "What makes a good teacher",
        body: [
          "The most common assumption about teaching is wrong: that knowing a subject deeply makes you able to teach it. In practice the opposite often happens, because **expertise makes things invisible**. Once you can do something fluently, you no longer remember the steps you took to get there, or which parts were hard. An expert asks 'what do you not understand?' and is genuinely puzzled by the answer, because the thing that is obvious to them now was once not obvious at all.",
          "What actually makes a good teacher is different. **Remembering what it was like not to know.** Being able to see the specific place a learner is stuck rather than assuming it is the obvious place. Explaining the same thing three different ways until one lands. And noticing when someone has gone quiet, because silence online usually means confusion rather than agreement.",
          "Then the part nobody mentions: **teaching is mostly listening and adjusting**. A lesson plan is a hypothesis about what will help, and the class is the test. The teacher who follows the plan exactly regardless of the confused faces is not being disciplined — they are not teaching. The plan exists so you know where you are going; the students determine how fast you get there and which route you take.",
        ],
      },
      {
        heading: "Understanding your learners",
        body: [
          "You cannot teach someone you have not located. Before planning anything, establish three things: **what they already know**, **what they need**, and **what they will do with it**. A class of beginners, a class of people who half-know the subject, and a class of professionals refreshing a skill need completely different lessons, and teaching the wrong one wastes everyone's time.",
          "The curse of the middle is worth naming. Mixed-ability classes are the hardest to teach, because the beginners are lost and the advanced are bored, and the temptation is to aim at the middle and satisfy nobody. The practical answer is to **teach to the beginners in the explanation and to the advanced in the exercises** — explain assuming no prior knowledge, then set tasks with an obvious extension for those who finish early. Nobody is insulted by a clear explanation; people are insulted by being held back.",
          "Then find out what they are actually struggling with, because it is rarely what you expect. Ask them directly, in their words: 'what have you tried, and where exactly did it stop working?' Their answer tells you the real obstacle, which is often a missing earlier step rather than the step you were about to teach. **Teaching the wrong step well is the most common failure in instruction**, and it happens because nobody asked.",
        ],
      },
      {
        heading: "Learning objectives",
        body: [
          "A **learning objective** is a statement of what the learner will be able to do at the end that they could not do at the start. Not what you will cover — what they will be able to do. 'We will cover Excel formulas' describes the teacher. 'You will write a formula that totals a column and handles blank cells' describes the learner, and it can be tested.",
          "The test of a good objective is the verb. **Observable verbs** — write, build, calculate, identify, correct, produce — describe something you can see someone do. **Unobservable verbs** — understand, appreciate, know about, be familiar with — describe a state of mind you cannot check, which means you will never know whether the lesson worked. Write objectives with observable verbs and the assessment designs itself.",
          "Then the discipline of **few objectives**. Three is the maximum for a ninety-minute session, and two is usually better. A lesson with eight objectives teaches none of them properly, because each gets a few minutes and none gets practised. The temptation to include everything you know is strong, and it is the main reason lessons run over and learners leave with nothing solid.",
        ],
      },
      {
        heading: "Lesson planning",
        body: [
          "A lesson plan has six parts, and each answers a question. **Objective** — what will they be able to do? **Hook** — why should they care in the first five minutes? **Demonstration** — how is it done, shown rather than described? **Guided practice** — what do they do with you watching? **Independent practice** — what do they do alone? **Check** — how will you know it landed?",
          "The order matters more than people expect. **Demonstrate before you explain** where you can, because seeing the finished thing gives the learner a destination, and then the explanation makes sense as the route to it. Explaining first and demonstrating later means the learner holds abstract information with nowhere to put it.",
          "Then **timing**, written down and honest. Ninety minutes is not ninety minutes of content — it is roughly fifteen minutes of explanation, twenty of demonstration, thirty of practice, fifteen of questions, and the rest lost to technical problems, late arrivals and repetition. Plan for less content than feels right, because a lesson that finishes with the objective achieved beats one that runs over with the objective half-covered. And always mark what you will **cut if you run out of time**, decided in advance rather than in the moment.",
        ],
      },
      {
        heading: "Breaking complex topics into steps",
        body: [
          "Every complex topic is a sequence of simple ones, and finding that sequence is the core craft of teaching. The method is to **work backwards from the finished thing**. Take the task you want them to do, and ask 'what did I have to be able to do just before that?' Then ask it again about the answer. Five or six rounds of that question produces a step sequence, and it usually reveals two or three prerequisite steps you had forgotten you knew.",
          "Then **order by dependency, not by how the software is organised**. Most subjects are taught in the order their menus are laid out, which is an accident of design rather than a logic of learning. A learner needs the concept before the tool that uses it, and needs the tool before the settings that modify it. Teaching in menu order produces people who can follow instructions and cannot think.",
          "Finally, **each step must be small enough to fail safely**. If a step has seven things in it, the learner who fails will not know which of the seven went wrong, and you will spend the lesson diagnosing rather than teaching. One idea per step, one action to check it, then the next. It feels slow and it is much faster, because nobody gets lost and you do not have to go back.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor takes one topic they know well and teaches it badly first, from expertise, so the class feels the curse of knowledge — then rebuilds it: located learners, three testable objectives, a timed plan, and a backwards-derived step sequence with one prerequisite the instructor had forgotten.",
      steps: [
        {
          step: "Teach it badly on purpose",
          detail:
            "Explain a familiar topic from expertise, skipping the obvious. Explain afterwards that this is how most experts teach, because fluency hides the steps.",
        },
        {
          step: "Collect the confusion",
          detail:
            "Ask the class where they lost it and write the answers. Show that the lost point is an earlier step, not the one being explained.",
        },
        {
          step: "Locate the learners",
          detail:
            "Establish what they already know, what they need, and what they will do with it. Explain that teaching the wrong level wastes everyone's time.",
        },
        {
          step: "Handle the mixed class",
          detail:
            "Show teaching to beginners in the explanation and to the advanced in the exercises. Explain that nobody is insulted by clarity, but people are by being held back.",
        },
        {
          step: "Ask the diagnostic question",
          detail:
            "Ask 'what have you tried and where did it stop?' Explain that this reveals the real obstacle, which is usually a missing earlier step.",
        },
        {
          step: "Write three objectives",
          detail:
            "Draft them with observable verbs. Contrast 'understand formulas' with 'write a formula that totals a column and handles blanks'.",
        },
        {
          step: "Test each objective's verb",
          detail:
            "Ask what you would see if a learner achieved it. Strike out any objective whose verb describes a state of mind rather than an action.",
        },
        {
          step: "Cut to the essential few",
          detail:
            "Reduce eight candidate objectives to three. Explain that a lesson with eight teaches none properly because none gets practised.",
        },
        {
          step: "Build the six-part plan",
          detail:
            "Fill in objective, hook, demonstration, guided practice, independent practice and check. Explain that the check is the part most often left out.",
        },
        {
          step: "Demonstrate before explaining",
          detail:
            "Show the finished thing first, then explain how. Explain that seeing the destination makes the route make sense.",
        },
        {
          step: "Write honest timings",
          detail:
            "Allocate time including technical problems and repetition, and mark what to cut if over. Explain that deciding in advance beats deciding in the moment.",
        },
        {
          step: "Work backwards to the steps",
          detail:
            "Ask 'what had to be true just before this?' five times and write the sequence. Highlight the forgotten prerequisite that emerges.",
        },
        {
          step: "Reorder by dependency",
          detail:
            "Rearrange the steps so each concept precedes the tool that uses it. Explain that menu order is an accident of design, not a logic of learning.",
        },
      ],
    },
    practice: {
      title: "Project: create a basic lesson plan",
      brief:
        "You take one topic you know well and build a complete lesson plan for it: located learners, three objectives with observable verbs, a six-part plan with honest timings and a marked cut, and a step sequence derived by working backwards and reordered by dependency.",
      steps: [
        "Choose one topic you know well and could teach in ninety minutes.",
        "Describe your learners: what they already know, what they need, what they will do with it.",
        "Write the question you will ask to find out where they are actually stuck.",
        "Plan how you will handle a mixed-ability class without aiming at the middle.",
        "Write eight candidate objectives, then cut to three.",
        "Check each objective's verb is observable — something you could watch someone do.",
        "Strike out any objective using understand, appreciate, know about or be familiar with.",
        "Write the hook: why they should care in the first five minutes.",
        "Plan the demonstration, showing the finished thing before explaining how.",
        "Plan guided practice with you watching, then independent practice alone.",
        "Write the check: how you will know the objective was achieved.",
        "Allocate timings including technical problems, late arrivals and repetition.",
        "Mark what you will cut if you run out of time.",
        "Work backwards from the finished task, asking what had to be true just before, five times.",
        "Reorder the resulting steps by dependency rather than by menu order.",
        "Confirm each step contains one idea and one action to check it.",
      ],
      standard:
        "A lesson plan with learners located by prior knowledge, need and application, a written diagnostic question, a mixed-ability approach, three objectives all using observable verbs with any state-of-mind verb struck out, all six plan parts present with the demonstration before the explanation and an explicit check, honest timings that include technical problems with a pre-marked cut, and a step sequence derived by working backwards five times then reordered by dependency with one idea and one checking action per step.",
    },
    pitfalls: [
      {
        problem: "You teach from your expertise",
        fix: "Recall what it was like not to know. Fluency hides the steps you took, which is why experts ask 'what do you not understand?' and are genuinely puzzled by the answer.",
      },
      {
        problem: "You follow the plan regardless of the class",
        fix: "Treat the plan as a hypothesis and the class as the test. Teaching to the schedule while people are confused is not discipline, it is not teaching.",
      },
      {
        problem: "You aim at the middle of a mixed class",
        fix: "Teach to beginners in the explanation and to the advanced in the exercises. Aiming at the middle leaves the beginners lost and the advanced bored, satisfying nobody.",
      },
      {
        problem: "You teach the step you planned instead of the one they need",
        fix: "Ask 'what have you tried and where did it stop?' The real obstacle is usually a missing earlier step, and teaching the wrong step well is the most common instructional failure.",
      },
      {
        problem: "Your objectives use unobservable verbs",
        fix: "Write what the learner will be able to do, with a verb you could watch. 'Understand' cannot be checked, so you will never know whether the lesson worked.",
      },
      {
        problem: "You have eight objectives for one session",
        fix: "Cut to three. Each objective needs explanation, demonstration and practice; eight in ninety minutes means none of them gets practised and none of them sticks.",
      },
      {
        problem: "You plan more content than fits",
        fix: "Ninety minutes is roughly fifteen of explanation, twenty of demonstration and thirty of practice, with the rest lost to technical problems and repetition. A finished objective beats a half-covered one.",
      },
      {
        problem: "Your steps follow the software's menu order",
        fix: "Order by dependency: concept before the tool that uses it, tool before the settings that modify it. Menu order produces people who can follow instructions and cannot think.",
      },
    ],
    expertNotes: [
      "Ask learners where they are stuck in their own words before you teach anything. The real obstacle is almost always a missing earlier step, and teaching the step you planned rather than the one they need is the most common failure in instruction.",
      "Write objectives with observable verbs only. 'Understand' and 'appreciate' cannot be checked, which means you will never know whether the lesson worked — and an objective you can watch someone achieve designs its own assessment.",
      "Cut to three objectives per session, however much you know. Each needs explanation, demonstration and practice; eight objectives in ninety minutes means none gets practised and none sticks.",
      "Derive your steps by working backwards from the finished task. Asking 'what had to be true just before this?' five times reliably surfaces a prerequisite you forgot you knew, which is usually exactly where learners get lost.",
    ],
    vocabulary: [
      { term: "Learning objective", meaning: "What the learner will be able to do afterwards. Written with an observable verb so it can be tested." },
      { term: "Observable verb", meaning: "Write, build, calculate, identify, correct. Describes something you can watch, unlike understand or appreciate." },
      { term: "Curse of knowledge", meaning: "Expertise making the steps invisible. The main reason experts struggle to teach beginners." },
      { term: "Prerequisite", meaning: "A skill needed before the next step. Usually a forgotten one, and usually where learners get lost." },
      { term: "Lesson plan", meaning: "Objective, hook, demonstration, guided practice, independent practice, check. A hypothesis to be tested by the class." },
      { term: "Guided practice", meaning: "Learners doing the task with the teacher watching. Where most real learning happens." },
      { term: "Scaffolding", meaning: "Support removed gradually as competence grows. Too much creates dependence; too little creates failure." },
      { term: "Mixed-ability class", meaning: "A group spanning beginner to advanced. Handled by teaching to beginners in explanation and to advanced in exercises." },
    ],
    homework: [
      {
        task: "Write three objectives for one topic",
        detail:
          "All with observable verbs. Test each by asking what you would see if a learner achieved it, and strike out any you cannot answer concretely.",
      },
      {
        task: "Work backwards through a task",
        detail:
          "Take something you can do fluently and ask 'what had to be true just before this?' five times. Note the prerequisite you had forgotten — that is where your learners will get lost.",
      },
      {
        task: "Write a six-part lesson plan",
        detail:
          "Objective, hook, demonstration, guided practice, independent practice, check — with honest timings that include technical problems, and a pre-marked cut.",
      },
      {
        task: "Diagnose a real learner",
        detail:
          "Ask someone learning your subject 'what have you tried and where exactly did it stop working?' Compare their answer with what you assumed they needed.",
      },
    ],
    rubric: [
      {
        criterion: "Learner understanding",
        passing: "Knows the subject.",
        excellent: "Learners located by prior knowledge, need and application, with a written diagnostic question and a real approach to mixed ability.",
      },
      {
        criterion: "Objectives",
        passing: "Has topic headings.",
        excellent: "Three objectives, all with observable verbs, each answerable by what you would watch someone do, cut down from a longer list.",
      },
      {
        criterion: "Lesson plan",
        passing: "Has an outline.",
        excellent: "All six parts present, demonstration before explanation, an explicit check, honest timings including technical problems, and a pre-marked cut.",
      },
      {
        criterion: "Step design",
        passing: "Explains the topic.",
        excellent: "A sequence derived by working backwards five times, reordered by dependency rather than menu order, with one idea and one checking action per step.",
      },
      {
        criterion: "Teaching awareness",
        passing: "Explains clearly.",
        excellent: "Understands the curse of knowledge, treats the plan as a hypothesis tested by the class, and adjusts to confusion rather than following the schedule.",
      },
    ],
    faqs: [
      {
        q: "Do I need a teaching qualification to teach online?",
        a: "No. You need to know the subject, be able to break it into steps, and be willing to adjust to the person in front of you. Plenty of qualified teachers struggle online and plenty of unqualified practitioners teach well, because the skill that matters is making the invisible steps visible again.",
      },
      {
        q: "How do I teach a class with mixed levels?",
        a: "Teach to the beginners in your explanation and to the advanced in your exercises. Explain assuming no prior knowledge, then set tasks with an obvious extension for those who finish early. Nobody is insulted by a clear explanation, but people resent being held back.",
      },
      {
        q: "How many objectives should one lesson have?",
        a: "Two or three, and three is the maximum for ninety minutes. Each objective needs explanation, demonstration and practice. A lesson with eight objectives teaches none of them properly, because none gets enough time to be practised.",
      },
      {
        q: "What if nobody asks questions?",
        a: "Silence online usually means confusion, not agreement — people are reluctant to admit they are lost in front of others. Ask a specific question with a specific answer rather than 'any questions?', or set a short task whose results reveal whether it landed.",
      },
      {
        q: "How much content fits in ninety minutes?",
        a: "Far less than feels right. Roughly fifteen minutes of explanation, twenty of demonstration, thirty of practice and fifteen of questions, with the rest lost to technical problems, late arrivals and repetition. Plan less and finish the objective rather than running over with it half-covered.",
      },
    ],
  },

  "demonstration-practice-assessment": {
    summary:
      "Explanation is the smallest part of teaching. This session covers the three things that actually produce learning — demonstrating so it can be copied, structuring practice so it builds competence, and assessing so you know whether it worked — plus how to give feedback that changes behaviour.",
    objectives: [
      "Demonstrate a task so a learner can reproduce it",
      "Narrate your reasoning, not just your actions",
      "Structure practice from guided to independent",
      "Give feedback that changes what someone does next time",
      "Design assessment that tests doing rather than recall",
      "Produce a complete lesson plan with all three stages",
    ],
    blocks: [
      {
        heading: "Demonstration",
        body: [
          "A demonstration is not showing what you can do; it is **showing what they should do, at a speed they can follow**. The difference is significant. An expert demonstrating fluently is impressive and useless, because the learner cannot separate the essential actions from your personal shortcuts, and cannot see the decisions you are making without thinking about them.",
          "So demonstrate **slowly and deliberately**, doing only what you would tell them to do. Remove the flourishes, the keyboard shortcuts you acquired over years, and the steps you do automatically. If a shortcut is genuinely worth teaching, teach it separately after the basic method works — introducing it during the demonstration means the learner cannot tell which actions matter.",
          "Then **show the finished result first**. Seeing where they are going makes every subsequent step make sense, because the learner has a destination to attach the information to. Demonstrating the process first and revealing the result at the end means the learner holds a sequence of unexplained actions, most of which they will have forgotten by the time the point arrives.",
        ],
      },
      {
        heading: "Narrating your reasoning",
        body: [
          "The most valuable part of a demonstration is not what you do — it is **why**. 'I am clicking here' teaches an action. 'I am clicking here because this is the only place that applies the change to the whole column rather than one cell' teaches a decision, and decisions are what let someone work without you.",
          "Narrate the **choices you did not make** as well as the ones you did. 'You could do this with a filter, but I am using a formula because the data will change and a filter would need reapplying.' That single sentence transfers judgement rather than procedure, and it is the difference between a learner who can follow instructions and one who can solve the next problem you have not shown them.",
          "Then **show a mistake on purpose**. Do something wrong, let it produce the wrong result, and explain how you recognise it and fix it. Learners will make that mistake, and the person who has seen it made and corrected recovers in seconds while the one who has not sits stuck for an hour. It also gives them permission to make mistakes, which matters more than it sounds.",
        ],
      },
      {
        heading: "Practice: guided to independent",
        body: [
          "Practice is where learning actually happens, and it needs a gradient. **Guided practice** first: they do the task with you watching, able to intervene immediately. This is where errors are cheap, because they are caught in seconds rather than practised into habit. Then **supported practice**: they do a variation with the steps visible but you not intervening unless asked. Then **independent practice**: they do it alone, without the steps, which is the only real test of whether it stuck.",
          "The critical rule is that **practice must be slightly harder than the demonstration**. Repeating exactly what you showed produces the illusion of learning — they succeed, everyone feels good, and nothing was learned, because they were following rather than solving. Change one thing: different data, a different goal, a small complication. That change is what forces the understanding rather than the memory.",
          "Then the discipline of **not rescuing too quickly**. When a learner is stuck, the instinct is to take over and fix it, and it is the most counter-productive thing a teacher can do. Ask where they think it went wrong, ask what they expected to happen, ask what they would try next. Thirty seconds of productive struggle teaches more than thirty seconds of watching you fix it, and rescuing teaches them that the answer to difficulty is waiting for you.",
        ],
      },
      {
        heading: "Feedback that changes behaviour",
        body: [
          "Feedback is information about the gap between what was produced and what was wanted. Most feedback fails because it is **evaluative rather than descriptive**: 'good job' and 'this is wrong' both tell the learner where they stand and neither tells them what to do differently. Only the second kind changes the next attempt.",
          "The structure that works has three parts. **What specifically was right** — 'your formula referenced the correct range'. **What specifically was wrong** — 'it used an absolute reference, so it broke when you copied it down'. **What to do next time** — 'use a relative reference when the formula needs to travel'. Specific, actionable, and about the work rather than the person.",
          "Then the timing. **Feedback given immediately after the attempt is worth several times more than feedback given a week later**, because the learner still remembers what they were thinking. This is an argument for reviewing work in class rather than collecting it, and for commenting on the process rather than only the result. And keep it **proportionate**: three specific points land, twelve buries the learner and none of them get acted on.",
        ],
      },
      {
        heading: "Assessment",
        body: [
          "Assessment answers one question: **can they do the thing?** Not can they describe it, not did they attend, not do they seem to have understood. The most common assessment mistake is testing recall of what was taught rather than the ability the objective stated — a quiz about formulas when the objective was writing them.",
          "So assess by **asking for the thing**. If the objective was 'write a formula that totals a column and handles blanks', the assessment is a column with blanks in it and a request to total it. Not a question about what SUM does. Performance assessment is harder to mark and far more informative, and for a practical subject it is the only kind that means anything.",
          "Then make it **low-stakes and frequent**. A large test at the end tells you too late to help anyone. Small checks during the lesson — a quick task everyone does, a question with a specific answer, a screenshot of their screen — tell you in the moment whether to move on or go back, which is the only time that information is useful. And state the standard in advance, so the learner knows what success looks like before attempting rather than guessing.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor demonstrates one task properly — result first, slow, narrating the reasoning and the rejected alternatives, with a deliberate mistake — then runs guided, supported and independent practice, gives three-part feedback live, and designs an assessment that asks for the thing rather than recall of it.",
      steps: [
        {
          step: "Show the finished result first",
          detail:
            "Display the completed outcome before any explanation. Explain that a destination makes every subsequent step make sense.",
        },
        {
          step: "Demonstrate slowly",
          detail:
            "Do only what you would tell them to do, removing shortcuts and automatic steps. Explain that fluency hides which actions actually matter.",
        },
        {
          step: "Narrate the reasoning",
          detail:
            "Say why each action, not just what it is. Explain that 'I click here' teaches an action while 'because this applies to the whole column' teaches a decision.",
        },
        {
          step: "Narrate the rejected alternative",
          detail:
            "Explain the option not taken and why. Explain that this transfers judgement rather than procedure.",
        },
        {
          step: "Make a deliberate mistake",
          detail:
            "Do it wrong, show the wrong result, and fix it while explaining how you recognised it. Explain that learners who have seen a mistake corrected recover in seconds.",
        },
        {
          step: "Run guided practice",
          detail:
            "Set the same task with the class doing it while you watch. Explain that errors are cheap here because they are caught in seconds.",
        },
        {
          step: "Refuse to rescue",
          detail:
            "When someone is stuck, ask where they think it went wrong instead of taking over. Explain that thirty seconds of struggle teaches more than watching you fix it.",
        },
        {
          step: "Run supported practice",
          detail:
            "Set a variation with the steps visible but no intervention. Explain that this is the bridge between copying and solving.",
        },
        {
          step: "Make practice harder than the demo",
          detail:
            "Change the data, the goal or add a complication. Explain that repeating the demonstration exactly produces the illusion of learning.",
        },
        {
          step: "Run independent practice",
          detail:
            "Set the task with no steps available. Explain that this is the only real test of whether it stuck.",
        },
        {
          step: "Give three-part feedback",
          detail:
            "Say what was right, what was wrong and what to do next time, all specifically. Contrast with 'good job' and explain why evaluation alone changes nothing.",
        },
        {
          step: "Keep feedback proportionate",
          detail:
            "Give three points, not twelve. Explain that three land and twelve bury the learner so none get acted on.",
        },
        {
          step: "Design the assessment",
          detail:
            "Ask for the thing the objective stated rather than recall about it. Show the recall quiz beside it and explain what it fails to tell you.",
        },
      ],
    },
    practice: {
      title: "Project: create a basic lesson plan",
      brief:
        "You build a complete lesson plan for one topic containing a properly structured demonstration, a three-stage practice gradient with each stage harder than the last, three-part feedback templates, and an assessment that asks for the thing the objective stated rather than recall of it.",
      steps: [
        "State one learning objective with an observable verb.",
        "Plan the demonstration to show the finished result before the process.",
        "Write the slow version: only what you would tell them to do, no shortcuts.",
        "Write the reasoning you will narrate for each key action.",
        "Write one rejected alternative and why you did not take it.",
        "Plan one deliberate mistake, how you will recognise it and how you will fix it.",
        "Design guided practice: the same task with you watching.",
        "Write the questions you will ask a stuck learner instead of taking over.",
        "Design supported practice: a variation with steps visible and no intervention.",
        "Design independent practice: the task with no steps available.",
        "Confirm each stage is slightly harder than the one before it.",
        "Write a three-part feedback template: what was right, what was wrong, what next.",
        "Draft two examples of that feedback for work you expect to see.",
        "Decide when feedback happens, and make it immediate rather than collected.",
        "Design the assessment: a task asking for the thing, not a question about it.",
        "Write the standard you will state in advance so learners know what success looks like.",
      ],
      standard:
        "A lesson plan whose demonstration shows the result first, proceeds slowly without shortcuts, narrates reasoning and one rejected alternative, and includes a deliberate mistake with its recognition and fix; three practice stages each slightly harder than the last, with written questions for a stuck learner instead of rescue; a three-part feedback template with two worked examples and immediate timing; and an assessment that asks for the thing the objective stated with the success standard written in advance.",
    },
    pitfalls: [
      {
        problem: "You demonstrate at your own fluent speed",
        fix: "Slow down and do only what you would tell them to do. An expert demonstrating fluently is impressive and useless, because the learner cannot separate essential actions from your personal shortcuts.",
      },
      {
        problem: "You reveal the result only at the end",
        fix: "Show the finished thing first. Without a destination the learner holds a sequence of unexplained actions, most of which are forgotten before the point arrives.",
      },
      {
        problem: "You narrate actions instead of reasoning",
        fix: "Say why, and say what you did not do and why. Actions teach procedure; reasoning and rejected alternatives transfer judgement, which is what lets someone work without you.",
      },
      {
        problem: "You never make a mistake in front of the class",
        fix: "Make one deliberately and fix it while explaining how you recognised it. Learners will make it, and the one who has seen it corrected recovers in seconds instead of sitting stuck.",
      },
      {
        problem: "Your practice repeats the demonstration exactly",
        fix: "Change the data, the goal or add a complication. Repeating what you showed produces the illusion of learning — everyone succeeds and nothing was learned.",
      },
      {
        problem: "You rescue stuck learners immediately",
        fix: "Ask where they think it went wrong, what they expected, what they would try next. Rescuing teaches them that the answer to difficulty is waiting for you, and teaches you nothing about where they are lost.",
      },
      {
        problem: "Your feedback is evaluative",
        fix: "Say what was specifically right, what was specifically wrong, and what to do next time. 'Good job' and 'this is wrong' both tell someone where they stand and neither changes the next attempt.",
      },
      {
        problem: "Your assessment tests recall",
        fix: "Ask for the thing the objective stated. A quiz about what SUM does tells you nothing about whether someone can write a formula that handles blanks, which was the objective.",
      },
    ],
    expertNotes: [
      "Show the finished result before the process, every time. A learner with a destination attaches every step to something; a learner without one holds a sequence of unexplained actions and forgets most of it before the point arrives.",
      "Narrate your reasoning and your rejected alternatives. This is what transfers judgement rather than procedure, and it is the difference between a learner who can follow your instructions and one who can solve the next problem you never showed them.",
      "Make each practice stage slightly harder than the one before. Repeating the demonstration exactly produces success and no learning; one change of data or goal forces understanding rather than memory.",
      "Ask questions instead of rescuing a stuck learner. Thirty seconds of productive struggle teaches more than watching you fix it, and rescuing teaches them that difficulty means waiting for you.",
    ],
    vocabulary: [
      { term: "Demonstration", meaning: "Showing what the learner should do at a speed they can follow. Not showing what you can do." },
      { term: "Narrated reasoning", meaning: "Saying why each action, including alternatives rejected. Transfers judgement rather than procedure." },
      { term: "Guided practice", meaning: "The learner doing the task with the teacher watching. Errors are cheap because they are caught in seconds." },
      { term: "Independent practice", meaning: "The task done alone without steps. The only real test of whether it stuck." },
      { term: "Desirable difficulty", meaning: "Practice slightly harder than the demonstration. Feels worse and produces far more learning." },
      { term: "Descriptive feedback", meaning: "What was right, what was wrong, what to do next. Changes the next attempt, unlike evaluation." },
      { term: "Performance assessment", meaning: "Asking for the thing rather than recall about it. Harder to mark and far more informative." },
      { term: "Formative check", meaning: "A low-stakes check during the lesson. Tells you whether to move on while the information is still useful." },
    ],
    homework: [
      {
        task: "Rewrite one demonstration",
        detail:
          "Take something you have explained before and restructure it: result first, slow, reasoning narrated for each key action, one rejected alternative, one deliberate mistake.",
      },
      {
        task: "Design a three-stage practice gradient",
        detail:
          "Guided, supported, independent — each slightly harder than the last. Confirm that the first is not simply a repeat of your demonstration.",
      },
      {
        task: "Write three-part feedback",
        detail:
          "For two pieces of work you expect to see: what was specifically right, what was specifically wrong, what to do next time. Three points each, no more.",
      },
      {
        task: "Replace a quiz with a task",
        detail:
          "Take a recall question you would have asked and rewrite it as a task asking for the thing. Note how much more it tells you about whether the objective was achieved.",
      },
    ],
    rubric: [
      {
        criterion: "Demonstration design",
        passing: "Shows how to do it.",
        excellent: "Result shown first, slow with no shortcuts, reasoning narrated for each key action, one rejected alternative explained, and a deliberate mistake corrected on screen.",
      },
      {
        criterion: "Practice structure",
        passing: "Sets an exercise.",
        excellent: "Three stages from guided to independent, each slightly harder than the last, with the first genuinely different from the demonstration rather than a repeat.",
      },
      {
        criterion: "Handling difficulty",
        passing: "Helps when asked.",
        excellent: "Asks diagnostic questions rather than taking over, keeping the learner working, with the questions written in advance.",
      },
      {
        criterion: "Feedback",
        passing: "Marks the work.",
        excellent: "Three-part descriptive feedback — right, wrong, next — kept to three points, given immediately rather than collected for later.",
      },
      {
        criterion: "Assessment",
        passing: "Tests the material.",
        excellent: "A task asking for the thing the objective stated, with the success standard written in advance and low-stakes checks during the lesson rather than one test at the end.",
      },
    ],
    faqs: [
      {
        q: "How slow should a demonstration be?",
        a: "Slow enough that a beginner could copy it in real time, which feels embarrassingly slow to an expert. Do only what you would tell them to do and leave shortcuts out — teach those separately once the basic method works, or the learner cannot tell which actions matter.",
      },
      {
        q: "Should I show my mistakes?",
        a: "Deliberately, yes. Make one on purpose, show the wrong result, and explain how you recognise and fix it. Learners will make that mistake, and the one who has seen it corrected recovers in seconds while the one who has not sits stuck for an hour.",
      },
      {
        q: "How do I stop myself taking over when someone is stuck?",
        a: "Ask three questions in order: where do you think it went wrong, what did you expect to happen, what would you try next? Thirty seconds of productive struggle teaches more than watching you fix it, and rescuing teaches them that difficulty means waiting for you.",
      },
      {
        q: "How much feedback should I give?",
        a: "Three specific points: what was right, what was wrong, and what to do next time. Three land and get acted on; twelve bury the learner and none of them change anything. Give it immediately, while they still remember what they were thinking.",
      },
      {
        q: "Is a quiz ever the right assessment?",
        a: "For factual recall — terminology, shortcuts, safety rules — yes. For a practical objective, no. If the objective was writing a formula, the assessment is a column of data with blanks in it, not a question about what a function does.",
      },
    ],
  },

  "running-an-online-classroom": {
    summary:
      "Teaching online is not teaching in a room with a camera. This session covers running a real online classroom: video meetings, screen sharing, presentations, digital whiteboards, recording — and handling the technical failures that decide whether a lesson happens at all.",
    objectives: [
      "Set up a video meeting platform properly for teaching rather than chatting",
      "Share your screen usefully, including what not to show",
      "Build presentations that support teaching rather than replace it",
      "Use a digital whiteboard to explain rather than decorate",
      "Record lessons correctly and decide what to publish",
      "Handle technical failure without losing the class",
    ],
    blocks: [
      {
        heading: "Choosing and setting up the platform",
        body: [
          "The platform matters less than people think, but the settings matter a great deal. **Zoom, Google Meet and Microsoft Teams** all handle teaching; the differences are in free-tier limits, participant numbers and recording. For a Nigerian context the practical considerations are **data consumption** — video-heavy meetings are expensive for students on mobile data — **low-bandwidth behaviour**, and whether students can join **from a phone** without installing anything.",
          "Then the settings that make it a classroom rather than a call. **Mute on entry**, because late arrivals with unmuted microphones destroy lessons. **Waiting room or locked meeting**, because an open link gets joined by strangers and occasionally disrupted deliberately. **Chat enabled**, because it is how quiet students ask questions they will not ask aloud, and it is often where the real confusion surfaces. **Screen share restricted to host** by default, opened deliberately when a student needs to show their work.",
          "Send the link with **the time in a specific zone and the topic named**, and send a reminder. This sounds trivial and it determines attendance: a message that says 'class at 6' produces half the attendance of one that says 'Excel formulas, Tuesday 6pm WAT, same link as last week'. Ambiguity is the enemy of attendance, and attendance is the precondition for everything else.",
        ],
      },
      {
        heading: "Screen sharing",
        body: [
          "Screen sharing is the core teaching tool online, and most people use it badly. **Share one window rather than your whole screen** where the platform allows it — it keeps the class focused on the relevant thing, it prevents notifications appearing publicly, and it stops you accidentally revealing an inbox, a bank balance or a private message.",
          "Then **prepare the screen before the class**. Close irrelevant tabs, turn off notifications entirely rather than relying on do-not-disturb, increase the text size so it is readable on a phone, and have the files you need already open. Most sharing problems are not technical — they are the forty seconds spent hunting for a file while twenty people watch, and the private information glimpsed while looking for it.",
          "**Share audio deliberately** if the lesson needs it, and **check what students actually see**. Ask someone to confirm the text is readable, because what is clear on your laptop is often tiny on a phone, and most of your students are on phones. If you are demonstrating software, slow down: screen sharing has latency, and a click that seems instant to you arrives a second later for them.",
        ],
      },
      {
        heading: "Presentations that teach",
        body: [
          "A teaching presentation is not a document. The failure mode is a slide full of sentences that the teacher reads aloud, which is worse than no slide at all — the class reads faster than you speak, so they are either reading ahead and not listening, or listening and missing the slide. **Never put on a slide what you intend to say.**",
          "The rule that fixes it: **one idea per slide, expressed visually or in a few words, with the explanation spoken**. A diagram, a screenshot with one thing circled, a short phrase, a large number. The slide carries the anchor and your voice carries the meaning. If a slide works without you speaking, it is a document rather than a teaching aid, and it should be sent as a handout instead.",
          "Then the practical details. **Large text** — readable on a phone, which means far larger than feels necessary. **High contrast**, because low contrast disappears on a cheap screen in bright light. **Build slides progressively** rather than showing everything at once, so attention goes where you are talking. And **number your slides**, because 'go back to the one about the formula' is impossible otherwise and it will be asked.",
        ],
      },
      {
        heading: "Digital whiteboards",
        body: [
          "A whiteboard is for **thinking out loud in front of the class**, which is something a prepared slide cannot do. Its value is that it appears gradually, in response to what the class needs, and it can be changed when someone is confused. A diagram built live while you explain it teaches far better than the same diagram shown complete, because the class follows the reasoning rather than receiving the conclusion.",
          "Keep it simple. Boxes, arrows, labels and a highlighter are enough for almost any explanation. Elaborate drawings waste time and add nothing, and the class is watching you struggle with the pen tool rather than thinking about the concept. **Write large**, because handwriting on a shared screen is much harder to read than typed text, and **write less** than you would in person, because small handwriting on a phone screen is illegible.",
          "The whiteboard also solves a specific online problem: **it gives you somewhere to put a student's question**. When someone asks something, writing it on the board makes it shared rather than private, which means the other four people who had the same question get it answered too. That single habit is one of the largest differences between a good online class and a lecture with a chat box.",
        ],
      },
      {
        heading: "Recording, and when things fail",
        body: [
          "**Recording** lets absent students catch up and lets present ones revisit difficult parts, which is a genuine advantage of teaching online. But three things must be handled. **Tell people you are recording**, because consent matters and in some contexts it is a legal requirement under Nigeria's data protection framework. **Check the recording actually saved** — a lesson discovered missing a week later is unrecoverable. And **consider what the recording contains**, because anything on your screen during it is now permanent: notifications, names, marks, private messages.",
          "Then the failures, which are certain rather than possible. **Your connection drops.** Have a backup: mobile data ready as a hotspot, and a message pre-written to send by WhatsApp telling the class what to do. **The platform fails.** Know a second one well enough to move the class in two minutes. **A student cannot hear you.** Ask the class to confirm audio at the start rather than discovering it twenty minutes in, which is when it is usually found.",
          "The principle is that **the lesson must survive the technology**. Have the materials downloadable rather than only on your screen, have an asynchronous fallback — a screen recording and a written summary sent to the group — and do not spend the class apologising. A calm 'we have lost the connection, I will send the recording and we will pick up on Tuesday' is professional; ten minutes of 'can you hear me now?' is not, and the class remembers which one you did.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor sets up a real classroom session: platform settings for teaching, a screen prepared and shared as a single window, a slide rebuilt from a paragraph into a visual anchor, a diagram built live on a whiteboard, a recording started and verified, then a simulated connection failure handled with a pre-written fallback.",
      steps: [
        {
          step: "Compare the platforms",
          detail:
            "Set out free-tier limits, data consumption and phone-only joining. Explain that for most Nigerian classes, data cost and mobile access decide the choice.",
        },
        {
          step: "Set the classroom settings",
          detail:
            "Enable mute on entry, a waiting room or locked meeting, chat, and host-only screen share. Explain that an open link gets joined by strangers.",
        },
        {
          step: "Write the invitation properly",
          detail:
            "Name the topic, state the time with the zone, include the link and send a reminder. Explain that ambiguity is the main cause of poor attendance.",
        },
        {
          step: "Prepare the screen",
          detail:
            "Close tabs, disable notifications entirely, increase text size, open the files in advance. Explain that most sharing problems are hunting for files, not technical faults.",
        },
        {
          step: "Share one window, not the screen",
          detail:
            "Demonstrate the difference and explain that whole-screen sharing exposes notifications, inboxes and private information.",
        },
        {
          step: "Verify what students see",
          detail:
            "Ask a participant to confirm the text is readable on a phone. Explain that most students are on phones and what is clear on a laptop is tiny there.",
        },
        {
          step: "Rebuild a slide",
          detail:
            "Take a paragraph-filled slide and reduce it to one idea with a visual anchor. Explain that if a slide works without you speaking it is a handout.",
        },
        {
          step: "Set the slide basics",
          detail:
            "Enlarge text, raise contrast, build progressively and number the slides. Explain that 'go back to the one about the formula' is impossible without numbers.",
        },
        {
          step: "Build a diagram live",
          detail:
            "Draw boxes, arrows and labels while explaining. Explain that a diagram built live teaches the reasoning while a complete one delivers only the conclusion.",
        },
        {
          step: "Put a question on the board",
          detail:
            "Take a student's question and write it up. Explain that this makes it shared, so the others who had the same question get it answered too.",
        },
        {
          step: "Start and verify the recording",
          detail:
            "Begin recording, announce it to the class, and confirm afterwards that the file saved. Explain that a missing recording discovered a week later is unrecoverable.",
        },
        {
          step: "Simulate a failure",
          detail:
            "Drop the connection and run the fallback: hotspot, pre-written WhatsApp message, downloadable materials. Explain that the lesson must survive the technology.",
        },
        {
          step: "Check audio at the start",
          detail:
            "Ask the class to confirm they can hear before teaching anything. Explain that audio problems are usually discovered twenty minutes in, when the time is already lost.",
        },
      ],
    },
    practice: {
      title: "Run a real online classroom session",
      brief:
        "You set up and run a short live session: platform configured for teaching, screen prepared and shared as a single window, one slide rebuilt from a paragraph into a visual anchor, a diagram built live on a whiteboard, a recording started, announced and verified — plus a written fallback plan for connection failure that you actually test.",
      steps: [
        "Choose a platform based on data cost and whether students can join from a phone.",
        "Enable mute on entry, a waiting room or locked meeting, chat, and host-only sharing.",
        "Write the invitation with the topic named, the time with its zone, and the link.",
        "Send a reminder before the session.",
        "Close irrelevant tabs and disable notifications entirely before starting.",
        "Increase the text size so it is readable on a phone and open all files in advance.",
        "Share one window rather than your whole screen.",
        "Ask a participant to confirm the text is readable on their device.",
        "Rebuild one paragraph-filled slide into a single idea with a visual anchor.",
        "Enlarge the text, raise the contrast, and number every slide.",
        "Build a diagram live on a whiteboard using boxes, arrows and labels only.",
        "Write a student's question on the board so the whole class sees it answered.",
        "Announce that you are recording, then start the recording.",
        "Confirm audio with the class before teaching any content.",
        "Verify after the session that the recording saved and is playable.",
        "Write a fallback plan: hotspot ready, pre-written message, downloadable materials, second platform.",
        "Test the fallback by actually disconnecting once.",
      ],
      standard:
        "A live session run on a platform chosen for data cost and phone access, configured with mute on entry, a locked meeting or waiting room, chat and host-only sharing, invited with topic, zoned time and link plus a reminder, with tabs closed, notifications disabled, text enlarged and files pre-opened, one window shared and its legibility confirmed by a participant, one slide rebuilt into a single visual anchor with all slides numbered, a diagram built live from boxes, arrows and labels, a student question written on the board, the recording announced and started and later verified as saved and playable, audio confirmed before content, and a fallback plan written and actually tested by disconnecting.",
    },
    pitfalls: [
      {
        problem: "You left the meeting open with default settings",
        fix: "Enable mute on entry and a waiting room or locked meeting. An open link gets joined by strangers and occasionally disrupted deliberately, which ends the lesson for everyone.",
      },
      {
        problem: "You share your whole screen",
        fix: "Share one window. Whole-screen sharing exposes notifications, inboxes, balances and private messages to the whole class, and that cannot be undone.",
      },
      {
        problem: "You hunt for files while the class watches",
        fix: "Open everything in advance and disable notifications entirely. Most screen-sharing problems are not technical faults but forty seconds of searching while twenty people wait.",
      },
      {
        problem: "You never check what students actually see",
        fix: "Ask a participant to confirm the text is readable on their phone. Most students are on phones, and what is clear on your laptop is tiny on a small screen in bright light.",
      },
      {
        problem: "Your slides are paragraphs you read aloud",
        fix: "One idea per slide, expressed visually, with the explanation spoken. If a slide works without you speaking it is a handout and should be sent as one.",
      },
      {
        problem: "You show complete diagrams instead of building them",
        fix: "Draw live on a whiteboard. A diagram that appears as you explain teaches the reasoning; the same diagram shown complete delivers only the conclusion.",
      },
      {
        problem: "You recorded without telling anyone, or never checked it saved",
        fix: "Announce the recording and verify the file afterwards. Consent matters and may be legally required, and a missing recording discovered a week later is unrecoverable.",
      },
      {
        problem: "You have no plan for a connection failure",
        fix: "Prepare a hotspot, a pre-written message, downloadable materials and a second platform. The lesson must survive the technology, and ten minutes of 'can you hear me now?' is not a plan.",
      },
    ],
    expertNotes: [
      "Choose your platform on data cost and phone access rather than features. Most Nigerian students are on mobile data and a phone, and a technically superior platform that costs them too much to join will have an empty classroom.",
      "Share one window, never your whole screen. It keeps attention on the relevant thing and it prevents the notifications, messages and balances that cannot be unseen once shared.",
      "Never put on a slide what you intend to say. One visual anchor per slide with the meaning carried by your voice, because a class that reads ahead of you is a class that is not listening to you.",
      "Test your fallback before you need it. Connection failures are certain rather than possible, and a plan you have actually rehearsed keeps the class calm while an unrehearsed one turns a two-minute problem into a lost lesson.",
    ],
    vocabulary: [
      { term: "Mute on entry", meaning: "Arrivals joining muted. Prevents late-arrival noise from destroying the lesson." },
      { term: "Waiting room", meaning: "A holding area before admission. Stops strangers joining an open link." },
      { term: "Window sharing", meaning: "Sharing one application rather than the whole screen. Focuses attention and protects private information." },
      { term: "Visual anchor", meaning: "The one image or phrase on a slide that the spoken explanation attaches to. Not a paragraph." },
      { term: "Digital whiteboard", meaning: "A surface for thinking out loud. Its value is that it appears gradually and can change when someone is confused." },
      { term: "Latency", meaning: "Delay between your action and the student seeing it. Why demonstrations must be slower online than in person." },
      { term: "Asynchronous fallback", meaning: "A recording plus written summary for when the live session fails. What makes the lesson survive the technology." },
      { term: "Recording consent", meaning: "Telling the class you are recording. An ethical obligation and in some contexts a legal one." },
    ],
    homework: [
      {
        task: "Configure your platform for teaching",
        detail:
          "Mute on entry, waiting room or locked meeting, chat enabled, host-only screen sharing. Then write the invitation properly: topic named, time with its zone, link included.",
      },
      {
        task: "Rebuild three slides",
        detail:
          "Take three paragraph-filled slides and reduce each to one idea with a visual anchor. Enlarge the text, raise the contrast, and number them.",
      },
      {
        task: "Run a fifteen-minute test session",
        detail:
          "Share one window, confirm legibility with a real participant on a phone, build one diagram live on a whiteboard, and record it. Verify afterwards that the file saved.",
      },
      {
        task: "Write and test your fallback plan",
        detail:
          "Hotspot ready, pre-written message to the group, materials downloadable, second platform known. Then actually disconnect once and run it.",
      },
    ],
    rubric: [
      {
        criterion: "Platform setup",
        passing: "Can start a meeting.",
        excellent: "Chosen for data cost and phone access, with mute on entry, a locked meeting or waiting room, chat, host-only sharing, and a properly written invitation with a reminder.",
      },
      {
        criterion: "Screen sharing",
        passing: "Shares the screen.",
        excellent: "One window rather than the whole screen, tabs closed, notifications disabled, text enlarged, files pre-opened, and legibility confirmed by a participant on a phone.",
      },
      {
        criterion: "Presentations",
        passing: "Has slides.",
        excellent: "One visual anchor per slide with nothing written that will be spoken, large high-contrast text, progressive build, and every slide numbered.",
      },
      {
        criterion: "Whiteboard use",
        passing: "Can draw on it.",
        excellent: "Diagrams built live from boxes, arrows and labels to show reasoning, written large, with student questions written up so the whole class benefits.",
      },
      {
        criterion: "Recording and resilience",
        passing: "Records sometimes.",
        excellent: "Recording announced and verified as saved, audio confirmed before content, and a fallback plan written and actually tested by disconnecting.",
      },
    ],
    faqs: [
      {
        q: "Which platform should I use?",
        a: "Whichever your students can join cheaply from a phone. Zoom, Google Meet and Teams all teach fine; the deciding factors in Nigeria are data consumption, free-tier limits and whether joining needs an app installed. A superior platform with an empty classroom is not superior.",
      },
      {
        q: "Should I record my lessons?",
        a: "Yes — absent students catch up and present ones revisit difficult parts. But announce that you are recording, verify afterwards that the file actually saved, and think about what your screen contained, because notifications and private information become permanent in a recording.",
      },
      {
        q: "My students cannot see my screen clearly. What is wrong?",
        a: "Probably text size rather than connection. Most students are on phones, and what is readable on a laptop is tiny on a small screen in bright light. Increase the text size, raise the contrast, and ask a participant to confirm what they actually see.",
      },
      {
        q: "How do I stop people joining and disrupting my class?",
        a: "Use a waiting room or lock the meeting once the class has arrived, and never post the link publicly. Also restrict screen sharing to the host by default, since an unexpected sharer is the most common form of disruption in an open meeting.",
      },
      {
        q: "What do I do when my connection drops mid-lesson?",
        a: "Execute the plan you prepared: switch to a mobile hotspot, send the pre-written message to the group telling them what to do, and fall back to a recording plus written summary. Do not spend the class apologising — a calm fallback is professional and the class remembers which one you did.",
      },
    ],
  },
};
