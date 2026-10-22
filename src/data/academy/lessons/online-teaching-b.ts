import type { SessionLecture } from "../types";

/**
 * Online Teaching — ₦15,000 · 3 weeks · 6 sessions.
 * Sessions 4 to 6. (Sessions 1–3 in online-teaching.ts.)
 */
export const onlineTeachingLessonsB: Record<string, SessionLecture> = {
  "materials-assignments-quizzes": {
    summary:
      "What you give students to read, do and be tested on determines more of their learning than what you say in class. This session covers making materials that get used, designing assignments that teach rather than occupy, building quizzes that diagnose, and communicating so students are never guessing.",
    objectives: [
      "Create teaching materials students actually open and use",
      "Design assignments that build competence rather than fill time",
      "Write quiz questions that diagnose misunderstanding",
      "Communicate clearly so no student has to guess what to do",
      "Handle questions, lateness and non-completion consistently",
      "Build a reusable materials system instead of starting fresh",
    ],
    blocks: [
      {
        heading: "Materials that get used",
        body: [
          "Most teaching materials are never opened, and the reason is that they are written as **records of the lesson** rather than as **tools for the learner**. A forty-slide deck sent after class is a transcript nobody reads. A one-page sheet with the steps, the shortcuts and one worked example gets opened the next day when the student is actually trying to do the thing.",
          "So design materials for the moment of use. Ask: **when will they open this, and what will they be trying to do?** The answer shapes everything. A reference sheet needs the steps in order with the key commands bolded. A worked example needs the reasoning shown, not just the answer. A checklist needs to be short enough to hold in the head while working.",
          "Then the constraint that makes materials good: **one page**. Not as an arbitrary rule but because a page forces you to decide what actually matters, and because a student will open one page and will not open twelve. If it genuinely needs more, split it into separate one-page tools for separate tasks rather than one document that tries to cover the course.",
        ],
      },
      {
        heading: "Designing assignments",
        body: [
          "An assignment is not busywork, and the test is whether completing it makes the student more capable of doing the thing. **'Watch this video and summarise it'** produces summarising, not competence. **'Total this column of real sales figures and flag any month that looks wrong'** produces the skill the lesson was about, plus the judgement that goes with it.",
          "The structure that works has three parts. **The task**, stated as something they would do in real life rather than as an exercise about the software. **The materials**, provided rather than left to be hunted — data files, starter documents, screenshots. **The standard**, stated in advance: what a correct submission looks like, so the student can check their own work before sending it.",
          "Then **make it slightly harder than the lesson**, for the same reason practice must be. An assignment that repeats the demonstration exactly can be completed by copying and teaches nothing. Change the data, change the goal, add one complication. And **size it honestly**: an assignment taking three hours in a class of working adults will not be completed, and an uncompleted assignment teaches less than a shorter completed one.",
        ],
      },
      {
        heading: "Quizzes that diagnose",
        body: [
          "A quiz has two possible purposes and they produce different questions. **Checking recall** — did they retain the facts? — is occasionally useful. **Diagnosing misunderstanding** — where exactly does their thinking go wrong? — is what actually helps you teach, and it is what most quizzes fail at.",
          "The technique that produces diagnostic questions is **writing the wrong answers from real errors**. For a formula question, the distractors should be the mistakes students actually make: referencing one cell instead of the range, using an absolute reference where a relative one was needed, forgetting to handle blanks. A student who chooses one of those has told you precisely what they misunderstand, and you can fix that specifically. Random plausible-looking wrong answers tell you only that they did not know.",
          "Then the format. **Short, frequent and low-stakes** beats long and heavily weighted, because a quiz at the end tells you too late to help anyone. Three questions at the start of the next lesson, based on what confused people last time, tells you in the moment whether to move on or go back. And **explain every answer** when you review it, including the right one — the explanation is where the learning happens, and a score without an explanation is just a number.",
        ],
      },
      {
        heading: "Student communication",
        body: [
          "Most student confusion is not about the subject; it is about **what they are supposed to do**. Unclear instructions produce silent non-compliance — the student does not ask, they simply do not do it, and you conclude they are uncommitted. The fix is to write instructions that remove every guess: what to do, using what, producing what, by when, and where to send it.",
          "Then **one channel, checked predictably**. Scattered instructions across WhatsApp, email and the meeting chat guarantee that someone misses something. Choose one place for announcements and one for questions, state which is which, and check them at stated times. Students do not need instant replies; they need to know when a reply will come.",
          "And **answer the question everyone has**. When one student asks something in the group, answer it publicly rather than privately, because three others had the same question and only one asked. The same applies to a mistake you made in the materials: correct it to the whole group rather than quietly fixing the file. Students forgive errors readily; they resent discovering them alone.",
        ],
      },
      {
        heading: "Consistency, lateness and building a system",
        body: [
          "Handling late work, absence and non-completion consistently matters more than the specific policy. **A strict policy applied evenly is respected; a lenient policy applied unevenly is resented**, because students can tell who got the exception and why. Decide your rule before the first late submission, state it at the start, and apply it to everyone including the sympathetic case — with a genuine emergency handled as an exception announced as such, not as a quiet favour.",
          "For non-completion, the useful response is **diagnostic rather than disciplinary**. Ask what got in the way, because the answer is usually one of three things: the task was too long, the instructions were unclear, or the student is lost. All three are yours to fix, and treating them as laziness loses the student and the information.",
          "Finally, **build the materials as a reusable system** rather than per class. A template for the one-page reference sheet, a bank of quiz questions with real-error distractors, a standard assignment structure with a slot for the task and the data. It costs more the first time and much less every time after, and it is what makes teaching sustainable alongside everything else you do.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor rebuilds a real set of class materials live: a forty-slide deck reduced to a one-page reference, an assignment rewritten from an exercise into a real task with materials and a stated standard, a quiz rebuilt with distractors drawn from actual student errors, and an instruction set rewritten so nothing has to be guessed.",
      steps: [
        {
          step: "Show the unused deck",
          detail:
            "Display a forty-slide post-class deck and ask who would open it. Explain that it was written as a record of the lesson rather than a tool for the learner.",
        },
        {
          step: "Ask when it will be used",
          detail:
            "Establish when the student will open the material and what they will be trying to do. Explain that this question shapes everything that follows.",
        },
        {
          step: "Reduce to one page",
          detail:
            "Cut the deck to steps in order, key commands bolded, one worked example. Explain that one page forces the decision about what matters.",
        },
        {
          step: "Add the worked example",
          detail:
            "Show the reasoning, not just the answer. Explain that an answer without reasoning cannot be applied to a slightly different problem.",
        },
        {
          step: "Show the bad assignment",
          detail:
            "Display 'watch the video and summarise it' and explain that it produces summarising rather than the competence the lesson was about.",
        },
        {
          step: "Rewrite it as a real task",
          detail:
            "Set a task someone would do in real life, with real data. Explain that the shift from exercise to task is what makes an assignment teach.",
        },
        {
          step: "Provide the materials",
          detail:
            "Attach the data files and starter documents. Explain that leaving students to hunt for materials is where assignments quietly die.",
        },
        {
          step: "State the standard",
          detail:
            "Show what a correct submission looks like before it is attempted. Explain that this lets students check their own work before sending.",
        },
        {
          step: "Size it honestly",
          detail:
            "Estimate the time and cut it for a class of working adults. Explain that an uncompleted assignment teaches less than a shorter completed one.",
        },
        {
          step: "Rebuild the quiz distractors",
          detail:
            "Replace plausible-looking wrong answers with the errors students actually make. Explain that a chosen distractor names the misunderstanding precisely.",
        },
        {
          step: "Make the quiz frequent",
          detail:
            "Move from one end-of-course test to three questions at the start of the next lesson. Explain that an end test tells you too late to help anyone.",
        },
        {
          step: "Rewrite the instructions",
          detail:
            "State what to do, using what, producing what, by when and where to send it. Explain that unclear instructions produce silent non-compliance.",
        },
        {
          step: "Set the communication rules",
          detail:
            "Choose one announcement channel and one for questions, with stated checking times. Explain that students need to know when a reply comes rather than get one instantly.",
        },
      ],
    },
    practice: {
      title: "Build a complete materials set",
      brief:
        "For one lesson you have taught or will teach, you produce a one-page reference sheet with a worked example, an assignment framed as a real task with materials attached and the standard stated, a five-question quiz whose distractors are drawn from real student errors with explanations for every answer, and an instruction set in which nothing has to be guessed.",
      steps: [
        "State the lesson's learning objective with an observable verb.",
        "Write down when students will open your material and what they will be trying to do.",
        "Reduce whatever you currently send to one page: steps in order, key commands bolded.",
        "Add one worked example showing the reasoning, not only the answer.",
        "Write the assignment as a task someone would do in real life.",
        "Make it slightly harder than the lesson: new data, a new goal, or one complication.",
        "Attach every material needed — data files, starter documents, screenshots.",
        "State the standard: what a correct submission looks like.",
        "Estimate the time honestly and cut it to suit a class of working adults.",
        "Write five quiz questions on the objective.",
        "Build each distractor from an error students actually make, not a plausible guess.",
        "Write an explanation for every answer, including the correct one.",
        "Decide when the quiz happens, and make it early and low-stakes.",
        "Write the instructions: what, using what, producing what, by when, sent where.",
        "Read the instructions as a student and mark every point where you would have to guess.",
        "Write your late and non-completion policy, and state it before the first submission.",
      ],
      standard:
        "A one-page reference sheet derived from a stated objective with steps in order, bolded key commands and a worked example showing reasoning; an assignment framed as a real-life task, slightly harder than the lesson, with all materials attached and the correct-submission standard stated, sized honestly for working adults; five quiz questions whose distractors are each a real student error with an explanation for every answer, scheduled early and low-stakes; instructions covering what, using what, producing what, by when and sent where, read as a student with every guess-point removed; and a stated late and non-completion policy issued before the first submission.",
    },
    pitfalls: [
      {
        problem: "You send the slides as the material",
        fix: "Build a one-page reference for the moment of use. A forty-slide deck is a record of the lesson that nobody opens; a page with the steps and one worked example gets opened the next day when it is needed.",
      },
      {
        problem: "Your assignment is an exercise about the software",
        fix: "Frame it as a task someone would do in real life. 'Watch and summarise' produces summarising; 'total this real column and flag the wrong month' produces the skill and the judgement.",
      },
      {
        problem: "You leave students to find the materials",
        fix: "Attach the data files and starter documents. Hunting for materials is where assignments quietly die, and the student who cannot find the file simply does not submit.",
      },
      {
        problem: "You did not state what correct looks like",
        fix: "Show the standard in advance. It lets students check their own work before sending, and it removes the argument about marking afterwards.",
      },
      {
        problem: "Your assignment repeats the demonstration",
        fix: "Change the data, the goal or add a complication. An assignment that can be completed by copying teaches nothing, however well it is completed.",
      },
      {
        problem: "Your quiz distractors are plausible guesses",
        fix: "Write them from the errors students actually make. A chosen real-error distractor tells you exactly what to fix; a random wrong answer tells you only that they did not know.",
      },
      {
        problem: "You quiz once, at the end",
        fix: "Quiz early, briefly and low-stakes. An end-of-course test tells you too late to help anyone, while three questions at the start of the next lesson tells you whether to move on.",
      },
      {
        problem: "Your instructions leave things to guess",
        fix: "State what to do, using what, producing what, by when and where to send it. Unclear instructions produce silent non-compliance, which looks like laziness and is not.",
      },
    ],
    expertNotes: [
      "Design every material for the moment it will be used, not as a record of the lesson. A one-page tool opened the day after class is worth more than a forty-slide deck nobody opens.",
      "Frame assignments as real tasks with real data. The shift from an exercise about the software to something a person would actually do is what turns an assignment from busywork into learning.",
      "Build quiz distractors from the errors students actually make. A chosen real-error distractor names the misunderstanding precisely and tells you exactly what to teach next, which random wrong answers cannot do.",
      "Apply your late-work policy evenly, including to the sympathetic case. A strict rule applied consistently is respected; a lenient one applied unevenly is resented, because students always notice who got the exception.",
    ],
    vocabulary: [
      {
        term: "Reference sheet",
        meaning:
          "A one-page tool for the moment of use: steps in order, key commands bolded, one worked example.",
      },
      {
        term: "Worked example",
        meaning:
          "A problem solved showing the reasoning, not just the answer. Without reasoning it cannot be transferred.",
      },
      {
        term: "Task-based assignment",
        meaning:
          "Something a person would do in real life. Produces competence where an exercise produces compliance.",
      },
      {
        term: "Stated standard",
        meaning:
          "What a correct submission looks like, given in advance. Lets students self-check before submitting.",
      },
      {
        term: "Distractor",
        meaning:
          "A wrong answer in a quiz. Built from real student errors, it diagnoses; built at random, it only records failure.",
      },
      {
        term: "Diagnostic quiz",
        meaning:
          "A short early check that reveals where thinking goes wrong, so it can be fixed while it still can be.",
      },
      {
        term: "Silent non-compliance",
        meaning:
          "Not doing the work without asking why. Caused by unclear instructions and mistaken for laziness.",
      },
      {
        term: "Materials system",
        meaning:
          "Reusable templates and a question bank. Costs more once and much less every time after.",
      },
    ],
    homework: [
      {
        task: "Reduce one deck to one page",
        detail:
          "Take material you currently send after class and cut it to the steps in order, key commands bolded, with one worked example showing reasoning.",
      },
      {
        task: "Rewrite one assignment as a task",
        detail:
          "Real data, a real goal, slightly harder than the lesson, all materials attached, the correct-submission standard stated, and an honest time estimate.",
      },
      {
        task: "Rebuild five quiz questions",
        detail:
          "Each distractor drawn from an error students actually make, with an explanation written for every answer including the correct one.",
      },
      {
        task: "Read your instructions as a student",
        detail:
          "Mark every point where you would have to guess. Then rewrite until there are none, and state your late-work policy before the first submission.",
      },
    ],
    rubric: [
      {
        criterion: "Materials",
        passing: "Sends the slides.",
        excellent:
          "A one-page reference designed for the moment of use, with steps in order, bolded key commands and a worked example that shows the reasoning.",
      },
      {
        criterion: "Assignments",
        passing: "Sets homework.",
        excellent:
          "A real-life task slightly harder than the lesson, all materials attached, the standard stated in advance, and sized honestly for working adults.",
      },
      {
        criterion: "Quizzes",
        passing: "Tests recall.",
        excellent:
          "Short, early and low-stakes, with every distractor built from a real student error and an explanation written for each answer.",
      },
      {
        criterion: "Communication",
        passing: "Answers questions.",
        excellent:
          "Instructions leaving nothing to guess, one channel for announcements and one for questions with stated checking times, and answers given publicly so the whole class benefits.",
      },
      {
        criterion: "Consistency and system",
        passing: "Handles issues as they come.",
        excellent:
          "A stated policy applied evenly including to sympathetic cases, non-completion treated diagnostically, and reusable templates and a question bank built.",
      },
    ],
    faqs: [
      {
        q: "Should I send my slides after class?",
        a: "Send them, but they are not the learning material. Build a one-page reference for the moment a student will actually try to do the thing — steps in order, key commands bolded, one worked example. That is what gets opened the next day; a forty-slide deck does not.",
      },
      {
        q: "How long should an assignment be?",
        a: "Whatever a working adult will actually complete — usually one to two hours. An uncompleted assignment teaches less than a shorter completed one, and if nobody submits, the length is the reason far more often than the difficulty.",
      },
      {
        q: "How do I write good multiple-choice questions?",
        a: "Build the wrong answers from the mistakes students actually make rather than from plausible guesses. A student who chooses a real-error distractor has told you precisely what they misunderstand, which is the only reason a quiz is worth giving.",
      },
      {
        q: "What do I do about late submissions?",
        a: "Decide the rule before the first one, state it at the start, and apply it evenly including to the sympathetic case. A strict policy applied consistently is respected; a lenient one applied unevenly is resented, because students always notice who got the exception.",
      },
      {
        q: "A student has not done any assignments. How do I handle it?",
        a: "Ask what got in the way, diagnostically rather than disciplinarily. The answer is usually that the task was too long, the instructions were unclear, or they are lost — all three are yours to fix, and treating it as laziness loses both the student and the information.",
      },
    ],
  },

  "course-and-lesson-structure": {
    summary:
      "A single good lesson is an event; a structured course is an education. This session covers how to build a course from modules and lessons, how to structure a single lesson that works online, and how slides, demonstrations, exercises and feedback fit together into something cumulative.",
    objectives: [
      "Structure a course into modules with a clear progression",
      "Design a module so each lesson builds on the last",
      "Structure a single lesson that works in an online session",
      "Integrate slides, demonstrations and exercises rather than sequencing them",
      "Give feedback at the right point in the structure",
      "Build a course outline you could actually teach",
    ],
    blocks: [
      {
        heading: "Course structure",
        body: [
          "A course is not a list of topics; it is a **sequence in which each part makes the next one possible**. That distinction is the whole design problem. Most courses are assembled by listing everything worth knowing and ordering it by subject — which is how the software's menus are organised, or how a textbook is divided — and the result is a sequence that makes sense to an expert and defeats a beginner.",
          "So design from the **end**. Write the thing a graduate can do that they could not do before, then ask what they must be able to do just before that, and keep asking. The sequence that falls out is ordered by dependency rather than by taxonomy, and it usually begins somewhere different from where you would have started. A course built this way has the property that **a student who completes week one can actually do something**, which is what keeps them through week four.",
          "Then **scope honestly**. The temptation is to include everything you know, and a course that tries to cover a whole profession in four weeks teaches none of it properly. An introductory practical course promises a specific, achievable competence — 'you will be able to build and publish a working site' — and delivers it, rather than promising mastery and producing confusion. **Narrow and complete beats broad and shallow** every time, and students can tell the difference from the first lesson.",
        ],
      },
      {
        heading: "Module structure",
        body: [
          "A module is a **coherent unit with its own deliverable** — typically three to five lessons, ending in something the student has made. The deliverable is what makes a module feel like progress rather than a stretch of content, and it is what a graduate can point to afterwards.",
          "Each module should be **self-contained enough to be useful on its own**. A student who completes module one and stops should still be able to do something real, not hold a fragment waiting for module three to make sense. This is both good teaching and practical reality, because people do stop, and a course where nothing works until the end produces people who abandon it halfway with nothing to show.",
          "Then the **spiral** rather than the line. Return to earlier ideas at a higher level rather than treating them as finished. A concept introduced in module one and used again in module three with more complexity is learned far more reliably than one covered once and assumed retained. Most people do not learn a thing by being told it; they learn it by meeting it three times in different contexts.",
        ],
      },
      {
        heading: "Lesson structure for an online session",
        body: [
          "A ninety-minute online lesson has a shape that works, and it is not ninety minutes of teaching. **Open** — five minutes: what today achieves and why it matters, connected to what they did last time. **Demonstrate** — fifteen: show the finished result, then how, narrating the reasoning. **Guided practice** — twenty: they do it with you watching, interrupting, correcting.",
          "**Independent practice** — twenty-five: they do a variation alone while you move between people. **Review and feedback** — fifteen: look at what people produced, name the common error, correct it together. **Close** — five: what they can now do, what is next, what to do before the next session. The proportions matter more than the exact minutes, and the part most often sacrificed is independent practice, which is the part where learning happens.",
          "The online-specific adjustment is that **attention online decays faster than in a room**. Nobody is physically present, the phone is in their hand, and the cost of drifting is zero. So change the mode every fifteen minutes or so — from watching to doing, from listening to typing, from you to them. A ninety-minute lecture delivered online loses most of the room by minute twenty, however good the material is.",
        ],
      },
      {
        heading: "Integrating slides, demonstrations and exercises",
        body: [
          "The common mistake is treating these as **sequential segments** — twenty minutes of slides, then a demonstration, then an exercise. It produces a lesson in three disconnected parts, and the student does not see how the explanation relates to the thing they are about to do.",
          "Instead, **interleave them around one task**. Show a slide with one idea, demonstrate that idea immediately, have them do it immediately, then move to the next idea. The cycle is short — five to ten minutes — and it means the explanation is never more than a few minutes from the action it explains. This is slower to prepare and much faster to learn, because nothing has to be held in memory waiting for its turn.",
          "Then match the tool to the job. **Slides** carry structure, vocabulary and anything they will need to refer to later. **Demonstrations** carry process and judgement. **The whiteboard** carries explanation that has to be built in response to confusion. **Exercises** carry the learning itself. Using slides to explain a process, or a demonstration to convey a definition, wastes both.",
        ],
      },
      {
        heading: "Feedback within the structure",
        body: [
          "Feedback belongs at specific points, and putting it in the wrong place wastes it. **During guided practice** it is immediate and individual — a quiet correction to one person while others work. **In the review segment** it is collective: the error three people made, shown and fixed for everyone, which is worth more than three private corrections because the two who did not make it learn to avoid it.",
          "**On submitted work** it is individual and written, using the three-part structure — what was right, what was wrong, what to do next. **At the end of a module** it is summative and about the deliverable, telling the student what they can now do that they could not before, which is the information that keeps people enrolled.",
          "The principle underneath all of it is that **feedback is only useful while it can still change something**. Feedback on the last assignment of a course changes nothing; feedback on the first exercise of lesson two changes everything after it. Design the course so the checking happens early and often, because a course whose only assessment is at the end is a course that discovers its failures too late to fix them.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor designs a complete four-week course live: working backwards from the final competence to derive the sequence, grouping lessons into modules each with a deliverable, then structuring one ninety-minute lesson and interleaving a slide, a demonstration and an exercise around a single task rather than sequencing them.",
      steps: [
        {
          step: "State the final competence",
          detail:
            "Write what a graduate can do that they could not before. Explain that everything else is derived from this sentence.",
        },
        {
          step: "Work backwards",
          detail:
            "Ask what they must be able to do just before that, five times. Explain that the resulting sequence is ordered by dependency rather than by how the subject is usually divided.",
        },
        {
          step: "Check week one produces something",
          detail:
            "Confirm a student completing week one can actually do a real thing. Explain that this is what carries people through week four.",
        },
        {
          step: "Scope it honestly",
          detail:
            "Cut anything that does not serve the final competence. Explain that narrow and complete beats broad and shallow, and that students detect the difference in lesson one.",
        },
        {
          step: "Group into modules",
          detail:
            "Cluster lessons into units of three to five with a deliverable each. Explain that a deliverable is what makes a module feel like progress.",
        },
        {
          step: "Test module self-containment",
          detail:
            "Ask whether someone who stops after module one can still do something real. Explain that people do stop, and a course where nothing works until the end gets abandoned.",
        },
        {
          step: "Add the spiral",
          detail:
            "Mark the concepts that return later at a higher level. Explain that people learn a thing by meeting it three times in different contexts rather than once.",
        },
        {
          step: "Structure one lesson",
          detail:
            "Lay out open, demonstrate, guided practice, independent practice, review, close with proportions. Explain that independent practice is the part most often sacrificed and the part where learning happens.",
        },
        {
          step: "Break the mode every fifteen minutes",
          detail:
            "Alternate watching, doing, listening and typing. Explain that online attention decays faster because the cost of drifting is zero.",
        },
        {
          step: "Interleave around one task",
          detail:
            "Show a slide, demonstrate it, have them do it, then move on. Explain that sequential segments leave the student unable to connect the explanation to the action.",
        },
        {
          step: "Match each tool to its job",
          detail:
            "Slides for structure and reference, demonstration for process and judgement, whiteboard for responsive explanation, exercises for learning. Explain that using slides to explain a process wastes both.",
        },
        {
          step: "Place the feedback",
          detail:
            "Mark immediate individual, collective review, written on submissions, and summative at module end. Explain that feedback is only useful while it can still change something.",
        },
      ],
    },
    practice: {
      title: "Design a complete course and one lesson in full",
      brief:
        "You design a four-week course by working backwards from a stated final competence, group it into modules each with its own deliverable, mark the concepts that spiral, then structure one ninety-minute lesson in full — with slides, demonstration and exercises interleaved around a single task rather than sequenced, mode changes every fifteen minutes, and feedback placed at four specific points.",
      steps: [
        "Write the final competence: what a graduate can do that they could not before.",
        "Work backwards five times to derive the prerequisite sequence.",
        "Confirm the sequence is ordered by dependency rather than by how the subject is divided.",
        "Check that completing week one leaves a student able to do something real.",
        "Cut everything that does not serve the final competence.",
        "Group the lessons into modules of three to five.",
        "Give each module its own deliverable.",
        "Test each module for self-containment: could someone who stops here still do something?",
        "Mark the concepts that return later at a higher level.",
        "Write the lesson shape: open, demonstrate, guided practice, independent practice, review, close.",
        "Assign proportions, protecting independent practice from being cut.",
        "Plan a mode change every fifteen minutes or so.",
        "Interleave one slide, one demonstration and one exercise around a single task.",
        "Match each tool to its job rather than using slides to explain process.",
        "Place feedback at four points: during guided practice, in review, on submissions, at module end.",
        "Confirm every check happens early enough to change something.",
      ],
      standard:
        "A four-week course derived by working backwards five times from a stated final competence, ordered by dependency, with week one producing a real capability and everything not serving the final competence cut, grouped into modules of three to five each with its own deliverable and tested for self-containment, with spiralling concepts marked — plus one ninety-minute lesson structured open, demonstrate, guided practice, independent practice, review and close with proportions protecting independent practice, a mode change every fifteen minutes, one slide, demonstration and exercise interleaved around a single task with each tool matched to its job, and feedback placed at four points all early enough to change something.",
    },
    pitfalls: [
      {
        problem: "Your course is a list of topics",
        fix: "Order by dependency, derived by working backwards from the final competence. A topic list ordered by how the subject is divided makes sense to an expert and defeats a beginner.",
      },
      {
        problem: "Nothing works until the end of the course",
        fix: "Make week one produce a real capability. A student who can do something after week one stays through week four; one holding fragments abandons it halfway with nothing to show.",
      },
      {
        problem: "You tried to cover a whole profession",
        fix: "Promise a specific, achievable competence and deliver it completely. Narrow and complete beats broad and shallow, and students detect the difference from the first lesson.",
      },
      {
        problem: "Your modules have no deliverable",
        fix: "End each module in something the student has made. A deliverable is what makes a module feel like progress rather than a stretch of content, and it is what graduates point to afterwards.",
      },
      {
        problem: "You cover each concept once and move on",
        fix: "Spiral: return to earlier ideas at a higher level. People learn a thing by meeting it three times in different contexts, not by being told it once and assumed to have retained it.",
      },
      {
        problem: "You lecture for ninety minutes",
        fix: "Change the mode every fifteen minutes. Online attention decays faster than in a room because the phone is in their hand and the cost of drifting is zero.",
      },
      {
        problem: "You cut independent practice to fit the content",
        fix: "Protect it. It is the part where learning actually happens, and a lesson that is all demonstration produces people who can watch and cannot do.",
      },
      {
        problem: "You sequence slides, then demo, then exercise",
        fix: "Interleave them around one task in short cycles. Sequential segments leave the student unable to connect the explanation to the action they are about to take.",
      },
    ],
    expertNotes: [
      "Design the course by working backwards from the final competence. Asking 'what must they be able to do just before this?' five times produces a dependency-ordered sequence that usually begins somewhere different from where a topic list would.",
      "Make sure a student who completes week one can do something real. Early tangible capability is what carries people through the middle of a course, and its absence is the main reason people abandon programmes halfway.",
      "Change the mode every fifteen minutes in an online lesson. Attention online decays faster than in a room because the cost of drifting is zero, and alternating watching, doing, listening and typing is what holds it.",
      "Interleave slides, demonstration and exercise around a single task rather than sequencing them. Short cycles keep every explanation within minutes of the action it explains, so nothing has to be held in memory waiting for its turn.",
    ],
    vocabulary: [
      {
        term: "Course structure",
        meaning: "A sequence in which each part makes the next possible. Not a list of topics.",
      },
      {
        term: "Dependency ordering",
        meaning:
          "Sequencing so each prerequisite precedes what needs it. Derived by working backwards from the final competence.",
      },
      {
        term: "Module",
        meaning:
          "A coherent unit of three to five lessons with its own deliverable. Self-contained enough to be useful alone.",
      },
      {
        term: "Spiral curriculum",
        meaning:
          "Returning to earlier concepts at a higher level. Learning happens through repeated encounters, not single explanations.",
      },
      {
        term: "Lesson shape",
        meaning:
          "Open, demonstrate, guided practice, independent practice, review, close. Proportions matter more than exact minutes.",
      },
      {
        term: "Interleaving",
        meaning:
          "Alternating slide, demonstration and exercise around one task. Keeps explanation close to action.",
      },
      {
        term: "Mode change",
        meaning:
          "Switching between watching, doing, listening and typing. Needed roughly every fifteen minutes online.",
      },
      {
        term: "Summative feedback",
        meaning:
          "Assessment at module end about the deliverable. Tells the student what they can now do that they could not before.",
      },
    ],
    homework: [
      {
        task: "Work backwards from one competence",
        detail:
          "Write what a graduate can do, then ask what they must be able to do just before that, five times. Note where the sequence starts and compare it with where you would have started.",
      },
      {
        task: "Group a course into modules",
        detail:
          "Three to five lessons each, every module ending in a deliverable. Test each: could someone who stopped there still do something real?",
      },
      {
        task: "Structure one lesson in full",
        detail:
          "All six segments with proportions, a mode change every fifteen minutes, and independent practice protected from being cut to fit content.",
      },
      {
        task: "Interleave one task",
        detail:
          "Take one concept and design the short cycle: slide, demonstration, immediate exercise. Note how much less the student has to hold in memory than in a sequential design.",
      },
    ],
    rubric: [
      {
        criterion: "Course structure",
        passing: "Has a topic list.",
        excellent:
          "Derived by working backwards five times from a stated final competence, ordered by dependency, with week one producing a real capability and everything non-essential cut.",
      },
      {
        criterion: "Module design",
        passing: "Groups the lessons.",
        excellent:
          "Units of three to five each with its own deliverable, tested for self-containment, with spiralling concepts marked for later return.",
      },
      {
        criterion: "Lesson structure",
        passing: "Has an outline.",
        excellent:
          "All six segments with proportions that protect independent practice, and a mode change planned roughly every fifteen minutes.",
      },
      {
        criterion: "Integration",
        passing: "Uses slides and exercises.",
        excellent:
          "One slide, demonstration and exercise interleaved around a single task in short cycles, with each tool matched to the job it is actually good at.",
      },
      {
        criterion: "Feedback placement",
        passing: "Gives feedback.",
        excellent:
          "Placed at four points — guided practice, review, submissions, module end — with every check early enough to still change something.",
      },
    ],
    faqs: [
      {
        q: "How do I decide the order of topics?",
        a: "Work backwards from what a graduate can do, asking what they must be able to do just before that. The sequence that results is ordered by dependency rather than by how the subject is usually divided, which is what makes it learnable rather than merely logical.",
      },
      {
        q: "How many lessons should a module have?",
        a: "Three to five, ending in something the student has made. Fewer than three and it is just a lesson; more than five and the deliverable is too far away to feel like progress.",
      },
      {
        q: "Should each module stand alone?",
        a: "As far as possible, yes. A student who stops after module one should still be able to do something real, because people do stop — and a course where nothing works until the end is abandoned halfway with nothing to show for it.",
      },
      {
        q: "How long should one online lesson be?",
        a: "Ninety minutes works if the mode changes every fifteen minutes or so. A ninety-minute lecture delivered online loses most of the room by minute twenty, however good the material, because the cost of drifting is zero when nobody is physically present.",
      },
      {
        q: "Which comes first — slides, demonstration or exercise?",
        a: "None of them alone. Interleave them around one task in short cycles: show the idea, demonstrate it, have them do it, then move on. Sequencing them into separate segments leaves the student unable to connect the explanation to the action.",
      },
    ],
  },

  "deliver-a-lesson": {
    summary:
      "The final project: prepare and deliver a short online lesson to the class, record it, take peer feedback, and write an improvement plan. This is where the plan meets the room — and where most people discover that teaching is adjusting, not performing.",
    objectives: [
      "Prepare a short lesson to a professional standard",
      "Deliver it live online, handling the technical and the human",
      "Adjust to the class rather than following the plan",
      "Record the lesson and review it honestly",
      "Take peer feedback without defending",
      "Write a specific improvement plan for the next lesson",
    ],
    blocks: [
      {
        heading: "Preparing to deliver",
        body: [
          "Preparation is not memorising; it is **knowing the material well enough to abandon the plan**. The teacher who has memorised a script falls apart at the first question that is not in it, while the one who understands the material deeply can go somewhere unexpected and bring the class back. Prepare the structure and the key transitions, not the sentences.",
          "Then **prepare the room before the class, not during it**. Test the microphone, the camera, the screen share and the recording twenty minutes early, with the actual files open and notifications disabled. Most teaching disasters are not pedagogical — they are four minutes of 'can everyone see my screen?' while the class's attention drains away, and every one of them is preventable.",
          "And **prepare for the three things that will happen**: someone will not be able to hear you, someone will ask a question you cannot answer, and the timing will be wrong. Have an answer for each. 'Let us check audio before we start' handles the first. 'I do not know — I will find out and tell you on Tuesday' handles the second, and handles it better than guessing. The third is handled by knowing in advance what you will cut.",
        ],
      },
      {
        heading: "Delivering live",
        body: [
          "The first two minutes set the whole lesson. **Open with what they will be able to do**, not with housekeeping or an apology for the technology. 'By the end of today you will be able to total any column and handle the blanks that break most formulas' gives the class a reason to pay attention that housekeeping does not.",
          "Then **manage the room continuously**, which is the skill that separates teaching from presenting. Watch the chat, watch the faces, and notice silence — online, silence usually means confusion rather than understanding, because people are reluctant to admit being lost in front of others. Ask specific questions with specific answers rather than 'any questions?', and call on people gently by name, because a class nobody is called on is a class nobody is in.",
          "The central discipline is **adjusting rather than performing**. If the class is confused, go back — the plan is a hypothesis and the class is the evidence. If they have already got it, move faster rather than repeating yourself out of loyalty to the timings. The teacher who completes the plan while the class is lost has not taught anything, however well the plan was executed.",
        ],
      },
      {
        heading: "Recording and reviewing honestly",
        body: [
          "Record the lesson, because watching yourself is the fastest improvement available and also the most avoided. **Announce that you are recording** — consent matters, and it may be legally required under Nigeria's data protection framework — and **verify the file saved** afterwards, because a missing recording is unrecoverable.",
          "Then watch it, which is genuinely uncomfortable, and watch for four specific things rather than generally. **Where did you lose them?** Watch for the moment attention drops; it is usually visible and it is usually the same cause each time. **How much did you talk versus them?** Most first lessons are ninety per cent teacher, and the ratio is the single most useful number there is. **What did you say twice?** Repetition is usually a sign the first explanation did not land and you sensed it. **Where did the technology cost you time?** Every minute is a minute not spent teaching.",
          "The instinct is to watch for how you looked and sounded, and that is the least useful thing to examine. **Watch what the class did**, because that is the only measure of whether teaching happened. A lesson where you felt awkward and the class produced correct work is a success; one where you felt fluent and nobody could do the task is not.",
        ],
      },
      {
        heading: "Taking peer feedback",
        body: [
          "Peer feedback is the most valuable thing in this session and the hardest to receive well. The rule is simple: **record it, do not respond to it**. The instinct to explain what you meant, or to point out the constraint the critic missed, costs you exactly the information you came for, and it makes the next person less honest.",
          "Then sort the notes afterwards into three. **Genuinely wrong** — the audio was inaudible, the objective was never stated, the exercise was unclear. These must change. **Preference** — 'I would have gone slower', 'I prefer fewer slides'. Worth considering, not obligatory. **The critic's own situation** — they teach adults and you taught beginners, they are comfortable with silence and you are not. Note it and move on.",
          "When you **give** feedback, be specific and be about the work. 'I lost the thread at about minute eight when the explanation became abstract' is useful. 'It was good' helps nobody, and 'you need to be more confident' is unactionable and unkind in the way that vagueness is unkind. Name what worked as well — knowing what to keep matters as much as knowing what to change, and feedback that is only negative produces someone who changes everything rather than improving what exists.",
        ],
      },
      {
        heading: "The improvement plan",
        body: [
          "The plan turns feedback into change, and it works only if it is **specific and small**. 'Get better at pacing' is not a plan. 'Check the chat every ten minutes and stop when someone looks lost' is, because it can be done in the next lesson and you can tell whether you did it.",
          "Pick **two changes, not seven**. A lesson where you attempt seven improvements gets worse, because attention is finite and teaching already demands most of it. Choose the two that address the biggest problems the feedback identified, write them where you will see them during the lesson, and check afterwards whether you actually did them.",
          "Then the honest expectation about teaching. **The first lesson is always worse than the plan**, because the plan does not include the questions, the confusion, the technology and the time you actually had. That is not failure; it is what teaching is. The teachers who improve are the ones who deliver, record, review and adjust repeatedly, and the ones who do not are usually those who decided the first attempt proved they were not suited to it. It did not prove that. It proved they had taught once.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor delivers a short lesson to the class as a model, handling the three predictable problems live, then screens the recording and reviews it against the four specific questions, takes peer critique in silence, sorts it into three categories, and writes a two-point improvement plan.",
      steps: [
        {
          step: "Prepare the room early",
          detail:
            "Test microphone, camera, share and recording twenty minutes ahead with files open and notifications off. Explain that most teaching disasters are technical and all are preventable.",
        },
        {
          step: "Open with the outcome",
          detail:
            "State what the class will be able to do, with no housekeeping first. Explain that this gives a reason to pay attention that logistics do not.",
        },
        {
          step: "Check audio before content",
          detail:
            "Ask the class to confirm they can hear. Explain that audio problems are usually discovered twenty minutes in, when the time is already gone.",
        },
        {
          step: "Handle an unanswerable question",
          detail:
            "Say 'I do not know, I will find out and tell you Tuesday.' Explain that this is more credible than guessing and models the behaviour you want from students.",
        },
        {
          step: "Watch for silence",
          detail:
            "Notice when the class goes quiet and treat it as confusion rather than agreement. Explain that people are reluctant to admit being lost in front of others.",
        },
        {
          step: "Ask specific questions",
          detail:
            "Ask something with a specific answer rather than 'any questions?'. Call on people gently by name and explain that a class nobody is called on is a class nobody is in.",
        },
        {
          step: "Adjust mid-lesson",
          detail:
            "Go back when the class is confused even though the plan says move on. Explain that the plan is a hypothesis and the class is the evidence.",
        },
        {
          step: "Cut to protect the objective",
          detail:
            "Drop the pre-marked content when time runs short. Explain that finishing the objective beats finishing the plan.",
        },
        {
          step: "Announce and verify the recording",
          detail:
            "Tell the class you are recording and check the file afterwards. Explain that consent matters and a missing recording is unrecoverable.",
        },
        {
          step: "Review against four questions",
          detail:
            "Watch for where attention dropped, the talk ratio, what was said twice, and where technology cost time. Explain that watching how you looked is the least useful thing to examine.",
        },
        {
          step: "Take critique in silence",
          detail:
            "Record every comment without responding. Explain that defending yourself costs the information you came for and makes the next critic less honest.",
        },
        {
          step: "Sort the critique",
          detail:
            "Divide into genuinely wrong, preference, and the critic's own situation. Explain that only the first must change.",
        },
        {
          step: "Write two changes",
          detail:
            "Pick the two most specific, actionable improvements. Explain that seven attempted improvements make a lesson worse because attention is finite.",
        },
      ],
    },
    practice: {
      title: "Final project: deliver a lesson",
      brief:
        "You prepare and deliver a short online lesson to the class from your lesson plan, with the room tested twenty minutes early, the recording announced and verified, and adjustment made to the class rather than to the plan. You then review the recording against four specific questions, take peer feedback in silence, sort it into three categories, and write a two-point improvement plan.",
      steps: [
        "Prepare the room twenty minutes early: microphone, camera, screen share, recording, files open, notifications off.",
        "Write your opening sentence: what the class will be able to do by the end.",
        "Prepare your answers for the three certainties: audio failure, an unanswerable question, wrong timing.",
        "Mark in advance what you will cut if you run out of time.",
        "Check audio with the class before teaching any content.",
        "Open with the outcome rather than housekeeping.",
        "Interleave slide, demonstration and exercise around one task in short cycles.",
        "Watch the chat and the faces continuously, treating silence as confusion.",
        "Ask specific questions with specific answers, and call on people by name.",
        "Adjust to the class: go back when they are confused, move on when they have it.",
        "Announce that you are recording, and verify the file saved afterwards.",
        "Watch the recording and note where attention dropped.",
        "Estimate your talk ratio against the class's.",
        "Note what you explained twice, and why the first attempt did not land.",
        "Note where the technology cost you time.",
        "Take peer feedback in silence, recording every comment without responding.",
        "Sort the notes into genuinely wrong, preference, and the critic's own situation.",
        "Write two specific, actionable changes for your next lesson.",
      ],
      standard:
        "A delivered live lesson with the room tested twenty minutes early, an opening that states the outcome, audio confirmed before content, slide, demonstration and exercise interleaved around one task, silence treated as confusion with specific questions asked and people called by name, adjustment made to the class rather than the plan with the pre-marked cut used to protect the objective, the recording announced and verified as saved — plus a review naming where attention dropped, the talk ratio, what was explained twice and where technology cost time, all peer feedback recorded in silence and sorted into wrong, preference and the critic's situation, and exactly two specific actionable changes written for the next lesson.",
    },
    pitfalls: [
      {
        problem: "You memorised a script",
        fix: "Prepare the structure and the transitions, not the sentences. A memorised script collapses at the first unexpected question, while deep familiarity with the material lets you go somewhere unplanned and return.",
      },
      {
        problem: "You set up the technology during class time",
        fix: "Test everything twenty minutes early with the files open. Four minutes of 'can everyone see my screen?' drains the class's attention before you have taught anything, and it is entirely preventable.",
      },
      {
        problem: "You opened with housekeeping",
        fix: "Open with what they will be able to do. Logistics give nobody a reason to pay attention; a stated outcome does, and it frames everything that follows.",
      },
      {
        problem: "You guessed at a question you could not answer",
        fix: "Say you do not know and commit to finding out. Guessing damages your credibility when it is wrong, and admitting uncertainty models exactly the behaviour you want from students.",
      },
      {
        problem: "You treated silence as understanding",
        fix: "Treat it as confusion. Online, silence usually means people are lost and reluctant to say so in front of others, so ask specific questions rather than 'any questions?'.",
      },
      {
        problem: "You followed the plan while the class was lost",
        fix: "Adjust. The plan is a hypothesis and the class is the evidence; completing a plan to a confused room is not teaching, however well the plan was executed.",
      },
      {
        problem: "You reviewed the recording for how you looked",
        fix: "Watch what the class did instead. A lesson where you felt awkward and the class produced correct work is a success; one where you felt fluent and nobody could do the task is not.",
      },
      {
        problem: "You defended yourself during feedback",
        fix: "Record everything in silence and sort it afterwards. Explaining what you meant costs you the information you came for and makes the next person less honest with you.",
      },
    ],
    expertNotes: [
      "Prepare the structure and the transitions, not the sentences. Deep familiarity with the material lets you follow the class somewhere unplanned and bring them back; a memorised script collapses at the first question you did not anticipate.",
      "Test the room twenty minutes early. Almost every teaching disaster is technical rather than pedagogical — inaudible audio, an unshared screen, a recording that did not start — and every one of them is prevented by an early check.",
      "Treat silence as confusion, always. Online, people are far more reluctant to admit being lost in front of others than they are in a room, so ask specific questions with specific answers rather than inviting 'any questions?'.",
      "Write two improvements, not seven. Attention is finite and teaching already consumes most of it, so a lesson where you attempt seven changes gets worse while two specific ones actually land.",
    ],
    vocabulary: [
      {
        term: "Opening outcome",
        meaning:
          "The first sentence: what the class will be able to do. Gives a reason to pay attention that housekeeping does not.",
      },
      {
        term: "Room check",
        meaning:
          "Testing microphone, camera, share and recording before the class. Prevents almost every teaching disaster.",
      },
      {
        term: "Talk ratio",
        meaning:
          "How much the teacher spoke versus the class. Most first lessons are far too teacher-heavy.",
      },
      {
        term: "Adjusting",
        meaning:
          "Changing the lesson in response to the class. The core skill, and the opposite of performing a plan.",
      },
      {
        term: "Productive struggle",
        meaning:
          "Letting a learner work at difficulty briefly. Teaches more than being rescued, and shows you where they are lost.",
      },
      {
        term: "Critique sorting",
        meaning:
          "Dividing feedback into genuinely wrong, preference, and the critic's own situation. Only the first must change.",
      },
      {
        term: "Improvement plan",
        meaning:
          "Two specific, actionable changes for the next lesson. Seven attempted changes make a lesson worse.",
      },
      {
        term: "Recording consent",
        meaning:
          "Announcing that you are recording. An ethical obligation and in some contexts a legal one.",
      },
    ],
    homework: [
      {
        task: "Write your opening sentence",
        detail:
          "One sentence stating what the class will be able to do by the end. Read it aloud: if it does not give a reason to pay attention, rewrite it.",
      },
      {
        task: "Run a room check routine",
        detail:
          "Write the twenty-minute-early checklist: microphone, camera, screen share, recording, files open, notifications off. Then actually run it before your next session.",
      },
      {
        task: "Review one recording against four questions",
        detail:
          "Where attention dropped, your talk ratio, what you explained twice, where technology cost time. Do not watch for how you looked — watch what the class did.",
      },
      {
        task: "Write two improvements",
        detail:
          "Specific and actionable enough to do in the next lesson, written where you will see them while teaching. Then check afterwards whether you actually did them.",
      },
    ],
    rubric: [
      {
        criterion: "Preparation",
        passing: "Has a plan.",
        excellent:
          "Room tested twenty minutes early with files open and notifications off, opening outcome written, and prepared answers for audio failure, an unanswerable question and wrong timing.",
      },
      {
        criterion: "Delivery",
        passing: "Gets through the material.",
        excellent:
          "Opens with the outcome, audio confirmed first, tasks interleaved in short cycles, silence treated as confusion, specific questions asked and people called by name.",
      },
      {
        criterion: "Adjustment",
        passing: "Follows the plan.",
        excellent:
          "Goes back when the class is confused and moves on when they have it, using the pre-marked cut to protect the objective rather than the schedule.",
      },
      {
        criterion: "Review",
        passing: "Watches the recording.",
        excellent:
          "Reviewed against four specific questions — attention drop, talk ratio, repetition and technology cost — watching what the class did rather than how the teacher looked.",
      },
      {
        criterion: "Feedback and improvement",
        passing: "Accepts comments.",
        excellent:
          "All feedback recorded in silence, sorted into wrong, preference and the critic's situation, with exactly two specific actionable changes written for the next lesson.",
      },
    ],
    faqs: [
      {
        q: "I am nervous about teaching live. How do I handle it?",
        a: "Prepare the structure and the transitions rather than memorising sentences, and test the room twenty minutes early. Nervousness reduces with repetition far faster than with preparation, and most of what feels like teaching anxiety is actually fear of the technology failing — which the early check removes.",
      },
      {
        q: "What do I do when nobody answers my question?",
        a: "Ask something with a specific, short answer rather than 'any questions?', and call on people gently by name. Online silence usually means confusion rather than understanding, because people are reluctant to admit being lost in front of others.",
      },
      {
        q: "Should I record my lesson?",
        a: "Yes — announce that you are, and verify the file saved afterwards. Watching yourself is the fastest improvement available, provided you watch what the class did rather than how you looked and sounded.",
      },
      {
        q: "How do I handle criticism from the class?",
        a: "Record every comment in silence and sort them afterwards into genuinely wrong, preference, and the critic's own situation. Only the first must change. Defending yourself in the moment costs you the information you came for and makes the next person less honest.",
      },
      {
        q: "My first lesson went badly. Does that mean I cannot teach?",
        a: "No. The first lesson is always worse than the plan, because the plan does not include the questions, the confusion, the technology and the time you actually had. Teaching improves through delivering, recording, reviewing and adjusting repeatedly — one attempt proves only that you have taught once.",
      },
    ],
  },
};
