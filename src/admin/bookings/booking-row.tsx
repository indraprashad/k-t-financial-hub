import { ConsultationBooking } from '@/services/booking';
import { Button } from '@/common/ui/button';
import { TableCell, TableRow } from '@/common/ui/table';
import { Eye, Trash2 } from 'lucide-react';

interface BookingRowProps {
    booking: ConsultationBooking;
    onView: (b: ConsultationBooking) => void;
    onDelete: (id: string) => void;
}

export const BookingRow = ({ booking, onView, onDelete }: BookingRowProps) => (
    <TableRow className="group hover:bg-amber-50/50 transition-colors">
        <TableCell>
            <div>
                <p className="font-semibold text-slate-900">{booking.attributes.name}</p>
                <p className="text-xs text-slate-500">{booking.attributes.email}</p>
            </div>
        </TableCell>
        <TableCell>
            <p className="text-sm text-slate-700">{booking.attributes.service}</p>
        </TableCell>
        <TableCell>
            <p className="text-sm text-slate-700">{booking.attributes.phone}</p>
        </TableCell>
        <TableCell>
            <span className="text-xs text-slate-500">
                {new Date(booking.attributes.preferred_date).toLocaleDateString()}
            </span>
        </TableCell>
        <TableCell>
            <span className="text-xs text-slate-500">
                {new Date(booking.attributes.created_at).toLocaleDateString()}
            </span>
        </TableCell>
        <TableCell className="text-right">
            <div className="flex items-center justify-end gap-2">
                <Button variant="ghost" size="icon" onClick={() => onView(booking)} className="hover:bg-amber-100">
                    <Eye className="w-4 h-4 text-amber-600" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onDelete(booking.id)} className="hover:bg-red-100">
                    <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
            </div>
        </TableCell>
    </TableRow>
);

export default BookingRow;
