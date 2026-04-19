import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import PageHeader from '@/common/page-header';
import { businessContactApi } from '@/services/business-services';
import { Button } from '@/common/ui/button';

interface FormData {
    content_type: string;
    title: string;
    address: string;
    phone: string;
    email: string;
    google_maps_url: string;
    additional_info: string;
    item_index: number;
}

const BusinessContactForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);
    const [form, setForm] = useState<FormData>({
        content_type: 'contact',
        title: '',
        address: '',
        phone: '',
        email: '',
        google_maps_url: '',
        additional_info: '',
        item_index: 0
    });
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!isEditing || !id) return;
        const fetch = async () => {
            try {
                setLoading(true);
                const item = await businessContactApi.getById(id);
                const a = item.attributes;
                setForm({
                    content_type: a.content_type || 'contact',
                    title: a.title || '',
                    address: a.address || '',
                    phone: a.phone || '',
                    email: a.email || '',
                    google_maps_url: a.google_maps_url || '',
                    additional_info: a.additional_info || '',
                    item_index: a.item_index || 0
                });
            } catch { setError('Failed to load business contact'); } finally { setLoading(false); }
        };
        fetch();
    }, [id, isEditing]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title.trim()) {
            setError('Title is required');
            return;
        }
        try {
            setSaving(true);
            const data = {
                content_type: form.content_type,
                title: form.title,
                address: form.address || null,
                phone: form.phone || null,
                email: form.email || null,
                google_maps_url: form.google_maps_url || null,
                additional_info: form.additional_info || null,
                item_index: form.item_index
            };
            if (isEditing && id) await businessContactApi.update(id, data); else await businessContactApi.create(data);
            navigate('/admin/business');
        } catch { setError(isEditing ? 'Failed to update' : 'Failed to create'); } finally { setSaving(false); }
    };

    const update = (field: keyof FormData, value: string | number) => setForm(f => ({ ...f, [field]: value }));

    if (loading) return (
        <div className="h-full flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full" />
        </div>
    );

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-500">
            <PageHeader title={isEditing ? 'Edit Business Contact' : 'Add Business Contact'} subtitle={isEditing ? 'Update contact details' : 'Create new business contact'} buttonLabel="Back" buttonIcon={<ArrowLeft className="w-4 h-4" />} onButtonClick={() => navigate('/admin/business')} />
            <div className="flex-1 overflow-auto mt-6">
                {error && <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">{error}</div>}
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-6 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Title *</label>
                            <input type="text" value={form.title} onChange={e => update('title', e.target.value)} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" placeholder="e.g., Main Office" required />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Content Type</label>
                            <select value={form.content_type} onChange={e => update('content_type', e.target.value)} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-white">
                                <option value="contact">Contact</option>
                                <option value="office">Office</option>
                                <option value="branch">Branch</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                            <input type="text" value={form.phone} onChange={e => update('phone', e.target.value)} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" placeholder="+1 234 567 8900" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                            <input type="email" value={form.email} onChange={e => update('email', e.target.value)} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" placeholder="contact@example.com" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Address</label>
                            <textarea value={form.address} onChange={e => update('address', e.target.value)} rows={3} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all resize-none" placeholder="Full address..." />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Google Maps URL</label>
                            <input type="url" value={form.google_maps_url} onChange={e => update('google_maps_url', e.target.value)} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" placeholder="https://maps.google.com/..." />
                            <p className="text-xs text-slate-500 mt-1">Use the full embed URL from Google Maps. Short URLs (maps.app.goo.gl) will show as a link instead of a map.</p>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Additional Info</label>
                            <textarea value={form.additional_info} onChange={e => update('additional_info', e.target.value)} rows={3} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all resize-none" placeholder="Additional information..." />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Item Index</label>
                            <input type="number" value={form.item_index} onChange={e => update('item_index', parseInt(e.target.value) || 0)} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
                        <Button type="button" variant="outline" onClick={() => navigate('/admin/business')}>Cancel</Button>
                        <Button type="submit" disabled={saving} className="bg-amber-600 hover:bg-amber-700">
                            {saving ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />Saving...</> : <><Check className="w-4 h-4 mr-2" />{isEditing ? 'Update' : 'Create'}</>}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BusinessContactForm;
