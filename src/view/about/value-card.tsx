import { Card, CardContent } from '@/common/ui/card';
import { LucideIcon } from 'lucide-react';

interface ValueCardProps {
    value: {
        id: string | number;
        attributes: {
            heading?: string;
            text?: string;
        };
    };
    Icon: LucideIcon;
}

export const ValueCard = ({ value, Icon }: ValueCardProps) => (
    <Card className="group border-0 shadow-lg shadow-slate-900/5 hover:shadow-2xl hover:shadow-amber-900/10 hover:-translate-y-2 text-center bg-white transition-all duration-500">
        <CardContent className="p-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/25 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <Icon className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-bold text-xl text-slate-900 mb-3">{value.attributes.heading || ''}</h4>
            <p className="text-slate-600 leading-relaxed">{value.attributes.text || ''}</p>
        </CardContent>
    </Card>
);

export default ValueCard;
