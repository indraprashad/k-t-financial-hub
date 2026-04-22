import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import logoImage from '@/assets/logo1.png';
import { servicesContentApi, ServicesContent } from '@/services/service';
import { businessContactApi, BusinessContact } from '@/services/contact-services';

export const Footer = () => {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();
    const [services, setServices] = useState<ServicesContent[]>([]);
    const [contact, setContact] = useState<BusinessContact | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const footerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.1 }
        );
        if (footerRef.current) observer.observe(footerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicesData, contactData] = await Promise.all([
                    servicesContentApi.getAll(),
                    businessContactApi.getAll()
                ]);
                setServices(servicesData?.data || []);
                setContact(contactData[0] || null);
            } catch (err) {
                console.error('Failed to load footer data:', err);
            }
        };

        fetchData();
    }, []);

    const footerLinks = {
        company: [
            { name: 'About Us', href: '#about' },
            { name: 'Our Services', href: '#services' },
            { name: 'Contact', href: '#contact' },
            { name: 'Blogs', href: '#blogs' },
        ],
        legal: [
            { name: 'Privacy Policy', href: 'privacy-policy' },
            { name: 'Terms of Service', href: 'terms-of-service' },
        ],
    };

    const scrollToSection = (href: string) => {
        if (href.startsWith('#')) {
            const element = document.getElementById(href.slice(1));
            element?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer ref={footerRef} className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            <div className="h-1 bg-gradient-to-r from-amber-400 via-blue-500 to-indigo-500" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    <div className={`col-span-2 lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left transition-all duration-700 delay-[0ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="flex items-center gap-2 mb-4 group cursor-pointer" onClick={() => scrollToSection('#home')}>
                            <div className="transition-transform duration-300 group-hover:scale-105">
                                <img src={logoImage} alt="K&T Financial" className="w-20 h-20 object-contain" width={80} height={80} />
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            Your trusted partner for comprehensive financial consultancy services. We help businesses thrive through expert guidance.
                        </p>
                        <div className="flex gap-2.5">
                            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                                <button
                                    key={i}
                                    onClick={() => window.open('https://www.facebook.com/KTFinancial', '_blank')}
                                    className="w-9 h-9 rounded-xl bg-slate-700/60 hover:bg-gradient-to-br hover:from-blue-600 hover:to-indigo-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25 border border-slate-700/50 hover:border-blue-500/50"
                                >
                                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={`transition-all duration-700 delay-[150ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h3 className="font-bold text-white text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
                            <span className="w-4 h-0.5 bg-amber-400 rounded-full" />
                            Company
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <button
                                        onClick={() => {
                                            if (link.href.startsWith('#')) {
                                                scrollToSection(link.href);
                                            } else if (link.href === '/services' || link.href === '/blogs' || link.href === '/contact' || link.href === '/about') {
                                                navigate(link.href);
                                            } else {
                                                window.open(link.href, '_blank');
                                            }
                                        }}
                                        className="text-slate-400 hover:text-amber-300 hover:translate-x-1.5 text-sm transition-all duration-300"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={`flex flex-col items-center lg:items-start text-center lg:text-left transition-all duration-700 delay-[300ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h3 className="font-bold text-white text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
                            <span className="w-4 h-0.5 bg-amber-400 rounded-full" />
                            Services
                        </h3>
                        <ul className="space-y-3 flex flex-col items-center lg:items-start">
                            {services.slice(0, 4).map((service) => (
                                <li key={service.id}>
                                    <button
                                        onClick={() => navigate(`/service/${service.id}`)}
                                        className="text-slate-400 hover:text-amber-300 hover:translate-x-1.5 text-sm transition-all duration-300"
                                    >
                                        {service.attributes.title}
                                    </button>
                                </li>
                            ))}
                            {services.length > 4 && (
                                <li>
                                    <button
                                        onClick={() => navigate('/services')}
                                        className="text-slate-400 hover:text-amber-300 hover:translate-x-1.5 text-sm transition-all duration-300 font-semibold"
                                    >
                                        View All Services →
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className={`transition-all duration-700 delay-[450ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h3 className="font-bold text-white text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
                            <span className="w-4 h-0.5 bg-amber-400 rounded-full" />
                            Contact Info
                        </h3>
                        <ul className="space-y-4">
                            {contact?.attributes.address && (
                                <li className="flex items-start gap-3 group">
                                    <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center shrink-0 group-hover:bg-blue-600/30 transition-colors">
                                        <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                                    </div>
                                    <span className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors whitespace-pre-line leading-relaxed mt-1 text-left">
                                        {contact.attributes.address}
                                    </span>
                                </li>
                            )}
                            {contact?.attributes.phone && (
                                <li className="flex items-center gap-3 group">
                                    <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center shrink-0 group-hover:bg-emerald-600/30 transition-colors">
                                        <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                                    </div>
                                    <span className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">{contact.attributes.phone}</span>
                                </li>
                            )}
                            {contact?.attributes.email && (
                                <li className="flex items-center gap-3 group">
                                    <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center shrink-0 group-hover:bg-indigo-600/30 transition-colors">
                                        <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                                    </div>
                                    <span className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors break-all">{contact.attributes.email}</span>
                                </li>
                            )}
                            {!contact && (
                                <li className="text-slate-500 text-sm">
                                    Contact information loading...
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            <div className={`border-t border-slate-700/40 transition-all duration-700 delay-[600ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-slate-500 text-sm">
                            © {currentYear} K&T Financial Consultancy. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            {footerLinks.legal.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => navigate(`/${link.href}`)}
                                    className="text-slate-500 hover:text-slate-300 text-sm transition-all duration-300 hover:underline underline-offset-4"
                                >
                                    {link.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};