import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from "@/common/page-header";
import { businessContactApi, BusinessContact as BusinessContactType } from '@/services/business-services';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/common/ui/table';
import { Button } from '@/common/ui/button';
import { Plus, Sparkles, RefreshCw } from 'lucide-react';
import { BusinessContactRow } from './business-contact-row';
import { BusinessContactSkeleton } from './business-contact-skeleton';
import Pagination from '@/common/pagination';

const BusinessContact = () => {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState<BusinessContactType[]>([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchContacts = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await businessContactApi.getAll({ page, per_page: perPage, ordering: 'item_index' });
            setContacts(res.data || []);
            setTotal(res.meta?.total || 0);
        } catch {
            setError('Failed to load business contacts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchContacts(); }, [page, perPage]);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this contact?')) return;
        try {
            await businessContactApi.delete(id);
            fetchContacts();
        } catch {
            setError('Failed to delete contact');
        }
    };

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-500">
            <PageHeader
                title="Business Contacts"
                subtitle="Manage business contact information"
                buttonLabel="Add Contact"
                buttonIcon={<Plus className="w-4 h-4" />}
                onButtonClick={() => navigate('/admin/business/add')}
            />
            <div className="flex-1 overflow-auto mt-6 bg-white rounded-xl shadow-sm border border-slate-200">
                {error && (
                    <div className="m-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-center justify-between">
                        <span>{error}</span>
                        <Button variant="outline" size="sm" onClick={fetchContacts}><RefreshCw className="w-4 h-4" /></Button>
                    </div>
                )}
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                            <TableHead>Title</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? Array(5).fill(0).map((_, i) => <BusinessContactSkeleton key={i} />) :
                        contacts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-12">
                                    <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                    <p className="text-slate-500 text-lg">No contacts yet</p>
                                    <p className="text-slate-400 text-sm mt-1">Create your first business contact</p>
                                    <Button onClick={() => navigate('/admin/business/add')} className="mt-4 bg-amber-600 hover:bg-amber-700"><Plus className="w-4 h-4 mr-2" />Add Contact</Button>
                                </TableCell>
                            </TableRow>
                        ) : contacts.map(contact => (
                            <BusinessContactRow key={contact.id} contact={contact} onEdit={c => navigate(`/admin/business/edit/${c.id}`)} onDelete={handleDelete} />
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

export default BusinessContact;