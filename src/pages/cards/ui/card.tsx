import { Card, CardContent } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';
import { formatCard } from '@/shared/lib/utils';
import type { CardData } from '@/features/cards/type';
import { StatusBadge } from '@/pages/cards/ui/badge';

type Props = {
    card: CardData;
    onClick: () => void;
};

export const CardItem = ({ card, onClick }: Props) => (
    <Card
        onClick={onClick}
        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg hover:scale-[0.99] transition cursor-pointer"
    >
        <CardContent className="p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <CreditCard className="w-4 h-4 text-purple-400" />
                    <span>{card.bank ?? 'Unknown Bank'}</span>
                </div>
                <StatusBadge status={card.status} />
            </div>

            <div className="text-lg font-mono font-semibold tracking-widest text-white">
                {formatCard(card.card_number)}
            </div>

            <div className="flex justify-between text-xs text-muted-foreground">
                <span>
                    Expires: <span className="text-white">{card.expire}</span>
                </span>
                <span>
                    Owner: <span className="text-white">{card.owner}</span>
                </span>
                <span>
                    Type: <span className="text-purple-400">{card.type}</span>
                </span>
            </div>

            <div className="text-xs text-muted-foreground">
                Added: {new Date(card.adding_date).toLocaleDateString()}
            </div>
        </CardContent>
    </Card>
);
