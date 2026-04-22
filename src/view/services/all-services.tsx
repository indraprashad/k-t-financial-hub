import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { servicesContentApi, ServicesContent } from '@/services/service';
import { Button } from '@/common/ui/button';
import { Card, CardContent } from '@/common/ui/card';
import { Calculator, ClipboardList, FileText, BarChart2, TrendingUp, Users, Building2, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';

const ICONS = [Calculator, ClipboardList, FileText, BarChart2, TrendingUp, Users, Building2];

export const AllServices = () => {
    const navigate = useNavigate();
    const [services, setServices] = useState<ServicesContent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await servicesContentApi.getAll();
                setServices(data?.data || []);
            } catch (err) {
                setError('Failed to load services');
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            </div>
        );
    }

    if (error) return <div className="text-center py-12 text-red-600">{error}</div>;

    return (
        <div className="bg-white min-h-screen">
            <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">All Services</h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                            Comprehensive financial solutions tailored to your business needs.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => {
                            const Icon = ICONS[index % ICONS.length];
                            return (
                                <Card key={service.id} className="group relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                    {service.attributes.image ? (
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={service.attributes.image}
                                                alt={service.attributes.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                                        </div>
                                    ) : (
                                        <div className="px-8 pt-8">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md group-hover:shadow-lg">
                                                <Icon className="w-7 h-7 text-white" />
                                            </div>
                                        </div>
                                    )}
                                    <CardContent className="p-8 relative">
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
                                        <Button
                                            onClick={() => {
                                                if (service.id) {
                                                    navigate(`/service/${service.id}`);
                                                } else {
                                                    console.error('Service ID is missing for:', service);
                                                }
                                            }}
                                            className="relative z-10 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white gap-2 shadow-md group-hover:shadow-lg transition-all duration-300"
                                            disabled={!service.id}
                                        >
                                            Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    {services.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-slate-400 text-6xl mb-4"> Services</div>
                            <h3 className="text-xl font-semibold text-slate-700 mb-2">No Services Available</h3>
                            <p className="text-slate-600">Please check back later for our services.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default AllServices;
