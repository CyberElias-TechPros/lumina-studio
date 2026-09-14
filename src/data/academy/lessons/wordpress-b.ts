/**
 * WordPress — sessions 4 to 6 (full class lectures).
 * Merged by withCoursePrefix() in ../index.ts.
 */

import type { SessionLecture } from "@/data/academy/types";

export const wordpressLessonsB: Record<string, SessionLecture> = {
  "blog-plugins": {
    summary:
      "The blog that makes a site worth finding, and the plugin system that makes WordPress capable of almost anything — together with the discipline that keeps plugins from quietly destroying the site.",
    objectives: [
      "Write and publish a post, and understand why posts and pages are different things",
      "Design a category structure and use tags without creating a mess",
      "Understand what a plugin actually does and where it runs",
      "Evaluate a plugin properly before installing it, including what a nulled plugin really costs",
      "Diagnose a plugin conflict systematically instead of randomly deactivating things",
    ],
    blocks: [
      {
        heading: "The blog is the part of the site that keeps working after launch",
        body: [
          "Every page you built in the last two sessions is finished. Home is written, What We Make is populated, the gallery is uploaded. None of it will change much for a year. That is fine for those pages, but it has a consequence you should understand before launch: **a site made only of finished pages is a site that gives search engines no reason to come back.** A business site with no blog is a brochure — accurate, useful, and invisible to anyone who was not already looking for that exact business by name.",
          "The blog solves this, and not in the vague way people usually mean. When somebody in Lagos searches for **how to choose a dining table for a small apartment**, your Home page will never rank for it, because your Home page is about your business. A well-written post answering that question can rank for it, and the person who lands there is a genuine potential customer who has just been helped by you. This is the whole mechanism: **the blog earns attention from people who do not know you exist yet.**",
          "This also reframes what the client is buying. A static site delivers leads from people already searching for them. A site with a blog builds an audience over time. In class we will be direct that this is a **six-to-twelve-month** effect, not something that pays off next week — over-promising on SEO is one of the most common ways freelancers damage their reputation, and we would rather you set an honest expectation and be pleasantly surprised.",
        ],
      },
      {
        heading: "Posts and pages are different objects, and mixing them up is a structural error",
        body: [
          "The distinction is not cosmetic. **Pages are timeless and hierarchical** — Home, About, What We Make. They live outside the blog flow, they can have parents and children, and they are what your menu points at. **Posts are dated and chronological** — they appear newest-first in the blog archive, they get categories and tags, and they appear in your RSS feed.",
          "The practical failure looks like this: somebody adds ten product write-ups as posts because posts were easier to find in the dashboard, then wonders why the What We Make page is empty and the blog looks like a catalogue. Or they publish a genuine article as a page, so it never appears in the blog archive and never gets categorised. **Decide before you create.** If the content is evergreen and belongs in the site structure, it is a page. If it is something published on a date that people might browse through, it is a post.",
          "For this business the split is clean. Pages: Home, About, What We Make and its children, Projects, Contact. Posts: articles like **Choosing solid wood over veneer**, **How to care for teak in a humid climate**, **Five mistakes when furnishing a small Lagos flat**. Every one of those is a real question a real customer has, which is the test to apply before writing anything.",
        ],
      },
      {
        heading: "Categories are a filing cabinet; tags are a cross-reference, and most sites overuse tags",
        body: [
          "**Categories** are broad, stable, mutually exclusive buckets — they answer 'what section of the site is this in'. For this business, three or four is right: **Buying Guides**, **Care and Maintenance**, **Projects**. Every post gets exactly one, or occasionally two. Categories appear in URLs and often in navigation, so they should read like sections of a shop.",
          "**Tags** are narrow and can be applied liberally — they answer 'what specific things does this mention'. A post about teak care might be tagged **teak**, **humidity**, **polish**. The failure mode is the opposite of intuition: people use tags as extra categories, ending up with forty tags used once each, which produces forty near-empty archive pages. **A tag used on one post is useless** — it creates a page with no internal links and no value. Either a tag will accumulate several posts, or do not create it.",
          "The setting that governs how this presents lives under **Settings → Permalinks**, and it is worth revisiting now. **Post name** gives you `/choosing-solid-wood-over-veneer/`. Adding the category gives `/buying-guides/choosing-solid-wood-over-veneer/`. The shorter form is usually better: it is cleaner, it survives a category restructure, and it puts the keywords closest to the domain. Whichever you choose, **choose it before you publish**, because changing it later redirects every post URL you have.",
        ],
      },
      {
        heading: "What a plugin actually is, and why the number you install matters",
        body: [
          "A plugin is PHP code that hooks into WordPress. WordPress exposes thousands of **hooks** — named points in its execution where a plugin can insert or alter behaviour — and a plugin is essentially a collection of functions attached to those hooks. That is why plugins can do almost anything, and it is also why they are the most common source of problems: **a plugin runs inside your site with the same privileges WordPress itself has**, and it runs on every page load if it hooks into something common.",
          "This produces two consequences worth internalising. First, **every active plugin adds load to every page**. Ten well-written plugins cost less than one badly written one, so counting plugins is a weak proxy for performance — what matters is what they do and how they do it. Second, **every plugin is a maintenance liability and a potential security surface**, because it is third-party code that must be kept current. A plugin abandoned by its author three years ago is a risk even if it still works today.",
          "For this build the honest plugin list is short. **An SEO plugin**, **a form plugin**, **a backup plugin**, **a security plugin**, and **WooCommerce** if e-commerce is in scope. That is five. A brochure site does not need a page builder, a slider revolution, a live chat widget, a social share bar with eight networks, and a popup builder — that is how a fast site becomes a slow one, usually before launch.",
        ],
      },
      {
        heading: "Evaluating a plugin before installing it is a skill with a checklist",
        body: [
          "The plugin directory shows you everything you need. Check, in order: **active installations** — how widely it is used; **last updated** — is it maintained; **WordPress compatibility** — does it state support for your version; **rating and review count together** — a 4.8 from nine reviews is weaker evidence than a 4.5 from four thousand; and **recent reviews specifically**, because a plugin can have degraded while its historic average still looks good. Then read a handful of the **one-star and two-star reviews**, which is where the real problems are described, and look for a pattern rather than an anecdote.",
          "Then ask the question nobody asks: **do I actually need this?** The most secure plugin is the one you never installed. A share-button row can be three lines of HTML. A Google Analytics tag is one paste into the header. A 'coming soon' page is a plugin you will remove in a month and may forget about. Each of these is a candidate for not installing anything.",
          "And one absolute rule, which we will state plainly because it is where freelancers get burned. **Never install a nulled plugin or theme** — a paid product redistributed for free from a third-party site. These are near-universally backdoored, because the person who cracked it wants something from you and the site is the payment. A nulled WooCommerce extension costs fifty dollars; the same extension pirated onto a client site costs you the client, your reputation, and possibly a cleanup you cannot bill for. **There is no version of this trade that is worth making.**",
        ],
      },
      {
        heading: "Plugin conflicts are diagnosable if you are systematic, and chaotic if you are not",
        body: [
          "The symptom is generic: the site goes blank, a button stops working, the editor breaks, or a specific page returns an error. The instinct is to deactivate plugins one at a time at random until something improves. That sometimes works and teaches you nothing, and if the conflict is between two plugins you may never find it.",
          "The disciplined version is a **binary search**. Deactivate half the plugins. If the problem persists, the cause is in the other half; if it clears, the cause is in the half you just deactivated. Repeat on the guilty half. Six plugins resolve in three steps instead of six guesses, and twenty plugins in five. **Each step halves the search space**, which is the entire point.",
          "Before you start, read the error properly. Enable **WP_DEBUG** in `wp-config.php` and WordPress will name the plugin and the file in the error message — often ending the investigation in one step. Also check the **site health** screen under Tools, which reports PHP version issues, missing extensions, and plugin compatibility problems. And keep a note of what you changed: if you deactivated eight things, remember the order, or you will spend longer restoring the site than you did diagnosing it.",
        ],
      },
    ],
    demonstration: {
      intro:
        "We publish the first three blog posts for the furniture site with a proper category structure, then install one plugin properly and deliberately break the site to practise the diagnosis.",
      steps: [
        {
          step: "Set up categories first, before writing any posts",
          detail:
            "Go to **Posts → Categories**. Add **Buying Guides**, **Care and Maintenance**, and **Our Projects**, each with a short description and a clean slug. Delete the default **Uncategorized** only after every post has a real category — deleting it while posts still use it reassigns them to whatever WordPress picks.",
        },
        {
          step: "Check the permalink structure while you are thinking about URLs",
          detail:
            "**Settings → Permalinks** should already be **Post name** from session one. Confirm it, and note that post URLs will be `/buying-a-solid-wood-dining-table/` rather than including the category. This is deliberate and we are not changing it later.",
        },
        {
          step: "Write the first post as a post, not a page",
          detail:
            "**Posts → Add New**. Title: **Buying a Solid Wood Dining Table in Lagos: What to Check Before You Pay**. Note that the editor is the same block editor you already know, but the sidebar now shows **Categories** and **Tags** instead of **Page Attributes**.",
        },
        {
          step: "Write to answer one specific question",
          detail:
            "The article covers how to tell solid wood from veneer, what to check in the joinery, why teak suits the climate, and what a fair price range looks like. Roughly 900 words, with subheadings, and written for someone about to spend real money — not for search engines. If the reader would not thank you for it, it is not worth publishing.",
        },
        {
          step: "Add a featured image with the same discipline as before",
          detail:
            "A 1600px-wide photo of a finished table, compressed to under 250 KB, alt text **Solid teak dining table with six chairs in a Lagos home**. The featured image is what appears in the blog archive grid and in social previews, so a missing one leaves an ugly gap.",
        },
        {
          step: "Assign exactly one category and two useful tags",
          detail:
            "Category: **Buying Guides**. Tags: **dining tables**, **solid wood**. Both tags will be used by the other posts, which is the test — we are not creating single-use tags that produce empty archive pages.",
        },
        {
          step: "Set the excerpt explicitly",
          detail:
            "In the sidebar, open **Excerpt** and write two sentences. Without this, WordPress truncates your opening paragraph mid-sentence in archive listings, which looks careless.",
        },
        {
          step: "Preview, then publish",
          detail:
            "Preview and check the post renders correctly and that the category link works. Then **Publish**. Visit `/blog/` and confirm the post appears in the archive with its featured image and excerpt.",
        },
        {
          step: "Publish two more posts to make the structure visible",
          detail:
            "**How to Care for Teak Furniture in a Humid Climate** under **Care and Maintenance**, and **Furnishing a Small Lagos Flat Without Making It Feel Small** under **Buying Guides**. Three posts across three categories makes the blog look like a real section rather than a single orphan article.",
        },
        {
          step: "Confirm the blog page is wired to the posts",
          detail:
            "Remember from session one that the **Blog** page was set as the posts page under **Settings → Reading**. Confirm its content area is empty and that the three posts appear on it automatically. If you see your own typed text instead of the posts, the posts-page setting is wrong.",
        },
        {
          step: "Now install a plugin properly, starting with the evaluation",
          detail:
            "Go to **Plugins → Add New** and search for an SEO plugin. Before installing, read the page: active installations, last updated, WordPress compatibility, and the last few critical reviews. Narrate the decision out loud — this is the habit that keeps client sites safe.",
        },
        {
          step: "Install, activate, and check what it added",
          detail:
            "**Install Now**, then **Activate**. Note what changed: a new menu item, possibly a setup wizard, and new fields in the post editor. Run the wizard only for the basics and decline anything that asks to connect an external account you do not need.",
        },
        {
          step: "Deliberately create a conflict to practise diagnosis",
          detail:
            "Install a second plugin known to be heavy or lightly maintained — in class we use a deliberately chosen example. Load the site and observe the slowdown or breakage. The point is to create a controlled failure you can practise on rather than meet for the first time on a client's live site.",
        },
        {
          step: "Enable debugging so the site tells you what is wrong",
          detail:
            "Edit `wp-config.php` and set **WP_DEBUG** to true, and **WP_DEBUG_LOG** to true. Reload the broken page and read `wp-content/debug.log`. It will usually name the plugin and file. **Turn both off again afterwards** — a public debug log leaks paths and configuration.",
        },
        {
          step: "Diagnose by binary search, not by guessing",
          detail:
            "Deactivate half the active plugins. Reload. If it is fixed, the culprit is in the half you deactivated; if not, it is in the other half. Reactivate and halve again. Narrate each step so the method is explicit rather than lucky.",
        },
        {
          step: "Check Site Health for anything structural",
          detail:
            "**Tools → Site Health** reports PHP version, missing extensions, and compatibility warnings. Fix anything it flags as critical before moving on — a plugin conflict is often a symptom of an unsupported PHP version underneath.",
        },
        {
          step: "Resolve and document",
          detail:
            "Delete the offending plugin, confirm the site is healthy, and record what happened and how you found it in the project notes. The write-up matters as much as the fix, because the same class of problem will recur.",
        },
        {
          step: "Confirm nothing else changed",
          detail:
            "Click through Home, What We Make, Projects, Contact and the three blog posts. Verify forms still submit and the gallery still loads. After a plugin change, assume something unrelated broke until you have checked it.",
        },
      ],
    },
    practice: {
      title: "Publish three posts and survive a controlled plugin failure",
      brief:
        "On your own WordPress site, build a real blog structure and then practise diagnosing a plugin problem in a controlled setting.",
      steps: [
        "Create three or four categories that read like sections of a site, not like topics you thought of while writing. Delete **Uncategorized** once nothing uses it.",
        "Confirm **Settings → Permalinks** is **Post name** and decide now whether you want the category in the URL. Do not revisit this after publishing.",
        "Publish three posts, each answering one specific question a real reader would search for. Roughly 700 to 1,000 words each, with subheadings.",
        "Give each post exactly one category and no more than three tags. Only use a tag if at least two posts will share it.",
        "Write an explicit excerpt for each post rather than letting WordPress truncate your first paragraph.",
        "Add a compressed featured image with real alt text to each post.",
        "Verify the blog archive lists all three with images and excerpts, and that the category pages work.",
        "Install one plugin you actually need, having read its install count, last update date, compatibility statement, and recent critical reviews first.",
        "Install a second plugin you did not really need, specifically to create load. Observe what it does to page speed and behaviour.",
        "Enable **WP_DEBUG** and **WP_DEBUG_LOG**, reproduce the problem, and read the log file to see whether it names the cause.",
        "Resolve the problem by binary search — deactivate half, test, halve again — narrating each step rather than trying plugins at random.",
        "Delete the plugin you did not need, then turn debugging off and confirm `debug.log` is not publicly reachable.",
        "Run **Tools → Site Health** and fix anything flagged as critical.",
        "Write five lines recording what broke, how you identified it, and what you changed. That note is the deliverable's most valuable part.",
      ],
      standard:
        "Three published posts, each with one category, at most three genuinely shared tags, a written excerpt, and a compressed featured image; a category structure that reads like site sections; one plugin installed only after a documented evaluation; and a diagnosed-and-resolved plugin conflict found by binary search with debugging enabled, with debugging switched off afterwards and a written account of the fix.",
    },
    pitfalls: [
      {
        problem: "Publishing product information as posts because posts were easier to find",
        fix: "Evergreen content that belongs in the site structure is a **page**. Dated content people might browse is a **post**. Mixing them up leaves your catalogue empty and your blog looking like a shop.",
      },
      {
        problem: "Forty tags used once each",
        fix: "A tag on a single post creates an archive page with no internal links and no value. Only tag something if several posts will share it — otherwise use a category.",
      },
      {
        problem: "Changing permalinks after publishing",
        fix: "It changes every post URL and breaks any link already shared. Decide the structure in session one, before there is content to redirect.",
      },
      {
        problem: "Installing a nulled premium plugin or theme",
        fix: "These are reliably backdoored — the cracker is paid in access to your site. It is the single fastest way to lose a client and your reputation. Pay for the extension or find a maintained free alternative.",
      },
      {
        problem: "Judging plugins by count rather than by what they do",
        fix: "Ten lean plugins beat one bloated one. Ask whether you need each plugin at all — share buttons and an analytics tag can be a few lines of markup.",
      },
      {
        problem: "Reading only the average star rating",
        fix: "A 4.6 from three thousand reviews can hide a plugin that broke last month. Read the **recent** reviews, especially the critical ones, and check the last-updated date.",
      },
      {
        problem: "Deactivating plugins at random to find a conflict",
        fix: "Binary search instead: halve, test, halve again. It is faster, it finds conflicts between two plugins, and it teaches you the method.",
      },
      {
        problem: "Leaving WP_DEBUG on after diagnosing",
        fix: "A public debug log exposes file paths, database details and configuration. Turn it off and confirm `wp-content/debug.log` is not publicly downloadable.",
      },
    ],
    expertNotes: [
      "The blog is the only part of a business site that compounds. Everything else is finished on launch day; posts keep bringing new visitors for years. Price it accordingly when you quote maintenance, and never let a client believe a site maintains itself.",
      "The single most useful habit in plugin management is asking whether you need the plugin at all. Most sites run well on five. Every additional plugin is permanent maintenance and permanent attack surface, and clients never thank you for the features they did not ask for.",
      "Reading recent critical reviews is a better signal than the aggregate score, because it captures the plugin's current state rather than its history. A plugin that was excellent two years ago and abandoned last year is a live risk today.",
      "Binary search is worth teaching explicitly because it generalises. The same method finds a broken CSS rule, a conflicting script, or a bad commit — halve the space, test, repeat. It is the most transferable debugging skill in this course.",
    ],
    vocabulary: [
      {
        term: "Post",
        meaning:
          "A dated, chronological entry that appears in the blog archive, supports categories and tags, and is included in the RSS feed.",
      },
      {
        term: "Category",
        meaning:
          "A broad, stable, usually mutually exclusive grouping of posts that behaves like a section of the site and often appears in navigation and URLs.",
      },
      {
        term: "Tag",
        meaning:
          "A narrow label for specific subjects mentioned in a post. Only useful when shared by several posts; single-use tags create empty archive pages.",
      },
      {
        term: "Excerpt",
        meaning:
          "A short summary of a post used in archive listings and previews. Write it explicitly rather than letting WordPress truncate the first paragraph.",
      },
      {
        term: "Hook",
        meaning:
          "A named point in WordPress execution where a plugin can insert or modify behaviour. The mechanism that makes plugins powerful and also risky.",
      },
      {
        term: "Nulled plugin",
        meaning:
          "A paid plugin or theme redistributed free from a third-party site, almost always containing a backdoor. Never install one on a client site.",
      },
      {
        term: "Binary search diagnosis",
        meaning:
          "Repeatedly deactivating half the plugins and testing, halving the search space each time instead of testing plugins one at a time at random.",
      },
      {
        term: "WP_DEBUG",
        meaning:
          "A constant in wp-config.php that makes WordPress display or log errors. Essential for diagnosis; must be switched off on a live site.",
      },
    ],
    homework: [
      {
        task: "Publish three real posts on your project site",
        detail:
          "Each answering one specific question a real reader would ask, 700 to 1,000 words, with one category, at most three shared tags, a written excerpt, and a compressed featured image with alt text.",
      },
      {
        task: "Document your plugin evaluation",
        detail:
          "For the one plugin you installed, record its active install count, last-updated date, stated WordPress compatibility, and the substance of its recent critical reviews — plus the alternative you considered and why you chose as you did.",
      },
      {
        task: "Break and fix something deliberately",
        detail:
          "Install an unnecessary plugin, diagnose the resulting problem with WP_DEBUG enabled and by binary search, resolve it, switch debugging off, and write five lines on what happened and how you found it.",
      },
      {
        task: "Produce a blog content plan for the client",
        detail:
          "Twelve post titles for the next six months, each mapped to a category and each answering a question a real customer has. This is what turns 'we should blog more' into something a client can actually act on.",
      },
    ],
    rubric: [
      {
        criterion: "Blog structure",
        passing: "Three posts published, each with one category and a few tags.",
        excellent:
          "Categories read like sections of the site; every tag is shared by at least two posts; excerpts written explicitly; permalinks confirmed before publishing.",
      },
      {
        criterion: "Content quality",
        passing: "Posts are on topic and reasonably written.",
        excellent:
          "Each post answers one specific question a real customer would search for, with subheadings, accurate detail, and no padding written for search engines.",
      },
      {
        criterion: "Plugin evaluation",
        passing: "A plugin was installed and it works.",
        excellent:
          "Install count, last update, compatibility and recent critical reviews were checked and recorded, and 'do I need this at all' was answered honestly.",
      },
      {
        criterion: "Conflict diagnosis",
        passing: "The problem was resolved eventually.",
        excellent:
          "WP_DEBUG used to read the actual error, binary search used to isolate the cause, debugging switched off afterwards, and the whole thing written up.",
      },
      {
        criterion: "Safety judgement",
        passing: "No nulled software installed.",
        excellent:
          "Can explain precisely why nulled themes and plugins are backdoored and what the realistic cost is on a client engagement.",
      },
    ],
    faqs: [
      {
        q: "How often does a client need to publish?",
        a: "Two posts a month is sustainable and enough to compound. One a month still works over a year. Twenty in the first week followed by silence is worse than a steady two, because it signals an abandoned site to both readers and search engines.",
      },
      {
        q: "Should I write the posts for the client?",
        a: "Write the first three as part of the build so the structure is demonstrated, then hand over a content plan. Ongoing writing is a separate paid service — do not fold an indefinite content commitment into a website price.",
      },
      {
        q: "Do tags help SEO?",
        a: "Not directly, and poorly used they hurt by creating thin, near-empty archive pages. Categories do real work by grouping related content. Use tags only where several posts genuinely share a specific subject.",
      },
      {
        q: "How many plugins is too many?",
        a: "There is no number — ten lean plugins can be lighter than three bloated ones. The honest test is whether each one is needed, whether it is maintained, and whether it hooks into something that runs on every page load.",
      },
      {
        q: "What if a plugin I need is abandoned?",
        a: "Look for a maintained alternative first. If there is none, weigh whether the feature is worth carrying the risk, and tell the client in writing that it is unmaintained so the decision is theirs rather than something they discover later.",
      },
    ],
  },

  "forms-business-features": {
    summary:
      "The features that make a website do business — a contact form that actually reaches someone, a WhatsApp button, basic e-commerce, SEO settings and analytics — installed in a way that keeps the site fast and honest.",
    objectives: [
      "Build a contact form that delivers reliably and does not attract spam",
      "Add WhatsApp contact in the way Nigerian customers actually use it",
      "Set up basic WooCommerce for a small catalogue with enquiry-style checkout",
      "Configure SEO titles, descriptions and an XML sitemap correctly",
      "Install analytics that tells the client something true about their traffic",
    ],
    blocks: [
      {
        heading: "A contact form's job is to deliver, and most of them quietly do not",
        body: [
          "The contact form is the highest-stakes small feature on a business site, because it is the moment a prospect hands you their details. The most common failure is not a broken layout — it is a form that **submits successfully, shows a thank-you message, and never arrives**. The site owner believes enquiries are simply not coming. Weeks of lost business, no error anywhere, because the server accepted the form and then failed to send the email.",
          "The usual cause is email delivery. WordPress sends mail through PHP's mail function by default, and on shared hosting that mail is frequently rejected, filtered, or silently dropped — especially when the From address does not match the sending domain. The fix is to send through **SMTP with proper authentication**, using the client's real mailbox credentials, so the mail leaves through a server that is authorised to send for that domain.",
          "The second failure is spam. An unprotected public form will be found and abused within days, filling the client's inbox with junk and potentially getting their domain blacklisted for sending it. **Anti-spam is not optional**; it is part of the form working. We will use a honeypot field plus a challenge where appropriate, and we will test that real submissions still get through — a form so aggressive it blocks genuine customers is a worse failure than one that lets some spam through.",
        ],
      },
      {
        heading: "WhatsApp is not a nice-to-have in Nigeria — it is the contact channel",
        body: [
          "This is one of the clearest places where copying an American or European tutorial produces the wrong product. In the markets this course serves, a large share of customer conversations happen on **WhatsApp**, not by email. A Nigerian small business owner may check email weekly but answers WhatsApp within minutes. A site that offers only a contact form is asking customers to use the channel the owner responds to most slowly.",
          "So the right implementation is a **persistent WhatsApp button** with a pre-filled message, wired to the business's actual number. The customer taps it, lands in WhatsApp with a message already written — something like 'Hello, I would like to ask about your dining tables' — and sends it. The friction is close to zero, and the business owner receives it on the phone they already carry.",
          "Two details matter. The number must be in **international format** without spaces or the leading zero, or the link will not resolve. And the pre-filled message should be useful rather than empty, because it prompts the customer to say what they want instead of sending a bare 'hi' that starts the conversation from nothing. We will also keep the contact form, because some customers — and most corporate ones — genuinely prefer email, and because a form gives you a record.",
        ],
      },
      {
        heading: "Basic e-commerce, sized honestly to the business",
        body: [
          "WooCommerce turns WordPress into a shop, and it is powerful enough to run a serious retail operation. For a small furniture maker, the honest scope is much narrower, and getting that scope right is the skill. What this business needs is: **a catalogue of products with real prices, an order mechanism, and a record of who ordered what.** What it does not need on day one is inventory sync, multi-currency, subscription billing, or a warehouse integration.",
          "Payment deserves a candid conversation. Card payments through Nigerian processors work, but they add fees, require business verification, and introduce a failure mode where a customer's payment does not complete and the order state becomes confusing. For a business selling items at ₦400,000, a **bank-transfer or pay-on-delivery** flow is frequently the right first version: the customer places an order, the site records it, and the business calls to confirm and arrange payment. That is not a compromise — it matches how the business already sells.",
          "Whatever you choose, **configure tax and shipping deliberately**. WooCommerce defaults are generic, and a shop showing free shipping to every state when delivery to Maiduguri costs real money creates exactly the kind of dispute you want to avoid. Set shipping by zone, be explicit about Lagos versus elsewhere, and make the price the customer sees the price they pay.",
        ],
      },
      {
        heading: "SEO settings are mostly about titles, descriptions and not being broken",
        body: [
          "An SEO plugin does not make a site rank. What it does is give you reliable control over the things search engines read directly: the **title tag**, the **meta description**, the **canonical URL**, the **XML sitemap**, and structured data. Getting those right is worth doing; believing a plugin is a substitute for useful content is how budgets get wasted.",
          "The practical work is per page. Every page needs a **title under about 60 characters** that describes it accurately, and a **meta description of roughly 150 characters** that reads like an honest advertisement for the page — because that is what appears in results, and a truncated or auto-generated one looks careless. Set these for Home, About, each product child page, and each blog post.",
          "Then the two things that actually cause damage if missed. First, the **Search engine visibility** checkbox from session one must be **unticked at launch**, or the entire site is excluded from indexing and every other SEO effort is wasted. Second, the **XML sitemap** must be submitted so new content is discovered promptly. Both are thirty-second tasks with disproportionate consequences, and both belong on your launch checklist rather than in your memory.",
        ],
      },
      {
        heading: "Analytics exists to change a decision, not to produce a dashboard",
        body: [
          "Most clients will never open an analytics report, and installing one because a checklist says so is a poor use of the build. The honest framing is that analytics answers a small number of specific questions: **where do visitors come from, which pages do they read, what do they do next, and where do they leave?** If you cannot name a decision the answer would change, you do not need the report.",
          "For this business, three numbers matter. **Which pages get traffic** tells you whether the blog is working. **Where enquiries originate** tells you whether the WhatsApp button or the form is doing the work. **Which pages people leave from** tells you where the site fails to convince. That is a useful weekly glance, and it is enough.",
          "Two obligations come with it. **Consent and privacy** — Nigeria's **NDPA 2023** governs personal data processing, and if you are collecting identifiable information you should be able to say what you collect and why, which is what a privacy page is for. And **accuracy** — a tracking snippet installed twice double-counts everything, which is worse than no data because it is confidently wrong. Verify the count matches reality before you show anyone a number.",
        ],
      },
    ],
    demonstration: {
      intro:
        "We make the furniture site capable of doing business: a reliable contact form, a WhatsApp button, a small WooCommerce catalogue, correct SEO settings, and analytics that reports something true.",
      steps: [
        {
          step: "Install a form plugin after evaluating it",
          detail:
            "**Plugins → Add New**, search for a maintained form plugin, check active installs, last update, compatibility and recent critical reviews — then install and activate. Narrate the evaluation; this is the habit from last session applied again.",
        },
        {
          step: "Build the contact form",
          detail:
            "Create a form with **Name**, **Email**, **Phone**, **What are you looking for?** as a dropdown of the furniture categories, and **Message**. Mark name, email and message required; phone optional, because requiring it loses enquiries.",
        },
        {
          step: "Set the recipient and a useful subject line",
          detail:
            "Point submissions at the client's real mailbox, and set the subject to include the enquiry type so the inbox is sortable — for example **Website enquiry: Dining tables**. Set the From address to an address on the site's own domain, which is what makes delivery work.",
        },
        {
          step: "Configure SMTP so mail actually sends",
          detail:
            "Install an SMTP plugin and enter the client's real mail server, port and credentials. Send a test message and confirm it arrives. This is the step that separates a working form from one that silently loses enquiries.",
        },
        {
          step: "Add spam protection that does not block real customers",
          detail:
            "Enable a **honeypot** field, which is invisible to humans and traps bots. Add a challenge only if spam persists. Then submit a genuine test enquiry and confirm it arrives — protection that blocks real customers is a worse failure than some spam.",
        },
        {
          step: "Place the form and write the message above it",
          detail:
            "Insert the form block on the Contact page, and write two lines telling people what happens next: **Tell us what you need and we will reply within one working day.** Setting that expectation reduces duplicate enquiries and abandoned ones.",
        },
        {
          step: "Add the WhatsApp button with a correctly formatted number",
          detail:
            "Use a WhatsApp plugin or a simple link of the form **https://wa.me/2348012345678?text=...** — note **234** for Nigeria and **no leading zero, no spaces, no plus sign**. A wrongly formatted number produces a link that goes nowhere, which is worse than no button.",
        },
        {
          step: "Pre-fill a useful message",
          detail:
            "Set the pre-filled text to something like **Hello, I would like to ask about your furniture.** An empty message invites a bare 'hi' that starts the conversation with nothing; a useful prompt gets you to the actual question faster.",
        },
        {
          step: "Test WhatsApp on a real phone",
          detail:
            "Tap the button on a physical handset, not in the desktop preview. Confirm WhatsApp opens with the right number and the message pre-filled. Then keep the button visible but unobtrusive — it should not cover the content on mobile.",
        },
        {
          step: "Install WooCommerce for a small catalogue",
          detail:
            "Install and run the setup wizard, choosing **Nigeria** as the country and **Naira (₦)** as the currency. Decline the extras it offers — marketing services, additional payment gateways you have not evaluated — and keep the install lean.",
        },
        {
          step: "Add four products with real prices",
          detail:
            "Six-seater teak dining table, four-seater dining set, coffee table, and a bookshelf. Each with a clear photo, a genuine description covering dimensions and wood, and a real naira price. Products are the pages most likely to be shared, so they must be accurate.",
        },
        {
          step: "Choose a checkout that matches how the business actually sells",
          detail:
            "Enable **bank transfer** and **pay on delivery** rather than forcing card payment. For high-value furniture this matches the real sales process: the customer orders, the business calls, payment is arranged. Explain this trade-off to the client explicitly rather than deciding silently.",
        },
        {
          step: "Set shipping zones deliberately",
          detail:
            "Create a **Lagos** zone with a realistic flat rate and an **Other states** zone priced honestly, or marked as 'we will confirm delivery cost'. Do not leave the default free shipping — it creates disputes the moment somebody orders from far away.",
        },
        {
          step: "Place an end-to-end test order",
          detail:
            "Add an item to the cart, check out with bank transfer, and confirm the order appears in **WooCommerce → Orders** and that the notification email arrives. Then mark it cancelled so it does not pollute real data.",
        },
        {
          step: "Configure SEO titles and descriptions page by page",
          detail:
            "Using the SEO plugin's panel on each page, write a title under 60 characters and a meta description around 150 that reads like an honest summary. Do Home, About, each product, and each blog post. Watch the preview snippet as you write.",
        },
        {
          step: "Verify the sitemap and the visibility checkbox",
          detail:
            "Open the generated sitemap URL and confirm it lists your pages and posts. Then go to **Settings → Reading** and confirm **Discourage search engines** is now **unticked**. These two checks are the difference between a site that gets indexed and one that does not.",
        },
        {
          step: "Install analytics once, and verify it counts correctly",
          detail:
            "Add the tracking snippet a single time — installing it twice double-counts everything. Load a page, confirm one pageview is recorded rather than two, and check that your own test visits are not inflating the numbers.",
        },
        {
          step: "Add a privacy page and link it",
          detail:
            "Write a plain-language page stating what you collect through the form and analytics, why, and how to request removal — consistent with Nigeria's **NDPA 2023**. Link it in the footer. It is short, and it is the kind of thing clients are grateful for later.",
        },
        {
          step: "Full functional pass before moving on",
          detail:
            "Submit a form enquiry and confirm delivery. Tap WhatsApp on a phone. Place and cancel a test order. Check every page's title in the browser tab. Confirm analytics recorded the activity without doubling. Anything that fails gets fixed now, not after launch.",
        },
      ],
    },
    practice: {
      title: "Make your project site capable of doing business",
      brief:
        "Add a reliable contact form, WhatsApp contact, a small product catalogue, correct SEO settings, and analytics to your own WordPress project.",
      steps: [
        "Install a form plugin after checking its install count, last update, compatibility and recent critical reviews.",
        "Build a contact form with name, email, optional phone, an enquiry-type dropdown, and a message field.",
        "Set the recipient to a real mailbox, an informative subject line, and a From address on the site's own domain.",
        "Configure SMTP with real credentials and send a test message that you confirm actually arrives.",
        "Enable honeypot spam protection, then submit a genuine enquiry to prove real submissions still get through.",
        "Add a WhatsApp link using **234** followed by the number with no leading zero, spaces, or plus sign, and pre-fill a useful message.",
        "Test the WhatsApp button on a physical phone, not just the desktop preview.",
        "Install WooCommerce, set the country to Nigeria and currency to Naira, and decline the extras.",
        "Add four products with genuine descriptions, dimensions and naira prices.",
        "Choose a checkout method that matches how the business really sells — bank transfer or pay on delivery is often correct for high-value goods.",
        "Configure shipping zones for Lagos and other states with honest rates rather than leaving free shipping as the default.",
        "Place a test order end to end, confirm it appears in Orders and the email arrives, then cancel it.",
        "Write an SEO title under 60 characters and a meta description around 150 for every page and post.",
        "Confirm the XML sitemap lists your content and that **Discourage search engines** is unticked.",
        "Install analytics exactly once and verify a single page load records one pageview, not two.",
        "Publish a short plain-language privacy page and link it in the footer.",
      ],
      standard:
        "A contact form whose test submission provably arrives via SMTP with spam protection that still lets genuine enquiries through; a WhatsApp button tested on a physical phone with a correctly formatted number and useful pre-filled message; a small WooCommerce catalogue with real naira prices, a checkout matched to the real sales process, and honest shipping zones; SEO titles and descriptions on every page; a confirmed sitemap and unticked visibility box; analytics installed once and verified not to double-count; and a linked privacy page.",
    },
    pitfalls: [
      {
        problem: "A form that shows 'thank you' but never delivers",
        fix: "The default PHP mail path is unreliable on shared hosting. Send through authenticated **SMTP** with a From address on the site's own domain, and always send a test you confirm arrives.",
      },
      {
        problem: "Offering only email contact in a WhatsApp-first market",
        fix: "Add a persistent WhatsApp button with a pre-filled message. The business owner answers WhatsApp in minutes and email in days — meet customers on the channel they actually use.",
      },
      {
        problem: "A WhatsApp number formatted with a leading zero or spaces",
        fix: "Use international format: **234** then the number, no plus, no spaces, no leading zero. A malformed link silently goes nowhere, which is worse than having no button.",
      },
      {
        problem: "Forcing card payment on high-value goods",
        fix: "For furniture, bank transfer or pay on delivery usually matches how the business sells. Card payment adds fees, verification and confusing failed-payment states. Discuss it with the client rather than deciding silently.",
      },
      {
        problem: "Leaving WooCommerce's default free shipping",
        fix: "Set shipping zones with honest rates for Lagos and other states, or state that delivery cost will be confirmed. Free shipping to every state creates a dispute the first time somebody orders from far away.",
      },
      {
        problem: "Believing an SEO plugin improves rankings",
        fix: "It controls titles, descriptions, canonicals and the sitemap — nothing more. Rankings come from useful content and a site that works. Configure it properly and do not oversell it to the client.",
      },
      {
        problem: "Installing the analytics snippet twice",
        fix: "Double installation double-counts every visit, which is worse than no data because it is confidently wrong. Verify one page load records exactly one pageview before showing anyone a number.",
      },
      {
        problem: "Collecting personal data with no privacy statement",
        fix: "Nigeria's **NDPA 2023** governs personal data processing. Publish a short plain-language page saying what you collect, why, and how to request removal, and link it in the footer.",
      },
    ],
    expertNotes: [
      "Test the contact form from an outside email address, not from the site's own domain. Mail from your own domain to your own domain often succeeds while external delivery fails — which is precisely the case that matters, because your customers are external.",
      "WhatsApp integration is the clearest example in this course of why local knowledge beats copying tutorials. A site built to an American template offers email and a phone number; a site built for a Nigerian SME offers WhatsApp, and the difference shows up directly in enquiry volume.",
      "Scope e-commerce to what the business does today. A catalogue with an enquiry-style checkout can be live this week; a full card-payment operation needs business verification, fee agreements and reconciliation processes that are not part of a three-week build. Say so early rather than over-promising.",
      "The launch checklist earns its keep on two items: the **Search engine visibility** checkbox and the **XML sitemap** submission. Both take seconds, both are invisible when missed, and both silently undo every other SEO decision you made.",
    ],
    vocabulary: [
      {
        term: "SMTP",
        meaning:
          "Authenticated mail sending through a real mail server. The reliable way for a WordPress form to deliver, where the default PHP mail function frequently fails silently.",
      },
      {
        term: "Honeypot field",
        meaning:
          "A form field hidden from humans but visible to bots. Any submission that fills it is spam, giving protection without presenting a challenge to real visitors.",
      },
      {
        term: "wa.me link",
        meaning:
          "The WhatsApp click-to-chat URL format, using international number format and an optional pre-filled message parameter.",
      },
      {
        term: "WooCommerce",
        meaning:
          "The standard e-commerce plugin for WordPress, turning it into a shop with products, cart, checkout and order management.",
      },
      {
        term: "Shipping zone",
        meaning:
          "A geographic region with its own delivery rules and pricing. Configuring zones honestly prevents disputes over delivery cost.",
      },
      {
        term: "Meta description",
        meaning:
          "A roughly 150-character summary shown under a page's title in search results. It does not affect ranking directly but strongly affects whether people click.",
      },
      {
        term: "XML sitemap",
        meaning:
          "A machine-readable list of a site's pages that helps search engines discover content promptly. It should be submitted after launch.",
      },
      {
        term: "NDPA 2023",
        meaning:
          "Nigeria's Data Protection Act, governing the processing of personal data — the legal basis for publishing a privacy statement when you collect enquiries.",
      },
    ],
    homework: [
      {
        task: "Prove your contact form works from outside",
        detail:
          "Submit an enquiry from an email address that is not on the site's domain and confirm it arrives in the client mailbox. Screenshot both ends. This single test catches the most common silent failure on a business site.",
      },
      {
        task: "Add WhatsApp and test it on a phone",
        detail:
          "Implement a persistent WhatsApp button with a correctly formatted number and useful pre-filled message, then verify on a physical handset that it opens the right conversation.",
      },
      {
        task: "Build the small shop",
        detail:
          "Four products with real naira prices, a checkout matched to how the business sells, honest shipping zones, and one completed-then-cancelled test order proving the flow works end to end.",
      },
      {
        task: "Write the client's launch checklist",
        detail:
          "Every check from this session as a list the client or you can run on launch day — visibility checkbox, sitemap submission, form test, WhatsApp test, test order, analytics verified single-count, privacy page linked.",
      },
    ],
    rubric: [
      {
        criterion: "Contact form reliability",
        passing: "A form exists and submissions reach an inbox.",
        excellent:
          "SMTP configured and verified from an external address, honeypot protection active, real submissions proven to pass, and an expectation-setting message above the form.",
      },
      {
        criterion: "Local contact channels",
        passing: "A WhatsApp button is present.",
        excellent:
          "Number correctly formatted in international form, useful pre-filled message, tested on a physical phone, positioned so it does not obstruct content on mobile.",
      },
      {
        criterion: "E-commerce scope",
        passing: "WooCommerce installed with some products.",
        excellent:
          "Catalogue sized honestly to the business, checkout matched to the real sales process, shipping zones priced deliberately, and a test order completed then cancelled.",
      },
      {
        criterion: "SEO configuration",
        passing: "An SEO plugin is installed.",
        excellent:
          "Per-page titles under 60 characters and descriptions around 150, sitemap confirmed, **Search engine visibility** unticked, and no over-claiming about rankings.",
      },
      {
        criterion: "Analytics and privacy",
        passing: "Analytics installed.",
        excellent:
          "Installed exactly once and verified not to double-count, with a plain-language privacy page linked in the footer consistent with NDPA 2023.",
      },
    ],
    faqs: [
      {
        q: "Why did my contact form work in testing but not for customers?",
        a: "Usually because you tested from the same domain, where delivery often succeeds while external delivery fails. Always test from an outside email address — your customers are external, and that is the path that must work.",
      },
      {
        q: "Do I really need WhatsApp if there is already a form?",
        a: "In the Nigerian market, yes. Business owners typically answer WhatsApp within minutes and email within days. Keep both — some customers and most corporate ones prefer email — but do not rely on the form alone.",
      },
      {
        q: "Should a small business take card payments from day one?",
        a: "Often not. For high-value goods, bank transfer or pay on delivery matches the real sales process and avoids fees, verification delays and confusing failed payments. Add cards later once the process is documented.",
      },
      {
        q: "Will the SEO plugin get my client to page one?",
        a: "No. It controls titles, descriptions, canonicals and the sitemap. Rankings come from genuinely useful content and a site that works properly. Anyone promising page one from a plugin setting is selling something.",
      },
      {
        q: "Is a privacy page legally required?",
        a: "Nigeria's NDPA 2023 governs personal data processing, and if you collect identifiable information through a form or analytics you should be able to explain what and why. A short plain-language page linked in the footer is the practical answer.",
      },
    ],
  },

  "security-backups-launch": {
    summary:
      "The session that protects everything you built: security basics, backups that are proven to restore, update discipline, performance fundamentals — and a launch and handover process that leaves the client genuinely able to run their own site.",
    objectives: [
      "Apply practical WordPress security that addresses how sites are actually compromised",
      "Build a backup routine and prove it restores, rather than assuming it works",
      "Run updates safely, including why a staging copy changes the risk completely",
      "Apply the performance fixes that matter most on a shared-hosting budget",
      "Execute a launch checklist and hand over documentation the client can actually use",
    ],
    blocks: [
      {
        heading: "How WordPress sites actually get compromised — which is not how people imagine",
        body: [
          "The popular image is a skilled attacker crafting an exploit. The reality is far more mundane and therefore far more preventable. Most compromises come from a small set of causes: **a weak or guessed administrator password**, **an outdated plugin or theme with a known vulnerability**, **nulled software carrying a deliberate backdoor**, and **credentials reused from another site that was breached**. Automated bots attempt login on essentially every WordPress site on the internet, continuously, within hours of launch.",
          "This is encouraging, because each cause has a cheap countermeasure. Use a **long unique administrator password** stored in a password manager, and never name the account `admin`. **Update plugins, themes and core promptly**, because most exploited vulnerabilities are ones that were patched publicly and then attacked in the window before sites updated. **Never install nulled software**, which we covered last session. And **enable two-factor authentication**, which defeats credential guessing almost entirely regardless of password strength.",
          "Then two smaller measures that carry real weight. **Change the default database table prefix** during installation, which raises the bar for automated SQL injection attempts. And **limit login attempts**, which slows brute-force guessing to the point of impracticality. None of this requires expertise; it requires doing the boring things consistently, which is exactly what separates a site that survives from one that does not.",
        ],
      },
      {
        heading: "A backup you have never restored is a hope, not a backup",
        body: [
          "This is the single most important sentence in the course, and it is worth being blunt about. A backup plugin showing a green tick tells you a file was written. It tells you nothing about whether that file can rebuild your site. **The only evidence that a backup works is a successful restore**, and most people never perform one until the day they desperately need it — which is precisely when they discover it does not work.",
          "A proper routine has three properties. It is **automated**, because a backup you must remember to take will be missing on the day you need it. It is **off-server**, because a backup stored on the same server as the site is destroyed by the same disk failure, the same compromised account, or the same hosting suspension. And it is **periodically test-restored**, on a scratch installation, to prove it actually rebuilds the site.",
          "The schedule should match how much work you would lose. For a business site changing weekly, a **daily database backup and weekly full-file backup** is a reasonable baseline, with an extra manual backup taken before any significant change — a theme switch, a major plugin update, a redesign. That last habit costs a minute and has saved more sites than any security plugin, because it means a mistake is a rewind rather than a rebuild.",
        ],
      },
      {
        heading: "Updates are necessary and occasionally dangerous, and staging removes the danger",
        body: [
          "Not updating is the most common cause of compromise, so updates are not optional. But updating is also how working sites break: a plugin release changes behaviour, a theme update overwrites a customisation, or a PHP version bump deprecates a function a plugin still uses. The tension is real, and the resolution is not 'update less' — it is **update somewhere that is not the live site first**.",
          "A **staging copy** is a duplicate of the site at a separate address, where you apply updates, click through the important pages, and only then apply the same updates to production. Many hosts provide one-click staging; if yours does not, a backup-and-restore to a subdomain achieves the same thing. The additional time is minutes. The alternative is discovering the breakage when a customer does, on a Friday evening, with the client calling.",
          "The sequence that works is boring and repeatable. **Back up. Update on staging. Test the critical paths — home, a product page, the form, checkout. Then update production and test again.** Batch updates rather than doing them one at a time over weeks, and never update immediately before a deadline or a campaign, when a surprise costs the most.",
        ],
      },
      {
        heading: "Performance on a shared-hosting budget: the few things that actually matter",
        body: [
          "Performance advice online is often written for sites with engineering teams. For a small business site on shared hosting, the highest-value interventions are unglamorous and mostly about **not sending enormous files to a phone on a metered connection in Lagos**. That framing matters, because your visitor's experience is shaped by their network as much as by your server.",
          "Three things dominate. **Images** — compress before upload, serve appropriately sized files, and let a caching plugin generate smaller variants. This is usually most of the weight on a page. **Caching** — a page-caching plugin stores the generated HTML so the server does not rebuild every page for every visitor, which on shared hosting is often a several-fold improvement. And **plugin count** — every active plugin adds work to every request, which is why the discipline from last session pays off here.",
          "Then two smaller wins with real effect: **enable compression** so text assets are transferred smaller, and **lazy-load images below the fold** so the initial page arrives faster. Measure before and after with a real tool rather than guessing — a number that improves from four seconds to one and a half is worth more than any amount of confident opinion, and it is the kind of evidence a client understands.",
        ],
      },
      {
        heading: "Launching and handing over: the difference between a finished site and an abandoned one",
        body: [
          "Launch is not pressing a button; it is a sequence, and skipping steps is how a completed project turns into an emergency. The critical items are: **untick Discourage search engines** — the most expensive checkbox in WordPress; **submit the XML sitemap**; **test every form from an external address**; **test the WhatsApp button on a real phone**; **verify HTTPS works on every page**; **confirm backups are running**; and **check the site on a physical phone**, because that is how most visitors will see it.",
          "Handover matters as much as launch, and it is where most freelancers under-deliver. The client needs three things. **Credentials, delivered securely** — never the admin password in a plain WhatsApp message; use a password manager's sharing feature or a one-time secret link. **A short written guide** covering how to publish a post, add a product, update a price, and check enquiries, written for someone who has never seen the dashboard. And **an explicit statement of what maintenance they are responsible for**, including updates and backups, so nobody assumes the other party is doing it.",
          "Finally, agree the relationship in writing before you finish. Who applies updates? What happens if the site is hacked? What does a change cost? A three-line maintenance agreement prevents the most common freelance dispute — the client believing support was included, and you believing it was not. **Finish the project by defining what happens next**, and both of you will be happier in six months.",
        ],
      },
    ],
    demonstration: {
      intro:
        "We secure the furniture site, prove its backups restore, apply the performance work that matters, then run a full launch checklist and produce the handover pack.",
      steps: [
        {
          step: "Audit the administrator account first",
          detail:
            "Confirm the admin username is **not** `admin`, that the password is long and unique and stored in a password manager, and that no unexpected administrator accounts exist under **Users**. An extra admin account you did not create is an emergency, not a curiosity.",
        },
        {
          step: "Enable two-factor authentication",
          detail:
            "Install a maintained 2FA plugin and enrol the administrator account using an authenticator app. This defeats credential guessing regardless of password strength and is the single highest-value security step available.",
        },
        {
          step: "Limit login attempts",
          detail:
            "Configure the security plugin to throttle repeated failed logins. Automated bots try every site continuously; making guessing slow and noisy removes most of the practical risk at no cost.",
        },
        {
          step: "Check file permissions and remove what is not needed",
          detail:
            "Confirm directories are 755 and files 644, delete the unused default themes, remove **Hello Dolly** and any sample content, and delete unused plugins rather than leaving them deactivated — deactivated code can still be exploited.",
        },
        {
          step: "Set up automated off-server backups",
          detail:
            "Install a backup plugin and schedule a **daily database backup** and **weekly full backup**, stored somewhere other than the same server — an object storage bucket or a cloud drive. A backup on the same disk dies with the disk.",
        },
        {
          step: "Prove the backup restores — the step everyone skips",
          detail:
            "Download the latest backup, restore it into a scratch WordPress installation on a subdomain or local environment, and confirm the site comes back with its content, theme and settings intact. **Until you have done this, you do not have a backup; you have a file.**",
        },
        {
          step: "Take a manual backup before making changes",
          detail:
            "Run a full backup now, before the update and performance work. Make this a reflex: any significant change is preceded by a backup, which turns a mistake into a rewind instead of a rebuild.",
        },
        {
          step: "Run updates on staging first",
          detail:
            "Open the host's staging copy, apply all pending core, theme and plugin updates there, and click through Home, a product page, the contact form and checkout. Only after staging is clean do you apply the same updates to production.",
        },
        {
          step: "Apply updates to production and re-test",
          detail:
            "Update everything on the live site, then repeat the same click-through. Batch the updates rather than stretching them over weeks, and never schedule them immediately before a deadline.",
        },
        {
          step: "Install a caching plugin and configure it",
          detail:
            "Enable page caching so generated HTML is served rather than rebuilt per visitor. On shared hosting this is usually the largest single performance gain available, and it costs nothing.",
        },
        {
          step: "Enable compression and lazy loading",
          detail:
            "Turn on GZIP or Brotli compression for text assets, and lazy-load images below the fold so the visible part of the page arrives first. Both are single settings with measurable effect.",
        },
        {
          step: "Measure before and after rather than guessing",
          detail:
            "Run the site through a performance tool before and after the changes and record the numbers. Going from four seconds to one and a half is a result you can show a client; an unmeasured claim is just an opinion.",
        },
        {
          step: "Confirm HTTPS across the whole site",
          detail:
            "Load several pages and confirm the padlock, then check for mixed-content warnings in the browser console — an image loaded over HTTP on an HTTPS page breaks the secure indicator and worries customers at checkout.",
        },
        {
          step: "Untick Discourage search engines — the launch moment",
          detail:
            "**Settings → Reading**, untick **Discourage search engines from indexing this site**, and save. This is the checkbox that has been hiding the site since session one. Missing it wastes every other SEO decision you made, and it is invisible when missed.",
        },
        {
          step: "Submit the XML sitemap",
          detail:
            "Open the sitemap URL, confirm it lists your pages and posts, and submit it through Google Search Console. This is how new content gets discovered promptly instead of eventually.",
        },
        {
          step: "Run the full functional launch test",
          detail:
            "Submit a contact enquiry from an external address and confirm delivery. Tap WhatsApp on a physical phone. Place and cancel a test order. Check every page title. Confirm analytics records one pageview per load. Test on a real phone over mobile data, not just Wi-Fi.",
        },
        {
          step: "Deliver credentials securely",
          detail:
            "Share hosting, WordPress admin and any plugin licences through a password manager's sharing feature or a one-time secret link. **Never send the administrator password in a WhatsApp message or plain email** — it will be forwarded, screenshotted, or recovered from a compromised device.",
        },
        {
          step: "Write the client guide",
          detail:
            "One or two pages, in plain language, covering how to publish a blog post, add a product, update a price, and check enquiries — with the exact menu paths. Write it for someone who has never opened a dashboard, because that is who will read it.",
        },
        {
          step: "Agree maintenance in writing",
          detail:
            "State who applies updates, who monitors backups, what happens after a compromise, and what changes cost. Three lines prevents the most common freelance dispute: the client believing support was included and you believing it was not.",
        },
      ],
    },
    practice: {
      title: "Secure, back up, optimise, launch and hand over",
      brief:
        "Take your own WordPress project from working to genuinely launched, with security, proven backups, performance work, and a handover pack.",
      steps: [
        "Confirm the administrator username is not `admin`, the password is long and unique, and no unexpected admin accounts exist.",
        "Enable two-factor authentication on the administrator account using an authenticator app.",
        "Configure login-attempt limiting and confirm file permissions are 755 for directories and 644 for files.",
        "Delete unused themes and plugins rather than leaving them deactivated — unused code is still exploitable.",
        "Set up automated daily database and weekly full backups stored somewhere other than the same server.",
        "Restore your latest backup into a scratch installation and confirm the site comes back complete. Record that you did this.",
        "Take a manual full backup before making any further changes.",
        "Apply all pending updates on a staging copy first, testing the critical pages before touching production.",
        "Apply the same updates to production and repeat the click-through test.",
        "Install and configure a page-caching plugin.",
        "Enable compression and lazy loading for below-the-fold images.",
        "Measure page performance before and after, and record both numbers.",
        "Verify HTTPS on every page and check the console for mixed-content warnings.",
        "Untick **Discourage search engines from indexing this site** and confirm the change saved.",
        "Confirm the XML sitemap lists your content and submit it through Google Search Console.",
        "Run the complete functional launch test: form from an external address, WhatsApp on a phone, test order, page titles, analytics single-count, and a real phone on mobile data.",
        "Write the client guide covering publishing a post, adding a product, updating a price, and checking enquiries — with exact menu paths.",
        "Write a three-line maintenance agreement covering updates, backups, incident response and the cost of changes.",
      ],
      standard:
        "Two-factor authentication active on a non-default administrator account; login limiting and correct file permissions; automated off-server backups with a **recorded successful test restore**; updates applied via staging then production with critical paths tested both times; caching, compression and lazy loading configured with before-and-after measurements; HTTPS verified with no mixed content; the visibility checkbox unticked and sitemap submitted; every launch test passed including a real phone on mobile data; plus a written client guide and a three-line maintenance agreement.",
    },
    pitfalls: [
      {
        problem: "Trusting a backup you have never restored",
        fix: "A green tick means a file was written, not that it can rebuild your site. Restore one into a scratch installation and confirm it works. Until then you have a file, not a backup.",
      },
      {
        problem: "Storing backups on the same server as the site",
        fix: "The same disk failure, compromised account or hosting suspension destroys both. Store backups off-server — object storage or a cloud drive.",
      },
      {
        problem: "Not updating because updates sometimes break things",
        fix: "Outdated software is the leading cause of compromise. Update on **staging** first, test, then update production. That removes the risk without accepting the greater risk of stale code.",
      },
      {
        problem: "Leaving unused plugins and themes installed",
        fix: "Deactivated code can still be exploited if it contains a vulnerability. Delete what you are not using — fewer files to patch is a smaller surface.",
      },
      {
        problem: "Leaving Discourage search engines ticked at launch",
        fix: "The site stays invisible and nothing warns you. Put it on the launch checklist, untick it, and confirm the setting saved.",
      },
      {
        problem: "Sending the admin password in a WhatsApp message",
        fix: "Use a password manager's sharing feature or a one-time secret link. A password in a chat gets forwarded, screenshotted, or recovered from a lost phone.",
      },
      {
        problem: "Guessing at performance instead of measuring",
        fix: "Run a real tool before and after. Recorded numbers convince clients and expose which change actually helped; unmeasured claims convince nobody, including you.",
      },
      {
        problem: "Handing over with no documentation or maintenance agreement",
        fix: "The client cannot run a site they were never shown, and undefined responsibility becomes a dispute. Two pages of guide and three lines of agreement prevent most of it.",
      },
    ],
    expertNotes: [
      "Test-restore a backup once, on purpose, and it changes how you work. Almost everyone who has done it has found a broken backup before it mattered; almost everyone who has not done it has found out during an incident. It is the highest-value hour in this course.",
      "Two-factor authentication is the best return of any security measure available to a small site. Automated attacks succeed mostly through guessed or reused credentials, and 2FA defeats that class of attack completely regardless of how weak the password is.",
      "Staging converts updates from a gamble into a routine. The minutes it costs are trivial next to the cost of discovering a broken checkout because a customer found it first — and hosting that lacks one-click staging is worth changing for this reason alone.",
      "The handover pack is what separates a professional from someone who built a website. Credentials delivered securely, a guide written for a beginner, and maintenance agreed in writing mean the client can actually run the thing. It is also what earns you the maintenance retainer, which is where the recurring revenue in this work lives.",
    ],
    vocabulary: [
      {
        term: "Two-factor authentication (2FA)",
        meaning:
          "Requiring a second factor — typically a time-based code from an authenticator app — in addition to the password. It defeats credential guessing regardless of password strength.",
      },
      {
        term: "Off-server backup",
        meaning:
          "A backup stored somewhere other than the server hosting the site, so a disk failure, compromised account or hosting suspension does not destroy both copies.",
      },
      {
        term: "Test restore",
        meaning:
          "Actually rebuilding a site from a backup into a scratch installation to prove the backup works. The only real evidence that a backup is usable.",
      },
      {
        term: "Staging site",
        meaning:
          "A duplicate of the live site at a separate address where updates and changes are applied and tested before reaching production.",
      },
      {
        term: "Page caching",
        meaning:
          "Storing generated HTML so the server serves it directly instead of rebuilding every page for every visitor — usually the largest performance gain on shared hosting.",
      },
      {
        term: "Mixed content",
        meaning:
          "Loading HTTP resources on an HTTPS page. It breaks the secure indicator in the browser and undermines customer confidence at checkout.",
      },
      {
        term: "Lazy loading",
        meaning:
          "Deferring the loading of images below the fold until the visitor approaches them, so the visible part of the page arrives sooner.",
      },
      {
        term: "Handover pack",
        meaning:
          "The credentials, written guide and maintenance agreement given to a client at launch so they can run and maintain the site themselves.",
      },
    ],
    homework: [
      {
        task: "Prove your backup restores",
        detail:
          "Restore your latest backup into a scratch installation and confirm the site returns with content, theme and settings intact. Record the date and what you verified. This is the single most valuable piece of evidence in the whole course.",
      },
      {
        task: "Complete the security hardening",
        detail:
          "Non-default administrator username, long unique password, two-factor authentication, login-attempt limiting, 755/644 permissions, and all unused themes and plugins deleted rather than deactivated.",
      },
      {
        task: "Measure and record performance",
        detail:
          "Run a performance test before and after enabling caching, compression and lazy loading. Record both numbers and note which change produced the largest improvement.",
      },
      {
        task: "Produce the launch and handover pack",
        detail:
          "A completed launch checklist with every item ticked, a client guide covering the four everyday tasks with exact menu paths, credentials delivered securely, and a three-line maintenance agreement stating who does updates, backups and incident response.",
      },
    ],
    rubric: [
      {
        criterion: "Security hardening",
        passing: "A strong password and a security plugin installed.",
        excellent:
          "Non-default admin username, 2FA active, login limiting configured, correct permissions, unused code deleted, and a clear account of how WordPress sites are actually compromised.",
      },
      {
        criterion: "Backup reliability",
        passing: "Automated backups configured.",
        excellent:
          "Off-server storage, a schedule matching how much work would be lost, manual backups before changes, and a **recorded successful test restore**.",
      },
      {
        criterion: "Update discipline",
        passing: "Everything is up to date.",
        excellent:
          "Updates applied on staging first, critical paths tested there and on production, batched sensibly, and never scheduled immediately before a deadline.",
      },
      {
        criterion: "Performance work",
        passing: "A caching plugin installed.",
        excellent:
          "Caching, compression and lazy loading configured, with before-and-after measurements recorded and the largest contributing change identified.",
      },
      {
        criterion: "Launch and handover",
        passing: "The site is live and the client has the password.",
        excellent:
          "Full checklist completed including the visibility checkbox and sitemap, credentials shared securely, a beginner-readable guide delivered, and maintenance responsibility agreed in writing.",
      },
    ],
    faqs: [
      {
        q: "How often should I back up?",
        a: "Daily database and weekly full files is a sound baseline for a business site, stored off-server. Add a manual backup before any significant change — that single habit turns most mistakes into a rewind instead of a rebuild.",
      },
      {
        q: "Do I really need staging for a small site?",
        a: "If you update plugins, yes. The minutes it costs are trivial against the cost of a customer finding a broken checkout first. Many hosts provide one-click staging; if yours does not, that is a good reason to change host.",
      },
      {
        q: "Will a security plugin make the site safe?",
        a: "It helps with login throttling and scanning, but most compromises come from weak credentials, outdated software and nulled themes. Those are behaviours, not products — no plugin substitutes for updating promptly and never installing pirated software.",
      },
      {
        q: "What should the client handover include?",
        a: "Credentials delivered securely, a short guide covering publishing a post, adding a product, updating a price and checking enquiries with exact menu paths, and a written statement of who handles updates, backups and incidents.",
      },
      {
        q: "Should I offer ongoing maintenance?",
        a: "Yes — it is where the recurring income in this work lives, and the client genuinely needs it. A modest monthly fee covering updates, backups, monitoring and small changes is fair, and it keeps the relationship alive long after launch.",
      },
    ],
  },
};
