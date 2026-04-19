import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import PageHeader from '@/common/page-header';
import { blogPostApi, BlogPostInput } from '@/services/blog-services';
import { blogCategoryApi, BlogCategory } from '@/services/blog-services';
import { Button } from '@/common/ui/button';
import { ImageUpload } from '@/common/ui/image-upload';

interface FormData extends BlogPostInput {
    body: string;
}

const BlogForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);
    const [form, setForm] = useState<FormData>({ title: '', excerpt: '', body: '', image: '', published: false, featured: false, category_id: '' });
    const [categories, setCategories] = useState<BlogCategory[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await blogCategoryApi.getAll({ page: 1, per_page: 100 });
                setCategories(res.data);
            } catch {}
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (!isEditing || !id) return;
        const fetch = async () => {
            try {
                setLoading(true);
                const item = await blogPostApi.getById(id);
                const a = item.attributes;
                setForm({ title: a.title, excerpt: a.excerpt || '', body: a.body || '', image: a.image || '', published: a.published, featured: a.featured, category_id: a.category ? String(a.category) : '' });
            } catch { setError('Failed to load post'); } finally { setLoading(false); }
        };
        fetch();
    }, [id, isEditing]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title.trim()) { setError('Title is required'); return; }
        try {
            setSaving(true);
            const data = { ...form, category_id: form.category_id || null };
            if (isEditing && id) await blogPostApi.update(id, data); else await blogPostApi.create(data);
            navigate('/admin/blogs');
        } catch { setError(isEditing ? 'Failed to update' : 'Failed to create'); } finally { setSaving(false); }
    };

    const update = (field: keyof FormData, value: string | boolean | string[]) => setForm(f => ({ ...f, [field]: value }));

    if (loading) return (
        <div className="h-full flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full" />
        </div>
    );

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-500">
            <PageHeader title={isEditing ? 'Edit Post' : 'Add Post'} subtitle={isEditing ? 'Update blog post' : 'Create new blog post'} buttonLabel="Back" buttonIcon={<ArrowLeft className="w-4 h-4" />} onButtonClick={() => navigate('/admin/blogs')} />
            <div className="flex-1 overflow-auto mt-6">
                {error && <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">{error}</div>}
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-6 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                                <select value={form.category_id || ''} onChange={e => update('category_id', e.target.value)} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-white">
                                    <option value="">Select category...</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.attributes.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Title *</label>
                                <input type="text" value={form.title} onChange={e => update('title', e.target.value)} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" placeholder="Post title" required />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Excerpt</label>
                                <textarea value={form.excerpt} onChange={e => update('excerpt', e.target.value)} rows={3} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all resize-none" placeholder="Short summary" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Body</label>
                                <textarea value={form.body} onChange={e => update('body', e.target.value)} rows={8} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all resize-none" placeholder="Post content" />
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <ImageUpload value={form.image || null} onChange={v => update('image', v || '')} label="Featured Image" className="w-full" />
                            </div>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={form.published} onChange={e => update('published', e.target.checked)} className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500" />
                                    <span className="text-sm text-slate-700">Published</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={form.featured} onChange={e => update('featured', e.target.checked)} className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500" />
                                    <span className="text-sm text-slate-700">Featured</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
                        <Button type="button" variant="outline" onClick={() => navigate('/admin/blogs')}>Cancel</Button>
                        <Button type="submit" disabled={saving} className="bg-amber-600 hover:bg-amber-700">
                            {saving ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />Saving...</> : <><Check className="w-4 h-4 mr-2" />{isEditing ? 'Update' : 'Create'}</>}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BlogForm;
