import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from "@/common/page-header";
import { bookingApi, ConsultationBooking } from '@/services/booking';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/common/ui/table';
import { Button } from '@/common/ui/button';
import { Sparkles, RefreshCw } from 'lucide-react';
import { BookingRow } from './booking-row';
import { BookingSkeleton } from './booking-skeleton';
import Pagination from '@/common/pagination';

const ConsultantBooking = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState<ConsultationBooking[]>([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBookings = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await bookingApi.getAll({ page, per_page: perPage, ordering: '-created_at' });
            setBookings(res.data || []);
            setTotal(res.meta?.total || 0);
        } catch {
            setError('Failed to load bookings');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchBookings(); }, [page, perPage]);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this booking?')) return;
        try {
            await bookingApi.delete(id);
            fetchBookings();
        } catch {
            setError('Failed to delete booking');
        }
    };

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-500">
            <PageHeader
                title="Consultation Bookings"
                subtitle="Manage consultation bookings"
            />
            <div className="flex-1 overflow-auto mt-6 bg-white rounded-xl shadow-sm border border-slate-200">
                {error && (
                    <div className="m-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-center justify-between">
                        <span>{error}</span>
                        <Button variant="outline" size="sm" onClick={fetchBookings}><RefreshCw className="w-4 h-4" /></Button>
                    </div>
                )}
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                            <TableHead>Contact</TableHead>
                            <TableHead>Service</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Preferred Date</TableHead>
                            <TableHead>Submitted</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? Array(5).fill(0).map((_, i) => <BookingSkeleton key={i} />) :
                        bookings.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-12">
                                    <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                    <p className="text-slate-500 text-lg">No bookings yet</p>
                                    <p className="text-slate-400 text-sm mt-1">Consultation bookings will appear here</p>
                                </TableCell>
                            </TableRow>
                        ) : bookings.map(booking => (
                            <BookingRow key={booking.id} booking={booking} onView={b => navigate(`/admin/booking/${b.id}`)} onDelete={handleDelete} />
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

export default ConsultantBooking;