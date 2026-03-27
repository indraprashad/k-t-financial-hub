// ─── Central content store backed by localStorage ───────────────────────────
// All page static data lives here. Admin dashboard reads/writes via these helpers.

export interface HeroContent {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface StatItem { value: string; label: string }
export interface ServiceHighlight { title: string; desc: string }
export interface WhyItem { title: string; text: string }
export interface Testimonial { name: string; role: string; text: string; rating: number }
export interface FaqItem { q: string; a: string }
export interface CTABanner { title: string; subtitle: string }

export interface HomeContent {
  hero: HeroContent;
  stats: StatItem[];
  services: ServiceHighlight[];
  whyUs: { heading: string; subtitle: string; points: WhyItem[] };
  testimonials: Testimonial[];
  faqs: FaqItem[];
  cta: CTABanner;
}

export interface AboutContent {
  hero: { subtitle: string };
  story: { heading: string; paragraphs: string[] };
  mission: string;
  vision: string;
  team: { name: string; role: string; image: string; bio: string }[];
  milestones: { year: string; text: string }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
}

export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
  body?: string;
}

export interface ContactContent {
  phone: string;
  email: string;
  address: string[];
  hours: string[];
  mapSrc: string;
}

export interface ConsultationContent {
  services: string[];
  notificationEmail: string;
}

export interface SiteContent {
  home: HomeContent;
  about: AboutContent;
  services: ServiceItem[];
  blog: BlogPost[];
  contact: ContactContent;
  consultation: ConsultationContent;
}

// ─── Defaults ────────────────────────────────────────────────────────────────
const DEFAULT: SiteContent = {
  home: {
    hero: {
      badge: "Trusted Financial Experts Since 2009",
      title: "Empowering Your",
      titleHighlight: "Financial Growth",
      subtitle:
        "Expert accounting, audit, tax, and business advisory services for individuals and businesses. We help you navigate financial complexities with confidence and clarity.",
      ctaPrimary: "Get Free Consultation",
      ctaSecondary: "Explore Our Services",
    },
    stats: [
      { value: "15+", label: "Years of Experience" },
      { value: "500+", label: "Clients Served" },
      { value: "98%", label: "Client Satisfaction" },
      { value: "50+", label: "Industry Experts" },
    ],
    services: [
      { title: "Accounting & Bookkeeping", desc: "Accurate financial records and bookkeeping tailored to your business needs." },
      { title: "Audit & Financial Reporting", desc: "Independent audits and comprehensive financial statements you can trust." },
      { title: "Tax Filing & Compliance", desc: "Stress-free tax preparation and full regulatory compliance support." },
      { title: "Business Advisory", desc: "Strategic insights to drive growth and maximize business performance." },
      { title: "Financial Planning", desc: "Long-term financial strategies aligned with your personal or business goals." },
      { title: "Payroll Management", desc: "Seamless payroll processing, ensuring accuracy and compliance every cycle." },
    ],
    whyUs: {
      heading: "Your Trusted Financial Partner",
      subtitle:
        "We combine deep expertise, cutting-edge tools, and a client-first approach to deliver financial solutions that truly make a difference.",
      points: [
        { title: "Certified & Regulated", text: "All advisors are CPA/ACCA certified and fully regulated." },
        { title: "Timely Delivery", text: "We meet deadlines — always. Your compliance is our priority." },
        { title: "Personalized Service", text: "Dedicated account managers who understand your unique needs." },
        { title: "Proven Track Record", text: "500+ satisfied clients across diverse industries." },
      ],
    },
    testimonials: [
      { name: "Sarah Mitchell", role: "CEO, Mitchell Retail Group", text: "K & T Financial transformed our financial operations. Their audit team is meticulous and professional. We've seen a 30% reduction in compliance costs since partnering with them.", rating: 5 },
      { name: "David Okonkwo", role: "Founder, TechBridge Solutions", text: "The business advisory services helped us scale efficiently. Their tax planning saved us significantly. I highly recommend K & T to any serious business owner.", rating: 5 },
      { name: "Jennifer Lau", role: "Individual Investor", text: "My financial planning journey has been seamless with K & T. They truly understand both personal and investment goals. The team is always responsive and incredibly knowledgeable.", rating: 5 },
      { name: "Marcus Thompson", role: "Director, Thompson & Associates", text: "Outstanding payroll management and bookkeeping. Our books have never been more accurate. K & T is a trusted partner for our growing firm.", rating: 5 },
    ],
    faqs: [
      { q: "What industries do you serve?", a: "We serve a broad range of industries including retail, technology, healthcare, real estate, manufacturing, and professional services. Our team tailors financial strategies to your specific sector." },
      { q: "How do I get started with K & T Financial?", a: "Simply book a free consultation via our website or call our office. We'll assess your needs and recommend the right services for your personal or business goals." },
      { q: "Do you offer services for startups and small businesses?", a: "Absolutely. We specialize in helping startups establish strong financial foundations, from business registration support to bookkeeping, tax compliance, and financial planning." },
      { q: "How often will I receive financial reports?", a: "Report frequency is tailored to your needs — monthly, quarterly, or annually. We also provide real-time updates via our client portal for premium clients." },
      { q: "Are your consultants certified professionals?", a: "Yes. All our consultants are certified accountants (CPA/ACCA), registered auditors, and licensed tax professionals with years of relevant industry experience." },
    ],
    cta: {
      title: "Ready to Take Control of Your Finances?",
      subtitle: "Book a free, no-obligation consultation with our expert team today and take the first step toward financial clarity.",
    },
  },
  about: {
    hero: { subtitle: "A team of certified financial professionals dedicated to empowering clients with clarity, strategy, and results-driven advice." },
    story: {
      heading: "Building Financial Confidence Since 2009",
      paragraphs: [
        "K & T Financial Consultancy was founded with a singular purpose: to make world-class financial expertise accessible to individuals and businesses of all sizes. What started as a boutique accounting firm has grown into a full-service financial consultancy trusted by over 500 clients.",
        "Our team of certified accountants, auditors, and business advisors brings decades of collective experience across industries ranging from retail and technology to healthcare and real estate. We pride ourselves on understanding each client's unique context and crafting solutions that deliver measurable outcomes.",
        "Today, K & T Financial stands as a beacon of trust, professionalism, and innovation in the financial services industry. We are more than consultants — we are strategic partners in your financial journey.",
      ],
    },
    mission:
      "To provide exceptional financial services that empower clients to make informed decisions, achieve their goals, and build long-term wealth and business resilience.",
    vision:
      "To be the most trusted financial consultancy in the region — recognized for our integrity, innovation, and the transformational impact we create for every client we serve.",
    team: [
      { name: "Katherine Johnson", role: "Managing Director & CPA", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80", bio: "15+ years in financial consulting, specializing in corporate audit and tax strategy." },
      { name: "Thomas Osei", role: "Head of Tax & Compliance", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80", bio: "Expert in international tax law and regulatory compliance for SMEs and corporations." },
      { name: "Amara Nwosu", role: "Senior Financial Advisor", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80", bio: "Specializes in investment advisory, financial planning, and business development strategy." },
      { name: "James Whitfield", role: "Audit & Assurance Manager", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80", bio: "Brings rigorous audit methodology and deep industry insight to every engagement." },
    ],
    milestones: [
      { year: "2009", text: "K & T Financial Consultancy founded with a vision to democratize quality financial advice." },
      { year: "2012", text: "Expanded services to include full audit and financial reporting division." },
      { year: "2015", text: "Reached milestone of 200 active clients across 10 industries." },
      { year: "2018", text: "Launched payroll management and business registration support services." },
      { year: "2021", text: "Awarded 'Best Financial Consultancy' by the Regional Business Excellence Awards." },
      { year: "2024", text: "Surpassed 500 clients and expanded team to 50+ certified professionals." },
    ],
  },
  services: [
    { id: "accounting", title: "Accounting & Bookkeeping", tagline: "Accurate Books. Clear Insights.", description: "Reliable accounting and bookkeeping services to keep your finances organized, compliant, and decision-ready. We manage everything from daily transactions to monthly reconciliations and financial summaries.", features: ["Monthly bank reconciliations", "Accounts payable & receivable management", "General ledger maintenance", "Financial statements preparation", "Cloud accounting software setup (QuickBooks, Xero)", "Cash flow management"], image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=600&auto=format&fit=crop&q=80" },
    { id: "audit", title: "Audit & Financial Reporting", tagline: "Independent. Accurate. Trustworthy.", description: "Our audit services provide independent assurance on your financial statements, giving stakeholders confidence in your financial position. We conduct statutory audits, internal audits, and special-purpose audits.", features: ["Statutory & external audits", "Internal audit & control reviews", "Financial statement preparation (IFRS/GAAP)", "Risk-based audit methodology", "Due diligence audits", "Audit committee support"], image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80" },
    { id: "tax", title: "Tax Filing & Compliance", tagline: "Minimize Liability. Maximize Compliance.", description: "Expert tax preparation and strategic planning to ensure you pay only what's required, file on time, and stay on the right side of tax authorities. We handle all tax types for individuals and businesses.", features: ["Individual & corporate tax returns", "VAT/GST registration & filing", "Tax planning & optimization", "Tax dispute resolution", "Payroll tax management", "International tax advisory"], image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=600&auto=format&fit=crop&q=80" },
    { id: "advisory", title: "Business Advisory & Consultancy", tagline: "Strategic Guidance for Sustainable Growth.", description: "We partner with business owners and executives to navigate challenges, identify opportunities, and build strategies that drive sustainable growth. Our advisors bring fresh perspectives backed by data.", features: ["Business strategy development", "Financial restructuring & turnaround", "Mergers, acquisitions & due diligence", "Market entry & feasibility analysis", "KPI & performance management", "Investor presentations & pitch decks"], image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop&q=80" },
    { id: "planning", title: "Financial Planning & Budgeting", tagline: "Plan Today. Secure Tomorrow.", description: "Comprehensive financial planning for individuals and organizations. We help you set financial goals, build realistic budgets, and create actionable roadmaps for long-term financial security and growth.", features: ["Personal financial planning", "Business budgeting & forecasting", "Investment & portfolio planning", "Retirement & succession planning", "Debt management strategies", "Cash flow projections"], image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80" },
    { id: "payroll", title: "Payroll Management", tagline: "On Time. Every Time.", description: "End-to-end payroll management services that ensure your employees are paid accurately and on time, every cycle. We handle all payroll complexities including statutory deductions and compliance reporting.", features: ["Monthly payroll processing", "Statutory deductions (tax, NI/SS)", "Payslip generation & distribution", "Payroll compliance & reporting", "Year-end reconciliations", "Integration with accounting software"], image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop&q=80" },
    { id: "registration", title: "Business Registration Support", tagline: "Launch Your Business the Right Way.", description: "Starting a business is exciting — but the paperwork doesn't have to be stressful. We guide entrepreneurs through every step of the business registration process, ensuring full legal and regulatory compliance from day one.", features: ["Company incorporation & registration", "Business name & trademark registration", "Tax identification & VAT registration", "Regulatory licensing assistance", "Corporate governance setup", "Bank account opening support"], image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&auto=format&fit=crop&q=80" },
  ],
  blog: [
    { slug: "top-tax-tips-small-business", category: "Tax", title: "Top 10 Tax Tips Every Small Business Owner Should Know in 2024", excerpt: "Maximize your deductions, minimize your liability, and stay fully compliant with these essential tax strategies designed specifically for small business owners.", author: "Thomas Osei", date: "January 15, 2024", readTime: "6 min read", image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=600&auto=format&fit=crop&q=80", featured: true, body: "This is the full article body for the tax tips post. Edit it in the admin dashboard." },
    { slug: "understanding-financial-statements", category: "Accounting", title: "Understanding Financial Statements: A Beginner's Guide for Business Owners", excerpt: "Financial statements can be intimidating. This guide breaks down the balance sheet, income statement, and cash flow statement into simple, actionable insights.", author: "Katherine Johnson", date: "February 3, 2024", readTime: "8 min read", image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=600&auto=format&fit=crop&q=80", featured: false, body: "This is the full article body. Edit it in the admin dashboard." },
    { slug: "scaling-your-startup-financially", category: "Business", title: "How to Scale Your Startup Without Running Out of Cash", excerpt: "Cash flow is the lifeblood of any startup. Learn the financial strategies that sustainable startups use to scale responsibly while maintaining liquidity.", author: "Amara Nwosu", date: "February 22, 2024", readTime: "7 min read", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop&q=80", featured: false, body: "This is the full article body. Edit it in the admin dashboard." },
    { slug: "vat-compliance-guide", category: "Tax", title: "The Complete VAT Compliance Guide for Growing Businesses", excerpt: "From registration thresholds to quarterly filings and penalty avoidance — everything you need to know about VAT compliance for your growing business.", author: "Thomas Osei", date: "March 10, 2024", readTime: "9 min read", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80", featured: false, body: "This is the full article body. Edit it in the admin dashboard." },
    { slug: "building-a-financial-forecast", category: "Business", title: "Building a Realistic Financial Forecast for Your Business in 5 Steps", excerpt: "A solid financial forecast is your roadmap to success. Learn how to create projections that investors trust and management can act on.", author: "Amara Nwosu", date: "March 28, 2024", readTime: "6 min read", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80", featured: false, body: "This is the full article body. Edit it in the admin dashboard." },
    { slug: "payroll-mistakes-to-avoid", category: "Accounting", title: "7 Costly Payroll Mistakes Businesses Make (And How to Avoid Them)", excerpt: "Payroll errors can result in penalties, employee dissatisfaction, and audit risks. Discover the most common mistakes and the best practices to prevent them.", author: "James Whitfield", date: "April 5, 2024", readTime: "5 min read", image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop&q=80", featured: false, body: "This is the full article body. Edit it in the admin dashboard." },
  ],
  contact: {
    phone: "+975 17836510",
    email: "ktfinancialconsultancy26@gmail.com",
    address: ["123 Financial District", "Business Avenue, Suite 500", "City, State 10001"],
    hours: ["Mon – Fri: 9:00 AM – 5:00 PM", "Saturday: 9:00 AM – 1:00 PM", "Sunday: Closed"],
    mapSrc: "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d283.849568359296!2d89.6386228280219!3d27.51130468617822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1staba%20kd%20shops!5e0!3m2!1sen!2sbt!4v1774332802855!5m2!1sen!2sbt",
  },
  consultation: {
    services: [
      "Accounting & Bookkeeping",
      "Audit & Financial Reporting",
      "Tax Filing & Compliance",
      "Business Advisory & Consultancy",
      "Financial Planning & Budgeting",
      "General Inquiry",
    ],
    notificationEmail: "indraprashadsharma4@gmail.com",
  },
};

const STORAGE_KEY = "kt_site_content";

export function getContent(): SiteContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<SiteContent>;
      // Deep-merge with defaults so new fields always exist
      return {
        home: { ...DEFAULT.home, ...parsed.home, hero: { ...DEFAULT.home.hero, ...parsed.home?.hero } },
        about: { ...DEFAULT.about, ...parsed.about },
        services: parsed.services ?? DEFAULT.services,
        blog: parsed.blog ?? DEFAULT.blog,
        contact: { ...DEFAULT.contact, ...parsed.contact },
        consultation: { ...DEFAULT.consultation, ...parsed.consultation },
      };
    }
  } catch (_) { /* ignore */ }
  return DEFAULT;
}

export function saveContent(data: SiteContent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function resetContent() {
  localStorage.removeItem(STORAGE_KEY);
}

// ─── Auth helpers ─────────────────────────────────────────────────────────────
const ADMIN_USER = "admin";
const ADMIN_PASS = "ktadmin2024";
const SESSION_KEY = "kt_admin_session";

export function adminLogin(username: string, password: string): boolean {
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    sessionStorage.setItem(SESSION_KEY, "true");
    return true;
  }
  return false;
}

export function adminLogout() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function isAdminLoggedIn(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === "true";
}
