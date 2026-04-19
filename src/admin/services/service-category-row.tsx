import { ServiceCategory } from '@/services/service-category';
import { Button } from '@/common/ui/button';
import { TableCell, TableRow } from '@/common/ui/table';
import { Pencil, Trash2 } from 'lucide-react';

interface ServiceCategoryRowProps {
    category: ServiceCategory;
    onEdit: (c: ServiceCategory) => void;
    onDelete: (id: string) => void;
}

export const ServiceCategoryRow = ({ category, onEdit, onDelete }: ServiceCategoryRowProps) => (
    <TableRow className="group hover:bg-amber-50/50 transition-colors">
        <TableCell>
            <div>
                <p className="font-semibold text-slate-900">{category.attributes.name}</p>
                <p className="text-xs text-slate-500">{category.attributes.slug}</p>
            </div>
        </TableCell>
        <TableCell className="max-w-xs truncate">{category.attributes.description || '-'}</TableCell>
        <TableCell className="text-right">
            <div className="flex items-center justify-end gap-2">
                <Button variant="ghost" size="icon" onClick={() => onEdit(category)} className="hover:bg-amber-100">
                    <Pencil className="w-4 h-4 text-amber-600" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onDelete(category.id)} className="hover:bg-red-100">
                    <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
            </div>
        </TableCell>
    </TableRow>
);

export default ServiceCategoryRow;
