import { useState } from "react";
import {
  Calculator, ClipboardList, FileText, BarChart2, TrendingUp,
  Users, Building2, CheckCircle2, ArrowRight, Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookConsultationModal from "@/components/BookConsultationModal";

const services = [
  {
    id: "accounting",
    icon: Calculator,
    title: "Accounting & Bookkeeping",
    tagline: "Accurate Books. Clear Insights.",
    description:
      "Reliable accounting and bookkeeping services to keep your finances organized, compliant, and decision-ready. We manage everything from daily transactions to monthly reconciliations and financial summaries.",
    features: [
      "Monthly bank reconciliations",
      "Accounts payable & receivable management",
      "General ledger maintenance",
      "Financial statements preparation",
      "Cloud accounting software setup (QuickBooks, Xero)",
      "Cash flow management",
    ],
    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "audit",
    icon: ClipboardList,
    title: "Audit & Financial Reporting",
    tagline: "Independent. Accurate. Trustworthy.",
    description:
      "Our audit services provide independent assurance on your financial statements, giving stakeholders confidence in your financial position. We conduct statutory audits, internal audits, and special-purpose audits.",
    features: [
      "Statutory & external audits",
      "Internal audit & control reviews",
      "Financial statement preparation (IFRS/GAAP)",
      "Risk-based audit methodology",
      "Due diligence audits",
      "Audit committee support",
    ],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "tax",
    icon: FileText,
    title: "Tax Filing & Compliance",
    tagline: "Minimize Liability. Maximize Compliance.",
    description:
      "Expert tax preparation and strategic planning to ensure you pay only what's required, file on time, and stay on the right side of tax authorities. We handle all tax types for individuals and businesses.",
    features: [
      "Individual & corporate tax returns",
      "VAT/GST registration & filing",
      "Tax planning & optimization",
      "Tax dispute resolution",
      "Payroll tax management",
      "International tax advisory",
    ],
    image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "advisory",
    icon: BarChart2,
    title: "Business Advisory & Consultancy",
    tagline: "Strategic Guidance for Sustainable Growth.",
    description:
      "We partner with business owners and executives to navigate challenges, identify opportunities, and build strategies that drive sustainable growth. Our advisors bring fresh perspectives backed by data.",
    features: [
      "Business strategy development",
      "Financial restructuring & turnaround",
      "Mergers, acquisitions & due diligence",
      "Market entry & feasibility analysis",
      "KPI & performance management",
      "Investor presentations & pitch decks",
    ],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "planning",
    icon: TrendingUp,
    title: "Financial Planning & Budgeting",
    tagline: "Plan Today. Secure Tomorrow.",
    description:
      "Comprehensive financial planning for individuals and organizations. We help you set financial goals, build realistic budgets, and create actionable roadmaps for long-term financial security and growth.",
    features: [
      "Personal financial planning",
      "Business budgeting & forecasting",
      "Investment & portfolio planning",
      "Retirement & succession planning",
      "Debt management strategies",
      "Cash flow projections",
    ],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "payroll",
    icon: Users,
    title: "Payroll Management",
    tagline: "On Time. Every Time.",
    description:
      "End-to-end payroll management services that ensure your employees are paid accurately and on time, every cycle. We handle all payroll complexities including statutory deductions and compliance reporting.",
    features: [
      "Monthly payroll processing",
      "Statutory deductions (tax, NI/SS)",
      "Payslip generation & distribution",
      "Payroll compliance & reporting",
      "Year-end reconciliations",
      "Integration with accounting software",
    ],
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "registration",
    icon: Building2,
    title: "Business Registration Support",
    tagline: "Launch Your Business the Right Way.",
    description:
      "Starting a business is exciting — but the paperwork doesn't have to be stressful. We guide entrepreneurs through every step of the business registration process, ensuring full legal and regulatory compliance from day one.",
    features: [
      "Company incorporation & registration",
      "Business name & trademark registration",
      "Tax identification & VAT registration",
      "Regulatory licensing assistance",
      "Corporate governance setup",
      "Bank account opening support",
    ],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&auto=format&fit=crop&q=80",
  },
];

export default function Services() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-primary pt-32 pb-16">
        <div className="container-wide text-center">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Our Services</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Full-Spectrum Financial Services
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
            From day-to-day bookkeeping to complex strategic advisory, we offer end-to-end financial expertise tailored to your goals.
          </p>
        </div>
      </section>

      {/* Quick Nav */}
      <div className="bg-surface border-b sticky top-16 z-40">
        <div className="container-wide py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors whitespace-nowrap"
              >
                <s.icon className="w-3.5 h-3.5" />
                {s.title.split("&")[0].trim()}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="bg-background">
        {services.map((service, i) => (
          <section
            key={service.id}
            id={service.id}
            className={`section-padding ${i % 2 === 0 ? "bg-background" : "bg-surface"}`}
          >
            <div className="container-wide">
              <div className={`grid lg:grid-cols-2 gap-14 items-center ${i % 2 !== 0 ? "lg:[&>div:first-child]:order-2" : ""}`}>
                <div>
                  <div className="inline-flex items-center gap-2 bg-primary/10 rounded-xl px-3 py-1.5 mb-4">
                    <service.icon className="w-4 h-4 text-primary" />
                    <span className="text-primary text-sm font-semibold">Service {String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">{service.title}</h2>
                  <p className="text-accent font-semibold mb-4">{service.tagline}</p>
                  <p className="text-muted-foreground leading-relaxed mb-8">{service.description}</p>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm text-foreground/80">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => setModalOpen(true)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>

                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="rounded-2xl w-full h-80 object-cover shadow-navy"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-accent rounded-xl px-5 py-3 shadow-gold">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Download Resource */}
      <section className="section-padding bg-primary text-white text-center">
        <div className="container-wide max-w-2xl mx-auto">
          <Download className="w-12 h-12 text-accent mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Free Tax Compliance Checklist</h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            Download our comprehensive tax checklist to ensure you never miss a filing deadline or compliance requirement.
          </p>
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-white font-semibold px-8"
            onClick={() => alert("Tax checklist download would be available here.")}
          >
            <Download className="w-4 h-4 mr-2" />
            Download Free Checklist (PDF)
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-accent text-center">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-white mb-4">Not Sure Which Service You Need?</h2>
          <p className="text-white/80 max-w-lg mx-auto mb-8">
            Our team is happy to assess your situation and recommend the right services. Book a free consultation today.
          </p>
          <Button
            onClick={() => setModalOpen(true)}
            size="lg"
            className="bg-white text-accent hover:bg-white/90 font-semibold px-8"
          >
            Book Free Consultation
          </Button>
        </div>
      </section>

      <Footer />
      <BookConsultationModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
