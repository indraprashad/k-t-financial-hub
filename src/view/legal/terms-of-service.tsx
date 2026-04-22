import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Scale, Mail, Phone } from 'lucide-react';
import logoImage from '@/assets/logo1.png';
import { Button } from '@/common/ui/button';

export const TermsOfService = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center gap-3 mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                                <FileText className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-4xl font-bold text-slate-900">Terms of Service</h1>
                        </div>
                        <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
                            Welcome to K&T Financial Consultancy. These Terms of Service outline the rules and guidelines
                            for using our financial consulting services. Please read them carefully.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Terms Overview */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <Scale className="w-6 h-6 text-blue-500" />
                                <h2 className="text-2xl font-bold text-slate-900">Service Terms</h2>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-2">1. Service Agreement</h3>
                                    <p className="text-slate-600">
                                        By using our services, you agree to these terms and conditions. Services are provided
                                        "as is" and subject to availability. We reserve the right to modify or discontinue
                                        services at our discretion.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-2">2. Payment Terms</h3>
                                    <p className="text-slate-600">
                                        All fees are clearly stated before service engagement. Payment is required
                                        in advance for consultation services. Refund policies are outlined per service type.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-2">3. Confidentiality</h3>
                                    <p className="text-slate-600">
                                        All client information and business details are kept strictly confidential. We do not share
                                        your information with third parties without explicit consent, except as required by law.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-2">4. Service Standards</h3>
                                    <p className="text-slate-600">
                                        We provide professional financial consulting services according to industry standards
                                        and regulatory requirements. All recommendations are based on current financial
                                        laws and best practices.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Client Responsibilities */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                                    <span className="text-white font-bold">YOU</span>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">Client Responsibilities</h2>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-2">Accurate Information</h3>
                                    <p className="text-slate-600">
                                        Provide complete and accurate financial information and documentation required for services.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-2">Timely Response</h3>
                                    <p className="text-slate-600">
                                        Respond promptly to requests for additional information or documentation.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-2">Payment Compliance</h3>
                                    <p className="text-slate-600">
                                        Make timely payments as agreed upon for services rendered.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-2">Cooperation</h3>
                                    <p className="text-slate-600">
                                        Provide necessary cooperation and access to enable effective service delivery.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Limitations & Liability */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
                                    <span className="text-white font-bold">K&T</span>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">Limitations & Liability</h2>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-2">Service Availability</h3>
                                    <p className="text-slate-600">
                                        Services are subject to availability and may be limited by capacity or regulatory constraints.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-2">Force Majeure</h3>
                                    <p className="text-slate-600">
                                        We are not liable for circumstances beyond our reasonable control, including acts of nature,
                                        war, or unforeseen events that affect service delivery.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-2">Indemnification</h3>
                                    <p className="text-slate-600">
                                        You agree to indemnify and hold harmless K&T Financial from any claims arising
                                        from service use, except where prohibited by law.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-2">Governing Law</h3>
                                    <p className="text-slate-600">
                                        These terms are governed by and construed in accordance with the laws of Bhutan.
                                        Any disputes shall be resolved through arbitration in accordance with applicable laws.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact for Legal Questions */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mt-12">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">Questions About These Terms?</h2>
                            <p className="text-slate-600 mb-6">
                                If you have any questions about these Terms of Service or need clarification on any points,
                                please don't hesitate to contact our legal team.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    onClick={() => navigate('/contact')}
                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                                >
                                    <Phone className="w-4 h-4 mr-2" />
                                    Contact Legal Team
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => window.open('mailto:legal@ktfinancial.com')}
                                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                                >
                                    <Mail className="w-4 h-4 mr-2" />
                                    legal@ktfinancial.com
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TermsOfService;
