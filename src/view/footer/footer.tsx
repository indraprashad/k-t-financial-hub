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
        <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4 group cursor-pointer" onClick={() => scrollToSection('#home')}>
                            <div className="transition-transform duration-300 group-hover:scale-105">
                                <img src={logoImage} alt="K&T Financial" className="w-20 h-20 object-contain" width={80} height={80} />
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            Your trusted partner for comprehensive financial consultancy services. We help businesses thrive through expert guidance.
                        </p>
                        <div className="flex gap-3">
                            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-700 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30"
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
                                        className="text-slate-400 hover:text-white hover:translate-x-1 text-sm transition-all duration-300 text-left"
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
                                        className="text-slate-400 hover:text-white hover:translate-x-1 text-sm transition-all duration-300 text-left"
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
                            <li className="flex items-start gap-3 group">
                                <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                <span className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">
                                    GJ6Q+GG Thimphu<br />Thimphu, Bhutan 11001
                                </span>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <Phone className="w-5 h-5 text-blue-500 shrink-0 group-hover:scale-110 transition-transform" />
                                <span className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">+975 17836510</span>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <Mail className="w-5 h-5 text-blue-500 shrink-0 group-hover:scale-110 transition-transform" />
                                <span className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">info@ktfinancial.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-800/50">
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
                                    className="text-slate-500 hover:text-white hover:translate-y-[-2px] text-sm transition-all duration-300"
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