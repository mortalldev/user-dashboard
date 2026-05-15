import { useMemo, useState } from 'react';
import { useWalletsQuery } from '@/features/wallets';
import { useUsersQuery } from '@/features/users';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { WalletsData } from '@/features/wallets/type';
import type { UsersData } from '@/features/users/type';
import { CardsPagination } from '@/pages/cards/ui/pagination';
import { extractArray } from '@/shared/lib/utils';
import WalletsTabele from '@/pages/wallets/ui/table';

const PAGE_SIZE = 10;

const WalletsList = () => {
    const { data: walletsData } = useWalletsQuery(undefined);
    const { data: usersData } = useUsersQuery(undefined);

    const [page, setPage] = useState(1);
    const [userFilter, setUserFilter] = useState('all');

    const wallets = extractArray<WalletsData>(walletsData);
    const users = extractArray<UsersData>(usersData);

    const userMap = useMemo(() => {
        const map: Record<number, string> = {};
        users.forEach((u) => {
            map[u.id] = u.fullname;
        });
        return map;
    }, [users]);

    const filtered = useMemo(() => {
        return wallets.filter((w) => {
            const matchUser = userFilter === 'all' || String(w.user_id) === userFilter;

            return matchUser;
        });
    }, [wallets, userFilter, userMap]);

    const lastPage = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    const resetPage = () => setPage(1);

    return (
        <div className="flex flex-col gap-4 p-4 md:p-6 h-full overflow-y-auto">
            <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                    <Select
                        value={userFilter}
                        onValueChange={(v) => {
                            setUserFilter(v);
                            resetPage();
                        }}
                    >
                        <SelectTrigger className="w-48 py-5 rounded-xl">
                            <SelectValue placeholder="Filter by user" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            <SelectItem value="all">All Users</SelectItem>
                            {users.map((u) => (
                                <SelectItem key={u.id} value={String(u.id)}>
                                    {u.fullname}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <p className="text-sm text-muted-foreground">
                    Total: <span className="font-medium">{filtered.length}</span> wallets
                </p>
            </div>

            <WalletsTabele paginated={paginated} userMap={userMap} />

            {filtered.length > PAGE_SIZE && (
                <CardsPagination
                    page={page}
                    lastPage={lastPage}
                    onPrev={() => setPage((p) => Math.max(1, p - 1))}
                    onNext={() => setPage((p) => Math.min(lastPage, p + 1))}
                />
            )}
        </div>
    );
};

export default WalletsList;
