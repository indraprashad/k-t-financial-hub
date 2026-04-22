import { useState } from 'react';
import { contactSubmissionApi, ContactSubmissionInput } from '@/services/contact-services';
import { Button } from '@/common/ui/button';
import { Input } from '@/common/ui/input';
import { Card, CardContent } from '@/common/ui/card';
import { Send, Loader2 } from 'lucide-react';

interface ContactFormProps {
    title?: string;
    subtitle?: string;
    className?: string;
}

export const ContactForm = ({ 
    title = "Send a Message", 
    subtitle = "Have questions? We'd love to hear from you.",
    className = "" 
}: ContactFormProps) => {
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState<ContactSubmissionInput>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await contactSubmissionApi.create(formData);
            setSubmitted(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            console.error('Failed to submit form:', error);
            // You could add error handling here (show error message)
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <Card className={`border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 ${className}`}>
                <CardContent className="p-8 text-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center mx-auto mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Send className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-green-800 mb-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">Message Sent!</h3>
                    <p className="text-green-600 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">Thank you for reaching out. We will get back to you soon.</p>
                    <Button 
                        onClick={() => setSubmitted(false)} 
                        className="mt-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                    >
                        Send Another Message
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className='p-24 rounded-lg max-w-2xl mx-auto'>
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{title}</h2>
                <p className="text-slate-600">{subtitle}</p>
            </div>

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
        </div>
    );
};

export default ContactForm;
