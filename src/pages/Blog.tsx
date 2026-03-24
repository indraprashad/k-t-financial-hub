import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Tag, ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const blogPosts = [
  {
    slug: "top-tax-tips-small-business",
    category: "Tax",
    title: "Top 10 Tax Tips Every Small Business Owner Should Know in 2024",
    excerpt:
      "Maximize your deductions, minimize your liability, and stay fully compliant with these essential tax strategies designed specifically for small business owners.",
    author: "Thomas Osei",
    date: "January 15, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=600&auto=format&fit=crop&q=80",
    featured: true,
  },
  {
    slug: "understanding-financial-statements",
    category: "Accounting",
    title: "Understanding Financial Statements: A Beginner's Guide for Business Owners",
    excerpt:
      "Financial statements can be intimidating. This guide breaks down the balance sheet, income statement, and cash flow statement into simple, actionable insights.",
    author: "Katherine Johnson",
    date: "February 3, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=600&auto=format&fit=crop&q=80",
    featured: false,
  },
  {
    slug: "scaling-your-startup-financially",
    category: "Business",
    title: "How to Scale Your Startup Without Running Out of Cash",
    excerpt:
      "Cash flow is the lifeblood of any startup. Learn the financial strategies that sustainable startups use to scale responsibly while maintaining liquidity.",
    author: "Amara Nwosu",
    date: "February 22, 2024",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop&q=80",
    featured: false,
  },
  {
    slug: "vat-compliance-guide",
    category: "Tax",
    title: "The Complete VAT Compliance Guide for Growing Businesses",
    excerpt:
      "From registration thresholds to quarterly filings and penalty avoidance — everything you need to know about VAT compliance for your growing business.",
    author: "Thomas Osei",
    date: "March 10, 2024",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
    featured: false,
  },
  {
    slug: "building-a-financial-forecast",
    category: "Business",
    title: "Building a Realistic Financial Forecast for Your Business in 5 Steps",
    excerpt:
      "A solid financial forecast is your roadmap to success. Learn how to create projections that investors trust and management can act on.",
    author: "Amara Nwosu",
    date: "March 28, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80",
    featured: false,
  },
  {
    slug: "payroll-mistakes-to-avoid",
    category: "Accounting",
    title: "7 Costly Payroll Mistakes Businesses Make (And How to Avoid Them)",
    excerpt:
      "Payroll errors can result in penalties, employee dissatisfaction, and audit risks. Discover the most common mistakes and the best practices to prevent them.",
    author: "James Whitfield",
    date: "April 5, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop&q=80",
    featured: false,
  },
];

const categories = ["All", "Tax", "Accounting", "Business"];
const categoryColors: Record<string, string> = {
  Tax: "bg-blue-100 text-blue-700",
  Accounting: "bg-green-100 text-green-700",
  Business: "bg-amber-100 text-amber-700",
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = blogPosts.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = blogPosts.find((p) => p.featured);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-primary pt-32 pb-16">
        <div className="container-wide text-center">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Blog & Insights</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">Financial Intelligence Hub</h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
            Expert insights on tax, accounting, and business strategy to help you stay informed and ahead of the curve.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="bg-surface py-12">
          <div className="container-wide">
            <div className="text-accent font-semibold text-sm uppercase tracking-widest mb-6">Featured Article</div>
            <Link
              to={`/blog/${featured.slug}`}
              className="group grid lg:grid-cols-2 gap-8 bg-card border rounded-2xl overflow-hidden shadow-navy hover-lift"
            >
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-8 flex flex-col justify-center">
                <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 w-fit ${categoryColors[featured.category]}`}>
                  {featured.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 group-hover:text-accent transition-colors leading-tight">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{featured.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>By {featured.author} · {featured.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{featured.readTime}</span>
                </div>
                <div className="mt-4 inline-flex items-center gap-1 text-accent font-semibold text-sm">
                  Read Article <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Filter & Search */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-10">
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-primary text-white"
                      : "bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {cat !== "All" && <Tag className="w-3.5 h-3.5" />}
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg font-medium mb-2">No articles found</p>
              <p className="text-sm">Try adjusting your search or filter.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group bg-card border rounded-xl overflow-hidden hover-lift"
                >
                  <div className="overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${categoryColors[post.category]}`}>
                      {post.category}
                    </span>
                    <h3 className="font-bold text-primary text-lg leading-snug mb-3 group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
                      <span>{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
