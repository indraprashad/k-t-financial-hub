import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from "@/common/page-header";
import { servicesContentApi, ServicesContent } from '@/services/service';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/common/ui/table';
import { Button } from '@/common/ui/button';
import { Plus, Sparkles, RefreshCw } from 'lucide-react';
import { ServiceRow } from './service-row';
import { ServiceSkeleton } from './service-skeleton';
import Pagination from '@/common/pagination';

const Services = () => {
    const navigate = useNavigate();
    const [services, setServices] = useState<ServicesContent[]>([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchServices = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await servicesContentApi.getAll({ page, per_page: perPage, ordering: 'item_index' });
            setServices(res.data);
            setTotal(res.meta?.total || 0);
        } catch {
            setError('Failed to load services');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchServices(); }, [page, perPage]);

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this service?')) return;
        try {
            await servicesContentApi.delete(id);
            if (services.length === 1 && page > 1) setPage(page - 1); else fetchServices();
        } catch {
            setError('Delete failed');
        }
    };

    if (error) return (
        <div className="min-h-[400px] flex items-center justify-center">
            <div className="text-center p-8 bg-red-50 rounded-2xl border border-red-100">
                <Sparkles className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-red-600 font-medium">{error}</p>
                <Button onClick={fetchServices} variant="outline" className="mt-4">
                    <RefreshCw className="w-4 h-4 mr-2" /> Retry
                </Button>
            </div>
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <PageHeader
                title="Financial Services"
                subtitle="Manage your financial services content"
                buttonLabel="Add Service"
                buttonIcon={<Plus className="w-4 h-4" />}
                onButtonClick={() => navigate('/admin/services/new')}
            />

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                            <TableHead className="w-16">#</TableHead>
                            <TableHead>Service</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            Array(5).fill(0).map((_, i) => <ServiceSkeleton key={i} />)
                        ) : services.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-12">
                                    <div className="text-slate-500">
                                        <p className="text-lg font-medium mb-2">No services found</p>
                                        <p className="text-sm">Add your first service to get started</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            services.map(s => (
                                <ServiceRow
                                    key={s.id}
                                    service={s}
                                    onEdit={() => navigate(`/admin/services/edit/${s.id}`)}
                                    onDelete={handleDelete}
                                />
                            ))
                        )}
                    </TableBody>
                </Table>
                <Pagination page={page} perPage={perPage} total={total} onPageChange={setPage} onPerPageChange={setPerPage} />
            </div>
        </div>
    );
};

export default Services;