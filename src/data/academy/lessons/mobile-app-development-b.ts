import type { SessionLecture } from "../types";

/**
 * Mobile App Development — ₦30,000 · 4 weeks · 8 sessions.
 * Sessions 4 to 6. (1–3 in mobile-app-development.ts, 7–8 in -c.ts.)
 * Same running app: the naira expense tracker, built forward.
 */
export const mobileAppLessonsB: Record<string, SessionLecture> = {
  "navigation-components": {
    summary:
      "Four screens need to know how to reach each other, and the code needs to stop repeating itself. This session covers wiring tab, stack and modal navigation together, passing data between screens, extracting reusable components, centralising styling so the app looks consistent, and behaving sensibly across device sizes.",
    objectives: [
      "Wire a tab bar, a stack and a modal into one app",
      "Pass data between screens and read it on arrival",
      "Extract repeated UI into reusable components with props",
      "Centralise colours and spacing so styling stays consistent",
      "Make layouts work from a small phone to a tablet",
      "Keep navigation behaving correctly with the system back button",
    ],
    blocks: [
      {
        heading: "Wiring the navigation together",
        body: [
          "Session two chose the patterns; now they have to coexist. The expense tracker uses a **tab bar** for its three siblings — expenses, summary, settings — a **stack** so tapping an expense opens its detail, and a **modal** for adding one, because adding is a short interrupting task that should cover the screen and be dismissed on completion.",
          "Nesting these is the part that confuses people, and the mental model is simple: **the tab bar is the outermost layer**, and each tab contains its own stack. So the Expenses tab holds a stack whose first screen is the list and whose second is the detail, and the Summary tab holds its own stack independently. Going back from a detail screen returns to that tab's list without disturbing the other tabs.",
          "The modal sits outside this, presented over whatever is current and dismissed rather than popped. Getting this structure right matters because it is what makes the **system back button** behave sensibly on Android: back from a detail returns to the list, back from the list exits the app, and back from the modal closes it. An app where back does something surprising feels broken no matter how good the screens are.",
        ],
      },
      {
        heading: "Passing data between screens",
        body: [
          "Navigation is not just movement, it is **carrying context**. Tapping an expense in the list must open that expense's detail, not a generic one, which means passing its identifier as a **navigation param** and reading it on the destination screen.",
          "The discipline worth establishing early is to **pass an identifier, not the whole object**. Pass the expense's id and look it up from the single source of data on the detail screen. Passing the whole object works immediately and breaks later, because when the expense is edited the detail screen is holding a stale copy and shows the old values — a bug that is genuinely confusing to debug because the code looks correct.",
          "Then handle the **missing case**. A screen that expects a param can be reached without one — through a deep link, a notification, or a bug — so read the param defensively and show something sensible rather than crashing. An app that crashes on a missing id is an app that crashes in front of a user, and the fix is one line.",
        ],
      },
      {
        heading: "Reusable components",
        body: [
          "By now the same button, the same card and the same list row appear several times, written out each time. **Extracting them into components** is what separates an app you can maintain from one you cannot: one `Button` component used everywhere means a change to the button changes it everywhere, and one `ExpenseRow` means the list is defined in one place.",
          "A good mobile component takes **props for what varies and owns what does not**. `ExpenseRow` takes the expense and an `onPress`; it owns its own layout, spacing and typography. `Button` takes a label, an `onPress` and a variant; it owns its padding, border radius and press feedback. The test is whether you could drop the component into another screen without editing it.",
          "The trap to avoid is **abstracting too early**. Copy a pattern twice and it is fine; extract on the third. Extracting after one instance usually produces a component with the wrong props, which you then have to keep changing. And resist the urge to build one component that does everything with ten optional props — **several small clear components beat one flexible confusing one**, in mobile as everywhere.",
        ],
      },
      {
        heading: "Centralising the styling",
        body: [
          "Mobile has no CSS, so consistency is a discipline you impose rather than something a stylesheet gives you. The method is a **theme file**: one module exporting your colours, your spacing scale and your type sizes, which every component imports. **`colors.primary`** rather than a hex code scattered across twenty files; **`spacing.md`** rather than a number someone typed.",
          "The payoff is immediate and practical. A client asks for a different brand colour and you change one line. Spacing that was **roughly** consistent becomes actually consistent, because there are only four values to choose from. And a new screen looks like the others automatically, because it is built from the same primitives with the same tokens.",
          "Then **`StyleSheet.create`** rather than inline style objects. It is not merely tidier: styles defined this way are created once rather than on every render, which matters on the low-end devices most of your users have, and it gives you a single place per file to see what a component looks like.",
        ],
      },
      {
        heading: "Working across device sizes",
        body: [
          "Android devices range from small phones around 320 density-independent pixels wide to tablets at three times that, and an app that only works at one size is broken on the others. The starting rule is to **avoid fixed widths** — a `width: 340` that fits your phone will overflow a small one and look stranded on a tablet.",
          "Use **flex and percentages** instead: `flex: 1` to fill available space, `flexDirection: row` with flex children to divide a row proportionally, and percentage widths where a proportion is what you mean. Fixed values are right for things that genuinely have a fixed size — touch targets, icons, spacing — and wrong for anything that should scale.",
          "Then **test at the extremes**, because the middle sizes always work. Check the smallest phone you can, where text wraps and buttons crowd, and a tablet, where a full-width list looks absurd and content wants a maximum width. The browser simulator is genuinely useful here, since it can emulate many sizes quickly — this is the one thing it is better at than a single physical phone.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor wires the expense tracker's four screens together on the live project — nesting stacks inside tabs, adding the add-expense modal, passing an id to the detail screen and showing the stale-object bug, extracting three reusable components, moving every colour and spacing value into a theme file, and testing the layout from a 320dp phone to a tablet.",
      steps: [
        {
          step: "Lay out the navigation structure on the board",
          detail:
            "Tab bar outermost, a stack inside each tab, modal outside. Explain that this structure is what makes the back button behave sensibly.",
        },
        {
          step: "Create the three-tab navigator",
          detail:
            "Expenses, summary, settings. Explain that siblings of equal importance get tabs and that five is the ceiling.",
        },
        {
          step: "Put a stack inside the Expenses tab",
          detail:
            "List as the first screen, detail as the second. Explain that each tab holds its own stack independently.",
        },
        {
          step: "Test the back button on Android",
          detail:
            "Back from detail to list, back from list exits. Explain that an app where back surprises the user feels broken however good the screens are.",
        },
        {
          step: "Add the add-expense screen as a modal",
          detail:
            "Explain that a short interrupting task should cover the screen and be dismissed on completion rather than popped.",
        },
        {
          step: "Make a list row tappable",
          detail:
            "Navigate on press. Explain that a Pressable gives the feedback a plain View does not.",
        },
        {
          step: "Pass the whole expense object as a param",
          detail:
            "Show it working. Explain that this is the tempting approach and it breaks later.",
        },
        {
          step: "Edit that expense and reopen the detail",
          detail:
            "Show the stale values. Explain that the detail screen is holding a copy, and this bug is confusing because the code looks correct.",
        },
        {
          step: "Change to passing the id and looking it up",
          detail:
            "Explain that a single source of data means the detail always shows current values.",
        },
        {
          step: "Open the detail with no param",
          detail:
            "Show the crash, then read the param defensively. Explain that deep links and notifications can reach a screen without params and the fix is one line.",
        },
        {
          step: "Find the repeated button code",
          detail:
            "Show it in three places. Explain that three copies means three places to change and three chances to diverge.",
        },
        {
          step: "Extract a Button component",
          detail:
            "Label, onPress and variant as props; padding, radius and press feedback owned inside. Explain the test: could you drop it into another screen without editing it?",
        },
        {
          step: "Extract an ExpenseRow component",
          detail:
            "Expense and onPress in, layout owned inside. Explain that the list is now defined in one place.",
        },
        {
          step: "Show a premature abstraction and remove it",
          detail:
            "Explain extracting on the third copy, because after one instance you usually design the wrong props.",
        },
        {
          step: "Collect every colour into a theme file",
          detail:
            "Replace scattered hex codes with named tokens. Explain that a brand colour change is now one line instead of twenty edits.",
        },
        {
          step: "Collect spacing and type sizes too",
          detail:
            "Explain that roughly consistent spacing becomes actually consistent when there are only four values to choose from.",
        },
        {
          step: "Move inline styles into StyleSheet.create",
          detail:
            "Explain that these are created once rather than per render, which matters on low-end devices.",
        },
        {
          step: "Set a fixed width and test on a small phone",
          detail:
            "Show the overflow at 320dp. Explain that a width fitting your phone will not fit the smallest one on sale.",
        },
        {
          step: "Replace it with flex and test again",
          detail:
            "Explain that fixed values are right for touch targets, icons and spacing, and wrong for anything that should scale.",
        },
        {
          step: "Test on a tablet size",
          detail:
            "Show a full-width list looking absurd. Explain that a maximum content width is usually the fix, and that the simulator is genuinely useful for testing many sizes.",
        },
      ],
    },
    practice: {
      title: "Wire the app together and stop repeating yourself",
      brief:
        "You connect all four screens with correct navigation, pass identifiers rather than objects, extract your repeated UI into reusable components, centralise every colour and spacing value into a theme, and verify the layout from the smallest phone to a tablet.",
      steps: [
        "Draw the navigation structure: tab bar outermost, a stack in each tab, modal outside.",
        "Create the three-tab navigator for expenses, summary and settings.",
        "Put a stack inside the Expenses tab with list and detail screens.",
        "Add the add-expense screen as a modal that dismisses on completion.",
        "Test the Android back button from every screen and confirm it behaves sensibly.",
        "Make each list row tappable with visible press feedback.",
        "Pass the expense id as a navigation param, not the whole object.",
        "Look the expense up from the single data source on the detail screen.",
        "Edit an expense and confirm the detail screen shows the updated values.",
        "Read the param defensively and show something sensible when it is missing.",
        "Identify every piece of UI repeated more than twice.",
        "Extract a Button component taking label, onPress and variant.",
        "Extract an ExpenseRow component taking the expense and onPress.",
        "Confirm each component could be dropped into another screen without editing.",
        "Create a theme file exporting colours, spacing and type sizes.",
        "Replace every scattered hex code and magic number with a token.",
        "Move inline styles into StyleSheet.create in each component.",
        "Remove every fixed width that should scale and replace it with flex.",
        "Test at the smallest phone size and fix any overflow or crowding.",
        "Test at a tablet size and add a maximum content width where needed.",
        "Run the app on a physical phone and confirm nothing regressed.",
      ],
      standard:
        "All four screens wired with the navigation structure drawn first — tab bar outermost with a stack inside the Expenses tab and the add-expense screen presented as a modal dismissing on completion — with the Android back button tested from every screen and behaving sensibly; rows tappable with press feedback, the expense id passed as a param rather than the object, looked up from the single data source on the detail screen and confirmed to show updated values after an edit, with the param read defensively and a sensible fallback when missing; every UI element repeated more than twice extracted into components that take what varies as props and own what does not, each confirmed droppable into another screen unedited; a theme file exporting colours, spacing and type sizes with every scattered hex code and magic number replaced by a token; inline styles moved into StyleSheet.create; every fixed width that should scale replaced with flex; the layout tested at the smallest phone size with overflow and crowding fixed and at a tablet size with a maximum content width added where needed; and the app confirmed unregressed on a physical phone.",
    },
    pitfalls: [
      {
        problem: "Your back button does something surprising",
        fix: "Nest stacks inside tabs with the modal outside. Back from detail should return to the list, back from the list should exit, and back from a modal should close it.",
      },
      {
        problem: "You pass the whole object between screens",
        fix: "Pass the id and look it up. A passed object becomes a stale copy the moment the record is edited, and the resulting bug is confusing because the code looks correct.",
      },
      {
        problem: "Your detail screen crashes when opened without a param",
        fix: "Read params defensively and render a fallback. Deep links, notifications and bugs all reach screens without params, and the fix is one line.",
      },
      {
        problem: "The same button is written out three times",
        fix: "Extract a component. Three copies means three places to change and three chances for them to diverge, and one component means a change lands everywhere.",
      },
      {
        problem: "You abstracted after the first instance",
        fix: "Extract on the third copy. Abstracting after one usually produces the wrong props, which you then have to keep changing.",
      },
      {
        problem: "Hex colours are scattered across twenty files",
        fix: "Move them into a theme file as named tokens. A brand colour change should be one line, and roughly consistent spacing becomes actually consistent when only four values exist.",
      },
      {
        problem: "You use inline style objects everywhere",
        fix: "Use StyleSheet.create. Styles are then created once rather than on every render, which matters on the low-end devices most users have.",
      },
      {
        problem: "You set fixed widths",
        fix: "Use flex and percentages for anything that should scale. A width that fits your phone overflows the smallest one and looks stranded on a tablet.",
      },
    ],
    expertNotes: [
      "Nest stacks inside tabs with the modal outside. That structure is what makes the Android back button behave predictably, and an app where back surprises the user feels broken however good the individual screens are.",
      "Pass identifiers between screens, never whole objects. A passed object becomes a stale copy the moment the record is edited, producing a bug that is genuinely hard to trace because the code looks correct.",
      "Extract on the third repetition, not the first. Copying twice is fine, and abstracting after one instance usually produces a component with the wrong props that you then have to keep changing.",
      "Put colours, spacing and type sizes in one theme file. It turns a brand change into one line and makes roughly consistent spacing actually consistent, because there are only a few values left to choose from.",
    ],
    vocabulary: [
      { term: "Tab navigator", meaning: "The outermost layer, switching between three to five equal areas. Each tab holds its own stack." },
      { term: "Stack navigator", meaning: "Push a screen on, pop it off. What the system back button expects to operate on." },
      { term: "Modal", meaning: "Presented over the current screen for a short task and dismissed on completion rather than popped." },
      { term: "Navigation param", meaning: "Data carried to a destination screen. Pass an identifier, not the object, to avoid stale copies." },
      { term: "Reusable component", meaning: "Takes what varies as props and owns what does not. The test is whether it drops into another screen unedited." },
      { term: "Theme tokens", meaning: "Named colours, spacing and type sizes in one module. What makes a brand change one line instead of twenty." },
      { term: "StyleSheet.create", meaning: "Defines styles once rather than per render. Matters on low-end devices." },
      { term: "Density-independent pixel", meaning: "The unit mobile layout uses, so a size is physically similar across screen densities." },
    ],
    homework: [
      {
        task: "Draw your navigation structure before wiring it",
        detail:
          "Tab bar, stacks, modal, and what back does from each screen. Then build it and test back on every screen.",
      },
      {
        task: "Convert one param from object to id",
        detail:
          "Then edit the record and confirm the detail screen shows the new values. Note what the object version would have shown.",
      },
      {
        task: "Extract one repeated component",
        detail:
          "Find UI repeated three or more times, extract it with props for what varies, and confirm you can drop it into another screen unedited.",
      },
      {
        task: "Build a theme file",
        detail:
          "Move every colour, spacing value and type size into it, then change your primary colour and count how many files you had to touch.",
      },
    ],
    rubric: [
      {
        criterion: "Navigation structure",
        passing: "Screens are reachable.",
        excellent: "Tab bar outermost with stacks nested inside and the modal outside, drawn before building, with the Android back button tested from every screen and behaving sensibly.",
      },
      {
        criterion: "Data passing",
        passing: "Passes data between screens.",
        excellent: "Identifiers passed rather than objects, looked up from a single source and confirmed current after an edit, with params read defensively and a fallback for the missing case.",
      },
      {
        criterion: "Components",
        passing: "Has some components.",
        excellent: "Everything repeated more than twice extracted, props for what varies and ownership of what does not, each droppable into another screen unedited, and no abstraction made after a single instance.",
      },
      {
        criterion: "Styling",
        passing: "App looks consistent.",
        excellent: "A theme file exporting colours, spacing and type sizes with no scattered hex codes or magic numbers, and styles in StyleSheet.create rather than inline objects.",
      },
      {
        criterion: "Device range",
        passing: "Works on one device.",
        excellent: "Fixed widths replaced with flex, tested at the smallest phone size with crowding fixed and at a tablet size with a maximum content width, and confirmed unregressed on a physical phone.",
      },
    ],
    faqs: [
      {
        q: "How do tabs and stacks fit together?",
        a: "The tab bar is the outermost layer and each tab contains its own stack. So the Expenses tab holds a stack whose first screen is the list and second is the detail, independently of the other tabs. That structure is what makes the system back button behave predictably.",
      },
      {
        q: "Should I pass the whole object or just the id?",
        a: "Just the id, then look it up from your single data source. A passed object becomes a stale copy the moment the record is edited, so the detail screen shows old values — and that bug is confusing to trace because the code looks correct.",
      },
      {
        q: "When should I extract a component?",
        a: "On the third repetition. Copying a pattern twice is fine, and extracting after one instance usually gives you the wrong props, which you then have to keep changing. Also resist one component with ten optional props — several small clear ones beat it.",
      },
      {
        q: "Is a theme file really necessary for a four-screen app?",
        a: "Yes, and it costs an hour. A brand colour change becomes one line instead of twenty edits, spacing becomes actually consistent rather than roughly consistent, and every new screen looks like the others because it uses the same tokens.",
      },
      {
        q: "How do I test different screen sizes without owning many phones?",
        a: "Use the browser simulator's device emulation — it is the one thing it does better than a single physical phone. Test the extremes, around 320dp and a tablet, because the middle sizes always work and the extremes are where fixed widths and crowding appear.",
      },
    ],
  },

  "state-and-data": {
    summary:
      "An app that forgets everything when it closes is a demo. This session covers where state should live, handling user input properly, rendering lists with FlatList rather than a map, and persisting data to the device so the expense tracker still has your expenses tomorrow morning.",
    objectives: [
      "Decide where state belongs and lift it correctly",
      "Handle text input as controlled state",
      "Render long lists with FlatList and explain why it matters",
      "Give every list item a stable key",
      "Persist data with local storage so it survives closing the app",
      "Model your data as a clear shape before storing it",
    ],
    blocks: [
      {
        heading: "Where state should live",
        body: [
          "**State** is data the app holds and changes over time, and the first question is always **where does it live**. The rule is that state belongs in **the lowest common ancestor of everything that needs it** — high enough that all consumers can reach it, and no higher, because state placed at the root of an app causes every screen to re-render when anything changes.",
          "In the expense tracker, the list of expenses is needed by the list screen and by the summary screen, so it lives above both — typically in the app's root or a shared context — while a form's in-progress text belongs in the add-expense screen alone. **Moving state up is called lifting**, and it is the correct response when two components need the same thing and currently each hold their own copy, which is how two values get out of sync.",
          "The failure to watch for is **duplicated state**: the same fact stored in two places. If the list screen holds the expenses and the summary screen holds its own total, the total goes stale the moment an expense is added. Store the fact once and **derive** everything else — the total is computed from the list, not stored beside it.",
        ],
      },
      {
        heading: "User input done properly",
        body: [
          "A `TextInput` is a **controlled component**: its value comes from state and every change updates that state through `onChangeText`. This feels like extra work compared with reading a value on submit, and it is worth it, because the app always knows what the user has typed — which is what makes validation, character counts and disabled-until-valid buttons possible.",
          "Then the mobile-specific input details that decide whether a form is pleasant. Set the **keyboard type** — numeric for an amount, email for an email — because the wrong keyboard on a phone is a real obstacle, and a numeric field showing a full alphabet keyboard costs the user several taps. Set **`autoCapitalize`** and **`autoCorrect`** off for anything that is not prose, since autocorrect on a name or a code is actively harmful.",
          "And **validate on the phone's terms**. A user on a small screen with a keyboard covering half the display cannot easily see an error message at the top of the form, so put feedback next to the field, keep it short, and disable the submit button until the input is valid rather than letting them submit and fail. Every extra tap on a phone costs more than it does on a desktop.",
        ],
      },
      {
        heading: "Lists: why FlatList and not a map",
        body: [
          "The web habit is to map over an array and render everything. On mobile that is a genuine performance problem, because rendering five hundred rows builds five hundred sets of components whether the user can see them or not. **`FlatList` renders only what is near the screen** and recycles the rest, so a list of five items and a list of five thousand cost roughly the same.",
          "This is not a premature optimisation — it is the standard way to render a list on mobile, and the difference on a low-end Android device is between an app that scrolls smoothly and one that stutters and eventually runs out of memory. **Use FlatList for any list whose length you do not control**, which in practice means almost every list.",
          "Then the detail that causes subtle bugs: **keys**. Each item needs a **stable, unique key** derived from the data — the expense's id — not its position in the array. Using the array index works until you delete or reorder an item, at which point every subsequent item's key shifts and the list can display the wrong data in the wrong row, or keep the state of a row that has moved. It is one of the more confusing bugs in mobile development and it is entirely preventable.",
        ],
      },
      {
        heading: "Modelling the data before storing it",
        body: [
          "Before persisting anything, decide the **shape**. For the expense tracker each record needs a unique **id**, the **amount** as a number, a **category**, an **ISO date string**, and an optional note. Note two decisions in there: the amount is a **number, not a string**, because you will total it; and the date is an **ISO string**, because dates serialise predictably while date objects do not survive storage unchanged.",
          "The id matters more than it looks. It is what navigation params reference, what list keys use, and what you will later send to a server. Generate something genuinely unique rather than using a counter, because a counter restarts and produces collisions when records are added from more than one place.",
          "Then think about **money carefully**, because it is where financial apps go wrong. Floating-point numbers cannot represent all decimals exactly, so adding 0.1 and 0.2 does not give exactly 0.3. The standard fix is to **store money in kobo as integers** — ₦4,500.00 becomes 450000 — and divide by 100 only when displaying. It feels fussy until the first time a total is one kobo out on a client's report.",
        ],
      },
      {
        heading: "Persisting with local storage",
        body: [
          "Without persistence the app forgets everything on close, which makes it a demo rather than a product. **`AsyncStorage`** is the simple key-value store on the device: you write a string under a key and read it back later. Since it holds strings, you **serialise with `JSON.stringify`** on the way in and **parse on the way out**.",
          "The **async** part is not decoration — reading from storage takes time, so the API is promise-based and you must **await** it. The practical consequence is that **the app starts before the data has loaded**, so there is a moment when the list is empty and you do not yet know whether it is genuinely empty or still loading. Handle that state explicitly, because flashing an empty state and then filling it looks like a bug.",
          "Then the cautions. **Local storage is not a database**: it holds small amounts of data well and becomes slow with large collections, so it suits the expense tracker and not a catalogue of thousands of items. **Wrap parsing in a try block**, because corrupt or partial data will throw and crash the app at launch — the worst possible moment. And remember it is **per device and not synced**, which is exactly the gap the next session's API work fills.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor makes the expense tracker remember things — placing state at the right level, wiring the form as controlled input with the right keyboard, replacing a mapped list with FlatList and showing what the index-as-key bug looks like, modelling the record with money in kobo, then persisting to AsyncStorage and handling the loading moment.",
      steps: [
        {
          step: "Add an expense and watch it disappear on reload",
          detail:
            "Explain that state held only in memory is lost when the app closes, which makes this a demo rather than a product.",
        },
        {
          step: "Find where the expense list state should live",
          detail:
            "List screen and summary screen both need it. Explain the rule: the lowest common ancestor, high enough to reach and no higher.",
        },
        {
          step: "Show duplicated state causing a stale total",
          detail:
            "Store a total beside the list and add an expense. Explain that the fix is to store the fact once and derive everything else.",
        },
        {
          step: "Derive the total from the list instead",
          detail:
            "Explain that a computed value cannot go stale, while a stored copy always eventually does.",
        },
        {
          step: "Wire the amount field as controlled input",
          detail:
            "Value from state, onChangeText updating it. Explain that the app always knowing the value is what enables validation and a disabled-until-valid button.",
        },
        {
          step: "Set the keyboard type to numeric",
          detail:
            "Show the alphabet keyboard it replaces. Explain that the wrong keyboard on a phone costs several taps and is a real obstacle.",
        },
        {
          step: "Turn autoCorrect off on the note field",
          detail:
            "Show it mangling a name. Explain that autocorrect is actively harmful on anything that is not prose.",
        },
        {
          step: "Put validation feedback beside the field",
          detail:
            "Explain that with a keyboard covering half the screen, an error at the top of the form is invisible to the user.",
        },
        {
          step: "Render the list by mapping over the array",
          detail:
            "Add five hundred items. Explain that this builds five hundred component sets whether they are visible or not.",
        },
        {
          step: "Replace it with FlatList",
          detail:
            "Compare scrolling on a low-end device. Explain that FlatList renders only what is near the screen and recycles the rest.",
        },
        {
          step: "Use the array index as the key",
          detail:
            "Explain that it works until you delete or reorder, and that this is one of the more confusing mobile bugs.",
        },
        {
          step: "Delete an item and show the wrong row affected",
          detail:
            "Explain that every subsequent key shifts, so rows can display the wrong data or keep the state of a row that moved.",
        },
        {
          step: "Switch the key to the record id",
          detail:
            "Delete again and confirm the correct row goes. Explain that a stable unique key is entirely preventable effort.",
        },
        {
          step: "Model the record shape",
          detail:
            "Id, amount as a number, category, ISO date, optional note. Explain that dates serialise predictably while date objects do not survive storage.",
        },
        {
          step: "Show the floating-point money problem",
          detail:
            "Add 0.1 and 0.2. Explain that storing money in kobo as integers and dividing only on display is the standard fix.",
        },
        {
          step: "Write the list to AsyncStorage",
          detail:
            "JSON.stringify on the way in. Explain that storage holds strings, so serialisation is not optional.",
        },
        {
          step: "Read it back on app start",
          detail:
            "Await the read and parse. Explain that the async nature means the app starts before the data has loaded.",
        },
        {
          step: "Show the empty-state flash",
          detail:
            "Explain that you cannot yet tell genuinely empty from still loading, so that state must be handled explicitly or it looks like a bug.",
        },
        {
          step: "Corrupt the stored value and relaunch",
          detail:
            "Show the crash at launch. Explain that parsing must be wrapped in a try block, because crashing at startup is the worst possible moment.",
        },
        {
          step: "Close and reopen the app",
          detail:
            "Confirm the expenses are still there. Explain that this is the moment the app stops being a demo.",
        },
      ],
    },
    practice: {
      title: "Make the app remember",
      brief:
        "You place state correctly so nothing is duplicated, wire the form as controlled input with the right keyboard and inline validation, render the list with FlatList and stable keys, model the record with money stored as integers, and persist everything to local storage with the loading and corrupt-data cases handled.",
      steps: [
        "Add an expense and confirm what happens on reload before you change anything.",
        "List every screen that needs the expense data.",
        "Place that state at the lowest common ancestor and no higher.",
        "Remove any duplicated state, deriving totals instead of storing them.",
        "Wire every form field as controlled input with value and onChangeText.",
        "Set the keyboard type correctly for each field, numeric for the amount.",
        "Turn autoCorrect and autoCapitalize off where the field is not prose.",
        "Place validation feedback beside each field rather than at the top of the form.",
        "Disable the submit button until the input is valid.",
        "Generate a large number of items to test list performance.",
        "Replace any mapped list with FlatList and compare scrolling.",
        "Use the record id as the key, not the array index.",
        "Delete an item and confirm the correct row is removed.",
        "Define the record shape: id, amount as a number, category, ISO date, note.",
        "Store the amount as an integer in kobo and divide only when displaying.",
        "Write the list to AsyncStorage with JSON.stringify.",
        "Read it back on app start, awaiting the read and parsing the result.",
        "Handle the loading state distinctly from the empty state.",
        "Wrap parsing in a try block and confirm the app survives corrupt data.",
        "Close and reopen the app and confirm the data persists.",
        "Test on a physical phone and note any difference in list performance.",
      ],
      standard:
        "An app that persists its data: state placed at the lowest common ancestor of the screens needing it and no higher, duplicated state removed with totals derived rather than stored; every form field wired as controlled input with the correct keyboard type per field, autoCorrect and autoCapitalize off where the field is not prose, validation feedback beside each field, and submit disabled until valid; a large item set generated and any mapped list replaced with FlatList with the scroll difference compared, record ids used as keys rather than array indexes, and deletion confirmed to remove the correct row; the record shape defined with id, amount as a number, category, ISO date string and optional note, the amount stored as an integer in kobo and divided only on display; the list written to AsyncStorage with JSON.stringify and read back on start with the read awaited and parsed; loading handled distinctly from empty; parsing wrapped in a try block with the app confirmed to survive corrupt data; persistence confirmed by closing and reopening; and list performance noted on a physical phone.",
    },
    pitfalls: [
      {
        problem: "Your app forgets everything on close",
        fix: "Persist to local storage. State in memory is lost when the app closes, which is the difference between a demo and a product.",
      },
      {
        problem: "You store a total beside the list",
        fix: "Derive it. Duplicated state always goes stale eventually, while a computed value cannot.",
      },
      {
        problem: "State lives at the root of the app",
        fix: "Put it at the lowest common ancestor of what needs it. Root-level state makes every screen re-render whenever anything changes.",
      },
      {
        problem: "You render a long list by mapping over the array",
        fix: "Use FlatList. Mapping builds every row whether it is visible or not, and on a low-end device that means stutter and eventually running out of memory.",
      },
      {
        problem: "You use the array index as the list key",
        fix: "Use the record id. Index keys shift on delete or reorder, so rows can show the wrong data or keep the state of a row that moved.",
      },
      {
        problem: "You store money as a float",
        fix: "Store kobo as integers and divide on display. Floating point cannot represent all decimals exactly, and a total one kobo out on a client's report is a real problem.",
      },
      {
        problem: "Your app flashes an empty list on launch",
        fix: "Handle loading distinctly from empty. Reading storage is async, so there is a real moment when you do not yet know which one you are in.",
      },
      {
        problem: "You parse stored data without a try block",
        fix: "Wrap it. Corrupt or partial data throws, and crashing at launch is the worst possible moment for your app to fail.",
      },
    ],
    expertNotes: [
      "Store each fact once and derive everything else. A total stored beside a list goes stale the moment an expense is added, while a computed total cannot — and duplicated state is the commonest source of inexplicable wrong numbers.",
      "Use FlatList for any list whose length you do not control. Mapping over an array builds every row whether it is visible or not, and on the low-end Android devices most users have that means stutter and eventually memory failure.",
      "Key list items by record id, never by array index. Index keys shift when you delete or reorder, producing one of the more confusing bugs in mobile development, and the fix costs nothing.",
      "Store money as integers in kobo and divide only on display. Floating point cannot represent all decimals exactly, and it feels fussy right up until a client's total is one kobo out.",
    ],
    vocabulary: [
      { term: "State", meaning: "Data the app holds and changes over time. Belongs at the lowest common ancestor of what needs it." },
      { term: "Lifting state", meaning: "Moving state up so two components share it. The correct fix when two copies get out of sync." },
      { term: "Derived value", meaning: "Computed from stored data rather than stored beside it. Cannot go stale, unlike a copy." },
      { term: "Controlled input", meaning: "A TextInput whose value comes from state and updates it on every change. What enables validation." },
      { term: "FlatList", meaning: "Renders only rows near the screen and recycles the rest. The standard way to render a list on mobile." },
      { term: "Key", meaning: "A stable unique identifier per list item. Must come from the data, not the array position." },
      { term: "AsyncStorage", meaning: "A key-value store on the device holding strings. Serialise in, parse out, and it is not a database." },
      { term: "Integer kobo", meaning: "Money stored as whole kobo rather than decimal naira. Avoids floating-point errors in totals." },
    ],
    homework: [
      {
        task: "Persist one list to AsyncStorage",
        detail:
          "Serialise on write, await and parse on read, and wrap the parse in a try block. Close and reopen the app to confirm it survived.",
      },
      {
        task: "Convert a mapped list to FlatList",
        detail:
          "Generate a few hundred items first so the difference is visible. Compare scrolling on a physical phone, not only in the simulator.",
      },
      {
        task: "Prove the index-key bug to yourself",
        detail:
          "Use the array index as the key, delete an item from the middle, and watch what happens. Then switch to an id and confirm it is fixed.",
      },
      {
        task: "Store one amount in kobo",
        detail:
          "Convert on input, store as an integer, divide only on display. Then add several awkward amounts and confirm the total is exact.",
      },
    ],
    rubric: [
      {
        criterion: "State placement",
        passing: "State works.",
        excellent: "Placed at the lowest common ancestor and no higher, duplicated state removed, and totals derived from the list rather than stored beside it.",
      },
      {
        criterion: "Input handling",
        passing: "Form accepts input.",
        excellent: "Every field controlled with the correct keyboard type, autocorrect off where the field is not prose, feedback beside each field, and submit disabled until valid.",
      },
      {
        criterion: "Lists",
        passing: "Displays a list.",
        excellent: "FlatList used for the item list, performance compared with a mapped list on a physical phone, and record ids used as keys with deletion confirmed to affect the correct row.",
      },
      {
        criterion: "Data modelling",
        passing: "Stores records.",
        excellent: "A defined shape with id, numeric amount, category, ISO date and optional note, and money stored as integer kobo with division only on display.",
      },
      {
        criterion: "Persistence",
        passing: "Data survives a reload.",
        excellent: "AsyncStorage used with serialisation, an awaited read, loading handled distinctly from empty, parsing wrapped in a try block, and survival of corrupt data confirmed.",
      },
    ],
    faqs: [
      {
        q: "Where should my state live?",
        a: "At the lowest common ancestor of everything that needs it — high enough that all consumers can reach it, no higher. State at the app root makes every screen re-render when anything changes, and state duplicated in two components will always eventually disagree.",
      },
      {
        q: "Why not just map over the array to render a list?",
        a: "Because it builds every row whether it is visible or not. Five hundred rows means five hundred sets of components, which on a low-end Android device means stutter and eventually running out of memory. FlatList renders only what is near the screen.",
      },
      {
        q: "Does the list key really matter?",
        a: "Yes, and it must be stable. Using the array index works until you delete or reorder, at which point every subsequent key shifts and rows can display the wrong data or keep the state of a row that moved. Use the record's id.",
      },
      {
        q: "Should I store money as a decimal?",
        a: "No — store kobo as integers and divide by 100 only when displaying. Floating-point numbers cannot represent all decimals exactly, so adding 0.1 and 0.2 does not give exactly 0.3, and a total one kobo out on a client's report is a real problem.",
      },
      {
        q: "Is AsyncStorage enough, or do I need a database?",
        a: "For an expense tracker it is enough. AsyncStorage is a key-value store holding strings, good for small collections and slow for large ones, and it is per device rather than synced. If you outgrow it or need sync, that is what the API work in the next session is for.",
      },
    ],
  },

  "working-with-apis": {
    summary:
      "Real apps talk to servers, and phones have worse connections than laptops. This session covers fetching data properly, implementing the loading and error states designed in week one, behaving sensibly offline, syncing queued writes when the connection returns, and keeping the app usable on the low-end devices and metered data most people actually have.",
    objectives: [
      "Fetch data with async and await and handle the result properly",
      "Implement loading, error and retry states for real",
      "Detect connectivity and behave sensibly without it",
      "Queue writes offline and sync them when the connection returns",
      "Avoid blocking the interface with heavy work",
      "Respect the user's data budget",
    ],
    blocks: [
      {
        heading: "Fetching, and the three outcomes",
        body: [
          "Fetching on mobile is the same `fetch` you know, wrapped in `async` and `await`. What differs is that **the network is unreliable**, so the code has to handle three outcomes every time rather than one: success, a request that fails, and a request that succeeds but returns an error status. Handling only the first is why so many apps show a permanently blank screen when something goes wrong.",
          "The specific detail that catches people is that **`fetch` does not reject on a 404 or a 500** — it resolves, because the request completed. You must check the response's **`ok`** property yourself, or your code will try to parse an error page as data and fail in a confusing way several lines later.",
          "Then the mobile reality: on a congested network a request can take ten seconds, and the user will have navigated away before it returns. **Check that the screen is still mounted before updating state**, because setting state on an unmounted component is a warning at best and a crash at worst, and it is a common source of strange behaviour when moving quickly between screens.",
        ],
      },
      {
        heading: "Loading and error states, for real",
        body: [
          "Session two designed these states; now they have to exist in code. **Loading** should be a **skeleton** — placeholder shapes matching the real layout — rather than a spinner where possible, because a skeleton shows the shape of what is coming and feels faster even when it is not. On a slow connection this state is what the user sees most of the time, so it is not a detail.",
          "**Error** must say what happened and offer a way out. **Could not load your expenses** with a **Retry** button is useful; a blank screen is not, and a raw error message dumped on the user is worse. Distinguish between **no connection**, **server error** and **not found**, because the user's next action differs: wait, retry, or go back.",
          "Then the discipline that separates finished work from a demo: **never leave the user stuck**. Every failure path must end in something they can do — retry, go back, use the cached data. An app that fails into a dead end on a bad network is an app that gets uninstalled, and on mobile networks a bad network is not an edge case but a normal Tuesday.",
        ],
      },
      {
        heading: "Offline behaviour",
        body: [
          "This is where a mobile app earns its existence over a website, and it is the feature most often skipped. The starting point is that **your app must work with no connection at all**, because the alternative is an app that shows an error every time the user enters a lift, a basement or an area with poor coverage.",
          "The pattern is straightforward once decided: **read from local storage first and show it immediately**, then refresh from the server in the background when a connection exists. The user sees their data instantly rather than a spinner, and the app is usable regardless of coverage. This is why the previous session's local storage work was not a stepping stone — it is half of the offline strategy.",
          "Then **writes**, which are harder. An expense added offline cannot be sent, so it must be **queued**: saved locally with a flag marking it unsynced, then sent when connectivity returns. The queue needs to handle **conflicts** — what if the same record changed on the server? — and for a first app the honest answer is last-write-wins with a timestamp, documented, rather than a sophisticated merge you will not finish.",
        ],
      },
      {
        heading: "Performance on low-end devices",
        body: [
          "The average phone in use is not the phone you develop on. Low-end Android devices have slow processors, little memory and slow storage, and they are the majority of the market, so **an app that is only smooth on a good phone is an app most people experience as slow**.",
          "The main causes are predictable. **Re-rendering too much** — state placed too high, so unrelated screens re-render on every keystroke. **Heavy work on the JavaScript thread**, which blocks the interface entirely; anything expensive belongs off the main path or split into chunks. **Large images** loaded at full resolution, which consume memory and data at once; load the size you display. And **long lists rendered naively**, which the previous session's FlatList already addressed.",
          "The habit that catches all of it is **testing on the worst device you can find**, not the best. An older, cheaper Android phone is the most useful piece of testing equipment you can own, because everything that is going to be slow is slow on it, and visibly so.",
        ],
      },
      {
        heading: "Respecting the data budget",
        body: [
          "Mobile data costs money, and for many users it is metered and carefully watched. An app that downloads more than it needs is not merely inefficient — it spends the user's money without asking, which is a real cost and a real reason to uninstall.",
          "The practical rules: **request only what you display**, using query parameters to limit and paginate rather than fetching an entire collection. **Compress and size images** before serving them, since images dominate data use in almost every app. **Cache responses** so repeat views do not re-download, and **do not poll in a tight loop** for updates, which quietly burns data in the background.",
          "Then make the trade-offs visible where they matter. A setting to **sync only on Wi-Fi**, or to load lower-resolution images on mobile data, costs little to build and is genuinely appreciated by users watching their balance. This is the kind of consideration that separates an app built for a real market from one built for a demo.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor connects the expense tracker to a small API and then attacks it — throttling the network, switching to airplane mode mid-request, returning a 500, and running the app on a low-end device — implementing skeletons, real error states with retry, an offline queue that syncs on reconnection, and the data-saving choices that follow.",
      steps: [
        {
          step: "Fetch the expense list from the API",
          detail:
            "Async and await. Explain that the code must handle three outcomes: success, a failed request, and a request that returns an error status.",
        },
        {
          step: "Return a 404 from the server and watch it parse",
          detail:
            "Show the confusing failure. Explain that fetch does not reject on 404 or 500, so you must check the ok property yourself.",
        },
        {
          step: "Add the ok check",
          detail:
            "Explain that checking it turns a confusing failure several lines later into a clear one at the right place.",
        },
        {
          step: "Navigate away while a request is in flight",
          detail:
            "Show the warning. Explain that setting state on an unmounted screen is a common source of strange behaviour when moving quickly.",
        },
        {
          step: "Replace the spinner with a skeleton",
          detail:
            "Explain that a skeleton shows the shape of what is coming and feels faster, and on a slow connection it is what the user sees most of the time.",
        },
        {
          step: "Throttle the network and watch the loading state",
          detail:
            "Explain that on a congested network a request can take ten seconds, so this state is not a detail.",
        },
        {
          step: "Return a 500 and show the error state",
          detail:
            "Message plus Retry. Explain that a blank screen is not an error state and a raw error dump is worse than either.",
        },
        {
          step: "Distinguish no connection from server error",
          detail:
            "Explain that the user's next action differs — wait, retry, or go back — so the message must differ too.",
        },
        {
          step: "Put the app in airplane mode",
          detail:
            "Show the dead end. Explain that an app failing into a dead end on a bad network gets uninstalled.",
        },
        {
          step: "Read from local storage first and show it immediately",
          detail:
            "Explain that this is why the last session's storage work was not a stepping stone — it is half the offline strategy.",
        },
        {
          step: "Refresh in the background when a connection exists",
          detail:
            "Explain that the user sees data instantly rather than a spinner, and the app is usable regardless of coverage.",
        },
        {
          step: "Add an expense in airplane mode",
          detail:
            "Explain that a write that cannot be sent must be queued rather than lost or blocked.",
        },
        {
          step: "Save it locally with an unsynced flag",
          detail:
            "Explain that the flag is what tells the app what still needs sending.",
        },
        {
          step: "Restore the connection and sync the queue",
          detail:
            "Explain that the queue drains automatically and the flag clears, and that this is the feature that justifies an app over a website.",
        },
        {
          step: "Discuss the conflict case",
          detail:
            "Explain that last-write-wins with a timestamp, documented, is the honest first answer rather than a merge you will not finish.",
        },
        {
          step: "Run the app on a low-end device",
          detail:
            "Compare with the development phone. Explain that an app only smooth on a good phone is experienced as slow by most of the market.",
        },
        {
          step: "Find a heavy operation blocking the interface",
          detail:
            "Show the frozen tap. Explain that the JavaScript thread blocks the interface entirely, so expensive work must be split or moved.",
        },
        {
          step: "Load a full-resolution image and measure the data",
          detail:
            "Explain that images dominate data use, so load the size you display and compress before serving.",
        },
        {
          step: "Add pagination to the list request",
          detail:
            "Explain that requesting only what you display respects a metered data budget, which is real money to the user.",
        },
        {
          step: "Add a sync-only-on-Wi-Fi setting",
          detail:
            "Explain that it costs little to build and is genuinely appreciated by users watching their balance.",
        },
      ],
    },
    practice: {
      title: "Make the app work on a bad network and a cheap phone",
      brief:
        "You connect the expense tracker to an API and implement the three outcomes properly, build real loading and error states with retry, make the app usable in airplane mode with a queue that syncs on reconnection, and verify performance and data use on the worst device available.",
      steps: [
        "Fetch the expense list with async and await.",
        "Check the response's ok property and handle a failed request separately.",
        "Return a 404 and a 500 from the API and confirm each is handled.",
        "Navigate away during a request and confirm no state is set on an unmounted screen.",
        "Replace the spinner with a skeleton matching the real layout.",
        "Throttle the network and confirm the loading state holds sensibly for ten seconds.",
        "Write an error state naming the failure and offering Retry.",
        "Distinguish no connection from server error in the message.",
        "Confirm every failure path ends in an action the user can take.",
        "Put the device in airplane mode and confirm the app still shows data.",
        "Read from local storage first, then refresh in the background when online.",
        "Add an expense in airplane mode and confirm it is queued, not lost.",
        "Flag queued records as unsynced.",
        "Restore the connection and confirm the queue syncs and the flags clear.",
        "Document your conflict strategy, even if it is last-write-wins.",
        "Run the app on the oldest, cheapest Android phone available.",
        "Find any operation that blocks the interface and split or defer it.",
        "Measure the data used by a full list load and reduce it with pagination.",
        "Serve images at display size rather than full resolution.",
        "Add a sync-only-on-Wi-Fi option and confirm it works.",
        "Write one paragraph on how the app behaves with no connection at all.",
      ],
      standard:
        "An app that works on a bad network and a cheap phone: the expense list fetched with async and await, the response ok property checked, a failed request handled separately, and 404 and 500 responses each confirmed handled; no state set on an unmounted screen when navigating away mid-request; a skeleton matching the real layout replacing the spinner and confirmed to hold sensibly over a ten-second throttled load; an error state naming the failure and offering Retry, with no connection distinguished from server error, and every failure path confirmed to end in an action the user can take; the device put in airplane mode with the app still showing data read from local storage first and refreshed in the background when online; an expense added offline confirmed queued rather than lost, flagged unsynced, and the queue confirmed to sync with flags cleared on reconnection; the conflict strategy documented even if last-write-wins; the app run on the oldest, cheapest Android phone available with any interface-blocking operation found and split or deferred; data use for a full list load measured and reduced with pagination; images served at display size; a sync-only-on-Wi-Fi option added and confirmed working; and one paragraph written on how the app behaves with no connection at all.",
    },
    pitfalls: [
      {
        problem: "You only handle the success case",
        fix: "Handle success, failure and error status every time. Handling only success is why so many apps show a permanently blank screen when something goes wrong.",
      },
      {
        problem: "You assume fetch rejects on a 404",
        fix: "Check the response ok property. Fetch resolves because the request completed, so an error page gets parsed as data and fails confusingly several lines later.",
      },
      {
        problem: "You set state after the user navigated away",
        fix: "Check the screen is still mounted. Setting state on an unmounted component is a common source of strange behaviour when moving quickly between screens.",
      },
      {
        problem: "Your error state is a blank screen",
        fix: "Say what happened and offer Retry, distinguishing no connection from a server error. Every failure path must end in something the user can do.",
      },
      {
        problem: "Your app is unusable offline",
        fix: "Read from local storage first and refresh in the background. An app that errors in a lift or a basement gets uninstalled, and poor coverage is normal rather than exceptional.",
      },
      {
        problem: "Writes made offline are lost",
        fix: "Queue them locally with an unsynced flag and send them when connectivity returns. Document the conflict strategy rather than pretending the case does not arise.",
      },
      {
        problem: "You test only on a good phone",
        fix: "Test on the cheapest, oldest Android you can find. Low-end devices are the majority of the market, so an app only smooth on a good phone is slow for most users.",
      },
      {
        problem: "You ignore the user's data budget",
        fix: "Paginate, compress images, cache responses and offer sync-only-on-Wi-Fi. Mobile data is metered and watched, and an app that overspends it gets uninstalled.",
      },
    ],
    expertNotes: [
      "Handle three outcomes on every request: success, failure, and a completed request with an error status. Fetch does not reject on 404 or 500, so checking the ok property is what turns a confusing failure several lines later into a clear one.",
      "Read from local storage first and refresh in the background. It makes the app instant and usable in a lift or a basement, and it is the feature that most clearly justifies building an app rather than a website.",
      "Queue offline writes with an unsynced flag and drain the queue on reconnection. Document the conflict strategy honestly — last-write-wins with a timestamp is a legitimate first answer, while an unfinished merge is not.",
      "Test on the cheapest, oldest phone you can find and watch the data use. Low-end devices are the majority of the market and mobile data is metered, so both are real product constraints rather than niceties.",
    ],
    vocabulary: [
      { term: "Response ok", meaning: "The property telling you whether a completed request succeeded. Fetch resolves on 404 and 500, so you must check it." },
      { term: "Skeleton screen", meaning: "Placeholder shapes matching the real layout. Feels faster than a spinner and is what users see most on slow networks." },
      { term: "Retry", meaning: "The action an error state must offer. Every failure path should end in something the user can do." },
      { term: "Offline-first", meaning: "Read local data immediately, refresh in the background. What makes an app usable in a lift or a basement." },
      { term: "Write queue", meaning: "Changes made offline, stored locally with an unsynced flag and sent when connectivity returns." },
      { term: "Conflict resolution", meaning: "What happens when a queued change disagrees with the server. Last-write-wins with a timestamp is a legitimate first answer." },
      { term: "JS thread blocking", meaning: "Heavy work freezing the interface. Split or defer expensive operations, because the thread drives the UI." },
      { term: "Pagination", meaning: "Requesting only what you display. Respects a metered data budget, which is real money to the user." },
    ],
    homework: [
      {
        task: "Handle all three outcomes of one request",
        detail:
          "Force a success, a network failure and a 500. Confirm each produces a distinct, useful interface rather than a blank screen.",
      },
      {
        task: "Use your app in airplane mode",
        detail:
          "Confirm it still shows data from local storage and that a new record is queued rather than lost. Then reconnect and confirm it syncs.",
      },
      {
        task: "Throttle a request and watch the loading state",
        detail:
          "Hold it at ten seconds. Note whether a spinner or a skeleton feels better, and why.",
      },
      {
        task: "Measure one screen's data use",
        detail:
          "Load a full list and check the bytes. Then paginate it and measure again, and note what the difference would cost a user on metered data.",
      },
    ],
    rubric: [
      {
        criterion: "Fetching",
        passing: "Loads data from an API.",
        excellent: "Async and await used, the ok property checked, failure and error status handled separately, and no state set on an unmounted screen after navigating away.",
      },
      {
        criterion: "Loading and errors",
        passing: "Shows a spinner.",
        excellent: "A skeleton matching the real layout, an error state naming the failure with Retry, no connection distinguished from server error, and every failure path ending in a user action.",
      },
      {
        criterion: "Offline behaviour",
        passing: "Handles no connection.",
        excellent: "Local storage read first with background refresh, offline writes queued with an unsynced flag and confirmed to sync on reconnection, and the conflict strategy documented.",
      },
      {
        criterion: "Performance",
        passing: "App runs acceptably.",
        excellent: "Tested on the cheapest, oldest Android available, interface-blocking operations found and split or deferred, and FlatList used for the long list.",
      },
      {
        criterion: "Data economy",
        passing: "Loads data.",
        excellent: "Pagination added with data use measured before and after, images served at display size, responses cached, and a sync-only-on-Wi-Fi option provided.",
      },
    ],
    faqs: [
      {
        q: "Why does my app break on a 404 when I have a try block?",
        a: "Because fetch does not reject on HTTP error statuses — it resolves, since the request completed. You must check the response's ok property yourself, or your code parses an error page as data and fails confusingly several lines later.",
      },
      {
        q: "Is offline support really necessary for a first app?",
        a: "For a mobile app, yes. Poor coverage is normal rather than exceptional — lifts, basements, congested networks — and an app that errors in those moments gets uninstalled. Reading local data first is also what makes it feel instant, which is the main advantage over a website.",
      },
      {
        q: "How do I handle offline writes?",
        a: "Save them locally with a flag marking them unsynced, then send the queue when connectivity returns. For conflicts, last-write-wins with a timestamp is a legitimate first answer if you document it — an unfinished merge is worse than a simple rule.",
      },
      {
        q: "My app is smooth on my phone but slow for users. Why?",
        a: "You are developing on a good device. Low-end Android phones with slow processors and little memory are the majority of the market, so test on the cheapest, oldest phone you can find — everything that will be slow is visibly slow on it.",
      },
      {
        q: "Does data use really matter?",
        a: "Yes, because it is the user's money. Request only what you display with pagination, serve images at display size, cache responses, and offer a sync-only-on-Wi-Fi setting. An app that quietly overspends a metered balance gets uninstalled.",
      },
    ],
  },
};
