import type { SessionLecture } from "../types";

/**
 * Data Analytics — ₦25,000 · 4 weeks · 8 sessions.
 * Sessions 4 to 6. (1–3 in data-analytics.ts, 7–8 in data-analytics-c.ts.)
 * Same running dataset: the cleaned household-goods order export.
 */
export const dataAnalyticsLessonsB: Record<string, SessionLecture> = {
  "pivot-tables-summaries": {
    summary:
      "A pivot table answers a grouping question in seconds and rebuilds itself when the question changes. This session covers building them properly, grouping dates and values, calculated fields, the value options that turn a total into an insight, and the summary statistics that stop a single large order from misleading you.",
    objectives: [
      "Build a pivot table on data that is actually ready for one",
      "Use the Rows, Columns, Values and Filters areas deliberately",
      "Group dates by month and numbers into bands",
      "Add calculated fields and know where they mislead",
      "Use % of total and running totals to answer better questions",
      "Report median alongside mean when the data is skewed",
    ],
    blocks: [
      {
        heading: "What a pivot table actually is",
        body: [
          "A pivot table is a **grouped total that you can rebuild without touching the data**. Ask it for revenue by state and it groups 1,200 rows into three; drag Product into Rows instead and it groups them into thirty. The source sheet is never modified, which is why a pivot table is safe in a way that a hundred manual SUMIF formulas are not.",
          "That rebuilding is the whole value. Analysis is a conversation — a manager hears **Lagos is 61 per cent of revenue** and immediately asks **and which products?** A pivot table answers in two seconds by dragging one field. If your analysis is a fixed grid of formulas, every follow-up question is new work, which is why people stop asking.",
          "The requirement is that **the data must be ready**, and this is where the last three sessions pay off. A pivot table needs tidy data: one header row, no blank rows or columns inside the data, no merged cells, no total rows, and real dates rather than text. Pivot on our raw export and **LAGOS**, **Lagos** and **Lagos State** appear as three states, and you will report three figures for one state with complete confidence.",
        ],
      },
      {
        heading: "The four areas, used deliberately",
        body: [
          "Every pivot table has four areas and each has a specific job. **Rows** holds what you are grouping by — State, Product, SalesRep. **Values** holds what you are measuring — the sum of LineTotal, the count of orders. **Columns** splits each row into sub-columns — State in Rows with Month in Columns gives you a grid of state by month. **Filters** restricts the whole table — one sales rep, one quarter.",
          "The mistake to avoid is dragging fields around until something looks right. Decide the **question** first, then place the fields: the thing you are grouping by goes in Rows, the thing you are measuring goes in Values. **Which products sell most in Ogun?** puts Product in Rows, LineTotal in Values, and Ogun in Filters.",
          "Then a detail that catches everyone: **drag a text field into Values and you get a Count, not a Sum**. Excel chooses for you based on type. If you drag Product into Values expecting quantities, you will get the number of order lines containing that product — which is a different and usually useless number. Always check **Value Field Settings** to confirm you are summing what you think you are.",
        ],
      },
      {
        heading: "Refreshing, grouping and calculated fields",
        body: [
          "The first thing to know is that **pivot tables do not update automatically**. They read from a cached copy of the data, so when you add rows or change a value you must **right-click and Refresh** — or use Data, Refresh All. A report that quietly shows last month's numbers because nobody refreshed is a very common failure, and it is invisible unless you check the row count.",
          "**Grouping** is what turns raw fields into useful ones. Select any date in the pivot and choose **Group**, and you can group by month, quarter or year — which is why the dates had to be real dates, since text dates cannot be grouped at all. You can also group **numbers into bands**: select the UnitPrice values and group into ranges of 5,000, and a list of thirty products becomes five price bands you can actually reason about.",
          "**Calculated fields** add a new measure built from existing ones — Profit as LineTotal minus cost, or margin as a ratio. They are useful, with one trap worth memorising: **a calculated field operates on the summed values, not row by row**. So a **margin percentage** calculated field computes total profit divided by total revenue, which is a weighted average and usually what you want — but it will not give you the average of the individual row margins, and if you expected that, your number is wrong. Compute percentages in a column on the source data when you need the row-level version.",
        ],
      },
      {
        heading: "Value options that turn totals into insight",
        body: [
          "Value Field Settings offers far more than Sum, and the extras answer better questions. **% of Grand Total** turns **Lagos is 4.2 million** into **Lagos is 61 per cent of revenue**, which is what a manager can act on. **% of Column Total** shows the product mix within each state, revealing that Ogun buys mostly buckets while Lagos buys across the range.",
          "**Running Total In** turns monthly figures into a cumulative line, which is how you see whether the year is tracking ahead or behind. **Difference From** compares each month with the previous one, which is what **are we growing?** actually means. **Rank** shows which products are first, second and third without sorting anything.",
          "The habit to build is asking **which denominator makes this number meaningful**. A raw total answers **how much**; a percentage answers **how important**; a change answers **which way**. Most analysis that fails to persuade anyone is analysis that reported a total when the reader needed a comparison.",
        ],
      },
      {
        heading: "Summary statistics, and when the mean lies",
        body: [
          "Three numbers describe a set of values and they answer different questions. The **mean** is the total divided by the count and is what most people mean by average. The **median** is the middle value when sorted. The **mode** is the most common. For symmetrical data they are close; for business data they usually are not.",
          "Our order values are **skewed**, because a few large wholesale orders dwarf the many small retail ones. If the mean order value is 38,000 naira but the median is 9,500, then reporting the mean tells a manager that a typical order is 38,000 — and almost every order is far below that. **The mean is being pulled up by a handful of large orders.** The median describes the typical order; the mean describes the total. Both are true and they answer different questions.",
          "So report the median whenever you say **typical**, and be suspicious of any mean on money data until you have looked at the distribution. A quick way to see the problem is the **spread**: compare minimum, maximum, median and mean. If the maximum is fifty times the median, the mean is not describing a typical anything, and a single chart of the distribution will show a manager more than any average could.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor builds a series of pivot tables on the cleaned export to answer the questions a manager would actually ask about this business, showing the refresh trap, date grouping, the text-in-Values problem, calculated fields, % of total, and why the mean order value is actively misleading here.",
      steps: [
        {
          step: "Select the cleaned table and insert a pivot table",
          detail:
            "Use the table reference rather than a fixed range. Explain that a fixed range silently excludes rows added later.",
        },
        {
          step: "Put State in Rows and LineTotal in Values",
          detail:
            "Show three states. Explain that this works only because State was standardised; on the raw export it would show nine.",
        },
        {
          step: "Check Value Field Settings",
          detail:
            "Confirm it says Sum. Explain that Excel chooses based on type and that assuming is how wrong totals get published.",
        },
        {
          step: "Drag Product into Values by mistake",
          detail:
            "Show it returns Count. Explain that a text field in Values counts occurrences, which is a different and usually useless number.",
        },
        {
          step: "Add OrderDate to Columns",
          detail:
            "Show daily columns, which is unreadable. Explain that this is why grouping exists.",
        },
        {
          step: "Group the dates by month",
          detail:
            "Right-click, Group, Months. Explain that this is only possible because the dates are real dates, not text.",
        },
        {
          step: "Add quarter grouping as a second level",
          detail:
            "Show months nested in quarters. Explain that grouping is reversible and never changes the source data.",
        },
        {
          step: "Add a row to the source data and look at the pivot",
          detail:
            "Show it unchanged. Explain the refresh trap: pivot tables cache their data and a report can quietly show last month's numbers.",
        },
        {
          step: "Refresh and confirm the row count",
          detail:
            "Right-click, Refresh, and check the count matches the source. Explain that checking the count is the habit that catches a stale report.",
        },
        {
          step: "Add a Profit calculated field",
          detail:
            "LineTotal minus quantity times cost. Explain that calculated fields work on summed values, which is usually what you want.",
        },
        {
          step: "Show the margin percentage trap",
          detail:
            "Compare a calculated-field margin against the average of the row margins. Explain they differ, and that knowing which you computed matters.",
        },
        {
          step: "Switch LineTotal to % of Grand Total",
          detail:
            "Show Lagos become 61 per cent. Explain that a percentage answers how important, which a raw total does not.",
        },
        {
          step: "Use % of Column Total for product mix by state",
          detail:
            "Show that Ogun buys mostly one category. Explain that this reveals a difference no total could show.",
        },
        {
          step: "Set a running total across months",
          detail:
            "Explain that cumulative figures show whether the year is tracking ahead, which is the question behind are we growing.",
        },
        {
          step: "Add average order value beside the sum",
          detail:
            "Show the mean at roughly 38,000 naira. Explain that this is the number that will mislead a manager.",
        },
        {
          step: "Add the median order value",
          detail:
            "Show roughly 9,500 naira. Explain that the mean is pulled up by a few wholesale orders and the median describes a typical order.",
        },
        {
          step: "Compare MIN, MAX, median and mean",
          detail:
            "Show the maximum at fifty times the median. Explain that when the spread is that wide the mean describes no typical anything.",
        },
      ],
    },
    practice: {
      title: "Answer the questions a manager would ask",
      brief:
        "You build a set of pivot tables on the cleaned export that answer real questions about this business, using grouping, calculated fields and percentage views, and you report order value using the statistic that actually describes a typical order.",
      steps: [
        "Convert the cleaned data to a table and build the pivot from the table reference.",
        "Show revenue by state and confirm exactly three states appear.",
        "Verify Value Field Settings says Sum rather than Count on every value field.",
        "Add months and nest them in quarters using date grouping.",
        "Show revenue by product and identify the top five.",
        "Build a state-by-month grid with State in Rows and Month in Columns.",
        "Add a Profit calculated field and state what it is computed from.",
        "Compute margin both as a calculated field and as the average of row margins, and explain the difference.",
        "Switch revenue to % of Grand Total and record each state's share.",
        "Use % of Column Total to describe the product mix within each state.",
        "Add a running total across months and state whether the year is tracking ahead.",
        "Add average order value and record the mean.",
        "Add median order value and record the median.",
        "Record MIN, MAX, mean and median for order value together.",
        "State in one sentence which statistic describes a typical order and why.",
        "Add a row to the source data, refresh, and confirm the pivot row count matches.",
        "Write the five findings these tables produced, each in one sentence.",
      ],
      standard:
        "A set of pivot tables built from a table reference answering real business questions: revenue by state confirming exactly three states, Value Field Settings verified as Sum on every value field, months nested in quarters by date grouping, revenue by product with the top five identified, a state-by-month grid, a Profit calculated field with its inputs stated, margin computed both as a calculated field and as the average of row margins with the difference explained, revenue shown as % of Grand Total with each state's share recorded, % of Column Total used to describe product mix within each state, a running total across months with a stated view on whether the year is tracking ahead, and mean, median, MIN and MAX for order value recorded together with one sentence identifying which statistic describes a typical order and why; a source row added and the pivot refreshed with the row count confirmed to match; and five findings written as one sentence each.",
    },
    pitfalls: [
      {
        problem: "You pivot data that was never cleaned",
        fix: "Clean first. LAGOS, Lagos and Lagos State appear as three states, and you will report three figures for one state with complete confidence in all of them.",
      },
      {
        problem: "Your pivot shows last month's numbers",
        fix: "Refresh and check the row count. Pivot tables cache their data and never update automatically, so a stale report looks identical to a current one.",
      },
      {
        problem: "You dragged a text field into Values",
        fix: "Check Value Field Settings. Excel gives you a Count for text and a Sum for numbers, and a count of order lines is a different number from the revenue you meant.",
      },
      {
        problem: "You cannot group dates by month",
        fix: "Convert the dates to real dates. Text dates cannot be grouped at all, so the option is simply unavailable and the pivot stays unreadably granular.",
      },
      {
        problem: "You built on a fixed range",
        fix: "Use a table reference. A fixed range like A1:L1200 silently excludes every row added afterwards, and the totals stay plausible while being wrong.",
      },
      {
        problem: "Your margin calculated field disagrees with your column",
        fix: "Know which you computed. A calculated field works on summed values, giving a weighted average, while the average of row margins weights every order equally. Neither is wrong; they are different questions.",
      },
      {
        problem: "You report the mean order value as typical",
        fix: "Report the median. A few large wholesale orders pull the mean far above what almost every order actually is, and a manager acting on the mean will misjudge the business.",
      },
      {
        problem: "You report totals when the reader needs comparisons",
        fix: "Ask which denominator makes the number meaningful. A total says how much, a percentage says how important, and a change says which way — most unpersuasive analysis reported the wrong one.",
      },
    ],
    expertNotes: [
      "Build pivots from a table reference, never a fixed range. A fixed range silently excludes rows added later, and the resulting totals stay plausible while being wrong — the hardest kind of error to catch.",
      "Refresh and check the row count every time. Pivot tables cache their data, so a report that was never refreshed looks exactly like a current one, and this is one of the commonest ways a wrong number reaches a manager.",
      "Report the median for anything you call typical. Order values are skewed by a few large wholesale orders, so the mean describes the total while the median describes the usual order — and only one of them is what the word typical means.",
      "Choose the denominator deliberately: % of Grand Total for importance, % of Column Total for mix, Difference From for direction. A raw total answers how much and almost nobody acts on that alone.",
    ],
    vocabulary: [
      {
        term: "Pivot table",
        meaning:
          "A grouped total rebuilt on demand without altering the source. Answers follow-up questions in seconds.",
      },
      {
        term: "Pivot cache",
        meaning:
          "The stored copy a pivot reads from. Why refreshing is required and why a stale report looks current.",
      },
      {
        term: "Value Field Settings",
        meaning:
          "Where Sum, Count, Average and the percentage options live. Confirms you are measuring what you think.",
      },
      {
        term: "Grouping",
        meaning:
          "Combining dates into months or quarters, or numbers into bands. Requires real dates, not text.",
      },
      {
        term: "Calculated field",
        meaning:
          "A new measure built from existing ones. Operates on summed values, giving a weighted rather than row-level result.",
      },
      {
        term: "% of Grand Total",
        meaning: "Each value as a share of the whole. Turns how much into how important.",
      },
      {
        term: "Running total",
        meaning:
          "A cumulative figure across a period. Shows whether the year is tracking ahead or behind.",
      },
      {
        term: "Skewed data",
        meaning:
          "A few extreme values pulling the mean away from the median. The reason typical should mean median.",
      },
    ],
    homework: [
      {
        task: "Build five pivot tables on the cleaned export",
        detail:
          "Revenue by state, revenue by product, state by month, product mix within each state, and order count by sales rep. Each should answer a question you can state in one sentence.",
      },
      {
        task: "Prove the refresh trap to yourself",
        detail:
          "Build a pivot, add a large order to the source, and look at the pivot before and after refreshing. Note how identical a stale report looks to a correct one.",
      },
      {
        task: "Compare mean and median on a real column",
        detail:
          "Record MIN, MAX, mean and median together. Write one sentence on what the gap between mean and median tells you about that data.",
      },
      {
        task: "Turn one total into a percentage and a change",
        detail:
          "Take any total, show it as % of Grand Total and as Difference From the previous month, and write which of the three a manager would act on.",
      },
    ],
    rubric: [
      {
        criterion: "Construction",
        passing: "Builds a working pivot table.",
        excellent:
          "Built from a table reference on cleaned tidy data, Value Field Settings verified on every field, and exactly the expected categories appearing.",
      },
      {
        criterion: "Grouping",
        passing: "Groups by a field.",
        excellent:
          "Dates grouped to months nested in quarters and numbers grouped into bands, working because the underlying values are real dates and numbers.",
      },
      {
        criterion: "Calculated measures",
        passing: "Adds a calculated field.",
        excellent:
          "Profit and margin added with inputs stated, and the difference between a calculated-field margin and the average of row margins explained rather than discovered by accident.",
      },
      {
        criterion: "Choosing the view",
        passing: "Shows totals.",
        excellent:
          "% of Grand Total, % of Column Total and running totals used where each answers the question better, with the denominator chosen deliberately.",
      },
      {
        criterion: "Statistical honesty",
        passing: "Reports an average.",
        excellent:
          "Mean, median, MIN and MAX reported together, the skew identified, and a stated judgement about which statistic describes a typical order.",
      },
    ],
    faqs: [
      {
        q: "My pivot table did not change after I edited the data. Why?",
        a: "Pivot tables read from a cached copy and never update automatically. Right-click and choose Refresh, or Data then Refresh All. Then check the row count matches your source — a stale report looks identical to a current one.",
      },
      {
        q: "Why does my Values area show a count instead of a total?",
        a: "You dragged a text field into Values. Excel picks Sum for numbers and Count for text. Open Value Field Settings and change it — but check first, because counting order lines is a genuinely different number from summing revenue.",
      },
      {
        q: "The Group option is greyed out on my dates.",
        a: "The dates are stored as text. Grouping needs real dates, which are numbers underneath. Convert them explicitly as we did in the cleaning session, then grouping by month and quarter becomes available.",
      },
      {
        q: "Should I report the average or the median order value?",
        a: "Report both, and use the median whenever you say typical. Our mean is pulled far above the median by a few large wholesale orders, so the mean describes the total while the median describes the usual order. A manager acting on the mean will misjudge the business.",
      },
      {
        q: "My pivot totals do not match my SUMIFS formula. Which is right?",
        a: "Neither, until you know why. Usually it is a fixed pivot range that excluded new rows, a filter left applied, or a stale cache. Refresh, check the row count and clear the filters — and if they still disagree, that difference is worth understanding before you report either.",
      },
    ],
  },

  charts: {
    summary:
      "A chart is an argument, and most charts argue badly. This session covers choosing a chart from the question you are answering, building bar, line, pie and scatter charts properly, formatting so the finding is obvious, and recognising the specific ways charts mislead people.",
    objectives: [
      "Choose a chart type from the question rather than the data",
      "Build bar, line, pie and scatter charts correctly",
      "Write titles that state the finding",
      "Remove everything that does not carry information",
      "Recognise truncated axes, 3D effects and misleading scales",
      "Know when a table is better than a chart",
    ],
    blocks: [
      {
        heading: "Choose the chart from the question",
        body: [
          "Almost every chart problem starts with choosing the chart before deciding the question. Work backwards instead. **Comparison** — which state sells most? — is a **bar chart**. **Change over time** — is revenue growing? — is a **line chart**. **Part of a whole** — what share does each state hold? — is a percentage, and usually better as a bar than a pie. **Relationship** — does order size relate to margin? — is a **scatter plot**. **Distribution** — what is a typical order value? — is a **histogram**.",
          "Notice what is missing: there is no question for which a 3D pie chart is the answer. Chart types are not decorative options, they are claims about the relationship in your data, and using the wrong one makes the reader do mental work that the chart was supposed to save.",
          "And sometimes the answer is **no chart at all**. If you are comparing three precise figures that a reader needs to read exactly — this month's revenue for three states — a small table is better than a bar chart, because a chart makes you estimate a length while a table gives you the number. **Charts are for showing a pattern; tables are for reading a value.**",
        ],
      },
      {
        heading: "Bar charts and line charts done properly",
        body: [
          "**Bar charts** compare quantities, and three rules make them work. **Sort them descending** — an unsorted bar chart forces the reader to hunt for the largest, which is the one thing they wanted to know. **Use horizontal bars when labels are long**, because product names rotated forty-five degrees are unreadable. And **start the axis at zero**, because a bar's length is its meaning; an axis starting at 30,000 makes a 5 per cent difference look like a doubling.",
          "**Line charts** show change over time and are the right choice whenever the sequence matters — monthly revenue, cumulative orders. The x-axis must be **time or an ordered sequence**, never categories: a line connecting Lagos to Ogun to Oyo implies an order that does not exist and a trend that is meaningless. Keep to **two or three lines**, because more than that becomes a tangle nobody can follow.",
          "The one line-chart habit worth drilling: **do not use a line for categories**. It is the single most common chart error in business reporting, and it manufactures a trend out of nothing. If the x-axis labels could be reordered without changing the meaning, you need bars.",
        ],
      },
      {
        heading: "Pie charts, scatter plots and histograms",
        body: [
          "**Pie charts** are widely used and mostly misused, for a specific reason: **people compare angles and areas badly**. Given two slices at 28 and 32 per cent, almost nobody can tell which is larger, while the same two figures as bars are instantly comparable. If you must use a pie, keep it to **three slices at most**, order them largest first, and label them directly with percentages rather than relying on a legend.",
          "In practice, **a sorted bar chart answers the same question better nearly every time**. The honest position is that a pie is acceptable for one simple share — **Lagos is 61 per cent of revenue** — and is the wrong tool for anything more complicated than that.",
          "**Scatter plots** show whether two things move together, which is how you investigate relationships: order size against margin, delivery days against order value. Add a **trendline** and it shows the direction; the **R-squared** value tells you how much of the variation is explained, and a low R-squared means the apparent pattern is mostly noise. **Histograms** show distribution — how order values are spread — and this is the chart that reveals the skew we found, showing that most orders cluster low while a few are very large. No average can show that; a histogram shows it at a glance.",
        ],
      },
      {
        heading: "Formatting: make the finding obvious",
        body: [
          "The title is the most wasted space on most charts. **Revenue by State** describes the chart; **Lagos drives 61 per cent of revenue** states the finding. A reader who only reads the title — and most will — should come away with the conclusion. If you cannot write a finding as the title, you do not yet know what the chart says.",
          "Then remove what carries no information: the **legend** where direct labels would do, the **gridlines** where data labels are present, the **border** around the plot area, and any **3D effect** whatsoever. Each of these asks the reader to decode rather than see. **Label the bars directly** with their values, which removes the need to trace a bar to an axis and read a scale.",
          "The test is simple: **can a reader get the point in five seconds without you explaining?** If they need you to talk them through it, the chart is not finished. That is not a low bar — it is the entire purpose of a chart, because the alternative to a chart that works is a reader who does not act.",
        ],
      },
      {
        heading: "How charts mislead",
        body: [
          "Most misleading charts are not lies; they are carelessness that produces a false impression. The commonest is the **truncated axis** — starting a bar chart at something other than zero, which exaggerates small differences. On a line chart a truncated axis is often legitimate, because you are showing change rather than magnitude; on a bar chart it is almost always misleading, because the bar's length is the message.",
          "Then **dual axes**, where two series with different scales share a chart. They can be legitimate, but they invite the reader to see a relationship between two lines that cross by coincidence, and **they crossed** is very often read as **one caused the other**. If you use two axes, label them clearly and say explicitly that the crossing is not a finding.",
          "The rest are familiar: **3D effects**, which distort the apparent size of slices and bars for no informational gain; **inconsistent scales** between two charts shown side by side, which makes an unchanged value look like growth; **cherry-picked periods**, where a start date is chosen to make a trend look stronger than it is; and **pies with eight slices**, where no comparison is possible at all. None of these require dishonest intent, which is exactly why you need to check for them in your own work before someone else does.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor takes the pivot tables from the last session and builds the chart for each question, showing the same data presented well and badly — unsorted versus sorted, truncated versus zero-based axis, pie versus bar, 3D versus flat, descriptive versus finding title — so the class can see exactly what each choice costs.",
      steps: [
        {
          step: "State the question before choosing a chart",
          detail:
            "Write which state sells most on the board. Explain that the question determines the chart, and choosing the chart first is where most bad charts start.",
        },
        {
          step: "Build a bar chart of revenue by state, unsorted",
          detail:
            "Show the reader hunting for the largest. Explain that an unsorted bar chart hides the one thing the reader wanted to know.",
        },
        {
          step: "Sort it descending",
          detail:
            "Show how much faster it reads. Explain that sorting is the single cheapest improvement available on any bar chart.",
        },
        {
          step: "Truncate the axis at 30,000",
          detail:
            "Show a small difference become dramatic. Explain that a bar's length is its meaning, so a bar axis must start at zero.",
        },
        {
          step: "Reset the axis to zero and compare",
          detail:
            "Explain the exception: a truncated axis on a line chart can be legitimate because you are showing change, not magnitude.",
        },
        {
          step: "Turn the same data into a line chart",
          detail:
            "Explain why this is wrong: the states have no order, so the line implies a trend that does not exist.",
        },
        {
          step: "Build a proper line chart of monthly revenue",
          detail:
            "Time on the x-axis. Explain that a line is right when the sequence is real and the reader cares about direction.",
        },
        {
          step: "Add a second and third line",
          detail:
            "Show it stay readable at three and tangle at six. Explain that more than three lines stops being a chart and becomes decoration.",
        },
        {
          step: "Build a pie of state share with all three states",
          detail:
            "Ask the class to compare the two smaller slices. Explain that people compare angles badly, which is the whole problem with pies.",
        },
        {
          step: "Show the same share as a sorted bar",
          detail:
            "Explain that a bar answers the same question better nearly every time, and that a pie is acceptable only for one simple share.",
        },
        {
          step: "Add 3D to the pie",
          detail:
            "Show the apparent sizes change. Explain that 3D distorts for no informational gain and there is no case for it.",
        },
        {
          step: "Build a scatter of order value against margin",
          detail:
            "Add a trendline and read the R-squared. Explain that a low R-squared means the apparent pattern is mostly noise.",
        },
        {
          step: "Build a histogram of order values",
          detail:
            "Show the cluster of small orders and the tail of large ones. Explain that this reveals the skew no average could show.",
        },
        {
          step: "Retitle a chart from description to finding",
          detail:
            "Change Revenue by State to Lagos drives 61 per cent of revenue. Explain that a reader who only reads the title should still get the conclusion.",
        },
        {
          step: "Replace the legend with direct labels",
          detail:
            "Remove gridlines and the plot border. Explain that each removal takes the reader from decoding to seeing.",
        },
        {
          step: "Show two charts with inconsistent scales",
          detail:
            "Explain that side-by-side charts on different scales make an unchanged value look like growth.",
        },
        {
          step: "Show a cherry-picked start date",
          detail:
            "Move the start month and watch the trend steepen. Explain that the choice of period is an argument and should be defensible.",
        },
        {
          step: "Decide where a table is better",
          detail:
            "Show three precise figures the reader must read exactly. Explain that charts show patterns while tables give values, and picking wrong wastes both.",
        },
      ],
    },
    practice: {
      title: "Chart the findings, then break them on purpose",
      brief:
        "You build one chart per finding from your pivot tables, each chosen from its question and formatted so the point is obvious in five seconds — then you deliberately produce four misleading versions of your own charts and explain what each one distorts.",
      steps: [
        "Write the five findings from the last session as one-sentence questions.",
        "For each finding, name the question type: comparison, change, share, relationship or distribution.",
        "Choose the chart type from the question and write down which you chose and why.",
        "Build revenue by state as a bar chart, sorted descending.",
        "Set the axis to start at zero and confirm the bar lengths are honest.",
        "Label the bars directly and remove the legend, gridlines and plot border.",
        "Build monthly revenue as a line chart with time on the x-axis.",
        "Add a second series and confirm the chart is still readable.",
        "Build state share as a sorted bar rather than a pie, and say why.",
        "Build a scatter of order value against margin with a trendline and note the R-squared.",
        "Build a histogram of order values and describe the skew it shows.",
        "Give every chart a title that states the finding rather than describing the data.",
        "Check each chart passes the five-second test with someone else.",
        "Now break one chart by truncating the axis, and describe the distortion.",
        "Break another by turning it into a line across categories, and describe what it falsely implies.",
        "Break another by adding 3D, and describe what changes visually.",
        "Break a fourth by changing the start period, and describe how the trend appears to change.",
        "Identify one finding that is better shown as a small table, and build that instead.",
      ],
      standard:
        "Five findings each expressed as a one-sentence question with its question type named and the chart type chosen from it and justified; revenue by state as a bar chart sorted descending on a zero-based axis with direct labels and no legend, gridlines or plot border; monthly revenue as a line chart with time on the x-axis and a readable second series; state share as a sorted bar with the reason it was preferred to a pie stated; a scatter of order value against margin with a trendline and the R-squared noted; a histogram of order values with the skew described; every title stating the finding rather than describing the data; each chart confirmed to pass a five-second test with another person; four deliberately misleading versions produced by truncating an axis, drawing a line across categories, adding 3D and shifting the start period, each with its distortion explained; and one finding presented as a small table with the reason a chart was not used.",
    },
    pitfalls: [
      {
        problem: "You choose the chart before deciding the question",
        fix: "Name the question first: comparison, change, share, relationship or distribution. The question determines the chart, and picking a chart first is where most bad charts begin.",
      },
      {
        problem: "Your bar chart is not sorted",
        fix: "Sort descending. An unsorted chart makes the reader hunt for the largest bar, which is the single thing they wanted to know.",
      },
      {
        problem: "Your bar axis does not start at zero",
        fix: "Reset it. A bar's length is its meaning, so truncating the axis exaggerates small differences into apparent doublings.",
      },
      {
        problem: "You drew a line across categories",
        fix: "Use bars. A line implies order and trend, so connecting Lagos to Ogun to Oyo manufactures a pattern that does not exist.",
      },
      {
        problem: "You used a pie with many slices",
        fix: "Use a sorted bar. People compare angles and areas badly, so slices at 28 and 32 per cent are indistinguishable while bars are instant.",
      },
      {
        problem: "You added 3D to make it look better",
        fix: "Remove it. 3D distorts apparent size for no informational gain, and there is no chart where it improves the reading.",
      },
      {
        problem: "Your title describes the chart instead of the finding",
        fix: "State the conclusion: Lagos drives 61 per cent of revenue, not Revenue by State. Most readers read only the title, so it must carry the point.",
      },
      {
        problem: "You charted figures the reader needed to read exactly",
        fix: "Use a small table. A chart makes the reader estimate a length while a table gives the number — charts show patterns, tables give values.",
      },
    ],
    expertNotes: [
      "Name the question before you touch the chart menu. Comparison, change, share, relationship or distribution — the answer determines the chart type, and almost every bad chart began with the reverse order.",
      "Sort every bar chart descending and start the axis at zero. These two changes cost ten seconds and remove the two most common ways a bar chart wastes a reader's attention or distorts the difference.",
      "Put the finding in the title. Most readers read nothing else, so Revenue by State reaches nobody while Lagos drives 61 per cent of revenue reaches everyone — and if you cannot write that title, you do not yet know what the chart says.",
      "Check your own charts for the misleading patterns before anyone else does. Truncated axes, lines across categories, 3D, inconsistent scales and cherry-picked periods are usually carelessness rather than dishonesty, which is exactly why they survive into reports.",
    ],
    vocabulary: [
      {
        term: "Bar chart",
        meaning:
          "Compares quantities. Sort descending, use horizontal bars for long labels, start the axis at zero.",
      },
      {
        term: "Line chart",
        meaning:
          "Shows change over an ordered sequence. Wrong for categories, because it implies a trend that does not exist.",
      },
      {
        term: "Pie chart",
        meaning:
          "Shows a share of a whole. Acceptable for one simple share with three slices at most; a sorted bar is usually better.",
      },
      {
        term: "Scatter plot",
        meaning:
          "Shows whether two variables move together. A trendline gives direction and R-squared says how much is explained.",
      },
      {
        term: "Histogram",
        meaning: "Shows distribution. The chart that reveals skew, which no average can show.",
      },
      {
        term: "Truncated axis",
        meaning:
          "An axis not starting at zero. Misleading on bar charts, sometimes legitimate on line charts showing change.",
      },
      {
        term: "Chartjunk",
        meaning:
          "Anything on a chart that carries no information: 3D, borders, redundant gridlines, legends where labels would do.",
      },
      {
        term: "Five-second test",
        meaning:
          "Whether a reader gets the point in five seconds without explanation. The actual purpose of a chart.",
      },
    ],
    homework: [
      {
        task: "Rebuild one existing chart from a question",
        detail:
          "Take a chart from a report you have seen, state the question it was answering, and rebuild it with the chart type that question calls for. Note what changed.",
      },
      {
        task: "Sort, zero and label one bar chart",
        detail:
          "Descending order, axis from zero, direct labels, no legend or gridlines. Time the difference in how fast it reads.",
      },
      {
        task: "Rewrite five chart titles as findings",
        detail:
          "Turn each description into a conclusion. If you cannot, the chart is not telling you anything yet and needs a different question.",
      },
      {
        task: "Find a misleading chart in the wild",
        detail:
          "News, social media, a work report. Identify the specific device — truncated axis, 3D, dual axes, cherry-picked period — and redraw it honestly.",
      },
    ],
    rubric: [
      {
        criterion: "Chart selection",
        passing: "Uses an appropriate chart.",
        excellent:
          "Every chart chosen from a named question type with the reasoning stated, including at least one finding deliberately presented as a table because a chart was worse.",
      },
      {
        criterion: "Construction",
        passing: "Charts render correctly.",
        excellent:
          "Bars sorted descending on a zero-based axis, lines used only on genuine sequences with three series or fewer, and scatter and histogram used for relationship and distribution.",
      },
      {
        criterion: "Formatting",
        passing: "Charts are labelled.",
        excellent:
          "Titles stating findings, direct labels replacing the legend, chartjunk removed, and each chart confirmed to pass a five-second test with another person.",
      },
      {
        criterion: "Awareness of distortion",
        passing: "Avoids obvious errors.",
        excellent:
          "Four deliberately misleading versions produced by truncating an axis, drawing a line across categories, adding 3D and shifting the period, each with its distortion explained.",
      },
      {
        criterion: "Honesty",
        passing: "Charts are accurate.",
        excellent:
          "R-squared read and low values reported as noise, skew described from a histogram rather than an average, and period choices made defensibly rather than flatteringly.",
      },
    ],
    faqs: [
      {
        q: "Are pie charts really that bad?",
        a: "They are fine for one simple share and poor for almost everything else, for a specific reason: people compare angles and areas badly, so slices at 28 and 32 per cent are indistinguishable. A sorted bar answers the same question instantly. Three slices maximum if you use one.",
      },
      {
        q: "When is it acceptable to not start the axis at zero?",
        a: "On a line chart showing change over time, where the reader cares about direction rather than magnitude. On a bar chart, essentially never — the length of the bar is the message, so truncating the axis turns a small difference into an apparent doubling.",
      },
      {
        q: "How do I write a good chart title?",
        a: "State the finding, not the contents. Lagos drives 61 per cent of revenue tells the reader the conclusion; Revenue by State tells them nothing they could not see. If you cannot write a finding as the title, the chart is not yet telling you anything.",
      },
      {
        q: "My scatter plot shows a pattern. Does that mean one thing causes the other?",
        a: "No. Check the R-squared first — a low value means the apparent pattern is mostly noise. And even a strong relationship only shows that two things move together, never that one causes the other. That distinction is the subject of the reading-numbers session.",
      },
      {
        q: "Should every finding be a chart?",
        a: "No. If a reader needs to read precise values — three states, three exact figures — a small table is better, because a chart makes them estimate a length. Charts show patterns; tables give values. Picking the wrong one wastes both.",
      },
    ],
  },

  dashboards: {
    summary:
      "A dashboard answers the questions a business asks every week, on one screen, without anyone rebuilding anything. This session covers layout, slicers and filters connected across several pivot tables, conditional formatting that informs rather than decorates, and keeping a workbook fast enough that people actually open it.",
    objectives: [
      "Design a one-screen layout that guides the eye to the answer",
      "Connect slicers and timelines to multiple pivot tables",
      "Use conditional formatting to show status at a glance",
      "Keep a dashboard reading from one source of truth",
      "Make a workbook fast enough that people use it",
      "Build a dashboard someone else can operate without you",
    ],
    blocks: [
      {
        heading: "What a dashboard is for",
        body: [
          "A dashboard is not a collection of charts; it is **the answer to the questions this business asks repeatedly**, arranged so they can be read in one screen. For our distributor those questions are fixed and known: how much did we sell this month, how does that compare with last month, which states and products are carrying it, and is anything out of line. If a chart does not answer one of those questions, it does not belong.",
          "The defining constraint is **one screen, no scrolling**. This is not an aesthetic preference. A dashboard that requires scrolling is a report, and reports get read once while dashboards get consulted weekly — the difference in value is enormous, and it comes entirely from whether the reader can take it in at a glance.",
          "The second requirement is that **someone else can operate it**. A dashboard only you can use is a personal worksheet. That means slicers rather than hidden filters, labels rather than memory, and no step that requires knowing which cell to click. Test it by handing it to someone who has never seen it and watching whether they can answer a question unaided.",
        ],
      },
      {
        heading: "Layout: where the eye goes",
        body: [
          "Readers scan a page in an **F pattern** — across the top, then down the left, then across again. So the most important number goes **top-left**, and importance decreases as you move right and down. For our distributor that means the headline figures across the top: revenue this month, change against last month, order count, average order value.",
          "The standard structure is three bands. **Top: the headline numbers**, large and unambiguous, each with its comparison. **Middle: the two or three charts that explain them** — revenue by state, revenue by month, top products. **Bottom: the detail**, a small table of the figures behind the charts for anyone who needs to read an exact value.",
          "Two details matter more than they seem. **Group related things together** and leave clear space between groups, because proximity is how a reader understands what belongs with what. And **align everything to a grid** — misaligned charts read as careless, and a reader who distrusts the layout quietly distrusts the numbers, which is exactly the reaction you cannot afford in a document meant to drive decisions.",
        ],
      },
      {
        heading: "Slicers, timelines and connecting them",
        body: [
          "**Slicers** are visible filter buttons, and they are what make a dashboard operable by someone who is not you. Insert one for State and one for Product, and a manager can answer **how does Ogun look on its own?** by clicking, without knowing that a pivot table exists. **Timelines** are the date equivalent — a slider over months and quarters — and they are far easier to use than a date filter.",
          "The important technical step is **connecting one slicer to several pivot tables**. By default a slicer controls only the pivot it was created from, so clicking Lagos filters one chart and leaves the others showing all states — which produces a dashboard that contradicts itself, the worst failure mode there is. Right-click the slicer, choose **Report Connections**, and tick every pivot table it should control.",
          "Then keep the filters **visible and reset**. A slicer left set to one state by the last reader will silently show the next reader a partial picture that looks complete, so put a clear **reset** instruction on the sheet and check the slicer state before you trust any figure. This is a small discipline and it prevents a genuinely common wrong decision.",
        ],
      },
      {
        heading: "Conditional formatting that informs",
        body: [
          "Conditional formatting shows status without a chart. **Data bars** inside a column turn a list of product revenues into an instant ranking. **Colour scales** show a gradient across a table, which is how you spot an outlier in a grid of numbers. **Icon sets** flag status — green, amber, red against a target — which is what a manager scans for.",
          "The discipline is that **colour must never be the only signal**. Roughly one man in twelve has some colour vision deficiency, and a red-versus-green scheme is invisible to them. So pair colour with a **number, an arrow or a text label**: show **-12 per cent** alongside the red, not just the red. This is the same principle as accessible web design, and it costs nothing.",
          "The other rule is **restraint**. Colour everywhere means colour nowhere: if every cell is shaded, nothing stands out, and the reader gets no signal at all. Use conditional formatting to answer one question per table — **which of these is behind target?** — and leave everything else plain. A dashboard covered in rainbow gradients looks busy and communicates nothing.",
        ],
      },
      {
        heading: "One source of truth, and keeping it fast",
        body: [
          "Every figure on a dashboard must come from **one place**. If revenue appears in a chart, in a KPI cell and in a summary table, all three must read the same cleaned table — not three copies that were pasted at different times. The failure this prevents is a dashboard where the headline says 4.2 million and the chart underneath says 4.1, and the reader stops believing either.",
          "Speed matters because **a slow dashboard does not get opened**, and an unopened dashboard has no value however good it is. The main causes are predictable: **whole-column references** like A:A that scan a million rows, **volatile functions** such as OFFSET, INDIRECT, TODAY and RAND that recalculate on every change, and **many pivot tables each holding their own cache** of the same data.",
          "The fixes are straightforward. Reference the **table** rather than whole columns. Use **INDEX and MATCH instead of OFFSET** where you need a dynamic range. Keep pivot tables reading from **one shared source**. And turn calculation to manual while you are building, recalculating when you need to. A dashboard that opens in two seconds gets used weekly; one that takes thirty seconds gets closed and forgotten.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor assembles the pivot tables and charts from the previous sessions into a single-screen dashboard for the distributor, connecting slicers across every pivot, adding conditional formatting with a non-colour signal, proving the one-source-of-truth rule by breaking it, and measuring what makes the file slow.",
      steps: [
        {
          step: "Write the questions the business asks weekly",
          detail:
            "List them before building anything. Explain that a chart answering none of these does not belong on the dashboard.",
        },
        {
          step: "Set up a dedicated dashboard sheet",
          detail:
            "Separate from the data and the pivots. Explain that mixing them is why most dashboards become unmaintainable.",
        },
        {
          step: "Place the headline numbers top-left",
          detail:
            "Revenue, change, order count, order value. Explain the F pattern and that importance decreases right and down.",
        },
        {
          step: "Add each headline's comparison",
          detail:
            "Show this month against last. Explain that a number without a comparison is not information.",
        },
        {
          step: "Add the two or three explaining charts in the middle band",
          detail:
            "Revenue by state, revenue by month, top products. Explain that the middle band explains the headline rather than repeating it.",
        },
        {
          step: "Add a detail table at the bottom",
          detail:
            "The exact figures behind the charts. Explain that charts show patterns while tables give values, and a dashboard needs both.",
        },
        {
          step: "Insert a State slicer",
          detail:
            "Click Lagos and watch one chart change. Explain that by default a slicer controls only its own pivot table.",
        },
        {
          step: "Connect the slicer to every pivot",
          detail:
            "Right-click, Report Connections, tick them all. Explain that a dashboard contradicting itself is the worst failure mode there is.",
        },
        {
          step: "Add a timeline for months",
          detail:
            "Show it filtering every chart at once. Explain that a timeline is far easier to use than a date filter dropdown.",
        },
        {
          step: "Leave a slicer set and reload the file",
          detail:
            "Show the partial picture it presents. Explain that the next reader sees a filtered dashboard that looks complete, so reset instructions are necessary.",
        },
        {
          step: "Add data bars to the product table",
          detail:
            "Explain that data bars turn a list of numbers into an instant ranking without a chart.",
        },
        {
          step: "Add icon sets against a target",
          detail:
            "Explain that managers scan for status, and green-amber-red is what they scan for.",
        },
        {
          step: "Show the colour-only failure",
          detail:
            "Simulate colour vision deficiency. Explain that one man in twelve is affected and red-green is invisible to them.",
        },
        {
          step: "Add numbers and arrows beside the colours",
          detail:
            "Show minus 12 per cent alongside the red. Explain that colour must never be the only signal.",
        },
        {
          step: "Break the one-source rule on purpose",
          detail:
            "Paste a revenue figure as a static value, change the data, and show the dashboard disagree with itself. Explain that a reader who spots one inconsistency stops believing all of it.",
        },
        {
          step: "Restore the link and confirm agreement",
          detail: "Explain that every figure on a dashboard must read from the same cleaned table.",
        },
        {
          step: "Time the file opening and recalculating",
          detail:
            "Record the seconds. Explain that a slow dashboard does not get opened, and an unopened dashboard has no value.",
        },
        {
          step: "Replace whole-column references with table references",
          detail:
            "Show the recalculation speed improve. Explain that A:A scans a million rows to use a thousand.",
        },
        {
          step: "Hand it to someone who has never seen it",
          detail:
            "Ask them to answer a question unaided. Explain that this is the only real test of whether a dashboard works.",
        },
      ],
    },
    practice: {
      title: "Build the dashboard someone else can use",
      brief:
        "You assemble your pivots and charts into a single-screen dashboard for the distributor, with slicers connected across every pivot, conditional formatting carrying a non-colour signal, every figure reading from one source, and a recorded opening time — then you test it on someone who has never seen it.",
      steps: [
        "Write the four or five questions this business asks every week.",
        "Create a dedicated dashboard sheet separate from the data and the pivots.",
        "Place the headline numbers top-left in an F-pattern layout.",
        "Give every headline number a comparison against the previous period.",
        "Add the two or three charts that explain the headline numbers.",
        "Add a detail table at the bottom with the exact figures behind the charts.",
        "Insert slicers for State and Product and a timeline for months.",
        "Connect each slicer to every pivot table via Report Connections.",
        "Confirm one click filters every chart consistently, with no contradictions.",
        "Write reset instructions on the sheet and check slicer state before trusting figures.",
        "Add data bars to the product ranking table.",
        "Add icon sets showing status against a target.",
        "Add a number or arrow beside every colour so colour is never the only signal.",
        "Remove conditional formatting from any table where it does not answer a question.",
        "Confirm every figure on the dashboard reads from the same cleaned table.",
        "Change one value in the source and verify every dependent figure updates.",
        "Replace whole-column references with table references.",
        "Record the opening and recalculation time, then improve it.",
        "Give the dashboard to someone who has never seen it and watch them answer a question.",
        "Fix whatever they struggled with.",
      ],
      standard:
        "A single-screen dashboard with no scrolling, on its own sheet, whose four or five weekly questions were written before building; headline numbers top-left in an F-pattern layout, each with a comparison against the previous period; two or three explaining charts in the middle band and a detail table of exact figures below; State and Product slicers plus a month timeline, each connected to every pivot table via Report Connections and confirmed to filter all charts consistently with reset instructions written on the sheet; data bars on the product ranking, icon sets against a target, and a number or arrow beside every colour so colour is never the only signal, with formatting removed wherever it answers no question; every figure confirmed to read from the same cleaned table and verified by changing a source value and watching every dependent figure update; whole-column references replaced with table references and the opening and recalculation time recorded and improved; and the dashboard tested on someone who has never seen it, with whatever they struggled with fixed.",
    },
    pitfalls: [
      {
        problem: "Your dashboard needs scrolling",
        fix: "Cut it to one screen. A dashboard requiring scrolling is a report, and reports are read once while dashboards are consulted weekly — that difference is the entire value.",
      },
      {
        problem: "One slicer filters one chart",
        fix: "Use Report Connections to link it to every pivot. A dashboard where the headline says Lagos and the chart shows all states contradicts itself, which is the worst failure mode there is.",
      },
      {
        problem: "A slicer left set misleads the next reader",
        fix: "Write reset instructions on the sheet and check slicer state before trusting a figure. A filtered dashboard looks complete, so the error is invisible to the person making the decision.",
      },
      {
        problem: "You signal status with colour alone",
        fix: "Add a number, arrow or label. About one man in twelve has colour vision deficiency and red-versus-green is invisible to them, so colour must never be the only signal.",
      },
      {
        problem: "Every cell is colour-formatted",
        fix: "Use it to answer one question per table. Colour everywhere means colour nowhere, and a reader gets no signal from a rainbow dashboard.",
      },
      {
        problem: "The headline and the chart disagree",
        fix: "Make everything read one source. Pasted static values drift from the data, and a reader who catches one inconsistency stops believing every number on the sheet.",
      },
      {
        problem: "The file takes thirty seconds to open",
        fix: "Replace whole-column references with table references, drop volatile functions, and share one pivot cache. A slow dashboard does not get opened, and an unopened dashboard has no value.",
      },
      {
        problem: "Only you can operate it",
        fix: "Test it on someone who has never seen it. Hidden filters and steps that depend on memory make a dashboard a personal worksheet rather than a business tool.",
      },
    ],
    expertNotes: [
      "Write the weekly questions before you build anything. A dashboard is the answer to the questions a business asks repeatedly, and every chart that answers none of them is noise that costs the reader attention.",
      "Connect every slicer to every pivot through Report Connections. The default is one slicer per pivot, and a dashboard whose headline and chart disagree is worse than no dashboard, because someone will act on one of the two numbers.",
      "Never let colour be the only signal. Pair every red-amber-green indicator with a number, arrow or label — about one man in twelve has colour vision deficiency, and the fix costs nothing.",
      "Make it fast, then make it usable by someone else. A slow dashboard does not get opened and a dashboard only you can operate is a personal worksheet; both fail for the same reason, that nobody but you gets value from them.",
    ],
    vocabulary: [
      {
        term: "Dashboard",
        meaning:
          "One screen answering the questions a business asks repeatedly. No scrolling, and operable by someone else.",
      },
      {
        term: "Slicer",
        meaning:
          "A visible filter button. What makes a dashboard operable by someone who does not know pivot tables exist.",
      },
      {
        term: "Timeline",
        meaning:
          "A date slicer over months and quarters. Far easier to use than a date filter dropdown.",
      },
      {
        term: "Report Connections",
        meaning:
          "Where you link one slicer to many pivot tables. Skipping it produces a dashboard that contradicts itself.",
      },
      {
        term: "Conditional formatting",
        meaning:
          "Data bars, colour scales and icon sets showing status at a glance. Must never rely on colour alone.",
      },
      {
        term: "One source of truth",
        meaning:
          "Every figure reading the same cleaned table. Prevents the headline and the chart disagreeing.",
      },
      {
        term: "Volatile function",
        meaning:
          "OFFSET, INDIRECT, TODAY, RAND — recalculates on every change and slows a workbook down.",
      },
      {
        term: "F pattern",
        meaning:
          "How readers scan: across the top, down the left, across again. Why the key number goes top-left.",
      },
    ],
    homework: [
      {
        task: "Write the weekly questions for a real business",
        detail:
          "Four or five questions someone actually asks every week. If you cannot name them, you do not yet know what the dashboard is for.",
      },
      {
        task: "Connect one slicer to several pivot tables",
        detail:
          "Use Report Connections, then click it and confirm every chart changes together. Note what the dashboard looked like before, when the charts contradicted each other.",
      },
      {
        task: "Add one conditional format with a non-colour signal",
        detail:
          "An icon set or data bar paired with a number or arrow. Then describe how it would read to someone who cannot distinguish red from green.",
      },
      {
        task: "Time and improve one workbook",
        detail:
          "Record the opening and recalculation time, replace whole-column references with table references, and record the difference.",
      },
    ],
    rubric: [
      {
        criterion: "Purpose",
        passing: "Builds a dashboard with charts.",
        excellent:
          "Weekly questions written first, every element answering one of them, and anything answering none removed.",
      },
      {
        criterion: "Layout",
        passing: "Fits on a screen.",
        excellent:
          "One screen with no scrolling, headline numbers top-left with comparisons, explaining charts in the middle, a detail table below, and everything aligned to a grid.",
      },
      {
        criterion: "Interactivity",
        passing: "Adds slicers.",
        excellent:
          "Slicers and a timeline connected to every pivot via Report Connections, confirmed to filter consistently, with reset instructions on the sheet.",
      },
      {
        criterion: "Formatting and access",
        passing: "Uses conditional formatting.",
        excellent:
          "Data bars and icon sets answering one question each, every colour paired with a number or arrow, and formatting removed wherever it communicates nothing.",
      },
      {
        criterion: "Reliability and usability",
        passing: "The dashboard works.",
        excellent:
          "Every figure reading one source and verified by changing a value, whole-column references replaced, opening time recorded and improved, and the dashboard tested on someone who has never seen it with their difficulties fixed.",
      },
    ],
    faqs: [
      {
        q: "How many charts should a dashboard have?",
        a: "As few as will answer the weekly questions — usually three or four plus the headline numbers. Every extra chart costs the reader attention, and a dashboard that needs scrolling has become a report, which gets read once instead of consulted weekly.",
      },
      {
        q: "My slicer only filters one chart. Why?",
        a: "That is the default: a slicer controls the pivot table it was created from. Right-click it, choose Report Connections, and tick every pivot table it should control. Until you do, the dashboard will contradict itself.",
      },
      {
        q: "Is conditional formatting with red and green acceptable?",
        a: "Only if colour is not the only signal. About one man in twelve has colour vision deficiency and red-versus-green is invisible to them, so pair the colour with a number, arrow or text label. The fix costs nothing.",
      },
      {
        q: "My dashboard is slow. What is causing it?",
        a: "Usually whole-column references like A:A, which scan a million rows to use a thousand, plus volatile functions such as OFFSET and INDIRECT that recalculate on every change, and multiple pivot tables each holding their own cache. Reference the table, use INDEX and MATCH, and share one source.",
      },
      {
        q: "How do I know my dashboard actually works?",
        a: "Give it to someone who has never seen it and ask them to answer one of the weekly questions unaided. Watch where they hesitate. That test finds the hidden filters, the unlabelled slicers and the layout problems that you cannot see any more because you built it.",
      },
    ],
  },
};
