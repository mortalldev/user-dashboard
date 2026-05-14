import { useProductsQuery } from '@/features/products';
import Loader from '@/widgets/loader';
import { useState, useMemo } from 'react';
import type { ProductDataType } from '@/features/products/type';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';
import ProductFilter from '@/pages/products/loan-product/ui/filter';
import ProductTable from '@/pages/products/loan-product/ui/table';

const ProductList = () => {
    const [search, setSearch] = useState('');
    const [productType, setProductType] = useState<ProductDataType | 'all'>('all');

    const debouncedSearch = useDebounce(search, 400);

    const { data, isLoading } = useProductsQuery(undefined);

    const filteredProduct = useMemo(() => {
        if (!data?.data) return [];

        return data.data.filter((p) => {
            const matchesSearch = p.title_en.toLowerCase().includes(debouncedSearch.toLowerCase());

            const matchesType = productType === 'all' || p.type === productType;

            return matchesSearch && matchesType;
        });
    }, [data, debouncedSearch, productType]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="h-full overflow-hidden flex flex-col w-full">
            <ProductFilter
                search={search}
                setSearch={setSearch}
                productType={productType}
                setProductType={setProductType}
            />

            <ProductTable data={filteredProduct} />
        </div>
    );
};

export default ProductList;
