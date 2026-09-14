import type { SessionLecture } from "../types";

/**
 * WordPress — ₦20,000 · 3 weeks · 6 sessions.
 * Sessions 1 to 3. (4–6 in wordpress-b.ts.)
 *
 * Shape differs on purpose: this is an ADMIN-INTERFACE course, so the
 * demonstration is a live dashboard walkthrough with real menu paths rather
 * than an abstract exercise, and each session moves one step further out from
 * the dashboard.
 *
 * THE RUNNING PROJECT (started in session 1, launched in session 6):
 *   A real client site for a Lagos furniture and interiors business — Home,
 *   About, What We Make (catalogue), Projects (gallery), Blog and Contact,
 *   with WhatsApp ordering, basic WooCommerce, working backups and a documented
 *   handover. Built on real hosting, per the course deliverable.
 */
export const wordpressLessonsA: Record<string, SessionLecture> = {
  "setup-dashboard": {
    summary:
      "Everything else depends on getting this right: the difference between the two things called WordPress, choosing hosting that will not embarrass you in front of a client, installing cleanly, and the handful of settings that quietly decide whether the site works properly later.",
    objectives: [
      "Distinguish WordPress.org from WordPress.com and choose deliberately",
      "Evaluate a hosting plan on the things that actually matter",
      "Install WordPress and complete the initial configuration",
      "Navigate the dashboard and know where everything lives",
      "Set the five settings that cause problems if left alone",
      "Understand what you are responsible for on a client site",
    ],
    blocks: [
      {
        heading: "The two things called WordPress",
        body: [
          "This confusion costs beginners real money, so it comes first. **WordPress.org** is the free, self-hosted software: you download it, put it on hosting you pay for, and you own everything — the files, the database, the ability to install any theme or plugin. **WordPress.com** is a hosted service run by a company, where you rent space and accept their limits.",
          "For the work this course prepares you for — building business sites for clients — **you want WordPress.org on your own hosting**. It is the version clients mean when they say **I want a WordPress site**, the version agencies use, and the only one where you can install the e-commerce, form and SEO plugins a business actually needs. WordPress.com's paid tiers can do some of this, but you are renting rather than owning, and moving away later is awkward.",
          "The distinction also determines **who is responsible**. On your own hosting, you are responsible for updates, backups and security — which is exactly what the final session of this course teaches, and exactly what clients pay for. On a hosted service, they handle it and limit you. Neither is wrong; they are different products, and knowing which one you are on prevents every downstream confusion.",
        ],
      },
      {
        heading: "Choosing hosting that will not embarrass you",
        body: [
          "Hosting is where a beginner site goes to die, and not from anything visible. What matters, in rough order: **reliability** — a site that is down when a client's customer visits is a lost contract, so uptime history and honest reviews matter more than advertised features; **PHP version** — WordPress needs a current supported version, and cheap hosts sometimes leave you on an old one; **SSL included**, because HTTPS is not optional and paying extra for it is a warning sign; and **real backups**, not a checkbox nobody has tested.",
          "Then the things specific to building for Nigerian businesses. **Support responsiveness** matters more than support availability — a host who answers in twenty minutes at 9pm is worth more than one with a 48-hour ticket queue. **Server location** affects speed for your visitors: a European server is usually a reasonable compromise for Lagos traffic, while a US server adds latency to every request. And **payment** — many international hosts charge in dollars, so know the exchange exposure before you quote a client an annual figure.",
          "The practical advice is to **start cheap and small**. A shared plan is entirely adequate for a small business site, and the differences between mid-priced hosts are much smaller than the differences between a good host and a bad one. What you should not do is choose purely on price, because the cost of migrating a live client site after discovering the host is unreliable is far greater than the annual saving.",
        ],
      },
      {
        heading: "Installation",
        body: [
          "Almost every host offers a **one-click installer**, and you should use it — it creates the database, writes the configuration file and runs the setup in a minute. Knowing it exists is the point; there is no professional virtue in doing it manually on a client project.",
          "It is still worth understanding what the installer did, because you will meet it again when something breaks. WordPress needs three things: **the files** on the server, a **database** to store content and settings, and a **configuration file** that tells the files where the database is. Every catastrophic WordPress failure is a problem with one of those three, and knowing which makes debugging possible rather than guesswork.",
          "Then the setup itself, where two decisions matter. **Use a strong administrator password, and do not name the administrator account admin**, because admin is the first username every automated attack tries — this is not paranoia, it is the single most common way WordPress sites are compromised. And **note your database credentials somewhere safe**, because recovering them later is annoying at best.",
        ],
      },
      {
        heading: "The dashboard, and where things live",
        body: [
          "The dashboard is the left-hand menu, and learning it is mostly learning where things are. **Posts** is blog content — dated, categorised, shown in reverse chronological order. **Media** is every file you have uploaded. **Pages** is your permanent content — Home, About, Contact. **Comments** is moderation. **Appearance** holds themes, customisation and menus. **Plugins** is installed functionality. **Users** is who can log in. **Settings** is configuration.",
          "The distinction that confuses every beginner is **Posts versus Pages**, and it is worth fixing now because it decides how the whole site is organised. **Pages** are timeless and hierarchical — **About** does not expire, and **Contact** can have a child page. **Posts** are dated and grouped into categories — an article about a project you finished last month is a post. Getting this wrong means a client's news section that cannot be ordered, or a menu of blog entries that should have been pages.",
          "Then the thing nobody tells you: **the dashboard you see depends on your role**. An administrator sees everything; an editor sees content but not plugins or settings; an author sees less still. On a client site you will create a lower-privilege user for them, and they will not see the things you can break — which is deliberate and is part of a responsible handover.",
        ],
      },
      {
        heading: "The five settings that matter",
        body: [
          "Most settings can be left alone, and five cannot. **Permalinks** — under Settings, change the structure to **Post name**, because the default includes the date and produces long, ugly, unshareable URLs; changing this later breaks every existing link, so do it before you have content. **Timezone** — set it to Lagos, or scheduled posts and dated content will be wrong by hours.",
          "**Site title and tagline** appear in browser tabs and search results and are trivially forgotten. **Discussion settings** decide whether comments are open, and on a business site you almost certainly want them off or moderated, because unmoderated comments on a small business site become spam within days. And the fifth is the one that ruins launches: **Search engine visibility**.",
          "That checkbox — **Discourage search engines from indexing this site** — is meant to be ticked while you build and **unticked before you go live**. People tick it during development, launch, and then wonder for months why nobody can find the site. It is a single checkbox, it is easy to forget, and it is the most expensive oversight in this entire course. Check it at launch, every time, and put it on your launch checklist.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor sets up the furniture business's site from nothing on real hosting — comparing two hosting plans on the criteria that matter, running the one-click installer, explaining what it created, walking the whole dashboard, and setting the five settings that cause problems later, including the search visibility checkbox that ruins launches.",
      steps: [
        {
          step: "Explain WordPress.org against WordPress.com",
          detail:
            "Show both. Explain that self-hosted is what clients mean, what agencies use, and the only version where any plugin can be installed.",
        },
        {
          step: "Compare two hosting plans side by side",
          detail:
            "Check PHP version, SSL, backups and uptime history rather than advertised features. Explain that reliability beats features on a client site.",
        },
        {
          step: "Check the server location",
          detail:
            "Explain that a European server is usually a reasonable compromise for Lagos traffic, while a US server adds latency to every request.",
        },
        {
          step: "Discuss the payment currency",
          detail:
            "Explain that many hosts charge in dollars, so the exchange exposure must be known before you quote a client an annual figure.",
        },
        {
          step: "Register the domain and point it at hosting",
          detail:
            "Explain that propagation can take up to a day, so a domain that does not work immediately is usually working.",
        },
        {
          step: "Run the one-click installer",
          detail:
            "Explain that there is no professional virtue in installing manually on a client project.",
        },
        {
          step: "Show what the installer created",
          detail:
            "Files, database and configuration file. Explain that every catastrophic WordPress failure is a problem with one of those three.",
        },
        {
          step: "Set the admin username to something other than admin",
          detail:
            "Explain that admin is the first username every automated attack tries, so this is the most common compromise route.",
        },
        {
          step: "Set a strong password and record the database credentials",
          detail:
            "Explain that recovering credentials later is annoying at best and impossible at worst.",
        },
        {
          step: "Log in and walk the dashboard",
          detail:
            "Posts, Media, Pages, Comments, Appearance, Plugins, Users, Settings. Explain that learning the dashboard is mostly learning where things live.",
        },
        {
          step: "Create a post and a page and compare them",
          detail:
            "Explain that posts are dated and categorised while pages are timeless and hierarchical, and that getting this wrong disorganises the whole site.",
        },
        {
          step: "Create an editor user",
          detail:
            "Show what they cannot see. Explain that a lower-privilege client user is part of a responsible handover, not a restriction.",
        },
        {
          step: "Set permalinks to Post name",
          detail:
            "Explain that changing this after content exists breaks every existing link, so it must happen before the first page.",
        },
        {
          step: "Set the timezone to Lagos",
          detail:
            "Explain that scheduled posts and dated content are wrong by hours otherwise.",
        },
        {
          step: "Set the site title and tagline",
          detail:
            "Explain that these appear in browser tabs and search results and are trivially forgotten.",
        },
        {
          step: "Configure discussion settings",
          detail:
            "Explain that unmoderated comments on a business site become spam within days, so they should be off or moderated.",
        },
        {
          step: "Tick Search engine visibility while building",
          detail:
            "Explain that this hides the unfinished site from search engines during development.",
        },
        {
          step: "Show what happens if it is left ticked at launch",
          detail:
            "Explain that people launch and then wonder for months why nobody can find the site. This is the most expensive oversight in the course.",
        },
        {
          step: "Put it on the launch checklist",
          detail:
            "Explain that a single checkbox is worth a line on a checklist, every time, without exception.",
        },
      ],
    },
    practice: {
      title: "Get a clean WordPress site running on real hosting",
      brief:
        "You choose a host on the criteria that matter, install WordPress, walk the dashboard, create the site structure for the furniture business, and set every configuration that cannot safely be changed later — then document the credentials and settings so someone else could take over.",
      steps: [
        "Compare three hosting plans on PHP version, SSL, backups, uptime and support responsiveness.",
        "Choose one and write two sentences on why, including the payment currency and server location.",
        "Register a domain and point it at your hosting, confirming propagation.",
        "Run the one-click installer.",
        "Confirm you can identify the files, the database and the configuration file in your hosting panel.",
        "Set an administrator username that is not admin, with a strong password.",
        "Record the database and admin credentials somewhere safe.",
        "Log in and identify what every top-level dashboard menu is for.",
        "Create one post and one page and write the difference between them.",
        "Create an editor-level user and list what they cannot access.",
        "Set permalinks to Post name before creating any content.",
        "Set the timezone to Lagos.",
        "Set the site title and tagline.",
        "Configure discussion settings for a business site.",
        "Tick Search engine visibility while the site is being built.",
        "Write the untick step onto your launch checklist.",
        "Create the six pages the furniture business needs as empty pages.",
        "Confirm the site loads over HTTPS.",
        "Write a short handover note covering host, domain, credentials location and settings changed.",
      ],
      standard:
        "A clean WordPress install on real hosting: three plans compared on PHP version, SSL, backups, uptime and support responsiveness with a chosen host justified in two sentences including payment currency and server location; a domain registered, pointed and propagation confirmed; the one-click installer run with the files, database and configuration file each identified in the hosting panel; an administrator username that is not admin with a strong password and all credentials recorded safely; every top-level dashboard menu identified; one post and one page created with the difference between them written down; an editor-level user created with their inaccessible areas listed; permalinks set to Post name before any content, timezone set to Lagos, site title and tagline set, discussion settings configured for a business site, and Search engine visibility ticked during the build with the untick step written onto a launch checklist; the six furniture-business pages created; HTTPS confirmed; and a handover note covering host, domain, credential location and every setting changed.",
    },
    pitfalls: [
      {
        problem: "You build on WordPress.com and cannot install a plugin",
        fix: "Use WordPress.org on your own hosting. That is what clients mean, what agencies use, and the only version where e-commerce, form and SEO plugins are freely available.",
      },
      {
        problem: "You chose hosting on price alone",
        fix: "Compare reliability, PHP version, SSL, backups and support responsiveness. The cost of migrating a live client site is far greater than the annual saving.",
      },
      {
        problem: "Your admin username is admin",
        fix: "Change it. It is the first username every automated attack tries, which makes it the most common way WordPress sites are compromised.",
      },
      {
        problem: "You cannot remember the database credentials",
        fix: "Record them during setup. Recovering them later is annoying at best, and the configuration file depends on them being correct.",
      },
      {
        problem: "You put permanent content in Posts",
        fix: "Pages are timeless and hierarchical; posts are dated and categorised. Getting this wrong means a news section that cannot be ordered or a menu of blog entries that should have been pages.",
      },
      {
        problem: "You left permalinks on the default",
        fix: "Set Post name before creating content. Changing it later breaks every existing link, including any a client has already shared.",
      },
      {
        problem: "Your timezone is wrong",
        fix: "Set it to Lagos. Scheduled posts publish at the wrong hour and dated content is out by several hours otherwise.",
      },
      {
        problem: "The site is live but nobody can find it",
        fix: "Untick Discourage search engines from indexing this site. It is a single checkbox, it is easy to forget, and it is the most expensive oversight in this course.",
      },
    ],
    expertNotes: [
      "Use WordPress.org on your own hosting for client work. It is what clients mean by a WordPress site, and the hosted alternative limits exactly the plugins — e-commerce, forms, SEO — that a business needs.",
      "Choose hosting on reliability, PHP version, SSL, backups and support responsiveness, not on price or advertised features. A site that is down when a client's customer visits costs a contract, and migrating a live site later costs more than the annual saving.",
      "Never use admin as the administrator username. It is the first thing every automated attack tries, and changing it costs a minute while recovering a compromised site costs days.",
      "Put the search visibility checkbox on your launch checklist permanently. It is one checkbox that hides the whole site from search engines, and forgetting it means a launched site nobody can find for months.",
    ],
    vocabulary: [
      { term: "WordPress.org", meaning: "The free self-hosted software. You own the files and database and can install any plugin." },
      { term: "WordPress.com", meaning: "A hosted service you rent, with limits on themes and plugins. A different product, not a version." },
      { term: "Shared hosting", meaning: "A server shared with other sites. Adequate for a small business site and the right place to start." },
      { term: "One-click installer", meaning: "Creates the database, writes the configuration and runs setup. Use it; there is no virtue in installing manually." },
      { term: "wp-config.php", meaning: "The file telling WordPress where its database is. One of the three things every failure involves." },
      { term: "Permalinks", meaning: "The URL structure. Set to Post name before content exists, because changing it later breaks every link." },
      { term: "Post versus page", meaning: "Posts are dated and categorised; pages are timeless and hierarchical. The distinction organises the whole site." },
      { term: "Search engine visibility", meaning: "The checkbox discouraging indexing. Tick while building, untick at launch, and never forget it." },
    ],
    homework: [
      {
        task: "Compare three hosting plans",
        detail:
          "On PHP version, SSL, backups, uptime and support responsiveness rather than price. Write which you would choose for a client and why.",
      },
      {
        task: "Install WordPress on real hosting",
        detail:
          "Use the one-click installer, then find the files, the database and the configuration file in your hosting panel so you know where each lives.",
      },
      {
        task: "Walk every dashboard menu",
        detail:
          "Write one line on what each is for. Then create a post and a page and write down the difference between them in your own words.",
      },
      {
        task: "Set the five settings",
        detail:
          "Permalinks, timezone, title and tagline, discussion, and search visibility. Write the untick step onto a launch checklist you will keep.",
      },
    ],
    rubric: [
      {
        criterion: "Platform understanding",
        passing: "Knows what WordPress is.",
        excellent: "WordPress.org and WordPress.com distinguished with the ownership and responsibility consequences explained, and self-hosting justified for client work.",
      },
      {
        criterion: "Hosting choice",
        passing: "Has hosting.",
        excellent: "Three plans compared on PHP version, SSL, backups, uptime and support, with the choice justified including payment currency, server location and latency for Lagos visitors.",
      },
      {
        criterion: "Installation",
        passing: "WordPress is installed.",
        excellent: "Installed via the one-click installer with the files, database and configuration file each identified, a non-admin username used, a strong password set, and all credentials recorded.",
      },
      {
        criterion: "Dashboard and structure",
        passing: "Can find things.",
        excellent: "Every top-level menu identified, the post-versus-page distinction explained and applied correctly, and an editor-level user created with their inaccessible areas listed.",
      },
      {
        criterion: "Configuration",
        passing: "Settings are set.",
        excellent: "Permalinks set before content, timezone set to Lagos, discussion configured for a business site, HTTPS confirmed, and the search visibility untick written onto a launch checklist.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between WordPress.org and WordPress.com?",
        a: "WordPress.org is free self-hosted software you install on hosting you pay for, so you own the files and can install any plugin. WordPress.com is a hosted service you rent, with limits on themes and plugins. For client business sites you want WordPress.org, because it is the only version where e-commerce, form and SEO plugins are freely available.",
      },
      {
        q: "How much should hosting cost?",
        a: "A shared plan is entirely adequate for a small business site, and the differences between mid-priced hosts are much smaller than between a good host and a bad one. Do not choose on price alone — migrating a live client site after discovering the host is unreliable costs far more than the annual saving.",
      },
      {
        q: "Should I install WordPress manually or use the one-click installer?",
        a: "Use the installer. It creates the database, writes the configuration and runs setup in a minute, and there is no professional virtue in doing it by hand on a client project. It is still worth knowing what it created, because every catastrophic failure involves the files, the database or that configuration file.",
      },
      {
        q: "What is the difference between a post and a page?",
        a: "Posts are dated, categorised and shown newest first — articles and updates. Pages are timeless and can have child pages — Home, About, Contact. Getting it wrong means a news section that cannot be ordered, or a menu full of blog entries that should have been pages.",
      },
      {
        q: "My site is live but does not appear on Google. Why?",
        a: "Almost certainly the Discourage search engines from indexing this site checkbox under Settings, Reading. It is meant to be ticked while you build and unticked before launch. People tick it during development, launch, and wonder for months why nobody can find them — so put the untick on your launch checklist.",
      },
    ],
  },

  "themes-customisation": {
    summary:
      "The theme decides how the site looks and how much of it you can safely change. This session covers what a theme actually controls, choosing one on the criteria that predict problems, the two customisation systems WordPress now has, why child themes exist, and the specific things that break a site when a theme changes.",
    objectives: [
      "Explain what a theme controls and what it does not",
      "Evaluate a theme on update history, installs, speed and support",
      "Recognise the danger of pirated themes",
      "Use the Customiser and block-theme editing appropriately",
      "Create and use a child theme so updates do not erase work",
      "Know what breaks when you switch themes",
    ],
    blocks: [
      {
        heading: "What a theme is, and what it is not",
        body: [
          "A theme controls **presentation**: layout, colours, typography, spacing, and the templates that decide how a page, a post and an archive look. It does **not** control your content — that lives in the database, which is why you can change theme without losing a single page.",
          "That separation is the most important idea in WordPress and it is genuinely reassuring. It means a redesign is possible without rebuilding, and that a bad theme choice is recoverable. It also means the reverse: **anything you built that depends on a specific theme's features will not survive leaving it**, which is what the last block in this session is about.",
          "The practical consequence for client work is to **choose the theme early and change it rarely**. Every switch costs re-configuration, and a client who has been shown a site for two months does not enjoy being told it looks different now.",
        ],
      },
      {
        heading: "Choosing a theme",
        body: [
          "The criteria that predict problems are boring and reliable. **When was it last updated?** A theme untouched for two years will break against a current WordPress version, and the author has effectively told you they are not maintaining it. **How many active installs**, and what do the **recent reviews** say — not the average rating, but whether the last few reviews describe the same problem.",
          "Then **speed and weight**, which most beginners skip and every client feels. A theme packed with features, bundled page builders and demo content is heavy, and on the mobile connections most Nigerian visitors have, a slow site is a site that loses customers. **A simple theme that loads fast beats a feature-rich one that does not**, and you can add specific features with specific plugins far more cheaply than you can remove bloat from a theme.",
          "Then the one that is a security issue rather than a preference: **never use a pirated or nulled theme**. These are premium themes distributed free through unofficial sites, and they are a common malware delivery mechanism — the price was removed and something else was added. A compromised client site is your reputation and potentially your liability, and legitimate themes are cheap enough that this risk has no upside at all.",
        ],
      },
      {
        heading: "The two customisation systems",
        body: [
          "WordPress currently has two systems running side by side, and knowing which one you are in prevents a great deal of confusion. The older one is the **Customiser** — under Appearance — a live-preview panel where you set colours, typography, logo and header, and it applies to classic themes. It is predictable and it is what most older themes use.",
          "The newer one is **block themes and site editing**, where the entire site — header, footer, templates — is built from blocks and edited in a block-based editor. It is more capable and more flexible, and it is where WordPress is heading. A theme is one or the other, and the menus you see under Appearance differ accordingly, which is why two people following the same tutorial can see different screens.",
          "For client work the honest advice is to **check which system a theme uses before you commit**, because your skills and your time estimate differ between them. If you are comfortable in the Customiser and the theme is a block theme, budget for learning rather than assuming the process transfers.",
        ],
      },
      {
        heading: "Child themes, and why they exist",
        body: [
          "A **child theme** is a small theme that inherits everything from a parent and overrides only what you change. The reason it exists is **updates**: if you edit a theme's files directly, the next theme update replaces them and your work is gone — silently, and usually at the moment you least expect it.",
          "With a child theme your changes live in separate files, so the parent can be updated safely while your customisation survives. This matters enormously on client sites, because **not updating a theme to preserve your edits is trading a small risk for a large one** — outdated themes are a primary way WordPress sites get compromised.",
          "The modern alternative is that **much customisation now happens outside theme files** — in the Customiser, in block settings, or in a plugin — and none of that is affected by theme updates. So use a child theme when you are genuinely editing templates or functions, and use the Customiser or a custom plugin when you are not. Either way, the rule is the same: **never edit a parent theme's files directly**.",
        ],
      },
      {
        heading: "What breaks when you switch themes",
        body: [
          "Your content survives a theme change; plenty of other things do not. **Menu assignments are lost** — the new theme has different menu locations, so your navigation has to be re-attached. **Widget areas differ**, so anything in a sidebar or footer has to be placed again. **Customiser settings belong to the old theme**, so colours and typography reset to the new theme's defaults.",
          "The bigger problem is **theme-specific functionality**. Some themes ship their own page builder, shortcodes, custom post types or portfolio features, and content built with them displays as raw shortcode text or disappears entirely under a different theme. This is why **a theme with everything built in** is a trap: it is convenient for a month and it locks you in for years.",
          "So the discipline is to **switch themes on a staging copy first, never on the live site**. WordPress hosts usually offer a staging environment, and if yours does not, clone the site. Checking what broke in private costs an afternoon; discovering it in front of a client costs the relationship.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor chooses a theme for the furniture business by evaluating three candidates against the criteria that predict problems, rejects a feature-heavy one for speed, shows both customisation systems, creates a child theme, and then switches themes on a staging copy to show exactly what breaks and what survives.",
      steps: [
        {
          step: "Explain that content lives in the database",
          detail:
            "Show that a theme change loses no pages. Explain that this separation is the most reassuring idea in WordPress and makes a bad theme choice recoverable.",
        },
        {
          step: "Open three candidate themes in the repository",
          detail:
            "Explain that the criteria predicting problems are boring: update date, install count and recent reviews.",
        },
        {
          step: "Check the last update date on each",
          detail:
            "Explain that a theme untouched for two years will break against a current WordPress version and the author has told you so.",
        },
        {
          step: "Read the recent reviews, not the average",
          detail:
            "Explain that the last few reviews matter more than a four-star average, especially when they describe the same problem.",
        },
        {
          step: "Test a feature-heavy theme's loading time",
          detail:
            "Compare with a simple one. Explain that on mobile connections a slow site loses customers, and a simple fast theme beats a feature-rich slow one.",
        },
        {
          step: "Show a nulled theme and refuse it",
          detail:
            "Explain that these are a common malware delivery mechanism, that a compromised client site is your reputation, and that legitimate themes are cheap enough that this risk has no upside.",
        },
        {
          step: "Choose and install the theme",
          detail:
            "Explain choosing early and changing rarely, because every switch costs re-configuration.",
        },
        {
          step: "Open the Customiser",
          detail:
            "Set colours, typography and logo in live preview. Explain that this is the classic-theme system and it is predictable.",
        },
        {
          step: "Open a block theme's site editor",
          detail:
            "Edit a header template from blocks. Explain that this is the newer system and where WordPress is heading.",
        },
        {
          step: "Compare the Appearance menus of both",
          detail:
            "Explain that two people following one tutorial see different screens because the theme determines the system, so check before committing.",
        },
        {
          step: "Set up the furniture site's colour and type",
          detail:
            "Explain that these settings belong to the theme, which is why a switch resets them.",
        },
        {
          step: "Create a child theme",
          detail:
            "Show the minimal files. Explain that it inherits everything and overrides only what you change.",
        },
        {
          step: "Show what a direct parent edit costs",
          detail:
            "Update the parent theme and watch the edit vanish. Explain that this happens silently, usually at the worst moment.",
        },
        {
          step: "Update the parent with the child active",
          detail:
            "Confirm the customisation survives. Explain that this is why not updating to preserve edits trades a small risk for a large one.",
        },
        {
          step: "Show customisation that needs no child theme",
          detail:
            "Explain that Customiser and block settings live outside theme files, so use a child theme only when editing templates or functions.",
        },
        {
          step: "Clone the site to a staging copy",
          detail:
            "Explain that switching themes on the live site is how client relationships end, and staging is standard practice.",
        },
        {
          step: "Switch the theme on staging",
          detail:
            "Show the menus unassigned and widgets displaced. Explain that content survives but menu locations and widget areas are theme-specific.",
        },
        {
          step: "Show the Customiser settings reset",
          detail:
            "Explain that colours and typography belong to the old theme, so they revert to the new theme's defaults.",
        },
        {
          step: "Show a theme-specific shortcode broken",
          detail:
            "Explain that content built with a theme's own features displays as raw text under another theme, which is why built-in everything is a trap.",
        },
        {
          step: "Decide whether the switch is worth it",
          detail:
            "Explain that this decision is only possible because it was made in private, on staging, with time to count the cost.",
        },
      ],
    },
    practice: {
      title: "Choose, customise and safely change a theme",
      brief:
        "You evaluate three themes against the criteria that predict problems, install and customise one for the furniture business, create a child theme, prove that a parent update preserves your changes, and switch themes on a staging copy to record exactly what breaks.",
      steps: [
        "Identify three candidate themes for the furniture business.",
        "Record each one's last update date and reject any unmaintained for over a year.",
        "Read the recent reviews of each and note any repeated complaint.",
        "Compare the loading time of the heaviest against the lightest.",
        "Choose one and write two sentences on why, including speed.",
        "Confirm the theme is from an official source and not a nulled copy.",
        "Identify whether it uses the Customiser or block-theme site editing.",
        "Set the site colours, typography and logo in the appropriate system.",
        "Configure the header and footer.",
        "Create a child theme and activate it.",
        "Make one small customisation inside the child theme.",
        "Update the parent theme and confirm your customisation survived.",
        "Confirm which of your settings would be lost without the child theme.",
        "Set up a staging copy of the site.",
        "Switch to a different theme on staging only.",
        "Record which menus lost their assignments.",
        "Record which widgets were displaced.",
        "Record which Customiser settings reset.",
        "Test any content built with theme-specific features and record what broke.",
        "Write one paragraph on whether the switch would be worth it on the live site.",
        "Restore the original theme on staging.",
      ],
      standard:
        "A theme chosen, customised and safely changed: three candidates identified with last update dates recorded and any unmaintained for over a year rejected, recent reviews read with repeated complaints noted, loading times of the heaviest and lightest compared, and a choice justified in two sentences including speed; the theme confirmed from an official source and not nulled; its customisation system identified as Customiser or block-theme editing with colours, typography, logo, header and footer set in the appropriate one; a child theme created and activated with one customisation made inside it, the parent theme updated and the customisation confirmed to have survived, and the settings that would have been lost without it identified; a staging copy created and a different theme switched on it only, with unassigned menus, displaced widgets, reset Customiser settings and broken theme-specific content each recorded; one paragraph written on whether the switch would be worth it on the live site; and the original theme restored on staging.",
    },
    pitfalls: [
      {
        problem: "You chose a theme packed with features",
        fix: "Choose a simple, fast, maintained theme and add specific features with specific plugins. Bloat is far harder to remove than a feature is to add, and on mobile connections a slow site loses customers.",
      },
      {
        problem: "You installed a nulled theme to save money",
        fix: "Remove it and scan the site. Nulled themes are a common malware delivery mechanism, a compromised client site is your reputation, and legitimate themes cost less than the cleanup.",
      },
      {
        problem: "You picked an unmaintained theme",
        fix: "Check the last update date. A theme untouched for two years will break against a current WordPress version, and the author has effectively told you they have stopped maintaining it.",
      },
      {
        problem: "You edited the parent theme's files directly",
        fix: "Use a child theme or the Customiser. The next theme update replaces parent files silently, and your work is gone at the moment you least expect it.",
      },
      {
        problem: "You stopped updating the theme to protect your edits",
        fix: "Use a child theme and update normally. Outdated themes are a primary way WordPress sites get compromised, so you are trading a small risk for a large one.",
      },
      {
        problem: "You did not check which customisation system the theme uses",
        fix: "Check before committing. The Customiser and block-theme editing are different systems with different menus, and your time estimate differs between them.",
      },
      {
        problem: "You switched themes on the live site",
        fix: "Use staging. Menus unassign, widgets displace, Customiser settings reset and theme-specific content breaks — checking in private costs an afternoon, while discovering it in front of a client costs the relationship.",
      },
      {
        problem: "You used a theme's built-in page builder",
        fix: "Prefer standard blocks or a widely used independent builder. Theme-specific features lock you in, and their content displays as raw text under any other theme.",
      },
    ],
    expertNotes: [
      "Choose a simple, fast, actively maintained theme and add features with plugins. Bloat is far harder to remove than a feature is to add, and on the mobile connections most visitors have, a slow site is a site that loses the client's customers.",
      "Never install a nulled theme. These are a common malware delivery mechanism, and a compromised client site is your reputation and potentially your liability — legitimate themes cost less than the cleanup.",
      "Use a child theme or the Customiser, and never edit a parent theme's files. Updates replace parent files silently, so direct edits vanish at the worst possible moment, and refusing to update to protect them trades a small risk for a large one.",
      "Switch themes on staging, never live. Menu assignments, widget areas, Customiser settings and theme-specific content all break differently, and counting that cost in private is what makes the decision rational.",
    ],
    vocabulary: [
      { term: "Theme", meaning: "Presentation only — layout, colours, type and templates. Content lives in the database and survives a theme change." },
      { term: "Customiser", meaning: "The live-preview settings panel used by classic themes. Predictable, and what most older themes use." },
      { term: "Block theme", meaning: "A theme whose header, footer and templates are built from blocks. The newer system, and where WordPress is heading." },
      { term: "Child theme", meaning: "Inherits from a parent and overrides only what you change, so parent updates cannot erase your work." },
      { term: "Nulled theme", meaning: "A pirated premium theme from an unofficial source. A common malware delivery mechanism; never use one." },
      { term: "Staging site", meaning: "A private copy of the live site. Where theme switches and risky changes are tested first." },
      { term: "Theme-specific feature", meaning: "A builder, shortcode or post type shipped with a theme. Its content breaks under any other theme, which is the lock-in trap." },
      { term: "Active installs", meaning: "How many sites run a theme. A rough reliability signal, read alongside the last update date and recent reviews." },
    ],
    homework: [
      {
        task: "Evaluate three themes properly",
        detail:
          "Last update date, active installs, recent reviews and loading time. Write which you would choose for a client and which you would refuse, with a reason for each.",
      },
      {
        task: "Create a child theme and prove it works",
        detail:
          "Make one customisation inside it, update the parent, and confirm your change survived. Then note what would have happened without it.",
      },
      {
        task: "Identify which system your theme uses",
        detail:
          "Customiser or block-theme editing. List the menus available under Appearance in each case and note how they differ.",
      },
      {
        task: "Switch themes on a staging copy",
        detail:
          "Record what breaks: menus, widgets, Customiser settings and any theme-specific content. Then decide whether the switch would be worth it live.",
      },
    ],
    rubric: [
      {
        criterion: "Theme choice",
        passing: "Has a theme installed.",
        excellent: "Three evaluated on last update date, active installs, recent reviews and loading time, with a simple fast theme chosen over a feature-heavy one and the reasoning written down.",
      },
      {
        criterion: "Safety",
        passing: "Installed from the repository.",
        excellent: "Official source confirmed, nulled themes refused with the malware risk explained, and an unmaintained theme rejected on its update history.",
      },
      {
        criterion: "Customisation",
        passing: "Changed colours and fonts.",
        excellent: "The theme's system identified as Customiser or block editing, colours, typography, logo, header and footer set in the appropriate one, and the difference between the two systems explained.",
      },
      {
        criterion: "Child themes",
        passing: "Knows what a child theme is.",
        excellent: "One created and activated, a customisation made inside it, the parent updated and the change confirmed to survive, with the settings that would otherwise be lost identified.",
      },
      {
        criterion: "Safe changes",
        passing: "Can switch a theme.",
        excellent: "A staging copy used, with unassigned menus, displaced widgets, reset settings and broken theme-specific content each recorded, and a reasoned decision on whether to switch live.",
      },
    ],
    faqs: [
      {
        q: "Should I use a free or premium theme?",
        a: "Either can be right. Judge on last update date, active installs, recent reviews and speed rather than price. A well-maintained free theme beats an abandoned premium one, and what you must never use is a nulled theme from an unofficial site, because those are a common malware delivery mechanism.",
      },
      {
        q: "Will changing my theme delete my content?",
        a: "No — content lives in the database, so your pages and posts survive. What breaks is presentation and theme-specific things: menu assignments, widget areas, Customiser settings, and anything built with the old theme's own builder or shortcodes.",
      },
      {
        q: "Do I really need a child theme?",
        a: "Only if you are editing theme templates or functions. Most customisation now happens in the Customiser or in block settings, which theme updates do not touch. But never edit a parent theme's files directly, because the next update replaces them silently.",
      },
      {
        q: "What is the difference between the Customiser and site editing?",
        a: "The Customiser is the older live-preview panel used by classic themes; block themes are edited through a block-based site editor instead. WordPress has both running side by side, so which menus you see depends on your theme — check before you commit to one.",
      },
      {
        q: "How do I change a theme safely?",
        a: "On a staging copy, never on the live site. Switch it there and record what breaks — menus, widgets, Customiser settings and theme-specific content. Checking in private costs an afternoon; discovering it in front of a client costs the relationship.",
      },
    ],
  },

  "pages-block-editor": {
    summary:
      "The block editor is where the site actually gets built. This session covers pages and their hierarchy, how blocks and patterns work, reusable blocks as the biggest time saving available, menus and navigation that survive a phone screen, and a media library that does not destroy the site's performance.",
    objectives: [
      "Structure pages hierarchically and set the front page correctly",
      "Work confidently with blocks, patterns and block settings",
      "Build reusable blocks so repeated sections are edited once",
      "Create navigation that works on a phone",
      "Upload, compress and describe media properly",
      "Keep images from ruining page speed",
    ],
    blocks: [
      {
        heading: "Pages, hierarchy and the front page",
        body: [
          "For the furniture business the page structure is straightforward: **Home, About, What We Make, Projects, Blog and Contact**. Pages can be **hierarchical** — a child page sits under a parent, which is how you get **What We Make** with a page per product range beneath it, and the hierarchy shows in the URL and can drive the navigation.",
          "Two settings decide how the site presents itself, and both live under Settings, Reading. You choose whether the **front page** shows your latest posts or **a static page**, and for a business site it is always a static page — a visitor arriving at a furniture company's homepage wants to know what they make, not read a blog entry from Tuesday.",
          "You also designate **which page is the blog**, which is where your posts then appear. This trips people up because the blog page itself should contain no content — it is a container that WordPress fills. Writing an introduction on it produces a page with a paragraph stranded above the post list, and it looks like a mistake because it is one.",
        ],
      },
      {
        heading: "Blocks and patterns",
        body: [
          "The block editor builds pages from **blocks** — a paragraph is a block, so is an image, a heading, a button, a column layout. Everything is a block, and each has its own settings in the right-hand panel. It feels slow for the first day and fast after that, because once you think in blocks, layout stops being a fight.",
          "The three blocks that do most layout work are **Group**, **Columns** and **Cover**. A Group wraps blocks so you can style and space them together; Columns puts things side by side; Cover is a background image with content on top, which is how most hero sections are built. Between those three and the basic text and image blocks you can build almost any business page.",
          "Then **patterns** — pre-built arrangements of blocks you insert in one action, such as a three-column feature row or a call to action. They are the fastest way to a professional-looking page and they are editable afterwards, because they are just blocks underneath. The discipline is to **edit them to match your site rather than accepting them as they are**, since default patterns are how a site ends up looking like every other site using the same theme.",
        ],
      },
      {
        heading: "Reusable blocks: the biggest time saving here",
        body: [
          "A **reusable block** — now often called a synced pattern — is a block or group of blocks saved once and inserted on many pages. Change the saved block and **every page using it updates**. On a client site this is worth more than any other feature in this session.",
          "The obvious uses are the ones that repeat: a call to action with the business's phone number and WhatsApp link, an opening-hours block, a service-area list, a footer message. Build each once, insert everywhere, and when the client changes their phone number you update one place instead of hunting through nine pages.",
          "The caution is the mirror image: because changes propagate everywhere, **editing a reusable block on one page changes it on all of them**, and beginners discover this by accidentally rewriting a section site-wide. If you need a variation, **convert it to a regular block** on that page first, which detaches it. Knowing which of the two you are doing is the whole skill.",
        ],
      },
      {
        heading: "Menus and navigation",
        body: [
          "Menus live under Appearance and are assigned to **locations** the theme provides — usually a primary header menu, sometimes a footer. You build a menu from pages, categories or custom links, drag them into order, and nest items by dragging them slightly right to make them children.",
          "The rules that matter are about restraint. **Keep the top level to five or six items**, because more than that does not fit on a phone and turns into a scrollable mess. **Use plain words** — **What We Make** rather than **Our Craftsmanship Portfolio**, because a visitor scanning a menu is not reading prose. And **order by importance**, not alphabetically, since people read menus left to right and stop.",
          "Then the part most beginners skip: **test the menu on a phone**. The mobile menu is a separate experience — usually a hamburger that opens an overlay — and nested items can become unreachable or invisible. A menu that works beautifully on a laptop and cannot be opened properly on a phone is broken for most of your visitors, and it takes thirty seconds to check.",
        ],
      },
      {
        heading: "Media, and the performance problem",
        body: [
          "The media library holds every uploaded file, and the single most common way a beginner WordPress site becomes slow is **uploading images straight from a camera or a phone**. A modern phone photograph is several megabytes; a web page should carry images of a few hundred kilobytes. Ten unoptimised photographs can make a page take longer to load than everything else on it combined.",
          "So **resize and compress before uploading**. Resize to roughly the width it will display at — usually no more than 1,600 pixels for a full-width image — and compress it, which typically reduces file size by most of its weight with no visible quality loss. WordPress generates its own smaller sizes, but it does not shrink the original you uploaded, and the full-size file still exists and still gets served when someone views it directly.",
          "Then the two habits that cost nothing. **Name files descriptively** before uploading — **teak-dining-table-lagos.jpg** rather than **IMG_4821.jpg** — because the filename is one of the few signals a search engine has about an image. And **fill in the alt text**, describing what the image shows, because it is read aloud by screen readers for blind visitors and used when an image fails to load. Skipping it is an accessibility failure, not a shortcut.",
        ],
      },
    ],
    demonstration: {
      intro:
        "The instructor builds the furniture business's pages live in the block editor — setting the front page and blog page, constructing a hero with Cover and Columns, inserting and then customising a pattern, creating a reusable call-to-action block and showing what happens when it is edited, building the menu and testing it on a phone, and uploading a compressed image against an unoptimised one.",
      steps: [
        {
          step: "Create the six pages",
          detail:
            "Home, About, What We Make, Projects, Blog, Contact. Explain that pages are timeless and hierarchical, which is what a business site needs.",
        },
        {
          step: "Add a child page under What We Make",
          detail:
            "Explain that hierarchy shows in the URL and can drive navigation, and it is how a catalogue is organised.",
        },
        {
          step: "Set a static front page under Settings, Reading",
          detail:
            "Explain that a business homepage should not be a blog feed, and that a visitor wants to know what the company makes.",
        },
        {
          step: "Designate the blog page",
          detail:
            "Show that it holds no content. Explain that it is a container WordPress fills, and writing an introduction on it leaves a stranded paragraph.",
        },
        {
          step: "Build a hero with a Cover block",
          detail:
            "Background image with the headline on top. Explain that Cover, Group and Columns between them build almost any business page.",
        },
        {
          step: "Lay out three features with Columns",
          detail:
            "Explain that Columns is how side-by-side layout works, and that each column holds its own blocks.",
        },
        {
          step: "Wrap a section in a Group",
          detail:
            "Apply padding and a background. Explain that Group exists so several blocks can be styled and spaced as one unit.",
        },
        {
          step: "Insert a pattern",
          detail:
            "Explain that patterns are pre-built block arrangements, they are the fastest route to a professional page, and they are fully editable afterwards.",
        },
        {
          step: "Edit the pattern to match the site",
          detail:
            "Change the wording, colours and images. Explain that accepting defaults is how a site ends up looking like every other site on the same theme.",
        },
        {
          step: "Build a call to action with the phone and WhatsApp link",
          detail:
            "Explain that this will appear on several pages, which is what makes it worth saving.",
        },
        {
          step: "Save it as a reusable block",
          detail:
            "Explain that changing the saved block updates every page using it, which is the biggest time saving in this session.",
        },
        {
          step: "Insert it on three pages",
          detail:
            "Then change the phone number in one place and show all three update. Explain that this replaces hunting through nine pages.",
        },
        {
          step: "Show the danger of editing it in place",
          detail:
            "Explain that beginners rewrite a section site-wide this way, and that converting to a regular block first detaches it when you need a variation.",
        },
        {
          step: "Build the primary menu",
          detail:
            "Six items, ordered by importance. Explain that more than six does not fit a phone and that visitors scan rather than read.",
        },
        {
          step: "Rename an item to plainer words",
          detail:
            "What We Make instead of Our Craftsmanship Portfolio. Explain that a menu is scanned, not read.",
        },
        {
          step: "Assign the menu to the primary location",
          detail:
            "Explain that locations are provided by the theme, which is why a theme switch unassigns menus.",
        },
        {
          step: "Open the site on a phone and use the mobile menu",
          detail:
            "Explain that the mobile menu is a separate experience and nested items can become unreachable, so this check takes thirty seconds and is not optional.",
        },
        {
          step: "Upload an unoptimised phone photograph",
          detail:
            "Show the file size. Explain that ten of these make a page slower than everything else on it combined.",
        },
        {
          step: "Resize and compress the same image and compare",
          detail:
            "Explain that WordPress generates smaller sizes but never shrinks your original, so the full file still exists and still gets served.",
        },
        {
          step: "Rename the file descriptively and add alt text",
          detail:
            "Explain that the filename is one of the few image signals a search engine has, and alt text is read aloud by screen readers and shown when an image fails.",
        },
      ],
    },
    practice: {
      title: "Build the site's pages, navigation and media properly",
      brief:
        "You build all six pages of the furniture site in the block editor using Group, Columns and Cover, customise rather than accept patterns, create and reuse a call-to-action block, build navigation that works on a phone, and upload every image resized, compressed, well named and described.",
      steps: [
        "Create the six pages: Home, About, What We Make, Projects, Blog, Contact.",
        "Add at least two child pages under What We Make.",
        "Set a static front page under Settings, Reading.",
        "Designate the blog page and confirm it contains no written content.",
        "Build the homepage hero with a Cover block.",
        "Lay out three features using Columns.",
        "Wrap at least one section in a Group and set its spacing.",
        "Insert at least one pattern and edit it to match the site.",
        "Build a call to action with the business phone number and WhatsApp link.",
        "Save it as a reusable block.",
        "Insert it on at least three pages.",
        "Change the phone number once and confirm every instance updated.",
        "Convert the block to a regular block on one page and confirm it is detached.",
        "Build the primary menu with six items or fewer, ordered by importance.",
        "Rewrite every menu label in plain language.",
        "Assign the menu to the primary location.",
        "Open the site on a phone and test the mobile menu, including nested items.",
        "Resize every image to its display width before uploading.",
        "Compress every image and record the file size before and after.",
        "Rename every file descriptively before uploading.",
        "Add alt text describing the image on every one.",
        "Load the homepage and confirm it is not slowed by oversized images.",
      ],
      standard:
        "The furniture site's pages, navigation and media built properly: six pages created with at least two child pages under What We Make, a static front page set under Settings Reading, and a blog page designated and confirmed to hold no written content; a homepage hero built with Cover, three features laid out in Columns, at least one section wrapped in a Group with spacing set, and at least one pattern inserted and edited to match the site rather than accepted as delivered; a call to action with the business phone number and WhatsApp link saved as a reusable block, inserted on at least three pages, the number changed once with every instance confirmed updated, and the block converted to a regular block on one page and confirmed detached; a primary menu of six items or fewer ordered by importance with every label in plain language, assigned to the primary location and tested on a phone including nested items; and every image resized to its display width, compressed with the size before and after recorded, named descriptively before uploading, and given alt text describing it, with the homepage confirmed not slowed by oversized images.",
    },
    pitfalls: [
      {
        problem: "Your homepage shows blog posts",
        fix: "Set a static front page under Settings, Reading. A visitor arriving at a furniture company's homepage wants to know what they make, not read an entry from Tuesday.",
      },
      {
        problem: "You wrote content on the blog page",
        fix: "Leave it empty. It is a container WordPress fills, and an introduction produces a paragraph stranded above the post list that looks like a mistake because it is one.",
      },
      {
        problem: "You accepted a pattern unchanged",
        fix: "Edit the wording, colours and images. Default patterns are how a site ends up looking like every other site built on the same theme.",
      },
      {
        problem: "You edited a reusable block and changed it everywhere",
        fix: "Convert it to a regular block on that page first if you need a variation. Editing in place propagates site-wide, which is the feature and the trap at once.",
      },
      {
        problem: "Your menu has nine top-level items",
        fix: "Cut to six or fewer. More than that does not fit a phone, and visitors scan menus rather than reading them.",
      },
      {
        problem: "You never tested the menu on a phone",
        fix: "Test it. The mobile menu is a separate experience and nested items can become unreachable, which breaks navigation for most of your visitors.",
      },
      {
        problem: "You uploaded photographs straight from a phone",
        fix: "Resize and compress first. WordPress generates smaller sizes but never shrinks your original, and ten unoptimised photographs outweigh everything else on the page.",
      },
      {
        problem: "Your images have no alt text and files named IMG_4821",
        fix: "Describe the image and name the file before uploading. Alt text is read aloud by screen readers and shown when an image fails, and the filename is one of the few signals a search engine has.",
      },
    ],
    expertNotes: [
      "Use reusable blocks for anything that repeats. A call to action, opening hours or service-area list built once and inserted everywhere means a client's new phone number is one edit instead of a hunt through nine pages.",
      "Convert a reusable block to a regular one before varying it. Editing in place changes every page using it, which is the feature and the trap at the same time, and knowing which you are doing is the whole skill.",
      "Resize and compress every image before uploading. WordPress generates smaller sizes but never shrinks your original file, so an unoptimised upload stays on the server and still gets served at full weight.",
      "Test the mobile menu on a real phone every time. It is a separate experience from the desktop menu, nested items can become unreachable, and the check takes thirty seconds while the failure breaks navigation for most visitors.",
    ],
    vocabulary: [
      { term: "Block", meaning: "The unit the editor builds from — paragraph, image, heading, button, layout. Each has its own settings." },
      { term: "Group, Columns, Cover", meaning: "The three blocks that do most layout work: wrapping, side-by-side, and background image with content on top." },
      { term: "Pattern", meaning: "A pre-built arrangement of blocks inserted in one action and fully editable afterwards, because it is just blocks underneath." },
      { term: "Reusable block", meaning: "A block saved once and inserted on many pages, updating everywhere when changed. Now often called a synced pattern." },
      { term: "Convert to regular block", meaning: "Detaching a reusable block on one page so it can vary. Do this before editing, or the change is site-wide." },
      { term: "Menu location", meaning: "Where the theme displays a menu, such as the primary header. Provided by the theme, which is why a switch unassigns them." },
      { term: "Alt text", meaning: "A description of an image, read aloud by screen readers and shown when it fails to load. An accessibility requirement, not an extra." },
      { term: "Static front page", meaning: "A chosen page as the homepage instead of a blog feed. What every business site uses." },
    ],
    homework: [
      {
        task: "Build one page from Group, Columns and Cover",
        detail:
          "No page builder, no theme features. Note how far those three blocks plus text and image take you on a business page.",
      },
      {
        task: "Create one reusable block and use it three times",
        detail:
          "Then change it in one place and confirm all three updated. Convert it to a regular block on one page and confirm it stopped following.",
      },
      {
        task: "Audit one menu",
        detail:
          "Count the top-level items, rewrite the labels in plain language, and test it on a phone including any nested items.",
      },
      {
        task: "Optimise ten images",
        detail:
          "Resize to display width, compress, name descriptively, add alt text, and record the total size before and after.",
      },
    ],
    rubric: [
      {
        criterion: "Page structure",
        passing: "Pages exist.",
        excellent: "All six created with a working hierarchy under What We Make, a static front page set, and the blog page designated and left empty of written content.",
      },
      {
        criterion: "Block editor",
        passing: "Can add content.",
        excellent: "Hero built with Cover, features with Columns, a section wrapped in a Group with spacing set, and a pattern inserted then edited to match the site rather than accepted as delivered.",
      },
      {
        criterion: "Reuse",
        passing: "Knows what a reusable block is.",
        excellent: "A call to action saved and inserted on three or more pages, one edit confirmed to update every instance, and a detached variation created by converting to a regular block.",
      },
      {
        criterion: "Navigation",
        passing: "Has a menu.",
        excellent: "Six items or fewer ordered by importance, every label in plain language, assigned to the primary location, and tested on a phone including nested items.",
      },
      {
        criterion: "Media",
        passing: "Images appear.",
        excellent: "Every image resized to display width, compressed with before and after sizes recorded, named descriptively before uploading, given alt text, and the homepage confirmed not slowed by oversized files.",
      },
    ],
    faqs: [
      {
        q: "Is the block editor hard to learn?",
        a: "It is slow for about a day and fast after that. The shift is learning to think in blocks rather than in a page — once layout is Group, Columns and Cover, most business pages become straightforward to assemble.",
      },
      {
        q: "What is a reusable block for?",
        a: "Anything that repeats: a call to action with a phone number and WhatsApp link, opening hours, a service-area list. Build it once, insert it everywhere, and a client's changed phone number becomes one edit instead of a hunt through nine pages. Just convert it to a regular block first if you need a variation.",
      },
      {
        q: "Why is my new site so slow?",
        a: "Almost always images uploaded straight from a camera or phone. A modern phone photograph is several megabytes where a web image should be a few hundred kilobyres, and WordPress never shrinks the original you uploaded. Resize and compress before uploading.",
      },
      {
        q: "Should my homepage show my latest posts?",
        a: "For a business site, no. Set a static front page under Settings, Reading and designate a separate page for the blog. A visitor arriving at a furniture company's homepage wants to know what they make, not read a blog entry from Tuesday.",
      },
      {
        q: "Does alt text matter?",
        a: "Yes, and it is an accessibility requirement rather than an optional extra. Screen readers read alt text aloud to blind visitors, browsers display it when an image fails to load, and it is one of the few signals a search engine has about an image. It costs a few seconds per image.",
      },
    ],
  },
};
