import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Tag, ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/contentStore";

const categories = ["All", "Tax", "Accounting", "Business"];
const categoryColors: Record<string, string> = {
  Tax: "bg-blue-100 text-blue-700",
  Accounting: "bg-green-100 text-green-700",
  Business: "bg-amber-100 text-amber-700",
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const blogPosts = getContent().blog;

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
              <img src={featured.image} alt={featured.title} className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="p-8 flex flex-col justify-center">
                <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 w-fit ${categoryColors[featured.category] ?? "bg-gray-100 text-gray-700"}`}>
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
              <Input placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
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
                <Link key={post.slug} to={`/blog/${post.slug}`} className="group bg-card border rounded-xl overflow-hidden hover-lift">
                  <div className="overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${categoryColors[post.category] ?? "bg-gray-100 text-gray-700"}`}>
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
