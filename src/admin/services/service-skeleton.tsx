import { TableCell, TableRow } from '@/common/ui/table';
import { Skeleton } from '@/common/ui/skeleton';

export const ServiceSkeleton = () => (
    <TableRow>
        <TableCell><Skeleton className="h-4 w-8" /></TableCell>
        <TableCell>
            <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <div className="space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-20" />
                </div>
            </div>
        </TableCell>
        <TableCell><Skeleton className="h-4 w-48" /></TableCell>
        <TableCell><Skeleton className="h-5 w-24 rounded-full" /></TableCell>
        <TableCell className="text-right"><Skeleton className="h-8 w-20 ml-auto" /></TableCell>
    </TableRow>
);

export default ServiceSkeleton;
