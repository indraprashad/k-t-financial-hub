import { ServicesContent } from '@/services/service';
import { Button } from '@/common/ui/button';
import { TableCell, TableRow } from '@/common/ui/table';
import { Pencil, Trash2, ImageIcon } from 'lucide-react';

interface ServiceRowProps {
    service: ServicesContent;
    onEdit: (s: ServicesContent) => void;
    onDelete: (id: string) => void;
}

export const ServiceRow = ({ service, onEdit, onDelete }: ServiceRowProps) => (
    <TableRow className="group hover:bg-amber-50/50 transition-colors">
        <TableCell className="font-medium">{service.attributes.item_index}</TableCell>
        <TableCell>
            <div className="flex items-center gap-3">
                {service.attributes.image ? (
                    <img src={service.attributes.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                ) : (
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                        <ImageIcon className="w-5 h-5 text-slate-400" />
                    </div>
                )}
                <div>
                    <p className="font-semibold text-slate-900">{service.attributes.title}</p>
                    <p className="text-xs text-slate-500">{service.attributes.service_id}</p>
                </div>
            </div>
        </TableCell>
        <TableCell className="max-w-xs truncate">{service.attributes.description}</TableCell>
        <TableCell>
            {service.attributes.category_name ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {service.attributes.category_name}
                </span>
            ) : (
                <span className="text-slate-400 text-xs">-</span>
            )}
        </TableCell>
        <TableCell className="text-right">
            <div className="flex items-center justify-end gap-2">
                <Button variant="ghost" size="icon" onClick={() => onEdit(service)} className="hover:bg-amber-100">
                    <Pencil className="w-4 h-4 text-amber-600" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onDelete(service.id)} className="hover:bg-red-100">
                    <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
            </div>
        </TableCell>
    </TableRow>
);

export default ServiceRow;
