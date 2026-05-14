import { Button } from '@/components/ui/button';
import CardsList from '@/pages/cards/ui/list';
import { CreditCard, HandHeart } from 'lucide-react';
import { useState } from 'react';

const Cards = () => {
    const [tabs, setTabs] = useState<'card' | 'family'>('card');

    return (
        <div className="w-full h-full overflow-y-auto no-scrollbar">
            <div className="flex gap-1 bg-muted p-1 rounded-xl w-fit shrink-0">
                <Button
                    variant={tabs === 'card' ? 'default' : 'ghost'}
                    onClick={() => setTabs('card')}
                    className="flex items-center gap-2 px-5 py-2 rounded-lg"
                >
                    <CreditCard className="w-4 h-4" />
                    Admin cards
                </Button>

                <Button
                    variant={tabs === 'family' ? 'default' : 'ghost'}
                    onClick={() => setTabs('family')}
                    className="flex items-center gap-2 px-5 py-2 rounded-lg"
                >
                    <HandHeart className="w-4 h-4" />
                    Family cards
                </Button>
            </div>

            <div className="mt-4">
                <CardsList />
            </div>
        </div>
    );
};

export default Cards;
