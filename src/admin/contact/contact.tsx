import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from "@/common/page-header";
import { contactSubmissionApi, ContactSubmission } from '@/services/contact-services';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/common/ui/table';
import { Button } from '@/common/ui/button';
import { Sparkles, RefreshCw } from 'lucide-react';
import { ContactRow } from './contact-row';
import { ContactSkeleton } from './contact-skeleton';
import Pagination from '@/common/pagination';

const Contact = () => {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState<ContactSubmission[]>([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchContacts = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await contactSubmissionApi.getAll({ page, per_page: perPage, ordering: '-created_at' });
            setContacts(Array.isArray(res) ? res : []);
            setTotal(res.length || 0);
        } catch {
            setError('Failed to load contact submissions');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchContacts(); }, [page, perPage]);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this submission?')) return;
        try {
            await contactSubmissionApi.delete(id);
            fetchContacts();
        } catch {
            setError('Failed to delete submission');
        }
    };

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-500">
            <PageHeader
                title="Contact Submissions"
                subtitle="Manage contact form submissions"
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
                            <TableHead>Contact</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? Array(5).fill(0).map((_, i) => <ContactSkeleton key={i} />) :
                        contacts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-12">
                                    <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                    <p className="text-slate-500 text-lg">No submissions yet</p>
                                    <p className="text-slate-400 text-sm mt-1">Contact form submissions will appear here</p>
                                </TableCell>
                            </TableRow>
                        ) : contacts.map(contact => (
                            <ContactRow key={contact.id} contact={contact} onView={c => navigate(`/admin/contact/${c.id}`)} onDelete={handleDelete} />
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

export default Contact;