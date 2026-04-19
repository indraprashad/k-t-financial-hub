import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from "@/common/page-header";
import { blogPostApi, BlogPost } from '@/services/blog-services';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/common/ui/table';
import { Button } from '@/common/ui/button';
import { Plus, Sparkles, RefreshCw } from 'lucide-react';
import { BlogRow } from './blog-row';
import { BlogSkeleton } from './blog-skeleton';
import Pagination from '@/common/pagination';

const Blogs = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPosts = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await blogPostApi.getAll({ page, per_page: perPage, ordering: '-created_at' });
            setPosts(res.data);
            setTotal(res.meta.total);
        } catch {
            setError('Failed to load blog posts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchPosts(); }, [page, perPage]);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        try {
            await blogPostApi.delete(id);
            if (posts.length === 1 && page > 1) setPage(page - 1);
            else fetchPosts();
        } catch {
            setError('Failed to delete post');
        }
    };

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-500">
            <PageHeader
                title="Blog Posts"
                subtitle="Manage your blog posts"
                buttonLabel="Add Post"
                buttonIcon={<Plus className="w-4 h-4" />}
                onButtonClick={() => navigate('/admin/blogs/new')}
            />
            <div className="flex-1 overflow-auto mt-6 bg-white rounded-xl shadow-sm border border-slate-200">
                {error && (
                    <div className="m-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-center justify-between">
                        <span>{error}</span>
                        <Button variant="outline" size="sm" onClick={fetchPosts}><RefreshCw className="w-4 h-4" /></Button>
                    </div>
                )}
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                            <TableHead>Post</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? Array(5).fill(0).map((_, i) => <BlogSkeleton key={i} />) :
                        posts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-12">
                                    <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                    <p className="text-slate-500 text-lg">No posts yet</p>
                                    <p className="text-slate-400 text-sm mt-1">Create your first blog post</p>
                                    <Button onClick={() => navigate('/admin/blogs/new')} className="mt-4 bg-amber-600 hover:bg-amber-700"><Plus className="w-4 h-4 mr-2" />Add Post</Button>
                                </TableCell>
                            </TableRow>
                        ) : posts.map(post => (
                            <BlogRow key={post.id} post={post} onEdit={p => navigate(`/admin/blogs/edit/${p.id}`)} onDelete={handleDelete} />
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

export default Blogs;
