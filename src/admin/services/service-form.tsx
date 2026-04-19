import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Plus, X } from 'lucide-react';
import PageHeader from '@/common/page-header';
import { servicesContentApi, ServicesContentInput } from '@/services/service';
import { serviceCategoryApi, ServiceCategory } from '@/services/service-category';
import { Button } from '@/common/ui/button';
import { ImageUpload } from '@/common/ui/image-upload';

interface FormData extends ServicesContentInput {
    features: string[];
}

const ServiceForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);
    const [form, setForm] = useState<FormData>({ service_id: '', category: '', title: '', description: '', tagline: '', features: [], image: '', item_index: 0 });
    const [categories, setCategories] = useState<ServiceCategory[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [featureInput, setFeatureInput] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try { const res = await serviceCategoryApi.getAll({ page: 1, per_page: 100 }); setCategories(res.data); } catch { }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (!isEditing || !id) return;
        const fetch = async () => {
            try {
                setLoading(true);
                const item = await servicesContentApi.getById(id);
                const a = item.attributes;
                setForm({ service_id: a.service_id, category: a.category || '', title: a.title, description: a.description || '', tagline: a.tagline || '', features: a.features || [], image: a.image || '', item_index: a.item_index });
            } catch { setError('Failed to load service'); } finally { setLoading(false); }
        };
        fetch();
    }, [id, isEditing]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setSaving(true);
            if (isEditing && id) await servicesContentApi.update(id, form); else await servicesContentApi.create(form);
            navigate('/admin/services');
        } catch { setError(isEditing ? 'Failed to update' : 'Failed to create'); } finally { setSaving(false); }
    };

    const addFeature = () => { if (!featureInput.trim()) return; setForm(f => ({ ...f, features: [...f.features, featureInput.trim()] })); setFeatureInput(''); };
    const removeFeature = (i: number) => setForm(f => ({ ...f, features: f.features.filter((_, idx) => idx !== i) }));
    const update = (field: keyof FormData, value: string | number | string[]) => setForm(f => ({ ...f, [field]: value }));

    const generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    const handleCategoryChange = (categoryId: string) => {
        if (!form.service_id) {
            setForm(f => ({ ...f, category: categoryId, service_id: generateUUID() }));
        } else {
            setForm(f => ({ ...f, category: categoryId }));
        }
    };

    if (loading) return (
        <div className="h-full flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full" />
        </div>
    );

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-500">
            <PageHeader title={isEditing ? 'Edit Service' : 'Add Service'} subtitle={isEditing ? 'Update service details' : 'Create new service'} buttonLabel="Back" buttonIcon={<ArrowLeft className="w-4 h-4" />} onButtonClick={() => navigate('/admin/services')} />
            <div className="flex-1 overflow-auto mt-6">
                {error && <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">{error}</div>}
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-6 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Category *</label>
                                <select value={form.category} onChange={e => handleCategoryChange(e.target.value)} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-white">
                                    <option value="">Select category...</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.attributes.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Title *</label>
                                <input type="text" value={form.title} onChange={e => update('title', e.target.value)} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" placeholder="Service title" required />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Tagline</label>
                                <input type="text" value={form.tagline} onChange={e => update('tagline', e.target.value)} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" placeholder="Short catchy phrase" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                                <textarea value={form.description} onChange={e => update('description', e.target.value)} rows={4} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all resize-none" placeholder="Detailed service description" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Item Index *</label>
                                <input type="number" value={form.item_index} onChange={e => update('item_index', parseInt(e.target.value) || 0)} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" required />
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <ImageUpload value={form.image || null} onChange={v => update('image', v || '')} label="Service Image" className="w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Features</label>
                                <div className="flex gap-2 mb-3">
                                    <input type="text" value={featureInput} onChange={e => setFeatureInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeature())} className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Add a feature" />
                                    <Button type="button" onClick={addFeature} variant="outline" size="icon"><Plus className="w-4 h-4" /></Button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {form.features.map((f, i) => (
                                        <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm">{f}<button type="button" onClick={() => removeFeature(i)} className="hover:text-amber-900"><X className="w-3 h-3" /></button></span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
                        <Button type="button" variant="outline" onClick={() => navigate('/admin/services')}>Cancel</Button>
                        <Button type="submit" disabled={saving} className="bg-amber-600 hover:bg-amber-700">
                            {saving ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />Saving...</> : <><Check className="w-4 h-4 mr-2" />{isEditing ? 'Update' : 'Create'}</>}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ServiceForm;
