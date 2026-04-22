import { useEffect, useState } from 'react';
import { blogPostApi, blogCategoryApi, BlogPost as BlogPostType, BlogCategory } from '@/services/blog-services';
import { Button } from '@/common/ui/button';
import { Card, CardContent } from '@/common/ui/card';
import { Calendar, Clock, Tag, ChevronRight, Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AllBlogs = () => {
    const [posts, setPosts] = useState<BlogPostType[]>([]);
    const [categories, setCategories] = useState<BlogCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [postsData, catsData] = await Promise.all([
                    blogPostApi.getAll({ published: true, ordering: '-published_at' }),
                    blogCategoryApi.getAll()
                ]);
                setPosts(postsData?.data || []);
                setCategories(catsData?.data || []);
            } catch (err) {
                setError('Failed to load blog posts');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredPosts = selectedCategory
        ? posts.filter(p => p.attributes.category_name === selectedCategory)
        : posts;

    if (loading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            </div>
        );
    }

    if (error) return <div className="text-center py-12 text-red-600">{error}</div>;

    return (
        <div className="bg-white min-h-screen">
            <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 text-center">All Blog Posts</h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 text-center">
                            Explore all our insights, tips, and trends in financial consultancy and accounting.
                        </p>
                    </div>

                    {categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-8 justify-center">
                            <button
                                onClick={() => setSelectedCategory('')}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === ''
                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:shadow-sm border border-slate-200'
                                    }`}
                            >
                                All Posts
                            </button>
                            {categories.map(cat => {
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.attributes.name)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === cat.attributes.name
                                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                                            : 'bg-white text-slate-600 hover:bg-slate-100 hover:shadow-sm border border-slate-200'
                                            }`}
                                    >
                                        {cat.attributes.name}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {filteredPosts.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map(post => (
                                <Card key={post.id} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden flex flex-col">
                                    {post.attributes.image ? (
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                src={post.attributes.image}
                                                alt={post.attributes.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                                width={400}
                                                height={300}
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-48 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                                            <span className="text-slate-400 text-4xl font-bold">K&T</span>
                                        </div>
                                    )}
                                    <CardContent className="p-6 flex flex-col flex-1">
                                        {post.attributes.category_name && (
                                            <span className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-2 group-hover:text-indigo-600 transition-colors">
                                                {post.attributes.category_name}
                                            </span>
                                        )}
                                        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                            {post.attributes.title}
                                        </h3>
                                        <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-1">
                                            {post.attributes.excerpt || post.attributes.body?.slice(0, 150)}
                                        </p>
                                        <div className="flex items-center justify-between text-xs text-slate-500">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(post.attributes.published_at || post.attributes.created_at).toLocaleDateString()}
                                            </span>
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                className="text-blue-600 hover:text-blue-700 p-0 group-hover:translate-x-1 transition-transform"
                                                onClick={() => navigate(`/blog/${post.id}`)}
                                            >
                                                Read more
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="text-slate-400 text-6xl mb-4">📝</div>
                            <h3 className="text-xl font-semibold text-slate-700 mb-2">No posts found</h3>
                            <p className="text-slate-600">
                                {selectedCategory 
                                    ? `No posts found in "${selectedCategory}" category.`
                                    : 'No blog posts available at the moment.'
                                }
                            </p>
                            {selectedCategory && (
                                <Button 
                                    onClick={() => setSelectedCategory('')}
                                    className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                                >
                                    View All Posts
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default AllBlogs;
