import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import logoImage from '@/assets/logo1.png';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        company: [
            { name: 'About Us', href: '#about' },
            { name: 'Our Services', href: '#services' },
            { name: 'Contact', href: '#contact' },
        ],
        services: [
            { name: 'Accounting', href: '#services' },
            { name: 'Tax Planning', href: '#services' },
            { name: 'Business Advisory', href: '#services' },
            { name: 'Bookkeeping', href: '#services' },
        ],
        legal: [
            { name: 'Privacy Policy', href: '#' },
            { name: 'Terms of Service', href: '#' },
        ],
    };

    const scrollToSection = (href: string) => {
        if (href.startsWith('#')) {
            const element = document.getElementById(href.slice(1));
            element?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-1 ml-20">
                            <img src={logoImage} alt="K&T Financial" className="w-20 h-20 object-contain" />
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            Your trusted partner for comprehensive financial consultancy services. We help businesses thrive through expert guidance.
                        </p>
                        <div className="flex gap-3">
                            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition-colors"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <button
                                        onClick={() => scrollToSection(link.href)}
                                        className="text-slate-400 hover:text-white text-sm transition-colors"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">Services</h3>
                        <ul className="space-y-3">
                            {footerLinks.services.map((link) => (
                                <li key={link.name}>
                                    <button
                                        onClick={() => scrollToSection(link.href)}
                                        className="text-slate-400 hover:text-white text-sm transition-colors"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">Contact Info</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <span className="text-slate-400 text-sm">
                                    123 Financial Street<br />Sydney, NSW 2000
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                                <span className="text-slate-400 text-sm">+61 2 1234 5678</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                                <span className="text-slate-400 text-sm">info@ktfinancial.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-slate-500 text-sm">
                            © {currentYear} K&T Financial Consultancy. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            {footerLinks.legal.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-slate-500 hover:text-white text-sm transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};