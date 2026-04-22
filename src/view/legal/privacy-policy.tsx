import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Lock, Mail, Phone } from 'lucide-react';
import logoImage from '@/assets/logo1.png';
import { Button } from '@/common/ui/button';

export const PrivacyPolicy = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center gap-3 mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-4xl font-bold text-slate-900">Privacy Policy</h1>
                        </div>
                        <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
                            Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Data Collection */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <Eye className="w-6 h-6 text-blue-500" />
                                <h2 className="text-2xl font-bold text-slate-900">Information We Collect</h2>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Lock className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-1">Personal Information</h3>
                                        <p className="text-slate-600">Name, email address, phone number, and company details when you use our services or contact us.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Lock className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-1">Usage Data</h3>
                                        <p className="text-slate-600">Service usage patterns, preferences, and interaction data to improve our services.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Lock className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-1">Financial Information</h3>
                                        <p className="text-slate-600">Business financial details and documents shared during consultations.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Data Usage */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <Shield className="w-6 h-6 text-blue-500" />
                                <h2 className="text-2xl font-bold text-slate-900">How We Use Your Information</h2>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-2">Service Delivery</h3>
                                    <p className="text-slate-600">To provide financial consulting services, personalized recommendations, and customer support.</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-2">Communication</h3>
                                    <p className="text-slate-600">Email updates, service notifications, and customer service responses.</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-2">Analytics</h3>
                                    <p className="text-slate-600">Service improvement and user experience optimization.</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-2">Legal Compliance</h3>
                                    <p className="text-slate-600">Regulatory reporting and legal requirement fulfillment.</p>
                                </div>
                            </div>
                        </div>

                        {/* Data Protection */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <Lock className="w-6 h-6 text-green-500" />
                                <h2 className="text-2xl font-bold text-slate-900">Data Protection</h2>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-2">Security Measures</h3>
                                    <p className="text-slate-600">Encryption, secure servers, and regular security audits.</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-2">Data Retention</h3>
                                    <p className="text-slate-600">Information retained only as long as necessary for service delivery and legal compliance.</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-2">Third-Party Sharing</h3>
                                    <p className="text-slate-600">We only share information with trusted partners when essential for service delivery, with your explicit consent.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Your Rights */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mt-12">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Privacy Rights</h2>
                            <div className="space-y-4 text-left max-w-2xl mx-auto">
                                <div className="flex items-start gap-3">
                                    <Phone className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-1">Access & Correction</h3>
                                        <p className="text-slate-600">Request access to your personal data and correct inaccuracies.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Mail className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-1">Opt-Out Options</h3>
                                        <p className="text-slate-600">Choose what data we collect and how we contact you.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Lock className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-1">Data Portability</h3>
                                        <p className="text-slate-600">Export your data in standard formats.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact for Privacy */}
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Questions About Your Privacy?</h3>
                            <p className="text-slate-600 mb-6">
                                We're committed to protecting your privacy and being transparent about our data practices. 
                                If you have any questions about this Privacy Policy or how we handle your information, 
                                please don't hesitate to contact us.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button 
                                    onClick={() => navigate('/contact')}
                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                                >
                                    <Mail className="w-4 h-4 mr-2" />
                                    Contact Privacy Team
                                </Button>
                                <Button 
                                    variant="outline"
                                    onClick={() => window.open('mailto:privacy@ktfinancial.com')}
                                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                                >
                                    <Mail className="w-4 h-4 mr-2" />
                                    privacy@ktfinancial.com
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
