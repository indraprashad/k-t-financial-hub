import { useState, useEffect } from "react";
import {
  Calculator, ClipboardList, FileText, BarChart2, TrendingUp,
  Users, Building2, CheckCircle2, ArrowRight, Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookConsultationModal from "@/components/BookConsultationModal";
import { getContent, ServiceItem } from "@/lib/contentStore";

const ICONS = [Calculator, ClipboardList, FileText, BarChart2, TrendingUp, Users, Building2];

export default function Services() {
  const [modalOpen, setModalOpen] = useState(false);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const siteContent = await getContent();
        setServices(siteContent.services);
      } catch (error) {
        console.error('Error loading services content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading services...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

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
            {services.map((s, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors whitespace-nowrap"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {s.title.split("&")[0].trim()}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="bg-background">
        {services.map((service, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <section
              key={service.id}
              id={service.id}
              className={`section-padding ${i % 2 === 0 ? "bg-background" : "bg-surface"}`}
            >
              <div className="container-wide">
                <div className={`grid lg:grid-cols-2 gap-14 items-center ${i % 2 !== 0 ? "lg:[&>div:first-child]:order-2" : ""}`}>
                  <div>
                    <div className="inline-flex items-center gap-2 bg-primary/10 rounded-xl px-3 py-1.5 mb-4">
                      <Icon className="w-4 h-4 text-primary" />
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

                    <Button onClick={() => setModalOpen(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Get Started <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="relative">
                    {service.image ? (
                      <img src={service.image} alt={service.title} className="rounded-2xl w-full h-80 object-cover shadow-navy" />
                    ) : (
                      <div className="rounded-2xl w-full h-80 bg-primary/10 flex items-center justify-center">
                        <Icon className="w-16 h-16 text-primary/20" />
                      </div>
                    )}
                    <div className="absolute -bottom-4 -right-4 bg-accent rounded-xl px-5 py-3 shadow-gold">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Download Resource */}
      <section className="section-padding bg-primary text-white text-center">
        <div className="container-wide max-w-2xl mx-auto">
          <Download className="w-12 h-12 text-accent mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Free Tax Compliance Checklist</h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            Download our comprehensive tax checklist to ensure you never miss a filing deadline or compliance requirement.
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-semibold px-8" onClick={() => alert("Tax checklist download would be available here.")}>
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
          <Button onClick={() => setModalOpen(true)} size="lg" className="bg-white text-accent hover:bg-white/90 font-semibold px-8">
            Book Free Consultation
          </Button>
        </div>
      </section>

      <Footer />
      <BookConsultationModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
