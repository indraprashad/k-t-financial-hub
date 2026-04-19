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
            <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Services</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Comprehensive financial solutions tailored to your business needs.
                    </p>
                </div>
            </section>

            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => {
                            const Icon = ICONS[index % ICONS.length];
                            return (
                                <Card key={service.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                                    <CardContent className="p-8">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6">
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">{service.attributes.title}</h3>
                                        <p className="text-blue-600 font-medium text-sm mb-4">{service.attributes.tagline}</p>
                                        <p className="text-slate-600 mb-6">{service.attributes.description}</p>
                                        {service.attributes.features && service.attributes.features.length > 0 && (
                                            <ul className="space-y-2 mb-6">
                                                {service.attributes.features.slice(0, 3).map((feature, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                                                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2">
                                            Learn More <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-slate-900 text-white text-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
                    <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                        Every business is unique. Contact us to discuss how we can tailor our services to meet your specific needs.
                    </p>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-6 text-lg">
                        Get in Touch
                    </Button>
                </div>
            </section>
        </div>
    );
};