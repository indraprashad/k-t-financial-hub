import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import PageHeader from '@/common/page-header';
import { serviceCategoryApi } from '@/services/service-category';
import { Button } from '@/common/ui/button';

interface FormData {
    name: string;
    description: string;
}

const ServiceCategoryForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);
    const [form, setForm] = useState<FormData>({ name: '', description: '' });
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!isEditing || !id) return;
        const fetch = async () => {
            try {
                setLoading(true);
                const item = await serviceCategoryApi.getById(id);
                const a = item.attributes;
                setForm({ name: a.name, description: a.description || '' });
            } catch { setError('Failed to load category'); } finally { setLoading(false); }
        };
        fetch();
    }, [id, isEditing]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim()) {
            setError('Name is required');
            return;
        }
        try {
            setSaving(true);
            const data = { name: form.name, description: form.description || null };
            if (isEditing && id) await serviceCategoryApi.update(id, data); else await serviceCategoryApi.create(data);
            navigate('/admin/service-categories');
        } catch { setError(isEditing ? 'Failed to update' : 'Failed to create'); } finally { setSaving(false); }
    };

    const update = (field: keyof FormData, value: string) => setForm(f => ({ ...f, [field]: value }));

    if (loading) return (
        <div className="h-full flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full" />
        </div>
    );

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-500">
            <PageHeader title={isEditing ? 'Edit Category' : 'Add Category'} subtitle={isEditing ? 'Update category details' : 'Create new service category'} buttonLabel="Back" buttonIcon={<ArrowLeft className="w-4 h-4" />} onButtonClick={() => navigate('/admin/service-categories')} />
            <div className="flex-1 overflow-auto mt-6">
                {error && <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">{error}</div>}
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-6 w-full">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Name *</label>
                            <input type="text" value={form.name} onChange={e => update('name', e.target.value)} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" placeholder="e.g., Tax Consulting" required />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                            <textarea value={form.description} onChange={e => update('description', e.target.value)} rows={4} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all resize-none" placeholder="Category description (optional)" />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
                        <Button type="button" variant="outline" onClick={() => navigate('/admin/service-categories')}>Cancel</Button>
                        <Button type="submit" disabled={saving} className="bg-amber-600 hover:bg-amber-700">
                            {saving ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />Saving...</> : <><Check className="w-4 h-4 mr-2" />{isEditing ? 'Update' : 'Create'}</>}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ServiceCategoryForm;
