import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogPostApi, BlogPost as BlogPostType } from '@/services/blog-services';
import { Button } from '@/common/ui/button';
import { Card, CardContent } from '@/common/ui/card';
import { Calendar, Clock, Tag, ChevronLeft, Loader2, User, ArrowLeft } from 'lucide-react';

const BlogDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<BlogPostType | null>(null);
    const [allPosts, setAllPosts] = useState<BlogPostType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) {
                setError('Blog post ID is required');
                setLoading(false);
                return;
            }

            try {
                const [postData, allPostsData] = await Promise.all([
                    blogPostApi.getById(id),
                    blogPostApi.getAll({ published: true, ordering: '-published_at' })
                ]);
                setPost(postData || null);
                setAllPosts(allPostsData?.data || []);
            } catch (err) {
                setError('Failed to load blog post');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="text-slate-400 text-6xl mb-4">📝</div>
                    <h2 className="text-2xl font-semibold text-slate-700 mb-2">Blog Post Not Found</h2>
                    <p className="text-slate-600 mb-6">{error || 'The blog post you are looking for does not exist.'}</p>
                    <Button
                        onClick={() => navigate('/blogs')}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    >
                        Back to All Blogs
                    </Button>
                </div>
            </div>
        );
    }

    const relatedPosts = post?.attributes.category_name
        ? allPosts.filter(p =>
            p.attributes.category_name === post.attributes.category_name &&
            p.id !== post.id
        ).slice(0, 3)
        : [];

    return (
        <div className="bg-white min-h-screen">
            <section className="relative from-blue-50 via-white to-indigo-50 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                            {post.attributes.title}
                        </h1>
                        <div className="flex items-center justify-center gap-6 text-slate-600 mb-8">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(post.attributes.published_at || post.attributes.created_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>5 min read</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>K & T Financial</span>
                            </div>
                            {post.attributes.category_name && (
                                <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-full text-sm font-medium mb-1">
                                    {post.attributes.category_name}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {post.attributes.image && (
                <section className="w-full -mt-8">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src={post.attributes.image}
                                alt={post.attributes.title}
                                className="w-full h-auto object-cover block"
                                loading="eager"
                            />
                        </div>
                    </div>
                </section>
            )}

            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <Card className="border-0 shadow-lg">
                    <CardContent className="p-8 md:p-12">
                        {post.attributes.excerpt && (
                            <div className="mb-8">
                                <p className="text-xl text-slate-600 italic leading-relaxed border-l-4 border-blue-500 pl-6">
                                    {post.attributes.excerpt}
                                </p>
                            </div>
                        )}

                        <div className="prose prose-lg max-w-none">
                            {post.attributes.body ? (
                                <div
                                    className="text-slate-700 leading-relaxed space-y-6 text-justify"
                                    dangerouslySetInnerHTML={{ __html: post.attributes.body }}
                                />
                            ) : (
                                <p className="text-slate-600">No content available for this blog post.</p>
                            )}
                        </div>

                    </CardContent>
                </Card>

                {relatedPosts.length > 0 && (
                    <section className="mt-16">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Related Posts</h2>
                            <p className="text-slate-600">More articles from {post.attributes.category_name}</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedPosts.map(relatedPost => (
                                <Card key={relatedPost.id} className="group border-0 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden flex flex-col">
                                    {relatedPost.attributes.image ? (
                                        <div className="h-40 overflow-hidden">
                                            <img
                                                src={relatedPost.attributes.image}
                                                alt={relatedPost.attributes.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                                width={400}
                                                height={300}
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-40 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                                            <span className="text-slate-400 text-3xl font-bold">K&T</span>
                                        </div>
                                    )}
                                    <CardContent className="p-4 flex flex-col flex-1">
                                        <h3 className="text-base font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                            {relatedPost.attributes.title}
                                        </h3>
                                        <p className="text-slate-600 text-sm mb-3 line-clamp-2 flex-1">
                                            {relatedPost.attributes.excerpt || relatedPost.attributes.body?.slice(0, 100)}
                                        </p>
                                        <div className="flex items-center justify-between text-xs text-slate-500">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(relatedPost.attributes.published_at || relatedPost.attributes.created_at).toLocaleDateString()}
                                            </span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-blue-600 hover:text-blue-700 p-0 group-hover:translate-x-1 transition-transform"
                                                onClick={() => navigate(`/blog/${relatedPost.id}`)}
                                            >
                                                Read more
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}

                <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-between">
                    <Button
                        onClick={() => navigate('/blogs')}
                        className="bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to All Blogs
                    </Button>

                    <Button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    >
                        Back to Top
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default BlogDetail;
