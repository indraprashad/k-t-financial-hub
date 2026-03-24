import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen, Calculator, ClipboardList, TrendingUp, BarChart2,
  Users, Building2, Star, ChevronLeft, ChevronRight, ArrowRight,
  Shield, Award, Clock, CheckCircle2, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookConsultationModal from "@/components/BookConsultationModal";

const services = [
  { icon: Calculator, title: "Accounting & Bookkeeping", desc: "Accurate financial records and bookkeeping tailored to your business needs." },
  { icon: ClipboardList, title: "Audit & Financial Reporting", desc: "Independent audits and comprehensive financial statements you can trust." },
  { icon: FileText, title: "Tax Filing & Compliance", desc: "Stress-free tax preparation and full regulatory compliance support." },
  { icon: BarChart2, title: "Business Advisory", desc: "Strategic insights to drive growth and maximize business performance." },
  { icon: TrendingUp, title: "Financial Planning", desc: "Long-term financial strategies aligned with your personal or business goals." },
  { icon: Users, title: "Payroll Management", desc: "Seamless payroll processing, ensuring accuracy and compliance every cycle." },
];

const stats = [
  { value: "15+", label: "Years of Experience" },
  { value: "500+", label: "Clients Served" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "50+", label: "Industry Experts" },
];

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "CEO, Mitchell Retail Group",
    text: "K & T Financial transformed our financial operations. Their audit team is meticulous and professional. We've seen a 30% reduction in compliance costs since partnering with them.",
    rating: 5,
  },
  {
    name: "David Okonkwo",
    role: "Founder, TechBridge Solutions",
    text: "The business advisory services helped us scale efficiently. Their tax planning saved us significantly. I highly recommend K & T to any serious business owner.",
    rating: 5,
  },
  {
    name: "Jennifer Lau",
    role: "Individual Investor",
    text: "My financial planning journey has been seamless with K & T. They truly understand both personal and investment goals. The team is always responsive and incredibly knowledgeable.",
    rating: 5,
  },
  {
    name: "Marcus Thompson",
    role: "Director, Thompson & Associates",
    text: "Outstanding payroll management and bookkeeping. Our books have never been more accurate. K & T is a trusted partner for our growing firm.",
    rating: 5,
  },
];

const faqs = [
  {
    q: "What industries do you serve?",
    a: "We serve a broad range of industries including retail, technology, healthcare, real estate, manufacturing, and professional services. Our team tailors financial strategies to your specific sector.",
  },
  {
    q: "How do I get started with K & T Financial?",
    a: "Simply book a free consultation via our website or call our office. We'll assess your needs and recommend the right services for your personal or business goals.",
  },
  {
    q: "Do you offer services for startups and small businesses?",
    a: "Absolutely. We specialize in helping startups establish strong financial foundations, from business registration support to bookkeeping, tax compliance, and financial planning.",
  },
  {
    q: "How often will I receive financial reports?",
    a: "Report frequency is tailored to your needs — monthly, quarterly, or annually. We also provide real-time updates via our client portal for premium clients.",
  },
  {
    q: "Are your consultants certified professionals?",
    a: "Yes. All our consultants are certified accountants (CPA/ACCA), registered auditors, and licensed tax professionals with years of relevant industry experience.",
  },
];

export default function Index() {
  const [current, setCurrent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % testimonials.length), []);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  const t = testimonials[current];

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center bg-primary overflow-hidden pt-20">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
          backgroundSize: "60px 60px"
        }} />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent" />

        <div className="container-wide relative z-10 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-1.5 mb-6">
              <Award className="w-4 h-4 text-accent" />
              <span className="text-accent text-sm font-medium">Trusted Financial Experts Since 2009</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Empowering Your
              <span className="block text-gradient-gold">Financial Growth</span>
            </h1>

            <p className="text-white/75 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
              Expert accounting, audit, tax, and business advisory services for individuals and businesses.
              We help you navigate financial complexities with confidence and clarity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => setModalOpen(true)}
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white font-semibold text-base px-8 shadow-gold"
              >
                Get Free Consultation
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 text-white bg-white/10 font-semibold text-base px-8"
              >
                <Link to="/services">Explore Our Services</Link>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-6 mt-12">
              {[
                { icon: Shield, text: "ISO Certified" },
                { icon: Award, text: "Award Winning" },
                { icon: CheckCircle2, text: "CPA Registered" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-white/60 text-sm">
                  <Icon className="w-4 h-4 text-accent" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60">
          <div className="w-px h-8 bg-gradient-to-b from-white/0 to-white/60 animate-pulse" />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-accent py-12">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{s.value}</div>
                <div className="text-white/80 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-surface">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">Comprehensive Financial Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From bookkeeping to strategic advisory, our full suite of services is designed to support every stage of your financial journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-card border rounded-xl p-6 hover-lift group cursor-pointer"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                  <Icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                </div>
                <h3 className="font-semibold text-primary text-lg mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{desc}</p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1 text-accent text-sm font-medium hover:gap-2 transition-all"
                >
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, white 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }} />
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-accent font-semibold text-sm uppercase tracking-widest">Why Choose K & T</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">Your Trusted Financial Partner</h2>
              <p className="text-white/70 leading-relaxed mb-8">
                We combine deep expertise, cutting-edge tools, and a client-first approach to deliver financial solutions that truly make a difference.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Shield, title: "Certified & Regulated", text: "All advisors are CPA/ACCA certified and fully regulated." },
                  { icon: Clock, title: "Timely Delivery", text: "We meet deadlines — always. Your compliance is our priority." },
                  { icon: Users, title: "Personalized Service", text: "Dedicated account managers who understand your unique needs." },
                  { icon: Award, title: "Proven Track Record", text: "500+ satisfied clients across diverse industries." },
                ].map(({ icon: Icon, title, text }) => (
                  <div key={title} className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-0.5">{title}</h4>
                      <p className="text-white/60 text-sm">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format&fit=crop&q=80"
                alt="Financial professionals working"
                className="rounded-2xl w-full object-cover h-[420px] shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent rounded-xl p-5 shadow-gold">
                <div className="text-white font-bold text-2xl">15+</div>
                <div className="text-white/80 text-sm">Years Trusted</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-surface">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">Client Stories</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">What Our Clients Say</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Real stories from clients who trust K & T Financial Consultancy to guide their financial success.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-card border rounded-2xl p-8 md:p-12 shadow-navy relative">
              <div className="text-accent text-5xl leading-none font-serif absolute top-6 left-8 opacity-30">"</div>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground/80 text-lg leading-relaxed mb-6 italic">{t.text}</p>
              <div>
                <div className="font-semibold text-primary">{t.name}</div>
                <div className="text-muted-foreground text-sm">{t.role}</div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button onClick={prev} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-accent w-6" : "bg-border"}`}
                  />
                ))}
              </div>
              <button onClick={next} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border rounded-xl px-6 bg-card"
                >
                  <AccordionTrigger className="text-primary font-semibold text-left hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section-padding bg-accent">
        <div className="container-wide text-center">
          <BookOpen className="w-12 h-12 text-white/80 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
            Book a free, no-obligation consultation with our expert team today and take the first step toward financial clarity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setModalOpen(true)}
              size="lg"
              className="bg-white text-accent hover:bg-white/90 font-semibold text-base px-8"
            >
              Book Free Consultation
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white bg-white/10 font-semibold text-base px-8"
            >
              <Link to="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <BookConsultationModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
