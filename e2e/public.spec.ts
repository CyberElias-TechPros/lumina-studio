import { expect } from "@playwright/test";
import { test } from "./helpers";

test.describe("Public marketing + application journey", () => {
  test("home page loads with core navigation", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /the future is built by those who learn to create it/i }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /^courses$/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /^apply$/i }).first()).toBeVisible();
  });

  for (const path of ["/contact", "/visit", "/visit/info"]) {
    test(`official address is consistent in ${path} copy and metadata`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator("main")).toContainText("24 Ebony Road");
      await expect(page.locator("footer")).toContainText("24 Ebony Road, Off Rumuola Road");
      await expect(page.locator("body")).not.toContainText(/(?:24\/26|26) Ebony Road/);
      const descriptions = await page
        .locator('meta[name="description"]')
        .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("content")));
      expect(descriptions.length).toBeGreaterThan(0);
      expect(descriptions.every((description) => description?.includes("24 Ebony Road"))).toBe(
        true,
      );

      const entities = (
        await page.locator('script[type="application/ld+json"]').allTextContents()
      ).flatMap((text) => JSON.parse(text));
      for (const type of ["EducationalOrganization", "LocalBusiness"]) {
        expect(entities.find((entity) => entity["@type"] === type)?.address).toMatchObject({
          streetAddress: "24 Ebony Road, Off Rumuola Road",
          addressLocality: "Port Harcourt",
          addressRegion: "Rivers State",
          addressCountry: "NG",
        });
      }
    });
  }

  test("redesigned course discovery keeps essential details accessible", async ({ page }) => {
    await page.goto("/classes");
    const areas = page.getByRole("region", { name: "Choose a starting point." });
    await expect(areas.getByRole("link", { name: /Office & Data/i })).toHaveAttribute(
      "href",
      "#core-office-data",
    );
    await areas.getByRole("link", { name: /Office & Data/i }).click();
    await expect(page.locator("#core-office-data")).toBeVisible();

    await page.goto("/classes/microsoft-office");
    const facts = page.getByLabel("Course facts");
    await expect(facts).toContainText("₦30,000");
    await expect(facts).toContainText("3 weeks");
    await expect(facts).toContainText("What you need");
    await expect(page.getByRole("link", { name: "Apply for this course" }).first()).toHaveAttribute(
      "href",
      /\/apply\?program=microsoft-office/,
    );
  });

  test("essential course facts render without JavaScript", async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
    try {
      const page = await context.newPage();
      await page.goto("/classes/microsoft-office");
      await expect(page.getByRole("heading", { level: 1, name: "Microsoft Office" })).toBeVisible();
      await expect(page.getByLabel("Course facts")).toContainText("₦30,000");
    } finally {
      await context.close();
    }
  });

  test("admissions explains the offer before payment", async ({ page }) => {
    await page.goto("/admissions");
    await expect(page.getByRole("heading", { name: /how to enrol/i })).toBeVisible();
    await expect(page.getByText("Applying is free.")).toBeVisible();
    await expect(page.getByText(/unscheduled courses collect interest only/i)).toBeVisible();
    await expect(page.getByText(/do not pay until you have reviewed and accepted/i)).toBeVisible();
    await expect(page.getByRole("link", { name: /start an application/i })).toHaveAttribute(
      "href",
      "/apply",
    );
  });

  test("mobile admissions is not covered by floating help controls", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/apply");
    await expect(page.getByRole("heading", { name: "Register for a course" })).toBeVisible();
    await expect(page.getByRole("button", { name: /ask the CEA assistant/i })).toHaveCount(0);
    await expect(
      page.getByRole("link", { name: /chat with cyber elias academy on whatsapp/i }),
    ).toHaveCount(0);
    await page.goto("/contact");
    await expect(page.getByRole("link", { name: "Message us on WhatsApp" })).toBeVisible();
  });

  test("classes list + detail pages load", async ({ page }) => {
    await page.goto("/classes");
    await expect(page).toHaveTitle(/Practical Digital Skills/);

    await page.goto("/classes/web-development");
    await expect(page).toHaveTitle(/Web Development/);
    await expect(page.getByText(/html|css|javascript/i).first()).toBeVisible();
  });

  test("course assessment explains a beginner path, updates answers and resets", async ({
    page,
  }) => {
    await page.goto("/classes");
    const guide = page.locator("#course-finder");
    const result = guide.getByLabel("Course recommendation");
    const progress = guide.getByRole("progressbar", { name: "Questions answered" });
    await expect(progress).toHaveAttribute("aria-valuenow", "0");
    await guide.getByText("Websites and coding", { exact: true }).click();
    await expect(progress).toHaveAttribute("aria-valuetext", "1 of 4 questions answered");
    await guide.getByText("Build interactive websites with code", { exact: true }).click();
    const typing = guide.getByRole("group", { name: /you want to type/i });
    const saving = guide.getByRole("group", { name: /keep a document/i });
    await typing.getByText("I'm not sure yet", { exact: true }).click();
    await expect(result.getByRole("heading", { name: "Your guide is ready" })).toBeVisible();
    await saving.getByText("Close it without saving", { exact: true }).click();
    await expect(result.getByRole("heading", { name: "Typing & Computer Basics" })).toBeVisible();
    await expect(result.getByRole("heading", { name: "Web Development" })).toBeVisible();
    await expect(progress).toHaveAttribute("aria-valuenow", "4");
    await expect(result).toContainText("Your exploration is complete");
    await expect(result).toContainText("a suggestion, not a requirement");
    await expect(result).toContainText("Use Save or Save As");
    await expect(result).toContainText("Listed fee");
    await expect(result).toContainText("Course length");
    await expect(result).toContainText("You practise toward");
    await expect(
      result.getByRole("link", { name: /see fee, requirements and syllabus/i }).last(),
    ).toHaveAttribute("href", "/classes/web-development");

    await typing
      .getByText("Click inside the document, then use the keyboard", { exact: true })
      .click();
    await saving
      .getByText("Use Save or Save As and choose a name and location", { exact: true })
      .click();
    await expect(result.getByRole("heading", { name: "Web Development" })).toBeVisible();
    await expect(result.getByRole("heading", { name: "Typing & Computer Basics" })).toHaveCount(0);
    await guide.getByText("Creative work and content", { exact: true }).click();
    await expect(progress).toHaveAttribute("aria-valuenow", "3");
    await expect(result.getByRole("heading", { name: "Your guide is ready" })).toBeVisible();
    await result.getByRole("button", { name: /start over/i }).click();
    await expect(progress).toHaveAttribute("aria-valuenow", "0");
    await expect(guide.locator('input[type="radio"]:checked')).toHaveCount(0);
    await expect(guide.getByRole("group", { name: /what would you most like to do/i })).toHaveCount(
      0,
    );
  });

  test("assessment maps all thirteen core goals to course pages", async ({ page }) => {
    await page.goto("/classes");
    const guide = page.locator("#course-finder");
    const result = guide.getByLabel("Course recommendation");
    await guide
      .getByText("Click inside the document, then use the keyboard", { exact: true })
      .click();
    await guide
      .getByText("Use Save or Save As and choose a name and location", { exact: true })
      .click();
    const groups = [
      [
        "Everyday computer and office skills",
        [
          [
            "Learn the basics of using a computer",
            "Typing & Computer Basics",
            "computer-basics-typing",
          ],
          [
            "Make documents, spreadsheets and presentations",
            "Microsoft Office",
            "microsoft-office",
          ],
          ["Organise records and enter data accurately", "Data Entry", "data-entry"],
        ],
      ],
      [
        "Creative work and content",
        [
          ["Create flyers and visual designs", "Graphic Design", "graphic-design"],
          ["Create photo and video content", "Content Creation", "content-creation"],
        ],
      ],
      [
        "Websites and coding",
        [
          ["Design web pages with HTML and CSS", "Web Design", "web-design"],
          ["Build interactive websites with code", "Web Development", "web-development"],
        ],
      ],
      [
        "Business, marketing and teaching",
        [
          ["Promote a business online", "Digital Marketing", "digital-marketing"],
          [
            "Manage a business's social media",
            "Social Media Management",
            "social-media-management",
          ],
          ["Price and deliver freelance work", "Business & Freelancing", "business-freelancing"],
          ["Teach a class or course online", "Online Teaching", "online-teaching"],
        ],
      ],
      [
        "Computers and digital safety",
        [
          ["Understand and troubleshoot computers", "Computer Repairs", "computer-repairs"],
          ["Improve my digital safety skills", "Cybersecurity", "cybersecurity"],
        ],
      ],
    ] as const;
    for (const [interest, goals] of groups) {
      await guide.getByText(interest, { exact: true }).click();
      for (const [label, title, slug] of goals) {
        await guide.getByText(label, { exact: true }).click();
        await expect(result.getByRole("heading", { name: title, exact: true })).toBeVisible();
        await expect(
          result.getByRole("link", { name: /see fee, requirements and syllabus/i }),
        ).toHaveAttribute("href", `/classes/${slug}`);
      }
    }
    await guide
      .getByRole("group", { name: /which area/i })
      .getByText("I'm not sure yet", { exact: true })
      .click();
    await guide.getByText("Start by building computer confidence", { exact: true }).click();
    await expect(result.getByRole("heading", { name: "Typing & Computer Basics" })).toBeVisible();
    await page.reload();
    await expect(guide.locator('input[type="radio"]:checked')).toHaveCount(0);
  });

  test("assessment has a keyboard path and a no-JavaScript alternative", async ({
    page,
    browser,
    baseURL,
  }) => {
    await page.goto("/");
    const guide = page.locator("#home-course-finder");
    const first = guide.getByRole("radio", { name: /everyday computer and office skills/i });
    await first.focus();
    await page.keyboard.press("Space");
    await expect(first).toBeChecked();
    await expect(
      guide.getByRole("group", { name: /what would you most like to do/i }),
    ).toBeVisible();
    const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
    try {
      const noScript = await context.newPage();
      await noScript.goto("/");
      await expect(noScript.locator("#home-course-finder")).toContainText(
        "This interactive guide needs JavaScript",
      );
      await expect(
        noScript
          .locator("#home-course-finder")
          .getByRole("link", { name: "browse all courses", exact: true }),
      ).toHaveAttribute("href", "/classes");
    } finally {
      await context.close();
    }
  });

  test("visitor fills the full application form end-to-end", async ({ page }) => {
    const email = `e2e.apply.${Date.now()}@example.com`;

    await page.goto("/apply");
    await expect(page).toHaveTitle(/Register for a course/);

    // Programme, schedule preference and plan preference; no money is collected.
    await page.getByRole("button", { name: /microsoft office/i }).click();
    await page.getByRole("button", { name: /continue/i }).click();
    await page.getByRole("button", { name: /^continue/i }).click();
    await page.getByRole("button", { name: /^continue/i }).click();
    await expect(page.locator("#firstName")).toBeVisible();

    // Applicant details
    await page.locator("#firstName").fill("E2E");
    await page.locator("#lastName").fill("Tester");
    await page.locator("#email").fill(email);
    await page.locator("#phone").fill("+2349058628386");

    await page.locator("#city").click();
    await page.getByRole("option", { name: /lagos/i }).click();

    await page.locator("#experienceLevel").click();
    await page.getByRole("option", { name: /beginner|no experience/i }).click();

    await page.getByRole("button", { name: /^continue/i }).click();
    for (const consent of await page.getByRole("checkbox").all()) await consent.check();
    await page.getByRole("button", { name: /submit registration/i }).click();

    await expect(page.getByRole("heading", { name: /application received/i })).toBeVisible({
      timeout: 30_000,
    });
    const ref = await page
      .getByText(/CEA-\d{4}-[A-Z0-9]+/i)
      .first()
      .textContent();
    if (!ref) throw new Error("no application reference shown after submit");
  });

  test("contact form submits", async ({ page }) => {
    const email = `e2e.contact.${Date.now()}@example.com`;
    await page.goto("/contact");
    await expect(page).toHaveTitle(/Contact/);
    await page.locator("#name").fill("E2E Visitor");
    await page.locator("#email").fill(email);
    await page.locator("#message").fill("E2E smoke test message.");
    await page
      .getByRole("button", { name: /send|submit/i })
      .first()
      .click();
    await expect(page.getByText(/thanks|received|sent|message/i).first()).toBeVisible({
      timeout: 20_000,
    });
  });

  test("status lookup accepts a reference without requesting personal details", async ({
    page,
  }) => {
    await page.goto("/apply/status");
    await page.locator("#appId").fill("CEA-2026-TEST99");
    await page.getByRole("button", { name: /track application/i }).click();
    await page.waitForURL("**/apply/status/CEA-2026-TEST99");
    await expect(page.getByText("Pay in full", { exact: true })).toHaveCount(0);
  });
});
