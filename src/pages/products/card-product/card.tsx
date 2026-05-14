import { Badge } from '@/components/ui/badge';
import type { CardProductData } from '@/features/products/type';
import { CreditCard } from 'lucide-react';

interface CardProductCardsProps {
    item: CardProductData;
}

const CardProductCards = ({ item }: CardProductCardsProps) => {
    const isActive = item.active === '1';

    return (
        <div className="rounded-2xl border border-border/50 bg-card overflow-hidden flex flex-col transition-all hover:shadow-md hover:border-border">
            <div className="p-5 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-primary/10">
                            <CreditCard className="w-5 h-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                            <p className="font-semibold text-sm leading-tight truncate">
                                {item.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5 capitalize">
                                {item.type}
                            </p>
                        </div>
                    </div>
                    <Badge
                        variant={isActive ? 'default' : 'destructive'}
                        className="shrink-0 text-xs"
                    >
                        {isActive ? 'Active' : 'Inactive'}
                    </Badge>
                </div>

                <div className="h-px bg-border/50" />

                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    <div>
                        <p className="text-xs text-muted-foreground">Currency</p>
                        <p className="text-sm font-semibold mt-0.5">{item.currency_code}</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Category</p>
                        <p className="text-sm font-semibold mt-0.5 capitalize truncate">
                            {item.category}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Price</p>
                        <p className="text-sm font-semibold mt-0.5">{item.price}</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Delivery</p>
                        <p className="text-sm font-semibold mt-0.5">{item.delivery_price}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardProductCards;
