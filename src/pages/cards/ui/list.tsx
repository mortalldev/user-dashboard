import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List } from 'lucide-react';
import Loader from '@/widgets/loader';
import { CardsFilter, type CardsFilter as CardsFilterType } from '@/pages/cards/ui/filter';
import { useCardsQuery } from '@/features/cards';
import { CardItem } from '@/pages/cards/ui/card';
import { CardsTable } from '@/pages/cards/ui/table';
import { CardsPagination } from '@/pages/cards/ui/pagination';

const DEFAULT_FILTER: CardsFilterType = {
    search: '',
    type: 'all',
    status: 'all',
};

const CardsList = () => {
    const [page, setPage] = useState(1);
    const [view, setView] = useState<'card' | 'table'>('card');
    const [filter, setFilter] = useState<CardsFilterType>(DEFAULT_FILTER);
    const navigate = useNavigate();

    const { data, isLoading } = useCardsQuery({ page, perPage: 10 });

    const cards = useMemo(() => {
        const raw = data?.data ?? [];

        return raw.filter((card: any) => {
            const matchSearch = filter.search
                ? card.card_number.includes(filter.search.replace(/\s/g, ''))
                : true;

            const matchType = filter.type !== 'all' ? card.type === filter.type : true;

            const matchStatus =
                filter.status !== 'all' ? card.status === Number(filter.status) : true;

            return matchSearch && matchType && matchStatus;
        });
    }, [data, filter]);

    const lastPage = data?.last_page ?? 1;

    const handleFilterChange = (newFilter: CardsFilterType) => {
        setFilter(newFilter);
        setPage(1);
    };

    const handleReset = () => {
        setFilter(DEFAULT_FILTER);
        setPage(1);
    };

    const handleView = (id: number) => navigate(`/cards/${id}`);
    const onPrev = () => setPage((p) => Math.max(1, p - 1));
    const onNext = () => setPage((p) => Math.min(lastPage, p + 1));

    if (isLoading) return <Loader />;

    return (
        <div className="w-full flex flex-col gap-4 h-full overflow-hidden">
            <div className="flex items-center justify-between shrink-0">
                <CardsFilter filter={filter} onChange={handleFilterChange} onReset={handleReset} />
                <div className="flex gap-2">
                    <Button
                        size="icon"
                        variant={view === 'card' ? 'default' : 'ghost'}
                        onClick={() => setView('card')}
                    >
                        <LayoutGrid className="w-4 h-4" />
                    </Button>
                    <Button
                        size="icon"
                        variant={view === 'table' ? 'default' : 'ghost'}
                        onClick={() => setView('table')}
                    >
                        <List className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar pr-1">
                {view === 'card' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {cards.length === 0 ? (
                            <p className="text-sm text-muted-foreground col-span-full text-center py-10">
                                No cards found
                            </p>
                        ) : (
                            cards.map((card: any) => (
                                <CardItem
                                    key={card.id}
                                    card={card}
                                    onClick={() => handleView(card.id)}
                                />
                            ))
                        )}
                    </div>
                )}

                {view === 'table' && (
                    <div className="w-full space-y-4">
                        {cards.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-10">
                                No cards found
                            </p>
                        ) : (
                            <>
                                <CardsTable cards={cards} onView={handleView} />
                                <CardsPagination
                                    page={page}
                                    lastPage={lastPage}
                                    onPrev={onPrev}
                                    onNext={onNext}
                                />
                            </>
                        )}
                    </div>
                )}
            </div>

            {view === 'card' && lastPage > 1 && cards.length > 0 && (
                <div className="shrink-0">
                    <CardsPagination
                        page={page}
                        lastPage={lastPage}
                        onPrev={onPrev}
                        onNext={onNext}
                    />
                </div>
            )}
        </div>
    );
};

export default CardsList;
