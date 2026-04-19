import { Card, CardContent } from '@/common/ui/card';

interface TimelineCardProps {
    event: {
        id: string | number;
        attributes: {
            year?: string;
            heading?: string;
            paragraphs?: string[];
            text?: string;
        };
    };
}

export const TimelineCard = ({ event }: TimelineCardProps) => (
    <Card className="group border-0 shadow-lg shadow-slate-900/5 hover:shadow-2xl hover:shadow-amber-900/10 hover:-translate-y-2 text-center bg-white transition-all duration-500 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-xl shadow-amber-500/30 group-hover:scale-110 transition-transform duration-500">
                <span className="text-white font-bold text-lg">{event.attributes.year || ''}</span>
            </div>
        </div>
        <CardContent className="pt-14 pb-8 px-6">
            {event.attributes.heading && (
                <h4 className="font-bold text-xl text-slate-900 mb-3">{event.attributes.heading}</h4>
            )}
            <p className="text-slate-600 leading-relaxed">
                {event.attributes.paragraphs?.[0] || event.attributes.text}
            </p>
        </CardContent>
    </Card>
);

export default TimelineCard;
