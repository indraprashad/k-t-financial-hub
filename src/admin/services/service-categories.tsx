import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from "@/common/page-header";
import { serviceCategoryApi, ServiceCategory } from '@/services/service-category';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/common/ui/table';
import { Button } from '@/common/ui/button';
import { Plus, Sparkles, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { ServiceCategoryRow } from './service-category-row';
import { ServiceCategorySkeleton } from './service-category-skeleton';
import Pagination from '@/common/pagination';

const ServiceCategories = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<ServiceCategory[]>([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await serviceCategoryApi.getAll({ page, per_page: perPage, ordering: 'name' });
            setCategories(res.data);
            setTotalPages(res.meta?.total || 1);
            setTotal(res.meta?.total || 0);
        } catch {
            setError('Failed to load categories');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchCategories(); }, [page, perPage]);

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this category?')) return;
        try {
            await serviceCategoryApi.delete(id);
            if (categories.length === 1 && page > 1) setPage(page - 1); else fetchCategories();
        } catch {
            setError('Delete failed');
        }
    };

    if (error) return (
        <div className="min-h-[400px] flex items-center justify-center">
            <div className="text-center p-8 bg-red-50 rounded-2xl border border-red-100">
                <Sparkles className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-red-600 font-medium">{error}</p>
                <Button onClick={fetchCategories} variant="outline" className="mt-4">
                    <RefreshCw className="w-4 h-4 mr-2" /> Retry
                </Button>
            </div>
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <PageHeader
                title="Service Categories"
                subtitle="Manage service categories"
                buttonLabel="Add Category"
                buttonIcon={<Plus className="w-4 h-4" />}
                onButtonClick={() => navigate('/admin/service-categories/new')}
            />

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                            <TableHead>Category</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            Array(5).fill(0).map((_, i) => <ServiceCategorySkeleton key={i} />)
                        ) : categories.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center py-12">
                                    <div className="text-slate-500">
                                        <p className="text-lg font-medium mb-2">No categories found</p>
                                        <p className="text-sm">Add your first category to get started</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            categories.map(c => (
                                <ServiceCategoryRow
                                    key={c.id}
                                    category={c}
                                    onEdit={() => navigate(`/admin/service-categories/edit/${c.id}`)}
                                    onDelete={handleDelete}
                                />
                            ))
                        )}
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

export default ServiceCategories;
