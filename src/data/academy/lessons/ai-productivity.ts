/**
 * AI Productivity — all 4 sessions (full class lectures).
 * Merged by withCoursePrefix() in ../index.ts.
 */

import type { SessionLecture } from "@/data/academy/types";

export const aiProductivityLessons: Record<string, SessionLecture> = {
  "what-ai-tools-are": {
    summary:
      "What a language model actually does, what it is genuinely good at, where it fails predictably, and how to choose a tool — so you can use these tools fast without producing nonsense or leaking anything you should not.",
    objectives: [
      "Explain in plain terms what a language model is doing when it produces text",
      "Identify the categories of task these tools handle well and those they do not",
      "Predict where a tool will fail, rather than discovering it after the fact",
      "Choose a tool against a real task rather than against marketing claims",
      "Set realistic expectations for what changes in your own work",
    ],
    blocks: [
      {
        heading: "What this course actually promises, and what it does not",
        body: [
          "The deliverable here is **a documented workflow for one of your real recurring tasks** — with the prompts you use, the verification steps, and the parts you deliberately keep manual. That last clause matters as much as the first. This course is not about handing work to a machine; it is about knowing precisely which parts of a task can be handed over, which cannot, and how to check what comes back.",
          "The framing we will hold throughout is that these tools are **a very fast, very well-read assistant with no judgement and no memory of being wrong.** That description is not a metaphor; it is close to a literal account of what the software does, and it predicts both the value and the failure modes accurately. Everything useful in this course follows from holding that picture steady.",
          "We will not cover hype in either direction. You will not be told these tools will replace your work, and you will not be told they are useless. You will be shown what they reliably do well, where they reliably fail, and how to build a process that gets the benefit without the risk — which is a less exciting promise and a considerably more useful one.",
        ],
      },
      {
        heading: "What a language model is doing, in terms that predict its behaviour",
        body: [
          "A language model is trained on an enormous body of text to do one thing: **given some text, predict what text most plausibly comes next.** It does this word by word, and the result reads like understanding because plausible next-words, accumulated over paragraphs, usually do resemble coherent thought. But the mechanism is prediction, not retrieval or reasoning, and that distinction explains everything that follows.",
          "Three consequences matter practically. First, **it has no database it is looking things up in.** It is not checking a fact; it is producing the wording that typically accompanies that fact. When the wording and the truth diverge, nothing in the process notices — which is exactly what a hallucination is. Second, **confidence is unrelated to accuracy.** The model produces a fluent, assured sentence whether or not the content is correct, because fluency is what it optimises for. You cannot read uncertainty off the tone.",
          "Third, **it does not know when it was trained or what has happened since**, and its picture of anything recent is unreliable or absent. Ask it for a current price, a recent event, a specific statute's latest amendment, or a phone number, and you may receive something formatted exactly like an answer. **The absence of a 'I do not know' reflex is the single most dangerous property of these tools**, because it means the failure looks identical to success.",
        ],
      },
      {
        heading: "What they are genuinely good at, and why those tasks share a shape",
        body: [
          "The tasks these tools handle well are not random; they share a shape. **They are good at language work where you can recognise a good answer quickly.** Rewriting a paragraph, drafting a polite email, summarising a document you have already read, turning rough notes into structured text, explaining a concept you partly understand, generating options when you are stuck, translating, reformatting, and writing boilerplate. In every case the output is checkable by you at a glance, which is what makes the speed safe.",
          "They are also strong at **transformation** — taking content that exists and changing its form. Notes into a summary, a transcript into action items, a long document into headings, a formal letter into a friendlier one, a list into a table. Nothing new needs to be true; the material is already in front of you, and the model is doing structural work rather than factual work.",
          "And they are useful as **a thinking partner rather than an answer machine.** Asking for objections to your plan, gaps in your argument, or ten angles on a problem produces value even when several suggestions are mediocre, because you are selecting rather than accepting. **The distinction between generating options and supplying answers is the difference between a useful tool and a liability**, and it is a distinction you control entirely through how you use it.",
        ],
      },
      {
        heading: "Where they fail, predictably, and how to see it coming",
        body: [
          "The failures are not random either, and learning to predict them is the core skill of this session. **Specific facts**: names, dates, figures, citations, legal references, product versions. The model produces plausible-shaped facts, and a plausible-shaped citation with a real-sounding journal and a wrong title is more dangerous than an obvious error because it survives a casual check.",
          "**Current information**: anything that has changed recently — prices, availability, staff, policies, law. **Arithmetic and careful counting**: it can do simple sums and will frequently get multi-step ones wrong while presenting the working confidently. **Precise constraints**: word limits, exact formatting, 'use only these three sources' — it approximates rather than obeys, and you must check.",
          "Then two subtler ones. **It agrees with you**, because it is trained on text where people respond to assertions, and pushing back on a stated premise is rarer than going along with it — so if you ask a leading question you will get a leading answer. And **it does not know your situation**: your client, your contract, your local context. It will produce generic Nigerian business advice that sounds right and misses the specific constraint that matters. **Every one of these failures is predictable in advance**, which means none of them should ever be a surprise.",
        ],
      },
      {
        heading: "Choosing a tool: the questions that actually matter",
        body: [
          "The market is crowded and the marketing is uniform, so choose against your task rather than against claims. The questions worth asking are short. **What am I actually doing?** If it is drafting and rewriting, most tools perform comparably and you should choose on interface and cost. If it is working with your own documents, choose one that handles files well. If it is searching for current information, you need a tool that retrieves from the live web and shows its sources.",
          "Then the questions people skip. **What happens to what I type?** This is not a privacy abstraction — if you paste a client contract, a staff list, or a customer database into a tool, you have sent that data somewhere, and some services use submissions to improve their models. **Read the data policy for the tool you intend to use for work**, and never paste anything confidential into one you have not checked. We will return to this in the final session, but the choice of tool is where the exposure is created.",
          "Finally, the practical test. **Pick one tool and use it properly for two weeks before comparing.** Most people's disappointment comes from using three tools shallowly and concluding the technology is inconsistent, when what varies is their own prompting. **Depth with one tool teaches you the technique; breadth across five teaches you nothing.** Start with one, learn its behaviour, then evaluate alternatives against a standard you actually understand.",
        ],
      },
    ],
    demonstration: {
      intro:
        "We put a language model through a set of tests designed to show both what it does well and where it fails — so you have seen the failures yourself rather than taken them on trust.",
      steps: [
        {
          step: "Pick one real recurring task you actually do",
          detail:
            "A weekly report, client replies, lesson notes, social captions, a proposal section. The whole course builds around this one task, so choose something you genuinely do repeatedly rather than something impressive-sounding.",
        },
        {
          step: "Choose one tool and read its data policy before typing anything",
          detail:
            "Two minutes, before the first prompt. Find out whether submissions are used for training and what is retained. This is where privacy exposure is created, so it belongs at the start rather than after you have pasted a client document.",
        },
        {
          step: "Do the task once without the tool and time it",
          detail:
            "This is your baseline. Without it you cannot say whether the tool saved time or merely felt faster, and 'felt faster' is a very common illusion in the first week of using these tools.",
        },
        {
          step: "Test one: rewriting something you already wrote",
          detail:
            "Give it a paragraph of yours and ask for a clearer version. Note how quickly you can judge the result — this is the safe category, because you can verify the output at a glance.",
        },
        {
          step: "Test two: summarising a document you have read",
          detail:
            "Paste a document you know well and ask for a summary. Because you know the source, you can immediately see what it captured and what it missed — which is exactly the condition that makes summarising useful.",
        },
        {
          step: "Test three: summarising a document you have not read",
          detail:
            "Now try one you do not know. Notice that you cannot tell whether the summary is accurate. **This is the same operation with a completely different risk profile**, and the difference is entirely on your side, not the tool's.",
        },
        {
          step: "Test four: ask for a specific fact you can check",
          detail:
            "Ask for something verifiable — a date, a figure, a definition from a named source. Then check it against a real source. Do this several times and count how often the confident answer is wrong.",
        },
        {
          step: "Test five: ask for a citation and check whether it exists",
          detail:
            "Request a reference for a claim, then search for the paper. Finding a plausible-looking citation that does not exist is the single most instructive exercise in this course, and it is why nothing from these tools gets cited unchecked.",
        },
        {
          step: "Test six: multi-step arithmetic",
          detail:
            "Give it a calculation requiring several steps. Watch it produce confident working with a wrong answer. Then note that a calculator takes the same time and is never wrong.",
        },
        {
          step: "Test seven: ask something about the present day",
          detail:
            "Ask for a current price, a recent event, or the latest version of something. Observe that it answers in exactly the same tone as when it is correct — there is no verbal signal that it does not know.",
        },
        {
          step: "Test eight: ask a leading question",
          detail:
            "State a premise and ask whether it is right. Then ask the same question neutrally. Compare the answers and see how readily it agrees with your framing rather than correcting it.",
        },
        {
          step: "Test nine: ask about your specific situation",
          detail:
            "Describe a real constraint from your work and ask for advice. Note how generic the answer is, and how it misses the local detail that actually decides the question.",
        },
        {
          step: "Record which tests passed and which failed",
          detail:
            "Write it down as two lists: tasks it handled well, tasks it did not. This is not an exercise conclusion — it is the evidence base for the workflow you will build in sessions two and three.",
        },
        {
          step: "Map the results onto your real task",
          detail:
            "Break your recurring task into steps and mark each as safe to delegate, useful with checking, or keep manual. This mapping is the actual deliverable of the course, and today you have earned the right to draw it.",
        },
        {
          step: "Identify what you will keep manual and say why",
          detail:
            "Usually the parts involving specific facts, judgement about your client, or anything you cannot check quickly. Naming these explicitly is what separates a workflow from an abdication.",
        },
        {
          step: "Set your verification rule for the parts you delegate",
          detail:
            "For each delegated step, write how you will check the output. A delegated step with no verification rule is not a workflow; it is a hope that the output is right.",
        },
        {
          step: "Write your first honest expectation",
          detail:
            "One paragraph on what this will change in your week and what it will not. Most people overestimate the first month and underestimate the second, and writing this down now is useful later.",
        },
      ],
    },
    practice: {
      title: "Test a tool against your real work and map what is safe to delegate",
      brief:
        "Choose one tool and one recurring task, run the failure tests yourself, and produce the delegation map that the rest of this course builds on.",
      steps: [
        "Choose one real recurring task you do at least weekly, not something impressive-sounding.",
        "Choose one tool and read its data policy before typing anything into it.",
        "Do the task once without the tool and record how long it took as your baseline.",
        "Test rewriting a paragraph of your own and note how fast you can judge the result.",
        "Test summarising a document you know well, and note what it missed.",
        "Test summarising a document you do not know, and note that you cannot judge the result.",
        "Ask for a verifiable fact and check it against a real source; repeat several times and count errors.",
        "Ask for a citation and search for whether the source actually exists.",
        "Give it a multi-step calculation and check the answer against a calculator.",
        "Ask about something current and observe that the tone gives no signal of uncertainty.",
        "Ask a leading question, then the same question neutrally, and compare.",
        "Ask about a specific constraint from your own work and note how generic the answer is.",
        "Write two lists: what it handled well and what it did not, with examples.",
        "Break your recurring task into steps and mark each as delegate, check, or keep manual.",
        "Name the steps you keep manual and state the reason for each.",
        "Write a verification rule for every step you delegate.",
        "Write one honest paragraph on what this will and will not change in your week.",
      ],
      standard:
        "One real recurring task selected and timed without the tool as a baseline; one tool chosen with its data policy read before first use; all nine tests performed with results recorded, including at least one fabricated citation searched for and one multi-step calculation checked against a calculator; two written lists of strengths and failures with examples; the recurring task broken into steps and each marked delegate, check, or keep manual; every manual step justified and every delegated step given a verification rule; and an honest written expectation of what will and will not change.",
    },
    pitfalls: [
      {
        problem: "Reading confidence as accuracy",
        fix: "Fluency is what the model optimises for, and it produces assured prose whether or not the content is correct. Verify specific claims against real sources; tone carries no information about truth.",
      },
      {
        problem: "Assuming there is a database being consulted",
        fix: "The model predicts plausible next words rather than looking anything up. When plausible wording and truth diverge, nothing in the process notices — that is precisely what a hallucination is.",
      },
      {
        problem: "Accepting a citation without searching for it",
        fix: "A plausible-looking reference with a real-sounding journal and a wrong title survives a casual check and fails a real one. Search for every source before you rely on or repeat it.",
      },
      {
        problem: "Asking about current prices, events or versions",
        fix: "Its knowledge stops at its training data and it will answer anyway, in the same tone as when it is correct. Use a live search for anything that may have changed recently.",
      },
      {
        problem: "Trusting it with multi-step arithmetic",
        fix: "It will produce confident working with a wrong answer. Use a calculator or a spreadsheet — they take the same time and are never wrong.",
      },
      {
        problem: "Asking leading questions and treating the agreement as confirmation",
        fix: "It is predisposed to go along with a stated premise. Ask neutrally, or ask for objections explicitly, if you want a useful answer rather than an agreeable one.",
      },
      {
        problem: "Pasting confidential material into a tool you have not checked",
        fix: "Read the data policy first. Some services use submissions to improve their models, and a client contract or staff list sent somewhere is not retrievable afterwards.",
      },
      {
        problem: "Trying five tools shallowly and concluding the technology is inconsistent",
        fix: "What usually varies is the prompting, not the tools. Use one properly for two weeks; depth teaches technique, breadth teaches nothing.",
      },
    ],
    expertNotes: [
      "Hold the picture of a very fast, very well-read assistant with no judgement and no memory of being wrong. It is close to a literal account of the software and it predicts both the value and the failure modes accurately, which makes it more useful than any amount of technical detail.",
      "The safe category is language work you can verify quickly. Rewriting, restructuring, summarising material you already know, generating options — in each case you can judge the output at a glance, and that checkability is what makes the speed safe rather than reckless.",
      "Search for every citation before you rely on it. Finding one fabricated reference yourself, early, changes how you read everything these tools produce far more effectively than any warning you could be given.",
      "Choose one tool and use it properly for two weeks. Depth teaches technique and gives you a standard to judge alternatives against; sampling five tools teaches you nothing except that your own prompting was shallow.",
    ],
    vocabulary: [
      {
        term: "Language model",
        meaning:
          "A system trained to predict what text plausibly follows from the text it is given. It predicts rather than retrieves or reasons, which explains its failure modes.",
      },
      {
        term: "Hallucination",
        meaning:
          "Confident output that is false — often a plausible-shaped fact or citation. It arises because nothing in the prediction process checks against truth.",
      },
      {
        term: "Training data",
        meaning:
          "The text a model learned from. It sets the boundary of what the model can know, and anything more recent is unreliable or absent.",
      },
      {
        term: "Verifiability",
        meaning:
          "How quickly and easily you can check an output. It is the property that makes delegating a task safe, and it varies with the task rather than with the tool.",
      },
      {
        term: "Transformation task",
        meaning:
          "Changing the form of content that already exists — notes into a summary, a transcript into action items. Safe because nothing new needs to be true.",
      },
      {
        term: "Options versus answers",
        meaning:
          "Using output as candidates you select from rather than as conclusions you accept. The distinction is controlled entirely by how you use the tool.",
      },
      {
        term: "Data policy",
        meaning:
          "A service's stated handling of what you submit, including whether it is used for training. Read before pasting anything confidential.",
      },
      {
        term: "Delegation map",
        meaning:
          "A step-by-step breakdown of a task marking each part as safe to delegate, useful with checking, or keep manual, each with a verification rule.",
      },
    ],
    homework: [
      {
        task: "Run all nine tests and record the results",
        detail:
          "Including at least one citation searched for and found not to exist, one multi-step calculation checked, and one leading question compared against a neutral version. Your two lists of strengths and failures are the evidence base for the rest of the course.",
      },
      {
        task: "Choose your recurring task and time your baseline",
        detail:
          "Something you do at least weekly. Do it once without the tool and record the time, so that later you can say whether the workflow genuinely saved time rather than merely feeling faster.",
      },
      {
        task: "Produce your delegation map",
        detail:
          "Break the task into steps, mark each delegate, check, or keep manual, justify every manual step, and write a verification rule for every delegated step. This is the deliverable the course is built around.",
      },
      {
        task: "Read one tool's data policy and write four lines on it",
        detail:
          "Whether submissions are used for training, how long they are retained, what you will therefore never paste into it, and what you would need to see before using it with client material.",
      },
    ],
    rubric: [
      {
        criterion: "Conceptual understanding",
        passing: "Can describe what the tool does.",
        excellent:
          "Explains prediction rather than retrieval, can state why confidence carries no information about accuracy, and uses that to predict failure modes in advance.",
      },
      {
        criterion: "Empirical testing",
        passing: "Tried the tool on some tasks.",
        excellent:
          "Ran all nine tests with results recorded, including a searched-for citation and a checked calculation, and can cite specific examples from their own testing.",
      },
      {
        criterion: "Task judgement",
        passing: "Knows some tasks suit the tool better.",
        excellent:
          "Distinguishes verifiable language work and transformation tasks from factual, current and arithmetic tasks, and explains why checkability is the deciding property.",
      },
      {
        criterion: "Tool selection",
        passing: "Chose a tool.",
        excellent:
          "Chose against a specific task, read the data policy before first use, and committed to depth with one tool rather than sampling several.",
      },
      {
        criterion: "Delegation map",
        passing: "Identified some tasks to delegate.",
        excellent:
          "A step-by-step map with every manual step justified and every delegated step carrying a verification rule, built on their own test results rather than on general claims.",
      },
    ],
    faqs: [
      {
        q: "Will these tools take my job?",
        a: "They take tasks, not jobs. The realistic pattern is that parts of your work become much faster while the parts requiring judgement, local knowledge and accountability stay with you. People who learn to delegate well do more; people who delegate everything produce work nobody can trust.",
      },
      {
        q: "How do I know if the output is wrong?",
        a: "You usually cannot tell from reading it, which is the problem. Check specific claims against real sources, search for every citation, and use a calculator for arithmetic. The rule is to verify anything factual rather than to try to detect errors by tone.",
      },
      {
        q: "Why does it sound so sure when it is wrong?",
        a: "Because fluency is what it optimises for, and confidence is a feature of fluent prose rather than a signal about truth. There is no verbal tell, which is exactly why verification has to be a step in your process rather than an impression.",
      },
      {
        q: "Which tool should I use?",
        a: "Whichever suits the task you actually do, after reading its data policy. For drafting and rewriting most perform comparably, so choose on interface and cost — then use one properly for two weeks rather than sampling five.",
      },
      {
        q: "Is it cheating to use these at work?",
        a: "Using a tool to draft or restructure is no more cheating than using a spellchecker. Presenting output you have not verified as your own checked work, or claiming sources you have not read, is a different matter — and we cover that boundary properly in the final session.",
      },
    ],
  },

  "prompt-writing": {
    summary:
      "The craft of getting useful output: giving context and constraints, showing examples and formats, iterating rather than accepting the first result, and building a reusable prompt library so the skill compounds.",
    objectives: [
      "Write prompts that supply the context a model cannot guess",
      "Use constraints and examples to shape output instead of hoping for it",
      "Iterate on a result deliberately rather than re-rolling and hoping",
      "Diagnose why an output is wrong and fix the prompt rather than the text",
      "Build a reusable prompt library that makes you faster over time",
    ],
    blocks: [
      {
        heading: "Why prompts matter: the model is guessing what you meant",
        body: [
          "A prompt is the entire input the model has. It does not know who you are, who the reader is, what the document is for, how long it should be, or what tone you want — unless you say. **Every one of those gaps is filled by a guess**, drawn from whatever is statistically typical, which means generic. A vague prompt does not produce a bad answer; it produces an average answer, and average is rarely what you needed.",
          "This reframes prompt writing away from incantations and tricks. There is no magic phrasing. **There is only the difference between telling somebody what you need and hoping they infer it.** The people who get good output are not using secret techniques; they are describing the task more completely, in the way you would describe it to a capable assistant on their first day.",
          "The practical test of a prompt is simple: **if you handed it to a competent human who knew nothing about you, could they produce what you want?** If not, the model cannot either. That test catches nearly every weak prompt, and it has the advantage of requiring no technical knowledge to apply.",
        ],
      },
      {
        heading: "Context and constraints: the two things beginners leave out",
        body: [
          "**Context** is who, what and why. Who you are, who will read the output, what it is for, what has already happened. 'Write an email about the delay' gives the model nothing; 'I run a small furniture workshop in Lagos. A client's dining table will be two weeks late because the timber supplier failed. She has been patient and I want to keep her. Write a short email' gives it everything it needs to produce something you would actually send.",
          "**Constraints** are the boundaries: length, format, tone, what to include, what to leave out. These matter more than people expect, because a model's default is to be thorough — which usually means too long. Say **'under 150 words'**, say **'no bullet points'**, say **'do not mention price'**, and the output changes shape entirely. Constraints are also where you prevent the padding and hedging that makes generic AI text recognisable.",
          "One constraint deserves special mention because it is so useful: **tell it what not to do.** 'Do not start with I hope this email finds you well. Do not use the word delve. Do not add a summary at the end.' Models reproduce the conventions of the text they were trained on, and the conventions of formal writing are exactly the ones readers have grown tired of. Naming the clichés you want avoided is more effective than asking for something 'natural'.",
        ],
      },
      {
        heading: "Examples and formats: showing beats describing",
        body: [
          "If you want output in a particular shape, **show it one.** Give an example of the style you want, or of a previous piece you wrote, or of the exact structure — and it will match far more reliably than any adjective you could use. 'Professional but warm' means different things to different readers; a sample paragraph means one thing.",
          "This extends to structure. If you want a report with specific headings, **list the headings.** If you want a table, **give the column names.** If you want three options with pros and cons, **show the shape of one option.** Specifying structure in the prompt removes the most common source of unusable output, which is content that is fine but arranged wrong.",
          "The deeper principle is that **the model is an imitation engine, so imitation is the most reliable instruction.** An example is worth more than a paragraph of adjectives. If you find yourself writing a long description of the tone you want, stop and paste an example instead — it will be shorter and it will work better.",
        ],
      },
      {
        heading: "Iterating: the skill most people never learn",
        body: [
          "Most people treat the first output as the answer. If it is not right, they rephrase slightly and try again, or they give up and write it themselves. The productive approach is different: **treat the first output as a draft to be directed**, and iterate deliberately rather than re-rolling.",
          "Deliberate iteration means naming the specific defect. Not 'make it better' — that produces a different generic answer. Rather: **'shorten the second paragraph by half', 'the opening is too formal, start with the actual news', 'you have included the price; remove it', 'this reads like a template; make the second sentence specific to a dining table.'** Each instruction narrows the output, and three rounds of specific direction typically produces something better than twenty random retries.",
          "Then the diagnostic habit that makes you faster over time. **When output is wrong, ask what the prompt failed to say.** Usually the answer is identifiable — you did not specify the reader, or the length, or the thing to avoid. **Fix the prompt, not just the output**, because the corrected prompt goes into your library and the next time costs nothing. Iterating on output makes this task easier; iterating on prompts makes every future task easier.",
        ],
      },
      {
        heading: "A reusable prompt library: the difference between a trick and a skill",
        body: [
          "A prompt library is a document of the prompts that work for your recurring tasks, refined through use. It sounds trivial and it is what separates someone who is occasionally impressed by these tools from someone who is reliably faster because of them. **Without a library you restart from a blank prompt every time**, and you repeat the same mistakes and the same iterations.",
          "The format that works is simple. For each recurring task: **the prompt itself**, with the parts you change marked clearly; **a note on what it does well and where it needs checking**; and **the verification step** you always run. That last element is what makes the library safe rather than merely convenient — a prompt without a stated check is an invitation to skip checking.",
          "Then the maintenance habit. **Update a prompt when you find a better phrasing**, which happens constantly in the first month. **Retire prompts that produce output you always rewrite anyway**, because those are not saving you time however clever they look. And keep the library where you will actually find it — a document in your cloud storage, next to the templates from the Digital Productivity course, so the two systems work together rather than separately.",
        ],
      },
    ],
    demonstration: {
      intro:
        "We take the recurring task from session one and build the prompts for it properly — from a vague first attempt through context, constraints, examples and iteration, into a library entry with a verification step.",
      steps: [
        {
          step: "Start with the vague prompt and observe the result",
          detail:
            "Ask for the thing with no context at all, the way most people first do. Note specifically what is generic about the output — this is the baseline that makes every later improvement visible.",
        },
        {
          step: "Apply the human test to your prompt",
          detail:
            "Ask whether a competent person who knew nothing about you could produce what you want from what you wrote. Whatever they would have to guess, the model guessed too — and guessed generically.",
        },
        {
          step: "Add context: who you are, who reads it, what it is for",
          detail:
            "Rewrite the prompt with all three. Note how much the output changes from the same basic request. This single addition usually accounts for most of the quality difference beginners notice in other people's results.",
        },
        {
          step: "Add what has already happened",
          detail:
            "The prior conversation, the history with the client, what has already been said. Models cannot know this and will otherwise produce text that ignores it, which reads as careless even when the writing is good.",
        },
        {
          step: "Add length and format constraints",
          detail:
            "Under a stated word count, in prose or in bullets as you actually want it. Without a length constraint the default is thorough, which almost always means too long for the real purpose.",
        },
        {
          step: "Add tone constraints and name what to avoid",
          detail:
            "Say what not to do: no 'I hope this finds you well', no summary at the end, no hedging. Naming the clichés you want avoided works better than asking for something natural, because it removes specific patterns rather than requesting an abstraction.",
        },
        {
          step: "Give an example of the style you want",
          detail:
            "Paste a paragraph of your own writing, or a sample of the tone you are after. The model imitates, so an example is worth more than any paragraph of adjectives you could write instead.",
        },
        {
          step: "Specify the structure explicitly if the task has one",
          detail:
            "List the headings, give the table columns, or show the shape of one item. Specifying structure removes the most common source of unusable output: content that is fine but arranged wrong.",
        },
        {
          step: "Compare the constrained output with the vague first attempt",
          detail:
            "Put them side by side. This comparison is the actual lesson of the session, and seeing your own before-and-after is more convincing than any explanation.",
        },
        {
          step: "Iterate with specific defects, not general complaints",
          detail:
            "'Shorten paragraph two by half. The opening is too formal — start with the news.' Not 'make it better'. Specific direction narrows the output; general requests produce a different generic answer.",
        },
        {
          step: "Run three rounds and stop when it is right",
          detail:
            "Note that three rounds of specific direction typically beats twenty random retries. Knowing when to stop is part of the skill — perfect is not the target, good-enough-to-send is.",
        },
        {
          step: "Diagnose what the prompt failed to say",
          detail:
            "For each defect you had to correct, identify the missing instruction. Usually it is the reader, the length, or something to avoid. This diagnosis is what turns a one-off fix into a permanent improvement.",
        },
        {
          step: "Write the corrected prompt into your library",
          detail:
            "With the parts you change marked clearly, so next time you fill in the blanks rather than reconstructing the whole thing from memory.",
        },
        {
          step: "Add the note on where it needs checking",
          detail:
            "What this prompt reliably gets wrong, based on what you just observed. A prompt whose failure modes are undocumented will be trusted too much by future you.",
        },
        {
          step: "Add the verification step to the library entry",
          detail:
            "What you always check in this output. A prompt without a stated check is an invitation to skip checking, and skipping is how fabricated details reach a client.",
        },
        {
          step: "Build two more library entries for related tasks",
          detail:
            "The point of a library is repetition. Three entries for tasks you do weekly will save more time in a month than one brilliant prompt for something you do annually.",
        },
        {
          step: "Store the library where you will find it",
          detail:
            "In your cloud storage next to your email templates. A library you cannot locate is not a library, and the two systems work better together than apart.",
        },
        {
          step: "Time the task again and compare with your baseline",
          detail:
            "Against the time you recorded in session one. This is the honest measure, and it is usually smaller than expected in week one and larger by month two as the library grows.",
        },
        {
          step: "Retire anything that did not earn its place",
          detail:
            "If a prompt produces output you always rewrite anyway, delete it. A library of prompts that genuinely save time is worth more than a longer library of clever ones you do not use.",
        },
      ],
    },
    practice: {
      title: "Build the prompts for your real task and start a library",
      brief:
        "Take the recurring task from session one, build its prompt properly through context, constraints, examples and iteration, and record it as a library entry with a verification step.",
      steps: [
        "Start with a vague prompt and record what is generic about the output as your baseline.",
        "Apply the human test: could someone who knew nothing about you produce what you want?",
        "Add context — who you are, who reads the output, what it is for.",
        "Add what has already happened, so the output does not ignore the history.",
        "Add a length constraint and a format constraint.",
        "Add tone constraints and explicitly name the clichés to avoid.",
        "Give an example of the style you want rather than describing it in adjectives.",
        "Specify structure explicitly if the task has headings, columns or repeated items.",
        "Compare the constrained output with the vague first attempt side by side.",
        "Iterate with specific defects named, not general requests to improve.",
        "Run three rounds of direction and stop when the output is good enough to use.",
        "For each defect, identify the instruction the prompt was missing.",
        "Write the corrected prompt into a library document with changeable parts marked.",
        "Note what this prompt reliably gets wrong, from what you observed.",
        "Add the verification step you will always run on this output.",
        "Build two more entries for related recurring tasks.",
        "Store the library in cloud storage next to your templates.",
        "Time the task again and compare against your session-one baseline.",
        "Delete any prompt whose output you always end up rewriting.",
      ],
      standard:
        "A vague baseline recorded and compared side by side with the final constrained output; the human test applied; context, history, length, format and tone constraints all added with clichés explicitly named; an example supplied rather than adjectives; structure specified where the task has any; at least three rounds of iteration using specific named defects; each defect traced to a missing instruction in the prompt; **three library entries, each with changeable parts marked, a note on known failure modes, and a stated verification step**; the library stored where it will be found; the task re-timed against baseline; and any prompt that did not earn its place retired.",
    },
    pitfalls: [
      {
        problem: "Writing a vague prompt and treating generic output as the tool's limit",
        fix: "Apply the human test. Every gap you leave is filled by a statistically typical guess, and typical is rarely what you needed. Describe the task as you would to a capable assistant on their first day.",
      },
      {
        problem: "Omitting who will read the output",
        fix: "The reader determines tone, detail and length more than anything else. A model that does not know the audience writes for everyone, which means for no one.",
      },
      {
        problem: "No length constraint, then complaining the output is too long",
        fix: "The default is thorough, which means long. State a word count. It is the single most effective constraint and the one most often omitted.",
      },
      {
        problem: "Describing a tone in adjectives instead of showing an example",
        fix: "The model imitates, so a sample paragraph is worth more than a paragraph of description. If you are writing at length about the tone you want, paste an example instead.",
      },
      {
        problem: "Saying 'make it better' when iterating",
        fix: "That produces a different generic answer. Name the specific defect — shorten this paragraph, the opening is too formal, remove the price — and the output narrows instead of wandering.",
      },
      {
        problem: "Re-rolling instead of directing",
        fix: "Three rounds of specific direction usually beats twenty random retries. Re-rolling discards what worked along with what did not.",
      },
      {
        problem: "Fixing the output without fixing the prompt",
        fix: "Identify the instruction that was missing and add it. Correcting the output helps this task once; correcting the prompt helps every future one.",
      },
      {
        problem: "Keeping prompts that produce output you always rewrite",
        fix: "Retire them. A short library of prompts that genuinely save time is worth more than a long one of clever prompts you do not actually use.",
      },
    ],
    expertNotes: [
      "Apply the human test to every prompt: could a competent person who knew nothing about you produce what you want from what you wrote? It requires no technical knowledge and it catches nearly every weak prompt, because whatever they would have to guess, the model guessed generically.",
      "Name the clichés you want avoided rather than asking for something natural. Models reproduce the conventions of formal writing that readers have grown tired of, and removing specific patterns works far better than requesting an abstraction.",
      "Diagnose the prompt, not just the output. Every defect you correct tells you an instruction was missing, and adding it means the next attempt starts further along. This is what converts prompt writing from a trick into a compounding skill.",
      "Keep the library next to your email templates in cloud storage. The two systems do the same job — capturing what you write repeatedly — and keeping them together means both actually get used.",
    ],
    vocabulary: [
      {
        term: "Prompt",
        meaning:
          "The entire input a model receives. Every gap in it is filled by a statistically typical guess, which is why completeness matters more than phrasing.",
      },
      {
        term: "The human test",
        meaning:
          "Asking whether a competent person who knew nothing about you could produce what you want. It catches nearly every weak prompt without requiring technical knowledge.",
      },
      {
        term: "Context",
        meaning:
          "Who you are, who reads the output, what it is for, and what has already happened. The element beginners most often omit and the one that changes output most.",
      },
      {
        term: "Constraint",
        meaning:
          "A stated boundary — length, format, tone, what to include or exclude. Without a length constraint the default output is thorough, which usually means too long.",
      },
      {
        term: "Negative constraint",
        meaning:
          "An instruction about what not to do, such as avoiding a specific cliché. Often more effective than requesting an abstract quality like naturalness.",
      },
      {
        term: "Few-shot example",
        meaning:
          "Showing the model one or more samples of the desired style or structure. Because it imitates, an example outweighs a paragraph of description.",
      },
      {
        term: "Deliberate iteration",
        meaning:
          "Improving output by naming specific defects rather than requesting general improvement or re-rolling. Three directed rounds typically beat twenty random retries.",
      },
      {
        term: "Prompt library",
        meaning:
          "A maintained document of working prompts for recurring tasks, each with changeable parts marked, known failure modes noted, and a verification step stated.",
      },
    ],
    homework: [
      {
        task: "Rewrite your weakest prompt using everything from this session",
        detail:
          "Add context, history, length, format, tone and negative constraints, plus an example. Show the before-and-after side by side and write three lines on which addition improved the output most.",
      },
      {
        task: "Practise deliberate iteration",
        detail:
          "Take one output and improve it over three rounds using only specific named defects. Record each instruction and what changed, and note how it differs from simply asking again.",
      },
      {
        task: "Build three library entries",
        detail:
          "For tasks you do weekly. Each with changeable parts marked, a note on what it reliably gets wrong, and the verification step you will always run.",
      },
      {
        task: "Diagnose five failed outputs",
        detail:
          "For each, identify the instruction the prompt was missing rather than only fixing the text. Then update the prompt so the same failure does not recur.",
      },
    ],
    rubric: [
      {
        criterion: "Prompt completeness",
        passing: "Prompts produce usable output.",
        excellent:
          "Context, reader, purpose, history, length, format and tone all specified, with negative constraints naming specific clichés to avoid, and the human test satisfied.",
      },
      {
        criterion: "Use of examples",
        passing: "Described the desired output.",
        excellent:
          "Supplied samples or explicit structure rather than relying on adjectives, and can explain why imitation is the most reliable form of instruction.",
      },
      {
        criterion: "Iteration skill",
        passing: "Retried until the output improved.",
        excellent:
          "Named specific defects across at least three rounds, stopped at good-enough rather than perfect, and can distinguish directing from re-rolling.",
      },
      {
        criterion: "Diagnostic habit",
        passing: "Fixed outputs that were wrong.",
        excellent:
          "Traced each defect to a missing instruction and updated the prompt, so the improvement applies to future tasks rather than only to this one.",
      },
      {
        criterion: "Library quality",
        passing: "Saved some prompts.",
        excellent:
          "Three entries with changeable parts marked, documented failure modes and a stated verification step, stored where they will be found, with unused prompts retired.",
      },
    ],
    faqs: [
      {
        q: "Are there magic words that make prompts work better?",
        a: "No. There is only the difference between describing what you need and hoping it is inferred. The people who get good output are describing the task more completely, not using secret phrasing.",
      },
      {
        q: "How long should a prompt be?",
        a: "As long as the task requires and no longer. A simple rewrite needs one line; a client email with history and constraints needs a short paragraph. Length is not the goal — completeness is.",
      },
      {
        q: "Why does the output always sound like AI?",
        a: "Because it reproduces the conventions of the formal writing it was trained on. Add negative constraints naming the specific phrases and habits you want avoided, and supply an example of your own voice.",
      },
      {
        q: "How many iterations is too many?",
        a: "If three rounds of specific direction have not got it usable, the prompt is missing something structural — usually the reader or an example. Fix the prompt rather than continuing to iterate on the output.",
      },
      {
        q: "Is keeping a prompt library really worth it?",
        a: "It is what makes the skill compound. Without one you restart from blank every time and repeat the same iterations; with one, three entries for weekly tasks will save more in a month than any single clever prompt.",
      },
    ],
  },

  "ai-assisted-research-work": {
    summary:
      "Using these tools for research and real work without being misled: summarising and drafting where they help, verifying everything that matters, and handling citation and sources honestly.",
    objectives: [
      "Use AI for summarising and drafting in ways that keep you in control of the content",
      "Build a verification routine that catches fabricated facts and sources",
      "Handle citation properly, including when a tool's source does not exist",
      "Integrate AI into a real work task end to end with checks at the right points",
      "Know which parts of research should never be delegated",
    ],
    blocks: [
      {
        heading: "The division of labour that makes research safe",
        body: [
          "The useful split is not 'AI does research, you check it'. It is narrower and more practical: **the tool handles language and structure; you handle facts and judgement.** Summarising a document you have, restructuring your notes, drafting a section from an outline you supplied, rephrasing for a different audience — all language work, all verifiable by you quickly. Anything involving a specific fact, figure, date, source or claim about the world is yours.",
          "That split sounds restrictive and it is not, because the language work is most of the time. The reason the division matters is asymmetric risk: **a badly written paragraph costs you ten minutes, while a fabricated citation in a client report or a student dissertation can cost you your standing.** Optimising for speed on the wrong side of that line is a poor trade.",
          "So the working rule for this session is: **let the tool work with material you have already established as true.** Give it your notes, your sources, your data, and have it reorganise and express them. Do not ask it what is true and then check afterwards, because you will not check as carefully as you think you will — a plausible sentence reads as verified even when it is not.",
        ],
      },
      {
        heading: "Summarising: powerful, and dangerous in one specific way",
        body: [
          "Summarising is one of the strongest uses, and the safe form is **summarising a document you provide**. The model works from your text, so nothing needs to be invented, and because you know the source you can immediately see what it captured and what it dropped. This is genuinely useful and genuinely low-risk.",
          "The dangerous form is summarising something you have not read, or asking it to summarise a topic rather than a document. Now there is no source in front of you, and the output may be a fluent synthesis of plausible-sounding material rather than a summary of anything real. **The operation looks identical; the risk is completely different**, and the difference is invisible unless you notice which one you are doing.",
          "Two habits keep summarising useful. **Ask for what is missing as well as what is present** — 'what does this document not address?' turns a summary into a gap analysis, which is more valuable and forces you to engage with the source. And **keep the source open beside the summary** while you use it, so any claim can be traced back in a second rather than trusted from memory.",
        ],
      },
      {
        heading: "Drafting: the tool writes, you own the content",
        body: [
          "Drafting works well when you supply the substance. **Give it your points, your data, your argument**, and have it produce prose — that is transformation work, and it is fast. What fails is asking it to write about a subject and then adopting its framing, because its framing is generic and its specifics are unverified.",
          "The practical method is to draft in the order that keeps you in control. **Outline first, yourself** — the argument, the sequence, the evidence. **Then draft section by section, not all at once**, because a section at a time is checkable and a whole document at once is not. **Then edit for accuracy and voice**, which is where you add the specificity that makes it yours and removes the padding that makes it recognisably generic.",
          "There is an honest point here about ownership. Text you have outlined, supplied the substance for, verified and rewritten is your work — you used a tool the way you would use a spellchecker or a thesaurus. **Text you accepted without reading carefully is not your work and will not survive scrutiny**, in a classroom or a client meeting. The boundary is not which tool you used; it is whether you understand and stand behind what was produced.",
        ],
      },
      {
        heading: "Verification: the routine, not the intention",
        body: [
          "Everybody intends to check. The routine is what makes checking actually happen, and it is short. **Every specific claim gets verified against a source you can name.** Names, dates, figures, statistics, legal references, product versions, quotations — anything that could be wrong and would matter if it were. A claim you cannot verify does not go in, however plausible it reads.",
          "Then the citation rule, which is absolute: **search for every source before you cite it.** A tool can produce a reference with a real-sounding author, a plausible journal and a specific year that does not correspond to any actual publication. It is not lying; it is producing the shape a citation has. Searching takes thirty seconds and it is the difference between a reference and a fabrication that ends up in a document with your name on it.",
          "Two supporting habits. **Check quotations verbatim** — a paraphrase presented in quotation marks with a source attached is a misquotation, and it is a serious one in academic work. And **verify the most load-bearing claim first**, because if the central fact is wrong the rest of the piece is wasted effort. **Verification is cheaper in proportion to how early you do it**, which is an argument for checking as you draft rather than at the end.",
        ],
      },
      {
        heading: "What not to delegate, and why the list is short",
        body: [
          "The list of things that should stay with you is shorter than people fear, and it is consistent. **Establishing what is true** — because the tool cannot and will not tell you it is guessing. **Judgement about your specific situation** — your client, your contract, your local context, where generic advice misses the constraint that decides the question. **Anything you cannot verify quickly**, because unverifiable output cannot be safely used at all.",
          "Then the categories where the cost of error is high enough that delegation is never worth it regardless of speed. **Legal, medical, financial and regulatory specifics** — a plausible answer in these areas can cause real harm, and the appropriate response is a professional, not a language model. **Anything about a named person or organisation** that could be defamatory or simply wrong. And **original analysis you are being paid or graded for**, because that is the thing being assessed, not the prose it is written in.",
          "The honest framing is that this is not a restriction on the tool; it is an accurate description of what it is. **A prediction engine with no access to truth and no understanding of your situation** should not be deciding facts, judging your circumstances, or answering questions where being wrong is expensive. Everything else — the drafting, the restructuring, the summarising, the option generation — is genuinely faster with help, and there is a great deal of it.",
        ],
      },
    ],
    demonstration: {
      intro:
        "We run a real research-and-writing task end to end with the tool doing language work and us doing facts — including deliberately catching a fabricated citation and building the verification routine around it.",
      steps: [
        {
          step: "Pick a real piece of work with a factual component",
          detail:
            "A client proposal, a report, an article, an assignment. It must contain claims that could be checked, because the whole session is about where the checking happens.",
        },
        {
          step: "Do the research yourself first, from real sources",
          detail:
            "Find and read the actual sources before involving the tool. This order matters: established facts go in, and the tool expresses them. The reverse order is how fabrications enter a document.",
        },
        {
          step: "Take notes in your own words with sources beside each point",
          detail:
            "Every fact gets its source noted at the moment you record it. Retrofitting sources later is when things get attributed loosely, and loose attribution becomes a real problem if anyone checks.",
        },
        {
          step: "Have the tool summarise a source you have read",
          detail:
            "Paste the document and ask for a summary plus what it does not address. Because you know the source, you can verify immediately — which is the condition that makes summarising safe.",
        },
        {
          step: "Compare the summary against the source and note the gaps",
          detail:
            "What did it drop, and what did it flatten? Summaries lose nuance predictably, and knowing which nuance matters is your judgement rather than the tool's.",
        },
        {
          step: "Ask it to summarise a topic it was not given text for",
          detail:
            "Observe that the output is fluent and confident with no source in front of either of you. This is the same operation with a completely different risk, and seeing the difference is the point.",
        },
        {
          step: "Write your own outline before any drafting",
          detail:
            "The argument, the sequence, and the evidence for each section. Supplying the structure yourself is what keeps you in control of the content rather than adopting a generic framing.",
        },
        {
          step: "Draft one section at a time, supplying your substance",
          detail:
            "Give it your points and data for that section only. A section is checkable; a whole document at once is not, and unread output is output you do not actually own.",
        },
        {
          step: "Edit each section for accuracy and voice immediately",
          detail:
            "Add the specifics that make it yours and remove the padding that makes it generic. Do this per section rather than at the end, while the source is still in front of you.",
        },
        {
          step: "Ask it for a citation and search for the source",
          detail:
            "Request a reference for one of your claims, then search for the paper. When you find it does not exist — or exists with different authors and a different year — you have seen the failure that matters most.",
        },
        {
          step: "Adopt the absolute rule: search before you cite",
          detail:
            "Every source, every time, thirty seconds. It is producing the shape a citation has, not retrieving one, and the only check that works is looking it up yourself.",
        },
        {
          step: "Check any quotation verbatim against the original",
          detail:
            "A paraphrase in quotation marks with a source attached is a misquotation. If you cannot find the exact wording in the source, it is not a quotation and should not be presented as one.",
        },
        {
          step: "Verify the most load-bearing claim first",
          detail:
            "If the central fact is wrong, everything built on it is wasted. Checking early is cheaper in proportion than checking at the end, which is an argument for verifying as you draft.",
        },
        {
          step: "Check every figure and statistic against its original source",
          detail:
            "Not against the tool's restatement of it. Numbers are where confident error is most damaging, because a wrong figure in a client report is difficult to walk back credibly.",
        },
        {
          step: "Ask for objections to your argument",
          detail:
            "This is a strong use that requires no factual trust: generating counter-arguments you then evaluate. Use it to strengthen the piece rather than to find agreement.",
        },
        {
          step: "Do a final read as though you were the sceptical reader",
          detail:
            "Every claim you would challenge if someone else wrote it, check. This read is the last line, and it works only if you have not already convinced yourself the output is fine.",
        },
        {
          step: "Record the verification steps as part of the workflow",
          detail:
            "Write down what you checked and how. The deliverable of this course is a documented workflow, and the verification steps are its most important part.",
        },
        {
          step: "Note what you kept manual and why",
          detail:
            "Establishing facts, judging your situation, and anything unverifiable. Stating this explicitly is what makes the workflow a workflow rather than an abdication.",
        },
      ],
    },
    practice: {
      title: "Run a real research task end to end with verification built in",
      brief:
        "Complete a genuine piece of work containing factual claims, using the tool for language and structure while you establish and verify every fact, and document the workflow.",
      steps: [
        "Choose a real piece of work with a factual component that could be checked.",
        "Do the research yourself from real sources before involving the tool at all.",
        "Take notes in your own words with the source recorded beside each point.",
        "Have the tool summarise a document you have read, asking also what it does not address.",
        "Compare the summary against the source and note what it dropped or flattened.",
        "Ask it to summarise a topic without providing text, and observe the difference in risk.",
        "Write your own outline — argument, sequence, evidence — before any drafting.",
        "Draft one section at a time, supplying your substance rather than asking it what to say.",
        "Edit each section immediately for accuracy and voice while the source is in front of you.",
        "Ask for a citation, search for the source, and record whether it exists.",
        "Adopt the rule that every source is searched before it is cited.",
        "Check any quotation verbatim against the original wording.",
        "Verify the most load-bearing claim first, before building further on it.",
        "Check every figure and statistic against its original source rather than a restatement.",
        "Ask for objections to your argument and evaluate them yourself.",
        "Do a final read as a sceptical reader, checking anything you would challenge.",
        "Record every verification step as part of your documented workflow.",
        "Write down what you kept manual and the reason for each.",
      ],
      standard:
        "Research completed from real sources before the tool was involved, with notes carrying a source beside each point; summarising performed on documents already read with gaps compared against the source, and the higher-risk unsourced-summary form identified; an original outline written before drafting with sections drafted and edited one at a time; **a citation requested, searched for, and its existence or absence recorded**; every source searched before citation; quotations checked verbatim; the load-bearing claim verified first; every figure checked against its original source; objections generated and evaluated; a sceptical final read completed; and a documented workflow recording every verification step plus what was kept manual and why.",
    },
    pitfalls: [
      {
        problem: "Asking the tool what is true and checking afterwards",
        fix: "Let it work with material you have already established as true. A plausible sentence reads as verified even when it is not, and you will not check afterwards as carefully as you intend to.",
      },
      {
        problem: "Summarising something you have not read",
        fix: "The output may be a fluent synthesis of plausible material rather than a summary of anything real. The operation looks identical to safe summarising, so notice which one you are doing.",
      },
      {
        problem: "Citing a source you have not searched for",
        fix: "Search every one, every time. It is producing the shape a citation has, not retrieving one — and a fabricated reference in a document with your name on it is a serious and very public failure.",
      },
      {
        problem: "Presenting a paraphrase as a quotation",
        fix: "Check the exact wording in the source. If it is not verbatim it is not a quotation, and in academic work a misquotation with a source attached is a significant integrity problem.",
      },
      {
        problem: "Accepting figures from a restatement rather than the original",
        fix: "Trace every number to its primary source. Wrong figures are the most damaging confident error, because they are hard to walk back credibly once a client has seen them.",
      },
      {
        problem: "Drafting a whole document at once and then editing",
        fix: "Draft section by section. A section is checkable and a document is not, and unread output is output you cannot honestly claim as your work.",
      },
      {
        problem: "Adopting the tool's framing of a subject",
        fix: "Outline the argument yourself first. Its framing is generic and its specifics unverified; supplying your own structure keeps the content yours.",
      },
      {
        problem: "Verifying only at the end",
        fix: "Check as you draft, starting with the load-bearing claim. If the central fact is wrong everything built on it is wasted, and early checking is cheaper in proportion.",
      },
    ],
    expertNotes: [
      "Let the tool work with material you have already established as true. Give it your notes, sources and data and have it reorganise and express them. Asking it what is true and checking later fails because a plausible sentence reads as verified, and you will not check as carefully as you intend.",
      "Search for every citation before it goes in a document. Thirty seconds, every time, without exception. Having found one fabricated reference yourself changes how you read all subsequent output more effectively than any warning could.",
      "Draft section by section rather than a document at a time. A section is checkable while the source is in front of you; a whole document invites a skim-read, and unread output is output you cannot honestly stand behind.",
      "The do-not-delegate list is short and stable: establishing what is true, judging your specific situation, and anything you cannot verify quickly — plus legal, medical, financial and regulatory specifics where the cost of error is too high for any speed gain to justify.",
    ],
    vocabulary: [
      {
        term: "Source-grounded work",
        meaning:
          "Using the tool only with material already established as true — your notes, sources and data — so it reorganises and expresses rather than invents.",
      },
      {
        term: "Fabricated citation",
        meaning:
          "A reference with a plausible author, journal and year that corresponds to no actual publication. Detected only by searching for the source.",
      },
      {
        term: "Verbatim check",
        meaning:
          "Confirming quoted wording appears exactly in the source. A paraphrase in quotation marks with an attribution is a misquotation.",
      },
      {
        term: "Load-bearing claim",
        meaning:
          "The central fact an argument depends on. Verified first, because if it is wrong everything built on it is wasted effort.",
      },
      {
        term: "Primary source",
        meaning:
          "The original document a figure or claim comes from, as against a restatement of it. The only acceptable basis for verifying a number.",
      },
      {
        term: "Section drafting",
        meaning:
          "Producing one section at a time and editing it immediately. Keeps output checkable, whereas a whole document invites a skim-read.",
      },
      {
        term: "Gap analysis",
        meaning:
          "Asking what a document does not address, which turns a summary into a more useful exercise and forces engagement with the source.",
      },
      {
        term: "Verification routine",
        meaning:
          "A stated, repeatable set of checks applied to delegated output. An intention to check is not a routine, and only a routine reliably happens.",
      },
    ],
    homework: [
      {
        task: "Complete a real research task with the workflow",
        detail:
          "Research from real sources first, draft section by section from your own outline, edit for accuracy and voice, and do a sceptical final read. Keep the notes with sources beside each point.",
      },
      {
        task: "Run the citation test and record the result",
        detail:
          "Ask for five references on a topic you know, search for each, and record how many exist as described. This single exercise recalibrates how you read everything these tools produce.",
      },
      {
        task: "Write your verification routine",
        detail:
          "A short list of checks you always run: search every source, check quotations verbatim, trace figures to primary sources, verify the load-bearing claim first. Written as steps, not as an intention.",
      },
      {
        task: "List what you will never delegate",
        detail:
          "With a reason for each. Include establishing facts, judging your own situation, anything unverifiable, and the high-cost categories where being wrong is expensive regardless of speed.",
      },
    ],
    rubric: [
      {
        criterion: "Source discipline",
        passing: "Used sources in the work.",
        excellent:
          "Research completed from real sources before the tool was involved, with a source recorded beside each point at the moment it was noted.",
      },
      {
        criterion: "Summarising judgement",
        passing: "Summarised documents.",
        excellent:
          "Summarised only material already read, compared output against the source, used gap analysis, and can explain why unsourced summarising carries different risk.",
      },
      {
        criterion: "Drafting control",
        passing: "Used the tool to draft.",
        excellent:
          "Wrote the outline personally, drafted section by section supplying own substance, edited immediately for accuracy and voice, and can articulate the ownership boundary.",
      },
      {
        criterion: "Verification",
        passing: "Checked some facts.",
        excellent:
          "Every source searched before citation, quotations checked verbatim, figures traced to primary sources, load-bearing claim verified first, and a written routine rather than an intention.",
      },
      {
        criterion: "Delegation boundaries",
        passing: "Knows some tasks are unsuitable.",
        excellent:
          "Can state the do-not-delegate list with reasons, including the high-cost categories, and frames it as an accurate description of what the tool is rather than a limitation on it.",
      },
    ],
    faqs: [
      {
        q: "How often are citations actually fabricated?",
        a: "Often enough that the rule must be absolute. Run the test yourself: ask for five references on a topic you know and search for each. The result recalibrates how you read everything these tools produce, far more effectively than being told.",
      },
      {
        q: "Is it acceptable to use AI for an assignment?",
        a: "That depends on your institution's rules, which you must check first. As a principle: outlining, supplying substance, verifying and rewriting is using a tool; accepting output you have not read carefully is submitting work that is not yours, and it will not survive scrutiny.",
      },
      {
        q: "Can I trust a summary of a document I have not read?",
        a: "Not safely, because you have no way to detect what was dropped, flattened or invented. If you must work from an unread document, have it summarise the text you paste, and keep the source open beside the summary so any claim can be traced.",
      },
      {
        q: "What about figures and statistics it gives me?",
        a: "Trace every number to its primary source rather than accepting a restatement. Wrong figures are the most damaging kind of confident error, because they are hard to walk back credibly once somebody has relied on them.",
      },
      {
        q: "How much verification is enough?",
        a: "Every specific claim that could matter if wrong, every source before you cite it, every quotation verbatim, and the load-bearing claim first. That is a finite list and it takes far less time than fixing a public error.",
      },
    ],
  },

  "responsible-use": {
    summary:
      "The final session: hallucinations and bias, data privacy, academic and workplace honesty, and a personal AI policy you will actually follow — so the workflow you built is one you can defend.",
    objectives: [
      "Recognise hallucination and bias in output and explain why they occur",
      "Handle data privacy deliberately, including what never goes into a tool",
      "Navigate academic and workplace honesty with clear, defensible lines",
      "Disclose AI use appropriately in different contexts",
      "Write a personal AI policy that is short enough to follow",
    ],
    blocks: [
      {
        heading: "Why this session comes last, and why it is not a lecture on ethics",
        body: [
          "You now have a workflow. This session is about making it one you can defend — to a client, an employer, a supervisor, or yourself at two in the morning when something has gone wrong. That is a practical standard, not a moralising one, and it is worth being blunt about why it matters: **the failures here are public and lasting in a way that technical mistakes are not.** A wrong figure gets corrected. A fabricated source in a submitted paper, or a client's confidential data pasted into a tool, is harder to walk back.",
          "So we will treat responsibility as a design constraint on the workflow you built. **Which steps are safe, which need checking, and what never enters the tool at all** — those are engineering decisions with the same status as the prompts and the verification steps. A workflow with no privacy boundary and no disclosure position is incomplete, not merely unethical.",
          "The framing throughout is that **you remain the author and the accountable person.** The tool has no responsibility, cannot be held to account, and does not know when it is wrong. Every consequence of using it lands on you, which is exactly why the policy you write at the end of this session is yours to write rather than somebody else's to impose.",
        ],
      },
      {
        heading: "Hallucination and bias: two different failures with different defences",
        body: [
          "**Hallucination** is confident falsehood — a fact, figure or citation that does not correspond to anything real. You already know the mechanism: the model predicts plausible text rather than retrieving truth, so nothing in the process notices when plausible and true diverge. The defence is the verification routine from last session, and it is procedural rather than attentive, **because you cannot detect hallucination by reading carefully.** It reads exactly like everything else.",
          "**Bias** is a different problem and needs a different defence. The model reproduces the patterns in its training text, which means it reproduces the assumptions embedded there — about who holds which roles, what a professional sounds like, which contexts are treated as normal. This is not malice; it is statistics. The result is output that is **systematically tilted rather than randomly wrong**, which makes it harder to notice because it does not look like an error.",
          "The practical consequences are worth naming because they show up in ordinary work. Job descriptions and role examples skew toward a default that may not match your organisation. Names and examples cluster around the contexts most represented in the training data, so **a request for a Nigerian business example may return something generic and unrecognisably local.** Advice about professional conduct reflects a particular cultural norm. **The defence is to read output asking what it assumes**, and to supply your own context explicitly rather than accepting the default — which is the same prompt discipline from session two, applied to a different risk.",
        ],
      },
      {
        heading: "Data privacy: the decision that cannot be undone",
        body: [
          "Everything else in this course is recoverable. A bad draft gets rewritten, a wrong figure gets corrected. **Data you have submitted somewhere is not recoverable** — once it is sent, you cannot retrieve it, and you may not know what was done with it. That asymmetry is why privacy deserves more caution than any other topic here.",
          "The rule is simple and it is worth memorising: **never paste into a tool what you would not be comfortable appearing elsewhere.** In practice that means client contracts and correspondence, staff lists and salary information, customer databases with names and phone numbers, financial records, medical information, and anything belonging to a third party who did not consent. Note that last category especially — **it is not your data to submit**, and in Nigeria the **NDPA 2023** places real obligations on anyone processing personal data.",
          "Two supporting practices. **Check the data policy of any tool you use for work**, specifically whether submissions are used to improve the model and how long they are retained — you did this in session one, and it is worth revisiting now that you know what you would be exposing. And **anonymise where you can**: if you need help drafting a letter about a dispute, describe the situation without names, amounts and identifying detail. You can almost always get the language help you need without handing over the specifics, and that trade costs you very little.",
        ],
      },
      {
        heading: "Academic and workplace honesty: where the lines actually are",
        body: [
          "The question people ask is 'is it cheating?', and the honest answer is that the tool is not the issue — **what you claim about the work is.** Using software to draft, restructure or check grammar is unremarkable and has been for decades. Presenting output you did not verify as your own checked work, or citing sources you have not read, or claiming analysis you did not perform, is misrepresentation regardless of which tool produced it.",
          "In academic settings the decisive fact is that **you are being assessed on the thinking, not the prose.** If a tool produced the argument, the analysis and the conclusions, then the thing being assessed did not happen, and no amount of disclosure fixes that — disclosure makes it honest, not complete. Use the tool for expression, structure and checking, and do the reasoning yourself. That is both the honest position and the one that leaves you actually knowing the material.",
          "In workplaces the test is different and more permissive, but not unlimited. **Drafting a client email with help is normal.** Sending a client a factual claim you did not verify is a professional failure. Using a tool to summarise a document you then act on is fine; acting on a summary of something you have not read is how bad decisions get made. **The line is verification and accountability, not tool use** — and it is the same line whether or not anybody finds out.",
        ],
      },
      {
        heading: "Disclosure, and writing a policy you will actually follow",
        body: [
          "Disclosure is context-dependent and there is no single rule. **Where an institution or client has a policy, follow it** — that ends the question. Where they do not, the useful test is whether disclosure would change the reader's assessment of the work: if the piece presents analysis, research or expertise that they are relying on, saying how it was produced is honest and costs nothing. **If in doubt, disclose**; the downside of disclosing is small and the downside of being discovered not to have is not.",
          "Then the policy, which is the deliverable of this session and should be short enough to remember. Five lines is enough. **What I use these tools for** — drafting, restructuring, summarising material I have, generating options. **What I never put into them** — client data, personal information, anything confidential. **What I always verify** — every fact, every source, every figure. **What I keep manual** — establishing truth, judging my own situation, original analysis. **When I disclose** — and the default answer.",
          "The reason to write it rather than hold it as a general intention is that **intentions fail under time pressure and policies do not.** At 5pm on a deadline, with a client waiting, the person who has written 'I never paste client data' does not paste client data. The person who intends to be careful pastes it. That is the entire argument for the exercise, and it is the last thing this course asks you to produce.",
        ],
      },
    ],
    demonstration: {
      intro:
        "We stress-test the workflow you built: demonstrate hallucination and bias concretely, work through real privacy decisions, settle the honesty and disclosure questions, and write the five-line policy.",
      steps: [
        {
          step: "Recall the fabricated citation you found in session one",
          detail:
            "If you did not find one, run the test again now — ask for five references on a topic you know and search each. Everything in this session rests on having seen that failure yourself rather than been told about it.",
        },
        {
          step: "Demonstrate that hallucination is undetectable by reading",
          detail:
            "Put a correct claim and a fabricated one side by side and try to tell them apart by tone and fluency. You will not be able to, which is the whole reason verification must be procedural rather than attentive.",
        },
        {
          step: "Test for bias in role and professional examples",
          detail:
            "Ask for examples of a professional role, a business, or a scenario without specifying context. Note whose names, which settings and which assumptions appear by default, and ask what that would do to a piece of work you sent to a Nigerian client.",
        },
        {
          step: "Counteract bias by supplying your own context",
          detail:
            "Re-ask with explicit local detail — the city, the industry, the actual constraint. Note how much the output changes. This is the session-two prompt discipline applied to a different risk, and it works.",
        },
        {
          step: "List what you would never paste into a tool",
          detail:
            "Client contracts and correspondence, staff and salary information, customer databases, financial records, medical information, and anything belonging to a third party. Write it down; a list in your head is a list you will bend under pressure.",
        },
        {
          step: "Re-read the tool's data policy with that list in hand",
          detail:
            "Specifically whether submissions are used for training and how long they are retained. You read this in session one; now you know precisely what would be exposed, which changes what the policy means to you.",
        },
        {
          step: "Practise anonymising a real request",
          detail:
            "Take a task involving a real client or person and rewrite the prompt with names, amounts and identifying detail removed. Confirm you still get the language help you needed — which you almost always do, at very little cost.",
        },
        {
          step: "Consider the third-party case explicitly",
          detail:
            "Customer names and phone numbers are not yours to submit, and NDPA 2023 places obligations on processing personal data. This is the category people overlook, because the data feels like working material rather than somebody's personal information.",
        },
        {
          step: "Work through the academic honesty question on a real assignment",
          detail:
            "Ask what is being assessed. If it is the thinking, then tool-produced argument and analysis means the assessed thing did not happen — disclosure makes it honest but not complete.",
        },
        {
          step: "Work through the workplace honesty question on a real client task",
          detail:
            "Drafting with help is normal. Sending an unverified factual claim is a professional failure. The line is verification and accountability, not tool use — and it holds whether or not anybody finds out.",
        },
        {
          step: "Decide your disclosure default",
          detail:
            "Where a policy exists, follow it. Where none does, ask whether disclosure would change the reader's assessment. When in doubt, disclose — the downside of disclosing is small and the other downside is not.",
        },
        {
          step: "Write line one: what I use these tools for",
          detail:
            "Drafting, restructuring, summarising material you already have, generating options to select from. Be specific, because a general statement is not a guide to action.",
        },
        {
          step: "Write line two: what I never put into them",
          detail:
            "The list you made, compressed. Client data, personal information, anything confidential, anything belonging to a third party. This is the line that protects you irreversibly, so it gets no exceptions.",
        },
        {
          step: "Write line three: what I always verify",
          detail:
            "Every specific fact, every source searched before citation, every figure traced to its primary source, every quotation verbatim. Stated as steps, because an intention to check is not a routine.",
        },
        {
          step: "Write line four: what I keep manual",
          detail:
            "Establishing what is true, judging your own situation, original analysis you are assessed or paid for, and legal, medical, financial or regulatory specifics.",
        },
        {
          step: "Write line five: when I disclose",
          detail:
            "Your default position and the test you apply. Short enough to remember, because a policy you cannot recall under pressure is not a policy.",
        },
        {
          step: "Attach the policy to the workflow document",
          detail:
            "One document containing the task, the prompts, the verification steps, the manual parts and the policy. That is the course deliverable, complete.",
        },
        {
          step: "Re-time the task and compare with your session-one baseline",
          detail:
            "The honest number, including the time verification takes. It is usually smaller than the first week suggested and larger by month two — and knowing the real figure is what makes the workflow trustworthy to you.",
        },
        {
          step: "Present the workflow as though to a sceptical manager",
          detail:
            "What it does, what it saves, what you verify, what never enters the tool, and where you disclose. Being able to answer those five questions confidently is what separates a professional workflow from a habit.",
        },
      ],
    },
    practice: {
      title: "Stress-test your workflow and write the policy",
      brief:
        "Demonstrate the failure modes concretely, settle the privacy, honesty and disclosure questions for your own context, and produce the five-line policy that completes the course deliverable.",
      steps: [
        "Confirm you have personally found a fabricated citation, running the five-reference test again if not.",
        "Place a correct claim and a fabricated one side by side and confirm you cannot distinguish them by reading.",
        "Test for bias by asking for professional or business examples without specifying context, and note the defaults.",
        "Re-ask with explicit local detail and observe how much the output changes.",
        "Write the list of what you would never paste into a tool, including third-party personal data.",
        "Re-read the tool's data policy now that you know what would be exposed.",
        "Anonymise a real client-related prompt, removing names, amounts and identifying detail, and confirm it still works.",
        "Consider explicitly the case of data belonging to a third party, with reference to NDPA 2023.",
        "Work through the academic question on a real assignment by asking what is actually being assessed.",
        "Work through the workplace question on a real client task, locating the line at verification and accountability.",
        "Decide your disclosure default and the test you apply where no policy exists.",
        "Write line one: what you use these tools for, specifically.",
        "Write line two: what you never put into them.",
        "Write line three: what you always verify, stated as steps.",
        "Write line four: what you keep manual.",
        "Write line five: when you disclose.",
        "Attach the policy to your workflow document so the deliverable is complete.",
        "Re-time the task including verification, and compare against your session-one baseline.",
        "Present the workflow answering: what it does, what it saves, what you verify, what never enters the tool, where you disclose.",
      ],
      standard:
        "A fabricated citation personally found and the undetectability of hallucination demonstrated by side-by-side comparison; bias tested on unspecified-context examples and counteracted by supplying explicit local detail; a written never-paste list including third-party personal data with the tool's data policy re-read in that light; a real client prompt successfully anonymised; the academic and workplace honesty questions each worked through on a real task with the line located at verification and accountability; a disclosure default decided with a stated test; **a five-line policy covering use, never-paste, always-verify, keep-manual and disclose — attached to the workflow document**; the task re-timed including verification against the session-one baseline; and the workflow presented so that all five manager questions are answered confidently.",
    },
    pitfalls: [
      {
        problem: "Believing careful reading will catch hallucinations",
        fix: "It will not — a fabricated claim reads exactly like a correct one, because fluency is what the model optimises for. Verification has to be a procedural step, not an attitude.",
      },
      {
        problem: "Treating bias as random error",
        fix: "Bias is systematic rather than random, so it does not look like a mistake. Read output asking what it assumes, and supply your own context explicitly rather than accepting the default.",
      },
      {
        problem: "Pasting client or third-party data because it feels like working material",
        fix: "Customer names and phone numbers are not yours to submit, and NDPA 2023 applies. Anonymise instead — you can almost always get the language help you need without the identifying detail.",
      },
      {
        problem: "Assuming submitted data can be taken back",
        fix: "It cannot. Unlike a bad draft or a wrong figure, data sent somewhere is not recoverable and you may never learn what was done with it. That asymmetry is why this topic gets more caution than any other.",
      },
      {
        problem: "Treating disclosure as the thing that makes AI use acceptable",
        fix: "Disclosure makes it honest, not complete. If a tool produced the argument and analysis in assessed work, the thing being assessed did not happen regardless of whether you said so.",
      },
      {
        problem: "Drawing the honesty line at tool use rather than at verification",
        fix: "Drafting with help is normal; sending an unverified factual claim is a professional failure. The line is verification and accountability, and it holds whether or not anyone finds out.",
      },
      {
        problem: "Holding your standards as general intentions",
        fix: "Intentions fail under time pressure and policies do not. Write the five lines down, because at 5pm on a deadline the written rule is what you follow.",
      },
      {
        problem: "Excluding verification time from your estimate of the saving",
        fix: "Count it. The honest number is what makes the workflow trustworthy, and a saving computed without checking is a saving you will pay for later in corrections.",
      },
    ],
    expertNotes: [
      "You cannot detect hallucination by reading carefully, so verification must be procedural. Putting a correct claim and a fabricated one side by side and failing to tell them apart is the exercise that makes this concrete, and it is worth doing before you rely on any output.",
      "Bias is systematic, not random, which is why it survives careful reading. Read output asking what it assumes, and supply explicit local context — the same prompt discipline from session two, applied to a risk that does not look like an error.",
      "Data privacy is the one irreversible decision in this whole course. A bad draft is rewritten and a wrong figure is corrected, but data submitted somewhere cannot be retrieved. Never paste what you would not be comfortable appearing elsewhere, and anonymise whenever you can.",
      "Write the policy as five lines rather than holding it as an intention. At 5pm on a deadline with a client waiting, the person who has written 'I never paste client data' does not paste client data. That is the entire argument for the exercise.",
    ],
    vocabulary: [
      {
        term: "Hallucination",
        meaning:
          "Confident output that is false. Undetectable by reading, because fluency is what the model optimises for — so verification must be procedural.",
      },
      {
        term: "Bias",
        meaning:
          "Systematic tilting of output reflecting assumptions in the training data. Harder to notice than error because it does not look like a mistake.",
      },
      {
        term: "Data policy",
        meaning:
          "A service's stated handling of submissions, including whether they are used for training and how long they are retained. Read before submitting anything sensitive.",
      },
      {
        term: "Anonymisation",
        meaning:
          "Removing names, amounts and identifying detail before submitting a task. Usually costs nothing in the quality of language help received.",
      },
      {
        term: "NDPA 2023",
        meaning:
          "Nigeria's Data Protection Act, imposing obligations on processing personal data — directly relevant to submitting anything containing third-party information.",
      },
      {
        term: "Disclosure",
        meaning:
          "Stating how work was produced. Context-dependent; where no policy exists the test is whether disclosure would change the reader's assessment.",
      },
      {
        term: "Accountability",
        meaning:
          "Remaining the author and the person answerable for the output. The tool has no responsibility and cannot be held to account, so every consequence lands on you.",
      },
      {
        term: "Personal AI policy",
        meaning:
          "A short written statement of what you use these tools for, what never enters them, what you always verify, what stays manual, and when you disclose.",
      },
    ],
    homework: [
      {
        task: "Run the five-reference test and record it",
        detail:
          "Ask for five references on a topic you know well, search for each, and record how many exist as described. Attach the result to your workflow document — it is the evidence behind your verification rule.",
      },
      {
        task: "Test for bias and counteract it",
        detail:
          "Ask for professional or business examples without specifying context, note the defaults, then re-ask with explicit local detail. Write three lines on what changed and what that implies for work you send to clients.",
      },
      {
        task: "Write your five-line personal AI policy",
        detail:
          "What you use these tools for, what never enters them, what you always verify, what you keep manual, and when you disclose. Short enough to remember under pressure, which is the point.",
      },
      {
        task: "Complete and present the workflow deliverable",
        detail:
          "One document: the task, the prompts, the verification steps, the manual parts and the policy — plus the honest re-timed figure including verification. Present it answering what it does, what it saves, what you verify, what never enters the tool, and where you disclose.",
      },
    ],
    rubric: [
      {
        criterion: "Understanding of failure modes",
        passing: "Knows hallucination and bias exist.",
        excellent:
          "Has personally found a fabricated citation, demonstrated that hallucination is undetectable by reading, and explains bias as systematic rather than random.",
      },
      {
        criterion: "Privacy discipline",
        passing: "Is cautious with sensitive data.",
        excellent:
          "A written never-paste list including third-party data, the tool's data policy re-read in that light, a real prompt successfully anonymised, and NDPA 2023 referenced accurately.",
      },
      {
        criterion: "Honesty judgement",
        passing: "Knows some AI use is inappropriate.",
        excellent:
          "Locates the line at verification and accountability rather than tool use, and can explain why disclosure makes work honest but not complete when the assessed thinking was not done.",
      },
      {
        criterion: "Disclosure position",
        passing: "Would disclose if asked.",
        excellent:
          "A decided default with a stated test for contexts where no policy exists, recognising that the downside of disclosing is small and the other downside is not.",
      },
      {
        criterion: "Policy and deliverable",
        passing: "Stated some personal rules.",
        excellent:
          "A five-line policy short enough to follow under pressure, attached to a complete workflow document with prompts, verification steps, manual parts and an honest re-timed figure including verification.",
      },
    ],
    faqs: [
      {
        q: "Can I tell when the output is a hallucination?",
        a: "No, and that is the central point. A fabricated claim reads exactly like a correct one because fluency is what the model optimises for. Verification has to be a step in your process — checking specific claims against sources — rather than something you expect to notice.",
      },
      {
        q: "Is using AI on an assignment dishonest?",
        a: "Check your institution's rules first. As a principle: if the tool produced the argument, analysis and conclusions, the thing being assessed did not happen, and disclosure makes it honest rather than complete. Use it for expression and structure and do the reasoning yourself.",
      },
      {
        q: "What is genuinely safe to paste into a tool?",
        a: "Your own drafts, documents that are already public, and descriptions of situations with names, amounts and identifying detail removed. You can almost always get the language help you need without submitting the specifics, and that trade costs very little.",
      },
      {
        q: "Should I tell my clients I use AI?",
        a: "Follow any policy they have. Where there is none, ask whether disclosure would change their assessment of the work — if it presents analysis or expertise they are relying on, saying how it was produced is honest and costs nothing. When in doubt, disclose.",
      },
      {
        q: "Is a written policy really necessary, or is that overkill?",
        a: "It is necessary because intentions fail under time pressure and written rules do not. At 5pm on a deadline with a client waiting, the person who has written 'I never paste client data' does not paste it. Five lines is enough, and it is the cheapest protection in this course.",
      },
    ],
  },
};
