import { BlogPost } from '@/services/blog-services';
import { Button } from '@/common/ui/button';
import { TableCell, TableRow } from '@/common/ui/table';
import { Pencil, Trash2, ImageIcon } from 'lucide-react';

interface BlogRowProps {
    post: BlogPost;
    onEdit: (p: BlogPost) => void;
    onDelete: (id: string) => void;
}

export const BlogRow = ({ post, onEdit, onDelete }: BlogRowProps) => (
    <TableRow className="group hover:bg-amber-50/50 transition-colors">
        <TableCell>
            <div className="flex items-center gap-3">
                {post.attributes.image ? (
                    <img src={post.attributes.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                ) : (
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                        <ImageIcon className="w-5 h-5 text-slate-400" />
                    </div>
                )}
                <div>
                    <p className="font-semibold text-slate-900">{post.attributes.title}</p>
                    <p className="text-xs text-slate-500">{post.attributes.slug}</p>
                </div>
            </div>
        </TableCell>
        <TableCell>
            {post.attributes.category_name ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {post.attributes.category_name}
                </span>
            ) : (
                <span className="text-slate-400 text-xs">-</span>
            )}
        </TableCell>
        <TableCell>
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${post.attributes.published ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'}`}>
                {post.attributes.published ? 'Published' : 'Draft'}
            </span>
        </TableCell>
        <TableCell className="text-right">
            <div className="flex items-center justify-end gap-2">
                <Button variant="ghost" size="icon" onClick={() => onEdit(post)} className="hover:bg-amber-100">
                    <Pencil className="w-4 h-4 text-amber-600" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onDelete(post.id)} className="hover:bg-red-100">
                    <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
            </div>
        </TableCell>
    </TableRow>
);

export default BlogRow;
