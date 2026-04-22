import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { servicesContentApi, ServicesContent } from '@/services/service';
import { Card, CardContent } from '@/common/ui/card';
import { Button } from '@/common/ui/button';
import { Calculator, ClipboardList, FileText, BarChart2, TrendingUp, Users, Building2, CheckCircle2, ArrowRight } from 'lucide-react';

const ICONS = [Calculator, ClipboardList, FileText, BarChart2, TrendingUp, Users, Building2];

export const Services = () => {
    const navigate = useNavigate();
    const [services, setServices] = useState<ServicesContent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const data = await servicesContentApi.getAll();
                setServices(data?.data);
            } catch (err) {
                setError('Failed to load services');
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) return <div className="text-center py-12 text-red-600">{error}</div>;

    return (
        <div className="bg-white">
            <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14">
                    <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm font-semibold mb-4 hover:scale-105 transition-transform cursor-default">What We Offer</span>
                    <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 tracking-tight">Our Services</h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                        Comprehensive financial solutions tailored to your business needs.
                    </p>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.slice(0, 3).map((service, index) => {
                            const Icon = ICONS[index % ICONS.length];
                            return (
                                <Card key={service.id} className="group relative border-0 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white overflow-hidden rounded-2xl">
                                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <CardContent className="p-8 relative">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md group-hover:shadow-lg shadow-blue-500/20">
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">{service.attributes.title}</h3>
                                        <p className="text-blue-500 font-semibold text-sm mb-4 tracking-wide">{service.attributes.tagline}</p>
                                        <p className="text-slate-500 mb-6 text-sm leading-relaxed">{service.attributes.description}</p>
                                        {service.attributes.features && service.attributes.features.length > 0 && (
                                            <ul className="space-y-2.5 mb-6">
                                                {service.attributes.features.slice(0, 3).map((feature, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        <Button
                                            onClick={() => navigate(`/service/${service.id}`)}
                                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white gap-2 shadow-sm group-hover:shadow-md transition-all duration-300 rounded-xl"
                                        >
                                            Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    {services.length > 3 && (
                        <div className="text-center mt-12">
                            <Button
                                onClick={() => navigate('/services')}
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl hover:-translate-y-0.5"
                            >
                                Explore All Services
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white text-center overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }} />
                </div>
                <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl animate-pulse delay-500" />
                <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 text-slate-300 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">Tailored For You</span>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">Need a Custom Solution?</h2>
                    <p className="text-slate-300 mb-10 max-w-xl mx-auto leading-relaxed">
                        Every business is unique. Contact us to discuss how we can tailor our services to meet your specific needs.
                    </p>
                    <Button
                        onClick={() => navigate('/contact')}
                        size="lg"
                        className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-bold px-10 shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 hover:-translate-y-1 transition-all duration-300 rounded-xl"
                    >
                        Get in Touch
                    </Button>
                </div>
            </section>
        </div>
    );
};