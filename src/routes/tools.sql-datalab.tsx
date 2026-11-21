import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, Database, FileSpreadsheet } from "lucide-react";
import { PageShell, PageHero, CTASection, Eyebrow } from "@/components/marketing/shell";
import { SqlDataLab } from "@/components/tools/sql-datalab";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/tools/sql-datalab")({
  head: () =>
    getPageHead({
      title: "CEA DataLab — Free SQL & CSV Analytics Sandbox",
      description:
        "Practise SQL queries (SELECT, JOIN, GROUP BY, HAVING) and CSV data cleaning directly in your browser on a realistic Nigerian business dataset with instant bar charts.",
      path: "/tools/sql-datalab",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "CEA DataLab & SQL Sandbox",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
      },
    }),
  component: SqlDataLabPage,
});

function SqlDataLabPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Free lab · Data Analytics & SQL"
        title={
          <>
            Ask better questions of{" "}
            <span className="font-serif text-primary font-normal italic">real tables.</span>
          </>
        }
        description="Write live SQL queries against a Nigerian retail and training database (customers, products, orders and Paystack/POS payments), inspect query charts, or audit messy CSV files — completely inside your browser."
        meta={["SQL sandbox", "Nigerian dataset", "CSV cleaner + charts"]}
      >
        <Link
          to="/tools"
          className="text-muted-foreground hover:text-foreground mt-6 inline-flex items-center gap-1.5 text-sm font-medium"
        >
          <ArrowLeft className="size-4" /> All tools
        </Link>
      </PageHero>

      <section className="container-page py-12 md:py-16" aria-label="CEA DataLab workspace">
        <SqlDataLab />

        <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-2">
          <div className="border-foreground/10 bg-card rounded-2xl border p-6">
            <Eyebrow>
              <Database className="size-3.5" aria-hidden="true" /> How SQL actually reads your query
            </Eyebrow>
            <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight">
              Write SELECT first, think FROM first
            </h2>
            <div className="text-muted-foreground mt-4 space-y-3 text-sm leading-relaxed">
              <p>
                Beginners often write SQL top-to-bottom without realising the database engine runs
                clauses in a different order: <code>FROM</code> and <code>JOIN</code> assemble the
                rows first, <code>WHERE</code> filters individual rows, <code>GROUP BY</code>{" "}
                collects buckets, <code>HAVING</code> filters those buckets, <code>SELECT</code>{" "}
                computes the columns, and <code>ORDER BY</code> / <code>LIMIT</code> sort and trim
                the final table.
              </p>
              <p>
                That explains why an alias you create in <code>SELECT</code> (such as{" "}
                <code>SUM(settled_ngn) AS total_settled</code>) works in <code>ORDER BY</code> but
                should not be relied upon inside <code>WHERE</code>.
              </p>
              <p>
                <strong className="text-foreground">Real reconciliation workflow:</strong> try
                joining <code>orders</code> with <code>payments</code> and comparing{" "}
                <code>total_ngn</code> against <code>settled_ngn</code> — the gap reveals Paystack
                and POS transaction charges across Nigerian payment channels.
              </p>
            </div>
          </div>

          <div className="border-foreground/10 bg-card rounded-2xl border p-6">
            <Eyebrow>
              <FileSpreadsheet className="size-3.5" aria-hidden="true" /> If it goes wrong
            </Eyebrow>
            <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight">
              Three SQL bugs every Nigerian data analyst hits
            </h2>
            <div className="text-muted-foreground mt-4 space-y-3 text-sm leading-relaxed">
              <p>
                <strong className="text-foreground">Missing single quotes on text:</strong> write{" "}
                <code>WHERE city = &apos;Port Harcourt&apos;</code>, not{" "}
                <code>WHERE city = Port Harcourt</code>. Unquoted words are treated as column names.
              </p>
              <p>
                <strong className="text-foreground">WHERE vs HAVING confusion:</strong> use{" "}
                <code>WHERE</code> before grouping (e.g.,{" "}
                <code>order_status = &apos;paid&apos;</code>) and <code>HAVING</code> after grouping
                (e.g., <code>HAVING COUNT(*) &gt;= 2</code>).
              </p>
              <p>
                <strong className="text-foreground">INNER JOIN hides unpaid orders:</strong> if an
                order has no matching row in <code>payments</code>, an <code>INNER JOIN</code> drops
                it silently. Switch to <code>LEFT JOIN ... WHERE p.payment_id IS NULL</code> when
                auditing pending or refunded transactions.
              </p>
            </div>
            <p className="text-muted-foreground mt-5 border-t pt-4 text-sm">
              Want full Excel, Power BI and SQL mentorship? See the{" "}
              <Link
                to="/classes/data-analytics"
                className="text-primary font-semibold hover:underline"
              >
                Data Analytics course
              </Link>{" "}
              or test formulas in{" "}
              <Link
                to="/tools/excel-formula-lab"
                className="text-primary font-semibold hover:underline"
              >
                CEA Spreadsheet Lab
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Turn raw spreadsheets into business decisions."
        description="CEA Data Analytics covers Excel, SQL, Python, Power BI and executive reporting using realistic Nigerian retail, fintech and operations datasets."
        primary={{ label: "See Data Analytics", to: "/classes/data-analytics" }}
        secondary={{ label: "Apply for admission", to: "/apply" }}
      />
    </PageShell>
  );
}
