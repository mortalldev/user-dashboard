import { Button } from '@/components/ui/button';
import CardProducts from '@/pages/products/card-product/card-products';
import ProductList from '@/pages/products/loan-product/ui/products';
import { BanknoteArrowUp, CreditCard } from 'lucide-react';
import { useState } from 'react';

const Products = () => {
    const [tabs, setTabs] = useState<'card' | 'loan'>('loan');

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex gap-1 bg-muted p-1 rounded-xl w-fit shrink-0">
                <Button
                    variant={tabs === 'loan' ? 'default' : 'ghost'}
                    onClick={() => setTabs('loan')}
                    className="flex items-center gap-2 px-5 py-2 rounded-lg"
                >
                    <BanknoteArrowUp className="w-4 h-4" />
                    Loan Products
                </Button>

                <Button
                    variant={tabs === 'card' ? 'default' : 'ghost'}
                    onClick={() => setTabs('card')}
                    className="flex items-center gap-2 px-5 py-2 rounded-lg"
                >
                    <CreditCard className="w-4 h-4" />
                    Card Products
                </Button>
            </div>

            <div className="flex-1 min-h-0 mt-4">
                {tabs === 'card' ? <CardProducts /> : <ProductList />}
            </div>
        </div>
    );
};

export default Products;
