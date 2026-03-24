import { Link } from "react-router-dom";
import { TrendingUp, Eye, Heart, Shield, Award, Users, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookConsultationModal from "@/components/BookConsultationModal";
import { useState } from "react";

const team = [
  {
    name: "Katherine Johnson",
    role: "Managing Director & CPA",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    bio: "15+ years in financial consulting, specializing in corporate audit and tax strategy.",
  },
  {
    name: "Thomas Osei",
    role: "Head of Tax & Compliance",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
    bio: "Expert in international tax law and regulatory compliance for SMEs and corporations.",
  },
  {
    name: "Amara Nwosu",
    role: "Senior Financial Advisor",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    bio: "Specializes in investment advisory, financial planning, and business development strategy.",
  },
  {
    name: "James Whitfield",
    role: "Audit & Assurance Manager",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    bio: "Brings rigorous audit methodology and deep industry insight to every engagement.",
  },
];

const milestones = [
  { year: "2009", text: "K & T Financial Consultancy founded with a vision to democratize quality financial advice." },
  { year: "2012", text: "Expanded services to include full audit and financial reporting division." },
  { year: "2015", text: "Reached milestone of 200 active clients across 10 industries." },
  { year: "2018", text: "Launched payroll management and business registration support services." },
  { year: "2021", text: "Awarded 'Best Financial Consultancy' by the Regional Business Excellence Awards." },
  { year: "2024", text: "Surpassed 500 clients and expanded team to 50+ certified professionals." },
];

const values = [
  { icon: Shield, title: "Integrity", text: "We operate with unwavering honesty and ethical standards in every engagement." },
  { icon: Award, title: "Excellence", text: "We deliver exceptional quality in every service, always exceeding expectations." },
  { icon: Users, title: "Client-First", text: "Your success is our success. We build lasting partnerships built on trust." },
  { icon: Clock, title: "Reliability", text: "Consistent, timely delivery you can count on — every time." },
];

export default function About() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Navbar />

      {/* Page Hero */}
      <section className="bg-primary pt-32 pb-16">
        <div className="container-wide text-center">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">About Us</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">Who We Are</h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
            A team of certified financial professionals dedicated to empowering clients with clarity, strategy, and results-driven advice.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="section-padding bg-surface">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-accent font-semibold text-sm uppercase tracking-widest">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-6">Building Financial Confidence Since 2009</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  K & T Financial Consultancy was founded with a singular purpose: to make world-class financial expertise accessible to individuals and businesses of all sizes. What started as a boutique accounting firm has grown into a full-service financial consultancy trusted by over 500 clients.
                </p>
                <p>
                  Our team of certified accountants, auditors, and business advisors brings decades of collective experience across industries ranging from retail and technology to healthcare and real estate. We pride ourselves on understanding each client's unique context and crafting solutions that deliver measurable outcomes.
                </p>
                <p>
                  Today, K & T Financial stands as a beacon of trust, professionalism, and innovation in the financial services industry. We are more than consultants — we are strategic partners in your financial journey.
                </p>
              </div>
              <Button
                onClick={() => setModalOpen(true)}
                className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Work With Us <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&auto=format&fit=crop&q=80"
                alt="Our team in the office"
                className="rounded-2xl w-full object-cover h-[440px] shadow-navy"
              />
              <div className="absolute -bottom-5 -right-5 bg-primary text-white rounded-xl p-5 shadow-xl">
                <div className="text-3xl font-bold text-accent">500+</div>
                <div className="text-white/80 text-sm">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section-padding bg-primary text-white">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">Our Foundation</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Mission, Vision & Values</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-accent mb-3">Our Mission</h3>
              <p className="text-white/70 leading-relaxed">
                To provide exceptional financial services that empower clients to make informed decisions, achieve their goals, and build long-term wealth and business resilience.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-accent mb-3">Our Vision</h3>
              <p className="text-white/70 leading-relaxed">
                To be the most trusted financial consultancy in the region — recognized for our integrity, innovation, and the transformational impact we create for every client we serve.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, text }) => (
              <div key={title} className="text-center">
                <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <h4 className="font-bold text-lg mb-2">{title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-surface">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">Our Team</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">Meet Our Experts</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our leadership team brings together decades of experience in accounting, auditing, tax, and business strategy.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="relative mb-4 overflow-hidden rounded-2xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="font-bold text-primary text-lg">{member.name}</h4>
                <p className="text-accent text-sm font-medium mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">Key Milestones</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-6 mb-8">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <span className="text-accent font-bold text-xs">{m.year}</span>
                  </div>
                  {i < milestones.length - 1 && <div className="w-px h-full bg-border mt-2" />}
                </div>
                <div className="pb-8">
                  <div className="font-bold text-primary text-lg mb-1">{m.year}</div>
                  <p className="text-muted-foreground leading-relaxed">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-accent text-center">
        <div className="container-wide">
          <Heart className="w-10 h-10 text-white/80 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Growing Client Family</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            Experience the K & T difference. Book your free consultation today and see why over 500 clients trust us.
          </p>
          <Button
            onClick={() => setModalOpen(true)}
            size="lg"
            className="bg-white text-accent hover:bg-white/90 font-semibold text-base px-8"
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
