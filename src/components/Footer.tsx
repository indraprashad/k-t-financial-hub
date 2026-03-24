import { useState } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog & Insights", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const serviceLinks = [
  "Accounting & Bookkeeping",
  "Audit & Financial Reporting",
  "Tax Filing & Compliance",
  "Business Advisory",
  "Financial Planning",
  "Payroll Management",
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    toast({ title: "Subscribed!", description: "Thank you for subscribing to our newsletter." });
    setEmail("");
  };

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-lg leading-tight block">K & T</span>
                <span className="text-accent text-xs leading-tight block">Financial Consultancy</span>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Empowering individuals and businesses with expert financial guidance, strategic advice, and reliable accounting services.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label="Social link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-accent mb-4 text-sm uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-accent text-sm transition-colors flex items-center gap-1"
                  >
                    <span className="text-accent/60">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-accent mb-4 text-sm uppercase tracking-widest">Our Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="text-white/70 hover:text-accent text-sm transition-colors flex items-center gap-1"
                  >
                    <span className="text-accent/60">›</span> {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="font-semibold text-accent mb-4 text-sm uppercase tracking-widest">Contact Us</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2 text-sm text-white/70">
                <MapPin className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                <span>123 Financial District, Business Avenue, City, 10001</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href="tel:+11234567890" className="hover:text-accent transition-colors">+1 (123) 456-7890</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a href="mailto:info@ktfinancial.com" className="hover:text-accent transition-colors">info@ktfinancial.com</a>
              </li>
            </ul>

            <h4 className="font-semibold text-accent mb-3 text-sm uppercase tracking-widest">Newsletter</h4>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-accent text-sm h-9"
              />
              <Button type="submit" size="icon" className="bg-accent hover:bg-accent/90 h-9 w-9 shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-wide py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-white/50">
          <p>© {new Date().getFullYear()} K & T Financial Consultancy. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
