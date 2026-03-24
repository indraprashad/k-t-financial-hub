import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import logo from "../assets/logo.png";

const truncateText = (text: string, limit: number = 18) => {
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog & Insights", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const serviceLinks = [
  "Accounting & Book-keeping",
  "Audit & Financial Reporting",
  "Tax Filing & Compliance",
  "Business Advisory",
];

export default function Footer() {

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="container-wide py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1 flex flex-col items-center">
            <Link to="/" className="flex items-center gap-2 mb-4 justify-center">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                <img src={logo} alt="K & T Financial Consultancy" className="h-15 w-15 object-contain border-primary rounded-full" />
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6 text-center">
              K & T Financial Consultancy provides professional accounting, auditing, and business advisory services to help individuals and businesses manage finances, and grow successfully.
            </p>
            <div className="flex gap-3 justify-center">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="https://www.facebook.com/profile.php?id=61579403702869"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label="Social link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-start">
            <h4 className="font-semibold text-accent mb-4 text-sm uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-accent text-sm transition-colors flex items-center gap-1 truncate"
                    title={link.label}
                  >
                    <span className="text-accent/60">›</span> <span className="truncate">{truncateText(link.label)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col items-start">
            <h4 className="font-semibold text-accent mb-4 text-sm uppercase tracking-widest">Our Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="text-white/70 hover:text-accent text-sm transition-colors flex items-center gap-1"
                    title={s}
                  >
                    <span className="text-accent/60">›</span> <span className="hidden sm:inline">{s}</span><span className="sm:hidden">{truncateText(s)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-start">
            <h4 className="font-semibold text-accent mb-4 text-sm uppercase tracking-widest">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/70 justify-start">
                <MapPin className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                <span className="truncate">GJ6Q+PR3Tabà Lam-5, Thimphu</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70 justify-start">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href="tel:+11234567890" className="hover:text-accent transition-colors truncate">+975 17836510</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70 justify-start">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a href="mailto:info@ktfinancial.com" className="hover:text-accent transition-colors truncate">ktfinancialconsultancy26@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-wide py-4 flex flex-col items-center justify-center gap-2 text-sm text-white/50 text-center">
          <p>© {new Date().getFullYear()} K & T Financial Consultancy. All rights reserved.</p>
          <div className="flex gap-4 justify-center">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
