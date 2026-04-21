import { useEffect, useState } from 'react';
import { blogPostApi, blogCategoryApi, BlogPost as BlogPostType, BlogCategory } from '@/services/blog-services';
import { Button } from '@/common/ui/button';
import { Card, CardContent } from '@/common/ui/card';
import { Calendar, Clock, Tag, ChevronRight, Loader2 } from 'lucide-react';

export const BlogPost = () => {
    const [posts, setPosts] = useState<BlogPostType[]>([]);
    const [categories, setCategories] = useState<BlogCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

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
            <section className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }} />
                </div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-500" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">Our Blog</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                        Insights, tips, and trends in financial consultancy and accounting.
                    </p>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {featuredPost && (
                        <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 mb-12 overflow-hidden">
                            <div className="grid md:grid-cols-2">
                                {featuredPost.attributes.image ? (
                                    <div className="h-64 md:h-auto overflow-hidden">
                                        <img
                                            src={featuredPost.attributes.image}
                                            alt={featuredPost.attributes.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                ) : (
                                    <div className="h-64 md:h-auto bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                        <span className="text-white text-6xl font-bold">K&T</span>
                                    </div>
                                )}
                                <CardContent className="p-8 flex flex-col justify-center">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-full text-sm font-medium">
                                            Featured
                                        </span>
                                        {featuredPost.attributes.category_name && (
                                            <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 rounded-full text-sm font-medium flex items-center gap-1">
                                                <Tag className="w-3 h-3" />
                                                {featuredPost.attributes.category_name}
                                            </span>
                                        )}
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                                        {featuredPost.attributes.title}
                                    </h2>
                                    <p className="text-slate-600 mb-6 line-clamp-3">
                                        {featuredPost.attributes.excerpt || featuredPost.attributes.body?.slice(0, 200)}
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(featuredPost.attributes.published_at || featuredPost.attributes.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <Button className="w-fit bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white gap-2 shadow-md group-hover:shadow-lg transition-all duration-300">
                                        Read Article <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </CardContent>
                            </div>
                        </Card>
                    )}

                    {categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-8">
                            <button
                                onClick={() => setSelectedCategory('')}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === ''
                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:shadow-sm'
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
                                        : 'bg-white text-slate-600 hover:bg-slate-100 hover:shadow-sm'
                                        }`}
                                >
                                    {cat.attributes.name}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.filter(p => p.id !== featuredPost?.id).map(post => (
                            <Card key={post.id} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden flex flex-col">
                                {post.attributes.image ? (
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={post.attributes.image}
                                            alt={post.attributes.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 p-0 group-hover:translate-x-1 transition-transform">
                                            Read more
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};