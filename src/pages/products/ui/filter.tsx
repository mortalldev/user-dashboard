import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import type { ProductDataType } from '@/features/products/type';
import { Search } from 'lucide-react';
import { useState } from 'react';
import CreateProductForm from './create-product-form';

interface ProductFilterProps {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    productType: ProductDataType | 'all';
    setProductType: React.Dispatch<React.SetStateAction<ProductDataType | 'all'>>;
}

const ProductFilter = ({ search, setSearch, productType, setProductType }: ProductFilterProps) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 w-full">
                <div className="w-full max-w-sm border rounded-xl flex items-center pl-3 focus-within:border-primary bg-input duration-200">
                    <Search size={18} className="text-muted-foreground" />

                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search products..."
                        className="pl-2 py-5 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                </div>

                <Select
                    value={productType}
                    onValueChange={(value) => setProductType(value as ProductDataType | 'all')}
                >
                    <SelectTrigger className="py-5 px-10 rounded-xl border bg-input focus:ring-0 focus:ring-offset-0 outline-none">
                        <SelectValue placeholder="Type" />
                    </SelectTrigger>

                    <SelectContent position="popper">
                        <SelectItem value="all" className="py-2">
                            All
                        </SelectItem>
                        <SelectItem value="CREDIT" className="py-2">
                            Credit
                        </SelectItem>
                        <SelectItem value="CARD" className="py-2">
                            Card
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <CreateProductForm open={open} setOpen={setOpen} />
        </div>
    );
};

export default ProductFilter;
