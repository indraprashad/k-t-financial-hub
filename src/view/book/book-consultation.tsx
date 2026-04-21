import { useState } from 'react';
import { Button } from '@/common/ui/button';
import { Card, CardContent } from '@/common/ui/card';
import { Input } from '@/common/ui/input';
import { Calendar, Clock, User, Mail, Phone, FileText, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

export default function BookConsultation() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        preferredDate: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            {/* Hero Section */}
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
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">Book a Consultation</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                        Schedule a meeting with our financial experts to discuss your business needs.
                    </p>
                </div>
            </section>

            {/* Form Section */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {submitted ? (
                        <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-50 to-emerald-50">
                            <CardContent className="p-12 text-center">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center mx-auto mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-green-800 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">Consultation Request Sent!</h2>
                                <p className="text-green-600 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                                    Thank you for your interest. Our team will contact you within 24 hours to confirm your appointment.
                                </p>
                                <Button
                                    onClick={() => {
                                        setSubmitted(false);
                                        setFormData({ name: '', email: '', phone: '', service: '', preferredDate: '', message: '' });
                                    }}
                                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    Book Another Consultation
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="border-0 shadow-2xl bg-white">
                            <CardContent className="p-8 md:p-12">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                                                <User className="w-4 h-4 text-blue-600" />
                                                Full Name
                                            </label>
                                            <Input
                                                required
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="John Doe"
                                                className="focus:ring-2 focus:ring-blue-500 transition-shadow h-12"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-blue-600" />
                                                Email Address
                                            </label>
                                            <Input
                                                required
                                                type="email"
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="john@example.com"
                                                className="focus:ring-2 focus:ring-blue-500 transition-shadow h-12"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-blue-600" />
                                                Phone Number
                                            </label>
                                            <Input
                                                required
                                                value={formData.phone}
                                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="+1 234 567 8900"
                                                className="focus:ring-2 focus:ring-blue-500 transition-shadow h-12"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-blue-600" />
                                                Service Type
                                            </label>
                                            <Input
                                                required
                                                value={formData.service}
                                                onChange={e => setFormData({ ...formData, service: e.target.value })}
                                                placeholder="Accounting, Tax Planning, etc."
                                                className="focus:ring-2 focus:ring-blue-500 transition-shadow h-12"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-blue-600" />
                                            Preferred Date
                                        </label>
                                        <Input
                                            required
                                            type="date"
                                            value={formData.preferredDate}
                                            onChange={e => setFormData({ ...formData, preferredDate: e.target.value })}
                                            className="focus:ring-2 focus:ring-blue-500 transition-shadow h-12"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-blue-600" />
                                            Additional Details
                                        </label>
                                        <textarea
                                            value={formData.message}
                                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                                            placeholder="Tell us more about your requirements..."
                                            rows={4}
                                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 resize-none transition-shadow"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white gap-2 shadow-lg hover:shadow-xl transition-all duration-300 h-12 text-base font-semibold"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                Submit Request
                                                <ArrowRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </section>

            {/* Info Cards */}
            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center p-8">
                            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Clock className="w-7 h-7 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Quick Response</h3>
                            <p className="text-slate-600 text-sm">We respond to all inquiries within 24 hours.</p>
                        </Card>
                        <Card className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center p-8">
                            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <User className="w-7 h-7 text-amber-600" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Expert Team</h3>
                            <p className="text-slate-600 text-sm">Consult with certified financial professionals.</p>
                        </Card>
                        <Card className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center p-8">
                            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <CheckCircle2 className="w-7 h-7 text-green-600" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">No Obligation</h3>
                            <p className="text-slate-600 text-sm">Free initial consultation with no commitments.</p>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
}
