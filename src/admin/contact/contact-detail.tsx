import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Trash2 } from 'lucide-react';
import PageHeader from '@/common/page-header';
import { contactSubmissionApi, ContactSubmission } from '@/services/contact-services';
import { Button } from '@/common/ui/button';

const ContactDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [contact, setContact] = useState<ContactSubmission | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) return;
        const fetch = async () => {
            try {
                setLoading(true);
                const item = await contactSubmissionApi.getById(id);
                setContact(item);
            } catch { setError('Failed to load contact submission'); } finally { setLoading(false); }
        };
        fetch();
    }, [id]);

    const handleDelete = async () => {
        if (!contact || !confirm('Are you sure you want to delete this submission?')) return;
        try {
            await contactSubmissionApi.delete(contact.id);
            navigate('/admin/contact');
        } catch { setError('Failed to delete submission'); }
    };

    if (loading) return (
        <div className="h-full flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full" />
        </div>
    );

    if (!contact) return (
        <div className="h-full flex flex-col animate-in fade-in duration-500">
            <PageHeader title="Contact Detail" subtitle="View submission details" buttonLabel="Back" buttonIcon={<ArrowLeft className="w-4 h-4" />} onButtonClick={() => navigate('/admin/contact')} />
            <div className="flex-1 overflow-auto mt-6 p-8">
                <p className="text-slate-500">Contact submission not found</p>
            </div>
        </div>
    );

    const a = contact.attributes;

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-500">
            <PageHeader
                title="Contact Detail"
                subtitle="View submission details"
                buttonLabel="Back"
                buttonIcon={<ArrowLeft className="w-4 h-4" />}
                onButtonClick={() => navigate('/admin/contact')}
            />
            <div className="flex-1 overflow-auto mt-6">
                {error && <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">{error}</div>}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Name</label>
                            <p className="text-slate-900">{a.name}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                            <p className="text-slate-900">{a.email}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Phone</label>
                            <p className="text-slate-900">{a.phone || '-'}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Subject</label>
                            <p className="text-slate-900">{a.subject}</p>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Message</label>
                        <p className="text-slate-900 whitespace-pre-wrap">{a.message}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Submitted At</label>
                        <p className="text-slate-900">{new Date(a.created_at).toLocaleString()}</p>
                    </div>
                    <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
                        <Button variant="outline" onClick={() => navigate('/admin/contact')}>Back</Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            <Trash2 className="w-4 h-4 mr-2" />Delete
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactDetail;
