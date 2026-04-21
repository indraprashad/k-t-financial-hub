import { useEffect, useState } from 'react';
import { servicesContentApi, ServicesContent } from '@/services/service';
import { Card, CardContent } from '@/common/ui/card';
import { Button } from '@/common/ui/button';
import { Calculator, ClipboardList, FileText, BarChart2, TrendingUp, Users, Building2, CheckCircle2, ArrowRight } from 'lucide-react';

const ICONS = [Calculator, ClipboardList, FileText, BarChart2, TrendingUp, Users, Building2];

export const Services = () => {
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
            <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }} />
                </div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-500" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">Our Services</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                        Comprehensive financial solutions tailored to your business needs.
                    </p>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => {
                            const Icon = ICONS[index % ICONS.length];
                            return (
                                <Card key={service.id} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <CardContent className="p-8 relative">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md group-hover:shadow-lg">
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{service.attributes.title}</h3>
                                        <p className="text-blue-600 font-medium text-sm mb-4">{service.attributes.tagline}</p>
                                        <p className="text-slate-600 mb-6">{service.attributes.description}</p>
                                        {service.attributes.features && service.attributes.features.length > 0 && (
                                            <ul className="space-y-2 mb-6">
                                                {service.attributes.features.slice(0, 3).map((feature, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600 group-hover:text-slate-700 transition-colors">
                                                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 group-hover:scale-110 transition-transform" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white gap-2 shadow-md group-hover:shadow-lg transition-all duration-300">
                                            Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="relative py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white text-center overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }} />
                </div>
                <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500" />
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">Need a Custom Solution?</h2>
                    <p className="text-slate-300 mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                        Every business is unique. Contact us to discuss how we can tailor our services to meet your specific needs.
                    </p>
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-6 text-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300">
                        Get in Touch
                    </Button>
                </div>
            </section>
        </div>
    );
};