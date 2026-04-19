import { Users } from 'lucide-react';
import type { AboutContent } from '@/services/about-services';

interface TeamCardProps {
    member: AboutContent;
}

export const TeamCard = ({ member }: TeamCardProps) => (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg shadow-slate-900/5 hover:shadow-2xl hover:shadow-slate-900/10 hover:-translate-y-2 transition-all duration-500">
        <div className="relative overflow-hidden">
            {member.attributes.image ? (
                <img
                    src={member.attributes.image}
                    alt={member.attributes.name}
                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700"
                />
            ) : (
                <div className="w-full h-72 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    <Users className="w-16 h-16 text-slate-400" />
                </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white/90 text-sm line-clamp-2">{member.attributes.bio}</p>
            </div>
        </div>
        <div className="p-5">
            <h4 className="font-bold text-lg text-slate-900">{member.attributes.name}</h4>
            <p className="text-amber-600 text-sm font-semibold uppercase tracking-wide">{member.attributes.role}</p>
        </div>
    </div>
);

export default TeamCard;
