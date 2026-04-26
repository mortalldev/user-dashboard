import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { useLimitsQuery } from '@/features/limits';
import { useProductsQuery } from '@/features/products';
import { useUsersQuery } from '@/features/users';
import { useCardsQuery } from '@/features/cards';

import { CreditCard, Users, Box, ShieldCheck } from 'lucide-react';
import Loader from '@/widgets/loader';

const cardConfig = [
    {
        title: 'Products',
        icon: Box,
        useQuery: useProductsQuery,
        color: 'text-blue-400',
        bg: 'bg-blue-500/10 border-blue-500/20',
    },
    {
        title: 'Limits',
        icon: ShieldCheck,
        useQuery: useLimitsQuery,
        color: 'text-yellow-400',
        bg: 'bg-yellow-500/10 border-yellow-500/20',
    },
    {
        title: 'Users',
        icon: Users,
        useQuery: useUsersQuery,
        color: 'text-green-400',
        bg: 'bg-green-500/10 border-green-500/20',
    },
    {
        title: 'Cards',
        icon: CreditCard,
        useQuery: useCardsQuery,
        color: 'text-purple-400',
        bg: 'bg-purple-500/10 border-purple-500/20',
    },
];

export function DashboardCards() {
    return (
        <div className="flex flex-wrap gap-4">
            {cardConfig.map((item, i) => {
                const { data, isLoading } = item.useQuery(undefined);
                const Icon = item.icon;

                if (isLoading) {
                    return <Loader key={i} />;
                }

                return (
                    <Card
                        key={i}
                        className={`rounded-2xl border backdrop-blur-xl shadow-lg transition hover:scale-[1.01] ${item.bg} py-6 w-full sm:w-sm`}
                    >
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-sm text-muted-foreground">
                                    {item.title}
                                </CardTitle>

                                <div className="text-2xl font-bold mt-1">
                                    {isLoading ? 0 : (data?.total ?? 0)}
                                </div>
                            </div>

                            <div
                                className={`p-3 rounded-xl bg-white/10 backdrop-blur ${item.color}`}
                            >
                                <Icon className="w-5 h-5" />
                            </div>
                        </CardHeader>
                    </Card>
                );
            })}
        </div>
    );
}
