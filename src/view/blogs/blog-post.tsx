import { useEffect, useState } from 'react';
import { blogPostApi, blogCategoryApi, BlogPost as BlogPostType, BlogCategory } from '@/services/blog-services';
import { Button } from '@/common/ui/button';
import { Card, CardContent } from '@/common/ui/card';
import { Calendar, Clock, Tag, ChevronRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const BlogPost = () => {
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

    const featuredPost = posts.find(p => p.attributes.featured) || posts[0];
    
    const nonFeaturedPosts = filteredPosts.filter(p => p.id !== featuredPost?.id);
    const displayPosts = nonFeaturedPosts.slice(0, 3);

    if (loading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            </div>
        );
    }

    if (error) return <div className="text-center py-12 text-red-600">{error}</div>;

    return (
        <div className="bg-white">
            <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
                <div className="text-center mb-14 px-4">
                    <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-purple-100 to-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4 hover:scale-105 transition-transform cursor-default">Latest Insights</span>
                    <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 tracking-tight">Our Blog</h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                        Insights, tips, and trends in financial consultancy and accounting.
                    </p>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {featuredPost && (
                        <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 mb-12 overflow-hidden rounded-2xl ring-1 ring-slate-100">
                            <div className="grid md:grid-cols-2">
                                {featuredPost.attributes.image ? (
                                    <div className="h-64 md:h-auto overflow-hidden">
                                        <img
                                            src={featuredPost.attributes.image}
                                            alt={featuredPost.attributes.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            fetchPriority="high"
                                            width={800}
                                            height={600}
                                        />
                                    </div>
                                ) : (
                                    <div className="h-64 md:h-auto bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                        <span className="text-white text-6xl font-bold">K&T</span>
                                    </div>
                                )}
                                <CardContent className="p-8 md:p-10 flex flex-col justify-center">
                                    <div className="flex items-center gap-2 mb-5">
                                        <span className="px-3 py-1 bg-gradient-to-r from-amber-100 to-amber-200 text-amber-700 rounded-full text-xs font-semibold uppercase tracking-wide">
                                            Featured
                                        </span>
                                        {featuredPost.attributes.category_name && (
                                            <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 rounded-full text-xs font-semibold flex items-center gap-1 uppercase tracking-wide">
                                                <Tag className="w-3 h-3" />
                                                {featuredPost.attributes.category_name}
                                            </span>
                                        )}
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-snug">
                                        {featuredPost.attributes.title}
                                    </h2>
                                    <p className="text-slate-500 mb-6 line-clamp-3 leading-relaxed">
                                        {featuredPost.attributes.excerpt || featuredPost.attributes.body?.slice(0, 200)}
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-slate-400 mb-6">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(featuredPost.attributes.published_at || featuredPost.attributes.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </div>
                                    <Button
                                        className="w-fit bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white gap-2 shadow-sm group-hover:shadow-md transition-all duration-300 rounded-xl"
                                        onClick={() => navigate(`/blog/${featuredPost.id}`)}
                                    >
                                        Read Article <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </CardContent>
                            </div>
                        </Card>
                    )}

                    {categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-10">
                            <button
                                onClick={() => setSelectedCategory('')}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === ''
                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-transparent'
                                    }`}
                            >
                                All
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.attributes.name)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === cat.attributes.name
                                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                >
                                    {cat.attributes.name}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayPosts.map(post => (
                            <Card key={post.id} className="group border-0 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 overflow-hidden flex flex-col rounded-2xl ring-1 ring-slate-100">
                                {post.attributes.image ? (
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={post.attributes.image}
                                            alt={post.attributes.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            loading="lazy"
                                            width={400}
                                            height={300}
                                        />
                                    </div>
                                ) : (
                                    <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                                        <span className="text-slate-400 text-4xl font-bold">K&T</span>
                                    </div>
                                )}
                                <CardContent className="p-6 flex flex-col flex-1">
                                    {post.attributes.category_name && (
                                        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
                                            {post.attributes.category_name}
                                        </span>
                                    )}
                                    <h3 className="text-base font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                                        {post.attributes.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm mb-4 line-clamp-3 flex-1 leading-relaxed">
                                        {post.attributes.excerpt || post.attributes.body?.slice(0, 150)}
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-400">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {new Date(post.attributes.published_at || post.attributes.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-blue-600 hover:text-blue-700 p-0 h-auto text-xs font-semibold group-hover:translate-x-1 transition-transform"
                                            onClick={() => navigate(`/blog/${post.id}`)}
                                        >
                                            Read more →
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {nonFeaturedPosts.length > 3 && (
                        <div className="text-center mt-12">
                            <Button
                                onClick={() => navigate('/blogs')}
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl hover:-translate-y-0.5"
                            >
                                See More Posts
                            </Button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};