import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { servicesContentApi, ServicesContent } from '@/services/service';
import { Button } from '@/common/ui/button';
import { Card, CardContent } from '@/common/ui/card';
import { Calculator, ClipboardList, FileText, BarChart2, TrendingUp, Users, Building2, CheckCircle2, ArrowLeft, ArrowRight, Loader2, Phone, Mail } from 'lucide-react';

const ICONS = [Calculator, ClipboardList, FileText, BarChart2, TrendingUp, Users, Building2];

const ServiceDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [service, setService] = useState<ServicesContent | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchService = async () => {
            if (!id) {
                setError('Service ID is required');
                setLoading(false);
                return;
            }

            try {
                const serviceData = await servicesContentApi.getById(id);
                setService(serviceData || null);
            } catch (err) {
                setError('Failed to load service details');
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            </div>
        );
    }

    if (error || !service) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="text-slate-400 text-6xl mb-4"> Services</div>
                    <h2 className="text-2xl font-semibold text-slate-700 mb-2">Service Not Found</h2>
                    <p className="text-slate-600 mb-6">{error || 'The service you are looking for does not exist.'}</p>
                    <Button
                        onClick={() => navigate('/services')}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    >
                        Back to Services
                    </Button>
                </div>
            </div>
        );
    }

    const Icon = ICONS[service.attributes.item_index % ICONS.length];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                            {service.attributes.title}
                        </h1>
                        {(service.attributes.tagline || service.attributes.category_name) && (
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                                {service.attributes.tagline && (
                                    <p className="text-xl text-blue-600 font-medium">{service.attributes.tagline}</p>
                                )}
                                {service.attributes.category_name && (
                                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-full text-sm font-medium whitespace-nowrap">
                                        {service.attributes.category_name}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {service.attributes.image && (
                <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                    <div className="rounded-2xl overflow-hidden shadow-2xl">
                        <img
                            src={service.attributes.image}
                            alt={service.attributes.title}
                            className="w-full h-auto object-cover"
                            loading="eager"
                        />
                    </div>
                </section>
            )}

            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-3 gap-12">
                    <div className="md:col-span-2">
                        <Card className="border-0 shadow-lg">
                            <CardContent className="p-8 md:p-12">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900">Service Overview</h2>
                                        <p className="text-slate-600">Professional financial solutions</p>
                                    </div>
                                </div>

                                {service.attributes.description && (
                                    <div className="prose prose-lg max-w-none mb-8">
                                        <p className="text-slate-700 leading-relaxed text-lg">
                                            {service.attributes.description}
                                        </p>
                                    </div>
                                )}

                                {service.attributes.features && service.attributes.features.length > 0 && (
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-6">Key Features</h3>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {service.attributes.features.map((feature, index) => (
                                                <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                                                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                                    <span className="text-slate-700">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="border-0 shadow-lg">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">Get Started</h3>
                                <div className="space-y-3">
                                    <Button
                                        onClick={() => navigate('/contact')}
                                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white gap-2"
                                    >
                                        <Phone className="w-4 h-4" />
                                        Request Consultation
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => navigate('/booking')}
                                        className="w-full border-blue-600 text-blue-600 hover:bg-blue-500 hover:text-white gap-2"
                                    >
                                        <Mail className="w-4 h-4" />
                                        Book Appointment
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {service.attributes.category_name && (
                            <Card className="border-0 shadow-lg">
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-bold text-slate-900 mb-4">Service Details</h3>
                                    <div className="space-y-3">
                                        <div className='flex flex-row gap-5'>
                                            <p className="text-sm text-slate-500 mb-1">Category</p>
                                            <p className="font-medium text-slate-700">{service.attributes.category_name}</p>
                                        </div>
                                        <div className='flex flex-row gap-5'>
                                            <p className="text-sm text-slate-500 mb-1">Service ID</p>
                                            <p className="font-medium text-slate-700">{service.attributes.service_id}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>

                <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-between">
                    <Button
                        onClick={() => navigate('/services')}
                        className="bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to All Services
                    </Button>

                    <Button
                        onClick={() => navigate('/contact')}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    >
                        Get Started <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default ServiceDetail;
