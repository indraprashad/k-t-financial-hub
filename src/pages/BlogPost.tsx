import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, User, Tag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "./Blog";

const articleContent: Record<string, string[]> = {
  "top-tax-tips-small-business": [
    "Running a small business comes with many tax obligations, but also numerous opportunities to reduce your tax bill legally. With the right strategies in place, you can save thousands each year.",
    "**1. Separate Your Business and Personal Finances** — Open a dedicated business bank account and credit card. This makes bookkeeping easier and ensures you don't miss deductible business expenses.",
    "**2. Track Every Business Expense** — From office supplies to software subscriptions, every business expense is potentially deductible. Use accounting software to automate tracking and categorization.",
    "**3. Understand Your Deductible Expenses** — Common deductions include home office expenses, vehicle use, professional development, business travel, marketing costs, and professional fees (accounting, legal).",
    "**4. Contribute to a Retirement Plan** — Business owners can reduce taxable income by contributing to retirement accounts. Consult with a financial advisor to choose the right plan structure.",
    "**5. Consider Your Business Structure** — The structure you choose (sole proprietor, LLC, S-Corp, C-Corp) significantly impacts your tax obligations. Review your structure annually as your business grows.",
    "**6. Hire Family Members** — If you hire family members who genuinely work for your business, their wages may be deductible and can shift income to lower tax brackets.",
    "**7. Manage Your Timing of Income and Expenses** — If you're on a cash basis, you can accelerate deductible expenses into the current year or defer income to the following year to manage your tax liability.",
    "**8. Take Advantage of Available Tax Credits** — Research and development credits, energy efficiency credits, and employment incentive credits can significantly reduce your tax bill.",
    "**9. Keep Meticulous Records** — The IRS or tax authority may audit your return. Maintaining organized records for at least 7 years protects you and validates your deductions.",
    "**10. Work With a Certified Tax Professional** — Tax laws change frequently. A qualified CPA or tax advisor can help you navigate the complexities, avoid penalties, and implement strategies you might not know about.",
    "The key takeaway is that proactive tax planning throughout the year — not just at tax time — is what separates businesses that pay too much in taxes from those that optimize their position legally and effectively.",
  ],
  "understanding-financial-statements": [
    "Financial statements are the language of business. Whether you're applying for a loan, seeking investors, or simply trying to understand the health of your business, knowing how to read financial statements is an essential skill.",
    "**The Balance Sheet** — This document shows your company's financial position at a specific point in time. It has three components: Assets (what you own), Liabilities (what you owe), and Equity (the owner's stake). The fundamental equation is: Assets = Liabilities + Equity.",
    "**The Income Statement** — Also known as the Profit & Loss (P&L) statement, this shows your revenues, expenses, and resulting net income (or loss) over a period of time. It answers the question: 'Was the business profitable?'",
    "**The Cash Flow Statement** — Profitability and cash flow are not the same thing. A business can be profitable on paper but still run out of cash. The cash flow statement shows actual cash movements across operating, investing, and financing activities.",
    "**Key Ratios to Understand** — Ratio analysis helps you benchmark performance. The current ratio (current assets / current liabilities) measures short-term liquidity. Gross margin (gross profit / revenue) measures production efficiency. Return on Equity shows how effectively management uses shareholder capital.",
    "By regularly reviewing these statements — ideally monthly — you can identify trends early, make data-driven decisions, and position your business for sustainable growth.",
  ],
  "scaling-your-startup-financially": [
    "Scaling a startup is exciting, but the path is littered with companies that grew too fast and ran out of cash. Cash flow management is the discipline that separates sustainable startups from cautionary tales.",
    "**Understand Your Burn Rate** — Know exactly how much cash your company spends each month. Calculate your runway (months of cash remaining) and always maintain a buffer of at least 6 months.",
    "**Revenue-Based Scaling** — Tie hiring and spending decisions to revenue milestones, not projections. Only spend on what directly drives revenue or is essential for operations.",
    "**Manage Receivables Aggressively** — Invoice promptly, follow up on late payments, and consider offering early payment discounts. Poor receivables management is a leading cause of startup cash crises.",
    "**Negotiate Favorable Payment Terms** — Push for longer payment terms with suppliers while shortening terms for customers. This working capital optimization can dramatically improve cash flow.",
    "**Build a Cash Reserve** — Even profitable businesses face unexpected challenges. Maintain a reserve fund equivalent to 3-6 months of operating expenses.",
    "Sustainable scaling requires financial discipline. The startups that thrive are those that treat financial management as a core competency, not an afterthought.",
  ],
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
            <Button asChild className="bg-primary text-white">
              <Link to="/blog">Back to Blog</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const content = articleContent[post.slug] || [
    "This article is currently being prepared by our expert team. Check back soon for the full content.",
    "In the meantime, feel free to explore our other articles or contact us for personalized financial advice.",
  ];

  const related = blogPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 2);

  const categoryColors: Record<string, string> = {
    Tax: "bg-blue-100 text-blue-700",
    Accounting: "bg-green-100 text-green-700",
    Business: "bg-amber-100 text-amber-700",
  };

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-primary pt-32 pb-0">
        <div className="container-wide max-w-4xl">
          <div className="flex flex-col gap-4 mb-6">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors w-fit"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[post.category]}`}>
              {post.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm pb-8">
            <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{post.author}</span>
            <span>{post.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="bg-primary">
        <div className="container-wide max-w-4xl pb-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-72 md:h-96 object-cover rounded-t-2xl"
          />
        </div>
      </div>

      {/* Article Body */}
      <section className="section-padding bg-background">
        <div className="container-wide max-w-4xl">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12">
            {/* Content */}
            <article className="prose max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 font-medium border-l-4 border-accent pl-4">
                {post.excerpt}
              </p>

              {content.map((para, i) => {
                const isBold = para.startsWith("**");
                if (isBold) {
                  const [boldPart, ...rest] = para.split("** — ");
                  return (
                    <div key={i} className="mb-6">
                      <h3 className="font-bold text-primary text-xl mb-2">
                        {boldPart.replace(/^\*\*/, "")}
                      </h3>
                      {rest.length > 0 && (
                        <p className="text-foreground/80 leading-relaxed">{rest.join(" — ")}</p>
                      )}
                    </div>
                  );
                }
                return (
                  <p key={i} className="text-foreground/80 leading-relaxed mb-6">{para}</p>
                );
              })}
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Author Card */}
              <div className="bg-card border rounded-xl p-6">
                <h4 className="font-semibold text-primary mb-3">About the Author</h4>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-sm text-primary">{post.author}</div>
                    <div className="text-xs text-muted-foreground">K & T Expert</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Certified financial professional with expertise in {post.category.toLowerCase()} strategy and compliance.
                </p>
              </div>

              {/* CTA */}
              <div className="bg-primary rounded-xl p-6 text-white">
                <h4 className="font-semibold mb-2">Need Expert Advice?</h4>
                <p className="text-white/70 text-sm mb-4">
                  Book a free consultation with our specialists.
                </p>
                <Button
                  asChild
                  className="w-full bg-accent hover:bg-accent/90 text-white"
                >
                  <Link to="/contact">Book Consultation</Link>
                </Button>
              </div>

              {/* Categories */}
              <div className="bg-card border rounded-xl p-6">
                <h4 className="font-semibold text-primary mb-3">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {["Tax", "Accounting", "Business"].map((cat) => (
                    <Link
                      key={cat}
                      to={`/blog`}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 ${categoryColors[cat]}`}
                    >
                      <Tag className="w-3 h-3" />{cat}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="section-padding bg-surface">
          <div className="container-wide">
            <h2 className="text-2xl font-bold text-primary mb-8">Related Articles</h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {related.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group bg-card border rounded-xl overflow-hidden hover-lift flex"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-32 object-cover shrink-0"
                  />
                  <div className="p-4 flex flex-col justify-between">
                    <div>
                      <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2 ${categoryColors[post.category]}`}>
                        {post.category}
                      </span>
                      <h4 className="font-bold text-primary text-sm leading-snug group-hover:text-accent transition-colors">
                        {post.title}
                      </h4>
                    </div>
                    <span className="text-accent text-xs font-medium flex items-center gap-1 mt-2">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
