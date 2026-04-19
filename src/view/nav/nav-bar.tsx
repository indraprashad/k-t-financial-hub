import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/common/ui/button';
import logoImage from '@/assets/logo1.png';

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

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
        }
    };

    const isActive = (id: string) => activeSection === id;

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <button
                        onClick={() => scrollToSection('home')}
                        className="flex items-center gap-2"
                    >
                        <div >
                            <img src={logoImage} alt="K&T Financial" className="w-20 h-20" />
                        </div>
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => scrollToSection(link.id)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(link.id)
                                    ? 'text-blue-600 bg-blue-50'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                    }`}
                            >
                                {link.name}
                            </button>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                            <Phone className="w-4 h-4" />
                            <span>Book Consultation</span>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-slate-100"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t border-slate-100">
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => {
                                        scrollToSection(link.id);
                                        setIsOpen(false);
                                    }}
                                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${isActive(link.id)
                                        ? 'text-blue-600 bg-blue-50'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                        }`}
                                >
                                    {link.name}
                                </button>
                            ))}
                            <div className="pt-2 px-4">
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2">
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
