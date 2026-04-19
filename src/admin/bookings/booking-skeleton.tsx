import { TableCell, TableRow } from '@/common/ui/table';

export const BookingSkeleton = () => (
    <TableRow className="animate-pulse">
        <TableCell>
            <div className="space-y-2">
                <div className="h-4 bg-slate-200 rounded w-32" />
                <div className="h-3 bg-slate-100 rounded w-40" />
            </div>
        </TableCell>
        <TableCell>
            <div className="h-4 bg-slate-200 rounded w-32" />
        </TableCell>
        <TableCell>
            <div className="h-4 bg-slate-200 rounded w-28" />
        </TableCell>
        <TableCell>
            <div className="h-4 bg-slate-200 rounded w-24" />
        </TableCell>
        <TableCell>
            <div className="h-4 bg-slate-200 rounded w-24" />
        </TableCell>
        <TableCell className="text-right">
            <div className="flex items-center justify-end gap-2">
                <div className="h-8 w-8 bg-slate-200 rounded" />
                <div className="h-8 w-8 bg-slate-200 rounded" />
            </div>
        </TableCell>
    </TableRow>
);

export default BookingSkeleton;
