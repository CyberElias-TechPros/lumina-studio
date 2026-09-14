import type { SessionLecture } from "../types";

/**
 * Data Analytics — ₦25,000 · 4 weeks · 8 sessions.
 * Sessions 7 and 8. (1–3 in data-analytics.ts, 4–6 in data-analytics-b.ts.)
 * Same running dataset: the cleaned household-goods order export.
 */
export const dataAnalyticsLessonsC: Record<string, SessionLecture> = {
  "reading-numbers": {
    summary:
      "Getting the right number is only half the work; the other half is not drawing the wrong conclusion from it. This session covers asking a question rather than fishing, telling trend from seasonality, why correlation is not causation, and the sample-size honesty that separates analysis people act on from analysis they laugh at.",
    objectives: [
      "Start from a question rather than from the data",
      "Separate a real trend from seasonality and noise",
      "Choose a baseline that makes a comparison meaningful",
      "Explain why correlation does not establish causation",
      "Recognise when a sample is too small to support a claim",
      "State the limits of what your data can show",
    ],
    blocks: [
      {
        heading: "Ask a question before you look",
        body: [
          "There are two ways to approach a dataset, and they produce very different results. The first is to **ask a question and then look**: **is out-of-state revenue growing faster than in-state?** The second is to open the file, pivot everything, and see what turns up. The second feels productive and it is how most false findings are made.",
          "The reason is that a dataset of 1,200 rows contains enough combinations that **something will always look significant**. Thirty products across three states across twelve months across several sales reps is thousands of possible comparisons, and in any large set of comparisons some will look dramatic purely by chance. Fishing through them until something appears exciting, then reporting that thing, is how a business ends up acting on noise.",
          "So the discipline is to **write the question down before you look**, and to say what you would expect to see if the answer were yes. **If out-of-state is growing faster, then its monthly totals should rise while in-state stays flat.** Now the analysis has a test it can fail, which is the difference between an investigation and a hunt for something to say.",
        ],
      },
      {
        heading: "Trend, seasonality and noise",
        body: [
          "A rising line is not automatically growth. Our distributor sells household goods, and demand for buckets, basins and containers moves with the **season** — building activity, the rains, the December rush. A December spike is not a new trend; it is December, and it happens every year.",
          "The fix is to **compare like with like**. Compare this December with last December rather than with November, which is called a year-on-year comparison and is the standard way to remove seasonality. Alternatively compare a **three-month moving average**, which smooths the monthly noise so an underlying direction becomes visible. Comparing a peak month with the month before it and calling the difference growth is one of the commonest errors in business reporting.",
          "Then separate **signal from noise** by asking whether the change is bigger than the usual wobble. If monthly revenue normally varies by plus or minus 8 per cent and this month is up 5 per cent, that is not a change — it is a normal month. Establishing the normal range first is what lets you say something is genuinely different, and it takes one pivot table.",
        ],
      },
      {
        heading: "Correlation is not causation",
        body: [
          "Two things moving together does not mean one causes the other, and in business data the reason is usually a **third variable driving both**. Our data offers a clean example: larger orders appear to have lower margin percentages. The tempting conclusion is that big orders are less profitable, so we should discourage them.",
          "But look at what else differs. Large orders are mostly **wholesale customers**, who receive volume discounts and buy in a different mix. The low margin is caused by the discount policy and the customer type, not by the order being large. **Customer type is the confounder**, and once you split the data by customer type the relationship largely disappears. Acting on the raw correlation would mean discouraging your best customers.",
          "The other thing correlation cannot tell you is **direction**. If sales rep activity correlates with revenue, did activity drive revenue, or were the busiest territories assigned the most active reps? And sometimes both are caused by something unmeasured — a growing market lifts both. The discipline is to **name the alternative explanations before you present the finding**, because a manager will think of them, and it is far better that you raised them first.",
        ],
      },
      {
        heading: "Sample size and the honesty it requires",
        body: [
          "Small samples produce wild numbers, and the numbers do not announce that they came from a small sample. If Oyo recorded three orders in a month and five the next, that is a 67 per cent increase — and it means nothing at all. **A percentage built on a handful of cases is noise wearing a costume.**",
          "So **always report the count alongside the percentage**. **Conversion improved 50 per cent** is meaningless; **conversion improved from 2 of 40 to 3 of 40** is honest and obviously not worth a decision. Any figure resting on fewer than about thirty cases should be labelled as such, and any decision resting on it should wait for more data.",
          "Related is **regression to the mean**: an unusually good or bad month is usually followed by a more ordinary one, simply because extremes are partly luck. Celebrating your best-ever month as a new baseline, or panicking about your worst, both mistake luck for change. And **selection effects** cut the other way — if you analyse only customers who still buy from you, you will conclude your customers are satisfied, because the dissatisfied ones stopped ordering and left your dataset. What is absent from the data is often the most important thing about it.",
        ],
      },
      {
        heading: "What your data cannot tell you",
        body: [
          "Every analysis has limits, and stating them is a sign of competence rather than weakness. Our export records **orders placed**, not customers who looked and did not buy, so it cannot tell us why anyone declined. It has no competitor prices, so it cannot say whether our margins are good. It covers three states, so nothing in it supports a claim about the country. And it stops at the export date, so it knows nothing about this month.",
          "Writing these down protects you and the decision. A manager who knows the analysis rests on twelve months of one distributor's orders in three states can weigh it appropriately; a manager who is not told will over-weight it, and when the recommendation fails the analysis gets blamed for something it never claimed.",
          "The habit to build is a short **limitations** section on every piece of analysis: what the data covers, what it excludes, how many cases the conclusions rest on, and what would need to be true for the conclusion to be wrong. Four sentences. It makes your work more credible, not less, because the reader can see you understood what you were holding.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor takes four plausible findings from the distributor's data and dismantles each one — a December spike mistaken for growth, a correlation that turns out to be a confounder, a dramatic percentage built on three orders, and a satisfaction conclusion drawn only from customers who kept buying — showing what the honest version of each finding looks like.",
      steps: [
        {
          step: "Write the question before opening the data",
          detail:
            "Is out-of-state revenue growing faster than in-state? Explain that writing it down gives the analysis a test it can fail.",
        },
        {
          step: "State what you would expect if the answer were yes",
          detail:
            "Out-of-state monthly totals rising while in-state stays flat. Explain that this is the difference between investigating and hunting for something to say.",
        },
        {
          step: "Show a December spike and call it growth",
          detail:
            "Present the month-on-month jump. Explain that a household-goods distributor has seasonal demand and December spikes every year.",
        },
        {
          step: "Compare December with December instead",
          detail:
            "Show the year-on-year figure. Explain that comparing like with like is how seasonality is removed.",
        },
        {
          step: "Build a three-month moving average",
          detail:
            "Show the underlying direction become visible. Explain that smoothing separates trend from monthly wobble.",
        },
        {
          step: "Establish the normal monthly range",
          detail:
            "Show the usual plus or minus 8 per cent. Explain that a 5 per cent move inside that range is a normal month, not a change.",
        },
        {
          step: "Present the margin correlation",
          detail:
            "Show larger orders with lower margin percentages. Explain the tempting conclusion: big orders are less profitable, so discourage them.",
        },
        {
          step: "Split by customer type",
          detail:
            "Show the relationship largely disappear. Explain that wholesale customers get volume discounts, so customer type was the confounder all along.",
        },
        {
          step: "Say what acting on the raw correlation would have cost",
          detail:
            "Explain that discouraging large orders means discouraging your best customers, on the strength of a variable you had not separated out.",
        },
        {
          step: "Show the direction problem",
          detail:
            "Sales rep activity against revenue. Explain that correlation cannot tell you which caused which, or whether both were driven by a growing market.",
        },
        {
          step: "Present a 67 per cent increase",
          detail:
            "Oyo from three orders to five. Explain that the number does not announce it came from three cases.",
        },
        {
          step: "Rewrite it with the count attached",
          detail:
            "From 3 to 5 orders. Explain that the honest version is obviously not worth a decision, and the count is what makes that visible.",
        },
        {
          step: "Show regression to the mean",
          detail:
            "Take the best month and show the ordinary one after it. Explain that extremes are partly luck and are usually followed by something normal.",
        },
        {
          step: "Analyse only active customers",
          detail:
            "Show a satisfaction conclusion. Explain the selection effect: dissatisfied customers stopped ordering and left the dataset.",
        },
        {
          step: "List what the data cannot tell us",
          detail:
            "No lost customers, no competitor prices, three states, one distributor. Explain that stating limits makes the work more credible, not less.",
        },
        {
          step: "Write the four-sentence limitations note",
          detail:
            "Coverage, exclusions, case counts, and what would have to be true for the conclusion to be wrong. Explain that this is what stops a manager over-weighting the finding.",
        },
      ],
    },
    practice: {
      title: "Test four findings until only the true ones survive",
      brief:
        "You take four plausible findings from the distributor's data and subject each to the tests in this session — seasonality, confounders, sample size and selection — then rewrite the survivors with counts, baselines and limitations attached.",
      steps: [
        "Write your question down before opening the data.",
        "State what you would expect to see if the answer were yes.",
        "Identify your strongest apparent trend in the monthly figures.",
        "Test it year-on-year rather than month-on-month.",
        "Build a three-month moving average and see whether the trend survives.",
        "Establish the normal monthly range and state whether your change exceeds it.",
        "Identify one correlation in the data that looks actionable.",
        "Name at least two alternative explanations for it.",
        "Split the data by the most likely confounding variable.",
        "State whether the relationship survives the split.",
        "Find one dramatic percentage and report the counts behind it.",
        "Decide whether the case count is large enough to support a decision.",
        "Identify one group missing from the data and say what its absence hides.",
        "Check whether your best month is followed by an ordinary one, and explain why.",
        "Rewrite each surviving finding with its baseline, count and direction stated.",
        "Write a four-sentence limitations note: coverage, exclusions, case counts, and what would falsify the conclusion.",
        "State plainly which of your four original findings did not survive, and why.",
      ],
      standard:
        "Four findings each tested rather than reported: a question written before the data was opened with the expected pattern stated, the strongest trend tested year-on-year and against a three-month moving average with the normal monthly range established and the change judged against it, one correlation examined with at least two alternative explanations named and the data split by the most likely confounder with a stated verdict on whether it survived, one dramatic percentage reported with its underlying counts and a judgement on whether the case count supports a decision, one group missing from the data identified with what its absence hides, and the best month checked against the one after it with regression to the mean explained; each surviving finding rewritten with baseline, count and direction, a four-sentence limitations note covering coverage, exclusions, case counts and falsification, and a plain statement of which original findings did not survive and why.",
    },
    pitfalls: [
      {
        problem: "You explore until something looks significant",
        fix: "Write the question and the expected pattern first. With thousands of possible comparisons in this data, something will always look dramatic by chance, and reporting it is reporting noise.",
      },
      {
        problem: "You call a December spike growth",
        fix: "Compare with December last year, or use a three-month moving average. Seasonal demand rises every year and month-on-month comparison turns that into a false trend.",
      },
      {
        problem: "You treat a small monthly change as a shift",
        fix: "Establish the normal range first. If monthly revenue usually moves plus or minus 8 per cent, a 5 per cent change is a normal month and not a finding.",
      },
      {
        problem: "You act on a correlation",
        fix: "Name the alternatives and split by the likely confounder. Larger orders looked less profitable until customer type was separated out, and acting on the raw finding would have meant discouraging your best customers.",
      },
      {
        problem: "You report a percentage without its count",
        fix: "Always attach the count. A 67 per cent increase from three orders to five is noise, and the count is what makes that obvious to the reader.",
      },
      {
        problem: "You base a decision on a handful of cases",
        fix: "Label small samples and wait for more data. Anything under roughly thirty cases should be flagged, and a decision resting on it should be deferred.",
      },
      {
        problem: "You read the best month as the new baseline",
        fix: "Expect regression to the mean. Extremes are partly luck and are usually followed by something ordinary, so neither the best nor the worst month is a trend.",
      },
      {
        problem: "You analyse only the customers still buying",
        fix: "Name what is missing. The dissatisfied customers stopped ordering and left the dataset, so analysing who remains will always look like satisfaction.",
      },
    ],
    expertNotes: [
      "Write the question and the expected pattern before you open the file. A dataset this size contains thousands of possible comparisons, so something will always look dramatic by chance — and the only defence is having decided in advance what you were testing.",
      "Compare like with like. December against December, or a three-month moving average, because seasonal demand rises every year and a month-on-month comparison turns that into a trend that does not exist.",
      "Name the confounder before your audience does. Larger orders looked less profitable until customer type was separated out; presenting the split yourself makes the finding stronger, while being caught without it makes every other finding suspect.",
      "Report the count with every percentage and state your limitations in four sentences. Coverage, exclusions, case counts, and what would falsify the conclusion — it makes the work more credible, not less, because the reader can see you knew what you were holding.",
    ],
    vocabulary: [
      { term: "Fishing", meaning: "Exploring until something looks significant. With many possible comparisons, chance always produces something dramatic." },
      { term: "Seasonality", meaning: "A repeating annual pattern. Removed by year-on-year comparison or a moving average." },
      { term: "Moving average", meaning: "The mean of the last few periods, recalculated each period. Smooths noise so an underlying trend shows." },
      { term: "Correlation", meaning: "Two things moving together. Says nothing about cause, and nothing about which direction it runs." },
      { term: "Confounder", meaning: "A third variable driving both things in a correlation. Splitting by it is the test." },
      { term: "Regression to the mean", meaning: "An extreme value being followed by a more ordinary one because extremes are partly luck." },
      { term: "Selection effect", meaning: "When the data only contains a non-random group — such as customers who kept buying — making conclusions about everyone else invalid." },
      { term: "Limitations note", meaning: "Coverage, exclusions, case counts and what would falsify the conclusion. Four sentences that make analysis credible." },
    ],
    homework: [
      {
        task: "Test one trend year-on-year",
        detail:
          "Take a month that looks like growth, compare it with the same month last year, and build a three-month moving average. State whether the trend survives.",
      },
      {
        task: "Break one of your own correlations",
        detail:
          "Find a relationship in the data, name two alternative explanations, split by the likely confounder, and report honestly whether it held.",
      },
      {
        task: "Attach counts to five percentages",
        detail:
          "Find five percentages in any report and write the underlying counts beside them. Note how many stop looking important.",
      },
      {
        task: "Write a limitations note for the dashboard",
        detail:
          "Four sentences: what the data covers, what it excludes, how many cases the conclusions rest on, and what would have to be true for them to be wrong.",
      },
    ],
    rubric: [
      {
        criterion: "Questioning",
        passing: "Analyses the data.",
        excellent: "Question written before the data was opened with the expected pattern stated, giving the analysis something it could fail.",
      },
      {
        criterion: "Trend handling",
        passing: "Identifies a trend.",
        excellent: "Tested year-on-year and against a moving average, the normal monthly range established, and the change judged against it rather than against the previous month.",
      },
      {
        criterion: "Causal reasoning",
        passing: "Notes a relationship.",
        excellent: "At least two alternative explanations named, the data split by the likely confounder, and a stated verdict on whether the relationship survived.",
      },
      {
        criterion: "Statistical honesty",
        passing: "Reports figures accurately.",
        excellent: "Counts attached to every percentage, small samples labelled, regression to the mean recognised, and no decision recommended on a handful of cases.",
      },
      {
        criterion: "Stating limits",
        passing: "Mentions caveats.",
        excellent: "A four-sentence limitations note covering coverage, exclusions, case counts and falsification, plus a plain statement of which findings did not survive.",
      },
    ],
    faqs: [
      {
        q: "How do I tell a real trend from a seasonal spike?",
        a: "Compare with the same period last year rather than the previous month, and build a three-month moving average to smooth the wobble. A household-goods distributor spikes every December, so a month-on-month comparison turns a repeating pattern into a trend that does not exist.",
      },
      {
        q: "My data shows two things moving together. Can I say one causes the other?",
        a: "No. Name at least two alternative explanations, then split the data by the most likely confounding variable and see whether the relationship survives. In our data, larger orders looked less profitable until customer type was separated out — the discount policy was the real cause.",
      },
      {
        q: "How small is too small for a percentage?",
        a: "Under about thirty cases, treat it as noise and say so. Three orders becoming five is a 67 per cent increase that means nothing. Always report the count beside the percentage — it is what lets the reader see whether a decision is warranted.",
      },
      {
        q: "Why does stating limitations make my analysis better?",
        a: "Because it lets the reader weigh the finding correctly. A manager who knows the analysis rests on twelve months of one distributor's orders in three states can judge it; one who is not told will over-weight it, and blame the analysis when the recommendation fails.",
      },
      {
        q: "What is the most commonly missed problem in business data?",
        a: "Selection. If you analyse only the customers who still buy from you, you will conclude your customers are satisfied, because the dissatisfied ones stopped ordering and left your dataset. What is absent from the data is often the most important thing about it.",
      },
    ],
  },

  "storytelling-final-project": {
    summary:
      "Analysis that nobody acts on has no value, however correct it is. This session covers leading with the answer, writing recommendations a manager can act on, presenting to someone with no time, and the final project: a dashboard over a real messy dataset plus a one-page analysis note.",
    objectives: [
      "Lead with the conclusion rather than building up to it",
      "Write recommendations that name an action, an owner and a date",
      "Present to a manager who has five minutes",
      "Handle the questions that follow a finding",
      "Connect the dashboard and the analysis note into one deliverable",
      "Explain your work to someone who did not build it",
    ],
    blocks: [
      {
        heading: "Lead with the answer",
        body: [
          "Most analysis is presented in the order it was done: here is the data, here is what I cleaned, here are the pivots, and finally, at the end, the finding. This is exactly backwards for the reader, who has to sit through your process before learning whether any of it matters. **State the conclusion first**, then give the evidence.",
          "The structure that works is short. **The answer in one sentence.** **Out-of-state revenue grew 14 per cent year-on-year while in-state was flat, and the growth is concentrated in two products.** **Then the evidence** — the two or three figures that support it, each with its count and baseline. **Then the recommendation.** **Then, if anyone wants it, the method.** Nobody who only reads the first line is misled, and nobody who wants the detail is denied it.",
          "The reason this feels uncomfortable is that leading with the answer exposes it to challenge immediately, while burying it delays the challenge. That is the point. **A finding that cannot survive being stated in the first sentence is not ready to be presented**, and it is far better to discover that while drafting than in the meeting.",
        ],
      },
      {
        heading: "Recommendations people can act on",
        body: [
          "A finding is not a recommendation. **Ogun buys mostly one category** is a finding; it leaves everyone unsure what to do next. A recommendation names an **action**, an **owner** and a **timeframe**: **add the two next-best-selling categories to the Ogun price list by the end of the month, owned by the sales lead.**",
          "Then it must be **proportionate to the evidence**. If the finding rests on three months of data from one state, the recommendation should be a trial, not a policy change. Overselling a weak finding is how analysts lose credibility permanently — and credibility, once lost in front of a manager, is very hard to recover, because every future finding arrives pre-discounted.",
          "Finally, **say what it would cost and what would count as success**. **Trial the two categories in Ogun for one quarter; success is 10 per cent growth in Ogun revenue without margin falling.** A recommendation with a success test can be evaluated; one without it becomes a permanent maybe that nobody revisits.",
        ],
      },
      {
        heading: "Presenting to a manager",
        body: [
          "Assume you have **five minutes and one question**. Open with the answer, show one chart that supports it, and make the recommendation. Everything else is preparation for the questions, not content for the presentation. A manager who wants more will ask; one who does not will thank you for being brief, and will remember that you were brief next time they need analysis.",
          "The questions that always come, in roughly this order: **so what?** — which your recommendation should already have answered; **how sure are you?** — which your counts, baselines and limitations note answer; **what would it cost?**; and **what are we not seeing?** That last one is the interesting one, and having an honest answer is what distinguishes an analyst from someone who makes charts. **We cannot see customers who stopped ordering, and that is the biggest gap in this analysis.**",
          "Then the discipline of **not overselling under pressure**. If challenged and you are wrong, say so plainly and revise — **that is a fair point, the sample is too small for that claim, and I will come back with a full quarter**. Defending a weak finding costs you the room; conceding it precisely costs you nothing and makes the rest of what you said more believable.",
        ],
      },
      {
        heading: "The dashboard and the note are one deliverable",
        body: [
          "The final project is not two pieces of work but one: **a dashboard that shows the state of the business, and a one-page note that says what to do about it.** The dashboard answers **what is happening** and is consulted weekly; the note answers **so what** and is read once, by the person who decides.",
          "They must agree, which is a real requirement rather than an obvious one. Every number in the note must be traceable to the dashboard, and the note's headline must be the thing the dashboard makes visible. If the note claims growth the dashboard does not show, one of them is wrong and the reader will find it.",
          "The note itself is **one page**: the answer, three supporting figures with counts, the recommendation with owner and timeframe, the success test, and four sentences of limitations. That constraint is the discipline — it forces you to decide what actually matters, and a reader will read one page but will not read six.",
        ],
      },
      {
        heading: "Explaining work you did not do today",
        body: [
          "The last test of any analysis is whether **someone else can pick it up in six months** and understand what was done and why. Your dashboard will outlive your memory of building it, and the person who inherits it will not have your assumptions.",
          "So document as you go: **which file is the source, what cleaning was applied and why, what each calculated field means, and what the known limitations are.** The cleaning log from week one is exactly this, and it is why it was worth keeping. A dashboard with no documentation becomes a thing nobody dares change, and then a thing nobody trusts, and then a thing that gets rebuilt from scratch.",
          "The final habit: **say the numbers out loud before you send them**. Reading **revenue grew 14 per cent year-on-year** aloud, then checking it against the dashboard, catches the errors that silent reading misses. Almost every analyst has sent a figure they would have caught in ten seconds by saying it out loud, and the cost of being caught is far higher than the ten seconds.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor presents the completed distributor analysis as the model: a dashboard opened live, a one-page note read aloud, the answer stated in the first sentence, three figures with counts, one recommendation with an owner and a success test, four sentences of limitations — then the class challenges it and the instructor concedes one point precisely.",
      steps: [
        {
          step: "Open the dashboard before saying anything",
          detail:
            "Let the class look for ten seconds. Explain that a dashboard should be readable without narration, and this is the test.",
        },
        {
          step: "State the answer in one sentence",
          detail:
            "Out-of-state grew 14 per cent year-on-year while in-state was flat. Explain that the conclusion comes first and the evidence follows.",
        },
        {
          step: "Show the one chart that supports it",
          detail:
            "Not five charts, one. Explain that everything else is preparation for questions rather than content for the presentation.",
        },
        {
          step: "Give each supporting figure with its count",
          detail:
            "Show the case counts beside every percentage. Explain that a percentage without a count cannot be weighed.",
        },
        {
          step: "Make the recommendation with an owner and a date",
          detail:
            "Add two categories to the Ogun price list this month, owned by the sales lead. Explain that a finding without an action leaves everyone unsure what to do.",
        },
        {
          step: "State the success test",
          detail:
            "Ten per cent Ogun growth in a quarter without margin falling. Explain that a recommendation without a test becomes a permanent maybe nobody revisits.",
        },
        {
          step: "Keep the recommendation proportionate to the evidence",
          detail:
            "Call it a trial rather than a policy change. Explain that overselling a weak finding costs credibility permanently.",
        },
        {
          step: "Read the four-sentence limitations note",
          detail:
            "Coverage, exclusions, case counts, falsification. Explain that naming the gaps yourself is what makes the rest believable.",
        },
        {
          step: "Answer the so-what question",
          detail:
            "Point at the recommendation. Explain that if this question is a surprise, the presentation was structured in the wrong order.",
        },
        {
          step: "Answer how sure are you",
          detail:
            "Give the counts and the period. Explain that confidence should be stated as a range of evidence rather than as assurance.",
        },
        {
          step: "Answer what are we not seeing",
          detail:
            "Customers who stopped ordering. Explain that an honest answer here is what distinguishes an analyst from someone who makes charts.",
        },
        {
          step: "Take a challenge and concede one point precisely",
          detail:
            "Agree the sample is too small for one claim and commit to a full quarter. Explain that conceding precisely costs nothing while defending a weak finding costs the room.",
        },
        {
          step: "Trace every figure in the note to the dashboard",
          detail:
            "Show each one live. Explain that if the note claims something the dashboard does not show, one of them is wrong and the reader will find it.",
        },
        {
          step: "Hand over the documentation",
          detail:
            "Show the cleaning log, the source file and the field definitions. Explain that an undocumented dashboard becomes a thing nobody dares change and then nobody trusts.",
        },
        {
          step: "Say the headline number out loud and re-check it",
          detail:
            "Read it, then look at the dashboard. Explain that reading a figure aloud catches what silent reading misses, in about ten seconds.",
        },
      ],
    },
    practice: {
      title: "Final project: a dashboard and a one-page analysis note",
      brief:
        "You deliver the complete project — a one-screen dashboard over the real messy dataset, and a one-page analysis note that states the answer first, supports it with three figures and their counts, makes one recommendation with an owner, a timeframe and a success test, and states its limitations — then present it in five minutes and defend it.",
      steps: [
        "Confirm the export is cleaned, with the cleaning log complete.",
        "Confirm every pivot, chart and figure reads from the same cleaned table.",
        "Confirm the dashboard fits one screen with no scrolling.",
        "Confirm slicers are connected to every pivot and reset instructions are on the sheet.",
        "Write the answer to your question in one sentence.",
        "Check that sentence survives being read before any evidence.",
        "Select the three figures that support it, each with its count and baseline.",
        "Remove every other figure from the note.",
        "Write one recommendation naming an action, an owner and a timeframe.",
        "Add a success test that would show whether it worked.",
        "Check the recommendation is proportionate to the strength of the evidence.",
        "Write the four-sentence limitations note.",
        "Trace every number in the note back to the dashboard.",
        "Cut the note to one page.",
        "Say every figure out loud and re-check it against the dashboard.",
        "Hand the dashboard to someone who has never seen it and confirm they can answer a question.",
        "Present in five minutes: answer, one chart, three figures, recommendation, limitations.",
        "Take challenges, and concede any weak point precisely rather than defending it.",
        "Revise the note based on the strongest challenge you received.",
      ],
      standard:
        "A one-screen dashboard over the cleaned real dataset with the cleaning log complete, every figure reading from the same table, slicers connected to every pivot and reset instructions on the sheet, verified by someone who has never seen it answering a question unaided; and a one-page analysis note opening with the answer in a single sentence that survives being read before any evidence, supported by exactly three figures each with its count and baseline and with every other figure removed, one recommendation naming an action, an owner and a timeframe with a success test and proportionate to the strength of the evidence, a four-sentence limitations note, every number traceable to the dashboard, and every figure said aloud and re-checked; presented in five minutes as answer, one chart, three figures, recommendation and limitations, with challenges taken and any weak point conceded precisely, and the note revised in response to the strongest challenge received.",
    },
    pitfalls: [
      {
        problem: "You present in the order you worked",
        fix: "Lead with the answer. A reader should not have to sit through your cleaning and your pivots to learn whether any of it matters.",
      },
      {
        problem: "You bury the finding to delay challenge",
        fix: "State it in the first sentence. A finding that cannot survive that is not ready to present, and it is better to discover it while drafting than in the meeting.",
      },
      {
        problem: "You report a finding with no recommendation",
        fix: "Name an action, an owner and a timeframe. A finding leaves everyone unsure what to do next; a recommendation tells them.",
      },
      {
        problem: "Your recommendation is bigger than your evidence",
        fix: "Call it a trial. Overselling a weak finding costs credibility permanently, and every future finding then arrives pre-discounted.",
      },
      {
        problem: "You recommend without a success test",
        fix: "State what would show it worked. A recommendation with no test becomes a permanent maybe that nobody ever revisits.",
      },
      {
        problem: "You present ten charts in five minutes",
        fix: "Show one and prepare the rest for questions. A manager who wants more will ask, and one who does not will remember that you were brief.",
      },
      {
        problem: "You defend a weak point under challenge",
        fix: "Concede it precisely and commit to better evidence. Defending costs you the room; conceding costs nothing and makes the rest of your work more believable.",
      },
      {
        problem: "You deliver the dashboard with no documentation",
        fix: "Include the source file, the cleaning log and the field definitions. An undocumented dashboard becomes a thing nobody dares change and then nobody trusts.",
      },
    ],
    expertNotes: [
      "State the answer first and make it survive the first sentence. Presenting in the order you worked forces the reader through your process before they know whether it matters, and burying the finding only delays the challenge you should want.",
      "Every recommendation needs an action, an owner, a timeframe and a success test. Without the test it becomes a permanent maybe that nobody revisits, and without the owner it belongs to nobody.",
      "Keep the recommendation proportionate to the evidence. Three months of one state supports a trial, not a policy change — and overselling once costs you credibility on everything you present afterwards.",
      "Say every figure out loud before you send it, and hand the dashboard to someone who has never seen it. Ten seconds of reading aloud catches the error silent reading misses, and an outsider finds the assumptions you can no longer see.",
    ],
    vocabulary: [
      { term: "Answer-first structure", meaning: "Conclusion, evidence, recommendation, then method. The reader is never misled by reading only the first line." },
      { term: "Recommendation", meaning: "An action with an owner and a timeframe. A finding without one leaves everyone unsure what to do." },
      { term: "Success test", meaning: "What would show the recommendation worked. Without it, a recommendation is never revisited." },
      { term: "Proportionality", meaning: "Matching the strength of the recommendation to the strength of the evidence. A weak finding supports a trial, not a policy." },
      { term: "Analysis note", meaning: "One page: answer, three figures with counts, recommendation, success test, limitations. The constraint forces you to decide what matters." },
      { term: "Traceability", meaning: "Every figure in the note being visible on the dashboard. If they disagree, one is wrong and the reader will find it." },
      { term: "Conceding precisely", meaning: "Agreeing a specific weak point and committing to better evidence. Costs nothing; defending costs the room." },
      { term: "Documentation", meaning: "Source file, cleaning log and field definitions. What stops a dashboard becoming something nobody dares change." },
    ],
    homework: [
      {
        task: "Rewrite one finding answer-first",
        detail:
          "Take something you have written that builds up to a conclusion and put the conclusion in the first sentence. Note how much of the rest becomes optional.",
      },
      {
        task: "Turn one finding into a real recommendation",
        detail:
          "Action, owner, timeframe, success test — and state whether the evidence supports a trial or a change. If it supports neither, the finding is not ready.",
      },
      {
        task: "Present your project in five minutes",
        detail:
          "Answer, one chart, three figures, recommendation, limitations. Time it, then answer the four questions: so what, how sure, what cost, what are we not seeing.",
      },
      {
        task: "Write the handover documentation",
        detail:
          "Source file, cleaning applied and why, what each calculated field means, and the known limitations. Enough for someone to pick it up in six months.",
      },
    ],
    rubric: [
      {
        criterion: "Structure",
        passing: "Presents findings clearly.",
        excellent: "The answer stated in the first sentence and confirmed to survive being read before any evidence, followed by evidence, recommendation and method in that order.",
      },
      {
        criterion: "Recommendations",
        passing: "Suggests next steps.",
        excellent: "One recommendation naming an action, owner and timeframe, with a success test, proportionate to the evidence and expressed as a trial where the evidence is thin.",
      },
      {
        criterion: "Presentation",
        passing: "Presents within the time.",
        excellent: "Five minutes with one chart and three figures, prepared answers for so what, how sure, what cost and what are we not seeing, and any weak point conceded precisely.",
      },
      {
        criterion: "The deliverable",
        passing: "Delivers a dashboard and a note.",
        excellent: "A one-screen dashboard over the cleaned dataset with connected slicers and reset instructions, plus a one-page note whose every figure traces to the dashboard, verified by an outsider answering a question unaided.",
      },
      {
        criterion: "Handover",
        passing: "Work is complete.",
        excellent: "Source file, cleaning log and field definitions documented, every figure said aloud and re-checked before sending, and the note revised in response to the strongest challenge received.",
      },
    ],
    faqs: [
      {
        q: "How long should the analysis note be?",
        a: "One page: the answer, three supporting figures with counts, one recommendation with an owner, a timeframe and a success test, and four sentences of limitations. The constraint is the discipline — it forces you to decide what actually matters, and a manager will read one page but not six.",
      },
      {
        q: "Should I show all my work in the presentation?",
        a: "No. Assume five minutes and one question: answer, one chart, three figures, recommendation, limitations. Everything else is preparation for the questions rather than content for the presentation, and a manager who wants more will ask.",
      },
      {
        q: "What do I say when a manager asks so what?",
        a: "Your recommendation, which should already have answered it. If that question is a surprise, the presentation was structured in the wrong order — you built up to the finding instead of leading with it.",
      },
      {
        q: "I was challenged and I think my finding is weak. What now?",
        a: "Concede it precisely and commit to better evidence: that is a fair point, the sample is too small for that claim, and I will come back with a full quarter. Defending a weak finding costs you the room; conceding costs nothing and makes everything else you said more believable.",
      },
      {
        q: "Do the dashboard and the note have to match exactly?",
        a: "Every number in the note must be traceable to the dashboard, and the note's headline must be what the dashboard makes visible. If the note claims growth the dashboard does not show, one of them is wrong — and the reader will find it before you do.",
      },
    ],
  },
};
