import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/common/ui/button';
import logoImage from '@/assets/logo1.png';
import { useNavigate } from 'react-router-dom';

const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Blogs', id: 'blogs' },
    { name: 'Contact', id: 'contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
        }
    };

    const isActive = (id: string) => activeSection === id;

    return (
        <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md border-b border-slate-100' : 'bg-white/90 backdrop-blur-md border-b border-slate-100/50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <button
                        onClick={() => scrollToSection('home')}
                        className="flex items-center gap-2 group"
                    >
                        <div className="transition-transform duration-300 group-hover:scale-105">
                            <img src={logoImage} alt="K&T Financial" className="w-20 h-20" width={80} height={80} />
                        </div>
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => scrollToSection(link.id)}
                                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${isActive(link.id)
                                    ? 'text-blue-600'
                                    : 'text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                {link.name}
                                {isActive(link.id) && (
                                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <Button onClick={() => navigate('/booking')} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white gap-2 shadow-md shadow-blue-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 rounded-xl">
                            <Phone className="w-4 h-4" />
                            <span>Book Consultation</span>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-5 h-5 text-slate-700" /> : <Menu className="w-5 h-5 text-slate-700" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t border-slate-100 animate-in slide-in-from-top-2 duration-300">
                        <div className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => {
                                        scrollToSection(link.id);
                                        setIsOpen(false);
                                    }}
                                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left flex items-center justify-between ${isActive(link.id)
                                        ? 'text-blue-600 bg-blue-50'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                        }`}
                                >
                                    {link.name}
                                    {isActive(link.id) && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    )}
                                </button>
                            ))}
                            <div className="pt-3 px-1">
                                <Button
                                onClick={() => navigate('/booking')}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white gap-2 shadow-md shadow-blue-500/20 rounded-xl">
                                    <Phone className="w-4 h-4" />
                                    <span>Book Consultation</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
