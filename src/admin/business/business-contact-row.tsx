import { BusinessContact } from '@/services/business-services';
import { Button } from '@/common/ui/button';
import { TableCell, TableRow } from '@/common/ui/table';
import { Pencil, Trash2 } from 'lucide-react';

interface BusinessContactRowProps {
    contact: BusinessContact;
    onEdit: (c: BusinessContact) => void;
    onDelete: (id: string) => void;
}

export const BusinessContactRow = ({ contact, onEdit, onDelete }: BusinessContactRowProps) => (
    <TableRow className="group hover:bg-amber-50/50 transition-colors">
        <TableCell>
            <div>
                <p className="font-semibold text-slate-900">{contact.attributes.title || 'Untitled'}</p>
                <p className="text-xs text-slate-500">{contact.attributes.content_type}</p>
            </div>
        </TableCell>
        <TableCell>
            <p className="text-sm text-slate-700">{contact.attributes.address || '-'}</p>
        </TableCell>
        <TableCell>
            <p className="text-sm text-slate-700">{contact.attributes.phone || '-'}</p>
        </TableCell>
        <TableCell>
            <p className="text-sm text-slate-700">{contact.attributes.email || '-'}</p>
        </TableCell>
        <TableCell className="text-right">
            <div className="flex items-center justify-end gap-2">
                <Button variant="ghost" size="icon" onClick={() => onEdit(contact)} className="hover:bg-amber-100">
                    <Pencil className="w-4 h-4 text-amber-600" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onDelete(contact.id)} className="hover:bg-red-100">
                    <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
            </div>
        </TableCell>
    </TableRow>
);

export default BusinessContactRow;
