import { TableCell, TableRow } from '@/common/ui/table';
import { Skeleton } from '@/common/ui/skeleton';

export const ServiceCategorySkeleton = () => (
    <TableRow>
        <TableCell>
            <div className="space-y-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
            </div>
        </TableCell>
        <TableCell><Skeleton className="h-4 w-48" /></TableCell>
        <TableCell className="text-right"><Skeleton className="h-8 w-20 ml-auto" /></TableCell>
    </TableRow>
);

export default ServiceCategorySkeleton;
