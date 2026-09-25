import type { SessionLecture } from "../types";

/**
 * Web Development — ₦30,000 · 6 weeks · 12 sessions.
 * Sessions 7 to 9. (1–3 in web-development.ts, 4–6 in -b.ts, 10–12 in -d.ts.)
 */
export const webDevelopmentLessonsC: Record<string, SessionLecture> = {
  "the-dom": {
    summary:
      "The DOM is the live structure of your page that JavaScript can read and change. This session covers selecting elements, changing content and styles, and wiring up event listeners — the bridge between a static page and an application.",
    objectives: [
      "Explain what the DOM is and how it relates to your HTML",
      "Select elements reliably with modern selectors",
      "Change content safely, understanding the HTML injection risk",
      "Change styles and classes without fighting the stylesheet",
      "Add and remove event listeners correctly",
      "Build an interface that updates itself from data",
    ],
    blocks: [
      {
        heading: "What the DOM is",
        body: [
          "Your HTML file is text. When the browser reads it, it builds a **live tree of objects in memory** representing that structure — the Document Object Model — and it is this tree, not the file, that JavaScript works with. Change the tree and the page changes; the file on disk is untouched.",
          "That distinction explains a great deal. Viewing the page source shows the **original file**, while the Elements panel in developer tools shows the **current DOM** — and after your JavaScript has run, they are different. When something appears on the page but is not in the source, this is why, and knowing where to look saves a lot of confusion.",
          "Then the practical consequence: **the DOM must exist before you can select from it**. A script that runs before the elements are parsed finds nothing, which is why `defer` matters. And the DOM is **live** — you can add, remove and rearrange elements at any time, which is what makes a page an application rather than a document.",
        ],
      },
      {
        heading: "Selecting elements",
        body: [
          "Two methods cover almost everything. **`querySelector`** takes any CSS selector and returns the **first** match — `document.querySelector('.card')`, `document.querySelector('#submit')`, `document.querySelector('nav a')`. **`querySelectorAll`** returns **every** match as a list. Because they take CSS selectors, everything you already know about CSS applies, and there is one less syntax to learn.",
          "The older methods still exist — `getElementById`, `getElementsByClassName` — and you will see them in older code. They work, but `querySelector` is more flexible and consistent, so there is no reason to prefer them in new code. The one difference worth knowing is that `querySelectorAll` returns a **static** list: it does not update when the page changes, which occasionally surprises people.",
          "Then the habit that prevents a whole class of bugs: **check what you got**. `querySelector` returns `null` when nothing matches, and the next line — `element.textContent = …` — then throws 'cannot set property of null'. That error means one thing: the selector did not match. Log the selector, look at the actual markup, and you will find a typo, a missing class, or a script running too early.",
        ],
      },
      {
        heading: "Changing content",
        body: [
          "**`textContent`** sets the text inside an element, treating everything as plain text. **`innerHTML`** parses what you give it **as HTML**, which is more powerful and considerably more dangerous. The difference matters enormously: `innerHTML` with data from a user will execute markup, and that is how **cross-site scripting** happens — the single most common serious web vulnerability.",
          "So the rule is simple and absolute: **use `textContent` for anything that came from a person**, and reserve `innerHTML` for markup you wrote yourself in the source file. A comment, a name, a search term — all of it goes in with `textContent`. If a user can type `<img src=x onerror=…>` into a field and it lands in `innerHTML`, it runs.",
          "Then the other properties you will need. **`value`** reads and writes what is in a form input — note that an input's value is not in `textContent`. **`setAttribute`** and the `dataset` API handle attributes and `data-*` values. And **`classList`** — `add`, `remove`, `toggle` — is how you change classes, which is almost always better than setting styles directly.",
        ],
      },
      {
        heading: "Changing styles",
        body: [
          "There are two ways to change appearance from JavaScript, and one of them is usually wrong. **`element.style.color = 'red'`** writes an **inline style**, which has very high specificity — it overrides your stylesheet and becomes difficult to undo later. Sprinkling inline styles through JavaScript produces a page whose appearance is scattered across two places and impossible to reason about.",
          "The better way is **`classList`**: define a class in your CSS — `.is-hidden { display: none; }` — and toggle it from JavaScript. `el.classList.toggle('is-hidden')` keeps the styling in the stylesheet where it belongs, keeps the JavaScript to a single concern, and makes the state inspectable in the DOM. This is the standard pattern and it scales; inline styles do not.",
          "Then **measure before you change**. Reading a property like `offsetHeight` or `getBoundingClientRect()` gives you the real rendered size, which is how you respond to layout rather than guessing. And remember that changing the DOM has a cost: making a hundred separate changes in a loop is far slower than building the markup once and inserting it, which matters when a page has a long list.",
        ],
      },
      {
        heading: "Event listeners",
        body: [
          "An event listener attaches a function to an element and an event type: `el.addEventListener('click', handler)`. The critical detail is that you pass the **function itself**, not the result of calling it — `handleClick`, never `handleClick()`. The parentheses run it immediately and pass its return value, so the listener never fires. Everyone makes this mistake once.",
          "The handler receives an **event object** with useful information: `event.target` is the element actually acted on, `event.preventDefault()` stops the browser's default behaviour (essential on forms and links), and `event.currentTarget` is the element the listener is attached to. Knowing the difference between target and currentTarget is what makes delegation work.",
          "Then **removal and delegation**. `removeEventListener` needs the **same function reference** you added, which means an anonymous function cannot be removed — so name your handlers if you will ever detach them. And **delegation** — one listener on a parent handling events from children via `event.target` — is how you deal with lists whose items are added and removed, because it does not care whether the item existed when the listener was attached.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor turns a static list into a live interface: selecting with querySelector, hitting the null error and diagnosing it, demonstrating the innerHTML injection risk and the textContent fix, toggling a class instead of writing inline styles, and wiring delegated listeners to items added at runtime.",
      steps: [
        {
          step: "Show source versus DOM",
          detail:
            "Open both the page source and the Elements panel after a script has run. Explain that the file is untouched and the DOM is what JavaScript changed.",
        },
        {
          step: "Select with querySelector",
          detail:
            "Use a class, an ID and a descendant selector. Explain that it takes any CSS selector, so existing CSS knowledge applies directly.",
        },
        {
          step: "Select all matches",
          detail:
            "Use querySelectorAll and iterate the result. Note that the list is static and does not update when the page changes.",
        },
        {
          step: "Produce the null error",
          detail:
            "Misspell a selector and set textContent on the result. Explain that 'cannot set property of null' always means the selector did not match.",
        },
        {
          step: "Diagnose the selector",
          detail:
            "Log the result, inspect the real markup, and find the mismatch. Explain the three usual causes: a typo, a missing class, or a script running too early.",
        },
        {
          step: "Set content with textContent",
          detail:
            "Write user-provided text into an element. Explain that everything is treated as plain text, which is exactly what you want.",
        },
        {
          step: "Demonstrate the innerHTML risk",
          detail:
            "Put the same input into innerHTML and show the markup executing. Explain that this is cross-site scripting, the most common serious web vulnerability.",
        },
        {
          step: "State the rule",
          detail:
            "textContent for anything from a person, innerHTML only for markup you wrote in the source file. Explain that this rule is absolute rather than a guideline.",
        },
        {
          step: "Read a form value",
          detail:
            "Use value on an input and show that textContent is empty there. Explain that input values live in a different property.",
        },
        {
          step: "Write an inline style, then undo it",
          detail:
            "Set style.display directly and try to override it from the stylesheet. Explain that inline styles have very high specificity and scatter appearance across two places.",
        },
        {
          step: "Toggle a class instead",
          detail:
            "Define .is-hidden in CSS and toggle it. Explain that this keeps styling in the stylesheet and makes the state inspectable in the DOM.",
        },
        {
          step: "Attach a listener correctly",
          detail:
            "Pass the function without parentheses, then show what the parenthesised version does. Explain that everyone makes this mistake once.",
        },
        {
          step: "Use the event object",
          detail:
            "Log event.target and event.currentTarget and contrast them. Explain that the difference is what makes delegation work.",
        },
        {
          step: "Delegate to runtime items",
          detail:
            "Attach one listener to the list, add new items, and click them. Explain that delegation does not care whether the item existed when the listener was attached.",
        },
      ],
    },
    practice: {
      title: "Build an interface that updates itself",
      brief:
        "You turn a static page into a live one: elements selected with querySelector and the null case handled, all user-supplied content written with textContent, appearance changed by toggling classes defined in CSS rather than inline styles, and listeners wired with delegation so items added at runtime respond — with the innerHTML injection risk demonstrated and avoided.",
      steps: [
        "Open the page source and the Elements panel side by side and note the difference.",
        "Select each element you need with querySelector using a CSS selector.",
        "Use querySelectorAll where you need every match, and iterate the result.",
        "Log each selection and confirm it is not null before using it.",
        "Handle the null case rather than letting it throw.",
        "Write every piece of user-supplied text with textContent.",
        "Demonstrate the same value through innerHTML and observe the markup executing.",
        "Read form values with the value property rather than textContent.",
        "Define state classes in CSS, such as .is-hidden and .is-active.",
        "Toggle those classes from JavaScript instead of writing inline styles.",
        "Confirm no element.style assignment appears in your code.",
        "Attach listeners passing the function itself, without parentheses.",
        "Use event.target to identify which child was acted on.",
        "Attach one delegated listener to the list parent rather than one per item.",
        "Add an item at runtime and confirm it responds to clicks.",
        "Name any handler you may need to remove later.",
      ],
      standard:
        "A page where every selection uses querySelector or querySelectorAll with the null case logged and handled rather than allowed to throw, all user-supplied text written with textContent and the innerHTML injection demonstrated and avoided, form values read with the value property, state expressed as classes defined in CSS and toggled with classList with no element.style assignment anywhere, listeners attached without parentheses, event.target used to identify the acted-on child, one delegated listener on the list parent proven to handle items added at runtime, and any removable handler given a name.",
    },
    pitfalls: [
      {
        problem: "You get 'cannot set property of null'",
        fix: "The selector did not match. Log it, inspect the actual markup, and check for a typo, a missing class, or a script running before the element exists. This error always means the same thing.",
      },
      {
        problem: "You put user input into innerHTML",
        fix: "Use textContent. innerHTML parses its input as markup, so anything a person typed can execute — that is cross-site scripting, the most common serious web vulnerability.",
      },
      {
        problem: "You look for a form value in textContent",
        fix: "Use the value property. Input values do not live in textContent, which will be empty however much the user typed.",
      },
      {
        problem: "You set styles directly from JavaScript",
        fix: "Toggle a class defined in your CSS. Inline styles have very high specificity, override your stylesheet, and scatter the page's appearance across two places.",
      },
      {
        problem: "Your listener never fires",
        fix: "You passed handleClick() instead of handleClick. The parentheses run the function immediately and pass its return value, so nothing is registered as a listener.",
      },
      {
        problem: "You cannot remove a listener",
        fix: "removeEventListener needs the same function reference you added, so an anonymous function cannot be removed. Name your handlers if you will ever detach them.",
      },
      {
        problem: "Clicks do not work on items added later",
        fix: "Use delegation: one listener on the parent, with event.target identifying the child. Per-item listeners only cover elements that existed when they were attached.",
      },
      {
        problem: "You update the DOM in a long loop",
        fix: "Build the markup once and insert it in a single operation. A hundred separate DOM changes are far slower than one, which is noticeable on a long list.",
      },
    ],
    expertNotes: [
      "Use textContent for anything a person typed, without exception. innerHTML parses its input as markup, so user-supplied data placed there can execute — that is cross-site scripting, and it is the most common serious vulnerability on the web.",
      "Toggle classes defined in your CSS rather than writing inline styles from JavaScript. Inline styles have very high specificity, override your stylesheet, and scatter the page's appearance across two places that are hard to reason about together.",
      "Pass the handler without parentheses to addEventListener. Writing handleClick() runs it immediately and registers nothing, and this single mistake accounts for a large share of 'my listener does not work' problems.",
      "Use event delegation for any list whose items change. One listener on the parent with event.target identifying the child handles items added after the page loaded, with no re-attaching and no leak.",
    ],
    vocabulary: [
      {
        term: "DOM",
        meaning:
          "The live tree of objects the browser builds from your HTML. JavaScript changes this, not the file.",
      },
      {
        term: "querySelector",
        meaning:
          "Returns the first element matching a CSS selector, or null. The standard way to select.",
      },
      {
        term: "textContent",
        meaning: "Sets text as plain text. The safe choice for anything user-supplied.",
      },
      {
        term: "innerHTML",
        meaning: "Parses its input as HTML. Powerful and dangerous with untrusted data.",
      },
      {
        term: "Cross-site scripting",
        meaning: "Injecting markup that executes. Caused by putting user input into innerHTML.",
      },
      {
        term: "classList",
        meaning:
          "add, remove and toggle for classes. Keeps styling in the stylesheet rather than in JavaScript.",
      },
      {
        term: "Inline style",
        meaning:
          "A style written on the element. Very high specificity and hard to override later.",
      },
      {
        term: "event.target",
        meaning:
          "The element actually acted on, as opposed to the element the listener is attached to. What makes delegation work.",
      },
    ],
    homework: [
      {
        task: "Diagnose a null selection",
        detail:
          "Deliberately misspell a selector, trigger the error, then log the result and inspect the markup to find the mismatch. Do it once deliberately and the error will never puzzle you again.",
      },
      {
        task: "Prove the innerHTML risk to yourself",
        detail:
          "Type a piece of markup into a field and write it to the page with innerHTML, then with textContent. Observe the difference, and never use innerHTML with user data again.",
      },
      {
        task: "Replace your inline styles with classes",
        detail:
          "Find every element.style assignment in your code and replace it with a class toggled from CSS. Note how much easier the page becomes to reason about.",
      },
      {
        task: "Build a delegated list",
        detail:
          "One listener on the parent using event.target, then add and remove items at runtime and confirm clicks still work throughout.",
      },
    ],
    rubric: [
      {
        criterion: "Selection",
        passing: "Finds elements.",
        excellent:
          "querySelector and querySelectorAll used throughout, every result logged and the null case handled rather than allowed to throw.",
      },
      {
        criterion: "Content safety",
        passing: "Displays text.",
        excellent:
          "textContent used for all user-supplied data, the innerHTML injection demonstrated and understood, and form values read with the value property.",
      },
      {
        criterion: "Styling approach",
        passing: "Changes appearance.",
        excellent:
          "State expressed as classes defined in CSS and toggled with classList, with no element.style assignment anywhere in the code.",
      },
      {
        criterion: "Events",
        passing: "Responds to clicks.",
        excellent:
          "Handlers passed without parentheses, event.target and event.currentTarget distinguished, and removable handlers given names.",
      },
      {
        criterion: "Dynamic content",
        passing: "Updates the page.",
        excellent:
          "One delegated listener proven to handle runtime-added items, and bulk DOM changes built once and inserted in a single operation.",
      },
    ],
    faqs: [
      {
        q: "What does 'cannot set property of null' mean?",
        a: "Your selector matched nothing, so querySelector returned null and the next line tried to use it. Log the selector, inspect the actual markup, and look for a typo, a missing class, or a script running before the element exists. It always means one of those three.",
      },
      {
        q: "When is innerHTML acceptable?",
        a: "Only for markup you wrote yourself in your source file. Never for anything that came from a user — a name, a comment, a search term — because innerHTML parses its input as HTML and will execute injected markup. That is cross-site scripting.",
      },
      {
        q: "Why is my JavaScript style not applying, or not undoing?",
        a: "Because element.style writes an inline style, which has very high specificity and overrides your stylesheet. Define a class in CSS and toggle it with classList instead — the styling stays in one place and the state is visible in the DOM.",
      },
      {
        q: "Why does my click listener never fire?",
        a: "You almost certainly wrote addEventListener('click', handleClick()) with parentheses, which runs the function immediately and registers its return value. Pass the function itself: addEventListener('click', handleClick).",
      },
      {
        q: "How do I handle clicks on a list that changes?",
        a: "Use event delegation. Attach one listener to the parent and use event.target to identify which child was clicked. It handles items added after the page loaded without re-attaching anything, and it does not leak listeners as items are removed.",
      },
    ],
  },

  "forms-validation-dynamic-ui": {
    summary:
      "Forms are where a website earns its keep, and validation is where most of them fail — either by accepting nonsense or by shouting at people unhelpfully. This session covers validation done properly, modals, dynamic content, and a project that brings it together.",
    objectives: [
      "Use built-in HTML validation before writing any JavaScript",
      "Write JavaScript validation that helps rather than blocks",
      "Give feedback that names the field and the fix",
      "Build modals that are accessible and closable",
      "Render content dynamically from data",
      "Build a working interactive form or calculator",
    ],
    blocks: [
      {
        heading: "Built-in validation first",
        body: [
          'Before writing a line of JavaScript, use what HTML gives you for free. The **`required`** attribute makes a field mandatory. **`type="email"`** checks for a plausible email address. **`minlength` and `maxlength`** bound the length, **`min` and `max`** bound numbers, and **`pattern`** accepts a regular expression for anything more specific. The browser then blocks submission and shows a message, in the user\'s own language, with no code from you.',
          "This is not a shortcut — it is the correct first layer. Built-in validation works with assistive technology, works without JavaScript, and is consistent with what people already know from every other form on the web. Writing custom validation instead of using these attributes means rebuilding something that already exists and doing it worse.",
          "Then know its limit: **client-side validation is for the user's convenience, not for security**. Anything a browser enforces can be bypassed by anyone who wants to bypass it, because it runs on their machine. Real validation must also happen on the server, wherever the data goes. Client-side validation makes the experience good; server-side validation makes the data safe. They are not alternatives.",
        ],
      },
      {
        heading: "JavaScript validation that helps",
        body: [
          "Custom validation exists for cases HTML cannot express — 'the two passwords must match', 'this date must be after that one', 'at least one of these must be filled'. The structure is a function that takes a value and **returns either nothing or a message**, called at the right moment, with the message displayed next to the field.",
          "**When to validate** matters more than the logic. Validating on every keystroke shouts at someone halfway through typing an email address — '@' is invalid until they finish. The pattern that works is to validate **on blur** (when they leave the field) and then **re-validate on input** once a field has been flagged, so the error clears the moment it is fixed. And **never validate on page load**, which greets people with a wall of red before they have typed anything.",
          "Then the **submit path**: prevent the default, validate everything, and if anything fails, **focus the first invalid field** so a keyboard or screen reader user is taken to it rather than left to find it. Announce the error count in a way assistive technology will read, using a live region, so the message is not only visual.",
        ],
      },
      {
        heading: "Feedback that helps",
        body: [
          "An error message has one job: **tell the person what to do**. 'Invalid input' fails completely. 'Enter an email address, like ada@example.com' succeeds. Name the field, say what is wrong, and give the shape of a correct answer where that is useful. This is a writing task as much as a technical one, and it is where most forms are genuinely poor.",
          "**Show it in the right place** — next to the field, not at the top of the page or in an alert box that has to be dismissed. Connect it with **`aria-describedby`** so it is announced with the input, and mark the field **`aria-invalid`** so its state is available to assistive technology rather than only indicated by colour.",
          "Then **do not rely on colour alone**. A red border means nothing to a colour-blind user and nothing to anyone who cannot see the screen. Pair it with text and an icon. And **clear the error the moment it is fixed** — a message that stays after the problem is solved teaches people to ignore your messages entirely.",
        ],
      },
      {
        heading: "Modals",
        body: [
          "A modal is an overlay that demands attention, and it is easy to build badly. The requirements: it must be **closable** by a visible button, by the **Escape** key, and by clicking the backdrop — because a dialog nobody can escape is a trap. Then **focus management**: move focus into the modal when it opens, keep it inside while it is open, and **return focus to the element that opened it** when it closes. Skip that and a keyboard user is left somewhere unrelated.",
          'The modern way to get most of this for free is the **`<dialog>` element**, which handles focus, Escape and the backdrop natively. Where you build one by hand, you need `role="dialog"`, `aria-modal="true"`, a labelled title, and focus trapping — real work, which is why the native element is the better starting point.',
          "Then the judgement call: **use modals sparingly**. They interrupt, and an interrupting interface is a worse one. For most confirmations a message in the page is enough; for most forms a page is better. A modal is right when the task genuinely must be finished or abandoned before anything else continues, and wrong almost everywhere else.",
        ],
      },
      {
        heading: "Dynamic content",
        body: [
          "Rendering a list from data — rather than writing each item by hand — is the step from a static page to an application. The pattern is always the same: **take the data, map it to markup, insert it once**. Building a string of HTML and assigning it in one operation is far faster than creating and appending a hundred elements individually.",
          "The critical rule is that **data-driven content must still be safe**. Interpolating user data into an HTML string and assigning it with `innerHTML` is exactly the cross-site scripting hole from the last session, only larger, because now every item in the list is an injection point. Either escape the values before interpolating, or build elements with `createElement` and set their content with `textContent`.",
          "Then **empty and error states**, which everyone forgets. What does the list show when there is no data? 'No items yet' is a design; a blank area is a bug the user cannot distinguish from a broken page. The same applies to loading — a brief 'Loading…' tells someone the page is working rather than stuck, which on a slow connection is most of the time.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor builds a working registration form: built-in HTML validation first, then JavaScript for the cases HTML cannot express, error messages rewritten from 'invalid input' into something useful, an accessible modal using the dialog element, and a list rendered from data with escaping, an empty state and a loading state.",
      steps: [
        {
          step: "Add built-in validation",
          detail:
            "Set required, type email, minlength and pattern, then submit an empty form. Explain that the browser handles this in the user's language with no code.",
        },
        {
          step: "State the security limit",
          detail:
            "Bypass the client validation and explain that anything the browser enforces can be circumvented. Explain that real validation must also happen server-side.",
        },
        {
          step: "Write a custom rule",
          detail:
            "Validate that two passwords match, returning a message or nothing. Explain that custom validation is for cases HTML cannot express.",
        },
        {
          step: "Validate on blur, not on keystroke",
          detail:
            "Show validation firing mid-email-address and shouting at the user. Switch to blur, then re-validate on input once flagged.",
        },
        {
          step: "Never validate on load",
          detail:
            "Show a page that opens with every field marked red. Explain that this greets people with failure before they have typed anything.",
        },
        {
          step: "Handle the submit path",
          detail:
            "Prevent default, validate all, and focus the first invalid field. Explain that focusing matters for keyboard and screen reader users.",
        },
        {
          step: "Rewrite an error message",
          detail:
            "Change 'Invalid input' to 'Enter an email address, like ada@example.com'. Explain that naming the field and giving the shape of a correct answer is the whole job.",
        },
        {
          step: "Connect the message properly",
          detail:
            "Use aria-describedby and aria-invalid. Explain that otherwise the message is only visual and its state is unavailable to assistive technology.",
        },
        {
          step: "Add a non-colour indicator",
          detail:
            "Pair the red border with text and an icon. Explain that colour alone is invisible to colour-blind users.",
        },
        {
          step: "Clear the error when fixed",
          detail:
            "Re-validate on input once flagged. Explain that a message that persists after the problem is solved teaches people to ignore all your messages.",
        },
        {
          step: "Build a modal with dialog",
          detail:
            "Use the native element and show Escape, the backdrop click and focus return working for free. Contrast with the hand-built version's requirements.",
        },
        {
          step: "Render a list from data",
          detail:
            "Map the data to markup and insert it once. Explain that one insertion is far faster than a hundred appends.",
        },
        {
          step: "Escape the interpolated data",
          detail:
            "Inject markup into a data value and show it executing. Explain that a data-driven list makes every item an injection point.",
        },
        {
          step: "Add empty and loading states",
          detail:
            "Render 'No items yet' and a brief loading message. Explain that a blank area is indistinguishable from a broken page, particularly on a slow connection.",
        },
      ],
    },
    practice: {
      title: "Project: interactive form or calculator",
      brief:
        "You build a working form or calculator that validates in layers — built-in HTML attributes first, then JavaScript only for what HTML cannot express — with error messages naming the field and the fix, connected by aria-describedby, cleared when fixed, and never shown on load; plus a list rendered from data with escaping, and empty and loading states.",
      steps: [
        "Add built-in validation: required, correct input types, minlength, maxlength, pattern.",
        "Confirm the browser blocks an invalid submission with no JavaScript involved.",
        "Note which rules genuinely need JavaScript, such as matching two fields.",
        "Write a validation function returning either nothing or a message.",
        "Validate on blur, then re-validate on input once a field is flagged.",
        "Confirm nothing is validated on page load.",
        "On submit, prevent default, validate all, and focus the first invalid field.",
        "Write each error message naming the field, the problem and the shape of a correct answer.",
        "Place each message next to its field rather than at the top of the page.",
        "Connect each message with aria-describedby and set aria-invalid.",
        "Pair every colour indicator with text or an icon.",
        "Clear each error the moment the field becomes valid.",
        "Announce the error count through a live region so it is not only visual.",
        "Render a list from data, building the markup once and inserting it in one operation.",
        "Escape or use textContent for every interpolated value.",
        "Add an empty state message and a loading state.",
        "Test with the keyboard only, and with a screen reader if one is available.",
      ],
      standard:
        "A working form validating in layers — built-in attributes confirmed to block an invalid submission without JavaScript, then JavaScript used only for rules HTML cannot express, on blur with re-validation on input once flagged and nothing validated on load, submit preventing default and focusing the first invalid field — with each error message naming the field, the problem and the shape of a correct answer, placed beside the field, connected via aria-describedby with aria-invalid set, paired with a non-colour indicator, and cleared the moment it is fixed; a list rendered from data built once and inserted in one operation with every interpolated value escaped or set via textContent; empty and loading states present; and the whole thing tested keyboard-only.",
    },
    pitfalls: [
      {
        problem: "You wrote custom validation instead of using HTML attributes",
        fix: "Use required, type, minlength, maxlength and pattern first. They work without JavaScript, work with assistive technology, and match what people already expect from every other form.",
      },
      {
        problem: "You treat client-side validation as security",
        fix: "It is for convenience only. Anything the browser enforces runs on the user's machine and can be bypassed, so real validation must also happen on the server wherever the data goes.",
      },
      {
        problem: "You validate on every keystroke",
        fix: "Validate on blur, then re-validate on input once flagged. Validating mid-typing shouts at people for an email address that is not finished yet.",
      },
      {
        problem: "You validate on page load",
        fix: "Do not. It greets people with a wall of red before they have typed anything, which is discouraging and tells them nothing they did not know.",
      },
      {
        problem: "Your error messages say 'invalid input'",
        fix: "Name the field, say what is wrong, and give the shape of a correct answer. This is a writing task, and it is where most forms are genuinely poor.",
      },
      {
        problem: "You indicate errors by colour alone",
        fix: "Add text and an icon, and set aria-invalid. A red border is invisible to colour-blind users and to anyone who cannot see the screen.",
      },
      {
        problem: "Your modal cannot be escaped or loses focus",
        fix: "Use the native dialog element, which handles Escape, the backdrop and focus return. A hand-built modal needs focus trapping and focus restoration, and getting it wrong traps keyboard users.",
      },
      {
        problem: "You interpolate user data into innerHTML for a list",
        fix: "Escape the values or build elements with textContent. A data-driven list makes every item an injection point, which is a larger cross-site scripting hole than a single field.",
      },
    ],
    expertNotes: [
      "Use built-in HTML validation before writing any JavaScript. It works without scripts, works with assistive technology, and matches what people expect — custom validation should only cover the cases HTML genuinely cannot express.",
      "Validate on blur and re-validate on input once a field is flagged, never on load and never on every keystroke. The timing of feedback matters as much as its content, and the wrong timing makes correct validation feel hostile.",
      "Write error messages as instructions: name the field, say what is wrong, and give the shape of a correct answer. This is a writing task, and 'invalid input' is the single most common failure in form design.",
      "Escape every interpolated value when rendering lists from data. A data-driven list makes every item an injection point, so an innerHTML template turns one bad field into a whole page of cross-site scripting.",
    ],
    vocabulary: [
      {
        term: "Built-in validation",
        meaning:
          "required, type, minlength, maxlength and pattern. Free, accessible, and the correct first layer.",
      },
      {
        term: "Client-side validation",
        meaning:
          "Checking in the browser for the user's convenience. Never a security measure, because it can be bypassed.",
      },
      {
        term: "Blur",
        meaning:
          "The moment a field loses focus. The right time to validate, unlike every keystroke.",
      },
      {
        term: "aria-describedby",
        meaning: "Connects a message to its input so assistive technology announces them together.",
      },
      {
        term: "aria-invalid",
        meaning:
          "Marks a field's state for assistive technology rather than indicating it by colour alone.",
      },
      {
        term: "Live region",
        meaning:
          "An area whose changes are announced by assistive technology. How an error count reaches a screen reader user.",
      },
      {
        term: "dialog element",
        meaning:
          "A native modal handling focus, Escape and backdrop natively. Far safer than a hand-built one.",
      },
      {
        term: "Empty state",
        meaning:
          "What a list shows when there is no data. Without it a blank area is indistinguishable from a broken page.",
      },
    ],
    homework: [
      {
        task: "Add built-in validation to one form",
        detail:
          "required, correct types, minlength, maxlength and pattern where useful. Then confirm it blocks an invalid submission with JavaScript disabled entirely.",
      },
      {
        task: "Rewrite five error messages",
        detail:
          "Take any 'invalid input' style messages and rewrite each to name the field, the problem and the shape of a correct answer. Read them aloud as though you were the person stuck.",
      },
      {
        task: "Fix your validation timing",
        detail:
          "Move validation to blur, add re-validation on input once flagged, and remove anything running on page load. Note how different the form feels.",
      },
      {
        task: "Build one accessible modal",
        detail:
          "With the native dialog element, closable by button, Escape and backdrop, returning focus to whatever opened it. Then test it with the keyboard only.",
      },
    ],
    rubric: [
      {
        criterion: "Validation layers",
        passing: "Validates input.",
        excellent:
          "Built-in attributes confirmed to work without JavaScript, then JavaScript used only for what HTML cannot express, with server-side validation understood as necessary.",
      },
      {
        criterion: "Timing",
        passing: "Shows errors.",
        excellent:
          "Validation on blur with re-validation on input once flagged, nothing on load, and submit preventing default while focusing the first invalid field.",
      },
      {
        criterion: "Error messages",
        passing: "Indicates problems.",
        excellent:
          "Each message naming the field, the problem and the shape of a correct answer, placed beside the field, connected via aria-describedby with a non-colour indicator, and cleared when fixed.",
      },
      {
        criterion: "Modals",
        passing: "Has a popup.",
        excellent:
          "Built on the native dialog element or with correct focus trapping and restoration, closable by button, Escape and backdrop, and used only where interruption is justified.",
      },
      {
        criterion: "Dynamic content",
        passing: "Renders a list.",
        excellent:
          "Markup built once and inserted in one operation, every interpolated value escaped or set via textContent, and empty and loading states designed rather than left blank.",
      },
    ],
    faqs: [
      {
        q: "Do I need JavaScript validation if HTML attributes work?",
        a: "Only for cases HTML cannot express — matching two passwords, comparing two dates, requiring at least one of several fields. Use required, type, minlength, maxlength and pattern first: they work without JavaScript, work with assistive technology, and match what people already expect.",
      },
      {
        q: "Is client-side validation enough for security?",
        a: "No, never. It runs in the user's browser, so anyone who wants to can bypass it entirely. Client-side validation makes the experience good; validation on the server, wherever the data goes, is what makes the data safe. They are not alternatives.",
      },
      {
        q: "When should validation run?",
        a: "On blur — when the person leaves the field — and then on input once that field has been flagged, so the error clears the moment it is fixed. Never on page load, which greets people with failure, and not on every keystroke, which shouts at an unfinished email address.",
      },
      {
        q: "How do I build an accessible modal?",
        a: "Use the native dialog element, which handles focus, the Escape key and the backdrop for free. A hand-built modal needs role dialog, aria-modal, a labelled title, focus trapping while open, and focus returned to the opening element on close — which is why the native element is the better starting point.",
      },
      {
        q: "My dynamically rendered list shows unstyled or broken items. Why?",
        a: "Usually either unescaped data breaking the markup, or an empty state that was never designed. Escape every interpolated value or build elements with textContent, and add a 'no items yet' message so a blank list is not mistaken for a broken page.",
      },
    ],
  },

  "planning-and-structure": {
    summary:
      "Most projects fail before any code is written, through unclear scope and disorganised files. This session covers planning a project properly, structuring folders so you can find things, thinking in reusable components, and starting with Git and GitHub.",
    objectives: [
      "Scope a project so it can actually be finished",
      "Break work into tasks small enough to complete",
      "Organise files so the project stays navigable",
      "Identify what should be reusable and how",
      "Initialise a Git repository and make meaningful commits",
      "Push to GitHub and understand what version control is for",
    ],
    blocks: [
      {
        heading: "Scoping: the part that decides whether you finish",
        body: [
          "Every unfinished project was over-scoped at the start. 'A platform where anyone can do anything' is not a project; it is an aspiration, and it produces six weeks of half-built features and nothing published. The discipline is to write down **the one thing the finished project does**, in a sentence, and to cut everything that does not serve it.",
          "Then **separate must-have from nice-to-have**, and build only the must-haves first. A useful way to think about it: if you had to publish in two weeks with what you have, what would you be ashamed was missing? That list is the must-haves. Everything else goes on a later list, which you may never reach — and that is fine, because a published small thing beats an unpublished large one every time.",
          "The reason this matters so much is that **motivation is finite and unfinished work is demoralising**. A project you complete teaches you vastly more than one you abandon at seventy per cent, and the portfolio value of a live site is real while the value of a repository of half-built features is nil. Scope down until finishing is realistic, then finish.",
        ],
      },
      {
        heading: "Breaking work into tasks",
        body: [
          "A task you can complete is **specific and small enough to finish in one sitting**. 'Build the website' is not a task. 'Create the header markup with the logo and navigation' is. The difference is not pedantry — a vague task cannot be started, because there is no obvious first action, and it cannot be finished, because there is no clear end.",
          "So write tasks as **verbs with an object and a visible result**: 'style the card grid', 'wire the contact form validation', 'add the mobile navigation toggle'. Each one is startable, completable, and lets you see progress, which is what keeps a project moving through the unglamorous middle.",
          "Then **order them by dependency and by risk**. Do the uncertain things early — the part you are not sure how to build — because discovering in week three that your central idea does not work is far worse than discovering it in week one. And do the shared foundations first, since everything else sits on them.",
        ],
      },
      {
        heading: "Folder structure",
        body: [
          "A clear structure means you can find anything without searching, and anyone else can understand the project in a minute. The conventional layout for a small site is simple: **`index.html`** at the root, then **`css/`**, **`js/`**, **`images/`** (or `assets/` for all media), and any additional pages beside the index. That is genuinely enough for most projects, and elaborate structures for small sites create work rather than order.",
          "Then the naming habits that save you later. **Lowercase filenames with hyphens** — `about-us.html`, `main.css` — because they are consistent across operating systems, never contain spaces that break in URLs, and are readable. **`Final_v2_REAL_final.css`** is what an unorganised project looks like in week four, and it happens to everyone who does not decide on a convention in week one.",
          "And **one file per concern**. All your styles in one stylesheet, all your scripts in one or a few files grouped by purpose — not styles scattered across six files and inline in the HTML. A single place to look is what makes a project maintainable, and the moment you cannot remember which file something is in, the structure has failed.",
        ],
      },
      {
        heading: "Reusable thinking",
        body: [
          "Reuse is what separates writing a page from building a system. The habit is to **notice repetition and extract it**: the same card appearing six times is a pattern, and the same button style appearing everywhere belongs in one class. Write it once, use it many times, and change it in one place.",
          "In plain HTML and CSS this means **classes you apply repeatedly** — `.card`, `.btn`, `.btn-primary` — and consistent naming so the classes describe what something **is** rather than how it currently looks. `.btn-primary` survives a colour change; `.green-button` becomes a lie the first time you restyle.",
          "The same thinking applies to JavaScript: **a function per repeated behaviour**, taking the parts that vary as parameters. And the discipline behind all of it is **not extracting too early** — waiting until something is genuinely repeated twice or three times before generalising, because guessing at the reusable shape too soon produces abstractions that fit nothing properly.",
        ],
      },
      {
        heading: "Git and GitHub",
        body: [
          "**Git** records snapshots of your project so you can return to any of them, see what changed and when, and recover from mistakes. **GitHub** is a place to store those snapshots online, which gives you a backup, a shareable link, and the portfolio that employers actually look at. They are related but distinct: Git works entirely on your machine without GitHub.",
          'The core workflow is four commands. **`git init`** starts a repository in your folder. **`git add .`** stages your changes. **`git commit -m "message"`** records them as a snapshot. **`git push`** sends them to GitHub. That loop, repeated, is most of everyday version control.',
          "Then the habit that makes it valuable: **commit often, with messages that say why**. 'Fix header alignment on mobile' tells you something in three months; 'updates' tells you nothing. Commit after each working change rather than at the end of the day, because small commits are easy to understand and easy to undo, while one enormous commit is neither. And add a **`.gitignore`** for anything that should not be stored — build outputs, dependencies, and anything containing a password or API key, which once pushed is very hard to remove completely.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor plans a real project from nothing: writing the one-sentence scope, cutting the nice-to-haves, breaking the work into small verb-first tasks ordered by risk, creating the folder structure with a naming convention, extracting a repeated card into one class, then initialising Git, committing meaningfully and pushing to GitHub.",
      steps: [
        {
          step: "Write the one-sentence scope",
          detail:
            "State the single thing the finished project does. Explain that everything not serving that sentence is out of scope for now.",
        },
        {
          step: "List the nice-to-haves and cut them",
          detail:
            "Move everything that is not essential to a later list. Explain that a published small thing beats an unpublished large one every time.",
        },
        {
          step: "Apply the two-week test",
          detail:
            "Ask what would be shamefully missing if publishing in two weeks. Explain that the answer is the must-have list.",
        },
        {
          step: "Write tasks as verbs",
          detail:
            "Rewrite 'build the website' as specific startable tasks. Explain that a vague task has no obvious first action and no clear end.",
        },
        {
          step: "Order by risk and dependency",
          detail:
            "Put the uncertain part first. Explain that discovering in week three that the central idea fails is far worse than discovering it in week one.",
        },
        {
          step: "Create the folder structure",
          detail:
            "Make css, js and images folders with index.html at the root. Explain that this is genuinely enough for most projects.",
        },
        {
          step: "Set the naming convention",
          detail:
            "Use lowercase with hyphens. Show Final_v2_REAL_final.css and explain that it is what an undecided project becomes by week four.",
        },
        {
          step: "Consolidate into one file per concern",
          detail:
            "Gather scattered styles into one stylesheet. Explain that a single place to look is what makes a project maintainable.",
        },
        {
          step: "Find the repetition",
          detail:
            "Identify a card repeated six times. Explain that repetition is the signal to extract, and that extracting too early produces abstractions that fit nothing.",
        },
        {
          step: "Extract a reusable class",
          detail:
            "Create .card and .btn-primary. Explain that naming by role rather than appearance survives a restyle, while .green-button becomes a lie.",
        },
        {
          step: "Initialise the repository",
          detail:
            "Run git init and explain that Git works entirely locally, with GitHub as the remote store rather than a requirement.",
        },
        {
          step: "Add a .gitignore",
          detail:
            "Exclude build outputs and anything containing a secret. Explain that a pushed key is very hard to remove completely.",
        },
        {
          step: "Commit with a meaningful message",
          detail:
            "Stage and commit, contrasting 'fix header alignment on mobile' with 'updates'. Explain that small commits are easy to understand and easy to undo.",
        },
        {
          step: "Push to GitHub",
          detail:
            "Create the repository and push. Explain that this is simultaneously a backup, a shareable link and the portfolio employers look at.",
        },
      ],
    },
    practice: {
      title: "Plan a project and put it under version control",
      brief:
        "You plan a real project you will build — a one-sentence scope, a must-have list from the two-week test, tasks written as verbs and ordered by risk, a folder structure with a naming convention, one repeated element extracted into a reusable class — then initialise Git with a .gitignore, commit with meaningful messages and push to GitHub.",
      steps: [
        "Write the one sentence stating what the finished project does.",
        "List everything you originally wanted to include.",
        "Apply the two-week test and mark the must-haves.",
        "Move everything else to a clearly labelled later list.",
        "Write each task as a verb with an object and a visible result.",
        "Confirm every task is small enough to finish in one sitting.",
        "Order the tasks by dependency, putting the riskiest part first.",
        "Create the folder structure: css, js, images, with index.html at the root.",
        "Adopt lowercase-hyphen filenames and apply them throughout.",
        "Consolidate all styles into one stylesheet and scripts by purpose.",
        "Identify one element repeated three or more times.",
        "Extract it into a reusable class named for its role rather than its appearance.",
        "Run git init in the project folder.",
        "Create a .gitignore excluding build outputs, dependencies and any secret.",
        "Stage and commit with a message explaining why, not 'updates'.",
        "Create a GitHub repository and push.",
        "Make three more small commits as you work, each with a meaningful message.",
      ],
      standard:
        "A project plan containing a one-sentence scope, a must-have list derived from the two-week test with everything else on a labelled later list, tasks written as verbs each completable in one sitting and ordered by dependency with the riskiest first; a folder structure with css, js and images and index.html at the root, lowercase-hyphen filenames applied throughout, styles consolidated into one stylesheet; one repeated element extracted into a reusable class named for its role; and a Git repository initialised with a .gitignore covering build outputs, dependencies and secrets, committed with messages explaining why, pushed to GitHub, with three further meaningful commits made as work continues.",
    },
    pitfalls: [
      {
        problem: "You scoped the project too large",
        fix: "Write the one sentence stating what it does and cut everything else. Every unfinished project was over-scoped at the start, and a published small thing beats an unpublished large one every time.",
      },
      {
        problem: "Your tasks are too vague to start",
        fix: "Write them as verbs with an object and a visible result. 'Build the website' has no obvious first action and no clear end; 'create the header markup with logo and navigation' has both.",
      },
      {
        problem: "You left the risky part until last",
        fix: "Do the uncertain thing first. Discovering in week three that your central idea does not work is far worse than discovering it in week one, when you can still change direction.",
      },
      {
        problem: "Your filenames are inconsistent",
        fix: "Adopt lowercase with hyphens from the start. Spaces break in URLs, capitalisation differs between systems, and Final_v2_REAL_final.css is what an undecided project becomes.",
      },
      {
        problem: "Your styles are scattered across many files",
        fix: "Consolidate into one stylesheet. The moment you cannot remember which file something is in, the structure has failed, and a single place to look is what makes a project maintainable.",
      },
      {
        problem: "You extracted an abstraction after one use",
        fix: "Wait until something is genuinely repeated two or three times. Guessing at the reusable shape too soon produces abstractions that fit nothing properly and have to be unwound.",
      },
      {
        problem: "You name classes by appearance",
        fix: "Name by role: .btn-primary, not .green-button. An appearance-based name becomes a lie the first time you restyle, and then nobody trusts the class names.",
      },
      {
        problem: "Your commit messages say 'updates'",
        fix: "Say why: 'fix header alignment on mobile'. A meaningless message tells you nothing in three months, and small meaningful commits are easy to understand and easy to undo.",
      },
    ],
    expertNotes: [
      "Scope until finishing is realistic, then finish. A completed project teaches far more than one abandoned at seventy per cent, and a live site is a real portfolio piece while a repository of half-built features is worth nothing.",
      "Write tasks as verbs with a visible result. A vague task has no obvious first action so it never gets started, and no clear end so it never gets finished — specificity is what makes progress possible.",
      "Do the riskiest part first. Discovering in week one that your central idea does not work leaves you time to change direction; discovering it in week three usually means abandoning the project.",
      "Commit often with messages that explain why. Small commits are easy to understand and easy to undo, and 'fix header alignment on mobile' is still useful information in three months while 'updates' is not.",
    ],
    vocabulary: [
      {
        term: "Scope",
        meaning:
          "The one thing the finished project does. Everything else is out of scope until it is published.",
      },
      {
        term: "Must-have",
        meaning:
          "What would be shamefully missing if you published in two weeks. The only list you build from initially.",
      },
      {
        term: "Task",
        meaning:
          "A verb with an object and a visible result, small enough to finish in one sitting.",
      },
      {
        term: "Folder structure",
        meaning:
          "Where files live. css, js, images and index.html at the root is enough for most projects.",
      },
      {
        term: "Reusable class",
        meaning:
          "A class applied repeatedly, named for its role rather than its appearance. .btn-primary, not .green-button.",
      },
      {
        term: "Repository",
        meaning:
          "A project under Git version control. Works entirely locally; GitHub is a remote store, not a requirement.",
      },
      {
        term: "Commit",
        meaning: "A recorded snapshot with a message. Small and frequent beats large and rare.",
      },
      {
        term: ".gitignore",
        meaning:
          "A file listing what Git should not store. Build outputs, dependencies, and anything containing a secret.",
      },
    ],
    homework: [
      {
        task: "Scope one project in a sentence",
        detail:
          "Write the single thing it does, then list everything you wanted and move all but the must-haves to a later list. Apply the two-week test to decide what stays.",
      },
      {
        task: "Break it into ten tasks",
        detail:
          "Each a verb with an object and a visible result, each completable in one sitting, ordered by dependency with the riskiest first.",
      },
      {
        task: "Set up the project structure",
        detail:
          "css, js, images and index.html at the root, lowercase-hyphen filenames, all styles in one stylesheet. Decide the convention now rather than in week four.",
      },
      {
        task: "Put it under version control",
        detail:
          "git init, a .gitignore covering build outputs and secrets, then commit with a message explaining why and push to GitHub. Make three more small commits as you work.",
      },
    ],
    rubric: [
      {
        criterion: "Scope",
        passing: "Has an idea.",
        excellent:
          "A one-sentence scope with a must-have list from the two-week test, everything else on a labelled later list, and the project small enough to finish.",
      },
      {
        criterion: "Task breakdown",
        passing: "Has a to-do list.",
        excellent:
          "Every task a verb with a visible result, completable in one sitting, ordered by dependency with the riskiest part first.",
      },
      {
        criterion: "Structure",
        passing: "Files are somewhere.",
        excellent:
          "css, js and images with index.html at the root, lowercase-hyphen filenames throughout, styles consolidated into one stylesheet, and one file per concern.",
      },
      {
        criterion: "Reuse",
        passing: "Copies markup.",
        excellent:
          "Repetition noticed and extracted after two or three uses, classes named for role rather than appearance, and functions taking the varying parts as parameters.",
      },
      {
        criterion: "Version control",
        passing: "Has Git installed.",
        excellent:
          "A repository initialised with a .gitignore covering build outputs and secrets, small commits with messages explaining why, and the project pushed to GitHub.",
      },
    ],
    faqs: [
      {
        q: "How do I know if my project is too big?",
        a: "Apply the two-week test: if you had to publish in two weeks with what you have, what would be shamefully missing? If that list is longer than the essentials, it is too big. Every unfinished project was over-scoped at the start, and a published small thing beats an unpublished large one.",
      },
      {
        q: "What folder structure should I use?",
        a: "index.html at the root with css, js and images folders beside it. That is genuinely enough for most small sites — elaborate structures for small projects create work rather than order. Use lowercase filenames with hyphens and keep all styles in one stylesheet.",
      },
      {
        q: "When should I extract something into a reusable class?",
        a: "After it is genuinely repeated two or three times, not before. Guessing at the reusable shape too soon produces abstractions that fit nothing properly and have to be unwound. Name the class for its role — .btn-primary — not its appearance, which becomes a lie when you restyle.",
      },
      {
        q: "Do I need GitHub, or is Git enough?",
        a: "Git works entirely on your machine and gives you history and recovery on its own. GitHub adds a backup, a shareable link and a portfolio that employers actually look at, which is why it is worth setting up early — but the version control itself is local.",
      },
      {
        q: "How often should I commit?",
        a: "After each working change, with a message explaining why. 'Fix header alignment on mobile' is still useful in three months; 'updates' is not. Small commits are easy to understand and easy to undo, while one enormous commit is neither.",
      },
    ],
  },
};
