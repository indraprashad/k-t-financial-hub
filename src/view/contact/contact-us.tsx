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
            <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14">
                    <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm font-semibold mb-4 hover:scale-105 transition-transform cursor-default">Get In Touch</span>
                    <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 tracking-tight">Contact Us</h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                        Have questions? We are here to help. Reach out to our team.
                    </p>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-14">
                        <div>
                            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <span className="w-6 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full inline-block" />
                                Contact Information
                            </h2>

                            {contact && (
                                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                    <Card className="group border-0 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 rounded-xl overflow-hidden">
                                        <div className="h-0.5 bg-gradient-to-r from-blue-400 to-blue-500" />
                                        <CardContent className="p-4 flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                                                <MapPin className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-xs text-slate-500 uppercase tracking-wide mb-0.5">Address</p>
                                                <p className="text-slate-700 text-sm">{contact.attributes.address}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="group border-0 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 rounded-xl overflow-hidden">
                                        <div className="h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-500" />
                                        <CardContent className="p-4 flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
                                                <Phone className="w-5 h-5 text-emerald-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-xs text-slate-500 uppercase tracking-wide mb-0.5">Phone</p>
                                                <p className="text-slate-700 text-sm">{contact.attributes.phone}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="group border-0 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 rounded-xl overflow-hidden">
                                        <div className="h-0.5 bg-gradient-to-r from-indigo-400 to-indigo-500" />
                                        <CardContent className="p-4 flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-colors">
                                                <Mail className="w-5 h-5 text-indigo-600" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="font-semibold text-xs text-slate-500 uppercase tracking-wide mb-0.5">Email</p>
                                                <p className="text-slate-700 text-sm break-words overflow-wrap-anywhere">{contact.attributes.email}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="group border-0 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 rounded-xl overflow-hidden">
                                        <div className="h-0.5 bg-gradient-to-r from-amber-400 to-amber-500" />
                                        <CardContent className="p-4 flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0 group-hover:bg-amber-100 transition-colors">
                                                <Clock className="w-5 h-5 text-amber-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-xs text-slate-500 uppercase tracking-wide mb-0.5">Hours</p>
                                                <p className="text-slate-700 text-sm">{contact.attributes.additional_info}</p>
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
                            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <span className="w-6 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full inline-block" />
                                Send a Message
                            </h2>

                            {submitted ? (
                                <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                                    <CardContent className="p-10 text-center">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-green-500/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                            <Send className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">Message Sent!</h3>
                                        <p className="text-slate-600 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">Thank you for reaching out. We will get back to you soon.</p>
                                        <Button onClick={() => setSubmitted(false)} className="mt-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-xl">
                                            Send Another Message
                                        </Button>
                                    </CardContent>
                                </Card>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Name</label>
                                            <Input
                                                required
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="Your name"
                                                className="rounded-xl border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all bg-slate-50 focus:bg-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Phone</label>
                                            <Input
                                                value={formData.phone}
                                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="Your phone"
                                                className="rounded-xl border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all bg-slate-50 focus:bg-white"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Email</label>
                                        <Input
                                            required
                                            type="email"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="your@email.com"
                                            className="rounded-xl border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all bg-slate-50 focus:bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Subject</label>
                                        <Input
                                            required
                                            value={formData.subject}
                                            onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                            placeholder="How can we help?"
                                            className="rounded-xl border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all bg-slate-50 focus:bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Message</label>
                                        <textarea
                                            required
                                            rows={5}
                                            value={formData.message}
                                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                                            placeholder="Tell us more about your inquiry..."
                                            className="flex w-full rounded-xl border border-slate-200 bg-slate-50 focus:bg-white px-3 py-2.5 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-400 resize-none transition-all"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white gap-2 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl hover:-translate-y-0.5"
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