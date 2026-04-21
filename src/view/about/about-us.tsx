import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AboutServices, AboutContent } from '@/services/about-services';
import { Card, CardContent } from '@/common/ui/card';
import { TrendingUp, Eye, Users, Clock, Shield, Award, ArrowRight, Sparkles } from 'lucide-react';
import { TeamCard } from './team-card';
import { ValueCard } from './value-card';
import { TimelineCard } from './timeline-card';

const VALUE_ICONS = [Shield, Award, Users, Clock];

export const AboutUs = () => {
    const navigate = useNavigate();
    const [content, setContent] = useState<AboutContent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1)
    const perPage = 100

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const data = await AboutServices.getAll({ page, per_page: perPage });
                setContent(data?.data || []);
            } catch (err) {
                setError('Failed to load about content');
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, [page]);

    const hero = content.find(c => c.attributes.content_type === 'hero');
    const team = content.filter(c => c.attributes.content_type === 'team_member');
    const values = content.filter(c => c.attributes.content_type === 'value');
    const timeline = content.filter(c => c.attributes.content_type === 'timeline_event');

    if (loading) {
        return (
            <div className="min-h-[500px] flex flex-col items-center justify-center gap-6">
                <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-100 border-t-amber-600"></div>
                    <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-amber-200 opacity-20"></div>
                </div>
                <p className="text-slate-500 animate-pulse">Loading story...</p>
            </div>
        );
    }

    if (error) return (
        <div className="min-h-[400px] flex items-center justify-center">
            <div className="text-center p-8 bg-red-50 rounded-2xl border border-red-100">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6 text-red-500" />
                </div>
                <p className="text-red-600 font-medium">{error}</p>
            </div>
        </div>
    );

    return (
        <div className="bg-white overflow-hidden">
            {hero && (
                <section className="relative py-20 lg:py-28 bg-gradient-to-br from-slate-50 via-white to-amber-50/30 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-100/20 via-transparent to-transparent animate-pulse"></div>
                    <div className="absolute top-20 right-20 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl animate-pulse delay-500" />
                    <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100/50 to-amber-200/50 rounded-full hover:scale-105 transition-transform cursor-default">
                                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                                    <span className="text-amber-700 font-semibold text-sm tracking-wider uppercase">Our Story</span>
                                </div>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                                    {hero.attributes.heading}
                                </h1>
                                <p className="text-xl text-slate-600 leading-relaxed">{hero.attributes.subtitle}</p>
                                <p className="text-lg text-slate-500 leading-relaxed">{hero.attributes.paragraphs}</p>
                                <button
                                    onClick={() => navigate('/booking')}
                                    className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl hover:from-slate-800 hover:to-slate-700 hover:shadow-xl hover:shadow-slate-900/20 hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    <span className="font-semibold">Work With Us</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </button>
                            </div>
                            <div className="relative lg:pl-8 animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
                                <div className="absolute -inset-4 bg-gradient-to-r from-amber-200/30 to-amber-400/20 rounded-[2.5rem] blur-2xl animate-pulse"></div>
                                {hero.attributes.image ? (
                                    <img
                                        src={hero.attributes.image}
                                        alt=""
                                        className="relative w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl shadow-slate-900/10 hover:shadow-amber-500/20 transition-shadow duration-500"
                                        loading="lazy"
                                        width={680}
                                        height={382}
                                    />
                                ) : (
                                    <div className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center">
                                        <span className="text-slate-400 font-medium">No Image</span>
                                    </div>
                                )}
                                <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-6 shadow-xl shadow-slate-900/10 border border-slate-100 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Users className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-3xl font-bold text-slate-900">500+</div>
                                            <div className="text-sm text-slate-500">Happy Clients</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {(hero?.attributes?.mission || hero?.attributes?.vision) && (
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            {hero?.attributes?.mission && (
                                <Card className="group border-0 shadow-lg shadow-slate-900/5 hover:shadow-2xl hover:shadow-amber-900/10 hover:-translate-y-1 transition-all duration-500 bg-gradient-to-br from-white to-slate-50/50">
                                    <CardContent className="p-10">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                            <TrendingUp className="w-8 h-8 text-amber-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-amber-600 transition-colors">Our Mission</h3>
                                        <p className="text-slate-600 leading-relaxed text-lg">{hero.attributes.mission}</p>
                                    </CardContent>
                                </Card>
                            )}
                            {hero?.attributes?.vision && (
                                <Card className="group border-0 shadow-lg shadow-slate-900/5 hover:shadow-2xl hover:shadow-amber-900/10 hover:-translate-y-1 transition-all duration-500 bg-gradient-to-br from-white to-slate-50/50">
                                    <CardContent className="p-10">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                            <Eye className="w-8 h-8 text-amber-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-amber-600 transition-colors">Our Vision</h3>
                                        <p className="text-slate-600 leading-relaxed text-lg">{hero.attributes.vision}</p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {values.length > 0 && (
                <section className="py-24 bg-gradient-to-b from-white to-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-amber-100 to-amber-200 text-amber-700 rounded-full text-sm font-semibold mb-4 hover:scale-105 transition-transform cursor-default">What We Stand For</span>
                            <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Values</h2>
                            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                                The principles that guide everything we do.
                            </p>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {values.map((v, i) => <ValueCard key={v.id} value={v} Icon={VALUE_ICONS[i % VALUE_ICONS.length]} />)}
                        </div>
                    </div>
                </section>
            )}

            {team.length > 0 && (
                <section className="py-24 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-slate-200 to-slate-300 text-slate-700 rounded-full text-sm font-semibold mb-4 hover:scale-105 transition-transform cursor-default">The Experts</span>
                            <h2 className="text-4xl font-bold text-slate-900 mb-6">Meet Our Team</h2>
                            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                                Our experts bring decades of experience in finance and accounting.
                            </p>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {team.map((m) => <TeamCard key={m.id} member={m} />)}
                        </div>
                    </div>
                </section>
            )}

            {timeline.length > 0 && (
                <section className="py-24 bg-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-amber-100/30 via-transparent to-transparent animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-500" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="text-center mb-16">
                            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-amber-100 to-amber-200 text-amber-700 rounded-full text-sm font-semibold mb-4 hover:scale-105 transition-transform cursor-default">Through The Years</span>
                            <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Journey</h2>
                            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                                Milestones that shaped who we are today.
                            </p>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {timeline.map((e) => <TimelineCard key={e.id} event={e} />)}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};