import { Link } from "react-router-dom";
import { TrendingUp, Eye, Heart, Shield, Award, Users, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookConsultationModal from "@/components/BookConsultationModal";
import { useState, useEffect } from "react";
import { getContent, AboutContent } from "@/lib/contentStore";

const VALUE_ICONS = [Shield, Award, Users, Clock];

export default function About() {
  const [modalOpen, setModalOpen] = useState(false);
  const [content, setContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const siteContent = await getContent();
        setContent(siteContent.about);
      } catch (error) {
        console.error('Error loading about content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  if (loading || !content) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading content...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const { hero, story, mission, vision, team, milestones } = content;

  const values = [
    { icon: Shield, title: "Integrity", text: "We operate with unwavering honesty and ethical standards in every engagement." },
    { icon: Award, title: "Excellence", text: "We deliver exceptional quality in every service, always exceeding expectations." },
    { icon: Users, title: "Client-First", text: "Your success is our success. We build lasting partnerships built on trust." },
    { icon: Clock, title: "Reliability", text: "Consistent, timely delivery you can count on — every time." },
  ];

  return (
    <>
      <Navbar />

      {/* Page Hero */}
      <section className="bg-primary pt-32 pb-16">
        <div className="container-wide text-center">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">About Us</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">Who We Are</h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">{hero.subtitle}</p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="section-padding bg-surface">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-accent font-semibold text-sm uppercase tracking-widest">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-6">{story.heading}</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {story.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <Button onClick={() => setModalOpen(true)} className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
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
              <p className="text-white/70 leading-relaxed">{mission}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-accent mb-3">Our Vision</h3>
              <p className="text-white/70 leading-relaxed">{vision}</p>
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
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-64 bg-primary/10 flex items-center justify-center">
                      <Users className="w-12 h-12 text-primary/30" />
                    </div>
                  )}
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
              <div key={m.year + i} className="flex gap-6 mb-8">
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
          <Button onClick={() => setModalOpen(true)} size="lg" className="bg-white text-accent hover:bg-white/90 font-semibold text-base px-8">
            Book Free Consultation
          </Button>
        </div>
      </section>

      <Footer />
      <BookConsultationModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
