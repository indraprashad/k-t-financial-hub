import { useEffect, useState } from 'react';
import { businessContactApi, BusinessContact, contactSubmissionApi, ContactSubmissionInput } from '@/services/contact-services';
import { Button } from '@/common/ui/button';
import { Input } from '@/common/ui/input';
import { Card, CardContent } from '@/common/ui/card';
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from 'lucide-react';

export const ContactUs = () => {
    const [contact, setContact] = useState<BusinessContact | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState<ContactSubmissionInput>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const data = await businessContactApi.getAll();
                setContact(data[0] || null);
            } catch (err) {
                console.error('Failed to load contact info');
            } finally {
                setLoading(false);
            }
        };

        fetchContact();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await contactSubmissionApi.create(formData);
            setSubmitted(true);
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (err) {
            console.error('Failed to submit');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

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
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">Contact Us</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                        Have questions? We are here to help. Reach out to our team.
                    </p>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h2>

                            {contact && (
                                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                    <Card className="group border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                        <CardContent className="p-4 flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                                <MapPin className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">Address</p>
                                                <p className="text-slate-600 text-sm">{contact.attributes.address}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="group border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                        <CardContent className="p-4 flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                                <Phone className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">Phone</p>
                                                <p className="text-slate-600 text-sm">{contact.attributes.phone}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="group border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                        <CardContent className="p-4 flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                                <Mail className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">Email</p>
                                                <p className="text-slate-600 text-sm">{contact.attributes.email}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="group border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                        <CardContent className="p-4 flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                                <Clock className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">Hours</p>
                                                <p className="text-slate-600 text-sm">
                                                    {contact.attributes.office_hours && Object.entries(contact.attributes.office_hours).map(([day, hours]) => (
                                                        <span key={day}>{day}: {hours as string}<br /></span>
                                                    ))}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}

                            {contact?.attributes.google_maps_url && (
                                <div className="rounded-xl overflow-hidden h-48 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    {contact.attributes.google_maps_url.includes('maps.app.goo.gl') ? (
                                        <a
                                            href={contact.attributes.google_maps_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center h-full bg-slate-100 hover:bg-slate-200 transition-colors text-slate-700 group"
                                        >
                                            <div className="text-center">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </div>
                                                <p className="font-medium">View on Google Maps</p>
                                                <p className="text-sm text-slate-500 mt-1">{contact.attributes.address || 'Get directions'}</p>
                                            </div>
                                        </a>
                                    ) : (
                                        <iframe
                                            src={contact.attributes.google_maps_url}
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            title="Location"
                                        />
                                    )}
                                </div>
                            )}
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Send a Message</h2>

                            {submitted ? (
                                <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                                    <CardContent className="p-8 text-center">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center mx-auto mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                            <Send className="w-6 h-6 text-green-600" />
                                        </div>
                                        <h3 className="text-lg font-bold text-green-800 mb-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">Message Sent!</h3>
                                        <p className="text-green-600 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">Thank you for reaching out. We will get back to you soon.</p>
                                        <Button onClick={() => setSubmitted(false)} className="mt-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-300">
                                            Send Another Message
                                        </Button>
                                    </CardContent>
                                </Card>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                                            <Input
                                                required
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="Your name"
                                                className="focus:ring-2 focus:ring-blue-500 transition-shadow"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                                            <Input
                                                value={formData.phone}
                                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="Your phone"
                                                className="focus:ring-2 focus:ring-blue-500 transition-shadow"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                        <Input
                                            required
                                            type="email"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="your@email.com"
                                            className="focus:ring-2 focus:ring-blue-500 transition-shadow"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                                        <Input
                                            required
                                            value={formData.subject}
                                            onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                            placeholder="How can we help?"
                                            className="focus:ring-2 focus:ring-blue-500 transition-shadow"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                                        <textarea
                                            required
                                            rows={5}
                                            value={formData.message}
                                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                                            placeholder="Tell us more about your inquiry..."
                                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 resize-none transition-shadow"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white gap-2 shadow-md hover:shadow-lg transition-all duration-300"
                                    >
                                        {submitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                Send Message
                                            </>
                                        )}
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};