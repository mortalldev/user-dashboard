import { useCardProductsQuery } from '@/features/products';
import { CardsPagination } from '@/pages/cards/ui/pagination';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';
import CardProductCards from '@/pages/products/card-product/card';
import Loader from '@/widgets/loader';

const ITEMS_PER_PAGE = 10;

const CardProducts = () => {
    const { data, isLoading } = useCardProductsQuery(undefined);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const debouncedSearch = useDebounce(search, 400);

    const filtered = useMemo(() => {
        if (!data) return [];
        return data.data.filter((p) =>
            p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
    }, [data, debouncedSearch]);

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="flex flex-col h-full gap-3">
            <div className="w-full max-w-sm border rounded-xl flex items-center pl-3 focus-within:border-primary bg-input duration-200">
                <Search size={18} className="text-muted-foreground" />

                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="pl-2 py-5 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar">
                {paginated.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 border rounded-xl">
                        <p className="text-lg font-medium">Not Found</p>
                        <p className="text-sm text-muted-foreground">No card products available</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
                        {paginated.map((item) => (
                            <CardProductCards key={item.id} item={item} />
                        ))}
                    </div>
                )}
            </div>

            <div className="shrink-0 border-t pt-3">
                <CardsPagination
                    page={page}
                    lastPage={totalPages}
                    onPrev={() => setPage((p) => p - 1)}
                    onNext={() => setPage((p) => p + 1)}
                />
            </div>
        </div>
    );
};

export default CardProducts;
