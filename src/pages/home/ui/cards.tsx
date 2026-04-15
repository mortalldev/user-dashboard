import { useLimitsQuery } from '@/features/limits';
import { useProductsQuery } from '@/features/products';
import { useUsersQuery } from '@/features/users';
import { useCardsQuery } from '@/features/cards';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export function DashboardCards() {
    const { data: products } = useProductsQuery(undefined);
    const { data: limits } = useLimitsQuery(undefined);
    const { data: users } = useUsersQuery(undefined);
    const { data: cards } = useCardsQuery(undefined);

    return (
        <>
            <Card className="relative w-full max-w-sm mb-4">
                <CardHeader>
                    <CardTitle>Products</CardTitle>

                    {products?.total ?? 0}
                </CardHeader>
            </Card>
            <Card className="relative w-full max-w-sm mb-4">
                <CardHeader>
                    <CardTitle>Limits</CardTitle>

                    {limits?.total ?? 0}
                </CardHeader>
            </Card>
            <Card className="relative w-full max-w-sm mb-4">
                <CardHeader>
                    <CardTitle>Users</CardTitle>

                    {users?.total ?? 0}
                </CardHeader>
            </Card>
            <Card className="relative w-full max-w-sm mb-4">
                <CardHeader>
                    <CardTitle>Cards</CardTitle>

                    {cards?.total ?? 0}
                </CardHeader>
            </Card>
        </>
    );
}
