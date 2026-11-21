import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { AlertTriangle, ArrowLeft, Table } from "lucide-react";
import { PageShell, PageHero, CTASection, Eyebrow } from "@/components/marketing/shell";
import { ExcelFormulaLab } from "@/components/tools/excel-formula-lab";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/tools/excel-formula-lab")({
  head: () =>
    getPageHead({
      title: "CEA Spreadsheet & Formula Lab — Free Excel Practice",
      description:
        "Practise Excel and Google Sheets formulas (SUM, AVERAGE, IF, SUMIF, COUNTIF, VLOOKUP) live in your browser with Nigerian business workbooks and automatic grading.",
      path: "/tools/excel-formula-lab",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "CEA Spreadsheet & Formula Lab",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
      },
    }),
  component: ExcelFormulaLabPage,
});

function ExcelFormulaLabPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Free lab · Office & Spreadsheets"
        title={
          <>
            Excel formulas,{" "}
            <span className="font-serif text-primary font-normal italic">tested live.</span>
          </>
        }
        description="Click any cell, write formulas starting with = in the formula bar, and watch Nigerian shop sales, exam gradebooks, VAT invoices and POS totals recalculate instantly."
        meta={["SUM · AVERAGE · IF", "SUMIF · VLOOKUP", "6 auto-checked drills"]}
      >
        <Link
          to="/tools"
          className="text-muted-foreground hover:text-foreground mt-6 inline-flex items-center gap-1.5 text-sm font-medium"
        >
          <ArrowLeft className="size-4" /> All tools
        </Link>
      </PageHero>

      <section className="container-page py-12 md:py-16" aria-label="Spreadsheet formula lab">
        <ExcelFormulaLab />

        <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-2">
          <div className="border-foreground/10 bg-card rounded-2xl border p-6">
            <Eyebrow>
              <Table className="size-3.5" aria-hidden="true" /> Five formulas employers test first
            </Eyebrow>
            <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight">
              From shopkeeper ledger to office analyst
            </h2>
            <div className="text-muted-foreground mt-4 space-y-3 text-sm leading-relaxed">
              <p>
                <strong className="text-foreground">SUM &amp; AVERAGE:</strong> aggregate a column
                range like <code>=SUM(D2:D5)</code> instead of adding cells one by one with{" "}
                <code>+</code>, so inserting a new row never silently drops revenue.
              </p>
              <p>
                <strong className="text-foreground">IF:</strong> automate pass/fail or discount
                thresholds (<code>=IF(B2&gt;=50, &quot;Pass&quot;, &quot;Resit&quot;)</code>).
              </p>
              <p>
                <strong className="text-foreground">SUMIF &amp; COUNTIF:</strong> separate POS
                transfers from Paystack or cash settlements without manually filtering and copying
                rows.
              </p>
              <p>
                <strong className="text-foreground">VLOOKUP:</strong> fetch a course fee or SKU
                price from a master table so staff never type prices from memory.
              </p>
            </div>
          </div>

          <div className="border-foreground/10 bg-card rounded-2xl border p-6">
            <Eyebrow>
              <AlertTriangle className="size-3.5" aria-hidden="true" /> If it goes wrong
            </Eyebrow>
            <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight">
              Decoding #DIV/0!, #VALUE! and #REF!
            </h2>
            <div className="text-muted-foreground mt-4 space-y-3 text-sm leading-relaxed">
              <p>
                <strong className="text-foreground">#DIV/0!:</strong> your formula divided by zero
                or an empty cell. Check that your denominator range actually contains numbers.
              </p>
              <p>
                <strong className="text-foreground">#VALUE!:</strong> you mixed text into an
                arithmetic formula or forgot quotation marks around text like{" "}
                <code>&quot;Pass&quot;</code> inside <code>IF</code>.
              </p>
              <p>
                <strong className="text-foreground">#REF! or #N/A:</strong> your{" "}
                <code>VLOOKUP</code> column index is larger than the table width, or the lookup text
                has a spelling mismatch.
              </p>
              <p>
                <strong className="text-foreground">Clean totals during audits:</strong> keep raw
                numbers free of hand-typed currency symbols inside data cells — type{" "}
                <code>45000</code> instead of <code>N45,000</code> and let cell formatting display
                the Naira sign, otherwise <code>SUM</code> and <code>AVERAGE</code> skip text cells.
              </p>
              <p>
                <strong className="text-foreground">Verify assumptions with ROUND:</strong> Nigerian
                7.5% VAT calculations often leave fractional kobo behind; wrap tax lines in{" "}
                <code>=ROUND(amount * 0.075, 2)</code> so invoice totals reconcile to the exact
                Naira when paid via Paystack or bank transfer.
              </p>
            </div>
            <p className="text-muted-foreground mt-5 border-t pt-4 text-sm">
              Learn Word, Excel and PowerPoint in person in our{" "}
              <Link
                to="/classes/microsoft-office"
                className="text-primary font-semibold hover:underline"
              >
                Microsoft Office course
              </Link>{" "}
              or graduate to relational queries in{" "}
              <Link to="/tools/sql-datalab" className="text-primary font-semibold hover:underline">
                CEA DataLab
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Master Office tools employers actually pay for."
        description="CEA's Microsoft Office and Data Entry courses focus on real invoices, payroll sheets, lookup tables and business reports — two guided sessions a week."
        primary={{ label: "See Microsoft Office", to: "/classes/microsoft-office" }}
        secondary={{ label: "Apply for admission", to: "/apply" }}
      />
    </PageShell>
  );
}
