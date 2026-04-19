import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from "@/common/page-header";
import { blogCategoryApi, BlogCategory as BlogCategoryType } from '@/services/blog-services';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/common/ui/table';
import { Button } from '@/common/ui/button';
import { Plus, Sparkles, RefreshCw } from 'lucide-react';
import { BlogCategoryRow } from './blog-category-row';
import { BlogCategorySkeleton } from './blog-category-skeleton';
import Pagination from '@/common/pagination';

const BlogCategory = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<BlogCategoryType[]>([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await blogCategoryApi.getAll({ page, per_page: perPage, ordering: 'name' });
            setCategories(res.data);
            setTotal(res.meta.total);
        } catch {
            setError('Failed to load categories');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchCategories(); }, [page, perPage]);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this category?')) return;
        try {
            await blogCategoryApi.delete(id);
            if (categories.length === 1 && page > 1) setPage(page - 1);
            else fetchCategories();
        } catch {
            setError('Failed to delete category');
        }
    };

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-500">
            <PageHeader
                title="Blog Categories"
                subtitle="Manage blog categories"
                buttonLabel="Add Category"
                buttonIcon={<Plus className="w-4 h-4" />}
                onButtonClick={() => navigate('/admin/category/add')}
            />
            <div className="flex-1 overflow-auto mt-6 bg-white rounded-xl shadow-sm border border-slate-200">
                {error && (
                    <div className="m-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-center justify-between">
                        <span>{error}</span>
                        <Button variant="outline" size="sm" onClick={fetchCategories}><RefreshCw className="w-4 h-4" /></Button>
                    </div>
                )}
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                            <TableHead>Category</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? Array(5).fill(0).map((_, i) => <BlogCategorySkeleton key={i} />) :
                        categories.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center py-12">
                                    <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                    <p className="text-slate-500 text-lg">No categories yet</p>
                                    <p className="text-slate-400 text-sm mt-1">Create your first blog category</p>
                                    <Button onClick={() => navigate('/admin/category/add')} className="mt-4 bg-amber-600 hover:bg-amber-700"><Plus className="w-4 h-4 mr-2" />Add Category</Button>
                                </TableCell>
                            </TableRow>
                        ) : categories.map(cat => (
                            <BlogCategoryRow key={cat.id} category={cat} onEdit={c => navigate(`/admin/category/${c.id}/edit`)} onDelete={handleDelete} />
                        ))}
                    </TableBody>
                </Table>
                <Pagination
                    page={page}
                    perPage={perPage}
                    total={total}
                    onPageChange={(p) => setPage(p)}
                    onPerPageChange={(p) => setPerPage(p)}
                />
            </div>
        </div>
    );
};

export default BlogCategory;