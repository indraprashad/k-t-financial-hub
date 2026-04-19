import { ContactSubmission } from '@/services/contact-services';
import { Button } from '@/common/ui/button';
import { TableCell, TableRow } from '@/common/ui/table';
import { Eye, Trash2 } from 'lucide-react';

interface ContactRowProps {
    contact: ContactSubmission;
    onView: (c: ContactSubmission) => void;
    onDelete: (id: string) => void;
}

export const ContactRow = ({ contact, onView, onDelete }: ContactRowProps) => (
    <TableRow className="group hover:bg-amber-50/50 transition-colors">
        <TableCell>
            <div>
                <p className="font-semibold text-slate-900">{contact.attributes.name}</p>
                <p className="text-xs text-slate-500">{contact.attributes.email}</p>
            </div>
        </TableCell>
        <TableCell>
            <p className="text-sm text-slate-700 max-w-xs truncate">{contact.attributes.subject}</p>
        </TableCell>
        <TableCell>
            <p className="text-sm text-slate-700 max-w-xs truncate">{contact.attributes.message}</p>
        </TableCell>
        <TableCell>
            <span className="text-xs text-slate-500">
                {new Date(contact.attributes.created_at).toLocaleDateString()}
            </span>
        </TableCell>
        <TableCell className="text-right">
            <div className="flex items-center justify-end gap-2">
                <Button variant="ghost" size="icon" onClick={() => onView(contact)} className="hover:bg-amber-100">
                    <Eye className="w-4 h-4 text-amber-600" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onDelete(contact.id)} className="hover:bg-red-100">
                    <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
            </div>
        </TableCell>
    </TableRow>
);

export default ContactRow;
