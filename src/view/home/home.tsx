import { useEffect, useState } from 'react';
import { homeContentApi, HomeContent, TrustBadge } from '@/services/home-service';
import { Button } from '@/common/ui/button';
import { Card, CardContent } from '@/common/ui/card';
import { TrendingUp, Users, Award, Clock, ArrowRight, Sparkles, Shield, Target, CheckCircle2, ChevronDown } from 'lucide-react';
import * as Icons from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
    'hero': <Sparkles className="w-6 h-6" />,
    'stat': <TrendingUp className="w-5 h-5" />,
    'feature': <Shield className="w-6 h-6" />,
    'cta': <Target className="w-6 h-6" />,
};

export default function Home() {
    const [content, setContent] = useState<HomeContent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [perPage] = useState(10);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const data = await homeContentApi.getAll({ page, per_page: perPage });
                setContent(data?.data);
            } catch (err) {
                setError('Failed to load home content');
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, [page, perPage]);

    const hero = content.find(c => c.attributes.content_type === 'hero');
    const stats = content.filter(c => c.attributes.content_type === 'stat');

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="text-slate-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                <Card className="p-8 text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <Button onClick={() => window.location.reload()}>Retry</Button>
                </Card>
            </div>
        );
    }

    const getBadgeIcon = (badge: TrustBadge | string) => {
        // Handle both string (legacy) and object (new) formats
        let badgeText: string;
        let badgeIcon: string | undefined;

        if (typeof badge === 'string') {
            // Legacy format: badge is just a string
            badgeText = badge;
            badgeIcon = undefined;
        } else {
            // New format: badge is an object with text and optional icon
            badgeText = badge.text || '';
            badgeIcon = badge.icon;
        }

        // Use custom icon if available
        if (badgeIcon) {
            const IconComponent = Icons[badgeIcon as keyof typeof Icons] as React.ComponentType<any>;
            if (IconComponent) {
                return <IconComponent className="w-4 h-4 text-amber-400" />;
            }
        }

        // Fallback to text-based icon detection
        if (!badgeText) return <Shield className="w-4 h-4 text-amber-400" />;

        const lower = badgeText.toLowerCase();
        if (lower.includes('award') || lower.includes('win')) return <Award className="w-4 h-4 text-amber-400" />;
        if (lower.includes('cert') || lower.includes('iso')) return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
        if (lower.includes('cpa') || lower.includes('reg')) return <Shield className="w-4 h-4 text-blue-400" />;
        return <Shield className="w-4 h-4 text-amber-400" />;
    };

    const scrollToStats = () => {
        document.getElementById('stats-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            {hero && (
                <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0 animate-pulse" style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                            backgroundSize: '40px 40px'
                        }} />
                    </div>
                    <div className="absolute right-0 top-0 w-2/3 h-full bg-gradient-to-l from-blue-600/30 to-transparent animate-in fade-in duration-1000" />
                    <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-gradient-to-tr from-amber-500/20 to-transparent rounded-full blur-3xl animate-in fade-in duration-1000 delay-200" />
                    <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-500" />

                    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Content */}
                            <div className="space-y-6 animate-in fade-in slide-in-from-left-8 duration-700 flex flex-col items-center lg:items-start text-center lg:text-left">
                                {/* Badge */}
                                {hero.attributes?.heading && (
                                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/40 rounded-full px-4 py-2 hover:scale-105 transition-transform cursor-default shadow-sm shadow-amber-500/10">
                                        <Award className="w-4 h-4 text-amber-400 shrink-0" />
                                        <span className="text-amber-300 text-sm font-semibold uppercase tracking-widest">{hero.attributes.heading}</span>
                                    </div>
                                )}

                                {/* Title */}
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                                    {hero?.attributes?.title}
                                    {hero.attributes?.text && (
                                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 mt-1">
                                            {hero.attributes.text}
                                        </span>
                                    )}
                                </h1>

                                {/* Subtitle */}
                                {hero.attributes?.subtitle && (
                                    <p className="text-slate-200 text-lg md:text-xl leading-relaxed max-w-2xl break-words font-light">
                                        {hero.attributes.subtitle}
                                    </p>
                                )}
                                {hero.attributes?.description && (
                                    <p className="text-slate-400 text-base leading-relaxed max-w-2xl break-words">
                                        {hero.attributes.description}
                                    </p>
                                )}

                                {/* CTA Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start w-full">
                                    <Button
                                        onClick={() => window.location.href = '#booking'}
                                        size="lg"
                                        className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-bold text-base px-8 rounded-xl shadow-lg shadow-amber-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/40 group"
                                    >
                                        Get Started
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                    <Button
                                        onClick={() => window.location.href = '#contact'}
                                        size="lg"
                                        variant="outline"
                                        className="border-slate-500/70 text-slate-200 bg-white/5 hover:bg-white/10 hover:border-slate-400 hover:text-white font-semibold text-base px-8 rounded-xl transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-sm"
                                    >
                                        Learn More
                                    </Button>
                                </div>

                                {/* Trust Badges */}
                                {hero?.attributes?.trust_badge && hero.attributes.trust_badge.length > 0 && (
                                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-8 border-t border-slate-700/40 w-full">
                                        {hero.attributes.trust_badge.map((badge, index) => {
                                            const badgeText = typeof badge === 'string' ? badge : badge.text || '';
                                            return (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-2 text-slate-400 text-sm hover:text-slate-200 transition-colors cursor-default group"
                                                >
                                                    <span className="group-hover:scale-110 transition-transform">{getBadgeIcon(badge)}</span>
                                                    <span className="font-medium">{badgeText}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Right Image */}
                            {hero?.attributes?.image?.attributes?.url && (
                                <div className="relative animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
                                    <div className="absolute -inset-6 bg-gradient-to-r from-amber-400/15 to-blue-500/15 rounded-[2.5rem] blur-3xl" />
                                    <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/50 ring-1 ring-white/10">
                                        <img
                                            src={hero.attributes.image.attributes.url}
                                            alt="Hero"
                                            className="w-full h-auto hover:scale-[1.02] transition-transform duration-700"
                                            fetchPriority="high"
                                            width={1168}
                                            height={656}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-blue-500/10 pointer-events-none" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    {stats.length > 0 && (
                        <button
                            onClick={scrollToStats}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-all duration-300 cursor-pointer group"
                        >
                            <span className="text-xs uppercase tracking-widest group-hover:translate-y-[-2px] transition-transform">Explore</span>
                            <ChevronDown className="w-5 h-5 animate-bounce group-hover:animate-bounce-fast" />
                        </button>
                    )}
                </section>
            )}

            {/* Stats Section */}
            {stats.length > 0 && (
                <section id="stats-section" className="relative -mt-8 lg:-mt-20 z-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                        <Card className="bg-white shadow-2xl shadow-slate-900/10 border-0 overflow-hidden">
                            <div className="h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-blue-500" />
                            <CardContent className="p-8 md:p-10">
                                <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                                    {stats.map((s, index) => {
                                        const getStatIcon = () => {
                                            if (s.attributes?.icon) {
                                                const IconComponent = Icons[s.attributes.icon as keyof typeof Icons] as React.ComponentType<any>;
                                                if (IconComponent) {
                                                    return <IconComponent className="w-6 h-6" />;
                                                }
                                            }
                                            if (index === 0) return <Users className="w-6 h-6 text-blue-600" />;
                                            if (index === 1) return <Award className="w-6 h-6 text-amber-600" />;
                                            if (index === 2) return <Clock className="w-6 h-6 text-emerald-600" />;
                                            return <TrendingUp className="w-6 h-6 text-purple-600" />;
                                        };

                                        const getIconColor = () => {
                                            if (s.attributes?.icon) {
                                                return 'text-blue-600';
                                            }
                                            if (index === 0) return 'text-blue-600';
                                            if (index === 1) return 'text-amber-600';
                                            if (index === 2) return 'text-emerald-600';
                                            return 'text-purple-600';
                                        };

                                        return (
                                            <div key={s.attributes?.label || index} className="text-center group cursor-default py-6 md:py-0 md:px-8 first:pt-0 last:pb-0 md:first:pl-0 md:last:pr-0">
                                                <div className={`w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-md ${getIconColor()}`}>
                                                    {getStatIcon()}
                                                </div>
                                                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors duration-300 tracking-tight">
                                                    {s.attributes?.value}
                                                </div>
                                                <div className="text-slate-500 text-xs font-semibold uppercase tracking-widest mt-1">
                                                    {s.attributes?.label}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            )}

            {/* Spacing after stats */}
            {stats.length > 0 && <div className="h-20" />}
        </div>
    );
}
